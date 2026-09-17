# 《最终幻想14》世界观骨架 — 调研笔记（A-world）

> 调研员：FFXIV 资料调研员（子代理）
> 调研日期：**2026-09-15**
> 游戏版本基线：**7.5**（Dawntrail 资料片线；7.0 于 2024-07-02 上线，7.1 / 7.2 / 7.3 / 7.4 / 7.5 已发布）
> 本文性质：**调研笔记**，不是最终交付物。带大量剧透（至 7.x），请按需使用。

---

## 0. 调研方法与来源可信度说明（重要，请先读）

### 0.1 本次联网调研的实测可达性

本次调研使用 `web_search` + `web_fetch`，共执行 **40+ 次**搜索/抓取。实测结果如下（这决定了本文每条结论的引用质量）：

| 目标来源 | 实测状态 | 用途 / 备注 |
|---|---|---|
| `na.finalfantasyxiv.com/a_realm_reborn/sp/world/**` | ✅ 200 可抓取 | **一手官方**：世界观、城邦、种族、威胁、蛮神页 |
| `na.finalfantasyxiv.com/lodestone/special/**` | ✅ 200 可抓取 | **一手官方**：Grand Companies、Garlean Empire、短篇小说 |
| `na.finalfantasyxiv.com/{dawntrail,endwalker,stormblood,...}/**` | ✅ 200 可抓取 | **一手官方**：资料片世界页 / Story So Far |
| `na/eu/jp/fr/de.finalfantasyxiv.com/lodestone/character/*/blog/*` | ✅ 200 可抓取 | **社区整理**（官方平台上的玩家投稿，非官方设定） |
| `www.rpgfan.com` | ✅ 200 可抓取 | 二次文献（评论文，非官方） |
| `finalfantasy.fandom.com` / `ffxiv.fandom.com` | ❌ fetch failed（DNS/网络层） | 搜索命中但无法打开全文 |
| `ffxiv.consolegameswiki.com` | ❌ HTTP 403（Cloudflare） | 同上 |
| `ffxiv.gamerescape.com` | ❌ HTTP 403（Cloudflare） | 同上 |
| `en.wikipedia.org` | ❌ "resolves to a non-public IP address" | 同上 |
| `game8.co` / `destructoid.com` / `tvtropes.org` / `vintageisthenewold.com` | ❌ 403（CloudFront/Cloudflare） | 同上 |
| `thegamer.com` / `gamerant.com` / `polygon.com` / `hardcoregamer.com` / `screenrant.com` / `gamefaqs` | ❌ fetch failed | 同上 |
| `web.archive.org` | ❌ fetch failed | 无法用快照绕过 |

**因此本文的引用纪律是：**

1. 凡我**真正抓取到全文**并引用的，标注来源链接，并标【官方设定】或【社区整理】。
2. 凡只在 `web_search` 结果列表中看到标题/URL、**未能抓取全文**的，我会明确写"（仅搜索命中，未能验证）"，并给出链接，**不把它当作已核实的事实**。
3. 任务指定的优先来源（`ffxiv.consolegameswiki.com`、`finalfantasy.fandom.com`、`gamerescape.com`）在本次网络环境下**全部不可达**，这是本次调研的主要限制（见 §10 存疑清单）。

### 0.2 标注约定

- 【官方设定】：出自 Square Enix 官方网站 / The Lodestone 官方页面 / 游戏内文本转述。
- 【社区整理】：出自玩家维基、玩家博客、媒体文章等二手来源。
- 【推测】：明确是玩家推理、且官方未确认。
- 【未验证】：搜索命中但无法打开全文。
- 「截至 7.x」：标注版本时效性；FFXIV 的设定会随资料片被追认或改写，7.0 之后尤其明显。

---

## 1. 艾欧泽亚（Eorzea / エオルゼア）

### 1.1 官方定义

【官方设定】官方 ARR 世界观页对艾欧泽亚的定义原文：

> "Comprised of Aldenard, the westernmost of the Three Great Continents, and its surrounding islands, the realm of Eorzea has been the cradle of several unique civilizations throughout history."
> （由"三大洲"中最西的**阿尔德纳德**及其周边岛屿构成，艾欧泽亚是诸多独特文明的摇篮。）
> —— [FINAL FANTASY XIV: A Realm Reborn — The Crystal's Call](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/story)

【官方设定】同一页对故事舞台的定位：

> "Amid azure seas, encompassing the westernmost of the Three Great Continents, there lies a realm embraced by gods and forged by heroes. Her name...Eorzea."
> —— [ARR 世界观页](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/story)

**要点拆解（官方）：**

| 概念 | 内容 | 来源 |
|---|---|---|
| 艾欧泽亚 = 地理 | 阿尔德纳德大陆（Aldenard）+ 其周边岛屿 | [官方](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/story) |
| 三大洲（Three Great Continents） | 阿尔德纳德 Aldenard / 伊尔萨巴德 Ilsabard / 欧萨德 Othard | [官方](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/story) |
| 艾欧泽亚 ≠ 全部世界 | 艾欧泽亚只是"三大洲最西端 + 岛屿"，是**区域名**，不是星球名、不是大陆名 | 同上 |
| 星球名 | **海德林 Hydaelyn**（本义，见 §4.1） | 同上 |
| 母水晶 | the Mothercrystal "the source of all life"（万生命之源） | 同上 |

### 1.2 地理特征（官方原文）

【官方设定】：

> "Towering mountains dominate the north, their peaks forever lashed with icy winds; to the south, a bleak expanse of unforgiving desert holds sway. Yet these inhospitable lands hold irresistible lure for man and monster alike, for wide and deep flow the currents of aether, and rich are the veins of power-infused crystal."
> —— [ARR 世界观页](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/story)

- **北部**：高耸山脉、终年寒风（对应库尔札斯 Coerthas 及更北）。
- **南部**：荒凉沙漠（对应萨纳兰 Thanalan）。
- **关键资源**：**以太之流（currents of aether）又宽又深**，且**蕴含力量的结晶矿脉丰富**——这是艾欧泽亚"蛮神频出 + 城邦争夺"的物质基础，也是官方给出的"为什么这片土地如此重要"的答案。

### 1.3 官方公布的"艾欧泽亚主要城邦/地区"清单

【官方设定】官方 LOCATIONS 页只列了 6 个条目，这是官方的"城邦/地区"入门名单：

| 中文 | 英文 | 官方页 | 备注 |
|---|---|---|---|
| 乌尔达哈 | Ul'dah | [/cities/ul-dah/](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/cities/ul-dah/) | 三大城邦之一 |
| 格里达尼亚 | Gridania | [/cities/gridania/](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/cities/gridania/) | 三大城邦之一 |
| 利姆萨·罗敏萨 | Limsa Lominsa | [/cities/limsa-lominsa/](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/cities/limsa-lominsa/) | 三大城邦之一 |
| 摩杜纳 | Mor Dhona | [/cities/mor-dhona/](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/cities/mor-dhona/) | 非城邦，2.0 后的核心据点区域 |
| 阿拉米格 | Ala Mhigo | [/cities/ala-mhigo/](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/cities/ala-mhigo/) | 被加雷马占领后于 4.0 解放 |
| 伊修加德 | Ishgard | [/cities/ishgard/](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/cities/ishgard/) | 3.0 舞台，宗教国家 |

来源：[官方 LOCATIONS 索引](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/cities/)

### 1.4 星极时代 / 灵极时代循环（Astral Era / Umbral Era）

【官方设定】官方把艾欧泽亚史观直接写成"**繁荣的星极时代（Astral Era）与灾难性的灵极时代（Umbral Era）交替循环**"：

> "In this harsh though vibrant region, the people of Eorzea have carved out their histories—a cycle of prosperous Astral and disastrous Umbral eras."
> —— [ARR 世界观页](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/story)

- **第一灵极时代（First Umbral Era）**：终结了"**诸神的时代**"（the age of the gods）。
- **第一星极时代（First Astral Era）**：开启了"**人类的时代**"（the age of man）。
- 此后共有**六次灵极灾难时代**。
- **预言**：官方引用"千眼梅萨雅（Mezaya Thousand Eyes）"《神典》第七节——"**六之太阳（senary sun，第六星极时代）终将终结**，**七之月（septenary moon，第七灵极时代）将把阴影投向大地**"。

来源：[ARR 世界观页](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/story)（此段为**灵灾体系**的官方骨架，详见 §5.4）

### 1.5 以太之光（Aetheryte）与以太传送网

【官方设定】官方在 ARR 世界观页里把"以太之光"写成**召唤冒险者的叙事装置**：

> "You who would heed the whisperings of the aetheryte and take up the mantle of 'adventurer.'"
> —— [ARR 世界观页](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/story)

**游戏系统层面（以下为【社区整理】，我未能抓取到官方说明全文，链接仅搜索命中）：**

| 概念 | 日文/英文 | 说明 | 状态 |
|---|---|---|---|
| 以太之光（大水晶） | Aetheryte / エーテライト | 城镇与据点的大型水晶，玩家"调谐（attune）"后可传送 | 【社区整理】([Aetheryte, Fandom](https://ffxiv.fandom.com/wiki/Aetheryte)) |
| 以太之网 | Aethernet / エーテライトネットワーク | 城内小水晶网络，城内短距传送 | 同上 |
| 传送费 | Teleport fee | 依距离与是否"偏爱（Favourite）"计价，费用以**吉尔（Gil）**结算 | 【社区整理】([GameFAQs 讨论](https://gamefaqs.gamespot.com/boards/718931-final-fantasy-xiv-online-a-realm-reborn/71433881)，未验证） |
| 返回 | Return | 回到绑定以太之光 | 同上 |
| 剧情设定中的"以太之光" | — | 设定上以太之光是**以太之流汇聚的结晶**，与"以太之流（aetherial currents）"概念绑定 | 【官方】间接依据：官方称艾欧泽亚"以太之流又宽又深" |

> ⚠️ **待核实**：以太之光在**设定层**的运作机制（是否消耗以太、为何需要调谐、与"以太之流"的关系），我未找到可抓取的官方设定原文。建议后续用 Encyclopaedia Eorzea 或 consolegameswiki 补足。

### 1.6 "都市国家 / 城邦"与城邦联盟（Eorzean Alliance）

【官方设定】**都市国家（city-state）**在官方叙述中是一种"**军政经技一体化的自救组织母体**"。官方 Grand Companies 页给出了最完整的定义：

> "For thousands of years, Eorzea has been victim to a catastrophic cycle of destruction and rebirth that periodically envelops the realm and threatens all who live upon her soil; each time faced with a tragedy seemingly worse than the last, however, the peoples of Eorzea have found some way to persevere. One method, seemingly going back hundreds of generations, has been the establishment of comprehensive command centers which combine the military, economic, and technological resources of a city-state in order to better prepare it for the coming doom. These are the Grand Companies of Eorzea."
> —— [Grand Companies of Eorzea（官方）](https://na.finalfantasyxiv.com/lodestone/special/grandcompany/)

**由此推出"城邦"的官方内涵**：城邦 = 拥有**军事、经济、技术资源**并可将其统合为一个**国防联军（Grand Company）**的政治实体。这正是"都市国家"概念在 FF14 里的功能定位。

**国防联军（Grand Companies）的历史年表（官方）：**

| 时间点 | 事件 | 来源 |
|---|---|---|
| 约 **1,500 年前** | 上一次有记录的国防联军出现，**第五星极时代末期**，为大洪水（the great deluge）做准备；大洪水引发**第六灵极时代** | [官方](https://na.finalfantasyxiv.com/lodestone/special/grandcompany/) |
| 当时效果 | 让**互相敌对的城邦搁置仇恨、结成联盟**，使艾欧泽亚幸存 | 同上 |
| **第六星极时代末期** | 利姆萨·罗敏萨、格里达尼亚、乌尔达哈**三城邦重建国防联军**，作为阻止第七灵极时代到来的最后手段 | 同上 |
| 结果 | 抵抗蛮族与蛮神、以及来自北方的**加雷马帝国**入侵者 | 同上 |
| **第七灵灾** | 达拉穆德（Dalamud，"小月亮"）坠于**卡尔提诺平原（Carteneau Flats）**，从中出现**上古蛮神巴哈姆特**，以火焰焚烧大地 → **第七灵极时代**开始 | 同上 |
| **五年后（2.0）** | 国防联军在冒险者协助下重建艾欧泽亚 | 同上 |

【官方设定】官方题词（Scarlet Lancer Field Marshal Ealdic the Pious）：

> "And though the Land is riven and the Heavens torn asunder / It is from this Chaos that our bonds are given strength."
> —— [官方](https://na.finalfantasyxiv.com/lodestone/special/grandcompany/)

**三大国防联军（Grand Companies）：**

| 城邦 | 国防联军 | 中文常用译名 | 官方页 |
|---|---|---|---|
| 利姆萨·罗敏萨 | The Maelstrom | 黑涡团 | [/maelstrom/](https://na.finalfantasyxiv.com/lodestone/special/grandcompany/maelstrom/) |
| 格里达尼亚 | The Order of the Twin Adder | 双蛇党 | [/twinadder/](https://na.finalfantasyxiv.com/lodestone/special/grandcompany/twinadder/) |
| 乌尔达哈 | The Immortal Flames | 恒辉队 | [/immortalflames/](https://na.finalfantasyxiv.com/lodestone/special/grandcompany/immortalflames/) |

来源：[官方 Grand Companies 索引](https://na.finalfantasyxiv.com/lodestone/special/grandcompany/)

> ⚠️ **版本时效性**：以上三名称为 2.0 时期的官方框架。**城邦联盟（Eorzean Alliance）**在 3.0 之后吸纳伊修加德、4.0 之后涉及阿拉米格与多玛，具体成员与状态请见 §2、§3 与 §10 存疑清单。

### 1.7 冒险者与冒险者行会（Adventurers' Guild）

【官方设定】官方给出的设定内起源：

- "adventurer"一词在艾欧泽亚**普及不过十余年**。
- 起因：**"平静时代（Age of Calm）"**来临后，一位**佣兵队长**聚集可信同伴，成立了以"帮助整个艾欧泽亚"为宗旨的行会，挂出招牌——"Adventurers' Guild（冒险者行会）"。
- 此后行会**扩展到各主要国家**；人们带着各种委托前来，从讨伐害兽到打造精品。

来源：[ARR 世界观页](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/story)

> 📌 这是理解"玩家角色为何能自由穿梭各城邦"的设定基础：**冒险者行会是跨国界的**。

### 1.8 官方列出的"艾欧泽亚的威胁（THREATS）"

【官方设定】官方 THREATS 分类下的条目（2.0 时期）：

| 条目 | 官方页 |
|---|---|
| 加雷马帝国 Garlean Empire | [/threats/garleanempire/](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/threats/garleanempire/) |
| "黑狼" 盖乌斯·范·巴埃萨 Gaius van Baelsar | [/threats/gaiusvanbaelsar/](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/threats/gaiusvanbaelsar/) |
| "白鸦" 奈尔·范·达纳斯 Nael van Darnus | [/threats/naelvandarnus/](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/threats/naelvandarnus/) |
| 加雷马初代皇帝 索鲁斯·佐斯·加尔乌斯 Solus zos Galvus | [/threats/soluszosgalvus/](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/threats/soluszosgalvus/) |
| 尼禄·托尔·斯卡埃瓦 Nero tol Scaeva | [/threats/nerotolscaeva/](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/threats/nerotolscaeva/) |
| 莉维亚·萨斯·尤尼乌斯 Livia sas Junius | [/threats/liviasasjunius/](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/threats/liviasasjunius/) |
| 瑞塔赫廷·萨斯·阿尔维纳 Rhitahtyn sas Arvina | [/threats/rhitahtynsasarvina/](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/threats/rhitahtynsasarvina/) |
| **无影 The Ascians** | [/threats/theascians/](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/threats/theascians/) |

来源：[官方 THREATS 侧栏](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/threats/theascians/)

【官方设定】无影的 2.0 时期官方描述（**注意：这是"当时玩家所知的版本"，6.0 后被彻底重写**）：

> "Known also as 'Paragons,' these malevolent, black-robed figures sow the seeds of conflict across the lands of Eorzea. Just as their faces are concealed by sinister masks, the true motives of the Ascians remain obscured behind veils of secrecy and terror."
> （又称"Paragon（典范者）"，这些邪恶的黑袍身影在艾欧泽亚各地播下纷争的种子。正如其面容被邪恶面具遮蔽，无影的真实动机也隐于秘密与恐怖的帷幕之后。）
> —— [官方 The Ascians](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/threats/theascians/)

---

## 2. 三大城邦与主要国家

> 本节正在由并行调研补全（官方城邦页 `/world/cities/*` 的逐页抓取）。以下先给出**已确证的官方骨架**，细节随后补入。

### 2.1 三城邦官方三角关系（已确证）

【官方设定】三大城邦 = **利姆萨·罗敏萨 / 格里达尼亚 / 乌尔达哈**，它们是"第六星极时代末期重建国防联军"的三方。

来源：[官方 Grand Companies](https://na.finalfantasyxiv.com/lodestone/special/grandcompany/)

### 2.2 格里达尼亚（Gridania）——契约速查

| 项目 | 内容 | 状态 |
|---|---|---|
| 所在区域 | 黑衣森林（The Black Shroud） | 待补官方页 |
| 支配性力量 | 元灵（The Elementals）与"绿之怒（Greenwrath）"信仰 | 待补 |
| 幻术皇 | Elder Seedseer **嘉恩·艾·森纳（Kan-E-Senna）** | 待补 |
| 国防联军 | 双蛇党（Order of the Twin Adder） | 【官方】名称已确证 |
| 治安组织 | Wood Wailers（森之守望者）、Gods' Quiver（神之箭袋） | 待补 |
| 官方页 | [/cities/gridania/](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/cities/gridania/) | — |

### 2.3 乌尔达哈（Ul'dah）——契约速查

| 项目 | 内容 | 状态 |
|---|---|---|
| 所在区域 | 萨纳兰（Thanalan） | 待补官方页 |
| 政体 | 苏丹娜（Sultanate）制 + 六大商会组成的**辛迪加（Syndicate）** | 待补 |
| 君主 | 苏丹娜 **娜娜莫·乌尔·娜莫（Nanamo Ul Namo）** | 待补 |
| 国防联军 | 恒辉队（Immortal Flames） | 【官方】名称已确证 |
| 军事领袖 | **劳班·阿尔丁（Raubahn Aldynn）**，原斗技场冠军 | 待补 |
| 经济 | 采矿 + 货币（Gil）+ 斗技场（Coliseum），"金钱之城" | 待补 |
| 富豪 |  monetarist（重商派）；**罗薇娜（Rowena）** 与其商号 | 见 §2.6 存疑 |
| 官方页 | [/cities/ul-dah/](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/cities/ul-dah/) | — |

### 2.4 利姆萨·罗敏萨（Limsa Lominsa）——契约速查

| 项目 | 内容 | 状态 |
|---|---|---|
| 所在区域 | 拉诺西亚（La Noscea），加尔迪翁湾（Galadion Bay） | 待补官方页 |
| 政体 | 提督（Admiral）制 / 海上霸权（thalassocracy） | 待补 |
| 提督 | **梅尔维布·布罗菲斯温（Merlwyb Bloefhiswyn）** | 待补 |
| 国防联军 | 黑涡团（The Maelstrom） | 【官方】名称已确证 |
| 治安组织 | 黄夹克（Yellowjackets）、梭鱼骑士团（Knights of the Barracuda）、梅尔瓦恩之门（Mealvaan's Gate，海关） | 待补 |
| 社会底色 | 海盗（pirates）出身，后转向正规化 | 待补 |
| 官方页 | [/cities/limsa-lominsa/](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/cities/limsa-lominsa/) | — |

### 2.5 伊修加德（Ishgard）与龙诗战争 — 已获取的详细内容

【官方设定】官方把伊修加德列为 6 大"LOCATIONS"之一，3.0 舞台。

【社区整理 / 二次文献】RPGFan 的评论文对**龙诗战争（The Dragonsong War）**的"表层叙事 vs 真实历史"给了很清楚的整理（注意：这是媒体二次文献，非官方原文，但与我对方括号内官方/游戏内容的记忆一致）：

**教会官方版本（谎言）：**
- 托尔丹（Thordan）是一个**普通的精灵族（Elezen）男性**，受神召唤，率领追随者与"十二骑士（The Knights Twelve）"前往应许之地"伊修加德"。
- 为开辟新纪元，托尔丹需**在漂浮岛屿之间架起桥梁**。
- 和平的移民者遭巨龙**尼德霍格（Nidhogg）**袭击，托尔丹被杀害，近乎弑神 → **龙诗战争**开始，持续约 1,000 年。

**真实历史：**
- 精灵族抵达阿尔德纳德本身即与龙族冲突的开端。
- 巨龙**赫拉斯瓦尔格（Hraesvelgr）**与人类女性**希瓦（Shiva）**的结合，带来 **200 年相对和平**。
- 托尔丹**欺骗并杀害了拉塔托斯克（Ratatoskr）**——尼德霍格与赫拉斯瓦尔格的妹妹——并与十二骑士**分食其眼**，以超越自身形态（获得龙之力）。
- 尼德霍格暴怒，杀死托尔丹与 4 名骑士；托尔丹之子**哈尔德拉特（Haldrath）**反去挖出尼德霍格双眼。
- 存活的 **4 名骑士**负责"创建圣地"，**把事实变成神话**，并把自己立为新社会的**血统贵族**。
- 后果：伊修加德的上层合法性建立在伪造史上；底层贫民区 **The Brume（烟囱区/布鲁姆）** 长期无代表权。
- 现代：**大主教托尔丹七世（Thordan VII）** 与私生子 **艾梅里克·德·博雷尔（Aymeric de Borel）** 对立；托尔丹七世与尼德霍格均被讨伐。
- 结局：伊修加德转向**两院制立法机构**（类似英国的上议院/下议院），由 **福尔唐伯爵（Count Edmont de Fortemps）** 撰写回忆录《苍穹之禁城（Heavensward）》作为新叙事的起点。

来源：[RPGFan — The Sins of Antiquity](https://www.rpgfan.com/feature/the-sins-of-antiquity-history-reparations-and-justice-in-final-fantasy-xivs-holy-see-of-ishgard/)【社区整理/二次文献】

【官方设定】官方 Story So Far 对 3.0 的官方摘要：

> "Owing to schemes in the shadows of Ul'dah, the Scions of the Seventh Dawn have been scattered, and the Warrior of Light has been forced to flee north. Though granted shelter by Lord Haurchefant, our heroes must press on to Ishgard─a nation both secluded and reclusive, the entire region locked in a never-ending struggle with dragons. Only through the most courageous of deeds is this ceaseless war ended, and peace allowed to reign once more."
> —— [官方 Endwalker: The Story So Far](https://na.finalfantasyxiv.com/endwalker/patch_6_0/story)

### 2.6 阿拉米格（Ala Mhigo）与多玛（Doma）

【官方设定】官方 Story So Far 对 4.0 的官方摘要（含关键数字与人物）：

> "Having brought an end to the thousand-year conflict between dragon and man in the north, the Warrior of Light and his comrades prepare to liberate Ala Mhigo, a land conquered by the Garlean Empire twenty years ago. Meanwhile, in the Far East, the freedom fighters of the fallen nation of Doma struggle to rekindle the fires of hope in their countrymen. Eorzea's champion rises, leading Doma's rebels in a bid to overthrow their subjugators, before turning to Ala Mhigo and reclaiming the region from the iron grip of Zenos yae Galvus."
> —— [官方 Endwalker: The Story So Far](https://na.finalfantasyxiv.com/endwalker/patch_6_0/story)

**由此可确证（官方）：**

| 事实 | 内容 |
|---|---|
| 阿拉米格被加雷马征服的时间 | **20 年前**（相对 4.0） |
| 伊修加德—龙族战争时长 | **千年**（thousand-year） |
| 4.0 的双线结构 | 东方 **多玛（Doma）** 叛乱 → 回头解放 **阿拉米格** |
| 阿拉米格的总督 | **芝诺斯·耶·加尔乌斯（Zenos yae Galvus）** |
| 多玛的性质 | "**已灭亡国家（the fallen nation of Doma）**"的自由战士 |

### 2.7 摩杜纳（Mor Dhona）与"灵灾改变地理"

【官方设定】摩杜纳被单独列为 LOCATIONS 之一（[/cities/mor-dhona/](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/cities/mor-dhona/)）。其设定地位是"**第七灵灾的爆心/以太结晶化的荒野**"——但**我未能抓取该页全文**，具体描述待补。

【官方设定】可确证的因果链：第七灵灾中**达拉穆德坠落于卡尔提诺平原**，**巴哈姆特**从中出现并**以火焰焚烧大地**，直接导致第六星极时代终结、第七灵极时代开始。

来源：[官方 Grand Companies](https://na.finalfantasyxiv.com/lodestone/special/grandcompany/)

> ⚠️ **待补**：库尔札斯（Coerthas）因灵灾变为永雪之地的官方描述、摩杜纳以太结晶化的官方描述。

### 2.8 罗薇娜（Rowena）——需要更正的一处常见误解

> ⚠️ **重要更正**：任务描述把"罗薇娜"与乌尔达哈女王/恒辉队列在一起。**罗薇娜（Rowena）不是乌尔达哈的统治者**，她是**经营"罗薇娜的宝物库（Rowena's House of Splendors）"的富商**，据点主要与**摩杜纳（Revenant's Toll）/ 伊迪尔夏（Idyllshire）/ 拉尔格（Rhalgr's Reach）**等"新兴集散地"相关，是贯穿 2.0–7.x 的**装备兑换商人 NPC**，也是"**罗薇娜商会**"的老板。
> 我未能抓取 Fandom 的 Rowena 词条（blocked），因此此条为【社区整理/常识】，链接仅搜索命中：[Rowena (Fandom)](https://finalfantasy.fandom.com/wiki/Rowena)，**建议核验**。
> 乌尔达哈的统治者是**苏丹娜娜娜莫·乌尔·娜莫**，军方领袖是**劳班**。

---

## 3. 艾欧泽亚以外的地区与国家

### 3.1 图拉尔（Tural）与 7.0 新大陆 — 官方原文整理

【官方设定】官方 Dawntrail World 页给出的**权威地理**（注意与常见说法的差异）：

> "Comprised of two great landmasses─**Xak Tural to the north, and Yok Tural to the south**─the 'New World' lies far to the west of Eorzea's shores. Its many and diverse peoples spent centuries mired in territorial wars until the epic deeds of **Gulool Ja Ja** and his dream of **Tuliyollal** saw them united under the banner of a single nation."
> —— [官方 Dawntrail World](https://na.finalfantasyxiv.com/dawntrail/world/)

| 中文 | 英文 | 官方定位 | 来源 |
|---|---|---|---|
| 图拉尔 | Tural | "新大陆（New World）"，位于艾欧泽亚海岸**极西** | [官方](https://na.finalfantasyxiv.com/dawntrail/world/) |
| **谢克·图拉尔** | **Xak Tural** | **北部**陆块 | 同上（⚠️ 官方明确是"北"） |
| **约克·图拉尔** | **Yok Tural** | **南部**陆块 | 同上（⚠️ 官方明确是"南"） |
| 图莱尤拉 | Tuliyollal | 统一后的**国家名兼首都名** | 同上 |
| 古卢尔·加·加 | Gulool Ja Ja | 以"功业"促成统一的传说人物 | 同上 |

> ⚠️ **易错点**：中文社区常把 Yok Tural 说成"北"、Xak Tural 说成"南"。**官方英文页明确：Xak Tural 在北，Yok Tural 在南**。请以官方为准。

**官方给出的图拉尔主要区域（7.0）：**

| 区域 | 官方描述要点 | 来源 |
|---|---|---|
| **图莱尤拉（Tuliyollal）** | 城市沿山体而上，从海岸港口到山顶宫殿由层层坡道与阶梯连接；人口来自图拉尔各地 | [官方](https://na.finalfantasyxiv.com/dawntrail/world/) |
| **解忧谷 / 9 号解法（Solution Nine）** | "由与图莱尤拉**完全不同的文明**所建的、塔楼林立的城市"（官方原文刻意留白） | 同上 |
| **乌尔科帕查（Urqopacha）** | 约克·图拉尔山地；两个体型悬殊的族群：**佩尔佩尔（Pelupelu，孩童般矮小）** 与 **尤卡胡（Yok Huy，巨大）**；图拉尔最高峰 **Worqor Zormor** | 同上 |
| **科扎玛乌卡（Kozama'uka）** | 图莱尤拉以南的茂密森林，河流与瀑布；居民**外貌类似哥布林与瓦努族**，但各自发展出独特文化 | 同上 |
| **雅克·特埃尔（Yak T'el）** | 图莱尤拉东南、飞艇越山可达；高地住 **Xbr'aal**，低地（浓密树冠遮蔽阳光）住 **马姆族（Mamool Ja）**；遍布天然井（cenote） | 同上 |
| **沙洛阿尼（Shaaloani）** | 图拉尔中部的**少雨平原**；近年发现**青燐水（ceruleum）**矿藏，带来剧变（含铁路建设） | 同上 |
| **遗产之地（Heritage Found）** | "**雷电能量**满溢之地"，厚重雷云遮日，紫色**雷（levin）**昼夜照亮大地 | 同上 |

**剧情定位（官方）：**

> "Yet fate would see them reunited for a mission unto another reflection, and now an unexpected petition has arrived beckoning them west─to the faraway continent of Tural."
> "Dawntrail sees the stage of adventure shift to the western continent of Tural. In this land whence the legend of the golden city originates, the rite of succession will soon take place, and your involvement may well determine who next rules the diverse peoples of the nation of Tuliyollal..."
> —— [官方 Dawntrail](https://na.finalfantasyxiv.com/dawntrail/)

**关键点：**
- 7.0 的**叙事引子包含"另一个镜像世界（another reflection）"的任务**——即 6.x 虚无界线的延续。
- 图拉尔线核心是**"黄金乡（the golden city）传说"** + **"继承之仪（rite of succession）"**，玩家介入决定**图莱尤拉**下一任统治者。

【官方设定 / 已确证的社区事实】**解忧谷 / Solution Nine 与"第九世界"**：
- 搜索结果明确命中标题："**Yoshi-P Confirms Alexandria Is From The Ninth Reflection In Final Fantasy 14 Dawntrail**"（吉田直树确认亚历山德里亚来自**第九镜像世界**）。
- 链接：[TheGamer](https://www.thegamer.com/final-fantasy-14-director-naoki-yoshida-yoshi-p-confirms-alexandria-from-the-ninth-reflection-dawntrail-expansion/)、[GameRant: Final Fantasy 14 Director Puts One Dawntrail Mystery To Rest](https://gamerant.com/final-fantasy-14-dawntrail-ninth-shard-alexandria/)
- ⚠️ **我未能抓取这两篇全文**（fetch failed），因此**该结论仅"搜索命中标题级"确认**，核心细节（第九世界为何消失、亚历山德里亚如何跨越、与"灵灾顺序"的关系）**待验证**。

【社区整理/推测】日服玩家博客在 7.0 前就对"第九世界"做过完整推演，值得作为**社区思路**参考：

> "黄金のトレーラーで出てきたソリューションナインとヘリテージファウンドが雷気の満ちた地域という話から、カギによりゲートが開き第九世界の一部が出現、その属性が雷ではないかという妄想をしている。"
> （从黄金预告片里 Solution Nine 与 Heritage Found 是雷气充盈之地这点出发，妄想在"钥匙"作用下门被打开、第九世界的一部分出现，其属性可能是**雷**。）
> —— [Lodestone 社区博客（日文）](https://de.finalfantasyxiv.com/lodestone/character/29141068/blog/5424098)

该博客的重建（**推测**）：第九世界是**雷属性强烈**、文明高度发达、人们"只以灵魂存在并更换容器以求永生的世界"；其势力想与原初世界统合；"黄金乡"可能是把人拉去第九世界的装置。

### 3.2 诺弗兰特（Norvrandt）— 第一世界

【官方设定】官方 Story So Far 对 5.0 的摘要：

> "The realm is left to struggle without its saviors, for they have been beckoned beyond time and space─to the world of the First. Here on **Norvrandt**, Light ushers all into oblivion, and our heroes must contend with a new calamity in a realm that is like, but unlike, their own. Only when the **Warrior of Light becomes the Warrior of Darkness** do they restore night to the blinding sky, and begin to find what once was lost."
> —— [官方 Endwalker: The Story So Far](https://na.finalfantasyxiv.com/endwalker/patch_6_0/story)

**可确证要点：**
- **诺弗兰特 = 第一世界（the First）的舞台大陆**（官方原文）。
- 第一世界正被**光之泛滥（Flood of Light）**推向"万物归于虚无（oblivion）"。
- 主角身份的**反转**：光之战士 → **暗之战士（Warrior of Darkness）**，目标是"**把夜晚还给被光刺瞎的天空**"。
- 后续：Scions 回归原初世界，面对**无影法丹尼尔（Fandaniel）与其"终末使徒（Telophoroi）"**。

### 3.3 欧萨德（Othard）/ 东方与萨维奈（Thavnair）

【官方设定】官方 6.0 摘要提到"**东至萨维奈（east to Thavnair）**、北至萨雷安（north to Sharlayan）、深入加雷马帝国心脏、登上月球"：

> "Our tale─of a star, and of its souls─will see the Warrior of Light sail north to **Sharlayan** and east to **Thavnair**, forge a path to the heart of the **Garlean Empire**, and ascend to the heavens to set foot upon the very **moon** itself."
> —— [官方 Endwalker: The Story So Far](https://na.finalfantasyxiv.com/endwalker/patch_6_0/story)

**可确证要点：**
- 萨维奈（Thavnair）是 **6.0 的东方舞台区域**（官方原文）。
- 萨雷安（Sharlayan）在**北方**（官方原文）。
- 拉札罕（Radz-at-Han）是萨维奈的城邦——**详见待补章节**。

---

## 4. 星球、镜像世界与世界分裂 / 合并

### 4.1 海德林（Hydaelyn）— 一名两义的官方解法

【官方设定】官方 ARR 页同时把 **Hydaelyn 用作"星球名"**：

> "**Hydaelyn**─a vibrant planet blessed by the Light of the Crystal."
> "Since time immemorial, this verdant planet has seen the births of lives uncounted."
> —— [ARR 世界观页](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/story)

同时官方把 **the Mothercrystal（母水晶）** 描述为"**the source of all life**（万生命之源）"，并让玩家"听从母水晶的召唤"：

> "Beckoned by the Mothercrystal─the source of all life─you must embark upon a quest to deliver the land from an eternity of Darkness."
> —— [ARR 世界观页](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/story)

**因此 2.0 时期官方文本中：**
- **Hydaelyn = 星球名**；
- **the Mothercrystal = 神格/万生命之源**（后来被揭露即"海德林"这位存在本身）。

【官方设定】官方 6.0 页面标题直接写"**As Hydaelyn and Zodiark's epic tale approaches its final chapter**"（海德林与佐迪亚克的史诗将迎来最终章），把两者并列为**同级的两位存在**：

> "Endwalker brings the tale of **Hydaelyn and Zodiark** to a conclusion eons in the making."
> —— [官方 Endwalker: The Story So Far](https://na.finalfantasyxiv.com/endwalker/patch_6_0/story)

**6.0 后的真相（广为流传的官方揭示，我未取得可抓取的官方原文页，标为待验证）：**
- 星球的**真名是 Etheirys（艾瑟里丝）**；"Hydaelyn"在当代语境是**母水晶/神格**之名，被当作星球名沿用。
- **海德林本人 = 古代人维涅斯（Venat）**，她为对抗佐迪亚克而自我献祭、成为"海德林"这一存在，并**分裂（Sundering）了世界**。
- **佐迪亚克（Zodiark）** 是古代人为了阻止"终末（the Final Days）"而召唤的蛮神，其核心是**艾里迪布斯（Elidibus）**。

> ⚠️ 上述为**剧情共识级**内容，但本次网络环境下 `finalfantasy.fandom.com/wiki/Etheirys`、`/wiki/Hydaelyn_(character)` 均**不可抓取**。**请以 6.0 游戏内文本为准**。搜索命中链接：[Etheirys (Fandom)](https://finalfantasy.fandom.com/wiki/Etheirys)、[Hydaelyn (character)](https://finalfantasy.fandom.com/wiki/Hydaelyn_(character))。

### 4.2 十四个世界与"分裂（Sundering）"

【社区整理】十四世界结构：**原初世界（the Source）+ 13 个镜像世界（reflections / shards）**，编号为**第一世界** ~ **第十三世界**。

已确证/高可信的命名对应：

| 编号 | 别名 | 已知状态 | 依据 |
|---|---|---|---|
| **原初世界** | the Source | 玩家所在世界 | 【官方】Story So Far 称从第一世界"return to the Source"（[链接](https://na.finalfantasyxiv.com/endwalker/patch_6_0/story)） |
| **第一世界** | 舞台大陆 = **诺弗兰特 Norvrandt** | 曾遭**光之泛滥**，被暗之战士阻止 | 【官方】同上 |
| 第二 ~ 第十二世界 | — | — | 待补 |
| **第九世界** | — | 被认为是**亚历山德里亚 / Solution Nine 的故乡**；已被吉田确认（搜索命中标题） | 【社区/媒体】[TheGamer](https://www.thegamer.com/final-fantasy-14-director-naoki-yoshida-yoshi-p-confirms-alexandria-from-the-ninth-reflection-dawntrail-expansion/)（未能验证全文） |
| **第十三世界** | **虚无界 the Void** | 被**暗之泛滥**吞没，成为**虚无界**；6.x 主线舞台 | 【社区整理】见 §9.4 |

【社区整理】日服博客对"灵灾顺序 = 世界统合顺序"的整理表格（**这是社区重建，非官方**）：

| 顺序 | 属性 | 说明 |
|---|---|---|
| （失败） | **闇** | 对应第十三世界的**暗之泛滥**（未遂的世界统合） |
| 第一灵灾 | **風** | — |
| 第二灵灾 | **雷** | — |
| 第三灵灾 | **火** | — |
| 第四灵灾 | **土** | — |
| 第五灵灾 | **氷** | — |
| 第六灵灾 | **水** | 大洪水，开启第六灵极时代 |
| 第七灵灾 | **闇** | 巴哈姆特 / 第七灵极时代 |
| 第八灵灾 | **光** | **未遂**（第一世界的光之泛滥） |
| 第八灵灾 | **闇** | **未遂**（被阻止的第八灵灾） |

来源：[Lodestone 社区博客（日文）](https://de.finalfantasyxiv.com/lodestone/character/29141068/blog/5424098)【社区整理】

> 📌 该博客同时提出一个重要的**方法论警告**（我认为非常值得采纳）：**官方用来解释"世界统合"的示意图只是示意，并非真实的空间关系**。
> "そもそも原初世界と鏡像世界は重なり合った別次元に存在してて、世界統合の説明とかに使われた図はその関係や距離感を分かりやすく示したものだから、あれが正解ではないんだよな。"

### 4.3 世界合并（Rejoining）与"灵灾 = 统合"

【社区整理/高可信设定】核心机制：

- 无影（Ascians）的目标是**让 13 个镜像世界逐一"统合（Rejoin）"回原初世界**，从而复活佐迪亚克、恢复被分裂前的世界。
- **原初世界上的每一次"灵灾（Umbral Calamity）"，就是一次成功/失败的世界统合的产物或契机**。
- **第七灵灾 = 第七次世界统合**（巴哈姆特）。
- **第一世界的光之泛滥**原本将成为**第八灵灾/第八次统合**，被暗之战士（阿尔伯特一行 + 玩家的介入）阻止。
- **第十三世界（虚无界）**的统合**失败**：暗之泛滥反而把该世界自身吞没，产生了**虚无界与妖异（Voidsent）**。

来源：[Lodestone 社区博客](https://de.finalfantasyxiv.com/lodestone/character/29141068/blog/5424098)、[官方 Story So Far](https://na.finalfantasyxiv.com/endwalker/patch_6_0/story)（"Light ushers all into oblivion"）

【社区整理】该博客还总结出几条**统合的技术条件**（对理解 6.x–7.x 剧情很关键，但属社区归纳）：

1. **"把属性均一化的潮流"**——镜像世界属性偏斜，统合即把偏斜的属性并入原初世界。
2. **"原初世界与镜像世界相互吸引"**——两地存在引力式的牵引。
3. **"利用原初世界生物'想回去（望郷）'的念头"**——如 6.x 虚无界线中阿朱达雅（Azhdaja）的望乡之情被利用。
4. **"把镜像世界彼此偏斜的属性对撞以相杀"**——6.x 之后新增的概念。

> ⚠️ 第 1–4 条是**玩家归纳**，用词也来自玩家。请标为【社区整理/推测】。

### 4.4 第八灵灾与"坏结局"

【社区整理】Shadowbringers / Endwalker 相关剧情中存在一个**被阻止的"第八灵灾"**分支：若第一世界的**光**与原初世界的**暗**（黑色玫瑰 Black Rose 等）同时爆发，将导致原初世界毁灭。该分支在剧情中被玩家阻止。

依据：[Lodestone 社区博客的灵灾表](https://de.finalfantasyxiv.com/lodestone/character/29141068/blog/5424098)（列有"第八霊災 光 未遂 / 第八霊災 闇 未遂"）；更权威的原始依据（Encyclopaedia Eorzea / 5.x–6.x 剧情文本）**本次未能抓取**。

---

## 5. 以太（Aether）、六属性、星极/灵极与灵灾

### 5.1 以太的官方定位

【官方设定】官方明确把**以太之流（currents of aether）**与**蕴含力量的结晶（power-infused crystal）**作为艾欧泽亚之所以成为"人兽共逐之地"的原因：

> "Yet these inhospitable lands hold irresistible lure for man and monster alike, for **wide and deep flow the currents of aether**, and **rich are the veins of power-infused crystal**."
> —— [ARR 世界观页](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/story)

【官方设定】官方 ARR 页还写"你须听从**以太之光（aetheryte）**的低语"（见 §1.5），即以太既是物质也是**信息/召唤的媒介**。

### 5.2 六属性（Six Elements）

【官方设定】官方原文明确"**六属性**"存在，且灵灾各自对应其中之一：

> "Each of the Umbral catastrophes has, in turn, borne the characteristics of **one of the six elements**."
> —— [ARR 世界观页](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/story)

**六属性标准对照表：**

| 中文 | 英文 | 日文 | 常见象征 |
|---|---|---|---|
| 火 | Fire | 火 | 炎、热 |
| 冰 | Ice | 氷 | 冷、静止 |
| 风 | Wind | 風 | 气流、疾走 |
| 土 | Earth | 土 | 大地、重力 |
| 雷 | Lightning | 雷 | 放电、迅捷 |
| 水 | Water | 水 | 流动、治愈 |

> 📌 **注意**：FF14 的六属性**不含光与暗**。光/暗是**另一种层次的属性轴**（见 §5.3）。

### 5.3 星极 / 灵极（Astral / Umbral）与光暗的对应

【官方设定（间接）】官方在术语上使用 **Astral** 与 **Umbral** 作为"时代"的修饰词（Astral Era = 星极时代 / Umbral Era = 灵极时代），并给出价值判断：**Astral = 繁荣，Umbral = 灾难**（prosperous / disastrous）。

> "a cycle of **prosperous Astral** and **disastrous Umbral** eras"
> —— [ARR 世界观页](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/story)

【社区整理】**日↔英 术语对应（易混淆点）**：

| 日文 | 英文 | 中文 | 备注 |
|---|---|---|---|
| **星極** | **Astral** | 星极 | 6 属性各自都可有"星极"面 |
| **霊極** | **Umbral** | 灵极 | 6 属性各自都可有"灵极"面 |

【社区整理】社区博客总结的**极化与光暗的对应**：

> "●霊災の起った順番と属性（**星→闇、霊→光**）"
> （灵灾的顺序与属性：**星 → 闇，霊 → 光**）
> —— [Lodestone 社区博客](https://de.finalfantasyxiv.com/lodestone/character/29141068/blog/5424098)

即：**星极（Astral）趋向闇（Darkness），灵极（Umbral）趋向光（Light）**。这解释了为什么"光之泛滥"被计入**灵极**侧的第八灵灾（灵→光），而"暗之泛滥"是**星极**侧。

> ⚠️ **争议点**：这条对应关系在英文社区中存在**混淆与反向说法**，且不同版本（1.0 / ARR / 后期）表述不一致。日服玩家另有一篇专门讨论"霊極/星極/光/闇"的博客（搜索命中：[Lodestone](https://na.finalfantasyxiv.com/lodestone/character/15674024/blog/5330960/)，**未能抓取全文**）。请标为【社区整理，存在版本冲突】。

**以太学分类（按任务要求的四类）：**

| 分类 | 内容 | 可信度 |
|---|---|---|
| 星极 / 灵极 | 每一种属性都有两个极性面；星极偏"发散/活跃"、灵极偏"凝滞/被动"（常见说法） | 【社区整理，表述不一】 |
| 无属性 | **無属性 / unaspected**，不属于六属性的以太（如部分魔法、部分伤害类型） | 【社区整理】 |
| 暗 / 光 | 与六属性正交的独立轴；星极→闇、灵极→光（社区整理） | 【社区整理】 |
| 六属性 | 火、冰、风、土、雷、水 | 【官方】 |

> ⚠️ **诚实说明**：本次网络环境**无法访问**任何官方"以太学"词条或 `consolegameswiki` 的 Aether 页。上述"星极/灵极各面"的具体定义（活跃 vs 凝滞）**我未能取得可靠出处**，建议以 *Encyclopaedia Eorzea I* 的 Aether 章节为准。搜索命中：[Aether (Fandom)](https://finalfantasy.fandom.com/wiki/Aether_(Final_Fantasy_XIV))、[Lodestone 社区博客：リアル錬金術知識から見る「霊極」「星極」「光」「闇」](https://na.finalfantasyxiv.com/lodestone/character/15674024/blog/5330960/)。

### 5.4 灵灾（Umbral Calamity）全表

【社区整理】以日服社区博客的重建为准（**注意：官方语料本身存在编号表述冲突，见下方警告**）：

| 序号 | 属性 | 日文 | 中文 | 引发的时代 | 备注 |
|---|---|---|---|---|---|
| （失败） | 闇 | 闇 | 暗 | — | 第十三世界的**暗之泛滥**，统合失败 |
| 第一灵灾 | **風** | 風 | 风 | **第一灵极时代** | 终结"诸神的时代"（官方语） |
| 第二灵灾 | **雷** | 雷 | 雷 | 第二灵极时代 | — |
| 第三灵灾 | **火** | 火 | 火 | 第三灵极时代 | — |
| 第四灵灾 | **土** | 土 | 土 | 第四灵极时代 | — |
| 第五灵灾 | **氷** | 氷 | 冰 | **第五灵极时代** | "无尽之霜"的冰河期 |
| 第六灵灾 | **水** | 水 | 水 | **第六灵极时代** | **大洪水（the great deluge）**，官方明确提到 |
| 第七灵灾 | **闇** | 闇 | 暗 | **第七灵极时代** | **巴哈姆特**、达拉穆德坠落卡尔提诺平原 |
| 第八灵灾 | **光** | 光 | 光 | — | **未遂**（第一世界的光之泛滥） |
| 第八灵灾 | **闇** | 闇 | 暗 | — | **未遂**（被阻止的第八灵灾） |

来源：[Lodestone 社区博客（日文）](https://de.finalfantasyxiv.com/lodestone/character/29141068/blog/5424098)【社区整理】；第六、第七灵灾的官方依据：[官方 Grand Companies](https://na.finalfantasyxiv.com/lodestone/special/grandcompany/)

> ⚠️ **官方语料的编号冲突（务必标注）**：官方 ARR 页写"**第一灵极时代终结了诸神的时代**，且自第一星极时代开启人类时代以来**共有六次这样的灾难时代**"，并说**每一次灵极灾难都带有六属性之一的特征**。
> 若严格按此句，则"带六属性的灵灾"应是第二~第七次共 6 次；但按上表，带六属性的是第一~第六次（风雷火土冰水），第七次是**暗**。
> **两种读法都能自洽**：官方句子可理解为"六属性在六次灾难中轮流出现，故以为星极时代将永续（结果第七次以『暗』打破了预期）"。
> **建议在正式文档中直接引用官方原句 + 附上社区表，并注明"编号存在官方/社区的错位表述"**。

【社区整理】该博客也记录了社区自身的困惑，很有价值：

> "でも、歴史的には第二霊災が雷ってとこから始まって、第一霊災の風は第六霊災の後に確定したわけだから、伝承が雷（雷天）から始まってもおかしくないか。"
> （但历史上是从"第二灵灾=雷"开始有记载的，而"第一灵灾=风"是在第六灵灾之后才确定的，所以传说从雷开始也不奇怪。）

**其他"属性顺序"口径的冲突（同一篇博客记录）：**

| 口径 | 起始属性 | 来源 |
|---|---|---|
| 灵灾顺序 | **风** 起 | 社区灵灾表 |
| 月的运行 | **冰** 起 | 社区博客 |
| 十二神神话 | **土**（阿尔ジク Althyk）起 | 社区博客 |
| 属性说明的一般讲法 | **雷** 起 | 社区博客 |
| 大圣堂十二神纪念碑顶端 | **雷天** | 社区博客 |
| Mythology（十二神） | **雷天** 起 | 社区博客 |

来源：[Lodestone 社区博客](https://de.finalfantasyxiv.com/lodestone/character/29141068/blog/5424098)

> 📌 **给正式文档的建议**：**不要给出单一"权威属性顺序"**。应写"官方仅确认『六属性各对应一次灵极灾难』，具体顺序在官方语料与社区整理间存在冲突"。

### 5.5 第七灵灾（The Seventh Umbral Calamity）— 官方时间线

【官方设定】官方 Grand Companies 页给出的因果链（可直接引用）：

1. 第六星极时代末期，三城邦重建国防联军，试图阻止第七灵极时代。
2. 联军对抗蛮族、蛮神与**来自北方的加雷马帝国**入侵者。
3. 灵灾仍无法避免：**小月亮达拉穆德（Dalamud）坠落于卡尔提诺平原（Carteneau Flats）**。
4. 从达拉穆德核心出现**上古蛮神巴哈姆特（elder primal Bahamut）**，**以火焰焚烧大地**。
5. **第七灵极时代开始**。
6. **五年后**（= 2.0 开局），国防联军在冒险者协助下重建。

来源：[官方 Grand Companies](https://na.finalfantasyxiv.com/lodestone/special/grandcompany/)

【官方设定】官方 Story So Far 对 2.0 开局的表述：

> "The land has but recently emerged from an age of decline—the Seventh Umbral Era—and the skies remain dark. On the eastern border, the Garlean Empire masses its troops for invasion, while the beastmen summon their deities, the otherworldly primals."
> —— [官方 Endwalker: The Story So Far](https://na.finalfantasyxiv.com/endwalker/patch_6_0/story)

【官方设定】第七灵灾的军事侧背景：**奈尔·范·达纳斯（Nael van Darnus）** 主持的**"Meteor（陨石）计划"**"将宣告艾欧泽亚不可避免地坠入第七灵极时代"：

> "it is his pet project, 'Meteor,' that will herald Eorzea's inevitable plunge into the Seventh Umbral Era..."
> —— [官方 Garlean Empire](https://na.finalfantasyxiv.com/lodestone/special/grandcompany/garlean_empire/)

---

## 6. 蛮神（Primals）与蛮族（Beast Tribes）

### 6.1 蛮神：官方定义

【官方设定】官方 PRIMALS AND BEASTMEN 页给出最凝练的设定：

> "Eorzea is home to myriad unique races. Among them are the tribes of the beastmen, who are responsible for calling down the god-like beings known as primals. Primals are possessed of terrifying power, and are effectively immortal─they can return from death's halls no matter how many times they are slain. They are wont to bless their beastman worshippers with spiritual and physical strength, and the city-states deem them a most dire threat."
> —— [官方 Primals and Beastmen](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/primals/)

**可提炼的官方要点（每一条都有据）：**

| 要点 | 官方原文关键词 | 来源 |
|---|---|---|
| 召唤主体 | beastmen（蛮族）"calling down"（召唤/请降） | [官方](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/primals/) |
| 蛮神性质 | "god-like beings"（类神存在） | 同上 |
| 蛮神特征 | terrifying power（恐怖力量）+ **effectively immortal**（实质不死） | 同上 |
| 不死机制 | "they can return from death's halls no matter how many times they are slain"（无论被杀死多少次都能从死之殿堂返回） | 同上 |
| 蛮神作用 | 赐予蛮族信徒 **spiritual and physical strength**（精神与肉体的力量） | 同上 |
| 城邦立场 | city-states deem them "a most dire threat"（最严重的威胁） | 同上 |

### 6.2 官方列出的蛮神 ↔ 蛮族对应（2.0 时期）

【官方设定】官方 PRIMALS 页给出的配对（这是**最硬的一手依据**）：

| 蛮神 | 蛮族 | 官方页 |
|---|---|---|
| 伊弗利特 Ifrit | **蜥蜴人族 Amalj'aa** | [/primals/ifrit/](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/primals/ifrit/) |
| 拉姆 Ramuh | **妖精族 Sylphs** | [/primals/ramuh/](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/primals/ramuh/) |
| 迦楼罗 Garuda | **伊克萨尔族 Ixal** | [/primals/garuda/](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/primals/garuda/) |
| 泰坦 Titan | **地灵族 Kobolds** | [/primals/titan/](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/primals/titan/) |
| 利维亚桑 Leviathan | **鱼人族 Sahagin** | [/primals/leviathan/](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/primals/leviathan/) |
| 巴哈姆特 Bahamut | （上古蛮神 elder primal，非蛮族召唤） | [/primals/bahamut/](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/primals/bahamut/) |
| 奥丁 Odin | （无固定蛮族） | [/primals/odin/](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/primals/odin/) |

来源：[官方 Primals and Beastmen](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/primals/)

> 📌 注意：官方把 **Bahamut 与 Odin 与五蛮族并列但未标召唤者**，这是"**蛮神不必然由蛮族召唤**"的官方暗示。见 §6.5 真伪蛮神。

### 6.3 蛮神召唤 / 精炼（Tempering）/ 以太枯竭

> ⚠️ 本节大部分内容属**游戏内文本与社区整理**，本次**未能取得可抓取的官方词条**（`consolegameswiki` / `gamerescape` / `fandom` 均不可达）。以下逐条标可信度。

| 概念 | 内容 | 可信度 |
|---|---|---|
| **召唤条件** | 需要**大量水晶（crystals）** + **以太** + **信徒强烈的祈愿/信仰**；仪式由蛮族举行 | 【社区整理，高可信】 |
| **精炼（Tempering / 精錬）** | 蛮神能使接触者**精神被强制同化**，成为"**信徒/奴仆（thrall）**"，丧失自我、绝对服从该蛮神 | 【社区整理，高可信】 |
| **对精炼的免疫** | **光之战士**因持有**超越之力（the Echo）**而不被精炼（游戏内多次明示） | 【社区整理，高可信】 |
| **以太枯竭** | 蛮神的存在会**持续吸取周边土地的以太**，导致**土地荒芜化/以太枯竭**——这是城邦视蛮神为"最严重威胁"的**实际理由**（不只是战斗力） | 【社区整理，高可信】 |
| **不死与再召唤** | 蛮神被杀后，只要**信仰与水晶仍在**，即可被**再次召唤**（官方："effectively immortal"） | 【官方】部分依据 |
| **蛮神讨伐战（Trial）** | 游戏系统称"讨伐战"；难度分级 Normal / Hard / Extreme / Unreal；"吟游诗人（Wandering Minstrel）"为更高难度版本提供叙事包装 | 【社区整理/系统事实】 |

### 6.4 蛮族（Beast Tribes）清单

> ⚠️ **重大限制**：`ffxiv.consolegameswiki.com`（有最全 Beast Tribe 清单）与 `gamerescape` 均 **403 不可达**。因此下表**只能列出我能在官方页面确证的 5 族 + 社区常识族**，并明确标注来源等级。

**A. 官方页面直接确证的蛮族（2.0）**

| 中文 | 英文 | 日文 | 对应蛮神 | 来源 |
|---|---|---|---|---|
| 蜥蜴人族 | Amalj'aa | アマルジャ族 | 伊弗利特 | 【官方】[链接](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/primals/) |
| 妖精族 | Sylph | シルフ族 | 拉姆 | 【官方】同上 |
| 伊克萨尔族（鸟人族） | Ixal | イクサル族 | 迦楼罗 | 【官方】同上 |
| 地灵族 | Kobold | コボルド族 | 泰坦 | 【官方】同上 |
| 鱼人族 | Sahagin | サハギン族 | 利维亚桑 | 【官方】同上 |

**B. 任务清单中的其他蛮族（需核验）**

任务列出的蛮族（Goblin、Gigas、Mamool Ja、Dragons、Vanu Vanu、Gnath、Kojin、Ananta、Namazu、Dwarves、Pixie、Nu Mou、Qitari、Ronka、Lupin、Matanga、Pelupelu、Yok Huy、Moblins、Hannes 等）在本次调研中**无法从官方页面批量确证**。已从官方页面确证的相关人群记录如下：

| 中文 | 英文 | 官方依据 |
|---|---|---|
| 瓦努族 | Vanu Vanu | 官方 Dawntrail 页以"**resemble goblins and the Vanu Vanu**"作类比，证明 Vanu Vanu 为既有族群 | [官方](https://na.finalfantasyxiv.com/dawntrail/world/) |
| 马姆族 | Mamool Ja | 官方 Dawntrail 页明确 **Yak T'el 低地住 Mamool Ja** | 同上 |
| 佩尔佩尔 | Pelupelu | 官方 Dawntrail 页明确 **Urqopacha 的矮小族群** | 同上 |
| 尤卡胡 | Yok Huy | 官方 Dawntrail 页明确 **Urqopacha 的巨大族群** | 同上 |
| Xbr'aal | Xbr'aal | 官方 Dawntrail 页明确 **Yak T'el 高地族群** | 同上 |
| 哥布林族 | Goblin | 官方 Dawntrail 页以"resemble goblins"作类比 | 同上 |

> 📌 **给正式文档的强烈建议**：蛮族完整清单**必须**依赖 `consolegameswiki` / `gamerescape` / `Encyclopaedia Eorzea`。本次环境不可达，**不要在正式文档中凭记忆罗列**。建议等能访问这些来源时补全，或直接引用官方 **Eorzea Database（`lodestone/playguide/db/`）** 中的蛮族任务条目逐条确认。

### 6.5 蛮神的"真伪"问题（真伪蛮神）

【社区整理/高可信】关键区分：

| 类型 | 说明 | 例 |
|---|---|---|
| **真蛮神** | 由**蛮族信仰 + 水晶 + 以太**自然召唤 | 伊弗利特、泰坦、迦楼罗等 |
| **人为/伪造蛮神** | 由**技术或非蛮族**召唤；或利用**水晶塔/亚拉戈技术**造出 | 亚拉戈帝国对梅拉西迪亚（Meracydia）战争中的蛮神兵器、**亚兹拉（Azys Lla）**的封印对象 |
| **"蛮神化的人/理念"** | 由**少数人的强烈意念**召唤出的蛮神（形体取决于召唤者的想象） | 希瓦（伊塞勒）、月读（夜露）、因诺森斯（Innocence）等 |
| **上古蛮神（elder primal）** | 规模与位阶远超普通蛮神 | **巴哈姆特**（官方用词 elder primal）、**佐迪亚克**、**海德林** |

【官方设定】"elder primal"一词的官方用例：官方 Grand Companies 页写"From its core emerged the **elder primal Bahamut**"（从其核心出现了上古蛮神巴哈姆特）。
来源：[官方 Grand Companies](https://na.finalfantasyxiv.com/lodestone/special/grandcompany/)

【官方设定】"**蛮神不必然是蛮族的产物**"的官方迹象：官方 PRIMALS 页把 **Bahamut 与 Odin** 与五蛮族蛮神并列，却**未给它们指定蛮族召唤者**。
来源：[官方 Primals and Beastmen](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/primals/)

【官方设定】**加雷马帝国对蛮神的国策**：官方 Garlean Empire 页写，索鲁斯在东方战役中**亲眼见到蛮神造成的破坏**，由此下达**灭绝蛮神的国策**：

> "It was during this campaign that the emperor witnessed firsthand the destruction wrought by the primals—an experience that led to an imperial mandate for their annihilation."
> —— [官方 Garlean Empire](https://na.finalfantasyxiv.com/lodestone/special/grandcompany/garlean_empire/)

> ⚠️ **待补**：**战争三神（Warring Triad：塞菲洛特/索菲亚/祖尔宛）**、**亚历山大（Alexander）**、**须佐之男/拉克什米**、**四圣兽（白虎/朱雀/青龙/玄武/麒麟）** 等的官方设定原文，本次**未能抓取**（`fandom` / `consolegameswiki` 不可达）。相关线索仅搜索命中：[/wiki/Warring_Triad_(Final_Fantasy_XIV)](https://finalfantasy.fandom.com/wiki/Warring_Triad_(Final_Fantasy_XIV))、[/wiki/Azys_Lla](https://finalfantasy.fandom.com/wiki/Azys_Lla)。

### 6.6 蛮族任务 / 蛮族联合任务（Beast Tribe Quests → Allied Society Quests）

【社区整理】系统沿革（**以下均为社区整理，本次未能抓取官方或 wiki 全文**）：

| 时期 | 名称 | 内容 |
|---|---|---|
| 2.0–4.x | **Beast Tribe Quests（蛮族任务）** | 五蛮族（蜥蜴人/地灵/鱼人/妖精/伊克萨尔）+ 后续（瓦努/瓦努、格诺、科金、安纳恩、那玛） |
| 5.x–6.x 起 | 改称 **Tribes**，再改称 **Allied Society Quests（蛮族联合任务 / 友好部族任务）** | 官方为淡化"beast（兽）"的贬义 |
| 声望等级 | Neutral → Friendly → Trusted → Honored → Sworn（后期改为 Rank 1–8 之类） | 版本间有改动 |
| 每日配额 | 早期 6 次 → 12 次 → 15 次（**版本间有变动，需核验**） | — |
| 奖励 | 各族**专属坐骑/宠物**在最高声望解锁；后期有**多族联合任务（Allied/Intersocietal Quests）** | — |
| 各资料片新增 | 3.x：瓦努族、格诺族（Vath）；4.x：科金族、安纳恩族、那玛族；5.x：矮人族、皮克西、奇坦族、努莫族；6.x：阿尔卡索达拉、奥米克戎、洛波利特等；7.x：佩尔佩尔、**哈努哈努（Hanuhanu）**、莫布莱、尤卡胡 等 | **【需核验】** |

来源（**均只搜索命中、未能抓取全文**，请标为未验证）：
- [Polygon — Where to unlock all allied society quests in FFXIV](https://www.polygon.com/ffxiv-guides-ff14-final-fantasy-14-online/480866/allied-society-quests-ranks-mounts-tribes/)
- [Destructoid — How to unlock every Allied Society in FFXIV](https://www.destructoid.com/how-to-unlock-every-allied-society-ffxiv/)
- [consolegameswiki — Intersocietal Quests](https://ffxiv.consolegameswiki.com/wiki/Intersocietal_Quests)
- [Sportskeeda — How to unlock Allied Society Quests finale (Dawntrail)](https://widgets.sportskeeda.com/mmo/final-fantasy-xiv-how-unlock-allied-society-quests-finale-dawntrail)
- [HardcoreGamer — FFXIV Dawntrail: How to Unlock the Pelupelu Allied Society Quests](https://hardcoregamer.com/ffxiv-dawntrail-pelupelu-allied-society-unlock/)

> ⚠️ **本次调研最严重的缺口之一**就是本节。**请勿在正式文档中把上表当作已核实内容。**

---

## 7. 加雷马帝国（Garlean Empire / ガレマール帝国）

### 7.1 官方三位核心人物档案（2.0 时期）

【官方设定】以下三条几乎逐字来自官方 Garlean Empire 页，是**最硬的一手设定**。

#### 7.1.1 索鲁斯·佐斯·加尔乌斯（Solus zos Galvus）— 初代皇帝

| 项目 | 官方内容 |
|---|---|
| 出身 | 加雷马**共和国（Garlemald Republic）**的名门 |
| 早年 | 年少从军，战功卓著，很快升任 **Legatus（军团长）** |
| 军事改革 | **把魔导机械（machina）技术整合进军队的常规编制** |
| 崛起 | 凭"一心一意"把**弱小的新兴国家变成军事强国** |
| 政治 | 因民心支持而成为 **Dictator（独裁官）**，即加雷马最高指挥官 |
| 扩张 | 其后加雷马军**征服北方全境，锤成单一实体**；建立帝政，自称 **Emperor（皇帝）** |
| 东方战役 | **"东方诸国首先尝到新生帝国的铁拳"**；此役中皇帝**亲眼目睹蛮神造成的破坏** |
| 蛮神国策 | 由此下达 **"灭绝蛮神"的帝国敕令（imperial mandate for their annihilation）** |
| 状态（2.0 时点） | **八十余岁**，仍为皇帝，但宫廷流言称其**体弱多病** |

来源：[官方 Garlean Empire](https://na.finalfantasyxiv.com/lodestone/special/grandcompany/garlean_empire/)

> 📌 **重大后设揭示（5.0/6.0）**：索鲁斯·佐斯·加尔乌斯**其实是转生体/寄宿体，其真实身份是无影艾梅特-塞尔克（Emet-Selch）**。这意味着**加雷马帝国的建国本身即是无影的世界统合计划的一环**。⚠️ 本次未能抓取官方原文，标为【社区/剧情共识】，链接：[Ascian (Fandom)](https://finalfantasy.fandom.com/wiki/Ascian)（未验证）。

#### 7.1.2 盖乌斯·范·巴埃萨（Gaius van Baelsar）— "黑狼"

| 项目 | 官方内容 |
|---|---|
| 职位 | **第十四军团（XIVth Legion）Legatus**，该军团**当时正占领阿拉米格** |
| 才能 | 战时指挥天赋 + **行政统治者的资质**（官方并列两项） |
| 战绩 | **征服了五个敌对的城邦国家**，并**主导了它们的政治改造** |
| 取阿拉米格 | 用**阴谋煽动内乱（subterfuge to stoke the fires of civil unrest）**，**无需长期围城**即拿下 |
| 转折 | 其后不久**出现了一位蛮神（a primal）**，导致帝国**中止该军团的进军** |
| 现状 | 留在阿拉米格，**以帝国总督（imperial viceroy）身份统治** |
| 座右铭 | "He who cannot preserve the sovereignty of his nation is unfit to rule it."（不能保全本国主权者，无资格统治它） |
| 武器 | **Heirsbane**——一把 **gunblade（枪刃）**，据说**饮过九位王位觊觎者的血** |

来源：[官方 Garlean Empire](https://na.finalfantasyxiv.com/lodestone/special/grandcompany/garlean_empire/)

> 📌 **重要设定点（官方）**：**"总督（viceroy）"是加雷马统治占领区的制度形式**；且**蛮神出现可以迫使帝国停止军事推进**——这解释了帝国为何把"灭绝蛮神"当作国策。

#### 7.1.3 奈尔·范·达纳斯（Nael van Darnus）— "白鸦"

| 项目 | 官方内容 |
|---|---|
| 职位 | **第七军团（VIIth Legion）Legatus**，派往**西线** |
| 家世 | **其父是加雷马帝国的建国元勋之一** |
| 风评 | 冷酷，**在自国人民中也声名狼藉**；面对异议时**不分敌友** |
| 上位传闻 | 其父"因病猝死"后，**遗体未寒，其亲信即被处死** |
| 关键项目 | **"Meteor（陨石）计划"——"将宣告艾欧泽亚不可避免地坠入第七灵极时代"** |
| 座右铭 | "Opposition must needs be put down with fire and steel."（异议必须以火与钢镇压） |
| 武器 | **Bradamante**——一把 **gunhalberd（枪戟）**，据说以被他所杀的女战士命名 |

来源：[官方 Garlean Empire](https://na.finalfantasyxiv.com/lodestone/special/grandcompany/garlean_empire/)

### 7.2 加雷马帝国的官方制度要点（已确证）

| 制度 | 官方依据 | 说明 |
|---|---|---|
| **Legatus（军团长）** | 三处档案均使用 | 军团最高指挥官 |
| **军团编号** | **XIVth Legion**（盖乌斯）、**VIIth Legion**（奈尔） | 罗马式编号军团 |
| **Dictator → Emperor** | 索鲁斯条目 | 从共和国的独裁官转向帝政 |
| **帝国行省/总督** | "imperial viceroy"（盖乌斯统治阿拉米格） | 占领区的统治形态 |
| **前身政体** | "Garlemald Republic"（加雷马共和国） | 帝国之前是共和国 |
| **魔导机械** | "machina technology" 整合入军队 | 加雷马军事的技术基础 |
| **蛮神灭绝国策** | 索鲁斯条目 | 帝国与蛮神的根本对立 |
| **官方武器命名** | Heirsbane（枪刃）/ Bradamante（枪戟） | 加雷马式武器装备 |

### 7.3 加雷马帝国势力的官方名单（2.0）

【官方设定】官方 THREATS 侧栏中属于加雷马阵营的条目：

| 人物 | 官方称谓 |
|---|---|
| 加雷马帝国 | Garlean Empire |
| 盖乌斯·范·巴埃萨 | The Black Wolf（黑狼），Gaius van Baelsar |
| 奈尔·范·达纳斯 | The White Raven（白鸦），Nael van Darnus |
| 索鲁斯·佐斯·加尔乌斯 | First Emperor of Garlemald, His Radiance |
| 尼禄·托尔·斯卡埃瓦 | Nero tol Scaeva |
| 莉维亚·萨斯·尤尼乌斯 | Livia sas Junius |
| 瑞塔赫廷·萨斯·阿尔维纳 | Rhitahtyn sas Arvina |

来源：[官方 THREATS 侧栏](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/threats/theascians/)

> 📌 **加雷马人姓名的语法规则（社区整理，高可信，本次未能取得官方出处）**：
> - **纯血加雷马人**：`名 + 氏族/中间名 + 家族名`，中间加 **zos**（男性）/ **yae**（女性）/ **sas**（女性，另一变体），如 Solus **zos** Galvus、Zenos **yae** Galvus、Livia **sas** Junius、Rhitahtyn **sas** Arvina、Nero **tol** Scaeva（tol 为平民/非纯血用法）。
> - 帝国行省出身者**不适用**该姓氏体系。
> ⚠️ 上述 `zos/yae/sas/tol` 的**准确语义**（是否标示性别、阶级、氏族）我**未能取得官方说明**，请标为待验证。

### 7.4 加雷马帝国的崩溃（4.x–6.0）

【官方设定】官方 Story So Far 明确 5.x 结尾的局势：

> "After a long and arduous struggle, the Scions return to the Source, only to find their entire world under threat from the **Ascian Fandaniel and his Telophoroi minions**."
> —— [官方 Endwalker: The Story So Far](https://na.finalfantasyxiv.com/endwalker/patch_6_0/story)

【官方设定】6.0 的舞台包含"**加雷马帝国的心脏**"：

> "...forge a path to the heart of the **Garlean Empire**, and ascend to the heavens to set foot upon the very moon itself."
> —— [官方 Endwalker: The Story So Far](https://na.finalfantasyxiv.com/endwalker/patch_6_0/story)

【社区整理】关于"终末（Final Days）降临加雷马导致帝国崩溃"之后的状态，搜索命中的 Lodestone 社区博客标题即为 **"The State of the Garlean Empire after Endwalker"**：

> "Garlemald and the Empire were left in quite a state after the events of 6.0. However, many questions were left unanswered, such as **the fate of the Imperial Legions**."
> —— [Lodestone 社区博客](https://na.finalfantasyxiv.com/lodestone/character/2289851/blog/5398558)【社区整理】

> ⚠️ 该博客正文主要是视频外链，**未提供文字结论**。关于"帝国崩溃后的局面"（各军团下落、行省独立、加雷马首都重建、是否成为共和国）本次**未能取得可靠来源**，列入 §10 存疑清单。

### 7.5 待补：**Populares（平民派）** 与 Optimates（贵族派）

任务要求调研加雷马的**反叛者 Populares**。本次调研**未能找到任何可抓取的来源**讨论该派系（搜索未命中有效结果，Fandom 的 Garlean Empire 词条不可读）。**列入 §10 存疑清单**，请后续用 4.x–5.x 剧情文本或 Encyclopaedia Eorzea 补足。

---

## 8. 无影（Ascians）、古代人（Ancients）与终末（The Final Days）

> ⚠️ **本节最严重的取证限制**：`finalfantasy.fandom.com/wiki/Ascian`、`/wiki/Azem`、`/wiki/Hydaelyn_(character)`、`/wiki/Etheirys`、`/wiki/Umbral_Calamity` **全部不可达**。因此本节只能给出**官方页面确认的部分** + **明确标注的剧情共识**。**正式文档务必以 6.0 游戏内文本 / Encyclopaedia Eorzea III 为准。**

### 8.1 无影（Ascians）— 官方 2.0 定义

【官方设定】见 §1.8 引文：无影又称 **Paragons（典范者）**，黑袍、面具、在艾欧泽亚各地播种纷争。
来源：[官方 The Ascians](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/threats/theascians/)

【社区整理/剧情共识】6.0 后的真相（**以下均为剧情共识级内容，本次未取得可抓取官方原文**）：

| 项目 | 内容 |
|---|---|
| 本质 | 古代人（Ancients）中**拒绝接受世界分裂（Sundering）**的一派 |
| 领导 | **十四人委员会（Convocation of the Fourteen）** 的残余成员 |
| 目标 | 通过**世界统合（Rejoining）**复活**佐迪亚克**、恢复被分裂前的完整世界，并**让被牺牲的同胞复活** |
| 手段 | 在原初世界**促成灵灾**（每次灵灾 = 一次统合） |
| 能力 | 不死、**寄宿/占据他人身体**、传送、创造魔法、超越之力（Echo）、看见以太 |
| **未分裂三人（unsundered）** | **拉哈布雷亚 Lahabrea**、**艾梅特-塞尔克 Emet-Selch**、**艾里迪布斯 Elidibus** |
| **转生组（sundered）** | 分裂后在世界中"转生"出的无影，力量远弱于三人 |

### 8.2 十四人委员会（Convocation of the Fourteen）与无影称号

【社区整理】无影使用**委员会座位的称号**作为代号。搜索结果中命中一篇专门整理该名单的媒体文章（**未能抓取**）：

> "Final Fantasy 14: Every Member Of The Convocation Of 14" — [GameRant](https://gamerant.com/final-fantasy-14-convocation-of-14-members-endwalker/)

| 座位/称号（英） | 中文常用译 | 使用者 / 备注 | 可信度 |
|---|---|---|---|
| **Lahabrea** | 拉哈布雷亚 | 议长（Speaker）；**未分裂三人**之一 | 【剧情共识】 |
| **Emet-Selch** | 艾梅特-塞尔克 | 真名 **Hades（哈迪斯）**；**未分裂三人**之一；加雷马初代皇帝索鲁斯的寄宿者 | 【剧情共识】 |
| **Elidibus** | 艾里迪布斯 | 使者（Emissary）；**佐迪亚克的核心**；**未分裂三人**之一 | 【剧情共识】 |
| **Nabriales** | 纳布里亚莱斯 | 2.x 讨伐对象 | 【搜索命中，未验证】 |
| **Igeyorhm** | 伊格约姆 | 第十三世界（虚无界）崩坏的当事者 | 【搜索命中，未验证】 |
| **Pashtarot** | 帕斯塔罗特 | — | 【搜索命中，未验证】 |
| **Fandaniel** | 法丹尼尔 | 真名 **Hermes（赫尔墨斯）**；6.0 主要反派；"终末"推动者 | 【剧情共识】 |
| **Mitron** | 米特隆 | 第一世界；光之泛滥的推手；被阿尔伯特一行杀死 | 【搜索命中，未验证】 |
| **Loghrif** | 罗格雷夫 | 第一世界；**转生组**，其转生体为 **Gaia（盖娅）** | 【社区整理】[Lodestone 博客](https://de.finalfantasyxiv.com/lodestone/character/29141068/blog/5424098) |
| **Altima** | 阿尔提玛 | — | 【搜索命中，未验证】 |
| **Deudalaphon** | 德乌达拉丰 | — | 【搜索命中，未验证】 |
| **Emmerololth** | 艾梅罗洛特 | — | 【搜索命中，未验证】 |
| **Halmarut** | 哈尔马鲁特 | — | 【搜索命中，未验证】 |
| **Azem** | 阿泽姆 | **第十四席**，**旅行者（the traveller）**；玩家角色的前身 | 【剧情共识】 |

> ⚠️ **严重警告**：上表的**席位名拼写与"哪个无影用了哪个称号"的对应**，我**无法在本次环境中验证**。特别是 **Mitron / Loghrif / Altima / Deudalaphon / Emmerololth / Halmarut** 六者，请务必核对 *Encyclopaedia Eorzea* 或 6.0 剧情原文后再写入正式文档。搜索命中来源：[GameRant](https://gamerant.com/final-fantasy-14-convocation-of-14-members-endwalker/)、[Ascian (Fandom)](https://finalfantasy.fandom.com/wiki/Ascian)、[Azem (Fandom)](https://finalfantasy.fandom.com/wiki/Azem)。

### 8.3 "阿泽姆之座为何空置" —— 一条有价值的社区推测

【社区整理/推测】搜索命中一篇日服玩家考察文，标题即"**何故、アゼムの座は空席のままだったのか**（为什么阿泽姆之座一直空着）"：
链接：[Lodestone 社区博客](https://eu.finalfantasyxiv.com/lodestone/character/2550576/blog/4989711)（**未能抓取全文**）

社区常见推论：**阿泽姆（第十四席）在最终决战/终末期间缺席，其席位空置与玩家角色（光之战士）的灵魂本质相关**——即玩家是**阿泽姆的灵魂碎片转生**。这是 6.0 结尾的官方暗示之一，但**具体措辞请以游戏内文本为准**。

### 8.4 终末（The Final Days）与古代人

【官方设定】"终末"作为专有名词在官方 Story So Far 中出现于 6.0 描述：

> "An even greater calamity than refulgent oblivion has been building in their absence, however─**a second advent of the Final Days**. Should all despair, the myriad conflicts that now ravage the land cannot but foretoken an end to life in the Source."
> —— [官方 Endwalker: The Story So Far](https://na.finalfantasyxiv.com/endwalker/patch_6_0/story)

**可确证要点（官方）：**
- 终末是**第二次降临（a second advent）**——即古代曾发生过一次。
- 机制与"**绝望（despair）**"相关："Should all despair ... an end to life in the Source"（若万物陷入绝望，原初世界的生命将终结）。

【社区整理/剧情共识】终末的完整成因（**未能取得可抓取官方原文**）：

| 环节 | 内容 |
|---|---|
| 首次终末 | 古代世界（亚马乌罗提 Amaurot）因**民众的绝望**引发"终末" |
| 具体成因 | **梅蒂恩（Meteion）**——赫尔墨斯（后来的法丹尼尔）所造的使魔——飞向宇宙寻找其他生命，最终得出"**活着只有痛苦，死亡才是救赎**"的结论，化为"**讴歌终结之物（the Endsinger）**"，以"**讴歌破灭之歌（Song of Oblivion）**"引发终末 |
| 古代人的对策 | **十四人委员会**决定召唤蛮神 **佐迪亚克（Zodiark）** 以改写世界法则、阻止终末 |
| 代价 | **献祭一半人口**召唤佐迪亚克；终末停止后，又**再献祭一半人口**以恢复被终末破坏的世界 |
| 反对派 | **维涅斯（Venat）** 一派反对这种"以牺牲换存续"的路线 |
| 维涅斯的对策 | 维涅斯自我献祭，成为蛮神 **海德林（Hydaelyn）**，并**分裂（Sundering）世界**为 14 份，以此削弱佐迪亚克、并让人类在苦难中成长 |
| 佐迪亚克的核心 | **艾里迪布斯（Elidibus）** 献出自身成为佐迪亚克的核心 |
| 结局（6.0） | 终末二次降临 → 光之战士登月、杀佐迪亚克 → 海德林自我牺牲 → 击破 the Endsinger → 世界免于终末 |
| 相关地点 | **叹息海 Mare Lamentorum**（月球）、**洛波利特（Loporrits）**、**厄尔庇斯（Elpis）**、**终极之座（Ultima Thule）**、**星海（the Aetherial Sea）** |

> ⚠️ 上表为**剧情共识**，本次**零官方页面确证**。搜索命中来源：[Azem (Fandom)](https://finalfantasy.fandom.com/wiki/Azem)、[Hydaelyn (character)](https://finalfantasy.fandom.com/wiki/Hydaelyn_(character))、[Etheirys](https://finalfantasy.fandom.com/wiki/Etheirys)、[FFXIV's Entire Story Timeline (ScreenRant)](https://screenrant.com/ffxiv-endwalker-timeline-major-events-final-fantasy-14/)（**全部未能抓取**）。**正式文档请以游戏内文本为准。**

### 8.5 亚马乌罗提（Amaurot）与古代人社会

【社区整理/剧情共识】（**未能取得可抓取官方原文**）：

| 项目 | 内容 |
|---|---|
| 亚马乌罗提 | 古代人的首都，位于**原初世界分裂前的世界**；在 6.0 中可访问其**幻影/记忆再现**（"The Tempest" 海底） |
| 古代人 | 近乎不死、容貌高大、能自由使用**创造魔法（creation magic）** |
| 概念（concepts） | 古代人把创造物以"概念"形式存储、复用；厄尔庇斯（Elpis）是概念创造的研究设施 |
| 十四人委员会 | 由 14 位成员组成，各司其职（如艾梅特-塞尔克为"死亡/冥界"相关、阿泽姆为"旅行者"） |
| 终末后的分裂 | 世界被维涅斯分裂为 14 份，古代人被分裂为 14 分之 1 的存在（"sundered"） |
| 现代人的含义 | 现代人类即"被分裂的灵魂"的后代；无影认为现代人是不完整的"碎影" |

---

## 9. 真伪蛮神、光暗之战士、水晶塔与虚无界

### 9.1 光之战士（Warrior of Light）与暗之战士（Warrior of Darkness）

【官方设定】官方 Story So Far 明确把"**光之战士变成暗之战士**"写成 5.0 的核心转折：

> "Only when the **Warrior of Light becomes the Warrior of Darkness** do they restore night to the blinding sky, and begin to find what once was lost."
> —— [官方 Endwalker: The Story So Far](https://na.finalfantasyxiv.com/endwalker/patch_6_0/story)

**因此（官方）：**
- **"光之战士"与"暗之战士"在 FF14 中不是固定阵营标签，而是可互换的称号**——取决于你对抗的是"泛滥的光"还是"泛滥的暗"。
- 第一世界的**光之泛滥**之所以是灾难，是因为**光本身过量**；主角因此必须以"暗之战士"身份行动。
- 玩家在**原初世界**的正式称号仍是"**光之战士**"（Warrior of Light），并持有**母水晶的加护（Blessing of Light）**与**超越之力（the Echo）**。

【社区整理】**阿尔伯特（Ardbert）** 及其一行是第一世界的"**暗之战士**"，在 2.x–3.x 曾以"暗之战士"身份出现在原初世界（"Warriors of Darkness"）；5.0 揭示他们其实是第一世界的英雄，为阻止光之泛滥而战，失败后将希望托付给玩家。
（**本次未取得可抓取来源**，标为剧情共识。）

### 9.2 水晶塔（Crystal Tower）— 已确证的官方线索

【官方设定】官方 Story So Far 对 5.0 有一句直接点出水晶塔与"时间/空间跨越"的关系（**转述自 ScreenRant 引用，我未能抓取 ScreenRant 全文**）：

> "So, the Warrior of Light, their friends Called away, traveled to the Crystal Tower"
> —— 搜索命中：[ScreenRant — FFXIV's Entire Story Timeline Of Major Events Before Endwalker](https://screenrant.com/ffxiv-endwalker-timeline-major-events-final-fantasy-14/)（**未能验证**）

【社区整理/剧情共识】水晶塔相关要点（**均未能取得可抓取出处**）：

| 项目 | 内容 |
|---|---|
| 全称 | **水晶塔（Crystal Tower）**，核心为 **Syrcus Tower（锡尔库斯之塔）** |
| 建造者 | **亚拉戈帝国（Allagan Empire）** |
| 关键人物 | **赞德（Xande）**、**乌内（Unei）**、**多加（Doga）** |
| 内部传送门 | 塔内有通往**第十三世界（虚无界）**的门 —— **"World of Darkness（暗之世界）"**（24 人副本） |
| 与 5.0 的关系 | **古·拉哈·提亚（G'raha Tia）** 将水晶塔带到第一世界，建立 **水晶城（The Crystarium）**，并跨越时间召唤光之战士 |
| 与 6.0 的关系 | 水晶塔被用于**时间旅行**（回到古代/厄尔庇斯相关剧情） |
| 与虚无界的关系 | 塔内的门是**原初世界 ↔ 第十三世界**的通道 |

搜索命中来源（全部未能抓取）：[Crystal Tower Quests (Fandom)](https://finalfantasy.fandom.com/wiki/Final_Fantasy_XIV_quests/Crystal_Tower_Quests)、[The World of Darkness (GamerEscape)](https://ffxiv.gamerescape.com/w/index.php?title=The_World_of_Darkness_(Quest))

### 9.3 虚无界（The Void）= 第十三世界

【社区整理/剧情共识】：

| 项目 | 内容 |
|---|---|
| 第十三世界 | 十四个世界之一 |
| 崩坏经过 | 该世界被**暗之泛滥（Flood of Darkness）**吞没 → 成为**虚无界（the Void）** |
| 责任者 | 无影 **伊格约姆（Igeyorhm）** 的失败 |
| 产物 | **妖异（Voidsent）**——虚无界的居民，需以契约/以太为代价被召唤到原初世界 |
| 通道 | **水晶塔**内的门；**虚无之门（Voidgate）** |
| 6.x 主线 | **6.1–6.5** 的"虚无界篇"：**高贝兹（Golbez）**、**零（Zero）**，试图拯救第十三世界 |
| 6.x 剧情新增概念 | 偏斜属性互撞相杀（见 §4.3） |
| 7.0 关联 | 官方 Dawntrail 文案明确"**a mission unto another reflection**（前往另一个镜像世界的任务）"——即虚无界线的延续 |

来源：[官方 Dawntrail](https://na.finalfantasyxiv.com/dawntrail/)（"another reflection" 为官方原文）；其余为【社区整理/剧情共识】，搜索命中：[Voidsent (Fandom)](https://finalfantasy.fandom.com/wiki/Voidsent_(Final_Fantasy_XIV))（未验证）

### 9.4 真伪蛮神（回顾）

见 §6.5。核心结论：
- 官方用语 **elder primal（上古蛮神）** 用于巴哈姆特（[官方](https://na.finalfantasyxiv.com/lodestone/special/grandcompany/)）；
- 官方把 **Bahamut / Odin** 与五蛮族蛮神并列却不标召唤者，暗示"蛮神不等于蛮族的产物"（[官方](https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/primals/)）；
- 后期（5.x–6.x）明确"**蛮神的形态取决于召唤者的想象与认知**"，因此"真伪"更多是**来源与纯度**之别，而非"有没有这个神"之别。

---

## 10. 存疑清单与后续补研建议（重要）

### 10.1 本次**完全未能验证**的条目（必须在正式文档中标注或回避）

| # | 条目 | 原因 |
|---|---|---|
| 1 | **蛮族完整清单**（Goblin / Gigas / Mamool Ja / Dragons / Vanu Vanu / Gnath / Kojin / Ananta / Namazu / Dwarves / Pixie / Nu Mou / Qitari / Ronka / Lupin / Matanga / Pelupelu / Yok Huy / Moblins / Hannes 等） | `consolegameswiki`、`gamerescape`、`fandom` 全部不可达 |
| 2 | **蛮族任务 / 联合任务系统细节**（声望等级名、每日配额、各族坐骑、各资料片新增族） | 同上 |
| 3 | **十四人委员会 14 席的完整名单与无影对应**（尤其 Mitron / Loghrif / Altima / Deudalaphon / Emmerololth / Halmarut） | `fandom` 不可达；媒体文章不可抓取 |
| 4 | **加雷马 Populares（平民派）/ Optimates（贵族派）** | 零有效搜索结果 |
| 5 | **加雷马帝国崩溃后的具体局面**（各军团下落、行省独立、首都重建、政体） | 命中的 Lodestone 博客正文只有视频外链 |
| 6 | **Etheirys（艾瑟里丝）** 作为星球真名的官方原文 | `fandom` 不可达 |
| 7 | **第九世界 / 亚历山德里亚** 的官方确认细节 | 媒体文章（TheGamer / GameRant）不可抓取，仅标题级命中 |
| 8 | **第七灵灾的属性归属**（"火"还是"暗"） | 官方语料与社区表存在编号错位 |
| 9 | **星极/灵极的严格定义**（"活跃 vs 凝滞"是否为官方表述） | 无可抓取的以太学词条 |
| 10 | **光之泛滥 / 暗之泛滥的前置条件与"属性均一化"机制** | 只有玩家归纳 |
| 11 | **拉札罕（Radz-at-Han）/ 萨维奈（Thavnair）的政体与"太守 Vrtra"** | 未抓取到官方页 |
| 12 | **欧萨德（Othard）各地**：ひんがし / 黄金港 / 白银乡 / 红玉海 / 阿兹姆草原 / 延夏 / 多玛再建 | 未抓取到官方页 |
| 13 | **伊修加德四大家族的官方名单**（Fortemps / Dzemael / Durendaire / Haillenarte） | 只有 RPGFan 间接提及 Fortemps |

### 10.2 建议的补研路径（按性价比排序）

1. **官方 Eorzea Database**（`https://na.finalfantasyxiv.com/lodestone/playguide/db/`）——**可达且官方**，可用来逐条确认蛮神讨伐战、蛮族任务名、地名。**最优先**。
2. **各资料片官方 World 页**：`/heavensward/world/`、`/stormblood/world/`、`/shadowbringers/world/`、`/endwalker/world/`、`/dawntrail/world/`，以及各自的 `patch_x_y` 子页。**可达且官方**。
3. **官方 Lodestone 短篇小说**（Tales from the Shadows / Twilight / Dawn / New Moon / Golden Sun）——**可达**，含大量城邦与人物设定。
4. **官方 Lodestone 特殊页**：`/lodestone/special/`（Grand Companies / 各资料片 special）。
5. 若能恢复 `consolegameswiki` / `gamerescape` / `fandom` 访问：优先补 **Beast Tribe / Allied Society**、**Ascian / Convocation**、**Aether / Umbral Calamity**、**Garlean Empire** 四个词条。
6. **Encyclopaedia Eorzea I–III**（实体设定集）：**唯一能彻底解决灵灾属性顺序、以太学定义、十四席名单的来源**。

---

## 附录 A：本文已实际抓取的一手来源清单

| 来源 | URL | 类型 |
|---|---|---|
| ARR — The Crystal's Call（世界观/艾欧泽亚/以太/时代循环/冒险者） | https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/story | 官方 |
| ARR — LOCATIONS（城邦清单） | https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/cities/ | 官方 |
| ARR — PRIMALS AND BEASTMEN（蛮神定义 + 5 蛮族配对） | https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/primals/ | 官方 |
| ARR — THREATS: The Ascians（无影 2.0 定义 + 威胁名单） | https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/threats/theascians/ | 官方 |
| ARR — LORE 索引 | https://na.finalfantasyxiv.com/a_realm_reborn/sp/world/lore/ | 官方 |
| Lodestone — Grand Companies of Eorzea（国防联军史/第七灵灾/三城邦） | https://na.finalfantasyxiv.com/lodestone/special/grandcompany/ | 官方 |
| Lodestone — The Garlean Empire（索鲁斯/盖乌斯/奈尔） | https://na.finalfantasyxiv.com/lodestone/special/grandcompany/garlean_empire/ | 官方 |
| Endwalker — The Story So Far（2.0–6.0 官方摘要） | https://na.finalfantasyxiv.com/endwalker/patch_6_0/story | 官方 |
| Dawntrail — 主页（7.0 故事定位） | https://na.finalfantasyxiv.com/dawntrail/ | 官方 |
| Dawntrail — World（图拉尔地理/各区描述） | https://na.finalfantasyxiv.com/dawntrail/world/ | 官方 |
| RPGFan — The Sins of Antiquity（伊修加德/龙诗战争） | https://www.rpgfan.com/feature/the-sins-of-antiquity-history-reparations-and-justice-in-final-fantasy-xivs-holy-see-of-ishgard/ | 二次文献 |
| Lodestone 社区博客 — 霊災の順番と属性（灵灾表/统合机制/第九世界） | https://de.finalfantasyxiv.com/lodestone/character/29141068/blog/5424098 | 社区整理 |
| Lodestone 社区博客 — The State of the Garlean Empire after Endwalker | https://na.finalfantasyxiv.com/lodestone/character/2289851/blog/5398558 | 社区整理 |

**搜索命中但未能抓取的关键来源（引用时须标注未验证）：**

- [Aether (Fandom)](https://finalfantasy.fandom.com/wiki/Aether_(Final_Fantasy_XIV))
- [Umbral Calamity (Fandom)](https://finalfantasy.fandom.com/wiki/Umbral_Calamity)
- [Ascian (Fandom)](https://finalfantasy.fandom.com/wiki/Ascian)
- [Etheirys (Fandom)](https://finalfantasy.fandom.com/wiki/Etheirys)
- [Hydaelyn (character) (Fandom)](https://finalfantasy.fandom.com/wiki/Hydaelyn_(character))
- [Azem (Fandom)](https://finalfantasy.fandom.com/wiki/Azem)
- [Garlean Empire (Fandom)](https://finalfantasy.fandom.com/wiki/Garlean_Empire)
- [Warring Triad (Fandom)](https://finalfantasy.fandom.com/wiki/Warring_Triad_(Final_Fantasy_XIV))
- [Azys Lla (Fandom)](https://finalfantasy.fandom.com/wiki/Azys_Lla)
- [Rowena (Fandom)](https://finalfantasy.fandom.com/wiki/Rowena)
- [Voidsent (Fandom)](https://finalfantasy.fandom.com/wiki/Voidsent_(Final_Fantasy_XIV))
- [Eorzean Alliance (Fandom)](https://finalfantasy.fandom.com/wiki/Eorzean_Alliance)
- [Intersocietal Quests (consolegameswiki)](https://ffxiv.consolegameswiki.com/wiki/Intersocietal_Quests)
- [Seventh Umbral Calamity (GamerEscape)](https://ffxiv.gamerescape.com/wiki/Seventh_Umbral_Calamity)
- [Polygon — Allied society quests](https://www.polygon.com/ffxiv-guides-ff14-final-fantasy-14-online/480866/allied-society-quests-ranks-mounts-tribes/)
- [TheGamer — Yoshi-P confirms Alexandria from the Ninth Reflection](https://www.thegamer.com/final-fantasy-14-director-naoki-yoshida-yoshi-p-confirms-alexandria-from-the-ninth-reflection-dawntrail-expansion/)
- [GameRant — Every Member Of The Convocation Of 14](https://gamerant.com/final-fantasy-14-convocation-of-14-members-endwalker/)
- [TheGamer — Every Umbral Calamity Explained](https://www.thegamer.com/final-fantasy-14-xiv-every-umbral-calamity-explained/)
- [ScreenRant — FFXIV's Entire Story Timeline](https://screenrant.com/ffxiv-endwalker-timeline-major-events-final-fantasy-14/)
- [Lodestone 社区博客 — リアル錬金術知識から見る「霊極」「星極」「光」「闇」](https://na.finalfantasyxiv.com/lodestone/character/15674024/blog/5330960/)
- [Lodestone 社区博客 — 霊災と属性の関係性について](https://jp.finalfantasyxiv.com/lodestone/character/38328894/blog/5391658/)
- [Lodestone 社区博客 — 何故、アゼムの座は空席のままだったのか](https://eu.finalfantasyxiv.com/lodestone/character/2550576/blog/4989711)

---

<!-- APPENDIX-B-PLACEHOLDER -->
