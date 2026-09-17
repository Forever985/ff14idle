"""
从 `public/icon.svg` 生成手机/浏览器需要的整套 PNG 图标。

为什么要有这个脚本，而不是把 PNG 直接放进仓库：
  PNG 是二进制、没法用文本 diff 审阅，而且改一次 logo 就要靠人肉重新导出一遍。
  有了它，以后改 logo 只需要改 `public/icon.svg`，再跑一次本脚本。

为什么要用 Chrome 来渲染：
  环境里没有 Pillow / cairosvg 这类图形库，但 Playwright + 本机 Chrome 一定有
  （所有 UI 测试都依赖它）。用浏览器渲染 SVG 是最不容易失真的一条路。

用法：
  python tools/gen-icons.py
"""
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

APP = Path(__file__).resolve().parent.parent
PUBLIC = APP / "public"
ICON_SVG = PUBLIC / "icon.svg"
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

# 文件名 -> 边长。这些尺寸对应：
#   512/192  PWA manifest（Android 主屏）
#   180      iOS 的 apple-touch-icon
#   32       浏览器标签页
TARGETS = {
    "icon-512.png": 512,
    "icon-192.png": 192,
    "apple-touch-icon.png": 180,
    "favicon-32.png": 32,
}


def main() -> int:
    if not ICON_SVG.exists():
        print(f"❌ 找不到 {ICON_SVG}")
        return 1
    svg = ICON_SVG.read_text(encoding="utf-8")

    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=CHROME, headless=True)
        for name, size in TARGETS.items():
            page = browser.new_page(viewport={"width": size, "height": size})
            # 用一个最小 HTML 包住 SVG，并强制铺满视口：
            # 直接把 .svg 当文档打开时，缩放行为取决于根元素的 width/height，
            # 很容易截出带白边的图。
            page.set_content(
                "<!DOCTYPE html><html><head><meta charset='utf-8'>"
                "<style>html,body{margin:0;padding:0;background:transparent}"
                "svg{display:block;width:100vw;height:100vh}</style></head>"
                f"<body>{svg}</body></html>"
            )
            page.wait_for_timeout(120)
            out = PUBLIC / name
            page.screenshot(path=str(out), omit_background=True)
            page.close()
            print(f"  {name:<24} {size}x{size}  {out.stat().st_size:>7} bytes")
        browser.close()

    print("图标已生成。改 logo 只需改 public/icon.svg 再跑一次本脚本。")
    return 0


if __name__ == "__main__":
    sys.exit(main())
