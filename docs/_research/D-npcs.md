# D — 《最终幻想14》重要 NPC 与组织 调研笔记

> **文档性质**：调研笔记（research notes），**不是**最终交付物。仅用于后续整理素材。
> **调研日期**：2026-09-15
> **游戏版本**：7.x（Dawntrail 大版本；当前最新主线补丁为 **7.56**，7.5「Trail to the Heavens」于 2026-04-28 上线，7.56 为后续追加主线）
> **调研人**：FFXIV 资料调研员（子代理）
> **任务来源**：父代理 `10ff4694-e4ec-4317-8fca-e9fdab2b6fdb`

---

## 0. 调研方法与来源可信度说明（重要）

### 0.1 本环境的网络限制（必须记录，影响结论强度）

本次调研在**受限网络环境**中进行。实测结果：

| 目标站点 | 用户建议参考 | 实测结果 |
|---|---|---|
| `finalfantasy.fandom.com` | ✅ 推荐 | ❌ **DNS/连接失败**（`fetch failed`），全部路径与 API 均不可达 |
| `ffxiv.fandom.com` | — | ❌ **DNS/连接失败** |
| `ffxiv.consolegameswiki.com` | ✅ 推荐 | ❌ **Cloudflare 403**（返回 "Just a moment..."） |
| `ffxiv.gamerescape.com` | ✅ 推荐 | ❌ **Cloudflare 403** |
| `ffxiv.wiki` | — | ❌ **Cloudflare 403** |
| `ff14.huijiwiki.com`（中文维基） | — | ❌ **Cloudflare 403**（"请稍候…"）|
| `en.wikipedia.org` | — | ❌ 解析到非公网 IP，被策略拒绝 |
| `na.finalfantasyxiv.com` | ✅ 推荐 | ✅ **HTTP 200 可用**（本次主力来源） |
| `wiki.ffxiv-roleplayers.com` | — | ✅ **可用**（社区维基，但内容停在 2013–2019 年） |
| **`actff1.web.sdo.com`（国服官网）** | — | ✅ **可用**【官方·中文】——**本次最有价值的中文译名来源** |
| **`www.ffxiv.com.tw`（台服官网）** | — | ✅ **可用**【官方·中文】 |
| `endlesswiki.com` | — | ⚠️ 可访问，但**自述为 AI 按需生成**，**不予采信**（见 0.3） |
| `gamerant.com` / `thegamer.com` / `game8.co` / `siliconera.com` | — | ❌ 403 / 连接失败 |
| `reddit.com` | — | ❌ 解析到非公网 IP |
| `jp.finalfantasyxiv.com/lodestone/character/*/blog/*` | — | ✅ 可用（**玩家 Lodestone 博客**，属【社区整理】） |
| `blog.alnarra.com` | — | ✅ 可用【社区整理】 |
| `ff14.ffsky.cn`（天幻网） | — | ✅ 可用【社区整理·老站】 |

> 因此，**用户指定的四大参考站点中有三个（fandom、consolegameswiki、gamerescape）在本次环境完全不可用**。
> 本文因此以**官方一手来源（na.finalfantasyxiv.com + 国服/台服官网）为核心骨架**，其余内容以明确标注可信度的方式给出。
> **建议父代理在有正常网络的环节重新用 fandom / consolegameswiki 复核本文标注 ⚠️ 的条目。**
>
> **⭐ 新增可用来源（重要）**：
> - **国服官网「金曦秘话」官方短篇**（简体中文，官方剧情文本）：
>   `https://actff1.web.sdo.com/project/20260324tales_under_the_golden_sun/r3o3m83yu0nh/sidestory_01.html`（第 1 话；同目录 `sidestory_03.html` ~ `sidestory_06.html` 为第 3–6 话）
> - **台服官网更新笔记**（繁体中文，官方）：`https://www.ffxiv.com.tw/web/special/patchnote_log/patch_7.2_notes.html`
> - **玩家 Lodestone 博客（日文社区整理，质量高）**：
>   - 图拉尔/亚历山大设定备忘：`https://jp.finalfantasyxiv.com/lodestone/character/2501759/blog/5426363/`
>   - 十二神整理：`https://jp.finalfantasyxiv.com/lodestone/character/2501759/blog/5163372/`
>   - 古代人/十四人委员会整理：`https://jp.finalfantasyxiv.com/lodestone/character/2501759/blog/4382716/`

### 0.2 本文的标注体系

- 【官方】— 直接来自 `na.finalfantasyxiv.com`（含 `/dawntrail/story/`、各版本 `/patch_x_y/`、`/shadowbringers/story/`、`/stormblood/story/`、`/heavensward/`、`/pr/special/*` 等）。可信度最高，但官方站多为**宣传性简述**，不含完整剧透。
- 【社区】— 来自可访问的社区维基 / 社区整理，附 URL。可信度中等，**必须复核**。
- 【常识/待核】— 来自调研员既有知识、在本环境**无法联网验证**的条目。**默认不可直接采信**，供父代理后续核实。
- ⚠️ — 明确标注不确定 / 版本时效性风险。
- 🚫 — 已确认不可信的来源。

### 0.3 关于 `endlesswiki.com` 的警告 🚫

`https://www.endlesswiki.com/` 在本次环境中可访问，且搜索时会出现在结果里。但其页面自述：

> "EndlessWiki pages are generated on demand. Internal links will create new articles when visited."

即**内容为 AI 按访问动态生成**。其"拂晓血盟"页面内容（如"1572 年成立""口号 Knowledge for Unity"等）**与已知官方设定不符**，属于典型的生成式幻觉文本。
**🚫 本文不采用 endlesswiki 的任何内容，并建议父代理在后续流程中将该域名加入黑名单。**

### 0.4 本次调研执行的联网调用清单

**主编（本文件）：** web_search 调用 9 次（合计约 22 条查询）；web_fetch 调用 21 次（合计约 60 个 URL 抓取尝试）。
**并行子代理 3 个（结果已并入本文）：** 各自另执行 8–19 次 web_fetch + 8 次 web_search。
**合计远超任务要求的 ≥18 次搜索/抓取。**

其中成功取得正文的关键页面：

- `https://na.finalfantasyxiv.com/dawntrail/story/`（7.0 官方主要角色介绍）
- `https://na.finalfantasyxiv.com/dawntrail/world/`（图拉尔大陆地理与族群）
- `https://na.finalfantasyxiv.com/dawntrail/patch_7_1/`、`patch_7_2/`、`patch_7_3/`、`patch_7_4/`、`patch_7_5/`
- `https://na.finalfantasyxiv.com/endwalker/`、`/endwalker/patch_6_0/`、`/patch_6_1/`、`/patch_6_2/`、`/patch_6_4/`
- `https://na.finalfantasyxiv.com/shadowbringers/story/`、`/shadowbringers/patch_5_3/`
- `https://na.finalfantasyxiv.com/stormblood/story/`
- `https://na.finalfantasyxiv.com/heavensward/`、`/pr/special/3_5_The_Far_Edge_Of_Fate/`
- `https://na.finalfantasyxiv.com/lodestone/topics/`（**7.56 补丁说明：Halmarut 的官方原文**）
- `https://wiki.ffxiv-roleplayers.com/...`：`Ul'dah`（沙蝎众）、`Ishgard`（四大名门）、`Gridania`、`Ala_Mhigo`、`Garlemald`、`The_Twelve`（十二神全名单）
- `https://actff1.web.sdo.com/.../sidestory_01~06.html`（国服官方中文短篇）
- `https://www.ffxiv.com.tw/web/special/patchnote_log/patch_7.2_notes.html`（台服官方中文笔记）

### 0.5 ⚠️ 对任务描述的三处重要更正（必读）

1. **「Evercold」不是 7.4/7.5 的内容，而是下一个大版本（8.0）**。
   官方 Lodestone Topics 已更新其 Teaser 页，设定为「**第四镜像（the fourth shard）· 永远冰封的世界**」，并释出天野喜孝绘制的插画（档期「2027 年 1 月」为媒体说法，⚠️）。
   来源：`https://na.finalfantasyxiv.com/lodestone/topics/detail/55ca91c7dea7c0444d4bdc662a4dccff39cefa41`
   → **任何把 Evercold 当作 7.x 内容的表述都是错误的。**

2. **「Halmarut」有官方原文支持，且是 7.56 的核心悬念**。
   官方 7.56 补丁说明原文（Lodestone Topics）：**"Faced with the coming Solstice, the fate Halmarut claims to await all worlds..."**
   → Halmarut 是**十四人委员会（Convocation of Fourteen）的席位名**之一，说明 7.x 后期的宇宙论冲突**直接回到古代人体系**。这是本次调研最重要的发现。

3. **若干任务描述中出现的人名在全部可访问来源中不存在**，**不应采信**：
   `Calydontis`、`Nejibana`、`Nel`、`Sons of Y`、`加利·拉玛特`、`帕帕夏`、`蓝青龙`。
   另：**`Alpaca`（羊驼）已核实为图拉尔的动物，不是 NPC**（国服秘话第 3 话：巴库加加为佩鲁佩鲁族剪羊驼毛）。
   `Cahciua`、`Metem`、`Hhihwi`、`Brute Bomber`、`Levin` 等**仅有被封锁 wiki 的标题级证据**，本文不作断言。

---

# 第一部分：拂晓血盟 Scions of the Seventh Dawn

## 1.1 组织总览

| 项目 | 内容 | 来源等级 |
|---|---|---|
| 中文名 | 拂晓血盟 | 【常识/待核】 |
| 英文名 | Scions of the Seventh Dawn | 【官方】 |
| 日文名 | 暁の血盟 | 【常识/待核】 |
| 前身 | 路易索瓦创设的「晓之血盟」；由两大组织合并而成：**Circle of Knowing（知识之环）** 与 **Path of the Twelve（十二之径）** | ⚠️【常识/待核】 |
| 创设者 | 路易索瓦·莱韦耶勒尔 Louisoix LeveillEur | 【官方】 |
| 首任/第二任领导人 | 敏菲利亚·沃德 Minfilia Warde，称号 **Antecedent（盟主 / 先驱者）** | 【官方】 |
| 初期总部 | 砂之家 Waking Sands（萨纳兰 · 西萨纳兰 · 黄昏湾 Vesper Bay） | ⚠️【常识/待核】 |
| 中期总部 | 石之家 Rising Stones（摩杜纳 · 雷文安特前哨 Revenant's Toll） | ⚠️【常识/待核】 |
| 组织性质 | 跨城邦的中立调查/人道组织，专门处理**蛮神（Primals）** 威胁 | 【官方】(见下引文) |
| 核心特征 | 成员多持有**超越之力（the Echo）**，因此能抵抗蛮神的精神支配（Tempering） | ⚠️【常识/待核】 |

【官方】关于组织定位的原文（Shadowbringers 官方 Story 页）：
> "Ala Mhigo is at last free from imperial rule... Nor to the Scions, who yet slumber, their souls adrift. The realm is left to struggle without its saviors, for they have been beckoned beyond time and space─beckoned to the First."
> —— https://na.finalfantasyxiv.com/shadowbringers/story/

【官方】关于路易索瓦的人格影响（Endwalker 官方角色介绍，Urianger 条目）：
> "He stands resolute even in the face of world-ending calamity, drawing strength from the memory and example of his mentor, **Master Louisoix**."
> —— https://na.finalfantasyxiv.com/endwalker/patch_6_0/

### 1.1.1 拂晓血盟在版本中的组织沿革（时间线）

| 版本 | 事件 | 组织状态 | 来源等级 |
|---|---|---|---|
| 1.0 | 路易索瓦创设「晓之血盟」，目的为对抗加雷马帝国与蛮神威胁 | 初创 | ⚠️【常识/待核】 |
| 1.0 末（第七灵灾） | 路易索瓦在加尔提诺平原之战中以十二神之力封印巴哈姆特，自身消逝 | 失去创设者 | 【官方】间接（Urainger 条目提及 mentor Louisoix 的牺牲） |
| 2.0 ARR | 敏菲利亚接任 Antecedent，拂晓血盟在砂之家运作，迎入冒险者（玩家） | 重建 | ⚠️【常识/待核】 |
| **2.5 / 2.55** | **乌尔达哈建国祭「血腥宴会」事件：水晶义勇队被沙蝎众（泰勒吉·阿德雷吉）策反、诬陷拂晓血盟谋杀娜娜莫女王；拂晓血盟成员被通缉、流散，敏菲利亚被掳** | **组织事实上覆灭** | ⚠️【常识/待核】（事件为公认剧情，但本次未能取得官方页面直接引文） |
| 3.0 苍天之伊修加德 | 拂晓血盟残部**迁往伊修加德**，寄居于**福尔唐家 House Fortemps**（艾德蒙·德·福尔唐 Count Edmont de Fortemps 庇护） | 流亡重建 | 【官方】间接（Heavensward Key Characters 含 Count Edmont de Fortemps）+ ⚠️【常识/待核】 |
| **3.5** | **阿莉塞与可露儿正式入盟** | 扩编 | ✅【官方·强证据】（见下引文） |
| 4.0 红莲之狂潮 | 拂晓血盟协助阿拉米格与多玛解放；莉瑟身份揭晓（伊达之妹） | 恢复 | ✅【官方】（Lyse 角色介绍） |
| **5.0 漆黑的反叛者** | **全员灵魂被「水晶塔」召唤转移到第一世界**，肉体留在原初世界沉睡 | 跨世界行动 | ✅【官方·强证据】（Shadowbringers Story 引文） |
| 5.3 | 敏菲利亚（本体）在第一世界完成使命后消逝；水晶公的真身为**古·拉哈·提亚** | 重大损失 | ✅【官方】（5.3 页提及 Elidibus/Ardbert 线） |
| 6.0 晓月之终途 | 终末之战；芝诺斯弑父瓦里斯、加雷马首都化为废墟；**芝诺斯在宇宙尽头与光之战士决斗后自尽** | 主要敌对线收束 | ✅【官方·强证据】（Endwalker Key Characters） |
| 6.x | **古·拉哈·提亚作为新成员加入拂晓血盟**；虚无界（第十三世界）线开启 | 组织延续 | ✅【官方·强证据】（Endwalker Key Characters: "A newly added member of the Scions of the Seventh Dawn, G'raha Tia"） |
| 7.0 Dawntrail | 拂晓血盟成员分头行动；可露儿**同时隶属拂晓血盟与巴尔德西昂委员会**，赴图拉尔调查祖父加鲁夫的往事 | 双组织并行 | ✅【官方·强证据】（Dawntrail Key Characters: Krile 条目） |
| 7.5 / 7.56 | 「Trail to the Heavens」：第九世界（the Ninth）、「key」、**Halmarut** 的出现动摇拂晓血盟 | 组织面临新考验 | ✅【官方】（7.5 / 7.56 补丁页） |

#### 【官方·强证据】3.5 阿莉塞与可露儿正式入盟

> "The threat of the Warriors of Darkness is no more. Unexpected reunions salve the ache of bittersweet farewells. And with their ranks further bolstered by the **official induction of Alisaie and Krile**, once more do the Scions of the Seventh Dawn set their feet upon fate's path and their gaze upon distant horizons."
> —— https://na.finalfantasyxiv.com/pr/special/3_5_The_Far_Edge_Of_Fate/

#### 【官方·强证据】6.x 古·拉哈·提亚加入

> "A **newly added member** of the Scions of the Seventh Dawn, G'raha Tia possesses a profound understanding of the Allagan civilization and a stubborn drive to defy fate's design."
> —— https://na.finalfantasyxiv.com/endwalker/patch_6_0/

#### 【官方·强证据】6.0 后可露儿的双重身份（拂晓血盟 + 巴尔德西昂委员会）

> "Belonging to **both the Scions of the Seventh Dawn and the Students of Baldesion**, this steadfast Lalafell possesses the Echo... Eager to put her newfound pictomancy skills to the test, Krile sails westward in pursuit of answers, hoping to uncover the truth of her grandfather **Galuf**'s dealings in Tural."
> —— https://na.finalfantasyxiv.com/dawntrail/story/

**→ 这说明 6.0 之后拂晓血盟并未解散，而是与巴尔德西昂委员会形成**人员与功能上的合流**。**
⚠️ 注意：任务描述中所说「6.0 后与巴尔德西昂委员会合并」在官方页面上**没有找到"合并/absorbed"的字面表述**；官方表述是人员交叉任职（Krile "belonging to both"）。这一点需要在正常网络下用 fandom / consolegameswiki 复核。**不要把"合并"当作已确认事实。**

---

## 1.2 拂晓血盟主要成员总表

> 种族名以官方英文本地化术语给出；中文名采用国服/民间通行译名（标 ⚠️ 者为待核）。
> "定位"取自官方角色介绍的功能描述。

| 中文名 | 英文名 | 种族 | 所属 | 定位 | 剧情作用 |
|---|---|---|---|---|---|
| 路易索瓦·莱韦耶勒尔 | Louisoix Leveilleur | 精灵族 Elezen | 拂晓血盟（创设者）/ 萨雷安 | 大贤者、创设者 | 创设组织；第七灵灾以身为祭封印巴哈姆特；其遗志贯穿全篇 |
| 敏菲利亚·沃德 | Minfilia Warde | 人族 Hyur（中原之民 Midlander） | 拂晓血盟（Antecedent） | 盟主 / 超越之力持有者 | 2.x 领导核心；2.55 被掳；5.x 在第一世界完成使命后消逝 |
| 桑克瑞德·沃特斯 | Thancred Waters | 人族 Hyur（Midlander） | 拂晓血盟 Archon | 谍报·生存术专家 | 潜入加雷马；第一世界成为敏菲利亚的守护者；掌握绝枪战士技术 |
| 雅·修特拉·鲁尔 | Y'shtola Rhul | 猫魅族 Miqo'te（逐日之民 Seeker of the Sun） | 拂晓血盟 Archon | 魔法学者、白魔法/黑魔法 | 知识追求者；第一世界盲眼后以魔力视物；多次以魔法救场 |
| 帕帕力莫·托托力莫 | Papalymo Totolymo | 拉拉肥 Lalafell（平原之民 Plainsfolk） | 拂晓血盟 Archon | 咒术师、伊达的搭档 | 3.5 以自身封印神龙 Shinryu 而牺牲 |
| 伊达（伊达·海克斯特） | Yda Hext | 人族 Hyur（Midlander） | 拂晓血盟 | 格斗家 | 真实身份为阿拉米格王家末裔；为掩护妹妹而使用亡姐之名 |
| 莉瑟·海克斯特 | Lyse Hext | 人族 Hyur（Midlander） | 拂晓血盟 → 阿拉米格 | 格斗家、革命领袖 | 4.0 核心主角；领导阿拉米格解放并出任领袖 |
| 于里昂热·奥居雷 | Urianger Augurelt | 精灵族 Elezen | 拂晓血盟 Archon | 预言学者、占星术士 | 组织中最博学；在第一世界以占星术开辟前路；师承路易索瓦 |
| 阿尔菲诺·莱韦耶勒尔 | Alphinaud Leveilleur | 精灵族 Elezen | 拂晓血盟 | 外交官、召唤师 | 创设水晶义勇队（失败）；3.0 起成为光战最重要的伙伴 |
| 阿莉塞·莱韦耶勒尔 | Alisaie Leveilleur | 精灵族 Elezen | 拂晓血盟（3.5 正式入盟） | 赤魔法师、行动派 | 5.x 参与研制「解除精炼」的方法；与兄成对照 |
| 塔塔露·塔露 | Tataru Taru | 拉拉肥 Lalafell | 拂晓血盟 | 事务·财务总管 | 独自承担组织全部事务与财政；6.x 自立门户开设服饰店「Tataru's Grand Endeavor」 |
| 穆恩布瑞达·威尔夫森温 | Moenbryda Wilfsunnwyn | 罗格艾丁 Roegadyn（女） | 拂晓血盟 / 萨雷安 | 学者、以太研究者 | 2.x 以自身以太铸造白垩之剑（White Auracite），助讨无影那布里亚勒斯后牺牲 |
| 可露儿·巴尔德西昂 | Krile Baldesion | 拉拉肥 Lalafell | 拂晓血盟 + 巴尔德西昂委员会（3.5 入盟） | 超越之力（感知他人意图） | 加鲁夫之养孙女；7.0 转职绘图师 Pictomancer，赴图拉尔追查祖父往事 |
| 埃斯蒂尼安·维尔姆布兰德 | Estinien Wyrmblood / Varlineau | 精灵族 Elezen | 伊修加德 → 拂晓血盟 | 龙骑士、苍天之龙骑士 | 龙诗战争核心；6.0 加入拂晓血盟并可作 Trust 队友 |
| 古·拉哈·提亚 | G'raha Tia | 猫魅族 Miqo'te（逐日之民） | 拂晓血盟（6.x 加入）/ 水晶塔 | 亚拉戈文明学者 | 5.0 为「水晶公 the Crystal Exarch」；5.3 揭露真身；6.x 正式入盟 |
| 零 | Zero | 人族 Hyur（女） | 虚无界 → 拂晓血盟协力者 | 暗黑骑士 | 6.x 虚无界篇的女主角 |
| 乌克·拉玛特 | Wuk Lamat | 玛姆尔加 Mamool Ja（雌性，单头） | 图莱尤拉王族 | 王位继承仪式候选人 | 7.0 核心主角 |
| 加尔乌斯家族三人 | Solus / Varis / Zenos | 加雷马族 Garlean | 加雷马帝国 | 皇帝 / 皇帝 / 皇太子 | 主要敌对势力的三代核心 |

---

## 1.3 拂晓血盟成员逐一详述

### 1.3.1 敏菲利亚·沃德 Minfilia Warde ⚠️

- **中文名**：敏菲利亚·沃德 ⚠️【常识/待核】
- **英文名**：Minfilia Warde 【官方】
- **种族**：人族 Hyur / 中原之民 Midlander ⚠️【常识/待核】
- **所属**：拂晓血盟，称号 **Antecedent（盟主）** 【官方】
- **一句话定位**：拂晓血盟的第二代领导人，拥有超越之力，是 2.x 全部主线的情感与指挥中枢。
- **详述**：
  【官方】Shadowbringers 官方页对她（在第一世界的对应存在）的描述：「Although this young woman has both the name and the piercing blue eyes of the Scions' **erstwhile Antecedent**, the nature of their connection is not entirely clear.」——这句官方文本确认了两点：(1) 她的头衔是 **Antecedent**；(2) 在 5.0 时点的她已经"former/erstwhile"，即**已不再是现任盟主**。
  ⚠️ 其生母身份、与海德林的关系、以及"被掳"后成为海德林神谕代言者的细节，本次**未能取得官方页面直接引文**。2.55「血腥宴会」中她被乌尔达哈方掳走、后被无影势力（Elidibus 的阴谋）利用成为海德林的巫女，属公认剧情但需复核。
  【官方】5.0 中她在第一世界以少女形态出现（「敏菲利亚」），并在 5.3 完成使命消逝。
- **来源**：https://na.finalfantasyxiv.com/shadowbringers/story/

### 1.3.2 桑克瑞德·沃特斯 Thancred Waters 【官方·充分】

- **中文名**：桑克瑞德·沃特斯 ⚠️
- **英文名**：Thancred Waters
- **种族**：人族 Hyur / 中原之民 ⚠️
- **所属**：拂晓血盟，**Archon（贤人）** 【官方】
- **一句话定位**：拂晓血盟的谍报与生存专家，5.0 后转型为守护者。
- **详述**：
  【官方·5.0】「Thancred is an Archon in the Scions of the Seventh Dawn who specializes in **survival and subterfuge**. Espionage missions have taken him deep within Garlean territory, where he acquired the techniques of the **gunbreaker**─skills he will be forced to perfect if he means to protect those he holds dear.」
  【官方·6.0】「...where he acquired the techniques of the gunbreaker─skills he was **forced to master when a twist of fate saw him thrust into the role of protector**.」
  【官方·7.0】「a **mysterious petition** now beckons him to Tural to leverage these very skills. His compatriots have pledged their aid to Wuk Lamat, but will he join them, or perhaps walk an altogether different path?」
- **来源**：https://na.finalfantasyxiv.com/shadowbringers/story/ ； https://na.finalfantasyxiv.com/endwalker/patch_6_0/ ； https://na.finalfantasyxiv.com/dawntrail/story/

### 1.3.3 雅·修特拉·鲁尔 Y'shtola Rhul 【官方·充分】

- **英文名**：Y'shtola Rhul
- **种族**：猫魅族 Miqo'te ⚠️【常识/待核】（逐日之民）
- **所属**：拂晓血盟，Archon
- **一句话定位**：拂晓血盟的魔法学者，务实与求知欲并存。
- **详述**：
  【官方·5.0】「Her penchant for pragmatism is matched only by her thirst for knowledge. Though she is renowned for her consummate mastery of **white magic**, she now turns to the **dark arts** that she might better contend with the challenges that lie ahead.」
  【官方·6.0】「Well versed in arcane and ancient wisdom... Her relentless studies have revealed **the edges of a greater truth**, and only time will tell where this new perspective will lead her.」
  ⚠️ 5.0 中为穿越虚无空间而失明、改以魔力"视物"的设定为公认剧情，本次未取得官方引文。
- **来源**：https://na.finalfantasyxiv.com/shadowbringers/story/ ； https://na.finalfantasyxiv.com/endwalker/patch_6_0/

### 1.3.4 帕帕力莫·托托力莫 Papalymo Totolymo ⚠️

- **英文名**：Papalymo Totolymo
- **种族**：拉拉肥 Lalafell（平原之民）
- **所属**：拂晓血盟，Archon
- **一句话定位**：伊达的搭档、组织中最强的咒术师之一，以生命封印神龙。
- **详述**：
  ⚠️ 本次**未取得官方页面对其的直接引文**。已知（待核）：他是萨雷安出身的 Archon，与伊达组成长期搭档（"伊达与帕帕力莫"是 2.x 拂晓血盟的经典组合）；性格谨慎、爱说教。
  【官方·间接】3.5 官方补丁页描述「伊斯加德的"狮鹫"（The Griffin，即伊尔贝尔德 Ilberd）...以尼德霍格的双眼与自身之死赋予新神以生命。**Only through the swift and desperate action of an Archon** was the primal sealed away」——这个"Archon"即帕帕力莫，他在 3.55 以自身封印了神龙 Shinryu 而牺牲。
- **来源**：https://na.finalfantasyxiv.com/pr/special/3_5_The_Far_Edge_Of_Fate/

### 1.3.5 伊达 Yda / 莉瑟 Lyse Hext 【官方·充分（莉瑟）】

- **英文名**：Yda Hext / Lyse Hext
- **种族**：人族 Hyur / 中原之民
- **所属**：拂晓血盟 → 阿拉米格解放运动
- **一句话定位**：以亡姐之名行动的阿拉米格王家末裔；4.0 以真名莉瑟成为革命领袖。
- **详述**：
  【官方·4.0，Lyse 条目】「A young fighter of surpassing skill, Lyse yearns to bring freedom to her homeland of **Ala Mhigo**, which fell to the Empire when she was but a child. Her brash, impulsive ways often result in her biting off more than she can chew. Yet the time may come when she must rise to the occasion and **become a leader of men**...」
  ⚠️「Yda 实为姐姐、莉瑟借姐名行动」的设定为公认剧情（4.0 揭露），本次未取得官方页面引文。
  【官方】4.0 官方页把 Lyse 列为 Stormblood 的第一位 Key Character，说明其主角地位。
- **来源**：https://na.finalfantasyxiv.com/stormblood/story/

### 1.3.6 于里昂热·奥居雷 Urianger Augurelt 【官方·充分】

- **英文名**：Urianger Augurelt
- **种族**：精灵族 Elezen
- **所属**：拂晓血盟，Archon
- **一句话定位**：组织中最博学的预言学者，言辞晦涩的占星术士。
- **详述**：
  【官方·5.0】「An Elezen **student of prophecy** known for his cryptic utterances, Urianger is considered one of the Scions' most erudite Archons. In the face of a new threat and a precarious future, he has turned to the ancient Sharlayan art of **astrology** to divine a path forward...」
  【官方·6.0】「He stands resolute even in the face of world-ending calamity, drawing strength from the memory and example of his mentor, **Master Louisoix**.」
  【官方·7.0】「Although he has joined Thancred on a journey to the distant continent of Tural, his reasons for doing so are **as enigmatic as the man himself**.」
  → 官方明确将他与创设者路易索瓦建立师承关系，这是**拂晓血盟精神传承**的关键证据。
- **来源**：https://na.finalfantasyxiv.com/shadowbringers/story/ ； https://na.finalfantasyxiv.com/endwalker/patch_6_0/ ； https://na.finalfantasyxiv.com/dawntrail/story/

### 1.3.7 阿尔菲诺·莱韦耶勒尔 Alphinaud Leveilleur 【官方·充分】

- **英文名**：Alphinaud Leveilleur
- **种族**：精灵族 Elezen
- **所属**：拂晓血盟
- **一句话定位**：萨雷安的天才少年外交官，3.0 之后成为光之战士最紧密的伙伴；水晶义勇队创设者与失败者。
- **详述**：
  【官方·5.0】「A member of the Scions of the Seventh Dawn, Alphinaud was **the youngest individual in history to be accepted into the Studium**, Sharlayan's premier academic institution. Leaving his homeland with grand dreams of delivering the world from destruction, he has **suffered many a humbling experience** throughout his journey, but bolstered by comrades old and new, he forges on towards his life's goal.」
  【官方·6.0】「...a long road of hard experience and personal growth has brought him **full circle as he prepares to return to the land of his birth**.」
  ⚠️「创设水晶义勇队并在 2.55 被伊利贝尔德背叛」为公认剧情，本次未取得官方页面引文。
  另注：他同时也是路易索瓦之孙，因此与创设者有血缘关系 ⚠️【常识/待核】。
- **来源**：https://na.finalfantasyxiv.com/shadowbringers/story/ ； https://na.finalfantasyxiv.com/endwalker/patch_6_0/

### 1.3.8 阿莉塞·莱韦耶勒尔 Alisaie Leveilleur 【官方·充分】

- **英文名**：Alisaie Leveilleur
- **种族**：精灵族 Elezen
- **所属**：拂晓血盟（**3.5 正式入盟**）
- **一句话定位**：阿尔菲诺的双胞胎妹妹，行动派；赤魔法师。
- **详述**：
  【官方·3.5】「...with their ranks further bolstered by the **official induction of Alisaie and Krile**, once more do the Scions of the Seventh Dawn set their feet upon fate's path...」
  【官方·5.0】「A **woman of action** whose dynamic approach is in stark contrast to that of her more diplomatic twin brother, Alphinaud. Inspired by those she has lost in her many travails, she strives to better herself for the sake of those she can yet save.」
  【官方·6.0】「She **helped achieve the impossible in devising a cure for the tempered**, but the trials ahead will test the limits of even her tenacious spirit.」
  → 官方确认她在 6.0 前的贡献是**研制出解除"精炼（Tempering）"的方法**。
- **来源**：https://na.finalfantasyxiv.com/pr/special/3_5_The_Far_Edge_Of_Fate/ ； https://na.finalfantasyxiv.com/shadowbringers/story/ ； https://na.finalfantasyxiv.com/endwalker/patch_6_0/

### 1.3.9 塔塔露·塔露 Tataru Taru 【官方·充分】

- **英文名**：Tataru Taru
- **种族**：拉拉肥 Lalafell
- **所属**：拂晓血盟
- **一句话定位**：独自承担拂晓血盟全部事务与财务的拉拉肥事务官。
- **详述**：
  【官方·6.0】「Not only does this diligent Lalafell **single-handedly carry out the clerical duties** of the Scions of the Seventh Dawn, she is also responsible for their **finances**, often dabbling in the various trade professions herself in order to save a few coins. **Though unsuited to battle**, her administrative support is what allows the other members of the organization to operate at full effectiveness in the field.」
  【官方·6.2】她开设了自己的服饰店支线「**Tataru's Grand Endeavor**」；6.4 延伸到 Terncliff。官方补丁页：
  > "The sky's the limit when it comes to **Tataru's ambitions for her blossoming boutique**..."
  > —— https://na.finalfantasyxiv.com/endwalker/patch_6_2/
- **来源**：https://na.finalfantasyxiv.com/endwalker/patch_6_0/ ； https://na.finalfantasyxiv.com/endwalker/patch_6_2/ ； https://na.finalfantasyxiv.com/endwalker/patch_6_4/

### 1.3.10 穆恩布瑞达·威尔夫森温 Moenbryda Wilfsunnwyn ⚠️

- **英文名**：Moenbryda Wilfsunnwyn
- **种族**：罗格艾丁 Roegadyn（女性）
- **所属**：拂晓血盟 / 萨雷安
- **一句话定位**：2.x 加入的以太研究者，以自身性命换取了讨伐无影的手段。
- **详述**：
  ⚠️ 本次**未取得官方页面引文**。公认剧情（待核）：她是萨雷安出身、于里昂热的旧识，性格豪爽；以全部以太注入**白垩之剑（White Auracite）** 以消灭无影那布里亚勒斯（Nabriales），自己随之消逝（2.5 前后）。
  她与于里昂热的感情线是 2.x 最著名的悲剧之一。
- **来源**：⚠️ 未能取得（fandom / consolegameswiki 均不可达）

### 1.3.11 可露儿·巴尔德西昂 Krile Baldesion 【官方·强证据】

- **英文名**：Krile Baldesion / Krile Mayer Baldesion ⚠️（中间名待核）
- **种族**：拉拉肥 Lalafell
- **所属**：**拂晓血盟 + 巴尔德西昂委员会（Students of Baldesion）双重身份**
- **一句话定位**：拥有"感知他人意图"型超越之力的拉拉肥学者，加鲁夫之养孙女。
- **详述**：
  【官方·3.5】与阿莉塞一同**正式入盟**。
  【官方·6.0】「This steadfast member of the Scions of the Seventh Dawn possesses the Echo, her gift manifesting as **the ability to sense the intent of others**. Krile also **belongs to the Students of Baldesion**, and is the **adopted granddaughter of Galuf**, the institution's late founder. In choosing to safeguard the world from peril, it is his legacy that she seeks to uphold.」
  【官方·7.0】「Belonging to both the Scions of the Seventh Dawn and the Students of Baldesion... Eager to put her **newfound pictomancy skills** to the test, Krile sails westward in pursuit of answers, hoping to uncover the truth of her **grandfather Galuf's dealings in Tural**.」
  → 官方明确：**加鲁夫 Galuf 是巴尔德西昂委员会的"已故创设者（late founder）"**，可露儿为其养孙女。
- **来源**：https://na.finalfantasyxiv.com/endwalker/patch_6_0/ ； https://na.finalfantasyxiv.com/dawntrail/story/ ； https://na.finalfantasyxiv.com/pr/special/3_5_The_Far_Edge_Of_Fate/

### 1.3.12 埃斯蒂尼安·维尔姆布兰德 Estinien Wyrmblood 【官方·充分】

- **英文名**：Estinien Wyrmblood；6.0 时代官方亦使用 **Estinien Varlineau** ⚠️
- **种族**：精灵族 Elezen
- **所属**：伊修加德（神殿骑士团/龙骑士）→ 拂晓血盟
- **一句话定位**：伊修加德最强的龙骑士、苍天之龙骑士，龙诗战争的关键人物，6.0 加入拂晓血盟。
- **详述**：
  【官方·6.0】「Once heralded as **Ishgard's foremost dragonslayer**, Estinien disappeared from the world's stage following the denouement of the Dragonsong War. With an even greater threat now brewing on the horizon, **the erstwhile Azure Dragoon has returned, lance in hand, to fight at the side of the Scions**.」
  【官方·6.0】另一处明确：「**New Trust Ally: Estinien Wyrmblood** — The formidable dragoon **joins the ranks of the Scions**, and can now be added to your Trust parties as you play through the main scenario.」
  → 官方双重确认他 **6.0 加入拂晓血盟**并成为 Trust 队友，这是拂晓血盟在 6.0 扩编的直接证据。
- **来源**：https://na.finalfantasyxiv.com/endwalker/patch_6_0/

### 1.3.13 古·拉哈·提亚 G'raha Tia / 水晶公 the Crystal Exarch 【官方·强证据】

- **英文名**：G'raha Tia；别名 **The Crystal Exarch（水晶公）**
- **种族**：猫魅族 Miqo'te（逐日之民，带亚拉戈血统）⚠️
- **所属**：水晶塔 / 水晶都 Crystarium → 拂晓血盟（6.x 加入）
- **一句话定位**：5.0 的"水晶公"，真身为亚拉戈时代遗留的猫魅族学者；6.x 正式入盟。
- **详述**：
  【官方·5.0】「**De facto leader for the people of the Crystarium**, the Crystal Exarch gained his title as much for his position as for **the crystalline transformation steadily consuming the flesh of his body**. This enigmatic figure promises to play a prominent part in the Warrior of Light's future adventures.」
  【官方·6.0】「A **newly added member** of the Scions of the Seventh Dawn, G'raha Tia possesses a profound understanding of the **Allagan civilization** and a stubborn drive to defy fate's design.」
  ⚠️「水晶公真身即古·拉哈·提亚」在 5.3 揭露；本次未取得 5.3 页的直接引文（5.3 页主体讲 Elidibus/Ardbert 线）。
- **来源**：https://na.finalfantasyxiv.com/shadowbringers/story/ ； https://na.finalfantasyxiv.com/endwalker/patch_6_0/

### 1.3.14 路易索瓦·莱韦耶勒尔 Louisoix Leveilleur 【官方（间接）】

- **英文名**：Louisoix Leveilleur
- **种族**：精灵族 Elezen ⚠️
- **所属**：萨雷安 / 拂晓血盟创设者
- **一句话定位**：拂晓血盟的创设者，第七灵灾中以生命封印巴哈姆特的贤者，莱韦耶勒尔双子的祖父。
- **详述**：
  【官方·间接·强】Endwalker 官方页在 Urianger 条目中称其为 **"Master Louisoix"** 并称 Urianger 从他的"memory and example"中汲取力量——这是官方对"拂晓血盟的精神传承自路易索瓦"的确认。
  ⚠️ 其创设组织、组建「晓之血盟」、封印巴哈姆特等细节本次**未取得官方页面直接文本**，需复核。
- **来源**：https://na.finalfantasyxiv.com/endwalker/patch_6_0/

### 1.3.15 零 Zero 【官方（7.x 页中的间接提及）】

- **英文名**：Zero
- **种族**：人族 Hyur（女性）⚠️
- **所属**：虚无界（第十三世界）→ 拂晓血盟协力者
- **一句话定位**：6.x「虚无界（第十三世界）」篇的女主角，原为虚无界居民，协助光之战士讨伐古尔贝扎。
- **详述**：
  ⚠️ 本次**未取得 Zero 的官方角色页**（6.x 主线补丁页只描述剧情走向，不含角色介绍块）。
  【官方·间接】6.4 页确认 6.x 虚无界线的存在：「With a gambit that would cost them their very lives, the archfiends **Cagnazzo and Rubicante** succeeded in destroying the voidgate... Yet where there is a will, there is a way─and so the Warrior of Light and allies continue the search for a new means to reach **the void**.」
- **来源**：https://na.finalfantasyxiv.com/endwalker/patch_6_4/ ； https://na.finalfantasyxiv.com/endwalker/patch_6_2/

---

# 第二部分：7.0–7.56 图拉尔 / 亚历山大 主要 NPC

> 本部分几乎全部为【官方】证据，来源为 Dawntrail 官方站与 7.1–7.5 官方补丁页。
> **这是本文证据强度最高的部分。**

## 2.1 图拉尔Tural 与图莱尤拉Tuliyollal 背景【官方】

【官方】图拉尔大陆的构成与建国史：
> "Comprised of two great landmasses─**Xak Tural** to the north, and **Yok Tural** to the south─the 'New World' lies far to the west of Eorzea's shores. Its many and diverse peoples spent centuries mired in territorial wars until the epic deeds of **Gulool Ja Ja** and his dream of **Tuliyollal** saw them united under the banner of a single nation."
> —— https://na.finalfantasyxiv.com/dawntrail/world/

【官方】7.0 主线设定：
> "In the nation of Tuliyollal, far to the west, claimants prepare to compete for the throne of the **Dawnservant**. Eorzea's champion is to accompany **Wuk Lamat** as her ally in this **rite of succession**─an endeavor which calls them across the glittering seas to the distant continent of Tural."
> —— https://na.finalfantasyxiv.com/dawntrail/story/

【官方】主要地区与族群（world 页）：

| 地区 | 官方描述要点 | 相关族群 |
|---|---|---|
| 图莱尤拉 Tuliyollal | 依山而建的阶梯都市，山顶为宫殿，人口来自图拉尔各地 | 多族混居 |
| Solution Nine | 「a city of towering facades constructed by an entirely different civilization than that of Tuliyollal」 | 亚历山大 |
| 乌尔科帕查 Urqopacha | 约克图拉尔山地；体型悬殊的两族共存；图拉尔最高峰 Worqor Zormor | **佩鲁佩鲁 Pelupelu**（孩童体型）、**约克胡伊 Yok Huy**（巨人） |
| 科扎玛乌卡 Kozama'uka | 尤克图拉尔南部森林，多瀑布；居民形似哥布林与瓦努瓦努 | 未具名 |
| 雅克特埃尔 Yak T'el | 高地有 Xbr'aal，低地有 Mamool Ja；天然井 cenotes | **Xbr'aal**、**玛姆尔加 Mamool Ja** |
| 沙洛阿尼 Shaaloani | 图拉尔中部干旱平原；近年发现**青磷水（ceruleum）** 矿藏，修建了铁路 | 未具名 |
| 遗产发现区 Heritage Found | 「overflowing with **lightning energies**」；雷云蔽日 | 托纳瓦坦 Tonawawtan（7.1 页提及） |

## 2.2 图莱尤拉王族与继承仪式候选人【官方·强证据】

| 中文名 | 英文名 | 种族 | 所属 | 定位 | 剧情作用 |
|---|---|---|---|---|---|
| 古路尔·贾贾 | **Gulool Ja Ja** | 玛姆尔加 Mamool Ja（**双头**） | 图莱尤拉 | **黎明之仆 Dawnservant**、建国者与现任统治者 | 统一图拉尔各族建立图莱尤拉；与可露儿祖父加鲁夫有旧交 |
| 乌克·拉玛特 | **Wuk Lamat** | 玛姆尔加 Mamool Ja（单头，雌性） | 图莱尤拉王族 | 王位继承仪式候选人 | 7.0 核心主角；为守护和平之国而参选 |
| 寇尔·拉玛特 | **Koana** | 玛姆尔加 Mamool Ja（单头） | 图莱尤拉王族（**养子**） | 王位继承仪式候选人 | 主张以技术与革新带来繁荣 |
| 佐拉加 | **Zoraal Ja** | 玛姆尔加 Mamool Ja（单头） | 图莱尤拉 | **第一誓约 First Promise**、**陆卫军 Landsguard 司令** | 武力被认为可与黎明之仆匹敌；被视为最有力候选人 |
| 巴库尔·贾贾 | **Bakool Ja Ja** | 玛姆尔加 Mamool Ja（**双头**） | 无直接王族关系 | 王位继承仪式候选人 | 靠武斗大会夺冠取得参选资格；蔑视"劣等单头" |
| 埃伦维尔 | **Erenville** | 维艾拉 Viera（兔男）⚠️ | 萨雷安**采集者行会 gleaners' guildship** | 向导 / 童年好友 | 图拉尔出身；担任光之战士的向导；对"黄金乡"有所隐情 |
| （谜之少女） | **Enigmatic Maiden** | ⚠️ | — | 官方页面仅给出代号 | 7.0 官方 Key Characters 之一，**官方未公开其描述** |

### 2.2.1 逐条官方原文（供后续核实引用）

**Gulool Ja Ja**
> "Gulool Ja Ja is both founder and current ruler of the nation of Tuliyollal. A **two-headed Mamool Ja** possessed of impressive strength and shrewd sagacity, the Dawnservant is also known by the twin titles of **the Vow of Resolve and the Vow of Reason**. He appears to have a past connection with Krile's grandfather **Galuf**."
> — https://na.finalfantasyxiv.com/dawntrail/story/

**Wuk Lamat**
> "With the help of her childhood friend Erenville, this **beloved member of Tuliyollal's ruling family** has recruited the Warrior of Light to aid her in the rite of succession. Wuk Lamat must win the throne if she wishes to **preserve a peaceful nation** for her people, and so has joined the contest against rival claimants of formidable ability."
> — 同上。Voice Actor: Sena Bryer。

**Koana**
> "Respected for his brilliant mind and practical attitude, this **adoptive son** of Tuliyollal's ruling family hopes to usher his home into a **new age of prosperity**. It remains to be seen if technology and innovation will prove sufficient allies to overcome his fellow claimants..."
> — 同上。Voice Actor: Luis Bermudez。

**Zoraal Ja**
> "**The First Promise of Tuliyollal**, Zoraal Ja serves as the commander of the **Landsguard**, the redoubtable warriors who preserve the nation's peace. His martial prowess is rumored to rival even that of the Dawnservant, with many regarding him as the **foremost candidate** in the rite of succession."
> — 同上。Voice Actor: Spencer Ortega。

**Bakool Ja Ja**
> "Lacking direct ties to the Dawnservant, this vainglorious **two-headed** claimant earned his place in the rite of succession by **triumphing in a martial tournament**. He is loudly contemptuous of other peoples—his derision of 'inferior' one-heads extending even to his fellow Mamool Ja."
> — 同上。Voice Actor: Javier Prusky。

**Erenville**
> "A member of the **gleaners' guildship in Sharlayan**, Erenville hails from the continent of Tural, and has taken on the role of **guide** for the Warrior of Light during the rite of succession. Though he appears to harbor reservations after learning the contest involves **the fabled city of gold**, the source of his misgivings remains unclear."
> — 同上。Voice Actor: Ari Oskarsson。

> ⚠️ **任务描述中的若干名字无法在官方页面证实，需复核**：
> - 「加利·拉玛特」— 官方无此名。图莱尤拉王族中与 Wuk Lamat 同辈的已知成员为 **Koana**（养子）与 **Zoraal Ja**。所谓"加利·拉玛特"可能是对 **Gulool Ja Ja**（古路尔·贾贾）的误记，或社区臆造。
> - 「斯芬恩 Sphene」— 官方 7.1/7.2 页以 **"a recreated queen"**、**"the Queen of Reason"**、**"Queen Eternal"** 指称，7.x 剧情中的亚历山大女王。其英文名 **Sphene** 在本次抓取的官方页中**出现在试炼名称 "Sphene's Burden"** 上，因此可确认官方用名存在。但**官方未在 Dawntrail 主站 Key Characters 中列出她**（她的位置是"Enigmatic Maiden"）。
> - 「奥特 Otis」「卡琉」「佐拉加的部下」— 本次**未能证实**。7.1 页只提及 **Zoraal Ja** 亲自率领 Landsguard 讨伐**图拉尔灾兽 tural vidraal**、以及托纳瓦坦村落 Yuweyawata 的命运。

## 2.3 7.1–7.56 剧情推进与新增 NPC【官方】

| 补丁 | 标题 | 上线日 | 主线要点（官方原文节选） | 新增关键名词 |
|---|---|---|---|---|
| 7.1 | Crossroads | 2024-11-12 | 「the spectacle of **Living Memory** and its threat to the star have been laid to rest, the **shade of remembrance** lingers both within and without the dome」 | **Living Memory（生者的记忆）**、**Queen Eternal** |
| 7.2 | Seekers of Eternity | 2025-03-25 | 「The **Queen of Reason** has made a miraculous return... become **Endless**, and eternal life is yours」 | **the Endless（无尽者）**、**psychonekrosis（精神坏死）**、**Ascension Arcadia Championship** |
| 7.21 | — | — | 「**Searchingway** wants you to join the **Cosmic Exploration Initiative**」 | Searchingway、Cosmic Tools |
| 7.25 | — | — | The Occult Crescent: South Horn | — |
| 7.3 | The Promise of Tomorrow | 2025-08-05 | 「**Modified memories, neo regulators**, and rampaging soldiers... a seemingly **contagious fear of death** erodes the joy from the faces of **Alexandria**'s citizens」 | **neo regulators（新型调节器）**、**Alexandria（亚历山大）**、**Necron（涅克龙）** |
| 7.4 | Into the Mist | 2025-12-16 | 「The machinations of **Calyx** and **Preservation** have been thwarted, releasing Alexandria from the throes of chaos」 | **Calyx（卡吕克斯）**、**Preservation（保存者）** |
| 7.45 | — | — | Variant Dungeon - The Merchant's Tale | — |
| 7.5 | Trail to the Heavens (Part 1) | 2026-04-28 | 「Returned from the **levin-wracked lands of the Ninth**, the Warrior of Light and their companions resume investigations into **the key**」 | **the Ninth（第九世界）**、**the key（钥匙）** |
| 7.56 | Trail to the Heavens (Part 2) | ⚠️ 晚于 7.5 | 「**The Solstice**─a rejoining of the reflections guided by nature itself. Still reeling from **Halmarut's proclamation**, the Scions waver over how to face the looming calamity」 | **The Solstice（至点）**、**Halmarut** |

### 2.3.1 最重要发现：Halmarut 出现在 7.56 【官方】

> 「Still reeling from **Halmarut's proclamation**, the Scions waver over how to face the looming calamity.」
> —— https://na.finalfantasyxiv.com/dawntrail/patch_7_5/

**Halmarut 是十四人委员会（Convocation of Fourteen）的席位名之一**（⚠️ 席位对应关系需复核）。官方 7.56 页确认该名字在 7.x 后期主线中**作为发声者出现**，并直接动摇了拂晓血盟。
→ 这意味着 7.x 后期的敌对/关键势力**与古代人（Amaurot / 十四人委员会）体系直接相连**，而非仅仅是图拉尔本地政治。这是本次调研**最有价值的发现之一**，建议父代理重点跟进。

### 2.3.2 "the Solstice（至点）"——新的"世界融合"设定 【官方】

> 「**The Solstice**─a **rejoining of the reflections** guided by nature itself.」
> —— 同上

→ 这是继无影（Ascians）人工推动的"灵灾/世界融合（Rejoining）"之后，官方提出的**由自然本身引导的融合**概念。属于 7.x 末期的核心宇宙论设定。

### 2.3.3 亚历山大相关设定要点汇总【官方】

- **Living Memory（生者的记忆）**：7.1 页称其"spectacle"与"threat to the star"已被平息；7.3 页称"The lights of Living Memory no longer shine"，并被改建为 **The Meso Terminal**——「a monument to the existence of the Alexandrian people, and a **resting place for their many memories**」。
- **the Endless（无尽者）**：7.2 页官方定义为斯芬恩（Queen of Reason）向子民许诺的"永恒生命"形态——「become Endless, and eternal life is yours」。
- **Necron（涅克龙）**：7.3 页——「The **mortal fear of death** is channeled into a prayer for the coming of the primal **Necron**!」→ 这是《FF9》最终 Boss 的同名引用，被设定为亚历山大市民对死亡的恐惧所召唤的蛮神。
- **Sphene / Queen Eternal**：7.1 页——「a sorrowful song of a **recreated queen**... this **simulacrum** sought to preserve the memories of her subjects by **taking the lives of innocents in other reflections**... the dread entity known as **Queen Eternal**」。
  → 官方明确定义**斯芬恩是"被再造的女王 / 拟像（simulacrum）"**，其目的是保存子民的记忆，手段是**掠夺其他镜像世界的生命**。这也解释了任务描述中"Nel/Sphene 关系"的疑问——**官方在 7.x 页面上没有出现 "Nel" 这个名字**，⚠️ 需复核（可能为社区误记或 7.5x 新角色）。
- **Calyx**：7.4 页与 **Preservation（保存者）** 并列为其"machinations"，是 7.4 的反派核心。⚠️ 官方未给出种族/身份。

### 2.3.4 FFXI 联动：Echoes of Vana'diel【官方】

| 补丁 | 内容 | 官方要点 |
|---|---|---|
| 7.1 | Jeuno: The First Walk | 雅克特埃尔出现连接至 **Vana'diel** 与 **Jeuno** 的现实裂隙 |
| 7.3 | San d'Oria: The Second Walk | 同一线的第二段 |
| 7.5 | Windurst: The Third Walk | 「The time has come for **Sareel Ja** to realize his dream of a new king─one he believes worthy to rule Tural, and perhaps even the whole of the star. What harrowing trials must the Warrior of Light overcome to put his ambitions to rest, and what will become of **Alxaal** and **Prishe** should they prove victorious?」 |

→ **Sareel Ja** 是 7.5 联动的反派；**Alxaal** 与 **Prishe** 是《FF11》原作角色（Prishe 为 FF11 主要角色之一）。

### 2.3.5 其他 7.x 官方新增信息

- **The Arcadion（阿尔卡迪翁）**：7.0–7.4 的 8 人 Raid 系列，设定为亚历山大的娱乐格斗赛事 **Ascension Arcadia Championship**，分级为 Light-heavyweight → Cruiserweight（7.2）→ Heavyweight（7.4）。相关设定词：**psychonekrosis（精神坏死）**。
  7.4 的 Heavyweight 最终战使用了由 **Tom Morello**（Rage Against the Machine）作曲、**Caleb Shomo**（Beartooth）演唱的原创曲「Everything Burns」。
- **Beastmaster（魔兽使）**：7.56 新增的**限定职业（Limited Job）**。官方设定原文提到「From tacticians of the former **Republic of Landis** to the **griffin breeders of Ala Mhigo**, skilled practitioners have long tamed wild beasts for mankind's gain.」
  → 顺带确认：**阿拉米格有狮鹫饲养传统**，且存在已灭亡的 **Landis 共和国**。
- **Cosmic Exploration Initiative**：7.21 内容，负责人为 **Searchingway**。

---

# 第三部分：6.x「虚无界（第十三世界）」线与相关 NPC

## 3.1 官方剧情骨架【官方】

【官方·6.2「Buried Memory」】：
> "Five millennia ago, the great wyrm **Azdaja** vanished into the void, and for long years **Vrtra** had despaired of being reunited with his dear sister. With the encouragement of his people, however, he has found the resolve to search for her, and sets forth with the Warrior of Light for a **world engulfed in Darkness**..."
> —— https://na.finalfantasyxiv.com/endwalker/patch_6_2/

【官方·6.2 试炼「Storm's Crown」】：
> "The search for Azdaja brings the Warrior of Light face to cruel face with **Golbez**'s haughtiest archfiend─**Barbariccia**!"
> —— 同上

【官方·6.2 副本「The Fell Court of Troia」】：发现海底宝库中的**虚无之门（voidgate）**，穿越至第十三世界，抵达一座满是虚无生物的暗影城堡。

【官方·6.4「The Dark Throne」】：
> "With a gambit that would cost them their very lives, the archfiends **Cagnazzo and Rubicante** succeeded in destroying the voidgate hidden within the depths of **Alzadaal's Legacy**, thus barring the path to the Thirteenth. Yet where there is a will, there is a way─and so the Warrior of Light and allies continue the search for a new means to reach **the void**."
> —— https://na.finalfantasyxiv.com/endwalker/patch_6_4/

【官方·6.4 试炼「The Voidcast Dais」】：
> "After five long millennia, **Azdaja's liberation** is at hand. Yet **Golbez**, her ironclad captor, will not be so easily cast from his seat of power..."
> —— 同上

## 3.2 6.x 虚无界相关 NPC 表

| 中文名 | 英文名 | 种族/类别 | 所属 | 定位 | 剧情作用 |
|---|---|---|---|---|---|
| 古尔贝扎 | **Golbez** | 虚无界存在 | 第十三世界 | 6.x 篇主要反派 | 囚禁阿兹达加五千年；持有"暗之座" |
| 巴尔巴里恰 | **Barbariccia** | 四凶魔 archfiend | 古尔贝扎一方 | 四凶魔之一 | 6.2 试炼「Storm's Crown」 |
| 卡尼亚佐 | **Cagnazzo** | 四凶魔 archfiend | 古尔贝扎一方 | 四凶魔之一 | 6.4 与卢比坎特一同破坏虚无之门 |
| 卢比坎特 | **Rubicante** | 四凶魔 archfiend | 古尔贝扎一方 | 四凶魔之一 | 同上 |
| （第四凶魔） | 第四位 archfiend | — | — | ⚠️ 本次未在官方页抓取到全部名单 | 需复核（四凶魔常见为 Barbariccia / Cagnazzo / Rubicante + 一位） |
| 阿兹达加 | **Azdaja** | 龙族（第一支族） | 拉札罕王室 | 弗栗多之妹 | 5000 年前消失于虚无界，6.4 获救 |
| 弗栗多 | **Vrtra** | 龙族（第一支族） | 拉札罕 | 拉札罕的实际统治者（以**瓦尔莎汗 Varshahn** 为人偶替身） | 6.2 起为救妹与光战同行 |
| 零 | **Zero** | 人族 Hyur（女）⚠️ | 虚无界 | 6.x 篇女主角 | ⚠️ 本次未取得官方角色页 |

> ⚠️ **关于 Zero 的说明**：本次抓取的所有官方 6.x 补丁页**均未包含角色介绍区块**（Endwalker 的 Key Characters 只在 `/endwalker/patch_6_0/` 上），因此 Zero、Golbez、四凶魔的官方正式介绍文本**本次无法取得**。上表内容中，Azdaja / Vrtra / Barbariccia / Cagnazzo / Rubicante / Golbez 的名字与角色定位**均有官方页面原文支持**；Zero 与第四凶魔**属待核**。

## 3.3 6.x 其他组织与角色【官方】

| 中文名 | 英文名 | 类别 | 所属 | 定位 | 出处 |
|---|---|---|---|---|---|
| N-7000 | **N-7000** | 欧米茄族 Omicron | 乌尔提玛·图勒 | 咖啡店老板（欧米茄族） | 6.2 官方页 |
| 贾明威 | **Jammingway** | 非欧米茄族 | 乌尔蒂玛·图勒 | N-7000 的搭档 | 6.2 官方页 |
| 「最后一滴」 | **the Last Dregs** | 场所 | 乌尔提玛·图勒 | 新开的咖啡店 | 6.2 官方页 |
| 涅列马尔 | **Neillemard** | ⚠️ | 天钢机工团 Skysteel Manufactory | 工程师团队负责人 | 5.35 官方页 |
| 弗兰塞尔·德·欧谢尔 | **Francel de Haillenarte** | 精灵族 Elezen | 伊修加德 · **欧谢尔家 House Haillenarte** | 年轻领主 | 5.31 官方页（伊修加德复兴） |
| 罗薇娜 | **Rowena** | 拉拉肥 Lalafell ⚠️ | 乌尔达哈 | 「罗薇娜的珍宝馆 **Rowena's House of Splendors**」主理人 | 5.3 官方页 |
| 加伊乌斯·范·巴埃萨 | **Gaius van Baelsar** | 加雷马族 | 加雷马帝国（前） | 前帝国军团长 | 5.3 官方页（「The Sorrow of Werlyt」） |
| 布莱尔迪安 | **Briardien** | ⚠️ | 伊修加德 · **圣恩达利姆神学院 Saint Endalim's Scholasticate** | 调查官 | 3.5 官方页 |
| 兹罗埃 / 克萝埃 | **Zhloe / Khloe** | 拉拉肥 ⚠️ | 伊迪尔夏 Idyllshire | 孤儿；Custom Deliveries 委托人 | 3.5 官方页 |
| 埃露·托 | **Ehll Tou** | 龙族（幼龙） | 伊修加德 | 学习工匠技艺的幼龙 | 5.3 官方页 |

---

# 第四部分：艾欧泽亚十二神 the Twelve【社区整理·较完整】

> 来源：`https://wiki.ffxiv-roleplayers.com/index.php?title=The_Twelve`（页面最后编辑 2016-04-18）
> **可信度**：社区维基，页面自带"需要补充引用"警示。但内容与游戏内已知设定高度吻合，可作为**待复核的完整骨架**。

## 4.1 十二神总表

【重要发现·历法规律】该社区页面在"信息框月份"与"正文月份"上表面矛盾（如 Menphina 信息框写 1st Umbral Moon，正文写「second moon」），
经核算可发现**统一规律**：艾欧泽亚历 12 个月由 **6 个星极月（Astral Moon）与 6 个灵极月（Umbral Moon）交替构成**，即
**第 N 星极月 = 第 (2N−1) 月；第 N 灵极月 = 第 2N 月**。以此对齐后十二神与月份全部自洽。✅（此为本文推算的结论，非页面原文）

| 中文名 | 英文名 | 性别 | 神格 | 守护城邦 | 属性 | 历法月 | 象征物 | 父母/亲属 |
|---|---|---|---|---|---|---|---|---|
| 哈罗妮 | **Halone, the Fury** | 女 | 战争 | **伊修加德** | 冰 | 第 1 星极月（第 1 月） | 三支枪 | 父 Rhalgr；兄 Byregot；与 Nophica 敌对 |
| 门菲娜 | **Menphina, the Lover** | 女 | 爱 | — | 冰 | 第 1 灵极月（第 2 月） | 满月 | 父 Althyk；姐 Azeyma；Oschon 的恋人 |
| 萨利亚克 | **Thaliak, the Scholar** | 男 | 知识 | **萨雷安** | 水 | 第 2 星极月（第 3 月） | 卷轴 | 女 Llymlaen；Nophica 之父；Byregot 之师 |
| 尼美亚 | **Nymeia, the Spinner** | 女 | 命运 | — | 水 | 第 2 灵极月（第 4 月） | 纺车 | 兄 Althyk；Rhalgr 之师 |
| 莉姆莱恩 | **Llymlaen, the Navigator** | 女 | 航海 | **利姆萨·罗敏萨** | 风 | 第 3 星极月（第 5 月） | 波浪 | 父 Thaliak；妹 Nophica |
| 奥修昂 | **Oschon, the Wanderer** | 男 | 流浪者 | — | 风 | 第 3 灵极月（第 6 月） | 手杖 | 兄 Nald'thal；Menphina 的恋人；Halone 的伴侣 |
| 拜尔丁 | **Byregot, the Builder** | 男 | 工艺 | — | 雷 | 第 4 星极月（第 7 月） | 手 | 父 Rhalgr；妹 Halone；Thaliak 之徒 |
| 拉尔格 | **Rhalgr, the Destroyer** | 男 | 破坏 | **阿拉米格** | 雷 | 第 4 灵极月（第 8 月） | 流星 | 子 Byregot、Halone；Nymeia 的侍从 |
| 阿泽玛 | **Azeyma, the Warden** | 女 | 探究/太阳 | — | 火 | 第 5 星极月（第 9 月） | 太阳 | 父 Althyk；妹 Menphina；女 Nophica |
| 纳德·萨 | **Nald'thal, the Trader** | 男 | 商业 | **乌尔达哈** | 火 | 第 5 灵极月（第 10 月） | 贝壳货币 | 兄/弟 Oschon；**双神 Nald 与 Thal 的合一显现** |
| 诺菲卡 | **Nophica, the Matron** | 女 | 丰饶 | **格里达尼亚** | 土 | 第 6 星极月（第 11 月） | 春叶 | 母 Azeyma；姐 Llymlaen；Halone 的敌对者 |
| 阿尔提克 | **Althyk, the Keeper** | 男 | 时间/空间 | — | 土 | 第 6 灵极月（第 12 月） | 沙漏 | 妹 Nymeia；女 Azeyma、Menphina |

### 4.1.1 十二神相关重要设定点

- **纳德·萨（Nald'thal）是"双神合一"**：Nald 统治生者世界，Thal 统治死者世界。乌尔达哈城内有两座大殿分别供奉其两面：**Arrzaneth Ossuary（塔尔之殿，咒术士行会所在）** 与 **Milvaneth Sacrarium（纳德之殿）**。
  → 这与沙蝎众成员「Dewlala 是 Milvaneth Sacrarium 的 Prior（住持）」相互印证。
- **十二神与蛮神（Primals）不同**：十二神是艾欧泽亚的**守护神**，不是被召唤的蛮神。6.0 的 24 人 Raid 系列 **Myths of the Realm** 首次正面处理十二神的起源与结局。
  【官方·6.0】「Since time immemorial, a pantheon of gods known as **the Twelve** has presided over the land of Eorzea. Faith in these divine beings permeates all facets of life... Now, the quest begins to discover **how their tale began─and perhaps how it shall end**.」
  —— https://na.finalfantasyxiv.com/endwalker/patch_6_0/
- ⚠️ 任务描述中的「The Watcher 监视者」「the Omphalos」属 6.x「Myths of the Realm」剧情，本次**未能取得官方引文**。任务描述里「十二神的解散（the Twelve's dissolution）」为公认剧情（6.5 结局），但需复核。
- ⚠️ **重要更正**：任务描述中提到的「四圣兽 Four Lords」为 **4.x 支线试炼系列**（Genbu 玄武、Byakko 白虎、Suzaku 朱雀、Seiryu 青龙），**与十二神无关**，是**东方（多玛/北洋）体系**的守护神兽。任务描述里的「蓝青龙?」应为**青龙 Seiryu（苍/蓝之青龙）** 的误记——四圣兽中只有一位青龙。

---

# 第五部分：城邦与国家（社区整理 + 待核）

> 本部分主要来源为 `wiki.ffxiv-roleplayers.com`（**2013–2019 年版，注明"This page will be updated come 2.0"**，即**多数内容停留在 1.0/2.0 之前**）。
> ⚠️ **可信度警告**：以下内容可能与当前 7.x 版本设定有出入，特别是人名、头衔与政治结构。**务必复核。**

## 5.1 伊修加德 Ishgard【社区整理】

### 5.1.1 四大名门（High Houses）——**任务要求核实项，已核实**

【社区】`https://wiki.ffxiv-roleplayers.com/index.php?title=Ishgard`：
> "They also have four noble **'High Houses'**, and their nation's flag depicts the symbol of each house:
> - Rose: House of **Haillenarte**
> - Bell: House of **Durendaire**
> - Unicorn: House of **Fortemps**
> - Tower/Rook: House of **Dzemael**"

**→ 结论：任务描述中给出的四家名单（Fortemps 福尔唐 / Durendaire 当特尔 / Haillenarte 欧谢尔 / Dzemael 泽梅尔）✅ 正确。**
任务描述中重复出现的"当特尔?"是重复填写，实际第四家为 **Dzemael（泽梅尔）**。

| 中文名 | 英文名 | 家徽 | 关键成员 | 说明 |
|---|---|---|---|---|
| 福尔唐家 | **House Fortemps** | 独角兽 Unicorn | 艾德蒙·德·福尔唐 Count Edmont de Fortemps（【官方】Heavensward Key Characters）；Artoirel、Emmanellain ⚠️ | 3.0 庇护拂晓血盟 |
| 当特尔家 | **House Durendaire** | 钟 Bell | ⚠️ | — |
| 欧谢尔家 | **House Haillenarte** | 玫瑰 Rose | **Francel de Haillenarte**（【官方】5.31 伊修加德复兴） | 主导天钢机工团与迪亚德姆探索 |
| 泽梅尔家 | **House Dzemael** | 塔/城 Rook | ⚠️ | 与地下要塞 **Dzemael Darkhold** 相关 |

### 5.1.2 伊修加德政体与组织

【社区】「Ishgard is a strict **theocracy** led by a fearsome **archbishop**.」（严格的神权政体，由**大主教**领导）
【官方】Heavensward Key Characters 中列出的伊修加德方关键角色为：
**Ysayle（伊赛勒）**、**Aymeric（艾默里克）**、**Count Edmont de Fortemps（艾德蒙·德·福尔唐伯爵）**、**Estinien（埃斯蒂尼安）**、**Archbishop Thordan VII（大主教托尔丹七世）**
—— https://na.finalfantasyxiv.com/heavensward/

| 中文名 | 英文名 | 种族 | 所属 | 定位 | 剧情作用 |
|---|---|---|---|---|---|
| 托尔丹七世 | **Archbishop Thordan VII** | 精灵族 Elezen | 伊修加德 | 大主教（神权领袖） | 【官方】HW Key Character；龙诗战争核心反派 |
| 艾默里克·德·博雷尔 | **Aymeric de Borel** | 精灵族 Elezen | 伊修加德 | 神殿骑士团总帅 ⚠️ | 【官方】HW Key Character；改革派领袖 |
| 艾德蒙·德·福尔唐 | **Count Edmont de Fortemps** | 精灵族 Elezen | 福尔唐家 | 伯爵 | 【官方】HW Key Character；庇护拂晓血盟 |
| 伊赛勒 | **Ysayle** | 精灵族 Elezen（女） | 异端者 | 「冰之巫女 Lady Iceheart」⚠️ | 【官方】HW Key Character |
| 埃斯蒂尼安 | **Estinien** | 精灵族 Elezen | 神殿骑士团/龙骑士 | 苍天之龙骑士 | 【官方】HW Key Character |
| 弗兰塞尔·德·欧谢尔 | **Francel de Haillenarte** | 精灵族 Elezen | 欧谢尔家 | 年轻领主 | 【官方】5.31 主导重建「天顶 Firmament」 |
| 尼德霍格 | **Nidhogg** | 龙族（第一支族） | — | 龙诗战争的龙方核心 | 【官方】HW「The First Brood」 |
| 赫拉斯瓦尔格 | **Hraesvelgr** | 龙族（第一支族） | — | 尼德霍格之兄 | 【官方】HW「The First Brood」 |
| 布莱尔迪安 | **Briardien** | ⚠️ | 圣恩达利姆神学院 | 调查官 | 【官方】3.5 支线 |
| （苍穹骑士团） | **the Heavens' Ward** | 精灵族 Elezen | 伊修加德 | 大主教亲卫 | ⚠️ 本次无官方引文 |

> ⚠️ **任务描述要求核实的项目**：
> - **「异端审问局」**：伊修加德确有**异端审问官（Inquisitor）** 制度（属教皇厅），但本次**未能取得官方或社区来源的正式机构名**。⚠️ 需复核。
> - **「苍穹」**：应指 **苍穹骑士团 the Heavens' Ward**（大主教直属亲卫），而非独立机构。
> - **「幻术皇厅」**：⚠️ 未能证实此名。格里达尼亚的对应机构应为**幻术士行会（Conjurers' Guild）** 与 **Seeder 议会**；"幻术皇"（Elder Seedseer）是**卡恩·艾·森娜的个人头衔**，非机构。
> - **「炼金术士行会」**：位于**乌尔达哈**的 **Frondale's Phrontistery（弗隆戴尔学院）**（【社区】见 5.2）。⚠️ 拉札罕亦以炼金术闻名（【官方】Endwalker）。
> - **「天钢机工团 Skysteel Manufactory」**：【官方】确认存在——Heavensward 机工士职业设定原文：「Following the example of Cid Garlond... the **Skysteel Manufactory** works tirelessly on the development of advanced armaments.」（https://na.finalfantasyxiv.com/heavensward/）

## 5.2 乌尔达哈 Ul'dah【社区整理·**任务要求核实项**】

### 5.2.1 沙蝎众 Syndicate——**六大家族/成员，已取得社区名单**

【社区】`https://wiki.ffxiv-roleplayers.com/index.php?title=Ul%27dah`（2014 年版）：
> "the **Syndicate**, an elite group of **six** of the most influential and richest members of society."
> "The current members of the Syndicate are as follows;
> - Chairman **Lord Lolorito** of the **East Aldenard Trading Company**（东阿尔迪纳德贸易公司）
> - Prince **Teledji Adeledji** of the **Mirage Trust**（密拉奇信托）
> - Director **Eolande** of **Frondale's Phrontistery**（弗隆戴尔学院）— **died in Calamity, replaced by Godbert**
> - Prior **Dewlala** of **Milvaneth Sacrarium**（米尔德尼斯神殿）
> - Chief Foreman **Fyrgeiss** of **Amajina & Sons Mineral Concern**（阿玛吉纳父子矿业）
> - Lord **Godbert Manderville**
> - Flame General **Raubahn Aldynn**, ex-champion of the Coliseum"

**→ 核实结论：**

| 项目 | 结论 |
|---|---|
| 沙蝎众席位数 | **6 席** ✅（社区与设定一致） |
| 六个席位当前占据者 | **Lolorito、Teledji Adeledji、Godbert Manderville、Dewlala、Fyrgeiss、Raubahn Aldynn** |
| Eolande | **第七灵灾中死亡**，其席由 **Godbert Manderville** 接任 —— 因此名单列出 7 人但只有 6 席。 |
| **「罗薇娜 Rowena」是否为沙蝎众？** | ❌ **不是**。罗薇娜是「罗薇娜的珍宝馆 Rowena's House of Splendors」主理人（【官方】5.3 页确认其店铺存在），**不是沙蝎众成员**。任务描述中的猜测「乌尔、娜莫、罗薇娜」**不成立**。 |
| **「乌尔」「娜莫」家族** | ⚠️ 该社区页面**未把 Ul 家/Nam(o) 家列为沙蝎众席位**，而是说明「Historically, it is the **sultan** who claims sovereignty over Ul'dah, but **true power is wielded by the Syndicate**」——即**王族（Ul 家）与沙蝎众是并行的两个权力中心**。娜娜莫·乌尔·娜莫作为苏丹娜**主持**沙蝎众，但社区页面未将其算作六席之一。⚠️ 这一点与部分玩家认知不同，**必须复核**（可能有"苏丹娜即第七席/当然议长"的设定）。 |
| 沙蝎众内部派系 | 【社区】「Among the Syndicate is a group of **anti-royal** members... they appear to oppose both the Sultana's rule as well as Raubahn Aldynn, who is loyal to the Sultana. It is unknown who among the Syndicate are **monetarists**.」→ 即**保王派 vs 货币主义派（Monetarists）** 的对立。 |

### 5.2.2 乌尔达哈相关人物与机构表

| 中文名 | 英文名 | 种族 | 所属 | 定位 | 来源等级 |
|---|---|---|---|---|---|
| 娜娜莫·乌尔·娜莫 | **Nanamo Ul Namo** | 拉拉肥 Lalafell（沙丘之民 Dunesfolk）⚠️ | 乌尔达哈王族 | 苏丹娜 Sultana | ⚠️【待核】（本次未取得官方引文） |
| 劳班·阿尔丁 | **Raubahn Aldynn** | 人族 Hyur（高地之民 Highlander）⚠️ | 恒辉队 | **焰之将军 Flame General**、斗技场前冠军 | 【社区】+ ⚠️ |
| 罗薇娜 | **Rowena** | 拉拉肥 Lalafell ⚠️ | 罗薇娜珍宝馆 | 商人 | 【官方】（店铺名在 5.3 页） |
| 洛洛里托·纳纳里托 | **Lolorito Nanarito** | 拉拉肥 Lalafell | 东阿尔迪纳德贸易公司 | 沙蝎众议长 | 【社区】 |
| 泰勒吉·阿德雷吉 | **Teledji Adeledji** | 拉拉肥 Lalafell | 密拉奇信托 | 沙蝎众成员 | 【社区】+ ⚠️ |
| 戈德伯特·曼德维尔 | **Godbert Manderville** | 人族 Hyur（高地之民）⚠️ | 曼德维尔金碟 | 沙蝎众成员 | 【官方·间接】（6.4 页提及 "Lord Godbert" 与 Manderville Weapons） |
| 德乌拉拉 | **Dewlala Dewla** | 拉拉肥 Lalafell | 米尔德尼斯神殿 | 沙蝎众成员、Nald 神殿住持 | 【社区】 |
| 菲尔斯盖斯 | **Fyrgeiss** | 罗格艾丁 Roegadyn ⚠️ | 阿玛吉纳父子矿业 | 沙蝎众成员、总工头 | 【社区】 |
| 埃奥兰德 | **Eolande** | ⚠️ | 弗隆戴尔学院 | 前沙蝎众成员（灵灾中死亡） | 【社区】 |
| 穆莫迪 | **Momodi Modi** | 拉拉肥 Lalaffel | 沙之都（Quicksand） | 酒馆老板娘、冒险者行会接待 | 【社区】 |
| — | **Immortal Flames（恒辉队）** | — | 乌尔达哈大军团 | 乌尔达哈的 Grand Company | ⚠️（名称由官方 Lodestone 确认） |
| — | **Syndicate（沙蝎众）** | — | 乌尔达哈 | 六人寡头议会 | 【社区】 |

**乌尔达哈城内机构（【社区】）**：
- **Gate of Nald / Gate of Thal**（纳德门 / 塔尔门）
- **Heaven's Shard**（天晶宫，王宫）
- **The Gold Court**（黄金庭园）
- **The Quicksand**（沙之都，冒险者酒馆）+ **The Hourglass**（旅店）
- **Platinum Mirage**（白金幻影，赌场/娱乐）+ **Pugilists' Guild**（拳斗士行会）
- **The Coliseum**（斗技场）+ **Gladiators' Guild**（剑斗士行会）
- **Arrzaneth Ossuary**（阿尔扎内斯纳骨堂）+ **Thaumaturges' Guild**（咒术士行会）
- **Frondale's Phrontistery**（弗隆戴尔学院）+ **Alchemists' Guild**（炼金术士行会）
- **Amajina & Sons Mineral Concern**（阿玛吉纳父子矿业）+ **Miners' Guild**（矿工行会）
- **Sunsilk Tapestries**（日丝织造）+ **Weavers' Guild**（裁缝行会）
- **Milvaneth Sacrarium**（米尔德尼斯神殿，Nald 之殿）
- **Eshtaime's Lapidaries**（埃什泰姆宝石工房）+ **Goldsmiths' Guild**（雕金匠行会）
- **Ashgana's Exporters**（阿什加纳输出商）

## 5.3 格里达尼亚 Gridania【社区整理】

【社区】`https://wiki.ffxiv-roleplayers.com/index.php?title=Gridania`（2013 年版）：
> "Gridania is by far the most unified of the city-states. Its guilds all work in cooperation with each other under the guided hand of **Kan-E-Senna, who brought back the Order of the Twin Adder**."
> "The Gridanian emphasis on natural harmony has led to its preeminence among Eorzea's city-states in trades such as **forestry, agriculture, carpentry, and leatherworking**. Gridania is also home to the **Wood Wailers**, a militant band of **polearm-wielding sentries** charged with the protection of their homeland."
> "The favored goddess of the citizenry is **Nophica, the Matron**, but great faith is also placed in the wisdom of the **Seedseers**—young oracles who guide the nation based on the will of the forest's **elementals**."

**关键设定点（【社区】）**：
- **卡恩·艾·森娜 Kan-E-Senna**：官方 Lodestone 与 2.x 剧情确认其为**幻术皇（Elder Seedseer）**，并**重建了双蛇党**。⚠️ 本次未取得官方引文。
- **双蛇党 Order of the Twin Adder**：格里达尼亚的 Grand Company。✅ 名称由官方 Lodestone 角色搜索页确认（"Order of the Twin Adder"）。
- **Wood Wailers（森之守卫）**：持长柄武器的民兵哨兵组织。
- **Seedseers（播种者/预言者）**：依据森之**元素精灵（elementals）** 的意志引导国家的年轻神谕者。
- **Padjal（帕贾尔）种族**：⚠️ 社区导航有该分类，但本页未展开。
- **元素精灵与「木怒 woodsin / woodwrath」**：森林中的元素精灵会操控林中生物攻击外来者；一道名为 **the Hedge（篱笆）** 的屏障保护外来者不受此侵扰；屏障偶有失效，受"木怒"影响者需通过**仪式之舞**净化。
- **艾·森娜家族（Senna family）**：⚠️ 本次**未能取得**关于该家族结构、成员（如任务描述中的「帕帕夏?」）的任何来源。**「帕帕夏」无法证实**。

## 5.4 利姆萨·罗敏萨 Limsa Lominsa【社区整理】

【社区·间接】`https://wiki.ffxiv-roleplayers.com/index.php?title=The_Twelve`（Llymlaen 条目）：
> "Legend holds that **Limsa Lominsa** was founded shortly after the remnants of a giant **armada** fled its homeland following a crushing defeat. **Llymlaen** is said to have taken pity on the plight of these brave sailors, and guided them to the shallows of a rocky bay where their ships were grounded upon the sharp rocks. With no home to return to, the sailors chose to settle in this newly-found land."

**关键设定点**：
- 守护神：**莉姆莱恩 Llymlaen, the Navigator**（航海女神）✅【社区】
- **提督梅尔维布·布罗非斯文 Merlwyb Bloefhiswyn**：⚠️ 本次**未取得任何来源**（`Limsa_Lominsa` 页面抓取失败）。
- **黑涡团 Maelstrom**：✅ 名称由官方 Lodestone 角色搜索页确认。
- **黄衫队 Yellowjackets**：⚠️ 未能证实。
- **四大海盗团**：⚠️ **完全未能证实**。任务描述中列举的候选（Knights of the Barracuda / Bloody Executioners / Sanguine Sirens / Serpent Reavers）**本次无任何来源支持**，其中 Serpent Reavers 更接近蛮神利维亚桑的信徒组织（Sahagin 相关）。**此条必须复核，勿采信。**
- 【社区·间接】"Faces of Mercy" 与 **Maelstrom** 有联系（见 Ishgard 页）。

## 5.5 阿拉米格 Ala Mhigo【社区整理】

【社区】`https://wiki.ffxiv-roleplayers.com/index.php?title=Ala_Mhigo`：
> "The highlands of **Gyr Abania** in the eastern reaches of Aldenard were once under the control of a martial nation known as Ala Mhigo... Even as this aggressive nation sent its forces to conquer in the west, it repelled repeated attempts at invasion from the east. **In the Year 1557 of the Sixth Astral Era, however, it finally fell to the incursions of the Garlean Empire.**... Though the people of Ala Mhigo once revered **Rhalgr, the Destroyer**, as their patron deity, any such religious observance has since been forbidden by the controlling authorities."

【官方·4.0】Ala Mhigo 的城市设定：
> "An occupied city-state located in a mountainous region of eastern Aldenard. The nation was plunged into chaos **twenty years ago** when its masses rose up in rebellion against the tyranny of the **mad king Theodoric**. However, unbeknownst to many, it was none other than the **Garlean Empire** that had been pulling the strings from the shadows the entire time."
> —— https://na.finalfantasyxiv.com/stormblood/story/

【官方·4.0】Gyr Abania：
> "...the area was known for its **strict devotion to the deity Rhalgr**. This changed, however, after the occupation as **the area's temples were laid to waste**."
> —— 同上

| 中文名 | 英文名 | 种族 | 所属 | 定位 | 来源等级 |
|---|---|---|---|---|---|
| 康拉德·肯普 | **Conrad Kemp** | 人族 Hyur（高地之民）⚠️ | 阿拉米格抵抗组织 | 抵抗军领袖 | ⚠️【待核】本次未取得来源 |
| 莉瑟·海克斯特 | **Lyse Hext** | 人族 Hyur | 拂晓血盟 → 阿拉米格 | 革命领袖 | ✅【官方】 |
| 芙朵拉·雷姆·卢普斯 | **Fordola rem Lupis** | 人族 Hyur（女） | 加雷马帝国阿拉米格部队 | 帝国协力者 | ✅【官方】 |
| 疯狂王西奥多里克 | **Theodoric the Mad** | 人族 Hyur ⚠️ | 阿拉米格（旧王） | 暴君 | ✅【官方】（4.0 页） |
| 伊尔贝尔德·菲尔 | **Ilberd Feare** | 人族 Hyur（高地之民）⚠️ | 抵抗组织 → 独立行动 | 「狮鹫 The Griffin」 | ✅【官方·间接】（3.5 页） |

【官方·4.0，Fordola 条目】：
> "A young soldier **born and raised during the imperial occupation of Ala Mhigo**, Fordola was promised the world─education, training, citizenship─in exchange for service. **Scorned as traitors by their people and savages by their Garlean masters**, she and others like her struggle to forge their own path in an unforgiving world."

【官方·3.5】关于伊尔贝尔德（以"狮鹫"之名）：
> "**The Griffin** has played his final hand. By harnessing the wrath and despair of his dying countrymen did he give form to a new divinity; by the power of **Nidhogg's eyes** and his own mortal demise did he give it life. Only through the swift and desperate action of an Archon was the primal sealed away..."
> —— https://na.finalfantasyxiv.com/pr/special/3_5_The_Far_Edge_Of_Fate/

> ⚠️ 任务描述中的「莱恩?」「梅芙?」**无法证实**。「拉尔格之拳 Fist of Rhalgr」（阿拉米格的武僧组织）⚠️ 未能取得来源。

## 5.6 多玛 Doma 与北洋 Hingashi【官方·4.0 为主】

【官方·4.0，全部来自 https://na.finalfantasyxiv.com/stormblood/story/】

| 中文名 | 英文名 | 种族 | 所属 | 定位 | 剧情作用 |
|---|---|---|---|---|---|
| 飞燕 | **Hien** | 人族 Hyur（东方系）⚠️ | 多玛 | 多玛王位继承人 | 「a charismatic leader beloved of his people」；领导反加雷马起义；起义被镇压后失踪 |
| 五郎 | **Gosetsu** | 人族 Hyur（**罗格艾丁体型**？官方未明示）⚠️ | 多玛 | 武士、忠臣 | 「has long served Doma and her sovereign, and fought valiantly to defend them from the Garlean Empire **twenty-five years ago**」 |
| 尤吉里·米斯特沃克 | **Yugiri Mistwalker** | 奥拉 Au Ra（Raen）⚠️ | 多玛 | 忍者 shinobi | 起义失败后奉主君之命率多玛民众渡海至艾欧泽亚避难 |
| 夜露 | **Yotsuyu** | 人族 Hyur（女，东方系）⚠️ | 加雷马帝国 | 多玛代理总督 | 「grace and beauty belie a heart of stone... a cruel, sadistic ruler... perpetrated numerous atrocities against **her own people**」 |
| 阿萨希·萨斯·布鲁图斯 | **Asahi sas Brutus** | 加雷马族 ⚠️ | 加雷马帝国 | 夜露之弟 ⚠️ | ⚠️ 本次未取得来源 |
| 芝诺斯·耶·加尔乌斯 | **Zenos yae Galvus** | 加雷马族 | 加雷马帝国**第十二军团** | 军团长、皇太子 | 「possessed of but a single passion: to stand on the front lines, blade in hand, and dance with death」；镇压多玛起义时爱上东方刀 |

【官方·4.0】地理设定：
- **多玛 Doma**：「Upon the eastern banks of Othard lies Doma, the lands from which the **ninja and samurai** hail. Invaded **twenty-five years ago** by the Garlean Empire... In the wake of a recent large-scale uprising that ended in failure, a majority of the civilians have been **stripped of even their most fundamental freedoms**.」
- **延夏 Yanxia**：One River（一之川）沿岸，多玛城现为帝国总督驻地。
- **碧海 Ruby Sea**：分隔奥萨德与北洋，由 **Confederacy（海盗众/同盟）** 控制，栖息着**甲人族 Kojin**。
- **黄金港 Kugane**：北洋唯一对外开放的港口。
- **阿兹姆草原 Azim Steppe**：奥拉族祖先之地；**Xaela** 游牧民族分 **50 个部族**，崇拜**黎明之父 Azim 与黄昏之母 Nhaama**。

> ⚠️ 任务描述中的「月读/尤尤哈提」**无法证实**。可能与"夜露 Tsuyu/Yotsuyu"混淆；「月读 Tsukuyomi」是 4.x 试炼中夜露所化蛮神之名 ⚠️（需复核）。

## 5.7 加雷马帝国 Garlemald【社区整理 + 官方】

【社区】`https://wiki.ffxiv-roleplayers.com/index.php?title=Garlemald`（2013 年版）：
> "Founded in the year **1521 of the Sixth Astral Era**, the Garlean Empire is a massive, technologically advanced nation located northeast of Eorzea on the continent of **Ilsabard**. It was once a small **republic**... that all changed overnight as a brilliant young **Legatus** introduced a powerful new technology to the republic's military - **Magitek**. The republic's territory began to expand by leaps and bounds, and before long the people of Garlemald almost unanimously **elected Solus zos Galvus as dictator**... **Solus zos Galvus disbanded the Republic of Garlemald** and erected in its place an **Imperial Regime**, naming himself **first emperor**."
> "...In the year **1557**, a mere thirty-six years from the Empire's founding, the Garleans brought their campaign of conquest to Eorzea, swiftly bringing the city-state of **Ala Mhigo** to its knees... In the year **1572**, however, the Garlean army once again began its inexorable advance. Using the calamitous arrival of the **Seventh Umbral Era** to sinister advantage... Though the advent of the Seventh Umbral Era all but obliterated the **VIIth Imperial Legion** of Garlemald..."

> ⚠️ **该页存在内部矛盾**：「建立于 1521 年」与「1521 年解散共和、建立帝国」同一年，逻辑不通。**必须复核**。另有说法为共和建立于 1517 年、帝国成立于 1521 年。**勿直接引用年份。**

| 中文名 | 英文名 | 种族 | 所属 | 定位 | 来源等级 |
|---|---|---|---|---|---|
| 索鲁斯·佐斯·加尔乌斯 | **Solus zos Galvus** | 加雷马族 Garlean | 加雷马帝国 | **开国皇帝**；真身为无影**爱梅特赛尔克 Emet-Selch** | ✅【官方】（Shadowbringers Key Characters） |
| 瓦里斯·耶·加尔乌斯 | **Varis yae Galvus** | 加雷马族 | 加雷马帝国 | 皇帝（索鲁斯之孙） | ✅【官方】（6.0 页：被芝诺斯所弑） |
| 芝诺斯·耶·加尔乌斯 | **Zenos yae Galvus** | 加雷马族 | 第十二军团 | 军团长、皇太子 | ✅【官方】 |
| 加伊乌斯·范·巴埃萨 | **Gaius van Baelsar** | 加雷马族 | 帝国（前）→ 独立 | 前军团长 | ✅【官方·间接】（5.3 页「The Sorrow of Werlyt」） |
| 马克西马·库奥·普里斯克斯 | **Maxima quo Priscus** | 加雷马族 | **Populares（平民派）** | 改革派 | ⚠️ 本次未取得来源 |
| 露琪亚·尤尼乌斯 | **Lucia junius** | 加雷马族 | 伊修加德（归化） | 艾默里克的副官 | ⚠️ 本次未取得来源 |
| — | **Populares（平民派）** | — | 加雷马帝国 | 帝国国内的平民派/改革派 | ⚠️ 未能证实 |
| — | **VIIth / XIIth / XIVth Imperial Legion** | — | 加雷马帝国 | 帝国军团编制 | ✅【社区/官方】VII 团、XII 团、XIV 团均有出现 |

【官方·5.0】对索鲁斯的定义（极重要）：
> "**The founder of the Garlean Empire**, for whom even death presents no obstacle. For centuries he has worked from the shadows, sowing the seeds of war in order to trigger calamities and thereby **rejoin the worlds that were once divided**. With Norvrandt on the brink of lucent oblivion, to what end has he chosen to take center stage?"
> —— https://na.finalfantasyxiv.com/shadowbringers/story/
> → **官方在此明确：加雷马开国皇帝索鲁斯 = 无影，其目的是制造灵灾以促成世界融合（Rejoining）。**

【官方·6.0】关于芝诺斯：
> "Zenos took his own life after falling to the hero of Ala Mhigo's liberation, but even death proved unable to claim his unquenchable soul. He has since arisen, **slaying his father, Emperor Varis**, and **reducing the capital city of Garlemald to ruin** in single-minded pursuit of his heart's one and only desire."
> —— https://na.finalfantasyxiv.com/endwalker/patch_6_0/

【官方·6.0】加雷马都城设定（Endwalker）：
> "Despite being situated on the frozen plains of northern Ilsabard, the imperial capital overcame the natural disadvantages of its location... with the power of **magitek**... until the sprawling metropolis was brought to its knees by **civil war**. Now, the once-proud jewel of the Empire is **a sea of desolation**."
> —— 同上

## 5.8 拉札罕 Radz-at-Han 与萨维奈 Thavnair【官方】

【官方·6.0】拉札罕：
> "This bustling city on the **Near Eastern isle of Thavnair** is renowned as a prosperous **trading hub** and the **birthplace of alchemy**. Over the course of its storied history, it has produced countless influential figures and ingenious creations that have since made their ways to distant shores. Perched atop a massive pillar of rock, its ornate buildings boast vibrant hues..."
> —— https://na.finalfantasyxiv.com/endwalker/patch_6_0/

【官方·6.0】萨维奈：
> "In the Bounty's southeastern waters lies the isle of Thavnair, where tropical coastline soon gives way to dense rainforest... The region is known as a rich source of the magically infused stone **giantsgall**..."
> —— 同上

【官方·6.0】原住民与蛮神：
> **Arkasodara**：「Like the other **Matanga** peoples, the Arkasodara resemble the great marid both in appearance and brawn. They are indigenous to the isle of Thavnair, and **founded the city-state of Radz-at-Han together with Au Ra and Hyur migrants**.」
> **The Magus Sisters（三姐妹）**：「A trinity of gods long revered by the people of Thavnair. **Cinduruva**, the eldest, is said to be the bearer of **wisdom**, **Sanduruva** that of **prosperity**, and **Minduruva**, the youngest, **ingenuity**.」
> —— 同上

| 中文名 | 英文名 | 种族 | 所属 | 定位 | 来源等级 |
|---|---|---|---|---|---|
| 弗栗多 | **Vrtra** | 龙族（第一支族） | 拉札罕 | 实际统治者（以人偶瓦尔莎汗现身） | ✅【官方·间接】（6.2 页） |
| 瓦尔莎汗 | **Varshahn** | 人偶（龙之化身） | 拉札罕 | 弗栗多的现世人偶 | ⚠️【待核】6.2 页未直接出现该名 |
| 阿赫万 | **Ahewann** | 人族 Hyur ⚠️ | 拉札罕 | 萨特拉普 Satrap（名义统治者） | ⚠️【待核】 |
| 尼达纳 | **Nidhana** | ⚠️ | 拉札罕 | 炼金术士 / 阿卡索达拉 | ⚠️【待核】 |
| — | **Radiant Host** | — | 拉札罕 | 拉札罕的军事力量 | ⚠️ 未能证实 |
| 三姐妹 | **Cinduruva / Sanduruva / Minduruva** | — | 萨维奈 | 古代三女神 | ✅【官方】 |
| 阿卡索达拉 | **Arkasodara** | 曼坦加 Matanga | 萨维奈 | 拉札罕建城三族之一 | ✅【官方】 |
| 卢波里特 | **Loporrits** | — | 月球 | 月球住民（与"命名威"传说相关） | ✅【官方】 |

> ⚠️ 任务描述中「瓦尔莎汗 Varshahn/Estinien?」为**误记**：Varshahn 是**弗栗多（Vrtra）** 的人偶化身，**与埃斯蒂尼安无关**。埃斯蒂尼安在 6.x 曾与弗栗多同行，但二者身份不同。

---

# 第六部分：其它重要组织

## 6.1 巴尔德西昂委员会 Students of Baldesion

| 中文名 | 英文名 | 种族/类别 | 所属 | 定位 | 剧情作用 |
|---|---|---|---|---|---|
| 巴尔德西昂委员会 | **Students of Baldesion** | 多民族学术结社 | 萨雷安圈 | 调查·保管·研究 | 6.0 后成为拂晓血盟的新据点与「学术外壳」 |
| 巴尔德西昂分馆 | **Baldesion Annex** | 建筑/据点 | 旧萨雷安 | 委员会据点 | ✅【官方】6.1「Myths of the Realm」委托送达地 |
| 加尔夫·巴尔德西昂 | **Galuf Baldesion** | 人族（萨雷安人）⚠️ | 委员会创设者 | 会长/导师 | ✅【官方】Dawntrail 页称其为机构"**late founder**" |
| 可露儿·巴尔德西昂 | **Krile Baldesion** | 拉拉肥 Lalafell | 委员会 + 拂晓血盟 | 核心成员 | ✅【官方】加尔夫之**养孙女**；双组织成员 |
| 瓦岛 | **Isle of Val** | 地名 | 北洋 | 委员会总部 | 总部随岛覆灭，组织解体 ⚠️（时间与原因未验证） |
| 乌内·塔尤 | **Unukalhai** | 人族 ⚠️ | 前委员会相关 | 调查员 | 与第十三世界/虚无界线索相关 ⚠️ |

**组织关系（6.0 之后）**——【官方可直引的表述】：
> 「Belonging to **both the Scions of the Seventh Dawn and the Students of Baldesion**...」（Krile 条目）
> —— https://na.finalfantasyxiv.com/dawntrail/story/

> 「...a certain request would arrive at the **Baldesion Annex**─and set you upon the path to the heart of the myth...」
> —— https://na.finalfantasyxiv.com/endwalker/patch_6_1/

⚠️ **关键提醒**：官方文本只支持「**人员交叉任职**」与「**分馆作为据点为拂晓所用**」。
**官方从未使用「合并 / absorbed / merged」的措辞**。任务描述所说「6.0 后的组织状态（巴尔德西昂委员会合并）」属于**推断，不应作为已确认事实**。可表述为：
- (a) **人事合一**：可露儿等原委员会成员同时为拂晓血盟正式成员；
- (b) **职能互补**：拂晓负责战斗与外交，委员会负责调查、文献与保管；
- (c) **法人外壳**：在萨雷安以「学生结社」名义活动比「外国武装组织」更容易；
- (d) **知识传承**：委员会继承加尔夫的古代人研究资料，服务于 6.x 十二神调查与 7.x 新谜题。

## 6.2 水晶义勇队 Crystal Braves（已覆灭）⚠️

| 中文名 | 英文名 | 种族/类别 | 所属 | 定位 | 剧情作用 |
|---|---|---|---|---|---|
| 水晶义勇队 | **Crystal Braves** | 多国混编武装 | 名义独立，实受乌尔达哈财阀牵制 | 国际治安联合部队 | 2.x 成立，2.55 背叛并瓦解 |
| 阿尔菲诺·莱韦耶勒尔 | **Alphinaud Leveilleur** | 精灵族 Elezen | 拂晓血盟 | 创立者·总帅 | 少年理想的具现与坟墓 |
| 伊尔贝尔德·菲尔 | **Ilberd Feare** | 人族 Hyur（阿拉米格人）⚠️ | 义勇队干部 → 独立行动 | 双面人 | 背叛执行者；3.5 化名「狮鹫 The Griffin」 |
| 财阀派 | **the Monetarists** | 政治派系 | 乌尔达哈 | 金权政治势力 | 操纵义勇队人事与资金 |
| 洛洛里托·纳纳里托 | **Lolorito Nanarito** | 拉拉肥 Lalaffel | 财阀派首领 | 商会巨头 | 幕后操盘者之一 ⚠️ |
| 泰勒吉·阿德雷吉 | **Teledji Adeledji** | 拉拉肥 Lalafell | 财阀派 | 富商 | 2.55 宴会上被杀，成为政变引信 ⚠️ |

**剧情**：水晶义勇队是阿尔菲诺在 2.x 倡议组建的跨国治安部队，理念是把各城邦警备力量整合，以应对蛮神与帝国威胁。1.0/2.0 设定强调阿尔菲诺是萨雷安最高学府 **Studium 史上最年轻的入学者**（【官方】Shadowbringers 页），这份「天才少年」的自我认知正是悲剧的伏笔。

⚠️ **重要诚实说明**：**本次调研未能在任何可访问来源中取得水晶义勇队 / 2.55「The Parting Glass」/ 伊尔贝尔德背叛的官方页面正文。**
以上内容仅有**社区共识**支撑（且 `ff14.huijiwiki.com` 存在「水晶义勇队」条目标题，但正文 403 无法读取）。**任务描述中「2.x 被诬陷」的具体机制、被谁诬陷、敏菲利亚被掳的经过，本文无法证实，需在正常网络下用 fandom / consolegameswiki 复核。**

【官方·间接·可用的唯一硬证据】3.5 官方页对「狮鹫」的描写（即伊尔贝尔德）：
> "**The Griffin** has played his final hand. By harnessing the wrath and despair of his dying countrymen did he give form to a new divinity; by the power of **Nidhogg's eyes** and his own mortal demise did he give it life. Only through the swift and desperate action of an Archon was the primal sealed away..."
> —— https://na.finalfantasyxiv.com/pr/special/3_5_The_Far_Edge_Of_Fate/

## 6.3 无影 Ascians

| 中文名 | 英文名 | 种族/类别 | 所属 | 定位 | 剧情作用 |
|---|---|---|---|---|---|
| 无影 | **Ascians** | 古代人（不灭以太存在） | 佐迪亚克阵营 | 幕后反派 | 引发灵灾、促成映像世界融合 |
| 拉哈布雷亚 | **Lahabrea** | 古代人 | 十四人委员会 | **议长 The Speaker** | 2.0 主线主要反派 |
| 艾里迪布斯 | **Elidibus** | 古代人 | 十四人委员会 | **调停者 The Emissary** | 佐迪亚克的核心；5.3 主要对手 |
| 艾梅特塞尔克（哈迪斯） | **Emet-Selch** | 古代人 | 十四人委员会 | **第三席** | 5.0 主要对手；真身为索鲁斯·佐斯·加尔乌斯 |
| 法丹尼尔 | **Fandaniel** | 古代人 | 十四人委员会 | 席位名 | 6.0 主要推动者之一 |
| 那布里亚勒斯 | **Nabriales** | 古代人 | 无影 | 席位名 | 2.x 入侵石之家，被消灭 ⚠️ |
| 伊格约尔姆 | **Igeyorhm** | 古代人 | 无影 | 席位名 | 与拉哈布雷亚协同 ⚠️ |
| 母之语 | **the Word of the Mother** | 海德林造物 | 海德林阵营 | 传令者 | 以敏菲利亚形态传达海德林意志 ⚠️ |

【官方·强证据】无影的动机（Shadowbringers 页对索鲁斯的介绍）：
> "The founder of the Garlean Empire, for whom even death presents no obstacle. For centuries he has worked from the shadows, sowing the seeds of war in order to trigger calamities and thereby **rejoin the worlds that were once divided**."
> —— https://na.finalfantasyxiv.com/shadowbringers/story/
> → **官方明确：无影的最终目的不是征服，而是「世界重归（Rejoining）」。**

【官方·强证据】无影的起源框架（Endwalker 页）：
> "Once, the world was whole, its people blessed─ere a great calamity threatened all in existence. The approach of the so-called '**Final Days**' caused a great schism among the ancients, culminating in **the star's shattering into fourteen reflections**, incomplete and imperfect."
> —— https://na.finalfantasyxiv.com/endwalker/
> → **官方明确：终末之日导致古代人分裂，星球碎裂为十四个映像。**

【官方·强证据】6.0 收束：
> "Endwalker brings the tale of **Hydaelyn and Zodiark** to a conclusion eons in the making."
> —— 同上

## 6.4 十四人委员会 Convocation of Fourteen【重点核实项】

**一句话定位**：未分裂时代古代人城邦**阿玛罗特 Amaurot** 的最高执政评议会，十四席位各承担一项「世界之职能」。

### 6.4.1 ✅ 官方可直接确认的部分

【官方·强证据】7.56 补丁说明（Lodestone Topics，2026-09）：
> "Faced with the coming **Solstice**, the fate **Halmarut** claims to await all worlds..."
> —— https://na.finalfantasyxiv.com/lodestone/topics/
> → **Halmarut 是官方文本中确实出现的席位名**，且 7.x 主线正在使用它。这证明「席位名＝无影/古代人个体名」的命名法在最新版本仍在沿用。

### 6.4.2 席位表（⚠️ 混合来源，务必按采信度栏引用）

| 席位/称号 | 英文 | 日文 | 中文（⚠️） | 已知持有者 | 采信度 |
|---|---|---|---|---|---|
| **议长 The Speaker** | Lahabrea | ラハブレア 議長 | 拉哈布雷亚 ⚠️ | 拉哈布雷亚 | 【社区·高】多源一致 |
| **调停者 The Emissary** | Elidibus | エリディブス 調停者 | 艾里迪布斯 ⚠️ | 艾里迪布斯 | 【社区·高】多源一致 |
| **旅人 The Traveler** | Azem | アゼム | 阿泽姆 ⚠️ | 玩家灵魂之源；前任为维涅斯 ⚠️ | 【社区·高】 |
| **第三席** | Emet-Selch | エメトセルク | 艾梅特塞尔克 ⚠️ | 哈迪斯 Hades | 【社区·高】 |
| 席位名 | **Halmarut** | ハルマルト | 哈鲁马鲁特 ⚠️ | — | **✅【官方】7.56 补丁说明** |
| 席位名 | Fandaniel | ファダニエル | 法丹尼尔 ⚠️ | 赫尔墨斯 Hermes；后世为阿蒙 Amon | 【社区·高】 |
| 席位名 | Deudalaphon | デュダルフォン | 德乌达拉冯 ⚠️ | — | 【社区·中】 |
| 席位名 | Pashtarot | バシュタロット | 帕什塔洛特 ⚠️ | — | 【社区·中】 |
| 席位名 | Altima | アルテマ／ウルテマ | 阿尔提玛 ⚠️ | — | 【社区·中】两源日文拼写不一致 |
| 席位名 | Emmerololth | エメロロアルス | 艾梅罗洛尔斯 ⚠️ | — | 【社区·中】 |
| 席位名 | Igeyorhm | イゲオルム | 伊格约尔姆 ⚠️ | — | 【社区·中】 |
| 席位名 | Loghrif | アログリフ | 罗格利夫 ⚠️ | — | 【社区·中】 |
| 席位名 | Mitron | ミトロン | 米特隆 ⚠️ | — | 【社区·中】 |
| 席位名 | Nabriales | ナプリアレス | 那布里亚勒斯 ⚠️ | — | 【社区·低】仅一份名单列出 |

⚠️ **核实结论**：**本环境无法给出经官方页面逐条验证的「十四席全名单」。**
可确认的只有四点：① **Lahabrea＝议长、Elidibus＝调停者、Azem＝旅人**（多源一致）；② **Emet-Selch 为第三席**（广泛共识）；③ **Halmarut 在 7.56 官方补丁说明中确实出现**；④ 其余席位名**全部来自玩家整理，且不同来源的收录数量与拼写存在差异**（出现「13 名 + Azem = 14」与「含 Nabriales 共 14 名 + Azem」两种数法，说明**席位总数的凑法本身在社区并未统一**）。

⚠️ **Azem 已在「终末之日」时离开委员会**，因此佐迪亚克召唤时委员会**只剩十三人**。

### 6.4.3 佐迪亚克与海德林的召唤（叙事骨架）⚠️【社区整理·存在争论】

1. 星球以太最外层「停滞」导致创造魔法失控，**终末之日（Final Days）** 爆发。
2. 委员会决定**召唤佐迪亚克**以重新搅动天脉以太；代价是**献出一半人口**，**艾里迪布斯被作为佐迪亚克的核心献祭**。
3. 为修复世界，委员会打算**再献出一半人口**。
4. **维涅斯 Venat** 与反对派脱离，在**阿尼德拉 Anyderas** 集合，**以维涅斯自身为核心召唤海德林**。
5. 海德林无法直接摧毁佐迪亚克，于是**将佐迪亚克与世界一同「分割（Sundering）」为十四个映像**并封印。
6. 之后**未分裂的三位古代人**（拉哈布雷亚、艾梅特塞尔克、后来接任的艾里迪布斯）以记忆结晶**赋予映像世界中的转生者席位**，通过引发灵灾使映像合并——这就是「无影」的由来。

⚠️ 上述 3–6 的时间顺序、维涅斯是否「前任 Azem」、当代艾里迪布斯是原初之人还是继承席位者，**社区内仍有争论**。整体应标注为「社区整理 + 存在争论」。

## 6.5 四圣兽 The Four Lords 与「瑞兽 auspices」⚠️

| 中文名 | 英文名 | 种族/类别 | 所属 | 定位 | 剧情作用 |
|---|---|---|---|---|---|
| 四圣兽 | **The Four Lords** | 瑞兽 auspice | 东方（多玛/北洋圈） | 四方守护神兽 | 4.x 讨伐战系列 |
| 玄武 | **Genbu** | 瑞兽·龟 | 四圣兽 | 北之守护 | 系列起点 |
| 白虎 | **Byakko** | 瑞兽·虎 | 四圣兽 | 西之守护 | 4.2 讨伐战 |
| 朱雀 | **Suzaku** | 瑞兽·鸟 | 四圣兽 | 南之守护 | 4.3 讨伐战 |
| **青龙** | **Seiryu** | 瑞兽·龙 | 四圣兽 | 东之守护 | 4.4 讨伐战 |
| 天禅 | **Tenzen** | 人族 ⚠️ | 东方武人 | 讨伐者/见证者 | 4.x 系列引导者 ⚠️ |
| 算盘 | **Soroban** | 拉拉肥 Lalafell ⚠️ | 相关协力者 | 商人与情报 | 系列相关角色 ⚠️ |

**重要更正**：任务描述中的「蓝青龙」应为**青龙 Seiryu**。四圣兽中**只有一位青龙**。
**重要区分**：**瑞兽（auspice）不是蛮神（primal），也不是十二神**——它们是**原生的灵兽**。写作时不要混用。

⚠️ 天禅与算盘的具体身分、四圣兽暴走原因与系列结局，**本次仅有被封锁 wiki 的标题级证据**，正文不可读。**组织架构可采信，细节情节一律待补证。**

## 6.6 其它组织速查表

| 中文名 | 英文名 | 类别 | 所属 | 定位 | 剧情作用 |
|---|---|---|---|---|---|
| 天钢机工团 | **Skysteel Manufactory** | 工房/行会 | 伊修加德 | 技术研发与生产 | ✅【官方】机工士（Machinist）据点 |
| 斯特凡尼维安·德·欧谢尔 | **Stephanivien de Haillenarte** | 精灵族 Elezen | 天钢机工团 | 创始者/导师 | 机工士职业任务委托人 ⚠️ |
| 希尔达 | **Hilda** | 精灵族（混血）⚠️ | 伊修加德下层 | 治安协力者 | 伊修加德社会改革线关键人物 ⚠️ |
| 涅列马尔 | **Neillemard** | ⚠️ | 天钢机工团 | 工程师团队负责人 | ✅【官方】5.35 天钢工具线 |
| 神殿骑士团 | **Temple Knights** | 宗教武装 | 伊修加德正教 | 正规军·治安 | 伊修加德秩序执行者 |
| 苍穹骑士团 | **Heavens' Ward** | 精锐近卫 | 大主教 | 教宗亲卫 | 3.0 主要敌对精锐 |
| 星辉骑士团 | **Sultansworn** | 王室护卫 | 乌尔达哈 | 苏丹娜亲卫 | ⚠️ 待核 |
| 铁工厂 | **Ironworks** | 技术团队 | 西德麾下 | 技术研发 | 跨世界工程主力 |
| 西德·加隆德 | **Cid Garlond** | 人族（加雷马人） | 铁工厂 | 领袖·天才技师 | 从加雷马叛逃，拂晓的技术后盾 |
| 欧米茄 | **Omega** | 机械生命 | 欧米茄族 | 追猎者 | 从龙之星追猎米德加尔特蛇神至本星 |
| 阿尔法 | **Alpha** | 机械生命 | 欧米茄族 | 伙伴/幸存者 | 欧米茄线情感核心 ⚠️ |
| 斯蒂格玛-4 | **Stigma-4** | 机械生命 | 欧米茄族 | 指挥官 | 欧米茄线敌对 AI ⚠️ |
| 欧米茄族 | **the Omicrons** | 机械文明 | — | 已灭亡的机械种族 | 与龙族战争 |
| 伊亚 | **the Ea** | 精神体/求知种族 | — | 已放弃生存的文明 | 宇宙文明群像 ⚠️ |
| N-7000 | **N-7000** | 欧米茄族 | 乌尔提玛·图勒 | 咖啡店老板 | ✅【官方】6.2「Last Dregs」 |
| 贾明威 | **Jammingway** | 非欧米茄族 | 乌尔蒂玛·图勒 | N-7000 的搭档 | ✅【官方】6.2 |
| 监视者 | **The Watcher** | ⚠️ | 月面 Mare Lamentorum | 佐迪亚克封印看守 | ⚠️ **完全未验证** |
| 圣科纳商会 | **Sons of Saint Coinach** | 学术调查团 | 摩杜纳 | 遗迹调查 | 2.x–3.x 亚拉戈/水晶塔研究主力 |
| 拾穗者 | **the Gleaners** | 采集者行会 | 萨雷安 | 物资采集 | ✅【官方】埃伦维尔所属 |
| 萨雷安评议会 | **the Forum** | 统治机构 | 旧萨雷安 | 最高决策机关 | 决定萨雷安是否援助艾欧泽亚 |
| 福尔谢诺·莱韦耶勒尔 | **Fourchenault Leveilleur** | 精灵族 Elezen | 评议会 | 评议员 | 双子之父；6.0 立场对立面 |
| 蒙蒂谢涅 | **Montichaigne** | 精灵族 Elezen | 评议会 | 评议员 | 福尔谢诺的政治盟友 ⚠️ |
| 贤人 | **Archons** | 学术称号 | 萨雷安 | 最高学术资格 | ✅【官方】拂晓多数成员的学术身分 |
| 沙蝎众 | **the Syndicate** | 寡头议会 | 乌尔达哈 | 六人议会 | 掌握乌尔达哈实权 |
| 财阀派 | **the Monetarists** | 政治派系 | 乌尔达哈 | 金权政治势力 | 与保王派对立 |
| 恒辉队 | **Immortal Flames** | 大军团 | 乌尔达哈 | 城邦军 | 玩家 20 级三国选择之一 |
| 黑涡团 | **Maelstrom** | 大军团 | 利姆萨·罗敏萨 | 城邦军/海军 | 同上 |
| 双蛇党 | **Order of the Twin Adder** | 大军团 | 格里达尼亚 | 城邦军 | 同上 |
| 木灵守备队 | **Wood Wailers** | 民兵哨兵 | 格里达尼亚 | 持长柄武器巡逻 | 【社区】 |
| 黄衫队 | **Yellowjackets** | ⚠️ | 利姆萨·罗敏萨 | 治安部队 | ⚠️ **未能证实** |
| 大国防联军 | **Grand Companies** | 军事联合 | 三城邦 | 联合指挥体系 | 副本/PvP/军票系统基础 |
| 艾欧泽亚同盟 | **the Eorzean Alliance** | 国家联合 | 城邦联合 | 反加雷马同盟 | 2.0 以来的政治框架 |
| 罗薇娜珍宝馆 | **Rowena's House of Splendors** | 商号 | 乌尔达哈 | 交易/兑换 | ✅【官方】5.3 页 |

---

# 第七部分：7.x 官方中文译名对照（【官方·中文】）

> 来源：**国服官网「金曦秘话」官方短篇**（`actff1.web.sdo.com`）与**台服官网更新笔记**（`www.ffxiv.com.tw`）。
> **这是本文中中文译名可信度最高的一批**——直接来自官方中文运营方，而非社区转译。

| 中文名（官方） | 英文名 | 类别 | 备注 |
|---|---|---|---|
| 乌克·拉玛特 | Wuk Lamat | 人物 | 即位为**武王** |
| 柯纳 | Koana | 人物 | 图莱尤拉**理王** |
| 古鲁加加 | Gulool Ja Ja | 人物 | **黎明之主 /  Dawnservant**；双称号=武王·理王 |
| 佐拉加 | Zoraal Ja | 人物 | 第一誓约者 |
| 巴库加加 | Bakool Ja Ja | 人物 | 双头辉鳞族 |
| 古鲁加 | Gulool Ja | 人物 | 佐拉加之子；继承亚历山大武王权限 |
| 斯菲因 | Sphene（斯菲因·亚历山德罗斯十四世） | 人物 | 亚历山大**理王**；被重建的拟像 |
| 欧提斯 | Otis（欧提斯·维罗纳） | 人物 | 亚历山大骑士团长 |
| 泽莲尼娅 | Zelenia（泽莲尼娅·特里安塔菲利） | 人物 | 骑士团副团长 |
| 卡琉克斯 | Calyx | 人物 | 保全院创立者 |
| 可露儿 | Krile | 人物 | 拂晓血盟 + 巴尔德西昂委员会 |
| 埃伦维尔 | Erenville | 人物 | 拾穗者 |
| 九号解决方案 | Solution Nine | 地名 | 永护塔第九层 |
| 保全院 | Preservation | 组织 | 亚历山大技术/治理机构 |
| 永久人 | the Endless | 存在形态 | 「无尽者」的**官方中文名** |
| 调魂器 | regulator | 装置 | 以他人灵魂为燃料 |
| 阿卡狄亚 | the Arcadion | 组织/内容 | 登天斗技场 |
| 辉鳞族 | Mamool Ja | 种族 | 分 Hoobigo（褐鳞）/Boonewa（蓝鳞）等支系 |
| 佩鲁佩鲁族 | Pelupelu | 种族 | 侏儒体型，饲养羊驼 |
| 尤卡巨人族 | Yok Huy | 种族 | 巨人 |
| 汉努汉努族 | Hanuhanu | 种族 | 科扎玛尔卡 |
| 莫布林族 | Moblin | 种族 |  |
| 米拉拉族 | Milalla | 种族 | 亚历山大侧矮小种族 |
| 图拉尔勇连队 | Landsguard | 军事组织 | 佐拉加统领 |
| 灵魂坏死症 | psychonekrosis | 疾病 | 调魂器滥用的后果 |
| 硌狮族 / 维埃拉族 | Hrothgar / Viera | 种族 | 台服译名 |
| 至点 | the Solstice | 事件 | 7.56 由自然引导的映像再融合 |
| 哈尔玛鲁特 | Halmarut | 人物/席位 | 7.56 发表宣言者 |

> ⚠️ **重要提示**：**「无尽者」是社区译名，官方中文名为「永久人」**。若要写正式文档，应使用「永久人（the Endless）」。
> ⚠️ 上表**未包含** Scions 成员、城邦领袖的中文名——**本次未能在国服/台服站点找到这些条目的官方中文文本**。因此本文第一部分的中文名（敏菲利亚、桑克瑞德等）**仍属社区通行译名，标 ⚠️**。

---

# 第八部分：7.x 图拉尔 / 亚历山德里亚 NPC 详表（合并子代理核实结果）

| 中文名 | 英文名 | 种族 | 所属 | 定位 | 剧情作用 |
|---|---|---|---|---|---|
| 乌克·拉玛特 | Wuk Lamat | 玛姆尔加（单头，♀）⚠️ | 图莱尤拉王族 | 王位候选人 → **武王** | 7.0 第一主角视角；动机为「守护国民笑容」 |
| 柯纳 | Koana | 玛姆尔加（单头）⚠️ | 图莱尤拉王族（**养子**） | 王位候选人 → **理王** | 信奉技术与革新；与拉玛特形成「理/武」互补 |
| 古鲁加加 | Gulool Ja Ja | **双头**玛姆尔加 | 图莱尤拉 | **黎明之主**、建国者 | 开国君主；与可露儿祖父加尔夫有旧交 |
| 佐拉加 | Zoraal Ja | 玛姆尔加（蓝鳞 Boonewa ⚠️） | 图拉尔勇连队 | **第一誓约者**、勇连队队长 | 7.0 主要敌对候选人；后成为新生亚历山大武王 |
| 巴库加加 | Bakool Ja Ja | **双头**玛姆尔加 | 无（比武大会出身） | 王位候选人 | 解开艳翼蛇鸟封印酿成大祸，后获减刑赎罪 |
| 古鲁加 | Gulool Ja | 玛姆尔加 | 亚历山大 / 图莱尤拉 | 少年王储 | 佐拉加之子；继承亚历山大的武王权限 |
| 埃伦维尔 | Erenville | 维埃拉 Viera ⚠️ | 萨雷安拾穗者行会 | 向导 | 图拉尔出身；对「黄金乡」传闻心存疑虑 |
| 可露儿 | Krile Baldesion | 拉拉肥 Lalafell | 拂晓血盟 + 巴尔德西昂委员会 | Archon、绘图师 | 追查祖父加尔夫与图拉尔的因缘 |
| 桑克瑞德 | Thancred Waters | 人族 Hyur | 拂晓血盟 | Archon | 因「某份请愿」赴图拉尔 |
| 于里昂热 | Urianger Augurelt | 精灵族 Elezen | 拂晓血盟 | Archon | 与桑克瑞德同行，动机不明 |
| 斯菲因 | Sphene | ⚠️ | 亚历山大王国 | 女王 → **理王** | 7.0 逝去的女王，后被以记忆重建为拟像 |
| 欧提斯 | Otis Verona | ⚠️ | 亚历山大骑士团 | 骑士团长 | 斯菲因的护卫；450 余年前就任 |
| 泽莲尼娅 | Zelenia Triantafili | ⚠️ | 亚历山大骑士团 | 副团长 | 质疑女王「驾崩」真相，被保全院灭口 |
| 卡琉克斯 | Calyx | ⚠️ | 保全院 | 保全院创立者 | 7.2–7.3 主线主要黑手（**7.4 阴谋被挫败**） |
| 图弗特 | Tuphut | 米拉拉族 | 保全院（原王家庭教师） | 斯菲因的家庭教师 | 知情者；把障壁技术带回故乡特雷诺 |
| 山德兰 | Thundran | ⚠️ | 保全院 | 斯菲因主治医师 | 宣布女王驾崩，实为保全院掩护者 |
| 罗博尔 / 阿莱拉 | Robor / Alayla | 米拉拉族 | 奥布里比昂 Oblivion | 组织创立者 | 为阻止「世界融合」而设；把「钥匙」与可露儿托付给原初世界 |
| 德梅特里奥斯 / 埃奥斯佛尔 | Demetrios / Eosfor | ⚠️ | 保全院 | 研究所长 / 第一实验所长 | 清洗罗博尔夫妇并冻结设施 |
| 亚纳 | Yaana | ⚠️ | 九号解决方案 | 任务发布 NPC | ✅【官方】7.4「Feral Fandom」发布 NPC |
| 萨瑞加 | Sareel Ja | ⚠️ | Vana'diel 联动 | 反派 | 7.5 企图拥立「新王」统治图拉尔乃至全星 |
| — | Alxaal / Prishe | ⚠️ | Vana'diel 联动 | 《FF11》原作角色 | ✅【官方】7.5 页明确列出 |

## 8.1 图拉尔 / 亚历山德里亚 关键设定词

| 中文名 | 英文名 | 说明 |
|---|---|---|
| 黄金乡 | the Golden City | 图拉尔流传千年的传说之地，7.0 主线核心谜题 |
| 图拉尔维德拉尔 | Tural Vidraal | 经漫长岁月获得强大力量的兽（艳翼蛇鸟 Valigarmanda 属此类） |
| 永护塔 | Everkeep | 十二层巨塔；第九层 = 九号解决方案；第十二层 = Living Memory；基座 = Underkeep |
| 生者的记忆 | Living Memory | 7.1 前被平定的「奇观」；7.3 后改建为 The Meso Terminal |
| 奥布里比昂 | Oblivion | 反「世界融合」组织 |
| 钥匙 | the Key | 7.4/7.5 主线调查对象 |
| 雷光大战 | Storm Surge | 亚历山大与邻国 Lindblum 的战争 |
| 雾之大陆 | Mist Continent | 亚历山大所在之地 |
| 第九世界 | the Ninth | 7.5 主线提及的映像世界 |
| 至点 | the Solstice | 7.56：**由自然本身引导的映像再融合** |

---

# 第九部分：存疑 / 未验证清单（写正式文档前必须补证）

## 9.1 高优先级（任务明确要求核实但本次未能证实）

| # | 项目 | 状态 |
|---|---|---|
| 1 | **拂晓血盟总部「砂之家 → 石之家」的官方表述** | ⚠️ 未取得。均为社区共识。 |
| 2 | **2.55「血腥宴会」拂晓血盟被诬陷的具体机制** | ⚠️ 未取得官方正文。 |
| 3 | **敏菲利亚被掳、成为海德林代言者的经过** | ⚠️ 未取得官方正文。 |
| 4 | **穆恩布瑞达 Moenbryda 的任何官方介绍** | ⚠️ 完全未取得。 |
| 5 | **帕帕力莫、伊达（Yda）的官方角色页** | ⚠️ 未取得（仅有 3.5 页的间接指称）。 |
| 6 | **十四人委员会完整十四席名单** | ⚠️ 仅 4 项可确认；其余为社区整理且互相矛盾。 |
| 7 | **十二神「解散」结局 / 监视者 The Watcher / 翁法洛斯 Omphalos** | ⚠️ 社区共识但无可抓取官方来源。 |
| 8 | **利姆萨·罗敏萨「四大海盗团」** | ⚠️ **完全无法证实**。任务描述中列举的候选名称无一有来源支持。**勿采信。** |
| 9 | **伊修加德「异端审问局」的正式机构名** | ⚠️ 未能证实（"Inquisitor 异端审问官"制度存在，但机构名未取得）。 |
| 10 | **艾·森娜家族成员 / 「帕帕夏」** | ⚠️ 无任何来源。 |
| 11 | **康拉德 Conrad、拉尔格之拳 Fist of Rhalgr、梅芙** | ⚠️ 未能证实。 |
| 12 | **多玛「月读 / 尤尤哈提」** | ⚠️ 未能证实（疑与夜露/月读蛮神混淆）。 |
| 13 | **加雷马「Populares 平民派」/ 马克西马 Maxima / 露琪亚 Lucia** | ⚠️ 未能证实（Lucia 与 Aymeric 的关系为社区共识）。 |
| 14 | **拉札罕 Varshahn / Ahewann / Nidhana / Radiant Host** | ⚠️ 仅 6.2 页间接涉及 Vrtra；其余未取得。⚠️ **Varshahn 是 Vrtra 的人偶，与 Estinien 无关。** |
| 15 | **7.0「Cahciua」「Enigmatic Maiden」的官方描述** | ⚠️ Cahciua 仅有标题级证据；Enigmatic Maiden 官方未公开描述。 |

## 9.2 已确认**不存在**或**明显错误**的项目（勿采信）

| 项目 | 结论 |
|---|---|
| **Evercold 属 7.4/7.5** | ❌ **错误**。Evercold 是**下一个大版本（8.0）**。 |
| **Calydontis / Nejibana / Nel / Sons of Y** | ❌ 全部可访问来源中**不存在**。 |
| **Alpaca（羊驼）是 NPC** | ❌ **错误**。羊驼是图拉尔的**动物**。 |
| **罗薇娜 Rowena 是沙蝎众成员** | ❌ **错误**。罗薇娜是「罗薇娜珍宝馆」主理人，非沙蝎众。 |
| **乌尔家 / 娜莫家是沙蝎众家族** | ❌ 不成立。王族（Ul 家）与沙蝎众是**并行的两个权力中心**。 |
| **「瓦尔莎汗 = 埃斯蒂尼安」** | ❌ **错误**。Varshahn 是**弗栗多 Vrtra** 的人偶。 |
| **「蓝青龙」** | ❌ 应为**青龙 Seiryu**（四圣兽之一，仅此一位青龙）。 |
| **「加利·拉玛特」** | ❌ 官方无此名。疑为 Gulool Ja Ja 的误记。 |
| **「the Endless = 无尽者」** | ⚠️ 社区译名。**官方中文为「永久人」**。 |
| **`endlesswiki.com` 的任何内容** | 🚫 **AI 按需生成，幻觉严重，禁止引用**。 |

## 9.3 数据来源可信度分级总表

| 级别 | 来源 | 可直引性 |
|---|---|---|
| **A. 官方·英文** | `na.finalfantasyxiv.com` 及其 EU/JP/DE/FR 镜像 | ✅ 可直引 |
| **B. 官方·中文** | `actff1.web.sdo.com`（国服）、`www.ffxiv.com.tw`（台服） | ✅ 可直引（中文译名以上述为准） |
| **C. 社区·Lodestone 玩家博客** | `jp.finalfantasyxiv.com/lodestone/character/*/blog/*` | ⚠️ 需交叉验证 |
| **D. 社区·维基/老站** | `wiki.ffxiv-roleplayers.com`（2013–2019）、`ff14.ffsky.cn`（天幻网） | ⚠️ 需复核，可能滞后 |
| **E. 社区·博客** | `blog.alnarra.com` 等 | ⚠️ 需复核 |
| **F. 不可信** | `endlesswiki.com` | 🚫 禁止引用 |
| **G. 不可达** | fandom / consolegameswiki / gamerescape / ffxiv.wiki / huijiwiki / wikipedia | — 需换网络环境才能使用 |

---

# 第十部分：给父代理的结论与后续建议

## 10.1 本次调研的三个最关键发现

1. **7.56 官方补丁说明出现「Halmarut」与「the Solstice」**——「the Solstice」是**由自然本身引导的映像再融合（a rejoining of the reflections guided by nature itself）**，而 Halmarut 是**十四人委员会的席位名**。这说明 7.x 后期的核心冲突**从图拉尔本地政治回到古代人/映像世界宇宙论**，且抛出了「非无影主导的融合」这一新设定。**这是本次调研最有价值、且证据等级最高的发现（【官方】原文可直引）。**
2. **拂晓血盟在 6.0 后并未解散，但与巴尔德西昂委员会是「人员交叉任职 + 据点共用」而非「合并」**——官方 Dawntrail 页原文为 Krile「belonging to **both** the Scions of the Seventh Dawn and the Students of Baldesion」，6.1 页确认委托送达 **Baldesion Annex**。**任务描述中的"合并"措辞应修正。**
3. **用户指定的四大参考站点中，fandom / consolegameswiki / gamerescape 在本环境全部不可访问**，且**任务描述本身包含多处事实错误**（Evercold 版本归属、罗薇娜属沙蝎众、瓦尔莎汗与埃斯蒂尼安混淆、四大海盗团无来源、若干不存在的人名）。**本文件已在 0.5 与第九部分逐条列出更正。**

## 10.2 建议的后续补证动作

1. **在正常网络环境下**，用 `finalfantasy.fandom.com` / `ffxiv.consolegameswiki.com` 复核：砂之家/石之家、2.55 事件、穆恩布瑞达、Ishgard 异端审问局、四大海盗团、Populares、Radh-at-Han 人物。
2. **优先采信国服/台服官网**获取中文专名（本次已打通 `actff1.web.sdo.com` 与 `www.ffxiv.com.tw`）。
3. **用《Encyclopaedia Eorzea》实体书或游戏内 Unending Codex** 补齐：十四人委员会完整席位、十二神 6.5 结局、四圣兽细节。
4. **将 `endlesswiki.com` 加入抓取黑名单**。

## 10.3 本文的局限（诚实声明）

- 本文中**第一部分（拂晓血盟成员）**的详细描述，除官方能引用的少部分外，**大量依赖调研员既有知识，未能在本环境验证**。这是本文**最弱的一环**。
- 本文**没有**完成「每个 NPC 一句话定位 + 更详细一段描述」中"全部" NPC 的段落式描述——**第 2/5/6/8 部分以表格为主，段落式描述集中在第 1 部分**。这是时间与来源限制下的取舍。
- 全文标注 ⚠️ 的条目**均不应直接进入正式设定稿**。

---

**（文件结束）**
