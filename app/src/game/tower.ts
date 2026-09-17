/**
 * 无尽塔运转逻辑
 *
 * 与破魔试炼共用战斗内核（`simulateEncounter`），但规则不同：
 *   试炼：12 格有限棋盘，血量继承
 *   塔：**无限层数**，血量继承 + **塔内独立等级** + **软重置**（塔之记忆永久保留）
 */
import { makeRng } from '../core/rng';
import { rollItem, rollQuality } from '../data/items';
import {
  TOWER,
  floorLabel,
  floorReward,
  isBoxFloor,
  isRestFloor,
  makeFloorEnemies,
  memoryGain,
  towerBoxItemLevel,
  towerLevelMult,
  towerMemoryMult,
} from '../data/tower';
import { simulateEncounter } from '../sim/combat';
import type { GameState, ItemDef, RosterSnapshot, Slot, TowerRun } from '../types';
import { ensureFacility } from './facility';
import { computeMemberStats } from './member';
import { relicTeamBonus } from './relic';
import { findMember, grantExp } from './state';

/** 无尽塔队伍规模（与试炼一致：3 人，考续航） */
export const TOWER_PARTY_SIZE = 3;

export function towerRunOf(state: GameState): TowerRun | null {
  return state.tower ?? null;
}

export interface TowerStartResult {
  ok: boolean;
  error?: string;
}

export function startTower(state: GameState, memberIds: string[], now: number): TowerStartResult {
  if (state.tower) return { ok: false, error: '已有一次攀爬进行中' };
  if (memberIds.length !== TOWER_PARTY_SIZE) {
    return { ok: false, error: `无尽塔队伍必须为 ${TOWER_PARTY_SIZE} 人` };
  }
  if (new Set(memberIds).size !== memberIds.length) {
    return { ok: false, error: '同一成员不能重复上阵' };
  }

  const roster: RosterSnapshot[] = [];
  for (const id of memberIds) {
    const m = findMember(state, id);
    if (!m) return { ok: false, error: '成员不存在' };
    roster.push(computeMemberStats(m, state.inventory, state.masteries?.[m.id] ?? [], relicTeamBonus(state)));
  }
  const roles = roster.map((r) => (r.job === 'WAR' || r.mitigation > 0.15 ? 'tank' : r.healPotency > 0 ? 'healer' : 'dps'));
  if (!roles.includes('tank')) return { ok: false, error: '无尽塔队伍需要至少 1 名坦克' };
  if (!roles.includes('healer')) return { ok: false, error: '无尽塔队伍需要至少 1 名治疗' };

  const seed = makeRng(`tower:${now}:${memberIds.join(',')}`).int(1, 2 ** 31 - 1);
  const hp: Record<string, number> = {};
  for (const r of roster) hp[r.memberId] = r.hp;

  state.tower = {
    memberIds: [...memberIds],
    roster,
    floor: 1,
    level: 1,
    hp,
    boxes: 0,
    gold: 0,
    exp: 0,
    seed,
    log: [
      `进入无尽塔（队伍 ${roster.length} 人）。塔内从 1 级重新成长，` +
        `本次携带塔之记忆加成 +${Math.round((towerMemoryMult(state.towerMemory ?? 0) - 1) * 100)}%。`,
    ],
    startedAt: now,
    reached: 0,
  };
  return { ok: true };
}

export interface ClimbResult {
  ok: boolean;
  error?: string;
  floor?: number;
  win?: boolean;
  finished?: boolean;
  rest?: boolean;
  log?: string[];
}

/** 挑战当前层 */
export function climbTower(state: GameState, now: number): ClimbResult {
  const run = state.tower;
  if (!run) return { ok: false, error: '没有进行中的攀爬' };

  const floor = run.floor;
  const gained: string[] = [];
  const lvMult = towerLevelMult(run.level);
  const memMult = towerMemoryMult(state.towerMemory ?? 0);

  // 休整层：无战斗，回血 + 升级
  if (isRestFloor(floor)) {
    for (const r of run.roster) {
      const cur = run.hp[r.memberId] ?? 0;
      if (cur <= 0) continue;
      run.hp[r.memberId] = Math.min(r.hp, Math.round(cur + r.hp * TOWER.restHealPct));
    }
    run.level = Math.min(TOWER.maxTowerLevel, run.level + 1);
    run.floor += 1;
    run.reached = Math.max(run.reached, floor);
    gained.push(`${floorLabel(floor)} 是休整层：全队回复 ${Math.round(TOWER.restHealPct * 100)}% 生命，塔内等级提升至 ${run.level}`);
    run.log.push(...gained);
    return { ok: true, floor, win: true, rest: true, finished: false, log: gained };
  }

  const enemies = makeFloorEnemies(floor, state.chapter, run.seed);
  // 塔内等级与塔之记忆都作用在我方属性上（通过倍率实现，不改快照）
  const scaledRoster = run.roster.map((r) => ({
    ...r,
    hp: Math.round(r.hp * lvMult * memMult),
    potency: Math.round(r.potency * lvMult * memMult * 10) / 10,
    healPotency: Math.round(r.healPotency * lvMult * memMult * 10) / 10,
  }));
  // 血量也要按同倍率换算，避免"升级后血量上限变大但当前血量没跟上"
  const startHp: Record<string, number> = {};
  for (const r of run.roster) {
    const cur = run.hp[r.memberId] ?? 0;
    const oldMax = r.hp;
    const newMax = Math.round(oldMax * lvMult * memMult);
    startHp[r.memberId] = oldMax > 0 ? Math.round((cur / oldMax) * newMax) : 0;
  }

  const out = simulateEncounter({
    roster: scaledRoster,
    enemies,
    seed: makeRng(`tower:${run.seed}:fight:${floor}`).int(1, 2 ** 31 - 1),
    startHp,
    maxDurationSec: 150,
    label: floorLabel(floor),
  });

  // 把战斗后的血量按比例写回原始快照口径
  for (const r of run.roster) {
    const scaled = scaledRoster.find((s) => s.memberId === r.memberId)!;
    const newMax = scaled.hp;
    const cur = out.hp[r.memberId] ?? 0;
    run.hp[r.memberId] = newMax > 0 ? Math.round((cur / newMax) * r.hp) : 0;
    run.hp[r.memberId] = Math.max(0, Math.min(r.hp, run.hp[r.memberId]!));
  }

  gained.push(...out.log.slice(-4));

  if (!out.win) {
    run.log.push(...gained, `${floorLabel(floor)} 挑战失败，攀爬结束`);
    const settled = settleTower(state, run, now, floor - 1);
    return { ok: true, floor, win: false, finished: true, log: [...gained, settled.summary] };
  }

  const reward = floorReward(floor, state.chapter);
  run.gold += reward.gold;
  run.exp += reward.exp;
  if (isBoxFloor(floor)) {
    run.boxes += 1;
    gained.push(`拾得 1 个待鉴定箱（每 ${TOWER.boxEveryFloors} 层一个）`);
  }
  run.level = Math.min(TOWER.maxTowerLevel, run.level + 1);
  run.floor += 1;
  run.reached = Math.max(run.reached, floor);
  gained.push(`${floorLabel(floor)} 通过（+${reward.gold} 金 / +${reward.exp} 经验，塔内等级 ${run.level}）`);
  run.log.push(...gained);

  return { ok: true, floor, win: true, finished: false, log: gained };
}

export interface TowerSettlement {
  floor: number;
  gold: number;
  exp: number;
  items: ItemDef[];
  memoryGain: number;
  memory: number;
  best: number;
  seasonBest: number;
  isBest: boolean;
  summary: string;
}

/** 主动撤退（保留已完成楼层的全部收益） */
export function retreatTower(state: GameState, now: number): { ok: boolean; error?: string; settlement?: TowerSettlement } {
  const run = state.tower;
  if (!run) return { ok: false, error: '没有进行中的攀爬' };
  const reached = run.reached;
  run.log.push(`主动撤退（已到达 ${floorLabel(reached)}）`);
  const settlement = settleTower(state, run, now, reached);
  return { ok: true, settlement };
}

/**
 * 结算：发放金币/经验、把待鉴定箱开成装备、累积"塔之记忆"并更新纪录。
 * 软重置的体现：进度清零，但 towerMemory 永久保留。
 */
function settleTower(state: GameState, run: TowerRun, now: number, reached: number): TowerSettlement {
  const rng = makeRng(`tower:${run.seed}:settle:${now}`);
  const itemLevel = towerBoxItemLevel(Math.max(1, reached), state.chapter);
  const slots: Slot[] = ['weapon', 'head', 'body', 'hands', 'legs', 'feet', 'ears', 'neck', 'wrist', 'ring1', 'ring2'];
  const items: ItemDef[] = [];
  for (let i = 0; i < run.boxes; i++) {
    const q = rollQuality(rng, itemLevel, 0.25);
    items.push(rollItem(rng, rng.pick(slots), itemLevel, q));
  }

  state.gold += run.gold;
  state.inventory.push(...items);
  grantExp(state, run.memberIds, run.exp);

  const gain = memoryGain(reached);
  state.towerMemory = Math.min(TOWER.memoryCap, (state.towerMemory ?? 0) + gain);
  const isBest = reached > (state.towerBest ?? 0);
  if (isBest) state.towerBest = reached;

  ensureFacility(state, now);
  const seasonKey = state.towerSeason?.key ?? '';
  if (!state.towerSeason) state.towerSeason = { key: seasonKey, best: 0 };
  if (reached > (state.towerSeason.best ?? 0)) state.towerSeason.best = reached;

  const summary =
    `结算：到达 ${floorLabel(reached)}，+${run.gold} 金 / +${run.exp} 经验 / ${items.length} 件装备；` +
    `塔之记忆 +${(gain * 100).toFixed(1)}%（累计 +${Math.round(state.towerMemory * 100)}%）`;

  state.tower = null;

  return {
    floor: reached,
    gold: run.gold,
    exp: run.exp,
    items,
    memoryGain: gain,
    memory: state.towerMemory,
    best: state.towerBest,
    seasonBest: state.towerSeason.best,
    isBest,
    summary,
  };
}

/** 赛季（每周）重置：只重置赛季纪录，塔之记忆与历史最高层保留 */
export function refreshTowerSeason(state: GameState, weekKeyValue: string): boolean {
  if (!state.towerSeason) {
    state.towerSeason = { key: weekKeyValue, best: 0 };
    return true;
  }
  if (state.towerSeason.key !== weekKeyValue) {
    state.towerSeason = { key: weekKeyValue, best: 0 };
    return true;
  }
  return false;
}

export function towerHpPct(run: TowerRun): number {
  const total = run.roster.reduce((s, r) => s + r.hp, 0);
  const left = run.roster.reduce((s, r) => s + Math.max(0, run.hp[r.memberId] ?? 0), 0);
  return total > 0 ? left / total : 0;
}
