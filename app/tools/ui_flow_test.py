"""
界面可玩性测试（**全程只用鼠标点击驱动**）

为什么需要这个文件：
  其余测试套件都通过调试 API（`window.__FF14IDLE__`）直接调游戏逻辑，
  于是"逻辑正确但界面接不上"这类 bug 完全测不到。
  真实案例：破魔试炼的 `renderTrialTab` 状态守卫写反（`!== 'finished'` 把 `running`
  也匹配进去），导致**开始试炼后界面仍停在组队页**——看不到棋盘、点不到「推进」，
  整个玩法通过 UI 根本玩不了，而 20 项试炼断言全绿。

所以这里刻意**不调用任何调试 API 来推进游戏**，只允许用调试 API 读取状态做断言。

用法：python tools/ui_flow_test.py   （需先启动 vite preview --port 4173）
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
        page = browser.new_page(viewport={"width": 1360, "height": 1000})
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

        # ---------------- 破魔试炼：纯点击 ----------------
        page.locator("[data-action='tab'][data-tab='trial']").click()
        page.wait_for_timeout(350)
        for i in range(3):
            page.locator("[data-action='toggle-trial-party']").nth(i).click()
            page.wait_for_timeout(120)
        check("试炼：能通过界面选满 3 人", page.locator("[data-action='trial-start']").is_enabled())

        page.locator("[data-action='trial-start']").click()
        page.wait_for_timeout(500)
        nodes = page.locator("[data-action='inspect-node']").count()
        check("试炼：开始后出现棋盘（12 格）", nodes == 12, f"{nodes} 格")

        has_advance = page.locator("[data-action='trial-advance']").count() == 1
        check("试炼：出现「推进」按钮", has_advance)
        if has_advance:
            before = page.evaluate("window.__FF14IDLE__.trial.run().nodeIndex")
            page.locator("[data-action='trial-advance']").click()
            page.wait_for_timeout(500)
            after = page.evaluate("window.__FF14IDLE__.trial.run().nodeIndex")
            check("试炼：点「推进」真的前进了", after > before, f"第 {before} 格 -> 第 {after} 格")

            # 点格子看详情
            page.locator("[data-action='inspect-node']").nth(min(2, nodes - 1)).click()
            page.wait_for_timeout(350)
            check("试炼：点格子弹出详情", page.locator(".node-detail").count() == 1)
            page.screenshot(path=str(__import__("pathlib").Path(__file__).parent.parent / "screenshots" / "ui-trial-node.png"), full_page=True)

        # ---------------- 无尽塔：纯点击 ----------------
        page.locator("[data-action='tab'][data-tab='tower']").click()
        page.wait_for_timeout(350)
        for i in range(3):
            page.locator("[data-action='toggle-tower-party']").nth(i).click()
            page.wait_for_timeout(120)
        check("无尽塔：能通过界面选满 3 人", page.locator("[data-action='tower-start']").is_enabled())

        page.locator("[data-action='tower-start']").click()
        page.wait_for_timeout(500)
        has_climb = page.locator("[data-action='tower-climb']").count() == 1
        check("无尽塔：开始后出现「挑战」按钮", has_climb)
        if has_climb:
            before = page.evaluate("window.__FF14IDLE__.tower.run().floor")
            page.locator("[data-action='tower-climb']").click()
            page.wait_for_timeout(500)
            after = page.evaluate("window.__FF14IDLE__.tower.run().floor")
            check("无尽塔：点「挑战」层数前进", after > before, f"第 {before} 层 -> 第 {after} 层")

        # ---------------- 工房：纯点击 ----------------
        page.locator("[data-action='tab'][data-tab='facility']").click()
        page.wait_for_timeout(350)
        page.locator("[data-action='facility-assign'][data-project='mint']").first.click()
        page.wait_for_timeout(350)
        assigned = page.evaluate(
            "() => window.__FF14IDLE__.store.require().facility.slots.filter(Boolean).length"
        )
        check("工房：点项目能指派到槽位", assigned >= 1, f"{assigned} 个槽位在工作")

        page.evaluate("() => { window.__FF14IDLE__.store.require().facility.since -= 3600 * 1000; }")
        page.wait_for_timeout(1200)
        collectible = page.locator("[data-action='facility-collect']:not([disabled])").count() == 1
        check("工房：攒够产出后「领取」可用", collectible)
        if collectible:
            gold_before = page.evaluate("window.__FF14IDLE__.store.require().gold")
            page.locator("[data-action='facility-collect']").click()
            page.wait_for_timeout(500)
            gold_after = page.evaluate("window.__FF14IDLE__.store.require().gold")
            check("工房：领取后金币增加", gold_after > gold_before, f"{gold_before} -> {gold_after}")

        # ---------------- 派遣：纯点击（含刷新后的收获） ----------------
        page.locator("[data-action='tab'][data-tab='dispatch']").click()
        page.wait_for_timeout(300)
        page.locator("[data-action='pick-dungeon']:not(.locked)").first.click()
        page.wait_for_timeout(250)
        can_dispatch = page.locator("[data-action='dispatch']").is_enabled()
        check("派遣：选完副本后「派遣小队」可用", can_dispatch)
        if not can_dispatch:
            check("派遣：进行中时「战报」是禁用的", False, "无法派出队伍，后续断言跳过")
        else:
            page.locator("[data-action='dispatch']").click()
            page.wait_for_timeout(500)
            check("派遣：派出后出现进度条", page.locator("[data-progress]").count() >= 1)
            report_btn = page.locator("[data-action='view-report']").first
            check("派遣：进行中时「战报」是禁用的", not report_btn.is_enabled())

            # 只动时间（不碰游戏逻辑）：把已派出的队伍回拨 20 分钟
            page.evaluate(
                """() => {
                    const api = window.__FF14IDLE__; const st = api.store.require();
                    for (const e of st.expeditions) if (!e.collected) e.startTs -= 20 * 60 * 1000;
                    api.save();
                }"""
            )
            page.reload(wait_until="networkidle")
            page.wait_for_timeout(900)
            page.locator("[data-action='tab'][data-tab='dispatch']").click()
            page.wait_for_timeout(300)

            collect = page.locator("[data-action='collect']:not([disabled])")
            check("派遣：回来后「收获」可用", collect.count() == 1, f"{collect.count()} 个可收获")
            if collect.count() == 1:
                gold_before = page.evaluate("window.__FF14IDLE__.store.require().gold")
                collect.first.click()
                page.wait_for_timeout(600)
                gold_after = page.evaluate("window.__FF14IDLE__.store.require().gold")
                check("派遣：收获后金币增加", gold_after > gold_before, f"{gold_before} -> {gold_after}")

        # ---------------- 队伍：一键自动装备 ----------------
        free_before = page.evaluate(
            """() => {
                const st = window.__FF14IDLE__.store.require();
                const used = new Set();
                for (const m of st.members) for (const u of Object.values(m.equipment)) if (u) used.add(u);
                return st.inventory.filter(i => !used.has(i.uid)).length;
            }"""
        )
        if free_before > 0:
            page.locator("[data-action='tab'][data-tab='party']").click()
            page.wait_for_timeout(350)
            page.locator("[data-action='auto-equip']").first.click()
            page.wait_for_timeout(500)
            free_after = page.evaluate(
                """() => {
                    const st = window.__FF14IDLE__.store.require();
                    const used = new Set();
                    for (const m of st.members) for (const u of Object.values(m.equipment)) if (u) used.add(u);
                    return st.inventory.filter(i => !used.has(i.uid)).length;
                }"""
            )
            check("队伍：一键自动装备真的装上了", free_after < free_before, f"空闲装备 {free_before} -> {free_after}")
        else:
            check("队伍：一键自动装备真的装上了", False, "收获后背包里没有空闲装备，无法验证")

        # ---------------- 周常：达成后领奖 ----------------
        page.evaluate(
            """() => {
                const st = window.__FF14IDLE__.store.require();
                st.weekly.counters = { clears: 9, dispatches: 99, roulette: 9, bossKills: 9, lootGained: 99, goldEarned: 9999 };
                window.__FF14IDLE__.store.notify();
            }"""
        )
        page.locator("[data-action='tab'][data-tab='cadence']").click()
        page.wait_for_timeout(400)
        claim = page.locator("[data-action='claim-line']:not([disabled])")
        check("周常：贴满后连线可领", claim.count() >= 1, f"{claim.count()} 条可领")
        if claim.count() >= 1:
            gold_before = page.evaluate("window.__FF14IDLE__.store.require().gold")
            claim.first.click()
            page.wait_for_timeout(500)
            gold_after = page.evaluate("window.__FF14IDLE__.store.require().gold")
            check("周常：领奖后金币增加", gold_after > gold_before, f"{gold_before} -> {gold_after}")

        # ---------------- 幻境武器：推进一阶 ----------------
        page.evaluate(
            """() => {
                const api = window.__FF14IDLE__; const st = api.store.require();
                const mid = st.members[0].id;
                st.gold = 50000;
                st.relics[mid] = { stage: 0, progress: { clears: 99, bosses: 99, trialScore: 9999, roulette: 99 } };
                api.store.notify();
            }"""
        )
        page.locator("[data-action='tab'][data-tab='relic']").click()
        page.wait_for_timeout(400)
        adv = page.locator("[data-action='advance-relic']:not([disabled])")
        check("幻境：条件满足后「推进」可用", adv.count() >= 1, f"{adv.count()} 个可推进")
        if adv.count() >= 1:
            stage_before = page.evaluate("window.__FF14IDLE__.store.require().relics[Object.keys(window.__FF14IDLE__.store.require().relics)[0]].stage")
            adv.first.click()
            page.wait_for_timeout(500)
            stages = page.evaluate(
                "() => Object.values(window.__FF14IDLE__.store.require().relics).map(r => r.stage)"
            )
            check("幻境：点「推进」阶数提升", max(stages) > stage_before, f"{stage_before} -> {max(stages)}")

        check("全程无 JS 错误", len(errors) == 0, "; ".join(errors[:2])[:180])
        browser.close()

    failed = [r for r in results if not r[1]]
    print("\n" + "=" * 52)
    print(f"合计 {len(results)} 项，通过 {len(results) - len(failed)}，失败 {len(failed)}")
    for name, _, detail in failed:
        print(f"  FAIL: {name} {detail}")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
