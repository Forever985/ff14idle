"""
职业量谱精通验证（FF14 没有天赋树的替代品）

覆盖：
  1. 新档每个成员都有 4 个精通节点，且因为等级不足全部锁定
  2. 升级 + 有金币后 T1 变为可解锁
  3. 解锁扣金币、写入存档，且**战斗属性确实变化**（这是关键：不能只是账面数字）
  4. 前置链路：T2 需要任一 T1，T3 需要 T2
  5. 等级门槛：T2 需 30 级、T3 需 40 级
  6. 减伤有上限（不能堆到无敌）
  7. 刷新页面后精通保留（存档迁移到 v4）
  8. UI 渲染出精通网格

用法：python tools/mastery_test.py   （需先启动 vite preview --port 4173）
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

        # 1) 初始状态：4 节点、全部锁定
        init = page.evaluate(
            """() => {
                const api = window.__FF14IDLE__;
                const st = api.store.require();
                const mid = st.members[0].id;
                const rows = api.mastery.rows(mid);
                return { n: rows.length, states: rows.map(r => r.state), reasons: rows.map(r => r.reason || ''),
                         gold: st.gold, level: st.members[0].level, job: st.members[0].job, mid };
            }"""
        )
        check("每个职业 4 个精通节点", init["n"] == 4, str(init["n"]))
        check("初始全部锁定（等级不足）", all(s == "locked" for s in init["states"]), str(init["states"]))
        check("锁定原因提示等级", "等级" in init["reasons"][0], init["reasons"][0])

        mid = init["mid"]

        # 2) 升级 + 给金币 → T1 可解锁
        ready = page.evaluate(
            """([mid]) => {
                const st = window.__FF14IDLE__.store.require();
                const m = st.members.find(x => x.id === mid);
                m.level = 25;
                st.gold = 5000;
                const rows = window.__FF14IDLE__.mastery.rows(mid);
                return { states: rows.map(r => r.state), ids: rows.map(r => r.id) };
            }""",
            [mid],
        )
        check("25 级后 T1 可解锁", ready["states"][0] == "available" and ready["states"][1] == "available", str(ready["states"]))
        check("T2 仍锁定（需前置与等级）", ready["states"][2] == "locked")

        # 3) 解锁 T1a → 扣钱 + 属性变化
        unlock = page.evaluate(
            """([mid, id]) => {
                const api = window.__FF14IDLE__;
                const st = api.store.require();
                const before = api.mastery.stats(mid);
                const goldBefore = st.gold;
                const res = api.mastery.unlock(mid, id);
                const after = api.mastery.stats(mid);
                return { ok: res.ok, error: res.error, goldBefore, goldAfter: st.gold,
                         before: { mit: before.mitigation, hp: before.hp, pot: before.potency, gain: before.resourceGain, burst: before.burstBonus },
                         after:  { mit: after.mitigation,  hp: after.hp,  pot: after.potency,  gain: after.resourceGain,  burst: after.burstBonus } };
            }""",
            [mid, ready["ids"][0]],
        )
        check("解锁成功", unlock["ok"] is True, str(unlock.get("error")))
        check("扣除了金币", unlock["goldBefore"] - unlock["goldAfter"] == 200, f"{unlock['goldBefore']} -> {unlock['goldAfter']}")
        changed = unlock["before"] != unlock["after"]
        check("战斗属性确实变化", changed, f"{unlock['before']} -> {unlock['after']}")

        # 4) 前置：T2 需 30 级；先到 30 级再解锁
        chain = page.evaluate(
            """([mid]) => {
                const api = window.__FF14IDLE__;
                const st = api.store.require();
                const m = st.members.find(x => x.id === mid);
                const out = {};
                m.level = 30;
                let rows = api.mastery.rows(mid);
                out.t2At30 = rows[2].state;                       // T2：等级够但需要 T1（已解锁 T1a）
                out.t3At30 = rows[3].state;                       // T3：需 T2
                const r2 = api.mastery.unlock(mid, rows[2].id);
                out.t2Unlock = r2.ok;
                m.level = 40;
                rows = api.mastery.rows(mid);
                out.t3At40 = rows[3].state;
                const r3 = api.mastery.unlock(mid, rows[3].id);
                out.t3Unlock = r3.ok;
                out.owned = api.mastery.rows(mid).filter(r => r.state === 'owned').length;
                out.stats = api.mastery.stats(mid);
                return out;
            }""",
            [mid],
        )
        check("T2 在前置满足后可解锁", chain["t2At30"] == "available" and chain["t2Unlock"] is True, f"{chain['t2At30']}")
        check("T3 在 40 级且 T2 后解锁", chain["t3At40"] == "available" and chain["t3Unlock"] is True, f"{chain['t3At40']}")
        check("最终解锁 3 个节点（T1a+T2+T3）", chain["owned"] == 3, str(chain["owned"]))

        # 5) 减伤上限
        mit = chain["stats"]["mitigation"]
        check("减伤不超过上限 60%", mit <= 0.6 + 1e-9, f"{mit:.3f}")

        # 6) 存档持久化
        page.evaluate("window.__FF14IDLE__.save()")
        page.reload(wait_until="networkidle")
        page.wait_for_timeout(900)
        persisted = page.evaluate(
            """([mid]) => {
                const api = window.__FF14IDLE__;
                const st = api.store.require();
                return { owned: (st.masteries[mid] || []).length, version: st.version,
                         levels: api.mastery.rows(mid).length };
            }""",
            [mid],
        )
        check("刷新后精通保留", persisted["owned"] == 3, str(persisted["owned"]))
        # 只用下限断言，避免每加一次迁移就要改测试
        check("存档版本已升级（≥4）", persisted["version"] >= 4, str(persisted["version"]))

        # 7) UI 渲染
        page.locator("[data-action='tab'][data-tab='party']").click()
        page.wait_for_timeout(500)
        cells = page.locator(".mastery-cell").count()
        check("精通网格已渲染", cells >= 4, f"{cells} 个格子")
        check("有已解锁标记", page.locator(".mastery-cell.chosen").count() >= 1)
        check("页面无 JS 错误", len(errors) == 0, "; ".join(errors[:2])[:200])

        page.screenshot(
            path=str(__import__("pathlib").Path(__file__).parent.parent / "screenshots" / "08-mastery.png"),
            full_page=True,
        )
        browser.close()

    failed = [r for r in results if not r[1]]
    print("\n" + "=" * 52)
    print(f"合计 {len(results)} 项，通过 {len(results) - len(failed)}，失败 {len(failed)}")
    for name, _, detail in failed:
        print(f"  FAIL: {name} {detail}")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
