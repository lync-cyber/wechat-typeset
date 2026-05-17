/**
 * variant-sanity 系列 spec 共享的 case 构造 + 断言原语。
 *
 * 拆出的动机：主矩阵 / codeBlock 矩阵 / 默认主题快照三组分别住 3 个 spec 文件后
 * vitest 才能把它们分摊到不同 worker 并行跑。共享 CASES 与 assert* 避免重复。
 */

import { expect } from 'vitest'
import { VARIANT_IDS, type VariantKind } from '../../src/core/themes/types'
import { FORBIDDEN_CSS_PATTERNS } from '../../src/core/pipeline/rules'
import { checkVariantCompat } from '../../src/core/pipeline/containers/_shared/themeCompatGuard'
import { ALL_VARIANT_DEFS } from '../../src/core/variants/registry'

export type Kind = VariantKind
export type VariantCase = {
  kind: Kind
  id: string
  /** 用于生成 markdown fence 的容器名 */
  containerName: string
  md: string
}

/** 构造 11 大类的测试 fence */
export function buildCases(): VariantCase[] {
  const out: VariantCase[] = []
  for (const id of VARIANT_IDS.admonition) {
    out.push({
      kind: 'admonition',
      id,
      containerName: 'tip',
      md: `::: tip 测试标题 variant=${id}\n第一行正文。\n第二行正文，含 ==高亮== 与 \`code\`。\n:::\n`,
    })
  }
  for (const id of VARIANT_IDS.quote) {
    out.push({
      kind: 'quote',
      id,
      containerName: 'quote-card',
      md: `::: quote-card 苏轼 variant=${id}\n人生如逆旅，我亦是行人。\n:::\n`,
    })
  }
  for (const id of VARIANT_IDS.compare) {
    out.push({
      kind: 'compare',
      id,
      containerName: 'compare',
      md:
        `:::: compare variant=${id}\n\n` +
        `::: pros 正方\n- 要点 A\n- 要点 B\n:::\n\n` +
        `::: cons 反方\n- 要点 C\n- 要点 D\n:::\n\n` +
        `::::\n`,
    })
  }
  for (const id of VARIANT_IDS.steps) {
    out.push({
      kind: 'steps',
      id,
      containerName: 'steps',
      md:
        `::: steps 操作步骤 variant=${id}\n` +
        `### 第一步\n准备材料。\n\n` +
        `### 第二步\n下锅翻炒。\n\n` +
        `### 第三步\n起锅装盘。\n` +
        `:::\n`,
    })
  }
  for (const id of VARIANT_IDS.divider) {
    out.push({
      kind: 'divider',
      id,
      containerName: 'divider',
      md: `::: divider variant=${id}${id === 'glyph' ? ' glyph=◆' : ''}\n:::\n`,
    })
  }
  for (const id of VARIANT_IDS.sectionTitle) {
    out.push({
      kind: 'sectionTitle',
      id,
      containerName: 'section-title',
      md: `::: section-title 章节标题 variant=${id}\n:::\n`,
    })
  }
  for (const id of VARIANT_IDS.pullQuote) {
    out.push({
      kind: 'pullQuote',
      id,
      containerName: 'pull-quote',
      md: `::: pull-quote variant=${id}\n我们以为在阅读，其实只是在滑动。\n:::\n`,
    })
  }
  for (const id of VARIANT_IDS.announcement) {
    out.push({
      kind: 'announcement',
      id,
      containerName: 'announcement',
      md: `::: announcement tone=danger variant=${id} 测试通告\n本期推送涉及账号迁移说明。\n:::\n`,
    })
  }
  for (const id of VARIANT_IDS.tableCard) {
    out.push({
      kind: 'tableCard',
      id,
      containerName: 'table-card',
      md:
        `:::: table-card 规格对比 variant=${id}\n` +
        `::: table-row header=true cells="型号 | 容量 | 价格"\n:::\n` +
        `::: table-row cells="A | 256G | ¥6999"\n:::\n` +
        `::: table-row cells="B | 512G | ¥8999"\n:::\n` +
        `::::\n`,
    })
  }
  for (const id of VARIANT_IDS.gallery) {
    out.push({
      kind: 'gallery',
      id,
      containerName: 'gallery',
      md:
        `:::: gallery 春夏秋冬 variant=${id}\n` +
        `::: image-item src="https://placehold.co/400" alt="A" 春\n:::\n` +
        `::: image-item src="https://placehold.co/400" alt="B" 夏\n:::\n` +
        `::::\n`,
    })
  }
  for (const id of VARIANT_IDS.dialogue) {
    out.push({
      kind: 'dialogue',
      id,
      containerName: 'dialogue',
      md:
        `:::: dialogue 主编访谈 variant=${id}\n` +
        `::: dialogue-turn name="主持人" role="Q"\n你怎么看这次转向？\n:::\n` +
        `::: dialogue-turn name="张三" role="A"\n转向是必然的，但节奏会更慢。\n:::\n` +
        `::::\n`,
    })
  }
  return out
}

export const CASES = buildCases()

/** 禁用模式来自 src/core/pipeline/rules.ts · FORBIDDEN_CSS_PATTERNS（单一事实来源） */
export function assertNoForbiddenCss(html: string, label: string): void {
  for (const [pattern, reason] of FORBIDDEN_CSS_PATTERNS) {
    if (pattern.test(html)) {
      throw new Error(`[${label}] 产出命中禁用 CSS：${reason}. match=${html.match(pattern)?.[0]}`)
    }
  }
}

/** 抓出所有 inline SVG 片段 */
function extractSvgs(html: string): string[] {
  const out: string[] = []
  const re = /<svg[\s\S]*?<\/svg>/gi
  let m: RegExpExecArray | null
  while ((m = re.exec(html)) !== null) out.push(m[0])
  return out
}

export function assertSvgSafe(html: string, label: string): void {
  for (const svg of extractSvgs(html)) {
    expect(svg, `${label} · SVG 含 id=`).not.toMatch(/\sid="/)
    expect(svg, `${label} · SVG 含 url('`).not.toMatch(/url\(['"]/)
  }
}

/**
 * 在主题 themeId 下，variant id 是否会被 themeCompat 守卫拦截并降级。
 * 矩阵 spec 用它跳过"variant class 含 id"的断言——降级后 wrapper class 是
 * fallback id 而非 c.id，但基础 class + CSS/SVG 安全断言仍要跑。
 */
export function isCompatBlocked(themeId: string, variantId: string): boolean {
  const def = ALL_VARIANT_DEFS.find((d) => d.meta.id === variantId)
  if (!def) return false
  return !checkVariantCompat(themeId, def.meta).ok
}
