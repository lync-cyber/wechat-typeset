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
        commands: Array<{ name: string; readOnly: boolean }>
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

    // P1-5: RENDER_FAILED 独立 exitCode（与 CONTRACT_VIOLATION 区分）
    expect(out.errorCodes.length).toBeGreaterThanOrEqual(5)
    expect(out.errorCodes.find((e) => e.code === 'CONTRACT_VIOLATION')?.exitCode).toBe(4)
    expect(out.errorCodes.find((e) => e.code === 'RENDER_FAILED')?.exitCode).toBe(6)

    expect(out.platforms.length).toBeGreaterThanOrEqual(1)
    expect(out.platforms.find((p) => p.id === 'wechat')).toBeTruthy()

    expect(out.variantIds.admonition).toContain('accent-bar')
    expect(out.signatureContainers.length).toBeGreaterThan(0)

    expect(out.hardRules.minFontSize).toBeGreaterThanOrEqual(14)
    expect(out.hardRules.minStrokeWidth).toBeGreaterThanOrEqual(1)
    expect(out.hardRules.allowedFontFamilies).toContain('sans-serif')

    expect(out.inlineExtensions.length).toBeGreaterThan(0)
    expect(out.inlineExtensions[0].syntax).toBeTruthy()

    // P1-6: 所有 command 暴露 readOnly 字段（当前全部为 true）
    for (const c of out.commands) {
      expect(typeof c.readOnly).toBe('boolean')
    }
    expect(out.commands.every((c) => c.readOnly === true)).toBe(true)
  })

  it('所有 command 都标 readOnly: true（CLI 全部纯读）', () => {
    for (const c of COMMANDS) {
      expect(c.readOnly, `command ${c.name} missing readOnly`).toBe(true)
    }
  })
})

describe('deprecation aliases · 旧 bare-verb 仍工作但 description 前缀 DEPRECATED', () => {
  const ALIASES: Array<{ old: string; canonical: string }> = [
    { old: 'render', canonical: 'markdown render' },
    { old: 'lint', canonical: 'markdown lint' },
    { old: 'annotate', canonical: 'markdown annotate' },
    { old: 'annotate apply', canonical: 'markdown annotate apply' },
  ]

  it.each(ALIASES)('alias `$old` → canonical `$canonical`', ({ old, canonical }) => {
    const aliasCmd = COMMAND_BY_NAME.get(old)
    const canonicalCmd = COMMAND_BY_NAME.get(canonical)
    expect(aliasCmd, `alias not registered: ${old}`).toBeTruthy()
    expect(canonicalCmd, `canonical not registered: ${canonical}`).toBeTruthy()
    expect(aliasCmd!.description.startsWith('DEPRECATED alias of')).toBe(true)
    // alias 与 canonical 共享同一个 run 引用 —— 不拷贝业务逻辑
    expect(aliasCmd!.run).toBe(canonicalCmd!.run)
    expect(aliasCmd!.inputSchema).toBe(canonicalCmd!.inputSchema)
  })

  it('`render` alias 与 `markdown render` 同 run，行为一致', async () => {
    const oldRender = get<{ md: string; persona: string }, { html: string }>('render')
    const newRender = get<{ md: string; persona: string }, { html: string }>('markdown render')
    const args = { md: '# 标题\n\n::: tip\n小贴士\n:::\n', persona: 'default' }
    const a = await oldRender.run(args)
    const b = await newRender.run(args)
    expect(a.html).toBe(b.html)
  })
})

describe('new query endpoints (P1-2)', () => {
  it('containers get → 单个 ContainerSpec', async () => {
    const cmd = get<{ name: string }, { name: string; category: string; fenceLength: number }>(
      'containers get',
    )
    const out = await cmd.run({ name: 'tip' })
    expect(out.name).toBe('tip')
    expect(out.fenceLength).toBe(3)
  })

  it('containers get · 未知 → WtException RESOURCE_NOT_FOUND', async () => {
    const cmd = get<{ name: string }, unknown>('containers get')
    await expectWt(() => cmd.run({ name: 'no-such-container' }), 'RESOURCE_NOT_FOUND')
  })

  it('containers variants → 容器可切换的 variant 列表', async () => {
    const cmd = get<{ name: string }, Array<{ id: string }>>('containers variants')
    const out = await cmd.run({ name: 'tip' })
    expect(Array.isArray(out)).toBe(true)
    expect(out.some((v) => v.id === 'accent-bar')).toBe(true)
  })

  it('inline-extensions list → 非空', async () => {
    const cmd = get<Record<string, never>, Array<{ syntax: string }>>('inline-extensions list')
    const out = await cmd.run({})
    expect(out.length).toBeGreaterThan(0)
    expect(out.some((e) => e.syntax === '==mark==')).toBe(true)
  })

  it('inline-extensions snippet → inputExample', async () => {
    const cmd = get<{ syntax: string }, string>('inline-extensions snippet')
    const out = await cmd.run({ syntax: '==mark==' })
    expect(typeof out).toBe('string')
    expect(out.length).toBeGreaterThan(0)
  })

  it('persona motifs → 含 h2Prefix', async () => {
    const cmd = get<{ id: string }, { h2Prefix?: unknown }>('persona motifs')
    const out = await cmd.run({ id: 'default' })
    expect(out.h2Prefix).toBeTruthy()
  })

  it('frontmatter parse → 解析 theme 字段', async () => {
    const cmd = get<{ md: string }, { config: { theme?: string }; body: string }>('frontmatter parse')
    const out = await cmd.run({ md: '---\ntheme: swiss-grid\n---\n# Hi\n' })
    expect(out.config.theme).toBe('swiss-grid')
    expect(out.body).toContain('# Hi')
  })

  it('capabilities → schemaVersion + personas[] + containers[]', async () => {
    const cmd = get<
      Record<string, never>,
      { schemaVersion: string; personas: Array<{ id: string }>; containers: Array<{ id: string }> }
    >('capabilities')
    const out = await cmd.run({})
    expect(out.schemaVersion).toMatch(/^3\./)
    expect(out.personas.length).toBeGreaterThanOrEqual(14)
    expect(out.containers.length).toBeGreaterThan(30)
  })

  it('error-codes list → 含 RENDER_FAILED + 新 exitCode 6', async () => {
    const cmd = get<
      Record<string, never>,
      Array<{ code: string; exitCode: number; description: string }>
    >('error-codes list')
    const out = await cmd.run({})
    const rf = out.find((e) => e.code === 'RENDER_FAILED')
    expect(rf?.exitCode).toBe(6)
    const cv = out.find((e) => e.code === 'CONTRACT_VIOLATION')
    expect(cv?.exitCode).toBe(4)
  })

  it('schema get → PersonaSpec JSON Schema', async () => {
    const cmd = get<Record<string, never>, { type?: string; properties?: Record<string, unknown> }>(
      'schema get',
    )
    const out = await cmd.run({})
    expect(out.type).toBe('object')
    expect(out.properties).toHaveProperty('palette')
    expect(out.properties).toHaveProperty('variants')
  })
})

describe('markdown render · dryRun / asDocument (P2-3 / P2-5)', () => {
  it('dryRun=true → html 为空字符串、metadata 仍计算', async () => {
    const cmd = get<
      { md: string; persona: string; dryRun: boolean },
      { html: string; wordCount: number; readingTime: number; patchLog?: { entries: unknown[]; total: number } }
    >('markdown render')
    const out = await cmd.run({
      md: '# 标题\n\n本文一段正文，用于测试 wordCount / readingTime 计算。',
      persona: 'default',
      dryRun: true,
    })
    expect(out.html).toBe('')
    expect(out.wordCount).toBeGreaterThan(0)
    expect(out.readingTime).toBeGreaterThanOrEqual(1)
    expect(out.patchLog?.total).toBe(0)
  })

  it('asDocument=true → html 是完整 <!DOCTYPE html> 文档', async () => {
    const cmd = get<
      { md: string; persona: string; asDocument: boolean },
      { html: string }
    >('markdown render')
    const out = await cmd.run({
      md: '# 我的标题\n\n正文。',
      persona: 'default',
      asDocument: true,
    })
    expect(out.html.startsWith('<!DOCTYPE html>')).toBe(true)
    expect(out.html).toContain('<title>我的标题</title>')
    expect(out.html).toContain('</html>')
  })

  it('asDocument 无 H1 时 title 回退默认串', async () => {
    const cmd = get<
      { md: string; persona: string; asDocument: boolean },
      { html: string }
    >('markdown render')
    const out = await cmd.run({ md: '正文，没有 H1。', persona: 'default', asDocument: true })
    expect(out.html).toContain('<title>wechat-typeset 渲染</title>')
  })
})

describe('markdown render-batch (P2-1)', () => {
  it('多 persona 单次调用 → 每个 persona 一条结果', async () => {
    const cmd = get<
      { md: string; personas: string[] },
      {
        total: number
        succeeded: number
        failed: number
        results: Record<string, { ok: boolean; html?: string; code?: string }>
      }
    >('markdown render-batch')
    const out = await cmd.run({
      md: '# 标题\n\n::: tip\nbody\n:::\n',
      personas: ['default', 'tech-explainer'],
    })
    expect(out.total).toBe(2)
    expect(out.succeeded).toBe(2)
    expect(out.failed).toBe(0)
    expect(out.results.default.ok).toBe(true)
    expect(out.results['tech-explainer'].ok).toBe(true)
    expect(out.results.default.html).toContain('markdown-body')
  })

  it('部分 persona 失败时不中断 batch', async () => {
    const cmd = get<
      { md: string; personas: string[] },
      {
        total: number
        succeeded: number
        failed: number
        results: Record<string, { ok: boolean; code?: string }>
      }
    >('markdown render-batch')
    const out = await cmd.run({
      md: '# x',
      personas: ['default', 'no-such-persona', 'tech-explainer'],
    })
    expect(out.total).toBe(3)
    expect(out.succeeded).toBe(2)
    expect(out.failed).toBe(1)
    expect(out.results['no-such-persona'].ok).toBe(false)
    expect(out.results['no-such-persona'].code).toBe('RESOURCE_NOT_FOUND')
    expect(out.results.default.ok).toBe(true)
    expect(out.results['tech-explainer'].ok).toBe(true)
  })
})

describe('personas derive (P2-2)', () => {
  it('在 default 上 patch palette → 新 spec + meta.basedOn = default', async () => {
    const cmd = get<
      { base: string; patch: Record<string, unknown> },
      { spec: { id: string; palette: { primary: string }; meta?: { basedOn?: string } }; validation: { ok: boolean } }
    >('personas derive')
    const out = await cmd.run({
      base: 'default',
      patch: { palette: { primary: '#ff0000' } },
    })
    expect(out.spec.palette.primary).toBe('#ff0000')
    expect(out.spec.id).toMatch(/^default-derived-/)
    expect(out.spec.meta?.basedOn).toBe('default')
    expect(out.validation.ok).toBe(true)
  })

  it('未知 base → WtException RESOURCE_NOT_FOUND', async () => {
    const cmd = get<{ base: string; patch: Record<string, unknown> }, unknown>('personas derive')
    await expectWt(() => cmd.run({ base: 'no-such', patch: {} }), 'RESOURCE_NOT_FOUND')
  })
})

describe('list filters (P2-4)', () => {
  it('containers list --category admonition → 仅 admonition 类容器', async () => {
    const cmd = get<{ category: string }, Array<{ category: string }>>('containers list')
    const out = await cmd.run({ category: 'admonition' })
    expect(out.length).toBeGreaterThan(0)
    expect(out.every((c) => c.category === 'admonition')).toBe(true)
  })

  it('containers list --pack pack:data-viz → 仅 data-viz 包容器', async () => {
    const cmd = get<{ pack: string }, Array<{ category: string }>>('containers list')
    const out = await cmd.run({ pack: 'pack:data-viz' })
    expect(out.length).toBeGreaterThan(0)
  })

  it('containers list 不传过滤参数 → 全集', async () => {
    const cmd = get<Record<string, never>, Array<unknown>>('containers list')
    const out = await cmd.run({})
    expect(out.length).toBeGreaterThan(30)
  })

  it('personas list --audience 散文 → 散文相关主题', async () => {
    const cmd = get<{ audience: string }, Array<{ id: string; audience: string }>>('personas list')
    const out = await cmd.run({ audience: '散文' })
    expect(out.length).toBeGreaterThan(0)
    expect(out.every((p) => p.audience.toLowerCase().includes('散文'))).toBe(true)
  })

  it('personas list --topic 技术 → 技术相关主题（在 audience+description 中匹配）', async () => {
    const cmd = get<{ topic: string }, Array<{ id: string }>>('personas list')
    const out = await cmd.run({ topic: '技术' })
    expect(out.length).toBeGreaterThan(0)
    expect(out.some((p) => p.id === 'tech-explainer')).toBe(true)
  })
})

describe('personas recommend · vibe/audience optional fields (P1-4)', () => {
  it('只给 vibe 也能跑出 ranked[3]', async () => {
    const cmd = get<
      { vibe: string },
      {
        ranked: Array<{ id: string; staticScore: number; staticReasons: string[] }>
        recommendNew: boolean
      }
    >('personas recommend')
    const out = await cmd.run({ vibe: '暖米底圆角，慢生活散文气质' })
    expect(out.ranked.length).toBe(3)
    // staticReasons 应该提到 vibe
    const r0Reasons = out.ranked[0].staticReasons.join(' ')
    expect(r0Reasons).toMatch(/vibe/)
  })

  it('全空 input → WtException CONTRACT_VIOLATION', async () => {
    const cmd = get<Record<string, never>, unknown>('personas recommend')
    await expectWt(() => cmd.run({}), 'CONTRACT_VIOLATION')
  })

  it('inputSchema: title / summary 均为 optional', () => {
    const schema = COMMAND_BY_NAME.get('personas recommend')!.inputSchema as {
      required?: string[]
      properties: Record<string, unknown>
    }
    expect(schema.required ?? []).not.toContain('title')
    expect(schema.required ?? []).not.toContain('summary')
    expect(schema.properties).toHaveProperty('vibe')
    expect(schema.properties).toHaveProperty('audience')
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

describe('annotate apply', () => {
  type ApplyInput = {
    md: string
    patches: Array<{
      line: number
      endLine: number
      kind: string
      container: string
      variant?: string
    }>
  }
  type ApplyOutput = {
    md: string
    applied: number
    skipped: Array<{ patch: { container: string; kind: string }; reason: string }>
  }

  it('wrap_paragraph → ::: tip 包裹原段落', async () => {
    const cmd = get<ApplyInput, ApplyOutput>('annotate apply')
    const md = ['# 标题', '', '⚠️ 注意：草稿自动保存。'].join('\n')
    const out = await cmd.run({
      md,
      patches: [
        { line: 3, endLine: 3, kind: 'wrap_paragraph', container: 'warning' },
      ],
    })
    expect(out.applied).toBe(1)
    expect(out.skipped).toEqual([])
    expect(out.md).toContain('::: warning')
    expect(out.md).toContain('⚠️ 注意：草稿自动保存。')
    expect(out.md.split('\n').filter((l) => l === ':::').length).toBe(1)
  })

  it('wrap_blockquote → ::: quote-card 并剥离 `> ` 前缀', async () => {
    const cmd = get<ApplyInput, ApplyOutput>('annotate apply')
    const md = ['# 标题', '', '> 一段引文。', '> 续行。'].join('\n')
    const out = await cmd.run({
      md,
      patches: [{ line: 3, endLine: 4, kind: 'wrap_blockquote', container: 'quote-card' }],
    })
    expect(out.applied).toBe(1)
    expect(out.md).toContain('::: quote-card')
    expect(out.md).toContain('一段引文。')
    expect(out.md).not.toContain('> 一段引文。')
  })

  it('convert_list → ::: steps 包裹有序列表', async () => {
    const cmd = get<ApplyInput, ApplyOutput>('annotate apply')
    const md = ['# 标题', '', '1. 打开 X', '2. 切换 Y', '3. 运行 Z'].join('\n')
    const out = await cmd.run({
      md,
      patches: [{ line: 3, endLine: 5, kind: 'convert_list', container: 'steps' }],
    })
    expect(out.applied).toBe(1)
    expect(out.md).toMatch(/::: steps\n1\. 打开 X\n2\. 切换 Y\n3\. 运行 Z\n:::/)
  })

  it('wrap_section_title → ::: section-title 并剥离 `## ` 前缀', async () => {
    const cmd = get<ApplyInput, ApplyOutput>('annotate apply')
    const md = ['# H1', '', '## 第二章', '正文。'].join('\n')
    const out = await cmd.run({
      md,
      patches: [{ line: 3, endLine: 3, kind: 'wrap_section_title', container: 'section-title' }],
    })
    expect(out.applied).toBe(1)
    expect(out.md).toMatch(/::: section-title\n第二章\n:::/)
  })

  it('variant 字段被写到 open 行', async () => {
    const cmd = get<ApplyInput, ApplyOutput>('annotate apply')
    const md = ['段落。'].join('\n')
    const out = await cmd.run({
      md,
      patches: [
        { line: 1, endLine: 1, kind: 'wrap_paragraph', container: 'tip', variant: 'pill-tag' },
      ],
    })
    expect(out.md).toContain('::: tip variant=pill-tag')
  })

  it('多 patch 按 line 降序应用，前面 patch 行号不漂移', async () => {
    const cmd = get<ApplyInput, ApplyOutput>('annotate apply')
    const md = ['段落 A。', '', '段落 B。'].join('\n')
    const out = await cmd.run({
      md,
      patches: [
        { line: 1, endLine: 1, kind: 'wrap_paragraph', container: 'tip' },
        { line: 3, endLine: 3, kind: 'wrap_paragraph', container: 'warning' },
      ],
    })
    expect(out.applied).toBe(2)
    expect(out.md.split('\n')).toEqual([
      '::: tip',
      '段落 A。',
      ':::',
      '',
      '::: warning',
      '段落 B。',
      ':::',
    ])
  })

  it('overlap 的 patch 被 skipped 报告', async () => {
    const cmd = get<ApplyInput, ApplyOutput>('annotate apply')
    const md = ['段落 A。', '段落 B。'].join('\n')
    const out = await cmd.run({
      md,
      patches: [
        { line: 1, endLine: 2, kind: 'wrap_paragraph', container: 'tip' },
        { line: 2, endLine: 2, kind: 'wrap_paragraph', container: 'warning' },
      ],
    })
    expect(out.applied).toBe(1)
    expect(out.skipped.length).toBe(1)
    expect(out.skipped[0].reason).toMatch(/overlap/i)
  })

  it('invalid 行号 → skipped + 原 md 不变', async () => {
    const cmd = get<ApplyInput, ApplyOutput>('annotate apply')
    const md = '一行。'
    const out = await cmd.run({
      md,
      patches: [{ line: 5, endLine: 7, kind: 'wrap_paragraph', container: 'tip' }],
    })
    expect(out.applied).toBe(0)
    expect(out.skipped[0].reason).toMatch(/invalid range/)
    expect(out.md).toBe(md)
  })

  it('未知 container → skipped', async () => {
    const cmd = get<ApplyInput, ApplyOutput>('annotate apply')
    const md = '一行。'
    const out = await cmd.run({
      md,
      patches: [
        { line: 1, endLine: 1, kind: 'wrap_paragraph', container: 'no-such-container' },
      ],
    })
    expect(out.applied).toBe(0)
    expect(out.skipped[0].reason).toMatch(/unknown container/)
  })

  it('wrap_pros_cons → skipped（要求人工构造）', async () => {
    const cmd = get<ApplyInput, ApplyOutput>('annotate apply')
    const md = ['- 优点 A', '- 缺点 B'].join('\n')
    const out = await cmd.run({
      md,
      patches: [{ line: 1, endLine: 2, kind: 'wrap_pros_cons', container: 'compare' }],
    })
    expect(out.applied).toBe(0)
    expect(out.skipped[0].reason).toMatch(/wrap_pros_cons|containers snippet/)
  })

  it('compare 容器（4-fence）会用 :::: 而非 :::', async () => {
    // 注：当前 annotate 不会产出 wrap_pros_cons，但若 LLM 手工拼一个 wrap_paragraph + compare
    // 容器，apply 应正确选 4-fence。
    const cmd = get<ApplyInput, ApplyOutput>('annotate apply')
    const md = '占位。'
    const out = await cmd.run({
      md,
      patches: [{ line: 1, endLine: 1, kind: 'wrap_paragraph', container: 'compare' }],
    })
    expect(out.applied).toBe(1)
    expect(out.md.startsWith(':::: compare')).toBe(true)
    expect(out.md.endsWith('::::')).toBe(true)
  })

  it('annotate → annotate apply 端到端：能消化 annotate 输出的 patches[]', async () => {
    const annotate = get<
      { md: string; persona: string },
      { patches: Array<{ line: number; endLine: number; kind: string; container: string }> }
    >('annotate')
    const apply = get<ApplyInput, ApplyOutput>('annotate apply')
    const md = [
      '# 标题',
      '',
      '本文将探讨一个并不简单的话题——文章首段总览，长度大致八十到二百字符之间能让读者迅速建立预期；过短则失去导言价值，过长则与正文重叠。这里给一个合规的样例段落用于触发 wrap_first_paragraph 启发式。',
      '',
      '## 一',
      '正文。',
      '',
      '## 二',
      '正文。',
      '',
      '## 三',
      '正文。',
    ].join('\n')
    const annot = await annotate.run({ md, persona: 'default' })
    expect(annot.patches.length).toBeGreaterThan(0)
    const hasFirstPara = annot.patches.some((p) => p.kind === 'wrap_first_paragraph')
    expect(hasFirstPara).toBe(true)
    const out = await apply.run({ md, patches: annot.patches })
    expect(out.applied + out.skipped.length).toBe(annot.patches.length)
    expect(out.applied).toBeGreaterThan(0)
    expect(out.md).toMatch(/::: (intro|abstract)/)
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
