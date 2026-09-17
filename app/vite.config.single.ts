import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { readAppVersion, versionDefine, versionFilePlugin } from './vite.version';

const appVersion = readAppVersion();

/**
 * 单文件构建：产出 `dist-single/index.html`（JS + CSS 全部内联在一个文件里）。
 *
 * 为什么需要它：本项目源码用原生 ES Module，浏览器在 `file://` 协议下会以 CORS 为由
 * 拒绝加载**外部**模块脚本，所以普通的 dist 必须起服务器才能玩。
 * 这里把格式改成 **IIFE（传统脚本，非 module）** 并内联所有资源，
 * 于是 `file://` 下双击即可运行。
 *
 * 用法：npm run build:single
 */
export default defineConfig({
  base: './',
  define: versionDefine(appVersion),
  plugins: [viteSingleFile(), versionFilePlugin(appVersion)],
  build: {
    target: 'es2019',
    outDir: 'dist-single',
    emptyOutDir: true,
    cssCodeSplit: false,
    assetsInlineLimit: 100_000_000,
    sourcemap: false,
    rollupOptions: {
      output: {
        format: 'iife',
        inlineDynamicImports: true,
      },
    },
  },
});
