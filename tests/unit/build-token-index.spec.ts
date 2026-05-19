/**
 * build-token-index 派生稳定性测试。
 *
 * 守的两条：
 *   1. 18 主题 palette 每个 hex 都能反查到至少一条 hit
 *   2. 关键 palette key 的 hit 包含正确 ctxPath（让 LLM 拿到的字符串能直接 `${ctx.tokens.xxx}`）
 *
 * 不守"具体每个 hex 命中谁"——那随主题 palette 演进会自然漂移。本 spec 锁的是"派生
 * 机制本身"，主题改 palette 时本 spec 不应失败（除非派生路径漏字段）。
 */

import { describe, expect, it } from 'vitest'
import {
  buildTokenIndex,
  lookupToken,
  suggestToken,
  __clearTokenIndexCacheForTest,
} from '../../src/core/design-ir'
import { ORDERED_SPECS } from '../../src/core/themes/registry'

describe('buildTokenIndex · 派生范围', () => {
  it('18 主题全部进入索引（每主题至少 11 个 palette 必填命中）', () => {
    __clearTokenIndexCacheForTest()
    const idx = buildTokenIndex()
    // 反查"每主题被索引到多少次"
    const perTheme = new Map<string, number>()
    for (const hits of idx.values()) {
      for (const h of hits) {
        perTheme.set(h.themeId, (perTheme.get(h.themeId) ?? 0) + 1)
      }
    }
    for (const spec of ORDERED_SPECS) {
      const count = perTheme.get(spec.id) ?? 0
      // 必填 11 + status 8 = 至少 19；语义槽是可选，因此下限取 19 而非 20+
      expect(count, `主题 ${spec.id} 派生 hit 数 < 19`).toBeGreaterThanOrEqual(19)
    }
  })

  it('ctxPath 字段总是以 tokens.colors. 开头', () => {
    __clearTokenIndexCacheForTest()
    const idx = buildTokenIndex()
    for (const hits of idx.values()) {
      for (const h of hits) {
        expect(h.ctxPath.startsWith('tokens.colors.')).toBe(true)
      }
    }
  })

  it('status pair 派生 ctxPath 形如 tokens.colors.status.<key>.<tone>', () => {
    __clearTokenIndexCacheForTest()
    const idx = buildTokenIndex()
    let statusHitCount = 0
    for (const hits of idx.values()) {
      for (const h of hits) {
        if (h.paletteKey.startsWith('status.')) {
          expect(h.ctxPath).toMatch(/^tokens\.colors\.status\.(tip|warning|info|danger)\.(accent|soft)$/)
          statusHitCount++
        }
      }
    }
    // 18 主题 × 4 状态 × 2 tone = 144 status hits（含跨主题同色合并，下限 18×4×2 - 重复）
    expect(statusHitCount).toBeGreaterThan(50)
  })
})

describe('lookupToken · 查询语义', () => {
  it('指定 preferredThemeId 命中时 preferred 字段非 null', () => {
    __clearTokenIndexCacheForTest()
    // literary-humanism.palette.text = '#1f1b14'
    const r = lookupToken('#1f1b14', 'literary-humanism')
    expect(r.preferred).not.toBeNull()
    expect(r.preferred!.themeId).toBe('literary-humanism')
    expect(r.preferred!.paletteKey).toBe('text')
    expect(r.preferred!.ctxPath).toBe('tokens.colors.text')
  })

  it('指定 preferredThemeId 未在该主题登记时 preferred=null 但 hits 仍含跨主题命中', () => {
    __clearTokenIndexCacheForTest()
    // 任取一个 literary-humanism 不会有的色（这里用 default theme primary）
    const defaultSpec = ORDERED_SPECS.find((s) => s.id === 'default')
    if (!defaultSpec) throw new Error('default spec 缺失')
    const defaultPrimary = defaultSpec.palette.primary
    const r = lookupToken(defaultPrimary, 'literary-humanism')
    // preferred 是 null 还是非 null 取决于两主题是否同色，本测试只锁"hits 必非空"
    expect(r.hits.length).toBeGreaterThan(0)
    expect(r.hits.some((h) => h.themeId === 'default')).toBe(true)
  })

  it('未命中字面 → hits 空 + preferred null', () => {
    __clearTokenIndexCacheForTest()
    const r = lookupToken('#abcdef', 'default')
    expect(r.hits.length).toBe(0)
    expect(r.preferred).toBeNull()
  })

  it('hex 归一化：#abc 与 #aabbcc 视为同一字面', () => {
    __clearTokenIndexCacheForTest()
    const r3 = lookupToken('#fff')
    const r6 = lookupToken('#ffffff')
    expect(r3.literal).toBe(r6.literal)
  })

  it('不带 preferredThemeId 时 preferred=null，hits 仍非空（如果有命中）', () => {
    __clearTokenIndexCacheForTest()
    const r = lookupToken('#1f1b14')
    expect(r.preferred).toBeNull()
    expect(r.hits.length).toBeGreaterThan(0)
  })
})

describe('suggestToken · IR 兼容 API', () => {
  it('设计稿主题 t2 → literary-humanism.bg 字面 → tokens.colors.bg', () => {
    // 画稿 t2 的 bg 字面（#f3eada）与 literary-humanism palette 已演进出微差（#f4efe3）。
    // 取主题实际 palette 字面跑 suggestToken，确保"推荐主题命中"路径 OK。
    __clearTokenIndexCacheForTest()
    const lit = ORDERED_SPECS.find((s) => s.id === 'literary-humanism')
    if (!lit) throw new Error('literary-humanism spec 缺失')
    expect(suggestToken(lit.palette.bg, 't2')).toBe('tokens.colors.bg')
  })

  it('未命中字面返回 null', () => {
    __clearTokenIndexCacheForTest()
    expect(suggestToken('#abcdef', 't1')).toBeNull()
  })

  it('transparent 等中性常量返回 null（无需 token 化）', () => {
    __clearTokenIndexCacheForTest()
    expect(suggestToken('transparent', 't1')).toBeNull()
    expect(suggestToken('currentColor', 't2')).toBeNull()
  })

  it('字面未在推荐主题但在其它主题命中 → 仍返回 next-best path 而非 null', () => {
    __clearTokenIndexCacheForTest()
    // brutalist.palette.primary 通常是显眼的纯色；t2 推荐主题是 literary-humanism，二者
    // primary 字面不同；suggestToken 应给出 brutalist 的 path（next-best），不返 null
    const brutalist = ORDERED_SPECS.find((s) => s.id === 'brutalist')
    if (!brutalist) throw new Error('brutalist spec 缺失')
    const r = suggestToken(brutalist.palette.primary, 't2')
    // 至少不应是 null（除非碰巧 literary-humanism 也用同色，此情形按"推荐"路径返回）
    expect(r).not.toBeNull()
    expect(r!.startsWith('tokens.colors.')).toBe(true)
  })
})
