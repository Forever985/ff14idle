# FF14 内容量与 iLvl 阶梯（从官方数据推导）

> 本文不是"读来的知识"，而是**从官方 Lodestone 抓取的原始数据（`data/duties.csv`、`data/dungeons.csv`）
> 直接算出来的**。抓取快照：2026-09-15（对应 7.56）。
> 目的：为放置游戏的**章节划分与数值曲线**提供硬依据。

---

## 1. 内容总量

| 类别 | 数量 |
| --- | --- |
| 4 人副本（Dungeon） | **103** |
| 讨伐战（Trial，含极神 Extreme） | **104** |
| 大型任务（Raid，含普通/零式/24 人本） | **155** |
| 绝境战（Ultimate） | **7** |
| **合计实例内容** | **369** |

各资料片分布（`Ver` 0–5）：

| 资料片 | 4人本 | 讨伐战 | 大型任务 | 绝境战 | 小计 |
| --- | --- | --- | --- | --- | --- |
| 2.0 ARR | 31 | 26 | 20 | 0 | 77 |
| 3.0 Heavensward | 18 | 14 | 27 | 2 | 61 |
| 4.0 Stormblood | 15 | 17 | 27 | 1 | 60 |
| 5.0 Shadowbringers | 13 | 15 | 27 | 2 | 57 |
| 6.0 Endwalker | 13 | 15 | 27 | 2 | 57 |
| 7.0 Dawntrail | 13 | 17 | 27 | 2 | 59 |

> 观察：**3.0 之后每个资料片的内容配额高度稳定**（4人本 13–18、讨伐 14–17、大型任务 27、绝境战 1–2）。
> 这对我们极其有利——意味着游戏可以做成**"资料片 = 一个可复用的章节模板"**。

---

## 2. 发现一：iLvl 是线性的，每资料片恒定 +130

| 资料片 | 4人本等级区间 | 4人本 iLvl 区间 | iLvl 跨度 |
| --- | --- | --- | --- |
| 2.0 ARR | 15–50 | 42–90 | 48（异常，见下） |
| 3.0 Heavensward | 51–60 | 100–230 | 130 |
| 4.0 Stormblood | 61–70 | 240–360 | 120 |
| 5.0 Shadowbringers | 71–80 | 370–490 | 120 |
| 6.0 Endwalker | 81–90 | 500–620 | 120 |
| 7.0 Dawntrail | 91–100 | 630–750 | 120 |

**提炼出的规律（k = 资料片序号，Heavensward=0 起算）：**

```
等级：  ARR 15→50，其后每个资料片恰好 +10 级（51-60, 61-70, ..., 91-100）
iLvl：  该资料片上限 = 230 + 130k        （230, 360, 490, 620, 750）
        该资料片下限 = 上限 − 120
资料片间衔接：上一版上限 +10 即下一版入门线（230 → 240, 360 → 370, ...）
```

这是一个**异常干净的线性结构**：不是指数膨胀，也不是阶梯式跳变。
官方用"每 2 年 +10 级 / +130 iLvl"的匀速节奏跑了 13 年。

> **设计含义（重要）**：放置游戏最怕"数值曲线和内容量对不上"。
> 这里可以直接采用**同构的线性章节模型**：每章 = 10 级 + 120 iLvl，共 7 章（ARR + 6 资料片），
> 不需要自己发明曲线，且天然可解释——玩家一看就知道"哦，一个资料片一章"。

### ARR（2.0）是唯一例外

- 31 个 4 人本、等级 15–50、iLvl 42–90，跨度远小于后续
- 原因：2.0 是"重制版"，副本密度高但装备系统尚未成熟；1.0 遗产与 2.x 补丁内容混在一起

> **设计含义**：ARR 章节适合做成**新手长引导**（内容多、数值平缓），
> 正好承担放置游戏的"前 2 小时教会玩家所有系统"的职责。

---

## 3. 发现二：三类内容的 iLvl 分层是固定的

以 Dawntrail 为例（数据全表见 `data/`）：

| 内容类型 | 数量 | iLvl 区间 | 相对 4 人本的位置 |
| --- | --- | --- | --- |
| 4 人副本 | 13 | 630–750 | 基准线 |
| 讨伐战（普通） | 11 | 670–755 | 与副本同步偏上 |
| 讨伐战（极神 Extreme） | 6 | 690–770 | **与零式同级** |
| 大型任务（普通） | 15 | 685–755 | 副本之上 |
| 大型任务（零式 Savage） | 12 | 700–770 | **天花板** |
| 绝境战（Ultimate） | 2 | 无 iLvl 要求 | 强制等级同步，纯技术验证 |

跨版本一致的模式：

```
4人本 ≈ 基准
极神  ≈ 零式 ≈ 版本天花板（-0 ~ -10）
普通大型任务 ≈ 版本天花板 - 25
```

> **设计含义**：放置游戏只需一条主轴 + 两条偏移就能还原 FF14 的装备生态：
> `副本线` 提供主成长，`极神/零式线` 提供同期的"高端平行产出"，`绝境战` 提供"不看装备只看配置"的挑战模式。

---

## 4. 发现三：一个资料片内部的"补丁阶梯"

把 Dawntrail 内容按 iLvl 排序，可以清楚看到官方补丁节奏的骨架。
**一个资料片 = 三轮内容**，每轮都由"大型任务 + 24人本 + 讨伐线"三件套组成：

| 轮次 | 大型任务（普通 → 零式） | 24 人本 | 讨伐战线（普通 → 极神） | iLvl 区间 |
| --- | --- | --- | --- | --- |
| 第一轮 | AAC **Light-heavyweight** M1–M4：685 → 700–710 | Jeuno: The First Walk **695** | The Interphos 670 / Everkeep、Worqor Lar Dor 极神 690 | 670–710 |
| 第二轮 | AAC **Cruiserweight** M1–M4：715 → 730–740 | San d'Oria: The Second Walk **725** | Sphene's Burden 710 / Recollection 715 → 极神 730 | 710–740 |
| 第三轮 | AAC **Heavyweight** M1–M4：745 → 760–770 | Windurst: The Third Walk **755** | The Windward Wilds 725→极神 740 / Hell on Rails 745→极神 760 / The Unmaking 755→**极神 770** | 740–770 |

**三个额外发现：**

1. **零式用"重量级"分轮命名**：`Light-heavyweight → Cruiserweight → Heavyweight`，
   每轮 4 个 BOSS（M1–M4）× 普通/零式两份 = **8 条目录 / 轮**。
   → 放置游戏可把"一轮零式"直接做成一个**关卡组（4 关 × 2 难度）**。
2. **24 人本是 FF11 联动三部曲**：`Jeuno → San d'Oria → Windurst`，iLvl 695 / 725 / 755，
   恰好与三轮节奏同步、且**总是略高于同轮普通大型任务**。
3. **极神 ≈ 零式同级**（如 The Unmaking 极神 770 = 零式 M3/M4 770），
   构成"同期高端平行产出线"——玩家可以二选一毕业，这是很好的设计（放置游戏里对应"两条可选高端路线"）。
4. 另有 **Unreal（幻巧战）**：如 `Shinryu's Domain (Unreal)` 690 —— 把旧版本极神重做成当前等级同步内容，
   ⭐ 这是**官方现成的"内容复用"机制**，放置游戏可直接照抄为"往期副本的强化复刻"。

### 绝境战全表（7 条，全部等级同步）

| 资料片 | 名称 | 同步等级 |
| --- | --- | --- |
| 3.x | The Unending Coil of Bahamut (Ultimate) | 70 |
| 3.x | The Weapon's Refrain (Ultimate) | 70 |
| 4.x | The Epic of Alexander (Ultimate) | 80 |
| 5.x | Dragonsong's Reprise (Ultimate) | 90 |
| 5.x | The Omega Protocol (Ultimate) | 90 |
| 7.x | Futures Rewritten (Ultimate) | 100 |
| 7.x | Dancing Mad (Ultimate) | 100 |

> 绝境战平均**约每 2 个补丁 1 个**，是 FF14 的"最高难度荣誉内容"。
> 放置游戏里适合做成**"完全不吃装备、只吃职业理解与配置"的极限挑战关**——正好对应放置游戏的"阵容 puzzle"。

---

## 5. 对 FF14 Idle 的直接结论

1. **章节模型（照抄官方节奏）**
   ```
   章 = 一个资料片 = 10 级 + 120 iLvl + 13 个 4人本 + 15 个讨伐 + 27 个大型任务 + 1~2 个绝境战
   共 7 章：ARR(引导章，内容翻倍、曲线减半) + HW + SB + ShB + EW + DT + Evercold(8.0)
   ```
2. **数值曲线用线性**，不要用放置游戏常见的指数膨胀。
   线性 + 内容驱动，反而更贴近 FF14 的真实手感，也更好做"卡关 → 提升 → 通关"的节奏。
3. **内容表规模 369 条起**，必须数据驱动（`data/*.csv` → 生成器 → `src/data/*.js`），不能手写。
4. **三条平行产出线**：副本线（主）、极神/零式线（同期高端）、绝境战线（无装备挑战）。
5. **每个大型任务轮次（M1–M4）天然是一个"关卡组"**，适合做放置游戏的"阶段目标"。

---

## 数据出处与复现

```powershell
# 原始抓取脚本（由调研代理生成）
E:\deepseek harness\ff14-idle\docs\_research\_scrape_duties.ps1
E:\deepseek harness\ff14-idle\docs\_research\_scrape_dungeons.ps1

# 已清洗可直接用的数据
E:\deepseek harness\ff14-idle\data\duties.csv      # 266 行
E:\deepseek harness\ff14-idle\data\dungeons.csv    # 103 行   （字段说明见 data/README.md）
```

条目均带 Lodestone 链接，可逐条复核：
`https://na.finalfantasyxiv.com` + `Link` 字段。

### 抽检证据（本代理直接抓取官方页面验证）

```
抽检对象：The Unmaking (Extreme)   Link: /lodestone/playguide/db/duty/3fb8752a6df/
抓取结果：<title>Eorzea Database: The Unmaking (Extreme) | FINAL FANTASY XIV, The Lodestone</title>
          Item Level: 770
CSV 记录：AvgItemLevel = 770
→ 完全一致 ✅（数据源为官方 Eorzea Database，非社区整理）
```

抽检脚本可复用：

```powershell
$u = 'https://na.finalfantasyxiv.com' + $link
$html = curl.exe -s --max-time 40 $u
[regex]::Matches($html, 'Item Level.{0,120}')
```
