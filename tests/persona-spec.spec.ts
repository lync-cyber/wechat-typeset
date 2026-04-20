/**
 * PersonaSpec 基建测试 (Phase 1 / PR 2)
 *
 * 覆盖 DoD：
 *   - specToTheme 产出的 Theme 通过 generateThemeCSS 不抛 ThemeAuthoringError
 *   - primitivesToSvg 和 renderMotifTemplate 的输出可预测
 *   - validateSpec 对关键硬约束有断言（hex、字号、stroke、variant 名）
 *   - JSON Schema 导出稳定（结构不炸）
 *
 * 9 主题的 round-trip conformance 在 Phase 2 每主题 PR 里落地。
 */

import { describe, expect, it } from 'vitest'
import {
  PERSONA_SPEC_SCHEMA,
  primitivesToSvg,
  renderMotifTemplate,
  specToTheme,
  validateSpec,
  type PersonaSpec,
} from '../src/themes/_shared/spec'
import { generateThemeCSS } from '../src/pipeline/themeCSS'

// ============================================================
// Fixture：最小可用 spec（所有必填字段 + 一个 motif + 一个模板）
// ============================================================

const fixture: PersonaSpec = {
  id: 'test-unit',
  name: '单元测试主题',
  description: 'PR 2 专用 spec fixture',
  audience: '测试',
  palette: {
    primary: '#2558b0',
    secondary: '#8a8f98',
    accent: '#d98141',
    bg: '#fdfdfc',
    bgSoft: '#f5f5f3',
    bgMuted: '#eceae4',
    text: '#1c1f24',
    textMuted: '#636870',
    textInverse: '#fefefe',
    border: '#d8d8d4',
    code: '#1c1f24',
  },
  status: {
    tip: { accent: '#1f8a4c', soft: '#eef6ef' },
    info: { accent: '#2558b0', soft: '#eef2f9' },
    warning: { accent: '#9a6b1a', soft: '#f7f0df' },
    danger: { accent: '#b42318', soft: '#fbecea' },
  },
  typography: {
    baseSize: 15,
    lineHeight: 1.75,
    h1Size: 22,
    h2Size: 19,
    h3Size: 16,
    letterSpacing: 0.3,
  },
  spacing: { paragraph: 18, section: 28, listItem: 8, containerPadding: 16 },
  radius: { sm: 4, md: 6, lg: 8 },
  motifs: {
    h2Prefix: {
      viewBox: [0, 0, 16, 16],
      primitives: [
        { type: 'rect', x: 0, y: 2, w: 3, h: 12, fill: '#2558b0' },
      ],
    },
    stepBadge: {
      viewBox: [0, 0, 28, 28],
      placeholders: ['N'],
      primitives: [
        { type: 'circle', cx: 14, cy: 14, r: 12, fill: '#2558b0' },
        {
          type: 'text',
          x: 14,
          y: 14,
          content: '{N}',
          fontSize: 14,
          fontFamily: 'sans-serif',
          fill: '#fefefe',
          textAnchor: 'middle',
          dominantBaseline: 'central',
        },
      ],
    },
  },
  variants: {
    admonition: 'accent-bar',
    quote: 'classic',
    compare: 'column-card',
    steps: 'number-circle',
    divider: 'rule',
    sectionTitle: 'bordered',
    codeBlock: 'bare',
  },
  meta: { createdAt: '2026-04-20' },
}

// ============================================================
// specToTheme + generateThemeCSS
// ============================================================

describe('specToTheme', () => {
  it('产出的 Theme 有 id/name/tokens/elements/containers/inline/assets/variants', () => {
    const theme = specToTheme(fixture)
    expect(theme.id).toBe('test-unit')
    expect(theme.tokens.colors.primary).toBe('#2558b0')
    expect(theme.tokens.colors.status.tip.accent).toBe('#1f8a4c')
    expect(theme.tokens.typography.baseSize).toBe(15)
    expect(theme.variants.admonition).toBe('accent-bar')
    expect(theme.elements.h1).toBeTruthy()
    expect(theme.containers.sectionTitle).toBeTruthy()
    expect(theme.inline.highlight).toBeTruthy()
  })

  it('motifs 被投影为 ThemeAssets 的 SVG 字符串', () => {
    const theme = specToTheme(fixture)
    expect(theme.assets.h2Prefix).toMatch(/^<svg viewBox="0 0 16 16"/)
    expect(theme.assets.h2Prefix).toContain('xmlns="http://www.w3.org/2000/svg"')
    expect(theme.assets.h2Prefix).toContain('<rect')
    expect(typeof theme.assets.stepBadge).toBe('function')
    const badge = theme.assets.stepBadge?.(3)
    expect(badge).toMatch(/<text[^>]*>3<\/text>/)
  })

  it('specToTheme → generateThemeCSS 通过硬守卫（font-family/position/flex 等）', () => {
    const theme = specToTheme(fixture)
    const css = generateThemeCSS(theme)
    expect(css).toContain('.markdown-body h1')
    expect(css).toContain('#2558b0') // primary 贯通
    // 硬守卫抛错会在 generateThemeCSS 里 throw，而不是静默
    expect(css).not.toContain('font-family:') // 主题 CSS 不允许声明 font-family
  })

  it('spec.elements 的深合并补丁在 Theme.elements 里生效', () => {
    const withPatch: PersonaSpec = {
      ...fixture,
      elements: {
        h2: { color: '#ff0000', 'letter-spacing': '1px' },
      },
    }
    const theme = specToTheme(withPatch)
    const h2 = theme.elements.h2 as Record<string, string>
    expect(h2.color).toBe('#ff0000')
    expect(h2['letter-spacing']).toBe('1px')
    // base 的 font-size 仍在（深合并）
    expect(h2['font-size']).toBe('19px')
  })

  it('spec.containers 的 __reset sentinel 切换为整段替换', () => {
    const withReset: PersonaSpec = {
      ...fixture,
      containers: {
        sectionTitle: { __reset: true, margin: '10px 0' },
      },
    }
    const theme = specToTheme(withReset)
    const s = theme.containers.sectionTitle as Record<string, string>
    expect(s.margin).toBe('10px 0')
    expect(s['border-bottom']).toBeUndefined() // base 的 border-bottom 被丢弃
  })
})

// ============================================================
// primitivesToSvg / renderMotifTemplate
// ============================================================

describe('primitivesToSvg', () => {
  it('rect + circle + path 基本可渲染', () => {
    const svg = primitivesToSvg(
      [0, 0, 20, 20],
      [
        { type: 'rect', x: 0, y: 0, w: 10, h: 10, fill: '#000' },
        { type: 'circle', cx: 15, cy: 15, r: 4, fill: '#fff', stroke: '#000', strokeWidth: 1 },
        { type: 'path', d: 'M0 0 L10 10', stroke: '#000', strokeWidth: 1 },
      ],
    )
    expect(svg).toBe(
      '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">' +
        ' <rect x="0" y="0" width="10" height="10" fill="#000"/>' +
        ' <circle cx="15" cy="15" r="4" fill="#fff" stroke="#000" stroke-width="1"/>' +
        ' <path d="M0 0 L10 10" fill="none" stroke="#000" stroke-width="1"/>' +
        ' </svg>',
    )
  })

  it('width/height/inlineStyle 投射到 <svg> 包装属性', () => {
    const svg = primitivesToSvg(
      [0, 0, 16, 16],
      [{ type: 'rect', x: 0, y: 0, w: 16, h: 16, fill: '#000' }],
      {
        width: 14,
        height: 14,
        inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 8 },
      },
    )
    expect(svg).toContain('width="14"')
    expect(svg).toContain('height="14"')
    expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"')
    expect(svg).toContain('style="display:inline-block;vertical-align:middle;margin-right:8px"')
  })

  it('text 渲染含 content + 字体白名单字段', () => {
    const svg = primitivesToSvg(
      [0, 0, 30, 30],
      [
        {
          type: 'text',
          x: 15,
          y: 20,
          content: 'Hi <b>',
          fontSize: 14,
          fontFamily: 'serif',
          textAnchor: 'middle',
          fill: '#000',
        },
      ],
    )
    expect(svg).toContain('<text')
    expect(svg).toContain('>Hi &lt;b&gt;<')
    expect(svg).toContain('font-family="serif"')
    expect(svg).toContain('text-anchor="middle"')
  })
})

describe('renderMotifTemplate', () => {
  it('{N} 占位符被替换', () => {
    const tpl = {
      viewBox: [0, 0, 20, 20] as const,
      placeholders: ['N'] as const,
      primitives: [
        { type: 'text' as const, x: 10, y: 10, content: '{N}', fontSize: 14 },
      ],
    }
    expect(renderMotifTemplate(tpl, { N: 7 })).toContain('>7<')
    expect(renderMotifTemplate(tpl, { N: 'X' })).toContain('>X<')
  })

  it('未声明的占位符保留原样', () => {
    const tpl = {
      viewBox: [0, 0, 20, 20] as const,
      placeholders: ['N'] as const,
      primitives: [
        { type: 'text' as const, x: 10, y: 10, content: '{missing}', fontSize: 14 },
      ],
    }
    expect(renderMotifTemplate(tpl, {})).toContain('>{missing}<')
  })
})

// ============================================================
// validateSpec
// ============================================================

describe('validateSpec', () => {
  it('合法 fixture → ok:true, 无 errors', () => {
    const r = validateSpec(fixture)
    expect(r.ok).toBe(true)
    expect(r.errors).toHaveLength(0)
  })

  it('非法 hex 被拒绝', () => {
    const bad: PersonaSpec = {
      ...fixture,
      palette: { ...fixture.palette, primary: 'red' },
    }
    const r = validateSpec(bad)
    expect(r.ok).toBe(false)
    expect(r.errors.map((e) => e.path)).toContain('palette.primary')
  })

  it('status 缺一态 → error', () => {
    const bad = {
      ...fixture,
      status: { tip: fixture.status.tip, info: fixture.status.info, warning: fixture.status.warning },
    } as PersonaSpec
    const r = validateSpec(bad)
    expect(r.ok).toBe(false)
    expect(r.errors.some((e) => e.path === 'status.danger')).toBe(true)
  })

  it('text.fontSize < 14 → error', () => {
    const bad: PersonaSpec = {
      ...fixture,
      motifs: {
        h2Prefix: {
          viewBox: [0, 0, 10, 10],
          primitives: [
            { type: 'text', x: 0, y: 0, content: 'x', fontSize: 10 },
          ],
        },
      },
    }
    const r = validateSpec(bad)
    expect(r.ok).toBe(false)
    expect(r.errors.some((e) => e.message.includes('fontSize'))).toBe(true)
  })

  it('非法 font-family → error', () => {
    const bad: PersonaSpec = {
      ...fixture,
      motifs: {
        h2Prefix: {
          viewBox: [0, 0, 10, 10],
          primitives: [
            {
              type: 'text',
              x: 0,
              y: 0,
              content: 'x',
              fontSize: 14,
              // @ts-expect-error deliberately invalid
              fontFamily: 'Arial',
            },
          ],
        },
      },
    }
    const r = validateSpec(bad)
    expect(r.errors.some((e) => e.message.includes('whitelist'))).toBe(true)
  })

  it('variant id 不在 VARIANT_IDS → error', () => {
    const bad: PersonaSpec = {
      ...fixture,
      // @ts-expect-error deliberately invalid
      variants: { ...fixture.variants, admonition: 'nope' },
    }
    const r = validateSpec(bad)
    expect(r.errors.some((e) => e.path === 'variants.admonition')).toBe(true)
  })

  it('signatureContainers 未登记 → error', () => {
    const bad: PersonaSpec = {
      ...fixture,
      // @ts-expect-error deliberately invalid
      signatureContainers: ['someUnknown'],
    }
    const r = validateSpec(bad)
    expect(r.errors.some((e) => e.path === 'signatureContainers[0]')).toBe(true)
  })

  it('id 非 kebab-case → error', () => {
    const bad: PersonaSpec = { ...fixture, id: 'Bad_ID' }
    const r = validateSpec(bad)
    expect(r.errors.some((e) => e.path === 'id')).toBe(true)
  })
})

// ============================================================
// JSON Schema
// ============================================================

describe('PERSONA_SPEC_SCHEMA', () => {
  it('顶层 required 覆盖必填字段', () => {
    expect(PERSONA_SPEC_SCHEMA.required).toContain('id')
    expect(PERSONA_SPEC_SCHEMA.required).toContain('palette')
    expect(PERSONA_SPEC_SCHEMA.required).toContain('variants')
    expect(PERSONA_SPEC_SCHEMA.required).toContain('meta')
  })

  it('palette.primary 用 hex pattern', () => {
    const paletteSchema = PERSONA_SPEC_SCHEMA.properties?.palette
    const primary = paletteSchema?.properties?.primary
    expect(primary?.pattern).toMatch(/#/)
  })

  it('variants.admonition 枚举覆盖全部 16 个 id', () => {
    const admonition = PERSONA_SPEC_SCHEMA.properties?.variants?.properties?.admonition
    expect(admonition?.enum).toHaveLength(16)
  })

  it('JSON.stringify 能产出有效 JSON（无循环引用）', () => {
    expect(() => JSON.stringify(PERSONA_SPEC_SCHEMA)).not.toThrow()
  })
})
