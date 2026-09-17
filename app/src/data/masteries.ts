/**
 * 职业量谱精通（Job Mastery）—— FF14「没有天赋树」的替代品
 *
 * 设计依据（`10-design-blueprint.md` §2 决策二）：
 *   wow-idle 的养成深度靠「天赋树 + 套装 + 技能解锁」，而 **FF14 没有天赋树**，
 *   所以不能照抄。可替代的深度来源里，**职业量谱精通是最像天赋树、也最贴 FF14 的一环**：
 *   官方每个职业都有自己的量谱（兽魂 / 百合 / 星极火 / 热量 …），
 *   且 8.0 的 Evolved 模式官方明说要 "greater emphasis on job identity"（更强调职业特色）。
 *
 * 结构：每个职业 4 个节点
 *   T1a / T1b（二选一，各有侧重）→ T2（需任一 T1）→ T3 顶点（需 T2）
 * 于是玩家在**同一职业内部**也要做一次路线选择，这正是「有决策」的最小来源。
 *
 * ⚠️ 所有名称与数值均为本项目自研，不使用官方技能名或数据（见 07 的合规要求）。
 */
import type { JobId } from '../types';
import { JOB_ORDER } from './jobs';

export interface MasteryEffect {
  /** 效力倍率加成（加法，如 0.12 = +12%） */
  potencyMult?: number;
  /** 治疗效力倍率加成 */
  healMult?: number;
  /** 最大生命倍率加成 */
  hpMult?: number;
  /** 减伤加值（加法） */
  mitigationAdd?: number;
  /** 爆发窗口加成加值（加法） */
  burstBonusAdd?: number;
  /** 资源累积速度倍率加成 */
  resourceGainMult?: number;
}

export interface MasteryDef {
  id: string;
  job: JobId;
  tier: 1 | 2 | 3;
  name: string;
  desc: string;
  cost: number;
  levelReq: number;
  /** 满足其中之一即可解锁 */
  requiresAny?: string[];
  effect: MasteryEffect;
}

interface Spec {
  a: { name: string; desc: string; effect: MasteryEffect };
  b: { name: string; desc: string; effect: MasteryEffect };
  mid: { name: string; desc: string; effect: MasteryEffect };
  cap: { name: string; desc: string; effect: MasteryEffect };
}

const SPECS: Record<JobId, Spec> = {
  WAR: {
    a: { name: '钢铁意志', desc: '减伤 +6%', effect: { mitigationAdd: 0.06 } },
    b: { name: '兽魂涌动', desc: '兽魂累积速度 +25%', effect: { resourceGainMult: 0.25 } },
    mid: { name: '解放延长', desc: '爆发窗口加成 +15%', effect: { burstBonusAdd: 0.15 } },
    cap: { name: '不屈壁垒', desc: '最大生命 +10%、减伤 +4%', effect: { hpMult: 0.1, mitigationAdd: 0.04 } },
  },
  WHM: {
    a: { name: '百合丰饶', desc: '百合累积速度 +30%', effect: { resourceGainMult: 0.3 } },
    b: { name: '治愈之光', desc: '治疗效力 +15%', effect: { healMult: 0.15 } },
    mid: { name: '血之百合', desc: '爆发窗口加成 +20%', effect: { burstBonusAdd: 0.2 } },
    cap: { name: '全大赦', desc: '治疗效力 +15%、最大生命 +8%', effect: { healMult: 0.15, hpMult: 0.08 } },
  },
  SGE: {
    a: { name: '蛇刺锐化', desc: '蛇刺累积速度 +30%', effect: { resourceGainMult: 0.3 } },
    b: { name: '预判护盾', desc: '减伤 +5%', effect: { mitigationAdd: 0.05 } },
    mid: { name: '尤卡西斯精通', desc: '治疗效力 +18%', effect: { healMult: 0.18 } },
    cap: { name: '万象贤法', desc: '治疗效力 +12%、效力 +12%', effect: { healMult: 0.12, potencyMult: 0.12 } },
  },
  BLM: {
    a: { name: '星极炽热', desc: '效力 +10%', effect: { potencyMult: 0.1 } },
    b: { name: '灵极静默', desc: '悖论累积速度 +30%', effect: { resourceGainMult: 0.3 } },
    mid: { name: '魔纹延展', desc: '爆发窗口加成 +18%', effect: { burstBonusAdd: 0.18 } },
    cap: { name: '万象崩坏', desc: '效力 +15%', effect: { potencyMult: 0.15 } },
  },
  MCH: {
    a: { name: '枪管改造', desc: '效力 +10%', effect: { potencyMult: 0.1 } },
    b: { name: '冷却优化', desc: '热量累积速度 +30%', effect: { resourceGainMult: 0.3 } },
    mid: { name: '野火连锁', desc: '爆发窗口加成 +20%', effect: { burstBonusAdd: 0.2 } },
    cap: { name: '超载核心', desc: '效力 +12%、爆发加成 +10%', effect: { potencyMult: 0.12, burstBonusAdd: 0.1 } },
  },
  SMN: {
    a: { name: '召唤强化', desc: '效力 +11%', effect: { potencyMult: 0.11 } },
    b: { name: '以太回流', desc: '以太超流累积速度 +30%', effect: { resourceGainMult: 0.3 } },
    mid: { name: '不死鸟延烧', desc: '爆发窗口加成 +18%', effect: { burstBonusAdd: 0.18 } },
    cap: { name: '万象召唤', desc: '效力 +14%、最大生命 +8%', effect: { potencyMult: 0.14, hpMult: 0.08 } },
  },
  RDM: {
    a: { name: '赤红专注', desc: '效力 +10%', effect: { potencyMult: 0.1 } },
    b: { name: '双色平衡', desc: '魔力平衡累积速度 +30%', effect: { resourceGainMult: 0.3 } },
    mid: { name: '决断强化', desc: '爆发窗口加成 +18%', effect: { burstBonusAdd: 0.18 } },
    cap: { name: '赤白交融', desc: '效力 +12%、治疗效力 +20%', effect: { potencyMult: 0.12, healMult: 0.2 } },
  },
  BST: {
    a: { name: '契约深化', desc: '效力 +11%', effect: { potencyMult: 0.11 } },
    b: { name: '本能唤醒', desc: 'TP 累积速度 +30%', effect: { resourceGainMult: 0.3 } },
    mid: { name: '连携延长', desc: '爆发窗口加成 +20%', effect: { burstBonusAdd: 0.2 } },
    cap: { name: '万兽之王', desc: '效力 +12%、最大生命 +10%', effect: { potencyMult: 0.12, hpMult: 0.1 } },
  },
};

const TIER_COST = { 1: 200, 2: 600, 3: 1500 } as const;
const TIER_LEVEL = { 1: 20, 2: 30, 3: 40 } as const;

function build(job: JobId): MasteryDef[] {
  const s = SPECS[job];
  const a = `${job}_a`;
  const b = `${job}_b`;
  const mid = `${job}_mid`;
  const cap = `${job}_cap`;
  return [
    { id: a, job, tier: 1, name: s.a.name, desc: s.a.desc, cost: TIER_COST[1], levelReq: TIER_LEVEL[1], effect: s.a.effect },
    { id: b, job, tier: 1, name: s.b.name, desc: s.b.desc, cost: TIER_COST[1], levelReq: TIER_LEVEL[1], effect: s.b.effect },
    { id: mid, job, tier: 2, name: s.mid.name, desc: s.mid.desc, cost: TIER_COST[2], levelReq: TIER_LEVEL[2], requiresAny: [a, b], effect: s.mid.effect },
    { id: cap, job, tier: 3, name: s.cap.name, desc: s.cap.desc, cost: TIER_COST[3], levelReq: TIER_LEVEL[3], requiresAny: [mid], effect: s.cap.effect },
  ];
}

export const MASTERIES: MasteryDef[] = JOB_ORDER.flatMap(build);

export const MASTERY_BY_ID: Record<string, MasteryDef> = Object.fromEntries(
  MASTERIES.map((m) => [m.id, m]),
);

export function masteriesFor(job: JobId): MasteryDef[] {
  return MASTERIES.filter((m) => m.job === job);
}

/** 把已解锁节点汇总成战斗属性修正 */
export function masteryMods(unlocked: readonly string[]): Required<MasteryEffect> {
  const acc: Required<MasteryEffect> = {
    potencyMult: 0,
    healMult: 0,
    hpMult: 0,
    mitigationAdd: 0,
    burstBonusAdd: 0,
    resourceGainMult: 0,
  };
  for (const id of unlocked) {
    const def = MASTERY_BY_ID[id];
    if (!def) continue;
    acc.potencyMult += def.effect.potencyMult ?? 0;
    acc.healMult += def.effect.healMult ?? 0;
    acc.hpMult += def.effect.hpMult ?? 0;
    acc.mitigationAdd += def.effect.mitigationAdd ?? 0;
    acc.burstBonusAdd += def.effect.burstBonusAdd ?? 0;
    acc.resourceGainMult += def.effect.resourceGainMult ?? 0;
  }
  return acc;
}
