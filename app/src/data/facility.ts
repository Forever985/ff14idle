/**
 * 离线生产设施（工房 / Workshop）—— 蓝图 §7 的「离线生产设施」
 *
 * 官方原型：**岛屿庇护所（Island Sanctuary）** —— 建造 → 产出 → 再投资，
 * `06-side-content-pvp.md` 把它评为「**无重置的离线生产线**，最纯粹的放置内容」。
 *
 * ⚠️ 但离线产线是放置游戏最容易做坏的地方，所以这里刻意装了两个阀门：
 *
 *   ① **硬性储存上限**（capHours）：超过上限就不再累积。
 *      依据 `06` §7.4 的结论——「**周上限是数值策划的锚**，上线时必须定义离线收益上限，
 *      否则数值会在一周内失控」。没有这个上限，玩家最优策略就是"永远别上线"。
 *
 *   ② **连续收获加成 Groove + 溢出清零**：按时回来收会逐步获得最高 +50% 产量；
 *      一旦溢出（超过储存上限）则加成归零。这是官方的 Groove 机制，
 *      同时也是对抗①的手段——让"经常回来"比"挂很久"更划算。
 *
 * 另外产出的是**待鉴定箱**而不是直接给数字（蓝图 §4.5 机制 6）：
 * 把"离线收益"变成"上线时的期待感"，而不是结算弹窗上的一个数。
 */

export type ProjectId = 'mine' | 'mint' | 'salvage';

export interface ProjectDef {
  id: ProjectId;
  name: string;
  desc: string;
  goldPerHour: number;
  boxesPerHour: number;
  unlockLevel: number;
}

export const PROJECTS: ProjectDef[] = [
  {
    id: 'mine',
    name: '素材采掘',
    desc: '均衡产出金币与待鉴定箱',
    goldPerHour: 120,
    boxesPerHour: 1.2,
    unlockLevel: 1,
  },
  {
    id: 'mint',
    name: '金币铸造',
    desc: '金币产出翻倍，但不产箱',
    goldPerHour: 300,
    boxesPerHour: 0,
    unlockLevel: 1,
  },
  {
    id: 'salvage',
    name: '装备抢救',
    desc: '专注回收待鉴定箱',
    goldPerHour: 30,
    boxesPerHour: 3,
    unlockLevel: 2,
  },
];

export function projectById(id: ProjectId): ProjectDef | undefined {
  return PROJECTS.find((p) => p.id === id);
}

export interface FacilityLevelDef {
  level: number;
  slots: number;
  /** 储存上限（小时） */
  capHours: number;
  upgradeCost: number;
}

export const FACILITY_LEVELS: FacilityLevelDef[] = [
  { level: 1, slots: 1, capHours: 8, upgradeCost: 0 },
  { level: 2, slots: 2, capHours: 10, upgradeCost: 1500 },
  { level: 3, slots: 3, capHours: 12, upgradeCost: 4000 },
  { level: 4, slots: 4, capHours: 16, upgradeCost: 10000 },
  { level: 5, slots: 5, capHours: 24, upgradeCost: 25000 },
];

export const MAX_FACILITY_LEVEL = FACILITY_LEVELS.length;

export function levelDef(level: number): FacilityLevelDef {
  return FACILITY_LEVELS[Math.min(level, MAX_FACILITY_LEVEL) - 1] ?? FACILITY_LEVELS[0]!;
}

/** 连续收获加成：每次 +0.1，上限 +0.5 */
export const GROOVE_STEP = 0.1;
export const GROOVE_MAX = 0.5;

/** 待鉴定箱开出的装备等级 */
export function boxItemLevel(facilityLevel: number, chapter: number): number {
  return Math.round(20 + facilityLevel * 22 + chapter * 30);
}

export const FACILITY_LABEL: Record<ProjectId, string> = {
  mine: '素材采掘',
  mint: '金币铸造',
  salvage: '装备抢救',
};
