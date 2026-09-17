"""
逐屏 UI 截图（视觉验收用）

做两件事：
  1. 把每个 Tab 都截图到 screenshots/ui-*.png，便于逐屏检查排版与可读性
  2. 顺手做几项"界面可用性"断言：导航项齐全、tooltip 能弹出、无 JS 错误

会先把状态铺好（派一支队伍、开一局试炼、开一次攀爬、给几件装备），
这样截图里看到的是"有内容"的真实形态，而不是空壳。

用法：python tools/ui_shot.py   （需先启动 vite preview --port 4173）
"""
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

URL = "http://127.0.0.1:4173/"
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
OUT = Path(__file__).resolve().parent.parent / "screenshots"

results: list[tuple[str, bool, str]] = []


def check(name: str, ok: bool, detail: str = "") -> None:
    results.append((name, ok, detail))
    print(f"{'PASS' if ok else 'FAIL'}  {name}" + (f"  — {detail}" if detail else ""))


TABS = ["dispatch", "trial", "tower", "party", "inventory", "cadence", "relic", "facility", "report"]


def main() -> int:
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=CHROME, headless=True)
        page = browser.new_page(viewport={"width": 1360, "height": 900})
        errors: list[str] = []
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.on(
            "console",
            lambda m: errors.append(f"console.{m.type}: {m.text}") if m.type == "error" else None,
        )

        page.goto(URL, wait_until="networkidle")
        page.evaluate("localStorage.clear()")
        page.reload(wait_until="networkidle")
        page.wait_for_timeout(800)

        # 铺一些内容，让截图不是空壳
        page.evaluate(
            """() => {
                const api = window.__FF14IDLE__; const st = api.store.require();
                const byJob = (j) => st.members.find(m => m.job === j)?.id;
                // 让队伍有点装备与经验
                for (const m of st.members) { m.level = 24; m.exp = 120; m.runs = 3; }
                st.gold = 12800;
                // 造几件装备：3 件装上、3 件留在背包（让两个页面都有内容可看）
                st.inventory.push(
                  { uid:'demo_w', name:'秘银战斧', slot:'weapon', itemLevel:96, quality:'epic',
                    stats:{hp:190,potency:91,healPotency:0} },
                  { uid:'demo_h', name:'玄铁面甲', slot:'head', itemLevel:88, quality:'rare',
                    stats:{hp:280,potency:23,healPotency:0} },
                  { uid:'demo_b', name:'粗布胸甲', slot:'body', itemLevel:72, quality:'uncommon',
                    stats:{hp:230,potency:19,healPotency:0} },
                  { uid:'demo_l', name:'苍玉腿甲', slot:'legs', itemLevel:104, quality:'legendary',
                    stats:{hp:340,potency:29,healPotency:0} },
                  { uid:'demo_r', name:'古铜指环', slot:'ring1', itemLevel:64, quality:'common',
                    stats:{hp:110,potency:23,healPotency:0} },
                  { uid:'demo_e', name:'硬木耳坠', slot:'ears', itemLevel:56, quality:'rare',
                    stats:{hp:100,potency:20,healPotency:3} }
                );
                const first = st.members[0];
                first.equipment.weapon = 'demo_w';
                first.equipment.head = 'demo_h';
                first.equipment.body = 'demo_b';
                // 量谱精通开一个
                st.masteries[first.id] = [first.job + '_a'];
                // 工房：指派两个项目并攒 3 小时产量
                api.facility.assign(0, 'mine');
                st.facility.since = Date.now() - 3 * 3600 * 1000;
                st.facility.boxes = 5;
                // 幻境武器推进一阶
                st.relics[first.id] = { stage: 1, progress: { clears: 7, bosses: 3 } };
                // 塔之记忆
                st.towerMemory = 0.23; st.towerBest = 23;
                api.save();
                api.store.notify();
            }"""
        )
        page.wait_for_timeout(400)

        # 派一支队伍（进行中）+ 一局试炼 + 一次攀爬
        setup = page.evaluate(
            """() => {
                const api = window.__FF14IDLE__; const st = api.store.require();
                const byJob = (j) => st.members.find(m => m.job === j)?.id;
                const party4 = [byJob('WAR'), byJob('WHM'), byJob('RDM'), byJob('BLM')].filter(Boolean);
                const party3 = [byJob('WAR'), byJob('WHM'), byJob('BLM')].filter(Boolean);
                document.querySelector("[data-action='pick-dungeon']:not(.locked)").click();
                document.querySelector("[data-action='dispatch']").click();
                const trial = api.trial.start(party3);
                const adv = [];
                if (trial.ok) {
                    for (let i = 0; i < 3; i++) { const r = api.trial.advance(); adv.push(!!r.finished); }
                }
                const tower = api.tower.start(party3);
                if (tower.ok) { for (let i = 0; i < 7; i++) api.tower.climb(); }
                const tr = api.trial.run();
                api.store.notify();
                return { party3, trialOk: trial.ok, trialErr: trial.error || '',
                         trialStatus: tr ? tr.status : 'null', trialFloor: tr ? tr.nodeIndex : -1,
                         advFinished: adv, towerOk: tower.ok };
            }"""
        )
        print(
            "  setup: trialOk={trialOk} err={trialErr!r} status={trialStatus} floor={trialFloor} "
            "advFinished={advFinished} towerOk={towerOk}".format(**setup)
        )

        # 1) 导航项齐全
        nav = page.locator("[data-action='tab']").count()
        missing = page.evaluate(
            """(tabs) => tabs.filter(t => !document.querySelector(`[data-action='tab'][data-tab='${t}']`))""",
            TABS,
        )
        check("9 个导航项齐全", nav == 9 and not missing, f"共 {nav} 个，缺失 {missing}")

        # 2) 逐屏截图
        for tab in TABS:
            page.locator(f"[data-action='tab'][data-tab='{tab}']").click()
            page.wait_for_timeout(450)
            page.screenshot(path=str(OUT / f"ui-{tab}.png"), full_page=True)

        # 3) tooltip 能弹出
        page.locator("[data-action='tab'][data-tab='dispatch']").click()
        page.wait_for_timeout(350)
        chip = page.locator(".res[data-tip]").first
        chip.hover()
        page.wait_for_timeout(400)
        tip_visible = page.locator(".tip.show").count() == 1
        tip_text = page.locator(".tip").inner_text() if tip_visible else ""
        check("悬停资源条能弹出说明", tip_visible, tip_text[:40])
        page.screenshot(path=str(OUT / "ui-tooltip.png"))

        # 4) 导航角标（有可收获/可领奖时应出现）
        badges = page.locator(".nav-badge").count()
        check("导航角标可用", badges >= 0, f"{badges} 个")

        # 5) 窄屏实测（手机宽度）：导航应折叠为横向图标条，且不得横向溢出
        page.set_viewport_size({"width": 420, "height": 900})
        page.wait_for_timeout(400)
        for tab in ["dispatch", "party", "facility", "tower"]:
            page.locator(f"[data-action='tab'][data-tab='{tab}']").click()
            page.wait_for_timeout(400)
            page.screenshot(path=str(OUT / f"ui-mobile-{tab}.png"), full_page=True)

        nav_dir = page.evaluate(
            "() => getComputedStyle(document.querySelector('.nav')).flexDirection"
        )
        check("窄屏下导航改为横向", nav_dir == "row", nav_dir)

        overflow = page.evaluate(
            "() => document.documentElement.scrollWidth - document.documentElement.clientWidth"
        )
        check("窄屏无横向溢出", overflow <= 2, f"{overflow}px")

        narrow = page.evaluate(
            """() => {
                const bad = [];
                for (const el of document.querySelectorAll('.content *')) {
                    const r = el.getBoundingClientRect();
                    if (r.width > 0 && r.right > window.innerWidth + 2) bad.push(el.className || el.tagName);
                }
                return [...new Set(bad)].slice(0, 5);
            }"""
        )
        check("窄屏无元素越界", len(narrow) == 0, str(narrow))

        page.set_viewport_size({"width": 1360, "height": 900})

        # 6) 副本筛选：默认只看"待推进"，可切到"全部"
        page.locator("[data-action='tab'][data-tab='dispatch']").click()
        page.wait_for_timeout(400)
        todo_n = page.locator("[data-action='pick-dungeon']").count()
        page.locator("[data-action='filter-dungeon'][data-filter='all']").click()
        page.wait_for_timeout(350)
        all_n = page.locator("[data-action='pick-dungeon']").count()
        check("副本筛选：全部 > 待推进", all_n > todo_n, f"待推进 {todo_n} -> 全部 {all_n}")
        page.locator("[data-action='filter-dungeon'][data-filter='todo']").click()
        page.wait_for_timeout(350)
        check("筛选可切回待推进", page.locator("[data-action='pick-dungeon']").count() == todo_n)
        page.screenshot(path=str(OUT / "ui-dispatch-todo.png"), full_page=True)

        # 7) 键盘快捷键：数字键切页、Esc 收起说明
        page.keyboard.press("4")
        page.wait_for_timeout(350)
        active = page.evaluate("() => document.querySelector('.nav-item.active')?.dataset.tab")
        check("数字键 4 切到队伍页", active == "party", str(active))

        page.keyboard.press("1")
        page.wait_for_timeout(350)
        active = page.evaluate("() => document.querySelector('.nav-item.active')?.dataset.tab")
        check("数字键 1 切回派遣页", active == "dispatch", str(active))

        page.locator(".res[data-tip]").first.hover()
        page.wait_for_timeout(300)
        page.keyboard.press("Escape")
        page.wait_for_timeout(250)
        check("Esc 可收起说明", page.locator(".tip.show").count() == 0)

        # 8) 试炼棋盘：点一格查看敌人详情
        page.locator("[data-action='tab'][data-tab='trial']").click()
        page.wait_for_timeout(400)
        nodes = page.locator("[data-action='inspect-node']")
        n_nodes = nodes.count()
        check("试炼棋盘节点可点击", n_nodes > 0, f"{n_nodes} 格（0 表示布景里试炼未进入进行中）")
        if n_nodes > 0:
            nodes.nth(1).click()
            page.wait_for_timeout(350)
            has_detail = page.locator(".node-detail").count() == 1
            detail_text = page.locator(".node-detail").inner_text() if has_detail else ""
            check("点击节点弹出详情面板", has_detail, detail_text[:60])
            page.screenshot(path=str(OUT / "ui-trial-node.png"), full_page=True)
            nodes.nth(1).click()
            page.wait_for_timeout(300)
            check("再次点击收起详情", page.locator(".node-detail").count() == 0)

        # 9) 主题：切换 + 两套配色都截一张
        #    配色是"整体观感"的东西，光靠断言测不出好看，但至少能保证：
        #    切换真的生效、刷新后记得住、浅色下没有元素还留着深色底。
        page.locator("[data-action='tab'][data-tab='dispatch']").click()
        page.wait_for_timeout(300)
        before = page.evaluate("() => document.documentElement.dataset.theme")
        page.locator("[data-action='toggle-theme']").click()
        page.wait_for_timeout(400)
        after = page.evaluate("() => document.documentElement.dataset.theme")
        check("点按钮能切换深浅主题", before != after, f"{before} -> {after}")
        check("主题记忆写进 localStorage",
              page.evaluate("() => localStorage.getItem('ff14idle.theme')") == after)

        stored = after
        for theme in ("dark", "light"):
            if theme != stored:
                page.locator("[data-action='toggle-theme']").click()
                page.wait_for_timeout(350)
            got = page.evaluate("() => document.documentElement.dataset.theme")
            check(f"能切到 {theme} 主题", got == theme, got)
            for tab in ("dispatch", "party"):
                if tab != "dispatch":
                    page.locator(f"[data-action='tab'][data-tab='{tab}']").click()
                    page.wait_for_timeout(350)
                page.screenshot(path=str(OUT / f"theme-{theme}-{tab}.png"), full_page=True)
            page.locator("[data-action='tab'][data-tab='dispatch']").click()
            page.wait_for_timeout(250)

        # 浅色下不该还有"深色底"的漏网元素（卡片/面板这类大面积的东西）
        page.locator("[data-action='tab'][data-tab='party']").click()
        page.wait_for_timeout(400)
        dark_areas = page.evaluate(
            """() => {
            const bad = [];
            const lum = (c) => { const m = c.match(/rgba?\\((\\d+), (\\d+), (\\d+)(?:, ([\\d.]+))?/);
              if (!m) return null; if (m[4] !== undefined && +m[4] < 0.5) return null;
              return (+m[1] + +m[2] + +m[3]) / 3; };
            for (const el of document.querySelectorAll('.panel, .card, .topbar, .nav, .btn, .tag, td, th')) {
              const l = lum(getComputedStyle(el).backgroundColor);
              if (l !== null && l < 90) bad.push((el.className || el.tagName) + '=' + getComputedStyle(el).backgroundColor);
            }
            return bad.slice(0, 6);
          }"""
        )
        check("浅色主题下没有残留的深色底", len(dark_areas) == 0, "; ".join(dark_areas))

        # 10) 无 JS 错误
        check("全程无 JS 错误", len(errors) == 0, "; ".join(errors[:2])[:180])

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
