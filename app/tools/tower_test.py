"""
无尽塔（深层迷宫式）验证 + 难度探针

覆盖：
  1. 新档无攀爬、塔之记忆 0、历史最高 0、赛季键已初始化
  2. 组队开始攀爬：第 1 层、塔内等级 1
  3. 逐层推进：层数/塔内等级递增，跨层血量继承
  4. 休整层（每 5 层）确实回血且不战斗
  5. 每 3 层产出待鉴定箱
  6. 结束（倒下或撤退）后：结算收益、开箱出装备、**塔之记忆永久累积**、历史最高更新
  7. ⭐ **软重置**：再次攀爬回到第 1 层与 1 级，但塔之记忆保留（且新一局享有加成）
  8. 主动撤退保留已完成楼层收益
  9. 每周赛季重置只清赛季纪录，**不清塔之记忆与历史最高**
 10. 刷新后状态保留（存档版本 7）
 11. UI 渲染 9 个 Tab 与无尽塔面板
 12. 难度探针：统计 15 级无装备队伍能爬多少层

用法：python tools/tower_test.py   （需先启动 vite preview --port 4173）
"""
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

sys.path.insert(0, str(Path(__file__).resolve().parent))
from ui_harness import count_of, evaluate  # noqa: E402

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
        evaluate(page, "localStorage.clear()")
        page.reload(wait_until="networkidle")
        page.wait_for_timeout(900)

        # 1) 初始状态
        init = evaluate(page, 
            """() => {
                const api = window.__FF14IDLE__;
                return { run: api.tower.run(), memory: api.tower.memory(), best: api.tower.best(),
                         season: api.tower.season() };
            }"""
        )
        check("新档没有进行中的攀爬", init["run"] is None)
        check("塔之记忆初始为 0", init["memory"] == 0, str(init["memory"]))
        check("历史最高初始为 0", init["best"] == 0, str(init["best"]))
        check("赛季键已初始化", bool(init["season"] and init["season"].get("key")), str(init["season"]))

        # 2) 开始攀爬
        start = evaluate(page, 
            """() => {
                const api = window.__FF14IDLE__; const st = api.store.require();
                const byJob = (j) => st.members.find(m => m.job === j)?.id;
                const ids = [byJob('WAR'), byJob('WHM'), byJob('BLM')].filter(Boolean);
                const r = api.tower.start(ids);
                const run = api.tower.run();
                return { ok: r.ok, error: r.error, floor: run?.floor, level: run?.level, log: run?.log?.[0] ?? '' };
            }"""
        )
        check("开始攀爬成功", start["ok"] is True, str(start.get("error")))
        check("起始为第 1 层 / 塔内 1 级", start["floor"] == 1 and start["level"] == 1, f"floor={start['floor']} lv={start['level']}")

        # 3) 一路爬到结束，记录过程
        trace = evaluate(page, 
            """() => {
                const api = window.__FF14IDLE__;
                const steps = [];
                let restHealed = false;
                let boxSeen = false;
                for (let i = 0; i < 80; i++) {
                    const before = api.tower.run();
                    if (!before) break;
                    const hpBefore = Object.values(before.hp).reduce((a,b)=>a+b,0);
                    const wasRest = before.floor % 5 === 0;
                    const r = api.tower.climb();
                    const after = api.tower.run();
                    const hpAfter = after ? Object.values(after.hp).reduce((a,b)=>a+b,0) : 0;
                    steps.push({ floor: before.floor, rest: wasRest, win: r.win, finished: r.finished });
                    if (wasRest && after && hpAfter > hpBefore) restHealed = true;
                    if (after && after.boxes > 0) boxSeen = true;
                    if (!r.ok || r.finished) break;
                }
                return { steps, restHealed, boxSeen, remaining: api.tower.run(),
                         memory: api.tower.memory(), best: api.tower.best() };
            }"""
        )
        floors = [s["floor"] for s in trace["steps"]]
        check("能连续推进多层", len(floors) >= 3, f"推进了 {len(floors)} 次：{floors}")
        check("休整层确实回血", trace["restHealed"] is True)
        check("产出过待鉴定箱", trace["boxSeen"] is True)
        check("结束后攀爬已清空", trace["remaining"] is None)

        # 3b) ⭐ 塔的节奏：5 层休整、10 层层主
        #     曾经 `isRestFloor` 写成"每 5 层"，而休整层直接返回空敌人，
        #     于是第 10/20/30 层永远是休整层，`isBoss = floor % 10 === 0` 成了死代码——
        #     整座塔没有任何层主。这里用真实推进来验证层主确实存在。
        rhythm = evaluate(page, 
            """() => {
                const api = window.__FF14IDLE__; const st = api.store.require();
                const byJob = (j) => st.members.find(m => m.job === j)?.id;
                const ids = [byJob('WAR'), byJob('WHM'), byJob('BLM')].filter(Boolean);
                const cur = api.tower.run();
                if (cur) api.tower.retreat();
                st.gold = 99999;
                api.tower.start(ids);
                const out = { restAt: {}, bossLogAt10: '', floors: [] };
                for (let i = 0; i < 11; i++) {
                    const before = api.tower.run();
                    if (!before) break;
                    const floor = before.floor;
                    const r = api.tower.climb();
                    out.floors.push({ floor, rest: !!r.rest, win: !!r.win, finished: !!r.finished });
                    if (r.rest) out.restAt[floor] = true;
                    if (floor === 10) out.bossLogAt10 = (r.log || []).join(' | ');
                    if (r.finished) break;
                }
                if (api.tower.run()) api.tower.retreat();
                return out;
            }"""
        )
        rest_floors = sorted(int(f) for f in rhythm["restAt"].keys())
        f10 = next((x for x in rhythm["floors"] if x["floor"] == 10), None)
        check("第 5 层是休整层", 5 in rest_floors, f"休整层：{rest_floors}")
        check("第 10 层不再是休整层（让位给层主）", f10 is not None and f10["rest"] is False, str(f10))
        # 第 10 层必须"真的打起来了"——用爆发窗口作为战斗发生的证据
        # （不能断言"击败层主"：层主很硬，15 级队伍通常打不过，日志里就不会出现击败行）
        check("第 10 层确实发生战斗（有层主）", "爆发窗口" in rhythm["bossLogAt10"], rhythm["bossLogAt10"][:80])

        after_run = evaluate(page, "() => window.__FF14IDLE__.store.require()")
        check("塔之记忆已累积", trace["memory"] > 0, f"memory={trace['memory']}")
        check("历史最高已记录", trace["best"] > 0, f"best={trace['best']}")
        check("发放了金币与装备", after_run["gold"] > 300 and len(after_run["inventory"]) > 0,
              f"gold={after_run['gold']} inv={len(after_run['inventory'])}")

        # 4) 软重置：再来一次，回到 1 层 1 级，但记忆保留
        soft = evaluate(page, 
            """() => {
                const api = window.__FF14IDLE__; const st = api.store.require();
                const byJob = (j) => st.members.find(m => m.job === j)?.id;
                const ids = [byJob('WAR'), byJob('WHM'), byJob('BLM')].filter(Boolean);
                const memBefore = api.tower.memory();
                api.tower.start(ids);
                const run = api.tower.run();
                return { floor: run.floor, level: run.level, memBefore, memAfter: api.tower.memory(),
                         log: run.log[0] };
            }"""
        )
        check("软重置：回到第 1 层 / 1 级", soft["floor"] == 1 and soft["level"] == 1,
              f"floor={soft['floor']} lv={soft['level']}")
        check("软重置后记忆保留", soft["memAfter"] == soft["memBefore"] and soft["memBefore"] > 0,
              f"{soft['memBefore']} -> {soft['memAfter']}")
        check("新一局享有记忆加成（日志可见）", "塔之记忆加成" in soft["log"], soft["log"][:80])

        # 5) 主动撤退保留收益
        retreat = evaluate(page, 
            """() => {
                const api = window.__FF14IDLE__; const st = api.store.require();
                api.tower.climb(); api.tower.climb();
                const goldBefore = st.gold;
                const r = api.tower.retreat();
                return { ok: r.ok, floor: r.settlement?.floor, gold: r.settlement?.gold,
                         goldBefore, goldAfter: st.gold, run: api.tower.run() };
            }"""
        )
        check("主动撤退成功", retreat["ok"] is True)
        check("撤退结算了已完成楼层收益", retreat["floor"] >= 1 and retreat["goldAfter"] >= retreat["goldBefore"],
              f"到达 {retreat['floor']} 层，收益 {retreat['gold']}")
        check("撤退后攀爬已清空", retreat["run"] is None)

        # 6) 赛季重置只清赛季纪录（把周键与赛季键一起设为过期，模拟真正跨周）
        season = evaluate(page, 
            """() => {
                const api = window.__FF14IDLE__; const st = api.store.require();
                const memBefore = api.tower.memory();
                const bestBefore = api.tower.best();
                st.weekly.key = '1999-01-04';
                st.towerSeason = { key: '1999-01-04', best: 99 };
                const r = api.cadence();
                return { weekChanged: r.weekChanged, season: api.tower.season(),
                         memory: api.tower.memory(), best: api.tower.best(),
                         memBefore, bestBefore };
            }"""
        )
        check("跨周触发每周重置", season["weekChanged"] is True)
        check("赛季最高层清零", season["season"]["best"] == 0, str(season["season"]))
        check("塔之记忆不受赛季重置影响", season["memory"] == season["memBefore"], f"{season['memBefore']} -> {season['memory']}")
        check("历史最高层不受赛季重置影响", season["best"] == season["bestBefore"], f"{season['bestBefore']} -> {season['best']}")

        # 6b) 赛季同步是幂等的：赛季键过期但周键正常时也应自动纠正
        resync = evaluate(page, 
            """() => {
                const api = window.__FF14IDLE__; const st = api.store.require();
                st.towerSeason = { key: '1999-01-04', best: 42 };
                api.cadence();
                return api.tower.season();
            }"""
        )
        check("赛季键过期也能自动同步（幂等）", resync["best"] == 0 and resync["key"] != "1999-01-04", str(resync))

        # 7) 持久化
        evaluate(page, "window.__FF14IDLE__.save()")
        page.reload(wait_until="networkidle")
        page.wait_for_timeout(900)
        persisted = evaluate(page, 
            """() => {
                const api = window.__FF14IDLE__;
                return { memory: api.tower.memory(), best: api.tower.best(),
                         version: api.store.require().version };
            }"""
        )
        check("刷新后塔之记忆保留", persisted["memory"] > 0, str(persisted["memory"]))
        check("刷新后历史最高保留", persisted["best"] > 0, str(persisted["best"]))
        check("存档版本已升级（≥7）", persisted["version"] >= 7, str(persisted["version"]))

        # 8) UI
        tabs = count_of(page, ".tab-btn")
        check("Tab 渲染完整（≥9）", tabs >= 9, f"{tabs} 个")
        page.locator("[data-action='tab'][data-tab='tower']").click()
        page.wait_for_timeout(500)
        check("无尽塔面板可渲染", count_of(page, "[data-action='toggle-tower-party']") >= 3)
        check("页面无 JS 错误", len(errors) == 0, "; ".join(errors[:2])[:200])

        page.screenshot(
            path=str(__import__("pathlib").Path(__file__).parent.parent / "screenshots" / "11-tower.png"),
            full_page=True,
        )

        # 9) 难度探针：15 级无装备队伍能爬多少层
        probe = evaluate(page, 
            """() => {
                const api = window.__FF14IDLE__; const st = api.store.require();
                // 重置为"新号实力"以测基线
                st.towerMemory = 0;
                for (const m of st.members) m.level = 15;
                const byJob = (j) => st.members.find(m => m.job === j)?.id;
                const ids = [byJob('WAR'), byJob('WHM'), byJob('BLM')].filter(Boolean);
                const reached = [];
                for (let t = 0; t < 5; t++) {
                    const cur = api.tower.run();
                    if (cur) api.tower.retreat();
                    if (!api.tower.start(ids).ok) break;
                    for (let i = 0; i < 80; i++) {
                        const r = api.tower.climb();
                        if (!r.ok || r.finished) break;
                    }
                    reached.push(api.tower.best());
                    st.towerMemory = 0;   // 保持每局基线一致，避免记忆叠加影响探针
                    st.towerBest = 0;
                }
                return reached;
            }"""
        )
        avg = sum(probe) / max(1, len(probe))
        print(f"\n  难度探针 A（5 局，15 级无装备队伍）：到达层数 {probe}，平均 {avg:.1f} 层")
        check("难度合理（平均 3–40 层）", 3 <= avg <= 40, f"平均 {avg:.1f} 层")

        # 9b) ⭐ 天花板可达性：练过的队伍必须能越过"新手墙"
        #     战斗内核用期望值（蓝图 M7 的设计决定），所以墙是**精确**的——
        #     因此更要验证"这道墙确实能靠成长越过"，否则玩家练级也没用。
        probe2 = evaluate(page, 
            """() => {
                const api = window.__FF14IDLE__; const st = api.store.require();
                st.towerMemory = 0;
                for (const m of st.members) m.level = 55;
                const byJob = (j) => st.members.find(m => m.job === j)?.id;
                const ids = [byJob('WAR'), byJob('WHM'), byJob('BLM')].filter(Boolean);
                const reached = [];
                for (let t = 0; t < 3; t++) {
                    const cur = api.tower.run();
                    if (cur) api.tower.retreat();
                    if (!api.tower.start(ids).ok) break;
                    for (let i = 0; i < 80; i++) {
                        const r = api.tower.climb();
                        if (!r.ok || r.finished) break;
                    }
                    reached.push(api.tower.best());
                    st.towerMemory = 0;
                    st.towerBest = 0;
                }
                return reached;
            }"""
        )
        avg2 = sum(probe2) / max(1, len(probe2))
        print(f"  难度探针 B（3 局，55 级队伍）：到达层数 {probe2}，平均 {avg2:.1f} 层")
        check("练级后能越过新手墙（B 明显高于 A）", avg2 > avg + 5, f"A={avg:.1f} vs B={avg2:.1f}")

        browser.close()

    failed = [r for r in results if not r[1]]
    print("\n" + "=" * 52)
    print(f"合计 {len(results)} 项，通过 {len(results) - len(failed)}，失败 {len(failed)}")
    for name, _, detail in failed:
        print(f"  FAIL: {name} {detail}")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
