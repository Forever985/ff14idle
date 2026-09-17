"""
FF14 Idle 冒烟测试（Playwright + 本机 Chrome）

验证内容：
  1. 页面能加载、无 JS 运行时错误
  2. 首屏渲染出 HUD / Tab / 队伍卡 / 副本卡
  3. 点「派遣小队」能创建派遣，且进度条出现
  4. 把派遣时间回拨后可「收获」，金币与经验增加、掉落入包
  5. 截图存档，便于人工核对

用法：
  python tools/smoke_test.py
（需先启动预览服务器：npx vite preview --port 4173）
"""
import sys
import time
from pathlib import Path

from playwright.sync_api import sync_playwright

sys.path.insert(0, str(Path(__file__).resolve().parent))
from ui_harness import count_of  # noqa: E402

URL = "http://127.0.0.1:4173/"
OUT = Path(__file__).resolve().parent.parent / "screenshots"
OUT.mkdir(exist_ok=True)

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

results: list[tuple[str, bool, str]] = []


def check(name: str, ok: bool, detail: str = "") -> None:
    results.append((name, ok, detail))
    print(f"{'PASS' if ok else 'FAIL'}  {name}" + (f"  — {detail}" if detail else ""))


def main() -> int:
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=CHROME, headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 900})

        errors: list[str] = []
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.on("console", lambda m: errors.append(f"console.{m.type}: {m.text}") if m.type == "error" else None)

        page.goto(URL, wait_until="networkidle")
        page.wait_for_timeout(800)

        # 1) 无运行时错误
        check("页面无 JS 错误", len(errors) == 0, "; ".join(errors[:3]))

        # 2) 首屏结构
        check("顶栏渲染", count_of(page, ".topbar") == 1)
        tabs = count_of(page, ".tab-btn")
        check("Tab 渲染完整", tabs >= 6, f"{tabs} 个")
        members = count_of(page, "[data-action='toggle-party']")
        check("队伍卡渲染", members >= 4, f"{members} 张")
        dungeons = count_of(page, "[data-action='pick-dungeon']")
        check("副本卡渲染", dungeons > 0, f"{dungeons} 张")

        page.screenshot(path=str(OUT / "01-dispatch.png"), full_page=True)

        # 3) 选副本 + 派遣（默认队伍已在 main.ts 里预选 4 人）
        unlocked = page.locator("[data-action='pick-dungeon']:not(.locked)").first
        unlocked.click()
        page.wait_for_timeout(200)
        dispatch_btn = page.locator("[data-action='dispatch']")
        check("派遣按钮可用", dispatch_btn.is_enabled())

        dispatch_btn.click()
        page.wait_for_timeout(600)
        bars = count_of(page, "[data-progress]")
        check("派遣创建成功（出现进度条）", bars >= 1, f"{bars} 条")

        # 队伍状态
        head = count_of(page, "[data-action='view-report']")
        check("派遣卡有战报入口", head >= 1)

        # 3b) ⭐ 关键回归：**战报不能在队伍回来之前泄露结局**
        #     派遣是「派遣即结算」，结果在派出时就已算好；
        #     若 UI 不按状态过滤，等待过程就失去意义了。
        running_report_btn = page.locator("[data-action='view-report']").first
        check("进行中时战报按钮为禁用", not running_report_btn.is_enabled())

        page.locator("[data-action='tab'][data-tab='report']").click()
        page.wait_for_timeout(300)
        # 只看战报面板本身（整个 #app 里 HUD 的"已通关"会误伤关键字匹配）
        report_text = page.locator("#app .panel").first.inner_text()
        leaking = any(k in report_text for k in ("通关", "失败", "获得 "))
        check("进行中时战报页不泄露结局/掉落", not leaking,
              f"战报面板文本：{report_text[:60]}" if leaking else "仅提示队伍还在外面")
        check("进行中时战报页给出等待提示", "还在" in report_text and "战报会在队伍回来后解锁" in report_text,
              report_text[:60])
        page.locator("[data-action='tab'][data-tab='dispatch']").click()
        page.wait_for_timeout(300)

        page.screenshot(path=str(OUT / "02-dispatched.png"), full_page=True)

        # 4) 回拨时间 → 刷新页面 → 验证「离线重开也会结算」（参考实现的核心机制）
        gold_before = page.evaluate("document.querySelector('[data-res=\"gold\"]').textContent")
        page.evaluate(
            """() => {
                const api = window.__FF14IDLE__;
                const st = api.store.require();
                for (const e of st.expeditions) { if (!e.collected) e.startTs -= 10 * 60 * 1000; }
                api.save();
            }"""
        )
        page.wait_for_timeout(300)
        page.reload(wait_until="networkidle")
        page.wait_for_timeout(900)

        ready_badges = count_of(page, ".tag.tag-green")
        check("刷新后离线派遣自动结算为可收获", ready_badges >= 1, f"{ready_badges} 个绿色标记")

        collect = page.locator("[data-action='collect']:not([disabled])").first
        n_collect = count_of(page, "[data-action='collect']:not([disabled])")
        check("到点后可收获", n_collect > 0)
        if n_collect > 0:
            inv_before = page.evaluate("window.__FF14IDLE__.store.require().inventory.length")
            collect.click()
            page.wait_for_timeout(700)
            gold_after = page.evaluate("document.querySelector('[data-res=\"gold\"]').textContent")
            inv_after = page.evaluate("window.__FF14IDLE__.store.require().inventory.length")
            cleared = page.evaluate("window.__FF14IDLE__.store.require().cleared.length")
            check("收获后金币变化", gold_before != gold_after, f"{gold_before} -> {gold_after}")
            check("掉落入包或已通关", inv_after >= inv_before or cleared > 0,
                  f"背包 {inv_before} -> {inv_after}, 已通关 {cleared}")

        page.screenshot(path=str(OUT / "03-collected.png"), full_page=True)

        # 5) 切换到队伍页与背包页，确认无错误
        for tab, label in [("party", "队伍"), ("inventory", "背包"), ("report", "战报")]:
            page.locator(f"[data-action='tab'][data-tab='{tab}']").click()
            page.wait_for_timeout(400)
            check(f"切换到{label}页无错误", len(errors) == 0, "; ".join(errors[:2])[:160])

        page.screenshot(path=str(OUT / "04-party.png"), full_page=True)

        # 6) ⭐ 关键回归：收获之后「保存 → 刷新」，存档必须存活
        #    曾经因为 canonicalize 把共享引用误判为循环引用，导致打完副本就静默丢档
        before = page.evaluate(
            """() => {
                const api = window.__FF14IDLE__;
                api.save();
                const st = api.store.require();
                return { gold: st.gold, cleared: st.cleared.length, members: st.members.length };
            }"""
        )
        page.reload(wait_until="networkidle")
        page.wait_for_timeout(900)
        after = page.evaluate(
            """() => {
                const st = window.__FF14IDLE__.store.require();
                return { gold: st.gold, cleared: st.cleared.length, members: st.members.length };
            }"""
        )
        check("收获后存档经刷新仍存活（不丢档）", before == after, f"{before} -> {after}")

        # 存档写入检查
        saved = page.evaluate("!!localStorage.getItem('ff14idle.save')")
        check("存档已写入 localStorage", saved)

        # 6) v7 老档迁移到 v8：新增的 lastExportAt 要补上默认值，且**不能丢档**
        #    这是"改了存档结构必须加迁移"这条规矩的守门测试。
        older = page.evaluate(
            """() => {
                const raw = JSON.parse(localStorage.getItem('ff14idle.save'));
                raw.version = 7;
                delete raw.lastExportAt;
                // 摘要按老版本算，这里直接清掉，模拟"旧版本写出来的档"
                raw.integrity = { seq: 0, digest: '' };
                localStorage.setItem('ff14idle.save', JSON.stringify(raw));
                localStorage.removeItem('ff14idle.backupSnooze');
                return { gold: raw.gold, members: raw.members.length };
            }"""
        )
        page.reload(wait_until="networkidle")
        page.wait_for_timeout(900)
        migrated = page.evaluate(
            """() => {
                const st = window.__FF14IDLE__.store.require();
                return { version: st.version, lastExportAt: st.lastExportAt,
                         gold: st.gold, members: st.members.length };
            }"""
        )
        check("v7 老档能迁移到当前版本", migrated["version"] >= 8, str(migrated["version"]))
        check("迁移补上了 lastExportAt 默认值", migrated["lastExportAt"] == 0, str(migrated["lastExportAt"]))
        check("迁移没有丢档", migrated["gold"] == older["gold"] and migrated["members"] == older["members"],
              f"{older} -> {migrated}")

        # 7) 备份提醒：把存档做旧，应该弹出"该导出存档了"，点导出后记录时间
        page.evaluate(
            """() => {
                const api = window.__FF14IDLE__;
                const st = api.store.require();
                st.createdAt = Date.now() - 30 * 86400000;   // 号开了 30 天
                st.lastExportAt = 0;                          // 一次都没导过
                localStorage.removeItem('ff14idle.backupSnooze');
                api.save();
            }"""
        )
        page.reload(wait_until="networkidle")
        page.wait_for_timeout(2200)      # 提醒是延迟 1.2s 弹的
        check("长期没导存档时会提醒", count_of(page, ".notice-pill--backup") == 1)
        page.screenshot(path=str(OUT / "12-backup-reminder.png"), full_page=False)
        if count_of(page, ".notice-pill--backup") == 1:
            page.locator("[data-backup='now']").click()
            page.wait_for_timeout(500)
            after_export = page.evaluate("() => window.__FF14IDLE__.store.require().lastExportAt")
            check("导出后记录了导出时间", after_export > 0, str(after_export))
            check("导出后提醒消失", count_of(page, ".notice-pill--backup") == 0)

        browser.close()

    failed = [r for r in results if not r[1]]
    print("\n" + "=" * 52)
    print(f"合计 {len(results)} 项，通过 {len(results) - len(failed)}，失败 {len(failed)}")
    for name, _, detail in failed:
        print(f"  FAIL: {name} {detail}")
    print(f"截图目录：{OUT}")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
