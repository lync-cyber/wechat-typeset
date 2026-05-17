/**
 * lintTemplateHTML · UserVariantCustom.template 白名单守护（步骤 7.1）。
 *
 * 测试覆盖矩阵：
 *   - 标签禁区：script / style / link / meta / object / embed / form / noscript
 *   - iframe：白名单内（v.qq.com）放行；其它一律 iframe-src-not-allowed
 *   - 属性禁区：onclick / onmouseover 等 on*= 事件；href="javascript:..."
 *   - 占位符：缺 {{body}} / 多 {{body}} / 未识别 {{xxx}} → 各自 diagnostic
 *   - 嵌入 style="..." 委托 lintInlineCSS（forbidden-prop 透传）
 *   - happy path：合法骨架返回 []
 */

import { describe, expect, it } from 'vitest'
import { lintTemplateHTML } from '../../src/core/pipeline/lint'

describe('lintTemplateHTML · 标签禁区', () => {
  it.each(['script', 'style', 'link', 'meta', 'object', 'embed', 'form', 'noscript'])(
    '<%s> → forbidden-tag',
    (tag) => {
      const out = lintTemplateHTML(
        `<section>{{body}}<${tag}>x</${tag}></section>`,
        'template',
      )
      const tags = out.filter((d) => d.code === 'forbidden-tag').map((d) => d.prop)
      expect(tags).toContain(tag)
    },
  )

  it('合法标签（section/div/h3/p/img/svg）无 forbidden-tag', () => {
    const out = lintTemplateHTML(
      `<section><h3>title</h3><div><p>{{body}}</p><img src="x"/><svg/></div></section>`,
      'template',
    )
    expect(out.filter((d) => d.code === 'forbidden-tag')).toEqual([])
  })
})

describe('lintTemplateHTML · iframe 白名单', () => {
  it('v.qq.com src 放行', () => {
    const out = lintTemplateHTML(
      `<iframe src="https://v.qq.com/x/page/abc.html"></iframe>{{body}}`,
      'template',
    )
    expect(out.filter((d) => d.code === 'iframe-src-not-allowed')).toEqual([])
  })

  it('其它 src → iframe-src-not-allowed', () => {
    const out = lintTemplateHTML(
      `<iframe src="https://evil.example.com/xss"></iframe>{{body}}`,
      'template',
    )
    expect(out.filter((d) => d.code === 'iframe-src-not-allowed')).toHaveLength(1)
  })

  it('iframe 无 src → 报警（缺白名单证据）', () => {
    const out = lintTemplateHTML(`<iframe></iframe>{{body}}`, 'template')
    expect(out.filter((d) => d.code === 'iframe-src-not-allowed')).toHaveLength(1)
  })
})

describe('lintTemplateHTML · 属性禁区', () => {
  it('onclick → forbidden-attr', () => {
    const out = lintTemplateHTML(
      `<div onclick="x">{{body}}</div>`,
      'template',
    )
    expect(out.filter((d) => d.code === 'forbidden-attr').length).toBeGreaterThan(0)
  })

  it('onmouseover → forbidden-attr', () => {
    const out = lintTemplateHTML(
      `<span onmouseover="x">x</span>{{body}}`,
      'template',
    )
    expect(out.filter((d) => d.code === 'forbidden-attr').length).toBeGreaterThan(0)
  })

  it('href="javascript:..." → forbidden-attr', () => {
    const out = lintTemplateHTML(
      `<a href="javascript:alert(1)">x</a>{{body}}`,
      'template',
    )
    const js = out.filter(
      (d) => d.code === 'forbidden-attr' && d.prop === 'javascript-protocol',
    )
    expect(js).toHaveLength(1)
  })

  it('src="javascript:..." → forbidden-attr', () => {
    const out = lintTemplateHTML(
      `<img src="javascript:alert(1)"/>{{body}}`,
      'template',
    )
    const js = out.filter(
      (d) => d.code === 'forbidden-attr' && d.prop === 'javascript-protocol',
    )
    expect(js).toHaveLength(1)
  })

  it('合法属性（class / id / data-x）不报', () => {
    const out = lintTemplateHTML(
      `<div class="c" id="i" data-x="v">{{body}}</div>`,
      'template',
    )
    expect(out.filter((d) => d.code === 'forbidden-attr')).toEqual([])
  })
})

describe('lintTemplateHTML · 占位符', () => {
  it('缺 {{body}} → missing-body-placeholder', () => {
    const out = lintTemplateHTML(`<section><h3>{{title}}</h3></section>`, 'template')
    expect(out.filter((d) => d.code === 'missing-body-placeholder')).toHaveLength(1)
  })

  it('两个 {{body}} → duplicate-body-placeholder', () => {
    const out = lintTemplateHTML(`<div>{{body}}</div><div>{{body}}</div>`, 'template')
    expect(out.filter((d) => d.code === 'duplicate-body-placeholder')).toHaveLength(1)
  })

  it('未识别占位符 → unknown-placeholder（warning）', () => {
    const out = lintTemplateHTML(
      `<section>{{body}}<span>{{notARealField}}</span></section>`,
      'template',
    )
    const unknown = out.filter((d) => d.code === 'unknown-placeholder')
    expect(unknown).toHaveLength(1)
    expect(unknown[0].severity).toBe('warning')
  })

  it.each(['title', 'wrapperCSS', 'titleCSS', 'bodyCSS', 'svgSlot'])(
    '白名单占位符 {{%s}} 不报',
    (name) => {
      const out = lintTemplateHTML(
        `<section><h3>{{${name}}}</h3>{{body}}</section>`,
        'template',
      )
      expect(out.filter((d) => d.code === 'unknown-placeholder')).toEqual([])
    },
  )

  it('attr.<name> 形态白名单：{{attr.tone}} / {{attr.size}} 不报', () => {
    const out = lintTemplateHTML(
      `<section data-tone="{{attr.tone}}">{{body}}</section>`,
      'template',
    )
    expect(out.filter((d) => d.code === 'unknown-placeholder')).toEqual([])
  })

  it('attr. 后空 → 仍按未识别处理（attr. 是裸前缀不合法）', () => {
    const out = lintTemplateHTML(`<section>{{attr.}}{{body}}</section>`, 'template')
    // {{attr.}} 的正则不匹配 ATTR_PLACEHOLDER_RE，但也不在 KNOWN_PLACEHOLDERS——属于 unknown
    expect(out.filter((d) => d.code === 'unknown-placeholder')).toHaveLength(1)
  })
})

describe('lintTemplateHTML · style="..." 嵌入 CSS', () => {
  it('forbidden-prop（position）从 style 属性透传', () => {
    const out = lintTemplateHTML(
      `<div style="position: absolute; color: red">{{body}}</div>`,
      'template',
    )
    expect(out.filter((d) => d.code === 'forbidden-prop')).toHaveLength(1)
  })

  it('style 仅含占位符（{{wrapperCSS}}）→ 跳过 lintInlineCSS（避免误报）', () => {
    const out = lintTemplateHTML(
      `<div style="{{wrapperCSS}}">{{body}}</div>`,
      'template',
    )
    expect(out.filter((d) => d.code === 'forbidden-prop')).toEqual([])
    expect(out.filter((d) => d.code === 'forbidden-value-pattern')).toEqual([])
  })

  it('合法 inline css 不报', () => {
    const out = lintTemplateHTML(
      `<div style="color: #333; padding: 8px">{{body}}</div>`,
      'template',
    )
    expect(out.filter((d) => d.code === 'forbidden-prop')).toEqual([])
  })
})

describe('lintTemplateHTML · happy path', () => {
  it('最小合法骨架返回 []', () => {
    const out = lintTemplateHTML(
      `<section class="my-card" style="{{wrapperCSS}}"><h3 style="{{titleCSS}}">{{title}}</h3><div style="{{bodyCSS}}">{{body}}</div></section>`,
      'template',
    )
    expect(out).toEqual([])
  })
})
