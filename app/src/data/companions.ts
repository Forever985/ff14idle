/**
 * 名角（剧情 NPC）—— 「奖励人物」
 *
 * 定位（和用户确认过的设计）：
 *   名角**不带任何专属机制、也不带数值特权**，就是"一个有名字、职业固定、免费到手的人"。
 *   它解决的是"我缺一个治疗"和"这人是故事里的人"这两件事，而不是"拿到他就变强"。
 *   好处是不出现"你喜欢的角色是废物"，也不会因为角色强度把战斗内核搅乱。
 *   真正有稀有度差异的是酒馆佣兵（见 data/hires.ts）。
 *
 * 获取方式：主线章节 + 关键里程碑。里程碑刻意挂在**已有的系统**上
 *   （无尽塔层数 / 破魔试炼分数 / 幻境武器终阶 / 工房等级 / 通关总数），
 *   这样"多玩一个系统"就有人物奖励，而不是逼你再刷一遍主线。
 *
 * 职业映射说明：本作首批只有 8 个职业（蓝图 §2 决策二），所以少数角色的原职
 *   只能退化到最接近的一个，例如龙骑士/占星术士暂由 MCH / WHM 承载。
 *   名称仅为设定借用，本项目不使用任何官方素材与文本。
 */
import type { CompanionDef } from '../types';

/** 章节门槛的简写 */
const ch = (chapter: number): CompanionDef['unlock'] => ({ kind: 'chapter', chapter });

export const COMPANIONS: CompanionDef[] = [
  // ---- 第一梯队：拂晓血盟（第 1 章起手就有，保住"你就是拂晓的一员"这个叙事底子）----
  { id: 'thancred', name: '桑克雷德', nameEn: 'Thancred', job: 'WAR', race: 'hyur',
    title: '拂晓血盟 · 前锋', unlock: ch(1) },
  { id: 'yshtola', name: '雅·修特拉', nameEn: "Y'shtola", job: 'WHM', race: 'miqote',
    title: '拂晓血盟 · 贤者之眼', unlock: ch(1) },
  { id: 'alisaie', name: '阿莉塞', nameEn: 'Alisaie', job: 'RDM', race: 'elezen',
    title: '拂晓血盟 · 红之双子', unlock: ch(1) },
  { id: 'alphinaud', name: '阿尔菲诺', nameEn: 'Alphinaud', job: 'SGE', race: 'elezen',
    title: '拂晓血盟 · 蓝之双子', unlock: ch(1) },
  { id: 'grahatia', name: '古·拉哈·提亚', nameEn: "G'raha Tia", job: 'BLM', race: 'miqote',
    title: '拂晓血盟 · 水晶之瞳', unlock: ch(1) },
  { id: 'wol', name: '光之战士', nameEn: 'Warrior of Light', job: 'BST', race: 'hyur',
    title: '你自己', unlock: ch(1) },

  // ---- 主线继续推进 ----
  { id: 'estinien', name: '埃斯蒂尼安', nameEn: 'Estinien', job: 'MCH', race: 'elezen',
    title: '苍天之龙骑士', unlock: ch(2) },
  { id: 'krile', name: '可露儿', nameEn: 'Krile', job: 'SMN', race: 'lalafell',
    title: '拂晓血盟 · 传承者', unlock: ch(2) },
  { id: 'urianger', name: '于里昂热', nameEn: 'Urianger', job: 'WHM', race: 'elezen',
    title: '拂晓血盟 · 预言者', unlock: ch(3) },
  { id: 'lyse', name: '莉瑟', nameEn: 'Lyse', job: 'WAR', race: 'hyur',
    title: '阿拉米格 · 解放者', unlock: ch(3) },
  { id: 'aymeric', name: '艾默里克', nameEn: 'Aymeric', job: 'WAR', race: 'elezen',
    title: '伊修加德 · 上议院议长', unlock: ch(4) },
  { id: 'raubahn', name: '劳班', nameEn: 'Raubahn', job: 'WAR', race: 'roegadyn',
    title: '恒辉队 · 总帅', unlock: ch(5) },

  // ---- 里程碑：每一个都要求你去玩一个不同的系统 ----
  { id: 'cid', name: '西德', nameEn: 'Cid', job: 'MCH', race: 'hyur',
    title: '加雷马 · 天才技师', unlock: { kind: 'facilityLevel', level: 3 } },
  { id: 'minfilia', name: '敏菲利亚', nameEn: 'Minfilia', job: 'WHM', race: 'hyur',
    title: '拂晓血盟 · 盟主', unlock: { kind: 'trialScore', score: 60 } },
  { id: 'hoary', name: '冰雪的骑士', nameEn: 'Hoary Boulder', job: 'SGE', race: 'roegadyn',
    title: '拂晓血盟 · 守护者', unlock: { kind: 'towerFloor', floor: 20 } },
  { id: 'tataru', name: '塔塔露', nameEn: 'Tataru', job: 'BST', race: 'lalafell',
    title: '拂晓血盟 · 账房', unlock: { kind: 'clearedCount', count: 20 } },
  { id: 'fordola', name: '芙朵拉', nameEn: 'Fordola', job: 'RDM', race: 'hyur',
    title: '阿拉米格 · 前帝国军', unlock: { kind: 'towerFloor', floor: 40 } },
  { id: 'gaia', name: '盖娅', nameEn: 'Gaia', job: 'BLM', race: 'hyur',
    title: '暗之战士 · 影子', unlock: { kind: 'relicFinal' } },
];

export const COMPANION_BY_ID: Record<string, CompanionDef> = Object.fromEntries(
  COMPANIONS.map((c) => [c.id, c]),
);

/** 起手就有的名角（新档初始化用） */
export function startingCompanions(): CompanionDef[] {
  return COMPANIONS.filter((c) => c.unlock.kind === 'chapter' && c.unlock.chapter <= 1);
}
