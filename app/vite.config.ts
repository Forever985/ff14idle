import { defineConfig } from 'vite';
import { readAppVersion, versionDefine, versionFilePlugin } from './vite.version';

const appVersion = readAppVersion();

export default defineConfig({
  // 相对路径：这样同一份产物放在
  //   https://<user>.github.io/<repo>/
  // 或者根域名、或者子目录里都能跑，不需要为 GitHub Pages 改 base。
  base: './',
  define: versionDefine(appVersion),
  plugins: [versionFilePlugin(appVersion)],
  build: {
    target: 'es2022',
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
  },
  server: {
    host: '127.0.0.1',
    port: 5273,
  },
});
