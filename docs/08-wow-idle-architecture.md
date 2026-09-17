# 08 · 《艾泽拉斯公会物语》前端源码架构分析 —— 兼 FF14 Idle 复用指南

> 分析对象：`E:\deepseek harness\_idlewow\`（站点 bundle 无损还原后的源码树）
> 分析方式：对 `_idlewow/src/` 下 40 个 `.js`（共 33,024 行）逐文件通读 + 正则/脚本量化统计，全部结论附 **文件名:行号**
> 输出目标：为「最终幻想14 放置（FF14 Idle）」提供可复用的工程架构与设计模式参考

---

## 0. 阅读说明

### 0.1 证据基础

| 来源 | 说明 |
| --- | --- |
| `_idlewow/app.js`（1,630,462 B） | 官方线上 bundle，未压缩、带中文注释 |
| `_idlewow/src/`（40 文件 / 33,024 行） | 按模块边界无损切分后的源码树 |
| `_idlewow/split.ps1`（56 行） | 切分脚本（正则定位模块头） |
| `_idlewow/verify.ps1`（51 行） | 回拼校验脚本 |
| `_idlewow/INDEX.md` | 还原报告 |
| `_idlewow/modules.csv` | 模块清单（行数/字节/导出数/依赖数） |
| `_idlewow/styles.css`（69,676 B） | 全部样式（本次未逐行分析） |

`verify.ps1:35-36` 的校验结论为 `VERIFY: PASS`，即除模块首尾空行外，回拼代码与官方 bundle 逐行一致。**因此下文所有行号都是"官方 bundle 内的真实行号"**，不是二次加工产物，可作为可信证据。

### 0.2 事实与推断的标注约定

- `【事实】` —— 可在源码中指出明确行号、可直接复核的结论。
- `【推断】` —— 由事实推导出的工程判断、成因猜测或风险预测，可能有其他解释。
- `【建议】` —— 面向 FF14 Idle 的主观设计建议，非源码内容。

### 0.3 一个必须先行纠正的前提

任务描述里写"存档版本迁移 v1..v14"。**实际不是 14，而是 30。**

```
_idlewow/src/game/save.js:33   const CURRENT_VERSION = 30;
_idlewow/src/game/save.js:34   const RELEASE_VERSION = '0.9.0';
```

`INDEX.md:90` 里写的"标注到 v14"指的是 `save.js:410` 那条 v14 迁移注释（"详细日志不再持久化"），而不是版本上限。**当前存档结构版本是 30，游戏发布版本是 0.9.0。** 后文第 2 节会给出完整的版本锚点表。

---

## 1. 模块系统与构建方式

### 1.1 加载器本体：24 行的 `__ns` 命名空间

【事实】整个游戏的"模块系统"只有 24 行，位于 bundle 最顶部：

```js
// _idlewow/app.js:1-4
(function () {
'use strict';
var __mods = {};
function __ns(id) { if (!__mods[id]) __mods[id] = {}; return __mods[id]; }
```

【事实】每个模块被包成 IIFE，模块头格式严格固定（`app.js:5-6`）：

```js
(function () {
var __m = __ns("game/classes.js");
...模块体...
__m.CLASSES = CLASSES;   // 模块末尾统一导出
})();
```

这套机制的特性（全部为事实）：

| 特性 | 说明 | 证据 |
| --- | --- | --- |
| 注册表 | 一个普通对象 `__mods`，键为模块 id（路径字符串） | `app.js:3` |
| 命名空间对象 | `__ns(id)` 幂等创建并返回**同一个对象引用** | `app.js:4` |
| 无依赖解析 | 不做拓扑排序、不做循环检测、不做懒加载 | `app.js:1-4` 全部代码 |
| 无缓存/无异步 | 全部同步、按拼接顺序立即执行 | 同上 |
| 导出 | 模块末尾 `__m.X = X` 赋值；`ui.js` 只导出 `init` | `classes.js:104-109`；`main.js:6` |
| 依赖声明 | `var { a, b } = __ns("game/x.js")` 解构导入 | `engine.js:7-28` |
| 依赖语义 | **执行顺序 = 声明顺序**，只能 import 已执行模块 | `app.js:6` 起依次 |

【事实】依赖声明是**值快照**而非活绑定（JS 的 `var {} = obj` 解构语义）。这意味着：

- 如果 A 导出 `let counter` 并且 A 之后修改它，已解构的 B 拿到的是旧值。
- 本项目中绝大多数导出是函数与常量表对象，所以这个坑没有触发。全项目仅 `save.js` 存在"导出可变状态"的情况：`save.js:36-37` 的 `lastLoadPurged` / `lastLoadIntegrityIssue`，而 `save.js:721-722` 把它们**按值导出**，`ui.js:22` 解构导入。二者都是"加载时一次性写入、之后不再变"的布尔值，所以**语义上侥幸正确**；但同样的模式若用于运行中会变化的量就会出错。【推断】这是这套模块系统最危险的一处语义陷阱，FF14 Idle 必须避免。

### 1.2 模块执行顺序 = 手写拓扑序

【事实】bundle 内 40 个模块的拼接顺序如下（脚本提取自 `app.js` 的模块头正则匹配序，即真实执行顺序；**被依赖者总在前面**，为新模块选择插入位置时以"依赖它的模块之前"为准则）：

```
 1 game/classes.js      5 game/skills.js        9 game/items.js        13 arena_battle_view.js  17 game/names.js
 2 game/config.js       6 game/pvp-talents.js  10 game/talents.js      14 battle_anim.js        18 game/heroes.js
 3 game/pvp-skills.js   7 game/sets.js         11 game/rng.js          15 battleground_view.js  19 game/hero-quests.js
 4 game/effect-labels.js 8 game/armor.js       12 game/battle.js       16 game/content.js       20 game/levels.js
21 game/idb.js  22 game/mounts.js  23 game/gift-codes.js  24 game/prefixes.js  25 game/tasks.js  26 game/achievements.js
27 game/professions.js  28 game/inventory.js  29 game/save.js  30 game/engine.js  31 game/challenges.js
32 challenge_battle_view.js  33 cloudbase.js  34 game/ads.js  35 game/arena.js  36 game/battleground.js
37 game/cloud-save.js  38 game/dropdb.js  39 ui.js  40 main.js
```

【事实】我用 DFS 对全部 40 个模块的 `__ns(...)` 引用做了环检测，结果为 **`no cycles found`**，且上述顺序是一个合法拓扑序（被依赖者总在前面）。

【推断】这个顺序不是自动拓扑排序的产物，而是人工维护的：`inventory.js` 的头部注释直接说明了原因：

```js
// _idlewow/src/game/inventory.js:9-12
// 独立模块：save.js 的存档迁移与 engine.js 的入包/手动整理流程都需要这套裁剪逻辑，
// 拆出来避免 engine ↔ save 互相导入形成循环（build-pc 打包脚本要求依赖无环）。
```

【事实】这里明确提到一个**不在 bundle 内**的构建脚本 `build-pc`，它"要求依赖无环"。`ads.js:14` 也提到构建脚本会"按正则扫描 import/export"。也就是说：**作者有一套打包脚本，但没有随 bundle 发布**，我们只能看到它的产物与它对源码施加的约束。

### 1.3 从这个结构重建工程与打包（可复现做法）

#### 1.3.1 已具备的还原工具链（事实）

| 脚本 | 作用 | 关键行 |
| --- | --- | --- |
| `split.ps1` | 用正则 `\(function \(\) \{\r?\nvar __m = __ns\("([^"]+)"\);\r?\n` 定位模块头，按偏移切片，去掉包装，写入 `src/<模块id>` | `split.ps1:9`、`split.ps1:14-25` |
| `split.ps1` | 同时统计每个模块的导出与依赖，产出 `modules.csv` | `split.ps1:27-28`、`split.ps1:44-56` |
| `verify.ps1` | 反向拼接：从每个文件剥掉「注释块 + 一个空行」的前导，重新加上 `(function () {\nvar __m = __ns("id");\n` 与 `\n})();\n` | `verify.ps1:9-26` |
| `verify.ps1` | 忽略空行后逐行比对原文与回拼文本，并检查切分文件内是否残留模块头 | `verify.ps1:28-47` |

#### 1.3.2 重建为一个"能继续开发"的工程（步骤）

【建议】按下面步骤可以把当前这棵只读的源码树变成一个可持续开发的工程，同时保留"单文件 bundle"这个发布形态：

**第 1 步：建立模块清单（保持手写拓扑序）**

从 `app.js` 提取模块顺序，固化为一份显式清单（例如 `src/modules.order.json`）。**不要用 `modules.csv`** —— 那份 CSV 是按模块名字母序导出的（`split.ps1:56`），直接拿来做构建顺序会破坏执行序。

**第 2 步：加入 ESM 语法作为"开发态"，构建期降级回 `__ns`**

两种路线，各有取舍：

| 路线 | 做法 | 优点 | 缺点 |
| --- | --- | --- | --- |
| A. 保持 `__ns` 原样 | 只补 `package.json` + 一个 `build.ps1`/`build.mjs` 按顺序拼包 | 零改造成本，`verify.ps1` 可继续做回归 | 依赖序靠人肉维护；无类型、无 tree-shaking；IDE 跳转弱 |
| B. ESM 开发 + 构建期转 `__ns` | 源码改 `import { a } from './x.js'`，构建脚本把 import/export 强行降级为 IIFE + `__ns` | 可接 Vite/TypeScript/ESLint；依赖有环立刻报错 | 需要写转换器；`__ns` 的"值快照"语义与 ESM 活绑定不一致，个别 case 会变语义 |

【建议】FF14 Idle 不要走 A。**直接上标准 ESM + Vite**，把"单文件 bundle"当成一个可选的发布目标（Vite 的 `build.lib` + `inlineDynamicImports` 就能产出单文件），而不是架构基础。`__ns` 唯一真正的优势是"file:// 双击即玩"，这一点用一个构建产物就能替代。

**第 3 步：构建脚本骨架（对应原 `build-pc` 的最小实现）**

```js
// build.mjs —— 复现 app.js 的拼接产物（对照 verify.ps1 的规则）
import fs from 'node:fs';
import path from 'node:path';

const ORDER = JSON.parse(fs.readFileSync('src/modules.order.json', 'utf8'));
const out = ["(function () {", "'use strict';", 'var __mods = {};',
             'function __ns(id) { if (!__mods[id]) __mods[id] = {}; return __mods[id]; }'];
for (const id of ORDER) {
  const body = fs.readFileSync(path.join('src', id), 'utf8').trim();
  out.push(`(function () {\nvar __m = __ns(${JSON.stringify(id)});\n${body}\n})();`);
}
out.push('})();');
fs.writeFileSync('dist/app.js', out.join('\n'));
```

【事实】该骨架的规则与 `verify.ps1:21-25` 完全一致，因此可直接用 `verify.ps1` 验证构建产物与官方 `app.js` 的非空行等价。

**第 4 步：把"数据表"从源码里剥出来**

【建议】原项目里最大的三个文件（`content.js` 5525 行、`items.js` 933 行、`professions.js` 739 行）本质是数据。FF14 Idle 应当把这些放成 `data/*.json`（或 `.ts` 常量），源码只留"规范化/派生"逻辑。理由见第 6 节：原项目的"数据字面量 + 事后原地改写"模式已经产生了大量隐式耦合。

### 1.4 模块系统的工程评价

| 维度 | 评价 | 依据 |
| --- | --- | --- |
| 可靠性 | 高。依赖无环 + 手写拓扑序，`verify.ps1` 可做逐行回归 | 环检测通过；`verify.ps1:35` |
| 可维护性 | 中。新增模块必须自己想清楚插在哪；插错位置=运行时 `undefined` 解构，报错点远离根因 | `app.js:4` 无校验 |
| 可测试性 | 低。没有模块导出到全局（除 `main.js` 调 `init()`），也没有测试文件 | 全树无 `*.test.js`；`modules.csv` 无测试模块 |
| 打包体积 | 未优化。33k 行全部进一个 1.6 MB 文件，无 tree-shaking | `app.js` 1,630,462 B |
| 循环依赖防护 | 靠约定 + 注释，不靠工具 | `inventory.js:11` 注释 |

---

## 2. 存档数据模型

### 2.1 存储分层

【事实】三层存储，职责清晰：

| 层 | 载体 | 存什么 | 代码 |
| --- | --- | --- | --- |
| 主存档 | `localStorage`（键前缀 `aow_save_`） | 全部游戏进度，一份 JSON | `save.js:29`、`save.js:53-107` |
| 大块数据 | `IndexedDB`（库 `aow_large` / v1 / store `blobs`） | 战报详细日志、远征 log、战场 mapTrace | `idb.js:9-11`、`idb.js:47-58` |
| 会话 | `localStorage`（键 `aow_game_session`） | 云存档 token/uid/username | `cloud-save.js:10`、`cloud-save.js:72-87` |

【事实】两者都用"适配器 + 内存回落"模式：

- `save.js:42-51` `makeMemoryStore()` 提供一个 Map 版 localStorage 替身；`store()` 在 `window.localStorage` 不可用时回落到它（`save.js:59-63`）。`isAvailable()` 用一次写/删探测（`save.js:65-74`）。
- `idb.js:22-24` `idbAvailable()`，所有 API 在无 IndexedDB 时走 `memStore()`（如 `idb.js:48-51`、`idb.js:61-63`）。

【推断】这个设计让同一份代码能在 Node 测试环境、无痕浏览器、file:// 场景下不崩。**这是本项目最值得直接照搬的基础设施决策之一。**

### 2.2 完整性校验：canonicalize + FNV-1a32

【事实】校验链路：

```js
// _idlewow/src/game/save.js:114-134
function canonicalize(value) {            // 递归按 key 排序，且排除 _integrity
  if (Array.isArray(value)) return value.map(canonicalize);
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(
    Object.keys(value).filter((key) => key !== INTEGRITY_KEY).sort()
      .map((key) => [key, canonicalize(value[key])]));
}
// ponytail: non-cryptographic checksum; use a server signature when cheat resistance matters.
function saveDigest(data) {               // FNV-1a 32bit
  const text = JSON.stringify(canonicalize(data));
  let hash = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) { hash ^= text.charCodeAt(i); hash = Math.imul(hash, 0x01000193); }
  return (hash >>> 0).toString(16).padStart(8, '0');
}
```

【事实】完整性元数据是存档内的 `_integrity` 字段：

```js
// _idlewow/src/game/save.js:147-157
function signedSave(data, sequence = 1) {
  const out = serializeState(data);
  delete out[INTEGRITY_KEY];
  out[INTEGRITY_KEY] = { version: 1, algorithm: 'fnv1a32', digest: saveDigest(out), sequence };
  return out;
}
```

| 字段 | 含义 | 用途 | 证据 |
| --- | --- | --- | --- |
| `version` | 校验格式版本（恒为 1） | 未来换算法时区分 | `save.js:140-143` |
| `algorithm` | 固定 `'fnv1a32'` | 同上 | `save.js:141` |
| `digest` | 规范化 JSON 的 FNV-1a32 | 检测篡改/损坏 | `save.js:143` |
| `sequence` | 每次保存 +1 的递增序号 | **云存档冲突判定主键** | `save.js:224-227`、`cloud-save.js:26-28` |

【事实】`verifySaveIntegrity` 对**没有** `_integrity` 的老档返回 `{ valid: true, legacy: true }`（`save.js:139`）——即"老档放过"。但注意 `loadGame` 走的是另一个更窄的门（见 2.4 的 release 门）。

【推断】作者自己在注释里承认这不是防作弊手段（`save.js:125`），它的真实目标是**检测损坏与误导入**，不是防改档。`sequence` 才是"实用价值最高"的字段：它被云存档用来判断新旧（`cloud-save.js:51-63`）。

### 2.3 主存档顶层字段（尽量完整）

【事实】权威定义在 `engine.js:222-261` 的 `newGame()`，并可由 `save.js` 的 `migrate()`（`save.js:304-716`）交叉验证。下表是完整清单：

| 字段 | 类型 | 语义 | 定义处 | 迁移补齐处 |
| --- | --- | --- | --- | --- |
| `version` | number | 存档结构版本（=30） | `engine.js:223` | `save.js:307` |
| `releaseVersion` | string | 写入时的游戏版本（=0.9.0） | `engine.js:224` | — |
| `saveBranch` | string | **发布分支标记**（=`'release'`） | `engine.js:225` | `save.js:260-265` 校验 |
| `saveId` | string | 存档槽 id，默认 `'main'` | `engine.js:226` | `save.js:308` |
| `updatedAt` | number | 最后保存时间戳（云冲突兜底比较用） | `engine.js:227` | `save.js:212` |
| `settings` | object | `{ storage, language, condensedLog, showTaskNotice, autoClean:{mode,threshold}, dungeonCollapsed:{}, taskCollapsed:{}, theme }` | `engine.js:228` | `save.js:309-321`；`theme` 见 `ui.js:935` |
| `guild` | object | 见 2.3.1 | `engine.js:229-239` | `save.js:322-368`、`446-449` |
| `members` | array | 会员数组，见 2.3.2 | `engine.js:240` | `save.js:369-371`、`478-572` |
| `presets` | array | 预设队伍，最多 6 个（`{id,name,memberIds}`） | `engine.js:241` | `engine.js:1897` |
| `inventory` | object | `{ items:[], materials:{}, consumables:{}, attachments:{}, artifacts:{} }` | `engine.js:242` | `save.js:372-382`、`629-631` |
| `legendary` | object | 橙装任务进度（按橙装 key） | `engine.js:243` | `save.js:402-406` |
| `progress` | object | `{ dungeons: { [id]: {cleared, runs} } }` | `engine.js:244` | `save.js:383-387` |
| `codex` | object | `{ bosses:[], events:[], artifacts:{} }` 图鉴 | `engine.js:245` | `save.js:388-391` |
| `achievements` | object | 成就领取状态 | `engine.js:246` | `save.js:394` |
| `stats` | object | `{expeditionWins, goldEarned, dailyDone, crafts, gathers, upgrades, disenchants, recruits}` | `engine.js:247` | `save.js:395` |
| `seenItems` | array | 已见过装备 id（图鉴点亮） | `engine.js:248` | `save.js:396` |
| `flags` | object | 迁移标记集合（`talentsMigrated`/`armorMigrated`/`inventoryClamped`/`migratedFrom` 等） | `engine.js:249` | `save.js:430`、`714` |
| `giftCodes` | object | `{ [code]: {redeemedAt} }` | `engine.js:250` | `save.js:431` |
| `tasks` | object | `{ quests:{...}, daily:{date,tasks,refreshedAt} }` | `engine.js:251-256` | `save.js:398-401` |
| `expeditions` | array | 进行中/待收获的远征（见第 3 节） | `engine.js:257` | `save.js:437-444` |
| `arena` | object | `{ badges, modes:{'2v2','3v3','5v5':{rating,wins,losses}}, replays:{mode:[]}, presets, essenceBuys, dailyBattles, opponentRefreshes }` | `engine.js:258` | `save.js:335-341`、`413-429`；`arena.js:83-104` |
| `heroes` | object | `{ owned:{}, quests:{} }` 史诗英雄 | `engine.js:259` | `save.js:432-434` |
| `battleground` | object | `{ honor, replays:{wsg:[],ab:[]} }` | `engine.js:260` | `save.js:342-348` |
| `worldBoss` | object | `{ defeated:{}, progress:{}, badges }` | *不在 newGame* | `save.js:331-334`（v25 新增） |
| `challenges` | object | `{ best:{}, replays:{}, presets:[] }` | *不在 newGame* | `save.js:350-353`（v28 新增） |
| `raids` | object | 各副本上次出战队伍 id 缓存 | *不在 newGame（`{}`）* | `save.js:435` |
| `gatherLogs` | array | 采集日志，上限 `GATHER_LOG_LIMIT` | *不在 newGame* | `save.js:450-451` |
| `reports` | array | 副本战报，上限 `REPORT_LIMIT` | *不在 newGame* | `save.js:407-409` |
| `_integrity` | object | 校验元数据（不参与自身摘要） | *保存时注入* | `save.js:149-155` |

【事实】`newGame()` 与 `migrate()` 的字段集**不一致**：至少 8 个顶层字段（`worldBoss`/`challenges`/`raids`/`gatherLogs`/`reports` + 各自子字段）只由迁移函数补齐，新档不"显式"初始化，而是靠 `migrate()` 在每次 `loadGame()` 时统一补默认。**这就是本项目处理 schema 演进的核心手法：`newGame` 只管"最小可用"，`migrate` 才是真正的 schema 定义源。**

#### 2.3.1 `guild` 子结构

```js
// _idlewow/src/game/engine.js:229-239
guild: {
  name, level, exp, gold,
  memberCap,                    // = min(100, 4 + level*2)，save.js:368 每次加载重算
  professions: defaultProfessions(),  // 15 个生活技能，各 {level:1, exp:0}
  gathers: {},                  // prof -> 采集挂机任务（见 3.4）
  mounts: {},                   // mountId -> 拥有数量
  tavern: { candidates: [], adRecruits, dailyRecruits, adRefreshes }  // 酒馆候选/每日计数
}
```

【事实】`memberCap` 每次加载都会被**重算覆盖**（`save.js:368`），因此存档里的值不可信、只是缓存。

#### 2.3.2 `members[]` 子结构

【事实】由 `makeMember`（`engine.js:190-209`）+ `migrate` 回填（`save.js:478-572`）共同定义：

```
id, name, race, class, role, level, exp, xpToNext,
equipment: { weapon|offhand|head|chest|hands|legs|feet|trinket|ring -> itemUid|null },
talents: [talentId], talentPoints: number,
skillSelections: { '1'|'10'|'20'|'40'|'60' -> skillId },
setEffects: { setId: { '2'|'3'|'5': branch } },
tankMode: bool, noAutoEquip: bool, tankOrder?: number,
mount: mountId|null,
heroId / heroSkillId / isEpicHero / growthMult / heroAcquiredAt,
defaultBranch?: string
```

【事实】9 个装备槽来自 `config.js:89`：
```js
const EQUIP_SLOTS = ['weapon','offhand','head','chest','hands','legs','feet','trinket','ring'];
```

#### 2.3.3 `inventory.items[]` 子结构

【事实】由 `makeItem`（`engine.js:60-63`）+ 前缀系统 + `save.js` 迁移共同定义：

```js
// _idlewow/src/game/engine.js:60-63
function makeItem(defId) {
  const def = ITEMS[defId];
  return { uid: uid(), id: defId, set: def ? def.set || null : null,
           equippedBy: null, upgrade: 0, enchant: null, professionAttachment: null, locked: false };
}
```

| 字段 | 语义 | 补充来源 |
| --- | --- | --- |
| `uid` | 唯一 id（`'uid_' + counter + '_' + rand`） | `engine.js:53-57` |
| `id` | 指向静态表 `ITEMS[id]` | `items.js:13` |
| `set` | 套装归属（冗余自 `ITEMS[id].set`，便于快速判定） | `engine.js:62` |
| `equippedBy` | 装备者 memberId 或 null | `engine.js:62` |
| `upgrade` | 强化等级 0..10 | `engine.js:1768-1779` |
| `enchant` | `{stat, value}` 或 null | `engine.js:1649-1688` |
| `professionAttachment` | `{type,id,stats}`（护甲片/磨刀石） | `save.js:601-609` |
| `locked` | 锁定（防自动替换/自动处理） | `save.js:600` |
| `prefix` / `prefixStats` / `baseStats` / `stats` | 词缀与派生属性（掉落时 roll） | `prefixes.js:42-71`、`engine.js:92-99` |
| `kind: 'artifact'` | 考古遗物（走独立计数，不入装备逻辑） | `engine.js:65-69` |

### 2.4 保存/加载：备份、隔离、隔离区

#### 保存（`save.js:211-236`，逐行语义）

```js
function saveGame(state) {
  state.updatedAt = Date.now();
  const saveId = state.saveId || 'main';
  const previous = storage.load(saveId);
  const previousCheck = verifySaveIntegrity(previous);
  if (previous && previousCheck.valid) {
    try { storage.save(BACKUP_SAVE_ID, previous); }        // ① 覆盖备份前，先把上一份有效档存为 main_backup
    catch (error) { if (!isQuotaExceededError(error)) throw error; storage.delete(BACKUP_SAVE_ID); }
  }
  const previousSeq = ...previous[_integrity].sequence : 0;
  const next = JSON.parse(JSON.stringify(signedSave(state, previousSeq + 1)));  // ② 序列化裁剪 + 签名 + 序号+1
  try { storage.save(saveId, next); }
  catch (error) {                                          // ③ 配额超限：先牺牲备份再写主档
    if (!isQuotaExceededError(error)) throw error;
    storage.delete(BACKUP_SAVE_ID); storage.save(saveId, next);
  }
  if (saveId === 'main' && saveObserver) saveObserver(next);  // ④ 观察者钩子（当前无人注册，见下）
}
```

【事实】`saveObserver` 通过 `setSaveObserver` 注册（`save.js:110-112`），并且导出了（`save.js:725`）。但我全树检索 `setSaveObserver` 的调用点，**只有定义与导出，没有任何调用方**。结合 UI 里那条横幅：

```js
// _idlewow/src/ui.js:183
const CLOUD_OFFLINE_NOTICE = '云存档功能即将下线，当前已无法上传，请尽快下载后保存，本地存档不受影响';
```

【推断】原本设计是"每次保存 → `saveObserver` → 自动上传云存档"，功能下线后调用点被移除，只留下空钩子。**这是"抽象层还在、实现已下线"的一种典型残留。**

#### 加载（`save.js:238-267`，含三道门）

| 顺序 | 条件 | 行为 | 行号 |
| --- | --- | --- | --- |
| 1 | 主档缺失或校验失败 | 把损坏档另存为 `main_corrupt`（取证），再尝试恢复 | `save.js:243-245` |
| 2 | 备份存在 + 校验通过 + **是 release 分支** | 备份回写 `main`，返回 `lastLoadIntegrityIssue='recovered'` | `save.js:247-251` |
| 3 | 主档有值但无效 | 删主档 + 删备份；非 release 则置 `lastLoadPurged` | `save.js:252-258` |
| 4 | **主档有效但不是 release 分支** | **直接删除主档与备份，返回 null（等于丢档）** | `save.js:260-265` |

【事实】第 4 条是"分支隔离"机制：

```js
// _idlewow/src/game/save.js:38-40
function isReleaseSave(data) { return !!(data && data.saveBranch === RELEASE_SAVE_BRANCH); }  // 'release'
```

【推断】它的用途是：测试版/私服分支的存档一旦落到正式站点，会被自动清掉，避免污染正式服（同时 `ui.js:471` 也在云端存档路径上做同样判断）。**代价是"任何未写 `saveBranch` 的合法存档都会被静默销毁"**。对 FF14 Idle 来说这是把双刃剑：如果未来要做"内测服/正式服"，这个机制很有价值；如果只有一个服，它就是一个纯粹的丢档风险点。【建议】保留机制，但改成"提示 + 让玩家手动选择导入"，而不是静默删除。

#### 导入导出（`save.js:275-301`）

```js
// 导出：Blob + <a download>，文件名 aow_save_<公会名>_<YYYY-MM-DD>.json
function exportSave(state) { ... JSON.stringify(signedSave(state, 1), null, 2) ... }   // save.js:275-287

// 导入：三重校验
function importSave(text, opts) {
  const data = JSON.parse(text);
  if (!data || typeof data !== 'object' || !data.guild || !Array.isArray(data.members))
    throw new Error('存档格式无效');                       // ① 结构 checklist
  if (!verifySaveIntegrity(data).valid)
    throw new Error('存档完整性校验失败，文件可能被修改或损坏'); // ② 摘要校验
  if (opts && opts.releaseOnly && !isReleaseSave(data))
    throw new Error('测试版存档不能导入正式版，请创建新公会');   // ③ 分支校验
  return migrate(data);                                    // ④ 迁移到当前版本
}
```

【事实】导出时 `sequence` 恒置为 1（`save.js:277`），导入后 `saveGame` 会从 `previousSeq`（本地现有档的序号）继续递增。

#### 序列化裁剪（`save.js:161-205`）——防"日志撑爆 localStorage"

【事实】`serializeState` 在写盘前，对 **5 个位置**做深度裁剪：

| 位置 | 被删除的字段 | 行号 |
| --- | --- | --- |
| `expeditions[].result` | `log`、`trace`、`diag` | `save.js:163-169` |
| `reports[]` | `log`、`diag` | `save.js:170-172` |
| `arena.replays[mode][]` | `log`、`diag` | `save.js:173-179` |
| `battleground.replays[type][]` | `log`、`mapTrace`、`engagements` | `save.js:181-187` |
| `challenges.replays[key][]` | `log`、`trace`、`diag`、`_replay` | `save.js:189-201` |

注释解释了动因：

```js
// _idlewow/src/game/save.js:159-160
// 序列化前裁剪：详细战斗日志与远征 trace（后期团本单场可达数 MB）只保留在会话内存，
// 不写入存档——避免数万行日志/回放数据撑爆 localStorage 导致收获卡死或失败
```

【事实】对应地，重内容走 IndexedDB，键前缀有三种（`ui.js:1660-1675`）：

```
'report:' + reportId   → 战报详细日志 { log }
'exp:'    + expId      → 远征日志 { log }
'bg:'     + replayId   → 战场回放 { log, mapTrace, engagements }
```

写入点在 `engine.js:172-175`（战报）、`engine.js:3003`（远征）、`arena.js:599`（竞技场回放），删除点在 `engine.js:175`、`engine.js:3034/3059`、`arena.js:597`。启动时用 `pruneLarge(largeDataKeys(state))` 清理孤儿（`ui.js:8130`、`ui.js:1660-1675`、`idb.js:119-134`）。

### 2.5 版本迁移：v1 → v30 的真实形态

【事实】`migrate()`（`save.js:304-716`）**不是**一条 v1→v2→…→v30 的链式迁移，而是两种手法的混合：

1. **声明式补默认**（无条件执行，作用等价于"幂等 schema 规范化"）：对每个字段做 `if (!state.X) state.X = 默认` 或类型纠正。
2. **条件式重写**（`if (fromVersion < N) { ... }`）：只在老档上执行的破坏性数据改写。

开头三行是关键：

```js
// _idlewow/src/game/save.js:305-308
const fromVersion = state.version || 1;   // ① 先捕获原始版本
state.version = CURRENT_VERSION;          // ② 立刻置为当前版本
state.saveId = state.saveId || 'main';
```

【事实】完整版本锚点表（每条都可复核）：

| 版本 | 内容 | 类型 | 行号 |
| --- | --- | --- | --- |
| v1 | 天赋、专业、材料、强化字段、战报列表的初始补默认 | 声明式 | `save.js:303`（注释）、`309-321` |
| v8 | M5 天赋重构：清空天赋与技能选择，按新里程碑重算天赋点 | 条件式 | `save.js:511-516` |
| v9 | 肉鸽移除，扫荡改为挂机远征（`expeditions` 数组） | 声明式+清理 | `save.js:436-444` |
| v10 | 生活技能公会化：会员个人专业合并到公会；采集挂机；附魔字段；消耗品仓库；材料表升级（`leather`→`light_leather`） | 条件式+声明式 | `save.js:445-466`、`569-571`、`599`、`629`、`641-645` |
| v11 | 套装效果选择 `setEffects` | 声明式 | `save.js:567-568` |
| v12 | M11 天赋技能重构：清理无效 id、全额返还天赋点、德鲁伊 `balance`→`resto` | 条件式 | `save.js:517-546`、`555-565` |
| v13 | 天赋点总数修正（Lv60 合计 9 点） | 条件式 | `save.js:547-554` |
| v14 | **战报/远征详细日志与 trace 不再持久化**，老档自动清理 | 声明式（每次加载都删） | `save.js:410-412` |
| v16 | 生产技能等级压缩 1~60 → 1~10（旧等级 ÷6，经验清空） | 条件式 | `save.js:467-476` |
| v17 | 橙装任务进度 `legendary` | 声明式 | `save.js:402-406` |
| v18 | 公会坐骑栏 `guild.mounts` | 声明式 | `save.js:328-329` |
| v19 | 公会任务系统 `tasks`（史诗任务 + 每日任务） | 声明式 | `save.js:397-401` |
| v20 | 成就/收集系统、统计计数、装备图鉴；背包上限 500 的裁剪 | 声明式+条件式 | `save.js:393-396`、`708-713` |
| v21 | 词缀属性全面封顶：老档词缀装备确定性重算；橙装/套装剥离词缀 | 条件式 | `save.js:647-675` |
| v22 | 装备数值 4 位小数规整（修浮点长尾） | 条件式 | `save.js:677-689` |
| v23 | 治疗向词缀由法强改为治疗加成（`holy`/`sage`/`enlight`） | 条件式 | `save.js:691-706` |
| v24 | 酒馆系统（候选列表 + 每日广告招募次数） | 声明式 | `save.js:355-361` |
| v25 | 世界 BOSS（击败记录/徽记/讨伐进度） | 声明式 | `save.js:330-334` |
| v26 | 竞技场 2v2/3v3/5v5 独立点数与徽章 | 声明式 | `save.js:335-341` |
| v27 | 战场（荣誉点 + 各类型回放） | 声明式 | `save.js:342-348` |
| v28 | 挑战系统（成绩榜/回放/独立预设） | 声明式 | `save.js:349-353` |
| v29 | 酒馆每日招募价格修复（重置当日计数为今日 0） | 条件式 | `save.js:362-366` |
| v30 | 生产附加物仓库 `inventory.attachments` | 声明式 | `save.js:630-631` |
| M30-3 | 旧治疗药水库存平移为对应低级绷带 | 条件式（按 flag 而非版本） | `save.js:632-640` |

【事实】版本号跳跃（14 之后直接 16）与"非版本号的迁移"（M30-3 用 `flags.bandageMigrated`）说明：**版本号并没有被严格当作迁移序号使用**，中间有过被合并/跳过的迁移。

【事实】迁移的正确性依赖**执行顺序**，作者自己踩过并留了注释：

```js
// _idlewow/src/game/save.js:467-468
// v16：生产技能等级压缩 1~60 → 1~10（旧等级 ÷6 四舍五入），经验清空按新曲线重升；Lv10 预留传说级
// 注意顺序：必须在 v10 会员个人专业合并（÷5）完成之后再压缩，否则旧档会先被 ÷6 再被 ÷5 覆盖
```

【事实】迁移末尾统一做数据卫生（`save.js:371-376`、`385-387`、`408`）：过滤非对象数组元素、把 `dungeons` 里非对象值剔除、截断超限数组。注释解释了原因：

```js
// _idlewow/src/game/save.js:370-371
// 数据卫生：长期存档可能因旧版本/导入产生残缺条目，剔除而不是让渲染崩溃
```

最后写入迁移痕迹：`state.flags.migratedFrom = fromVersion`（`save.js:714`）。

### 2.6 存档层的复用结论

一句话：**抽象层 + 摘要 + 备份/隔离区 + 序列化裁剪 + 声明式迁移**这五件套全部照搬（依据见 2.1~2.5）；**分支隔离（`saveBranch`）默认不要开**，**版本号不要当迁移序号用**。详细取舍见 10.1 / 10.2。

---

## 3. 游戏主循环与离线收益

### 3.1 结论先行：**没有"主循环"**

【事实】全项目 `setInterval` 只有 4 处，`requestAnimationFrame` 只有 2 处：

| 位置 | 频率 | 用途 |
| --- | --- | --- |
| `ui.js:8078` | 1000 ms | `tickExpeditions` —— 只推远征进度条 |
| `ui.js:8080` | 1000 ms | `tickGathers` —— 只推采集进度条 |
| `battleground_view.js:187` | —— | 战场观战回放步进 |
| `arena_battle_view.js:266-310` | —— | 竞技场回放步进（`setTimeout` 自递归） |
| `ui.js:8044` | rAF | 重绘后恢复滚动位置 |

【事实】没有任何"每 tick 产出金币/经验"的逻辑。全项目检索 `tick`（大小写敏感）、`离线`、`offline`、`挂机收益`、`lastSeen` 结果只有：进度条 tick、持续伤害 tick（战斗内）、以及两条注释。

```js
// _idlewow/src/game/engine.js:3007
// 推进远征状态：到时的 running → ready（离线重开也会结算已流逝时间）
```

【推断】**这个游戏的"放置"不是"自动增长"，而是"基于时间戳的状态机推进"。** 玩家的产出完全来自"派遣 → 等待 → 收获"的事件闭环，而不是每秒流水。这带来两个直接后果：

1. **离线收益无需专门计算**：因为进度是 `now - startTs` 的函数，重开页面时把 `running` 直接推成 `ready` 即可（`ui.js:8126-8127` 就是这么做的）。
2. **"离线收益"这个 UI 概念在原作里根本不存在**：没有"离线 N 小时获得 X 金币"的结算弹窗。

### 3.2 启动流程

```js
// _idlewow/src/ui.js:8120-8132（节选）
function init() {
  testMode = detectTestMode();                    // ui.js:385-395，localhost/file:// 自动测试模式
  if (typeof window !== 'undefined') window.__AOW_TEST_MODE = testMode;
  state = loadGame();                             // save.js:238-267
  if (lastLoadPurged) void clearLarge('');        // 存档被清 → 清空 IndexedDB
  if (state) {
    engine.refreshExpeditions(state);             // 离线到期的远征 → ready
    engine.refreshGathers(state);                 // 离线到期的采集 → ready
    void pruneLarge(largeDataKeys(state));        // 清 IndexedDB 孤儿
  }
  void initCloudSave(handleCloudSaveState);       // 云存档初始化（异步、失败不阻塞）
  ...
  document.addEventListener('click', ...);        // ui.js:8140-8272 全局事件委托
}
```

【事实】未读到存档时渲染开始页（`ui.js:3155-3165`），点击"创建公会"走 `handleAction('new-game')`（`ui.js:3234-3243`）→ `engine.newGame()`（`engine.js:211-264`）。

### 3.3 远征（expedition）：数据结构与全流程

#### 3.3.1 数据结构（`engine.js:2963-2998`）

```js
const exp = {
  id,                                     // uid()
  dungeonId,                              // 指向 DUNGEONS
  endRoomIdx,                             // 可选："只打到第 N 间就撤"
  memberIds: [...],                       // 出战会员 id
  consumables: [...],                     // 实际消耗的消耗品 id
  seed,                                   // 可复现种子（见下）
  roster: [ memberBattleSnapshot ],       // 阵容快照（重放的全部输入）
  pack: {...},                            // 消耗品配置（bombs/heals/statusBuffs/food/mods）
  firstAidLevel,                          // 急救等级（战斗中回血用）
  startTs: Date.now(),                    // 出发时间
  durationMs,                             // = 战斗回放总时长
  status: 'running' | 'ready',
  collected: false,
  condensedLog: bool,
  result: { win, gold, xp, loot[], diag[], log[], stats[], bossesKilled[], wipeRoom, trace: [] }
};
```

【事实】关键设计：**`durationMs` 不是策划拍的时间，而是战斗回放时长本身**：

```js
// _idlewow/src/game/engine.js:2207-2210
function expeditionDurationMs(trace) {
  // 远征总时长 = 战斗回放时长：普通行动 600ms/步，房间间休息按休息时长计入，保证动画播完时远征正好完成
  return tracePlaybackDurationMs(trace);
}
```

```js
// _idlewow/src/game/battle.js:3290-3305
function tracePlaybackDurationMs(trace) {
  let total = 0, prevAct = null;
  for (const e of trace || []) {
    const a = e && e.act;
    if (a && a === prevAct) continue;                                  // 同一次行动的事件合并为一步
    if (e && e.kind === 'roundhp') continue;                            // 血量摘要不占时间
    if (e && (e.kind === 'dotsettle' || e.kind === 'hotsettle')) { prevAct = a || null; continue; }  // 结算批 0 计时
    total += (e && e.kind === 'rest') ? (e.ms || ROOM_REST_MS)          // 房间休息 = 30s
      : (e && e.kind === 'dialogue') ? Math.round(PLAYBACK_STEP_MS / 2) // 对话 = 300ms
      : PLAYBACK_STEP_MS;                                               // 默认 600ms
    prevAct = a || null;
  }
  return Math.max(1000, total);
}
```

【事实】相关常量：`PLAYBACK_STEP_MS = 600`（`battle.js:668`）、`ROOM_REST_MS = 30000`（`battle.js:641`）。

【推断】这是一个**很聪明的一致性设计**：玩家在界面上看战斗动画播完的那一刻，远征正好完成，不需要额外解释"为什么打完了还要等"。代价是**远征时长被战斗规模绑死**（一个 20 人团本、多波小怪的 trace 可能有几千步 → 几十分钟），策划无法独立调节时长。

#### 3.3.2 派遣（`engine.js:2938-3005`）

```js
function dispatchExpedition(state, dungeonId, memberIds, consumables, opts) {
  const dungeon = DUNGEONS[dungeonId];
  if (!dungeon) return { error: '副本不存在' };
  const busy = busyMemberIds(state);
  const need = dungeon.team === 'raid' ? (dungeon.requireMembers || 20) : 1;
  let ids = memberIds && memberIds.length ? memberIds : null;
  if (!ids) { ids = recommendPartyIds(state, dungeon, busy); if (ids.length < need) return { error: '空闲会员不足，无法组成队伍' }; }
  // 生成可复现种子：动画事件不落盘，重放时用同一种子重跑战斗
  const seed = Math.floor(Math.random() * 0x7fffffff) >>> 0;
  const plan = planDungeon(state, dungeonId, ids, consumables, mulberry32(seed), opts);  // ← 立即模拟，判定胜负
  if (plan.error) return plan;
  const conflict = plan.memberIds.filter((id) => busy.has(id));                          // 二次忙碌校验
  if (conflict.length) return { error: names + ' 正在远征或采集挂机中，无法再次出击' };
  const consumed = consumeConsumables(state, plan.consumables);                          // 先校验后扣，避免白扣
  if (consumed.error) return consumed;
  const exp = { ... };
  state.expeditions.push(exp);
  saveGame(state);
  void putLarge('exp:' + exp.id, { log: exp.result.log });
  return { exp, dungeon, trace: plan.result.trace || [] };
}
```

【事实】要点清单：

| 要点 | 说明 | 行号 |
| --- | --- | --- |
| **派遣即结算** | 派遣瞬间就用 `planDungeon` 跑完整场战斗，结果存进 `exp.result`；等待期只是"冷却" | `engine.js:2950`、`2981-2997` |
| 种子来源 | `Math.random()` 取 31 位整数，随后所有战斗随机都用 `mulberry32(seed)` | `engine.js:2949-2950` |
| 忙碌冲突 | 两次检查（推荐编队时避开 + 扣消耗品前再确认） | `engine.js:2941`、`2952-2959` |
| 消耗品顺序 | 先校验→再扣→再入队，失败不扣 | `engine.js:2961-2962`、注释 `2960` |
| 测试后门 | `window.__AOW_TEST_FAST_EXPEDITION` 存在时 `durationMs=1, status='ready'` | `engine.js:2977-2978` |
| 日志分离 | `result.log` 进 IndexedDB；`result.trace = []` 不落盘（靠 seed 重算） | `engine.js:2996`、`3003` |

【事实】`memberBattleSnapshot`（`engine.js:2214-2249`）把"重放所需的全部输入"固化成快照：装备（含 `stats` 拷贝）、天赋、技能选择、套装效果选择、`tankMode/tankOrder`、英雄字段。注释说明动机：

```js
// _idlewow/src/game/engine.js:2212-2213
// 出战会员战斗快照：记录重放所需的全部输入（等级/天赋/技能/套装效果/装备），
// 远征途中改装备/天赋不影响已出发战斗的实时重放
```

#### 3.3.3 结算（`engine.js:3022-3065`）

```js
function collectExpedition(state, expId) {
  refreshExpeditions(state);
  const exp = list[idx];
  if (exp.status !== 'ready') return { error: '远征尚未完成' };
  const existingReport = state.reports.find(r => r.kind === 'expedition' && r.expeditionId === exp.id);
  if (existingReport) {                                     // ★ 幂等保护：已经结算过，直接返回旧结果
    list.splice(idx, 1); void delLarge('exp:' + exp.id); saveGame(state);
    return { dungeon, result: {...}, notes: existingReport.notes, gold: existingReport.gold, win: !!existingReport.win };
  }
  const recalc = (exp.seed && exp.roster.length) ? refreshExpeditionResult(exp) : { changed: false };  // ★ 用当前版本规则重算
  const res = applyDungeon(state, { dungeon, result: exp.result, memberIds, consumables, endRoomIdx, tankOrder, expeditionId: exp.id }, { kind: 'expedition' });
  list.splice(idx, 1); void delLarge('exp:' + exp.id); saveGame(state);
  if (recalc.changed) res.notes.unshift('⚠️ 战斗重算与派发时结算不一致（可能因版本更新），本次以当前战斗为准');
  return { dungeon, result: res.result, notes: res.notes, gold: res.result.gold, win: res.result.win };
}
```

【事实】三个值得注意的点：

1. **幂等保护靠"战报里是否已有同 expeditionId 的记录"**（`engine.js:3031`）—— 防连点收获导致双倍奖励。
2. **收获时用当前版本重算一次**（`engine.js:3046-3048` → `refreshExpeditionResult`，`engine.js:2319-2339`）。注释说明了理由：

   ```js
   // _idlewow/src/game/engine.js:3044-3045
   // 结算与回放一致：有种子+阵容快照时始终以当前版本重放为准；同版本重放与派发一致（changed=false 不提示），
   // 版本更新后重放与派发不同则以重放为准（与回放界面同源，避免"日志显示失败但战报显示胜利"的撕裂）
   ```
3. **"重算"意味着结果可被版本更新改变**：`refreshExpeditionResult` 会把 `win/gold/xp/loot/bossesKilled/wipeRoom` 全部覆盖（`engine.js:2326-2337`），只在 UI 上给一句提示。

【推断】第 3 点是双刃剑。好处是"回放与结算永远一致"（同一份代码、同一个种子）；代价是**玩家可能遭遇"我明明打赢了，更新后变成失败"**。FF14 Idle 如果要做赛季/版本更替，必须明确选择：要么冻结结果（用存档里的 `result`），要么像原作一样以重算为准 + 明确公告。

#### 3.3.4 收获后的奖励落地：`applyDungeon`（`engine.js:1973-2196`）

【事实】所有经济产出都集中在这一个函数里，顺序为：

| 步骤 | 内容 | 行号 |
| --- | --- | --- |
| 1 | 部分通关判定 `partial = !win && bossesKilled.length > 0` | `engine.js:1981` |
| 2 | 金币 = `(result.gold - bossGold) * raceGoldMult + bossGold * raceGoldMult * (1 + archaeologyBonus)` | `engine.js:1986-1993` |
| 3 | 公会经验 `state.guild.exp += dungeon.guildExp`（仅胜利） | `engine.js:1994` |
| 4 | 逐件战利品分流：坐骑 → 任务物品 → 材料 → 装备（`makeLootItem` 带随机词缀） | `engine.js:1996-2030` |
| 5 | 自动清理（自动卖/分解） | `engine.js:2038-2044` |
| 6 | 尾王专属材料 1~2 个 | `engine.js:2047-2055` |
| 7 | 英雄任务进度 `progressHeroQuestFromDungeon` | `engine.js:2061` |
| 8 | 奥妮克希亚专属通关奖励（副手/其他各一件） | `engine.js:2062-2071` |
| 9 | 任务计数器 + 每日任务 + 统计 | `engine.js:2074-2082` |
| 10 | 采集伴生（三种采集 35% 概率掉 1 材料） | `engine.js:2085-2093` |
| 11 | 布料掉落（按副本等级选布料，胜利 10 或 10+10） | `engine.js:2094-2097` |
| 12 | 酒馆刷新券（独立 30% 概率、每日上限 5） | `engine.js:2099-2101` |
| 13 | 元素精华（Lv30+ 副本 25% 概率） | `engine.js:2103-2106` |
| 14 | 逐会员经验/升级/天赋点（含等级差衰减） | `engine.js:2108-2141` |
| 15 | 副本通关进度 `state.progress.dungeons` | `engine.js:2143-2148` |
| 16 | 图鉴（击败首领名入 `codex.bosses`） | `engine.js:2150-2159` |
| 17 | 公会升级（`guildXpToNext`） | `engine.js:2161-2170` |
| 18 | 写战报 `pushReport` + `saveGame` | `engine.js:2175-2194` |

【事实】经验衰减公式：

```js
// _idlewow/src/game/engine.js:2110-2113
// 等级差经验衰减：队员等级高出副本（敌人）等级时，每高 1 级经验 -20%，高 5 级及以上无经验
const lvGap = Math.max(0, m.level - dungeon.level);
const lvXpMult = Math.max(0, 1 - lvGap * 0.2);
const gained = Math.round(result.xp * (race.xpMult || 1) * lvXpMult);
```

### 3.4 采集挂机（第二条"放置"线）

#### 3.4.1 时长档位与数据结构

```js
// _idlewow/src/game/engine.js:2356-2357
// 时长档位（分钟）
const GATHER_DURATIONS = [30, 60, 120, 240, 480, 720];
```

```js
// _idlewow/src/game/engine.js:2405-2414
state.guild.gathers[prof] = {
  prof, memberIds, startTs: now, endTs: now + durationMinutes * 60000,
  durationMinutes, tier, status: 'running'
};
```

【事实】每个采集专业同时只能有一支队伍（`engine.js:2386`），每队最多 5 人（`engine.js:2390`），成员占用与远征共用同一套 `busyMemberIds`（`engine.js:2378-2380`）。

#### 3.4.2 收益公式（`engine.js:2454-2538`）

```js
const durMult = dur === 30 ? 1 : dur === 60 ? 2.2 : dur === 120 ? 4.5 : dur === 240 ? 9 : 18;
const expMult = dur === 30 ? 1 : dur === 60 ? 1.1 : dur === 120 ? 1.25 : dur === 240 ? 1.45 : 1.7;
const lvlMult = 1 + (skillTier - 1) * 0.25;
const rate    = max(0.4, 1 - (tier - 1) * 0.1);        // 目标档越高，产出率越低（engine.js:1275-1277）
const baseYield = durMult * memberCount * lvlMult;
const fullTotal = floor(baseYield * rate * (1 + mountBonus));   // mountBonus 上限 +50%（engine.js:2489）
const total = floor(fullTotal * elapsedRatio);                 // elapsedRatio 支持"中途收获按比例"
```

【事实】时长倍率是**超线性**的：30→1、60→2.2、120→4.5、240→9、480/720→18。即 12 小时（720 分）的收益是 30 分钟的 18 倍，而时间只多了 24 倍——**长时间挂机其实是次线性收益**（每单位时间收益递减）。而经验倍率（1→1.7）几乎线性。【推断】这是有意的"防挂机垄断"设计：鼓励玩家定期回来收菜，而不是挂 12 小时。

【事实】其他产出细节：

- 高档采集额外带回低档材料，数量 = 目标档数量的 20%~30%（`engine.js:2506-2516`）
- Lv40+ 会员每小时 5% 概率出元素精华，坐骑可提升（`engine.js:2519-2532`）
- 经验 `fullExp = round(baseYield * 8 * expMult * tierExpMult)`，`tierExpMult = 1 + (tier-1)*0.5`（`engine.js:2533-2536`）

#### 3.4.3 收菜流程

```js
// 每 1000ms：ui.js:8049-8071 tickGathers()
for (const g of Object.values(gs)) {
  if (g.status !== 'running') continue;
  const elapsed = max(0, Date.now() - g.startTs);
  const total   = max(1, g.endTs - g.startTs);
  ...更新进度条 width/textContent...
  if (elapsed >= total) completed = true;
}
if (completed && engine.refreshGathers(state) > 0) { renderAll(); flash('⛏️ 有采集队已返回，可以收获材料'); }
```

【事实】注意 `tickGathers` **每秒只更新进度条（直接改 style/文本，不重绘）**，只有在"有任务完成"时才 `renderAll()`。远征 tick 同理（`ui.js:7889-7915`）。

【推断】这是全项目 UI 性能做得最好的地方：1 Hz 的 DOM 操作只改 2 个节点/任务，避免每秒整页重绘。

### 3.5 上限与防作弊盘点

| 机制 | 位置 | 强度评价 |
| --- | --- | --- |
| 成员占用去重（远征+采集共用） | `engine.js:2378-2380` | 强（服务端无关，逻辑自洽） |
| 收获幂等（按 expeditionId 查战报） | `engine.js:3031-3043` | 强 |
| 战报/回放数量上限（10/10/10） | `config.js:9-11` | 强 |
| 背包上限 500 + 自动清理与丢弃 | `inventory.js:15`、`inventory.js:68-87` | 强 |
| 每日次数上限（酒馆 5/20、竞技场 20、战场 20） | `engine.js:318-319`、`arena.js:79-80`、`battleground.js:58` | 中（用 `dailyDate()` 客户端日期，可改系统时间绕过） |
| 存档摘要校验 | `save.js:113-157` | **弱**（FNV-1a 非加密，且注释自认） |
| 时间基于 `Date.now()` | 全项目（`engine.js:2976`、`3012`、`2405`、`2425`） | **弱**：改系统时钟可直接缩短等待 |
| 云端权威 | 无。云存档只做"下载覆盖"，**不支持上传** | — |

【事实】`cloud-save.js` 只暴露 `downloadCloudSave`（`cloud-save.js:146-180`），**没有上传接口**；`saveObserver` 也没有注册者（2.4 节）。所以**当前版本的云存档是"只读下载"**。

【事实】另一处可疑的"测试后门"是 `window.__AOW_TEST_FAST_EXPEDITION`（`engine.js:2977-2978`）和 `window.__AOW_CLOUD_LOGIN/LOGOUT`（`ui.js:8134-8138`）——它们被无条件挂在 `window` 上，正式站点也生效。【推断】这属于"测试钩子进了生产"，风险中等（`__AOW_CLOUD_LOGIN` 会弹出登录框，不构成提权；`__AOW_TEST_FAST_EXPEDITION` 可能让玩家瞬间完成远征，但需要能执行 JS，而能执行 JS 的玩家本来也能直接改 `Date.now`）。

【建议】FF14 Idle 若要防作弊，只有一条可靠路径：**服务端权威时间**（发放任务时服务端记录 `startAt`，收获时服务端校验 `now >= startAt + duration`）。客户端只做乐观 UI。

---

## 4. 战斗系统实现

这一节是本项目最有价值的部分：它把一个 MMO 战斗抽象成了**可确定性重放、可自动运行、可被 AI 编写**的模拟器。

### 4.1 战斗的两级结构

【事实】战斗分两级：**副本（dungeon）→ 房间（room）→ 波次（wave）→ 回合（round）→ 行动（act）**。

```js
// _idlewow/src/game/battle.js:4139-4256（runDungeon 主循环，节选）
for (let i = 0; i <= endIdx; i++) {
  const room = dungeon.rooms[i];
  resetBattleStats();
  const waves = buildRoomWaves(room, dungeon);            // battle.js:487-512 支持 room.mobs / room.adds / 多波
  enemies = waves.length ? waves[0].enemies : [];
  applyRoomStatusBuffs(party, ctx.statusBuffs, log, trace);  // 消耗品:全队 buff
  addOpeningSummons(enemies, party);                       // 战斗开始的召唤物
  applyOpeningDots(enemies, party, log, trace, r);          // 战斗开始的 DoT
  pushSnapshot(trace, party, enemies, room.name);           // 回放快照
  const result = fightRoom(party, enemies, log, r, room.name, trace, ctx, waves.slice(1));
  if (!result.win) { wipeRoom = room.name; break; }         // 团灭 → 中止
  ...rollLoot / 金币 / 休息 / 复活...
}
```

### 4.2 属性系统（`computeStats`，`battle.js:222-321`）

【事实】属性计算是**加法桶 + 乘法桶**的混合，所有来源都显式列出。核心代码：

```js
// 主属性 = 职业成长 × 等级 × 英雄倍率 + 装备加成
const attrs = {
  str: Math.round(g.str * lvl * heroMult) + (gearSum.str || 0),
  agi: Math.round(g.agi * lvl * heroMult) + (gearSum.agi || 0),
  int: Math.round((Math.round(g.int * lvl * heroMult) + (gearSum.int || 0)) * (race.intMult || 1)),
  sta: Math.round(g.sta * lvl * heroMult) + (gearSum.sta || 0)
};
const mult = 1.1;                                          // battle.js:262 固定的"原满士气基准"
const atkLvTerm = lvl * 4;
let atkRaw = (cls.apType === 'str' ? attrs.str * 1.8
  : cls.apType === 'agi' ? attrs.agi * 1.5 + attrs.str * 0.5
  : cls.apType === 'mix' ? attrs.agi * 1.5 + attrs.str * 1.0 : 0) + atkLvTerm + (gearSum.attack || 0);
let spRaw = attrs.int * 1.2 + lvTerm + (gearSum.spellPower || 0);
```

【事实】完整属性键与来源（`battle.js:291-320`，共 27 个键）：

| 属性 | 公式要点 | 行号 |
| --- | --- | --- |
| `maxHp` | `(baseHp + sta*10) * 1.1 * 种族hpMult * (1+天赋+套装) * (1+形态)` + 装备 maxHp | `292` |
| `attack` / `spellPower` | `atkRaw * 种族atkMult * (1+天赋+套装) * (1+形态) * 1.1`；`spRaw` 同构 | `293`、`295` |
| `armor` | `(基础 30/35+8*lvl 或 10+1.5*lvl + 装备 + agi*0.5) * (天赋+套装+形态+种族)` | `287`、`296` |
| `speed` | `lvl + baseSpeed + agi*0.15 + 装备 + 种族 + 天赋 + 套装` | `297` |
| `crit` | `0.05 + 主属性/(10或12 + 0.6*lvl)/100 + 装备 + 种族 + 天赋 + 套装 + 形态`，**上限 0.5，溢出 1:1 转暴伤** | `284-290`、`298`、`307` |
| `dodge` / `parry` | `min(0.45, 0.02 + agi*0.0005 + ...)` / `min(0.4, 0.02 + agi*0.0004 + ...)` | `299-300` |
| `block` / `blockValue` | 仅坦克基础职业：`min(0.4, 0.03 + str*0.0005 + ...)` / `str * 0.8` | `301-302` |
| `spellResist` | `(resistBase + int*1.5) * (1+天赋) + 装备` | `304` |
| `healMult` | 乘法桶：`种族 * (1+天赋+套装+装备) * (1+形态)` | `305` |
| `hotMult` / `dotMult` / `shieldMult` / `aoeMult` / `dmgBonus` / `dmgReduce` | 纯加法桶 | `306`、`308-313` |
| `critDmg` | `1.5 + 天赋 + 暴击溢出` | `307` |
| `spellDmgReduce` / `physDmgReduce` / `ccResist` / `firstStrike` | 按来源减伤 / 反控 / 先手 | `316-319` |

【事实】"暴击溢出转暴伤"这段是典型的好设计（`battle.js:288-290`）：`const critOverflow = Math.max(0, rawCrit - 0.5);` —— 超过 50% 上限的部分按 1:1 变成暴击伤害，堆过头不浪费。

### 4.3 回合与行动顺序（`fightRound`，`battle.js:3723-3877`）

【事实】一个回合的完整结算顺序（这是战斗系统最核心的一段）：

| 阶段 | 内容 | 行号 |
| --- | --- | --- |
| 1 | `applyPartyAuras` / `applySelfAuras` / `applyPeriodicPartyBuffs` | `3727-3729` |
| 2 | 输出"第 N 回合"标记 + 趣味对话（每 5~6 回合）；精简模式下记录血量快照 | `3733-3757` |
| 3 | 套装"低血量护盾"（<35% 每次战斗 1 次）+ 被动 `onLowHp` + 英雄被动 | `3758-3776` |
| 4 | 投掷炸弹（消耗品） | `3777` |
| 5 | **按速度排序行动顺序**，同速比攻击力 | `3778-3779` |
| 6 | 逐单位行动（敌人 `enemyAct`；团本 BOSS 可 `doubleAction` 二动） | `3780-3789` |
| 7 | 我方行动：解毒 → 治疗图腾 → `memberAct` → 急救/药水 | `3791-3817` |
| 8 | 虚无召唤每回合 AOE；召唤物自爆/到时消失；BOSS 图腾与光环 tick | `3821-3861` |
| 9 | **回合末 DoT 结算 + HoT 结算**（各自合并为一次 act） | `3863-3872` |
| 10 | buff 计时递减 `tickBuffs` + 输出统计事件 `aggregateStats` | `3873-3874` |

```js
// _idlewow/src/game/battle.js:3778-3779
const speedOf = (a) => a.stats.speed + (a.buffs.speedBonus ? a.buffs.speedBonus.value : 0);
const order = aliveParty.concat(aliveEnemies).sort((a, b) => (speedOf(b) - speedOf(a)) || (b.stats.attack - a.stats.attack));
```

【推断】这是"ATB/半即时"的回合制简化：没有真正的行动条，而是**每回合全员按速度重排**。这意味着速度只影响"同一回合内谁先动"，不影响"谁多动"。**这是一个刻意的简化**，好处是模拟结果与回合数线性对应、易于回放（每回合固定一组行动），坏处是速度属性的收益上限很低（只要快过对方即可，多余速度无效——除了治疗抢治疗时机）。

### 4.4 技能优先级 AI（`chooseSkill`，`battle.js:2116-2201`）

【事实】这是"自动战斗可玩性"的关键函数。它分两步：

**第一步：算"此刻是否可用"（`usable`，`battle.js:2130-2193`）** —— 每种技能类型有自己的门槛判断：

| 技能类型 | 使用条件 | 行号 |
| --- | --- | --- |
| `resurrect` | 有死人且本场未用过 | `2132-2133` |
| `partyHeal` | 有人 ≤40% 血（特定技能）或受伤人数 ≥3 | `2134-2135` |
| `heal`/`hot` | 最低血者 <85% 或有人 <40% | `2136-2138` |
| `shield` | 开场无盾 / 低于 survival 阈值 / 治疗职业有缺口 / 自己 <50% | `2139-2143` |
| `taunt` | 必须是坦克；存在"目标不是自己"的敌人；副 T 在主 T 存活时不对 BOSS 嘲讽 | `2144-2156` |
| `aoe` / `control` / `silence` | 敌人 ≥2（或 `singleTarget` 时 ≥1）/ 存在未被控·未被免疫的敌人 / 存在未被沉默的敌人 | `2157-2163` |
| `dispel` | 敌人有可驱增益 **或** 队友有可驱减益/DoT | `2164-2171` |
| `debuff` / `dot` | 存在没有该减益（或"自己这个 DoT"）的敌人 | `2174-2177` |
| `buff` / `aura` / `totem` | 自己缺该 buff / 全队没有治疗图腾 | `2178-2186` |
| `attack` | 普通可用；`executeOnly` 需目标 <30% 血 | `2187-2189` |

**第二步：按优先级列表取第一个可用的（`battle.js:2194-2200`）**

```js
// 兜底：手工构造/旧数据战斗单位没有 skillPriority 时，按职责 AI 默认偏好排序
const priority = priorityOverride || actor.skillPriority
  || orderSkillsByRole(actor.skills.filter(s => s.type !== 'passive' && s.type !== 'form'), actor.role);
for (const id of priority) { const s = ready.find(x => x.id === id); if (s && usable(s)) return s; }
return null;
```

【事实】优先级列表有两个来源：

1. **玩家配置**：`buildSkillPriority`（`battle.js:162-168`）、`skillPriorityOf`（`skills.js`）、UI 的"技能优先级弹窗"（`ui.js:5345`）、以及 `engine.moveSkillPriority`（`engine.js:1116-1132`）。
2. **职责默认**：`orderSkillsByRole`（`battle.js:116-160`），按 `role`（坦克/治疗/输出）给不同偏好序。

【推断】这个"门槛 + 优先级"的两段式设计非常值得照搬：它把"AI 智能"和"玩家意图"解耦了——玩家只调顺序，不改门槛。这样即使玩家把技能顺序调得很怪，AI 也不会把复活术用在满血队友身上。

### 4.5 职业定位与角色推导

【事实】三层角色定义：

| 层 | 定义处 | 内容 |
| --- | --- | --- |
| 职业默认 | `classes.js:12-67` | 每职业 `role`（坦克/治疗/输出）、`canTank`、`armorType`、`critSource`、`apType`、`growth` |
| 形态覆盖 | `battle.js:109-113` | 德鲁伊三形态：`cat`（输出）/`bear`（坦克，isTank）/`moonkin`（治疗） |
| 专精推导 | `battle.js:91-108` | 按天赋投入分支推导真实定位 |

```js
// _idlewow/src/game/battle.js:95-107
const bp = branchPoints(member.class, member.talents);       // 各分支投入点数
const sorted = Object.keys(bp).sort((a, b) => (bp[b] || 0) - (bp[a] || 0));
const maxBranch = sorted[0] || null;
const ROLE_MAP = {
  warrior: { prot: '坦克', arms: '输出', fury: '输出' },
  paladin: { prot: '坦克', holy: '治疗', ret: '输出' },
  priest:  { holy: '治疗', disc: '治疗', shadow: '输出' },
  shaman:  { resto: '治疗', elem: '输出', enhance: '输出' },
  druid:   { guardian: '坦克', resto: '治疗', feral: '输出' }
};
```

【事实】9 个职业的成长表（`classes.js:12-67`）示例：

```js
warrior: { role: '坦克', canTank: true, growth: { str: 2, agi: 1, sta: 3.5, int: 0.5 },
           baseHp: 300, baseSpeed: 42, resistBase: 150, armorType: 'plate', critSource: 'agi', apType: 'str' },
rogue:   { role: '输出', growth: { str: 1.5, agi: 3.5, sta: 1.5, int: 0.5 },
           baseHp: 200, baseSpeed: 50, resistBase: 150, armorType: 'leather', critSource: 'agi', apType: 'agi' },
```

【事实】10 个种族被动（`config.js:14-79`）以"属性倍率字典"的形式给出，例如 `human: { dmgReduce: 0.05 }`、`gnome: { intMult: 1.05 }`、`tauren: { hpMult: 1.1 }`；种族还带 `allowedClasses` 白名单，并由 `raceAllowsClass`（`config.js:82-85`）校验。

### 4.6 天赋与套装

【事实】天赋结构（`talents.js:10-24`）：

```js
const TALENT_POINT_LEVELS = [5, 15, 25, 30, 35, 45, 50, 55, 60];   // 9 个天赋点
const TIER_BUDGET = { 5: 1.0, 15: 1.1, 25: 1.2, 30: 1.3, 35: 1.4, 45: 1.5, 50: 1.6, 55: 1.8 };
function talentPointsForLevel(level) { return TALENT_POINT_LEVELS.filter(l => level >= l).length; }
```

【事实】天赋效果的"当量预算"函数（`talents.js:31-72`）把不同单位的效果折算成同一个标量，用来做同级平衡：

```js
b += (e.attackMult || 0) / 0.10;   // 攻强 +10% = 1 当量
b += (e.hpMult    || 0) / 0.12;    // 生命 +12% = 1
b += (e.armorMult || 0) / 0.15;    // 护甲 +15% = 1
b += (e.critBonus || 0) / 0.04;    // 暴击 +4%  = 1
b += (e.speedBonus|| 0) / 5;       // 速度 +5   = 1
b += (e.dmgReduce || 0) / 0.05;    // 减伤 -5%  = 1
b += (e.firstStrike|| 0) / 0.20;   // 先手 +20% = 1
```

【事实】套装结构（`sets.js:18-67`）：

```js
const SET_TIERS = ['t0', 't1', 't2'];       // 27 套 = 9 职业 × 3 梯队
const SET_PARTS = ['head','chest','hands','legs','feet'];
const SET_PIECES = ['2','3','5'];           // 2/3/5 件三个档位
// 数值模板：每项为 [T0, T1, T2]
const N = {
  atkDmg: [0.04, 0.06, 0.08], atkDmgBig: [0.10, 0.13, 0.16], atkDmgBig2: [0.12, 0.15, 0.20],
  crit:   [0.02, 0.03, 0.04], speed: [2, 3, 5], cdr: [0.08, 0.10, 0.12], lowHp: [0.10, 0.14, 0.18], ...
};
```

【事实】套装档位效果可以由玩家**三选一**（分支持向），存在 `member.setEffects[setId]['2'|'3'|'5'] = branch`（`save.js:567`、`engine.selectSetEffect` 于 `engine.js:1134-1153`）。

【事实】套装效果分两类（`sets.js:11-13` 注释）：

- **常驻类**（并入 `computeStats`）：`attackMult/spellMult/healMult/hpMult/armorMult/critBonus/speedBonus/threatMult/dodgeBonus/parryBonus/blockBonus`
- **行为类**（战斗引擎 hook）：`cdr/counterAttack/dodgeHeal/lowHpShield/...`

### 4.7 词缀系统（掉落随机化）

【事实】`prefixes.js:13-31` 定义了 13 个职责前缀，每个是"当量分配方案"：

```js
smash: { id: 'smash', name: '猛击的', role: '物理输出', profile: { str: 0.4, attack: 0.35, crit: 0.25 } },
holy:  { id: 'holy',  name: '圣光的', role: '治疗',     profile: { int: 0.5, healMult: 0.4, sta: 0.1 } },
```

【事实】当量权重表（`prefixes.js:37`）：

```js
const W = { attack: 1, spellPower: 1, str: 1, agi: 1, int: 1, sta: 0.6, crit: 25, dodge: 25,
            parry: 33, block: 20, speed: 0.2, armor: 0.01, spellResist: 1, healMult: 8.333 };
```

【事实】核心思路写在注释里：

```js
// _idlewow/src/game/prefixes.js:9-10
// 固定基础属性（武器攻击/法强、盾牌护甲格挡、防具护甲等）由模板确定；
// 其余当量预算按前缀方向随机生成，同一模板任意前缀总当量一致，不掉「废件」。
```

【事实】`extractBaseStats`（`prefixes.js:42-60`）决定哪些属性是"固定基础"，其余算作"次级预算"由前缀分配；`secondaryBudget`（`prefixes.js:63-71`）计算预算；`applyPrefixToItem` 写回 `item.stats`。

【推断】这是一套**"数值预算守恒"的随机化**：随机只改变属性分布，不改变总量。它同时解决了三个问题：掉落有随机感、不会出现废件、平衡可验证（`itemBudget`/`talentBudget` 都能算）。**对 FF14 Idle 有极高复用价值**。

### 4.8 伤害管线（`applyDamage`，`battle.js:739-839`）

【事实】伤害计算经过的修正（按代码顺序）：

| 步骤 | 修正 | 行号 |
| --- | --- | --- |
| 1 | 等级差：攻方等级低则伤害下降（每级 -5%，下限 -50%） | `battle.js:208-211` |
| 2 | 等级差：守方等级低则受伤增加（每级 +10%，上限 +100%） | `battle.js:212-215` |
| 3 | 闪避 / 招架 / 格挡判定（含等级差惩罚） | `battle.js:216-218` 及 `applyDamage` 内部 |
| 4 | 护甲减免（物理）/ 法术抗性减免：`min(0.4, res/(res + 500 + 50*casterLevel))` | `battle.js:193-197` |
| 5 | BOSS 光环增伤 / 易伤 | `battle.js:699-713`、`725-738` |
| 6 | `dmgReduce` / `spellDmgReduce` / `physDmgReduce` | `battle.js` 内 |
| 7 | 护盾吸收（`target.buffs.shield`） | 同上 |
| 8 | 记录 `battleStats`（dmg/taken）与回放事件 `traceEv` | 同上 |

【事实】PvP 有独立的缩放函数：`pvpScaleDamage` / `pvpScaleHeal`（`battle.js:686-690`）。

### 4.9 可复现随机与战报回放

【事实】随机源是可注入的：

```js
// _idlewow/src/game/rng.js:6-16
// 随机工具：默认使用 Math.random，测试时可注入 mulberry32
function mulberry32(seed) { let a = seed >>> 0; return function () { ... }; }
```

所有模拟函数的签名都带 `rng` 参数：`runDungeon(dungeon, party, rng, opts)`（`battle.js:4139`）、`runRoomBattle`、`fightRound(party, enemies, log, rng, trace, ctx, round, state)`（`battle.js:3723`）、`simulatePvp(teamA, teamB, log, rng, opts)`（`battle.js:4520`）。

【事实】事件流（trace）是回放的唯一数据源。事件类型与用途：

| 事件 `kind` | 含义 | 产生点 |
| --- | --- | --- |
| `snapshot` | 双方单位血量/存活/目标快照 | `pushSnapshot` `battle.js:4041-4052` |
| `round` | 回合标记 | `battle.js:3734` |
| `roundhp` | 回合开始血量摘要（精简模式） | `battle.js:3748-3756` |
| `dialogue` | 趣味对话 | `battle.js:3741` |
| `rest` | 房间间休息（带 `ms`） | `battle.js:4224` |
| `revive` | 阵亡苏醒 | `battle.js:4233` |
| `dmg` / `heal` / `tick` / `shield` / `dot` / `debuff` / `buff` / `aura` / `totem` / `control` / `splash` / `death` | 战斗动作 | `traceEv` 调用点（全文件 148 处） |
| `totem_tick` / `aura_tick` | BOSS 图腾/光环 | `battle.js:3920`、`3943` |
| `hotsettle` / `dotsettle` | 回合末结算批（0 计时） | `battle.js:3869` |
| `stats` | 本回合统计 | `battle.js:3874` |

【事实】`act`（行动序号）是"回放步进"的粒度控制手段：同一次行动内的多个事件共享同一个 `act`，`tracePlaybackSteps`（`battle.js:3276-3287`）与 `tracePlaybackDurationMs` 都会把它们合并为一步。

【事实】回放路径有两条：

1. **实时重算**（远征/挑战）：`replayExpedition(exp)`（`engine.js:2252-2315`）用 `exp.seed + exp.roster + exp.pack` 重建 `makeActor`，再 `runDungeon(..., mulberry32(exp.seed))`。
2. **读取持久化 trace**（竞技场/战场）：`putLarge('report:'+id, {log, trace})`（`arena.js:599`）、`putLarge('bg:'+id, {...})`（`battleground.js`）。

【事实】`replayExpedition` 里有一段重要的一致性处理：

```js
// _idlewow/src/game/engine.js:2308-2313
if (exp.condensedLog) {
  const rec = condenseBattleRecord(result.log, result.trace);
  result.log = rec.log;
  // 精简模式只精简文字日志；回放 trace 保留完整，让实时战斗/回放/战斗日志共用同一条时间轴
  // （scale=1），避免压缩回放按完整远征时长等比例放大导致休息等单步时长失真
}
```

#### 4.9.1 一个重要的事实：**只有战斗模拟是确定性的，奖励不是**

【事实】`runDungeon` 内部所有随机都用注入的 `rng`（`battle.js:4082-4088` 的 `rollLoot`、`4212`/`4217` 的金币 `randInt(r, ...)`）。但 `applyDungeon` 里有一部分奖励用**裸 `Math.random()`**：

| 位置 | 内容 |
| --- | --- |
| `engine.js:2051` | 尾王专属材料数量 `Math.floor(Math.random() * 2) + 1` |
| `engine.js:2066` | 奥妮克希亚通关奖励抽取 `pick(Math.random, ...)` |
| `engine.js:2089` | 采集伴生 35% 判定 `Math.random() < 0.35` |
| `engine.js:2096` | 布料数量 `Math.random() < 0.3 ? 10 : 0` |
| `engine.js:2104` | 元素精华 25% 判定 `Math.random()` |
| `engine.js:2657` | 礼包码送坐骑 `Math.random()` |
| `engine.js:98` | 掉落词缀 `pick(Math.random, pool)` |
| `engine.js:2500/2510/2512/2527/2528` | 采集产物、元素精华 |

【推断】这造成一个内部不一致：**回放能精确复现"战斗过程"，但复现不了"战利品"**。所以 `refreshExpeditionResult`（`engine.js:2319-2339`）的 `changed` 判定只比 `win` 和 `loot`（`engine.js:2325`），而 `loot` 来自 `runDungeon`（确定性的），不会漂移——这个设计**碰巧自洽**。但 `applyDungeon` 里那部分 `Math.random` 奖励，无法回放、无法审计、也**无法通过种子复现**。【建议】FF14 Idle 应把所有随机统一走注入的 RNG，这样"整局可复现"才是真的。

### 4.10 PvP 与战场（另一套战斗管线）

【事实】竞技场战斗复用 `makeActor`，但用**另一套回合驱动**：

```js
// _idlewow/src/game/battle.js:4288-4292
// ===== 竞技场 PvP（M22）：对称战斗、无仇恨、策略选目标、100 回合上限 =====
const ARENA_MAX_ROUNDS = 100;
```

| 函数 | 作用 | 行号 |
| --- | --- | --- |
| `pvpPickTarget(enemies, tactic, rng)` | 按策略选目标（集火治疗等） | `4293-4308` |
| `pvpDefenderReact(attacker, skill, target, res, ...)` | 防守方反应（招架后反击等） | `4309-4335` |
| `pvpAct(actor, party, enemies, log, trace, rng, tactic)` | 单位行动 | `4336-4417` |
| `setupPvpTeams(teamA, teamB)` | 双方初始化 | `4418-4435` |
| `pvpRoundStep(teamA, teamB, log, trace, rng, opts)` | 单回合 | `4436-4519` |
| `simulatePvp(teamA, teamB, log, rng, opts)` | 主循环 | `4520-4554` |

【事实】PvP 的关键差异：**无仇恨系统，改为策略选目标**（`arena.js:41-45` 的 `ARENA_MODES`；`battle.js:4293` 的 `pvpPickTarget`）。且胜负可返回 `null`（平局/超时），`arena.js:546` 对此有专门处理：`const delta = win === null ? 0 : arenaRatingDelta(...)`。

【事实】战场（`battleground.js`）是**第三套**模拟：地图移动 + 遭遇战，两者一体化（`battleground.js:20-27` 注释）。常量：

```js
const BG_TYPES = { wsg: { teamSize: 10, turnCap: 100, winScore: 3 }, ab: { teamSize: 20, turnCap: 150, winScore: 2000 } };
const BG_BASE_SPEED = 12;  const BG_COMBAT_RANGE = 8;  const BG_BATTLE_ROUND_CAP = 20;
const BG_RESPAWN_TURNS = 5; const BG_POST_HEAL = 0.15; const BG_RETREAT_TILES = 3;
```

【事实】敌方 AI 的"配置合理度" `q` 是敌人强度的唯一旋钮（见 5.6）。

## 5. 数值与成长曲线

### 5.1 等级曲线

【事实】三条曲线全部是**简单闭式函数**，且都在 60 级封顶：

```js
// _idlewow/src/game/levels.js:7-17
const MAX_MEMBER_LEVEL = 60; // 人物等级上限
const MAX_GUILD_LEVEL  = 60; // 公会等级上限

function xpToNext(level)      { return Math.round(60 + level * 38); }          // 线性
function guildXpToNext(level) { if (level >= MAX_GUILD_LEVEL) return 0; return level * 300; }  // 线性
```

| 曲线 | 形态 | 数值 | 满级累计 |
| --- | --- | --- | --- |
| 人物升级 | 线性 | `60 + 38L`（L1=98，L59=2302） | Σ ≈ 70,000 |
| 公会升级 | 线性 | `300L`（L1=300，L59=17700） | Σ ≈ 531,000 |
| 生活技能 | **二次** | `600 * L²`（`professions.js:35-40`） | 累计 171,000（注释称约 105 小时满级） |
| 制造经验 | 分段线性插值 | 锚点 `30/80/150/260/420/650/950/1350/1900/2600`（`professions.js:43-45`） | 近似几何增长（每级 ×1.4~1.7） |

【事实】生活技能曲线的原注释：

```js
// _idlewow/src/game/professions.js:36-37
// 升级到下一级所需经验（1~10 级）：6000×(等级)×(等级)/10
// 累计 171000 点，以采集/制造为主要经验源估算约 105 小时满级（前期会员少偏慢，后期制造与产出加速）
```

【推断】三条曲线全部是**温和的**：没有任何指数项。这是"60 级封顶 + 靠内容量而非数值膨胀"的设计取向。**对 FF14 Idle 的启示是：等级曲线应该 boring（线性/二次），复杂度应该放在内容与战斗，而不是数值。**

### 5.2 角色属性曲线

【事实】来自 `computeStats`（`battle.js:252-321`）：

| 属性 | 与等级的关系 | 形态 |
| --- | --- | --- |
| 主属性 | `growth * level`（+ 装备线性加成） | 线性 |
| `attack` | `str*1.8 + level*4 + gear` | 线性（对线性属性而言） |
| `spellPower` | `int*1.2 + level*2 + gear` | 线性 |
| `maxHp` | `baseHp + sta*10`，`sta = growth*level` → 对等级线性 | 线性 |
| 暴击% | `主属性 / (10或12 + 0.6*level) / 100` | **次线性**（等级越高越难堆） |
| `dodge/parry/block` | `基础 + 主属性*系数`，硬上限 0.45/0.4/0.4 | 线性 + 硬顶 |
| `armor` | 坦克 `35 + 8*level`；非坦克 `10 + 1.5*level` + `agi*0.5` | 线性（坦克斜率 5.3 倍） |
| `speed` | `level + baseSpeed + agi*0.15` | 线性 |

【事实】暴击的"随等级贬值"设计：

```js
// _idlewow/src/game/battle.js:283-285
// 暴击属性换算随等级衰减：等级越高，1% 暴击所需主属性越多（法系智力 12 + 0.6×级，物理敏捷 10 + 0.6×级）
const critNeedPerPct = (cls.critSource === 'int' ? 12 : 10) + lvl * 0.6;
const critSrc = (cls.critSource === 'int' ? attrs.int : attrs.agi) / critNeedPerPct / 100;
```

【事实】护甲基础值的分档：

```js
// _idlewow/src/game/battle.js:286-287
// 坦克基础护甲 35 + 等级×8（2026-08-10 校准：拉开坦克与布甲的减伤差距，让 5 人本坦克职责有意义）
const baseArmor = useTankBase ? 35 + lvl * 8 : 10 + lvl * 1.5;
```

### 5.3 副本/怪物曲线（提取自 `content.js`）

【事实】26 个副本的等级与奖励参数（脚本从 `content.js` 提取；5 人本抽样 + 全部团本，完整 26 条见 `content.js:14-5192`）：

| 副本 key | 名称 | level | team | reqGuild | reqMembers | xpBase | guildExp | goldMin |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ragefire | 怒焰裂谷 | 13 | 5人 | 1 | — | 320 | 180 | 26 |
| shadowfang | 影牙城堡 | 20 | 5人 | 3 | — | 760 | 420 | 46 |
| gnomeregan | 诺莫瑞根 | 28 | 5人 | 4 | — | 1300 | 700 | 58 |
| scarlet | 血色修道院 | 35 | 5人 | 6 | — | 1950 | 1100 | 68 |
| maraudon | 玛拉顿 | 47 | 5人 | 8 | — | 3600 | 1900 | 92 |
| blackrockspire | 黑石塔 | 55 | 5人 | 9 | — | 6200 | 3100 | 110 |
| stratholme | 斯坦索姆 | 58 | 5人 | 10 | — | 7200 | 3600 | 116 |
| zulgurub | 祖尔格拉布 | 60 | raid | 12 | 20 | 10000 | 4500 | 140 |
| onyxia | 奥妮克希亚的巢穴 | 60 | raid | 13 | 20 | 11000 | 4800 | 150 |
| moltencore | 熔火之心 | 60 | raid | 14 | 25 | 13000 | 5600 | 160 |
| blackwinglair | 黑翼之巢 | 60 | raid | 15 | 30 | 14000 | 6000 | 165 |
| ruinsaq | 安其拉废墟 | 60 | raid | 16 | 30 | 15000 | 6400 | 170 |
| aq40 | 安其拉 | 60 | raid | 17 | 35 | 17000 | 7200 | 180 |
| naxxramas | 纳克萨玛斯 | 60 | raid | 18 | 40 | 19000 | 8000 | 190 |

（略去的 12 条：deadmines 15 / wailingcaverns 17 / stockade 23 / blackfathom 25 / razorfenkraul 30 / razorfindownds 33 / uldaman 38 / zulfarrak 41 / sunken 44 / blackrock 50 / diremaul 53 / scholomance 57，其 `xpBase` 依次为 420/460/900/940/1360/1800/2050/3200/3400/5200/6000/6800。）

【推断】曲线形态：

- **5 人本阶段（L13→L58）**：`xpBase` 从 320 → 7200，共 4.5 个数量级内的 22 倍增长，而等级跨度只有 45 级。**是指数偏线性的混合**：粗看 `xpBase ≈ 320 * (1.08)^(L-13)`，即每级 +8% 的复利。
- **团本阶段（L60）**：`xpBase` 从 10000 → 19000，但门槛靠 `requireGuildLevel`（12→18）与 `requireMembers`（20→40）拉开，**用"资格门槛"而非"数值门槛"做进度锁**。
- 这是典型的"**内容阶梯**"设计：5 人本提供平滑成长，团本提供资格层级。

### 5.4 装备曲线

【事实】装备表规模（脚本解析 `items.js` 中单行定义的 558 条）：`epic 312 / rare 192 / uncommon 48 / legendary 6`。

【事实】武器强度 vs 装备等级（提取自 `items.js`）：

| 等级段 | 代表武器 | attack / spellPower | 每级强度 |
| --- | --- | --- | --- |
| L8 | `i_rf_blade` / `i_rf_staff` | 12 / 14 | ~1.6 |
| L13 | `i_dm_sword` / `i_dm_staff` | 20 / 22 | ~1.6 |
| L18 | `i_sfk_blade` / `i_sfk_staff` | 30 / 32 | ~1.7 |
| L24 | `i_bfd_blade` / `i_bfd_staff` | 36 / 38 | ~1.6 |
| L29 | `i_rfk_blade` / `i_rfk_staff` | 47 / 50 | ~1.7 |
| L35 | `i_sm_blade` / `i_sm_staff` | 65 / 69 | ~1.9 |
| L45 | `i_st_blade` / `i_st_staff` | 111 / 118 | ~2.6 |
| L55 | `i_brs_blade` / `i_brs_staff` | 190 / 201 | ~3.6 |
| L57 | `i_sch_blade` / `i_sch_staff` | 211 / 224 | ~3.9 |
| L60（ZG→MC→BWL→AQ40→Naxx） | `i_zg_blade` / `i_mc_blade` / `i_bwl_blade` / `i_aq_blade` / `i_naxx_blade`（法系同构） | 285→356→413→485→542（spellPower 302→378→438→513→574） | 梯队 |
| L60（世界 BOSS / 橙装） | `wb_azuregos_weapon` / `i_leg_rhokdelar` / `i_leg_sulfuras` | 610 / 780·710 / 940 | 顶 |

（略去 L38 `i_zf_blade` 84/88、L60 亚梯队明细。）

【推断】曲线形态是**分段**的：

1. **L8~L58：幂律（约 1.6 次方）**。拟合：强度 / 等级 从 1.6 升到 3.9，即强度 ≈ `0.06 * L^1.6`。
2. **L60：台阶函数**。同一"等级 60"下，装备强度由**掉落来源**决定，形成 ZG(285) < MC(356) < BWL(413) < AQ(485) < Naxx(542) < 世界BOSS(610) < 橙装(780-940) 的清晰梯队。

【事实】装备的"护甲类型 → 属性分布"是**预算守恒的重分配**（`armor.js`）：

```js
// _idlewow/src/game/armor.js:18-40
const ARMOR_TYPES = {
  plate:   { classes: ['warrior','paladin'],        ratio: { str: 0.55, sta: 0.35, attack: 0.10 } },
  mail:    { classes: ['hunter','shaman'],          ratio: { agi: 0.40, sta: 0.30, attack: 0.15, spellPower: 0.15 } },
  leather: { classes: ['rogue','druid'],            ratio: { agi: 0.45, sta: 0.30, attack: 0.25 } },
  cloth:   { classes: ['mage','warlock','priest'],  ratio: { int: 0.45, spellPower: 0.35, sta: 0.20 } }
};
const ARMOR_TYPE_MULT = { plate: 1.0, mail: 0.6, leather: 0.4, cloth: 0.1 };   // armor.js:50
const BUDGET_WEIGHT = { str: 1, agi: 1, sta: 0.6, int: 1, attack: 1, spellPower: 1 };  // armor.js:53
```

【事实】`redistributeStats`（`armor.js:72-88`）保持预算不变，只改分布；`armorize(ITEMS)`（`armor.js:117-138`）在模块初始化时**原地改写 `ITEMS`**，为每件防具补 `armorType`/`classes`/重分配后的 `stats`。

【事实】"护甲类型"还充当**穿戴白名单**：跨类型自动卸下（`save.js:610-627`，注释 "方案 B 硬限制"）。

### 5.5 强化与消耗曲线

【事实】强化 +1..+10 的完整阶梯（`engine.js:1768-1779`）：

| 等级 | 金币 | 矿石 | 数量 | 附魔催化剂 | 数量 | 基础成功率 |
| --- | --- | --- | --- | --- | --- | --- |
| +1 | 18 | copper_ore | 2 | arcane_dust | 1 | 100% |
| +2 | 26 | tin_ore | 3 | arcane_dust | 2 | 95% |
| +3 | 34 | iron_ore | 3 | refined_dust | 1 | 90% |
| +4 | 44 | mithril_ore | 4 | refined_dust | 2 | 82% |
| +5 | 56 | thorium_ore | 4 | strong_essence | 1 | 70% |
| +6 | 70 | darkiron_ore | 5 | strong_essence | 2 | 58% |
| +7 | 88 | khorium_ore | 5 | arcane_shard | 1 | 45% |
| +8 | 110 | khorium_ore | 6 | arcane_shard | 2 | 33% |
| +9 | 140 | khorium_ore | 7 | arcane_shard | 3 | 22% |
| +10 | 180 | khorium_ore | 8 | arcane_shard | 4 | 12% |

【事实】失败保护 + 元素精华加成（`engine.js:1791`、`1830`）：`min(0.95, baseRate + upgradeFailStreak*0.03)`，再用元素精华可 `+0.2`。强化只对线性属性生效（`battle.js:25-30` 的 `UPGRADE_STAT_KEYS`：攻击/法强/护甲/格挡值/法抗/四主属性/速度），**百分比类属性不随强化成长**；倍率为**线性 +10%/级**（`battle.js:238`）。

【推断】成功率衰减是**近似几何**的（每级 ×0.8），配合"失败 +3% 保底、上限 95%"把期望尝试次数压在一个可接受的区间（+10 期望约 8 次，材料成本约 64 个 khorium_ore）。

### 5.6 经济产出与消耗

【事实】金币来源（faucet）：

| 来源 | 数量 | 位置 |
| --- | --- | --- |
| BOSS 房金币 | `randInt(r, dungeon.goldMin, dungeon.goldMax)`（**每个 BOSS 房各算一次**） | `battle.js:4212` |
| 小怪房金币 | `randInt(r, 3, 7)` 固定 | `battle.js:4217` |
| 种族金币加成 | `maxGoldMult(members)`（取队伍最高，非相乘） | `engine.js:1846-1853`、`1986` |
| 考古加成 | `min(0.5, archaeology等级 * 0.05)` **仅作用于 BOSS 金币** | `engine.js:1270-1272`、`1989` |
| 卖装备 | `max(1, round(lv * qmult)) + upgrade*4`，`qmult` 普通 0.5/优秀 1/稀有 2/史诗 3/传说 6 | `inventory.js:105-112` |
| 礼包码 | 见 `gift-codes.js` | `engine.js:2644` |
| 成就奖励 | `claimAchievement` | `engine.js:2907-2935` |

【事实】金币消耗（sink）：

| 消耗 | 数量 | 位置 |
| --- | --- | --- |
| 酒馆招募 | `100 + 今日累计招募次数*100`，再按候选人等级放大 | `engine.js:186-188` |
| 装备强化 | 见 5.5 表 | `engine.js:1768-1779` |
| 制造配方 | 各配方 `cost.gold` | `professions.js:376+` |
| 橙装合成 | 如雷霆之怒 50000 金 | `professions.js:628` |
| 坐骑购买 | `MOUNTS[id].price` | `engine.js:2666-2677` |
| 竞技场/战场商店 | 徽章/荣誉点（非金币） | `arena.js`、`battleground.js` |

【事实】材料来源（`professions.js:66-132` 共 54 种材料）：

| 类别 | 数量 | 来源 |
| --- | --- | --- |
| 矿石 | 7（铜/锡/铁/秘银/瑟银/黑铁/恒金） | 采集挂机、副本掉落 |
| 草药 | 7 | 采集挂机 |
| 鱼类 | 7 | 钓鱼 |
| 皮革 | 7 | 剥皮 |
| 布料 | 5（亚麻/毛料/魔纹/符文/月布） | 副本掉落（胜 10，30% 概率 20）+ 制造转化 |
| 元素精华 | 4 | 采集 Lv40+ 概率、副本 25% |
| 附魔材料 | 4（奥术之尘/精炼奥尘/强效精华/魔光碎片） | 装备分解（无随机） |
| 橙装材料 | 12 | 团本首领专属 |
| 特殊 | 2（酒馆刷新券/其拉神器） | 副本进度掉落 |

【事实】分解产出是**完全确定性的**（`inventory.js:97-103`）：

```js
// 分解产出：装备等级决定材料档（1/15/30/45 级分别对应奥术之尘/精炼奥尘/强效精华/魔光碎片），
// 品质决定数量倍率（普通×1 / 优秀×2 / 稀有×3 / 史诗×4），无随机
```

【推断】整套经济是**闭环且可预算的**：分解无随机、采集产物可算期望、强化阶材料档递进。**没有任何赌博式随机产出**（除"黑暗料理"这类娱乐向）。这是"放置游戏不劝退"的重要设计取向。

### 5.7 敌人强度旋钮：`q`（配置合理度）

【事实】竞技场/战场的敌人强度不用"等级缩放"，而用 `q ∈ [0.15, 0.95]`：

```js
// _idlewow/src/game/arena.js:47-68
const ARENA_TIERS = [
  { id: 'bronze',   name: '青铜', min: 0,    q: 0.15 },
  { id: 'silver',   name: '白银', min: 500,  q: 0.35 },
  { id: 'gold',     name: '黄金', min: 1000, q: 0.55 },
  { id: 'platinum', name: '铂金', min: 1500, q: 0.70 },
  { id: 'diamond',  name: '钻石', min: 2000, q: 0.82 },
  { id: 'master',   name: '大师', min: 2500, q: 0.90 },
  { id: 'king',     name: '王者', min: 3000, q: 0.95 }
];
const ARENA_GEAR_PROGRESSION = {
  bronze:   { upgrade: [0, 1],  enchant: [0, 1], enchantChance: 0.10 },
  silver:   { upgrade: [1, 2],  enchant: [1, 2], enchantChance: 0.30 },
  gold:     { upgrade: [2, 4],  enchant: [2, 3], enchantChance: 0.55 },
  platinum: { upgrade: [4, 6],  enchant: [3, 5], enchantChance: 0.75 },
  diamond:  { upgrade: [6, 8],  enchant: [5, 6], enchantChance: 0.90 },
  master:   { upgrade: [8, 9],  enchant: [6, 8], enchantChance: 1.00 },
  king:     { upgrade: [9, 10], enchant: [8, 9], enchantChance: 1.00 }
};
```

【推断】`q` 同时控制四件事：装备完整度、强化档位、附魔覆盖率、战术水平（`arenaEnemyTactic(q, r)`）。**这是一个非常优雅的单旋钮难度设计**——比"给敌人乘一个 HP 倍率"要难以被玩家察觉，也更像"更强的对手"而不是"更肉的木桩"。

【事实】副本敌人用另一套旋钮（`battle.js:402-447`）：`preScaled`（BOSS 已烘焙最终值）/ 等级缩放 / 难度倍率 / 队伍系数（`RAID_HP_MULT = 1.7`，5 人本按等级分档 `BATTLE_TUNE.fiveManAtk = {low:2.4, mid:3.6, high:4.2}`）。

【事实】战斗时长控制（`battle.js:662-668`）：

```js
const ENRAGE_START_ROUND = 80;   const ENRAGE_STEP_ROUNDS = 10;
const ENRAGE_STEP_DMG = 0.2;     const ENRAGE_MAX_BONUS = 2.0;
const MAX_BATTLE_ROUNDS = 150;
```

### 5.8 数值参数化方式总结

| 参数化手法 | 示例 | 位置 |
| --- | --- | --- |
| **闭式函数曲线** | `xpToNext = 60+38L`、`profExpToNext = 600L²` | `levels.js:11`、`professions.js:39` |
| **锚点表 + 线性插值** | 制造经验 10 个锚点 | `professions.js:43-56` |
| **[T0,T1,T2] 数组模板** | 套装数值 `atkDmg: [0.04,0.06,0.08]` | `sets.js:26-67` |
| **当量权重表** | 天赋/词缀/护甲的预算折算 | `talents.js:31-72`、`prefixes.js:37`、`armor.js:53` |
| **阶梯表（离散档位）** | 强化 10 档、材料 7 档、装备槽 9 档 | `engine.js:1768`、`professions.js:66-132` |
| **比例分配表** | 护甲类型主属性 `ratio` | `armor.js:18-40` |
| **单旋钮难度** | 竞技场 `q` | `arena.js:47-68` |
| **资格门槛** | 团本 `requireGuildLevel`/`requireMembers` | `content.js` 各团本条目 |

【推断】这是一个**"表格驱动 + 少量闭式函数"**的混合风格。优点是所有数值都能被策划直接看懂并手工微调；缺点是**没有单一数值源**——同一件装备的数值可能被 `content.js` 的注入表、`armor.js` 的重分配、`prefixes.js` 的词缀三层改写，改一处很容易漏。

---

## 6. 内容组织方式

### 6.1 `content.js` 的独特结构：数据字面量 + 事后原地注入

【事实】`content.js` 5525 行中，**约 5192 行（94%）是一个巨大的 `DUNGEONS` 对象字面量**（`content.js:14-5192`），剩下的 330 行全是"事后改写"。

```js
// _idlewow/src/game/content.js 结构（脚本统计）
14    const DUNGEONS = { ... }                 // ← 5192 行，26 个副本
5196  const RAID_BOSS_TUNING = {...}            // 团本 BOSS 再平衡（乘 hp/power）
5221  const SET_DROPS = {...}                   // 套装掉落注入（按房间中文名定位）
5271  const MAGIC_SKILL_KEYWORDS = [...]        // 按技能名中文关键词自动标 spell:true
5292  const OFFHAND_DROPS = {...}               // 副手掉落注入
5330  const LOOT_GAP_DROPS = {...}              // 掉落覆盖补全注入
5354  const PHYS_WEAPON_SUFFIX = {...}          // 混合职业物理主手注入（字符串替换生成 id）
5377  const RAID_NONWEAPON_DROPS = {...}        // 团本武器/饰品规划
5434  const NAXX_WB_DROPS = {...}               // 纳克萨玛斯世界 BOSS 掉落
5454  const NAXX_WEAPON_RELOCATE = {...}        // 纳克萨玛斯武器重定位
5495  const ONYXIA_CLEAR_REWARDS = [...]        // 奥妮克希亚通关奖励池
5498  const BOSS_MATERIAL_DROPS = {...}         // 首领 → 专属材料
5519  __m.* 导出（6 个符号）
```

【事实】注入模式统一为"按**房间中文名**在 `DUNGEONS[d].rooms` 里 `find`，然后 `room.loot.push({id, chance})`"：

```js
// _idlewow/src/game/content.js:5258-5267
for (const [dungeonId, roomMap] of Object.entries(SET_DROPS)) {
  const dungeon = DUNGEONS[dungeonId];
  if (!dungeon) continue;
  for (const [roomName, ids] of Object.entries(roomMap)) {
    const room = dungeon.rooms.find((r) => r.name === roomName);
    if (!room) continue;                                     // ★ 找不到就静默跳过
    if (!Array.isArray(room.loot)) room.loot = [];
    for (const id of ids) room.loot.push({ id, chance: 0.1 });
  }
}
```

【事实】还有一个"用中文关键词自动标记法术技能"的启发式：

```js
// _idlewow/src/game/content.js:5269-5289
// —— 首领法术技能标记（M9 校准）：标为法术的技能吃玩家智力抗性，其余按物理吃护甲 ——
const MAGIC_SKILL_KEYWORDS = ['暗影','奥术','火球','烈焰',...,'吐息'];
for (const d of Object.values(DUNGEONS)) {
  for (const r of d.rooms) {
    ... for (const s of skillDefs) { if (s.spell == null && MAGIC_SKILL_KEYWORDS.some(k => s.name.includes(k))) s.spell = true; }
  }
}
```

【推断】这套"数据 + 事后注入"的做法是**玩法快速迭代期的产物**：新机制（副手、护甲类型、套装、物理变体武器）不想回去改 5000 行的主表，就在末尾追加一张补丁表。代价是：

1. **主表不再自包含**：读 `DUNGEONS.ragefire` 看不到它的完整掉落，必须读完整文件。
2. **中文房间名成为主键**：改名 = 静默丢掉落（`if (!room) continue;`）。
3. **`PHYS_WEAPON_SUFFIX` 用正则替换生成 id**（`content.js:5369`）：`l.id.replace(/_(hammer|totem|moonstaff)$/, '_' + suffix)`，命名约定一变就失效。
4. **执行顺序敏感**：`RAID_BOSS_TUNING` 在所有注入之前改写 `boss.hp/atk`（`5203-5214`），如果之后有人再加注入表引用旧数值就会错。

### 6.2 一个完整的副本条目（`content.js:14-148`，怒焰裂谷）

【事实】完整原文摘录（保留注释与结构）：

```js
const DUNGEONS = {
  ragefire: {
    id: 'ragefire',
    trashWaves: 2,                    // 小怪波数
    name: '怒焰裂谷',
    level: 13, levelMin: 13, levelMax: 18,
    faction: '部落',
    requireGuildLevel: 1,
    xpBase: 320, guildExp: 180,
    goldMin: 26, goldMax: 40,
    desc: '奥格瑞玛地下的灼热通道，火元素与怒焰兽人盘踞其中。',
    rooms: [
      { name: 'ragefire·通路1',
        mobs: [ { name: '怒焰裂谷守卫', hp: 237, atk: 32, armor: 8 },
                { name: '怒焰裂谷法师', hp: 194, atk: 36, armor: 4 } ],
        loot: [ { id: 'i_rf_feet', chance: 0.06 }, { id: 'i_rf_hands', chance: 0.06 } ] },
      // ... 通路2 / 通路3 / 通路4 同构 ...
      { name: '杰尔戈什·唤灵者的殿堂',
        boss: {
          preScaled: true,            // ★ BOSS 数值已烘焙为最终值，引擎不再乘倍率
          name: '杰尔戈什·唤灵者',
          hp: 3105, atk: 117, spellPower: 117,
          magic: true,                // 普攻按法术判定
          spellResist: 354, armor: 463,
          skills: [ { id: 'ragefire_1a', name: '暗影箭', mult: 1.55, cd: 2, spell: true },
                    { id: 'ragefire_1b', name: '烈焰火雨', mult: 1.95, cd: 4, spell: true } ]
        },
        loot: [ { id: 'i_rf_helm', chance: 0.24 }, { id: 'i_rf_robe', chance: 0.24 }, { id: 'i_rf_hands', chance: 0.24 } ] },
      // ... 塔加斯的殿堂 / 通路4 ...
      { name: '巴尔加斯的殿堂',
        boss: { preScaled: true, name: '巴尔加斯', hp: 3863, atk: 139, spellResist: 354, armor: 463,
          skills: [ { id: 'ragefire_3a', name: '冲锋斩', mult: 1.71, cd: 2 },
                    { id: 'ragefire_3b', name: '地狱火', mult: 2.25, cd: 4, spell: true } ] },
        loot: [ /* 9 把武器（各职业一把）+ 3 件护甲，chance 0.16~0.26 */ ] },
    ]
  },
  ...
```

【事实】字段语义速查：

| 字段 | 类型 | 语义 |
| --- | --- | --- |
| `id` | string | 主键（与对象 key 重复，代码用 `dungeon.id` 的地方很多） |
| `trashWaves` | number | 小怪波数 |
| `level` / `levelMin` / `levelMax` | number | 副本等级（`levelMin` 用于成员准入校验，`level` 用于敌人缩放与经验衰减） |
| `faction` | string | 阵营（联盟/部落，仅展示） |
| `requireGuildLevel` | number | 公会等级门槛 |
| `team` | `'raid'` \| 缺省 | 团队副本标记（缺省=5 人本） |
| `requireMembers` / `maxMembers` | number | 团本人数下限/上限 |
| `xpBase` / `guildExp` | number | 基础经验/公会经验 |
| `goldMin` / `goldMax` | number | 每个 BOSS 房的金币区间 |
| `rooms[]` | array | 房间数组（顺序即推进顺序） |
| `rooms[].mobs[]` | array | 小怪（`{name, hp, atk, armor, spellResist?, magic?, dodge?}`） |
| `rooms[].boss` / `rooms[].bosses[]` | object/array | 首领（支持单/多 BOSS） |
| `rooms[].adds[]` | array | 附加单位（`content.js:5284` 会从中收集技能） |
| `rooms[].loot[]` | array | `{id, chance}`，`chance` 是独立概率 |
| `boss.preScaled` | bool | `true`=不乘任何倍率（引擎 `battle.js:405-420` 全部走 `pre ? 1 : ...`） |
| `boss.magic` | bool | 普攻按法术判定 |
| `boss.doubleAction` | bool | 团本 BOSS 双动 |
| `boss.skills[]` | array | `{id, name, mult, cd, spell?, dotMult?, ticks?, dotPermanent?, ...}` |

### 6.3 一个完整的装备条目（`items.js:15-33`）

【事实】原文：

```js
// —— 怒焰裂谷 武器 ——
i_rf_blade:    { id: 'i_rf_blade',    name: '怒焰战刃', slot: 'weapon', quality: 'rare', level: 8, classes: ['warrior'],  stats: { attack: 12, str: 5 } },
i_rf_staff:    { id: 'i_rf_staff',    name: '怒焰法杖', slot: 'weapon', quality: 'rare', level: 8, classes: ['mage'],     stats: { spellPower: 14, int: 5 } },
i_rf_crozier:  { id: 'i_rf_crozier',  name: '怒焰权杖', slot: 'weapon', quality: 'rare', level: 8, classes: ['priest'],   stats: { spellPower: 12, int: 4 } },
// —— 怒焰裂谷 防具 ——
i_rf_helm:     { id: 'i_rf_helm',     name: '祭坛头冠', slot: 'head',   quality: 'uncommon', level: 7, stats: { sta: 6, attack: 3, spellPower: 3 } },
i_rf_charm:    { id: 'i_rf_charm',    name: '烈焰护符', slot: 'trinket',quality: 'uncommon', level: 7, stats: { spellPower: 3, int: 2, crit: 0.03 } },
```

【事实】带世界 BOSS 特效的装备（`items.js:558`）示例：

```js
wb_emeriss_ring: {
  id: 'wb_emeriss_ring', name: '腐蚀之环', slot: 'ring', quality: 'epic', level: 60,
  classes: ['mage','warlock','priest','druid'],
  stats: { spellPower: 52, int: 24, crit: 0.12, speed: 12 },
  effect: { id: 'wb_emeriss_ring_fx', name: '腐化蔓延', trigger: 'onSpellCast',
            chance: 0.15, cd: 3, kind: 'dot', base: 'spell', dmgMult: 0.2, ticks: 3 }
}
```

【事实】`effect.kind` 的取值与实现在 `battle.js` 的 `fireWorldBossFx`（`battle.js:1401-1558`）与 `fireLegendary`（`battle.js:1299-1400`）：

| `kind` | 效果 |
| --- | --- |
| `dmg` | 直接伤害 |
| `dot` / `dmg_dot` | 持续伤害（可附带立即伤害） |
| `hot` | 持续治疗（可带 `finishMult` 绽放） |
| `buff_next` | 下一次技能增伤 |
| `dmg_debuff` / `debuff_taken` | 增伤减益 |
| `dmg_heal` | 伤害并治疗 |
| `party_heal` | 群体治疗 |

### 6.4 装备表的四种生成方式

【事实】`items.js` 里的条目来源有四类（同一个对象被多次 `Object.assign` / 循环写入）：

| 方式 | 数量级 | 位置 |
| --- | --- | --- |
| ① 手写字面量 | 主体 | `items.js:13-789` |
| ② 循环生成（护甲补齐） | `ARMOR_GAP` 21 条 | `items.js:811-870` |
| ③ 数组即表（副手/戒指） | `CRAFT_OFFHAND` 9 + `LOW_RING` 3 | `items.js:791-807`、`872-879` |
| ④ `Object.assign` 批量（竞技场商店） | 30+ 条 | `items.js:894-928` |

【事实】②的护甲生成用函数表算出属性：

```js
// _idlewow/src/game/items.js:834-848
// 按 M12 护甲类型配比（ARMOR_TYPES.ratio）生成：预算 ≈ 等级×1.8，各属性 = 比例×预算（耐力按 0.6 权重折算）
const ARMOR_TYPE_STATS = {
  plate:   (lv) => { const B = Math.max(8, Math.round(lv * 1.8)); return { str: ..., attack: ..., sta: ... }; },
  mail:    (lv) => { ... }, leather: (lv) => { ... }
};
```

【事实】③的副手生成会给"法系书卷"补默认职业（`items.js:880-886`）：

```js
// 现有法系书卷副手补职业限制与类型标记（副本掉落 + 制造产物统一处理）
for (const def of Object.values(ITEMS)) {
  if (def.slot === 'offhand') { if (!def.classes) def.classes = ['mage','warlock','priest']; if (!def.offhandType) def.offhandType = 'book'; }
}
```

### 6.5 "新增内容要改哪些地方"——可操作清单

#### 6.5.1 新增一个 5 人副本

【事实+建议】以下是 FF14 Idle 也适用的改动清单（括号内为原项目对应位置，可作为"改动面"的度量）：

| # | 改动 | 原项目位置 | 是否容易漏 |
| --- | --- | --- | --- |
| 1 | 加 `DUNGEONS[id]` 条目（含 rooms/mobs/boss/loot） | `content.js:14-5192` | — |
| 2 | 加该副本的装备条目（每职业武器 + 5 槽防具 + 饰品/戒指） | `items.js:13-789` | 易漏（原项目用注入表补，见 3） |
| 3 | 防具需要 `armorType`/`classes`：靠 `armorize()` 或手写 | `armor.js:117-138` | 否（自动） |
| 4 | 掉落注入表里登记（若沿用注入模式） | `content.js:5221/5292/5330` | **是**（找不到房间名静默跳过） |
| 5 | 若是团本：加入 `RAID_IDS`（成就用） | `engine.js:2826` | **是** |
| 6 | 若是团本：加入 `RAID_BOSS_TUNING` | `content.js:5196-5202` | 是（不致命） |
| 7 | 若有专属消耗品/材料：加 `BOSS_MATERIAL_DROPS` | `content.js:5498` | 是 |
| 8 | 若要英雄任务引用：加 `progressHeroQuestFromDungeon` 的匹配条件 | `engine.js:723-789` | 是 |
| 9 | 掉落查询/图鉴的索引：`dropdb.js` 会自动扫描 `DUNGEONS` | `dropdb.js:1-136` | 否（自动） |
| 10 | UI 无需改动：副本列表由 `Object.keys(DUNGEONS)` 渲染 | `ui.js:1413` | 否 |

【事实】`dropdb.js` 的设计值得单独表扬：它**不维护独立索引**，而是运行时扫描 `DUNGEONS`/`RECIPES`/`ARENA_SHOP`/`BG_SHOP` 等表，倒排出"材料→来源""装备→来源"（`dropdb.js:1-136`，5 个依赖模块）。这样"帮助-查询掉落"弹窗（`ui.js:3042`）永远与数据表同步。

【推断】原项目之所以有 10 项改动面，是因为**内容分散在 6 张表里**。FF14 Idle 应该把"一个副本"收敛成**一个文件/一个对象**，让 1 次改动完成 90% 的工作。

#### 6.5.2 新增一件装备（原项目最简路径）

1. 在 `items.js:13-789` 加一条 `{id, name, slot, quality, level, [classes], stats}`。
2. 若要让它掉出来：在某个 `DUNGEONS` 房间的 `loot[]` 里加 `{id, chance}`（`content.js` 任一处）。
3. 若是防具且不写 `armorType`：`assignArmorType`（`armor.js:99-114`）会**按 id 前缀哈希**分配护甲类型（`armor.js:92` 的 `DUNGEON_SLOT_ORDER`），属性被 `redistributeStats` 重分配。**这可能导致你手写的属性被改写**【事实】。
4. 若要带特效：加 `effect: {...}`，引擎在 `collectEquippedFx`（`battle.js:326-335`）自动收集并在 `fireWorldBossFx` 里分发。
5. 若是世界 BOSS 掉落：`BOSS_MATERIAL_DROPS` / 对应副本 loot。

【推断】第 3 步是一个**隐式副作用陷阱**：策划在 `items.js` 手写的属性会被 `armorize()` 重算。要避开必须显式写 `armorType` 或 `set`。

### 6.6 静态表字段模式总览

【事实】全部静态表的共性模式：

| 表 | 位置 | 键模式 | 值模式 |
| --- | --- | --- | --- |
| `CLASSES` | `classes.js:12-67` | classId | `{id,name,role,icon,canTank,growth,baseHp,baseSpeed,resistBase,armorType,critSource,apType}` |
| `RACES` | `config.js:14-79` | raceId | `{id,name,faction,passive,dmgReduce?,critBonus?,...,allowedClasses[]}` |
| `ITEMS` | `items.js:13-928` | itemId | `{id,name,slot,quality,level,classes?,stats,armorType?,set?,effect?}` |
| `DUNGEONS` | `content.js:14-5192` | dungeonId | `{id,name,level,rooms[],...}` |
| `SKILLS` | `skills.js:34-...` | classId → 数组 | `{id,name,branch,unlockLevel,type,mult?,cd?,buff?,debuff?,trigger?}` |
| `TALENT_TREES` | `talents.js:116+` | classId → branch | `{names[8], tiers[8]}` |
| `SETS` | `sets.js:...` | setId | `{id,name,tier,class,pieces,effects[2/3/5]}` |
| `MATERIALS` | `professions.js:66-132` | matId | `{id,name}`（**只有名字，没有数值！**） |
| `RECIPES` | `professions.js:374-...` | 数组 | `{id,name,prof,level,cost{ gold, materials{} },result{ itemId?/material?/consumable?/attachment?, qty? },exp}` |
| `CONSUMABLES` | `professions.js:304-338` | consId | `{id,name,kind,dmg?/threshold?/pct?/stat?/mods?}` |
| `PREFIXES` | `prefixes.js:13-31` | prefixId | `{id,name,role,profile{stat:weight}}` |
| `CHALLENGES` | `challenges.js:32-108` | challengeId | `{id,type,name,icon,minMembers,maxMembers,rounds,desc,scoreLabel,boss?}` |
| `ARENA_MODES/TIERS` | `arena.js:41-56` | modeId / tierId | `{size,name}` / `{id,name,min,q}` |
| `BG_TYPES` | `battleground.js:42-45` | typeId | `{id,name,short,teamSize,turnCap,winScore}` |
| `MOUNTS` | `mounts.js` | mountId | `{id,name,tier,price?,source,gatherBonus?,...}` |
| `ACHIEVEMENTS` | `achievements.js:1-59` | achId | `{id,name,desc,type,target,reward}` |
| `GIFT_CODES` | `gift-codes.js:6-11` | **大写码字符串** | `{name, gold?, mounts?, mount?, materials?}` |

【事实】注意到 `MATERIALS` **只有 `{id, name}`**——材料没有任何数值属性（价值、品质、等级）。所有"材料档次"信息实际由 `GATHER_TABLE`（`professions.js:159+`）的 `level` 字段与 `MATERIAL_CATEGORY`（`professions.js:135-156`）承载。

【推断】这是一个**数据模型缺陷**：材料的"等级/档位"信息散在"产出表"里，导致"这个材料属于第几档"必须查 `GATHER_TABLE` 反推（`materialTier` 就是干这个的）。FF14 Idle 应该给材料加 `tier`/`category`/`vendorPrice` 等一等字段。

---

## 7. UI 层做法

### 7.1 总体形态：字符串拼接 + 单点事件委托 + 全量重绘

【事实】`ui.js` 8699 行、248 个函数、只有 1 个导出（`init`，`ui.js:5`）。它的技术选择是：

| 选择 | 具体做法 | 证据 |
| --- | --- | --- |
| 无框架 | 无 React/Vue/模板引擎；手写 HTML 字符串 | 全文件 |
| 转义函数 | `esc()` 替换 `& < > " '` 五个字符 | `ui.js:379-381` |
| 事件委托 | **一个** `document.addEventListener('click')` 管全部点击 | `ui.js:8140-8272` |
| 命令分发 | `data-action` 属性 → `handleAction(action, el)` 的 **234 个 `if (action === '...')` 分支** | `ui.js:3184` 起；计数结果 234 |
| 全量重绘 | `renderAll()` 重建所有 Tab + 所有弹窗的 innerHTML | `ui.js:7952-8046` |
| 渲染隔离 | `safeRender(name, fn, el)` 单块 try/catch | `ui.js:7919-7935` |
| 错误横幅 | 失败块签名去重后显示横幅，可"知道了"忽略 | `ui.js:7938-7950` |
| 滚动保持 | 重绘前记 `scrollTop/Left`，重绘后同步 + rAF 再同步一次 | `ui.js:7954-7966`、`8033-8045` |
| 弹窗模式 | 懒创建 DOM 节点 + `classList.add('show')`；点背景（按 id 判断）关闭 | `ui.js:522-550`、`8156-8260` |
| 移动端 tooltip | 自绘浮层（非原生 title） | `ui.js:8083-8119` |

### 7.2 11 个主 Tab 的信息架构

【事实】Tab 定义（`ui.js:184-196`）：

```js
const TABS = [
  ['guild',        '🏰 公会'],
  ['members',      '👥 会员'],
  ['dungeons',     '🗡️ 副本'],
  ['battleground', '🚩 战场'],
  ['arena',        '⚔️ 竞技场'],
  ['challenge',    '🎯 挑战'],
  ['inventory',    '🎒 背包'],
  ['production',   '⚒️ 生产'],
  ['tasks',        '📜 任务'],
  ['achievements', '🏆 成就'],
  ['help',         '❓ 帮助']
];
```

【事实】外壳只渲染一次（`ui.js:907-925`）：一个 `#hud`、一个错误横幅、一个 `<nav class="tabs">`、11 个空 `<div class="tab" id="tab-xxx">`。之后 `renderAll` 只往这些容器里写 innerHTML。

| Tab | 核心渲染函数 | 关键行 | 二级结构 |
| --- | --- | --- | --- |
| 🏰 公会 | `renderGuild` | `968` | 公会信息 / 生活技能 / 仓库 / 酒馆入口 / 马厩 |
| 👥 会员 | `renderMembers` | `1136` | 会员卡列表 + 8 类筛选（职业/种族/职责/等级区间/搜索/排序） |
| 🗡️ 副本 | `renderDungeons` | `1413` | 副本卡（可折叠）+ 派遣/扫荡 + 战报列表 + 精简日志开关 |
| 🚩 战场 | `renderBattlegroundTab` | `7737` | wsg/ab + 战术 + 商店 + 回放 |
| ⚔️ 竞技场 | `renderArenaTab` | `7191` | 2v2/3v3/5v5 + 段位 + 对手预览 + 商店 |
| 🎯 挑战 | `renderChallengeTab` | `7424` | DPS 木桩 / 抗击物理 / 抗击法系 / 限制定式 |
| 🎒 背包 | `renderInventory` | `1875` | 9 个类型 Tab + 品质/部位/护甲筛选 + 批量操作 |
| ⚒️ 生产 | `renderProduction` | `6727` | 15 个专业二级 Tab（含附魔/材料互转） |
| 📜 任务 | `renderTasks` | `2135` | 史诗任务 / 每日任务 |
| 🏆 成就 | `renderAchievements` | `2184` | 分类 + 隐藏已领取 |
| ❓ 帮助 | `renderHelp` | `1998` | 掉落查询/更新日志/种族查询/DPS 测试 |

【事实】另有 **30+ 个弹窗**在 `renderAll` 里一起渲染（`ui.js:8001-8031`）：图鉴、马厩、铁匠铺、酒馆、种族信息、新建会员、批量附魔/强化/附加物、强化、换装、帮助掉落、版本更新、天赋、套装、技能优先级、队伍、竞技场队伍、副本选择、BOSS 信息、天赋指引、采集、附魔、改名、预设队伍。

【推断】"全部弹窗每帧重绘"是 `renderAll` 最重的部分：即使玩家没打开任何弹窗，30+ 个 `safeRender` 都会跑一遍（大多数是 `if (!open) return` 早退，见 `ui.js:3115-3121` 的模式）。**这是一个可以轻易优化的点：只渲染打开的弹窗。**

### 7.3 事件委托与命令分发

【事实】`handleAction` 的形态：

```js
// _idlewow/src/ui.js:3184-3200（开头）
function handleAction(action, el) {
  if (action === 'cloud-download' || action === 'cloud-conflict-download') { ...; return; }
  if (action === 'cloud-conflict-open') { ...; return; }
  // ... 共 234 个分支 ...
}
```

【事实】量化的委托面：`data-action="..."` 出现 **302 次**，`handleAction` 分支 **234 个**（差值来自动态拼接的模板与多个 action 共用一个处理）。`getElementById` **102 次**、`querySelector*` **52 次**、`innerHTML =` 赋值 **88 处**、`renderAll` 出现 **296 次**。

【推断】"302 个动作 + 234 个 if"的规模说明：**这套模式在 30~50 个动作以内是高效的，到 200+ 就变成了负担**。它的问题不是性能（一个 document 级监听器的性能很好），而是：

1. 无法静态分析"哪些 action 还有用"（删 UI 不会删 handler）。
2. 分支顺序敏感：早期分支里出现 `action === 'x'` 就会吞掉后面的同名分支。
3. 每个分支都要手写 `renderAll()` 收尾，漏写就"操作生效但界面不更新"。

【建议】FF14 Idle 保留 `data-action` 委托（它天然适合"大量按钮 + 少交互状态"的放置游戏），但把 handler 表改成**显式映射**：

```js
const ACTIONS = {
  'exp-collect': (el) => { ... },
  'exp-abandon': (el) => { ... },
};
// 单一入口
const handler = ACTIONS[action];
if (!handler) { console.warn('[ui] unknown action', action); return; }
handler(el);
```

这样每个 action 是独立可测函数，且删除时能立刻发现未清理的引用。

### 7.4 可维护性评价

#### 做得好的地方

| 做法 | 证据 | 价值 |
| --- | --- | --- |
| `safeRender` 渲染隔离 | `ui.js:7919-7935` | 一个坏数据不拖垮整个页面 |
| 错误横幅 + 签名去重 | `ui.js:7938-7950` | 可诊断、不刷屏 |
| 滚动位置保持（含 rAF 二次修正） | `ui.js:7954-7966`、`8033-8045` | 全量重绘下体验可接受 |
| 1 Hz tick 只改进度条，不重绘 | `ui.js:7889-7915`、`8049-8071` | 关键性能设计 |
| tooltip 浮层 + `data-action` 元素不弹浮层 | `ui.js:8146-8155` | 细节到位（避免重绘残留） |
| 移动端长按拖拽 + 抑制补发 click | `ui.js:8315-8359` | 真实移动端踩坑经验 |
| 每个 Tab 集中在一个函数 | 见 7.2 表 | 找代码快 |
| 渲染函数不直接改 state | 全部改 state 的动作都在 `engine.*` 里 | 有清晰分层意识 |

#### 明显的问题

| 问题 | 证据 | 影响 |
| --- | --- | --- |
| **单文件 8699 行 / 248 函数** | `modules.csv`；脚本计数 | 无法多人协作、无法单元测试 |
| **162 个模块级可变 UI 变量** | `ui.js:198-377`、`5399`、`8084-8085` | 状态散落，无单一数据源；"谁改了 currentTab"要靠 grep |
| **234 个 if 分支的分发器** | `ui.js:3184+` | 见 7.3 |
| **每次操作全量重绘** | 296 处 `renderAll` | 会员多（100 人）/背包满（500 件）时代价高 |
| **`innerHTML` 重建整个 Tab** | 88 处赋值 | 丢失输入框焦点/光标、丢失展开动画、触发大量重排 |
| **`colorizeNames` 每帧正则替换** | `ui.js:171-181` | 对每个渲染块做一次"用会员名构建的巨型正则"替换，会员多时开销显著 |
| **无 keyed diff** | 全量 innerHTML | 列表增删只能整体重建 |
| 渲染块名靠字符串手写 | `ui.js:7970-8031` | 与 DOM id 有两处需要同步（`renderAll` 与 `renderShell`） |
| 内联样式与事件属性混用 | 如 `ui.js:7979` 的 `?.` 与 `state.settings?.` | 现代语法与老风格混杂（`var` / `?.` 并存） |

【推断】`ui.js` 的问题不是"手写 DOM"本身，而是**没有把"渲染单元"定义清楚**。真正的渲染单元应该是一个"组件"（拥有自己的副作用边界），而当前只有"函数 + 全局变量 + 全量重绘"。

【建议】FF14 Idle 的 UI 层：

1. 用**函数式组件 + 轻量响应式**（如 Preact/vanilla `tpl` + 微 store），或退一步——至少做到"每个 Tab 一个模块文件"。
2. **列表用 keyed diff**（`data-uid` 已有基础：`item.uid` / `member.id` 天然是 key）。
3. **进度条走 requestAnimationFrame 直接改 DOM**（原项目已验证这条路可行）。
4. 把"打开哪个 Tab / 哪个弹窗"收敛成一个 `uiState` 对象，而不是 162 个独立 `let`。

---

## 8. 在线与运营功能

### 8.1 云存档（`game/cloud-save.js`，239 行）

【事实】接口协议（客户端视角）：

```js
// _idlewow/src/game/cloud-save.js:10-11
const SESSION_KEY = 'aow_game_session';
const API_URL = 'https://idle-wow-d4g1r2aai34b19686-1301007631.ap-shanghai.app.tcloudbase.com/game-auth';
```

```js
// _idlewow/src/game/cloud-save.js:89-102
async function request(action, body = {}, includeSession = true) {
  const headers = { 'Content-Type': 'application/json' };
  if (includeSession && session && session.token) headers['X-Game-Session'] = session.token;
  const response = await fetch(API_URL, { method: 'POST', headers, body: JSON.stringify({ action, ...body }) });
  ... 非 2xx 抛 { message, status, data }
}
```

【事实】action 清单（全部来自客户端调用点）：

| action | 调用点 | 请求体 | 响应字段 |
| --- | --- | --- | --- |
| `login` | `cloud-save.js:214-215` | `{username, password}` | `{token, uid, username}` |
| `register` | `cloud-save.js:218-219` | `{username, password}` | 同上 |
| `load-save` | `cloud-save.js:113`、`151` | `{}`（带 session 头） | `{save: { payload, sequence, updated_at, save_version }}` |
| `logout` | `cloud-save.js:223` | `{}` | — |

【事实】冲突判定逻辑（`reconcile`，`cloud-save.js:110-144`）：

| 条件 | 状态 | 行为 |
| --- | --- | --- |
| 云端无存档 | `ready`（本地有）/ `empty` | 不动作 |
| 云端 payload 校验失败或非 release 分支 | `conflict`（`invalid-remote`） | 弹窗报告不可下载 |
| 本地与云端 sequence+updatedAt 完全相同 | `synced` | 无冲突 |
| 云 sequence 更大（或同序但 `updated_at` 更新） | `conflict`（`remote-newer`） | 弹窗让玩家选择 |
| 本地 sequence 更大 | `conflict`（`local-newer`） | 弹窗（但**当前没有上传路径**） |

【事实】比较函数用的是 `sequence` 优先、`updatedAt` 兜底：

```js
// _idlewow/src/game/cloud-save.js:51-56
function remoteIsNewer(remote, local) {
  const remoteSeq = Number(remote && remote.sequence) || 0;
  const localSeq = saveSequence(local);
  if (remoteSeq !== localSeq) return remoteSeq > localSeq;
  return (Number(remote && remote.updated_at) || 0) > (Number(local && local.updatedAt) || 0);
}
```

【事实】下载是**覆盖式且不可撤销**（`cloud-save.js:166-167`）：

```js
storage.save('main', remotePayload);
storage.save('main_backup', remotePayload);
```

【推断】注意这里"下载后把备份也设成云端版本"，意味着**本地被覆盖前的版本没有留存**。这是一个数据安全缺口（玩家点错就回不去了）。【建议】FF14 Idle 下载云端前应先把本地档另存为 `main_precloud_<ts>`。

【事实】云存档 UI 现状是"半下线"：

```js
// _idlewow/src/ui.js:183
const CLOUD_OFFLINE_NOTICE = '云存档功能即将下线，当前已无法上传，请尽快下载后保存，本地存档不受影响';
// _idlewow/src/ui.js:539
'<div class="party-status">当前试玩版本，尚未开放注册。加群了解最新动态。</div>'
```

【事实】登录/注册表单有客户端校验（`ui.js:552-586`）：用户名 `^[A-Za-z0-9_\u4e00-\u9fff-]{3,32}$`、密码 ≥6 位、注册需两次一致。

### 8.2 CloudBase SDK（`cloudbase.js`，40 行）

【事实】`cloudbase.js` 做的是**动态注入 SDK 脚本**并初始化：

```js
// _idlewow/src/cloudbase.js:16-24
sdkPromise = new Promise((resolve, reject) => {
  const script = document.createElement('script');
  script.src = 'https://static.cloudbase.net/cloudbase-js-sdk/latest/cloudbase.full.js';
  script.async = true;
  script.onload = () => window.cloudbase ? resolve(window.cloudbase) : reject(new Error('CloudBase SDK global missing'));
  ...
});
```

【事实】内嵌了环境常量与一个 publishable key（`cloudbase.js:6-8`）。**注意：这个模块没有被任何模块 `__ns` 引用**（依赖图里 `cloudbase.js` 的入度为 0）。`cloud-save.js` 只用 **HTTP 云函数**（`fetch`），不走 SDK。

【推断】`cloudbase.js` 是早期方案（用 SDK 直连云数据库）的残留，后来改用 `game-auth` 云函数后就没再被引用。**另一个"死模块"，和 `ads.js` 一样。**

### 8.3 广告抽象层（`game/ads.js`，71 行）—— 一个"写好但没接线"的模块

【事实】`ads.js` 的接口设计得很干净（`ads.js:6-17` 注释说明了完整意图）：

```js
// ===== 广告抽象层 v1（平台无关）=====
// 游戏逻辑只调用 showRewardedAd / showInterstitialAd / showBannerAd / hideBannerAd，
// 不感知具体广告平台。未接入真实平台（provider 为空）时：
//   - 激励视频：直接发奖（保证本地测试 / 离线单文件 / 无广告地区均可玩）；
//   - 插屏 / 横幅：空操作。
```

【事实】实现要点：

```js
// _idlewow/src/game/ads.js:36-48
function showRewardedAd(opts) {
  const o = opts || {};
  if (provider && typeof provider.showRewarded === 'function') {
    try { const handled = provider.showRewarded(o); if (handled !== false) return true; }
    catch (e) { console.warn('广告平台播放失败，回退直接发奖', e); }
  }
  if (typeof o.onReward === 'function') o.onReward();    // ★ 无平台时直接发奖
  return false;
}
```

【事实】**但 `ads.js` 没有被任何模块引用**。我用依赖图核对：40 个模块中没有任何一个 `__ns("game/ads.js")`；`ui.js:5` 的 requires 列表里没有它，`engine.js:5` 也没有。全项目 `showRewardedAd` / `registerAdProvider` 的引用只出现在 `ads.js` 自己内部。

【事实】"广告位"实际上是用**每日次数计数器**实现的：

| "广告"功能 | 实现 | 位置 |
| --- | --- | --- |
| 酒馆看广告招募 | `tavernAdRecruitCheck` / `tavernAdRecruit`（不扣金币，受每日次数限制） | `engine.js:490-528` |
| 酒馆看广告刷新 | `tavernAdRefreshCheck` / `tavernAdRefresh` | `engine.js:367-383` |
| 竞技场看广告刷新对手 | `arenaAdRefreshCheck` / `arenaAdRefresh` | `arena.js:115-130` |
| 每日限额常量 | `TAVERN_AD_RECRUITS_DAILY = 5`、`TAVERN_AD_REFRESH_DAILY = 20`、`ARENA_AD_REFRESH_DAILY = 3` | `engine.js:318-319`、`arena.js:80` |
| **测试期豁免开关** | `TAVERN_AD_RECRUIT_UNLIMITED = true` | `engine.js:320` |

```js
// _idlewow/src/game/engine.js:319-321
const TAVERN_AD_REFRESH_DAILY = 20;        // 每日看广告刷新次数上限
const TAVERN_AD_RECRUIT_UNLIMITED = true; // 测试阶段：广告招募不限次数；正式上线置为 false 恢复每日上限
const TAVERN_AD_REFRESH_UNLIMITED = false; // 广告刷新使用每日上限
```

【推断】也就是说：**"看广告"在线上只是一个按钮，点了直接发奖，没有真实广告。** 抽象层已经为接入做好了准备（只需在入口 `registerAdProvider(...)`），但从未接线。

【事实】注释里还有个"构建脚本兼容"的坑：

```js
// _idlewow/src/game/ads.js:14
// 游戏内所有调用点无需改动。（注意：构建脚本按正则扫描 import/export，注释里不要出现 import 示例）
```

【推断】这句话反证了构建脚本的实现方式（正则扫描）以及它的脆弱性——**注释里出现 `import` 字样会破坏构建**。

### 8.4 礼包码（`game/gift-codes.js`，13 行）

【事实】数据就是一个以大写码为主键的对象：

```js
// _idlewow/src/game/gift-codes.js:6-11
const GIFT_CODES = {
  '1046117607': { name: '金币 10000', gold: 10000 },
  'IDLE-WORLD': { name: '优秀坐骑 ×2', mounts: 2 },
  'AI牛X':      { name: '铜矿石 ×100、锡矿石 ×100', materials: { copper_ore: 100, tin_ore: 100 } },
  '100PERSON':  { name: '暴雪巨熊（史诗坐骑）', mount: 'blizzard_bear' }
};
```

【事实】兑换逻辑（`engine.js:2638-2664`）：`trim().toUpperCase()` → 查表 → 查重（`state.giftCodes[code]`）→ 发奖（金币/材料/坐骑）→ 记录 `{redeemedAt}` → `saveGame`。UI 入口是"帮助页"里的一个输入框（`ui.js:3244-3251`，`renderHelp` `ui.js:1998`）。

【推断】礼包码是**硬编码在客户端**的，任何人都能从 bundle 里读出全部码。这在单机游戏里可接受（礼包码本身是营销手段而非付费内容），但如果未来要发"付费/限时码"就必须走服务端。

### 8.5 更新日志与公告

【事实】更新日志是**源码内常量**：

```js
// _idlewow/src/ui.js:76-94
const VERSION_CHANGELOG = [
  {
    version: '0.9.0',
    changes: [
      '玛法里奥宁静之雨改为全体恢复，附加持续伤害抵抗',
      '任务栏可折叠，支持隐藏已完成任务',
      ... 共 12 条 ...
    ]
  }
];
```

【事实】渲染时按版本号降序排序（`ui.js:96-104` 的 `compareVersionDesc`，`ui.js:3130`），当前版本标"（当前版本）"（`ui.js:3133`）。弹窗由 `renderVersionUpdatesModal` 渲染（`ui.js:3114-3143`），入口在帮助页。

【事实】**只有 1 个版本条目**（0.9.0）。【推断】即"更新日志"是最近才补的功能，历史版本没回填——**这本身是一个可复用的教训：更新日志应该在每次发版时由构建流程强制写入**（从 git log 或 CHANGELOG.md 生成），而不是手工维护源码常量。

【事实】公告/通知机制在项目里是"三处硬编码"：

| 位置 | 内容 |
| --- | --- |
| `ui.js:947` | HUD 里常驻 `🐧 QQ群：1046117607` |
| `ui.js:183` | `CLOUD_OFFLINE_NOTICE` 显示在云存档两个弹窗的顶部（`ui.js:495`、`538`） |
| `ui.js:3161` | 开始页显示群号（`ui.js:3161`） |

【推断】**没有"服务端下发公告"的通道。** 一个在运营的游戏如果要发"维护公告/活动公告"，只能重新发版。FF14 Idle 应该在 `game-auth` 云函数上加一个 `get-notices` action 并缓存到 localStorage。

### 8.6 运营功能的接入方式总结

| 功能 | 数据在哪 | 接入成本 | 复用建议 |
| --- | --- | --- | --- |
| 云存档 | 云函数 `game-auth` + 本地 session | 中（需自建云函数） | 协议设计（sequence 冲突判定）照搬；**补上上传路径与"覆盖前快照"** |
| 登录/注册 | 同上 | 中 | 表单校验规则照搬 |
| 广告 | 抽象层已就绪但未接线 | **低**（只需 `registerAdProvider`） | 直接照搬 `ads.js`，"无平台时直接发奖"这个降级策略非常好 |
| 礼包码 | 客户端常量 | 低 | 短期照搬；有付费内容则必须服务端 |
| 每日次数限制 | 客户端 `dailyDate()` 比较 | 低 | 照搬，但要意识到可被改系统时间绕过 |
| 更新日志 | 源码常量 | 低 | 照搬思路，但改为构建期生成 |
| 公告 | 无 | 高（需新开接口） | 新做：服务端下发 + 本地缓存 + 已读标记 |

---

## 9. 代码规模与模块健康度

### 9.1 行数分布（脚本统计，含文件头注释）

| 排名 | 模块 | 行数 | 非空行 | 导出数 | 出度 | 入度 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `ui.js` | 8699 | 8424 | 1 | 29 | 1 |
| 2 | `game/content.js` | 5525 | 5509 | 6 | 1 | 6 |
| 3 | `game/battle.js` | 4601 | 4466 | 46 | 7 | 7 |
| 4 | `game/engine.js` | 3648 | 3443 | 162 | 21 | 4 |
| 5 | `game/battleground.js` | 1148 | 1086 | 47 | 13 | 1 |
| 6 | `game/items.js` | 933 | 922 | 3 | 2 | 7 |
| 7 | `game/arena.js` | 825 | 756 | 50 | 14 | 2 |
| 8 | `game/professions.js` | 739 | 695 | 34 | 0 | 6 |
| 9 | `game/save.js` | 732 | 690 | 14 | 10 | 6 |
| 10 | `game/talents.js` | 596 | 574 | 12 | 3 | 8 |
| 11 | `arena_battle_view.js` | 538 | 498 | 1 | 6 | 1 |
| 12 | `battle_anim.js` | 535 | 499 | 1 | 3 | 2 |
| 13 | `game/challenges.js` | 528 | 499 | 14 | 5 | 2 |
| 14 | `game/skills.js` | 513 | 490 | 14 | 2 | 8 |
| 15 | `game/sets.js` | 508 | 481 | 15 | 3 | 3 |
| 16 | `battleground_view.js` | 443 | 410 | 1 | 2 | 1 |
| 17 | `game/cloud-save.js` | 240 | 215 | 6 | 1 | 1 |
| 18 | `game/prefixes.js` | 211 | 197 | 9 | 1 | 3 |
| 19 | `challenge_battle_view.js` | 197 | 181 | 1 | 3 | 1 |
| 20 | `game/hero-quests.js` | 166 | 162 | 2 | 0 | 2 |
| 21 | `game/pvp-talents.js` | 156 | 151 | 2 | 0 | 3 |
| 22 | `game/armor.js` | 156 | 139 | 11 | 1 | 3 |
| 23 | `game/idb.js` | 147 | 132 | 6 | 0 | 4 |
| 24 | `game/dropdb.js` | 136 | 114 | 2 | 5 | 0 |
| 25 | `game/effect-labels.js` | 122 | 115 | 3 | 0 | 7 |
| 26 | `game/inventory.js` | 121 | 107 | 7 | 2 | 2 |
| 27 | `game/tasks.js` | 116 | 104 | 5 | 2 | 5 |
| 28 | `game/classes.js` | 110 | 102 | 6 | 0 | 7 |
| 29 | `game/config.js` | 102 | 96 | 11 | 1 | 6 |
| 30 | `game/pvp-skills.js` | 101 | 97 | 1 | 0 | 2 |
| 31 | `game/ads.js` | 77 | 66 | 7 | 0 | **0** |
| 32 | `game/heroes.js` | 73 | 68 | 4 | 0 | 5 |
| 33 | `game/mounts.js` | 63 | 57 | 4 | 0 | 2 |
| 34 | `game/achievements.js` | 59 | 55 | 2 | 0 | 2 |
| 35 | `cloudbase.js` | 41 | 34 | 2 | 0 | **0** |
| 36 | `game/names.js` | 36 | 32 | 2 | 0 | 3 |
| 37 | `game/rng.js` | 36 | 31 | 4 | 0 | 6 |
| 38 | `game/levels.js` | 23 | 18 | 4 | 0 | 2 |
| 39 | `game/gift-codes.js` | 14 | 11 | 1 | 0 | 1 |
| 40 | `main.js` | 10 | 6 | 0 | 1 | 0 |
| — | **合计** | **33,024** | **31,674** | — | — | — |

【事实】规模集中度极高（帕累托）：

| 指标 | 数值 |
| --- | --- |
| 前 4 个文件行数 | 22,473 = **68.0%** |
| 前 10 个文件行数 | 27,475 = **83.2%** |
| 最大的 1 个文件 | 8,699 = **26.3%** |
| 中位数模块行数 | ~180 |
| ≥1000 行的文件 | 5 个 |

### 9.2 依赖图

【事实】完整依赖边（40 模块 / 84 条边，`from -> to`）按"被依赖目标"归类如下：

```
ui.js              -> 29 个模块（game/ 下 25 个 + battle_anim + 3 个 *_view）
game/engine.js     -> config content names heroes hero-quests levels battle idb rng talents sets
                      skills armor mounts gift-codes prefixes tasks achievements professions save inventory
game/battle.js     -> config items talents skills armor rng sets
game/save.js       -> levels heroes professions config talents skills items prefixes inventory tasks
game/arena.js      -> config items battle talents skills prefixes professions tasks names rng save engine heroes idb
game/battleground.js -> config items mounts battle talents arena tasks names rng save engine heroes idb
game/challenges.js -> battle engine save rng content
game/dropdb.js     -> professions content items arena battleground
game/inventory.js  -> content professions        game/items.js  -> sets armor
game/sets.js       -> skills pvp-talents effect-labels
game/talents.js    -> skills pvp-talents effect-labels   game/skills.js -> pvp-skills effect-labels
game/armor.js      -> classes     game/config.js -> classes     game/content.js -> items
game/cloud-save.js -> save        game/prefixes.js -> talents   game/tasks.js -> rng content
arena_battle_view.js  -> battle classes items talents skills effect-labels
battle_anim.js        -> classes battle effect-labels
battleground_view.js  -> classes effect-labels
challenge_battle_view.js -> battle_anim classes challenges
main.js            -> ui.js
```

【事实】入度排名（被依赖次数 = 修改影响面）：

| 入度 | 模块 | 含义 |
| --- | --- | --- |
| 8 | `game/skills.js`、`game/talents.js` | **改这两个文件的签名影响 8 个模块** |
| 7 | `game/effect-labels.js`、`game/battle.js`、`game/classes.js`、`game/items.js` | 核心 |
| 6 | `game/content.js`、`game/rng.js`、`game/save.js`、`game/config.js`、`game/professions.js` | 核心 |
| 5 | `game/heroes.js`、`game/tasks.js` | 中 |
| 4 | `game/idb.js`、`game/engine.js` | 中 |
| 0 | `game/ads.js`、`cloudbase.js` | **死模块** |

【事实】出度排名（被依赖最多 = 耦合最重）：`ui.js` 29、`engine.js` 21、`arena.js` 14、`battleground.js` 13、`save.js` 10。

【事实】无环（DFS 检测通过）。分层清晰：

```
L0 数据/工具： classes, config, rng, levels, names, effect-labels, pvp-skills, pvp-talents, achievements,
              gift-codes, mounts, heroes, hero-quests, idb
L1 内容表：   content, items, armor, sets, skills, talents, prefixes, tasks, professions, inventory
L2 模拟：     battle
L3 系统：     save, engine, challenges, arena, battleground, dropdb, cloud-save
L4 视图：     battle_anim, arena_battle_view, battleground_view, challenge_battle_view
L5 组装：     ui, main
```

【推断】这个分层是**健康的**：数据 → 模拟 → 系统 → 视图，依赖只向下。唯一的问题是 `ui.js` 直接依赖 29 个模块（包括 `engine`、`save`、`battle`），**它同时扮演"视图层"和"应用层"两个角色**，这是它膨胀到 8699 行的结构性原因。

### 9.3 技术债与坑清单

#### 9.3.1 超长文件

| 文件 | 行数 | 问题 |
| --- | --- | --- |
| `ui.js` | 8699 | 视图 + 应用层混杂；248 函数；162 全局变量；234 分支分发器 |
| `content.js` | 5525 | 94% 是数据；但末尾 330 行的"注入补丁"让主表不再自包含 |
| `battle.js` | 4601 | 114 个函数；副本/PvP/战场三套战斗混在一个文件 |
| `engine.js` | 3648 | 174 个函数；162 个导出；扮演"领域模型 + 用例层"双角色 |
| `battleground.js` | 1148 | 单文件实现地图 + 单位 + 战斗 + 商店 + 回放 |

#### 9.3.2 全局状态

【事实】`battle.js` 有 **8 个模块级可变全局**：

```js
// _idlewow/src/game/battle.js:674-685
let actSeq = 0;              // 行动序号（回放分组用）
let battleParty = [];        // 当前战斗我方（供被动/套装 hook 读取）
let battleEnemies = [];      // 当前战斗敌方
let activeRules = null;      // 挑战规则门（noHeal/noConsumables...）
let activeBattleRng = null;  // 当前战斗随机源
let inAct = false;           // 是否在"一次行动"内（决定事件是否共享 act）
let currentRound = 1;
let pvpRoundMultiplier = 1;
```

【事实】这些全局让 `fightRound` 变成了**不可重入**的函数：`activeBattleRng = rng; battleParty = party; battleEnemies = enemies;`（`battle.js:3724-3726`）。

【推断】风险：

1. **无法并行模拟**（例如"离线期间批量结算 10 场战斗"就做不到）。
2. **嵌套调用会串场**（如果某个 hook 里触发了另一场战斗）。
3. **单元测试困难**（必须先摆好全局）。

【事实】`ui.js` 有 **162 个模块级 `let`**（`ui.js:198-377`、`5399`、`8084-8085`），典型如：

```js
let currentTab = 'guild';  let openReportId = null;  let memberDetailId = null;
let invFilterQualities = new Set();  let memberFilterClasses = new Set();
let arenaMode = '2v2';  let arenaSelected = [];  let arenaOpponents = null;  ...
```

【推断】这些变量构成事实上的"UI 状态机"，但没有类型、没有穷举、没有重置函数（`newGame` 后部分变量靠 `initGame()` 侧漏式重置）。

#### 9.3.3 DOM 性能风险

| 风险 | 证据 | 量级 |
| --- | --- | --- |
| 每次操作全量重绘 | 296 处 `renderAll()` 调用 | 每次点击最多重建 11 Tab + 30 弹窗 |
| innerHTML 整体替换 | 88 处 `innerHTML =` | 丢失焦点/滚动/动画 |
| 会员名彩色化的正则替换 | `ui.js:171-181` | 100 名会员 → 生成含 100 个分支的正则，每次渲染跑一遍 |
| `getElementById` 高频 | 102 处 | 大部分在渲染函数内，全量重绘时被反复调用 |
| 弹窗未打开也走渲染分支 | `ui.js:8001-8031` | 30+ 次函数调用（虽然多数早退） |
| 大列表无虚拟滚动 | `renderInventory`/`renderMembers` | 背包上限 500、会员上限 100 |

【事实】`renderAll` 的性能保护措施：

```js
// _idlewow/src/ui.js:7954-7966（节选）
const keepScrollY = scrollToTop ? null : Math.max((pageScroller && pageScroller.scrollTop) || 0, window.scrollY || 0);
...
// _idlewow/src/ui.js:8033-8045
if (keepScrollY !== null) { const restore = () => {...}; restore(); if (requestAnimationFrame) requestAnimationFrame(restore); }
```

【推断】作者已经意识到全量重绘的代价（滚动保持 + rAF 二次修正就是为了对抗重绘闪动），但没有选择改变架构。**对一个放置游戏来说这个选择勉强成立**（玩家操作频率低），但如果 FF14 Idle 想要更流畅（比如战斗中实时刷新血条、背包拖拽排序），必须换掉。

#### 9.3.4 数据与耦合陷阱

| 陷阱 | 证据 | 风险 |
| --- | --- | --- |
| 中文房间名当主键 | `content.js:5262`、`5322`、`5348` | 改名/错字 → **静默丢掉落** |
| 字符串正则生成装备 id | `content.js:5369` | 命名约定变更 → 掉落消失 |
| 迭代顺序决定语义 | `content.js:5203` 先改 BOSS 数值，之后注入表引用 | 顺序错了数值就错 |
| 依赖导出是值快照 | `save.js:721-722` + `ui.js:22` | 换成会变的量立刻出 bug |
| 中文关键词推断技能类型 | `content.js:5271-5288` | 新技能名不含关键词 → 被当物理技能 |
| 手写装备属性被重写 | `armor.js:117-138` 的 `armorize` | 策划手写值被静默重分配 |
| 重复 import | `engine.js:27-28` 两次 import `INVENTORY_CAP`；`content.js:7-8` 两次 import `ITEMS` | 冗余，易误改一处 |
| 迁移顺序敏感 | `save.js:467-468` 注释 | 已有一次踩坑记录 |
| 配方等级字面量是 1~60 但上限是 10 | `professions.js:376-...` vs `PROF_LEVEL_CAP = 10`；靠 `RECIPE_LEVEL_MAP`（`professions.js:608-609`）事后重映射 | 读源码时会误判，改动必须知道有这个 remap |

#### 9.3.5 安全与合规

| 项 | 证据 | 风险 |
| --- | --- | --- |
| 存档摘要非加密 | `save.js:125` 注释自称 | 可篡改（单机可接受） |
| 时间基于 `Date.now()` | `engine.js:2976`、`3012` | 改时钟绕过等待与每日上限 |
| 测试后门进生产 | `ui.js:8122`、`8134-8138`、`engine.js:2977-2978` | 中（需能执行 JS） |
| 礼包码硬编码 | `gift-codes.js:6-11` | 泄露（营销码可接受） |
| 云存档无上传、下载覆盖无快照 | `cloud-save.js:146-180` | **数据丢失风险** |
| 下载云端不校验 role 之外的权限 | `cloud-save.js:161` | 低 |
| 无 CSP/无 SRI（`cloudbase.js` 动态注入远程脚本） | `cloudbase.js:16-24` | 中（第三方脚本可被替换） |

### 9.4 健康度评分

| 维度 | 评分 | 理由 |
| --- | --- | --- |
| 功能完成度 | ★★★★★ | 副本/PvP/战场/挑战/生产/成就/任务/图鉴全齐 |
| 架构分层 | ★★★★☆ | 依赖 DAG 清晰；但 `ui.js` 越层当应用层 |
| 可维护性 | ★★☆☆☆ | 5 个千行文件 + 234 分支 + 162 全局变量 |
| 可测试性 | ★☆☆☆☆ | 全树无测试；`battle.js` 全局态阻碍单测 |
| 性能 | ★★★☆☆ | tick 设计优秀；全量重绘是隐患 |
| 数据安全 | ★★★☆☆ | 备份/隔离区/摘要齐全；云存档覆盖无快照、release 门会静默删档 |
| 反作弊 | ★★☆☆☆ | 客户端权威、时间可改 |
| 可扩展性（加内容） | ★★★☆☆ | 数据驱动好，但改动面分散（见 6.5） |

---

## 10. 可复用性结论与 FF14 Idle 项目骨架建议

### 10.1 可以直接照搬的设计（按优先级排序）

| # | 设计 | 源码依据 | 为什么值得照搬 |
| --- | --- | --- | --- |
| 1 | **"派遣即结算 + 时间戳状态机 + 收获幂等"的放置闭环** | `engine.js:2938-3065`、`ui.js:7889-7915` | 不需要"离线收益计算器"，天然支持离线、天然防连点。放置游戏的核心范式 |
| 2 | **注入式 RNG + seed + roster 快照 → 可复现战报** | `rng.js:7-16`、`engine.js:2214-2249`、`2252-2315` | 让"回放"不需要存日志（存档体积降一个数量级），同时保证回放与结算同源 |
| 3 | **"门槛 + 优先级"的自动战斗技能 AI** | `battle.js:2116-2201` | 把"玩家意图"与"AI 安全性"解耦；自动战斗可玩性的关键 |
| 4 | **trace 事件流 + act 合并 + 时长=回放时长** | `battle.js:3276-3305`、`engine.js:2207-2210` | 一份数据同时驱动动画、日志、战斗时长、回放 |
| 5 | **存档完整性 + 备份 + 隔离区 + 序列号** | `save.js:113-157`、`211-267` | 低成本换来"不丢档"；`sequence` 是云同步的必需品 |
| 6 | **序列化裁剪（日志出主档 → IndexedDB）** | `save.js:161-205`、`idb.js:1-146` | 放置游戏日志必然爆炸，这是标准解法 |
| 7 | **数值当量预算（天赋/词缀/护甲三处同源）** | `talents.js:31-72`、`prefixes.js:37`、`armor.js:53` | 让"随机掉落不掉废件"和"平衡可计算"同时成立 |
| 8 | **声明式 `migrate`（幂等补默认 + 条件重写）** | `save.js:304-716` | 老档兼容的实用手法；比"版本链迁移"更好写 |
| 9 | **存储/广告的后端可插拔抽象层 + 降级** | `save.js:53-107`、`idb.js:22-24`、`ads.js:19-48` | 无平台时直接发奖 / 无 IndexedDB 回落内存，保证任何环境可玩 |
| 10 | **渲染错误隔离 + 错误横幅** | `ui.js:7919-7950` | 全量重绘架构下的必需品，成本极低 |
| 11 | **掉落查询自动从数据表倒排** | `dropdb.js:1-136` | 消除"帮助文档与数据不同步"这个永久痛点 |
| 12 | **单旋钮难度 `q`（配置合理度）** | `arena.js:47-74` | 比"乘 HP 倍率"更自然，且一个数就调平衡 |
| 13 | **中文文案与数据同表（`name`/`desc` 直写在数据里）** | 全项目 | 单语言项目开发效率最高；代价是本地化困难 |
| 14 | **1 Hz tick 只改进度条，不重绘** | `ui.js:7889-7915`、`8049-8071` | 放置游戏 UI 性能的关键 |

### 10.2 必须重做的部分

| # | 原设计 | 问题 | FF14 Idle 应该怎么做 |
| --- | --- | --- | --- |
| 1 | 自建 `__ns` 模块系统 + 手写拓扑序 | 无校验、值快照语义、无 tree-shaking、注释会破坏构建 | **标准 ESM + Vite/tsup**；单文件发布作为可选产物 |
| 2 | 8699 行的 `ui.js`（视图+应用层） | 无法协作/测试；162 全局变量 | **拆分**：`app/`（应用层）+ `views/`（每个 Tab 一个模块）+ `store` |
| 3 | `data-action` + 234 个 `if` 的分发器 | 无法静态分析、分支顺序敏感、易漏 `renderAll` | **handler 映射表**（`ACTIONS[action]`），未注册 action 打警告 |
| 4 | 全量 `innerHTML` 重绘 | 丢焦点、无 keyed diff、大列表卡 | **组件化 + keyed diff**（Preact/lit/或自己写 keyed 列表）；进度条走直改 DOM |
| 5 | `battle.js` 8 个模块级可变全局 | 不可重入、不可并行、难测试 | **战斗上下文对象 `BattleCtx`**，所有状态显式传参 |
| 6 | 奖励用裸 `Math.random()` | 无法回放/审计 | **全部随机走注入 RNG**；种子与用途分离（`rng.fork('loot')`） |
| 7 | 中文房间名 / 字符串正则当主键 | 静默失效 | **稳定 id + 校验**：加内容时跑一次"内容一致性检查"（掉落 id 是否存在、房间 id 是否重复） |
| 8 | 数据分散在 6 张表 + 事后注入补丁 | 改动面 10 项，顺序敏感 | **一个内容一个文件/对象**；注入改为"引用"（内容里写明 `drops`），或写一个构建期校验器 |
| 9 | 客户端权威时间与存档 | 改系统时间即可作弊 | **服务端权威时间**（发放/校验），客户端只做乐观 UI |
| 10 | `saveBranch` 静默删档 | 丢档风险 | 改为**提示 + 手动选择**；或只在检测到"确为测试分支"时清理 |
| 11 | 三套战斗管线（副本/PvP/战场） | 代码重复、维护三份 | **一个战斗内核 + 不同"规则插件"**（原作已有 `setBattleRules` 的雏形：`battle.js:677-681`） |
| 12 | 版本号既当"存档 schema"又当"迁移序号" | 原项目已是 30 但注释混用 | **分离**：`schemaVersion`（迁移用，严格递增）+ `contentVersion`（内容/发版用） |
| 13 | 云存档只读、覆盖无快照 | 数据丢失 | 补**上传 + 覆盖前快照 + 显式"以哪边为准"** |
| 14 | 更新日志/公告写死在源码 | 每次都要发版 | **构建期生成 changelog + 服务端下发公告** |
| 15 | 无任何测试 | 改动全靠手测 | 至少覆盖：**迁移、战斗确定性、经济守恒、内容一致性** 四类 |

### 10.3 给 FF14 Idle 的项目骨架建议

#### 10.3.1 目录结构

```
ff14-idle/
├─ src/
│  ├─ main.ts                       # 入口：挂载 store、启动调度器、注册路由
│  ├─ core/                         # 与题材无关的基础设施（可整包复用）
│  │  ├─ rng.ts                     # mulberry32 + fork(seed) + 注入式 RNG 接口
│  │  ├─ storage/{local.ts, idb.ts, index.ts}     # localStorage / IndexedDB / 统一接口（含内存回落）
│  │  ├─ save/{codec.ts, backup.ts, export.ts}    # 规范化+摘要、备份/隔离/恢复、导入导出
│  │  ├─ schema/{version.ts, migrations/index.ts, migrations/m00X_*.ts}   # 有序迁移数组
│  │  ├─ time.ts                    # Clock 接口（Date.now 可注入）
│  │  ├─ events.ts / logger.ts      # 事件总线（日志/遥测/通知）
│  ├─ data/                         # 纯数据，零逻辑（可 JSON 化，便于策划改）
│  │  ├─ jobs.ts / combat-jobs.ts / skills.ts / traits.ts / buffs.ts
│  │  ├─ items.ts / item-sets.ts / materia.ts
│  │  ├─ dungeons.ts / trials.ts / raids.ts / enemies.ts / loot-tables.ts
│  │  ├─ recipes.ts / materials.ts / currencies.ts / vendors.ts
│  │  ├─ mounts.ts / minions.ts / orchestrion.ts / achievements.ts / quests.ts
│  │  └─ index.ts                   # 统一导出 + 构建期校验入口
│  ├─ sim/                          # 战斗内核（与视图完全解耦，纯函数优先）
│  │  ├─ ctx.ts                     # BattleCtx：所有可变状态显式持有（替代 battle.js 的全局）
│  │  ├─ actor.ts / stats.ts        # makeActor / 属性管道（加法桶 + 乘法桶）
│  │  ├─ damage.ts / threat.ts      # 伤害治疗管线 / 仇恨（PvE）
│  │  ├─ skills.ts / periodic.ts    # 门槛+优先级 AI / DoT·HoT·buff tick 与合并
│  │  ├─ rules.ts                   # 规则插件（挑战 modifier / 零式 / PvP 差异）
│  │  ├─ dungeon.ts / pvp.ts        # 房间波次推进 / 对称战斗
│  │  ├─ trace.ts / replay.ts       # 事件流类型与时长 / seed+roster 重算
│  ├─ game/                         # 领域用例（改 state 的唯一入口）
│  │  ├─ state.ts / new-game.ts / roster.ts
│  │  ├─ expedition.ts / gather.ts / craft.ts
│  │  ├─ inventory.ts / equip.ts / progression.ts / combat-jobs.ts
│  │  ├─ market.ts / quests.ts / achievements.ts / codex.ts / dailies.ts
│  │  └─ telemetry.ts
│  ├─ online/                       # 在线能力（可选、可降级）
│  │  ├─ api.ts / auth.ts           # 统一 fetch（action 协议）/ 登录注册会话
│  │  ├─ cloud-save.ts              # 上传·下载·冲突（sequence 判定）
│  │  ├─ notices.ts / ads.ts        # 公告下发+已读 / 广告抽象层
│  ├─ ui/
│  │  ├─ shell.ts                   # 外壳 + Tab 路由
│  │  ├─ store.ts                   # uiState（替代 162 个 let）+ 订阅
│  │  ├─ actions.ts                 # ACTIONS 映射表（替代 234 个 if）
│  │  ├─ components/                # Panel / List / Modal / ProgressBar / Tooltip / Table
│  │  ├─ views/                     # 每个 Tab 一个模块
│  │  │  free-company / retainers / duty-finder / expeditions / crafting / inventory /
│  │  │  grand-company / pvp / trials / collection / help
│  │  └─ modals/
│  └─ tools/                        # 构建期校验与生成（不进运行时包）
│     ├─ validate-content.ts        # 掉落 id 存在 / 房间 id 唯一 / 无孤儿引用
│     ├─ validate-balance.ts        # 当量预算报表（复用 talentBudget/itemBudget 思路）
│     └─ gen-changelog.ts           # 从 git/CHANGELOG 生成版本更新数据
├─ tests/
│  ├─ sim/determinism.test.ts       # 同 seed + 同 roster → 逐事件一致
│  ├─ save/{migration,integrity}.test.ts
│  ├─ game/economy.test.ts          # 产出/消耗守恒、无负货币
│  └─ data/content.test.ts          # 内容引用完整性
├─ docs/                            # 本目录（含本文）
└─ vite.config.ts
```

#### 10.3.2 模块划分原则（一句话版）

```
core/  不依赖任何游戏概念，可以整包复制到下一个项目
data/  只有数据，没有函数（或只有纯函数生成器）；可被 tools/ 静态校验
sim/   纯函数为主：输入 (state 快照, rng, 规则)，输出 (结果, trace)，不改 state
game/  唯一允许修改 state 的地方；每个用例 = 校验 → 改 state → 落盘 → 发事件
ui/    唯一允许碰 DOM 的地方；只读 state，只通过 game/ 的用例改 state
online/ 可选依赖，任何失败都不得阻塞离线可玩
```

【建议】把"依赖方向"写成 ESLint 规则强制（`core` 不能 import `game`，`sim` 不能 import `ui` 等），这是原项目靠人肉维护的那条约定（`inventory.js:11`）的自动化版本。

#### 10.3.3 数据表划分（对照原作）

| FF14 Idle 表 | 对应原项目 | 关键改进 |
| --- | --- | --- |
| `jobs` | `classes.js` CLASSES | 加 `role`/`canTank`/`armorType`（照搬），但 **id 用稳定英文 slug，name 与 desc 分离**（便于将来本地化） |
| `skills` | `skills.js` SKILLS | 照搬"类型 + 门槛字段 + cd"；**把 `usable` 的门槛参数化进数据**（`condition: {type:'allyHpBelow', pct:0.85}`）而不是硬编码在 `chooseSkill` 里 |
| `traits` | `talents.js` TALENT_TREES | 照搬"每级三选一 + 当量预算"；**把 `TIER_BUDGET` 抽成工具函数并配校验脚本** |
| `buffs` | 散落在 `battle.js`（`buffs.dots/hots/shield/...`） | **集中定义**（id/名称/图标/时长/是否可驱散/是否可叠层），避免字符串键散落 |
| `items` | `items.js` ITEMS | 加 `itemLevel`/`tier`/`source`, 去掉"名字推断类型"的隐式规则 |
| `item-sets` | `sets.js` SETS | 照搬 2/3/5 档位 + 分支三选一 |
| `materia` | `prefixes.js` PREFIXES | 照搬"当量守恒 + 方向 profile"；FF14 语义天然契合（魔晶石） |
| `dungeons` | `content.js` DUNGEONS | **一个副本一个文件**；房间用稳定 id（不用中文名做主键）；掉落直接引用 `lootTables` |
| `loot-tables` | 散落在 `room.loot[]` + 6 张注入表 | **抽成独立表**，副本只引用 id；掉率改动不改副本 |
| `enemies` | 散落在 `room.mobs[]`/`boss` | 抽成独立表，支持"同一敌人复用在不同副本" |
| `recipes` / `materials` | `professions.js` | 材料加 `tier`/`category`/`vendorPrice`；配方加 `job`/`level`（**不再需要事后 remap**） |
| `currencies` | 无（金币+徽章+荣誉散落各处） | **统一货币表**，所有产出/消耗都记名 |
| `dailies` / `weeklies` | `tasks.js` | 加 `reset: 'daily'|'weekly'`（FF14 有周常） |
| `notices` | 无 | 服务端下发 |

#### 10.3.4 存档数据模型（v1 建议）

```ts
// 与原作的关键差异：schemaVersion 与 contentVersion 分离；每个子系统一个命名空间；state 只存"事实"，不存"派生值"
interface GameState {
  schemaVersion: number;        // 严格递增，迁移用
  contentVersion: string;       // 内容表版本（发版用）
  saveId: string;
  updatedAt: number;
  createdAt: number;
  profile: { name: string; world: string; locale: string; theme: 'dark'|'light' };
  settings: { ... };
  freeCompany: { level, exp, gil, rank, seals, memberCap, unlockedJobs: string[] };
  members: Member[];            // 雇员
  inventory: { items: Item[], materials: Record<MatId, number>, currencies: Record<CurrencyId, number> };
  armory: { ... };              // 装备库（FF14 有"武具库"概念）
  progression: { jobs: Record<JobId, {level, exp}>, traits: Record<JobId, Record<tier, choice>>, skills: ... };
  duties: { cleared: Record<DutyId, {firstClearAt, runs}>, progress: ... };
  expeditions: Expedition[];    // 放置核心
  gathers: Record<GatherJob, GatherTask>;
  crafting: { recipesUnlocked: string[], ... };
  dailies: { daily: DailyState, weekly: WeeklyState };   // date 由 Clock 提供
  collection: { mounts: [], minions: [], orchestrion: [], achievements: {} };
  notices: { readIds: string[] };
  flags: Record<string, unknown>;   // 迁移标记
  _integrity: { version: 1; algorithm: 'fnv1a32'; digest: string; sequence: number };
}
```

【建议】三条硬规则：

1. **不存派生值**。原作的 `member.xpToNext`、`guild.memberCap` 都存在档里（`engine.js:200`、`234`）并且每次加载被重算（`save.js:368`、`500`）——这是"冗余字段"，改公式时必须迁移。派生值应该每次从公式算。
2. **数组元素必带稳定 id**，且 `id` 不参与排序语义。
3. **所有日期用 `Clock`**（可注入），便于测试与服务端对齐。

#### 10.3.5 核心循环伪代码

```ts
// ---------- 1) 启动：把"离线期间流逝的时间"折算成状态推进 ----------
function boot(storage: Storage, clock: Clock): GameState | null {
  const raw = storage.load('main');
  let state = verifyIntegrity(raw).valid ? raw
            : (tryRestoreFromBackup(storage) ?? quarantineAndReturnNull(storage, raw));
  if (!state) return null;                       // → 渲染"创建角色"页
  state = applyMigrations(state);                // schemaVersion → 当前
  advanceTimers(state, clock.now());             // ★ 离线推进（幂等）
  pruneLarge(storage, liveKeys(state));          // 清 IndexedDB 孤儿
  return state;
}

// ★ 离线推进：**不做"离线收益计算"**，只把到期的 running 推成 ready
function advanceTimers(state: GameState, now: number) {
  for (const e of state.expeditions)
    if (!e.collected && e.status === 'running' && now - e.startTs >= e.durationMs) {
      e.status = 'ready'; onExpeditionReady(e);   // 发事件（UI 红点 / 通知）
    }
  for (const g of Object.values(state.gathers))
    if (g.status === 'running' && now >= g.endTs) g.status = 'ready';
}

// ---------- 2) 调度器：**没有 tick 产出**，只有"到点通知" ----------
class Scheduler {
  frame(now: number) {                            // 由 requestAnimationFrame 驱动
    if (now - this.lastCheck >= 1000) {           // 1 Hz：状态推进
      this.lastCheck = now;
      if (advanceTimers(this.state, this.clock.now())) this.emit('timers');
    }
    if (now - this.lastUiTick >= 100) {           // 10 Hz：只更新进度条（直改 DOM，不重绘）
      this.lastUiTick = now;
      this.progressBars.update(this.state, this.clock.now());
    }
  }
}

// ---------- 3) 派遣 → 结算 → 收获（放置闭环） ----------
function dispatch(state, dungeonId, memberIds, opts) {
  const dungeon = DUNGEONS[dungeonId]; assertUnlocked(state, dungeon);
  const busy = busyMemberIds(state);
  const ids = memberIds.length ? memberIds : recommendParty(state, dungeon, busy);
  assert(!ids.some(id => busy.has(id)), '成员正在外出');

  const seed = randomSeed();                                   // 一次性种子
  const roster = ids.map(id => snapshotMember(state, id));      // ★ 快照：之后改装备不影响本场
  const plan = planDungeon(state, dungeon, roster, opts, createRng(seed));
  consumeConsumables(state, plan.consumables);                 // 先校验后扣
  const exp: Expedition = {
    id: uid(), dungeonId, memberIds: ids, seed, roster, startTs: clock.now(),
    durationMs: traceDurationMs(plan.trace),                   // ★ 时长 = 回放时长
    status: 'running', collected: false,
    result: stripHeavy(plan.result),                           // 只留轻量结果
  };
  putLarge(`exp:${exp.id}`, { log: plan.result.log });         // 重内容进 IDB
  state.expeditions.push(exp); save(state);
  return { exp, trace: plan.trace };                           // trace 只留在内存里给动画用
}

function collect(state, expId) {
  const exp = findExpedition(state, expId); assert(exp.status === 'ready', '尚未完成');
  if (state.reports.some(r => r.kind === 'expedition' && r.expeditionId === exp.id)) {
    removeExpedition(state, exp.id);                           // ★ 幂等：已结算过就只清理
    return { alreadyCollected: true };
  }
  // 用"当前版本规则 + 原种子"重算，保证回放与结算同源（同原作的取舍）
  const replay = replayExpedition(exp, createRng(exp.seed));
  const rewards = applyExpeditionResult(state, replay, { seed: exp.seed });
  removeExpedition(state, exp.id); save(state); return rewards;
}

// ---------- 4) 模拟内核：**纯函数**（不 import ui、不写 state） ----------
function planDungeon(state, dungeon, roster, opts, rng) {
  const ctx = createBattleCtx({ rng, dungeon, rules: activeRules });  // ★ 替代原作的 8 个全局
  const party = roster.map(s => makeActor(state, s));
  const trace: TraceEvent[] = [];
  for (let i = 0; i <= (opts.endRoomIdx ?? dungeon.rooms.length - 1); i++) {
    const room = dungeon.rooms[i];
    pushSnapshot(trace, party, room.enemies, room.name);
    if (!runRoom(ctx, party, room, trace)) return finalize({ win: false, wipeRoom: room.name }, trace, ctx);
    rollRoomLoot(ctx, room);                                   // 掉落全部走 ctx.rng
    restAndRevive(party, trace);
  }
  return finalize({ win: true }, trace, ctx);
}

// 回合结算（顺序必须稳定，因为它决定 trace 与回放步进）
function runRound(ctx, round) {
  applyAuras(ctx); applyOpeningEffects(ctx);
  const order = [...ctx.party, ...ctx.enemies].filter(u => u.alive)
    .sort((a, b) => speed(b, ctx) - speed(a, ctx) || b.stats.attack - a.stats.attack);
  for (const actor of order) {
    if (!actor.alive || !bothSidesAlive(ctx)) break;
    beginAct(ctx);                                             // 之后的事件共享同一 act
    actor.isEnemy ? enemyAct(ctx, actor) : memberAct(ctx, actor);
    endAct(ctx);
  }
  settleDots(ctx, round); settleHots(ctx); tickBuffs(ctx);      // 回合末统一结算（各合并为一个 act）
  pushStats(ctx.trace, ctx);
}

// 技能 AI：门槛 + 优先级（**照搬原作最值得学的部分**）
function chooseSkill(ctx, actor) {
  const ready = actor.skills.filter(s => s.cd <= 0 && s.type !== 'passive');
  for (const id of actor.skillPriority) {                       // 玩家可配；缺省按职责生成
    const s = ready.find(x => x.id === id);
    if (s && skillConditionMet(ctx, actor, s)) return s;         // ★ 条件写在数据里，不写在 if 里
  }
  return null;
}
```

#### 10.3.6 FF14 Idle 的"第一个可玩切片"（建议里程碑）

| 里程碑 | 内容 | 复用原项目的 |
| --- | --- | --- |
| M1 | `core/rng` + `core/storage` + `core/save`（含 integrity/backup/migrate 骨架）+ 一个空 state | `rng.js`、`save.js`、`idb.js` |
| M2 | 8 个战斗职业 + 属性管道 + 单个副本可自动打 | `classes.js`、`battle.js:222-321`、`content.js` 单条目 |
| M3 | **远征闭环**（派遣 → 进度条 → 收获）+ 幂等 + IDB 日志 | `engine.js:2938-3065`、`ui.js:7889-7915` |
| M4 | 掉落表 + 装备 + 魔晶石（当量守恒）+ 自动装备评分 | `items.js`、`prefixes.js`、`engine.js:3234-3378` |
| M5 | 生产（采集挂机 + 配方 + 分解） | `professions.js`、`engine.js:2357-2635` |
| M6 | 回放：seed + roster 快照 + trace 播放器 | `rng.js`、`engine.js:2252-2315`、`battle_anim.js` |
| M7 | 内容校验器 + 平衡报表 + 四类测试 | 新做（原作没有） |
| M8 | 在线：auth + 云存档（**含上传**）+ 公告 | `cloud-save.js`（补上传） |

【建议】M3 是"看起来像放置游戏"的最早时点，应尽早达成。原作把大量精力花在 M22~M31（竞技场/战场/挑战/英雄），这些都是**有远征闭环之后**才成立的附加玩法。

### 10.4 一页速查：直接照搬 vs 必须重做

| 直接照搬（copy） | 改造后复用（adapt） | 必须重做（rewrite） |
| --- | --- | --- |
| 注入式 RNG + seed + roster 快照 | `computeStats` 属性管道（拆成可组合的 modifier） | 自建 `__ns` 模块系统 → ESM + Vite |
| "门槛 + 优先级"技能 AI | `save.js` 迁移（改有序迁移数组 + 单测） | 8699 行 `ui.js` → 组件化 + store |
| 派遣即结算 + 时间戳状态机 | `trace` 事件流（改用类型化的事件联合） | 234 分支分发器 → ACTIONS 映射表 |
| 序列化裁剪（日志 → IDB） | 当量预算（抽成统一 `budget.ts`） | `battle.js` 全局态 → `BattleCtx` |
| 存档摘要 + 备份 + 隔离区 | 掉落查询倒排（改为构建期生成索引） | 全量 innerHTML 重绘 → keyed diff |
| 存储/广告抽象层 + 降级策略 | 竞技场 `q` 单旋钮难度（推广到所有内容） | 三套战斗管线 → 一个内核 + 规则插件 |
| 渲染错误隔离 + 错误横幅 | 更新日志（改为构建期生成） | 客户端权威时间 → 服务端校验 |
| 1 Hz 只改进度条不重绘 | `saveBranch`（改为提示而非静默删档） | 中文名/字符串当主键 → 稳定 id + 校验 |
| 单旋钮 `q` 的"装备成长表" | 每日/周常（用 Clock 注入） | 无测试 → 四类核心测试 |

---

## 附录 A · 关键常量速查（全部带行号）

| 常量 | 值 | 位置 |
| --- | --- | --- |
| `CURRENT_VERSION` | 30 | `save.js:33` |
| `RELEASE_VERSION` | `'0.9.0'` | `save.js:34` |
| `RELEASE_SAVE_BRANCH` | `'release'` | `save.js:35` |
| `PREFIX` | `'aow_save_'` | `save.js:29` |
| `INTEGRITY_KEY` | `'_integrity'` | `save.js:30` |
| `BACKUP_SAVE_ID` / `CORRUPT_SAVE_ID` | `'main_backup'` / `'main_corrupt'` | `save.js:31-32` |
| IndexedDB 库/版本/表 | `'aow_large'` / 1 / `'blobs'` | `idb.js:9-11` |
| `MAX_MEMBER_LEVEL` / `MAX_GUILD_LEVEL` | 60 / 60 | `levels.js:7-8` |
| `REPORT_LIMIT` / `GATHER_LOG_LIMIT` / `ARENA_REPLAY_LIMIT` | 10 / 10 / 10 | `config.js:9-11` |
| `INVENTORY_CAP` | 500 | `inventory.js:15` |
| `EQUIP_SLOTS` | 9 槽 | `config.js:89` |
| `PLAYBACK_STEP_MS` | 600 | `battle.js:668` |
| `ROOM_REST_MS` | 30000 | `battle.js:641` |
| `MAX_BATTLE_ROUNDS` | 150 | `battle.js:666` |
| `ENRAGE_START_ROUND` / `STEP_ROUNDS` / `STEP_DMG` / `MAX_BONUS` | 80 / 10 / 0.2 / 2.0 | `battle.js:662-665` |
| `RAID_HP_MULT` | 1.7 | `battle.js:650` |
| `ARENA_MAX_ROUNDS` | 100 | `battle.js:4289` |
| `GATHER_DURATIONS` | `[30,60,120,240,480,720]` 分钟 | `engine.js:2357` |
| `TAVERN_BASE_COST` | 100 | `engine.js:185` |
| `TAVERN_CANDIDATE_COUNT` | 5 | `engine.js:317` |
| `TAVERN_MIN_LEVEL` | 13 | `engine.js:325` |
| `TAVERN_TICKET_DAILY_LIMIT` | 5 | `engine.js:324` |
| `ARENA_DAILY_BATTLE_LIMIT` | 20 | `arena.js:79` |
| `ARENA_UNLOCK_GUILD_LEVEL` | 40 | `arena.js:76` |
| `ARENA_WIN_BADGES` / `LOSE_BADGES` | 4 / 1 | `arena.js:77-78` |
| `BG_UNLOCK_GUILD_LEVEL` / `BG_MIN_LEVEL` | 10 / 60 | `battleground.js:54-55` |
| `BG_HONOR` | `{win:10, lose:3, draw:5}` | `battleground.js:56` |
| `PROF_LEVEL_CAP` | 10 | `professions.js:10` |
| `SKILL_LEVELS` | `[1,10,20,40,60]` | `skills.js:17` |
| `TALENT_POINT_LEVELS` | `[5,15,25,30,35,45,50,55,60]` | `talents.js:23` |
| `SET_PIECES` | `['2','3','5']` | `sets.js:21` |
| `DPS_DUMMY_HP` | 100000000 | `challenges.js:29` |

## 附录 B · 事实 vs 推断 一览（本文关键判断）

| 判断 | 类型 | 依据 |
| --- | --- | --- |
| 存档版本是 30（不是任务描述的 14） | **事实** | `save.js:33` |
| 没有 tick 产出式主循环，只有 1 Hz 状态推进 | **事实** | `ui.js:8078-8080`；全项目 tick 检索 |
| 离线收益 = 时间戳比较，无专门计算 | **事实** | `engine.js:3008-3019`、`ui.js:8126-8127` |
| 远征时长 = 战斗回放时长 | **事实** | `engine.js:2207-2210` |
| 收获有幂等保护 | **事实** | `engine.js:3031-3043` |
| `ads.js` 是死模块（无人引用） | **事实** | 依赖图入度 0；`ui.js:5`/`engine.js:5` 无引用 |
| `cloudbase.js` 是死模块 | **事实** | 依赖图入度 0 |
| `setSaveObserver` 无调用者 | **事实** | 全树检索 |
| 云存档当前只读（无上传） | **事实** | `cloud-save.js` 无上传函数；`save.js:235` 观察者未注册；`ui.js:183` 公告 |
| 奖励混用裸 `Math.random()`，不可回放 | **事实** | `engine.js:2051/2066/2089/2096/2104` 等 |
| `battle.js` 有 8 个模块级可变全局 → 不可重入 | **事实**（全局存在）+ **推断**（后果） | `battle.js:674-685` |
| 依赖图无环 | **事实** | DFS 环检测 |
| `ui.js` 有 162 个模块级 `let` | **事实** | 脚本统计 `^let ` |
| `handleAction` 有 234 个分支 | **事实** | 脚本统计 `if (action === '` |
| 装备曲线 L8~L58 近幂律（≈1.6 次方） | **推断** | 由 `items.js` 数值回归得出 |
| 装备曲线 L60 是"来源梯队"台阶函数 | **事实**（数值）+ **推断**（命名） | `items.js` 提取表 |
| 采集时长倍率是"鼓励定期回来"的设计 | **推断** | `engine.js:2473` 数值 |
| 中文房间名做主键是隐患 | **事实**（代码）+ **推断**（风险） | `content.js:5262`、`5322`、`5348` |
| `saveBranch` 门会静默删档 | **事实** | `save.js:260-265` |
| 手写装备属性会被 `armorize` 重写 | **事实** | `armor.js:117-138` |
| 配方等级 1~60 靠 `RECIPE_LEVEL_MAP` 重映射到 1~10 | **事实** | `professions.js:608-610`、`PROF_LEVEL_CAP` `professions.js:10` |
| 全员按速度每回合重排（速度无"多动"收益） | **事实**（代码）+ **推断**（平衡含义） | `battle.js:3778-3779` |
| `battle.js` 的音效/动画与战斗解耦（trace） | **事实** | `traceEv` 148 处；`battle_anim.js` |
| 内容改动面达 10 处 | **事实**（逐项定位）+ **推断**（归纳为"应重做"） | 见 6.5.1 |

*本文档基于对 `E:\deepseek harness\_idlewow\src\` 全部 40 个模块的实际阅读与脚本量化统计撰写。所有行号均指还原后的源码文件行号，可直接跳转复核。*
