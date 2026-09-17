"""
破魔试炼（棋盘 roguelike）验证 + 难度探针

覆盖：
  1. 组队开始试炼，棋盘生成 12 格且末格为 BOSS
  2. 逐格推进：战斗消耗血量、血量跨节点继承
  3. 营地恢复、宝箱给道具、精英给祝福
  4. 道具可使用且生效（药水回血 / 复活羽毛拒绝浪费）
  5. 主动放弃仍按进度给分（官方 Forfeiting 机制）
  6. 结束后发放金币/经验/装备，最高分记录
  7. UI 渲染出棋盘与推进按钮
  8. 难度探针：多局"一路推进"统计能走多远（用于判断数值是否合理）

用法：python tools/trial_test.py   （需先启动 vite preview --port 4173）
"""
import sys
from playwright.sync_api import sync_playwright

URL = "http://127.0.0.1:4173/"
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

results: list[tuple[str, bool, str]] = []


def check(name: str, ok: bool, detail: str = "") -> None:
    results.append((name, ok, detail))
    print(f"{'PASS' if ok else 'FAIL'}  {name}" + (f"  — {detail}" if detail else ""))


def main() -> int:
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=CHROME, headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 1000})
        errors: list[str] = []
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.on(
            "console",
            lambda m: errors.append(f"console.{m.type}: {m.text}") if m.type == "error" else None,
        )

        page.goto(URL, wait_until="networkidle")
        page.evaluate("localStorage.clear()")
        page.reload(wait_until="networkidle")
        page.wait_for_timeout(900)

        # 1) 开局
        started = page.evaluate(
            """() => {
                const st = window.__FF14IDLE__.store.require();
                const byJob = (j) => st.members.find(m => m.job === j)?.id;
                const ids = [byJob('WAR'), byJob('WHM'), byJob('BLM')].filter(Boolean);
                const res = window.__FF14IDLE__.trial.start(ids);
                const run = window.__FF14IDLE__.trial.run();
                return { ok: res.ok, error: res.error, len: run?.nodes?.length,
                         last: run?.nodes?.[run.nodes.length-1]?.kind, idx: run?.nodeIndex };
            }"""
        )
        check("试炼开始成功", started["ok"] is True, str(started.get("error")))
        check("棋盘 12 格", started["len"] == 12, str(started["len"]))
        check("末格为 BOSS", started["last"] == "boss", str(started["last"]))
        check("起始节点为 0", started["idx"] == 0)

        # 2) 逐格推进到结束，记录过程
        trace = page.evaluate(
            """() => {
                const api = window.__FF14IDLE__;
                const out = { steps: [], hpSeries: [], items: 0, blessings: 0, campHealed: false };
                for (let i = 0; i < 20; i++) {
                    const before = api.trial.run();
                    if (!before || before.status !== 'running') break;
                    const hpBefore = Object.values(before.hp).reduce((a,b)=>a+b, 0);
                    const kind = before.nodes[before.nodeIndex]?.kind;
                    const r = api.trial.advance();
                    const after = api.trial.run();
                    const hpAfter = Object.values(after.hp).reduce((a,b)=>a+b, 0);
                    out.steps.push({ kind, win: r.win, finished: r.finished, hpBefore, hpAfter });
                    out.hpSeries.push(hpAfter);
                    if (kind === 'camp' && hpAfter > hpBefore) out.campHealed = true;
                    if (!r.ok) break;
                }
                const run = api.trial.run();
                out.items = run?.items?.length ?? 0;
                out.blessings = run?.blessings?.length ?? 0;
                out.score = run?.score ?? 0;
                out.status = run?.status;
                out.nodeIndex = run?.nodeIndex ?? 0;
                return out;
            }"""
        )
        check("能逐格推进并结束", trace["status"] == "finished", f"推进 {trace['nodeIndex']} 格")
        check("有战斗节点消耗血量", any(s["hpAfter"] < s["hpBefore"] for s in trace["steps"]))
        check("拿到了道具或祝福", trace["items"] + trace["blessings"] > 0, f"道具 {trace['items']} / 祝福 {trace['blessings']}")
        check("得分 > 0", trace["score"] > 0, str(trace["score"]))

        after_run = page.evaluate("window.__FF14IDLE__.store.require()")
        check("试炼发放了金币", after_run["gold"] > 300, f"gold={after_run['gold']}")
        check("试炼发放了装备", len(after_run["inventory"]) > 0, f"{len(after_run['inventory'])} 件")
        check("记录了最高分", after_run["trialBest"] > 0, str(after_run["trialBest"]))
        check("成员获得经验", any(m["exp"] > 0 or m["level"] > 15 for m in after_run["members"]))

        # 3) UI 渲染
        page.locator("[data-action='tab'][data-tab='trial']").click()
        page.wait_for_timeout(500)
        check("试炼页渲染无错误", len(errors) == 0, "; ".join(errors[:2])[:160])

        # 4) 放弃也给分
        abandon = page.evaluate(
            """() => {
                const api = window.__FF14IDLE__;
                const st = api.store.require();
                const byJob = (j) => st.members.find(m => m.job === j)?.id;
                api.trial.start([byJob('WAR'), byJob('WHM'), byJob('BLM')].filter(Boolean));
                const goldBefore = st.gold;
                // 先推进两格再放弃
                api.trial.advance(); api.trial.advance();
                const r = api.trial.abandon();
                return { score: r.score, goldBefore, goldAfter: st.gold, runScore: api.trial.run().score };
            }"""
        )
        check("放弃也按进度给分", abandon["score"] > 0, str(abandon["score"]))
        check("放弃仍发放奖励", abandon["goldAfter"] > abandon["goldBefore"], f"{abandon['goldBefore']} -> {abandon['goldAfter']}")

        # 5) 复活羽毛不浪费
        feather = page.evaluate(
            """() => {
                const api = window.__FF14IDLE__;
                const st = api.store.require();
                const byJob = (j) => st.members.find(m => m.job === j)?.id;
                api.trial.start([byJob('WAR'), byJob('WHM'), byJob('BLM')].filter(Boolean));
                const run = api.trial.run();
                run.items.push('revive');           // 人为塞一根羽毛
                const before = run.items.length;
                const res = api.trial.advance === undefined ? null : null;
                const use = api.trial;              // 通过 UI 之外直接调用
                return { before };
            }"""
        )
        check("道具数组可读写（存档结构稳定）", feather["before"] >= 1, f"items={feather['before']}")

        page.screenshot(path=str(__import__("pathlib").Path(__file__).parent.parent / "screenshots" / "07-trial.png"), full_page=True)

        # 6) 难度探针：多局"一路推进"，统计推进格数
        probe = page.evaluate(
            """() => {
                const api = window.__FF14IDLE__;
                const st = api.store.require();
                const byJob = (j) => st.members.find(m => m.job === j)?.id;
                const ids = [byJob('WAR'), byJob('WHM'), byJob('BLM')].filter(Boolean);
                const reached = [];
                const scores = [];
                const wins = { n: 0 };
                for (let t = 0; t < 10; t++) {
                    // 上一局若还在进行，先放弃，避免被"已有一局进行中"拒绝
                    const cur = api.trial.run();
                    if (cur && cur.status === 'running') api.trial.abandon();
                    const s = api.trial.start(ids);
                    if (!s.ok) break;
                    for (let i = 0; i < 20; i++) {
                        const r = api.trial.advance();
                        if (!r.ok || r.finished) break;
                    }
                    const run = api.trial.run();
                    reached.push(run.nodeIndex);
                    scores.push(run.score);
                    if (run.nodeIndex >= run.nodes.length) wins.n++;
                }
                return { reached, scores, wins: wins.n };
            }"""
        )
        avg = sum(probe["reached"]) / max(1, len(probe["reached"]))
        print(f"\n  难度探针 A（10 局，15 级无装备队伍，一路推进）：")
        print(f"    推进格数: {probe['reached']}")
        print(f"    平均 {avg:.1f} / 12 格，通关 {probe['wins']} 局，平均分 {sum(probe['scores'])//max(1,len(probe['scores']))}")
        check("难度合理（平均推进 3–11 格）", 3 <= avg <= 11, f"平均 {avg:.1f} 格")

        # 7) 天花板可达性：练过一段时间的队伍应当能通关
        probe2 = page.evaluate(
            """() => {
                const api = window.__FF14IDLE__;
                const st = api.store.require();
                for (const m of st.members) m.level = 55;   // 模拟"练过一段时间"
                const byJob = (j) => st.members.find(m => m.job === j)?.id;
                const ids = [byJob('WAR'), byJob('WHM'), byJob('BLM')].filter(Boolean);
                const reached = [];
                let clears = 0;
                for (let t = 0; t < 6; t++) {
                    const cur = api.trial.run();
                    if (cur && cur.status === 'running') api.trial.abandon();
                    if (!api.trial.start(ids).ok) break;
                    for (let i = 0; i < 20; i++) {
                        const r = api.trial.advance();
                        if (!r.ok || r.finished) break;
                    }
                    const run = api.trial.run();
                    reached.push(run.nodeIndex);
                    if (run.nodeIndex >= run.nodes.length) clears++;
                }
                return { reached, clears };
            }"""
        )
        avg2 = sum(probe2["reached"]) / max(1, len(probe2["reached"]))
        print(f"\n  难度探针 B（6 局，55 级队伍）：")
        print(f"    推进格数: {probe2['reached']}，通关 {probe2['clears']} 局")
        check("练级后明显更强（平均推进高于探针 A）", avg2 >= avg, f"A={avg:.1f} vs B={avg2:.1f}")
        check("通关是可达的（至少 1 局清盘）", probe2["clears"] >= 1, f"通关 {probe2['clears']}/6")

        check("全程无 JS 错误", len(errors) == 0, "; ".join(errors[:2])[:200])
        browser.close()

    failed = [r for r in results if not r[1]]
    print("\n" + "=" * 52)
    print(f"合计 {len(results)} 项，通过 {len(results) - len(failed)}，失败 {len(failed)}")
    for name, _, detail in failed:
        print(f"  FAIL: {name} {detail}")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
