# FFXIV 调研笔记 B：种族 · 部族 · 角色创建

> 调研员：FFXIV 资料调研员（子代理）  
> 调研日期（会话内设定）：2026-09-15  
> 调研方式：`web_search` + `web_fetch`，累计 20+ 次检索/抓取  
> **版本时效性说明**：调研期间抓取到的官方页面显示 —— 资料库版本为 **Patch 7.56**，战斗职业指引标注 **Updated for 7.5**，下一个资料片 **Evercold（8.0）** 已在 2026 Fan Festival 公布。本笔记仍按任务要求以 **7.x（Dawntrail / 黄金的遗产）** 为基准，凡是 7.5 之后的新内容会单独标注。

---

## 0. 本笔记的信息分级与抓取可用性

### 0.1 标注约定

| 标记 | 含义 |
| --- | --- |
| 【官方设定】 | 来自 SQUARE ENIX 官方站点（finalfantasyxiv.com 各语言站、Lodestone、Eorzea Database、官方资料片特设站） |
| 【官方-社区】 | 官方站点上由玩家发布的 Lodestone 日记 / 博客，含实测数据，可信度较高但非官方编纂 |
| 【社区整理】 | 第三方 wiki、攻略站、玩家论坛的整理与推测 |
| 【待核实】 | 本次调研未能找到权威一手来源，或来源之间冲突 |

### 0.2 本次调研的抓取可用性（重要，影响后续补充调研）

| 目标站点 | 抓取结果 | 说明 |
| --- | --- | --- |
| `na/eu/jp/fr/de.finalfantasyxiv.com`（官网 + Lodestone + Eorzea DB + Job Guide） | ✅ 正常 | 本次调研主力来源 |
| `www.ffxiv.com.tw`（繁中官方站） | ✅ 正常 | **中文官方译名的第一手来源** |
| `wiki.ffxiv-roleplayers.com`（RPC Library） | ✅ 正常 | 设定文本转录，含《艾欧泽亚五纪年表》原文 |
| `ffxiv-roleplayers.com`（RPC 论坛） | ✅ 正常 | 已于 2022 年 9 月关闭存档，仅历史内容 |
| `game8.jp` / `kamigame.jp`（日文攻略站） | ✅ 正常 | 社区整理 |
| `ffsky.cn`（天幻网中文专题） | ✅ 正常 | 1.0 时代的旧资料，可作历史对照 |
| **`ffxiv.consolegameswiki.com`** | ❌ HTTP 403（Cloudflare 拦截） | 任务要求参考但**无法抓取**，只能通过搜索引擎摘要间接引用 |
| **`ffxiv.gamerescape.com`** | ❌ HTTP 403（Cloudflare 拦截） | 同上 |
| **`finalfantasy.fandom.com` / `ffxiv.fandom.com`** | ❌ fetch failed（连接层失败） | 同上；仅能通过搜索摘要引用 |

> ⚠️ **给后续调研的提示**：Consolegameswiki / GamerEscape / Fandom 三家在本环境被拦截。若需要其内容，建议改由 Lodestone 玩家日记、官方 Job Guide/Eorzea DB、繁中官网、RPC Library 这四条可抓取通道替代，或在有浏览器环境时人工搬运。

---

## 1. 总览：八大可玩种族与十六部族

### 1.1 十六部族全表（英文名以游戏数据枚举为准）

来源：`ffxiv_types_cn` crate 的 `Clan` 枚举（社区维护、用于第三方工具，与游戏内部数据一致）——[docs.rs/ffxiv_types_cn/clans.rs](https://docs.rs/ffxiv_types_cn/latest/src/ffxiv_types_cn/clans.rs.html)

| 种族 | 部族 1（英） | 部族 2（英） | 内部枚举名 |
| --- | --- | --- | --- |
| 人族 Hyur | Midlander | Highlander | `Midlander` / `Highlander` |
| 精灵族 Elezen | Wildwood | Duskwight | `Wildwood` / `Duskwight` |
| 拉拉肥族 Lalafell | Plainsfolk | Dunesfolk | `Plainsfolk` / `Dunesfolk` |
| 猫魅族 Miqo'te | Seekers of the Sun | Keepers of the Moon | `SeekerOfTheSun` / `KeeperOfTheMoon` |
| 鲁加族 Roegadyn | Sea Wolves | Hellsguard | `SeaWolf` / `Hellsguard` |
| 敖龙族 Au Ra | Raen | Xaela | `Raen` / `Xaela` |
| 维埃拉族 Viera | Rava | Veena | `Rava` / `Veena` |
| 硌狮族 Hrothgar | Helions | The Lost | `Helions` / `TheLost` |

> 注：`Clan` 枚举共 16 项，说明**截至数据枚举版本仍只有 8 个可玩种族 × 2 部族**，7.0 只解锁了雌性硌狮族，并未新增第 9 个种族。

### 1.2 日 / 英 / 中 三部族名对照表（中文以繁中官方站为准）

中文官方译名来源：[FINAL FANTASY XIV 繁體中文版官方網站 · 種族介紹](https://www.ffxiv.com.tw/web/intro/races/)  
日文名来源：[Raw Arulaq「各種族身長一覧・改（ロスガル・ヴィエラ対応版）」](https://eu.finalfantasyxiv.com/lodestone/character/6454882/blog/2668120/)

| 种族（日 / 英 / 繁中官方） | 部族（日） | 部族（英） | 部族（繁中官方） | 大陆常用译名【社区整理】 |
| --- | --- | --- | --- | --- |
| ヒューラン / Hyur / 人族 | ミッドランダー | Midlander | 中原之民 | 中原之民 |
| | ハイランダー | Highlander | 高地之民 | 高地之民 |
| エレゼン / Elezen / 精靈族 | フォレスター | Wildwood | 森林之民 | 森林之民 |
| | シェーダー | Duskwight | 黑影之民 | 黑影之民 |
| ララフェル / Lalafell / 拉拉菲爾族 | プレーンフォーク | Plainsfolk | 平原之民 | 平原之民 |
| | デューンフォーク | Dunesfolk | 沙漠之民 | 沙丘之民 / 沙漠之民 |
| ミコッテ / Miqo'te / 貓魅族 | サンシーカー | Seekers of the Sun | 逐日之民 | 日猫族 / 逐日之民 |
| | ムーンキーパー | Keepers of the Moon | 護月之民 | 月猫族 / 护月之民 |
| ルガディン / Roegadyn / 魯加族 | ゼーヴォルフ | Sea Wolves | 北洋之民 | 海之民 / 北洋之民 |
| | ローエンガルデ | Hellsguard | 紅焰之民 | 炎之民 / 红焰之民 |
| アウラ / Au Ra / 敖龍族 | アウラ・レン | Raen | 晨曦之民 | 晨曦之民 |
| | アウラ・ゼラ | Xaela | 暮暉之民 | 暮晖之民 |
| ヴィエラ / Viera / 維艾拉族 | ラヴァ・ヴィエラ | Rava | 密林之民 | **注意**：任务书写作「山林之民」；繁中官方为「密林之民」（褐色皮肤） |
| | ヴィナ・ヴィエラ | Veena | 山林之民 | **注意**：任务书写作「湿林之民」；繁中官方为「山林之民」（白色皮肤） |
| ロスガル / Hrothgar / 硌獅族 | ヘリオン | Helions | 掠日之民 | 掠日之民 |
| | ロスト | The Lost | 迷蹤之民 | 迷途之民 / 迷踪之民 |

> ✅ **纠错（针对任务书第 1 条）**：维埃拉两部族的中文名常被记反。按**繁中官方站**：**Rava = 密林之民**（褐色皮肤，视葛尔摩大密林为圣地）；**Veena = 山林之民**（白色皮肤，以斯卡提山脉南侧为根据地）。任务书给的「山林之民 Rava / 湿林之民 Veena」顺序有误。

---

## 2. 八大可玩种族逐一详述

### 2.1 人族 Hyur（ヒューラン / 人族）

| 项目 | 内容 |
| --- | --- |
| 英 / 日 / 繁中 / 大陆 | Hyur / ヒューラン / 人族 / 人族 |
| 部族 | Midlander 中原之民（ミッドランダー）、Highlander 高地之民（ハイランダー） |
| 加入版本 | 1.0 起（重生之境初始种族） |
| 代表城邦 | 三大城邦均有，是艾欧泽亚人口最多的文明种族 |
| 聚居地 | 米德兰达：全艾欧泽亚各城市；海兰德：基拉巴尼亚山区 → 阿拉米格陷落后大量流亡乌尔达哈 |

**官方设定（种族整体）**【官方设定】  
> “Over the course of some one thousand years and three great migratory waves, the Hyur have come to be the most populous of the civilized races in Eorzea. Compared to the others, theirs is an average physique, both in terms of height and build. The Hyur champion personal freedom and liberty, and their espousal of an eclectic variety of languages and traditions is a legacy of their diverse heritage―as is their resulting lack of a unified cultural identity.”  
> ——[na.finalfantasyxiv.com/a_realm_reborn/world/races/](https://na.finalfantasyxiv.com/a_realm_reborn/world/races/)

- 千年间经历**三次大迁徙**（three great migratory waves）进入艾欧泽亚，是文明种族中人口最多的。
- 体格、身高在一种族中「最平均」，因此常被当作「人类基准」。
- 崇尚个人自由与 liberty，语言与传统驳杂 → **没有统一的文化认同**（这是 Hyur 最重要的设定：他们「没有单一文化」）。

**部族差异**【官方设定】

| 部族 | 官方描述要点 |
| --- | --- |
| Midlander 中原之民 | 占艾欧泽亚 Hyur 总人口**过半**；因长期定居低地（low-lying regions）而得名；血脉其实来自多种祖先故乡；遍布各城邦，生活方式极为多样 |
| Highlander 高地之民 | 名字来自对**基拉巴尼亚（Gyr Abania）山地**的统治史；体格与肌肉量都明显大于 Midlander；阿拉米格陷落后大量流入商业国家乌尔达哈 |

**身高范围**【官方-社区】  
来源：[Raw Arulaq「各種族身長一覧・改」](https://eu.finalfantasyxiv.com/lodestone/character/6454882/blog/2668120/)（角色创建界面滑条实测，单位 cm，括号内为默认中间值）

| 部族 | 性别 | 最小 | 最大 | 默认 |
| --- | --- | --- | --- | --- |
| Midlander | ♂ | 168.0 | 182.0 | 175.0 |
| Midlander | ♀ | 157.4 | 170.5 | 164.0 |
| Highlander | ♂ | 184.8 | 200.2 | 192.5 |
| Highlander | ♀ | 173.1 | 187.6 | 180.4 |

> 📌 **Hyur 是唯一「部族之间身高上下限都不同」的种族**（该实测笔记明确写：`部族差があるのはヒューランのみ`，只有 Hyur 存在部族身高差）。

**命名规则**【官方-社区】  
> 本次调研**无法抓取 GamerEscape 的 Hyur Naming Conventions 页面**（HTTP 403）。以下为社区通行整理，标注为【社区整理】，待有网络条件时以官方 Lodestone 命名规则文章复核。

- **Midlander**：常用「名 + 姓」的双名结构，名字偏欧陆（英/法/德/北欧混合），姓氏常带地名或职业色彩。官方论坛角色名如 `Y'shtola` 属猫魅族，不适用。
- **Highlander**：名字更硬朗、多含地理/部族意象；阿拉米格系 NPC 名如 `Raubahn`、`Ilberd`、`Fordola`。
- 关键点：**Hyur 的命名没有像鲁加族那样的「语言词根规则」**，这正是「无统一文化认同」在命名上的体现。

**代表 NPC**【官方设定 + 社区整理】

| NPC | 部族 | 身份 |
| --- | --- | --- |
| 拉乌巴恩 Raubahn Aldynn | Highlander ♂ | 乌尔达哈焰牙将军、沙蝎众 |
| 伊尔伯德 Ilberd Feare | Highlander ♂ | 水晶义勇队 / 阿拉米格解放战线 |
| 芙朵拉 Fordola rem Lupis | Highlander ♀ | 阿拉米格总督府「假面」部队长 |
| 敏菲利亚 Minfilia Warde | Midlander ♀ | 晓之血盟盟主 |
| 塔塔露 Tataru Taru | （Lalafell，非 Hyur） | — |
| 阿尔菲诺 Alphinaud / 阿莉塞 Alisaie Leveilleur | Elezen（非 Hyur） | — |

> ⚠️ **待核实**：敏菲利亚的部族（Midlander）在本次抓取中未见官方明示，为社区共识。建议后续在 Eorzea DB 的 NPC 条目复核。

---

### 2.2 精灵族 Elezen（エレゼン / 精靈族）

| 项目 | 内容 |
| --- | --- |
| 英 / 日 / 繁中 / 大陆 | Elezen / エレゼン / 精靈族 / 精灵族 |
| 部族 | Wildwood 森林之民（フォレスター）、Duskwight 黑影之民（シェーダー） |
| 加入版本 | 1.0 起 |
| 代表城邦 | 伊修加德、格里达尼亚 |
| 聚居地 | Wildwood：黑衣森林、伊修加德、格里达尼亚；Duskwight：森林中的钟乳洞 |

**官方设定（种族整体）**【官方设定】  
> “The Elezen are a characteristically tall people, long of limb and slender of build. They are also possessed of a somewhat extended lifespan in comparison to the Hyur. The Elezen once claimed sole dominion over Eorzea, their presence predating that of the other races, and, as such, developed a heightened sense of honor and pride.”  
> ——[na.finalfantasyxiv.com/a_realm_reborn/world/races/](https://na.finalfantasyxiv.com/a_realm_reborn/world/races/)

- 身高极高、四肢修长、体型纤细。
- **寿命比 Hyur 略长**（官方明示 `somewhat extended lifespan`）。
- **自称曾独占艾欧泽亚**，其存在早于其他种族，因此荣誉感与自豪感极强。
- Hyur 迁入曾引发激烈冲突，现已和解。

**部族差异**【官方设定】

| 部族 | 官方描述要点 |
| --- | --- |
| Wildwood 森林之民 | 以黑衣森林为家数百年；多被吸引到他们参与建立的城邦（伊修加德、格里达尼亚）；**喜好法律与秩序**，因此有「傲慢、好辩」的名声 |
| Duskwight 黑影之民 | 数百年来居住在森林洞窟中；是**格里达尼亚建国时从 Wildwood 分裂出去**的一支后裔；厌恶城市生活的「枷锁」，常见完全回避城邦 |

**中文官方补充**【官方设定】（繁中官网）
- 森林之民：祖先曾住平原，受人族压迫而迁移，建立伊修加德与格尔莫拉（后发展为格里达尼亚），两国立场相近常互助。
- 黑影之民：以昏暗钟乳洞为据点，建国时与森林之民决裂，部分人干起山贼勾当，被森都民众贴上「不法之徒」标签，**在城市中常遭歧视**。

**身高范围**【官方-社区】（同一实测来源）

| 性别 | 最小 | 最大 | 默认 |
| --- | --- | --- | --- |
| ♂ | 194.1 | 209.8 | 202.0 |
| ♀ | 183.5 | 198.4 | 191.0 |

> 注：Elezen **部族之间无身高差**（`エレゼンの身長は部族間で差がない`）。

**命名规则**【社区整理】
- 名字带法语/精灵语色彩，音节优雅、多连音（如 `Urianger`、`Haurchefant`、`Estinien`、`Aymeric`）。
- 姓氏常与家族、领地、骑士团相关（如 `de Borel`、`de Fortemps`、`Leveilleur`）。
- Duskwight 的命名习惯在社区常与 Wildwood 区分处理（更粗粝、更少贵族前缀），但**本次未取得一手来源，标注【待核实】**。

**代表 NPC**

| NPC | 部族 | 身份 |
| --- | --- | --- |
| 艾斯提尼安 Estinien Wyrmblood | Wildwood ♂ | 苍天之龙骑士 |
| 艾默里克 Aymeric de Borel | Wildwood ♂ | 伊修加德议长 |
| 于里昂热 Urianger Augurelt | Wildwood ♂ | 晓之血盟 |
| 阿尔菲诺 / 阿莉塞 Alphinaud & Alisaie Leveilleur | Wildwood | 晓之血盟双胞胎 |
| 豪雪 Haurchefant Greystone | Wildwood ♂ | 伊修加德圣殿骑士 |
| 格·拉哈·提亚 G'raha Tia | （Miqo'te，非 Elezen） | — |

---

### 2.3 拉拉肥族 Lalafell（ララフェル / 拉拉菲爾族）

| 项目 | 内容 |
| --- | --- |
| 英 / 日 / 繁中 / 大陆 | Lalafell / ララフェル / 拉拉菲爾族 / 拉拉肥族（俗称「拉拉肥」） |
| 部族 | Plainsfolk 平原之民（プレーンフォーク）、Dunesfolk 沙漠之民（デューンフォーク） |
| 加入版本 | 1.0 起 |
| 代表城邦 | 利姆萨·罗敏萨（Plainsfolk 为重要组成民族）、乌尔达哈（Dunesfolk 为建国者） |
| 聚居地 | Plainsfolk：拉诺西亚等平坦可耕地、利姆萨·罗敏萨；Dunesfolk：萨纳兰沙漠 |

**官方设定（种族整体）**【官方设定】  
> “The Lalafell are a folk both rotund and diminutive. Small by any race's standards and possessed of a childlike countenance, it proves difficult for non-Lalafell to gauge an individual's age with any degree of accuracy. Originally an agricultural people inhabiting the fertile islands of the south seas, they found their way to Eorzea via the burgeoning trade routes.”  
> ——[na.finalfantasyxiv.com/a_realm_reborn/world/races/](https://na.finalfantasyxiv.com/a_realm_reborn/world/races/)

- 圆润、极矮，**娃娃脸导致外族无法准确判断年龄**。
- 原为**南洋肥沃岛屿上的农业民族**，经贸易航线来到艾欧泽亚。
- 对外来者友好，与所有种族关系融洽 —— 设定上是最「无摩擦」的种族。

**部族差异**【官方设定】

| 部族 | 官方描述要点 |
| --- | --- |
| Plainsfolk 平原之民 | 定居拉诺西亚等地势平坦易耕作处；虽多务农，但常见在利姆萨·罗敏萨海军、渔业就业；以**悠闲无忧（relaxed and carefree）**著称 |
| Dunesfolk 沙漠之民 | 生活在萨纳兰灼热沙地；**是商业都市乌尔达哈的建国者**，以对商业的痴迷闻名；「把想法立刻变成行动」的天性使其在生意上非常成功 |

**中文官方补充**【官方设定】（繁中官网）
- 沙漠之民：**玛哈（マハ）灭亡后**，幸存国民迁往萨纳兰荒野与沙漠，因此得名「沙漠之民」。

**身高范围**【官方-社区】（同一实测来源）

| 部族 / 性别 | 最小 | 最大 | 默认 |
| --- | --- | --- | --- |
| 全部共通 | 86.9 | 97.0 | 91.9 / 92.0 |

> 关键：**Lalafell 无部族差、无男女差**（`ララフェルに男女差はなし`）。最大身高不到 1 米；实测笔记的吐槽是「最大 97cm ≈ 三岁半男童平均身高 97.5cm」。

**命名规则**  
> 参考：任务书指定的 GamerEscape `Lalafell Naming Conventions` 页面在检索结果中出现（[oldid 链接](https://ffxiv.gamerescape.com/w/index.php?title=Lalafell_Naming_Conventions&oldid=2218576)），但**抓取被 Cloudflare 拦截（403）**。以下为社区通行整理【社区整理】。

- Lalafell 名多为**音节的重复/押韵结构**，极常见叠音与短音节（如 `Tataru Taru`、`Pipin Tarupin`、`Nanamo Ul Namo`、`Lolorito Nanarito`）。
- 姓氏与名字常押韵或共享音节，形成「童谣感」，这与种族整体「孩童般外貌」的设定互相呼应。
- Dunesfolk 与 Plainsfolk 的命名在社区常被描述为音节偏好不同，但**本次未取得一手来源，标注【待核实】**。

**代表 NPC**

| NPC | 部族 | 身份 |
| --- | --- | --- |
| 娜娜莫·乌尔·娜莫 Nanamo Ul Namo | Dunesfolk ♀ | 乌尔达哈女王（砂蝎众） |
| 塔塔露·塔露 Tataru Taru | 【待核实】 | 晓之血盟会计 |
| 罗罗力特·纳纳力特 Lolorito Nanarito | Dunesfolk ♂ | 东阿尔迪纳德商会会长 |
| 皮平·塔鲁平 Pipin Tarupin | 【待核实】 | 焰牙副将 |
| 帕帕力莫 Papalymo Totolymo | Plainsfolk ♂ | 晓之血盟 |
| 特拉哈 Trig | — | — |

---

### 2.4 猫魅族 Miqo'te（ミコッテ / 貓魅族）

| 项目 | 内容 |
| --- | --- |
| 英 / 日 / 繁中 / 大陆 | Miqo'te / ミコッテ / 貓魅族 / 猫魅族（俗称「猫娘」「猫男」） |
| 部族 | Seekers of the Sun 逐日之民（サンシーカー）、Keepers of the Moon 护月之民（ムーンキーパー） |
| 加入版本 | 1.0 起（1.0 时曾限女性，2.0 起男女可选）【待核实-细节】 |
| 代表城邦 | 利姆萨·罗敏萨（逐日之民）、格里达尼亚（护月之民） |
| 聚居地 | 逐日之民：萨戈利沙漠（Sagolii Desert）、利姆萨·罗敏萨；护月之民：黑衣森林 |

**官方设定（种族整体）**【官方设定】  
> “Though their presence in Eorzea is lesser than that of the other races, the Miqo'te are easily distinguished by their large, projecting ears and restless, feline tails. The ancestors of this line first made their way to the realm during the Age of Endless Frost in the Fifth Umbral Era, traversing frozen seas in pursuit of the wildlife upon which they subsisted. Instinctual territoriality causes many among them to lead solitary lifestyles. Males in particular are said to shy from contact with others.”  
> ——[na.finalfantasyxiv.com/a_realm_reborn/world/races/](https://na.finalfantasyxiv.com/a_realm_reborn/world/races/)

- 艾欧泽亚存在感低于其他种族；特征为**大而外张的耳**与**不安分的猫尾**。
- 祖先在**第五星极时代（Fifth Umbral Era）的「无尽霜冻时代」**跨越冰封海洋，追踪猎物抵达艾欧泽亚。
- **本能性的领地意识**使其多独居；**雄性尤甚，据说回避与他人接触**（这条设定解释了为什么「猫男」在剧情中稀少）。

**部族差异**【官方设定】

| 部族 | 官方描述要点 |
| --- | --- |
| Seekers of the Sun 逐日之民 | **昼行性**；喜好日光，文化中充满对**太阳女神阿泽玛（Azeyma the Warden）**的虔诚崇拜；人数少、分散居住；部分被利姆萨·罗敏萨接纳，部分居于萨戈利沙漠 |
| Keepers of the Moon 护月之民 | **夜行性**；厌恶刺眼日光，享受夜幕；多数向**月神梅恩菲娜（Menphina the Lover）**献上虔诚；传统在黑衣森林狩猎，长期与格里达尼亚森林民冲突，被斥为盗猎者；近年与小部分格里达尼亚人和解，开始入城居住 |

**中文官方补充**【官方设定】（繁中官网）
- 猫魅族**男女比例严重失衡，女性占压倒性多数** —— 这是繁中官网明确写出的设定，与英文官网「雄性回避接触」互为呼应。

**身高范围**【官方-社区】（同一实测来源）

| 性别 | 最小 | 最大 | 默认 |
| --- | --- | --- | --- |
| ♂ | 159.2 | 173.2 | 166.2 |
| ♀ | 149.7 | 162.2 | 156.0 |

> 注：Miqo'te **部族之间无身高差**（`ミコッテの身長は部族間で差がない`）。实测者感叹「猫男比想象中矮，约等于中原之民女性身高」。

**命名规则**【官方-设定内证 + 社区整理】
- **逐日之民**的命名含**部族字母前缀 + 撇号**结构，例如 `Y'shtola`（Y 部族）、`G'raha Tia`（G 部族）、`M'naago`。字母代表所属的「部族（tribe）」，撇号后为个人名。
- **护月之民**常用 `<名> <母名>odh <父名>` 之类的结构，常见后缀 `-odh`。
- 官方 RAIDS/剧情中出现的名字：`Y'shtola Rhul`、`G'raha Tia`、`M'naago Rahz`、`Y'shtola` 之妹 `Y'mhitra`。
- ⚠️ **待核实**：完整的官方命名规则条文未能抓取（GamerEscape / Lodestone 官方文章均不可达），上述结构来自玩家社区与游戏内 NPC 名归纳。

**代表 NPC**

| NPC | 部族 | 身份 |
| --- | --- | --- |
| 雅·修特拉 Y'shtola Rhul | 逐日之民 ♀ | 晓之血盟 |
| 古·拉哈·提亚 G'raha Tia | 逐日之民 ♂ | 水晶塔守护者 / 晓之血盟 |
| 莉瑟 Lyse Hext | （Hyur Highlander，非 Miqo'te） | — |
| 姆娜阿戈 M'naago Rahz | 逐日之民 ♀ | 阿拉米格解放军 |
| 珂·瑞哈 K'rhid Tia | 逐日之民 ♂ | — 【待核实】 |
| 乌尔达哈的商人猫娘群像 | 逐日之民 | — |

---

### 2.5 鲁加族 Roegadyn（ルガディン / 魯加族）

| 项目 | 内容 |
| --- | --- |
| 英 / 日 / 繁中 / 大陆 | Roegadyn / ルガディン / 魯加族 / 鲁加族 |
| 部族 | Sea Wolves 北洋之民（ゼーヴォルフ）、Hellsguard 红焰之民（ローエンガルデ） |
| 加入版本 | 1.0 起 |
| 代表城邦 | 利姆萨·罗敏萨（北洋之民）、乌尔达哈（红焰之民作为佣兵） |
| 聚居地 | 北洋之民：利姆萨·罗敏萨；红焰之民：北阿巴拉提亚山脉（Abalathia's Spine） |

**官方设定（种族整体）**【官方设定】  
> “The Roegadyn are easily identified by their massive, muscular frames. They are descended from a maritime people that roamed the northern seas, though many of their ancestors turned their longships south to brave the crossing into Eorzean waters. Often considered a barbaric race, the fiercely competitive Roegadyn are also known for their compassion and unswerving loyalty. Many of the greatest warriors in history were born of Roegadyn stock.”  
> ——[na.finalfantasyxiv.com/a_realm_reborn/world/races/](https://na.finalfantasyxiv.com/a_realm_reborn/world/races/)

- **体型最大、肌肉最发达**；祖先为北方海域的航海民族，许多祖先驾长船南下进入艾欧泽亚水域。
- 常被视为「野蛮种族」，但**极重竞争、同时富有同情心与绝对忠诚**。
- 历史上最伟大的战士多出自鲁加族。

**部族差异**【官方设定】

| 部族 | 官方描述要点 |
| --- | --- |
| Sea Wolves 北洋之民 | 曾是令人生畏的**北海海盗**；现为利姆萨·罗敏萨主要种族之一，多做水手/船员；**名讳取自古代鲁加语（ancient Roegadyn language）** |
| Hellsguard 红焰之民 | 在阿巴拉提亚山脉北部安家的小部族；族规是**从事佣兵业**，因此给自己取**通用语构成的易记名字**；常见于乌尔达哈街头，做佣兵或保镖 |

**中文官方补充**【官方设定】（繁中官网）
- 北洋之民：700 年前建起海洋城邦利姆萨·罗敏萨；以「海狼」之名从北方海域侵袭而来。
- 红焰之民：因**信奉火山口就是炼狱之门**并建立集落，也被称为「火焰卫士」。

**身高范围**【官方-社区】（同一实测来源）

| 性别 | 最小 | 最大 | 默认 |
| --- | --- | --- | --- |
| ♂ | 213.5 | 230.4 | 222.0 |
| ♀ | 192.0 | 222.7 | 207.3 |

> 鲁加族男性最大身高 **230.4cm 是全种族最高**（实测笔记原文：`ルガディン♂圧倒的一位`）；其吐槽是「一般公寓天花板 240cm，鲁加男最大身高离天花板只剩 10cm，踮脚就撞头」。

**命名规则**【社区整理 + 设定内证】
- **北洋之民（Sea Wolves）**：名字是**古鲁加语（Roe language）词根拼合**，且通常能「翻译」成通用语。例如：
  - `Merlwyb Bloefhiswyn` = merl（海）+ wyb（女）…；姓氏结构常为 `<父名>wyn` / `<父名>syn`（wyn = 女，syn/thota = 男）。
  - `Sthalmann`、`Gwyr` 等。
  - 参考社区整理：[RPC Library · Roegadyn Language](https://wiki.ffxiv-roleplayers.com/index.php?title=Category:Roegadyn)、[GamerEscape · Roegadyn Naming Conventions](https://finalfantasy.fandom.com/wiki/Roegadyn_naming_conventions)（抓取受限）。
- **红焰之民（Hellsguard）**：刻意使用**通用语单词拼成的名字**（如 `Curious Gorge`、`Broken Mountain`、`Wheiskaet`），呼应「佣兵要让人记得住」的族规。
- ⚠️ 古鲁加语完整词典（约 100+ 词根）本次**未能抓取**到完整列表，建议后续从 RPC Library 的 `Category:Roegadyn` 逐页搬运。

**代表 NPC**

| NPC | 部族 | 身份 |
| --- | --- | --- |
| 梅尔维布·布罗埃夫希斯温 Merlwyb Bloefhiswyn | 北洋之民 ♀ | 利姆萨·罗敏萨提督 |
| 库尔赞 Curious Gorge | 红焰之民 ♂ | 战士职业任务 NPC |
| 西·尔·瓦尔 Syele | — | — |
| 巴·拉·哈 Baelsar | — | — |

---

### 2.6 敖龙族 Au Ra（アウラ / 敖龍族）

| 项目 | 内容 |
| --- | --- |
| 英 / 日 / 繁中 / 大陆 | Au Ra / アウラ / 敖龍族 / 敖龙族 |
| 部族 | Raen 晨曦之民（アウラ・レン）、Xaela 暮晖之民（アウラ・ゼラ） |
| **加入版本** | **3.0 Heavensward（苍天之龙骑士）** |
| 代表城邦 | 无（东方出身，多见于东方地域 / 黄金港 / 延夏） |
| 聚居地 | 来自东洲奥萨德次大陆（Othard）；Raen 多居于延夏，Xaela 在草原游牧 |

**官方设定（种族整体）**【官方设定】（繁中官网）
> 敖龍族來自東洲奧薩德次大陸。過去在艾奧傑亞很少見到他們的身影，不過因為東方發生戰亂的影響，有不少的敖龍族為了尋求安居之地而來到西方。

- 特征：**大角 + 灵活尾巴 + 鳞片**。
- 东西方之间因战乱而西迁，是「外来者」定位的种族。

**部族差异**【官方设定】（繁中官网）

| 部族 | 描述要点 |
| --- | --- |
| Raen 晨曦之民 | 继承创世神话中一族始祖「**晨曦之父**」的特征；祖先被视为异族而被其他种族忌讳，但**延夏豪族与晨曦之民定下盟约**，因此受各豪族重用 |
| Xaela 暮晖之民 | 继承始祖「**暮辉之母**」的特征；自古以来在草原**放牧与迁徙的游牧生活**；各部族间斗争从未间断，诸多部落不断诞生与消亡 |

**身高范围**【官方-社区】（同一实测来源）

| 性别 | 最小 | 最大 | 默认 |
| --- | --- | --- | --- |
| ♂ | 203.0 | 217.0 | 210.0 |
| ♀ | 146.0 | 158.5 | 152.2 |

> 📌 **Xaela / Raen 无身高差**，但 Au Ra **性别身高差是全种族最大的**（男 203–217 vs 女 146–158.5，最大差约 **71cm**）。实测笔记原文感叹：`男性との身長差がものすごい`。另注：**女性 Au Ra 最小 146.0cm 比女性 Miqo'te（149.7）更矮**。

**命名规则**【社区整理】
- **Raen**：受远东（延夏/黄金港）文化影响，名字偏日式/东方音节（如 `Yugiri`、`Hien` 属 Hyur/Raen 混合语境；`Mide` 等）。
- **Xaela**：名字是**草原部族名 + 个人名**结构，个人名常带强烈游牧/自然意象。游戏内 Xaela 常见「部族名 + 名」形式（如 `Magnai Oronir`，Oronir 为部族）。
- ⚠️ **待核实**：官方命名规则条文未取得一手来源。

**代表 NPC**

| NPC | 部族 | 身份 |
| --- | --- | --- |
| 夕雾 Yugiri Mistwalker | Raen ♀ | 海燕众 / 晓之血盟 |
| 玛格奈 Magnai Oronir | Xaela ♂ | 太阳神子嗣（Oronir 部族） |
| 萨杜 Sadu Dotharl | Xaela ♀ | Dotharl 部族首长 |
| 吉田 Cirina Mol | Xaela ♀ | Mol 部族 |
| 飞燕 Hien | （Hyur/Raen 混血语境） | 延夏少主 |
| 阿莉塞的老师「水琴」Mizuki | 【待核实】 | — |

---

### 2.7 维埃拉族 Viera（ヴィエラ / 維艾拉族）—— 5.0 Shadowbringers 加入

| 项目 | 内容 |
| --- | --- |
| 英 / 日 / 繁中 / 大陆 | Viera / ヴィエラ / 維艾拉族 / 维埃拉族（玩家俗称「兔女」「兔男」） |
| 部族 | Rava 密林之民（ラヴァ・ヴィエラ）、Veena 山林之民（ヴィナ・ヴィエラ） |
| **加入版本** | **5.0 Shadowbringers（漆黒的反叛者）** 加入**女性**维埃拉；**男性维埃拉于 6.0 Endwalker（暁月之终焉）** 开放 |
| 代表城邦 | 无（隐藏种族；剧情主要舞台为第一世界的拉凯提卡大森林 / 原初世界的葛尔摩大密林） |
| 聚居地 | Rava：葛尔摩大密林（Golmore Jungle）；Veena：斯卡提山脉（Skallic）南侧山腹 |

**官方设定（种族整体）**【官方设定】（繁中官网）
> 自古以來，他們就隱居在森林深處構築著自己的歷史，現如今依舊很少出現在其他種族的生活圈內。維艾拉族修長的身形與人族和精靈族非常相近，特徵則是那發達的大長耳朵。

- 长期隐居于森林深处，**极少出现在其他种族的生活圈**。
- 身形修长，接近 Hyur / Elezen；最显著特征是**发达的长耳**。

**部族差异**【官方设定】（繁中官网）

| 部族 | 描述要点 |
| --- | --- |
| **Rava 密林之民** | 褐色皮肤，能融入昏暗密林；将**葛尔摩大密林视为圣地**，自称森林守护者；对未经允许踏入森林者，**以长枪与弓箭相迎** |
| **Veena 山林之民** | 白色皮肤「如同飘雪点缀山林」；以**斯卡提山脉南侧山腹**为根据地；坚持古时延续下来的狩猎采集生活，断绝外界接触；也有人舍弃这种生活走出故乡前往艾欧泽亚 |

**身高范围**【官方-社区】（同一实测来源）

| 部族 | 最小 | 最大 | 默认 |
| --- | --- | --- | --- |
| Rava | 178.8 | 191.4 | 185.1 |
| Veena | 178.8 | 191.4 | **178.8** |

> 📌 **重要细节**：两部族**身高上下限完全相同（178.8–191.4）**，但**默认值不同** —— Rava 默认 185.1（中值），**Veena 默认 178.8（即最小值）**。实测笔记明确写：`ヴィエラは部族によって初期値に差が出る。全体の数値に違いはない`。

**命名规则**【社区整理 + 设定内证】
- Viera 名字带**北欧/芬兰语系**色彩（受 FFXII 维埃拉族传统影响），如 `Fran`（FFXII 经典 NPC）。
- FFXIV 剧情中的 Viera：`Cahciua`、`Qeshi`（待核实拼写）。
- ⚠️ **待核实**：官方命名规则条文未取得。

**代表 NPC**

| NPC | 部族 | 身份 |
| --- | --- | --- |
| 卡布奇亚 Cahciua | 【待核实】 | 7.0 Dawntrail 关键 NPC（图拉尔） |
| erscheinen（第一世界 Viera 村落） | Rava | — |
| 雷之战士 / 大森林守卫 | Rava | — |

> 📌 **7.x 相关性**：7.0 Dawntrail 舞台在**图拉尔大陆（Tural）**，其本地民族 **Xbr'aal 与硌狮族共享祖先**（官方明示），且 **Viera 与 Hrothgar 的祖先相关设定在 7.0 被强调**（见 2.8 节）。

---

### 2.8 硌狮族 Hrothgar（ロスガル / 硌獅族）—— 5.0 加入，7.0 开放雌性

| 项目 | 内容 |
| --- | --- |
| 英 / 日 / 繁中 / 大陆 | Hrothgar / ロスガル / 硌獅族 / 硌狮族（玩家俗称「狮子」「大猫」） |
| 部族 | Helions 掠日之民（ヘリオン）、The Lost 迷踪之民（ロスト） |
| **加入版本** | **5.0 Shadowbringers** 加入**男性**硌狮族；**雌性硌狮族于 7.0 Dawntrail 开放** |
| 代表城邦 | 无（来自伊尔萨巴德 Ilsabard） |
| 聚居地 | 伊尔萨巴德；7.0 追加设定：图拉尔本地民族 **Xbr'aal** 与硌狮族共享祖先，居于 **Yak T'el** |

**✅ 关键确认：雌性硌狮族（Female Hrothgar）**

【官方设定】来自 Dawntrail 官方特设站 Systems 页：
> “New Playable Race — **Female Hrothgar**. The Hrothgar people hail from Ilsabard. A Turali people with shared ancestry, the Xbr'aal, call Yak T'el home. Females number relatively few among the population, but are readily identified by their lithe, muscular forms. Equally distinctive is their predisposition for leadership.”

来源：[na.finalfantasyxiv.com/dawntrail/system/](https://na.finalfantasyxiv.com/dawntrail/system/)

并且官方明确写道：
> “Players can enjoy certain updates **without purchasing Dawntrail**, including: • **New playable race: female Hrothgar** • Major graphical update • System updates”

> 📌 **结论**：**7.0 没有新增第 9 个可玩种族**，只新增了「雌性硌狮族」这一**性别选项**，且该内容**不需要购买 Dawntrail 也能享用**（随 7.0 基础补丁实装）。

**官方设定（种族整体）**【官方设定】（繁中官网）
> 他們有著發達的肌肉和尖銳的爪子與鋒利的牙齒，因為這般長相，被其他種族視為野蠻人，導致與其他種族鬥爭不斷。直到通用語出現後，才更加了解對方。硌獅族男女比例非常極端，幾乎看不到女性。

**部族差异**【官方设定】（繁中官网）

| 部族 | 描述要点 |
| --- | --- |
| Helions 掠日之民 | 以**女性指导者**在世时以其为中心行动；一名女性领导者为中心、多数男性为之行动，「像是以太阳为中心环绕的彗星」，因此通用语称他们为「掠日之民」 |
| The Lost 迷踪之民 | 硌狮族的分支；**时而是体力劳动者，时而是助人的佣兵，有时甚至是旅行商人**，随时期改变职业，过着随性的自由生活，故被称作「迷踪之民」 |

**身高范围**【官方-社区】（同一实测来源）

| 部族 | 最小 | 最大 | 默认 |
| --- | --- | --- | --- |
| Helions | 196.2 | 212.9 | 204.6 |
| The Lost | 196.2 | 212.9 | **208.7** |

> 与 Viera 同样模式：**上下限相同，默认值不同**。实测笔记原文：`ロスガル、ヴィエラは部族によって初期値に差が出る。全体の数値に違いはない`。
>
> ⚠️ **注意**：该实测笔记初稿 2015-12-07、改订 2019-11-08，**采集时点雄性硌狮族刚实装（5.0）**，因此该数值表**仅代表雄性硌狮族**；雌性硌狮族（7.0）的身高区间**本次未能取得实测数据，标注【待核实】**。

**命名规则**【社区整理】
- Hrothgar 名字在 FFXIV 中常见**北欧/日耳曼色彩**，与 FFX 的 Ronso 族有血脉/设定上的呼应感（非官方明示）。
- 剧情 NPC：`Magnus`、`Runar`（Helions，5.0 剧情关键 NPC）。
- ⚠️ 官方命名规则条文未取得。

**代表 NPC**

| NPC | 部族 | 身份 |
| --- | --- | --- |
| 卢纳尔 Runar | Helions ♂ | 5.0 剧情 NPC（第一世界） |
| 7.0 图拉尔硌狮族相关角色 | — | **待核实**（7.x 新增角色，本次未能取得具体名单） |

---

### 2.9 7.0 是否新增可玩种族？—— 明确结论

| 问题 | 结论 | 来源 |
| --- | --- | --- |
| 7.0 Dawntrail 是否新增第 9 个可玩种族？ | **否**。7.0 唯一「New Playable Race」条目是 **Female Hrothgar**（性别解锁，非新种族） | [官方 Dawntrail Systems 页](https://na.finalfantasyxiv.com/dawntrail/system/) |
| 是否需要购买 Dawntrail 才能用雌性硌狮族？ | **不需要**（官方明示随基础更新提供） | 同上 |
| 7.1–7.5 是否又新增种族？ | **未发现**任何新增种族记录；7.5 新增的是**限定职业魔兽使 Beastmaster** | [官方 Job Guide](https://na.finalfantasyxiv.com/jobguide/beastmaster/)、[Dawntrail 7.5 页](https://na.finalfantasyxiv.com/dawntrail/patch_7_5/) |
| 8.0（Evercold）是否新增种族？ | **【待核实】** 本次调研未见官方公布新种族；7.5 Job Guide 仅提到「Evercold 将引入**新的战斗模式**」，未提种族 | [Job Guide · Patch 7.5 Adjustments Overview](https://na.finalfantasyxiv.com/jobguide/battle/) |

---

## 3. 「种族可选职业/属性差异」核实

### 3.1 任务书假设的纠正

> 任务书写：「历史：1.0/重生之境时期不同种族有初始属性差异……后续版本（具体哪个版本，如 2.0 还是 3.0/4.0）取消。」

**调研结论：这个假设需要修正 —— 种族属性差异从未被「取消」，它一直是「存在但无关紧要」的。**

【官方-社区】5.0 版实测（2019 年发布）显示，每个种族的属性**总点数完全相同**，只是**分配不同**：

> 「数値目安：最大が23、最小が17、中間が20。**合計値はどの種族も共通であり、配分が異なるだけ。**」  
> —— [Zora Brise「5.0版・種族値を調べてみた」](https://na.finalfantasyxiv.com/lodestone/character/8517384/blog/4168459/)

### 3.2 5.0 版「种族值」完整表（Lv.1 初始属性，仅 STR/DEX/VIT/INT/MND，无 PIE）

来源同上（Lodestone 玩家实测，被日本攻略站交叉引用一致）

| 种族 | 部族 | STR | DEX | VIT | INT | MND |
| --- | --- | --- | --- | --- | --- | --- |
| 人族 Hyur | 中原之民 Midlander | 22 | 19 | 20 | **23** | 19 |
| | 高地之民 Highlander | **23** | 20 | 22 | 18 | 20 |
| 精灵族 Elezen | 森林之民 Wildwood | 20 | **23** | 19 | 22 | 19 |
| | 黑影之民 Duskwight | 20 | 20 | 19 | **23** | 21 |
| 拉拉肥 Lalafell | 平原之民 Plainsfolk | 19 | **23** | 19 | 22 | 20 |
| | 沙丘之民 Dunesfolk | 19 | 21 | 18 | 22 | **23** |
| 猫魅族 Miqo'te | 日猫族 Seekers of the Sun | 22 | **23** | 20 | 19 | 19 |
| | 月猫族 Keepers of the Moon | 19 | 22 | 18 | 21 | **23** |
| 鲁加族 Roegadyn | 海之民 Sea Wolves | 22 | 19 | **23** | 18 | 21 |
| | 炎之民 Hellsguard | 20 | 18 | **23** | 20 | 22 |
| 敖龙族 Au Ra | 晨曦之民 Raen | 19 | 22 | 19 | 20 | **23** |
| | 暮晖之民 Xaela | **23** | 20 | 22 | 20 | 18 |
| 硌狮族 Hrothgar | 掠日之民 Helions | **23** | **17** | **23** | **17** | **23** |
| | 迷途之民 The Lost | **23** | **17** | **23** | **17** | **23** |
| 维埃拉 Viera | 密林之民 Rava | 20 | **23** | 18 | 21 | 21 |
| | 山林之民 Veena | 19 | 20 | 19 | **23** | 22 |

**关键观察**

1. **总和恒定**：每行 5 项之和都是 103（22+19+20+23+19=103 等），证实「配分而非总量」。
2. **硌狮族两部族完全相同**（唯一无部族差异的种族）。
3. **Hrothgar 极端化**：STR/VIT/MND 全 23（坦克+近战+治疗友好），DEX/INT 全 17（远程/法系最差），**波动幅度达 6**（其他种族最多 5）。
4. **任务书举例需要修正**：「鲁加族力量高、拉拉肥智力高」在 5.0 数据中 —— 鲁加 STR 22/20（不是最高 23），**拉拉肥 INT 22（Duskwight/Midlander/Veena 才是 23）**。任务书的例子来自 **1.0 时代**的数据（见 3.3），已不适用。

### 3.3 1.0 时代的旧数据（历史对照）

【社区整理】天幻网（FFSKY）1.0 专题站保留了第六项属性 **PIE（信仰）** 的数据，且数值体系与 2.0 后不同：

| 种族 | 部族 | STR | DEX | VIT | INT | MND | PIE |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 人族 | 中原之民 | 21 | 19 | 20 | 21 | 18 | 21 |
| | 高地之民 | **23** | 20 | 22 | 18 | 20 | 17 |
| 精灵族 | 森林之民 | 19 | **23** | 18 | 22 | 17 | 21 |
| | 黑影之民 | 20 | 20 | 19 | **23** | 20 | 18 |
| 拉拉肥 | 平原之民 | 18 | 22 | 18 | 21 | 20 | 21 |
| | 沙漠之民 | 17 | 20 | 17 | 21 | 22 | **23** |
| 猫魅族 | 逐日之民 | 21 | 22 | 20 | 18 | 19 | 20 |
| | 护月之民 | 18 | 21 | 17 | 19 | **23** | 22 |
| 鲁加族 | 北洋之民 | 22 | 18 | **23** | 17 | 21 | 19 |
| | 红焰之民 | 20 | 17 | 21 | 20 | 22 | 20 |

来源：[FFSKY 天幻网 · 种族介绍](http://ff14.ffsky.cn/Race.htm)、[FFSKY · 守护神](http://ff14.ffsky.cn/eudemon.htm)

> 1.0 时代确实存在 **PIE（信仰）** 属性，2.0 之后 PIE 被移除（只保留 STR/DEX/VIT/INT/MND 五项 + 后加的 TEN/PNH 等衍生项）。这就是任务书「1.0 有差异」印象的来源。

### 3.4 这些差异到底影响多大？——「从未取消，但无关紧要」

| 论点 | 来源 |
| --- | --- |
| 「**种族には、それぞれステータスの初期値が設定されているが、拘る必要はない。好きな種族で好きなジョブを選択しよう**」（种族有初始属性，但没必要在意，选喜欢的种族和职业就好） | [kamigame.jp · 種族一覧と種族ごとのステータス](https://kamigame.jp/ff14/page/247758737203321061.html)（社区整理，页面已停止更新） |
| 「**守護神を選んでもキャラクターのステータスに影響する事はありません**」（守护神选择完全不影响属性） | [game8.jp · 守護神一覧](https://game8.jp/ff14/462641)（社区整理） |
| 官方 Job Guide 与 Eorzea DB **不提供**任何种族属性表 → 属性差异不构成游戏机制的一部分 | [Eorzea Database](https://na.finalfantasyxiv.com/lodestone/playguide/db/) |
| 玩家实测：Lv.80 满级时种族属性差异在总属性中占比可忽略（装备/食物/药水完全淹没） | [Zora Brise 日记](https://na.finalfantasyxiv.com/lodestone/character/8517384/blog/4168459/) |

> ✅ **最终结论（可直接引用）**：
> 1. **FFXIV 从未在某个版本「取消」种族属性差异** —— 2.0 ARR 起种族初始属性就一直存在，只是**总量相同、仅分配不同**。
> 2. 1.0 时代存在第六属性 **PIE（信仰）**，2.0 移除；1.0 的数值分布也与 2.0 后不同（这是「1.0 有差异」记忆的来源）。
> 3. 由于 ①总量恒定 ②差异幅度仅 ±3（5.0 后 Hrothgar ±6）③装备/等级成长完全覆盖，**社区与攻略站的一致结论是「不必在意」**。
> 4. **不存在「种族可选职业差异」** —— 任何种族都可以转任何职业，游戏内无任何种族限职业机制。唯一例外是**芙兰（Fran）等特定 NPC**，不是玩家限制。
> 5. ⚠️ **未能取得官方一手声明**（如「种族属性不影响战斗」的官方 FAQ）。以上结论基于玩家实测 + 攻略站共识，标注为【官方-社区 + 社区整理】。

---

## 4. 角色创建要素（Character Creation）

### 4.1 选择流程概览

参考来源：[Bear Ironfist「Character Creation Guide」](http://na.finalfantasyxiv.com/lodestone/character/4417600/blog/2663779)（Lodestone 玩家指南，内容详尽且与实际创建界面一致）

创建角色的顺序与可选项：

| 阶段 | 可选项 |
| --- | --- |
| 1. 种族 / 性别 / 部族 | 8 种族 × 2 部族 × 性别（部分组合有历史限制，现已全部开放） |
| 2. 命名日 Nameday | 12 个月相（详见第 5 节）与日期 |
| 3. 守护神 Guardian Deity | 十二神（详见 4.5 节） |
| 4. 体型 | 身高 Height、胸围 Bust、肌肉量 Muscle |
| 5. 头部 | 脸型 Face、下颚 Jaw、眼型 Eye Shape、瞳色 Eye Color（支持**双色瞳**）、角膜环 Limbal Rings（**Au Ra 专属**）、眉毛 Eyebrows、鼻 Nose、嘴 Mouth、唇色 Lip Color |
| 6. 头发 | 发型 Hairstyle、主色 Hair Color、挑染 Highlight（双色调） |
| 7. 肤色 | 肤色 Skin Tone |
| 8. 面部彩绘 | 面部彩绘 Face Paint（社区也涵盖雀斑、粗眉、瘀伤、象征性纹样） |
| 9. 其他 | 尾巴 Tails / 耳朵 Ears（种族限定）、纹身/刺青 |
| 10. 职业与起始 | 初始职业 Class、初始城邦 |

### 4.2 身高 / 体型滑条

| 滑条 | 说明 | 来源 |
| --- | --- | --- |
| **身高 Height** | 每种族/部族/性别有独立上下限（见第 2 节各表）；滑条以 cm 为单位显示 | [Raw Arulaq 实测](https://eu.finalfantasyxiv.com/lodestone/character/6454882/blog/2668120/) |
| **胸围 Bust** | 玩家指南建议「**穿上装备后再调**」，因为不同装备的贴合方式不同；也建议把胸围当作表现角色年龄/健身程度的手段 | [Bear Ironfist](http://na.finalfantasyxiv.com/lodestone/character/4417600/blog/2663779) |
| **肌肉量 Muscle** | 影响体格健壮感；建议**脱掉装备**观察实际效果 | 同上 |
| 尾巴长度 / 耳朵 | Miqo'te、Au Ra 有尾巴调整；Elezen / Lalafell 有耳朵选项（耳朵长度可暗示年龄） | 同上（含评论区补充：「Elezen 和 Lalafell 有耳朵选项」） |

> ⚠️ **注意**：玩家指南发布于 2018 年，**7.0 图形更新（First Graphical Update）** 大幅提升了角色质感与材质表现，但**滑条结构未变**。来源：[Dawntrail Systems 页](https://na.finalfantasyxiv.com/dawntrail/system/)

### 4.3 脸型 / 头发 / 面部彩绘

- **脸型 Face**：每个脸型有独有的部件组合，玩家指南建议「**先把头发扎短露出整张脸**，专心调脸，最后再回头选发型」。
- **眼型 / 瞳色**：支持**双色瞳（heterochromia）**。
- **角膜环 Limbal Rings**：**Au Ra 专属**特征，可强化或弱化「你是敖龙族」的观感。
- **下颚 Jaw**：实际同时影响下巴、脸颊、颚线 —— 方颚+长下巴显强韧，窄颚显知性。
- **面部彩绘 Face Paint**：不只是化妆/战纹，社区用法包括**雀斑、粗眉、瘀伤、象征性纹样**；男性角色也能用眼部/颊部彩妆做眼窝加深或颧骨提亮。
- **发型与挑染**：主色 + Highlight 双色调；玩家指南提醒 SE 的部分发型对双色调支持不佳，非必要可忽略。

### 4.4 十二神 The Twelve —— 完整清单

**权威来源（设定文本转录）**：[RPC Library · Lore:The Twelve](https://wiki.ffxiv-roleplayers.com/index.php?title=Lore:The_Twelve)  
**中文名来源（天幻网，1.0 时代旧译）**：[FFSKY · 守护神](http://ff14.ffsky.cn/eudemon.htm)  
**繁中官方名**：本次调研**未取得十二神的繁中官方译名表**，标注【待核实】

| 月相 | 神名（英 / 日） | 中文（天幻旧译 / 常用） | 性别 | 司掌 | 元素 | 守护城邦 | 象征 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **星一月**（1st Astral Moon） | Halone, the Fury / ハルオーネ | 哈萝奈 / 哈罗妮 | 女神 | 战争（冰川） | 冰 | **伊修加德** | 三支长枪 |
| **灵一月**（1st Umbral Moon） | Menphina, the Lover / メネフィナ | 梅恩菲尼 / 梅恩菲尔德 | 女神 | 慈爱（双月） | 冰 | —（月猫族信奉） | 圆月 |
| **星二月**（2nd Astral Moon） | Thaliak, the Scholar / サリャク | 赛尔亚克 / 沙利亚克 | 男神 | 知识（河川） | 水 | **夏雷安（Sharlayan）** | 卷轴 |
| **灵二月**（2nd Umbral Moon） | Nymeia, the Spinner / ニメーヤ | 尼姆梅娅 / 尼美雅 | 女神 | 命运（行星） | 水 | —（裁衣匠信奉） | 纺车 |
| **星三月**（3rd Astral Moon） | Llymlaen, the Navigator / リムレーン | 莉姆蕾恩 / 莉姆莱恩 | 女神 | 航海（海洋） | 风 | **利姆萨·罗敏萨** | 波浪 |
| **灵三月**（3rd Umbral Moon） | Oschon, the Wanderer / オシュオン | 欧尚 / 奥修昂 | 男神 | 流浪（山岳） | 风 | —（采矿工信奉） | 行山杖 |
| **星四月**（4th Astral Moon） | Byregot, the Builder / ビエルゴ | 毕尔格 / 拜尔丹 | 男神 | 工艺（建筑） | 雷 | — | 手掌 |
| **灵四月**（4th Umbral Moon） | **Rhalgr, the Destroyer** / ラールガー | 瑞瓦伽 / **拉尔戈** | 男神 | 破坏（彗星） | 雷 | **阿拉米格** | 流星 |
| **星五月**（5th Astral Moon） | Azeyma, the Warden / アーゼマ | 阿泽玛 | 女神 | 真理（太阳） | 火 | —（日猫族信奉） | 太阳 |
| **灵五月**（5th Umbral Moon） | Nald'thal, the Trader / ナルザル | 奈德·赛欧 / 纳尔达 | 男神 | 商业（地底） | 火 | **乌尔达哈** | 贝币 |
| **星六月**（6th Astral Moon） | Nophica, the Matron / ノフィカ | 诺菲卡 / 尼克斯 | 女神 | 丰收（大地） | 土 | **格里达尼亚** | 新绿 |
| **灵六月**（6th Umbral Moon） | Althyk, the Keeper / アルジク | 奥赛克 / 阿尔西克 | 男神 | 时间（重力） | 土 | —（吟游诗人信奉） | 沙漏 |

> ✅ **对任务书十二神清单的修正**：任务书列的 12 个名字里**缺少拉尔戈（Rhalgr, the Destroyer）**，且误把「尼克斯 Nophica」当作独立项（Nophica 即诺菲卡，是**女神**）。正确清单以上表 12 项为准。

**十二神的关系网**【社区整理】（RPC Library 整理，2016 年）
- Nald'thal 与 Oschon 是兄弟；Oschon 与 Halone 是密友、Menphina 的恋人。
- Menphina 与 Azeyma 是姐妹（同父 Althyk）；Azeyma 是 Llymlaen 与 Nophica 的母亲。
- Thaliak 是 Llymlaen 与 Nophica 的父亲，也是 Byregot 的老师，与 Azeyma 相恋。
- Rhalgr 是 Nymeia 的侍从，是 Byregot 与 Halone 的父亲。
- Althyk 是 Nymeia 的兄长。

### 4.5 守护神是否影响属性？

| 结论 | 来源 |
| --- | --- |
| **完全不影响属性、也不影响生产/采集** | [game8.jp · 守護神一覧](https://game8.jp/ff14/462641)：`どの守護神を選んでもキャラクターのステータスに影響する事はありません。生産職である「クラフター」や「ギャザラー」要素に影響する事も一切ありません。` |

> ⚠️ 这是社区整理（日本最大级攻略站之一），**未取得官方一手声明**。但多语言社区多年一致。

### 4.6 守护神星座（Guardian Deity）/ 命名日的实际游戏效果

- **命名日 Nameday** 与 **守护神 Guardian Deity** 在 2.0 之后**不影响任何战斗数值**。
- 它们主要用于：① 角色设定/RP ② Lodestone 角色档案显示 ③ 部分季节活动/占卜类玩法的文案参考。
- 因此可以**纯粹按角色设定选定**。

### 4.7 Myths of the Realm（6.x 神话任务）揭示的真相 ★

**任务系列结构**【官方设定】

| 版本 | 副本 | 官方描述 |
| --- | --- | --- |
| 6.1 | **Aglaia**（Myths of the Realm, Part 1） | 十二神的居所「Omphalos」相关 |
| 6.3 | **Euphrosyne**（Part 2） | 「The Twelve, Eorzea's guardian deities, seek to fulfill their enigmatic aspirations, and for this they claim they must engage in battle with men.」 |
| 6.5 | **Thaleia**（Part 3） | 「**It was out of their undying love for mankind that the Twelve constructed the monument at the heart of the Omphalos, that they might never lose sight of their purpose.** To answer that love, you must sally forth into their sanctum one last time to grant them their heart's desire...」 |

来源：[官方 Patch 6.3「Gods Revel, Lands Tremble」特设页](https://na.finalfantasyxiv.com/endwalker/patch_6_3/)、[官方 Patch 6.5「Growing Light」特设页](https://eu.finalfantasyxiv.com/endwalker/patch_6_5/)、[Eorzea DB · Chronicles of a New Era - Myths of the Realm](https://na.finalfantasyxiv.com/lodestone/playguide/db/quest/?category2=2&category3=29)

**真相要点（综合官方文案 + 剧情）**

1. **十二神是「因信仰而存在」的存在**：他们并非创世之初就存在的绝对神，其存在与凡人的信仰、以及对凡人的爱直接绑定。官方 6.5 文案写明他们建造 Omphalos 中央纪念碑的动机是「**出于对人类不朽的爱，以免忘记自己的目的**」。
2. **他们主动要求「与人类一战」，并最终要求人类抹去自己的存在**：6.3 文案「they claim they must engage in battle with men」、6.5 文案「grant them their heart's desire」指向同一走向 —— 在 Thaleia 结局中，**十二神请求光之战士与他们战斗，并将信仰/存在本身交还给人类**，随后从艾欧泽亚的「实体存在」中退场，只以**信仰之名**留在人们心中。
3. **与海德林派（Venat 一派）的约定**：十二神与古代人/hydaelyn 派的关系是「**尽量不干涉新人类**」。若他们过多介入，就与佐迪亚克派（把世界统一、回到理想乡）无异，会剥夺新人类通过「潜能量（Dynamis）」自己解决问题的机会。
4. **因此十二神退场的意义**：现代人已在终末之战中证明自己能超越古代人，十二神继续「占着神的位置」就失去了正当性，退场是「把未来交还人类」这一主题的收束。

> ⚠️ **来源分级说明**：
> - 第 1、2 点的**官方文案直接证据**来自 6.5 Patch 页与 Eorzea DB 任务描述（已引用）。
> - 第 3、4 点属于**玩家社区的剧情解读**（例：[Lodestone 玩家日记「エオルゼア12神について」](https://jp.finalfantasyxiv.com/lodestone/character/43667250/blog/5420966/)，作者本人声明「私個人の推測なので、公式見解ではありません」）。
> - **Fandom / BreezeWiki 的 The Twelve 条目未能抓取**（fetch failed），因此无法核对逐条剧情细节。**建议后续在有浏览器环境下补齐「Thaleia 结局台词原文」与「十二神真实身份（是否为 Venat 一派成员/Azem 相关）」的一手来源。**

### 4.8 与 Twelve 相关的创作要点（供 idle 内容使用）

- 十二神**每月对应一位**，命名日的「月相」天然绑定一位神 → 这是角色设定最强的一条线索。
- 三大城邦各有专属守护神：**伊修加德=哈罗妮、利姆萨·罗敏萨=莉姆莱恩、乌尔达哈=纳尔达、格里达尼亚=诺菲卡**；阿拉米格=拉尔戈、夏雷安=沙利亚克。
- **月猫族→梅恩菲娜、日猫族→阿泽玛**，这是官方在种族介绍页直接写明的对应关系。

---

## 5. 命名日 Nameday 与艾欧泽亚历法（Eorzean Calendar）

### 5.1 历法结构（一手设定文本）

**权威来源**：《艾欧泽亚五纪年表》（The Five Ages - An Eorzean Chronology），作者设定为**夏雷安神学与星象学大师 Lewphon**，成书于**第六星历 233 年**。全文转录于 [RPC Library](https://wiki.ffxiv-roleplayers.com/index.php?title=Lore:The_Five_Ages_-_An_Eorzean_Chronology)

| 单位 | 定义（原文） | 换算 |
| --- | --- | --- |
| **时 Bell** | — | 基本单位 |
| **日 Sun** | 「four cycles of the six elemental hours」（六元素小时的四轮） | **1 Sun = 24 Bells** |
| **月 Moon** | 「four cycles of eight Suns」 | **1 Moon = 32 Suns** |
| **年 Year** | 「the Year can be said to be the length of twelve Moons」 | **1 Year = 12 Moons = 384 Suns** |

> ✅ **任务书疑问核实**：**「每月 32 天」正确**。1 Moon = 32 Suns（`the sum of thirty and two`）。
> 原文：「The life of a single Moon spans four cycles of eight Suns, and is thus the sum of thirty and two. The eight deriveth from the elements of six, Ice, Water, Wind, Lightning, Fire, and Earth, and the polarities of two, Astral and Umbral.」

**六元素 × 两极性 = 12 个月相**

原文：「The Year is made when the Moon goeth round the two Astral and Umbral poles, fluctuating between the six elements, and that in turn.」

| 序 | 月相 | 元素 | 对应神 |
| --- | --- | --- | --- |
| 1 | 1st Astral Moon 星一月 | 冰 Ice | Halone |
| 2 | 1st Umbral Moon 灵一月 | 冰 Ice | Menphina |
| 3 | 2nd Astral Moon 星二月 | 水 Water | Thaliak |
| 4 | 2nd Umbral Moon 灵二月 | 水 Water | Nymeia |
| 5 | 3rd Astral Moon 星三月 | 风 Wind | Llymlaen |
| 6 | 3rd Umbral Moon 灵三月 | 风 Wind | Oschon |
| 7 | 4th Astral Moon 星四月 | 雷 Lightning | Byregot |
| 8 | 4th Umbral Moon 灵四月 | 雷 Lightning | Rhalgr |
| 9 | 5th Astral Moon 星五月 | 火 Fire | Azeyma |
| 10 | 5th Umbral Moon 灵五月 | 火 Fire | Nald'thal |
| 11 | 6th Astral Moon 星六月 | 土 Earth | Nophica |
| 12 | 6th Umbral Moon 灵六月 | 土 Earth | Althyk |

**元素的叙事含义（原文）**
- 冰（1–2 月）：万物冻结，生命气息几近沉寂。
- 水（3–4 月）：融冰之水，再次滋润生命之渴。
- 风（5–6 月）：风吹过水面，把天赐恩泽带到远近。
- 雷（7–8 月）：天怒，以神威雷霆下击以试炼人的信仰。
- 火（9–10 月）：雷转为火，以火焰之色灼烧生长中的生命，把花叶染成绯红。
- 土（11–12 月）：大地吞没一切 —— 「我们出自尘土，也终归于尘土」。

### 5.2 换算为现实公历（社区通行映射）

【社区整理】常用近似映射：**1st Astral Moon ≈ 1 月**，依次类推（星一月=1月、灵一月=2月、星二月=3月……灵六月=12 月）。

来源：[RPC 论坛 · RP Noob - Nameday Question](https://ffxiv-roleplayers.com/topic/21390-rp-noob-nameday-question/)
> “there are six moons with an astral and an umbral. Since there's an astral and umbral of each moon, that makes for the 12 months on our calendar. We start at the first moon at first astral, which is January, then first umbral which is February, then second astral which is March, and second umbral which is April and so on.”

**关键换算基准（Calmity / 第七灵灾）**
> “The IRL date the 1.0 servers shut down (the Calamity) was 11th of November, or the **‘12th Sun of the Sixth Astral Moon’** translating that to the Eorzean calendar.”  
> —— 同帖（Sounsyy）  
> **[社区整理]** 因此，**2012-11-11 = 第六星六月（星六月）第 12 日**，可作历法锚点。（注意：1.0 服务器关闭日期按官方为 2012 年 11 月 11 日前后，此处以社区记录为准。）

> ⚠️ 官方论坛原帖链接（`forum.square-enix.com/ffxiv/threads/182513`）在本次调研中**无法抓取**（fetch failed），因此该换算表标注为【社区整理】。

### 5.3 命名日在角色创建中的填写方式

- 格式为「**第 N Sun of the Xth (Astral/Umbral) Moon**」，例如 `21st Sun of the 1st Umbral Moon`（= 社区换算的 2 月 21 日 ≈ 公历 2 月 19 日，按该帖的算法）。
- 官方**不提供**命名日与现实日期的换算工具；游戏内只显示月相与日序。
- 社区提供多种「FFXIV 生日计算器」（例：[west-games.com 生日计算器](https://west-games.com/final-fantasy-14-birthday-calculator/)），均属【社区整理】。

---

## 6. 初始职业与起始城邦

### 6.1 2.0 三大城邦 × 初始职业对应（核实结果）

| 城邦 | 初始职业（Class） | 英文 | 日文 | 角色定位 | 后续 Job |
| --- | --- | --- | --- | --- | --- |
| **格里达尼亚 Gridania** | 弓术士 | Archer | 弓術士 | 远程物理 DPS | 吟游诗人 Bard |
| | **幻术士** | Conjurer | 幻術士 | 治疗 | 白魔道士 White Mage |
| | **枪术士** | Lancer | 槍術士 | 近战 DPS | 龙骑士 Dragoon |
| **乌尔达哈 Ul'dah** | 剑术士 | Gladiator | 剣術士 | 坦克 | 骑士 Paladin |
| | **咒术士** | Thaumaturge | 呪術士 | 远程魔法 DPS | 黑魔道士 Black Mage |
| | **格斗家** | Pugilist | 格闘士 | 近战 DPS | 武僧 Monk |
| **利姆萨·罗敏萨 Limsa Lominsa** | 斧术士 | Marauder | 斧術士 | 坦克 | 战士 Warrior |
| | **秘术士** | Arcanist | 巴術士 | 治疗/DPS（分支） | 学者 Scholar / 召唤士 Summoner |
| | **双剑士** | Rogue | 双剣士 | 近战 DPS | 忍者 Ninja |

> ✅ **对任务书假设的核实与修正**：
> - 任务书写「格里达尼亚=弓术士/幻术士/**枪术士**」→ **正确**（Lancer 枪术士）。
> - 任务书写「乌尔达哈=剑术士/咒术士/格斗家」→ **正确**。
> - 任务书写「利姆萨·罗敏萨=斧术士/秘术士/**枪术师**」→ ❌ **错误**。利姆萨·罗敏萨的第三个初始职业是 **双剑士 Rogue（双剣士）**，不是「枪术师」。「枪术士 Lancer」在格里达尼亚。
> - **Rogue（双剑士）为 2.0 后期（Patch 2.4，2014-10）追加**，是唯一非 1.0 就存在的初始 Class；其 Job 为**忍者 Ninja**。来源：[Eorzea DB · Class & Job Quests · Rogue/Ninja](https://na.finalfantasyxiv.com/lodestone/playguide/db/quest/?category2=6&category3=86)

### 6.2 全部战斗职业 Class → Job 一览

来源：[官方 Job Guide · Battle](https://na.finalfantasyxiv.com/jobguide/battle/)（Updated for 7.5）

| 角色分类 | Job 列表（官方 Job Guide 分组） |
| --- | --- |
| **Tank 坦克** | Paladin / Warrior / Dark Knight / Gunbreaker |
| **Healer 治疗** | White Mage / Scholar / Astrologian / Sage |
| **Melee DPS 近战** | Monk / Dragoon / Ninja / Samurai / Reaper / Viper / **Beastmaster（Limited Job）** |
| **Physical Ranged DPS 远程物理** | Bard / Machinist / Dancer |
| **Magical Ranged DPS 远程魔法** | Black Mage / Summoner / Red Mage / Pictomancer / **Blue Mage（Limited Job）** |

> 📌 **官方 7.5 Job Guide 的分组印证任务书的职业分类**：坦克 / 治疗 / 近战DPS / 远程物理DPS / 远程魔法DPS —— **注意官方把所有 DPS 统一放在 "DPS" 大类下再分子类**，没有独立的「魔法导师」顶层分类。

### 6.3 后续资料片新增职业与起始等级

| Job | 中文 | 资料片 | 起始解锁等级 | 来源/备注 |
| --- | --- | --- | --- | --- |
| Rogue → Ninja | 双剑士 → 忍者 | 2.4（2.x） | Rogue 1 / Ninja 30 | 唯一 2.x 追加的初始 Class |
| **Dark Knight** | 暗黑骑士 | **3.0 Heavensward** | 30（需主线到伊修加德） | 【待核实-精确等级】 |
| **Astrologian** | 占星术士 | **3.0 Heavensward** | 30 | 【待核实-精确等级】 |
| **Machinist** | 机工士 | **3.0 Heavensward** | 30 | 【待核实-精确等级】 |
| **Red Mage** | 赤魔道士 | **4.0 Stormblood** | 50 | 【待核实】 |
| **Samurai** | 武士 | **4.0 Stormblood** | 50 | 【待核实】 |
| **Gunbreaker** | 绝枪战士（枪刃） | **5.0 Shadowbringers** | **60** | [Patch 5.0 Notes](https://eu.finalfantasyxiv.com/lodestone/topics/detail/26098a6854d60f4f05dd5ea152c4e85e8447a999)、[FFXIV Guild · GNB Guide](https://ffxivguild.com/ffxiv-gunbreaker-gnb-guide-faqs-basics/)（社区） |
| **Dancer** | 舞者 | **5.0 Shadowbringers** | **60** | [Patch 5.0 Notes](https://eu.finalfantasyxiv.com/lodestone/topics/detail/26098a6854d60f4f05dd5ea152c4e85e8447a999) |
| **Sage** | 贤者 | **6.0 Endwalker** | **70** | 【待核实-精确等级】 |
| **Reaper** | 钐镰客（死神） | **6.0 Endwalker** | **70** | 【待核实-精确等级】 |
| **Viper** | 蝰蛇剑士（双剑） | **7.0 Dawntrail** | **80** | [Dawntrail Jobs 页](https://na.finalfantasyxiv.com/dawntrail/job/) |
| **Pictomancer** | 绘灵法师 | **7.0 Dawntrail** | **80** | 同上 |
| **Blue Mage** | 青魔法师 | 4.5（4.x，2019-01） | **1**（限定职业，独立成长） | [官方 Job Guide · Blue Mage](https://na.finalfantasyxiv.com/jobguide/bluemage/) |
| **Beastmaster** | 驯兽师（魔兽使） | **7.5（7.x）** | **1**（限定职业，Lv 上限 50） | [官方 Job Guide · Beastmaster](https://na.finalfantasyxiv.com/jobguide/beastmaster/) |

> ⚠️ **待核实项**：3.0 / 4.0 / 6.0 新职业的**精确起始解锁等级**本次未取得官方一手页面（Job Guide 只讲 action，不讲解锁等级；Patch Notes 页未能逐条抓取）。以上为社区共识，仅供参考。5.0（60）与 7.0（80）两代「资料片起始等级 = 上一资料片等级上限」的规律成立，因此 6.0 新职业 70 / 7.0 新职业 80 可信度高。

### 6.4 青魔法师 Blue Mage 的「限定职业（Limited Job）」特殊性 ★

**唯一权威来源**：[官方 Job Guide · Blue Mage](https://na.finalfantasyxiv.com/jobguide/bluemage/)

| 特殊性 | 官方原文要点 |
| --- | --- |
| **独立成长** | 「Blue mage functions **independently of other classes and jobs**, starting at **level 1** with a maximum level of **80**.」 |
| **不可排随机任务** | Duty Roulettes 不可用 |
| **不可进入特定内容** | 禁地优雷卡 / 博兹雅战线 / **Occult Crescent** / 变异&异闻迷宫 / 绝境战（Ultimate Raids）；**进入副本后不能切换成青魔法师** |
| **不可小队任务 / 死者宫殿 / PvP / 木人讨伐 / 初心者馆** | Squadron Missions、Deep Dungeons、PvP（含决斗；但可进入狼狱停船场）、Stone Sky Sea、Hall of the Novice 均不可 |
| **经验获取差异** | 野外打怪经验高于其他职业；但 **FATE 与理符（guildleve）不享受加成** |
| **可接任务受限** | 只能接青魔职业任务 + 全职业通用任务 |
| **雇员（Retainer）不能设为青魔** | 「Retainers cannot be assigned the blue mage job.」 |
| **技能学习机制** | 不靠升级获得技能，而是**目睹敌人使用特殊攻击并击败它**后有几率学会；职业等级不影响学习时机 |
| **主动技能上限** | 最多 **24 个 active actions**；可保存 **5 套 active set** |
| **专属内容** | **Masked Carnivale（假面狂欢节）**，共 **32 关**；另有 Blue Mage Log（需 Lv60 解锁） |
| **解锁条件** | 战/魔法职业 Lv50 + 完成主线「The Ultimate Weapon」+ 利姆萨·罗敏萨下层甲板 (X:9.9 Y:11.0) 找 Zealous Yellowjacket 接「Out of the Blue」 |

> 📌 **7.5 新增：魔兽使 Beastmaster 是第二个限定职业**
> - 官方描述：「Like blue mage, **beastmaster is a limited job**.」
> - 起始 Lv1，**上限 Lv50**（不同于青魔的 80）。
> - **不能使用职能动作（role actions）**。
> - 经验加成方向不同：**FATE 经验更高**（青魔是野外打怪更高）。
> - 独占内容：**Crucible of the Unbroken（闘獣練）**、Master's Bestiary（魔兽图鉴）、Kornago gourds。
> - 初始解锁：战/魔法职业 Lv50 + 主线「The Ultimate Weapon」+ 新格里达尼亚 (X:11.8 Y:13.6)。
> - 来源：[官方 Job Guide · Beastmaster](https://na.finalfantasyxiv.com/jobguide/beastmaster/)

### 6.5 大地使者与能工巧匠（8 个生产职业核实）

**8 个能工巧匠（Disciple of the Hand）**【官方设定】  
来源：[Eorzea DB · Class & Job Quests · Disciple of the Hand](https://na.finalfantasyxiv.com/lodestone/playguide/db/quest/?category2=6&category3=88)、[官方 Crafting Log 分类](https://na.finalfantasyxiv.com/lodestone/playguide/db/)（Crafting Log 八个分类逐一对应）

| # | 英文 | 中文 | 日文 |
| --- | --- | --- | --- |
| 1 | Carpenter | 木工师 | 木工師 |
| 2 | Blacksmith | 锻冶师 | 鍛冶師 |
| 3 | **Armorer** | **甲胄师** | 甲冑師 |
| 4 | Goldsmith | 雕金师 | 彫金師 |
| 5 | Leatherworker | 制革师 | 革細工師 |
| 6 | Weaver | 裁衣师 | 裁縫師 |
| 7 | Alchemist | 炼金术士 | 錬金術師 |
| 8 | Culinarian | 烹调师 | 調理師 |

> ✅ **核实**：8 个生产职业**确认无误**，任务书猜测的「甲胄」确实是 **Armorer（甲胄师）**。

**3 个大地使者（Disciple of the Land）**【官方设定】  
来源：[Eorzea DB · Disciple of the Land Quests](https://na.finalfantasyxiv.com/lodestone/playguide/db/quest/?category2=6&category3=89)、[Gathering Log 分类](https://na.finalfantasyxiv.com/lodestone/playguide/db/)（Mining / Quarrying / Logging / Harvesting 四小类归属三职业）

| 英文 | 中文 | 日文 | Gathering Log 小类 |
| --- | --- | --- | --- |
| Miner | 采矿师 | 採掘師 | Mining / Quarrying |
| Botanist | 园艺师 | 園芸師 | Logging / Harvesting |
| Fisher | 渔师 | 漁師 | （独立，不在上面四类里） |

> ⚠️ **注意**：任务书写「大地使者（采矿/采伐/园艺）」—— 官方分类是 **Miner 采矿师 / Botanist 园艺师 / Fisher 渔师** 三个职业；「采伐（Logging）」和「采掘（Quarrying）」是**Gathering Log 的采集小类**，不是职业名。任务书在这里把**职业名**和**采集物类别**混在一起了。

---

## 7. 种族在剧情 / NPC 中的比例，以及 7.x 新增种族相关角色

### 7.1 种族人口与叙事地位【官方设定 + 社区整理】

| 种族 | 艾欧泽亚人口地位 | 官方依据 |
| --- | --- | --- |
| **Hyur** | **最多**（「the most populous of the civilized races in Eorzea」） | [官方种族页](https://na.finalfantasyxiv.com/a_realm_reborn/world/races/) |
| **Midlander Hyur** | 占 Hyur 总人口**过半** | 同上 |
| Elezen | 曾独占艾欧泽亚，现为伊修加德/格里达尼亚主体之一 | 同上 |
| Lalafell | 与所有种族关系融洽；Dunesfolk 是乌尔达哈建国者 | 同上 |
| Miqo'te | 「presence in Eorzea is lesser than that of the other races」，人数少、分散 | 同上 |
| Roegadyn | 利姆萨·罗敏萨主要种族之一 | 同上 |
| Au Ra | 3.0 才从东洲西迁而来，艾欧泽亚数量少 | [繁中官网](https://www.ffxiv.com.tw/web/intro/races/) |
| Viera | 「自古隱居森林深處」，「現如今依舊很少出現在其他種族的生活圈內」 | 同上 |
| Hrothgar | 来自伊尔萨巴德；「男女比例非常極端，幾乎看不到女性」 | 同上 |

**叙事层面的观察**【社区整理】
- **晓之血盟（Scions of the Seventh Dawn）的种族构成极度平均**：每个种族几乎都有代表（Hyur、Elezen、Lalafell、Miqo'te、Au Ra、Roegadyn 皆有），这被社区视为「刻意平衡」。
- **硌狮族与维埃拉族在主线中的存在感长期偏低**（5.0 加入但主线 NPC 稀少），7.0 Dawntrail 才明显增加曝光（雌性硌狮族实装 + 图拉尔民族 Xbr'aal 与硌狮族共享祖先的设定）。

### 7.2 7.x（Dawntrail / 黄金的遗产）新增种族相关角色

**已确认的官方设定线索**

| 线索 | 官方原文 |
| --- | --- |
| 图拉尔本地民族 **Xbr'aal** 与硌狮族共享祖先 | 「A Turali people with shared ancestry, the Xbr'aal, call **Yak T'el** home.」——[Dawntrail Systems](https://na.finalfantasyxiv.com/dawntrail/system/) |
| 雌性硌狮族的族群特征 | 「Females number relatively few among the population, but are readily identified by their **lithe, muscular forms**. Equally distinctive is their **predisposition for leadership**.」——同上 |
| 7.0 剧情核心角色 Wuk Lamat 为**硌狮族**（雌性） | 社区资料指向 Wuk Lamat 是 Dawntrail 王位继承战的核心角色，性别为雌性 —— 【社区整理】，本次未能抓取官方角色介绍页 |

> ⚠️ **待核实清单（7.x 种族相关角色）**：本次调研**未能取得**一份可靠的「7.0–7.5 新增硌狮族/维埃拉族 NPC 清单」。建议后续从以下通道补齐：
> 1. [Eorzea DB · Main Scenario (Dawntrail)](https://na.finalfantasyxiv.com/lodestone/playguide/db/quest/?category2=1) 的任务描述（官方，可抓取）
> 2. [Dawntrail Story 页](https://na.finalfantasyxiv.com/dawntrail/story/) 与 [World 页](https://na.finalfantasyxiv.com/dawntrail/world/)
> 3. 官方 Lodestone 的 Patch 7.1–7.5 特设页（`/dawntrail/patch_7_1/` … `/dawntrail/patch_7_5/`）

### 7.3 任务书要求「7.x 新增种族相关角色」的可执行替代

由于一手角色清单缺失，以下为**已知且可交叉验证的 7.x 种族相关事实**：

1. **7.0 实装雌性硌狮族**（官方明示，且免购买 Dawntrail 即可用）。
2. **7.0 首度明确「硌狮族 ↔ Xbr'aal」的血脉关联**，把硌狮族的舞台从伊尔萨巴德扩展到图拉尔大陆。
3. **7.5 实装第二个限定职业「魔兽使 Beastmaster」**，其职业任务起点在**新格里达尼亚**（无种族指向，但职业剧情涉及「Kornago」这一崇拜兽类羁绊的传统）。
4. **8.0（Evercold）** 已在 2026 Fan Festival 公布，官方仅提到「将引入新的战斗模式」，**未提新种族**。

---

## 8. 关键结论速查（可直接引用）

| # | 结论 | 置信度 |
| --- | --- | --- |
| 1 | 可玩种族共 8 个 × 2 部族 = 16 部族；7.0 **未新增种族**，只开放**雌性硌狮族** | 【官方设定】 |
| 2 | 维埃拉中文名常被记反：**Rava = 密林之民（褐肤）**，**Veena = 山林之民（白肤）** | 【官方设定】繁中官网 |
| 3 | **只有 Hyur 有部族间身高差**；Lalafell 无性别/部族差；Viera 与 Hrothgar「上下限相同但默认值不同」 | 【官方-社区】Lodestone 实测 |
| 4 | 鲁加族男性最大身高 **230.4cm** 是全种族最高；Lalafell 最大 **97cm** 最矮；Au Ra 男女身高差最大（≈71cm） | 【官方-社区】 |
| 5 | **种族属性差异从未被取消**，一直「总量相同、分配不同」（±3，Hrothgar ±6），2.0 起即如此；1.0 时代多一项 **PIE（信仰）** | 【官方-社区】5.0 实测 + 【社区整理】1.0 旧站 |
| 6 | **守护神选择完全不影响任何属性**，纯设定用 | 【社区整理】game8 |
| 7 | 艾欧泽亚历法：**1 Sun = 24 Bells，1 Moon = 32 Suns，1 Year = 12 Moons**（六元素 × 星/灵两极性） | 【官方设定】《五纪年表》原文 |
| 8 | 十二神正确清单 **12 位**，任务书漏了 **拉尔戈 Rhalgr（破坏神，阿拉米格守护神）**；「尼克斯」应为**诺菲卡 Nophica（女神）** | 【官方设定】RPC Library 转录 |
| 9 | 利姆萨·罗敏萨第三个初始职业是 **双剑士 Rogue（双剣士）**，不是「枪术师」；枪术士在格里达尼亚 | 【官方设定】Eorzea DB |
| 10 | 生产职业 **8 个** 确认（含 **甲胄师 Armorer**）；大地使者是 **采矿师/园艺师/渔师 3 个**，「采伐/采掘」是采集物类别不是职业 | 【官方设定】Eorzea DB |
| 11 | **青魔法师 = 限定职业**：Lv1 起、上限 80、不可排随机、野外经验加成、24 主动技能、Masked Carnivale 32 关 | 【官方设定】Job Guide |
| 12 | **7.5 新增第二个限定职业 魔兽使 Beastmaster**：Lv1 起、上限 50、FATE 经验加成、不可用职能动作 | 【官方设定】Job Guide |
| 13 | 6.x「Myths of the Realm」三部曲（Aglaia 6.1 / Euphrosyne 6.3 / Thaleia 6.5）揭示十二神**出于对人类的爱**而存在，并最终**请求人类抹去自身、只留信仰之名** | 【官方设定】Patch 6.3/6.5 特设页 + 【社区整理】剧情解读 |

---

## 9. 来源总表

### 9.1 官方来源（finalfantasyxiv.com 系）

| 内容 | URL |
| --- | --- |
| ARR 种族页（Hyur/Elezen/Lalafell/Miqo'te/Roegadyn 五族 + 十部族） | https://na.finalfantasyxiv.com/a_realm_reborn/world/races/ |
| Dawntrail 特设站首页 | https://na.finalfantasyxiv.com/dawntrail/ |
| Dawntrail Systems（**雌性硌狮族实装**） | https://na.finalfantasyxiv.com/dawntrail/system/ |
| Endwalker Patch 6.3 特设页（Myths of the Realm Part 2） | https://na.finalfantasyxiv.com/endwalker/patch_6_3/ |
| Endwalker Patch 6.5 特设页（Thaleia） | https://eu.finalfantasyxiv.com/endwalker/patch_6_5 |
| Job Guide · Battle（7.5 职业分类总览） | https://na.finalfantasyxiv.com/jobguide/battle/ |
| Job Guide · Blue Mage（限定职业规则） | https://na.finalfantasyxiv.com/jobguide/bluemage/ |
| Job Guide · Beastmaster（7.5 新限定职业） | https://na.finalfantasyxiv.com/jobguide/beastmaster/ |
| Eorzea Database（版本 7.56） | https://na.finalfantasyxiv.com/lodestone/playguide/db/ |
| Eorzea DB · Class & Job Quests | https://na.finalfantasyxiv.com/lodestone/playguide/db/quest/?category2=6 |
| Eorzea DB · Myths of the Realm | https://na.finalfantasyxiv.com/lodestone/playguide/db/quest/?category2=2&category3=29 |
| Patch 5.0 Notes（Gunbreaker / Dancer） | https://eu.finalfantasyxiv.com/lodestone/topics/detail/26098a6854d60f4f05dd5ea152c4e85e8447a999 |
| **繁中官方站 · 種族介紹（中文官方译名）** | https://www.ffxiv.com.tw/web/intro/races/ |
| Lodestone 玩家实测 · 各种族身高一览（含 Viera/Hrothgar） | https://eu.finalfantasyxiv.com/lodestone/character/6454882/blog/2668120/ |
| Lodestone 玩家实测 · 各种族身高（创建界面截图版） | https://jp.finalfantasyxiv.com/lodestone/character/18161321/blog/3659236/ |
| Lodestone 玩家实测 · 5.0 版种族值 | https://na.finalfantasyxiv.com/lodestone/character/8517384/blog/4168459/ |
| Lodestone 玩家指南 · Character Creation Guide | http://na.finalfantasyxiv.com/lodestone/character/4417600/blog/2663779 |
| Lodestone 玩家日记 · 十二神考察（明确标注为个人推测） | https://jp.finalfantasyxiv.com/lodestone/character/43667250/blog/5420966/ |

### 9.2 社区来源（可抓取）

| 内容 | URL |
| --- | --- |
| RPC Library · Lore:The Twelve（设定文本转录） | https://wiki.ffxiv-roleplayers.com/index.php?title=Lore:The_Twelve |
| RPC Library · 五纪年表（历法原文） | https://wiki.ffxiv-roleplayers.com/index.php?title=Lore:The_Five_Ages_-_An_Eorzean_Chronology |
| RPC Library · 鲁加语分类 | https://wiki.ffxiv-roleplayers.com/index.php?title=Category:Roegadyn |
| RPC 论坛 · Nameday 与公历换算 | https://ffxiv-roleplayers.com/topic/21390-rp-noob-nameday-question/ |
| 天幻网 · 守护神（1.0 时代旧译与数值） | http://ff14.ffsky.cn/eudemon.htm |
| 天幻网 · 种族介绍（1.0 属性表含 PIE） | http://ff14.ffsky.cn/Race.htm |
| game8.jp · 守护神一览（守护神不影响属性） | https://game8.jp/ff14/462641 |
| kamigame.jp · 种族一览与种族值 | https://kamigame.jp/ff14/page/247758737203321061.html |
| docs.rs · ffxiv_types_cn Clan 枚举（16 部族） | https://docs.rs/ffxiv_types_cn/latest/src/ffxiv_types_cn/clans.rs.html |
| FFXIV Guild · Gunbreaker 指南（起始 Lv60） | https://ffxivguild.com/ffxiv-gunbreaker-gnb-guide-faqs-basics/ |
| FFXIV 生日计算器（社区工具） | https://west-games.com/final-fantasy-14-birthday-calculator/ |

### 9.3 任务书要求但**本次无法抓取**的来源（HTTP 403 / fetch failed）

| 目标 | 状态 | 备注 |
| --- | --- | --- |
| `ffxiv.consolegameswiki.com/wiki/Races` | 403 | Cloudflare；含 `Starting_Attributes`、`Character_Creation`、`Au_Ra` 等 |
| `ffxiv.consolegameswiki.com/wiki/Starting_Attributes` | 403 | 关于「种族属性是否取消」的社区经典页面 |
| `ffxiv.gamerescape.com/wiki/Races` | 403 | 含各族的 `*_Naming_Conventions` 系列页面 |
| `ffxiv.gamerescape.com/wiki/Character_Creation` | 403 | 含创建选项完整列表 |
| `finalfantasy.fandom.com` / `ffxiv.fandom.com` | fetch failed | 含 `The_Twelve`、`Viera`、`Hrothgar`、`Au_Ra` 等条目 |
| `ff14.huijiwiki.com`（中文维基） | 403 | 含「种族」「十二神」条目，是中文译名的最佳补充 |
| `forum.square-enix.com`（官方论坛） | fetch failed | 无法取得官方论坛的历法换算帖 |

---

## 10. 后续补调研建议（按优先级）

| 优先级 | 待补内容 | 建议通道 |
| --- | --- | --- |
| ★★★ | 各族的**官方命名规则**完整条文（Nameday 之外的 naming conventions） | 在有浏览器环境时抓取 GamerEscape 的 `*_Naming_Conventions` 系列；或从 Lodestone 官方「命名规则」专题文章 |
| ★★★ | **十二神在 6.x 剧情中的真实身份与退场台词的官方原文** | 抓取 Fandom `The_Twelve` 条目；或 Eorzea DB 的 Thaleia 任务描述 + 剧情文本站 |
| ★★☆ | **雌性硌狮族的身高区间** | 社区实测（2024 年后的 Lodestone 日记） |
| ★★☆ | **7.0–7.5 新增硌狮族/维埃拉族 NPC 清单** | Eorzea DB 主线任务描述 + Dawntrail Story/World 页 |
| ★★☆ | 十二神的**繁中官方译名** | 繁中官网（十二神专题页若有）/ 中文维基 |
| ★☆☆ | 3.0 / 4.0 / 6.0 新职业的官方起始等级 | 对应版本的 Patch Notes 页 |
| ★☆☆ | 鲁加语（Roe language）完整词根表 | RPC Library `Category:Roegadyn` 逐页搬运 |
