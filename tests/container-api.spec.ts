/**
 * Container Vocabulary API 契约测试
 *
 * 覆盖 src/containers/api.ts 的 5 个查询函数（通过 src/public 公共入口）：
 *   - getContainerVocabulary
 *   - getContainerSpec
 *   - getVariantsForContainer
 *   - getThemeDefaultVariants
 *   - getContainerSnippet
 */

import { describe, it, expect } from 'vitest'
import {
  getContainerVocabulary,
  getContainerSpec,
  getVariantsForContainer,
  getThemeDefaultVariants,
  getContainerSnippet,
  getPersona,
} from '../src/public'

describe('getContainerVocabulary', () => {
  it('返回非空数组，每项有必填字段', () => {
    const vocab = getContainerVocabulary()
    expect(vocab.length).toBeGreaterThan(0)
    for (const spec of vocab) {
      expect(typeof spec.name).toBe('string')
      expect(spec.name.length).toBeGreaterThan(0)
      expect(typeof spec.category).toBe('string')
      expect([3, 4]).toContain(spec.fenceLength)
      expect(typeof spec.description).toBe('string')
      expect(typeof spec.example).toBe('string')
      expect(spec.example.startsWith(':::')).toBe(true)
    }
  })

  it('包含 25 个容器', () => {
    expect(getContainerVocabulary()).toHaveLength(25)
  })

  it('包含预期的容器名', () => {
    const names = getContainerVocabulary().map((s) => s.name)
    for (const name of [
      'intro', 'cover', 'author', 'section-title', 'abstract',
      'tip', 'warning', 'info', 'danger', 'note',
      'quote-card', 'highlight', 'key-number',
      'compare', 'pros', 'cons', 'steps',
      'divider',
      'footer-cta', 'recommend', 'qrcode', 'see-also',
      'mpvoice', 'mpvideo',
      'free',
    ]) {
      expect(names).toContain(name)
    }
  })

  it('name 无重复', () => {
    const names = getContainerVocabulary().map((s) => s.name)
    expect(names).toHaveLength(new Set(names).size)
  })

  it('返回引用稳定（两次调用同一对象）', () => {
    expect(getContainerVocabulary()).toBe(getContainerVocabulary())
  })
})

describe('getContainerSpec', () => {
  it('已知名返回正确的 ContainerSpec', () => {
    const spec = getContainerSpec('tip')
    expect(spec).toBeDefined()
    expect(spec!.name).toBe('tip')
    expect(spec!.category).toBe('admonition')
    expect(spec!.variantKind).toBe('admonition')
    expect(spec!.fenceLength).toBe(3)
  })

  it('compare 的 fenceLength 为 4', () => {
    expect(getContainerSpec('compare')!.fenceLength).toBe(4)
  })

  it('intro 没有 variantKind（固定骨架）', () => {
    expect(getContainerSpec('intro')!.variantKind).toBeUndefined()
  })

  it('未知名返回 undefined', () => {
    expect(getContainerSpec('totally-unknown')).toBeUndefined()
    expect(getContainerSpec('')).toBeUndefined()
  })

  it('free 的 styleKey 为 null', () => {
    expect(getContainerSpec('free')!.styleKey).toBeNull()
  })
})

describe('getVariantsForContainer', () => {
  it('支持 variant 的容器返回非空数组', () => {
    const variants = getVariantsForContainer('tip')
    expect(variants.length).toBeGreaterThan(0)
    for (const v of variants) {
      expect(typeof v.id).toBe('string')
      expect(typeof v.kind).toBe('string')
      expect(typeof v.name).toBe('string')
      expect(typeof v.description).toBe('string')
    }
  })

  it('tip/warning/info/danger 绑到 admonition kind', () => {
    for (const name of ['tip', 'warning', 'info', 'danger']) {
      const variants = getVariantsForContainer(name)
      expect(variants.length).toBeGreaterThan(0)
      expect(variants.every((v) => v.kind === 'admonition')).toBe(true)
    }
  })

  it('note 没有 variantKind（第五态固定骨架）', () => {
    expect(getVariantsForContainer('note')).toHaveLength(0)
  })

  it('quote-card 返回 quote kind 的 variants', () => {
    const variants = getVariantsForContainer('quote-card')
    expect(variants.length).toBeGreaterThan(0)
    expect(variants.every((v) => v.kind === 'quote')).toBe(true)
  })

  it('section-title 返回 sectionTitle kind', () => {
    const variants = getVariantsForContainer('section-title')
    expect(variants.every((v) => v.kind === 'sectionTitle')).toBe(true)
  })

  it('无 variantKind 的容器返回空数组', () => {
    expect(getVariantsForContainer('intro')).toHaveLength(0)
    expect(getVariantsForContainer('free')).toHaveLength(0)
    expect(getVariantsForContainer('highlight')).toHaveLength(0)
  })

  it('未知容器名返回空数组', () => {
    expect(getVariantsForContainer('nonexistent')).toHaveLength(0)
  })
})

describe('getThemeDefaultVariants', () => {
  it('返回 7 个 VariantDescriptor（7 个 variant slot）', () => {
    const persona = getPersona('default')
    const descriptors = getThemeDefaultVariants(persona.variants)
    expect(descriptors).toHaveLength(7)
  })

  it('每个 descriptor 有 id / kind / name / description', () => {
    const persona = getPersona('tech-explainer')
    for (const d of getThemeDefaultVariants(persona.variants)) {
      expect(typeof d.id).toBe('string')
      expect(typeof d.kind).toBe('string')
      expect(typeof d.name).toBe('string')
      expect(typeof d.description).toBe('string')
    }
  })

  it('不同 persona 返回不同的默认 admonition variant id', () => {
    const techGeek = getPersona('tech-geek')
    const literaryHumanism = getPersona('literary-humanism')
    const gVariants = getThemeDefaultVariants(techGeek.variants)
    const lVariants = getThemeDefaultVariants(literaryHumanism.variants)
    const gAdmonition = gVariants.find((v) => v.kind === 'admonition')!
    const lAdmonition = lVariants.find((v) => v.kind === 'admonition')!
    expect(gAdmonition.id).not.toBe(lAdmonition.id)
  })
})

describe('getContainerSnippet', () => {
  it('不传 options 返回 spec.example 原样', () => {
    const spec = getContainerSpec('tip')!
    expect(getContainerSnippet('tip')).toBe(spec.example)
  })

  it('传 variantId 在 open 行追加 variant=xxx', () => {
    const snippet = getContainerSnippet('tip', { variantId: 'terminal' })
    const openLine = snippet.split('\n')[0]
    expect(openLine).toContain('variant=terminal')
  })

  it('再次传不同 variantId 会替换已有 variant=', () => {
    const first = getContainerSnippet('tip', { variantId: 'terminal' })
    const second = getContainerSnippet('tip', { variantId: 'pill-tag' })
    expect(second.split('\n')[0]).toContain('variant=pill-tag')
    expect(second.split('\n')[0]).not.toContain('terminal')
  })

  it('compare（fenceLength=4）的 open 行是 ::::开头', () => {
    const snippet = getContainerSnippet('compare')
    expect(snippet.split('\n')[0]).toMatch(/^::::/)
  })

  it('未知容器名抛 Error', () => {
    expect(() => getContainerSnippet('not-a-container')).toThrow(/Unknown container name/)
  })

  it('snippet 结尾有换行', () => {
    expect(getContainerSnippet('intro').endsWith('\n')).toBe(true)
  })
})
