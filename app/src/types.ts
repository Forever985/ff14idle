/**
 * 全局类型定义（单一真相）
 * 对应蓝图 §6.2 的 `game/state.ts`
 */

export type JobRole = 'tank' | 'healer' | 'dps';
export type JobId = 'WAR' | 'WHM' | 'BLM' | 'MCH' | 'SMN' | 'RDM' | 'SGE' | 'BST';
export type Slot =
  | 'weapon' | 'head' | 'body' | 'hands' | 'legs' | 'feet'
  | 'ears' | 'neck' | 'wrist' | 'ring1' | 'ring2';
export type Quality = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

/** 职业定义（放置化抽象：资源池 + 阈值爆发） */
export interface JobDef {
  id: JobId;
  name: string;
  nameEn: string;
  role: JobRole;
  weapon: string;
  /** 一句话机制说明（对应 01-jobs.md §12.2 的量谱） */
  gauge: string;
  /** 基础数值（未装备、1 级基准） */
  base: {
    hp: number;
    /** 每次 GCD 的效力（potency 抽象） */
    potency: number;
    /** 治疗职业每次 GCD 的治疗效力 */
    healPotency: number;
    /** 坦克减伤（0-1） */
    mitigation: number;
  };
  /** 资源池机制（对应蓝图 §2 决策二的 M1/M2） */
  resource: {
    name: string;
    max: number;
    /** 每秒自然累积 */
    gainPerSec: number;
  };
  /** 阈值爆发（M3：固定 CD 的爆发窗口） */
  burst: {
    name: string;
    /** 需要消耗的资源 */
    cost: number;
    /** 爆发期间的伤害倍率加成（如 0.3 = +30%） */
    bonus: number;
    /** 持续秒数 */
    durationSec: number;
    /** 冷却秒数 */
    cooldownSec: number;
  };
}

/** 拂晓伙伴（对应蓝图 §2 决策一：光之战士 + 拂晓血盟） */
/** 八大种族（仅用于酒馆佣兵的名字生成与展示） */
export type RaceId = 'hyur' | 'elezen' | 'miqote' | 'lalafell' | 'roegadyn' | 'auRa';

/** 佣兵稀有度：只影响"资质"，名角不参与 */
export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic';

/** 名角的获得条件（里程碑刻意挂在已有系统上，让"多玩一个系统"有人物奖励） */
export type UnlockCond =
  | { kind: 'chapter'; chapter: number }
  | { kind: 'towerFloor'; floor: number }
  | { kind: 'trialScore'; score: number }
  | { kind: 'relicFinal' }
  | { kind: 'facilityLevel'; level: number }
  | { kind: 'clearedCount'; count: number };

export interface CompanionDef {
  id: string;
  name: string;
  nameEn: string;
  job: JobId;
  race: RaceId;
  title: string;
  /** 获得条件：主线章节或某个系统的里程碑 */
  unlock: UnlockCond;
}

/** 酒馆候选（当天固定，不因反复开关页面而变） */
export interface HireCandidate {
  id: string;
  name: string;
  race: RaceId;
  job: JobId;
  rarity: Rarity;
  level: number;
  /** 资质：属性系数 */
  potential: number;
  cost: number;
}

export interface TavernState {
  /** 候选对应的日期键（跨天就换一批） */
  dayKey: string;
  candidates: HireCandidate[];
  /** 今天的免费刷新用掉了吗 */
  freeUsed: boolean;
  /** 今天已经付费重 roll 了几次（只用于展示） */
  paidRolls: number;
}

export interface ItemDef {
  uid: string;
  name: string;
  slot: Slot;
  itemLevel: number;
  quality: Quality;
  /** 主属性加成 */
  stats: { hp: number; potency: number; healPotency: number };
}

export interface DungeonDef {
  id: string;
  name: string;
  /** 章节（1 = ARR） */
  chapter: number;
  reqLevel: number;
  /** 平均物品等级门槛 */
  reqItemLevel: number;
  /** 敌人强度（由 iLvl 与章节推导） */
  enemies: {
    name: string;
    hp: number;
    /** 每秒对全队造成的原始伤害 */
    dps: number;
    /** 是否 BOSS（掉落更好） */
    boss: boolean;
  }[];
  /** 通关时长（秒）——战斗推演得到，这里给上限 */
  maxDurationSec: number;
}

/** 队伍成员 = 伙伴或主角，带装备 */
export interface MemberState {
  id: string;
  /** 名角绑定伙伴定义 id；佣兵用 `hire:<候选id>` */
  defId: string;
  name: string;
  job: JobId;
  /** 名角（剧情人物）还是酒馆雇来的佣兵 */
  kind: 'named' | 'hire';
  race: RaceId;
  /** 佣兵的稀有度；名角恒为 'common'（不参与稀有度竞争） */
  rarity: Rarity;
  /** 资质系数：属性乘数。名角固定 1.0 */
  potential: number;
  level: number;
  exp: number;
  /** 当前装备 */
  equipment: Partial<Record<Slot, string>>;
  /** 累计出战次数 */
  runs: number;
}

/** 派遣（对应 08-wow-idle-architecture.md §3.3 的结构） */
export interface Expedition {
  id: string;
  dungeonId: string;
  memberIds: string[];
  /** 派遣时的队伍快照（用于结算与回放） */
  roster: RosterSnapshot[];
  seed: number;
  startTs: number;
  durationMs: number;
  status: 'running' | 'ready';
  collected: boolean;
  result?: ExpeditionResult;
}

export interface RosterSnapshot {
  memberId: string;
  name: string;
  job: JobId;
  level: number;
  hp: number;
  potency: number;
  healPotency: number;
  mitigation: number;
  resourceMax: number;
  resourceGain: number;
  burstBonus: number;
  burstDurationSec: number;
  burstCooldownSec: number;
  burstCost: number;
}

export interface ExpeditionResult {
  win: boolean;
  gold: number;
  exp: number;
  loot: ItemDef[];
  log: string[];
  /** 实际耗时（秒） */
  durationSec: number;
  /** 队伍剩余血量比例 */
  hpLeftPct: number;
  /** 是否击杀了守关者 */
  bossKilled: boolean;
}

/** 每日周期状态（蓝图 §4.4 第 2 层：每日次数型内容） */
export interface DailyState {
  /** 每日键（本地 04:00 为界） */
  key: string;
  /** 今日「任务轮盘」指向的副本；每日确定性轮换 */
  rouletteDungeonId: string | null;
  /** 今日轮盘奖励是否已领取 */
  rouletteDone: boolean;
}

/** 每周周期状态（蓝图 §4.4 第 3 层：每周上限型 + 清单型） */
export interface WeeklyState {
  /** 每周键（本地周一 04:00 为界） */
  key: string;
  /** 天书奇谭计数器 */
  counters: Record<string, number>;
  /** 已领取的连线 id */
  claimedLines: string[];
  /** 本周已领奖次数 */
  claims: number;
}

/** 破魔试炼：节点类型 */
export type TrialNodeKind = 'battle' | 'elite' | 'camp' | 'treasure' | 'boss';

export interface TrialNodeState {
  index: number;
  kind: TrialNodeKind;
  name: string;
  icon: string;
  cleared: boolean;
}

/**
 * 破魔试炼的一局（棋盘 roguelike）
 * 关键机制来自官方 7.56「Crucible of the Unbroken」：
 *  - 独立血量、跨节点继承、**不自然回复**
 *  - 一次性道具 + 局内永久祝福 两层结构
 *  - **放弃也给分**
 */
export interface TrialRun {
  id: string;
  chapter: number;
  memberIds: string[];
  /** 出战快照（含最大生命等） */
  roster: RosterSnapshot[];
  /** 当前血量（独立血量，不自然回复） */
  hp: Record<string, number>;
  /** 下一个要挑战的节点下标 */
  nodeIndex: number;
  nodes: TrialNodeState[];
  /** 一次性道具 id */
  items: string[];
  /** 局内永久祝福 id */
  blessings: string[];
  /** 下场战斗的临时增益（由道具产生） */
  nextBattle: { damageMult: number; takenMult: number };
  score: number;
  log: string[];
  seed: number;
  status: 'running' | 'finished';
  startedAt: number;
}

/** 幻境武器进度（每个成员各一条长链） */
export interface RelicState {
  /** 已完成的阶数（0 = 还没开始） */
  stage: number;
  /** 累计指标：clears / bosses / trialScore / roulette */
  progress: Record<string, number>;
}

/**
 * 离线生产设施（工房）
 *
 * 产出按「真实时间 × 槽位产量 × 连续收获加成」计算，但有**硬性储存上限**：
 * 超过上限后不再累积（防止"永不上线"成为最优解）。
 */
export interface FacilityState {
  level: number;
  /** 各槽位正在进行的项目（null = 空闲） */
  slots: (string | null)[];
  /** 已结算入库、等待领取的产出 */
  banked: { gold: number; boxes: number };
  /** 上次结算/重置累计的起点时间戳 */
  since: number;
  /** 已领取的待鉴定箱数量（未鉴定） */
  boxes: number;
  /** 连续收获加成 0..GROOVE_MAX */
  groove: number;
  /** 累计收获次数（统计） */
  collections: number;
  /** 是否发生过溢出（超过储存上限） */
  overflowed: boolean;
}

/**
 * 无尽塔的一次攀爬
 *
 * 三个官方深层迷宫机制：**独立等级**（塔内从 1 级成长）、
 * **软重置**（进度清零但"塔之记忆"永久保留）、**待鉴定箱**。
 */
export interface TowerRun {
  memberIds: string[];
  roster: RosterSnapshot[];
  /** 下一层要挑战的层数（1 起） */
  floor: number;
  /** 塔内独立等级 */
  level: number;
  /** 跨层继承的血量（不自然回复，只能靠休整层/道具） */
  hp: Record<string, number>;
  /** 本次攀爬累计的待鉴定箱 */
  boxes: number;
  gold: number;
  exp: number;
  seed: number;
  log: string[];
  startedAt: number;
  /** 本次已到达的最高层 */
  reached: number;
}

export interface GameState {
  version: number;
  guildName: string;
  gold: number;
  /** 已解锁章节 */
  chapter: number;
  members: MemberState[];
  inventory: ItemDef[];
  expeditions: Expedition[];
  /** 已通关副本 id */
  cleared: string[];
  /** 每日周期 */
  daily: DailyState;
  /** 每周周期 */
  weekly: WeeklyState;
  /** 当前破魔试炼（null = 没有进行中的一局） */
  trial: TrialRun | null;
  /** 试炼历史最高分 */
  trialBest: number;
  /** 职业量谱精通：memberId → 已解锁节点 id 列表 */
  masteries: Record<string, string[]>;
  /** 幻境武器：memberId → 长链进度 */
  relics: Record<string, RelicState>;
  /** 是否有成员完成了幻境武器终阶（全队永久加成） */
  relicFinalBonus: boolean;
  /** 离线生产设施（工房） */
  facility: FacilityState;
  /** 酒馆：每日候选与刷新状态 */
  tavern: TavernState;
  /** 进行中的无尽塔攀爬（null = 没有） */
  tower: TowerRun | null;
  /** 塔之记忆：软重置保留的永久加成（0.35 = +35%） */
  towerMemory: number;
  /** 历史最高层 */
  towerBest: number;
  /** 本赛季（每周）最高层 */
  towerSeason: { key: string; best: number };
  createdAt: number;
  lastSeen: number;
  /** 上次导出存档的时间（0 = 从未导出）。手机端本地存储可能被系统清理，靠它做备份提醒 */
  lastExportAt: number;
  /** 完整性校验 */
  integrity: { seq: number; digest: string };
}
