/**
 * 界面层（单体，MVP）
 *
 * 相对参考实现的改进（蓝图 §6.1「必须重做的部分」）：
 *  - 不写 234 个 if 的分发器，改用 ACTIONS 映射表；未注册的 action 会显式警告
 *  - tab 各自一个 render 函数，而不是 8699 行的单一文件
 *  - 进度条走「局部直改 DOM」，不参与整体重绘（1Hz tick）
 */
import { JOBS, ROLE_LABEL } from '../data/jobs';
import { QUALITY_LABEL, SLOT_LABEL, SLOTS } from '../data/items';
import { CHAPTER_LEVEL_RANGE, expToNext } from '../data/levels';
import { DUNGEON_BY_ID } from '../data/dungeons';
import { TAIL_LINES, TAIL_TASKS } from '../data/tails';
import { dayKey, fmtDuration as fmtWait, msUntilDailyReset, msUntilWeeklyReset, weekKey } from '../core/time';
import { claimTailLine, tailClaimable, tailStickers } from '../game/cadence';
import {
  TRIAL_PARTY_SIZE,
  abandonTrial,
  advanceTrial,
  blessingsMods,
  startTrial,
  trialHpPct,
  useTrialItem,
} from '../game/trial';
import { NODE_SCORE, itemById as trialItemById, makeEnemies } from '../data/trial';
import { averageItemLevel, computeMemberStats } from '../game/member';
import { masteryRows, masterySpent, unlockMastery } from '../game/mastery';
import { advanceRelic, relicInfo, relicTeamBonus } from '../game/relic';
import {
  assignProject,
  collectFacility,
  facilityInfo,
  openBoxes,
  upgradeFacility,
} from '../game/facility';
import { FACILITY_LEVELS, GROOVE_MAX, PROJECTS, levelDef, projectById, type ProjectId } from '../data/facility';
import {
  TOWER,
  floorLabel,
  isBossFloor,
  isBoxFloor,
  isRestFloor,
  towerLevelMult,
  towerMemoryMult,
} from '../data/tower';
import {
  TOWER_PARTY_SIZE,
  climbTower,
  retreatTower,
  startTower,
  towerHpPct,
} from '../game/tower';
import { RELIC_STAGES } from '../data/relic';
import {
  chapterChain,
  findMember,
  isCleared,
  isUnlocked,
} from '../game/state';
import { collectExpedition, dispatch, pendingCount } from '../game/expedition';
import { saveGame } from '../core/save';
import { store } from '../core/store';
import type { Expedition, GameState, ItemDef, JobId, MemberState, TrialRun } from '../types';
import { flash } from './toast';
import { icon, jobIconName, nodeIconName, roleIconName, slotIconName, type IconName } from './icons';
import { currentTheme, themeLabel, toggleTheme } from './theme';
import { exportNow } from './backup';
import { singleFileUrl, versionLabel } from './version';
import { RACE_BY_ID, RARITY_BY_ID } from '../data/hires';
import {
  companionStatus,
  dismissBlockReason,
  dismissMember,
  hireCandidate,
  namedDef,
  rarityName,
  rerollTavern,
  rosterCap,
  todayRerollCost,
} from '../game/tavern';

type TabId = 'dispatch' | 'trial' | 'tower' | 'party' | 'inventory' | 'cadence' | 'relic' | 'facility' | 'report';
/** 副本列表筛选：待推进（默认）/ 已通关 / 全部 */
type DungeonFilter = 'todo' | 'farm' | 'all';

/** 导航顺序，同时作为键盘快捷键 1–9 的映射 */
const TAB_ORDER: TabId[] = [
  'dispatch',
  'trial',
  'tower',
  'party',
  'inventory',
  'cadence',
  'relic',
  'facility',
  'report',
];

const ui = {
  tab: 'dispatch' as TabId,
  party: [] as string[],
  trialParty: [] as string[],
  towerParty: [] as string[],
  dungeonId: '' as string,
  dungeonFilter: 'todo' as DungeonFilter,
  /** 破魔试炼：正在查看的格子（null = 未选中） */
  inspectNode: null as number | null,
  openExpedition: '' as string,
  /** 名册页：待确认辞退的成员 id（辞退是不可逆的，要二次确认） */
  confirmDismiss: null as string | null,
  /** 名册页：是否展开名角图鉴 */
  showCodex: false,
};

/* ---------------- 工具 ---------------- */

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  );
}

/** 空状态：给图标 + 一句"下一步该做什么"，而不是干巴巴的"暂无" */
function empty(ico: IconName, title: string, hint = ''): string {
  return `<div class="empty">
    <span class="empty-ico">${icon(ico, 34)}</span>
    <div class="empty-title">${esc(title)}</div>
    ${hint ? `<div class="empty-hint">${hint}</div>` : ''}
  </div>`;
}

/** 进度条；ready 时加 `full` 类触发呼吸高光 */
function barHtml(pct: number, opts: { progressId?: string; exp?: boolean; full?: boolean } = {}): string {
  const attrs = opts.progressId ? ` data-progress="${opts.progressId}"` : '';
  const cls = `bar${opts.exp ? ' exp' : ''}${opts.full ? ' full' : ''}`;
  return `<div class="${cls}"${attrs}><i style="width:${pct.toFixed(1)}%"></i></div>`;
}

function roleTag(job: JobId): string {
  const role = JOBS[job].role;
  const cls = role === 'tank' ? 'tag-tank' : role === 'healer' ? 'tag-healer' : 'tag-dps';
  return `<span class="tag ${cls}" data-tip="${ROLE_LABEL[role]}：${esc(JOBS[job].gauge)}">${icon(roleIconName(role), 12)}${ROLE_LABEL[role]}</span>`;
}

function fmtDuration(ms: number): string {
  const s = Math.max(0, Math.round(ms / 1000));
  const m = Math.floor(s / 60);
  return m > 0 ? `${m} 分 ${s % 60} 秒` : `${s} 秒`;
}

/* ---------------- 动作表 ---------------- */

const ACTIONS: Record<string, (el: HTMLElement, ev: Event) => void> = {
  'tab': (el) => {
    ui.tab = (el.dataset.tab as TabId) ?? 'dispatch';
    render();
  },

  'toggle-party': (el) => {
    const id = el.dataset.member!;
    const i = ui.party.indexOf(id);
    if (i >= 0) ui.party.splice(i, 1);
    else if (ui.party.length < 4) ui.party.push(id);
    else return flash('队伍最多 4 人');
    render();
  },

  'pick-dungeon': (el) => {
    const id = el.dataset.dungeon!;
    const state = store.require();
    if (!isUnlocked(state, id)) return flash('该副本尚未解锁');
    ui.dungeonId = id;
    render();
  },

  'filter-dungeon': (el) => {
    ui.dungeonFilter = (el.dataset.filter as DungeonFilter) ?? 'todo';
    render();
  },

  'dispatch': () => {
    const state = store.require();
    if (!ui.dungeonId) return flash('请先选择副本');
    if (ui.party.length !== 4) return flash('请选满 4 人小队');
    const res = dispatch(state, ui.dungeonId, ui.party, Date.now());
    if (!res.ok) return flash(res.error ?? '派遣失败');
    const d = DUNGEON_BY_ID[ui.dungeonId]!;
    flash(`已派遣「${d.name}」，预计 ${fmtDuration(res.expedition!.durationMs)}`);
    saveGame(state);
    render();
  },

  'collect': (el) => {
    const state = store.require();
    const res = collectExpedition(state, el.dataset.exp!, Date.now());
    if (!res.ok) return flash(res.error ?? '收获失败');
    const rouletteTxt = res.roulette ? '（轮盘加成 ×2.5）' : '';
    flash(`收获${rouletteTxt}：+${res.gold} 金币 · +${res.exp} 经验 · ${res.loot} 件战利品`);
    if (res.chapterUp) flash(`章节推进！进入第 ${res.chapterUp} 章`);
    saveGame(state);
    render();
  },

  'view-report': (el) => {
    ui.openExpedition = el.dataset.exp!;
    ui.tab = 'report';
    render();
  },

  'claim-line': (el) => {
    const state = store.require();
    const res = claimTailLine(state, el.dataset.line!, Date.now());
    if (!res.ok) return flash(res.error ?? '领取失败');
    const r = res.reward!;
    flash(`天书连线奖励：+${r.gold} 金币 · +${r.exp} 经验 · ${r.loot.length} 件装备`);
    saveGame(state);
    render();
  },

  'unlock-mastery': (el) => {
    const state = store.require();
    const res = unlockMastery(state, el.dataset.member!, el.dataset.mastery!);
    if (!res.ok) return flash(res.error ?? '解锁失败');
    flash(`已解锁【${res.def?.name}】：${res.def?.desc}`);
    saveGame(state);
    render();
  },

  'advance-relic': (el) => {
    const state = store.require();
    const res = advanceRelic(state, el.dataset.member!, Date.now());
    if (!res.ok) return flash(res.error ?? '推进失败');
    flash(
      res.final
        ? `幻境武器完成终阶！获得【${res.item?.name}】，全队永久加成已生效`
        : `幻境武器推进至第 ${res.stage} 阶：${res.item?.name}`,
    );
    saveGame(state);
    render();
  },

  /* ---------------- 无尽塔 ---------------- */

  'toggle-tower-party': (el) => {
    const id = el.dataset.member!;
    const i = ui.towerParty.indexOf(id);
    if (i >= 0) ui.towerParty.splice(i, 1);
    else if (ui.towerParty.length < TOWER_PARTY_SIZE) ui.towerParty.push(id);
    else return flash(`无尽塔队伍最多 ${TOWER_PARTY_SIZE} 人`);
    render();
  },

  'tower-start': () => {
    const state = store.require();
    const res = startTower(state, ui.towerParty, Date.now());
    if (!res.ok) return flash(res.error ?? '无法开始攀爬');
    saveGame(state);
    flash('开始攀爬无尽塔');
    render();
  },

  'tower-climb': () => {
    const state = store.require();
    const res = climbTower(state, Date.now());
    if (!res.ok) return flash(res.error ?? '挑战失败');
    if (res.finished) {
      const last = res.log?.[res.log.length - 1] ?? '攀爬结束';
      flash(last);
    }
    saveGame(state);
    render();
  },

  'tower-retreat': () => {
    const state = store.require();
    const res = retreatTower(state, Date.now());
    if (!res.ok) return flash(res.error ?? '撤退失败');
    flash(res.settlement?.summary ?? '已撤退');
    saveGame(state);
    render();
  },


  /* ---------------- 工房 ---------------- */

  'facility-assign': (el) => {
    const state = store.require();
    const slot = Number(el.dataset.slot);
    const raw = el.dataset.project;
    const project = raw === 'none' ? null : (raw as ProjectId);
    const res = assignProject(state, slot, project, Date.now());
    if (!res.ok) return flash(res.error ?? '指派失败');
    saveGame(state);
    render();
  },

  'facility-collect': () => {
    const state = store.require();
    const res = collectFacility(state, Date.now());
    if (!res.ok) return flash(res.error ?? '没有产出');
    flash(
      res.overflowed
        ? `领取 +${res.gold} 金币 / ${res.boxes} 箱（储存已溢出，连续加成已归零）`
        : `领取 +${res.gold} 金币 / ${res.boxes} 箱（连续加成 +${Math.round((res.groove ?? 0) * 100)}%）`,
    );
    saveGame(state);
    render();
  },

  'facility-open': (el) => {
    const state = store.require();
    const count = el.dataset.all === '1' ? Number.MAX_SAFE_INTEGER : 1;
    const res = openBoxes(state, count, Date.now());
    if (!res.ok) return flash(res.error ?? '开箱失败');
    flash(`鉴定出 ${res.items?.length ?? 0} 件装备`);
    saveGame(state);
    render();
  },

  'facility-upgrade': () => {
    const state = store.require();
    const res = upgradeFacility(state, Date.now());
    if (!res.ok) return flash(res.error ?? '升级失败');
    flash(`工房升级至 ${res.level} 级：新增槽位并提高储存上限`);
    saveGame(state);
    render();
  },

  /* ---------------- 破魔试炼 ---------------- */
  'toggle-trial-party': (el) => {
    const id = el.dataset.member!;
    const i = ui.trialParty.indexOf(id);
    if (i >= 0) ui.trialParty.splice(i, 1);
    else if (ui.trialParty.length < TRIAL_PARTY_SIZE) ui.trialParty.push(id);
    else return flash(`试炼队伍最多 ${TRIAL_PARTY_SIZE} 人`);
    render();
  },

  'trial-start': () => {
    const state = store.require();
    const res = startTrial(state, ui.trialParty, Date.now());
    if (!res.ok) return flash(res.error ?? '无法开始试炼');
    saveGame(state);
    flash('破魔试炼开始，祝好运');
    render();
  },

  'trial-advance': () => {
    const state = store.require();
    const res = advanceTrial(state, Date.now());
    if (!res.ok) return flash(res.error ?? '推进失败');
    if (res.finished) {
      flash(res.win ? `试炼通关！得分 ${res.scoreGained}` : `试炼结束，得分 ${res.scoreGained}`);
    }
    saveGame(state);
    render();
  },

  'trial-abandon': () => {
    const state = store.require();
    const res = abandonTrial(state, Date.now());
    if (!res.ok) return flash(res.error ?? '放弃失败');
    flash(`已放弃，按进度结算 ${res.score} 分`);
    saveGame(state);
    render();
  },

  'trial-item': (el) => {
    const state = store.require();
    const res = useTrialItem(state, el.dataset.item!);
    if (!res.ok) return flash(res.error ?? '使用失败');
    flash(`使用道具：${res.effect}`);
    saveGame(state);
    render();
  },

  'inspect-node': (el) => {
    const idx = Number(el.dataset.node);
    ui.inspectNode = ui.inspectNode === idx ? null : idx;
    render();
  },

  'equip': (el) => {
    const state = store.require();
    const item = state.inventory.find((i) => i.uid === el.dataset.uid);
    const memberId = el.dataset.member ?? ui.party[0];
    const member = memberId ? findMember(state, memberId) : undefined;
    if (!item || !member) return flash('请先选择成员');
    // 装备只是「引用」——物品始终留在 inventory 中，被引用者即为已装备
    member.equipment[item.slot] = item.uid;
    saveGame(state);
    flash(`${member.name} 装备了 ${item.name}`);
    render();
  },

  'auto-equip': (el) => {
    const state = store.require();
    const member = findMember(state, el.dataset.member!);
    if (!member) return;
    const free = freeItems(state);
    let n = 0;
    for (const slot of SLOTS) {
      const cur = member.equipment[slot.id];
      const curItem = cur ? state.inventory.find((i) => i.uid === cur) : undefined;
      const best = free
        .filter((i) => i.slot === slot.id)
        .sort((a, b) => scoreOf(b) - scoreOf(a))[0];
      if (!best) continue;
      if (!curItem || scoreOf(best) > scoreOf(curItem)) {
        member.equipment[slot.id] = best.uid;
        // 从可用池里移除，避免同一件装备被塞进两个部位
        const idx = free.indexOf(best);
        if (idx >= 0) free.splice(idx, 1);
        n += 1;
      }
    }
    saveGame(state);
    flash(n > 0 ? `已为 ${member.name} 更换 ${n} 件装备` : `${member.name} 没有更好的装备`);
    render();
  },

  'save-now': () => {
    const ok = saveGame(store.require());
    flash(ok ? '已存档' : '存档失败（浏览器禁用本地存储）');
  },

  'export': () => exportNow(),

  'toggle-theme': () => {
    const next = toggleTheme();
    flash(next === 'light' ? '已切到浅色主题' : '已切到深色主题');
    render();
  },

  // ---- 酒馆与名册 ----
  hire: (el) => {
    const state = store.require();
    const r = hireCandidate(state, el.dataset.candidate!);
    if (!r.ok) return flash(r.reason ?? '雇佣失败');
    saveGame(state);
    const name = state.members[state.members.length - 1]?.name ?? '';
    flash(`${name} 加入了名册`);
    render();
  },

  'reroll-tavern': (el) => {
    const state = store.require();
    const free = el.dataset.free === '1';
    const r = rerollTavern(state, Date.now(), free);
    if (!r.ok) return flash(r.reason ?? '刷新失败');
    saveGame(state);
    flash(free ? '已免费刷新今日候选' : '候选已重 roll');
    render();
  },

  'dismiss-ask': (el) => {
    ui.confirmDismiss = el.dataset.member!;
    render();
  },

  'dismiss-cancel': () => {
    ui.confirmDismiss = null;
    render();
  },

  dismiss: (el) => {
    const state = store.require();
    const id = el.dataset.member!;
    const m = state.members.find((x) => x.id === id);
    // 不需要手动"退还装备"：装备本身就存在背包里（成员只是引用它的 uid），
    // 人走了，那些 uid 自然变成 freeItems() 里的空闲装备，谁都能再穿。
    const r = dismissMember(state, id);
    ui.confirmDismiss = null;
    if (!r.ok) return flash(r.reason ?? '辞退失败');
    saveGame(state);
    flash(`${m?.name ?? '成员'} 已离开名册（装备回到空闲列表）`);
    render();
  },

  'toggle-codex': () => {
    ui.showCodex = !ui.showCodex;
    render();
  },
};

function scoreOf(item: ItemDef): number {
  return item.stats.hp * 0.1 + item.stats.potency * 2 + item.stats.healPotency * 1.5;
}

/** 未被任何成员装备的物品（背包里「真正空闲」的东西） */
function freeItems(state: GameState): ItemDef[] {
  const used = new Set<string>();
  for (const m of state.members) {
    for (const uid of Object.values(m.equipment)) if (uid) used.add(uid);
  }
  return state.inventory.filter((i) => !used.has(i.uid));
}

/* ---------------- 渲染 ---------------- */

/** 顶部资源状态条：一眼看到"我现在有多少、有多少在等着我" */
function renderTopbar(state: GameState): string {
  const p = pendingCount(state);
  const ch = CHAPTER_LEVEL_RANGE[state.chapter];
  const boxes = state.facility?.boxes ?? 0;
  const memPct = Math.round((towerMemoryMult(state.towerMemory ?? 0) - 1) * 100);
  const season = state.towerSeason?.best ?? 0;

  const chip = (key: string, name: IconName, label: string, value: string, mod = '') =>
    `<div class="res ${mod}" data-tip="${esc(label)}">
       <span class="res-ico">${icon(name, 15)}</span>
       <span class="res-val" data-res="${key}">${esc(value)}</span>
     </div>`;

  return `
  <header class="topbar">
    <div class="identity">
      <div class="identity-name">${esc(state.guildName)}</div>
      <div class="identity-sub">第 ${state.chapter} 章 · ${esc(ch?.name ?? '')}</div>
    </div>
    <div class="res-row">
      ${chip('gold', 'gold', '金币：用于量谱精通、工房扩建与幻境武器', state.gold.toLocaleString())}
      ${chip('box', 'box', '待鉴定箱：在工房鉴定成装备', String(boxes), boxes === 0 ? 'dim' : '')}
      ${chip('running', 'dispatch', '正在外面的队伍数量', String(p.running), p.running === 0 ? 'dim' : '')}
      ${chip('ready', 'clock', '已经回来、可以收获的派遣', String(p.ready), p.ready > 0 ? 'hot' : 'dim')}
      ${chip('memory', 'memory', `塔之记忆：无尽塔的永久加成（历史最高 ${state.towerBest ?? 0} 层 · 本赛季 ${season} 层）`, `+${memPct}%`, memPct === 0 ? 'dim' : 'good')}
    </div>
    <button class="theme-toggle" data-action="toggle-theme" data-tip="${esc(themeLabel())}" aria-label="切换深浅主题">
      ${icon(currentTheme() === 'dark' ? 'sun' : 'moon', 16)}
    </button>
  </header>`;
}

/** 左侧导航：图标 + 文字 + 待办角标 */
function renderNav(state: GameState): string {
  const p = pendingCount(state);
  const tabs: { id: TabId; label: string; ico: IconName; badge: number; tip: string }[] = [
    { id: 'dispatch', label: '派遣', ico: 'dispatch', badge: p.ready, tip: '派遣小队挑战副本，离线也会继续' },
    { id: 'trial', label: '试炼', ico: 'trial', badge: 0, tip: '破魔试炼：12 格棋盘 roguelike' },
    { id: 'tower', label: '无尽塔', ico: 'tower', badge: 0, tip: '无尽塔：无限层数，塔之记忆永久保留' },
    { id: 'party', label: '队伍', ico: 'party', badge: 0, tip: '成员属性、装备与量谱精通' },
    { id: 'inventory', label: '背包', ico: 'inventory', badge: freeItems(state).length, tip: '空闲装备：可以装备给成员' },
    { id: 'cadence', label: '周常', ico: 'cadence', badge: tailClaimable(state).length, tip: '每日任务轮盘与每周天书奇谭' },
    { id: 'relic', label: '幻境', ico: 'relic', badge: 0, tip: '幻境武器：跨系统的长线至尊目标' },
    { id: 'facility', label: '工房', ico: 'facility', badge: facilityInfo(state, Date.now()).pendingBoxes, tip: '离线生产线：关掉页面也在产出' },
    { id: 'report', label: '战报', ico: 'report', badge: 0, tip: '战斗过程与掉落（队伍回来后解锁）' },
  ];
  return `
  <nav class="nav" role="tablist">
    ${tabs
      .map(
        (t, i) => `
      <button class="nav-item tab-btn${ui.tab === t.id ? ' active' : ''}" data-action="tab" data-tab="${t.id}"
        role="tab" aria-selected="${ui.tab === t.id}" data-tip="${esc(t.tip)}（快捷键 ${i + 1}）">
        <span class="nav-ico">${icon(t.ico, 19)}</span>
        <span class="nav-label">${esc(t.label)}</span>
        ${t.badge > 0 ? `<span class="nav-badge">${t.badge > 99 ? '99+' : t.badge}</span>` : ''}
      </button>`,
      )
      .join('')}
  </nav>`;
}

function renderPartyPicker(state: GameState): string {
  const cards = state.members
    .map((m) => {
      const sel = ui.party.includes(m.id);
      const job = JOBS[m.job];
      const avg = averageItemLevel(m, state.inventory);
      return `
      <div class="card${sel ? ' selected' : ''}" data-action="toggle-party" data-member="${m.id}" style="cursor:pointer">
        <div class="card-head">
          <span class="card-name">${icon(jobIconName(m.job, JOBS[m.job].role), 15)}${esc(m.name)}</span>
          ${roleTag(m.job)}
        </div>
        <div class="card-sub">${esc(job.name)} · Lv${m.level} · 平均装等 ${avg}</div>
      </div>`;
    })
    .join('');
  return `
  <div class="panel">
    <div class="panel-head">
      <div class="panel-title">${icon('party', 16)}选择小队（4 人）</div>
      <div class="panel-hint">已选 ${ui.party.length}/4 · 需要至少 1 坦克 1 治疗</div>
    </div>
    <div class="grid grid-members">${cards}</div>
  </div>`;
}

/**
 * 副本列表
 *
 * 交互取舍：一个章节有 13–31 个副本，全平铺会有三个问题——
 *   ① 手机上要滚几千像素（实测 3700px）；② 已通关的和待推进的混在一起；
 *   ③ 找不到"下一步该打哪个"。
 * 所以在标题栏加了筛选（待推进 / 可刷 / 全部），默认只看**待推进**。
 */
function renderDungeonList(state: GameState): string {
  const chain = chapterChain(state.chapter);
  const unlockedOf = (id: string) => isUnlocked(state, id);
  const clearedOf = (id: string) => isCleared(state, id);

  const groups = {
    todo: chain.filter((d) => unlockedOf(d.id) && !clearedOf(d.id)),
    farm: chain.filter((d) => clearedOf(d.id)),
    all: chain,
  };
  const list = groups[ui.dungeonFilter] ?? groups.todo;
  const nextId = groups.todo[0]?.id ?? null;

  const filterBtn = (id: DungeonFilter, label: string, n: number) =>
    `<button class="chip${ui.dungeonFilter === id ? ' active' : ''}" data-action="filter-dungeon" data-filter="${id}"
      data-tip="${label}：${n} 个">${label} <b>${n}</b></button>`;

  const cards = list.length
    ? list
        .map((d) => {
          const unlocked = unlockedOf(d.id);
          const cleared = clearedOf(d.id);
          const sel = ui.dungeonId === d.id;
          const isRoulette = !state.daily?.rouletteDone && state.daily?.rouletteDungeonId === d.id;
          const ilvl = d.reqItemLevel > 0 ? `iLvl ${d.reqItemLevel}` : '无装等要求';
          return `
      <div class="card${sel ? ' selected' : ''}${unlocked ? '' : ' locked'}"
           data-action="pick-dungeon" data-dungeon="${d.id}"
           style="cursor:${unlocked ? 'pointer' : 'not-allowed'}">
        <div class="card-head">
          <span class="card-name">${esc(d.name)}</span>
          ${d.id === nextId ? `<span class="tag tag-green" data-tip="沿着主线，下一个该打的副本">${icon('level', 12)}下一步</span>` : ''}
          ${isRoulette ? `<span class="tag tag-gold" data-tip="今日任务轮盘目标：通关可得金币 ×2.5 / 经验 ×2">${icon('cadence', 12)}轮盘 ×2.5</span>` : ''}
          ${cleared ? `<span class="tag" data-tip="已通关，可重复刷装备">${icon('check', 11)}已通关</span>` : ''}
          ${unlocked ? '' : `<span class="tag" data-tip="需先通关前一个副本">${icon('lock', 11)}未解锁</span>`}
        </div>
        <div class="card-sub">Lv${d.reqLevel} · ${ilvl} · ${d.enemies.length} 波敌人</div>
      </div>`;
        })
        .join('')
    : empty('check', '这一档没有副本', ui.dungeonFilter === 'todo' ? '本章能打的都通关了，去「已通关」里刷装备，或者挑战试炼 / 无尽塔。' : '换个筛选看看。');

  return `
  <div class="panel">
    <div class="panel-head">
      <div class="panel-title">${icon('node.battle', 16)}副本（第 ${state.chapter} 章）</div>
      <div class="chips">
        ${filterBtn('todo', '待推进', groups.todo.length)}
        ${filterBtn('farm', '已通关', groups.farm.length)}
        ${filterBtn('all', '全部', groups.all.length)}
      </div>
    </div>
    <div class="grid grid-dungeons">${cards}</div>
  </div>`;
}

function renderExpeditions(state: GameState): string {
  const list = state.expeditions.filter((e) => !e.collected).slice(0, 8);
  if (list.length === 0) {
    return `<div class="panel">
      <div class="panel-title">${icon('dispatch', 16)}进行中的派遣</div>
      ${empty('dispatch', '还没有队伍在外面', '在上方选好 4 人小队与一个副本，点「派遣小队」即可出发。队伍离线也会继续推进。')}
    </div>`;
  }
  const now = Date.now();
  const rows = list
    .map((e) => {
      const d = DUNGEON_BY_ID[e.dungeonId]!;
      const elapsed = now - e.startTs;
      const pct = Math.min(100, (elapsed / e.durationMs) * 100);
      const ready = e.status === 'ready';
      const names = e.memberIds.map((id) => findMember(state, id)?.name ?? '?').join('、');
      return `
      <div class="card" style="margin-bottom:8px">
        <div class="card-head">
          <span class="card-name">${esc(d.name)}</span>
          ${ready ? '<span class="tag tag-green">可收获</span>' : `<span class="tag">${fmtDuration(e.durationMs - elapsed)}</span>`}
          <span class="spacer"></span>
          <button class="btn btn-small" data-action="view-report" data-exp="${e.id}"
            ${ready ? '' : 'disabled'}
            title="${ready ? '查看战斗过程与掉落' : '队伍还在外面，回来后才解锁战报'}">战报</button>
          <button class="btn btn-primary btn-small" data-action="collect" data-exp="${e.id}" ${ready ? '' : 'disabled'}>收获</button>
        </div>
        ${barHtml(pct, { progressId: e.id, full: ready })}
        <div class="card-sub" style="margin-top:6px">${esc(names)}</div>
      </div>`;
    })
    .join('');
  return `
  <div class="panel">
    <div class="panel-head"><div class="panel-title">${icon('dispatch', 16)}进行中的派遣</div>
      <div class="panel-hint">进度基于时间戳，关闭页面也会继续</div></div>
    ${rows}
  </div>`;
}

function renderDispatchTab(state: GameState): string {
  const d = ui.dungeonId ? DUNGEON_BY_ID[ui.dungeonId] : undefined;
  const canGo = ui.party.length === 4 && !!d && isUnlocked(state, d.id);
  const info = d
    ? `<div class="row" style="margin-top:10px">
         <span class="muted small">目标：${esc(d.name)} · Lv${d.reqLevel}</span>
         <span class="spacer"></span>
         <button class="btn btn-primary" data-action="dispatch" ${canGo ? '' : 'disabled'}>派遣小队</button>
       </div>`
    : `<div class="muted small" style="margin-top:10px">请先在上方选择一个副本。</div>`;

  return (
    renderExpeditions(state) +
    renderPartyPicker(state) +
    renderDungeonList(state) +
    `<div class="panel"><div class="panel-title">${icon('dispatch', 16)}出击</div>${info}</div>`
  );
}

function renderMemberCard(state: GameState, m: MemberState): string {
  const job = JOBS[m.job];
  const snap = computeMemberStats(m, state.inventory, state.masteries?.[m.id] ?? [], relicTeamBonus(state));
  const avg = averageItemLevel(m, state.inventory);
  const need = expToNext(m.level);
  const pct = Math.min(100, (m.exp / need) * 100);
  const gear = SLOTS.map((s) => {
    const uid = m.equipment[s.id];
    const item = state.inventory.find((i) => i.uid === uid);
    return `<div class="gear-line${item ? ' has' : ''}">
      <span class="gear-ico">${icon(slotIconName(s.id), 15)}</span>
      <span class="gear-slot">${SLOT_LABEL[s.id]}</span>
      <span class="gear-name${item ? ` q-${item.quality}` : ' muted'}">${item ? esc(item.name) : '—'}</span>
      ${item ? `<span class="gear-ilvl">${item.itemLevel}</span>` : ''}
    </div>`;
  }).join('');
  const def = namedDef(m);
  const origin = def
    ? `名角 · ${def.title}`
    : `酒馆佣兵 · ${rarityName(m.rarity)}（资质 ×${m.potential.toFixed(2)}）`;
  // 用 <details> 折起来：名册能有十几号人，全展开会让队伍页长到没法用。
  // 默认收起，想细看某个人（装备 / 精通）再点开。
  return `
  <details class="panel member-detail">
    <summary class="panel-head">
      <div class="panel-title">${icon(jobIconName(m.job, job.role), 16)}${esc(m.name)} ${roleTag(m.job)}</div>
      <div class="panel-hint">${esc(job.name)} · Lv${m.level} · 平均装等 ${avg} · 出战 ${m.runs} 次</div>
    </summary>
    <div class="member-body">
    <div class="small muted" style="margin:0 0 6px">${esc(origin)}</div>
    <div class="bar exp"><i style="width:${pct.toFixed(1)}%"></i></div>
    <div class="small muted" style="margin:4px 0 8px">经验 ${m.exp} / ${need}</div>
    <div class="row small">
      <span>生命 <b>${snap.hp}</b></span>
      <span>效力 <b>${snap.potency}</b></span>
      ${snap.healPotency > 0 ? `<span>治疗 <b>${snap.healPotency}</b></span>` : ''}
      ${snap.mitigation > 0 ? `<span>减伤 <b>${Math.round(snap.mitigation * 100)}%</b></span>` : ''}
    </div>
    <div class="card-sub" style="margin:6px 0">${esc(job.gauge)}</div>
    <div class="sep"></div>
    <div class="row"><div style="flex:1">${gear}</div></div>
    <div class="card-actions">
      <button class="btn btn-small" data-action="auto-equip" data-member="${m.id}">自动装备最优</button>
    </div>
    ${renderMasteryBlock(state, m)}
    </div>
  </details>`;
}

/**
 * 职业量谱精通面板 —— FF14 没有天赋树，这是替代品（蓝图 §2 决策二）
 * 结构：T1a / T1b 二选一 → T2 → T3 顶点
 */
function renderMasteryBlock(state: GameState, m: MemberState): string {
  const rows = masteryRows(state, m.id);
  if (rows.length === 0) return '';
  const owned = rows.filter((r) => r.state === 'owned').length;
  const spent = masterySpent(state, m.id);
  const cells = rows
    .map((r) => {
      const tierLabel = r.tier === 1 ? 'Ⅰ' : r.tier === 2 ? 'Ⅱ' : 'Ⅲ';
      const cls = r.state === 'owned' ? ' chosen' : r.state === 'locked' ? ' locked' : '';
      const btn =
        r.state === 'owned'
          ? '<span class="tag tag-green">已解锁</span>'
          : `<button class="btn btn-small${r.state === 'available' ? ' btn-primary' : ''}"
               data-action="unlock-mastery" data-member="${m.id}" data-mastery="${r.id}"
               ${r.state === 'available' ? '' : 'disabled'}
               title="${esc(r.reason ?? '')}">${r.cost} 金</button>`;
      return `<div class="mastery-cell${cls}">
        <div class="mastery-tier">${tierLabel}</div>
        <div class="mastery-name">${esc(r.name)}</div>
        <div class="mastery-desc">${esc(r.desc)}</div>
        <div class="mastery-foot">${
          r.state === 'locked' && r.reason ? `<span class="muted small">${esc(r.reason)}</span>` : ''
        }${btn}</div>
      </div>`;
    })
    .join('');
  return `
    <div class="sep"></div>
    <div class="row" style="margin-bottom:6px">
      <span class="muted small">量谱精通</span>
      <span class="tag tag-gold">${owned} / ${rows.length}</span>      <span class="spacer"></span>
      <span class="muted small">已投入 ${spent} 金</span>
    </div>
    <div class="mastery-grid">${cells}</div>`;
}

/**
 * 队伍页
 *
 * 交互取舍：6 个成员各一张详情卡会堆成很长的页面，**没法横向对比**。
 * 所以在最上面加一张总览表（一屏看完所有人），详情卡保留在下面供深挖。
 */
function renderPartyTab(state: GameState): string {
  const cap = rosterCap(state);
  const rows = state.members
    .map((m) => {
      const snap = computeMemberStats(m, state.inventory, state.masteries?.[m.id] ?? [], relicTeamBonus(state));
      const avg = averageItemLevel(m, state.inventory);
      const owned = (state.masteries?.[m.id] ?? []).length;
      const relic = state.relics?.[m.id]?.stage ?? 0;
      const need = expToNext(m.level);
      const def = namedDef(m);
      const origin = def
        ? `<span class="tag tag-named" data-tip="${esc(def.title)}（剧情人物）">名角</span>`
        : `<span class="tag tag-hire" style="color:${rarityColor(m.rarity)};border-color:${rarityColor(m.rarity)}"
             data-tip="酒馆佣兵 · ${rarityName(m.rarity)}（资质 ×${m.potential.toFixed(2)}）">${rarityName(m.rarity)}</span>`;
      const block = dismissBlockReason(state, m.id);
      const confirming = ui.confirmDismiss === m.id;
      const dismissCell = block
        ? `<button class="btn btn-small" disabled data-tip="${esc(block)}">辞退</button>`
        : confirming
          ? `<button class="btn btn-small btn-danger" data-action="dismiss" data-member="${m.id}"
               data-tip="真的辞退？装备会留在背包里，但人没了">确认辞退</button>
             <button class="btn btn-small" data-action="dismiss-cancel">算了</button>`
          : `<button class="btn btn-small" data-action="dismiss-ask" data-member="${m.id}"
               data-tip="辞退后这个人就没了，装备会回背包">辞退</button>`;
      return `<tr>
        <td class="ov-name"><span class="ov-job">${icon(jobIconName(m.job, JOBS[m.job].role), 16)}</span>${esc(m.name)}</td>
        <td>${origin}</td>
        <td>${roleTag(m.job)}</td>
        <td class="ov-num">${m.level}</td>
        <td class="ov-num" data-tip="平均物品等级">${avg}</td>
        <td class="ov-num" data-tip="最大生命">${snap.hp}</td>
        <td class="ov-num" data-tip="效力：决定伤害">${snap.potency}</td>
        <td class="ov-num" data-tip="量谱精通：已解锁 / 总数">${owned}/4</td>
        <td class="ov-num" data-tip="幻境武器阶数">${relic || '—'}</td>
        <td class="ov-exp">
          <div class="bar exp" style="min-width:70px"><i style="width:${Math.min(100, (m.exp / need) * 100).toFixed(1)}%"></i></div>
          <span class="muted">${Math.round((m.exp / need) * 100)}%</span>
        </td>
        <td class="ov-act">
          <button class="btn btn-small" data-action="auto-equip" data-member="${m.id}"
            data-tip="按品质与属性自动换上更好的装备">自动装备</button>
          ${dismissCell}
        </td>
      </tr>`;
    })
    .join('');

  const overview = `
  <div class="panel">
    <div class="panel-head">
      <div class="panel-title">${icon('party', 16)}成员名册</div>
      <div class="panel-hint">${state.members.length} / ${cap} 人 · 上限靠推进章节与扩建工房提升 · 点下方卡片看装备与精通</div>
    </div>
    <div class="table-wrap">
      <table class="ov-table">
        <thead><tr>
          <th>成员</th><th>来源</th><th>职能</th><th>等级</th><th>装等</th><th>生命</th><th>效力</th><th>精通</th><th>幻境</th><th>经验</th><th></th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  </div>`;

  return overview + renderTavern(state) + renderCodex(state) +
    state.members.map((m) => renderMemberCard(state, m)).join('');
}

/** 稀有度对应的颜色（佣兵才有） */
function rarityColor(r: MemberState['rarity']): string {
  return RARITY_BY_ID[r]?.color ?? 'var(--q-common)';
}

/** 酒馆：今日候选 + 刷新 */
function renderTavern(state: GameState): string {
  const tv = state.tavern;
  if (!tv) return '';
  const cap = rosterCap(state);
  const full = state.members.length >= cap;
  const freeLeft = !tv.freeUsed;
  const paid = todayRerollCost(state);

  const cards = tv.candidates.length
    ? tv.candidates
        .map((c) => {
          const afford = state.gold >= c.cost;
          const why = full
            ? `名册已满（${cap} 人），先辞退一个`
            : afford
              ? `花 ${c.cost} 金币雇下这名${RARITY_BY_ID[c.rarity].name}佣兵`
              : `金币不足（需要 ${c.cost}）`;
          return `
      <div class="hire-card" style="border-left-color:${RARITY_BY_ID[c.rarity].color}">
        <div class="hire-head">
          <b>${esc(c.name)}</b>
          <span class="hire-rarity" style="color:${RARITY_BY_ID[c.rarity].color}">${RARITY_BY_ID[c.rarity].name}</span>
        </div>
        <div class="hire-meta">
          ${RACE_BY_ID[c.race].name} · ${esc(JOBS[c.job].name)}
          <span class="muted">Lv ${c.level} · 资质 ×${c.potential.toFixed(2)}</span>
        </div>
        <button class="btn btn-small ${full || !afford ? '' : 'btn-primary'}"
          data-action="hire" data-candidate="${c.id}"
          ${full || !afford ? 'disabled' : ''} data-tip="${esc(why)}">雇佣 · ${c.cost} 金</button>
      </div>`;
        })
        .join('')
    : empty('party', '今天的候选都被你雇走了', '明天 04:00 会有新的一批；也可以直接花钱重 roll。');

  return `
  <div class="panel">
    <div class="panel-head">
      <div class="panel-title">${icon('gold', 16)}酒馆 · 今日候选</div>
      <div class="panel-hint">
        每天 04:00 换一批 · 稀有度只影响资质（属性系数），名角不参与稀有度竞争
      </div>
    </div>
    <div class="hire-grid">${cards}</div>
    <div class="row" style="margin-top:10px">
      <button class="btn btn-small" data-action="reroll-tavern" data-free="1"
        data-tip="${freeLeft ? '每天一次的免费刷新' : '今天的免费刷新已经用掉了'}"
        ${freeLeft ? '' : 'disabled'}>免费刷新${freeLeft ? '（今日 1 次）' : '（已用完）'}</button>
      <button class="btn btn-small" data-action="reroll-tavern" data-free="0"
        data-tip="花金币立刻换一批候选"
        ${state.gold >= paid ? '' : 'disabled'}>花钱重 roll · ${paid} 金</button>
    </div>
  </div>`;
}

/** 名角图鉴：已获得的点亮点，没拿到的写清楚怎么拿 —— 这就是"奖励人物"的可见性 */
function renderCodex(state: GameState): string {
  const list = companionStatus(state);
  const owned = list.filter((x) => x.owned).length;
  const cells = list
    .map(({ def, owned: has, met, label }) => {
      const cls = has ? 'codex-cell owned' : met ? 'codex-cell ready' : 'codex-cell';
      const state_ = has ? '已在名册' : met ? '条件已达成，进入名册即可领取' : label;
      return `
      <div class="${cls}" data-tip="${esc(def.title)} · ${esc(state_)}">
        <span class="codex-ico">${icon(jobIconName(def.job, JOBS[def.job].role), 16)}</span>
        <span class="codex-name">${esc(def.name)}</span>
        <span class="codex-how">${esc(has ? '已获得' : met ? '可领取' : label)}</span>
      </div>`;
    })
    .join('');

  return `
  <div class="panel">
    <div class="panel-head">
      <div class="panel-title">
        <button class="btn btn-small" data-action="toggle-codex">${ui.showCodex ? '收起' : '展开'}</button>
        名角图鉴 ${owned} / ${list.length}
      </div>
      <div class="panel-hint">剧情人物不带专属机制，就是"一个有名字、职业固定、免费到手的人"</div>
    </div>
    ${ui.showCodex ? `<div class="codex-grid">${cells}</div>` : ''}
  </div>`;
}

function renderInventoryTab(state: GameState): string {
  const free = freeItems(state);
  if (free.length === 0) {
    return `<div class="panel">
      <div class="panel-title">${icon('inventory', 16)}背包</div>
      ${empty('inventory', '没有空闲装备', '通关副本、鉴定工房的待鉴定箱都会掉装备。已装备的物件不计入这里；可以用队伍页的「自动装备最优」一键穿上。')}
    </div>`;
  }
  const target = ui.party[0] ?? state.members[0]?.id;
  const items = [...free]
    .sort((a, b) => scoreOf(b) - scoreOf(a))
    .map(
      (i) => `
    <div class="item-card q-${i.quality}">
      <div class="item-top">
        <span class="item-ico">${icon(slotIconName(i.slot), 20)}</span>
        <span class="item-name q-${i.quality}">${esc(i.name)}</span>
        <span class="item-ilvl" data-tip="物品等级：决定装备强度">${i.itemLevel}</span>
      </div>
      <div class="item-meta">${SLOT_LABEL[i.slot]} · ${QUALITY_LABEL[i.quality]}</div>
      <div class="item-stats">
        <span data-tip="最大生命">生命 +${i.stats.hp}</span>
        <span data-tip="效力：决定伤害">效力 +${i.stats.potency}</span>
        ${i.stats.healPotency ? `<span data-tip="治疗效力">治疗 +${i.stats.healPotency}</span>` : ''}
      </div>
      <div class="card-actions">
        <button class="btn btn-small" data-action="equip" data-uid="${i.uid}" data-member="${target}"
          data-tip="装备给当前选中的首名队员">装备</button>
      </div>
    </div>`,
    )
    .join('');
  return `
  <div class="panel">
    <div class="panel-head"><div class="panel-title">${icon('inventory', 16)}背包（空闲 ${free.length} / 共 ${state.inventory.length}）</div>
      <div class="panel-hint">在队伍页用「自动装备最优」一键变强</div></div>
    <div class="grid grid-dungeons">${items}</div>
  </div>`;
}

function renderTrialTab(state: GameState): string {
  const run = state.trial;
  const best = state.trialBest ?? 0;

  /* -------- 未开始 / 已结束：组建队伍 -------- */
  // ⚠️ 这里必须是 `=== 'finished'`：写成 `!== 'finished'` 会把 `running` 也匹配进来，
  //    结果就是"开始试炼之后界面还停在组队页"，玩家看不到棋盘也点不到「推进」——
  //    整个玩法通过 UI 都玩不了。自动化测试没抓到，因为它们都走调试 API 直接推进。
  if (!run || run.status === 'finished') {
    const finishedBlock =
      run && run.status === 'finished'
        ? `<div class="panel">
             <div class="panel-head">
               <div class="panel-title">${icon('report', 16)}上一局结果</div>
               <div class="panel-hint">推进 ${run.nodeIndex} / ${run.nodes.length} 格</div>
             </div>
             <div class="row"><span>得分 <b style="color:var(--gold);font-size:18px">${run.score}</b></span>
               <span class="muted small">（历史最高 ${best}）</span></div>
             <div class="log-box" style="margin-top:8px">${run.log
               .slice(-14)
               .map((l) => `<div class="log-line">${esc(l)}</div>`)
               .join('')}</div>
           </div>`
        : '';

    const picker = state.members
      .map((m) => {
        const sel = ui.trialParty.includes(m.id);
        const job = JOBS[m.job];
        return `<div class="card${sel ? ' selected' : ''}" data-action="toggle-trial-party" data-member="${m.id}" style="cursor:pointer">
          <div class="card-head"><span class="card-name">${icon(jobIconName(m.job, JOBS[m.job].role), 15)}${esc(m.name)}</span>${roleTag(m.job)}</div>
          <div class="card-sub">${esc(job.name)} · Lv${m.level}</div>
        </div>`;
      })
      .join('');

    return `
    ${finishedBlock}
    <div class="panel">
      <div class="panel-head">
        <div class="panel-title">${icon('trial', 16)}破魔试炼</div>
        <div class="panel-hint">棋盘 roguelike · 队伍 ${TRIAL_PARTY_SIZE} 人 · 历史最高 ${best}</div>
      </div>
      <div class="muted small" style="margin-bottom:10px">
        一路推进 12 格，每格事件不同。<b>血量跨节点继承且不会自然回复</b>——
        只能靠营地或道具恢复。打到哪算哪，<b>放弃也按进度给分</b>。
        每格结束后分数与血量都会保留，随时可以关掉页面下次继续。
      </div>
      <div class="grid grid-members">${picker}</div>
      <div class="row" style="margin-top:10px">
        <span class="muted small">已选 ${ui.trialParty.length}/${TRIAL_PARTY_SIZE}（需 1 坦克 1 治疗）</span>
        <span class="spacer"></span>
        <button class="btn btn-primary" data-action="trial-start" ${ui.trialParty.length === TRIAL_PARTY_SIZE ? '' : 'disabled'}>
          开始试炼
        </button>
      </div>
    </div>`;
  }

  /* -------- 进行中 -------- */
  const mods = blessingsMods(run);
  const board = run.nodes
    .map((n) => {
      const cls = n.cleared ? 'cleared' : n.index === run.nodeIndex ? 'current' : '';
      const picked = ui.inspectNode === n.index ? ' inspected' : '';
      const tip = `${n.name}${n.cleared ? '（已通过）' : n.index === run.nodeIndex ? '（当前）' : '（点击查看详情）'}`;
      return `<button class="trial-node ${cls}${picked}" data-action="inspect-node" data-node="${n.index}"
        data-tip="${esc(tip)}" aria-label="${esc(n.name)}">
        <div class="trial-node-icon">${icon(nodeIconName(n.kind), 20)}</div>
        <div class="trial-node-idx">${n.index + 1}</div>
      </button>`;
    })
    .join('');

  const inspectPanel = renderTrialNodeDetail(state, run);

  const hpRows = run.roster
    .map((r) => {
      const cur = Math.max(0, run.hp[r.memberId] ?? 0);
      const pct = r.hp > 0 ? (cur / r.hp) * 100 : 0;
      const down = cur <= 0;
      return `<div class="row" style="gap:8px;margin-bottom:4px">
        <span style="min-width:96px${down ? ';opacity:.45' : ''}">${esc(r.name)}</span>
        <div class="bar" style="flex:1"><i style="width:${pct.toFixed(1)}%${down ? ';background:#5a2e2e' : ''}"></i></div>
        <span class="small muted" style="min-width:96px;text-align:right">${cur} / ${r.hp}${down ? ' 阵亡' : ''}</span>
      </div>`;
    })
    .join('');

  const blessings = run.blessings.length
    ? run.blessings
        .map((id) => {
          const b = trialBlessingName(id);
          return `<span class="tag tag-gold">${esc(b)}</span>`;
        })
        .join(' ')
    : '<span class="muted small">暂无（击败精英守卫可获得）</span>';

  const items = run.items.length
    ? run.items
        .map((id, i) => {
          const def = trialItemById(id);
          if (!def) return '';
          return `<button class="btn btn-small" data-action="trial-item" data-item="${def.id}" title="${esc(def.desc)}">
            ${esc(def.name)}${run.items.indexOf(id) === i ? '' : ''}
          </button>`;
        })
        .join(' ')
    : '<span class="muted small">暂无（遗落宝箱可获得）</span>';

  const curNode = run.nodes[run.nodeIndex];
  const nextLabel = curNode ? `${icon(nodeIconName(curNode.kind), 14)} ${esc(curNode.name)}` : '棋盘已走完';

  return `
  <div class="panel">
    <div class="panel-head">
      <div class="panel-title">${icon('trial', 16)}破魔试炼 · 进行中</div>
      <div class="panel-hint">第 ${run.nodeIndex + 1} / ${run.nodes.length} 格 · 当前得分 ${run.score} · 剩余血量 ${Math.round(trialHpPct(run) * 100)}%</div>
    </div>
    <div class="trial-board">${board}</div>
    <div class="muted small" style="margin-top:8px">点任意格子可以看那一格的敌人与产出。</div>
    <div class="row" style="margin-top:10px">
      <span class="muted small">下一格：</span><b>${nextLabel}</b>
      <span class="spacer"></span>
      <button class="btn btn-small" data-action="trial-abandon">放弃结算</button>
      <button class="btn btn-primary" data-action="trial-advance" ${curNode ? '' : 'disabled'}>推进 ▶</button>
    </div>
  </div>

  ${inspectPanel}

  <div class="panel">
    <div class="panel-title">${icon('party', 16)}队伍状态</div>
    <div style="margin-top:8px">${hpRows}</div>
    <div class="sep"></div>
    <div class="row"><span class="muted small" style="min-width:74px">本局祝福</span><div>${blessings}</div></div>
    <div class="row" style="margin-top:6px"><span class="muted small" style="min-width:74px">一次性道具</span><div>${items}</div></div>
    <div class="row" style="margin-top:6px">
      <span class="muted small" style="min-width:74px">当前增益</span>
      <span class="small">伤害 ×${mods.damageMult.toFixed(2)} · 受伤 ×${mods.takenMult.toFixed(2)}${
        run.nextBattle.damageMult !== 1 || run.nextBattle.takenMult !== 1
          ? ` · <b class="q-epic">下场战斗：伤害 ×${run.nextBattle.damageMult.toFixed(2)} / 受伤 ×${run.nextBattle.takenMult.toFixed(2)}</b>`
          : ''
      }</span>
    </div>
  </div>

  <div class="panel">
    <div class="panel-title">${icon('report', 16)}试炼日志</div>
    <div class="log-box" style="margin-top:8px">${run.log
      .slice(-24)
      .map((l) => `<div class="log-line">${esc(l)}</div>`)
      .join('')}</div>
  </div>`;
}

/** 只取祝福名（避免 UI 依赖 blessingsMods 的返回值形状） */
function trialBlessingName(id: string): string {
  const map: Record<string, string> = {
    might: '力量祝福',
    vigor: '活力祝福',
    aegis: '守护祝福',
    focus: '专注祝福',
  };
  return map[id] ?? id;
}

function renderRelicTab(state: GameState): string {
  const cards = state.members
    .map((m) => {
      const info = relicInfo(state, m.id);
      const rows = info.rows
        .map((r) => {
          const pct = r.need > 0 ? Math.min(100, (r.current / r.need) * 100) : 100;
          const cls = r.done ? 'relic-stage done' : r.active ? 'relic-stage active' : 'relic-stage';
          return `<div class="${cls}">
            <div class="row" style="gap:6px">
              <b class="small">第 ${r.def.stage} 阶 · ${esc(r.def.name)}</b>
              ${r.done ? '<span class="tag tag-green">已完成</span>' : ''}
              <span class="spacer"></span>
              <span class="muted small">${esc(r.def.label)} ${r.current} / ${r.need}</span>
            </div>
            <div class="bar" style="margin:4px 0"><i style="width:${pct.toFixed(1)}%"></i></div>
            <div class="muted small">${esc(r.def.effect)} · 消耗 ${r.def.gold} 金</div>
          </div>`;
        })
        .join('');

      const btn = info.current
        ? `<button class="btn btn-small${info.canAdvance ? ' btn-primary' : ''}"
             data-action="advance-relic" data-member="${m.id}"
             ${info.canAdvance ? '' : 'disabled'}
             title="${esc(info.reason ?? '')}">
             ${info.canAdvance ? `推进至第 ${info.current.stage} 阶（${info.current.gold} 金）` : esc(info.reason ?? '')}
           </button>`
        : '<span class="tag tag-gold">全阶完成</span>';

      return `
      <div class="panel">
        <div class="panel-head">
          <div class="panel-title">${esc(m.name)} ${roleTag(m.job)}</div>
          <div class="panel-hint">幻境进度 ${info.stage} / ${RELIC_STAGES.length}${
            info.finalBonusActive ? ' · <b class="q-legendary">终阶加成已生效</b>' : ''
          }</div>
        </div>
        ${rows}
        <div class="card-actions">${btn}</div>
      </div>`;
    })
    .join('');

  return `
  <div class="panel">
    <div class="panel-title">${icon('relic', 16)}幻境武器 · 长线至尊目标</div>
    <div class="muted small" style="margin-top:6px">
      每一阶都要求去玩一个不同的系统——副本、讨伐、破魔试炼、每日轮盘，直到通关整章。
      武器会直接装备到主手，装等远高于同期副本掉落；终阶还会给<b>全队永久加成</b>。
    </div>
  </div>
  ${cards}`;
}

function renderTowerTab(state: GameState): string {
  const run = state.tower;

  /* -------- 未开始：组队 -------- */
  if (!run) {
    const picker = state.members
      .map((m) => {
        const sel = ui.towerParty.includes(m.id);
        const job = JOBS[m.job];
        return `<div class="card${sel ? ' selected' : ''}" data-action="toggle-tower-party" data-member="${m.id}" style="cursor:pointer">
          <div class="card-head"><span class="card-name">${icon(jobIconName(m.job, JOBS[m.job].role), 15)}${esc(m.name)}</span>${roleTag(m.job)}</div>
          <div class="card-sub">${esc(job.name)} · Lv${m.level}</div>
        </div>`;
      })
      .join('');

    const memPct = Math.round((towerMemoryMult(state.towerMemory ?? 0) - 1) * 100);
    const season = state.towerSeason ?? { key: '', best: 0 };

    return `
    <div class="panel">
      <div class="panel-head">
        <div class="panel-title">${icon('tower', 16)}无尽塔</div>
        <div class="panel-hint">队伍 ${TOWER_PARTY_SIZE} 人 · 历史最高 ${state.towerBest ?? 0} 层 · 本赛季 ${season.best ?? 0} 层</div>
      </div>
      <div class="muted small" style="margin-bottom:10px">
        <b>无限层数</b>的连续挑战：进塔后<b>从 1 级重新成长</b>，血量跨层继承且不自然回复，
        每 ${TOWER.restEveryFloors} 层是休整层，每 ${TOWER.boxEveryFloors} 层给一个待鉴定箱。<br>
        倒下或主动撤退都会<b>结算当前收益并清零进度</b>——但<b>塔之记忆永久保留</b>
        （当前 <b class="q-epic">+${memPct}%</b> 全队属性），所以每次攀爬都比上次更强。
      </div>
      <div class="grid grid-members">${picker}</div>
      <div class="row" style="margin-top:10px">
        <span class="muted small">已选 ${ui.towerParty.length}/${TOWER_PARTY_SIZE}（需 1 坦克 1 治疗）</span>
        <span class="spacer"></span>
        <button class="btn btn-primary" data-action="tower-start"
          ${ui.towerParty.length === TOWER_PARTY_SIZE ? '' : 'disabled'}>开始攀爬</button>
      </div>
    </div>`;
  }

  /* -------- 攀爬中 -------- */
  const lvMult = towerLevelMult(run.level);
  const memMult = towerMemoryMult(state.towerMemory ?? 0);
  const hpRows = run.roster
    .map((r) => {
      const cur = Math.max(0, run.hp[r.memberId] ?? 0);
      const pct = r.hp > 0 ? (cur / r.hp) * 100 : 0;
      const down = cur <= 0;
      return `<div class="row" style="gap:8px;margin-bottom:4px">
        <span style="min-width:96px${down ? ';opacity:.45' : ''}">${esc(r.name)}</span>
        <div class="bar" style="flex:1"><i style="width:${pct.toFixed(1)}%${down ? ';background:#5a2e2e' : ''}"></i></div>
        <span class="small muted" style="min-width:96px;text-align:right">${cur} / ${r.hp}${down ? ' 阵亡' : ''}</span>
      </div>`;
    })
    .join('');

  const nextIsRest = isRestFloor(run.floor);
  const nextIsBox = isBoxFloor(run.floor);

  // 接下来 6 层预览：让"再爬几层"变成可以规划的决定，而不是盲推
  const upcoming = Array.from({ length: 6 }, (_, i) => run.floor + i).map((f, i) => {
    const isRest = isRestFloor(f);
    const isBoss = isBossFloor(f);
    const isBox = isBoxFloor(f);
    const kind = isBoss ? '层主' : isRest ? '休整' : '战斗';
    const ico = isBoss ? icon('node.boss', 16) : isRest ? icon('node.camp', 16) : icon('node.battle', 16);
    const cls = i === 0 ? ' next now' : ' next';
    const tips = [kind];
    if (isBox) tips.push('产出 1 个待鉴定箱');
    if (isBoss) tips.push('强度是普通层的 2.8 倍');
    if (isRest) tips.push(`回复 ${Math.round(TOWER.restHealPct * 100)}% 生命`);
    return `<div class="floor${cls}${isBoss ? ' boss' : ''}${isRest ? ' rest' : ''}"
      data-tip="第 ${f} 层 · ${tips.join(' · ')}">
      <div class="floor-ico">${ico}</div>
      <div class="floor-no">${f}</div>
      ${isBox ? `<div class="floor-box">${icon('box', 11)}</div>` : ''}
    </div>`;
  }).join('');

  return `
  <div class="panel">
    <div class="panel-head">
      <div class="panel-title">${icon('tower', 16)}无尽塔 · 攀爬中</div>
      <div class="panel-hint">当前 ${floorLabel(run.floor)} · 塔内等级 ${run.level} · 已到达 ${floorLabel(Math.max(1, run.reached))}</div>
    </div>
    <div class="row">
      <span class="small">塔内等级加成 <b>+${Math.round((lvMult - 1) * 100)}%</b></span>
      <span class="small">塔之记忆 <b class="q-epic">+${Math.round((memMult - 1) * 100)}%</b></span>
      <span class="small">本次收益 <b style="color:var(--gold)">${run.gold}</b> 金 / <b style="color:var(--gold)">${run.boxes}</b> 箱</span>
      <span class="spacer"></span>
      <button class="btn btn-small" data-action="tower-retreat">撤退结算</button>
      <button class="btn btn-primary" data-action="tower-climb">
        ${nextIsRest ? '休整并前进 ▶' : `挑战 ${floorLabel(run.floor)} ▶`}
      </button>
    </div>

    <div class="floor-strip">${upcoming}</div>
    <div class="row muted small" style="margin-top:4px">
      <span>每 ${TOWER.bossEveryFloors} 层是<b style="color:#d9645f">层主</b></span>
      <span>·</span>
      <span>每 ${TOWER.restEveryFloors} 层是<b style="color:#d6b23f">休整层</b>（层主层除外）</span>
      <span>·</span>
      <span>每 ${TOWER.boxEveryFloors} 层产出<b>待鉴定箱</b></span>
    </div>
    ${nextIsBox ? '<div class="muted small" style="margin-top:6px">通过这一层可获得 1 个待鉴定箱。</div>' : ''}
  </div>

  <div class="panel">
    <div class="panel-title">${icon('party', 16)}队伍状态</div>
    <div style="margin-top:8px">${hpRows}</div>
    <div class="row" style="margin-top:6px">
      <span class="muted small">剩余生命 ${Math.round(towerHpPct(run) * 100)}%</span>
    </div>
  </div>

  <div class="panel">
    <div class="panel-title">${icon('report', 16)}攀爬日志</div>
    <div class="log-box" style="margin-top:8px">${run.log
      .slice(-22)
      .map((l) => `<div class="log-line">${esc(l)}</div>`)
      .join('')}</div>
  </div>`;
}

/** 棋盘节点详情：点一格看看"前面有什么"，再决定要不要继续 */
function renderTrialNodeDetail(_state: GameState, run: TrialRun): string {
  const idx = ui.inspectNode;
  if (idx === null || idx === undefined) return '';
  const node = run.nodes[idx];
  if (!node) return '';

  const KIND_DESC: Record<string, string> = {
    battle: '普通战斗：消耗血量换取得分。',
    elite: '精英守卫：更硬更痛，但通过后获得一个局内永久祝福。',
    camp: '休整营地：无战斗，全队回复 25% 生命——本局唯一稳定的回血来源。',
    treasure: '遗落宝箱：获得一个一次性道具。',
    boss: '守关者：棋盘终点的强敌，通过即通关本局。',
  };

  let body = '';
  if (node.kind === 'battle' || node.kind === 'elite' || node.kind === 'boss') {
    const enemies = makeEnemies(node, run.chapter, run.seed);
    const totalHp = enemies.reduce((s, e) => s + e.hp, 0);
    const totalDps = enemies.reduce((s, e) => s + e.dps, 0);
    body = `
      <div class="row" style="margin:6px 0">
        <span class="small muted">共 ${enemies.length} 个敌人</span>
        <span class="small" data-tip="敌人总生命">总生命 <b>${totalHp.toLocaleString()}</b></span>
        <span class="small" data-tip="敌人合计每秒伤害">总伤害 <b>${totalDps}</b>/秒</span>
        <span class="small" data-tip="通过该格可得的分数">得分 <b style="color:var(--gold)">${NODE_SCORE[node.kind]}</b></span>
      </div>
      <div class="enemy-list">
        ${enemies
          .map(
            (e) => `<div class="enemy-row">
              <span class="enemy-name">${e.boss ? icon('node.boss', 13) : ''}${esc(e.name)}</span>
              <span class="muted">生命 ${e.hp.toLocaleString()}</span>
              <span class="muted">${e.dps}/秒</span>
            </div>`,
          )
          .join('')}
      </div>`;
  } else {
    body = `<div class="muted small" style="margin-top:6px">
      ${node.kind === 'camp' ? `通过后塔内等级照常提升；当前队伍剩余生命 ${Math.round(trialHpPct(run) * 100)}%。` : '通过后获得本局的一次性道具，可在下方随时使用。'}
    </div>`;
  }

  return `
  <div class="panel node-detail">
    <div class="panel-head">
      <div class="panel-title">${icon(nodeIconName(node.kind), 16)}第 ${node.index + 1} 格 · ${esc(node.name)}</div>
      <div class="panel-hint">${node.cleared ? '已通过' : node.index === run.nodeIndex ? '当前所在' : '尚未到达'}</div>
    </div>
    <div class="small muted">${esc(KIND_DESC[node.kind] ?? '')}</div>
    ${body}
  </div>`;
}

function renderFacilityTab(state: GameState): string {
  const now = Date.now();
  const info = facilityInfo(state, now);
  const def = levelDef(info.level);
  const pct = def.capHours > 0 ? Math.min(100, (info.elapsedHours / def.capHours) * 100) : 0;

  // 槽位：每个槽位显示当前项目 + 可切换的项目按钮
  const slots = info.slots
    .map((cur, i) => {
      const curDef = cur ? projectById(cur) : undefined;
      const pickers = PROJECTS.map((p) => {
        const locked = p.unlockLevel > info.level;
        const chosen = cur === p.id;
        return `<button class="btn btn-small${chosen ? ' btn-primary' : ''}"
          data-action="facility-assign" data-slot="${i}" data-project="${p.id}"
          ${locked ? 'disabled' : ''} title="${esc(p.desc)}${locked ? `（需 ${p.unlockLevel} 级）` : ''}">
          ${esc(p.name)}</button>`;
      }).join(' ');
      return `
      <div class="card">
        <div class="card-head">
          <span class="card-name">槽位 ${i + 1}</span>
          ${curDef ? `<span class="tag tag-green">${esc(curDef.name)}</span>` : '<span class="tag">空闲</span>'}
        </div>
        <div class="card-sub">${
          curDef ? `金币 ${curDef.goldPerHour}/h · 待鉴定箱 ${curDef.boxesPerHour}/h` : '指派一个项目开始产出'
        }</div>
        <div class="card-actions">${pickers}
          ${curDef ? `<button class="btn btn-small" data-action="facility-assign" data-slot="${i}" data-project="none">停工</button>` : ''}
        </div>
      </div>`;
    })
    .join('');

  const upgradeBtn = info.upgradeCost === null
    ? '<span class="tag tag-gold">已达最高等级</span>'
    : `<button class="btn btn-small${state.gold >= info.upgradeCost ? ' btn-primary' : ''}"
         data-action="facility-upgrade" ${state.gold >= info.upgradeCost ? '' : 'disabled'}>
         升级至 ${info.level + 1} 级（${info.upgradeCost} 金 · ${levelDef(info.level + 1).slots} 槽位 / ${levelDef(info.level + 1).capHours}h 上限）
       </button>`;

  const groovePct = Math.round((info.groove / GROOVE_MAX) * 100);

  return `
  <div class="panel">
    <div class="panel-head">
      <div class="panel-title">${icon('facility', 16)}工房 · 离线生产线（${info.level} / ${FACILITY_LEVELS.length} 级）</div>
      <div class="panel-hint">槽位 ${info.slots.length} · 储存上限 ${def.capHours} 小时</div>
    </div>
    <div class="muted small" style="margin-bottom:10px">
      按<b>真实时间</b>产出，关掉页面也继续。<b>超过储存上限就停产</b>；
      按时回来领取会累积<b>连续加成</b>（最高 +${Math.round(GROOVE_MAX * 100)}%），
      一旦溢出则加成归零。
    </div>

    <div class="row" style="margin-bottom:6px">
      <span class="muted small">已积累</span>
      <b data-facility-text>${info.elapsedHours.toFixed(1)} / ${def.capHours} 小时</b>
      ${info.saturated ? '<span class="tag" style="color:var(--red);border-color:#5d3030">已溢出停产</span>' : ''}
      <span class="spacer"></span>
      <span class="muted small">剩余可积累 ${info.hoursToCap.toFixed(1)} 小时</span>
    </div>
    <div class="bar" data-facility-bar><i data-facility-fill style="width:${pct.toFixed(1)}%"></i></div>

    <div class="row" style="margin-top:10px">
      <span>可领取 <b style="color:var(--gold)" data-facility-gold>${info.pendingGold}</b> 金币</span>
      <span>·</span>
      <span><b style="color:var(--gold)" data-facility-boxes>${info.pendingBoxes}</b> 个待鉴定箱</span>
      <span class="spacer"></span>
      <span class="muted small">连续加成 ${groovePct}%</span>
      <button class="btn btn-primary btn-small" data-action="facility-collect"
        ${info.pendingGold > 0 || info.pendingBoxes > 0 ? '' : 'disabled'}>领取产出</button>
    </div>
  </div>

  <div class="panel">
    <div class="panel-head">
      <div class="panel-title">${icon('anvil', 16)}生产槽位</div>
      <div class="panel-hint">切换项目会先把当前累计入库，不会丢产量</div>
    </div>
    <div class="grid grid-dungeons">${slots}</div>
  </div>

  <div class="panel">
    <div class="panel-head">
      <div class="panel-title">${icon('box', 16)}待鉴定箱</div>
      <div class="panel-hint">装等约 ${boxItemLevelHint(info.level, state.chapter)}</div>
    </div>
    <div class="row">
      <span>库存 <b style="color:var(--gold)">${info.boxes}</b> 个</span>
      <span class="spacer"></span>
      <button class="btn btn-small" data-action="facility-open" data-all="0" ${info.boxes > 0 ? '' : 'disabled'}>鉴定 1 个</button>
      <button class="btn btn-primary btn-small" data-action="facility-open" data-all="1" ${info.boxes > 0 ? '' : 'disabled'}>全部鉴定</button>
    </div>
  </div>

  <div class="panel">
    <div class="panel-head"><div class="panel-title">${icon('store', 16)}扩建</div></div>
    <div class="row">${upgradeBtn}</div>
  </div>`;
}

function boxItemLevelHint(level: number, chapter: number): number {
  return 20 + level * 22 + chapter * 30;
}

function renderCadenceTab(state: GameState): string {
  const now = Date.now();
  const rouletteId = state.daily?.rouletteDungeonId ?? null;
  const roulette = rouletteId ? DUNGEON_BY_ID[rouletteId] : undefined;
  const done = !!state.daily?.rouletteDone;
  const counters = state.weekly?.counters ?? {};
  const stickers = tailStickers(state);
  const claimable = tailClaimable(state);

  const dailyPanel = `
  <div class="panel">
    <div class="panel-head">
      <div class="panel-title">${icon('cadence', 16)}每日 · 任务轮盘</div>
      <div class="panel-hint">${dayKey(now)} · 距重置 ${fmtWait(msUntilDailyReset(now))}</div>
    </div>
    ${
      roulette
        ? `<div class="row">
             <span class="tag tag-gold">今日目标</span>
             <b>${esc(roulette.name)}</b>
             <span class="muted small">Lv${roulette.reqLevel} · 通关可得 <b class="q-epic">金币 ×2.5 / 经验 ×2</b> + 一件额外装备</span>
             <span class="spacer"></span>
             ${done ? '<span class="tag tag-green">今日已完成</span>' : '<span class="tag">未完成</span>'}
             <button class="btn btn-small" data-action="pick-dungeon" data-dungeon="${roulette.id}">去派遣</button>
           </div>`
        : empty('cadence', '今日还没有轮盘目标', '通关任意副本后，明日的轮盘会从你已通关的副本里抽取；新号会先指向本章第一个副本。')
    }
  </div>`;

  const cells = TAIL_TASKS.map((t, i) => {
    const stamped = stickers.includes(i);
    const cur = Math.min(counters[t.metric] ?? 0, t.need);
    return `
    <div class="tail-cell${stamped ? ' stamped' : ''}">
      <div class="tail-label">${esc(t.label)}</div>
      <div class="tail-prog">${cur} / ${t.need}</div>
      ${stamped ? `<div class="tail-stamp">${icon('check', 14)}</div>` : ''}
    </div>`;
  }).join('');

  const lines = TAIL_LINES.map((l) => {
    const can = claimable.includes(l.id);
    const taken = (state.weekly?.claimedLines ?? []).includes(l.id);
    return `<button class="btn btn-small${can ? ' btn-primary' : ''}" data-action="claim-line" data-line="${l.id}" ${can ? '' : 'disabled'}>
      ${esc(l.label)}${taken ? ` ${icon('check', 12)}` : ''}
    </button>`;
  }).join('');

  const weeklyPanel = `
  <div class="panel">
    <div class="panel-head">
      <div class="panel-title">${icon('report', 16)}每周 · 天书奇谭</div>
      <div class="panel-hint">已盖章 ${stickers.length}/9 · 本周已领 ${state.weekly?.claims ?? 0} 条 · 距重置 ${fmtWait(msUntilWeeklyReset(now))}</div>
    </div>
    <div class="tail-grid">${cells}</div>
    <div class="sep"></div>
    <div class="row" style="gap:6px">${lines}</div>
    <div class="muted small" style="margin-top:8px">
      完成 9 格任务中的任意一条线（3 横 / 3 竖 / 2 斜）即可领奖；领得越多，单次奖励越高。
      每周${weekKey(now)}重置。
    </div>
  </div>`;

  return dailyPanel + weeklyPanel;
}

/**
 * 战报页
 *
 * ⚠️ 只有**已经回来**（ready / 已收获）的派遣才允许查看战报。
 * 派遣采用「派遣即结算」——结果在派出的那一刻就算好了，
 * 若不过滤状态，队伍还在外面就能看到结局与掉落，把等待过程的意义全部泄露掉。
 */
function renderReportTab(state: GameState): string {
  const finished = state.expeditions.filter((x) => x.result && (x.status === 'ready' || x.collected));
  const e: Expedition | undefined =
    finished.find((x) => x.id === ui.openExpedition) ?? finished[0];

  if (!e?.result) {
    const running = state.expeditions.find((x) => !x.collected && x.status === 'running');
    if (running) {
      const d = DUNGEON_BY_ID[running.dungeonId]!;
      const left = Math.max(0, running.durationMs - (Date.now() - running.startTs));
      return `
      <div class="panel">
        <div class="panel-title">${icon('report', 16)}战报</div>
        <div class="muted small" style="margin-top:6px">
          队伍还在「${esc(d.name)}」里，预计还需 <b>${fmtDuration(left)}</b>。<br>
          战报会在队伍回来后解锁——在那之前，结局与掉落都还是未知的。
        </div>
      </div>`;
    }
    return `<div class="panel"><div class="panel-title">${icon('report', 16)}战报</div>${empty('report', '还没有战报', '派一支队伍出去，等他们回来就能在这里看到逐回合的战斗过程、爆发窗口与掉落。<br>战报在你回来之前不会解锁——结局是未知的。')}</div>`;
  }
  const d = DUNGEON_BY_ID[e.dungeonId]!;
  const r = e.result;
  const logs = r.log.map((l) => `<div class="log-line">${esc(l)}</div>`).join('');
  const loot = r.loot.length
    ? r.loot.map((i) => `<div class="log-line loot">获得 ${esc(i.name)}（${SLOT_LABEL[i.slot]} · 装等 ${i.itemLevel}）</div>`).join('')
    : '<div class="log-line muted">无战利品</div>';
  return `
  <div class="panel">
    <div class="panel-head">
      <div class="panel-title">${esc(d.name)} · ${r.win ? '通关' : '失败'}</div>
      <div class="panel-hint">用时 ${r.durationSec} 秒 · 剩余生命 ${Math.round(r.hpLeftPct * 100)}% · 种子 ${e.seed}</div>
    </div>
    <div class="log-box">${logs}<div class="sep"></div>${loot}</div>
  </div>`;
}

function renderFooter(): string {
  const single = singleFileUrl();
  return `
  <div class="row" style="margin-bottom:8px">
    <button class="btn btn-small" data-action="save-now">立即存档</button>
    <button class="btn btn-small" data-action="export">导出存档</button>
    ${
      single
        ? `<a class="btn btn-small" href="${single}" download>下载单文件版</a>`
        : ''
    }
    <span class="ver-chip" data-tip="页面上显示的版本号＝这次构建。手机上加到主屏后没有刷新按钮，靠它确认更新有没有生效。">${esc(versionLabel())}</span>
  </div>
  <div class="disclaimer">
    <b>非官方同人作品</b>：本作品为非商业同人创作，与 SQUARE ENIX CO., LTD. 无任何关联。
    FINAL FANTASY 是 SQUARE ENIX 的注册商标。本作品<b>不使用</b>其美术、音乐、文本或数据；
    所有数值与文案均为本项目自研。若权利人要求，将立即下架。
  </div>`;
}

export function render(): void {
  const state = store.get();
  const root = document.getElementById('app');
  if (!root) return;
  if (!state) {
    root.innerHTML = `<div class="panel"><div class="panel-title">加载中…</div></div>`;
    return;
  }

  let body = '';
  switch (ui.tab) {
    case 'dispatch': body = renderDispatchTab(state); break;
    case 'trial': body = renderTrialTab(state); break;
    case 'party': body = renderPartyTab(state); break;
    case 'inventory': body = renderInventoryTab(state); break;
    case 'cadence': body = renderCadenceTab(state); break;
    case 'relic': body = renderRelicTab(state); break;
    case 'facility': body = renderFacilityTab(state); break;
    case 'tower': body = renderTowerTab(state); break;
    case 'report': body = renderReportTab(state); break;
  }

  root.innerHTML = `
  <div class="shell">
    ${renderNav(state)}
    <main class="main">
      ${renderTopbar(state)}
      <div class="content">${body}</div>
      ${renderFooter()}
    </main>
  </div>`;
}

/** 只更新进度条（1Hz），不触发整体重绘 */
export function renderProgressOnly(): void {
  const state = store.get();
  if (!state) return;
  const now = Date.now();
  for (const e of state.expeditions) {
    const bar = document.querySelector<HTMLElement>(`[data-progress="${e.id}"] > i`);
    if (!bar) continue;
    const pct = Math.min(100, ((now - e.startTs) / e.durationMs) * 100);
    bar.style.width = `${pct.toFixed(1)}%`;
  }

  // 工房：1Hz 只更新进度条与文本，不整体重绘（蓝图 §10.1 第 14 条）
  const fill = document.querySelector<HTMLElement>('[data-facility-fill]');
  const text = document.querySelector<HTMLElement>('[data-facility-text]');
  const goldEl = document.querySelector<HTMLElement>('[data-facility-gold]');
  const boxEl = document.querySelector<HTMLElement>('[data-facility-boxes]');
  if (fill || text || goldEl || boxEl) {
    const info = facilityInfo(state, now);
    const cap = levelDef(info.level).capHours;
    if (fill) fill.style.width = `${Math.min(100, (info.elapsedHours / cap) * 100).toFixed(1)}%`;
    if (text) text.textContent = `${info.elapsedHours.toFixed(1)} / ${cap} 小时`;

    // ⚠️ 待领取数字与「领取」按钮的可用状态也必须跟着刷新。
    //    曾经只刷了进度条，导致"产出攒够了但按钮还是灰的"——玩家不切页面就领不了。
    const has = info.pendingGold > 0 || info.pendingBoxes > 0;
    if (goldEl) goldEl.textContent = String(info.pendingGold);
    if (boxEl) boxEl.textContent = String(info.pendingBoxes);
    const btn = document.querySelector<HTMLButtonElement>('[data-action="facility-collect"]');
    if (btn) btn.disabled = !has;
  }

  // 顶部资源条：数值变化时给一次"跳一下 + 变亮"的反馈。
  // 这是放置游戏的核心快感来源——数字在涨要看得见。
  const p = pendingCount(state);
  const resValues: Record<string, string> = {
    gold: state.gold.toLocaleString(),
    box: String(state.facility?.boxes ?? 0),
    running: String(p.running),
    ready: String(p.ready),
    memory: `+${Math.round((towerMemoryMult(state.towerMemory ?? 0) - 1) * 100)}%`,
  };
  for (const [key, value] of Object.entries(resValues)) {
    const el = document.querySelector<HTMLElement>(`[data-res="${key}"]`);
    if (!el) continue;
    if (el.textContent === value) continue;
    el.textContent = value;
    // 重启动画：先移除类，强制回流，再加回
    el.classList.remove('bump');
    void el.offsetWidth;
    el.classList.add('bump');
    const chipEl = el.closest<HTMLElement>('.res');
    if (chipEl) {
      chipEl.classList.add('flash');
      window.setTimeout(() => chipEl.classList.remove('flash'), 700);
    }
  }
}

/* ---------------- 悬停说明（tooltip） ---------------- */

/**
 * 单例 tooltip：任何带 `data-tip` 的元素都会在悬停时显示说明。
 * 放在 body 上用 fixed 定位，避免被卡片的 overflow 裁掉。
 */
let tipEl: HTMLDivElement | null = null;
let tipOwner: HTMLElement | null = null;

function showTip(owner: HTMLElement, ev: MouseEvent): void {
  if (!tipEl) {
    tipEl = document.createElement('div');
    tipEl.className = 'tip';
    document.body.appendChild(tipEl);
  }
  tipEl.textContent = owner.dataset.tip ?? '';
  tipEl.classList.add('show');
  tipOwner = owner;
  moveTip(ev);
}

function moveTip(ev: MouseEvent): void {
  if (!tipEl) return;
  const pad = 12;
  const w = tipEl.offsetWidth;
  const h = tipEl.offsetHeight;
  let x = ev.clientX + 14;
  let y = ev.clientY + 16;
  if (x + w + pad > window.innerWidth) x = ev.clientX - w - 14;
  if (y + h + pad > window.innerHeight) y = ev.clientY - h - 12;
  tipEl.style.left = `${Math.max(pad, x)}px`;
  tipEl.style.top = `${Math.max(pad, y)}px`;
}

function hideTip(): void {
  if (tipEl) tipEl.classList.remove('show');
  tipOwner = null;
}

/* ---------------- 事件委托 ---------------- */

export function bindEvents(): void {
  document.addEventListener('click', (ev) => {
    const target = (ev.target as HTMLElement)?.closest<HTMLElement>('[data-action]');
    if (!target) return;
    const action = target.dataset.action!;
    const handler = ACTIONS[action];
    if (!handler) {
      console.warn(`[ui] 未注册的 action: ${action}`);
      return;
    }
    handler(target, ev);
  });

  // 悬停说明：用事件委托，重绘后无需重新绑定
  document.addEventListener('mouseover', (ev) => {
    const owner = (ev.target as HTMLElement)?.closest<HTMLElement>('[data-tip]');
    if (!owner) return;
    if (owner === tipOwner) return;
    showTip(owner, ev);
  });
  document.addEventListener('mousemove', (ev) => {
    if (tipOwner) moveTip(ev);
  });
  document.addEventListener('mouseout', (ev) => {
    const owner = (ev.target as HTMLElement)?.closest<HTMLElement>('[data-tip]');
    if (owner && owner === tipOwner) hideTip();
  });
  // 点击后重绘会移除元素，顺手收起 tooltip
  document.addEventListener('click', () => hideTip(), true);

  // 键盘：1–9 切页、Esc 收起说明（"交互科学"的一部分）
  document.addEventListener('keydown', (ev) => {
    if (ev.ctrlKey || ev.metaKey || ev.altKey) return;
    const tag = (ev.target as HTMLElement | null)?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    if (ev.key === 'Escape') {
      hideTip();
      return;
    }
    const n = Number(ev.key);
    if (Number.isInteger(n) && n >= 1 && n <= TAB_ORDER.length) {
      ev.preventDefault();
      ui.tab = TAB_ORDER[n - 1]!;
      hideTip();
      render();
    }
  });
}

export { ui };
