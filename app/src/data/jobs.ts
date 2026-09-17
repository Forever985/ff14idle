/**
 * 职业数据 —— 首批 8 个职业
 *
 * 选型依据：`01-jobs.md` §12.2「全职业机制放置化难度总评」，
 * 第一梯队 = 单/双整数资源池 + 固定循环 + 无团辅或团辅极轻：
 *   WAR / WHM / BLM / MCH / SMN / RDM / SGE / BST
 *
 * 数值设计依据：`02-combat-math.md` 第 9 章的三层抽象
 *   （单次命中 → PPS → 爆发窗口倍率），
 * 以及「爆发窗口倍率」的量化解（团辅/爆发对齐的价值量级）。
 *
 * ⚠️ 所有数值均为本项目自研，不复制官方数据（见 07 §3、§6 的法律要求）。
 */
import type { JobDef, JobId } from '../types';

/** 一次 GCD 的基准秒数（蓝图 M12：可直接沿用 2.5s） */
export const GCD_SEC = 2.5;

export const JOBS: Record<JobId, JobDef> = {
  WAR: {
    id: 'WAR',
    name: '战士',
    nameEn: 'Warrior',
    role: 'tank',
    weapon: '战斧',
    gauge: '兽魂 0–100，攒满后开启原初的解放（固定 CD 爆发）',
    base: { hp: 1200, potency: 200, healPotency: 0, mitigation: 0.28 },
    resource: { name: '兽魂', max: 100, gainPerSec: 7 },
    burst: { name: '原初的解放', cost: 100, bonus: 0.35, durationSec: 12, cooldownSec: 60 },
  },
  WHM: {
    id: 'WHM',
    name: '白魔法师',
    nameEn: 'White Mage',
    role: 'healer',
    weapon: '幻杖',
    gauge: '百合 0–3 层自动累积，消耗后转为血百合爆发',
    base: { hp: 800, potency: 110, healPotency: 340, mitigation: 0 },
    resource: { name: '百合', max: 3, gainPerSec: 0.1 },
    burst: { name: '血百合', cost: 3, bonus: 0.5, durationSec: 10, cooldownSec: 45 },
  },
  BLM: {
    id: 'BLM',
    name: '黑魔法师',
    nameEn: 'Black Mage',
    role: 'dps',
    weapon: '咒杖',
    gauge: '星极火 / 灵极冰 三态循环 + 悖论（状态机型）',
    base: { hp: 700, potency: 330, healPotency: 0, mitigation: 0 },
    resource: { name: '悖论', max: 100, gainPerSec: 8.5 },
    burst: { name: '魔纹展开', cost: 100, bonus: 0.4, durationSec: 15, cooldownSec: 70 },
  },
  MCH: {
    id: 'MCH',
    name: '机工士',
    nameEn: 'Machinist',
    role: 'dps',
    weapon: '火枪',
    gauge: '热量 0–100 / 电量 0–100 双整数池',
    base: { hp: 720, potency: 300, healPotency: 0, mitigation: 0 },
    resource: { name: '热量', max: 100, gainPerSec: 9 },
    burst: { name: '野火', cost: 100, bonus: 0.45, durationSec: 10, cooldownSec: 60 },
  },
  SMN: {
    id: 'SMN',
    name: '召唤师',
    nameEn: 'Summoner',
    role: 'dps',
    weapon: '魔导书',
    gauge: '召唤兽轮换（6.0 重做后极其规律）',
    base: { hp: 760, potency: 315, healPotency: 0, mitigation: 0 },
    resource: { name: '以太超流', max: 100, gainPerSec: 8 },
    burst: { name: '不死鸟之炎', cost: 100, bonus: 0.42, durationSec: 14, cooldownSec: 65 },
  },
  RDM: {
    id: 'RDM',
    name: '赤魔道士',
    nameEn: 'Red Mage',
    role: 'dps',
    weapon: '刺剑',
    gauge: '黑魔力 / 白魔力双色能量，平衡后进入近战连',
    base: { hp: 740, potency: 295, healPotency: 60, mitigation: 0 },
    resource: { name: '魔力平衡', max: 100, gainPerSec: 9.5 },
    burst: { name: '决断', cost: 100, bonus: 0.4, durationSec: 12, cooldownSec: 55 },
  },
  SGE: {
    id: 'SGE',
    name: '贤者',
    nameEn: 'Sage',
    role: 'healer',
    weapon: '贤具',
    gauge: '蛇刺 0–3 层 + 尤卡西斯状态（护盾型治疗）',
    base: { hp: 820, potency: 130, healPotency: 300, mitigation: 0.08 },
    resource: { name: '蛇刺', max: 3, gainPerSec: 0.12 },
    burst: { name: '潘克拉斯', cost: 3, bonus: 0.45, durationSec: 12, cooldownSec: 50 },
  },
  BST: {
    id: 'BST',
    name: '驯兽师',
    nameEn: 'Beastmaster',
    role: 'dps',
    weapon: '手斧',
    gauge: 'TP ≥ 100 释放本能技能；幻兽（受限职业，官方 7.56 新增）',
    base: { hp: 780, potency: 310, healPotency: 0, mitigation: 0.05 },
    resource: { name: 'TP', max: 100, gainPerSec: 10 },
    burst: { name: '本能连携', cost: 100, bonus: 0.48, durationSec: 12, cooldownSec: 55 },
  },
};

/** 职业显示顺序（坦克 → 治疗 → 输出） */
export const JOB_ORDER: JobId[] = ['WAR', 'WHM', 'SGE', 'BLM', 'MCH', 'SMN', 'RDM', 'BST'];

export const ROLE_LABEL: Record<JobDef['role'], string> = {
  tank: '坦克',
  healer: '治疗',
  dps: '输出',
};
