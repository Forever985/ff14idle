# 《最终幻想14》(FFXIV) 职业与职能系统 完全调研

> **文档版本**：v1.0
> **调研日期**：2026-09-15（国际服时间基准）
> **数据版本基准**：国际服 **Patch 7.56**（2026-09-08 上线）／资料片 **Dawntrail（7.x）末期**
> **下一资料片**：**Evercold（8.0）**，2027 年 1 月上线；日文标题『白銀のワンダラー』，简中「白银的探求者」
> **用途**：为「FF14 放置类游戏」项目提供职业系统的事实底稿 + 放置化可行性分析
> **本文档严格区分**「官方确认」与「社区推导／可能过期」，所有重要结论附可点击来源。

---

## 0. 阅读指南

### 0.1 来源可信度分级

| 等级 | 标记 | 含义 | 典型来源 |
|---|---|---|---|
| A | ✅官方确认 | 由 Square Enix 官方站点／官方补丁说明／官方新闻稿直接给出 | `na.finalfantasyxiv.com`、`jp.finalfantasyxiv.com`、`*.square-enix.com` 新闻稿、官方 Evercold 特设站 |
| B | 🟡官方表述（需解读） | 官方文本存在，但需要推导／表格推断／语义解读 | 官方补丁说明里的道具表、官方 Q&A、官方开发面板转述 |
| C | 🔵权威社区 | 大型攻略站／数据库，与官方数据一致但可能滞后 | Gamer Escape、Icy Veins、Game8、Garland Tools、The Balance、Famitsu 采访 |
| D | 🟠二手／可能过期 | 媒体转述、中文二手源、旧版本攻略，可能有机器翻译讹误 | 17173、百家号、旧版 Lodestone 玩家日记 |
| E | ⚠️不确定／社区推导 | 无官方来源，仅由规律推断 | 本文档显式标注为「推测」的内容 |

### 0.2 本次调研遇到的访问限制（重要）

以下站点在本次调研环境中返回 **HTTP 403（Cloudflare 拦截）或抓取失败**，相关内容只能通过官方源或可访问的替代源交叉验证，**请在使用时按 D/C 级对待**：

| 站点 | 状态 | 影响 |
|---|---|---|
| `ffxiv.consolegameswiki.com` | ❌ 403 | 无法直接引用其 Role Actions / Limited Jobs / Job Quests 页面 |
| `ffxiv.gamerescape.com` | ❌ 403 | 无法引用其 Limit Break 页面 |
| `finalfantasy.fandom.com` | ❌ 抓取失败 | — |
| `www.icy-veins.com`（含 `wp-prod.` 子域） | ❌ 403 | 无法引用其 Bastion / Evolved Mode 预览文 |
| `www.polygon.com`、`www.gematsu.com`、`nintendolife.com`、`thesixthaxis.com`、`dualshockers.com`、`gamefragger.com`、`tech.yahoo.com` | ❌ 403/失败 | 无法引用其 8.0 报道 |
| `www.elyxir.gg` | ⚠️ 正文被截断 | 仅拿到标题级信息 |

**因此本文档的策略是：一切关键数值优先回到官方 `na.finalfantasyxiv.com` / `jp.finalfantasyxiv.com` / Square Enix 新闻稿；社区源仅作补充并显式标注。**

### 0.3 术语对照（中／英／日）

| 中文 | 英文 | 日文 | 说明 |
|---|---|---|---|
| 特职／职业 | Job | ジョブ | 2.0 之后的主要成长单位 |
| 基础职业 | Class | クラス | 旧体系的入门职业，30 级后转职 |
| 设限特职（简中官方）／受限职业 | Limited Job | リミテッドジョブ | 青魔道士、驯兽师 |
| 战斗精英 | Disciple of War | 戦闘精英 | 物理系战斗职业的总称 |
| 魔法导师 | Disciple of Magic | 魔法導師 | 法系战斗职业的总称 |
| 生产职业 | Disciple of the Hand | 製作 | 8 个，缩写 DoH |
| 采集职业 | Disciple of the Land | 採集 | 3 个，缩写 DoL |
| 职能 | Role | ロール | 坦克／治疗／近战DPS／远程物理DPS／远程法系DPS |
| 职能技能 | Role Action | ロールアクション | 4.0 起取代跨职业技能 |
| 职业量谱 | Job Gauge | ジョブHUD | 各职业专属资源显示 |
| 极限技 | Limit Break | リミットブレイク | 团队共享充能大招 |

> 简中官方把 Limited Job 译为**「设限特职」**（见 Patch 7.56 简中特设页「全新设限特职『驯兽师』」）[来源](https://actff1.web.sdo.com/project/20240927dawntrail/patch75/index.html)。

---

## 1. 版本与时效基准（截至 2026-09-15）

### 1.1 官方页面自报的更新状态（A 级）

| 官方页面 | 自报状态 |
|---|---|
| 战斗动作篇 Job Guide（EN） | 「**Updated for 7.5**」[来源](https://na.finalfantasyxiv.com/jobguide/battle/) |
| 战斗动作篇 Job Guide（JP） | 「**Patch 7.5対応版**」[来源](https://jp.finalfantasyxiv.com/jobguide/battle/) |
| 生产采集指南 | 「**Updated for 7.5**」[来源](https://na.finalfantasyxiv.com/crafting_gathering_guide/) |
| Job Guide 历史调整页 | 最新为 **Patch 7.4 / 7.41 / 7.45**（7.5 的调整放在首页）[来源](https://na.finalfantasyxiv.com/jobguide/adjustments/) |
| EU Job Guide | 「Last Update: **28/04/2026**」 |

> **解读**：官方 Job Guide 的最新「大规模职业数值调整」基准仍是 **7.5（2026-04-28）**；**7.56 没有对既有职业做威力调整**（7.56 补丁说明的 Battle System 段落只包含驯兽师实装 + AAC Heavyweight (Savage) 周限解除/Echo + Forked Tower 时限调整）。🟡

### 1.2 Dawntrail（7.x）补丁时间线

| 补丁 | 上线日期 | 职业／战斗系统相关要点 |
|---|---|---|
| 7.0 | 2024-07-02 | Dawntrail 开幕；等级上限 90→**100**；新职业 **Viper（蝰蛇剑士）**、**Pictomancer（绘灵法师）**，均 80 级起始 |
| 7.01 | 2024-07-16 | 红魔道士 Manafication 持续延长等易用性调整 |
| 7.05 | 2024-07-30 | 大规模威力调整；武士/蝰蛇/黑魔循环重调；绘灵法师小幅下调 |
| 7.1 | 2024-11-12 | 全体坦克无敌技生效提速；黑魔 Ley Lines 充能化；召唤士 Crimson Strike 条件改为状态触发；Esuna 无咏唱 |
| 7.2 | 2025-03-25 | **黑魔道士重做**（Astral Fire / Umbral Ice 不再因中断而消失、咏唱时间缩短、Enochian 调整）——社区强烈反弹；绘灵法师下调；近战整体上调 |
| 7.25 | 2025-05-27 | AAC Cruiserweight M2 (Savage) 多目标阶段的 AoE 威力平衡 |
| 7.3 | 2025-08-05 | AoE 动作系统化调整；死神 Enshroud 复唱缩短；蝰蛇 AoE 小幅下调；诗人/机工上调；召唤/赤魔上调 |
| 7.4 | 2025-12-16 | 远程物理全体系与治疗整体上调；**枪刃师 Bloodfest 上限+1、Gnashing Fang 充能化**；**赤魔道士 Manafication 期间三连可远程执行、移除 Manafication 增伤、Embolden 增强** |
| 7.41 | 2026-01（约） | 召唤士威力上调 |
| 7.45 | 2026-02（约） | 死神威力上调 |
| **7.5** | **2026-04-28** | **「天际的行路 / Trail to the Heavens」**：战士/武士/死神/蝰蛇/召唤士/贤者威力上调；主线「天际的行路 Part1」；新副本 The Clyteum、新讨伐 The Unmaking、新 Unreal 神龙；任务承接条件改为「Any Disciple of War or Magic **(excluding limited jobs)**」 |
| 7.51 | 2026-06（约） | 宇宙探索（Cosmic Exploration）／Auxesia 相关；究极 **Dancing Mad (Ultimate)**；Tuliyollal 分流 |
| 7.55 | 2026-07-28 | **蜃气楼岛 Crescent Isle: North Horn（Occult Crescent 北征编）**；幻境武器；希尔迪布兰德；蛮族收官 |
| **7.56** | **2026-09-08** | **设限特职「驯兽师 / Beastmaster / 魔獣使い」实装** + 专属单人玩法 **Crucible of the Unbroken（闘獣練）**；主线「天际的行路 Part2」；AAC Heavyweight (Savage) 周限全解 + Echo 12%；同盟突袭随机追加 Windurst: The Third Walk；**Allagan tomestones of mnemonics 周限 450→900**；Nintendo Switch 2 相关修复 |
| 7.58（预告） | 未定 | Crucible Rankings Season One 将于 7.58 结束 |

> 来源：官方 7.56 补丁说明 [na.finalfantasyxiv.com/lodestone/topics/detail/a8a526ad64db45c8ca8d1c7fdcce8a5eedaa18bc](https://na.finalfantasyxiv.com/lodestone/topics/detail/a8a526ad64db45c8ca8d1c7fdcce8a5eedaa18bc)；官方 Job Guide 历史调整页 [jobguide/adjustments](https://na.finalfantasyxiv.com/jobguide/adjustments/)；官方 7.5 特设（简中）[actff1.web.sdo.com .../patch75/index.html](https://actff1.web.sdo.com/project/20240927dawntrail/patch75/index.html)；SE 新闻稿（提及 7.55 于 7 月 28 日上线）[press.es.square-enix.com](https://press.es.square-enix.com/es/BASTION-REVEALED-AS-FIRST-NEW-JOB-FOR-FINAL-FANTASY-XIV-EVERCOLD)。

> ⚠️ **重要修正**：多个中文二手源称「驯兽师在 7.5 上线」，**这是错的**。官方 7.5 补丁说明原文写明：
> *"Further main scenario quests and the beastmaster limited job are scheduled to release in **Patch 7.56**."*
> 7.5（2026-04-28）本体**不含**驯兽师。[来源（7.5 补丁说明）](https://na.finalfantasyxiv.com/lodestone/topics/detail/07320affa7e0fcd9685afcbe54fbf55405b6d822/)

### 1.3 当前等级上限

| 项目 | 数值 | 备注 |
|---|---|---|
| 战斗职业（所有常规 Job）上限 | **100**（7.0 起） | ✅官方 |
| 生产／采集职业上限 | **100**（7.0 起） | ✅官方 |
| **青魔道士（BLU）上限** | **80** | ✅官方 Job Guide 原文「starting at level 1 with a maximum level of 80」 |
| **驯兽师（BST）上限** | **50** | ✅官方 Job Guide / 7.56 补丁说明原文「begins at level 1 with a maximum level of 50」 |
| 8.0 Evercold 上限 | **100 → 110** | ✅官方 Evercold 特设站「Level cap increase from 100 to 110」 |

> 🎯 **这是本项目很关键的一条设计事实**：**受限职业的等级上限远低于当版本主线上限**，且不与资料片同步提升（青魔在 7.x 上限仍是 80，驯兽师在 7.56 只有 50）。放置游戏若做「受限职业」支线，可以直接复刻这种「独立成长曲线」。

---

## 2. 战斗职业总清单（截至 Patch 7.56）

### 2.1 数量总览（A 级）

| 职能 | 数量（常规） | 受限 | 合计 | 成员 |
|---|---|---|---|---|
| 坦克 Tank | 4 | 0 | 4 | PLD / WAR / DRK / GNB |
| 治疗 Healer | 4 | 0 | 4 | WHM / SCH / AST / SGE |
| 近战 DPS Melee | 6 | **1** | 7 | MNK / DRG / NIN / SAM / RPR / VPR ｜ **BST（设限）** |
| 远程物理 DPS Physical Ranged | 3 | 0 | 3 | BRD / MCH / DNC |
| 远程法系 DPS Magical Ranged | 4 | **1** | 5 | BLM / SMN / RDM / PCT ｜ **BLU（设限）** |
| **合计** | **21** | **2** | **23** | — |

> 来源：官方 Job Guide 战斗动作篇分类（7.5 版页面已把 Beastmaster 列入 Melee DPS 且标注 „Limited Job"）[EN](https://na.finalfantasyxiv.com/jobguide/battle/) / [JP](https://jp.finalfantasyxiv.com/jobguide/battle/)。

> 📌 **8.0 已公布但未实装**：**Bastion（坚城卫）** —— 主坦克，武器为双持大盾「**skyltborg**」，**仅 Evolved Mode 可用**。[✅官方 Evercold 特设站](https://eu.finalfantasyxiv.com/evercold/)｜[✅SE 新闻稿](https://press.es.square-enix.com/es/BASTION-REVEALED-AS-FIRST-NEW-JOB-FOR-FINAL-FANTASY-XIV-EVERCOLD)。另有**第二个新职业为「远程物理 DPS」**（官方只写 "Two New Jobs: Bastion (Tank) and Physical Ranged DPS"，**名称尚未公布**）[✅官方](https://eu.finalfantasyxiv.com/evercold/)。

### 2.2 坦克（4）

| 英文名 | 日文名 | 简中译名 | 繁中官方 | 缩写 | 武器（EN） | 武器（中文） | 登场 | 基础职业 class | 转职等级 | 起始等级 | 上限 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Paladin | ナイト | 骑士 | 騎士 | **PLD** | Sword & Shield | 单手剑+盾 | ARR 2.0 | Gladiator（剣術士） | 30 | 1 | 100 |
| Warrior | 戦士 | 战士 | 戰士 | **WAR** | Greataxe | 双手斧 | ARR 2.0 | Marauder（斧術士） | 30 | 1 | 100 |
| Dark Knight | 暗黒騎士 | 暗黑骑士 | 暗黑騎士 | **DRK** | Greatsword | 双手大剑 | HW 3.0 | **无** | — | **30** | 100 |
| Gunbreaker | ガンブレイカー | 绝枪战士 | 絕槍戰士 | **GNB** | Gunblade | 枪刃 | ShB 5.0 | **无** | — | **60** | 100 |

### 2.3 治疗（4）

| 英文名 | 日文名 | 简中译名 | 繁中官方 | 缩写 | 武器（EN） | 武器（中文） | 登场 | 基础职业 class | 转职等级 | 起始等级 | 上限 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| White Mage | 白魔道士 | 白魔法师 | 白魔道士 | **WHM** | Cane | 幻杖 | ARR 2.0 | Conjurer（幻術士） | 30 | 1 | 100 |
| Scholar | 学者 | 学者 | 學者 | **SCH** | Grimoire | 魔导书 | ARR 2.0 | **Arcanist（巴術士／秘术师）** | 30 | 1 | 100 |
| Astrologian | 占星術師 | 占星术士 | 占星術師 | **AST** | Star Globe | 天球仪 | HW 3.0 | **无** | — | **30** | 100 |
| Sage | 賢者 | 贤者 | 賢者 | **SGE** | Nouliths | 贤具 | EW 6.0 | **无** | — | **70** | 100 |

### 2.4 近战 DPS（6 + 1 设限）

| 英文名 | 日文名 | 简中译名 | 繁中官方 | 缩写 | 武器（EN） | 武器（中文） | 登场 | 基础职业 class | 转职等级 | 起始等级 | 上限 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Monk | モンク | 武僧 | 武僧 | **MNK** | Fist Weapon | 格斗武器 | ARR 2.0 | Pugilist（格闘士） | 30 | 1 | 100 |
| Dragoon | 竜騎士 | 龙骑士 | 龍騎士 | **DRG** | Polearm | 长枪 | ARR 2.0 | Lancer（槍術士） | 30 | 1 | 100 |
| Ninja | 忍者 | 忍者 | 忍者 | **NIN** | Daggers | 双剑 | ARR **2.4** | Rogue（双剣士） | 30 | 1 | 100 |
| Samurai | 侍 | 武士 | 武士 | **SAM** | Katana | 武士刀 | SB 4.0 | **无** | — | **50** | 100 |
| Reaper | リーパー | 钐镰客 | 奪魂者 | **RPR** | War Scythe | 大镰刀 | EW 6.0 | **无** | — | **70** | 100 |
| Viper | ヴァイパー | 蝰蛇剑士 | 毒蛇劍士 | **VPR** | Twinblades | 双剑（可合体） | DT 7.0 | **无** | — | **80** | 100 |
| **Beastmaster** | **魔獣使い** | **驯兽师** | 🟠（未上线繁中） | **BST** | Hand Axe + Shield 🟡 | 单手斧＋盾 | **7.56** | **无** | — | **1** | **50** |

> 🟡 **关于驯兽师的武器**：官方 Job Guide 只说「This melee DPS job shares gear used by monk and samurai」（**共用武僧／武士的防具**），并未直接写武器类型。但 7.56 官方补丁说明的 New Items 表里，驯兽师专属道具有两类栏位：
> - **`Beastmaster's Arm`**：`Beast Herder's Hand Axe` … `Beastmaster's Hand Axe +4`、`Beastliege's Hand Axe`、**`Guttler`**、`Guttler Unleashed`
> - **`Shield`**：`Beast Herder's Hoplon` … `Kornago Hoplon`、`Augmented Kornago Hoplon`
>
> 因此 **BST 使用「单手斧 + 盾」**，是**全游戏唯一的带盾 DPS 职业**。`Guttler` 是 FFXI 驯兽师的经典斧名。此结论为**由官方道具表推导（B 级）**。[来源：7.56 补丁说明 New Items](https://na.finalfantasyxiv.com/lodestone/topics/detail/a8a526ad64db45c8ca8d1c7fdcce8a5eedaa18bc)

### 2.5 远程物理 DPS（3）

| 英文名 | 日文名 | 简中译名 | 繁中官方 | 缩写 | 武器（EN） | 武器（中文） | 登场 | 基础职业 class | 转职等级 | 起始等级 | 上限 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Bard | 吟遊詩人 | 吟游诗人 | 吟遊詩人 | **BRD** | Bow | 弓 | ARR 2.0 | Archer（弓術士） | 30 | 1 | 100 |
| Machinist | 機工士 | 机工士 | 機工士 | **MCH** | Firearm | 魔导火枪 | HW 3.0 | **无** | — | **30** | 100 |
| Dancer | 踊り子 | 舞者 | 舞者 | **DNC** | Throwing Weapon | 投掷武器／战轮 | ShB 5.0 | **无** | — | **60** | 100 |

### 2.6 远程法系 DPS（4 + 1 设限）

| 英文名 | 日文名 | 简中译名 | 繁中官方 | 缩写 | 武器（EN） | 武器（中文） | 登场 | 基础职业 class | 转职等级 | 起始等级 | 上限 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Black Mage | 黒魔道士 | 黑魔法师 | 黑魔道士 | **BLM** | Staff | 咒杖 | ARR 2.0 | Thaumaturge（呪術士） | 30 | 1 | 100 |
| Summoner | 召喚士 | 召唤师 | 召喚士 | **SMN** | Grimoire | 魔导书 | ARR 2.0 | **Arcanist（巴術士／秘术师）** | 30 | 1 | 100 |
| Red Mage | 赤魔道士 | 赤魔法师 | 赤魔道士 | **RDM** | Rapier | 细剑 | SB 4.0 | **无** | — | **50** | 100 |
| Pictomancer | ピクトマンサー | 绘灵法师 | 繪靈法師 | **PCT** | Brush | 画笔（魔具） | DT 7.0 | **无** | — | **80** | 100 |
| **Blue Mage** | **青魔道士** | **青魔法师** | 青魔道士 | **BLU** | Cane | 幻杖 | **4.5** | **无** | — | **1** | **80** |

### 2.7 简中／繁中译名差异速查（容易踩坑）

| 英文 | 日文 | 简中（国服） | 繁中（台服） | 备注 |
|---|---|---|---|---|
| Viper | ヴァイパー | **蝰蛇剑士** | **毒蛇劍士** | ✅ 两边都是官方页确认，**不要混用** |
| Reaper | リーパー | **钐镰客** | **奪魂者** | ✅ 差异极大 |
| Pictomancer | ピクトマンサー | **绘灵法师** | **繪靈法師** | ✅ 仅繁简字形差异 |
| Gunbreaker | ガンブレイカー | 绝枪战士 | 絕槍戰士 | ✅ |
| Blue Mage | 青魔道士 | 青魔法师 | 青魔道士 | ✅ 简中把「道士」改为「法师」 |
| Beastmaster | 魔獣使い | **驯兽师** | 🟠 未知 | ✅ 简中官方 7.5 特设页确认 |
| Bastion（8.0） | 未公布 | 🟠「坚城卫」（社区流传） | 🟠 未知 | ⚠️ **未在官方中文站找到**，仅英文 `Bastion` 为官方 |
| Evercold（8.0） | 白銀のワンダラー | **白银的探求者** | 🟠 未知 | ✅ 日文官方标题确认；简中标题见 Famitsu 中文报道 |

> 来源：简中官方 [7.0 特职页](https://actff1.web.sdo.com/project/20240927dawntrail/patch70/job.html)、[7.5 特设页](https://actff1.web.sdo.com/project/20240927dawntrail/patch75/index.html)；繁中官方 [职业介绍](https://www.ffxiv.com.tw/web/intro/job/index.html)；日文官方 [ジョブガイド](https://jp.finalfantasyxiv.com/jobguide/battle/)。
> ⚠️ **注意**：繁中官网「职业介绍」页仍停留在 7.0 内容（**没有青魔道士与驯兽师条目**），属于**可能过期**页面。

### 2.8 全职业登场资料片分布

| 资料片 | 版本 | 新增战斗职业 | 数量 |
|---|---|---|---|
| 新生 Eorzea | 2.0（2013-08-27） | PLD, WAR, WHM, SCH, MNK, DRG, BRD, BLM, SMN（+ 9 个基础职业） | 9 |
| — | 2.4（2014-10-28） | NIN（+ 基础职业 Rogue） | 1 |
| 苍天之龙骑士 | 3.0（2015-06-23） | DRK, AST, MCH | 3 |
| 红莲之狂潮 | 4.0（2017-06-20） | SAM, RDM | 2 |
| — | 4.5（2019-01） | **BLU（首个设限特职）** | 1 |
| 漆黑之反叛者 | 5.0（2019-07-02） | GNB, DNC | 2 |
| 晓月之终途 | 6.0（2021-12-07） | RPR, SGE | 2 |
| 黄金的遗产 | 7.0（2024-07-02） | VPR, PCT | 2 |
| — | 7.56（2026-09-08） | **BST（第二个设限特职）** | 1 |
| **白银的探求者** | **8.0（2027-01）** | **Bastion（坦克）** + **未公布名的远程物理 DPS** | **2** |

---

## 3. 生产与采集职业（8 生产 + 3 采集）

### 3.1 官方定性（A 级）

官方《Crafting & Gathering Guide》原文：

> *"In addition to existing **martial classes**, you may also choose to become a **Disciple of the Hand**—one who synthesizes new items from materials on hand—or a **Disciple of the Land**—one who harvests Eorzea's natural resources from the field."*
> *"There are a total of **eight** disciplines you may choose from"*（DoH）
> *"There are **three** Disciplines of the Land to choose from: the miner… the botanist… and the fisher"*（DoL）

> ✅ 官方确认为 **8 + 3**，且官方用词是 **discipline**（ディシプリン），而非 job。
> 🔴 **重点事实**：**生产采集的这 11 个在游戏数据里全部是 `class`（基础职业）而非 `job`（特职）**——它们**没有 Soul Crystal（灵魂结晶）**，也**没有对应的上位特职**。这就是为什么它们是「职业」而不是「特职」。**官方 Job Guide（战斗篇）完全不收录它们**，它们只在 Crafting & Gathering Guide 中。
> ⚠️ **不确定项**：本次调研未能从官方页面直接找到一句「这 11 个是 class 而非 job」的显式表述；上述结论来自「它们没有灵魂结晶、没有 job 转换、被官方与战斗 class 并列称作 discipline」这一系列官方事实的组合推导（**B 级**）。请在开发时按「它们是 class 体系」处理。
> 来源：[官方 Crafting & Gathering Guide（Updated for 7.5）](https://na.finalfantasyxiv.com/crafting_gathering_guide/)

### 3.2 生产职业 Disciple of the Hand（8）

| 英文名 | 日文名 | 常见中文译名 | 缩写 | 主手工具（EN） | 主手工具（中文） | 专精产物 | 登场 |
|---|---|---|---|---|---|---|---|
| Carpenter | 木工師 | 木匠／木工师 | **CRP** | Saw | 锯 | 木材、家具、弓、长枪柄、法杖 | 1.0/2.0 |
| Blacksmith | 鍛冶師 | 锻铁匠 | **BSM** | Cross-pein Hammer | 锻锤 | 金属锭、刀剑、斧、枪头、工具 | 1.0/2.0 |
| Armorer | 甲冑師 | 铸甲匠 | **ARM** | Doming Hammer | 圆头锤 | 金属铠甲、盾、头盔、金属部件 | 1.0/2.0 |
| Goldsmith | 彫金師 | 雕金匠 | **GSM** | Chaser Hammer | 雕金锤 | 珠宝、耳环、戒指、法系武器 | 1.0/2.0 |
| Leatherworker | 革細工師 | 制革匠 | **LTW** | Head Knife | 裁皮刀 | 皮革、皮甲、腰带、部分武器 | 1.0/2.0 |
| Weaver | 裁縫師 | 裁衣匠／裁缝师 | **WVR** | Needle | 缝针 | 布料、法袍、装饰品 | 1.0/2.0 |
| Alchemist | 錬金術師 | 炼金术士 | **ALC** | Alembic | 蒸馏器 | 药水、以太药、墨水、部分魔导具 | 1.0/2.0 |
| Culinarian | 調理師 | 烹调师 | **CUL** | Frypan / Skillet | 平底锅 | 料理（食物增益） | 1.0/2.0 |

### 3.3 采集职业 Disciple of the Land（3）

| 英文名 | 日文名 | 常见中文译名 | 缩写 | 主手工具（EN） | 主手工具（中文） | 采集对象 | 登场 |
|---|---|---|---|---|---|---|---|
| Miner | 採掘師 | 采矿工 | **MIN** | Pickaxe | 鹤嘴锄 | 矿石、金属、宝石原石 | 1.0/2.0 |
| Botanist | 園芸師 | 园艺工 | **BTN** | Hatchet | 手斧 | 木材、草、果实、纤维 | 1.0/2.0 |
| Fisher | 釣り師 | 捕鱼人／渔夫 | **FSH** | Fishing Rod | 钓竿 | 鱼类、部分材料 | 1.0/2.0 |

> ⚠️ **不确定项**：上表「常见中文译名」列中 `木匠/木工师`、`裁衣匠/裁缝师`、`捕鱼人/渔夫` 的**简中官方写法本次调研未能从官方中文站直接核实**（`ff.web.sdo.com` 的生产采集指南页未被抓取成功）。繁中官方写法为「木匠、鍛鐵匠、鑄甲匠、雕金匠、製革匠、裁縫師、鍊金術士、烹調師／採礦工、園藝工、漁夫」。请以繁中官方为准，简中名按标注对待。

### 3.4 生产职业的核心机制（简化模型）

生产职业**没有战斗量谱**，其"量谱"就是合成界面本身：

| 机制 | 说明 | 备注 |
|---|---|---|
| **Craftsmanship（工作精度／作業精度）** | 决定每次 `Basic Synthesis` 类技能推进的**进展（Progress）** | 装备／食物提供 |
| **Control（加工精度）** | 决定每次 `Touch` 类技能提升的**品质（Quality）** | 品质越高 HQ 率越高 |
| **CP（Crafting Points）** | 释放技能的**资源池**，随时间不恢复，靠 `Inner Quiet` 等技能与药水补充 | 类似 MP |
| **Durability（耐久）** | 合成失败条件；技能消耗耐久，归零则合成结束 | 通常 40～80 |
| **Progress（进展）** | 达到配方要求即**合成成功** | 与 Quality 争夺同一耐久池 |
| **Quality（品質）** | 决定 **HQ（高品质）** 概率；达到上限即 100% HQ | 生产职业的"伤害" |
| **Collectability（収集価値）** | 6.x 起的"收藏品"评价，用于交任务／换点数 | — |
| 采集侧：**GP（Gathering Points）** | 采集职业的资源池，用于 `King's Yield` 等增产技能 | — |
| 采集侧：**Gathering / Perception** | 获得力／鉴别力：决定能否采集与 HQ 率 | — |

> 🟡 注：6.0（Endwalker）对生产系统做过**大幅精简**（`Inner Quiet` 改为自动叠层、移除旧 `Steady Hand` 系列、`Muscle Memory`／`Reflect` 改为一手起手技、6.0 起移除 `Final Appraisal` 的旧功能语义等）。本次调研**未抓到 7.x 生产技能的精确定量表**，因此**不在此处给出 7.5 的具体技能 CD／CP 消耗数值**，以免误导（见 §13 不确定项）。

### 3.5 放置化提示（前瞻）

生产采集**天然适合放置化**：它是纯资源转换系统（Progress / Quality / CP 三维），没有方向指定、没有随机暴击位移，**可以用「CP 预算分配 + 期望品质」直接建模**。反而采集更简单（GP 分配 + 采集点冷却）。详见 §12。

---

## 4. 各战斗职业详解（职能 × 职业）

### 4.1 坦克（4）

<!-- PLACEHOLDER-TANKS -->

### 4.2 治疗（4）

<!-- PLACEHOLDER-HEALERS -->

### 4.3 近战 DPS（7）

<!-- PLACEHOLDER-MELEE -->

### 4.4 远程物理 DPS（3）

> 本节数值标注规则：**✅官方** = 官方 Job Guide / 官方技能文本；**🎮游戏数据** = xivapi 游戏内数据表（Action / ActionTransient）；**⚠️社区** = 需自行复核。
> **重要提示**：下表的威力 / CD / 层数大量来自 🎮 游戏数据表交叉官方技能文本。**部分数值存在官方页面与游戏数据不一致的情况，已在各节末尾的「数值冲突」中标注。**

#### 4.4.1 Bard（BRD / 吟遊詩人 / 吟游诗人）

| 字段 | 内容 |
|---|---|
| 武器 | Bow 弓｜转职道具 Soul of the Bard（Lv.30 装备）|
| 登场 | 2.0 A Realm Reborn ⚠️ |
| 基础职业 / 转职 | **Archer（弓术士）Lv.30** ✅官方 |
| 上限 | 100 |
| 复活 | ❌ 无 |

**职业量谱（4 套）**

| 量谱 | 上限 | 机制 |
|---|---|---|
| **Song Gauge（Coda）** | 3 个 Coda | 每首歌唱完授予对应 Coda（Mage's / Army's / Wanderer's）。**Radiant Finale 的增伤按 Coda 数量结算：1 Coda = 2%、2 = 4%、3 = 6%**，持续 20s |
| **Soul Voice Gauge** | 100 | Apex Arrow 至少消耗 20；威力随超出 20 的部分提升至上限 **700**；Soul Voice ≥ 80 时使用 Apex Arrow 授予 **Blast Arrow Ready（10s）**，Blast Arrow 威力 **700** |
| **Repertoire** | Army's Paeon 4 层 / Wanderer's Minuet 3 层 | 唱歌期间 **80% 概率触发**；效果随歌变化（见下表） |
| **Hawk's Eye** | 30s | 由 Heavy Shot / Quick Nock（20%）、Iron Jaws / Caustic Bite / Stormbite / Burst Shot / Ladonsbite（35%）概率授予；解锁 Straight Shot / Wide Volley / Refulgent Arrow / Shadowbite。⚠️**7.x 前该 buff 名为 "Straight Shot Ready"，更名补丁号未确认** |

**三首歌 = BRD 的核心团辅**（全部 **CD 120s / 持续 45s / 半径 50y**）

| 技能 | 日文 | 等级 | 队伍增益 | Repertoire 效果 | 授予 Coda |
|---|---|---|---|---|---|
| Mage's Ballad | 賢人のバラード | 30 | **伤害 +1%** | Heartbreak Shot 与 Rain of Death 复唱 **−7.5s** | Mage's Coda |
| Army's Paeon | 軍神のパイオン | 40 | **直击率 +3%** | 咏唱／复唱／自动攻击间隔 **−4%**，可叠 **4 层** | Army's Coda |
| the Wanderer's Minuet | 旅神のメヌエット | 52 | **暴击率 +2%** | 解锁 Pitch Perfect，可叠 **3 层** | Wanderer's Coda |

**标志性技能**（Lv.100 满配）

| 技能 | 等级 | CD | 威力 | 备注 |
|---|---|---|---|---|
| Heavy Shot | 1 | 2.5s | 160 | 20% Hawk's Eye |
| Straight Shot | 2 | 2.5s | 200 | 需 Hawk's Eye / Barrage |
| **Raging Strikes** | 4 | **120s** | — | 自身伤害 **+15%**，20s |
| Venomous Bite / Caustic Bite | 6 / 64 | 2.5s | 100 / 150 + 毒 20/45s | Caustic 35% Hawk's Eye |
| Stormbite | 64 | 2.5s | 100 + 风 25/45s | 35% Hawk's Eye |
| **Bloodletter** | 12 | 15s | 130 | **3 充能** |
| Rain of Death | 45 | 15s | — | 与 Bloodletter 共 CD，3 充能 |
| Repelling Shot | 15 | 30s | — | 后跳 10y |
| Quick Nock → Ladonsbite | 18 / 82 | 2.5s | 110 / 140（锥形） | — |
| Wide Volley | 25 | 2.5s | 140 / Barrage 220 | — |
| **Barrage** | 38 | **120s** | — | 10s：Refulgent Arrow 打 3 次、Shadowbite 威力 300；授予 Resonant Arrow Ready（30s） |
| **Battle Voice** | 50 | **120s** | — | **队伍直击率 +20%**，**持续 20s** ✅官方 |
| Pitch Perfect | 52 | 1s | 100 / 220 / 360（1/2/3 层） | 仅旅神期间 |
| Empyreal Arrow | 54 | 15s | 260 | 授予 Repertoire |
| Iron Jaws | 56 | 2.5s | 100 | 刷新双 DoT；35% Hawk's Eye |
| Sidewinder | 60 | 60s | 400 | — |
| **Troubadour** | 62 | **90s ✅官方 / 120s 🎮⚠️** | — | 自身 + 30y 内队伍受伤 **−15%**，15s |
| **Nature's Minne** | 66 | 120s | — | 受治疗量 **+15%**，15s |
| Refulgent Arrow | 70 | 2.5s | 280 | 需 Hawk's Eye |
| Shadowbite | 72 | 2.5s | 200 / Barrage 300 | — |
| Burst Shot | 76 | 2.5s | 220 | 35% Hawk's Eye |
| **Apex Arrow** | 80 | 2.5s | 140 → **700** | 消耗 20 Soul Voice |
| **Blast Arrow** | 86 | 2.5s | **700** | 需 Blast Arrow Ready |
| **Radiant Finale** | 90 | **110s** | — | 队伍伤害 **+2/4/6%**（按 Coda），**20s**；授予 Radiant Encore Ready（30s） |
| Heartbreak Shot | 92 | 15s | 180 | 3 充能 |
| Resonant Arrow | 96 | 2.5s | **640**（首个，其余 −50%） | 需 Resonant Arrow Ready |
| Radiant Encore | 100 | 2.5s | **700 / 800 / 1100**（1/2/3 Coda） | 需 Radiant Encore Ready |

**爆发窗口**：`Raging Strikes（20s/120s）` + `Battle Voice（20s/120s）` + `Radiant Finale（20s/110s）` + `Barrage（10s/120s）` → **Radiant Encore** → 三首歌轮转（各 120s CD / 45s 持续）→ Apex Arrow + Blast Arrow、Resonant Arrow、Heartbreak Shot 倾泻。

**循环思路**：维持 Caustic Bite / Stormbite 双 DoT（Iron Jaws 刷新）→ 依次唱 Mage's Ballad → Army's Paeon → Wanderer's Minuet，用 Repertoire 触发 Bloodletter / Rain of Death / Heartbreak Shot 与 Pitch Perfect → Hawk's Eye 触发时打 Refulgent Arrow / Shadowbite / Straight Shot → Soul Voice 攒到 80+ 打 Apex Arrow 再 Blast Arrow → 120s 爆发对齐 Raging Strikes / Battle Voice / Barrage，110s 打 Radiant Finale + Radiant Encore。

**⚠️ 数值冲突**：`Troubadour` 的 CD 在官方 Job Guide 页面写 **90s**，游戏数据表为 **120s**。以官方页面为准。

#### 4.4.2 Machinist（MCH / 機工士 / 机工士）

| 字段 | 内容 |
|---|---|
| 武器 | Machinist's Arm（火枪）⚠️EN 分类名待核 |
| 登场 | 3.0 Heavensward ⚠️ |
| 基础职业 | **无**，起始 **Lv.30** ⚠️社区（官方页未列解锁条件） |
| 上限 | 100 ｜ 复活 ❌ |

**职业量谱**

| 量谱 | 上限/层数 | 机制 |
|---|---|---|
| **Heat Gauge** | 0–100 | Split / Heated Split / Slug / Clean 系 combo **+5**；**Hypercharge 消耗 50** |
| **Battery Gauge** | 0–100 | Hot Shot / Air Anchor / Chain Saw / Excavator **+20**，Clean Shot combo **+10**；**Automaton Queen 消耗 50** |
| **Overheated** | **5 层 / 10s** | Hypercharge 授予，每层可打 Blazing Shot 或 Auto Crossbow；单目标武器技能威力 **+20** |
| **Hypercharged** | 30s | Barrel Stabilizer 授予；可用**不消耗 Heat** 的 Hypercharge |
| **Full Metal Machinist** | 30s | Barrel Stabilizer 授予；解锁 **Full Metal Field** |
| **Charge（充能）** | Gauss Round / Ricochet / Double Check / Checkmate 各 **3 充能 / 30s** | Heat Blast / Blazing Shot 每次 **−15s** 复唱 |

**标志性技能**

| 技能 | 等级 | CD | 威力 | 备注 |
|---|---|---|---|---|
| Hot Shot | 4 | **40s** | 240 | Battery +20 |
| Reassemble | 10 | 55s | — | **2 充能**，5s 内下次武器技能必暴击直击 |
| Gauss Round | 15 | 30s | 130 | 3 充能 |
| **Hypercharge** | 30 | **10s** | — | Heat 50 → 5 层 Overheated（10s） |
| Heat Blast | 35 | 1.5s | 200 | 需 Overheated |
| **Wildfire** | 45 | **120s** | 每次武器技能 **+240**，最多 **6 层**，10s | 期间动作变为 Detonator |
| Ricochet | 50 | 30s | 130（首个，其余 −30%） | 3 充能 |
| Auto Crossbow | 52 | 1.5s | 180（锥形） | 需 Overheated |
| Heated Split / Slug / Clean Shot | 54 / 60 / 64 | 2.5s | 220 / 140→320 / 160→420 | Heat +5（Clean 另 Battery +10） |
| **Tactician** | 56 | **90s ✅ / 120s 🎮⚠️** | — | 队伍受伤 **−15%**，15s |
| **Drill** | 58 | 20s | **660** | **2 充能**，与 Bioblaster 共 CD |
| **Dismantle** | 62 | 120s | — | **目标造成伤害 −10%**，10s |
| **Barrel Stabilizer** | 66 | **120s** | — | Hypercharged 30s + Full Metal Machinist 30s |
| Blazing Shot | 68 | 1.5s | 240 | 需 Overheated；Double Check / Checkmate CD −15s |
| Flamethrower | 70 | 60s | 120 DoT/10s | 移动或用其他动作即中断 |
| Bioblaster | 72 | 20s | 50 + 50 DoT/15s | 2 充能 |
| **Air Anchor** | 76 | 40s | **660** | Battery +20 |
| **Automaton Queen** | 80 | 6s | 随 Battery 提升 | Battery 50，**12s** |
| Queen Overdrive | 80 | 15s | Pile Bunker **340 → 680** | 提前引爆 Queen |
| **Chain Saw** | 90 | 60s | **660**（直线，其余 −25%） | Battery +20；授予 Excavator Ready（30s） |
| Double Check / Checkmate | 92 | 30s | 180（首个，其余 −30%） | 各 3 充能 |
| Excavator | 96 | 2.5s | **660**（其余 −25%） | Battery +20 |
| **Full Metal Field** | 100 | 2.5s | **900**（必暴击直击，其余 −25%） | 需 Full Metal Machinist；不受 Reassemble 影响 |

**爆发窗口**：`Barrel Stabilizer（120s → Hypercharged 30s + Full Metal Machinist 30s）` 内打 `Hypercharge（5 层 Overheated）` + `Wildfire（10s/120s）` + `Full Metal Field` + `Automaton Queen`（Battery 50）+ `Queen Overdrive`。⚠️「30s 窗口内能否放 2 次 Hypercharge」属流派细节，本报告未证实。

**团辅（重点）**：**MCH 完全没有队伍增伤团辅**。只有 `Dismantle`（目标输出 −10%，10s，120s）与 `Tactician`（队伍受伤 −15%，15s，90s/120s）。是 8 个远程 DPS 中团辅最弱的职业之一（与 BLM 并列）。

**循环思路**：Split → Slug → Clean 三段 combo 攒 Heat / Battery → 40s 周期的 Hot Shot / Air Anchor / Chain Saw(+Excavator) 与 20s 周期的 Drill / Bioblaster 优先打出 → Heat ≥ 50 打 Hypercharge 进入 5 层 Overheated，打满 5 次 Blazing Shot 并穿插 3 充能的 Gauss / Ricochet / Double Check / Checkmate → Battery ≥ 50 召唤 Automaton Queen，结束前 Queen Overdrive → 120s 对齐 Wildfire + Barrel Stabilizer + Full Metal Field。

#### 4.4.3 Dancer（DNC / 踊り子 / 舞者）

| 字段 | 内容 |
|---|---|
| 武器 | Throwing Weapons（投掷武器，游戏内为环刃／战轮）⚠️ |
| 登场 | 5.0 Shadowbringers ⚠️ |
| 基础职业 | **无**，起始 **Lv.60** ⚠️社区 |
| 上限 | 100 ｜ 复活 ❌ |

**职业量谱**

| 量谱 | 上限 | 机制 |
|---|---|---|
| **Step Gauge** | Standard Step 2 步 / Technical Step 4 步 | Standard Step **CD 30s**、Technical Step **CD 120s**，跳舞窗口 **15s**。跳舞中只能使用 Standard/Technical Finish、En Avant、Curing Waltz、Shield Samba、舞步、role action、Sprint、LB |
| **Esprit Gauge** | 0–100 | **Saber Dance 消耗 50**；Standard Finish 给自身与舞伴 Esprit；Technical Finish 给 30y 内全队 Esprit；Tillana 给自身 **+50** |
| **Fourfold Feathers** | 4 层 | Reverse Cascade / Fountainfall / Rising Windmill / Bloodshower **50% 概率**给 1 层；Fan Dance 消耗并接续 |
| 其它 buff | — | Silken Symmetry / Silken Flow（30s，50% 概率）、Flourishing Symmetry/Flow、Threefold Fan Dance（30s）、Fourfold Fan Dance、Flourishing Finish（30s）、Flourishing Starfall（20s）、Last Dance Ready（30s）、Finishing Move Ready（30s）、Rising Rhythm（最大 4 层） |

**标志性技能**

| 技能 | 等级 | CD | 威力 | 备注 |
|---|---|---|---|---|
| Cascade / Fountain | 1 / 2 | 2.5s | 220 / 120→280 | 50% Silken Symmetry / Flow |
| **Standard Step** | 15 | **30s** | — | 跳舞 15s → Standard Finish |
| Reverse Cascade | 20 | 2.5s | 280 | 50% Fourfold Feather |
| Rising Windmill / Fountainfall / Bloodshower | 35 / 40 / 45 | 2.5s | 200 / 340 / 200 | 50% Fourfold Feather |
| Fan Dance I–IV | 30 / 50 / 66 / 86 | 1s | 180 / 100(AoE) / 220 / 460(锥形) | 消耗 Feather |
| En Avant | 50 | 30s | — | **2 充能**位移 |
| Curing Waltz | 52 | 60s | 治疗 **300** | 自身 + 周围队伍 |
| **Shield Samba** | 56 | **90s ✅ / 120s 🎮⚠️** | — | 队伍受伤 **−15%**，15s |
| Closed Position | 60 | 30s | — | 指定舞伴（Dance Partner） |
| **Devilment** | 62 | **120s** | — | 自身与舞伴 **暴击率 + 直击率各 +20%**，**20s**；授予 Flourishing Starfall（20s） |
| **Technical Step** | 70 | **120s** | — | 跳舞 15s → Technical Finish |
| **Flourish** | 72 | 60s | — | 授予 Flourishing Symmetry/Flow、Threefold/Fourfold Fan Dance、Finishing Move Ready（均 30s） |
| **Saber Dance** | 76 | 2.5s | **540**（首个，其余 −60%） | Esprit 消耗 50 |
| Improvisation | 80 | 120s | HoT 100/15s | Rising Rhythm 每 3s +1（最大 4）；可转 Improvised Finish |
| Tillana | 82 | 2.5s | **600**（其余 −60%） | 需 Flourishing Finish；**Esprit +50** |
| **Starfall Dance** | 90 | 2.5s | **600**（必暴击直击，直线，其余 −75%） | 需 Flourishing Starfall |
| Last Dance | 92 | 2.5s | 540（其余 −60%） | 需 Last Dance Ready |
| **Finishing Move** | 96 | 与 Standard Step 共 CD（30s） | **850**（其余 −60%） | **施加 5% Standard Finish / 60s** |

**Standard / Technical Finish 数值**（✅官方技能文本）

| 技能 | 0 步 | 1 步 | 2 步 | 3 步 | 4 步 | 队伍增伤 | 持续 | 范围 |
|---|---|---|---|---|---|---|---|---|
| **Standard Finish** | 360 | 540 | **850** | — | — | 1 步 **2%** / 2 步 **5%** | **60s** | 自身 + 舞伴 |
| **Technical Finish** | 350 | 540 | 720 | 900 | **1300** | 1/2/3/4 步 = **1% / 2% / 3% / 5%** | **20s** | 30y 内队伍 |
| Improvised Finish | 护盾 = 最大 HP 的 5%（0 层 Rising Rhythm）→ 6% → 7% → 8% → **10%**（4 层），持续 30s | | | | | | | |

**爆发窗口**：`Technical Step → Technical Finish（20s / 5% 团队增伤）` + `Devilment（20s/120s）` + `Flourish（60s）` 内一口气打出 Tillana、Starfall Dance、Finishing Move；`Standard Step` 走 30s 小循环并保持 Standard Finish（60s）。

**循环思路**：Cascade → Fountain 基础 combo 触发 Silken Symmetry/Flow → 打 Reverse Cascade / Fountainfall 攒 Fourfold Feather → 每 30s 走 Standard Step 两步拿 5% 团辅 → 每 120s Technical Step 四步 + Technical Finish 全队爆发 + Devilment + Flourish → 消耗 Feather 打 Fan Dance I–IV → Esprit 满 50 打 Saber Dance → 收尾 Tillana / Starfall Dance / Last Dance / Finishing Move。

#### 4.4.4 远程物理 DPS 横向对比

| 维度 | BRD | MCH | DNC |
|---|---|---|---|
| 量谱数量 | 4（Coda / Soul Voice / Repertoire / Hawk's Eye） | 3 + 3 buff（Heat / Battery / Overheated / Hypercharged / FMM / Charge） | 3 + 多个 buff |
| 主要资源池 | Soul Voice（100） | Heat（100）+ Battery（100） | Esprit（100）+ Feather（4） |
| 随机触发 | ✅ Repertoire（80%）、Hawk's Eye（20/35%） | ❌ 基本无随机 | ✅ Fourfold Feather（50%）、Silken（50%） |
| 队伍增伤团辅 | ✅ 最多（三首歌 + Battle Voice + Radiant Finale，最高 +6%） | ❌ **无** | ✅ 强（Standard Finish 5% / 60s；Technical Finish 5% / 20s） |
| 团辅持续最长 | 45s（歌） | — | **60s（Standard Finish）** |
| 队伍减伤 | Troubadour −15% | Tactician −15% | Shield Samba −15% |
| 复活 | ❌ | ❌ | ❌ |
| 爆发 CD | 120s（110s Radiant Finale） | 120s | 120s |
| 放置化难度（§12） | ★★★★☆ 难 | ★☆☆☆☆ 易 | ★★★★☆ 难 |

### 4.5 远程法系 DPS（5）

#### 4.5.1 Black Mage（BLM / 黒魔道士 / 黑魔法师）

| 字段 | 内容 |
|---|---|
| 武器 | Two-handed Thaumaturge's Arm（双手咒杖）⚠️ |
| 登场 | 2.0 ARR ⚠️ ｜ 基础职业：**Thaumaturge（咒术师）Lv.30** ⚠️ |
| 上限 | 100 ｜ 复活 ❌ |

**Elemental Gauge 机制**

| 要素 | 数值/规则 |
|---|---|
| **Astral Fire** | 最高 **III 级**（Fire III / Manafont / High Fire II 授予 III）；**Fire IV 每发授予 1 层 Astral Soul** |
| **Umbral Ice** | 最高 **III 级**；**Blizzard IV 授予 3 层 Umbral Heart**，Umbral Soul 授予 1 层 |
| **Umbral Heart** | 抵消 Astral Fire 的 MP 消耗增加；Flare 的 MP 消耗降至 1/3 |
| **Astral Soul** | 攒满 **6 层** 才能放 **Flare Star**（Lv.100，威力 **500**，其余 −65%） |
| **Polyglot** | Amplifier 授予 1 层；消耗 1 层可放 **Xenoglossy（890）** 或 **Foul（600）** |
| **Thunderhead** | 进入/切换星极·灵极状态时授予；是放 Thunder 系 DoT 的前提 |
| **MP 回复** | Umbral Ice I = **2500** / II = **5000** / **III = 10000**；脱战时 Umbral Soul 直接给 UI III + 3 心 + 10000 MP |

**标志性技能**

| 技能 | 等级 | CD | 威力 | 备注 |
|---|---|---|---|---|
| Blizzard / Fire | 1 / 2 | 2.5s | 180 / 180 | Fire 有 **40% Firestarter** |
| Transpose | 4 | 5s | — | AF ↔ UI 各换 1 级 |
| Thunder → High Thunder | 6 / 92 | 2.5s | 100 + 45/24s | 需 Thunderhead |
| **Manafont** | 30 | **120s** | — | 满 MP + AF III + Thunderhead + **3 Umbral Heart** + Paradox |
| Manaward | 30 | 120s | — | 魔法护盾 |
| Blizzard III / Fire III | 35 | 2.5s | 290 / 290 | UI III / AF III |
| Umbral Soul | 35 | 2.5s | — | 授予 UI + 1 心 |
| Thunder III | 45 | 2.5s | 120 + 50/27s | — |
| Flare | 50 | 2.5s | 未取到 ⚠️ | AoE 大杀器 |
| Aetherial Manipulation | 50 | 10s | — | 位移 |
| **Ley Lines** | 52 | **120s / 2 充能** | — | 圈内咏唱·复唱·自动攻击 **−15%**，**20s** |
| **Blizzard IV** | 58 | 2.5s | 300 | **+3 Umbral Heart** |
| **Fire IV** | 60 | 2.5s | 300 | **+1 Astral Soul** |
| Between the Lines | 62 | 3s | — | 回到 Ley Lines |
| **Triplecast** | 66 | **60s / 2 充能** | — | 15s 内下 3 个法术无咏唱 |
| **Foul** | 70 | 2.5s | **600**（其余 −25%） | Polyglot 消耗 1 |
| Despair | 72 | 2.5s | 350 | 授予 AF III |
| **Xenoglossy** | 80 | 2.5s | **890** | Polyglot 消耗 1 |
| High Fire II / High Blizzard II | 82 | 2.5s | 100(AoE) | AF III / UI III |
| **Amplifier** | 86 | **120s** | — | 授予 1 Polyglot |
| Retrace | 96 | 40s | — | 重新放置 Ley Lines（不重置时长） |
| **Flare Star** | 100 | 2.5s | **500**（其余 −65%） | 需 Astral Soul 满 6 层 |

**爆发窗口**：`Ley Lines（20s / 120s，2 充能）` + `Manafont（120s）` 内快速堆满 6 层 Astral Soul → **Flare Star**；`Amplifier（120s）` 攒 Polyglot → Xenoglossy / Foul；`Triplecast（2 充能 / 60s）` 用于长爆发期无咏唱连打；`Retrace` 重置站位。

**团辅（重点）**：**BLM 完全没有队伍增伤技能**，也不提供队伍减伤。唯一团队向手段是 role action **`Addle`**（降低目标魔法输出 **10%**，10s，CD 90s）⚠️社区数值，官方 Job Guide 未在本页给出数值。

**循环思路**：UI III 用 Blizzard IV 攒 3 层 Umbral Heart + 回满 MP → 转 AF III → Fire IV ×（消耗心）+ 插入 Paradox → 心耗尽打 Despair → Flare Star（Astral Soul 满 6）→ 用 Manafont / Transpose 回到 UI 循环 → 全程维持 Thunder DoT → Ley Lines 内完成高密度输出，Amplifier 攒的 Polyglot 打进团辅窗口。

**7.2 重做（✅ 官方逐条，详见 §10.3）**：Astral Fire / Umbral Ice **不再过期**、全系咏唱统一大幅缩短至 2s、Ley Lines 持续 30s→20s、Flare Star 400→500、Enhanced Enochian III 25%→22% / IV 32%→27%。

#### 4.5.2 Summoner（SMN / 召喚士 / 召唤师）

| 字段 | 内容 |
|---|---|
| 武器 | Grimoire 魔导书 ⚠️ ｜ 登场 2.0 ARR ⚠️ ｜ 基础职业：**Arcanist（秘术师）Lv.30** ⚠️ |
| 上限 | 100 |
| **复活** | ✅ **Resurrection（リザレク）Lv.12**（继承自 Arcanist） |

**量谱／资源体系**

| 要素 | 数值/规则 |
|---|---|
| **Aetherflow Gauge** | 储存 Aetherflow 层数；**Necrotize 消耗 1 层（威力 500）**、Painflare 消耗 1 层（220 AoE）；Energy Drain（Lv.10，CD 60s）补充 |
| **Aethercharge** | Lv.6，**CD 60s**：Ruin/Ruin II/Ruin III 威力 **+50**、Outburst **+20**，持续 **15s**，并授予 Ruby/Topaz/Emerald Arcanum |
| **Dreadwyrm Trance（Summon Bahamut）** | Lv.70，**CD 60s**，持续 **15s**；Demi-Bahamut 自动追击（Wyrmwave）；Ruin III → Astral Impulse，Tri-disaster → Astral Flare |
| **Firebird Trance（Summon Phoenix）** | 持续 **20s**；召唤即放 Everlasting Flight，之后自动 Scarlet Flame；**需 LB 槽满**（槽充能 90s） |
| **Elemental Attunement** | Summon Ifrit/Titan/Garuda 授予 **2 层**（对应属性），Gemshine / Precious Brilliance 转为该属性；30s |
| 其它 buff | Further Ruin（解锁 Ruin IV）、Ifrit's / Garuda's / Titan's Favor、Ruby's Glimmer（解锁 Searing Flash **700**）、Refulgent Lux（解锁 Lux Solaris，治疗 **500**） |

**标志性技能**

| 技能 | 等级 | CD | 威力 | 备注 |
|---|---|---|---|---|
| Summon Carbuncle / Radiant Aegis | 2(ACN) | 2.5s / 60s | — | Aegis **2 充能**护盾 |
| Gemshine | 6(ACN) | 2.5s | 随属性 | 单目标元素攻击 |
| **Aethercharge** | 6(ACN) | 60s | — | 见上表 |
| Energy Drain | 10(ACN) | 60s | — | 补充 Aetherflow |
| **Resurrection** | **12(ACN)** | 2.5s | — | **复活队友** |
| Summon Ifrit | 30 | 2.5s | Inferno **600**（锥形，其余 −50%） | +2 Fire Attunement |
| Painflare | 40 | 10s | 220(AoE) | Aetherflow 1 |
| Ruin III | 54 | 2.5s | — | 主输出 |
| Astral Flow | 60 | 2.5s | — | 转为 Deathflare / Sunflare / Rekindle / 元素技 |
| Ruin IV | 62 | 2.5s | **520**（其余 −60%） | 需 Further Ruin |
| **Searing Light** | 66 | **120s** | — | **队伍伤害 +5%**，**20s** ✅官方；授予 Ruby's Glimmer（30s） |
| **Summon Bahamut** | 70 | **60s** | — | 15s |
| Enkindle Bahamut | 70 | 20s | — | 巴哈姆特终结技 |
| Tri-disaster | 74 | 2.5s | — | AoE DoT |
| Summon Ifrit II | 90 | 2.5s | Inferno **800**（5y AoE，其余 −50%） | — |
| **Necrotize** | 92 | 10s | **500** | Aetherflow 1 |
| **Searing Flash** | 96 | 10s | **700**(AoE) | 需 Ruby's Glimmer |
| **Lux Solaris** | 100 | 60s | 治疗 **500**（自身 + 周围队伍） | 需 Refulgent Lux |
| Summon Phoenix | — | 需 LB 满（充能 90s） | — | 20s，Demi-Phoenix |

**爆发窗口**：`Searing Light（+5% / 20s / 120s）` + `Summon Bahamut（60s CD，15s）` 或 `Summon Phoenix（20s）` 内打出 Astral Impulse / Fountain of Fire + Enkindle + Deathflare / Rekindle；三系元素召唤各 2 层 Attunement 循环；`Searing Flash（700）`、`Necrotize（500）` 打进窗口；`Lux Solaris` 提供团队治疗。

**团辅（重点）**：`Searing Light`：**队伍伤害 +5%，20s，CD 120s** ✅官方技能文本。另 `Radiant Aegis` 自身护盾（2 充能）、`Lux Solaris` 团队治疗 500。**SMN 是远程法系中团辅 + 团减/治疗最全面的职业。**

**循环思路**：常驻 Carbuncle → Aethercharge 小爆发 → 元素召唤三连（Ifrit → Titan → Garuda，各消耗 2 层 Attunement 打 Gemshine / Precious Brilliance）→ 60s 周期 Summon Bahamut 打 Astral Impulse + Enkindle Bahamut + Deathflare → Phoenix 阶段补 Fountain of Fire + Rekindle + Everlasting Flight → Aetherflow 层数用 Necrotize / Painflare 泻出 → 120s 与 Searing Light 对齐。

> 📌 SMN 是 **6.0 Endwalker 彻底重做**的职业：从「DoT 型（Bio / Miasma / Shadow Flare）+ 三重 Trance」改为「**召唤兽轮换型**」，详见 §10.2。

#### 4.5.3 Red Mage（RDM / 赤魔道士 / 赤魔法师）

| 字段 | 内容 |
|---|---|
| 武器 | Rapier 刺剑（配魔器/水晶）⚠️ ｜ 登场 4.0 Stormblood ⚠️ ｜ 基础职业：**无**，起始 **Lv.50** ⚠️ |
| 上限 | 100 ｜ **复活** ✅ **Verraise（ヴァルレイズ）Lv.64** |

**量谱机制**

| 要素 | 数值/规则 |
|---|---|
| **Black Mana / White Mana** | 各 0–100；平衡时进入近战连段；**Jolt III 一次给黑白各 +2** |
| **Mana Stacks / Magicked Swordplay** | `Manafication` 授予 **3 层**，每层免费使用一次 Enchanted Riposte / Zwerchhau / Redoublement / Moulinet 系（30s） |
| **Manafication 附加** | 近战连段射程临时扩至 **25y**（30s）；授予 **Prefulgence Ready**（30s） |
| **Acceleration** | **2 充能 / 55s**：下个 Verthunder III / Veraero III / Impact 立即咏唱（20s）、Impact 威力 +50、Verthunder/Veraero 必触发 Verfire/Verstone Ready，并授予 **Grand Impact Ready**（30s） |
| **Thorned Flourish** | Embolden 授予（30s）→ 解锁 **Vice of Thorns（950）** |
| **Dualcast** | 复活/长咏唱后下一个法术瞬发（RDM 循环核心）⚠️习得等级未核实 |

**标志性技能**

| 技能 | 等级 | CD | 威力 | 备注 |
|---|---|---|---|---|
| Verthunder / Veraero | 4 / 10 | 2.5s | — | 黑 / 白魔法 |
| Corps-a-corps | 6 | 35s | — | **2 充能**突进 |
| Verfire / Verstone | 26 / 30 | 2.5s | — | 需对应 Ready |
| Zwerchhau / Redoublement | 35 / 50 | 2.5s | — | 近战连段 2 / 3 |
| Displacement / Engagement | 40 | 35s | — | 各 **2 充能** |
| **Fleche** | 45 | **25s** | — | 高威力 oGCD |
| **Acceleration** | 50 | 55s | — | **2 充能** |
| Vercure | 54 | 2.5s | 治疗 **350** | 可配合 Dualcast 瞬发 |
| **Contre Sixte** | 56 | **45s** | — | AoE |
| **Embolden** | 58 | **120s** | — | **自身魔法伤害 +10%、队伍全伤害 +5%**，**20s**；授予 Thorned Flourish（30s） |
| **Manafication** | 60 | **110s** | — | 见上表 |
| **Verraise** | **64** | 2.5s | — | **复活队友** |
| Jolt III | 84 | 2.5s | **360** | **黑白各 +2** |
| **Magick Barrier** | 86 | **120s** | — | **队伍魔法受伤 −10%、受治疗量 +5%**，**10s** |
| **Vice of Thorns** | 92 | 10s | **950**（其余 −55%） | 需 Thorned Flourish |
| **Prefulgence** | 100 | 10s | **1200**（其余 −55%） | 需 Prefulgence Ready |

**爆发窗口**：`Embolden（自身 +10% 魔法 / 队伍 +5%，20s，120s）` + `Manafication（110s，3 层免费近战 + Prefulgence Ready）` + `Fleche（25s）` + `Contre Sixte（45s）` + `Acceleration（2 充能）` → 近战连段 → `Vice of Thorns（950）` + `Prefulgence（1200）`。

**团辅（重点）**：`Embolden` 队伍伤害 **+5%**（20s，120s；自身魔法伤害额外 +10%）；`Magick Barrier` 队伍魔法受伤 **−10%** + 受治疗 **+5%**（10s，120s）。**RDM 是远程法系中唯一同时提供「增伤 + 魔减 + 治疗增益」的职业。**
**7.4 改动（✅官方）**：Embolden 自身魔法增伤 5%→**10%**；Manafication CD 120s→**110s**；三连突进在 Manafication 下射程 **25y**；移除 Enhanced Manafication / II 特质（详见 §10.5）。

**循环思路**：Jolt III 起手平衡黑白 → Verthunder III / Veraero III（长咏唱）配合 Dualcast 瞬发下一发 → Verfire / Verstone 补黑/白 → 黑白各 ≥ 50 且平衡时进入 Enchanted Riposte → Zwerchhau → Redoublement → 用 Verholy / Verflare 回魔 → Scorch → Resolution 收尾 → 110s Manafication 提供 3 次免费连段，120s Embolden 对齐；Fleche / Contre Sixte 卡 CD 打；需要时 Verraise 拉人。

#### 4.5.4 Pictomancer（PCT / ピクトマンサー / 绘灵法师）

| 字段 | 内容 |
|---|---|
| 武器 | Brush 画笔（魔具）⚠️ ｜ 登场 7.0 Dawntrail ⚠️ ｜ 基础职业：**无**，起始 **Lv.80** ⚠️ |
| 上限 | 100 ｜ 复活 ❌（仅 role action Addle） |

**量谱机制**

| 要素 | 数值/规则 |
|---|---|
| **Palette Gauge** | 0–100；**`Subtractive Palette` 消耗 50**，授予 **3 层 Subtractive Palette** + **Monochrome Tones**（把 1 层 White Paint 转为 Black Paint），CD 10s |
| **White Paint** | 上限 **5 层**；Holy in White 消耗 1（**570**）；Rainbow Drip 授予 1 层 |
| **Black Paint** | 由 Monochrome Tones 转换而来；Comet in Black 消耗 1（**940**） |
| **Creature Canvas** | Pom / Wing / Claw / Maw Motif → 对应 Muse（**Living Muse，3 充能 / 40s**） |
| **Weapon Canvas** | Hammer Motif → Striking Muse（**Steel Muse，2 充能 / 60s**）→ Hammer Time / Hammer Stamp / Hammer Brush |
| **Landscape Canvas** | Starry Sky Motif → **Starry Muse**（Scenic Muse，**120s**） |
| **Hyperphantasia** | Starry Muse 授予 **5 层 / 30s**，在 Starry Muse 圈内施法消耗；消耗完授予 **Rainbow Bright（30s）** |
| **Inspiration** | Starry Muse 圈内 Star Prism 与 aetherhue 法术咏唱/复唱 **−25%**（30s） |
| **Starstruck** | 20s，解锁 Star Prism（**1100**） |

**标志性技能**

| 技能 | 等级 | CD | 威力 | 备注 |
|---|---|---|---|---|
| Tempera Coat | 10 | 120s | — | 自身护盾 |
| Smudge | 20 | 20s | — | 位移 |
| Creature Motif / Living Muse | 30 | 4s / **40s（3 充能）** | — | Pom → Wing → Claw → Maw |
| **Mog of the Ages** | 30 | 30s | **1000**（直线，其余 −70%） | 需 Moogle Portrait |
| **Hammer Stamp** | 50 | 2.5s | **560**（必暴击直击，其余 −70%） | 需 Hammer Time |
| Weapon Motif / Steel Muse | 50 | 60s / **2 充能** | — | → Striking Muse |
| **Blizzard in Cyan** | 60 | 3.3s | **860** | 需 Subtractive Palette；授予 Aetherhues |
| Blizzard II in Cyan | 60 | 3.3s | **360**(AoE) | 同上 |
| Subtractive Palette | 60 | 10s | — | Palette 50 |
| Landscape Motif / Scenic Muse | 70 | 120s | — | → Starry Muse |
| **Starry Muse** | 70 | **120s** | — | **队伍伤害 +5%，20s** ✅官方；Subtractive Spectrum（30s）；Inspiration + 5 层 Hyperphantasia（30s）；Starstruck（20s） |
| **Holy in White** | 80 | 2.5s | **570**（其余 −65%） | White Paint 1 |
| Hammer Brush | 86 | 2.5s | **580**（必暴击直击） | Hammer Stamp combo |
| Tempera Grassa | 88 | 10s | — | **群体护盾**升级 |
| **Comet in Black** | 90 | 3.3s | **940**（其余 −65%） | Black Paint + Monochrome Tones |
| **Rainbow Drip** | 92 | **60s** | **1000**（直线，其余 −85%） | 授予 White Paint（上限 5） |
| **Star Prism** | 100 | 2.5s | **1100**（其余 −70%）+ **队伍治疗 400** | 需 Starstruck |

**爆发窗口**：`Starry Muse（+5% / 20s / 120s）` 内进入圈中施法，消耗 5 层 Hyperphantasia（咏唱/复唱 −25%）→ 触发 Rainbow Bright 后打 **Rainbow Drip（1000）**（瞬发 + 复唱缩短）→ 用 Black Paint 打 **Comet in Black（940）** → **Star Prism（1100 + 团队治疗 400）** 收尾；`Hammer Stamp → Hammer Brush`（560/580 必暴击直击）与 `Mog of the Ages（1000）` 为固定高威力块。

**团辅（重点）**：`Starry Muse`：自身与周围队伍伤害 **+5%**，**20s**，CD **120s** ✅官方技能文本。另 `Tempera Grassa` 团队护盾、`Star Prism` 附带 400 治疗。**没有复活。**

**循环思路**：开局（非战斗）预画好 Creature / Weapon / Landscape Motif → 战斗中 Living Muse / Steel Muse 泻出 Muse 技 → 基础 aetherhue 攒 Palette 至 50 → Subtractive Palette 进入减色系（Blizzard in Cyan 860）→ White Paint 满了打 Holy in White、Monochrome Tones 转 Black Paint 打 Comet in Black → 120s 用 Starry Muse 开爆发 → Rainbow Drip / Star Prism 收尾。

#### 4.5.5 Blue Mage（BLU / 青魔道士 / 青魔法师）——受限职业专题

| 字段 | 内容 |
|---|---|
| 类型 | **Limited Job（受限职业 / 设限特职）** ✅官方 |
| 起始 / 上限 | **起始 Lv.1，上限 Lv.80** ✅官方原文："starting at level 1 with a maximum level of 80" |
| 解锁 | 任务「**Out of the Blue**」；条件：任意战斗/魔法职业 **Lv.50** + 完成 2.0 主线「The Ultimate Weapon」；地点 Limsa Lominsa Lower Decks (X:9.9, Y:11.0)，NPC Zealous Yellowjacket |
| 武器 | Blue Mage's Arm（单手杖/魔器类）⚠️中文与英文分类名待核 |
| 登场 | 4.5 Stormblood（2019-01）⚠️社区 |
| 复活 | ✅ **Angel Whisper（エンジェルウィスパー）** |

> ⚠️ **对任务原描述的一处更正**：BLU **没有 Job Gauge（职业量谱）**——官方 Blue Mage 页面**没有 Job Gauge 章节**。它的替代物是 **Blue Magic Spellbook（青魔法书）**。因此 §12 中不应按「量谱」给 BLU 建模，而应按「**法术库 + 配装**」建模。

**学习技能（Learn）机制**（✅官方）

- 必须在战斗中**目睹敌人施展该特殊攻击**，然后在**击败该敌人**后有概率学会。
- **「Job level has no influence on when an action can be learned.」** —— 职业等级与能否学会无关。
- 已学技能登记在 **Blue Magic Spellbook**，书中给出其他技能的获取提示。
- **Active Actions 最多 24 个**；战斗中／特定副本内不可更改。
- **Active Sets 最多 5 套**，只保存 BLU 专属热键栏（共享热键栏与宏不受影响）。
- 部分法术通过 **Whalaqee Totems** 获取：完成 BLU 任务「Blue Leading the Blue」及特定成就后，找 Ul'dah - Steps of Thal (X:12.5, Y:12.9) 的 Wayward Gaheel Ja 兑换。

**Mimicry（拟态）系统**

| 项目 | 内容 |
|---|---|
| 技能 | **Aetheric Mimicry（エーテルコピー）**，对**目标队友**施放（不能对自己），复制其职能并获得对应增益；**再次使用即结束** |
| Tank Mimicry | 提升防御，并强化特定青魔法（例：**Divine Cataract 500 → 1000**） |
| DPS Mimicry | **暴击率与直击率 +20%**，并强化特定青魔法（例：**Matra Magic 每段 50 → 100**） |
| Healer Mimicry | **治疗量 +20%**，并强化特定青魔法（例：**Exuviation 治疗 50 → 300**） |
| 持久性 | 属状态（再次使用即结束），**无固定倒计时** |

**标志性青魔法**

| 技能 | 日文 | CD | 威力/效果 |
|---|---|---|---|
| Water Cannon | 水鉄砲 | 2.5s | 200 水属性 |
| **1000 Needles** | 千の針 | 2.5s | **固定 1000** 物理伤害，由周围敌人分摊 |
| **Missile** | ミサイル | 2.5s | 造成目标**当前 HP 50%** 的伤害；命中率低；对等级高于自己的敌人无效 |
| White Wind | ホワイトウィンド | 2.5s | 按自身当前 HP 为自身与周围队友回血 |
| **Final Sting** | ファイナルスピア | 2.5s | **2000** 物理，自身失去行动能力，附带 Brush with Death（**600s**，复活不解除） |
| **Off-guard** | ガードオファ | **60s** | **目标受到伤害 +5%**，15s；与 Peculiar Light 共 CD |
| **Peculiar Light** | 特異な光 | **60s** | 周围敌人**受到魔法伤害 +5%**，15s；与 Off-guard 共 CD |
| **Moon Flute** | 月の笛 | 2.5s | Waxing Nocturne：**伤害 +50%、移速 +30%**，15s；结束后 Waning Nocturne 15s（**完全无法行动**） |
| **Mighty Guard** | マイティガード | 2.5s（开关） | **受伤 −40% / 造成伤害 −40%**，仇恨增加，受伤不中断咏唱 |
| **Diamondback** | ドラゴンファング | 2.5s | **受伤 −90%**、无效化大部分击退与吸引，**10s 内不能移动/行动** |
| Whistle | ホイッスル | 2.5s | 下一个物理伤害法术威力 **+80%**，30s |
| **Revenge Blast** | リベンジブラスト | 2.5s | 50；**自身 HP < 20% 时变为 500** |
| **Angel Whisper** | エンジェルウィスパー | 2.5s | **复活**目标（带虚弱），不与其他技能共 CD |
| Exuviation | イグジュビエーション | 2.5s | 治疗 50（**Healer Mimicry 时 300**）+ 驱散 1 个负面 |
| **Basic Instinct** | 闘争本能 | 2.5s | 移速 **+30%**、**治疗与伤害 +100%**，并忽略 Mighty Guard 的伤害惩罚；**仅限单人/无队友在场时生效** |
| **Chelonian Gate** | チェロニアンゲート | 2.5s | 受伤 **−20%**，10s；受伤达最大 HP 30% 后 → **Divine Cataract 500（Tank Mimicry 时 1000）** |
| Matra Magic | マトラマジック | 与 Angel's Snack / Dragon Force 共 CD | 8 段 × **50**（**DPS Mimicry 时每段 100**） |
| Level 5 Death 等即死系 | レベル5デス | 2.5s | 对 Lv.5 倍数目标即死 |
| 其它（节选） | — | — | Song of Torment、Bad Breath、Aqua Breath、Bristle、Off-guard、Peculiar Light、Goblin Punch、Triple Trident、Tatami-gaeshi、Nightbloom、Phantom Flurry、Apokalypsis、Sea Shanty、Being Mortal、Ruby Dynamics、Divination Rune、Dimensional Shift、Force Field、Winged Reprobation、Candy Cane、Mortal Flame 等（Lv.80 上限共 **100+ 个可学法术**） |

**BLU 团辅**：**没有常规队伍增伤技能**。团队向手段为**敌方减益**：`Off-guard`（目标受伤 +5%，15s，60s）与 `Peculiar Light`（敌人魔法受伤 +5%，15s，60s），以及 `Exuviation`（驱散 + 治疗）、`Angel Whisper`（复活）、`White Wind`（群体回血）。

**BLU PvP**：**完全不能参与 PvP（含决斗）** ✅官方限制清单明确列出；仅能**进入** Wolves' Den 场景。

**BLU 专属内容**：见 §9.2（Masked Carnivale **32 阶段**、Blue Mage Log、Weekly Target / Prime Target）。

#### 4.5.6 远程法系 DPS 横向对比

| 维度 | BLM | SMN | RDM | PCT | BLU |
|---|---|---|---|---|---|
| 主要资源 | Astral Fire / Umbral Ice / Astral Soul / Polyglot | Aetherflow / Trance / 元素召唤 | 黑白魔力 0–100 + Mana Stacks | Palette 0–100 + White/Black Paint ≤5 | **无量谱**（法术库） |
| 队伍增伤团辅 | ❌ **无** | ✅ Searing Light **+5% / 20s / 120s** | ✅ Embolden **+5%（自身魔法 +10%）/ 20s / 120s** | ✅ Starry Muse **+5% / 20s / 120s** | ❌ **无**（仅敌方减益 +5%） |
| 队伍减伤 | ❌（仅 Addle 单体减益） | ✅ Lux Solaris 治疗 500 | ✅ **Magick Barrier 魔减 −10% + 治疗 +5% / 10s / 120s** | ✅ Tempera Grassa 团盾 | ❌（Mighty Guard 为自身） |
| 复活 | ❌ | ✅ Resurrection **Lv.12** | ✅ Verraise **Lv.64** | ❌ | ✅ Angel Whisper（但无法进随机/高难） |
| 爆发 CD | 120s（Ley Lines / Manafont / Amplifier） | 120s（Searing Light）/ 60s（Bahamut） | 110s（Manafication）/ 120s（Embolden） | 120s（Starry Muse） | 60s（Off-guard / Peculiar Light） |
| 随机元素 | 少（Firestarter 40%、Thunderhead） | 极少 | 少（Verfire/Verstone） | 无 | **极多**（学习概率、Missile 命中率） |
| 放置化难度（§12） | ★★☆☆☆ 易 | ★★☆☆☆ 易 | ★★☆☆☆ 易 | ★★★☆☆ 中 | ★★★★★ 但可换玩法 |

### 4.6 全远程 DPS 汇总（团辅 / 复活）

| 职业 | 队伍增伤 | 增伤 % | 持续 | CD | 队伍减伤/治疗 | 复活 |
|---|---|---|---|---|---|---|
| BRD | Mage's Ballad / Army's Paeon / Wanderer's Minuet | **+1% / +3% DH / +2% crit** | 45s | 120s | Troubadour −15%/15s；Nature's Minne 治疗 +15%/15s | ❌ |
| BRD | Battle Voice | 直击率 **+20%** | 20s | 120s | — | ❌ |
| BRD | Radiant Finale | **+2/4/6%**（按 Coda） | 20s | **110s** | — | ❌ |
| MCH | ❌ **无** | — | — | — | Tactician −15%/15s；Dismantle 目标输出 −10%/10s | ❌ |
| DNC | Standard Finish | **+2/5%** | **60s** | 30s | Shield Samba −15%/15s；Improvisation 护盾 ≤10%HP/30s；Curing Waltz 治疗 300 | ❌ |
| DNC | Technical Finish | **+1/2/3/5%** | 20s | **120s** | 同上 | ❌ |
| DNC | Devilment | 暴击 + 直击 **+20%**（自身+舞伴） | 20s | 120s | — | ❌ |
| BLM | ❌ **无** | — | — | — | Addle（role）目标魔法输出 −10%/10s ⚠️ | ❌ |
| SMN | Searing Light | **+5%** | 20s | 120s | Lux Solaris 团队治疗 500/60s | ✅ Lv.12 |
| RDM | Embolden | **+5%**（自身魔法 +10%） | 20s | 120s | Magick Barrier 魔减 −10% + 治疗 +5%/10s | ✅ Lv.64 |
| PCT | Starry Muse | **+5%** | 20s | 120s | Tempera Grassa 团盾；Star Prism 附带治疗 400 | ❌ |
| BLU | ❌ **无** | — | — | — | Off-guard 目标受伤 +5%/15s/60s；Peculiar Light 魔法受伤 +5%/15s/60s；White Wind / Exuviation / Angel Whisper | ✅ Angel Whisper |

**要点**：8 个远程 DPS 中，**只有 MCH / BLM / BLU 完全没有队伍增伤**；**只有 SMN / RDM 有可用复活**（BLU 有但被内容限制）；**DNC 的 Standard Finish 是持续时间最长的团辅（60s，CD 仅 30s）**，属「常驻型」；**SMN / RDM / PCT 都是单技能 +5% / 20s / 120s 的标准团辅窗口**。

> **主要来源（本节）**：官方 Job Guide 各职业页 —— [bard](https://na.finalfantasyxiv.com/jobguide/bard/)｜[machinist](https://na.finalfantasyxiv.com/jobguide/machinist/)｜[dancer](https://na.finalfantasyxiv.com/jobguide/dancer/)｜[blackmage](https://na.finalfantasyxiv.com/jobguide/blackmage/)｜[summoner](https://na.finalfantasyxiv.com/jobguide/summoner/)｜[redmage](https://na.finalfantasyxiv.com/jobguide/redmage/)｜[pictomancer](https://na.finalfantasyxiv.com/jobguide/pictomancer/)｜[bluemage](https://na.finalfantasyxiv.com/jobguide/bluemage/)；数值由 XIVAPI 游戏数据表（`Action` / `ActionTransient`）交叉验证。

---

## 5. class → job 体系的历史变化

### 5.1 三代体系的划分（本报告的核心结论）

FFXIV 的「职业获得方式」经历过 **三代**，这个划分对放置游戏的项目结构设计非常关键：

| 世代 | 时期 | 获得方式 | 代表 |
|---|---|---|---|
| **第一代：class + 副职** | 2.0 ～ 3.x | 主 class 30 级 **+ 另一个指定 class 15 级** → 解锁 job | PLD、WAR、WHM、BLM、MNK、DRG、BRD、SMN、SCH、NIN |
| **第二代：class 转职** | 3.0 ～ 5.x | 主 class 30 级 → 解锁 job（**无副职要求**） | 同上（副职要求在 3.0/4.0 被移除） |
| **第三代：无 class 特职** | 3.0 起持续 | **没有对应 class**，达到起始等级即可解锁 | DRK、AST、MCH（30）、SAM、RDM（50）、GNB、DNC（60）、RPR、SGE（70）、VPR、PCT（80）、**BST（1）** |

> ✅ 官方对第三代的直接表述（6.0 补丁说明）：**RPR/SGE "have no corresponding classes and begin at level 70"**。[来源](https://na.finalfantasyxiv.com/lodestone/topics/detail/bdd208b52ddababad086dc9679e96a8412962edf/)
> ✅ 官方 7.5 版 Job Guide 仍在职业名后括注对应 class（例：**ナイト（剣術士）**、**召喚士（巴術士）**），说明 **class 概念在 7.x 依然存在且被官方沿用**。[来源（JP Job Guide）](https://jp.finalfantasyxiv.com/jobguide/battle/)

### 5.2 2.0 时代的「主 class 30 + 副 class 15」对照表

这是 FFXIV 最容易被遗忘、但对「多职业养成」类放置游戏最有参考价值的一张表：

| Job | 主 class（30 级） | 副 class（**15 级**，旧版要求） |
|---|---|---|
| Paladin (PLD) | Gladiator 剣術士 | Conjurer 幻術士 |
| Warrior (WAR) | Marauder 斧術士 | Gladiator 剣術士 |
| White Mage (WHM) | Conjurer 幻術士 | Arcanist 巴術士 |
| Black Mage (BLM) | Thaumaturge 呪術士 | Archer 弓術士 |
| Monk (MNK) | Pugilist 格闘士 | Lancer 槍術士 |
| Dragoon (DRG) | Lancer 槍術士 | Marauder 斧術士 |
| Bard (BRD) | Archer 弓術士 | Pugilist 格闘士 |
| Summoner (SMN) | Arcanist 巴術士 | Thaumaturge 呪術士 |
| Scholar (SCH) | Arcanist 巴術士 | Conjurer 幻術士 |
| Ninja (NIN)（2.4 追加） | Rogue 双剣士 | Pugilist 格闘士 |

> ⚠️ **不确定项（D 级）**：上表的「副 class 15 级」要求在 **3.0 还是 4.0 被移除**，本次调研**未能用官方来源证实**。社区通说是 **4.0 Stormblood** 随「跨职业技能（cross-class skills）」一起被废止。请在引用时标注为待考。
> ✅ 但「主 class 30 级」这一门槛在 7.5 的官方 Job Guide 中**依然有效**（PLD/WAR/WHM/SCH/MNK/DRG/BRD/BLM/SMN 的解锁条件仍是 class 30）。

### 5.3 各资料片的职业体系变化时间线

| 版本 | 日期 | 职业体系变化 | 来源等级 |
|---|---|---|---|
| 1.0 | 2010-09-30 | 只有 class（Armoury System），**没有 job** | 🟡 |
| 2.0 | 2013-08-27 | 引入 **job** 概念；9 个 class + 9 个 job；job 需主 class 30 + 副 class 15；引入 **cross-class skills（跨职业技能）** | 🟡 |
| 2.4 | 2014-10-28 | 追加 **Rogue（双剣士）** class 与 **Ninja** job | ✅ |
| 3.0 | 2015-06-23 | 追加 **DRK / AST / MCH**——**首批「无 class 特职」**，起始等级 30 | ✅ |
| 4.0 | 2017-06-20 | **废除 cross-class skills，改为「职能技能（Role Actions）」**；追加 **SAM / RDM**（无 class，起始 50）；community 通说同时废除副 class 15 级要求 | 🟡 |
| 5.0 | 2019-07-02 | 追加 **GNB / DNC**（无 class，起始 60）；坦克姿态与仇恨连重构（Tank Stance 统一、仇恨连废止） | 🟡 |
| 6.0 | 2021-12-07 | 追加 **RPR / SGE**（无 class，起始 70）；**引入「职能任务（Role Quests）」**，**取代 80-90 段的 job quest**；class 概念**未被删除** | ✅ |
| 7.0 | 2024-07-02 | 追加 **VPR / PCT**（无 class，起始 80）；上限 100 | ✅ |
| 7.5 | 2026-04-28 | 任务承接条件文本由 "Any Disciple of War or Magic" 改为 **"Any Disciple of War or Magic (excluding limited jobs)"** | ✅ |
| 7.56 | 2026-09-08 | 追加 **BST**（无 class，起始 1，上限 50）——**首个「有独立成长上限」的特职** | ✅ |
| 8.0 | 2027-01 | **Armoury Update**（官方 Evercold 特设站列出）；**Reborn / Evolved 双模式**；新职业 **仅 Evolved Mode 可用** | ✅ |

### 5.4 「6.0 之后 class 概念的处理」——精确结论

这是一个经常被误传的问题，本报告给出精确答案：

| 命题 | 判定 | 依据 |
|---|---|---|
| 6.0 删除了 class 系统 | ❌ **错** | 7.5 官方 Job Guide 仍以「ナイト（剣術士）」形式标注 class；且 class 等级与 job 等级是同一套数值（GLA 等级 = PLD 等级） |
| 6.0 删除了旧 job quest | ❌ **错** | 7.5 版 Paladin 的 Job Guide 中，Lv30 Spirits Within、Lv35 Sheltron、Lv40 Prominence、Lv45 Cover、Lv50 Hallowed Ground、Lv54 Goring Blade、Lv56 Divine Veil、Lv58 Clemency、Lv60 Royal Authority、Lv70 Passage of Arms 的解锁来源仍标注为 **"Job Quest"**。[来源](https://na.finalfantasyxiv.com/jobguide/paladin/) |
| 6.0 用 role quest 取代了 **80-90 段**的 job quest | ✅ **对** | 6.0 官方补丁说明新增 "Role quests"，且把物理 DPS 线拆成 melee DPS 与 physical ranged DPS 两条 |
| Limited Job 从任务侧被隔离 | ✅ **对** | 7.5 起任务条件显式排除 limited jobs；7.56 官方限定 limited job 只能接「自身 job quest + 全职业通用任务」 |
| class quest 1-30 依然存在 | ✅（🟡 细节待考） | 每个 class 的 1-30 剧情任务仍在游戏中 |

> 📌 **给放置游戏的设计启示**：FFXIV 的「class → job」其实是一个 **一次性、不可逆的升级关系**（job 完全继承 class 等级），而不是「两条独立成长线」。真正有独立成长线的是 **Limited Job（青魔 80／驯兽 50）**。这一点在设计「多角色养成」时必须想清楚：**要么做「一个角色练所有 job」，要么做「Limited Job 式的独立角色」**。

---

## 6. 职业任务（Job Quest）与职能任务（Role Quest）体系

### 6.1 三层任务结构

| 层级 | 名称 | 覆盖等级 | 说明 |
|---|---|---|---|
| 第 1 层 | **Class Quest** | 1–30 | 每个基础职业一条（9 条）；等级节点通常为 **1 / 5 / 10 / 15 / 20 / 25 / 30**（共 7 个）⚠️ |
| 第 2 层 | **Job Quest** | 30–70 | 每个特职一条；**每个资料片段落约 5–6 个任务** ⚠️ |
| 第 3 层 | **Role Quest** | 80–90（6.0 起） | **按职能分线**，取代 80-90 的 job quest |

> ⚠️ **不确定项（D 级）**：Class quest 与 Job quest 的**逐级节点与任务总数**在本次调研环境中无法用一手官方来源逐条证实（consolegameswiki 403、官方 Job Quest 列表需逐页翻 Eorzea Database）。上表按社区通说给出，**引用时请标注为待考**。
> 可确证的部分：
> - ✅ ARR 段 job quest 节点为 **30 / 35 / 40 / 45 / 50**（5 个），由 7.5 官方 Paladin Job Guide 的技能解锁等级反推（Spirits Within 30、Sheltron 35、Prominence 40、Cover 45、Hallowed Ground 50、Goring Blade 54、Divine Veil 56、Clemency 58、Royal Authority 60、Passage of Arms 70 均由 job quest 解锁）。
> - ✅ 官方 7.5 Job Guide 明确显示 **30–70 的 job quest 仍然存在**。

### 6.2 6.0 Endwalker：五条职能任务线（✅ 官方）

官方 6.0 补丁说明原文：

> *"Role quests have been added. The physical DPS role quests added in Patch 6.0 have been divided into two categories: **melee DPS** and **physical ranged DPS**."*

| 职能线 | 覆盖职业 | 起始任务 | 接取位置 / NPC |
|---|---|---|---|
| Tank（防护） | PLD / WAR / DRK / GNB | **Shrouded in Peril** | 拉札罕 (X:7.6, Y:9.7)，森都代表 |
| Melee DPS（近战物理） | MNK / DRG / NIN / SAM / RPR | **Storm Clouds Brewing** | (X:7.7, Y:9.6)，海都代表 |
| Physical Ranged DPS（远程物理） | BRD / MCH / DNC | **Seeds of Disquiet** | (X:7.6, Y:9.4)，东方代表 |
| Magical Ranged DPS（远程魔法） | BLM / SMN / RDM | **Our Aching Souls** | (X:7.8, Y:9.4)，伊修加德代表 |
| Healer（治疗） | WHM / SCH / AST / SGE | **Far from Free** | (X:7.5, Y:9.6)，阿拉米格代表 |

> 官方并注明：**完成全部主线 + 全部五条 role quest 后解锁的追加任务，将在未来补丁加入**。
> 来源：[官方 6.0 补丁说明](https://na.finalfantasyxiv.com/lodestone/topics/detail/bdd208b52ddababad086dc9679e96a8412962edf/)

> ⚠️ **不确定项**：**7.0 Dawntrail 的 role quest 线数与名称**本次调研未能用官方一手来源证实。社区来源提到 Dawntrail 再次加入了 role quest 以及一条 **"Master Role Quest"（大师职能任务）** 收尾线，但该信息来自二手媒体（Dexerto / Escapist，本环境 403），**按 D 级对待**。

### 6.3 7.56 设限特职「驯兽师」的任务线（✅ 官方）

官方 7.56 补丁说明逐条列出的 Beastmaster 任务节点：

| 序号 | 等级门槛 | 备注 |
|---|---|---|
| 0 | Disciple of War or Magic **Lv50** | 解锁任务 **Strangers in the Wood**，新格里达尼亚 (X:11.8, Y:13.6)，NPC「Excited Adventurer」，需先完成主线 **The Ultimate Weapon** |
| 1 | Beastmaster **Lv1** | 需完成前置任务并**与某只野兽缔结契约** |
| 2 | Beastmaster **Lv8** | — |
| 3 | Beastmaster **Lv18** | — |
| 4 | Beastmaster **Lv30** | — |
| 5 | Beastmaster **Lv30** | 需**通关 Crucible of the Unbroken 的某一棋盘** |
| 6 | Beastmaster **Lv40** | — |
| 7 | Beastmaster **Lv40** | 需通关某一棋盘 |
| 8 | Beastmaster **Lv50** | — |
| 9 | Beastmaster **Lv50** | 需通关某一棋盘 |

→ **共约 10 个任务节点**，且 **30 / 40 / 50 级各有第二段需要打 Crucible**，把「单人 Roguelike 玩法」直接嵌入成长线。

> 来源：[官方 7.56 补丁说明 · New job quests have been added](https://na.finalfantasyxiv.com/lodestone/topics/detail/a8a526ad64db45c8ca8d1c7fdcce8a5eedaa18bc)
> 同页还确认：**New Game+ 追加 "Beastmaster (Limited Job) - Beastmaster Quests" 章节**（归在 "DPS Quests" 分类下），以及主线 "Dawntrail - Part 4 / Winter's Prelude"。

### 6.4 任务体系对放置游戏的启示

| FFXIV 做法 | 放置化可行性 | 建议 |
|---|---|---|
| Class quest 7 个节点做「渐进解锁」 | ★★★★★ 极易 | 直接做成「等级里程碑解锁被动/技能」 |
| Job quest 每段 5-6 个 | ★★★★★ | 做成「章节解锁」，任务是叙事 + 解锁技能 |
| Role quest 5 线（按职能而非按职业） | ★★★★☆ | **这条最值得抄**：用 5 条线覆盖 21 个职业，叙事成本低 |
| BST 任务要求「通关棋盘 X」 | ★★☆☆☆ | 需要先做出可玩的 Roguelike 支线才成立 |
| 任务条件排除 limited job | ★★★★★ | 一个简单的 tag 系统即可 |

---

## 7. 职能技能（Role Actions）

<!-- PLACEHOLDER-ROLE-ACTIONS -->

---

## 8. 极限技（Limit Break）

### 8.1 官方机制说明（✅ 官方，来自 Lodestone UI Guide）

| 项目 | 官方原文要点 |
|---|---|
| 解锁条件 | **队伍 4 人以上**才会出现 Limit Gauge（显示在队伍列表正上方） |
| 归属 | 量表**由全队共享**，战斗中缓慢积累 |
| 量表长度 | **随队伍人数与敌人类型变化**（`\* Limit gauge length varies depending on party size and enemy type.`） |
| 加速条件 | 做出「英雄行为」会加快积累，官方举例：**在队友濒死时救起**、**阻止敌人释放特殊攻击** |
| 注册位置 | 主菜单 → Character → Actions & Traits → **General 标签页** → 拖到热键栏 |
| 5 种类型 | 单体攻击（近战）／直线攻击（远程）／范围攻击（法系）／提升全队防御（坦克）／HP 恢复（治疗） |

各职能 LB 的作用范围（✅ 官方数值）：

| 职能 | 官方描述 | 范围 |
|---|---|---|
| **Tank** | 提升全队防御 | **AoE 50y** |
| **Melee DPS** | 单体攻击 | 单体 |
| **Ranged DPS（远程物理）** | 直线穿透攻击 | **射程 30y** |
| **Caster（远程法系）** | 范围攻击 | **8y / 10y / 15y**（对应 LB1 / LB2 / LB3） |
| **Healer** | HP 恢复；**LB3 追加复活** | **AoE 50y**；官方注：若目标在复活时不处于虚弱状态，则复活后也不虚弱；若处于虚弱，则虚弱计数重置 |

> 来源（✅ 官方）：[Limit Breaks · UI Guide](https://na.finalfantasyxiv.com/uiguide/battle/battle-lb/uiguide_lb_about.html)、[Executing Limit Breaks · UI Guide](https://na.finalfantasyxiv.com/uiguide/battle/battle-lb/uiguide_lb_how.html)

### 8.2 LB1 / LB2 / LB3 的职能差异与名称

| 职能 | LB1（1 格） | LB2（2 格） | LB3（3 格） |
|---|---|---|---|
| **Tank** | Shield Wall（一定时间减伤，官方旧表：**10% / 10 秒**） | Mighty Guard（**20% / 15 秒**） | **Last Bastion**（**50% / 12 秒**） |
| **Healer** | Healing Wind（回复最大 HP 的 **25%**） | Breath of the Earth（**60%**） | **Pulse of Life**（**HP 全满 + 全体复活**） |
| **Melee DPS** | Braver | Bladedance | **Final Heaven** |
| **Ranged DPS（远程物理）** | **Big Shot** | **Desperado** | **按职业不同**：<br>Bard → **Sagittarius Arrow**<br>Machinist → **Satellite Beam**<br>Dancer → 🟠 未证实（社区通说 Desperado 系延伸） |
| **Caster（远程法系）** | Skyshard | Starstorm（日文 プチメテオ） | **Meteor** |

**各特职专属 LB3 完整名单**（✅ 官方博客，2015-06-19 随 3.0 公布）：

| 特职 | LB3 名称 |
|---|---|
| Paladin | **Last Bastion** |
| Warrior | **Land Waker** |
| Dark Knight | **Dark Force** |
| Gunbreaker | 🟠 未证实（Gunbreaker 为 5.0 追加，不在 2015 年名单内） |
| White Mage | **Pulse of Life** |
| Scholar | **Angel Feathers** |
| Astrologian | **Astral Stasis** |
| Sage | 🟠 未证实（6.0 追加） |
| Monk | **Final Heaven** |
| Dragoon | **Dragonsong Dive** |
| Ninja | **Chimatsuri**（日文 血祭り） |
| Samurai / Reaper / Viper | 🟠 未证实（4.0 后追加，不在 2015 年名单内） |
| Bard | **Sagittarius Arrow** |
| Machinist | **Satellite Beam** |
| Dancer / Beastmaster | 🟠 未证实／不适用 |
| Black Mage | **Meteor** |
| Summoner | **Teraflare** |
| Red Mage / Pictomancer / Blue Mage | 🟠 未证实（4.0 后追加） |

> 来源（✅ 官方）：[Official Blog "Take it to the Limit"（2015-06-19）](https://na.finalfantasyxiv.com/blog/001083.html)
> 🟡 LB1 / LB2 的**名称与数值**来自 2015 年的日文 Lodestone 玩家日记整理（[来源](https://jp.finalfantasyxiv.com/lodestone/character/3877696/blog/677243)），**属于 D 级、可能过期**：该文仍把 BRD 归入治疗型 LB（这是 **2.0 旧设定，3.0 已改**），说明其内容为多来源拼接。**请把 LB1/LB2 的名称与百分比当作「参考值」而非官方数值。**

### 8.3 历史变化

| 版本 | 变化 |
|---|---|
| 2.0 | LB 只有 4 个职能变体；**Bard 使用治疗型 LB（Pulse of Life）**（🔵 由上述 2015 年日记的同页评论与 3.0 官方博客的「new bard Limit Breaks」表述反推） |
| 3.0（2015-06-23） | BRD/MCH 获得专属 LB1 **Big Shot**、LB2 **Desperado**；各特职获得**专属 LB3** |
| 2.1（2013） | **同职业重复会降低 LB 充能速度**（🔵 D 级，来源同上，未获官方证实） |
| 6.x/7.x | 官方 UI Guide 的职能描述与 2015 年一致（5 类），**未发现职能级 LB 机制变更** |

> ⚠️ **不确定项**：本次调研**未能**取得 7.5 时点 LB1/LB2 的**精确减伤百分比 / 治疗百分比**与**全部 23 个特职的 LB3 名单**。官方 UI Guide 只给了作用类型与范围，未给逐级数值。建议开发时以「5 职能 × 3 级」为骨架，名称采用上表并标注待核。

### 8.4 放置化提示

LB 是**全队共享资源 + 长冷却爆发**，非常适合放置游戏的「**团队能量条**」设计：5 个职能各给一种效果（减伤 / 治疗+复活 / 单体大伤 / 直线伤害 / 范围伤害），能量按队伍人数与战斗时长积累、按「英雄行为」加速——**这套规则可以 1:1 数值化**，且天然鼓励玩家练多个职能。

---

## 9. 受限职业（Limited Job / 设限特职）

### 9.1 定义

「受限职业」是**有意排除在主流团队玩法之外**的特职。截至 7.56，全游戏只有 **2 个**：**青魔道士（Blue Mage）** 与 **驯兽师（Beastmaster）**。

> ✅ 官方 7.56 补丁说明原文：*"Like blue mage, beastmaster is a limited job."*
> ✅ 官方 Evercold 特设站：*"The Reborn and Evolved Modes are **not applicable to limited jobs**."* → 说明受限职业在 8.0 的新战斗系统中被继续隔离。

### 9.2 两个受限职业对比（✅ 全部官方）

| 项目 | **Blue Mage 青魔道士** | **Beastmaster 驯兽师** |
|---|---|---|
| 日文名 | 青魔道士 | **魔獣使い** |
| 简中名 | 青魔法师 | **驯兽师** |
| 缩写 | **BLU** | **BST** |
| 职能 | 远程法系 DPS | **近战 DPS** |
| 武器 | 幻杖（Cane） | **单手斧 + 盾**（🟡 由官方道具表推导） |
| 登场 | Patch **4.5** | Patch **7.56**（2026-09-08） |
| 对应 class | **无** | **无** |
| 起始等级 | **1** | **1** |
| **等级上限** | **80** | **50** |
| 解锁任务 | **Out of the Blue**｜海都下层甲板 (X:9.9, Y:11.0)，NPC「Zealous Yellowjacket」｜需 Lv50 战斗/魔法 + 主线 **The Ultimate Weapon** | **Strangers in the Wood**｜新格里达尼亚 (X:11.8, Y:13.6)，NPC「Excited Adventurer」｜需 Lv50 战斗/魔法 + 主线 **The Ultimate Weapon** |
| 经验加成 | **野外杀敌经验加成**（FATE / 公会任务**不**加成） | **FATE 经验加成**（野外杀敌**不**加成） |
| 可使用职能技能？ | ❌（受限职业统一不使用 role actions） | ❌（官方明文：Beastmasters cannot execute role actions） |
| 雇员（Retainer） | ❌ 不能指派 | ❌ 不能指派 |
| 可用任务 | 仅自身 job quest + 全职业通用任务 | 仅自身 job quest + 全职业通用任务 |
| 专属玩法 | **Masked Carnivale（假面狂欢）**：**32 个舞台**；每周目标分 novice / moderate / advanced；**Blue Mage Log**（Lv60 解锁，可组青魔队打指定副本，含每周目标与 Prime Target） | **Crucible of the Unbroken（闘獣練 / 闘兽练）**：单人棋盘式 Roguelike；Beast rank 上限 **25**；有排行榜（Season One：2026-09-24 起，至 7.58）；Crucible Mode 分 **1~3 度**难度 |
| 独有系统 | **学习敌人技能**（Learn）：目睹敌人使用→击败→概率习得；等级不影响学习；**最多 24 个 active actions**；**最多 5 组 active set**；Whalaqee Totems 换取部分魔法 | **缔结契约（Gauge / Capture）**、**Master's Bestiary**、**Battlehorn 召唤**（同时只能 1 只）、**Inner Compass** 本能连携（Volant / Rampant / Durant / Eldritch 四属性）、**Intentional Combo**（Moonstalker / Sunstrider）、**TP** 资源（≥100 可用本能技）、Tempered Release / Borrow |
| PvP | ❌ 不能 PvP，包括决斗（**例外**：青魔可进入狼狱停船场 Wolves' Den） | ❌ 不能 PvP，包括决斗 |

**两者共同被禁止的内容**（✅ 官方列表）：

- Duty Roulettes（随机任务）
- The Forbidden Land, Eureka / The Bozjan Southern Front / **The Occult Crescent** / Variant & Criterion Dungeons / Ultimate Raids
  （官方注：**进入实例后无法切换为受限职业**）
- Squadron Missions（中队任务）
- Deep Dungeons（死者宫殿 / 天动之城 / 欧尔特·欧雷卡 / 朝圣者之径）
- PvP（含决斗）
- Stone, Sky, Sea（木人讨伐）
- Hall of the Novice（初学者大堂）

**允许的**：在**预先组队（preformed party）或解除限制（unrestricted party）**的情况下，与其它玩家一起进入部分副本。

> 来源（✅ 官方）：[Blue Mage Job Guide](https://na.finalfantasyxiv.com/jobguide/bluemage/)｜[Beastmaster Job Guide](https://na.finalfantasyxiv.com/jobguide/beastmaster/)｜[7.56 补丁说明](https://na.finalfantasyxiv.com/lodestone/topics/detail/a8a526ad64db45c8ca8d1c7fdcce8a5eedaa18bc)｜[Evercold 特设站](https://eu.finalfantasyxiv.com/evercold/)

### 9.3 是否还有其它类似职业？

| 候选 | 是否受限 | 说明 |
|---|---|---|
| Blue Mage | ✅ 受限 | 4.5 起 |
| Beastmaster | ✅ 受限 | 7.56 起 |
| **Bastion**（8.0） | ❌ 不是受限 | 官方只写 **"Mode: Evolved Only"**——限制的是**战斗模式**，不是「受限职业」。它是一个**正常的主坦克**，只是不能用 Reborn Mode 玩 |
| 其他常规特职 | ❌ | 无 |

> 📌 **重要区分**：**"Evolved Only"（仅进化模式）≠ "Limited Job"（受限职业）**。
> 中文二手源把 Bastion 说成「仅某模式可体验」，这是**对 "Evolved Only" 的正确翻译但错误归类**——Bastion 不被排除在随机副本、PvP、究极等玩法之外。请以官方英文原文为准。
> 同时，官方明确：**Reborn / Evolved 两个模式都不适用于受限职业**（青魔与驯兽师在 8.0 仍是独立体系）。

### 9.4 受限职业对放置游戏的价值（本报告结论）

**受限职业几乎是「为放置游戏量身定做」的设计范式**：

1. **独立等级上限**（80 / 50）→ 与主线解耦的独立进度条。
2. **独立资源与独立成长线**（学习技能 / 兽 rank / 棋盘进度）→ 天然的「收集 + 养成」玩法。
3. **独立结算内容**（Masked Carnivale 32 关 / Crucible 棋盘 + 排行榜）→ 天然的「每日/每周任务 + 排行榜」。
4. **被主流内容排除** → 不需要实现团本、PvP、匹配系统就能成立。

若本项目要做「支线职业」，**直接复刻 Limited Job 的结构是最省成本、最原汁原味的方案**。

---

## 10. 历代职业重做与大改

<!-- PLACEHOLDER-REWORKS -->

---

## 11. 8.0 Evercold 的战斗系统改革（Reborn / Evolved）

这一节虽然是「未来内容」，但它**直接决定了职业系统的长期形态**，且对放置游戏的设计有直接参考价值，因此单列。

### 11.1 Evercold 已公布的核心信息（✅ 官方 Evercold 特设站 + SE 新闻稿）

| 项目 | 内容 |
|---|---|
| 资料片 | **FINAL FANTASY XIV: Evercold**（第 6 个资料片） |
| 上线 | **2027 年 1 月** |
| 日文标题 | **白銀のワンダラー** |
| 简中标题 | **白银的探求者**（🟡 来自 Famitsu 中文报道标题；官方简中站尚未见 Evercold 页） |
| 平台 | PS5 / PS4 / Xbox Series X\|S / Nintendo Switch 2 / Windows / Mac / Steam |
| **等级上限** | **100 → 110** |
| 新职业 1 | **Bastion（坦克）**：Role = **Main Tank**，Mode = **Evolved Only**，Weapon = **Skyltborg**（双持大盾） |
| 新职业 2 | **远程物理 DPS**（名称未公布） |
| 新战斗系统 | **Reborn Mode**（沿用现行战斗系统）／**Evolved Mode**（突出每个职业的独特身份） |
| 新主线结构 | 主线推进顺序**可由玩家自选** |
| Auto Content Balancing | 副本/野外按玩家等级自动平衡，支持跨等级匹配 |
| Seasons | 全新的奖励与装备等级（item level）获取框架 |
| Armoury Update | 「更好地支持多职业游玩」 |
| 新内容 | EVANGELION - Ghosts of Desire（24 人本）、Beyond the Lifestream（FFVII 联动 8 人本，新难度档介于 Normal 与 Savage 之间）、新究极本、新主城 Fargarth、新区域 Naglfar / Hringhorni、第四镜像 |
| 陆行鸟同伴大改 | Patch **8.1** 起：育成系统重做 + **可在副本中召唤陆行鸟** |
| 不买资料片也能享受的更新 | 整体游戏设计变更、**新战斗系统**、PvP 更新、Duty Support 更新 |
| 关键限制 | **Reborn / Evolved 均不适用于受限职业**；**Evercold 新职业只能用 Evolved Mode 游玩** |

> 来源（✅ 官方）：[Evercold 特设站](https://eu.finalfantasyxiv.com/evercold/)｜[SE 新闻稿（Fan Festival 2026 in Berlin, 2026-07-25）](https://press.es.square-enix.com/es/BASTION-REVEALED-AS-FIRST-NEW-JOB-FOR-FINAL-FANTASY-XIV-EVERCOLD)｜[官方 Job Guide 战斗篇 7.5 调整说明末段](https://na.finalfantasyxiv.com/jobguide/battle/)

### 11.2 Evolved Mode 的开发面板细节（🔵 C 级：Famitsu 现场报道 + 开发面板）

以下内容来自 **2026-04-24 北美 Fan Festival 2026「开发面板」**（Battle System Designer **玉置輝** 登台演示），由 Famitsu 现场报道整理。**属于开发中内容，官方明确标注 "All content and systems introduced on this site are subject to change prior to release."**

| 主题 | 内容 |
|---|---|
| 设计理念 | 「今后也想让更多人、更长久地享受 FFXIV 的战斗」 |
| **Evolved Mode 三大特征** | ① 更强烈地感受到**职业个性**；② 与 Reborn Mode **完全不同的循环**；③ **热键栏技能数更少，机制更易懂** |
| 难度定位 | 吉田明言 **「不是为了让现有模式变简单而做的」**；Evolved Mode 整体调成**「稍微更强一点」** |
| **按钮数目标** | 所有职业的 **job actions + role actions 合计控制在 16 个按钮前后**，以便手柄操作 |
| 减按钮手段 | **基础连击合并为 1 个按钮**（按钮随连击进度变化）。例：骑士 Fast Blade → Riot Blade → Royal Authority 由 3 个按钮变为 1 个 |
| 补偿手段 | 减少按钮后，**缩短单个技能复唱时间 / 加大效果量** |
| 案例：骑士 | **Bulwark（ブルワーク）在 Evolved Mode 中被删除**，改由强化其它防御技能补偿 |
| **上下文相关技能** | 新机制：同一个按钮按「对敌人 / 对队友」切换效果。例：骑士 **Divine Justice** → 对敌 = 攻击魔法 **Holy Spirit**，对队友 = 回复魔法 **Clemency**；**Cover（かばう）**、**Shield Bash** 也改为这种形式（「かばう」改为**移动到目标队友身边**） |
| 案例：骑士新个性 | 用 **Holy Sheltron** 成功格挡后可使用反击技 **Answerer（アンサラー）**；若在 Holy Sheltron 刚发动后的高效果窗口内格挡成功，则升级为 **Retaliator（リタリエイター）** |
| 案例：龙骑士 | **机制完全翻新**。Job HUD 导入 **「ドラグーンシンボル」**——**随战斗时间自动累积**的层数；消耗层数可用带方向指定的强力武器技：**Sinister Drive**（左侧面）／**Dexter Drive**（右侧面），其后接 **桜華絢爛**（背面）；**Vengeful Jump（ベンジフルジャンプ）** 赋予「下一个武器技无视方向指定」；**竜血** 由 Vengeful Jump 叠层，**3 层 → Star Diver（スターダイバー）** 进入「红之竜血」状态并解锁专属强力连击；Star Diver 后可用一次 **Sky High（スカイハイ）**——腾空期间**减伤 90%**（官方明言不能完全无敌，否则副本机制会崩） |
| 案例：白魔道士 | Job HUD 导入 **「サンクチュアリシンボル」**——用 **GCD 回复魔法**给队友治疗时累积层数，**Holy Sanctuary（ホーリーサンクチュアリ）** 消耗层数追加伤害。**设计目的：降低 GCD 治疗造成的 DPS 损失**（「治疗的主职是保护队友，因此提高 GCD 治疗的重要性」）。**基本攻击魔法变为无咏唱**，且 1 段/2 段交替不同魔法（同一按钮切换）；**Divine Benison + Aquaveil 合并**为充能技能；**Temperance 期间自身移动速度上升** |
| 案例：吟游诗人 | Job HUD 导入 **「ミンストレルシンボル」**——消耗后可从三首歌中**任选顺序**施放：**Mage's Ballad（贤人的叙事诗）→ 恢复（Regen）**、**Army's Paeon（军神之帕伊昂）→ 移动速度上升**、**Wanderer's Minuet（旅神之小步舞曲）→ 护盾**。唱歌后诗人自身获得强力武器技（叙事诗 = DoT 玩法、帕伊昂 = 快速多段、小步舞曲 = 专属连击收尾大伤）。新技 **Wanderer's Barrage（ワンダラーズバラージ）**——**朝移动输入方向**移动并攻击 |
| **★ 团辅（シナジーアクション）将被删除** | **Reborn 与 Evolved 两个模式都会删除或改写「提升队友攻击力」的团辅技能**。官方给出的理由：① 团辅把部分职业**绑死在 120 秒周期**上，损害自由度；② **错过周期损失过大**；③ 连**职业与 BOSS 机制设计**都被 120 秒周期绑住。吉田：「这个决定我烦恼了很久……是为了提高大家与我们的自由度，做出更有趣的东西。」**部分职业若把「提升队友攻击」视为自身个性，则保留一个技能，但会设计成不受循环束缚** |
| Evolved Mode 的技能学习重设计 | **50 级前学完所有需要放上热键栏的技能**（解决等级同步时过于单调的问题，也照顾新玩家）；**50 级后不再增加热键栏技能数**，改为**给既有技能追加效果**或**追加派生技能** |
| **Evolved Mode 的坦克分工** | 引入 **Main Tank (MT) / Sub Tank (ST)** 的二分，类比「纯治疗 vs 护盾治疗」：<br>**MT** = 尤其擅长**自身减伤**、可**使用反击技**；<br>**ST** = 擅长**为队友减伤**、拥有**降低敌人输出**的手段。<br>具体划分：**骑士 + 新坦克 Bastion = MT；战士、暗黑骑士、绝枪战士 = ST** |
| 职能技能（Role Actions）调整 | 保留攻略必需者，其余合并或删除。**坦克侧案例**：**Provoke（挑発）+ Shirk（シャーク）合并为「Hate Management」**——对敌使用 = Provoke，对队友使用 = Shirk，**充能 2 次**（为了能连续使用）；**Interject 将吸收 Low Blow 的眩晕效果** |
| 方向指定 | Evercold 起考虑为**方向指定成功时追加新的视觉表现** |

> 来源（🔵 C 级）：[Famitsu「『FF14』リボーンモードとエヴォルヴモードの違いを実機プレイで紹介。シナジーアクションは削除へ。開発パネルまとめ」（2026-04-25）](https://www.famitsu.com/article/202604/73115)｜[エオルゼア攻略ガイド 同话题整理](https://www.eorzea-guide.com/entry/2026/04/25/231906)｜[Famitsu 吉田采访（Evolved Mode 企划始于 Dawntrail 之后）](https://www.famitsu.com/article/202604/73175)
> ⚠️ Famitsu 原文自注：*「記事内のアクション名は、開発パネル中に聞き取れた名称をそのまま記載。正しい名称ではない可能性もある点に留意してほしい。」*（**技能名是现场听记，可能不准确**）——引用时请标注。

### 11.3 「2 分钟团辅元」（2-minute meta）的终结

社区媒体普遍把这次的「删除团辅」描述为 **"the end of the two-minute meta"**（2 分钟元终结），理由是现行 FFXIV 高难战斗的核心节奏就是**每 120 秒对齐所有团辅打一次爆发**。这条报道与 Famitsu 记录的官方开发面板说明一致，可以视为**同一事实的两种表述**。

> 参考（🟠 D 级，本环境多数 403）：[GamesRadar via Yahoo：「Evercold promises to scrap the MMO's 2-minute meta」](https://tech.yahoo.com/gaming/articles/final-fantasy-14-evercold-promises-102858578.html)（本环境 403，仅标题可引用）｜[Elyxir：「FFXIV Evercold and the End of the Two-Minute Meta」](https://www.elyxir.gg/news/final-fantasy-xiv/ffxiv-evercold-and-the-end-of-the-two-minute-meta)（正文截断）

### 11.4 对放置游戏的意义

| Evercold 变化 | 对放置游戏的价值 |
|---|---|
| **删除团辅 / 打破 120 秒周期** | 🟢 **极大简化**：放置游戏最难还原的就是「多人团辅对齐」。官方自己在删，说明这套机制连原作都嫌重 |
| **Evolved Mode：50 级前学完全部技能** | 🟢 直接给出了一条「**前期密集解锁、后期做深度**」的曲线模板 |
| **按钮数 ≤ 16** | 🟢 给了一个明确的「技能栏容量」上限 |
| **上下文相关技能（一键双效）** | 🟢 放置游戏可用「同一按钮在不同目标下产生不同效果」来降低 UI 复杂度 |
| **MT / ST 坦克分工** | 🟢 坦克从「4 个同质职业」变成「2 个定位」，放置游戏只需做 2 套坦克模型 |
| **Reborn / Evolved 双模式** | 🟡 双模式意味着**双倍数值与平衡工作量**，放置游戏应只选一个 |
| **受限职业不适用双模式** | 🟢 再证受限职业是「独立闭环」，适合做成独立玩法模块 |

---

## 12. 面向「放置游戏」的可用性分析

### 12.1 评估框架

放置游戏要还原一个职业，本质要回答 4 个问题：

| 维度 | 问题 | 高可还原的信号 |
|---|---|---|
| **D1 资源可数化** | 职业量谱能不能表示成一个整数/浮点变量？ | 单一资源池、线性累积、固定阈值 |
| **D2 循环可确定性化** | 循环有没有「唯一最优解」？还是依赖随机/位置？ | GCD 固定、连击固定、无随机触发 |
| **D3 团辅可对齐化** | 团辅需不需要与队友对时间轴？ | 固定 CD、固定持续 |
| **D4 空间/实时性依赖** | 是否依赖方向指定、位移、即时反应？ | 无方向指定、无位移需求 |

### 12.2 全职业机制「放置化难度」总评

> 评分：★ = 极易数值化，★★★★★ = 极难还原。**本表为作者的工程评估（E 级，非官方）**，用于排优先级；具体机制细节见 §4。

| 职业 | 核心量谱/资源 | D1 可数化 | D2 可确定化 | D3 团辅对齐 | D4 空间依赖 | **总难度** | 建议 |
|---|---|---|---|---|---|---|---|
| **BLM 黑魔法师** | Elemental Gauge（Astral Fire / Umbral Ice 层数、Astral Soul、Paradox、Polyglot） | ★★★★★ 纯状态机 | ★★★★★ 循环固定但长 | ★★★★★ 无团辅 | ★★☆ 有咏唱但可抽象 | **★★☆☆☆（易）** | ✅ **首选**。三状态机 + 固定循环，最适合做「状态切换型」放置核心 |
| **WAR 战士** | Beast Gauge（0-100） | ★★★★★ | ★★★★★ | ★★★★★ 无团辅 | ★ 无 | **★☆☆☆☆（极难？不，极易）** | ✅ **首选坦克**。单资源 + 固定爆发（Inner Release），放置化成本最低 |
| **WHM 白魔法师** | Lily / Blood Lily（百合） | ★★★★★ | ★★★★★ | ★★★★★ 无团辅 | ★ | **★☆☆☆☆（易）** | ✅ **首选治疗**。百合是「自动累积的层数」，天然放置 |
| **MCH 机工士** | Heat（0-100）/ Battery（0-100）/ Charge | ★★★★★ | ★★★★☆ | ★★★★★ 无团辅 | ★ | **★☆☆☆☆（易）** | ✅ 两个整数池 + Wildfire 爆发，极易建模 |
| **RPR 死神** | Soul / Shroud（0-100 各） | ★★★★★ | ★★★★☆ | ★★★☆☆ Arcane Circle 团辅 | ★ | **★★☆☆☆（易）** | ✅ 双资源 + Enshroud 爆发窗口 |
| **SAM 武士** | Kenki / Sen（3 种） / Meditation（3 层） | ★★★★☆ Sen 是组合状态 | ★★★☆☆ 有多个流派 | ★★★☆☆ 团辅依赖队友 | ★ | **★★☆☆☆（易）** | ✅ 但 Sen 组合要有集合枚举 |
| **DRK 暗黑骑士** | Blood Gauge / MP / Darkside | ★★★★☆ | ★★★★☆ | ★★★☆☆ | ★ | **★★☆☆☆（易）** | ✅ |
| **GNB 绝枪战士** | Cartridge（弹匣，6 上限）+ 连击链 | ★★★★★ | ★★★☆☆ **连击链长、爆发窗口紧** | ★★★☆☆ | ★ | **★★★☆☆（中）** | 🟡 弹匣溢出/爆发内多技压缩需要精细建模 |
| **PLD 骑士** | Oath Gauge / Atonement 层数 / Requiescat 层数 | ★★★★☆ | ★★★☆☆ 多段不同循环 | ★★★★☆ Magic Phase 团辅弱 | ★ | **★★★☆☆（中）** | 🟡 物理/魔法双相切换是特色也是成本 |
| **MNK 武僧** | Chakra（5 层）/ Beast Chakra（3 色）/ 身形（3 种） | ★★★☆☆ **三种身形 + 三种兽脉** | ★★☆☆☆ **站位身形循环复杂** | ★★★☆☆ | ★★☆ | **★★★☆☆（中）** | 🟡 Masterful Blitz 的兽脉组合可用表驱动 |
| **DRG 龙骑士** | Dragon Gauge / Firstminds' Focus | ★★★★☆ | ★★☆☆☆ **跳跃与硬直、方向指定** | ★★★☆☆ Battle Litany | ★★☆ | **★★★☆☆（中）** | 🟡 |
| **BRD 吟游诗人** | Song Gauge / Soul Voice / Repertoire（随机触发） | ★★☆☆☆ **Repertoire 是随机触发** | ★★☆☆☆ | ★★☆☆☆ **三首歌是团辅核心** | ★★☆ | **★★★★☆（难）** | 🟠 随机触发 + 歌切换，需要改用期望值 |
| **DNC 舞者** | Step / Esprit / Fourfold Feather（随机触发） | ★★☆☆☆ | ★★☆☆☆ **舞步序列 + 随机** | ★★☆☆☆ **团辅型职业** | ★★☆ | **★★★★☆（难）** | 🟠 |
| **SMN 召唤师** | Aetherflow / Trance / 召唤兽轮换 | ★★★★☆ | ★★★★☆ 高度固定 | ★★★☆☆ Searing Light | ★★☆ | **★★☆☆☆（易）** | ✅ **6.0 重做后变成极其规律的「召唤兽轮换」**，是放置游戏的优良素材 |
| **NIN 忍者** | Huton / Ninki / Mudra（印组合） | ★★★☆☆ **Mudra 是组合输入** | ★★☆☆☆ **忍术组合 + 位置** | ★★☆☆☆ Trick Attack 团辅 | ★★☆ | **★★★★☆（难）** | 🟠 |
| **RDM 赤魔道士** | Black Mana / White Mana / Balance Gauge | ★★★★★ **双色能量** | ★★★★☆ | ★★★☆☆ Embolden | ★ | **★★☆☆☆（易）** | ✅ 黑白魔力条是放置游戏的经典素材 |
| **SGE 贤者** | Addersting（蛇刺）/ Eukrasia 状态 | ★★★★☆ | ★★★★☆ | ★★★★☆ 无团辅 | ★ | **★★☆☆☆（易）** | ✅ |
| **AST 占星术士** | 卡片（抽卡/重抽/星位）+ 天球仪 | ★★★☆☆ | ★★☆☆☆ **抽卡随机性** | ★☆☆☆☆ **团辅最重** | ★ | **★★★★★（极难）** | ❌ 抽卡 + 分发 + 星位对齐，是放置化最难还原的职业 |
| **SCH 学者** | Aetherflow（3 层）/ Faerie Gauge | ★★★★☆ | ★★★★☆ | ★★★☆☆ Chain Stratagem | ★ | **★★★☆☆（中）** | 🟡 妖精 AI 需要抽象 |
| **PCT 绘灵法师** | Palette / Hammer / Muse（画作 3 种） | ★★★★☆ | ★★★☆☆ | ★★★☆☆ Starry Muse | ★ | **★★★☆☆（中）** | 🟡 三种画作需要分别建模 |
| **VPR 蝰蛇剑士** | Serpent Offerings / Swiftscale / Coil 状态 | ★★★☆☆ **双剑/合体剑两种模式** | ★★☆☆☆ **连击分支多** | ★★★☆☆ | ★★☆ | **★★★★☆（难）** | 🟠 |
| **BLU 青魔道士** | **技能书（收集向）**，无传统量谱 | ★★★★☆ **但维度爆炸** | ★☆☆☆☆ **完全自由配装** | ★★★★★ 无团辅 | ★ | **★★★★★（极难，但换来了别的乐趣）** | 🔁 **换思路**：不还原战斗，改成**「技能收集 + 配装解谜」玩法** |
| **BST 驯兽师** | **TP（≥100）+ Inner Compass（4 属性 × 2 方向）** | ★★★★★ **整数阈值 + 有限状态环** | ★★★★☆ **棋盘是有限状态机** | ★★★★★ 无团辅 | ★ | **★☆☆☆☆（易，且玩法独特）** | ✅✅ **强烈推荐**。Inner Compass 天然就是「状态环」，Crucible 是天然的放置/挂机棋盘玩法 |

### 12.3 「职业 → 放置机制」映射建议表

> **这是本报告给出的可直接落地的设计映射。** 每条给出：FFXIV 机制 → 放置游戏机制 → 实现要点。

| # | FFXIV 原作机制 | 放置游戏机制 | 可直接复用的职业 | 实现要点 |
|---|---|---|---|---|
| **M1** | **能量池累积**（Beast Gauge / Heat / Kenki / Chakra / Lily / Blood Gauge：0→100 填充，到阈值解锁强力技） | **「资源条 + 阈值技能」**：主要输出由资源条驱动，闲置时按 `资源/秒` 自动增长 | WAR、MCH、MNK、SAM、DRK、WHM、RPR、SGE | 每个职业给 1-2 个整数池（0-100），`gain_rate` 由技能/装备决定；阈值技能消耗全部池 |
| **M2** | **层数堆叠 + 消费爆发**（Lily 3 层、Chakra 5 层、Requiescat 5 层、Beast Chakra 3 色） | **「蓄力层数 → 一次大爆发」**：离线时按时间积层，上线后一键释放 | WHM、MNK、PLD、RPR | 层数上限 + 每层效果线性叠加；爆发窗口 = 消耗全部层数 |
| **M3** | **固定 CD 的爆发窗口**（Inner Release 60s / No Mercy 60s / Wildfire 120s / Enshroud 60s / Arcane Circle 120s） | **「技能轮转表（Rotation Scheduler）」**：每个技能有自己的 CD，战斗结算按时间轴自动轮转 | 全体常规职业 | 用「按秒 tick + CD 队列」实现；这是放置游戏最常见也最稳的模型 |
| **M4** | **团辅（party buff）与 120 秒对齐** | ⚠️ **建议弱化或删除**。若保留，做成**「团队增益槽」**：多个角色的团辅在各自 CD 到点时自动叠乘 | BRD、DNC、AST、NIN、DRG、RPR、SMN、RDM、PCT | 官方在 8.0 已宣布删除团辅（见 §11.2），**跟随官方趋势可以大幅降低复杂度** |
| **M5** | **Combo Chain（连击链）** | **「顺序解锁的伤害递增」**：连击段 = 伤害倍率递增的序列，只要时间不断就自动推进 | PLD、WAR、DRG、SAM、MNK、NIN、RPR、VPR、GNB | 一张 `combo[]` 表 + 断连判定（超时/换目标/移动） |
| **M6** | **状态机循环**（BLM 的 Astral Fire ↔ Umbral Ice ↔ Astral Soul / Polyglot） | **「双/三态切换」**：每个状态有不同的产出与消耗，切换有代价（如需要一次特定技能） | BLM、SMN、BRD（三首歌）、VPR（双剑/合体剑）、BST（Inner Compass） | 用有限状态机（FSM）；状态转移需满足条件；给玩家「自动策略」选项 |
| **M7** | **随机触发（proc）**（BRD 的 Repertoire、DNC 的 Fourfold Feather、BLM 的 Firestarter、SMN 的 Further Ruin） | **「概率触发的免费强力技」**：可用「期望值」代替随机（放置游戏推荐），或用真随机增加观赏性 | BRD、DNC、BLM、SMN | 建议**默认用期望值**（保证离线收益可预测），提供「显示随机动画」的皮肤 |
| **M8** | **资源循环（Aetherflow 3 层，只能靠特定技能回复）** | **「充能式技能（Charges）」**：技能有最大充能数，离线时按 `1/CD` 速度回充 | SCH、SMN、BLM（Ley Lines 充能化）、GNB（Bloodfest）、WHM（Benison+Aquaveil 合并） | `charges` 字段 + `recharge_timer`；上限提升是一个很好的成长维度 |
| **M9** | **方向指定（positional）**：从侧面/背面攻击威力更高 | **「站位/角度修正」**：抽象成「站位于正确的「位」时获得 ×1.05 威力」，或直接做成一个「站位策略」下拉选项 | MNK、DRG、NIN、SAM、RPR、VPR、BST | **建议默认自动站位**，把方向指定做成「熟练度被动」 |
| **M10** | **位移与跳跃**（Dragoon 的 Jump / Viper 的突进 / 全体 gap closer） | **「机动值/位移充能」**：位移 = 一次额外的行动机会，或用于躲避机制 | DRG、GNB、DRK、PLD、MNK、NIN、SAM | 做成「战斗中的一次额外攻击」，不还原空间 |
| **M11** | **限时爆发窗口内压缩技能数**（No Mercy 内打多套连击、Inner Release 内 3 次 Fell Cleave、Enshroud 内多套） | **「窗口内技能排程优化」**：这是放置游戏**最有深度**的一层——玩家配置「窗口内技能顺序」以最大化伤害 | GNB、WAR、RPR、SAM、NIN | 离散事件模拟；给出「理论最大伤害」并让玩家优化 |
| **M12** | **GCD / oGCD 二分**（1 个 GCD = 2.5s，oGCD 可穿插） | **「行动槽」**：每 tick（如 2.5s）有 1 个 GCD 槽 + 不定量 oGCD 槽 | 全体 | 放置游戏的核心节奏参数；可直接沿用 2.5s |
| **M13** | **技能收集（BLU 的 Learn + 24 格 active set）** | **「技能图鉴 + Build 配置」**：收集 100+ 技能，选 24 个装配 | BLU | 纯收集/解谜玩法，战斗可极度简化 |
| **M14** | **棋盘式 Roguelike（BST 的 Crucible of the Unbroken）** | **「关卡推进 + 三选一奖励」**：棋盘 = 关卡节点，Ephemeral Items / Beast Gear / Feed = 局内 build | BST | 放置游戏可做「挂机推进 + 离线结算节点」 |
| **M15** | **伙伴/召唤物养成（Beast rank ≤ 25 / 妖精 / 召唤兽 / Automaton Queen / Living Shadow）** | **「宠物养成 + 独立加成」**：伙伴有独立等级与属性，提供被动加成或自动攻击 | BST（Beast rank 25）、SCH（Faerie）、SMN（召唤兽）、MCH（Automaton Queen）、DRK（Living Shadow）、BLU（宠物？无） | 每个伙伴 = 一个额外的「自动攻击 + 属性加成」模块；这是放置游戏的高价值付费/成长点 |
| **M16** | **仇恨管理（Tank stance / Provoke / Shirk / MT-ST 分工）** | **「仇恨条 + 嘲讽技能」**：坦克自动维持仇恨，玩家配置嘲讽时机 | PLD、WAR、DRK、GNB | 建议默认自动，保留「嘲讽」做成一次手动干预 |
| **M17** | **减伤链（mitigation chain）**：Rampart 20% / Reprisal / 大减伤 + 无敌技 | **「减伤技能排程」**：把减伤技能排到 BOSS 大招时间轴上 | PLD、WAR、DRK、GNB | 与 M3 结合：BOSS 有「大招时间轴」，玩家排减伤 → 这是放置游戏很好的「策略录入」 |
| **M18** | **治疗资源（Lily / Aetherflow / Addersting / 抽卡）** | **「治疗与输出的取舍」**：GCD 用在治疗就少了输出 | WHM、SCH、AST、SGE | 直接复用 Evercold 白魔的「GCD 治疗累积层数 → 转伤害」机制（§11.2）——**官方自己给出了「治疗不亏输出」的解法** |
| **M19** | **极限技（团队共享能量 → 5 种职能大招）** | **「团队能量条 → 手动释放的大招」** | 全体（按 5 职能） | 见 §8.4；按队伍人数与战斗时长累积，按「英雄行为」（治疗濒死队友、打断）加速 |
| **M20** | **职能技能（Role Actions）** | **「通用技能槽」**：所有职业共享的一小组通用技能 | 全体 | 复杂度极低，收益高（增加 build 多样性） |

### 12.4 分层实施建议

| 阶段 | 建议内容 | 依据 |
|---|---|---|
| **第一梯队（先做）** | **WAR、WHM、BLM、MCH、SMN、RDM、SGE、BST** | 全部是「单/双资源池 + 固定循环 + 无团辅或团辅极轻」，见 §12.2 |
| **第二梯队** | PLD、DRK、RPR、SAM、MNK、DRG、SCH、PCT | 有 1-2 个复杂点（双相切换 / 方向指定 / 组合状态），但可用表驱动解决 |
| **第三梯队（后做或简化）** | GNB、BRD、DNC、NIN、VPR | 分别是「爆发窗口压缩」「随机 proc + 团辅」「舞步序列」「忍术组合」「双模式连击」——各自需要一套专门系统 |
| **不建议还原** | **AST** | 抽卡 + 重抽 + 星位分发 + 团辅对齐，**四重随机/对齐叠加**，投入产出比最差 |
| **换玩法还原** | **BLU** | 不复刻战斗，改做「技能收集 + 构筑」 |
| **最推荐的差异化玩法** | **BST** | Inner Compass 状态环 + Crucible 棋盘 + Beast rank 25 宠物养成，**与常规职业玩法完全不同且极易数值化** |

### 12.5 最容易被数值化 / 最难还原的机制清单（结论）

**最容易数值化（直接抄）**

1. **单一 0-100 资源池 + 阈值技能**（Warrior Beast Gauge、Machinist Heat、White Mage Lily）
2. **固定 CD 的技能轮转**（所有职业的 oGCD 表）
3. **整数层数堆叠**（Chakra 5、Lily 3、Requiescat 5、Beast Chakra 3）
4. **双色/双相能量**（Red Mage 黑白魔力、Black Mage 火冰）
5. **连击链的伤害递增**（Combo multiplier）
6. **充能式技能**（Aetherflow、Ley Lines、Bloodfest）
7. **宠物/伙伴的独立等级与加成**（BST Beast rank ≤ 25）
8. **极限技的团队共享能量**
9. **Limited Job 的独立等级上限**（80 / 50）

**最难还原（建议淡化或改造）**

1. **团辅的 120 秒多人对齐**（官方 8.0 已宣布删除 → 跟随官方即可豁免）
2. **抽卡与分发**（AST 的卡片，随机 × 决策 × 队友依赖）
3. **方向指定 + 身位循环**（Monk、Dragoon、Viper、Ninja、Samurai）
4. **随机 proc 的最优处理**（Bard Repertoire、Dancer Fourfold Feather）
5. **爆发窗口内的技能压缩与延迟容错**（Gunbreaker、Ninja、Reaper）
6. **蓝魔的技能自由配装（维度爆炸）**（Blue Mage）
7. **实时位置/位移/机制躲避**（全体，但可用「自动站位 + 熟练度」抽象）

---

## 13. 不确定项与存疑数据汇总

> 本节汇总全文所有 **⚠️ 不确定 / ⚠️ 来源受限** 的条目。**开发时请以本节为「待核实清单」。**

### 13.1 明确未确定的官方事实

| # | 事项 | 现状 | 建议 |
|---|---|---|---|
| U1 | **8.0 第二个新职业（远程物理 DPS）的名称与细节** | 官方仅写 "Two New Jobs: Bastion (Tank) and Physical Ranged DPS" | 待 8.0 情报更新 |
| U2 | **Bastion 的起始等级** | 官方未公布。社区流传「起始 90 级」符合「上限 −20」的历史规律（GNB/DNC 60/80、RPR/SGE 70/90、VPR/PCT 80/100 → Bastion 90/110），但**非官方** | 按 🟠 处理 |
| U3 | **Bastion 的职业任务接取地点** | 社区流传「利姆萨·罗敏萨」，**未在官方英文源找到** | 按 🟠 处理 |
| U4 | **「坚城卫」是否为 Bastion 的官方中文名** | 仅英文 `Bastion` 为官方；中文名未在官方中文站核实 | 使用 `Bastion` 英文名 |
| U5 | **Evercold 简中官方标题** | 日文官方为『白銀のワンダラー』；简中「白银的探求者」来自 Famitsu 中文报道 | 待官方简中站更新 |
| U6 | **LB1 / LB2 的精确减伤与治疗百分比** | 仅 2015 年日文玩家日记给出（10%/20%/50%、25%/60%/100%），非官方 | 按 D 级参考 |
| U7 | **所有 23 个特职在 7.5 的 LB3 名称** | 官方 2015 年博客只覆盖 3.0 时点的 14 个特职；4.0 后追加职业（SAM/RPR/VPR/GNB/SGE/RDM/PCT/DNC）的 LB3 **未取得** | 待补 |
| U8 | **Dancer 的 LB3 名称** | 未取得 | 待补 |
| U9 | **Class quest 与 Job quest 的逐级节点与任务总数** | 一手来源不可得（consolegameswiki 403） | 用 7.5 官方 Job Guide 的技能解锁等级反推 |
| U10 | **「主 class 30 + 副 class 15」要求在 3.0 还是 4.0 废除** | 社区通说 4.0，未证实 | 按 🟡/D 级 |
| U11 | **7.0 Dawntrail 的 role quest 线数、名称与 "Master Role Quest"** | 仅二手媒体提及，本环境 403 | 待补 |
| U12 | **6.0 Summoner 重做的官方逐条技能变更** | 见 §10（部分内容来源等级较低） | 建议查 6.0 官方补丁说明 |
| U13 | **生产职业在 7.x 的技能 CD / CP 消耗精确数值** | 未取得 | 待补 |
| U14 | **CRP / CUL / MIN / BTN / FSH 的简中官方写法** | 仅繁中官方名可确证 | 以繁中为准 |
| U15 | **繁中官网职业页未收录 BLU / BST** | 页面停留在 7.0 | 使用日文/英文官方名 |
| U16 | **「同职业重复会降低 LB 充能速度」（2.1）** | 仅玩家日记提及 | 按 D 级 |
| U17 | **7.5 与 7.56 的确切上线日期** | 官方 7.5 特设（简中）写 **2026-04-28**；7.56 的 17173 报道写 **2026-09-10**，而官方 7.56 补丁说明页脚写「Updated on Tuesday, September 15, 2026 at 1:00 a.m. (PDT)」（应为笔记修订时间） | 采用 7.5 = 2026-04-28、7.56 = 2026-09-10，并注明笔记于 09-15 修订 |

### 13.2 本次调研未能访问的来源（影响覆盖面）

| 站点 | 状态 | 因此缺失的内容 |
|---|---|---|
| `ffxiv.consolegameswiki.com` | 403 | Role Actions 完整表、Limited Jobs 细节、Job Quests 结构、Limit Break 表 |
| `ffxiv.gamerescape.com` | 403 | Limit Break 精确数值表 |
| `www.icy-veins.com` / `wp-prod.icy-veins.com` | 403 | Bastion 指南、Evolved Mode 预览、Evercold 战斗改革解释 |
| `www.polygon.com` / `www.gematsu.com` / `nintendolife.com` / `thesixthaxis.com` / `dualshockers.com` / `gamefragger.com` / `tech.yahoo.com` | 403 | 8.0 新闻细节、Bastion 报道 |
| `finalfantasy.fandom.com` | 抓取失败 | Role Action / Limit Break 汇总表 |
| `web.archive.org` | 抓取失败 | 无法用快照绕开上述 403 |
| `actff1.web.sdo.com` 生产采集页 | 未抓取 | 简中生产采集职业名 |

### 13.3 数据可靠度总体评价

| 章节 | 可靠度 | 说明 |
|---|---|---|
| §1 版本与时效 | ⭐⭐⭐⭐⭐ | 全部来自官方页面与官方补丁说明 |
| §2 战斗职业总清单 | ⭐⭐⭐⭐⭐ | 官方 Job Guide（EN+JP）+ 官方中文站 |
| §3 生产采集 | ⭐⭐⭐⭐☆ | 官方 Crafting Guide；中文译名与 class/job 定性有不确定项 |
| §4 各职业详解 | ⭐⭐⭐☆☆ | 依赖官方 Job Guide 逐页抓取 + 社区补充，见该节内标注 |
| §5 class→job 历史 | ⭐⭐⭐⭐☆ | 关键节点均为官方；1.0/2.0 与副职要求为社区通说 |
| §6 职业任务 | ⭐⭐⭐☆☆ | 6.0 role quest 与 7.56 BST 任务线为官方；其余节点数待考 |
| §7 职能技能 | 见该节 | — |
| §8 极限技 | ⭐⭐⭐⭐☆ | 机制与范围为官方；LB1/2 数值与部分 LB3 名称为 D 级 |
| §9 受限职业 | ⭐⭐⭐⭐⭐ | 两个职业的官方 Job Guide 页面逐条对照 |
| §10 历代重做 | 见该节 | — |
| §11 Evercold | ⭐⭐⭐⭐☆ | 特设站与新闻稿为官方；开发面板细节为 C 级现场报道 |
| §12 放置化分析 | ⭐⭐☆☆☆（E 级） | **本报告作者的工程评估**，非官方事实，仅供设计参考 |

---

*本文档由联网调研生成，调研日期 2026-09-15，数据基准 Patch 7.56。*
