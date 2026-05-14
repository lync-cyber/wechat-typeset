/**
 * Preview iframe srcdoc 契约
 *
 * - srcdoc 是**常量壳**：含空的 `.phone-viewport` 占位，但不嵌入 props.html
 *   （props.html 走 innerHTML 注入路径，避免 srcdoc 变更触发 iframe 重建、
 *    导致编辑时 scrollTop 归零、scroll listener 失效、闪屏）
 * - srcdoc 注入的 CSS 选择器必须**不**匹配 .markdown-body 或其子元素
 * - viewport meta 锁 375px
 * - .phone-viewport 固定 width:375px
 * - sandbox 不含 allow-scripts
 *
 * 端到端"保真"（iframe 内容 === 剪贴板 HTML）由 playwright e2e 覆盖
 * （tests/e2e/*），jsdom 不解析 srcdoc，单测层无法做这一步。
 */

import { describe, it, expect } from 'vitest'
import { mount } from '../helpers/mount'
import Preview from '../../src/ui/components/Preview.vue'

const SAMPLE = '<section class="markdown-body"><h1 style="color:red">Hello</h1><p style="margin:0">text</p></section>'

describe('Preview iframe srcdoc', () => {
  it('srcdoc 是常量壳：含空 .phone-viewport 占位，不嵌入 props.html', async () => {
    const { root, unmount } = await mount(Preview, { html: SAMPLE })
    const iframe = root.querySelector('iframe') as HTMLIFrameElement
    expect(iframe).toBeTruthy()
    const srcdoc = iframe.getAttribute('srcdoc') ?? ''
    // 必须含有空占位（注入点）
    expect(srcdoc).toMatch(/<div class="phone-viewport"><\/div>/)
    // 不得包含 props.html 内容——否则每次 props.html 变更都会重建 iframe
    expect(srcdoc).not.toContain(SAMPLE)
    expect(srcdoc).not.toContain('<h1')
    unmount()
  })

  it('viewport meta 锁定 width=375', async () => {
    const { root, unmount } = await mount(Preview, { html: SAMPLE })
    const iframe = root.querySelector('iframe') as HTMLIFrameElement
    const srcdoc = iframe.getAttribute('srcdoc') ?? ''
    expect(srcdoc).toMatch(/<meta name="viewport" content="width=375/)
    unmount()
  })

  it('phone-viewport 宽度固定 375px', async () => {
    const { root, unmount } = await mount(Preview, { html: SAMPLE })
    const iframe = root.querySelector('iframe') as HTMLIFrameElement
    const srcdoc = iframe.getAttribute('srcdoc') ?? ''
    expect(srcdoc).toMatch(/\.phone-viewport\s*\{[^}]*width:\s*375px/)
    unmount()
  })

  it('iframe 内样式只选中外框，不选中 .markdown-body 或其子元素', async () => {
    const { root, unmount } = await mount(Preview, { html: SAMPLE })
    const iframe = root.querySelector('iframe') as HTMLIFrameElement
    const srcdoc = iframe.getAttribute('srcdoc') ?? ''
    // 抽出 <style> 块并剥掉 CSS 注释（注释里出现 .markdown-body 等标识不算选择器污染）
    const styleMatch = srcdoc.match(/<style>([\s\S]*?)<\/style>/)
    expect(styleMatch).toBeTruthy()
    const css = styleMatch![1].replace(/\/\*[\s\S]*?\*\//g, '')

    // 不得作为选择器出现（后面必跟 `,` 或 `{`）
    expect(css).not.toMatch(/\.markdown-body\s*[,{]/)
    expect(css).not.toMatch(/\bh[1-6]\s*[,{]/)
    expect(css).not.toMatch(/(^|\s)p\s*[,{]/m)
    expect(css).not.toMatch(/(^|\s)ul\s*[,{]/m)
    expect(css).not.toMatch(/(^|\s)ol\s*[,{]/m)
    expect(css).not.toMatch(/(^|\s)li\s*[,{]/m)
    expect(css).not.toMatch(/\bblockquote\s*[,{]/)
    // 只应包含这三个选择器
    expect(css).toMatch(/html,\s*body/)
    expect(css).toMatch(/\bbody\s*\{/)
    expect(css).toMatch(/\.phone-viewport\s*\{/)
    unmount()
  })

  it('iframe sandbox 不包含 allow-scripts', async () => {
    const { root, unmount } = await mount(Preview, { html: SAMPLE })
    const iframe = root.querySelector('iframe') as HTMLIFrameElement
    const sandbox = iframe.getAttribute('sandbox') ?? ''
    expect(sandbox).toContain('allow-same-origin')
    expect(sandbox).not.toContain('allow-scripts')
    unmount()
  })
})
