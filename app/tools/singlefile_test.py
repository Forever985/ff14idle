"""
单文件构建验证：直接用 file:// 协议打开 dist-single/index.html，
确认「双击即玩」这个承诺是真的。

这是本项目最关键的一条可用性验证——因为源码用 ES Module，
浏览器在 file:// 下会拒绝加载外部模块脚本，必须靠 IIFE 单文件构建绕过。

用法：python tools/singlefile_test.py
（需先：npm run build:single）
"""
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

APP = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(Path(__file__).resolve().parent))
from artifact_check import blocking_refs  # noqa: E402

HTML = APP / "dist-single" / "index.html"
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

results: list[tuple[str, bool, str]] = []


def check(name: str, ok: bool, detail: str = "") -> None:
    results.append((name, ok, detail))
    print(f"{'PASS' if ok else 'FAIL'}  {name}" + (f"  — {detail}" if detail else ""))


def main() -> int:
    if not HTML.exists():
        print(f"❌ 找不到 {HTML}，请先运行 npm run build:single")
        return 2

    size_kb = HTML.stat().st_size / 1024
    print(f"单文件产物：{HTML}")
    print(f"体积：{size_kb:.1f} KB")

    text = HTML.read_text(encoding="utf-8")
    blocking = blocking_refs(text)
    print(f"会阻断加载的外部 JS/CSS 引用：{len(blocking)} {blocking if blocking else ''}")
    check("产物无外部 JS/CSS 依赖（真正单文件）", len(blocking) == 0, str(blocking))
    check("体积合理（< 400KB）", size_kb < 400, f"{size_kb:.1f} KB")

    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=CHROME, headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 900})
        errors: list[str] = []
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.on(
            "console",
            lambda m: errors.append(f"console.{m.type}: {m.text}") if m.type == "error" else None,
        )
        # 行为层面的"真单文件"：跑起来之后，除了 file:// 和 data:，不该再有任何网络请求。
        # 这比正则可靠得多 —— 正则只能看文本，而这个看的是浏览器真的发了什么请求。
        offsite: list[str] = []
        page.on(
            "request",
            lambda r: offsite.append(r.url)
            if not r.url.startswith(("file://", "data:", "blob:"))
            else None,
        )

        page.goto(HTML.as_uri(), wait_until="load")
        page.wait_for_timeout(1200)

        check("file:// 下无 JS 错误", len(errors) == 0, "; ".join(errors[:2])[:200])
        check("运行期没有任何外部网络请求", len(offsite) == 0, "; ".join(offsite[:3]))
        check("顶栏渲染", page.locator(".topbar").count() == 1)
        check("队伍卡渲染", page.locator("[data-action='toggle-party']").count() >= 4)
        check("副本卡渲染", page.locator("[data-action='pick-dungeon']").count() > 0)

        # 走一遍核心操作：选副本 → 派遣
        page.locator("[data-action='pick-dungeon']:not(.locked)").first.click()
        page.wait_for_timeout(200)
        btn = page.locator("[data-action='dispatch']")
        check("派遣按钮可用", btn.is_enabled())
        btn.click()
        page.wait_for_timeout(600)
        check("派遣成功（出现进度条）", page.locator("[data-progress]").count() >= 1)

        # 存档可用性（file:// 下 localStorage 是 origin=null，部分浏览器会禁用）
        saved = page.evaluate("!!localStorage.getItem('ff14idle.save')")
        check("file:// 下存档写入 localStorage", saved, "若无则说明该协议禁用了本地存储")

        page.screenshot(path=str(APP / "screenshots" / "05-singlefile.png"), full_page=True)
        browser.close()

    failed = [r for r in results if not r[1]]
    print("\n" + "=" * 52)
    print(f"合计 {len(results)} 项，通过 {len(results) - len(failed)}，失败 {len(failed)}")
    for name, _, detail in failed:
        print(f"  FAIL: {name} {detail}")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
