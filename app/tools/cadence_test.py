"""
周期系统（每日轮盘 / 每周天书奇谭）验证

覆盖：
  1. 新档自动获得当日轮盘目标，且同一天内确定性一致
  2. 通关轮盘目标 → 金币/经验倍率生效、当日标记为已完成
  3. 天书奇谭计数器随玩法推进，盖章与连线判定正确
  4. 连线可领取并发放奖励
  5. 跨日 → 每日重置（换目标、清完成标记）
  6. 跨周 → 每周重置（计数器归零）

用法：python tools/cadence_test.py   （需先启动 vite preview --port 4173）
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

        # 干净开局
        page.goto(URL, wait_until="networkidle")
        page.evaluate("localStorage.clear()")
        page.reload(wait_until="networkidle")
        page.wait_for_timeout(900)

        # 1) 轮盘目标
        d1 = page.evaluate("window.__FF14IDLE__.store.require().daily")
        check("新档即有当日轮盘目标", bool(d1.get("rouletteDungeonId")), str(d1.get("rouletteDungeonId")))
        check("轮盘当日未完成", d1.get("rouletteDone") is False)

        # 同日确定性：再次刷新周期不应换目标
        same = page.evaluate(
            """() => {
                const st = window.__FF14IDLE__.store.require();
                const before = st.daily.rouletteDungeonId;
                window.__FF14IDLE__.cadence();
                return before === st.daily.rouletteDungeonId;
            }"""
        )
        check("同日内轮盘目标稳定（确定性）", same)

        # 2) 派遣并通关轮盘目标
        page.evaluate(
            """() => {
                const st = window.__FF14IDLE__.store.require();
                window.__FF14IDLE__.store.notify();
                // 通过 UI 选中轮盘目标副本
                const id = st.daily.rouletteDungeonId;
                document.querySelector(`[data-action='pick-dungeon'][data-dungeon='${id}']`)?.click();
            }"""
        )
        page.wait_for_timeout(300)
        page.locator("[data-action='dispatch']").click()
        page.wait_for_timeout(500)

        gold_before = page.evaluate("window.__FF14IDLE__.store.require().gold")
        # 回拨 + 刷新页面 → 离线结算
        page.evaluate(
            """() => {
                const api = window.__FF14IDLE__;
                const st = api.store.require();
                for (const e of st.expeditions) if (!e.collected) e.startTs -= 20 * 60 * 1000;
                api.save();
            }"""
        )
        page.reload(wait_until="networkidle")
        page.wait_for_timeout(900)
        page.locator("[data-action='collect']:not([disabled])").first.click()
        page.wait_for_timeout(600)

        toast = page.locator("#toast").inner_text()
        check("收获提示包含轮盘加成", "轮盘加成" in toast, toast)
        after = page.evaluate("window.__FF14IDLE__.store.require()")
        check("当日轮盘标记为已完成", after["daily"]["rouletteDone"] is True)
        check("金币确实增加", after["gold"] > gold_before, f"{gold_before} -> {after['gold']}")
        check("轮盘额外装备已入包", len(after["inventory"]) >= 1, f"{len(after['inventory'])} 件")

        # 3) 天书计数器
        c = after["weekly"]["counters"]
        check("天书计数：通关/派遣/轮盘已记", c.get("clears", 0) >= 1 and c.get("dispatches", 0) >= 1 and c.get("roulette", 0) >= 1, str(c))
        check("天书连线尚不可领（贴纸不足）", page.evaluate("window.__FF14IDLE__.tailClaimable().length") == 0)

        # 4) 人为补齐第一列（clear1 / roulette1 / gold800）→ 应可领
        page.evaluate(
            """() => {
                const st = window.__FF14IDLE__.store.require();
                st.weekly.counters.goldEarned = 900;
                window.__FF14IDLE__.store.notify();
            }"""
        )
        page.locator("[data-action='tab'][data-tab='cadence']").click()
        page.wait_for_timeout(400)
        claimable = page.evaluate("window.__FF14IDLE__.tailClaimable()")
        check("补齐后第一列可领取", "c0" in claimable, str(claimable))

        gold_before_claim = page.evaluate("window.__FF14IDLE__.store.require().gold")
        page.locator("[data-action='claim-line'][data-line='c0']").click()
        page.wait_for_timeout(500)
        after2 = page.evaluate("window.__FF14IDLE__.store.require()")
        check("领奖后金币增加", after2["gold"] > gold_before_claim, f"{gold_before_claim} -> {after2['gold']}")
        check("领奖后连线记为已领", "c0" in after2["weekly"]["claimedLines"])

        page.screenshot(path=str(__import__("pathlib").Path(__file__).parent.parent / "screenshots" / "06-cadence.png"), full_page=True)

        # 5) 跨日重置
        day = page.evaluate(
            """() => {
                const st = window.__FF14IDLE__.store.require();
                const oldTarget = st.daily.rouletteDungeonId;
                st.daily.key = '1999-01-01';
                st.daily.rouletteDone = true;
                const r = window.__FF14IDLE__.cadence();
                return { changed: r.dayChanged, done: st.daily.rouletteDone, key: st.daily.key, oldTarget,
                         newTarget: st.daily.rouletteDungeonId };
            }"""
        )
        check("跨日触发每日重置", day["changed"] is True)
        check("跨日后完成标记清空", day["done"] is False)
        check("跨日后重新指派目标", bool(day["newTarget"]), f"{day['oldTarget']} -> {day['newTarget']}")

        # 6) 跨周重置
        week = page.evaluate(
            """() => {
                const st = window.__FF14IDLE__.store.require();
                st.weekly.key = '1999-01-04';
                st.weekly.claims = 3;
                const r = window.__FF14IDLE__.cadence();
                return { changed: r.weekChanged, clears: st.weekly.counters.clears ?? 0, claims: st.weekly.claims };
            }"""
        )
        check("跨周触发每周重置", week["changed"] is True)
        check("跨周后计数器归零", week["clears"] == 0, f"clears={week['clears']}")
        check("跨周后领奖次数归零", week["claims"] == 0)

        # 7) 时间边界（每周一 04:00 是切换点，最容易算错）
        t = page.evaluate(
            """() => {
                const T = window.__FF14IDLE__.time;
                const H = 3600 * 1000;
                // 2026-09-14 是周一
                const monBefore = new Date(2026, 8, 14, 3, 0, 0).getTime();  // 周一 03:00（尚未跨周）
                const monAfter  = new Date(2026, 8, 14, 5, 0, 0).getTime();  // 周一 05:00（已跨周）
                const tue       = new Date(2026, 8, 15, 23, 49, 0).getTime(); // 周二 23:49
                return {
                    wkBefore: T.weekKey(monBefore),
                    untilBefore: T.msUntilWeeklyReset(monBefore) / H,
                    wkAfter: T.weekKey(monAfter),
                    untilAfter: T.msUntilWeeklyReset(monAfter) / H,
                    untilTue: T.msUntilWeeklyReset(tue) / H,
                    dkBefore: T.dayKey(monBefore),
                    untilDailyBefore: T.msUntilDailyReset(monBefore) / H,
                    dkAfter: T.dayKey(monAfter),
                    untilDailyAfter: T.msUntilDailyReset(monAfter) / H,
                };
            }"""
        )
        check("周一 03:00 仍属上一周", t["wkBefore"] == "2026-09-07", t["wkBefore"])
        check("周一 03:00 距周重置 ≈1 小时", abs(t["untilBefore"] - 1) < 0.05, f"{t['untilBefore']:.2f}h")
        check("周一 05:00 属于本周", t["wkAfter"] == "2026-09-14", t["wkAfter"])
        check("周一 05:00 距周重置 ≈167 小时", abs(t["untilAfter"] - 167) < 0.05, f"{t['untilAfter']:.2f}h")
        check("周二 23:49 距周重置 ≈124 小时", abs(t["untilTue"] - 124.2) < 0.1, f"{t['untilTue']:.2f}h")
        check("周一 03:00 仍属前一日", t["dkBefore"] == "2026-09-13", t["dkBefore"])
        check("周一 03:00 距日重置 ≈1 小时", abs(t["untilDailyBefore"] - 1) < 0.05, f"{t['untilDailyBefore']:.2f}h")
        check("周一 05:00 属于当日", t["dkAfter"] == "2026-09-14", t["dkAfter"])
        check("周一 05:00 距日重置 ≈23 小时", abs(t["untilDailyAfter"] - 23) < 0.05, f"{t['untilDailyAfter']:.2f}h")

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
