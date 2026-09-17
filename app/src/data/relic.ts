/**
 * 幻境武器（Relic）—— 超长线「至尊目标」
 *
 * 设计依据（`10-design-blueprint.md` §7 的 MVP 六件事，第 6 项）：
 *   「超长线至尊目标（Relic 式，**串起全部离线产线**）、给长线玩家一个"继续玩"的理由」
 *
 * 官方原型：FF14 每个资料片都有一条跨越多个补丁的**幻境武器**升级长链
 * （多阶段、要交海量材料、跨各种内容，见 `06-side-content-pvp.md` §7.3 C8）。
 * 06 号文档把它评为「**超长线目标，必抄**」，并建议采纳官方"跨角色共享进度"的做法。
 *
 * 本作的落地方式：**每一阶都要求"去玩一个不同的系统"**——
 * 副本、讨伐、破魔试炼、每日轮盘、整章通关。
 * 这样它就不是一条孤立的刷子，而是把全部已有玩法串成一条主线目标。
 *
 * ⚠️ 武器名称与数值均为本项目自研，不使用官方 Relic 名称（见 07 的合规要求）。
 */
import type { Quality } from '../types';

export type RelicMetric = 'clears' | 'bosses' | 'trialScore' | 'roulette' | 'chapterClear';

export interface RelicStageDef {
  /** 第几阶（1 起） */
  stage: number;
  name: string;
  /** 需要达成的累计指标 */
  metric: RelicMetric;
  need: number;
  label: string;
  gold: number;
  itemLevel: number;
  quality: Quality;
  /** 该阶武器的效果说明（展示用） */
  effect: string;
}

/** 五阶长链：越往后越要求"跨系统" */
export const RELIC_STAGES: RelicStageDef[] = [
  {
    stage: 1,
    name: '觉醒',
    metric: 'clears',
    need: 5,
    label: '通关副本',
    gold: 300,
    itemLevel: 60,
    quality: 'rare',
    effect: '装等 60 的成长武器',
  },
  {
    stage: 2,
    name: '铭刻',
    metric: 'bosses',
    need: 6,
    label: '击败守关者',
    gold: 800,
    itemLevel: 100,
    quality: 'rare',
    effect: '装等 100 的成长武器',
  },
  {
    stage: 3,
    name: '共鸣',
    metric: 'trialScore',
    need: 700,
    label: '破魔试炼单局得分达到',
    gold: 1500,
    itemLevel: 150,
    quality: 'epic',
    effect: '装等 150 的成长武器',
  },
  {
    stage: 4,
    name: '淬炼',
    metric: 'roulette',
    need: 3,
    label: '完成每日任务轮盘',
    gold: 3000,
    itemLevel: 200,
    quality: 'epic',
    effect: '装等 200 的成长武器',
  },
  {
    stage: 5,
    name: '终焉',
    metric: 'chapterClear',
    need: 0, // 动态 = 当前章节副本总数
    label: '通关本章全部副本',
    gold: 6000,
    itemLevel: 280,
    quality: 'legendary',
    effect: '装等 280 的至尊武器，并为全队提供永久加成',
  },
];

/** 幻境武器名称（通用构词，非官方名称） */
const STAGE_SUFFIX = ['一阶', '二阶', '三阶', '四阶', '终阶'];

export function relicItemName(jobName: string, stage: number): string {
  return `幻境兵装·${jobName}${STAGE_SUFFIX[stage - 1] ?? ''}`;
}

export function stageByNumber(stage: number): RelicStageDef | undefined {
  return RELIC_STAGES.find((s) => s.stage === stage);
}

/** 终阶额外奖励：全队永久加成（呼应"至尊目标"的分量） */
export const RELIC_FINAL_BONUS = { potencyMult: 0.05, hpMult: 0.05 };
