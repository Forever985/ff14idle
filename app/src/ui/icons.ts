/**
 * 图标系统 —— 全部为**手写内联 SVG**
 *
 * 为什么不引第三方图标库：
 *  1. `docs/07-data-sources-licensing.md` 的法务要求——不能引入来源不清的素材；
 *  2. 体积：整套图标进包只有几 KB，且随 `currentColor` 自动适配主题色；
 *  3. 风格统一：线性造型（stroke 1.8、圆角端点），和 Melvor / 银河奶牛那类界面观感一致。
 *
 * 用法：`${icon('dispatch')}` 或 `${icon('role.tank', 18)}`
 */
import type { JobRole, Slot } from '../types';

/** 统一画布 24×24，线性造型 */
const P = {
  // ---- 导航 ----
  dispatch: '<path d="M3 12 21 4l-8 17-2.5-7.5z"/><path d="M10.5 13.5 21 4"/>',
  trial: '<rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="9" cy="9" r="1.1" fill="currentColor" stroke="none"/><circle cx="15" cy="15" r="1.1" fill="currentColor" stroke="none"/><circle cx="15" cy="9" r="1.1" fill="currentColor" stroke="none"/><circle cx="9" cy="15" r="1.1" fill="currentColor" stroke="none"/>',
  tower: '<path d="M9 21V8h6v13"/><path d="M7 8h10"/><path d="M8 5h2.5M13.5 5H16"/><path d="M6 21h12"/><path d="M11 21v-4h2v4"/>',
  party: '<circle cx="9" cy="8" r="3"/><path d="M3.5 20c0-3 2.5-5 5.5-5s5.5 2 5.5 5"/><circle cx="17" cy="9.5" r="2.3"/><path d="M15 20c0-2.3 1-3.9 2.5-4.4"/>',
  inventory: '<path d="M4 8h16l-1.2 11.2A2 2 0 0 1 16.8 21H7.2a2 2 0 0 1-2-1.8z"/><path d="M8.5 8V6a3.5 3.5 0 0 1 7 0v2"/>',
  cadence: '<rect x="3.5" y="5.5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17"/><path d="M8 3.5v4M16 3.5v4"/><circle cx="12" cy="14.5" r="1.2" fill="currentColor" stroke="none"/>',
  relic: '<path d="M12 3.5 14 9l5.5 2-5.5 2-2 5.5-2-5.5L4.5 11 10 9z"/>',
  facility: '<path d="M3.5 11 12 4l8.5 7"/><path d="M6 10.5V20h12v-9.5"/><path d="M10 20v-5h4v5"/>',
  report: '<path d="M6 3.5h9l4 4V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z"/><path d="M15 3.5V8h4"/><path d="M8 12h8M8 16h5"/>',

  // ---- 职能 ----
  'role.tank': '<path d="M12 3.5 19 6v6c0 4.2-3 7.6-7 9-4-1.4-7-4.8-7-9V6z"/><path d="M12 9v5"/><path d="M9.5 11.5h5"/>',
  'role.healer': '<circle cx="12" cy="12" r="8"/><path d="M12 8.2v7.6M8.2 12h7.6"/>',
  'role.dps': '<path d="M18.5 4.5 21 7l-9.5 9.5H8v-3.5z"/><path d="M6.5 17.5 4 20"/><path d="M5 15.5h3.5"/>',

  // ---- 装备部位 ----
  'slot.weapon': '<path d="M18.5 4.5 21 7l-8 8-3-3z"/><path d="M10 12l-5 5 2 2 5-5"/><path d="M6.5 17.5 4 20"/>',
  'slot.head': '<path d="M5 13a7 7 0 0 1 14 0v3a2 2 0 0 1-2 2h-2l-1-2h-4l-1 2H7a2 2 0 0 1-2-2z"/>',
  'slot.body': '<path d="M9 4h6l3.5 3.5V20h-13V7.5z"/><path d="M9 4v4h6V4"/>',
  'slot.hands': '<path d="M7 20v-7a2 2 0 0 1 2-2h1V6.5a1.5 1.5 0 0 1 3 0V11h1a2 2 0 0 1 2 2v7z"/><path d="M7 16h10"/>',
  'slot.legs': '<path d="M8 4h8v8l-1.5 8h-2L12 13l-.5 7h-2L8 12z"/>',
  'slot.feet': '<path d="M8 4v8H6.5A2.5 2.5 0 0 0 4 14.5V19h5l1-3h3a3 3 0 0 0 3-3V4z"/><path d="M4 19h7"/>',
  'slot.ears': '<circle cx="9" cy="9" r="3"/><path d="M9 6v3"/><circle cx="16" cy="15" r="2.2"/>',
  'slot.neck': '<path d="M4 8a8 8 0 0 0 16 0"/><path d="M12 16v2"/><circle cx="12" cy="20" r="1.6"/>',
  'slot.wrist': '<path d="M4 12a8 4 0 0 0 16 0"/><path d="M4 12a8 4 0 0 1 16 0"/>',
  'slot.ring': '<circle cx="12" cy="14.5" r="5"/><path d="M9.5 9.5 12 5l2.5 4.5z"/>',

  // ---- 资源与状态 ----
  gold: '<circle cx="12" cy="12" r="8"/><path d="M12 8v8M9.5 10h5M9.5 14h5"/>',
  box: '<path d="M3.5 8.5 12 5l8.5 3.5v7L12 19l-8.5-3.5z"/><path d="M3.5 8.5 12 12l8.5-3.5M12 12v7"/>',
  memory: '<path d="M12 3.5a8.5 8.5 0 1 0 8.5 8.5"/><path d="M12 7a5 5 0 1 0 5 5"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/>',
  level: '<path d="M12 20V5"/><path d="M6.5 10.5 12 5l5.5 5.5"/>',
  exp: '<path d="M12 4v4M12 16v4M4 12h4M16 12h4"/><path d="M7 7l2.8 2.8M14.2 14.2 17 17M17 7l-2.8 2.8M9.8 14.2 7 17"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  lock: '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/>',
  check: '<path d="M5 12.5 10 17.5 19 7"/>',
  store: '<rect x="3.5" y="4.5" width="17" height="4" rx="1.5"/><path d="M5 8.5V19a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8.5"/><path d="M10 12.5h4"/>',
  anvil: '<path d="M4 9h11l3-2v5l-3-1H9"/><path d="M9 9v4l-2 3h9l-2-3"/><path d="M6 20h12"/>',

  // ---- 试炼 / 无尽塔节点 ----
  'node.battle': '<path d="M6 5l13 13M18 5 5 18"/><path d="M4 20l3-1 1-3-3 1z"/><path d="M20 20l-3-1-1-3 3 1z"/>',
  'node.elite': '<path d="M12 3.5c4 0 7 3 7 6.5 0 3-2 5-4 6l-1 4.5h-4L9 16c-2-1-4-3-4-6 0-3.5 3-6.5 7-6.5z"/><circle cx="9.5" cy="10" r="1.4" fill="currentColor" stroke="none"/><circle cx="14.5" cy="10" r="1.4" fill="currentColor" stroke="none"/>',
  'node.camp': '<path d="M12 3.5c1.5 3 4.5 4.5 4.5 8a4.5 4.5 0 0 1-9 0c0-3.5 3-5 4.5-8z"/><path d="M6 20.5h12"/>',
  'node.treasure': '<rect x="4" y="9" width="16" height="11" rx="2"/><path d="M4 13h16M12 9v11"/><path d="M12 9c-1.5 0-3-1-3-2.5S10 4 12 4s3 1 3 2.5S13.5 9 12 9z"/>',
  'node.boss': '<path d="M4 18 6 8l4 3 2-5 2 5 4-3 2 10z"/><path d="M4 18h16"/>',

  // ---- 职业徽记（8 个首批职业各一个；小尺寸下靠剪影区分） ----
  'job.WAR': '<path d="M6 21 14.5 12.5"/><path d="M13 5.5 19.5 12l-5.5 1.5L12 11z"/><path d="M4.5 17.5 7 20"/>',
  'job.WHM': '<path d="M12 21V7"/><circle cx="12" cy="5" r="2.6"/><path d="M8.8 11h6.4"/>',
  'job.BLM': '<path d="M12 4 17.5 17H6.5z"/><path d="M3.5 17.5h17"/><path d="M12 4V2.2"/>',
  'job.MCH': '<path d="M3.5 10.5h10.5l3 3h3.5"/><path d="M7 13.5V19h3.5v-5.5"/><path d="M4.5 10.5v3"/>',
  'job.SMN': '<path d="M4 6.5h7.5V19H4z"/><path d="M20 6.5h-7.5V19H20z"/><path d="M12 6.5V19"/>',
  'job.RDM': '<path d="M20 4 9.5 14.5"/><path d="M7 13l4 4"/><path d="M4.5 20.5 7 18l-1-1z"/>',
  'job.SGE': '<path d="M12 2.5 14 5l-2 2.5L10 5z"/><path d="M12 16.5 14 19l-2 2.5L10 19z"/><path d="M2.5 12 5 10l2.5 2L5 14z"/><path d="M16.5 12 19 10l2.5 2L19 14z"/><circle cx="12" cy="12" r="1.6"/>',
  'job.BST': '<ellipse cx="12" cy="15.5" rx="4" ry="3.2"/><circle cx="6.5" cy="9.5" r="1.8"/><circle cx="10.5" cy="6.8" r="1.8"/><circle cx="14.5" cy="6.8" r="1.8"/><circle cx="18" cy="10" r="1.8"/>',
} as const;

export type IconName = keyof typeof P;

/** 生成一个内联 SVG 图标 */
export function icon(name: IconName, size = 18): string {
  const body = P[name] ?? '';
  return (
    `<svg class="ico" viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true" ` +
    `fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">` +
    `${body}</svg>`
  );
}

/** 职能 → 图标名 */
export function roleIconName(role: JobRole): IconName {
  return role === 'tank' ? 'role.tank' : role === 'healer' ? 'role.healer' : 'role.dps';
}

/** 职业 → 徽记图标名（未收录的职业回退到职能图标） */
export function jobIconName(job: string, role: JobRole): IconName {
  const key = `job.${job}` as IconName;
  return key in P ? key : roleIconName(role);
}

/** 装备部位 → 图标名（两个戒指共用） */
export function slotIconName(slot: Slot): IconName {
  const key = slot === 'ring2' ? 'ring1' : slot;
  return (`slot.${key}` as IconName);
}

/** 试炼/塔节点类型 → 图标名 */
export function nodeIconName(kind: string): IconName {
  const map: Record<string, IconName> = {
    battle: 'node.battle',
    elite: 'node.elite',
    camp: 'node.camp',
    treasure: 'node.treasure',
    boss: 'node.boss',
  };
  return map[kind] ?? 'node.battle';
}

/** 品质 → 颜色变量名（与 styles.css 的 --q-* 对应） */
export function qualityVar(quality: string): string {
  return `var(--q-${quality})`;
}
