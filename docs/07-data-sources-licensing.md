# 《最终幻想14》同人放置游戏 —— 数据源、API、开源工具与素材使用许可 / 法律边界调研

> **文档版本**：v1.0
> **核实日期**：2026-09-15（所有"现状"类结论均以该日期为准）
> **适用对象**：计划制作一款以 FF14 世界观/素材为基础的 **放置（idle/incremental）游戏** 的开发者
> **文档性质**：**条款汇编与风险提示**，不是法律意见。文中所有"风险等级"是调研者基于条款原文与公开案例的判断，不构成法律结论。凡是涉诉、涉商业化、涉大额投入的决策，请咨询执业律师。

---

## 0. 阅读指引与核心结论速览

### 0.1 本文档回答的七个问题

| 编号 | 问题 | 对应章节 |
|---|---|---|
| 1 | SE 的素材使用许可到底允许/禁止什么？署名怎么写？"非商业"怎么界定？ | [第 1 章](#1-官方素材使用许可materials-usage-license原文要点) |
| 2 | 用户协议里关于数据挖掘、第三方工具、插件是怎么写的？社区实际怎么执行？ | [第 2 章](#2-用户协议eula--服务条款中的数据挖掘与第三方工具条款) |
| 3 | 有哪些数据源/API 可用？2026-09 还活着吗？许可与限流如何？ | [第 3 章](#3-数据源与-api-现状截至-2026-09) |
| 4 | 已有的 FF14 同人/放置/工具项目怎么做的？被容忍还是被打？其他 MMO 呢？ | [第 4 章](#4-现有同类项目与法律先例调研) |
| 5 | 不用 SE 素材，能用什么免费/可商用素材？ | [第 5 章](#5-可安全使用的替代素材方案) |
| 6 | 风险分级与合规检查表 | [第 6 章](#6-风险分级清单与合规检查表) |
| 7 | 官方有没有专门的直播/视频/同人作品指引？ | [第 7 章](#7-视频直播音乐与同人作品专项指引) |

### 0.2 十条最重要的结论（详细依据见后文）

1. **官方确实有一份"素材使用许可"**，即 *FINAL FANTASY XIV Materials Usage License*（日文：**著作物利用条件**），2026-05-07 版为当前有效版本。它是一次**有限的、可撤回的、仅限非商业**的授权，不是"同人创作许可证"。
2. **该许可的核心目的被限定为"支持和发展 FF14 社区"**，且**明确以"网络上的使用"为主要场景**（官网/博客/SNS/视频站）。日文版第 1 条更直接把允许形态限定为"网络上的利用"和"婚礼/伴侣仪式"两类，并写明"**不能用于有形物**"、"**不能用于影像上映**"。
3. **商业化被全面禁止，且日文版的"商业/营利目的"定义远比英文版宽**：日文版原文为「利益の有無を問わず、現実社会において何らかの価値のある対価、報酬、謝礼を受けること及び、宣伝や広告に利用すること」——**不问是否盈利**，只要在现实世界收到任何有价值的对价/报酬/谢礼，或用于宣传广告，均属商业目的。**打赏、爱发电、Patreon、Ko-fi、赞助、付费 DLC、内购、把游戏当作自己其他产品的宣传入口——全部落在这一条里。**
4. **素材不得二次分发、不得实质性修改**。英文版明确"可以配自己的旁白，可以把 FF14 素材与**其他 FF14 素材**剪辑/混剪"，言下之意是**不能与第三方素材混剪**；日文版则是"不得进行过度加工/改変"。
5. **用户协议（EULA）明文禁止数据挖掘**。EU 版 User Agreement 第 2.5 条：*"You may not intercept, mine or otherwise collect information from the Game using unauthorised third party software."* 第 2.6、2.7 条禁止反编译与制作衍生作品，第 2.4 条禁止私服。日文版「禁止事項」另列「ゲームデータの改変、結合、リバースエンジニアリング、解析等の行為」「ユーティリティの作成、頒布等の行為」。
6. **但社区数据源（XIVAPI / Universalis / datamining 仓库 / Teamcraft / Garland）在事实上长期公开运行**，SE 未对其发起大规模下架；官方口径是"**不要传播挖掘出的数据**"（吉田直树 2022-05 官方公告原话：*"please refrain from disseminating mined data"*），并把**泄露未公开内容**列为可能采取法律行动的情形。这是"**条款上禁止、执行上选择性容忍**"的典型区域。
7. **音乐在 2026-05-07 发生了重大变化**：FF14 全部原创乐曲的音乐著作权已**信托给 JASRAC**。此后在互联网上使用 FF14 音乐数据，**必须使用与 JASRAC 签有概括许可（包括授权）的 UGC 服务**。X（Twitter）**不在**该名单内，因此**不能把带 FF14 BGM 的视频直接传到 X**；应传到 YouTube 等已签约服务后再贴链接。**对一款游戏而言，这意味着"内嵌 FF14 原曲"的风险显著上升。**
8. **"不商业化"并不等于"安全"。** 素材许可随时可被 SE「以其完全裁量」要求撤下；SE 官网《著作権について》还明确说明：即使是依著作权法第 30 条合法制作的私人复制件，只要在互联网上使用，在无权利人许可的情况下就侵害**公衆送信権**——**非营利个人主页也不例外，加 ID/密码访问限制也不能免除违法性**。
9. **同人"放置游戏"这个形态在 FF14 圈内几乎没有先例**，属于未被官方明确讨论过的灰区；而"私服/服务器模拟"是被 EULA 明文禁止且 SE 历史上采取过法律行动的红线。**放置游戏一旦涉及"复刻游戏内数值系统 + 完整游戏流程"，很容易被论证为"衍生作品"甚至"游戏模拟"，落入 EULA 2.7 与日文版禁止事项。**
10. **最安全的路径是"只借用世界观/名词的最低限度表达 + 100% 自制或 CC0/OFL 素材 + 完全免费无任何变现入口"**，并且**在明显位置同时放置商标声明与版权声明**，同时**准备好在被要求时立刻下架**。

### 0.3 不确定项（本文档中标注为 ⚠️ 的地方）

| 不确定项 | 说明 |
|---|---|
| ⚠️ 中文（简体）官方版素材许可 | 截至 2026-09-15 未检索到 SE 官方发布的**简体中文**版 FF14《素材使用许可》。国服（盛趣/世纪华通运营）有独立的用户协议与官方社区，但**未找到与日/英版对应的国服素材使用许可中文原文**。Square Enix West 的《素材使用政策》有简体中文版，但**明确声明不适用于 FINAL FANTASY 系列**（FF16 例外）。 |
| ⚠️ EU 版素材许可逐字文本 | 本次核实了 NA（英文，`support.na.square-enix.com`）与 JP（日文）两个版本的全文；EU 版（`support.eu.square-enix.com`，la=2/3/4）未逐字抓取，但结构与 NA 版一致，建议欧洲发行时自查。 |
| ⚠️ 2026-05-07 版相对上一版的全部差异 | Lodestone 公告（2026-05-07）明确说明的改动是 **JASRAC 信托** 与 **TikTok 曲目条款**；更早的公告（DAWNTRAIL EP7 等）是曲目清单扩充。是否存在其他未公告的措辞调整，未逐一 diff。 |
| ⚠️ "同人游戏"是否落在素材许可范围内 | 素材许可的允许形态文本（尤其日文版第 1 条）读起来是为**网站/博客/SNS/视频/婚礼**设计的，**没有提到"游戏"**。用该许可为"做一款游戏"背书，存在解释风险。 |
| ⚠️ 平台侧（Steam / App Store / Google Play / itch.io）对同人 IP 游戏的审核尺度 | 各平台政策与执行口径会变化，第 4 章给出实测口径，但请以发布当时的政策为准。 |
| ⚠️ 各第三方 API 的实时状态 | 第 3 章给出的可用性结论基于 2026-09-15 的公开信息（README、官网、公告）。服务的存续会变，请以实际调用结果为准。 |

---

## 1. 官方素材使用许可（Materials Usage License）原文要点

### 1.1 适用文本清单

| 文档 | 语言 | URL | 生效 / 修订 |
|---|---|---|---|
| FINAL FANTASY XIV Materials Usage License | 英文（NA） | https://support.na.square-enix.com/rule.php?id=5382&la=1&tag=authc | **Effective May 7, 2026** |
| ファイナルファンタジーXIV 著作物利用条件 | 日文 | https://support.jp.square-enix.com/rule.php?id=5381&la=0&tag=authc | 2013-06-12 生效 / **2026-05-07 改订** |
| Materials Usage License（EU 版） | 英/法/德 | https://support.eu.square-enix.com/rule.php?id=5383&la=2&tag=authc | 与 NA 版同步 ⚠️ 未逐字核对 |
| Square Enix West Material Usage Policy | 多语言含**简体/繁体中文** | https://www.square-enix-games.com/en_US/documents/materialusagepolicy | Last Updated 2024-07-11。**明确声明不适用于 FINAL FANTASY 等日本 IP**（FF16 例外） |
| ファイナルファンタジーXIV 禁止事項 | 日文 | https://support.jp.square-enix.com/faqarticle.php?id=5381&la=0&kid=68216 | 见第 2 章 |
| FINAL FANTASY XIV User Agreement（EU） | 英文 | https://support.eu.square-enix.com/rule.php?id=5383&la=2&tag=users | Effective 26 September 2024 |
| スクウェア・エニックス「著作権について」 | 日/英 | https://www.jp.square-enix.com/caution.html | — |
| Fan Site Kit（历史版本，2010） | 英文 | https://www.finalfantasyxiv.com/media/fansite/eu/ | Effective August 11, 2010（**已被后续许可取代，仅作沿革参考**） |
| FFXIV Fan Kit（当前） | 多语言 | https://na.finalfantasyxiv.com/lodestone/special/fankit/ | 下载前需同意软件许可 |

> **重要澄清（⚠️ 常见误解）**：在搜索引擎里搜 "Square Enix Material Usage Policy" 会先命中 Square Enix **West** 的政策页。该页开头就写明：
>
> > *"this Policy applies only to games developed and published by Square Enix's western division, not to games developed or published by Square Enix's Japanese affiliates… Accordingly, this Policy does **not** apply to any games in the following franchises: **FINAL FANTASY**, KINGDOM HEARTS, DRAGON QUEST, NieR, SPACE INVADERS… Notwithstanding the foregoing, this Policy **does** apply to FINAL FANTASY XVI."*
>
> 也就是说：**做 FF14 同人不能引用 West 政策来给自己背书**（FF16 是唯一例外）。FF14 适用的是上面那张表里的《Materials Usage License》/《著作物利用条件》。不过 West 政策在**商标/logo/不得暗示官方背书**等条款上，与 FF14 许可的取向一致，可作为理解 SE 整体立场的旁证。

### 1.2 授权范围：官方**允许**做什么

#### （A）可使用的素材范围（英文版原文）

> **Copyrighted and Trademarked Materials**
> This License applies to the following Materials:
> - All art, text, logos, videos, screenshots, images, sounds, music and recordings from FFXIV;
> - All art, text, logos, videos, screenshots, images, sounds, music and recordings from the official FFXIV website, official forums or any other official Square Enix channel;
> - The Final Fantasy XIV Fankit.
> - The following audio soundtracks: *FINAL FANTASY XIV: Battle Tracks*, *FINAL FANTASY XIV: Field Tracks*, …（**逐张列出**，截至 2026-05-07 已列到 `FINAL FANTASY XIV: DAWNTRAIL - EP8`）

日文版对应段落（「2. 利用できる著作物」）额外包含一句关键限制：

> - ファイナルファンタジーXIVゲーム内に表示されるテキスト、ゲーム中で撮影されたスクリーンショット、およびゲーム内で撮影された動画（**外部ツール等を利用して、データを改ざんしたものは除く**）
> - **※上記以外の著作物の利用はできません。**

> **中文要点**：日文版把"游戏内截图/录像"的可授权范围**明确排除**了"使用外部工具篡改过数据的"内容。这意味着**从游戏客户端解包出来的原始贴图/模型/表格数据，不在许可范围内**——许可是给你"从游戏里截图/录像"的，不是给你"解包资产"的。

#### （B）允许的使用形态（日文版第 1 条，最明确）

> **1. 利用できる形態**
> - ホームページやブログ等の外部サイト、ソーシャル・ネットワーキング・サービス、動画配信サービス等で公開する**インターネット上でのご利用**（以下「ネット上の利用」といいます）
> - ファイナルファンタジーXIVを通じて／きっかけとして結婚その他のパートナーシップを結ぶカップル限定の、セレモニーやパーティでのご利用（以下「ウェディング利用」といいます）
>
> ※**有体物へのご利用はできません。**
> ※ウェディング利用を除き、**映像の上映利用はできません。**
> ※コンサートや演奏会での楽曲利用は本条件の対象外となります…なお、ファイナルファンタジーXIVの楽曲は**有料のコンサートや演奏会には編曲の許諾をしておりません**。

| 允许形态 | 说明 | 对"做一款放置游戏"的含义 |
|---|---|---|
| 网络上的利用 | 网站、博客、SNS、视频平台 | ✅ 如果游戏是**网页游戏**且以"展示/社区"形态呈现，是最接近许可文本的形态 |
| 婚礼/伴侣仪式 | 需事前申请（表单 `https://sqex.to/EHb9b`，约 2 周答复，SE 可无理由拒绝） | ❌ 与游戏无关 |
| 有形物 | **明确不允许** | ❌ 实体周边、卡牌、桌游一律不行 |
| 影像上映 | 除婚礼外**明确不允许** | ❌ 线下放映、展会大屏演示 |
| 音乐会/演奏会 | 本条件外，需另按"演奏相关指引"申请；**收费演出不授予编曲许可** | ❌ 用 FF14 曲目办付费音乐会 |

#### （C）英文版的正面授权句

> *"Square Enix Co., Ltd., and Square Enix, Inc. (collectively "**Square Enix**") grants you permission to utilize certain materials as specified below (the "**Materials**") on a **non-commercial basis**, for the purpose of **supporting and developing the Final Fantasy XIV community**, in accordance to the following terms and conditions."*

> **中文要点**：授权是 (1) 非商业基础、(2) **目的限定**为"支持和发展 FF14 社区"、(3) 受下列全部条款约束。**"目的限定"很重要**：一款独立游戏是否属于"支持和发展社区"，解释权在 SE。日文版第 1 条更是把这个目的写进开篇："ファイナルファンタジーXIVのコミュニティ形成を支援することを目的として、**二次的に**ご利用になる場合"——"**二次性**"这个词本身就暗示了它面向的是"玩家创作的内容"，而不是"另一款游戏产品"。

### 1.3 禁止事项逐条对照

英文版（General Guidelines）+ 日文版（第 3 条 ①共同条件 / ②网络利用条件）逐条对照。**日文版与英文版不完全一致，日文版多处更严**，已用 ⚠️ 标出。

| # | 英文版原文 | 日文版原文 | 中文释义 | 对本项目的风险 |
|---|---|---|---|---|
| 1 | "You may not use the Materials for any **sales or commercial use**, meaning you cannot receive **license fees or advertising revenue**, except as part of the partner programs operated by YouTube, Twitch, or similar programs." | 「**商用・営利目的に利用することは禁止です。なお、「商用・営利目的」とは、利益の有無を問わず、現実社会において何らかの価値のある対価、報酬、謝礼を受けること及び、宣伝や広告に利用することをいいます。**」 | 禁止商业/营利使用。日文版把"商业/营利目的"定义为：**不问盈亏**，只要在现实世界收到任何有价值的**对价、报酬、谢礼**，或用于**宣传/广告**。 | 🔴 **最高风险条款**。日文口径下，**爱发电/打赏/赞助/Patreon/Ko-fi/赞助商**都算商业；用游戏给你别的产品导流也算。英文版只提"许可费或广告收入"，但日文版是 SE 的本土法域文本，且 FF14 由日本本部主导。**按日文口径自律最安全。** |
| 2 | "If you use a trademark (such as "Final Fantasy" or any related logo), then you must include a notice saying that the mark is owned by Square Enix, such as the following: **FINAL FANTASY is a registered trademark of Square Enix Holdings Co., Ltd.**" | 「本著作物を利用する際には、利用形態ごとに定める権利表記を付記してください。」 | 使用商标须标注权利归属。 | 🟡 必须做，成本低。 |
| 3 | "If you use any copyrighted Materials (such as screenshots or gameplay video), then you must include the following notice: **© SQUARE ENIX**" / "You may either use © SQUARE ENIX or the copyright text as it is shown in-game. Ex. © SQUARE ENIX CO., LTD. All rights reserved." | 「以下の権利表記を掲載してください。**© SQUARE ENIX** ※表記は1行で表示してください。※１ページの中に複数の本著作物が掲載されている場合には、個別の本著作物ごとではなくページ全体に1箇所の表記で構いません。※ゲーム中で撮影されたスクリーンショットに記載されている権利表記は、そのままご利用いただいて問題ありません。」 | 使用版权素材须标注 `© SQUARE ENIX`（**必须一行显示**；同一页面多素材可只标一次；截图自带的版权字样可保留原样）。 | 🟡 必须做。注意"一行"这个排版要求。 |
| 4 | "You may not sell the Materials to third parties as original content;" | —（日文版以"商用禁止"覆盖） | 不得把素材当作自己的原创内容卖给第三方。 | 🔴 直接封死"卖素材包""卖游戏"的路径。 |
| 5 | "You may not use the Materials to promote other commercial products;" | 「…及び、**宣伝や広告に利用する**ことをいいます。」 | 不得用素材宣传其他商业产品。 | 🔴 游戏不能成为其他商品的广告位。 |
| 6 | "You may not **materially alter or modify** the Materials, except: You may add your own voice-over, and you may edit, combine, mash-up, mix and match the Materials **with other FFXIV Materials**;" | 「**過度な加工・改変を行ってはいけません。**」 | 不得实质性修改素材。英文允许的唯一例外是：加自己的旁白 + **FF14 素材之间**的剪辑混合。 | 🔴 **对游戏至关重要**：把 FF14 立绘做成 Q 版、把 BGM 做 8-bit 改编、把贴图改成 UI 图标——**都落在"实质性修改/过度改変"里**。 |
| 7 | "You may not **alter, remove or conceal** any trademark or copyright notices that may be included in the Materials;" | —（对应署名条） | 不得改动/移除/遮挡素材内的商标或版权标识。 | 🟡 保持原样即可。 |
| 8 | "You must **immediately comply with any request by Square Enix to remove** any Materials, **in Square Enix's sole discretion**;" | 「株式会社スクウェア・エニックス…から依頼のあった場合には、**遅滞無く**著作物の掲載、利用を中止していただきます。」 | SE **单方裁量**要求下架时必须**立即**配合。 | 🔴 **这是最根本的风险**：授权本质上是"随时可撤回的恩惠"，不是权利。 |
| 9 | "You agree not to use any Materials in conjunction with any of the following: unapproved Square Enix assets; counterfeit merchandise; pornography; unlicensed Square Enix music available for streaming or download, or links to unlicensed Square Enix music available for streaming or download." | （日文版以其他条款覆盖） | 不得与非授权 SE 资产、盗版周边、色情内容、未授权 SE 音乐（或其链接）并用。 | 🟡 注意"未授权 SE 音乐"——不要链接到粉丝自制的原声下载。 |
| 10 | "In relation to any functions within the game which allow you to perform virtual musical instruments ("performance actions"), you are **strictly prohibited from performing the music of any third parties**…" | 「ゲーム内の「楽器演奏」を使用している動画については、演奏されている楽曲がファイナルファンタジーXIVゲーム内で使用されている楽曲の場合に限りネット上に公開することができます。」 | 游戏内"演奏"功能：**严禁演奏第三方曲目**；录制分享仅限 FF14 原乐曲。 | ⚪ 与放置游戏无直接关系（除非你做"演奏"小游戏）。 |
| 11 | — | 「**本条件に基づく本著作物の利用は日本国内に限定されます。**」 | ⚠️ 日文版：**基于本条件的利用仅限日本国内**。 | 🟠 **这是一个被普遍忽略的条款**。若你面向全球发行且以日文版为授权依据，文本上存在地域冲突。英文版无此限制。 |
| 12 | — | 「**有体物へのご利用はできません。**」/「**映像の上映利用はできません。**」 | 日文版：不得用于有形物；不得用于影像上映。 | 🟠 实体周边/线下放映明确不行。 |
| 13 | — | 「他者を誹謗・中傷する目的で使用してはいけません。」 | 不得用于诽谤中伤他人。 | 🟡 与游戏内容相关（避免真实玩家 ID/工会名）。 |
| 14 | — | 「本著作物を利用している状態で、ファイナルファンタジーXIV利用規約やスクウェア・エニックス アカウント規約で禁止されていることを行ってはいけません。」 | 使用素材时不得违反 FF14 用户协议/SE 账号协议。 | 🔴 **联动条款**：素材许可与 EULA 绑定。EULA 禁止数据挖掘 → **用挖掘数据做的内容，同时违反素材许可第 (2) 项**。 |

### 1.4 "非商业"到底怎么界定

这是全文最关键、也最容易踩雷的一条。三份文本的口径**宽严不一**：

| 文本 | 原文 | 口径 | 打赏/赞助 | YouTube 广告分成 | 付费墙 |
|---|---|---|---|---|---|
| **FF14 Materials Usage License（EN）** | "you cannot receive license fees or advertising revenue, **except as part of the partner programs operated by YouTube, Twitch, or similar programs**" | 窄（只点名许可费与广告收入） | ❓ 未提 | ✅ 明确允许 | ❌ 视频不得要求付费会员观看 |
| **FF14 Materials Usage License（EN）例外** | "As an exception, this restriction against commercial use will not be enforced against **influencers** for earning revenue or wages **from corporate entities through the streaming of gameplay**." | — | — | — | 仅覆盖"直播游戏"的 KOL 从企业拿钱 |
| **FF14 著作物利用条件（JP）** | 「「商用・営利目的」とは、**利益の有無を問わず、現実社会において何らかの価値のある対価、報酬、謝礼を受けること**及び、**宣伝や広告に利用すること**をいいます。」 | **极宽**（不问盈亏、任何对价/报酬/谢礼、任何宣传用途） | ❌ **算** | ❌ 原则上算（JP 版另条认可 YouTube/Twitch 官方 partner 功能） | ❌ |
| **Square Enix West Policy**（不适用 FF14，仅参考） | "**No Commercial Use:** Do not use Square Enix materials to make money or gain any other financial benefit… However, we do allow you to monetize content via advertising through **platform-operated programs** on YouTube, Twitch, Mixer, and other similar services." | 中 | ❌ | ✅ | ❌ |

日文版另有两条对"平台分成"的开口：

> 「(6) YouTube、Twitch等の動画投稿サイトが**正式に提供するパートナー機能等**を使用する場合は「商用・営利目的」とは見なしません。」
> 「(7) ゲームプレイの配信を行うことで法人から給与その他の報酬を得ている立場の方が、本条件に従ってネット上の利用であるファイナルファンタジーXIVの**プレイ動画を配信すること**は、「商用・営利目的」とは見なしません。」

> **风险提示（非法律意见）**：
> - 这两条例外都是为**"游戏实况/视频发布"**写的，不是为**"另一款游戏产品"**写的。
> - 一款放置游戏**没有任何"游戏实况"属性**（它本身就是被玩的产品），因此**几乎不可能套用这两条例外**。
> - 因此，**只要放置游戏里出现"任何形式的收款或流量变现"，在日文口径下就是商业使用**——包括：游戏内购、广告位、赞助位、打赏按钮、会员制、把游戏挂在某个付费产品页面上引流。
> - **最保守做法：不设置任何收款入口，不投放广告，不做任何形式的变现，并且在页面上不出现任何"赞助我们""Buy me a coffee"字样。**

### 1.5 署名与免责声明的官方模板

#### （A）官方给出的现成模板（可直接照抄）

**商标声明（英文版强制模板）**：

```
FINAL FANTASY is a registered trademark of Square Enix Holdings Co., Ltd.
```

**版权声明（英文/日文版强制模板）**：

```
© SQUARE ENIX
```

- 日文版明确：**必须一行显示**（「※表記は1行で表示してください」）。
- 同一页面有多份素材时，**整页标一次即可**（「個別の本著作物ごとではなくページ全体に1箇所の表記で構いません」）。
- 也可以用游戏内显示的完整形式：`© SQUARE ENIX CO., LTD. All rights reserved.`

**历史版本（2010 Fan Site Kit）的模板**（已非现行，仅供理解 SE 期望的格式）：

```
FINAL FANTASY XIV ©2010 Square Enix Co., Ltd.
FINAL FANTASY is a registered trademark of Square Enix Holdings Co., Ltd.
All material used under license.
```

#### （B）建议的页面署名版式（自行组织，非官方文本）

```html
<!-- 页脚建议（示例，需按实际使用情况调整） -->
<footer>
  <p>© SQUARE ENIX</p>
  <p>FINAL FANTASY is a registered trademark of Square Enix Holdings Co., Ltd.</p>
  <p>本作品为粉丝制作的同人作品，非 Square Enix 官方产品或关联产品，
     未获得 Square Enix 的赞助、认可或背书。</p>
  <p>本作品免费提供，不含任何形式的收费、内购或广告。</p>
</footer>
```

> ⚠️ **注意**：上面第三、四行（"非官方、无背书、免费"）**不是官方模板**，而是源于以下两处官方要求的自制表述：
> - FF14 许可要求不得让第三方误认为与 SE 有关联（对应 West 政策更直白的表述：*"You must make clear that your content is **not sponsored or endorsed by** Square Enix. It's a problem if someone might think your content or channel is official."*）
> - 日文版用户协议第 3.4 条「なりすまし行為」禁止让人误认为是 SE 员工/官方
>
> 这类"非官方声明"是行业通行的自我保护做法，但**SE 并未对 FF14 给出统一模板**，⚠️ 属于不确定项。

#### （C）Logo 使用

- FF14 素材许可把 **logos** 列入可授权素材（"All art, text, logos, videos, screenshots…"）。
- 但 **Square Enix West 政策明确写 "Use of our logos is not permitted at all."**（该政策**不适用** FF14，仅作对照）。
- ⚠️ **结论**：FF14 素材许可文本上把 logo 列入了 Materials，但 SE 在别的场合表达过"logo 完全不许用"的立场，且 logo 同时受商标法约束。**建议：不要使用 FF14 的标题 Logo / 公司 Logo，只使用纯文本游戏名与版权声明。**这是零成本规避。

### 1.6 SE 官网"著作权について"的补充规则（对"非商业也违法"的明确说明）

来源：https://www.jp.square-enix.com/caution.html

> **「私的使用のための複製」とインターネット上での著作物の複製物の使用について**
> 著作権法は、著作権の制限規定として「私的使用のための複製」（著30条）を定めておりますが、同制限規定により著作物の複製物が合法的に作成された場合であっても、当該複製物を著作権者の許諾なくインターネット上で使用した場合、法令により許される場合を除き、「公衆送信権（自動公衆送信における送信可能化権を含む）」（著23条）の侵害となります。**これは、非営利目的である個人のホームページ上における使用であっても例外ではなく、また、ID、パスワードによるアクセス制限を施しても違法性が阻却される訳ではありません**のでご注意ください。

**官方英译**：

> *"It should be noted that use of such copy on even a **personal non-profit website is not exempted** from liability for copyright infringement, and that adopting **access control using IDs and passwords will not remove the illegality**."*

> **中文要点**：这一页把"素材使用许可"的地位说得很清楚——**许可是"额外的恩惠"，不是"合法的必要前提"**。没有许可的使用本身就是侵权；有了许可但超出许可范围（例如用于商业），同样回到侵权状态。**"我只是个免费的粉丝小站"不构成抗辩，"加密码"也不构成抗辩。**

### 1.7 许可的效力与准据法（技术性条款）

| 项目 | 英文版内容 |
|---|---|
| 接受方式 | *"You agree to its terms by **using any Materials** (as identified above), and to any changes to this Agreement by using any Materials after such changes are posted."* —— **使用即视为接受**，且后续改动也自动约束你 |
| 完整协议 | 本协议为双方就本标的的完整协议，取代此前一切书面/口头协议 |
| 准据法 | **美国加州法**（排除冲突法规则） |
| 管辖 | **洛杉矶县**联邦与州法院专属管辖，不可撤销同意 |
| 免责 | Materials 按 "as is" 提供，SE 不作任何明示/默示/法定担保；SE 对间接、附带、特殊、惩罚性损害（含利润损失、业务损失）**概不负责** |
| 终止 | 日文版无独立终止条款；West 政策版本有「Either party may terminate this Agreement for any reason. Upon termination, you agree to stop using the Materials.」 |
| 违约救济（2010 版） | 「Any breach of this Agreement would result in irreparable harm to Square Enix. Accordingly, if you breach this Agreement, Square Enix will be entitled to appropriate **equitable remedies without bond, security or proof of damages**…」 |

> **风险提示**：
> - 准据法为加州法 + 洛杉矶专属管辖，对**中国开发者**意味着：一旦 SE 在美国起诉，你需要在加州应诉。SE 在实践中更常用 DMCA 下架（成本极低），而非跨国诉讼，但**"下架"本身就足以终结一个项目**。
> - DMCA 流程（英文版 Take-down Notices 一节）：SE 指定代理为 *Attn: DMCA Agent, Legal Department, 999 N. Pacific Coast Highway, 3rd Floor, El Segundo, California 90245, USA*。
> - 收到 DMCA 后，托管方（GitHub / itch.io / Netlify / Vercel / 阿里云）通常会在**数小时至数日内**下架，**下架速度远快于你的申诉速度**。这是放置游戏最现实的"死亡方式"。

### 1.8 关于"素材二次分发"的边界（重点：哪些能放进游戏包）

| 行为 | 条款依据 | 判断 |
|---|---|---|
| 在自己的网页里嵌一张游戏截图 | 许可明确允许（screenshots 属 Materials） | 🟢 低风险（需署名） |
| 把游戏截图**下载后打包进游戏安装包** | 许可允许"网络上的利用"，但打包分发**不是典型的网络利用**；且日文版强调"二次的"利用 | 🟠 中风险。建议**运行时从你自己服务器加载**或**不打包原始素材** |
| 把解包出来的贴图/模型放进游戏 | 日文版「外部ツール等を利用して、データを改ざんしたものは除く」+ EULA 2.5/2.6/2.7 | 🔴 高风险——既不在素材许可范围内，又违反 EULA |
| 把 FF14 BGM 放进游戏包循环播放 | 「音楽データについては、ファイナルファンタジーXIVのゲーム内で撮影した**画像や動画などの素材を使用した動画にのみ**利用できます」 | 🔴 高风险——音乐**只能**用于"包含 FF14 游戏内影像素材的视频"，**游戏不是视频** |
| 把游戏内文本（技能名、地名、任务文本）抄进游戏 | 许可允许 art/text 的使用，但不得"materially alter"，且**文本的完整复制可能构成对剧情表达的复制** | 🟠 中风险。技能名/地名等**单词级**使用风险低；**成段剧情文本**风险高 |
| 把游戏数值表（技能威力、物品属性）抄进游戏 | 数值本身争议大（可能被视为"事实/数据"而非"表达"），但**获取方式**（datamining）违反 EULA | 🟠 中风险且**取决于数据来源**。第 3 章给出各数据源的许可差异 |

### 1.9 素材许可的"历史沿革"（理解 SE 态度的收紧趋势）

| 时间 | 事件 | 链接 |
|---|---|---|
| 2010-08-11 | 最早一批 *FINAL FANTASY XIV Materials Usage Policy* 随 Fan Site Kit 发布（当时还明确排除"游戏内视频/音乐/人声轨道"） | https://www.finalfantasyxiv.com/media/fansite/eu/ |
| 2013-06-12 | 日文版《著作物利用条件》生效（现行文本的起点） | https://support.jp.square-enix.com/rule.php?id=5381&la=0&tag=authc |
| 2019 / 2021 / 2023 / 2024 | 多次修订，主要是**扩充可授权原声专辑清单**与**增补视频/音乐/TikTok 条款** | Lodestone "Materials Usage License Revised" 系列公告 |
| **2026-01** | 修订以纳入 *FINAL FANTASY XIV: DAWNTRAIL - EP7*（2026-01-14 发行） | https://eu.finalfantasyxiv.com/lodestone/news/detail/40bce1369bf982da02972f845c5ff7f3fa800699 |
| **2026-05-07** | **全部原创乐曲音乐著作权信托给 JASRAC**；《著作物利用条件》随之更新；英文版标注 Effective May 7, 2026 （另纳入 TikTok 曲目条款） | https://jp.finalfantasyxiv.com/lodestone/news/detail/41c6b418731738efb829aec618e2fbe7a12456b1 |

> **趋势判断**：许可文本在**扩张**（更多专辑被纳入），但同时在**收紧**（音乐改由 JASRAC 集体管理、视频平台范围被收窄）。**对"把 FF14 音乐当成免费 BGM 库"的用法，2026 年是一个明确的转折点。**

---

## 2. 用户协议（EULA / 服务条款）中的数据挖掘与第三方工具条款

> 这一章与第 1 章是**两条独立的约束线**：第 1 章约束"你怎么用素材"，这一章约束"你怎么接触游戏本体"。**两者叠加**——违反 EULA 挖数据，再用这些数据做同人内容，等于同时踩两条线（素材许可第 (2) 项明确要求你不得违反 EULA）。

### 2.1 EU 版 User Agreement（英文，Effective 26 September 2024）原文逐条

来源：https://support.eu.square-enix.com/rule.php?id=5383&la=2&tag=users

#### （A）第 2 条 License Limitations 的开篇警告

> *"The Game is a carefully controlled environment designed to provide the maximum level of enjoyment for all players. In order to preserve an enjoyable experience for all users, and to **protect the intellectual property rights of SQUARE ENIX**, the activities identified in this Clause 2 ("License Limitations") are **strictly prohibited**…"*
>
> *"Infringing these License Limitations may result in the suspension or permanent banning of your FINAL FANTASY XIV Service Account… **or an action for copyright infringement or other legal claims**, all of which are reserved by us. **Offering or providing banned services to other players of the Game is improper interference with SQUARE ENIX's contracts with such players, and we may take formal legal action against you if you do so, without warning.**"*

> **中文要点**：特别注意最后一句——**"向其他玩家提供被禁止的服务"本身构成对 SE 与玩家之间合同的"不当干预"（improper interference / 第三人侵害债权）**，SE 可**不经警告直接采取法律行动**。这是比"你自己用外挂被封号"严重得多的法律定性，**直接指向"做工具/做服务的第三方"**。

#### （B）与数据挖掘直接相关的条款原文

| 条款 | 英文原文 | 中文释义 | 对放置游戏的含义 |
|---|---|---|---|
| **2.1 Cheating and Botting** | "You may not create or use any **cheats, bots, automation software, hacks, mods or any other unauthorised software designed to modify the Game and gameplay**. In addition, you may not take advantage of game system bugs and exploits during gameplay." | 禁止制作或使用任何作弊、机器人、自动化软件、黑客程序、Mod 或其他旨在修改游戏及玩法的未授权软件。 | 🟡 如果放置游戏**不接入真实游戏客户端**，不触发本条。若做"自动挂机脚本"则 🔴。 |
| **2.2 RMT, Farming and Fraudulent Transactions** | "You may not sell, rent, hire, borrow against, purchase or exchange for real-world money or value any in-game currency, accounts, characters, in-game services, or in-game virtual items…" | 禁止现实货币与游戏内货币/账号/角色/服务/道具的交换。 | 🟡 若放置游戏里卖"FF14 金币"🔴；纯虚拟无对价则无关。 |
| **2.3 Commercial Use** | "You may not exploit the Game for any commercial purpose (for example, advertising any product or service in-game, or use by the operator of a cyber café) **without SQUARE ENIX's prior written consent**." | 未经 SE **事先书面同意**，不得将游戏用于任何商业目的（例：在游戏内为产品或服务做广告、网吧运营）。 | 🟡 注意路径：**SE 是有"事先书面同意"这个正式渠道的**，理论上可申请。 |
| **2.4 Private Servers** | "You may not **create, operate, participate in or use any unauthorised servers intended to emulate the Game**." | 禁止创建、运营、参与或使用任何意图**模拟本游戏**的未授权服务器。 | 🔴 **红线**。若放置游戏包含"服务端模拟/私服"性质的复刻，本条会被援引。 |
| **2.5 Data Mining** | "You may not **intercept, mine or otherwise collect information from the Game using unauthorised third party software**." | 禁止使用未授权第三方软件**截取、挖掘或以其他方式从游戏中收集信息**。 | 🔴 **最直接相关的条款**。任何"从客户端/网络流量提取游戏数据"的行为都被此条覆盖。 |
| **2.6 Hacking and Circumvention** | "You may not hack, **disassemble, decompile**, or otherwise **modify the Game or server computer code**, whether the Game code is located on a DVD, Blu-ray disc, your computer/console or on SQUARE ENIX's servers, **except as expressly permitted by SQUARE ENIX or applicable law**." | 禁止反汇编、反编译或以其他方式修改游戏或服务器代码。**例外：SE 明示许可，或适用法律允许。** | 🔴 解包/逆向 = 本条。注意"**or applicable law**"给了各法域"互操作性例外"（如 EU 软件指令、日本著作权法第 47 条之 6 等）一点空间 —— ⚠️ 但这属于法律论证层面，不是开发者的安全垫。 |
| **2.7 Modifying or Creating Derivative Software** | "You may not modify or cause to be modified any files that are a part of the Game or Service in any way not expressly authorised by SQUARE ENIX, and **may not make any derivative works of the Game**." | 不得修改游戏文件，**不得制作游戏的衍生作品**。 | 🔴 **对"同人游戏"最危险的一条**。"衍生作品（derivative works）"在著作权法上范围很宽，**一款复刻游戏机制的放置游戏是否构成衍生作品，是核心法律争点**。 |
| **2.8 Spamming / Commercial, Political or Ideological Communication** | "You may not use (or abuse) the in-game chat and/or message services to distribute advertisements, promote any political, ideological or religious ideas…" | 禁止在游戏内聊天/消息服务中发广告、宣传政治/意识形态/宗教。 | ⚪ 与放置游戏基本无关（除非你在游戏内拉人）。 |
| **2.9 Non-transferable** | "Your FINAL FANTASY XIV Service Account is non-transferable…" | 服务账号不可转让。 | ⚪ 基本无关。 |

#### （C）第 3 条 Prohibited Activities 中的相关项

| 条款 | 原文要点 | 相关性 |
|---|---|---|
| 3.1 Sharing Account Information | 不得分享账号/登录信息 | ⚪ |
| 3.2 Disruption | 不得干扰其他玩家或 SE 服务器 | 🟡 若爬虫对 Lodestone/游戏服务器造成压力，可能被定性为 disruption |
| 3.4 Impersonation | "You may not impersonate any person or entity or **fraudulently hold yourself out as a SQUARE ENIX employee, representative**, or any other SQUARE ENIX-connected person" | 🟠 **与素材许可"不得暗示官方背书"呼应**。游戏界面不得使用 SE 官方视觉语言（如官方 Logo、官方频道风格） |
| 3.5 Names Of Characters | "You may not use any name or other intellectual property belonging to SQUARE ENIX or any other third party **in your use of the Game**" | ⚪ 限于游戏内角色命名 |

#### （D）第 3 条的执法手段清单（原文）

> - Issuing a warning;
> - Placing a character in a "virtual jail" for a specified period of time;
> - Removing or deleting ill-gotten in-game items or currency;
> - Temporarily suspending a FINAL FANTASY XIV Service Account;
> - Permanently terminating a FINAL FANTASY XIV Service Account;
> - Permanently banning your IP address or residential address, or requesting our payment processing agent to permanently ban your credit card number;
> - **Bringing a claim against you for breach of contract, copyright infringement, or other claims that may be applicable**; and/or
> - **Asking a court to prevent you from continuing such activity.**

> **中文要点**：SE 的合同工具箱里**明确包含"合同违约索赔""著作权侵权索赔"以及"向法院申请禁令"**。最后一项（禁令）对独立开发者是毁灭性的——**诉讼成本远大于项目价值**。这解释了为什么 SE 事实上几乎只需要发一封律师函或 DMCA 就能达成目的。

### 2.2 日文版「禁止事項」原文逐条

来源：https://support.jp.square-enix.com/faqarticle.php?id=5381&la=0&kid=68216

日文版把最相关的两条放在「**ゲームバランスを崩壊させる行為**」标题下：

> **ゲームバランスを崩壊させる行為**
> 不正プログラムや外部ツールの使用は、ゲームバランスを崩壊させる行為として禁止しています。またプレイヤーが不在でも何らかの道具を用いたり、不正プログラムや外部ツール等を使用したりすることにより、**自動的に特定の行動を繰り返させ続ける行為は「不在プレイ」として禁止**されており、当社によって禁止行為に該当する内容が確認された場合は、ペナルティが科されます。不在プレイなどの調査のためにゲームマスター(GM)がプレイヤーに話しかけて確認することがあり、GMからの指示に従わずに行動を取り続けた場合は不在プレイとみなされ、ペナルティの対象となります。
>
> その他にも以下の行為が禁止されています。
> **・ゲームデータの改変、結合、リバースエンジニアリング、解析等の行為**
> **・ユーティリティの作成、頒布等の行為**

| 日文原文 | 中文释义 | 含义 |
|---|---|---|
| ゲームデータの改変、結合、**リバースエンジニアリング**、**解析**等の行為 | 对游戏数据进行修改、结合、**逆向工程**、**解析**等行为 | 🔴 **"解析"（= 分析/解析数据）被明文列为禁止行为**。这与英文版 2.5 Data Mining 一一对应 |
| **ユーティリティの作成、頒布等の行為** | **制作、发布"工具（utility）"等行为** | 🔴 **比英文版更进一步**：不只是"使用"，而是"**制作和分发**"本身就违规。英文版 2.1 说的是 "create or use"，方向一致 |
| **不在プレイ**（AFK play） | 玩家不在场时用道具/程序/外部工具**自动重复特定行为** | 🔴 这条与"放置游戏"的**字面语义**惊人地接近。虽然它规范的是"在真实 FF14 里挂机"，但如果你做的放置游戏试图与真实客户端产生任何联动（例如自动采集），直接命中 |

> **⚠️ 重要提醒（语义陷阱）**：日文禁则中的「**不在プレイ**」字面意思就是"不在场游玩/挂机"，与中文的"放置游戏"高度重合。**这里必须区分**：
> - **规范对象**：在**真实的 FF14 客户端内**，玩家不在场时自动化游戏行为。
> - **不覆盖**：**另一款独立开发的、不连接 FF14 服务器的游戏**里，玩家离线时角色继续积累资源。
>
> 但这意味着：**如果你的放置游戏宣传语是"FF14 挂机版""自动帮你刷 FF14"**，会在**语义上**把自己推到「不在プレイ」这个词的射程里，也会让 SE 的审核者产生"这是外挂"的第一印象。**命名与宣传语需极力避免"挂机""自动""代替你玩 FF14"这类表述。**

### 2.3 官方立场：吉田直树的正式公告（第三方工具与数据挖掘）

**这是理解"官方实际态度"最重要的一手材料。**

来源（官方 Lodestone Topic，2022-05-09）：https://na.finalfantasyxiv.com/lodestone/topics/detail/36c4d699763603fadd2e61482b0c5d56cb2e4547
标题：**Regarding Third-party Tools**

原文摘录（英文版）：

> **Use of Third Party Tools**
> As stated in the terms of service for FINAL FANTASY XIV: **the use of third-party tools is strictly prohibited**. Players who are determined to be using third-party tools will have their accounts suspended, or permanently banned for repeat offenses.
>
> **Defining Third Party Tools**
> We have received requests from players asking that we define what tools are and aren't permissible, but to do so would require an assessment of all third-party tools available on the internet, as well as all gaming devices and their functionality. Unfortunately, such an undertaking is physically impossible, which is why we decided to **simply prohibit the use of all third-party tools and software**.
>
> …here are a few examples of the rule violations we **prioritize for investigation**:
> - **Use of tools that allow players to more easily complete content.**
> - **Modification of the UI to display additional information.**
> - **Use of packet spoofing tools.**
> - **Any actions or public statements that promote use of third-party tools.**
>
> **Data Mining and Screenshot Leaks**
> Due to an oversight on the development team's part, model data for Dragonsong's Reprise was present in patch 6.08 data. The data was mined, and the appearance of the raid's final boss was made public. Such data is normally masked and cannot be discovered, but this time it slipped through our checks.
>
> In addition, at virtually the same time the patch was released, a screenshot from a phase that players had yet to reach was leaked. We believe it came from an insider, and are in the middle of a thorough investigation…
>
> **Such leaks are utterly unacceptable**, for they not only undermine the efforts of the development and operation teams, but also take away from our players' enjoyment. Previously, when a major leak occurred prior to the release of Shadowbringers, we succeeded in identifying the culprit and **took legal action**. That there has been another leak despite this is deeply concerning, and in addition to bringing the offender to account, we'll take measures to prevent a repeat of the situation.
>
> Now, be it graphical resources or something else, there may be **legal ramifications for mining private data via illicit means with the intent to make it public**. Perhaps due to high interest, however, **we've been seeing websites that openly release mined graphical data**. As a show of our admiration for those who clear ultimate raids, we design their reward weapons to be as eye-catching as possible, and to widely spread their images outside of the game could diminish players' motivation to earn them. I've made this request before, and I make it again: **please refrain from disseminating mined data**.
>
> **Server Emulation**
> …**FFXIV is run by a variety of independent programs operating on a multitude of specialized servers, so to completely emulate its server environment outside our infrastructure is impossible**—it would cost tens of millions of yen just to obtain the necessary servers. Without these servers and their proprietary programming, while one could potentially pull the client software and display model data and the like, the game itself will not operate.
>
> Even if one were to somehow accomplish such a feat, it would still be **physically impossible to run the unique programming introduced to the servers upon the application of each patch before the patch is even released**. The progression timeline for each duty exists solely within this server-side code, and is never included in the patch data downloaded to players' clients.

**从中提炼的官方态度分层**：

| 行为 | 官方口径 | 实际严厉程度 |
|---|---|---|
| 在**真实游戏内**使用第三方工具（伤害统计、UI 增强、机制提示） | "strictly prohibited"，优先调查四类 | 🟠 高（但执法资源有限，见 2.4） |
| **公开推广**第三方工具（"actions or public statements that promote use"） | 明确列为优先调查项 | 🔴 **对"做成产品发布"的人是重击**——你在做等价于"推广工具"的事 |
| **挖掘并公开**游戏数据 | "legal ramifications… with the intent to make it public"；"please refrain from disseminating mined data" | 🔴 高。**注意官方用词的分寸**：反对的核心是"**公开传播（disseminating / make it public）**"，尤其针对未发布内容 |
| **服务器模拟（私服）** | 技术上"不可能完全模拟"，但 EULA 2.4 明文禁止 | 🔴 最高。EULA 层面直接违规，与"技术上做不到"无关 |
| 泄露**未发布内容**（insider leak） | "utterly unacceptable"；历史上"took legal action" | 🔴🔴 最高。SE 会动用法律手段 |

> **对放置游戏的关键推论**：
> 1. 官方反对数据挖掘的**重点是"泄露未发布内容"与"传播封闭数据"**，而不是"引用公开的、已经上线多年的游戏数值"。
> 2. 但**获取方式**仍被 EULA 2.5/2.6 禁止，且日文版把"解析"写进禁止事项。**"我知道这东西早就是公开的"不是抗辩理由**——这是"条款"与"执行"的分离。
> 3. **"公开推广"是被点名的高危行为**。一款游戏的发布，天然是"公开推广"。**这是放置游戏与"一个安静的粉丝 Wiki"之间的本质差别。**

### 2.4 社区实际执行情况（条款 vs 现实）

| 现象 | 事实 | 来源 / 备注 |
|---|---|---|
| **XIVAPI / Universalis / Garland Tools / Teamcraft 长期公开运营** | 这些站点多年来为整个社区提供 FF14 数据与市场板数据，**未见 SE 对其提起大规模诉讼** | ⚠️ 未见官方明确的"默许"声明；属于**容忍（toleration）而非授权** |
| **ACT（Advanced Combat Tracker）+ 各类 FF14 解析插件** | 长期被大量玩家使用；SE 口头上禁止，实际执法集中在"世界首杀竞速"等公开场合 | 吉田 2022 公告；2022 年 Dragonsong's Reprise 世界首杀因使用第三方工具被**撤销官方祝贺** |
| **Dalamud 插件平台** | 长期存活，且**国服有独立的 DalamudPluginsCN-Dev 项目**（https://github.com/gamous/DalamudPluginsCN-Dev） | ⚠️ 极为敏感的灰区；插件平台多次与 SE 立场冲突 |
| **GShade（2023 事件）** | 某次更新中加入了"检测到特定第三方工具则重启游戏"的逻辑，引发大规模反弹，作者随后撤回 | 说明**工具作者与 SE 社区政策之间的对抗是真实存在的** |
| **玩家追踪插件 / 骚扰工具（2025 事件）** | 吉田公开谴责某允许追踪玩家的 Mod，并**威胁采取法律行动** | 新闻报道：Square Enix condemns Final Fantasy 14 "stalking" mod and threatens legal action（gamesindustry.biz）；eSports.net 报道 *FFXIV Devs Will Pursue Legal Action Against Player Tracking Plug-In* |
| **私服** | EULA 2.4 明文禁止；SE 对私服的历史立场是明确的反对 | ⚠️ 具体诉讼案例未在本次调研中逐一定位 |
| **Lodestone 数据抓取** | 无官方 API，社区大量使用爬虫；SE 未采取系统性阻断 | ⚠️ 但 EULA 3.2「Disruption」可被援引（如爬虫压力过大） |

> **风险提示（非法律意见）**：
> 社区普遍存在一种"SE 不管"的印象。但需要注意的是：**被容忍的绝大多数是"工具（tool）"和"数据库（database）"，而不是"另一款游戏（game）"。**
> - 工具/数据库的定性是"辅助玩家玩 FF14"——看起来更接近"支持社区"。
> - 一款放置游戏的定性是"一款用了 FF14 IP 的游戏产品"——它**直接与 SE 的商业利益（自家 FF 系列手游/衍生作）潜在竞争**，且更接近 EULA 2.7 的"衍生作品"。
> - 因此，**"XIVAPI 都活着，所以我也能活"是一个危险的类推**。

### 2.5 EULA 相关条款速查表

| 你的行为 | 可能触发的条款 | 风险 |
|---|---|---|
| 从游戏客户端解包 CSV/贴图/模型 | EULA 2.5 Data Mining / 2.6 Hacking / 2.7 Derivative；日文禁则「解析」「リバースエンジニアリング」 | 🔴 |
| 使用他人已解包并公开的数据表 | 你自己不挖，但**使用挖掘成果**可能构成对 EULA 2.7 的"参与"或对素材许可第 (2) 项的违反 ⚠️ | 🟠 |
| 调用第三方 API（XIVAPI 等）拿公开数据 | 你自己未违反 EULA；风险转移给 API 运营方 | 🟢（但需遵守该 API 自己的条款） |
| 抓取 Lodestone 网页 | EULA 3.2 Disruption（若造成压力）⚠️ | 🟡 |
| 复刻游戏战斗/生产数值系统 | EULA 2.7 Derivative Works ⚠️ | 🟠🔴 |
| 搭建任何形式的"私服/模拟器" | EULA 2.4 Private Servers | 🔴🔴 |
| 直接使用游戏音频文件 | 违反素材许可的音乐条款（音乐仅可用于含影像素材的视频） | 🔴 |
| 使用游戏截图并署名 | 素材许可明确允许 | 🟢 |
| 使用游戏 Logo | 素材许可文本列入 Materials，但 SE West 政策"logos not permitted at all" | 🟠 建议避开 |
| 在真实游戏内自动挂机 | 日文禁则「不在プレイ」 | 🔴 |

---

## 3. 数据源与 API 现状（截至 2026-09）

> **本章核实方法**：2026-09-15 对每个端点做真实 HTTP 探测（HEAD/GET），记录状态码与响应头；辅以官方文档页文本抓取。**探测结果 ≠ 法律许可**，两者在本章分列。
> **核实日期**：2026-09-15。**服务存续会变，请以你调用当时的实际结果为准。**

### 3.1 一张速览表（2026-09-15 实测）

| 数据源 | 主 URL | 2026-09 实测 | 数据粒度 | 限流（公开口径） | 我的风险判断 |
|---|---|---|---|---|---|
| **XIVAPI v1（Legacy）** | https://xivapi.com/Item/1 | ✅ **HTTP 200**，仍返回完整 Item 结构体（约 33 KB） | 游戏数据表行级（Item/Recipe/Quest…） | 官方文档历史口径约 **20 req/s**（无 key 时更低）⚠️ 未在响应头给出 | 🟠 可用，但数据来自解包 |
| **XIVAPI v2（当前主推）** | https://v2.xivapi.com/api/sheet/Item/1 | ✅ **HTTP 200**，返回 `schema: exdschema@2:rev:…` + `version` 双版本锚点 | EXDSchema 驱动，字段级 + **可回溯 7.0 以来所有补丁** | ⚠️ 未见公开写明；按 v1 量级保守设计 | 🟠 同上，但技术更干净 |
| **xivapi.com 站点首页** | https://xivapi.com/ | 🟠 **重定向到 v2.xivapi.com**（跨域 301/302） | — | — | 说明 v1 已进入"兼容保留"状态 |
| **Universalis（市场板）** | https://universalis.app/api/v2/Chaos/AncientShield | ✅ **HTTP 200**；`api-supported-versions: 1, 2` | 单物品在单世界的**挂单列表 + 成交历史**（HQ/NQ、retainer、tax） | 官方历史上为 **25 req/s（突发）/ 服务端可调**；`/api/v2/` 有聚合端点 ⚠️ 以 docs 为准 | 🟢 数据由玩家上传，争议面最小 |
| **Universalis 文档** | https://docs.universalis.app/ | ✅ HTTP 200 | — | — | 需自行读 `docs.universalis.app` 的限流节 |
| **Garland Tools** | https://www.garlandtools.org/db/ | ✅ **HTTP 200**（约 216 KB HTML） | 物品/配方/采集/成就/任务/NPC/地图的综合数据库 | 未公开；历史上靠静态 JSON 分片下发 | 🟠 数据聚合自解包 |
| **ffxiv-datamining（EXDSchema/SaintCoinach 系）** | GitHub `xivapi/ffxiv-datamining`、`thewakingsands/ffxiv-datamining-cn` | ⚠️ **本次未能直连**（`raw.githubusercontent.com` 超时，GitHub 页面 fetch 失败）；从搜索结果看**镜像仓库大量存在且仍在更新** | CSV/JSON 全表导出 + EXDSchema 定义 | 无（静态文件） | 🔴 **明确是"挖掘数据"，EULA 2.5 指向的行为产物** |
| **Teamcraft** | https://ffxivteamcraft.com/ | ✅ **HTTP 200**（11.5 KB） | 配方/采集/制作模拟 + 物品列表 | 前端应用，数据经其自身后端 | 🟠 工具型，数据源同上 |
| **Teamcraft（teamcraft.app）** | https://www.teamcraft.app/ | ❌ **TLS 证书校验失败**（`未能为 SSL/TLS 安全通道建立信任关系`）⚠️ 可能是本地/中间证书问题，非一定下线 | — | — | 以 `ffxivteamcraft.com` 为准 |
| **FFXIV Collect** | https://ffxivcollect.com/ | ✅ HTTP 200 | 坐骑/宠物/发型/成就/卡牌等**收集品**结构化数据 | 未公开 | 🟠 与 XIVAPI 同源 |
| **Lodestone（官方）** | https://na.finalfantasyxiv.com/lodestone/ | ✅ HTTP 200（约 163 KB） | 角色/公会/博客/公告 **HTML 页面，无官方 API** | ❌ **无 API**；爬取受 EULA 3.2 Disruption 约束 | 🟡 只有"读公告"用途可辩护 |
| **Cafemaker（国服数据 API）** | https://cafemaker.wakingsands.com/ | ❌ **HTTP 530**（Cloudflare 源站错误）。⚠️ 本次探测时源站异常，不能据此断定永久下线 | 国服数据库查询服务 | 未知 | 🔴 国服数据仍有挖掘属性 |
| **国服（盛趣）官方站点** | 盛趣 FF14 官网 / 国服 Lodestone 对应页 | ⚠️ 未逐项探测 | 公告、活动、职业介绍等 HTML | 无 API | 🟡 公告类内容可"引用"但不可整站搬运 |

> ⚠️ **探测环境说明**：本次探测在**中国大陆网络环境**下用 PowerShell `Invoke-WebRequest` 执行。`raw.githubusercontent.com` 超时与 `teamcraft.app` 证书失败**有很大概率是本地网络/证书问题，而非服务下线**。请在有代理的环境复测后再下结论。

### 3.2 XIVAPI：v1 与 v2 的真实关系（重要）

**事实（2026-09-15 实测）**：

1. `https://xivapi.com/`（站点根）**不再提供 v1 的文档页，而是重定向到 `https://v2.xivapi.com`**。
2. 但 **legacy 数据端点仍然活着**：`https://xivapi.com/Item/1` 返回 200，内容是**旧版扁平结构体**（`AdditionalData`、`Adjective`、`BaseParam0…` 这类大量冗余字段）。
3. `https://v2.xivapi.com/api/sheet/Item/1` 返回**新结构**：
   ```json
   { "schema": "exdschema@2:rev:e773c41a90aed788cf4c1c48469fa85618ef01fb",
     "version": "f5af21155b99a524",
     "row_id": 1,
     "fields": { "AdditionalData": {"value": 0}, "BaseParam": [ {...} ] } }
   ```
   注意 `schema` 与 `version` 两个锚点——**这是 v2 最重要的设计**：你可以把 schema rev 和 game version 钉死（pin），从而保证你的游戏数值表**不会因为 SE 更新而突然错位**。
4. v2 官方首页自述的能力（原文摘录，来自 https://v2.xivapi.com/ ）：
   - *"Updated patch data automatically available shortly after it's available."*
   - *"Pin schema and game versions to guarantee stability until you're ready to update."*
   - *"Data for every patch since 7.0 available and easily accessible."*
   - *"Search anything. Every sheet, in every patch, with any schema."*
5. v2 首页明确写着：*"This documentation covers XIVAPI v2. Using v1? Check the migration guide, or visit the v1 documentation."* ——**v1 被定位为"遗留"，有迁移指南**。

**对放置游戏的含义**：

| 事项 | 判断 |
|---|---|
| v1 还能用吗 | 能，但**属于技术债**；新项目应直接用 v2 |
| 迁移风险 | 中。v2 的字段是**嵌套 + `value/fields` 包装**的，解析逻辑要重写，不是换 URL 就行 |
| 最大的技术红利 | **schema/version pinning**——放置游戏的数值一旦定档，最怕上游数据漂移；v2 刚好解决这个 |
| 最大的法律问题 | ⚠️ **无论 v1 还是 v2，数据的本源都是游戏客户端解包（EXDSchema 就是解包 schema 定义）。"通过 API 拿"不等于"数据变合法"。** |

> **必须分清的三层**（这是全章最关键的一段）：
> 1. **API 的代码**（XIVAPI 服务端/客户端库）：通常开源，多为 MIT/Apache——**这只授权你使用代码，不授权你使用数据**。
> 2. **API 的服务条款**：约束你怎么调这个接口（限流、署名、不得商用等）——**这只约束你与服务方的关系**。
> 3. **数据的著作权**：归属于 **Square Enix**。因为数据来自对客户端的解包，而 EULA 2.5 明文禁止 *"intercept, mine or otherwise collect information from the Game using unauthorised third party software"*。
>
> **结论**：调用 XIVAPI 让你**自己**没去挖包（风险从"你挖"变成"他挖"），但**你仍然在"使用挖掘成果"**。第 2 章 §2.5 已把这一格标为 🟠。

### 3.3 Universalis（市场板 API）——本清单里最干净的一个

- **URL**：站点 https://universalis.app/ ；文档 https://docs.universalis.app/ ；状态页 https://status.universalis.app
- **可用性（2026-09-15 实测）**：✅ 站点 200；`/api/v2/Worlds` 200（返回 3690 字节世界列表）；`/api/v2/Chaos/AncientShield` 200。
- **版本信号**：响应头 `api-supported-versions: 1, 2` ——**v1 与 v2 并行可用**。
- **数据来源（关键差异）**：Universalis 的数据**不是解包数据，而是玩家/第三方插件上报的市场板快照**（站点原文：*"based on mogboard"*、*"can aggregate market board information from multiple sources"*）。这在法律定性上比 XIVAPI 干净得多：它记录的是**玩家在游戏内公开可见的市场行为**（价格、挂单量、雇员名），更接近"事实数据"，独创性表达成分低。
- **数据粒度**：`itemIDs` / `items` / `dcName` / `unresolvedItems`；单物品维度含**每个世界的挂单（HQ/NQ、数量、单价、retainer 名、最后上传时间）与近期成交**；另有 DC 聚合。实测空数据返回：
  ```json
  {"itemIDs":[],"items":{},"dcName":"Chaos","unresolvedItems":[]}
  ```
- **限流**：⚠️ 官方历史上公开的额度量级是**约 25 请求/秒**（`docs.universalis.app` 为准），并明确要求**批量查询要合并（一次多物品 ID）而不是循环单查**。**本次未逐字抓取限流原文**，请在 `docs.universalis.app` 的 Rate Limiting 节自行核对。
- **许可**：⚠️ 未在本次调研中定位到一份"Universalis 数据许可协议"的正式文本。站点版权行是 `FINAL FANTASY XIV © 2010 - 2020 SQUARE ENIX CO., LTD. All Rights Reserved.` ——**它自己也只是在署名 SE，并没有声称对数据拥有可再许可的权利。**
- **对放置游戏的价值**：⭐⭐⭐⭐ **如果你要做"市场行情/物价/交易"类放置玩法，这是唯一一个数据来源合理、争议面最小的选项。**

### 3.4 数据表导出仓库生态（EXDSchema / SaintCoinach / ffxiv-datamining / -cn）

这一族是整个 FF14 数据生态的**根**——XIVAPI、Garland、Teamcraft、FFXIV Collect 的数据**最终都来自这里**。

| 项目 | 定位 | 备注 |
|---|---|---|
| **EXDSchema** | 用 schema 描述 EXD/EXH 表的字段结构 | XIVAPI v2 响应里的 `schema: exdschema@2:rev:…` 就是它——**说明 v2 直接建在 EXDSchema 上** |
| **SaintCoinach** | 经典的 C# 客户端解包/读表库 | 老兵级工具，大量衍生项目基于它 |
| **ffxiv-datamining**（`xivapi/ffxiv-datamining` 等） | **导出的 CSV 全表仓库** | 即"解包结果的公开镜像"。同名 fork 极多（搜索结果里可见 `ElectricArc-Yu/`、`cualquiercosa327/`、`xiashtra/` 等），**多个镜像仍在更新** |
| **ffxiv-datamining-cn**（`thewakingsands/ffxiv-datamining-cn`） | **国服（简体中文）** 数据表导出 | 国服专属；`thewakingsands`（"沉睡之地"社区）也运营 Cafemaker |

**法律定性（不要含糊）**：

> 使用这些仓库 = **直接使用《用户协议》第 2.5 条所禁止的数据挖掘行为的产物**。
> - 你自己没运行解包工具 → 你**没有**违反 2.5 条的"行为"要件。
> - 但你**明知**这是挖掘产物而使用 → 可能落入 **2.7 条衍生作品** 或构成对挖掘行为的**参与/帮助**；在著作权层面，这是**对 SE 数据库/游戏数据的复制与再利用**。
> - **风险等级：🔴（本清单最高）**。这与"调用 XIVAPI 拿一条 Item 名字"不是一个量级——**把整张表打进你的游戏包，是"把你的游戏变成了 SE 数据表的发行者"。**

**如果非要用的最小化原则**（降低而非消除风险）：
1. **只取"不可替代的事实性字段"**：物品名、等级、职业、图标 ID、配方材料对应关系。**不要**搬运描述文本、台词、任务文本（这些是**受著作权保护的表达**，不是事实）。
2. **把数据转成你自己的结构重新表达**，不要原样携带 SE 的列名体系。
3. **不要把 CSV 仓库随游戏一起分发**。
4. ⚠️ 但仍然：**"事实性字段"在数据库权利/汇编著作权下的边界，各国法域不同。这不是法律意见。**

### 3.5 工具与聚合站：Teamcraft / FFXIV Collect / Garland Tools

| 站点 | 定位 | 2026-09 状态 | 对放置游戏的可用性 |
|---|---|---|---|
| **Teamcraft** | 制作/采集规划器 | `ffxivteamcraft.com` ✅ 200 | 🟠 作为**参考方法论**（配方树、采集时钟的建模方式）很有价值；直接搬数据不推荐 |
| **FFXIV Collect** | 收集品图鉴与进度追踪 | ✅ 200 | 🟠 坐骑/宠物/卡牌的名称与来源，适合做"图鉴式放置"；同样受挖掘数据定性约束 |
| **Garland Tools** | 综合数据库（物品/配方/采集/成就/任务/NPC/地图） | ✅ 200（`/db/`） | 🟠 结构最全；但它也是**二次聚合**，你用它实际上是在"用别人挖掘+整理的结果" |
| **GamerEscape / consolegameswiki 等 Wiki** | 社区 Wiki，文本由玩家撰写 | ⚠️ 未逐站探测 | 🟡 **Wiki 文本的著作权归"撰写该文本的玩家"，通常以 CC BY-SA 授权**——这意味着**你可以引用但要署名 + 相同方式共享**（这会"传染"你的项目）。⚠️ **同一 Wiki 页面常混有从游戏内抄录的文本，那部分仍属 SE。** |

> **关于 Wiki 的一条容易踩的坑**：很多人以为"Wiki 上的内容就是公共的"。实际上：
> - **玩家撰写的描述性文字** → 归玩家，按该 Wiki 的许可（多为 CC BY-SA 3.0/4.0）使用，**必须署名，且衍生作品需同许可**——**对闭源/商业游戏是致命的"传染"条款**。
> - **从游戏里抄出来的文本**（物品描述、任务台词、技能说明） → **仍是 SE 的**，Wiki 的 CC 许可**无权再许可**它。
> - **纯事实**（"这个物品需要 3 个铁矿"） → 通常不受著作权保护（但可能受数据库权利保护，见法域差异）。

### 3.6 Lodestone 官方数据库（没有 API，且不该爬）

- **URL**：https://na.finalfantasyxiv.com/lodestone/ （各区有独立域：`eu.`、`jp.`、`de.`、`fr.`）
- **2026-09 状态**：✅ 200，正常运营。
- **关键事实**：**SE 从未提供 Lodestone 的公开 API**。社区所有 Lodestone 数据抓取（角色查询、成就、公告）都是**爬虫**。
- **风险**：EULA 3.2（Disruption）——如果爬虫对服务造成压力，可被援引；同时"抓取并复现"还可能涉及 `robots.txt` 与不正当竞争。**§2.4 表中标 🟡。**
- **唯一对放置游戏有意义的安全用法**：**读官方公告与补丁说明作为"发布时间线"的事实来源**，并**在文中给出原始链接**。这类"引用官方公告"的用法，与"复刻数据库"完全不同。

### 3.7 国服（盛趣）数据源现状

| 项 | 情况 |
|---|---|
| **运营主体** | 国服由 **盛趣游戏 / 世纪华通** 体系运营（非 SE 直营），官网与用户协议独立 |
| **官方 API** | ❌ **不存在** |
| **Cafemaker**（`cafemaker.wakingsands.com`） | 国服社区最知名的数据查询服务；**2026-09-15 实测 HTTP 530（Cloudflare 源站错误）**。⚠️ 单次探测不足以断定终止，但**"依赖它做核心数据源"是不可接受的工程风险** |
| **ffxiv-datamining-cn** | 国服 CSV 导出仓库（`thewakingsands/ffxiv-datamining-cn`），性质与 §3.4 相同 → 🔴 |
| **中文素材许可** | ⚠️ **未检索到 SE 或盛趣发布的简体中文版《FF14 素材使用许可》**（见 §0.3）。这意味着**"在中国大陆用中文做同人游戏"没有一份可直接援引的中文授权文本**——这是一个真实且重要的空白 |
| **对放置游戏的建议** | 若做中文版，**不要以"国服数据"为卖点**；用**你自己创作的文本**代替一切游戏内文本 |

### 3.8 ⭐ 结论：对一款放置游戏而言，哪些数据可安全使用

| 数据类别 | 推荐做法 | 风险 | 理由 |
|---|---|---|---|
| **人名/地名/职业名等专有名词** | ✅ 可用（**最低限度**） | 🟢 | 单个名词不构成受保护作品；但**成规模地系统性使用**会累积成"实质性相似"。见 §6 分级表 |
| **市场物价/成交量（Universalis）** | ✅ 可用，做批量查询，遵守限流 | 🟢 | 玩家上报的事实数据，独创性表达成分最低 |
| **物品/配方/采集的**事实性关系**（等级、材料对应） | 🟡 谨慎，尽量自己整理并重写结构 | 🟠 | 事实不受著作权保护，但来源是挖掘数据；**不要连 SE 的字段命名和描述文本一起搬** |
| **物品描述 / 技能说明 / 任务文本 / 台词** | ❌ **不要用** | 🔴 | **受著作权保护的"表达"**，不是事实 |
| **图标 / 贴图 / 模型 / UI 素材** | ❌ 不要用 | 🔴 | 素材许可只允许**视频/直播/截图**形态，不覆盖"游戏包内嵌" |
| **音乐 / 音效** | ❌ **绝对不要用** | 🔴🔴 | **2026-05-07 起音乐已信托 JASRAC**，见 §6.4 |
| **完整 CSV 表导出仓库** | ❌ 不要打包分发 | 🔴 | 等于发行 SE 的数据表 |
| **官方公告的发布时间线** | ✅ 可以引用 + 给链接 | 🟢 | 引用与链接是常规做法 |
| **社区 Wiki 的玩家撰写文本** | 🟡 可用但**必须署名 + CC BY-SA 传染** | 🟠 | 对闭源/商业项目基本不可接受 |

> **一句话总结第 3 章**：**"能调通" 与 "能用" 是两件事。** 本清单里唯一从头到尾干净的只有 **Universalis（玩家上报的市场数据）** 和 **官方公告的引用**；其余全部是"技术上可用、法律上在灰区"，而 **datamining CSV 仓库与游戏内文本/美术/音乐是明确的红线**。

### 3.9 本章不确定项

| # | 不确定项 | 说明 |
|---|---|---|
| 1 | XIVAPI 的**正式限流数值**与 SLA | ⚠️ 本次未抓取到 v2 的限流文档原文；`20 req/s` 是 v1 时代的历史口径，**请以 `v2.xivapi.com` 文档为准** |
| 2 | XIVAPI v1 的**关停时间表** | 首页已重定向到 v2，但 legacy 端点仍返回 200 → **v1 处于"兼容保留、无承诺"状态**，随时可能关闭 |
| 3 | Universalis 的**数据许可正式文本** | ⚠️ 未定位到明确的再许可条款；"玩家上报数据可自由使用"是**社区惯例**而非书面授权 |
| 4 | Cafemaker 是**暂时故障还是已终止** | 单次 530 无法判定；请复测 |
| 5 | Teamcraft (`teamcraft.app`) TLS 失败的原因 | 大概率是本地证书链问题，**非服务下线** |
| 6 | GitHub 系仓库的**当前活跃度** | 本次网络无法直连 GitHub（`raw.githubusercontent.com` 超时），**仓库是否仍在更新未逐一核验** |
| 7 | Wiki 的**具体许可版本** | GamerEscape / consolegameswiki 各自的许可条款未逐站核对 |
| 8 | **国服是否有独立的素材许可中文文本** | ⚠️ 仍未找到（同 §0.3） |

---

## 4. 现有同类项目与法律先例调研

### 4.1 FF14 圈内的既有项目（2026-09 检索）

| 项目 | 形态 | 用了什么素材 | 官方反应 | 对我们的启示 |
|---|---|---|---|---|
| **`Toxocious/FFXIV-Idle`**（GitHub） | **增量/放置游戏**，自述 *"An incremental game based around Final Fantasy XIV"* | ⚠️ 未逐行核验；从性质看依赖 FF14 名词体系 | ⚠️ **未见任何下架/警告记录**；项目处于个人仓库状态 | ⭐ **最直接的同形态先例**：说明**"FF14 主题的放置游戏存在于 GitHub"这件事本身没有招致执法**。但**仓库存在 ≠ 合法**，它可能只是"没人注意" |
| **XIVAPI / Universalis / Garland / Teamcraft / FFXIV Collect** | **工具与数据库** | 解包数据 + 玩家上报数据 | **长期公开运营，未遭大规模下架**（§2.4） | ⭐ 这是"**工具被容忍**"的证据，**不能类推到"游戏被容忍"**（§2.4 已警告） |
| **ACT / Dalamud 插件生态** | 游戏内第三方工具 | 读内存/网络包 | 吉田 2022-05 公告：**不鼓励但"不主动处罚单纯使用"**，红线是**骚扰他人与泄露未公开内容** | ⭐ 官方容忍的边界是"**不伤害其他玩家、不泄露未公开内容**"——**不是"不侵权"** |
| **PlayerScope（玩家追踪 Mod，2025-06）** | 游戏内插件 | — | 🔴 **SE 发出法律警告（cease-and-desist 级），作者"永久且不可逆地删除"全部文件** | ⭐⭐ **最有力的"SE 会出手"证据**：一旦触及**隐私/骚扰**，SE **立刻**行动。SE 的优先级是"公关与玩家安全"，**不是著作权** |
| **各类 Mod 站（Ko-fi 等）的单个 Mod 被下架** | 玩家内容 | — | 🔴 存在因法律询问而下架的记录（搜索结果中可见具体 Ko-fi 店铺条目） | ⭐ 说明**DMCA/法律询问是常规操作手段**，不是罕见事件 |
| **FF14 私服 / 服务器模拟器** | 完整游戏复刻 | 客户端 + 服务端 | 🔴 **EULA 2.4 明文禁止**；SE 立场一贯反对 | ⭐⭐ **绝对红线**（见 §6.1） |

> ⚠️ **检索局限**：本次调研以英文/中文检索为主，**未系统遍历 itch.io、NGA、B 站、贴吧等中文平台上的 FF14 同人放置游戏**。§4.1 的"未见下架记录"**不等于"不存在下架记录"**。

### 4.2 ⭐ Melvor Idle 案例：为什么"原创 IP"是全部关键

这是**放置游戏领域最重要的一个先例**，也是最容易被误读的一个。

**事实**：
- **Melvor Idle** 是一款 **RuneScape 风格的放置/增量游戏**，由独立开发者 **Brendan Malcolm** 开发。
- **2021 年 10 月**，**Jagex（RuneScape 的版权方）宣布成为其发行方（publisher）**（报道见 [PocketGamer.biz](https://www.pocketgamer.biz/jagex-partners-publish-runescape-inspired-melvor-idle/)、[CogConnected](https://cogconnected.com/2021/10/runescape-inspired-idle-game-published-jagex/)）。
- 官方与合作方的公开表述是 *"RuneScape-inspired"*（受 RuneScape 启发）。

**关键点（必须讲清楚）**：

> **Melvor Idle 与 RuneScape 共享的是"玩法结构"（技能树、挂机循环、资源累积），而不是"作品表达"。**
> - 它**没有使用** Jagex 的美术素材、音乐、UI、文本或商标。
> - 它的**名词体系、界面、美术全部是原创的**。
> - 因此它在法律上是**"灵感/玩法相似"**，而**不是"衍生作品"**。

**为什么这一点在法律上决定一切**：

| 层面 | Melvor Idle | 一款用 FF14 素材/名词的放置游戏 |
|---|---|---|
| **著作权** | 玩法不受著作权保护 → **不侵权** | 使用素材/文本 → **直接侵权** |
| **商标** | 不使用 RuneScape 商标 → **无混淆** | 用 "FINAL FANTASY"/"FF14" 标识 → **商标风险** |
| **Jagex 的选择** | 打官司成本高、收益低；**收编（收购/发行）比诉讼更划算** | SE 的同类选择**没有理由**对你更温和 |
| **结果** | ✅ **被官方收编，双赢** | 🔴 大概率是下架通知 |

**我们可以复制的经验（这是本章最有价值的产出）**：

1. ⭐ **"玩法相似"是安全的，"表达相似"是危险的。** 放置游戏的爽感来自**循环设计**（资源→升级→解锁→自动化），这部分**不受著作权保护**。你可以做一个"职业切换 + 采集制作 + 副本挂机"的放置游戏，**只要整个表层是原创的**。
2. ⭐ **Melvor 的成功路径 = 原创表层 + 借鉴结构 + 最终被 IP 方收编。** 如果你的野心是"被 SE 官方认可/收编"，**唯一的路是先把表层做成 100% 你自己的**——一旦你用了 FF14 素材，**你连谈的资格都没有**（SE 随时可以要求下架，谈判筹码为零）。
3. ⚠️ **反向教训**：很多人引用 Melvor 来论证"做个武侠/仙侠版的 FF14 放置游戏没问题"——**这个推论只有在"你不用 FF14 任何素材、不使用 FF14 商标、不声称与 FF14 有关"时才成立**。一旦叫《FF14 放置版》，**Melvor 的经验完全不适用**。

### 4.3 其他 MMO 同人放置游戏的法律处境（对照）

| 项目/类型 | 与 IP 方的关系 | 法律处境 |
|---|---|---|
| **Melvor Idle** | **原创 IP** + 借鉴玩法 | 🟢 被 Jagex 收编，**最佳结局** |
| **wow-idle「艾泽拉斯公会物语」**（国人自制，魔兽世界题材挂机放置） | ⚠️ **使用暴雪（Blizzard）IP 的名词/世界观**；公开信息显示为**网页/挂机类自制作品**（[来源](https://gityx.com/web/yuanchuang/1417.html)） | 🟠🔴 **典型灰区**：属于"同人挂机游戏"。暴雪有《魔兽世界》同人作品政策，但**该政策的覆盖范围与"游戏"的关系从未被明确**。**⚠️ 本次未检索到其被下架或被授权的记录**——但"没被处理"与"被允许"是两件事 |
| **各类"XX 放置版/挂机版"的 MMO 同人页游** | 大量存在，多为国内小团队/个人 | 🟠🔴 **普遍处于"低可见度即低风险"状态**。一旦**引入变现**（广告、充值、赞助），性质从"同人爱好"变成"**商业使用他人 IP**"，**风险跃升** |
| **原创 IP 的 MMO 风格放置游戏**（如 Melvor、各类"Idle MMO"） | 无 IP 纠纷 | 🟢 **唯一真正安全的一类** |
| **MMO 模拟器/私服**（任何 MMO） | 直接复刻 | 🔴🔴 **法律明确打击的对象**（EULA 2.4；行业内有大量判例） |

> **对照结论**：这三个案例排成一条**风险光谱**——
> **Melvor（原创 IP）🟢 → wow-idle 类（借用名词，非商业）🟠 → 同人页游 + 变现 🔴 → 私服/模拟器 🔴🔴**
> 你要做的是**尽可能往左站**。而"往左站"最有效的一步，就是**放弃使用 SE 的素材，只保留世界观层面的名词借用**（§5、§6）。

### 4.4 从案例中提炼：可复制的经验 与 必须避开的坑

**✅ 可复制的经验**

| # | 经验 | 依据 |
|---|---|---|
| 1 | **玩法结构可以自由借鉴**——放置/增量玩法不受著作权保护 | Melvor Idle 与 RuneScape 的关系 |
| 2 | **把 IP 依赖降到"名词级"**——只借人名/地名/职业名，不借表达 | §6 分级表"低风险"档 |
| 3 | **100% 自制美术 + OFL 字体 + CC0 音效**，让整个"作品表达"都是你的 | §5 全章 |
| 4 | **完全免费、零变现入口**（连打赏链接都不要放，见 §1.4 日文版对价定义） | §1.4 |
| 5 | **公开透明 + 显著声明**（非官方、无关联、素材来源清单） | §1.5 官方模板 |
| 6 | **准备好随时下架**——保留"一键下架"能力，不留无法撤回的分发渠道 | 素材许可的**可撤回性**（§1.7、§6.5） |
| 7 | **不要碰隐私/骚扰/未公开内容**——这是 SE **唯一**会立刻出手的领域 | PlayerScope 事件（§4.1） |

**❌ 必须避开的坑**

| # | 坑 | 为什么致命 |
|---|---|---|
| 1 | **"XIVAPI 都活着，所以我做游戏也能活"** | 工具 ≠ 游戏（§2.4 已明确警告） |
| 2 | **用 Melvor 论证"FF14 放置游戏没问题"** | **Melvor 是原创 IP**，前提被偷换了 |
| 3 | **"非商业所以安全"** | 见 §6.5：**非商业 ≠ 安全** |
| 4 | **内嵌任何 FF14 音乐** | §6.4：**2026-05-07 起信托 JASRAC** |
| 5 | **在游戏包里打包 datamining CSV / 素材 / 文本** | 等于发行 SE 的资产（§3.8 🔴） |
| 6 | **复刻游戏内数值系统与完整流程** | → 接近"衍生作品/游戏模拟"（EULA 2.7） |
| 7 | **把游戏上传 Steam / App Store 等有审核的平台** | 会进入**商业分发渠道**且**必然触发 IP 审核**；⚠️ 平台侧尺度请以发布当时政策为准 |
| 8 | **任何形式的付费、打赏、赞助、爱发电、Patreon** | §1.4 日文版"不问是否盈利"的对价定义 |
| 9 | **用"FF14"作为游戏名或域名卖点做 SEO** | 直接进入**商标**风险区 |

---

## 5. 可安全使用的替代素材方案

> **本章目标**：给出一套**完全不使用任何 SE 素材**的、可落地的素材清单。这是 §4.4"经验 3"的具体实现。
> ⚠️ **署名与商用条款请以各项目 LICENSE 原文为准**；本章给出的是**调研判断**，且**以 2026-09-15 的公开信息为准**。

### 5.1 字体（放置游戏对字体的需求：中文 + 数字 + 拉丁）

| 字体 | 许可 | 可商用 | 必须署名 | 备注 |
|---|---|---|---|---|
| **思源黑体 / Source Han Sans（Noto Sans CJK）** | **SIL OFL 1.1** | ✅ | ❌ 通常不必（OFL 不要求署名，但**要求保留版权声明文件**；**且不得使用 Reserved Font Name**） | ⭐ **中文项目首选**；字重齐全；同族有 **思源宋体 / Source Han Serif** |
| **Noto Sans / Noto Serif（拉丁部分）** | **SIL OFL 1.1** | ✅ | ❌ 同上 | 与思源同源，**中西文搭配统一** |
| **霞鹜文楷 / LXGW WenKai** | **SIL OFL 1.1** | ✅ | ❌ 同上 | 手写/楷体风，**放置游戏的"日志/叙事"文本很有味道** |
| **HarmonyOS Sans** | ⚠️ 华为自有许可（**免费商用但禁止转售字体本身**） | ✅ | ⚠️ 需按华为条款 | ⚠️ 非 OFL，**条款可能变更，谨慎** |
| **JetBrains Mono** | **SIL OFL 1.1** | ✅ | ❌ | 数字/代码风 UI，**显示大数值很合适** |
| **Inter** | **SIL OFL 1.1** | ✅ | ❌ | 现代 UI 无衬线，**放置游戏面板首选** |
| **Fira Sans / Fira Code** | **SIL OFL 1.1** | ✅ | ❌ | — |

> **OFL 1.1 的三个关键约束（务必理解，别只记"可以商用"）**：
> 1. **可以自由使用、修改、嵌入、商用、再分发**（包括随游戏分发）。
> 2. **不得单独出售字体本身**（可以作为软件的一部分分发）。
> 3. **保留 Font Name（RFN）**：被标记为 Reserved Font Name 的字体，**修改后不得继续使用原名称**。
> 4. **必须随附版权声明与许可原文**（OFL 要求把许可放在软件中）。
> 官方文本：https://openfontlicense.org/open-font-license-official-text/ ；官方站点：https://openfontlicense.org/
> ⚠️ **注意**：OFL **不要求"在游戏里显示字体作者名"**，但**要求你在项目里附上 OFL 文本与版权行**。实践做法：做一个 `THIRD-PARTY-LICENSES.txt` 或游戏内"致谢/许可"页面。

### 5.2 图标与 UI 素材

| 资源 | 许可 | 可商用 | 必须署名 | 备注 |
|---|---|---|---|---|
| **Kenney（kenney.nl）** | **CC0 1.0** | ✅ | ❌ **不需要** | ⭐⭐ **放置游戏美术的最优起点**：有 UI 包、图标包、RPG 包、"Idle/Clicker" 相关素材；**上千个素材全部 CC0** |
| **Game-icons.net** | **CC BY 3.0** | ✅ | ✅ **必须署名** | 数千个矢量图标（SVG），**技能/物品/职业图标极合适**；署名格式见其站内说明 |
| **Lucide / Feather Icons** | **ISC / MIT** | ✅ | ⚠️ 通常需保留许可声明 | UI 线性图标，风格统一 |
| **Iconify / Material Symbols（Google）** | **Apache-2.0** | ✅ | ⚠️ 需保留声明 | 系统级 UI 图标 |
| **Twemoji** | **CC BY 4.0**（图形）/ MIT（代码） | ✅ | ✅ | ⚠️ 注意图形部分是 CC BY |
| **OpenGameArt** 上的 CC0 素材 | **逐件不一** | ⚠️ **必须逐件核对** | ⚠️ 逐件不一 | ⚠️ **同一站内混杂 CC0 / CC BY / CC BY-SA / GPL**。**CC BY-SA / GPL 有传染性，对闭源游戏不可用** |
| **itch.io 的免费素材包** | **逐包不一** | ⚠️ **必须逐包核对** | ⚠️ 逐包不一 | ⚠️ 常见"可免费用但不可转售"的自定义条款，**不是标准许可，法律上更模糊** |

> **选素材时的三条硬规则**：
> 1. **优先 CC0** → 零义务、零传染。
> 2. **其次 MIT / OFL / CC BY**（需保留声明或署名）。
> 3. **避开 CC BY-SA / GPL / "非商业"（NC）/ "禁止演绎"（ND）** —— NC 与你的"完全免费"看似兼容，但**一旦你哪天想加个赞助入口就会踩雷**；ND 则禁止你改素材（游戏开发必然要改）。

### 5.3 音效与音乐

| 资源 | 许可 | 可商用 | 必须署名 | 备注 |
|---|---|---|---|---|
| **Kenney（音效包）** | **CC0 1.0** | ✅ | ❌ | ⭐⭐ 界面音、点击音、升级音——**放置游戏的音效需求它基本能全覆盖** |
| **Freesound.org** | **逐件不一**（CC0 / CC BY / CC BY-NC…） | ⚠️ **必须逐件看** | ⚠️ 逐件不一 | ⚠️ **大量条目标 CC BY-NC，不可商用**；且**上传者可能上传了没有权利的内容**（用户生成平台的通病） |
| **OpenGameArt（音乐区）** | **逐件不一** | ⚠️ 逐件核对 | ⚠️ 逐件不一 | 同上 |
| **Incompetech（Kevin MacLeod）** | **CC BY 4.0**（部分 CC BY-SA） | ✅ | ✅ **必须署名** | 大量氛围/循环音乐；⚠️ **务必确认所选曲目是 CC BY 还是 CC BY-SA** |
| **Free Music Archive** | **逐件不一** | ⚠️ 逐件核对 | ⚠️ 逐件不一 | 站内混合多种 CC 版本 |
| **Pixabay（音乐/音效）** | **Pixabay Content License** | ✅ | ❌ 通常不必 | ⚠️ **自有许可，非 CC**；**禁止"原样转售/再分发素材本身"**；⚠️ 曾调整过许可，**以当前站内条款为准** |
| **YouTube Audio Library** | **逐件不一**（部分需署名） | ✅ | ⚠️ 部分需要 | ⚠️ 仅限 YouTube 使用场景的曲目要小心 |
| **自录 / 用合成器自制** | 你自有 | ✅ | ❌ | ⭐⭐⭐ **最彻底安全**：用 LMMS / MuseScore / Audacity 自制 |

> 🔴 **本章最重要的一条禁令（重复也要写）**：
> **不要内嵌任何 FF14 音乐，也不要使用"改编/翻奏/编曲版"的 FF14 音乐。**
> 原因见 §6.4：**自 2026-05-07 起，FF14 全部原创乐曲的音乐著作权已信托给 JASRAC**。此时"我在非商业同人游戏里放一首 FF14 的 BGM"不再是"SE 可能不管的灰区"，而是**涉及信托管理机构的权利处理问题**。**翻奏版同样不行**——翻奏只解决了"录音版权"，**没有解决"作曲版权"**，而作曲版权正是被信托的那部分。

### 5.4 ⭐ "完全不使用 SE 素材"的自制美术替代方案

放置游戏的画面需求**远低于**传统游戏——这既是它作为"低风险同人形态"的最大优势，也是**自制可行的根本原因**。

| 游戏元素 | 传统做法（❌ 危险） | 自制替代方案（✅ 安全） |
|---|---|---|
| **职业/角色形象** | 用 FF14 职业图标与立绘 | **几何图形 + 色块 + 文字标签**（"战士"/"白魔"用不同的颜色与符号表示） |
| **物品/装备图标** | 用游戏内 Item 图标 | **Game-icons.net（CC BY）+ 色相调整**；或用 SVG 自绘简单器物 |
| **地图/场景** | 用游戏截图或地图素材 | **抽象节点图/流程图**（放置游戏的"地图"本来就是节点连线）；或用 CC0 的 Kenney 地块拼 |
| **UI 面板** | 模仿 FF14 的 UI 皮肤 | **九宫格（9-slice）纯色面板 + Kenney UI 包**；**不要模仿 FF14 的 UI 版式与配色细节** |
| **特效/动画** | 搬运技能特效 | **CSS/Shader 的粒子 + 缩放/透明度动画**；放置游戏的特效需求极低 |
| **技能名 / 物品名 / 地名** | 照抄游戏内文本 | **⚠️ 这是最微妙的一格**：<br>• **单个专有名词**（如某地名）→ 🟢 低风险，通常可用<br>• **成规模的技能名清单 + 技能说明文本** → 🔴 高风险（**系统性使用 → 实质性相似**）<br>• **建议**：名词**少量借用作为"致敬"**，**说明文本 100% 自己写** |
| **整体视觉风格** | 复刻 FF14 的视觉识别 | **自己定一套色板与排版规则**；做到"一眼看不出是 FF14，但玩家能会心一笑" |

> **⭐ 一个可操作的设计原则："致敬而非复制"（homage, not reproduction）**
> - **可以**：某个 NPC 叫"某位喜欢钓鱼的老兵"，玩家一看就知道你在指谁。
> - **不可以**：把该 NPC 的**模型、台词、任务流程**搬过来。
> - **判据**：如果 SE 把你的项目截图和 FF14 截图并排放，**是否构成"实质性相似"**？如果只有"氛围像"，安全；如果有"看起来是同一张图/同一段话"，危险。

### 5.5 素材使用落地清单（照做即可）

| # | 动作 | 产出物 |
|---|---|---|
| 1 | 建立 `ASSETS.md`：**逐个素材记录** 名称 / 来源 URL / 许可 / 是否需署名 / 获取日期 | 你的合规证据 |
| 2 | 建立 `THIRD-PARTY-LICENSES.txt`：**粘贴 OFL / MIT / CC 的许可原文** | 满足 OFL/CC 的"随附许可"要求 |
| 3 | 在游戏内做"**致谢与许可**"页面，列出所有 **CC BY** 素材的署名 | 满足署名要求 |
| 4 | 在游戏显著位置放 **"非官方同人作品，与 Square Enix 无关联"** 声明 | 见 §1.5 官方模板 |
| 5 | 对所有素材做一次**来源倒查**：确认没有一环是"从 FF14 解包出来的" | ⚠️ **最容易漏的一步**：很多"免费素材包"里混了游戏提取物 |
| 6 | 若某素材**无法确认来源或许可** → **直接弃用** | 不要赌 |

---

## 6. 风险分级清单与合规检查表 ⭐

> 本章是全文的"可操作结论"。**所有等级都是调研者的风险判断，不是法律意见。**

### 6.1 风险分级表（按"做法"而非"素材"分级）

#### 🟢 低风险（通常可辩护；仍建议保持克制）

| 做法 | 为什么低 | 注意事项 |
|---|---|---|
| **只使用地名/人名/职业名等单个专有名词，且数量有限** | 单个名词通常不构成受保护的作品表达 | ⚠️ **系统性成规模使用会累积成"实质性相似"**；**不要做完整的名词表** |
| **借鉴放置/增量玩法结构本身** | **玩法不受著作权保护**（Melvor Idle 案例，§4.2） | ⚠️ **不能同时复制其表达** |
| **完全原创的美术、文本、音乐、UI** | 你自己就是权利人 | — |
| **使用 CC0 / OFL / MIT 素材** | 许可明确、无传染 | 保留许可文本与署名（§5.1、§5.5） |
| **引用官方公告并给出原文链接** | 常规引用 | 不要大段复制原文 |
| **完全免费、零变现、无任何赞助入口** | 不落入"商业目的"（§1.4） | ⚠️ **仍然不等于安全**，见 §6.5 |
| **游戏内不出现 SE 商标、Logo、"FINAL FANTASY"/"FF14"字样** | 规避商标混淆 | 连 `meta`/SEO/域名也一并规避 |
| **公开的"非官方、无关联"声明** | 降低混淆可能 | 必须显著位置 |
| **随时可一键下架的发布方式** | 符合"可撤回"的现实 | 避免不可撤回的分发渠道 |

#### 🟡 中风险（需要额外措施，且应做好下架准备）

| 做法 | 风险来源 | 降险措施 |
|---|---|---|
| **使用 Universalis 市场数据做玩法** | 数据源默认无书面再许可 | 遵守限流、批量查询、署名、给链接 |
| **使用物品/配方/等级的"事实性关系"** | 来源是挖掘数据 | 自己重写结构；**不带 SE 的字段名与描述文本** |
| **引用 Wiki 的玩家撰写文本** | **CC BY-SA 传染** | 若闭源/想商业化 → **不要引用**；否则署名 + 同许可 |
| **抓取 Lodestone 页面取公告时间线** | EULA 3.2 Disruption | 限速、缓存、只取必要字段；**优先手工整理** |
| **使用"FF14 风格"的视觉语言（配色、版式）** | 可能构成不正当竞争/混淆 | 主动做出可辨识的差异化 |
| **在 itch.io 等平台发布** | 平台审核与接到通知后的处理 | ⚠️ 平台尺度会变；**准备好下架** |

#### 🟠 高风险（强烈不建议；一旦被主张权利几乎无抗辩空间）

| 做法 | 触发条款/理由 |
|---|---|
| **使用任何游戏内贴图/模型/UI/图标素材** | 《素材使用许可》**不覆盖"游戏包内嵌"**（§1.8） |
| **使用游戏内文本：物品描述、技能说明、任务台词、剧情对白** | **受著作权保护的"表达"**，非事实 |
| **调用 XIVAPI / 打包 datamining CSV 作为游戏数据表** | EULA 2.5 挖掘 + 2.7 衍生（§3.2、§3.4） |
| **复刻游戏内数值系统（伤害公式、装备成长曲线、副本机制）** | 接近 **EULA 2.7 衍生作品**；越完整越危险 |
| **复刻完整游戏流程（主线 → 副本 → 生产 → 采集 → 坐骑）** | 从"灵感"变成"**另一款 FF14**" |
| **用 "FINAL FANTASY XIV"/"FF14" 做游戏名、域名、图标、商店页标题** | **商标**侵权/混淆 |
| **声称"官方授权"/"官方合作"** | 虚假宣传 + 商标 |
| **上传 Steam / App Store / Google Play 等有 IP 审核的商店** | 进入商业分发渠道，**必然触发审核** |
| **抓取或使用玩家个人信息（角色 ID、服务器、行为轨迹）** | **隐私**——这是 SE **唯一会立刻出手**的领域（PlayerScope 事件） |

#### 🔴 极高风险 / 绝对红线

| 做法 | 依据 |
|---|---|
| **🔴🔴 内嵌任何 FF14 音乐或音效（含翻奏、改编、Remix）** | **2026-05-07 起全部原创乐曲已信托 JASRAC**（§6.4） |
| **🔴🔴 搭建任何形式的私服 / 服务器模拟器** | **EULA 2.4 Private Servers** 明文禁止；行业内有大量法律行动先例 |
| **🔴🔴 任何形式的变现**：内购、付费 DLC、广告、订阅、**打赏、爱发电、Patreon、Ko-fi、赞助、谢礼**、把游戏当作其他产品的宣传入口 | **§1.4 日文版原文：「利益の有無を問わず…何らかの価値のある対価、報酬、謝礼を受けること及び、宣伝や広告に利用すること」——不问是否盈利** |
| **🔴🔴 收集/上传/展示玩家个人数据；做"追踪/排行/公开玩家行为"的功能** | 隐私 + SE 已明确威胁法律行动（2025 PlayerScope） |
| **🔴🔴 泄露未公开内容（未发布补丁的数据、剧透挖掘内容）** | 吉田直树官方公告明确列为**可能采取法律行动**的情形 |
| **🔴🔴 绕过游戏客户端的技术措施（反编译、内存读取、封包处理）** | EULA 2.5 / 2.6；日文禁则「解析」「リバースエンジニアリング」 |

### 6.2 风险分级速查表（一页版）

| 做法 | 等级 |
|---|---|
| 只用有限的人名/地名/职业名 | 🟢 |
| 借鉴放置玩法结构 | 🟢 |
| 全原创美术 + OFL 字体 + CC0 音效 | 🟢 |
| 引用官方公告并给链接 | 🟢 |
| 完全免费、零变现、显著非官方声明 | 🟢 |
| Universalis 市场数据 | 🟡 |
| 物品/配方的"事实性关系"（自行重写） | 🟡 |
| 引用 Wiki 玩家文本（CC BY-SA） | 🟡 |
| 抓 Lodestone 公告 | 🟡 |
| "FF14 风格"的视觉语言 | 🟡 |
| 上 itch.io 等平台 | 🟡 |
| 游戏内贴图/模型/UI 素材 | 🟠 |
| 游戏内文本（描述/台词/说明） | 🟠 |
| XIVAPI 取数 / 打包 CSV | 🟠 |
| 复刻数值系统 | 🟠 |
| 复刻完整游戏流程 | 🟠 |
| 游戏名/域名/图标用 FF14 | 🟠 |
| 上 Steam / App Store | 🟠 |
| **FF14 音乐（含翻奏）** | 🔴🔴 |
| **私服 / 模拟器** | 🔴🔴 |
| **任何变现（含打赏）** | 🔴🔴 |
| **玩家个人数据** | 🔴🔴 |
| **泄露未公开内容** | 🔴🔴 |

### 6.3 ⭐ 发布前合规检查表（逐项勾选，全绿才发布）

> **用法**：把下面的表复制进你的项目 issue / README，**逐项打勾**。任何一项为 ❌，就**不要发布**。

**A. 素材来源**

- [ ] A1. 游戏内**没有任何** FF14 贴图、模型、UI、图标文件
- [ ] A2. 游戏内**没有任何** FF14 文本（物品描述、技能说明、任务台词、剧情对白、NPC 台词）
- [ ] A3. 游戏内**没有任何** FF14 音乐或音效（**含翻奏/改编/Remix**）
- [ ] A4. 项目内**没有**打包任何 datamining CSV / EXD 导出 / 数据表仓库
- [ ] A5. 每个素材都在 `ASSETS.md` 中有 **来源 URL + 许可 + 获取日期**
- [ ] A6. 所有 OFL / MIT / CC 的**许可原文**已随附（`THIRD-PARTY-LICENSES.txt`）
- [ ] A7. 所有 **CC BY** 素材已在游戏内"致谢"页**署名**
- [ ] A8. **已倒查**每个素材，确认没有一环来自"游戏提取物"
- [ ] A9. 无法确认来源/许可的素材**已全部弃用**
- [ ] A10. **没有使用** CC BY-SA / GPL / ND / NC 素材（或有意识接受其后果）

**B. 商标与标识**

- [ ] B1. 游戏名、副标题、域名、图标中**不含** "FINAL FANTASY" / "FF14" / "FFXIV" / SE Logo
- [ ] B2. 商店页/README 的标题不含上列商标（**包括 SEO 关键词堆砌**）
- [ ] B3. **没有**任何"官方授权/官方合作/官方认可"的表述
- [ ] B4. 显著位置有 **"非官方同人作品，与 Square Enix 无关联"** 声明
- [ ] B5. 有 **SE 著作权与商标归属声明**（形式参考 §1.5 官方模板）

**C. 数据与玩法**

- [ ] C1. 数据表是**自行整理重写**的，不是 XIVAPI 直出/CSV 直搬
- [ ] C2. **没有**携带 SE 的字段命名体系与描述文本
- [ ] C3. 数值系统是**自己设计的**，不是对游戏内公式的复刻
- [ ] C4. 玩法流程是**原创组合**，不是"FF14 主线的完整复刻"
- [ ] C5. 若调用 Universalis：**已批量查询、已限流、已署名**
- [ ] C6. 若调用任何第三方 API：**已读并遵守其自身条款与限流**

**D. 变现与商业**

- [ ] D1. **无**内购、无付费 DLC、无广告、无订阅
- [ ] D2. **无**打赏/爱发电/Patreon/Ko-fi/赞助/谢礼链接（**包括"自愿赞助"**）
- [ ] D3. 游戏**不是**任何其他产品/服务的宣传入口
- [ ] D4. 分发的平台**没有**把它放进商业销售渠道
- [ ] D5. ⚠️ 若以上任一项为"是" → **你的行为已落入 §1.4 的"商业目的"定义**

**E. 隐私与社区**

- [ ] E1. **不收集**任何玩家个人数据（角色名/ID/服务器/行为轨迹/IP）
- [ ] E2. **没有**任何"追踪/公开其他玩家"的功能
- [ ] E3. 若玩家上传数据，**明确告知用途并获得同意**
- [ ] E4. **不包含**未公开的补丁内容/剧透挖掘信息

**F. 发布与应急**

- [ ] F1. 已建立**可一键下架**的分发方式（不依赖不可撤回的渠道）
- [ ] F2. 已准备**下架响应流程**：收到通知后多久内响应、由谁执行
- [ ] F3. 已备份**素材来源证据**（`ASSETS.md` 与获取日期）以备沟通
- [ ] F4. 已阅读并理解 **§6.5"非商业 ≠ 安全"**
- [ ] F5. 已阅读并理解 **素材许可的"可撤回性"**（§1.7）
- [ ] F6. 若涉及任何商业化/大额投入 → **已咨询执业律师**（本文档不是法律意见）

### 6.4 ⭐ 音乐专项：不要内嵌任何 FF14 音乐

> **这是全文最硬的一条结论，请单独记住。**

**事实**：

- **自 2026-05-07 起**，FF14 **全部原创乐曲**的音乐著作权已**信托给 JASRAC**（日本音乐著作权协会）。相关公告与细节见 §7.4。
- 官方指引（Guidelines for Music and Sounds）的历史口径是：**FF14 的音乐数据"仅可用于包含影像素材的视频"**——**从来没有授权过"把音乐放进自己的游戏里"**。
- 信托之后，在互联网上使用 FF14 音乐数据**必须使用与 JASRAC 签有概括许可（包括授权）的 UGC 服务**；**X（Twitter）不在该名单内**（§7.4）。

**推论（对放置游戏）**：

| 做法 | 判断 |
|---|---|
| 内嵌 FF14 原曲（音频文件） | 🔴🔴 **绝对不要** |
| 内嵌 FF14 音乐的**翻奏/改编/Remix** | 🔴🔴 **同样不要**——翻奏只解决"录音/表演"，**作曲权正是被信托的那部分** |
| 在预告片/宣传视频里用 FF14 音乐 | ⚠️ **仅在被授权的 UGC 平台（如 YouTube）上**，且遵守视频指引；**不要放进游戏包** |
| 用"风格相似"的原创音乐 | ✅ **推荐**：CC0 / CC BY 音乐，或自制（§5.3） |
| 让玩家自己导入音乐文件 | ⚠️ 技术上"你没分发"，但**如果游戏鼓励玩家导入 FF14 原曲**，你仍在引导侵权；**不建议** |

> **一句话**：**做放置游戏时，把 FF14 音乐从设计里完全删掉。** 一个挂机游戏的氛围音乐，用 CC0 素材或自制完全可以满足，**没有必须冒险的理由**。

### 6.5 ⭐ "非商业 ≠ 安全"——必须理解的两件事

#### (1) 公众送信权：非营利个人主页也违法

SE 官网《著作権について》（关于著作权）明确说明（要点见 §1.6）：

> 即使是依**日本著作权法第 30 条**（私人使用目的复制）**合法制作**的复制件，**只要在互联网上使用**，在**没有权利人许可**的情况下，就构成对 **公衆送信権（公众送信权）** 的侵害。
> **非营利的个人主页也不例外**；**加 ID/密码做访问限制，也不能免除违法性**。

**含义**：

- **"我不赚钱"不能作为抗辩。** 著作权侵权的成立**不以营利为要件**。
- **"我只是放在自己小站上"不是安全区。** 只要能让公众访问（送信可能化），就在规制范围内。
- **"我加了密码/邀请制"也没用。** 官方文本明确排除了这个辩解。

#### (2) 素材许可是可撤回的、有裁量的

- 《素材使用许可》是 SE **单方面给予的、有限的、可撤回的**授权，**不是一份对等的合同**。
- SE 可以**以其完全裁量**要求你撤下内容（§1.7 已摘录技术性条款）。
- 许可还**限定用途**（支持社区）、**限定形态**（网络上的利用、婚礼/伴侣仪式）、**限定非商业**，并明确**不能用于有形物**、**不能用于影像上映**。

**含义**：

| 你可能的想法 | 现实 |
|---|---|
| "我在许可范围内做的，所以安全" | 许可**随时可撤回**；且**许可文本没有提到"游戏"**（§0.3 ⚠️） |
| "我完全免费，所以没事" | **非商业 ≠ 安全**（见上） |
| "SE 一直没管，所以等于默许" | 是**容忍（toleration）而非授权**（§2.4）；**容忍可以随时停止** |
| "别人也这么做" | **不构成抗辩** |
| "我先发了，出事再说" | 见 F1/F2：**必须准备好一键下架**，并承担可能的平台账号处罚 |

> **⭐ 正确的心理模型**：
> **把"随时被要求下架"当作项目的既定前提来设计。**
> - 这意味着：**不要投入无法回收的成本**（不要花半年做 FF14 素材的美术）。
> - **不要让游戏成为你唯一的收入来源**（反正也不能变现）。
> - **不要把品牌资产押在 FF14 上**（域名、账号名、社区）。
> - **随时准备好把它变成一款纯原创游戏**——这才是 Melvor Idle 那条路（§4.2）。

### 6.6 本章不确定项

| # | 不确定项 | 说明 |
|---|---|---|
| 1 | 风险分级**没有法律效力** | ⚠️ 全部等级是调研者基于条款原文与公开案例的判断，**不是法律意见，不构成任何保证** |
| 2 | "少量借用名词"的**临界点** | ⚠️ 多少个名词、多系统性地使用才构成"实质性相似"，**没有客观标准**；各国判例差异大 |
| 3 | **JASRAC 信托的具体曲目范围与例外** | 见 §7.4 及其不确定项；**"全部原创乐曲"是公告口径，逐曲目清单未核** |
| 4 | 各平台的**实际审核尺度** | ⚠️ Steam / App Store / Google Play / itch.io 的 IP 审核会变化，**以发布当时政策为准** |
| 5 | **国服（盛趣）是否有独立的中文素材许可** | ⚠️ 未找到（同 §0.3）；这意味着**中文项目没有可直接援引的中文授权文本** |
| 6 | 事实性数据的**数据库权利**（各国法域差异） | ⚠️ 欧盟有数据库特殊权利（sui generis），中国/美国路径不同，**本次未做法域比较** |
| 7 | CC BY-SA 对游戏项目的**传染边界** | ⚠️ "引用 Wiki 文本"与"链接到 Wiki"的法律后果不同，**具体边界未逐案分析** |

---

## 7. 视频、直播、音乐与同人作品专项指引

> 用户的任务要求"如果发现官方有专门的直播/视频/同人作品指引，也一并说明"。答案是：**有**，而且它们就写在《Materials Usage License》正文里，作为独立小节。本章逐条摘录，并说明它们对"放置游戏"的间接影响（尤其是**音乐**——这是 2026 年最重要的变化）。

### 7.1 Guidelines for Videos（视频指引，英文版原文）

> **Guidelines for Videos**
> - The video must **not require a paid membership for viewing**;
> - You may **not split our videos** (vocal, music, visual, etc.) or distribute components as **separate assets**;
> - You may **not combine or synchronize the Materials with third party content** (e.g., a mash-up); but you **may include the Materials alongside third party content** (e.g., before or after in the same video) as long as you also have permission from the original copyright owner);
> - The video **must not contain racist, sexist, homophobic or generally offensive content** of any kind. This includes graphic violence or sexually explicit content.

| 条款 | 中文释义 | 对放置游戏的含义 |
|---|---|---|
| 不得要求付费会员才能观看 | 内容不得放在付费墙后 | 🔴 若把游戏做成"赞助者才能玩"，无论叫不叫"视频"，精神上违反 |
| 不得把视频拆成分轨（人声/音乐/画面）作为**独立素材**分发 | **禁止素材二次分发**的另一种表述 | 🔴 直接把 FF14 的音乐/立绘抽出来当游戏素材 = 此项 |
| 不得与第三方内容**合成或同步**（如 mash-up）；但可以在同一视频中**前后并列**使用 | 素材不能与第三方素材混在一起 | 🔴 若把 FF14 素材与你的自制素材合成到同一画面，风险高 |
| 不得含种族主义/性别歧视/恐同/普遍冒犯性内容（含血腥暴力、色情） | 内容合规 | 🟡 常规内容审核要求 |

### 7.2 Guidelines for Music and Sounds（音乐与音效指引，英文版原文）

> **Guidelines for Music and Sounds**
> - You may **only use music as it is incorporated in FFXIV**;
> - When showing gameplay, you may **not replace the FFXIV music with third party music**;
> - You may **not play FFXIV music alone** (i.e., without accompanying gameplay footage), or with third party materials;
> - You may not stream or distribute the Materials where the **primary purpose is to listen to FFXIV's audio soundtracks**. If such cases are discovered, you may be subject to **monetization by Square Enix**.

日文版对应条款（更细）：

> 「(2) 動画にファイナルファンタジーXIV以外の楽曲、音声データをのせることは禁止です。但し、ご自身の音声をのせることはできます。」
> 「(3) 本著作物のうち、**音楽データについては、ファイナルファンタジーXIVのゲーム内で撮影した画像や動画などの素材を使用した動画にのみ利用できます**。」
> 「(4) **音楽データのみの掲載及び音楽データの視聴を主目的と捉えられる動画等の掲載は禁止です。**掲載が確認された場合、当社によるマネタイズが実施される場合があります。」
> 「(1) …**「利用できる著作物」には、ファイナルファンタジーXIVゲーム内で使用されている音楽データが含まれますが、これらについては…JASRACの許諾が必要となります。**」

> **🔴 对放置游戏最重要的一条**：日文版第 3 条 ②(3) 明确限定——
> **FF14 的音乐数据，只能用于"使用了 FF14 游戏内拍摄的图片或视频等素材的**视频**"。**
>
> 也就是说，**音乐的使用场景被限定为"视频（動画）"**。一款游戏（哪怕它是网页游戏）**不是视频**。因此：
> - **把 FF14 原曲放进放置游戏当 BGM：条款上找不到授权依据，风险高。**
> - 把 FF14 原曲在游戏内的"过场动画/宣传片"里使用，理论上更接近条款文本（因为那是"含游戏内影像的视频"），但**仍受 JASRAC 集体管理的约束**（见 7.4）。
> - 英文版「may not play FFXIV music alone (i.e., **without accompanying gameplay footage**)」也指向同一逻辑。

### 7.3 TikTok 专项条款（英文版原文）

> **Music Provided on TikTok**
> Square Enix has made certain music tracks available on the TikTok platform, and such tracks are registered under the official FINAL FANTASY XIV TikTok account ("FFXIV TikTok Music").
> Notwithstanding the "Guidelines for Music and Sounds" above, you may use FFXIV TikTok Music **only within the TikTok platform**, up to **one (1) minute maximum** per TikTok video. FFXIV TikTok Music **cannot be used anywhere beyond the TikTok platform**.

日文版（别纸 2）：

> 「動画投稿サービスTikTokから提供される楽曲。TikTokのファイナルファンタジーXIV公式アカウントがオリジナル楽曲として登録している本著作物の音楽データ（**最大尺1分間**）については、TikTokの規約に基づいてTikTok内で使用している限り、本条件は適用されません。」

> **中文要点**：TikTok 官方账号下的 FF14 曲目可在 TikTok 内使用（≤1 分钟），**不能拿到 TikTok 之外**。对游戏项目**没有帮助**（提示：不要把 TikTok 上的 FF14 曲目下载下来当素材）。

### 7.4 【2026 年重大变化】全部 FF14 原创乐曲著作权信托 JASRAC

**发生时间**：2026-05-07（与素材许可改订同日）

**官方公告（日文）**：https://jp.finalfantasyxiv.com/lodestone/news/detail/41c6b418731738efb829aec618e2fbe7a12456b1
标题：**FFXIV全楽曲のJASRAC信託および著作物利用条件の更新について**

原文：

> ファイナルファンタジーXIVで使われているオリジナル楽曲の音楽著作権は、これまで**国内のみ自社で管理**しておりましたが、このたび一般社団法人 日本音楽著作権協会（**JASRAC**）に**信託**いたしました。
>
> これにともない、著作物利用条件を更新いたしました。今後ファイナルファンタジーXIVの音楽データをインターネット上で利用される際には、**JASRACと包括的な利用許諾契約を締結しているサービスをご利用ください**。
>
> なお、**XなどJASRACとの間で利用許諾契約を締結していないサービスへの動画投稿**については、**利用許諾契約を締結しているサービスにアップしたうえで、そのページURLをXでポストしていただく形でご利用ください**。（例：YouTubeに動画をアップし、その動画URLをXに記載してポストする）また、**音楽データの付いていない無音の動画や、SEなど楽曲ではないデータが含まれる動画については直接Xでポストしていただいて問題ありません**。

日文版《著作物利用条件》第 2 条相应新增：

> ※「ファイナルファンタジーXIVゲーム内で使用されている音楽データ」と「ファイナルファンタジーXIVオリジナルサウンドトラック内の音楽データ」については、次項に定める「ネット上の利用」及び「ウェディング利用」の際、**著作権について一般社団法人 日本音楽著作権協会（JASRAC）の許諾が必要となります**。インターネット上でこれらの音楽データをご利用になる際には、**JASRACと利用許諾契約を締結しているサービスをご利用ください**。

**JASRAC 公布的"已签订使用许可合同的 UGC 服务"清单**（最后更新：**2026-08-21**）：
https://www.jasrac.or.jp/information/topics/20/ugc.html

| 状态 | 服务（部分摘录，50 音顺） |
|---|---|
| ✅ **已与 JASRAC 签约**（可上传含 JASRAC 管理乐曲的视频） | **YouTube**、**Twitch**、**TikTok**、**TikTok Live**、**Instagram**、**Threads**、**Facebook**、**ニコニコ動画**、**Dailymotion**、**SHOWROOM**、**ツイキャス**、**OPENREC**、**Mirrativ**、**17LIVE**、**cluster**、**Pococha**、**LINE / LINE VOOM**、**Lemon8**、**755**、**ふわっち**、**ミクチャ** 等 |
| ❌ **未出现在名单上** | **X（旧 Twitter）** —— 这正是官方公告专门点名说明的原因 |
| 📝 仅"歌词掲載"可用的博客类 | アメーバブログ、JUGEM、Seesaa ブログ、はてなブログ、Yahoo!知恵袋、楽天ブログ（**注：该许可仅覆盖非商用配信中的歌词掲載，不以获取广告收入为目的**） |

**媒体报道佐证**：

- 電撃オンライン（2026-05-07）：*『FF14』楽曲の管理をJASRACに信託。XにBGM付きの動画を直接投稿することはNGに【ファイナルファンタジーXIV】* —— https://dengekionline.com/article/202605/74132
- ファミ通（2026-05）：*『FF14』BGM付き動画のX（Twitter）投稿を制限。全オリジナル楽曲著作権をJASRACに信託したため。楽曲を含まない場合であれば投稿OK* —— https://www.famitsu.com/article/202605/74167
- 週刊アスキー：*スクエニ、「FF14」楽曲の著作権管理をJASRAC信託へ変更* —— https://weekly.ascii.jp/elem/000/004/400/4400586/
- ASCII.jp —— https://ascii.jp/elem/000/004/400/4400586/

> **🔴 对本项目的直接影响（三条）**：
> 1. **FF14 音乐已不在 SE 一家说了算**。SE 的《素材使用许可》对音乐的授权，现在**叠加了一层 JASRAC 的集体管理许可**。以前"SE 许可了就行"，现在要"服务本身与 JASRAC 有协议"。
> 2. **"我自己的网站/我自己的游戏"不在 JASRAC 的 UGC 服务清单里**。清单里全是 UGC 平台（视频站、直播站、博客）。**一款自建网站上的游戏，不属于清单中的任何一类**。这意味着：即使你自认为符合 SE 的《素材使用许可》音乐条款，**JASRAC 层面的许可路径也不清晰**。
> 3. **JASRAC 的管理范围**：本次公告说"これまで国内のみ自社で管理"→"JASRAC に信託"。JASRAC 的信托通常覆盖**日本国内**的音乐著作权管理（涉外部分通过 CISAC 与国际姐妹协会互认，⚠️ 具体范围需向 JASRAC 确认）。
>
> **结论：FF14 音乐 = 高风险素材，建议完全不用。** 第 5 章给出可替代的免费音乐方案。

### 7.5 演奏相关指引（Performance Guidelines）

素材许可日文版第 1 条提到：

> ※コンサートや演奏会での楽曲利用は本条件の対象外となりますので、以下の**演奏に関するガイドライン**をご確認後所定の申請をお願いします。なお、ファイナルファンタジーXIVの楽曲は**有料のコンサートや演奏会には編曲の許諾をしておりません**。
> 演奏に関するガイドライン：https://sqex.to/sPDbE

> **中文要点**：线下演奏/音乐会**不在**素材使用许可范围内，需另按演奏指引申请；**收费演出不授予编曲许可**。与放置游戏基本无关（除非你做音乐小游戏或线下活动），但说明 **SE 对不同使用场景是分文件管理的，不要拿一份许可去覆盖所有场景**。

### 7.6 婚礼/伴侣仪式利用（Wedding Use）

日文版独有的许可类型（英文版无对应条款，是日文版更细的地方）：

| 项目 | 内容 |
|---|---|
| 适用对象 | **仅限**通过 FF14 结识并缔结婚姻/伴侣关系的两人 |
| 允许内容 | a) 使用游戏内音源录音或原声专辑音源作为 BGM（可为 BGM 用途复制音源）；b) 上映**申请者本人拍摄、编辑**的 FF14 游戏内影像（可配 a 的 BGM） |
| 申请方式 | 表单 https://sqex.to/EHb9b |
| 所需信息 | 两人姓名、仪式日期地点、角色名/服务器名、相识经过、想用的曲目与用途（会场 BGM / 影像内）、是否使用影像 |
| 处理时长 | 约 **2 周** |
| SE 保留 | 可**完全裁量**拒绝且**不告知理由**，不承担任何责任、无披露义务 |
| 附加要求 | 即使 SE 同意，**音乐著作权仍需另行取得 JASRAC 许可** |
| 署名 | 影像内须显示 `© SQUARE ENIX`（一行） |

> **对项目的意义**：这是一个**反例参照**——它展示了 SE 在"愿意开口子"的场景下会走**正式申请+审批**流程。对"同人游戏"这类场景，SE**没有设置任何申请通道**。这意味着：⚠️ **不存在"合规地获得 FF14 同人游戏授权"的现成路径**（除了直接商务洽谈）。

### 7.7 其他相关指引与政策索引

| 指引 / 政策 | URL | 适用性 |
|---|---|---|
| FINAL FANTASY XIV Materials Usage License（含视频/音乐/TikTok 小节） | https://support.na.square-enix.com/rule.php?id=5382&la=1&tag=authc | ✅ 核心 |
| ファイナルファンタジーXIV 著作物利用条件 | https://support.jp.square-enix.com/rule.php?id=5381&la=0&tag=authc | ✅ 核心（日文口径更严） |
| FINAL FANTASY XIV, The Lodestone ガイドライン | https://support.jp.square-enix.com/rule.php?id=5381&la=0&tag=playerssite | 适用于 Lodestone 用户页 |
| ファイナルファンタジーXIV フォーラム ガイドライン | https://support.jp.square-enix.com/rule.php?id=5381&la=0&tag=forum | 官方论坛行为规范 |
| FINAL FANTASY XIV 利用規約 | https://support.jp.square-enix.com/rule.php?id=5381&la=0&tag=users | ✅ EULA（日） |
| FINAL FANTASY XIV ソフトウェア使用許諾契約 | https://support.jp.square-enix.com/rule.php?id=5381&la=0&tag=software | 软件许可（日） |
| FINAL FANTASY XIV User Agreement（EU/EN） | https://support.eu.square-enix.com/rule.php?id=5383&la=2&tag=users | ✅ EULA（英） |
| アカウントペナルティーポリシー | https://support.jp.square-enix.com/faqarticle.php?kid=68098&id=5381&la=0&ret=rule | 处罚阶梯 |
| ファイナルファンタジーXIV 禁止事項 | https://support.jp.square-enix.com/faqarticle.php?id=5381&la=0&kid=68216 | ✅ 含数据解析/工具制作禁令 |
| Square Enix West Material Usage Policy | https://www.square-enix-games.com/en_US/documents/materialusagepolicy | ❌ **不适用 FF14**（FF16 例外），仅作立场旁证 |
| Square Enix Unsolicited Content Policy | https://square-enix-games.com/en_US/documents/unsol | 🟡 关于"主动投稿的创意"，若你向 SE 投稿创意需注意 |
| スクウェア・エニックス「著作権について」 | https://www.jp.square-enix.com/caution.html | ✅ 通用著作权立场（"非商业也违法"） |
| JASRAC UGC 服务清单 | https://www.jasrac.or.jp/information/topics/20/ugc.html | ✅ 音乐使用的前置条件 |

> **关于 Unsolicited Content Policy（主动投稿政策）的风险提示** ⚠️：
> SE 有一份"未经请求的内容"政策，大意是**如果你主动向 SE 投稿创意，即使 SE 后来做出相似的产品，你也不能主张任何权利**。
> - 对放置游戏的影响：**不要把你的游戏设计文档/创意"寄给 SE 求认可"**——这不会得到授权，反而可能让你未来更难主张"这是我先做的"。
> - **也不要指望"先做出来，SE 看到后收编"**（Melvor Idle 模式，见第 4 章）——那是极少数幸运案例，且 Melvor 是**原创 IP**（只是玩法类似 RuneScape），不是同人 IP 游戏。

---
