/**
 * 工房运转逻辑
 *
 * 核心是一个**按真实时间计算的产线**，但有两个刻意的约束（见 data/facility.ts 的说明）：
 *   ① 硬性储存上限：超过就不再累积
 *   ② 连续收获加成 Groove：按时回来收有加成，溢出则归零
 *
 * 实现要点：不做「每秒累加」，而是每次按 `now - since` 一次性算出来。
 * 这样上限才是**对总量**生效的——若按每秒累加，上限形同虚设。
 */
import { makeRng } from '../core/rng';
import {
  GROOVE_MAX,
  GROOVE_STEP,
  MAX_FACILITY_LEVEL,
  boxItemLevel,
  levelDef,
  projectById,
  type ProjectId,
} from '../data/facility';
import { rollItem, rollQuality } from '../data/items';
import type { FacilityState, GameState, ItemDef, Slot } from '../types';

export function defaultFacility(now: number): FacilityState {
  return {
    level: 1,
    slots: [null],
    banked: { gold: 0, boxes: 0 },
    since: now,
    boxes: 0,
    groove: 0,
    collections: 0,
    overflowed: false,
  };
}

export function ensureFacility(state: GameState, now: number): FacilityState {
  if (!state.facility) state.facility = defaultFacility(now);
  const f = state.facility;
  // 槽位数量必须与等级匹配（迁移/升级后可能出现长度不符）
  const need = levelDef(f.level).slots;
  while (f.slots.length < need) f.slots.push(null);
  if (f.slots.length > need) f.slots = f.slots.slice(0, need);
  return f;
}

export interface FacilityInfo {
  level: number;
  maxLevel: boolean;
  slots: (ProjectId | null)[];
  capHours: number;
  /** 已积累时长（小时，含上限截断） */
  elapsedHours: number;
  /** 距离储存上限还有多少小时（0 = 已溢出） */
  hoursToCap: number;
  saturated: boolean;
  groove: number;
  /** 当前可领取的产出 */
  pendingGold: number;
  pendingBoxes: number;
  /** 含库存的总箱数 */
  boxes: number;
  upgradeCost: number | null;
}

const SEC = 1000;
const HOUR = 3600 * SEC;

/** 计算当前可领取产出（不修改状态） */
export function facilityInfo(state: GameState, now: number): FacilityInfo {
  const f = ensureFacility(state, now);
  const def = levelDef(f.level);
  const capMs = def.capHours * HOUR;
  const rawElapsed = Math.max(0, now - f.since);
  const effectiveMs = Math.min(rawElapsed, capMs);
  const saturated = rawElapsed >= capMs;
  const mult = 1 + f.groove;
  const hours = effectiveMs / HOUR;

  let gold = f.banked.gold;
  let boxes = f.banked.boxes;
  for (const slot of f.slots) {
    if (!slot) continue;
    const p = projectById(slot as ProjectId);
    if (!p) continue;
    gold += p.goldPerHour * hours * mult;
    boxes += p.boxesPerHour * hours * mult;
  }

  return {
    level: f.level,
    maxLevel: f.level >= MAX_FACILITY_LEVEL,
    slots: f.slots.map((s) => (s as ProjectId | null) ?? null),
    capHours: def.capHours,
    elapsedHours: effectiveMs / HOUR,
    hoursToCap: Math.max(0, (capMs - rawElapsed) / HOUR),
    saturated,
    groove: f.groove,
    pendingGold: Math.floor(gold),
    pendingBoxes: Math.floor(boxes),
    boxes: f.boxes + Math.floor(boxes),
    upgradeCost: f.level >= MAX_FACILITY_LEVEL ? null : levelDef(f.level + 1).upgradeCost,
  };
}

/** 把当前累计「入账」——切换项目或升级时调用，避免重算历史 */
function bank(state: GameState, now: number): void {
  const f = ensureFacility(state, now);
  const info = facilityInfo(state, now);
  f.banked = { gold: info.pendingGold, boxes: info.pendingBoxes };
  f.since = now;
}

export interface AssignResult {
  ok: boolean;
  error?: string;
}

/** 给槽位指派项目（会先把当前累计入账，保证不丢产量） */
export function assignProject(state: GameState, slotIndex: number, projectId: ProjectId | null, now: number): AssignResult {
  const f = ensureFacility(state, now);
  if (slotIndex < 0 || slotIndex >= f.slots.length) return { ok: false, error: '槽位不存在' };
  if (projectId) {
    const p = projectById(projectId);
    if (!p) return { ok: false, error: '项目不存在' };
    if (p.unlockLevel > f.level) return { ok: false, error: `需要工房等级 ${p.unlockLevel}` };
  }
  bank(state, now);
  f.slots[slotIndex] = projectId;
  return { ok: true };
}

export interface CollectFacilityResult {
  ok: boolean;
  error?: string;
  gold?: number;
  boxes?: number;
  groove?: number;
  overflowed?: boolean;
}

/** 领取产出：结算金币、把箱子放进「待鉴定」库存，并更新连续收获加成 */
export function collectFacility(state: GameState, now: number): CollectFacilityResult {
  const f = ensureFacility(state, now);
  const info = facilityInfo(state, now);
  if (info.pendingGold <= 0 && info.pendingBoxes <= 0) {
    return { ok: false, error: '还没有产出' };
  }

  state.gold += info.pendingGold;
  f.boxes += info.pendingBoxes;
  f.collections += 1;

  // 连续收获加成：按时收 +0.1，溢出则归零（这是"别忘了回来"的钩子）
  const overflowed = info.saturated;
  f.groove = overflowed ? 0 : Math.min(GROOVE_MAX, f.groove + GROOVE_STEP);
  f.overflowed = overflowed;
  f.banked = { gold: 0, boxes: 0 };
  f.since = now;

  return {
    ok: true,
    gold: info.pendingGold,
    boxes: info.pendingBoxes,
    groove: f.groove,
    overflowed,
  };
}

export interface OpenBoxesResult {
  ok: boolean;
  error?: string;
  items?: ItemDef[];
}

/** 鉴定待鉴定箱（批量开箱）——把离线产出变成"开箱期待感" */
export function openBoxes(state: GameState, count: number, now: number): OpenBoxesResult {
  const f = ensureFacility(state, now);
  const n = Math.min(count, f.boxes);
  if (n <= 0) return { ok: false, error: '没有待鉴定箱' };

  const rng = makeRng(`facility-box:${now}:${f.boxes}:${f.collections}`);
  const itemLevel = boxItemLevel(f.level, state.chapter);
  const slots: Slot[] = ['weapon', 'head', 'body', 'hands', 'legs', 'feet', 'ears', 'neck', 'wrist', 'ring1', 'ring2'];
  const items: ItemDef[] = [];
  for (let i = 0; i < n; i++) {
    const q = rollQuality(rng, itemLevel, 0.15);
    items.push(rollItem(rng, rng.pick(slots), itemLevel, q));
  }
  f.boxes -= n;
  state.inventory.push(...items);
  return { ok: true, items };
}

export interface UpgradeResult {
  ok: boolean;
  error?: string;
  level?: number;
}

/** 升级工房：加槽位 + 提高储存上限 */
export function upgradeFacility(state: GameState, now: number): UpgradeResult {
  const f = ensureFacility(state, now);
  if (f.level >= MAX_FACILITY_LEVEL) return { ok: false, error: '已是最高等级' };
  const cost = levelDef(f.level + 1).upgradeCost;
  if (state.gold < cost) return { ok: false, error: `金币不足（需 ${cost}）` };
  bank(state, now);
  state.gold -= cost;
  f.level += 1;
  ensureFacility(state, now); // 补齐新槽位
  return { ok: true, level: f.level };
}
