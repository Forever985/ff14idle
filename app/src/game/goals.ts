/** 全局目标与规则常量 */
export const GOALS = {
  /** 当前支持的最大章节 */
  maxChapter: 6,
  /** 小队人数（轻锐小队 4 人，对应 FF14 的 4 人副本） */
  partySize: 4,
  /** 保留的历史派遣条数（防止存档膨胀） */
  keepExpeditions: 20,
} as const;
