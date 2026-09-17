/**
 * 等级与章节规则
 * 依据蓝图 §4.1：每章 +10 级（ARR 为 15–50 的加长引导章）
 */

/** 每章等级区间（下标 1 起） */
export const CHAPTER_LEVEL_RANGE: Record<number, { min: number; max: number; name: string }> = {
  1: { min: 15, max: 50, name: '新生艾欧泽亚' },
  2: { min: 51, max: 60, name: '苍天之龙骑士' },
  3: { min: 61, max: 70, name: '红莲之狂潮' },
  4: { min: 71, max: 80, name: '漆黑之反叛者' },
  5: { min: 81, max: 90, name: '晓月之终途' },
  6: { min: 91, max: 100, name: '黄金之遗产' },
};

/** 当前章节的等级上限 */
export function levelCapFor(chapter: number): number {
  return (CHAPTER_LEVEL_RANGE[chapter] ?? CHAPTER_LEVEL_RANGE[6]!).max;
}

/** 升级所需经验（线性偏指数，配合线性 iLvl 曲线） */
export function expToNext(level: number): number {
  return Math.round(60 * Math.pow(level, 1.55));
}

/** 初始队伍等级：定在第一章下限，保证第一个副本立刻可打 */
export const START_LEVEL = CHAPTER_LEVEL_RANGE[1]!.min;
