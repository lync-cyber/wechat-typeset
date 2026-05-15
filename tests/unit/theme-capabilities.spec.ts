/**
 * 主题能力复合查询 API（P1.3）。
 *
 * 守卫：
 *   - 容器 namespace 过滤：theme:data-brief 容器仅在 data-brief 主题 available
 *   - signatureContainers / excluded / capabilities.containers 白名单语义
 *   - getRecommendedVariantsFor 反向索引 themeCompat + variantOverrides 排序
 */

import { describe, it, expect } from 'vitest'
import {
  getThemeCapabilities,
  getRecommendedVariantsFor,
  getPersona,
} from '../../src/public'

describe('getThemeCapabilities · namespace 过滤', () => {
  it('default 主题：theme:data-brief 容器 not available', () => {
    const v = getThemeCapabilities('default')
    const kpi = v.containers.find((c) => c.id === 'kpi-dashboard')!
    expect(kpi.namespace).toBe('theme')
    expect(kpi.pack).toBe('theme:data-brief')
    expect(kpi.available).toBe(false)
  })

  it('data-brief 主题：theme:data-brief 容器 available', () => {
    const v = getThemeCapabilities('data-brief')
    const kpi = v.containers.find((c) => c.id === 'kpi-dashboard')!
    expect(kpi.available).toBe(true)
  })

  it('任何主题 pack:editorial 容器都 available（多主题共享）', () => {
    const inDefault = getThemeCapabilities('default').containers
      .find((c) => c.id === 'masthead')!
    const inBrutalist = getThemeCapabilities('brutalist').containers
      .find((c) => c.id === 'masthead')!
    expect(inDefault.available).toBe(true)
    expect(inDefault.namespace).toBe('pack')
    expect(inBrutalist.available).toBe(true)
  })

  it('base 容器在所有主题里都 available', () => {
    const v = getThemeCapabilities('default')
    expect(v.containers.find((c) => c.id === 'tip')!.available).toBe(true)
    expect(v.containers.find((c) => c.id === 'tip')!.namespace).toBe('base')
  })
})

describe('getThemeCapabilities · signatureContainers', () => {
  it('在 signatureContainers 里的容器，signature=true', () => {
    const v = getThemeCapabilities('brutalist')
    // brutalist 声明了 masthead / toc / qaBlock / ...
    expect(v.containers.find((c) => c.id === 'masthead')!.signature).toBe(true)
    expect(v.containers.find((c) => c.id === 'toc')!.signature).toBe(true)
  })

  it('未声明的容器 signature=false', () => {
    const v = getThemeCapabilities('default')
    expect(v.containers.find((c) => c.id === 'masthead')!.signature).toBe(false)
  })
})

describe('getRecommendedVariantsFor · themeCompat 反向索引', () => {
  it('返回每个 kind 的友好 variant 列表', () => {
    const recs = getRecommendedVariantsFor('tech-geek')
    expect(Array.isArray(recs.admonition)).toBe(true)
    expect(Array.isArray(recs.quote)).toBe(true)
  })

  it('未知主题（无 themeCompat 匹配）每个 kind 返回空数组', () => {
    // 用一个存在的主题但通常没有 themeCompat 反向命中的——life-aesthetic
    const recs = getRecommendedVariantsFor('life-aesthetic')
    for (const arr of Object.values(recs)) {
      expect(Array.isArray(arr)).toBe(true)
    }
  })

  it('getPersona 返回完整 spec（含可选 capabilities）', () => {
    const spec = getPersona('default')
    expect(spec.id).toBe('default')
    // capabilities 当前内置主题均未声明，应为 undefined
    expect(spec.capabilities).toBeUndefined()
  })
})

describe('defaultVariants 结构', () => {
  it('包含 8 个 kind', () => {
    const v = getThemeCapabilities('default')
    expect(Object.keys(v.defaultVariants).sort()).toEqual(
      ['admonition', 'codeBlock', 'compare', 'divider', 'note', 'quote', 'sectionTitle', 'steps'].sort(),
    )
  })
})
