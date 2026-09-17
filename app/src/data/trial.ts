/**
 * 破魔试炼（Crucible）—— 棋盘式 roguelike 挂机层的数据定义
 *
 * 官方原型：**7.56 新增的 Crucible of the Unbroken**（驯兽师专属单人玩法）。
 * `06-side-content-pvp.md` §9.9 的评价：
 *   「首期做『塔 + 棋盘 + 产线 + 派遣 + 周常 + 至尊目标』六件事，
 *     其中 **Crucible 式棋盘是最值得优先做的单点**——
 *     因为它同时具备『单人、可挂机、有决策、有保底、有赛季计分』五个属性，
 *     且是 SE 在 2026 年 9 月刚刚给出的最新答案。」
 *
 * 官方机制里被本作采纳的四条（见 `09-evercold-current-state.md` §2.4）：
 *   ① 棋盘逐格推进，每格不同事件，最深处击败 BOSS 通关
 *   ② 玩家与队友**独立血量且不会自然回复**，必须靠道具或特定格子恢复
 *   ③ **一次性道具（Ephemeral）/ 局内永久强化** 的两层道具结构
 *   ④ **放弃也给分**（Forfeiting 仍按进度计分）
 */
import { makeRng } from '../core/rng';
import type { EnemySpec } from '../sim/combat';
import type { TrialNodeKind, TrialNodeState } from '../types';

export type { TrialNodeKind, TrialNodeState };

export interface TrialItemDef {
  id: string;
  name: string;
  desc: string;
}

export interface TrialBlessingDef {
  id: string;
  name: string;
  desc: string;
  /** 伤害倍率加成（加法，如 0.08 = +8%） */
  damageBonus: number;
  /** 受伤倍率降低（加法，如 0.08 = -8%） */
  damageReduction: number;
  /** 最大生命加成（加法） */
  hpBonus: number;
}

/** 棋盘长度（含 BOSS 格） */
export const BOARD_LENGTH = 12;

/** 单格基础得分 */
export const NODE_SCORE: Record<TrialNodeKind, number> = {
  battle: 100,
  elite: 250,
  camp: 30,
  treasure: 60,
  boss: 800,
};

/** 生存奖励系数：通关/放弃时按剩余血量比例给分 */
export const SURVIVAL_SCORE = 400;

const NODE_META: Record<TrialNodeKind, { name: string; icon: string }> = {
  battle: { name: '魔物盘踞', icon: '⚔️' },
  elite: { name: '精英守卫', icon: '💀' },
  camp: { name: '休整营地', icon: '🔥' },
  treasure: { name: '遗落宝箱', icon: '🎁' },
  boss: { name: '守关者', icon: '👑' },
};

/** 一次性道具（对应官方 Ephemeral items） */
export const TRIAL_ITEMS: TrialItemDef[] = [
  { id: 'potion', name: '治疗药', desc: '全队回复 35% 最大生命' },
  { id: 'whetstone', name: '磨刀石', desc: '下一场战斗伤害 +30%' },
  { id: 'ward', name: '护盾符', desc: '下一场战斗受到伤害 -35%' },
  { id: 'revive', name: '复苏之羽', desc: '复活一名阵亡成员至 40% 生命' },
];

/** 局内永久强化（对应官方 Beast gear：放在背包就生效） */
export const TRIAL_BLESSINGS: TrialBlessingDef[] = [
  { id: 'might', name: '力量祝福', desc: '本局伤害 +8%', damageBonus: 0.08, damageReduction: 0, hpBonus: 0 },
  { id: 'vigor', name: '活力祝福', desc: '本局最大生命 +12% 并回复等量生命', damageBonus: 0, damageReduction: 0, hpBonus: 0.12 },
  { id: 'aegis', name: '守护祝福', desc: '本局受到伤害 -8%', damageBonus: 0, damageReduction: 0.08, hpBonus: 0 },
  { id: 'focus', name: '专注祝福', desc: '本局伤害 +5%、受伤 -5%', damageBonus: 0.05, damageReduction: 0.05, hpBonus: 0 },
];

/**
 * 生成一副棋盘：前 11 格由固定配比洗牌，最后一格固定为 BOSS。
 * 配比参考官方体感：战斗最多、营地与宝箱提供喘息、精英给永久强化。
 */
export function generateBoard(seed: number, chapter: number): TrialNodeState[] {
  const rng = makeRng(`trial:${seed}:board:${chapter}`);
  const pool: TrialNodeKind[] = [
    'battle', 'battle', 'battle', 'battle', 'battle',
    'elite', 'elite',
    'camp', 'camp',
    'treasure',
    'battle', // 第 11 张用于补足，洗牌后分布仍以战斗为主
  ];
  // Fisher–Yates
  for (let i = pool.length - 1; i > 0; i--) {
    const j = rng.int(0, i);
    [pool[i], pool[j]] = [pool[j]!, pool[i]!];
  }
  const kinds = [...pool.slice(0, BOARD_LENGTH - 1), 'boss' as TrialNodeKind];

  return kinds.map((kind, index) => ({
    index,
    kind,
    name: NODE_META[kind].name,
    icon: NODE_META[kind].icon,
    cleared: false,
  }));
}

/**
 * 单格敌人。深度越深越强；比同章副本略温和——
 * 因为试炼**血量跨节点继承且不自然回复**，强度必须留给"长线消耗"。
 */
export function makeEnemies(node: TrialNodeState, chapter: number, seed: number): EnemySpec[] {
  if (node.kind === 'camp' || node.kind === 'treasure') return [];

  const rng = makeRng(`trial:${seed}:node:${node.index}`);
  const L = 15 + (chapter - 1) * 10;
  // 深度曲线刻意做得陡一些：试炼的乐趣来自"越走越痛"的消耗战，
  // 若沿路无压力、只在 BOSS 断崖，就退化成"一次性关卡"而非 roguelike。
  const scale = (chapter - 1) * 130 + node.index * 34;
  const hp = Math.round(3000 * (1 + scale / 45));
  const partyHp = 3 * 700 * (1 + 0.07 * (L - 1));
  // ⚠️ 这个除数是试炼难度的**核心旋钮**（实测调参）：
  //   /62 → 治疗量把沿路消耗完全抹平，10 局全部走到第 11 格、全部卡 BOSS，毫无随机性；
  //   /24 → 每个战斗节点净损耗约 15–20% 生命，开始出现"走多远取决于棋盘顺序与道具使用"的分化。
  const baseDps = partyHp / 24;

  const count = node.kind === 'boss' ? 3 : node.kind === 'elite' ? 2 : rng.int(1, 2);
  const names = ['徘徊的魔物', '破碎的守卫', '侵蚀的幻影', '石像鬼兵', '深渊爪牙'];

  const out: EnemySpec[] = [];
  for (let i = 0; i < count; i++) {
    const isBoss = node.kind === 'boss' && i === count - 1;
    const mult = isBoss ? 2.6 : node.kind === 'elite' ? 1.35 : 1;
    out.push({
      name: isBoss ? `${NODE_META.boss.name}·最终形态` : rng.pick(names),
      hp: Math.round(hp * mult),
      dps: Math.round(baseDps * (isBoss ? 1.15 : 1) * rng.float(0.9, 1.1)),
      boss: isBoss,
    });
  }
  return out;
}

export function makeTreasure(seed: number, index: number): TrialItemDef {
  const rng = makeRng(`trial:${seed}:treasure:${index}`);
  return rng.pick(TRIAL_ITEMS);
}

export function makeBlessing(seed: number, index: number): TrialBlessingDef {
  const rng = makeRng(`trial:${seed}:blessing:${index}`);
  return rng.pick(TRIAL_BLESSINGS);
}

export function itemById(id: string): TrialItemDef | undefined {
  return TRIAL_ITEMS.find((i) => i.id === id);
}

export function blessingById(id: string): TrialBlessingDef | undefined {
  return TRIAL_BLESSINGS.find((b) => b.id === id);
}

export const NODE_LABEL = NODE_META;
