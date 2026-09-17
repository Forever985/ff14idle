/**
 * 拂晓血盟伙伴 —— 蓝图 §2 决策一「光之战士 + 拂晓血盟」的落地
 *
 * 为什么不是 wow-idle 的「招募无名冒险者」：
 * FF14 的正统叙事里，你就是唯一的英雄，随你下副本的是拂晓血盟成员。
 * 官方 Duty Support / Trust 系统已经给了「NPC 队友参战」的合法性，
 * 所以「编队」这个概念在 FF14 里不需要发明。
 *
 * 职业分配参考各角色的官方设定（MVP 阶段优先使用第一批次职业）。
 * 名称仅为设定借用，本项目不使用任何官方素材与文本。
 */
import type { CompanionDef } from '../types';

export const COMPANIONS: CompanionDef[] = [
  {
    id: 'thancred',
    name: '桑克雷德',
    nameEn: 'Thancred',
    job: 'WAR',
    title: '拂晓血盟 · 前锋',
    unlockChapter: 1,
  },
  {
    id: 'yshtola',
    name: '雅·修特拉',
    nameEn: "Y'shtola",
    job: 'WHM',
    title: '拂晓血盟 · 贤者之眼',
    unlockChapter: 1,
  },
  {
    id: 'alisaie',
    name: '阿莉塞',
    nameEn: 'Alisaie',
    job: 'RDM',
    title: '拂晓血盟 · 红之双子',
    unlockChapter: 1,
  },
  {
    id: 'alphinaud',
    name: '阿尔菲诺',
    nameEn: 'Alphinaud',
    job: 'SGE',
    title: '拂晓血盟 · 蓝之双子',
    unlockChapter: 1,
  },
  {
    id: 'grahatia',
    name: '古·拉哈·提亚',
    nameEn: "G'raha Tia",
    job: 'BLM',
    title: '拂晓血盟 · 水晶之瞳',
    unlockChapter: 1,
  },
  {
    id: 'estinien',
    name: '埃斯蒂尼安',
    nameEn: 'Estinien',
    job: 'MCH',
    title: '苍天之龙骑士',
    unlockChapter: 2,
  },
  {
    id: 'krile',
    name: '可露儿',
    nameEn: 'Krile',
    job: 'SMN',
    title: '拂晓血盟 · 传承者',
    unlockChapter: 2,
  },
  {
    id: 'wol',
    name: '光之战士',
    nameEn: 'Warrior of Light',
    job: 'BST',
    title: '你自己',
    unlockChapter: 1,
  },
];

export const COMPANION_BY_ID: Record<string, CompanionDef> = Object.fromEntries(
  COMPANIONS.map((c) => [c.id, c]),
);
