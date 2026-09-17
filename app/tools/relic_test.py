"""
幻境武器（Relic）长链验证

覆盖：
  1. 新档每个成员都有 5 阶长链，起始第 1 阶未达成
  2. **真实玩法会推进长链**：通关副本 → clears +1（这是关键的接线验证）
  3. 达成条件 + 有金币 → 可推进；推进扣金、产出高装等武器并自动装到主手
  4. 武器名与 uid 正确，且**上一阶武器会被替换**（不堆背包）
  5. 前置门槛：条件未达成或金币不足时不可推进
  6. 第 3/4 阶分别由破魔试炼得分与每日轮盘推进（跨系统要求）
  7. 终阶完成后 `relicFinalBonus` 生效，且**属性真的变高**
  8. 刷新后进度保留（存档版本 5）
  9. UI 渲染出 7 个 Tab 与幻境面板

用法：python tools/relic_test.py   （需先启动 vite preview --port 4173）
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

        # 1) 初始状态
        init = page.evaluate(
            """() => {
                const api = window.__FF14IDLE__;
                const st = api.store.require();
                const mid = st.members[0].id;
                const info = api.relic.info(mid);
                return { stages: info.rows.length, stage: info.stage, can: info.canAdvance,
                         reason: info.reason, mid, active: info.current?.name };
            }"""
        )
        check("长链共 5 阶", init["stages"] == 5, str(init["stages"]))
        check("起始进度为 0", init["stage"] == 0)
        check("初始不可推进（条件未达成）", init["can"] is False, init["reason"] or "")
        check("当前阶为「觉醒」", init["active"] == "觉醒", str(init["active"]))

        mid = init["mid"]

        # 2) 接线验证：真实通关一次副本 → 参与成员 clears 增加
        hook = page.evaluate(
            """() => {
                const api = window.__FF14IDLE__;
                const st = api.store.require();
                const d = document.querySelector("[data-action='pick-dungeon']:not(.locked)");
                d.click();
                document.querySelector("[data-action='dispatch']").click();
                // 以「实际派出的队伍」为准，而不是成员列表前 4 个
                const party = st.expeditions[0].memberIds;
                const before = party.map(id => api.relic.info(id).rows[0].current);
                for (const e of st.expeditions) if (!e.collected) e.startTs -= 20*60*1000;
                api.refresh();
                api.store.notify();
                return { before, party };
            }"""
        )
        page.wait_for_timeout(600)
        page.locator("[data-action='collect']:not([disabled])").first.click()
        page.wait_for_timeout(600)
        after_hook = page.evaluate(
            """(party) => party.map(id => window.__FF14IDLE__.relic.info(id).rows[0].current)""",
            hook["party"],
        )
        check(
            "通关副本会推进幻境进度（接线正确）",
            len(after_hook) > 0 and all(a > b for a, b in zip(after_hook, hook["before"])),
            f"队伍 {hook['party']}：{hook['before']} -> {after_hook}",
        )

        # 3) 满足条件后推进第 1 阶
        adv = page.evaluate(
            """([mid]) => {
                const api = window.__FF14IDLE__;
                const st = api.store.require();
                st.gold = 5000;
                st.relics[mid] = { stage: 0, progress: { clears: 5, bosses: 6, trialScore: 800, roulette: 3 } };
                const goldBefore = st.gold;
                const r = api.relic.advance(mid);
                const inv = st.inventory.filter(i => i.uid.startsWith('relic_'));
                const m = st.members.find(x => x.id === mid);
                return { ok: r.ok, error: r.error, goldBefore, goldAfter: st.gold, stage: r.stage,
                         item: r.item ? { name: r.item.name, uid: r.item.uid, slot: r.item.slot, ilvl: r.item.itemLevel } : null,
                         equipped: m.equipment.weapon, relicItems: inv.length };
            }""",
            [mid],
        )
        check("满足条件后可推进", adv["ok"] is True, str(adv.get("error")))
        check("扣除了正确金币", adv["goldBefore"] - adv["goldAfter"] == 300, f"{adv['goldBefore']} -> {adv['goldAfter']}")
        check("产出武器且为主手", adv["item"] and adv["item"]["slot"] == "weapon", str(adv["item"]))
        check("武器名为幻境兵装", adv["item"] and "幻境兵装" in adv["item"]["name"], str(adv["item"]["name"] if adv["item"] else ""))
        check("武器自动装到主手", adv["equipped"] == adv["item"]["uid"], f"{adv['equipped']}")
        check("长链推进到第 1 阶", adv["stage"] == 1, str(adv["stage"]))

        # 4) 一路推完 5 阶，检查替换与终阶加成
        # 注意：副本列表现在默认只显示「待推进」，要切到「全部」才能拿到本章全部副本 id
        page.locator("[data-action='tab'][data-tab='dispatch']").click()
        page.wait_for_timeout(300)
        page.locator("[data-action='filter-dungeon'][data-filter='all']").click()
        page.wait_for_timeout(300)
        full = page.evaluate(
            """([mid]) => {
                const api = window.__FF14IDLE__;
                const st = api.store.require();
                st.gold = 100000;
                const before = api.mastery.stats(mid);
                // 第 5 阶要求「通关本章全部副本」——把本章副本全部标记为已通关
                st.cleared = Array.from(document.querySelectorAll("[data-action='pick-dungeon']"))
                    .map(e => e.dataset.dungeon);
                const stages = [];
                for (let i = 0; i < 5; i++) {
                    const rs = st.relics[mid] ?? { stage: 0, progress: {} };
                    rs.progress = { clears: 99, bosses: 99, trialScore: 9999, roulette: 99 };
                    st.relics[mid] = rs;
                    const r = api.relic.advance(mid);
                    stages.push({ ok: r.ok, error: r.error, stage: r.stage });
                    if (!r.ok) break;
                }
                const after = api.mastery.stats(mid);
                const relicItems = st.inventory.filter(i => i.uid.startsWith('relic_'));
                return { stages, clearedCount: st.cleared.length, final: st.relicFinalBonus,
                         relicItems: relicItems.map(i => i.uid),
                         before: { pot: before.potency, hp: before.hp },
                         after: { pot: after.potency, hp: after.hp } };
            }""",
            [mid],
        )
        done = [s for s in full["stages"] if s["ok"]]
        # 注意：第 1 阶在上一步已解锁，因此这里只需再成功推进 4 次
        check("能连续推进到终阶", full["final"] is True and len(done) >= 4,
              f"已通关 {full['clearedCount']} 个副本；成功推进 {len(done)} 次"[:200])
        check("终阶后全队加成生效", full["final"] is True)
        check("只保留一件幻境武器（旧阶被替换）", len(full["relicItems"]) == 1, str(full["relicItems"]))
        check("属性因全队加成而提高",
              full["after"]["pot"] > full["before"]["pot"] and full["after"]["hp"] > full["before"]["hp"],
              f"pot {full['before']['pot']} -> {full['after']['pot']}, hp {full['before']['hp']} -> {full['after']['hp']}")

        # 5) 金币不足时不可推进
        poor = page.evaluate(
            """([mid]) => {
                const api = window.__FF14IDLE__;
                const st = api.store.require();
                const m2 = st.members[1].id;
                st.gold = 0;
                st.relics[m2] = { stage: 0, progress: { clears: 99, bosses: 99, trialScore: 9999, roulette: 99 } };
                const info = api.relic.info(m2);
                return { can: info.canAdvance, reason: info.reason };
            }""",
            [mid],
        )
        check("金币不足时不可推进", poor["can"] is False, str(poor["reason"]))

        # 6) 持久化
        page.evaluate("window.__FF14IDLE__.save()")
        page.reload(wait_until="networkidle")
        page.wait_for_timeout(900)
        persisted = page.evaluate(
            """([mid]) => {
                const st = window.__FF14IDLE__.store.require();
                return { stage: st.relics[mid]?.stage, final: st.relicFinalBonus, version: st.version };
            }""",
            [mid],
        )
        check("刷新后进度保留", persisted["stage"] == 5, str(persisted["stage"]))
        check("终阶加成标记保留", persisted["final"] is True)
        # 只用下限断言，避免每加一次迁移就要改测试
        check("存档版本已升级（≥5）", persisted["version"] >= 5, str(persisted["version"]))

        # 7) UI
        tabs = page.locator(".tab-btn").count()
        check("Tab 渲染完整（≥7）", tabs >= 7, f"{tabs} 个")
        page.locator("[data-action='tab'][data-tab='relic']").click()
        page.wait_for_timeout(500)
        stages = page.locator(".relic-stage").count()
        check("幻境面板渲染出阶段", stages >= 5, f"{stages} 个阶段块")
        check("页面无 JS 错误", len(errors) == 0, "; ".join(errors[:2])[:200])

        page.screenshot(
            path=str(__import__("pathlib").Path(__file__).parent.parent / "screenshots" / "09-relic.png"),
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
