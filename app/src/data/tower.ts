/**
 * 无尽塔（深层迷宫 / Deep Dungeon）—— 蓝图 §7 MVP 项②，也是节奏四层的最后一块
 *
 * 官方原型：**死者宫殿 / 天之阶梯 / 尤蕾卡·奥尔托斯 / 朝圣者之路**
 * （`06-side-content-pvp.md` §3、§8.7）。它们有三个标志性机制，本作全部采纳：
 *
 *   ① **独立等级**：进塔后从 1 级重新成长，与外面的等级无关
 *      （官方深层迷宫正是"进去从 1 级打起"）
 *   ② **软重置**：进度清零但**强化保留**——`06` §9.6 把它评为「让卡关玩家有出路，
 *      同时延长系统寿命」的高价值机制
 *   ③ **待鉴定箱**（Accursed Hoard）：把爬塔产出变成"上线开箱的期待感"（蓝图 §4.5 机制 6）
 *
 * 与破魔试炼的分工：
 *   试炼 = 有限 12 格棋盘，考"这一局怎么分配资源"
 *   无尽塔 = **无限层数**，考"能爬多高"，且用软重置给出长线成长
 */
import { makeRng } from '../core/rng';
import type { EnemySpec } from '../sim/combat';

/** 每层的基础成长（用于敌人强度与产出） */
export const TOWER = {
  /** 每层敌人强度增量（与试炼的 34 相近，但塔是无限的，所以略平缓） */
  scalePerFloor: 24,
  /** 塔内等级带来的属性倍率：每级 +6% */
  levelPotencyPerLevel: 0.06,
  /** 每爬 1 层涨 1 级，上限 */
  maxTowerLevel: 99,
  /** 每 N 层给一个待鉴定箱 */
  boxEveryFloors: 3,
  /** 每 N 层是休整层（回复生命） */
  restEveryFloors: 5,
  /** 每 N 层是层主（BOSS） */
  bossEveryFloors: 10,
  /** 休整层回复比例 */
  restHealPct: 0.2,
  /** 结算时"塔之记忆"的成长系数（永久加成，软重置保留） */
  memoryPerFloor: 0.01,
  /** 塔之记忆的加成上限（+150%） */
  memoryCap: 1.5,
} as const;

export function floorLabel(floor: number): string {
  return `第 ${floor} 层`;
}

/** 层主层：每 10 层一个（塔的难度尖峰） */
export function isBossFloor(floor: number): boolean {
  return floor % TOWER.bossEveryFloors === 0;
}

/**
 * 休整层：每 5 层一次，但**第 10 层让位给层主**。
 *
 * ⚠️ 这里踩过一个坑：最初写成 `floor % 5 === 0`，而 `makeFloorEnemies` 在休整层直接返回空敌人，
 * 于是第 10 / 20 / 30 层永远是休整层，那句 `isBoss = floor % 10 === 0` 成了**死代码**——
 * 整座塔没有任何 BOSS，是一条没有起伏的平坡。现在 5 / 15 / 25 休整，10 / 20 / 30 是层主。
 */
export function isRestFloor(floor: number): boolean {
  return floor % TOWER.restEveryFloors === 0 && !isBossFloor(floor);
}

export function isBoxFloor(floor: number): boolean {
  return floor % TOWER.boxEveryFloors === 0;
}

/**
 * 单层敌人。随层数递增；每 5 层是休整层（无敌人）。
 * 强度曲线刻意做成"前松后紧"——前 10 层用来入门，之后逐层变难。
 */
export function makeFloorEnemies(floor: number, chapter: number, seed: number): EnemySpec[] {
  if (isRestFloor(floor)) return [];

  const rng = makeRng(`tower:${seed}:floor:${floor}`);
  const L = 15 + (chapter - 1) * 10;
  // 深度曲线：线性（每层 +scalePerFloor）叠加一个温和的超线性项。
  // ⚠️ 调参记录：最初是 `scalePerFloor: 28` + `(1 + floor*0.05)` + 层主 2.8 倍，
  //    结果第 10 层的层主需要约 266 秒才能打完（上限只有 150 秒）——
  //    5 局难度探针**全部恰好停在第 9 层**，既打不过又毫无随机性。
  const scale = (chapter - 1) * 130 + floor * TOWER.scalePerFloor;
  const hp = Math.round(3000 * (1 + scale / 45) * (1 + floor * 0.03));
  const partyHp = 3 * 700 * (1 + 0.07 * (L - 1));
  const baseDps = (partyHp / 30) * (1 + floor * 0.02);

  const count = isBossFloor(floor) ? 2 : floor % 5 === 3 ? 2 : rng.int(1, 2);
  const names = ['塔之守卫', '苍白幻影', '蚀骨的亡者', '石像鬼兵', '深渊爪牙', '徘徊的魔物'];

  const out: EnemySpec[] = [];
  for (let i = 0; i < count; i++) {
    const isBoss = isBossFloor(floor) && i === count - 1;
    const mult = isBoss ? 1.8 : 1;
    out.push({
      name: isBoss ? `${floorLabel(floor)}·层主` : rng.pick(names),
      hp: Math.round(hp * mult),
      dps: Math.round(baseDps * (isBoss ? 1.2 : 1) * rng.float(0.9, 1.1)),
      boss: isBoss,
    });
  }
  return out;
}

/** 单层的基础产出 */
export function floorReward(floor: number, chapter: number): { gold: number; exp: number } {
  const mult = 1 + (chapter - 1) * 0.8;
  return {
    gold: Math.round((40 + floor * 14) * mult),
    exp: Math.round((30 + floor * 9) * mult),
  };
}

/** 待鉴定箱开出的装备等级随层数增长 */
export function towerBoxItemLevel(floor: number, chapter: number): number {
  return Math.round(30 + chapter * 35 + floor * 2.2);
}

/** 塔内等级 → 属性倍率 */
export function towerLevelMult(level: number): number {
  return 1 + Math.max(0, level - 1) * TOWER.levelPotencyPerLevel;
}

/** 塔之记忆 → 全队永久倍率（软重置保留的那部分） */
export function towerMemoryMult(memory: number): number {
  return 1 + Math.min(TOWER.memoryCap, Math.max(0, memory));
}

/** 一次攀爬结束时应获得的记忆成长 */
export function memoryGain(floorReached: number): number {
  return Math.round(floorReached * TOWER.memoryPerFloor * 1000) / 1000;
}
