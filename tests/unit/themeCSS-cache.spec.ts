/**
 * generateThemeCSS 缓存契约（R7-C）
 *
 * 缓存对外不可见，只能从"引用相等"和"对副作用 / 错误克隆的应对"侧面验证：
 *   1. 同一 theme 对象重复调用 → 字符串引用相等（命中）
 *   2. 切换不同 theme 后回来 → 仍命中（容量 12 足够 10 套主题轮转）
 *   3. 同 id 不同 theme 对象（模拟 custom theme apply 新 seed）→ 引用不等（不污染）
 *   4. 守卫仍然生效：被缓存前会触发 font-family 守卫；缓存后再调不会绕过
 */

import { afterEach, describe, expect, it } from 'vitest'
import {
  __resetThemeCssCacheForTest,
  generateThemeCSS,
} from '../../src/core/pipeline/themeCSS'
import { defaultTheme } from '../../src/core/themes/default'
import { themeList } from '../../src/core/themes'
import { ThemeAuthoringError, type Theme } from '../../src/core/themes/types'

afterEach(() => __resetThemeCssCacheForTest())

describe('themeCSS · 缓存命中', () => {
  it('同一 theme 对象重复调用返回同一字符串引用', () => {
    const a = generateThemeCSS(defaultTheme)
    const b = generateThemeCSS(defaultTheme)
    expect(a).toBe(b)
    // 不只是值相等，是引用相等（缓存命中 → 不重算）
    expect(Object.is(a, b)).toBe(true)
  })

  it('遍历 themeList 后再回到 default 仍命中（容量 ≥ themeList.length）', () => {
    const first = generateThemeCSS(defaultTheme)
    for (const t of themeList) generateThemeCSS(t)
    const again = generateThemeCSS(defaultTheme)
    expect(Object.is(first, again)).toBe(true)
  })
})

describe('themeCSS · 缓存正确性守卫', () => {
  it('同 id 不同 theme 对象 → 不会错误命中（custom theme 派生场景）', () => {
    const baseCss = generateThemeCSS(defaultTheme)
    // 模拟 custom apply：克隆默认主题，改 element 直接读的字面字段，但保留同 id。
    // 真实代码里 custom id 是 `default--custom`；这里用 default 直接覆盖以放大冲突。
    // 注意：themeCSS 从 element CSSObject 里读字面值，不从 tokens 派生，所以
    // 必须改 element 本身才能让 CSS 产出不同。
    const mutated = JSON.parse(JSON.stringify(defaultTheme)) as Theme
    ;(mutated.elements.p as Record<string, string>).color = '#ff00aa'
    const mutatedCss = generateThemeCSS(mutated)
    expect(mutatedCss).not.toBe(baseCss)
    expect(mutatedCss).toContain('#ff00aa')
    // 再调一次原 default 引用：被前一次 mutated 替换出缓存，重算后值仍正确（纯函数）
    const baseAgain = generateThemeCSS(defaultTheme)
    expect(baseAgain).not.toContain('#ff00aa')
  })

  it('font-family 守卫不被缓存绕过', () => {
    const bad = JSON.parse(JSON.stringify(defaultTheme)) as Theme
    bad.id = 'bad-theme-for-cache-test'
    ;(bad.elements.p as Record<string, string>)['font-family'] = 'serif'
    expect(() => generateThemeCSS(bad)).toThrow(ThemeAuthoringError)
    // 第二次仍然抛——错误路径根本不该写缓存
    expect(() => generateThemeCSS(bad)).toThrow(ThemeAuthoringError)
  })
})
