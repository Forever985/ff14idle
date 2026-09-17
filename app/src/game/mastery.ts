/**
 * 职业量谱精通的解锁逻辑
 *
 * 这是一个**金币回收口**（蓝图 §4.4 提到经济需要"税 + 房屋"这类回收，
 * 而 MVP 阶段只有产出没有消耗），同时也是玩家在"换装"之外的第二个决策来源。
 */
import { MASTERY_BY_ID, masteriesFor } from '../data/masteries';
import type { GameState, JobId } from '../types';
import { findMember } from './state';

export function unlockedFor(state: GameState, memberId: string): string[] {
  return state.masteries?.[memberId] ?? [];
}

export interface UnlockCheck {
  ok: boolean;
  error?: string;
}

export function canUnlock(state: GameState, memberId: string, masteryId: string): UnlockCheck {
  const member = findMember(state, memberId);
  if (!member) return { ok: false, error: '成员不存在' };
  const def = MASTERY_BY_ID[masteryId];
  if (!def) return { ok: false, error: '精通节点不存在' };
  if (def.job !== member.job) return { ok: false, error: '职业不符' };

  const owned = unlockedFor(state, memberId);
  if (owned.includes(masteryId)) return { ok: false, error: '已经解锁过了' };
  if (member.level < def.levelReq) return { ok: false, error: `需要等级 ${def.levelReq}` };
  if (def.requiresAny && !def.requiresAny.some((r) => owned.includes(r))) {
    return { ok: false, error: '需要先解锁前置节点' };
  }
  if (state.gold < def.cost) return { ok: false, error: `金币不足（需 ${def.cost}）` };
  return { ok: true };
}

export function unlockMastery(
  state: GameState,
  memberId: string,
  masteryId: string,
): UnlockCheck & { def?: (typeof MASTERY_BY_ID)[string] } {
  const check = canUnlock(state, memberId, masteryId);
  if (!check.ok) return check;
  const def = MASTERY_BY_ID[masteryId]!;
  state.gold -= def.cost;
  state.masteries[memberId] = [...unlockedFor(state, memberId), masteryId];
  return { ok: true, def };
}

/** 该成员可解锁 / 已解锁 / 锁定的节点列表（供 UI 渲染） */
export interface MasteryRow {
  id: string;
  tier: 1 | 2 | 3;
  name: string;
  desc: string;
  cost: number;
  levelReq: number;
  state: 'owned' | 'available' | 'locked';
  reason?: string;
}

export function masteryRows(state: GameState, memberId: string): MasteryRow[] {
  const member = findMember(state, memberId);
  if (!member) return [];
  return masteriesFor(member.job as JobId).map((def) => {
    const owned = unlockedFor(state, memberId);
    if (owned.includes(def.id)) {
      return { id: def.id, tier: def.tier, name: def.name, desc: def.desc, cost: def.cost, levelReq: def.levelReq, state: 'owned' as const };
    }
    const check = canUnlock(state, memberId, def.id);
    return {
      id: def.id,
      tier: def.tier,
      name: def.name,
      desc: def.desc,
      cost: def.cost,
      levelReq: def.levelReq,
      state: check.ok ? ('available' as const) : ('locked' as const),
      reason: check.error,
    };
  });
}

/** 该成员精通带来的总花费（用于展示投入） */
export function masterySpent(state: GameState, memberId: string): number {
  return unlockedFor(state, memberId).reduce((s, id) => s + (MASTERY_BY_ID[id]?.cost ?? 0), 0);
}
