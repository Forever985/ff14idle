/**
 * 构建期注入的常量（值来自 vite.version.ts / vite.config.ts 的 `define`）。
 *
 * 声明放这里而不是塞进 types.ts：这些不是游戏数据模型，而是"这次构建是谁"的元信息。
 */
declare const __APP_VERSION__: string;
declare const __APP_BUILD__: string;
declare const __APP_BUILT_AT__: string;
declare const __APP_COMMIT__: string;
