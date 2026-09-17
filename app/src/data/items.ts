/**
 * 装备生成器
 *
 * 设计依据（蓝图 §4.3）：iLvl 是 FF14 唯一的核心成长轴，且是线性的。
 * 因此装备不做静态表，而是「按 iLvl 生成」——副本有多高的 iLvl，就掉多好的装备。
 *
 * ⚠️ 物品名称全部为通用构词（材质 + 部位），**不使用任何官方物品名**（07 §6 高风险项）。
 */
import type { ItemDef, Quality, Slot } from '../types';
import type { Rng } from '../core/rng';

export const SLOTS: { id: Slot; label: string; weight: number; kind: 'weapon' | 'armor' | 'accessory' }[] = [
  { id: 'weapon', label: '主手', weight: 1, kind: 'weapon' },
  { id: 'head', label: '头部', weight: 2, kind: 'armor' },
  { id: 'body', label: '身体', weight: 2, kind: 'armor' },
  { id: 'hands', label: '手部', weight: 2, kind: 'armor' },
  { id: 'legs', label: '腿部', weight: 2, kind: 'armor' },
  { id: 'feet', label: '脚部', weight: 2, kind: 'armor' },
  { id: 'ears', label: '耳饰', weight: 1, kind: 'accessory' },
  { id: 'neck', label: '颈饰', weight: 1, kind: 'accessory' },
  { id: 'wrist', label: '腕饰', weight: 1, kind: 'accessory' },
  { id: 'ring1', label: '戒指', weight: 1, kind: 'accessory' },
  { id: 'ring2', label: '戒指', weight: 1, kind: 'accessory' },
];

export const SLOT_LABEL: Record<Slot, string> = Object.fromEntries(
  SLOTS.map((s) => [s.id, s.label]),
) as Record<Slot, string>;

export const QUALITY_MULT: Record<Quality, number> = {
  common: 1.0,
  uncommon: 1.08,
  rare: 1.18,
  epic: 1.32,
  legendary: 1.5,
};

export const QUALITY_LABEL: Record<Quality, string> = {
  common: '普通',
  uncommon: '精良',
  rare: '稀有',
  epic: '史诗',
  legendary: '传说',
};

/** 通用材质词（非官方物品名） */
const MATERIALS = ['青铜', '铁制', '旧革', '粗布', '硬木', '秘银', '白银', '古铜', '玄铁', '苍玉'];
const WEAPON_NOUNS = ['短剑', '战斧', '长枪', '法杖', '火枪', '手斧', '咒杖', '贤具'];
const ARMOR_NOUNS: Partial<Record<Slot, string[]>> = {
  head: ['头盔', '兜帽', '面甲'],
  body: ['胸甲', '长袍', '皮铠'],
  hands: ['护腕', '手套', '臂甲'],
  legs: ['腿甲', '长裤', '战裙'],
  feet: ['战靴', '长靴', '便鞋'],
};
const ACCESSORY_NOUNS: Partial<Record<Slot, string[]>> = {
  ears: ['耳坠', '耳环'],
  neck: ['项链', '护符'],
  wrist: ['手镯', '腕轮'],
  ring1: ['戒指', '指环'],
  ring2: ['戒指', '指环'],
};

/** 按副本 iLvl 与品质掷出一件装备 */
export function rollItem(rng: Rng, slot: Slot, itemLevel: number, quality: Quality): ItemDef {
  const def = SLOTS.find((s) => s.id === slot)!;
  const mult = QUALITY_MULT[quality];
  const base = Math.max(1, itemLevel);

  let hp = 0;
  let potency = 0;
  if (def.kind === 'weapon') {
    hp = base * 2.0;
    potency = base * 0.95;
  } else if (def.kind === 'armor') {
    hp = base * 3.2;
    potency = base * 0.26;
  } else {
    hp = base * 1.8;
    potency = base * 0.36;
  }

  const material = rng.pick(MATERIALS);
  const noun =
    def.kind === 'weapon'
      ? rng.pick(WEAPON_NOUNS)
      : rng.pick((def.kind === 'armor' ? ARMOR_NOUNS[slot] : ACCESSORY_NOUNS[slot]) ?? ['护具']);

  const prefix = quality === 'legendary' ? '传说的' : quality === 'epic' ? '精工的' : '';
  const suffix = quality === 'uncommon' ? '·改' : '';

  return {
    uid: `it_${slot}_${itemLevel}_${Math.floor(rng.next() * 1e9).toString(36)}`,
    name: `${prefix}${material}${noun}${suffix}`,
    slot,
    itemLevel,
    quality,
    stats: {
      hp: Math.round(hp * mult),
      potency: Math.round(potency * mult * 10) / 10,
      healPotency: def.kind === 'accessory' ? Math.round(base * 0.18 * mult * 10) / 10 : 0,
    },
  };
}

/** 品质掷骰：iLvl 越高越容易出高品质 */
export function rollQuality(rng: Rng, itemLevel: number, bossBonus = 0): Quality {
  const t = Math.min(1, itemLevel / 200) + bossBonus;
  const weights = [
    100 - t * 55,        // common
    35 + t * 10,         // uncommon
    18 + t * 18,         // rare
    6 + t * 20,          // epic
    1 + t * 7,           // legendary
  ];
  const idx = rng.weighted(weights);
  return (['common', 'uncommon', 'rare', 'epic', 'legendary'] as Quality[])[idx]!;
}

/** 掷出一次副本的掉落（1–3 件，BOSS 额外加成） */
export function rollLoot(rng: Rng, itemLevel: number, bossKilled: boolean): ItemDef[] {
  const count = rng.int(1, bossKilled ? 3 : 2);
  const out: ItemDef[] = [];
  const used = new Set<Slot>();
  for (let i = 0; i < count; i++) {
    const slot = rng.pick(SLOTS).id;
    if (used.has(slot)) continue;
    used.add(slot);
    const q = rollQuality(rng, itemLevel, bossKilled ? 0.12 : 0);
    out.push(rollItem(rng, slot, Math.max(1, itemLevel), q));
  }
  return out;
}

/** 一件装备的「装等贡献」——用于计算角色平均物品等级 */
export function itemLevelOf(item: ItemDef | undefined): number {
  return item ? item.itemLevel : 0;
}
