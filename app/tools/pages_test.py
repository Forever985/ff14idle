"""
GitHub Pages 部署形态验证。

为什么单独需要这个测试：
  GitHub Pages 上的地址是 `https://<用户名>.github.io/<仓库名>/` —— 也就是**子路径**，
  而平时的 `vite preview` 是**根路径**。这两者的差别恰好是最容易出事的地方：
  绝对路径的资源引用、manifest 的 start_url、fetch('./version.json') 全都会在子路径下变形。
  更糟的是：站点部署完了你才会发现，而且手机上不好排查。

  所以这里就把产物按"子路径"摆好、起一个真的 HTTP 服务器、用真浏览器打开，
  把「能打开 → 能玩 → 图标/manifest/version.json 都在」全验一遍。

用法：python tools/pages_test.py   （需先构建；run-tests.ps1 会自动构建）
"""
import functools
import http.server
import shutil
import socketserver
import sys
import tempfile
import threading
from pathlib import Path

from playwright.sync_api import sync_playwright

APP = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(Path(__file__).resolve().parent))
import deploy  # noqa: E402  复用发布脚本的产物拼装/自检逻辑，避免两份实现走偏

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
SUBPATH = "ff14-idle"          # 模拟仓库名：https://<user>.github.io/ff14-idle/

results: list[tuple[str, bool, str]] = []


def check(name: str, ok: bool, detail: str = "") -> None:
    results.append((name, ok, detail))
    print(f"{'PASS' if ok else 'FAIL'}  {name}" + (f"  — {detail}" if detail else ""))


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):  # 别把每个请求都打到控制台
        pass


def serve(root: Path) -> tuple[socketserver.TCPServer, int]:
    handler = functools.partial(QuietHandler, directory=str(root))
    httpd = socketserver.TCPServer(("127.0.0.1", 0), handler)
    port = httpd.server_address[1]
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd, port


def main() -> int:
    dist, single = APP / "dist", APP / "dist-single" / "index.html"
    if not (dist / "index.html").exists() or not single.exists():
        print("❌ 找不到构建产物，请先 npm run build && npm run build:single")
        return 1
    deploy.check_artifacts()

    # 按 GitHub Pages 的目录形态摆好：<root>/ff14-idle/…
    root = Path(tempfile.mkdtemp(prefix="ff14idle-pages-"))
    site = root / SUBPATH
    shutil.copytree(deploy.assemble_site(), site)

    httpd, port = serve(root)
    base = f"http://127.0.0.1:{port}/{SUBPATH}/"
    print(f"子路径部署模拟：{base}\n")

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(executable_path=CHROME, headless=True)
            page = browser.new_page(viewport={"width": 1180, "height": 900})
            errors: list[str] = []
            failed: list[str] = []
            page.on("pageerror", lambda e: errors.append(str(e)))
            page.on(
                "console",
                lambda m: errors.append(f"console.{m.type}: {m.text}")
                if m.type == "error"
                else None,
            )
            page.on(
                "response",
                lambda r: failed.append(f"{r.status} {r.url}") if r.status >= 400 else None,
            )

            page.goto(base, wait_until="networkidle")
            page.wait_for_timeout(900)

            check("子路径下页面能打开且无 JS 错误", len(errors) == 0, "; ".join(errors[:3]))
            check("子路径下没有 404 资源", len(failed) == 0, "; ".join(failed[:3]))
            check("游戏渲染出顶栏", page.locator(".topbar").count() == 1)
            tabs = page.locator(".tab-btn").count()
            check("导航渲染完整", tabs >= 6, f"{tabs} 个")

            # 真的点一下：能派遣、出现进度条，才算"部署后能玩"
            page.locator("[data-action='pick-dungeon']:not(.locked)").first.click()
            page.wait_for_timeout(250)
            page.locator("[data-action='dispatch']").click()
            page.wait_for_timeout(700)
            bars = page.locator("[data-progress]").count()
            check("部署形态下能真的派遣（出现进度条）", bars >= 1, f"{bars} 条")

            # manifest / 图标 / 版本文件都是相对路径引用的，最容易在子路径下断
            for path, label in [
                ("manifest.webmanifest", "manifest"),
                ("apple-touch-icon.png", "iOS 主屏图标"),
                ("icon-192.png", "Android 图标"),
                ("favicon.svg", "标签页图标"),
                ("version.json", "版本文件"),
            ]:
                status = page.evaluate(
                    "async (u) => (await fetch(u, {cache:'no-store'})).status", f"./{path}"
                )
                check(f"子路径下能取到 {label}", status == 200, f"HTTP {status}")

            # 页脚必须显示版本号：手机上"更新到底生效没有"只能看它
            footer = page.locator(".ver-chip").inner_text()
            check("页脚显示版本号", footer.startswith("v"), footer)

            # 单文件版也要在同一路径下能打开（它就是"可下载的那一份"）
            page2 = browser.new_page(viewport={"width": 420, "height": 820})
            errors2: list[str] = []
            page2.on("pageerror", lambda e: errors2.append(str(e)))
            page2.goto(base + "ff14-idle-single.html", wait_until="load")
            page2.wait_for_timeout(900)
            check("单文件版在子路径下能打开", page2.locator(".topbar").count() == 1)
            check("单文件版无 JS 错误", len(errors2) == 0, "; ".join(errors2[:2]))
            page2.screenshot(path=str(APP / "screenshots" / "ui-mobile-pages.png"), full_page=False)

            browser.close()
    finally:
        httpd.shutdown()
        shutil.rmtree(root, ignore_errors=True)

    failed_items = [r for r in results if not r[1]]
    print("\n" + "=" * 52)
    print(f"合计 {len(results)} 项，通过 {len(results) - len(failed_items)}，失败 {len(failed_items)}")
    for name, _, detail in failed_items:
        print(f"  FAIL: {name} {detail}")
    return 1 if failed_items else 0


if __name__ == "__main__":
    sys.exit(main())
