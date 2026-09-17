/**
 * 版本与「自动发现新版本」
 *
 * 手机场景下这是必需品：加到主屏之后没有地址栏、没有刷新按钮，
 * 玩家不可能自己去做"强刷清缓存"。所以页面必须能自己发现服务器上已经
 * 有一份更新的构建，并把刷新按钮递到手上。
 *
 * 机制很简单：构建时产出 `version.json`（含本次构建的 build 戳）。
 * 页面启动后、以及每次从后台切回前台时，带时间戳去取它（绕开 HTTP 缓存），
 * 发现和自己不是同一次构建就弹一个常驻的小按钮。
 */

export const APP_VERSION = __APP_VERSION__;
export const APP_BUILD = __APP_BUILD__;
export const APP_BUILT_AT = __APP_BUILT_AT__;
export const APP_COMMIT = __APP_COMMIT__;

/** 页脚用的一行版本说明，例如 `v0.1.0 · 2026-09-16 12:34 · a1b2c3d` */
export function versionLabel(): string {
  const parts = [`v${APP_VERSION}`, APP_BUILT_AT];
  if (APP_COMMIT) parts.push(APP_COMMIT);
  return parts.join(' · ');
}

/** 部署过的站点上才有「单文件版」可下载；本地 dev / preview / file:// 下不显示死链 */
export function singleFileUrl(): string | null {
  if (!/^https?:$/.test(location.protocol)) return null;
  const host = location.hostname;
  if (host === 'localhost' || host === '127.0.0.1' || host === '[::1]') return null;
  return './ff14-idle-single.html';
}

const CHECK_INTERVAL_MS = 10 * 60 * 1000;

let pill: HTMLButtonElement | null = null;

function showUpdatePill(serverBuild: string): void {
  if (pill) return; // 已经提示过了
  pill = document.createElement('button');
  pill.type = 'button';
  pill.className = 'update-pill';
  pill.dataset.serverBuild = serverBuild;
  pill.innerHTML =
    '<span class="update-pill-dot"></span>有新版本，点这里更新' +
    `<small>本机 ${APP_BUILD} → 线上 ${serverBuild}</small>`;
  pill.addEventListener('click', () => {
    // 关键：带上时间戳跳转。直接 location.reload() 有可能拿到 Pages 缓存里的旧 HTML，
    // 于是"点了没反应"。换一个 URL 才能保证重新拉一次文档。
    const url = new URL(location.href);
    url.searchParams.set('u', Date.now().toString(36));
    location.replace(url.toString());
  });
  document.body.appendChild(pill);
}

async function checkOnce(): Promise<void> {
  try {
    const res = await fetch(`./version.json?t=${Date.now().toString(36)}`, { cache: 'no-store' });
    if (!res.ok) return;
    const info = (await res.json()) as { build?: string };
    if (info.build && info.build !== APP_BUILD) showUpdatePill(info.build);
  } catch {
    // 离线、被墙、或者产物里没有 version.json（比如单文件版）——都不该打扰玩家
  }
}

/** 启动新版本探测；只对 http(s) 生效 */
export function startUpdateWatch(): void {
  if (!/^https?:$/.test(location.protocol)) return;
  void checkOnce();
  window.setInterval(() => void checkOnce(), CHECK_INTERVAL_MS);
  // 手机上的真实使用方式是"切出去、过一会儿再切回来"，所以回到前台时必须查一次
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') void checkOnce();
  });
}
