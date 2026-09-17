from playwright.sync_api import sync_playwright, Error
import json
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
with sync_playwright() as p:
    b = p.chromium.launch(executable_path=CHROME, headless=True)
    pg = b.new_page()
    errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto("http://127.0.0.1:4173/", wait_until="networkidle")
    pg.evaluate("localStorage.clear()")
    pg.reload(wait_until="networkidle"); pg.wait_for_timeout(800)

    # 复刻测试里的状态变更
    r1 = pg.evaluate("""() => {
        const api = window.__FF14IDLE__; const st = api.store.require();
        const mid = st.members[0].id;
        st.gold = 100000;
        st.cleared = Array.from(document.querySelectorAll("[data-action='pick-dungeon']")).map(e => e.dataset.dungeon);
        for (let i = 0; i < 5; i++) {
            const rs = st.relics[mid] ?? { stage: 0, progress: {} };
            rs.progress = { clears: 99, bosses: 99, trialScore: 9999, roulette: 99 };
            st.relics[mid] = rs;
            const r = api.relic.advance(mid);
            if (!r.ok) break;
        }
        // 模拟"金币不足"那一步
        const m2 = st.members[1].id;
        st.gold = 0;
        st.relics[m2] = { stage: 0, progress: { clears: 99 } };
        api.save();
        const raw = localStorage.getItem('ff14idle.save');
        const parsed = JSON.parse(raw);
        return { gold: parsed.gold, cleared: parsed.cleared.length,
                 relicKeys: Object.keys(parsed.relics||{}),
                 stage: parsed.relics?.[mid]?.stage, final: parsed.relicFinalBonus,
                 rawKB: Math.round(raw.length/1024) };
    }""")
    print("存储内容:", json.dumps(r1, ensure_ascii=False))

    pg.reload(wait_until="networkidle"); pg.wait_for_timeout(900)
    r2 = pg.evaluate("""() => {
        const st = window.__FF14IDLE__.store.require();
        return { gold: st.gold, cleared: st.cleared.length, relicKeys: Object.keys(st.relics||{}),
                 final: st.relicFinalBonus, version: st.version };
    }""")
    print("刷新后内存:", json.dumps(r2, ensure_ascii=False))
    print("JS 错误:", errs[:3])
    b.close()
