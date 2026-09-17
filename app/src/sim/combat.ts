/**
 * 战斗内核（放置化抽象 · L2 层）
 *
 * 设计依据：`02-combat-math.md` 第 9 章的三层抽象
 *   第 1 层：单次命中伤害（效力 × 攻击力）
 *   第 2 层：PPS（每秒输出）—— 由 GCD 与技能优先级决定
 *   第 3 层：爆发窗口倍率 —— 团辅/爆发的对齐价值
 * 以及蓝图 §2 决策三：**主目标 L2（坦/奶/DPS 三角），不做逐帧机制**。
 *
 * 关键设计决定：
 *  1. **确定性**：伤害用期望值，不做逐次暴击掷骰（蓝图 M7 建议）——
 *     这样战报可复现、平衡可计算。
 *  2. **种子仍有意义**：每次战斗用种子掷一个「发挥系数」（±8%），
 *     同一队伍的不同派遣有变化，但同一种子必定复现。
 *  3. 资源池 + 阈值爆发（蓝图 M1/M2/M3）由每个成员的 job 定义驱动。
 *
 * 本文件的核心是 `simulateEncounter`——它被两处复用：
 *  - 副本派遣（`resolveExpedition`）：满血进场
 *  - 破魔试炼（`game/trial.ts`）：**血量跨节点继承、不自然回复**
 *    （后者正是 7.56 官方「Crucible of the Unbroken」的核心机制之一）
 */
import { GCD_SEC } from '../data/jobs';
import { rollLoot } from '../data/items';
import { makeRng } from '../core/rng';
import type { DungeonDef, ExpeditionResult, ItemDef, RosterSnapshot } from '../types';

/** 模拟步长（秒） */
const DT = 0.5;
/** 日志上限，避免战报爆炸（参考实现曾因日志撑爆存档） */
const MAX_LOG = 60;

export interface EnemySpec {
  name: string;
  hp: number;
  dps: number;
  boss: boolean;
}

export interface EncounterOptions {
  roster: RosterSnapshot[];
  enemies: EnemySpec[];
  seed: number;
  /** 起始血量（不传则满血）。试炼用它实现「血量继承」 */
  startHp?: Record<string, number>;
  /** 我方伤害倍率（祝福/道具） */
  damageMult?: number;
  /** 我方受伤倍率（祝福/道具，<1 为减伤） */
  takenMult?: number;
  maxDurationSec?: number;
  /** 战报标题前缀 */
  label?: string;
}

export interface EncounterOutcome {
  win: boolean;
  /** 战斗结束后的血量（含阵亡者，值为 0） */
  hp: Record<string, number>;
  hpLeftPct: number;
  durationSec: number;
  bossKilled: boolean;
  log: string[];
}

interface SimMember {
  snap: RosterSnapshot;
  hp: number;
  hpMax: number;
  resource: number;
  burstLeft: number;
  burstCd: number;
  gcdTimer: number;
  isTank: boolean;
  isHealer: boolean;
}

export function simulateEncounter(opts: EncounterOptions): EncounterOutcome {
  const {
    roster,
    enemies: enemyDefs,
    seed,
    startHp,
    damageMult = 1,
    takenMult = 1,
    maxDurationSec = 240,
    label,
  } = opts;

  const rng = makeRng(seed);
  const form = rng.fork('form').float(0.92, 1.08); // 发挥系数
  const log: string[] = [];
  const push = (s: string) => {
    if (log.length < MAX_LOG) log.push(s);
  };

  const members: SimMember[] = roster.map((snap) => {
    const hpMax = snap.hp;
    const start = startHp?.[snap.memberId];
    return {
      snap,
      hp: start === undefined ? hpMax : Math.max(0, Math.min(hpMax, start)),
      hpMax,
      resource: 0,
      burstLeft: 0,
      burstCd: 0,
      gcdTimer: 0,
      isTank: snap.job === 'WAR' || snap.mitigation > 0.15,
      isHealer: snap.healPotency > 0,
    };
  });

  const enemies = enemyDefs.map((e) => ({ def: e, hp: e.hp }));
  let enemyIdx = 0;
  const hpTotal = members.reduce((s, m) => s + m.hpMax, 0);
  const hpStart = members.reduce((s, m) => s + m.hp, 0);

  const dead = new Set<string>();
  for (const m of members) if (m.hp <= 0) dead.add(m.snap.memberId);

  push(
    `${label ? label + '：' : ''}进入战斗（${members.filter((m) => m.hp > 0).length}/${members.length} 人可战，发挥系数 ${form.toFixed(2)}）`,
  );

  let t = 0;
  let bossKilled = false;

  while (t < maxDurationSec) {
    t += DT;

    // ---------- 1. 资源与爆发窗口 ----------
    for (const m of members) {
      if (m.hp <= 0) continue;
      m.resource = Math.min(m.snap.resourceMax, m.resource + m.snap.resourceGain * DT);
      if (m.burstCd > 0) m.burstCd = Math.max(0, m.burstCd - DT);
      if (m.burstLeft > 0) m.burstLeft = Math.max(0, m.burstLeft - DT);

      if (m.resource >= m.snap.burstCost && m.snap.burstCost > 0 && m.burstCd <= 0 && m.burstLeft <= 0) {
        m.resource -= m.snap.burstCost;
        m.burstLeft = m.snap.burstDurationSec;
        m.burstCd = m.snap.burstCooldownSec;
        push(`${m.snap.name} 开启【爆发窗口】+${Math.round(m.snap.burstBonus * 100)}%（${m.snap.burstDurationSec}s）`);
      }
    }

    // ---------- 2. 我方行动（按 GCD） ----------
    const alive = members.filter((m) => m.hp > 0);

    for (const m of alive) {
      m.gcdTimer -= DT;
      if (m.gcdTimer > 0) continue;
      m.gcdTimer += GCD_SEC;

      const burstMult = m.burstLeft > 0 ? 1 + m.snap.burstBonus : 1;
      const dmg = m.snap.potency * burstMult * form * damageMult;

      if (m.isHealer) {
        // 治疗职业：GCD 一半用于治疗，一半转为输出（呼应「治疗不亏输出」的官方解法）
        const lowest = alive.reduce((a, b) => (a.hp / a.hpMax <= b.hp / b.hpMax ? a : b));
        lowest.hp = Math.min(lowest.hpMax, lowest.hp + (m.snap.healPotency * burstMult * form) / 2);
        const target = enemies[enemyIdx];
        if (target) target.hp -= dmg * 0.5;
      } else {
        const target = enemies[enemyIdx];
        if (target) target.hp -= dmg;
      }
    }

    // ---------- 3. 判定敌人死亡 ----------
    let target = enemies[enemyIdx];
    while (target && target.hp <= 0) {
      if (target.def.boss) bossKilled = true;
      push(`击败 ${target.def.name}`);
      enemyIdx++;
      target = enemies[enemyIdx];
    }

    if (enemyIdx >= enemies.length) {
      const hpLeft = members.reduce((s, m) => s + Math.max(0, m.hp), 0) / hpTotal;
      push(`战斗胜利！用时 ${Math.round(t)} 秒，队伍剩余 ${Math.round(hpLeft * 100)}% 生命`);
      return { win: true, hp: hpOf(members), hpLeftPct: hpLeft, durationSec: Math.round(t), bossKilled, log };
    }

    // ---------- 4. 敌人反击 ----------
    const cur = enemies[enemyIdx]!;
    const incoming = cur.def.dps * DT * takenMult;

    const tank = alive.find((m) => m.isTank);
    const others = alive.filter((m) => m !== tank);

    if (tank) {
      tank.hp -= incoming * 0.65 * (1 - tank.snap.mitigation);
      const splash = (incoming * 0.35) / Math.max(1, others.length);
      for (const o of others) o.hp -= splash;
    } else {
      const share = incoming / Math.max(1, alive.length);
      for (const m of alive) m.hp -= share;
    }

    for (const m of members) {
      if (m.hp <= 0 && !dead.has(m.snap.memberId)) {
        dead.add(m.snap.memberId);
        if (members.some((x) => x.hp > 0)) push(`${m.snap.name} 倒下了`);
      }
    }

    if (!members.some((m) => m.hp > 0)) {
      push(`队伍全灭于 ${cur.def.name}`);
      return { win: false, hp: hpOf(members), hpLeftPct: 0, durationSec: Math.round(t), bossKilled, log };
    }
  }

  push(`超时未通关（上限 ${maxDurationSec} 秒），队伍撤退`);
  const hpLeft = members.reduce((s, m) => s + Math.max(0, m.hp), 0) / hpTotal;
  void hpStart;
  return { win: false, hp: hpOf(members), hpLeftPct: hpLeft, durationSec: maxDurationSec, bossKilled, log };
}

function hpOf(members: SimMember[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const m of members) out[m.snap.memberId] = Math.max(0, Math.round(m.hp));
  return out;
}

/* ---------------- 副本派遣的封装（保持原有签名与数值） ---------------- */

export interface SimOutcome {
  win: boolean;
  durationSec: number;
  hpLeftPct: number;
  bossKilled: boolean;
  log: string[];
}

export function simulateDungeon(
  roster: RosterSnapshot[],
  dungeon: DungeonDef,
  seed: number,
): SimOutcome {
  const out = simulateEncounter({
    roster,
    enemies: dungeon.enemies,
    seed,
    maxDurationSec: dungeon.maxDurationSec,
    label: dungeon.name,
  });
  return {
    win: out.win,
    durationSec: out.durationSec,
    hpLeftPct: out.hpLeftPct,
    bossKilled: out.bossKilled,
    log: out.log,
  };
}

/** 完整结算：战斗 + 掉落 + 货币 */
export function resolveExpedition(
  roster: RosterSnapshot[],
  dungeon: DungeonDef,
  seed: number,
): ExpeditionResult {
  const outcome = simulateDungeon(roster, dungeon, seed);
  const rng = makeRng(seed);

  const loot: ItemDef[] = outcome.win
    ? rollLoot(rng.fork('loot'), dropItemLevel(dungeon), outcome.bossKilled)
    : [];
  if (!outcome.win && rng.fork('partial').chance(0.35)) {
    // 失败也给一点点安慰奖（对应蓝图 §4.5 机制 1「放弃也给分」的思想）
    loot.push(...rollLoot(rng.fork('loot-partial'), Math.max(1, dropItemLevel(dungeon) - 10), false));
  }

  const baseGold = Math.round(dungeon.reqLevel * 12 + dungeon.reqItemLevel * 3);
  const gold = outcome.win ? baseGold : Math.round(baseGold * 0.25);
  const exp = outcome.win ? Math.round(dungeon.reqLevel * 18 + 40) : Math.round(dungeon.reqLevel * 4);

  return {
    win: outcome.win,
    gold,
    exp,
    loot,
    log: outcome.log,
    durationSec: outcome.durationSec,
    hpLeftPct: outcome.hpLeftPct,
    bossKilled: outcome.bossKilled,
  };
}

/** 掉落物品等级：以副本的门槛为基准（iLvl 是唯一的成长轴，见蓝图 §4.3） */
function dropItemLevel(dungeon: DungeonDef): number {
  const gate = dungeon.reqItemLevel > 0 ? dungeon.reqItemLevel : dungeon.reqLevel * 1.2;
  return Math.round(gate + 3);
}
