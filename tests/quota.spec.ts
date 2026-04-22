/**
 * storage/quota.ts 契约（仅覆盖 fallback 路径——jsdom 没有 navigator.storage.estimate）
 */

import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { formatBytes, getStorageStat, QUOTA_WARN_THRESHOLD } from '../src/storage/quota'

function resetStorage() {
  localStorage.clear()
}
beforeEach(() => resetStorage())
afterEach(() => resetStorage())

describe('formatBytes', () => {
  it('< 1KB 用 B', () => {
    expect(formatBytes(0)).toBe('0 B')
    expect(formatBytes(500)).toBe('500 B')
  })
  it('KB / MB / GB 分段', () => {
    expect(formatBytes(2048)).toBe('2.0 KB')
    expect(formatBytes(5 * 1024 * 1024)).toBe('5.0 MB')
    expect(formatBytes(2 * 1024 * 1024 * 1024)).toBe('2.0 GB')
  })
})

describe('getStorageStat · fallback 到 LS', () => {
  it('空 localStorage → used 0, warn false', async () => {
    const s = await getStorageStat()
    expect(s.used).toBe(0)
    expect(s.warn).toBe(false)
    expect(s.quota).toBeGreaterThan(0)
  })

  it('只计 `wechat-typeset:*` 前缀 key', async () => {
    localStorage.setItem('unrelated', 'x'.repeat(1000))
    localStorage.setItem('wechat-typeset:a', 'x'.repeat(1000))
    const s = await getStorageStat()
    // 只 wechat-typeset:a 的 key+value 算进去
    expect(s.used).toBeGreaterThan(0)
    expect(s.used).toBeLessThan(5 * 1024) // 绝不会包含 unrelated
  })

  it('超过 80% 时 warn true', async () => {
    // 填到 ~4.2MB（上限 5MB），pct > 0.8
    // UTF-16 双字节：存 ~2.1M 字符即可
    const big = 'x'.repeat(2_100_000)
    localStorage.setItem('wechat-typeset:huge', big)
    const s = await getStorageStat()
    expect(s.pct).toBeGreaterThanOrEqual(QUOTA_WARN_THRESHOLD)
    expect(s.warn).toBe(true)
  })
})
