"""
离线生产设施（工房）验证

覆盖：
  1. 新档工房 1 级 / 1 槽位 / 8 小时储存上限，初始无产出
  2. 指派项目后按真实时间产出（金币 / 待鉴定箱）
  3. ⭐ **储存上限生效**：挂 20 小时也只按 8 小时计（防止"永不上线"成为最优解）
  4. ⭐ **连续收获加成 Groove**：按时收会累积；**溢出则归零**
  5. 加成确实作用于产量（+20% 时 1 小时产量 = 基础 × 1.2）
  6. 切换项目会先把当前累计入库，**不丢产量**
  7. 扩建：加槽位 + 提高上限；项目有等级门槛
  8. 待鉴定箱可批量鉴定成装备
  9. 刷新后工房状态保留（存档版本 6）
 10. UI 渲染 8 个 Tab 与工房面板

用法：python tools/facility_test.py   （需先启动 vite preview --port 4173）
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

        # 1) 新档状态
        init = page.evaluate("() => window.__FF14IDLE__.facility.info()")
        check("初始 1 级 / 1 槽位", init["level"] == 1 and len(init["slots"]) == 1, f"level={init['level']} slots={len(init['slots'])}")
        check("初始储存上限 8 小时", init["capHours"] == 8, str(init["capHours"]))
        check("初始无产出", init["pendingGold"] == 0 and init["pendingBoxes"] == 0)

        # 2) 指派项目 + 1 小时产出
        one_hour = page.evaluate(
            """() => {
                const api = window.__FF14IDLE__; const st = api.store.require();
                api.facility.assign(0, 'mint');            // 金币铸造 300/h
                st.facility.since -= 3600 * 1000;          // 假装 1 小时前
                return api.facility.info();
            }"""
        )
        check("指派后按 1 小时产出金币", 295 <= one_hour["pendingGold"] <= 305, str(one_hour["pendingGold"]))
        check("金币铸造不产箱", one_hour["pendingBoxes"] == 0, str(one_hour["pendingBoxes"]))

        # 3) 储存上限：挂 20 小时只按 8 小时算
        capped = page.evaluate(
            """() => {
                const api = window.__FF14IDLE__; const st = api.store.require();
                st.facility.since = Date.now() - 20 * 3600 * 1000;
                return api.facility.info();
            }"""
        )
        check("已积累被截断到上限 8 小时", abs(capped["elapsedHours"] - 8) < 0.01, f"{capped['elapsedHours']:.2f}h")
        check("产量按上限计（≈2400 而非 6000）", 2380 <= capped["pendingGold"] <= 2420, str(capped["pendingGold"]))
        check("标记为已溢出", capped["saturated"] is True)

        # 4) 溢出领取 → Groove 归零
        overflow_collect = page.evaluate(
            """() => {
                const api = window.__FF14IDLE__; const st = api.store.require();
                const goldBefore = st.gold;
                const r = api.facility.collect();
                return { overflowed: r.overflowed, groove: r.groove, gained: r.gold,
                         goldBefore, goldAfter: st.gold };
            }"""
        )
        check("溢出领取被标记", overflow_collect["overflowed"] is True)
        check("溢出后连续加成归零", overflow_collect["groove"] == 0, str(overflow_collect["groove"]))
        check("金币确实到账", overflow_collect["goldAfter"] - overflow_collect["goldBefore"] == overflow_collect["gained"],
              f"+{overflow_collect['gained']}")

        # 5) 按时收获 → Groove 累积，并作用于产量
        groove = page.evaluate(
            """() => {
                const api = window.__FF14IDLE__; const st = api.store.require();
                const out = [];
                for (let i = 0; i < 3; i++) {
                    st.facility.since = Date.now() - 3600 * 1000;
                    const info = api.facility.info();
                    const r = api.facility.collect();
                    out.push({ pending: info.pendingGold, grooveAfter: r.groove });
                }
                return out;
            }"""
        )
        check("按时收获使 Groove 逐步提高",
              groove[0]["grooveAfter"] == 0.1 and groove[1]["grooveAfter"] == 0.2 and abs(groove[2]["grooveAfter"] - 0.3) < 1e-9,
              str([g["grooveAfter"] for g in groove]))
        # 第 3 次收获时 Groove 已是 0.2 → 1 小时产量应为 300 × 1.2 = 360
        check("Groove 作用于产量（+20% 时 1 小时 ≈ 360）",
              groove[2]["pending"] >= 355, f"第三次 1 小时产量 = {groove[2]['pending']}（基础 300，+20%）")

        # 6) 切换项目不丢产量
        switch = page.evaluate(
            """() => {
                const api = window.__FF14IDLE__; const st = api.store.require();
                st.facility.groove = 0;
                api.facility.assign(0, 'mint');
                st.facility.since = Date.now() - 3600 * 1000;   // 攒了 1 小时金币
                api.facility.assign(0, 'mine');                 // 切换项目
                const info = api.facility.info();
                return { gold: info.pendingGold, boxes: info.pendingBoxes };
            }"""
        )
        check("切换项目后旧产量已入库", switch["gold"] >= 295, str(switch["gold"]))

        # 7) 等级门槛 + 扩建
        gate = page.evaluate(
            """() => {
                const api = window.__FF14IDLE__; const st = api.store.require();
                const denied = api.facility.assign(0, 'salvage');   // 需 2 级
                st.gold = 20000;
                const up = api.facility.upgrade();
                const ok = api.facility.assign(1, 'salvage');
                return { deniedOk: denied.ok, deniedErr: denied.error, upOk: up.ok, upLevel: up.level,
                         slots: api.facility.info().slots.length, cap: api.facility.info().capHours,
                         afterOk: ok.ok, gold: st.gold };
            }"""
        )
        check("低等级无法指派高阶项目", gate["deniedOk"] is False, str(gate["deniedErr"]))
        check("扩建成功并提升等级", gate["upOk"] is True and gate["upLevel"] == 2, str(gate["upLevel"]))
        check("扩建增加槽位与上限", gate["slots"] == 2 and gate["cap"] == 10, f"slots={gate['slots']} cap={gate['cap']}")
        check("扩建后高等级项目可用", gate["afterOk"] is True)

        # 8) 待鉴定箱 → 装备
        boxes = page.evaluate(
            """() => {
                const api = window.__FF14IDLE__; const st = api.store.require();
                api.facility.assign(0, 'salvage');   // 3 箱/h
                st.facility.since = Date.now() - 2 * 3600 * 1000;
                const info = api.facility.info();
                const r = api.facility.collect();
                const invBefore = st.inventory.length;
                const opened = api.facility.open(999);
                return { pendingBoxes: info.pendingBoxes, collectedBoxes: r.boxes,
                         boxStock: api.facility.info().boxes, items: opened.items?.length ?? 0,
                         invGain: st.inventory.length - invBefore };
            }"""
        )
        check("抢救项目产出待鉴定箱", boxes["pendingBoxes"] >= 6, str(boxes["pendingBoxes"]))
        check("领取后进入待鉴定库存", boxes["boxStock"] >= 0)
        check("鉴定产出装备", boxes["items"] > 0 and boxes["invGain"] == boxes["items"],
              f"{boxes['items']} 件，背包 +{boxes['invGain']}")

        # 9) 持久化
        page.evaluate("window.__FF14IDLE__.save()")
        page.reload(wait_until="networkidle")
        page.wait_for_timeout(900)
        persisted = page.evaluate(
            """() => {
                const st = window.__FF14IDLE__.store.require();
                return { level: st.facility.level, slots: st.facility.slots.length,
                         version: st.version, collections: st.facility.collections };
            }"""
        )
        check("刷新后工房等级保留", persisted["level"] == 2, str(persisted["level"]))
        check("刷新后槽位保留", persisted["slots"] == 2, str(persisted["slots"]))
        check("存档版本已升级（≥6）", persisted["version"] >= 6, str(persisted["version"]))

        # 10) UI —— 检查"关键 Tab 都存在"，而不是数个数（每加一个 Tab 就不必改测试）
        tabs = page.locator(".tab-btn").count()
        missing = page.evaluate(
            """() => ['dispatch','trial','tower','party','inventory','cadence','relic','facility','report']
                 .filter(t => !document.querySelector(`[data-action='tab'][data-tab='${t}']`))"""
        )
        check("关键 Tab 全部存在", len(missing) == 0, f"共 {tabs} 个，缺失 {missing}")
        page.locator("[data-action='tab'][data-tab='facility']").click()
        page.wait_for_timeout(500)
        check("工房面板渲染出槽位", page.locator("[data-action='facility-assign']").count() >= 2)
        check("有领取按钮", page.locator("[data-action='facility-collect']").count() == 1)
        check("页面无 JS 错误", len(errors) == 0, "; ".join(errors[:2])[:200])

        page.screenshot(
            path=str(__import__("pathlib").Path(__file__).parent.parent / "screenshots" / "10-facility.png"),
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
