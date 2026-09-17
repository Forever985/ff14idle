# 《最终幻想14》长尾 / 特殊玩法全量调研：PvP、副本变体、深层迷宫与外围系统

> **文档定位**：本文为「FF14 放置化」项目的副玩法设计参考资料，目标是穷尽盘点 FF14 中所有**非主线、非普通副本**的长期循环系统，并给出可用于放置游戏离线产出 / 挂机副本的映射建议。
>
> **事实基准日**：**2026-09-15（美服/国际服时间）**
> **当前国际服补丁**：**7.56**（2026-09-08 / 09-10 上线；补丁说明最后更新于 2026-09-15 PDT）
> **当前资料片**：Dawntrail（7.0，2024-07-02 上线），7.x 已进入末期
> **下一资料片**：**Evercold**（日文「白銀のワンダラー」），**2027 年 1 月**上线，已公布未上线
>
> **来源可信度标注约定**：
> - `【官】` = Square Enix 一手来源（Lodestone 补丁说明 / 官方 Play Guide / 官方新闻稿 / 官方特设站）
> - `【Wiki】` = 社区 Wiki 或大型攻略站（ffxiv.consolegameswiki.com、Icy Veins、Gamer Escape、RPGFan 等）
> - `【中文二手】` = 中文媒体转载，可能存在翻译讹误，仅作交叉参考
> - `⚠` = 未能用一手来源确认 / 版本敏感 / 与二手来源冲突
>
> **状态标注约定**：`🟢 已上线` / `🔴 已下线` / `🟡 已公布未上线` / `⚪ 历史遗留（仍可玩但不再更新）`

---

## 目录

- [0. 全局速查：状态总表](#0-全局速查状态总表)
- [1. PvP 全貌](#1-pvp-全貌)
- [2. 各 PvP 模式详解](#2-各-pvp-模式详解)
- [3. 深层迷宫（Deep Dungeon）](#3-深层迷宫deep-dungeon)
- [4. 大规模野外战斗内容：尤蕾卡 / 波兹亚 / 奥库尔特·克雷森特](#4-大规模野外战斗内容尤蕾卡--波兹亚--奥库尔特克雷森特)
- [5. 副本变体：Variant 与 Criterion](#5-副本变体variant-与-criterion)
- [6. 其它长尾系统](#6-其它长尾系统)
- [7. 每日 / 每周 / 每版本重置节奏总表](#7-每日--每周--每版本重置节奏总表)
- [8. 7.x → 8.0 内容时间线（含时效性判断）](#8-7x--80-内容时间线含时效性判断)
- [9. 面向「放置游戏」的可用性分析](#9-面向放置游戏的可用性分析)
- [附录 A：来源清单](#附录-a来源清单)
- [附录 B：不确定项与待验证清单](#附录-b不确定项与待验证清单)

---

## 0. 全局速查：状态总表

### 0.1 本文覆盖内容的当前状态一览

| 系统 | 中文名 | 首次上线 | 当前状态 | 当前最高版本内容 | 周期性 |
|---|---|---|---|---|---|
| Crystalline Conflict | 水晶冲突 | 6.1（2022-04） | 🟢 已上线 | 第 21 赛季（7.55 起） | 赛季制（约 1 大版本 1 季） |
| Frontline | 前线 | 2.x（2014） | 🟢 已上线 | 5 张地图，最新 Worqor Chirteh (Triumph) | 每日轮盘 + 每周排行 |
| Rival Wings | 同盟突袭 | 4.15（2018-02） | 🟢 已上线（边缘活跃）⚠ | 2 张地图 | 无 |
| Wolves' Den / Duels | 狼穴 / 决斗 | 2.x / 6.1 | 🟢 已上线 | — | 无 |
| The Feast | 盛宴（4v4 排位） | 3.x | 🔴 已下线 | 由水晶冲突取代（6.1） | — |
| Borderland Ruins (Slaughter) | 边境废墟（杀戮） | 2.x | 🔴 已下线 | 由 (Secure) 取代 | — |
| Palace of the Dead | 死者宫殿 | 3.35（2016） | 🟢 已上线 | 1–200 层 | 无 |
| Heaven-on-High | 天之阶梯 | 4.35（2018） | 🟢 已上线 | 1–100 层 | 无 |
| Eureka Orthos | 尤蕾卡·奥尔托斯 | 6.35（2023） | 🟢 已上线 | 1–100 层 | 无 |
| **Pilgrim's Traverse** | **圣朝巡礼之路**（暂译） | **7.5x（2026）** | 🟢 已上线 | 1–100 `traverse stone` | 无 |
| Eureka | 尤蕾卡 | 4.25（2018） | 🟢 已上线（⚪ 人气衰减） | 4 岛 + 巴尔戴希昂军械库 | 无周限 |
| Bozja / Zadnor | 波兹亚 / 扎德诺 | 5.25（2020）/ 5.45 | 🟢 已上线（⚪ 人气衰减） | 南战线 + 扎德诺 + 3 个大型副本 | 无周限 |
| **Occult Crescent** | **奥库尔特·克雷森特** | **7.2x（South Horn）/ 7.55（North Horn）** | 🟢 已上线 | 南角 + 北角 + 分叉之塔 | 无周限 |
| Cosmic Exploration | 宇宙探索 | 7.21 / 7.25（2025） | 🟢 已上线 | 7.56 仍在修 bug（Oizys mech ops） | 无周限（有阶段目标）⚠ |
| Variant Dungeon | 变体副本 | 6.25（2022） | 🟢 已上线 | 6.x 三部 + **The Merchant's Tale（7.45）** | 无 |
| Variant Dungeon (Advanced) | 变体副本（进阶） | **7.45（2026-03-10）** | 🟢 已上线 | The Merchant's Tale (Advanced) | 无 |
| Criterion Dungeon | 克雷特里翁副本 | 6.25 | 🟢 已上线 | Another Merchant's Tale（7.45）；6.x 三部含 Savage ⚠ | 无 |
| Chaotic Alliance Raid | 混沌同盟讨伐战 | 7.1（2024-11） | 🟢 已上线 | The Cloud of Darkness (Chaotic) | 无 |
| Island Sanctuary | 岛屿庇护所 | 6.2（2022-08） | 🟢 已上线（⚪ 停止扩展） | 等级 1–20 ⚠ | 每日/每周工坊 |
| Blue Mage | 青魔道士 | 4.5（2019-01） | 🟢 已上线 | **Lv1–80**（受限职业） | 每周假面狂欢 / 青魔日志 |
| **Beastmaster** | **驯兽师** | **7.56（2026-09-08）** | 🟢 已上线（受限职业） | **Lv1–50** | Crucible 排行榜赛季 |
| Free Company Submersible | 部队潜水艇 | 4.x | 🟢 已上线 | — | 按真实小时计 | 
| Wondrous Tails | 天书奇谭 | 3.4 | 🟢 已上线 | — | 每周 |
| Challenge Log | 挑战日志 | 2.x | 🟢 已上线 | — | 每周 |
| Unreal Trials | 幻巧战 | 5.3（2020-08） | 🟢 已上线 | 轮换 | 每周奖励 + 大版本轮换 |
| Evercold 新 8 人难度 | — | 2027-01（预定） | 🟡 已公布未上线 | — | — |
| "World Raid" | 世界突袭（内部代号） | 未定（8.x） | 🟡 已公布未上线 | — | — |
| Keybound Brawler | 魔光键影 | 2026-10-28 | 🟡 已公布未上线 | — | — |

### 0.2 最重要的一手事实（先看这五条）

1. **PvP Series 已进入第 12 季**，覆盖 **7.56 → 8.0 上线**；Series 11 的奖励只能在 Series 12 结束前领取。【官】[Lodestone: PvP Series 11 Draws to a Close as Series 12 Begins](https://na.finalfantasyxiv.com/lodestone/topics/detail/2f2c083c28a8ca183d8d7d8ea7bc994f9c7886d5)
2. **第 4 个深层迷宫 `Pilgrim's Traverse` 已经上线**，并在 Lodestone 拥有独立排行页（`deepdungeon4`）。这是 7.x 最深的一条长尾线，也是放置化最直接的素材。【官】[Pilgrim's Traverse Rankings](https://na.finalfantasyxiv.com/lodestone/ranking/deepdungeon4/)
3. **`Occult Crescent` 是 7.x 的「尤蕾卡 / 波兹亚」继任者**，7.55 追加北角（North Horn）、幻影职业、分叉之塔：魔法（48 人 + Extreme 12–48 人）。【官】[Patch 7.55 Notes](https://na.finalfantasyxiv.com/lodestone/topics/detail/99b6bfb8ecac428c7d3bb37dcb84b52f1064320b)
4. **7.56 上线了第二个受限职业「驯兽师」Beastmaster**，并配套独立单人棋盘玩法 **Crucible of the Unbroken（未破之坩埚）**——本质是一个 **roguelike 棋盘 + 分数榜**系统，其设计与放置游戏高度可映射。【官】[Patch 7.56 Notes](https://na.finalfantasyxiv.com/lodestone/topics/detail/a8a526ad64db45c8ca8d1c7fdcce8a5eedaa18bc) / [Beastmaster Job Guide](https://na.finalfantasyxiv.com/jobguide/beastmaster/)
5. **8.0 `Evercold` 已公布（2027-01）**，其中「普通与零式之间新增一档难度」「内部代号 **World Raid** 的野外大型内容」「Chocobo 参战（8.1）」三项对未来长尾设计影响最大。【官】[Evercold 特设站](https://na.finalfantasyxiv.com/evercold/) / 【官】[Square Enix 新闻稿：BASTION 公布](https://press.es.square-enix.com/en-GB/BASTION-REVEALED-AS-FIRST-NEW-JOB-FOR-FINAL-FANTASY-XIV-EVERCOLD)

---

## 1. PvP 全貌

### 1.1 什么是 FF14 的 PvP：一套完全独立的战斗系统

FF14 的 PvP **不是** PvE 的搬运。从 4.0（2017）开始，官方为 PvP 建立了一套**与 PvE 完全平行**的战斗系统，并在 6.1（2022）做了第二次大改（这次大改同时上线了水晶冲突）。核心差异：

| 维度 | PvE | PvP |
|---|---|---|
| 技能 | 各职业 PvE 技能组 | **完全独立的 PvP 技能 / 特性组**（每职业约 10 余个动作，含 1 个 Limit Break） |
| 属性来源 | 装备 item level 决定 | **进入副本即被替换为 PvP 固定属性**（含职业固定 HP 值） |
| 装备影响 | 决定性 | **几乎无影响**（外观仍生效） |
| 普通攻击 | 有 | **无** |
| 格挡 / 招架 | 有 | **无** |
| 暴击 / 直击 | 有 | **无** |
| 咏唱打断 | 受伤可打断 | **受伤无法打断** |
| 角色职责 | 坦克/治疗/近战/远程/法系 | 职责仍存在，但**不强制**（水晶冲突"无职责要求"） |
| 快捷栏 | 一套 | 进入 PvP 自动切换为**独立 PvP 快捷栏** |
| 宏命令 | `/action` | 必须用 `/pvpaction`、`/macroicon ... pvpaction` |

【官】[PvP Rules and Systems](https://na.finalfantasyxiv.com/lodestone/playguide/pvpguide/system/)

### 1.2 PvP 专用属性：职业固定 HP 表

进入 PvP 副本后，所有玩家的属性被替换为固定值。**HP 只与职业有关，与装备完全无关**。这张表对"放置游戏里怎么给 PvP 单位定血线"是直接可用的参考。【官】

| 职业 | PvP HP | 职业 | PvP HP |
|---|---:|---|---:|
| 骑士 Paladin | 64,500 | 战士 Warrior | 66,000 |
| 暗黑骑士 Dark Knight | 64,500 | 绝枪战士 Gunbreaker | 63,000 |
| 白魔法师 White Mage | 55,500 | 学者 Scholar | 54,000 |
| 占星术士 Astrologian | 52,500 | 贤者 Sage | 54,000 |
| 武僧 Monk | 63,000 | 龙骑士 Dragoon | 61,500 |
| 忍者 Ninja | 60,000 | 武士 Samurai | 61,500 |
| 钐镰客 Reaper | 61,500 | 蝰蛇 Viper | 61,500 |
| 吟游诗人 Bard | 55,500 | 机工士 Machinist | 58,500 |
| 舞者 Dancer | 58,500 | 黑魔法师 Black Mage | 52,500 |
| 召唤师 Summoner | 57,000 | 赤魔法师 Red Mage | 58,500 |
| 绘灵法师 Pictomancer | 54,000 | — | — |

**可观察的设计规律**（对放置游戏数值有参考价值）：

- **坦克线 63,000–66,000**（战士最高，绝枪最低）
- **近战 DPS 线 60,000–63,000**
- **远程物理 55,500–58,500**
- **治疗 / 法系 52,500–55,500**（黑魔与占星并列最低 52,500）

这是一个非常干净的"**职责 → 血量档位**"映射，可以直接抽象成放置游戏的 4 档 HP 模板。

### 1.3 PvP 中的通用动作限制

| 动作 | 狼穴码头 | 决斗 | 水晶冲突 | 前线 | 同盟突袭 |
|---|---|---|---|---|---|
| 冲刺 Sprint | ✅ | ❌ | ❌ | ❌ | ❌ |
| 传送 Teleport | ✅ | ❌ | ❌ | ❌ | ❌ |
| 返回 Return | ✅ | ❌ | ❌ | ✅ | ✅ |
| 随机坐骑 | ❌ | ❌ | ❌ | ✅ | ✅ |
| 飞行坐骑 | ❌ | ❌ | ❌ | ✅ | ✅ |
| 坐骑 | ❌ | ❌ | ❌ | ✅ | ✅ |

**关键点**：只有前线与同盟突袭允许骑马（大地图模式），5v5 的小场地图完全禁止。这说明 FF14 的 PvP 是"**两种尺度**"的设计：**战术小地图（5v5/24v24 竞技场）** 与 **战略大地图（72 人三阵营）**。

### 1.4 Limit Break（PvP 版）

- 限度槽通过**战斗**或**满足副本特定条件**积攒
- 槽满后**每名玩家个人**可以释放 Limit Break（**不是全队共享**，这是与 PvE 的根本差异）
- 各职业 LB 效果不同，详见 PvP 职业指南

### 1.5 PvP 解锁条件

| 内容 | 解锁任务 | 等级要求 | 地点 / NPC |
|---|---|---|---|
| PvP（含水晶冲突） | A Pup No Longer | 战斗/魔法职业 Lv30 | 三大军团各自 NPC（黑涡 R'ashaht Rhiki / 双蛇 Vorsaile Heuloix / 恒辉 Swift） |
| 前线 Frontline | Like Civilized Men and Women | Lv30 | 三大军团各自 NPC（Trachraet / Scarlet / Mimio Mio） |
| 同盟突袭 Rival Wings | Earning Your Wings | Lv30 | 狼穴码头 Softknox（X:5.7 Y:5.4） |
| 狼穴决斗 Duels | 见 §2.4 | — | 狼穴码头 |

**等级同步规则（关键）**：PvP **不做等级同步**——而是**属性完全替换**。Lv30 解锁后，无论你多少级、穿什么装备，进场后属性一致。这也是 FF14 PvP 常被形容为"最公平的 PvP"的原因。

**受限职业限制**：青魔道士（Blue Mage）**可以**进入狼穴码头，但**不能**参加 PvP 与决斗；驯兽师（Beastmaster）**完全不能**参加 PvP（含决斗）。【官】[Beastmaster Job Guide](https://na.finalfantasyxiv.com/jobguide/beastmaster/)

### 1.6 PvP Series 与 Series Malmstones（系列与系列魔石）

这是 FF14 PvP 的**核心长期循环**，也是"赛季通行证"式设计。全新实装于 6.1，取代旧有的单纯排位体系。

#### 机制

| 项目 | 说明 |
|---|---|
| Series（系列） | 一个**奖励周期**，长度约为"一个补丁区间到大版本结束" |
| Series EXP | 参加**任意 PvP 副本**即可获得（不要求排位） |
| Series Level | 累积 Series EXP 提升，**上限 30 级**，超过 30 级的部分记为 "extra levels" |
| Series Malmstones | 沿等级路径分布的奖励节点，在 PvP Profile 中查看 |
| 领取期限 | **本系列的奖励必须在下个系列结束前领取**（过期为永久失效） |
| 主要奖励 | 装备套装、坐骑、发型、情感动作、**Trophy Crystals（战利品水晶）** |

【官】[Series Malmstones](https://na.finalfantasyxiv.com/lodestone/playguide/pvpguide/system/#series)

#### 当前 Series 状态（2026-09-15，已用一手来源核实）

| Series | 起止 | 状态 |
|---|---|---|
| **Series 10** | 至 **2026-04-28（Patch 7.5）** | 🔴 已下线（奖励可领至 Series 11 结束） |
| **Series 11** | **2026-04-28（Patch 7.5）→ 2026-09-08（Patch 7.56）** | 🔴 已下线（奖励可领至 **Series 12 结束**） |
| **Series 12** | **2026-09-08（Patch 7.56）→ Patch 8.0 上线（2027-01）** | 🟢 **当前进行中** |

【官】[Patch 7.56 Notes — PvP 段](https://na.finalfantasyxiv.com/lodestone/topics/detail/a8a526ad64db45c8ca8d1c7fdcce8a5eedaa18bc)
【官】[Series 11 Ends / Series 12 Begins](https://na.finalfantasyxiv.com/lodestone/topics/detail/2f2c083c28a8ca183d8d7d8ea7bc994f9c7886d5)
【官】[Series 10 Ends / Series 11 Begins](https://jp.finalfantasyxiv.com/lodestone/topics/detail/3eff5caeb29649bc49281e45cb4f301be2ccfc23)

**Series 12 奖励（已知部分）**：

| 项目 | 内容 | 可信度 |
|---|---|---|
| 结构 | Series 等级 **30 阶**（Malmstones）；累计约需 **108,000** Series EXP | 【媒体·中】⚠ 单一德文来源，Lodestone 公告文本未给出数字 |
| 招牌奖励 | **第 25 阶 → 「火箭飞拳启动钥匙」**，解锁坐骑 **「火箭飞拳 / Rocket Punch」**（原型为 Omega 系战斗中的巨大金属拳机制） | 【媒体·中】⚠ + 中文社区道具名旁证 |
| 其余奖励 | Lodestone 公告仅展示 **4 张奖励图**，未给文字清单 | ⚠ 未能逐项核实 |
| 社区观察 | 因该坐骑而出现 PvP 人数明显涌入；以 **前线第 1 名 1,500 点**估算约需 **72 场胜利 / 约 24 小时** | 【媒体·中】⚠ |

> ⚠ **不确定性**：Series 1–9 的精确起止补丁与日期本文**未逐条核实**。已知规律是"**每个大版本约 3–4 个 Series**"，且 **Series 换代与大版本/末期补丁绑定**（7.5 → Series 11，7.56 → Series 12）。

### 1.7 两种 PvP 代币

| 代币 | 获取 | 兑换 NPC | 用途 |
|---|---|---|---|
| **Wolf Marks（狼印）** | 所有 PvP 副本结算、Series 奖励 | 狼穴码头 Mark Quartermaster（X:4.4 Y:6.0） | PvP 装备、道具 |
| **Trophy Crystals（战利品水晶）** | 主要来自 **Series 奖励** | 狼穴码头 Crystal Quartermaster（X:4.4 Y:6.1） | 特定 PvP 外观、坐骑等 |
| **Collar（项圈）** ⚠ | 不详 | 狼穴码头 Collar Quartermaster（X:4.4 Y:6.2） | ⚠ 该 NPC 存在但用途未在 PvP Guide 正文说明，疑似与"Chocobo 竞赛/宠物"或旧系统相关 |

**重要**：Wolf Marks 与 Trophy Crystals 的区分是设计上的关键——
- Wolf Marks = **可无限刷**的通用货币（数量循环）
- Trophy Crystals = **受 Series 等级限制**的稀缺货币（时间循环）

这正是放置游戏"**双货币 + 赛季通行证**"的标准范式。

### 1.8 PvP Rank 与大军团（Grand Company）绑定

这是一个容易忽略但很关键的机制：

- PvP EXP 累积提升 **PvP Rank（PvP 等级）**
- **PvP Rank、PvP EXP 与 AP 只被"你赚取它们时所属的大军团"承认**
- **转换大军团效忠会导致这些进度从头开始**；回到原军团后恢复
- **各军团授予的称号不同**

【官】[Crystalline Conflict — Rewards](https://na.finalfantasyxiv.com/lodestone/playguide/contentsguide/crystallineconflict/)

对放置游戏的启示：这是"**阵营绑定进度**"设计，可以作为"选择加入某一阵营后进度独立"的机制参考。

---

## 2. 各 PvP 模式详解

### 2.1 水晶冲突 Crystalline Conflict（5v5 推车）

上线于 **6.1（2022-04）**，是当前 FF14 PvP 的**旗舰模式**，取代了旧 4v4 的 The Feast。

#### 2.1.1 基础参数

| 项目 | 数值 |
|---|---|
| 团队规模 | **5 vs 5**（两队名为 **Astra** / **Umbra**） |
| 时间限制 | **5 分钟**（超时进入加时 Overtime） |
| 等级要求 | 战斗/魔法职业 **Lv30** |
| 职责要求 | **无**（自由组合） |
| 开始倒计时 | 30 秒 |
| 战场数量 | **7 张**（轮换） |
| 延迟换场 | 每次被击倒复活延迟 +1 秒（累加）；加时开始 5 分钟后改为 **+3 秒/次** |
| 招募方式 | 排队（1–2 人 casual；单人 ranked）或**自定义比赛** |

【官】[Crystalline Conflict Play Guide](https://na.finalfantasyxiv.com/lodestone/playguide/contentsguide/crystallineconflict/)

#### 2.1.2 胜负规则：战术水晶（Tactical Crystal）

核心目标不是击杀，而是**推车**：

1. 开场水晶位于场地**中心点**，前 **20 秒被束缚**（不可移动）
2. 水晶底座周围有一个**环（ring）**；若环内**只有一方成员**，该方可推动水晶
3. 水晶只能沿专用路径 **crystal line** 移动
4. 当水晶位于"中心点"与"该方进度记录点"之间时，**移动速度提升**（即"推回自己已经推过的距离"更快）
5. **中途检查点（Checkpoint）**：位于中心点与双方终点之间的中点。水晶到达检查点会被暂时卡住，推进方必须留在环内充能 **Clear Progress** 至 100% 才能继续
6. **胜利条件**：
   - 先推到对方终点者胜，或
   - 时间结束时**进度更高**者胜

#### 2.1.3 加时（Overtime）判定表

若时间结束时双方都没推到终点，且**进度较低一方**的成员站在水晶环内，则进入加时。

| 你的队伍进度状态 | 加时获胜条件 |
|---|---|
| 进度**最高** | 把**所有**敌人赶出水晶环，持续 **3 秒** |
| 进度**最低** | 把进度提升到**超过**对方 |
| 双方**相同** | 做出比对方更高的进度 |

若加时结束仍未满足条件：

| 情形 | 结果 |
|---|---|
| 有一方进度更高 | 进度高者胜 |
| 双方进度相同 | **加时开始时**进度高者胜 |
| 加时开始与结束时进度都相同 | **把水晶推得离终点更近**的一方胜 |
| 水晶仍在场地正中 | **平局** |

#### 2.1.4 医疗包（Medicine Kit）

| 道具 | 效果 |
|---|---|
| Medicine Kit | **恢复 30,000 HP** |

- HP 已满 100% 的玩家**不能**拾取
- 每个医疗包**只能被一人**拾取
- 被拾取后经过固定时间会**重新生成**

> 设计要点：30,000 HP 相当于法系职业（52,500）的约 57% 血线，是一个非常"高权重"的场地资源——这类"公共可争夺恢复点"是放置游戏里很好的争夺型机制素材。

#### 2.1.5 七张竞技场与场地机制

| # | 竞技场 | 中文暂译 | 场地机制 |
|---|---|---|---|
| 1 | The Palaistra | 帕莱斯特拉 | **Sprint Zone（冲刺区）**：进入获得 Swift Sprint，大幅提升移速 |
| 2 | The Volcanic Heart | 火山之心 | 冲刺区；**Eruption（喷发）**：周期性喷出**自爆弹**，爆炸半径内受伤；爆炸残留 **Bomb Core（炸弹核心）**，拾取获得「伤害提升（可叠 10 层）+ 限度槽提升」 |
| 3 | Cloud Nine | 九重云 | **Jump Glyph（跳跃符文）**快速位移；**Turbulence（乱流）**把玩家抛上天，落地受伤；空中可拾取**黑陆行鸟羽毛**：① 无伤落地 ② 攻击/移动速度提升 ③ 限度槽提升；未拾羽者可用 **Guard** 免疫；乱流残留**旋风**（伤害+击退，消耗 Guard）与**风球**（大幅加速，单人限用） |
| 4 | The Clockwork Castletown | 发条城 | **Trick Floor（机关地板）**：站久触发 Tatami Twist 抛飞+伤害（消耗 Guard）；**Trick Door（机关门）**：单向随机传送；**Pneumatic Parade（气动游行）**：发条 onmyoji 与发条 yojimbo 沿固定路线攻击中心点/检查点/终点；onmyoji 视线命中者**缩小**（移速降低、伤害降低、受伤增加）；场外酱油大亨 **Kageyama** 撒金币，拾取者限度槽提升 |
| 5 | The Red Sands | 红沙 | **Shifting Sands** 快速位移；**Sandpit（沙坑）**：清检查点时可能钻出 **Red Sands Antlion**（拖入巢穴禁锢后爆发巨伤）/ **Sabotender**（10 万针刺，伤害按范围内人数分摊）/ 稀有 **Accutender**（治疗针刺，给予护盾，按人数分摊）；**Oasis（绿洲）**：持续回血；**Heat Waves（热浪）**：全场持续掉血，需站上**间歇泉**的沙珠护罩回血+限度槽，泉水中心会造成伤害与击退 |
| 6 | The Bayside Battleground | 海湾战场 | **Jump Glyph（跳跃符文）** |
| 7 | **Archeia Harmonias** | 阿卡伊亚·哈莫尼亚斯 | **Aetherometer（以太计）**：卡在水晶路上，需在环内充能至 100%；充能中若推进方全部离环或敌方进环则**归零**；充满后生成 **Aetherial Bridge（以太桥）**（永久）与 **Jump Glyph**（永久）；双方基地前方各有 **Healing Glyph**（本方站上去持续回血） |

**轮换规则**：当前可用竞技场**按现实时间（Earth time）轮换**，同一时间 casual 与 ranked 用同一张图。【官】

> ⚠ **不确定性**：各竞技场的**上线补丁**本文未逐一核实。已知 The Palaistra / The Volcanic Heart / Cloud Nine / The Clockwork Castletown 属 6.1–6.x 早期批次；**Archeia Harmonias** 明显是较新加入（7.x）⚠。

#### 2.1.6 段位体系（Ranked）

FF14 的 CC 排位**不是 ELO 数值**，而是"**段位 + 升星（Rising Stars）**"，到 Crystal 以上才切换为 **Crystal Credit**。

**段位与星数：**

| 段位 | 升星数（Risers） | 说明 |
|---|---|---|
| Bronze | 3 | 最低段位 |
| Silver | 3 | |
| Gold | 4 | |
| Platinum | 4 | |
| Diamond | 5 | 有升星机制的最高段位 |
| **Crystal** | — | 切换为 **Crystal Credit** 计分 |
| **Omega** | — | Credit 达标后晋升 |
| **Ultima** | — | 最高段位 |

**升星规则：**

- 赢一场 **+1 Rising Star**；输一场 **−1**
- 达到该 riser 星数上限后再赢一场 → **升一个 riser**
- 升 riser 时**从 1 星开始**
- 0 星时输 → 掉到上一个 riser，且星数 = 上限 −1
- **Diamond 5 且 0 星时输** → 降级为 **Platinum 1 + 2 星**
- **连胜 3 场** → 触发连胜加成，此后**每胜 +2 星**

**Crystal 及以上：**

- 胜负反映为 **Crystal Credit** 增减，不再用星
- Credit 累积到阈值 → 晋升 Omega / Ultima
- **所需 Credit 每个赛季不同**
- **Credit 的得失取决于两队平均 Credit 差**（即"打高分队赢得多"）
- **连胜加成对 Crystal Credit 无效**
- 0 Credit 时输 → 降级为 **Diamond 1 + 2 星**

**赛季重置：**

- **PvP 段位在每个 PvP Season 之间重置**
- 新赛季起始位置 = 上赛季结束位置 **低 5 个 riser**；Rising Stars 重置为 1
- 上赛季结束于 **Omega / Ultima** 段的玩家，新赛季从 **Crystal + 100 Crystal Credit** 开始
- 上赛季未定级 或 Bronze 3 且 0 星者 → 段位不变

【官】[Crystalline Conflict — Ratings](https://na.finalfantasyxiv.com/lodestone/playguide/contentsguide/crystallineconflict/)
【官】[Patch 7.55 Notes — Crystalline Conflict 段](https://na.finalfantasyxiv.com/lodestone/topics/detail/99b6bfb8ecac428c7d3bb37dcb84b52f1064320b)

**Season 21 细节（7.55 起）：**

- 第 20 赛季结束 → **第 21 赛季开始**（**2026-07-28，随 Patch 7.55**）
- 结算奖励：NA / EU / JP 各物理数据中心**前 300 名**、Oceania（Materia）**前 100 名**获得兑换券（经 Moogle 快递）
- **Bronze 段及以上**均可到狼穴码头 **Seasonal Quartermaster（X:4.9 Y:5.7）**领取赛季奖励
- **Season 20 的段位奖励必须在本赛季（21）结束前领取**
- 第 21 赛季举办的数据中心：

| 物理数据中心 | 逻辑数据中心 |
|---|---|
| Japan | Elemental |
| North America | Primal |
| Europe | Light |
| Oceania | Materia |

**已核实的赛季历史（片段）**：

| 赛季 | 起始补丁 / 日期 | 举办逻辑数据中心 |
|---|---|---|
| Season 18 → 19 | **7.45（2026-03-10）** | JP=Elemental / **NA=Dynamis** / EU=Light / OC=Materia |
| Season 19 → 20 | **7.5（2026-04-28）** ⚠ 推断 | ⚠ 未核实 |
| Season 20 → 21 | **7.55（2026-07-28）** | JP=Elemental / NA=Primal / EU=Light / OC=Materia |

【官】[Patch 7.45 Notes — Crystalline Conflict](https://na.finalfantasyxiv.com/lodestone/topics/detail/534af9c97992897890b8dd90aacabb77c6f51450)
【官】[Crystalline Conflict Season 21 Commences](https://jp.finalfantasyxiv.com/lodestone/topics/detail/d5fe9c6d15ddac65bf132996433934641f24ad2e)

> **重要设计观察**：CC 排位**每个赛季只在 4 个逻辑数据中心中的一个进行**（轮换，且 NA 会在 Primal / Dynamis 等之间切换）。这是 FF14 为了集中 PvP 人口、缩短匹配时间的做法。对放置游戏而言，"**限时集中竞技场**"可以显著提高异步 PvP 匹配密度。

#### 2.1.7 Casual vs Ranked

| 项目 | Casual Match | Ranked Match |
|---|---|---|
| 职责要求 | 无 | 无 |
| 参与人数 | 1–2 人 | 1 人 |
| 影响 Rising Stars & Rank | **否** | **是** |

**弃赛惩罚：**

| 情形 | 惩罚 |
|---|---|
| Casual 弃赛 | Duty Finder 封禁 **30 分钟** |
| Ranked 第 1 次弃赛 | **30 分钟** |
| Ranked 第 2 次 | **90 分钟** |
| Ranked 第 3 次及以后 | **180 分钟** |
| **静止超过 2 分钟** | 自动移出比赛并按弃赛惩罚 |

#### 2.1.8 副本内限制与聊天

**禁止事项**：更换职业、陆行鸟伙伴、坐骑、传送、返回、**道具**、更换装备。

**聊天**：casual / ranked 中**只能使用 Quick Chat**（PvP Profile → Quick Chat 标签，可拖到快捷栏）；可**接收**但**不能发送** FC / LS / CWLS / PvP Team / 新人频道的消息。**自定义比赛**中所有频道开放。

**名字显示**：与其他 PvP 不同，CC 中**角色名按原名显示**（不隐藏）。

#### 2.1.9 自定义比赛（Custom Match）与观战模式

这是一套完整的"**自建赛事**"系统，含**观战（Spectator）**：

| 功能 | 说明 |
|---|---|
| 招募 | 通过 **Party Finder → Custom Match** 标签，可同时招募 Team Astra / Team Umbra / 观战者（观战组非必需） |
| 招募者归属 | 发起招募者**必定分配到 Team Astra** |
| 队长可选开关 | 是否启用**场地事件（Arena Events）**、是否启用**医疗包** |
| 再战（Rematch） | 赛后可选再战，**需全员同意**，最多 **连续 5 场**（观战者不计入投票） |
| 收益 | **不获得** PvP EXP / Series EXP / Wolf Marks，**不影响排名与成就** |
| 观战相机 | **Free Camera**（自由移动）/ **Fixed Camera**（8 个固定机位，F1–F8）/ **Player Camera**（跟随选手，Astra 用 1–5，Umbra 用 6–0） |
| 观战特性 | 观战者看不到自己的角色；**忍者 Hidden 状态下的选手对观战者仍可见** |
| 观战 UI | Minimap（显示固定机位与选手位置）+ Camera Menu（切换相机 / 查看观战者 / 离开） |

> 对放置游戏/赛事系统的启示：**"可自建 + 可观战 + 可再战 5 连"** 是一套轻量赛事方案，可用于"公会内部 PvP 锦标赛"这类社交副玩法。

---

### 2.2 前线 Frontline（72 人三阵营大地图）

前线是 FF14 规模最大的 PvP，也是**唯一一个"三阵营"PvP**。

#### 2.2.1 基础参数

| 项目 | 数值 |
|---|---|
| 团队数 | **3 队**（分别代表三大军团：黑涡团 Maelstrom / 双蛇党 Twin Adder / 恒辉队 Immortal Flames） |
| 每队人数 | 最多 **24 人**（以 **同盟（alliance）** 形式组队） |
| 总人数 | **72 人** |
| 地图 | **5 张** |
| 战场轮换 | **每天**换一张，于 **PST 07:00 / PDT 08:00** 切换 |
| 入口 | Duty Finder → **Daily Challenge: Frontline**（**只能进入当天开放的那一张**） |
| 等级要求 | Lv30（解锁任务见 §1.5） |

【官】[Frontline Play Guide](https://na.finalfantasyxiv.com/lodestone/playguide/contentsguide/frontline/)

> **关键设计点**：前线**不是"选地图"而是"当日地图"**。这是一个非常强的"**每日登录理由**"机制——玩家每天只能玩到一张图，且只有当天那张图有日常轮盘奖励。放置游戏可借鉴为"每日轮换的副本/战场"。

#### 2.2.2 五张战场地图

| # | 地图 | 中文 | 核心目标 | 官方描述 |
|---|---|---|---|---|
| 1 | The Borderland Ruins (**Secure**) | 边境废墟（确保） | **占点**：占领并维持关键地点 + 击杀玩家，累积**战术评分** | "increase their company's tactical rating by occupying and maintaining control of key locations" |
| 2 | Seal Rock (**Seize**) | 封印岩（夺取） | **从 Allagan tomelith（亚拉戈墓碑）中提取数据** + 击杀玩家 | "retrieving data from Allagan tomeliths" |
| 3 | The Fields of Glory (**Shatter**) | 荣耀之野（粉碎） | **从冰封 tomelith** 中提取数据 + 击杀玩家 | "retrieving data from icebound tomeliths" |
| 4 | Onsal Hakair (**Danshig Naadam**) | 翁萨尔·哈凯尔（那达慕） | **占领 ovoo（敖包）** + 击杀玩家 | "claiming ovoos" |
| 5 | **Worqor Chirteh (Triumph)** | 沃尔科尔·奇尔特（凯旋） | **占领 "triumphs"** + 击杀玩家 | "claiming triumphs" |

**注**：第 5 张 **Worqor Chirteh (Triumph)** 是较新加入的地图（7.x 批次）⚠，其机制名词 "triumph" 与 FF14 7.x 图拉尔大陆设定（Worqor 系地名）相关。

#### 2.2.3 前线结算与"第三名补偿"机制（★ 设计亮点）

结算时按**大军团排名**发放：PvP EXP、Wolf Marks、亚拉戈诗学神典石。

**第三名累积补偿（Third-place bonus）**：

| 连续获得第 3 名的次数 | 后续获得的 PvP EXP / Series EXP / Wolf Marks 加成 |
|---|---|
| 1 次 | +10% |
| 2 次 | +20% |
| 3 次 | +30% |
| 4 次 | +40% |
| 5 次 | **+50%（上限）** |
| 中途获得第 2 名 | 加成**保留**并带到下一场 |
| 中途获得第 1 名 | 加成**完全重置** |

- 亚拉戈神典石只发给 **Lv50 及以上**玩家
- **前线排行（Frontline Standings）**：统计总胜场、胜率、场次；好友/FC 成员进入前 100 名时会在你的 Wall 上通知

> **对放置游戏的直接启示**：这是一套**"连败补偿曲线"**（bad-luck protection）——连输会逐步提升收益，赢了才清零。它是 FF14 里最优雅的"防止玩家流失"机制之一，非常适合放进放置游戏的 PvP/公会战模块。

#### 2.2.4 前线与自由战士（Freelancer）

FF14 允许玩家在大军团之外以"**自由战士 Freelancer**"身份参加前线（由系统随机分配到某一军团）。这是为了解决三大军团人口不均导致排队慢的问题。⚠（该选项的官方条目未在 PvP Guide 主页面复述，但长期存在于游戏中）

---

### 2.3 同盟突袭 Rival Wings（24 vs 24 战略战）

| 项目 | 内容 |
|---|---|
| 团队规模 | **24 vs 24**（两队，无第三阵营） |
| 地图 | **2 张**：**Astragalos**、**Hidden Gorge** |
| 解锁任务 | **Earning Your Wings**（Lv30，狼穴码头 Softknox，X:5.7 Y:5.4） |
| 官方定位 | "Strategic 24 vs 24 battles"（战略型 24v24） |
| 当前活跃度 | ⚠ **边缘活跃**——Rival Wings 长期是 FF14 PvP 中最冷门的模式，通常需要"社区组织排位日"才能成局 |

【官】[PvP Guide 索引](https://na.finalfantasyxiv.com/lodestone/playguide/pvpguide/) / [Rival Wings](https://na.finalfantasyxiv.com/lodestone/playguide/contentsguide/rivalwings/)

> ⚠ **不确定性**：两张地图的**具体机制（机甲/巡航陆行鸟/青磷引擎/列车/佣兵等）与单局时长**本文未用一手来源核实，见 §附录 B。已知 Astragalos 与 Hidden Gorge 均以"**驾驶机甲（Mech）/ 操控大型兵器推线**"为核心，属于"**小规模 RTS 化 PvP**"。
>
> 对放置游戏的意义：Rival Wings 是"**24v24 攻城 + 载具系统**"的样本，可映射为放置游戏的"公会攻城/载具生产"玩法。

---

### 2.4 狼穴 Wolves' Den（社交枢纽 + 4v4 + 决斗）

狼穴并不只是一个副本入口，它是 FF14 的 **PvP 中央枢纽区域**。

#### 2.4.1 狼穴码头 Wolves' Den Pier

| 要素 | 内容 |
|---|---|
| 位置 | 拉诺西亚（Lower La Noscea）外海小岛，独立区域 |
| 功能 | PvP 全部兑换 NPC、PvP 任务、训练用木人、Rival Wings 解锁 NPC |
| 关键 NPC | **Mark Quartermaster**（X:4.4 Y:6.0，狼印兑换）<br>**Crystal Quartermaster**（X:4.4 Y:6.1，战利品水晶兑换）<br>**Collar Quartermaster**（X:4.4 Y:6.2）⚠<br>**Softknox**（X:5.7 Y:5.4，Rival Wings 解锁）<br>**Seasonal Quartermaster**（X:4.9 Y:5.7，CC 赛季奖励领取） |
| 通用动作 | 唯一允许 Sprint / Teleport / Return 的 PvP 区域 |
| 坐骑 | ❌ 不可骑乘 |

#### 2.4.2 闭锁任务（Closed Duties）—— 4v4 竞技场

官方 PvP Guide 将狼穴归类为 **"The Wolves' Den Closed Duties — 4 vs 4 arena battles"**。【官】

- 这是 FF14 最古老的 PvP 形式（2.x 时代的"狼穴"），采用**固定 4 人小队**而非随机匹配
- 与水晶冲突（5v5，随机/排位）形成对照：**狼穴 = 老式小队竞技，CC = 现代化排位**
- ⚠ 具体规则、是否仍自动匹配、与"决斗"的边界，本文未用一手来源完全厘清

#### 2.4.3 决斗 Duels（1v1，6.1 实装）

6.1 与水晶冲突同步实装的**1v1 单挑**系统：

- 玩家可向**特定 NPC 对手**发起决斗（在开放世界/特定地点）
- 决斗使用 **PvP 技能与 PvP 属性**
- 决斗中 **Sprint / Teleport / Return 全部不可用**（见 §1.3 表）
- 受限职业限制：**青魔可进狼穴码头，但不能 PvP 或决斗**；**驯兽师完全不能 PvP（含决斗）**

> ⚠ **不确定性**：决斗对手的完整名单与触发条件未在 PvP Guide 主页列出，见 §附录 B。通常被引用的是与"特定知名 NPC"的 1v1（例如与某些剧情角色）。

---

### 2.5 已下线 / 已废弃的 PvP 模式与历史

FF14 的 PvP 经历过至少三次大重构。以下为已下线内容，**必须与在运营内容严格区分**。

| 模式 | 类型 | 状态 | 说明 | 来源 |
|---|---|---|---|---|
| **The Feast** | 4v4 排位竞技 | 🔴 **已下线** | 曾是 FF14 的核心排位 PvP（3.x–6.0）。Lodestone 排行页标题明写 **"All Seasons Concluded"（所有赛季已结束）**，由 6.1 的水晶冲突取代 | 【官】[The Feast Rankings](https://na.finalfantasyxiv.com/lodestone/ranking/thefeast/) |
| **The Borderland Ruins (Slaughter)** | 前线（杀戮模式） | 🔴 **已下线** | 早期的"边境废墟"有两种模式：**Secure（确保）** 与 **Slaughter（杀戮）**。现行版本**只保留 Secure**，Slaughter 已移除 | 【官】[Frontline 子页索引](https://na.finalfantasyxiv.com/lodestone/playguide/pvpguide/system/)（仅列出 /frontline/1 Secure） |
| **The Fold / 旧狼穴 8v8** | 大型竞技场 | 🔴 **已下线** | ⚠ 属于 2.x–3.x 的早期 PvP 内容，具体下线补丁未核实 | ⚠ |
| **旧 PvP 技能体系（1.0–4.0 前）** | 系统层 | 🔴 **已替换** | **4.0（2017）** 引入第一代独立 PvP 战斗系统（含"PvP 技能"与"额外技能"）；**6.1（2022）** 第二次大改，形成现行系统。中间还有 **5.1 / 5.2** 的 PvP 调整期 | 【Wiki】[Dawn Shard 博客：6.1 PvP 技能到 8.0 战斗系统](https://eu.finalfantasyxiv.com/lodestone/character/30639261/blog/5678976/) |

**关键判断**：

> 对"长尾玩法盘点"而言，**PvP 的历史包袱很小**——除 The Feast 外，几乎所有 FF14 PvP 内容都仍可玩。这与 PvE 侧的"旧副本仍可玩、旧系统被删"（如 Ishgard 复兴阶段性结束）形成对比。放置游戏若做 PvP 副玩法，**不需要考虑"老赛季地图"的历史包袱**，只需要考虑"赛季/地图轮换"。

**PvP 三次大改时间轴**：

| 时间 | 版本 | 变化 |
|---|---|---|
| 2014 | 2.x | 狼穴（4v4 固定队）+ 前线（Borderland Ruins）上线 |
| 2017 | 4.0 Stormblood | **第一代独立 PvP 战斗系统**（PvP 专属技能 + 属性同步 + 独立快捷栏） |
| 2018 | 4.15 | **Rival Wings** 上线（Astragalos） |
| 2019–2021 | 5.1 / 5.2 | PvP 平衡与"额外技能"调整期 |
| 2022-04 | **6.1** | **第二次 PvP 大改**：`Crystalline Conflict` 上线（5v5 推车）、**Duels** 上线、**Series / Series Malmstones** 上线、**The Feast 退场** |
| 2026-09 | 7.56 | Series 12 开始；PvP 技能数值持续微调（见 §8） |

---

## 3. 深层迷宫（Deep Dungeon）

深层迷宫是 FF14 中**最适合"放置化/挂机化"的系统原型**：随机生成层、独立等级成长、独立装备强化、可单人挑战、有分数排行榜。

### 3.1 深层迷宫共通机制

| 机制 | 说明 |
|---|---|
| 随机生成 | 每层地图**随机生成**，"architecture is never quite the same each time" |
| **独立等级** | 进入后从**固定起始等级**开始，靠击败迷宫内敌人升级，**与外界等级无关** |
| 独立装备 | 只能使用 **aetherpool（以太池）武器 / 护甲**，**外界装备属性完全无效** |
| 武器强化 | 通过**银色宝箱（Silver Coffer）**提升以太池装备，**有失败概率**（成功率随当前强化等级与所在层数变化） |
| 强化上限 | 各迷宫不同（Pilgrim's Traverse 为 **+99**） |
| 属性同步 | 强化值超过当前等级允许上限时会被**同步** |
| 耐久 / 精炼 | 以太池装备**无耐久损耗**，且**无法 spiritbond（精炼）** |
| 道具（Pomander） | 从金色宝箱获得的特殊道具，**每种最多持有 3 个**，全队共享 |
| 复活 | 除复活道具/技能外，可用 **Altar of Return（归还祭坛）** 一次性复活所有阵亡者 |
| 进度保存 | **每 10 层一个 BOSS**，击败后可**记录进度**并离场 |
| 陷阱 | 地面有隐形陷阱；需要特殊道具才能显形 |
| 区域效果 | 可能出现：状态效果（增益/减益）、**禁用特定魔法或动作**、**Gloom（ gloom，敌人强化）** |
| 迷宫地图 | 使用**专用导航地图**（不显示常规小地图） |
| 组队方式 | **固定队（Fixed Party）** 或 **随机匹配队（Matched Party）**，人数 1–4 |
| 单人挑战 | 全部深层迷宫均支持单人进入，并有独立分数榜（Party / Solo 分开） |

【官】[Deep Dungeon - Pilgrim's Traverse Play Guide](https://na.finalfantasyxiv.com/lodestone/playguide/contentsguide/deepdungeon4/)（该页把通用规则写得最完整）

#### 3.1.1 两种组队模式对比（以 Pilgrim's Traverse 为最完整案例）

| 维度 | 固定队（Fixed Party） | 匹配队（Matched Party） |
|---|---|---|
| 人数 | 最多 4 人 | **固定 4 人**（不足自动补人） |
| 职业限制 | **无**（任意组合） | 无（任意组合），但必须用**登记时选定的职业** |
| 存档内容 | 角色等级、以太池武器/护甲强度、道具、进度 | 角色等级、以太池强度、进度（**道具不保存**） |
| 成员变更 | **不可**——必须与登记时的成员与职业一致 | 可换人；**但进入第 91 层之后不可再加入** |
| 中途加入 | ❌ | ✅（Duty Finder 勾选 "Join Party in Progress"） |
| 单人 | ✅（1 人即固定队） | ❌ |

#### 3.1.2 存档与降级机制（放置游戏的"赛季重置"参考）

- 玩家可以把进度**重置回第 1 层**，**但以太池强化会保留**
- 设计意图（官方原话）："players can reset and return to stone 1 to continue strengthening their weapons and gear if they have found that previous progression became too difficult"
- 固定队存档**可以解散转为匹配队存档**（以太池保留，**道具重置**）
- **重置后的存档不可恢复**

> 这是"**软重置（soft reset）**"设计的教科书案例：**进度清零但强化保留**，用于让卡关玩家重新爬塔刷强化。放置游戏的"周目/赛季"设计可直接采用。

#### 3.1.3 死亡与失败惩罚

| 情形 | 后果 |
|---|---|
| 全队阵亡（普通区域） | 被移出副本 |
| 阵亡后**不能**选择"返回入口"（与其他副本不同） | — |
| **第 31 层及以后**全队阵亡 | **存档数据失效（无法再进入）** |
| 放弃任务（Abandon） | **等同于全队阵亡** |

#### 3.1.4 三层宝箱体系

| 宝箱 | 产出 |
|---|---|
| **金色宝箱 Gold Coffer** | **Pomander（香盒）**；道具超出上限时宝箱仍保留 |
| **银色宝箱 Silver Coffer** | **强化以太池武器/护甲**，或**香 Incense**；强化**可能失败**；满强化时打开无效；武器与护甲**分别强化**，每次随机选一个 |
| **青铜宝箱 Bronze Coffer** | 普通道具（药水等）、**以太池玻璃碎片**等兑换物 |

#### 3.1.5 诅咒宝藏（The Accursed Hoard）

- 探索中会**随机发现隐藏宝藏**（The Accursed Hoard）
- 需要**先使用 Pomander of Intuition（直觉香盒）**在地图上标出位置
- 玩家必须**在原地静止一段时间**才能挖出
- **存档离开后**，把宝藏交给特定 NPC **鉴定**，才能知道内容

> 这是"**离线鉴定箱**"的完美原型：**离线产出 → 需要回城鉴定 → 开箱随机**。放置游戏可直接照搬（离线挂机获得"待鉴定宝藏"，上线后开箱）。

#### 3.1.6 分数系统与排行榜

- 挑战特定区域或全队阵亡时结算分数
- 计分因素：**到达的最远层数**、**击杀敌人数**等
- **Solo 与 Party 分数分开计算**
- 高分可向 NPC 查询；**只有在本家 World（Home World）完成的成绩才计入**（World Visit / DC Travel 的成绩不计）
- 排行榜在 Lodestone 上**每日更新**，分数取**该棋盘最近 3 次尝试**（Crucible 的规则；深层迷宫排名同样按分数）

---

<!-- DD-MIDDLE-MARKER -->

### 3.5 Pilgrim's Traverse（第 4 个深层迷宫，7.x 新作）★

**状态：🟢 已上线**（7.x 批次）⚠ 具体上线补丁未在排行页标明，但 Lodestone 排行页与 Play Guide 均已上线并可查（本文核实于 2026-09-15）。

**这是 7.x 最重要的长尾新内容，也是最值得放置化借鉴的 FF14 系统之一。**

#### 3.5.1 基础参数

| 项目 | 数值 |
|---|---|
| 等级要求 | 战斗/魔法职业（**不含受限职业**）**Lv91** |
| 物品等级要求 | **无** |
| 人数 | **1–4 人** |
| 时间限制 | **60 分钟**（与多数深层迷宫一致） |
| 起始等级 | **Lv91**（与外界等级无关） |
| 等级上限 | **Lv100** |
| 层数单位 | **traverse stone（巡礼石）**，而非 floor |
| 总层数 | **1–100 stone** |
| 以太池上限 | **+99** |
| 存档槽位 | **2 个**（与其他深层迷宫存档**完全独立**） |
| 入口 NPC | **Vanthau**，伊尔默格 Il Mheg（X:29.9 Y:6.0） |
| 起始任务 | **Pilgrimage of Light**（X:10.3 Y:10.7，The Crystarium，NPC: Bright-eyed Child） |
| 前置条件 | 完成 **Endwalker** 主线 + **死者宫殿第 50 层** |
| 新存档可选起点 | Stone 1 / **21** / **31** / **51** / **71**（需先通关 stone 30 并完成支线 **Faerie Tale**） |
| 从 stone 21 及以后起始 | 等级直接设为 **Lv100**，且**道具与香被清空** |

【官】[Pilgrim's Traverse Play Guide](https://na.finalfantasyxiv.com/lodestone/playguide/contentsguide/deepdungeon4/)

> **设计亮点：多起点存档**。通关一次后可以把新存档直接开在 21 / 31 / 51 / 71 层，跳过重复爬塔。这是"**已通关内容的速通通道**"，放置游戏用于"减少重复劳动、保留新鲜感"非常有效。

#### 3.5.2 独立成长：等级 + 照明以太池（Illumed Aetherpool）

- 所有玩家**从 Lv91 开始**，靠击杀迷宫内敌人升级到 **Lv100**
- **经验规则**：所有敌人给**固定经验**，与队伍人数、等级差**无关**；**休息经验与经验加成全部无效**
- **技能规则**：无任何技能/状态调整或限制，但必须先在迷宫内达到对应等级才能使用；**即使未完成职业任务也能获得高于当前等级的动作与状态**
- **注意**：以"**职业（Class）**"进入者**不能使用任何 job 动作**
- 装备：只能使用 **illumed aetherpool arm（照明以太池武器）** 与 **illumed aetherpool armor（照明以太池护甲）**；护甲外观沿用进场装备
  - 外界装备属性**完全无效**
  - Pilgrim's Traverse 的以太池进度**与其他深层迷宫独立追踪**
- 强化方式：
  - **银色宝箱**（随机出现；强化成功率随强化等级与所在层数变化，**会失败**）
  - **stone 30 及以后的 BOSS**
  - **通关最终区域**
- 上限 **+99**；超出当前等级允许值时**属性被同步**
- 无耐久损耗、无法精炼

#### 3.5.3 特殊道具

| 类别 | 说明 |
|---|---|
| **Pomander（香盒）** | 从**金色宝箱**获得；每种最多 **3 个**，全队共享；**不能带出迷宫**；匹配队中"每层组结束后"不能使用；地图类香盒**不能被同类覆盖**（但会被消耗）<br>⚠ **Pilgrim's Traverse 的部分香盒与其他深层迷宫不同** |
| **Juniper Incense（杜松香）** | 从**银色宝箱**小概率获得；点燃后**召唤妖精王（faerie king）**以多种方式协助；**不能带出迷宫**；匹配队中**每次进入都会重置** |
| 普通道具 | 药水等仍可使用（独立于共享背包） |

> **"召唤妖精王"是 Pilgrim's Traverse 独有的香系统**，与旧深层迷宫的纯 Pomander 体系不同 ⚠。

#### 3.5.4 层结构：每 10 stone 一个 BOSS

| 区段 | 内容 |
|---|---|
| **Stone 1–30** | **与剧情相关**：Pilgrim's Traverse 的故事线 |
| **Stone 31 及以后** | **纯粹为挑战玩家而设计**；必须先完成支线 **Faerie Tale** 才能挑战 |
| BOSS | **每 10 个 traverse stone** 出现一次，击败后可记录进度 |
| **Stone 31+ 阵亡** | **存档失效**（Abandon 也算阵亡） |

#### 3.5.5 探索机制

| 机制 | 说明 |
|---|---|
| **Pylon of Passage（通行塔）** | 每层必须找到并激活它才能推进；**三阶段激活**，进入新区域时必定未激活；需击败区域敌人才能充能 |
| **Altar of Return（归还祭坛）** | 同样三阶段；充满后可**复活全部阵亡者** |
| **Votive Candelabras（许愿烛台）** | 点亮后为**下一层**（下一个 traverse stone 标记的区域）提供各种效果 |
| **导航地图** | 专用地图，队员进入房间即自动更新；标出祭坛与通行塔位置；**M 键**显示/隐藏（默认可视地图不显示） |
| **陷阱与区域效果** | 隐形陷阱 + 状态效果 + 禁用特定动作 + **Gloom（敌人强化）** |

#### 3.5.6 奖励体系

| 条件 | 奖励 |
|---|---|
| 进场时职业 **Lv100** | 按进度给亚拉戈神典石 + 金币 |
| 进场时职业 **Lv91–99** | 经验值 + 金币 + **亚拉戈诗学神典石**（**军械库加成生效**） |
| 进度超过 **stone 30** | **illumed aetherpool glass 碎片**（交给 Il Mheg 的 **Ose Wyd**，X:29.9 Y:5.9） |
| **挑战日志** | 完成 Pilgrim's Traverse 相关目标可获 **luminous oil（发光油）** 与 **piece of the Blessed Hoard（祝福宝藏碎片）** |
| luminous oil | 交 **Ose Wyd** 换特殊物品 |
| Blessed Hoard 碎片 | 交 **Tyr Marn**（X:29.9 Y:5.9）鉴定，可得 **First Light relics（初光遗物）**，再交 Ose Wyd |
| **诅咒宝藏** | 存档离开后交 **Tyr Marn** 鉴定 |

**以太池武器兑换（★ 关键循环）**：

| 条件 | 结果 |
|---|---|
| 以太池武器与护甲均达 **+10** 且完成支线 **Faerie Tale** | 获得 **illumed aetherpool grip（握柄）**，可向 Ose Wyd 换取**任选武器**；**代价：以太池武器与护甲强度各 −10** |
| 通关 **stone 100** 且以太池强度 **≥ +60** | 可继续用 grip **强化之前获得的 Pilgrim's Traverse 武器** |

> **这是一个"以强化换装备"的循环**：把辛苦攒的 +10 强化"熔掉"换成一把永久武器，然后重新攒。对放置游戏而言，这等价于"**把进度转化为永久装备，然后重置进度**"的**转生（prestige）机制**。

#### 3.5.7 最终诗节 The Final Verse（练习 + 难度自定义）

| 模式 | 说明 |
|---|---|
| **The Final Verse（普通）** | 达 **stone 99** 后可向 Vanthau 发起；**最多 4 人**；对手是 **Eminent Grief（崇高悲叹）**的**完美复制体**；难度与 stone 99 的真身完全一致，用于**练习**；匹配队要求以太池 **≥ +94** |
| **The Final Verse (Quantum)** | **独立的挑战副本**，为 stone 99 的 BOSS 战引入**特殊难度缩放**；需**通关 stone 100** 并完成后续支线才能登记；需**至少 15 个 sacramental offerings（圣祭供品）**；**5 种供品**：sacramental spirits / spices / grain / light / lilies（来自诅咒宝藏鉴定）<br>供品**越多 BOSS 越强**；供品**种类与数量会影响 BOSS 行为、状态等**，难度变化"unexpected ways"<br>奖励与供品数量成正比，**选择供品者获得更多奖励**；宝箱**只有选择供品的人能开** |

> **Quantum 模式 = "自选难度的 BOSS 挑战"**，且奖励随难度提升。这是 FF14 里罕见的"**玩家自定义难度曲线**"设计，非常适合放置游戏的"**难度档位选择**"（投入更多资源 → 更高难度 → 更高产出）。

### 3.6 四个深层迷宫横向对比

| 迷宫 | 中文 | 上线 | 层数 | 起始等级 | 等级上限 | 以太池上限 | 独有系统 | 单人挑战 |
|---|---|---|---|---|---|---|---|---|
| Palace of the Dead | 死者宫殿 | 3.35 | 1–200 | Lv1 | Lv60 | +99 ⚠ | Pomander 体系奠基 | ✅ |
| Heaven-on-High | 天之阶梯 | 4.35 | 1–100 | Lv61 ⚠ | Lv70 ⚠ | +99 ⚠ | Empyrean 以太池 ⚠ | ✅ |
| Eureka Orthos | 尤蕾卡·奥尔托斯 | 6.35 | 1–100 | Lv81 ⚠ | Lv90 ⚠ | +99 ⚠ | Demiclone（魔兽克隆）⚠ | ✅ |
| **Pilgrim's Traverse** | （暂译）圣朝巡礼之路 | 7.x | 1–100 stone | **Lv91** | **Lv100** | **+99** | **Juniper Incense / 妖精王 / Quantum 模式 / 多起点存档** | ✅ |

**规律**：**每个大版本一个大版本一个新深层迷宫**（3.x → 4.x → 6.x → 7.x）。⚠ **5.x (Shadowbringers) 没有深层迷宫**（改由 Bozja 承担长尾职责），这本身说明 SE 会**交替使用"深层迷宫"和"野外大型探索"作为长尾主力**。

> **对 8.x 的推断**：Evercold（8.0）**极可能沿用"野外大型探索（World Raid）+ 深层迷宫"的组合**。⚠ 尚未公布。

### 3.7 深层迷宫排行与奖励的长期价值

| 要素 | 说明 |
|---|---|
| Lodestone 排行页 | 4 个迷宫各有独立排行页（`deepdungeon`/`deepdungeon2`/`deepdungeon3`/`deepdungeon4`），分 **Party / Solo** 两个榜 |
| 更新频率 | **每日更新** |
| 成就 / 称号 | 通关、单通、高分均有成就与称号（如"Lone Hero"系列 ⚠ 各迷宫称号名称不同） |
| 核心奖励 | 坐骑、宠物、幻化装备、管弦乐谱、武器（以太池握柄兑换） |

---

## 4. 大规模野外战斗内容：尤蕾卡 / 波兹亚 / 奥库尔特·克雷森特

FF14 的"野外大型探索内容"（Exploratory Content / Field Operation）是**独立等级 + 独立技能 + 独立装备**的巨型多人开放地图。它在设计上与主线完全解耦，是**最像"独立成长小游戏"**的 FF14 系统。

### 4.0 三代探索内容的演进

| 世代 | 内容 | 资料片 | 上线 | 独立等级系统 | 独立技能系统 | 大型 RAID |
|---|---|---|---|---|---|---|
| 1 代 | **Eureka（尤蕾卡）** | Stormblood 4.x | 4.25 起 | **元素等级 Elemental Level** | **Logos Action（徽章动作）** | Baldesion Arsenal |
| 2 代 | **Bozja / Zadnor（波兹亚 / 扎德诺）** | Shadowbringers 5.x | 5.25 / 5.45 | **Resistance Rank（抵抗等级）** + Mettle | **Lost Action（失落动作）** | Castrum Lacus Litore / Delubrum Reginae (Savage) / Dalriada |
| 3 代 | **Occult Crescent（奥库尔特·克雷森特）** | Dawntrail 7.x | 7.2x / 7.55 | **Knowledge Level（知识等级）** | **Phantom Job / Phantom Action（幻影职业/幻影动作）** | Forked Tower: Blood / Magic / Magic (Extreme) |

**三代共同的设计骨架**（这是最重要的抽象，可直接复用到放置游戏）：

1. **进入独立地图** → 2. **独立等级从 0/1 开始** → 3. **打怪/做 FATE 累积独立经验** → 4. **用独立货币买独立技能** → 5. **用独立货币强化独立装备** → 6. **等级/装备达标后开大型 RAID** → 7. **RAID 产出更高阶强化材料** → 回到 3

> 这就是一个**自带完整闭环的放置游戏**：独立等级（成长线）+ 独立技能（build 构筑）+ 独立装备（数值线）+ 独立货币（资源线）+ 大型 RAID（终局目标）。

---

<!-- EXPLORE-MIDDLE-MARKER -->

### 4.3 奥库尔特·克雷森特 Occult Crescent（7.x 探索内容）★

**状态：🟢 已上线**
- **South Horn（南角）**：7.2x 上线（知识等级上限 **20**）
- **North Horn（北角）**：**7.55（2026-07-28 上线，8 月 4 日更新补丁说明）** 上线（知识等级上限 **40**）
- 幻影武器（Phantom Weapons）系列在 **7.55 完结**

【官】[Patch 7.55 Notes](https://na.finalfantasyxiv.com/lodestone/topics/detail/99b6bfb8ecac428c7d3bb37dcb84b52f1064320b)

#### 4.3.1 基础参数（North Horn）

| 项目 | 数值 |
|---|---|
| 等级要求 | 战斗/魔法职业 **Lv100** |
| 平均物品等级 | **≥ 690** |
| 物品等级同步 | **700** |
| 队伍规模 | **8 人** |
| 时间限制 | **180 分钟** |
| 进入 NPC | Phantom Village 的 **Jeffroy**（X:4.5 Y:6.6） |
| 前置任务 | **Occult Reunion**（Tuliyollal X:17.2 Y:11.8，Expedition Messenger；需先完成 "Mysteries Abide"）<br>**注：不要求通关 Forked Tower: Blood** |
| Aethernet | 先完成 Tuliyollal 全部以太之光调谐 + 任务 "Un familiar Territory" 后可在幻影村使用 |
| 坐骑 | ✅ 可骑乘，**不可飞行**；初始速度已提升 1 级，用 **North Horn riding map** 再提升 1 级 |
| Return | 被替换为 **Occult Return**（返回营地） |

**关键观察**：这是一个**长达 3 小时（180 分钟）的开放实例**，8 人小队为单位，但内部可以随时组队/解散、并且有 72 人的"关键遭遇战"。这是**"小队为单位、大群为事件"**的混合结构，非常适合放置游戏的"**离线挂机 + 上线打大事件**"。

#### 4.3.2 独立成长体系 A：知识 Knowledge

| 机制 | 说明 |
|---|---|
| **Knowledge（知识）** | 相当于经验值，来自**完成任务**与**击杀岛上敌人** |
| **Knowledge Level（知识等级）** | 克雷森特专属等级系统 |
| **等级差惩罚/奖励** | 打**高于自己知识等级**的敌人：**造成伤害降低、受到伤害提高**，但**击败后获得更多知识** |
| 卡点设计 | 进入 Forked Tower 需要**特定知识等级**；提高知识等级也更容易打高等级敌人 |
| **惩罚（Incapacitation Penalty）** | 知识等级 **> 5** 时，阵亡会掉知识：① 阵亡后**未经复活直接回营地** 或 ② **阵亡状态下离开实例** → 损失一部分知识；**知识低于 0 时知识等级也会下降**；损失量取决于当前知识等级 |
| 知识等级上限 | 7.2x：**20** → 7.55：**40**（南角区域内等级同步为 20，但仍可在南角累积知识） |

> **这是"高等级敌人 = 高风险高回报"的经典设计**，而且**死亡会掉等级**——这直接给了放置游戏一个"挂机风险"机制（挂高级怪收益高但可能掉级）。

#### 4.3.3 独立成长体系 B：幻影职业 Phantom Jobs

| 机制 | 说明 |
|---|---|
| **Phantom Job** | 在**主职业之外**额外获得的辅助职业；选择后解锁对应的 **Phantom Action** |
| **Phantom Job Level** | 由 **Phantom EXP** 提升；击败岛上敌人、完成遭遇战都可获得 |
| 解锁内容 | 提升等级解锁新的 **phantom action** 与 **phantom trait** |
| **Phantom Mastery** | 达到某幻影职业**满级**后获得；提供**伤害提升**等效果，且**即使切换到其他幻影职业也保持生效**；**掌握的幻影职业越多，Mastery 效果越强** |
| **Phantom Freelancer（幻影自由人）** | 第一个可用的幻影职业；**不通过传统方式获得经验**，而是**每掌握一个其他幻影职业就升级一次** |
| 获取方式 | 通过 **soul shard（灵魂碎片）** 购买或从关键遭遇战掉落 |
| 切换 | 非战斗时可随时切换 |
| 7.55 新增 | **Phantom Black Mage**、**Phantom Blue Mage** 等 |

**Phantom Blue Mage（幻影青魔）的特殊规则**：其技能**不是靠升级获得，而是靠"学会"** —— 必须**亲眼看到敌人使用该技能**后再击败它，才能习得。技能列表在幻影职业窗口的 Phantom Traits 中查看。

> **这是 FF14 里"技能收集"设计的精华**：把"学习技能"从"升级解锁"改成"**观察敌人 → 击败 → 学会**"，天然产生"我要去找会用某技能的怪"的探索动机。放置游戏可用"挂机时随机学会敌人技能"来实现。

#### 4.3.4 战斗机制

| 机制 | 说明 |
|---|---|
| **元素弱点（Elemental Weaknesses）** | 克雷森特的敌人有元素弱点，受到对应元素攻击伤害更高 |
| **EXP 连锁（EXP Chains）** | 一定时间内连续击败敌人可获得**知识 / 幻影经验 / 奖励加成**；加成**递增至连锁 30 封顶** |
| 连锁触发条件 | 击败**知识等级高于自己**的敌人；阈值随队伍人数变化 |
| 连锁阈值表 | 单人：高 **2 级**<br>2 人：高 **3 级**<br>3–4 人：高 **4–5 级**<br>5–6 人：高 **6–7 级**<br>7–8 人：高 **7–8 级** |
| 标识 | 可产生连锁的敌人有**特殊图标** |
| **Balanced Party（平衡队伍）** | 全员知识等级差 **≤ 3** 时视为平衡队伍；此时**知识等级被调整为全队平均值**，且敌人给**更多幻影经验** |
| **Knowledge Level Sync** | 队长可开启，把比最低成员高 3 级以上的成员**同步下调**，从而形成平衡队伍 |
| 组队自由度 | 与普通副本不同，**可随时组队 / 解散 / 离队**；可设 Looking for Party 状态 |

#### 4.3.5 遭遇战

| 类型 | 人数 | 说明 |
|---|---|---|
| **FATE** | 自由参加 | 岛上各处发生的战斗遭遇；**已开始后仍可加入**；**不受知识等级影响** |
| **Critical Encounter（关键遭遇战）** | 最多 **72 人** | 大规模战斗；**部分只能通过击杀岛上怪物触发**；**必须在开始前到达指定区域并停留在内**，**开始后不可加入**；**不受知识等级影响** |

#### 4.3.6 支线玩法

| 玩法 | 说明 |
|---|---|
| **Persistent Pots, Plentiful Treasure** | 部分 FATE 要求保护**魔法罐**；成功后会有**跟着你的罐子 NPC**；获得状态 **"Cache Me if You Can"**；用 **elixir（灵药）** 换**宝藏位置提示**；在正确位置使用灵药可挖出隐藏宝箱；**稀有情况下状态会保留**，可继续寻宝；寻宝结束条件：找到全部宝藏 / 参加关键遭遇战 / 自己阵亡 / 罐子阵亡 / 离开克雷森特 / 登出 |
| **Fortune Carrots（幸运胡萝卜）** | 宝箱中可能开出；持有后会看到"**快乐兔子的踪迹**"；使用胡萝卜可引出兔子并换取宝藏；**有人领奖后要另找新的踪迹** |
| **Occult Record（克雷森特记录）** | 类似 Bozja 的"Field Record"，收集剧情/笔记条目；7.55 新增条目；需先完成南角任务解锁 |
| **宝藏箱** | **只对自己可见**；击杀怪物与完成事件会使宝箱出现在岛上某处 |

> "**跟着你的罐子 + 用灵药挖宝**"是一套极佳的放置游戏素材：**挂机时掉落"藏宝线索道具"，上线后消耗线索逐次挖宝**。

#### 4.3.7 货币与装备循环

| 项目 | 说明 |
|---|---|
| **Enlightenment silver obols（启示银币）** | 主要来自**关键遭遇战与 FATE** |
| **Enlightenment gold obols（启示金币）** | 主要来自**野外击杀敌人** |
| 兑换 NPC | 北角 **expedition antiquarian**（X:39.3 Y:38.6） |
| 注意 | **北角货币与南角货币不通用**；**Arcane amulets（秘法护符）**为 Forked Tower 内获得，同样交该 NPC |
| **Occult Crescent Gear** | 北角获得的装备带有**仅在克雷森特区域内生效**的特殊强化；可用北角道具**升级至 3 阶** |
| 跨区兑换 | **南角装备可在北角换成同阶新装备** |
| 装备 NPC | 北角 **expedition armorer**（X:39.5 Y:39.0） |

**双货币设计规律**：

| 货币 | 来源 | 对应玩法 |
|---|---|---|
| silver obols | 关键遭遇战 / FATE | **团队事件向** |
| gold obols | 野外击杀 | **单人刷怪向** |

> 这是"**分工明确的双货币**"：让"喜欢打大事件的人"和"喜欢野外刷怪的人"都有各自的产出线，且两者不互通，迫使玩家做两种玩法。放置游戏可用"**挂机产出 A 币，上线打活动产出 B 币，两者都要**"来提升留存。

#### 4.3.8 分叉之塔 The Forked Tower（7.x 的"大型 RAID"）

| 副本 | 位置 | 人数 | 知识等级要求 | 复活限制 | 备注 |
|---|---|---|---|---|---|
| **Forked Tower: Blood** | South Horn | ⚠ 未在一手来源确认 | — | — | 7.2x 首个分叉之塔；**挑战 Magic 并不要求先通关 Blood** |
| **Forked Tower: Magic** | North Horn | **最多 48 人** | **≥ 40** | **无复活限制** | 通过特定任务解锁 |
| **Forked Tower: Magic (Extreme)** | North Horn | **12–48 人**（至少 3 个同盟小队） | **40** | **有复活次数限制**：存在限复活的状态效果，每次用特定幻影动作复活会消耗层数，**层数归零后无法再被复活** | 通过特定任务解锁 |

**Forked Tower: Magic 进入规则**：

- 入口是**只在 Auroral Mirage（极光幻影）天气时出现**的 **aetherial node（以太节点）**
- **无需 cipher（密码）**；最多传送 **48 人**
- 关键遭遇战进行期间，**极光幻影天气会暂停出现**
- 超过 48 人时**随机抽选**；以队伍为单位登船时**全队一起被选中或一起被拒**
- 未被选中者获得 **Forked Tower Priority（优先权）**，优先权越高越容易被选中；**成功进入后优先权重置**
- **同盟形式进入（≥24 人）时必定进入新实例**，非同盟成员不可加入
- 满足条件时，**进入克雷森特 5 分钟后**开始极光幻影；同盟完成进入或 10 分钟后天气结束、实例不再被视为占用
- 塔内非战斗状态可**自由切换职业与幻影职业**
- **使用 Occult Return 或阵亡后选择回起点 → 被送回营地且不可再进入**

**Forked Tower: Magic (Extreme) 追加规则**：

- 可由 **12–48 人**组成同盟（**至少 3 个同盟小队**）
- **必定进入新实例**，且实例**在副本完成前一直保持占用**
- 进入时**时间限制 15 分钟**，随进度**追加时间**
- **只能在实例开始时切换职业与幻影职业**

**7.56 的时间限制调整**：

> "Extended time limits when undertaking the Forked Tower: Magic on the Occult Crescent: North Horn have been adjusted. … While time extensions were previously retained, adjustments have been made to **subtract extensions upon exiting** the Forked Tower: Magic. In cases where subtraction results in less than 5 minutes left in the duty, the time limit will be set at 5 minutes."
> 【官】[Patch 7.56 Notes](https://na.finalfantasyxiv.com/lodestone/topics/detail/a8a526ad64db45c8ca8d1c7fdcce8a5eedaa18bc)

> **这是一个重要的"时效性"事实**：7.56 刚刚调整了 Forked Tower 的时间延长规则（离开塔时会扣除延长的时间）。在引用 7.55 攻略时必须注意这一点。

### 4.4 幻影武器 Phantom Weapons（7.x 的遗物武器链）

| 项目 | 内容 |
|---|---|
| 所属 | Occult Crescent（奥库尔特·克雷森特） |
| 起始任务 | **A Phantom Reborn** → **Under No Illusion**（Phantom Village X:6.6 Y:7.1，NPC: Lydirceil） |
| 完结 | **7.55 完结**（官方描述："the conclusion of the Phantom Weapons series"） |
| 最终强化 | 需参与多种副本，**共 2 个强化阶段**；**第 2 阶段可选择武器属性** |
| 副武器获取 | 强化完 1 把到第 1 阶后，可用 **ecliptic arcanite（黄道秘银）** 向 Phantom Village 的 **Dodokkuli**（X:6.7 Y:7.1）换取**另一把已到第 1 阶的幻影武器** |
| ecliptic arcanite 来源 | 用 **Allagan tomestones of mathematics（数学神典石）** 兑换 |
| 加速机制 | **一旦有一把武器强化到第 2 阶，之后所有武器都可免费强化到同一阶段**（无需额外道具） |
| 任务限制 | 幻影武器任务**要求用接受任务时的同一职业完成** |

【官】[Patch 7.55 Notes](https://na.finalfantasyxiv.com/lodestone/topics/detail/99b6bfb8ecac428c7d3bb37dcb84b52f1064320b)

> **设计亮点：跨武器共享进度**。第一把武器辛苦做，之后所有武器"免费同步到同阶段"。这是 FF14 近几个资料片遗物武器链的标准优化（**降低多职业玩家的重复劳动**）。放置游戏若做"多角色装备"，这是必备的减负机制。

### 4.5 宇宙探索 Cosmic Exploration（7.x 新长尾系统）

**状态：🟢 已上线**（7.2x 批次 ⚠ 具体补丁待核）

已知一手证据：

- 7.56 补丁说明中修复了 "**cosmic exploration mech op directive 'Eradicate Toxic Weeds'**" 的一个 bug（field scanner 投递范围显示问题）
- 这说明 Cosmic Exploration 包含 **"mech op directive（机甲作战指令）"** 与 **"field scanner（场地扫描仪）"** 等机制
- 在 7.55 补丁说明中亦被提及（作为 7.x 的常驻长尾内容）

【官】[Patch 7.56 Notes — Resolved Issues](https://na.finalfantasyxiv.com/lodestone/topics/detail/a8a526ad64db45c8ca8d1c7fdcce8a5eedaa18bc)
【官】[Patch 7.55 Notes](https://na.finalfantasyxiv.com/lodestone/topics/detail/99b6bfb8ecac428c7d3bb37dcb84b52f1064320b)

> ⚠ **重大不确定性**：Cosmic Exploration 的**完整机制（等级系统、货币、产出循环、是否与"月球/宇宙"主题相关、是否有独立等级与装备）本文未能用一手来源系统核实**。可以确定的是它属于 **7.x 的"生产/建造类长尾内容"**，与 Island Sanctuary（6.x）和 Ishgard Restoration（5.x）构成同一设计谱系。**建议在正式设计文档中把它单列为"待补充"**（见 §附录 B）。

---

## 5. 副本变体：Variant 与 Criterion

这是 FF14 近年最重要的"**轻量可重玩副本**"设计线，首次出现于 **6.25（2022）**。到 7.45（2026-03）已经演进为**三层结构**。

### 5.1 三层结构总览（★ 这是最关键的一张表）

| 层级 | 名称 | 人数 | 定位 | 变体动作 | 结构 |
|---|---|---|---|---|---|
| **第 1 层** | **Variant Dungeon** | **1–4 人**（可单人） | 剧情探索 + 分支路线 | ✅ 可用 | **分叉路线**，不同选择 → 不同 BOSS |
| **第 2 层** | **Variant Dungeon (Advanced)** | **1–4 人**（可 2 人） | 自由顺序 BOSS 连战 | ✅ 可用 | **自由选择 BOSS 顺序**，每场可结束 |
| **第 3 层** | **Criterion Dungeon**（"Another XXX"） | **4 人**（固定 1T/1H/1近战/1远程） | 高难四人副本 | ⚠ **受限**（只自动配给 Variant Raise II） | **直线 BOSS 连战** |
| **第 3 层（Savage）** | **Criterion Dungeon (Savage)** ⚠ | 4 人 | 最难 | ⚠ 受限更严 | 直线 + 无复活/限时/一击即败 ⚠ |

**命名规律**：Criterion 版本一律命名为 **"Another XXX"**，例如：
- `The Sil'dihn Subterrane` → **`Another Sil'dihn Subterrane`**（6.25）
- `Mount Rokkon` → **`Another Mount Rokkon`**（6.35 ⚠）
- `Aloalo Island` → **`Another Aloalo Island`**（6.5 ⚠）
- `The Merchant's Tale` → **`Another Merchant's Tale`**（7.45）

【官】[Patch 7.45 Notes — Variant Dungeons](https://na.finalfantasyxiv.com/lodestone/topics/detail/534af9c97992897890b8dd90aacabb77c6f51450)
【Wiki】[Gamer Escape: Category — Variant and Criterion Dungeon](https://ffxiv.gamerescape.com/wiki/Category:Variant_and_Criterion_Dungeon)

### 5.2 Variant Dungeon 详解（以 The Merchant's Tale 为一手样本）

#### 5.2.1 参数

| 项目 | 数值（The Merchant's Tale） |
|---|---|
| 等级要求 | 战斗/魔法职业 **Lv90** |
| 物品等级要求 | **无** |
| **物品等级同步** | **765** |
| **等级同步** | **所有参与者等级调整为 100** |
| 魔晶石 | **魔晶石加成完全无效**（无论装等） |
| 队伍规模 | **1–4 人** |
| **怪物 HP 缩放** | ✅ **随队伍人数缩放** |
| 时间限制 | **90 分钟** |
| 入口 | **V&C Dungeon Finder**（主菜单 Duty 下） |
| 前置任务 | **A Spellbinding Read**（Old Sharlayan X:12.0 Y:13.3，NPC: Shallow Moor）<br>需完成 **Endwalker** 主线 + 与 Old Sharlayan 的 **Osmon**（X:11.9 Y:13.3）对话 |
| 兑换货币 | **Corvosi Potsherds（科尔沃西陶片）**，交 Old Sharlayan 的 **Trisassant**（X:11.9 Y:13.3） |
| 匹配 | 默认**关闭**"Enable party matching"；可勾选以随机匹配 |

**经验获取**：按**未同步的等级**计算，击杀 BOSS 与完成副本时发给当前职业；**未同步等级 ≥ 100 的玩家改发亚拉戈神典石**。

#### 5.2.2 角色自由：变体动作（Variant Actions）

为了"让任何职业都能承担任何职责"，Variant Dungeon 提供**模仿既有技能的特殊动作**（官方举例：**Cure**、**Rampart**）。

| 规则 | 说明 |
|---|---|
| 携带数量 | 最多同时 **2 个** |
| 更换 | **随时可换，进入副本后也能换** |
| 差异 | **不同职责可用的变体动作不同** |
| 属性补偿 | 部分属性会被调整，以弥补职责间强度差异 —— **让 DPS 或治疗也能当坦克** |
| 职业切换 | 自由切换任意 **Lv90** 职业（仅限非战斗状态） |

> **这是 FF14 最激进的"去职责化"设计**。对放置游戏的意义：如果你想做"**任意角色组合都能打下副本**"，Variant Actions 就是"**通用技能槽 + 属性浮动补偿**"的成熟方案。

#### 5.2.3 分支路线：投票制

| 机制 | 说明 |
|---|---|
| 进入副本后**投票**决定走哪条路 | 得票最多的路线被采用 |
| **可以弃权** | 弃权后由其他玩家或**随行 NPC** 决定 |
| **NPC 偏好路线** | 用**特殊图标**标记；选择该路线**可能获得额外奖励** |
| 剧情收藏 | 完成 "A Spellbinding Read" 后，探索中获得的条目可在 V&C Dungeon Finder 的书中阅读 |

### 5.3 Variant Dungeon (Advanced) 详解（7.45 新增层）

**这是 7.45 引入的全新中间层**——介于 Variant 与 Criterion 之间。

| 项目 | 数值（The Merchant's Tale (Advanced)） |
|---|---|
| 等级要求 | **Lv100** |
| 平均物品等级 | **≥ 760** |
| 物品等级同步 | **785** |
| 队伍规模 | **1–4 人**（官方描述"as a pair, or in a party of up to four"） |
| **BOSS HP 缩放** | ✅ 随人数缩放 |
| 时间限制 | **90 分钟** |
| 解锁条件 | ① 完成 "A Spellbinding Read" ② 在 The Merchant's Tale 的**三条不同路线**上各击败一个**不同 BOSS** ③ 达到 Lv100<br>然后与 Old Sharlayan 的 **Memolivia**（X:11.9 Y:13.3）对话 |
| 入口 | V&C Dungeon Finder 的 **Advanced/Criterion 标签** |
| 匹配 | **默认开启** party matching |
| 兑换货币 | **Corvosi Brass（科尔沃西黄铜）** |
| 额外奖励 | **连续击败全部 3 个 BOSS** 可解锁额外兑换品 |

**核心规则（★ 设计亮点）**：

- **3 个 BOSS 可以任意顺序挑战**
- **每场战斗胜利后**，玩家可选择：**继续打** 或 **结束副本**
- 选"结束副本"→ 领取目前累积的奖励
- **连续打完 3 个 BOSS** → 获得**额外奖励**
- **投票平票时（继续 vs 结束）→ 副本继续**（默认倾向于"继续"）

> **这是"风险/收益逐步升级"的绝佳设计**：每打完一场你就可以选择"落袋为安"或"继续冒险追求更高收益"。放置游戏可直接照搬为"**挂机连战：每层可选择结算或继续，层数越高收益越高但失败损失越大**"。

### 5.4 Criterion Dungeon 详解（Another Merchant's Tale 为一手样本）

| 项目 | 数值 |
|---|---|
| 名称 | **Another Merchant's Tale** |
| 等级要求 | **Lv100** |
| 平均物品等级 | **≥ 770** |
| 物品等级同步 | **795** |
| 队伍规模 | **必须 4 人** |
| 时间限制 | **90 分钟** |
| 解锁条件 | 击败 The Merchant's Tale (Advanced) 的**全部 BOSS**，再与 Old Sharlayan 的 **Osmon**（X:11.9 Y:13.3）对话 |
| 兑换货币 | **Corvosi Manuscripts（科尔沃西手稿）** |

#### 5.4.1 与 Variant 的核心差异

| 差异点 | Variant | **Criterion** |
|---|---|---|
| 结构 | **分叉路线**（选择分支） | **直线（straight and brutal line）** |
| BOSS 强度 | 基准 | **远高于 Advanced** |
| 变体动作 | 2 个，自由选择 | **受限**——只自动配给 **Variant Raise II**，无其他变体动作 |
| 队伍 | 1–4 人，无人事要求 | **必须 4 人**；匹配时强制 **1 坦克 / 1 治疗 / 1 近战 DPS / 1 物理或魔法远程 DPS** |
| 4 人预组队 | — | **不受装等限制与职责要求约束**（可用任意组合） |

#### 5.4.2 Variant Raise II（克雷特里翁版的"复活"）

| 规则 | 说明 |
|---|---|
| 自动配给 | **所有玩家**进入时自动获得 |
| 使用次数 | **每个队员只能使用 1 次** |
| 补充 | 副本内**有机会补充使用次数** |
| 豁免 | **复活限制状态效果不限制 Variant Raise II 的复活** |

#### 5.4.3 复活限制（Resurrection Restrictions）

> "While undertaking this duty, players will be subjected to **a status effect that prevents resurrection by certain means**. Raise effects granted via Variant Raise II are exempt from this restriction."
> 【官】[Patch 7.45 Notes](https://na.finalfantasyxiv.com/lodestone/topics/detail/534af9c97992897890b8dd90aacabb77c6f51450)

#### 5.4.4 队伍构成加成（Party Composition Bonus）★

> "Upon entering Another Merchant's Tale, party members will gain **a bonus to damage dealt according to the composition of their party**. The bonus increases with the number of jobs in your party that rely on actions that affect the entire party（即"团辅技能多的职业"越多，加成越高）。This bonus system is intended to compensate for the proportional decrease in utility of such actions as party size decreases."

补充规则：
- 加成的**有效性因职责而异**
- **只对"职业（job）"生效，对"职业（class）"无效**

> **这是一个非常"放置游戏友好"的机制**：把"队伍组合"直接转化为一个**可计算的被动加成**。放置游戏可以用"同队角色标签组合 → 全局 buff"来实现，比复杂的技能联动更好实现。

### 5.5 全部 Variant / Criterion 副本清单

| 版本 | Variant Dungeon | 中文 | Criterion（Another …） | Advanced 层 | 状态 |
|---|---|---|---|---|---|
| 6.25 | **The Sil'dihn Subterrane** | 希尔迪恩地下道 | Another Sil'dihn Subterrane | ❌（当时无此层） | 🟢 已上线 |
| 6.35 ⚠ | **Mount Rokkon** | 六根山 | Another Mount Rokkon | ❌ | 🟢 已上线 |
| 6.5 ⚠ | **Aloalo Island** | 阿罗阿罗岛 | Another Aloalo Island | ❌ | 🟢 已上线 |
| 7.45 | **The Merchant's Tale** | 商人的故事 | **Another Merchant's Tale** | ✅ **The Merchant's Tale (Advanced)** | 🟢 已上线 |

补充说明：
- 三个 6.x 副本均有 **Normal 与 Savage 两种 Criterion 难度** ⚠（Gamer Escape 存在 `Another Sil'dihn Subterrane (Savage)` 独立条目）
- **7.x 是否还有更多 Variant/Criterion 副本**（除 The Merchant's Tale 外）⚠ 未在一手来源完全枚举，见 §附录 B

【Wiki】[Gamer Escape: Another Sil'dihn Subterrane (Savage)](https://ffxiv.gamerescape.com/w/index.php?title=Another_Sil%27dihn_Subterrane_(Savage)&diff=prev&oldid=2098130)
【Wiki】[TheGamer: How To Unlock The Merchant's Tale Variant Dungeons And Another Merchant's Tale Criterion Dungeon](https://www.thegamer.com/final-fantasy-14-the-merchants-tale-variant-another-criterion-dungeon-unlock-guide/)

### 5.6 相关高难长尾：Ultimate 与 Chaotic 同盟讨伐战

#### 5.6.1 Ultimate Raid（绝境战）

| 项目 | 内容 |
|---|---|
| 定位 | FF14 最高难度内容，8 人 |
| 节奏 | ⚠ 每个大版本约 1–2 个 |
| 7.x 已知 | **Dancing Mad (Ultimate)**（7.5 批次 ⚠，Kefka 主题）<br>此前 7.x 还有一个 Ultimate ⚠ |
| 特点 | 无装等同步放宽；机制与容错极严；通关率极低 |

**7.55 补丁对 Dancing Mad (Ultimate) 的可视性优化**（用于说明其存在与 7.x 状态）：
> "When undertaking the duty **Dancing Mad (Ultimate)**, in order to improve the visibility of Celestriad, elemental icons displayed during this mechanic will be positioned higher, and their size will be increased."
> 【官】[Patch 7.55 Notes](https://na.finalfantasyxiv.com/lodestone/topics/detail/99b6bfb8ecac428c7d3bb37dcb84b52f1064320b)

**背景（RPGFan 采访）**：Yoshida 表示能设计 Ultimate 级遭遇战的开发者人数很少，且会轮换负责；本次负责人对 Kefka 有"unnatural love"，此前做过 **O8 / O8S（Omega: Sigmascape V4.0）**，希望再次挑战 Kefka。【Wiki】[RPGFan: Evercold Press Conference](https://www.rpgfan.com/2026/04/26/final-fantasy-xiv-evercold-conference/)

#### 5.6.2 Chaotic Alliance Raid（混沌同盟讨伐战）

| 项目 | 内容 |
|---|---|
| 首次实装 | **7.1（2024-11）** |
| 首个副本 | **The Cloud of Darkness (Chaotic)** |
| 定位 | **24 人同盟副本的加强版**，介于普通同盟 RAID 与零式之间 |
| 特点 | 更高机制密度、更强数值、需要团队配合 |

> ⚠ **不确定性**：7.x 是否追加了第二个 Chaotic 副本未确认；且该模式的"每周/无周限"规则未核实，见 §附录 B。
> 【Wiki】该内容类型在 7.1 补丁说明中公布；本文未取得其一手补丁说明原文。

---

## 6. 其它长尾系统

本章覆盖 FF14 的"外围长尾"——它们不依赖战斗技巧，而是**时间投入 + 资源循环**，是放置游戏最直接的取材来源。

### 6.0 长尾系统分类

| 类别 | 系统 | 核心循环类型 |
|---|---|---|
| **生产/建造** | 岛屿庇护所、宇宙探索、部队工坊（潜艇/飞空艇） | 离线产出 + 建造升级 |
| **收集/学习** | 青魔道士、驯兽师、九宫幻卡、坐骑/宠物/乐谱 | 收集清单完成度 |
| **武器长链** | 各资料片遗物武器 | 多阶段素材收集 |
| **周期任务** | 天书奇谭、挑战日志、定制交付、时尚报告 | 每周/每日限量 |
| **挑战副本** | 幻巧战（Unreal）、绝境战、混沌同盟讨伐战、假面狂欢 | 高难/单人挑战 |

---

<!-- LT-MARKER -->

### 6.1 岛屿庇护所 Island Sanctuary

**状态：🟢 已上线（6.2，2022-08），⚪ 停止扩展但仍在运营**

> ⚠ **本文对 Island Sanctuary 的一手核实程度有限**（未抓取官方 Play Guide）。以下为已确认要点与待核项，详见 §附录 B。

| 项目 | 内容 |
|---|---|
| 实装 | **Patch 6.2（2022-08-23）** ⚠ |
| 解锁 | 需完成一定主线进度 ⚠ |
| 岛屿等级 | **1–20 级** ⚠ |
| 核心循环 | 采集岛上资源 → 在**工坊**按 **Isleworks Agenda（岛屿工坊议程）** 排产 → 按**真实时间**产出 → 领取货币与道具 |
| **离线特性** | ✅ **工坊生产按真实时间推进，离线也继续产出**——这是 FF14 中**最纯粹的离线生产系统** |
| 加成机制 | **Groove（节奏）加成**：连续排产提升工坊效率 ⚠ |
| 货币 | **Seafarer's Cowrie / Islander's Cowrie** ⚠（名称待核实） |
| 养殖 | 牧场（pasture）、农田（cropland）、储藏（granary）⚠ |
| 管理工具 | **Sanctuary Manager** ⚠ |
| 专属奖励 | 坐骑、幻化、宠物、管弦乐谱 ⚠ |
| 2026 年状态 | 有第三方攻略仍在讨论其 **Gil 收益（2026 年 Patch 7.51 环境）**，说明系统**仍在运营** |

【Wiki】[FFXIV Island Sanctuary Gil Guide (Patch 7.51, 2026)](https://timesaver.gg/blog/ffxiv-island-sanctuary-gil-guide)

> **为何仍是首选参考**：无论细节如何，**"工坊按真实时间生产 + 离线继续"** 这一核心特性已被确认，而这正是放置游戏最需要的部分。

### 6.2 青魔道士 Blue Mage（受限职业之一，**已用官方职业指南完整核实**）

**状态：🟢 已上线**（4.5，2019-01 ⚠ 首次实装；后续多次提升等级上限）

#### 6.2.1 基础信息

| 项目 | 内容 |
|---|---|
| 定位 | **魔法远程 DPS** |
| 等级 | **起始 Lv1，上限 Lv80** |
| 独立性 | 官方原文："Blue mage functions **independently of other classes and jobs**, starting at level 1 with a maximum level of 80." |
| 解锁任务 | **Out of the Blue**：战斗/魔法职业 **Lv50**，Limsa Lominsa Lower Decks（X:9.9 Y:11.0），NPC: Zealous Yellowjacket；前置主线 **The Ultimate Weapon** |
| 设定 | 一位"可疑的法师"在新世界之旅中习得了既非黑魔法也非白魔法的怪异施法方式；购买灵魂水晶者能模仿野生生物的以太魔法 |

【官】[Blue Mage Job Guide](https://na.finalfantasyxiv.com/jobguide/bluemage/)

#### 6.2.2 受限规则（与驯兽师逐条对比）

| 规则 | 青魔道士 Blue Mage | 驯兽师 Beastmaster |
|---|---|---|
| 等级上限 | **80** | **50** |
| 角色动作 | ❌ 不能使用 ⚠ | ❌ 不能使用 |
| **经验加成方向** | ✅ **野外击杀敌人经验更高**<br>❌ **FATE 与公会理符（guildleve）敌人无加成** | ✅ **FATE 经验更高**<br>❌ **野外击杀无加成**（官方明确说与青魔相反） |
| 可接任务 | 仅青魔职业任务 + 全职业通用任务 | 同 |
| 雇员 | 不能指派 | 不能指派 |
| **可进副本** | 可与他人组成 **预组队 / 解除人数限制队伍** 打副本 | 同 |
| ❌ 不可进入 | Duty Roulettes、**Eureka / Bozjan Southern Front / Occult Crescent / Variant & Criterion Dungeons / Ultimate Raids**（进入后也不能切青魔）<br>Squadron Missions、**Deep Dungeons**、**PvP（含决斗）**、Stone Sky Sea、Hall of the Novice | 同一清单（7.56 补丁说明逐条列出） |
| ✅ 例外 | **青魔可以进入狼穴码头（Wolves' Den）** | ⚠ 7.56 补丁说明未给此例外 |

> **关键结论**：两者是**同一套"受限职业"框架的两次实例化**。差异在内容线：**青魔 = 技能学习 + 舞台式单人挑战 + 组队日志**；**驯兽师 = 宠物结契 + 图鉴 + 棋盘式单人挑战 + 排行榜**。

#### 6.2.3 技能学习机制（★ 与技能收集类放置玩法直接对应）

| 机制 | 官方说明 |
|---|---|
| 学习方式 | **不是靠升级获得技能，而是从敌人身上学** |
| 条件 | 必须**先在战斗中亲眼看到敌人施展某个特殊攻击**；**将其击败后有概率获得该技能** |
| **等级无关** | 官方原文："**Job level has no influence on when an action can be learned.**" |
| 法术书 | 已学法术记入 **Blue Magic Spellbook（青魔法书）**；书中也包含**如何获得其他法术的提示** |
| 主动技能上限 | **最多同时装备 24 个主动技能**（active actions） |
| 战斗中不可改 | 战斗中及某些副本中不能更改主动技能 |
| **Active Sets（主动技能组）** | 可保存**最多 5 套**，包含技能与快捷栏布局；仅保存青魔专属快捷栏 |
| **Whalaqee Totems** | 部分法术**只能通过图腾获得**；需完成青魔任务 **Blue Leading the Blue** 与特定成就，然后与 Ul'dah - Steps of Thal（X:12.5 Y:12.9）的 **Wayward Gaheel Ja** 对话 |

> **对放置游戏的启示**：**"看到敌人用 → 击败 → 有概率学会"** 是一个极佳的挂机机制。放置游戏可设计为：**挂机时敌人技能进入"观察列表"，击杀后按概率解锁为玩家技能**。同时"**等级与学习无关**"意味着玩家可以**越级去学高价值技能**，产生明确的探索动机。

#### 6.2.4 假面狂欢 Masked Carnivale（单人舞台挑战）

| 项目 | 内容 |
|---|---|
| 类型 | **单人**舞台式挑战 |
| 解锁 | 任务 **The Real Folk Blues**：青魔 **Lv50**，Ul'dah - Steps of Thal（X:12.5 Y:13.0），NPC: Maudlin Latool Ja；需完成青魔任务 **Blue Gold** 并学会法术 **Glower** |
| 参加方式 | 与 Ul'dah - Steps of Thal（X:11.5 Y:13.2）的 **Celestium attendant** 对话 |
| **关卡总数** | **共 32 关** |
| 注意 | **一旦开始某关，就不能登记或移除主动技能**（即配置锁定） |
| **属性弱点** | 多数敌人有特定元素弱点，可在关卡列表中确认；敌人名字上方有图标提示 |
| 结算 | 显示**通关时间、加成（bonuses）、分数**；加成通过满足特定条件获得并影响分数 |
| **每周目标（Weekly Targets）** | 部分关卡带周常目标（有图标标记）<br>**三个难度档：novice（新手）/ moderate（中等）/ advanced（进阶）**<br>可在 Timers 菜单查看<br>**额外奖励每周只能领 1 次** |
| **重置时间** | **每周二 12:00 a.m. (PST)** |

> **这是本文档中最完整的一条"周常 + 分数挑战 + 三档难度"组合**，与 Crucible 一起构成"单人挑战类放置副玩法"的两大参考。

#### 6.2.5 青魔日志 Blue Mage Log（组队内容线）

| 项目 | 内容 |
|---|---|
| 类型 | **青魔限定组队内容**——与其他青魔组队挑战指定副本 |
| 解锁 | 任务 **Blue Scream of Death**：青魔 **Lv60**，Ul'dah - Steps of Thal（X:12.5 Y:13.0），NPC: Martyn；需完成青魔任务 **Blue in the Face** 并学会法术 **Frog Legs** |
| 参加 | 从日志中查看可选副本、招募队员、开始副本 |
| ⚠ 重要 | **只有队伍人数达到要求时，副本完成才计入日志进度**；因此**建议不要使用 "Undersized Party（解除人数限制）"** |
| 奖励 | 完成列表内的副本会标记为已完成；**首次通过日志完成某副本奖励更高** |
| **周常目标** | 标记为**银星（silver star）**的副本给更多奖励；**额外奖励每周 1 次**；**每周二 12:00 a.m. (PST) 重置** |
| **首要目标（Prime Targets）** | 标记为**金星（gold star）**；**奖励更高，难度显著更高**；这些副本**无法通过其他途径进入青魔日志** |

> **设计价值**：**"银星周常 + 金星高难"双轨**是"周常内容分层"的干净方案——普通玩家做银星，硬核玩家做金星，两者共用同一个面板。

---

### 6.3 驯兽师 Beastmaster（7.56 新增的第二个受限职业）★

**状态：🟢 已上线（7.56，2026-09）**

**这是本文核实到的最新的重大长尾系统**，也是整个 7.x 末期最重要的新增内容。

#### 6.3.1 基础信息

| 项目 | 内容 |
|---|---|
| 实装补丁 | **7.56**，**2026-09-08** |
| 类型 | **受限职业（Limited Job）**——与青魔道士同类，是继青魔之后的**第 2 个** |
| 定位 | **近战 DPS（Melee DPS）** |
| 日文名 | **魔獣使い** |
| 简中名 | **驯兽师**（媒体口径） |
| 起始等级 | **Lv1** |
| 等级上限 | **Lv50** |
| 共用装备 | **武僧 / 武士** 的装备 |
| 武器 | **单手斧（Hand Axe）** 系列 + **盾（Hoplon）** |
| 对应基础职业 | **无**（无 class） |
| 解锁任务 | **Strangers in the Wood**（战斗/魔法职业 Lv50，New Gridania X:11.8 Y:13.6，NPC: Excited Adventurer）<br>前置：主线 **The Ultimate Weapon** |
| 职业任务 | 共 **9 段**，等级节点 **1 / 8 / 18 / 30 / 40 / 50**；其中**部分任务需要先通关斗兽奇弈的某个棋盘** |
| 灵魂水晶 | **Soul of the Beastmaster**（描述特殊："Unlike other soul crystals, the surface of this multi-aspected stone has yet to be carved with the record of past deeds."） |
| 剧情定位 | **Kornago** 一族——重视"人与兽之间的情感与灵性纽带" |
| 文本命令 | `/beastsize`（=`/beastpetsize`，调整召唤兽大小，仅自己可见；可 `all`）<br>`/bestiary`（=`/bstbook`，打开 Master's Bestiary） |
| New Game+ | 新增 **Beastmaster (Limited Job) — Beastmaster Quests** 章节 |

> ⚠ **仅二手来源、未获官方文本核实的细节**：中文媒体称"最多可捕获 **50 种**魔兽、战斗中可召唤 **1** 只、可在 **3** 只预设魔兽间切换、每只魔兽有 **3** 个专属技能"。[17173 2026-09-10](https://news.17173.com/content/09102026/094329832.shtml)
> ⚠ **术语纠正**：不存在所谓 "Beastmaster Log"。收藏系统名称为 **Master's Bestiary（魔兽图鉴）**，专属内容线为 **Crucible of the Unbroken（日文「闘獣練」）**。

【官】[Patch 7.56 Notes](https://na.finalfantasyxiv.com/lodestone/topics/detail/a8a526ad64db45c8ca8d1c7fdcce8a5eedaa18bc)
【官】[Beastmaster Job Guide](https://na.finalfantasyxiv.com/jobguide/beastmaster/)

#### 6.3.2 受限职业的具体限制（与青魔道士对比）

| 限制项 | 驯兽师 Beastmaster | 青魔道士 Blue Mage |
|---|---|---|
| 角色动作（role actions） | ❌ **不能使用** | ❌ 不能使用 ⚠ |
| FATE 经验 | ✅ **比普通职业更多** | ✅ 更多 ⚠ |
| **野外打怪经验加成** | ❌ **没有**（官方明确说明与青魔不同） | ✅ 有 ⚠ |
| 任务接受范围 | 仅限**本职业任务** + **全职业通用任务** | 同上 ⚠ |
| 雇员（Retainer） | ❌ **不能指派为驯兽师** | ❌ ⚠ |
| PvP / 决斗 | ❌ **完全不能** | ❌ 不能（但**可以进狼穴码头**） |
| 深层迷宫 | ❌ | ⚠ |
| Eureka / Bozjan Southern Front / Occult Crescent | ❌（**进入副本后也不能切换**） | ⚠ |
| Variant & Criterion Dungeons | ❌ | ⚠ |
| Ultimate Raids | ❌ | ⚠ |
| Duty Roulettes | ❌ | ❌ ⚠ |
| Squadron Missions | ❌ | ⚠ |
| Stone, Sky, Sea | ❌ | ⚠ |
| Hall of the Novice | ❌ | ⚠ |
| **可以参加** | **与其他玩家组成预组队 / 无限制队伍（unrestricted parties）打副本** | 类似 ⚠ |

> **关键结论**：驯兽师是一个**"只能在开放世界 + 预组队副本 + 专属单人玩法"中存在的职业**。它被明确排除在所有"随机匹配型"与"长尾探索型"内容之外。这意味着它的**全部深度都集中在 Crucible of the Unbroken 这一个玩法上**。

#### 6.3.3 核心系统：结契（Befriending Beasts）

| 动作 | 效果 |
|---|---|
| **Gauge（评估）** | 评估目标野兽**能否结契**，以及**难度** |
| **Capture（捕获）** | 对目标施加特定状态效果；**在该状态下击败野兽即完成结契**<br>**先削弱目标可提高成功率**；但**仍可能失败** |
| **Master's Bestiary（主人图鉴）** | 结契后加入图鉴；可查看**独特能力、栖息地**等；也可在 Lodestone 角色页查看 |
| **Kornago Gourds（科纳戈葫芦）** | **无需战斗即可结契**；用 **remnants of resilience（韧性残渣）** 兑换；葫芦种类**随职业任务完成度增加** |

**召唤机制**：

- 在 Master's Bestiary 中通过子命令把野兽**指派到 battlehorn（战斗号角）**
- 使用 **Battlehorn 动作**召唤；**同时只能召唤 1 只**
- 可通过 "Edit Appearance" 调整召唤兽**大小**（仅自己可见，也可用文本命令）

#### 6.3.4 战斗系统：本能连锁（Instinctual Combos）

| 概念 | 说明 |
|---|---|
| **TP** | 驯兽师与召唤兽通过特定动作积累；**≥100 TP** 可发动强力的**本能技能（instinctual skills）** |
| HUD | TP 有**专用 HUD 元素** |
| **四种本能属性** | **Volant**（飞）、**Rampant**（猛）、**Durant**（坚）、**Eldritch**（秘） |
| **Inner Compass（内心罗盘）** | 反映人与兽的协作；发动某一属性的本能技能时，对应符号亮起 |
| **本能连锁** | 在**7 秒内**由驯兽师**或**召唤兽再次发动本能技能 → 完成连锁，**造成额外伤害** |
| **有意图连锁（Intentional Combo）** | 第二次技能在罗盘上**顺时针**时完成；示例：Volant→Rampant、Rampant→Durant、Durant→Eldritch、Eldritch→Volant |
| **Sunstrider / Moonstalker** | 有意图连锁的两个分类；完成时罗盘对应侧亮起 |
| **点亮整个罗盘** | 可触发**极其强力的攻击** |
| 连锁计数 | 罗盘下方记录连锁数；**数值越高，连锁额外伤害越强** |
| 其他动作 | **Tempered Release**（命令召唤兽发动独特攻击）、**Borrow**（从召唤兽借力发动驯兽师动作） |

> **对放置游戏的启发**：**四属性循环罗盘 + 顺时针连锁 + 点亮全盘爆发** 是一套**纯组合判定**的战斗系统，非常适合做成放置游戏的"技能序列自动战斗"——玩家配置序列，系统自动判定连锁与爆发。

#### 6.3.5 Crucible of the Unbroken（未破之坩埚）★★ 本文最重要的设计样本

**这是 7.56 为驯兽师配的专属单人玩法，也是整个 FF14 中最接近"放置游戏/roguelike"的系统。**

##### 基础信息

| 项目 | 内容 |
|---|---|
| 类型 | **单人专属副本（solo experience）** |
| 解锁 | 驯兽师 **Lv30** + 完成相应职业任务 |
| 入口 | Central Shroud（X:21.9 Y:22.8）与 ??? 对话 |
| 官方定位 | "A magicked tool conceived for training purposes… a solo experience that will test your limits as a beastmaster." |
| 核心玩法 | **在特殊棋盘（board）上推进各个格子（spaces），每格有不同事件；击败最内圈的最终 BOSS 即完成该棋盘** |

##### 棋盘与队伍

| 机制 | 说明 |
|---|---|
| **棋盘（Board）** | 多个棋盘，各有布局；**Board Layout** 显示可能遇到的敌人 |
| **队伍上限** | **因棋盘而异**（the maximum allowance for team composition varies by board） |
| **队伍编成** | 从 Master's Bestiary 选择召唤兽；也可选 **"Recommended Team"** 自动编成 |
| **弱点研究** | 需要**研究敌人弱点**来配置最优队伍 |

##### 战斗规则

| 机制 | 说明 |
|---|---|
| HP | 玩家与召唤兽**各自有 HP，且不会自然回复** |
| 回复 | 必须使用**特殊道具**或**特定格子** |
| 召唤兽阵亡 | **无法再参加战斗**（不判负） |
| **玩家阵亡** | **副本失败** |
| **Snarl（咆哮）** | 职责动作：命令召唤兽**替你吸引仇恨**（通过 **Cover** 效果） |
| **Challenge（挑战）** | 职责动作：把仇恨**拉到自己身上**，并**移除召唤兽的 Cover** |
| 设计意图 | 通过这两个动作**在人与兽之间分配伤害** |

##### 道具体系（三层）

| 类别 | 说明 |
|---|---|
| **Ephemeral items（临时道具）** | 从各种格子获得；**只能在该棋盘使用**；完成或失败后**消失** |
| **Crucible items（坩埚道具）** | 可在**推进时或战斗中**使用；**每个棋盘开始时必定提供 1 个**；**最多携带 10 个**；有独立背包，可绑到快捷栏 |
| **Beast gear（野兽装备）** | **只要放在背包里就持续生效**；每个棋盘开始时必定提供 1 件；**最多携带 10 件**；**不允许重复** |
| **Feed（饲料）** | 喂食可**增强召唤兽能力与属性**；每种召唤兽可吃的量不同；**同种饲料不能重复喂**；**在 campsite（营地）格子休息的召唤兽会失去已获得的饲料效果** |

##### 计分与奖励

| 机制 | 说明 |
|---|---|
| 计分因素 | **走过的格子数**、**剩余玩家 HP** 等 |
| **奖励加成（Bonuses）** | 满足特定条件可提升分数；在 Board Layout 中 "View Bonuses" 查看条件 |
| 奖励产出 | **faded remnant of resilience / bright remnant of resilience**（依分数） |
| 兑换 | 交给 Central Shroud（X:21.9 Y:22.6）的 **Kornago 商人** 换取 **Kornago gourds** 或**强化驯兽师专属装备** |

##### 召唤兽成长

| 机制 | 说明 |
|---|---|
| 经验 | 随行的**所有召唤兽**按**分数**获得经验 |
| **Beast Rank** | **每 100 EXP 提升 1 级**；提升召唤兽在坩埚内的属性 |
| **最高 Beast Rank** | **25** |
| 提升属性 | **Strength**（物理伤害）、**Intelligence**（魔法伤害）、**Physical Resistance**（物理易伤）、**Magic Resistance**（魔法易伤）、**Constitution**（最大 HP） |

##### 存档与退出

| 机制 | 说明 |
|---|---|
| **暂停进度（Suspending）** | 可在**格子之间**或**已通过的格子**上保存并退出；再次进入时选 "Resume Progress" 继续 |
| ⚠ 注意 | **若在已有暂停存档时重新开始挑战，暂停存档会被删除** |
| **放弃（Forfeiting）** | 非战斗中可主动放弃；**仍按进度给分数与奖励** |

##### Crucible Mode: Degrees（难度档位）

| 机制 | 说明 |
|---|---|
| 解锁 | 完成坩埚的**全部棋盘** + 推进驯兽师职业任务 |
| 效果 | **提升敌人 HP 与伤害** |
| 档位 | **三档难度：第一度 → 第三度** |
| 奖励 | 难度越高，**分数加成越高** |

##### Crucible 排行榜（Season 1）★★

| 项目 | 内容 |
|---|---|
| 参与条件 | 必须把 **Crucible Mode 设为第三度（third degree）** 并勾选 **"Participate in rankings"** |
| 成绩记录 | **必须在本家 World（Home World）** 记录；按**物理数据中心**汇总 |
| **分数取法** | **每个棋盘取最近 3 次尝试**（Scores are aggregated from the last three attempts of each board） |
| 查看 | Central Shroud（X:21.9 Y:22.8）与 ??? 对话查看当前 Crucible Ranking Score |
| **Season 1 期间** | **2026-09-24（周四）→ Patch 7.58 上线** |
| Preseason | Season 1 之后进入 **Preseason**，期间**暂停排名参与**；Preseason 一段时间后开始 Season 2 |
| 奖励范围 | 每个物理数据中心**前 300 名**（经 Moogle 快递发放） |

**Season 1 排名奖励**：

| 名次 | 奖励 |
|---|---|
| **第 1 名** | 成就 **Beast of the Best** |
| **第 1–100 名** | 成就 **Running Feral** |
| **第 1–300 名** | 成就 **Crucible Contender** → 坐骑 **Tourmaline Golem（电气石魔像）**（`Tourmaline Golem Horn`） |
| 注 | 若出现并列，奖励发放数量可能不同 |

【官】[Crucible Rankings — Season 1](https://na.finalfantasyxiv.com/lodestone/ranking/crucible/)
【官】[Patch 7.56 Notes](https://na.finalfantasyxiv.com/lodestone/topics/detail/a8a526ad64db45c8ca8d1c7fdcce8a5eedaa18bc)

> **为什么 Crucible 是整份文档里最重要的样本？**
>
> 它同时具备放置游戏副玩法所需的**全部要素**，且每一项都是官方一手数据：
> 1. **棋盘式随机推进**（roguelike 结构）
> 2. **单人、可暂停、可放弃保底**（适配"碎片时间/挂机"）
> 3. **分数取最近 3 次最佳**（降低单次运气影响，鼓励反复挑战）
> 4. **难度三档自选**（玩家自主选择风险）
> 5. **永久成长（Beast Rank 25）** + **单局成长（道具/装备/饲料）双层结构**
> 6. **明确的赛季制排行榜**（Season 1 从 2026-09-24 到 7.58）
> 7. **收集要素（Master's Bestiary 图鉴）** 提供长期目标
> 8. **专属货币（remnants of resilience）** 闭环兑换
>
> 这就是一个**完整的放置游戏副玩法原型**，而且是 2026 年 9 月刚刚上线的**最新设计**——说明 Square Enix 自己也在朝这个方向演进。

---

## 7. 每日 / 每周 / 每版本重置节奏总表

> **本节目的**：把 FF14 全部**有重置周期**的内容整理成可查表。放置游戏最需要的两类数据——「**多久可以再产出一次**」与「**离线时段能积累多少**」——都可以直接从本节的两列（*周期* 与 *是否有周限*）读出。
>
> **核实日期**：2026-09-15（Patch 7.56 上线后 7 天）。

### 7.0 三条全局重置规则（先记这个）

| 规则 | 内容 |
|---|---|
| **每日重置** | **每天 15:00 UTC** = **次日 00:00 JST** = **北京时间 23:00**。重置的是"次数"类内容（任务轮盘、狩猎日榜、Mini Cactpot）。 |
| **每周重置** | **每周二 08:00 UTC** = **周二 17:00 JST** = **北京时间周二 16:00**。重置的是"周限奖励"与"每周任务清单"。 |
| **时区速查** | JST = UTC+9；**北京时间 = UTC+8 = JST − 1 小时**。所以中文玩家看到的是"**每日 23:00 / 每周二 16:00**"——比绝大多数手游（凌晨 4–5 点重置）**更不友好**，⚠ 这一点在放置游戏设计时**必须改**（见 §7.4）。 |

**可信度**：JST 00:00 每日重置与周二 17:00 JST 每周重置为长期稳定的社区共识事实【社】；单次维护后的临时变动不计。

### 7.1 表 A｜每日重置（Daily）

| # | 内容 | 重置时点 | 产出 | 周限 | 放置友好度 |
|---|---|---|---|---|---|
| A1 | **任务轮盘 Duty Roulette**（共 9 类：Leveling / High-level / Trials / Main Scenario / Alliance Raid / Normal Raid / Expert / Frontline / Guildhest） | 每日 00:00 JST | 经验、**神典石**、军票、CL 加成 | ⚠ 每日首通才有 bonus（**每日限一次/类**，非周限） | **⭐⭐⭐⭐⭐ 最适合做"每日任务"**：天然就是"每日一次、给特色奖励"的结构 |
| A2 | **狩猎日榜 Daily Hunt Marks**（各资料片主城大国防联军 NPC 发布） | 每日 00:00 JST | 军票、狩猎徽章（不同资料片各有自己的徽章） | ⚠ 每日每类 1 轮（**每日限**） | ⭐⭐⭐⭐ 可直接做成"每日讨伐任务" |
| A3 | **金碟 Mini Cactpot**（刮刮卡） | 每日 00:00 JST | MGP（3 张/日） | ⚠ 每日 3 次 | ⭐⭐⭐⭐⭐ **放置游戏的"免费每日抽奖"标准模板** |
| A4 | **兽栏 Chocobo Stable 训练** | 每 **30 分钟**恢复可训练次数（上限 **3 次**） | 训练经验 | ⚠ 上限 3 次 | ⭐⭐⭐⭐⭐ **极佳**：这是 FF14 里唯一的"**小时级**"恢复机制，最接近放置游戏手感 |
| A5 | **蛮族/同盟社会日常任务 Beast Tribe Quests** | 每日 00:00 JST | 该族货币、经验 | ⚠ 每日 **12 个**（可跨族累计；**7.56 前**受同盟社会交接任务改动影响） | ⭐⭐⭐⭐ "每日限额任务池"的现成设计 |
| A6 | **挑战日志·每日部 Challenge Log (Daily)** | 每日 00:00 JST | 经验、**MGP**、军票 | ⚠ 每日刷新 | ⭐⭐⭐⭐⭐ 见 §6.7，**放置游戏最该抄的任务框架** |
| A7 | **部队/军团行动与日常**（FC Buff 发布、Guildhest 首通） | 每日 00:00 JST | 军票 | ⚠ 每日 | ⭐⭐⭐ |
| A8 | **藏宝图采集点**（每 18 小时的**地图**产出，非角色限） | 采集点独立计时 ⚠ | 藏宝图（进周限池，见 B8） | ❌ | ⭐⭐ 实际瓶颈在周限，不在日内 |

**关键结论（A）**：FF14 的每日重置**几乎全部是"次数限制"而非"收益上限"**。这对放置游戏是好消息——可以直接翻译成"每日 N 次免费结算"，不需要为每日单独做一套数值。

### 7.2 表 B｜每周重置（Weekly）

| # | 内容 | 重置时点 | 产出 | 周限 | 放置友好度 |
|---|---|---|---|---|---|
| B1 | **任务轮盘周限类**（Alliance Raid / Normal Raid / Expert / Frontline 等的**神典石周限**） | 周二 17:00 JST | 神典石 | ✅ 见 B5 | ⭐⭐⭐⭐ |
| B2 | **天书奇谭 Wondrous Tails** | 周二 17:00 JST | 贴纸（9 格）；交回给**随机 1–3 行**奖励（经验、神典石、MGP 券） | ✅ **每周 1 本**（未交回的书可保留） | **⭐⭐⭐⭐⭐ 最佳周常模板**：随机 9 格 + 连线成行的"再抽一次"快感，**放置游戏必抄** |
| B3 | **狩猎周榜 Weekly Hunt Marks**（"精英/传说"级标记怪） | 周二 17:00 JST | 狩猎徽章（大量）、**神典石** | ✅ 每周每类 1 轮 | ⭐⭐⭐⭐⭐ 典型的"每周大怪" |
| B4 | **大国防联军狩猎 Weekly GC Hunt**（军团 NPC 发布） | 周二 17:00 JST | 军票、徽章 | ✅ 每周 | ⭐⭐⭐⭐ |
| B5 | **神典石周限 Allagan Tomestones** | 周二 17:00 JST | **⚠ 7.56 起：周上限由 450 提升至 900**（本文档 §8.1 已记）；当前版本神典石为**记忆神典石（Mneme）** | ✅ **硬周限** | ⭐⭐⭐⭐ **"每周上限"是放置游戏最核心的离线上限设计**——它决定"一周最多能攒多少"，是数值策划的第一根锚 |
| B6 | **PvP Series 每周挑战 + Series EXP** | 与每周重置同步 + **每场比赛** | Series EXP（**任意 PvP 玩法都产出**）、**狼印**、**战利水晶** | ⚠ Series 本身**无周限**（是赛季累计），但**每周挑战**有 | ⭐⭐⭐⭐ 见 §1.6；⚠ 7.56 起为 **Series 12**，持续至 8.0 上线 |
| B7 | **狼印 / 战利水晶 周限**（PvP 代币的兑换与部分获取） | 周二 17:00 JST | 狼印（Wolves' Den 相关）、战利水晶（CC 相关） | ⚠ 部分有 | ⭐⭐⭐ |
| B8 | **藏宝图 Treasure Maps**（**每周每角色可获得的"进图次数"上限**） | 周二 17:00 JST | 素材、坐骑、**稀有掉落** | ✅ **每周上限**（具体次数因地图类型而异 ⚠ **待核**） | ⭐⭐⭐ 天然是"每周一次的高随机奖励" |
| B9 | **部队/军团生产与交付**（部队工房、军队筹备） | 周二 17:00 JST | 军票、部队点数 | ✅ 每周 | ⭐⭐⭐⭐ |
| B10 | **定制交付 Custom Deliveries**（NPC 每周限量订单） | 周二 17:00 JST | **黄票/白票**（收藏品票据）、经验 | ✅ **每周每 NPC 上限**（⚠ 具体数值随版本变动，**待核**） | ⭐⭐⭐⭐⭐ **"每周限量高价订单"是放置游戏生产线的标准终局** |
| B11 | **挑战日志·每周部 Challenge Log (Weekly)** | 周二 17:00 JST | MGP、经验、军票 | ✅ 每周 | ⭐⭐⭐⭐⭐ |
| B12 | **幻巧战 Unreal**（每周轮换 BOSS） | 周二 17:00 JST | **伪神典石/幻巧战专属代币**（可换坐骑、素材） | ✅ 每周 **2 次**通关奖励 ⚠ | ⭐⭐⭐⭐⭐ **"每周轮换 BOSS"是成本极低的复用型内容**，放置游戏必抄（见 §6.8） |
| B13 | **宇宙探索 Cosmic Exploration**（任务与开发进度） | 周二 17:00 JST | 宇宙探索货币、研发进度 | ⚠ 部分任务有周限 | ⭐⭐⭐⭐ 见 §4.5 |
| B14 | **奥斯库兰特 Occult Crescent**（Forked Tower 战利品与部分获取） | 周二 17:00 JST | 亚拉戈神典石、幻影武器素材 | ⚠ **知识等级上限本身是"每版本"而非每周**（见 C7）；Forked Tower 有周限 ⚠ | ⭐⭐⭐⭐ |
| B15 | **零式周限（AAC Heavyweight Savage 等）** | 周二 17:00 JST | 零式装备、**武器箱/饰装箱**、书页 | ⚠ **7.56 已取消周限奖励与周入场限制**（本文档 §8.1 已记）→ **现在是"无限刷"** | ⭐⭐⭐ **注意**：这是 FF14 罕见的"**末期解禁**"操作。放置游戏可借鉴为"**赛季末期解禁**"，但**不应在首期就做无周限** |
| B16 | **同盟 RAID 周限**（含 **Windurst: The Third Walk**，7.56 加入轮盘随机） | 周二 17:00 JST | 同盟 RAID 装备（周限 1 件/周 ⚠） | ✅ | ⭐⭐⭐ 末期通常解禁 |
| B17 | **Variant / Criterion 相关周限**（笔记/掉落） | 周二 17:00 JST | 变体笔记、坐骑等 | ⚠ 部分 | ⭐⭐⭐ |
| B18 | **同盟社会收官任务 / 伊修加德复兴 / 多玛飞地纳品** | 周二 17:00 JST | 各专属货币 | ✅ 每周 | ⭐⭐⭐ |
| B19 | **金碟时尚品鉴 Fashion Report** | 周二 17:00 JST | MGP（**评级越高越多**，S 级满额） | ✅ 每周 1 次 | ⭐⭐⭐⭐⭐ **"每周一次、按分数发奖"的周常**，放置游戏做"每周外观挑战"可直接抄 |
| B20 | **金碟 Jumbo Cactpot**（大型仙人掌彩券） | **每周六 21:00 JST 开奖**（每日 21:00 JST 前可买） | MGP（**一等奖 100 万 MGP**） | ✅ 每周每人 3 张 | ⭐⭐⭐⭐⭐ **"每周固定时点开奖"是放置游戏最强的"回访钩子"**——值得单独抄成"每周开奖"事件 |
| B21 | **青魔道士假面狂欢会 Masked Carnivale** | 周二 17:00 JST | 青魔专属代币、经验 | ✅ 每周 | ⭐⭐⭐ 受限职业专属，见 §6.2 |

**关键结论（B）**：FF14 的周常体系有**三种不同性质**，放置游戏应区分对待：

| 周常性质 | FF14 例子 | 放置化建议 |
|---|---|---|
| **① 硬上限型**（本周最多拿这么多） | 神典石周限、藏宝图周限 | 直接做成"**每周收益上限**"，是防止数值失控的核心阀门 |
| **② 任务清单型**（列清单，做完打勾） | 天书奇谭、挑战日志、PvP 每周挑战 | 直接做成"**每周任务面板**"，P0 |
| **③ 定时开奖型**（固定时点结算） | Jumbo Cactpot（周六 21:00 JST）、藏宝图 | 做成"**每周固定时点开奖**"，**回访率最高的一类** |

### 7.3 表 C｜每版本 / 每赛季 / 无重置（Per-Patch / Per-Season / No Reset）

| # | 内容 | 周期 | 产出 / 变化 | 放置友好度 |
|---|---|---|---|---|
| C1 | **PvP Series（系列）** | **每赛季（约一个大版本内 2 季）** | Series Malmstones 奖励；⚠ 7.56 起 **Series 12**，持续至 **8.0 上线**；**本季奖励须在下季结束前领取**（过期作废） | ⭐⭐⭐⭐⭐ **"过期作废"制造紧迫感**，必抄（见 §1.6） |
| C2 | **水晶冲突赛季 Crystalline Conflict Season** | **每赛季** | 段位、赛季奖励；⚠ 7.55 已由 Season 20 → **Season 21** | ⭐⭐⭐⭐ |
| C3 | **深层迷宫排行 Deep Dungeon Rankings** | **每赛季**（人工结算，赛季时长不固定 ⚠） | 排名称号、成就；⚠ **Pilgrim's Traverse 排行截至 2026-09-15 尚不确定是否已开启赛季结算** | ⭐⭐⭐⭐ 见 §3.7 |
| C4 | **破魔试炼场排行 Crucible Rankings** | **每赛季** | **Season 1：2026-09-24 开始 → 至 7.58 结束**；**取最近 3 次最佳**；前 300 名有奖励 | ⭐⭐⭐⭐⭐ **7.56 刚上线的赛季化单人玩法**，见 §6.3 |
| C5 | **零式梯队（AAC Light-heavyweight / Cruiserweight / Heavyweight Savage）** | **每版本梯队**（每梯队约 4–5 个月） | 零式装备；**7.56 起 Heavyweight 解禁周限** | ⭐⭐⭐⭐ |
| C6 | **神典石"换代"** | **每版本**（新神典石上线，旧的转为可无限刷） | 新神典石有周限；旧神典石解限 | ⭐⭐⭐⭐ **"货币换代"是常见的旧内容复活手段** |
| C7 | **知识等级 / 元素等级上限提升** | **每版本** | ⚠ Occult Crescent：**South Horn 上限 20 → North Horn（7.55）上限 40**；尤蕾卡/波兹亚各有自己的上限 | ⭐⭐⭐⭐ **"每版本抬上限"是最省力的内容延长法** |
| C8 | **幻影武器（Phantom Weapons）长链** | **跨多个补丁**（7.2x 起步 → **7.55 完结**） | 多阶段成长武器；进度**跨角色共享** | ⭐⭐⭐⭐⭐ **超长线目标**，必抄（见 §4.4） |
| C9 | **宇宙探索 Cosmic Exploration** | **每版本推进** | 科技树 / 研发进度 | ⭐⭐⭐⭐ |
| C10 | **岛屿庇护所 Island Sanctuary** | **无重置**（一次性推进，等级 1–20 ⚠） | 岛屿等级、图鉴、坐骑 | ⭐⭐⭐⭐⭐ **无重置的离线生产线**，最纯粹的放置内容（见 §6.1） |
| C11 | **部队潜艇 / 飞空艇** | **无重置**（按真实小时出航，可同时开多条） | 素材、稀有掉落、**部队点数** | ⭐⭐⭐⭐⭐ **最纯粹的离线派遣**（见 §6.4） |
| C12 | **雇员探险 Retainer Ventures** | **无重置**（按真实分钟/小时计时，可同时派多名雇员） | 素材、**装备/道具**（探索型）、经验 | ⭐⭐⭐⭐⭐ **"多单位并行离线派遣"的标准模板**——放置游戏必抄 |
| C13 | **收藏品交付 / 票据（黄票·白票）** | **每周限量**（见 B10）+ 无上限部分 | 黄票（Gathering）/ 白票（Crafting）→ 换素材与装备 | ⭐⭐⭐⭐⭐ **"生产 → 交付 → 换票 → 换稀有素材"是放置游戏生产线的完整闭环** |
| C14 | **季节活动 Seasonal Events** | **每年 1 次**（现实节日：新年、情人节、春季节、夏季节、万圣节、圣诞节等） | 限定坐骑、外观、家具、**MGP** | ⭐⭐⭐⭐⭐ **"现实节日限定"是留存利器**；⚠ 但**每年只来一次**，放置游戏应改为**更高频的"游戏内历法"** |
| C15 | **成就 / 坐骑 / 九宫幻卡 / 青魔技能 / 钓鱼图鉴** | **无重置**（永久收集） | 收集度本身即产出 | ⭐⭐⭐⭐⭐ **收集清单 = 无限长线**（见 §9.1 D 类） |
| C16 | **慈善任务 / 各类"一次通关"成就** | **无重置** | 一次性奖励 | ⭐⭐⭐ |
| C17 | **金碟 MGP 累积与兑换** | **无重置**（MGP 是永久货币） | 坐骑、家具、外观 | ⭐⭐⭐⭐ 天然是"无上限的副货币池" |

### 7.4 从 FF14 节奏到放置游戏节奏：映射结论表 ★

> 这是本节的核心产出。左列是 FF14 的真实周期，右列是建议的放置游戏周期。

| FF14 周期 | FF14 具体内容 | 建议的放置游戏周期 | 理由 |
|---|---|---|---|
| **30 分钟** | 兽栏训练（上限 3 次） | **保留 30 分钟–1 小时** | 这是 FF14 里**唯一的小时级机制**，正是放置游戏的主循环手感；**FF14 反而太少做这个**，放置游戏应**大量采用** |
| **每日（00:00 JST）** | 任务轮盘、狩猎日榜、Mini Cactpot、挑战日志每日部、蛮族日常 | **每日 04:00 或 05:00 本地时间**（**不要抄 23:00**） | 23:00 重置对上班族极不友好；主流手游用凌晨 4–5 点，玩家睡前做的任务还能算"今天" |
| **每周（周二 17:00 JST）** | 天书奇谭、周常狩猎、挑战日志每周部、时尚品鉴、定制交付 | **每周一 04:00 本地时间**，或**压缩为 3 天** | 见 §9.7「MMO 的每周重置对放置游戏可能太慢」；建议默认 **3 天**、可配置 |
| **每周定时开奖** | **Jumbo Cactpot（周六 21:00 JST）** | **保留**，做成"**每周固定时点开奖**" | 独立于任务重置的第二个回访钩子；时点应选**周末晚 20:00–21:00 本地时间** |
| **每赛季（约 2–4 个月）** | PvP Series、CC Season、深层迷宫排行、Crucible Rankings | **每赛季 6–8 周** | 比 FF14 快（FF14 一季约 3–4 个月），保证赛季奖励能持续兑换 |
| **每版本（约 4–5 个月）** | 零式梯队、神典石换代、知识等级上限提升、遗物武器阶段 | **每"资料片"6–9 个月**，中间用赛季填充 | 放置游戏的"大版本"应同时承担**内容批量投放**与**数值抬上限**两件事 |
| **每版本末期解禁** | **7.56 取消 AAC Heavyweight 零式周限** | **做，但只在赛季末 2 周** | 让落后玩家追进度；⚠ 若全程开放则周限失去意义 |
| **无重置** | 岛屿庇护所、潜艇、雇员探险、收集图鉴 | **保留无重置** | 这是"**长线稳态产出**"，与周期内容形成互补 |
| **现实节日** | 季节活动（每年 1 次） | **改为游戏内历法，每 6–8 周一次** | 现实节日太稀疏；改用"游戏内节日"可做 6 倍频次 |

**三条最重要的结论**：

1. **三层节奏结构**：FF14 的完整节奏是「**无重置的离线生产线（潜艇/雇员/岛屿）** + **每日次数型任务（轮盘/日榜/抽奖）** + **每周上限型清单（神典石/天书/挑战日志）** + **赛季级排行与奖励**」。**放置游戏应原样照搬这四层**，因为它同时解决了"上线动力"（日/周）与"离线预期"（无重置 + 周上限）两个问题。
2. **周上限是数值策划的锚**：神典石 450 → 900（7.56）这个数字是 SE 用来控制"一个玩家一周最多推进多少"的阀门。放置游戏上线时**必须定义"离线收益上限"**，否则数值会在一周内失控。
3. **FF14 缺失的"小时级"节奏正是放置游戏的主场**：全表只有兽栏训练是小时级（A4）。放置游戏应当**把主循环放在 15 分钟–4 小时区间**，把 FF14 的日/周节奏留给"任务与上限"层。

---

## 8. 7.x → 8.0 内容时间线（含时效性判断）

### 8.1 7.x 补丁时间线

| 补丁 | 副标题 | 上线日期 | 长尾 / 特殊玩法相关内容 | 可信度 |
|---|---|---|---|---|
| **7.0** | Dawntrail | **2024-07-02** | 资料片本体；等级上限 100 | 【官】 |
| **7.05** | — | 2024-07 ⚠ | 首个零式梯队 **AAC Light-heavyweight (Savage)** | ⚠ |
| **7.1** | — | **2024-11** ⚠ | **Chaotic Alliance Raid** 首次实装（首个副本 **The Cloud of Darkness (Chaotic)**，24 人） | ⚠ 日期 |
| **7.2** | **Seekers of Eternity** | **2025-03-25** | **AAC Cruiserweight (Savage)**；新四人本；**Occult Crescent: South Horn 前置剧情** ⚠ | 【官·日期】 |
| **7.21 / 7.25** | — | **2025 年春–夏** ⚠ | **Cosmic Exploration（宇宙探索）** 上线；**Occult Crescent: South Horn（知识等级上限 20）** 上线；**幻影武器（Phantom Weapons）** 起步 | ⚠ 精确日期待核 |
| **7.3** | **The Promise of Tomorrow** | **2025 年 8 月** ⚠ | 新同盟 RAID 梯队、新四人本、新讨伐战 | ⚠ 精确日期待核 |
| **7.31** | — | 2025-09/10 ⚠ | 补丁说明确认存在 | 【官·存在性】 |
| **7.35** | — | 2025 年秋 ⚠ | ⚠ 内容未核实（历史上 x.35 常用于深层迷宫，但 7.x 的深层迷宫为 Pilgrim's Traverse，推测属 7.5 批次） | ⚠ |
| **7.4** | **Into the Mist** | **2025 年 12 月** ⚠ | **AAC Heavyweight (Savage)**；**Hell on Rails (Extreme)** 讨伐战；新四人本 | ⚠ 精确日期待核 |
| **7.45** | — | **2026-03-10** | **Variant Dungeon: The Merchant's Tale**<br>**Variant Dungeon (Advanced): The Merchant's Tale (Advanced)**（全新中间层）<br>**Criterion Dungeon: Another Merchant's Tale**<br>CC **Season 19** 开始<br>AAC Cruiserweight (Savage) Echo 提升至 15% | 【官】 |
| **7.5** | **Trail to the Heavens**（上篇） | **2026-04-28** | 同盟 RAID **Echoes of Vana'diel — Windurst: The Third Walk**（FF11 联动）<br>**Dancing Mad (Ultimate)** ⚠<br>**PvP Series 10 结束 → Series 11 开始**<br>CC **Season 20** 开始 ⚠ 推断<br>**深层迷宫 Pilgrim's Traverse（推测）** ⚠ 本文判断 | 【官·日期/同盟RAID/Series】；深层迷宫与 Ultimate 属 ⚠ |
| **7.51** | — | 2026-05/06 ⚠ | Tuliyollal 分线（后在 7.56 移除） | 【官·事实】 |
| **7.55** | — | **2026-07-28** | **Occult Crescent: North Horn**（知识等级上限 20 → 40）<br>**Forked Tower: Magic** + **Forked Tower: Magic (Extreme)**<br>新幻影职业（含 **Phantom Black Mage**、**Phantom Blue Mage**）<br>**幻影武器系列完结**<br>Inconceivably Further Hildibrand Adventures<br>同盟社会收官任务<br>CC **Season 20 结束 → Season 21 开始** | 【官】 |
| **7.56** | **Trail to the Heavens**（下篇） | **2026-09-08** | **受限职业 驯兽师（Beastmaster）上线**<br>**Crucible of the Unbroken（单人棋盘玩法）**<br>**Crucible Rankings Season 1（2026-09-24 起，至 7.58）**<br>**PvP Series 11 结束 → Series 12 开始**（至 8.0 上线）<br>**AAC Heavyweight (Savage)** 周限全部解除 + Echo +12%<br>**Windurst: The Third Walk** 加入同盟 RAID 随机任务<br>**记忆神典石周上限 450 → 900**<br>Forked Tower: Magic 延长时间改为离场时扣除<br>Central Shroud 等多重野外实例 | 【官】 |
| **7.58** | — | 🟡 **未公布日期** | 官方已在 7.56 补丁说明中预告存在（Crucible Rankings Season 1 的终点）；内容未知 | 【官·存在性】 |

**7.x 关键副标题**：

| 补丁 | 英文副标题 | 中文暂译 |
|---|---|---|
| 7.2 | Seekers of Eternity | 永恒之追寻者 |
| 7.3 | The Promise of Tomorrow | 明日的承诺 |
| 7.4 | Into the Mist | 遁入雾中 |
| 7.5 / 7.56 | Trail to the Heavens | 通往天际之路 / 天际的行路 |

【官】[Patch 7.3 特设站](https://na.finalfantasyxiv.com/dawntrail/patch_7_3/) / [Patch 7.4 特设站](https://eu.finalfantasyxiv.com/dawntrail/patch_7_4) / [Patch 7.5 特设站](https://na.finalfantasyxiv.com/dawntrail/patch_7_5/) / [Patch 7.56 Notes](https://na.finalfantasyxiv.com/lodestone/topics/detail/a8a526ad64db45c8ca8d1c7fdcce8a5eedaa18bc) / [Patch 7.55 Notes](https://na.finalfantasyxiv.com/lodestone/topics/detail/99b6bfb8ecac428c7d3bb37dcb84b52f1064320b) / [Patch 7.45 Notes](https://na.finalfantasyxiv.com/lodestone/topics/detail/534af9c97992897890b8dd90aacabb77c6f51450)

### 8.2 7.x 长尾内容的"投放节奏"规律

从上面的时间线可以提炼出 Square Enix 的**长尾内容投放节律**：

| 节拍 | 补丁位 | 投放内容 |
|---|---|---|
| **x.0** | 大版本本体 | 新职业、新区域、等级上限 |
| **x.05** | 首个小补丁 | 首个零式梯队（Savage） |
| **x.1** | 第一个大补丁 | **新的"实验性战斗内容"**（7.1 = Chaotic Alliance Raid） |
| **x.2** | 第二个大补丁 | **野外大型探索（第一半）** + 零式第二梯队 |
| **x.2x** | x.2 的分段补丁 | **宇宙探索 / 生产类长尾** + 探索内容推进 |
| **x.3** | 第三个大补丁 | 同盟 RAID + 新讨伐战 |
| **x.4** | 第四个大补丁 | 零式第三梯队 + 新讨伐战 |
| **x.45** | x.4 的分段补丁 | **Variant / Criterion 副本线**（7.45 实证） |
| **x.5** | 末期大补丁 | **同盟 RAID + 深层迷宫 + 绝境战（Ultimate）**（7.5 实证部分） |
| **x.5x** | 末期分段补丁 | **野外探索（第二半）+ 大型 RAID + 遗物武器完结 + 受限职业**（7.55 / 7.56 实证） |

> **对放置游戏的最大启示**：SE 采用"**深浅交替**"的投放——每个大版本内**先用探索内容（Eureka 式）铺长期成长，再用深层迷宫/受限职业提供单人可玩性，最后用遗物武器链收束全部产出**。这是一个**内容交叉引流**的成熟模板。

### 8.3 已公布未上线内容（🟡，截至 2026-09-15）

| # | 内容 | 计划时间 | 已确认细节 | 未知 / 风险 |
|---|---|---|---|---|
| 1 | **Patch 7.58** | 未公布日期 | 存在性已由 7.56 补丁说明确认；Crucible Rankings Season 1 在其上线时结束 | 内容完全未知 |
| 2 | **Gold Saucer 新玩法 Keybound Brawler（魔光键影）** | **2026-10-28** | FF7 主题的 **4 人打字（typing）小游戏**；官方称"以 FF7 为第一弹主题，未来将持续更新" | 具体规则、奖励未知 |
| 3 | **同区玩家匹配扩展** | 7.5x 起 | 匹配范围从**逻辑数据中心**扩大到**物理数据中心**；**日本先行（2026 年 10 月中）**，北美与欧洲随后 | 具体日期 |
| 4 | **8.0 Evercold** | **2027 年 1 月** | 见 §8.4 | 具体日期 |
| 5 | **8.1：陆行鸟可加入副本队伍** | 8.1 | 可召唤搭档陆行鸟协助地下城 | 日/中媒体与 SE 英文稿口径分歧（见 §8.4） |
| 6 | **8.2：陆行鸟育成系统重做** | 8.2 ⚠ | 保留既有陆行鸟等级与育成评价 ⚠ | 口径冲突 |
| 7 | **"World Raid"（内部代号）** | 8.x 内，未定 | 借鉴 **Eureka** 等野外探索内容的经验，在**普通野外地图**上做新的探索型内容 | **官方明说这是开发内部暂定名，很可能变更**；规则/奖励/机制全部未公布 |

### 8.4 8.0 `Evercold` 完整公布清单（🟡 已公布未上线）

| 项目 | 内容 |
|---|---|
| 英文名 | **FINAL FANTASY XIV: Evercold** |
| 日文名 | **ファイナルファンタジーXIV: 白銀のワンダラー**（宣传语「凍てつく世界を流転する**探求者**となれ！」） |
| 中文名 | ⚠ **无官方简中/繁中定名证据**；流传译名有《白银的探求者》《白銀探求者》《银海之天舟》《永寒》 |
| 上线窗口 | **2027 年 1 月**（未公布具体日期） |
| 故事线 | 「**Godless Realms Saga**（神なき世界編）」开篇 |
| 舞台 | **第四镜像世界**（冰封世界）；威胁名为 **Solstice** |
| 等级上限 | **100 → 110** |
| **新职业** | **Bastion**（日文バスティオン）——**主坦**，武器为双持大盾 **skyltborg**；**仅能在 Evolved Mode 使用**<br>另有 **1 个远程物理 DPS**（未公布名称） |
| 新区域 | **Naglfar**（水之大陆船）、**Hringhorni**（火之大陆船） |
| 新城市 | **Fargarth**（日文ファルガルズ） |
| **新战斗系统** | **Reborn Mode**（沿用现行战斗系统）与 **Evolved Mode**（强调各职业独特性）**双模式并存**<br>**受限职业不适用这两种模式**；8.0 新职业**只能**用 Evolved Mode |
| **8 人 RAID 新难度** | **在 Normal 与 Savage 之间新增一档**（官方未公布名称）<br>难度定位：**大致相当于"极（Extreme）"或略更温和**<br>产出可成长的 **Season Gear（季节装备）**，培养后接近零式 Raid Gear 强度<br>背景数据：普通通关率 **85%**，零式 **14–20%**，梯度断层过大 |
| **Seasons（赛季制）** | 奖励与装等成长路线的框架重做 |
| **FF7 联动 8 人 RAID** | **「Beyond the Lifestream」**——FF7 Remake 三部曲联动 **8 人 RAID 系列**（**不是**联盟 RAID）<br>FF7 Remake 系列监督 **滨口直树** 与吉田同台公布<br>⚠ 二手：分 **3 部分**上线，**第一部分预计 8.01** ⚠ |
| **联盟 RAID（24 人）** | **「EVANGELION - Ghosts of Desire」**——与 khara 合作；柏林追加特别嘉宾 **前田真宏** |
| 新绝境战 | ✅ 有（未公布名称） |
| **Auto Content Balancing** | 特定区域自动按角色等级调整内容：允许不同等级段玩家匹配、副本内平衡、野外怪物等级平衡、部分奖励掉率与装等调整 |
| 主线结构 | 特定节点后**玩家可自由选择推进哪些区域的顺序** |
| **Armoury Update** | 跨职业装备/装等便利化（⚠ 二手称"装备等级随角色而非职业"，仅满级职业可用） |
| **Chocobo Companion** | 8.1：可召唤陆行鸟协助**地下城**；8.2：**育成系统重做**（⚠ 官方英文稿把两者都写在 8.1，口径冲突） |
| 角色个性化 | **Character Action Skins**（可给通用动作如传送/回城指定替代动画；后续支持职业技能动作）<br>捏脸扩展：新调色板、眼/唇微调、眼影、部分装备部件可拆 |
| 其他 | 新副本、新讨伐战、FATE/狩猎/寻宝、**PvP 更新**、**Duty Support 更新**、新装备与制作配方 |
| 免费更新部分 | **不需要购买 8.0 也可享受**：整体游戏设计改版、**新战斗系统**、**PvP 更新**、**Duty Support 更新** |
| 平台 | PS5 / PS4 / Xbox Series X|S / **Nintendo Switch 2** / Windows / Mac / Steam |
| Switch 2 版 | **2026-08-04 正式上线**（先行体验约 1 个月） |
| 注意 | 官方注明**全部内容仍在开发中、可能变更**；部分内容会**分批随补丁追加**，购买后并非立刻全部可玩 |

【官】[Evercold 特设站（NA）](https://na.finalfantasyxiv.com/evercold/) / 【官】[Evercold 特设站（JP）](https://jp.finalfantasyxiv.com/evercold/) / 【官】[SE EU 新闻稿：BASTION 公布（2026-07-25）](https://press.es.square-enix.com/en-GB/BASTION-REVEALED-AS-FIRST-NEW-JOB-FOR-FINAL-FANTASY-XIV-EVERCOLD) / 【官】[SE NA 新闻稿（2026-04-24）](https://press.na.square-enix.com/SQUARE-ENIX-ANNOUNCES-EVERCOLD-LATEST-FINAL-FANTASY-XIV-EXPANSION-SET-)
【Wiki】[GAME Watch：8.0 内容改修（World Raid 内部代号、新难度、Season Gear）](https://game.watch.impress.co.jp/docs/news/2127865.html)
【Wiki】[RPGFan：Evercold 记者会（2026-04-26）](https://www.rpgfan.com/2026/04/26/final-fantasy-xiv-evercold-conference/)

### 8.5 对「长尾玩法」最重要的三条 8.0 情报

> 1. **"普通与零式之间"的新难度档**：这是 FF14 首次在 8 人 RAID 上做**三档难度**。对放置游戏而言，这直接验证了"**同一内容多档难度、奖励按档位缩放**"的设计价值（与 Pilgrim's Traverse 的 Quantum、Crucible 的 Degrees 同源）。
> 2. **"World Raid"（内部代号）**：SE 明确表示要把 **Eureka 式野外探索下沉到普通野外地图**。如果落地，这会是 FF14 长尾玩法的**下一次范式转移**——从"独立实例"到"主世界常驻"。**放置游戏项目应持续追踪**。
> 3. **Seasons 框架 + Auto Content Balancing**：SE 正在做**减负与框架化**。这说明"每个副玩法一套独立等级"的重模式正在被收敛。放置游戏设计时**不要为每个副玩法写死独立等级体系**，应做**统一成长框架 + 副玩法差异化产出**。

---

## 9. 面向「放置游戏」的可用性分析

> **本章是设计推导，不是 FF14 事实陈述。** 所有 FF14 侧的事实引用见前文各章节及其来源。
>
> **核实日期**：2026-09-15（Patch 7.56 上线后 7 天）。
>
> **本章结构**：§9.1–§9.7 为**总纲与决策表**（什么该抄、P0/P1 排序、风险）；**§9.8 为逐系统深度映射**——把每一个长尾系统单独拆成「FF14 系统 → 放置游戏机制 → 实现难度 → 建议优先级」四段，供开发逐条取用。

### 9.0 全量系统映射速查（先看这张）

| FF14 长尾系统 | 放置游戏机制一句话 | 实现难度 | 优先级 | 详表 |
|---|---|---|---|---|
| **深层迷宫**（PotD / HoH / Orthos / Pilgrim's Traverse） | **Roguelike 无尽塔**：独立等级、软重置、赛季排行 | 中 | **P0** ⭐ | §9.8.1 |
| **优雷卡 / 波兹亚 / 奥斯库兰特** | **独立成长岛**：进入后等级重置、独立货币与技能 | 高 | **P1** | §9.8.2 |
| **破魔试炼场 Crucible of the Unbroken**（7.56 驯兽师专属） | **棋盘 roguelike 挂机层**：编队＋独立 HP＋一次性道具＋永续装备＋计分赛季 | 中 | **P0** ⭐⭐ 重点 | §9.8.3 |
| **岛屿庇护所 / 宇宙探索** | **离线生产设施**：按真实时间推进，上线收菜 | 低 | **P0** | §9.8.4 |
| **水晶冲突 / 前线 / 同盟突袭** | **异步 PvP**：用他人配置快照当对手 | 中高 | **P1** | §9.8.5 |
| **Variant / Criterion** | **可选难度副本**：分支路线 + 三档难度 | 低（Variant）/ 高（Criterion） | **P1 / P2** | §9.8.6 |
| **青魔道士 / 驯兽师（受限职业）** | **独立规则的支线玩法**：独立技能池、独立等级 | 中 | **P1** | §9.8.7 |
| **幻境/幻影武器（Relic）长链** | **超长线至尊目标**：多阶段、跨系统素材、全局可见 | 低（机制）/ 高（数值） | **P0** | §9.8.8 |
| **部队潜艇 / 雇员探险** | **多单位并行离线派遣** | 低 | **P0** | §9.8.9 |
| **天书奇谭 / 挑战日志 / 定制交付** | **每周任务面板 + 每周限量订单** | 低 | **P0** | §9.8.10 |

**MVP（首期）范围建议 = P0 的六项：** ① 深层迷宫式无尽塔 ② **Crucible 式棋盘挂机层**（7.56 新设计的直接移植） ③ 离线生产设施（岛屿/宇宙二选一） ④ 多单位离线派遣（雇员/潜艇） ⑤ 超长线至尊目标（Relic 式） ⑥ 每周任务面板 + 每周限量订单。**这六项全部是「低–中实现难度 + 高留存贡献」。**

### 9.1 总原则：什么该抄，什么不该抄

FF14 的长尾系统分为三类，对放置游戏的价值完全不同：

| 类型 | FF14 例子 | 放置化价值 | 理由 |
|---|---|---|---|
| **A. 离线生产型** | 岛屿庇护所、部队潜艇、宇宙探索 | ⭐⭐⭐⭐⭐ | 天然就是"离线时间 → 产出"，几乎可直接移植 |
| **B. 独立成长闭环型** | 深层迷宫、Eureka/Bozja/Occult Crescent、Crucible | ⭐⭐⭐⭐⭐ | 自带"独立等级 + 独立装备 + 独立货币"的完整闭环 |
| **C. 技巧/操作型** | PvP、绝境战、零式、Criterion | ⭐⭐ | 依赖即时操作，必须**异步化/数值化**才能移植 |
| **D. 收集清单型** | 青魔道士、九宫幻卡、坐骑 | ⭐⭐⭐⭐ | 收集进度条是最容易做的长线留存 |
| **E. 周期任务型** | 天书奇谭、挑战日志、定制交付 | ⭐⭐⭐⭐⭐ | 直接就是"每日/每周任务"模块 |

**结论**：**A + B + E 是首期就该做的**；D 是第 2 期；C 需要重新设计，属于第 3 期或不做。

### 9.2 核心映射表（长尾玩法 → 放置游戏副玩法）

| # | FF14 长尾玩法 | 放置游戏副玩法形态 | 离线收益设计 | 优先级 | 依据章节 |
|---|---|---|---|---|---|
| 1 | **深层迷宫**（PotD / HoH / Orthos / Pilgrim's Traverse） | **Roguelike 挂机层数塔** | 离线时自动按"历史最高层 × 通关率"推进；上线领取累积宝藏（对应 Accursed Hoard 待鉴定箱） | **P0 首期** | §3 |
| 2 | **Crucible of the Unbroken**（驯兽师单人棋盘） | **棋盘/格子式 roguelike 挂机** | 离线自动走格子，遇到战斗按队伍战力自动结算；上线看结果、开临时道具、选下一局 | **P0 首期** | §6.3 |
| 3 | **岛屿庇护所** | **离线生产设施** | 工坊按真实时间生产，**离线也产出**；上线领取 / 调整产线 | **P0 首期** | §6.1 |
| 4 | **部队潜艇 / 飞空艇** | **离线远征** | 派船按真实小时出航，上线领取带回的素材；可同时开多条航线 | **P0 首期** | §6.4 |
| 5 | **Eureka / Bozja / Occult Crescent** | **独立成长岛**（多张地图依次解锁） | 离线时"在该岛上挂机刷怪"，产出该岛专属货币与经验；有知识/抵抗等级与死亡掉级风险 | **P1 第二期** | §4 |
| 6 | **PvP（水晶冲突）** | **异步对面队伍** | 离线时自动打"其他玩家的防守队伍快照"，按胜率产出 Series EXP 与狼印 | **P1 第二期** | §1, §2.1 |
| 7 | **PvP Series / Malmstones** | **赛季通行证** | 免费轨 + 付费轨；Series EXP 由任意玩法产出，等级 30 级 + extra levels | **P0（框架）** | §1.6 |
| 8 | **前线（72 人三阵营）** | **每日轮换阵营战** | 每日换一张"战场"，三阵营自动混战结算；引入**第三名累积补偿** | **P2** | §2.2 |
| 9 | **同盟突袭 Rival Wings** | **公会攻城 / 载具生产** | 离线生产载具，上线投放到攻城战 | **P3** | §2.3 |
| 10 | **Variant Dungeon** | **分支选择副本** | 每日一次，玩家选路线，自动结算；不同路线不同产出 | **P1** | §5.2 |
| 11 | **Variant Dungeon (Advanced)** | **"继续/结算"连战** | **每层可选结算或继续**，继续则收益累加但失败损失更大 | **P0（机制）** | §5.3 |
| 12 | **Criterion Dungeon** | **高难四人挑战** | 需手动配置队伍与技能，非挂机内容；提供"极限通关"目标 | **P2** | §5.4 |
| 13 | **天书奇谭 / 挑战日志** | **每周任务面板** | 每周重置的任务清单，完成后给"抽奖券" | **P0** | §6.6, §6.7 |
| 14 | **遗物武器长链** | **多阶段装备成长** | 每阶段需求大量素材；素材来自各副玩法产出（**交叉引流**） | **P0** | §6.5 |
| 15 | **青魔道士技能学习** | **技能收集（打怪学技能）** | 离线挂机时，有概率"看到敌人使用某技能并学会" | **P1** | §6.2 |
| 16 | **驯兽师结契（Capture）** | **宠物/召唤兽收集** | 离线时对目标野兽"结契"，成功率随削弱程度提升 | **P1** | §6.3 |
| 17 | **幻影职业 + Phantom Mastery** | **副职业系统** | 每个副职业满级后给**永久全局加成**；掌握越多加成越强 | **P1** | §4.3.3 |
| 18 | **元素等级 / 知识等级 + 死亡掉级** | **挂机风险机制** | 挂高级怪收益高，但死亡有概率掉级掉进度 | **P1** | §4.3.2 |
| 19 | **Unreal 幻巧战** | **每周轮换 BOSS** | 每周换一个 BOSS，首杀/周常给额外奖励 | **P1** | §6.8 |
| 20 | **Cosmic Exploration** | **第二套离线生产**（科技/机甲线） | 与岛屿庇护所形成"农业线 vs 工业线"双生产体系 | **P2** | §4.5 |
| 21 | **九宫幻卡 / 金碟** | **小游戏合集 + 卡牌收集** | 挂机间隙的轻量玩法；卡牌来自各副本产出 | **P2** | §6.9 |
| 22 | **Evercold "World Raid"（未上线）** | **待观察** | SE 自己正在把"尤蕾卡式野外探索"下沉到普通野外地图，值得追踪 | **观察** | §8 |

### 9.3 首期（P0）建议：五个副玩法

基于"实现成本 / 留存贡献 / FF14 一手数据完整度"三维度，建议首期做这五个：

#### P0-1 深层迷宫 = Roguelike 挂机层数塔

| 要素 | 设计 |
|---|---|
| 结构 | 无限层（或 1–200 层），每 10 层一个 BOSS 检查点 |
| 独立等级 | 塔内从 Lv1 起，靠塔内经验升级；与主城等级脱钩 |
| 独立装备 | "以太池"式武器/护甲，**+1 ~ +99**，靠宝箱提升，**有失败概率** |
| 离线产出 | 离线时按"最深层数 × 队伍战力"自动推进；**离线期间获得的"诅咒宝藏"需上线鉴定**（照搬 Accursed Hoard） |
| 软重置 | 卡关时可**重置层数但保留以太池强化**（照搬 §3.1.2） |
| 死亡惩罚 | 第 31 层以上全灭 → **本轮存档失效**（高风险高回报） |
| 分数榜 | 单人/组队分开；分数 = 最深层数 + 击杀数 |

**为什么首期做**：这是 FF14 里**最成熟、资料最完整、机制最接近放置游戏**的系统，且有 4 个不同版本的现成参考设计。

#### P0-2 Crucible 式棋盘 = 单局 roguelike 挂机

| 要素 | 设计 |
|---|---|
| 棋盘 | 每局随机生成 N 个格子，每格一个事件（战斗/道具/商店/营地/精英） |
| 双层成长 | **单局成长**（临时道具 + 野兽装备 + 饲料，出局即失） + **永久成长**（Beast Rank 25） |
| 可暂停 | 支持"格子间保存退出、回来继续" |
| 保底 | **放弃也按进度给奖励**（照搬 "Forfeiting will still earn you a score"） |
| 难度档位 | 三档 Degrees，难度越高分数加成越高 |
| 排行榜 | **取最近 3 次最佳**，赛季制，前 300 名发限定奖励 |

**为什么首期做**：它是**2026 年 9 月刚上线的官方设计**，机制新颖且天然适配"碎片时间 + 反复挑战"，同时**单局时长可控**。

#### P0-3 岛屿庇护所 = 离线生产设施

| 要素 | 设计 |
|---|---|
| 采集 | 岛上有资源点，按时间恢复 |
| 生产 | 工坊按"议程（Agenda）"自动生产，**离线继续** |
| 加成 | **Groove（节奏）加成**：连续生产提升效率 |
| 货币 | 双货币（可无限刷的 + 限量的） |
| 建造 | 用产出升级设施 → 提升产出（**正向循环**） |
| 收集 | 动物/作物图鉴 |

**关键**：FF14 的岛屿庇护所是**真正的离线生产系统**（工坊按真实时间推进），这是所有 FF14 系统里**最直接可移植**的一个。

#### P0-4 远征（潜艇/飞空艇）= 离线派遣

| 要素 | 设计 |
|---|---|
| 航线 | 多条探索区域，各需不同时间（真实小时） |
| 配置 | 部件影响成功率和产出（FF14 的潜艇部件建造） |
| 产出 | 带回素材 + 稀有道具 |
| 节奏 | **完全离线**，上线收菜 |

**为什么首期做**：这是"**离线收益**"最纯粹的形态，实现成本极低（就是一个计时器 + 随机产出表）。

#### P0-5 赛季通行证 + 每周任务面板

| 要素 | 设计 |
|---|---|
| 赛季 | 对齐大版本节奏（3–4 个月一季） |
| Series EXP | **任意玩法都产出**（不强制某一玩法）—— 照搬 FF14 |
| 等级 | 30 级 + extra levels |
| 领取期限 | **本季奖励须在下季结束前领**（照搬 FF14 的过期机制，制造紧迫感） |
| 每周任务 | 天书奇谭式"贴纸收集"+ 挑战日志式"分类周常" |

### 9.4 第二期（P1）建议

| 副玩法 | 关键机制 | 注意点 |
|---|---|---|
| **独立成长岛**（Eureka/Bozja/Occult 式） | 独立等级 + 独立技能 + 独立装备 + 独立货币 | 工作量最大，但**是"多岛依次解锁"的天然内容扩展槽** |
| **异步 PvP** | 用其他玩家的"防守快照"作为对手 | 需要一套阵容/技能配置系统作为前置 |
| **Variant 分支副本** | 每日一次路线选择 | 收益差异要明显，否则玩家不做选择 |
| **青魔式技能收集** | 挂机时随机学会敌人技能 | 需要一个够大的"技能图鉴" |
| **幻影职业（副职业）** | 满级给永久全局加成，掌握越多越强 | 天然的"横向成长树" |
| **Unreal 式每周轮换 BOSS** | 每周换 BOSS + 周常首杀奖励 | 复用已有 BOSS 资源，成本低 |

### 9.5 需要谨慎处理 / 首期不要做的

| 系统 | 问题 | 处理建议 |
|---|---|---|
| **Criterion / 绝境战** | 依赖精确操作与团队配合 | 首期不做；如要做，改为"**战力阈值 + 概率通关**" |
| **前线 72 人** | 需要大量在线玩家才能运转 | 改为**异步阵营计分**（离线时按阵营总战力结算） |
| **同盟突袭（载具战）** | 载具生产 + 实时操作的复合体 | 拆成"**离线生产载具**"+"**异步攻城结算**"两部分 |
| **高难度限时排行榜** | 若奖励过于集中，会劝退休闲玩家 | 采用 FF14 的**"前 300 名发奖"**（而非只发前 10 名） |
| **过多独立货币** | FF14 有几十种独立货币，玩家认知负担极重 | **必须做货币合并/统一**，每个副玩法最多 2 种专属货币 |

### 9.6 从 FF14 抄来的六个"高价值机制"（与玩法解耦，可独立复用）

这六个机制在 FF14 中反复出现，且**与具体玩法无关**，可以直接移植到任何放置游戏：

| # | 机制 | FF14 出处 | 为什么值得抄 |
|---|---|---|---|
| 1 | **第三名累积补偿**（连续第 3 名 +10%，最高 +50%，第 1 名清零） | 前线 | 最优雅的连败保护，防止玩家因连续失利流失 |
| 2 | **分数取最近 N 次最佳** | Crucible（最近 3 次） | 降低单次运气的影响，鼓励反复挑战而不是"一次定生死" |
| 3 | **软重置**（进度清零，强化保留） | 深层迷宫 | 让卡关玩家有出路，同时延长系统寿命 |
| 4 | **跨角色共享进度**（第一把做满，其余免费同步） | 幻影武器 | 大幅降低多角色玩家的重复劳动 |
| 5 | **难度档位自选**（三档 Degrees / Quantum 供品） | Crucible、Pilgrim's Traverse | 让玩家自己选风险/收益曲线，一套内容覆盖多种玩家 |
| 6 | **离线待鉴定箱**（离线产出 → 上线鉴定 → 随机开箱） | 诅咒宝藏 / Accursed Hoard | 把"离线收益"变成"上线时的期待感"而不是纯数字 |

### 9.7 风险与反对意见

| 风险 | 说明 | 缓解 |
|---|---|---|
| **FF14 的长尾系统"重"** | 每个探索内容都有独立等级+技能+装备+货币，实现成本极高 | **首期只抄"结构"不抄"数量"**：一个塔 + 一个岛 + 一个远征足矣 |
| **FF14 的这些系统本身也在被简化** | 8.0 引入 "Seasons" 框架、Auto Content Balancing、Item level 绑定角色而非职业，说明 SE 自己也在做减负 | 设计时应**预留"框架化"空间**，避免为每个副玩法写死一套等级 |
| **IP 与法律** | 直接照搬名称与美术有风险 | 本文档只做**机制层面**的映射，不涉及素材 |
| **放置游戏与 MMO 的节奏差异** | MMO 的"每周重置"对放置游戏可能太慢 | 建议**压缩周期**：FF14 的 1 周 ≈ 放置游戏的 1–3 天（可配置） |
| **离线收益的"最优解固化"** | 一旦玩家算出最优挂机点，玩法就失去意义 | 用**每日轮换战场 / 每周轮换 BOSS / 随机棋盘**来保持变化 |

---

### 9.8 逐系统深度可用性分析（FF14 系统 → 放置游戏机制）

> 每条给出四段：**① FF14 系统怎么做 ② 放置游戏怎么改 ③ 实现难度 ④ 建议优先级 + 风险**。
> 难度口径：**低** = 1–2 周可交付原型；**中** = 1–2 个月；**高** = 需专门设计+长期数值调优。

#### 9.8.1 深层迷宫 → Roguelike 无尽塔（P0）

| 项 | 内容 |
|---|---|
| **① FF14 系统** | 4 个深层迷宫（Palace of the Dead / Heaven-on-High / Eureka Orthos / **Pilgrim's Traverse**）。共通机制：**独立等级**（塔内 Lv1 起）、**以太池武器/护甲 +1→+99（高等级有失败概率）**、**诅咒宝藏（Accursed Hoard）离线鉴定的待开箱**、**第 31 层以上全灭销毁存档**、**软重置（清层数保留强化）**、单人/组队分开排行（§3.1） |
| **② 放置游戏机制** | **无尽层数塔**：离线时按「历史最高层 × 队伍战力 × 通关率」自动推进；上线领取**累积的待鉴定宝藏**（开箱动画 = 上线期待感）；每 10 层 BOSS 检查点；卡关时**软重置**保留塔内强化 |
| **③ 实现难度** | **中**。核心是"离线推层模拟器"（可用单次结算公式近似）+ 随机宝藏表 + 层数曲线。**不需要战斗过程模拟**，只需要结果结算——这大幅降低成本 |
| **④ 优先级** | **P0 ⭐**。理由：FF14 里**机制最成熟、资料最完整**（4 个版本可交叉参考）、**天然单人**、**天然离线**（宝藏待鉴定） |
| **风险** | 塔内数值膨胀易失控；**必须设置层数软上限或周上限**（参考 §7.2 的"神典石周限"思路）；排行奖励应照搬 FF14 的"前 N 名"而非只发前 10 |

#### 9.8.2 优雷卡 / 波兹亚 / 奥斯库兰特 → 独立成长岛（P1）

| 项 | 内容 |
|---|---|
| **① FF14 系统** | 三代野外探索（§4.0–4.3）。**进入后原有等级/技能全部失效**：尤雷卡用**元素等级**（死亡掉经验/掉级）、波兹亚用**抵抗等级 + 自选 Lost Actions**、奥斯库兰特用**知识等级（7.55 上限 40）**+ **幻影职业与 Phantom Mastery**。各有**独立货币**（水晶/亚拉戈神典石等）与**独立装备**，装备仅在岛内生效 |
| **② 放置游戏机制** | **独立成长岛**：进入后**主城等级与装备全部归零**，从岛内 Lv1 开始刷；独立货币 + 独立技能树；**多岛依次解锁**（每版本加一座岛 = 天然内容扩展槽）；**高风险挂机**（挂高级怪收益高、死亡掉进度） |
| **③ 实现难度** | **高**。工作量最大的一个：需要**第二套完整的等级/装备/技能/怪物数值体系** |
| **④ 优先级** | **P1**（第二期）。**但建议首期就预留"多套独立成长体系"的框架**，避免后期重构 |
| **风险** | ⚠ **8.0 的 "Seasons" 框架与 Auto Content Balancing 说明 SE 自己正在收敛这种"每个副玩法一套独立等级"的重模式**（§8.5 第 3 条）。**不要为每座岛写死一套系统**，应做**统一成长框架 + 岛屿差异化产出 |
| **可复用机制** | **幻影职业满级给永久全局加成 + 掌握越多越强**（§4.3.3）——这是成本最低的"横向成长树"，**建议提前到 P0/P1 交界** |

#### 9.8.3 破魔试炼场 Crucible of the Unbroken → 棋盘 roguelike 挂机层（P0，重点）⭐⭐

> **[7.56 / 2026-09-08 上线，2026-09-15 核实]** 这是本文档**最推荐的直接移植对象**——因为它是 SE 在 **2026 年 9 月刚做出来的"单人 + 棋盘 + Roguelike + 计分赛季"复合体**，且机制本身就带"可挂机"属性。

| 项 | 内容 |
|---|---|
| **① FF14 系统** | **驯兽师（Beastmaster，受限职业）专属**内容（§6.3）。**单人进入，编队自己的野兽上棋盘**；棋盘为**格子/节点式**，逐格遭遇战斗、一次性道具、商店、精英、BOSS；**野兽各自拥有独立 HP**（不是共享血条）；**一次性道具**（临时强化，单局结束即失）；**喂食永续装备**（用饲料提升野兽，永久累积）；**计分制 + 赛季排行**（**Season 1：2026-09-24 起，至 7.58**）；**取最近 3 次最佳**计分；**放弃也按进度给分**（"Forfeiting will still earn you a score"）；三档难度（Degrees） |
| **② 放置游戏机制** | **棋盘 roguelike 挂机层**：离线时按棋盘路径**自动走格**，遇战按队伍战力自动结算；上线查看'走到的结果'、**开临时道具**、**选下一局的编队与难度**。三种成长分层：**单局临时**（一次性道具）/ **单局持久**（独立 HP 与阵容状态）/ **永久**（饲料/永续装备）。 |
| **③ 实现难度** | **中**。棋盘生成 + 事件表 + 自动结算 + 计分公式，全部是**回合制/无实时操作**，非常适合放置化；**最大工作量在"事件类型的设计量"上** |
| **④ 优先级** | **P0 ⭐⭐ 首期重点**。理由：① 官方 2026 年最新设计，说明方向正确 ② **单局时长可控**，天然适配碎片时间 ③ **"放弃也给分"是放置游戏的完美保底** ④ **"取最近 3 次最佳"直接解决随机性劝退** |
| **必抄的 5 个具体细节** | 1. **棋盘节点式而非层数式**（与 9.8.1 的塔形成玩法差异）<br>2. **独立 HP 池**（而非一队共享血条）→ 上线时能看到"某只野兽残血"的故事感<br>3. **一次性道具**（单局清空）→ 制造"这局要好好用掉"的决策<br>4. **永续装备/饲料**（跨局累积）→ 保证离线投入不白费<br>5. **放弃也给分 + 取最近 3 次最佳** → 双保底，反劝退 |
| **风险** | ⚠ **驯兽师在 7.56 曾出现"服务器崩溃"传闻，本文档 §B.3 已用一手来源核实并更正**——真实情况需按 §B.3 结论处理，不要把"崩溃"当作设计缺陷来抄<br>⚠ 棋盘 roguelike 与 9.8.1 的无尽塔**玩法重叠**，建议**二者取其一做首期核心，另一个做差异化变体**（塔=纵向深度，棋盘=横向选择） |

#### 9.8.4 岛屿庇护所 / 宇宙探索 → 离线生产设施（P0 / P2）

| 项 | 内容 |
|---|---|
| **① FF14 系统** | **岛屿庇护所**（§6.1）：资源点按时间恢复、**工坊按 Agenda 自动生产（离线继续）**、**Groove 连续生产加成**、双货币、用产出升级设施形成正向循环、动物与作物图鉴。<br>**宇宙探索**（§4.5）：7.2x 上线的**第二套生产长尾**，走**科技/研发树**路线，与岛屿形成"农业 vs 工业"的对照。 |
| **② 放置游戏机制** | **离线生产设施**：工坊/产线在真实时间内推进，**离线也产出**；上线收菜 + 调整产线；**Groove 式"连续生产加成"**鼓励玩家每天不要断；用产出升级设施形成正循环。宇宙探索可做成**第二条产线（科技树）**，与农业线并行。 |
| **③ 实现难度** | **低**（岛屿）。本质是"计时器 + 产出表 + 升级树"，是**全篇实现成本最低、收益最直接的一项** |
| **④ 优先级** | **岛屿：P0**（必做，作为离线收益的基石）；**宇宙探索：P2**（第二套产线，等第一条跑通再复制） |
| **必抄细节** | **Groove（连续生产加成）**——它把"离线收益"变成"**连续登录的奖励**"，是 FF14 里最被低估的留存机制。<br>**双货币（可无限刷 + 限量）**——限制稀有产出的闸门。 |
| **风险** | 离线生产**极易被玩家算穿最优解**（§9.7）。缓解：**每日/每周轮换高效产线**，或引入**随机订单**（照搬定制交付，见 9.8.10） |

#### 9.8.5 水晶冲突 / 前线 / 同盟突袭 → 异步 PvP（P1 / P2）

| 项 | 内容 |
|---|---|
| **① FF14 系统** | **水晶冲突**（5v5 推车，§2.1）：独立 PvP 属性、固定职业 HP 表、PvP 专属技能、段位与赛季。<br>**前线**（72 人三阵营大地图，§2.2）：每日轮换地图、**第三名累积补偿（连三 +10%，最高 +50%，第一清零）**。<br>**同盟突袭**（24v24 载具战，§2.3）：需要**生产载具**再投放战场。 |
| **② 放置游戏机制** | **异步 PvP**：用**其他玩家的配置快照**（阵容/技能/装等）作为对手，离线时自动结算胜负，产出赛季经验与专属货币。**不需要真实匹配、不需要实时战斗**。 |
| **③ 实现难度** | **中高**。**前置依赖一套"阵容/技能/装备配置系统"**——没有它就没有"快照"可打。若已有队伍编成系统，难度降为**中** |
| **④ 优先级** | **水晶冲突 = P1**（改为"异步对面队伍"，最接近可做）；**前线 = P2**（改为"每日轮换战场 + 三阵营异步计分"）；**同盟突袭 = P2/P3**（拆成"离线生产载具 + 异步攻城结算"） |
| **必抄细节** | **第三名累积补偿**（§9.6 第 1 条）——**放置游戏最该抄的连败保护**，实现成本近乎为零（一个计数器） |
| **风险** | 快照 PvP 易出现"**一个最优阵容通吃**"。缓解：**每日轮换规则/禁用位/地图**；照搬 FF14 的**每日轮换前线地图** |
| **法律/合规** | 用他人快照作对手需注意**隐私与数据展示边界**（只展示配置，不展示身份） |

#### 9.8.6 Variant / Criterion Dungeon → 可选难度副本（P1 / P2）

| 项 | 内容 |
|---|---|
| **① FF14 系统** | **三层结构**（§5.1）：**Variant**（1–4 人可变队伍、**12 条分支路线**、有"探索/笔记"收集）→ **Variant (Advanced)**（7.45 新增中间层，**每层可选"继续"或"结算"**）→ **Criterion**（**无匹配、必须预设队伍**，含 Savage 版与"无死亡通关"极限版）。 |
| **② 放置游戏机制** | **Variant = 每日一次的分支路线选择**：玩家选路线、自动结算、不同路线不同产出 → 变成"**可选的收益路线**"。<br>**Variant (Advanced) = "继续 or 结算"赌注机制**：继续则收益累加、失败损失更大（§9.6 第 5 条难度档位的近亲）。<br>**Criterion = 战力阈值挑战**：首期不做实时操作，改为"**配置达标 + 概率通关**"。 |
| **③ 实现难度** | **Variant：低**（一张路线图 + 产出表）；**Criterion：高**（需要精细的阈值与队伍配置设计） |
| **④ 优先级** | **Variant = P1**；**Variant (Advanced) 的"继续/结算"= P0 机制**（可直接用在塔与棋盘上）；**Criterion = P2 或不做** |
| **必抄细节** | **"继续 / 结算"二选一**——极低成本、极高张力，是放置游戏里少见的"**主动决策点**"，能有效对抗"放置游戏没有决策"的批评 |
| **风险** | 若各路线收益差异不明显，玩家不会去选择，机制即失效（§9.4 已记） |

#### 9.8.7 青魔道士 / 驯兽师（受限职业）→ 独立规则的支线玩法（P1）

| 项 | 内容 |
|---|---|
| **① FF14 系统** | **受限职业（Limited Job）**概念：**不能用于主线随机匹配**，但拥有**独立规则的深度内容**。<br>**青魔道士**（§6.2）：**打怪学技能**（学到的技能组成自定义技能栏）+ **假面狂欢会 Masked Carnivale**（每周的青魔专属解谜战）。<br>**驯兽师**（§6.3，7.56 新增）：**结契（Capture）野生野兽**培养 + 专属 **Crucible** 棋盘玩法。 |
| **② 放置游戏机制** | **独立规则的支线玩法**：一个**不参与主循环**的副玩法，拥有自己的**技能收集池**与**专属关卡**。<br>**技能收集 = 离线挂机时有概率"看到敌人使用某技能并学会"**——把"收集图鉴"与"离线产出"绑定。<br>**结契 = 宠物收集**：离线时对目标"结契"，**成功率随削弱程度提升**（照搬 FF14 真实机制）。 |
| **③ 实现难度** | **中**。需要一套独立技能池 + 宠物收集 UI；**若已做 9.8.3 的棋盘，驯兽师部分基本免费**（同一个系统） |
| **④ 优先级** | **P1**（第二期）。**但"技能收集池"建议提前**——它是最容易做的"无限长线收集" |
| **必抄细节** | **"打怪学技能"这个收集方式**：比"打怪掉碎片"更有记忆点，且**天然解释离线产出** |
| **风险** | ⚠ **受限职业在 8.0 明确"不适用 Reborn / Evolved 两种战斗模式"**（§8.4）——说明 SE 把受限职业当作**长期平行体系**而非临时实验。放置游戏做"独立规则支线"是**被官方路线背书的** |

#### 9.8.8 幻境/幻影武器（Relic）长链 → 超长线至尊目标（P0）

| 项 | 内容 |
|---|---|
| **① FF14 系统** | §4.4 / §6.5：**跨多个补丁的多阶段成长武器**（7.2x 起步 → **7.55 完结**）；每阶段需要**来自不同长尾系统**的素材；**进度跨角色共享**（第一把做满，其余角色免费同步） |
| **② 放置游戏机制** | **超长线至尊目标**：一条**跨越全部副玩法**的成长链。每个阶段要求"某座塔的第 N 层素材 + 某座岛的产物 + 异步 PvP 的赛季货币 + 每周限量订单产物"——**用一条链把所有副玩法串起来（交叉引流）**。 |
| **③ 实现难度** | **低（机制）/ 高（数值）**。机制上只是"需求清单 + 进度条"；**真正的难点是数值**——要让整条链的时长落在 **6–12 个月**且不劝退 |
| **④ 优先级** | **P0**。理由：**这是唯一能把所有离线产线"变现"的出口**。没有它，离线收益只是数字；有了它，离线收益就有了**全局唯一的终极去处** |
| **必抄细节** | **跨角色共享进度**（§9.6 第 4 条）——若游戏有"重生/多角色"，这一条能**大幅降低重复劳动厌恶** |
| **风险** | 长链容易变成"**每日打卡地狱**"。缓解：**允许追赶机制**（照搬 7.56 的"零式解禁 + Echo"思路：**后期降低前置要求或提高产出**） |

#### 9.8.9 部队潜艇 / 雇员探险 → 多单位并行离线派遣（P0）

| 项 | 内容 |
|---|---|
| **① FF14 系统** | **雇员探险（Retainer Ventures）**：可同时派**多名雇员**外出，按**真实分钟/小时**计时回归，带回素材与装备（探索型）。<br>**部队潜艇 / 飞空艇**（§6.4）：需要**建造部件**（4 个部位，影响成功率与产出），按真实小时出航，可同时开**多条航线**，带回稀有素材与部队点数。 |
| **② 放置游戏机制** | **多单位并行离线派遣**：N 个"单位"（雇员/潜艇/陆行鸟）各自选择**目的地 + 时长**，到点回归；**部件/装备影响成功率与产出**；单位本身可升级解锁更长/更赚的航线。 |
| **③ 实现难度** | **低**。本质是"**计时器 × N + 随机产出表 + 成功率修正**"，是全篇**性价比最高**的一项 |
| **④ 优先级** | **P0**。这是"**离线收益**"最纯粹的形态，也是放置游戏的**标志性系统**，必须首期有 |
| **必抄细节** | **"部件组合影响产出"**（潜艇 4 部位）——把简单的"派遣"变成**有配置深度**的派遣，避免玩家无脑选最长时长 |
| **风险** | 派遣时长过长会导致"上线没事做"。建议**阶梯时长**：**15 分钟 / 1 小时 / 4 小时 / 8 小时 / 12 小时**并存，让玩家按自己的上线频率选 |

#### 9.8.10 天书奇谭 / 挑战日志 / 定制交付 → 周期任务系统（P0）

| 项 | 内容 |
|---|---|
| **① FF14 系统** | **天书奇谭**（§6.6）：每周一本 **9 格**的书，完成指定内容贴一格，9 格贴满后交回，奖励按**随机 1–3 行连线**发放。<br>**挑战日志**（§6.7）：**分部门的每日/每周成就清单**（战斗/生产/采集/PvP/金碟等各有独立清单）。<br>**定制交付**（§6.5/§6.10）：**每周限量的高价收藏品订单**，交付后给黄票/白票。 |
| **② 放置游戏机制** | **每周任务面板 + 每周限量订单**：<br>① **天书式**：9 格随机贴纸 + 连线，**随机连线数决定奖励档位**（低概率拿满 3 行 = 抽奖感）<br>② **挑战日志式**：分类周常（战斗/生产/采集/PvP），**每类完成给该类的专属奖励**<br>③ **定制交付式**：每周有限量的"高价订单"，**用产线产物换稀有货币**——把离线生产直接接到周常上 |
| **③ 实现难度** | **低**。全部是"任务清单 + 打勾 + 发奖"，无新玩法逻辑 |
| **④ 优先级** | **P0**。这是**成本最低、留存贡献最高**的一类，且与 §7 的节奏表完全对应 |
| **必抄细节** | **"随机连行数"**：把一个确定性的清单变成**一次开奖**，是 FF14 最精巧的小设计（§7.2 结论 ③） |
| **风险** | ⚠ **任务清单过多会产生"打卡压迫感"**（FF14 本身就有此批评）。缓解：**限制每日任务数量（≤5 个）**，并**允许跳过/兑换**未完成任务 |

### 9.9 落地顺序总结（把 §9.8 压成一条时间线）

| 阶段 | 做什么 | 对应 §9.8 小节 | 核心判断依据 |
|---|---|---|---|
| **MVP（首期）** | ① **棋盘 roguelike 挂机层**（Crucible 式，含"放弃也给分"）<br>② **无尽塔**（深层迷宫式，含软重置 + 待鉴定箱）<br>③ **离线生产设施**（岛屿式，含 Groove 连续加成）<br>④ **多单位离线派遣**（雇员/潜艇式，含部件配置）<br>⑤ **周期任务系统**（天书式 9 格 + 挑战日志式分类周常 + 定制交付式限量订单）<br>⑥ **超长线至尊目标**（Relic 式，串起全部离线产线） | 9.8.3 / 9.8.1 / 9.8.4 / 9.8.9 / 9.8.10 / 9.8.8 | 全部为**低–中实现难度**；全部**已有 FF14 一手设计可参考**；①②③④保证"离线有产出"，⑤⑥保证"上线有目标" |
| **第二期（P1）** | ⑦ **独立成长岛**（多岛依次解锁）<br>⑧ **异步 PvP**（他人快照当对手 + 第三名补偿）<br>⑨ **Variant 分支副本** + **"继续/结算"机制**<br>⑩ **受限职业支线**（技能收集 + 宠物结契）<br>⑪ **幻影职业式横向成长树**（满级给永久全局加成）<br>⑫ **每周轮换 BOSS**（Unreal 式，复用已有资源） | 9.8.2 / 9.8.5 / 9.8.6 / 9.8.7 | 需要前置系统（阵容配置、独立数值体系）或内容量较大；但都是**已验证的长期留存引擎** |
| **后续（P2+）** | ⑬ **Criterion 式极限挑战**（战力阈值 + 概率通关）<br>⑭ **前线式每日轮换阵营战**（异步计分）<br>⑮ **同盟突袭式载具攻防**（拆成生产 + 结算）<br>⑯ **宇宙探索式第二产线**（科技树）<br>⑰ **金碟式小游戏合集** | 9.8.6 / 9.8.5 / 9.8.4 / §6.9 | 依赖实时操作、需要大量在线玩家或工作量重叠；**等首期数据验证后再排** |
| **明确不做 / 需重设计** | 绝境战（Ultimate）、Criterion Savage、"无死亡通关"极限挑战 | §5.6 / 9.5 | 纯技巧型，与放置游戏核心体验冲突；如要做只能改成"战力阈值 + 概率" |

> **一句话总结**：**首期做"塔 + 棋盘 + 产线 + 派遣 + 周常 + 至尊目标"六件事**——其中 **Crucible 式棋盘（§9.8.3）是最值得优先做的单点**，因为它同时具备"单人、可挂机、有决策、有保底、有赛季计分"五个属性，且是 SE 在 **2026 年 9 月刚刚给出的最新答案**。

---

## 附录 A：来源清单

### A.1 官方一手来源（Lodestone / 官方站）

| # | 来源 | URL | 用途 |
|---|---|---|---|
| 1 | PvP Guide 索引 | https://na.finalfantasyxiv.com/lodestone/playguide/pvpguide/ | PvP 内容总览、前线地图列表 |
| 2 | **PvP Rules and Systems** | https://na.finalfantasyxiv.com/lodestone/playguide/pvpguide/system/ | PvP 属性表、通用动作表、Series Malmstones、代币 |
| 3 | **Crystalline Conflict Play Guide** | https://na.finalfantasyxiv.com/lodestone/playguide/contentsguide/crystallineconflict/ | 规则、7 张地图、段位、自定义比赛、观战 |
| 4 | Frontline Play Guide | https://na.finalfantasyxiv.com/lodestone/playguide/contentsguide/frontline/ | 72 人、每日轮换、第三名补偿 |
| 5 | Rival Wings | https://na.finalfantasyxiv.com/lodestone/playguide/contentsguide/rivalwings/ | 24v24、两张地图 |
| 6 | Wolves' Den | https://na.finalfantasyxiv.com/lodestone/playguide/contentsguide/wolvesden/ | 4v4 闭锁任务 |
| 7 | The Feast Rankings | https://na.finalfantasyxiv.com/lodestone/ranking/thefeast/ | 确认 The Feast 已全部结束 |
| 8 | **Deep Dungeon - Pilgrim's Traverse** | https://na.finalfantasyxiv.com/lodestone/playguide/contentsguide/deepdungeon4/ | 第 4 个深层迷宫全部机制 |
| 9 | Pilgrim's Traverse Rankings | https://na.finalfantasyxiv.com/lodestone/ranking/deepdungeon4/ | 排名页存在性、分数样例（Stone 100） |
| 10 | **Crucible Rankings — Season 1** | https://na.finalfantasyxiv.com/lodestone/ranking/crucible/ | 赛季期间（至 7.58）、奖励、成就 |
| 11 | **Beastmaster Job Guide** | https://na.finalfantasyxiv.com/jobguide/beastmaster/ | 驯兽师全部机制 + Crucible 全部机制 |
| 12 | **Patch 7.56 Notes** | https://na.finalfantasyxiv.com/lodestone/topics/detail/a8a526ad64db45c8ca8d1c7fdcce8a5eedaa18bc | 驯兽师上线、Series 12、Savage 周限取消、Forked Tower 时间调整、神典石上限提升 |
| 13 | **Patch 7.55 Notes** | https://na.finalfantasyxiv.com/lodestone/topics/detail/99b6bfb8ecac428c7d3bb37dcb84b52f1064320b | Occult Crescent North Horn、Forked Tower: Magic、幻影武器完结、CC Season 21 |
| 14 | **Patch 7.45 Notes** | https://na.finalfantasyxiv.com/lodestone/topics/detail/534af9c97992897890b8dd90aacabb77c6f51450 | Variant/Criterion 三层结构、CC Season 19、宇宙探索线索（Oizys） |
| 15 | Patch 7.5 Special Site | https://na.finalfantasyxiv.com/dawntrail/patch_7_5/ | 7.5 = 2026-04-28；Windurst 同盟 RAID |
| 16 | Series 11 → Series 12 | https://na.finalfantasyxiv.com/lodestone/topics/detail/2f2c083c28a8ca183d8d7d8ea7bc994f9c7886d5 | Series 交替与奖励领取规则 |
| 17 | **Evercold 特设站** | https://na.finalfantasyxiv.com/evercold/ | 8.0 全部公布特性 |
| 18 | **Square Enix 新闻稿：BASTION** | https://press.es.square-enix.com/en-GB/BASTION-REVEALED-AS-FIRST-NEW-JOB-FOR-FINAL-FANTASY-XIV-EVERCOLD | FF7 联动、Chocobo 8.1、魔光键影 2026-10-28、同区匹配 |

### A.2 社区 / 媒体来源

| # | 来源 | URL |
|---|---|---|
| 19 | RPGFan：Evercold 记者会（2026-04-26） | https://www.rpgfan.com/2026/04/26/final-fantasy-xiv-evercold-conference/ |
| 20 | GAME Watch：8.0 内容改修（World Raid 内部代号） | https://game.watch.impress.co.jp/docs/news/2127865.html |
| 21 | Gamer Escape：Variant / Criterion 分类 | https://ffxiv.gamerescape.com/wiki/Category:Variant_and_Criterion_Dungeon |
| 22 | TheGamer：The Merchant's Tale 解锁指南 | https://www.thegamer.com/final-fantasy-14-the-merchants-tale-variant-another-criterion-dungeon-unlock-guide/ |
| 23 | Icy Veins：Pilgrim's Traverse 介绍 | https://www.icy-veins.com/ffxiv/introduction-to-pilgrims-traverse |
| 24 | DualShockers：Pilgrim's Traverse 解锁与奖励 | https://www.dualshockers.com/ffxiv-how-to-unlock-pilgrims-traverse-all-rewards/ |
| 25 | RPGFan：Patch 7.21 & 7.25 回顾（宇宙探索） | https://www.rpgfan.com/episodic/final-fantasy-xiv-dawntrail-patch-7-21-7-25-relics-in-space-and-time/ |
| 26 | Lodestone Blog：6.1 PvP 技能到 8.0 战斗系统 | https://eu.finalfantasyxiv.com/lodestone/character/30639261/blog/5678976/ |
| 27 | consolegameswiki（社区 Wiki） | https://consolegameswiki.com/wiki/Patch_7.45 |
| 28 | 日文 FF14 Wiki：Pilgrim's Traverse | https://ff14wiki.info/?%E3%83%94%E3%83%AB%E3%82%B0%E3%83%AA%E3%83%A0%E3%83%BB%E3%83%88%E3%83%A9%E3%83%90%E3%83%BC%E3%82%B9 |

### A.3 中文二手来源（仅供交叉参考，**可信度中低**）

| # | 来源 | URL | 备注 |
|---|---|---|---|
| 29 | 17173：《最终幻想14》PvP第11赛季全奖励（2026-04-28） | https://news.17173.com/content/04282026/192103297.shtml | ⚠ 与官方"Series"译名口径可能不一致 |
| 30 | 17173：Patch 7.5 制作人来信直播总结（2026-04-17） | https://news.17173.com/content/04172026/221056066.shtml | ⚠ |
| 31 | 233乐园：8.0《银海之天舟》PV2 与 World Raid（2026-07） | https://www.233leyuan.com/post-detail/2081897655856947200 | ⚠ 翻译讹误风险高 |
| 32 | ali213：《最终幻想14》新资料片《银海之天舟》第二弹PV（2026-07） | https://www.ali213.net/news/html/2026-7/1026143.html | ⚠ |

### A.4 关于 8.0 中文译名的冲突（重要）

| 来源 | 给出的名称 |
|---|---|
| 官方英文 | **Evercold** |
| 官方日文 | **白銀のワンダラー** |
| 中文媒体（233乐园 / ali213 / 9game） | **《银海之天舟》** |
| 其他二手转述 | 「白银的探求者」⚠ |

> **⚠ 结论**：8.0 的**中文官方译名未能用一手来源确认**。英文 **Evercold** 与日文 **白銀のワンダラー** 均已由 Square Enix 官方站确认。若需在正式文档中使用中文名，建议**以官方简中公告为准**，或直接用英文 **Evercold**。

---

## 附录 B：不确定项与待验证清单

> 以下条目是本文**未能用一手来源确认**或**存在版本敏感性**的内容。使用前请重新核实（基准日 2026-09-15）。

### B.1 高优先级（影响核心事实）

| # | 不确定项 | 影响 | 建议核实方式 |
|---|---|---|---|
| 1 | **Pilgrim's Traverse 的确切上线补丁**（推测为 7.5，2026-04-28；7.45 补丁说明中**未**出现该深层迷宫，因此排除 7.45） | 影响 7.x 时间线 | 查 Patch 7.5 补丁说明的 "Deep Dungeon" 段落 |
| 2 | **Cosmic Exploration 的完整机制**（等级系统、货币名、产出循环、是否独立装备） | §4.5 严重不完整 | 查 7.21/7.25 补丁说明 + 官方 Play Guide |
| 3 | **Variant/Criterion 6.x 三个副本的上线补丁**（6.25 / 6.35 / 6.5 为推测） | §5.5 表格 | 查 6.25 / 6.35 / 6.5 补丁说明 |
| 4 | **6.x Criterion (Savage) 的具体规则**（是否无复活、是否一击即败、是否限时） | §5.1 / §5.4 | 查 Gamer Escape 的 Savage 条目 + 6.25 补丁说明 |
| 5 | **7.x 是否有 Criterion (Savage)**——Another Merchant's Tale 的补丁说明**只描述了普通 Criterion**，未提 Savage | §5.5 | 查 7.45 之后是否有追加 |
| 6 | **Rival Wings 两张地图的具体规则**（机甲/巡航陆行鸟/青磷引擎/列车/佣兵）与单局时长 | §2.3 | 查官方 Rival Wings 子页 /astragalos/ 与 /hidden-gorge/ |
| 7 | **7.x 是否还有更多 Variant/Criterion 副本** | §5.5 | 枚举 7.1–7.56 补丁说明 |
| 8 | **Blue Mage 当前等级上限**（需确认是 Lv80 还是已在 7.x 提升） | §6.2 | 查官方 Blue Mage Job Guide |
| 9 | **Island Sanctuary 是否在 7.x 有扩展**（已知 7.51 仍在产出 Gil，但未见新内容） | §6.1 | 查 7.x 补丁说明 |

### B.2 中优先级

| # | 不确定项 | 说明 |
|---|---|---|
| 10 | **Series 1–10 的精确起止补丁与日期** | 本文只确认了 11 → 12 |
| 11 | **各 Crystalline Conflict 竞技场的上线补丁** | 特别是 Archeia Harmonias 的批次 |
| 12 | **Collar Quartermaster 的用途** | 该 NPC 存在于狼穴码头，但 PvP Guide 正文未说明 |
| 13 | **决斗（Duels）的完整对手名单与触发方式** | 官方 PvP Guide 未列出 |
| 14 | **Wolves' Den "Closed Duties" 当前是否仍自动匹配** | 官方仅描述为 "4 vs 4 arena battles" |
| 15 | **Chaotic Alliance Raid 在 7.x 是否追加第二个副本**及其周限规则 | |
| 16 | **Evercold "Seasons" 系统的细节**（是否取代 Series / 是否影响 PvP） | 官方特设站仅一句话 |
| 17 | **Evercold 新 8 人难度的正式名称** | 日文报道称难度约等于「極」或略易；官方未给名称 |
| 18 | **"World Raid" 是否就是最终名称** | 日文报道明确说这是**内部暂定名**，很可能会改 |
| 19 | **2026-09-13 服务器崩溃与驯兽师相关的官方公告** | 未取得一手来源（见下） |
| 20 | **Gold Saucer「魔光键影」的官方英/日文名** | 新闻稿给出英文 **Keybound Brawler**，中文译名待官方确认 |
| 21 | **Deck/每日/每周重置的精确 UTC 时间** | 本文 §7 给出的时间为**推导值**，需以官方 Reset Times 页面确认 |
| 22 | **深层迷宫各作的 Pomander 完整列表** | 本文只列了通用规则 |
| 23 | **深层迷宫各作的单人通关称号名称** | 各作不同，本文未逐一核实 |
| 24 | **各遗物武器链的精确阶段名与素材名** | §6.5 为概要，非逐阶段清单 |
| 25 | **Unreal 幻巧战当前的轮换对象与 Faux Hollows 货币名** | |
| 26 | **FC 潜艇/飞空艇单次远航的真实时长与产出表** | |
| 27 | **青魔道士假面狂欢的关卡数量与奖励** | |
| 28 | **Occult Crescent South Horn 的首个分叉之塔（Blood）的准确人数与机制** | |

### B.3 关于「驯兽师导致服务器崩溃」——**已用一手来源核实并更正**

任务方（parent agent）提到 **2026-09-13 有驯兽师导致服务器崩溃的官方紧急修复**。经一手来源核查，**该说法的日期与归因均有误**：

| 项目 | 一手事实 |
|---|---|
| **真实事件** | 官方公告 **"FINAL FANTASY XIV Updated (Sep. 8)"**，时间 **2026-09-08 23:55 (PDT)** |
| **性质** | **热修（Hotfix）**，官方明确 "**There is no client update for this version update**"（**纯服务器端，无客户端更新**） |
| **原因原文** | "In beastmaster, if the player's character leaves the area due to a connection loss at the moment the pet uses a weapon skill that restores its master's HP, **the server may crash**." |
| **2026-09-13 的事件** | 完全无关：官方公告 **"[Aether] Recovery from Gilgamesh World Technical Difficulties (Sep. 13)"**，时间 2026-09-13 11:34–12:03 (PDT)，原因为 **Server program issue（服务器程序问题）**，仅影响 **Aether DC / Gilgamesh** 世界，**官方未与驯兽师建立因果关联** |

**结论**：
- ✅ **确认**：驯兽师确实引发过一个**可导致服务器崩溃**的 BUG，条件为"**宠物施展恢复主人 HP 的武器技能时，玩家因断线离开区域**"；官方在 **2026-09-08 当天**（上线同日）以**服务器端热修**修复。
- ❌ **不成立**："2026-09-13 因驯兽师紧急维护"——09-13 是 Gilgamesh 的独立服务器程序故障。
- 间接旁证（本文一手中确认）：**7.56 补丁说明包含"为防止服务器拥堵，对 Central Shroud 与 7.56 新增区域实施多重野外实例"** 的系统条目。

来源：【官】[Lodestone News: FINAL FANTASY XIV Updated (Sep. 8)](https://na.finalfantasyxiv.com/lodestone/news/detail/8bd359e4817774169a96609cb92fd67149942302)
来源：【官】[Lodestone News: [Aether] Recovery from Gilgamesh World Technical Difficulties (Sep. 13)](https://na.finalfantasyxiv.com/lodestone/news/detail/d89fc430c5c07937d2cf02025aa97a5c507c90b3)
来源：【官】[Patch 7.56 Notes — System](https://na.finalfantasyxiv.com/lodestone/topics/detail/a8a526ad64db45c8ca8d1c7fdcce8a5eedaa18bc)
交叉参考：【媒体·中】[网易/3DM 2026-09-13 报道](https://m.163.com/dy/article/L6NKJ0R70526D8LR.html)（该报道实际讲的是 09-08 的事）

### B.3.1 其它需要更正的说法（供交叉引用）

| 常见说法 | 更正 |
|---|---|
| "7.56 是 7.x 最后一个补丁" | ❌ 只是**最后一个大型内容补丁**；官方已点名 **Patch 7.58**（Crucible Season 1 的终点） |
| "驯兽师有 Beastmaster Log" | ❌ 实为 **Master's Bestiary（魔兽图鉴）** + **Crucible of the Unbroken** |
| "FF7 联动是联盟 RAID" | ❌ FF7 联动是 **8 人 RAID 系列「Beyond the Lifestream」**；**联盟 RAID** 是 **《EVANGELION - Ghosts of Desire》** |
| "8.0 中文官方名 = 白银的探求者" | ❌ **无官方简中定名证据**；日文官方为「**白銀のワンダラー**」（宣传语中"探求者"是其意译）；中文媒体另有《银海之天舟》《永寒》等译法 |
| "8.0 新 8 人难度叫 XX" | ❌ 截至 2026-09-15 **官方未公布名称**；只能写"普通与零式之间的新 8 人难度（暂无名）"，其奖励为 **Season Gear（季节装备）** |
| "金碟新玩法是 7.56 内容" | ❌ **Keybound Brawler / 魔光键影** 是 **2026-10-28** 的独立追加内容，09-15 时**尚未上线** |
| "驯兽师完全不能进副本" / "能推主线" | ❌ 两者都不对：**可预先组队/解除人数限制进入部分副本**（但排除 Duty Roulette / 绝境战 / 深层迷宫 / PvP 等清单内容），且**不能接主线任务** |
| "陆行鸟育成重制在 8.2" | ⚠ **口径冲突**：日/中文媒体称 **8.1 进副本、8.2 育成重制**；SE 英文新闻稿把两者都写在 **Patch 8.1** |

### B.4 版本时效性警告

> 本文所有"当前状态"判断均以 **2026-09-15** 为基准。以下变化会**直接导致本文过时**：
> - **Patch 7.58** 上线（Crucible Season 1 结束、Preseason 开始）
> - **Patch 8.0 / Evercold** 上线（2027-01）：Series 12 结束、新增难度档、Seasons 系统、Chaser 内容取舍
> - **Crystalline Conflict 第 22 赛季**开始（约 7.58 或 8.0）
> - **PvP Series 13** 开始
> - **Cosmic Exploration / Occult Crescent** 的后续补丁
>
> **建议**：在用本文做设计决策前，先核对 Lodestone 的 [Patch Notes 列表](https://na.finalfantasyxiv.com/lodestone/special/patchnote_log/) 与 [Topics](https://na.finalfantasyxiv.com/lodestone/topics/)。

---

## 文档信息

| 项目 | 内容 |
|---|---|
| 文件名 | `06-side-content-pvp.md` |
| 主题 | FF14 PvP / 副本变体 / 深层迷宫 / 长尾特殊玩法 全量调研 |
| 事实基准日 | **2026-09-15** |
| 对应游戏版本 | **Patch 7.56**（Dawntrail 7.x 末期） |
| 来源可信度约定 | 见文首 §0 |
| 状态标注 | 🟢 已上线 / 🔴 已下线 / 🟡 已公布未上线 / ⚪ 历史遗留 |
| 不确定标注 | ⚠ |

<!-- DOC-END -->

