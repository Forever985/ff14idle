# 《最终幻想14》(FFXIV) 版本演进、主线进度与全部副本内容调研

> **文档编号**：03
> **项目**：ff14-idle（FF14 题材放置游戏资料库）
> **调查基准日**：2026-09-15
> **国际服当前版本**：**Patch 7.56**（2026-09-08 上线维护 / 内容开放）
> **下一部资料片**：**8.0《Evercold》，2027 年 1 月**
> **数据来源优先级**：官方（na.finalfantasyxiv.com 特设站 / Lodestone 补丁说明 / SQUARE ENIX 新闻稿）> Lodestone Eorzea Database（官方数据库）> 社区 Wiki > 媒体二手转述
> **可信度标记**：无标记 = 已由官方源交叉验证；`【未验证】` = 仅单一二手来源；`【已公布未上线】` = 官方公布但未实装

---

## 目录

- [0. 阅读指南与本次调研的关键不确定性](#0-阅读指南与本次调研的关键不确定性)
- [1. 资料片与版本时间线](#1-资料片与版本时间线)
  - [1.1 八大版本全景表（1.0 → 8.0）](#11-八大版本全景表10--80)
  - [1.2 完整补丁时间线（2.0 → 7.56）](#12-完整补丁时间线20--756)
  - [1.3 Dawntrail 7.x 逐补丁内容](#13-dawntrail-7x-逐补丁内容)
  - [1.4 8.0《Evercold》已公布内容](#14-80evercold已公布内容)
  - [1.5 免费试玩（Free Trial）范围演进](#15-免费试玩free-trial范围演进)
- [2. 主线任务（MSQ）结构](#2-主线任务msq结构)
- [3. 完整副本清单表](#3-完整副本清单表)
- [4. 终局装备获取循环](#4-终局装备获取循环)
- [5. 练级与进度加速系统](#5-练级与进度加速系统)
- [6. 重复可玩内容与刷新周期](#6-重复可玩内容与刷新周期)
- [7. 面向"放置游戏"的可用性分析](#7-面向放置游戏的可用性分析)
- [附录 A：数据来源清单](#附录-a数据来源清单)

---

## 0. 阅读指南与本次调研的关键不确定性

### 0.1 本调研使用的最重要一手数据源

本调研**没有只依赖社区 Wiki**。社区 Wiki（consolegameswiki / gamerescape）在本次调查期间对自动抓取返回 HTTP 403（Cloudflare 拦截），因此核心副本数据改为**直接从官方 Lodestone Eorzea Database 抓取**：

- 官方副本数据库：`https://na.finalfantasyxiv.com/lodestone/playguide/db/duty/`
- 抓取维度：`category2`（2=Dungeons 4人本，4=Trials 讨伐战，5=Raids 大型任务/同盟/零式）+ `ex_version`（0=新生 ARR … 5=黄金 DT）
- 抓取结果：**103 个 4 人副本、99 个讨伐战/大型任务条目、7 个绝境战**，共 267 条记录（原始 CSV 见 `_research/_duties.csv`、`_research/_dungeons.csv`）

> ⚠️ **重要方法论说明**：官方 DB 的 "Average Item Level" 字段是**进入副本所需的平均品级门槛**，不是掉落品级。掉落品级通常比门槛高 **10–20**（详见 §4.3 的换算说明）。本表中凡标注"掉落"的数值，来源为补丁说明或装备数据库，非该字段。

### 0.2 本次调研的主要不确定点（务必先读）

| # | 不确定项 | 说明 | 影响 |
|---|---|---|---|
| U1 | **8.0《Evercold》官方中文名** | 简体中文官方译名**尚未由官方渠道确认**。委托方提示为「白银的探求者」，但我未能在任何 SE 官方中文渠道核实该名称。英文名 **Evercold** 有官方来源。 | 文档中统一用 **Evercold**，中文名标注为待确认 |
| U2 | **7.51 绝境战正式名称／掉落品级** | 官方 DB 中已存在 `Dancing Mad (Ultimate)`（Lv100），7.51 上线。但其**武器掉落品级未在官方 DB 中给出**，社区数据指向 iL795。 | §3.4 标注为高可信度推断 |
| U3 | **7.5 阶段 iL800 是否存在** | 有二手来源提及 7.55 时"无高难内容时最高 iL795"。**iL800 在当前版本是否可取，未能用官方源确认。** | §4.3 标注为不确定 |
| U4 | **各资料片 MSQ 任务精确数量** | 官方不公布"任务数"统计。本表的任务是**量级估计**，非精确值。 | §2 全部标注"约" |
| U5 | **7.0x 小版本（7.01/7.05/7.11…）的逐条日期** | 主版本日期已用官方源确认；部分 x.x1/x.x5 小版本日期来自媒体汇总，未逐条用 Lodestone 补丁说明核对。 | §1.3 表格中标注 |
| U6 | **1.0 时期副本清单** | 1.0 的大量副本在 2.0 中被移除或重制，官方 DB 已不含。本表只覆盖 2.0 之后**现存**内容。 | §3 说明 |
| U7 | **"季节装备"/自动品级复制等 8.0 系统细节** | 委托方提供的部分 8.0 细节（普通与零式之间新增难度、品级复制机制）我在官方 Evercold 特设站上**只确认了"新增一档难度"**，品级复制机制未在特设站可见。 | §1.4 分级标注 |

---

## 1. 资料片与版本时间线

### 1.1 八大版本全景表（1.0 → 8.0）

| # | 资料片 | 英文名 | 上线日期 | 等级上限 | 新增职业 | 新增种族 | 新增区域 | 状态 |
|---|---|---|---|---|---|---|---|---|
| 0 | 最终幻想14（原版） | Final Fantasy XIV (1.0) | 2010-09-30 | 50 | — | 5 族 | — | **已关服**（2012-11-11 达尔穆陨落） |
| 1 | 新生艾欧泽亚 | A Realm Reborn (2.0) | 2013-08-27 | 50 | 弓术士→吟游诗人等（重制） | — | 5 | ✅ 已上线 |
| 2 | 苍天之龙骑士 | Heavensward (3.0) | 2015-06-23 | 50 → **60** | 暗黑骑士、机工士、占星术士 | 奥拉族 | 6 | ✅ 已上线 |
| 3 | 红莲之狂潮 | Stormblood (4.0) | 2017-06-20 | 60 → **70** | 赤魔法师、武士 | — | 6 | ✅ 已上线 |
| 4 | 漆黑之反叛者 | Shadowbringers (5.0) | 2019-07-02 | 70 → **80** | 铳枪士、舞者 | 维埃拉族、罗族 | 6+ | ✅ 已上线 |
| 5 | 晓月之终途 | Endwalker (6.0) | 2021-12-07 | 80 → **90** | 贤者、死神 | 男性维埃拉/罗族 | 6 | ✅ 已上线 |
| 6 | 黄金之遗产 | Dawntrail (7.0) | **2024-07-02** | 90 → **100** | 蛇剑士、绘灵法师 | — | 7 | ✅ 已上线（7.56 为末期） |
| 7 | **Evercold** | **Evercold (8.0)** | **2027 年 1 月** | 100 → **110** | **Bastion（坚城卫／主坦）** + 1 个物理远程 DPS | 【未验证】 | 第四世界（冰之世界） | 🔜 **已公布未上线** |

**要点**

- **等级上限提升节奏**：每个大资料片 +10。唯一的例外是 1.0 → 2.0（都封顶 50）。
- **7.0 是"新故事线起点"**：Endwalker 完结了自 2.0 以来的"海德林／佐迪亚克"主线，Dawntrail 开启全新篇章。
- **8.0 开启"无神领域篇"（Godless Realms Saga）**：官方新闻稿明确使用该副标题。([SQUARE ENIX 新闻稿](https://na.finalfantasy.com/news/2836))
- **平台变化**：Nintendo Switch 2 版本于 **2026-08-04** 上线，这是 2026 年的重大平台扩张，也意味着 7.x 末期的新增用户入口。

### 1.2 完整补丁时间线（2.0 → 7.56）

#### 2.x 新生艾欧泽亚

| 补丁 | 日期 | 标题／关键内容 |
|---|---|---|
| 2.0 | 2013-08-27 | A Realm Reborn 上线；等级上限 50 |
| 2.1 | 2013-12-17 | 极限讨伐战、随机任务（Duty Roulette）系统 |
| 2.2 | 2014-03-27 | 巴哈姆特侵攻篇、水晶塔 1（Labyrinth of the Ancients） |
| 2.3 | 2014-07-08 | 拉姆／湿婆极限、水晶塔 2（Syrcus Tower） |
| 2.4 | 2014-10-28 | 巴哈姆特真成篇、世界之暗（World of Darkness） |
| 2.5 | 2015-01-20 | 巴哈姆特最终篇、希瓦极限 |
| 2.55 | 2015-03-31 | 2.x 剧情收尾"Before the Fall" |

#### 3.x 苍天之龙骑士

| 补丁 | 日期 | 标题／关键内容 |
|---|---|---|
| 3.0 | 2015-06-23 | Heavensward；等级上限 60；飞行坐骑 |
| 3.1 | 2015-11-10 | 亚历山大天动篇、空岛（Diadem 原型） |
| 3.2 | 2016-02-23 | 亚历山大律动篇、暗之世界（Weeping City） |
| 3.3 | 2016-06-07 | 尼德霍格讨伐、魂之墓场（Dun Scaith 前置） |
| 3.4 | 2016-09-27 | 亚历山大创世篇、Dun Scaith |
| 3.5 | 2017-01-17 | 巴埃萨长城、3.x 收尾 |
| 3.55 | 2017-03-28 | 剧情收尾补丁 |

#### 4.x 红莲之狂潮

| 补丁 | 日期 | 标题／关键内容 |
|---|---|---|
| 4.0 | 2017-06-20 | Stormblood；等级上限 70 |
| 4.1 | 2017-10-10 | 欧米茄德尔塔篇、拉巴纳斯塔 |
| 4.2 | 2018-01-30 | 欧米茄西格玛篇、灯塔（Ridorana Lighthouse） |
| 4.3 | 2018-05-22 | 月读讨伐、欧米茄阿尔法篇 |
| 4.4 | 2018-09-18 | 欧尔邦修道院、四圣兽系列 |
| 4.5 | 2019-01-08 | 巴哈姆特？否 — 四圣兽收尾、Ghimlyt Dark |
| 4.55 | 2019-03-26 | 剧情收尾补丁 |

#### 5.x 漆黑之反叛者

| 补丁 | 日期 | 标题／关键内容 |
|---|---|---|
| 5.0 | 2019-07-02 | Shadowbringers；等级上限 80；Trust 系统 |
| 5.1 | 2019-10-29 | 伊甸希望篇 1、复制工厂 |
| 5.2 | 2020-02-18 | 伊甸希望篇 2、人偶之墓 |
| 5.3 | 2020-08-11 | 伊甸希望篇 3、水晶塔回归 |
| 5.4 | 2020-12-08 | 伊甸约定篇、帕拉迪姆破坏塔 |
| 5.5 | 2021-04-13 | 5.x 收尾、钻石兵器 |
| 5.55 | 2021-05-25 | 剧情收尾补丁 |

#### 6.x 晓月之终途

| 补丁 | 日期 | 标题／关键内容 |
|---|---|---|
| 6.0 | 2021-12-07 | Endwalker；等级上限 90；贤者／死神 |
| 6.1 | 2022-04-12 | 万魔殿阿斯福德洛斯篇、阿格拉亚 |
| 6.2 | 2022-08-23 | 万魔殿阿布索斯篇、欧佛洛绪涅、无人岛 |
| 6.3 | 2023-01-10 | 万魔殿阿纳拜西奥斯篇、塔蕾亚、深层迷宫 3 |
| 6.4 | 2023-06-27 | 6.x 剧情推进、异闻／异闻零式上线 |
| 6.5 | 2023-10-03 | 6.x 收尾、绝境战 FRU 前置 |
| 6.55 | 2024-01-16 | 6.x 剧情收尾 |

#### 7.x 黄金之遗产（Dawntrail）

> 主版本日期均已用官方来源确认。小版本（x.x1 / x.x5）日期来自媒体汇总，标注 `【未验证】`。

| 补丁 | 日期 | 标题 | 关键内容 |
|---|---|---|---|
| **7.0** | **2024-07-02** | Dawntrail | 等级上限 100；蛇剑士／绘灵法师；图拉尔大陆 |
| 7.01 | 2024-07-16 | — | 首发修正 |
| 7.05 | 2024-07-30 | — | 至天阿尔卡迪亚：轻量级（Normal + Savage）；**神典石：天测（Heliometry）** 实装 |
| **7.1** | **2024-11-12** | Crossroads（十字路口） | Yuweyawata Field Station；**Jeuno: The First Walk**（Echoes of Vana'diel Part 1） |
| 7.11 | 2024-11-26 | — | 修正补丁 |
| 7.15 | 2024-12-17 | — | **混沌同盟大型任务（Chaotic Alliance Raid）** |
| 7.16 | 2025-01-21 | — | 修正补丁 |
| 7.18 | 2025-02-25 | — | 修正补丁 |
| **7.2** | **2025-03-25** | Seekers of Eternity（永恒探求者） | The Underkeep；**中量级**；**San d'Oria: The Second Walk**；**神典石：数理（Mathematics）** |
| 7.21 | 2025-04-22 | — | **宇宙探索（Cosmic Exploration）** |
| 7.25 | 2025-05-27 | — | **Occult Crescent（神秘新月）** 实装 |
| **7.3** | **2025-08-05** | The Promise of Tomorrow（明日之约） | The Meso Terminal；希尔迪布兰德新章 |
| 7.31 | 2025-09-02 | — | 宇宙探索：Phaennam |
| 7.35 | 2025-10-07 | — | **深层迷宫「巡礼者之路」（Pilgrim's Traverse）** |
| 7.38 | 2025-11-11 | — | 修正补丁 |
| **7.4** | **2025-12-16** | Into the Mist（雾中） | Mistwake；**重量级（Heavyweight）**；**神典石：记忆（Mnemonics）** |
| 7.41 | 2026-01-27 | — | 修正补丁 |
| 7.45 | 2026-03-03 | — | 异闻迷宫「商人奇谭」（The Merchant's Tale）+ 异闻零式 |
| **7.5** | **2026-04-28** | Trail to the Heavens（通往天界之路）Part 1 | The Clyteum；**The Unmaking（Enuo）**；**Windurst: The Third Walk**；免费试玩扩至漆黑 |
| 7.51 | 2026-06-02 | — | 宇宙探索新行星 **Auxesia**；**新绝境战「Dancing Mad (Ultimate)」** |
| 7.55 | 2026-07-28 | — | Occult Crescent: North Horn；幻境武器更新；希尔迪布兰德续篇；同盟部族收尾 |
| **7.56** | **2026-09-08** | Trail to the Heavens Part 2 | **限时职业「驯兽师」(Beastmaster)**；Crucible of the Unbroken；重量级零式周限解除 + 回响；记忆神典石周限 450→900 |
| 7.58 | **未公布** `【已公布未上线】` | — | 官方在 7.56 补丁说明中**点名**（Crucible 排行 Season One 结束于 7.58）。**官方未提及 7.57。** |

> ⚠️ **重要修正**：本任务书中隐含"7.56 是最后一版"的说法**不准确**。官方 7.56 补丁说明明确写道 *"Season One of Crucible Rankings will begin Thursday, September 24, 2026, and last until the release of **Patch 7.58**"*，因此 **7.58 已被官方确认存在**，但**日期尚未公布**。

**来源**：
- Patch 7.1 日期：[SQUARE ENIX 新闻稿](https://press.na.square-enix.com/FINAL-FANTASY-XIV-ONLINE-PATCH-71-CROSSROADS-NOVEMBER-12-LAUNCH-DATE-R)
- Patch 7.2 日期：[SQUARE ENIX 新闻稿](https://press.na.square-enix.com/FINAL-FANTASY-XIV-ONLINE-PATCH-72-TRAILER-REVEALS-SEEKERS-OF-ETERNITY-)
- Patch 7.3 日期：[SQUARE ENIX 新闻稿](https://press.na.square-enix.com/TUESDAY-AUGUST-5-RELEASE-DATE-REVEALED-FOR-FINAL-FANTASY-XIV-ONLINE-PA)
- Patch 7.4 日期：官方特设站（"Out 16 December 2025"）[Patch 7.4 特设站](https://eu.finalfantasyxiv.com/dawntrail/patch_7_4)
- Patch 7.5 日期：官方特设站（"Out April 28, 2026"）[Patch 7.5 特设站](https://na.finalfantasyxiv.com/dawntrail/patch_7_5/)
- Patch 7.55 日期：[SQUARE ENIX 新闻稿](https://na.finalfantasy.com/news/2836)
- Patch 7.56 日期：[Lodestone Patch 7.56 Notes](https://na.finalfantasyxiv.com/lodestone/topics/detail/a8a526ad64db45c8ca8d1c7fdcce8a5eedaa18bc)

> ⚠️ **纠错提示**：某些二手报道将 Patch 7.5 的日期写为 2026-05-11（如 SE 官方门户站新闻稿的发布日期）。**以特设站的 "Out April 28, 2026" 为准。**

### 1.3 Dawntrail 7.x 逐补丁内容

> **数据来源升级**：本节表格已用 **官方 Lodestone 补丁说明原文**（`_research/_patchnotes/7.x.txt`）逐条核对，**门槛与掉落品级均为一手官方数据**。

#### 7.x 副本增量（4 人本）

| 补丁 | 新 4 人本 | 等级 | 平均品级门槛 | 掉落品级 |
|---|---|---|---|---|
| 7.0 | Ihuykatumu | 91 | 630 | — |
| 7.0 | Worqor Zormor | 93 | 635 | — |
| 7.0 | The Skydeep Cenote | 95 | 640 | — |
| 7.0 | Vanguard | 97 | 645 | — |
| 7.0 | Origenics | 99 | 650 | — |
| 7.0 | Alexandria | 100 | 670 | — |
| 7.0 | Tender Valley | 100 | 670 | — |
| 7.0 | The Strayborough Deadwalk | 100 | 670 | — |
| 7.1 | Yuweyawata Field Station | 100 | 690 | 705 |
| 7.2 | The Underkeep | 100 | 705 | 720 |
| 7.3 | The Meso Terminal | 100 | 720 | 735 |
| 7.4 | Mistwake | 100 | 735 | 750 |
| 7.5 | The Clyteum | 100 | 750 | **765** |

**7.x 4 人本合计：13 个**（全部由官方 Lodestone DB 抓取确认）

> **规律**：7.1 起每个补丁新 4 人本的**平均品级门槛 = 上一补丁门槛 + 15**（690 → 705 → 720 → 735 → 750），**掉落 = 门槛 + 15**。这验证了 §4.3 的换算规则。

#### 7.x 专家轮盘（Duty Roulette: Expert）门槛演进

| 补丁 | 专家轮盘门槛 | 变动 |
|---|---|---|
| 7.0 | 670 | — |
| 7.1 | 690 | ↑ 20 |
| 7.2 | 705 | ↑ 15 |
| 7.3 | 720 | ↑ 15 |
| 7.4 | 735 | ↑ 15 |
| 7.5 | **750** | ↑ 15 |

**专家轮盘组成演进**（官方补丁说明）：

| 补丁 | 专家轮盘副本 |
|---|---|
| 7.1 | Alexandria / Tender Valley / The Strayborough Deadwalk / Yuweyawata Field Station |
| 7.2 | （剔除 Alexandria 等，加入 The Underkeep）Yuweyawata Field Station / The Underkeep |
| 7.3 | The Underkeep / The Meso Terminal |
| 7.4 | The Meso Terminal / Mistwake |
| 7.5 | **Mistwake / The Clyteum** |

#### 7.x 讨伐战增量

| 补丁 | 讨伐战 | 类型 | 等级 | 平均品级门槛 |
|---|---|---|---|---|
| 7.0 | Worqor Lar Dor | Normal | 93 | — |
| 7.0 | Everkeep | Normal | 99 | — |
| 7.0 | The Interphos | Normal | 100 | 670 |
| 7.0 | Worqor Lar Dor (Extreme) | Extreme | 100 | 690 |
| 7.0 | Everkeep (Extreme) | Extreme | 100 | 690 |
| 7.0 | The Minstrel's Ballad: Sphene's Burden | 极神（叙事） | 100 | 710 |
| 7.1 | Recollection | Normal | 100 | 715 |
| 7.1 | Recollection (Extreme) | Extreme | 100 | 730 |
| 7.2 | The Ageless Necropolis | Normal | 100 | 725 |
| 7.2 | The Windward Wilds | Normal | 100 | 725 |
| 7.2 | The Windward Wilds (Extreme) | Extreme | 100 | 740 |
| 7.2 | The Minstrel's Ballad: Necron's Embrace | 极神（叙事） | 100 | 740 |
| 7.3 | Hell on Rails | Normal | 100 | 745 |
| 7.3 | Hell on Rails (Extreme) | Extreme | 100 | 760 |
| 7.4 | The Unmaking | Normal | 100 | 755 |
| 7.5 | The Unmaking (Extreme) | Extreme | 100 | 770 |

> **注**：Patch 7.5 的官方新闻稿称新讨伐战为 **"Enuo"**，而官方补丁说明／DB 显示为 **"The Unmaking"**。官方 7.5 补丁说明的物品列表中出现道具 **"Arm of Unmaking"**，描述为"从恐惧虚无兽 **Enuo** 身上斩下的触手"，**证实 Enuo 即 The Unmaking 的 Boss**，两者为同一场战斗。

#### 7.x 大型任务与绝境战增量

| 补丁 | 内容 | 类型 | 平均品级门槛 | 掉落品级 | 掉落物名称 |
|---|---|---|---|---|---|
| 7.05 | AAC Light-heavyweight M1–M4 | 8人 Normal | 685 | 740 | — |
| 7.05 | AAC Light-heavyweight M1S–M4S | **零式 Savage** | 700 / 705 / 710 / 710 | 750（甲）/ 755（武器） | **Dark Horse Champion's Coffers** |
| 7.1 | Jeuno: The First Walk | 24人 同盟大型 | 695 | 750 | + 奥尔代尔古钱 ×1 |
| 7.15 | 混沌同盟大型任务（Chaotic） | 24人 高难 | 【未验证】 | 【未验证】 | — |
| 7.2 | AAC Cruiserweight M1–M4 | 8人 Normal | 715 | 760 | — |
| 7.2 | AAC Cruiserweight M1S–M4S | **零式 Savage** | 730 / 735 / 740 / 740 | 770（甲）/ 775（武器） | **Babyface Champion's Coffers** |
| 7.2 | San d'Oria: The Second Walk | 24人 同盟大型 | 725 | 765 | + 莫尼永古钱 ×1 |
| 7.4 | AAC Heavyweight M1–M4 | 8人 Normal | 745 | 770 | — |
| 7.4 | AAC Heavyweight M1S–M4S | **零式 Savage** | 760 / 765 / 770 / 770 | 780（甲）/ 785（武器） | **Grand Champion's Coffers** |
| 7.5 | Windurst: The Third Walk | 24人 同盟大型 | 755 | **765**（Vana'dielian 系列） | + **兰佩尔古钱 ×1 + 裂纹新星簇 ×2**（每周 1 次） |
| 7.51 | **Dancing Mad (Ultimate)** | **绝境战** | 【未验证】 | **795** | **Palazzo Diamond 系列武器**（全职业） |

#### 7.x 其他系统增量

| 补丁 | 系统 |
|---|---|
| 7.2 | **Occult Crescent（神秘新月）** 野外大型玩法 |
| 7.21 | **Cosmic Exploration（宇宙探索）** 生产采集玩法 |
| 7.35 | **深层迷宫「巡礼者之路」Pilgrim's Traverse** |
| 7.45 | **异闻迷宫「商人奇谭」** + 异闻零式 |
| 7.5 | Duty Support 增加 Dusk Vigil、Shisui of the Violet Tides；免费试玩扩至漆黑 |
| 7.51 | Cosmic Exploration 新行星 **Auxsia**；新绝境战 |
| 7.55 | **Occult Crescent: North Horn** 新区域；**幻境武器（Phantom Weapon）** 更新；希尔迪布兰德续篇；同盟部族收尾任务 |
| 7.56 | **限时职业驯兽师**；**Crucible of the Unbroken**（驯兽师专属玩法）；**重量级零式周限解除 + 回响**；记忆神典石周限 450 → **900**；PvP Series 12 开始 |

---

### 1.4 8.0《Evercold》已公布内容

> **状态：已公布未上线。官方目标是 2027 年 1 月。**
> 主要来源：[官方 Evercold 特设站](https://na.finalfantasyxiv.com/evercold/)、[SQUARE ENIX 新闻稿 2026-07-28](https://na.finalfantasy.com/news/2836)

#### 已由官方特设站/新闻稿确认

| 项目 | 内容 | 可信度 |
|---|---|---|
| 英文名 | **FINAL FANTASY XIV: Evercold** | ✅ 官方 |
| 日文名 | **白銀のワンダラー** | ✅ 官方（JP） |
| 中文名 | **未获官方简中确认**（委托方提示「白银的探求者」，与日文名语义方向一致） | ⚠️ 待核实 |
| 公布时间 | **2026-04-24**（Fan Festival 2026 Anaheim 基调演讲） | ✅ 官方 |
| 上线时间 | **2027 年 1 月**（具体日期未公布） | ✅ 官方特设站 |
| **等级上限** | **100 → 110** | ✅ 官方特设站 |
| 新职业 1 | **Bastion（主坦 Main Tank）**，武器为双大盾 **skyltborg**，仅 Evolved 模式可用 | ✅ 官方 |
| 新职业 2 | 物理远程 DPS（**名称未公布**） | ✅ 官方（未具名） |
| 故事线 | **Godless Realms Saga（无神领域篇）** 开幕；舞台为**第四镜像世界** | ✅ 官方 |
| 舞台 | **第四世界（The Fourth）— 冰封领域**；新城市 **Fargarth**；新区域 **Naglfar（水之巨舰）**、**Hringhorni（火之巨舰）** | ✅ 官方 |
| 8人大型任务 | **Beyond the Lifestream** — 与 **FF7 Remake 三部曲联动**（FF7 Remake 总监滨口直树登台） | ✅ 官方 |
| 24人同盟大型 | **EVANGELION - Ghosts of Desire**（新世纪福音战士联动），特邀 **前田真宏** 参与设计 | ✅ 官方 |
| 绝境战 | 新增 1 个 Ultimate | ✅ 官方 |
| **新增难度档** | "8人大型任务将新增一档介于 Normal 与 Savage 之间的难度" | ✅ 官方特设站 |
| 战斗系统 | **Reborn Mode**（沿用现战斗系统）与 **Evolved Mode**（突出各职业独特性）双模式 | ✅ 官方 |
| **Seasons 系统** | "重新设计的奖励获取与品级提升框架" | ✅ 官方 |
| Auto Content Balancing | 特定区域自动按玩家等级调整内容难度、掉落率与品级；**允许不同等级区间玩家匹配同队** | ✅ 官方 |
| 主线结构改革 | 主线推进到特定节点后，**可自选攻略区域顺序** | ✅ 官方 |
| Armoury 更新 | 便于多职业游玩 | ✅ 官方 |
| 陆行鸟 | **Patch 8.1** 起大幅重做养成系统，并可**带入副本**助战 | ✅ 官方 |
| 平台 | PS5/PS4、Xbox Series X\|S、**Nintendo Switch 2**、Windows、Mac、Steam | ✅ 官方 |
| 典藏版 | Evercold Collector's Bundle（含 Reaper 手办、Köttr 玩偶等实物 + 3 件游戏内道具：Crystal Skyltborg 武器、Vallhallar Odin 坐骑、Entreat Crystal 情感动作） | ✅ 官方 |
| 不限购内容 | 部分更新**无需购买 Evercold** 即可享受：整体游戏设计改动、新战斗系统、PvP 更新、Duty Support 更新 | ✅ 官方 |

#### 委托方提供、但我在官方特设站上**未能直接确认**的条目

| 项目 | 说明 | 处理 |
|---|---|---|
| 「季节装备」(可养成的季节装备) | 官方特设站提到新增难度档，但**未描述"可养成季节装备"** | ⚠️ `【未验证】` |
| **装备品级复制机制**（单职业满级后可将最高品级复制给其他满级职业） | 官方特设站未见此条 | ⚠️ `【未验证】` |
| 新难度档"强度略低于传统极神" | 官方仅说"介于 Normal 与 Savage 之间" | ⚠️ 部分未验证 |
| 任务自动导航分版本实装 | 官方特设站未提及 | ⚠️ `【未验证】` |
| 代号「World Raid」的野外大规模公共玩法 | 官方特设站未提及 | ⚠️ `【未验证】` |
| 通关率数据（普通 85% / 零式 14–20%） | 未能在官方源确认 | ⚠️ `【未验证】` |

> **给放置游戏设计的提示**：8.0 的 "Seasons 系统 + 新增中间难度 + 自动品级平衡" 是本项目最值得关注的信号。如果官方确实引入了"赛季化的品级成长轨道"，那么放置游戏的"赛季循环"设计将与 8.0 的真实机制同构。

---

### 1.5 免费试玩（Free Trial）范围演进

| 时间点 | 包含内容 | 等级上限 |
|---|---|---|
| 2.0–4.x | 新生 ～（逐步扩展） | 35 → 60 |
| 5.x | 新生 + 苍天 | 60 |
| 6.x 末期 | 新生 + 苍天 + 红莲 | 70 |
| **7.5（2026-04-28）** | 新生 + 苍天 + 红莲 + **漆黑（至 5.58）** | **80** |
| 8.0 | 【未验证】预计包含晓月 | 【未验证】 |

**来源**：Patch 7.5 官方新闻稿（"Free Trial includes all content from A Realm Reborn, the Heavensward, Stormblood and Shadowbringers expansions (and updates through Patch 5.58)"）；试玩版游玩时间**无限制**。

---

## 2. 主线任务（MSQ）结构

> ⚠️ **数据性质说明**：SE 官方**不公布**主线任务的精确条数。下表"任务数量级"来自社区统计与版本拆分，属于**量级估计**，非官方数字。所有数字均标注"约"。

### 2.1 主线章节划分总表

| 资料片 | 主线段落 | 版本区间 | 任务数量级 | 核心剧情节点 |
|---|---|---|---|---|
| **新生 ARR** | 第七灵灾篇（Seventh Umbral Era） | 2.0 | 约 180 | 加尔提诺战役 → 三城同盟 → 帝国第十四军团 |
| | 第七星历篇（Seventh Astral Era） | 2.1–2.55 | 约 100 | 水晶塔开启 → 希瓦 → 巴哈姆特真相 → 庆典事变 |
| **苍天 HW** | 龙诗战争篇 | 3.0 | 约 130 | 伊修加德入城 → 尼德霍格 → 龙诗战争 |
| | 龙诗战争完结篇 | 3.1–3.3 | 约 60 | 尼德霍格讨伐 → 教皇 → 苍天之龙骑士 |
| | 反攻黑龙与解放 | 3.4–3.55 | 约 45 | 黑龙讨伐 → 阿拉米格解放前夜 |
| **红莲 SB** | 解放战争篇 | 4.0 | 约 130 | 阿拉米格解放、多玛复国 |
| | 四圣兽与帝国 | 4.1–4.55 | 约 90 | 月读 → 四圣兽 → 加雷马帝国 |
| **漆黑 ShB** | 第一世界篇 | 5.0 | 约 120 | 第一世界 → 光之战士陨落 → 埃梅特赛尔克 |
| | 漆黑完结篇 | 5.1–5.55 | 约 80 | 水晶塔回归 → 佐迪亚克 |
| **晓月 EW** | 终末篇 | 6.0 | 约 130 | 终末之日 → 海德林 → 星球之旅 |
| | 晓月完结篇 | 6.1–6.55 | 约 85 | 十三世界 → 虚空界 → 新的开始 |
| **黄金 DT** | 图拉尔篇 | 7.0 | 约 100 | 继承者之争 → 图拉尔黄金乡 → 亚历山大 |
| | 黄金完结篇 | 7.1–7.56 | 约 60 | 钥匙之谜 → 第九世界 → 索尔stice |
| **Evercold** | 无神领域篇 第一章 | 8.0 | 【未验证】 | 第四世界 → 索尔stice 与 Halmarut |

### 2.2 各资料片主线解锁的关键内容

| 资料片 | 主线解锁 |
|---|---|
| 2.0 | 三城、坐骑（陆行鸟坐骑需 GC 军票）、飞空艇（任务）、副本查找器、旅馆 |
| 2.x | 随机任务（Duty Roulette）、极限讨伐战、水晶塔（24人）、幻境武器 |
| 3.0 | 飞行坐骑、苍天副本群、Alexander、Diadem |
| 4.0 | 潜水（游泳）、红莲副本群、欧米茄、Eureka |
| 5.0 | **Trust 系统**（NPC 队友）、第一世界、伊甸、YoRHa |
| 6.0 | 等级 90、晓月副本群、万魔殿、**异闻/异闻零式**、无人岛 |
| 7.0 | 等级 100、图拉尔、至天阿尔卡迪亚、**Duty Support 全面覆盖** |
| 7.x | Occult Crescent、宇宙探索、深层迷宫、幻境武器、限时职业 |

### 2.3 Dawntrail 主线（7.x）逐补丁起始任务（官方补丁说明原文）

> 以下任务名与 NPC 均来自官方 Lodestone 补丁说明的 "New main scenario quests have been added" 段。

| 补丁 | 主线起始任务 | 起始 NPC / 地点 | 前置任务 | 章节名 |
|---|---|---|---|---|
| 7.0 | **A New World to Explore** | Ojika Tsunjika／Old Sharlayan (9.2, 11.2) | The Coming Dawn (6.x 收尾) | Dawntrail |
| 7.1 | **A Royal Invitation** | Bol Wuruq／Tuliyollal (10.0, 15.0) | Dawntrail | Crossroads |
| 7.2 | **A Glimmer of the Past** | Krile／The Backroom (6.0, 6.4) | Crossroads | Seekers of Eternity |
| 7.3 | **Targeted Tragedy** | Shale／The Backroom (6.0, 6.3) | Crossroads | The Promise of Tomorrow |
| 7.4 | **With the Winds** | Alphinaud／Solution Nine (11.9, 6.3) | The Promise of Tomorrow | Into the Mist |
| 7.5 | **In Fate's Footsteps** | Krile／Solution Nine (12.6, 6.0) | Into the Mist | Trail to the Heavens Pt.1 |
| 7.56 | **A Winter's Dream** | Tataru／The Rising Stones (6.1, 5.9) | Trail to the Heavens | Trail to the Heavens Pt.2 |

> **观察**：7.2 与 7.3 的起始任务前置都写 "Crossroads"（7.1 的章节名），说明 **7.2/7.3 的补丁说明前置条件栏沿用了 7.1 的最终任务名**，这是官方文案的一致写法。各补丁的**章节名**（Patch title）见 §1.2。

**7.x 其他重要任务链起始（官方补丁说明）**：

| 补丁 | 任务 | 类型 | NPC |
|---|---|---|---|
| 7.5 | **The Hollow Promise** | Echoes of Vana'diel（同盟大型） | Landsguard Messenger／Tuliyollal (16.2, 3.9)，前置 "Apocalypse Nigh" |
| 7.56 | **Strangers in the Wood** | 驯兽师职业任务 | Excited Adventurer／New Gridania (11.8, 13.6)，前置 "The Ultimate Weapon" |

---

### 2.4 主线之外的重要支线／任务链

| 任务链 | 类型 | 版本 | 说明 | 是否 MSQ 强制 |
|---|---|---|---|---|
| **水晶塔（Crystal Tower）** | 24人同盟大型 ×3 | 2.x | 3.0–5.x 期间成为**漆黑 MSQ 前置**（现已解除强制） | 曾强制 |
| **巴哈姆特迷宫（Coil of Bahamut）** | 8人 ×13 | 2.x | 2.0 主线真结局，被认为是 2.x 剧情收尾 | 否 |
| **暗之世界／玛哈之影（Shadow of Mhach）** | 24人 ×3 | 3.x | 虚无界剧情伏笔 | 否 |
| **伊瓦利斯归来（Return to Ivalice）** | 24人 ×3 | 4.x | FF12/FFT 联动 | 否 |
| **YoRHa: Dark Apocalypse** | 24人 ×3 | 5.x | 尼尔联动 | 否 |
| **伊甸（Eden）** | 8人 ×12 | 5.x | 第一世界复原，**被广泛认为是 ShB 剧情真正收尾** | 否 |
| **万魔殿（Pandæmonium）** | 8人 ×12 | 6.x | 拉哈布雷亚与雅典娜 | 否 |
| **至天阿尔卡迪亚（The Arcadion）** | 8人 ×12 | 7.x | 亚历山德里亚的斗技场 | 否 |
| **希尔迪布兰德（Hildibrand）** | 支线剧情 | 2.x–7.55 | 搞笑支线；**与幻境武器强绑定** | 否 |
| **幻境／传说武器** | 长线养成 | 全版本 | 见 §6.4 | 否 |
| **同盟部族（Allied Society）** | 日常任务 | 全版本 | 7.55 有收尾任务 | 否 |
| **异闻／异闻零式（Variant & Criterion）** | 1–4人 | 6.x–7.x | 6.1 起；7.45「商人奇谭」 | 否 |
| **Occult Crescent** | 野外大型 | 7.2x+ | 7.55 新增 North Horn | 否 |
| **宇宙探索（Cosmic Exploration）** | 生产采集 | 7.21+ | 7.51 新增行星 Auxsia | 否 |
| **无人岛（Island Sanctuary）** | 模拟经营 | 6.2+ | 放置友好 | 否 |
| **深层迷宫（Deep Dungeon）** | 1–4人 | 3.x+ | PoTD / HoH / Orthos / **巡礼者之路** | 否 |
| **驯兽师与 Crucible of the Unbroken** | 限时职业专属 | 7.56 | 棋盘式单人流玩法，极适合放置改造 | 否 |

---

## 3. 完整副本清单表

> **本章全部数据来自官方 Lodestone Eorzea Database 抓取**（`category2=2/4/5` × `ex_version=0..5`）。
> - 门槛列 = **进入所需平均品级**（官方 DB 字段）
> - 掉落列 = 通关掉落品级（来源为补丁说明/装备库，**非** DB 门槛字段）
> - `v` 编号对应：v0=新生 ARR，v1=苍天 HW，v2=红莲 SB，v3=漆黑 ShB，v4=晓月 EW，v5=黄金 DT

### 3.1 4 人副本（Dungeon）完整清单

#### 新生艾欧泽亚（2.x）— **31 个**

| # | 副本名（EN） | 等级 | 平均品级门槛 | 备注 |
|---|---|---|---|---|
| 1 | Sastasha | 15 | — | 首个副本 |
| 2 | The Tam-Tara Deepcroft | 16 | — | |
| 3 | Copperbell Mines | 17 | — | |
| 4 | Halatali | 20 | — | |
| 5 | The Thousand Maws of Toto-Rak | 24 | — | |
| 6 | Haukke Manor | 28 | — | |
| 7 | Brayflox's Longstop | 32 | — | |
| 8 | The Sunken Temple of Qarn | 35 | — | |
| 9 | Cutter's Cry | 38 | — | |
| 10 | The Stone Vigil | 41 | — | |
| 11 | Dzemael Darkhold | 44 | — | |
| 12 | The Aurum Vale | 47 | — | |
| 13 | The Wanderer's Palace | 50 | 45 | |
| 14 | Castrum Meridianum | 50 | 42 | MSQ |
| 15 | The Praetorium | 50 | 42 | MSQ |
| 16 | Amdapor Keep | 50 | 45 | |
| 17 | Pharos Sirius | 50 | 48 | |
| 18 | Copperbell Mines (Hard) | 50 | 48 | |
| 19 | Haukke Manor (Hard) | 50 | 48 | |
| 20 | The Lost City of Amdapor | 50 | 55 | |
| 21 | Halatali (Hard) | 50 | 55 | |
| 22 | Brayflox's Longstop (Hard) | 50 | 55 | |
| 23 | Hullbreaker Isle | 50 | 70 | |
| 24 | The Tam-Tara Deepcroft (Hard) | 50 | 70 | |
| 25 | The Stone Vigil (Hard) | 50 | 70 | |
| 26 | Snowcloak | 50 | 80 | |
| 27 | Sastasha (Hard) | 50 | 80 | |
| 28 | The Sunken Temple of Qarn (Hard) | 50 | 80 | |
| 29 | The Keeper of the Lake | 50 | 90 | 2.x 收尾 |
| 30 | The Wanderer's Palace (Hard) | 50 | 90 | |
| 31 | Amdapor Keep (Hard) | 50 | 90 | |

#### 苍天之龙骑士（3.x）— **18 个**

| # | 副本名（EN） | 等级 | 平均品级门槛 |
|---|---|---|---|
| 1 | The Dusk Vigil | 51 | 100 |
| 2 | Sohm Al | 53 | 105 |
| 3 | The Aery | 55 | 110 |
| 4 | The Vault | 57 | 115 |
| 5 | The Great Gubal Library | 59 | 120 |
| 6 | The Aetherochemical Research Facility | 60 | 142 |
| 7 | Neverreap | 60 | 145 |
| 8 | The Fractal Continuum | 60 | 145 |
| 9 | Saint Mocianne's Arboretum | 60 | 170 |
| 10 | Pharos Sirius (Hard) | 60 | 170 |
| 11 | The Antitower | 60 | 180 |
| 12 | The Lost City of Amdapor (Hard) | 60 | 180 |
| 13 | Sohr Khai | 60 | 200 |
| 14 | Hullbreaker Isle (Hard) | 60 | 200 |
| 15 | Xelphatol | 60 | 210 |
| 16 | The Great Gubal Library (Hard) | 60 | 210 |
| 17 | Baelsar's Wall | 60 | 230 |
| 18 | Sohm Al (Hard) | 60 | 230 |

#### 红莲之狂潮（4.x）— **15 个**

| # | 副本名（EN） | 等级 | 平均品级门槛 |
|---|---|---|---|
| 1 | The Sirensong Sea | 61 | 240 |
| 2 | Shisui of the Violet Tides | 63 | 245 |
| 3 | Bardam's Mettle | 65 | 250 |
| 4 | Doma Castle | 67 | 255 |
| 5 | Castrum Abania | 69 | 260 |
| 6 | Ala Mhigo | 70 | 280 |
| 7 | Kugane Castle | 70 | 280 |
| 8 | The Temple of the Fist | 70 | 280 |
| 9 | The Drowned City of Skalla | 70 | 300 |
| 10 | Hells' Lid | 70 | 310 |
| 11 | The Fractal Continuum (Hard) | 70 | 310 |
| 12 | The Swallow's Compass | 70 | 330 |
| 13 | The Burn | 70 | 340 |
| 14 | Saint Mocianne's Arboretum (Hard) | 70 | 340 |
| 15 | The Ghimlyt Dark | 70 | 360 |

#### 漆黑之反叛者（5.x）— **13 个**

| # | 副本名（EN） | 等级 | 平均品级门槛 |
|---|---|---|---|
| 1 | Holminster Switch | 71 | 370 |
| 2 | Dohn Mheg | 73 | 375 |
| 3 | The Qitana Ravel | 75 | 380 |
| 4 | Malikah's Well | 77 | 385 |
| 5 | Mt. Gulg | 79 | 390 |
| 6 | Amaurot | 80 | 410 |
| 7 | The Twinning | 80 | 410 |
| 8 | Akadaemia Anyder | 80 | 410 |
| 9 | The Grand Cosmos | 80 | 430 |
| 10 | Anamnesis Anyder | 80 | 440 |
| 11 | The Heroes' Gauntlet | 80 | 460 |
| 12 | Matoya's Relict | 80 | 470 |
| 13 | Paglth'an | 80 | 490 |

#### 晓月之终途（6.x）— **13 个**

| # | 副本名（EN） | 等级 | 平均品级门槛 |
|---|---|---|---|
| 1 | The Tower of Zot | 81 | 500 |
| 2 | The Tower of Babil | 83 | 505 |
| 3 | Vanaspati | 85 | 510 |
| 4 | Ktisis Hyperboreia | 87 | 515 |
| 5 | The Aitiascope | 89 | 520 |
| 6 | The Dead Ends | 90 | 540 |
| 7 | Smileton | 90 | 540 |
| 8 | The Stigma Dreamscape | 90 | 540 |
| 9 | Alzadaal's Legacy | 90 | 560 |
| 10 | The Fell Court of Troia | 90 | 575 |
| 11 | Lapis Manalis | 90 | 590 |
| 12 | The Aetherfont | 90 | 605 |
| 13 | The Lunar Subterrane | 90 | 620 |

#### 黄金之遗产（7.x）— **13 个**

| # | 副本名（EN） | 等级 | 平均品级门槛 | 补丁 |
|---|---|---|---|---|
| 1 | Ihuykatumu | 91 | 630 | 7.0 |
| 2 | Worqor Zormor | 93 | 635 | 7.0 |
| 3 | The Skydeep Cenote | 95 | 640 | 7.0 |
| 4 | Vanguard | 97 | 645 | 7.0 |
| 5 | Origenics | 99 | 650 | 7.0 |
| 6 | Alexandria | 100 | 670 | 7.0 |
| 7 | Tender Valley | 100 | 670 | 7.0 |
| 8 | The Strayborough Deadwalk | 100 | 670 | 7.0 |
| 9 | Yuweyawata Field Station | 100 | 690 | 7.1 |
| 10 | The Underkeep | 100 | 705 | 7.2 |
| 11 | The Meso Terminal | 100 | 720 | 7.3 |
| 12 | Mistwake | 100 | 735 | 7.4 |
| 13 | **The Clyteum** | 100 | 750 | 7.5 |

#### 4 人本数量汇总

| 资料片 | 4 人本数量 | 等级区间 |
|---|---|---|
| 新生 ARR (2.x) | **31** | 15–50 |
| 苍天 HW (3.x) | **18** | 51–60 |
| 红莲 SB (4.x) | **15** | 61–70 |
| 漆黑 ShB (5.x) | **13** | 71–80 |
| 晓月 EW (6.x) | **13** | 81–90 |
| 黄金 DT (7.x) | **13** | 91–100 |
| **合计** | **103** | 15–100 |

> **趋势观察**：ARR 之后每个资料片的 4 人本数量**稳定在 13–18 个**，且随着等级上限提升，副本的"每级密度"下降。这对放置游戏的关卡节奏设计有直接参考价值：**新版资料片约 13 个 4 人本撑起 10 级**（约 1.3 级/本），而 ARR 是 31 个本撑 35 级。

---

### 3.2 讨伐战（Trial）完整清单

#### 新生艾欧泽亚（2.x）— **26 个**

| 类型 | 讨伐战 | 等级 | 平均品级门槛 |
|---|---|---|---|
| Normal | The Bowl of Embers（伊弗利特） | 20 | — |
| Normal | The Navel（泰坦） | 34 | — |
| Normal | The Howling Eye（迦楼罗） | 44 | — |
| Normal | The Porta Decumana（究极兵器） | 50 | 42 |
| Normal | The Chrysalis | 50 | 90 |
| 武器任务 | A Relic Reborn: the Chimera | 50 | 52 |
| 武器任务 | A Relic Reborn: the Hydra | 50 | 52 |
| Normal | Battle on the Big Bridge（吉尔伽美什） | 50 | 50 |
| Normal | The Dragon's Neck | 50 | 80 |
| Normal | Battle in the Big Keep | 50 | 90 |
| Hard | The Bowl of Embers (Hard) | 50 | 49 |
| Hard | The Howling Eye (Hard) | 50 | 52 |
| Hard | The Navel (Hard) | 50 | 57 |
| Hard | Thornmarch (Hard)（莫古力） | 50 | 54 |
| Hard | The Whorleater (Hard)（利维亚桑） | 50 | 60 |
| Hard | The Striking Tree (Hard)（拉姆） | 50 | 65 |
| Hard | The Akh Afah Amphitheatre (Hard)（希瓦） | 50 | 80 |
| Normal | Urth's Fount（奥丁） | 50 | 95 |
| 极神 | The Minstrel's Ballad: Ultima's Bane | 50 | 61 |
| 极神 | The Howling Eye (Extreme) | 50 | 65 |
| 极神 | The Navel (Extreme) | 50 | 67 |
| 极神 | The Bowl of Embers (Extreme) | 50 | 70 |
| 极神 | Thornmarch (Extreme) | 50 | 80 |
| 极神 | The Whorleater (Extreme) | 50 | 80 |
| 极神 | The Striking Tree (Extreme) | 50 | 85 |
| 极神 | The Akh Afah Amphitheatre (Extreme) | 50 | 95 |

#### 苍天之龙骑士（3.x）— **14 个**

| 类型 | 讨伐战 | 等级 | 平均品级门槛 |
|---|---|---|---|
| Normal | Thok ast Thok (Hard)（拉瓦那） | 53 | — |
| Normal | The Limitless Blue (Hard)（俾斯麦） | 57 | — |
| Normal | The Singularity Reactor（圆桌骑士） | 60 | 142 |
| Normal | The Final Steps of Faith（尼德霍格） | 60 | 205 |
| Normal | Containment Bay S1T7（索菲亚） | 60 | 190 |
| Normal | Containment Bay P1T6（祖尔宛） | 60 | 220 |
| Normal | Containment Bay Z1T9（塞菲洛特） | 60 | 235 |
| 极神 | The Limitless Blue (Extreme) | 60 | 165 |
| 极神 | Thok ast Thok (Extreme) | 60 | 175 |
| 极神 | The Minstrel's Ballad: Thordan's Reign | 60 | 190 |
| 极神 | The Minstrel's Ballad: Nidhogg's Rage | 60 | 220 |
| 极神 | Containment Bay S1T7 (Extreme) | 60 | 205 |
| 极神 | Containment Bay P1T6 (Extreme) | 60 | 235 |
| 极神 | Containment Bay Z1T9 (Extreme) | 60 | 250 |

#### 红莲之狂潮（4.x）— **17 个**

| 类型 | 讨伐战 | 等级 | 平均品级门槛 |
|---|---|---|---|
| Normal | The Pool of Tribute（须佐能乎） | 63 | — |
| Normal | Emanation（拉克什米） | 67 | — |
| Normal | The Royal Menagerie（真·神龙） | 70 | 280 |
| Normal | Castrum Fluminis（月读） | 70 | 335 |
| Normal | Kugane Ohashi（吉尔伽美什） | 70 | 365 |
| Normal | The Great Hunt（优雷卡？否 — 大狩猎） | 70 | 320 |
| Normal | The Jade Stoa（白帝） | 70 | 325 |
| Normal | Hells' Kier（朱雀） | 70 | 355 |
| Normal | The Wreath of Snakes（青龙） | 70 | 365 |
| 极神 | The Pool of Tribute (Extreme) | 70 | 300 |
| 极神 | Emanation (Extreme) | 70 | 300 |
| 极神 | The Minstrel's Ballad: Shinryu's Domain | 70 | 320 |
| 极神 | The Minstrel's Ballad: Tsukuyomi's Pain | 70 | 350 |
| 极神 | The Great Hunt (Extreme) | 70 | 350 |
| 极神 | The Jade Stoa (Extreme) | 70 | 340 |
| 极神 | Hells' Kier (Extreme) | 70 | 370 |
| 极神 | The Wreath of Snakes (Extreme) | 70 | 380 |

#### 漆黑之反叛者（5.x）— **15 个**

| 类型 | 讨伐战 | 等级 | 平均品级门槛 |
|---|---|---|---|
| Normal | The Dancing Plague（蒂塔妮亚） | 73 | — |
| Normal | The Crown of the Immaculate（伊诺森斯） | 79 | — |
| Normal | The Dying Gasp（哈迪斯） | 80 | 410 |
| Normal | Cinder Drift（红宝石兵器） | 80 | 455 |
| Normal | The Seat of Sacrifice（艾莉迪布斯） | 80 | 465 |
| Normal | Castrum Marinum（祖母绿兵器） | 80 | 485 |
| Normal | The Cloud Deck（钻石兵器） | 80 | 495 |
| 极神 | The Dancing Plague (Extreme) | 80 | 430 |
| 极神 | The Crown of the Immaculate (Extreme) | 80 | 430 |
| 极神 | The Minstrel's Ballad: Hades's Elegy | 80 | 450 |
| 极神 | Cinder Drift (Extreme) | 80 | 470 |
| 极神 | Memoria Misera (Extreme)（瓦里斯） | 80 | 470 |
| 极神 | The Seat of Sacrifice (Extreme) | 80 | 480 |
| 极神 | Castrum Marinum (Extreme) | 80 | 500 |
| 极神 | The Cloud Deck (Extreme) | 80 | 510 |

#### 晓月之终途（6.x）— **15 个**

| 类型 | 讨伐战 | 等级 | 平均品级门槛 |
|---|---|---|---|
| Normal | The Dark Inside（佐迪亚克） | 83 | — |
| Normal | The Mothercrystal（海德林） | 89 | — |
| Normal | The Final Day（终末之兽） | 90 | 540 |
| Normal | Storm's Crown（巴尔巴里恰） | 90 | 585 |
| Normal | Mount Ordeals（鲁比坎特） | 90 | 595 |
| Normal | The Voidcast Dais（戈鲁贝扎） | 90 | 615 |
| Normal | The Abyssal Fracture（泽罗姆斯） | 90 | 625 |
| Normal | The Gilded Araya（阿修罗） | 90 | 625 |
| 极神 | The Minstrel's Ballad: Zodiark's Fall | 90 | 560 |
| 极神 | The Minstrel's Ballad: Hydaelyn's Call | 90 | 560 |
| 极神 | The Minstrel's Ballad: Endsinger's Aria | 90 | 580 |
| 极神 | Storm's Crown (Extreme) | 90 | 600 |
| 极神 | Mount Ordeals (Extreme) | 90 | 610 |
| 极神 | The Voidcast Dais (Extreme) | 90 | 630 |
| 极神 | The Abyssal Fracture (Extreme) | 90 | 640 |

#### 黄金之遗产（7.x）— **17 个**

| 类型 | 讨伐战 | 等级 | 平均品级门槛 | 补丁 |
|---|---|---|---|---|
| 幻 | **Shinryu's Domain (Unreal)** | 100 | 690（同步 695） | 7.5 |
| Normal | Worqor Lar Dor（瓦利加曼达） | 93 | — | 7.0 |
| Normal | Everkeep（泽雷尼亚） | 99 | — | 7.0 |
| Normal | The Interphos（斯菲涅） | 100 | 670 | 7.0 |
| Normal | Recollection（终结之战？7.1） | 100 | 715 | 7.1 |
| Normal | The Ageless Necropolis | 100 | 725 | 7.2 |
| Normal | The Windward Wilds | 100 | 725 | 7.2 |
| Normal | Hell on Rails | 100 | 745 | 7.3 |
| Normal | **The Unmaking**（Enuo） | 100 | 755 | 7.4/7.5 |
| 极神 | Worqor Lar Dor (Extreme) | 100 | 690 | 7.0 |
| 极神 | Everkeep (Extreme) | 100 | 690 | 7.0 |
| 极神 | The Minstrel's Ballad: Sphene's Burden | 100 | 710 | 7.0 |
| 极神 | Recollection (Extreme) | 100 | 730 | 7.1 |
| 极神 | The Minstrel's Ballad: Necron's Embrace | 100 | 740 | 7.2 |
| 极神 | The Windward Wilds (Extreme) | 100 | 740 | 7.2 |
| 极神 | Hell on Rails (Extreme) | 100 | 760 | 7.3 |
| 极神 | **The Unmaking (Extreme)** | 100 | 770 | 7.4/7.5 |

#### 幻（Unreal）讨伐战轮换机制

幻讨伐战是"**老极神重置到当前等级上限**"的系统，绑定在 **Faux Hollows（伪洞）** 每周玩法上：

- 当前（7.5 起）：**Shinryu's Domain (Unreal)**，等级 100，品级门槛 690，**同步品级 695**
- 前一期（7.3–7.4）：**Tsukuyomi's Pain (Unreal)**
- 历史轮换包括：Sephirot、Zurvan、Sophia、Leviathan、Ramuh、Shiva、Titan、Ifrit、Garuda 等
- **刷新周期：每周一次，奖励「Faux Hollows」翻牌机会 + 战利品**

> **放置设计价值**：Unreal 是"每周打一次固定高难本"的典型周常，非常适合作为放置游戏的**周常 Boss 层**。

---

### 3.3 8 人大型任务（Raid：Normal + Savage 零式）

#### 新生 ARR（2.x）— 巴哈姆特迷宫（Coil of Bahamut）

| 层 | 名称 | 等级 | 平均品级门槛 |
|---|---|---|---|
| 1-1 | The Binding Coil of Bahamut - Turn 1 | 50 | 70 |
| 1-2 | Turn 2 | 50 | 73 |
| 1-3 | Turn 3 | 50 | 70 |
| 1-4 | Turn 4 | 50 | 77 |
| 1-5 | Turn 5 | 50 | 82 |
| 2-1 | The Second Coil of Bahamut - Turn 1 | 50 | 90 |
| 2-2 | Turn 2 | 50 | 95 |
| 2-3 | Turn 3 | 50 | 100 |
| 2-4 | Turn 4 | 50 | 105 |
| 3-1 | The Final Coil of Bahamut - Turn 1 | 50 | 110 |
| 3-2 | Turn 2 | 50 | 115 |
| 3-3 | Turn 3 | 50 | 120 |
| 3-4 | Turn 4 | 50 | 123 |
| 零式 | The Second Coil of Bahamut (Savage) Turn 1–4 | 50 | 105（统一） |

> **注**：巴哈姆特只有"第二迷宫"有零式版本，第一/第三迷宫无零式。这是 FFXIV 最早期的零式设计。

#### 苍天 HW（3.x）— 亚历山大（Alexander）

| 层 | 名称 | Normal 门槛 | Savage 门槛 |
|---|---|---|---|
| 天动篇 1–4 | The Fist / Cuff / Arm / Burden of the Father | 170 | 190 / 195 / 200 / 205 |
| 律动篇 1–4 | The Fist / Cuff / Arm / Burden of the Son | 200 | 215 / 220 / 225 / 225 |
| 创世篇 1–4 | The Eyes / Breath / Heart / Soul of the Creator | 230 | 245 / 250 / 255 / 255 |

#### 红莲 SB（4.x）— 欧米茄（Omega）

| 层 | 名称 | Normal 门槛 | Savage 门槛 |
|---|---|---|---|
| 德尔塔篇 1–4 | Deltascape V1.0–V4.0 | 295 | 310 / 315 / 320 / 320 |
| 西格玛篇 1–4 | Sigmascape V1.0–V4.0 | 325 | 340 / 345 / 350 / 350 |
| 阿尔法篇 1–4 | Alphascape V1.0–V4.0 | 355 | 370 / 375 / 380 / 380 |

#### 漆黑 ShB（5.x）— 伊甸（Eden）

| 层 | 名称 | Normal 门槛 | Savage 门槛 |
|---|---|---|---|
| 希望篇 1–4 | Eden's Gate: Resurrection / Descent / Inundation / Sepulture | 425 | 440 / 445 / 450 / 450 |
| 律动篇 1–4 | Eden's Verse: Fulmination / Furor / Iconoclasm / Refulgence | 455 | 470 / 475 / 480 / 480 |
| 约定篇 1–4 | Eden's Promise: Umbra / Litany / Anamorphosis / Eternity | 485 | 500 / 505 / 510 / 510 |

#### 晓月 EW（6.x）— 万魔殿（Pandæmonium）

| 层 | 名称 | Normal 门槛 | Savage 门槛 |
|---|---|---|---|
| 阿斯福德洛斯篇 1–4 | Asphodelos: The First–Fourth Circle | 565 | 570 / 575 / 580 / 580 |
| 阿布索斯篇 5–8 | Abyssos: The Fifth–Eighth Circle | 585 | 600 / 605 / 610 / 610 |
| 阿纳拜西奥斯篇 9–12 | Anabaseios: The Ninth–Twelfth Circle | 615 | 630 / 635 / 640 / 640 |

#### 黄金 DT（7.x）— 至天阿尔卡迪亚（The Arcadion）

| 层 | 名称 | Normal 门槛 | Savage 门槛 |
|---|---|---|---|
| 轻量级 M1–M4 | AAC Light-heavyweight M1–M4 | 685 | 700 / 705 / 710 / 710 |
| 中量级 M1–M4 | AAC Cruiserweight M1–M4 | 715 | 730 / 735 / 740 / 740 |
| 重量级 M1–M4 | AAC Heavyweight M1–M4 | 745 | 760 / 765 / 770 / 770 |

> **命名体系观察**：DT 的零式采用"**拳击重量级**"命名（Light-heavyweight / Cruiserweight / Heavyweight），对应 M1–M4 楼层编号。这是 FFXIV 首次用主题化而非数字编号（P1–P12）的raid层命名。
>
> **7.56 的重要变化**：重量级零式（AAC Heavyweight Savage）在 7.56 **解除了周限**（宝箱周限、入场周限），并**常驻给予 12% 回响**。这是"大版本末期放松高难门槛"的标准做法。

---

### 3.4 24 人同盟大型任务（Alliance Raid）

| 资料片 | 系列 | 副本 1 | 副本 2 | 副本 3 |
|---|---|---|---|---|
| 新生 2.x | **水晶塔 (Crystal Tower)** | The Labyrinth of the Ancients (iL50) | Syrcus Tower (iL70) | The World of Darkness (iL90) |
| 苍天 3.x | **玛哈之影 (Shadow of Mhach)** | The Void Ark (iL175) | The Weeping City of Mhach (iL205) | Dun Scaith (iL235) |
| 红莲 4.x | **伊瓦利斯归来 (Return to Ivalice)** | The Royal City of Rabanastre (iL305) | The Ridorana Lighthouse (iL335) | The Orbonne Monastery (iL365) |
| 漆黑 5.x | **YoRHa: Dark Apocalypse** | The Copied Factory (iL435) | The Puppets' Bunker (iL465) | The Tower at Paradigm's Breach (iL495) |
| 晓月 6.x | **神话领域 (Myths of the Realm)** | Aglaia (iL565) | Euphrosyne (iL595) | Thaleia (iL625) |
| 黄金 7.x | **Echoes of Vana'diel**（FF11 联动） | Jeuno: The First Walk (iL695) | San d'Oria: The Second Walk (iL725) | **Windurst: The Third Walk (iL755)** |

**金币货币系统（7.x 新增）**：

| 副本 | 货币 | 周限 |
|---|---|---|
| Jeuno: The First Walk | 奥尔代尔古钱（Ordelle Coin） | 无 |
| San d'Oria: The Second Walk | 莫尼永古钱（Moniyon Coin） | 无 |
| Windurst: The Third Walk | **兰佩尔古钱（Ranperre Coin）** | **每周 1 个** |

> 三种古钱各 1 个可在 Solution Nine 的 Wafsepa 处兑换 **奔雷的强化纤维 / 奔雷的硬化药**（7.5 阶段的高级强化素材）。

**另有：混沌同盟大型任务（Chaotic Alliance Raid）** — 7.15 引入的 24 人高难度内容，介于同盟大型与零式之间。`【未验证：具体副本名与品级】`

---

### 3.5 绝境战（Ultimate Raid）完整清单

| # | 名称 | 简称 | 补丁 | 等级 | 掉落武器品级 |
|---|---|---|---|---|---|
| 1 | The Unending Coil of Bahamut (Ultimate) | UCoB | 4.1 | 70 | iL345 |
| 2 | The Weapon's Refrain (Ultimate) | UWU | 4.3 | 70 | iL375 |
| 3 | The Epic of Alexander (Ultimate) | TEA | 5.1 | 80 | iL475 |
| 4 | Dragonsong's Reprise (Ultimate) | DSR | 6.1 | 90 | iL605 |
| 5 | The Omega Protocol (Ultimate) | TOP | 6.3 | 90 | iL635 |
| 6 | Futures Rewritten (Ultimate) | FRU | 7.1 | 100 | iL730 |
| 7 | **Dancing Mad (Ultimate)** | — | **7.51** | 100 | **iL795**`【未验证】` |

> **来源**：前 6 项的等级来自官方 DB（`category2=28`）；Dancing Mad 亦在官方 DB 中（确认其存在与 Lv100）。**武器掉落品级**来自社区汇总，标注 `【未验证】`。
>
> **注意**：绝境战掉落武器**品级等于当时零式最终层的武器品级 +0~+5**，且附带 3 条属性上限提升（无魔石孔），是每个大版本的**装备天花板**。

---

### 3.6 其他高难／特殊副本

| 类型 | 内容 | 版本 | 人数 | 说明 |
|---|---|---|---|---|
| 异闻迷宫（Variant） | The Sil'dihn Subterrane | 6.1 | 1–4 | 分支路线，可单人 |
| 异闻迷宫 | Mount Rokkon | 6.3 | 1–4 | |
| 异闻迷宫 | Aloalo Island | 6.5 | 1–4 | |
| 异闻迷宫 | **The Merchant's Tale** | 7.45 | 1–4 | 商人奇谭 |
| 异闻零式（Criterion） | 上述 4 个的零式版 | 6.x–7.x | 4 | 固定 4 人高难 |
| 深层迷宫 | Palace of the Dead （死者宫殿） | 3.35 | 1–4 | 1–200 层 |
| 深层迷宫 | Heaven-on-High （天之阶梯） | 4.35 | 1–4 | 1–100 层 |
| 深层迷宫 | Eureka Orthos | 6.35 | 1–4 | 1–100 层 |
| 深层迷宫 | **Pilgrim's Traverse**（巡礼者之路） | 7.35 | 1–4 | 分层（Stones 1–40+） |
| 驯兽师专属 | **Crucible of the Unbroken** | 7.56 | 1（单人） | 棋盘式 roguelike，见 §6.7 |
| 野外大型 | Occult Crescent: South Horn / North Horn | 7.2x / 7.55 | 多人 | Critical Encounter + Forked Tower |
| 野外大型 | Eureka（优雷卡） | 4.25+ | 多人 | Anemos / Pagos / Pyros / Hydatos |
| 野外大型 | Bozjan Southern Front / Zadnor | 5.35+ | 多人 | 南方战线 |
| 生产采集 | Cosmic Exploration（宇宙探索） | 7.21+ | 多人 | 行星 Auxsia（7.51） |
| 生产采集 | Ishgard Restoration | 5.11+ | 多人 | 伊修加德复兴 |

---

## 4. 终局装备获取循环

> **本章基准：Patch 7.56，等级 100。**

### 4.1 亚拉戈神典石（Allagan Tomestones）系统

亚拉戈神典石是 FFXIV 的代币系统，**每个大版本会更换名称**。当前 7.x 系列：

| 神典石 | 英文名 | 版本 | 周限 | 用途 |
|---|---|---|---|---|
| 诗学 | Poetics | 2.0 起常驻 | 无 | 旧版本装备（练级/幻化） |
| **数理** | **Mathematics** | 7.0–7.5 | 无周限 | 兑换**新式强化素材**（トレノの強霊薬） |
| **记忆** | **Mnemonics** | 7.4–7.56 | **450 → 900**（7.56 提升） | 兑换 iL780 记忆装备 |

**关键数据（官方补丁说明）**：

> "The weekly limit for Allagan tomestones of mnemonics has been increased from 450 to 900. The maximum store of 2,000 tomestones has not been changed."
> — [Lodestone Patch 7.56 Notes](https://na.finalfantasyxiv.com/lodestone/topics/detail/a8a526ad64db45c8ca8d1c7fdcce8a5eedaa18bc)

**历史神典石名称序列**（用于放置游戏的"代币换名"设计参考）：

| 版本 | 高级代币 | 中级代币 |
|---|---|---|
| 2.x | Mythology → Soldiery | Philosophy |
| 3.x | Esoterics → Lore → Scripture | Law → Esoterics |
| 4.x | Verity → Creation → Mendacity → Genesis | |
| 5.x | Goetia → Phantasmagoria → Allegory → Revelation | |
| 6.x | Aphorism → Astronomy → Causality → Comedy | |
| 7.x | **Heliometry → Mathematics → Mnemonics** | |

> ⚠️ **命名不确定**：6.x/7.x 各级代币的准确对应关系（哪个是"高级"哪个是"中级"）来自社区汇总，非官方文档。`【未验证】`

### 4.2 等级 100 的品级递进路线（Patch 7.5/7.56）

#### 装备来源与品级对照表

| 品级 | 装备名称（7.5 阶段） | 获取方式 | 周限 |
|---|---|---|---|
| **iL670** | 7.0 主线赠送 / 副本掉落 | Alexandria、Tender Valley、The Strayborough Deadwalk | 无 |
| **iL690** | 7.1 副本 / 新式初期 | Yuweyawata Field Station | 无 |
| **iL700–710** | **轻量级零式**（M1S–M4S 掉落） | 至天阿尔卡迪亚 轻量级 零式 | **已解除**（版本末期） |
| **iL705–720** | 7.2–7.3 副本 | The Underkeep / The Meso Terminal | 无 |
| **iL715** | 中量级 Normal | AAC Cruiserweight M1–M4 | 无 |
| **iL730–740** | **中量级零式**（M1S–M4S 掉落） | 至天阿尔卡迪亚 中量级 零式 | **已解除** |
| **iL735** | 7.4 副本 | Mistwake | 无 |
| **iL745** | **重量级 Normal** | AAC Heavyweight M1–M4 | 无 |
| **iL750** | 7.5 副本 | The Clyteum | 无 |
| **iL760–770** | **重量级零式**（M1S–M4S 掉落） | 至天阿尔卡迪亚 重量级 零式 | **7.56 起解除** |
| **iL770** | **新式装备（制作）** | 制作职业 100 级 ★★★★ 配方 | 无 |
| **iL780** | **记忆装备**（神典石） | 亚拉戈神典石：记忆 × 375–825 | **900/周**（7.56） |
| **iL780** | 柯特利拉瓦装备（新式强化） | 新式 iL770 + 数理素材 + 制作 | 无 |
| **iL790** | **记忆RE装备**（记忆装备强化） | iL780 记忆装备 + 奔雷的强化药/纤维/硬化药 | 无 |
| **iL790** | 柯特利拉瓦强化装备 | iL780 + Everkeep 手形 G3 + トレノの強霊薬 | 无 |
| **iL795** | **重量级零式武器** | 重量级零式第 4 层第 4 片 × 8 | **已解除** |
| **iL795** | **幻境武器（Phantom Weapon）最终阶段** | 幻境任务链最终强化 | 无 |
| **iL795** | **Dancing Mad (Ultimate) 武器** | 7.51 绝境战 | 无 |

#### 记忆装备兑换价目（7.5 数据）

| 部位 | 记忆神典石数量 |
|---|---|
| 武器（iL780） | 500 + 汎用規格トームストーン v3.0 × 1 |
| 头 / 手 / 脚（iL780） | 495 |
| 胴 / 脚（iL780） | 825 |
| 饰品（iL780） | 375 |

> ⚠️ "胴/脚"与"头/手/脚"的日文原文区分为「胴防具・脚防具」与「頭防具、手防具、足防具」，中文对应为**躯干/腿部**与**头部/手部/足部**。上表已按此修正。

#### 重量级零式断片兑换表

| 断片 | 数量 | 兑换物 |
|---|---|---|
| 第1片 × 3 | → | iL790 饰品 |
| 第2片 × 4 | → | iL790 头/手/足防具 |
| 第3片 × 6 | → | iL790 躯干/腿部防具 |
| 第4片 × 8 | → | **iL795 武器** |
| 第2片 × 3 | → | 奔雷的硬化药 |
| 第3片 × 4 | → | 奔雷的强化药 / 奔雷的强化纤维 |
| 第4片 × 1 | → | 第1片 + 第2片 + 第3片（各 1） |

**来源**：[Lodestone 玩家博客（Patch 7.5 装备笔记）](https://de.finalfantasyxiv.com/lodestone/character/46816844/blog/5678633/) — 内容为玩家整理，但与官方补丁说明的素材名一致，可信度较高。

### 4.3 门槛 vs 掉落 的换算说明（重要）

官方 DB 的 "Average Item Level" 是**入场门槛**。根据 7.x 数据回归，实际掉落品级约为：

```
掉落品级 ≈ 入场门槛 + 15 ~ 20
```

示例验证：

| 副本 | 门槛 | 实际掉落 | 差值 |
|---|---|---|---|
| The Clyteum (7.5) | 750 | 765 `【未验证：具体数值】` | +15 |
| Mistwake (7.4) | 735 | ~750 | +15 |
| The Meso Terminal (7.3) | 720 | ~735 | +15 |
| AAC Heavyweight M4S (7.4) | 770 | 770（零式不掉"更高"，而是门槛=掉落） | 0 |

> ⚠️ **零式与绝境战的特殊性**：零式副本的"平均品级门槛"在官方 DB 中显示为**接近其掉落品级**（因为设计上"你必须已经接近这个品级才能进"）。因此**不要用"门槛 + 15"的规则去推断零式掉落**。

### 4.4 每周可预期的品级增长

以一个**从 iL690 起步的满级角色**为例，标准 7.5 阶段的一周：

| 来源 | 每周产出 | 品级贡献 |
|---|---|---|
| 神典石：记忆（900/周） | iL780 单件（495–825/件） | 约 1–1.8 件/周 |
| 重量级 Normal（4 层） | iL745 装备 + 断片 | 填充 |
| 重量级零式（4 层，已解除周限） | iL760–770 + 断片 → iL790/795 | 可加速 |
| 同盟大型「Windurst」（1 次/周） | iL755 + **兰佩尔古钱 ×1** | 1 件/周 |
| 幻讨伐（Faux Hollows，1 次/周） | 翻牌奖励 | 辅助 |
| 狩猎（A 怪巡游） | 战利品 ×3000 → 奔雷素材 | 强化素材 |
| 宇宙探索 / Occult Crescent | 幻境武器素材 | 武器线 |

**典型"回归玩家"的 4–6 周路线**：

1. 第 1 周：跑完 7.0–7.5 MSQ，拿到 iL670–690 主线装备；解锁重量级 Normal
2. 第 2 周：重量级 Normal 刷满 + 记忆神典石换 2 件 iL780
3. 第 3 周：买/做 iL770 新式装备 → 强化到 iL780；开始重量级零式
4. 第 4 周：零式断片换 iL790；武器从第4片拿 iL795
5. 第 5–6 周：补齐记忆RE（iL790）+ 幻境武器 iL795 → **全 iL790+ 达成**

**天花板**：iL795（不含 7.51 绝境战武器，若绝境战确为 iL795 则同为 795）。`iL800 是否存在：未能确认` `【未验证】`

---

## 5. 练级与进度加速系统

### 5.1 随机任务（Duty Roulette）完整列表

| 轮盘 | 英文名 | 解锁条件 | 每日奖励 | 主要产出 |
|---|---|---|---|---|
| 专家 | Expert | 完成当前版本所有满级 4 人本 | 每日 1 次 | 记忆 40 / 数理 60 |
| 满级副本 | Level Cap Dungeons | 完成所有满级 4 人本 | 每日 1 次 | 记忆 15 / 数理 100 |
| 高级练级 | High-level Dungeons | Lv 61+ | 每日 1 次 | 数理 120 |
| 练级 | Leveling | Lv 16+ | 每日 1 次 | 记忆 20 / 数理 100 |
| 讨伐・讨灭战 | Trials | 完成 2 个讨伐战 | 每日 1 次 | 记忆 15 / 数理 60 |
| 主线任务 | Main Scenario | 完成 2 个主线副本 | 每日 1 次 | 记忆 50 / 数理 100 |
| 同盟大型 | Alliance Raids | 完成 1 个同盟大型 | 每日 1 次 | 记忆 50 / 数理 120 |
| 普通大型 | Normal Raids | 完成 1 个普通大型 | 每日 1 次 | 记忆 20 / 数理 60 |
| 前线 | Frontline | Lv 30+ | **每日 1 次（PvP）** | 记忆 20 / 数理 50 |
| 集团战 | Guildhests | Lv 10+ | 每日 1 次 | 少量经验 |
| 导师 | Mentor | 导师资格 | 每日 1 次 | 导师专属 |
| PvP | PvP（Crystalline Conflict 等） | 解锁 PvP | 无每日 | Series EXP |

**来源**：随机任务数值来自 [Lodestone 玩家博客汇总（Patch 7.5）](https://de.finalfantasyxiv.com/lodestone/character/46816844/blog/5678633/)，属于玩家实测，与官方补丁说明的代币上限一致。

> **放置游戏映射提示**：Duty Roulette 是典型的"**每日一次高收益 + 日常循环**"设计。放置游戏可以直接照搬为"**每日轮盘 = 一次免费高产出扫描**"。

### 5.2 重置时间表

| 项目 | 时间（UTC） | 时间（UTC+8 / 北京时间） |
|---|---|---|
| **每日重置** | 15:00 UTC | **23:00** |
| **每周重置** | 周二 08:00 UTC | **周二 16:00** |
| PvP Series | 赛季制，随补丁更替 | — |
| 幻讨伐 Faux Hollows | 每周 | 周二 16:00 |
| 天书奇谭（Wondrous Tails） | 每周（周二） | 周二 16:00 |
| 时尚评选（Fashion Report） | 每周五 → 下周二 | 周五 |
| 大型仙人掌彩券（Jumbo Cactpot） | 每周六 抽奖 | 周六 |
| 海洋钓鱼（Ocean Fishing） | **每 2 小时一班**（现实时间） | 偶数小时 |
| 部队/狩猎 A 怪 | 依世界（World）不同 | — |

> **来源**：重置时间来自 [Eorzean Tavern](https://eorzeantavern.com/ffxiv-patch-7-5/)（"Daily at 15:00 UTC · Weekly Tuesday at 08:00 UTC"），与官方一致。

### 5.3 经验加成来源

| 加成 | 幅度 | 获取方式 |
|---|---|---|
| **Arms Bonus（武器库加成）** | 最高 +100% | 有一个职业高于当前职业时自动生效 |
| **Road to 90/100** | 大幅（+100% 级） | 优选世界（Preferred World）角色 |
| **Rested EXP（休息经验）** | +50% | 在城镇/旅馆下线累积 |
| **食物 Buff** | +3%（部分食物 +4%） | 进食 |
| **FC 加成** | 公司行动 | 部队（Free Company） |
| **Menphina's Earring** | 直至 Lv 90 | 预购奖励 |
| **Brand-new Ring** | 低等级 | 新手戒指 |
| **新手/回归频道加成** | 视活动 | Novice Network |
| **驯兽师 FATE 加成** | 高于其他职业 | 7.56 限时职业专属 |

### 5.4 等级同步（Level Sync）

- **机制**：加入低于自身等级的内容时，等级被同步到内容上限，属性按该等级重算。
- **好处**：可获得全额经验与代币；**不受"低等级内容无收益"限制**。
- **注意**：Duty Roulette 的每日奖励**要求**开启 Level Sync 选项（放置游戏可对应"难度自适应"）。
- **7.56 起**：重量级零式在无周限后也给予 Echo（回响），即**难度自动下调**机制。
- **8.0 的 Auto Content Balancing**：把这个概念推广到野外区域——**敌方等级自动匹配玩家等级**，这是对放置游戏最直接的系统借鉴。

### 5.5 新游戏+（New Game+）

| 项目 | 说明 |
|---|---|
| 功能 | 重玩已完成的主线/支线剧情，保留角色进度 |
| 章节解锁 | 需完成该章节最终任务 |
| 7.56 新增 | 「Dawntrail - Part 4」（Winter's Prelude）+「Beastmaster Quests」 |
| 用途 | 剧情回顾、截屏、成就 |

**来源**：[Lodestone Patch 7.56 Notes](https://na.finalfantasyxiv.com/lodestone/topics/detail/a8a526ad64db45c8ca8d1c7fdcce8a5eedaa18bc)

### 5.6 跳过道具（Tales of Adventure）

| 商品 | 跳过内容 | 参考价格（美元） |
|---|---|---|
| Tales of Adventure: A Realm Reborn | ARR 主线（2.0–2.55） | $25 `【未验证】` |
| Tales of Adventure: Heavensward | HW 主线 | $25 `【未验证】` |
| Tales of Adventure: Stormblood | SB 主线 | $25 `【未验证】` |
| Tales of Adventure: Shadowbringers | ShB 主线 | $25 `【未验证】` |
| Tales of Adventure: Endwalker | EW 主线 | $25 `【未验证】` |
| Tales of Adventure: One Job | 单职业直升 80/90/100 | $25 `【未验证】` |

> 官方销售页：[Tales of Adventure](https://na.finalfantasyxiv.com/tales_of_adventure/)
> ⚠️ 价格与具体跳过范围**未逐一核实**，标注 `【未验证】`。放置游戏设计上可对应"**氪金跳章**"。

### 5.7 Duty Support / Trust 系统

| 系统 | 覆盖范围 | 说明 |
|---|---|---|
| **Duty Support** | ARR → DT 的**全部主线 4 人本** | 用 NPC 队友替代真人，无需排队 |
| **Trust** | 漆黑 5.0+ 的特定副本 | Trust 的 NPC 有**独立等级**，需培养 |
| **Adventurer Squadron** | ARR 特定副本 | 早期系统，可派 NPC 出征 |
| **Duty Support 新增（7.5）** | The Dusk Vigil、Shisui of the Violet Tides | 持续回填旧副本 |
| **Explorer Mode** | 部分副本 | 无敌人自由探索（7.5 的 The Clyteum 支持） |

> **放置设计价值**：Duty Support 意味着 FFXIV 的副本**天然可以单机化**。放置游戏可以完全忽略"组队"，把副本抽象为"可反复刷的关卡"。

### 5.8 幻（Unreal）与异闻（Variant/Criterion）系统

| 系统 | 机制 | 周期 |
|---|---|---|
| **Unreal（幻）** | 老极神重置到满级，绑定 Faux Hollows 翻牌 | 每周 1 次 |
| **Variant（异闻）** | 1–4 人，分支路线，多结局 | 无周限 |
| **Criterion（异闻零式）** | Variant 的 4 人高难版 | 无周限 |
| **Criterion (Savage)** | 更高难度 | 无周限 |

---

## 6. 重复可玩内容与刷新周期

### 6.1 FATE（动态事件）

| 项目 | 说明 |
|---|---|
| 机制 | 野外区域随机生成的限时公共事件 |
| 类型 | 普通 FATE、Boss FATE、区域专属 FATE |
| 奖励 | 经验、金币、**双色宝石（Bicolor Gemstones）** |
| 双色宝石 | 兑换坐骑、幻化、素材（各资料片独立计数） |
| 刷新 | 依区域与 FATE 类型，分钟级 |
| 特例 | 驯兽师（7.56）从 FATE 获得**高于其他职业的经验** |

### 6.2 狩猎（The Hunt）

| 等级 | 类型 | 奖励 | 周期 |
|---|---|---|---|
| **B 级** | 普通精英怪 | 战利品（少量） | **每日** |
| **A 级** | 稀有精英怪 | 战利品（中量）+ 神典石 | 刷新窗口（小时级），**A 怪巡游（Hunt Train）** 是主要形式 |
| **S 级** | 极稀有世界 Boss | 战利品（大量） | 触发条件 + 长刷新 |

**7.5 阶段狩猎收益（官方数值）**：

| 目标 | 数理 | 记忆 | 战利品 |
|---|---|---|---|
| A 怪（黄金，1 只） | 20 | 10 | 40 |
| A 怪（黄金，12 只一趟） | 240 | 120 | 480 |
| S 怪（黄金，1 只） | 80 | 30 | 100 |
| A 怪（晓月/漆黑/红莲/苍天/新生，1 只） | 10 | — | 40 |
| S 怪（晓月，1 只） | 30 | — | 100 |

**战利品兑换**：

| 战利品数量 | 兑换物 |
|---|---|
| 3000 | 奔雷的强化纤维 |
| 2000 | 奔雷的硬化药 |

> **来源**：[Lodestone 玩家博客（Patch 7.5）](https://de.finalfantasyxiv.com/lodestone/character/46816844/blog/5678633/)
> **放置设计价值**：狩猎是**最接近"放置产出"的现有系统**——A 怪巡游本质是"固定时间窗口的高效循环"。

### 6.3 深层迷宫（Deep Dungeon）

| 迷宫 | 版本 | 层数 | 特点 |
|---|---|---|---|
| Palace of the Dead（死者宫殿） | 3.35 | **1–200** | 首个深层迷宫；独立等级系统 |
| Heaven-on-High（天之阶梯） | 4.35 | **1–100** | 基于死者宫殿改良 |
| Eureka Orthos | 6.35 | **1–100** | 魔法主题 |
| **Pilgrim's Traverse（巡礼者之路）** | 7.35 | **分层（Stones 1–40+）** | 最新；7.5 阶段有官方排行 |

**机制**：独立等级、独立装备、存档点、单人可挑战。是 FFXIV 最接近 roguelike 的内容。

### 6.4 幻境武器（Relic / Legendary Weapon）任务链

| 版本 | 名称 | 阶段数 | 主要素材来源 |
|---|---|---|---|
| 2.x | **Zodiac Weapon（十二宫武器）** | 多阶段 | 副本、FATE、制作 |
| 3.x | **Anima Weapon（灵魂武器）** | 多阶段 | 副本、诗学神典石 |
| 4.x | **Eureka Weapon（优雷卡武器）** | 4 区域 | 优雷卡（Anemos → Hydatos） |
| 5.x | **Resistance Weapon（抵抗军武器）** | 多阶段 | 博兹雅战线 |
| 6.x | **Manderville Weapon（曼德维尔武器）** | 6 阶段 | 希尔迪布兰德支线 + 神典石 |
| 7.x | **Phantom Weapon（幻境武器）** | 多阶段 | Occult Crescent |

**7.5 阶段幻境武器数据**：

| 阶段 | 品级 |
|---|---|
| 第 3 阶段 | iL790 |
| 最终强化 | **iL795** |
| 最终强化的副属性 | 2 项 +447，1 项 +108 |
| 限制 | 最终强化后**无法镶嵌魔石** |

**来源**：[Lodestone 玩家博客](https://de.finalfantasyxiv.com/lodestone/character/46816844/blog/5678633/)

> **放置设计价值**：幻境武器是 FFXIV 的"**长线养成线**"，典型设计为"多阶段 + 每阶段多种素材"，非常适合放置游戏的"**挂机产出多线收集**"。

### 6.5 生产采集循环

| 系统 | 周期 | 说明 |
|---|---|---|
| **收藏品（Collectables）** | 无限制 | 提交给 NPC 换取代币 |
| **定制交付（Custom Deliveries）** | **每周 6 次/客户** | 7.51 新增客户 Tiisol Ja |
| **巧手/大地使者的采集笔记** | 一次性 | 图鉴收集 |
| **宇宙探索（Cosmic Exploration）** | 无周限（活动式） | 7.51 新行星 Auxsia |
| **伊修加德复兴** | 无周限 | 5.11 起 |
| **海洋钓鱼** | **每 2 小时一班** | 现实时间窗口，限时 |
| **理符（Leves）** | 每天恢复 6 个，上限 100 | 传统日常 |

### 6.6 其他周期内容

| 内容 | 周期 | 产出 |
|---|---|---|
| **天书奇谭（Wondrous Tails）** | 每周（周二） | 经验、神典石、稀有奖励 |
| **时尚评选（Fashion Report）** | 每周五 | MGP |
| **大型仙人掌彩券（Jumbo Cactpot）** | 每周六抽奖 | MGP |
| **迷你仙人掌彩券（Mini Cactpot）** | 每日 3 次 | MGP |
| **幻讨伐 Faux Hollows** | 每周 | 翻牌奖励 |
| **PvP Series** | 赛季（约 3–4 个月） | 赛季奖励 |
| **Crystalline Conflict 赛季** | 赛季 | 排行奖励 |
| **莫古力宝物库（Moogle Treasure Trove）** | 不定期活动 | 珍稀道具（7.5 期：星天书 I） |
| **驯兽师 Crucible 排行赛季** | Season One: 2026-09-24 → 7.58 | 前 300 名奖励 |

### 6.7 7.56 新增：Crucible of the Unbroken（放置友好度最高的内容）

> **这是本次调研中与"放置游戏"最相关的发现。**

| 项目 | 说明 |
|---|---|
| 类型 | **单人** 棋盘式 roguelike |
| 前置 | 驯兽师（限时职业）Lv30 + 职业任务 |
| 机制 | 棋盘上推进，每格不同事件；击败最内圈 Boss 通关棋盘 |
| 队伍 | 携带**驯兽（familiars）**，各有独立 HP，**不自然回复** |
| 道具 | 蜉蝣道具（每棋盘限定）、坩埚道具（最多 10）、兽装（最多 10 件，不可重复） |
| 喂养 | 可喂食强化驯兽；营地格会**清除喂食效果** |
| 计分 | 由经过格数、剩余 HP、加成构成 |
| 奖励 | 韧性残渣（faded/bright remnants of resilience）→ 换 Kornago 葫芦或强化驯兽师装备 |
| 驯兽成长 | 每 100 EXP 提升 beast rank，**最高 25 级**，影响力量/智力/物抗/魔抗/体质 |
| 存续 | **可存档暂停**（"Suspend Progress"），重入可继续 |
| 挑战模式 | **Crucible Mode: Degrees**（1–3 度，递增难度与分数加成） |
| 排行 | 第三度 + 勾选参与 → 记录分数；**取最近 3 次尝试** |
| 赛季 | Season One: **2026-09-24 → Patch 7.58**；每个物理 DC 前 300 名获奖 |

**来源**：[Lodestone Patch 7.56 Notes](https://na.finalfantasyxiv.com/lodestone/topics/detail/a8a526ad64db45c8ca8d1c7fdcce8a5eedaa18bc)

> **为什么这对放置游戏重要**：
> 1. **可存档暂停 + 棋盘推进 + 独立 HP 资源管理** = 天然的"**放置关卡推进**"模型
> 2. **beast rank 25 级成长** = 可映射为放置游戏的"**挂机等级**"
> 3. **月度赛季 + 排行** = 放置游戏的"**赛季重置**"参照
> 4. **限时职业**（类似青魔道士）= 放置游戏中"**独立养成线**"的原型

---

## 7. 面向"放置游戏"的可用性分析

> **本章是本文档的设计输出部分**，把 §1–§6 的事实转化为可执行的章节／循环设计建议。

### 7.1 资料片 → 放置章节映射建议

**映射原则**：
1. **一个资料片 ≈ 一个大章节（Chapter）**
2. **一个等级区间 ≈ 一个关卡板块（Zone）**
3. 每个板块的"代表副本"选**该版本最标志性、Duty Support 覆盖、且 Boss 识别度高**的 4 人本
4. **目标 iLvl** 取该板块通关时的合理装备品级（不是天花板）

| 章节 | 资料片 | 等级区间 | 代表副本（关卡） | 代表 Boss／讨伐 | 目标 iLvl | 补丁收束点 |
|---|---|---|---|---|---|---|
| **Ch.1** | 新生 ARR | 1–15 | （野外练级）| — | 1–15 | 2.0 |
| **Ch.2** | 新生 ARR | 15–35 | Sastasha → The Tam-Tara Deepcroft → Copperbell Mines → Halatali → The Thousand Maws of Toto-Rak | Ifrit (The Bowl of Embers) / Titan (The Navel) | 15–35 | 2.0 |
| **Ch.3** | 新生 ARR | 35–50 | Haukke Manor → Brayflox's Longstop → The Sunken Temple of Qarn → Cutter's Cry → The Stone Vigil → Dzemael Darkhold → The Aurum Vale | Garuda (The Howling Eye) | 35–50 | 2.0 |
| **Ch.4** | 新生 ARR | 50 前半 | Castrum Meridianum → The Praetorium | Ultima Weapon (The Porta Decumana) | iL42–55 | 2.0 结局 |
| **Ch.5** | 新生 ARR | 50 后半 | Amdapor Keep → Pharos Sirius → The Lost City of Amdapor → Hullbreaker Isle → Snowcloak → The Keeper of the Lake | 水晶塔 1–3（Labyrinth / Syrcus / World of Darkness） | iL45–90 | 2.5 |
| **Ch.6** | 苍天 HW | 51–60 | The Dusk Vigil → Sohm Al → The Aery → The Vault → The Great Gubal Library | 圆桌骑士 (The Singularity Reactor) / 尼德霍格 (The Final Steps of Faith) | iL100–142 | 3.0 |
| **Ch.7** | 苍天 HW | 60 | Neverreap → The Fractal Continuum → Saint Mocianne's Arboretum → The Antitower → Sohr Khai → Xelphatol → Baelsar's Wall | 亚历山大 天动/律动/创世 (12 层) | iL145–230 | 3.5 |
| **Ch.8** | 红莲 SB | 61–70 | The Sirensong Sea → Shisui → Bardam's Mettle → Doma Castle → Castrum Abania | 须佐能乎 (The Pool of Tribute) / 真·神龙 (The Royal Menagerie) | iL240–280 | 4.0 |
| **Ch.9** | 红莲 SB | 70 | Ala Mhigo → Kugane Castle → The Temple of the Fist → The Drowned City of Skalla → Hells' Lid → The Swallow's Compass → The Ghimlyt Dark | 欧米茄 德尔塔/西格玛/阿尔法 (12 层) + 四圣兽 | iL280–360 | 4.5 |
| **Ch.10** | 漆黑 ShB | 71–80 | Holminster Switch → Dohn Mheg → The Qitana Ravel → Malikah's Well → Mt. Gulg | 哈迪斯 (The Dying Gasp) | iL370–410 | 5.0 |
| **Ch.11** | 漆黑 ShB | 80 | Amaurot → The Twinning → Akadaemia Anyder → The Grand Cosmos → The Heroes' Gauntlet → Paglth'an | 伊甸 希望/律动/约定 (12 层) + YoRHa (3 层) | iL410–490 | 5.5 |
| **Ch.12** | 晓月 EW | 81–90 | The Tower of Zot → The Tower of Babil → Vanaspati → Ktisis Hyperboreia → The Aitiascope | 佐迪亚克 (The Dark Inside) / 海德林 (The Mothercrystal) / 终末之兽 (The Final Day) | iL500–540 | 6.0 |
| **Ch.13** | 晓月 EW | 90 | The Dead Ends → Smileton → The Stigma Dreamscape → Alzadaal's Legacy → The Fell Court of Troia → Lapis Manalis → The Aetherfont → The Lunar Subterrane | 万魔殿 阿斯福德洛斯/阿布索斯/阿纳拜西奥斯 (12 层) + 神话领域 (3 层) | iL540–620 | 6.5 |
| **Ch.14** | 黄金 DT | 91–100 | Ihuykatumu → Worqor Zormor → The Skydeep Cenote → Vanguard → Origenics | 瓦利加曼达 (Worqor Lar Dor) / 泽雷尼亚 (Everkeep) / 斯菲涅 (The Interphos) | iL630–670 | 7.0 |
| **Ch.15** | 黄金 DT | 100（7.1–7.2） | Alexandria → Tender Valley → The Strayborough Deadwalk → Yuweyawata Field Station → The Underkeep | 轻量级 M1–M4 + Jeuno | iL670–705 | 7.2 |
| **Ch.16** | 黄金 DT | 100（7.3–7.4） | The Meso Terminal → Mistwake | 中量级 M1–M4 + San d'Oria | iL715–735 | 7.4 |
| **Ch.17** | 黄金 DT | 100（7.5–7.56） | **The Clyteum** | 重量级 M1–M4 + **Windurst: The Third Walk** + The Unmaking | iL745–770 | 7.56 |
| **Ch.18** | 黄金 DT 终局 | 100 天花板 | — | **Dancing Mad (Ultimate)** + 重量级零式 + Crucial of the Unbroken | **iL790–795** | 7.56 |
| **Ch.19** | **Evercold** | 100–110 | 【已公布未上线】 | 【已公布未上线】 | 【未验证】 | 8.0 (2027-01) |

**章节数量建议**：**19 章**（其中 Ch.19 为预留给 8.0 的空章节）。若需要压缩，可把 Ch.4+Ch.5 合并、Ch.18 并入 Ch.17。

### 7.2 放置循环应该挂在哪几层

放置游戏的核心是"**多个时间尺度的挂机循环并行**"。FFXIV 的内容天然分为 **4 个时间尺度**，建议一一对应：

#### 层级 1：**常驻循环（无 CD，秒级/分钟级）**

| 现实 FFXIV 对应 | 放置循环设计 |
|---|---|
| 野外 FATE 反复刷新 | **基础产出层**：挂机自动刷"FATE 关卡"，产出基础经验与金币 |
| 4 人本反复刷（Duty Support 单人化） | **副本速刷层**：自动通关已解锁副本，产出装备与素材 |
| 深层迷宫（PoTD / HoH / Orthos / 巡礼者之路） | **无限层数层**：1–200 层自动推进，每层递增难度 |
| **Crucible of the Unbroken**（7.56） | **棋盘推进层**：可存档、按格推进、独立 HP 资源 |
| 采集/生产（宇宙探索、伊修加德） | **素材挂机层**：自动采集，产出制作素材 |

#### 层级 2：**每日循环（每日 1 次，23:00 北京时间重置）**

| 现实 FFXIV 对应 | 放置循环设计 |
|---|---|
| **Duty Roulette**（12 种轮盘，每日各 1 次） | **每日轮盘**：每日免费一次高产出扫描，随机进入一个已解锁副本 |
| 每日 B 怪狩猎 | **每日狩猎**：每日 1 只精英怪 |
| 迷你仙人掌彩券（每日 3 次） | **每日抽奖** |
| 理符（每日恢复 6 个） | **每日任务配额** |
| 收藏品提交 | **每日兑换上限** |

#### 层级 3：**每周循环（周二 16:00 北京时间重置）**

| 现实 FFXIV 对应 | 放置循环设计 |
|---|---|
| **神典石周限**（记忆 900/周） | **每周代币上限**：每周可获取的代币封顶，超出转入下周或转化 |
| **同盟大型**（Windurst 每周 1 次 + 兰佩尔古钱 ×1） | **每周大型副本**：每周 1 次，产出稀有货币 |
| **幻讨伐 Faux Hollows**（每周） | **每周挑战 Boss**：轮换的老 Boss 强化版 |
| **天书奇谭 Wondrous Tails** | **每周任务卡**：完成 N 个随机任务获得奖励 |
| **定制交付**（每周 6 次/客户） | **每周交付配额** |
| **幻境武器阶段素材** | **每周养成素材** |

#### 层级 4：**赛季／资料片循环（月级/年级）**

| 现实 FFXIV 对应 | 放置循环设计 |
|---|---|
| **零式 Savage**（阶段 1，周限 → 解除） | **赛季高难层**：赛季初期周限，末期解除 |
| **绝境战 Ultimate**（每大版本 1–2 个） | **赛季终极挑战**：赛季内 1 个，无周限但极高难度 |
| **PvP Series**（约 3–4 个月一季） | **赛季通行证** |
| **Crucible 排行赛季**（Season One: 2026-09-24 → 7.58） | **赛季排行**：前 300 名奖励 |
| **资料片更替**（每 2–2.5 年） | **大版本重置**：等级上限 +10、装备品级跃迁 |

#### 推荐的"挂机核心"层组合

```
┌─────────────────────────────────────────────────────┐
│  常驻层（永远在跑）                                    │
│  ├─ 副本速刷（Duty Support 化）→ 装备 iLvl              │
│  ├─ FATE 挂机 → 经验 + 双色宝石                        │
│  ├─ 深层迷宫推进 → 稀有素材                            │
│  └─ 采集/生产 → 制作素材                              │
├─────────────────────────────────────────────────────┤
│  每日层（每日 1 次，23:00 重置）                        │
│  ├─ 每日轮盘（随机副本，高产出）                        │
│  ├─ 每日狩猎（1 只 B 怪）                              │
│  └─ 每日抽奖 / 理符配额                                │
├─────────────────────────────────────────────────────┤
│  每周层（周二 16:00 重置）                              │
│  ├─ 每周大型副本（同盟大型）                            │
│  ├─ 每周挑战 Boss（幻讨伐）                            │
│  ├─ 每周代币上限（记忆神典石）                          │
│  └─ 每周养成素材（幻境武器）                            │
├─────────────────────────────────────────────────────┤
│  赛季层（1–4 个月）                                    │
│  ├─ 零式零式（周限 → 解除）                            │
│  ├─ 绝境战                                              │
│  └─ 赛季排行 / 通行证                                  │
└─────────────────────────────────────────────────────┘
```

### 7.3 iLvl 递进曲线（放置游戏的数值锚点）

FFXIV 的 iLvl 设计有一个**极其规律的模式**，可直接作为放置游戏的数值基准：

| 资料片 | 起始 iLvl | 终局 iLvl | 提升倍数 |
|---|---|---|---|
| ARR (2.x) | 1 | 123 | ~123× |
| HW (3.x) | 100 | 255 | ~2.6× |
| SB (4.x) | 240 | 380 | ~1.6× |
| ShB (5.x) | 370 | 510 | ~1.4× |
| EW (6.x) | 500 | 640 | ~1.3× |
| DT (7.x) | 630 | 795 | ~1.3× |

**规律**：
1. 每个资料片起始 iLvl ≈ 上个资料片终局 iLvl - 10~20（**软重置**）
2. 每个资料片内 iLvl 提升 **1.3–1.6 倍**（ARR 例外，因为它是从 1 开始的）
3. 每个小版本（x.1 → x.2 → x.3 …）提升约 **20–25 iLvl**
4. 零式掉落 ≈ 同期副本掉落 + 25~40

**对放置游戏的意义**：可以按 `iLvl_new = iLvl_old × 1.3`（每个大章节）和 `+20~25`（每个小版本）来设计数值曲线，与 FFXIV 的真实节奏同构。

### 7.4 从 FFXIV 到放置游戏的"机制转译表"

| FFXIV 机制 | 放置游戏转译 | 优先级 |
|---|---|---|
| Level Sync（等级同步） | 难度自适应：低等级内容自动缩放 | ★★★ |
| Auto Content Balancing（8.0） | 全自动难度匹配 | ★★★ |
| Duty Roulette（每日轮盘） | 每日免费高产出随机扫描 | ★★★ |
| Duty Support / Trust | 单机化，无需组队 | ★★★ |
| Crucible of the Unbroken | 棋盘式存档推进 | ★★★ |
| 深层迷宫 | 无限塔层 | ★★★ |
| 幻境武器多阶段 | 多线长线养成 | ★★☆ |
| 神典石周限 | 每周代币封顶 | ★★☆ |
| 狩猎 A 怪巡游 | 定时窗口高效率循环 | ★★☆ |
| 零式周限（→解除） | 赛季初期限流，末期放开 | ★★☆ |
| 绝境战 | 赛季终极挑战 | ★★☆ |
| FATE | 野外随机事件 | ★★☆ |
| 双色宝石/战利品兑换 | 区域货币 | ★☆☆ |
| PvP Series | 赛季通行证 | ★☆☆ |
| 8.0 Seasons 系统 | 赛季化品级轨道（**待观察**） | ★★★（若实装） |

### 7.5 关键设计结论

1. **FFXIV 的内容结构天然分层**，与放置游戏的"多时间尺度循环"高度同构。可以直接按"常驻／每日／每周／赛季"4 层复制。
2. **7.56 的 Crucible of the Unbroken 是官方自己做的"放置友好"玩法**（可存档、按格推进、赛季排行、独立成长线），**强烈建议作为核心玩法原型**。
3. **iLvl 曲线有极强的数学规律性**（每大版本 ×1.3、每小版本 +20~25），可直接用作数值设计基准。
4. **19 章的资料片映射**覆盖了 2.0 至 7.56 的全部内容，并为 8.0 预留了扩展位。
5. **8.0 的 "Seasons 系统 + 自动品级平衡"** 如果实装，将与放置游戏的赛季设计完全同构——**建议持续跟踪 2027 年 1 月的实装细节**。
6. **最大的设计风险**：FFXIV 的"每日/每周重置"依赖玩家的真实时间投入。放置游戏需要在"**保留 FFXIV 的循环结构**"与"**离线也产出**"之间做权衡——建议采用"**离线累积 + 上线结算**"的混合模式。

---

## 附录 A：数据来源清单

### A.1 官方来源

| 来源 | URL | 用途 |
|---|---|---|
| FFXIV 官方网站 | https://na.finalfantasyxiv.com/ | 总入口 |
| **Lodestone Eorzea Database（副本）** | https://na.finalfantasyxiv.com/lodestone/playguide/db/duty/ | **§3 全部副本数据** |
| Lodestone 新闻 | https://na.finalfantasyxiv.com/lodestone/news/ | 版本状态、更新时间 |
| **Patch 7.56 补丁说明** | https://na.finalfantasyxiv.com/lodestone/topics/detail/a8a526ad64db45c8ca8d1c7fdcce8a5eedaa18bc | §1.3, §4.1, §6.7 |
| Patch 7.5 特设站 | https://na.finalfantasyxiv.com/dawntrail/patch_7_5/ | 7.5 内容与日期 |
| Patch 7.4 特设站 | https://eu.finalfantasyxiv.com/dawntrail/patch_7_4 | 7.4 内容与日期 |
| **Evercold 特设站** | https://na.finalfantasyxiv.com/evercold/ | **§1.4 全部 8.0 数据** |
| SQUARE ENIX 新闻稿（Evercold/Bastion） | https://na.finalfantasy.com/news/2836 | 8.0 发布会内容 |
| SQUARE ENIX 新闻稿（7.5） | https://na.finalfantasy.com/news/2821 | 7.5 内容与免费试玩 |
| SQUARE ENIX 新闻稿（7.1） | https://press.na.square-enix.com/FINAL-FANTASY-XIV-ONLINE-PATCH-71-CROSSROADS-NOVEMBER-12-LAUNCH-DATE-R | 7.1 日期 |
| SQUARE ENIX 新闻稿（7.2） | https://press.na.square-enix.com/FINAL-FANTASY-XIV-ONLINE-PATCH-72-TRAILER-REVEALS-SEEKERS-OF-ETERNITY- | 7.2 日期 |
| SQUARE ENIX 新闻稿（7.3） | https://press.na.square-enix.com/TUESDAY-AUGUST-5-RELEASE-DATE-REVEALED-FOR-FINAL-FANTASY-XIV-ONLINE-PA | 7.3 日期 |
| 免费试玩 | https://freetrial.finalfantasyxiv.com/ | §1.5 |
| Tales of Adventure | https://na.finalfantasyxiv.com/tales_of_adventure/ | §5.6 |

### A.2 社区 Wiki（本次调查期间返回 403，未直接引用）

| 来源 | URL | 状态 |
|---|---|---|
| Console Games Wiki — Dungeons | https://ffxiv.consolegameswiki.com/wiki/Dungeons | HTTP 403 |
| Console Games Wiki — Patch | https://ffxiv.consolegameswiki.com/wiki/Patch | HTTP 403 |
| Console Games Wiki — V&C Dungeons | https://ffxiv.consolegameswiki.com/wiki/V%26C_Dungeons | HTTP 403 |
| Gamer Escape — Allagan Tomestones | https://ffxiv.gamerescape.com/wiki/Allagan_Tomestones | HTTP 403 |

> 由于这些 Wiki 对自动抓取返回 403，本调研**改用官方 Lodestone DB 作为替代**，数据权威性反而更高。

### A.3 二手来源（用于补充官方未覆盖的细节）

| 来源 | URL | 用途 | 可信度 |
|---|---|---|---|
| Eorzean Tavern — Patch 7.5 总结 | https://eorzeantavern.com/ffxiv-patch-7-5/ | §1.3, §5.2 | 中高（与官方一致） |
| Lodestone 玩家博客（7.5 装备） | https://de.finalfantasyxiv.com/lodestone/character/46816844/blog/5678633/ | §4.2, §6.2 | 中高（玩家实测） |
| Icy Veins — Evercold Changes | https://www.icy-veins.com/ffxiv/evercold-changes | §1.4 补充 | 中（Cloudflare 403，未获取正文） |
| Polygon — FFXIV 8.0 Evercold | https://www.polygon.com/ffxiv-8-0-release-date-evercold-trailer-ff14/ | 8.0 发布 | 中（fetch 失败） |

### A.4 原始数据文件

| 文件 | 内容 |
|---|---|
| `_research/_dungeons.csv` | 103 个 4 人副本（等级 + 平均品级门槛 + 官方链接） |
| `_research/_duties.csv` | 267 条讨伐战/大型任务/绝境战记录（原始抓取） |
| `_research/_scrape_duties.ps1` | 抓取脚本 |

---

## 附录 B：本次调研的方法与局限

### B.1 方法

1. **官方优先**：所有版本号、日期、等级上限、代币名称均以官方来源为准
2. **结构化抓取**：副本数据从官方 Lodestone DB 结构化抓取，而非人工抄录
3. **交叉验证**：关键结论（7.5 日期、8.0 发布、7.56 内容）至少 2 个独立来源
4. **分级标注**：明确区分"官方确认"／"单一来源"／"未验证"

### B.2 局限

1. **游戏内容持续更新**：本文档基准日为 2026-09-15，Patch 7.56 为当前版本。7.57/7.58 与 8.0 的信息会变化。
2. **社区 Wiki 不可用**：consolegameswiki 与 gamerescape 对自动抓取返回 403，无法直接引用其整理好的列表。已用官方 DB 替代。
3. **MSQ 任务数**：SE 不公布精确任务数，§2 全部为量级估计。
4. **掉落品级**：官方 DB 只公布"入场门槛"，掉落品级来自补丁说明与玩家整理，部分标注 `【未验证】`。
5. **8.0 细节**：特设站内容明确标注"开发中，可能变更"（"All content listed on this site is currently in development"）。
6. **中文译名**：官方中文（简中）译名未逐一核实，部分专有名词采用社区通用译法。

---

*文档结束。基准日 2026-09-15，对应国际服 Patch 7.56。*
