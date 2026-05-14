/**
 * 测试环境 setup：为 Node 25+ 提供可用的 localStorage。
 *
 * 背景：Node 24 起内置 `--webstorage`（默认开），暴露 globalThis.localStorage，
 * 但未配合 `--localstorage-file` 时只是个退化对象，没有 clear / setItem / getItem。
 * 此时 vitest 的 jsdom 环境虽然自己维护了 Storage 实例，但 Node 的原生 global
 * 优先生效，test 里 `localStorage.xxx` 调到的是 Node 退化版。
 *
 * 解决：在 setup 阶段把 globalThis.localStorage 强制覆盖为本地实现。
 * 简单、零依赖、行为与浏览器一致，足够覆盖 drafts 存储的全部用法。
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
import { __resetForTest as resetAppState } from '../src/app/state'

afterEach(() => {
  storage.clear()
  resetAppState()
})
