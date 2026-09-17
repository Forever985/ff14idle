/**
 * 酒馆佣兵：名字生成、稀有度、定价
 *
 * 设计要点（和用户确认过）：
 *  · 候选每天 3 个，每日免费刷新 1 次，之后付费重 roll；
 *  · 候选带**稀有度**，稀有度只影响"初始资质"（属性系数）——这是金币的去处；
 *  · 名字**全部自研生成**：按种族音节表拼，绝不撞任何官方角色名。
 *    这一条是有意的：本项目只用名词与玩法结构，不搬运官方文本，
 *    所以名字必须是"像那个世界的名字"，而不能是"官方名单里的名字"。
 *
 * 资质（potential）为什么存在：
 *   战斗内核是期望值的，属性 = 职业基础 × 等级 × 装备 × 资质。
 *   资质让"同一个职业、同一个等级"的两个人有区别，稀有度才有意义。
 *   名角的资质固定为 1.00（基准），不参与稀有度竞争。
 */
import { makeRng } from '../core/rng';
import type { HireCandidate, Rarity, RaceId } from '../types';

// --------------------------------------------------------------------------- //
// 种族
// --------------------------------------------------------------------------- //
export const RACES: { id: RaceId; name: string; note: string }[] = [
  { id: 'hyur', name: '人族', note: '分布最广，什么活都干' },
  { id: 'elezen', name: '精灵族', note: '身形修长，森都与皇都居多' },
  { id: 'miqote', name: '猫魅族', note: '耳尾醒目，太阳与月亮两支' },
  { id: 'lalafell', name: '拉拉肥族', note: '个头最小，嗓门最大' },
  { id: 'roegadyn', name: '鲁加族', note: '体格魁梧，海都与沙漠常见' },
  { id: 'auRa', name: '敖龙族', note: '角与鳞，来自东方' },
];

export const RACE_BY_ID = Object.fromEntries(
  RACES.map((r) => [r.id, { name: r.name, note: r.note }]),
) as Record<RaceId, { name: string; note: string }>;

// --------------------------------------------------------------------------- //
// 名字生成：每个种族一套音节表
// --------------------------------------------------------------------------- //
/**
 * 音节表刻意做得"像那块地方的人"，但每个字都是通用的音节组合。
 * 生成完还会再过一道**黑名单**（官方角色名），双保险。
 */
const SYLLABLES: Record<RaceId, { first: string[]; second: string[] }> = {
  hyur: {
    first: ['艾', '兰', '米', '塞', '卡', '德', '罗', '菲', '海', '奥', '希', '薇'],
    second: ['尔', '拉', '恩', '德', '娅', '洛', '斯', '娜', '姆', '伊', '伦', '萨'],
  },
  elezen: {
    first: ['法', '伊', '洛', '塞', '艾', '奥', '维', '吉', '尤', '凯', '希', '莱'],
    second: ['兰', '泽', '因', '里', '诺', '娜', '薇', '尔', '莎', '缇', '昂', '耶'],
  },
  miqote: {
    first: ['雅', '卡', '娜', '希', '缪', '莎', '缇', '菲', '祖', '珂', '露', '玫'],
    second: ['蒂', '妮', '娅', '希', '姆', '缇', '卡', '莎', '恩', '拉', '薇', '洛'],
  },
  lalafell: {
    first: ['帕', '塔', '珂', '缪', '祖', '南', '皮', '莉', '多', '瓦', '珂', '妮'],
    second: ['帕', '丽', '珂', '娜', '姆', '莉', '娅', '托', '西', '兰', '露', '妮'],
  },
  roegadyn: {
    first: ['巴', '格', '海', '瓦', '洛', '德', '梅', '鲁', '斯', '库', '布', '阿'],
    second: ['尔', '姆', '德', '罗', '加', '恩', '格', '斯', '特', '兰', '兹', '娜'],
  },
  auRa: {
    first: ['希', '尤', '纱', '莉', '瓦', '珂', '琉', '丝', '泽', '拉', '艾', '诺'],
    second: ['娅', '拉', '丝', '珂', '恩', '缇', '娜', '姆', '泽', '莉', '兰', '莎'],
  },
};

/** 家族/族名后缀（少量，只给部分种族用，避免名字过长） */
const SURNAME: Partial<Record<RaceId, string[]>> = {
  hyur: ['·维尔', '·哈特', '·罗德', '·凯恩'],
  elezen: ['·德·瓦兰', '·德·尚', '·德·福雷', '·德·艾兰'],
  roegadyn: ['·斯温', '·布罗', '·加姆', '·斯瓦'],
};

/**
 * 黑名单：官方角色名（中文与英文都放进去）。
 * 生成器撞上就重新摇——这是"绝不撞官方名单"的兜底，不指望概率。
 */
const BLOCKED = new Set(
  [
    '桑克雷德', '雅修特拉', '阿莉塞', '阿尔菲诺', '古拉哈提亚', '光之战士', '埃斯蒂尼安', '可露儿',
    '于里昂热', '莉瑟', '艾默里克', '劳班', '西德', '敏菲利亚', '塔塔露', '芙朵拉', '盖娅',
    '娜娜莫', '蒂莉', '夕雾', '尤艾尔', '帕帕力莫', '伊达', '穆恩布鲁达', '库露露', '西里',
    'thancred', 'shtola', 'alisaie', 'alphinaud', 'graha', 'estinien', 'krile', 'urianger',
    'lyse', 'aymeric', 'raubahn', 'cid', 'minfilia', 'tataru', 'fordola', 'gaia', 'nanamo',
    'yugiri', 'papalymo', 'moenbryda', 'hoary',
  ].map((s) => s.toLowerCase()),
);

export function randomName(rngSeed: string, race: RaceId): string {
  const rng = makeRng(`${rngSeed}|${race}`);
  const table = SYLLABLES[race];
  for (let attempt = 0; attempt < 24; attempt++) {
    let name = rng.pick(table.first) + rng.pick(table.second);
    const sur = SURNAME[race];
    if (sur && rng.chance(0.35)) name += rng.pick(sur);
    const key = name.replace(/·/g, '').toLowerCase();
    if (!BLOCKED.has(key) && name.length <= 8) return name;
  }
  // 兜底：加一个数字后缀，保证一定能返回一个不撞名的名字
  return `${rng.pick(table.first)}${rng.pick(table.second)}${rng.int(2, 9)}`;
}

// --------------------------------------------------------------------------- //
// 稀有度
// --------------------------------------------------------------------------- //
export interface RarityDef {
  id: Rarity;
  name: string;
  /** 属性系数（资质）：同一个职业、同一个等级下，稀有度直接体现在这里 */
  potential: number;
  /** 概率权重 */
  weight: number;
  /** 雇佣基础价（再按等级放大） */
  baseCost: number;
  color: string;
}

export const RARITIES: RarityDef[] = [
  { id: 'common', name: '普通', potential: 1.0, weight: 58, baseCost: 120, color: 'var(--q-common)' },
  { id: 'uncommon', name: '优秀', potential: 1.04, weight: 26, baseCost: 320, color: 'var(--q-uncommon)' },
  { id: 'rare', name: '精锐', potential: 1.09, weight: 12, baseCost: 780, color: 'var(--q-rare)' },
  { id: 'epic', name: '英雄', potential: 1.15, weight: 4, baseCost: 1900, color: 'var(--q-epic)' },
];

export const RARITY_BY_ID: Record<Rarity, RarityDef> = Object.fromEntries(
  RARITIES.map((r) => [r.id, r]),
) as Record<Rarity, RarityDef>;

/** 名角的稀有度固定为基准，不参与稀有度竞争 */
export function namedPotential(): number {
  return 1.0;
}

/** 雇佣价：基础价 × 等级系数（章节越往后人越贵，金币才有去处） */
export function hireCost(rarity: Rarity, level: number): number {
  const base = RARITY_BY_ID[rarity].baseCost;
  return Math.round(base * (0.7 + level / 40));
}

/** 重 roll 一次的价格（跟着章节涨，避免后期用零钱无限刷） */
export function rerollCost(chapter: number): number {
  return Math.round(180 * Math.pow(1.35, Math.max(0, chapter - 1)));
}

// --------------------------------------------------------------------------- //
// 候选生成
// --------------------------------------------------------------------------- //
const JOBS = ['WAR', 'WHM', 'BLM', 'MCH', 'SMN', 'RDM', 'SGE', 'BST'] as const;

/**
 * 生成一批候选。
 * 用**日期当种子**，所以同一天刷新出来的三个人是固定的——
 * 玩家不会因为反复关开页面而刷出不同结果（那是作弊，也不是设计意图）。
 */
export function makeCandidates(dayKey: string, count: number, levelFloor: number): HireCandidate[] {
  const rng = makeRng(`tavern|${dayKey}`);
  const out: HireCandidate[] = [];
  for (let i = 0; i < count; i++) {
    const sub = makeRng(`${dayKey}|${i}`);
    const race = sub.pick(RACES).id;
    // 稀有度按权重抽：好苗子稀有，但每天三个里总有希望
    const rarity = RARITIES[sub.weighted(RARITIES.map((r) => r.weight))]!.id;
    const job = sub.pick(JOBS);
    // 等级：在"当前章节等级下限"附近浮动，越稀有越可能高一点
    const bump = rarity === 'epic' ? 3 : rarity === 'rare' ? 2 : rarity === 'uncommon' ? 1 : 0;
    const level = Math.max(1, levelFloor + sub.int(0, 2) + bump);
    out.push({
      id: `${dayKey}-${i}`,
      name: randomName(`${dayKey}|${i}`, race),
      race,
      job,
      rarity,
      level,
      potential: RARITY_BY_ID[rarity].potential,
      cost: hireCost(rarity, level),
    });
  }
  // rng 只是为了让"同一天"这件事显式依赖 dayKey，防止有人把 dayKey 换成随机数
  void rng.next();
  return out;
}
