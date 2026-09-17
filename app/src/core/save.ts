/**
 * 存档层：序列化 + 完整性校验 + 备份 + 导入导出
 *
 * 依据 `08-wow-idle-architecture.md` §2（存档层可复用清单 #5/#6）：
 *  - canonicalize + 摘要校验，低成本换来「不丢档」
 *  - sequence 序列号是将来云同步的必需品
 *  - 大体积数据（战报日志）不得进主存档
 */
import { COMPANIONS, COMPANION_BY_ID } from '../data/companions';
import type { GameState } from '../types';
import { SAVE_VERSION } from '../game/state';

const KEY = 'ff14idle.save';
const BAK = 'ff14idle.save.bak';

/** FNV-1a 32 位摘要 */
export function digest(input: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, '0');
}

/**
 * 规范化 JSON：键排序，保证摘要稳定。
 *
 * ⚠️ 这里必须只用「祖先栈」检测**真环**，而不能用全局 WeakSet 记录所有访问过的对象。
 * 曾经踩过的坑（真实丢档 bug）：
 *   `applyResult` 会把 `expedition.result.loot` 里的**同一批对象**推进 `state.inventory`，
 *   于是状态图里存在**共享引用**（非环）。用全局 WeakSet 时，签名阶段第二个引用被写成 `null`；
 *   而 JSON 往返之后共享关系消失、变成两份完整对象，验证阶段摘要必然不同
 *   → 校验失败 → 游戏静默重开，玩家第一次打完副本就丢档。
 * 正确语义：摘要必须是「JSON 内容的纯函数」，因此共享引用照常各写一份。
 */
export function canonicalize(value: unknown): string {
  const ancestors: object[] = [];
  const walk = (v: unknown): unknown => {
    if (v === null || typeof v !== 'object') return v;
    if (ancestors.includes(v as object)) return null; // 仅真正的循环引用
    ancestors.push(v as object);
    let out: unknown;
    if (Array.isArray(v)) {
      out = v.map(walk);
    } else {
      const obj = v as Record<string, unknown>;
      const sorted: Record<string, unknown> = {};
      for (const k of Object.keys(obj).sort()) sorted[k] = walk(obj[k]);
      out = sorted;
    }
    ancestors.pop();
    return out;
  };
  return JSON.stringify(walk(value));
}

export function signState(state: GameState): void {
  state.integrity.seq = (state.integrity.seq || 0) + 1;
  const clone = { ...state, integrity: { ...state.integrity, digest: '' } };
  state.integrity.digest = digest(canonicalize(clone));
}

/** 只做结构体检（不看摘要）——用于"摘要不匹配但内容看起来是好的"这种修复场景 */
export function looksLoadable(state: unknown): state is GameState {
  if (!state || typeof state !== 'object') return false;
  const s = state as Partial<GameState>;
  if (s.version !== SAVE_VERSION) return false;
  if (!Array.isArray(s.members) || !Array.isArray(s.expeditions)) return false;
  if (!Array.isArray(s.inventory) || !Array.isArray(s.cleared)) return false;
  if (typeof s.gold !== 'number') return false;
  return true;
}

export function verifyState(state: GameState): { valid: boolean; reason?: string } {
  if (!state || typeof state !== 'object') return { valid: false, reason: '空存档' };
  if (state.version !== SAVE_VERSION) return { valid: false, reason: `版本不符（${state.version}）` };
  if (!Array.isArray(state.members) || !Array.isArray(state.expeditions)) {
    return { valid: false, reason: '结构异常' };
  }
  const expect = state.integrity?.digest;
  if (!expect) return { valid: false, reason: '缺少摘要' };
  const clone = { ...state, integrity: { ...state.integrity, digest: '' } };
  const actual = digest(canonicalize(clone));
  return actual === expect ? { valid: true } : { valid: false, reason: '摘要不匹配' };
}

function storage(): Storage | null {
  try {
    if (typeof localStorage !== 'undefined') return localStorage;
  } catch {
    /* 无痕模式等 */
  }
  return null;
}

export function saveGame(state: GameState): boolean {
  const s = storage();
  if (!s) return false;
  try {
    const prev = s.getItem(KEY);
    if (prev) s.setItem(BAK, prev);
    state.lastSeen = Date.now();
    signState(state);
    s.setItem(KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export interface LoadResult {
  state: GameState | null;
  /**
   * recovered = 从备份恢复；invalid = 存档损坏；empty = 无存档；
   * digest-repaired = 摘要不匹配但结构完好（已接受并会重新签名）
   *
   * 关于 digest-repaired：单机本地存档里「可用性 > 防篡改」。
   * 与其因摘要算法变更或一次写入异常就静默清档（我们真的踩过一次），
   * 不如接受内容完好的存档并立刻重签名。
   */
  issue?: 'recovered' | 'invalid' | 'empty' | 'digest-repaired';
  /** 是否做过版本迁移（迁移后应立刻回写存档） */
  migrated?: boolean;
}

/**
 * 老档迁移：补齐新版本新增的字段。
 * 这是 `08-wow-idle-architecture.md` §10.1 第 8 条推荐的「声明式 migrate —— 幂等补默认」，
 * 比版本链迁移更好写、也更不容易出错。
 */
export function migrate(raw: unknown): { state: GameState; changed: boolean } | null {
  if (!raw || typeof raw !== 'object') return null;
  const s = raw as Record<string, unknown> & Partial<GameState>;
  const version = Number(s.version) || 1;
  let changed = false;

  if (version < 2) {
    if (!s.daily) {
      s.daily = { key: '', rouletteDungeonId: null, rouletteDone: false };
      changed = true;
    }
    if (!s.weekly) {
      s.weekly = { key: '', counters: {}, claimedLines: [], claims: 0 };
      changed = true;
    }
    s.version = 2;
    changed = true;
  }

  if (version < 3) {
    if (s.trial === undefined) {
      s.trial = null;
      changed = true;
    }
    if (s.trialBest === undefined) {
      s.trialBest = 0;
      changed = true;
    }
    s.version = 3;
    changed = true;
  }

  if (version < 4) {
    if (!s.masteries) {
      s.masteries = {};
      changed = true;
    }
    s.version = 4;
    changed = true;
  }

  if (version < 5) {
    if (!s.relics) {
      s.relics = {};
      changed = true;
    }
    if (s.relicFinalBonus === undefined) {
      s.relicFinalBonus = false;
      changed = true;
    }
    s.version = 5;
    changed = true;
  }

  if (version < 6) {
    if (!s.facility) {
      s.facility = {
        level: 1,
        slots: [null],
        banked: { gold: 0, boxes: 0 },
        since: Date.now(),
        boxes: 0,
        groove: 0,
        collections: 0,
        overflowed: false,
      };
      changed = true;
    }
    s.version = 6;
    changed = true;
  }

  if (version < 7) {
    if (s.tower === undefined) {
      s.tower = null;
      changed = true;
    }
    if (s.towerMemory === undefined) {
      s.towerMemory = 0;
      changed = true;
    }
    if (s.towerBest === undefined) {
      s.towerBest = 0;
      changed = true;
    }
    if (!s.towerSeason) {
      s.towerSeason = { key: '', best: 0 };
      changed = true;
    }
    s.version = 7;
    changed = true;
  }

  if (version < 8) {
    // v8：记录"上次导出存档的时间"，用于备份提醒（手机端本地存储有被清理的风险）。
    // 老档没导过，就是 0；随手补上即可。这就是"改了存档结构必须加迁移"的实例。
    if (s.lastExportAt === undefined) {
      s.lastExportAt = 0;
      changed = true;
    }
    s.version = 8;
    changed = true;
  }

  if (version < 9) {
    // v9：角色系统从"章节自动送人"改成「名角 + 酒馆佣兵」。
    // 关键点：**老存档里已有的成员一个都不能丢**，而且要正确归类：
    //   · defId 能在名角表里查到的 → 名角（剧情人物）
    //   · 查不到的 → 当作佣兵，按名字补一个合理的基础资质
    // 顺手补上 v9 新增的字段，缺哪个补哪个，避免出现 undefined 让属性算成 NaN。
    const named = new Set(COMPANIONS.map((c) => c.id));
    for (const m of s.members ?? []) {
      const isNamed = named.has(m.defId);
      if (m.kind === undefined) {
        m.kind = isNamed ? 'named' : 'hire';
        changed = true;
      }
      if (m.rarity === undefined) {
        m.rarity = 'common';
        changed = true;
      }
      if (m.race === undefined) {
        m.race = isNamed ? (COMPANION_BY_ID[m.defId]?.race ?? 'hyur') : 'hyur';
        changed = true;
      }
      if (m.potential === undefined) {
        m.potential = 1;
        changed = true;
      }
    }
    if (!s.tavern) {
      s.tavern = { dayKey: '', candidates: [], freeUsed: false, paidRolls: 0 };
      changed = true;
    }
    s.version = 9;
    changed = true;
  }

  return { state: s as GameState, changed };
}

export function loadGame(): LoadResult {
  const s = storage();
  if (!s) return { state: null, issue: 'empty' };

  const primary = s.getItem(KEY);
  if (primary) {
    try {
      const parsed = JSON.parse(primary) as GameState;
      const mig = migrate(parsed);
      if (mig) {
        if (mig.changed) return { state: mig.state, migrated: true };
        if (verifyState(mig.state).valid) return { state: mig.state };
        // 摘要不匹配但内容结构完好 → 修复并继续（见下方说明），而不是丢档
        if (looksLoadable(mig.state)) return { state: mig.state, issue: 'digest-repaired' };
      }
    } catch {
      /* 落到备份 */
    }
  }

  const bak = s.getItem(BAK);
  if (bak) {
    try {
      const parsed = JSON.parse(bak) as GameState;
      const mig = migrate(parsed);
      if (mig) {
        if (mig.changed) return { state: mig.state, issue: 'recovered', migrated: true };
        if (verifyState(mig.state).valid) return { state: mig.state, issue: 'recovered' };
        if (looksLoadable(mig.state)) return { state: mig.state, issue: 'recovered' };
      }
    } catch {
      /* ignore */
    }
  }

  return { state: null, issue: primary || bak ? 'invalid' : 'empty' };
}

export function clearGame(): void {
  const s = storage();
  if (!s) return;
  s.removeItem(KEY);
  s.removeItem(BAK);
}

export function exportSave(state: GameState): string {
  return JSON.stringify(state, null, 2);
}

export function importSave(text: string): LoadResult {
  try {
    const parsed = JSON.parse(text) as GameState;
    if (!verifyState(parsed).valid) return { state: null, issue: 'invalid' };
    return { state: parsed };
  } catch {
    return { state: null, issue: 'invalid' };
  }
}
