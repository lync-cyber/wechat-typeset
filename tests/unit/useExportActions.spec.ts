/**
 * useExportActions 三导出契约（R7-D）
 *
 * 重点：isExporting 互斥锁——任一入口在跑时其他入口被静默忽略，避免长图导出
 * 与 HTML/MD 同时触发多次浏览器下载。
 *
 * 真正的 exportHtml / exportMd / exportImage 走 infra/exporters/exportFile；
 * 这里把整模块 mock 掉避免 jsdom 真去触发下载。
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createApp, defineComponent, h, nextTick, ref, watch } from 'vue'
import { useExportActions } from '../../src/ui/composables/useExportActions'
import { themeRegistry } from '../../src/core/themes'
const defaultTheme = themeRegistry.default
import type { RenderOutput } from '../../src/core/pipeline'
import type { Theme } from '../../src/core/themes/types'

vi.mock('../../src/infra/exporters/exportFile', () => ({
  exportHtml: vi.fn(),
  exportMd: vi.fn(),
  exportImage: vi.fn(async () => ({ ok: true })),
}))
import { exportHtml, exportImage, exportMd } from '../../src/infra/exporters/exportFile'

function mountExport() {
  const md = ref<string>('# x')
  const rendered = ref<RenderOutput>({
    html: '<p>x</p>',
    wordCount: 1,
    readingTime: 1,
    patchLog: { entries: [], total: 0 },
    pageConfig: {},
    frontmatterIssues: [],
  })
  const flush = vi.fn()
  const activeTheme = ref<Theme>(defaultTheme)
  const previewBody = document.createElement('div')
  const getPreviewBody = vi.fn<() => HTMLElement | null>(() => previewBody)
  const fileStem = vi.fn(() => 'stem')
  const pingTransient = vi.fn()
  const setPersistentError = vi.fn()
  let api: ReturnType<typeof useExportActions> | null = null
  const Comp = defineComponent({
    setup() {
      api = useExportActions({
        md, rendered, flush, activeTheme, getPreviewBody, fileStem,
        pingTransient, setPersistentError,
      })
      return () => h('div')
    },
  })
  const app = createApp(Comp)
  app.mount(document.createElement('div'))
  return { md, rendered, flush, activeTheme, getPreviewBody, fileStem,
           pingTransient, setPersistentError, api: api!, unmount: () => app.unmount() }
}

let h_: ReturnType<typeof mountExport> | null = null
beforeEach(() => {
  vi.mocked(exportHtml).mockClear()
  vi.mocked(exportMd).mockClear()
  vi.mocked(exportImage).mockClear()
  h_ = mountExport()
})
afterEach(() => {
  h_?.unmount()
  h_ = null
  vi.restoreAllMocks()
})

describe('doExportHtml', () => {
  it('flush + 调 exportHtml + ping 文案 + isExporting 落回', async () => {
    await h_!.api.doExportHtml()
    expect(h_!.flush).toHaveBeenCalledOnce()
    expect(exportHtml).toHaveBeenCalledOnce()
    expect(h_!.pingTransient).toHaveBeenCalledWith('已导出 HTML')
    expect(h_!.api.isExporting.value).toBe(false)
  })

  it('等待本地图片进入最终 HTML 后再导出', async () => {
    let finish!: () => void
    h_!.flush.mockImplementationOnce(() => new Promise<void>((resolve) => { finish = resolve }))
    const exporting = h_!.api.doExportHtml()
    expect(exportHtml).not.toHaveBeenCalled()
    h_!.rendered.value.html = '<img src="data:image/webp;base64,AAAA">'
    finish()
    await exporting
    expect(exportHtml).toHaveBeenCalledWith('stem.html', h_!.rendered.value.html, expect.any(Object))
  })

  it('异步解析失败时停止导出并释放锁', async () => {
    h_!.flush.mockRejectedValueOnce(new Error('图片权限失效'))
    await h_!.api.doExportHtml()
    expect(exportHtml).not.toHaveBeenCalled()
    expect(h_!.setPersistentError).toHaveBeenCalledWith(expect.stringContaining('图片权限失效'))
    expect(h_!.api.isExporting.value).toBe(false)
  })
})

describe('doExportMd', () => {
  it('调 exportMd + ping 文案 + 不 flush（md 是源）', () => {
    h_!.md.value = '# 本地文章\n![](images/local.webp)'
    h_!.api.doExportMd()
    expect(exportMd).toHaveBeenCalledOnce()
    expect(exportMd).toHaveBeenCalledWith('stem.md', '# 本地文章\n![](images/local.webp)')
    expect(h_!.flush).not.toHaveBeenCalled()
    expect(h_!.pingTransient).toHaveBeenCalledWith('已导出 Markdown')
    expect(h_!.api.isExporting.value).toBe(false)
  })
})

describe('doExportImage', () => {
  it('成功 → ping "已导出长图"，错误回调不触发', async () => {
    await h_!.api.doExportImage()
    expect(exportImage).toHaveBeenCalledOnce()
    expect(h_!.pingTransient).toHaveBeenCalledWith('已导出长图')
    expect(h_!.setPersistentError).not.toHaveBeenCalled()
  })

  it('getPreviewBody 返回 null → setPersistentError 被调，exportImage 不调', async () => {
    h_!.getPreviewBody.mockReturnValueOnce(null)
    await h_!.api.doExportImage()
    expect(exportImage).not.toHaveBeenCalled()
    expect(h_!.setPersistentError).toHaveBeenCalledOnce()
    const msg = h_!.setPersistentError.mock.calls[0][0] as string
    expect(msg).toContain('未找到预览节点')
  })

  it('exportImage 返回 ok=false → setPersistentError 带 error 文案', async () => {
    vi.mocked(exportImage).mockResolvedValueOnce({ ok: false, error: 'canvas fail' })
    await h_!.api.doExportImage()
    expect(h_!.setPersistentError).toHaveBeenCalledOnce()
    const msg = h_!.setPersistentError.mock.calls[0][0] as string
    expect(msg).toContain('canvas fail')
  })

  it('长图等待渲染完成和 Vue 更新预览节点', async () => {
    const body = h_!.getPreviewBody()!
    const stop = watch(h_!.rendered, (rendered) => { body.innerHTML = rendered.html })
    h_!.flush.mockImplementationOnce(async () => {
      h_!.rendered.value = { ...h_!.rendered.value, html: '<p>完成图片解析的预览</p>' }
    })
    vi.mocked(exportImage).mockImplementationOnce(async (element) => {
      expect(element.innerHTML).toContain('完成图片解析的预览')
      return { ok: true }
    })
    await h_!.api.doExportImage()
    expect(h_!.flush).toHaveBeenCalledOnce()
    stop()
  })

  it('长图解析失败不调用截图并反馈错误', async () => {
    h_!.flush.mockRejectedValueOnce(new Error('本地图片无法读取'))
    await h_!.api.doExportImage()
    expect(exportImage).not.toHaveBeenCalled()
    expect(h_!.setPersistentError).toHaveBeenCalledWith(expect.stringContaining('本地图片无法读取'))
    expect(h_!.api.isExporting.value).toBe(false)
  })
})

describe('isExporting 互斥锁', () => {
  it('长图正在导 → HTML / MD 入口被静默忽略', async () => {
    // 让 exportImage 等一会儿才返回，模拟"渲染中"
    let resolveImage!: (v: { ok: boolean }) => void
    vi.mocked(exportImage).mockImplementationOnce(
      () => new Promise<{ ok: boolean }>((res) => { resolveImage = res }),
    )
    const imagePromise = h_!.api.doExportImage()
    await nextTick()
    await nextTick()
    expect(h_!.api.isExporting.value).toBe(true)

    await h_!.api.doExportHtml()
    h_!.api.doExportMd()
    expect(exportHtml).not.toHaveBeenCalled()
    expect(exportMd).not.toHaveBeenCalled()

    resolveImage({ ok: true })
    await imagePromise
    expect(h_!.api.isExporting.value).toBe(false)

    // 锁释放后再次调用应成功
    await h_!.api.doExportHtml()
    expect(exportHtml).toHaveBeenCalledOnce()
  })
})
