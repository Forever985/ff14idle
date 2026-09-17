"""一次性机械替换：给主要面板标题加上自绘图标。

为什么要用 Python 而不是 PowerShell：
Windows PowerShell 5.1 会把无 BOM 的 .ps1 当 ANSI/GBK 读，脚本里的中文会被破坏。
Python 原生按 UTF-8 处理，且改完立刻能跑校验。
"""
import io
import sys
from pathlib import Path

APP = Path(__file__).resolve().parent.parent / "src" / "ui" / "app.ts"

# 面板标题开头文字 → 图标名（按更具体优先排序，避免前缀互相吃掉）
MAP = [
    ("选择小队", "party"),
    ("副本（第", "node.battle"),
    ("进行中的派遣", "dispatch"),
    ("出击", "dispatch"),
    ("背包", "inventory"),
    ("上一局结果", "report"),
    ("破魔试炼", "trial"),
    ("无尽塔", "tower"),
    ("队伍状态", "party"),
    ("试炼日志", "report"),
    ("攀爬日志", "report"),
    ("幻境武器", "relic"),
    ("工房 ·", "facility"),
    ("生产槽位", "anvil"),
    ("待鉴定箱", "box"),
    ("扩建", "store"),
    ("每日 ·", "cadence"),
    ("每周 ·", "report"),
    ("战报", "report"),
]

ANCHOR = '<div class="panel-title">'


def main() -> int:
    src = APP.read_text(encoding="utf-8")
    total = 0
    for text, ico in MAP:
        needle = ANCHOR + text
        # 已经加过图标的不重复加（幂等）
        already = ANCHOR + "${icon("
        count = src.count(needle)
        if count == 0:
            continue
        replacement = ANCHOR + "${icon('" + ico + "', 16)}" + text
        src = src.replace(needle, replacement)
        total += count
        print(f"  {text:<12} -> {ico:<12} 替换 {count} 处")
        _ = already

    APP.write_text(src, encoding="utf-8")
    print(f"合计替换 {total} 处")

    # 校验：不应出现重复前缀或未闭合
    if '${icon(${icon(' in src:
        print("❌ 出现重复插入，请检查", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
