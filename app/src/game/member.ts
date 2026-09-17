/**
 * 角色属性计算：等级 + 装备 → 出战快照
 *
 * 对应蓝图 §4.3：iLvl 是核心成长轴，且「物品等级绑定角色」是 8.0 的方向。
 * 这里每个成员各自算平均物品等级（MVP 阶段先按成员走），
 * 装备是唯一的战力放大器，等级提供基础成长。
 */
import { JOBS } from '../data/jobs';
import { masteryMods } from '../data/masteries';
import { SLOTS, itemLevelOf } from '../data/items';
import type { ItemDef, MemberState, RosterSnapshot, Slot } from '../types';

/** 等级成长系数（线性，呼应蓝图 §4.3「用线性曲线」的设计决定） */
const HP_PER_LEVEL = 0.07;
const POTENCY_PER_LEVEL = 0.045;

export function equippedItems(member: MemberState, inventory: ItemDef[]): ItemDef[] {
  const byUid = new Map(inventory.map((i) => [i.uid, i]));
  const out: ItemDef[] = [];
  for (const slot of Object.keys(member.equipment) as Slot[]) {
    const uid = member.equipment[slot];
    const item = uid ? byUid.get(uid) : undefined;
    if (item) out.push(item);
  }
  return out;
}

/** 平均物品等级（未装备的部位按 0 计，向上取整便于阅读） */
export function averageItemLevel(member: MemberState, inventory: ItemDef[]): number {
  const equipped = equippedItems(member, inventory);
  if (equipped.length === 0) return 0;
  const total = equipped.reduce((s, i) => s + itemLevelOf(i), 0);
  return Math.round(total / SLOTS.length);
}

export function computeMemberStats(
  member: MemberState,
  inventory: ItemDef[],
  unlockedMasteries: readonly string[] = [],
  /** 全队加成（目前来自幻境武器终阶） */
  teamBonus: { potencyMult: number; hpMult: number } = { potencyMult: 0, hpMult: 0 },
): RosterSnapshot {
  const job = JOBS[member.job];
  const lv = member.level;
  const lvHp = 1 + HP_PER_LEVEL * (lv - 1);
  const lvPot = 1 + POTENCY_PER_LEVEL * (lv - 1);
  const mods = masteryMods(unlockedMasteries);
  // 资质：佣兵的稀有度体现在这里；名角固定 1.0。
  // 老存档可能没有这个字段（v9 之前的档），兜底成 1，绝不让它变成 NaN。
  const pot = Number.isFinite(member.potential) && member.potential > 0 ? member.potential : 1;

  let bonusHp = 0;
  let bonusPotency = 0;
  let bonusHeal = 0;
  for (const item of equippedItems(member, inventory)) {
    bonusHp += item.stats.hp;
    bonusPotency += item.stats.potency;
    bonusHeal += item.stats.healPotency;
  }

  const hp = Math.round(
    (job.base.hp * lvHp + bonusHp) * (1 + mods.hpMult) * (1 + teamBonus.hpMult) * pot,
  );
  const potency =
    Math.round(
      (job.base.potency * lvPot + bonusPotency) *
        (1 + mods.potencyMult) *
        (1 + teamBonus.potencyMult) *
        pot *
        10,
    ) / 10;
  const healPotency =
    Math.round((job.base.healPotency * lvPot + bonusHeal) * (1 + mods.healMult) * pot * 10) / 10;

  return {
    memberId: member.id,
    name: member.name,
    job: member.job,
    level: lv,
    hp,
    potency,
    healPotency,
    // 减伤设上限，避免堆到无敌
    mitigation: Math.min(0.6, job.base.mitigation + mods.mitigationAdd),
    resourceMax: job.resource.max,
    resourceGain: job.resource.gainPerSec * (1 + mods.resourceGainMult),
    burstBonus: job.burst.bonus + mods.burstBonusAdd,
    burstDurationSec: job.burst.durationSec,
    burstCooldownSec: job.burst.cooldownSec,
    burstCost: job.burst.cost,
  };
}
