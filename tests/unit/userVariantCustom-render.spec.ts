/**
 * UserVariantCustom markdown → fence → HTML 集成测试。
 * 守护：fence 注册命中 template；占位符替换（含 svgSlot 原样注入）；未注册退化；
 *       splitTemplateOnBody 边界；customFenceName 契约；mdCache 按 updatedAt 失效。
 */

import { describe, expect, it } from 'vitest'
import {
  customFenceName,
  splitTemplateOnBody,
  renderUserCustomOpen,
  renderUserCustomClose,
} from '../../src/core/pipeline/containers/_user'
import type { UserVariantCustom } from '../../src/core/variants/userVariant'
import { render } from '../../src/core/pipeline'
import { themeRegistry } from '../../src/core/themes'

const defaultTheme = themeRegistry.default

function makeCustomUv(p: Partial<UserVariantCustom> = {}): UserVariantCustom {
  return {
    id: 'uv_test_custom_1',
    name: 'test-card',
    level: 'custom',
    createdAt: 0,
    updatedAt: 1,
    base: null,
    template:
      '<section class="my-card" style="{{wrapperCSS}}">' +
      '<h3 style="{{titleCSS}}">{{title}}</h3>' +
      '<div style="{{bodyCSS}}">{{body}}</div>' +
      '</section>',
    css: {
      wrapperCSS: 'background:#fafafa;padding:12px',
      titleCSS: 'color:#333;font-weight:700',
      bodyCSS: 'color:#444',
    },
    ...p,
  }
}

describe('customFenceName', () => {
  it('uc- 前缀加 uvid', () => {
    expect(customFenceName('uv_x')).toBe('uc-uv_x')
  })
})

describe('splitTemplateOnBody', () => {
  it('正常切分 open / close', () => {
    const r = splitTemplateOnBody('<div>{{body}}</div>')
    expect(r.open).toBe('<div>')
    expect(r.close).toBe('</div>')
  })

  it('带空白：{{ body }}', () => {
    const r = splitTemplateOnBody('A{{ body }}B')
    expect(r.open).toBe('A')
    expect(r.close).toBe('B')
  })

  it('缺 body → open 全段 + 空 close（lint 已闸，runtime 容错）', () => {
    const r = splitTemplateOnBody('<div>no body</div>')
    expect(r.open).toBe('<div>no body</div>')
    expect(r.close).toBe('')
  })

  it('多 body → 第一个切，其余原样保留在 close 段', () => {
    const r = splitTemplateOnBody('A{{body}}B{{body}}C')
    expect(r.open).toBe('A')
    expect(r.close).toBe('B{{body}}C')
  })
})

describe('renderUserCustomOpen / Close 占位符替换', () => {
  it('{{title}} escAttr', () => {
    const uv = makeCustomUv()
    const open = renderUserCustomOpen(uv, { title: 'Hello "World"', attrs: {} })
    expect(open).toContain('Hello &quot;World&quot;')
  })

  it('{{attr.tone}} 取自 fence attrs', () => {
    const uv = makeCustomUv({ template: '<div data-tone="{{attr.tone}}">{{body}}</div>' })
    const open = renderUserCustomOpen(uv, { title: '', attrs: { tone: 'warm' } })
    expect(open).toBe('<div data-tone="warm">')
  })

  it('未提供的 attr → 空串', () => {
    const uv = makeCustomUv({ template: '<div data-x="{{attr.x}}">{{body}}</div>' })
    const open = renderUserCustomOpen(uv, { title: '', attrs: {} })
    expect(open).toBe('<div data-x="">')
  })

  it('{{wrapperCSS}} 等 CSS 槽位注入', () => {
    const uv = makeCustomUv()
    const open = renderUserCustomOpen(uv, { title: 't', attrs: {} })
    expect(open).toContain('background:#fafafa;padding:12px')
    expect(open).toContain('color:#333;font-weight:700')
  })

  it('{{svgSlot}} 原样注入（不 escape，HTML 直插）', () => {
    const uv = makeCustomUv({
      template: '<section>{{svgSlot}}{{body}}</section>',
      css: { wrapperCSS: 'x', svgSlot: '<svg width="10"><circle r="3"/></svg>' },
    })
    const open = renderUserCustomOpen(uv, { title: '', attrs: {} })
    expect(open).toBe('<section><svg width="10"><circle r="3"/></svg>')
  })

  it('close 段也走占位符替换', () => {
    const uv = makeCustomUv({
      template: '<section><h3>{{title}}</h3>{{body}}<footer>{{title}}</footer></section>',
    })
    const close = renderUserCustomClose(uv, { title: 'X', attrs: {} })
    expect(close).toBe('<footer>X</footer></section>')
  })
})

describe('集成：render() with custom UV', () => {
  it('完整 pipeline：markdown ::: uc-<id> → HTML 含 template 产物', () => {
    const uv = makeCustomUv({ id: 'uv_int_basic' })
    const md = `::: uc-${uv.id} 我的标题\n这是正文段落。\n:::\n`
    const out = render({ md, theme: defaultTheme, userVariants: [uv] })
    // wrapper class + title + body 段都要出现
    expect(out.html).toContain('class="my-card"')
    expect(out.html).toContain('>我的标题<')
    // markdown-it 把"这是正文段落。"包成 <p>...
    expect(out.html).toContain('这是正文段落')
  })

  it('attr={{attr.tone}} 注入', () => {
    const uv = makeCustomUv({
      id: 'uv_int_attr',
      template: '<section data-tone="{{attr.tone}}" style="{{wrapperCSS}}">{{body}}</section>',
    })
    const md = `::: uc-${uv.id} tone=warm\nx\n:::\n`
    const out = render({ md, theme: defaultTheme, userVariants: [uv] })
    expect(out.html).toContain('data-tone="warm"')
  })

  it('未注册 fence（uc-不存在的 id）→ markdown-it 不渲染容器，作为普通文本', () => {
    const md = '::: uc-uv_nonexistent_xxx 标题\n正文\n:::\n'
    const out = render({ md, theme: defaultTheme, userVariants: [] })
    // markdown-it-container 未注册的 fence 退化处理：不应包含 my-card 等模板痕迹
    expect(out.html).not.toContain('my-card')
  })

  it('cross-instance 隔离：先 render 一次 UV-A，再 render 一次 UV-B，互不影响', () => {
    const uvA = makeCustomUv({
      id: 'uv_a',
      template: '<section class="A" style="{{wrapperCSS}}">{{body}}</section>',
      css: { wrapperCSS: 'background:red' },
    })
    const uvB = makeCustomUv({
      id: 'uv_b',
      template: '<section class="B" style="{{wrapperCSS}}">{{body}}</section>',
      css: { wrapperCSS: 'background:blue' },
    })
    const outA = render({
      md: '::: uc-uv_a\nA-body\n:::\n',
      theme: defaultTheme,
      userVariants: [uvA, uvB],
    })
    expect(outA.html).toContain('class="A"')
    expect(outA.html).toContain('background:red')
    expect(outA.html).not.toContain('class="B"')

    const outB = render({
      md: '::: uc-uv_b\nB-body\n:::\n',
      theme: defaultTheme,
      userVariants: [uvA, uvB],
    })
    expect(outB.html).toContain('class="B"')
    expect(outB.html).toContain('background:blue')
  })

  it('mdCache key 区分：updatedAt 变化触发新实例（新 template 生效）', () => {
    const uvV1 = makeCustomUv({
      id: 'uv_versioned',
      updatedAt: 100,
      template: '<section class="v1">{{body}}</section>',
    })
    const out1 = render({
      md: '::: uc-uv_versioned\nx\n:::\n',
      theme: defaultTheme,
      userVariants: [uvV1],
    })
    expect(out1.html).toContain('class="v1"')

    const uvV2: UserVariantCustom = {
      ...uvV1,
      updatedAt: 200,
      template: '<section class="v2">{{body}}</section>',
    }
    const out2 = render({
      md: '::: uc-uv_versioned\nx\n:::\n',
      theme: defaultTheme,
      userVariants: [uvV2],
    })
    expect(out2.html).toContain('class="v2"')
    expect(out2.html).not.toContain('class="v1"')
  })
})
