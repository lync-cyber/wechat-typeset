/**
 * `variant diff-geometry` —— LLM 写完 variant.ts 后调本工具拿"结构化差异"反馈，
 * 代替"看截图调像素"的低信噪比循环。
 *
 * 流程：
 *   1. 读 docs/generated/design-ir/<kind>.<variantId>.json （baseline）
 *   2. 跑 pipelineRender 生成实际 HTML
 *   3. 用 parseRenderedToIR 把 HTML 切回 IR 形态
 *   4. compareGeometry(baseline, actual) 输出 diff[]
 *
 * 没有 baseline IR = 'IR_MISSING' 错（提示先跑 tools/extract-design-ir.ts）。
 * variantId 在实现侧未注册 = 渲染会 fallback 到默认骨架，actual 解析得到的是
 * fallback 输出—diff 会浮现"motif 完全消失"的差异，但本工具不替主调代填语义。
 */

import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  render as pipelineRender,
  WtException,
} from '../../../../src/public'
import {
  compareGeometry,
  type DesignIR,
  type GeometryDiff,
} from '../../../../src/core/design-ir'
import { parseRenderedToIR } from './_shared/parse-rendered-ir'
import type { Command } from '../types'

interface DiffGeometryInput {
  /** variant kind（如 'admonition' / 'note' / 'quote'）。kebab 与 variant 注册表对齐。 */
  kind: string
  /** variant id（如 'paper-slip' / 'numbered-rule'）。 */
  variantId: string
  /**
   * 实现主题 id。省略 = 用 baseline.recommendedThemeId（从设计稿 designTheme 映射）。
   */
  themeId?: string
  /**
   * markdown fence 名（'tip' / 'warning' / 'note' / 'quote-card'）。admonition 默认 'tip'，
   * 其余按 kind 推。明确指定可覆盖。
   */
  containerName?: string
  /**
   * 测试 markdown。省略 = 按 kind 用一个最小骨架。
   *
   * 例（admonition）：'::: tip 告示 variant=paper-slip\n正文示例\n:::\n'
   */
  markdown?: string
}

export interface DiffGeometryOutput {
  baseline: {
    file: string
    line: number
    varIdLabel: string
    designTheme: string
    recommendedThemeId: string
  }
  themeIdUsed: string
  wrapperClassName: string
  diffs: GeometryDiff[]
  /** error / warning / info 计数。LLM 据此判断"是否对齐"。 */
  summary: {
    error: number
    warning: number
    info: number
  }
}

const KIND_TO_DEFAULT_FENCE: Record<string, string> = {
  admonition: 'tip',
  note: 'note',
  quote: 'quote-card',
  highlight: 'highlight',
  'pull-quote': 'pull-quote',
  pullQuote: 'pull-quote',
  compare: 'compare',
  steps: 'steps',
  dialogue: 'dialogue',
  qaBlock: 'qa-block',
  'qa-block': 'qa-block',
  tableCard: 'table-card',
  'table-card': 'table-card',
  gallery: 'gallery',
  announcement: 'announcement',
  recommend: 'recommend',
  qrcode: 'qrcode',
  divider: 'divider',
  sectionTitle: 'section-title',
  'section-title': 'section-title',
  footnotes: 'footnotes',
  footerCta: 'footer-cta',
  'footer-cta': 'footer-cta',
}

function defaultMarkdownFor(kind: string, fence: string, variantId: string): string {
  switch (kind) {
    case 'admonition':
      return `::: ${fence} 告示 variant=${variantId}\n正文示例\n:::\n`
    case 'note':
      return `::: note variant=${variantId}\n按语正文\n:::\n`
    case 'quote':
      return `::: quote-card 作者 variant=${variantId}\n金句示例\n:::\n`
    case 'highlight':
      return `::: highlight variant=${variantId}\n强调短句\n:::\n`
    case 'pull-quote':
    case 'pullQuote':
      return `::: pull-quote variant=${variantId}\n醒目引文\n:::\n`
    case 'divider':
      return `::: divider variant=${variantId}\n:::\n`
    case 'section-title':
    case 'sectionTitle':
      return `::: section-title 章节标题 variant=${variantId}\n:::\n`
    default:
      return `::: ${fence} variant=${variantId}\n示例正文\n:::\n`
  }
}

function loadBaselineIR(repoRoot: string, kind: string, variantId: string): DesignIR {
  const file = resolve(repoRoot, 'docs/generated/design-ir', `${kind}.${variantId}.json`)
  if (!existsSync(file)) {
    throw new WtException('RESOURCE_NOT_FOUND', [
      {
        message: `baseline IR 缺失：${file}`,
        severity: 'error',
        path: `design-ir.${kind}.${variantId}`,
        hint: '先跑 `pnpm tsx tools/extract-design-ir.ts` 生成 IR；若设计稿尚无此 variant 卡片，先在 content-*.html 加 .variant 块。',
      },
    ])
  }
  return JSON.parse(readFileSync(file, 'utf8')) as DesignIR
}

export const variantDiffGeometryCommand: Command<DiffGeometryInput, DiffGeometryOutput> = {
  name: 'variant diff-geometry',
  description:
    [
      'Compare a variant render output against its design-IR baseline (geometry diff).',
      'Returns a structured list of mismatches (display / width / padding / font-size / line-height / color literal).',
      'Use this INSTEAD of screenshot comparison to converge on a design baseline.',
    ].join(' '),
  inputSchema: {
    type: 'object',
    properties: {
      kind: {
        type: 'string',
        description: 'variant kind, kebab-case (admonition / note / quote / highlight / pull-quote / compare / steps / divider / section-title / table-card / gallery / dialogue / qa-block).',
      },
      variantId: {
        type: 'string',
        description: 'variant id (e.g. "paper-slip", "numbered-rule"). Must match src/core/variants/{kind}/{id}.ts.',
      },
      themeId: {
        type: 'string',
        description: 'Implementation theme id. Defaults to the recommended theme of the design-IR (designTheme → recommendedThemeId).',
      },
      containerName: {
        type: 'string',
        description: 'Markdown fence name (tip / note / quote-card / pull-quote / ...). Defaults to the canonical fence for the kind.',
      },
      markdown: {
        type: 'string',
        description: 'Override markdown to render. Defaults to a minimal fence for the kind/variant.',
      },
    },
    required: ['kind', 'variantId'],
    additionalProperties: false,
  },
  outputSchema: {
    type: 'object',
    properties: {
      baseline: { type: 'object', additionalProperties: true },
      themeIdUsed: { type: 'string' },
      wrapperClassName: { type: 'string' },
      diffs: { type: 'array' },
      summary: { type: 'object', additionalProperties: true },
    },
    required: ['baseline', 'themeIdUsed', 'wrapperClassName', 'diffs', 'summary'],
  },
  readOnly: true,
  async run(input) {
    const repoRoot = resolve(import.meta.dirname, '../../../..')
    const baseline = loadBaselineIR(repoRoot, input.kind, input.variantId)
    const themeIdUsed = input.themeId ?? baseline.recommendedThemeId

    const fence = input.containerName ?? KIND_TO_DEFAULT_FENCE[input.kind] ?? input.kind
    const md = input.markdown ?? defaultMarkdownFor(input.kind, fence, input.variantId)
    const out = pipelineRender({ md, persona: themeIdUsed })
    const actual = parseRenderedToIR(out.html, fence, input.variantId, baseline.designTheme)
    if (!actual) {
      throw new WtException('RENDER_FAILED', [
        {
          message: `actual wrapper not found: class .container-${fence}--${input.variantId}`,
          severity: 'error',
          path: `variant.${input.kind}.${input.variantId}`,
          hint: 'variant 未注册到注册表，或 ctx fallback 到了其它 id。检查 src/core/variants/' + input.kind + '/_all.ts。',
        },
      ])
    }

    const diffs: GeometryDiff[] = []
    diffs.push(...compareGeometry(baseline.wrapper, actual.wrapper, 'wrapper'))
    // 对齐 slot：先按 role 配对，再按位置兜底
    const matched = new Set<number>()
    baseline.slots.forEach((b, bi) => {
      let pairIdx = actual.slots.findIndex(
        (a, ai) => !matched.has(ai) && a.role === b.role,
      )
      if (pairIdx < 0) pairIdx = bi < actual.slots.length && !matched.has(bi) ? bi : -1
      if (pairIdx < 0) {
        diffs.push({
          path: `slot[${bi}/${b.role}]`,
          prop: '__missing__',
          baseline: 'present',
          actual: null,
          severity: 'error',
          hint: `baseline 有 slot role='${b.role}'，actual 未渲染对应节点`,
        })
        return
      }
      matched.add(pairIdx)
      const a = actual.slots[pairIdx]
      diffs.push(...compareGeometry(b.box, a.box, `slot[${bi}/${b.role}]`))
      // slot 文字锚点
      if (b.slotText && a.slotText !== b.slotText) {
        diffs.push({
          path: `slot[${bi}/${b.role}].slotText`,
          prop: 'slotText',
          baseline: b.slotText,
          actual: a.slotText ?? null,
          severity: 'error',
          hint: `slot 装饰文字不一致（baseline="${b.slotText}"）`,
        })
      }
    })
    actual.slots.forEach((a, ai) => {
      if (matched.has(ai)) return
      diffs.push({
        path: `slot[${ai}/${a.role}]`,
        prop: '__extra__',
        baseline: null,
        actual: 'present',
        severity: 'info',
        hint: `actual 额外渲染了 slot role='${a.role}'`,
      })
    })

    const summary = { error: 0, warning: 0, info: 0 }
    for (const d of diffs) summary[d.severity]++

    return {
      baseline: {
        file: baseline.source.file,
        line: baseline.source.line,
        varIdLabel: baseline.source.varIdLabel,
        designTheme: baseline.designTheme,
        recommendedThemeId: baseline.recommendedThemeId,
      },
      themeIdUsed,
      wrapperClassName: actual.wrapperClassName,
      diffs,
      summary,
    }
  },
}
