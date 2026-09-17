/**
 * 周期系统（每日 / 每周）—— 蓝图 §4.4 的第 2、3 层
 *
 * 为什么必须有：MVP 只有「无重置的派遣」这一层，玩家没有"今天该干什么"的理由。
 * 参考 `06-side-content-pvp.md` §7.4 的结论：
 *   FF14 的完整节奏 = 无重置产线 + 每日次数型 + 每周上限型 + 赛季排行，
 *   放置游戏应原样照搬，因为它同时解决了「上线动力」与「离线预期」。
 *
 * 本文件实现前两层里的**每日任务轮盘**与**每周天书奇谭**。
 */
import { makeRng } from '../core/rng';
import { dayKey, weekKey } from '../core/time';
import { DUNGEONS_BY_CHAPTER } from '../data/dungeons';
import {
  TAIL_LINES,
  claimableLines,
  emptyTailCounters,
  stickeredCells,
  type TailMetric,
} from '../data/tails';
import type { GameState, ItemDef, Slot } from '../types';
import { rollItem, rollQuality } from '../data/items';
import { refreshTowerSeason } from './tower';

export interface CadenceRefresh {
  dayChanged: boolean;
  weekChanged: boolean;
}

/**
 * 每日/每周重置。必须在每次进入游戏与每次 tick 时调用。
 * 注意：这里**只做重置与轮换**，不做任何"离线收益结算"——那与派遣状态机的设计冲突。
 */
export function refreshCadence(state: GameState, now: number): CadenceRefresh {
  const dk = dayKey(now);
  const wk = weekKey(now);
  let dayChanged = false;
  let weekChanged = false;

  if (!state.daily || state.daily.key !== dk) {
    state.daily = { key: dk, rouletteDungeonId: pickRouletteDungeon(state, dk), rouletteDone: false };
    dayChanged = true;
  }
  if (!state.weekly || state.weekly.key !== wk) {
    state.weekly = { key: wk, counters: emptyTailCounters(), claimedLines: [], claims: 0 };
    weekChanged = true;
  }
  // 无尽塔赛季（每周）与本周期同步。这里**无条件调用**——
  // refreshTowerSeason 自身幂等（只在 key 变化时重置），
  // 若挂上 `weekChanged` 守卫，一旦周重置已在别处完成，赛季就永远不会再同步。
  // 塔之记忆与历史最高层**不重置**。
  refreshTowerSeason(state, wk);
  return { dayChanged, weekChanged };
}

/**
 * 每日轮盘指向的副本：从「已通关」里确定性抽取（同一天同一结果）。
 * 若尚未通关任何副本，则回退到本章第一个副本，保证新号当天也能用。
 */
export function pickRouletteDungeon(state: GameState, key: string): string | null {
  const pool = state.cleared.length > 0 ? [...state.cleared].sort() : [];
  if (pool.length > 0) {
    const idx = makeRng(`roulette:${key}`).int(0, pool.length - 1);
    return pool[idx] ?? null;
  }
  const first = DUNGEONS_BY_CHAPTER[state.chapter]?.[0];
  return first ? first.id : null;
}

/** 轮盘奖励倍率（蓝图 §4.4：每日应给"特色奖励"） */
export const ROULETTE_GOLD_MULT = 2.5;
export const ROULETTE_EXP_MULT = 2.0;

export function rouletteApplies(state: GameState, dungeonId: string): boolean {
  return !!state.daily && !state.daily.rouletteDone && state.daily.rouletteDungeonId === dungeonId;
}

/** 额外奖励：一件高于当前进度的装备（体现"每日轮盘给特色奖励"） */
export function rouletteBonusLoot(state: GameState, dungeonId: string, seed: number): ItemDef[] {
  const rng = makeRng(`roulette-loot:${state.daily.key}:${dungeonId}:${seed}`);
  const itemLevel = Math.round(20 + state.chapter * 40);
  const q = rollQuality(rng, itemLevel, 0.35);
  return [rollItem(rng.fork('slot'), pickSlot(rng), itemLevel, q)];
}

function pickSlot(rng: ReturnType<typeof makeRng>): Slot {
  const slots: Slot[] = ['weapon', 'head', 'body', 'hands', 'legs', 'feet', 'ears', 'neck', 'wrist', 'ring1', 'ring2'];
  return rng.pick(slots);
}

/* ---------------- 天书奇谭 ---------------- */

export function bumpCounter(state: GameState, metric: TailMetric, amount = 1): void {
  if (!state.weekly) return;
  const cur = state.weekly.counters[metric] ?? 0;
  state.weekly.counters[metric] = cur + amount;
}

export function tailStickers(state: GameState): number[] {
  return stickeredCells((state.weekly?.counters ?? {}) as Record<TailMetric, number>);
}

export function tailClaimable(state: GameState): string[] {
  return claimableLines(tailStickers(state), state.weekly?.claimedLines ?? []);
}

export interface TailReward {
  gold: number;
  exp: number;
  loot: ItemDef[];
}

/** 领取一条连线：奖励随本周领奖次数递增（鼓励多连线） */
export function claimTailLine(state: GameState, lineId: string, now: number): { ok: boolean; error?: string; reward?: TailReward } {
  const available = tailClaimable(state);
  if (!available.includes(lineId)) return { ok: false, error: '该连线尚不可领取' };
  const line = TAIL_LINES.find((l) => l.id === lineId);
  if (!line) return { ok: false, error: '连线不存在' };

  const n = state.weekly.claims;
  const gold = Math.round(400 * (1 + n * 0.6) * (1 + state.chapter * 0.25));
  const exp = Math.round(200 * (1 + n * 0.4));
  const rng = makeRng(`tails:${state.weekly.key}:${lineId}:${now}`);
  const itemLevel = Math.round(30 + state.chapter * 45);
  const loot = [rollItem(rng, pickSlot(rng), itemLevel, rollQuality(rng, itemLevel, 0.5))];

  state.gold += gold;
  state.inventory.push(...loot);
  state.weekly.claimedLines.push(lineId);
  state.weekly.claims += 1;

  return { ok: true, reward: { gold, exp, loot } };
}
