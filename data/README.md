# data/ —— 机器可读数据表

本目录存放**可直接被程序消费**的 FF14 数据，用于生成游戏的 `data/*.js` 内容表。

## 文件清单

| 文件 | 行数 | 内容 | 来源 |
| --- | --- | --- | --- |
| `jobs.csv` | 23 | 全部战斗职业（含受限职业）与职能 | 官方 Job Guide：`na.finalfantasyxiv.com/jobguide/battle/` |
| `duties.csv` | 266 | 讨伐战 / 大型任务 / 绝境战 | 官方 Lodestone **Eorzea Database** |
| `dungeons.csv` | 103 | 4 人副本 | 同上 |
| **`content-plan.csv`** | **369** | ⭐ **游戏可直接消费的内容总表**：合并上表并补上 Chapter / Tier 分类 | 由上表衍生（`scripts/build-content-plan.ps1`） |

抓取与衍生脚本：`../scripts/scrape-jobs.ps1`、`../scripts/build-content-plan.ps1`；其余原始脚本在 `../docs/_research/`。

## ⭐ `content-plan.csv` —— 推荐直接使用这一份

`duties.csv` + `dungeons.csv` 合并后，补上两个关键字段：

| 列 | 含义 |
| --- | --- |
| `Chapter` | **章节号 1–6**（1=ARR, 2=HW, 3=SB, 4=ShB, 5=EW, 6=DT），可直接作为游戏的关卡章节 |
| `Expansion` | 资料片中文名 |
| `Kind` | `Dungeon` / `Duty` |
| `Tier` | `Dungeon` / `Trial-Normal` / `Trial-Extreme` / `Trial-Unreal` / `Raid-Normal` / `Raid-Savage` / `Alliance-Raid` / `Ultimate` |
| `ReqLevel` / `ItemLevel` | 等级与平均物品等级门槛（`ItemLevel` 可能为空） |
| `Link` | 官方 Lodestone 可复核链接 |

### 各章内容配额（**这就是游戏的章节模板**）

| 章 | 资料片 | 四人本 | 八人普通 | 零式 | 24 人本 | 绝境战 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | ARR (2.0) | 31 | 13 | 4 | 3 | 0 |
| 2 | Heavensward | 18 | 12 | 12 | 3 | 0 |
| 3 | Stormblood | 15 | 12 | 12 | 3 | 2 |
| 4 | Shadowbringers | 13 | 12 | 12 | 3 | 1 |
| 5 | Endwalker | 13 | 12 | 12 | 3 | 2 |
| 6 | Dawntrail | 13 | 12 | 12 | 3 | 2 |

> 结论：**3.0 之后每个资料片都是「13–18 四人本 + 12 八人普通 + 12 零式 + 3 个 24 人本 + 1~2 绝境战」**。
> 这意味着游戏可以做成一个**可复用的章节模板**，只用数据填充即可扩展到 8.0、9.0。
> ARR 是唯一的异常章（四人本 31 个、等级 15–50），适合作为"新手长引导章"。

⚠️ 已知分类边界：24 人本无统一命名规律，脚本内用显式名单匹配（每资料片 3 个系列）；
`Trial-Unreal`（幻巧战）目前只识别到 1 条（7.x 的 Shinryu's Domain），实际历史 Unreal 内容更多，后续可补。

## 字段说明

### `jobs.csv`

| 列 | 类型 | 含义 |
| --- | --- | --- |
| `Role` | string | 细分职能：`Tank` / `Healer` / `Melee DPS` / `Physical Ranged DPS` / `Magical Ranged DPS` |
| `RoleGroup` | string | 官方 Job Guide 的分组（只有 `Tank` / `Healer` / `DPS` 三种） |
| `Section` | string | 解析用的原始分组键 |
| `JobKey` | string | 官方 URL 短名（如 `darkknight`、`whitemage`），建议直接用作游戏内 id |
| `Name` | string | 官方英文名；受限职业带 `(Limited Job)` 后缀 |
| `Limited` | bool | 是否受限职业（青魔道士 / 驯兽师） |
| `Url` | string | 官方职业指南页 |

**当前职业构成（23 个，快照 2026-09-15 / 7.56）：**

```
Tank                 4   paladin, warrior, darkknight, gunbreaker
Healer               4   whitemage, scholar, astrologian, sage
Melee DPS            7   monk, dragoon, ninja, samurai, reaper, viper, beastmaster*
Physical Ranged DPS  3   bard, machinist, dancer
Magical Ranged DPS   5   blackmage, summoner, redmage, pictomancer, bluemage*
                                                                    * = Limited Job
```

⚠️ 注意两点：
1. 官方页面把全部 DPS 合成一个 `DPS` 段，`Role` 列的三分法是我按游戏内角色窗口的分组补的（见脚本内 `$subRole` 表）。
2. **不包含 Bastion** —— 它是 8.0《Evercold》的新职业，截至快照日尚未上线。8.0 上线后需重跑脚本。

### `duties.csv`

| 列 | 类型 | 含义 |
| --- | --- | --- |
| `Cat` | enum | 类别：`Trials`（讨伐战，含极神）/ `Raids`（大型任务，含零式与 24 人本）/ `Ultimate`（绝境战） |
| `Ver` | int | **资料片序号**（0=2.0 ARR, 1=3.0 HW, 2=4.0 SB, 3=5.0 ShB, 4=6.0 EW, 5=7.0 DT）——注意不是补丁号 |
| `Name` | string | 英文名称（官方 Lodestone 用名） |
| `ReqLevel` | int | 要求等级 |
| `AvgItemLevel` | int \| `-` | 平均物品等级门槛；`-` 表示无要求（如绝境战强制同步） |
| `New` | string | 标记位（抓取时该条目是否"新增"） |
| `Link` | string | Lodestone 数据库相对链接，可拼 `https://na.finalfantasyxiv.com` 验证 |

### `dungeons.csv`

列同上，去掉 `Cat` / `New`（全部为 4 人副本）。

## 数据质量

- ✅ **权威**：条目直接来自官方 Lodestone 数据库，链接可逐条复核
- ✅ **完整**：覆盖 2.0 → 7.x 全部资料片（`Ver` 0–5）
- ✅ **可程序消费**：`Import-Csv` / `pandas.read_csv` 直接解析，无嵌套结构
- ⚠️ **快照时点**：2026-09-15（对应 7.56）。后续版本需重新抓取
- ⚠️ `AvgItemLevel` 的 `-` 需在上层做空值处理

## 统计概览

```
jobs.csv       23 条 = 坦克 4 + 治疗 4 + 近战 7 + 远敏 3 + 法系 5（含 2 个受限职业）
duties.csv    266 条 = 讨伐战 104 + 大型任务 155 + 绝境战 7
dungeons.csv  103 条 = 4 人副本
合计          369 个副本实例（不含 FATE / 深层迷宫 / 野外内容）
最高 iLvl 门槛：770（Dawntrail 零式 M3/M4、极神 The Unmaking）
```

> 369 是"内容量级"的硬指标——对照参考实现 wow-idle 的 `content.js`（5,518 行、约 87 个副本条目），
> FF14 Idle 的内容表规模天然更大，**必须靠数据驱动的表结构 + 生成器**，不能手写。

## 待补充的数据集

| 需要的数据 | 建议来源 | 优先级 |
| --- | --- | --- |
| 物品表（iLvl / 部位 / 属性 / 品质） | Lodestone Eorzea DB / ffxiv-datamining | P0 |
| 技能表（名称 / 效力 / 冷却 / 职能） | ffxiv-datamining（`Action.csv`） | P0 |
| 职业**量谱 / 武器 / 特性**（`jobs.csv` 已有职业清单 ✅） | Lodestone 职业页 + 社区 Wiki | P0 |
| 副本掉落表 | Lodestone DB / 社区 | P1 |
| 配方表（生产） | ffxiv-datamining（`Recipe.csv`） | P1 |
| 坐骑 / 宠物 / 幻卡 / 乐谱 | Lodestone DB / FFXIV Collect | P1 |
| 成就与称号 | Lodestone DB | P1 |
| 任务链（MSQ） | 社区 Wiki | P1 |

> 各数据源的法律边界与可用性见 `../docs/07-data-sources-licensing.md`。
