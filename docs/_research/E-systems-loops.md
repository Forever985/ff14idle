# E. FFXIV 循环内容 / 加速系统 / 重置结构 研究汇总

> **文档定位**：为中文 FFXIV 参考文档提供事实密集的原始素材（research dump）。
> **数据截止**：2026-09-15（星期二）
> **当前线上版本**：Patch 7.56 已上线；8.0 已公布、未上线（2027 年 1 月）。
> **撰写原则**：区分【已上线】/【已公布未上线】；无法核实者标【未验证】。

---

## 0. 版本锚点与总览（务必先读）

### 0.1 Patch 时间线（Dawntrail / 7.x）

| Patch | 名称 | 上线日期 | 主要内容 |
|---|---|---|---|
| 7.0 | Dawntrail | 2024-07-02 | 等级上限 100，新职业 Pictomancer / Viper，新大陆 Tuliyollal |
| 7.1 | Crossroads | 2024-11-12 | 24 人 Alliance Raid「Echoes of Vana'diel」第一弹 |
| 7.2 | Seekers of Eternity | 2025-03-25 | Arcadion 第二梯队，Savage |
| 7.21 | — | 2025-04-22 | **Cosmic Exploration 上线**（Sinus Ardorum） |
| 7.25 | — | 2025-05-27 | **Occult Crescent（南 Horn）上线**，Phantom Jobs / Phantom Weapons 公布 |
| 7.3 | — | 2025-08-05 | 主线续篇 |
| 7.35 | — | 2025-10-14（PDT）/ 10-15（JST） | **新深层迷宫 Pilgrim's Traverse**、Monster Hunter Wilds 联动试炼、Yok Huy 友好部族 |
| 7.4 | Into the Mist | 2025-12-16 | Arcadion 第三梯队 AAC Heavyweight (Savage)、Cosmic Exploration 新目的地 Oizys、Occult Crescent 新 Phantom Job、新 Frontline 地图 Worqor Chirteh |
| 7.5 | **Trail to the Heavens** | **2026-04-28** | 新迷宫 The Clyteum、新试炼 The Unmaking、Windurst: The Third Walk（Alliance Raid 第三弹）、新 Crystalline Conflict 竞技场 Archeia Harmonias、**免费体验版扩展至 Shadowbringers** |
| 7.51 | — | 2026 年（7.5 后约 4 周） | **Dancing Mad (Ultimate)**、Cosmic Exploration 目的地 **Auxesia**、Tool Enhancement「Cosmic Tools」、新 Custom Deliveries 客户 Tiisol Ja |
| 7.55 | — | 2026 年（7.51 后约 4 周） | **Occult Crescent: North Horn**、Phantom Weapons 强化任务、Forked Tower: Magic、Hildibrand 支线、友好部族收束支线 |
| 7.56 | — | 2026 年（7.55 后） | **Beastmaster（驯兽师，第二限界职业）**、**Crucible of the Unbroken**、4 条主线任务、**AAC Heavyweight (Savage) 限制解除**、PvP Series 12 |
| 7.58 | — | 未上线（第 7.56 赛季结束点） | 【未验证】具体内容 |
| 8.0 | — | **2027 年 1 月（已公布未上线）** | 第四世界；新防护职业「坚城卫」；FF7 Remake 联动大型任务「彼岸的星命」 |

> 来源：[Patch 7.35 Notes（Lodestone）](https://de.finalfantasyxiv.com/lodestone/topics/detail/9d2cad7a1028016719060b5ae3caeb5e369c89e9)、[Patch 7.21 Notes](https://de.finalfantasyxiv.com/lodestone/topics/detail/6f824223a7e10da7b9b7dfc84f626d10d4df88b3)、[Patch 7.5 Notes](https://fr.finalfantasyxiv.com/lodestone/topics/detail/07320affa7e0fcd9685afcbe54fbf55405b6d822)、[Patch 7.4 Special Site 更新](https://jp.finalfantasyxiv.com/lodestone/topics/detail/f893856d81e4d23f9085588a637dea99528da479)、[Eorzean Tavern Patch Notes](https://eorzeantavern.com/patch-notes/)

### 0.2 8.0 已公布信息（已公布未上线，2027-01）

| 项目 | 内容 |
|---|---|
| 上线时间 | 2027 年 1 月 |
| 舞台 | **第四世界**（「冰之世界」）；新地图「水之大陆 船纳格尔法」「火之大陆 船赫灵霍尔尼」（17173 音译，具体 EN/JP 名【未验证】） |
| 新职业 | 「**坚城卫**」（中文官方名，17173 引用官方）；防护（Tank）；武器「魔装盾」；发源北洋；攻守一体，为队友附加防御增益与治疗 |
| FF7 联动 | 《FINAL FANTASY VII Remake》系列联动大型任务「**彼岸的星命**」，带全新难度分级；EN 官方站点关键词 **Evercold**（`/evercold/`）；野村哲也、野岛一成参与监修 |
| 系统改动 | 以「角色为中心」的设计；任务目的地标示 + 自动移动（可选辅助）；捏脸系统大幅更新；**陆行鸟搭档系统重做**（可并肩战斗） |
| 其他 | 新装备与制作配方；Fanfest 2026 第二站公布 |

> 来源：[17173《最终幻想14》8.0粉丝节第二站前瞻爆料（2026-07-28）](https://news.17173.com/content/07282026/110058629.shtml)、[17173《最终幻想14》8.0版本加长先导预告 新职业"坚城卫"（2026-07-26）](https://news.17173.com/content/07262026/095035605.shtml)、[4Gamers：FF14 將推出 FF7 重製版 8 人團隊副本](https://www.4gamers.com.tw/news/detail/80889/ff14-evercold-ff7-remake-crossover-raid)
> **注意**：「坚城卫」为中文媒体转述的官方中文名；英文/日文职业名【未验证】。

### 0.3 免费体验版（Free Trial）现状【重要变化】

- **自 2026-04-28（Patch 7.5）起，免费体验版内容扩展至《Shadowbringers》。**
- 即免费体验版覆盖 **A Realm Reborn + Heavensward + Stormblood + Shadowbringers**（等级上限 80）。
- 此前拥有 ARR 的既有账号同样适用（服务账号自 4 月 28 日起更新，Mog Station 显示可能滞后）。

> 来源：[Free trial now to include FINAL FANTASY XIV: Shadowbringers!（Lodestone 官方）](https://de.finalfantasyxiv.com/lodestone/topics/detail/baec87b06b6bbfa62e2dd3f7bac8fe6bac1ab460)
> 【未验证】免费体验版等级上限是否为 80、以及 4.0/5.0 以外限制（如 PvP、Market Board、组队限制）在 7.5 后是否有变动。

---

## 1. 当前通货：亚拉戈诗学神典石体系（7.5–7.56）

**这是理解所有 roulette 奖励的前提，必须先明确。**

| 神典石（EN / JP） | 中文 | 获取范围 | 周限 | 持有上限 |
|---|---|---|---|---|
| Allagan Tomestones of **Poetics** / アラガントームストーン:詩学 | 诗学 | **等级 90 及以下**的试炼与副本，**以及 Duty Roulette** | 无 | 2,000 |
| Allagan Tomestones of **Mathematics** / アラガントームストーン:数理 | 数理 | 等级 100 内容；**无周限** | 无（7.4 起取消） | 2,000 |
| Allagan Tomestones of **Mnemonics** / アラガントームストーン:記憶 | 记忆 | 等级 100 内容（需至少一个职业达 100 级） | **7.56 起 900**（7.4–7.55 为 450） | 2,000（存储上限）【存疑见下】 |

### 变动沿革（关键）

| 时间 | 变动 |
|---|---|
| 7.4 之前 | aesthetics（美学）为当版最高级；heliometry（测地）为周限货币 |
| **7.4** | 新增 **Mnemonics**；**Mathematics 周限取消**；**Heliometry 停止产出**（可用 Auriana 兑换为 Mathematics）；**Aesthetics 直接删除**；Mnemonics 持有上限 **2,000 → 4,000**；Poetics 改为「90 级以下内容 + Duty Roulette」产出 |
| **7.56** | **Mnemonics 周限 450 → 900**，存储上限不变 |

> **⚠️ 数据冲突（必须标注）**：
> - 官方 Lodestone「Upcoming Changes to Allagan Tomestones」只写明 Mathematics 上限 2,000，未提 Mnemonics 上限。
> - 第三方 [BestGameBoost（2025-12-26）](https://bestgameboost.com/news/ffxiv-latest-patch-tomestone-changes-overview/) 称 7.4 将 Mnemonics 持有上限由 2,000 提升至 **4,000**。
> - 第三方 [Eorzean Tavern Patch 7.56](https://eorzeantavern.com/ffxiv-patch-7-56/) 称 7.56 周限由 450 翻倍至 900，但「**最大存储上限仍为 2,000**」。
> - **结论：7.4 的 4,000 上限说法与 7.56 的 2,000 上限说法互相矛盾，标注为【未验证】，需以游戏内 Currency 窗口为准。**
>
> 来源：[Upcoming Changes to Allagan Tomestones（Lodestone 官方）](https://de.finalfantasyxiv.com/lodestone/topics/detail/6f0c4806e726ad60dd76ae8bd5994412bd6a4cea)、[Exchanging Tomestones（官方 UI Guide）](https://na.finalfantasyxiv.com/uiguide/currency/currency-ats/ats_exchange.html)

### 交换 NPC（等级 100）

| NPC | 位置 | 通货 |
|---|---|---|
| **Zircon** | Solution Nine (X:8.6 Y:13.5) | Mathematics + Mnemonics |
| Auriana | Mor Dhona (X:22.7 Y:6.6) | Poetics（50 级装备）、旧通货兑换 |
| Hismena | Idyllshire (X:5.7 Y:5.2) | Poetics（60 级） |
| Enna | Rhalgr's Reach (X:13.9 Y:11.6) | Poetics（70 级） |
| Aymark | Eulmore (X:10.2 Y:11.8) | Poetics（80 级） |
| Cihanti | Radz-at-Han (X:10.8 Y:10.4) | Poetics（90 级） |

---

## 2. 重置结构（Reset Schedule）

### 2.1 核心时间点（**已双源确认**）

| 项目 | UTC | JST (UTC+9) | 北京时间 CST (UTC+8) | PT（夏令时 PDT, UTC-7） | PT（冬令时 PST, UTC-8） |
|---|---|---|---|---|---|
| **每日重置** | 15:00 | **次日 00:00** | **23:00（当日）** | **08:00（当日）** | 07:00（当日） |
| **每周重置（周二）** | **周二 08:00** | **周二 17:00** | **周二 16:00** | **周二 01:00** | 周二 00:00 |

**关键结论（易错点）**：
- 每日重置：UTC 15:00 = JST 次日 00:00 = **北京时间当日 23:00** = PT 当日 08:00（PDT）。
- 每周重置：**UTC 周二 08:00** = JST 周二 17:00 = **北京时间周二 16:00** = PT 周二 01:00（PDT）。
- **每日重置与每周重置不是同一时刻**：每日在 UTC 15:00，每周在 UTC 周二 08:00（比每日重置早 7 小时）。
- PT 时区随夏令时切换（3 月/11 月），JST / CST 不随夏令时变化。

> 来源：[Eorzean Tavern（全站页脚"Reset Timers: Daily at 15:00 UTC · Weekly Tuesday at 08:00 UTC"）](https://eorzeantavern.com/challenge-log/)、[Eorzean Tavern Challenge Log](https://eorzeantavern.com/challenge-log/)（明确 "Resets Tuesday at 08:00 UTC"）

### 2.2 每日重置（UTC 15:00）刷新的内容

| 内容 | 说明 |
|---|---|
| Duty Roulette 各类别每日奖励 | **每个类别每日一次**（不是每个职业） |
| 每日狩猎 B 级怪（B Rank） | 每张地图的 B 级精英怪 |
| 军队（Grand Company）补给 / 筹集任务 | Supply & Provisioning |
| 友好部族（Allied Society）每日任务 | **每个部族每日最多 3 个**（7.35 官方补丁说明确认） |
| リーヴ / Leves 受注权恢复 | 每日恢复 |
| Doman Enclave 捐赠 | |
| Cosmic Exploration「Daily Successes」 | 每日成功目标刷新 |
| 迷你仙人掌彩票（Mini Cactpot） | 每日 3 张 |
| 亲信/小队等日常 | |

### 2.3 每周重置（UTC 周二 08:00）刷新的内容

| 内容 | 说明 |
|---|---|
| **AAC Heavyweight (Savage)** 战利品锁定 | **7.56 起已解除**（宝箱必定出现、周限制取消、入场周限制取消） |
| Mnemonics 周获取上限 | 7.56 起 900/周 |
| Alliance Raid 周奖励 | 每周一次 |
| Normal Raid 代币 | 每周一次 |
| **Wondrous Tails（天書奇譚）** | 每周一次，9 贴纸 |
| **Fashion Report** | 每周一次（主题周二更新，评审周五开放） |
| **Jumbo Cactpot** | 每周最多 3 张，**周六开奖** |
| **Challenge Log（チャレンジログ）** | **周二 08:00 UTC 重置**（与主重置同一时刻） |
| Unreal / Faux Hollows 奖励 | 每周一次 |
| Custom Deliveries 奖励加成 | 每周 |
| 幻境龙骑士（Squadron）任务 | 每周 |
| Masked Carnivale | 每周 |
| PvP Series 进度 | 持续累计（非周重置），Series 按赛季结束 |
| 陆行鸟竞赛（Chocobo Racing）挑战 | 每周 Challenge Log 条目 |
| 军队 / FC 排行榜（Lodestone Rankings） | 每周更新 |

### 2.4 Savage / Ultimate 特定重置

**Patch 7.5 的每周进度（Weekly Progression）细节**

| 项目 | 内容 |
|---|---|
| Arcadion: Heavyweight 周限制 | **除 Heavy Holoblade 外全部解除** |
| **Universal Tomestone** 兑换所需 | 由 **7 个 Heavy Holoblade** 下调至 **4 个** |
| **Ranperre Coins** | 来自 Windurst: The Third Walk（24 人，**每周**奖励装备与 Ranperre Coins） |
| Ranperre Coins / Sack of Nuts 用途 | 可换取**神典石装备强化素材** |
| IL 770 制作装备 | 可在 Solution Nine 向 **Eirene** 交换为 **IL 780** 强化版 |
| 7.5 分解（desynthesis）上限 | 提升至 **780** |
| 7.5 新 Ocean Fishing 航路 | **追加 Endwalker 航路** |

| 项目 | 规则 |
|---|---|
| **AAC Heavyweight (Savage)**（7.4 上线，7.5 部分解除，7.56 完全解除） | 7.5：宝箱限制部分解除；**7.56：宝箱必定出现且不因已有通关而减量；周奖励限制取消；入场周限制取消；Echo 常驻 +12%**（HP/伤害/治疗），且**灭团后不增强**（固定值，因 7.4→Savage 间隔较长） |
| 更早的 Savage 梯队 | 随版本推进陆续解除；7.2 的 AAC Light-heavyweight (Savage) 在 **7.21 起获得 Echo +10%**（开场生效，灭团不增强） |
| **Ultimate（绝）** | 无周锁定，但**无装备掉落**（仅武器/称号）；7.51 上线 **Dancing Mad (Ultimate)** |

> 来源：[Patch 7.56 汇总](https://eorzeantavern.com/ffxiv-patch-7-56/)、[Patch 7.21 Notes（官方，含 Light-heavyweight Echo +10%）](https://de.finalfantasyxiv.com/lodestone/topics/detail/6f824223a7e10da7b9b7dfc84f626d10d4df88b3)、[Patch 7.5 Notes（官方，含 Heavyweight 周限制解除）](https://fr.finalfantasyxiv.com/lodestone/topics/detail/07320affa7e0fcd9685afcbe54fbf55405b6d822)

### 2.5 月度 / 赛季 / 长周期计时器

| 内容 | 周期 | 详情 |
|---|---|---|
| **PvP Series（シリーズ）** | 每赛季约 3–4 个月，跨大版本 | **7.5（2026-04-28）起为 Series 11**；**7.56 起 Series 11 结束、Series 12 开始**，持续至 **8.0 上线**。Series 11 奖励可在 Series 12 结束前领取（Series Malmstones 的 Previous Series 选项）。Series EXP 来自任意 PvP 内容，提升 Series 等级解锁奖励 |
| **Crystalline Conflict 赛季** | 与大版本/Patch 同步 | **7.5 起为 Season 20**，新竞技场 **Archeia Harmonias**；7.35 时 Season 16 结束、**Season 17** 开始（此为旧记录，已被 7.5 的 Season 20 覆盖）。NA/EU/JP 前 300 名、OCE 前 100 名获凭证；Bronze 以上可领取奖励；新赛季起始等级为上一赛季结束等级 -5 risers，Rising Stars 重置为 1；Omega/Ultima 段位者新赛季从 Crystal 段 100 Crystal Credits 开始 |
| **Wondrous Tails（天書奇譚 / Khloe Aliapoh）** | 每周 | 9 张贴纸（3×3）；Second Chance 点数由指定副本产出；**7.5 调整了 Khloe's Gold/Silver Certificate of Commendation 的奖品**；7.5 新增可计入副本：Worqor Lar Dor (Extreme)、Everkeep (Extreme)、The Minstrel's Ballad: Sphene's Burden、Recollection (Extreme)、The Minstrel's Ballad: Necron's Embrace、Hell on Rails (Extreme)、The Windward Wilds (Extreme)、The Minstrel's Ballad: Shinryu's Domain |
| **Fashion Report** | 每周 | 主题**周二**更新；**评审周五开放**；参与 10,000 MGP；**评分 ≥80 加 50,000 MGP**；每周最多 4 次评审；100 分不给更多 MGP，但解锁 Fashion Leader 称号；累计 600 分解锁 Kasumi 商店全库存 |
| **Jumbo Cactpot** | 每周 | 每周最多 3 张（100 / 150 / 200 MGP）；**周六开奖**；从右到左逐位比对；**1 小时内领取有 Early Bird Bonus**，一周内领取否则作废 |
| **Mini Cactpot** | 每日 | 每角色每日 3 张（10 MGP/张）；和值 6 → 10,000 MGP；24 → 3,600；23 → 1,800；21 → 1,080 |
| **Ocean Fishing（オーシャンフィッシング）** | **每 2 小时实时** | 出航窗口每 2 小时一个；具体航路/时间表见 §7.4【部分未验证】 |
| **Ishgard Restoration（イシュガルド復興）** | 已结束 | 5.x 内容，现为常驻但不再更新阶段 |
| **Cosmic Exploration（宇宙探索）** | 7.21 起常驻，随版本加新目的地 | 初始 Sinus Ardorum（Source 之月）；7.4 新目的地 **Oizys**；7.51 新目的地 **Auxesia**【未验证 Oizys 与 Auxesia 的先后——7.4 Special Site 明确提 Oizys，7.51 汇总提 Auxesia】 |
| **Occult Crescent** | 7.25 起常驻 | Knowledge 等级上限：South Horn 20 → North Horn **40** |
| **Island Sanctuary（岛屿开拓）** | 6.2 起常驻 | 7.x 后无新阶段更新【未验证最终状态】 |
| **季节活动（Seasonal Events）** | 不定期，约每 2–3 个月 | 2026 年 9 月当前有：**Youkai Watch 联动**（`/lodestone/special/2026/youkai-watch/`）、**Tales Under the Golden Sun**、**Moogle Treasure Trove #20（モグコレクション）** |
| **Moogle Treasure Trove（モグコレクション）** | 不定期 | 2026 年 9 月为第 20 回（`/lodestone/special/mogmog-collection/202609/`）；用**神典石 of Aphorism**交换奖励【未验证 Aphorism 的准确性质，可能与 Mnemonics 相关或为活动专用】 |
| **Cosmic Exploration 排行榜周期** | 24 小时 | 每日 **PDT 02:00** 重置（此为 Cosmic 内部排行榜，与每日重置 UTC 15:00 不同）；Star Contributor 表彰 14 天 |
| **Forked Tower: Magic 时间限制** | 7.56 改动 | 入场或击杀 Boss 获得的延长，**离场时扣除**（此前会保留）；扣除后低于 5 分钟则设为 5 分钟 |

> 来源：[Gold Saucer Guide（Eorzean Tavern，2026-08-21，Current for Patch 7.56）](https://eorzeantavern.com/gold-saucer/)、[Patch 7.35 Notes（官方）](https://de.finalfantasyxiv.com/lodestone/topics/detail/9d2cad7a1028016719060b5ae3caeb5e369c89e9)、[Patch 7.21 Notes（官方，含 Cosmic 排行榜 PDT 02:00）](https://de.finalfantasyxiv.com/lodestone/topics/detail/6f824223a7e10da7b9b7dfc84f626d10d4df88b3)、[Patch 7.56 汇总](https://eorzeantavern.com/ffxiv-patch-7-56/)、[Patch 7.5 Notes（官方）](https://fr.finalfantasyxiv.com/lodestone/topics/detail/07320affa7e0fcd9685afcbe54fbf55405b6d822)

---

## 3. Duty Roulette（随机任务 / コンテンツルーレット）

### 3.1 官方机制说明（来自官方 Game Manual）

- Duty Roulette 会从**你已解锁的**副本中随机分配一个。
- **强化奖励（enhanced rewards）每个类别每日只能领取一次。**
- 部分类别有**平均品级要求**。

### 3.2 官方确认的类别（Patch 7.x，官方 Game Manual 原文）

| 类别（EN） | 日文 | 中文 | 范围 | 解锁/条件 |
|---|---|---|---|---|
| **Duty Roulette: Expert** | エキスパートルーレット | 专家随机任务 | 从已解锁的"专家级"副本中随机 | 需满足**平均品级要求** |
| **Duty Roulette: Level Cap Dungeons** | レベルキャップダンジョン | 等级上限迷宫 | **等级 100 迷宫**随机 | 需满足平均品级要求 |
| **Duty Roulette: High-level Dungeons** | 高レベルダンジョン | 高等级迷宫 | **等级 50/60/70/80/90 迷宫**随机 | 需满足平均品级要求 |

> **重要更正**：任务书假设存在「Level 90 Dungeons」与「Level 100 Dungeons」两个独立 roulette。
> 据**官方 Game Manual（2026-09 更新版）**，实际为：
> - **Level Cap Dungeons = 仅 100 级**
> - **High-level Dungeons = 50/60/70/80/90 合并**
> 因此「Level 90 Dungeons」作为独立 roulette **已不存在**（其内容并入 High-level）。
> 来源：[Official Game Manual — Party Play / Duty Roulette](https://na.finalfantasyxiv.com/game_manual/pp/#entry-cf_roulette)

**其余类别（Leveling / Trials / Main Scenario / Alliance Raids / Normal Raids / Frontline / Guildhests / Mentor / PvP）**：官方 Game Manual 该页在列出前 3 项后截断（HTML 内容被截断，未能取得完整表格）。以下为**基于既有知识的待补条目，标注【未验证】**：

| 类别（EN） | 日文 | 中文 | 解锁条件 | 备注 |
|---|---|---|---|---|
| Leveling | レベル上げルーレット | 练级随机任务 | 完成 15 级主线后解锁 | 主要 EXP 来源，随等级递减 |
| Trials | 討伐戦ルーレット | 讨伐战 | 解锁若干试炼后 | 有每日奖励 |
| Main Scenario | メインクエストルーレット | 主线随机任务 | 完成 50 级主线「究极幻想」后 | 仅含 8 人主线副本 |
| Alliance Raids | アライアンスレイドルーレット | 24 人副本 | 解锁第一个 Alliance Raid 后 | 每周首次有额外奖励 |
| Normal Raids | ノーマルレイドルーレット | 普通 8 人副本 | 解锁第一个 Normal Raid 后 | |
| Frontline | フロントラインルーレット | 前线 | 完成 PvP 解锁任务后 | 每日一次；**7.4 新增地图 Worqor Chirteh** |
| Guildhests | ギルドオーダールーレット | 公会任务 | 10 级解锁公会任务后 | 首次完成每个公会任务有额外奖励 |
| Mentor | メンタールーレット | 导师 | 取得导师资格（战斗/生产采集/综合导师） | 仅导师可用 |
| PvP（Rival Wings 等） | — | — | 【未验证是否仍为独立 roulette】 | |

**7.56 变更**：**Windurst: The Third Walk** 加入 **Duty Roulette: Alliance Raids** 轮换。
> 来源：[Patch 7.56 汇总](https://eorzeantavern.com/ffxiv-patch-7-56/)

### 3.3 7.5 对副本队列的改动

- 若干部委的条件由「Any Disciple of War or Magic」改为「Any Disciple of War or Magic（**excluding limited jobs**）」。
- **限界职业（Blue Mage / Beastmaster）无法进行 Duty Roulette**（7.56 明确列出）。
- 7.5 起，接受使用 **Quest Sync** 的友好部族任务后，即使切换职业也无法推进，需放弃并重新接受。

> 来源：[Patch 7.5 Notes（官方）](https://fr.finalfantasyxiv.com/lodestone/topics/detail/07320affa7e0fcd9685afcbe54fbf55405b6d822)、[Patch 7.56 汇总](https://eorzeantavern.com/ffxiv-patch-7-56/)

### 3.4 Duty Finder 惩罚机制（官方）

- 处罚条件：
  1. 一天内**退出 3 次**（点退出按钮或让计时器跑完）；
  2. 在**其他队员全部在场**的情况下放弃未完成的副本。
- 可同时登记**最多 5 个**副本。
- Duty Finder 在解锁公会任务或 Sastasha Seagrot 后可用。

> 来源：[Official Game Manual — Party Play](https://na.finalfantasyxiv.com/game_manual/pp/)

---

## 4. 深层迷宫（Deep Dungeon）——完整数值

官方深层迷宫导览页明确区分 **4 座**，Lodestone 排行榜亦为 4 项（`/ranking/deepdungeon/` 至 `/deepdungeon4/`）。

### 4.1 四座深层迷宫总览（官方数据）

| 项目 | **死者の宮殿**<br>The Palace of the Dead | **アメノミハシラ**<br>Heaven-on-High | **オルト・エウレカ**<br>Eureka Orthos | **ピルグリム・トラバース**<br>**Pilgrim's Traverse** |
|---|---|---|---|---|
| 中文通称 | 死者宫殿 / 死者之宫 | 天之座 / 天之高楼 | 欧尔特·尤雷卡 | 【未验证中文官方名】朝圣者之径 |
| **楼层（stone/floor）** | **1–200** | **1–100** | **1–100** | 以「traverse stone」计，**1–100** |
| 起始等级 | **Lv 1** | **Lv 61** | **Lv 81** | **Lv 91** |
| 迷宫内最高等级 | **Lv 60** | **Lv 70** | **Lv 90** | **Lv 100** |
| Aetherpool 上限 | **+99** | **+99** | **+99** | **+99**（illumed aetherpool） |
| 存档槽 | 【未验证，通常为 2】 | **2** | **2** | **2** |
| 存档间隔 | **每 10 层 Boss** | **每 10 层 Boss** | **每 10 层 Boss** | **每 10 traverse stone Boss** |
| 中途起始点 | **1 或 51**（需通关 50 层 + 支线 "What Lies Beneath"） | **1 或 21**（需通关 30 层 + "On the Shoulders of Giants"） | **1 或 21**（需通关 30 层 + "Rage Extinguished"） | **1 / 21 / 31 / 51 / 71**（需通关 30 stone + "Faerie Tale"） |
| 中途起始设定 | 从 51 层起：**Lv 60**，pomander 清空 | 从 21 层起：**Lv 70**，pomander 清空 | 从 21 层起：**Lv 90**，protomander + demiclone 清空 | 从 21 stone 起：**Lv 100**，pomander + juniper incense 清空 |
| 匹配队伍限制 | **101 层以上不可匹配**，且存档必须无 KO 记录 | **31 层以上不可匹配** | **31 层以上不可匹配** | **91 stone 以上不可补充队员** |
| 灭团后果 | **101 层以上灭团 → 存档失效**（放弃副本亦计为灭团） | **31 层以上灭团 → 存档失效** | **31 层以上灭团 → 存档失效** | **31 stone 以上灭团 → 存档失效** |
| 特殊道具 | Pomander | Pomander / **Magicite（召唤蛮神）** | **Protomander** / **Demiclone（复制体）** | **Pomander** / **Juniper Incense（召唤妖精王）** |
| 专属货币 | Gelmorran Potsherd | Empyrean Potsherd | Orthos Aetherpool Fragment | **Fragment of Illumed Aetherpool Glass** |
| 交付 NPC | E-Una-Kotor（South Shroud, Quarrymill X:25.0 Y:20.6） | Confederate Custodian（The Ruby Sea, Crick X:21.2 Y:9.3） | Synthesis Node（Mor Dhona X:34.9 Y:19.0） | Ose Wyd（Il Mheg X:29.9 Y:5.9） |
| 遗物鉴定 NPC | Expedition Bishop（X:25.1 Y:20.6） | Confederate Appraiser（X:21.3 Y:9.2） | Valeroine（X:34.9 Y:19.1） | Tyr Marn（X:29.9 Y:5.9） |
| 入口 NPC | Wood Wailer Expeditionary Captain（Quarrymill X:25.2 Y:20.6） | Kyusei（Crick X:21.4 Y:9.2） | Khatun（Mor Dhona X:34.8 Y:19.2） | **Vanthau**（Il Mheg X:29.9 Y:6.0） |
| 解锁任务 | **The House That Death Built**（Lv 17，New Gridania X:12.0 Y:13.1，Nojiro Marujiro；需完成 MSQ "Into a Copper Hell"） | **Knocking on Heaven's Door**（Lv 61，The Ruby Sea X:6.2 Y:11.7，Hamakaze；需完成 "Tide Goes in, Imperials Go Out" + PoTD 50 层） | **Delve into Myth**（Lv 81，Mor Dhona X:21.8 Y:8.1，Koh Rabntah；需完成 Endwalker + PoTD 50 层） | **Pilgrimage of Light**（Lv 91，The Crystarium X:10.3 Y:10.7，Bright-eyed Child；需完成 Endwalker + **PoTD 50 层**） |
| 实装 | 3.x（Patch 3.35）【未验证确切 patch】 | 4.x（Patch 4.35）【未验证】 | 6.x（Patch 6.35）【未验证】 | **7.35（2025-10-14 PDT）** |

### 4.2 各迷宫楼层 / 存档机制细节

**Palace of the Dead（死者の宮殿）**
- 楼层 **1–200**；1–50 为主线故事关联段；**100 层以上为纯挑战**，不可匹配、且存档必须无 KO 记录。
- 通关 50 层后开放「What Lies Beneath」任务，之后可新建存档从 **51 层**开始。
- 通关 100 层可用追加的 aetherpool grip 进一步强化已取得的 aetherpool 武器。
- aetherpool 武器取得：arm 与 armor 均 **+10** 且通关 50 层 → 向 E-Una-Kotor 领取 aetherpool grip（**消耗 arm/armor 各 -10 强度**）换取任意武器。
- **特殊机制**：PoTD 的银色宝箱**只**强化 aetherpool（不含其他）；部分 pomander 可**变身成敌人 NPC**，持续 1 分钟并获得不同攻击。
- **分数**：100 层以上挑战时计分（最高层数、击杀数等），单人与组队分开记录。

**Heaven-on-High（アメノミハシラ）**
- 楼层 **1–100**；1–30 为故事，**31 层以上不可匹配**。
- **Hall of Fallacies（虚偽の広間）**：部分楼层为单一巨大房间，有多个 Beacon of Passage 但只有一个是真；误触假 beacon 会触发陷阱并消失。
- 有**友好 NPC** 提供增益。
- **Magicite**：银色宝箱小概率产出，可召唤蛮神对当前层全体敌人造成伤害；最多持有 3 个，共享背包。

**Eureka Orthos（オルト・エウレカ）**
- 楼层 **1–100**；1–30 为故事，**31 层以上不可匹配**；31 层以上需从 1 或 21 层固定队开始并通关 30 层。
- **Dread Beasts（恐怖獣）**：特定楼层出现的强力怪物，击败后**暂时获得其力量**。
- **Demiclone**：银色宝箱小概率产出「tomestone」用于生成复制体，复制体跟随并协助战斗；最多持有 3 个。
- 通关 100 层可用追加 grip 强化已取得的 Orthos 武器。

**Pilgrim's Traverse（ピルグリム・トラバース）**——**7.35 新增【已上线】**
- 起始 **Lv 91**，迷宫内可升至 **Lv 100**。
- 区域以 **traverse stone（巡礼石）** 编号标记；**每 10 stone 一个 Boss**，击败后可记录进度。
- **Pylon of Passage 三阶段激活**；**Altar of Return**（复活全体）同样三阶段。
- 新增 **Votive Candelabra（奉献烛台）**：点亮后影响**下一个 traverse stone** 区域，可能为增益（持续回复、敌人弱化）或增难（陷阱增多）。
- **Juniper Incense（杜松香）**：银色宝箱小概率产出；燃烧可召唤**妖精王（faerie king）**协助（范围高伤害 / 治疗等）。
- **匹配队伍的 aetherpool 强度门槛**（官方表格）：

| 区域 | 所需强度 |
|---|---|
| Stone 11 | 1 |
| Stone 21 | 3 |
| Stone 26 → **Stone 31** | 26 |
| Stone 41 | 43 |
| Stone 51 | 60 |
| Stone 61 | 81 |
| Stone 71 及以后 | 94 |

- **固定队不受 aetherpool 强度门槛限制。**
- **奖励（每 10 traverse stone）**（7.35 官方表格，**神典石名称在 7.4 后应已改写，见下方警告**）：

  - 入场时职业 **Lv 100**：
    | 通过区域 | 奖励 |
    |---|---|
    | Stone 10 | 10 Poetics + 20 Heliometry + 5 Mathematics + 1,000 gil |
    | Stone 20 | 20 Poetics + 40 Heliometry + 10 Mathematics + 1,500 gil |
    | Stone 30 及以后 | 30 Poetics + 60 Heliometry + 15 Mathematics + 2,000 gil |
  - 入场时职业 **Lv 91–99**：Poetics + **经验值**（**Armoury Bonus 适用**）+ gil（1,000 / 1,500 / 2,000）
  - 到达 stone 30 / 50 / 70：**Fragment of Illumed Aetherpool Glass**
  - 通关 stone 100 且 aetherpool ≥ **+60**：可进一步用 grip 强化已取得的 Pilgrim's Traverse 武器
  > **⚠️ 警告**：上述奖励表原文使用 **heliometry**，但 heliometry 于 **7.4 停止产出**。该表为 7.35 原始文本，7.4 后实际应为 **Mnemonics**。此表**不可直接引用为 7.5/7.56 的当前数值**，标注【未验证（版本已过时）】。

- **Challenge Log 奖励**：phial of luminous oil / piece of the Blessed Hoard。
  - Luminous Oil → 向 Ose Wyd 交换特殊物品。
  - Piece of the Blessed Hoard → 向 Tyr Marn 鉴定，可得 **First Light relics** 等。
- **中途起始**：Stone 1 / 21 / 31 / 51 / 71（需通关 30 stone + "Faerie Tale"）。
- **额外副本**（官方）：
  - **The Final Verse**：到达 stone 99 后可挑战；为 stone 99 Boss「**Eminent Grief**」的模拟战；匹配队需 aetherpool **+94** 以上；Lv 91 可进但进入时调整为 Lv 100；**通关后不再需要保留至 stone 99 的存档**。
  - **The Final Verse (Quantum)**：通关 stone 100 并完成后续支线后解锁；**Lv 100、4 人、90 分钟**；需消耗 **sacramental offerings（聖餐の供物）**，共 5 种（spirits / spices / grain / light / lilies），初次完成支线得各 8 个（共 40）；最少 **15**、最多 **40** 个。供物种类与数量影响 Boss 行为与难度。**箱子等级**：15–24 → Bronze；25–39 → Silver；**40 → Gold**。只有选择供物的玩家能开箱，且该玩家获得更多奖励。
  - **Party Composition Bonus**：队伍中「依赖全体增益技能的职业」越多，伤害加成越高（按角色有别；仅对 job 有效，对 class 无效）。
  - **7.5 对 Deep Dungeon 的规格改动**【未验证具体内容】。

- **排行榜（Lodestone）**：`/lodestone/ranking/deepdungeon4/`；仅限**原生世界（Home World）**的记录；每日更新。

> 来源（均为官方 Lodestone）：[The Palace of the Dead](https://na.finalfantasyxiv.com/lodestone/playguide/contentsguide/deepdungeon/)、[Heaven-on-High](https://na.finalfantasyxiv.com/lodestone/playguide/contentsguide/deepdungeon2/)、[Eureka Orthos](https://na.finalfantasyxiv.com/lodestone/playguide/contentsguide/deepdungeon3/)、[Pilgrim's Traverse](https://na.finalfantasyxiv.com/lodestone/playguide/contentsguide/deepdungeon4/)、[Patch 7.35 Notes](https://de.finalfantasyxiv.com/lodestone/topics/detail/9d2cad7a1028016719060b5ae3caeb5e369c89e9)

### 4.3 深层迷宫的 EXP 规则（重要）

- 敌人给予**固定 EXP**，与队伍人数、与敌人等级差**无关**。
- **休息经验（Rested EXP）与所有 EXP 加成一律无效**（官方原文："Rested experience and experience bonuses will also be ignored"）。
- 迷宫内等级与外部等级**无关**。
- 未完成职业任务也能使用对应等级的技能。
- 以 **class**（非 job）进入者**不能使用 job 技能**。
- **例外**：深层迷宫结算奖励中的 EXP **适用 Armoury Bonus**（PoTD 50–99 级、HoH 61–99 级、Orthos 81–99 级、Pilgrim's 91–99 级）。
- PoTD 另有：未满 90 级且队中有导师 + 新冒险者时，**导师/新冒险者 EXP 加成适用**。

---

## 5. Duty Support / Trust（亲信系统）

### 5.1 三系统区分（关键概念纠正）

| 系统 | EN | JP | 中文 | 覆盖范围 | NPC 等级机制 |
|---|---|---|---|---|---|
| **Duty Support** | Duty Support | コンテンツサポーター | 内容支援 | **ARR / HW / SB / DT** 的主线与部分支线副本 + **部分 ARR 试炼** | NPC **自动缩放**，玩家无养成 |
| **Trust** | Trust | フェイス | 亲信 | **ShB 主线副本 + EW 主线副本**（Dawntrail 部分以 Duty Support 形式提供） | NPC 有**独立等级（avatar level）**，需培养 |
| **Adventurer Squadron** | Adventurer Squadron | 冒険者小隊 | 冒险者小队 | **ARR 20–60 级副本** | 队员等级独立，需训练 |

> **注意**：任务书将 Trust 归为「Shadowbringers+」、Duty Support 归为「ARR–SB」。
> 官方 Game Manual 的 Duty Support 支持列表**包含 Dawntrail 副本**（例如 7.5 新增 The Clyteum 的 Duty Support；7.35 笔记亦列 ARR/HW/SB/DT 各版本任务）。因此更准确的表述是：
> **Duty Support = 无需养成的 NPC 队友（覆盖 ARR 至今）；Trust = 需养成 avatar 等级的系统（ShB/EW 主线为主）。**

### 5.2 官方确认的 Duty Support 支持副本（Patch 7.5/7.56 时的 Game Manual）

**A Realm Reborn — 主线任务**
Sastasha / The Tam-Tara Deepcroft / Copperbell Mines / **The Bowl of Embers（试炼）** / The Thousand Maws of Toto-Rak / Haukke Manor / Brayflox's Longstop / **The Navel（试炼）** / Stone Vigil / **The Howling Eye（试炼）** / Castrum Meridianum / The Praetorium / The Porta Decumana / Snowcloak / The Keeper of the Lake

**A Realm Reborn — 支线任务**
Halatali / The Sunken Temple of Qarn / Cutter's Cry / Dzemael Darkhold / The Aurum Vale

**Heavensward — 主线**
Sohm Al / The Aery / The Vault / The Great Gubal Library / The Aetherochemical Research Facility / The Antitower / Sohr Khai / Xelphatol / Baelsar's Wall

**Heavensward — 支线**
**The Dusk Vigil**（**7.5 追加**）

**Stormblood — 主线**
The Sirensong Sea / Bardam's Mettle / Doma Castle / Castrum Abania / Ala Mhigo / The Drowned City of Skalla / The Burn / The Ghimlyt Dark

**Stormblood — 支线**
**Shisui of the Violet Tides**（**7.5 追加**）

**Dawntrail**
**The Clyteum**（**7.5 新增副本，首发即支援 Duty Support 与 Trust**）

> 官方 Game Manual 该页在 Shadowbringers 段落处截断，ShB/EW/DT 的完整列表未取得。标注**部分未验证**。
> 关键机制说明（官方原文）：
> - **ARR 的副本为固定 NPC 队伍，不能更换**（"Instanced dungeons in A Realm Reborn have pre-set NPC party members that cannot be switched out."）
> - 其他版本的部分副本**可更换 NPC**。
> - Duty Support 可从**副本入口**或**主菜单**启动。
> 来源：[Official Game Manual — Duty Support](https://eu.finalfantasyxiv.com/game_manual/dutysupport/)、[Patch 7.5 Notes（官方）](https://fr.finalfantasyxiv.com/lodestone/topics/detail/07320affa7e0fcd9685afcbe54fbf55405b6d822)

### 5.3 7.5 对既有副本的调整

- **The Dusk Vigil**：Towering Oliphant / Ser Yuhelmeric / Opinicus Boss 战调整。
- **Shisui of the Violet Tides**：部分地形调整；Amikiri / Ruby Princess / Shisui Yohi Boss 战调整。
- **The Clyteum**：新副本，Lv 100、**平均品级 750 以上**、4 人、90 分钟；可用 **Trust 或 Duty Support**，或 **Explorer Mode（探索模式）**。

> 来源：[Patch 7.5 Notes（官方）](https://fr.finalfantasyxiv.com/lodestone/topics/detail/07320affa7e0fcd9685afcbe54fbf55405b6d822)

### 5.4 限界职业的内容限制（7.56 明确列表）

**Beastmaster 与 Blue Mage** 被禁止参与：
- Duty Roulette
- Eureka
- Bozjan Southern Front
- Occult Crescent
- Variant / Criterion 副本
- Ultimate Raid
- Stone, Sky, Sea
- Squadron Missions
- 深层迷宫
- PvP
- Hall of the Novice

另：不能使用 role action、不能指派为 retainer、只能接受职业任务与对所有职业开放的任务。
**补偿**：从 FATE 获得的经验**高于**普通职业。

> 来源：[Patch 7.56 汇总（Eorzean Tavern）](https://eorzeantavern.com/ffxiv-patch-7-56/)

---

## 6. Unreal 试炼 / Faux Hollows

### 6.1 机制

- Unreal（幻討伐戦 / アンリアル）为**每个大版本轮换一次的旧试炼强化版**，有品级同步（Item Level Sync）。
- 相关系统为 **Faux Hollows（幻の商店）**，NPC 为 **Painfully Ishgardian Man**（Idyllshire X:7.0 Y:5.9）。
- 解锁任务：**Fantastic Mr. Faux**（Lv 80；需完成 MSW「Shadowbringers」+ 任务「Keeping Up with the Aliapohs」）；已完成过该任务的玩家**自动解锁**后续 Unreal。
- 官方原文："Different unreal trials will be available in each major patch."

### 6.2 轮换记录

| Patch | Unreal 试炼 | 详情 |
|---|---|---|
| 7.35 | **Shinryu's Domain (Unreal)**（神龍討伐戦） | 取代 Tsukuyomi's Pain (Unreal)（**7.5 起 Tsukuyomi's Pain (Unreal) 不再可访问**）。Lv 100、平均品级 **690 以上**、**品级同步 695**、8 人、60 分钟；只能通过 Raid Finder |
| 7.5 | **Shinryu's Domain (Unreal)** | 7.5 补丁说明中 Faux Hollows 表格：「Before: Tsukuyomi's Pain (Unreal) → **After: Shinryu's Domain (Unreal)**」；同时 "New items are available in exchange for faux leaves" |

> **⚠️ 数据冲突**：7.35 笔记与 7.5 笔记**都**记录了「Tsukuyomi's Pain → Shinryu's Domain」这一轮换。
> - 7.35 笔记（页面更新于 2025-10-14 PDT）已写 Shinryu's Domain (Unreal)。
> - 7.5 笔记的 Faux Hollows 表格亦写同一轮换。
> - 合理解释：7.35 笔记页面为**后期更新过的当前版本**（可能已同步 7.5 内容），或 7.35 时确实先行上线。**标注【未验证】确切轮换时点。**
> - **7.5/7.56 时的 Unreal 应为 Shinryu's Domain (Unreal)**（较可靠）。
> 来源：[Patch 7.35 Notes](https://de.finalfantasyxiv.com/lodestone/topics/detail/9d2cad7a1028016719060b5ae3caeb5e369c89e9)、[Patch 7.5 Notes](https://fr.finalfantasyxiv.com/lodestone/topics/detail/07320affa7e0fcd9685afcbe54fbf55405b6d822)

**Faux Hollows 机制（完整）**

| 项目 | 内容 |
|---|---|
| 周期 | **每周 1 次 telling**；若在盘面中发现 **retelling** 图标，则当周可额外再通关一次 Unreal 并获得额外一次盘面机会 |
| 重置 | 每周二重置前可用 |
| Unlock | 在 Idyllshire 完成 **Fantastic Mr. Faux**，并解锁当前 Unreal 试炼的**剧情版本** |
| 流程 | 通关当前 Unreal 试炼 → 获得 1 次 Faux Hollows 机会 → 翻开插画 → 获得 **Faux Leaves** |
| 消费 | Faux Leaves 向 **Faux Commander** 兑换奖励 |
| 轮换规则 | Unreal 试炼**通常随大版本轮换**；被替换的旧 Unreal **不再可用**（官方 7.5 原文确认 Tsukuyomi's Pain (Unreal) 在 Shinryu's Domain (Unreal) 上线后不再可访问） |

- **Weekly 记录的任务（7.5 前后变更）**：

| Before | After |
|---|---|
| The Ageless Necropolis / San d'Oria: The Second Walk / AAC Cruiserweight M1 (Savage) / M2 (Savage) | The Ageless Necropolis / San d'Oria: The Second Walk / **AAC Heavyweight M2 (Savage)** / **M3 (Savage)** |

---

## 7. 其他循环内容与计时器

### 7.1 Occult Crescent（7.25 起）【已上线】

**解锁**：Tuliyollal (X:17.0 Y:11.8) 的 Expedition Messenger 任务 **One Last Hurrah**。

**区域与 Knowledge（知识）等级**
| 区域 | Knowledge 上限 | 解锁任务 |
|---|---|---|
| South Horn | **20** | One Last Hurrah |
| North Horn（7.55） | **40** | **Occult Reunion**（Tuliyollal X:17.2 Y:11.8，Expedition Messenger） |

进入 North Horn 需经 phantom village 的 **Jeffroy**，并完成 **Mysteries Abide** 与 **Occult Reunion**。

**Phantom Jobs（幻影职业）解锁**

*South Horn*
| Phantom Job | 解锁方式 |
|---|---|
| Freelancer | 初始可用 |
| Knight / Bard / Monk | 完成任务 **New Job, Old Tricks** |
| Time Mage / Cannoneer / Chemist / Mystic Knight / Dancer | **1,000 Enlightenment Silver Pieces**（Expedition Antiquarian） |
| Samurai / Geomancer / Thief / Gladiator | **1,600 Enlightenment Gold Pieces** |
| Berserker | 完成 Critical Engagement **The Unbridled** |
| Ranger | 完成 Critical Engagement **The Black Regiment** |
| Oracle | 完成 Critical Engagement **On the Hunt** |

*North Horn*
| Phantom Job | 解锁方式 |
|---|---|
| Ninja / Black Mage / White Mage / Red Mage | **1,000 Enlightenment Silver Obols** |
| Dragoon / Summoner | **1,600 Enlightenment Gold Obols** |
| Blue Mage | 完成 Critical Engagement **Appalling Behavior** |
| Necromancer | 完成 Critical Engagement **Dark Artistry** |

> **Phantom Blue Mage**：需**在敌人被击败前目击其施放**该技能才能学会。已记录技能：Occult Missile（Appalling Behavior, Lv1）、Occult Aqua Breath（Crescent Stoneshell 31.0,8.0, Lv1）、Occult Aero II（Crescent Anila 16.0,37.0, Lv2）、Occult Mighty Guard（Crescent Bibliotaph 38.0,31.0, Lv2）、Occult Aero III（Quarried Away, Lv3）、Occult White Wind（Crescent Flame 5.0,36.0, Lv3）。

**Forked Towers（分岐塔）**
| 副本 | 区域 | 人数 | 入场条件 |
|---|---|---|---|
| **The Forked Towers: Blood** | South Horn | **24–48 人** | **Sanguine Cipher**（600 Silver Pieces 或 960 Gold Pieces，Expedition Antiquarian X:38.1 Y:7.1）+ **Auroral Mirages** 天气；South Horn (22.8, 21.4) 使用 |
| **The Forked Tower: Magic** | North Horn | **最多 48 人** | **Knowledge Lv 40** + Auroral Mirages；North Horn (15.0, 29.9) |
| **The Forked Tower: Magic (Extreme)** | North Horn | **12–48 人** | Knowledge Lv 40 + **至少 3 个满编队伍**；限制复活（叠加 Debuff）；副本锁定至通关或离场 |

*Blood 的 4 个 Battle（顺序）*：Demon Tablet → Dead Stars（Nereid / Triton / Phobos）→ Marble Dragon → Magitaur

*Magic 的主要 Battle*：Two-headed Aevis / Sword Dancer / Necrophobia / The Index（另有 The Archive 与 Concealed Collection 调查目标）

**奖励**
- Blood → **Sanguinite** + Arcanaut Armor 素材；通关奖励 **Demon Haul** 坐骑
- Magic / Magic Extreme → **Arcane Amulets** + North Horn 进度奖励
- 两者均推进 **Occult Record** 并支持 **Phantom Weapon** 路线
- North Horn 通过 **Eclipticum** 与 **Occultum** 推进 Phantom Weapons，通过 **Phantom Vision** 推进 Arcanaut Armor
- IL 745 饰品来自 Critical Engagement 与宝箱
- 坐骑地图：South Horn 3,000 Silver Pieces；North Horn 3,000 Silver Obols

**Occult Record**：共 **60** 条（South Horn 1–30、North Horn 31–60）；来源为剧情任务、调查点（survey point）、FATE、Critical Engagement、Forked Tower 宝箱。**第 59 条「The Archive」尚未记录**。

> 来源：[Occult Crescent Guide（Eorzean Tavern，2026-08-21，Current for Patch 7.56）](https://eorzeantavern.com/occult-crescent/)、[The Forked Towers Guide](https://eorzeantavern.com/dawntrail/forked-tower/)

### 7.2 Cosmic Exploration（7.21 起）【已上线】

**解锁**：Old Sharlayan (X:12.6 Y:13.6) 的 **Namingway** 任务 **A Cosmic Homecoming**（生产/采集 Lv 10；需完成 MSW「Endwalker」）。
**进入**：Mare Lamentorum (X:21.9 Y:13.2) 的 **Drivingway**。
**限制**：**只能从原生世界（Home World）访问**；区域内禁止坐骑。

**目的地沿革**
| Patch | 目的地 | 备注 |
|---|---|---|
| 7.21 | **Sinus Ardorum**（Source 之月） | 首个目的地 |
| 7.4 | **Oizys** | 7.4 Special Site 明确记载 |
| 7.51 | **Auxesia** | 7.51 汇总记载 |

**核心机制**
| 机制 | 说明 |
|---|---|
| **Exotablet** | 支援终端；含 Infrastructure Index |
| **Stellar Missions** | 从 exotablet 接受；分 **gold / silver / bronze** 三档评价；**Quest Sync**（奖励与难度随等级调整） |
| **Provisional Missions** | ① **Sequential Missions**：在特定 stellar mission 取得金星评价后开放 5 分钟；② **Weather-restricted / Time-restricted Missions** |
| **Critical Missions** | **Red Alert（レッドアラート）**期间开放；屏幕上方有两条需求职业进度条；可重复完成（奖励高于普通任务）；两条都填满则解除 Red Alert 并给所有贡献者额外奖励；超时未填满则奖励减少 |
| **Mech Ops** | 大规模指令；可作 **pilot**（需以 lunar credits 购买申请，随机抽选 **5** 名；未中选者下次中选概率提高）或 **ground support**；奖励含特殊 cosmic fortune 抽奖券 |
| **Cosmic Exploration Projects** | 达成里程碑触发；通知后经一定时间自动开始；在指定地点按 "Join FATE" 参加 |
| **Stellar Successes** | **Daily Successes**（每日刷新）+ **Standard Successes**（累计）|
| **Cosmic Fortunes** | 以 lunar credits 抽奖；有 2 种转盘 + 1 种 mech op pilot 专用券转盘 |
| **Star Contributors** | 排行榜周期 **24 小时**，每日 **PDT 02:00** 重置；表彰 14 天（Sinus Ardorum 显示全息影像、名字刻于 starward standings stela、角色获得特殊视觉效果）；14 天内不可再被选中 |
| **Cosmic Tools** | 生产/采集职业专属工具，可强化；通过 stellar mission 获得 **research data**；NPC **Researchingway**（Sinus Ardorum X:21.1 Y:21.8）；原型 v0.1 → v0.8 → 完成品（IL 10/30/55/150/290/430/560/690 → **720**）|
| **移动辅助** | **Stellar Sprint**（比普通 Sprint 更快，效果仅在再次使用时结束）、**Stellar Return**（无冷却，返回区域中央 rainbow crystal）|
| **通货** | **Cosmocredits**（Mesouaidonque X:21.8 Y:21.8 兑换）、**Lunar Credits**（Alerot X:22.4 Y:20.3）|

**7.51 追加**：新目的地 **Auxesia**、**Tool Enhancement Quests - Cosmic Tools**、新 Custom Deliveries 客户 **Tiisol Ja**。

> 来源：[Patch 7.21 Notes（官方）](https://de.finalfantasyxiv.com/lodestone/topics/detail/6f824223a7e10da7b9b7dfc84f626d10d4df88b3)、[Patch 7.4 Special Site 更新（官方）](https://jp.finalfantasyxiv.com/lodestone/topics/detail/f893856d81e4d23f9085588a637dea99528da479)、[Patch 7.5 Notes（官方）](https://fr.finalfantasyxiv.com/lodestone/topics/detail/07320affa7e0fcd9685afcbe54fbf55405b6d822)、[Patch 7.51 汇总](https://eorzeantavern.com/patch-notes/)

### 7.3 The Hunt（モブハント）——完整数值

**Dawntrail 狩猎解锁**：任务 **A New Dawn, a New Hunt**。

**Dawntrail 狩猎分区**
| 区域 | S Rank 名称 | 出现条件（Spawn Theory） |
|---|---|---|
| Urqopacha | **Kirlirger the Abhorrent** | 在 **满月 + 雾**天气下巡行 spawn point |
| Yak T'el | **Neyoozoteel** | 在区域内任意处**丢弃 50 个 Fish Meal** |
| Kozama'uka | **Ihnuxokiy** | 使用 **Morpho** 并飞过 spawn point |
| Shaaloani | **Sansheya** | 连续 3 次完成 FATE **You Are What You Drink** |
| Heritage Found | **Atticus the Primogenitor** | **制作 HQ Rroneek Steak** |
| Living Memory | **The Forecaster** | 在 spawn 地点施放青魔法 **Northerlies** |

**S Rank 重生窗口（关键数值）**
- **击败后约 84–132 小时**。
- **若自上次维护后未出现过，则缩短为维护后约 50–80 小时**。

**S Rank 掉落（每个 S Rank 相同）**
| 物品 | 数量 |
|---|---|
| Sack of Nuts（ヌツの袋） | 100 |
| Allagan Tomestones of Poetics | 100 |
| Allagan Tomestones of Mathematics | 80 |
| Cracked Novacluster | — |
| Cracked Prismaticluster | — |

**SS Rank（Dawntrail 独有机制）**
- **Arch Aethereater**：每当一个 Dawntrail S Rank 被击败，**有概率在该区域出现 4 个 Crystal Incarnation**；**4 个全部在限定时间内击败** → Arch Aethereater 出现。Crystal Incarnation 若数分钟内未被交战会消失。
- **掉落（每区域相同）**：
  | 物品 | 数量 |
  |---|---|
  | Sack of Nuts | **400** |
  | Allagan Tomestones of Poetics | **200** |
  | Allagan Tomestones of Mathematics | **100** |
  | Allagan Tomestones of Mnemonics | **50** |
  | Cracked Novacluster / Cracked Prismaticluster | — |
- 可出现区域：Yak T'el / Shaaloani / Heritage Found / Living Memory / Kozama'uka / Urqopacha

**B Rank / A Rank**
- **B Rank**：**每周**精英目标（周常讨伐），重生快。
- **A Rank**：hunt train 主要目标，重生窗口较短。【未验证确切小时数】

**Hunt 社区术语**
Dead（已被击杀，当前无法 spawn）/ Window Open（可再次 spawn）/ Max・Missing（接近计时上限或推定可用）/ Sniped（未向社区报告即被杀）/ Tracker（第三方追踪工具）/ Mapping（排查 spawn 点以缩小 S Rank 出现位置）

**常用追踪工具**：Bear Tracker、ffxiv-the-hunt.net、Eorzea World、FFXIVHunt

**通报宏参数**：`<flag>`（最近地图旗标）、`<pos>`（当前位置）、`<t>`（目标名）、`<thpp>`（目标 HP 百分比）；频道 `/sh`（区域 shout）、`/y`、`/ls1`、`/cwls1`

**奖励通货**：Sack of Nuts（ヌツの袋）、Cracked Novacluster、Cracked Prismaticluster、神典石
【未验证】ARR/HW 的 Centurio Seals（セントリオ記章）、Allied Seals（アライアンス記章）在 7.x 是否仍有用途。

> 来源：[Dawntrail Hunts Guide](https://eorzeantavern.com/dawntrail/hunts/)、[Dawntrail S & SS Rank Hunts](https://eorzeantavern.com/dawntrail/hunts/s-rank/)（均为 2026-08-21 更新，Current for Patch 7.56）

### 7.4 Ocean Fishing（オーシャンフィッシング）

- **每 2 小时实时**一个出航窗口（待验证确切分钟偏移）。
- 有「航路（Voyage）」系统；分数、鱼种颜色分类（蓝/红/绿/紫）。
- 【未验证】是否有 Dawntrail 新航路；精确时刻表需以游戏内或专门工具为准。
- 来源：[Icy Veins Ocean Fishing Guide](https://www.icy-veins.com/ffxiv/ocean-fishing-guide)（403，未能读取）

### 7.5 The Manderville Gold Saucer（金碟游乐场）——完整周常

**解锁**：**It Could Happen to You**（Well-Heeled Youth，Ul'dah – Steps of Nald X:9.6 Y:9.0，Lv 15；需完成 The Gridanian / Ul'dahn / Lominsan Envoy 之一）

**MGP 规则**
- MGP **不能换回 gil**。
- 仅当持有 MGP **少于 500** 时可用 gil 兑换启动 MGP。
- **Gold Saucer VIP Card** → **Jackpot III**，2 小时内符合条件的游乐项目收益 **+15%**。
- MGP 增益**不叠加**，且**不影响** Challenge Log 奖励、重复卡牌出售、凭证、Squadron 奖励。
- **Make It Rain Campaign**（年度）：多数收益 **+50%**，且**唯一会提升 Challenge Log MGP**；不影响 Jumbo Cactpot、凭证、重复卡牌、Chocobo Challenge 首次奖励。

**GATE 时间表（每 20 分钟一场）**
| 时刻 | 可能的 GATE |
|---|---|
| 整点 | Air Force One；Cliffhanger；Leap of Faith — Falling City of Nym |
| :20 | Any Way the Wind Blows；The Slice Is Right；Leap of Faith — Fall of Belah'dia |
| :40 | The Slice Is Right；Air Force One；Leap of Faith — Sylphstep |

**Weekly Challenge Log（Gold Saucer 分类合计 95,000 MGP/周）**
| 分类 | 目标 | 总奖励 |
|---|---|---|
| Mini-games | 完成 3 项；获得 100 MGP | 2,500 MGP |
| GATEs | 参加 5 次；完成 3 次 | 13,000 MGP |
| Chocobo Racing | 参加 3 次与 20 次；获胜 1 次与 10 次 | 26,000 MGP |
| Triple Triad | 玩 10 局；胜 10 局 | 13,000 MGP |
| Battlehall | 玩 5 局；胜 3 局 | 5,500 MGP |
| Open Tournament | 参加并领取奖励 | 3,000 MGP |
| Lord of Verminion | 玩 1 / 3 / 5 场 | 27,000 MGP |
| Doman Mahjong | 玩 2 场玩家对局 | 5,000 MGP |

**其他解锁任务**：Scratch It Rich（Mini Cactpot）、Hitting the Cactpot（Jumbo Cactpot）、Passion for Fashion（Fashion Report，Lewena X:4.8 Y:6.1）、Triple Triad Trial、So You Want to Be a Jockey（Chocobo Racing）、Every Little Thing She Does Is Mahjong（Doman Mahjong）
**最大常规坐骑消费**：Blackjack 4,000,000 MGP

> 来源：[FFXIV Gold Saucer Guide（Eorzean Tavern，2026-08-21，Current for Patch 7.56）](https://eorzeantavern.com/gold-saucer/)

### 7.6 Challenge Log（チャレンジログ）

| 项目 | 内容 |
|---|---|
| 解锁任务 | **Rising to the Challenge** |
| NPC | **I'tolwann**，Limsa Lominsa Upper Decks |
| 等级 | **15** |
| 前置 | **Call of the Sea** |
| 重置 | **周二 08:00 UTC** |
| 奖励类型 | gil / 经验值 / MGP / 陆行鸟伙伴成长 / 各系统专属通货 |
| 分类 | 随对应系统解锁而出现 |
| 完成度奖励 | 达到整体完成阈值有额外 gil |

**建议路线**：重置前检查接近完成的目标 → 把**按百分比给 EXP 的条目**留给你想练的职业 → 结合副本/称赞/roulette/retainer 条目 → 用金碟条目作为大额 MGP 来源。

> 来源：[FFXIV Challenge Log Guide（Eorzean Tavern）](https://eorzeantavern.com/challenge-log/)
> **注意**：任务书猜测解锁任务为 "The Greatest Story Never Told"——该名称**不正确**，正确为 **Rising to the Challenge**。

### 7.7 Treasure Maps（トレジャーハント）

7.5 变更：
- **Loboskin / Br'aaxskin / Gargantuaskin Treasure Map** 奖励调整。
- **Cenote Ja Ja Gural** 与 **Vault Oneiron** 奖励调整。

> 来源：[Patch 7.5 Notes（官方）](https://fr.finalfantasyxiv.com/lodestone/topics/detail/07320affa7e0fcd9685afcbe54fbf55405b6d822)
> 【未验证】地图采集的时间门（采集冷却）、Decipher 冷却时长、各等级传送门副本完整列表。

### 7.8 友好部族（Allied Society / 友好部族）

- **每日任务上限：每个部族 3 个/日（Earth time）**（官方 7.35 补丁说明原文）。
- **Quest Sync**：Yok Huy 的主线与每日任务采用等级自动调整，EXP 随之调整。
- **7.35 新增 Yok Huy**（Disciple of the Hand Lv 90；Urqopacha X:32.1 Y:34.3；Fahrafahr；解锁任务 **Frosty Neighbors**，需完成 MSW「Dawntrail」+ 支线 "Brains and Brawn"）。制作材料由任务提供（触媒自备）。
- 部族通货：**Yok Huy wards**。
- **7.55**：友好部族收束支线（Allied Society capstone sidequests）。
- 7.25：**Mamool Ja** 友好部族。

> **⚠️ 任务书假设「12 个/日上限」——该说法已过时。** 现行规则为**每部族每日 3 个**，无全局 12 个上限的官方表述。标注为**已变更/不适用**。
> 来源：[Patch 7.35 Notes（官方）](https://de.finalfantasyxiv.com/lodestone/topics/detail/9d2cad7a1028016719060b5ae3caeb5e369c89e9)、[Patch 7.21 Notes（官方，Mamool Ja 于 7.25）](https://de.finalfantasyxiv.com/lodestone/topics/detail/6f824223a7e10da7b9b7dfc84f626d10d4df88b3)

### 7.9 Leves（リーヴ / 受注权）

| 项目 | 数值 |
|---|---|
| 受注权上限（allowance cap） | **100** |
| 恢复速率 | **每日 6 个**（一说为每 12 小时 3 个 = 6/日）【部分未验证】 |

> **⚠️ 任务书假设「6 per day regen」——方向正确，但「3 per 12 hours」与「6 per day」两种表述需区分；未能取得官方原文，标注【未验证】。**
> 来源：[日语玩家博客「平日はリーヴ受注権が1日6溜まる→1日6消費する」](https://eu.finalfantasyxiv.com/lodestone/character/5189952/blog/885283/)（玩家博客，非官方）

### 7.10 其他

| 内容 | 状态 |
|---|---|
| **Island Sanctuary（岛屿开拓）** | 6.2 起常驻；7.x 后无新阶段【未验证最终状态】 |
| **Ishgard Restoration（イシュガルド復興）** | 已结束（5.x 内容），现为常驻但不再更新 |
| **Subaquatic Voyages（潜水舰）** | 7.5：新增区域、新物品；**最大 submersible rank 由 140 提升至 145** |
| **Doman Enclave 捐赠** | 每日 |
| **Grand Company 补给/筹集** | 每日；军队排行榜每周 |
| **Fishing / 收藏品（収集品）** | 7.x 通货名称【未验证】 |
| **Custom Deliveries（お得意様取引）** | 每周奖励；7.51 新客户 **Tiisol Ja**；7.5 对其前置任务（Mulch Ado About Nothing / Culinary Import）做小幅调整 |
| **Variants / Criterion** | 已知 3 作：**The Sil'dihn Subterrane**（6.25）、**Mount Rokkon**（6.45）、**Aloalo Island**（6.51）【未验证】；**Dawntrail 是否有新 Variant/Criterion【未验证】**；限界职业不能进入 |

---

## 8. EXP 加速系统（完整）

### 8.0 加成分组机制（关键框架）✅

FFXIV 的 EXP 加成分为**两组**，两组之间**全部可叠乘**：

| 组 | 说明 | 成员 |
|---|---|---|
| **A 组** | 对**基础经验值**直接乘算 | 休息奖励（レストボーナス）、Armoury Bonus（アーマリーボーナス）、优遇世界奖励（優遇ワールドボーナス）、导师&新手组队奖励（メンター＆ビギナーパーティボーナス） |
| **B 组** | 在 **A 组结算后**再乘算 | 食物增益（食事バフ）、装备（新手戒指 / 友情头环 / 各资料片预约特典耳环等） |

> 顺序：先把 A 组全部叠上，再用 B 组乘上去，效果会显著放大。
> 来源：[クロ猫亭「経験値バフ全部乗せで何倍になるか検証してみた」（2026-04-08）](https://kuroneko-tei.com/articles/ff14-exp-buff-stacking-guide)

### 8.1 全部 EXP 加成一览 ✅

| 加成 | 效果 | 有效范围 | 条件 |
|---|---|---|---|
| **レストボーナス**（Rested / 休息奖励） | **+50%** | 战斗・制作・采集 | 在休息区（レストエリア）**登出**时累积 |
| **アーマリーボーナス**（Armoury Bonus） | **Lv 89 及以下 +100%（2 倍）**<br>**Lv 90 及以上 +50%（1.5 倍）** | **仅战斗** | 第 2 个及以后职业（存在更高等级职业时） |
| **優遇ワールドボーナス**（优遇世界奖励） | **+100%**，且**使其他所有加成再翻 2 倍** | **Lv 89 及以下** | 在优遇世界创建角色；**创建后 90 天**内；**达到 Lv 90 即失效** |
| **メンター＆ビギナーボーナス** | **+50%** | 战斗 | 与导师同队时，**新手侧**获得 |
| **ビギナーリング**（Brand-new Ring / 新手戒指） | **+30%** | **Lv 30 及以下・全职业** | **完成"初心者の館"（Hall of the Novice）**获得 |
| **フレンドシップサークレット**（Friendship Circlet / 友情头环） | **+20%** | **Lv 25 及以下・全职业** | 招待活动（Recruit a Friend）获得 |
| **食事バフ**（食物增益） | **+3%**（优遇世界中为 **+6%**） | **全部经验值** | 使用食物道具 |
| **各资料片予約特典イヤリング**（预约特典耳环） | 数值依资料片而异【未验证具体 %】 | 至**最大等级 −10** | 各资料片预约特典 |

**优遇世界奖励的特殊性（重要）**
- 在优遇世界创建的角色：**创建后 90 天**内、**Lv 89 及以下**（达到 Lv 90 时效果结束），**其他所有增益翻 2 倍**。
- 因此实际换算：**休息奖励变为 +100%**；**Armoury Bonus 在 Lv 89 及以下相当于 +200%**。
- 这是新角色最强的单一加成。

**食物（重要实务结论）**
- **经验值效果对所有食物共通为 +3%**；**25 gil 的便宜食物与高价食物效果相同**。
- 没有必要买贵食物，只要**保持有食物状态**即可。
- 优遇世界期间食物为 **+6%**。
- 【未验证】食物增益持续时间是否为 30 分钟（B 组工具通常按 30 分钟计算）。

**耳环部位的唯一特例（重要）**
- **耳装备（各资料片预约特典耳环）即使持有多个，也只有数值最高的一个生效**（仅一个耳部位）。
- 与之不同，**新手戒指、友情头环可与耳环同时生效**。

**制作/采集（ギャザクラ）也适用**
- 休息奖励、新手戒指、友情头环**对非战斗职业同样有效**。
- 军队（Grand Company）另有「軍用マニュアル」等制作/采集用经验道具。

**推荐叠加顺序（原文 cheat sheet）**
```
休息奖励（在城镇登出累积）
  ↓
Armoury Bonus（第 2 个职业自动生效）
  ↓
优遇世界奖励（90 天 / Lv 89 及以下）
  ↓
与导师组队（新手侧获得）
  ↓
装备：新手戒指（Lv 30 及以下）
      友情头环（Lv 25 及以下）
      资料片预约特典耳环（最大等级 −10 为止）
  ↓
吃食物（任意食物，+3%）
```

> 来源：[クロ猫亭（2026-04-08，Patch 7.5 时期）](https://kuroneko-tei.com/articles/ff14-exp-buff-stacking-guide)
> **注**：该表将 Armoury 写作「Lv 89 及以下 +100% / Lv 90 及以上 +50%」，与日文 Wiki 的「Lv 90 未满 / Lv 90 以上」一致（89 = 90 未满）。

### 8.1a Armoury Bonus（アーマリーボーナス）——详细机制 ✅

**定义**：**仅限战斗职业（バトルクラス）**；作为第 2 个及以后职业的成长辅助，提升**怪物讨伐**与 **FATE** 获得的经验值。

**触发条件（关键）**
> 「使用可能なバトルクラスの中に、**現在のクラスよりも『高いレベルのクラス』が存在する場合**に発揮される」
> 即：**当前角色拥有的战斗职业中，只要存在一个比当前职业等级更高的职业，即生效。**
> - 例：已有 Lv 50 的 Knight，则培养该角色第 2 个及以后、**Lv 49 以下**的职业时获得加成。
> - 适用对象写作「クラス」，但**ジョブ（job）状态同样适用**。
> - **效率提示**：不要平均练所有职业；先把某一个职业练高，再练其他职业，可最大化收益。

**倍率（Patch 7.0 起，现行）**
| 当前职业等级 | 倍率 |
|---|---|
| **Lv 90 未满** | **2 倍（+100%）** |
| **Lv 90 以上** | **1.5 倍（+50%）** |

**历史倍率沿革（日文 Wiki 完整记录）**
| Patch | 变更 |
|---|---|
| 3.0（蒼天） | Lv 50 未满：1.5 → **2 倍**；Lv 50 以上维持 1.5 |
| 4.0（紅蓮） | Lv 60 未满：1.5 → **2 倍**；Lv 60 以上维持 1.5 |
| 5.0（漆黒） | Lv 70 未满：1.5 → **2 倍**；Lv 70 以上维持 1.5 |
| 6.0（暁月） | Lv 80 未满：1.5 → **2 倍**；Lv 80 以上维持 1.5 |
| **7.0（黄金）** | **Lv 90 未满：1.5 → 2 倍；Lv 90 以上 1.5** |

**不适用的情况（重要）**
- **固定值 EXP 不适用**：例如**副本 Boss**、**Duty Roulette 的奖励经验值**等以固定值结算的 EXP，**均不适用** Armoury Bonus。
- **Patch 6.0 起，副本内杂鱼的 EXP 已被移除**（改为击败 Boss 时一次性结算），因此现行表述即为补丁说明的「**怪物讨伐与 FATE 奖励的经验值增加**」。
- **深层迷宫**：迷宫**内部**的 EXP 不受任何加成；但迷宫**结算奖励**中的 EXP **适用** Armoury Bonus（见 §4.3）。

> 来源：[FF14 Online Wiki（日文）— アーマリーボーナス](https://ff14wiki.info/?%E3%82%A2%E3%83%BC%E3%83%9E%E3%83%AA%E3%83%BC%E3%83%9C%E3%83%BC%E3%83%8A%E3%82%B9)（内含官方 5.0 / 6.0 / 7.0 补丁说明原文引用）

> **⚠️ 纠正任务书的表述**：任务书写「Armoury Bonus 经典数值是 100%/50% below level 80」——**等级分段已随 7.0 更新为 90**（Lv 90 未满 2 倍 / Lv 90 以上 1.5 倍）。

### 8.2 休息经验（Rested EXP / レストボーナス）✅

| 项目 | 数值 |
|---|---|
| 加成率 | **+50%** |
| 累积方式 | 在**休息区（sanctuary，一般是 aetheryte 周围）**内，**无论在线还是离线**都会缓慢累积 |
| 池子上限 | **约 1.5 个等级份的经验值**（与当前等级无关） |
| 适用范围 | **战斗・制作・采集** |
| 结算方式 | 累积后以「**额外 +50%**」的形式加在获得的 EXP 上（副本、采集、制作皆可） |
| 与等级的关系 | **按角色累积**；由于 EXP 数值随等级放大，**高等级职业套现更多总 EXP**（Lv 90 职业从同一池子拿到的总 EXP 多于 Lv 15 职业） |
| 最快套现方式 | 打**当前等级段的副本**，尤其是**练级副本（leveling dungeons）** |
| 对 roulette 的效果 | 有提升但较小 |

> 来源：[FFXIV Tools Leveling Calculator（itinerare.net，标注 "Up-to-date for Dawntrail/7.5"）](https://ffxiv.itinerare.net/leveling)

### 8.3 优遇世界 / 新世界 / 拥挤世界（World Status）

| 世界状态 | 说明 |
|---|---|
| **優遇ワールド（Preferred）** | 创建角色后 **90 天**内、**Lv 89 及以下**获得 **+100%**，且**其他所有加成翻 2 倍**；达到 Lv 90 效果结束 |
| **新規ワールド（New World）** | 【未验证】与 Preferred 的差异；历史上有类似 EXP 加成 |
| **混雑ワールド（Congested）** | 禁止新建角色 |
| **Road to 90 / Road to 100** | 社区对上述优遇加成的通称。**7.x 后社区/工具普遍称为「Road to 100」**（因等级上限为 100）【部分未验证：官方正式名称未取得】 |

> 【未验证】「Road to 100」是否为官方术语，或仅为社区沿用旧名「Road to 90」的更新版。
> 来源：[FFXIV Tools Leveling Calculator](https://ffxiv.itinerare.net/leveling)（选项名为 "Road to 90" Buff）、[AccountShark Leveling Guide（2026-09-08 更新，Patch 7.56）](https://accountshark.net/blog/ffxiv-leveling-guide-1-100)（使用 "Road to 100"）

### 8.4 各经验来源的效率（实务结论）✅

| 来源 | 效率 / 说明 |
|---|---|
| **练级副本（非 capstone / 非 x0 级）** | **全游戏最有效率的可重复 EXP 来源** |
| **Duty Roulette: Leveling** | 每日必做 |
| **Duty Roulette: Alliance Raid** | 每日必做（性价比高） |
| **Duty Roulette: Main Scenario** | 收益高但耗时长（"if you've the patience"） |
| **Frontline 每日奖励** | 给**相当可观的 EXP**；**关键机制：EXP 给的是「排队时选择的职业」，而非比赛中实际操作的职业**——因此可以**排队后进场再换职业** |
| **友好部族（Allied Society）每日任务** | EXP 适合**对应等级段**；**超出范围后衰减极快**；部族等级提升后 EXP 增加 |
| **FATE** | 效率一般，适合"差一点升级"时补足；**ShB 及以后区域有额外奖励（双色宝石）** |
| **Wondrous Tails（天書奇譚）** | **每周交付时给予「半个等级」的 EXP（50% of a level）**，给予**交付时当前职业** |
| **深层迷宫（PoTD / HoH / Orthos）** | **最佳单人 EXP 来源** |
| **Duty Support** | **覆盖绝大多数练级副本**（因多数为 MSQ 必经）；比真人队慢，但省去排队时间 |
| **Trust（フェイス）** | **Lv 71 及以后**可用；顺带推进相关成就 |

**升到 100 级的耗时参考（第三方，2026-09-08）**
| 情境 | 耗时 |
|---|---|
| 首个角色（走 MSQ） | **70–100 小时** |
| 副职业 1→100（有增益） | **20–35 小时** |
| 速刷副职业（Road + Armoury + roulette 全开） | **15–25 小时** |
| 休闲玩家达到 100 | 约 **4–8 周** |
| 专注推进 | 约 **2–3 周** |

> 来源：[FFXIV Tools Leveling Calculator（itinerare.net）](https://ffxiv.itinerare.net/leveling)（含完整 Leveling Tips 段落）、[AccountShark Leveling Guide（2026-09-08 更新）](https://accountshark.net/blog/ffxiv-leveling-guide-1-100)

### 8.5 尚未核实（EXP 相关）

| 项目 | 状态 |
|---|---|
| 各资料片**预约特典耳环**的确切数值与等级上限 | 【未验证】工具中可见的名称：**Azeyma's Earring**（Dawntrail 预约特典）、**Menphina's Earring**（Endwalker 预约特典）；数值未取得 |
| **「最大等级 −10」** 规则对 Lv 100 的适用（即 Lv 90 上限） | 【未验证】 |
| **FC / GC 增益（The Heat of Battle）** 各等级数值 | 【未验证】工具中可见选项为 **None / Rank I / II / III**（共 3 级），但数值未取得 |
| **Ala Mhigan Earrings**、**Friendship Circlet** 之外的旧道具 | 【未验证】 |
| **经验值加成上限** | 【未验证】是否存在总上限 |
| **Leve / 挑战日志 / 军队小队** 的确切 EXP 数值 | 【未验证】 |
| **Tales of Adventure（冒険の書）** | **具体产品名与价格【未验证】**；官方页面：https://store.finalfantasyxiv.com/ffxivstore/ 、 https://na.finalfantasyxiv.com/tales_of_adventure/ |

### 8.2 New Game+（ニューゲーム+）——已核实部分

- **7.5 新增章节**：
  - Chronicles of a New Era Quests → **Alliance Raids: Echoes of Vana'diel**
  - 前置：**各章节的最终任务必须已完成**才能解锁该章节
- **7.56 新增章节**：
  - **Dawntrail Part 4: Winter's Prelude**
  - **Beastmaster 职业任务线**章节
- **7.56 修复**：Nintendo Switch 2 版 New Game+ **章节顺序**问题
- 【未验证】New Game+ 是否给予 EXP / 战利品 / 成就；支持的资料片范围；章节选择机制细节。

> 来源：[Patch 7.5 Notes（官方）](https://fr.finalfantasyxiv.com/lodestone/topics/detail/07320affa7e0fcd9685afcbe54fbf55405b6d822)、[Patch 7.56 汇总](https://eorzeantavern.com/ffxiv-patch-7-56/)

---

## 9. Relic 武器路线（历代）

| 资料片 | 名称（EN） | 名称（中文常见） | 备注 |
|---|---|---|---|
| ARR | **Zodiac Weapons** | 黄道武器 | |
| Heavensward | **Anima Weapons** | 魂武 | |
| Stormblood | **Eureka Weapons** | 尤雷卡武器 | 关联 Eureka |
| Shadowbringers | **Resistance Weapons** | 抵抗军武器 | 关联 Bozja |
| Endwalker | **Manderville Weapons** | 曼德维尔武器 | 关联 Hildibrand |
| **Dawntrail** | **Phantom Weapons** | 幻影武器 | **7.25 公布、7.55 推进**；素材来自 Occult Crescent（Eclipticum / Occultum） |

**历代 Relic 防具**
| 资料片 | 名称 |
|---|---|
| Stormblood | **Eureka Armor** |
| Shadowbringers | **Resistance Armor** |
| **Dawntrail** | **Arcanaut Armor**（7.55 推进；素材 Sanguinite、Phantom Vision、Arcane Amulets） |

> 来源：[Occult Crescent Guide](https://eorzeantavern.com/occult-crescent/)、[The Forked Towers Guide](https://eorzeantavern.com/dawntrail/forked-tower/)、[Patch 7.21 Notes（官方，Phantom Weapons 于 7.25）](https://de.finalfantasyxiv.com/lodestone/topics/detail/6f824223a7e10da7b9b7dfc84f626d10d4df88b3)

---

## 10. 已知的信息缺口 / 待验证清单

| # | 缺口 | 说明 |
|---|---|---|
| 1 | **完整 Duty Roulette 类别表** | 官方 Game Manual 页面截断，Leveling / Trials / Main Scenario / Alliance Raids / Normal Raids / Frontline / Guildhests / Mentor / PvP 的**确切解锁条件与每日奖励数值**未取得 |
| 2 | **Roulette 每日奖励的具体神典石数量** | 未取得 Expert / Level Cap / Leveling 等各类别的确切数值 |
| 3 | **Adventurer in Need（不足ロール）** | 机制与奖励数值未核实 |
| 4 | **Mnemonics 持有上限** | 2,000 vs 4,000 冲突 |
| 5 | **EXP 加成全部数值** | Armoury Bonus %、Road to 90/100 %、Rested EXP、食い物、FC 增益、各 EXP 饰品（名称/%/等级上限） |
| 6 | **Tales of Adventure 完整产品线** | 名称、USD/JPY 价格、跳过范围 |
| 7 | **Variant / Criterion 完整列表** | Dawntrail 是否有新作；各作路线数与报酬 |
| 8 | **Leves 恢复速率** | 官方原文未取得 |
| 9 | **Ocean Fishing 精确时刻表** | 2 小时窗口的分钟偏移、航路列表 |
| 10 | **Collections / 收藏品与 Custom Deliveries 现行通货** | 7.x script 名称与每周次数 |
| 11 | **7.5 Deep Dungeon 规格改动** | 具体内容 |
| 12 | **B Rank 重置时刻与 A Rank 重生窗口** | 小时数 |
| 13 | **免费体验版完整限制** | 等级上限、PvP/Market Board 等 |
| 14 | **7.58 内容** | 未上线 |
| 15 | **8.0 英文/日文职业名与地图名** | 中文媒体音译待核 |

---

## 11. 被证实有误的常见说法（纠错表）

| 常见说法 | 实际情况 |
|---|---|
| 「Level 90 Dungeons」与「Level 100 Dungeons」是两个独立 roulette | 官方为 **Level Cap Dungeons（仅 100 级）** + **High-level Dungeons（50/60/70/80/90 合并）** |
| Challenge Log 解锁任务为 "The Greatest Story Never Told" | 实际为 **Rising to the Challenge**（I'tolwann，Limsa Lominsa Upper Decks，Lv 15，前置 Call of the Sea） |
| 友好部族每日上限为全局 12 个 | 现行为**每部族每日 3 个**（官方 7.35 说明） |
| 「Level 90/100 Dungeons」roulette 有独立的每周奖励 | Roulette 强化奖励为**每日**一次/类别；每周奖励属于 Alliance Raid / Normal Raid 等具体内容，非 roulette 本身 |
| 深层迷宫内可用 Rested EXP 与 EXP 加成 | **官方明确否定**（Rested 与所有 EXP 加成一律无效）；但结算 EXP 适用 Armoury Bonus |
| 每日重置与每周重置同一时刻 | 每日 = UTC 15:00；每周 = UTC 周二 08:00（相差 7 小时） |
