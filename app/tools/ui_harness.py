"""
浏览器测试的公共小工具：把"明显是环境抖动"的失败重试掉。

为什么需要：
  在真实浏览器里跑测试，偶尔会撞上这类报错：
      Error: Page.evaluate: Execution context was destroyed, most likely
             because of a navigation.
  它和被测代码没关系——是渲染进程被换掉/重建了（本机同时开着用户的 Chrome、
  测试又反复起停 headless Chrome，压力大时更容易出现）。同一个套件重跑就过。

  这种失败如果直接报红，危害是"狼来了"：真出问题时你会以为是抖动。
  所以这里做两件事：
    1. 只在**明确的抖动特征**上重试（其余异常照常抛出去）；
    2. 每次重试都**打印一行**。静默重试会把真问题藏起来，那比失败更糟。

用法：
    from ui_harness import evaluate, count_of
    evaluate(page, "() => window.__FF14IDLE__.store.require()")
"""
from playwright.sync_api import Error as PWError

TRANSIENT = (
    "Execution context was destroyed",
    "Target closed",
    "Frame was detached",
    "Execution context was destroyed.",
)


def _alive(page) -> bool:
    try:
        page.evaluate("1")
        return True
    except PWError:
        return False


def evaluate(page, script, arg=None, tries: int = 3, reload_url: str | None = None):
    """带重试的 page.evaluate。

    如果重试时发现页面已经不可用，会重新加载一次（测试里的页面都是可重建的：
    状态在 localStorage 里，绝大多数探针自己会把要测的状态重新设好）。
    """
    last: Exception | None = None
    for attempt in range(1, tries + 1):
        try:
            return page.evaluate(script) if arg is None else page.evaluate(script, arg)
        except PWError as exc:
            msg = str(exc)
            if not any(t in msg for t in TRANSIENT) or attempt == tries:
                raise
            last = exc
            print(f"  ({attempt} 次抖动，重试：{msg.splitlines()[0][:80]})")
            page.wait_for_timeout(400 * attempt)
            if not _alive(page):
                target = reload_url or page.url
                if not target.startswith("http"):
                    raise
                page.goto(target, wait_until="networkidle")
                page.wait_for_timeout(900)
    raise last if last else RuntimeError("evaluate 失败")


def count_of(page, selector: str, tries: int = 4) -> int:
    """带重试的 locator.count()：刷新后立刻数元素也会撞上同一个抖动。"""
    for _ in range(tries):
        try:
            return page.locator(selector).count()
        except PWError:
            page.wait_for_timeout(250)
    return 0
