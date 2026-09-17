/**
 * 天书奇谭（Wondrous Tails）—— 每周 9 格任务表
 *
 * 官方原型：每周一本 9 格（3×3）贴纸册，完成内容得贴纸，凑成一行/一列/对角线可兑奖。
 * 依据 `06-side-content-pvp.md` §7.2 的评价：「**最佳周常模板**：随机 9 格 + 连线成行的
 * 『再抽一次』快感，放置游戏必抄」。
 *
 * 本作实现：9 个固定任务（覆盖不同行为，保证各玩法都有理由点一次），
 * 完成后盖章；任意一条线（3 横 + 3 竖 + 2 斜）集满即可领奖。
 */

export type TailMetric =
  | 'clears'
  | 'dispatches'
  | 'roulette'
  | 'bossKills'
  | 'lootGained'
  | 'goldEarned';

export interface TailTask {
  id: string;
  label: string;
  metric: TailMetric;
  need: number;
}

/** 3×3 排布：下标 0..8 即格子位置（行优先） */
export const TAIL_TASKS: TailTask[] = [
  { id: 'clear1', label: '通关任意副本 1 次', metric: 'clears', need: 1 },
  { id: 'dispatch5', label: '派遣小队 5 次', metric: 'dispatches', need: 5 },
  { id: 'boss2', label: '击败 2 名守关者', metric: 'bossKills', need: 2 },
  { id: 'roulette1', label: '完成一次每日轮盘', metric: 'roulette', need: 1 },
  { id: 'clear3', label: '通关任意副本 3 次', metric: 'clears', need: 3 },
  { id: 'loot5', label: '获得 5 件战利品', metric: 'lootGained', need: 5 },
  { id: 'gold800', label: '累计获得 800 金币', metric: 'goldEarned', need: 800 },
  { id: 'dispatch12', label: '派遣小队 12 次', metric: 'dispatches', need: 12 },
  { id: 'clear6', label: '通关任意副本 6 次', metric: 'clears', need: 6 },
];

/** 8 条连线（3 横 + 3 竖 + 2 斜），每条 3 个格子下标 */
export const TAIL_LINES: { id: string; label: string; cells: number[] }[] = [
  { id: 'r0', label: '第一行', cells: [0, 1, 2] },
  { id: 'r1', label: '第二行', cells: [3, 4, 5] },
  { id: 'r2', label: '第三行', cells: [6, 7, 8] },
  { id: 'c0', label: '第一列', cells: [0, 3, 6] },
  { id: 'c1', label: '第二列', cells: [1, 4, 7] },
  { id: 'c2', label: '第三列', cells: [2, 5, 8] },
  { id: 'd0', label: '主对角', cells: [0, 4, 8] },
  { id: 'd1', label: '副对角', cells: [2, 4, 6] },
];

/** 「本周任务进度」的初始值 */
export function emptyTailCounters(): Record<TailMetric, number> {
  return {
    clears: 0,
    dispatches: 0,
    roulette: 0,
    bossKills: 0,
    lootGained: 0,
    goldEarned: 0,
  };
}

/** 根据计数器算出已盖章的格子 */
export function stickeredCells(counters: Record<TailMetric, number>): number[] {
  const out: number[] = [];
  TAIL_TASKS.forEach((t, i) => {
    if ((counters[t.metric] ?? 0) >= t.need) out.push(i);
  });
  return out;
}

/** 已集满、可领取的连线 */
export function claimableLines(stickered: number[], claimed: string[]): string[] {
  return TAIL_LINES.filter(
    (l) => !claimed.includes(l.id) && l.cells.every((c) => stickered.includes(c)),
  ).map((l) => l.id);
}
