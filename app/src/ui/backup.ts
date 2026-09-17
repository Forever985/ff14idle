/**
 * 存档备份提醒
 *
 * 为什么需要：手机浏览器（尤其 iOS Safari）可能清理本地存储——
 * ITP 会限制"脚本可写存储"，站点连续一段时间没有交互就可能被清掉。
 * 对放置游戏来说这正好是最容易中的一枪：放着不管几天，回来发现号没了。
 *
 * 这里不做云存档（那是另一个量级的工程），只做一件成本最低、但真正能救命的事：
 * **定期提醒玩家导出一份存档**。导出是纯前端生成的 JSON 文件，存到备忘录/文件里就行。
 *
 * 两个细节：
 *  · 提醒频率要克制：导过就重新计时，不想看可以"稍后"，稍后是 3 天。
 *  · 新号不提醒：刚开始玩没什么可丢的，一进来就弹警告只会劝退。
 */
import { exportSave, saveGame } from '../core/save';
import { store } from '../core/store';
import { flash } from './toast';

const DISMISS_KEY = 'ff14idle.backupSnooze';
/** 多久没导出就提醒（iOS 的窗口大约是 7 天，所以提前到 6 天） */
const REMIND_AFTER_MS = 6 * 24 * 60 * 60 * 1000;
/** 点"稍后"之后安静多久 */
const SNOOZE_MS = 3 * 24 * 60 * 60 * 1000;
/** 存档太新就不烦人（新号前 2 天不提） */
const MIN_AGE_MS = 2 * 24 * 60 * 60 * 1000;

/**
 * 导出存档 —— 页脚的「导出存档」按钮和提醒里的「导出」都走这里。
 *
 * 关键是**导出要记一笔时间**：不记的话提醒会一直弹。
 * 所以导出之后顺手把 lastExportAt 写进存档并落盘。
 */
export function exportNow(): void {
  const state = store.require();
  const blob = new Blob([exportSave(state)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `ff14idle-save-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(a.href);

  state.lastExportAt = Date.now();
  saveGame(state);
  hidePill();
  flash('存档已导出，请把它保存到安全的地方（备忘录 / 文件 App）');
}

function num(v: string | null): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function snoozedUntil(): number {
  try {
    return num(localStorage.getItem(DISMISS_KEY));
  } catch {
    return 0;
  }
}

function snooze(): void {
  try {
    localStorage.setItem(DISMISS_KEY, String(Date.now() + SNOOZE_MS));
  } catch {
    // 无痕模式：这次会话内不再弹即可
  }
}

let pill: HTMLElement | null = null;

function hidePill(): void {
  pill?.remove();
  pill = null;
}

function showPill(daysAgo: number | null): void {
  if (pill) return;
  const box = document.createElement('div');
  box.className = 'notice-pill notice-pill--backup';
  box.innerHTML =
    '<span class="notice-dot"></span>' +
    `<span>${daysAgo === null ? '还没有导出过存档' : `上次导出存档是 ${daysAgo} 天前`}` +
    '<small>手机浏览器可能清理本地存储，导出一份 JSON 更保险</small></span>' +
    '<button type="button" class="notice-act" data-backup="now">导出</button>' +
    '<button type="button" class="notice-act notice-act--ghost" data-backup="later">稍后</button>';

  box.addEventListener('click', (ev) => {
    const btn = (ev.target as HTMLElement).closest('[data-backup]') as HTMLElement | null;
    if (!btn) return;
    if (btn.dataset.backup === 'now') {
      exportNow();
    } else {
      snooze();
      hidePill();
    }
  });
  document.body.appendChild(box);
  pill = box;
}

/** 检查一次：该不该提醒导出 */
export function checkBackup(now = Date.now()): boolean {
  const st = store.get();
  if (!st) return false;
  if (now - snoozedUntil() < 0) return false;      // 还在"稍后"期
  const started = st.createdAt ?? now;
  if (now - started < MIN_AGE_MS) return false;    // 新号不烦
  const last = st.lastExportAt ?? 0;
  if (last && now - last < REMIND_AFTER_MS) {
    hidePill();
    return false;
  }
  showPill(last ? Math.floor((now - last) / 86_400_000) : null);
  return true;
}

/** 启动：进游戏先看一次，之后每天看一次（放着不管的长会话也能提醒到） */
export function startBackupWatch(): void {
  window.setTimeout(() => checkBackup(), 1200);
  window.setInterval(() => checkBackup(), 24 * 60 * 60 * 1000);
}
