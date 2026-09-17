/**
 * 破魔试炼（Crucible）—— 棋盘 roguelike 的运转逻辑
 *
 * 与副本派遣的区别（这正是它作为"第二个玩法轴"的价值）：
 *   副本派遣：满血进场 → 打完领奖 → 一次性结算
 *   破魔试炼：**血量跨节点继承且不回复** → 一路推进 → 打到哪算哪
 * 于是产生了派遣没有的东西：**资源管理决策**（什么时候用道具、要不要继续冒险）。
 *
 * 官方对应机制见 `09-evercold-current-state.md` §2.4；
 * 设计取向参考 `06-side-content-pvp.md` §9.9（最优先做的单点）。
 */
import { makeRng } from '../core/rng';
import {
  BOARD_LENGTH,
  NODE_SCORE,
  SURVIVAL_SCORE,
  blessingById,
  generateBoard,
  itemById,
  makeBlessing,
  makeEnemies,
  makeTreasure,
} from '../data/trial';
import { rollItem, rollQuality } from '../data/items';
import { simulateEncounter } from '../sim/combat';
import type { GameState, ItemDef, RosterSnapshot, Slot, TrialRun } from '../types';
import { bumpCounter } from './cadence';
import { computeMemberStats } from './member';
import { addRelicProgress, maxRelicProgress, relicTeamBonus } from './relic';
import { findMember, grantExp } from './state';

/** 试炼队伍规模：比副本小（3 人）——它考的是续航而不是满编爆发 */
export const TRIAL_PARTY_SIZE = 3;

export interface TrialStartResult {
  ok: boolean;
  error?: string;
}

export function startTrial(state: GameState, memberIds: string[], now: number): TrialStartResult {
  if (state.trial && state.trial.status === 'running') {
    return { ok: false, error: '已有一局试炼进行中' };
  }
  if (memberIds.length !== TRIAL_PARTY_SIZE) {
    return { ok: false, error: `试炼队伍必须为 ${TRIAL_PARTY_SIZE} 人` };
  }
  if (new Set(memberIds).size !== memberIds.length) {
    return { ok: false, error: '同一成员不能重复上阵' };
  }

  const roster: RosterSnapshot[] = [];
  for (const id of memberIds) {
    const m = findMember(state, id);
    if (!m) return { ok: false, error: '成员不存在' };
    roster.push(computeMemberStats(m, state.inventory, state.masteries?.[m.id] ?? [], relicTeamBonus(state)));
  }
  const roles = roster.map((r) => (r.job === 'WAR' || r.mitigation > 0.15 ? 'tank' : r.healPotency > 0 ? 'healer' : 'dps'));
  if (!roles.includes('tank')) return { ok: false, error: '试炼队伍需要至少 1 名坦克' };
  if (!roles.includes('healer')) return { ok: false, error: '试炼队伍需要至少 1 名治疗' };

  const seed = makeRng(`trial:${now}:${memberIds.join(',')}`).int(1, 2 ** 31 - 1);
  const hp: Record<string, number> = {};
  for (const r of roster) hp[r.memberId] = r.hp;

  state.trial = {
    id: `trial_${now.toString(36)}`,
    chapter: state.chapter,
    memberIds: [...memberIds],
    roster,
    hp,
    nodeIndex: 0,
    nodes: generateBoard(seed, state.chapter),
    items: [],
    blessings: [],
    nextBattle: { damageMult: 1, takenMult: 1 },
    score: 0,
    log: [`进入破魔试炼（棋盘 ${BOARD_LENGTH} 格，队伍 ${roster.length} 人）`],
    seed,
    status: 'running',
    startedAt: now,
  };
  return { ok: true };
}

export interface AdvanceResult {
  ok: boolean;
  error?: string;
  node?: string;
  win?: boolean;
  finished?: boolean;
  scoreGained?: number;
  log?: string[];
}

/** 推进一格：结算当前节点，然后前移 */
export function advanceTrial(state: GameState, now: number): AdvanceResult {
  const run = state.trial;
  if (!run || run.status !== 'running') return { ok: false, error: '没有进行中的试炼' };

  const node = run.nodes[run.nodeIndex];
  if (!node) return { ok: false, error: '棋盘已走完' };

  const gained: string[] = [];
  let scoreGained = NODE_SCORE[node.kind];

  if (node.kind === 'camp') {
    // 营地：唯一自然恢复来源（对应官方"必须靠特定格子恢复"）
    for (const r of run.roster) {
      const cur = run.hp[r.memberId] ?? 0;
      if (cur <= 0) continue;
      run.hp[r.memberId] = Math.min(r.hp, Math.round(cur + r.hp * 0.25));
    }
    gained.push('全队在营地休整，回复 25% 生命');
  } else if (node.kind === 'treasure') {
    const item = makeTreasure(run.seed, node.index);
    run.items.push(item.id);
    gained.push(`拾得一次性道具【${item.name}】：${item.desc}`);
  } else if (node.kind === 'elite') {
    const b = makeBlessing(run.seed, node.index);
    run.blessings.push(b.id);
    if (b.hpBonus > 0) {
      for (const r of run.roster) {
        const newMax = Math.round(r.hp * (1 + b.hpBonus));
        run.hp[r.memberId] = (run.hp[r.memberId] ?? 0) + (newMax - r.hp);
        r.hp = newMax;
      }
    }
    gained.push(`获得局内祝福【${b.name}】：${b.desc}`);
  }

  // 战斗类节点（battle / elite / boss）
  let won = true;
  if (node.kind === 'battle' || node.kind === 'elite' || node.kind === 'boss') {
    const enemies = makeEnemies(node, run.chapter, run.seed);
    const mods = blessingsMods(run);
    const out = simulateEncounter({
      roster: run.roster,
      enemies,
      seed: makeRng(`trial:${run.seed}:fight:${node.index}`).int(1, 2 ** 31 - 1),
      startHp: run.hp,
      damageMult: mods.damageMult * run.nextBattle.damageMult,
      takenMult: mods.takenMult * run.nextBattle.takenMult,
      maxDurationSec: 180,
      label: `${node.name}(第 ${node.index + 1} 格)`,
    });
    run.hp = out.hp;
    gained.push(...out.log.slice(-6));
    won = out.win;
    run.nextBattle = { damageMult: 1, takenMult: 1 }; // 临时增益只作用于一场

    if (!won) {
      // 失败：按已推进的进度结算（对应官方"放弃也给分"的精神）
      run.status = 'finished';
      run.log.push(...gained, `在第 ${node.index + 1} 格倒下`);
      const settlement = settleRun(state, run, now, false);
      return {
        ok: true,
        node: node.name,
        win: false,
        finished: true,
        scoreGained: settlement.score,
        log: gained,
      };
    }
  }

  node.cleared = true;
  run.score += scoreGained;
  run.nodeIndex += 1;
  run.log.push(...gained);

  if (node.kind === 'boss' || run.nodeIndex >= run.nodes.length) {
    run.status = 'finished';
    const settlement = settleRun(state, run, now, true);
    return {
      ok: true,
      node: node.name,
      win: true,
      finished: true,
      scoreGained: settlement.score,
      log: gained,
    };
  }

  void scoreGained;
  void now;
  return { ok: true, node: node.name, win: true, finished: false, log: gained };
}

/** 使用一次性道具 */
export function useTrialItem(state: GameState, itemId: string): { ok: boolean; error?: string; effect?: string } {
  const run = state.trial;
  if (!run || run.status !== 'running') return { ok: false, error: '没有进行中的试炼' };
  const idx = run.items.indexOf(itemId);
  if (idx < 0) return { ok: false, error: '没有这个道具' };
  const def = itemById(itemId);
  if (!def) return { ok: false, error: '道具不存在' };

  run.items.splice(idx, 1);

  switch (itemId) {
    case 'potion': {
      for (const r of run.roster) {
        const cur = run.hp[r.memberId] ?? 0;
        if (cur <= 0) continue;
        run.hp[r.memberId] = Math.min(r.hp, Math.round(cur + r.hp * 0.35));
      }
      return { ok: true, effect: '全队回复 35% 生命' };
    }
    case 'whetstone':
      run.nextBattle.damageMult *= 1.3;
      return { ok: true, effect: '下一场战斗伤害 +30%' };
    case 'ward':
      run.nextBattle.takenMult *= 0.65;
      return { ok: true, effect: '下一场战斗受伤 -35%' };
    case 'revive': {
      const fallen = run.roster.find((r) => (run.hp[r.memberId] ?? 0) <= 0);
      if (!fallen) {
        // 没人阵亡就把羽毛退回去，避免浪费
        run.items.push(itemId);
        return { ok: false, error: '当前没有阵亡成员' };
      }
      run.hp[fallen.memberId] = Math.round(fallen.hp * 0.4);
      return { ok: true, effect: `${fallen.name} 已复活（40% 生命）` };
    }
    default:
      return { ok: false, error: '未知道具效果' };
  }
}

/** 主动放弃（官方 Forfeiting：仍按进度给分） */
export function abandonTrial(state: GameState, now: number): { ok: boolean; score?: number; error?: string } {
  const run = state.trial;
  if (!run || run.status !== 'running') return { ok: false, error: '没有进行中的试炼' };
  run.log.push(`主动放弃（已推进 ${run.nodeIndex} 格）`);
  run.status = 'finished';
  const s = settleRun(state, run, now, false);
  return { ok: true, score: s.score };
}

/** 当前祝福累计出的战斗增益 */
export function blessingsMods(run: TrialRun): { damageMult: number; takenMult: number } {
  let dmg = 0;
  let red = 0;
  for (const id of run.blessings) {
    const b = blessingById(id);
    if (!b) continue;
    dmg += b.damageBonus;
    red += b.damageReduction;
  }
  return { damageMult: 1 + dmg, takenMult: Math.max(0.4, 1 - red) };
}

export interface Settlement {
  score: number;
  gold: number;
  exp: number;
  loot: ItemDef[];
  best: boolean;
}

/**
 * 结算：分数 → 金币/经验/装备。
 * 生存奖励按剩余血量比例给分，这是"敢不敢继续推进"的核心权衡。
 */
function settleRun(state: GameState, run: TrialRun, now: number, clearedBoard: boolean): Settlement {
  const hpTotal = run.roster.reduce((s, r) => s + r.hp, 0);
  const hpLeft = run.roster.reduce((s, r) => s + Math.max(0, run.hp[r.memberId] ?? 0), 0);
  const survival = Math.max(0, hpLeft / Math.max(1, hpTotal));
  const bonus = Math.round(survival * SURVIVAL_SCORE) + (clearedBoard ? 300 : 0);
  const score = run.score + bonus;
  run.score = score;

  const gold = Math.round(score / 4);
  const exp = Math.round(score / 12);
  const rng = makeRng(`trial:${run.seed}:settle:${now}`);
  const itemLevel = Math.round(25 + run.chapter * 45);
  const lootCount = Math.min(3, 1 + Math.floor(score / 800));
  const loot: ItemDef[] = [];
  const slots: Slot[] = ['weapon', 'head', 'body', 'hands', 'legs', 'feet', 'ears', 'neck', 'wrist', 'ring1', 'ring2'];
  for (let i = 0; i < lootCount; i++) {
    const q = rollQuality(rng, itemLevel, clearedBoard ? 0.4 : 0.15);
    loot.push(rollItem(rng, rng.pick(slots), itemLevel, q));
  }

  state.gold += gold;
  state.inventory.push(...loot);
  grantExp(state, run.memberIds, exp);
  const best = score > (state.trialBest ?? 0);
  if (best) state.trialBest = score;

  // 试炼也计入天书奇谭（试炼里的战斗算副本通关与击杀）
  bumpCounter(state, 'clears');
  bumpCounter(state, 'lootGained', loot.length);
  bumpCounter(state, 'goldEarned', gold);

  // ---- 幻境武器长链 ----
  maxRelicProgress(state, run.memberIds, 'trialScore', score);
  if (clearedBoard) {
    addRelicProgress(state, run.memberIds, 'clears');
    addRelicProgress(state, run.memberIds, 'bosses');
  }

  run.log.push(`结算：得分 ${score}（推进 ${run.nodeIndex} 格${clearedBoard ? ' + 通关' : ''} + 生存 ${Math.round(survival * 100)}% 奖励）`);

  return { score, gold, exp, loot, best };
}

export function trialHpPct(run: TrialRun): number {
  const total = run.roster.reduce((s, r) => s + r.hp, 0);
  const left = run.roster.reduce((s, r) => s + Math.max(0, run.hp[r.memberId] ?? 0), 0);
  return total > 0 ? left / total : 0;
}
