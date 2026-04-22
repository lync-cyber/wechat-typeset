/**
 * 公共 API 契约测试
 *
 * 这是 LLM / 外部集成方消费的入口，任何签名变动都应该先红这里。
 * 覆盖：
 *   - 元信息（listPersonas / getPersona / getSchema / supported-lists）
 *   - 校验（validatePersona 对好/坏 spec 的差别）
 *   - 渲染（render 的 persona / theme / spec 三路 + exclusivity / unknown id）
 *   - Motif 工具（getMotifSpec / renderMotif / renderMotifWithValues）
 */

import { describe, it, expect } from 'vitest'
import {
  SpecValidationError,
  createPersona,
  getMotifSpec,
  getPersona,
  getPersonaSummary,
  getSchema,
  getSupportedSignatureContainers,
  getVariantIds,
  listPersonas,
  render,
  renderMotif,
  renderMotifWithValues,
  validatePersona,
} from '../../src/public'
import { VARIANT_IDS } from '../../src/themes/types'
import type { PersonaSpec } from '../../src/themes/_shared/spec'

describe('listPersonas / getPersona / getPersonaSummary', () => {
  it('listPersonas 返回 9 份摘要，default 排第一', () => {
    const list = listPersonas()
    expect(list).toHaveLength(9)
    expect(list[0].id).toBe('default')
  })

  it('每份摘要包含 LLM 选型所需字段', () => {
    for (const s of listPersonas()) {
      expect(s.id).toBeTruthy()
      expect(s.name).toBeTruthy()
      expect(s.description).toBeTruthy()
      expect(s.audience).toBeTruthy()
      expect(s.palette.primary).toMatch(/^#/)
      expect(s.variants.admonition).toBeTruthy()
      expect(Array.isArray(s.signatureContainers)).toBe(true)
    }
  })

  it('getPersona 返回完整 spec（含 motifs / meta）', () => {
    const spec = getPersona('default')
    expect(spec.id).toBe('default')
    expect(spec.motifs).toBeTruthy()
    expect(spec.meta.createdAt).toBeTruthy()
  })

  it('getPersona 未知 id 抛 Error', () => {
    expect(() => getPersona('nope')).toThrow(/Unknown persona id/)
  })

  it('getPersonaSummary 与 listPersonas 对应项一致', () => {
    const list = listPersonas()
    for (const s of list) {
      expect(getPersonaSummary(s.id)).toStrictEqual(s)
    }
  })
})

describe('getSchema / getSupportedSignatureContainers / getVariantIds', () => {
  it('getSchema 返回 JSON Schema 带 required', () => {
    const schema = getSchema()
    expect(schema.$schema).toBeTruthy()
    expect(schema.required).toContain('palette')
    expect(schema.required).toContain('motifs')
  })

  it('getSupportedSignatureContainers 包含已知 id', () => {
    const ids = getSupportedSignatureContainers()
    for (const id of ['intro', 'tip', 'quoteCard', 'abstract', 'keyNumber', 'seeAlso']) {
      expect(ids).toContain(id)
    }
  })

  it('getVariantIds === VARIANT_IDS（同一引用）', () => {
    expect(getVariantIds()).toBe(VARIANT_IDS)
  })
})

describe('validatePersona', () => {
  it('内置 9 份 spec 都通过', () => {
    for (const { id } of listPersonas()) {
      const result = validatePersona(getPersona(id))
      expect(result.ok, id).toBe(true)
    }
  })

  it('hex 非法时报 error', () => {
    const spec = structuredClone(getPersona('default')) as PersonaSpec
    ;(spec.palette as unknown as Record<string, string>).primary = 'not-a-hex'
    const result = validatePersona(spec)
    expect(result.ok).toBe(false)
    expect(result.errors.some((e) => e.path.includes('primary'))).toBe(true)
  })
})

describe('render', () => {
  const md = '# 标题\n\n正文一段。\n\n::: tip 提示\n小贴士\n:::\n'

  it('默认 persona="default"', () => {
    const out = render({ md })
    expect(out.html).toContain('markdown-body')
    expect(out.wordCount).toBeGreaterThan(0)
    expect(out.readingTime).toBeGreaterThanOrEqual(1)
  })

  it('persona 路径：tech-geek 渲染 terminal variant', () => {
    const out = render({ md, persona: 'tech-geek' })
    expect(out.html).toMatch(/container-tip/)
  })

  it('spec 路径：先校验再渲染', () => {
    const spec = getPersona('literary-humanism')
    const out = render({ md, spec })
    expect(out.html).toContain('markdown-body')
  })

  it('spec 路径非法 spec 抛 SpecValidationError', () => {
    const bad = structuredClone(getPersona('default')) as PersonaSpec
    ;(bad.palette as unknown as Record<string, string>).primary = '##bad'
    expect(() => render({ md, spec: bad })).toThrow(SpecValidationError)
  })

  it('多个来源同时给出时抛错', () => {
    expect(() =>
      render({ md, persona: 'default', theme: createPersona(getPersona('default')).theme }),
    ).toThrow(/exactly one of/)
  })

  it('未知 persona id 抛 Error', () => {
    expect(() => render({ md, persona: 'no-such' })).toThrow(/Unknown persona id/)
  })
})

describe('createPersona', () => {
  it('合法 spec 返回 theme + ok validation', () => {
    const result = createPersona(getPersona('default'))
    expect(result.theme.id).toBe('default')
    expect(result.validation.ok).toBe(true)
  })

  it('非法 spec：theme 仍投射，validation.ok=false', () => {
    const bad = structuredClone(getPersona('default')) as PersonaSpec
    ;(bad.palette as unknown as Record<string, string>).primary = 'xx'
    const result = createPersona(bad)
    expect(result.validation.ok).toBe(false)
    // theme 仍应产出（best-effort），使 LLM 能在 UI 里看到失败 preview
    expect(result.theme).toBeTruthy()
  })
})

describe('motif utilities', () => {
  it('getMotifSpec 返回指定 persona 的 motifs', () => {
    const motifs = getMotifSpec('default')
    expect(motifs.h2Prefix).toBeTruthy()
  })

  it('renderMotif(shape) 输出带 xmlns 的 SVG', () => {
    const motifs = getMotifSpec('default')
    const svg = renderMotif(motifs.h2Prefix!)
    expect(svg).toContain('<svg')
    expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"')
    expect(svg).toContain('viewBox=')
  })

  it('renderMotifWithValues(stepBadge, {N:1}) 占位符替换', () => {
    // 找一个声明了 stepBadge 的 persona
    const target = listPersonas().find((s) => getMotifSpec(s.id).stepBadge)
    expect(target, 'expected at least one persona with stepBadge').toBeTruthy()
    const template = getMotifSpec(target!.id).stepBadge!
    const svg = renderMotifWithValues(template, { N: 1 })
    expect(svg).toContain('<svg')
    expect(svg).not.toMatch(/\{N\}/)
  })
})
