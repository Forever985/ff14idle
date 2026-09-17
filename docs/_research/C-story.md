# C — 《最终幻想14》主线剧情脉络 调研笔记（供放置游戏章节叙事设计）

> **用途**：为「放置游戏」设计按资料片分章的主线叙事骨架。本文只做**调研笔记**，不是最终交付文档。
> **文件路径**：`E:\deepseek harness\ff14-idle\docs\_research\C-story.md`
> **调研日期**：2026-09-15（JST）
> **游戏版本时效性**：截至 **Patch 7.56**（国际服 **2026-09-08** 上线；2026-09-15 仍有 7.56 内容更新档）。下一部资料片 **Evercold（8.0）** 已公布，预计 **2027 年 1 月**。
> **关联子文档（本次并行调研产出）**：
> - `_part1-arr.md`（1.0 / 2.x 重生之境）
> - `_part2-hw-sb.md`（3.x 苍穹之禁城 / 4.x 红莲之狂潮）
> - `_part3-shb-ew.md`（5.x 暗影之逆焰 / 6.x 晓月之终途）
> - `_part4-raids.md`（8 人大型任务 / 24 人大型任务 / 极神 / 零式 / 绝境战全表）
>
> ⚠️ **全篇剧透警告**：本文含 1.0 至 7.56 全部主线剧透，包括主角团死亡、反派真身、世界设定级反转。
> 🏷 **标注约定**：
> - 【官方设定】= 来自 Square Enix 官方站点（`*.finalfantasyxiv.com`、Lodestone、官方博客）或游戏内文本可核实。
> - 【社区整理】= 来自攻略站/维基/媒体的二次整理，可能有偏差，已在正文标注。
> - 【待核实】= 本次调研中 **无法从可访问来源确认** 的条目（Fandom / Consolegameswiki / GamerEscape 对本次抓取返回超时或 403），落地前需人工复核。
>
> 🚫 **抓取可达性说明（重要，影响本笔记可信度分层）**：本次任务的参考源 `finalfantasy.fandom.com`（连接超时）、`ffxiv.consolegameswiki.com`（HTTP 403）、`ffxiv.gamerescape.com`（HTTP 403）**均无法直接抓取正文**，仅能通过搜索结果摘要间接引用。因此可核查的正文主要来自：**官方特设站 / Lodestone / 官方博客 / Thonky 任务列表 / Eorzean Tavern / GamingTrend / ScreenRant / RPGFan / 各媒体评测**。凡引用 Fandom 的部分均标【待核实】。

---

## 0. 全局速览：FFXIV 主线 = 一个「失忆世界 → 星海真相」的十一层套娃

| 层级 | 问题 | 主线给出的答案（截至 7.56） |
| --- | --- | --- |
| 表层冲突 | 加雷马帝国 vs 艾欧泽亚三国 | 帝国崩解（6.0），冲突转为「世界存续」问题 |
| 中层冲突 | 无影（Ascian）为何挑起灵灾 | 为了让被分割的「原初世界」重新合为十四合一，复活真神佐迪亚克 |
| 里层冲突 | 海德林为何分割世界 | 为了封印佐迪亚克、阻止「终末」 |
| 终局冲突 | 终末（Final Days）是什么 | 古代人赫尔墨斯/梅提翁认为「生命皆苦」，要用绝望吞没一切星球 |
| 后 6.x 冲突 | 十三世界（虚无界）如何拯救 | 6.1–6.55 主线 + 7.0 后延续的「反射世界（Reflection）」群像议题 |
| 7.x 冲突 | 亚历山德里亚与「第九世界」 | 记忆永生的代价、Preservation 组织、7.4 卡尔克斯（Calyx）、7.5/7.56 「至点（Solstice）」与哈尔玛鲁特（Halmarut） |
| 8.0 预告 | Evercold | 【官方设定】2027 年 1 月，已公布标题；剧情细节尚未展开 |

**四个贯穿全篇的叙事母题（对放置游戏的章节设计极有用）**

1. **「记忆」**：水晶塔的 G'raha Tia 沉睡百年 → 亚历山德里亚的「永忆（Living Memory）」与「Endless」 → 7.56「A Winter's Dream」。记忆=可被篡改、可被保存、可被当作货币。
2. **「牺牲与被遗忘」**：1.0 的 Warriors of Light 被世界遗忘 → 路易索瓦 → 帕帕力莫 → 米涅菲莉亚 → 爱梅特赛尔克。
3. **「终末的诱惑」**：古代人→梅提翁的虚无主义 → 7.2 的「成为 Endless 即可永生」→ 7.5「至点」。**「拒绝终结」是系列级反派动机**。
4. **「镜像世界（Reflection）」**：第一世界（5.0）、第十三世界（6.x）、第九世界（7.4+）——每一部资料片其实都在处理同一命题的一个切面。

---

## 1. 版本时间轴总表（可核查的官方日期）

| 版本/资料片 | 中文名 | 上线日期 | 备注 |
| --- | --- | --- | --- |
| FFXIV 1.0 | 原版 | 2010-09-30 | 评价失败，2012-11-11 关服（旧世界终结） |
| 1.23 / 第七灵灾 | 第七灵灾 | 2012-11-11（CG） | 卫月 Dalamud 坠落、Battle of Carteneau |
| FFXIV 2.0 | 重生之境 | 2013-08-27 | 世界重做；开场为「五年前」之后 |
| 2.1 | A Realm Awoken | 2013-12-14 | |
| 2.2 | Through the Maelstrom | 2014-03-26 | 利维坦 |
| 2.3 | Defenders of Eorzea | 2014-07-07 | 拉姆、水晶塔 |
| 2.4 | Dreams of Ice | 2014-10-28 | 希瓦、水晶义勇队成立 |
| 2.5 | Before the Fall | 2015-01-19 | 乌尔达哈政变 |
| FFXIV 3.0 | 苍穹之禁城 Heavensward | 2015-06-23 | |
| 3.1–3.5 | —— | 2015-11-10 起 | 龙诗战争终结、暗之战士 |
| FFXIV 4.0 | 红莲之狂潮 Stormblood | 2017-06-20 | |
| 4.1–4.5 | —— | 2017-10-10 起 | 四圣兽、欧米茄、月读 |
| FFXIV 5.0 | 暗影之逆焰 Shadowbringers | 2019-07-02 | |
| 5.1–5.5 | —— | 2019-10-29 起 | 艾登、虚无界、佐迪亚克 |
| FFXIV 6.0 | 晓月之终途 Endwalker | 2021-12-07 | 海德林·佐迪亚克篇完结 |
| 6.1–6.55 | —— | 2022-04-12 起 | 十三世界、潘达emonium、十二神 |
| FFXIV 7.0 | 黄金的遗产 Dawntrail | **2024-07-02** | 图莱尤拉继位仪式 |
| 7.1 | Crossroads | **2024-11-12** | Echoes of Vana'diel 第 1 弹「Jeuno」 |
| 7.2 | Seekers of Eternity | **2025-03-25** | 亚克德利昂重装级 |
| 7.3 | The Promise of Tomorrow | **2025-08-05** | Echoes of Vana'diel 第 2 弹「San d'Oria」 |
| 7.4 | Into the Mist | **2025-12-16** | 第九世界·特雷诺（Treno）；亚克德利昂重量级 |
| 7.5 | Trail to the Heavens | **2026-04-28** | Echoes of Vana'diel 第 3 弹「Windurst」 |
| 7.51 | —— | **2026-06-09** | 【官方设定】追加**绝境战 Dancing Mad (Ultimate)**（FF6 凯夫卡）与 Tiisol Ja 交易任务、宇宙探索新地点 Auxesia |
| 7.55 | —— | **2026-07-28** | 【官方设定】Occult Crescent: North Horn、幻影武器强化、Hildibrand 黄金篇、友好部族终章（不含主线） |
| **7.56** | **A Winter's Dream** | **2026-09-08** | 当前最新；新增主线 `A Winter's Dream`、限定职业 Beastmaster、Crucible of the Unbroken |
| 8.0 | Evercold | 2027-01（预定） | 【官方设定】已公布标题与档期；剧情细节尚未展开 |

> 来源：【官方设定】官方 Patch 7.1/7.2/7.3/7.4/7.5 特设站页面（[7.1](https://eu.finalfantasyxiv.com/dawntrail/patch_7_1/)｜[7.2](https://eu.finalfantasyxiv.com/dawntrail/patch_7_2/)｜[7.3](https://eu.finalfantasyxiv.com/dawntrail/patch_7_3/)｜[7.4](https://eu.finalfantasyxiv.com/dawntrail/patch_7_4/)｜[7.5](https://eu.finalfantasyxiv.com/dawntrail/patch_7_5/)）；【官方设定】[Patch 7.56 Notes（Lodestone）](https://na.finalfantasyxiv.com/lodestone/topics/detail/a8a526ad64db45c8ca8d1c7fdcce8a5eedaa18bc)；【社区整理】[Thonky - List of Main Scenario Quests](https://www.thonky.com/final-fantasy-xiv/list-of-main-scenario-quests)。

---

## 2. 1.0 版（2010–2012）与第七灵灾 —— 「被世界遗忘的英雄」

### 2.1 一句话核心冲突

> **一个即将被神毁灭的世界，和一群注定被历史抹去名字的英雄。**

### 2.2 关键事件链

| 环节 | 内容 | 来源性质 |
| --- | --- | --- |
| 1.0 开局 | 玩家作为冒险者抵达艾欧泽亚，卷入加雷马帝国侵略与「卫月（Dalamud）」异常接近的双重危机 | 【社区整理】 |
| 卫月 Dalamud | 名义上是「月亮的碎片/红色天体」，实际是**封印着蛮神巴哈姆特的拘束具**（亚拉戈帝国遗物） | 【社区整理】 |
| 第七灵灾 | 加雷马帝国第七军团发动 Meteor 计划，引落卫月，巴哈姆特破封，艾欧泽亚被火焰与灵灾吞没 | 【社区整理】 |
| Battle of Carteneau | 三国联军 vs 加雷马军团，在 Carteneau 平原的决战 | 【社区整理】[Gamer Escape 镜像](https://ffxiv.gamerescape.com/wiki/Seventh_Umbral_Calamity) |
| 路易索瓦（Louisoix Leveilleur） | 拂晓血盟前身组织领袖，贤者；以「十二神之力」试图封印巴哈姆特，最终以自身为代价将玩家传送至五年后 | 【社区整理/待核实】 |
| 五年前后 | 玩家被抛到 2.0 开始的时点；**世界对 Warriors of Light 的记忆被抹除**，这是 2.0–3.x 的一条暗线 | 【社区整理】[Carteneau Flats](https://finalfantasy.fandom.com/wiki/Carteneau_Flats)（【待核实】仅摘要） |

### 2.3 让「1.0」在叙事上独一无二的三件事

1. **它是真实被删除的 MMO**：旧世界 2012-11-11 关服，CG《Answers》中路易索瓦的独白成为系列图腾。放置游戏若要做「序章」，**「世界的终结 + 记忆丧失」** 是最强的开局钩子。
2. **玩家身份的双重性**：既是「1.0 的老兵」（仅有部分玩家），又是「2.0 的新人」。7.x 的 G'raha Tia 与 5.0 的「暗之战士」都在复写这个母题。
3. **BOSS 层级的原始设定**：巴哈姆特（Bahamut）作为**灵灾级灾厄**，后来在 **The Binding Coil of Bahamut（2.0 大型任务）** 中被正式收尾——这是 1.0 与 2.0 之间唯一的「剧情闭环」。

### 2.4 相关 BOSS / 内容

| 内容 | 类型 | 版本 | 说明 |
| --- | --- | --- | --- |
| 巴哈姆特（Bahamut） | 剧情级灾厄 | 1.0 结局 | 第七灵灾元凶 |
| The Binding Coil of Bahamut | 8 人大型任务（3 层） | 2.0–2.4 | 收尾 1.0 遗留剧情；最终 BOSS 巴哈姆特 Prime、菲尼克斯 |
| Carteneau Flats | 战场 | 2.x | 灵灾战场旧址 |

---

## 3. 2.0 重生之境（A Realm Reborn, 2.0–2.5）—— 「英雄回归，但没人记得」

### 3.1 一句话核心冲突

> **三大城邦要在加雷马帝国的吞并下活下来，而玩家必须先弄明白「自己是谁」。**

### 3.2 主线结构（2.0–2.5 逐补丁）

| 版本 | 副标题 | 主题 | 核心冲突 | 主要反派 | BOSS / 极神 | 关键转折点 |
| --- | --- | --- | --- | --- | --- | --- |
| 2.0 | A Realm Reborn | 复兴与立足 | 艾欧泽亚三国 vs 加雷马第十四军团 | 盖乌斯·范·巴埃萨（Gaius van Baelsar）、拉哈布雷亚（Lahabrea） | 伊弗利特、泰坦、迦楼罗、究极神兵（Ultima Weapon）、盖乌斯 | 究极神兵夺取蛮神之力；卡斯特鲁姆·梅里迪亚努姆攻略；盖乌斯自尽；究极神兵被毁 |
| 2.1 | A Realm Awoken | 重建与暗流 | 三国同盟的脆弱性 + 无影暗中活动 | 拉哈布雷亚、无影 | 究极神兵（再战）、古武狼王 Good King Moggle Mog XII | 「第七黎明（拂晓血盟）」正式定名；敏菲利亚就任 |
| 2.2 | Through the Maelstrom | 海都与蛮神 | 利维坦威胁、海盗与地灵族 | 利维坦（蛮神） | 利维坦、海雄旅团相关 | 夕雾（Yugiri）登场；多玛难民线铺开 |
| 2.3 | Defenders of Eorzea | 三国联合 | 三国结盟与异端审判 | 拉姆（蛮神）、异端者 | 拉姆、Shiva? 【待核实】 | 「水晶塔」剧情线开启；伊修加德异端审判官线 |
| 2.4 | Dreams of Ice | 冰之蛮神 | 希瓦（Iceheart/Ysayle）与异端者 | 希瓦/Iceheart、无影 | 希瓦 | **水晶义勇队（Crystal Braves）成立（阿尔菲诺主导）**；特尔吉·冯·图拉尔登场 |
| 2.5 | Before the Fall | 崩坏 | **乌尔达哈政变** | 特尔吉·冯·图拉尔、伊尔伯德、拉哈布雷亚、无影 | 吉尔伽美什系? 【待核实】、Steps of Faith（龙族来袭） | **娜娜莫女王「被毒杀」→ 特尔吉被伊尔伯德斩首 → 水晶义勇队背叛 → 拂晓血盟被栽赃 → 全员流亡伊修加德** |

### 3.3 2.5 政变事件分解（放置游戏「第一章高潮」的最佳模板）

| 步骤 | 事件 | 叙事功能 |
| --- | --- | --- |
| ① | 乌尔达哈庆功宴，拂晓血盟受邀 | 假的安全感 |
| ② | 娜娜莫（Nanamo Ul Namo）宣布退位、削弱贵族权力 | 触发既得利益者杀机 |
| ③ | 女王饮下毒酒「倒下」；拉哈布雷亚介入 | 第一记重击 |
| ④ | 特尔吉·冯·图拉尔认领罪行并炫耀 | 反派自曝 |
| ⑤ | **伊尔伯德当众斩首特尔吉**，阿拉米格解放战线翻脸 | 第二记反转（盟友即凶手） |
| ⑥ | 水晶义勇队倒戈，指控拂晓血盟弑君 | 第三记反转（制度性背叛） |
| ⑦ | 劳班被诬陷入狱；敏菲利亚等人四散 | 主角团被剥夺全部资源 |
| ⑧ | 幸存者越过风雪前往伊修加德 | 章节收束，指向 3.0 |

> **叙事要点**：娜娜莫实为**假死**（后续 3.x 揭晓），这是 FFXIV 反复使用的「**死亡不是终点 / 记忆可被改写**」结构的第一次大规模演练。
> 来源：【社区整理】[Thonky 2.5 任务列表](https://www.thonky.com/final-fantasy-xiv/arr-main-scenario-quests)（任务名 `Before the Dawn`、`The Parting Glass`）；【待核实】[Gamer Escape - The Parting Glass](https://ffxiv.gamerescape.com/w/index.php?title=The_Parting_Glass&oldid=1332390)。

### 3.4 2.x 的组织与人物速查（叙事素材库）

| 名词 | 中文 | 定位 |
| --- | --- | --- |
| Scions of the Seventh Dawn | 拂晓血盟 / 第七黎明 | 玩家所属中立组织，全篇第一主角团 |
| Grand Companies | 大国防联军（双蛇党/黑涡团/恒辉队） | 三国军事机构，任务系统 |
| Crystal Braves | 水晶义勇队 | 阿尔菲诺 2.4 创建的跨国部队，2.5 背叛 |
| Garlemald XIVth Legion | 加雷马帝国第十四军团 | 2.0 主要敌军 |
| Gaius van Baelsar | 盖乌斯·范·巴埃萨「黑狼」 | 2.0 最终反派，理念型反派（「强者应当统治」） |
| Ultima Weapon | 究极神兵 | 2.0 最终 BOSS，可吸收蛮神之力 |
| Lahabrea | 拉哈布雷亚 | 无影之一，2.x 暗中操盘 |
| Teledji Adeledji | 特尔吉·冯·图拉尔 | 乌尔达哈财阀，政变导火索 |
| Ilberd Feare | 伊尔伯德 | 阿拉米格解放战线，斩首特尔吉者 |
| Nanamo Ul Namo | 娜娜莫 | 乌尔达哈女王，假死 |

---

## 4. 3.0 苍穹之禁城（Heavensward, 3.0–3.5）—— 「千年的谎言」

### 4.1 一句话核心冲突

> **伊修加德的国教建立在谎言之上的千年战争，必须被揭穿——哪怕揭穿它的人会成为国家的敌人。**

### 4.2 逐补丁表

| 版本 | 副标题 | 主题 | 核心冲突 | 主要反派 | BOSS / 极神 | 关键转折点 |
| --- | --- | --- | --- | --- | --- | --- |
| 3.0 | Heavensward | 谎言与雪 | 伊修加德 vs 龙族；教皇厅的真相 | 托尔丹七世（Thordan VII）、尼德霍格（Nidhogg）、Heavens' Ward | 拉瓦那（Ravana）、俾斯麦（Bismarck）、圆桌骑士（Knights of the Round）、尼德霍格 | 埃斯蒂尼安登场；雅修特拉/阿尔菲诺线；**托尔丹吸收「圆桌骑士」之力成为蛮神** |
| 3.1 | As Goes Light, So Goes Darkness | 战后混乱 | 教皇死后权力真空 | 尼德霍格残党、伊修加德保守派 | 尼德霍格（再战） | 埃斯蒂尼安被龙眼侵蚀；暗之战士（Warriors of Darkness）出现 |
| 3.2 | The Gears of Change | 变革 | 伊修加德政治改革；战女神三斗神线开启 | 保守派、无影 | **Sephirot（萨菲洛特，Containment Bay S1T7）** | 龙诗战争真相进一步公开；战女神三斗神（Warring Triad）线开始 |
| 3.3 | Revenge of the Horde | 复仇 | 尼德霍格的最终复仇 | 尼德霍格 | **The Final Steps of Faith（尼德霍格决战）** | 【官方设定】尼德霍格「身披苍天之龙骑士的肉体（Estinien）」在 Falcon's Nest 和解会议屠杀同族 → 龙诗战争「终曲」 |
| 3.4 | Soul Surrender | 魂之归宿 | 暗之战士与第一世界 | 暗之战士、无影 | **Sophia（索菲娅，Containment Bay P1T6）** | 暗之战士真身 = **第一世界的英雄**，为救世界而来 |
| 3.5 | The Far Edge of Fate | 边缘 | 伊尔伯德复仇、神龙逃逸 | 伊尔伯德（The Griffin） | **Zurvan（祖尔宛，Containment Bay Z1T9，最后一柱）**、**神龙 Shinryu** | 【官方设定】伊尔伯德「以尼德霍格之眼与自身性命」召唤神龙；贤者（帕帕力莫）以命封印 → **帕帕力莫牺牲**；拂晓血盟解散 |

> ⚠️ **重要勘误**：**战女神三斗神顺序为 Sephirot（3.2）→ Sophia（3.4）→ Zurvan（3.5）**，Zurvan 是**最后一柱**（多处二手资料写反）。来源：`_part2-hw-sb.md` 对官方 3.2/3.4/3.5 特设站的核对。

### 4.3 龙诗战争（Dragonsong War）设定三角

| 角色 | 中文 | 阵营 | 叙事功能 |
| --- | --- | --- | --- |
| Thordan VII | 托尔丹七世 | 伊修加德教皇 | 谎言的维护者；最终自我神格化 |
| Nidhogg | 尼德霍格 | 邪龙 | 复仇者；因妹妹之死而狂 |
| Hraesvelgr | 圣龙 | 龙族 | 与人类相爱的龙，条约的见证者 |
| Ratatoskr | 拉塔托斯克 | 龙族 | 被人类杀害的龙，千年仇恨的起点 |
| Estinien Wyrmblood | 埃斯蒂尼安 | 苍天之龙骑士 | 复仇者→被复仇吞噬→解放 |
| Ysayle / Iceheart | 伊塞勒 / 冰之心 | 异端者 | 理想主义者，召唤希瓦 |

> **叙事价值**：3.0 是**系列首次用「国家谎言」作为主反派**（而非某个恶人）。对放置游戏而言，这是「章节内政系统 + 传说解锁」的天然模板。
> 来源：【社区整理】[Thonky 3.x 任务列表](https://www.thonky.com/final-fantasy-xiv/list-of-main-scenario-quests)；【社区整理】[Battle on the Steps of Faith（Fandom，待核实）](https://finalfantasy.fandom.com/wiki/Battle_on_the_Steps_of_Faith)。

---

## 5. 4.0 红莲之狂潮（Stormblood, 4.0–4.5）—— 「两条解放战线」

### 5.1 一句话核心冲突

> **被帝国吞并的两片土地——阿拉米格与多玛——同时举起反抗的旗帜，而对面站着一个把战斗当唯一乐趣的怪物。**

### 5.2 逐补丁表

| 版本 | 副标题 | 主题 | 核心冲突 | 主要反派 | BOSS / 极神 | 关键转折点 |
| --- | --- | --- | --- | --- | --- | --- |
| 4.0 | Stormblood | 解放 | 阿拉米格 + 多玛双线反抗 | **芝诺斯·耶·加尔武斯（Zenos yae Galvus）**、芙朵拉（Fordola）、尤尤哈提（Yotsuyu）、朝日（Asahi） | 须佐之男（Susano）、拉克什米（Lakshmi）、**神龙 Shinryu（Royal Menagerie）** | **芝诺斯在 4.0 末死亡**；阿拉米格解放；多玛复国 |
| 4.1 | The Legend Returns | 重建 | 战后治理，四圣兽线开始 | 【待核实】 | 白虎（Byakko） | 四圣兽任务线开始 |
| 4.2 | Rise of a New Sun | 新太阳 | 帝国反击、黑玫瑰 | 瓦里斯（Varis zos Galvus） | 朱雀（Suzaku） | 帝国生化武器「黑玫瑰」登场 |
| 4.3 | Under the Moonlight | 月光 | **尤尤哈提的悲剧** | 尤尤哈提 / **月读（Tsukuyomi）** | **月读（Tsukuyomi）**、Rathalos（MH 联动） | 尤尤哈提之死；朝日阴谋败露 |
| 4.4 | Prelude in Violet | 紫之前奏 | 无影与帝国宫廷 | 索鲁斯·佐斯·加尔武斯（Solus zos Galvus） | 青龙（Seiryu）? **【勘误】4.4 无青龙** | **索鲁斯真身 = 无影爱梅特赛尔克（Emet-Selch）** 揭晓；【官方设定】4.4 出现的「芝诺斯」只是**「戴着芝诺斯面孔的人」＝艾里迪布斯伪装**（真相 5.0 才解释） |
| 4.5 | A Requiem for Heroes | 英雄安魂曲 | 拂晓血盟的终局 | 爱梅特赛尔克、艾里迪布斯 | **The Wreath of Snakes（青龙 Seiryu）** | 【官方设定】阿拉米格的自由才刚开始，帝国即反攻；**拂晓血盟成员接连陷入无法治愈的沉睡**；神秘声音呼唤 → 水晶公召唤玩家至第一世界 |

> ⚠️ **本章两条重要勘误（来自 `_part2-hw-sb.md` 对官方页面的核对）**：
> 1. **4.4 的「芝诺斯」不是芝诺斯本人**，而是**艾里迪布斯（Elidibus）伪装**；真正的芝诺斯已在 4.0 死亡。官方 4.4 文本只说「戴着芝诺斯面孔的人」。
> 2. **4.5 的讨伐战「The Wreath of Snakes」是青龙 Seiryu，不是须佐之男**（二手资料常写错）。4.x 讨伐战完整顺序为：**须佐之男 → 拉克什米 → 神龙 → 白虎 → 月读 → Rathalos（MH 联动）→ 朱雀 → 青龙**。
> 3. 战女神三斗神、哈迪斯（5.0）、尼尔（5.x）**均不属于 4.x**。

### 5.3 4.x 的重要结构创新

| 创新 | 说明 | 对放置游戏的启示 |
| --- | --- | --- |
| **双线并行** | 阿拉米格（劳班/莉瑟）与多玛（飞燕/夕雾/豪雪）两条独立解放线 | 可做「双地图章节」系统 |
| **反派的人格化** | 芝诺斯是「只想要一个对手」的空心人；尤尤哈提是受害者变成加害者 | 反派不做纯恶，做「镜像的玩家」 |
| **四圣兽支线** | 4.1–4.4 独立于主线的四圣兽讨伐 | 章节副玩法（周常讨伐） |
| **欧米茄大型任务** | 4.0–4.3，跨次元兵器欧米茄的自我进化 | 独立科幻支线 |

### 5.4 红莲的主要人物

| 人物 | 中文 | 立场 | 备注 |
| --- | --- | --- | --- |
| Zenos yae Galvus | 芝诺斯 | 帝国皇孙 / 反派 | 系列最受欢迎反派之一；6.0 与被玩家最终决斗 |
| Fordola rem Lupis | 芙朵拉 | 帝国协力者（阿拉米格人） | 「共鸣（Resonance）」实验体；洗白线 |
| Yotsuyu goe Brutus | 尤尤哈提 | 多玛代理总督 | 月读蛮神化；4.3 死亡 |
| Asahi sas Brutus | 朝日 | 尤尤哈提之弟 / 无影协力者 | 4.3 始作俑者 |
| Lyse | 莉瑟 | 阿拉米格解放军 | 伊达（Yda）的妹妹 |
| Hien | 飞燕 | 多玛正统继承人 | 多玛复国君主 |
| Gosetsu | 豪雪 | 多玛武士 | 4.x 与尤尤哈提线核心 |

---

## 6. 5.0 暗影之逆焰（Shadowbringers, 5.0–5.5）—— 「你就是那个故事的恶人」

### 6.1 一句话核心冲突

> **为了让第一世界免于「光之泛滥」，你必须在另一个世界里当一次「暗之战士」——而对面那个最像人的反派，才是这个世界真正的悲剧主角。**

### 6.2 逐补丁表

| 版本 | 副标题 | 主题 | 核心冲突 | 主要反派 | BOSS / 极神 | 关键转折点 |
| --- | --- | --- | --- | --- | --- | --- |
| 5.0 | Shadowbringers | 光与暗的颠倒 | 第一世界（Norvrandt）的光之泛滥 | **爱梅特赛尔克（Emet-Selch）/ 哈迪斯（Hades）**、Vauthry、食罪者（Sin Eaters） | 泰坦尼亚（Titania）、无罪者（Innocence）、**哈迪斯（Hades）** | 水晶公（Crystal Exarch = G'raha Tia）揭示；亚乌罗特（Amaurot）真相；**海德林/佐迪亚克起源** |
| 5.1 | Vows of Virtue, Deeds of Cruelty | 誓约与暴行 | 战后重建与伊甸 | 无影残党 | 伊甸相关 | 伊甸（Eden）大型任务线开启 |
| 5.2 | Echoes of a Fallen Star | 陨星之回声 | 伊甸再生与暗之使徒 | 无影 | 伊甸各层 | 复原第一世界环境 |
| 5.3 | Reflections in Crystal | 水晶之映 | 艾里迪布斯（Elidibus）的孤注 | **艾里迪布斯 / 光之战士（Seat of Sacrifice）** | The Seat of Sacrifice（光之战士） | 水晶公回归原初世界；拂晓血盟复活；Seto 告别 |
| 5.4 | Futures Rewritten | 重写的未来 | 法丹尼尔（Fandaniel）登场 | 法丹尼尔 | The Weapon 系列（Ruby Weapon 等） | **法丹尼尔的「终末」宣言** |
| 5.5 | Death Unto Dawn | 死之黎明 | 月球与塔 | 法丹尼尔、Anima、Lunar Bahamut | 钻石武器、Anima | 拂晓血盟被囚；佐迪亚克/月球线启动 |

### 6.3 5.0 的设定级反转（放置游戏「世界观解锁」节点）

| 反转 | 内容 |
| --- | --- |
| 世界结构 | 原初世界曾被**海德林**分割为**十四个镜像世界（Reflections）**；第一至第十三世界为碎片 |
| 灵灾真相 | 无影发动灵灾，是为了让镜像世界与原初世界「合并（Rejoining）」，以复活**佐迪亚克（Zodiark）** |
| 海德林 | 海德林亦是蛮神级存在，与佐迪亚克对立；两者都是古代人召唤的 |
| 古代人 | 玩家灵魂原来是**古代人**（阿泽姆 Azem 的同伴） |
| 爱梅特赛尔克 | 全部无影行动的原点：他想复活被牺牲的同胞 |

### 6.4 5.x 关键人物

| 人物 | 中文 | 说明 |
| --- | --- | --- |
| Emet-Selch / Hades | 爱梅特赛尔克 / 哈迪斯 | 5.0 最终 BOSS，也是全系列评价最高的反派 |
| Crystal Exarch / G'raha Tia | 水晶公 / 古·拉哈·提亚 | 从水晶塔沉睡百年而来，召唤玩家 |
| Ryne / Minfilia | 琳 / 敏菲利亚 | 第一世界的光之巫女 |
| Ardbert | 阿尔德伯特 | 第一世界的「暗之战士」，与玩家合体 |
| Elidibus | 艾里迪布斯 | 无影调停者，5.3 最终 BOSS |
| Fandaniel | 法丹尼尔 | 5.4 起的主要反派，推动 6.0 |

---

## 7. 6.0 晓月之终途（Endwalker, 6.0–6.55）—— 「为什么要活下去」

### 7.1 一句话核心冲突

> **一个认为「活着没有意义」的终末使者，要用绝望吞没所有星球；而回答她的唯一方式是——继续走下去。**

### 7.2 逐补丁表

| 版本 | 副标题 | 主题 | 核心冲突 | 主要反派 | BOSS / 极神 | 关键转折点 |
| --- | --- | --- | --- | --- | --- | --- |
| 6.0 | Endwalker | 终末 | 终末（Final Days）与古代人 | **法丹尼尔/赫尔墨斯（Hermes）**、**梅提翁（Meteion）/终末使徒（Endsinger）**、佐迪亚克 | 佐迪亚克、海德林（试炼）、终末使徒 | **加雷马帝国崩解**；月球 Mare Lamentorum；**厄尔庇斯（Elpis）时空回溯**；Ultima Thule 最终决战；芝诺斯最终决斗 |
| 6.1 | Newfound Adventure | 新冒险 | 十三世界（虚无界）救援 | 【待核实】 | 【待核实】 | 虚无界剧情开启；泽罗（Zero）登场；24 人本 **Aglaia（神话之域 第 1 弹）** |
| 6.2 | Buried Memory | 被埋藏的记忆 | 虚无界四天王 | 高贝兹（Golbez）、四天王 | **Barbariccia（6.2，Storm's Crown，「高贝兹最傲慢的 Archfiend」）** | 十三世界的过去被揭示；潘达emonium 第 2 层 Abyssos |
| 6.3 | Gods Revel, Lands Tremble | 神乐土震 | 十二神与虚无界 | 【待核实】 | **Rubicante（6.3，Mount Ordeals，「高贝兹最强的 Archfiend」）** | 泽罗（Zero）＝【官方设定】「半虚无兽的女性」，在十三世界首次相遇并暂时随玩家回到原初世界；24 人本 **Euphrosyne** |
| 6.4 | The Dark Throne | 暗之玉座 | 虚无界决战 | 高贝兹 | Cagnazzo 与 Rubicante **自爆摧毁虚无之门**（Alzadaal's Legacy） | 虚无界篇推进；潘达emonium 第 3 层 Anabaseios |
| 6.5 | Growing Light | 渐亮之光 | 虚无界收尾 | **泽罗姆斯（Zeromus）** | **Zeromus（The Abyssal Fracture）**、**The Gilded Araya（Asura）** | 【官方设定】Zeromus 的动机是**阿兹达哈（Azdaja）想回家**；因 Zeromus「身披几乎不可穿透的暗」，**玩家必须返回第一世界借光** → 5.x 与 6.x 构成刻意镜像；24 人本 **Thaleia** |
| 6.55 | —— | 过渡 | 7.0 引子 | 无 | （The Gilded Araya 属 6.55 追加） | 图莱尤拉邀请函 |

> ⚠️ **6.x 需要人工核实 / 已核实的要点**（部分已由 `_part3-shb-ew.md` 对官方页面核实）：
> 1. **拉哈布雷亚确实在 6.x 回归**，但回归载体是 **8 人大型任务「潘达emonium（Pandæmonium）」**（**Asphodelos（6.01/6.05）→ Abyssos（6.2/6.21）→ Anabaseios（6.4/6.41）**），**属大型任务线而非主线**。真凶是**雅典娜（Athena）**——埃里克托尼俄斯（Erichthonios）之母，目标是**成神 / 获得创造灵魂的能力**；她把拉哈布雷亚与埃里克托尼俄斯从水晶中重构，并操控「第三灵魂」**忒弥斯（Themis，未来的艾里迪布斯）**；**克劳迪安（Claudien）** 很可能是埃里克托尼俄斯最大的灵魂碎片。**萨比克之心（Heart of Sabik）** 是来自其他星球的黑色 auracite，能放大欲望。详见 `_part4-raids.md`。
> 2. **「戈耳工」**：主线/大型任务中**没有**以此命名的核心反派或 BOSS【待核实】；建议确认是否与「Gorgon」类杂兵、或与 **Echoes of Vana'diel** 中 FFXI 的怪物混淆。
> 3. **6.x 虚无界的对接对象**：十三世界（The Void）救援线，核心角色为**泽罗（Zero，官方描述「半虚无兽的女性」）**，反派为**高贝兹（Golbez）**，四天王为 **Barbariccia（6.2）／Rubicante（6.3）／Cagnazzo（6.4）／Scarmiglione【待核实】**，最终 BOSS 为**泽罗姆斯（Zeromus，动机＝阿兹达哈想回家）**；**6.5 最终战前置是玩家返回第一世界借光**，与 5.x 成镜像结构。
> 4. **高贝兹＝骑士「Durante」的身份揭露** 与 **Zero 是否取回肉体**：本次可访问来源**未能双重确认**，标【待核实】。

### 7.3 6.0 的设定级回收清单（放置游戏「终局章节」要点）

| 谜题 | 6.0 的答案 |
| --- | --- |
| 终末是什么 | 古代人赫尔墨斯创造的使魔**梅提翁**，飞遍宇宙后收集到所有文明的绝望，化为「终末之歌」 |
| 佐迪亚克 | 古代人为对抗终末而召唤的守护神，需要持续献祭 |
| 海德林 | 维涅斯（Venat）以自身为芯召唤，为封印佐迪亚克并「让人能继续走」而分割世界 |
| 月球 | 古代人准备的避难所；6.0 成为人类逃离终末的方舟 |
| 厄尔庇斯 | 古代人的研究设施；玩家在此得知全部真相 |
| Ultima Thule | 宇宙尽头的死之领域；终末使徒的巢 |

---

## 8. 7.0 黄金的遗产（Dawntrail, 7.0–7.56）—— 「记忆能换永生吗」（★时效性最强章节）

> ⚠️ **本节重点**：7.x 是**仍在进行中**的剧情，7.56 为 2026-09-08 上线的最新内容。以下日期与内容均基于官方特设站与 Patch Notes，属**当前最新状态**。

### 8.1 一句话核心冲突

> **图莱尤拉的继位仪式只是表象；真正的冲突是「亚历山德里亚用记忆换永生」的技术，是否值得以其他世界的人命为代价。**

### 8.2 7.0 主线结构（Part 1 / Part 2）

| 阶段 | 任务区间 | 内容 | 关键转折 |
| --- | --- | --- | --- |
| Part 1（7.0，2024-07-02） | 任务 1–52 | 抵达**图莱尤拉（Tuliyollal）**；**继位仪式（Rite of Succession）**；**乌克·拉玛特（Wuk Lamat）**、**寇尔·拉玛特（Koana）**、**佐拉加（Zoraal Ja）**、**巴克·加·加（Bakool Ja Ja）** 四名候选人竞争；走访 Kozama'uka / Urqopacha / Yak T'el | 黄金乡（Golden City）传说；**Mamook** 与「飞升者」真相 |
| Part 2（7.0，任务 53–100） | 任务 53–100 | 跨海到 **Xak Tural**；**Solution Nine** 与**亚历山德里亚（Alexandria）**；**斯芬恩（Sphene）** 登场；**Living Memory** | **佐拉加成为最终对手**；**Queen Eternal（永恒女王斯芬恩）** 最终决战 |

**7.0 主要人物**

| 人物 | 中文 | 定位 |
| --- | --- | --- |
| Wuk Lamat | 乌克·拉玛特 | 图莱尤拉第四王子/公主，玩家主要战友，继位者 |
| Koana | 寇尔·拉玛特 | 技术官僚派候选人，乌克·拉玛特的义兄 |
| Zoraal Ja | 佐拉加 | 第一王子，「First Promise」，7.0 最终反派之一 |
| Bakool Ja Ja | 巴克·加·加 | 候选人，Blessed Siblings 之一 |
| Gulool Ja Ja | 古鲁尔·加·加 | 图莱尤拉现任统治者（父亲） |
| Sphene | 斯芬恩 | 亚历山德里亚女王；7.0 为 **Endless Sphene（Queen of Reason）** |
| Calyx | 卡尔克斯 | Preservation 组织核心人物，7.3/7.4 主反派 |
| Krile | 库莉尔 | 7.4 剧情核心 |
| Oblivion | 遗忘者 | 【社区整理】反对 **Preservation** 的秘密组织（Lodestone 玩家长文梳理） |

**7.0 的核心命题（社区深度分析，对叙事设计极有价值）**

| 层面 | 内容 | 来源性质 |
| --- | --- | --- |
| Preservation 的交易 | 交出记忆 → 生活在无悲无痛的乐园，只要还有灵魂被从星海榨取就永不死亡 | 【社区整理】Lodestone 玩家长文 |
| Endless 的本质 | **不是活人也不是死人**，是被数据赋形并靠牺牲活人灵魂维持的「回响」 | 【社区整理】 |
| 与 5.x/6.x 的对立 | 5.x/6.x 主题是「拥抱悲伤、从痛苦中成长」；7.0 的亚历山德里亚则**主动放弃记忆以逃避悲伤** | 【社区整理】 |
| 与 Yok Huy 传承的冲突 | Yok Huy 的教义是「只要活人记得，死者就不灭」（书写与铭记）→ 正是爱梅特赛尔克「Remember us」的回响 | 【社区整理】 |
| 7.3 的解法 | **抹除 Endless 并未抹除终端中储存的记忆**；记忆被归还给自愿恢复的亚历山德里亚市民 | 【社区整理+官方 7.3 页面印证】 |

### 8.3 7.1–7.56 逐补丁表（★截至 7.56）

| 版本 | 副标题 | 上线日期 | 主题 | 核心冲突 | 主要反派 | 新内容 / BOSS | 关键转折点 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 7.1 | Crossroads | 2024-11-12 | 十字路 | 「Living Memory」遗留问题；两国如何向前走 | 【待核实】 | 迷宫 **Yuweyawata Field Station**；讨伐 **The Minstrel's Ballad: Sphene's Burden**（Queen Eternal）；大型任务 **Echoes of Vana'diel — Jeuno: The First Walk** | 库莉尔身世线的伏笔；亚克德利昂大赛开幕；**7.1 主线 `Crossroads` 为 7.1 章节终点** |
| 7.11 | —— | 2024-12 | 绝境战 | —— | —— | **Futures Rewritten (Ultimate)** | 5.x 艾登故事线的绝境战重构 |
| 7.15 | —— | 2025-01 | 混沌 | —— | —— | **Cloud of Darkness (Chaotic)** 混沌大型任务 | 2.x 水晶塔 BOSS 的强化重构 |
| 7.2 | Seekers of Eternity | 2025-03-25 | 永恒追寻者 | **「成为 Endless 即可永生」** 的诱惑 vs 对死亡的恐惧 | **Simulant Sphene（拟体斯芬恩）**、Preservation | 迷宫 **The Underkeep**；讨伐 **Recollection**（【官方设定】Patch 7.2 Notes 点名）；大型任务 **The Arcadion: Cruiserweight Division** | **「理性的女王」奇迹般回归，向国民宣布成为 Endless 可获永生** |
| 7.21 | —— | 2025-05 | 宇宙探索 | 支线 | —— | Cosmic Exploration | 与主线并行 |
| 7.25 | —— | 2025-06 | 奥库尔特 | 支线 | —— | **The Occult Crescent: South Horn** | 与主线并行 |
| 7.3 | The Promise of Tomorrow | 2025-08-05 | 明日之约 | **记忆被篡改、Neo Regulator、士兵暴走**；亚历山德里亚市民出现「死亡恐惧传染病」；主线围绕 **Calyx＝Endless 反派** 的据点解谜推进 | **Calyx**、Preservation | 迷宫 **The Meso Terminal**；讨伐 **The Ageless Necropolis**（蛮神 **Necron**）；大型任务 **Echoes of Vana'diel — San d'Oria: The Second Walk**；幻想讨伐 **The Wreath of Snakes (Unreal)**；宝物库 **Vault Oneiron** | 「初代女王斯芬恩」与「Endless 斯芬恩」与「拟体斯芬恩」三方并置；**Memory 作为可掠夺资源**；7.3 收束亚历山德里亚篇；**记忆被归还给自愿恢复的市民——被抹除的 Endless ≠ 记忆被销毁** |
| 7.4 | Into the Mist | 2025-12-16 | 深入雾中 | 转向 **第九世界（Ninth Reflection）**；调查「钥匙（the key）」 | Calyx（收尾）、Preservation | 迷宫 **Mistwake**；大型任务 **The Arcadion: Heavyweight Division**（最终 BOSS 战 M4，曲目《Everything Burns》）；变体迷宫 **The Merchant's Tale**（7.45） | **Combat 击败 Calyx 与 Preservation，亚历山德里亚解放**；库莉尔个人线收束；**前往第九世界的城市特雷诺（Treno）** |
| 7.5 | Trail to the Heavens | **2026-04-28** | 通往天际之路 | 从「雷电肆虐的第九世界」返回后继续研究「钥匙」；盟友传来不安消息 | **哈尔玛鲁特（Halmarut）** 相关 | 迷宫 **The Clyteum**；讨伐 **The Unmaking**（且含 极神版）；大型任务 **Echoes of Vana'diel — Windurst: The Third Walk**（终章）；幻想讨伐 **Shinryu's Domain (Unreal)** | 主线 `Trail to the Heavens`（任务 139）——**「至点（Solstice）」概念正式提出** |
| 7.51 | —— | **2026-06-09** | 绝境战 + 支线 | —— | 凯夫卡（FF6） | 【官方设定】绝境战 **Dancing Mad (Ultimate)**（系列第 7 弹，前置 AAC Heavyweight M4 Savage，IL795，5 阶段，称号 Cruel Legend）；自定义交易 Tiisol Ja；宇宙探索新地点 Auxesia | 无主线推进 |
| 7.55 | —— | **2026-07-28** | 支线大版本 | —— | —— | 【官方设定】Occult Crescent: North Horn、幻影武器强化任务、Hildibrand 黄金篇后续、友好部族终章 | 无主线推进（7.51 Notes 预告主线在 7.56） |
| **7.56** | **A Winter's Dream** | **2026-09-08** | 冬之梦 | **「至点」＝哈尔玛鲁特宣称等待所有世界的命运**；玩家踏上「越来越冷」的旅程 | **哈尔玛鲁特（Halmarut）** | 主线任务 `A Winter's Dream`（起始：石之家 6.1,5.9，NPC 塔塔露）；新增限定职业 **Beastmaster（魔兽使）** 与专属副本 **Crucible of the Unbroken** | **新主线起点；剧情转入「更冷」的新舞台；为 8.0 Evercold 铺路** |

> 【官方设定】7.56 Patch Notes 原文（Lodestone）：*"Faced with the coming Solstice, the fate Halmarut claims to await all worlds, the Warrior of Light embarks upon another journey—one that promises to grow ever colder..."*（[来源](https://na.finalfantasyxiv.com/lodestone/topics/detail/a8a526ad64db45c8ca8d1c7fdcce8a5eedaa18bc)）
> 【官方设定】7.5 特设站（[来源](https://eu.finalfantasyxiv.com/dawntrail/patch_7_5/)）：7.5 主线 `Trail to the Heavens - Part 1`；7.56 主线 `Trail to the Heavens - Part 2` 描述为 *"The Solstice─a rejoining of the reflections guided by nature itself. Still reeling from Halmarut's proclamation, the Scions waver over how to face the looming calamity."*
> 【官方设定】7.4 特设站（[来源](https://eu.finalfantasyxiv.com/dawntrail/patch_7_4/)）：*"The machinations of Calyx and Preservation have been thwarted, releasing Alexandria from the throes of chaos... for Krile, this means turning to face the question that has trailed her like a second shadow."*
> 【社区整理】[GamingTrend 7.4 评测](https://gamingtrend.com/impressions/final-fantasy-xiv-patch-7-4-into-the-mist-impressions/)：7.4 = 由 Dawntrail 向新资料片过渡；主线前往第九世界城市 **Treno**；Krile 为主角。
> 【社区整理】[GamingTrend 7.2 评测](https://gamingtrend.com/impressions/final-fantasy-xiv-7-2-seekers-of-eternity-impressions-the-burden-of-legacy/)：7.2 共有**三个斯芬恩**——初代女王「Sphene」、Dawntrail 的「Endless Sphene」、以及新的邪恶「Simulant」。

### 8.4 7.x 术语表（对新章节命名极有用）

| 术语 | 中文 | 含义 |
| --- | --- | --- |
| Rite of Succession | 继位仪式 | 7.0 主线骨架，候选人竞争 |
| Solution Nine | 第九方案 | 亚历山德里亚的核心都市，第七世界的镜像科技城 |
| Alexandria | 亚历山德里亚 | 7.0 后半主舞台，FF9 致敬 |
| Living Memory | 生者的记忆 / 永忆 | 储存死者记忆的设施 |
| Endless | 无尽者 | 由记忆重构的「永生者」 |
| Preservation | 保存者 | 7.2–7.4 的组织性反派 |
| Neo Regulator | 新调节器 | 7.3 关键道具，记忆篡改 |
| psychonekrosis | 精神坏死症 | 亚克德利昂大赛相关疾病 |
| the key | 钥匙 | 7.4–7.5 调查对象 |
| Ninth Reflection | 第九世界 | 亚历山德里亚的母世界；7.4 起的新舞台 |
| Treno | 特雷诺 | 第九世界的城市（FF9 同名城市） |
| the Solstice | 至点 | **7.5/7.56 提出的新灾厄概念：由自然引导的「反射世界再合并」** |
| Halmarut | 哈尔玛鲁特 | 7.5/7.56 的关键人物/无影级存在【待核实 身份细节】 |
| Evercold | 永寒（8.0） | 2027-01 预定资料片 |

### 8.5 7.x 新增战斗内容（章节 BOSS 池）

| 系列 | 版本 | 内容 |
| --- | --- | --- |
| The Arcadion（亚克德利昂） | 7.0 / 7.2 / 7.4 | 三级别联赛：**Light-heavyweight（M1–M4）** / **Cruiserweight（M5–M8）** / **Heavyweight（M9–M12）** |
| Echoes of Vana'diel（瓦纳·迪尔回声） | 7.1 / 7.3 / 7.5 | 24 人大型任务，FFXI 联动（详见 §9） |
| 绝境战 | 7.11 / 7.51 | **Futures Rewritten (Ultimate)**（5.x 伊甸重构）；**Dancing Mad (Ultimate)**（FF6 凯夫卡，需先通关 AAC Heavyweight M4 Savage） |
| 混沌大型任务 | 7.15 | **Cloud of Darkness (Chaotic)** |
| 幻想讨伐 | 7.3 / 7.5 | Seiryu (Unreal) → **Shinryu's Domain (Unreal)** |

**The Arcadion 完整 BOSS 表（每个 8 人本 4 层，均含 Normal / Savage）**

| 层 | Light-heavyweight（7.0，M1–M4） | Cruiserweight（7.2，M5–M8） | Heavyweight（7.4，M9–M12） |
| --- | --- | --- | --- |
| 1 | **Black Cat** | **Dancing Green** | **Vamp Fatale** |
| 2 | **Honey B. Lovely** | **Sugar Riot** | **Red Hot and Deep Blue**（双 BOSS） |
| 3 | **Brute Bomber** | **Brute Abominator** | **The Tyrant**（换武器型 BOSS） |
| 4 | **Wicked Thunder** | **Howling Blade** | **The Lindwurm**（系列最终战，曲目《Everything Burns》，Tom Morello × Caleb Shomo） |

> 【官方设定】解锁任务：Light-heavyweight = `The Claw in the Dark`；Cruiserweight = `Arcadion: Cruiserweight Progression`；Heavyweight = `Arcadion: Heavyweight Progression`。7.51 绝境战 **Dancing Mad (Ultimate)** 需先通关 **AAC Heavyweight M4 (Savage)**，奖励兑换 **Palazzo Diamond** 武器（IL 795）。
> 【社区整理】Eorzean Tavern 评价 M12「The Lindwurm」为整体系列最难关卡；评测者认为最终 BOSS 的剧情反转「来得突兀」。
> 来源：[Eorzean Tavern - Arcadion Light-Heavyweight](https://eorzeantavern.com/dawntrail/raids/arcadion-light-heavyweight/)｜[Cruiserweight](https://eorzeantavern.com/dawntrail/raids/arcadion-cruiserweight/)｜[Heavyweight](https://eorzeantavern.com/dawntrail/raids/arcadion-heavyweight/)｜[官方 Patch 7.51 Notes](https://de.finalfantasyxiv.com/lodestone/topics/detail/f2e3faea7dd6fecf3f1b66a2a4c30892684d2938)

> 【官方设定】Echoes of Vana'diel 官方回顾博客（[德语版](https://de.finalfantasyxiv.com/blog/003862.html)，2026-06-09）明确：该系列以 7.5「Windurst: The Third Walk」为**最终章**；叙事前提是 **Sareel Ja 观测 Vana'diel 并用自身认知为其赋形**，因此 FFXIV 侧可自由改编而不影响 FFXI 正史（此点为 FFXI 制作人 **藤戸洋司** 访谈原文）。

---

## 9. 24 人大型任务系列（Alliance Raids）总表

| 系列 | 中文 | 版本区间 | 各弹名称 | 剧情核心 | BOSS 代表 | 与主线关联 |
| --- | --- | --- | --- | --- | --- | --- |
| Crystal Tower | 水晶塔 | 2.1–2.3 | Labyrinth of the Ancients / Syrcus Tower / World of Darkness | 亚拉戈帝国遗产、克隆皇帝赞德 | 赞德（Xande）、阿刻戎、**暗黑之云（Cloud of Darkness）** | **5.0 水晶公身份的核心**；G'raha Tia |
| Shadow of Mhach | 玛哈之影 | 3.1–3.3 | The Void Ark / The Weeping City of Mhach / Dun Scaith | 魔大战（玛哈/尼姆/亚姆达波尔） | 迪亚波罗斯、斯卡哈、Ferdiad | 虚无界设定的早期铺垫 |
| Return to Ivalice | 重返伊瓦利斯 | 4.1–4.3 | Royal City of Rabanastre / Ridorana Lighthouse / Orbonne Monastery | 伊瓦利斯大陆的正统继承战争 | Ba'Gamnan、Yiazmat、Famfrit、Belias、**Ultima the High Seraph** | 松野泰己执笔；与 4.x 帝国线呼应 |
| YoRHa: Dark Apocalypse | 尼尔 | 5.1–5.3 | The Copied Factory / The Puppets' Bunker / The Tower at Paradigm's Breach | 机械生命体与「人类」的定义 | 2B/9S/A2、Her Inflorescence | 横尾太郎监修，与主线独立但主题同构 |
| Myths of the Realm | 神话之域 | 6.1–6.3 | Aglaia / Euphrosyne / Thaleia | **十二神（The Twelve）的真实身份与离去** | 十二神各神 | 6.x 世界观收尾；解释艾欧泽亚信仰 |
| Echoes of Vana'diel | 瓦纳·迪尔回声 | 7.1 / 7.3 / 7.5 | Jeuno: The First Walk / San d'Oria: The Second Walk / Windurst: The Third Walk | FFXI 联动，跨世界裂缝；**Sareel Ja** 观测 Vana'diel 并为其赋形 | 详见下方专表 | 7.x 支线但体量与 24 人本同格 |
| Crystal Tower（混沌） | —— | 7.15 | Cloud of Darkness (Chaotic) | 混沌难度重构 | 暗黑之云 | 2.x 内容的现代化 |

### 9.1 Echoes of Vana'diel 三弹 BOSS 详表（★7.x 时效性内容）

| 弹 | 版本 | 名称 | 结构 | BOSS 列表 |
| --- | --- | --- | --- | --- |
| 第 1 弹 | 7.1 | **Jeuno: The First Walk** | 4 场 | ① **Prishe**（无指踢击/星辰拳）② **Fafnir**（姿态三选一）③ **Ark Angels**（MR/GK/TT/HM/EV 五体共享血量 + 颜色标记锁定）④ **Shadow Lord**（两阶段） |
| 第 2 弹 | 7.3 | **San d'Oria: The Second Walk** | 4 场 | ① **Faithbound Kirin**（每场随机 2/4 四神：Genbu/Byakko/Suzaku/Seiryu）② **Ultima, the Feared & Omega, the One**（共享血量，飞空艇跳船）③ **Kam'lanaut**（六元素附魔）④ **Eald'narche**（3×3 棋盘 + 空洞换位） |
| 第 3 弹 | 7.5 | **Windurst: The Third Walk** | 6 场（系列最庞大） | ① **Shantotto the Demon**（3×4 魔线记忆谜题）② **Al Zahbi**（4 波杂兵 + 第 4 波小 Boss **Medusa Swarmsinger**）③ **Alexander Resurrected**（Perfect Defense 硬狂暴 DPS 检查）④ **Garden of Ru'Hmet**（Aw'aern + Aw'zdei）⑤ **Promathia**（三平台 False Genesis 硬狂暴）⑥ **Dread Made Flesh: Shinryu Paradox & Hollow King**（共享一条血、两阶段、不可跳过转场） |

> 【官方设定】Echoes of Vana'diel 官方回顾博客（2026-06-09）确认：本系列以 **7.5「Windurst: The Third Walk」为最终章**；叙事前提是 **Sareel Ja 观测 Vana'diel 并以其自身认知为其赋形**，因此 FFXIV 侧可自由改编而不影响 FFXI 正史（FFXI 制作人 **藤戸洋司** 访谈原文，团队以此「只读视角」保护了 24 年正史）。终章 **Shinryu** 战使用了 **Naoshi Mizuta** 新编的《Vana'diel March》。
> ⚠️ **弹数与补丁对应关系（已用官方特设站页面核实）**：**Jeuno = 7.1**（[官方 7.1 页](https://eu.finalfantasyxiv.com/dawntrail/patch_7_1/)）；**San d'Oria = 7.3**（官方 7.3 页明确标注 `PATCH 7.3`，[来源](https://eu.finalfantasyxiv.com/dawntrail/patch_7_3/)）；**Windurst = 7.5**（官方 7.5 页明确标注）。
> **注意**：本次并行调研的 `_part4-raids.md` 把 San d'Oria 记为 **7.2**（沿用任务列表的章节编号 Dawntrail Part 4 = 7.2，而该弹实际随 **7.3** 上线）。**以官方特设站为准：San d'Oria = 7.3**。另：Patch 7.2 Notes（[Lodestone](https://na.finalfantasyxiv.com/lodestone/topics/detail/e8dc09ebc782c9c57de6489532ed55804541e0c7)）只列出新讨伐战 **Recollection** 与 **Arcadion: Cruiserweight**，**未列任何 24 人本**，可反证 7.2 无新弹。
> 【社区整理】终章剧情前提：**Prishe 重伤**，由 **Bakool Ja Ja** 协助 Landsguard，玩家与 **Alxaal** 一同面对 Sareel Ja 的加冕。
> 来源：[官方博客](https://de.finalfantasyxiv.com/blog/003862.html)｜[Eorzean Tavern - Windurst](https://eorzeantavern.com/dawntrail/raids/windurst-the-third-walk/)｜[Eorzean Tavern - San d'Oria](https://eorzeantavern.com/dawntrail/raids/sandoria-the-second-walk/)｜[Eorzean Tavern - Jeuno](https://eorzeantavern.com/dawntrail/raids/jeuno-the-first-walk/)

---

## 10. 8 人大型任务（Raids）总表

| 系列 | 中文 | 版本 | 三层结构 | BOSS 代表 | 主题 |
| --- | --- | --- | --- | --- | --- |
| The Binding Coil of Bahamut | 巴哈姆特拘束具 | 2.0–2.4 | Coil / Second Coil / Final Coil | Twintania、**Nael deus Darnus**、Bahamut Prime、Phoenix | 收尾 1.0 的第七灵灾 |
| Alexander | 亚历山大 | 3.0–3.3 | Gordias / Midas / Creator | Faust、Living Liquid、**Brute Justice**、Alexander Prime | 机械蛮神的时间悖论 |
| Omega | 欧米茄 | 4.0–4.3 | Deltascape / Sigmascape / Alphascape | Exdeath、**God Kefka**、Chaos、**Omega-M/F** | 跨次元兵器的自我进化实验 |
| Eden | 伊甸 | 5.0–5.2 | **Eden's Gate / Eden's Verse / Eden's Promise**（注意：不是 Resurrection/Descent/Eternity，那些是层内名称） | Leviathan、Ramuh、Shiva、**Oracle of Darkness**、Eden's Promise | 第一世界的环境再生 |
| Pandæmonium | 潘达emonium | 6.0–6.3 | Asphodelos / Abyssos / Anabaseios | Erichthonios、Hesperos、**Lahabrea/Athena**、Themis | **拉哈布雷亚的古代故事** |
| The Arcadion | 亚克德利昂 | 7.0–7.4 | Light-heavyweight (M1-M4) / Cruiserweight (M5-M8) / Heavyweight (M9-M12) | Black Cat、Honey B. Lovely、Brute Bomber、Wicked Thunder、Dancing Green、Sugar Riot、Brute Abominator、Howling Blade、Vamp Fatale、Red Hot and Deep Blue、The Tyrant、**The Lindwurm** | 竞技娱乐业与「精神坏死症」 |

**绝境战（Ultimate）系列**

| 名称 | 版本 | 重构原型 |
| --- | --- | --- |
| The Unending Coil of Bahamut (UCoB) | 4.1 | 2.x 巴哈姆特 |
| The Weapon's Refrain (UWU) | 4.3 | 究极神兵 |
| The Epic of Alexander (TEA) | 5.1 | 亚历山大 |
| The Dragonsong's Reprise (DSR) | 6.1 | 3.x 龙诗战争 |
| The Omega Protocol (TOP) | 6.3 | 4.x 欧米茄 |
| **Futures Rewritten (Ultimate)** | **7.11** | **5.x 伊甸** |
| **Dancing Mad (Ultimate)** | **7.51** | **FF6 凯夫卡**（系列第 7 弹；与 FFXIV 主线无关，属系列化重构） |

---

## 11. 章节叙事设计建议（从调研直接推导）

| 建议 | 依据 |
| --- | --- |
| **章节按「问题」而非「地图」切分** | 每个资料片的核心冲突都是一个哲学问题（2.x=身份、3.x=真相、4.x=自由、5.x=视角、6.x=意义、7.x=记忆） |
| **每个章节保留一个「被遗忘的人」** | 1.0 的 Warriors of Light → 路易索瓦 → 帕帕力莫 → 爱梅特赛尔克 → 7.4 的库莉尔 |
| **把「大型任务」做成放置游戏的独立挂机线** | 水晶塔 / 亚历山大 / 欧米茄 / 艾登 / 潘达emonium / 亚克德利昂 六条并行长线 |
| **7.x 时序必须锁定到补丁** | 7.56 为 2026-09-08；8.0 Evercold 为 2027-01，**放置游戏的 7.x 章节应以「至点（Solstice）」为收束悬念** |
| **反派设计遵循「镜像」原则** | 盖乌斯（强者的秩序）、托尔丹（国家谎言）、芝诺斯（空虚）、爱梅特赛尔克（失去同胞者）、梅提翁（绝望）、斯芬恩/Calyx（拒绝死亡） |

---

## 12. 参考来源清单

**官方（【官方设定】）**
- [FFXIV 官方站 Patch 7.1 Crossroads](https://eu.finalfantasyxiv.com/dawntrail/patch_7_1/)
- [FFXIV 官方站 Patch 7.2 Seekers of Eternity](https://eu.finalfantasyxiv.com/dawntrail/patch_7_2/)
- [FFXIV 官方站 Patch 7.3 The Promise of Tomorrow](https://eu.finalfantasyxiv.com/dawntrail/patch_7_3/)
- [FFXIV 官方站 Patch 7.4 Into the Mist](https://eu.finalfantasyxiv.com/dawntrail/patch_7_4/)
- [FFXIV 官方站 Patch 7.5 Trail to the Heavens](https://eu.finalfantasyxiv.com/dawntrail/patch_7_5/)
- [Lodestone — Patch 7.56 Notes](https://na.finalfantasyxiv.com/lodestone/topics/detail/a8a526ad64db45c8ca8d1c7fdcce8a5eedaa18bc)
- [官方博客 — Echoes of Vana'diel 回顾（含 FFXI 制作人访谈）](https://de.finalfantasyxiv.com/blog/003862.html)

**社区（【社区整理】）**
- [Thonky — List of Main Scenario Quests（全资料片任务列表）](https://www.thonky.com/final-fantasy-xiv/list-of-main-scenario-quests)
- [Thonky — A Realm Reborn MSQ](https://www.thonky.com/final-fantasy-xiv/arr-main-scenario-quests)
- [Thonky — Dawntrail MSQ（含 7.5 任务名）](https://www.thonky.com/final-fantasy-xiv/dt-main-scenario-quests)
- [Eorzean Tavern — Patch 7.5 总结（当前 for 7.56）](https://eorzeantavern.com/ffxiv-patch-7-5/)
- [Eorzean Tavern — Echoes of Vana'diel 各弹攻略](https://eorzeantavern.com/dawntrail/raids/windurst-the-third-walk/)
- [GamingTrend — 7.2 评测](https://gamingtrend.com/impressions/final-fantasy-xiv-7-2-seekers-of-eternity-impressions-the-burden-of-legacy/)
- [GamingTrend — 7.4 评测](https://gamingtrend.com/impressions/final-fantasy-xiv-patch-7-4-into-the-mist-impressions/)
- [IGN — Evercold 公布报道](https://nordic.ign.com/final-fantasy-xiv-online-dawntrail/106763/next-final-fantasy-xiv-expansion-revealed-ffxiv-evercold-coming-january-2027)
- [ScreenRant — Dawntrail 结局解析](https://screenrant.com/ffxiv-dawntrail-final-boss-ending-explained-detail/)

**未能抓取（需人工复核的参考）**
- finalfantasy.fandom.com —— 抓取超时
- ffxiv.consolegameswiki.com —— HTTP 403
- ffxiv.gamerescape.com —— HTTP 403

---

<!-- MERGE-POINT-A：等待 _part1-arr.md / _part2-hw-sb.md 合并 -->
<!-- MERGE-POINT-B：等待 _part3-shb-ew.md / _part4-raids.md 合并 -->
