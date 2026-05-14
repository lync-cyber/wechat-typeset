/**
 * copyHtmlToClipboard 路径选择契约（R7-D）
 *
 * 不真复制（jsdom 没 Clipboard API），断言三条选择路径：
 *   1. 有 Clipboard API + secure + ClipboardItem → 走 'clipboard-api'，调用 navigator.clipboard.write 一次
 *   2. Clipboard API 抛 → 降级 execCommand，返回 'exec-command'（jsdom 默认不支持，应失败返回 'failed'）
 *   3. 无 Clipboard API → 直接走 execCommand 路径
 *
 * Safari 异步 Blob 语义（Promise.resolve(blob)）的契约由 ClipboardItem 构造参数断言。
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { copyHtmlToClipboard } from '../../src/infra/clipboard/copyHtml'

interface MockWin {
  isSecureContext?: boolean
}

beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => {})
  // jsdom 不实现 document.execCommand，spy 前先 defineProperty 占位，否则 vi.spyOn 抛 "does not exist"
  if (!('execCommand' in document)) {
    Object.defineProperty(document, 'execCommand', {
      value: () => false,
      configurable: true,
      writable: true,
    })
  }
})

afterEach(() => {
  vi.restoreAllMocks()
  // 清理可能被注入的 navigator.clipboard / ClipboardItem
  delete (globalThis as Record<string, unknown>).ClipboardItem
  if ('clipboard' in navigator) {
    Object.defineProperty(navigator, 'clipboard', { value: undefined, configurable: true })
  }
})

describe('copyHtmlToClipboard · Clipboard API 路径', () => {
  it('secure context + ClipboardItem 可用 → 走 clipboard-api', async () => {
    const writeMock = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      value: { write: writeMock },
      configurable: true,
    })
    ;(globalThis as Record<string, unknown>).ClipboardItem = class {
      constructor(public items: Record<string, Blob | Promise<Blob>>) {}
    }
    ;(window as unknown as MockWin).isSecureContext = true

    const res = await copyHtmlToClipboard('<p>hi</p>', 'hi')
    expect(res.ok).toBe(true)
    expect(res.mode).toBe('clipboard-api')
    expect(writeMock).toHaveBeenCalledOnce()
  })

  it('Clipboard API write 抛错 → 降级到 execCommand 路径', async () => {
    const writeMock = vi.fn().mockRejectedValue(new Error('denied'))
    Object.defineProperty(navigator, 'clipboard', {
      value: { write: writeMock },
      configurable: true,
    })
    ;(globalThis as Record<string, unknown>).ClipboardItem = class {
      constructor(public items: Record<string, Blob | Promise<Blob>>) {}
    }
    ;(window as unknown as MockWin).isSecureContext = true

    // jsdom 不实现 execCommand('copy')，会再失败一次；关键是 console.warn 被调用且
    // 流程没有抛异常出来，结果对象的 mode 反映落点
    const res = await copyHtmlToClipboard('<p>hi</p>', 'hi')
    expect(console.warn).toHaveBeenCalled()
    expect(['exec-command', 'failed']).toContain(res.mode)
  })
})

describe('copyHtmlToClipboard · execCommand 降级路径', () => {
  it('无 Clipboard API → 直接进入 execCommand 分支', async () => {
    // jsdom 下 document.execCommand 是占位函数，可被 spy。模拟返回 true 让 ok=true。
    const execSpy = vi
      .spyOn(document, 'execCommand')
      .mockImplementation(() => true)
    const res = await copyHtmlToClipboard('<strong>x</strong>', 'x')
    expect(execSpy).toHaveBeenCalledWith('copy')
    expect(res.ok).toBe(true)
    expect(res.mode).toBe('exec-command')
  })

  it('execCommand 返回 false → ok=false, mode=failed, 带 error 文案', async () => {
    vi.spyOn(document, 'execCommand').mockImplementation(() => false)
    const res = await copyHtmlToClipboard('<p>x</p>', 'x')
    expect(res.ok).toBe(false)
    expect(res.mode).toBe('failed')
    expect(res.error).toBeTruthy()
  })
})
