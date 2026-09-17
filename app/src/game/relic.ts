/**
 * 幻境武器（Relic）长链的运转逻辑
 *
 * 核心设计：**每一阶都要求去玩一个不同的系统**，因此它把
 * 副本 / 讨伐 / 破魔试炼 / 每日轮盘 / 章节推进 串成了一条主线目标。
 * 这是蓝图 §7 里 MVP 六件事的最后一块（「超长线至尊目标」）。
 */
import { QUALITY_LABEL, rollItem } from '../data/items';
import { makeRng } from '../core/rng';
import { JOBS } from '../data/jobs';
import {
  RELIC_FINAL_BONUS,
  RELIC_STAGES,
  relicItemName,
  type RelicMetric,
  type RelicStageDef,
} from '../data/relic';
import type { GameState, ItemDef, RelicState } from '../types';
import { chapterChain, findMember } from './state';

export function relicState(state: GameState, memberId: string): RelicState {
  return state.relics?.[memberId] ?? { stage: 0, progress: {} };
}

/** 当前指标值 */
export function relicMetricValue(state: GameState, memberId: string, metric: RelicMetric): number {
  const rs = relicState(state, memberId);
  if (metric === 'chapterClear') {
    const chain = chapterChain(state.chapter);
    return chain.filter((d) => state.cleared.includes(d.id)).length;
  }
  return rs.progress[metric] ?? 0;
}

/** 该指标的需求量（chapterClear 是动态的） */
export function relicMetricNeed(state: GameState, def: RelicStageDef): number {
  if (def.metric === 'chapterClear') return chapterChain(state.chapter).length;
  return def.need;
}

export interface RelicRow {
  def: RelicStageDef;
  current: number;
  need: number;
  met: boolean;
  /** 是否已完成该阶 */
  done: boolean;
  /** 是否是当前正在推进的阶 */
  active: boolean;
}

export interface RelicInfo {
  stage: number;
  rows: RelicRow[];
  /** 当前阶（全部完成则 null） */
  current?: RelicStageDef;
  canAdvance: boolean;
  reason?: string;
  /** 全队终阶加成是否生效 */
  finalBonusActive: boolean;
}

export function relicInfo(state: GameState, memberId: string): RelicInfo {
  const rs = relicState(state, memberId);
  const rows: RelicRow[] = RELIC_STAGES.map((def) => {
    const current = relicMetricValue(state, memberId, def.metric);
    const need = relicMetricNeed(state, def);
    const done = rs.stage >= def.stage;
    return { def, current, need, met: current >= need, done, active: rs.stage + 1 === def.stage };
  });
  const current = rows.find((r) => r.active)?.def;
  const member = findMember(state, memberId);
  let reason: string | undefined;
  let canAdvance = false;

  if (!current) {
    reason = '幻境武器已完成全部阶段';
  } else if (!member) {
    reason = '成员不存在';
  } else {
    const row = rows.find((r) => r.active)!;
    if (!row.met) reason = `${current.label} ${row.current} / ${row.need}`;
    else if (state.gold < current.gold) reason = `金币不足（需 ${current.gold}）`;
    else canAdvance = true;
  }

  return {
    stage: rs.stage,
    rows,
    current,
    canAdvance,
    reason,
    finalBonusActive: rows.every((r) => r.done),
  };
}

/** 累计指标（副本通关、守关者、轮盘次数） */
export function addRelicProgress(
  state: GameState,
  memberIds: readonly string[],
  metric: RelicMetric,
  amount = 1,
): void {
  if (!state.relics) state.relics = {};
  for (const id of memberIds) {
    const rs = state.relics[id] ?? { stage: 0, progress: {} };
    rs.progress[metric] = (rs.progress[metric] ?? 0) + amount;
    state.relics[id] = rs;
  }
}

/** 取最大值型指标（试炼得分） */
export function maxRelicProgress(
  state: GameState,
  memberIds: readonly string[],
  metric: RelicMetric,
  value: number,
): void {
  if (!state.relics) state.relics = {};
  for (const id of memberIds) {
    const rs = state.relics[id] ?? { stage: 0, progress: {} };
    rs.progress[metric] = Math.max(rs.progress[metric] ?? 0, value);
    state.relics[id] = rs;
  }
}

export interface AdvanceRelicResult {
  ok: boolean;
  error?: string;
  stage?: number;
  item?: ItemDef;
  final?: boolean;
}

/** 推进一阶：消耗金币 + 产出高装等武器 */
export function advanceRelic(state: GameState, memberId: string, now: number): AdvanceRelicResult {
  const member = findMember(state, memberId);
  if (!member) return { ok: false, error: '成员不存在' };
  const info = relicInfo(state, memberId);
  if (!info.current) return { ok: false, error: '幻境武器已完成全部阶段' };
  if (!info.canAdvance) return { ok: false, error: info.reason ?? '条件未满足' };

  const def = info.current;
  state.gold -= def.gold;

  const job = JOBS[member.job];
  const rng = makeRng(`relic:${memberId}:${def.stage}:${now}`);
  const item = rollItem(rng, 'weapon', def.itemLevel, def.quality);
  item.name = relicItemName(job.name, def.stage);
  item.uid = `relic_${memberId}_${def.stage}`;
  // 幻境武器给一点额外主属性，体现"成长武器"的分量
  item.stats.potency = Math.round(item.stats.potency * 1.15 * 10) / 10;
  item.stats.hp = Math.round(item.stats.hp * 1.1);

  // 替换掉上一阶的幻境武器（避免背包里堆一排同名武器）
  const prevUid = `relic_${memberId}_${def.stage - 1}`;
  state.inventory = state.inventory.filter((i) => i.uid !== prevUid);
  for (const m of state.members) {
    for (const slot of Object.keys(m.equipment) as (keyof typeof m.equipment)[]) {
      if (m.equipment[slot] === prevUid) m.equipment[slot] = item.uid;
    }
  }
  // 直接装备到主手（至尊目标不该还要手动装）
  member.equipment.weapon = item.uid;
  state.inventory.push(item);

  if (!state.relics) state.relics = {};
  const rs = state.relics[memberId] ?? { stage: 0, progress: {} };
  rs.stage = def.stage;
  state.relics[memberId] = rs;

  const final = def.stage === RELIC_STAGES.length;
  if (final) {
    // 终阶：全队永久加成（作为"至尊目标"的额外分量）
    state.relicFinalBonus = true;
  }

  return { ok: true, stage: def.stage, item, final };
}

/** 终阶全队加成的倍率（供属性计算使用） */
export function relicTeamBonus(state: GameState): { potencyMult: number; hpMult: number } {
  return state.relicFinalBonus ? RELIC_FINAL_BONUS : { potencyMult: 0, hpMult: 0 };
}

export function relicQualityLabel(def: RelicStageDef): string {
  return QUALITY_LABEL[def.quality];
}
