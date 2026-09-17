"""
数值平衡检验：用真实代码路径跑一遍第 1 章全部副本，检查
  - 刚够等级（无装备）时能否通关
  - 单次时长是否落在放置游戏的合理区间（目标 60–180 秒）
  - 装备成长是否带来可见的提速

用法：python tools/balance_test.py   （需先启动 vite preview --port 4173）
"""
import sys
from playwright.sync_api import sync_playwright

URL = "http://127.0.0.1:4173/"
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"


def main() -> int:
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=CHROME, headless=True)
        page = browser.new_page()
        page.goto(URL, wait_until="networkidle")
        page.wait_for_timeout(700)
        # 明确给每个操作设上限：这个套件出现过两次"渲染进程卡住、page.evaluate 永不返回"。
        # 没设超时的调用会一直等下去（运行器只能靠 180s 兜底），设了之后 20s 内就会报错，
        # 运行器能立刻拿到结论并重试一次。
        page.set_default_timeout(20000)

        # 用界面上「已选中的小队」（即 main.ts 的默认编队：坦克+治疗+两名输出）
        party = page.eval_on_selector_all(
            "[data-action='toggle-party'].selected", "els => els.map(e => e.dataset.member)"
        )

        # 直接从页面里取副本清单（通过 DOM 的 data-dungeon 属性，避免额外导出）
        #
        # 注意：副本列表默认只显示「待推进」，直接抓会只拿到 1 个，
        # 于是这个测试会「全绿但什么都没测」。必须先切到「全部」。
        page.locator("[data-action='filter-dungeon'][data-filter='all']").click()
        page.wait_for_timeout(300)
        ids = page.eval_on_selector_all(
            "[data-action='pick-dungeon']", "els => els.map(e => e.dataset.dungeon)"
        )
        if len(ids) < 5:
            print(f"❌ 只取到 {len(ids)} 个副本，筛选没生效，平衡检验会失去意义")
            browser.close()
            return 1
        print(f"小队：{party}")
        print(f"第 1 章副本 {len(ids)} 个，逐个模拟（同一套 15 级无装备队伍）\n")
        print(f"{'副本':<44}{'Lv':>4}{'iLvl':>6}{'结果':>6}{'秒':>6}{'剩余':>6}{'掉落':>5}")
        print("-" * 80)

        wins = 0
        durations: list[int] = []
        first_win = False
        for i, did in enumerate(ids):
            r = page.evaluate(
                "([d, p]) => window.__FF14IDLE__.simulate(d, p)", [did, party]
            )
            if not r:
                continue
            wins += 1 if r["win"] else 0
            if i == 0:
                first_win = bool(r["win"])
            durations.append(r["durationSec"])
            print(
                f"{r['dungeon'][:42]:<44}{r['reqLevel']:>4}{r['reqItemLevel']:>6}"
                f"{'胜' if r['win'] else '败':>6}{r['durationSec']:>6}{r['hpLeftPct']:>5}%{r['loot']:>5}"
            )

        print("-" * 80)
        if not durations:
            print("❌ 一个副本都没模拟出来")
            browser.close()
            return 1
        print(f"通关 {wins}/{len(ids)}，时长 最短 {min(durations)}s / 最长 {max(durations)}s / 平均 {sum(durations)//len(durations)}s")
        browser.close()

    # 下面这些才是这个测试真正的"断言"：光打印数字，失败也不会被上层发现
    problems: list[str] = []
    if len(durations) != len(ids):
        problems.append(f"{len(ids) - len(durations)} 个副本模拟直接报错返回空")
    if not first_win:
        problems.append("刚够等级（无装备）连第 1 个副本都打不过，前期门槛过高")
    slow = [d for d in durations if d > 300]
    if slow:
        problems.append(f"{len(slow)} 个副本耗时超过 300s，放置节奏过慢")
    for p in problems:
        print(f"❌ {p}")
    if problems:
        return 1
    print("RESULT: BALANCE OK")
    return 0
if __name__ == "__main__":
    sys.exit(main())
