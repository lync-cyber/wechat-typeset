import { expect, test } from '@playwright/test'
import { JSDOM } from 'jsdom'
import type { WxPatchOptions } from '../../src/core/pipeline/platforms/wechat'

const THEMES = ['default', 'swiss-grid', 'tech-geek'] as const
const SVG_MARKDOWN = `# SVG 与主题装饰

::: divider variant=flower
:::

<svg xmlns="http://www.w3.org/2000/svg" aria-label="parity-white" id="parity-svg" viewBox="0 0 24 24"><rect width="24" height="24" fill="#fff" style="stroke: white"/><g id="parity-group"><path d="M0 0L24 24" fill="url(&quot;#gradient&quot;)"/></g></svg>
`

interface ParityCase {
  name: string
  md: string
  wxPatch?: WxPatchOptions
  expectedWhite?: string
}

const CASES: readonly ParityCase[] = [
  {
    name: 'nested-lists',
    md: '# 嵌套列表\n\n- 第一层\n  - 第二层\n    - 第三层 **重点**\n      - 第四层\n\n1. 有序条目\n2. 后续条目\n',
  },
  {
    name: 'footnotes-and-patches',
    md: '# 脚注与补丁\n\n中文 text 带注释[^note]。\n\n[^note]: 参考资料与 [链接](https://example.com)。\n\n<p id="parity-remove" style="font-family: serif; position: absolute; display: flex">保留文字</p>\n',
  },
  { name: 'svg-white-default', md: SVG_MARKDOWN, expectedWhite: '#fefefe' },
  { name: 'svg-white-disabled', md: SVG_MARKDOWN, wxPatch: { svgWhiteBg: false }, expectedWhite: '#fff' },
]

test.describe.configure({ mode: 'default' })

let dom: JSDOM
let renderNode: typeof import('../../src/core/pipeline').render
let getThemeNode: typeof import('../../src/core/themes').getTheme
const originalGlobals = new Map<string, PropertyDescriptor | undefined>()

test.beforeAll(async () => {
  dom = new JSDOM('', { url: 'http://localhost/' })
  const globals = {
    DOMParser: dom.window.DOMParser,
    XMLSerializer: dom.window.XMLSerializer,
    document: dom.window.document,
    Node: dom.window.Node,
  }
  for (const [name, value] of Object.entries(globals)) {
    originalGlobals.set(name, Object.getOwnPropertyDescriptor(globalThis, name))
    Object.defineProperty(globalThis, name, { configurable: true, writable: true, value })
  }
  ;({ render: renderNode } = await import('../../src/core/pipeline'))
  ;({ getTheme: getThemeNode } = await import('../../src/core/themes'))
})

test.afterAll(() => {
  for (const [name, descriptor] of originalGlobals) {
    if (descriptor) Object.defineProperty(globalThis, name, descriptor)
    else Reflect.deleteProperty(globalThis, name)
  }
  dom?.window.close()
})

for (const themeId of THEMES) {
  for (const fixture of CASES) {
    test(`Node / Chromium parity: ${themeId} · ${fixture.name}`, async ({ page }) => {
      const nodeOutput = renderNode({
        md: fixture.md,
        theme: getThemeNode(themeId),
        wxPatch: fixture.wxPatch,
      })

      // 同源空页只加载渲染核心，避免应用自动渲染提前填充缓存。
      await page.route('**/__pipeline-parity__', (route) => route.fulfill({
        contentType: 'text/html',
        body: '<!doctype html><html><head><title>Pipeline parity</title></head><body></body></html>',
      }))
      await page.goto('/__pipeline-parity__')
      const browserOutput = await page.evaluate(async ({ md, wxPatch, theme }) => {
        const pipelineModule = '/src/core/pipeline/index.ts'
        const themeModule = '/src/core/themes/index.ts'
        const [{ render }, { getTheme }] = await Promise.all([
          import(pipelineModule),
          import(themeModule),
        ])
        const output = render({ md, theme: getTheme(theme), wxPatch })
        return { html: output.html as string, patchLog: output.patchLog }
      }, { md: fixture.md, wxPatch: fixture.wxPatch, theme: themeId })

      expect(browserOutput.html).toBe(nodeOutput.html)
      expect(browserOutput.patchLog).toEqual(nodeOutput.patchLog)

      if (fixture.name === 'nested-lists') {
        expect(nodeOutput.html).toContain('data-wx-list-flatten')
        expect(nodeOutput.patchLog.entries.some((entry) => entry.patch === 'patchListWrap')).toBe(true)
      } else if (fixture.name === 'footnotes-and-patches') {
        expect(nodeOutput.html).toContain('id="fn1"')
        expect(nodeOutput.html).not.toContain('id="parity-remove"')
        expect(nodeOutput.patchLog.entries.some((entry) => entry.patch === 'stripFontFamily')).toBe(true)
      }
      if (fixture.expectedWhite) {
        const fragment = JSDOM.fragment(nodeOutput.html)
        expect(fragment.querySelectorAll('svg').length).toBeGreaterThanOrEqual(2)
        expect(fragment.querySelector('svg[aria-label="parity-white"] rect')?.getAttribute('fill')).toBe(fixture.expectedWhite)
      }
    })
  }
}
