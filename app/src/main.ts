/**
 * 入口：装载存档 → 落地离线状态 → 启动时钟（1Hz 只刷进度条）→ 渲染
 */
import './styles.css';
import { loadGame, saveGame } from './core/save';
import { store } from './core/store';
import { dayKey, msUntilDailyReset, msUntilWeeklyReset, weekKey } from './core/time';
import { DUNGEON_BY_ID } from './data/dungeons';
import { refreshCadence, tailClaimable } from './game/cadence';
import { refreshExpeditions } from './game/expedition';
import { computeMemberStats } from './game/member';
import { findMember, newGame } from './game/state';
import { masteryRows, unlockMastery } from './game/mastery';
import { advanceRelic, relicInfo, relicTeamBonus } from './game/relic';
import {
  assignProject,
  collectFacility,
  ensureFacility,
  facilityInfo,
  openBoxes,
  upgradeFacility,
} from './game/facility';
import { climbTower, retreatTower, startTower } from './game/tower';
import { abandonTrial, advanceTrial, startTrial } from './game/trial';
import { resolveExpedition } from './sim/combat';
import { bindEvents, render, renderProgressOnly, ui } from './ui/app';
import { flash } from './ui/toast';
import { startBackupWatch } from './ui/backup';
import { initTheme } from './ui/theme';
import { APP_BUILD, APP_VERSION, startUpdateWatch } from './ui/version';

const AUTOSAVE_MS = 15000;

declare global {
  interface Window {
    /** 调试出口：便于控制台检查状态、写自动化测试 */
    __FF14IDLE__?: {
      store: typeof store;
      save: () => void;
      refresh: () => number;
      cadence: () => { dayChanged: boolean; weekChanged: boolean };
      tailClaimable: () => string[];
      time: {
        dayKey: (ts: number) => string;
        weekKey: (ts: number) => string;
        msUntilDailyReset: (ts: number) => number;
        msUntilWeeklyReset: (ts: number) => number;
      };
      trial: {
        start: (ids: string[]) => unknown;
        advance: () => unknown;
        abandon: () => unknown;
        run: () => unknown;
      };
      mastery: {
        rows: (memberId: string) => unknown;
        unlock: (memberId: string, id: string) => unknown;
        stats: (memberId: string) => unknown;
      };
      relic: {
        info: (memberId: string) => unknown;
        advance: (memberId: string) => unknown;
      };
      facility: {
        info: (offsetMs?: number) => unknown;
        assign: (slot: number, project: string | null) => unknown;
        collect: () => unknown;
        open: (n: number) => unknown;
        upgrade: () => unknown;
      };
      tower: {
        start: (ids: string[]) => unknown;
        climb: () => unknown;
        retreat: () => unknown;
        run: () => unknown;
        memory: () => number;
        best: () => number;
        season: () => unknown;
      };
      simulate: (dungeonId: string, memberIds: string[]) => unknown;
      build: string;
    };
  }
}

function boot(): void {
  // 主题：首屏已经由 index.html 的内联脚本落地，这里只接管后续（跟随系统 / 手动切换）
  initTheme();

  const loaded = loadGame();
  const state = loaded.state ?? newGame();
  store.set(state);

  // 周期：先刷新每日/每周（新档或跨天/跨周都会在这里重置）
  const cadence0 = refreshCadence(state, Date.now());
  // 工房：修正槽位数量（迁移或升级后可能长度不符）
  ensureFacility(state, Date.now());

  // 离线落地：把到期的派遣直接推成 ready（无需计算离线收益）
  const becameReady = refreshExpeditions(state, Date.now());

  // 默认选人：坦克 + 治疗 + 两名输出
  if (ui.party.length === 0) {
    const pick = (role: string) =>
      state.members.find((m) => {
        const job = m.job;
        const isTank = job === 'WAR';
        const isHealer = job === 'WHM' || job === 'SGE';
        return role === 'tank' ? isTank : role === 'healer' ? isHealer : !isTank && !isHealer;
      });
    const tank = pick('tank');
    const healer = pick('healer');
    const dps = state.members.filter((m) => m.job !== 'WAR' && m.job !== 'WHM' && m.job !== 'SGE');
    ui.party = [tank, healer, dps[0], dps[1]].filter(Boolean).map((m) => m!.id);
  }

  bindEvents();
  store.subscribe(() => render());

  // 1Hz：只推进度条；若有派遣到期或跨天/跨周则整体重绘一次
  store.onTick(() => {
    const st = store.get();
    if (!st) return;
    const before = st.expeditions.filter((e) => !e.collected && e.status === 'ready').length;
    const cadence = refreshCadence(st, Date.now());
    const newly = refreshExpeditions(st, Date.now());

    if (cadence.dayChanged) {
      flash('每日重置：任务轮盘已刷新');
      saveGame(st);
      render();
      return;
    }
    if (cadence.weekChanged) {
      flash('每周重置：天书奇谭已刷新');
      saveGame(st);
      render();
      return;
    }

    if (newly > 0) {
      render();
      const after = st.expeditions.filter((e) => !e.collected && e.status === 'ready').length;
      if (after > before) flash('有派遣完成了，可以收获');
    } else {
      renderProgressOnly();
    }
  });
  store.startClock();

  render();

  if (loaded.issue === 'recovered') flash('存档异常，已从备份恢复');
  else if (loaded.issue === 'invalid') flash('存档损坏，已新建存档');
  else if (loaded.issue === 'digest-repaired') flash('存档校验异常，已修复并继续（未丢档）');
  else if (loaded.migrated) flash('存档已升级到新版本');
  else if (becameReady > 0) flash(`离线期间有 ${becameReady} 支队伍完成探索`);

  // 迁移过或修复过的存档立刻回写
  if (loaded.migrated || loaded.issue === 'digest-repaired' || cadence0.dayChanged || cadence0.weekChanged) {
    saveGame(state);
  }

  window.setInterval(() => saveGame(store.require()), AUTOSAVE_MS);
  window.addEventListener('beforeunload', () => {
    const st = store.get();
    if (st) saveGame(st);
  });

  window.__FF14IDLE__ = {
    store,
    save: () => saveGame(store.require()),
    refresh: () => refreshExpeditions(store.require(), Date.now()),
    cadence: () => refreshCadence(store.require(), Date.now()),
    tailClaimable: () => tailClaimable(store.require()),
    time: { dayKey, weekKey, msUntilDailyReset, msUntilWeeklyReset },
    trial: {
      start: (ids: string[]) => startTrial(store.require(), ids, Date.now()),
      advance: () => advanceTrial(store.require(), Date.now()),
      abandon: () => abandonTrial(store.require(), Date.now()),
      run: () => store.require().trial,
    },
    mastery: {
      rows: (memberId: string) => masteryRows(store.require(), memberId),
      unlock: (memberId: string, id: string) => unlockMastery(store.require(), memberId, id),
      stats: (memberId: string) => {
        const st = store.require();
        const m = findMember(st, memberId);
        return m ? computeMemberStats(m, st.inventory, st.masteries?.[m.id] ?? [], relicTeamBonus(st)) : null;
      },
    },
    relic: {
      info: (memberId: string) => relicInfo(store.require(), memberId),
      advance: (memberId: string) => advanceRelic(store.require(), memberId, Date.now()),
    },
    facility: {
      info: (offsetMs = 0) => facilityInfo(store.require(), Date.now() + offsetMs),
      assign: (slot: number, project: string | null) =>
        assignProject(store.require(), slot, project as never, Date.now()),
      collect: () => collectFacility(store.require(), Date.now()),
      open: (n: number) => openBoxes(store.require(), n, Date.now()),
      upgrade: () => upgradeFacility(store.require(), Date.now()),
    },
    tower: {
      start: (ids: string[]) => startTower(store.require(), ids, Date.now()),
      climb: () => climbTower(store.require(), Date.now()),
      retreat: () => retreatTower(store.require(), Date.now()),
      run: () => store.require().tower,
      memory: () => store.require().towerMemory,
      best: () => store.require().towerBest,
      season: () => store.require().towerSeason,
    },
    simulate: (dungeonId: string, memberIds: string[]) => {
      const st = store.require();
      const d = DUNGEON_BY_ID[dungeonId];
      if (!d) return null;
      const roster = memberIds
        .map((id) => findMember(st, id))
        .filter((m): m is NonNullable<typeof m> => !!m)
        .map((m) => computeMemberStats(m, st.inventory, st.masteries?.[m.id] ?? [], relicTeamBonus(st)));
      const res = resolveExpedition(roster, d, 12345);
      return {
        dungeon: d.name,
        reqLevel: d.reqLevel,
        reqItemLevel: d.reqItemLevel,
        win: res.win,
        durationSec: res.durationSec,
        hpLeftPct: Math.round(res.hpLeftPct * 100),
        loot: res.loot.length,
      };
    },
    build: `v${APP_VERSION}+${APP_BUILD}`,
  };

  // 部署站点上主动探测新构建（手机加到主屏后没有刷新按钮，只能靠它）
  startUpdateWatch();

  // 手机端本地存储有被系统清理的风险 —— 定期提醒导出存档
  startBackupWatch();
}

boot();
