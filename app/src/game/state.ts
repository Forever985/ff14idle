/**
 * 游戏状态：新档、副本解锁链、结算落地
 */
import { COMPANIONS } from '../data/companions';
import { DUNGEONS, DUNGEON_BY_ID } from '../data/dungeons';
import { expToNext, levelCapFor, START_LEVEL } from '../data/levels';
import type { DungeonDef, ExpeditionResult, GameState, MemberState } from '../types';
import { defaultFacility } from './facility';
import { GOALS } from './goals';

export const SAVE_VERSION = 8;

export function newGame(guildName = '拂晓血盟'): GameState {
  const members: MemberState[] = COMPANIONS.filter((c) => c.unlockChapter <= 1).map((c) => ({
    id: c.id,
    defId: c.id,
    name: c.name,
    job: c.job,
    level: START_LEVEL,
    exp: 0,
    equipment: {},
    runs: 0,
  }));

  return {
    version: SAVE_VERSION,
    guildName,
    gold: 300,
    chapter: 1,
    members,
    inventory: [],
    expeditions: [],
    cleared: [],
    // 每日/每周由 refreshCadence() 在启动时填充实际键值
    daily: { key: '', rouletteDungeonId: null, rouletteDone: false },
    weekly: { key: '', counters: {}, claimedLines: [], claims: 0 },
    trial: null,
    trialBest: 0,
    masteries: {},
    relics: {},
    relicFinalBonus: false,
    facility: defaultFacility(Date.now()),
    tower: null,
    towerMemory: 0,
    towerBest: 0,
    towerSeason: { key: '', best: 0 },
    createdAt: Date.now(),
    lastSeen: Date.now(),
    lastExportAt: 0,
    integrity: { seq: 0, digest: '' },
  };
}

/** 同一章内按等级排序后的副本链 */
export function chapterChain(chapter: number): DungeonDef[] {
  return DUNGEONS.filter((d) => d.chapter === chapter).sort(
    (a, b) => a.reqLevel - b.reqLevel || a.reqItemLevel - b.reqItemLevel,
  );
}

/** 副本是否已解锁：链式推进（前一个通关才解锁下一个） */
export function isUnlocked(state: GameState, dungeonId: string): boolean {
  const d = DUNGEON_BY_ID[dungeonId];
  if (!d) return false;
  if (d.chapter > state.chapter) return false;
  const chain = chapterChain(d.chapter);
  const idx = chain.findIndex((x) => x.id === dungeonId);
  if (idx <= 0) return true;
  const prev = chain[idx - 1]!;
  return state.cleared.includes(prev.id);
}

export function isCleared(state: GameState, dungeonId: string): boolean {
  return state.cleared.includes(dungeonId);
}

/** 发放经验并按等级上限逐级提升（副本派遣与破魔试炼共用） */
export function grantExp(state: GameState, memberIds: string[], exp: number): void {
  for (const id of memberIds) {
    const m = state.members.find((x) => x.id === id);
    if (!m) continue;
    m.exp += exp;
    const cap = levelCapFor(state.chapter);
    while (m.level < cap && m.exp >= expToNext(m.level)) {
      m.exp -= expToNext(m.level);
      m.level += 1;
    }
    if (m.level >= cap) m.exp = Math.min(m.exp, expToNext(m.level) - 1);
  }
}

/** 结算落地：发钱 / 发经验 / 发战利品 / 记通关 */
export function applyResult(
  state: GameState,
  dungeonId: string,
  memberIds: string[],
  result: ExpeditionResult,
): void {
  state.gold += result.gold;
  // ⚠️ 必须克隆：派遣记录里也保存着同一批 loot 对象，
  // 若直接 push 会让 inventory 与 expedition.result.loot 共享引用
  // （虽然 canonicalize 已修正为不依赖引用同一性，但数据本身也别留别名更干净）
  state.inventory.push(...result.loot.map((i) => ({ ...i, stats: { ...i.stats } })));

  for (const id of memberIds) {
    const m = state.members.find((x) => x.id === id);
    if (m) m.runs += 1;
  }
  grantExp(state, memberIds, result.exp);

  if (result.win && !state.cleared.includes(dungeonId)) {
    state.cleared.push(dungeonId);
  }
}

/**
 * 章节推进：当某章「主线终点副本」被通关后进入下一章。
 * MVP 阶段用「该章最后一个副本通关」作为章节门槛。
 */
export function tryAdvanceChapter(state: GameState): number | null {
  const chain = chapterChain(state.chapter);
  const last = chain[chain.length - 1];
  if (!last || !state.cleared.includes(last.id)) return null;
  if (state.chapter >= GOALS.maxChapter) return null;
  state.chapter += 1;
  // 解锁新章节的伙伴
  for (const c of COMPANIONS) {
    if (c.unlockChapter <= state.chapter && !state.members.some((m) => m.defId === c.id)) {
      state.members.push({
        id: c.id,
        defId: c.id,
        name: c.name,
        job: c.job,
        level: START_LEVEL,
        exp: 0,
        equipment: {},
        runs: 0,
      });
    }
  }
  return state.chapter;
}

export function findMember(state: GameState, id: string): MemberState | undefined {
  return state.members.find((m) => m.id === id);
}
