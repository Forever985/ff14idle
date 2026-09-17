/**
 * 可复现随机数（seed-based RNG）
 *
 * 为什么不用裸 Math.random()：
 * 参考实现（wow-idle）用裸随机导致战报无法回放、掉落无法审计。
 * 蓝图 §6.1 明确要求「全部随机走注入式 RNG」。
 *
 * 这里提供 mulberry32（32 位状态、速度快、分布足够好）与字符串播种、
 * 以及「按用途 fork」——同一场战斗的掉落与暴击使用不同的子序列，
 * 这样调整掉落不会改变战斗结果。
 */

export interface Rng {
  /** [0, 1) */
  next(): number;
  /** [min, max) 整数 */
  int(min: number, max: number): number;
  /** [min, max) 浮点 */
  float(min: number, max: number): number;
  /** 概率命中 */
  chance(p: number): boolean;
  /** 从数组里取一个 */
  pick<T>(arr: readonly T[]): T;
  /** 按权重取一个索引 */
  weighted(weights: readonly number[]): number;
  /** 派生一个用途独立的子 RNG */
  fork(tag: string): Rng;
  /** 当前状态（用于存档序列化） */
  readonly state: number;
}

/** 字符串 → 32 位整数种子（FNV-1a） */
export function hashSeed(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

export function makeRng(seed: number | string): Rng {
  let s = (typeof seed === 'string' ? hashSeed(seed) : seed) >>> 0;

  const next = (): number => {
    // mulberry32
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const rng: Rng = {
    next,
    int: (min, max) => Math.floor(next() * (max - min + 1)) + min,
    float: (min, max) => next() * (max - min) + min,
    chance: (p) => next() < p,
    pick: (arr) => arr[Math.floor(next() * arr.length)]!,
    weighted: (weights) => {
      let total = 0;
      for (const w of weights) total += w;
      let roll = next() * total;
      for (let i = 0; i < weights.length; i++) {
        roll -= weights[i]!;
        if (roll <= 0) return i;
      }
      return weights.length - 1;
    },
    fork: (tag) => makeRng((s ^ hashSeed(tag)) >>> 0),
    get state() {
      return s;
    },
  };
  return rng;
}

/** 生成一个人类可读的短 id */
export function shortId(rng: Rng): string {
  const alphabet = 'abcdefghijkmnpqrstuvwxyz23456789';
  let out = '';
  for (let i = 0; i < 8; i++) out += alphabet[rng.int(0, alphabet.length - 1)];
  return out;
}
