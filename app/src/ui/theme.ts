/**
 * 主题（深青 / 浅色）
 *
 * 三个设计决定：
 *  1. **主题不进存档**，单独存在 localStorage 的另一个 key 里。
 *     它是"这台设备上的偏好"，不是游戏进度：进存档会带来两个坏处——
 *     换设备时被同步过去（手机想浅色、电脑想深色就不行了），
 *     而且每次改主题都要写档 + 改存档结构。
 *  2. 默认**跟随系统**（`prefers-color-scheme`），并且只有用户手动切过之后才固定。
 *  3. 首屏不能闪：真正落地主题的代码写在 `index.html` 的 <head> 内联脚本里，
 *     在 CSS 生效之前就把 data-theme 挂到 <html> 上。这里的 init() 只负责
 *     接管后续（系统主题变化、用户点击）。
 */

export type Theme = 'dark' | 'light';

const KEY = 'ff14idle.theme';

/** 读取当前生效的主题（以 DOM 上的实际值为准，避免和首屏脚本不一致） */
export function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

/** 用户手动选过吗（没选过就一直跟随系统） */
export function hasStoredChoice(): boolean {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'dark' || v === 'light';
  } catch {
    return false;
  }
}

/** 系统当前偏好 */
export function systemTheme(): Theme {
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

/** 应用主题：改 DOM、同步浏览器地址栏颜色、（可选）记住选择 */
export function applyTheme(theme: Theme, persist = false): void {
  document.documentElement.dataset.theme = theme;
  // 手机浏览器的地址栏 / 状态栏跟着走，不然浅色页面配深色地址栏会很割裂
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'light' ? '#eef4f3' : '#071316');
  if (persist) {
    try {
      localStorage.setItem(KEY, theme);
    } catch {
      // 无痕模式下写不进去，无所谓：下次还是跟随系统
    }
  }
}

/** 切换并记住 */
export function toggleTheme(): Theme {
  const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark';
  applyTheme(next, true);
  return next;
}

export function themeLabel(): string {
  return currentTheme() === 'dark' ? '深色 · 点击切换浅色' : '浅色 · 点击切换深色';
}

/**
 * 启动：
 *  · 首次访问时跟随系统；
 *  · 用户没手动选过的话，系统主题变了要跟着变；
 *  · 换设备同步不了也无所谓——本来就是设备偏好。
 */
export function initTheme(): void {
  applyTheme(currentTheme());
  if (!hasStoredChoice()) {
    const mq = window.matchMedia?.('(prefers-color-scheme: light)');
    mq?.addEventListener?.('change', () => applyTheme(systemTheme()));
  }
}
