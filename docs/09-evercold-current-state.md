# FFXIV 现状总览：从 Dawntrail 7.x 末期到 8.0《Evercold》

> **文档版本**：v1.0
> **核实日期**：2026-09-15（所有 URL 均于该日抓取/检索）
> **适用对象**：放置类（idle / incremental）游戏设计参考、FFXIV 情报同步
> **撰写原则**：以英文官方源为第一优先（`na.finalfantasyxiv.com`、`lodestone`、`press.na.square-enix.com`、`na.finalfantasy.com`、`fanfest.finalfantasyxiv.com`），媒体源仅作补充，中文源仅作对照且逐条标注风险。

---

## 体例说明（Confidence Legend）

| 标记 | 含义 | 判定标准 |
|---|---|---|
| ✅ **官方确认** | 来自 Square Enix 官方站点、官方新闻稿、官方补丁说明、官方粉丝节官网 | 可直接引用 |
| ⚠️ **媒体报道** | 来自可信媒体（Gematsu / Icy Veins / GamesRadar / Polygon / Kotaku / Siliconera / RPGSite 等），但无对应官方原文 | 可引用但需注明 |
| ❓ **未证实 / 推测** | 仅见于低可信度聚合站、二手转述、或完全找不到来源 | 不得当作事实使用 |

**中文源警告**：`17173`、`网易号 / 3DM`、`9game`、`expreview` 等中文源存在机翻讹误与标题党。凡引用中文源，本文一律标注 ⚠️ 或 ❓，并注明「待核实」。

---

## 0. 执行摘要与「用户情报核实结果」

### 0.1 一句话结论

截至 **2026-09-15**，国际服最新补丁为 **Patch 7.56**（2026-09-08 上线），Dawntrail 主线「Trail to the Heavens」已在 7.56 完结 Part 2 并直接引出 8.0 的「Solstice / 第四世界」伏笔；**8.0《Evercold》官方定档 2027 年 1 月**，玩法层面正在做 FFXIV 十年来最大的一次结构性重构（废除亚拉戈神典石、装等角色化、副本三档难度、战斗系统 Reborn/Evolved 双模式）。

### 0.2 用户提供的 6 条情报逐条核实

| # | 用户情报 | 核实结论 | 标记 | 证据 |
|---|---|---|---|---|
| 1 | 7.56 于 2026-09-08 维护 | ✅ **正确**（时区细节需说明） | ✅ | 官方维护公告「All Worlds Maintenance (Sep. 7)」：Sep. 7 23:00 → Sep. 8 03:00 PDT；后续 follow-up 提前至 **Sep. 8 02:25 PDT** 结束。以北京时间计即 **2026-09-08 17:25** |
| 2 | 7.56 于 2026-09-10 上线 | ❌ **错误**。全球实际开放时间为 **2026-09-08**（PDT/JST/CST 均为 9 月 8 日）。中文媒体 `17173` 的「9 月 10 日」是**文章发布日期**，非上线日期 | ✅ | 官方维护公告 + 官方补丁说明 + 日文媒体一致为 9 月 8 日 |
| 3 | 驯兽师是 Limited Job | ✅ **正确**。与青魔道士同为 limited job（限定职业） | ✅ | Patch 7.56 Notes「Limited Jobs」段落 |
| 4 | 2026-09-13 驯兽师导致服务器崩溃、官方紧急修复 | ⚠️ **日期错误，事件基本属实**。真实时间线：热修 **2026-09-08 23:55 PDT**（官方 Update 公告），并伴随「All Worlds Emergency Maintenance (Sep. 8)」Sep. 8 23:00 → Sep. 9 01:40 PDT。9-13 是中文媒体（17173 / 网易号·3DM）**报道日期**，且当天确实另有一起 **Gilgamesh（Aether）World 技术故障**（11:34–12:03 PDT，官方口径为「Server program issue」，**未提及驯兽师**）。9-14 Gilgamesh 再度故障（19:26–19:48 PDT）并单独紧急维护（00:00–00:45 PDT） | ✅（官方热修记录）/ ⚠️（因果叙事来自中文媒体）/ ❓（9-13 故障与驯兽师的因果，官方无记载） | 官方 `FINAL FANTASY XIV Updated (Sep. 8)` + 官方紧急维护公告 + `[Aether] Recovery from Gilgamesh World Technical Difficulties (Sep. 13)` + Sep. 14 两条公告 |
| 5 | 8.0 上线时间为 2027 年 1 月 | ✅ **正确** | ✅ | 官方 Evercold 特设站首页直接标注「January 2027」；SE 官方新闻稿标题「…SET FOR JANUARY 2027」 |
| 6 | 8.0 中文名为《白银的探求者》 | ⚠️ **部分正确，需分语言版本**。日文官方名 **「白銀のワンダラー」**（Silver Wanderer）；繁中译名 **《白銀探求者》**；**简中译名实为《银海之天舟》** | ✅（日/繁中各异） | 官方日文粉丝节站、日文 Evercold 特设站、SE 官方新闻稿；繁中/简中差异见 §4.1 |

### 0.3 额外的重大更正（用户情报中缺失或错误的三项）

| 项目 | 用户情报 | 实际情况 | 标记 |
|---|---|---|---|
| FF7 Remake 联动大型任务 | 用户认为 8.0 有「与 FF7 Remake 的联动大型任务」 | 实为**两个独立联动**：① **同盟讨伐战（Alliance Raid）**＝《EVANGELION - Ghosts of Desire》（与 khara, Inc. 合作）；② **8 人 Raid 系列**＝《Beyond the Lifestream》（FF7 Remake 三部曲联动）。用户把两者混淆了 | ✅ |
| 新职业 Bastion 初始等级 | 用户认为「初始 90 级」 | 官方**尚未公布 Bastion 的初始等级**。已确认：Main Tank、双大盾武器「skyltborg」、**仅可在 Evolved 模式使用**；等级上限由 100 → **110** | ✅（已确认部分）/ ❓（90 级起步未证实） |
| 代号 World Raid | 用户认为存在名为「World Raid」的新玩法 | **在全部官方源中未找到任何名为「World Raid」的 8.0 玩法**。最接近实物：Patch 7.5x 的 **Same-Region Player Matching**（匹配范围从逻辑 DC 扩大到整个物理 DC）与 8.0 的新 **Ultimate Raid** | ❓ |

---

## 1. 7.x 补丁全时间线

### 1.1 官方补丁清单（权威依据）

以下补丁号清单直接取自官方 The Lodestone 的 **「Patch Notes and Special Sites」** 页面（Dawntrail 分区），是补丁号存在性的权威依据：

> 来源：[Patch Notes and Special Sites | The Lodestone](https://na.finalfantasyxiv.com/lodestone/special/patchnote_log/) —— 核实日期 2026-09-15

**Dawntrail 系列实际存在的补丁：**

`7.0` · `7.01` · `7.05` · `7.1` · `7.11` · `7.15` · `7.16` · `7.18` · `7.2` · `7.21` · `7.25` · `7.3` · `7.31` · `7.35` · `7.38` · `7.4` · `7.41` · `7.45` · `7.5` · `7.51` · `7.55` · `7.56`

> ⚠️ **重要更正**：**不存在 7.08 与 7.28**。用户情报中的这两个补丁号有误（7.08 属于 Endwalker 系列的编号习惯，Dawntrail 未沿用）。官方清单中 Dawntrail 只有上列 22 个补丁。

### 1.2 已确认日期总表

| 补丁 | 上线日期 | 主要内容 | 标记 / 来源 |
|---|---|---|---|
| **7.0** Dawntrail | 2024-07-02 | 资料片本体：新大陆图拉尔、新职业 Viper（蛇武士）与 Pictomancer（绘灵法师）、等级上限 100、新 8 人 Raid「AAC Light-heavyweight」、24 人 Raid 开端、FATE 与 PvP 更新 | ⚠️ 需以官方补丁说明复核 |
| **7.01** | 2024-07 | 7.0 后续修正 | ⚠️ 待核实 |
| **7.05** | 2024-07 | Savage 难度开放、生产采集更新 | ⚠️ 待核实 |
| **7.1**「Crossroads」 | 2024-11 | 主线「Crossroads」、新同盟讨伐战开端、Occult Crescent 前置、PvP 更新 | ⚠️ 待核实 |
| **7.11 / 7.15 / 7.16 / 7.18** | 2024-11 ～ 2025-02 | 各小版本：新副本 / 新讨伐 / 系统调整 | ⚠️ 待核实 |
| **7.2**「Seekers of Eternity」 | 2025-03 | 主线「Seekers of Eternity」、Savage 第 2 阶、新幻境 | ⚠️ 待核实 |
| **7.21 / 7.25** | 2025-04 ～ 2025-05 | 小版本更新 | ⚠️ 待核实 |
| **7.3** | 2025-08 | 主线推进、Occult Crescent 更新 | ⚠️ 待核实 |
| **7.31 / 7.35 / 7.38** | 2025- ～ 2026-01 | 小版本更新；**Pilgrim's Traverse（深層迷宫 / Deep Dungeon 第 4 弹）** 在 Lodestone 排行分类中确认为 Dawntrail 内容 | ✅（存在性）/ ⚠️（日期待核实） |
| **7.4** | 2026- 初 | 主线推进、Savage 更新（7.56 补丁说明提到「7.4 与 AAC Heavyweight Tier (Savage) 之间间隔较长」，说明 7.4 在本周期较早） | ✅（存在与关系）/ ⚠️（日期待核实） |
| **7.41 / 7.45** | 2026- 上半 | 小版本更新 | ⚠️ 待核实 |
| **7.5**「Trail to the Heavens」 | **2026-04-28** | 见 §3 | ✅ SE 官方新闻稿 |
| **7.51** | **2026-06-02** | Cosmic Exploration 新星球「Auxesia」、新 Custom Deliveries「Tiisol Ja」、**絶 Dancing Mad（Ultimate）** | ✅ SE 官方新闻稿（2026-04-24） |
| **7.55** | **2026-07-28** | 「Inconceivably Further Hildibrand Adventures」更新、**Occult Crescent: North Horn 首次登场**、Phantom Weapon 任务 | ✅ SE 官方新闻稿（2026-07-28）+ Patch 7.55 Notes |
| **7.56** | **2026-09-08** | 主线「Trail to the Heavens - Part 2」完结、**新限定职业驯兽师（Beastmaster）**、AAC Heavyweight (Savage) 解除周限制并赋予 Echo、mnemonics 神典石周上限 450→900、PvP Series 12 开始 | ✅ [Patch 7.56 Notes](https://na.finalfantasyxiv.com/lodestone/topics/detail/a8a526ad64db45c8ca8d1c7fdcce8a5eedaa18bc) |

> **7.x 早期（7.0–7.45）精确日期**：官方补丁说明页存在但首页仅列标题不含日期，需逐页打开读取页首「Updated on …」字段；本表中标注「待核实」的条目**不应作为事实引用**，需以官方补丁说明页或官方新闻稿补证。

### 1.3 当前国际服最新补丁号与日期——核实结论

**核实结论（2026-09-15）**：

- **最新补丁：Patch 7.56**
- **上线时间：2026-09-08**（PDT 02:25 提前结束维护；北京时间 2026-09-08 17:25；JST 18:25）
- **补丁说明最后更新：2026-09-15 01:00 PDT**（官方页面标注 "Updated on Tuesday, September 15, 2026 at 1:00 a.m. (PDT)"）——这是**补丁说明的修订时间**，不是上线时间
- **下一个补丁：Patch 7.58**（官方在 7.56 补丁说明中明确提及：「Season One of Crucible Rankings will begin Thursday, September 24, 2026, and last until the release of **Patch 7.58**」）
- **7.58 上线日期：官方未公布** ❓

> 来源：[Patch 7.56 Notes | The Lodestone](https://na.finalfantasyxiv.com/lodestone/topics/detail/a8a526ad64db45c8ca8d1c7fdcce8a5eedaa18bc)（核实日期 2026-09-15）

---

## 2. Patch 7.56 详解

### 2.1 精确维护与上线时间线（三时区对照）

| 事件 | PDT（UTC-7） | JST（UTC+9） | CST 北京（UTC+8） | 来源 |
|---|---|---|---|---|
| 7.56 版本维护开始 | 2026-09-07 23:00 | 2026-09-08 15:00 | 2026-09-08 14:00 | [All Worlds Maintenance (Sep. 7)](https://jp.finalfantasyxiv.com/lodestone/news/detail/412e688db6331c0d36ea6a9fb75b31a9dc66d354) |
| 7.56 维护结束 / **版本上线** | **2026-09-08 02:25** | **2026-09-08 18:25** | **2026-09-08 17:25** | 官方 Follow-up（提前结束） |
| 紧急维护开始（应用 7.56 热修） | 2026-09-08 23:00 | 2026-09-09 15:00 | 2026-09-09 14:00 | [All Worlds Emergency Maintenance (Sep. 8)](https://jp.finalfantasyxiv.com/lodestone/news/detail/fe272ef325fe6f154b4884fff014624dfd7699bb) |
| 紧急维护结束 | 2026-09-09 01:40 | 2026-09-09 17:40 | 2026-09-09 16:40 | [Follow-up](https://jp.finalfantasyxiv.com/lodestone/news/detail/df3882f51f1327d7f075a9bf68110ff38bc59396) |
| 热修生效公告 | 2026-09-08 23:55 | 2026-09-09 15:55 | 2026-09-09 14:55 | [FINAL FANTASY XIV Updated (Sep. 8)](https://jp.finalfantasyxiv.com/lodestone/news/detail/8bd359e4817774169a96609cb92fd67149942302) |
| Crucible Rankings Season 1 开始 | — | — | 2026-09-24 | Patch 7.56 Notes |

**周边维护/故障（9/7–9/14，官方公告索引）：**

| 日期（PDT） | 事件 | 说明 |
|---|---|---|
| 2026-09-08 00:15 | 客户端更新推送（维护中） | 7.56 客户端 |
| 2026-09-10 | Online Store / Mog Station 维护 | 与游戏本体无关 |
| 2026-09-11 | **Diabolos（Crystal）单世界紧急维护** | — |
| 2026-09-13 | Mog Station 维护 | 与游戏本体无关 |
| **2026-09-14 00:00–00:45** | **Gilgamesh（Aether）单世界紧急维护**（JP 公告写 16:00→16:45 JST） | 理由仅写「不具合対応」 |

**9/9–9/14 World 技术故障（障害）密集发生清单**（官方 Status 索引）：

> Zodiark(9/9)、Diabolos(9/9)、Leviathan(9/10)、Diabolos(9/10)、Faerie(9/10)、Raiden(9/11)、Louisoix(9/12)、Odin(9/12)、Gilgamesh(9/13)、Gilgamesh(9/14)、Jenova(9/14)

- ✅ 已直读原文的两条 Gilgamesh 公告，**原因栏一律只写「Server program issue」**
- ⚠️ 该周故障横跨 NA / EU / JP / OCE 多个 World，**更符合「补丁后整体服务器程序/负载问题」的特征，不能归因于驯兽师单一职业**

> ⚠️ **给中文读者的提醒**：中文媒体（17173，2026-09-10 发文）称「7.56 版本正式上线」，容易让人误以为上线日期是 9 月 10 日。实际上线日为 **9 月 8 日**，17173 的 9-10 只是发稿日。

### 2.2 官方 Patch 7.56 补丁说明要点（逐条）

以下全部来自官方补丁说明原文（英文），核实日期 2026-09-15。

#### 2.2.1 剧情 / 任务

- **新主线任务**：`A Winter's Dream`（前置：7.5 主线 `Trail to the Heavens`；接取地点：The Rising Stones (X:6.1 Y:5.9)，NPC：Tataru，条件：战斗/魔法职业 Lv100）
- 后续还有 3 个主线任务（官方以 `???` 隐藏）
- **新职业任务**：驯兽师起始任务 `Strangers in the Wood`（条件：战斗/魔法职业 Lv50、完成主线 `The Ultimate Weapon`；地点：New Gridania X:11.8 Y:13.6，NPC：Excited Adventurer）
- **New Game+ 新增章节**：`Dawntrail - Part 4`（Winter's Prelude）；`DPS Quests → Beastmaster (Limited Job)`
- 官方剧情简介原文：
  > "Faced with the coming Solstice, the fate Halmarut claims to await all worlds, the Warrior of Light embarks upon another journey─one that promises to grow ever colder..."
  >
  > 中文：面对即将到来的「Solstice（至点）」，以及 Halmarut 宣称等待所有世界的那种命运，光之战士踏上了另一段旅程——一段注定愈发寒冷的旅程……

#### 2.2.2 战斗系统

- **新职业驯兽师（Beastmaster）** 实装（详见 §2.3）
- **新专属副本**：The Crucible of the Unbroken（详见 §2.5）
- **AAC Heavyweight Tier (Savage) 大幅松绑**：
  - 宝箱**必定出现**，无论队伍中是否有人已通关，且不减少奖励
  - **取消宝箱奖励周限制**
  - **取消每周入场限制**
  - 玩家可直接前往任意一关（不再必须顺序解锁）
  - 赋予 **Echo（艾可）**：战斗开始时即生效，**最大 HP / 造成伤害 / 治疗量 +12%**
  - 官方注释：由于 7.4 与 Savage 开放间隔比以往更长，官方为配平装备获取而给予了**比平时更强的 Echo**；且此 Echo **不会**在全灭后继续增强
- **Occult Crescent: North Horn** 的「Forked Tower: Magic」延长时间机制调整：离开 Forked Tower 时会**扣减**此前累积的延长时间；若扣减后剩余不足 5 分钟则设为 5 分钟
- **`Windurst: The Third Walk`** 加入「Duty Roulette: Alliance Raids」（同盟讨伐随机）
- **亚拉戈神典石 mnemonics 周上限：450 → 900**（存量上限 2000 不变）
  > 💡 **设计观察**：这条是 7.x 末期对「神典石体系」的最后一次补丁式加码，而 8.0 将直接废除整个神典石体系（见 §5.1）。两者是**过渡与终局**的关系。

#### 2.2.3 PvP

- **Series 11 结束，Series 12 开始**
- Series 12 的持续时间：**从 Patch 7.56 到 Patch 8.0 上线**（意味着 8.0 之前不再有新的 PvP Series）
- Series 11 奖励只能在 Series 12 结束前领取

#### 2.2.4 系统 / 其他

- 为防服务器拥堵，**Central Shroud** 与 7.56 新增区域启用**多实例分区（multiple field instances）**
- 7.51 为缓解拥堵对 **Tuliyollal** 做的分区被**取消**
- 新增 `Pilgrim's Traverse` 之外的新成就/称号、肖像 accent、冒险者铭牌 accent
- 新文本指令：
  - `/beastsize`（别名 `/beastpetsize`）：`/beastsize [summon] [size]`，调整驯兽师召唤兽体积（large/medium/small），仅自己可见
  - `/bestiary`（别名 `/bstbook`）：开关「Master's Bestiary（驯兽图鉴）」
- 新增 PS5 奖杯、Xbox Series X|S 成就
- **Nintendo Switch 2 专属修复项**（重要信号，说明 Switch 2 版已上线并处于活跃维护中）：
  - New Game+ 章节顺序错误
  - Active Time Maneuver 计量条无法通过触屏增加
  - 面部彩绘颜色溢出到脖子/角/胡须/鳞片
  - 冒险者铭牌活跃时间跨平台显示不正确
  - 角色/肖像菜单触屏拖动反应速度异常
  - 通过启动器购买 FFXIV Coins 时未跳转到 Nintendo eShop
  - 系统时间与现实差异过大时未显示预期错误信息

#### 2.2.5 已知问题（Known Issues）

- 驯兽师技能 **Snarl** 的帮助文本未包含「消除玩家仇恨生成」的效果说明
- Crucible of the Unbroken 中部分敌人图像显示错误
- 跳跃中时 `Earthrender` / `Void Thunder III` 的攻击判定显示位置错误
- 石化（Stone Curse）状态下特定条件下仍可移动
- mogsong sphere 的 `Burst` 在特定条件下不造成伤害
- 驯兽师耳环图标未体现 unique（唯一）属性（仅图标问题，物品本身是 unique）

#### 2.2.6 新增道具（节选，驯兽师相关）

- 驯兽师武器为**手斧（Hand Axe）**类别，另有**盾（Hoplon 类）** —— 与「近战 DPS 共享武僧/武士装备」的说法并存，说明其自带一套独立武器/盾牌线
- 武器品级线：IL 5 → IL 8 → IL 16 → IL 22 → IL 30 → IL 40 → **IL 90 → 100 → 110 → 120 → 130 → 135**
- 终极武器：`Beastliege's Hand Axe`（IL 135）、**`Guttler`（IL 135）**、`Guttler Unleashed`（IL 135）
  > 💡 `Guttler` 是 **FFXI 驯兽师（BST）的经典神话武器（Mythic）**，这里是跨代致敬
- 防具等级线：IL 1（Beast Herder 系）→ IL 30 → IL 40 → **IL 90 → 130**（+1 至 +4 强化）
- `Soul of the Beastmaster`（驯兽师魂晶）描述原文：
  > "Unlike other soul crystals, the surface of this multi-aspected stone has yet to be carved with the record of past deeds."
  >
  > 中文：与其他魂晶不同，这颗多面宝石的表面尚未被刻上过往事迹的记录。
- 各等级礼盒：`Beast Herder's Coffer (IL 1)` / `Beast Tamer's Coffer (IL 30)` / `Beastwarden's Coffer (IL 40)` / `Beastmaster's Coffer (IL 90)`

> 来源：[Patch 7.56 Notes | The Lodestone](https://na.finalfantasyxiv.com/lodestone/topics/detail/a8a526ad64db45c8ca8d1c7fdcce8a5eedaa18bc)（核实日期 2026-09-15）

### 2.3 限定职业「驯兽师（Beastmaster / BST）」

#### 2.3.1 基础定位（官方原文）

> "Beastmasters forge pacts with myriad creatures and call upon them in battle as faithful familiars. Work in tandem with your bestial companions to unleash special combos.
> This melee DPS job shares gear used by monk and samurai. It has no corresponding class and begins at level 1 with a maximum level of 50."

中文翻译：

> 驯兽师与无数生物缔结契约，在战斗中召唤它们作为忠诚的使魔。与你的兽类伙伴协同作战，释放特殊连携。
> 该职业为**近战 DPS**，**与武僧、武士共用装备**。**没有对应的基础职业**，**从 1 级开始，最高等级 50**。

| 项目 | 内容 | 标记 |
|---|---|---|
| 是否 Limited Job | ✅ 是（与青魔道士同类） | ✅ |
| 角色定位 | 近战 DPS（Melee DPS） | ✅ |
| 基础职业 | 无（No corresponding class） | ✅ |
| 起始等级 | Lv 1 | ✅ |
| 当前等级上限 | **Lv 50** | ✅ |
| 装备共用 | 武僧（MNK）/ 武士（SAM） | ✅ |
| 能否使用职能动作（Role Actions） | **不能** | ✅ |
| 是否有独立武器线 | 有（手斧 + 盾，IL 5–135 独立线） | ✅ |
| 理符（Retainer）能否指派 | **不能**（Retainers cannot be assigned the beastmaster job） | ✅ |
| 8.0 后是否有等级上限提升 | 官方未公布 | ❓ |

#### 2.3.2 限定职业的内容准入限制（官方完整清单）

**能进入的**：
- 与预组队（preformed party）或非限制队伍（unrestricted parties）一起，**可以**参加与其他玩家共同的副本

**不能进入的（官方原文列表）**：
- Duty Roulettes（随机任务）
- The Forbidden Land, Eureka / The Bozjan Southern Front / The Occult Crescent / Variant Dungeons / Criterion Dungeons / **Ultimate Raids** / Stone, Sky, Sea
- Squadron Missions（中队任务）
- Deep Dungeons（深层迷宫）
- PvP（包括决斗 duels）
- Hall of the Novice（新手学堂）

**任务限制**：限定职业只能接取
- 职业任务（Job quests）
- 对所有职业/特职开放的任务

#### 2.3.3 经验获取特性（与青魔道士的关键差异点）

官方原文：

> - Beastmasters gain greater experience from completing FATEs than other jobs do.
>   \* Unlike blue mage, no bonuses are granted to experience from battling enemies in the open world.

中文：

> - 驯兽师完成 **FATE 获得的经验高于其他职业**。
>   \* **与青魔道士不同**，在野外击杀敌人**不获得**经验加成。

> 💡 **设计含义**：官方刻意把「驯兽师的开放世界练级路径」锁死在 FATE 上，而不是像青魔道士那样鼓励野外刷怪。这避免了开放世界刷怪点被大量驯兽师占据（性能与体验考虑），也把玩家导向有明确刷新周期的公共事件——这与 8.0「每周自选进度」的设计哲学一脉相承。

#### 2.3.4 与青魔道士（Blue Mage / BLU）的系统性异同

| 维度 | 青魔道士（蓝魔 / BLU） | 驯兽师（BST） | 标记 |
|---|---|---|---|
| 类型 | 限定职业（第 1 个） | 限定职业（第 2 个） | ✅ |
| 起始等级 / 上限 | Lv1 起 / **上限 80** | Lv1 起 / **上限 50** | ✅ |
| 角色定位 | **魔法远程 DPS** | **近战物理 DPS** | ✅ |
| 学习机制 | 从怪物身上**学习技能**（Learning），与角色等级无关 | 用 `Gauge` + `Capture` **与野兽缔结契约**，收入 Master's Bestiary | ✅ |
| 图鉴系统 | **Blue Mage Log（青魔道士手帐）**（Lv60 任务 `Blue Scream of Death` 解锁；含青魔组队打指定副本、每周目标 / prime target） | **无任何等价系统**（官方未提及任何 log） | ✅（BLU）/ ⚠️（BST 的「无」为官方文本缺位 + 粉丝站明述） |
| 独立成长 | 各技能需单独学习；有专属任务链 | **使魔兽阶（Beast Rank）最高 25**，需用 Crucible 内经验培养；**兽阶仅在 Crucible 内生效** | ✅（上限 25）/ ⚠️（「仅 Crucible 内生效」来自 famitsu 开发者访谈） |
| 专属副本 | **Masked Carnivale（假面狂欢节）**：Lv50 解锁、**共 32 关**、含每周目标 | **The Crucible of the Unbroken（破魔试炼场）**：Lv30 解锁、棋盘式 roguelite + 官方赛季排行榜 | ✅ |
| 副本准入 | 受限（不可用随机任务，可预组队进本） | 受限（同上） | ✅ |
| 狼狱停船场（Wolves' Den） | 官方青魔指南**保留「青魔可进入狼狱停船场」注记** | 官方驯兽师指南**无此注记** → 推断不可进入，但官方无明文 | ⚠️/❓ |
| 能否进 Ultimate | 否 | 否 | ✅ |
| 野外经验加成 | **有**（野外击杀敌人获得经验加成）；**FATE / guildleve 无加成** | **无**（官方明确排除），但 **FATE 经验更高** | ✅ |
| 是否有排行榜 | 无官方赛季排行榜 | **有**：Crucible Rankings（按物理 DC 统计，Season 1 于 2026-09-24 开始） | ✅ |
| 能否指派理符 | 不能 | **不能** | ✅ |
| 职能动作 | 不能使用 | **不能使用** | ✅ |

> **来源补充**：官方 [Job Guide: Beastmaster](https://na.finalfantasyxiv.com/jobguide/beastmaster/)、[Job Guide: Blue Mage](https://na.finalfantasyxiv.com/jobguide/bluemage/)（核实日期 2026-09-15）

#### 2.3.5 与野兽缔结契约的完整机制

1. **`Gauge`（评估）**：对目标野兽使用，判定能否缔结契约、以及缔结难度
2. **`Capture`（捕获）**：对目标施加状态；**在该状态生效期间击杀目标**即可缔结契约
   - **先削弱目标再使用 Capture 可提高成功率**
   - **部分尝试会失败**（有失败率）
3. **Master's Bestiary（驯兽图鉴）**：通过主菜单 `Character` 打开，记录使魔的固有能力、自然栖息地等信息
4. **Kornago Gourds（科纳戈葫芦）**：**无需战斗即可缔结契约**的道具
   - 用 `remnants of resilience`（ resiliencia 残片）向 Kornago 商人兑换
   - 葫芦种类随职业任务完成度增加
5. **召入战斗**：在 Master's Bestiary 中通过子命令把使魔分配到 `battlehorns`（战角）
   - 使用 Battlehorn 动作召唤已分配的使魔
   - **同时只能召唤 1 只使魔**
   - 可通过 `Edit Appearance` 子命令调整使魔体积（**仅自己可见**，也可用 `/beastsize` 文本指令）

#### 2.3.6 驯兽师战斗系统

- 驯兽师与使魔通过特定动作累积 **TP**
- TP ≥ 100 时可释放强力的 **instinctual skills（兽心技 / 本能技能）**
- **连续释放本能技能可完成连携（instinctual combo），造成额外伤害**
- TP 通过**职业专属 HUD 元件**显示
- 其他技能：
  - **`Tempered Release`（はなつ）**：命令使魔释放其固有能力
  - **`Borrow`（かりる）**：从使魔处借取力量，执行另一项驯兽师动作

**Job Guide 补充的连携细节**（✅ 官方 Job Guide）：

| 项目 | 内容 | 标记 |
|---|---|---|
| 兽心技四属性 | **Volant / Rampant / Durant / Eldritch** | ✅ |
| 连携窗口 | 技能后 **7 秒内**接续即成立连携 | ✅ |
| `Inner Compass`（内心罗盘） | 沿**顺时针**（Volant → Rampant → Durant → Eldritch → Volant）接续可成立 **intentional combo** | ✅ |
| 两侧谱系 | 分为 **Sunstrider（日行者）** 与 **Moonstalker（月追者）** 两条 | ✅ |
| 强力攻击 | **点亮整圈**可触发强力攻击 | ✅ |
| 基础连携（⚠️ famitsu） | `Smash` → `Axebite` → `Shield Splitter` | ⚠️ |
| Lv50 白/黑兽心技 TP 需求（⚠️ famitsu） | **TP 250** | ⚠️ |
| 最多可缔结契约的野兽种类（⚠️ 媒体） | **50 种**（17173 与 famitsu 一致；官方未在补丁说明中给出数字） | ⚠️ |

> 💡 **这是 FF14 首次引入「环形连携罗盘」的战斗资源机制**——玩家不是在固定循环里按键，而是在一个 4 节点环上按顺序接续，且有顺时针 / 逆时针（Sun / Moon）两条路径。这是一个**「路径选择 + 时限连携」**的复合决策机制，与放置游戏的「自动战斗策略配置」高度契合（可设计为「让玩家预设连携路径优先级」）。

#### 2.3.7 职业任务等级节点与解锁条件

**✅ 官方数据（修正后）：共 10 个职业任务**（含解锁任务）

| # | 等级 | 额外条件 |
|---|---|---|
| 1 | `Strangers in the Wood`（JP：魔獣の使い手たち） | 战斗/魔法职业 Lv50 + 主线 `The Ultimate Weapon` |
| 2 | Lv 1 | **已与某只特定野兽缔结契约** |
| 3 | Lv 8 | — |
| 4 | Lv 18 | — |
| 5 | Lv 30 | — |
| 6 | Lv 30 | **通关 Crucible of the Unbroken 的某张棋盘** |
| 7 | Lv 40 | — |
| 8 | Lv 40 | **通关某张棋盘** |
| 9 | Lv 50 | — |
| 10 | Lv 50 | **通关某张棋盘** |

> ⚠️ **更正用户情报**：用户给出的「1/8/18/30/40/50」**不完整**。正确为 10 个任务，等级序列为 **1 / 8 / 18 / 30 / 30 / 40 / 40 / 50 / 50**（另加解锁任务），其中 **Lv30、Lv40、Lv50 各有一个额外要求「通关某张棋盘」**。

> **解锁入口**：New Gridania (X:11.8 Y:13.6)，NPC「Excited Adventurer」。
>
> **二次源**（⚠️）：[PixMofu 职业任务整理（2026-09-09）](https://pixmofu.com/articles/ffxiv-patch-756-beastmaster-job-quests)

### 2.4 The Crucible of the Unbroken（破魔试炼场）——驯兽师专属副本

官方定义为「**a solo experience**（单人体验）」，机制上是一个**棋盘式 roguelite 挑战**。

#### 2.4.1 基本规则

> "Atop a special board, players must progress across spaces that each host a different happening. A board is completed by defeating the final boss on the innermost space."

中文：在一块特殊棋盘上，玩家需要穿越各具不同事件的格子。**击败最内层格子上的最终 Boss 即通关该棋盘**。

- 进入 NPC：Central Shroud (X:21.9 Y:22.8)
- 前置：驯兽师 Lv30 + 完成某职业任务

#### 2.4.2 队伍编成（Team Composition）

- 每个棋盘有**不同的编成上限**
- 从 Master's Bestiary 中选择随行使魔，或直接选「Recommended Team（推荐编队）」自动编成
- **Board Layout（棋盘布局）** 会显示各格子的敌人信息，**研究弱点后再编队可获得最大优势**

#### 2.4.3 战斗规则

- 玩家与使魔各自拥有 **独立 HP，且不会自然回复**
- 必须使用**特殊道具或特殊格子**恢复 HP
- 使魔 HP 归零 → 该使魔**无法继续参战**
- 玩家 HP 归零 → **副本失败**
- 职能动作：
  - **`Snarl`**：命令使魔通过 `Cover` 效果**替玩家承担仇恨**
  - **`Challenge`**：把仇恨拉回自身，同时**移除使魔身上的 Cover**
- 设计意图：通过这两个动作**分配承伤**，因此需要持续关注使魔 HP

#### 2.4.4 棋盘内道具与成长

| 类型 | 说明 |
|---|---|
| **Ephemeral items（瞬息道具）** | 只在该棋盘内可用，通关或失败后消失 |
| **Crucible items（试炼道具）** | 可在移动或战斗中使用的通用道具；每个棋盘开局赠送 1 个；**最多携带 10 个**；有独立背包，可拖到热键栏 |
| **Beast gear（兽装）** | **只要放在背包里就持续生效**；每棋盘开局赠送 1 件；**最多携带 10 件，不允许重复** |
| **Feed（饲料）** | 用于强化使魔的能力与属性；每种饲料每只使魔只能吃一次（不允许重复）；**在营地（campsite）格子休息的使魔会失去已获得的饲料效果** |

#### 2.4.5 计分与奖励

- 通关后按**已穿越格子数 + 剩余 HP + 其他要素**计算分数
- 满足特定条件可触发 **加分（Bonuses）**，在 Board Layout 的「View Bonuses」查看条件
- 奖励：按分数获得 **faded / bright remnants of resilience（ resiliencia 残片）**
- 残片可向 Central Shroud (X:21.9 Y:22.6) 的 Kornago 商人兑换 Kornago 葫芦或强化驯兽师专属装备

#### 2.4.6 使魔成长（Familiar Growth）

- 随行的所有使魔按分数获得经验
- **每 100 EXP → 兽阶（beast rank）+1**
- 兽阶上限 **25**
- 兽阶提升的属性：

| 属性 | 效果 |
|---|---|
| Strength（力量） | 影响物理伤害 |
| Intelligence（智力） | 影响魔法伤害 |
| Physical Resistance（物理抗性） | 影响物理易伤 |
| Magic Resistance（魔法抗性） | 影响魔法易伤 |
| Constitution（体质） | 影响最大 HP |

#### 2.4.7 进度保存与放弃

- **暂停（Suspending Progress）**：在格子之间或已清理的格子上可保存并暂时退出；再次进入时选「Resume Progress」继续
  - ⚠️ 若已有暂停数据时重新挑战，**暂停数据会被抹除**
- **放弃（Forfeiting）**：战斗外可自愿退出；仍按进度获得分数与相应奖励

#### 2.4.8 Crucible Mode: Degrees（试炼模式：难度阶级）

- 通关全部棋盘并推进驯兽师职业任务后解锁
- **Degrees 提升敌人 HP 与造成伤害，共 3 个难度等级（第一阶 → 第三阶）**
- 难度越高，分数加成越大
- 可在 Board Layout 菜单中调整

> 💡 **这是 8.0「副本三档难度」思路的前哨实验**：一个副本内嵌 3 档可调难度 + 独立排行榜，等价于在单人内容里验证「阶梯难度」的可行性。

#### 2.4.9 Crucible Rankings（试炼排行榜）

- 玩家可竞争最高分
- **分数必须在本家 World 记录**，排行榜**按物理 DC（physical data center）聚合**
- 要计入排行榜，必须把 Crucible Mode 设为 **第三阶（third degree）** 并勾选「Participate in rankings」
- **排名分数取每个棋盘最近 3 次挑战的成绩汇总**
- **Season One：2026-09-24 开始，持续到 Patch 7.58 上线**
- 之后为 **Preseason（季前赛）**，暂时禁止参与排名；Season Two 在季前赛结束后一段时间开始
- 每个物理 DC **前 300 名**通过莫古力配送获得奖励

**赛季奖励构成**（✅ 官方排行页）：

| 奖励 | 类型 | 说明 |
|---|---|---|
| `Beast of the Best` | 成就 | — |
| `Running Feral` | 成就 | — |
| `Crucible Contender` | 成就 | 附 **Tourmaline Golem** 坐骑 |
| 名次奖励 | 每物理 DC 前 300 名 | 经莫古力配送发放 |

> ⚠️ 官方 NA 排行页与 EU 排行页的**名次区间标注不一致**（EU 页另按 Europe / Oceania 标 100th/30th、300th/100th 等不同区间），**具体名次与成就的映射关系需以游戏内为准**。❓
>
> ⚠️ **棋盘总数**：**官方未公布**。粉丝站 Eorzean Tavern 称共 **5 张盘**（第一/第二/第三闘獣盤 + 第一/第二 Master's Board），含 45 场遭遇战、122 个敌人；famitsu 仅称「敌人事件准备了近 50 种」。[Eorzean Tavern](https://eorzeantavern.com/crucible-of-the-unbroken/) ❓/⚠️

> 来源：[NA Crucible Rankings](https://na.finalfantasyxiv.com/lodestone/ranking/crucible/)、[EU Crucible Rankings](https://eu.finalfantasyxiv.com/lodestone/ranking/crucible/)（核实日期 2026-09-15）

### 2.5 2026-09 服务器崩溃事件——完整核实

#### 2.5.1 官方记录（第一手）

**官方热修公告**（[FINAL FANTASY XIV Updated (Sep. 8)](https://jp.finalfantasyxiv.com/lodestone/news/detail/8bd359e4817774169a96609cb92fd67149942302)，核实日期 2026-09-15）原文：

> FINAL FANTASY XIV has been updated.
> \*There is no client update for this version update.
>
> [Date & Time]
> Sep. 8, 2026 11:55 p.m. (PDT)
>
> [Update Details]
> FINAL FANTASY XIV Hotfixes (Sep. 8, 2026)
>
> ■The following issue was addressed:
> ・**In beastmaster, if the player's character leaves the area due to a connection loss at the moment the pet uses a weapon skill that restores its master's HP, the server may crash.**

中文翻译：

> ■ 已修复以下问题：
> ・在**驯兽师**职业中，**当宠物使用恢复主人 HP 的武器技能的那一刻，若玩家角色因连接中断而离开当前区域，可能导致服务器崩溃。**

**伴随的官方公告**：

| 公告 | 时间 | 内容 |
|---|---|---|
| [All Worlds Emergency Maintenance (Sep. 8)](https://jp.finalfantasyxiv.com/lodestone/news/detail/fe272ef325fe6f154b4884fff014624dfd7699bb) | Sep. 8 23:00 – Sep. 9 03:00 PDT（后缩短） | 「In order to **Patch 7.56 HotFixes**, emergency maintenance will take place」 |
| [Follow-up](https://jp.finalfantasyxiv.com/lodestone/news/detail/df3882f51f1327d7f075a9bf68110ff38bc59396) | 结束时间提前至 Sep. 9 01:40 PDT | — |
| [FINAL FANTASY XIV Updated (Sep. 8)](https://jp.finalfantasyxiv.com/lodestone/news/detail/8bd359e4817774169a96609cb92fd67149942302) | Sep. 8 23:55 PDT | 热修明细（上引） |

**关键事实**：

- ✅ 这是**服务器端崩溃**，不是客户端崩溃
- ✅ 该热修 **不需要更新客户端**（"There is no client update for this version update"）
- ✅ 触发条件苛刻：需**同时**满足「宠物正在使用回血武器技能」+「玩家恰好因断线离开区域」
- ⚠️ 中文媒体（网易号转载 3DM，2026-09-13）称「只要手动拔一下网线就能轻松复现」——**这是媒体推断，官方未如此表述**，标记为 ⚠️ 待核实
- ✅ 官方**未公布补偿**（无免费游戏时间等补偿公告）

#### 2.5.2 关于「2026-09-13」这个日期

用户情报中的 9-13 并非空穴来风，但**必须区分三件事**：

| 事件 | 日期 | 官方口径 | 与驯兽师的关系 |
|---|---|---|---|
| 驯兽师服务器崩溃热修 | 2026-09-08 23:55 PDT（北京 09-09 14:55） | 「In beastmaster, … the server may crash」 | ✅ **直接因果，官方明写** |
| 中文媒体报道爆发 | 2026-09-13 | — | 标题如《最终幻想14》驯兽师BUG可致服务器崩溃 官方紧急修复（17173 / 网易号·3DM） | 
| Gilgamesh World 技术故障 | 2026-09-13 11:34–12:03 PDT | 原因：「**Server program issue**」；受影响：**Aether DC - Gilgamesh World 仅此一台** | ❌ **官方完全未提及驯兽师** |

> 来源：[\[Aether\] Recovery from Gilgamesh World Technical Difficulties (Sep. 13)](https://na.finalfantasyxiv.com/lodestone/news/detail/d89fc430c5c07937d2cf02025aa97a5c507c90b3)（核实日期 2026-09-15）

#### 2.5.3 事件全貌的正确表述

> ✅ **可以确定的**：2026-09-08 上线当天，驯兽师存在一个可导致**服务器崩溃**的严重 bug（触发条件：宠物使用回血武器技能的瞬间玩家断线离开区域）。Square Enix 在**当天深夜（PDT 23:00）**发起 All Worlds 紧急维护，并于 23:55 PDT 推送服务器端热修，无需客户端更新。
>
> ⚠️ **不能确定的**：2026-09-09 至 09-14 期间多台 World（含 Zodiark、Diabolos、Leviathan、Faerie、Raiden、Louisoix、Odin、Gilgamesh、Jenova）出现的零散技术故障，官方一律只写「Server program issue」，**没有任何一条官方公告把后续故障归因于驯兽师**。
>
> ❓ **未经证实**：中文媒体「拔网线即可轻松复现」的说法；以及「驯兽师上线导致大规模服务器崩溃」的夸张叙事。
>
> ✅ **无补偿**：官方未就 9 月这几次紧急维护发布补偿公告。
>
> ⚠️ **引用陷阱提醒**：搜索时容易命中的「Ongoing Congestion Situation and Compensation」是 **2021 年 12 月 Endwalker 上线拥堵**的旧公告（当时吉田发放了 7 天免费游戏时间），与本次事件**无关**，勿混用。

#### 2.5.4 用户列举的其他猜想逐条判定

| 猜想 | 判定 | 依据 |
|---|---|---|
| BUG 出在 `Capture` / `Gauge` | ❌ **错误**。官方记载的触发条件是「宠物使用**回复主人 HP 的武器技能**」＋「玩家掉线离开区域」，与 Capture / Gauge 无关 | ✅ 官方热修原文 |
| 存在「魔兽复制（familiar duplication）」bug | ❓ **无任何官方或可靠媒体证据** | — |
| 中央森林区域拥堵导致崩溃 | ⚠️ 官方确为**中央森林 + 7.56 新增区域**加了多实例分区以防拥堵，但**未把 9/13 的故障归因于此** | ✅ / ❓ |
| 官方「停用」了某功能 | ❌ **未见任何停用公告**；只有热修（无需客户端更新） | ✅ |
| 是否发放补偿 | ❓ **未发现** | — |

> **其他来源**（⚠️ 二次资料）：
> - famitsu 开发者访谈（2026-09-04，中川誠貴）：[famitsu.com/article/202609/86452](https://www.famitsu.com/article/202609/86452)
> - [Eorzean Tavern Crucible 指南（2026-09-14 更新）](https://eorzeantavern.com/crucible-of-the-unbroken/)

> 相关中文源（⚠️ 机器翻译/转述风险，待核实）：
> - [《最终幻想14》驯兽师BUG可致服务器崩溃 官方紧急修复（网易号·3DM，2026-09-13）](https://m.163.com/dy/article/L6NKJ0R70526D8LR.html)
> - [驯兽师登场！《最终幻想14》7.56版本正式上线（17173，2026-09-10）](https://news.17173.com/content/09102026/094329832.shtml)

### 2.6 Patch 7.58 及之后

- ✅ **Patch 7.58 存在且已官宣**（7.56 补丁说明中作为 Crucible Rankings Season One 的结束点被提及）
- ❓ **7.58 的具体上线日期、内容均未公布**
- ✅ **Series 12 覆盖到 8.0 上线**，说明 7.58 不会是 PvP Series 的分界点
- ✅ **Patch 7.5x 系列还有一个已公布但未上线的内容**：**Same-Region Player Matching（同区域玩家匹配）** —— 匹配范围从「逻辑 DC」扩大到「整个物理 DC」，**2026 年 10 月中旬先从日本开始**，北美与欧洲随后（来源：SE 官方新闻稿 2026-07-28）
- ✅ **2026-10-28**：新金碟小游戏 **Keybound Brawler**（FF7 主题打字小游戏，最多 4 人）

---

## 3. Patch 7.5「Trail to the Heavens」

### 3.1 官方公告与第 92 回制作人来信（Live Letter 92）

| 项目 | 内容 | 标记 |
|---|---|---|
| 官方新闻稿 | 《92nd Letter from the Producer Broadcast Unveils FINAL FANTASY XIV Patch 7.5 Trail to the Heavens Trailer and More》 | ✅ |
| 新闻稿发布日 | **2026-04-21** | ✅ |
| 补丁正式上线 | **2026-04-28**（官方两次确认） | ✅ |
| 特设站 | `na.finalfantasyxiv.com/dawntrail/patch_7_5/` | ✅ |
| 预告片 | `https://youtu.be/nsMbfTpL63c` | ✅ |
| 同场宣布的线下活动 | Fan Festival 2026 in Anaheim, CA，**2026-04-24 ～ 04-25** | ✅ |
| 同场宣布的联名 | Jollibee × FFXIV（2026-04-21 起，美加门店，可获 `Eat Chicken` 情感动作） | ✅ |

> 来源：[92nd Letter from the Producer Broadcast … | FINAL FANTASY PORTAL SITE](https://na.finalfantasy.com/news/2816)（核实日期 2026-09-15）

### 3.2 官方公布的 7.5x 内容清单（新闻稿原文逐条中译）

- **新主线任务**（New Main Scenario Quests）
- **同盟部族收官任务**（Allied Society Capstone Quests）
- **《不可思议的希尔迪布兰德》后续冒险**（Inconceivably Further Hildibrand Adventures）
- **新 Custom Deliveries：Tiisol Ja**
- **Duty Support 扩充**：追加 **The Dusk Vigil** 与 **Shisui of the Violet Tides** 的支援
- **PvP 更新**：**PvP Series 11 开始**，既有 PvP 动作调整，新增 Crystalline Conflict 竞技场 **Archeia Harmonia**
- **新副本**：**The Clyteum**
- **新同盟讨伐战**：**Echoes of Vana'diel, Part 3 – Windurst: The Third Walk**
- **新讨伐战**：**Enuo**（含 Normal 与 Extreme 两档）
- **新幻讨伐战（Unreal）**：**Shinryu's Domain (Unreal)** —— Lv100 挑战神龙
- **新 Ultimate Raid**（⚠️ 该「新 Ultimate」在 7.5 周期具体指哪一场，官方清单未点名；7.51 已确认推出 **Dancing Mad (Ultimate)**，见 §1.2）
- **Occult Crescent 更新**：新区域、新怪物、Critical Encounters、知识等级上限提升、多个新 Phantom Jobs
- **新限定职业：驯兽师（Beastmaster）** —— 「Capture beasts and call upon them to fight at your side!」
- **Phantom Weapon 更新**
- **海钓更新**：新航线（通往 Thavnair）
- **Cosmic Exploration 新星球：Auxsia** —— 面向生产采集玩家的新星球及追加调整
- **房屋更新**：室内外家具上限提升、新室内设计等
- **Armoire（衣柜）更新**：可存放道具数**大幅增加**
- **染色系统更新（Dye System Update）**
- **其他**：**伴侣陆行鸟系统更新**、生产更新、金碟更新等

### 3.3 7.5 主线剧情定位（官方特设站原文）

**Trail to the Heavens - Part 1（Patch 7.5，2026-04-28）**：

> "Returned from the levin-wracked lands of the Ninth, the Warrior of Light and their companions resume investigations into the key. Yet as they begin to unravel its mysteries, an ally's unsettling message threatens to draw their attention elsewhere..."

中文：光之战士一行从雷电肆虐的**第九世界**归来，继续调查那把「钥匙」。然而当他们开始解开其谜团时，一位同伴令人不安的讯息可能把他们的注意力引向别处……

**Trail to the Heavens - Part 2（Patch 7.56，2026-09-08）**：

> "The Solstice─a rejoining of the rejoining of the reflections guided by nature itself. Still reeling from Halmarut's proclamation, the Scions waver over how to face the looming calamity. Yet even as they falter, a path leading to horizons unknown opens before them..."

中文（官方英译再中译）：**Solstice（至点）——由自然本身引导的镜像世界再合并**。仍被 Halmarut 的宣告所震撼的晓之血盟，在面对逼近的灾厄时动摇不定。然而即便在他们踌躇之际，一条通往未知地平线的道路已在眼前展开……

> 💡 **世界观衔接要点**：
> - 7.x 的主战场是**第九世界**（the Ninth，雷电属性主导的镜像世界）
> - 8.0 的主战场是**第四世界**（the Fourth，**冰属性主导**的镜像世界）
> - 连接两者的危机名为 **Solstice（至点）**，其宣告者为 **Halmarut**
> - 8.0 开启的新篇章名为 **The Godless Realms Saga（无神界域传奇）**（官方新闻稿中一度误拼为 "Goddless Realms Saga"）

> 来源：[Patch 7.5 Special Site](https://na.finalfantasyxiv.com/dawntrail/patch_7_5/)、[92nd Live Letter 新闻稿](https://na.finalfantasy.com/news/2816)（核实日期 2026-09-15）

---

## 4. 8.0《Evercold》全部已公布情报

### 4.1 名称与各语言官方译名

| 语言 | 官方名称 | 标记 / 来源 |
|---|---|---|
| 英文 | **FINAL FANTASY XIV: Evercold** | ✅ 官方特设站 / SE 新闻稿 |
| 日文（官方排印） | **ファイナルファンタジーXIV：白銀のワンダラー** | ✅ 官方日文粉丝节站 / 日文 Evercold 特设站 |
| 日文（汉字标题） | 汉字写作 **「白銀の探求者」**，读音为 **「ワンダラー（Wanderer）」** | ⚠️ 有资料如此说明（可解释「探求者」与「ワンダラー」两种写法并存的现象）；**建议以官方 logo 排印的片假名「白銀のワンダラー」为准** |
| 繁体中文 | **《白銀探求者》** | ⚠️ 台湾媒体（4Gamers 等）转述官方繁中名 |
| **简体中文（官方）** | **《银海之天舟》** | ✅ **盛趣国服官方特设站**（`actff1.web.sdo.com/project/20260425evercold/`）；玩家称号为「**巡天者**」 |

> ⚠️ **给中文读者的重要提醒**：
> - 用户情报中的《白银的探求者》与**日文汉字标题「白銀の探求者」**一致，但与**官方简中名完全不同**。
> - **简中官方名是《银海之天舟》**（对应英文的 "Realmship（天舟/界舟）" 概念，呼应新地图「Naglfar, Realmship of Water」与「Hringhorni, Realmship of Fire」），已由**盛趣国服官方特设站**一手确认。
> - **引用简中名请用《银海之天舟》；引用日文名请用「白銀のワンダラー」；引用繁中名请用《白銀探求者》。**
> - 17173 的两篇报道**自身就混用了《银海之天舟》与《白银的探求者》两个名字**，可作为中文源讹误的典型例证。

### 4.2 上线时间

| 项目 | 内容 | 标记 |
|---|---|---|
| 正式上线 | **2027 年 1 月**（官方**仅公布到月份**，未公布具体日期） | ✅ |
| 具体日期 | 官方**未公布** | ❓ |
| **预售 / 抢先体验** | ✅ **官方明确表示「尚未公布」**。SE 柏林新闻稿原话：「**More information regarding availability and pre-orders will be announced in the future.**」（关于发售与预售的更多信息将在今后公布） | ✅ |
| ⚠️ 关于「一个月长的免费 Early Access」 | ❌ **不可采信**。此说法很可能与「Nintendo Switch 2 版上线时提供约一个月免费订阅期」混淆。**8.0 本体的 Early Access 安排官方未公布** | ⚠️/❓ |
| ⚠️ 关于各类「预售页面」 | 体育基达（Sportskeeda）等站点存在自带 "**speculation**"（推测）标记的预售猜测页，**不得作为事实来源** | ⚠️ |
| Collector's Bundle | 已公布内容物，价格与开订时间未公布 | ✅（内容）/ ❓（价格） |
| 8.0 的 **iLvl 上限** | **完全未公布**。Seasons 会重做品级成长路线，细节留待东京粉丝节 | ❓ |

> 来源：[Evercold 官方特设站](https://na.finalfantasyxiv.com/evercold/)（首页明示 "January 2027"）、[SE 官方新闻稿 2026-04-24](https://press.na.square-enix.com/SQUARE-ENIX-ANNOUNCES-EVERCOLD-LATEST-FINAL-FANTASY-XIV-EXPANSION-SET-)、[SE 官方新闻稿 2026-07-28](https://na.finalfantasy.com/news/2836)（核实日期 2026-09-15）

### 4.3 三场 Fan Festival 时间线与已公布节奏

官方在 2025-08-27 就公布了 2026 年三场粉丝节：

| 场次 | 城市 / 场馆 | 日期 | 状态（截至 2026-09-15） | 标记 |
|---|---|---|---|---|
| 北美 | Anaheim, California — Anaheim Convention Center | **2026-04-24 ～ 04-25** | ✅ 已举行 | ✅ |
| 欧洲 | Berlin, Germany — Messe Berlin, hub27 | **2026-07-25 ～ 07-26** | ✅ 已举行 | ✅ |
| 日本 | Tokyo — Makuhari Messe（幕张展览馆 国际展示场 展示厅 1-7） | **2026-10-31 ～ 11-01** | ⏳ **尚未举行** | ✅ |

> 💡 **关键情报缺口**：德文社区媒体在 Anaheim 场次的总结中明确写道「Um alle Veränderungen bekannt zu geben, werden alle 3 Fan Festivals benötigt!（要公布所有变更，需要全部 3 场粉丝节！）」。因此 **2026-10-31 的东京粉丝节基調講演（Day 1）将是 8.0 最后一波重磅情报**，包括：Bastion 的详细技能、第二新职业（物理远程 DPS）的正式公布、Evolved 模式细节、以及各类系统的最终形态。

> 来源：[SE 官方新闻稿《FAN FESTIVALS FOR 2026》2025-08-27](https://press.na.square-enix.com/SQUARE-ENIX-ANNOUNCES-FINAL-FANTASY-XIV-ONLINE-FAN-FESTIVALS-FOR-2026)、[东京粉丝节官网](https://fanfest.finalfantasyxiv.com/2026/jp/)（核实日期 2026-09-15）

### 4.4 剧情设定：第四世界 / 冰之世界

官方特设站的设定文案（原文 + 中译）：

> "In the time of the Ancients, Etheirys was divided across ten and three reflections to avert a terrible calamity. Thus, for twelve thousand years did the star survive, and by its enduring hope did the Warrior of Light at last thwart its Final Days.
>
> Yet victory comes at a cost, and fate now demands its due.
>
> **Faced with the new threat of the Solstice, the Warrior of Light is summoned to the Fourth reflection. But what do they hope to gain from wandering a world lost to ice?**
>
> Hold fast to your convictions and join with your comrades as you brave the ever-expanding world of FINAL FANTASY XIV!"

中文：

> 在**古代人**的时代，为了回避一场可怕的灾厄，Etheirys（母星）被分割为**十四个镜像世界**。于是这颗星球存续了一万两千年，并凭借其不灭的希望，光之战士终于阻止了**终末（Final Days）**。
>
> 然而胜利必有代价，命运如今索要它应得之物。
>
> **面对「Solstice（至点）」这一新威胁，光之战士被召唤至第四镜像世界。但在一个已被冰封的世界里流浪，他们究竟希望得到什么？**
>
> 坚守你的信念，与同伴并肩，勇敢踏入《最终幻想14》不断扩张的世界！

**关键设定要素汇总**：

| 要素 | 内容 | 标记 |
|---|---|---|
| 主舞台 | **第四世界（the Fourth reflection）** —— 一个「lost to ice（被冰夺走/冰封）」的镜像世界 | ✅ |
| 危机名称 | **Solstice**（至点；与 7.56 剧情文案「Faced with the coming Solstice」一致） | ✅ |
| 宣告者 | **Halmarut**（7.56 文案中宣称「等待所有世界的命运」的存在） | ✅ |
| 新篇章名 | **The Godless Realms Saga**（无神界域传奇） | ✅ |
| 属性主题 | **冰（Ice）** | ✅ |
| 新种族 | ❌ **没有新种族**（⚠️ 德文社区总结提到「wir lernen neue Rassen kennen（我们将认识新的种族）」，但**官方新闻稿与特设站均未公布任何新可玩种族**；「新种族」应理解为**新登场的 NPC 族群/文明**，而非新的可玩种族） | ❌/⚠️ |
| 巨型造物 | "Arcane colossi and other looming threats"（秘术巨像与其他威胁）；Anaheim 展示过「云中的巨大生物」 | ✅（特设站）/ ⚠️（细节） |

> 来源：[Evercold 特设站](https://na.finalfantasyxiv.com/evercold/)、[Patch 7.56 Notes](https://na.finalfantasyxiv.com/lodestone/topics/detail/a8a526ad64db45c8ca8d1c7fdcce8a5eedaa18bc)（核实日期 2026-09-15）

### 4.5 新地图（官方英文名）

**已公布的新区域（全部为官方英文名）**：

| 类型 | 官方英文名 | 中文试译 | 标记 |
|---|---|---|---|
| 新都市 | **Fargarth** | 法尔加斯 | ✅ |
| 新区域 | **Naglfar, Realmship of Water**（水之界舟 纳格尔法） | 「Naglfar」取自北欧神话中由死者指甲所造的巨船 | ✅ |
| 新区域 | **Hringhorni, Realmship of Fire**（火之界舟 赫林霍尔尼） | 「Hringhorni」是北欧神话中光明神巴德尔的葬船 | ✅ |
| 区域总称 | **The Icebound Realm of the Fourth**（第四的冰封领域） | — | ✅ |
| 其他 | "Distinctive new areas"（特色新区域）、"New cities"（复数新城市） | 官方刻意保留 | ✅ |

**官方区域介绍原文**：

> "The Icebound Realm of the Fourth — Explore new areas found aboard the Fourth's truly massive airships! The Realmship of Water, *Naglfar*; The Realmship of Fire, *Hringhorni*"

中文：

> 第四的冰封领域——探索第四世界那些**真正意义上的巨型飞船上**的新区域！水之界舟 *Naglfar*；火之界舟 *Hringhorni*。

> 💡 **设计含义（对放置游戏极重要）**：8.0 的新地图不是传统「大陆 + 分区」结构，而是**「巨型飞船 = 可探索的移动世界」**。这与「Auto Content Balancing（自动内容平衡）」和「主线可自选顺序」组合起来，意味着**地图是被拆成可任意顺序访问的「节点」**，而非线性推进的章节。这种「节点化世界」正是放置游戏的标准形态。

> 来源：[Evercold 特设站](https://na.finalfantasyxiv.com/evercold/)（核实日期 2026-09-15）

### 4.6 新职业

#### 4.6.1 Bastion（坚城卫）—— 8.0 第一个公布的新职业

| 项目 | 官方内容 | 标记 |
|---|---|---|
| 英文名 | **Bastion** | ✅ |
| 定位 | **Main Tank（主坦）** | ✅ |
| 武器 | **「skyltborg」**（一对巨型盾牌 / a pair of greatshields known as skyltborg） | ✅ |
| 战斗模式 | **Evolved Only（仅 Evolved 模式可用）** | ✅ |
| 初始等级 | **官方未公布**（用户情报的「初始 90 级」**未证实**） | ❓ |
| 是否限定职业 | 官方未说明；但官方明确「The Reborn and Evolved Modes are not applicable to limited jobs」，而 Bastion 是 Evolved Only，故**逻辑上不是限定职业** | ⚠️ 推论 |
| 技能细节 | 官方仅放出职业预告片（`https://youtu.be/uaZlrprwSq4`），技能表未公布 | ❓ |
| 与 FF14 历史职业的关系 | 官方与媒体均强调这是 FF 系列的**首次**：双大盾主坦。媒体表述为「a big first for Final Fantasy」（Polygon） | ⚠️ |
| 中文译名 | 中文社区通行译法为「坚城卫」（用户情报用语），官方简中译名**未核实** | ❓ |

官方新闻稿原文（2026-07-28）：

> "During the Fan Festival 2026 in Berlin keynote address, Producer and Director Naoki Yoshida revealed the first new job coming to Evercold: **Bastion—a main tank that wields a pair of greatshields known as skyltborg**—and unveiled a trailer showcasing the new job in action."

> 中文：在 2026 柏林粉丝节基調講演中，制作人兼总监吉田直树公布了《Evercold》的第一个新职业：**Bastion——使用一对名为 skyltborg 的巨型盾牌的主坦**，并公开了展示该职业实战的预告片。

#### 4.6.2 第二个新职业：物理远程 DPS（名称未公布）

| 项目 | 内容 | 标记 |
|---|---|---|
| 官方表述 | "Two new jobs: tank and physical ranged DPS"（Anaheim 2026-04-24 新闻稿） | ✅ |
| 柏林场次补充 | 官方特设站更新为 "**Two New Jobs: Bastion (Tank) and Physical Ranged DPS**" —— 仍未点名 | ✅ |
| 名称 / 武器 / 技能 | **全部未公布**，预期在 **2026-10-31 东京粉丝节**揭晓 | ❓ |
| 等级 | — | ❓ |

> ⚠️ **重要澄清**：官方公布的是 **2 个新职业**（1 坦 + 1 物理远程 DPS），**不是「Bastion 一个」**。用户情报中只提到 Bastion，遗漏了物理远程 DPS。

#### 4.6.3 等级上限

- ✅ **等级上限由 100 → 110**（官方多次确认）
- ❓ 各职业的具体升级节奏、是否有等级直升道具配套，未公布

> 来源：[Evercold 特设站](https://na.finalfantasyxiv.com/evercold/)、[SE 官方新闻稿 2026-04-24](https://press.na.square-enix.com/SQUARE-ENIX-ANNOUNCES-EVERCOLD-LATEST-FINAL-FANTASY-XIV-EXPANSION-SET-)、[SE 官方新闻稿 2026-07-28](https://na.finalfantasy.com/news/2836)（核实日期 2026-09-15）

### 4.7 大型联动任务（两个，性质完全不同）

#### 4.7.1 同盟讨伐战（Alliance Raid，24 人）：《EVANGELION - Ghosts of Desire》

| 项目 | 内容 | 标记 |
|---|---|---|
| 英文名 | **EVANGELION - Ghosts of Desire** | ✅ |
| 类型 | **Alliance Raid（同盟讨伐战，24 人）系列** | ✅ |
| 合作方 | **khara, Inc.**（《新世纪福音战士》制作公司） | ✅ |
| 公布时间 | **2026-04-24**（Anaheim 粉丝节） | ✅ |
| 预告片 | `https://youtu.be/680o2J54FKY`（2026-04）→ 柏林场次放出新预告 `https://youtu.be/ecjI-T1zP-o` | ✅ |
| 特别嘉宾 | **前田真宏（Mahiro Maeda）** —— 动画导演/原画师，参与过《Mad Max: Fury Road》(2015) 概念设计、《EVANGELION: 3.0+1.0 THRICE UPON A TIME》(2021) 导演/概念设计/分镜/美术设定/主要原画 | ✅ |
| 分几部分 | 官方称 "a multi-patch collaboration"，即**跨多个补丁连载**（具体章数未公布） | ✅ / ❓ |

> ⚠️ **纠正用户情报**：用户把「与 FF7 Remake 的联动大型任务」当成同盟讨伐战。实际上**同盟讨伐战（24 人）是《Evangelion》联动**；FF7 联动是 **8 人 Raid**。

#### 4.7.2 8 人 Raid 系列：《Beyond the Lifestream》（FF7 Remake 三部曲联动）

| 项目 | 内容 | 标记 |
|---|---|---|
| 英文名 | **Beyond the Lifestream** | ✅ |
| 类型 | **8 人 Raid 系列（New Raid Series）** | ✅ |
| 合作方 | **FF7 Remake 三部曲开发团队**；FF7 Remake 系列总监 **滨口直树（Naoki Hamaguchi）** 亲自登台 | ✅ |
| 公布时间 | **2026-07-25/26**（柏林粉丝节） | ✅ |
| 官方原话 | "Joined on stage by FINAL FANTASY VII Remake series Director Naoki Hamaguchi, Yoshida also revealed **"Beyond the Lifestream," a new FINAL FANTASY VII-themed 8-player raid series** that players will challenge in Evercold. **Both development teams are working closely together** to create an exciting new raid experience for players." | ✅ |
| 分几部分 | 未公布（FF14 的 8 人 Raid 系列通常为 3 层 + 1 个 Savage 周期的 4 层） | ❓ |
| 社区反应 | Kotaku 报道标题：「Final Fantasy 14's Next Expansion Will Feature A Crossover With Final Fantasy 7 So Of Course Fans Are Gonna Fight About It」——社区对「FF 系列内部联动」存在争议 | ⚠️ |

> 💡 **注意**：8.0 同时进行**两个大型联动**（跨社的 Evangelion + 社内的 FF7），这是 FF14 史上首次在同一资料片内叠加两个 IP 联动。

> 来源：[SE 官方新闻稿 2026-07-28](https://na.finalfantasy.com/news/2836)、[SE 官方新闻稿 2026-04-24](https://press.na.square-enix.com/SQUARE-ENIX-ANNOUNCES-EVERCOLD-LATEST-FINAL-FANTASY-XIV-EXPANSION-SET-)（核实日期 2026-09-15）

### 4.8 「World Raid」——核实结论：⚠️ **是开发代号（开发中の暂定名），不是 8.0 的正式玩法**

**核实结论修订**：

- ⚠️ **「World Raid」确实存在**，但它是**开发代号 / 内部暂定名**，而**不是 8.0 的正式实装内容**。
- ✅ **吉田直树已确认**：这是一个「**利用公共野外区域（public field areas）的大规模玩法**」，其**主设计师/指挥为中川誠貴（Nakagawa Masaki）**——即 Eureka（禁地优雷卡）、Bozja 系列的设计者。
- ✅ **明确不在 8.0 实装**（该内容属于 8.x 系列的后续更新）。
- ❓ **玩家数、结构、匹配方式、是否跨服——全部未公布。不得编造任何数字。**
- ⚠️ **不要在 8.0 的宣传或设计文档中使用「World Raid」作为正式玩法名**；它是开发团队内部的工作名称。

**8.0 本体官方公布的大型战斗内容实际只有四类**：

| 类型 | 名称 | 人数 | 标记 |
|---|---|---|---|
| 同盟讨伐战（Alliance Raid） | EVANGELION - Ghosts of Desire | 24 | ✅ |
| 8 人 Raid 系列 | Beyond the Lifestream（FF7 Remake 三部曲联动） | 8 | ✅ |
| Ultimate Raid | 未命名 | 8 | ✅ |
| 新讨伐战（Trials） | 未命名 | 8 / 4 | ✅ |
| ~~World Raid~~ | **开发代号，8.0 不实装** | 未公布 | ✅（存在）/ ❓（一切细节） |

**最容易被误认为「World Raid」的三件事**（用于消歧）：

1. **Same-Region Player Matching（同区域玩家匹配）** —— Patch 7.5x 系列，把匹配范围从「逻辑 DC」扩大到「整个物理 DC」，2026-10 中旬先从日本上线。✅ 官方确认
2. **Crucible Rankings 按物理 DC 聚合** —— 7.56 的排行榜机制，跨 World 汇总。✅ 官方确认
3. **「World」在 FF14 术语中 = 单个服务器**，而非「位面/世界」。中文语境下容易产生误解。⚠️ 术语问题

> 💡 **术语提示（对中文读者）**：FF14 的层级是 **World（单台服务器）→ Data Center（逻辑 DC）→ Physical Data Center（物理 DC）→ Region**。中文常把 World 译作「世界」，容易与「镜像世界（Reflection / 世界）」混淆。8.0 的「第四世界」是 **Reflection / 第一世界～第十三世界** 体系中的概念，与服务器架构的 World **完全无关**。

### 4.9 陆行鸟参战与重做

| 项目 | 官方内容 | 标记 |
|---|---|---|
| 官方标题 | **Chocobo Companion Updates / Chocobo Companion System Overhaul** | ✅ |
| 上线版本 | **Patch 8.1 开始**（**不是 8.0 本体**） | ✅ |
| 核心内容 1 | **陆行鸟育成系统全面重做（overhaul of the chocobo raising system）** | ✅ |
| 核心内容 2 | **可以召唤陆行鸟进入副本协助战斗（the ability to call forth your chocobo to assist you in dungeons）** | ✅ |

官方原文（特设站）：

> "Chocobo Companion Updates — Expansive updates to chocobo companions, including an overhaul of the chocobo raising system, as well as **the ability to call forth your chocobo to assist you in dungeons!**"

> ⚠️ **重要修正**：用户情报中的「陆行鸟参战与重做」**不属于 8.0 本体，而是 Patch 8.1**。8.0 玩家需要额外等待一个补丁。

> 来源：[Evercold 特设站](https://na.finalfantasyxiv.com/evercold/)、[SE 官方新闻稿 2026-07-28](https://na.finalfantasy.com/news/2836)（核实日期 2026-09-15）

### 4.10 自动导航 / 自动内容平衡

用户情报中的「自动导航」在官方源中**没有对应命名功能**，但有一个高度接近、且对放置游戏更有价值的系统：

#### 4.10.1 Auto Content Balancing（自动内容平衡）—— ✅ 官方确认

官方特设站原文：

> "**Auto Content Balancing** — In specific areas in Evercold, a new system will automatically adjust applicable content to match character level.
> - Allows party matching for players of different level ranges.
> - Balance within duties is adjusted to suit participants.
> - Field area enemy levels are automatically balanced.
> - Adjusts drop rate and item level for certain rewards."

中文：

> **自动内容平衡** —— 在 Evercold 的特定区域，新系统会**自动把适用内容调整到与角色等级匹配**。
> - **允许不同等级区间的玩家互相匹配组队**
> - 副本内的平衡会按参与者情况调整
> - **野外区域的敌人等级自动平衡**
> - 对特定奖励的**掉落率与物品等级进行调整**

官方新闻稿补充（2026-07-28）：

> "Through **Auto Content Balancing**, difficulty scaling and enemy levels will adjust to the appropriate player level **as they play through dungeons in their chosen order**."

> 中文：通过 Auto Content Balancing，**当玩家按自选顺序游玩副本时**，难度缩放与敌人等级会自动调整到与其等级相符的水平。

#### 4.10.2 主线顺序自由化（Main Scenario Update）—— ✅ 官方确认

> "**Main Scenario Update** — After a specific point in the main scenario, **players are free to choose the order in which they tackle certain areas**. How you progress through the story is up to you!"

中文：主线推进到某一节点后，**玩家可以自由选择攻略特定区域的顺序**。故事如何推进完全由你决定！

> 💡 **这是 8.0 最被低估的改动**。它把主线从「线性章节」改造为「**可任意顺序攻略的节点图**」，与 Auto Content Balancing 组合后，等价于：
> - 每个区域是**独立平衡的内容节点**
> - 玩家可以按自己的偏好与时间安排挑顺序
> - 系统自动把节点难度缩放到玩家当前等级
>
> **这正是放置游戏「自动缩放关卡 + 自由选择推进路线」的核心范式。**

#### 4.10.3 「自动导航」

官方源中**没有**名为「自动导航 / Auto-Navigation」的功能。可能被误解为：
- **Same-Region Player Matching**（跨物理 DC 匹配，降低找队门槛）⚠️
- **Auto Content Balancing**（自动缩放，降低入门门槛）✅

> 结论：**「自动导航」标记为 ❓ 未证实**；建议在文档中改述为「Auto Content Balancing + 主线顺序自由化」。

### 4.11 外观 / 动作自定义与捏脸扩充

#### 4.11.1 角色创建扩充（Expanded Character Customization）—— ✅ 官方确认

官方特设站原文：

> "A greater range of color options with the **new color picker**, the ability to **fine-tune features such as eyes and lips**, new elements such as **eye shadow**, and **removable components on certain gear**."

中文：

> - **全新取色器（color picker）** 带来更大范围的颜色选项
> - 可**微调眼睛、嘴唇等五官**
> - 新增**眼影**等元素
> - **特定装备上的部件可拆卸（removable components）**

德文社区总结补充了几个官方页面上未逐字列出的点（⚠️ 待核实）：
- 头发、眼睛、皮肤**均可使用取色器**
- **眼影与小纹身（kleine Tattoos）**
- **装备配饰可显示/隐藏**

#### 4.11.2 动作自定义（Customizable Action Animations / Character Action Skins）—— ✅ 官方确认

| 项目 | 内容 | 标记 |
|---|---|---|
| 官方名称（特设站） | **Customizable Action Animations** | ✅ |
| 官方名称（新闻稿） | **Character Action Skins** | ✅ |
| 交互方式 | 「Give abilities a personal touch with customizable animations for **general and job actions**」 | ✅ |
| 8.0 首发范围 | 柏林新闻稿明确：**首发仅支持 General actions（如 Teleport、Warp）**；「**support for additional skins such as job actions arriving in future updates**」 | ✅ |
| 获取方式 | 未公布（推测含商城/副本掉落） | ❓ |

官方新闻稿原文（2026-07-28）：

> "Additionally, a first look was provided for **Character Action Skins**, a feature that lets players assign alternate animations to personalize existing **General actions, such as Teleport and Warp**, with support for additional skins such as job actions arriving in future updates."

> ⚠️ **重要修正**：用户情报中的「外观动作自定义」在 8.0 首发时**只覆盖通用动作（Teleport / Warp 等），不含职业动作**。职业动作皮肤是「未来更新」内容。

### 4.12 战斗系统重构：Reborn Mode vs Evolved Mode —— ✅ 官方确认

这是 8.0 除「废除神典石」之外最重大的改动。

| 模式 | 定义（官方原文） | 标记 |
|---|---|---|
| **Reborn Mode** | "based on the **current combat system** and job mechanics" —— 基于现有战斗系统与职业机制 | ✅ |
| **Evolved Mode** | "offers **greater emphasis on job identity**" / "designed to **highlight each job's unique identity**" —— 更强调职业特色 | ✅ |

**关键规则（官方特设站脚注原文）**：

> "\* The Reborn and Evolved Modes are not applicable to **limited jobs**. Moreover, **new jobs introduced in Evercold can only be played using Evolved Mode**."

中文：

> \* Reborn 与 Evolved 模式**不适用于限定职业**。此外，**《Evercold》引入的新职业只能使用 Evolved 模式游玩**。

**已知的 Evolved Mode 设计目标（媒体补充）**：

| 内容 | 说明 | 标记 |
|---|---|---|
| 移除「2 分钟爆发元（two-minute meta）」 | 自 Shadowbringers 以来同步化的爆发窗口被移除；这是 Raid 优化的核心骨架 | ⚠️ 媒体（GamesRadar / MMOs.com） |
| 精简按键数量 | "trims the button count without gutting the complexity underneath" | ⚠️ 媒体 |
| 新职业只能用 Evolved | 官方 | ✅ |
| 副本设计哲学转向 | 助理总监表态：Evercold Raids 优先「**surprise and novelty**」而非「convenience and efficiency」，延续 Arcadion（Dawntrail 8 人 Raid）的方向 | ⚠️ 媒体（GamesRadar 引述助理总监） |

> 💡 **战略解读**：把新职业**锁死在 Evolved 模式**，是一种「渐进式强制迁移」设计——老玩家可以继续用 Reborn，但所有新内容（新职业）只在 Evolved 中可用。这是官方在不明说「旧系统会淘汰」的前提下，为未来全面切换预留的路径。

### 4.13 其他已公布内容

| 项目 | 内容 | 标记 |
|---|---|---|
| 新副本 | "New dungeons"（复数，未命名） | ✅ |
| 新讨伐战 | "New trials"（未命名） | ✅ |
| 新 Ultimate Raid | "A new Ultimate raid"（未命名） | ✅ |
| FATE / 狩猎 / 寻宝 | "FATEs, hunts, and treasure hunts" | ✅ |
| PvP 更新 | "PvP updates" | ✅ |
| Duty Support 更新 | "Duty Support updates" | ✅ |
| 新装备与配方 | "New gear and crafting recipes" | ✅ |
| 副本难度三档 | 「Eight-player raids will feature **a new difficulty setting between Normal and Savage**」 | ✅ |
| 金碟新小游戏 | **Keybound Brawler**（FF7 主题打字小游戏，最多 4 人），**2026-10-28** 上线 | ✅ |
| Same-Region Player Matching | Patch 7.5x，日本 2026-10 中旬先行 | ✅ |
| **不买 8.0 也能享受的更新** | ① 整体游戏设计改动；② 新战斗系统、PvP 更新、Duty Support 更新 | ✅ |
| Collector's Bundle 实体内容 | Evercold Special Art Box、Expertly Crafted Reaper Figure、Ethos Metal Keychain、Köttr Mini Plush、Tapestry of the Fourth | ✅ |
| Collector's Edition 数字内容 | **Crystal Skyltborg**（Bastion 武器）、**Vallhallar Odin mount**（坐骑）、**Entreat Crystal emote**（情感动作） | ✅ |
| 注册玩家数 | 「more than 30 million total registered players/accounts」 | ✅ |
| 内容免责 | "All content listed on this site is currently in development" / "subject to change prior to release" / "Content may be released via patch updates" | ✅ |

> 来源：[Evercold 特设站](https://na.finalfantasyxiv.com/evercold/)、[SE 官方新闻稿 2026-07-28](https://na.finalfantasy.com/news/2836)（核实日期 2026-09-15）

---

## 5. 8.0 的系统级重构（对放置游戏设计的核心参考）

> 本节是全文对放置游戏设计最直接相关的部分。每一项都给出：官方原话（英文）→ 中译 → 社区/媒体解读 → 对放置游戏的可迁移性。

### 5.1 废除亚拉戈神典石（Allagan Tomestones）→ Seasons + Adventure Activity

#### 5.1.1 官方原话

**官方特设站（Features → Game Design for the Modern Gamer）**：

> "**Introducing Seasons** — A redesigned framework for **earning rewards and increasing item level**."

中文：**「Seasons（赛季）」——一套重新设计的、用于获取奖励与提升物品等级的框架。**

**SE 官方新闻稿（2026-04-24）**：

> "The launch of Evercold and its subsequent patch series will also allow all FINAL FANTASY XIV players to enjoy various expanded updates to the game's design, in addition to the battle system changes, such as:
> - **Seasons: An overhaul to the way players earn rewards and improve their characters**"

中文：

> 《Evercold》及其后续补丁系列的上线，也将让所有 FF14 玩家享受到游戏设计层面的多项扩展更新（战斗系统改动之外），例如：
> - **Seasons：对玩家获取奖励、强化角色方式的全面重构**

#### 5.1.2 「每周自选进度」的官方说明（来自 Anaheim 基調講演）

以下内容来自德文社区媒体对 Anaheim 基調講演现场演示的完整记录（⚠️ 媒体转述，但内容具体、与官方措辞高度吻合，可信度较高）：

> **Adventure Activity**（UI 仍在开发中，可能变更）
> - 这**不再是每日任务系统，而是每周系统**
> - 玩家**收集点数**以完成每周系统的目标
> - **自由度更高**：有更多内容可以提供对应点数
> - **部分点数只能获得一次**（例如完成主线故事任务），**另一些则可重复获取**
> - **可以补领上周的点数**（即上周未达上限的部分，可在本周补足，直到达到上限）
> - 提升物品等级的方式也会改变——过去这常常拖慢游戏节奏，这一状况也将改变（后续公布）
> - **全新引入 Season（赛季）系统**。不是赛季通行证、也不是免费游戏模式！
> - **补丁系列将成为赛季单位**：例如 7.0 → 7.1 视为一个「Patch Season」

**17173 的中文转述**（⚠️ 机器翻译/转述风险，待核实，但核心引语与官方口径一致）：

> 「借助《银海之天舟》版本，我们计划将这套体系从每日制改为每周制，以此更好地适配玩家们多种多样的游玩风格与生活节奏，帮助大家更好地规划自己有限的空闲时间。」
>
> 「通过将每日循环改为每周循环，玩家们能拥有更多选择，自由决定自己的游玩方式。你想每天都上线玩一小会儿？完全可以。你想工作日不玩，把一整周的游玩内容集中在周六周日完成？也完全没问题。你可以根据自己的现实生活安排，决定游戏内的游玩节奏，**不会受到任何惩罚**。」
>
> 「你的角色成长将不再依赖随机任务，而是通过一系列**每周轮换的任务**来推进。完成这些任务——**包括推进主线剧情任务、采集收藏品、通关副本等内容**——即可获得每周活跃度点数。全新的『**冒险者活跃度**』界面，看起来有点像战斗通行证，会显示点数的累计进度，随着等级提升，你将逐步解锁全新的装备。」

#### 5.1.3 「神典石被废除」的证据链与旁证

| 证据 | 内容 | 标记 |
|---|---|---|
| 官方特设站 | 用 **Seasons** 描述「earn rewards and increase item level」的全新框架 | ✅ |
| 官方新闻稿 | 明确「overhaul to the way players earn rewards and improve their characters」 | ✅ |
| 媒体一致报道 | GameFused（2026-04-25）：「**The tomestone grind is dead.** … Square Enix is scrapping the currency system entirely for Evercold」 | ⚠️ |
| 媒体一致报道 | MMOs.com：「**tomestone currency** is being scrapped」 | ⚠️ |
| 反证（7.x 末期） | 7.56 补丁说明反而**把 mnemonics 神典石周上限从 450 提升到 900** —— 这是**旧体系退出前的最后一次加码**，用于过渡期配平 | ✅ |
| 官方未明确 | 官方**从未在任何一处原文中使用「removing Allagan tomestones」的措辞**；「废除神典石」是媒体基于 Seasons 系统与吉田演示内容的**推断与总结** | ⚠️ |

> ⚠️ **精度要求**：如果文档或产品设计需要引用这一条，**正确的表述是**：
>
> - ✅ 「官方在 8.0 推出 **Seasons / Adventure Activity** 系统，把角色成长从**每日随机任务循环**改为**每周自选任务清单**，并提供多条可产出每周点数的获取途径（主线任务、采集收藏品、副本等）。」
> - ⚠️ 「**媒体普遍解读为废除亚拉戈神典石货币**，并根据吉田在现场展示的『神典石太多了』的 PPT 与发言，认为该货币将被取消。」
> - ❓ 「官方未发布正式声明逐字确认『删除亚拉戈神典石』，且旧神典石的兑换/转换方案未公布。」

#### 5.1.4 未解决的关键问题（❓ 全部未公布）

| 问题 | 状态 |
|---|---|
| 旧亚拉戈神典石会如何处理（转换？作废？保留兑换？） | ❓ |
| 神典石 NPC 商人（各城邦兑换点）会变成什么 | ❓ |
| 周点数上限是多少 | ❓ |
| 「部分点数只能获得一次」的一次性点数，是否会形成不可逆的追赶差距 | ❓ |
| 「可补领上周点数」的补领窗口有多长（1 周？到赛季结束？） | ❓ |
| Season（赛季）的长度与结算规则（7.0→7.1 为 1 赛季的换算在 8.x 如何对应） | ❓ |
| 季节结束后点数是否清零、装备是否降级 | ❓ |

> 来源：[Evercold 特设站](https://na.finalfantasyxiv.com/evercold/)、[SE 官方新闻稿 2026-04-24](https://press.na.square-enix.com/SQUARE-ENIX-ANNOUNCES-EVERCOLD-LATEST-FINAL-FANTASY-XIV-EXPANSION-SET-)、[GameFused 报道 2026-04-25](https://gamefused.com/final-fantasy-xiv-evercold-overhaul)、[MMOs.com 报道 2026-06-28](https://mmos.com/news/mmorpg-news/ffxiv-evercold-raids-design-philosophy)、[17173 中文报道 2026-04-25（⚠️ 待核实）](https://news.17173.com/content/04252026/180206385.shtml)（核实日期 2026-09-15）

### 5.2 物品等级（iLvl）改为绑定角色而非单个职业

#### 5.2.1 官方原话

**官方特设站**：

> "**Armoury Update** — The better to facilitate play with multiple jobs!"

中文：**「军械库更新」——为了更好地支持多职业游玩！**

**SE 官方新闻稿（2026-04-24）**：

> "- **Armoury Update: To better facilitate playing with multiple jobs**"

#### 5.2.2 官方现场说明（吉田直树原话）

**德文社区记录的现场表述**（⚠️ 转述）：

> - 目前每个职业都必须单独存放不同物品等级的装备，这很快就会占用大量空间
> - 有了 8.0，你将**能够把自己最高的物品等级（Item Level）转移到其他职业上**，**即使这些职业的等级还比较低**
> - 因此该系统提供了更多自由度

**17173 的中文转述**（⚠️ 待核实）：

> 「在 8.0 版本中，职业体系依然保留，你依然需要分别升级各个职业，但现在，**玩家可以将自己的最高装等同步到其他职业上**。重申一下，**这其中不包括魔晶石（Materia）提供的属性加成**。我们依然希望，那些追求极致毕业的玩家，能有为之努力的目标。但对于绝大多数玩家来说，这个全新功能意味着，你能拥有更多的自由，去选择自己想玩的内容、想玩的职业。」

#### 5.2.3 精确解读（关键区分）

| 项目 | 官方/媒体表述 | 精确含义 | 标记 |
|---|---|---|---|
| 职业仍然独立升级 | 是 | 「职业等级」依然逐职业独立 | ✅ |
| 「最高装等同步到其他职业」 | 是 | 角色的**最高 iLvl 会被套用到其他职业**上 | ✅ |
| 是否仍需要穿装备 | 未明确 | 表述为「把自己的最高装等同步到其他职业」，**不等于装备被共享**；更可能是**系统自动按最高 iLvl 缩放/等效化** | ⚠️ |
| 魔晶石加成是否包含 | **不包含** | 官方明确排除 Materia 属性，保留「极限毕业」的追求目标 | ✅ |
| 是否对低等级职业生效 | **是** | 德文记录明确「auch wenn sich diese noch auf einem niedrigeren Level befinden（即使这些职业还处于较低等级）」 | ⚠️ |
| 对坦克/治疗/DPS 职能的影响 | 未公布 | 装备的职能适配（如防御属性、武器伤害）如何处理，官方未说明 | ❓ |
| 对幻化（Glamour）的影响 | 未公布 | ❓ |
| 是否会影响副本准入（item level requirement） | 未公布 | ❓ |

> 💡 **设计含义（对放置游戏）**：这是一个**「账号级 iLvl 下限/基线」**机制——玩家的**最高成就被提取成一个角色级属性**，然后对所有并行培养的「职业线」生效。它解决的是「多线养成时的重复劳动」问题，同时用「魔晶石不共享」保留了一条**深度垂直养成**的追求线。这是「**横向解放 + 纵向保留**」的经典双层设计。

> 来源：[Evercold 特设站](https://na.finalfantasyxiv.com/evercold/)、[SE 官方新闻稿 2026-04-24](https://press.na.square-enix.com/SQUARE-ENIX-ANNOUNCES-EVERCOLD-LATEST-FINAL-FANTASY-XIV-EXPANSION-SET-)、[Crystal Universe 德文现场记录](https://crystaluniverse.de/news/ffxiv-zusammenfassung-keynotes-fan-festival-2026-anaheim/)、[17173（⚠️ 待核实）](https://news.17173.com/content/04252026/180206385.shtml)（核实日期 2026-09-15）

### 5.3 副本难度改为三档：Normal / 新增中间难度 / Savage

#### 5.3.1 官方原话

**官方特设站（New to Evercold → Expanded Battle Settings）**：

> "**Expanded Battle Settings** — **Eight-player raids will feature a new difficulty setting between Normal and Savage** to suit a greater variety of playstyles."

中文：

> **战斗设定扩充** —— **8 人 Raid 将新增一档介于 Normal 与 Savage 之间的难度设定**，以适配更多样的游玩风格。

#### 5.3.2 精确解读

| 项目 | 内容 | 标记 |
|---|---|---|
| 有中间难度 | ✅ 官方确认 | ✅ |
| **中间难度的正式名称** | **官方未公布**（没有任何官方原文给出「Advanced」「Hard」「Extreme」之类的名号） | ❓ |
| 覆盖范围 | 明确为 **8 人 Raid**（Eight-player raids） | ✅ |
| 是否覆盖其他内容（同盟讨伐战、讨伐战、四人副本） | 官方未说明 | ❓ |
| Ultimate 是否算作第四档 | 官方将 Ultimate 单列为 "A new Ultimate raid"，未纳入「三档」表述 | ✅ |
| 中间难度的设计目标 | 「for players who outgrow Normal but aren't ready for Savage progression」——为「已超越 Normal 但还没准备好 Savage 进度」的玩家而设 | ⚠️ 媒体（MMOs.com） |
| 与既有 Variant / Criterion 的关系 | **官方未建立任何关联** | ❓ |

#### 5.3.3 关于「Variant Advanced 的先例」——核实

FF14 现有的相关难度体系（用于对照，非 8.0 内容）：

| 内容类型 | 难度档 | 人数 | 说明 |
|---|---|---|---|
| **Variant Dungeon（可变副本）** | 普通（可 1–4 人，支持 NPC） | 1–4 | Dawntrail 前引入 |
| **Variant Dungeon** | **Variant Advanced（可变副本·上级）** | 1–4 | 更高难度、有追加机制 |
| **Criterion Dungeon（基准副本）** | Criterion | 4（固定编成） | 无复活、机制更严 |
| **Criterion Dungeon** | **Criterion Savage** | 4 | 最严苛，无复活、无检查点 |
| **8 人 Raid** | Normal | 8 | — |
| **8 人 Raid** | Savage | 8 | — |
| **8 人 Raid** | **（8.0 新增中间档，未命名）** | 8 | 官方特设站 |
| **Ultimate Raid** | Ultimate | 8 | 独立最高档 |

> ⚠️ **纠正用户情报**：用户提到的「另有 Variant Advanced 的先例」是**正确的事实**，但它属于**四人可变副本**的难度体系，与 8.0 新增的**八人 Raid 中间难度**是**两套独立体系**。官方**从未**表示 8.0 的中间难度会沿用「Variant Advanced」的名称或机制。

#### 5.3.4 三档难度的设计意义

Media 分析（⚠️ MMOs.com，2026-06-28）：

> "The mid-tier difficulty addition is the other structural move worth watching. **Normal mode has long been too forgiving to hold endgame-adjacent players, while Savage demands a level of coordinated commitment that prices out a large portion of the playerbase.** A confirmed middle tier … suggests Square Enix is trying to **build a fuller difficulty ladder rather than leaving a wide gap between casual and hardcore**. How that middle tier is tuned at launch will determine whether it becomes a genuine stepping stone or another difficulty that gets solved and abandoned in the first lockout week."

中文：

> 中间难度的加入是另一个值得关注的结构性举措。**Normal 长期以来过于宽容，留不住接近终局的玩家；而 Savage 又要求团队级的协调投入，把大部分玩家挡在门外。** 官方确认的中间档……表明 Square Enix 正在试图**搭建一条更完整的难度阶梯，而不是在休闲与硬核之间留一道巨大鸿沟**。这一档上线时的调校，将决定它成为真正的踏脚石，还是又一个在首杀周就被攻略完毕并荒废的难度。

> 来源：[Evercold 特设站](https://na.finalfantasyxiv.com/evercold/)、[MMOs.com 2026-06-28](https://mmos.com/news/mmorpg-news/ffxiv-evercold-raids-design-philosophy)、[GamesRadar 原文（引述）](https://www.gamesradar.com/games/final-fantasy/final-fantasy-14-evercold-raids-follow-the-arcadions-lead-as-the-mmos-assistant-director-teases-theyll-value-surprise-and-novelty-over-convenience-and-efficiency/)（核实日期 2026-09-15）

### 5.4 「装备等级复制机制」核实

用户情报中的「装备等级复制机制（满级职业间复制最高装等）」——**与 §5.2 的 Armoury Update 是同一件事**。

**核实结论**：

| 用户的表述 | 官方实际表述 | 结论 |
|---|---|---|
| 「满级职业间复制最高装等」 | 「you will be able to transfer your highest item level to your other jobs」+ 官方「Armoury Update: To better facilitate playing with multiple jobs」 | ⚠️ **部分正确**：机制确实是「把最高 iLvl 套用到其他职业」，但**不限于满级职业**（德文记录明确包括「还处于较低等级」的职业） |
| 「复制」 | 官方措辞是「**转移/同步**（transfer / apply）」，**不是「复制装备」** | ⚠️ 措辞需精确 |
| 是否排除魔晶石 | 排除 | ✅ |

> ⚠️ **结论**：不存在一个独立的、名为「装备等级复制机制」的官方系统。**正确的引用方式是「Armoury Update（军械库更新）」**。

### 5.5 官方原话汇总表（可直接引用）

| # | 系统 | 官方原话（英文） | 出处 | 标记 |
|---|---|---|---|---|
| 1 | Seasons | "A redesigned framework for earning rewards and increasing item level." | Evercold 特设站 | ✅ |
| 2 | Seasons | "Seasons: An overhaul to the way players earn rewards and improve their characters" | SE 新闻稿 2026-04-24 | ✅ |
| 3 | Armoury Update | "Armoury Update — The better to facilitate play with multiple jobs!" | Evercold 特设站 | ✅ |
| 4 | Armoury Update | "Armoury Update: To better facilitate playing with multiple jobs" | SE 新闻稿 2026-04-24 | ✅ |
| 5 | 三档难度 | "Eight-player raids will feature a new difficulty setting between Normal and Savage to suit a greater variety of playstyles." | Evercold 特设站 | ✅ |
| 6 | 战斗模式 | "Switch between Reborn Mode, based on the current combat system, and Evolved Mode, designed to highlight each job's unique identity." | Evercold 特设站 | ✅ |
| 7 | 新职业限制 | "The Reborn and Evolved Modes are not applicable to limited jobs. Moreover, new jobs introduced in Evercold can only be played using Evolved Mode." | Evercold 特设站 | ✅ |
| 8 | 自动平衡 | "In specific areas in Evercold, a new system will automatically adjust applicable content to match character level." | Evercold 特设站 | ✅ |
| 9 | 主线自由顺序 | "After a specific point in the main scenario, players are free to choose the order in which they tackle certain areas." | Evercold 特设站 | ✅ |
| 10 | 免购 8.0 可享 | "Players can enjoy certain updates without purchasing Evercold, including: Overarching changes to game design; New battle system, PvP updates, and Duty Support updates" | Evercold 特设站 | ✅ |
| 11 | Bastion | "Bastion—a main tank that wields a pair of greatshields known as skyltborg" | SE 新闻稿 2026-07-28 | ✅ |
| 12 | FF7 联动 | ""Beyond the Lifestream," a new FINAL FANTASY VII-themed 8-player raid series" | SE 新闻稿 2026-07-28 | ✅ |
| 13 | 陆行鸟 | "Expansive updates to chocobo companions, including an overhaul of the chocobo raising system, as well as the ability to call forth your chocobo to assist you in dungeons" | SE 新闻稿 2026-07-28 | ✅ |
| 14 | 陆行鸟版本 | "Chocobo Companion System Overhaul – Patch 8.1" | SE 新闻稿 2026-07-28 | ✅ |
| 15 | 战斗设定 | "Character Action Skins … to personalize existing General actions, such as Teleport and Warp, with support for additional skins such as job actions arriving in future updates." | SE 新闻稿 2026-07-28 | ✅ |

### 5.6 社区反应

#### 5.6.1 反应的整体图景

| 改动 | 社区倾向 | 说明 | 标记 |
|---|---|---|---|
| 废除神典石 / 每周自选 | **强烈正面** | 「终于不用每天刷神典石了」（中文媒体标题）；媒体普遍视为「尊重玩家时间」的转向 | ⚠️ |
| 装等角色化（Armoury Update） | **强烈正面** | 「For a game built around the idea that one character can play every class, the fix is long overdue.」 | ⚠️ |
| 三档难度 | **正面但持观望** | 关注点为「调校」，担心变成「首杀周后再无人问津的难度」 | ⚠️ |
| Reborn / Evolved 双模式 | **分歧** | 支持者认为解决「2 分钟爆发元」是好事；担忧者认为把新职业锁在 Evolved 是变相强制迁移 | ⚠️ |
| FF7 联动 | **分歧明显** | Kotaku 标题直言「粉丝当然又要吵起来」；部分玩家希望新 Raid 是原创 IP 而非 FF 系列内部联动 | ⚠️ |
| Evangelion 联动 | **多数正面** | 与 khara 官方合作、前田真宏参与，被视为诚意足够的跨界 | ⚠️ |

#### 5.6.2 关键引语

**关于 2 分钟元（GamesRadar 引述，经 MMOs.com 转述）**：

> "Nobody will miss it"（没人会怀念它）—— 媒体概括社区对移除同步爆发窗口的反应

**关于 Dawntrail 的口碑背景（GameFused，2026-04-25）**：

> "Dawntrail left the player base split, and **Steam reviews stayed mixed for months** over complaints about pacing, storytelling, and job design that Square Enix could not ignore. Evercold is the response. … Naoki Yoshida has called it a turning point, which is the kind of label you only attach when the last turn didn't go well."

中文：

> Dawntrail 让玩家群体分裂，**Steam 评价连续数月停留在「褒贬不一」**，抱怨集中在节奏、叙事与职业设计上，Square Enix 无法忽视。Evercold 就是回应。…… 吉田直树称其为转折点——而你只会在上一个转折点不顺利时，才使用这种说法。

**关于整体设计意图（GameFused）**：

> "Taken together with the weekly missions and shared item level, the picture is consistent. **Square Enix wants players to spend their limited hours on the parts of FFXIV they actually enjoy rather than on the bookkeeping around them.**"

中文：

> 把每周任务与共享装等放在一起看，图景是一致的：**Square Enix 希望玩家把有限的时间花在他们真正喜欢的 FF14 内容上，而不是花在这些内容周围的『记账工作』上。**

> 来源：[GameFused 2026-04-25](https://gamefused.com/final-fantasy-xiv-evercold-overhaul)、[MMOs.com 2026-06-28](https://mmos.com/news/mmorpg-news/ffxiv-evercold-raids-design-philosophy)（核实日期 2026-09-15）

---

## 6. 平台与商业模式现状（截至 2026-09-15）

### 6.1 Nintendo Switch 2 版本

| 项目 | 内容 | 标记 |
|---|---|---|
| 首次公布 | **2026-04-24**（Anaheim 粉丝节，由 SE 社长兼 CEO **桐生隆司（Takashi Kiryu）** 登台宣布） | ✅ |
| 当时口径 | 「This version will be arriving in **August 2026**. We plan to have an **early access period**, to test server stability, then launch into official service.」 | ✅ |
| 最终定档 | **2026-08-04（周二）** | ✅ |
| 预购开放 | **2026-07-28** 起（Nintendo eShop） | ✅ |
| 上线版本 | **Free Trial、Starter Edition、Complete Edition、Dawntrail** 全部同日上线 | ✅ |
| 免费期 | 「To ensure server stability, there will be an **approximately one-month free subscription period** on Nintendo Switch 2.」——为保障服务器稳定性，Switch 2 版提供**约一个月的免费订阅期** | ✅ |
| 是否可以直接免费玩 | ✅ 是。Kotaku 报道标题：「Final Fantasy 14 Is Out Now On Nintendo Switch 2 **But You Don't Have To Buy It To Play**」——Switch 2 版可玩 Free Trial | ✅ |
| 可免费游玩时长 | ⚠️ 有媒体称「300 小时以上」（Eurogamer 葡萄牙语版标题）；这是对 Free Trial 内容的时长估算，非官方数字 | ⚠️ |
| 价格 | ⚠️ 有媒体标题提及「€14.99」（Eurogamer 葡萄牙语版标题 `final-fantasy-14-na-nintendo-switch-2-por-1499`），推测为 Starter Edition 价格；**官方产品页未确认** | ⚠️/❓ |
| 是否原生版 | ⚠️ 是原生移植（非云版）；具体分辨率/帧率官方与媒体数据**未完整核实** | ⚠️ |
| 商城支付 | ✅ 通过 **Nintendo eShop** 购买 FFXIV Coins（7.56 补丁说明中有一条「购买 FFXIV Coins 时未跳转到 Nintendo eShop」的 Switch 2 专属修复，可反证此机制存在） | ✅ |
| 跨平台 / 跨存档 | ✅ 是（FF14 全平台账号通用；Lodestone 页面底部同时列出 PS5/PS4、Xbox Series X\|S、Switch 2、Windows、Mac、Steam 六个平台图标） | ✅ |

> 来源：[SE 官方新闻稿 2026-07-28](https://na.finalfantasy.com/news/2836)、[SE 官方新闻稿 2026-04-24](https://press.na.square-enix.com/SQUARE-ENIX-ANNOUNCES-EVERCOLD-LATEST-FINAL-FANTASY-XIV-EXPANSION-SET-)、[Patch 7.56 Notes](https://na.finalfantasyxiv.com/lodestone/topics/detail/a8a526ad64db45c8ca8d1c7fdcce8a5eedaa18bc)（核实日期 2026-09-15）

### 6.2 免费试玩（Free Trial）当前覆盖范围

免费试玩在 2026 年经历了**一次重大扩充**。对比三个时点的官方口径：

| 时点 | 官方口径 | 覆盖资料片 | 补丁上限 | 等同类比 |
|---|---|---|---|---|
| 2025-08-27 | 「all content from A Realm Reborn, the Heavensward and Stormblood expansions (and updates through Patch 4.58)」 | ARR + HW + SB | **4.58** | 3 部正统作 |
| 2026-04-21 | 同上（**尚未扩充**） | ARR + HW + SB | 4.58 | 3 部正统作 |
| **2026-04-28 起** | 「the Free Trial for the critically acclaimed FINAL FANTASY XIV Online saga will also be **expanded to include the highly praised third expansion, Shadowbringers**. With all content up to **Patch 5.58** soon to be included」 | **ARR + HW + SB + ShB** | **5.58** | **4 部正统作** |
| 2026-07-28 | 「The Free Trial now contains all content from A Realm Reborn, Heavensward, Stormblood and **Shadowbringers** expansions up through **patch 5.58**」 | ARR + HW + SB + ShB | 5.58 | 4 部正统作 |

**关键结论**：

- ✅ **当前（2026-09-15）免费试玩覆盖：ARR + Heavensward + Stormblood + Shadowbringers，直至 Patch 5.58**
- ✅ **不含 Endwalker（6.x）与 Dawntrail（7.x）**
- ✅ **等级上限：70**（因为 5.x 的等级上限为 80，但 FF14 Free Trial 官方长期标注上限为 70）⚠️ **这一条需要复核**
  - ⚠️ **重要不确定点**：官方新闻稿只说「包含 5.58 之前的内容」，**未明确写出等级上限数字**。历史上 Free Trial 的上限为 **Lv 70**（对应 Stormblood 结束）。扩充到 Shadowbringers（上限 Lv 80）后**等级上限是否提升至 80，官方文本未确认**。**本项标记为 ❓ 待核实，不应在文档中当作确定事实。**
- ✅ **游玩时间无限制**（"without limit on playtime"）
- ✅ 官方描述为「equivalent to **four full FINAL FANTASY titles**」
- ❓ Free Trial 的具体限制项（市场板、金币上限、理符、PvP、Party Finder 等）**未在本次检索的官方源中列出**，需查阅官方 Free Trial 专页确认
- ❓ 8.0 是否会再次扩充 Free Trial（如加入 Endwalker），**官方未公布**

> 来源：[SE 官方新闻稿 2026-04-24](https://press.na.square-enix.com/SQUARE-ENIX-ANNOUNCES-EVERCOLD-LATEST-FINAL-FANTASY-XIV-EXPANSION-SET-)、[SE 官方新闻稿 2026-07-28](https://na.finalfantasy.com/news/2836)、[SE 官方新闻稿 2025-08-27](https://press.na.square-enix.com/SQUARE-ENIX-ANNOUNCES-FINAL-FANTASY-XIV-ONLINE-FAN-FESTIVALS-FOR-2026)（核实日期 2026-09-15）

### 6.3 各平台现状

| 平台 | 状态 | 标记 |
|---|---|---|
| **PlayStation 5** | ✅ 现役；7.56 补丁说明中有 PS5 新奖杯 | ✅ |
| **PlayStation 4** | ⚠️ **仍标注为支持平台**（Lodestone 与 Evercold 特设站底部均含 PS5/PS4 图标） | ✅ |
| **Xbox Series X\|S** | ✅ 现役；7.56 补丁说明中有 Xbox Series X\|S 新成就 | ✅ |
| **Nintendo Switch 2** | ✅ 2026-08-04 上线 | ✅ |
| **Windows** | ✅ 现役（含独立启动器版） | ✅ |
| **Mac** | ✅ 现役 | ✅ |
| **Steam** | ✅ 现役 | ✅ |
| 是否有关停平台 | ❓ 未检索到官方关停公告 | ❓ |
| 8.0 支持平台 | ✅ PS5/PS4、Xbox Series X\|S、Nintendo Switch 2、Windows、Mac、Steam（Evercold 特设站明确列出） | ✅ |

### 6.4 月卡与商城现状

| 项目 | 状态 | 标记 |
|---|---|---|
| 订阅制 | ✅ 维持（按 30/90/180 天计费的 Entry / Standard 双轨制为长期结构） | ⚠️ 具体价格未核实 |
| 2025–2026 是否涨价 | ❓ 未检索到官方价格调整公告 | ❓ |
| 理符（Retainer）追加费用 | ❓ 未核实 | ❓ |
| Mog Station / FFXIV Online Store | ✅ 运营中，2026 年 9 月有「Mog Mog Collection」活动 | ✅ |
| 官方商城 | ✅ `store.finalfantasyxiv.com` 运营中，粉丝节纪念道具在售（2026-08-12 前折扣） | ✅ |
| Fantasia / 职业直升道具 | ❓ 未核实是否有变化 | ❓ |
| Switch 2 的 Coins 购买 | ✅ 通过 Nintendo eShop | ✅ |
| 8.0 商业模式变化 | ❓ 官方未公布任何订阅/商城模式变更 | ❓ |

### 6.5 中国服务器（国服）

| 项目 | 内容 | 标记 |
|---|---|---|
| 运营商 | 盛趣游戏（Shengqu Games，前盛大游戏） | ⚠️ |
| 版本进度 | ⚠️ 检索到 2025-09-16 的腾讯新闻转载《全球版本同步再加速！盛趣游戏《FF14》7.3版本今日上线》——说明**国服在 2025-09 上线 7.3**，与全球版本存在**明显滞后但正在加速同步** | ⚠️ 待核实 |
| 2026-09 国服具体版本 | ❓ **未获可靠核实**。未检索到国服 7.4 / 7.5 / 7.56 的官方上线公告 | ❓ |
| 8.0 国服计划 | ❓ **完全未公布** | ❓ |
| 韩服 | ❓ 本次未完成核实（运营商为 Actozsoft 的历史信息需复核） | ❓ |

> ⚠️ **国服部分的结论**：**本文无法为国服 2026-09 的版本进度提供可靠结论**。中文检索结果多为第三方攻略站与聚合站（游戏陀螺、biliplay、43u、fygamer 等），**均无官方一手信息**，且存在大量 SEO 农场内容。建议如需国服数据，直接访问国服官网与官方公告，或查阅盛趣游戏官方微博。
>
> ❓ **标记为未核实，不得当作事实引用。**

### 6.6 玩家规模

- ✅ **超过 3000 万注册账号**（"more than 30 million total registered players/accounts"）——SE 官方新闻稿 2025-08-27 / 2026-04-21 / 2026-04-24 / 2026-07-28 一致口径
- ⚠️ 注意这是**注册账号数**，**不是活跃玩家数**；两者差异巨大，引用时须注明
- ⚠️ GameFused 提到 Dawntrail 期间 Steam 评价「褒贬不一（mixed）持续数月」，可作为口碑下滑的旁证

---

## 7. 官方确认 / 媒体报道 / 未证实——完整清单

### 7.1 ✅ 官方确认（可直接引用）

**7.x 与 7.56**

1. 7.56 上线日期 **2026-09-08**（PDT 02:25 维护结束）
2. 7.56 服务器端热修于 **2026-09-08 23:55 PDT** 推出生效，无需客户端更新
3. 驯兽师 bug 原文：「if the player's character leaves the area due to a connection loss at the moment the pet uses a weapon skill that restores its master's HP, the server may crash」
4. 7.56 内容：主线 `A Winter's Dream`、驯兽师、Crucible of the Unbroken、AAC Heavyweight (Savage) 松绑 + 12% Echo、mnemonics 周上限 450→900、Series 12 开始、Windurst: The Third Walk 进入同盟随机
5. 驯兽师是 **limited job**、**近战 DPS**、**无基础职业**、**Lv1 起、上限 50**、共享武僧/武士装备、**不能使用职能动作**、**不能指派理符**
6. 驯兽师内容准入的完整正/负清单（见 §2.3.2）
7. 驯兽师 FATE 经验更高、**野外击杀无经验加成（与青魔道士不同）**
8. Master's Bestiary、Gauge/Capture、Kornago Gourd、remnants of resilience、beast rank 上限 25、兽阶五项属性
9. Crucible of the Unbroken 全部规则（棋盘、Ephemeral/Crucible items、Beast gear、Feed、计分、Degrees 三阶、Suspension、Forfeit）
10. Crucible Rankings Season 1：**2026-09-24 开始，至 Patch 7.58**
11. **Patch 7.58 存在**且已官宣（日期与内容未公布）
12. 7.5x 系列：**Same-Region Player Matching**，日本 **2026-10 中旬**先行
13. **Keybound Brawler** 金碟小游戏 **2026-10-28** 上线

**7.5**

14. 7.5 于 **2026-04-28** 上线；第 92 回制作人来信于 **2026-04-21**
15. 7.5x 完整内容清单（见 §3.2）
16. 7.51 于 **2026-06-02**、7.55 于 **2026-07-28**
17. 7.51 含 **Dancing Mad (Ultimate)**

**8.0**

18. 资料片英文名 **Evercold**，日文名 **白銀のワンダラー**
19. 上线 **2027 年 1 月**
20. 新篇章 **The Godless Realms Saga**
21. 舞台为**第四世界**，危机名为 **Solstice**，宣告者 **Halmarut**，属性为**冰**
22. 新都市 **Fargarth**；新区域 **Naglfar, Realmship of Water** 与 **Hringhorni, Realmship of Fire**
23. 新职业 **两个**：**Bastion（Main Tank，武器 skyltborg 双大盾，Evolved Only）** + **物理远程 DPS（未命名）**
24. **等级上限 100 → 110**
25. **同盟讨伐战：EVANGELION - Ghosts of Desire**（与 khara 合作，前田真宏参与）
26. **8 人 Raid 系列：Beyond the Lifestream**（FF7 Remake 三部曲联动，滨口直树登台）
27. **新增 8 人 Raid 中间难度**（名称未公布）
28. **新 Ultimate Raid**
29. **Chocobo Companion System Overhaul 于 Patch 8.1**，含育成重做 + **陆行鸟可进副本助战**
30. **Auto Content Balancing** 四项能力
31. **主线推进到某节点后可自选区域顺序**
32. **Seasons 系统**：奖励获取与 iLvl 提升的全新框架
33. **Armoury Update**：最高装等可套用到其他职业，**不含魔晶石加成**
34. **Reborn Mode / Evolved Mode** 双战斗模式；**新职业只能用 Evolved**；**限定职业两者皆不适用**
35. **角色创建扩充**：取色器、五官微调、眼影、装备部件可拆卸
36. **Character Action Skins**：8.0 首发仅覆盖 **General actions**（如 Teleport、Warp），职业动作皮肤为后续更新
37. **不购买 Evercold 也能享受**：整体设计改动、新战斗系统、PvP 更新、Duty Support 更新
38. **Collector's Bundle / Collector's Edition 内容物清单**（含 Crystal Skyltborg、Vallhallar Odin mount、Entreat Crystal emote）
39. **Nintendo Switch 2 版 2026-08-04 上线**，2026-07-28 开放预购，含约一个月免费订阅期
40. **Free Trial 于 2026-04-28 扩充至 Shadowbringers（至 Patch 5.58）**
41. **注册账号数超 3000 万**
42. 三场 Fan Festival：Anaheim 2026-04-24/25、Berlin 2026-07-25/26、**Tokyo 2026-10-31 ～ 11-01**

### 7.2 ⚠️ 媒体报道（可信度较高，但无官方逐字对应）

1. 「亚拉戈神典石被**彻底删除/废除**」——媒体对 Seasons 的解读（官方从未逐字确认）
2. 「新周常系统名为 **Adventure Activity**」——德文社区现场记录 + 中文转述，官方 UI 截图上的名称**未在官方文本中确认**
3. 「**Season = 两个补丁成对打包**」——德文社区现场记录
4. 「**移除 2 分钟爆发元**」——GamesRadar 引述助理总监，MMOs.com 转述
5. 「Evolved Mode **精简按键数量**」——同上
6. 「Evercold Raids 遵循 Arcadion 的『**surprise and novelty over convenience and efficiency**』」——GamesRadar 引述 FF14 助理总监
7. 「**一个月长的免费 Early Access**」——GameFused；**与官方关于 Switch 2 的「约一个月免费期」表述高度相似，存在混淆可能**
8. 「可补领上周未满上限的点数」——德文社区现场记录
9. 「Bastion 是**主坦 + 双大盾**，为 FF 系列首次」——官方确认「main tank + two greatshields」；「FF 系列首次」为媒体（Polygon）表述
10. 「Genesys 新增**新种族**」——德文社区总结提到「wir lernen neue Rassen kennen」
11. 「驯兽师 bug **拔网线即可轻松复现**」——中文媒体（3DM），官方未如此表述
12. 「Dawntrail 期间 **Steam 评价长期褒贬不一**」——GameFused
13. 「免费试玩可玩 **300 小时以上**」——Eurogamer 葡萄牙语版
14. 「Switch 2 Starter Edition 价格 **€14.99**」——Eurogamer 葡萄牙语版标题（未获官方产品页确认）

### 7.3 ❓ 未证实 / 需进一步核实

**高风险误传项**

1. ❌ **「World Raid」玩法** —— 在全部官方源中不存在。**不应引用。**
2. ❌ **「自动导航」功能** —— 官方源中无此名称。可能指 Auto Content Balancing 或 Same-Region Player Matching。
3. ❌ **7.08 与 7.28 补丁** —— Dawntrail **不存在**这两个补丁号。
4. ❌ **「与 FF7 Remake 的联动大型任务（同盟讨伐战）」** —— FF7 联动是 **8 人 Raid**；同盟讨伐战是 **Evangelion**。
5. ❌ **「Bastion 初始 90 级」** —— 官方未公布 Bastion 初始等级。
6. ❌ **「装备等级复制机制」这个独立系统名** —— 不存在；对应的是 **Armoury Update**。
7. ❌ **「2026-09-13 驯兽师导致服务器崩溃的紧急修复」** —— 实际为 **2026-09-08**；9-13 是媒体报道日，且当天的 Gilgamesh 故障官方归因为「Server program error」，与驯兽师无官方关联。

**尚未公布的官方信息（真正的空白）**

8. 8.0 **具体上线日期**（只到「2027 年 1 月」）
9. 8.0 **预购时间与价格**
10. 8.0 Collector's Bundle **价格**
11. **第二个新职业**（物理远程 DPS）的名称、武器、技能
12. **Bastion 的初始等级、完整技能表、职业任务**
13. 8.0 **新增中间难度的正式名称**
14. 8.0 **新副本 / 新讨伐战 / 新 Ultimate 的名称**
15. 8.0 **全部新地图的完整清单**（官方称「Distinctive new areas」「New cities」但未列全）
16. **Seasons / Adventure Activity 的周上限、补领窗口、旧神典石处置方案、神典石 NPC 的去向**
17. **Armoury Update 对坦克/治疗/DPS 职能、幻化、副本准入的具体影响**
18. **Free Trial 当前等级上限**（官方未写数字）；8.0 是否再扩充 Free Trial
19. **Patch 7.58 的日期与内容**
20. **7.x 早期（7.0–7.45）各补丁的精确上线日期**（需逐页打开官方补丁说明页核实）
21. **国服（盛趣）2026-09 的版本进度与 8.0 计划**
22. **韩服现状**
23. **订阅价格是否有变化**
24. **Switch 2 版的分辨率/帧率等技术规格**
25. **Evolved Mode 的完整规则**（哪些职业已改造、按键数变化、Reborn 玩家与 Evolved 玩家能否同队）
26. **Raid 中间难度是否覆盖同盟讨伐战/讨伐战/四人副本**

### 7.4 明确的时间线风险提示

| 风险 | 说明 |
|---|---|
| **东京粉丝节尚未举行** | 2026-10-31 ～ 11-01 的东京基調講演将释出大量新信息。本文完成于 2026-09-15，**所有 8.0 内容在东京场之后都需要重新核实** |
| **官方免责声明** | Evercold 特设站明确写：「All content listed on this site is currently in development」「All content and systems introduced on this site are subject to change prior to release」「Content may be released via patch updates. As a result, some of the content listed here may not be playable immediately following purchase of Evercold.」 |
| **UI 未定** | Adventure Activity 的 UI 被官方现场标注为「仍在开发中，可能变更」 |
| **信息来源时效** | 大量 8.0 细节来自粉丝节现场口头演示的第三方记录（德文社区、中文转述），存在转述误差风险 |

---

## 8. 面向「放置游戏」的启示

> 本节把 8.0 的改动翻译成放置 / 增量（idle / incremental）游戏的设计语言。三个核心改动——**每周自选进度**、**角色级 iLvl**、**三档难度**——分别对应放置游戏最核心的三个问题：**在线节奏、多线养成、难度曲线**。

### 8.1 每周自选进度（Seasons / Adventure Activity）→ 放置游戏的「离线结算 + 自选任务池」

#### 8.1.1 FF14 做了什么

| FF14 的旧模型 | FF14 的新模型 |
|---|---|
| 每日随机任务（Duty Roulette）驱动 | **每周任务清单**驱动 |
| 单一货币（亚拉戈神典石）→ 单一兑换线 | **多来源点数**：主线任务、采集收藏品、副本、FATE、前线皆可 |
| 每天必须上线才能不落后 | **可一天做完，也可七天分摊，无惩罚** |
| 固定每日节奏 | **可补领上周未满上限的点数** |
| 无赛季结构 | **Season 系统，补丁成对打包为一个赛季** |

#### 8.1.2 对放置游戏的可迁移点

**① 「每周上限」比「每日上限」更适合放置游戏的核心循环**

放置游戏的本质张力是：**玩家希望离线也有收益，但设计者需要控制进度速度**。

- **每日上限**的问题：惩罚「周末玩家」，强迫每天上线一次，与放置游戏的「省心」定位冲突。
- **每周上限**的优势：
  - 玩家可以**一天集中结算**（等价于放置游戏的「一键领取累积收益」）
  - 也可以**每天小结算**（等价于「自动领取」）
  - **进度速度仍被上限控制**，不会破坏经济

> **具体设计建议**：放置游戏的离线收益结算采用「**周滚动上限**」而非「日上限」：
> - 离线收益持续累积，但计入「周额度池」
> - 玩家任意时间领取，最多领到本周上限
> - **允许上周期未用完的额度在下周期补领（有窗口限制）**——这正是 FF14 明确做的「可补领上周点数」
> - 上线一次即可，不必每天上线

**② 「多来源点数」比「单一货币」更能容纳多类型玩家**

FF14 明确列出：主线任务、**采集收藏品**、**副本通关**都可产出每周点数。

- 对放置游戏的含义：**同一套进度货币，应该有多条产出路径**，让「挂机流」「手动流」「社交流」「生产流」玩家都能推进同一进度条。
- 反面案例：只有一条产出路径（如只有战斗掉落）会让生产/社交玩法变成「装饰」而非「进度」。
- **具体设计建议**：周点数设置 3–5 条产出来源，并让每条来源的**单位时间效率接近但操作形态完全不同**。

**③ 「一次性点数 + 可重复点数」的混合结构**

FF14 明确：**部分点数只能获得一次**（如完成主线任务），**另一些可重复获取**。

- 设计含义：一次性点数 = **内容消费的奖励**（保证玩家体验完整内容）；可重复点数 = **日常循环的填充**（保证玩家有持续目标）。
- 对放置游戏：
  - **一次性来源**：首次通关、里程碑、成就 → 提供「爆发式成长」
  - **可重复来源**：日常挂机、重复副本 → 提供「稳态成长」
  - 二者的比例决定了游戏的「内容消耗速率」。**一次性占比过高 → 玩家很快撞墙；可重复占比过高 → 玩家感觉没有进展。**

**④ 「Season = 两个补丁成对打包」→ 放置游戏的赛季节奏**

- FF14 把「7.0 → 7.1」定义为 1 个 Patch Season，意图是**消除内容空窗期**。
- 对放置游戏：**赛季不应以固定日历周期定义，而应以「内容包 + 小更新」的成对结构定义**：
  - 大包：新机制、新层级、新角色
  - 小包（4–6 周后）：数值微调、新关卡层、新事件
  - 二者构成一个 Season，Season 结束后结算并重置部分进度
- **切忌**：一个赛季只在大版本开始时更新内容，中间长时间空转——这正是 FF14 试图修正的「dead months between content drops」。

**⑤ 「无惩罚」是可被明确承诺的玩家体验承诺**

吉田的原话是「**不会受到任何惩罚**」（17173 转述，⚠️ 待核实）。这在放置游戏语境下意味着：

- 不设「连续登录断签惩罚」
- 不设「错过的限时内容永久不可获得」（应提供回归途径或轮换）
- 不设「离线期间收益归零」

> 💡 **放置游戏的差异化竞争力，很大程度就来自「明确的零惩罚承诺」。** FF14 作为一款订阅制 MMO 都敢做这个承诺，F2P 放置游戏更应如此。

### 8.2 角色级 iLvl（Armoury Update）→ 放置游戏的「账号级战力基线」

#### 8.2.1 FF14 做了什么

- 角色拥有**一个**「最高物品等级」
- 该装等**可套用到该角色的所有职业**上，**即便其他职业等级较低**
- **魔晶石（Materia）加成不共享**——保留极限毕业的追求

#### 8.2.2 对放置游戏的可迁移点

**① 「横向解放 + 纵向保留」的双层养成模型**

这是 FF14 这次改动最精妙的地方：

| 层 | 机制 | 解决的问题 | 保留的追求 |
|---|---|---|---|
| **横向层**（iLvl 共享） | 一次养成的最高成果，自动惠及所有并行线 | **多线养成的重复劳动** | — |
| **纵向层**（魔晶石不共享） | 每个并行线仍有独立的深度强化空间 | — | **给硬核玩家保留垂直目标** |

> **具体设计建议**：放置游戏普遍有「多角色/多兵种/多装备线」，常见错误是**每一条线都要从零肝起**，导致玩家只敢培养 1–2 条线，「多线」设计完全浪费。
>
> 正确的做法是：
> - 设置一个**账号级「战力基线」**（= 该账号历史最高战力）
> - 该基线**自动对所有并行线生效**（至少生效一部分，如 80%）
> - 但每条线保留**独立的上限扩展空间**（专属天赋、专属装备、专属觉醒）
> - 于是：**新线不必从零开始（不会劝退），但老线的顶端依然有追求（不会失去动力）**

**② 「基线」而非「克隆」——措辞与机制的精确性**

- FF14 的措辞是「**transfer / apply your highest item level**」，不是「复制装备」。
- 对放置游戏：**不要复制物品**（会导致背包爆炸、经济失衡），而是**提取一个标量数值（如 iLvl / 战力评分）作为基线**，让系统按该基线缩放其他线的表现。
- 这样可以避免：
  - 多份装备实例带来的存储/经济问题
  - 「把最好的装备拆给多个角色用」的逻辑荒谬
  - 幻化/外观系统的冲突

**③ 对低等级线也生效的意义**

德文记录明确：即使其他职业**等级还较低**，也能套用最高装等。

- 对放置游戏：这相当于**「新解锁的内容/角色可以立刻达到可用水平」**。
- 这点极其关键——放置游戏最大的流失点是「新内容开放后，玩家发现自己要重新肝几周才能参与」。
- **具体建议**：新解锁的角色/兵种，初始战力 = 账号基线 × 系数（如 0.7–1.0），再通过专属养成向上追平。

**④ 与「难度缩放」的协同**

Armoury Update + Auto Content Balancing 组合起来的完整图景是：

```
玩家账号 → 拥有一个「最高 iLvl 基线」
              ↓
      任何职业/线路 → 自动获得该基线附近的战力
              ↓
      任何副本 → Auto Content Balancing 按玩家等级/战力自动缩放
              ↓
      结果：玩家可以随时切换到任何职业，参与任何内容，无需重新准备
```

> **这是放置游戏「无障碍切换 + 自动缩放」的完整范式。**

### 8.3 三档难度（Normal / 中间档 / Savage）→ 放置游戏的「难度阶梯与分层回报」

#### 8.3.1 FF14 做了什么

| 难度 | 目标人群 | 官方/媒体定位 |
|---|---|---|
| Normal | 休闲、剧情党 | 「长期过于宽容（too forgiving）」 |
| **（新增中间档，名称未公布）** | **「已超越 Normal 但还没准备好 Savage」的玩家** | 填补断层 |
| Savage | 硬核团队 | 「要求团队级协调投入，把大部分玩家挡在门外（prices out a large portion of the playerbase）」 |
| Ultimate | 极限挑战者 | 独立最高档 |

#### 8.3.2 对放置游戏的可迁移点

**① 三档而不是两档——「中间档」是留存的关键**

- **两档结构（简单/困难）的致命问题**：
  - 简单档太简单 → 核心玩家 3 天流失
  - 困难档太难 → 大众玩家卡死 → 流失
  - **中间没有缓冲区，玩家在「无脑碾压」和「完全打不过」之间跳跃**
- **三档结构的价值**：
  - 中间档是**「跳一跳够得着」的区间**——这是放置游戏最主要的留存区间
  - 放置游戏的「挂机效率」在中间档才真正开始有决策意义（配装、技能顺序、资源分配）
- **具体设计建议**：
  - **档 1（推进档）**：自动战斗即可通过，主要功能是让玩家看到内容、获得基础资源
  - **档 2（优化档）**：需要合理配置才能通过，是玩家停留最久的档位；回报显著高于档 1
  - **档 3（挑战档）**：需要极限优化 + 反复尝试，回报主要是**荣誉性的**（称号、外观、排行榜）而非数值性的
  - **关键比例**：档 1 占玩家 100%，档 2 占 40–60%，档 3 占 5–15%

**② 「奖励结构」必须与难度档匹配**

从 FF14 的历史看，Savage 提供最高 iLvl 装备，Normal 提供过渡装备。放置游戏对应的是：

| 难度档 | 应有的回报类型 | 不应有的回报 |
|---|---|---|
| 档 1 | 基础货币、主线推进、解锁 | 顶级装备 |
| 档 2 | 主要装备线、核心升级材料 | — |
| 档 3 | **荣誉性回报**（称号/外观/排行榜/极小的数值边际）+ 少量独特材料 | **碾压性的数值优势** |

> 💡 **核心原则：高难度的回报应该是「独特性」而不是「数值碾压」。** 如果档 3 的数值回报远超档 2，玩家会感到「不刷档 3 就是亏」，从而产生焦虑与流失；如果档 3 的回报是「独特外观 + 称号 + 排行榜」，则档 2 玩家不会焦虑，档 3 玩家也有荣誉感。

**③ 难度档的「可调性」= 7.56 的 Crucible Degrees 先例**

FF14 在 7.56 的驯兽师副本里已经做了实验：**同一个副本内嵌 3 档可调难度（Degree 1/2/3）+ 独立排行榜，且只有第三阶的成绩才计入排行。**

- 对放置游戏：**难度不应是「不同的关卡」，而应是「同一关卡的难度参数」。**
  - 玩家在同一个界面上选择难度档
  - 关卡内容、地图、Boss 相同
  - 仅敌人数值与机制数量不同
  - **排行榜只统计最高档**（避免玩家用低难度刷榜）
- 这个设计的巨大优势是**内容复用率极高**——一套关卡设计，三个难度产出。

**④ 「自动缩放」与「固定难度档」的关系**

FF14 同时做了两件看似矛盾的事：
- **Auto Content Balancing**（自动缩放难度到玩家等级）
- **三档难度**（固定难度分层）

实际上二者回答的是不同问题：

| 机制 | 解决的问题 | 放置游戏对应 |
|---|---|---|
| Auto Content Balancing | 「**能不能进**」——降低参与门槛，让不同等级的玩家可以一起玩 | 关卡自动匹配玩家等级（保证永远有可打的内容） |
| 三档难度 | 「**够不够挑战**」——提供分层目标 | 同一关卡的多档难度选择（保证永远有可追求的目标） |

> **具体设计建议**：放置游戏应**同时**具备这两层：
> 1. **自动缩放层**：主线/资源关卡自动匹配玩家战力，确保永远能推进（这是放置游戏的「不倒翁」机制）
> 2. **固定难度层**：挑战关卡/排行榜分档，提供长期目标

### 8.4 其他可迁移的设计点

| FF14 的改动 | 对放置游戏的可迁移设计 |
|---|---|
| **Reborn / Evolved 双战斗模式** | **「经典模式 / 简化模式」双套战斗系统**。放置游戏常见的两难是「老玩家要深度、新玩家要简单」。双模式允许：老玩家保留复杂配置，新玩家用简化模式入门，**新内容只在简化模式下实现**（降低开发成本的同时渐进迁移） |
| **自动内容平衡（含「不同等级玩家可互相匹配」）** | 放置游戏的**社交/公会系统**可让不同进度玩家组队，系统自动缩放。这解决了「新玩家融不进老公会」的经典问题 |
| **主线可自选区域顺序** | **非线性关卡解锁**：玩家可任意顺序攻克已解锁的内容节点，系统自动缩放难度。放置游戏的「章节」应做成**节点图**而非**线性关卡表** |
| **陆行鸟可进副本助战（8.1）** | **「伴侣/宠物系统」从装饰升级为战力**。放置游戏中，宠物/坐骑通常只是数值加成；FF14 把它升级为「可参与核心战斗的单位」——这大幅提升了养成线的价值密度 |
| **Character Action Skins（动作皮肤）** | **外观变现的高价值品类**：不是卖装备外观，而是**卖动作表现**。对放置游戏而言，「战斗动画/技能特效皮肤」的感知价值往往高于静态立绘 |
| **角色创建扩充（取色器、五官微调、装备部件拆装）** | 放置游戏的「角色自定义」深度直接决定玩家的**情感投入**与**留存**。取色器（任意颜色）比「N 选 1 的预设色板」的成本效益高得多 |
| **Crucible 的 roguelite 棋盘结构** | **可重复游玩的随机化内容**：棋盘 + 随机格子 + 一次性道具 + 携带上限（10 件）+ 分数排行榜。对放置游戏是**理想的「日常可重复内容」模板**——一把 10–15 分钟，有随机性，分数可比 |
| **Feed（饲料）在营地休息后失效** | **临时增益的周期性重置**：保证玩家需要重复投入，但重置点是「明确的进度节点」而非「时间」——这是比「每日重置」更软的节奏控制手段 |
| **Beast gear「放在背包里即生效」** | **「持有即生效的被动收藏品」**：放置游戏中，让收集品自动生效（而非必须装备）能大幅降低玩家的配置负担，同时提升收集动机 |

### 8.5 对放置游戏的三条总结性建议

> **建议 1：把「每日循环」重构为「每周额度池 + 多来源产出 + 可补领」，并明确承诺零惩罚。**
> 放置游戏玩家的核心诉求是「省心」。任何要求每日上线的机制都与这一诉求冲突。周滚动上限 + 补领窗口 + 一次性/可重复点数混合结构 = 既控制经济速度，又尊重玩家节奏。

> **建议 2：建立「账号级战力基线」，让所有并行养成线自动继承，同时保留各线的纵向深度。**
> 多线养成是放置游戏的核心卖点，但「每条线都要从零肝」会让这个卖点变成劝退点。横向解放（基线共享）+ 纵向保留（专属强化）= 玩家敢于尝试新线，同时硬核玩家仍有追求。

> **建议 3：难度做成三档，且高难度的回报以「独特性」而非「数值碾压」为主。**
> 两档难度会在休闲与硬核之间留下断层。三档难度中，中间档是留存的关键区间。而高难度档的回报必须是荣誉性的（称号、外观、排行榜），否则会给中间档玩家制造「不刷就亏」的焦虑，反而导致流失。

---

## 附录 A：来源清单（全部于 2026-09-15 核实）

### A.1 官方源（第一优先）

| # | 来源 | URL |
|---|---|---|
| 1 | Patch 7.56 Notes（Lodestone） | https://na.finalfantasyxiv.com/lodestone/topics/detail/a8a526ad64db45c8ca8d1c7fdcce8a5eedaa18bc |
| 2 | Patch 7.5 Notes（Lodestone） | https://na.finalfantasyxiv.com/lodestone/topics/detail/07320affa7e0fcd9685afcbe54fbf55405b6d822/ |
| 3 | Patch 7.51 Notes（Lodestone） | https://na.finalfantasyxiv.com/lodestone/topics/detail/c46881a31a2c90d0965493c921b434eca09113f8/ |
| 4 | Patch 7.55 Notes（Lodestone） | https://na.finalfantasyxiv.com/lodestone/topics/detail/99b6bfb8ecac428c7d3bb37dcb84b52f1064320b/ |
| 5 | Patch Notes and Special Sites 总览 | https://na.finalfantasyxiv.com/lodestone/special/patchnote_log/ |
| 6 | **Evercold 官方特设站** | https://na.finalfantasyxiv.com/evercold/ |
| 7 | Evercold Teaser Site Updated（Lodestone Topics） | https://eu.finalfantasyxiv.com/lodestone/topics/detail/9d53c38749a98471b70daa0d57dbd3401fff5878 |
| 8 | Patch 7.5 特设站 | https://na.finalfantasyxiv.com/dawntrail/patch_7_5/ |
| 9 | SE 官方新闻稿：EVERCOLD SET FOR JANUARY 2027（2026-04-24） | https://press.na.square-enix.com/SQUARE-ENIX-ANNOUNCES-EVERCOLD-LATEST-FINAL-FANTASY-XIV-EXPANSION-SET- |
| 10 | SE 官方新闻稿：Bastion Revealed（2026-07-28） | https://na.finalfantasy.com/news/2836 |
| 11 | SE 官方新闻稿：92nd Letter from the Producer（2026-04-21） | https://na.finalfantasy.com/news/2816 |
| 12 | SE 官方新闻稿：Fan Festivals for 2026（2025-08-27） | https://press.na.square-enix.com/SQUARE-ENIX-ANNOUNCES-FINAL-FANTASY-XIV-ONLINE-FAN-FESTIVALS-FOR-2026 |
| 13 | 东京粉丝节官网（白銀のワンダラー） | https://fanfest.finalfantasyxiv.com/2026/jp/ |
| 14 | All Worlds Maintenance (Sep. 7) | https://jp.finalfantasyxiv.com/lodestone/news/detail/412e688db6331c0d36ea6a9fb75b31a9dc66d354 |
| 15 | All Worlds Emergency Maintenance (Sep. 8) | https://jp.finalfantasyxiv.com/lodestone/news/detail/fe272ef325fe6f154b4884fff014624dfd7699bb |
| 16 | All Worlds Emergency Maintenance (Sep. 8): Follow-up | https://jp.finalfantasyxiv.com/lodestone/news/detail/df3882f51f1327d7f075a9bf68110ff38bc59396 |
| 17 | **FINAL FANTASY XIV Updated (Sep. 8)（驯兽师热修原文）** | https://jp.finalfantasyxiv.com/lodestone/news/detail/8bd359e4817774169a96609cb92fd67149942302 |
| 18 | \[Aether\] Recovery from Gilgamesh World Technical Difficulties (Sep. 13) | https://na.finalfantasyxiv.com/lodestone/news/detail/d89fc430c5c07937d2cf02025aa97a5c507c90b3 |
| 19 | Mog Station Maintenance (Sep. 13) | https://na.finalfantasyxiv.com/lodestone/news/detail/fe253133201f71fd6f02a23ef6794a16e1f6914a |

### A.2 英文媒体源（第二优先）

| # | 来源 | URL |
|---|---|---|
| 20 | SE 官方新闻稿德文版：BASTION REVEALED | https://press.es.square-enix.com/de/BASTION-REVEALED-AS-FIRST-NEW-JOB-FOR-FINAL-FANTASY-XIV-EVERCOLD |
| 21 | Gematsu：Evercold extended teaser trailer & Switch 2 Aug 4 | https://www.gematsu.com/2026/07/final-fantasy-xiv-evercold-expansion-extended-teaser-trailer-and-latest-details-switch-2-version-launches-august-4 |
| 22 | Icy Veins：Big Reveals in FFXIV's EU Fan Fest Keynote Digest | https://www.icy-veins.com/ffxiv/news/big-reveals-in-ffxivs-eu-fan-fest-keynote-digest/ |
| 23 | Icy Veins：Evercold Progression Changes | https://www.icy-veins.com/ffxiv/evercold-progression-changes |
| 24 | Icy Veins：Find Out How Evercold is Changing FFXIV to a Weekly System | https://wp-prod.icy-veins.com/find-out-how-evercold-is-changing-ffxiv-to-a-weekly-system/ |
| 25 | Icy Veins：Bastion Job Guide | https://www.icy-veins.com/ffxiv/bastion-guide |
| 26 | Icy Veins：Beastmaster is Here! How to Unlock | https://www.icy-veins.com/ffxiv/news/beastmaster-is-here-heres-how-to-unlock-ffxivs-newest-job/ |
| 27 | Polygon：Beastmaster bestiary and beast locations | https://www.polygon.com/ffxiv-beastmaster-bst-beast-bestiary-locations-list-skills/ |
| 28 | Polygon：Evercold's new tank class is a big first for Final Fantasy | https://www.polygon.com/ffxiv-evercold-tank-job-bastion-trailer/ |
| 29 | Kotaku：FF7 crossover raid | https://kotaku.com/final-fantasy-14-evercold-final-fantasy-7-remake-crossover-raid-2000719881 |
| 30 | Kotaku：FF14 Is Out Now On Switch 2 But You Don't Have To Buy It To Play | https://kotaku.com/final-fantasy-14-free-trial-nintendo-switch-2-2000721658 |
| 31 | MMOs.com：FFXIV 8.0 Evercold Raids Ditch Efficiency Meta（2026-06-28） | https://mmos.com/news/mmorpg-news/ffxiv-evercold-raids-design-philosophy |
| 32 | GameFused：Final Fantasy XIV Evercold: Weekly Missions（2026-04-25 / 更新 2026-08-10） | https://gamefused.com/final-fantasy-xiv-evercold-overhaul |
| 33 | GamesRadar：Evercold raids follow the Arcadion's lead | https://www.gamesradar.com/games/final-fantasy/final-fantasy-14-evercold-raids-follow-the-arcadions-lead-as-the-mmos-assistant-director-teases-theyll-value-surprise-and-novelty-over-convenience-and-efficiency/ |
| 34 | Anime News Network：FFXIV Unveils 'Evercold' for January 2027（2026-04-24） | https://www.animenewsnetwork.com/news/2026-04-24/final-fantasy-xiv-mmorpg-unveils-new-evercold-expansion-for-january-2027/.236769 |
| 35 | TechTimes：FFXIV Lands on Switch 2 August 4: Pricing, Free Month（2026-07-25） | https://www.techtimes.com/articles/321603/20260725/final-fantasy-xiv-lands-switch-2-august-4-pricing-free-month-evercold-reveals.htm |
| 36 | Eurogamer（PT）：FF14 na Nintendo Switch 2 por €14.99 | https://www.eurogamer.pt/final-fantasy-14-na-nintendo-switch-2-por-1499 |
| 37 | Eurogamer（DE）：Free Trial 扩充至 Shadowbringers | https://www.eurogamer.de/ffxiv-free-trial-erweiterung-shadowbringers-kostenlos |
| 38 | PSU：Evercold To Radically Change Gear, Introduces Evolved Combat System | https://www.psu.com/news/final-fantasy-xiv-evercold-gear-evolved-combat-system-details-ps5/ |
| 39 | Siliconera：8.0 FFXIV Gets Character Creation Changes, Seasons, Armoury Update | https://www.siliconera.com/8-0-ffxiv-gets-character-creation-changes-seasons-armoury-update/ |
| 40 | Dot Esports：Evercold and all Fan Festival 2026 announcements | https://dotesports.com/ff/news/final-fantasy-xiv-anaheim-fan-festival |
| 41 | GameRant：Final Fantasy 14 Reveals Massive Gameplay Changes in Evercold | https://gamerant.com/final-fantasy-14-evercold-expansion-ff14-gameplay-changes/ |
| 42 | Elyxir：Evercold Reveal Breakdown: Every Major System Change | https://www.elyxir.gg/news/final-fantasy-xiv/ffxiv-80-evercold-reveal-breakdown-every-major-system-change-and-what-it-means |
| 43 | Ermis Gaming：Evercold Ushers in the Godless Realms Saga | https://ermisgaming.com/final-fantasy-xiv-8-0-evercold-ushers-in-the-godless-realms-saga-and-completely-rewrites-the-rules/ |
| 44 | Crystal Universe（DE）：Keynotes Fan Festival 2026 Anaheim | https://crystaluniverse.de/news/ffxiv-zusammenfassung-keynotes-fan-festival-2026-anaheim/ |
| 45 | Crystal Universe（DE）：Keynotes Fan Festival 2026 Berlin | https://crystaluniverse.de/news/ffxiv-ffxiv-zusammenfassung-keynotes-fan-festival-2026-berlin/ |
| 46 | JEU.VIDEO（FR）：le crash serveur lié au beastmaster est traité | https://jeu.video/article/ffxiv-mise-a-jour-beastmaster |
| 47 | Gamerant：Final Fantasy 14 Director Teases 2025 Plans | https://gamerant.com/final-fantasy-14-director-new-years-message-2025-plans-tease/ |
| 48 | Game Watch（JP）：黄金のレガシー メインストーリー完結「彼方に至る路 Part2」9月8日実装 | https://game.watch.impress.co.jp/docs/news/2137728.html |

### A.3 中文源（仅作对照，⚠️ 全部待核实）

| # | 来源 | URL | 风险 |
|---|---|---|---|
| 49 | 17173：8.0 大改动 终于不用每天刷神典石了（2026-04-25） | https://news.17173.com/content/04252026/180206385.shtml | 来源标注为「3DM」，疑为转载；标题党；引语需回原文核对 |
| 50 | 17173：驯兽师登场！7.56 版本正式上线（2026-09-10） | https://news.17173.com/content/09102026/094329832.shtml | 发稿日 ≠ 上线日，易误导 |
| 51 | 17173：驯兽师 BUG 可致服务器崩溃 官方紧急修复（2026-09-13） | http://news.17173.com/content/09132026/180046369.shtml | 日期叙事错误（实际 09-08） |
| 52 | 网易号·3DM：驯兽师 BUG 可致服务器崩溃（2026-09-13） | https://m.163.com/dy/article/L6NKJ0R70526D8LR.html | 「拔网线即可复现」为媒体推断 |
| 53 | 4Gamers（TW）：《白銀探求者》2027 年 1 月上线 | https://www.4gamers.com.tw/news/detail/78735/final-fantasy-xiv-expansion-evercold-wanderer-announced-january-2027-fan-festival | 页面正文需登录/JS 渲染，仅取到标题 |
| 54 | 9game：《银海之天舟》第二弹 PV 公开 | https://www.9game.cn/news/11987904.html | 聚合站，需核实 |
| 55 | expreview：《银海之天舟》先导预告 | https://www.expreview.com/107276.html | 聚合站，需核实 |
| 56 | IT之家：Switch 2 版 8 月 4 日发售，首月免费 | https://www.ithome.com/0/981/592.htm | 需与官方口径对照 |
| 57 | 腾讯新闻转载：盛趣《FF14》7.3 版本今日上线（2025-09-16） | https://news.qq.com/rain/a/20250916A09CEZ00 | 国服唯一较可靠线索，仍需官方确认 |
| 58 | egltours 转述：白銀探求者 / 白銀の探求者 / 簡中：銀海之天舟 | https://www.egltours.com/promotion/fit_banner/actualLive.html?live-news-4778367-2026-04-24-square-enix-qi-xia-mmorpg-final-fantasy-xiv-zhi-zuo-ren-ji-zong-jian-ji-tian-zhi | 「白銀の探求者」与官方日文名「白銀のワンダラー」不符，疑为讹误 |

---

## 附录 B：错误更正对照表（供快速查阅）

| 常见说法 | 正确说法 | 严重性 |
|---|---|---|
| 7.56 于 2026-09-10 上线 | **2026-09-08 上线**（维护 09-07 23:00 PDT 起，09-08 02:25 PDT 结束） | 🔴 高 |
| 2026-09-13 驯兽师导致服务器崩溃，官方紧急修复 | **2026-09-08 23:55 PDT 热修**；9-13 是媒体报道日，当天 Gilgamesh 故障官方归因为「Server program issue」 | 🔴 高 |
| 存在 7.08、7.28 补丁 | Dawntrail **不存在**这两个补丁号 | 🟡 中 |
| 8.0 中文名《白银的探求者》 | 日文 **白銀のワンダラー**；繁中 **《白銀探求者》**；简中 **《银海之天舟》** | 🟡 中 |
| 8.0 有「与 FF7 Remake 的联动大型任务」 | **同盟讨伐战 = EVANGELION - Ghosts of Desire**；**8 人 Raid = Beyond the Lifestream（FF7）** | 🔴 高 |
| Bastion 初始 90 级 | 官方**未公布**初始等级 | 🟡 中 |
| 存在「World Raid」新玩法 | 官方源中**无此名称** | 🔴 高 |
| 存在「自动导航」功能 | 无此名称；对应 **Auto Content Balancing** 与 **Same-Region Player Matching** | 🟡 中 |
| 存在独立的「装备等级复制机制」 | 对应官方 **Armoury Update**；且**不限于满级职业**，**排除魔晶石加成** | 🟡 中 |
| 陆行鸟参战与重做属于 8.0 | 属于 **Patch 8.1** | 🟡 中 |
| 8.0 只有 Bastion 一个新职业 | 官方公布**两个**：Bastion（坦）+ **物理远程 DPS（未命名）** | 🟡 中 |
| 动作自定义覆盖所有技能 | 8.0 首发**仅 General actions**（Teleport / Warp 等）；职业动作皮肤为后续更新 | 🟡 中 |
| 官方明确宣布「删除亚拉戈神典石」 | 官方推出 **Seasons** 系统并重构奖励/成长框架；「删除神典石」是**媒体解读** | 🟡 中 |
| 8.0 中间难度名为「Advanced」 | 官方**未公布名称**；「Variant Advanced」是四人可变副本的另一套体系 | 🟡 中 |
| Free Trial 现覆盖到 Endwalker | Free Trial 覆盖到 **Shadowbringers（Patch 5.58）**，**不含 Endwalker** | 🔴 高 |

---

## 附录 C：待办核实清单（优先级排序）

> 若需继续深化本文件，按以下优先级核实：

| 优先级 | 待核实项 | 建议核实途径 |
|---|---|---|
| 🔴 P0 | **2026-10-31 东京粉丝节基調講演全部内容** | 官方 YouTube / Twitch 直播；Lodestone Topics；SE 官方新闻稿 |
| 🔴 P0 | 8.0 具体上线日期、预购时间与价格 | Evercold 特设站；SE 官方新闻稿 |
| 🔴 P0 | 第二个新职业（物理远程 DPS）完整信息 | 东京粉丝节 |
| 🔴 P0 | Bastion 完整技能表与初始等级 | 东京粉丝节；官方 Job Guide |
| 🟡 P1 | Seasons / Adventure Activity 的周上限、补领窗口、旧神典石处置 | 官方 Live Letter；官方 UI 指南 |
| 🟡 P1 | Patch 7.58 日期与内容 | Lodestone 维护公告 |
| 🟡 P1 | 7.0–7.45 各补丁精确日期 | 逐页打开官方 Patch Notes 页读取 Update 日期 |
| 🟡 P1 | Free Trial 当前等级上限（70 还是 80） | 官方 Free Trial 专页（freetrial.finalfantasyxiv.com） |
| 🟡 P1 | Armoury Update 对职能/幻化/副本准入的具体影响 | 官方 Live Letter |
| 🟢 P2 | 国服（盛趣）2026-09 版本进度与 8.0 计划 | 国服官网、盛趣官方微博 |
| 🟢 P2 | 韩服现状 | 韩服官网 |
| 🟢 P2 | 订阅价格是否有调整 | 官方产品页 |
| 🟢 P2 | Switch 2 版技术规格（分辨率/帧率） | Digital Foundry 等专业评测 |
| 🟢 P2 | 8.0 新增中间难度的正式名称 | 东京粉丝节 |

---

*本文档所有事实性陈述均标注了置信度与来源。标注为 ❓ 的条目**不得作为设计决策的依据**。2026-10-31 东京粉丝节之后，第 4、5、7 章需要整体复审。*
