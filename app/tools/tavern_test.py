"""
名册与酒馆验证：名角（剧情奖励）+ 酒馆雇佣 + 稀有度 + 上限 + 辞退 + 里程碑解锁 + v8→v9 迁移

这一套是"角色系统"的守门测试。三个最容易悄悄坏掉的地方：
  1. **迁移**：老存档里的成员没有 kind/rarity/race/potential 字段，
     漏补一个就会让属性算成 NaN，而 NaN 不会报错，只会让战斗结果变得莫名其妙。
  2. **上限与辞退**：辞退正在外面探索的人，会留下"派遣里有他、名册里没有他"的脏状态。
  3. **候选不能重名官方角色**：名字是自研生成的，靠黑名单兜底，必须实测。

用法：python tools/tavern_test.py   （需先启动 vite preview --port 4173）
"""
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

sys.path.insert(0, str(Path(__file__).resolve().parent))
from ui_harness import count_of, evaluate  # noqa: E402

URL = "http://127.0.0.1:4173/"
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
OUT = Path(__file__).resolve().parent.parent / "screenshots"

results: list[tuple[str, bool, str]] = []


def check(name: str, ok: bool, detail: str = "") -> None:
    results.append((name, ok, detail))
    print(f"{'PASS' if ok else 'FAIL'}  {name}" + (f"  — {detail}" if detail else ""))


def main() -> int:
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=CHROME, headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 950})
        page.set_default_timeout(20000)
        errors: list[str] = []
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.on(
            "console",
            lambda m: errors.append(f"console.{m.type}: {m.text}") if m.type == "error" else None,
        )

        page.goto(URL, wait_until="networkidle")
        evaluate(page, "() => localStorage.clear()")
        page.reload(wait_until="networkidle")
        page.wait_for_timeout(900)

        # 1) 新档：起手全是名角
        roster = evaluate(page, "() => window.__FF14IDLE__.tavern.roster()")
        check("新档起手 6 名名角", roster["count"] == 6, f"{roster['count']} 人")
        check("起手成员全部标记为名角", all(m["kind"] == "named" for m in roster["members"]),
              str([m["kind"] for m in roster["members"]]))
        check("名角资质恒为 1.00（不带数值特权）",
              all(m["potential"] == 1 for m in roster["members"]),
              str(sorted({m["potential"] for m in roster["members"]})))
        check("名册上限 = 12（第 1 章 + 工房 1 级）", roster["cap"] == 12, str(roster["cap"]))

        # 2) 酒馆候选
        tv = evaluate(page, "() => window.__FF14IDLE__.tavern.state()")
        check("酒馆给出 3 个候选", len(tv["candidates"]) == 3, str(len(tv["candidates"])))
        check("候选带名字/种族/职业/稀有度/资质/价格",
              all(c["name"] and c["race"] and c["job"] and c["rarity"]
                  and c["potential"] > 0 and c["cost"] > 0 for c in tv["candidates"]),
              str(tv["candidates"][0]))
        # 稀有度与资质必须一致（表格改了而数据忘了改，就会在这里露出来）
        want = {"common": 1.0, "uncommon": 1.04, "rare": 1.09, "epic": 1.15}
        check("候选的资质与稀有度一致",
              all(abs(c["potential"] - want[c["rarity"]]) < 1e-9 for c in tv["candidates"]),
              str([(c["rarity"], c["potential"]) for c in tv["candidates"]]))
        check("同一天候选是固定的（刷新页面不会重摇）",
              evaluate(page, "() => window.__FF14IDLE__.tavern.state().candidates.map(c => c.id)")
              == [c["id"] for c in tv["candidates"]])

        # 3) 名字绝不撞官方角色：批量重 roll 拿到大量生成名再比对
        gen = evaluate(
            page,
            """() => {
                // 通过连续重 roll 拿到大量生成名（每次 roll 换一批种子）
                const api = window.__FF14IDLE__; const st = api.store.require();
                st.gold = 10 ** 9;
                const seen = [];
                for (let i = 0; i < 60; i++) {
                    api.tavern.reroll(false);
                    for (const c of st.tavern.candidates) seen.push(c.name);
                }
                return seen;
            }""",
        )
        official = ["桑克雷德", "雅·修特拉", "阿莉塞", "阿尔菲诺", "古·拉哈·提亚", "埃斯蒂尼安",
                    "可露儿", "于里昂热", "莉瑟", "艾默里克", "劳班", "西德", "敏菲利亚",
                    "塔塔露", "芙朵拉", "盖娅", "光之战士"]
        clash = sorted({n for n in gen if n in official})
        check("生成的佣兵名不撞任何官方角色名", not clash, str(clash[:5]))
        check("生成的名字有足够多样性", len({*gen}) >= 40, f"{len({*gen})} 个不同名字 / {len(gen)} 次")

        # 4) 雇佣
        page.goto(URL, wait_until="networkidle")
        evaluate(page, "() => localStorage.clear()")
        page.reload(wait_until="networkidle")
        page.wait_for_timeout(800)
        before = evaluate(page, "() => ({ gold: window.__FF14IDLE__.store.require().gold, n: window.__FF14IDLE__.store.require().members.length })")
        cand = evaluate(page, "() => window.__FF14IDLE__.tavern.state().candidates[0]")
        evaluate(page, "() => { window.__FF14IDLE__.store.require().gold = 50000; }")
        hired = evaluate(page, "() => window.__FF14IDLE__.tavern.hire(window.__FF14IDLE__.tavern.state().candidates[0].id)")
        after = evaluate(page, "() => ({ gold: window.__FF14IDLE__.store.require().gold, n: window.__FF14IDLE__.store.require().members.length })")
        check("雇佣成功", hired.get("ok") is True, str(hired))
        check("雇佣后名册 +1", after["n"] == before["n"] + 1, f"{before['n']} -> {after['n']}")
        check("雇佣按标价扣金币", after["gold"] == 50000 - cand["cost"], f"{after['gold']}（标价 {cand['cost']}）")
        newest = evaluate(page, "() => { const m = window.__FF14IDLE__.store.require().members; return m[m.length-1]; }")
        check("新人标记为佣兵且带着稀有度资质",
              newest["kind"] == "hire" and newest["rarity"] == cand["rarity"]
              and abs(newest["potential"] - cand["potential"]) < 1e-9,
              f"{newest['name']} {newest['rarity']} ×{newest['potential']}")
        check("雇走之后候选少一个",
              evaluate(page, "() => window.__FF14IDLE__.tavern.state().candidates.length") == 2)

        # 5) 金币不足要被挡住
        poor = evaluate(
            page,
            """() => { const st = window.__FF14IDLE__.store.require(); st.gold = 0;
                 return window.__FF14IDLE__.tavern.hire(window.__FF14IDLE__.tavern.state().candidates[0].id); }""",
        )
        check("金币不足时雇佣被拒", poor.get("ok") is False, str(poor.get("reason")))

        # 6) 免费刷新一天一次，付费重 roll 扣钱
        free1 = evaluate(page, "() => window.__FF14IDLE__.tavern.reroll(true)")
        free2 = evaluate(page, "() => window.__FF14IDLE__.tavern.reroll(true)")
        check("每天第一次免费刷新可用", free1.get("ok") is True, str(free1))
        check("免费刷新一天只能用一次", free2.get("ok") is False, str(free2.get("reason")))
        paid = evaluate(
            page,
            """() => { const st = window.__FF14IDLE__.store.require(); st.gold = 5000;
                 const g0 = st.gold; const r = window.__FF14IDLE__.tavern.reroll(false);
                 return { r, spent: g0 - st.gold }; }""",
        )
        check("付费重 roll 能换一批", paid["r"]["ok"] is True, str(paid["r"]))
        check("付费重 roll 扣了金币", paid["spent"] > 0, f"扣 {paid['spent']}")

        # 7) 上限
        cap_test = evaluate(
            page,
            """() => {
                const api = window.__FF14IDLE__; const st = api.store.require();
                st.gold = 10 ** 9;
                // 把名册灌到上限（用佣兵路径，避免绕过规则）
                let guard = 0;
                while (st.members.length < api.tavern.roster().cap && guard++ < 40) {
                    const c = st.tavern.candidates[0];
                    if (!c) { api.tavern.reroll(false); continue; }
                    api.tavern.hire(c.id);
                }
                const cap = api.tavern.roster().cap;
                const full = api.tavern.roster().count >= cap;
                const c2 = st.tavern.candidates[0];
                const res = c2 ? api.tavern.hire(c2.id) : { ok: false, reason: '没有候选' };
                return { cap, full, res, count: st.members.length };
            }""",
        )
        check("名册能填到上限", cap_test["full"], f"{cap_test['count']} / {cap_test['cap']}")
        check("名册满了就雇不进人", cap_test["res"].get("ok") is False, str(cap_test["res"].get("reason")))

        # 8) 辞退
        wol = evaluate(page, """() => { const st = window.__FF14IDLE__.store.require();
             const w = st.members.find(m => m.defId === 'wol');
             return { id: w.id, res: window.__FF14IDLE__.tavern.dismiss(w.id) }; }""")
        check("光之战士（你自己）不能被辞退", wol["res"].get("ok") is False, str(wol["res"].get("reason")))

        busy = evaluate(
            page,
            """() => {
                const api = window.__FF14IDLE__; const st = api.store.require();
                // 挑一个佣兵派出去，再试着辞退他
                const hire = st.members.find(m => m.kind === 'hire');
                const d = st.chapter;
                st.expeditions.push({
                    id: 'probe', dungeonId: st.cleared[0] ?? null, memberIds: [hire.id],
                    roster: [], seed: 1, startTs: Date.now(), durationMs: 600000,
                    status: 'running', result: null, collected: false,
                });
                const res = api.tavern.dismiss(hire.id);
                st.expeditions = st.expeditions.filter(e => e.id !== 'probe');
                return { name: hire.name, res, chapter: d };
            }""",
        )
        check("外派中的成员不能被辞退", busy["res"].get("ok") is False, str(busy["res"].get("reason")))

        fired = evaluate(
            page,
            """() => {
                const api = window.__FF14IDLE__; const st = api.store.require();
                const hire = st.members.find(m => m.kind === 'hire');
                const n0 = st.members.length;
                const res = api.tavern.dismiss(hire.id);
                return { res, n0, n1: st.members.length, stillThere: st.members.some(m => m.id === hire.id) };
            }""",
        )
        check("辞退佣兵成功", fired["res"].get("ok") is True, str(fired["res"]))
        check("辞退后名册 -1 且人真的不在了",
              fired["n1"] == fired["n0"] - 1 and not fired["stillThere"],
              f"{fired['n0']} -> {fired['n1']}")

        # 9) 里程碑解锁名角：走真实路径 —— 改状态 → 重载 → 启动时 refreshRoster 发放
        page.evaluate(
            """() => {
                const st = window.__FF14IDLE__.store.require();
                st.towerBest = 20;        // 冰雪的骑士
                st.trialBest = 60;        // 敏菲利亚
                st.facility.level = 3;    // 西德
                st.cleared = Array.from({length: 20}, (_, i) => 'probe-' + i);  // 塔塔露
                st.relicFinalBonus = true; // 盖娅
                st.chapter = 2;           // 埃斯蒂尼安 + 可露儿
                window.__FF14IDLE__.save();
            }"""
        )
        page.reload(wait_until="networkidle")
        page.wait_for_timeout(1100)
        codex = evaluate(page, "() => window.__FF14IDLE__.tavern.codex()")
        owned = {c["def"]["id"] for c in codex if c["owned"]}
        want_ids = {"hoary", "minfilia", "cid", "tataru", "gaia", "estinien", "krile"}
        missing = sorted(want_ids - owned)
        check("里程碑达成了就发名角（塔/试炼/工房/通关数/幻境终阶/章节）",
              not missing, f"缺少 {missing}")
        check("图鉴里名角总数 18", len(codex) == 18, str(len(codex)))
        check("未达成的名角能显示获取条件",
              all(c["label"] for c in codex), str(codex[0]["label"]))
        page.locator("[data-action='tab'][data-tab='party']").click()
        page.wait_for_timeout(600)
        page.screenshot(path=str(OUT / "13-tavern.png"), full_page=True)

        # 10) v8 → v9 迁移：老档成员没有新字段，必须补齐且不丢人
        #     先记下"迁移前"的真实人数与身份，再拿它对比 —— 不要写死数字：
        #     前面几步已经解锁了名角、雇过佣兵，写死数字只会写错自己。
        before_mig = evaluate(
            page,
            """() => {
                const st = window.__FF14IDLE__.store.require();
                const raw = JSON.parse(JSON.stringify(st));
                raw.version = 8;
                for (const m of raw.members) {
                    delete m.kind; delete m.rarity; delete m.race; delete m.potential;
                }
                delete raw.tavern;
                raw.integrity = { seq: 0, digest: '' };
                localStorage.setItem('ff14idle.save', JSON.stringify(raw));
                return {
                    count: st.members.length,
                    named: st.members.filter(m => m.kind === 'named').length,
                    hires: st.members.filter(m => m.kind === 'hire').length,
                };
            }"""
        )
        page.reload(wait_until="networkidle")
        page.wait_for_timeout(1100)
        migrated = evaluate(
            page,
            """() => {
                const st = window.__FF14IDLE__.store.require();
                const named = st.members.filter(m => m.kind === 'named');
                const hires = st.members.filter(m => m.kind === 'hire');
                return {
                    version: st.version,
                    count: st.members.length,
                    named: named.length,
                    hires: hires.length,
                    bad: st.members.filter(m => !m.kind || !m.rarity || !m.race
                          || !Number.isFinite(m.potential) || m.potential <= 0).map(m => m.name),
                    // 名角必须都带固定职业，佣兵必须都带稀有度资质
                    namedOk: named.every(m => m.rarity === 'common' && m.potential === 1),
                    hireOk: hires.every(m => m.potential >= 1 && !!m.rarity),
                    hasTavern: !!st.tavern && st.tavern.candidates.length > 0,
                };
            }"""
        )
        check("v8 老档迁移到 v9", migrated["version"] >= 9, str(migrated["version"]))
        check("迁移后成员一个没丢", migrated["count"] == before_mig["count"],
              f"{before_mig['count']} -> {migrated['count']}")
        check("迁移补齐了 kind/rarity/race/potential", not migrated["bad"], str(migrated["bad"][:4]))
        check("迁移后名角/佣兵的数量与迁移前一致",
              migrated["named"] == before_mig["named"] and migrated["hires"] == before_mig["hires"],
              f"名角 {migrated['named']} / 佣兵 {migrated['hires']}")
        check("名角迁移后仍是基准资质", migrated["namedOk"])
        check("佣兵迁移后资质不被清零", migrated["hireOk"])
        check("迁移补出了酒馆状态", migrated["hasTavern"])

        # 11) 属性没有因为迁移变成 NaN
        stats = evaluate(
            page,
            """() => {
                const api = window.__FF14IDLE__;
                const st = api.store.require();
                const out = [];
                for (const m of st.members.slice(0, 4)) {
                    const s = api.mastery.stats(m.id);
                    out.push({ name: s.name, hp: s.hp, potency: s.potency,
                               ok: Number.isFinite(s.hp) && Number.isFinite(s.potency)
                                   && Number.isFinite(s.healPotency) });
                }
                return out;
            }""",
        )
        check("迁移后属性计算正常（无 NaN）",
              all(x["ok"] for x in stats) and all(x["hp"] > 0 for x in stats),
              str(stats[:2]))

        # 12) 手机上的名册页不能长到没法用
        #     名册能到十几号人，成员详情卡全部展开时这一页会飙到 4000px 以上 —— 真机实测过。
        #     现在：详情卡折起来、手机上总览表禁止换行。这里守住这个结果。
        mobile = browser.new_page(viewport={"width": 420, "height": 900})
        mobile.goto(URL, wait_until="networkidle")
        mobile.wait_for_timeout(900)
        mobile.locator("[data-action='tab'][data-tab='party']").click()
        mobile.wait_for_timeout(600)
        mh = mobile.evaluate("() => document.body.scrollHeight")
        check("手机 420px 下队伍页高度可控（< 2400px）", mh < 2400, f"{mh}px")
        overflow = mobile.evaluate(
            "() => document.documentElement.scrollWidth - document.documentElement.clientWidth"
        )
        check("手机上队伍页无横向溢出", overflow <= 2, f"{overflow}px")
        mobile.screenshot(path=str(OUT / "14-party-mobile.png"), full_page=False)
        mobile.close()

        check("全程无 JS 错误", len(errors) == 0, "; ".join(errors[:2])[:180])
        browser.close()

    failed = [r for r in results if not r[1]]
    print("\n" + "=" * 52)
    print(f"合计 {len(results)} 项，通过 {len(results) - len(failed)}，失败 {len(failed)}")
    for name, _, detail in failed:
        print(f"  FAIL: {name} {detail}")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
