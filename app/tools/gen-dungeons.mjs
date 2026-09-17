/**
 * 内容生成器：data/content-plan.csv → app/src/data/dungeons.ts
 *
 * 设计依据（蓝图 §6.2「tools/ 内容生成器」）：
 * 内容表必须由脚本从 CSV 生成，不能手写——FF14 有 369 条副本，手写不可维护。
 *
 * 数据来源：data/content-plan.csv（由官方 Lodestone 公开页面抓取并分类）
 * ⚠️ 只取「名称 / 等级 / iLvl 门槛」这类事实性字段；
 *    不搬运官方描述文本，敌人与数值全部本项目自研（见 07 §3、§6）。
 *
 * 用法：node tools/gen-dungeons.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const appDir = path.resolve(import.meta.dirname, '..');
const csvPath = path.resolve(appDir, '..', 'data', 'content-plan.csv');
const outPath = path.resolve(appDir, 'src', 'data', 'dungeons.ts');

/** 极简 CSV 解析（支持双引号包裹与转义） */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (c !== '\r') field += c;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}

const raw = fs.readFileSync(csvPath, 'utf8').replace(/^\uFEFF/, '');
const [header, ...body] = parseCsv(raw);
const col = Object.fromEntries(header.map((h, i) => [h, i]));

const rows = body
  .filter((r) => r.length > 1 && r[col.Kind] === 'Dungeon')
  .map((r) => ({
    chapter: Number(r[col.Chapter]),
    name: r[col.Name],
    reqLevel: Number(r[col.ReqLevel]),
    reqItemLevel: r[col.ItemLevel] ? Number(r[col.ItemLevel]) : 0,
  }))
  .filter((d) => d.chapter >= 1 && d.chapter <= 3 && d.name);

/** 生成稳定 id（英文名 slug） */
function slug(name) {
  return name
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * 敌人数值（本项目自研，不抄官方）：
 * 以「平均物品等级门槛」为强度的唯一旋钮——这对应蓝图 §4.3 的线性 iLvl 规律。
 * 无 iLvl 的早期副本回退到等级。
 */
/**
 * 敌人数值（本项目自研，不抄官方）：
 *  - HP：以「刚够门槛的队伍约 2 分钟通关」为目标（放置游戏的合理单次时长）
 *  - DPS：**反推自「治疗量刚好有意义」**——
 *    令单个敌人在 45 秒内足以打空一支 4 人无治疗队伍，
 *    这样带 1 名治疗时血量会缓慢下降（有张力），无治疗或配置差则团灭，
 *    而不是靠"超时"来制造失败（初版就是这样，结果是全程满血却超时，体验很糟）。
 */
function enemiesFor(d) {
  const scale = d.reqItemLevel > 0 ? d.reqItemLevel : d.reqLevel * 1.2;
  const L = d.reqLevel;
  const hp = Math.round(7000 * (1 + scale / 45));

  // 预期队伍生命（4 人、混合职能、1 级基准 700）
  const partyHp = 4 * 700 * (1 + 0.07 * (L - 1));
  const baseDps = partyHp / 45;

  const trash = [
    { name: '巡逻的魔物', hp, dps: Math.round(baseDps * 0.85), boss: false },
    { name: '守卫石像', hp: Math.round(hp * 1.15), dps: Math.round(baseDps * 0.9), boss: false },
    { name: '精英爪牙', hp: Math.round(hp * 1.3), dps: Math.round(baseDps * 0.95), boss: false },
  ];
  const boss = {
    name: `${d.name} · 守关者`,
    hp: Math.round(hp * 4.2),
    dps: Math.round(baseDps * 1.4),
    boss: true,
  };
  return [...trash, boss];
}

const list = rows.map((d) => ({
  id: slug(d.name),
  name: d.name,
  chapter: d.chapter,
  reqLevel: d.reqLevel,
  reqItemLevel: d.reqItemLevel,
  enemies: enemiesFor(d),
  maxDurationSec: 240,
}));

const headerComment = `/**
 * 副本地图数据 —— 由 tools/gen-dungeons.mjs 从 data/content-plan.csv 自动生成
 * 请勿手工编辑；要改内容请改 CSV 或生成器后重跑。
 *
 * 生成时间基准：官方 Lodestone 数据快照 2026-09-15（Patch 7.56）
 * 收录范围：第 1–3 章（ARR / Heavensward / Stormblood）的 4 人副本，共 ${list.length} 条
 * 敌人数值为本项目自研（以平均物品等级门槛为唯一强度旋钮）。
 */
import type { DungeonDef } from '../types';

export const DUNGEONS: DungeonDef[] = `;

const ts = headerComment + JSON.stringify(list, null, 2) + ';\n\nexport const DUNGEON_BY_ID: Record<string, DungeonDef> = Object.fromEntries(\n  DUNGEONS.map((d) => [d.id, d]),\n);\n\nexport const DUNGEONS_BY_CHAPTER: Record<number, DungeonDef[]> = DUNGEONS.reduce(\n  (acc, d) => {\n    (acc[d.chapter] ??= []).push(d);\n    return acc;\n  },\n  {} as Record<number, DungeonDef[]>,\n);\n';

fs.writeFileSync(outPath, ts, 'utf8');

const byChapter = list.reduce((a, d) => ((a[d.chapter] = (a[d.chapter] || 0) + 1), a), {});
console.log(`dungeons.ts 已生成：${list.length} 条`);
console.log('各章分布：', byChapter);
console.log('示例：', list.slice(0, 3).map((d) => `${d.name} (Lv${d.reqLevel}/iLvl${d.reqItemLevel})`).join(' | '));
