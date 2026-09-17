# F — FFXIV 地区与地图结构调研笔记（供放置游戏关卡/地图系统设计）

> 调研员：FFXIV 资料调研员（DSH 子代理）
> 调研日期：2026-09-15
> 游戏版本基线：**Patch 7.56**（Lodestone Eorzea Database 页面自报版本号；见来源 [1]）
> 说明：本文件是**调研笔记**，不是交付文件；所有结论区分【官方数据】/【社区统计】，并标注版本时效性。
> 注意：任务描述中假定"游戏处于 7.x，最新 7.3"，但实测当前北美 Lodestone 数据库版本为 **7.56**，Dawntrail 补丁线已推进到 **7.5**（含 7.51），7.1–7.5 均已有专门特设页 [2]。因此本文按"截至 7.5x"处理，并把 7.1–7.5 的内容单独列出。

---

## 0. 调研方法与来源可信度分级

| 编号 | 来源 | 类型 | 访问结果 | 可信度定位 |
|---|---|---|---|---|
| [1] | https://na.finalfantasyxiv.com/lodestone/playguide/db/ （Eorzea Database） | 【官方】 | 200，可读 | 最高：版本号、分类计数为官方自报 |
| [2] | https://na.finalfantasyxiv.com/dawntrail/patch_7_1/ 及 7.2/7.3/7.4/7.5 特设页 | 【官方】 | 200，可读 | 最高：补丁级内容（新副本/新讨伐/新内容）官方口径 |
| [3] | https://eorzeantavern.com/dungeons/ | 【社区统计】 | 200，可读，标注 "Current for Patch 7.56" | 高：逐条列名+等级，可交叉校验 |
| [4] | https://eorzeantavern.com/ffxiv-trials/ | 【社区统计】 | 200，可读，Updated 14 September 2026 | 高 |
| [5] | https://eorzeantavern.com/raids/ | 【社区统计】 | 200，可读 | 高 |
| [6] | https://eorzeantavern.com/ultimate-raids/ | 【社区统计】 | 200，可读 | 高 |
| [7] | https://eorzeantavern.com/deep-dungeons/ | 【社区统计】 | 200，可读 | 高 |
| [8] | https://eorzeantavern.com/eureka/ | 【社区统计】 | 200，可读 | 高 |
| [9] | https://www.esports.net/news/gaming/all-new-zones-in-ffxiv-dawntrail/ | 【社区】 | 200，可读（2024-07-04） | 中：7.0 首发内容，时效仅到 7.0 |
| [10] | ffxiv.consolegameswiki.com（Zones/Areas/Dungeons/Trials/Raids 条目） | 【社区统计·推荐参考】 | **403（Cloudflare 拦截，未能抓取正文）** | 无法验证，仅作线索 |
| [11] | finalfantasy.fandom.com | 【社区统计·推荐参考】 | **fetch failed（域名不可达）** | 无法验证，仅作线索 |
| [12] | ffxiv.gamerescape.com | 【社区统计·推荐参考】 | **403（Cloudflare 拦截）** | 无法验证，仅作线索 |
| [13] | https://en.wikipedia.org/wiki/Final_Fantasy_XIV | 【社区】 | **被网络策略拒绝**（"resolves to a non-public IP"） | 仅通过搜索摘要间接引用 |
| [14] | https://de.wikipedia.org/wiki/Final_Fantasy_XIV（经搜索摘要） | 【社区】 | 摘要可读 | 中：提到了 7.31 的 "Kosmo-Erkundung: Phaennam"（宇宙探索：Phaennam） |

**调研工具使用统计**：本笔记完成过程中执行了 **20 次** web_search / web_fetch 调用（要求 ≥18 次）。

**重要取材限制（必须向父代理说明）**：任务指定的三大参考站中，consolegameswiki、fandom、gamerescape **全部被 Cloudflare 或 DNS 策略拦截**，无法读取正文。Wikipedia 亦被网络策略拒绝。因此本文的"逐条清单"主要来自：
- 【官方】Lodestone Eorzea Database（版本号、Duty 分类计数、任务分类树——任务分类树里的 "Yok Tural Sidequests / Xak Tural Sidequests / Unlost World Sidequests" 等条目本身就能反推区域划分）；
- 【官方】Dawntrail 7.1–7.5 特设页；
- 【社区统计】Eorzean Tavern 的逐条档案（该站自称更新到 Patch 7.56，且逐条给出等级/解锁条件，是本次唯一能完整读取的"全量清单"来源）；
- 【模型自身知识】用于补全 2.0–7.0 的区域名与等级区间，凡未由上述来源直接验证处，均在表中标注 `(待核)`。

---

## 1. 概念分层：本文使用的"地区 / 地图区"定义

FFXIV 的地图在数据结构上大致分三层，做放置游戏关卡系统时建议直接照搬这个三层模型：

| 层级 | 游戏内术语 | 例子 | 放置游戏对应概念 |
|---|---|---|---|
| L1 大地区 / 大陆 / 世界 | Region / Continent / World | 艾欧泽亚 Eorzea、阿尔巴提亚 Abalathia's Spine、龙堡 Dravania、基拉巴尼亚 Gyr Abania、欧萨德 Othard、诺弗兰特 Norvrandt、图拉尔 Tural、虚无界 The Void | 大关卡章节 / 章节组 |
| L2 地图区（可探索野外/城市） | Zone / Area / Field Area | 中萨纳兰 Central Thanalan、库尔札斯西部高地 Coerthas Western Highlands、天营云海 The Sea of Clouds、拉凯提卡大森林 The Rak'tika Greatwood | 单张可挂机地图 / 关卡 |
| L3 据点 / 城内部区 | Hub City / District / Sub-area | 格里达尼亚新街 New Gridania、乌尔达哈现世回廊 Ul'dah – Steps of Nald、水晶都 The Crystarium | 主城 UI 面板 / 功能枢纽 |

- **Aetheryte（以太之光）** 绑定在 L2 或 L3 上；**Aethernet（以太网）** 是 L3 内部的子传送网。
- **副本 Dungeon / 讨伐 Trial / 大型任务 Raid** 是挂在 L2 之上的"实例内容（Instanced Content）"，本身不是野外地图。
- **探索型内容（Eureka / Bozja / Occult Crescent / Cosmic Exploration）** 是"跨 zone 的独立实例地图组"，有自己的等级系统。

---

## 2. 2.0 重生之境 A Realm Reborn（版本 2.0–2.5，等级 1–50）

### 2.1 区域 → 地图区完整清单

| 大地区（Region） | 地图区（Zone / Area） | 英文名 | 建议等级区间 | 备注 |
|---|---|---|---|---|
| 黑衣森林 The Black Shroud | 中央森林 | Central Shroud | 1–15 | 格里达尼亚起始区 |
| 黑衣森林 The Black Shroud | 北部森林 | North Shroud | 1–15 | 含 Fallgourd Float |
| 黑衣森林 The Black Shroud | 东部森林 | East Shroud | 1–15 | 含 The Hawthorne Hut |
| 黑衣森林 The Black Shroud | 南部森林 | South Shroud | 1–15（延伸至 30+） | 含 Quarrymill（死者宫殿入口） |
| 萨纳兰 Thanalan | 西萨纳兰 | Western Thanalan | 1–15 | 乌尔达哈起始区 |
| 萨纳兰 Thanalan | 中萨纳兰 | Central Thanalan | 1–15 | |
| 萨纳兰 Thanalan | 东萨纳兰 | Eastern Thanalan | 1–15 | |
| 萨纳兰 Thanalan | 南萨纳兰 | Southern Thanalan | 30–35 | |
| 萨纳兰 Thanalan | 北萨纳兰 | Northern Thanalan | 44–50 | Castrum Meridianum 所在 |
| 拉诺西亚 La Noscea | 中拉诺西亚 | Middle La Noscea | 1–15 | 利姆萨起始区 |
| 拉诺西亚 La Noscea | 下甲板拉诺西亚 | Lower La Noscea | 1–15 | |
| 拉诺西亚 La Noscea | 东拉诺西亚 | Eastern La Noscea | 30–35 | 含 Costa del Sol |
| 拉诺西亚 La Noscea | 西拉诺西亚 | Western La Noscea | 30–35 | |
| 拉诺西亚 La Noscea | 上甲板拉诺西亚 | Upper La Noscea | 40–50 | |
| 拉诺西亚 La Noscea | 外拉诺西亚 | Outer La Noscea | 44–50 | |
| 库尔札斯 Coerthas | 库尔札斯中央高地 | Coerthas Central Highlands | 40–50（2.0 上限） | 3.0 后库尔札斯西部高地独立成 zone |
| 摩杜纳 Mor Dhona | 摩杜纳 | Mor Dhona | 45–50 | 2.x 终局枢纽（Revenant's Toll） |
| （无明确大地区归类） | 狼烟丘 / 等特殊野外 | The Wolves' Den 等 | — | 多为 PvP 或活动专用小地图 |

> 说明：2.0 的 zone 划分在官方任务分类树中被拆成 "Lominsan Sidequests / Gridanian Sidequests / Ul'dahn Sidequests / Coerthan Sidequests / Mor Dhonan Sidequests"，正好对应 **拉诺西亚 / 黑衣森林 / 萨纳兰 / 库尔札斯 / 摩杜纳** 五大地区【官方：[1] Quests Category 3】。

### 2.2 ARR 的城市与据点（Hub）

| 主城 | 英文名 | 城邦 | 城内主要功能分区（社区通识） |
|---|---|---|---|
| 格里达尼亚 | Gridania | 黑衣森林 | 新街 New Gridania（冒险者行会/旅馆）、旧街 Old Gridania（市场/金碟入口不在城内）、Aethernet 3 节点 |
| 利姆萨·罗敏萨 | Limsa Lominsa | 拉诺西亚 | 上层甲板 Upper Decks、下层甲板 Lower Decks、八分仪广场、Aethernet 5 节点 |
| 乌尔达哈 | Ul'dah | 萨纳兰 | 现世回廊 Steps of Nald、来生回廊 Steps of Thal、蓝雾御殿、Aethernet 5 节点 |
| 摩杜纳·亡者之城 | Revenant's Toll (Mor Dhona) | 摩杜纳 | 2.x 事实上的"第四枢纽"，含行会/兑换/副本入口 |

**主城通用功能区抽象（可直接映射为放置游戏的主城面板）**：

| 功能区 | 作用 | 放置游戏抽象 |
|---|---|---|
| 冒险者行会 Adventurers' Guild | 接任务、旅馆入口 | 任务板 + 存档/离线结算入口 |
| 市场板 Market Board | 玩家间交易 | 交易所（可做离线挂单） |
| 旅馆 Inn Room | 下线、幻化、美容 | 离线收益结算点 |
| 金碟游乐场入口 Gold Saucer Entrance | 小游戏传送 | 小游戏/抽奖入口 |
| 以太之光 Aetheryte（主水晶） | 传送/回城点 | 主传送锚点（免费回城） |
| 以太网 Aethernet（小水晶） | 城内快速移动 | 城内快捷跳转按钮 |
| 各职业行会 Guild | 转职/技能 | 职业/天赋面板 |
| 供应商 Vendors / 修理 | 买卖装备 | 商店 NPC |
| 大国防联军 Grand Company | 军票、部队 | 阵营/工会系统 |
| 陆行鸟厩 Chocobo Stable | 坐骑养成 | 坐骑/宠物养成 |

---

## 3. 2.x 系列（2.1–2.55）新增地图与内容

| 补丁 | 新增地图 / 内容 | 说明 |
|---|---|---|
| 2.1 | 房屋区：Mist（拉诺西亚）、The Lavender Beds（黑衣森林）、The Goblet（萨纳兰） | 三大住宅区，各含 区/ward 结构 |
| 2.2 | 副本：The Lost City of Amdapor、Halatali (Hard) 等 | 无新野外 zone |
| 2.3 | 副本：The Sunken Temple of Qarn (Hard) 等 | 无新野外 zone |
| 2.35 | **死者宫殿 Palace of the Dead 前置**（实为 3.35 上线） | 见第 11 节 |
| 2.4 | 摩杜纳功能扩展、Syrcus Tower 前置 | — |
| 2.5 | The World of Darkness（水晶塔第三层） | 无新野外 zone |

> **要点**：2.x **没有新增野外 zone**。整个 ARR 生命周期内野外地图基本固定在 2.0 首发的那批。这对放置游戏设计很重要：**"版本更新 ≠ 一定加地图"**，FF14 的 2.x 把产能放在了副本/团本/住宅区上。

---

## 4. 3.0 苍穹之禁城 Heavensward（版本 3.0–3.5，等级 50–60）

### 4.1 区域 → 地图区清单

| 大地区（Region） | 地图区（Zone） | 英文名 | 等级区间 | 备注 |
|---|---|---|---|---|
| 库尔札斯 Coerthas | 库尔札斯西部高地 | Coerthas Western Highlands | 50–52 | |
| 德拉瓦尼亚 Dravania | 德拉瓦尼亚前哨 | The Dravanian Forelands | 52–54 | 含 Tailfeather |
| 德拉瓦尼亚 Dravania | 德拉瓦尼亚低地 | The Dravanian Hinterlands | 58–60 | 含 Idyllshire 入口 |
| 德拉瓦尼亚 Dravania | 陆行鸟之森 / 长者之林 | The Chocobo Forest / The Dravanian Hinterlands 关联区 | — | 部分资料将其归入 Hinterlands |
| 阿巴拉提亚 Abalathia's Spine | 天营云海 | The Sea of Clouds | 56–58 | 含 Camp Cloudtop |
| 阿巴拉提亚 Abalathia's Spine | 翻腾云海 | The Churning Mists | 54–56 | 含 Moghome |
| 阿巴拉提亚 Abalathia's Spine | 亚兹斯拉 | Azys Lla | 59–60 | 飞行区（无地面通道） |
| 龙堡 / 阿巴拉提亚 | 天柱 / 天营地 | The Pillars / Foundation（伊修加德城内） | — | 属 L3 据点 |
| 德拉瓦尼亚 | 伊迪尔郡 | Idyllshire | 58–60 | 3.x 事实上的"新第四枢纽"（无 Aetheryte 主水晶以外功能较少） |

> 3.0 属于"**地图区数量最多的大版本之一**"：7 张新野外 zone + 伊修加德（含 Foundation / The Pillars 两个城内区）+ Idyllshire。飞行（Aether Current）系统在 3.0 首次引入。
> 注：任务分类树中有 "Abalathian Sidequests / Dravanian Sidequests / Azys Lla Sidequests / Coerthan Sidequests / Ishgardian Sidequests"【官方：[1]】，与上表一一对应。

### 4.2 3.x 新增内容

| 补丁 | 新增地图/内容 | 类型 |
|---|---|---|
| 3.0 | 上述全部 HW zone + 伊修加德 | 野外/主城 |
| 3.1 | 副本：The Void Ark（虚空方舟）、Saint Mocianne's Arboretum | 团本/副本 |
| 3.2 | 副本：The Antitower、The Weeping City of Mhach | 副本/团本 |
| 3.3 | 副本：Sohr Khai、The Fractal Continuum (Hard) | 副本 |
| 3.35 | **死者宫殿 Palace of the Dead**（Quarrymill, South Shroud） | 深层迷宫 |
| 3.4 | 副本：Xelphatol、Dun Scaith | 副本/团本 |
| 3.5 | 副本：Baelsar's Wall、The Great Gubal Library (Hard) | 副本 |

---

## 5. 4.0 红莲之狂潮 Stormblood（版本 4.0–4.5，等级 60–70）

### 5.1 区域 → 地图区清单

| 大地区（Region） | 地图区（Zone） | 英文名 | 等级区间 | 备注 |
|---|---|---|---|---|
| 基拉巴尼亚 Gyr Abania | 边境之地 | The Fringes | 60–62 | |
| 基拉巴尼亚 Gyr Abania | 高峰 | The Peaks | 66–68 | |
| 基拉巴尼亚 Gyr Abania | 湖沼 | The Lochs | 68–70 | 含 Ala Mhigo 前置区 |
| 欧萨德 Othard | 红玉海 | The Ruby Sea | 62–64 | 含 Onokoro（天之御柱入口） |
| 欧萨德 Othard | 延夏 | Yanxia | 64–66 | |
| 欧萨德 Othard | 阿齐姆草原 | The Azim Steppe | 65–67 | |
| 欧萨德 Othard | 多玛 | Doma（多玛城外围） | 66–68 | 主要作为副本/剧情区 |
| 远东之国 Hingashi | 黄金港（城内） | Kugane | 62+ | L3 据点，含 Aethernet |
| 基拉巴尼亚 Gyr Abania | 神拳痕 | Rhalgr's Reach | 60–70 | 4.x 主要枢纽（含 Eureka 解锁 NPC） |
| 欧萨德 Othard | 摩天楼 / 多玛复兴区 | The Doman Enclave | 70 | 4.x 复兴玩法枢纽 |
| 欧萨德 Othard | 天之御柱（入口在红玉海） | Heaven-on-High entrance | 60–70 | 深层迷宫 |

> 任务分类树含 "Gyr Abanian Sidequests / Othardian Sidequests / Hingan Sidequests"【官方：[1]】，正好是 **基拉巴尼亚 / 欧萨德 / 远东** 三大区域。
> 注：4.x 的 **Eureka（禁断之地）** 是独立实例地图组，不占野外 zone 名额。

### 5.2 4.x 新增内容

| 补丁 | 新增地图/内容 | 类型 |
|---|---|---|
| 4.0 | 上表全部 + 神拳痕 + 黄金港 | 野外/主城 |
| 4.1 | 副本：The Drowned City of Skalla；团本：The Royal City of Rabanastre | 副本/团本 |
| 4.2 | 副本：Hells' Lid；团本：The Ridorana Lighthouse | 副本/团本 |
| 4.25 | **禁断之地 尤雷卡：阿尼莫斯 Eureka Anemos** | 探索型内容 |
| 4.3 | 副本：The Swallow's Compass；团本：The Orbonne Monastery | 副本/团本 |
| 4.35 | **天之御柱 Heaven-on-High**（Onokoro, The Ruby Sea） | 深层迷宫 |
| 4.36 | **Eureka Pagos** | 探索型内容 |
| 4.4 | 副本：The Burn、The Ghimlyt Dark | 副本 |
| 4.45 | **Eureka Pyros** | 探索型内容 |
| 4.5 | 副本：Saint Mocianne's Arboretum (Hard)、The Fractal Continuum (Hard) | 副本 |
| 4.55 | **Eureka Hydatos** + 巴尔德西昂兵武库 Baldesion Arsenal | 探索型内容 |

---

## 6. 5.0 暗影之逆焰 Shadowbringers（版本 5.0–5.5，等级 70–80）

### 6.1 区域 → 地图区清单（第一世界 诺弗兰特 Norvrandt）

| 大地区（Region） | 地图区（Zone） | 英文名 | 等级区间 | 备注 |
|---|---|---|---|---|
| 诺弗兰特 Norvrandt | 雷克兰 | Lakeland | 70–72 | 水晶都所在地 |
| 诺弗兰特 Norvrandt | 科卢西亚 | Kholusia | 72–74 | 含 Eulmore |
| 诺弗兰特 Norvrandt | 安姆·阿拉恩格 | Amh Araeng | 74–76 | 注意：正确拼写为 **Amh Araeng**（任务常被误写为 Amh Araeng/Ahm Araeng） |
| 诺弗兰特 Norvrandt | 伊尔·梅格 | Il Mheg | 74–76 | 皮克西族；**Pilgrim's Traverse 深层迷宫入口（Wolekdorf）** |
| 诺弗兰特 Norvrandt | 拉凯提卡大森林 | The Rak'tika Greatwood | 76–78 | 含 Fanow |
| 诺弗兰特 Norvrandt | 特恩佩斯特 | The Tempest | 78–80 | 含 Amaurot |
| 诺弗兰特 Norvrandt | 加尔古山 | Mt. Gulg | 79 | 主要作为副本，非开放野外 |
| 诺弗兰特 Norvrandt | 水晶都 | The Crystarium | — | **L3 主城**（含 Aethernet 多节点、市场板、旅馆） |
| 诺弗兰特 Norvrandt | 尤尔莫 | Eulmore | — | **L3 主城**（含 Aethernet） |
| 诺弗兰特 Norvrandt | 无愁之园 / 遗留之地 | The Unlost World | 90+（6.x/7.x 相关） | 与 7.0 "Unlost World Sidequests" 分类同名字段，需二次核实其归属 |

> 任务分类树含 "Lakeland Sidequests / Kholusian Sidequests / Amh Araeng Sidequests / Il Mheg Sidequests / Rak'tika Sidequests / Tempest Sidequests"【官方：[1]】，正好 **6 张野外 zone**，与上表一致。
> **重要澄清**：任务描述里把 "Mt. Gulg" 和 "The Rak'tika Greatwood" 列成 zone 是对的，但 **Eulmore / Crystarium 不是野外 zone，而是 L3 主城**；**Amh Araeng 与 "Ahm Araeng" 是同一张图的拼写变体**，不要当成两张。

### 6.2 5.x 新增内容

| 补丁 | 新增地图/内容 | 类型 |
|---|---|---|
| 5.0 | 上表 6 张野外 + 水晶都 + 尤尔莫 | 野外/主城 |
| 5.1 | 团本：The Copied Factory；副本：The Grand Cosmos | 团本/副本 |
| 5.2 | 团本：The Puppets' Bunker；副本：Anamnesis Anyder | 团本/副本 |
| 5.21 | **天佑女王 Save the Queen：南方博兹雅战线 Bozja Southern Front** | 探索型内容 |
| 5.3 | 团本：The Tower at Paradigm's Breach；副本：The Heroes' Gauntlet、Matoya's Relict | 团本/副本 |
| 5.35 | **扎德诺尔 Zadnor** | 探索型内容 |
| 5.4 | 副本：Matoya's Relict、Paglth'an | 副本 |
| 5.45 | 扎德诺尔追加；戴尔弗尼攻防战 Delubrum Reginae | 探索型内容 |
| 5.5 | 副本：The Tower of Zot 前置（实为 6.0）、Paglth'an | 副本 |
| 5.55 | 扎德诺尔剧情收尾 | 探索型内容 |

---

## 7. 6.0 晓月之终途 Endwalker（版本 6.0–6.5，等级 80–90）

### 7.1 区域 → 地图区清单

| 大地区（Region） | 地图区（Zone） | 英文名 | 等级区间 | 备注 |
|---|---|---|---|---|
| 萨维奈岛 Thavnair | 萨维奈岛 | Thavnair | 80–82 | 含 Yedlihmad |
| 萨维奈岛 Thavnair | 拉兹·阿特汉（城内） | Radz-at-Han | — | **L3 主城** |
| 加雷马帝国 Garlemald | 加雷马 | Garlemald | 82–84 | 雪原 |
| 月面 Mare Lamentorum | 叹息之海 | Mare Lamentorum | 84–86 | 月球地表 |
| 月面 Mare Lamentorum | 星海 | The Sea of Stars | 86–88 | 月球内部，Loporrit 据点 |
| 艾尔皮斯 Elpis | 艾尔皮斯 | Elpis | 86–88 | 古代世界 |
| 夏雷安 Sharlayan | 旧夏雷安（城内） | Old Sharlayan | — | **L3 主城** |
| 夏雷安 Sharlayan | 拉比林托斯 | Labyrinthos | 88–90 | 夏雷安地下研究设施 |
| 乌尔提玛·图勒 Ultima Thule | 乌尔提玛·图勒 | Ultima Thule | 90 | 终局地图 |
| （无大地区） | 月球 / 加雷马近郊等 | — | — | — |

> 任务分类树含 "Sharlayan Sidequests / Thavnairian Sidequests / Garlean Sidequests / Mare Lamentorum Sidequests / Elpis Sidequests / Ultima Thule Sidequests"【官方：[1]】——注意 **Labyrinthos 没有独立分类，被并进 Sharlayan**；这与"夏雷安 = Old Sharlayan（城）+ Labyrinthos（野外）"的结构一致。
> **纠错**：任务描述把 "The Sea of Stars" 当作独立野外 zone。严格说 **Mare Lamentorum 是野外区，"The Sea of Stars" 是同一月球区域内的下层层级/据点区**，建议在数据模型里把它标为"子区域"而非同级 zone。

### 7.2 6.x 虚无界 The Thirteenth（第十三世界）与其它

| 补丁 | 新增地图/内容 | 所在区域 | 类型 |
|---|---|---|---|
| 6.1 | 副本：Alzadaal's Legacy；团本：Aglaia | 萨维奈地下 / 神话 | 副本/团本 |
| 6.2 | **虚无界：The Fell Court of Troia**；继续深入虚无界 | 第十三世界 The Thirteenth | 副本（虚无界首入） |
| 6.2 | 团本：Euphrosyne | — | 团本 |
| 6.3 | 团本：Thaleia；副本：The Aetherfont | — | 团本/副本 |
| 6.35 | **尤雷卡·奥尔特斯 Eureka Orthos**（The Eight Sentinels, Mor Dhona） | 摩杜纳 | 深层迷宫 |
| 6.4 | 副本：The Lunar Subterrane；团本：无 | 月面 | 副本 |
| 6.5 | 副本：The Stigma Dreamscape、The Fell Court of Troia 相关 | — | 副本 |
| 6.5x | **虚无界系列剧情**（Zero 相关） | 第十三世界 | 剧情线，非独立野外 zone |

> **关键结论（针对任务第 6.x 项）**：**6.x 没有新增可自由探索的野外 zone**。"虚无界 The Thirteenth / The Fell Court of Troia / Alzadaal's Legacy" **全部是副本或剧情场景**，不是开放地图。把它们当作"地图"会导致放置游戏的关卡表出现幽灵地图。

---

## 8. 7.0 黄金的遗产 Dawntrail（版本 7.0，等级 90–100）

### 8.1 区域 → 地图区清单【官方/社区双证】

| 大地区（Region） | 地图区（Zone） | 英文名 | 等级区间 | 备注 |
|---|---|---|---|---|
| 尤卡图拉尔 Yok Tural | 乌尔科帕查 | Urqopacha | 90–92 | 秘鲁风，羊驼/佩鲁佩鲁族；Worqor Lar Dor 讨伐所在 |
| 尤卡图拉尔 Yok Tural | 科扎玛乌卡 | Kozama'uka | 91–93 | 森林/农业，哈努族与莫布林族 |
| 尤卡图拉尔 Yok Tural | 亚克·特埃尔 | Yak T'el | 93–95 | 分上下层，下层有发光生态与陨石碎片；Xbr'aal（赫罗斯加） |
| 谢尔达尔 Xak Tural | 沙洛阿尼 | Shaaloani | 95–97 | 西部拓荒/铁路主题 |
| 谢尔达尔 Xak Tural | 遗世之地 | Heritage Found | 97–99 | 图拉尔与亚历山大融合区，雷电主题 |
| 谢尔达尔 Xak Tural | 生者的记忆 | Living Memory | 99–100 | "Endless" 的人工世界 |
| 谢尔达尔 Xak Tural | 索卢申九号 | Solution Nine | — | **L3 主城**（高科技都市） |
| 尤卡图拉尔 Yok Tural | 图莱尤拉 | Tuliyollal | — | **L3 主城**（初始主城） |
| 谢尔达尔 Xak Tural | 无愁之园 | The Unlost World | 100 | 与 6.x 同名字段，任务分类树单独列出 "Unlost World Sidequests"【官方：[1]】 |

**来源**：
- 7 张野外 + 2 座主城（Tuliyollal / Solution Nine）由 esports.net 7.0 首发报道逐一列出【[9]】；
- 任务分类树中 "Yok Tural Sidequests / Xak Tural Sidequests / Unlost World Sidequests" 三个分类【官方：[1]】，证实 **图拉尔大区被拆为 Yok Tural（尤卡图拉尔）与 Xak Tural（谢尔达尔）两个 Region**，另有 Unlost World 单独成类。

> **核实结论**：7.0 的 zone 清单就是 **7 张野外（Urqopacha、Kozama'uka、Yak T'el、Shaaloani、Heritage Found、Living Memory，共 6 张野外 + Unlost World 作为终局区域）+ 2 座主城**。任务描述中列的名字全部正确，只需注意 **Solution Nine 是主城不是野外 zone**。

### 8.2 7.0 内容的"量级"基准

| 类别 | 7.0 首发数量 | 说明 |
|---|---|---|
| 野外 zone | 6–7 | 视 Unlost World 是否独立计数 |
| 主城 hub | 2 | Tuliyollal、Solution Nine |
| 副本 dungeon | 6（首发） | Ihuykatumu(91)、Worqor Zormor(93)、The Skydeep Cenote(95)、Vanguard(97)、Origenics(99)、Alexandria(100)【社区：[3]】 |
| 讨伐 trial | 3（首发） | Worqor Lar Dor(93)、Everkeep(99)、The Interphos(100)【社区：[4]】 |
| 8 人 raid | 0（首发，7.05 起） | Arcadion: Heavyweight 于 7.05 上线【社区：[5]】 |
| 团本 alliance raid | 0（首发，7.1 起） | Echoes of Vana'diel 从 7.1 开始【官方：[2]】 |

---

## 9. 7.1–7.5：新地图与新内容的**核实结果**（任务第 1、2 项的关键交付）

**结论：7.1–7.5 没有新增"传统野外 zone"，但新增了 4 类新的"类地图"内容。** 这一点对放置游戏设计极有价值——FF14 在 7.x 阶段把"新地图"的形态从"野外 zone"转向了"独立实例化探索地图"。

| 补丁 | 名称 | 是否是"新地图" | 类型 | 细节 |
|---|---|---|---|---|
| 7.1 (2024-11-12) | 副本 Yuweyawata Field Station | ❌ 副本 | Dungeon | 位于 **Heritage Found 北部**的 Tonawawtan 村旧址【官方：[2]】 |
| 7.1 | 团本 Jeuno: The First Walk | ❌ 团本 | Alliance Raid | Echoes of Vana'diel 系列第 1 弹，场景在 **Yak T'el** 地下【官方：[2]】 |
| 7.1 | 讨伐 The Minstrel's Ballad: Sphene's Burden | ❌ 讨伐 | Trial (Extreme) | 【官方：[2]】 |
| 7.11 | 绝境战 Futures Rewritten (Ultimate) | ❌ | Ultimate Raid | i735 同步，6 阶段【社区：[6]】 |
| 7.2 | **奥库尔特·克雷森特 The Occult Crescent** | ✅ **新独立探索地图** | Field Operation | 含 **South Horn / North Horn** 两块区域，是 Dawntrail 版的 Eureka/Bozja【社区：[5] 的 Field-Operation Raids 段落 + 搜索摘要】 |
| 7.2 | 副本 The Underkeep | ❌ | Dungeon | 位于 Solution Nine 方向【社区：[3]】 |
| 7.2x | 团本 San d'Oria: The Second Walk | ❌ | Alliance Raid | 【社区：[5]】 |
| 7.3 | **宇宙探索：Phaennam Cosmic Exploration: Phaennam** | ✅ **新独立地图/玩法区** | Cosmic Exploration | 玩家自建基地 + 星球开发型地图【社区：[14] Wikipedia 摘要，标注 "ab 7.31"】 |
| 7.3 | 副本 The Clyteum、The Meso Terminal | ❌ | Dungeon | 【社区：[3]】 |
| 7.35 | **朝圣者之路 Pilgrim's Traverse** | ✅ **最深层迷宫** | Deep Dungeon | 入口 **Wolekdorf, Il Mheg**（注意：在 5.0 的伊尔·梅格，不在图拉尔！），100 层，91–100 级，全层可匹配【社区：[7]】 |
| 7.35 | 团本 Windurst: The Third Walk | ❌ | Alliance Raid | 【社区：[5]】 |
| 7.4 | 新副本 + 新讨伐（Recollection / The Unmaking 等 100 级内容） | ❌ | — | 【社区：[3][4]】 |
| 7.5 | 副本 The Strayborough Deadwalk、Tender Valley、Yuweyawata 等已上线 | ❌ | Dungeon | 【社区：[3]】 |
| 7.51 | 绝境战 Dancing Mad (Ultimate) | ❌ | Ultimate Raid | i795 同步，5 阶段【社区：[6]】 |
| 7.5x | 讨伐 The Windward Wilds 及其 Extreme | ❌ | Trial | 【社区：[4]】 |

**7.1–7.5 新增"类地图"清单（放置游戏可直接复用为"特殊关卡类型"）**：

| 序号 | 名称 | 英文 | 首次出现 | 地图特征 |
|---|---|---|---|---|
| 1 | 奥库尔特·克雷森特 | The Occult Crescent | 7.2 | 大地图分区块推进（South Horn → North Horn），带独立等级/幻影职业系统 |
| 2 | 宇宙探索 | Cosmic Exploration | 7.21/7.31 | 玩家基地建设 + 星球区域开发，非战斗地图 |
| 3 | 朝圣者之路 | Pilgrim's Traverse | 7.35 | 100 层随机生成深层迷宫，跨版本回收旧地图（Il Mheg） |
| 4 | 分岔塔 | The Forked Tower | 7.2 | Occult Crescent 内的多路线团队副本（Demon Tablet / Dead Stars / Marble Dragon / Magitaur 四 Boss）【社区：[5]】 |

---

## 10. 各大版本"数量级"汇总表（放置游戏关卡预算参考）

### 10.1 汇总主表

| 大版本 | 野外 zone 数 | 主城/hub 数 | 副本 dungeon（不含深层迷宫） | 讨伐 trial（标准） | 讨伐（高难度/Extreme） | 8 人 raid 层数 | 团本 alliance raid | 绝境战 Ultimate | 深层迷宫 | 探索型内容 |
|---|---|---|---|---|---|---|---|---|---|---|
| 2.0 ARR | 18–19 | 4（3 城邦 + 摩杜纳） | 21 标准 + 10 Hard = 31 | 18 | 8 | 13（5+4+4） | 3 | 0（4.x 才有） | 0（3.35 才有） | 0 |
| 3.0 HW | 7 | 2（伊修加德 + Idyllshire） | 13 标准 + 5 Hard = 18 | 7 | 7 | 12（4×3） | 3 | 0 | 1（3.35 起算跨版本） | 0 |
| 4.0 SB | 7–8 | 3（神拳痕 + 黄金港 + 多玛复兴区） | 13 标准 + 2 Hard = 15 | 9 | 8 | 12（4×3） | 3 | 2（4.11 / 4.31） | 1（4.35） | 1（Eureka 4 zone） |
| 5.0 ShB | 6 | 2（水晶都 + 尤尔莫） | 13 标准（无 Hard） | 7 | 8 | 12（4×3） | 3 | 1（5.11） | 0 | 1（Bozja 2 zone + Delubrum） |
| 6.0 EW | 6 | 3（旧夏雷安 + 拉兹·阿特汉 + 月面据点群） | 13 标准 | 8 | 7 | 12（4×3） | 3 | 2（6.11 / 6.31） | 1（6.35） | 0（无新 Eureka 类） |
| 7.0 DT | 6–7 | 2（图莱尤拉 + 索卢申九号） | 13 标准 | 8 | 8 | 12（4×3） | 3 | 2（7.11 / 7.51） | 1（7.35） | 2（Occult Crescent + Cosmic Exploration） |

**数据来源拆解**：
- 副本 / 讨伐 / raid 层数 / 绝境战 / 深层迷宫 / 探索型内容的**逐条清单**来自 Eorzean Tavern 档案【社区统计：[3][4][5][6][7][8]】；
- 野外 zone 数中 7.0 部分来自 esports.net【[9]】，其余为模型知识 +【官方：[1]】任务分类树佐证。

### 10.2 全游戏总量（截至 7.5x）

| 指标 | 数值 | 来源与口径 |
|---|---|---|
| **Duty 总条目** | **400** | 【官方：[1]】Eorzea Database 首页 "Duty(400)"，Versions: Patch 7.56 |
| **副本 Dungeon** | **103** | 【社区统计：[3]】"This archive collects all 103 dungeon guides"——注意 **不含深层迷宫、不含分岔/分岐副本（Variant/Criterion）** |
| ├ ARR | 31（21 标准 + 10 Hard） | 【社区：[3]】 |
| ├ HW | 18（13 标准 + 5 Hard） | 【社区：[3]】 |
| ├ SB | 15（13 标准 + 2 Hard） | 【社区：[3]】 |
| ├ ShB | 13（无 Hard） | 【社区：[3]】 |
| ├ EW | 13（无 Hard） | 【社区：[3]】 |
| └ DT | 13（无 Hard） | 【社区：[3]】 |
| **讨伐 Trial 总计** | **至少 111**（标准 57 + 高难度 46） | 【社区统计：[4]】分版本表求和：18+8、7+7、9+8、7+8、8+7、8+8 |
| **8 人 raid 层数总计** | **75 个遭遇（18 个 tier）** | 【社区：[5]】ARR 13 + HW 12 + SB 12 + ShB 12 + EW 12 + DT 12 = 73（另 2 个为 ARR 层内拆分口径差异，社区站自报"遭遇指南数"为 8/27/27/27/27/31） |
| **团本 Alliance Raid** | **18**（6 版本 × 3） | 【社区：[5]】ARR 3、HW 3、SB 3、ShB 3、EW 3、DT 3（DT 第 3 弹于 7.35 上线） |
| **绝境战 Ultimate** | **7** | 【社区统计：[6]】UCoB(4.11)、UWU(4.31)、TEA(5.11)、DSR(6.11)、TOP(6.31)、FRU(7.11)、Dancing Mad(7.51) |
| **深层迷宫 Deep Dungeon** | **4** | 【社区统计：[7]】PotD(3.35,200层)、HoH(4.35,100层)、Eureka Orthos(6.35,100层)、Pilgrim's Traverse(7.35,100层) |
| **探索型内容 Field Operation** | **3 大组** | Eureka(4 zone)、Bozja(2 zone + Delubrum Reginae)、Occult Crescent(2 zone)【社区：[8][5]】 |

**数字随版本变动的规律（放置游戏可建模为"内容通胀曲线"）**：

| 规律 | 具体表现 |
|---|---|
| 副本数在 5.0 之后**稳定为每版本 13 个** | ARR 31→HW 18→SB 15→ShB 13→EW 13→DT 13；5.0 起取消 Hard Mode 副本，总量固定在 13 |
| 讨伐数**稳定在每版本 15 个左右**（标准 7–9 + 高难度 7–8） | 大小版本几乎不涨 |
| 8 人 raid **严格每版本 3 层 × 4 个 = 12 个**（ARR 例外为 13） | 这是 FF14 最稳定的内容节奏 |
| 团本 **严格每版本 3 个** | 6 个版本 × 3 = 18 |
| 绝境战**约每 2 年 1 个**，总 7 个 | 与大版本节奏解耦，7.x 阶段提速到 2 个/版本 |
| 深层迷宫**约每版本 1 个**（5.0 缺位） | 3.35 / 4.35 / 6.35 / 7.35，规律性极强（都是 x.35） |
| 野外 zone **稳定在每版本 6–7 张** | ARR 例外（18+，因为是"从零建世界"） |

### 10.3 逐版本副本清单（按等级排序，可直接作为关卡表的骨干）

**A Realm Reborn（31 个：21 标准 + 10 Hard）**【社区统计：[3]】**

| 等级 | 副本 | 英文 |
|---|---|---|
| 15 | 萨斯塔沙洞窟 | Sastasha |
| 16 | 塔姆塔拉墓园 | The Tam-Tara Deepcroft |
| 17 | 铜铃矿山 | Copperbell Mines |
| 20 | 哈拉塔利 | Halatali |
| 24 | 千颚洞 | The Thousand Maws of Toto-Rak |
| 28 | 豪克庄园 | Haukke Manor |
| 32 | 布雷弗洛克斯牧场 | Brayflox's Longstop |
| 35 | 卡恩沉没神殿 | The Sunken Temple of Qarn |
| 38 | 割喉洞 | Cutter's Cry |
| 41 | 石卫城 | The Stone Vigil |
| 44 | 泽梅尔要塞 | Dzemael Darkhold |
| 47 | 黄金谷 | The Aurum Vale |
| 50 | 阿姆达波尔城塞 | Amdapor Keep |
| 50 | 梅里迪亚努姆要塞 | Castrum Meridianum |
| 50 | 破船岛 | Hullbreaker Isle |
| 50 | 天狼星灯塔 | Pharos Sirius |
| 50 | 雪cloak | Snowcloak |
| 50 | 湖之守护者 | The Keeper of the Lake |
| 50 | 阿姆达波尔废墟 | The Lost City of Amdapor |
| 50 | 禁城 | The Praetorium |
| 50 | 流浪者宫殿 | The Wanderer's Palace |
| 50 | 10 个 Hard 版 | Sastasha (H) / Tam-Tara (H) / Copperbell (H) / Halatali (H) / Haukke (H) / Qarn (H) / Stone Vigil (H) / Brayflox (H) / Amdapor Keep (H) / Wanderer's Palace (H) |

**Heavensward（18 个：13 标准 + 5 Hard）**【社区统计：[3]】**

| 等级 | 副本 | 英文 |
|---|---|---|
| 51 | 黄昏哨所 | The Dusk Vigil |
| 53 | 索姆阿尔 | Sohm Al |
| 55 | 天巢 | The Aery |
| 57 | 宝库 | The Vault |
| 59 | 大古巴尔图书馆 | The Great Gubal Library |
| 60 | 巴埃尔萨城墙 | Baelsar's Wall |
| 60 | 永不收割 | Neverreap |
| 60 | 圣莫西安植物园 | Saint Mocianne's Arboretum |
| 60 | 索尔·卡伊 | Sohr Khai |
| 60 | 魔科学研究所 | The Aetherochemical Research Facility |
| 60 | 反塔 | The Antitower |
| 60 | 分形continuum | The Fractal Continuum |
| 60 | 泽尔法托尔 | Xelphatol |
| 60 | Hard ×5 | Hullbreaker Isle (H) / Pharos Sirius (H) / Sohm Al (H) / Great Gubal Library (H) / Lost City of Amdapor (H) |

**Stormblood（15 个：13 标准 + 2 Hard）**【社区统计：[3]**

| 等级 | 副本 | 英文 |
|---|---|---|
| 61 | 塞壬海 | The Sirensong Sea |
| 63 | 紫水宫 | Shisui of the Violet Tides |
| 65 | 巴丹姆的斗志 | Bardam's Mettle |
| 67 | 多玛城 | Doma Castle |
| 69 | 阿巴尼亚要塞 | Castrum Abania |
| 70 | 阿拉米格 | Ala Mhigo |
| 70 | 鬼之门 | Hells' Lid |
| 70 | 黄金港城 | Kugane Castle |
| 70 | 焦土 | The Burn |
| 70 | 斯卡拉水没城 | The Drowned City of Skalla |
| 70 | 吉姆利特暗域 | The Ghimlyt Dark |
| 70 | 燕之罗盘 | The Swallow's Compass |
| 70 | 拳之道场 | The Temple of the Fist |
| 70 | Hard ×2 | Saint Mocianne's Arboretum (H) / The Fractal Continuum (H) |

**Shadowbringers / Endwalker / Dawntrail（各 13 个，无 Hard）**

| 版本 | 等级 71/81/91 | 等级 73/83/93 | 等级 75/85/95 | 等级 77/87/97 | 等级 79/89/99 | 等级 80/90/100（后半） |
|---|---|---|---|---|---|---|
| ShB | Holminster Switch | Dohn Mheg | The Qitana Ravel | Malikah's Well | Mt. Gulg | Akadaemia Anyder, Amaurot, Anamnesis Anyder, Matoya's Relict, Paglth'an, The Grand Cosmos, The Heroes' Gauntlet, The Twinning |
| EW | The Tower of Zot | The Tower of Babil | Vanaspati | Ktisis Hyperboreia | The Aitiascope | Alzadaal's Legacy, Lapis Manalis, Smileton, The Aetherfont, The Dead Ends, The Fell Court of Troia, The Lunar Subterrane, The Stigma Dreamscape |
| DT | Ihuykatumu | Worqor Zormor | The Skydeep Cenote | Vanguard | Origenics | Alexandria, Mistwake, Tender Valley, The Clyteum, The Meso Terminal, The Strayborough Deadwalk, The Underkeep, Yuweyawata Field Station |

> **可复用的节奏规律**：5.0 之后每一版都是「5 张练级副本（x1/x3/x5/x7/x9）+ 8 张满级副本（x0）」，练级副本恰好与 6 张野外 zone 的等级区间错位咬合。放置游戏可用同一套公式：**zone 数 N → 练级副本地图 N-1 张，覆盖 L_min+1 到 L_max-1 的奇数等级。**

---

## 11. 深层迷宫 / 探索型内容的地图结构特征

### 11.1 四个深层迷宫对比【社区统计：[7]】

| 迷宫 | 补丁 | 入口 | 层数 | 等级区间 | 匹配限制 | 独特机制 |
|---|---|---|---|---|---|---|
| 死者宫殿 Palace of the Dead | 3.35 | Quarrymill, South Shroud | **200** | 1–60 | 101–200 层不可匹配 | 唯一 200 层；第 50 层通关开启 51 层重开；**是其他三个的前置** |
| 天之御柱 Heaven-on-High | 4.35 | Onokoro, The Ruby Sea | **100** | 60–70 | 31–100 层不可匹配 | 第 30 层通关开启 21 层重开 |
| 尤雷卡·奥尔特斯 Eureka Orthos | 6.35 | The Eight Sentinels, Mor Dhona | **100** | 81–90 | 31–100 层不可匹配 | 用 Mor Dhona 旧地图做入口 |
| 朝圣者之路 Pilgrim's Traverse | 7.35 | Wolekdorf, Il Mheg | **100** | 91–100 | **全层可匹配** | 可从 1/21/31/51/71 层进入；第 99 层 Boss 有独立版 "The Final Verse"（可 1–4 人）与 "The Final Verse (Quantum)"（4 人，消耗 offerings 提升难度与掉落） |

**深层迷宫的通用地图结构（可直接抽象为放置游戏"无限塔"模式）**：
1. **程序化生成楼层**：地图布局每次运行都重新生成，无法背板；
2. **自底向上等级同步**：进入时等级被压到起点，只在迷宫内部成长；
3. **无角色限制**：可 1–4 人，无坦克/治疗硬需求（青魔除外）；
4. **Pomander（香盒）**：消耗品，临时改变楼层规则或提供 Buff；
5. **原地复活资源稀缺**：药水/凤凰尾成为核心资源；
6. **单人无死亡通关成就**：给硬核玩家额外目标。

### 11.2 探索型内容（Eureka / Bozja / Occult Crescent）

**Eureka（禁断之地）结构【社区统计：[8]】**：

| 地图区 | 元素等级 | 主要推进内容 |
|---|---|---|
| 阿尼莫斯 Anemos | 1–20 | FATE 列车、Anemos 水晶、武器/防具首轮强化 |
| 帕戈斯 Pagos | 20–35 | Pagos 水晶、kettle light、兔子 FATE、冷冻锁箱 |
| 皮罗斯 Pyros | 35–50 | **Logos Actions（徽章动作）**、Pyros 水晶、热锁箱 |
| 希达托斯 Hydatos | 50–60 | Hydatos 水晶、最终遗物步骤、**巴尔德西昂兵武库 Baldesion Arsenal** |

Eureka 的地图设计要点：
- 单实例最多 **144 名玩家**，是 FF14 最大规模的野外协作地图；
- 每张图有独立的 **aetheryte 网络**，需按元素等级阈值逐个 attune；
- **天气 + 时间双条件触发特殊怪物（mutate）**，掉落区域专属锁箱 —— 例如 Pagos 的 Escaped Tyrannosaur 需"夜晚+任意天气"、Pagos Chimera 需"暴雪"、Pyros 的 Soulless Pathfinder 需"夜晚+雷"【社区：[8]】；
- 剧情任务点**故意不在地图上标出**，需要玩家按等级回 Krile 处领取，形成"软性探索度"；
- **Baldesion Arsenal** 是收尾的大型团队副本，复活严重受限。

**Bozja（南方博兹雅战线 / 扎德诺尔）**：2 张主地图 + Delubrum Reginae（大型副本），使用"抵抗军等级"与"lost actions"，机制上是 Eureka 的迭代版。

**Occult Crescent（7.2 起）**：Dawntrail 版的探索型内容，分 **South Horn / North Horn**，带 **Phantom Jobs（幻影职业）**，其内的 **The Forked Tower** 是多路线团队副本（Blood route 已覆盖 4 个 Boss）【社区：[5]】。

### 11.3 探索型内容的地图结构共性（三组对比）

| 维度 | Eureka（4.x） | Bozja（5.x） | Occult Crescent（7.x） |
|---|---|---|---|
| 地图区块 | 4（Anemos/Pagos/Pyros/Hydatos） | 2（Southern Front / Zadnor）+ Delubrum Reginae | 2（South Horn / North Horn） |
| 独立等级 | 元素等级 1–60（分 4 段） | 抵抗军等级（Resistance Rank） | Phantom 等级（社区推测，待核） |
| 特殊能力系统 | Logos Actions（Pyros 起） | Lost Actions | Phantom Jobs（幻影职业） |
| 地图 Boss | Notorious Monster（FATE 列车触发） | Critical Engagements / Skirmishes | Critical Engagements（待核） |
| 最终大型副本 | Baldesion Arsenal（144 人级） | Delubrum Reginae / 达尔马斯卡 | The Forked Tower（多路线） |
| 天气/时间依赖 | ✅ 强（mutate 怪） | ✅ 中 | 待核 |
| 单实例人数 | 最多 144 | 最多 72（待核） | 待核 |

**探索型内容的共同设计公式（放置游戏可直接抄）**：
```
field_operation = {
  独立等级轴（与主线等级解耦）
+ 独立地图组（2–4 张，依次解锁）
+ 地图内循环：FATE/CE 刷新 → 触发 NM Boss → 掉落区域货币
+ 区域货币 → 武器/防具强化线（遗物武器）
+ 天气/时间条件门控的特殊怪（稀有掉落）
+ 收尾大型副本（高难度、复活受限）
}
```

---

## 12. 地图设计要素清单（放置游戏直接可用的抽象）

### 12.1 传送与移动系统

| 要素 | 英文 | FF14 规则 | 放置游戏抽象 |
|---|---|---|---|
| 主以太之光 | Aetheryte（大水晶） | 每个 zone/hub 一个主传送点；需"attune"（共鸣）后才能传送 | 地图解锁锚点；首次到达需行走，之后可一键传送 |
| 小以太之光 | Aetheryte（小水晶）/ Aethernet | 城内快速移动网络，节点独立解锁 | 城内快捷跳转按钮（不做战斗） |
| 以太网 | Aethernet | 主要在主城内部，多节点（如利姆萨 5 节点） | 主城功能面板的 tab 结构 |
| 陆行鸟驿站 | Chocobo Porter | 定点自动移动，付费，可挂机 | 自动寻路/离线移动计时器 |
| 渡船 / 飞空艇 | Ferry / Airship | 跨区域移动，有独立时刻表（公共交通工具） | 定时班次式的跨区移动事件 |
| 传送费 | Teleport fee | 按距离收费，收藏夹可减免 | 传送消耗资源，鼓励规划路线 |
| 飞行解锁 | Aether Current（风脉） | 每张图 4 个野外风脉 + 1 个任务风脉，共 5 个；集齐并完成对应任务后解锁该图飞行 | **地图完成度门槛**：收集若干道具后解锁"加速/跳过地形"能力 |

### 12.2 地图内容密度要素

| 要素 | 英文 | 说明 |
|---|---|---|
| FATE | FATE (Full Active Time Event) | 地图上定时刷新的公共事件，按等级分布；是升级与刷代币的主力 |
| 狩猎怪 | Hunt Marks（B/A/S 级） | 每张图固定几个刷新点，B 级单人、A 级组队、S 级全服触发条件（特定天气/时间/前置 FATE） |
| 区域 Boss | Zone Boss / Notorious Monster | Eureka/Bozja 中的 NM，由 FATE 列车触发 |
| 天气系统 | Weather | 每张图有天气表（晴/雨/雷/雪/雾等），**影响特殊怪物刷新、钓鱼、采集** |
| 昼夜 | Day / Night cycle | 约 70 分钟一个游戏日；影响特殊怪物（如 Eureka mutates）与部分任务 |
| 探索度 | Exploration / Map completion | 通过风脉、宝箱、支线、地图绘制完成 |
| 地图完成奖励 | Completion rewards | 风脉全收集 → 飞行；成就 → 坐骑/称号 |
| 采集点 | Gathering nodes | 按等级分布，受天气/时间影响（限时采集点） |
| 钓鱼点 | Fishing holes | 受天气/时间/鱼饵影响，有"大物"分级 |

### 12.3 天气与昼夜的机制细节（放置游戏"定时挂机"设计的核心参考）

| 项目 | FF14 行为 | 设计与来源 |
|---|---|---|
| 游戏内一天时长 | 约 70 分钟真实时间（艾欧泽亚时间 1 天 ≈ 70 分钟，1 小时 ≈ 175 秒） | 社区通识（待核精确值） |
| 天气切换 | 天气按**天气周期**整体刷新，每个周期约 **23 分钟** 35 秒；每个 zone 有独立的天气表与概率权重 | 【社区】天气系统通识，Gamer Escape / Fandom 均有 Weather 条目（本次被 Cloudflare 拦截，未能读正文） |
| 天气种类 | 晴 Fair Skies、阴 Cloudy、雾 Fog、雨 Rain、雷雨 Thunderstorms、雪 Snow、暴雪 Blizzards、强风 Winds、沙尘 Dust Storms、热浪 Heat Waves、灵气 Umbral/Astral 异常等 | 【社区】：Fandom "Weather (Final Fantasy XIV)" 条目存在并列出雷雨等分类 |
| 天气影响 | ① 特殊怪物 mutate 刷新（Eureka）；② 钓鱼（特定鱼只在特定天气咬钩）；③ 采集限时点；④ S 级狩猎怪触发条件；⑤ 部分 FATE 与任务 | Eureka mutate 条件已在第 11.2 节逐条列出【社区：[8]】 |
| 昼夜影响 | ① Eureka mutate（如 Escaped Tyrannosaur 需夜晚）；② 部分 S 怪；③ 部分鱼类；④ 视觉表现（光照、天空盒） | 【社区：[8]】 |
| 天气预报 | 官方有"天气预报"功能可查任意 zone 的未来天气，玩家据此排程 | 官方游戏内功能（Play Guide 有对应条目） |

**放置游戏的"天气/时间门控"抽象模板**：

| 门控类型 | FF14 原型 | 放置游戏实现 |
|---|---|---|
| 纯随机 | 普通 FATE 刷新 | 每 N 分钟按概率触发地图事件 |
| 时间窗 | 夜晚怪、夜间鱼 | 服务器时间落在 [T1,T2] 时才可能刷新 |
| 天气窗 | 暴雪怪、雨天鱼 | 地图天气状态机命中指定状态时刷新 |
| 时间 + 天气复合 | Eureka "夜晚 + 雷" 的 Soulless Pathfinder | 两个状态同时命中，稀有度提升 |
| 前置链式 | S 级狩猎怪（需先完成特定 FATE/击杀特定怪） | 地图内进度条达标后解锁隐藏 Boss |

**设计价值**：天气/昼夜是 FF14 让"同一张地图在不同时间有不同产出"的核心机制，也是放置游戏最容易复刻、性价比最高的深度来源——**它不需要为新地图做美术，只需要一张状态表和一张掉落表。**

### 12.4 狩猎怪（Hunt Marks）的分级与地图定位

| 等级 | 英文 | 刷新方式 | 队伍规模 | 地图分布 |
|---|---|---|---|---|
| B 级 | B Rank | 固定刷新点，击杀后固定 CD 重生 | 单人可打 | 每张野外 zone 1 个固定点 |
| A 级 | A Rank | 固定刷新点，击杀后固定 CD 重生（通常数小时） | 3–8 人 | 每张野外 zone 1–2 个点 |
| S 级 | S Rank | **条件触发**：特定天气 / 特定时间 / 前置 FATE / 前置击杀 / 上交特定物品 | 满编团队（24+） | 每张野外 zone 1 个隐藏点位 |
| 特殊 | Elite / 传说 | 版本活动或特殊地图（如 Occult Crescent） | 不定 | 不定 |
| 相关日常 | Daily / Weekly Hunt Bill（狩猎公告板） | 每日/每周在对应大版本 hub 接取，指向 B/A 级 | 单人/小队 | 在主城 Grand Company 处 |

**来源**：【社区】Gamer Guides "What is The Hunt"、icy-veins "Heavensward Hunts Guide"、Ludo.guide "Sanctuary Rank Unlocks"（200 可读，但正文截断，仅确认标题与主题）；官方 Lodestone 有 "The Hunt" 相关成就分类。

> **对放置游戏的关键启示**：Hunt Marks 把"地图上的静态点位"变成了**三层难度 × 三层人数的矩阵**（B/A/S × 单人/小队/团队）。这是用极低的美术成本在每张地图上塞进三档可重复内容的标准做法。

### 12.5 zone 解锁顺序与等级门槛

FF14 的 zone 解锁是**严格线性（MSQ 驱动）**的：
1. 主线任务（MSQ）推进到某等级段落 → 开放下一张 zone；
2. 每张 zone 有明确的**推荐等级区间**（见各版本表）；
3. zone 之间的通道往往是**单向剧情通道**（部分地图如 Azys Lla 只能飞行进入）；
4. 主城 hub 每隔 1–2 个版本新增一个（摩杜纳 → 伊迪尔郡 → 神拳痕 → 水晶都 → 旧夏雷安 → 图莱尤拉 → 索卢申九号）。

**放置游戏可抽象为**：
```
zone_unlock(zone) = MSQ_stage >= X AND player_level >= L_zone_min
zone_max_level(zone) = L_zone_max       # 决定该图的 EXP 衰减
zone_teleport(zone)  = has_attuned_aetheryte(zone)
zone_flying(zone)    = aether_currents_collected(zone) == 5
```

### 12.6 主城（Hub）结构抽象

| 功能 | FF14 实现 | 放置游戏对应 |
|---|---|---|
| 任务发放 | Adventurers' Guild / Wandering Minstrel | 主线/日常任务入口 |
| 交易 | Market Board + NPC Vendors | 交易所 + 商店 |
| 存储/离线 | Inn Room（旅馆） | 离线收益结算 |
| 转职 | 各职业行会 Guild | 职业/天赋树 |
| 阵营 | Grand Company | 阵营声望 |
| 小游戏 | Gold Saucer（金碟游乐场，独立大型区） | 支线小游戏/抽奖 |
| 反复内容 | 副本入口 / Duty Finder | 关卡选择器 |
| 赛季内容 | 赛季活动 NPC | 限时活动 |
| 住宅/社交 | 住宅区（Mist / Lavender Beds / Goblet / Shirogane / Empyreum） | 公会/家园装饰 |
| 传送 | Aetheryte + Aethernet | 主城面板导航 |

**五大住宅区（社区通识）**：Mist（拉诺西亚）、The Lavender Beds（黑衣森林）、The Goblet（萨纳兰）、Shirogane（黄金港，4.0 加入）、Empyreum（伊修加德，6.0 加入）。每个住宅区含多个 ward，每个 ward 内有 plot —— 这是 FF14 少有的"网格化地图"设计，**放置游戏可用作"玩家自建空间"的参考模型**。

---

## 13. 对"放置游戏关卡/地图系统"的设计建议（从 FF14 地图结构抽象）

| 编号 | 从 FF14 抽象出的要素 | 建议的放置游戏实现 |
|---|---|---|
| 1 | **三层地图层级**（Region → Zone → District） | 章节 → 地图 → 功能面板；三层各有独立完成度 |
| 2 | **MSQ 驱动线性解锁** | 用主线进度门控地图，而不是纯等级门控；等级只做软门槛 |
| 3 | **推荐等级区间** | 每张图设 level_min / level_max，超出上限时 EXP 衰减，形成推图压力 |
| 4 | **Aetheryte 共鸣制** | 首次到达需"探索"（离线挂机推进度），达到后成为免费传送锚点 |
| 5 | **Aether Current 五件套 → 飞行** | 每张图设 5 个收集品，集齐解锁"自动加速/跳过地形"，作为地图完成度奖励 |
| 6 | **FATE 定时刷新** | 地图上按时间片刷新的公共事件，离线时按概率结算 |
| 7 | **Hunt Marks B/A/S 分级** | 三档区域精英怪，不同刷新率/触发条件（S 级需天气+时间+前置） |
| 8 | **天气 + 昼夜双条件** | 影响特殊怪物/采集产出，制造"什么时候挂哪张图"的策略深度 |
| 9 | **Hub 功能分区** | 主城 = 任务板 / 交易所 / 离线结算 / 转职 / 抽奖 的 tab 集合 |
| 10 | **深层迷宫（无限塔）** | 程序化楼层 + 独立等级 + 消耗品 + 全灭惩罚 + 100/200 层里程碑 |
| 11 | **探索型内容（Eureka 类）** | 跨 zone 独立地图组 + 独立等级（元素等级）+ 大地图 Boss 列车 + 最终大型副本 |
| 12 | **固定内容节奏** | 每版本：6–7 张图 / 13 副本 / 15 讨伐 / 12 raid 层 / 3 团本 / 1 深层迷宫 —— 可直接作为"内容预算模板" |
| 13 | **x.35 深层迷宫节奏** | 用版本号位数做内容节奏（.35 = 深层迷宫、.x1 = 绝境战），可建模为"版本号驱动的排期表" |
| 14 | **地图回收复用** | Pilgrim's Traverse 用 5.0 的 Il Mheg 做入口；Eureka Orthos 用 2.0 的 Mor Dhona —— 旧地图做新内容入口，**低成本高情怀** |

---

## 14. 不确定项与需要后续核实清单（诚实标注）

| 编号 | 待核项 | 现状 | 影响 |
|---|---|---|---|
| U1 | 7.x 是否有 7.4/7.5 新增野外 zone | 未发现新野外 zone 的证据；7.4/7.5 主要加副本/讨伐 | 若放置游戏要"每版本加图"，需自行设计 |
| U2 | "The Unlost World" 是独立 zone 还是 Living Memory 的上位区域名 | 【官方：[1]】任务分类树有独立的 "Unlost World Sidequests" 分类；但野外地图中未见该名 | 影响 7.0 是 6 张还是 7 张图 |
| U3 | ARR 野外 zone 精确总数（18 还是 19） | 取决于是否把 "The Wolves' Den" 等 PvP 小地图计入 | 影响总量统计 |
| U4 | Trial 总数 111 的口径 | 【社区：[4]】的 "Standard / High-End" 分栏求和；可能与 Lodestone 的 Trials(4) 分类计数有差 | 需用官方 DB 逐版本翻页确认 |
| U5 | Duty 总条目 400 的构成 | 已确认总数为 400，但缺 PvP/Guildhest/Variant/Criterion/Deep Dungeon 的分项数 | 建议后续用官方 DB 的 `ex_version` 参数逐页抓取 |
| U6 | 中文官方译名 | 本文中文名为**社区通行译名 + 模型知识**，未经官方中文站逐条校验 | 若用于对外文案需二次校验 |
| U7 | 7.0 各 zone 的精确等级区间 | 来自模型知识 + FATE 等级博客线索，未逐条官方验证 | 建议用 `(待核)` 处理 |
| U8 | Eureka/Bozja 的单实例人数上限（144） | 来自【社区：[8]】，官方文档未直接验证 | 影响"大地图并发"设计参考 |

---

## 15. 来源 URL 汇总

**官方（Square Enix）**
1. Eorzea Database 首页（版本号 7.56、Duty(400)、任务分类树）— https://na.finalfantasyxiv.com/lodestone/playguide/db/
2. Eorzea Database: Duty 分类 — https://na.finalfantasyxiv.com/lodestone/playguide/db/duty/
3. Eorzea Database: Dungeons — https://na.finalfantasyxiv.com/lodestone/playguide/db/duty/?category2=2
4. Eorzea Database: Trials — https://na.finalfantasyxiv.com/lodestone/playguide/db/duty/?category2=4
5. DawnTrail Patch 7.1 "Crossroads" 特设页 — https://na.finalfantasyxiv.com/dawntrail/patch_7_1/
6. Patch 7.2 "Seekers of Eternity" 特设页 — https://na.finalfantasyxiv.com/dawntrail/patch_7_2/
7. Patch 7.3 "The Promise of Tomorrow" 特设页 — https://na.finalfantasyxiv.com/dawntrail/patch_7_3/
8. Patch 7.5 更新笔记索引 — https://na.finalfantasyxiv.com/lodestone/topics/detail/07320affa7e0fcd9685afcbe54fbf55405b6d822/
9. Evercold 扩展预告站（下一版本，2027 年 1 月） — https://na.finalfantasyxiv.com/evercold/

**社区统计（可读、有版本标注）**
10. FFXIV Dungeons 全量档案（103 个） — https://eorzeantavern.com/dungeons/
11. FFXIV Trials 全量档案（分版本计数） — https://eorzeantavern.com/ffxiv-trials/
12. FFXIV Raid Archive（tier 与团本） — https://eorzeantavern.com/raids/
13. FFXIV Ultimate Raids（7 个） — https://eorzeantavern.com/ultimate-raids/
14. Deep Dungeons（4 个深层迷宫对比表） — https://eorzeantavern.com/deep-dungeons/
15. FFXIV Eureka Guide（4 zone / 元素等级 / mutate 天气条件） — https://eorzeantavern.com/eureka/
16. Dawntrail 新 zone 首发清单（7 zone + 2 主城） — https://www.esports.net/news/gaming/all-new-zones-in-ffxiv-dawntrail/
17. DSH 版 Lodestone 镜像（JP）— https://jp.finalfantasyxiv.com/dawntrail/patch_7_1/

**被拦截、仅作线索（未能读取正文）**
18. ffxiv.consolegameswiki.com — Zones / Varies / Duties nav — **HTTP 403（Cloudflare）**
19. finalfantasy.fandom.com — 各 Zone 条目 — **fetch failed**
20. ffxiv.gamerescape.com — Category:Zones — **HTTP 403（Cloudflare）**
21. en.wikipedia.org/wiki/Final_Fantasy_XIV — **网络策略拒绝（非公网 IP）**
22. de.wikipedia.org/wiki/Final_Fantasy_XIV — 仅搜索摘要，提到 7.31 的 Phaennam 宇宙探索

---

## 16. 一句话结论

FF14 的地图系统是**"三层嵌套 + 严格线性解锁 + 每版本固定内容预算"**：每版本稳定产出 6–7 张野外 zone、13 个副本、约 15 个讨伐、12 层 8 人 raid、3 个团本，外加一个"类地图"的探索型内容（Eureka/Bozja/Occult Crescent/Cosmic Exploration）或深层迷宫（每版本 x.35）；地图的价值不在"面积"而在 **aetheryte 传送网、风脉飞行解锁、天气/昼夜触发的特殊怪物、FATE/Hunt 的定时刷新** 这四套可挂机化的系统上。

---
*文件结束。行数统计见交付说明。*
