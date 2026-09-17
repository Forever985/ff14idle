# 调研来源日志

记录**主代理本人**直接抓取核实过的一手来源（子代理的来源在各专题文档内单独列出）。
核实日期统一为 **2026-09-15**。

## 一、官方来源（可直接引用）

| # | 来源 | 用途 | 关键结论 |
| --- | --- | --- | --- |
| 1 | [Patch 7.56 Notes — The Lodestone (NA)](https://na.finalfantasyxiv.com/lodestone/topics/detail/a8a526ad64db45c8ca8d1c7fdcce8a5eedaa18bc) | 当前版本一手事实 | 7.56 内容：驯兽师受限职业、破戒之炉、零式取消周限+12%Echo、神典石周限 450→900、Occult Crescent/宇宙探索存在、Series 12、Pilgrim's Traverse 深层迷宫、Windurst 24人本进轮盘 |
| 2 | [FINAL FANTASY XIV 官方站](https://na.finalfantasyxiv.com/) / [fanfest 北美 2026](https://fanfest-na.finalfantasyxiv.com/2026/en-us) | 版本与活动 | 粉丝节时间线（2026-04 北美 → 2026-07 柏林 → 8.0） |
| 3 | [FINAL FANTASY PORTAL SITE — Patch 7.5 公告](https://na.finalfantasy.com/news/2816) | 7.5 公告 | 第 92 回制作人来信公布 7.5「Trail to the Heavens」 |

## 二、媒体报道（英文，可信度较高）

| # | 来源 | 用途 | 关键结论 |
| --- | --- | --- | --- |
| 4 | [RPGFan：Evercold Revealed at Fan Fest 2026（2026-04-24）](https://www.rpgfan.com/2026/04/24/final-fantasy-xiv-evercold-fan-fest-2026/) | **8.0 三大系统改动的一手现场报道** | ① 删除亚拉戈神典石，改每周自选进度（任务/副本/FATE/前线）② iLvl 绑定角色而非职业 ③ 副本三档难度（Normal/新中间档/Savage）④ 舞台为第四世界、寒冰主题、2027 年 1 月上线 ⑤ Variant Advanced(7.45) 是中间档先例 |
| 5 | [Star-Telegram：Bastion Is The First New Job In Evercold, A Dual-Greatshield Tank](https://www.star-telegram.com/entertainment/article316660111.html) | 8.0 新职业佐证 | Bastion = 双大盾坦克 |
| 6 | [Icy Veins：EU Fan Fest Keynote Digest](https://www.icy-veins.com/ffxiv/news/big-reveals-in-ffxivs-eu-fan-fest-keynote-digest/) | 柏林粉丝节汇总 | 待子代理核实细节 |
| 7 | [PlayStation Universe：Fan Fest Berlin 2026 Report](https://www.psu.com/news/final-fantasy-xiv-fan-fest-berlin-2026-report-bastion-job-final-fantasy-vii-content-more/) | 柏林粉丝节汇总 | 抓取失败（连接错误），待重试 |

## 三、中文二手源（已知有机器翻译讹误，仅作线索）

| # | 来源 | 用途 | 注意 |
| --- | --- | --- | --- |
| 8 | [17173：8.0 柏林粉丝节前瞻爆料（2026-07-28）](https://news.17173.com/content/07282026/110058629.shtml) | 8.0 细节线索 | 地图中文译名明显机翻（"船纳格尔法"等）；"仅某模式可体验坚城卫"含义不明，**待核实** |
| 9 | [17173：新职业新机制上线（2026-07-26）](https://news.17173.com/content/07262026/140306548.shtml) | 8.0 系统改动线索 | 装备等级复制、自动导航、World Raid、陆行鸟参战等**均待英文源核实** |
| 10 | [17173 最终幻想14 新闻列表](https://news.17173.com/) | 版本节奏线索 | 7.56 于 2026-09-08 维护/09-10 上线、09-13 驯兽师 BUG 紧急修复 |

## 四、参考实现（本地，非联网）

| # | 来源 | 用途 |
| --- | --- | --- |
| 11 | `E:\deepseek harness\_idlewow\`（从 `idle-wow-idle-wow-d4g1r2aai34b19686.webapps.tcloudbase.com` 无损还原的 wow-idle 源码，40 模块 / 32,761 行） | 作为放置游戏架构模板；还原报告见 `_idlewow/INDEX.md` |
| 12 | [TapTap：艾泽拉斯公会物语作者帖](https://www.taptap.cn/moment/842007464504197584?group_id=2999) | 参考实现的开发背景（AI 辅助、3 周开发、另有部署 idle-world.pages.dev、QQ 群 1046117607） |

## 五、抓取失败/受限来源（备查）

| 来源 | 状态 |
| --- | --- |
| `primagames.com`（Evercold EU Fanfest 报道） | 403（Cloudflare 拦截） |
| `icy-veins.com/ffxiv/bastion-guide` | 403 |
| `tech.yahoo.com`（Bastion 报道） | 403（地区限制） |

> 以上三个由子代理尝试其它镜像/来源补齐。
