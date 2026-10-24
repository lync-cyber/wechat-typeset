// @vitest-environment jsdom
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import type { PatchLog, PlatformAdapter } from '../../src/core/pipeline/platforms/types'
import type { WxPatchOptions } from '../../src/core/pipeline/platforms/wechat'
import fixtureData from '../fixtures/wechat-patch-compat.json'

let wechat: typeof import('../../src/core/pipeline/platforms/wechat')
let render: typeof import('../../src/core/pipeline').render
let theme: import('../../src/core/themes/types').Theme
let getPlatform: typeof import('../../src/core/pipeline/platforms/registry').getPlatform
let inline: typeof import('../../src/core/pipeline/juiceInline')
let utils: typeof import('../../src/core/pipeline/platforms/wechat/utils')
let fallback: PlatformAdapter

beforeAll(async () => {
  vi.resetModules()
  wechat = await import('../../src/core/pipeline/platforms/wechat')
  ;({ render } = await import('../../src/core/pipeline'))
  ;({ getPlatform } = await import('../../src/core/pipeline/platforms/registry'))
  theme = (await import('../../src/core/themes')).themeRegistry.default
  inline = await import('../../src/core/pipeline/juiceInline')
  utils = await import('../../src/core/pipeline/platforms/wechat/utils')
  fallback = getPlatform('xhs')
}, 30_000)

afterEach(() => {
  vi.restoreAllMocks()
  delete fallback.inspect
})

function processWechat(html: string, options?: WxPatchOptions) {
  expect(wechat.wechatAdapter.patchWithLog).toBeTypeOf('function')
  return wechat.wechatAdapter.patchWithLog!(html, options)
}

describe('微信共享 DOM 的解析预算', () => {
  it('常规 HTML 的扫描与全部补丁只解析一次', () => {
    const parse = vi.spyOn(DOMParser.prototype, 'parseFromString')
    const result = processWechat('<p id="remove" style="font-family: serif">正文</p>')
    expect(result.html).toBe('<p>正文</p>')
    expect(result.patchLog.total).toBe(2)
    expect(parse).toHaveBeenCalledTimes(1)
  })

  it('独立 applyWxPatches 入口也只解析一次', () => {
    const parse = vi.spyOn(DOMParser.prototype, 'parseFromString')
    expect(wechat.applyWxPatches('<p id="remove">正文</p>')).toBe('<p>正文</p>')
    expect(parse).toHaveBeenCalledTimes(1)
  })

  it.each(['deep-text', 'deep-div', 'deep-four-level', 'deep-multiple-roots'])(
    '%s 仅增加一次兼容解析，并保持原输出和日志', (id) => {
      const fixture = fixtureData.cases.find((item) => item.id === id)!
      const parse = vi.spyOn(DOMParser.prototype, 'parseFromString')
      expect(processWechat(fixture.input)).toEqual({
        html: fixture.expectedHtml,
        patchLog: fixture.expectedPatchLog,
      })
      expect(parse).toHaveBeenCalledTimes(2)
    },
  )

  it('相同 render 输入继续命中原有结果缓存', () => {
    const inliner = vi.spyOn(inline, 'inlineHtml').mockReturnValue('<p id="remove">缓存正文</p>')
    const parse = vi.spyOn(DOMParser.prototype, 'parseFromString')
    const input = { md: '# platform-dispatch cache contract', theme }
    const first = render(input)
    expect(render(input)).toBe(first)
    expect(first.html).toBe('<p>缓存正文</p>')
    expect(inliner).toHaveBeenCalledTimes(1)
    expect(parse).toHaveBeenCalledTimes(1)
  })
})

describe('平台派发兼容性', () => {
  it.each(['xhs', 'zhihu'])('%s 仍保留原 HTML 和空日志', (platform) => {
    const html = '<p id="keep" style="font-family:serif">占位平台</p>'
    vi.spyOn(inline, 'inlineHtml').mockReturnValue(html)
    const parse = vi.spyOn(DOMParser.prototype, 'parseFromString')
    const result = render({ md: `# platform-dispatch ${platform}`, theme, platform })
    expect(result.html).toBe(html)
    expect(result.patchLog).toEqual({ entries: [], total: 0 })
    expect(parse).not.toHaveBeenCalled()
  })

  it('没有组合入口的 adapter 仍先 inspect 再 patch，并透传选项', () => {
    const log: PatchLog = { entries: [{ patch: 'custom', label: '自定义检查', count: 1 }], total: 1 }
    vi.spyOn(inline, 'inlineHtml').mockReturnValue('<p>before</p>')
    const inspect = vi.fn(() => log)
    fallback.inspect = inspect
    const patch = vi.spyOn(fallback, 'patch').mockReturnValue('<p>after</p>')
    const options = { svgWhiteBg: false }
    const result = render({ md: '# platform-dispatch legacy adapter', theme, platform: 'xhs', wxPatch: options })
    expect(result.html).toBe('<p>after</p>')
    expect(result.patchLog).toBe(log)
    expect(inspect).toHaveBeenCalledWith('<p>before</p>')
    expect(patch).toHaveBeenCalledWith('<p>before</p>', options)
    expect(inspect.mock.invocationCallOrder[0]).toBeLessThan(patch.mock.invocationCallOrder[0])
  })

  it('未知平台继续抛出稳定错误码', () => {
    expect(() => render({ md: '# platform-dispatch unknown', theme, platform: 'missing-platform' }))
      .toThrowError(/PLATFORM_UNSUPPORTED/)
  })
})

describe('检查与修补的错误边界', () => {
  it('检查解析失败返回空日志，实际修补失败仍向调用者抛出', () => {
    const failure = new Error('DOM parser unavailable')
    vi.spyOn(DOMParser.prototype, 'parseFromString').mockImplementation(() => { throw failure })
    expect(wechat.inspectPatchTargets('<p>正文</p>')).toEqual({ entries: [], total: 0 })
    expect(() => processWechat('<p>正文</p>')).toThrow(failure)
  })

  it('扫描中断仍保留已收集日志，随后修补继续执行', () => {
    vi.spyOn(utils, 'walkElements').mockImplementationOnce((container, visit) => {
      visit(container.querySelector('p')!)
      throw new Error('inspection interrupted')
    })
    const result = processWechat('<p id="first">甲</p><p id="second">乙</p>')
    expect(result.patchLog.total).toBe(1)
    expect(result.html).toBe('<p>甲</p><p>乙</p>')
  })
})
