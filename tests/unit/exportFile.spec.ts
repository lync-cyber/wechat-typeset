/**
 * exportFile 三函数契约（R7-D）
 *
 * downloadBlob / exportHtml / exportMd 不真下载（jsdom 没有 download trigger），
 * 断言：
 *   - 调用一次 createObjectURL + revokeObjectURL（保证 URL 不漏）
 *   - <a> 节点出现在 body 内被点击后又被移除（不污染 DOM）
 *   - exportHtml 包了 wrapper，含 <title>、background 色、escape 后的特殊字符
 *
 * exportImage 走 html2canvas 动态 import；不在这里测（依赖懒载、需要 mock import）。
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  downloadBlob,
  escapeHtml,
  exportHtml,
  exportMd,
} from '../../src/infra/exporters/exportFile'

let createObjectURLSpy: ReturnType<typeof vi.fn>
let revokeObjectURLSpy: ReturnType<typeof vi.fn>
let clickSpy: ReturnType<typeof vi.fn>

beforeEach(() => {
  createObjectURLSpy = vi.fn(() => 'blob:fake')
  revokeObjectURLSpy = vi.fn()
  Object.defineProperty(URL, 'createObjectURL', {
    value: createObjectURLSpy,
    configurable: true,
  })
  Object.defineProperty(URL, 'revokeObjectURL', {
    value: revokeObjectURLSpy,
    configurable: true,
  })
  // <a>.click 在 jsdom 下是 noop；spy 一下保证不抛
  clickSpy = vi.fn()
  vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(clickSpy)
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('downloadBlob', () => {
  it('创建 + 撤销 URL 各一次；<a> 添加后移除', () => {
    const before = document.body.childElementCount
    downloadBlob('a.txt', 'hello', 'text/plain')
    expect(createObjectURLSpy).toHaveBeenCalledOnce()
    expect(revokeObjectURLSpy).toHaveBeenCalledWith('blob:fake')
    expect(clickSpy).toHaveBeenCalledOnce()
    expect(document.body.childElementCount).toBe(before)
  })
})

describe('exportHtml', () => {
  it('wrapper 含 background / color / wrap div / title', () => {
    let blobBody = ''
    createObjectURLSpy.mockImplementation((blob: Blob) => {
      // jsdom 的 Blob 不支持 text() 同步读；用 FileReader 不现实，所以这里改造 spy
      // 让它把第一个 Blob 实例的 text-content（通过自带 Blob 构造时传入的部分）拼回。
      // 直接借助 Blob.text() 同步等效：拿 Blob 的部分 chunk。jsdom 的 Blob 在内部存
      // 字符串数组，text() 是异步——我们改用 prototype patch。
      void blob
      return 'blob:fake'
    })
    // 单独 patch Blob 收集 chunks
    const origBlob = globalThis.Blob
    let captured = ''
    ;(globalThis as Record<string, unknown>).Blob = class extends origBlob {
      constructor(parts: BlobPart[], opts?: BlobPropertyBag) {
        super(parts, opts)
        captured = parts.map((p) => String(p)).join('')
      }
    }
    try {
      exportHtml('demo.html', '<p>正文 &</p>', { background: '#abc', color: '#123' })
    } finally {
      ;(globalThis as Record<string, unknown>).Blob = origBlob
    }
    expect(captured).toContain('background:#abc')
    expect(captured).toContain('color:#123')
    expect(captured).toContain('<title>demo</title>')
    expect(captured).toContain('wechat-typeset-wrap')
    expect(blobBody).toBe('') // 占位避免未使用
  })

  it('background / color 缺省时回落默认 #ffffff / #222222', () => {
    let captured = ''
    const origBlob = globalThis.Blob
    ;(globalThis as Record<string, unknown>).Blob = class extends origBlob {
      constructor(parts: BlobPart[], opts?: BlobPropertyBag) {
        super(parts, opts)
        captured = parts.map((p) => String(p)).join('')
      }
    }
    try {
      exportHtml('x.html', '<p>x</p>')
    } finally {
      ;(globalThis as Record<string, unknown>).Blob = origBlob
    }
    expect(captured).toContain('background:#ffffff')
    expect(captured).toContain('color:#222222')
  })
})

describe('exportMd', () => {
  it('原样写盘，不做二次序列化', () => {
    let captured = ''
    const origBlob = globalThis.Blob
    ;(globalThis as Record<string, unknown>).Blob = class extends origBlob {
      constructor(parts: BlobPart[], opts?: BlobPropertyBag) {
        super(parts, opts)
        captured = parts.map((p) => String(p)).join('')
      }
    }
    try {
      exportMd('a.md', '# 标题\n正文 <带特殊字符>')
    } finally {
      ;(globalThis as Record<string, unknown>).Blob = origBlob
    }
    expect(captured).toBe('# 标题\n正文 <带特殊字符>')
  })
})

describe('escapeHtml', () => {
  it('& < > " 四种字符正确转义', () => {
    expect(escapeHtml('a & b < c > d "x"')).toBe('a &amp; b &lt; c &gt; d &quot;x&quot;')
  })
})
