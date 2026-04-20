/**
 * themeToSpec：Theme → PersonaSpec 的一次性迁移助手。
 *
 * 用途：Phase 2 每主题 PR 的"code 侧 spec 初稿"—— 跑 themeToSpec(themeRegistry[id])
 * 得到可直接写入 persona.spec.ts 的对象，与 gallery 侧的 spec 做 3-way merge。
 *
 * 限制：motif 的 SVG 字符串 → JSON AST 的反向解析**不做**（复杂度高、容错差）。
 * Phase 2 的流程是：
 *   1. 用本函数抽出 palette/typography/variants/behavior/elements-containers-inline/templates
 *   2. motifs 留空或从 `extract-from-gallery.ts` 补齐（Phase 2 脚本）
 *   3. 人工 review + 调色
 *
 * PR 3-11 用完后本文件可删除。
 */

import type { Theme } from '../../types'
import { baseContainers, baseElements, baseInline } from '../buildTheme'
import type { MotifSpec, PersonaSpec, SignatureContainerId } from './types'

/**
 * 结构性反向迁移：能从 Theme 字段直接读出来的字段照抄，无法派生的（motifs）留空。
 *
 * @param theme Theme 实例（来自 themeRegistry）
 * @param overrides 人工补齐的字段（audience、motifs、meta、signatureContainers）
 */
export function themeToSpec(
  theme: Theme,
  overrides: Pick<PersonaSpec, 'audience' | 'meta'> &
    Partial<Pick<PersonaSpec, 'motifs' | 'signatureContainers'>>,
): PersonaSpec {
  const { colors, typography, spacing, radius } = theme.tokens
  const { status, ...palette } = colors

  // 计算 elements/containers/inline 相对 base 的 delta —— 不做"全量导出"
  // 也不做"属性级精简"（Phase 0 后 buildTheme 走深合并，delta 即可直接回灌）。
  // 注意：如果某主题用了 __reset sentinel，这里抽不出来（base + theme = theme，delta 无损）。
  // Phase 2 的 3-way merge 会人工加回 __reset。
  const elements = diffCSSMap(theme.elements, baseElements(theme.tokens))
  const containers = diffCSSMap(theme.containers, baseContainers(theme.tokens))
  const inline = diffCSSMap(theme.inline, baseInline(theme.tokens))

  return {
    id: theme.id,
    name: theme.name,
    description: theme.description,
    audience: overrides.audience,
    palette,
    status,
    typography,
    spacing,
    radius,
    motifs: overrides.motifs ?? ({} as MotifSpec),
    variants: theme.variants,
    behavior: theme.behavior,
    signatureContainers: overrides.signatureContainers as readonly SignatureContainerId[] | undefined,
    templates: theme.templates,
    elements: Object.keys(elements).length ? (elements as PersonaSpec['elements']) : undefined,
    containers: Object.keys(containers).length ? (containers as PersonaSpec['containers']) : undefined,
    inline: Object.keys(inline).length ? (inline as PersonaSpec['inline']) : undefined,
    meta: overrides.meta,
  }
}

type CSSMap = Record<string, Record<string, string | number>>

/** 产出：theme 和 base 不同的那些 key；每个 key 保留 theme 的完整 CSSObject（便于写回 spec）。 */
function diffCSSMap(themeMap: unknown, baseMap: unknown): CSSMap {
  const out: CSSMap = {}
  const tm = themeMap as CSSMap
  const bm = baseMap as CSSMap
  for (const key of Object.keys(tm)) {
    const a = tm[key]
    const b = bm[key] ?? {}
    if (!cssEqual(a, b)) out[key] = a
  }
  return out
}

function cssEqual(a: Record<string, string | number>, b: Record<string, string | number>): boolean {
  const aKeys = Object.keys(a)
  const bKeys = Object.keys(b)
  if (aKeys.length !== bKeys.length) return false
  for (const k of aKeys) if (a[k] !== b[k]) return false
  return true
}
