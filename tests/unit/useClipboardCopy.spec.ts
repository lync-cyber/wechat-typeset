/**
 * useClipboardCopy 关键路径契约（R7-D）
 *
 * 覆盖：
 *   - outlinkStrategy 持久化往返
 *   - handleCopy：成功路径 pingTransient + persistentError=null；失败路径设 persistentError
 *   - handleCopyShareLink：写 clipboard.writeText
 *   - tryLoadShareFromHash：识别 #share=…，落新草稿并清 hash
 *
 * copyHtmlToClipboard 走的是 infra/clipboard/copyHtml.ts；这里把它通过 vi.mock
 * 截掉，避免 jsdom 真去碰 navigator.clipboard。
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createApp, defineComponent, h, ref } from 'vue'
import { useClipboardCopy } from '../../src/ui/composables/useClipboardCopy'
import { listDrafts } from '../../src/infra/storage/drafts'

vi.mock('../../src/infra/clipboard/copyHtml', () => ({
  copyHtmlToClipboard: vi.fn(async () => ({ ok: true, mode: 'clipboard-api' })),
}))
import { copyHtmlToClipboard } from '../../src/infra/clipboard/copyHtml'

function mountCopy() {
  const md = ref<string>('# 标题\n正文')
  const rendered = ref({
    html: '<p>x <a href="https://example.com">link</a></p>',
    wordCount: 2,
    readingTime: 1,
    patchLog: { entries: [], total: 0 },
    pageConfig: {},
    frontmatterIssues: [],
  })
  const flush = vi.fn()
  const baseThemeId = ref<string>('default')
  const activeDraftId = ref<string | null>(null)
  const draftIndexTick = ref(0)
  const pingTransient = vi.fn()
  let api: ReturnType<typeof useClipboardCopy> | null = null
  const Comp = defineComponent({
    setup() {
      api = useClipboardCopy({
        md, rendered, flush, baseThemeId, activeDraftId, draftIndexTick, pingTransient,
      })
      return () => h('div')
    },
  })
  const app = createApp(Comp)
  app.mount(document.createElement('div'))
  return { md, rendered, flush, baseThemeId, draftIndexTick, pingTransient, api: api!, unmount: () => app.unmount() }
}

let h_: ReturnType<typeof mountCopy> | null = null
beforeEach(() => {
  vi.mocked(copyHtmlToClipboard).mockClear()
  h_ = mountCopy()
})
afterEach(() => {
  h_?.unmount()
  h_ = null
  vi.restoreAllMocks()
  // 注入的 navigator.clipboard 在 spec 间清理
  if ('clipboard' in navigator) {
    Object.defineProperty(navigator, 'clipboard', { value: undefined, configurable: true })
  }
})

describe('outlinkStrategy 持久化', () => {
  it('setOutlinkStrategy → localStorage 写入', () => {
    h_!.api.setOutlinkStrategy('tail-list')
    expect(h_!.api.outlinkStrategy.value).toBe('tail-list')
    expect(localStorage.getItem('wechat-typeset:outlink-strategy')).toBe('tail-list')
  })
})

describe('handleCopy', () => {
  it('成功 → flush 调用 / pingTransient "已复制" / persistentError 清', async () => {
    await h_!.api.handleCopy()
    expect(h_!.flush).toHaveBeenCalledOnce()
    expect(h_!.pingTransient).toHaveBeenCalled()
    expect(h_!.api.persistentError.value).toBeNull()
    const msg = h_!.pingTransient.mock.calls[0][0] as string
    expect(msg).toContain('已复制')
  })

  it('失败 → 设 persistentError，不 ping', async () => {
    vi.mocked(copyHtmlToClipboard).mockResolvedValueOnce({ ok: false, mode: 'failed', error: 'denied' })
    await h_!.api.handleCopy()
    expect(h_!.api.persistentError.value).toContain('复制失败')
    expect(h_!.pingTransient).not.toHaveBeenCalled()
  })

  it('tail-list 策略且 rendered.html 有外链 → 文案带 "外链已尾注"', async () => {
    h_!.api.setOutlinkStrategy('tail-list')
    await h_!.api.handleCopy()
    const msg = h_!.pingTransient.mock.calls[0][0] as string
    expect(msg).toContain('外链已尾注')
  })

  it('预览与剪贴板共用含尾注和微信组件提示的同一份 HTML', async () => {
    h_!.rendered.value.html += '<section data-wx-mp-kind="voice" data-wx-mp-name="声音" data-wx-mp-fileid="abc">声音</section>'
    h_!.api.setOutlinkStrategy('tail-list')
    const preview = h_!.api.rendered.value.html
    expect(preview).toContain('https://example.com')
    expect(preview).toContain('<!-- mpvoice')
    expect(preview).not.toBe(h_!.rendered.value.html)
    await h_!.api.handleCopy()
    expect(copyHtmlToClipboard).toHaveBeenCalledWith(preview, h_!.md.value)
  })

  it('等待图片解析和最新渲染完成再复制', async () => {
    let finish!: () => void
    h_!.flush.mockImplementationOnce(() => new Promise<void>((resolve) => { finish = resolve }))
    const copying = h_!.api.handleCopy()
    expect(copyHtmlToClipboard).not.toHaveBeenCalled()
    h_!.rendered.value.html = '<p>最新内容</p><img src="data:image/webp;base64,AAAA">'
    finish()
    await copying
    expect(copyHtmlToClipboard).toHaveBeenCalledWith(h_!.api.rendered.value.html, h_!.md.value)
    expect(vi.mocked(copyHtmlToClipboard).mock.calls[0][0]).toContain('data:image/webp')
  })

  it('异步解析失败时提示错误，不复制旧 HTML', async () => {
    h_!.flush.mockRejectedValueOnce(new Error('图片读取失败'))
    await h_!.api.handleCopy()
    expect(copyHtmlToClipboard).not.toHaveBeenCalled()
    expect(h_!.api.persistentError.value).toContain('图片读取失败')
  })
})

describe('handleCopyShareLink', () => {
  it('调 navigator.clipboard.writeText + ping', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    })
    await h_!.api.handleCopyShareLink()
    expect(writeText).toHaveBeenCalledOnce()
    const url = writeText.mock.calls[0][0] as string
    expect(url).toContain('#share=')
    expect(h_!.pingTransient).toHaveBeenCalled()
  })
})

describe('tryLoadShareFromHash', () => {
  it('无 hash → 返回 false', () => {
    location.hash = ''
    const cb = vi.fn()
    expect(h_!.api.tryLoadShareFromHash(cb)).toBe(false)
    expect(cb).not.toHaveBeenCalled()
  })

  it('有有效 #share= → 创建草稿、调回调、清 hash、bump tick', async () => {
    // 借助 buildShareUrl 构造一段合法 hash
    const { buildShareUrl } = await import('../../src/infra/share/shareLink')
    const url = buildShareUrl({ v: 1, md: '# 来自分享\n正文', themeId: 'tech-geek' })
    const idx = url.indexOf('#')
    location.hash = url.slice(idx)
    const beforeTick = h_!.draftIndexTick.value
    const cb = vi.fn()
    const ok = h_!.api.tryLoadShareFromHash(cb)
    expect(ok).toBe(true)
    expect(cb).toHaveBeenCalledOnce()
    const callArgs = cb.mock.calls[0]
    expect(callArgs[1]).toContain('来自分享')
    expect(callArgs[2]).toBe('tech-geek')
    expect(listDrafts().length).toBeGreaterThanOrEqual(1)
    expect(h_!.draftIndexTick.value).toBeGreaterThan(beforeTick)
  })
})
