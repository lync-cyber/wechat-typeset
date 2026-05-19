/**
 * @wechat-typeset/cli 命令催契约：直接调每个 Command.run，验证 schema 形态 +
 * 退出语义 + 主题敏感行为。这取代了过去 spawn skill 脚本走 stdout 的 contract test。
 */
import { describe, expect, it } from 'vitest'

import {
  COMMANDS,
  COMMAND_BY_NAME,
} from '../../packages/cli/src/commands/index'
import type { Command } from '../../packages/cli/src/types'
import { WtException } from '../../src/public'

async function expectWt(fn: () => unknown, code: string): Promise<void> {
  try {
    await fn()
  } catch (e) {
    expect(e).toBeInstanceOf(WtException)
    expect((e as WtException).code).toBe(code)
    return
  }
  throw new Error(`did not throw WtException(${code})`)
}

function get<I, O>(name: string): Command<I, O> {
  const c = COMMAND_BY_NAME.get(name)
  if (!c) throw new Error(`command not registered: ${name}`)
  return c as Command<I, O>
}

describe('command catalog · meta', () => {
  it('每个 command 暴露 name / description / inputSchema / outputSchema / run', () => {
    expect(COMMANDS.length).toBeGreaterThanOrEqual(12)
    for (const c of COMMANDS) {
      expect(c.name).toBeTruthy()
      expect(c.description.length).toBeGreaterThan(20)
      expect(c.inputSchema.type).toBe('object')
      expect(c.outputSchema).toBeTruthy()
      expect(typeof c.run).toBe('function')
    }
  })

  it('command 名字唯一', () => {
    const seen = new Set<string>()
    for (const c of COMMANDS) {
      expect(seen.has(c.name), `dup name: ${c.name}`).toBe(false)
      seen.add(c.name)
    }
  })

  it('describe 列出全部 commands（self-referential 包含自己）+ errorCodes/platforms/variantIds/signatureContainers/hardRules/inlineExtensions', async () => {
    const cmd = get<
      Record<string, never>,
      {
        version: string
        commands: Array<{ name: string }>
        errorCodes: Array<{ code: string; exitCode: number; description: string }>
        platforms: Array<{ id: string; name: string; status: string }>
        variantIds: Record<string, readonly string[]>
        signatureContainers: readonly string[]
        hardRules: {
          minFontSize: number
          minStrokeWidth: number
          allowedFontFamilies: readonly string[]
          hexPattern: string
        }
        inlineExtensions: Array<{ syntax: string; description: string; regex: string }>
      }
    >('describe')
    const out = await cmd.run({})
    expect(out.commands.length).toBe(COMMANDS.length)
    expect(out.version).toBeTruthy()
    expect(out.commands.some((c) => c.name === 'describe')).toBe(true)

    expect(out.errorCodes.length).toBeGreaterThanOrEqual(5)
    expect(out.errorCodes.find((e) => e.code === 'CONTRACT_VIOLATION')?.exitCode).toBe(4)

    expect(out.platforms.length).toBeGreaterThanOrEqual(1)
    expect(out.platforms.find((p) => p.id === 'wechat')).toBeTruthy()

    expect(out.variantIds.admonition).toContain('accent-bar')
    expect(out.signatureContainers.length).toBeGreaterThan(0)

    expect(out.hardRules.minFontSize).toBeGreaterThanOrEqual(14)
    expect(out.hardRules.minStrokeWidth).toBeGreaterThanOrEqual(1)
    expect(out.hardRules.allowedFontFamilies).toContain('sans-serif')

    expect(out.inlineExtensions.length).toBeGreaterThan(0)
    expect(out.inlineExtensions[0].syntax).toBeTruthy()
  })
})

describe('render', () => {
  it('persona path 出 HTML + wordCount + readingTime', async () => {
    const cmd = get<
      { md: string; persona: string },
      { html: string; wordCount: number; readingTime: number }
    >('render')
    const out = await cmd.run({
      md: '# 标题\n\n::: tip\n小贴士\n:::\n',
      persona: 'default',
    })
    expect(out.html).toContain('markdown-body')
    expect(out.html).toContain('小贴士')
    expect(out.wordCount).toBeGreaterThan(0)
    expect(out.readingTime).toBeGreaterThanOrEqual(1)
  })

  it('未知 persona → WtException RESOURCE_NOT_FOUND', async () => {
    const cmd = get<{ md: string; persona: string }, unknown>('render')
    await expectWt(() => cmd.run({ md: '# x', persona: 'no-such' }), 'RESOURCE_NOT_FOUND')
  })
})

describe('validate (deprecated alias) / validate spec / validate markdown', () => {
  it('validate spec · 合法 spec → ok=true', async () => {
    const personaGet = get<{ id: string }, unknown>('personas get')
    const spec = await personaGet.run({ id: 'default' })
    const cmd = get<{ spec: unknown }, { ok: boolean; errors: unknown[] }>('validate spec')
    const out = await cmd.run({ spec })
    expect(out.ok).toBe(true)
    expect(out.errors).toEqual([])
  })

  it('validate markdown · md+persona 不合法 → ok=false', async () => {
    const cmd = get<
      { md: string; persona: string },
      { ok: boolean; errors: Array<{ message: string }> }
    >('validate markdown')
    const out = await cmd.run({
      md: '# x',
      persona: 'no-such-persona',
    })
    expect(out.ok).toBe(false)
    expect(out.errors.length).toBeGreaterThan(0)
  })

  it('validate (deprecated) · input.spec=合法 → ok=true（向后兼容）', async () => {
    const personaGet = get<{ id: string }, unknown>('personas get')
    const spec = await personaGet.run({ id: 'default' })
    const cmd = get<{ spec: unknown }, { ok: boolean; errors: unknown[] }>('validate')
    const out = await cmd.run({ spec })
    expect(out.ok).toBe(true)
    expect(out.errors).toEqual([])
  })

  it('validate (deprecated) · spec 与 md 同时给 → ok=false + 明确报错', async () => {
    const cmd = get<
      { spec: unknown; md: string },
      { ok: boolean; errors: Array<{ message: string }> }
    >('validate')
    const out = await cmd.run({ spec: {}, md: '# x' })
    expect(out.ok).toBe(false)
    expect(out.errors[0]?.message).toMatch(/validate spec|validate markdown/)
  })

  it('validate (deprecated) · 未提供 spec 也未提供 md → ok=false', async () => {
    const cmd = get<Record<string, never>, { ok: boolean; errors: Array<{ message: string }> }>(
      'validate',
    )
    const out = await cmd.run({})
    expect(out.ok).toBe(false)
    expect(out.errors[0]?.message).toMatch(/requires either `spec` or `md`/)
  })

  it('validate / validate spec / validate markdown 三者 outputSchema 形态一致', () => {
    const a = COMMAND_BY_NAME.get('validate')!.outputSchema
    const b = COMMAND_BY_NAME.get('validate spec')!.outputSchema
    const c = COMMAND_BY_NAME.get('validate markdown')!.outputSchema
    expect(JSON.stringify(a)).toBe(JSON.stringify(b))
    expect(JSON.stringify(b)).toBe(JSON.stringify(c))
  })
})

describe('lint · 主题敏感', () => {
  const dataVizMd =
    ':::: kpi-dashboard KEY METRICS\n::: kpi-item label="x" value="42"\n:::\n::::\n'

  it('persona=default + pack:data-viz 容器 → 无 wrong_theme_namespace（pack 跨主题可用）', async () => {
    const cmd = get<
      { md: string; persona: string },
      {
        ok: boolean
        issues: Array<{ kind: string; severity: string }>
        warningCount: number
        errorCount: number
      }
    >('lint')
    const out = await cmd.run({ md: dataVizMd, persona: 'default' })
    expect(out.ok).toBe(true)
    expect(out.errorCount).toBe(0)
    const wrongNs = out.issues.filter((i) => i.kind === 'wrong_theme_namespace')
    expect(wrongNs.length).toBe(0)
  })

  it('persona=data-brief + pack:data-viz → 0 warning', async () => {
    const cmd = get<
      { md: string; persona: string },
      {
        ok: boolean
        warningCount: number
        effectivePersona?: string
        personaSource: string
      }
    >('lint')
    const out = await cmd.run({ md: dataVizMd, persona: 'data-brief' })
    expect(out.ok).toBe(true)
    expect(out.warningCount).toBe(0)
    expect(out.effectivePersona).toBe('data-brief')
    expect(out.personaSource).toBe('flag')
  })

  it('frontmatter theme: 覆盖 --persona', async () => {
    const md = `---\ntheme: data-brief\n---\n${dataVizMd}`
    const cmd = get<
      { md: string; persona: string },
      { effectivePersona?: string; personaSource: string; warningCount: number }
    >('lint')
    const out = await cmd.run({ md, persona: 'default' })
    expect(out.effectivePersona).toBe('data-brief')
    expect(out.personaSource).toBe('frontmatter')
    expect(out.warningCount).toBe(0)
  })

  it('无 persona 也无 frontmatter → 跳过主题敏感检查', async () => {
    const cmd = get<
      { md: string },
      {
        effectivePersona?: string
        personaSource: string
        issues: Array<{ kind: string }>
      }
    >('lint')
    const out = await cmd.run({ md: dataVizMd })
    expect(out.effectivePersona).toBeUndefined()
    expect(out.personaSource).toBe('none')
    const wrongNs = out.issues.filter((i) => i.kind === 'wrong_theme_namespace')
    expect(wrongNs.length).toBe(0)
  })

  it('frontmatter 非法 variant id → frontmatter_invalid warning', async () => {
    const md = '---\nvariants:\n  admonition: nope\n---\n::: tip\nok\n:::\n'
    const cmd = get<
      { md: string },
      { issues: Array<{ kind: string; severity: string }> }
    >('lint')
    const out = await cmd.run({ md })
    const fmIssues = out.issues.filter((i) => i.kind === 'frontmatter_invalid')
    expect(fmIssues.length).toBeGreaterThanOrEqual(1)
    expect(fmIssues[0].severity).toBe('warning')
  })

  it('未闭合 fence → ok=false', async () => {
    const cmd = get<
      { md: string },
      { ok: boolean; errorCount: number; issues: Array<{ kind: string }> }
    >('lint')
    const out = await cmd.run({ md: '::: tip 没闭合\nbody\n' })
    expect(out.ok).toBe(false)
    expect(out.errorCount).toBeGreaterThan(0)
    expect(out.issues.some((i) => i.kind === 'fence_not_closed')).toBe(true)
  })
})

describe('annotate', () => {
  it('patches 内嵌 capabilitySnapshot 字段', async () => {
    const cmd = get<
      { md: string; persona: string },
      {
        patches: Array<{ container: string }>
        capabilitySnapshot: {
          personaId: string
          defaultVariants: Record<string, string>
          containers: Array<{ id: string; available: boolean }>
        }
        blockCount: number
      }
    >('annotate')
    const out = await cmd.run({
      md: '# 标题\n\n本文将探讨一个简单话题——文章导语段，长度大致 80 字符以内即可清晰传达主题。\n\n## 一\n正文。\n\n## 二\n正文。\n\n## 三\n正文。\n',
      persona: 'default',
    })
    expect(out.capabilitySnapshot.personaId).toBe('default')
    expect(out.capabilitySnapshot.defaultVariants.admonition).toBe('accent-bar')
    expect(Array.isArray(out.capabilitySnapshot.containers)).toBe(true)
    const kpi = out.capabilitySnapshot.containers.find((c) => c.id === 'kpi-dashboard')
    expect(kpi?.available).toBe(true)
  })

  it('default 主题下 patches 不含 data-viz 容器（heuristic 无该容器的匹配规则）', async () => {
    const cmd = get<
      { md: string; persona: string },
      { patches: Array<{ container: string }> }
    >('annotate')
    const out = await cmd.run({
      md: '本文有数据：增长 87% 同比，500 万 DAU。营收 3 倍。\n',
      persona: 'default',
    })
    const themeOnly = new Set(['kpi-dashboard', 'kpi-item', 'bar-chart', 'bar'])
    for (const p of out.patches) {
      expect(themeOnly.has(p.container)).toBe(false)
    }
  })
})

describe('personas list / get / capabilities / recommend', () => {
  it('personas list 返回 PersonaSummary[]', async () => {
    const cmd = get<Record<string, never>, Array<{ id: string; palette: { primary: string } }>>(
      'personas list',
    )
    const out = await cmd.run({})
    expect(out.length).toBeGreaterThanOrEqual(14)
    expect(out[0].id).toBe('default')
    expect(out[0].palette.primary).toMatch(/^#/)
  })

  it('personas get 未知 id → WtException', async () => {
    const cmd = get<{ id: string }, unknown>('personas get')
    await expectWt(() => cmd.run({ id: 'no-such' }), 'RESOURCE_NOT_FOUND')
  })

  it('personas capabilities 包含 containers / defaultVariants / kickers', async () => {
    const cmd = get<
      { id: string },
      {
        persona: { id: string }
        containers: Array<{ id: string; available: boolean; namespace: string; pack: string }>
        defaultVariants: { admonition: string }
        recommendedVariants: Record<string, unknown>
        kickers: Record<string, string>
      }
    >('personas capabilities')
    const out = await cmd.run({ id: 'default' })
    expect(out.persona.id).toBe('default')
    expect(out.containers.length).toBeGreaterThan(30)
    expect(out.defaultVariants.admonition).toBe('accent-bar')
    expect(out.recommendedVariants).toHaveProperty('admonition')
    expect(out.kickers).toHaveProperty('qaBlock')
    const kpi = out.containers.find((c) => c.id === 'kpi-dashboard')
    expect(kpi?.available).toBe(true)
    expect(kpi?.namespace).toBe('pack')
    expect(kpi?.pack).toBe('pack:data-viz')
  })

  it('personas recommend 强匹配返回 top-1 满分', async () => {
    const cmd = get<
      { title: string; summary: string; topic: string; style: string },
      { ranked: Array<{ id: string; staticScore: number }>; recommendNew: boolean }
    >('personas recommend')
    const out = await cmd.run({
      title: 'Stripe API 教程',
      summary: 'step-by-step 接入指南',
      topic: '技术',
      style: 'Stripe Docs',
    })
    expect(out.ranked[0].id).toBe('tech-explainer')
    expect(out.ranked[0].staticScore).toBeGreaterThan(0.8)
    expect(out.recommendNew).toBe(false)
  })
})

describe('containers list / snippet', () => {
  it('containers list 返回非空 vocabulary', async () => {
    const cmd = get<
      Record<string, never>,
      Array<{ name: string; fenceLength: number; description: string }>
    >('containers list')
    const out = await cmd.run({})
    expect(out.length).toBeGreaterThan(30)
    expect(out.every((v) => typeof v.fenceLength === 'number')).toBe(true)
  })

  it('containers snippet tip → 含 "::: tip"', async () => {
    const cmd = get<{ name: string }, string>('containers snippet')
    const out = await cmd.run({ name: 'tip' })
    expect(out).toMatch(/::: tip/)
  })

  it('containers snippet 未知容器 → WtException', async () => {
    const cmd = get<{ name: string }, string>('containers snippet')
    await expectWt(() => cmd.run({ name: 'no-such-container' }), 'RESOURCE_NOT_FOUND')
  })
})

describe('motif render', () => {
  it('shape 路径出 SVG 字符串', async () => {
    const personaGet = get<{ id: string }, { motifs: { h2Prefix?: unknown } }>('personas get')
    const spec = await personaGet.run({ id: 'default' })
    expect(spec.motifs.h2Prefix).toBeTruthy()
    const cmd = get<{ shape: unknown }, string>('motif render')
    const svg = await cmd.run({ shape: spec.motifs.h2Prefix })
    expect(svg).toContain('<svg')
    expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"')
  })

  it('未给 shape 也未给 template → WtException', async () => {
    const cmd = get<Record<string, never>, string>('motif render')
    await expectWt(() => cmd.run({}), 'CONTRACT_VIOLATION')
  })

  it('shape 与 template 同时给 → WtException CONTRACT_VIOLATION', async () => {
    const personaGet = get<{ id: string }, { motifs: { h2Prefix?: unknown } }>('personas get')
    const spec = await personaGet.run({ id: 'default' })
    const cmd = get<{ shape: unknown; template: unknown }, string>('motif render')
    await expectWt(
      () => cmd.run({ shape: spec.motifs.h2Prefix, template: { primitives: [], placeholders: [] } }),
      'CONTRACT_VIOLATION',
    )
  })

  it('inputSchema 用 oneOf 表达 shape XOR template', () => {
    const schema = COMMAND_BY_NAME.get('motif render')!.inputSchema as { oneOf?: unknown[] }
    expect(Array.isArray(schema.oneOf)).toBe(true)
    expect(schema.oneOf!.length).toBe(2)
  })
})

describe('platforms list', () => {
  it('返回非空 platforms 数组并包含 wechat', async () => {
    const cmd = get<
      Record<string, never>,
      Array<{ id: string; name: string; status: string }>
    >('platforms list')
    const out = await cmd.run({})
    expect(out.length).toBeGreaterThanOrEqual(1)
    const wechat = out.find((p) => p.id === 'wechat')
    expect(wechat).toBeTruthy()
    expect(['stable', 'beta', 'placeholder']).toContain(wechat!.status)
  })
})

describe('render · platform enum', () => {
  it('render.inputSchema.platform 含 enum 列出已注册 ids', () => {
    const schema = COMMAND_BY_NAME.get('render')!.inputSchema as {
      properties: { platform: { enum?: string[] } }
    }
    const ids = schema.properties.platform.enum
    expect(Array.isArray(ids)).toBe(true)
    expect(ids).toContain('wechat')
  })
})

describe('containers snippet · persona 解析默认 variant', () => {
  it('persona=default + 容器 tip → snippet 含 default 主题的 admonition variant id', async () => {
    const cmd = get<{ name: string; persona: string }, string>('containers snippet')
    const out = await cmd.run({ name: 'tip', persona: 'default' })
    // default 主题 admonition variant 是 accent-bar
    expect(out).toMatch(/variant=accent-bar/)
  })

  it('persona 不影响无 variantKind 的容器（如 note 实际有 variantKind；用 abstract 这类无 variantKind 的）', async () => {
    // abstract 在 vocabulary 中无 variantKind（结构容器）；snippet 不包含 variant=
    const cmd = get<{ name: string; persona: string }, string>('containers snippet')
    const out = await cmd.run({ name: 'abstract', persona: 'default' })
    expect(out).not.toMatch(/variant=/)
  })

  it('未知 persona id → WtException RESOURCE_NOT_FOUND', async () => {
    const cmd = get<{ name: string; persona: string }, string>('containers snippet')
    await expectWt(
      () => cmd.run({ name: 'tip', persona: 'no-such-persona' }),
      'RESOURCE_NOT_FOUND',
    )
  })
})
