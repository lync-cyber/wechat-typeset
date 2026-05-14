/**
 * _kv 写入失败感知契约（R7-B）
 *
 * safeWrite / safeWriteJson 在 QuotaExceededError / 隐私模式 / 循环引用时返回 false
 * 并 console.warn。让上层 hot path（flushDraftSave）能向 UI 上抛"草稿写盘失败"。
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { safeRead, safeReadJson, safeRemove, safeWrite, safeWriteJson } from '../../src/infra/storage/_kv'

const originalSetItem = localStorage.setItem.bind(localStorage)

beforeEach(() => {
  localStorage.clear()
  // 静默 console.warn——_kv 测试本身要验证 warn 被调用，但其他 spec 也间接调
  // safeWrite（drafts.spec / outlinkDegrade etc），不能让 warn 污染全局 stdout。
  vi.spyOn(console, 'warn').mockImplementation(() => {})
})

afterEach(() => {
  vi.restoreAllMocks()
  // 恢复 setItem，避免上一个测试的 mock 影响下一个
  Object.defineProperty(localStorage, 'setItem', { value: originalSetItem, configurable: true })
})

function simulateQuotaExceeded() {
  Object.defineProperty(localStorage, 'setItem', {
    value: () => {
      const err = new Error('QuotaExceededError') as Error & { name: string }
      err.name = 'QuotaExceededError'
      throw err
    },
    configurable: true,
  })
}

describe('safeWrite', () => {
  it('成功写入返回 true，并能被 safeRead 读出', () => {
    expect(safeWrite('k1', 'v1')).toBe(true)
    expect(safeRead('k1')).toBe('v1')
  })

  it('QuotaExceededError 返回 false 并触发 console.warn', () => {
    simulateQuotaExceeded()
    expect(safeWrite('k2', 'v2')).toBe(false)
    expect(console.warn).toHaveBeenCalledOnce()
    // warn 文案带 key 便于诊断
    const callArgs = (console.warn as ReturnType<typeof vi.fn>).mock.calls[0]
    expect(String(callArgs[0])).toContain('k2')
  })
})

describe('safeWriteJson', () => {
  it('成功写入返回 true，并能被 safeReadJson 还原', () => {
    expect(safeWriteJson('k3', { a: 1, b: [2, 3] })).toBe(true)
    expect(safeReadJson('k3', null)).toEqual({ a: 1, b: [2, 3] })
  })

  it('循环引用导致 stringify 抛出 → 返回 false 并 warn', () => {
    const obj: Record<string, unknown> = { a: 1 }
    obj.self = obj
    expect(safeWriteJson('k4', obj)).toBe(false)
    expect(console.warn).toHaveBeenCalledOnce()
  })

  it('quota 失败时同样返回 false（即使 stringify 成功）', () => {
    simulateQuotaExceeded()
    expect(safeWriteJson('k5', { a: 1 })).toBe(false)
    // safeWriteJson → safeWrite 各 warn 一次；至少 1 次
    expect(console.warn).toHaveBeenCalled()
  })
})

describe('safeRemove', () => {
  it('正常删除不抛、不返回值', () => {
    safeWrite('k6', 'v6')
    expect(safeRead('k6')).toBe('v6')
    expect(() => safeRemove('k6')).not.toThrow()
    expect(safeRead('k6')).toBeNull()
  })
})
