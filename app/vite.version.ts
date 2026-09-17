/**
 * 构建期版本信息（被 vite.config.ts 与 vite.config.single.ts 共用）
 *
 * 为什么要有版本号：
 *  1. 手机上加到主屏之后，你没法像桌面那样「按 F5 强刷」。页面上必须能看见
 *     「我现在跑的是哪一版」，否则"更新了没生效"会变成一个查不出来的问题。
 *  2. 部署后浏览器 / GitHub Pages 都有缓存，`version.json` 让页面能主动发现
 *     "服务器上已经有一份更新的构建"，然后提示玩家刷新。
 *  3. 出 bug 时截图里带着版本号，看一眼就知道是哪次构建。
 *
 * 这里同时被两个 vite 配置引用，所以写成独立文件，避免两边各抄一份。
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Plugin } from 'vite';

const here = dirname(fileURLToPath(import.meta.url));

export interface AppVersion {
  /** package.json 里的语义化版本，例如 0.1.0 */
  version: string;
  /** 构建时间戳（本地时间，分钟精度），同时充当「变了没有」的判定依据 */
  build: string;
  /** 便于人看的构建时间 */
  builtAt: string;
  /** git 短哈希，没装 git 或不在仓库里时为空串 */
  commit: string;
}

function gitShortHash(): string {
  try {
    // 必须带 safe.directory：仓库属主和当前用户不一致时（目录由管理员创建就会这样），
    // git 会以 `detected dubious ownership` 拒绝执行，于是这里静默拿到空字符串，
    // 页脚就少了一段提交号 —— 不报错，但信息没了。
    return execFileSync('git', ['-c', 'safe.directory=*', 'rev-parse', '--short', 'HEAD'], {
      cwd: here,
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim();
  } catch {
    // 没装 git / 还不是仓库 / 沙箱里没有 git —— 都只是少一个信息，不该让构建失败。
    // 注意：**第一次发布**时这里一定是空的，因为构建发生在 git init 之前。
    return '';
  }
}

export function readAppVersion(): AppVersion {
  const pkg = JSON.parse(readFileSync(resolve(here, 'package.json'), 'utf8')) as { version?: string };
  const now = new Date();
  const p = (n: number) => String(n).padStart(2, '0');
  const stamp =
    `${now.getFullYear()}${p(now.getMonth() + 1)}${p(now.getDate())}` +
    `-${p(now.getHours())}${p(now.getMinutes())}`;
  return {
    version: pkg.version ?? '0.0.0',
    build: stamp,
    builtAt: `${now.getFullYear()}-${p(now.getMonth() + 1)}-${p(now.getDate())} ${p(now.getHours())}:${p(now.getMinutes())}`,
    commit: gitShortHash(),
  };
}

/** 注入到源码里的编译期常量 */
export function versionDefine(v: AppVersion): Record<string, string> {
  return {
    __APP_VERSION__: JSON.stringify(v.version),
    __APP_BUILD__: JSON.stringify(v.build),
    __APP_BUILT_AT__: JSON.stringify(v.builtAt),
    __APP_COMMIT__: JSON.stringify(v.commit),
  };
}

/**
 * 把 `version.json` 写进构建产物。
 * 页面启动后会去取它（带时间戳绕开缓存），发现和自己是两次构建就提示更新。
 */
export function versionFilePlugin(v: AppVersion): Plugin {
  let outDir = 'dist';
  return {
    name: 'ff14idle:version-file',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    writeBundle() {
      writeFileSync(
        resolve(outDir, 'version.json'),
        JSON.stringify({ ...v, single: 'ff14-idle-single.html' }, null, 2) + '\n',
        'utf8',
      );
    },
  };
}
