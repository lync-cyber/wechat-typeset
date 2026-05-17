/**
 * lint —— lintProp / lintInlineCSS 的契约。
 *
 * 覆盖目标：
 *   1. 每条 rules.ts 黑名单分类（forbidden-prop / display / value-pattern）能产出对应 code
 *   2. 优先级短路：prop 命中即返回，不再检查 display / value pattern
 *   3. Diagnostic.message 与原 assertSafeProp throw 文案逐字一致（重构契约）
 *   4. 合法声明返回空数组
 *   5. lintInlineCSS 的解析容忍：尾分号、空 decl、缺冒号、value 内含冒号
 *   6. assertSafeProp wrapper 仍然抛 ThemeAuthoringError，且文案与重构前一致
 */

import { describe, expect, it } from 'vitest'
import { lintProp, lintInlineCSS, type Diagnostic } from '../../src/core/pipeline/lint'
import { ThemeAuthoringError } from '../../src/core/themes/types'
import { generateThemeCSS } from '../../src/core/pipeline/themeCSS'
import { themeRegistry } from '../../src/core/themes'

const defaultTheme = themeRegistry.default
import type { Theme } from '../../src/core/themes/types'

describe('lintProp · 各分类命中', () => {
  it('forbidden-prop: position', () => {
    const out = lintProp('position', 'absolute', 'wrapperCSS')
    expect(out).toHaveLength(1)
    expect(out[0].code).toBe('forbidden-prop')
    expect(out[0].severity).toBe('error')
    expect(out[0].prop).toBe('position')
    expect(out[0].value).toBe('absolute')
  })

  it('forbidden-prop: float', () => {
    expect(lintProp('float', 'left', 'p')[0]?.code).toBe('forbidden-prop')
  })

  it('forbidden-prop: font-family（连字 + 驼峰两种写法都命中）', () => {
    expect(lintProp('font-family', 'serif', 'p')[0]?.code).toBe('forbidden-prop')
    expect(lintProp('fontFamily', 'serif', 'p')[0]?.code).toBe('forbidden-prop')
  })

  it('forbidden-display: flex / inline-flex / grid / inline-grid', () => {
    for (const v of ['flex', 'inline-flex', 'grid', 'inline-grid']) {
      const out = lintProp('display', v, 'wrapperCSS')
      expect(out[0]?.code).toBe('forbidden-display')
    }
  })

  it('forbidden-display 大小写 / 空白容忍', () => {
    expect(lintProp('display', '  FLEX  ', 'p')[0]?.code).toBe('forbidden-display')
    expect(lintProp('DISPLAY', 'flex', 'p')[0]?.code).toBe('forbidden-display')
  })

  it('forbidden-value-pattern: -webkit- / @media / @keyframes / :hover / :active', () => {
    expect(lintProp('background', '-webkit-linear-gradient(...)', 'p')[0]?.code)
      .toBe('forbidden-value-pattern')
    expect(lintProp('color', 'red; @media (max-width:600px)', 'p')[0]?.code)
      .toBe('forbidden-value-pattern')
    expect(lintProp('animation', '@keyframes spin', 'p')[0]?.code)
      .toBe('forbidden-value-pattern')
    expect(lintProp('foo', 'bar :hover', 'p')[0]?.code)
      .toBe('forbidden-value-pattern')
    expect(lintProp('foo', 'bar :active', 'p')[0]?.code)
      .toBe('forbidden-value-pattern')
  })
})

describe('lintProp · 合法声明', () => {
  it('普通声明返回空数组', () => {
    expect(lintProp('padding', '14px 16px', 'p')).toEqual([])
    expect(lintProp('color', '#333', 'p')).toEqual([])
    expect(lintProp('display', 'block', 'p')).toEqual([])
    expect(lintProp('display', 'inline-block', 'p')).toEqual([])
    expect(lintProp('display', 'table', 'p')).toEqual([])
  })

  it('display: flex 之外的合法值不命中 display 分类', () => {
    expect(lintProp('display', 'none', 'p')).toEqual([])
  })

  it('-webkit-print-color-adjust 作为 prop 名（非 value）不命中', () => {
    // 注意：themeCSS 层的 FORBIDDEN_VALUE_PATTERNS 只扫 value，prop 名不在扫描范围；
    // -webkit- 例外（用于 variant-sanity 字节扫描）在 lint 层不适用。
    expect(lintProp('-webkit-print-color-adjust', 'exact', 'p')).toEqual([])
  })
})

describe('lintProp · 优先级短路', () => {
  it('prop 命中后不再检查 value 模式（即使 value 也违规）', () => {
    // font-family 是 forbidden-prop，value 里含 -webkit-；按优先级只返回 forbidden-prop
    const out = lintProp('font-family', '-webkit-serif', 'p')
    expect(out).toHaveLength(1)
    expect(out[0].code).toBe('forbidden-prop')
  })

  it('display: flex 命中 forbidden-display 而非 forbidden-prop', () => {
    // display 不在 FORBIDDEN_CSS_PROPS 列表里（合法属性，只是个别值非法）
    const out = lintProp('display', 'flex', 'p')
    expect(out[0].code).toBe('forbidden-display')
  })
})

describe('lintProp · 文案与 ThemeAuthoringError 一致（重构契约）', () => {
  it('forbidden-prop 文案', () => {
    const d = lintProp('position', 'absolute', 'elements.p')[0] as Diagnostic
    expect(d.message).toBe(
      '[themeCSS] 主题在 elements.p 声明了 `position`，违反微信平台约束。请移除。',
    )
  })

  it('forbidden-display 文案', () => {
    const d = lintProp('display', 'flex', 'wrapperCSS')[0] as Diagnostic
    expect(d.message).toBe(
      '[themeCSS] 主题在 wrapperCSS 使用了 `display: flex`，微信粘贴后会被剥离。' +
        '改用 block / inline-block / table 系列。',
    )
  })

  it('forbidden-value-pattern 文案带 reason', () => {
    const d = lintProp('background', '@media (max-width:600px)', 'p')[0] as Diagnostic
    expect(d.message).toBe(
      '[themeCSS] 主题在 p 的值里命中禁用模式（@media 查询会被公众号剥离）：' +
        '`@media (max-width:600px)`。请移除。',
    )
  })
})

describe('lintInlineCSS · 解析容忍', () => {
  it('多条 decl 逐条扫描，聚合所有命中', () => {
    const css = 'padding:14px;position:absolute;color:red;float:left'
    const out = lintInlineCSS(css, 'wrapperCSS')
    expect(out).toHaveLength(2)
    expect(out[0].prop).toBe('position')
    expect(out[1].prop).toBe('float')
  })

  it('合法 inline CSS 返回空数组', () => {
    expect(lintInlineCSS('padding:14px;color:#333;line-height:1.7', 'wrapperCSS')).toEqual([])
  })

  it('尾分号 / 连续分号 / 空白行静默跳过', () => {
    expect(lintInlineCSS('padding:14px;;;color:#333;', 'wrapperCSS')).toEqual([])
    expect(lintInlineCSS(';;', 'wrapperCSS')).toEqual([])
    expect(lintInlineCSS('', 'wrapperCSS')).toEqual([])
  })

  it('缺冒号的 decl 静默跳过（格式问题留给 CSS parser）', () => {
    expect(lintInlineCSS('paddingnocolon;color:#333', 'wrapperCSS')).toEqual([])
  })

  it('prop / value 一侧为空的 decl 静默跳过', () => {
    expect(lintInlineCSS(':value;prop:;color:red', 'wrapperCSS')).toEqual([])
  })

  it('value 内含冒号（如 url 路径）只按首个冒号切', () => {
    // background-image 是合法 prop；value 是 url(http://...)；'http' 后的 ':' 不该误伤
    const out = lintInlineCSS('background-image:url(http://example.com/foo.png)', 'wrapperCSS')
    expect(out).toEqual([])
  })

  it('空白容忍：冒号 / 分号周围的空格不影响切分', () => {
    const out = lintInlineCSS('  position : absolute ;  color : red ', 'wrapperCSS')
    expect(out).toHaveLength(1)
    expect(out[0].prop).toBe('position')
    expect(out[0].value).toBe('absolute')
  })

  it('path 透传到每条 diagnostic', () => {
    const out = lintInlineCSS('position:absolute;float:left', 'admonition/accent-bar:titleCSS')
    for (const d of out) expect(d.path).toBe('admonition/accent-bar:titleCSS')
  })
})

describe('themeCSS · assertSafeProp wrapper 行为不变', () => {
  // 通过 generateThemeCSS 间接触发 assertSafeProp，验证 throw 与文案保持
  it('font-family 仍抛 ThemeAuthoringError，文案与重构前一致', () => {
    const bad = JSON.parse(JSON.stringify(defaultTheme)) as Theme
    bad.id = 'lint-regression-font-family'
    ;(bad.elements.p as Record<string, string>)['font-family'] = 'serif'
    expect(() => generateThemeCSS(bad)).toThrow(ThemeAuthoringError)
    expect(() => generateThemeCSS(bad)).toThrow(
      /主题在 elements\.p 声明了 `font-family`，违反微信平台约束/,
    )
  })

  it('display:flex 仍抛，文案保持', () => {
    const bad = JSON.parse(JSON.stringify(defaultTheme)) as Theme
    bad.id = 'lint-regression-display-flex'
    ;(bad.elements.p as Record<string, string>).display = 'flex'
    expect(() => generateThemeCSS(bad)).toThrow(
      /使用了 `display: flex`，微信粘贴后会被剥离/,
    )
  })
})
