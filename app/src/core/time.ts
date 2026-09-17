/**
 * 时钟抽象与「周期键」
 *
 * 依据蓝图 §4.4（周期节奏设计）：
 *  - ⚠️ **不要抄 FF14 的每日 23:00（北京）重置** —— 对上班族极不友好
 *    这里改为本地 **04:00**（主流手游惯例，睡前做的任务仍算"今天"）
 *  - 每周重置同理，且建议比 MMO 的一周更短；本作先保持 7 天，键按「本地周一 04:00」切分
 *
 * Clock 做成可注入接口，是为了让「每日/每周重置」这类时间相关逻辑可被自动化测试。
 */

export interface Clock {
  now(): number;
}

export const systemClock: Clock = { now: () => Date.now() };

/** 每日重置小时（本地时间） */
export const DAILY_RESET_HOUR = 4;

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

/** 把时间戳「偏移」到重置基准上，便于切分周期 */
function shifted(ts: number, resetHour: number): Date {
  const d = new Date(ts);
  d.setHours(d.getHours() - resetHour);
  return d;
}

/** 每日键，如 `2026-09-15`（以本地 04:00 为界） */
export function dayKey(ts: number, resetHour = DAILY_RESET_HOUR): string {
  const d = shifted(ts, resetHour);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** 每周键：取该周「周一」的日期，如 `2026-W38@2026-09-14` */
export function weekKey(ts: number, resetHour = DAILY_RESET_HOUR): string {
  const d = shifted(ts, resetHour);
  const dow = (d.getDay() + 6) % 7; // 周一 = 0
  d.setDate(d.getDate() - dow);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** 距离下一次每日重置还有多少毫秒（用于 UI 显示） */
export function msUntilDailyReset(ts: number, resetHour = DAILY_RESET_HOUR): number {
  const d = new Date(ts);
  const next = new Date(d);
  next.setHours(resetHour, 0, 0, 0);
  if (next.getTime() <= d.getTime()) next.setDate(next.getDate() + 1);
  return next.getTime() - d.getTime();
}

/**
 * 距离下一次每周重置还有多少毫秒（下一个「本地周一 04:00」）。
 *
 * ⚠️ 曾经的 bug：在偏移坐标系里直接 +7 天，导致时分被带过去（少算/多算一天）。
 * 正确做法是把时间归零到该周周一 00:00，再 +7 天，最后换算回真实时间。
 */
export function msUntilWeeklyReset(ts: number, resetHour = DAILY_RESET_HOUR): number {
  const s = shifted(ts, resetHour); // 把 04:00 视作一天的开始
  const dow = (s.getDay() + 6) % 7; // 周一 = 0
  s.setDate(s.getDate() - dow); // 本周期起点（偏移坐标系）
  s.setHours(0, 0, 0, 0); // ← 关键：归零，避免把当前时分带进下一周
  s.setDate(s.getDate() + 7); // 下一周期起点
  s.setHours(s.getHours() + resetHour); // 换算回真实时间
  return s.getTime() - ts;
}

export function fmtDuration(ms: number): string {
  const totalMin = Math.floor(ms / 60000);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return h > 0 ? `${h} 小时 ${m} 分` : `${m} 分`;
}
