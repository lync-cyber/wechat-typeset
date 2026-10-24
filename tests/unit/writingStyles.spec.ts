import { describe, expect, it } from 'vitest'
import { buildWritingPrompt, DEFAULT_CLICHES, defaultWritingStyles, parseWritingStylesJSON } from '../../src/domain/publish/writingStyles'

describe('写作风格配置', () => {
  it('默认深度研究保留完整指引和 20—40 条套话，副本互不污染', () => {
    const first = defaultWritingStyles()
    const second = defaultWritingStyles()
    expect(DEFAULT_CLICHES.length).toBeGreaterThanOrEqual(20)
    expect(DEFAULT_CLICHES.length).toBeLessThanOrEqual(40)
    expect(first.styles[0].structure).toContain('系列递进')
    expect(first.styles[0].structure).toContain('5—7')
    expect(first.styles[0].evidence).toContain('分析推断')
    expect(first.styles[0].visuals).toContain('AI 生成图片必须标注')
    expect(first.styles[0].review).toContain('主动分享理由')
    first.styles[0].rules.phrases.push('自定义')
    expect(second.styles[0].rules.phrases).not.toContain('自定义')
  })

  it('合法 JSON 往返；不将用户输入的规则当成正则校验', () => {
    const doc = defaultWritingStyles()
    doc.styles[0].rules.patterns = ['(a+)+$……[x]']
    const parsed = parseWritingStylesJSON(JSON.stringify(doc))
    expect(parsed).toEqual({ ok: true, value: doc })
  })

  it('损坏 JSON、重复 ID、丢失默认风格和逆序范围均返回错误', () => {
    expect(parseWritingStylesJSON('{')).toMatchObject({ ok: false })
    const duplicate = defaultWritingStyles()
    duplicate.styles.push(structuredClone(duplicate.styles[0]))
    expect(parseWritingStylesJSON(JSON.stringify(duplicate))).toMatchObject({ ok: false, error: expect.stringContaining('重复') })
    const missing = defaultWritingStyles()
    missing.defaultId = 'missing'
    expect(parseWritingStylesJSON(JSON.stringify(missing))).toMatchObject({ ok: false, error: expect.stringContaining('不存在') })
    const reversed = defaultWritingStyles()
    reversed.styles[0].rules.maxWords = 100
    expect(parseWritingStylesJSON(JSON.stringify(reversed))).toMatchObject({ ok: false, error: expect.stringContaining('下限') })
  })

  it('拒绝非法类型、未知字段和无限制大词表，防止静默丢配置', () => {
    const unknown = { ...defaultWritingStyles(), futureSetting: true }
    expect(parseWritingStylesJSON(JSON.stringify(unknown))).toMatchObject({ ok: false })
    const invalid = defaultWritingStyles()
    invalid.styles[0].rules.phrases = Array.from({ length: 61 }, (_, index) => String(index))
    expect(parseWritingStylesJSON(JSON.stringify(invalid))).toMatchObject({ ok: false })
    const malformed = JSON.parse(JSON.stringify(defaultWritingStyles()))
    malformed.styles[0].rules.minWords = '2000'
    expect(parseWritingStylesJSON(JSON.stringify(malformed))).toMatchObject({ ok: false })
  })
})

describe('复制创作指令', () => {
  it('从选中的配置生成，使用 article.md/frontmatter/images 与现有容器', () => {
    const style = defaultWritingStyles().styles[0]
    style.name = '测试风格'
    style.rules.minWords = 800
    const prompt = buildWritingPrompt(style)
    expect(prompt).toContain('写作风格：测试风格')
    expect(prompt).toContain('800—3000 字')
    expect(prompt).toContain('<日期-slug>/article.md')
    expect(prompt).toContain('writingStyle 使用 "deep-research"')
    expect(prompt).toContain('images/')
    expect(prompt).toContain('本仓库现有 ::: 容器语法')
    expect(prompt).not.toContain('meta.json')
  })
})
