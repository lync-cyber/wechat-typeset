/**
 * 测试环境 setup：为所有 spec 提供可用的 localStorage。
 *
 * 背景：Node 24 起内置 `--webstorage`（默认开），暴露 globalThis.localStorage，
 * 但未配合 `--localstorage-file` 时只是个退化对象，没有 clear / setItem / getItem。
 * jsdom 环境虽自带 Storage，但 Node 的原生 global 优先；node 环境则直接缺
 * setItem。两种情况下都强制覆盖为本地实现，保证 drafts / theme-id 读写一致。
 *
 * 因为这层 shim 同时撑住了 node + jsdom 两种 environment，凡是只用
 * localStorage（不直接调 document/window/HTMLElement）的 spec 都能落在 node 上
 * 跑——vite.config.ts 的 environmentMatchGlobs 据此把绝大多数 spec 留在 node。
 */

class InMemoryStorage implements Storage {
  private store = new Map<string, string>()
  get length(): number {
    return this.store.size
  }
  clear(): void {
    this.store.clear()
  }
  getItem(key: string): string | null {
    return this.store.has(key) ? (this.store.get(key) as string) : null
  }
  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null
  }
  removeItem(key: string): void {
    this.store.delete(key)
  }
  setItem(key: string, value: string): void {
    this.store.set(key, String(value))
  }
}

// 同时装给 globalThis 和 jsdom 的 window（两处都被测试代码索引过）
const storage = new InMemoryStorage()
Object.defineProperty(globalThis, 'localStorage', {
  value: storage,
  configurable: true,
  writable: true,
})
if (typeof window !== 'undefined' && window !== (globalThis as unknown as Window)) {
  Object.defineProperty(window, 'localStorage', {
    value: storage,
    configurable: true,
    writable: true,
  })
}

/**
 * 全局 afterEach：
 *   1. localStorage.clear()——drafts / theme-id 等 spec 间不串台
 *   2. state.__resetForTest()——src/app/state.ts 是模块单例，跨 spec 共享同一份 ref
 *
 * 任何不需要 reset 的 spec 也不会受影响（reset 是 idempotent）。这两条全局守护让
 * 新增的 app/composable spec 不需要自己写 beforeEach/afterEach 样板，写测试时只
 * 关心被测代码本身。
 */
import { afterEach } from 'vitest'
import { __resetForTest as resetAppState } from '../src/ui/state/store'

afterEach(() => {
  storage.clear()
  resetAppState()
})
