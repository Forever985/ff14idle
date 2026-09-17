/**
 * 派遣状态机 —— 本作「放置」的核心
 *
 * 架构依据（`08-wow-idle-architecture.md` §3.3 与 §10.1 第 1 条）：
 *   参考实现**没有主循环**。它的放置 =「派遣即结算 + 时间戳状态机 + 收获幂等」：
 *     派遣时就把整场战斗算完（并存下 seed 与队伍快照）→ 记 startTs / durationMs
 *     → 等待期间什么都不算 → 到点把 running 推成 ready → 收获时幂等发放
 *   好处：离线收益**无需任何专门计算**（进度是 now - startTs 的函数），且天然防连点。
 *
 * 所以这里也**不写**「离线 N 小时获得 X」的结算器。
 */
import { makeRng } from '../core/rng';
import { DUNGEON_BY_ID } from '../data/dungeons';
import { resolveExpedition } from '../sim/combat';
import type { Expedition, GameState, RosterSnapshot } from '../types';
import { computeMemberStats } from './member';
import { GOALS } from './goals';
import { applyResult, findMember, isUnlocked, tryAdvanceChapter } from './state';
import {
  ROULETTE_EXP_MULT,
  ROULETTE_GOLD_MULT,
  bumpCounter,
  rouletteApplies,
  rouletteBonusLoot,
} from './cadence';
import { addRelicProgress, relicTeamBonus } from './relic';

export interface DispatchResult {
  ok: boolean;
  error?: string;
  expedition?: Expedition;
}

export function dispatch(
  state: GameState,
  dungeonId: string,
  memberIds: string[],
  now: number,
): DispatchResult {
  const dungeon = DUNGEON_BY_ID[dungeonId];
  if (!dungeon) return { ok: false, error: '副本不存在' };
  if (!isUnlocked(state, dungeonId)) return { ok: false, error: '该副本尚未解锁（需先通关前一个副本）' };
  if (memberIds.length !== GOALS.partySize) {
    return { ok: false, error: `队伍必须为 ${GOALS.partySize} 人` };
  }
  if (new Set(memberIds).size !== memberIds.length) {
    return { ok: false, error: '同一成员不能重复上阵' };
  }

  const roster: RosterSnapshot[] = [];
  for (const id of memberIds) {
    const m = findMember(state, id);
    if (!m) return { ok: false, error: '成员不存在' };
    if (m.level < dungeon.reqLevel) {
      return { ok: false, error: `${m.name} 等级不足（需 ${dungeon.reqLevel}）` };
    }
    roster.push(computeMemberStats(m, state.inventory, state.masteries?.[m.id] ?? [], relicTeamBonus(state)));
  }

  const roles = roster.map((r) => (r.mitigation > 0.15 || r.job === 'WAR' ? 'tank' : r.healPotency > 0 ? 'healer' : 'dps'));
  if (!roles.includes('tank')) return { ok: false, error: '队伍需要至少 1 名坦克' };
  if (!roles.includes('healer')) return { ok: false, error: '队伍需要至少 1 名治疗' };

  // 派遣即结算：种子的唯一入口，之后一切都可复现
  const seed = makeRng(`${now}:${dungeonId}:${memberIds.join(',')}`).int(1, 2 ** 31 - 1);
  const result = resolveExpedition(roster, dungeon, seed);

  const exp: Expedition = {
    id: `exp_${now.toString(36)}_${seed.toString(36)}`,
    dungeonId,
    memberIds: [...memberIds],
    roster,
    seed,
    startTs: now,
    durationMs: Math.max(3000, result.durationSec * 1000),
    status: 'running',
    collected: false,
    result,
  };

  state.expeditions.unshift(exp);
  bumpCounter(state, 'dispatches'); // 天书奇谭：派遣次数
  return { ok: true, expedition: exp };
}

/** 把到期的 running 推成 ready（离线重开时也走这里） */
export function refreshExpeditions(state: GameState, now: number): number {
  let ready = 0;
  for (const e of state.expeditions) {
    if (e.status === 'running' && now >= e.startTs + e.durationMs) {
      e.status = 'ready';
      ready += 1;
    }
  }
  return ready;
}

export interface CollectResult {
  ok: boolean;
  error?: string;
  gold?: number;
  exp?: number;
  loot?: number;
  chapterUp?: number;
  /** 是否命中了当日「任务轮盘」加成 */
  roulette?: boolean;
}

/** 收获（幂等：已收获的派遣不会被重复发放） */
export function collectExpedition(state: GameState, expeditionId: string, _now: number): CollectResult {
  const e = state.expeditions.find((x) => x.id === expeditionId);
  if (!e) return { ok: false, error: '派遣记录不存在' };
  if (e.collected) return { ok: false, error: '已经收获过了' };
  if (e.status !== 'ready') return { ok: false, error: '还没结束' };
  if (!e.result) return { ok: false, error: '结算数据缺失' };

  // 每日任务轮盘：命中则倍率 + 额外装备（蓝图 §4.4「每日应给特色奖励」）
  const roulette = e.result.win && rouletteApplies(state, e.dungeonId);
  const bonusLoot = roulette ? rouletteBonusLoot(state, e.dungeonId, e.seed) : [];
  const granted = {
    ...e.result,
    gold: Math.round(e.result.gold * (roulette ? ROULETTE_GOLD_MULT : 1)),
    exp: Math.round(e.result.exp * (roulette ? ROULETTE_EXP_MULT : 1)),
    loot: [...e.result.loot, ...bonusLoot],
  };

  applyResult(state, e.dungeonId, e.memberIds, granted);
  e.collected = true;

  // ---- 周期计数（天书奇谭）----
  if (granted.win) bumpCounter(state, 'clears');
  if (granted.win && granted.bossKilled) bumpCounter(state, 'bossKills');
  bumpCounter(state, 'lootGained', granted.loot.length);
  bumpCounter(state, 'goldEarned', granted.gold);
  if (roulette) {
    state.daily.rouletteDone = true;
    bumpCounter(state, 'roulette');
  }

  // ---- 幻境武器长链（按成员累计）----
  if (granted.win) addRelicProgress(state, e.memberIds, 'clears');
  if (granted.win && granted.bossKilled) addRelicProgress(state, e.memberIds, 'bosses');
  if (roulette) addRelicProgress(state, e.memberIds, 'roulette');

  const chapterUp = tryAdvanceChapter(state) ?? undefined;
  pruneExpeditions(state);

  return {
    ok: true,
    gold: granted.gold,
    exp: granted.exp,
    loot: granted.loot.length,
    chapterUp,
    roulette,
  };
}

/** 清掉过老的已收获记录，避免存档膨胀 */
function pruneExpeditions(state: GameState): void {
  const pending = state.expeditions.filter((e) => !e.collected);
  const done = state.expeditions.filter((e) => e.collected).slice(0, GOALS.keepExpeditions);
  state.expeditions = [...pending, ...done];
}

export function pendingCount(state: GameState): { running: number; ready: number } {
  let running = 0;
  let ready = 0;
  for (const e of state.expeditions) {
    if (e.collected) continue;
    if (e.status === 'running') running += 1;
    else ready += 1;
  }
  return { running, ready };
}
