# FFXIV 主线剧情研究笔记 · 第三部：暗影之逆焰（5.0–5.5）与晓月之终途（6.0–6.55）

> **文件用途**：为 `ff14-idle` 项目提供 5.x / 6.x 主线剧情的结构化资料底稿。
> **时效性说明**：本笔记整理于 **2026-09-15**，对应版本 **7.56**（2026-09-08 上线），下一部资料片 **《Evercold》（永寒？暂译）预定 2027 年 1 月**。5.x / 6.x 属于已完结的历史版本，剧情本身不会变动，但**社区译名与官方中文译名可能在 7.x 期间被修订**，引用时请留意。
> **来源标注**：`【官方设定】` = 引用 Square Enix 官方特设站 / 官方 Patch Notes；`【社区整理】` = 引用粉丝站点、玩家博客、媒体文章。
> **⚠️ 全文剧透警告⚠️**：本文含 5.0–6.55 全部主线结局级剧透，包括角色死亡、身份反转、世界观核心真相。未通关者请勿阅读。

---

## 0. 资料来源与可用性备忘

| 来源 | 域名 | 状态 | 备注 |
|---|---|---|---|
| 官方特设站（EU） | `eu.finalfantasyxiv.com` | ✅ 可 fetch，HTTP 200 | 首选【官方设定】来源；页面含大量导航噪声，正文较短 |
| 官方 Patch Notes | `eu.finalfantasyxiv.com/lodestone/topics/detail/...` | ✅ 可 fetch | 任务名、副本名、BOSS 名的权威来源 |
| 官方 Lodestone 玩家博客 | `jp./eu.finalfantasyxiv.com/lodestone/character/.../blog/` | ✅ 可 fetch | 玩家视角的剧情复盘，可用于【社区整理】交叉验证 |
| Thonky | `thonky.com` | ✅ 可用（任务清单） | 用于补全任务列表 |
| Vrykerion | `vrykerion.com` | ✅ 可用（剧情摘要索引） | 索引页可访问，摘要正文页较长 |
| Final Fantasy Fandom | `finalfantasy.fandom.com` | ❌ 超时 | 本项目环境无法抓取 |
| ConsoleGamesWiki | `ffxiv.consolegameswiki.com` | ❌ HTTP 403 | 同上 |
| Gamer Escape | `ffxiv.gamerescape.com` | ❌ HTTP 403 | 同上 |
| Wikipedia（英） | `en.wikipedia.org` | ❌ 解析为非公网 IP，被拦截 | 无法作为来源 |

**方法论备注**：本笔记中标注 `【官方设定】` 的条目均可在上表 ✅ 来源中核验；标注 `【社区整理】` 的条目来自粉丝站点或玩家博客；**无法双源确认的细节已明确标注「待核验」**，请勿当作定论使用。

---

## 1. 暗影之逆焰（Shadowbringers, 5.0–5.5）总览

**核心设定一句话**：光之战士被水晶公召唤到濒临毁灭的**第一世界**，为了让「光」不再吞噬世界而**主动化身黑暗**，最终发现整场灾难源于无影（Ascian）为复活**佐迪亚克**而制造的「光之泛滥」——而光之战士与无影，本是同一个文明「古代人」的两派遗民。

### 1.1 5.0 基础世界观

| 概念 | 中文 | 说明 | 来源 |
|---|---|---|---|
| The First | 第一世界 | 海德林将原初世界（Source）分裂出的十四个镜像世界之一；因「光之泛滥」几近全灭 | 【官方设定】[Shadowbringers 特设站](https://eu.finalfantasyxiv.com/shadowbringers/) |
| Norvrandt | 诺弗兰特 | 第一世界中**唯一未被光之泛滥吞没**的区域，故事主舞台 | 【官方设定】同上 |
| The Flood of Light | 光之泛滥 | 第一世界的光属性以太失控暴走，把整个世界结晶化；诺弗兰特靠**水晶塔**与「夜之结界」幸存 | 【官方设定】同上 |
| The Crystarium | 水晶都 | 水晶公建立的城市，位于水晶塔下，光之战士的据点 | 【官方设定】同上 |
| Eulmore | 游末邦 | 人类最后的「乐园」，实质是向上层献媚换取寄生生活的阶级社会 | 【官方设定】同上 |
| Lightwarden | 光之守护者 / 光之罪兽首领 | 光之泛滥的**五个**具现化存在，各据一方；讨伐后光之力会转移 | 【官方设定】同上 |
| Sin Eater | 罪喰 | 被光之泛滥同化的生物，即第一世界的「怪物」 | 【官方设定】同上 |
| Warrior of Darkness | 暗之战士 | 光之战士在本资料片中的自称/被称，立场反转 | 【官方设定】同上 |

**官方宣传语（原文）**：*"Hero becomes villain as the Warrior of Light embraces the dark, and embarks upon an adventure that transcends worlds."* ——【官方设定】[Shadowbringers 特设站](https://eu.finalfantasyxiv.com/shadowbringers/)

**官方剧情简介（原文）**：*"Ala Mhigo is at last free from imperial rule... they cannot turn to the Warrior of Light. Nor to the Scions, who yet slumber, their souls adrift... beckoned to the First."* ——【官方设定】同上

### 1.2 5.0 关键角色与真相

| 角色 | 中文 | 身份 / 真相 | 来源 |
|---|---|---|---|
| Crystal Exarch / G'raha Tia | 水晶公 / 古·拉哈·提亚 | 第七星历的猫魅族，**来自未来的原初世界**；为了让光之战士活下来而把整座水晶塔与自己的血肉用作穿越媒介 | 【官方设定】[5.3 特设站](https://eu.finalfantasyxiv.com/shadowbringers/patch_5_3/) |
| Emet-Selch / Hades | 爱梅特赛尔克 / 哈迪斯 | 无影「十四人委员会」成员；**古代人**，本名哈迪斯；真身是 5.0 最终 BOSS | 【社区整理】[玩家剧情复盘 Lodestone 博客](https://jp.finalfantasyxiv.com/lodestone/character/40118763/blog/5672427) |
| Amaurot | 阿玛罗特 | 爱梅特赛尔克用创造魔法重现的**古代人首都幻影** | 【社区整理】同上 |
| Zodiark | 佐迪亚克 | 古代人为对抗「终末」而献祭半数同胞召唤的**星之意志**；海德林是分裂佐迪亚克的对抗存在 | 【官方设定】[Endwalker 特设站](https://eu.finalfantasyxiv.com/endwalker/) |
| Hydaelyn | 海德林 | 由古代人维涅斯（Venat）为核心召唤，将世界分裂为十四份 | 【官方设定】同上 |
| Azem | 阿泽姆 | 十四人委员会中**唯一反对召唤佐迪亚克**的席位；即玩家灵魂的前世 | 【社区整理】同上 |
| Ancients | 古代人 | 世界分裂前的文明，寿命悠久、以创造魔法构建社会 | 【官方设定】同上 |
| Ryne / Minfilia | 琳 / 敏菲利亚 | 敏菲利亚的继承者，能与海德林沟通，是封印光之泛滥的关键 | 【官方设定】[5.3 特设站](https://eu.finalfantasyxiv.com/shadowbringers/patch_5_3/) |

> **⚠️ 核心真相**：无影并非「纯粹的恶」。他们的目标是用**光之泛滥 + 灵灾**合并十四世界，把被海德林分裂的同胞与原初世界**复原**，以复活佐迪亚克。爱梅特赛尔克在阿玛罗特向光之战士展示了古代人的世界，并邀请其「想起」自己是阿泽姆。

### 1.3 晓之血盟成员在本资料片的定位

| 角色 | 中文 | 5.x 定位 |
|---|---|---|
| Thancred | 桑克瑞德 | 照顾琳 / 敏菲利亚，兼有父亲般的守护者形象 |
| Urianger | 于里昂热 | 占星术士；长期隐瞒水晶公的计划，是「背叛感」的剧情引擎 |
| Y'shtola | 雅·修特拉 | 因穿越而失明，以以太视物；研究者侧 |
| Alphinaud | 阿尔菲诺 | 在水晶都建立医疗与救援体系，政治侧成长 |
| Alisaie | 阿莉塞 | 直接投身战线的武力侧，与光之战士并肩感最强 |

---

## 2. 5.x 逐版本表格（每版一张）

### 2.1 版本 5.0 — 暗影之逆焰（Shadowbringers）

| 项目 | 内容 |
|---|---|
| 版本号 | **5.0**（2019-07-02 上线，EU 标记 On Sale 2 July 2019）【官方设定】[特设站](https://eu.finalfantasyxiv.com/shadowbringers/) |
| 主题 | 光与暗的立场反转；「英雄」的代价 |
| 核心冲突 | 阻止光之泛滥吞没第一世界 vs. 无影推动世界合并的计划 |
| 主要反派 | 光之守护者（Lightwarden）；**Emet-Selch / Hades**；Vauthry（游末邦统治者） |
| BOSS | 泰坦尼亚（Titania）／伊诺森斯（Innocence，Vauthry 变身）／哈迪斯（Hades，5.0 终盘）／多恩·梅格（Dohn Mheg）等四人副本 BOSS |
| 关键转折点 | ① 水晶公召唤真相揭晓；② 游末邦真相与 Vauthry 的罪喰化；③ 爱梅特赛尔克带玩家进入**阿玛罗特幻影**，揭示古代人文明与佐迪亚克起源；④ 玩家以「暗之战士」身份吸收光之力；⑤ Hades 战败并承认「你们确实活着」 |

> 关于 BOSS 归属的**待核验点**：任务给出的清单里把「Dohn Mheg」列为 Lightwarden 之一，但 Dohn Mheg 是**副本名**（水妖的领地相关），并非光之守护者本体名。Icy Veins 的 Endwalker Trials Hub 与官方 5.3 页可交叉核验副本与试炼的分界；本笔记按「副本 / 试炼」分开处理，避免混淆。——【社区整理】[Icy Veins Trials Hub](https://www.icy-veins.com/ffxiv/endwalker-trials-hub)

### 2.2 版本 5.1 — 美德之誓，残酷之行（Vows of Virtue, Deeds of Cruelty）

| 项目 | 内容 |
|---|---|
| 版本号 | **5.1**（2019-10-29 上线；EU 特设站 2019-10-10 公开）【官方设定】[特设站](https://eu.finalfantasyxiv.com/shadowbringers/) |
| 主题 | 战后秩序重建；「美德」与「残酷」的一体两面 |
| 核心冲突 | 第一世界重建期的政治与信仰摩擦；无影渗透 |
| 主要反派 | 无影（Elidibus 的活动）；游末邦残党 |
| BOSS | 大型任务「伊甸」第一弹 **Eden's Gate（伊甸之门）**；24 人本 **The Copied Factory（复制工厂）**（YoRHa 第一弹） |
| 关键转折点 | ① 伊甸的觉醒与「让第一世界重获暗之力」的尝试启动；② 与 2B / 9S 的异世界交叉（YoRHa: Dark Apocalypse 系列开幕）；③ 阿尔菲诺与琳的成长线推进 |

### 2.3 版本 5.2 — 陨星的回响（Echoes of a Fallen Star）

| 项目 | 内容 |
|---|---|
| 版本号 | **5.2**（2020-02-18 上线；EU 特设站 2020-01-16 公开）【官方设定】[特设站](https://eu.finalfantasyxiv.com/shadowbringers/) |
| 主题 | 无影的真正图谋浮出水面 |
| 核心冲突 | 阻止无影利用「闇之战士」的残留意志复活佐迪亚克 |
| 主要反派 | 无影 Elidibus（以「闇之战士」阿尔博特之姿现身） |
| BOSS | 大型任务 **Eden's Verse（伊甸之诗）**；24 人本 **The Puppets' Bunker（人偶要塞）**（YoRHa 第二弹，5.3 上线） |
| 关键转折点 | ① 「阿尔博特复活」实为 Elidibus 伪装；② 伊甸系列深入第一世界的以太再生；③ 水晶公的身体开始水晶化（穿越的代价） |

> **⚠️ 5.2 → 5.3 的伪装反转**是 5.x 最重要的叙事机关之一。官方 5.3 页面明确写道：*"Having confirmed their suspicions that the resurrected Ardbert is none other than Elidibus, the Scions endeavor to shed light upon the Ascian's dark plot."* ——【官方设定】[5.3 特设站](https://eu.finalfantasyxiv.com/shadowbringers/patch_5_3/)

### 2.4 版本 5.3 — 水晶的残光（Reflections in Crystal）★剧情高峰

| 项目 | 内容 |
|---|---|
| 版本号 | **5.3**（2020-08-11 上线）【官方设定】[5.3 特设站](https://eu.finalfantasyxiv.com/shadowbringers/patch_5_3/) |
| 主题 | 第一世界篇的**收束**；告别与归还 |
| 核心冲突 | 对抗以「光之战士」之姿现身的 Elidibus；阻止十四世界合并 |
| 主要反派 | **Elidibus**（自称/化身为「Warrior of Light」） |
| BOSS | 讨伐战 **The Seat of Sacrifice（牺牲之座）**及**极版本**；副本 **The Heroes' Gauntlet（英雄试炼之路）**；**Eden's Verse: Iconoclasm** 等伊甸续篇 |
| 关键转折点 | ① **The Seat of Sacrifice**：Elidibus 化身为「光之战士」与玩家对决；② **古·拉哈·提亚归还原初世界**，水晶公身份落幕；③ 第一世界的夜之结界稳固，晓之血盟回归；④ **赛特（Seto）**与阿尔博特的告别——5.x 最著名的催泪场景之一 |

**官方对该讨伐战的描述（原文）**：*"Bearing the hopes for the world's salvation, a mighty hero shall rise up against the Warrior of Darkness in a battle to determine the very fate of the star. His name: the Warrior of Light."* ——【官方设定】[5.3 特设站](https://eu.finalfantasyxiv.com/shadowbringers/patch_5_3/)

**5.3 其他内容（官方列示）**：YoRHa 第二弹 **The Puppets' Bunker**；天佑女王（Save the Queen）系列；《新生的艾欧泽亚》主线精简与 2.0 地图飞行；New Game+ 扩展。——【官方设定】同上

### 2.5 版本 5.4 — 重写的未来（Futures Rewritten）

| 项目 | 内容 |
|---|---|
| 版本号 | **5.4**（2020-12-08 上线；EU 特设站 2020-11-19 公开）【官方设定】[特设站](https://eu.finalfantasyxiv.com/shadowbringers/) |
| 主题 | 从第一世界转回原初世界；「未来」被重新书写 |
| 核心冲突 | 帝国崩坏前夜的权力真空；虚无界（Void）异变的前兆 |
| 主要反派 | **Fandaniel（法丹尼尔）**；加雷马帝国残党 |
| BOSS | 大型任务 **Eden's Promise（伊甸之约）**（伊甸系列最终章）；「武器」系列 **Ruby Weapon / Emerald Weapon** |
| 关键转折点 | ① 伊甸系列完结，第一世界以太循环初步恢复；② Fandaniel 登场并为 6.0 的终末铺路；③ 加雷马帝国的继承危机公开化 |

### 2.6 版本 5.5 — 死亡直至黎明（Death Unto Dawn）

| 项目 | 内容 |
|---|---|
| 版本号 | **5.5**（2021-04-13 上线；5.55 后续）【官方设定】[5.5 特设站](https://eu.finalfantasyxiv.com/shadowbringers/patch_5_5/) |
| 主题 | 「塔」的降临与终末的前奏 |
| 核心冲突 | Fandaniel 与**忒洛波洛伊（Telophoroi）**企图**重演终末（Final Days）**；各地升起神秘高塔 |
| 主要反派 | **Fandaniel**；**Telophoroi**；**Lunar Bahamut（月之巴哈姆特）**；**Anima** |
| BOSS | 讨伐战 **The Cloud Deck（云上甲板）**＝Diamond Weapon；副本 **Paglth'an**；天佑女王 **Zadnor** |
| 关键转折点 | ① 晓之血盟发现**解除蛮神精炼（Tempering）的方法**，为 6.0 的人蛮和解奠基；② 各地「塔」升起，塔内人被精炼；③ **晓之血盟成员被囚**（官方 5.5 宣传语：*"With a close friend grievously wounded and deadly primals at large, the Scions face a bitter struggle."*）；④ 与提亚马特（Tiamat）、阿玛尔札（Amalj'aa）结盟；⑤ 直接引向 6.0 的月球线 |

**官方宣传语（原文）**：*"As towers rise and darkness falls, Eorzea's players take the stage─blades poised to meet the Final Days."* ——【官方设定】[5.5 特设站](https://eu.finalfantasyxiv.com/shadowbringers/patch_5_5/)

**「武器」系列（The Sorrow of Werlyt）关键点**：5.3 版本已明确 *"The uneasy alliance forged with Gaius Baelsar has paved the way to victory over the Ruby Weapon."*；5.5 版本则是 *"the Diamond Weapon is the culmination of countless sacrifices and untold suffering"*。——【官方设定】[5.3 特设站](https://eu.finalfantasyxiv.com/shadowbringers/patch_5_3/)、[5.5 特设站](https://eu.finalfantasyxiv.com/shadowbringers/patch_5_5/)

---

## 3. 5.x 大型任务与 24 人本一览

### 3.1 伊甸系列（Eden Raids）——「伊甸的觉醒 / 诗 / 约」

> **重要更正**：任务中提到的「Resurrection / Descent / Eternity」**不是**伊甸的三层名称。伊甸的实际三层结构为 **Eden's Gate（伊甸之门，5.01/5.05）→ Eden's Verse（伊甸之诗，5.2/5.21）→ Eden's Promise（伊甸之约，5.4/5.41）**。其中 *Resurrection / Descent / Eternity* 是 **Eden's Promise** 内部的三个楼层名。——【社区整理】[Fandom 镜像 Raid 列表](https://bw.in.projectsegfau.lt/finalfantasy/wiki/Raid_(Final_Fantasy_XIV))、[Fandom 镜像 Eden 页面索引](https://bw.in.projectsegfau.lt/finalfantasy/wiki/The_Seat_of_Sacrifice)

| 层级 | 日文/英文 | 楼层名（部分） | 版本 |
|---|---|---|---|
| 第一层 | Eden's Gate | Resurrection（复活的伊甸） | 5.01 / 5.05 |
| 第二层 | Eden's Verse | Descent（降临的伊甸）等；含 **Iconoclasm** | 5.2 / 5.21 |
| 第三层 | Eden's Promise | Eternity（永恒的伊甸）等 | 5.4 / 5.41 |

**已知 BOSS 名（部分）**：**The Idol of Darkness（暗之偶像）**（Eden's Verse: Iconoclasm）等。——【社区整理】[Fandom 镜像 Raid 列表](https://bw.in.projectsegfau.lt/finalfantasy/wiki/Raid_(Final_Fantasy_XIV))

### 3.2 YoRHa: Dark Apocalypse（24 人本，与《尼尔》系列联动）

| 弹数 | 副本 | 版本 | 官方描述要点 |
|---|---|---|---|
| 第一弹 | **The Copied Factory（复制工厂）** | 5.1 | 与寄叶部队（YoRHa）的首次接触 |
| 第二弹 | **The Puppets' Bunker（人偶要塞）** | 5.3 | 白衣人造人 **2P** 觉醒；Komra 的危机；Anogg 与 Konogg 的搜索 |
| 第三弹 | **The Tower at Paradigm's Breach（范式断层之塔）** | 5.5 | 黑衣 **2B** 出现；「启示之时」将至，是希望还是绝望 |

**客座创作者**：**Yosuke Saito**（《尼尔》系列执行制作人）与 **YOKO TARO**（BUKKORO 代表取缔役社长）。——【官方设定】[5.3 特设站](https://eu.finalfantasyxiv.com/shadowbringers/patch_5_3/)、[5.5 特设站](https://eu.finalfantasyxiv.com/shadowbringers/patch_5_5/)

### 3.3 兵器系列（The Sorrow of Werlyt）BOSS 一览

| BOSS | 对应版本 | 备注 |
|---|---|---|
| Ruby Weapon（红宝石兵器） | 5.2 / 5.3 | 与 Gaius Baelsar 的「不安定同盟」带来胜利 |
| Emerald Weapon（绿宝石兵器） | 5.4 | 过渡 |
| Diamond Weapon（钻石兵器） | 5.5 讨伐战 **The Cloud Deck** | 「无数牺牲与苦难的极致」 |
| **Anima（阿尼玛）** | 5.5 剧情 | 6.0 新威胁预演（官方 Endwalker 页将其列为「New threats to overcome, including Anima」） |

**来源**：【官方设定】[5.3 特设站](https://eu.finalfantasyxiv.com/shadowbringers/patch_5_3/)、[5.5 特设站](https://eu.finalfantasyxiv.com/shadowbringers/patch_5_5/)、[Endwalker 特设站](https://eu.finalfantasyxiv.com/endwalker/)

### 3.4 关键讨伐战对照表

| 讨伐战 | 版本 | 对手 | 剧情意义 |
|---|---|---|---|
| 伊诺森斯（Innocence） | 5.0 | Vauthry 变身 | 游末邦篇的收束 |
| 泰坦尼亚（Titania） | 5.0 | 妖灵王 | 妖灵乡篇 |
| 哈迪斯（Hades） | 5.0 | **Emet-Selch 真身** | 古代人真相的正面碰撞 |
| 牺牲之座（The Seat of Sacrifice） | 5.3 | **Elidibus（光之战士形态）** | 「英雄」定义的最终拷问 |
| 云上甲板（The Cloud Deck） | 5.5 | Diamond Weapon | 兵器系列完结 |

---

## 4. 晓月之终途（Endwalker, 6.0–6.55）总览

**核心设定一句话**：贯穿十年的海德林 vs 佐迪亚克之争迎来终局——真正的敌人既不是佐迪亚克也不是海德林，而是**「终末」本身**，其根源是古代人**赫尔墨斯**在厄尔庇斯放飞的**梅提翁**收集全宇宙绝望后化身的**终末之兽（Endsinger）**。

**官方宣传语（原文）**：*"Warrior of Light — Bear forth our hope, that these days not be the last!"*；*"Once, the world was whole, its people blessed... The approach of the so-called 'Final Days' caused a great schism among the ancients, culminating in the star's shattering into fourteen reflections."* ——【官方设定】[Endwalker 特设站](https://eu.finalfantasyxiv.com/endwalker/)

### 4.1 6.0 新增内容（官方列示）

新职业 **Sage（贤者）**与 **Reaper（钐镰客）**；新可玩种族**男性维埃拉**；等级上限 80→90；新城市 **Old Sharlayan（旧萨雷安）**与 **Radz-at-Han（拉札罕）**；新地图 **Labyrinthos / Thavnair / Garlemald / Mare Lamentorum**；新部族 **Loporrits（兔兔族）**与 **Arkasodara**；新威胁 **Anima**与**玛古斯三姐妹**；新高难度大型任务 **Pandæmonium（潘地曼尼南）**；新 24 人本 **Myths of the Realm（艾欧泽亚神话）**。——【官方设定】[Endwalker 特设站](https://eu.finalfantasyxiv.com/endwalker/)

### 4.2 6.0 关键角色与真相

| 角色 | 中文 | 真相 / 定位 |
|---|---|---|
| Fandaniel / Hermes | 法丹尼尔 / 赫尔墨斯 | 古代人**赫尔墨斯**，厄尔庇斯的创造物管理者；转生为无影法丹尼尔后图谋毁灭一切；曾**亲手抹去自己的记忆**以逃避审判 |
| Meteion | 梅提翁 | 赫尔墨斯创造的**使魔**，以「询问宇宙其他生命是否幸福」为使命；因得到的答案是「绝望」而化身终末的化身 |
| Zodiark | 佐迪亚克 | 古代人召唤的星之意志，为遮蔽终末而存在；**6.0 中被击败** |
| Hydaelyn / Venat | 海德林 / 维涅斯 | 为对抗佐迪亚克与终末而分裂世界；**6.0 中以讨伐战形式接受玩家的「试炼」并退场** |
| Elpis | 厄尔庇斯 | 古代人世界的研究设施；玩家通过时间回溯抵达的舞台 |
| Mare Lamentorum | 叹息之月 | 月面区域；**Loporrits（兔兔族）**在此为「逃难方舟」做准备 |
| Ultima Thule | 最终之地 | 宇宙尽头的绝望之地；终末之兽 Endsinger 的领域 |
| Endsinger | 终末之兽 | Meteion 绝望面的集合体，6.0 最终 BOSS |
| Zenos | 芝诺斯 | 6.0 终盘以私人决斗结束其执念；「终末决斗」是 6.0 的收尾高潮 |
| Garlemald | 加雷马 | 帝国崩溃；**阿尔菲诺与阿莉塞**在此承担核心剧情（人蛮和解、帝国难民） |

> **⚠️ 6.0 最大反转**：整部资料片的「终末」并非佐迪亚克所为，而是古代人自己创造的使魔在宇宙中收集到的**普遍性绝望**。赫尔墨斯出于对「裁定生命价值」的抗议，抹去自己的记忆，让终末得以发生——这使 6.0 的最终对手从「神」降格为「绝望本身」。

### 4.3 6.x 逐版本表格（每版一张）

#### 版本 6.0 — 晓月之终途（Endwalker）

| 项目 | 内容 |
|---|---|
| 版本号 | **6.0**（2021-12-07 正式上线）【官方设定】[特设站](https://eu.finalfantasyxiv.com/endwalker/) |
| 主题 | 终末的真相；希望 vs 绝望 |
| 核心冲突 | 阻止**终末（Final Days）**重现；解开海德林与佐迪亚克的千年对立 |
| 主要反派 | **Fandaniel / Hermes**；**Zodiark**（前半）；**Meteion / Endsinger**（最终）；Zenos |
| BOSS | 佐迪亚克相关讨伐；月面与加雷马系列；**Hydaelyn 的试炼**；**Zenos** 终盘决斗；**Endsinger**（Ultima Thule 最终决战）；副本 **The Aitiascope / Ktisis Hyperboreia / The Mothercrystal** 等 |
| 关键转折点 | ① 佐迪亚克被击破；② **海德林的试炼**与古代人真相揭示；③ 时间回溯至 **Elpis**，与赫尔墨斯/梅提翁相遇；④ 加雷马帝国崩坏与双胞胎的成长抉择；⑤ **Ultima Thule** 的绝望空间与「希望」的重新确立；⑥ **晓之血盟解散**，各奔前路 |

#### 版本 6.1 — 新的冒险（Newfound Adventure）

| 项目 | 内容 |
|---|---|
| 版本号 | **6.1**（2022-04-12 上线）【官方设定】[6.1 特设站](https://eu.finalfantasyxiv.com/endwalker/patch_6_1/) |
| 主题 | 从「星之救世主」回归「一介冒险者」 |
| 核心冲突 | 新的未知：虚无界（Void）与十三世界线索萌芽 |
| 主要反派 | 虚无界的存在（本版尚未明朗） |
| BOSS | 副本 **Alzadaal's Legacy（阿尔札达尔遗产）**；24 人本 **Myths of the Realm 第一弹：Aglaia（阿格莱亚）**；极讨伐 **Endsinger's Aria（终末之兽咏叹）**；6.11 **Dragonsong's Reprise (Ultimate)** |
| 关键转折点 | ① 官方剧情：*"With despair silenced and hope restored, the Scions of the Seventh Dawn step back into the shadows, their star's hero to don the mantle of simple adventurer once more."*；② **阿尔札达尔遗产**中发现通往虚无界的线索；③ **十二神**之谜正式作为 24 人本主线开启 |

#### 版本 6.2 — 埋藏的回忆（Buried Memory）

| 项目 | 内容 |
|---|---|
| 版本号 | **6.2**（2022-08-23 上线）【官方设定】[6.2 特设站](https://eu.finalfantasyxiv.com/endwalker/patch_6_2/) |
| 主题 | 五千年后的兄妹重逢；虚无界的门 |
| 核心冲突 | 寻找五千年前消失在虚无界的**阿兹达加（Azdaja）** |
| 主要反派 | **Golbez（高贝扎）**与其麾下**四天王（Archfiends）** |
| BOSS | 讨伐战 **Storm's Crown（暴风王冠）**——对手**芭芭莉琪亚（Barbariccia）**；副本 **The Fell Court of Troia（堕落法庭特洛伊亚）**；大型任务 **Pandæmonium: Abyssos（潘地曼尼南：深渊）** |
| 关键转折点 | ① 官方剧情：*"Five millennia ago, the great wyrm Azdaja vanished into the void... Vrtra has found the resolve to search for her, and sets forth with the Warrior of Light for a world engulfed in Darkness."*；② **Bavrta（瓦尔特拉）**——即**拉札罕总督弗利多（Vrtra）**——正式展开寻妹之旅；③ 虚无界的入口「voidgate」被发现 |

#### 版本 6.3 — 神鸣大地，诸神震动（Gods Revel, Lands Tremble）

| 项目 | 内容 |
|---|---|
| 版本号 | **6.3**（2023-01-10 上线）【官方设定】[6.3 特设站](https://eu.finalfantasyxiv.com/endwalker/patch_6_3/) |
| 主题 | 十三世界的远征；十二神的真身 |
| 核心冲突 | 深入虚无界追查 Golbez；十二神之谜的中章 |
| 主要反派 | **Rubicante（鲁比坎泰）**——「Golbez 麾下最强的四天王」；Golbez 阵营 |
| BOSS | 讨伐战 **Mount Ordeals（试炼之山）**——**Rubicante**；副本 **Lapis Manalis（碧石马纳利斯）**（加雷马山中废弃村落）；24 人本 **Myths of the Realm 第二弹：Euphrosyne（欧芙洛绪涅）**；6.31 **The Omega Protocol (Ultimate)**；6.35 深层迷宫 **Eureka Orthos** |
| 关键转折点 | ① **Zero 正式登场并被官方定义为「a half-voidsent woman（半虚无兽的女性）」**，是十三世界中玩家「意想不到的盟友」，并**暂时随玩家回到原初世界**；② 官方剧情：*"In the darkness of the Thirteenth, the Warrior of Light finds an unexpected ally in a half-voidsent woman named Zero. She returns with them to the Source for a time, and upon recovering from their recent trials, they prepare to continue the search for Azdaja. But an unforeseen threat bars their path..."*；③ **Lapis Manalis** 揭示加雷马人曾修习**钐镰客（reaper）**之术——解释 6.0 新职业的世界观根基；④ 十二神「为了达成其目的，必须与人类一战」（官方原文：*"The Twelve, Eorzea's guardian deities, seek to fulfill their enigmatic aspirations, and for this they claim they must engage in battle with men."*） |

**6.3 关键剧情金句（六字题辞）**：*"What care gods for mortal woe, heedless of realms rent below"*（诸神何曾在意凡人之悲，何曾俯视下方崩裂的国土）——【官方设定】[6.3 特设站](https://eu.finalfantasyxiv.com/endwalker/patch_6_3/)

#### 版本 6.4 — 黑闇的王座（The Dark Throne）

| 项目 | 内容 |
|---|---|
| 版本号 | **6.4**（2023-05-23 上线）【官方设定】[6.4 特设站](https://eu.finalfantasyxiv.com/endwalker/patch_6_4/) |
| 主题 | 夺回阿兹达加；黑闇王座的攻防 |
| 核心冲突 | 通往十三世界的门被毁，需另寻入境之法；与 Golbez 的正面决战 |
| 主要反派 | **Golbez**；四天王 **Cagnazzo（卡尼亚佐）**、**Rubicante（鲁比坎泰）** |
| BOSS | 讨伐战 **The Voidcast Dais（虚妄投映台）**——**Golbez**；副本 **The Aetherfont（以太泉）**；大型任务 **Pandæmonium: Anabaseios（潘地曼尼南：登天）** |
| 关键转折点 | ① 官方剧情：*"With a gambit that would cost them their very lives, the archfiends Cagnazzo and Rubicante succeeded in destroying the voidgate hidden within the depths of Alzadaal's Legacy, thus barring the path to the Thirteenth."*；② 官方对 Golbez 战的描述：*"After five long millennia, Azdaja's liberation is at hand. Yet Golbez, her ironclad captor, will not be so easily cast from his seat of power..."*；③ **Pandæmonium 系列在 6.4 迎来最终章 Anabaseios** |

#### 版本 6.5 — 生长之光（Growing Light）＋6.55

| 项目 | 内容 |
|---|---|
| 版本号 | **6.5**（2023-10-03 上线）；**6.55**（后续）【官方设定】[6.5 特设站](https://eu.finalfantasyxiv.com/endwalker/patch_6_5/) |
| 主题 | 虚无界篇的收束；「对深渊，再度闪耀希望」 |
| 核心冲突 | **泽罗姆斯（Zeromus）**的觉醒——其强度「非辉煌之光不可穿透」 |
| 主要反派 | **Zeromus**（由阿兹达加的思乡之情驱动） |
| BOSS | 讨伐战 **The Abyssal Fracture（深渊断裂）**——**Zeromus**；6.55 讨伐战 **The Gilded Araya（镀金阿赖耶）**——**Asura（阿修罗）**；副本 **The Lunar Subterrane（月下冥宫）**；24 人本 **Myths of the Realm 第三弹：Thaleia（塔莱亚）** |
| 关键转折点 | ① 官方剧情：*"The Warrior of Light's victory over Golbez proved hollow, for it did nothing to stop the awakening of Zeromus. Its strength was beyond reckoning, clad in Darkness nigh-impenetrable. Indeed, naught save resplendent Light could pierce such a tenebrous veil, and so the Warrior of Light seeks aid from their allies in the First."*——**这是 6.5 最关键的跨资料片联动：从第一世界借「光」**；② 官方对副本的描述：*"It is there, within the recesses of the Thirteenth's moon, Zeromus bides its time"*；③ 官方对 Zeromus 战的描述：*"The dread voidsent Zeromus, driven by Azdaja's longing to return home, is now poised to break the barrier between worlds."*；④ 6.55 结局：*"With Zeromus defeated and the threat of a voidsent incursion now passed, the Warrior of Light returns to the Source, their adventure at last come to an end. But rarely is there rest for the righteous, for an unexpected visitor has come knocking at the Baldesion Annex, eager for an audience with Eorzea's greatest hero."*；⑤ 24 人本终章：*"It was out of their undying love for mankind that the Twelve constructed the monument at the heart of the Omphalos... To answer that love, you must sally forth into their sanctum one last time to grant them their heart's desire..."* |

---

## 5. 6.x 十三世界（虚无界）主线专题

### 5.1 十三世界是什么

| 概念 | 说明 |
|---|---|
| 第十三世界 / 虚无界 | 十四个镜像世界之一；被**暗之泛滥**吞噬，成为「虚无界（the Void）」 |
| 虚无界人 → 虚无兽（voidsent） | 该世界的人类因暗之泛滥而变异为追求以太的虚无存在 |
| 门（voidgate） | 连接原初世界与第十三世界的通道；6.1 在**阿尔札达尔遗产**发现，**6.4 被 Cagnazzo 与 Rubicante 自毁封死** |
| 十三世界的月亮 | 6.5 副本 **The Lunar Subterrane** 所在地；**Zeromus 在此蛰伏** |
| 阿兹达加（Azdaja） | **弗利多（Vrtra）**的妹妹，五千年前坠入虚无界；成为 Zeromus 觉醒的驱动 |
| Golbez（高贝扎） | 虚无界的支配者，**阿兹达加的「铁腕捕缚者」** |

### 5.2 6.x 虚无界篇人物表

| 角色 | 中文 | 定位 | 来源 |
|---|---|---|---|
| Vrtra / Bavrta | 弗利多 / 瓦尔特拉 | 拉札罕总督，巨龙的化身；寻妹之旅发起者 | 【官方设定】[6.2 特设站](https://eu.finalfantasyxiv.com/endwalker/patch_6_2/) |
| Azdaja | 阿兹达加 | 五千年前消失的巨龙，Zeromus 的驱动源 | 【官方设定】[6.5 特设站](https://eu.finalfantasyxiv.com/endwalker/patch_6_5/) |
| Golbez | 高贝扎 | 虚无界黑闇王座之主；「铁腕捕缚者」 | 【官方设定】[6.4 特设站](https://eu.finalfantasyxiv.com/endwalker/patch_6_4/) |
| **Zero** | 泽罗 | **半虚无兽的女性（a half-voidsent woman）**；十三世界中玩家的「意想不到的盟友」；6.3 暂时随玩家回到原初世界 | 【官方设定】[6.3 特设站](https://eu.finalfantasyxiv.com/endwalker/patch_6_3/) |
| Cagnazzo | 卡尼亚佐 | 四天王之一；以性命为代价破坏 voidgate | 【官方设定】[6.4 特设站](https://eu.finalfantasyxiv.com/endwalker/patch_6_4/) |
| Rubicante | 鲁比坎泰 | 四天王之一；**官方称其为「Golbez 麾下最强的四天王」**，6.3 **Mount Ordeals** 讨伐对象；6.4 与 Cagnazzo 一同以性命破坏 voidgate | 【官方设定】[6.3 特设站](https://eu.finalfantasyxiv.com/endwalker/patch_6_3/)、[6.4 特设站](https://eu.finalfantasyxiv.com/endwalker/patch_6_4/) |
| Barbariccia | 芭芭莉琪亚 | 四天王之一；6.2 **Storm's Crown** 讨伐对象，被官方描述为「Golbez 最傲慢的副官」 | 【官方设定】[6.2 特设站](https://eu.finalfantasyxiv.com/endwalker/patch_6_2/) |
| Scarmiglione | 斯卡尔米利奥内 | 四天王之一 | 【社区整理】，**出场版本待核验** |
| Zeromus | 泽罗姆斯 | 6.5 最终对手；由阿兹达加的思乡之情驱动 | 【官方设定】[6.5 特设站](https://eu.finalfantasyxiv.com/endwalker/patch_6_5/) |

> **⚠️ 关于「Golbez ＝ Durante」的核验结果**：本笔记**未能**在可用来源中取得「Golbez 的真实身份是骑士 Durante」的双源确认，故**不列为已核实事实**。官方页面仅称其为「Azdaja 的 ironclad captor」并拥有「seat of power」。此设定在社区广泛流传，建议以游戏内 Cutscene 或 6.3 特设站复核。——【官方设定】[6.4 特设站](https://eu.finalfantasyxiv.com/endwalker/patch_6_4/)

### 5.3 虚无界篇的收束方式（6.5 的「跨资料片联动」）

6.5 的叙事设计有一个非常关键的结构性选择：**面对「非辉煌之光不可穿透」的暗之帷幕，光之战士选择回到第一世界向旧友借光**。官方原文：*"naught save resplendent Light could pierce such a tenebrous veil, and so the Warrior of Light seeks aid from their allies in the First."*——【官方设定】[6.5 特设站](https://eu.finalfantasyxiv.com/endwalker/patch_6_5/)

这意味着 **5.x（第一世界）与 6.x（十三世界）在结构上互为镜像**：一个是「光过剩而死」，一个是「暗过剩而死」；5.0 的解法是引入暗，6.5 的解法是引入光。这是本项目做「剧情对比」时最有价值的骨架。

---

## 6. Pandæmonium 大型任务专题（Lahabrea 是否回归？）

### 6.1 结论先行

| 问题 | 结论 | 来源 |
|---|---|---|
| Lahabrea 是否在 6.x 回归？ | **是**，但回归发生在**大型任务 Pandæmonium**（非主线），且是**以「古代人拉哈布雷亚」的形式被重新构成** | 【社区整理】[玩家剧情复盘 Lodestone 博客（6.4 Raid tag）](https://jp.finalfantasyxiv.com/lodestone/character/27556372/blog/5232103/) |
| 通过哪个内容回归？ | **Pandæmonium: Anabaseios（6.4）** | 同上 + 【官方设定】[6.4 特设站](https://eu.finalfantasyxiv.com/endwalker/patch_6_4/) |
| 三层结构 | **Asphodelos（6.01/6.05）→ Abyssos（6.2/6.21）→ Anabaseios（6.4/6.41）** | 【官方设定】[6.2 特设站](https://eu.finalfantasyxiv.com/endwalker/patch_6_2/)、[6.4 特设站](https://eu.finalfantasyxiv.com/endwalker/patch_6_4/) |

### 6.2 Pandæmonium 剧情要点（社区复盘整理）

> 以下内容来自一位玩家的 6.4 大型任务剧情复盘博客（日语 Lodestone 页面，正文为英文），属**玩家第一手复盘**，可信度较高但非官方文案。引用时请标为【社区整理】。

| 人物 | 关系与真相 |
|---|---|
| **Claudien（克劳迪安）** | 萨雷安研究员，负责引导玩家；**失踪**，被 Athena 使用其身体；结论指向他可能是 **Erichthonios 被分裂后最大的灵魂碎片** |
| **Lahabrea / Hephaistos** | 古代人；**Erichthonios 的父亲**；曾**亲手杀死 Athena** 以阻止她；在 Pandæmonium 中被 Athena 用晶体**重新构成**，但只能「说话」无法行动 |
| **Erichthonios（埃里克托尼俄斯）** | Lahabrea 之子，Pandæmonium 的狱卒；**被 Athena 当作工具使用**；被重新构成后仍对母亲抱有感情 |
| **Athena（雅典娜）** | Erichthonios 之母；真正的幕后黑手；**目标是神格化（godhood）或创造灵魂的能力**；掌控 Themis 的灵魂 |
| **Themis（忒弥斯）** | 即后来的 **Elidibus**；在 Anabaseios 中**被 Athena 控制**，与玩家交战 |
| **Heart of Sabik** | 「来自异星的黑色黄水晶」，经 Athena 精炼，蕴含极高密度以太与破坏性，**会放大欲望**；是她计划的关键 |

**剧情关键句（博客原文摘录）**：*"Athena's goal. Godhood. Or at least the ability to create souls."*；*"She also mentioned a third soul—one that 'has proven difficult to work with'. I'm sure it's Themis."*；*"She....somehow has gotten the impression that not only were they the best candidates to convince me she is in the right, but that they would willingly argue in her favor. The husband that killed her to stop her, and the son she used as a tool."*——【社区整理】[玩家复盘](https://jp.finalfantasyxiv.com/lodestone/character/27556372/blog/5232103/)

### 6.3 Pandæmonium 各层 BOSS（待核验状态）

> **⚠️ 重要提醒**：任务描述中给出的 BOSS 名单（Asphodelos: Erichthonios / Hippokampos / The Phoinix / Hesperos；Abyssos: Hegemone / Kokytos / Proto-Carbuncle / Hephaistos；Anabaseios: Themis / Athena 等）在本笔记的可用来源中**未能全部双源确认**。以下是本笔记能确认与不能确认的分离：

| 层级 | 版本 | 已确认 | 未确认（待核验） |
|---|---|---|---|
| **Asphodelos** | 6.01 / 6.05 | 官方页面确认该层存在，且提到「order has been restored to Asphodelos」 | 具体 BOSS 名单 |
| **Abyssos** | 6.2 / 6.21 | 官方页面提到「the inner circles of Pandæmonium remain in the grip of a mysterious force, and the remaining warders are nowhere to be found」；博客提到 **Kokytos** 被扔进海的下层后「disintegration」 | Hegemone / Proto-Carbuncle / Hephaistos 的层归属 |
| **Anabaseios** | 6.4 / 6.41 | 官方页面：*"The serene expanse of the aetherial sea is marred by the sudden appearance of Pandæmonium, which has crossed eons to threaten the source of life itself."*；博客确认 **Athena** 与 **Themis** 为对手 | Pallas Athena 等形态名 |

**来源**：【官方设定】[6.2 特设站](https://eu.finalfantasyxiv.com/endwalker/patch_6_2/)、[6.4 特设站](https://eu.finalfantasyxiv.com/endwalker/patch_6_4/)；【社区整理】[玩家复盘](https://jp.finalfantasyxiv.com/lodestone/character/27556372/blog/5232103/)

---

## 7. 24 人本「艾欧泽亚神话」（Myths of the Realm）专题

| 弹数 | 副本 | 版本 | 官方描述要点 |
|---|---|---|---|
| 第一弹 | **Aglaia（阿格莱亚）** | 6.1 | *"Eorzea—a realm embraced by gods... people have worshipped a pantheon of divinities known as the Twelve, but Their true identities have remained shrouded in enigma."* 请求送达巴尔德西昂分馆，开启通往神话核心之路 |
| 第二弹 | **Euphrosyne（欧芙洛绪涅）** | 6.3 | 十二神身份的进一步揭示（正文未取得） |
| 第三弹 | **Thaleia（塔莱亚）** | 6.5 | *"It was out of their undying love for mankind that the Twelve constructed the monument at the heart of the Omphalos... To answer that love, you must sally forth into their sanctum one last time to grant them their heart's desire..."* |

**来源**：【官方设定】[6.1 特设站](https://eu.finalfantasyxiv.com/endwalker/patch_6_1/)、[6.5 特设站](https://eu.finalfantasyxiv.com/endwalker/patch_6_5/)

**主题定位**：该系列回答的是**艾欧泽亚十二神的真实身份**——他们并非传统意义上的神，而是与「Omphalos（翁法洛斯）」石碑及对人类的爱相关的存在。这是 6.x 除虚无界外的第二条「世界观补完」线。

---

## 8. 6.x 其他重要内容与版本节点

| 版本 | 时间 | 主要内容 |
|---|---|---|
| 6.0 | 2021-12-07 | 晓月之终途本体；Pandæmonium 开幕；十二神系列预告 |
| 6.01 / 6.05 | 2021-12 / 2022-01 | Pandæmonium: Asphodelos（普通/零式） |
| 6.1 | 2022-04-12 | Newfound Adventure；Alzadaal's Legacy；Aglaia；Crystalline Conflict；Empyreum 住宅区 |
| 6.11 | 2022-05 | **Dragonsong's Reprise (Ultimate)** |
| 6.15 | 2022-06 | Omega: Beyond the Rift；Tataru's Grand Endeavor；Arkasodara 部族任务；Custom Deliveries: Ameliance |
| 6.18 | 2022-07 | **Data Center Travel** 实装 |
| 6.2 | 2022-08-23 | Buried Memory；Troia；Storm's Crown；**Island Sanctuary（无人岛）**；Abyssos；Main Scenario Revisions（Duty Support 扩至 2.x/3.x） |
| 6.25 | 2022-10 | Variant/Criterion Dungeon **The Sil'dihn Subterrane**；Manderville Weapons 开幕；Omicron 部族任务 |
| 6.3 | 2023-01-10 | Gods Revel, Lands Tremble；**Lapis Manalis**；**Mount Ordeals（Rubicante）**；**Euphrosyne**；Zero 登场 |
| 6.31 | 2023-02 | **The Omega Protocol (Ultimate)** |
| 6.35 | 2023-03 | 深层迷宫 **Eureka Orthos**；Loporrit 部族任务；Manderville/Splendorous 续 |
| 6.4 | 2023-05-23 | The Dark Throne；The Aetherfont；The Voidcast Dais；**Anabaseios**；Variant Dungeon **Mount Rokkon**（6.45）；Blue Mage 上限 80 |
| 6.5 | 2023-10-03 | Growing Light；The Lunar Subterrane；**The Abyssal Fracture（Zeromus）**；**Thaleia**；Island Sanctuary 完结；Xbox 开放测试 |
| 6.51 | 2023-11 | Variant/Criterion **Aloalo Island**；Splendorous Tools；Fall Guys 联动；Crystalline Conflict 新竞技场 |
| 6.55 | 2024-01 | Growing Light Part 2；**The Gilded Araya（Asura）**；晓月部族联合任务；Tataru's Grand Endeavor 续 |
| 6.58 | 2024-04 | **FFXIV × FFXVI 联动**（2024-04-02 至 05-08） |

**来源**：【官方设定】[6.1](https://eu.finalfantasyxiv.com/endwalker/patch_6_1/)、[6.2](https://eu.finalfantasyxiv.com/endwalker/patch_6_2/)、[6.4](https://eu.finalfantasyxiv.com/endwalker/patch_6_4/)、[6.5](https://eu.finalfantasyxiv.com/endwalker/patch_6_5/)、[Endwalker 特设站更新时间线](https://eu.finalfantasyxiv.com/endwalker/)

---

## 9. 结构性对照：5.x 与 6.x 的镜像关系

| 维度 | 5.x（第一世界） | 6.x（十三世界） |
|---|---|---|
| 灾害类型 | **光之泛滥**（光过剩） | **暗之泛滥**（暗过剩） |
| 世界状态 | 诺弗兰特苟存，其余结晶化 | 全境成为虚无界，居民变为虚无兽 |
| 玩家解法 | 引入**暗**（成为暗之战士） | 引入**光**（向第一世界借光） |
| 反派动机 | 合并世界以复活佐迪亚克 | Golbez 欲打破世界之壁（动机与手段待核验） |
| 关键牺牲者 | 阿尔博特 / 水晶公的肉体 | 阿兹达加 / 四天王 |
| 收束版本 | 5.3 Reflections in Crystal | 6.5 Growing Light |

**结论**：6.x 的虚无界篇在叙事功能上是 **5.x 的「反向重演」**，这也是为什么 6.5 必须回到第一世界取光——两个资料片在这一刻完成闭环。

---

## 10. 待核验清单（供后续补充）

| # | 待核验事项 | 建议来源 |
|---|---|---|
| 1 | Golbez 是否即骑士 **Durante**（身份反转） | 6.3 特设站 / 游戏内 Cutscene / 中文社区 |
| 2 | **Zero** 是否重获肉体 / 其与十三世界骑士团的渊源（**「半虚无兽的女性」已由官方确认**，但完整身世仍未核验） | 6.3–6.5 主线复盘 |
| 3 | 四天王中 **Scarmiglione** 的出场版本 | 6.1–6.3 讨伐战列表 |
| 4 | Pandæmonium 三层完整 BOSS 名单 | 官方 Patch Notes / Thonky 副本页 |
| 5 | ~~6.3 的讨伐战与副本名~~ **已核验：Mount Ordeals / Lapis Manalis / Euphrosyne** | ✅ [6.3 特设站](https://eu.finalfantasyxiv.com/endwalker/patch_6_3/) |
| 6 | 「Contramemoria」的确切定义与译名 | 十三世界设定资料 |
| 7 | Anabaseios 最终 BOSS 的形态名（是否 Pallas Athena） | 6.4 Patch Notes |
| 8 | 5.0 各 Lightwarden 的正式名称与对应区域 | 5.0 特设站 / 任务列表 |

---

## 11. 引用来源汇总

**官方（Square Enix）**
- [Shadowbringers 特设站](https://eu.finalfantasyxiv.com/shadowbringers/)
- [Patch 5.3 Reflections in Crystal](https://eu.finalfantasyxiv.com/shadowbringers/patch_5_3/)
- [Patch 5.5 Death Unto Dawn](https://eu.finalfantasyxiv.com/shadowbringers/patch_5_5/)
- [Endwalker 特设站](https://eu.finalfantasyxiv.com/endwalker/)
- [Patch 6.1 Newfound Adventure](https://eu.finalfantasyxiv.com/endwalker/patch_6_1/)
- [Patch 6.2 Buried Memory](https://eu.finalfantasyxiv.com/endwalker/patch_6_2/)
- [Patch 6.3 Gods Revel, Lands Tremble](https://eu.finalfantasyxiv.com/endwalker/patch_6_3/)
- [Patch 6.4 The Dark Throne](https://eu.finalfantasyxiv.com/endwalker/patch_6_4/)
- [Patch 6.5 Growing Light](https://eu.finalfantasyxiv.com/endwalker/patch_6_5/)

**社区 / 玩家整理**
- [玩家剧情复盘：Anabaseios（6.4 Raid，Lodestone 博客）](https://jp.finalfantasyxiv.com/lodestone/character/27556372/blog/5232103/)
- [玩家剧情复盘：Shadowbringers 5.0（Lodestone 博客）](https://jp.finalfantasyxiv.com/lodestone/character/40118763/blog/5672427)
- [Fandom 镜像：Raid (Final Fantasy XIV) 列表](https://bw.in.projectsegfau.lt/finalfantasy/wiki/Raid_(Final_Fantasy_XIV))
- [Icy Veins：Endwalker Trials Hub](https://www.icy-veins.com/ffxiv/endwalker-trials-hub)
- [Thonky：FFXIV 任务清单](https://www.thonky.com)

---

*本笔记由研究子代理整理，最后更新 2026-09-15（版本 7.56 期间）。5.x / 6.x 为已完结内容，剧情事实稳定；标注「待核验」项请在引用前二次确认。*
