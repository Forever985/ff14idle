# FFXIV 主线结构 / 支线任务链 / 终盘装备成长 —— 事实核查研究稿

> **编制日期**：2026-09-15
> **覆盖版本**：2.0（新生エオルゼア）～ **7.56**（黄金のレガシー / Dawntrail，2026-09-08 上线）
> **数据基准**：官方 Lodestone 补丁笔记、Eorzea Database（Version: Patch 7.56）、官方特设站、thonky.com MSQ 全表、Eorzea Collection、社区 wiki/攻略站
> **标记约定**
> - **已上线**：截至 2026-09-15 已在国际服实装
> - **已公布未上线**：官方已公布但尚未实装
> - **【未验证】**：未能用一次以上独立来源交叉确认，或来源为单一玩家博客
> - **【推定】**：由同构规律（同一资料片内其他版本的命名/数值模式）推导，非直接来源
> - **【来源冲突】**：不同来源给出不一致的数值/名称，已并列标注
>
> **工具限制（重要）**：`ffxiv.consolegameswiki.com` / `consolegameswiki.com`（含其 `mediawiki/api.php`）、`ffxiv.gamerescape.com`、`ff14.huijiwiki.com`、`leprestore.com`、`zh.wikipedia.org` 在本次检索中**全部无法读取（HTTP 403 / 非公网 IP 拒绝）**。需求方指定的 5 个主要来源中有 3 个属此类，故改用下列等价来源替代：
> - MSQ 逐条列表 → **thonky.com**（2.0–2.5 部分已逐条核对编号）
> - 神典石 → **Lodestone 官方公告「Upcoming Changes to Allagan Tomestones」+ Lodestone 玩家总表「アラガントームストーン一覧」+ Eorzea Database**
> - 品级 → **官方补丁笔记的物品表 + Eorzea Database + Eorzea Collection**
> - 中文名 → 本次**无法核验**，除标注外均为「由日文汉字简化推定」

---

## 0. 版本时间线（速查）

| 版本 | 官方副标题(EN) | 官方副标题(JP) | 实装日 | 状态 |
|---|---|---|---|---|
| 7.0 | Dawntrail | 黄金のレガシー | 2024-07-02（Early Access 2024-06-28） | 已上线 |
| 7.01 | — | — | 2024-07-16 | 已上线 |
| 7.05 | — | — | 2024-07-30 | 已上线 |
| 7.1 | Crossroads | クロスロード | 2024-11-12 | 已上线 |
| 7.11 | — | — | 2024-11-26（**绝境战 Futures Rewritten (Ultimate)**） | 已上线 |
| 7.15 | — | — | 2024-12-17（**Chaotic 24 人副本 The Cloud of Darkness (Chaotic)**） | 已上线 |
| 7.16 | — | — | 2025-01-21 | 已上线 |
| 7.18 | — | — | 2025-02-25 | 已上线 |
| 7.2 | **Seekers of Eternity**【第三方列表】 | 永遠の探求者【未验证】 | 2025-03-25 | 已上线 |
| 7.21 | — | — | 2025-04-22（**宇宙探索实装**） | 已上线 |
| 7.25 | — | — | 2025-05-27（**Occult Crescent: South Horn + 幻影职业**） | 已上线 |
| 7.3 | **The Promise of Tomorrow**【第三方列表】 | 明日への約束【未验证】 | **2025-08-05** | 已上线 |
| 7.31 | — | — | 2025-09-02（**宇宙探索 新星球 Phaenna**） | 已上线 |
| 7.35 | — | — | **2025-10-07**（另有 10-14/10-15 说 → **【来源冲突】**）；**深宫 Pilgrim's Traverse + Yok Huy 友好部族** | 已上线 |
| 7.38 | — | — | 2025-11-11【内容未验证】 | 已上线 |
| 7.4 | **Into the Mist**【第三方列表】 | 霧の向こうへ【推定】 | **2025-12-16**（**AAC Heavyweight Tier (Normal) + 神典石 Mnemonics**） | 已上线 |
| 7.41 | — | — | 2026-01-27（**宇宙探索 新星球 Oizys**） | 已上线 |
| 7.45 | — | — | **2026-03-03**（**AAC Heavyweight Tier (Savage)**） | 已上线 |
| 7.5 | **Trail to the Heavens** | **彼方へ至る路** | **2026-04-28**（官方特设站明记） | 已上线 |
| 7.51 | — | — | **2026-06-02** | 已上线 |
| 7.55 | — | — | **2026-07-28** | 已上线 |
| 7.56 | 无独立副标题（NG+ 章节名 **Winter's Prelude**） | — | **2026-09-08**（补丁笔记页 2026-09-15 有修订记录） | **已上线** |
| 7.58 | — | — | 未公布（仅 7.56 补丁笔记提及） | 【已公布未上线】 |
| 8.0 | **Evercold** | 白銀のワンダラー | **2027 年 1 月**（日未公布） | **【已公布未上线】** |

> **8.0 Evercold 已公布要点**（不属本文件范围，仅作时间轴锚点）：等级上限 **100 → 110**；故事线 **Godless Realms Saga** 第一章；舞台为**第四镜像世界**；新职业 **Bastion**（坦克）；**废除亚拉戈神典石体系**，改为 **Seasons 赛季制 + 活跃度点数**；24 人副本为 **EVANGELION - Ghosts of Desire** 联动。→ 意味着**神典石体系在 8.0 将终结**，本文件 Part 3 的内容有效期止于 7.5x。

**7.5x 系列内容分配（官方 Patch 7.5 Notes 原文，**已确认**）**

| 版本 | 追加内容 |
|---|---|
| 7.5 | 主线 **Trail to the Heavens - Part 1**；讨伐战 **The Unmaking** 及其极难度；24 人副本 **Echoes of Vana'diel - Windurst: The Third Walk**；新 PvP 竞技场 **Archeia Harmonias**；家具配置上限提升；染色剂整合；衣橱/武具投影更新；Group Pose 更新；**免费体验扩至 Shadowbringers（至 5.58，等级上限 80）** |
| 7.51 | 宇宙探索新目的地 **Auxesia**（另有拼写 "Auxsia" → **【来源冲突】**）、工具强化任务 **Cosmic Tools**、新定制委托客户 **Tiisol Ja**、绝副本 **Dancing Mad (Ultimate)** |
| 7.55 | **The Occult Crescent: North Horn**、武器强化任务 **Phantom Weapons**、**Inconceivably Further Hildibrand Adventures**、**Allied Society capstone sidequests** |
| 7.56 | 主线 **Trail to the Heavens - Part 2**、限定职业 **Beastmaster**、专属副本 **Crucible of the Unbroken**、AAC Heavyweight Tier (Savage) 周限制解除 + 常驻 Echo、Mnemonics 周上限 450→900 |

---

## Part 1 — MSQ（主线任务）结构

### 1.1 各版本「章节」划分与官方副标题（补全 2.0–7.56）

> **三套命名体系必须区分**
> ① **官方补丁副标题**（2.1 "A Realm Awoken"）——官方，可确认
> ② **游戏内 NG+ 章节名**（"Dawntrail - Part 1"…"Part 4: Winter's Prelude"）——官方，但只在 NG+ 界面出现
> ③ **剧情分期通称**（第七灵灾 / 第七星历 / 龙诗战争 / 解放战争）——**社群通称，非官方分类名**，本文一律标 **【未验证·通称】**

| 版本 | 官方副标题(EN) | 官方副标题(JP) | 剧情分期（通称） | 状态 |
|---|---|---|---|---|
| 2.0 | A Realm Reborn | 新生エオルゼア | **第七灵灾 / Seventh Umbral Era**（2.0 本体） | 已上线【通称未验证】 |
| 2.1 | A Realm Awoken | 覚醒せし者たち | **第七星历 / Seventh Astral Era**（2.1–2.55） | 已上线【通称未验证】 |
| 2.2 | Through the Maelstrom | 混沌の渦動 | 〃 | 已上线 |
| 2.3 | Defenders of Eorzea | エオルゼアの守護者 | 〃 | 已上线 |
| 2.4 | Dreams of Ice | 氷結の幻想 | 〃 | 已上线 |
| 2.5 | Before the Fall | 希望の灯火 | 〃（含 2.55） | 已上线 |
| 3.0 | **Heavensward** | 蒼天のイシュガルド | **龙诗战争 / Dragonsong War**（3.0–3.3） | 已上线【通称未验证】 |
| 3.1 | As Goes Light, So Goes Darkness | 光と闇の境界 | 〃 | 已上线 |
| 3.2 | The Gears of Change | 運命の歯車 | 〃 | 已上线 |
| 3.3 | Revenge of the Horde | 最期の咆哮 | 〃 | 已上线 |
| 3.4 | Soul Surrender | 魂を継ぐ者 | 3.4–3.55（伊修加德善后 / 四国会议） | 已上线 |
| 3.5 | **The Far Edge of Fate** | 宿命の果て | 〃（含 3.55 / 3.56） | 已上线 |
| 4.0 | **Stormblood** | 紅蓮のリベレーター | **解放战争 / Liberation**（4.0 本编，社群通称） | 已上线【通称未验证】 |
| 4.1 | The Legend Returns | 英雄の帰還 | 4.1–4.55 | 已上线 |
| 4.2 | Rise of a New Sun | 暁光の刻 | 〃 | 已上线 |
| 4.3 | Under the Moonlight | 月下の華 | 〃 | 已上线 |
| 4.4 | Prelude in Violet | 狂乱の前奏曲 | 〃 | 已上线 |
| 4.5 | **A Requiem for Heroes** | 英雄への鎮魂歌 | 〃（含 4.55 / 4.56） | 已上线 |
| 5.0 | **Shadowbringers** | 漆黒のヴィランズ | 第一世界篇 | 已上线 |
| 5.1 | Vows of Virtue, Deeds of Cruelty | 白き誓約、黒き密約 | 5.1–5.55 | 已上线 |
| 5.2 | Echoes of a Fallen Star | 追憶の凶星 | 〃 | 已上线 |
| 5.3 | **Reflections in Crystal** | クリスタルの残光 | 〃 | 已上线 |
| 5.4 | Futures Rewritten | もうひとつの未来 | 〃 | 已上线 |
| 5.5 | Death Unto Dawn | 黎明の死闘 | 〃（含 5.55 / 5.58） | 已上线 |
| 6.0 | **Endwalker** | 暁月のフィナーレ | 终末篇 | 已上线 |
| 6.1 | Newfound Adventure | 新たなる冒険 | 6.1–6.55（新冒险篇 / 虚无界篇） | 已上线 |
| 6.2 | Buried Memory | 禁断の記憶 | 〃 | 已上线 |
| 6.3 | Gods Revel, Lands Tremble | 天の祝祭、地の鳴動 | 〃 | 已上线 |
| 6.4 | The Dark Throne | 玉座の咎人 | 〃 | 已上线 |
| 6.5 | Growing Light | 光明の起点 | 〃（含 6.55 / 6.58） | 已上线 |
| 7.0 | **Dawntrail** | 黄金のレガシー | 图拉尔篇 | 已上线 |
| 7.1 | Crossroads | — | 7.1–7.56 | 已上线 |
| 7.2 | Seekers of Eternity | — | 〃 | 已上线 |
| 7.3 | The Promise of Tomorrow | — | 〃 | 已上线 |
| 7.4 | Into the Mist | — | 〃 | 已上线 |
| 7.5 | **Trail to the Heavens (Part 1)** | 彼方へ至る路 | 〃 | 已上线 |
| 7.56 | （无）| — | NG+ 章节名 **Winter's Prelude** | 已上线 |

### 1.2 MSQ 任务数与首/末任务

> **口径警告**
> - 2.0 序盘存在**三都市互斥分支**（Gridania / Limsa Lominsa / Ul'dah 各自独立的新手任务链，thonky 表中各占 21 条）。是否把三条分支重复计入，会让 ARR 2.0 的总数相差约 40 条。本文采用**单线路计数**。
> - 资料片总数一列为**社群通行近似值**，官方从未公布过逐版本口径 → 全部标 **【未验证·社区近似】**。

| 资料片 | MSQ 总数【未验证·社区近似】 | 备注 |
|---|---|---|
| ARR（2.0 + 2.x） | **约 195** | 与 thonky 编号至 #200（2.5 段含分叉编号）大致吻合 |
| Heavensward（3.0–3.55） | 约 **100** | — |
| Stormblood（4.0–4.56） | 约 **122** | — |
| Shadowbringers（5.0–5.58） | 约 **100** | — |
| Endwalker（6.0–6.58） | 约 **108** | — |
| Dawntrail（7.0–7.56） | 约 **100** | — |

**逐版本明细**

| 版本 | 新增 MSQ 数 | 首个任务(EN) | 末个任务(EN) | 置信度 |
|---|---|---|---|---|
| 2.0 | 约 138（单线路） | Close to Home | **The Ultimate Weapon** | 末任务**已确认**（thonky #138）；总数【未验证】 |
| 2.1 | **10**（thonky #139–148） | The Price of Principles | Build on the Stone | **已确认** |
| 2.2 | **14**（#149–162） | Still Waters | Through the Maelstrom | **已确认** |
| 2.3 | **14**（#163–176） | The Great Divide | Brave New Companions | **已确认** |
| 2.4 | **18**（#177–194） | Traitor in the Midst | Let Us Cling Together | **已确认** |
| 2.5 | 6（#195–200，含分叉） | A Recurring Problem | （至 #200 On the Counteroffensive） | **已确认** |
| 2.55 | 【未验证】 | — | **The Parting Glass** | 末任务【未验证】（社群普遍引用） |
| 3.0 | 【未验证】 | — | **Heavensward** | 【未验证】 |
| 3.3 | 【未验证】 | — | **The Final Steps of Faith** | 【未验证】 |
| 3.5 | 【未验证】 | — | **The Far Edge of Fate** | 【未验证】 |
| 4.0 | 【未验证】 | — | **Stormblood** | 【未验证】 |
| 4.5 | 【未验证】 | — | **A Requiem for Heroes** | 【未验证】 |
| 5.0 | 【未验证】 | — | **Shadowbringers** | 【未验证】 |
| 5.3 | 【未验证】 | — | **Reflections in Crystal** | 【未验证】 |
| 6.0 | 【未验证】 | — | **Endwalker** | 【未验证】 |
| 7.0 | 【未验证】 | — | **Dawntrail** | 【未验证】 |
| 7.1 | 【未验证】 | 【未验证】 | Crossroads【推定：补丁副标题同名规律】 | — |
| 7.2 | 【未验证】 | 【未验证】 | Seekers of Eternity【推定】 | — |
| 7.3 | 【未验证】 | 【未验证】 | The Promise of Tomorrow【推定】 | — |
| 7.4 | 【未验证】 | 【未验证】 | **Into the Mist** | **高置信**（7.5 首个任务前置条件为「Into the Mist」→ 反推为 7.4 末任务） |
| 7.5 | **5**（官方补丁笔记：1 个实名 + 4 个 `???`） | **In Fate's Footsteps**（Solution Nine X:12.6 Y:6.0，NPC Krile） | **Trail to the Heavens** | 首任务/数量**已确认**；末任务**高置信**（7.56 首个任务前置为「Trail to the Heavens」） |
| 7.56 | **4**（1 个实名 + 3 个 `???`） | **A Winter's Dream**（The Rising Stones X:6.1 Y:5.9，NPC Tataru） | 【未验证】 | 首任务/数量**已确认** |

**7.4 → 7.56 主线前置链（官方补丁笔记原文，已确认）**

```
[7.4 末] Into the Mist
   └─> [7.5] In Fate's Footsteps (Krile @ Solution Nine X:12.6 Y:6.0)
          └─> ??? ×3
                 └─> Trail to the Heavens   ← 7.5 末
                        └─> [7.56] A Winter's Dream (Tataru @ The Rising Stones X:6.1 Y:5.9)
                               └─> ??? ×3
```

### 1.3 「关键剧情节点」任务名对照表（EN / CN / JP）

> 中文名除注明外均为**推定**（本次无法读取国服数据库 / huijiwiki）。**引用时请以 EN 为准。**

| 剧情节点 | 任务名(EN) | 中文名 | 日文名 | 版本 | 置信度 |
|---|---|---|---|---|---|
| ARR 2.0 结局（究极神兵） | **The Ultimate Weapon** | 究极的武器【推定】 | 究極の兵器【推定】 | 2.0 | EN **已确认**（thonky #138） |
| ARR 2.1 拂晓迁入石之家 | **Build on the Stone** | — | — | 2.1 | **已确认**（thonky #148） |
| ARR 2.55 结局（血盟解散） | **The Parting Glass** | — | — | 2.55 | 【未验证】 |
| HW 3.0 结局 | **Heavensward** | 苍天之龙骑士【推定】 | 蒼天のイシュガルド | 3.0 | EN【未验证】 |
| HW 3.3 结局（尼德霍格决战） | **The Final Steps of Faith** | — | — | 3.3 | 【未验证】 |
| HW 3.5 结局 | **The Far Edge of Fate** | — | — | 3.5 | 【未验证】 |
| SB 4.0 结局（神龙战） | **Stormblood** | 红莲之狂潮【推定】 | 紅蓮のリベレーター | 4.0 | EN【未验证】 |
| SB 4.5 结局 | **A Requiem for Heroes** | — | — | 4.5 | 【未验证】 |
| ShB 5.0 结局 | **Shadowbringers** | 漆黑的反叛者【推定】 | 漆黒のヴィランズ | 5.0 | EN【未验证】 |
| ShB 5.3 结局 | **Reflections in Crystal** | — | — | 5.3 | 【未验证】 |
| EW 6.0（「照耀世界之暗」） | **The Dark Which Illuminates the World** | — | — | 6.0 | **【未验证】——本次检索未取得任何可验证来源，建议不引用或另行核实** |
| EW 6.0 结局 | **Endwalker** | 晓月之终途【推定】 | 暁月のフィナーレ | 6.0 | EN【未验证】 |
| DT 7.0 结局 | **Dawntrail** | 金曦之遗辉（资料片名） | 黄金のレガシー | 7.0 | 【未验证】 |
| DT 7.5 首个 | **In Fate's Footsteps** | — | — | 7.5 | **已确认**（官方补丁笔记） |
| DT 7.56 首个 | **A Winter's Dream** | — | — | 7.56 | **已确认**（官方补丁笔记） |

> **关于 "The Rising Stones"**：本次检索**未找到**名为 *The Rising Stones* 的 MSQ 任务。该名称在游戏中是**摩杜纳的地点名**（拂晓血盟总部）。**7.56 主线「A Winter's Dream」的起始 NPC Tataru 就在 The Rising Stones (X:6.1 Y:5.9)**。若需求方指的是「拂晓迁入石之家」的剧情节点，对应任务应为 **2.1「Build on the Stone」/「The Price of Principles」**。→ **建议改标为地点名。**

### 1.4 各版本 MSQ / 资料片解锁内容

#### 1.4.1 资料片级解锁

| 资料片 | 等级上限 | 新增职业（起始等级） | 新增野外区域 | 关键系统 |
|---|---|---|---|---|
| ARR 2.0 | 50 | （2.0 无新职业；**2.4 追加双剑士→忍者 Ninja**） | 约 19 区（拉诺西亚/黑衣森林/萨纳兰/库尔札斯/摩杜纳等） | Duty Finder、FATE、房屋、PvP（2.1 狼狱停船场）、蛮神讨伐 |
| HW 3.0 | 60 | **暗黑骑士 Dark Knight**、**占星术士 Astrologian**、**机工士 Machinist**（Lv30 起） | 6（Coerthas Western Highlands / Dravanian Forelands / The Churning Mists / The Sea of Clouds / Dravanian Hinterlands / Azys Lla） | **飞行坐骑 + 风脉泉（Aether Current）**、Alexander、Diadem（3.1） |
| SB 4.0 | 70 | **侍 Samurai**、**赤魔道士 Red Mage**（Lv50 起）；**4.5 青魔法师 Blue Mage（限定职业）** | 6（The Fringes / The Peaks / The Lochs / The Ruby Sea / Yanxia / Azim Steppe） | **游泳·潜水**、Eureka（4.25）、Heaven-on-High（4.35）、重返伊瓦利斯 |
| ShB 5.0 | 80 | **铳士 Gunbreaker**、**舞者 Dancer**（Lv60 起） | 6（Lakeland / Kholusia / Amh Araeng / Il Mheg / The Rak'tika Greatwood / The Tempest） | **Trust（亲信战友）**、Bozja 战线（5.35）、伊修加德复兴 |
| EW 6.0 | 90 | **贤者 Sage**、**钐镰客 Reaper**（Lv70 起） | 6（Labyrinthos / Thavnair / Garlemald / Mare Lamentorum / Elpis / Ultima Thule） | **6.1 Duty Support 覆盖 ARR 主线**、**6.2 Island Sanctuary**、**6.25 Variant/Criterion**、Myths of the Realm |
| DT 7.0 | 100 | **绘灵法师 Pictomancer**、**蛇剑士 Viper**（Lv80 起）；**7.56 驯兽师 Beastmaster（限定职业）** | 6（Urqopacha / Kozama'uka / Yak T'el / Shaaloani / Heritage Found / Living Memory） | **7.21 宇宙探索**、**7.25 Occult Crescent + 幻影职业**、**7.35 深宫 Pilgrim's Traverse**、**7.15 Chaotic 24 人副本** |

#### 1.4.2 7.5x 具体解锁（来源：官方 Patch 7.5 / 7.56 Notes，**已确认**）

| 类别 | 内容 | 条件 / 数值 |
|---|---|---|
| 新副本 | **The Clyteum**（7.5） | Lv100，平均品级 **750** 以上，4 人，90 分钟；支援 Trust / Duty Support / Explorer Mode |
| 新讨伐战 | **The Unmaking**（7.5，普通） | Lv100，平均品级 **755** 以上，8 人，60 分钟。⚠️ **【来源冲突】**：日本方面报道把 7.5 新讨伐战记作「**Enuo**（エヌオー）」，而官方 EN 补丁笔记原文为 "the new trial, **the Unmaking**"。推测为「任务/讨伐战名」与「BOSS 名（Enuo，出自 FFV）」的差异 |
| 新讨伐战（极） | **The Unmaking (Extreme)**（7.5） | Lv100，平均品级 **770** 以上，8 人；仅 Raid Finder；道具在 Solution Nine 与 **Uah'shepya** 交换 |
| 幻想讨伐战 | **Shinryu's Domain (Unreal)**（7.5） | Lv100，平均品级 690 以上，**品级同步 695**；替换 **Tsukuyomi's Pain (Unreal)**（后者自此不可访问） |
| 24 人副本 | **Echoes of Vana'diel — Windurst: The Third Walk**（7.5） | 前置编年史任务「Apocalypse Nigh」；7.56 加入 Alliance Raid 随机任务 |
| 编年史任务 | **The Hollow Promise**（7.5） | Lv100，Tuliyollal X:16.2 Y:3.9，Landsguard Messenger；前置「Apocalypse Nigh」 |
| 新支线 | **The Wing Spirit Cometh**（7.5） | Lv1，需持有 7 种「Wings of …」坐骑 |
| Duty Support 扩充 | 7.5 追加 **The Dusk Vigil**（HW）、**Shisui of the Violet Tides**（SB）、**The Clyteum**（DT） | — |
| 天书奇谭 | 追加可登记副本：Worqor Lar Dor (Extreme)、Everkeep (Extreme)、Sphene's Burden、Recollection (Extreme)、Necron's Embrace、Hell on Rails (Extreme)、The Windward Wilds (Extreme)、Shinryu's Domain | 7.5 |
| 家具上限 | 公寓室内 100→150；小屋室内 200→300、室外 20→40；一般房屋 300→450 / 30→60；豪宅 400→600 / 40→80；同时同屏显示上限 400 | 7.5 |
| 绝副本 | **Dancing Mad (Ultimate)**（日文「絶妖星乱舞」） | 7.51 |
| 限定职业 | **Beastmaster** —— 近战 DPS，**Lv1–50**，武器为单手斧 + 盾，与 Monk / Samurai 共用装备；起始任务 **Strangers in the Wood**（New Gridania X:11.8 Y:13.6，前置 MSQ「The Ultimate Weapon」） | 7.56 |
| 限定职业专属副本 | **Crucible of the Unbroken** | 7.56；棋盘制单人挑战，Lv30 起；排行 Season 1：**2026-09-24 起至 7.58 实装**，各物理大区前 300 名获奖 |
| 8.0 预告 | **Evercold**（2027-01，等级上限 110，废除神典石） | 【已公布未上线】 |

> **Beastmaster 限制（官方明记）**：不可使用职能动作；**不可**参加随机任务、The Forbidden Land Eureka / Bozjan Southern Front / Occult Crescent / Variant Dungeon / Criterion Dungeon / 绝境战 / Stone, Sky, Sea、squadron 任务、深层迷宫、PvP（含决斗）、初心者讲堂；佣兵（Retainer）不可设为 Beastmaster；任务仅可接受「职业任务」与「全职业通用任务」。**7.5 起，多数任务的接受条件由「Any Disciple of War or Magic」改为「Any Disciple of War or Magic (excluding limited jobs)」**（官方明记）。

---

## Part 2 — 重要支线 / 可选任务链

### 2.1 24 人副本（Alliance Raid）系列

| 系列 | 中文通称 | 三部作 | 版本 | 前置要求 |
|---|---|---|---|---|
| **Crystal Tower** | 水晶塔 | Labyrinth of the Ancients / Syrcus Tower / The World of Darkness | 2.1 / 2.3 / 2.5 | 2.0 通关 |
| **Shadow of Mhach** | 玛哈之影 | The Void Ark / The Weeping City of Mhach / Dun Scaith | 3.1 / 3.3 / 3.5 | 3.0 通关 |
| **Return to Ivalice** | 归还伊瓦利斯 | Royal City of Rabanastre / Ridorana Lighthouse / Orbonne Monastery | 4.1 / 4.3 / 4.5 | 4.0 通关；**是 Bozja（抵抗军武器）的前置** |
| **YoRHa: Dark Apocalypse** | 寄叶异闻 暗黑天启 | The Copied Factory / The Puppets' Bunker / The Tower at Paradigm's Breach | 5.1 / 5.3 / 5.5 | 5.0 通关 |
| **Myths of the Realm** | 神话之域 | **Aglaia (6.1) / Euphrosyne (6.3) / Thaleia (6.5)** | 6.1 / 6.3 / 6.5 | 6.0 通关 |
| **Echoes of Vana'diel** | 瓦纳迪尔的回响 | **Jeuno: The First Walk (7.1) / San d'Oria: The Second Walk (7.3) / Windurst: The Third Walk (7.5)** | 7.1 / 7.3 / 7.5 | 编年史任务链 |
| （特殊） | Chaotic 24 人副本 | **The Cloud of Darkness (Chaotic)** | 7.15 | 【未验证】 |

> **Myths of the Realm 三部作名称已确认**：Aglaia（6.1）/ Euphrosyne（6.3，エウプロシュネ）/ Thaleia（6.5，塔莱亚）。前稿曾误记为「Thaleia 为第二部」，**已修正**。
> **Crystal Tower 是 ShB 主线的硬性前置**：自 **5.3「Reflections in Crystal」** 起，推进 Shadowbringers 5.3 主线必须先通关 Crystal Tower 三部曲。→ 可标为**已确认**。
> 各系列的具体掉落品级本次**未取得可验证数值** → **【未验证】**。

### 2.2 8 人副本（Raid）系列

| 系列 | 三部作（版本） | 层名 | 零式版本 | 备注 |
|---|---|---|---|---|
| **The Coil of Bahamut** | Binding Coil (2.0) / Second Coil (2.2) / Final Coil (2.4) | T1–T5 / T6–T9 / T10–T13 | 2.2 起设 Second Coil Savage | **无随机任务**，需组队；非随机匹配 |
| **Alexander** | Gordias (3.01) / Midas (3.2) / Creator (3.4) | A1–A4 / A5–A8 / A9–A12 | 3.05 / 3.2 / 3.4 | — |
| **Omega** | Deltascape (4.01) / Sigmascape (4.2) / Alphascape (4.4) | O1–O4 / O5–O8 / O9–O12 | 4.05 / 4.2 / 4.4 | — |
| **Eden** | Eden's Gate (5.01) / Eden's Verse (5.2) / Eden's Promise (5.4) | E1–E4 / E5–E8 / E9–E12 | 5.05 / 5.2 / 5.4 | — |
| **Pandæmonium** | Asphodelos (6.01) / Abyssos (6.2) / Anabaseios (6.4) | P1–P4 / P5–P8 / P9–P12 | 6.05 / 6.2 / 6.4 | — |
| **The Arcadion** | **Light-heavyweight (7.05) / Cruiserweight (7.2) / Heavyweight (7.45)** | 各 **M1–M4**（每个 division 独立从 M1 重新编号） | 7.05 / 7.2 / **7.45** | 7.4 实装 Normal，**Savage 延至 7.45**（2026-03-03），间隔长于惯例 → 官方因此加强 7.56 的 Echo |

**7.5 / 7.56 对 Arcadion 的调整（官方明记，已确认）**

| 版本 | 调整 |
|---|---|
| 7.5 | **Arcadion: Heavyweight Division 周回报酬限制解除**（**不适用于** AAC Heavyweight M4 的 **Heavy Holoblade**）；**Universal Tomestone 兑换所需 Heavy Holoblade 由 7 个降为 4 个** |
| 7.5 | 可录像副本由「AAC Cruiserweight M1/M2 (Savage)」改为「**AAC Heavyweight M2/M3 (Savage)**」 |
| 7.56 | AAC Heavyweight Tier (Savage)：宝箱**必定出现**且不因已通关者减少报酬、**周回报酬限制解除**、**周入场限制解除**、可直选任意层、获得 **Echo（+12% HP/伤害/治疗，开场发动，不随全灭增强）**。官方说明：因 7.4 到零式实装的间隔比以往更长，Echo 强化幅度高于惯例 |

### 2.3 Hildibrand Manderville 系列（事件屋）

| 资料片 | 章节标题(EN) | 版本 | 与武器强化的关联 | 置信度 |
|---|---|---|---|---|
| ARR | **The Rise and Fall of Gentlemen** | 2.1–2.5 | 无 | 标题【未验证】 |
| HW | **The Adventures of Hildibrand**【未验证】 | 3.1–3.5 | 无 | 【未验证】 |
| **ShB（5.x）** | **无 Hildibrand 系列**（5.x 未推出事件屋任务） | — | — | **已确认**（5.x 无该系列） |
| SB | **The Greatest Story Never Told** | 4.1–4.5 | 无 | 标题【未验证】 |
| EW | **Further Hildibrand Adventures**【未验证】 | 6.1–6.5 | **Manderville Weapons**（6.25 开幕，6.2x–6.55 逐段强化） | 标题【未验证】；与武器绑定**已确认** |
| DT | **Inconceivably Further Hildibrand Adventures** | **起始 7.15**【未验证】/ **7.55 追加剧情节**（官方 Patch 7.5 Notes 明记） | 与 **Phantom Weapons** 并列于 7.55 | 7.55 追加**已确认**；7.15 起始【未验证·来源冲突】 |

> 各资料片（除 ShB）均为「**5 个版本 × 连续支线**」结构。EW 的 Hildibrand 与 **Manderville 武器**绑定是本系列首次与遗物武器挂钩；DT 的 **Phantom 武器**则在 **Occult Crescent** 体系内推进（与 Hildibrand 分支并行，而非绑定）。

### 2.4 传说 / 遗物武器（Relic Weapon）任务线

| 资料片 | 系列名(EN) | 中文 | 引入版本 | 阶段（升品流程） | 品级区间 |
|---|---|---|---|---|---|
| ARR | **Zodiac Weapon** | 十二宫武器 | 2.0「A Relic Reborn」 | Relic → Zenith → Atma → Animus → Novus → Nexus → Zodiac → **Zeta** | 80 → 135【未验证】 |
| HW | **Anima Weapon** | 阿尼玛武器 | 3.0 | Anima → Hyperconductive → Reconditioned → Sharpened → Complete → **Lux** | 210 → 275【未验证】 |
| SB | **Eureka Weapon** | 优雷卡武器 | **4.25** | Anemos → Pagos → Pyros → Hydatos → **Physeos**（Baldesion Arsenal） | 355 → 405【未验证】 |
| ShB | **Resistance Weapon** | 抵抗军武器 | **5.25**（Bozja Southern Front） | Resistance → Augmented → Recollection → Law's Order → Augmented Law's Order → Blade's → 最终 | 485 → 535【未验证】 |
| EW | **Manderville Weapon** | 曼德维尔武器 | **6.25** | 依 6.25 / 6.35 / 6.45 / 6.55 逐段强化（与 Hildibrand 支线同步） | 615 → 665【未验证】 |
| DT | **Phantom Weapon** | 幻影武器 | **7.25 公布，7.55 推进** | 通过 Occult Crescent 的 **Eclipticum / Occultum** 推进；North Horn 追加 **Phantom Vision**（Arcanaut Armor 路线） | **【未验证】** |

### 2.5 友好部族 / 同盟（Allied Society）任务

| 资料片 | 友好部族 | 备注 |
|---|---|---|
| ARR | Amalj'aa / Sylphs / Kobolds / Sahagin / Ixal | 各 4 阶段（Neutral→Friendly→Trusted→Allied）；每日任务每部族 3 个 |
| HW | Vanu Vanu / Vath / Moogles | 〃 |
| SB | Kojin / Ananta / Namazu | 〃 |
| ShB | Pixies / Qitari / Dwarves | 〃 |
| EW | Arkasodara / Omicron / Loporrits | 〃 |
| **DT** | **7.0 一族**【未验证：Pelupelu？】 / **7.25 Mamool Ja** / **7.35 Yok Huy** | **Yok Huy**：制作者 Lv90，Urqopacha X:32.1 Y:34.3，NPC Fahrafahr；解锁任务 **Frosty Neighbors**（需 MSQ「Dawntrail」+ 支线 "Brains and Brawn"）；部族通货 **Yok Huy wards**；采用 **Quest Sync**（等级自动调整）；**7.55 追加 Allied Society capstone（同盟终章）支线** |

> **7.5 官方警告（已确认）**：接受采用 Quest Sync 的友好部族任务后，**即使切换职业也无法推进**，需放弃并重新接受。每日任务上限为**每部族每日 3 个**（7.35 官方说明）。

### 2.6 Variant / Criterion 副本

| 版本 | Variant（1–4 人 / 可变难度） | Criterion（高难 4 人） |
|---|---|---|
| 6.25 | **The Sil'dihn Subterrane** | Another Sil'dihn Subterrane（+ Savage） |
| 6.45 | **Mount Rokkon** | Another Mount Rokkon（+ Savage） |
| 6.51 | **Aloalo Island** | Another Aloalo Island（+ Savage） |
| **7.45** | **The Merchant's Tale**【未验证：来自本工作区既有研究稿 D-npcs.md 的排期表；本次未能独立复核】 | 【未验证】 |

> **修正**：前稿曾记 Mount Rokkon = 6.35，**应为 6.45**（多来源一致）。
> 限定职业（Blue Mage / Beastmaster）**不可进入** Variant / Criterion（官方明记）。

### 2.7 Occult Crescent（DT 探索型内容）

| 项目 | 内容 | 置信度 |
|---|---|---|
| 第一区域 | **The Occult Crescent: South Horn**（日文「南征編」）—— **7.25 / 2025-05-27**，同时实装 **Phantom Jobs（幻影职业）** | 高置信 |
| 第二区域 | **The Occult Crescent: North Horn**（日文「北征編」）—— **7.55 / 2026-07-28** | **已确认** |
| 内部副本 | **The Forked Tower**（多路线团队副本）；**Forked Tower: Magic**（7.55+，时间限制随进入/击破 BOSS 延长；7.56 调整「退出时扣除延长」） | **已确认** |
| 等级系统 | **Knowledge Level**。**7.56 修复项原文提到「South Horn 的知识等级 40」**；另有研究稿记为「South Horn 上限 20 → North Horn 40」→ **【来源冲突】** | — |
| 关联武器 | **Phantom Weapons**（Eclipticum / Occultum / Phantom Vision 三条升级轴） | 高置信 |
| 限制 | 限定职业不可进入（Beastmaster 明确列为不可进入） | **已确认** |

### 2.8 宇宙探索（Cosmic Exploration）

| 目的地 | 实装版本 | 日期 | 置信度 |
|---|---|---|---|
| 第一目的地 **Sinus Ardorum** | **7.21** | 2025-04-22 | 中 |
| **Phaenna** | **7.31** | 2025-09-02 | 中 |
| **Oizys** | **7.41** | 2026-01-27 | 中 |
| **Auxesia**（另有拼写 Auxsia → **【来源冲突】**） | **7.51** | 2026-06-02 | **已确认**（官方 Patch 7.5 Notes 明记） |
| 关联内容 | **Tool Enhancement Quests - Cosmic Tools**（7.51） | 7.51 | **已确认** |
| 机制 | 「mech op directive」类指令（例：Eradicate Toxic Weeds）、field scanner 交付、stellar missions（采用 Quest Sync） | — | **已确认**（7.56 修复项） |

### 2.9 岛屿庇护所（Island Sanctuary）

| 项目 | 内容 | 置信度 |
|---|---|---|
| 实装版本 | **6.2** | 高置信 |
| 结构 | 个人孤岛经营；产出 **Seafarer's Cowries / Felicitous Tokens**，可兑换坐骑 / 宠物 / 家具；无战斗 | 高置信 |
| 7.x 状态 | 6.5 后**无新阶段更新**，属已完结内容 | 高置信 |

### 2.10 深层迷宫（Deep Dungeon）

| 名称(EN) | 名称(JP) | 实装版本 | 层数 | 入口 / 解锁任务 | 等级区间 |
|---|---|---|---|---|---|
| **Palace of the Dead** | 死者の宮殿 | **3.35** | 200 | New Gridania X:12.0 Y:13.1，Nojiro Marujiro；解锁任务 **The House That Death Built**（Lv17，需 MSQ「Into a Copper Hell」） | 1–60 |
| **Heaven-on-High** | アメノミハシラ | **4.35** | 100 | The Ruby Sea X:6.2 Y:11.7，Hamakaze；解锁任务 **Knocking on Heaven's Door**（Lv61，需 PoTD 50 层 + 特定 MSQ） | 61–70 |
| **Eureka Orthos** | オルト・エウレカ | **6.35** | 100 | Mor Dhona X:21.8 Y:8.1، Koh Rabntah；解锁任务 **Delve into Myth**（Lv81，需 Endwalker + PoTD 50 层） | 81–90 |
| **Pilgrim's Traverse** | ピルグリム・トラバース | **7.35 / 2025-10-07**【日期来源冲突：另有 10-14/15 说】 | **100** | **Il Mheg / Wolekdorf**（第一世界旧地图回收）；解锁任务 **Pilgrimage of Light**（Lv91，The Crystarium X:10.3 Y:10.7，Bright-eyed Child；需 Endwalker + PoTD 50 层）。可从 1/21/31/51/71 层进入；**全层可匹配** | 91–100 |

> **Pilgrim's Traverse 英文名由官方 Lodestone 排行页 `deepdungeon4` 确认**。第 99 层 BOSS 有独立版 **The Final Verse**（1–4 人）与 **The Final Verse (Quantum)**（4 人，消耗 offerings 提升难度与掉落）。通关 stone 100 且 aetherpool ≥ +60 后可用 grip 强化 Pilgrim's Traverse 武器。
> 深宫结算获得的 EXP **适用 Armoury Bonus**。

### 2.11 幻想讨伐战（Unreal Trial / Faux Hollows）

| 项目 | 内容 | 置信度 |
|---|---|---|
| 系统引入 | **5.3**（Faux Hollows） | 高置信 |
| 前置任务 | **Fantastic Mr. Faux**（Lv80，Idyllshire X:7.0 Y:5.9，NPC "Painfully Ishgardian Man"；需 MSQ「Shadowbringers」+ 任务「Keeping Up with the Aliapohs」） | **已确认**（7.5 补丁笔记原文） |
| 轮换规律 | 每个大版本轮换一次（"Different unreal trials will be available in each major patch"） | **已确认** |
| 7.5 版本 | **Shinryu's Domain (Unreal)** 替换 **Tsukuyomi's Pain (Unreal)**；品级同步 **695** | **已确认** |
| 报酬 | Faux Leaves → 兑换新道具 | **已确认** |

---

## Part 3 — 终盘装备成长（截至 7.56 / Lv100）

### 3.1 Allagan Tomestones（亚拉戈神典石）完整清单 —— **核心表**

> **来源**：官方 Lodestone 公告「Upcoming Changes to Allagan Tomestones」（7.4 变更）+ Lodestone 玩家总表「アラガントームストーン一覧」（含 7.4 记忆神典石，2026 年 9 月仍在维护）+ Eorzea Database。**版本号、购入品级、强化素材均已交叉核对。**
> **中文名**：均为**由日文汉字简化推定**（例：詩学→诗学）→ 全部标【未验证(推定)】。本次无法读取国服数据库。

| # | 神典石(EN) | 中文名(推定) | 日文名 | 追加版本 | 移除/停用 | 可购套装 | 品级 | 强化素材 |
|---|---|---|---|---|---|---|---|---|
| 1 | **Philosophy** | 哲学 | 哲学 | 2.0 | 2.4 移除 | Darklight | 70 | 无 |
| 2 | **Mythology** | 神话 | 神話 | 2.0 | 3.0 移除 | （复古调） | 90 | 无 |
| 3 | **Soldiery** | 战记 | 戦記 | 2.2 | 3.2 移除 | 盖罗尔特名品 | 100 → **110** | 未鉴定神典石 / 亚拉戈时砂(武具) / 亚拉戈时油(盾・饰品) |
| 4 | **Poetics** | 诗学 | 詩学 | 2.4 | **仍可获得**（Lv90 以下副本/讨伐/随机任务） | 加隆德 Ironworks | 120 → **130** | 暗号化神典石 / 亚拉戈强化纤维(武具) / 亚拉戈硬化药(盾・饰品) |
| 5 | **Law** | 法典 | 法典 | 3.0 | 3.4 移除 | 多玛样式 | 170 → **180** | 多玛风砥石(武器・盾) / 多玛风黑漆(防具) / 多玛风生漆(腰带・饰品) |
| 6 | **Esoterics** | 禁书 | 禁書 | **3.05** | 4.0 移除 | 新生古典 | 200 → **210** | 青之强化药(武器・盾) / 青之强化纤维(防具) / 青之硬化药(腰带・饰品) |
| 7 | **Lore** | 传承 | 伝承 | 3.2 | 4.2 移除 | 蛮神风 | 230 → **240** | 大容量神典石 / 群青之强化药・纤维・硬化药 |
| 8 | **Scripture** | 圣典 | 聖典 | 3.4 | 4.2 移除 | 田园郡制 | 260 → **270** | 超小型神典石 / 绀青之强化药・纤维・硬化药 |
| 9 | **Verity** | 真理 | 真理 | 4.0 | 4.4 移除 | 阿拉米格 Ala Mhigan | 310 | 无 |
| 10 | **Creation** | 万物 | 万物 | **4.05** | 5.0 移除 | 失落亚拉戈 Lost Allagan | 330 → **340** | 旧规格神典石 / 失落亚拉戈强化药・纤维・硬化药 |
| 11 | **Mendacity** | 虚构 | 虚構 | 4.2 | 5.2 移除 | 龙脉 Ryumyaku | 360 → **370** | 试作型神典石 / 龙脉之强化药・纤维・硬化药 |
| 12 | **Genesis** | 创世 | 創世 | 4.4 | 5.2 移除 | 斯卡艾瓦 Scaevan | 390 → **400** | 军用神典石 / 斯卡艾瓦特制强化药・纤维・硬化药 |
| 13 | **Goetia** | 魔典 | 魔典 | 5.0 | 5.4 移除 | 隆卡 Ronkan | 440 | 无 |
| 14 | **Phantasmagoria** | 幻想 | 幻想 | **5.05** | 6.0 移除 | 深影 Deepshadow | 460 → **470** | 超薄型神典石 / 黑影之强化药・纤维・硬化药 |
| 15 | **Allegory** | 奇谭 | 奇譚 | 5.2 | 6.2 移除 | 水晶都 Crystarium | 490 → **500** | 超耐久型神典石 / 卫兵団之强化药・纤维・硬化药 |
| 16 | **Revelation** | 默示 | 黙示 | 5.4 | 6.2 移除 | 隐秘追迹者 Cryptlurker | 520 → **530** | 超高速型神典石 / 隐秘强化药・纤维・硬化药 |
| 17 | **Aphorism** | 经典 | 経典 | 6.0 | 6.4 移除 | 月语 Moonward | 570 | 无 |
| 18 | **Astronomy** | 天文 | 天文 | **6.05** | **7.0 移除** | 光辉 Radiant | 590 → **600** | 极小型神典石 / 星战之强化药・纤维・硬化药 |
| 19 | **Causality** | 因果 | 因果 | 6.2 | **7.2 移除** | 月之光使 Lunae Envoy | 620 → **630** | 极薄型神典石 / 月光之强化药・纤维・硬化药 |
| 20 | **Comedy** | 神曲 | 神曲 | 6.4 | **7.2 移除** | 信条 Credendum | 650 → **660**（武器可再强化至 **665**） | 极密型神典石 / 至天之强化药(武器) / 纤维 / 硬化药；武器另需 **全天之强化药** |
| 21 | **Aesthetics** | 美学 | 美学 | **7.0** | **7.4 移除** | **Neo Kingdom** | **700** | 无 |
| 22 | **Heliometry** | 天动 | 天動 | **7.05** | **7.4 起不可获得**（可换为数理） | 日文「ケーツハリー装備」（**英文名未核实**） | **720 → 730** | **Universal Tomestone**（汎用規格トームストーン）+ 界雷之强化药(武器・盾, EN: **Surgelight Solvent**【未验证】) / 界雷之强化纤维(防具) / 界雷之硬化药(饰品) |
| 23 | **Mathematics** | 数理 | 数理 | **7.2** | 7.4 起**周上限取消**（持有上限 2000） | 日文「キングダムテール装備」 | **750 → 760** | **Universal Tomestone 2.0**（汎用規格トームストーン v2.0）+ 疾雷之强化药・纤维・硬化药 |
| 24 | **Mnemonics** | 记忆 | 記憶 | **7.4** | **现行** | 日文「キングダムブラス装備」 | **780 → 790**（武器 780 → **795**【未验证】） | **Universal Tomestone 3.0**（已确认 EN 名）+ **奔雷之强化药（EN: Thundersteeped Solvent，已确认）** / 奔雷之强化纤维(防具) / **奔雷之硬化药（EN: Thundersteeping Glaze，已确认）** |

**7.4 官方神典石变更（官方 Lodestone 公告，已确认）**

| 项目 | 内容 |
|---|---|
| 新增 | **Allagan tomestones of mnemonics**（记忆）—— 仅在至少 1 个职业达到 Lv100 后可获得 |
| Mathematics（数理） | **周获取上限取消**（持有上限 2,000 不变） |
| Heliometry（天动） | ① 不再可获得（相关副本改为产出数理 / 新神典石）② **不再可兑换道具**（原本可换的道具改由其他途径获得）③ 可在摩杜纳 Auriana 处**兑换为数理** |
| Aesthetics（美学） | **7.4 起全部持有量删除**（维护前需兑换为天动） |
| Poetics（诗学） | Lv90 以下副本/讨伐战与随机任务仍然产出 |

**7.56 变更（已确认）**：**Mnemonics 周上限 450 → 900**；持有上限不变。
> **【来源冲突】**：有第三方（BestGameBoost，2025-12-26）称 7.4 将 Mnemonics 持有上限由 2,000 提升至 **4,000**，而官方公告只写明 Mathematics 的上限为 2,000、未提 Mnemonics → 该数值**未能核实**。

**神典石 / 强化素材兑换 NPC**

| NPC | 位置 | 职能 | 置信度 |
|---|---|---|---|
| **Auriana** | 摩杜纳 Revenant's Toll (X:22.7 Y:6.7) | 旧神典石兑换（Heliometry → Mathematics 等）/ 诗学兑换 | **已确认**（官方公告） |
| **Uah'shepya** | Solution Nine (X:8.7 Y:13.5) | DT 讨伐战道具与坐骑（例：Wings of Death ← Grave Totem ×99）、现行神典石装备兑换 | **已确认**（7.5 补丁笔记） |
| **Zircon** | Solution Nine (X:8.6 Y:13.5) | Mathematics + Mnemonics 装备（含 IL 780 武器）兑换 | 位置来源：E-systems-loops.md；商店名佐证：Gamer Escape 页 `Zircon (NPC)/Allagan_Tomestones_of_Mnemonics_(IL_780_Weapons)` |

### 3.2 Lv100 品级阶梯（iLvl ladder）

| 版本 | 日期 | 最高可获得品级 | 主要来源 | 置信度 |
|---|---|---|---|---|
| 7.0 | 2024-07-02 | 700（神典石 **Neo Kingdom**）/ **710**（制作 HQ **Archeo Kingdom**） | Aesthetics / 制作 | 700 **已确认**；710【未验证】 |
| 7.05 | 2024-07-30 | **730**（神典石强化 = 天动 720→730）；零式 Light-heavyweight 防具【未验证】 / 武器 **735**【推定】 | Heliometry + 强化素材 / 零式 | 730 **已确认** |
| 7.1 | 2024-11-12 | **740**（新制作套装 **Quetzalli**） | 制作 | 套装名已确认；品级【未验证】 |
| 7.2 | 2025-03-25 | **760**（神典石强化 = 数理 750→760）；零式 Cruiserweight 防具【未验证】 / 武器 **765**【推定】 | Mathematics + 强化素材 | 760 **已确认** |
| 7.3 | 2025-08-05 | 【未验证】（推测出新制作套装） | — | — |
| 7.4 | 2025-12-16 | **790**（神典石强化 = 记忆 780→790） | Mnemonics + 强化素材 | **已确认** |
| 7.45 | 2026-03-03 | **790**（零式 Heavyweight 防具）/ **795**（零式武器） | 零式 AAC Heavyweight | **高置信**（Gamer Escape 商店页标题明记 "IL 790-795"） |
| 7.5 | 2026-04-28 | **795**（上限不变）；新极讨伐战 The Unmaking (Extreme) 掉落品级 **【未验证】** | — | 【未验证】 |
| 7.51 | 2026-06-02 | 绝副本 **Dancing Mad (Ultimate)** 武器品级 **【未验证】** | 绝 | — |
| 7.56 | 2026-09-08 | **795**（仅解除周限制、追加 Echo） | — | 高置信 |

**7.5 副本门槛（官方明记，已确认）**：The Clyteum 平均 **750** / The Unmaking 平均 **755** / The Unmaking (Extreme) 平均 **770** / Shinryu's Domain (Unreal) 同步 **695**。

> **注意**：7.5 的副本门槛（750/755/770）是**平均品级下限**，不是掉落品级。7.5 **没有**新增零式 / 神典石层级——与 EW 6.5 的模式一致（奇数大版本为「过渡版本」，偶数大版本才是装备 tier 更新）。
> **8.0 影响**：Evercold 将**废除神典石体系**，改为 Seasons + 活跃度点数 → 本表的 24 个神典石是**最后一代神典石**（诗学可能保留为怀旧货币，未验证）。

### 3.3 强化素材（升级材料）体系

> **命名规律（已确认）**：每个神典石层级对应一套三件套素材，按**部位**分工——
> - **强化药 → 武器 + 盾**（英文名对应 **Solvent**）
> - **强化纤维 → 防具（左侧 5 件）**（英文名对应 **Twine**）
> - **硬化药 → 饰品（右侧 5 件）**（英文名对应 **Glaze**）
> - **Universal Tomestone（汎用規格トームストーン）→ 神典石武器强化所需的核心代币**
>
> ⚠️ **中/日/英对应陷阱**：日文「**強化薬**」= 武器，英文对应 **Solvent**；日文「**硬化薬**」= 饰品，英文对应 **Glaze**。中文若按字面直译（强化药/硬化药）会与英文名错位。**引用时必须标注语言版本。**

| 神典石层级 | 武器/盾 | 防具 | 饰品 | 核心代币 | 主要获取途径 |
|---|---|---|---|---|---|
| Heliometry（7.05） | 界雷之强化药（EN: **Surgelight Solvent**）【未验证 EN 名】 | 界雷之强化纤维 | 界雷之硬化药 | **Universal Tomestone** | 零式掉落 / **24 人副本古銭兑换** / 狩猎货币 Sack of Nuts【未验证】 |
| Mathematics（7.2） | 疾雷之强化药 | 疾雷之强化纤维 | 疾雷之硬化药 | **Universal Tomestone 2.0** | 〃 |
| Mnemonics（7.4） | **奔雷之强化药（EN: Thundersteeped Solvent，已确认）** | 奔雷之强化纤维 | **奔雷之硬化药（EN: Thundersteeping Glaze，已确认）** | **Universal Tomestone 3.0（已确认）** | 零式 AAC Heavyweight / **Heavy Holoblade 兑换**（7.5 起 4 个） / 24 人副本古銭 |

**「古銭（Coin）」体系（DT 7.x）**

| 项目 | 内容 | 置信度 |
|---|---|---|
| **Ordelle Coin**（オルデール古銭） | 出自 **Jeuno: The First Walk**（7.1 的 24 人副本） | Coin 名与出处**已确认**（多来源） |
| **Ranperre Coin**（ランペール古銭） | 出自 **San d'Oria: The Second Walk**（7.3） | 【未验证：来自本工作区既有研究稿 E-systems-loops.md】 |
| Windurst 副本对应古銭 | 7.5 **Windurst: The Third Walk** → 名称【未验证】 | — |
| 用途 | ① 兑换 24 人副本装备 ② **兑换品级强化素材**（日文攻略标题明记：「天動交換武器 IL720 をオルデール古銭と交換できるようになった『界雷の強化薬』を使用して IL730 に強化する方法」→ 古銭可换强化药） | 用途**高置信** |
| 周限制 | 社群提问「モニヨン古銭／オルデール古銭是否有周限制」→ 本次未取得官方答案 | 【未验证】 |
| 狩猎货币 | **Sack of Nuts**（ヌツの袋）/ **Cracked Novacluster** / **Cracked Prismaticluster** → 可换取装备强化素材 | 【未验证】 |

> **关于需求方提到的「古銭 / 4th-tier tomestone」**：本次检索确认 DT 存在「古銭（Coin）」体系（源自 24 人副本），但**未找到**名为「4th-tier tomestone」的官方道具。需求方可能是把「**第四层（M4）掉落的代币**」（**Heavy Holoblade** → 兑换 **Universal Tomestone**）与「古銭」混同。→ 已在正文分别列出，**请勿合并**。

### 3.4 每周限制（Weekly Lockouts）总表（截至 7.56）

| 项目 | 内容 | 状态 |
|---|---|---|
| **神典石周上限** | **Mnemonics：450 → 900**（7.56 起）；持有上限 2,000（4,000 说【来源冲突】） | 现行 |
| **零式（Savage）战利品锁定** | AAC **Heavyweight Tier (Savage)** 于 **7.56 完全解除**：宝箱必出、周回报酬限制解除、周入场限制解除、可直选层数 | **已解除** |
| **零式 Echo** | 7.56 起 Heavyweight 开场发动 **+12%** HP/伤害/治疗（不随全灭增强） | 现行 |
| **零式 M4 代币** | **Heavy Holoblade** 仍受周限制（7.5 明记该解除「不适用于 AAC Heavyweight M4 的 Heavy Holoblade」）；兑换 Universal Tomestone 所需数量 **7 → 4**（7.5） | 现行 |
| **24 人副本（Alliance Raid）** | 每週每副本 1 次战利品（一般规则）；**古銭周限制【未验证】** | 现行 |
| **幻想讨伐战 / Faux Hollows** | 每週 1 次（Faux Leaves）；7.5 起对象为 **Shinryu's Domain (Unreal)** | 现行 |
| **天书奇谭（Wondrous Tails / Khloe）** | 每週 1 次（9 格）；Second Chance 点数；7.5 更新奖品与可登记副本 | 现行 |
| **定制委托（Custom Deliveries）** | 每週 12 次（计分上限）【未验证】；7.51 新增客户 **Tiisol Ja** | 现行 |
| **友好部族每日任务** | **每部族每日 3 个**（7.35 官方说明） | 现行 |
| **Occult Crescent** | Knowledge / Phantom Weapon 周限制【未验证】 | — |
| **宇宙探索（Cosmic Exploration）** | 周常指令 / stellar missions【未验证具体上限】 | 现行 |
| **岛屿庇护所（Island Sanctuary）** | 周常工房排程（每週结算 1 次）【未验证】 | 现行 |
| **PvP Series** | Series 11 结束、**Series 12 自 7.56 起至 8.0 实装**；Series 11 奖励可在 Series 12 期间领取 | **已确认** |
| **Crucible 排行（Beastmaster）** | Season 1：**2026-09-24 起 至 7.58 实装**；各物理大区前 300 名获奖 | **已确认** |

---

## 附录 A — 可信度分级

| 级别 | 内容 |
|---|---|
| **已确认（官方一手来源直接命中）** | 全部 7.5 / 7.56 补丁笔记要点；7.5 = 2026-04-28；7.56 = 2026-09-08；24 个神典石的名字 / 追加版本 / 移除版本 / 购入品级 / 强化素材；7.4 神典石变更公告；Mnemonics 周上限 450→900；Universal Tomestone 3.0、Thundersteeped Solvent、Thundersteeping Glaze 的 EN 名；Windurst: The Third Walk；The Clyteum 门槛 750；The Unmaking 755 / 极 770；Shinryu's Domain (Unreal) 同步 695；Beastmaster 规格与限制；7.56 Savage 解除限制 + Echo 12%；Faux Hollows 前置「Fantastic Mr. Faux」；Myths of the Realm = Aglaia / Euphrosyne / Thaleia；2.1–2.5 各版本 MSQ 数与任务名（thonky 逐条核对） |
| **高置信（间接官方证据 / 2 个以上独立来源）** | 7.4 末任务「Into the Mist」；7.5 末任务「Trail to the Heavens」；零式 Heavyweight 790/795；Ordelle Coin 出处与用途；Pilgrim's Traverse（官方 Lodestone 英文排行页 + 7.35）；7.25 Occult Crescent South Horn；7.35 Yok Huy；7.51 Auxesia |
| **未验证** | 3.0–7.0 各资料片 MSQ 逐版本任务数与首/末任务名；各资料片总量（社区近似）；中文任务名与中文神典石名；DT 7.0 友好部族名；Variant「The Merchant's Tale」；7.5 极讨伐战掉落品级；7.51 绝武器品级；Heliometry 神典石套装的英文名；Surgelight Solvent 的 EN 名；各资料片副本掉落品级 |
| **来源冲突（已并列标注）** | ① 7.5 新讨伐战 = "The Unmaking"（官方 EN）vs "Enuo"（日方报道，疑为 BOSS 名）② 7.51 宇宙探索地 = "Auxesia"（官方 EN）vs "Auxsia" ③ 7.35 日期 2025-10-07 vs 10-14/15 ④ Mnemonics 持有上限 2,000 vs 4,000 ⑤ Occult Crescent South Horn 知识等级上限 20 vs 官方 7.56 提到 40 ⑥ Hildibrand DT 起始 7.15 vs 7.55 |

## 附录 B — 本次**未能读取**的来源（对结论有影响）

| 来源 | 状态 | 影响与替代 |
|---|---|---|
| `ffxiv.consolegameswiki.com` / `consolegameswiki.com`（含 `mediawiki/api.php`） | **HTTP 403（Cloudflare）** | 需求方指定的 3 个主要来源中 2 个（Allagan_Tomestones / Main_Scenario_Quests）无法直接读取 → 改用 Lodestone 官方公告 + Lodestone 玩家总表 + thonky.com |
| `ffxiv.gamerescape.com` | HTTP 403 | 商店页仅通过搜索引擎摘要获得品级（"IL 780"、"IL 790-795"） |
| `ff14.huijiwiki.com`（国服 wiki） | HTTP 403 | 中文任务名 / 中文神典石名无法核验 |
| `zh.wikipedia.org` | 解析到非公网 IP，被工具拒绝 | 中文版补丁对照表无法读取 |
| `leprestore.com`、`game8.co`、`destructoid.com` | HTTP 403 | MSQ 全表替代源部分失败 |
| `thebackdash.com`、`escapistmagazine.com` 部分文章 | 正文被 JS/付费墙截断 | Ordelle Coin 细节仅得标题级信息 |

## 附录 C — 需求方指定来源达成情况

| 指定来源 | 达成 |
|---|---|
| https://ffxiv.consolegameswiki.com/wiki/Allagan_Tomestones | ❌ 403 → 替代：官方公告「Upcoming Changes to Allagan Tomestones」+ Lodestone 玩家总表 + Eorzea DB |
| https://ffxiv.consolegameswiki.com/wiki/Main_Scenario_Quests | ❌ 403 → 替代：thonky.com MSQ 全表（2.0–2.5 已逐条核对） |
| https://ffxiv.consolegameswiki.com/wiki/Item_level | ❌ 403 → 替代：官方补丁笔记物品表 + Eorzea Collection |
| https://na.finalfantasyxiv.com/lodestone/ | ✅ 补丁笔记 / Eorzea DB / 排行页 / 玩家长文均可读取 |
| https://na.finalfantasyxiv.com/dawntrail/patch_7_5/ | ✅ 完整读取（含 7.51 / 7.55 / 7.56 内容分配） |

---

*文件：`docs/_research/D-msq-endgame.md` · 检索截止 2026-09-15 · 与同目录 `C-patches-timeline.md` / `E-systems-loops.md` / `F-maps.md` 交叉校验*
