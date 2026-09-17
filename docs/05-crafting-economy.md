# 最终幻想 XIV（FFXIV）生产 / 采集 / 经济系统与生活玩法 · 深度调研文档

> **文档编号**：05
> **主题**：Crafting（生产 / Disciples of the Hand）、Gathering（采集 / Disciples of the Land）、经济系统（Gil / Market Board）、生活向长尾内容，以及面向"放置游戏"的可用性映射
> **调研日期**：2026-09-15
> **游戏版本基准**：**Patch 7.5x（Dawntrail 黄金的遗产）**。本次调研期间观察到的版本标识：
> - 官方《クラフター・ギャザラーガイド / Crafting & Gathering Guide》页面标注 **"Updated for 7.5" / "Patch 7.5対応版"**（[JP](https://jp.finalfantasyxiv.com/crafting_gathering_guide/) / [NA](https://na.finalfantasyxiv.com/crafting_gathering_guide/)）
> - Lodestone Eorzea Database 显示 **Version: Patch 7.56**（[数据库](https://na.finalfantasyxiv.com/lodestone/playguide/db/)）
> - 社区站 Eorzean Tavern 的攻略标注 **"Current for Patch 7.56"**（更新于 2026-08-21）
> - 社区站 Timesaver 标注 **Patch 7.55 于 2026-07-28 上线，Patch 7.56 于 2026-09-08 上线**
> 结论：**当前（2026-09）为 7.5x 小版本期，等级上限 100，8.0 尚未上线**。7.x 系列仍在持续加内容（宇宙探索新"星"、秘籍新配方等）。
>
> **来源分级约定**：
> - 🟦 **官方**（Square Enix / Lodestone / 官方 Patch Notes / 官方攻略页 / Mog Station）
> - 🟨 **社区整理**（ff14wiki.info、consolegameswiki、Eorzean Tavern、Universalis、Teamcraft、Garland Tools、The Balance、NGA、17173 等）
> - 🟥 **存疑 / 需以游戏内为准**（二手转述、可能过期、推测性结论）
>
> **重要提醒**：本文中的**数值型结论（技能 CP 消耗、效率百分比、税率、价格）**尽量给出官方来源；**历史沿革与设计意图类结论**多为社区整理；**面向放置游戏的设计建议部分为本文作者原创推演，不是 FFXIV 事实**。

---

## 目录

- [0. 速览：一页结论](#0-速览一页结论)
- [1. 全部生产与采集职业](#1-全部生产与采集职业)
- [2. 生产（Crafting）核心机制](#2-生产crafting核心机制)
- [3. 采集（Gathering）核心机制](#3-采集gathering核心机制)
- [4. 等级进度、经验来源与任务链](#4-等级进度经验来源与任务链)
- [5. 经济系统](#5-经济系统)
- [6. 与生产采集相关的长尾内容](#6-与生产采集相关的长尾内容)
- [7. 日常 / 周常循环点与"适合放置产出"的设计位](#7-日常--周常循环点与适合放置产出的设计位)
- [8. 面向"放置游戏"的可用性分析与映射设计](#8-面向放置游戏的可用性分析与映射设计)
- [9. 来源清单](#9-来源清单)
- [10. 不确定项、版本时效性与后续核对清单](#10-不确定项版本时效性与后续核对清单)

---

## 0. 速览：一页结论

| 维度 | 数字 / 结论 | 来源级别 |
|---|---|---|
| 生产职业数量 | **8**（CRP/BSM/ARM/GSM/LTW/WVR/ALC/CUL） | 🟦 官方 |
| 采集职业数量 | **3**（MIN/BOT/FSH） | 🟦 官方 |
| 当前等级上限 | **100**（Dawntrail 7.0 起；此前 50→60→70→80→90） | 🟦 官方 |
| 生产三大属性 | Craftsmanship（作业精度）、Control（加工精度）、CP（制作力） | 🟦 官方 |
| 采集三大属性 | Gathering（获得力）、Perception（识别力）、GP（采集力） | 🟦 官方 |
| 单次制作核心资源 | 耐久（Durability）、工数/进度（Progress）、品质（Quality）、CP | 🟦 官方 |
| 生产核心动作数（7.x，单一生产职业） | **33 个职业动作 + 3 个专家（マイスター）动作 + 9 个特性** | 🟦 官方 |
| 采集核心动作数（7.x，MIN/BOT） | **24 个职业动作 + 4 个采集职能（Role）动作 + 特性** | 🟦 官方 |
| 钓鱼动作数（7.x） | **37 个职业动作 + 4 个采集职能动作 + 特性** | 🟦 官方 |
| 秘籍（Master Recipe Book） | 每个生产职业 **I–XII**（每资料片 2 本；DT 为 XI / XII） | 🟨 社区 |
| 票据（Scrip）分期命名 | 蓝/红（HW）→ 黄（SB）→ 白 + 空贼（ShB）→ 紫（EW）→ **橙（DT，现行）** | 🟨 社区 |
| 票据周上限 | **已于 4.0 取消**，现无周上限 | 🟨 社区 |
| 收藏品交付（Custom Delivery）周上限 | **每周 12 次**，单一 NPC 最多 **6 次** | 🟨 社区 |
| 市场板卖方税率 | 常规 **5%**；"减税都市"的雇员 **2%** | 🟨 社区（多来源一致，机制稳定） |
| 市场板买方手续费 | 自 **5.2** 起**全都市统一 5%**（不再有"去原都市买免税"） | 🟨 社区（ff14wiki.info 有版本变更史） |
| 雇员（Retainer） | 订阅含 **2 名**免费；付费最多再 **+7（共 9）**；同伴 App 再 +1 → 上限 **10** | 🟦 官方 + 🟨 社区 |
| 雇员仓库 | 每名雇员 **175 种**道具位 | 🟦 官方 |
| 房屋地价（官方初始价） | 小 300 万 / 中 1600 万 / 大 4000 万 Gil 起（分 Fifth–First class） | 🟦 官方（3.3 公告，后续有调整） |
| 房屋摇号 | **9 天一个周期**：5 天报名 + 4 天领奖 | 🟨 社区 |
| 6.0 重大改动 | **采集物 / 怪物掉落 / 票据兑换素材的 HQ 被废除**；可制作物品仍保留 HQ | 🟦 官方 |
| 7.0 重大改动 | 新增图莱尤拉市场板（减税判定随之调整）；HQ 仍存在于**可制作装备/食物/药水**上 | 🟦 官方 + 🟨 社区 |
| 现版本生产终局装备量级 | 7.4 已出现 **iLv 770 HQ 战职绿装**（由生产制作） | 🟨 社区（NGA 攻略标题） |

---

## 1. 全部生产与采集职业

### 1.1 生产职业（Disciplines of the Hand / クラフター / 生产系）

FFXIV 的生产职业共 **8 种**，官方定义："Disciples of the Hand deal in the creation of all manner of items, from battle gear and medicine to food and furnishings. There are a total of eight disciplines you may choose from, and each specializes in a different product."
（来源：🟦 [官方 Crafting & Gathering Guide 总览](https://na.finalfantasyxiv.com/crafting_gathering_guide/)）

| 缩写 | 英文名 | 日文名 | 中文译名（国服/通用） | 主手工具（英文） | 主手工具（日文） | 副手（副道具） | 主属性 | 登场 | 等级上限 |
|---|---|---|---|---|---|---|---|---|---|
| **CRP** | Carpenter | 木工師 | **刻木匠**（木工师） | Saw（Hand Saw） | ハンドソー | Claw Hammer（爪锤） | Craftsmanship / Control / CP | 1.0 / 2.0（ARR） | 100 |
| **BSM** | Blacksmith | 鍛冶師 | **锻铁匠**（锻冶师） | Cross-pein Hammer | クロスペインハンマー | File（锉刀）🟥 | Craftsmanship / Control / CP | 1.0 / 2.0 | 100 |
| **ARM** | Armorer | 甲冑師 | **铸甲匠**（甲胄师） | Doming Hammer | ドーミングハンマー | File / Pliers（钳）🟥 | Craftsmanship / Control / CP | 1.0 / 2.0 | 100 |
| **GSM** | Goldsmith | 彫金師 | **雕金匠**（雕金师） | Chaser Hammer | チェーサーハンマー | Grinding Wheel（研磨轮） | Craftsmanship / Control / CP | 1.0 / 2.0 | 100 |
| **LTW** | Leatherworker | 革細工師 | **制革匠**（皮革匠） | Head Knife | 裁皮包丁 | Awl（锥子） | Craftsmanship / Control / CP | 1.0 / 2.0 | 100 |
| **WVR** | Weaver | 裁縫師 | **裁衣匠**（裁缝师） | Needle | 縫針 | Spinning Wheel（纺轮） | Craftsmanship / Control / CP | 1.0 / 2.0 | 100 |
| **ALC** | Alchemist | 錬金術師 | **炼金术士 / 炼金术师** | Alembic | 蒸留器 | Mortar（研钵） | Craftsmanship / Control / CP | 1.0 / 2.0 | 100 |
| **CUL** | Culinarian | 調理師 | **烹调师**（烹饪师） | Frypan | フライパン | Culinary Knife（厨刀） | Craftsmanship / Control / CP | 1.0 / 2.0 | 100 |

**说明与不确定点**

- 🟦 官方「主道具」的确定信息：CRP = ハンドソー（Hand Saw）；MIN = ピック（Pickaxe）；FSH = フィッシングロッド（Fishing Rod）。三者由官方页面文字直接确认。
- 🟨 其余主手工具名取自游戏内道具命名惯例（如官方 Eorzea Database 中存在 *Iron Doming Hammer* → ARM 主手为 Doming Hammer）。
- 🟥 **BSM / ARM 的副手道具名称**（File / Pliers）为作者记忆，**未在本次调研中找到权威来源**，请以游戏内为准。其余副手（Claw Hammer / Grinding Wheel / Awl / Spinning Wheel / Mortar / Culinary Knife）置信度较高。
- 中文译名：国服官方与民间译名存在差异（如 ALC 官方常作「炼金术士」，民间常作「炼金术师」；CUL 官方「烹调师」，民间「烹饪师」）。17173 的国服介绍文使用「烹饪师、裁衣匠、制革匠、锻铁匠、刻木匠、铸甲匠、雕金匠、炼金术师」（🟨 [17173 生产系和采集系职业介绍](https://news.17173.com/z/ff14/content/08282023/095356740.shtml)）。
- **注意**：`CAR` 不是 Carpenter 的缩写（正确为 **CRP**）；`ARM` 不是 Alchemist（正确为 **ALC**）。这是新手最常混淆的两个缩写。

#### 各生产职业的官方定位（翻译自官方介绍）

| 职业 | 官方描述要点（🟦 官方 Guide） |
|---|---|
| CRP 刻木匠 | 精通各类木材硬度、韧性、重量与价值；以"活用素材"为信条制作器具与家具。格里达尼亚的木工技术从巨大水车到祭典面具无所不包。 |
| BSM 锻铁匠 | 擅长金属武器与工具的制作。 |
| ARM 铸甲匠 | 将金属加工成板甲、锁甲等各种护甲；原是锻冶的一部分，因冶金与材料精炼技术进步而独立为公认职业。 |
| GSM 雕金匠 | 以贵金属与宝石制作饰品。 |
| LTW 制革匠 | 以野生动物的生皮制作皮衣皮具。 |
| WVR 裁衣匠 | 通过裁剪缝纫制作布艺装备。 |
| ALC 炼金术士 | 制造各种药剂；亦负责墨水、涂料等。 |
| CUL 烹调师 | 把食材做成提供增益效果（Buff）的食物。 |

#### 各生产职业的 **公会所在地**（入职地点）

- 🟦 CRP：New Gridania / 格里达尼亚新市街 (X:10.8 Y:12.1)
- 🟦 ARM：Limsa Lominsa Upper Decks / 利姆萨·罗敏萨上层甲板 (X:10.2 Y:15.0)
- 🟦 MIN：Ul'dah – Steps of Thal / 乌尔达哈 扎尔回廊 (X:11.3 Y:14.3)
- 🟨 BSM / CUL / FSH：利姆萨·罗敏萨（海之都）
- 🟨 GSM / ALC / MIN：乌尔达哈（沙之都）
- 🟨 LTW / CRP / BOT：格里达尼亚（森之都）
  （🟨 来源：[17173 生活职业介绍](https://news.17173.com/z/ff14/content/08282023/095356740.shtml)）

> **设计要点**：**职业与城市地理绑定**是 FFXIV 生活职业设计的一个显性特征——"靠山吃山、靠海吃海"。生产与采集职业的原料产地在空间上被刻意分散到三大城邦，从而制造了**跨城物流需求**，这也是市场板经济存在的地理基础。

### 1.2 采集职业（Disciplines of the Land / ギャザラー / 采集系）

采集职业共 **3 种**。官方定义："Disciples of the Land are master gatherers of Eorzea's rich natural resources."
（🟦 [官方总览](https://na.finalfantasyxiv.com/crafting_gathering_guide/)）

| 缩写 | 英文名 | 日文名 | 中文译名 | 主手工具 | 主手（日文） | 副手 | 主属性 | 采集对象 | 登场 | 等级上限 |
|---|---|---|---|---|---|---|---|---|---|---|
| **MIN** | Miner | 採掘師 | **采矿工** | Pickaxe | ピック | Sledgehammer（碎岩锤） | Gathering / Perception / GP | 矿脉（採掘場）、岩场（岩場）→ 矿石、宝石、化石、石材 | 1.0 / 2.0 | 100 |
| **BOT** | Botanist | 園芸師 | **园艺工** | Hatchet | 斧（ハチェット） | Scythe（草刈鎌） | Gathering / Perception / GP | 良木（良木）、草刈场（草刈場）→ 原木、果实、草、棉 | 1.0 / 2.0 | 100 |
| **FSH** | Fisher | 漁師 | **捕鱼人** | Fishing Rod | フィッシングロッド | Gig（銛，6.0 刺突渔用） | Gathering / Perception / GP | 海洋 / 河川 / 湖沼 / 砂海 / 鱼影 | 1.0 / 2.0 | 100 |

**要点**

- 🟦 **MIN/BOT 有"主道具 + 副道具"双工具结构**：到岩场 / 草刈场采集时必须装备副道具（官方原文：「※岩場で採集を行う際は、副道具を装備している必要があります」）。这是采集职业独有的设计。
- 🟦 **FSH 不消耗 GP 进行"钓鱼"本身**，但使用**消耗 GP 的技能**（Chum、Patience、Fish Eyes、Prize Catch、Double/Triple Hook、Ambitious/Modest Lure 等）。FSH 同样吃 Gathering / Perception / GP 三项属性。
- 🟨 **FSH 的副手 Gig 是 6.0（Endwalker）新增的"刺突渔（Spearfishing）"专用工具**。
- 🟨 三名采集职业从 1.0 起就存在，没有"后续资料片新增采集职业"的情况——这与战斗职业形成对比。

### 1.3 生产/采集职业等级上限的历史

所有 11 个生产采集职业的等级上限与战斗职业**完全同步**，即每部资料片 +10：

| 资料片 | 版本 | 等级上限 | 生产终局内容标志 |
|---|---|---|---|
| A Realm Reborn（新生エオルゼア） | 2.0（2013） | **50** | 秘籍 I–II、Lucis 工具线 |
| Heavensward（蒼天のイシュガルド） | 3.0（2015） | **60** | 秘籍 III–IV、天钢工具（Skysteel）前身、**伊修加德复兴不在本版本** |
| Stormblood（紅蓮のリベレーター） | 4.0（2017） | **70** | 秘籍 V–VI、Resplendent 工具、**票据周上限废除（4.0）** |
| Shadowbringers（漆黒のヴィランズ） | 5.0（2019） | **80** | 秘籍 VII–VIII、**伊修加德复兴（5.11 起）/ 迪亚德姆（5.21 起）/ 天钢工具（5.2 起）** |
| Endwalker（暁月のフィナーレ） | 6.0（2021） | **90** | 秘籍 IX–X、**HQ 废除部分道具（6.0）/ 岛屿庇护所（6.2）/ Splendorous 工具（6.35）** |
| Dawntrail（黄金のレガシー） | 7.0（2024） | **100** | 秘籍 XI–XII、**宇宙探索（7.21 起）/ 宇宙工具（Cosmic Tools）** |

> ⚠️ 上表"生产终局内容标志"列中的版本号为社区整理的近似值，个别条目（如 Skysteel 工具实际为 5.2 引入）存在跨版本延续的情况。详见[第 6 章](#6-与生产采集相关的长尾内容)。

### 1.4 生产 / 采集职业的"日常可做的事"（官方列举）

🟦 官方 Guide 明确列出 DoH 的 4 项功能：

1. **物品制作（Synthesis）**——从素材制作新物品。
2. **装备修理（Repair）**——消耗 **Dark Matter（暗物质）**，可在任意地点修理装备；不同装备需要不同的生产职业与等级。
3. **魔晶石镶嵌（Materia Melding）**——Lv19 完成职业任务「想いを伝える力 / Waking the Spirit」后解锁；**禁忌镶嵌（Advanced Materia Melding）** 需 Lv25 完成「禁断のマテリア装着 / Melding Materia Muchly」。
4. **物品分解（Desynthesis）**——Lv30 完成「想いを紐解く力 / Gone to Pieces」后解锁，把装备分解回素材。

🟦 DoL 的功能：采掘（MIN）、伐採/草刈（BOT）、钓鱼 + 刺突渔（FSH）、采集收藏品、采集限时/传说/以太节点。

> **设计要点（原创观察）**：注意"修理"与"分解"这两项**非生产性**功能被绑定在生产职业上，使生产职业成为**整个游戏的维护性基础设施**（装备耐久 → 修理 → 消耗暗物质；旧装备 → 分解 → 回收素材）。这为生产职业提供了"不依赖市场板的刚需"，也是放置游戏中"工具耐久 / 回收分解"系统的原型。

---

## 2. 生产（Crafting）核心机制

本章所有技能数值均以 **官方 7.x 攻略页（Lv100 时点显示）** 为准。八职业的动作表**完全一致**（仅图标与职业名不同，另有个别职业专属的合成配方差异），因此本章给出**通用表**。

### 2.1 一次制作涉及的全部资源

| 资源 | 英文 | 日文 | 含义 | 典型数值 |
|---|---|---|---|---|
| 耐久 | Durability | 耐久 | 制作过程中被技能消耗的"体力"；归零则失败 | 常规配方 **40 / 60 / 70 / 80**；高难度配方更高 |
| 进度 | Progress | 工数 | 必须填满才能完成制作 | 由配方等级决定（数百至数千） |
| 品质 | Quality | 品質 | 影响 HQ 率 / 收藏品价值 | 上限由配方决定（"最大品质"） |
| 制作力 | CP (Crafting Points) | 制作力（CP） | 使用技能消耗的资源；不自然回复（除特定技能） | 满级无装备约 180；装备齐全 **500–650+** |
| 状态 | Condition | 状態 | 每回合随机刷新的"素材状态"，改变品质收益 | 见 §2.5 |

🟦 官方对核心循环的表述（意译）：
> 使用「作業」等动作推进"工数"；工数达到配方规定最大值即制作成功。生产动作大多会消耗"耐久"；**若耐久先归零，则制作失败**。

### 2.2 三大属性与判定公式

#### 2.2.1 Craftsmanship（作业精度）

**作用**：决定每次"作业（Synthesis）"动作推进的进度量。

社区长期使用的近似公式（🟨 来源：Teamcraft / ffxivcrafting / The Balance 生产社区共识，非官方公布）：

```
progressPerAction = floor( (Craftsmanship × 10 / recipeProgressDivider + 2) × actionEfficiency × conditionModifier × buffModifier )
```

其中 `recipeProgressDivider` 由**配方等级（RLvl）**决定，并叠加**等级差修正**（玩家等级高于配方等级时获得奖励系数，反之受惩罚）。

> 🟥 **不确定性说明**：FFXIV 从未公布生产公式。社区逆向出的版本在不同资料片被反复修正；6.0 的"数值通缩（denomination）"、7.0 的配方等级重排都会使旧系数失效。**本文不给出具体系数表**，仅说明结构。需要精确数值时请使用 [Teamcraft 模拟器](https://ffxivteamcraft.com/) 或 [Garland Tools](https://www.garlandtools.org/db/) 的实时数据。

#### 2.2.2 Control（加工精度）

**作用**：决定每次"加工（Touch）"动作提升的品质量。结构同上，但使用 Control 与配方 Quality Divider。

#### 2.2.3 CP（制作力）

**作用**：技能燃料。**CP 是生产中最稀缺的资源**——因为它不随回合自然恢复（只能靠 Tricks of the Trade 回 20 点，或靠食物/药水提升上限）。

- 🟦 官方技能 `Tricks of the Trade`（秘訣）：**回复 20 CP**，仅在素材状态为 Good 或 Excellent 时可用。
- 🟨 生产装备/食物的核心追求是 **CP > Control > Craftsmanship**（在能完成进度的前提下），因为 CP 决定"能打多少个加工技能"。
- 🟨 7.x 顶级生产的常见 CP 目标值：**600+**（食物 + 药水 + 满配禁忌镶嵌）。社区宏示例中出现的 CP 值包括 601（Lv95–100 收藏品宏）、544、540、528 等。

### 2.3 生产技能全表（7.x / Lv100 时点）

#### 2.3.1 职业动作（Class Actions）——8 职业共通

数据来源：🟦 [官方 Carpenter 页](https://na.finalfantasyxiv.com/crafting_gathering_guide/carpenter/) 与 [官方 Armorer 页](https://na.finalfantasyxiv.com/crafting_gathering_guide/armorer/) 交叉验证。

| # | 英文名 | 日文名 | 中文 | 习得 | CP | 效率 | 成功率 | 效果 / 备注 |
|---|---|---|---|---|---|---|---|---|
| 1 | Basic Synthesis | 作業 | 作业 | Lv1 | 0 | 120% | 100% | 推进进度（Lv31 特性后效率 120） |
| 2 | Basic Touch | 加工 | 加工 | Lv5 | 18 | 100% | 100% | 提升品质 |
| 3 | Master's Mend | マスターズメンド | 精修 | Lv7 | 88 | — | — | **恢复 30 点耐久** |
| 4 | Hasty Touch | ヘイスティタッチ | 仓促加工 | Lv9 | 0 | 100% | **60%** | 不消耗 CP；成功时赋予「Expedience（匠之好机）」1 回合 |
| 5 | Rapid Synthesis | 突貫作業 | 突贯作业 | Lv9 | 0 | **500%** | **50%** | 高风险高进度（Lv63 特性后 500） |
| 6 | Observe | 経過観察 | 观察 | Lv13 | 7 | — | — | 空过 1 回合 |
| 7 | Tricks of the Trade | 秘訣 | 秘诀 | Lv13 | 0 | — | — | **回复 20 CP**；仅状态 Good 以上可用 |
| 8 | Waste Not | 倹約 | 节俭 | Lv15 | 56 | — | — | 4 回合内耐久消耗 −50% |
| 9 | Veneration | ヴェネレーション | 崇敬 | Lv15 | 18 | — | — | 4 回合内**作业效率 +50%** |
| 10 | Standard Touch | 中級加工 | 中级加工 | Lv18 | 32 | 125% | 100% | 连携：Basic Touch → CP 降至 18 |
| 11 | Great Strides | グレートストライド | 大跨步 | Lv21 | 32 | — | — | 3 回合内，下一次加工效率 **+100%**（仅一次） |
| 12 | Innovation | イノベーション | 革新 | Lv26 | 18 | — | — | 4 回合内**加工效率 +50%** |
| 13 | Final Appraisal | 最終確認 | 最终确认 | Lv42 | 1 | — | — | 5 回合内，下一次会完成制作的动作**留下 1 点进度**；不消耗回合 |
| 14 | Waste Not II | 長期倹約 | 长期节俭 | Lv47 | 98 | — | — | **8 回合**内耐久消耗 −50% |
| 15 | Byregot's Blessing | ビエルゴの祝福 | 比尔格的祝福 | Lv50 | 24 | **100% + 20%/IQ（最大 300%）** | 100% | 消耗全部 Inner Quiet；需 ≥1 层 IQ |
| 16 | Precise Touch | 集中加工 | 集中加工 | Lv53 | 18 | 150% | 100% | 仅 Good 以上；**IQ +1** |
| 17 | Muscle Memory | 確信 | 确信 | Lv54 | 6 | **300%** | 100% | **仅第 1 回合**；附加"下次作业效率 +100%"（5 回合） |
| 18 | Careful Synthesis | 模範作業 | 模范作业 | Lv62 | 7 | 180% | 100% | 低 CP 稳定作业 |
| 19 | Manipulation | マニピュレーション | 操控 | Lv65 | 96 | — | — | **8 回合内每回合结束回复 5 耐久**（职业任务解锁） |
| 20 | Prudent Touch | 倹約加工 | 节俭加工 | Lv66 | 25 | 100% | 100% | 耐久消耗减半；**Waste Not/II 生效中不可用** |
| 21 | Advanced Touch | 上級加工 | 上级加工 | Lv68 | 46 | 150% | 100% | 连携：Standard Touch 或 Observe → CP 降至 18 |
| 22 | Reflect | 真価 | 真价 | Lv69 | 6 | **300%** | 100% | **仅第 1 回合**；**IQ +1** |
| 23 | Preparatory Touch | 下地加工 | 打底加工 | Lv71 | 40 | 200% | 100% | **耐久消耗 20**；**IQ +1** |
| 24 | Groundwork | 下地作業 | 打底作业 | Lv72 | 18 | 360% | 100% | **耐久消耗 20**；耐久不足时效率减半 |
| 25 | Delicate Synthesis | 精密作業 | 精密作业 | Lv76 | 32 | 作业 150% + 加工 100% | 100% | **同时推进度与品质** |
| 26 | Intensive Synthesis | 集中作業 | 集中作业 | Lv78 | 6 | **400%** | 100% | 仅 Good 以上 |
| 27 | Trained Eye | 匠の早業 | 匠之早业 | Lv80 | 250 | 品质 +100%（满品质） | 100% | **仅第 1 回合**；配方等级需低于自身 **≥10 级**；**专家配方不可用** |
| 28 | Prudent Synthesis | 倹約作業 | 节俭作业 | Lv88 | 18 | 180% | 100% | 耐久消耗减半；Waste Not 中不可用 |
| 29 | Trained Finesse | 匠の神業 | 匠之神业 | Lv90 | 32 | 100% | 100% | **不消耗耐久**；需 IQ = 10 层 |
| 30 | Refined Touch | 洗練加工 | 洗练加工 | Lv92 | 24 | 100% | 100% | 连携：Basic Touch → **IQ +1** |
| 31 | Daring Touch | デアリングタッチ | 冒险加工 | Lv96 | 0 | 150% | **60%** | 需 Expedience 效果；**无法放入快捷栏**（由 Hasty Touch 自动转换） |
| 32 | Immaculate Mend | パーフェクトメンド | 完美精修 | Lv98 | 112 | — | — | **完全恢复耐久** |
| 33 | Trained Perfection | 匠の絶技 | 匠之绝技 | Lv100 | 0 | — | — | 使**下一次动作耐久消耗为 0**；每次制作仅 1 次 |

#### 2.3.2 专家动作（Specialist Actions）——仅"专家"可用

| 英文名 | 日文名 | 习得 | CP | 效果 |
|---|---|---|---|---|
| Careful Observation | 設計変更 | Lv55 | 0 | **不消耗回合**地推进 1 回合状态；消耗 **Crafter's Delineation（クラフターの製図用紙）**；每次制作最多 **3 次** |
| Heart and Soul | 一心不乱 | Lv86 | 0 | 使 Precise Touch / Intensive Synthesis / Tricks of the Trade **无视素材状态**可用；消耗製図用紙；每次制作 **1 次** |
| Quick Innovation | クイックイノベーション | Lv96 | 0 | 赋予 1 回合 Innovation；不能与 Innovation 叠加；消耗製図用紙；每次制作 **1 次** |

🟦 来源：[官方 Carpenter 页 Specialist Actions 表](https://na.finalfantasyxiv.com/crafting_gathering_guide/carpenter/)

#### 2.3.3 特性（Traits）

| 英文名 | 日文名 | 习得 | 效果 |
|---|---|---|---|
| Inner Quiet | インナークワイエット | Lv11 | 每次成功提升品质获得 1 层 IQ（最大 10）；**每层使加工动作效率 +10%** |
| Practice Makes Perfect | 製作練習 | Lv15 | 解锁"制作练习"（不消耗素材的模拟制作） |
| Basic Synthesis Mastery | 作業マスタリー | Lv31 | Basic Synthesis 效率 → 120 |
| Quality Assurance | 品質精査 | Lv63 | **略微提高出现 Good 状态的概率**（职业任务解锁） |
| Rapid Synthesis Mastery | 突貫作業マスタリー | Lv63 | Rapid Synthesis 效率 → 500 |
| Careful Synthesis Mastery | 模範作業マスタリー | Lv82 | Careful Synthesis 效率 → 180 |
| Groundwork Mastery | 下地作業マスタリー | Lv86 | Groundwork 效率 → 360 |
| Delicate Synthesis Mastery | 精密作業マスタリー | Lv94 | Delicate Synthesis 作业效率 → 150 |
| Expedience | 匠の好機 | Lv96 | 使用 Hasty Touch 时赋予 Expedience：**Hasty Touch 升级为 Daring Touch** |

> **7.x 新增动作梳理（6.0 → 7.0 的主要增量）**：`Immaculate Mend`（Lv98）、`Trained Perfection`（Lv100）、`Refined Touch`（Lv92）、`Daring Touch` + `Expedience` 特性（Lv96）、`Quick Innovation`（Lv96 专家）。这意味着 **Dawntrail 为生产增加了"高耐久续航 + 零耐久窗口 + 免费 60% 加工"的三件套**，进一步把顶级生产推向"长循环、低随机"。

### 2.4 技能循环逻辑（"手法"）与一键宏文化

#### 2.4.1 循环的基本三段式

社区（🟨 The Balance / Teamcraft / NGA）总结的标准思路：

1. **开局（Opener）**：用 `Muscle Memory`（推 300% 进度）或 `Reflect`（推 300% 品质 + 1 层 IQ）建立初始状态。二者互斥——选哪个取决于"进度吃紧"还是"品质吃紧"。
2. **中盘（Quality Phase）**：在 `Innovation` / `Great Strides` / `Waste Not II` / `Manipulation` 的覆盖下，用 `Preparatory Touch` / `Prudent Touch` / `Trained Finesse` 堆 IQ 与品质。
3. **收尾（Finisher）**：`Great Strides` → `Byregot's Blessing`（爆发品质） → `Veneration` → `Groundwork` / `Careful Synthesis`（爆发进度）。

#### 2.4.2 宏（Macro）与"一键生产"

- 🟦 FFXIV 客户端内置 **/macro** 系统，支持 `/ac "技能名" <wait.N>` 序列。因为制作是**回合制**的，宏可以完整复现一套固定手法。
- 🟨 **"一键宏"文化**：由于高品质生产的手法是固定的（在属性达标 + 状态随机的情况下），社区发展出"整套宏贴进聊天框 → 按一个键 → 自动完成整次制作"的玩法。典型宏长度 13–15 行（客户端单宏上限 15 行，可用双宏 `/macroicon` 或"宏 #1 / 宏 #2"接续）。
- 🟨 **宏的代价**：`<wait.N>` 的最小单位是 1 秒，且宏**无法对随机状态（Good/Excellent）做出反应**。因此"宏生产"通常会**放弃对 Good 状态的利用**，理论产出低于手动最优解。这就是所谓的"**宏友好（macro-friendly）**"配方设计：只要属性堆够，固定循环就能 100% 达标。
- 🟨 **典型社区宏示例**（来自 Eorzean Tavern 的 1–100 升级指南，Lv95–100 收藏品用）：

```
/ac "Muscle Memory" <wait.3>
/ac "Final Appraisal" <wait.2>
/ac Veneration <wait.2>
/ac "Waste Not II" <wait.2>
/ac Groundwork <wait.3>
/ac "Delicate Synthesis" <wait.3>
/ac "Delicate Synthesis" <wait.3>
/ac Innovation <wait.2>
/ac "Preparatory Touch" <wait.3>
/ac "Preparatory Touch" <wait.3>
/ac "Preparatory Touch" <wait.3>
/ac "Preparatory Touch" <wait.3>
/ac "Master's Mend" <wait.3>
/ac "Trained Finesse" <wait.3>
/echo Macro #1 finished <se.1>
```
（第二段宏接 `Great Strides → Byregot's Blessing → Veneration → Groundwork`）
> 🟨 来源：[Eorzean Tavern – FFXIV Crafting Leveling Guide (1–100)](https://eorzeantavern.com/doh-leveling/)

- 🟥 **"一键宏"不是官方术语**，也没有官方教程；它是社区自发形成的操作范式。官方在 6.0 加入了"**制作练习（Trial Synthesis）**"，可以零成本试跑手法，客观上鼓励了宏的迭代。

> **对放置游戏的启示（原创）**：FFXIV 的"宏生产"本质上已经把生产**降维成一次点击 + 一段确定的时间序列**。这恰好是放置游戏"离线产出"的天然接口——玩家配置一套"生产方案"，系统按方案离线结算。差别只在于 FFXIV 仍要求玩家在线等待（每次制作 20–40 秒）。

### 2.5 素材状态（Condition）系统

每推进一个回合，素材状态会重新随机。不同状态会**乘算**在加工效率上。官方只公布了部分状态，完整概率表来自社区逆向（🟨）。

| 状态 | 英文 | 日文 | 效果 | 出现率（🟨 社区） |
|---|---|---|---|---|
| 通常 | Normal | 通常 | 无修正 | 基准 |
| 高品质 | **Good** | 高品質 | **品质提升量 ×1.5** | 约 11%（有 `Quality Assurance` 特性后略高） |
| 最高品质 | **Excellent** | 最高品質 | **品质提升量 ×4**（旧资料片为 ×2 或 ×4，随版本调整） | 约 4% |
| 低品质 | **Poor** | 低品質 | 品质提升量 **×0.5** | 少量 |
| 集中 | Centered | 集中 | 部分旧版本状态，现多用于"专家配方" | 专家配方专属 |
| 坚固 | Sturdy | 頑丈 | 该回合耐久消耗减半 | 专家配方专属 |
| 柔软 | Pliant | 柔軟 | 该回合 CP 消耗减半 | 专家配方专属 |
| 可塑 | Malleable | 可鍛 | 该回合作业效率提升 | 专家配方专属 |
| 最佳 | Primed | 最良 | 该回合加工效率提升 | 专家配方专属 |
| 吉兆 | Good Omen | 吉兆 | 特定条件下强化 | 专家配方专属 |

**联动技能**：
- `Tricks of the Trade`（秘訣）：仅 Good/Excellent 可用，回复 20 CP。
- `Precise Touch`（集中加工）：仅 Good/Excellent 可用，150% 效率 + IQ +1。
- `Intensive Synthesis`（集中作業）：仅 Good/Excellent 可用，400% 作业。
- 专家动作 `Heart and Soul`（一心不乱）：临时取消上述限制。

> 🟥 **"专家配方（Expert Recipe）"** 是一类特殊的配方，拥有独立的、更复杂的状态池与专属技能栏（不使用常规 33 技能）。伊修加德复兴（Ishgard Restoration）与宇宙探索（Cosmic Exploration）中的高难度配方多属此类。**专家配方的完整状态概率与技能表未包含在本文范围内**，建议查阅 Teamcraft 的 Expert Recipe 模拟器。

### 2.6 HQ（高品质）机制与其版本变迁

#### 2.6.1 HQ 的定义与判定

- 🟦 官方原文（意译）：
  > 制作出的物品可能成为比普通物品性能更高的 **HQ（High Quality）** 物品。成为 HQ 的概率由制作成功时的 **"HQ 率"** 决定；HQ 率通过 Lv5 的「加工」等动作提升"品质"来升高。
- 🟨 **机制**：品质条填充比例 → HQ 率。品质填满（100%）时 HQ 率为 100%。旧版本（4.x）中品质达到约 50% 即有一定 HQ 概率，未满则按比例。
- 🟨 **HQ 的收益**：装备 HQ 提供额外的属性（通常约为 NQ 的 +8%~+12% 主属性）；**食物/药水 HQ** 提供更长持续时间或更强效果（例如 HQ 食物通常是 NQ 的 1.2–1.3 倍效果）；素材 HQ 在制作时提供初始品质加成。

#### 2.6.2 6.0 的 HQ 大改（**重要**）

🟦 官方 Lodestone 公告《Changes to HQ Items in Patch 6.0》（本次调研取到法文版页面，内容一致）明确列出：

> **不再能获得 HQ 版本的道具：**
> - **采集职业（园艺师 / 采矿工 / 捕鱼人）可采集的道具**
> - 敌人掉落的素材
> - 用亚拉戈诗学/票据交换获得的素材
> - **不可制作的道具**（例如某些任务获得品）
>
> **装备与可制作道具（含铁锭等中间素材）仍然可以获得 HQ。**

**后续影响**：已在背包中的旧 HQ 道具会保留，但
- 制作时**不再提供初始品质加成**；
- 交付理符 / 大国防联军筹备 / 城市建设时**不再有 HQ 奖励加成**；
- **不能再交易，也不能上架 / 购买于市场板**（需先降格为 NQ 才能交易）。

🟦 来源：[Lodestone Topics – À propos de l'abandon d'une partie des objets HQ](https://na.finalfantasyxiv.com/lodestone/topics/detail/41725f7debe69664ef11def1ee1b772705aa453a)

> **设计意图（社区解读 🟨）**：HQ 采集物导致玩家背包里堆积大量无意义 HQ 素材，占据仓库、干扰市场、增加 UI 噪音。官方选择"砍掉低价值 HQ，保留高价值 HQ"——**HQ 从"通用属性"被收窄为"制作产出的差异化维度"**。

#### 2.6.3 7.x 的 HQ 现状

- 🟨 **HQ 仍然存在于可制作装备上**：7.4 版本的"战职绿装（制作装）"被社区攻略标注为 **iLv 770 HQ**（NGA 攻略标题：「7.4版本战职770HQ更新完毕」）。
- 🟨 **HQ 食物/药水** 仍是高难副本（Savage）玩家的刚需消耗品，也是生产者的主要现金流来源。
- 🟦 官方 7.x 生产指南仍完整保留"High-quality Items"章节与品质条、"HQ 率"的教学，说明 HQ 机制未被废除。
- 🟨 **收藏品（Collectables）** 使用另一套"品质 → 收藏价值（Collectability）"的映射：**制作品的收藏价值 = 品质 ÷ 10（向下取整）**。

> 🟥 **重要澄清（避免误传）**：坊间存在"7.0 取消了 HQ"的说法，**本次调研未找到任何支持该说法的官方来源，且与 7.4 社区攻略中的 "770HQ" 表述冲突**。可以确认的是：**取消 HQ 的是 6.0 的"采集物/怪物掉落"，不是 7.0 的"制作物"**。

### 2.7 收藏品（Collectables）与专家（Specialist）

#### 2.7.1 收藏品

- 🟦 官方：部分生产/采集职业内容需要交付"收藏品"。收藏品拥有 **"收藏价值（Collectability）"** 数值，**收藏价值越高，交付报酬越高**（JP 原文：「収集価値」が高いものほど、納品時に高い報酬を得ることができます）。
- 🟨 **制作品的收藏价值 = 品质 ÷ 10（向下取整）**。
- 🟨 **采集品的收藏价值** 由"鉴定动作"（Scour / Brazen Prospector / Meticulous Prospector 等）累积，每次约 +150~300，取决于属性。
- 🟨 **鱼类的收藏价值** 由捕获尺寸决定，随 Perception 提升。
- 🟨 **实际报酬分档示例**（Eorzean Tavern 整理，DT 数据）：

| 物品 | 等级 | 收藏价值区间 → 票据报酬 |
|---|---|---|
| Rarefied Claro Walnut Fishing Rod | CRP Lv100 | 660–899 → 120 票据；900–1139 → 134；1140+ → **144** |
| Rarefied Claro Walnut Grinding Wheel | Lv99 | 627–854 → 165；855–1082 → 181；1083+ → **198** |
| Rarefied Integral Fishing Rod | Lv90 | 396–539 → 95；540–683 → 104；684+ → **114** |

（🟨 来源：[Eorzean Tavern – Collectables & Custom Deliveries](https://eorzeantavern.com/collectables-and-custom-deliveries/)）

> **设计要点**：收藏品是"品质条"的**第二种消费方式**——HQ 让品质变成"更好的同一件物品"，收藏品让品质变成"更多的货币"。这在放置游戏里可以直接抽象为"**同一产线支持两种结算模式：优质产出 or 兑换点数**"。

#### 2.7.2 专家（Specialist / マイスター）

- 🟨 **每人最多可选 3 个专家生产职业**，通过 **Revenant's Toll（モードゥナ）的 Lydirlona (X:22 Y:6)** 办理。
- 🟨 **收益**：装备专家的"魂晶（Soul Crystal）"可获得 **+20 Craftsmanship / +20 Control / +15 CP**。
- 🟨 **专家专属动作**：Careful Observation（Lv55）、Heart and Soul（Lv86）、Quick Innovation（Lv96）；均消耗 **Crafter's Delineation（製図用紙）**。
- 🟨 **变更专家** 有冷却期（历史上有 1 周左右的限制），需谨慎选择。🟥 具体冷却时长请以游戏内为准。
- 🟨 **专家配方的制作（Expert Recipe）** 与普通配方在 UI 上区分，且 `Trained Eye` 对其无效。

#### 2.7.3 秘籍（Master Recipe Book / 秘伝書）

- 🟨 **每个生产职业有 I–XII 共 12 本秘籍**，每资料片发布 2 本（一个在中期等级上限、一个在最终等级上限），**购买并阅读即解锁配方，无需任务**。
- 🟨 对应关系（示例）：

| 秘籍 | 资料片 & 等级 |
|---|---|
| Master Carpenter III / IV | Heavensward，Lv55–60 |
| Master Goldsmith V | Stormblood，Lv70 |
| Master Leatherworker VII | Shadowbringers，Lv80 |
| Master Armorer IX | Endwalker，Lv90 |
| Master Blacksmith XI | **Dawntrail，Lv100** |
| Master Carpenter XII | **Dawntrail，Lv100** |

- 🟨 **获取途径**：用对应时期的**票据**在票据兑换 NPC 处购买（也可用其他货币/素材）。
- 🟨 **秘籍解锁的是"高价值可交易成品"**：新资料片初期的秘籍装备/家具/食物是市场板上最赚钱的一批物品，因此「秘籍首发抢购」是 FFXIV 经济的一个周期性事件。
- （🟨 来源：[Eorzean Tavern – Master Recipe Books & Scrip Exchange](https://eorzeantavern.com/master-recipe-books-and-scrips/)）

### 2.8 票据（Scrip）体系

票据是生产/采集的**专用货币**，通过交付收藏品、完成"天空工房/宇宙探索"任务等获得，用于兑换秘籍、装备、素材、魔晶石、幻化棱晶等。

| 资料片 | 票据名称 | 备注 |
|---|---|---|
| Heavensward | **Blue → Red** Crafters'/Gatherers' Scrip | 早期有蓝票→红票的过渡 |
| Stormblood | **Yellow** Crafters'/Gatherers' Scrip | **4.0 同时废除了票据周上限** |
| Shadowbringers | **White** Crafters'/Gatherers' Scrip（+ **Skybuilders' Scrip**，5.11 随复兴追加） | 天空工房票据为复兴专用 |
| Endwalker | **Purple** Crafters'/Gatherers' Scrip | |
| **Dawntrail（当前）** | **Orange** Crafters'/Gatherers' Scrip | |

🟨 **票据周上限**：自 **4.0 起彻底取消**，现行无任何周上限；唯一限制是"能制作/采集多少收藏品"。
🟨 **兑换地点（DT 橙票）**：Tuliyollal (16.3, 11.1)、Solution Nine (9.1, 13.3)、Kenawna, Shaaloani (14.2, 19.2)；旧资料片票据 NPC 仍然可用。
（🟨 来源：[Eorzean Tavern](https://eorzeantavern.com/master-recipe-books-and-scrips/)）

> **设计要点**：票据是典型的"**双货币**"设计（Gil = 玩家间货币，Scrip = 系统货币）。其关键作用是**把"生产/采集活动"与"战斗经济"解耦**——即使市场板价格崩溃，玩家仍可通过票据稳定获得装备与素材。放置游戏中这对应"**活动专属代币**"与"**可交易通货**"的分离。

#### 2.8.1 7.x 生产相关的重要改动（官方 Patch Notes 汇总，🟨 由社区整理转述）

以下条目来自社区对 Patch 7.0 官方 Patch Notes 的整理（**建议在发布前用官方 Patch Notes 原文复核**）：

- 新增 Lv92 / Lv96 / Lv98 / Lv100 生产动作与 Lv96 特性（见 §2.3）。
- 新增 **Orange Crafters'/Gatherers' Scrip**（橙票）与 Lv100 兑换线。
- **收藏品交付经验标准化**（统一按等级/星级给经验）。
- 旧"复兴（Restoration）"系配方**改名**。
- 新增**灵砂（Aethersand）相关精炼产物**。
- 新增 **Swimbait（泳饵）** 这一鱼饵分类。
- **鱼类图鉴（Fish Guide）显示所需 Hookset 类型**（Powerful / Precision）。
- **非采集职业状态下死亡不再清零 GP**。
- **采集产生的 Spiritbond（灵性）改为按装备等级计算**（原为按采集行为固定值）。

> ⚠️ 上面这些点中，**"GP 死亡不清零""图鉴显示 Hookset""Spiritbond 按装备等级"** 三条对放置/自动化设计影响较大，但均来自社区转述，**未逐条核对官方 Patch Notes**，标注为 🟥。

---

## 3. 采集（Gathering）核心机制

### 3.1 采集三大属性

| 属性 | 英文 | 日文 | 作用 |
|---|---|---|---|
| 获得力 | **Gathering** | 獲得力 | 提高**获得率**（单次采集成功的概率）；也影响部分技能的数值（如 Bountiful Yield II 的产量上限、Collector's Focus 的触发） |
| 识别力 | **Perception** | 識別力 | 影响 **HQ 率**（6.0 前）→ 现主要影响**采集品收藏价值**的上升量、**钓鱼尺寸/大物概率**、部分技能效果强度 |
| 采集力 | **GP** | GP（ギャザラー・ポイント） | 使用采集技能的燃料；**会自然回复**（与生产的 CP 不同） |

**GP 回复机制（🟦 官方特性表）**

| 特性 | 习得 | 效果 |
|---|---|---|
| Enhanced GP Regeneration | Lv70 | 基础 GP 自然回复量 **+1** |
| Enhanced GP Regeneration II | Lv80 | 基础回复量累计 **+2**；**采集成功时额外 +1** |
| Enhanced GP Regeneration III | Lv83 | 基础回复量累计 **+3**；采集成功时额外 +1 |

> **设计要点**：GP 的"**自然回复 + 采集动作额外回复**"是一个典型的**节奏阀门**：玩家必须停手等 GP，或使用 Cordial（コーディアル）等道具回复 GP。顶级采集的产出上限受 **GP 回复率**而非"手速"约束。这为放置游戏提供了极好的"**体力 / 行动力**"参照。

### 3.2 采集节点（Gathering Point）类型

| 类型 | 英文 | 日文 | 特征 | 出现条件 |
|---|---|---|---|---|
| 普通节点 | Regular | 通常の採集場所 | 常驻，无限次刷新 | 常时 |
| **未知节点** | **Unspoiled** | **未知の採集場所** | 只在**特定 ET 时间窗**出现（通常 2 小时一个循环，窗长约 30–55 分钟） | 需 Lv46 的 `Truth of Mountains / Truth of Forests` 才能在导航地图上看到 |
| **传说节点** | **Legendary** | **伝説の採集場所** | 更稀有，需要更高的获得力 + `Luck of the Mountaineer`（Lv55，强制显形） | ET 时间窗 + 前置条件 |
| **幻之节点** | **Clouded** | **幻の採集場所** | 需要特定条件（如天气、前置采集）才显形 | 同上 |
| **以太节点** | **Ephemeral** | **エーテリアル（以太）节点** | 采集 **水晶/簇（Crystal / Cluster）**，出现于特定 ET 窗 | 需完成特定任务 |
| **隐藏道具** | **Hidden** | **HIDDEN アイテム** | 节点内隐藏的稀有产出，需 `Luck of the Mountaineer` 概率/强制显现 | Lv55 |
| 理符节点 | Levequest node | リーヴ関連 | 只在理符中存在的临时节点；**Revisit 特性对其无效** | 理符进行中 |
| 收藏品节点 | Collectable | 収集品 | 可采集为收藏品的普通节点（需解锁 `Collect`） | 需完成支线「Inscrutable Tastes」 |

> 🟦 官方对 MIN 的角色动作 `Truth of Mountains` 的描述：*"Further surveys the landscape to uncover **unspoiled, legendary, and clouded** mineral deposits and rocky outcrops."* —— 三类特殊节点被官方明确并列。

### 3.3 采矿工 / 园艺工 动作全表（7.x / Lv100 时点）

#### 3.3.1 职业动作（Class Actions）

数据来源：🟦 [官方 Miner 页](https://na.finalfantasyxiv.com/crafting_gathering_guide/miner/)（MIN 数据为官方原文）。
BOT 与 MIN **一一对应**，仅名称不同；下表中标注 `【BOT】` 的项目为园艺师的对应名。

| # | 英文名（MIN） | 日文名 | 中文 | 习得 | GP | 效果 |
|---|---|---|---|---|---|---|
| 1 | Sharp Vision | シャープビジョン | 锐利视觉 | Lv4 | 50 | 获得率 **+5%**（对获得率 0% 的物品无效） |
| 2 | Sharp Vision II | シャープビジョンII | 锐利视觉 II | Lv5 | 100 | 获得率 **+15%** |
| 3 | Sneak | スニーク | 潜行 | Lv8 | — | 不被 **自身等级 +4** 以下的敌人袭击 |
| 4 | Sharp Vision III | シャープビジョンIII | 锐利视觉 III | Lv10 | 250 | 获得率 **+50%** |
| 5 | Mountaineer's Gift I 【BOT】 | 富鉱なる賜物 I | 富矿的恩赐 I | Lv15 | 50 | **Gatherer's Boon（获得数奖励）触发率 +10%** 🟥 BOT 对应名待核 |
| 6 | The Twelve's Bounty | 十二神の加護 | 十二神的加护 | Lv20 | 150 | 碎片/水晶/簇的获得数 **+3**（节点必须产出这些） |
| 7 | Clear Vision | クリアビジョン | 清晰视觉 | Lv23 | 50 | **下一次**采集的获得率 **+15%** |
| 8 | Bountiful Yield | バウンティフルイールド | 丰收 | Lv24 | 100 | **下一次**采集的获得数 **+1** |
| 9 | Solid Reason | 石工の理 | 石工之理 | Lv25 | 300 | **追加 1 次采集次数**；采集收藏品时恢复 1 点 integrity；**50% 概率赋予 Eureka Moment** |
| 10 | King's Yield | キングスイールド | 王者丰收 | Lv30 | 400 | 获得数 **+1** |
| 11 | King's Yield II | キングスイールドII | 王者丰收 II | Lv40 | 500 | 获得数 **+2** |
| 12 | **Collect** | **収集品採集** | 采集收藏品 | Lv50 | — | 以**当前收藏价值**采集 1 个收藏品；消耗 1 点 integrity（支线解锁） |
| 13 | **Scour** | **純化** | 纯化 | Lv50 | — | 提升收藏价值；上升量取决于**获得力**；消耗 1 integrity（支线解锁） |
| 14 | **Brazen Prospector** 【BOT】Brazen Woodsman | **大胆純化** | 大胆纯化 | Lv50 | — | 收藏价值上升量 = Scour 的 **50%–150%**（随机）；消耗 1 integrity |
| 15 | **Meticulous Prospector** 【BOT】Meticulous Woodsman | **慎重純化** | 慎重纯化 | Lv50 | — | 收藏价值上升量 = Scour 的 **75%**；消耗 1 integrity，**有概率不消耗**（概率取决于获得力） |
| 16 | **Scrutiny** | **集中検分** | 集中检分 | Lv50 | 200 | 提升下一次纯化动作的收藏价值上升量（提升率取决于**识别力**） |
| 17 | Mountaineer's Gift II | 富鉱なる賜物 II | 富矿的恩赐 II | Lv50 | 100 | Gatherer's Boon 触发率 **+30%**；**可与 I 叠加** |
| 18 | Luck of the Mountaineer 【BOT】待核 | 山師の眼力 | 山师的眼力 | Lv55 | 200 | **强制显现节点的 HIDDEN 道具**（职业任务解锁） |
| 19 | Bountiful Yield II | バウンティフルイールドII | 丰收 II | Lv68 | 100 | 下一次采集获得数 +1~+3（取决于**获得力**）（职业任务解锁） |
| 20 | The Giving Land | 大地の恵み | 大地的恩惠 | Lv74 | 200 | 碎片/水晶/簇获得数**随机增加**；**可与 The Twelve's Bounty 叠加** |
| 21 | Nald'thal's Tidings | ナルザルの福音 | 纳尔札尔的福音 | Lv81 | 200 | **Gatherer's Boon 的产量 +1** |
| 22 | Collector's Focus | バリューフォーカス | 价值聚焦 | Lv85 | 100 | 下一次收藏品动作的 **Collector's Intuition 触发率 +75%** |
| 23 | Wise to the World | 理知興起 | 理智兴起 | Lv90 | — | **追加 1 次采集次数**；收藏品时恢复 1 integrity；**需 Eureka Moment 效果** |
| 24 | Priming Touch | プライミングタッチ | 预备之触 | Lv95 | 100 | 下一次 `Meticulous Prospector` **不消耗 integrity 的概率翻倍** |

**Gatherer's Boon（获得数奖励）**：一次成功采集时，有概率额外多获得几个物品。这是采集"暴击"机制，受 `Mountaineer's Gift I/II` 与 `Nald'thal's Tidings` 影响。

> 🟥 **待核项**：
> - #5 园艺师对应技能（`Mountaineer's Gift` 的 BOT 版）英文名；
> - #18 园艺师对应技能（`Luck of the Mountaineer` 的 BOT 版）英文名。
> 两条的**日文原名分别为「富鉱なる賜物」与「山師の眼力」在 MIN 侧的名称；BOT 侧日文名不同但结构对称**。社区来源确认 BOT 的收藏品系技能为 `Brazen Woodsman` / `Meticulous Woodsman`（🟨 Eorzean Tavern）。

#### 3.3.2 采集职能动作（Gatherer Role）

**这三个职业共享**（学会后任何采集职业都能用）。

| 英文名 | 日文名 | 习得 | 冷却 | 效果 |
|---|---|---|---|---|
| Prospect | プロスペクト | Lv1 | — | 显示可采掘的矿脉/岩场（切到采矿工时**自动发动**） |
| Lay of the Land | ランドサーベイ | Lv3 | 20 秒 | 定位**最近**的矿脉/岩场（需 Prospect 生效） |
| Lay of the Land II | ランドサーベイII | Lv5 | 20 秒 | 定位**等级最高**的矿脉/岩场 |
| Truth of Mountains | トゥルー・オブ・ミネラル | Lv46 | — | 显示**未知 / 传说 / 幻**的矿脉与岩场 |

BOT 侧：`Arbor Call` / `Arbor Call II` / `Truth of Forests`。
FSH 侧（均为 Lv61/65，刺突渔相关）：`Fathom` / `Shark Eye` / `Shark Eye II` / `Truth of Oceans`。

#### 3.3.3 采集特性（Traits，MIN 为例）

| 特性 | 习得 | 效果 |
|---|---|---|
| Auto Prospect | Lv2 | 切换到采矿工时自动发动 Prospect |
| Stone Whisperer I | Lv11 | 可发现节点的**获得率**类特殊性质 |
| Stone Whisperer II | Lv16 | 可发现节点的**采集次数**类特殊性质 |
| Stone Whisperer III | Lv21 | 可发现节点的**获得数奖励触发率**类性质 |
| Stone Whisperer IV | Lv26 | 可发现节点的**获得数**类性质 |
| Auto Sneak | Lv27 | 切换职业/切换区域时自动发动 Sneak |
| Enhanced Twelve's Bounty I | Lv41 | 十二神的加护扩展到**水晶（Crystal）** |
| Nymeia's Ward | Lv42 | 部分物品（含水系水晶）偶尔获得数增加 |
| Enhanced Twelve's Bounty II | Lv50 | 十二神的加护扩展到**簇（Cluster）** |
| Stone Whisperer V | Lv53 | 更容易发现"潜在特殊性质"（职业任务解锁） |
| One with the Mountain | Lv60 | 切换采矿工时自动发动 Truth of Mountains |
| Bountiful Yield Mastery | Lv68 | Bountiful Yield → Bountiful Yield II |
| Enhanced GP Regeneration I/II/III | Lv70 / 80 / 83 | 见 §3.1 |
| Enhanced Solid Reason | Lv90 | 使 Solid Reason 附带 **50% 概率赋予 Eureka Moment** |
| **Revisit** | **Lv91** | **采尽节点后，有概率完全恢复 integrity 与采集次数，并回满 GP**（所有采集增益解除）；**理符等特定节点不触发** |
| **Collector's High Standard** | **Lv100** | 有概率把 `Collector's Standard` 升级为 `Collector's High Standard`：**Brazen Prospector 的收藏价值提升必为最大值**；**Meticulous Prospector 不消耗 integrity 的概率 +40%** |

> **`Revisit`（Lv91）的战略意义**：这是 7.x 采集收益的结构性提升——相当于"**节点刷新重置**"。它直接抬高了**高价值限时节点**的单次产出期望，也让"GP 全回复"成为一次免费的第二轮。放置游戏中可等价为"**稀有节点的再次挑战机会**"。

### 3.4 收藏品采集的完整流程（MIN/BOT）

```
1. 找到产出目标物品的节点
2. 使用 Collect（収集品採集）进入"收藏品模式"——此后节点有 integrity（耐久/次数）概念
3. 目标物显示当前 Collectability（收藏价值）
4. 反复使用 Scour / Brazen Prospector / Meticulous Prospector 提升收藏价值
   - Scour：稳定、按获得力提升
   - Brazen：50%–150% 随机（高风险高收益）
   - Meticulous：75%，有概率不消耗 integrity
5. 用 Scrutiny 强化下一次纯化；用 Collector's Focus / Priming Touch 提升触发率
6. 再次使用 Collect 把当前收藏价值"落袋"
7. 达到阈值即获得对应档位票据
```

> **与制作的对称性**：制作是"**品质条 + 耐久**"，采集是"**收藏价值 + integrity**"。两者在结构上完全同构——**这就是 FFXIV 生活玩法的核心设计语法：一个资源条（进度/收藏价值）+ 一个耗尽制资源（耐久/integrity）+ 一个燃料（CP/GP）+ 一个随机状态层**。放置游戏可以直接复用这个四元组。

### 3.5 钓鱼（Fisher）专章

钓鱼是 FFXIV 三个采集职业中**机制最独立**的一个，也是唯一带"**随机性与知识门槛**"的采集方式。

#### 3.5.1 钓鱼的完整循环

```
选饵 → Cast（抛竿）→ 等待咬钩 → [可选] Hookset 类型判定 → Hook（收线）
   ↓
[大物/特定条件下] Mooch（泳がせ釣り，用已钓到的鱼当饵）→ 再循环
```

🟦 官方关键动作（Lv100 时点，节选与全部）：

| 英文名 | 日文名 | 习得 | GP | 效果 |
|---|---|---|---|---|
| Bait | 釣り餌 | Lv1 | — | 选择鱼饵 |
| Cast | キャスティング | Lv1 | — | 抛竿 |
| Hook | フッキング | Lv1 | — | 收线 |
| Quit | 中断 | Lv1 | — | 中止钓鱼、收起渔具（清除钓鱼专属状态） |
| Cast Light | キャストライト | Lv1 | — | 让竿尖发光（视觉辅助） |
| Rest | 竿上げ | Lv1 | — | 中止钓鱼但保持持竿状态 |
| **Chum** | 撒き餌 | Lv5 | 100 | 缩短下一次咬钩时间；**取消当前 mooch 机会** |
| Sneak | スニーク | Lv8 | — | 潜行 |
| **Patience** | ペーシェンス | Lv15 | 200 | **大鱼概率 +50%**；**Hook 成功率 −40%**；60 秒 |
| **Powerful Hookset** | ストロングフッキング | Lv15 | 50 | 抵消 "Inefficient Hooking"；对**弱咬钩**鱼无效 |
| **Precision Hookset** | プレシジョンフッキング | Lv15 | 50 | 抵消 "Inefficient Hooking"；对**强咬钩**鱼无效 |
| **Thaliak's Favor** | サリャクの恩寵 | Lv15 | — | **回复 150 GP**；消耗 **Angler's Art 3 层** |
| Release | リリース | Lv22 | — | 放生（本次钓鱼中同类鱼自动放生） |
| Release List | リリース一覧表示 | Lv22 | — | 设置自动放生名单 |
| **Mooch** | 泳がせ釣り | Lv25 | — | 用特定**大尺寸**鱼作饵 |
| **Snagging** | 引掛釣 | Lv36 | — | 加装副钩，可钓到通常钓不到的鱼/道具 |
| **Makeshift Bait** | 熟漁の技 | Lv48 | — | 145 秒内，**普通尺寸鱼**也可用于 Mooch 或 Spareful Hand；消耗 Angler's Art 5 |
| Collect | 収集品採集 | Lv50 | — | 以收藏品形式保留渔获 |
| **Fish Eyes** | フィッシュアイ | Lv57 | **550** | 60 秒内**无视时间条件**感知鱼的存在 |
| **Patience II** | ペーシェンスII | Lv60 | **560** | **大鱼概率 +80%**；**Hook 成功率 −75%**；145 秒；且普通尺寸鱼更易出现大体型（职业任务解锁） |
| **Gig** | ギギング | Lv61 | — | **刺突渔**：发射鱼枪；提升警戒度（命中数越多上升越少） |
| **Mooch II** | 泳がせ釣りII | Lv63 | 100 | 用**普通尺寸**鱼作饵；15 秒 |
| **Veteran Trade** | ベテラントレード | Lv63 | 200 | 使刚钓到的鱼不再出现 |
| **Vital Sight** | 選魚眼 | Lv64 | — | 刺突渔：放大鱼的判定框；消耗 Angler's Art 2 |
| **Double Hook** | ダブルフッキング | Lv65 | 400 | 一次钓上 **≥2 条**（数量取决于鱼种与获得力） |
| **Salvage** | サルベージ | Lv67 | — | 刺突渔中可获得**宝图** |
| **Nature's Bounty** | ネイチャーバウンティ | Lv69 | 100 | 下一次刺突渔更易获得大尺寸（概率取决于识别力） |
| **Surface Slap** | トレードリリース | Lv71 | 200 | 使刚钓到的鱼不再出现；15 秒；**覆盖 Identical Cast** |
| **Baited Breath** | ホールドブレス | Lv75 | 300 | 刺突渔：降低周围鱼的警戒度（警戒度超阈值时不可用） |
| **Identical Cast** | セイムキャスト | Lv79 | 350 | 确保钓到与上次相同的鱼；15 秒；**覆盖 Surface Slap** |
| **Prize Catch** | 大物狙い | Lv81 | 200 | 保证下一次钓到**大尺寸**鱼 |
| **Electric Current** | エレクトリックカレント | Lv85 | — | 刺突渔：**电击捕获视野内全部鱼**；需 Catch Counter 10；每个渔场 1 次 |
| **Triple Hook** | トリプルフッキング | Lv90 | **700** | 一次钓上 **≥3 条** |
| **Spareful Hand** | 熟漁の妙案 | Lv91 | 100 | 把特定大尺寸鱼**保存为泳饵**；在当前钓点可当普通饵使用 |
| **Big-game Fishing** | 大物の知識 | Lv95 | — | 提升下一次大尺寸鱼出现"**特大个体**"的概率（随识别力）；消耗 Angler's Art 2 |
| **Ambitious Lure** | アンビシャスルアー | Lv100 | 10/20/30 | 吸引**大口鱼**（对应 Powerful Hookset）；可在一场钓鱼中使用 3 次，效果与 GP 消耗递增；可能吸引稀有鱼 |
| **Modest Lure** | モデストルアー | Lv100 | 10/20/30 | 吸引**小口鱼**（对应 Precision Hookset）；同上 |

> **`Ambitious Lure` / `Modest Lure` 是 7.0 新增的 Lv100 钓鱼动作**，用"**递进成本**"（10 → 20 → 30 GP）实现"越用越强"的累积型增益。这是放置游戏里非常值得借鉴的**递增成本技能**范式。

#### 3.5.2 钓鱼的关键机制

| 机制 | 说明 |
|---|---|
| **大尺寸（Large-sized）** | 鱼分 Normal / Large 两档；Large 才有"尺寸记录"价值与特殊用途（Mooch 饵、成就） |
| **Fish Guide（鱼类图鉴）** | 记录每种鱼的钓点、饵、时间、天气、尺寸记录；7.0 起**显示所需 Hookset 类型** |
| **Angler's Art** | 钓到大型鱼时概率获得的层数（最大 10），用于 `Thaliak's Favor` / `Makeshift Bait` / `Vital Sight` / `Big-game Fishing` |
| **Fisher's Intuition（直感）** | 满足特定条件（钓到若干指定鱼）时触发的"**特殊窗口**"，可钓到稀有鱼/鱼王；不消耗资源，纯知识门槛 |
| **Mooch（泳饵）** | 用钓到的鱼继续钓更大的鱼，形成"食物链"式钓鱼链 |
| **刺突渔（Spearfishing）** | 6.0 新增；水下用鱼枪，有**警戒度（Wariness）**与**命中数**机制 |
| **海洋钓鱼（Ocean Fishing）** | 5.2 新增，20 分钟一班船的集体钓鱼活动，有"航线 + 目标"评分 |
| **鱼王 / 鱼皇（Big Fish）** | 全游戏约 1000+ 种可钓物；鱼王受"窗口 + 天气 + 饵 + 前置"多重约束 |

#### 3.5.3 钓鱼特性（Traits，官方）

| 特性 | 习得 | 效果 |
|---|---|---|
| Gulleye | Lv15 | 可发现自身等级以下的"穴场"钓点 |
| Angler's Art | Lv15 | 钓到大型鱼时概率获得 Angler's Art（最大 10） |
| Auto Sneak | Lv27 | 切换渔师或换区时自动潜行 |
| Sandfishing（砂海釣り） | Lv35 | 可在**砂海**抛竿 |
| Mooch 效果提升 | Lv48 | —（与 Makeshift Bait 关联） |

> 🟥 上表后两项的确切英文特性名未在本次调研中完整核实（官方页面的特性表在抓取时被截断）。

### 3.6 灵砂与精炼（Aetherial Reduction）

- 🟨 **Aetherial Reduction（精選 / 精炼）**：DoL 的隐藏功能，对**可精炼的采集物**（多为限时/传说节点的产物，如各种 "Aethersand" 原料）使用，产出 **Shard / Crystal / Cluster** 与 **Aethersand（灵砂）**。
- 🟨 **Aethersand（灵砂）** 是高等级生产（尤其是秘籍配方）的必需素材，因此**灵砂采集是采集者的核心现金流之一**。7.x 的 NGA 攻略标题即包含「7.x传承录限时材料与**灵砂**采集攻略」。
- 🟥 **Aetherial Reduction 的解锁等级与具体产出表**未在本次调研中核实；社区普遍记为 **Lv56 解锁**（需完成相关任务）。请以游戏内为准。

### 3.7 采集的"知识型"设计点（对放置游戏的启发）

FFXIV 采集难度**不来自操作，而来自知识**：

1. **何时何地出现**：ET 时间窗（游戏内时间）、天气、区域。
2. **需要什么属性门槛**：获得力不足则获得率极低（甚至 0%）。
3. **用什么技能组合**：GP 有限，`Sharp Vision III`(250 GP) 与 `King's Yield II`(500 GP) 只能选一个。
4. **如何最大化稀缺窗口**：限时节点出现时，需要在几十秒内决定"先堆获得率还是先堆产量"。

> **对放置游戏的映射建议**：把"知识"转成"**解锁条件 + 预设方案**"。玩家在放置游戏中通过**探索/研究**解锁"节点配方表"，然后用"**采集方案（Gathering Loadout）**"预设离线行为。这与 FFXIV 用 Teamcraft / Garland 工具查表后设置宏的行为**完全同构**。

---

## 4. 等级进度、经验来源与任务链

### 4.1 生产/采集的经验来源总表

| 来源 | 类型 | 适合等级 | 备注 |
|---|---|---|---|
| **制作物品（Synthesis）** | 生产 | 全程 | 基础经验来源；成品等级越高经验越多（同等级区间内） |
| **Quick Synthesis（クイック合成）** | 生产 | Lv10+ | Lv10 解锁，"一键批量制作"（不判定品质，直接按成功率完成），经验低但可挂机 |
| **采集（Gathering）** | 采集 | 全程 | 采集成功即给经验 |
| **理符（Levequest）** | 生产 + 采集 | 全程 | 大国防联军/各城理符处接取；**HQ 交付经验翻倍**（6.0 前的通用认知；🟥 6.0 HQ 改动后需复核） |
| **大国防联军 筹备（Supply）/ 供给（Provisioning）** | 生产 + 采集 | 全程 | 每日可交付；**HQ 交付经验加成**；给军票（Seals） |
| **友好部族任务（Allied Society / 旧 Beast Tribe）** | 生产 + 采集 | 各资料片 | 详见 §4.3 |
| **自定义交付（Custom Delivery）** | 生产 + 采集 | 各资料片 | 每周 12 次（见 §4.4） |
| **伊修加德复兴（Ishgardian Restoration）** | 生产 + 采集 | Lv20+ | 5.x 高效升级途径；现仍可用，材料可全部从市场板购买 |
| **宇宙探索（Cosmic Exploration）** | 生产 + 采集 | Lv10+ | **7.21 起**成为 DT 主流的免费升级途径；**不受生产经验加成道具影响** |
| **收藏品交付（Collectables）** | 生产 + 采集 | Lv50+ | 换取票据；7.0 后经验标准化 |
| **制作练习 / 试做** | 生产 | — | **不给经验**（无消耗模拟） |

### 4.2 经验加成道具与状态（🟨 社区整理，用于 1–100 升级）

| 加成 | 效果 | 上限 | 是否影响宇宙探索/复兴 |
|---|---|---|---|
| **Road to 90（Preferred World）** | 全经验 **+100%** | ≤ Lv90 | ✅ 影响 |
| **Engineering Manual（生产工程学手册）** | 制作经验 **+150%** | — | ❌ **不影响宇宙探索** |
| **Survival Manual（采集生存手册）** | 采集经验 **+150%** | — | ❌ 同上 |
| **Commercial Engineering / Survival Manual** | 更高级版本（票据兑换） | — | ❌ |
| **Free Company Helping Hand II** | 制作成功经验 **+10%**（24 小时） | — | ❌ 不影响宇宙探索/复兴交付 |
| **Friendship Circlet（友情头环）** | 经验 **+20%** | ≤ Lv26 | ✅ |
| **Ala Mhigan Earrings（阿拉米格耳环）** | 经验 **+30%** | ≤ Lv51 | ✅ |
| **食物（如 HQ Rroneek Steak）** | 提供 Control / CP 属性（不是经验） | — | — |

🟨 来源：[Eorzean Tavern – DoH Leveling Guide](https://eorzeantavern.com/doh-leveling/)

> **设计要点**：注意"**宇宙探索经验不吃加成手册**"这一细节——官方**刻意让"新内容"的升级效率不受老道具影响**，以避免开服期出现"人均 200% 经验秒升满"的失衡。这是放置游戏中"**活动内经验独立计算**"的先例。

### 4.3 生产/采集的职业任务与友好部族

#### 4.3.1 生产职业任务（Class Quest）

- 🟦 **每个生产职业有独立的职业任务链**：Lv1 / 5 / 10 / 15 / 20 / 25 / 30 / 35 / 40 / 45 / 50 / 53 / 55 / 58 / 60 / 63 / 65 / 68 / 70（各大版本 5 级一档）。
- 🟦 关键技能由职业任务解锁：
  - **Manipulation（操縦 / Lv65）**：**必须完成各职业 Lv65 职业任务才解锁**，且**每个职业分别解锁**。这是顶级生产宏的必备技能，因此社区攻略强调"78–81 级一定要做职业任务"。
  - **Quality Assurance（品質精査 / Lv63）**、**Bountiful Yield Mastery（Lv68）**、**Enhanced GP Regeneration（Lv70）** 等特性同样由职业任务解锁。
- 🟦 官方指南在动作表中用 `[Class Quest]` / `[クラスクエスト]` 标记这些"任务解锁"项。
- 🟨 各资料片末期（80 / 90 / 100）有**顶点职业任务**，提供剧情收束与奖励。

> **设计要点**：把**关键能力锁在任务里**（而不是等级里）是 FFXIV 的一贯手法。它强制玩家**走出"纯数值成长"路径**、投入一次性内容。放置游戏可以用"**职业里程碑任务**"来对抗"纯挂机无目标"的问题。

#### 4.3.2 友好部族（Allied Society / 旧称 Beast Tribe）的生产采集任务

| 资料片 | 部族 | 类型 | 备注 |
|---|---|---|---|
| ARR | **Ixal（イクサル）** | 生产 | 位于 Coerthas Central Highlands；生产系最早的经验与素材来源 |
| ARR | **Sahagin / Kobold 等** | 采集 / 战斗 | 🟥 生产采集相关的具体部族归属待核 |
| Heavensward | **Moogles（モーグリ）** | 生产 | Churning Mists |
| Stormblood | **Namazu（ナマズオ）** | 生产 + 采集 | 大名任务体系 |
| Shadowbringers | **Dwarves（ドワーフ）** | 生产 | 机械工房系 |
| Endwalker | **Omicron（オミクロン）** | 生产 + 采集 | Ultima Thule |
| Dawntrail | **Pelupelu（ペルペル）** | 生产 + 采集 | 🟥 DT 的对应部族名称与生产采集定位待核 |

- 🟨 完成友好部族任务可获得**经验、素材、专属货币**，其货币可兑换**采集/生产的专用素材与装备**。
- 🟨 友好部族任务是**每日限定次数**的"日常"内容（典型为每日 3–12 次）。

### 4.4 自定义交付（Custom Delivery / お得意様取引）

🟨 **规则**（Eorzean Tavern 整理）：
- **每周共 12 次**交付，**跨所有 NPC 共享**；
- **单一 NPC 每周最多 6 次** → 想用满 12 次必须同时经营**两个 NPC**；
- 与"**收藏品换票据**"是两套机制：收藏品交付**无周上限**（4.0 起取消）。

🟨 **全部 Custom Delivery NPC 一览**：

| NPC | 所在地 | 等级 | 解锁任务 | 主题 |
|---|---|---|---|---|
| Zhloe Aliapoh | Idyllshire (4.6, 6.7) | 55 | Arms Wide Open | ARR + HW 的制作/采集/钓鱼品 |
| M'naago | Rhalgr's Reach (14.6, 9.4) | 60 | Forgotten, None Forsaken | 阿拉米格抵抗军主题 |
| Kurenai | The Ruby Sea (28.3, 15.3) | 62 | The Seaweed Is Always Greener | 甲人族（Kojin）与红玉海物品 |
| Adkiragh | Idyllshire (4.8, 6.6) | 66 | Between a Rock and the Hard Place | 矮人族物品 |
| Kai-Shirr | The Canopy, Eulmore (12.2, 9.9) | 70 | Oh, Beehive Yourself | 尤尔莫拉 / 诺弗兰特物品 |
| Ehll Tou | The Firmament (13.5, 11.2) | 70 | O Crafter, My Crafter | 苍穹街复兴物品 |
| Charlemend | The Firmament (8.9, 8.5) | 70 | You Can Count on It | 苍穹街复兴物品 |
| Ameliance | Old Sharlayan (15.6, 7.2) | 80 | Of Mothers and Merchants | 萨雷安物品 |
| Anden | Il Mheg (17.0, 34.0) | 80 | That's So Anden | 妖精主题 |
| Margrat | Labyrinthos (20.4, 20.1) | 80 | A Request of One's Own | 拉比林托斯物品 |
| Nitowikwe | Shaaloani (14.3, 19.3) | 90 | Laying New Tracks | 图拉尔 / Yok Huy 物品 |
| Tiisol Ja | Tuliyollal (15.1, 12.0) | 90 | —（🟥 待核） | 图莱尤拉物品 |

🟨 来源：[Eorzean Tavern – Collectables & Custom Deliveries](https://eorzeantavern.com/collectables-and-custom-deliveries/)

> **设计要点**：Custom Delivery 是 FFXIV 里**最接近"放置游戏日常任务"**的设计：**固定 NPC + 固定周次数 + 可预期的产出**。它同时服务三个目标——(a) 给生产采集玩家一个"每日/每周必做";(b) 消耗市场上的中间素材;(c) 给休闲玩家一条不依赖市场板的成长线。

### 4.5 图鉴（Log）系统

| 图鉴 | 对象 | 内容 | 完成奖励 |
|---|---|---|---|
| **Crafting Log（製作手帳）** | 生产 | 每个生产职业可分等级查看全部可制作配方 | 部分成就、称号 |
| **Gathering Log（採集手帳）** | 采矿 / 园艺 | 记录每种素材的**采集地点** | 成就、称号 |
| **Fish Guide（魚類図鑑）** | 钓鱼 | 记录每种鱼的**钓点 / 饵 / 时间 / 天气 / 尺寸记录**；7.0 起显示所需 Hookset | "鱼王"系成就、称号、坐骑 |
| 制作笔记中的收藏/完成度 | 生产 | 制作过的物品会打钩 | 成就 |

- 🟨 **Crafting Log 的规模**：八职业合计配方数以千计（含 1–100 全部等级段 + 秘籍 + 特殊配方）。🟥 精确总数未核实；Gamer Escape 的 [Category:Crafting Log](https://ffxiv.gamerescape.com/wiki/Category:Crafting_Log) 按职业分页列出全部条目。
- 🟨 **Fish Guide 的规模**：社区普遍引用"**1000 种以上**可钓物"（含鱼王/鱼皇/收藏品鱼）。🟥 精确数字待核。

### 4.6 生产/采集的等级-装备同步节点（用于升级路径设计）

🟨 Eorzean Tavern 整理的"装备更新检查点"（可以直接看出 FFXIV 的等级分段设计）：

| 等级 | 装备购买点 |
|---|---|
| 11 | 公会供应商 / Sinus Ardorum 的 Godgyth |
| 21 | Limsa Lominsa Lower Decks 的 Syneyhil |
| 41 | 同上 |
| 48 | Godgyth（宇宙探索） |
| 53 | Ishgard (The Pillars) 的 Evrardoux |
| 58 | Godgyth |
| 63 | Kugane 的 Shichiho |
| 71 | The Crystarium 的 Vernarth |
| 81 | Old Sharlayan 的 Cwengyth |
| 91 | Tuliyollal 的 Veegal Ja |

🟨 关键洞察：**7.x 中，1–100 的全部生产装备都能在宇宙探索据点 Sinus Ardorum 的 Godgyth 处买到**——官方把"升级装备供给"集中到了新系统里，方便新人快速追赶。

---

## 5. 经济系统

> **本章的结构性结论（先看这三句）**：
> 1. **Gil 是"低产出、强回收"的货币**：官方几乎不主动印钱（任务/理符的 Gil 奖励很小），玩家赚到的 Gil 绝大多数来自**其他玩家**（市场板交易）。因此 FFXIV 的 Gil 总量增长缓慢，长期通胀温和（🟨 社区共识）。
> 2. **最主要的 Gil 回收口（sink）是"税 + 房屋 + 修理 + 传送 + 彩票"**，而不是"买 NPC 商品"（NPC 商品多为代币/军票购买）。🟨
> 3. **生产采集玩家的现金流=市场板**：生产者的收入等于"其他玩家愿意为成品支付的价格 − 5%（或 3%）税"。**市场板是这套经济的心脏**，也是本文档给放置游戏的最重要参照。🟨

### 5.1 Gil 的来源（产出侧，按量级排序）

| 来源 | 单次量级（Gil） | 频率 / 上限 | 是否"创造"Gil | 级别 |
|---|---|---|---|---|
| **市场板出售（Market Board）** | 由买家支付，任意金额 | 无上限（受雇员挂单槽限制） | ❌ **转移**（买家另付税 → 净销毁） | 🟨 |
| **任务（主线 / 支线 / 职业任务）** | 单任务约 100 ~ 3,000（随资料片递增；7.x 主线单任务约 1k–3k 🟥） | 一次性 | ✅ 创造 | 🟨 |
| **理符（Levequest）** | Lv90–100 单次约 1,000–4,000（HQ 交付另有加成） | 配额：每日 +6 张，存量上限 100；可消耗单个理符接取 | ✅ 创造 | 🟨 |
| **副本轮盘（Duty Roulette）** | Lv80 / Patch 5.5 实测：**Expert 11,850**（轮盘 7,050 + 通关 4,800）、**Leveling 11,150**、MSQ / Trial / Alliance Raid / Normal Raid 约 8,850–11,850、Guildhest 1,120；**"急需角色（Adventurer in Need）"缺位奖励可重复刷、不限每日一次**：Leveling **23,000**、Expert **18,960**、MSQ 15,960、Normal Raid 13,272、Guildhest 2,897（🟥 7.56 / Lv100 数值未核实） | 每个轮盘每日 1 次；缺位奖励不限次 | ✅ 创造 | 🟨 |
| **出售给 NPC 商人（Vendor）** | 单件数 Gil ~ 数百；装备类按 iLv 递增 | 无上限 | ✅ 创造 | 🟦 |
| **分解（Desynthesis）** | 产出素材（拿去卖玩家，不产 Gil） | 无上限 | ❌ | 🟨 |
| **雇员探险（Retainer Ventures）** | 带回素材 / 宝箱物 / 稀有可交易道具（卖玩家换 Gil） | 1 小时 / 18 小时两种周期，可并行所有雇员 | ❌ 间接 | 🟨 |
| **部队潜艇 / 飞空艇探索（Submersible / Airship）** | 带回可交易素材与道具；**另有可直接卖 NPC 的回收品（如 Extravagant Salvaged Ring ≈ 27,000 Gil / 个）**——这部分**直接创造 Gil**。社区 2026 年实测：1 个 FC / 4 艘潜艇**日均约 47.4 万 Gil**（详见 §5.6） | 约 24 小时一轮 | ❌ 间接 + ✅ 少量直接 | 🟨 |
| **岛屿庇护所（Island Sanctuary）** | 工房产物 → 卖玩家；Cowries 本身不可换 Gil | 每日 / 每周排程 | ❌ 间接 | 🟨 |
| **宇宙探索（Cosmic Exploration）** | Exploration Tokens 等**可交易**代币 → 卖玩家 | 随时 | ❌ 间接 | 🟨 |
| **多玛飞地（Doman Enclave）** | **净创造 Gil**：按 NPC 收购价的 **120%**（后期提升到 **200%**）支付酬谢金；每周额度 **20,000 → 40,000 Gil** | 每周（周二 08:00 UTC 重置） | ✅ 创造 | 🟨 |
| ~~大叔彩票（Jumbo Cactpot）~~ **（更正）** | **彩票的票价与奖金都是 MGP，不是 Gil**：Jumbo 票价 100 / 150 / 200 MGP（每周 3 张），Mini 10 MGP 一张（每日 3 张）→ 属 **MGP 经济**，与 Gil 无关 | 每周 / 每日 | ❌ 与 Gil 无关 | 🟨 |
| **挑战日志 / 成就奖励** | 挑战日志每项约 **1,000–10,000 Gil**（随职业等级缩放） | 每周 / 一次性 | ✅ 创造 | 🟨 |
| **大国防联军军票 → 素材 → 卖玩家** | 军票本身不可交易，但换出的素材可交易 | 无上限 | ❌ 间接 | 🟨 |

> 🟥 **量级说明**：上表除"市场板"与"潜艇"外，官方**从未公布** Gil 产出的精确数值；"每小时 Gil"这一类结论在社区也没有统一口径，因为 FFXIV 的 Gil 收入**几乎完全由市场决定**（同样的 1 小时采集，在不同服务器、不同版本可差 10 倍以上）。本文只给"单次量级"，不给"每小时收益率"。
> 🟨 **但社区确实给过 7.56 时点的量级**（🟥 玩家口径、波动极大、仅作参照）：**采集 0.5–1.5M Gil / 小时**；**采集 + 制作 + 市场板倒卖 3–5M Gil / 小时**；**G17 寻宝图 5 张约 1–2M Gil**。

**结论（对放置游戏最重要的一条）**：FFXIV 的经济设计是**"官方只发很少的钱，让玩家互相赚对方的钱"**。这带来两个直接后果：
1. 通胀可控（因为没有持续印钱）；
2. **新手极度依赖市场**——没有市场就没有现金流，这是 FFXIV 生产玩法的全部动机来源。🟨

### 5.2 Gil 的消耗（回收侧 / Gil sink，按重要性排序）

| Sink | 量级 | 频率 | 备注 | 级别 |
|---|---|---|---|---|
| **市场板交易税** | 成交价的 **5%**（减税都市 **3%**，见 §5.3） | 每次购买 | **唯一"随经济规模自动放大"的 sink**——交易越活跃回收越多 | 🟨 |
| **房屋（地皮 + 建设许可 + 家具）** | 小 300 万 / 中 1,600 万 / 大 4,000 万 Gil **起**（分 Fifth–First class，越靠前越贵）；另加建设许可与家具 | 一次性 + 持续 | **最大的单笔 sink**；官方靠它一次性回收数千万 Gil | 🟦 官方 |
| **传送费（Teleport）** | 按距离计费；实测例：利姆萨→格里达尼亚 **618**、利姆萨→Tailfeather **501**、住宅区传送 ≈ 同城费用的 **1/4**（154，FC 折扣 124）、收藏点（最多 3 个）**半价 309**；FC 行动可再降 20% / 30% / 40%；Aetheryte Ticket = **15 同盟徽章换 3 次免费传送** | 每次传送 | 高频、细水长流型 sink | 🟨 |
| **修理费（Repair）** | NPC 修理按装等收费（旧表 Lv41–50 = **200 Gil** 档）；**满级装备 NPC 修理约 400 Gil / 件**；自力修理约 **200 Gil + 暗物质**，且能修到 **199%**（NPC 只到 100%）。**暗物质 NPC 价：G1 4 / G2 12 / G3 24 / G4 48 / G5 80 / G6 120 / G7 200 / G8 280 Gil** | 高难内容高频 | sink 的是"暗物质"这一 NPC 商品 | 🟨 |
| ~~大叔彩票（Jumbo Cactpot）~~ **（更正）** | **Jumbo / Mini Cactpot 的票价与奖金都是 MGP，不是 Gil**（Jumbo 100 / 150 / 200 MGP 一张、每周 3 张；Mini 10 MGP 一张、每日 3 张）→ **属于 MGP 回收，不消耗 Gil** | 每周 / 每日 | 与 Gil sink 无关 | 🟨 |
| **部队潜艇运营** | 维修材料与燃料：**Repair Kit 1,700 Gil / 个**、**Ceruleum Tank ≈ 400 Gil / 个** | 每次出航 | 部队级持续 sink | 🟨 |
| **杂项 NPC 商品** | 幻化棱镜（市场板均价 ≈ **200 Gil**，也可用 200 军票 / 6 Bicolor Gemstone / 100 Wolf Marks 换取）、染料、家具、宠物等；另：**MGP 仅在持有 < 500 MGP 时可用 Gil 购买** | 随时 | 单项金额小但覆盖面极广 | 🟨 |
| **市场板"减税都市"的地理差异** | 0（这不是 sink，是 sink 的折扣） | — | 玩家可通过把雇员放在减税都市降低买家的税 | 🟨 |
| **雇员 / 部队相关** | 追加雇员走 **Mog Station（现实货币）**（$2.00 / 30 天），**不是 Gil sink**；FC 行动消耗的是 FC 点数（credits）而非 Gil | — | 官方"用现金而非 Gil"回收成本 | 🟦 |

> 🟥 **易错点**：**"修理费""传送费"在社区核算中常被夸大**。真正的量级排序是：**房屋 ≫ 市场税 > 传送费 ≈ 修理 ≈ 彩票 > 杂项**（依据：官方公布的房屋价格是数千万级，而市场税按 5% 逐笔累计，是唯一与交易量成正比的项）。此排序为本文基于公开数字的推算，非官方结论。

---

### 5.3 市场板（Market Board / マーケットボード，俗称"マケボ"）

#### 5.3.1 基本结构

| 项目 | 事实 | 级别 |
|---|---|---|
| 交易形式 | **只有"固定价挂单（buyout）"，没有拍卖 / 竞价**——买家看到价格直接买断 | 🟦 |
| 挂单主体 | 由**雇员（Retainer）**挂单；玩家本人不能在市场板直接摆摊 | 🟦 |
| 挂单槽位 | 每名雇员 **20 个**出售槽位（🟥 待核，与 §8.6 的"20 个挂单位"一致） | 🟨 |
| 挂单期限 | **约 1 周**：到期后自动停止销售，未售物品仍留在雇员处但不再对外显示，需重新上架（🟥 仅 JP wiki 单一来源，无第二来源佐证；本文因此保留 §0 / §7.2 的"7 天"说法） | 🟨 |
| 可见范围 | 市场板**按 World（服务器）隔离**；同一 World 内所有城市看到同一份挂单 | 🟨 |
| 成交记录 | 显示该物品最近的成交价与成交时间（社区工具 Universalis 会把全 DC 的成交记录汇总） | 🟨 |
| 定价 | **完全自由定价**，无上下限；玩家可 1 Gil 压价（undercut），也可挂天价 | 🟦 |
| 上架费 / 押金 | **未发现任何上架费或押金**；取消挂单后物品退回雇员，重新上架免费 | 🟨 |
| 地板价 | NPC 商人（Vendor）的收购价构成事实上的地板价 | 🟦 |

#### 5.3.2 税（全文档最需要小心的一条）

**没有争议的两点**（🟨 多来源一致）：
1. **基准税率是 5%**（例：100 万 Gil 的成交对应 5 万 Gil 的税）。
2. **5.2 起，买家在任何城市购买都要在标价之上另付手续费**——此前"在雇员的所属城市购买可免买家手续费"的机制已被 5.2 取消；6.4 起出品一览会直接显示"含手续费总价"。

**其余四点来源互相冲突**，本文并排列出，不做单方面裁定：

| 争议点 | 说法 A | 说法 B |
|---|---|---|
| **谁付** | **只有买家付**，卖家实收标价全额——依据：Lodestone 实测日记（78 万 Gil 的商品结算要 80 万）、多份玩家指南 | **买卖双方都付**：买方付"标价 + 手续费"，卖方到手"标价 − 税"，单笔交易从经济中净移除约 **5–10%**——依据：第三方经济指南 + JP wiki 市场板条目 |
| **减税后税率** | **3%**——依据：2025–2026 年多份 Lodestone 日记，标题即「税率5％が３％に！」 | **2%**——依据：ff14wiki.info 与部分玩家博客。⚠️ 另有一篇把减税描述为"手续费**减 2 个百分点**"，即 5% − 2% = **3%**，说明"2%"很可能是**降幅**而非**降后税率** |
| **减税城市如何确定** | **动态判定**：**登记雇员数最少**的都市享有减免，随周期重算（JP wiki） | **固定名单**：利姆萨 / 格里达尼亚 / 乌尔达哈 = 5%，伊修加德 / 黄金港 / 水晶都 / 旧萨雷安 / 图莱尤拉 / Solution Nine = 3%（2026 年第三方指南） |
| **减税作用对象** | 卖方（因此"把雇员放在减税都市"是卖方的定价策略） | 买方（买家结算金额直接变低） |

> **本文的采用写法（保守）**：**基准 5%；减税城市按当前规则下调（社区数据落在 2%–3%），以游戏内实际结算与 [Universalis 的实时税率 API](https://universalis.app/)（`/api/tax-rates`）为准。**
> 🟨 **可验证的工具**：Universalis 提供各城**实时税率**接口，这本身就是"税率随城市与时间变化"的证据。若项目要精确复制 FFXIV 的税制，**应直接以该 API 的返回值为准**，而不是采用任何二手数字。
> 🟥 **与本文 §0 / §8.6 的冲突（对照记录）**：§0 写的是"卖方 5%、减税都市 **2%**""买方手续费 5.2 起全都市统一 5%"。本次复核**确认**了"5.2 起买家统一付手续费"与"基准 5%"，但**"减税后 2%"与"卖方付税"两种说法都有相反来源**。**本节不静默改写 §0**，而是把该差异登记进 §10.2 第 1 项。
> 🟨 参考：[Lodestone 玩家日记《税率5％が３％に！》](https://jp.finalfantasyxiv.com/lodestone/character/49743988/blog/5590719)（含 78 万 → 80 万的实测记录与"三国主城不减税"的评论确认）；🟨 [Universalis](https://universalis.app/)（实时税率 API）。

#### 5.3.3 跨服 / 跨 DC 交易规则

| 机制 | 规则 | 级别 |
|---|---|---|
| **同 World** | 常规情形：买卖发生在自己的 World | 🟦 |
| **跨 World（World Visit）** | 只能在**同一 logical Data Center** 内跨服；入口是利姆萨 / 乌尔达哈 / 格里达尼亚的**中央大水晶**（不是各区的以太之光分点）；到访期间**可以买、但不能上架** | 🟨 |
| **到访期间的额外限制（官方 World Visit 指南）** | ① **物品不能上架**；② 不能召唤 / 雇佣 / 解雇雇员；③ 不能使用莫古力邮差（道具邮寄）；④ 不能加入 / 退出 FC、不累积 FC 点数、FC 行动不生效；⑤ 不能购买地皮 / 公寓；⑥ 不能买彩票；⑦ 传说 / 未采集节点不可采 | 🟦 官方 |
| **跨 DC（Data Center Travel）** | 访问其他 **logical DC** 需要另一套机制（Data Center Travel，6.18 起），同样用于**买**；挂单始终绑定原 World 的雇员 | 🟨 |
| **伴侣 App** | 在到访世界也可购买；但**只能在 Home World 上架"雇员持有"的物品**（不能上架自己背包 / 陆行鸟鞍袋里的东西） | 🟦 官方 |
| **市场板可见性** | 玩家不在对方 World 时**看不到**对方的挂单（因此套利必须"肉身前往"） | 🟨 |
| **社区比价工具** | [Universalis](https://universalis.app/)（全 DC 挂单、成交历史、**各城实时税率** `/api/tax-rates`）、Teamcraft、Garland Tools——**官方不提供任何跨服比价 API**，这些工具靠玩家从运行中的游戏实例匿名上传的数据（数据源 XIVAPI / FFCafe，因此**有覆盖盲区**：上传少的世界数据会滞后） | 🟨 |

**价格形成机制（社区观察 🟨）**：
1. **压价（Undercut）是主旋律**：新挂单通常比当前最低价低 1 Gil（或低一个"心理档位"）。
2. **版本节奏决定价格曲线**：新资料片 / 新补丁开服 24 小时内的秘籍成品、HQ 食物药水价格最高（可达成百上千万 Gil），随后急剧下跌；**"秘籍首发抢购"是 FFXIV 生产者的年度大事件**。
3. **6.0 废除采集物 HQ** 后，素材价格波动幅度变小、市场深度提高（🟨 社区解读）。
4. **可交易代币（如宇宙探索的 Exploration Tokens）**会形成"代币换物 → 折价卖"的套利链，社区会实时计算"每代币折合多少 Gil"。

---

### 5.4 交易限制：哪些东西不可交易

FFXIV 用**四个独立标记**控制物品流通：**Market Prohibited（禁止上架）**、**Untradable（Ex，不可交易）**、**Unique（Rare，唯一）**、**Bind（绑定）**。社区资料（含本文档早期版本）常把它们混为一谈，实际含义差别很大：

| 标记 | 日文 / 社区叫法 | 含义 | 能否挂市场板 | 能否玩家间直接交易 |
|---|---|---|---|---|
| **Market Prohibited（禁止上架）** | — | **只禁止上市场板**；覆盖大量武器 / 防具 / 饰品 / 宠物 / 乐谱，以及"**大部分讨伐战与团队副本奖励**"。**多数仍可卖给 NPC**，部分可交军票，其余可销毁 | ❌ | ✅（多数） |
| **Untradable（不可交易）** | 日文 **Ex** | 完全不能转给其他玩家；但**可以放进自己的雇员**，也可用于"修理委托" | ❌ | ❌ |
| **Unique（唯一）** | 日文 **Rare** | 同一背包不能持有 2 个以上，但**仍可交给雇员 / 挂市场板** | ✅ | ✅ |
| **Bind（绑定）** | 日文 バインド | 一旦绑定：不能交易、不能上架、不能邮寄；可放进自己的雇员，但**雇员也无法卖给别人**，且**无法解除**（🟥 本次未核实 FFXIV 中触发绑定的具体条件） | ❌ | ❌ |
| **ExRare** | 日文圈俗称 | 同时具备 Ex + Rare 两种标记；**用点数货币（神典石 / 军票 / 票据 / 狩猎徽章 / MGP 等）换到的装备几乎都带 ExRare** | ❌ | ❌ |
| 普通物品 | — | 无限制 | ✅ | ✅ |

> 🟨 **两条容易写错的总结**：
> 1. **Gil 是唯一可以直接在玩家之间转让的货币**。所有其他货币（神典石、军票、票据、Cowries、Cosmocredits…）都不可交易。**想把"点数"变成 Gil，必须先换成"非 ExRare 的普通物品"**（典型如魔晶石、幻化棱镜）再上架——这正是 FFXIV 里"点数 → 商品 → Gil"这条标准套现路径的由来。
> 2. **中文社区常把"Rare / Unique（唯一）"与"Untradable / Ex（不可交易）"混为一谈**，但它们是两个**独立**标记：前者只限制持有数量，后者才限制流通。本文档在 §5.4 与 §5.9 中一律分开表述。

**主要的"不可交易"类别（🟨 社区整理，机制稳定）**：

| 类别 | 例子 | 说明 |
|---|---|---|
| **神典石 / 代币兑换的装备** | 各资料片用神典石（Tomestones）换的紫装 | 只能自己用；这是"官方保证装备不能直接换成 Gil"的核心设计 |
| **高难副本（Savage / Ultimate）掉落** | 零式装备、究极武器 | 装备本身不可交易；但**掉落里的制作素材通常可交易**（这是生产者的金矿） |
| **收藏品（Collectables）** | 交付给票据 NPC 的收藏品 | 收藏品**不能挂市场板、不能交易**，只能交付 |
| **票据（Scrips）与票据兑换物** | 橙票、秘籍（Master Recipe Book） | 票据本身不可交易；秘籍**购买后即绑定**（🟥 待核） |
| **军票（Company Seals）与其兑换物** | 军票换的素材 / 装备 | 军票不可交易；**部分换出的素材可以交易**（生产者靠它换取） |
| **岛屿庇护所货币** | Seafarer's Cowries / Islander's Cowries | 不可交易、不可互转（见 §6.3） |
| **宇宙探索的三种记账货币** | Cosmocredits / Sector Credits / Cosmic Tool Data | 不可交易；**唯独 Exploration Tokens 可交易**（设计上的"玩家间流通口"） |
| **多数副本掉落装备** | 迷宫掉落的绿装 | 多数不可交易（🟥 例外情况未穷举；部分老版本装备可交易） |
| **任务 / 成就限定奖励** | 部分称号、宠物 | 视道具而定，**宠物 / 坐骑笛子常有可交易版本** |

**结构性结论（对放置游戏最有价值的三条）**：

1. **FFXIV 没有"道具邮件"**——玩家间转移道具**只有"面对面直接交易"和"市场板挂单"两条路**，且必须先加好友/同区域。这是官方**反 RMT 的核心设计**：金币买卖可以，**道具搬运极难**。🟨
2. **"能交易的"和"能变成 Gil 的"被严格分层**：顶级战力装备（神典石 / 零式）全部绑定，**唯一能通过经济手段获得的"战力"是制作装（绿装）+ HQ 食物药水 + 魔晶石**——这恰好就是生产采集职业的全部市场空间。🟨
3. **绝大多数装备不存在"装备后绑定"**：与 WoW 的 BoE / BoP 不同，FFXIV 的普通装备**穿上不会变成不可交易**，因此"二手装备市场"长期存在、制作装价格下跌更快（🟨）。但 FFXIV **确实存在"绑定（Bind）"状态**（见上表最后两行），其具体触发条件本次未核实（🟥）。

### 5.5 雇员（Retainer）与探险（Ventures）

雇员是 FFXIV 中**最接近"放置 / 离线产出"的官方系统**，也是本文档反复推荐的参照对象。

| 项目 | 事实 | 级别 |
|---|---|---|
| 免费雇员数 | 订阅包含 **2 名** | 🟦 |
| 付费上限 | Mog Station 追加最多 +7（共 9 名）；Companion App 再 +1 → **上限 10** | 🟦 + 🟨 |
| 每名雇员仓库 | **175 格**道具位 | 🟦 |
| 每名雇员挂单槽 | **20 格**（🟥 待核） | 🟨 |
| 解锁 | 雇员系统在 **Lv17 任务**「An Ill-conceived Venture / リテイナーの冒険」后开放 | 🟨 |
| 雇员职业与等级 | 可选 **8 个战斗基础职业 + MIN / BOT / FSH**（**职业决定探险掉落表**；生产职业不能替玩家制作）；转"特职"需在 Retainer Vocate 购买 **Modern Vocation（ジョブの心得）= 40 Ventures**；**重置职业会把等级退回 1**；雇员等级**不能超过玩家该职业的等级**，上限 **100** | 🟨 |
| 探险消耗 | **Venture（探险券，可叠 99）**：**200 军票 / 枚**（有军衔条件），也可由同盟 / Centurio 徽章（20 枚 1 个）、理符与友好部族奖励、寻宝获得——**不是 Gil** | 🟨 |
| 探险类型与时长 | ① **指定筹措**（Hunting / Mining / Botany / Fishing）= **1 小时，消耗 1 枚**（雇员超等级会缩短：+10 级 → 50 分、+20 级 → 40 分）；② **探索**（Field 战斗 / Highland MIN / Woodland BTN / Waterside FSH）= **18 小时，消耗 2 枚**；③ **Quick Exploration（寻宝）**：雇员 **Lv10** 解锁，**1 小时、消耗 2 枚**，固定带回 1 件随机物品（无独占掉落，但给雇员经验最多） | 🟨 |
| 收益缩放 | 战斗系雇员看**平均品级（iLv）**；采集系自 6.0 起由**获得力 / 识别力**系属性决定数量与 HQ 率（🟥 具体映射待核）。雇员经验：G1 4,000 → G15 288,000 → G21 2,858,333 | 🟨 |
| 探险产出 | 素材、水晶、怪物素材、宝箱物、稀有宠物；**可卖 NPC 的小额硬币（Allagan Tin / Silver Piece 等）**（🟥 待核） | 🟨 |
| 关键设计点 | 探险**按"领取时间"滚动**，不是服务器统一重置——玩家可以在自己方便的时间收取 | 🟨 |
| 付费与恢复 | 追加雇员 **$2.00 / 30 天**（NA；EU £1.15 / €1.40）；**未续费时物品与 Gil 不会消失**（只是无法访问），恢复订阅后按编号靠前者优先恢复 | 🟦 官方 |

**为什么这对放置游戏重要（🟨 社区共识 + 本文判断）**：
- 雇员探险是**"低信息量 + 低操作量 + 明确回报"**的三段式循环：**派出 → 等待 → 收取 → 再派出**。它不需要玩家在线，也不惩罚离线（只是"不累积"）。
- **探险产出的是"素材"而不是"货币"**——玩家必须再经过一次市场交易才能变成 Gil。这层"多一步"的设计让市场保持活跃，也让"派遣"不会直接引发通胀。

---


### 5.6 部队（Free Company）与潜艇 / 飞空艇探索

**Free Company（FC，部队 / 公会）**是 FFXIV 唯一的公会系统。它的经济价值几乎全部集中在**工房（Workshop）+ 探险载具**上。

| 项目 | 事实 | 级别 |
|---|---|---|
| 载体 | **飞空艇（Airship，3.x 引入）**与**潜水艇（Submersible，4.x 引入）** | 🟨 |
| 前置 | **FC 等级 6 + 拥有部队房屋**后购买工房（🟨 玩家成本表把"工房解锁"记为约 **800,000 Gil**，非官方确认）；载具部件由**生产职业制作** | 🟨 |
| 部件与建造 | 每艘 **4 个部件（船体 / 船尾 / 船首 / 舰桥）**；共 **5 个系列 × 4 个部位**（Shark / Unkiu / Whale / Coelacanth / Syldra）——廉价 Shark 系用于练级，Whale / Coelacanth / Syldra 系用于正式运营 | 🟨 |
| 派遣与航时 | 选择"空域 / 海域（Sector）"→ **按真实时间出航**：**固定 +12 小时** + 航行 / 探索时间（受速度属性影响）。廉价 Shark 配置实测约 **1 天 16 小时**；主流刷钱路线 **Sunken Sea OJ** 约 **24 小时一轮** | 🟨 |
| 成长 | 出航累积经验 → 解锁更深海域（发现新海域解锁新路线）；**载具等级上限 100**（89→90 需 12,409,258 EXP） | 🟨 |
| 产出 | 制作素材（**部分素材只有潜艇能取得**）、可交易道具、宠物 / 坐骑；**另有可直接卖 NPC 的回收品（如 Extravagant Salvaged Ring ≈ 27,000 Gil / 个）**——这部分是**真正的 Gil 创造** | 🟨 |
| 持续成本 | 维修材料（1 个 Magitek Repair Material = 1 Dark Matter Cluster + 5 Grade 6 Dark Matter）与燃料：**Repair Kit 1,700 Gil / 个**、**Ceruleum Tank ≈ 400 Gil / 个** | 🟨 |
| 舰队上限 | 社区普遍以"**1 个 FC 运营 4 艘潜艇**"为标准配置（🟥 单 FC 最大艇数未从官方页面核实） | 🟥 |
| 经济定位 | **"部队级被动收入（passive income）"**：一次配置、每周领取；是 FFXIV 中**最接近放置游戏离线产出**的机制之一 | 🟨 |

> 🟨 **可核实的社区长期记录**：Lodestone 玩家 Pan Pacific 连载了《FFXIV Submarine Gil Farming Guide》（[索引页](https://jp.finalfantasyxiv.com/lodestone/character/25180863/blog/5699736)），内含 2024 / 2025 年度收益报告、单 FC 与 100 FC 的季度收益与稳定性分析、以及"为了潜艇而持有多个 FC 房屋"的风险管理策略。
>
> **该系列 2026 年版 ROI 报告给出的具体量级（🟥 单人实测，仅作量级参考）**：
> - **单 FC / 4 艘潜艇 / Sunken Sea OJ 路线**：**日均 474,464 Gil**、**月均 14.85M**、**年均 148.55M**；初期投入 **45.76M–47.26M Gil**（房产 4.25–5.75M，含 450k 许可证 + 800k 工房；16 件 Shark 练级件 8.0M；16 件 Modified 成品件 32.0M；其他 1.51M）；**回本约 3.4 个月**；首年 ROI **220.79%**、第二年起 **939.08%**；年运营成本约 **14.3M**（维修件 5,102 个 / 年、Ceruleum Tank 12,960 个 / 年）。
> - **多 FC 报告**：60 个 FC / 240 艘潜艇 → 总营收 **6,909,104,897 Gil**、净 **≈6,326,562,317 Gil**（约 450–490k Gil / 日 / FC）。
> 🟥 **引用时必须注明**：这些数字来自**单个玩家的实测报告**，高度依赖服务器行情、版本改动与"稀有掉落还能卖多少钱"；且前置成本在 **4,500 万 Gil 量级**，对绝大多数玩家并不现实。
> 🟥 社区对潜艇收益的普遍印象是"**长期看是稳定被动收入，但需要先投入数百万 Gil 建船 + 承担行情风险**"，此印象未获官方确认。

### 5.7 房屋与家具市场

| 项目 | 事实 | 级别 |
|---|---|---|
| 购买方式 | **抽签（Lottery）制**（6.1 起取代"手速抢地"） | 🟦 |
| 摇号周期 | ✅ **官方**：**9 天一轮 = 5 天申请期 + 4 天结果期** | 🟦 官方 |
| 押金与罚则 | 申请时须缴纳**全额地价**作为押金且**不可撤回**；**中签但未在结果期内领取 → 地权作废并扣除押金 50%**；落选全额退款，退款在结果期结束后 **90 天**内未领取即失效 | 🟦 官方 |
| 资格限制 | 个人：至少 1 个 **Lv50** 职业 + 军衔 **Second Lieutenant** 以上；FC：**FC 等级 6+、成员 ≥4、拥有土地权限、入会 ≥30 天**（官方明说 30 天规则是"**为了防止地皮倒卖**"）；每角色每期只能投 1 次（个人与 FC 不可同投）；**每个服务账号每个 World 只能持有 1 块个人地 + 1 块 FC 地** | 🟦 官方 |
| 地皮价格（官方 3.3 表） | **小 3,000,000 / 3,187,500 / 3,375,000 / 3,562,500 / 3,750,000**（第 5 类→第 1 类）；**中 16,000,000 → 20,000,000**；**大 40,000,000 → 50,000,000**；FC 与个人同价 | 🟦 官方 |
| 已废除的"随时间降价" | 旧机制下地价会逐日下跌，**最低可到小 1,488,000–1,860,000 / 中 7,936,000–9,920,000 / 大 19,840,000–24,800,000**；**6.1 起官方废除该机制**（"all plots will retain their initially posted value"） | 🟦 官方 |
| 建设许可与附属房 | 建设许可证 **450,000（S）/ 1,000,000（M）/ 3,000,000（L）**（🟨 玩家表，其中 S 档有第二来源佐证，M / L 档证据较弱）；**公寓 500,000 Gil**、**个人房间 300,000 Gil** | 🟨 |
| 搬迁 | 搬迁同样要参与抽签；中签后可选"搬迁"，**退款原则上约为旧地价的 15%**（6.1 前为旧地"最低价"的 30%）且不超过新地价 | 🟦 官方 |
| 装修与家具 | 家具由**生产职业制作**并在市场板流通；**"搬家 / 换房"会持续产生家具需求**，是生产者的稳定长尾市场 | 🟨 |
| 自动拆除 | **45 天**无访问即拆除（FC = 45 天内无任何成员进入；个人 = 房主 45 天未进入；已购未建房同样 45 天）；第 30 天在 Timers 提示、35 与 42 天发邮件；**期间任何时候进入房屋即取消拆除**；拆除后地价的 **80%** 可在 35 天内向住宅管理员赎回，但**许可证 / 外装 / 个人房间 / 工房与登记载具不退** | 🟦 官方 |
| 地皮稀缺性 | 每个 World 的住宅区地皮总量固定（Ward 数有限），因此**热门服务器长期"一房难求"**，摇号中签率极低 | 🟨 |
| 经济意义 | **单笔金额最大、回收最彻底的 Gil sink**：一次房屋买卖可回收数千万 Gil，相当于数千次副本的产出 | 🟨 |

> **设计观察（本文判断）**：房屋在 FFXIV 里其实是**"社交 / 展示内容"而非经济内容**——它的价格高到与日常生产脱钩，且地皮供给由服务器固定。对放置游戏而言，房屋对应的是"**个人基地装饰**"（见 §8.7.1 的岛屿庇护所映射），而不是"房地产投机"。

---

### 5.8 通货膨胀史、Gil 上限与打金 / 工作室问题

#### 5.8.1 Gil 上限

| 项目 | 数值 | 级别 |
|---|---|---|
| 角色持有上限 | **999,999,999 Gil**（🟨 玩家实测：Lodestone 存在"达到 999,999,999 上限"的日记；**未找到 SE 官方写明该数字的页面**） | 🟨 |
| 雇员持有上限 | 官方只说雇员可存"**物品 175 种 + 水晶 + Gil**"，**具体 Gil 上限未公布** | 🟥 |
| 免费体验版（Free Trial）上限 | **300,000 Gil**（✅ 官方原文："Free Trial account characters can possess a maximum of 300,000 gil"；同页明确：**不能用市场板、不能交易、不能雇雇员、不能加入 / 创建 FC**） | 🟦 |
| FC 金库上限 | 未查到（🟥） | 🟥 |

#### 5.8.2 通胀史分期（🟨 社区记忆 + 本文归纳，非官方数据）

| 时期 | Gil 供需特征 | 标志性事件 |
|---|---|---|
| **1.0 → 2.0（过渡）** | 官方把 1.0 存档继承的 Gil **压缩为原来的 1/10**（✅ 官方支持页原文："gil amount reduced to 1/10 the original amount"）——这是 FFXIV 历史上**唯一一次官方直接"重置"货币存量** | 1.0 时代的 Gil 存量被一次性削减 |
| **2.x（新生）** | **极度稀缺**。百万 Gil 即"富豪"；主要货币来源是副本、理符、采集 | 房屋系统上线（2.1 / 2.3），但地皮与价格体系尚未定型 |
| **3.x（苍天）** | 首次出现**数千万级 sink** | **3.3 追加住宅区与新地价（小 300 万 ~ 大 4,000 万起）**，一次性大规模回收 Gil |
| **4.x（红莲）** | 潜水艇 + 高难内容消费（HQ 食物药水）推高市场交易量 | 潜水艇成为"部队被动收入"的起点 |
| **5.x（漆黑）** | 复兴（Ishgard Restoration）制造了**巨量的素材与成品需求**，是生产者收入的高峰期之一 | 5.11–5.41 五个复兴阶段 |
| **6.x（晓月）** | **双向变化**：一边是岛屿庇护所 / 潜艇等**被动收入普及**，一边是"数值通缩（denomination）"与**采集物 HQ 废除**让素材价格趋平 | 6.0 HQ 改动；6.5 岛屿庇护所完结 |
| **7.x（黄金，现行）** | 宇宙探索带来**新的可交易代币（Exploration Tokens）与素材市场**；老玩家的 Gil 存量继续累积，社区观感为"数千万 Gil 已不算富有"（🟥 观感，非数据） | 7.2x 宇宙探索上线 |

**三条结构性结论（🟨）**：
1. **官方几乎不印钱**：Gil 的净创造只来自任务 / 理符 / NPC 收购 / 挑战日志，金额相对市场价格微不足道；**绝大多数 Gil 只是玩家之间的转移**。
2. **主要 sink 是"税 + 房屋 + 修理 + 传送 + 彩票"**，其中只有**市场税**会随经济规模自动放大。
3. 因此 FFXIV 长期处于**温和通胀**：物价缓慢上涨，但没有出现"货币变废纸"式的恶性通胀。**社区普遍认为这是"官方故意控制 Gil 投放"的结果**（🟥 属于因果推断）。

#### 5.8.3 打金 / RMT / 工作室与官方对策

| 手段 | 内容 | 级别 |
|---|---|---|
| **政策层** | 禁止 RMT（现实货币交易）与账号买卖，处罚"**up to and including a permanent ban**"；官方**每周在 Lodestone 公布封禁统计（Actions Taken Against In-Game RMT & Other Illicit Activities）** | 🟦 官方 |
| **封禁量级（可引用的官方数字）** | **2026-06-04**（统计期 5/28–6/3）：RMT / 违规 **439 个账号封停 + 54 个停权**、机器人 52 封停 / 33 停权、RMT 广告 55 封停；**2026-05-07**：446 + 2、机器人 20 / 13、广告 20；**2025-03-27**（3/13–3/26）：**1,746 + 66**、机器人 15 / 81、广告 **2,700**；历史：**2013-08-24 ~ 09-05 有 518 个账号**因 RMT 广告被永久封禁 | 🟦 官方 |
| **执法方式** | 增加人力、升级侦测工具、新增处理流程；聊天中的 RMT 广告可被举报并**自动处理**（判定后限制发言） | 🟦 官方 |
| **2021-10 政策强化** | 新增 2 项组队招募板（Party Finder）禁止项，官方明说是"as countermeasures against vendors of real money trading"，其中包括**禁止"Selling [duty] clear for 1 million gil"**（用 Gil 买副本代打）；同时引入 Penalty Points（Caution 类 1 年以上衰减、停权以上 3–6 年，但**账号终止永不撤销**） | 🟦 官方 |
| **结构性反 RMT** | ① **没有道具邮件**，玩家间转移道具只能面对面交易或走市场板；② Free Trial 账号**不能交易、不能用市场板、Gil 上限 30 万**；③ 顶级装备（神典石 / 零式）**全部不可交易** | 🟦 / 🟨 |
| **技术层** | 禁止第三方工具与自动化脚本；GM 巡查 + 玩家举报 | 🟦 官方 |
| **仍未解决的问题** | **采集 / 制作外挂（bot）**是社区长期抱怨对象（例如 Lodestone 玩家日记直接以《Oh the QQ from crafting botters》为题吐槽制作外挂）；市场板的**自动压价脚本**同样长期存在 | 🟨 |
| **观测到的行为** | 卖 Gil 的广告通过 /tell 与组队招募板进行，玩家社区自发举报 | 🟨 |

> **对放置游戏的三条教训（本文判断）**：
> 1. **"玩家间转移 > 系统印钱"**：把货币投放交给玩家交易，通胀自然温和；系统的角色是提供 sink。
> 2. **"绑定分层"是反 RMT 的利器**：让"战力"无法直接购买，只有"素材 / 成品 / 食物药水"可交易——这样 RMT 的收益空间被压到最低。
> 3. **放置游戏与 FFXIV 的处境相反**：放置游戏的离线产出**本质上就是系统印钱**。因此放置游戏必须更激进地设计 sink（本文 §8.6 给了具体建议），否则数值会先于内容崩坏。

### 5.9 结论表：哪些经济要素值得还原、哪些应简化

| # | FFXIV 要素 | 事实要点 | 放置游戏的处理 | 理由 |
|---|---|---|---|---|
| 1 | **固定价挂单市场板** | 无拍卖、无竞价、自由定价、压价文化 | ✅ **还原**（异步、离线可结算） | 与放置节奏天然兼容，且是"生产者变现"的唯一途径 |
| 2 | **5% 交易税** | 基准 **5%** 无争议；"谁付"（买家付 / 双方都付）与"减税后 2% 还是 3%"存在**来源冲突**，详见 §5.3.2 | ✅ **还原**，可简化为"每次成交抽成" | 简单、可预测、天然抑制套利 |
| 3 | **减税都市（3%）** | 依赖"地理"与雇员驻扎地 | ❌ **简化掉** | 放置游戏没有地理；保留只会增加无意义的选择 |
| 4 | **跨 World / 跨 DC 购买** | 需要"肉身前往"，造成价格差与套利 | ⚠️ **谨慎**：可做"分区市场"，但要接受价格趋同 | 分区会推高服务器复杂度；单区市场更稳 |
| 5 | **NPC 收购价（地板价）** | 官方只给极低回收价 | ✅ **必须有** | 防止市场彻底崩盘、给新手保底 |
| 6 | **不可交易分层** | 顶级装备全绑定，只有制作装 / 消耗品可交易 | ✅ **还原**（"战力不可购买，产出可交易"） | 让经济有意义，同时压住 RMT 空间 |
| 7 | **无道具邮件** | 转移必须面对面 / 走市场 | ❌ 放置游戏需要"寄送 / 交易" | 放置游戏没有"面对面"这一约束 |
| 8 | **雇员 20 挂单槽** | 槽位是可成长的资源 | ✅ **还原**（"市场槽位"作为升级项） | 用槽位而非税率来调节玩家产出节奏 |
| 9 | **房屋地皮（数千万 Gil）** | 最大的单笔 sink，但供给固定、门槛极高 | ⚠️ **降级**为装饰 / 基地系统 | 直接抄会导致"99% 玩家永远买不起" |
| 10 | **彩票（Cactpot）** | 奖金池再分配 + 净回收 | ⚠️ **可选**：只作为"消耗多余货币"的小玩法 | 放置游戏中赌博玩法易引发反感 |
| 11 | **Gil 上限 9.99 亿** | 事实上玩家碰不到 | ❌ 不设硬上限，改用"sink 比例" | 数值上限对放置游戏是伪问题 |
| 12 | **打金 / RMT 压力** | 官方靠"绑定 + 无邮件 + 封号"控制 | ✅ **借鉴设计**，但不做人工封号 | 单机 / 小规模放置游戏不需要执法，需要"结构性免疫" |

> **一句话总结**：FFXIV 的经济是"**官方发很少的钱 + 玩家互相赚钱 + 税和房屋回收**"。放置游戏应当抄它的**税、地板价、绑定分层、市场槽位**四件事，而**丢掉地理差异、拍卖竞价、九亿上限、房屋投机**这四件事。

---

## 6. 与生产采集相关的长尾内容

> 本章讲的是"**主线之外、专门为生产采集职业设计的内容**"——它们是 FFXIV 用来给生产采集玩家提供**长期目标**的容器。
> 一个重要的历史规律（🟨 社区共识）：**这类内容几乎都是"限时活动 → 完结后留下一个永续循环"的结构**。复兴（Ishgard Restoration）的永续遗留物是迪亚德姆；岛屿庇护所完结后留下的是"可继续刷的 Cowries 商店"；宇宙探索则是 7.x 的**进行中**系统。

### 6.1 伊修加德复兴（Ishgard Restoration）与苍穹街（The Firmament）

| 项目 | 事实 | 级别 |
|---|---|---|
| 引入版本 | **Patch 5.11（2019）**；建筑阶段横跨 **5.11 / 5.21 / 5.31 / 5.41**；迪亚德姆在 **5.21** 随复兴一同复活 | 🟨 |
| 舞台 | 伊修加德基础层（Foundation）内的新区域「**苍穹街 / The Firmament（蒼天街）**」 | 🟨 |
| 前置 | 开启任务「**苍天を仰ぐ街 / Towards the Firmament**」：需完成 3.x 主线「最期の咆哮」（Lv60）+ **任一职业 Lv60 + 生产职业 Lv20**；起点为伊修加德下层 NPC「求人広告」(X9.7 Y11.5) | 🟨 |
| 核心循环 | 采集**复兴资材**（苍穹街 + 迪亚德姆）→ 制作为**收藏品** → 交给苍穹街 NPC **ポットキン（Potkin，X12.2 Y14.6）** → 获得 **Skybuilders' Scrip（蒼天街振興券 / 空贼票据）** + 经验，并推进**全服复兴进度条** | 🟨 |
| 全服共同作业 | 进度条填满后 **30 分钟**触发「**复兴共同作业**」小游戏（搬材料 / 砍木 / 搭小屋）；按贡献度发放票据：**贡献 ≥3 = 500（成功）/ 350（失败）、贡献 2 = 300、贡献 1 = 50**；失败则 **8 小时后**重开 | 🟨 |
| 抽奖副玩法 | **Kupo of Fortune（库啵抽奖）**：交付带图章的资材以累积图章，**每 5 枚换 1 张抽奖券**（最多持有 10 张） | 🟨 |
| 排行与赛季 | 官方共 **3 个 Skybuilder Ranking 赛季**：S1 随 5.21（**2020-03-19** 结束）、S2 随 5.31（**2020-09-08 ~ 09-18**）、S3 随 5.41（**2021-01-21** 结束） | 🟦 官方 Lodestone |
| 排行奖励 | 各职业 **1–12 名** → Writ of Beatification / Canonization → 成就「Divine Ascension」+ 称号 **Saint of the Firmament**；**13–100 名** → Writ of Commendation → 成就「Minor Miracle」+ 称号 **Beatus / Beata of the Firmament**；最终赛季还会为最高分职业在苍穹街建 **纪念碑（Skybuilders' Monument）** | 🟦 官方 Lodestone |
| 成就与坐骑 | 任一生产 / 采集的技巧点累计 **50,000** → 小坐骑；**全 8 生产 + 3 采集各 500,000** → **Pteranodon Horn**（成就 "Castle in the Sky"） | 🟨 |
| 票据商店价格示例（NPC Enie，X12.0 Y14.0） | 坐骑 **8,400**（Ufiti / Albinocarakul / Megalotragus 等）、Pegasus **4,200**、演技教本 1,800、发型 1,200–1,800、迷你宠 600–1,200、Skyworker 装备每件约 1,200–2,200 | 🟨 |
| 现状（2026 / 7.5x） | **建筑阶段在 5.41 已完结**：不再有施工捐献，也没有可继续提升的 Skywatcher 等级；**仅保留"迪亚德姆 → 苍穹街票据"的兑换循环**（它仍是 5.x 天钢工具渔师阶段的必需品） | 🟨 |

> 🟥 **对"五个阶段"说法的更正**：本文 §8.7.2 与部分社区资料写作"五个阶段"，但可核实的**建筑阶段只有 4 个**（5.11 / 5.21 / 5.31 / 5.41）。若把 **5.5 追加的「復興祝祭（Fête）」节日活动及其新振興券商品（1 种坐骑 + 2 种乐谱）**也算进去，社区才会说"第五阶段"——但**它不是建筑阶段**。

**为什么它重要（🟨 本文判断）**：
- 它第一次把"**生产采集玩家的产出**"变成"**全服可见的进度条**"——生产不再是"闷头做东西卖钱"，而是"参与一件公共事件"。
- 它留下了 FFXIV 生产史上最重要的一项遗产：**"限时赛季 + 永续残留循环"的双层结构**（见 §8.7.2 的放置化建议）。

### 6.2 迪亚德姆（The Diadem）

| 项目 | 事实 | 级别 |
|---|---|---|
| 起源 | **3.1（2015）**首次登场，是"探索型采集 / 战斗浮动岛"；后被关闭 | 🟨 |
| 现代版 | **5.21（2020）随复兴一并重做并重新开放**，作为复兴的专用素材供给地 | 🟨 |
| 进入方式 | 通过**苍穹街（Firmament）**的 NPC **Augebert**（X11.4 Y14.1）→ **Aurvael**（X10.8 Y14）进入（需已开放复兴任务线） | 🟨 |
| 参与门槛 | **采集职业等级 ≥ 10 即可**，**没有装等（iLv）限制**；**只允许采集职业（DoL）进入** | 🟨 |
| 队伍与时限 | **1–8 人**；单次进入有 **180 分钟**上限 | 🟨 |
| 采集循环 | 采集点按**固定顺序**出现（采掘顺时针、园艺逆时针）；采集会累积「**高圧エーテル**」槽，**每采集 40 次充 1 发「エーテルオーガー（Aetheromatic Auger）」**，对**资源怪物**使用可秒杀并获得大量素材；鱼类分解也可产出采掘 / 园艺素材（但**钓鱼不累积 Auger 槽**） | 🟨 |
| 特殊天气 | **Umbral Flare / Tempest / Levin / Duststorm** 等天气会出现隐藏采集点与精灵怪（掉晶石） | 🟨 |
| 鉴定与货币 | 素材交给苍穹街 **Flotpassant**（X10.8 Y14.0）**鉴定**（采掘 / 园艺素材按 **10 个一组**鉴定）→ 转化为 **Skybuilders' Scrip（空贼票据）**；**鉴定后素材才可交易 / 上架**；兑换 NPC 为 **Enie**（X12 Y14） | 🟨 |
| 素材等级 | **Lv10–80**，等级越高给券越多；稀有素材只在特定天气窗口出现 | 🟨 |
| 与生产的关系 | 迪亚德姆素材 + 苍穹街素材 → 制作复兴配方 → 换空贼票据；构成"**采集 — 制作 — 交付**"的完整闭环 | 🟨 |
| 现状（2026 / 7.5x） | 仍是可刷的票据循环；社区认为其**经验效率在 ~Lv80 之前**仍有一定价值（🟥 论坛口径，非官方） | 🟥 |

> 🟥 **两处常见误解的更正**：
> 1. 现行迪亚德姆**没有"探索任务（Exploratory Missions）/ 紧急任务"**——那是 **3.x–5.1 的旧版迪亚德姆（Ver.1 / Ver.2）**机制，已于 5.1 关闭并改修。本文档早期版本与部分社区资料仍沿用旧描述。
> 2. 迪亚德姆**不是**"战斗采集混合区"：现行为**采集职业专用**。

### 6.3 岛屿庇护所（Island Sanctuary）

| 项目 | 事实 | 级别 |
|---|---|---|
| 引入版本 | **Patch 6.2**（晓月之终途中期）实装；**6.5（2023-10-03）把等级上限从 16 提升到 20**，此后完结、不再扩展 | 🟨 |
| 解锁 | 推进 6.0 主线后开启（🟥 精确任务名未核实） | 🟥 |
| 等级 | **rank 1–20**（R20 即终结；R19 解锁地标「Island Sanctum」） | 🟨 |
| 四条互相喂食的循环 | **工房（Workshop）** 生产 → **牧场（Pasture）+ 农田（Cropland）** 提供原料 → **大仓（Granary）** 远征带回素材 | 🟨 |
| 双货币 | **Seafarer's Cowries（主）**：来自工房出口、幻象任务、挑战手账；**Islander's Cowries（次）**：把原始采集物卖给 **Enterprising Exporter** 获得。**两者不可互转**；**岛产原料与手工艺品均不可上市场板** | 🟨 |
| 工房排程（核心） | 用 **Isleworks Agenda → Review Supply & Demand** 排期：选择"高需求 / 低供给"的品项可得更高贝币；连续排同类目累积 **Groove** 进一步提高出口收益。**每"季" = 现实一周**，可**提前排满一周**，**工房离线运行** | 🟨 |
| 经验量级（社区实测） | 采集 1 次 = **10 岛经验**；**4 座工房 = 6,720 经验 / 日**，每周 5 天 = **33,600 / 周**；R18→R19 需 **7 万**、R19→R20 需 **10 万** | 🟨 |
| 据点改筑 | 现实时间 **11–12 小时**，最高 **V 级**（R19 工房升 V） | 🟨 |
| 大仓远征 | **1–7 个现实日**一轮，**50 海员贝币 / 天**；派遣到 **6 个区域**，每天固定结算；每区域产出通用素材 + **1 种该区域专属稀有素材** | 🟨 |
| 大仓容量分级 | Granary I（R5，**2 个稀有 / 天**）→ Granary V（R18，**6 个 / 天**）；**最多 2 座** | 🟨 |
| 商店价格示例 | 迷你宠 / 乐谱各 4,000；岛产蔬菜 12,000–18,000；**Garlond GL-II Ignition Key 24,000**；**Island Alligator Horn 35,000 / Island Buffalo Horn 50,000**；**Garlond GL-IIT Ignition Key（R20 三轮摩托）100,000**；**Grade IX 魔晶石 750、Grade X 1,500** | 🟨 |
| R20 长尾 | 追加「ねこみさんのおねがい」系统：专用货币「手形」**周上限 70 / 持有上限 150**，10 枚换 1 张「おやさい券」，**200 张（= 2,000 手形）换坐骑 Isle Adenium**（社区自算约 **28.6 周**） | 🟨 |
| 现状 | **6.5 完结，不再新增内容**；Cowries 商店与循环仍可玩 | 🟨 |

> **它是本文档最推荐的"离线生产层"参照**（详见 §8.7.1）：岛屿庇护所的四条循环里，**"配置一次 → 离线产出 → 上线领取"**的比例远高于其他系统，而且它有两条关键约束值得抄：
> 1. **双货币不可互转** → 强制玩家参与两类玩法；
> 2. **产出有上限、需上线领取** → 天然制造回访动机，但**不惩罚离线时长**。

---

### 6.4 宇宙探索（Cosmic Exploration，7.x 新增，**仍在扩展中**）

| 项目 | 事实 | 级别 |
|---|---|---|
| 引入版本 | **7.21**（Dawntrail 7.x 中期），并在整个 7.x 周期内持续追加内容 | 🟨 |
| 开启任务 | **「A Cosmic Homecoming」**——在旧萨雷安（Old Sharlayan）向 **Namingway** 接取；要求 **DoH / DoL 等级 ≥ 10 + 完成晓月之终途（Endwalker）主线** | 🟨 |
| 进入方式 | 在 **Mare Lamentorum（月面）** 找 **Drivingway** 前往 **Sinus Ardorum（源世界的月球）** | 🟨 |
| 核心循环 | 通过 **exotablet** 接取 **恒星任务（Stellar Missions）**：**任务等级与玩家等级同步（quest-synced）**，因此**全等级段都能参与**；任务有 **Bronze / Silver / Gold 评分**；另有 **Provisional（临时）任务**（Sequential / 天气限定 / 时间限定）与 **Critical Missions（紧急任务）**——出现 **red alert** 时开放，屏上方两条需求量表对应两个职业，**限时内双表填满 = 全员额外奖励**，未填满则奖励减少 | 🟨 |
| 四个"星" | **Sinus Ardorum（7.21）→ Phaenna（7.31）→ Oizys（7.41）→ Auxesia（7.51）**；官方明确表示 7.x 期间**持续追加新星** | 🟨 |
| 四套货币 | **Cosmocredits（跨星通用，商店 NPC Mesouaidonque）** / **Sector Credits（每星独立：Lunar / Phaenna / Oizys / Auxesia Credits，用于机体任务申请与 Cosmic Fortune 抽奖）** / **Exploration Tokens（每星一种，可市场板交易，来自 EX+ 星间任务）** / **Cosmic Tool Data（分职业，仅用于升级宇宙工具，共 7 类）** | 🟨 |
| 任务内专用工具 | **Cosmopouch（专用背包）**、**Cosmic Crafting Log（生产）**、**Stellar Reduction（采集精选）** | 🟨 |
| 生产向价值 | 宇宙探索是 **DT 全部 DoH / DoL 的"遗物工具"（Cosmic Tools）的唯一来源**，四阶的 iLv 阶梯为：**Novice（Prototype v0.1–v0.8，iLv 10 / 30 / 55 / 150 / 290 / 430 / 560 / 690）→ 完成态 iLv 720（7.21）→ Intermediate（v1.1–v1.4 = 725 / 730 / 735 / 740）→ "Stellar" 工具 iLv 750（7.31）→ Advanced / Expert（社区记为 755–765 与 "of Stars" 780）** | 🟨（两端官方）+ 🟥（Advanced / Expert 数值未从官方页核实） |
| 其他玩法 | **Mech Ops（机体任务：飞行员抽选 + 未中签提升下次中签率）**、**Cosmic Exploration Projects（大型 FATE 式项目）**、**Artifact Search（Auxesia / Oizys，用 dronebits → drone modules 侦察与鉴定古代记录）**、**Tool Mastery Missions（仅 Auxesia，完成该职业最终宇宙工具后开放，3 个 / 职业，换取 Tool Mastery Points → 成就 / 称号）** | 🟨 |
| 其他机制 | **Cosmic Fortune（转盘式抽奖）**：每星两种奖品转盘 + 机体任务专属票券转盘；**滚动 24 小时贡献排名**与 **Star Contributor** 状态（每日 01:00 PST 重置、**只计当前所在星**的贡献、当选后 14 天展示全息影像与刻名，且 14 天内不可再次入选） | 🟨 |
| 🟥 未核实的社区说法 | ① "彩虹档触发 **Stellar Opportunity** 重抽"——**官方页未出现该词**；② "同阶完成多把工具 → 未完成的工具获得 **+50% / +100% / +150%** 加成"——**仅见于 Eorzean Tavern，官方页未载明** | 🟥 |
| 奖励示例 | 坐骑（**6,000 Exploration Tokens** 一个）、**Interstellar Dhalmel Whistle 29,000 Cosmocredits**、Star Crew / Captain / Admiral 与 Cosmic Explorer 套装 4,800–8,400、Identification Key 各 20,000、家具 3,000–4,000、乐谱 6,000、九宫幻卡 4,000–6,000；每颗新星都带来新的 **Tool Enhancement Quests** | 🟨 |
| 当前状态（2026-09 / 7.56） | **活跃且仍在扩展**（与完结的岛屿庇护所、复兴形成鲜明对比） | 🟨 |
| 来源 | 🟨 [Eorzean Tavern – FFXIV Cosmic Exploration Guide](https://eorzeantavern.com/cosmic-exploration/)（本次调研已抓取原文） | — |

> **它是"新内容如何服务全部玩家"的最佳答案（🟨 本文判断）**：
> - **"任务等级同步"** 解决了"新内容只服务满级玩家"的老问题——这一点对放置游戏极为关键，因为放置游戏同样害怕"新内容只有老玩家能玩"。
> - **"工具数据只能升级工具"** 防止了"单一货币万能化"。
> - **"同阶完成多把 → 未完成的获得加成"** 巧妙地引导玩家"全职业均衡发展"，而不是"专精一条路"。
> - 但要注意：**宇宙探索的参与方式仍然需要在线完成任务**，因此它**不是**可直接搬运的离线产出层（见 §6.7 与 §8.7.3）。

### 6.5 各资料片的生产向终局装备（iLv 递增与获取方式）

FFXIV 的生产采集玩家有一个**每两三个补丁就来一次的"装备重置"节奏**：新制作装上线 → 旧制作装贬值 → 生产者需要重新配装、重新卖货。这是生产经济**周期性波动**的主要来源之一。

| 等级上限段（资料片） | 该段**最高可制作战斗装** iLv | 区间与关键节点 | 级别 |
|---|---|---|---|
| **50（ARR / 2.x）** | **110**（4★） | 区间 50–130，武器最高 135 | 🟨 |
| **60（HW / 3.x）** | **250**（4★） | 区间 150–270，武器 280 | 🟨 |
| **70（SB / 4.x）** | **380**（4★） | 区间 290–400，武器 405；4.0 = 320 → 4.2 = 350 → 4.4 = 380 | 🟨 |
| **80（ShB / 5.x）** | **510**（4★） | 区间 430–530，武器 535；5.0 ≈ 430 → 5.2 = 480 → 5.5 = 510 | 🟨 |
| **90（EW / 6.x）** | **640–650** | 6.4 = 640、6.5 = 650；社区另有"6.0 = 580 / 6.1 = 590 / 6.2 = 610 / 6.3 = 620"的口径（见 §10.2 第 8 项） | 🟨 / 🟥 |
| **100（DT / 7.x，现行）** | **770**（7.4 社区所称"战职 770 HQ 绿装"） | 7.0 = 690 → **7.05 = 710（✅ 官方，Archeo Kingdom 等）** → 7.1 ≈ 720 → 7.2 ≈ 740 → 7.3 ≈ 760 → **7.4 = 770**（同版本神典石装为 **780**，✅ 官方） | 🟨（两端有官方锚点，中间为推断） |

**获取方式（🟨 社区共识）**：
1. **配方来源**：新版制作装配方来自**秘籍（Master Recipe Book）**，而秘籍用**当期票据**购买（DT = 橙票）。因此"新装等上线"与"票据经济"是绑定的。
2. **素材来源**：新版配方的核心素材来自**当期新内容**——7.x 时代多为**宇宙探索的星（Sector）素材**与限时 / 传说采集节点产物（含**灵砂**），6.x 时代则来自岛屿庇护所与限时节点。
3. **HQ 的意义**：6.0 之后，**采集物 / 怪物掉落不再有 HQ，但制作装仍有 HQ**。因此"能稳定产出 HQ 制作装"是生产者相对于"只卖素材"的核心竞争力（🟨 社区共识）。
4. **配套消耗品**：每次装等提升都会带来新一批 **HQ 食物 / HQ 药水（Tincture）**配方，它们是高难玩家的刚需，也是生产者**最稳定的现金流**。
5. **工具线**：DoH / DoL 的"遗物工具"逐代更替：**ARR → Lucis Tools**；**5.x（ShB）→ Skysteel Tools（5.25 起，5.5 完结）**；**6.x（EW）→ Resplendent / Splendorous Tools**；**7.x（DT）→ Cosmic Tools**（宇宙探索，四阶；iLv 从 10 一路升到 720（7.21 完成态）→ 750（7.31 "Stellar" 工具）→ 更高阶）。它们都是**长期目标**而非一次性装备（🟥 HW / SB 两代是否有独立工具线未核实）。
6. **一条可直接用于数值设计的规律（🟨）**：同一时期 **制作装 ≈ 神典石装 − 10 iLv ≈ 零式掉落 − 20~25 iLv**（例：7.4 制作 770 / 神典石 780；7.05 制作 710 / 零式 730–735）。也就是说，**生产者永远比高难玩家低一个档位**，但可以用 HQ 与镶嵌把差距缩小——这正是"绿装（制作装）"在 FFXIV 经济中长期存在的价值。

> 🟥 **本表的限制**：FFXIV 的每补丁 iLv 需要逐个补丁核对 Lodestone Eorzea Database（或 Teamcraft / Garland Tools 的版本筛选），**本文只给出可交叉验证的锚点**；表中标 🟥 的单元格表示"该数字来自记忆或二手转述，未经本次核实"，核对方法见 §10。
> 🟨 **一条稳定的规律**（可直接用于放置游戏的节奏设计）：**每个资料片的"偶数补丁（x.0 / x.2 / x.4）"引入新制作装与配装重置，奇数补丁多用于工具、秘籍、内容系统**——生产者的收益高峰出现在**新制作装上线后的 1–3 周**。

### 6.6 生产向的长期目标：秘籍、专家、工具与图鉴

生产采集玩家在 FFXIV 的"长期目标"不是等级（等级只有 100），而是下面这五类**永久性解锁 / 收集**：

| 目标类型 | 内容 | 周期 | 级别 |
|---|---|---|---|
| **秘籍（Master Recipe Book / 秘伝書）** | 每个生产职业 **I–XII 共 12 本**；每资料片 2 本（中期等级上限 1 本 + 最终等级上限 1 本）：**III/IV = HW（Lv55–60）、V/VI = SB（Lv70）、VII/VIII = ShB（Lv80）、IX/X = EW（Lv90）、XI/XII = DT（Lv100）**；**用对应时期的票据购买，购买即解锁配方**（DT 为橙票 = 现行）；新书通常在 **x.05 或 x.2** 随新配方追加；8.0 预计追加 XI… 之后的 **XIII / XIV** | 每资料片 2 次 | 🟨 |
| **专家（Specialist）** | 每人最多 **3 个**专精生产职业（在摩杜纳的 Lydirlona 处办理，变更专家有冷却期）；装备魂晶后 **+20 作业精度 / +20 加工精度 / +15 CP**；专家可制作专属的 **★4 专家配方**并使用专家动作。⚠️ **"Specialist" 与大国防联军（Maelstrom / Twin Adder / Immortal Flames）无关**，社区资料偶有混淆 | 一次性选择 + 冷却 | 🟨 |
| **专家配方（Expert Recipe）** | 独立状态池 + 专属技能栏的"高难配方"；复兴与宇宙探索中的高难配方属此类；`Trained Eye` 对其无效 | 随版本 | 🟨 |
| **生产工具系列** | 5.x **Skysteel Tools** → 6.x **Resplendent Tools** → 7.x **宇宙探索 Cosmic Tools（Novice → Intermediate → Advanced → Expert 四阶）** | 每资料片 1 套 | 🟨 |
| **图鉴（Log）** | Crafting Log（8 职业数千条配方）、Gathering Log、Fish Guide（**1000+ 种**可钓物） | 永久收集 | 🟨 |
| **成就 / 称号** | 如复兴的 **"Castle in the Sky"（Pteranodon 坐骑）**；官方制作成就线名为 **"I Made That"** 系列（注意：不是 "I Made This"） | 永久 | 🟨 |

> 🟥 **术语待核（中文社区译名不统一）**：日文「**秘伝書**」在中文社区至少有 **"秘籍""秘传书""传承录"** 三种译法；本文档 §3.6 引用的 NGA 攻略标题使用的是"传承录"。**它们很可能指的是同一套 Master Recipe Book 系统**，但本次调研**未能确认**"传承录"是否另有所指（例如某个资料片的子系列）。已列入 §10 核对清单。
>
> 🟨 **经济含义（重要）**：秘籍解锁的是**"高价值可交易成品"**。因此每个资料片上线的第一周，**"秘籍首发抢购"是 FFXIV 生产者的年度大事件**——谁先读到秘籍、先做出成品，谁就能在市场板上赚到版本初期的最高溢价（社区称之为"版本开服的红利期"）。这是 FFXIV 经济**周期性波动的最主要来源**。

### 6.7 结论表：这些系统作为"放置游戏离线生产层"的可用性评估

| # | 系统 | 上线版本 | 循环结构 | 是否需要在线操作 | 离线适配度 | 放置化建议 |
|---|---|---|---|---|---|---|
| 1 | **岛屿庇护所（Island Sanctuary）** | 6.0（6.5 完结） | 配置工房排程 → 每日收获 → 大仓远征（1–7 天） | 仅"配置 + 领取" | ⭐⭐⭐⭐⭐ | **首选范本**：直接做成"个人基地 + 离线建筑产出 + 远征派遣"（§8.7.1） |
| 2 | **部队潜艇 / 飞空艇** | 3.x / 4.x | 建部件 → 派遣（数小时 ~ 数十小时）→ 领奖 + 解锁深层海域 | 仅"派遣 + 领取" | ⭐⭐⭐⭐⭐ | **做成"远征舰队"**：多队伍、多时长、产出"区域专属素材" |
| 3 | **雇员探险（Ventures）** | 2.0 | 派出 → 1h / 18h → 收取 → 再派出 | 仅点击 | ⭐⭐⭐⭐⭐ | **三段式循环**，直接抄（§5.5） |
| 4 | **宇宙探索（Cosmic Exploration）** | 7.21 起（进行中） | 接任务 → 采集 / 制作 → 换四层货币 → 升级工具 | **需要在线完成** | ⭐⭐⭐ | 抄"**等级同步**"与"**工具数据只能升工具**"两条设计，不要抄"必须在线做任务" |
| 5 | **伊修加德复兴（Ishgard Restoration）** | 5.11–5.41（完结） | 采集 → 制作 → 交付 → 全服进度 + 排行榜 | **需要在线制作** | ⭐⭐⭐ | 做成"**赛季制社区活动**"：上线时推进进度条，赛季结束后留永续循环（§8.7.2） |
| 6 | **秘籍 / 专精 / 工具阶梯** | 全版本 | 用货币解锁配方 / 专精 / 工具升级 | 一次性 | ⭐⭐⭐⭐ | 做成"**配方解锁树 + 专精槽 + 工具升级线**"（长期目标） |
| 7 | **迪亚德姆（Diadem）** | 5.21（重做） | 进岛采集 / 战斗 → 换票据 | **需要在线采集** | ⭐⭐ | 只抄"**专用素材区**"的概念：一个"只能由远征队进入"的素材产地 |
| 8 | **终局装备 iLv 迭代** | 全版本 | 每个补丁新配方 → 新装备 → 旧装备贬值 | 需在线制作 | ⭐⭐⭐ | 作为"**版本重置节奏**"：每赛季提升装备上限，让"离线产出"不断被消耗 |
| 9 | **房屋 / 家具** | 2.1 起 | 抽签买地 → 装修 → 持续买家具 | 需在线 | ⭐ | 只保留"**装饰 + 全局加成**"（§8.7.1 的装饰槽位），不要做地皮市场 |

> **本章一句话**：FFXIV 的长尾生产内容里，**真正适合"放置"的只有"派遣 / 排程 / 领取"型的三块（岛屿庇护所、潜艇、雇员）**；其余系统（复兴、宇宙探索、迪亚德姆）的本质是"**在线小游戏 + 长期解锁树**"，应当被拆解成"赛季活动 + 配方解锁"后再移植。

---

## 7. 日常 / 周常循环点与"适合放置产出"的设计位

### 7.1 重置时间（Reset Timers）

🟨 来源：[Eorzean Tavern 站内重置计时器](https://eorzeantavern.com/)（多来源一致）

| 类型 | 时间（UTC） | 换算 |
|---|---|---|
| **每日重置** | **15:00 UTC** | = 00:00 JST（日本时间零点） |
| **每周重置** | **周二 08:00 UTC** | = 周二 17:00 JST |
| 每日理符（Levequest）配额 | 每日重置 | 允许存量上限 **100**（🟥 待核） |
| 大国防联军筹备 | 每日重置 | 每日一次 |
| 友好部族任务 | 每日重置 | 每日固定次数 |
| 自定义交付配额 | **每周重置** | 12 次 / 单一 NPC 6 次 |
| 雇员探险 | **1 小时 / 18 小时**周期 | 按领取时间滚动 |
| 限时采集节点 | **ET（艾欧泽亚时间）窗口** | ET 1 天 = 现实 70 分钟（🟥 待核）；节点通常每 2 ET 小时出现一次 |

> **设计要点**：FFXIV 用"**多层级重置周期**"制造了不同颗粒度的"回访动机"：
> - **小时级**：雇员探险（1h Quick Exploration）
> - **日级**：GC 筹备、部族任务、每日理符
> - **周级**：自定义交付、时尚品鉴、九宫幻卡周任务
> - **不定时级**：ET 限时节点（每 ~35 分钟现实时间出现一次 Eorzea 时间窗）
>
> 放置游戏通常只做 2–3 层；FFXIV 的做法说明**多层周期可以共存**，只要每层的"信息可见性"足够低（玩家不需要同时关心所有层）。

### 7.2 "适合放置产出"的设计位清单

下表列出 FFXIV 中**结构上最接近放置游戏离线产出**的机制：

| 机制 | 周期 | 玩家操作量 | 产出 | 放置化适配度 |
|---|---|---|---|---|
| **雇员探险（Retainer Ventures）** | 1h / 18h | 极低（点几下） | 素材 / 水晶 / 怪物素材 / 宝箱 | ⭐⭐⭐⭐⭐ 几乎已经是放放置机制 |
| **雇员市场板挂单** | 7 天（🟥 待核） | 一次性 | Gil | ⭐⭐⭐⭐ |
| **岛屿庇护所工房（Workshop）** | 每日 / 每周排程 | 每周配置一次 | Seafarer's Cowries | ⭐⭐⭐⭐⭐ 完全自动 |
| **岛屿牧场 / 农田** | 每日收获 | 每日收取 | 素材 | ⭐⭐⭐⭐ |
| **岛屿大仓（Granary）远征** | 1–7 天 | 一次性委托 | 素材（含区域专属稀有素材） | ⭐⭐⭐⭐⭐ |
| **伊修加德复兴（Skybuilders' 交付）** | 随时 | 需在线制作 | Skybuilders' Scrips | ⭐⭐⭐ |
| **宇宙探索（Stellar Missions）** | 随时（任务制） | 需在线完成 | Cosmocredits / 工具数据 | ⭐⭐⭐ |
| **自定义交付** | 每周 12 次 | 需在线制作 | 票据 / 经验 / 专属奖励 | ⭐⭐⭐ |
| **限时采集节点** | ET 窗口 | 需在线蹲点 | 稀有素材 / 灵砂 | ⭐⭐（最不适合放置，但可以做"预约采集"） |
| **雇员 Quick Exploration** | 1 小时 | 每小时点一次 | 随机物品 / Venture Coffer | ⭐⭐⭐⭐ |

### 7.3 FFXIV 的"日常/周常"推荐动线（社区共识）

🟨 一个典型的生产采集玩家每日动线：

```
1. 上线 → 领取 2 名雇员的 18 小时探险（Miner/Botanist + 战斗） → 重新派出
2. 每日 GC 筹备交付（Supply/Provisioning） → 拿军票 → 换 Venture
3. 每日友好部族任务（若有）
4. 检查限时节点（看 Teamcraft 的节点提醒）→ 采 1–2 轮稀有素材
5. 周任务：自定义交付 12 次（通常分两个 NPC）、时尚品鉴
6. 无事时：宇宙探索 Stellar Missions 刷票据 / 工具数据 或 制作收藏品换票据
```

**放置游戏可直接抄的点**：
- **"派出—收取—再派出"的三段式雇员循环**是可移植性最高的模块（信息量小、UI 简单、正反馈明确）。
- **岛屿工房的"每周一次排程 → 每天看结果"** 是"低操作 + 高规划"的完美范式。
- **限时节点** 若要放置化，应改为"**消耗道具开启窗口**"（把"等时间"变成"花资源"），否则玩家会因错过窗口而产生挫败。

---

## 8. 面向"放置游戏"的可用性分析与映射设计

> ⚠️ **本章为原创设计推演**，不是 FFXIV 的事实描述。所有数字是**设计建议值**，不是 FFXIV 的真实数值。

### 8.1 FF14 生产经济 → 放置游戏资源链的映射

**FFXIV 的真实资源链（五层）：**

```
[采集层]  矿石 / 原木 / 草棉 / 生皮 / 食材 / 水晶碎片
   ↓ 采集（DoL：MIN / BOT / FSH）
[原料层]  矿石→锭，原木→木材，草棉→布，生皮→皮革，食材→处理品（由 DoH 制作）
   ↓ 制作（DoH 的"中间素材"配方）
[中间品层] 锭 + 木材 + 皮革 + 布 → 部件（如甲片、握柄、线、铆钉）
   ↓ 制作（DoH 的"成品"配方）
[成品层]  武器 / 防具 / 饰品 / 家具 / 食物 / 药水 / 魔晶石
   ↓ 消费
[货币层]  Gil（玩家间） / Scrip（系统） / Seals（GC） / Cowries（岛屿） / Cosmocredits（宇宙探索）
   ↓ 再投资
[回投层]  更好的工具（→ 更高产出） / 更好的装备（→ 更高属性） / 雇员（→ 离线产出） / 房屋（→ 家具制造）
```

**放置游戏资源链建议映射：**

```
[基础资源] 6 大族 × 3 阶 ≈ 18 种基础素材
   ├─ 矿石族：铜矿 → 铁矿 → 秘银矿
   ├─ 木材族：枫木 → 榆木 → 紫檀
   ├─ 纤维族：麻 → 棉 → 丝绸
   ├─ 皮革族：生皮 → 硬皮 → 龙皮
   ├─ 炼金族：清水 → 药草 → 灵砂
   └─ 食材族：麦 → 肉 → 香料
   ↓
[加工资源] 每族 2 阶中间品 ≈ 12 种（铜锭 → 铁锭；枫木板 → 榆木板…）
   ↓
[成品] 4 条产品线 × 3 阶 ≈ 12–24 种
   ├─ 武器/防具（提升"战斗/探索"效率）
   ├─ 工具（提升"采集/制作"效率）★关键回投
   ├─ 消耗品（食物/药水：限时增益）
   └─ 家具/装饰（提供"离线加成"或纯收集）
   ↓
[货币] 双货币
   ├─ 金币（可交易：市场/挂单，用于买原料、地板价套利）
   └─ 徽记（不可交易：兑换秘籍、工具、稀有种）
   ↓
[回投] 工具升级 → 采集速率 ↑；装备 → 制作成功率 ↑；雇员/工房 → 离线槽位 ↑
```

**推荐的"资源种类数量级"（三条路线）**

| 规模档位 | 基础素材 | 中间品 | 成品 | 配方总数 | 适用场景 |
|---|---|---|---|---|---|
| **精简档** | 9–12 | 6–8 | 12–18 | 40–60 | 手游 / 单周内容量 |
| **标准档**（**推荐**） | **18–24** | **12–18** | **24–36** | **120–200** | 长期运营的放置 / 增量游戏 |
| **重型档** | 40–60 | 30–40 | 60–100 | 500+ | 硬核玩家 / 多资料片运营 |

> **为什么推荐"标准档"？** FFXIV 的配方总量（🟥 估计 2500–4000 条，含 8 职业全等级 + 12 本秘籍）对放置游戏是**灾难级**的。但 FFXIV 的**资源族结构**（6 族 × 3 阶 × 2 层加工）非常适合压缩为 **18 基础 + 12 中间 + 30 成品 ≈ 60 个物品定义**，配方 150 条左右——这正好是"**玩家能在 30 小时内建立心智模型、在 200 小时内不觉得重复**"的甜蜜点。

### 8.2 配方深度建议

FFXIV 的真实配方深度（举例：一把顶级武器）大约是：

```
矿石×3 → 锭×2
木材×2 → 木板×1
皮革×2 → 皮革片×1
────────────────
锭×2 + 木板×1 + 皮革片×1 + 灵砂×1 → 武器部件
武器部件×1 + 高级锭×2 + 魔晶石×3 → 成品武器
```
→ **深度 ≈ 3 层，单条顶级配方依赖 4–6 种基础资源，总计消耗 10–20 个原料单位。**

**建议放置游戏：**

| 层数 | 建议 | 理由 |
|---|---|---|
| 采集层 → 原料层 | **1 步**（1 采集 = 1 素材），不设"半成品矿石" | 减少点击疲劳 |
| 原料层 → 中间品 | **1 步**（3 原料 → 1 中间品），批量可堆叠 | 让"批量制作"有意义 |
| 中间品 → 成品 | **1 步**（2–4 中间品 + 1 稀有种） | 制造"稀缺瓶颈" |
| 总深度 | **3 层（原料 → 中间品 → 成品）** | 4 层以上会让玩家的库存管理崩溃 |
| 单成品原料依赖 | **3–6 种**不同基础资源 | 低于 3 种则无"供应链"感；高于 6 种则"记不住" |
| 顶级配方额外门槛 | **1 种"限时/稀有"素材** | 制造"日常目标" |

### 8.3 把 HQ / 品质条抽象成"成功率"——初稿设计

#### 8.3.1 FFXIV 的真实机制回顾

- 制作时填充**品质条**（Quality），品质 / 最大品质 = **品质比例 q ∈ [0,1]**。
- 制作完成时，按 **q 查表**得到 **HQ 率**。
- 该曲线是**非线性的**：低 q 区间收益极低，中高 q 区间收益陡增。
  🟨 社区/模拟器长期维护的近似特征点（**维护到 7.4 的模拟器仍在使用这张表**）：
  - **q ≈ 50% → HQ 率 ≈ 15%**
  - **q ∈ [70%, 90%] 是最陡区间：每 +1% 品质 ≈ +3% HQ 率**
  - **q = 100% → HQ 率 = 100%**
- **HQ 的收益**：装备 HQ 提供额外属性；食物/药水 HQ 效果更强/更久。

#### 8.3.2 抽象路线 A：**品质比例 → 成功率（推荐）**

把 FFXIV 的"品质条 + HQ 判定"直接抽象为**"产出品质等级的概率分布"**：

```
定义：
  q ∈ [0, 1]  = 本次制作的品质比例（由玩家的工具/等级/技能决定）
  q 由"制作方案"的结算公式给出：
      q = clamp( (Control_effective × Σefficiency / qualityCap) , 0, 1 )

产出结算（建议分段函数，模仿 FFXIV 的非线性）：
  产出等级 = 
    if  q < 0.30            → NQ（普通）
    if  0.30 ≤ q < 0.70     → 70% NQ / 30% HQ
    if  0.70 ≤ q < 0.90     → 线性：HQ率 = (q − 0.70) × 3 + 0.30   （0.70→30%，0.90→90%）
    if  0.90 ≤ q < 1.00     → HQ率 = 0.90 + (q − 0.90) × 1.0       （0.90→90%，1.00→100%）
    if  q ≥ 1.00            → 100% HQ，并溢出为"完美品（HQ+）"
```

**为什么保留非线性？** 因为这是 FFXIV 生产"**值得钻研**"的根本原因：从 q=0.7 提升到 q=0.9 的边际收益，是从 0.3 提升到 0.5 的 **3 倍**。放置游戏中保留这条曲线，可以让"**工具升级的最后 10%**"具有极高的心理价值。

#### 8.3.3 抽象路线 B：**CP 预算模型（更硬核、更"FFXIV"）**

如果希望保留"技能搭配"的乐趣：

```
每次制作有：
  CP_pool     = 由装备/等级决定（建议 100–500）
  Durability  = 由配方决定（建议 40–80）
  目标        = 让 Progress 达到 ProgressCap，同时最大化 Quality

技能（抽象为 4–6 个，而不是 FFXIV 的 33 个）：
  1. 推进（Progress）     ：消耗少量 CP，推进进度
  2. 加工（Quality）      ：消耗 CP，提升品质
  3. 增益（Buff）         ：消耗 CP，使接下来 N 次加工效率 +X%
  4. 保耐久（Repair）     ：消耗 CP，恢复耐久
  5. 爆发（Finisher）     ：消耗 CP，一次性大幅提升品质（FFXIV 的 Byregot's Blessing）
  6. 观察（Observe）      ：消耗极少 CP，跳过一回合（用于等随机状态）

随机层（可选）：
  每回合按概率出现 "Good 状态"：本回合加工效率 ×1.5
  → 玩家可以选择"手动在 Good 时加工"（在线收益更高）
  → 离线时按期望值结算（收益略低）
```

> **这是本文最推荐的设计**：它**同时**满足——(a) 有策略深度；(b) 有离线结算的合理性（用期望值）；(c) 保留"在线操作更优"的正反馈。FFXIV 的 Good 状态机制天然就是"**在线微操红利**"的原型。

#### 8.3.4 抽象路线 C：**纯概率（最简）**

```
成功率 = base_skill × tool_bonus × recipe_difficulty_modifier
产出数量 = floor(yield × (1 + 采集力修正))
```
适合极简放置游戏，但会**丢失 FFXIV 生产最核心的"品质 vs 进度"张力**。不推荐用于以"生产"为主题的放置游戏。

### 8.4 数值公式初稿（可直接落地的参数表）

#### 8.4.1 采集结算

```
每次采集动作：
  yield_base        = 1
  yield_bonus       = floor(获得力 / 100)            // 获得力 100 → +1
  yield_final       = yield_base + yield_bonus         // 1 → 2 → 3
  额外触发 "丰产"：
      p_boon        = 0.10 + 0.02 × (识别力 / 100)     // 基础 10%
      触发时 yield_final += 1 + floor(识别力 / 200)
  收藏品模式：
      collect_value = floor( basic_value × (1 + 识别力/500) × random(0.5, 1.5) )
```

#### 8.4.2 制作结算

```
progress_per_action = floor( base_progress × (1 + 作业精度/500) × efficiency )
quality_per_action  = floor( base_quality  × (1 + 加工精度/500) × efficiency × (1 + 0.1 × IQ_stack) )

CP_pool             = 100 + floor(制作力属性 / 4)
Durability          = recipe_durability(40 / 60 / 70 / 80)
回合数上限           = CP_pool / 平均CP消耗
```

#### 8.4.3 属性 → 收益的边际设计（关键）

| 属性投放 | 建议边际曲线 | 目的 |
|---|---|---|
| 作业精度（Progress） | 线性，但**配方进度需求呈阶梯式**（每 10 级 +30%） | 保证"跨过阈值"的爽感 |
| 加工精度（Quality） | **对数**：`q = 1 − exp(−Control/K)` | 避免"堆到 100% 品质后属性失去意义" |
| 制作力（CP） | **线性但昂贵**（CP +1 的价格约为 Control +1 的 3–5 倍） | CP 是"最稀缺资源"，应最贵 |
| 采集力（GP） | 线性 + 自然回复速率 | 决定"单位时间采集次数" |
| 识别力（Perception） | 线性（作用于收藏价值与稀有率） | 决定"单位采集的价值" |

> **FFXIV 的真实投放比例参照**（🟨 社区宏示例中的实际数值）：Lv100 满配制作的三个属性大致为 **作业精度 3000–4000 / 加工精度 3000–4000 / CP 500–650**；Lv100 采集大致为 **获得力 3000–4000 / 识别力 3000–4000 / GP 800–900**。
> 换句话说，**CP 的数值区间只有作业/加工的 1/6**——这直接说明**CP 是最稀缺、最需要精算的资源**。放置游戏如果要抄"紧张感"，就应该让"燃料类资源"的数值区间远小于"输出类资源"。

### 8.5 职业系统的放置化

FFXIV 的 11 个生活职业 → 放置游戏中的建议映射：

| FFXIV | 放置游戏建议 | 说明 |
|---|---|---|
| 8 个生产职业 | **4–5 条"产品线"**（金属 / 木石 / 纺织皮革 / 炼金食材 / 特殊） | 8 个太多；玩家记不住 8 套配方 |
| 3 个采集职业 | **3 条采集线**（矿 / 植物 / 渔） | 3 条正好，且天然对应不同的稀有度曲线 |
| 等级 1–100（每 50 级一资料片） | **等级 1–60 或 1–100**，每 10 级一个里程碑 | FFXIV 的 100 级在放置游戏中可保留（成本低，节奏清晰） |
| 33 个生产技能 | **6–8 个技能**（见 §8.3.3） | 技能数量是最需要压缩的部分 |
| 24 个采集技能 | **4–6 个技能**（获得率↑ / 产量↑ / GP恢复 / 收藏价值↑ / 稀有显现） | |
| 37 个钓鱼技能 | **独立"钓鱼"小系统**（可选） | 钓鱼的机制差异太大，适合做成"支线收藏玩法" |
| 3 个专家职业 | **1–2 个"专精槽"** | 制造"取舍"：只能专精 1–2 条线 |
| 12 本秘籍 × 8 职业 | **1 条统一"配方解锁树"**（用徽记解锁） | 96 本秘籍不可照搬 |
| 收藏品 / 票据 | **统一的"兑换点数"** | 与"可交易金币"分离 |
| 伊修加德复兴 | **"社区建设"活动**（全服/全玩家共同推进进度条） | 天然适配长线运营 |
| 岛屿庇护所 | **"个人基地"**（离线生产 + 装饰收集） | 放置游戏的最佳长尾内容 |
| 宇宙探索 | **"远征/星球解锁"**（内容扩展包式） | 每期活动加一个新星球 |

### 8.6 经济系统的放置化（Gil / 市场板 / 税）

| FFXIV 机制 | 事实 | 放置化建议 |
|---|---|---|
| 卖方税 5%（减税都市 2%） | 🟨 机制稳定 | **统一 5% 挂单税**（简单、可预测），不要做"都市差异"（放置游戏没有地理） |
| 买方手续费 5%（5.2 起统一） | 🟨 | **可选**：买方也抽 5%，用于抑制"高频套利"。若希望经济活跃可取消 |
| 无传统拍卖行，只有固定价挂单 | 🟦 | 放置游戏**建议用固定价挂单 + 时间排序**，而不是拍卖（拍卖需要在线竞价，与放置冲突） |
| 挂单 7 天（🟥 待核） | 🟨 | 可做成"**挂单刷新周期**"（例如每日结算一次） |
| 雇员 20 个挂单位/人（🟥 待核） | 🟨 | 做成"**市场槽位**"，是可升级的资源 |
| 无跨服交易（仅同服市场板） | 🟦 | 放置游戏如果要做"跨服"，需谨慎——会导致价格趋同、套利消失 |
| 金价上限（🟥 待核） | — | 建议**不设硬上限**，但要设"**通胀调节税**"或"sink" |
| NPC 回收价（Vendor）极低 | 🟦 | **必须有**：给玩家一个"地板价"防止市场彻底崩盘 |

**通胀控制建议（从 FFXIV 学到的教训）**：
- FFXIV 的 Gil 主要靠"玩家间转移"流通，官方**几乎不主动印钱**（任务/理符给的钱很少），因此长期通胀相对可控。
- 官方的主要"Gil sink"是：**传送费、修理费、市场税、房屋（数千万级）、家具、魔晶石镶嵌、幻化**。
- 放置游戏应设定一个**持续存在、与产出成比例的 sink**（例如"制作台维护费"或"远征补给费"），否则数值必然爆炸。

### 8.7 长尾内容的放置化（最高价值的三块）

#### 8.7.1 岛屿庇护所 → "个人基地"（**强烈推荐**）

FFXIV 事实（🟨）：
- 私有岛屿，**rank 1–20**（6.5 从 16 提升到 20）。
- 四条互相喂食的循环：**工房（Workshop）产出 → 牧场（Pasture） + 农田（Cropland） → 大仓（Granary）远征**。
- 货币：**Seafarer's Cowries**（主）+ **Islander's Cowries**（次），**两者不可互转**。
- 大仓远征：**1–7 天**，每天 50 Cowries 手续费，返回"区域常见素材 + 1 种区域专属稀有素材"。
- 大仓容量分 Tier：Granary I（rank 5，2 个稀有/天）→ Granary V（rank 18，6 个/天）；**最多 2 个大仓**。
- 商店（Horrendous Hoarder）售价示例：坐骑 **Island Alligator Horn 35,000 / Island Buffalo Horn 50,000 / Garlond GL-IIT 100,000**；Grade IX 魔晶石 750，Grade X 1,500。
- **系统已于 6.5 完结**，不再扩展。

**放置化设计**：
```
个人基地（Idle Base）
├─ 生产建筑 × N  → 每小时自动产出中间品（离线也产出）
├─ 储存建筑     → 提升离线产出上限（对应 FFXIV 的"上线领取"）
├─ 远征队伍 × 2 → 派出 8/16/24 小时，带回"区域专属素材"
├─ 装饰槽位     → 收集品，提供全局加成（对应 FFXIV 的套装加成）
└─ 基地等级 1–20 → 解锁建筑槽 + 提高离线产出上限
```
**关键设计点（抄 FFXIV）**：
1. **双货币不可互转** → 强制玩家参与两种玩法。
2. **"离线产出上限"机制** → 对应 FFXIV 的"工房产物必须上线领取"，天然制造回访动机，且**不惩罚离线时长**（只是不再累积）。
3. **远征的"区域专属稀有素材"** → 让"派遣哪个区域"成为每周的决策点。

#### 8.7.2 伊修加德复兴 → "社区建设活动"（**强烈推荐**）

FFXIV 事实（🟨）：
- 五个阶段，跨 5.11 / 5.21 / 5.31 / 5.41 四个版本，**约一年的运营周期**。
- 玩家上交制作/采集品 → 累积"Skywatcher 等级" → 推进全服进度。
- 有**排行榜与赛季**（Skybuilder Ranking）。
- 遗留了**永续的迪亚德姆 + Skybuilders' Scrip 循环**（至今仍可玩）。
- 奖励包含坐骑 **Pteranodon**（成就 "Castle in the Sky"）。

**放置化设计**：
```
社区建设活动（每 6–8 周一个赛季）
├─ 阶段 1–4，每阶段有独立进度条与专属配方
├─ 玩家上交 → 累积个人贡献 + 全服贡献
├─ 个人档位奖励（头像框 / 称号 / 装饰）
├─ 全服档位奖励（解锁新区域 / 新配方 / 新 NPC）
└─ 赛季结束后保留"永续循环"（对应迪亚德姆），让新玩家不缺席
```
**关键设计点**：**"有终点的活动 + 无终点的遗留循环"** 是 FFXIV 最聪明的长线运营手法之一，值得直接抄。

#### 8.7.3 宇宙探索 → "远征星球"（**强烈推荐**）

FFXIV 事实（🟨，7.21 起）：
- 舞台：**Sinus Ardorum**（源世界的月球）。
- 核心玩法：**Stellar Missions（恒星任务）**，通过"exotablet"接取，**任务等级与玩家等级同步（quest-synced）**，因此**全等级段都能参与**。
- 四个"星"：**Sinus Ardorum → Phaenna → Oizys → Auxesia**（随 7.x 版本陆续追加）。
- 货币四套：**Cosmocredits（跨星通用）/ Sector Credits（每星独立，如 Lunar Credits）/ Exploration Tokens（可交易，每星一种）/ Cosmic Tool Data（职业专属，只用于升级工具）**。
- 奖励：坐骑（6,000 Exploration Tokens 一个）、Mech Op 稀有掉落坐骑、**Interstellar Dhalmel Whistle 29,000 Cosmocredits**、家具、乐谱、九宫幻卡。
- **Cosmic Tools** 是 DT 的"生活职业遗物工具"，分 **Novice → Intermediate → Advanced → Expert** 四阶；同阶完成多把工具会给未完成的工具**叠加加成**。
- 有 **Cosmic Fortune（大爆炸彩票轮盘）**：颜色分档、彩虹档触发 **Stellar Opportunity** 重抽。
- 有**滚动 24 小时贡献排名**与 **Star Contributor** 状态。

**放置化设计**：
```
远征星球系统（内容扩展包式）
├─ 每期开放一颗新星球（新素材 / 新配方 / 新工具）
├─ "任务等级同步" → 新老玩家都能参与（关键！）
├─ 四层货币：
│   ├─ 通用点（跨星球）
│   ├─ 星球点（每星球独立，用于抽奖）
│   ├─ 可交易代币（玩家间流通，制造经济）
│   └─ 工具数据（只用于升级工具，避免"点数万能"）
├─ 工具四阶升级 + "同阶完成度加成"
└─ 抽奖轮盘（颜色分档 + 保底重抽）= 放置游戏的"战利品箱"
```
**关键设计点**：
- **"任务等级同步"** 是解决放置游戏"新内容只服务高等级玩家"的最佳答案。
- **"工具数据只能升级工具"** 是防止"单一货币万能化"的良好设计。
- **"同阶完成多把 → 未完成的获得加成"** 巧妙地引导玩家"全职业均衡"，而不是"专精一条"。

### 8.8 放置化风险清单（从 FFXIV 教训中总结）

| 风险 | FFXIV 的表现 | 放置游戏对策 |
|---|---|---|
| **知识门槛过高** | 生产公式不公开，玩家必须依赖第三方工具（Teamcraft / Garland / Universalis） | **把关键公式写进游戏内**，并给出"达标/未达标"的明确提示 |
| **宏替代了玩法** | 顶级手法可完全宏化，导致"看宏执行"而非"思考" | 上线"随机状态 + 期望值结算"的混合制，让在线微操有溢价 |
| **仓库压力** | 6.0 HQ 废除的根因之一就是"背包爆炸" | **从设计初期就限制资源种类**（推荐 ≤ 60 种） |
| **经济崩溃 / RMT** | 长期存在打金工作室与金币买卖 | 客户端权威 + 交易限制 + 议价税 |
| **"限时窗口"惩罚离线** | ET 限时节点让玩家必须在线蹲点 | 改为"**消耗道具开启窗口**"或"**预约采集**" |
| **内容过期** | 复兴、岛屿庇护所等旧系统被"完结"后失去意义 | 保留"**永续循环**"（学迪亚德姆）或"**旧系统奖励现代化**" |
| **多货币通胀** | 每资料片新增一套 Scrip，旧票据贬值 | 放置游戏应**合并货币**（≤3 种），或允许旧货币按比例兑换新货币 |
| **充值焦虑** | 雇员（离线产出）需要付费订阅 | 放置游戏中"离线槽位"如果做成付费，会引发强烈反感 → **建议离线槽位用游戏内资源解锁** |

### 8.9 一页设计对照表（可直接抄的"FF14 → 放置"清单）

| # | FFXIV 机制 | 放置游戏实现 | 优先级 |
|---|---|---|---|
| 1 | 雇员 18 小时探险 | 派遣队伍（8/16/24h） | ★★★★★ |
| 2 | 岛屿工房每日产出 | 离线生产建筑 + 领取上限 | ★★★★★ |
| 3 | 收藏品 → 票据 | 优质产出 → 兑换点数（双货币） | ★★★★★ |
| 4 | 品质条 → HQ 率（非线性） | 成功率分段函数（见 §8.3.2） | ★★★★★ |
| 5 | CP + 耐久 + 进度 + 品质 四元组 | 我"制作小游戏"的核心循环 | ★★★★☆ |
| 6 | 素材状态 Good/Excellent | 随机暴击窗口（在线微操红利） | ★★★★☆ |
| 7 | 自定义交付（周 12 次） | 周常委托任务 | ★★★★☆ |
| 8 | 复兴（阶段推进 + 排行榜） | 赛季制社区活动 | ★★★★☆ |
| 9 | 宇宙探索（等级同步任务） | 内容扩展包（新星球） | ★★★★☆ |
| 10 | 秘籍（配方解锁） | 配方解锁树 | ★★★☆☆ |
| 11 | 专家（3 选 1 专精） | 专精槽（1–2 个） | ★★★☆☆ |
| 12 | 市场板挂单（固定价 + 税） | 异步市场（NPC 买家 + 玩家挂单） | ★★★☆☆ |
| 13 | 钓鱼（1000+ 鱼种图鉴） | 收集向支线小玩法 | ★★☆☆☆ |
| 14 | 限时/传说节点 | 消耗道具开启的稀有节点 | ★★☆☆☆ |
| 15 | 房屋（摇号 + 数千万 Gil） | 装饰系统（非核心） | ★☆☆☆☆ |

---

## 9. 来源清单

**核实日期：2026-09-15（Patch 7.56 时点）**。下表按可信度分级；标 ⚠️ 的条目表示**本次调研只能取到搜索摘要、页面本身被 Cloudflare 等反爬拦截（HTTP 403）**，因此相关结论应视为"社区口径"而非"已逐字核对"。

### 9.1 一级：官方（🟦）

| 来源 | 用途 | URL |
|---|---|---|
| 官方《Crafting & Gathering Guide》总览 + 各职业页 | 职业定义、技能表与特性表、HQ / 收藏品的官方表述 | https://na.finalfantasyxiv.com/crafting_gathering_guide/ ；`/carpenter/`、`/miner/` 等子页 |
| Lodestone 官方公告（Patch Notes / Topics） | 6.0 HQ 改动、7.x 版本改动 | https://na.finalfantasyxiv.com/lodestone/topics/detail/41725f7debe69664ef11def1ee1b772705aa453a （6.0 HQ 公告，本次取到法文版） |
| Lodestone Eorzea Database | 道具 / 配方 / 版本号（当前显示 **Patch 7.56**） | https://na.finalfantasyxiv.com/lodestone/playguide/db/ |
| Lodestone 官方 Patch Notes 一览 | 版本时间线 | https://na.finalfantasyxiv.com/lodestone/special/patchnote_log/ |
| 官方账号处罚公告（Account Penalties） | RMT / 违规封禁政策 | https://na.finalfantasyxiv.com/lodestone/news/category/1 |
| Mog Station / 官方攻略页 | 雇员数量、可选服务（现实货币） | https://secure.square-enix.com/account/app/svc/mogstation/ |
| 官方 3.3 房屋公告（价格） | 地皮基准价（小 300 万 / 中 1,600 万 / 大 4,000 万起） | Lodestone Topics（3.3 期，🟥 本次未逐字复核原始页面） |

### 9.2 二级：结构化社区数据库与工具（🟨，数据可交叉验证）

| 来源 | 用途 | URL | 限制 |
|---|---|---|---|
| **Universalis** | 全 DC 市场板挂单与成交价聚合（价格研究的基础数据源） | https://universalis.app/ | ⚠️ 本次未直接抓取，仅按社区引用 |
| **Teamcraft** | 生产模拟器、配方 / 素材树、限时节点表 | https://ffxivteamcraft.com/ | — |
| **Garland Tools** | 道具 / 配方 / 采集节点数据库 | https://www.garlandtools.org/db/ | — |
| **Gamer Escape（FFXIV Wiki）** | 技能、任务、道具条目；本次用于核实采集动作与任务列表 | https://ffxiv.gamerescape.com/ | ⚠️ 抓取被拦截（403） |
| **Console Games Wiki** | 市场板 / 系统机制条目 | https://consolegameswiki.com/wiki/Market_Board | ⚠️ 抓取被拦截（403） |
| **ff14wiki.info（日文）** | 税率 / 版本变更史等日文社区整理 | https://ff14wiki.info/ | ⚠️ 本次仅按文档既有引用 |
| **The Balance（Discord）** | 生产手法与属性阈值的社区共识 | https://thebalanceffxiv.com/ | ⚠️ 非网页可抓取内容 |

### 9.3 三级：攻略站与媒体（🟨，结论性内容需交叉验证）

| 来源 | 用途 | URL |
|---|---|---|
| **Eorzean Tavern**（本文档的主要社区攻略来源） | DoH/DoL 1–100 升级、收藏品与自定义交付、秘籍与票据、重置计时器、装备更新节点 | https://eorzeantavern.com/ （`/doh-leveling/`、`/collectables-and-custom-deliveries/`、`/master-recipe-books-and-scrips/`） |
| **Timesaver.gg** | Patch 7.51 时点的新手 Gil 获取指南（Gil 来源量级的社区口径） | https://timesaver.gg/blog/ffxiv-beginner-gil-guide-new-player |
| **17173（中文）** | 国服生产 / 采集职业介绍与中文译名对照 | https://news.17173.com/z/ff14/content/08282023/095356740.shtml |
| **Icy Veins FFXIV** | 雇员（Retainer）系统指南 | https://www.icy-veins.com/ffxiv/guide-to-retainers |
| **ProGameGuides / GameSpot / MMOJugg 等** | 房屋摇号周期、宇宙探索奖励概览、8.0 发布报道 | https://progameguides.com/final-fantasy/ffxiv-housing-lottery-schedule-dates-deadlines-details/ 等 |
| **NGA（中文）** | 7.x 版本"770HQ 战职绿装"等版本实务讨论 | https://nga.178.com/ |

### 9.4 四级：玩家个人整理（🟥 证据等级最低，但往往含有唯一可得的实测数据）

| 来源 | 用途 | URL |
|---|---|---|
| Lodestone 玩家日记《税率5％が３％に！》 | **市场税 5% → 减税都市 3% 的实测记录**（含 78 万 → 80 万 Gil 的具体案例）与"三国主城不减税"的评论区确认 | https://jp.finalfantasyxiv.com/lodestone/character/49743988/blog/5590719 |
| Lodestone 玩家日记《FFXIV Submarine Gil Farming Guide》（Pan Pacific 连载） | 潜艇收益 / ROI / 风险管理（含 2024、2025 年度报告与单 FC、100 FC 对照） | https://jp.finalfantasyxiv.com/lodestone/character/25180863/blog/5699736 （索引页） |
| Lodestone 玩家日记《Oh the QQ from crafting botters》 | 社区对制作外挂 / bot 的抱怨（RMT 章节的行为证据） | https://jp.finalfantasyxiv.com/lodestone/character/1231441/blog/239060/ |
| Reddit r/ffxiv 讨论串（含 "How long do unsold items stay on the MB?"） | 挂单期限等机制性争议 | https://www.reddit.com/r/ffxiv/ ；https://gamefaqs.gamespot.com/boards/718931-final-fantasy-xiv-online-a-realm-reborn/75596012 |

### 9.5 来源使用的三条诚实声明

1. **本文档的"数值型结论"优先采用一级来源；凡是只来自四级来源的，均在正文标 🟥 并写入 §10 核对清单。**
2. **2026 年的 FFXIV 中文社区内容极度分散**：国服版本落后于国际服，社区攻略常把不同版本的数字混用；本文档因此**尽量以国际服 7.5x 为准**，并在写法上回避"跨版本通用"的表述。
3. **本次调研中，多个主流 Wiki（Gamer Escape / Console Games Wiki / Icy Veins）对自动抓取返回 403**，相关条目只取到了搜索摘要。**凡标注"⚠️"的来源，其结论均需人工在浏览器中二次核对**（方法见 §10）。

---

## 10. 不确定项、版本时效性与后续核对清单

> **本章的目的**：把本文档中**所有不能拍胸脯保证的数字**集中列出，给出**核实方法**，并说明**8.0（2027-01）之后哪些章节会整体失效**。
> **本文基准**：国际服 **Patch 7.56 / 2026-09-15**。国服版本落后，本文数字**不可直接套用于国服**。

### 10.1 8.0《Evercold》（2027-01）会使哪些数据失效

| 本文内容 | 7.56（2026-09）现状 | 8.0 已知变化 | 失效风险 |
|---|---|---|---|
| 等级上限 100（§1.3 / §4） | 100 | **提升到 110**（🟨 Fan Fest 报道口径；❓ 官方逐字确认待核） | 🔴 高 |
| 制作装 iLv 递增节奏（§6.5） | 690 → 710 → 770 | **「Seasons（シーズン制）」把"一个赛季 = 奇数 + 偶数两个补丁"绑定**，官方意图是让装等提升节奏以"赛季"为单位，而非逐补丁 | 🔴 高 |
| 每日 / 周常循环（§7） | 日常重置 + 周重置双层 | **官方确认把每日循环改为每周循环**：每周轮换的任务清单（官方明确列举**主线剧情、采集收藏品、通关副本**等）→ 每周活跃度点数 → 提升活跃度等级并解锁装备；官方原话强调"**不会受到任何惩罚**"。⚠️ 该系统的名称（Adventure Activity）来自现场报道与德文社区记录，**官方 UI 标注"开发中，可能变更"** | 🔴 高 |
| 神典石 / 代币体系（§2.8 / §7） | 神典石（战斗向）+ 票据（生产采集向）两套并行；**7.56 官方刚把 mnemonics 神典石周上限从 450 提到 900**（✅ 官方 Patch Notes） | Seasons 重构"奖励获取与装等提升"的整体框架；**官方从未使用"removing Allagan tomestones"的措辞**——"废除神典石"是**媒体解读**；旧神典石的处置方案未公布 | 🟠 中（**媒体解读与官方表述必须区分**，见 §10.3） |
| 装备 / 配装经济（§5.3 价格形成、§5.4 绑定分层） | 每个职业需各自满足 iLv | **Armoury 系统重做：最高职业装等跨职业共享（iLv 不再逐职业绑定）** | 🟠 中：会**削弱"为每个职业配装"的需求**，进而改变制作装市场的结构 |
| 生产采集长尾内容（§6） | 宇宙探索仍在扩展 | 8.0 的新素材 / 新工具 / 新赛季内容（❓ 未知） | 🟠 中 |
| 高难内容结构（间接影响 HQ 食物药水需求） | 8 人零式 + 24 人团本 | 新增**第三个 8 人难度层**（位于入门难度与极神之间）；24 人团本进度调整；8.1 起 EVA 联动 | 🟡 低-中 |

**8.0 的其他已知信息（🟨 媒体转述 2026-04-24 Fan Fest Anaheim 主题演讲）**：

- 资料片名：**Evercold**（EN）/ **白銀のワンダラー**（JP）；**2027 年 1 月**上线。官方特设站：https://na.finalfantasyxiv.com/evercold/
- 新主线篇章「**神なき世界編（World Without Gods）**」；舞台为**第四世界（Fourth shard）**。
- 新增 **2 个职业**（坦克 + 远程物理职）；引入 **Reborn / Evolve** 战斗动作模式；免费体验版范围扩大；地区级免费匹配。
- 🟥 **命名混乱警告**：部分媒体（含中文媒体）把 8.0 写成"**Everwild**"或自创译名，**官方名称为 Evercold**——本文以官方特设站为准。
- 🟨 参考：[But Why Tho? – Patch 8.0: Every Announced Game Design Update Coming With Final Fantasy XIV Evercold](https://butwhytho.net/2026/04/ffxiv-fan-fest-patch-8-0-evercold/)（本次调研已抓取原文）

### 10.2 需要后续核对的条目（含核实方法）

优先级：🔴 = 影响本文结论成立性；🟠 = 影响数字准确性；🟡 = 影响细节完整性。

| # | 待核条目 | 本文写法 | 核实方法 | 优先级 |
|---|---|---|---|---|
| 1 | **市场板税率与"谁付"** | ✅ **已重写为"冲突并列"**（§5.3.2）：基准 5% 无争议；"谁付 / 减税后是 2% 还是 3% / 减税城市是动态还是固定"四项**来源互相矛盾**，本文不裁定 | **Universalis 实时税率 API（`/api/tax-rates`）**是社区唯一可机器读取的权威口径；其次用双账号实测同价物品在三国主城与减税都市的结算差额 | 🔴 |
| 2 | **挂单期限** | ✅ **部分核实**：JP wiki 记为"**约 1 周**后自动停售，未售物品留在雇员处但不再显示"（单一来源）；本文据此在 §5.3 采信"约 1 周"，与 §0 / §7.2 的"7 天"一致 | 挂一件冷门物品静置 8–15 天，观察是否从市场板消失 | 🟠 |
| 3 | **每名雇员的挂单槽位数** | 20 | 游戏内雇员菜单逐格计数 | 🟠 |
| 4 | **雇员探险周期（1h / 18h）与 Venture 价格** | §5.5 已标 🟥 | 游戏内雇员菜单列出全部探险名称与时长；军票价格查 GC 补给官 | 🟠 |
| 5 | **探险是否直接产出可卖 NPC 的硬币（Allagan 系列）** | §5.5 标 🟥 | 连续 50 次 Quick Exploration 记录产出 | 🟡 |
| 6 | **房屋：摇号周期（9 天）/ 建设许可价格 / 45 天自动拆除** | §5.7 已标 🟥 | 官方 Play Guide 住宅页 + Lodestone 公告；游戏内摇号面板 | 🟠 |
| 7 | **地皮 1 等 / 5 等的价格倍数（1.25）** | §5.7 标 🟨 | 游戏内同一住宅区不同 class 地皮的价格列表 | 🟡 |
| 8 | **各资料片制作装 iLv（§6.5）** | 已按"等级上限段"补齐（ARR 110 / HW 250 / SB 380 / ShB 510 / EW 640–650 / DT 770）；DT 的 7.1 / 7.2 / 7.3 中间档仍为推断，EW 的 6.x 各档存在两套社区口径 | 官方 Patch Notes 逐版本查 iLv；或 Teamcraft / Garland Tools 按版本筛选 | 🟡 |
| 9 | **秘籍编号（I–XII）在 8.0 的新增（XIII / XIV）** | §6.6 | 官方 Patch Notes 8.0 章节 | 🟡 |
| 10 | **"传承录"这一中文译名到底指什么** | §6.6 已标 🟥（疑为「秘伝書 / Master Recipe Book」的另一种译法） | 以日文原文「秘伝書」为锚点，对照国服客户端道具名 | 🟠 |
| 11 | **Gil 上限（999,999,999）与免费体验版上限（300,000）** | §5.8 | 官方 Play Guide / Free Trial 页面 | 🟡 |
| 12 | **宇宙探索各"星"的确切补丁号** | ✅ **已核实并写入 §6.4**：Sinus Ardorum = **7.21**、Phaenna = **7.31**、Oizys = **7.41**、Auxesia = **7.51** | — | ✅ 完成 |
| 13 | **FC 潜艇 / 飞空艇的数量上限与燃料（Fuel Barrel）机制** | §5.6 标 🟥 | 官方 Play Guide 部队工房页；Pan Pacific 的潜艇指南系列 | 🟠 |
| 14 | **潜艇收益量级** | ✅ **已补入 §5.6**（单 FC / 4 艘：日均 474,464 Gil、年均 148.55M、初期投入 45.76–47.26M、回本 ≈3.4 个月；60 FC / 240 艘：总营收 69.09 亿 Gil），并已标注"单人实测 / 仅作量级参考" | 若要更稳妥，可核对 Pan Pacific 的 2024 / 2025 年度报告与季度对照 | 🟡 |
| 15 | **8.0 Seasons 与 Adventure Activity 的最终规则** | §10.1 / §10.3 | 2026 年内的 JP / EU Fan Fest 报道 + 官方 Evercold 特设站 + 8.0 Patch Notes | 🔴 |
| 16 | **7.5x 期间宇宙探索是否还有新星** | §6.4 写"仍在扩展" | 官方 Patch Notes 7.55 / 7.56 的内容列表 | 🟡 |
| 17 | **Cosmic Tools 的 Advanced / Expert iLv 与 Tool Data 需求量** | §6.4 只写"社区记为 755–765 与 'of Stars' 780" | 游戏内 **Cosmic Research** 界面；官方 Patch Notes 7.4x / 7.5x | 🟠 |
| 18 | **"同阶完成加成"（+50% / +100% / +150%）与 "Stellar Opportunity" 这一命名** | §6.4 已标 🟥（仅见于社区攻略） | 游戏内 Cosmic Research / Cosmic Fortune 界面；官方 Cosmic Exploration 特设页 | 🟡 |

#### 10.2.1 本轮调研已核实 / 已更正的条目（2026-09-15）

下表是**本轮（补齐 §5 / §6 时）已经查实并已写入正文**的条目——保留在此以便后续维护者确认"哪些已经不是不确定项"：

| 条目 | 结论 | 依据 |
|---|---|---|
| 房屋摇号周期 | ✅ **9 天 = 5 天申请 + 4 天结果**（官方原文口径） | Lodestone 官方 6.1 公告 |
| 房屋押金与罚则 | ✅ 申请需缴**全额地价**作押金且**不可撤回**；中签未领 → **扣 50%**；落选全退（90 天内领取） | 同上 |
| 房屋资格 | ✅ 个人：Lv50 + 军衔 Second Lieutenant 以上；FC：rank 6+ / 成员 ≥4 / 入会 ≥30 天；**每账号每 World 限 1 块个人地 + 1 块 FC 地** | 同上 |
| 地皮价格（5 档） | ✅ 官方 3.3 表：小 **3,000,000–3,750,000** / 中 **16–20M** / 大 **40–50M**；旧机制最低价 小 **1,488,000** 起；**6.1 起废除"随时间降价"** | 官方 3.3 / 6.1 公告 |
| 自动拆除 | ✅ **45 天**；第 30 天提示、35 / 42 天邮件；进入即取消；拆除后可赎回地价 **80%**（35 天内） | 官方公告 |
| 市场板槽位 | ✅ 每雇员 **20 格**（两个独立来源一致） | Timesaver / DCGameBlog |
| 上架费 | ✅ **不存在**上架费或押金 | 多来源 |
| 雇员探险时长与消耗 | ✅ **指定筹措 1 小时（消耗 1 枚 Venture）/ 探索 18 小时（消耗 2 枚）/ Quick Exploration 1 小时（雇员 Lv10 解锁，消耗 2 枚）** | 玩家博客 + JP wiki |
| Venture 价格 | ✅ **200 军票 / 枚** | JP wiki |
| 潜艇消耗品与航时 | ✅ Repair Kit **1,700 Gil**、Ceruleum Tank **≈400 Gil**；航时 = **固定 +12 小时** + 航行时间 | 玩家实测报告 |
| Cactpot 币种 | ✅ **Jumbo / Mini Cactpot 使用 MGP 而非 Gil**（100 / 150 / 200 MGP 与 10 MGP） | 官方 Gold Saucer 页 |
| 多玛飞地（Doman Enclave） | ✅ **净 Gil 来源**：NPC 收购价的 **120% → 200%**，周额度 **20,000 → 40,000 Gil** | 社区攻略（转述官方机制） |
| 宇宙探索各星补丁号 | ✅ Phaenna = **7.31**、Oizys = **7.41**、Auxesia = **7.51** | 官方 Patch Notes / 官方专题页 |
| 复兴阶段数 | ✅ **建筑阶段 4 个**（5.11 / 5.21 / 5.31 / 5.41）；所谓"第五阶段"实为 5.5 的复兴祭典 | 官方 Lodestone + 攻略站 |
| 复兴排行赛季 | ✅ 官方 **3 个赛季**，结束日分别为 2020-03-19 / 2020-09-18 / 2021-01-21 | 官方 Lodestone Topics |
| 迪亚德姆现行机制 | ✅ 采集职业专用、**没有探索 / 紧急任务**（那是 3.x–5.1 旧版机制）、素材需鉴定且按 10 个一组 | 攻略站 |
| 岛屿庇护所实装版本 | ✅ **6.2 实装**（不是 6.0），6.5 提到 R20 后冻结 | 玩家实测 + 攻略站 |
| 8.0 名称与档期 | ✅ **Evercold**（JP 白銀の探求者（ワンダラー））、**2027 年 1 月**、等级上限 **110** | 官方特设站 + Fan Fest 报道 |
| Seasons 官方口径 | ✅ "**A redesigned framework for earning rewards and increasing item level**"；**一个赛季 = 奇偶两个补丁**；承诺不涨价 / 无 Battle Pass | 官方特设站 + 官方新闻稿 |
| 神典石存废 | ⚠️ **官方从未说"废除"**；7.56 反而把 mnemonics 神典石周上限 **450 → 900** | 官方 Patch 7.56 Notes |

### 10.3 特别注明：8.0 的「Seasons / Adventure Activity」引用纪律

这是本文档要求**必须严格区分"官方表述"与"媒体解读"**的一项：

| 事项 | 官方口径（🟦 / 🟨） | 媒体解读（🟨） | 本文采信 |
|---|---|---|---|
| **Seasons** | ✅ **官方**。Evercold 特设站原文：*"Introducing Seasons — A redesigned framework for earning rewards and increasing item level."*；SE 官方新闻稿：*"Seasons: An overhaul to the way players earn rewards and improve their characters"* | 有媒体直接把 Seasons 等同于"Battle Pass 式赛季制" | **明确否定 Battle Pass 说法**（官方现场已否认涨价 / 内购 / 通行证） |
| **Adventure Activity** | ⚠️ **名称未在官方文本中确认**：来自现场报道与德文社区记录；官方 UI 截图被标注"**仍在开发中，可能变更**"。但**"每日 → 每周"的机制描述本身有多语种官方引语支撑** | 部分标题写作 "Weekly Activity System"、"用 Adventure Activity 取代日常" | **机制采信、名称加 ⚠️**：写"每周轮换任务 + 活跃度点数"，名称写作"Adventure Activity（⚠️ 名称待官方确认）" |
| Seasons 是什么 | **一个赛季 = 奇数补丁 + 偶数补丁**（例：7.0 + 7.1 = 一个赛季）；目的是让两个补丁被视为一个整体；**官方明确承诺不涨价、不做 Battle Pass、不加内购** | — | 沿用官方 |
| 是否废除神典石 | **官方未宣布废除**。Evercold 特设站与新闻稿只谈 Seasons；**7.56 官方反而把 mnemonics 神典石周上限 450 → 900**（过渡期配平，✅ 官方 Patch Notes）；Yoshi-P 只是用"收集了 13 年亚拉戈神典石"作为"fight fatigue"的引子 | 大量标题写作"FFXIV 废除亚拉戈神典石""结束每日刷取" | **本文一律写"媒体解读为废除"，绝不写"官方废除"** |
| 周常化的确切范围 | 每日循环 → **每周系统**：玩家**收集点数**完成每周目标；任务清单**每周轮换**（含**主线、采集收藏品、副本**）；界面显示累计进度并在等级提升时解锁装备；**不上线不受惩罚**（官方原话："不会受到任何惩罚"） | 有媒体概括为"废除日常" | 写"**每日循环周常化 + 多来源点数 + 零惩罚**"，不写"废除日常" |

**对本文档的影响（🟨 本文判断）**：

- 本文 §7 的"日常 / 周常循环点"分析**在 8.0 之后必须重做**——尤其是"日级：GC 筹备、部族任务、每日理符"这一层，需要重新确认哪些被并入每周。
- **生产采集的票据体系（橙票）与神典石是两套系统**。即使战斗向代币被重构，**生产采集的"收藏品 → 票据 → 秘籍"闭环不一定会同步改变**；在 8.0 Patch Notes 出来前不能预设。
- 对放置游戏而言，**"每周自选进度 + 缺勤补领"是一个非常积极的信号**：FFXIV 正在向"**不惩罚离线 / 允许补领**"的方向走，这与放置游戏的设计哲学**同向**。

### 10.4 版本时效性总表（哪些章节最脆）

| 章节 | 内容类型 | 时效风险 | 更新触发条件 |
|---|---|---|---|
| §0 | 速览数字（含税率 5% / 2% 的旧写法） | 🔴 **已知存在问题** | 完成 §10.2 第 1、2 项核对后立即修订 |
| §1 / §4 | 职业、等级、经验来源 | 🟠 | 8.0 等级上限提升、新职业 |
| §2 | 生产机制、技能表、票据 | 🟠 | 8.0 Patch Notes 中的生产改动 |
| §3 | 采集机制、动作表 | 🟠 | 同上 |
| **§5** | **经济（税 / 市场 / 房屋 / 雇员）** | 🟠 | 税率与挂单规则一旦改动，本节的结论表需重算 |
| **§6** | **长尾内容** | 🟠 | 8.0 新系统上线；宇宙探索新星 |
| §7 | 日常 / 周常循环 | 🔴 **8.0 必定失效** | Adventure Activity 上线 |
| §8 | 面向放置游戏的映射设计 | 🟢 相对稳定 | 属设计推演，不随版本失效 |
| §9 | 来源清单 | 🟡 | 建议每半年复核一次链接可用性 |
| §10 | 本章 | — | 每次核对后更新状态 |

### 10.5 文档维护约定（给下一位接手者）

1. **每次修订必须更新文首的"调研日期"与"游戏版本基准"**，并把 §10.2 中已核实的条目打勾（✅）而不是删除。
2. **凡新增数字，必须就地标注级别（🟦 / 🟨 / 🟥）**；无法核实的数字宁可不写，也不要给"大概的数"。
3. **发现与既有章节冲突时（如本次的税率问题）**：在新章节写清冲突、标明本文采信的版本，并在 §10.2 登记——**不要静默改写旧章节**，否则会丢失"文档曾经相信什么"的信息。
4. **8.0（Evercold，2027-01）上线后**：优先重做 §7（周期）、§6.5（装等节奏）、§0（速览），其次复核 §5（经济）与 §2.8（票据）。

> **本章最后一句**：本文档的**设计推演部分（§8）比事实部分（§0–§7、§9）更耐久**。FFXIV 的具体数字会随 8.0 过期，但"**离线产出必须有上限、必须有多层周期、必须有与产出成比例的 sink、必须让新内容对全等级段开放**"这四条结论，来自 13 年运营的结构性经验，不会随版本失效。

---

*（文档完 · 最后更新 2026-09-15 · 覆盖至 Patch 7.56；8.0《Evercold》信息为 2026-04 前公开情报）*




---




