/**
 * 极简状态容器 + 1Hz tick
 *
 * 依据 `08-wow-idle-architecture.md` §10.1 第 14 条：
 * 「1 Hz tick 只改进度条，不重绘」——放置游戏 UI 性能的关键。
 * 所以这里 tick 只通知「需要刷新进度」的订阅者，而不是整体重绘。
 */
import type { GameState } from '../types';

type Listener = (state: GameState) => void;

export class Store {
  private state: GameState | null = null;
  private listeners = new Set<Listener>();
  private tickListeners = new Set<() => void>();
  private timer: number | null = null;

  get(): GameState | null {
    return this.state;
  }

  require(): GameState {
    if (!this.state) throw new Error('state not initialized');
    return this.state;
  }

  set(state: GameState | null): void {
    this.state = state;
  }

  subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  onTick(fn: () => void): () => void {
    this.tickListeners.add(fn);
    return () => this.tickListeners.delete(fn);
  }

  /** 状态变化 → 整体重绘 */
  notify(): void {
    if (!this.state) return;
    for (const l of this.listeners) l(this.state);
  }

  /** 仅进度条：轻量刷新 */
  tick(): void {
    for (const l of this.tickListeners) l();
  }

  startClock(): void {
    if (this.timer !== null) return;
    this.timer = window.setInterval(() => this.tick(), 1000);
  }

  stopClock(): void {
    if (this.timer !== null) {
      window.clearInterval(this.timer);
      this.timer = null;
    }
  }
}

export const store = new Store();
