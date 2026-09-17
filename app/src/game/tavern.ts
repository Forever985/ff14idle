/**
 * 酒馆与名册：雇佣、重 roll、辞退、上限、名角里程碑解锁
 *
 * 三个设计约束（都是刻意选的）：
 *  1. **候选按日期当种子**：同一天的三个候选是固定的。否则反复关开页面就能"抽卡"，
 *     那既不尊重人的时间，也不是设计意图。想换一批？等明天，或者花钱重 roll。
 *  2. **新人不坐冷板凳**：名角与佣兵都按"当前章节的等级下限"入场，而不是 1 级。
 *     放置游戏里练一个板凳是纯消耗时间，没有任何乐趣。
 *  3. **上限有限且可扩张**：让"雇谁、辞退谁"成为决策，同时给金币一个长期去向。
 */
import { COMPANIONS, COMPANION_BY_ID } from '../data/companions';
import { RACES, RARITY_BY_ID, makeCandidates, namedPotential, rerollCost } from '../data/hires';
import { CHAPTER_LEVEL_RANGE, START_LEVEL } from '../data/levels';
import { dayKey } from '../core/time';
import type { CompanionDef, GameState, HireCandidate, MemberState, Rarity, UnlockCond } from '../types';

/** 每天几个候选 */
export const CANDIDATES_PER_DAY = 3;
/** 名册基础上限 */
const BASE_CAP = 12;

/** 名册上限：章节 + 工房等级共同决定（都能推动它增长） */
export function rosterCap(state: GameState): number {
  const facilityLevel = state.facility?.level ?? 1;
  return BASE_CAP + Math.max(0, state.chapter - 1) * 2 + Math.max(0, facilityLevel - 1) * 2;
}

export function rosterFull(state: GameState): boolean {
  return state.members.length >= rosterCap(state);
}

/** 当前章节的等级下限（新成员的入场等级） */
export function entryLevel(state: GameState): number {
  return CHAPTER_LEVEL_RANGE[state.chapter]?.min ?? START_LEVEL;
}

// --------------------------------------------------------------------------- //
// 名角解锁
// --------------------------------------------------------------------------- //
function memberFromDef(def: CompanionDef, level: number): MemberState {
  return {
    id: def.id,
    defId: def.id,
    name: def.name,
    job: def.job,
    kind: 'named',
    race: def.race,
    rarity: 'common',
    potential: namedPotential(),
    level,
    exp: 0,
    equipment: {},
    runs: 0,
  };
}

function memberFromCandidate(c: HireCandidate): MemberState {
  return {
    id: `hire-${c.id}`,
    defId: `hire:${c.id}`,
    name: c.name,
    job: c.job,
    kind: 'hire',
    race: c.race,
    rarity: c.rarity,
    potential: c.potential,
    level: c.level,
    exp: 0,
    equipment: {},
    runs: 0,
  };
}

/** 里程碑是否已经达成 */
export function unlockMet(state: GameState, cond: UnlockCond): boolean {
  switch (cond.kind) {
    case 'chapter':
      return state.chapter >= cond.chapter;
    case 'towerFloor':
      return (state.towerBest ?? 0) >= cond.floor;
    case 'trialScore':
      return (state.trialBest ?? 0) >= cond.score;
    case 'relicFinal':
      return !!state.relicFinalBonus;
    case 'facilityLevel':
      return (state.facility?.level ?? 1) >= cond.level;
    case 'clearedCount':
      return state.cleared.length >= cond.count;
  }
}

/** 条件的可读描述（界面与提示都要用同一份文案，避免两处写得不一样） */
export function unlockLabel(cond: UnlockCond): string {
  switch (cond.kind) {
    case 'chapter':
      return `通关第 ${cond.chapter - 1} 章`;
    case 'towerFloor':
      return `无尽塔到达 ${cond.floor} 层`;
    case 'trialScore':
      return `破魔试炼拿到 ${cond.score} 分`;
    case 'relicFinal':
      return '完成任意一把幻境武器的终阶';
    case 'facilityLevel':
      return `工房升到 ${cond.level} 级`;
    case 'clearedCount':
      return `累计通关 ${cond.count} 个副本`;
  }
}

/** 当前所有"条件已达成但还没到手"的名角 */
export function pendingCompanions(state: GameState): CompanionDef[] {
  return COMPANIONS.filter(
    (c) => unlockMet(state, c.unlock) && !state.members.some((m) => m.defId === c.id),
  );
}

/** 名角名单（含未获得的，界面要用它做"图鉴"式的展示） */
export function companionStatus(state: GameState): {
  def: CompanionDef;
  owned: boolean;
  met: boolean;
  label: string;
}[] {
  return COMPANIONS.map((def) => ({
    def,
    owned: state.members.some((m) => m.defId === def.id),
    met: unlockMet(state, def.unlock),
    label: unlockLabel(def.unlock),
  }));
}

/**
 * 把已达成的名角加入名册。
 * 返回新加入的名单，供界面弹提示（"XXX 加入了拂晓血盟"）。
 */
export function grantCompanions(state: GameState): CompanionDef[] {
  const got = pendingCompanions(state);
  if (got.length === 0) return [];
  const level = entryLevel(state);
  for (const def of got) state.members.push(memberFromDef(def, level));
  return got;
}

// --------------------------------------------------------------------------- //
// 酒馆
// --------------------------------------------------------------------------- //
/** 跨天就换一批候选，并重置免费刷新 */
export function refreshTavern(state: GameState, now = Date.now()): boolean {
  const today = dayKey(now);
  if (!state.tavern) {
    state.tavern = { dayKey: today, candidates: [], freeUsed: false, paidRolls: 0 };
  }
  if (state.tavern.dayKey === today && state.tavern.candidates.length > 0) return false;
  state.tavern.dayKey = today;
  state.tavern.candidates = makeCandidates(today, CANDIDATES_PER_DAY, entryLevel(state));
  state.tavern.freeUsed = false;
  state.tavern.paidRolls = 0;
  return true;
}

export function todayRerollCost(state: GameState): number {
  return rerollCost(state.chapter);
}

export interface TavernResult {
  ok: boolean;
  reason?: string;
  gold?: number;
}

/**
 * 重 roll 今天的候选。
 * `free` 用掉每日免费次数；否则扣金币（次数越多越贵，避免零钱无限刷）。
 */
export function rerollTavern(state: GameState, now = Date.now(), free = false): TavernResult {
  refreshTavern(state, now);
  const tv = state.tavern;
  if (free) {
    if (tv.freeUsed) return { ok: false, reason: '今天的免费刷新已经用掉了' };
    tv.freeUsed = true;
  } else {
    const cost = todayRerollCost(state);
    if (state.gold < cost) return { ok: false, reason: `金币不足（需要 ${cost}）` };
    state.gold -= cost;
    tv.paidRolls += 1;
  }
  // 用"日期 + 已 roll 次数"当种子，保证同一批次可复现、且不会和上批重复
  tv.candidates = makeCandidates(
    `${tv.dayKey}#${tv.freeUsed ? 'f' : ''}${tv.paidRolls}`,
    CANDIDATES_PER_DAY,
    entryLevel(state),
  );
  return { ok: true, gold: state.gold };
}

/** 雇佣一个候选 */
export function hireCandidate(state: GameState, candidateId: string): TavernResult {
  const tv = state.tavern;
  const c = tv?.candidates.find((x) => x.id === candidateId);
  if (!c) return { ok: false, reason: '这个候选已经不在名单里了' };
  if (rosterFull(state)) {
    return { ok: false, reason: `名册已满（${rosterCap(state)} 人），先在名册里辞退一个` };
  }
  if (state.gold < c.cost) return { ok: false, reason: `金币不足（需要 ${c.cost}）` };

  state.gold -= c.cost;
  state.members.push(memberFromCandidate(c));
  tv.candidates = tv.candidates.filter((x) => x.id !== candidateId);
  return { ok: true, gold: state.gold };
}

/**
 * 辞退一个成员。
 * 规则：光之战士（你自己）不能辞退；正在外出/正在塔里/正在试炼里的人不能辞退，
 * 否则会出现"派出去的人没了但派遣还在"这种脏状态。
 */
export function dismissMember(state: GameState, memberId: string): TavernResult {
  const m = state.members.find((x) => x.id === memberId);
  if (!m) return { ok: false, reason: '找不到这个成员' };
  if (m.defId === 'wol') return { ok: false, reason: '光之战士（你自己）不能辞退' };

  const busy = state.expeditions.some(
    (e) => !e.collected && e.memberIds.includes(memberId),
  );
  if (busy) return { ok: false, reason: '这名成员正在外出探索' };
  if (state.tower?.memberIds?.includes(memberId)) {
    return { ok: false, reason: '这名成员正在无尽塔里' };
  }
  if (state.trial?.memberIds?.includes(memberId)) {
    return { ok: false, reason: '这名成员正在破魔试炼里' };
  }

  state.members = state.members.filter((x) => x.id !== memberId);
  return { ok: true };
}

/** 该成员能不能辞退（界面用它决定按钮是否禁用 + 理由） */
export function dismissBlockReason(state: GameState, memberId: string): string {
  const m = state.members.find((x) => x.id === memberId);
  if (!m) return '找不到这个成员';
  if (m.defId === 'wol') return '光之战士不能辞退';
  if (state.expeditions.some((e) => !e.collected && e.memberIds.includes(memberId))) return '外派中';
  if (state.tower?.memberIds?.includes(memberId)) return '塔中';
  if (state.trial?.memberIds?.includes(memberId)) return '试炼中';
  return '';
}

/** 稀有度展示用的名字（佣兵卡片上显示） */
export function rarityName(r: Rarity): string {
  return RARITY_BY_ID[r]?.name ?? '普通';
}

/** 种族展示名 */
export function raceName(race: MemberState['race']): string {
  return RACES.find((r) => r.id === race)?.name ?? '人族';
}

/** 名角的定义（佣兵返回 null） */
export function namedDef(m: MemberState): CompanionDef | null {
  return m.kind === 'named' ? (COMPANION_BY_ID[m.defId] ?? null) : null;
}
