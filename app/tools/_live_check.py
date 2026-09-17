"""线上验收：v0.2.0 的深浅主题与备份提醒在真实站点上是否真的工作。"""
import sys

from playwright.sync_api import sync_playwright

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
URL = "https://forever985.github.io/ff14idle/"

fails = []


def ck(name, ok, detail=""):
    print(("PASS  " if ok else "FAIL  ") + name + (f"  -- {detail}" if detail else ""))
    if not ok:
        fails.append(name)


with sync_playwright() as p:
    b = p.chromium.launch(executable_path=CHROME, headless=True)
    pg = b.new_page(viewport={"width": 420, "height": 860})
    errs, bad = [], []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
    pg.on("response", lambda r: bad.append(f"{r.status} {r.url}") if r.status >= 400 else None)

    pg.goto(URL, wait_until="networkidle", timeout=60000)
    pg.wait_for_timeout(1200)

    ver = pg.evaluate("async () => (await (await fetch('./version.json?t=' + Date.now(), {cache:'no-store'})).json())")
    ck("线上版本是 v0.2.0", ver["version"] == "0.2.0", f"v{ver['version']} build={ver['build']}")
    label = pg.locator(".ver-chip").inner_text()
    ck("页脚版本戳已更新", "0.2.0" in label, label)
    ck("无 JS 错误", not errs, "; ".join(errs[:2]))
    ck("无 404 资源", not bad, "; ".join(bad[:3]))

    # 主题切换
    t0 = pg.evaluate("() => document.documentElement.dataset.theme")
    pg.locator("[data-action='toggle-theme']").click()
    pg.wait_for_timeout(500)
    t1 = pg.evaluate("() => document.documentElement.dataset.theme")
    ck("线上能切换主题", t0 != t1, f"{t0} -> {t1}")
    ck("主题写入 localStorage",
       pg.evaluate("() => localStorage.getItem('ff14idle.theme')") == t1)
    bg = pg.evaluate("() => getComputedStyle(document.body).backgroundImage")
    ck("浅色主题背景确实变亮", ("238, 244, 243" in bg) == (t1 == "light"), bg[:70])
    pg.screenshot(path="live-theme-mobile.png")

    # 刷新后记住选择
    pg.reload(wait_until="networkidle")
    pg.wait_for_timeout(800)
    ck("刷新后主题仍记住", pg.evaluate("() => document.documentElement.dataset.theme") == t1)

    # 备份提醒（把存档做旧）
    pg.evaluate(
        """() => {
            const api = window.__FF14IDLE__;
            const st = api.store.require();
            st.createdAt = Date.now() - 40 * 86400000;
            st.lastExportAt = 0;
            localStorage.removeItem('ff14idle.backupSnooze');
            api.save();
        }"""
    )
    pg.reload(wait_until="networkidle")
    pg.wait_for_timeout(2200)
    ck("线上会提醒导出存档", pg.locator(".notice-pill--backup").count() == 1)
    ck("存档已迁移到 v8",
       pg.evaluate("() => window.__FF14IDLE__.store.require().version") >= 8,
       str(pg.evaluate("() => window.__FF14IDLE__.store.require().version")))
    pg.screenshot(path="live-backup-mobile.png")

    b.close()

print()
print("FAILED: " + str(fails) if fails else "ALL LIVE CHECKS PASS")
sys.exit(1 if fails else 0)
