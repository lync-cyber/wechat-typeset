/**
 * 统一 Variant 注册表（聚合层）
 *
 * 用 import.meta.glob 吃掉各 kind 子目录下的 variant 文件，
 * 排除 `_` 前缀私有文件与 `index.ts` 汇总文件。
 * 按 `def.meta.kind` 分桶、按 `meta.id` 索引，派生：
 *   - ADMONITION_VARIANTS / QUOTE_VARIANTS / ... 6 个 kind 的 Record（消费方：
 *     pipeline/containers/*.ts 按 variant id 分派 render）
 *   - CODE_BLOCK_VARIANTS（signature 异质，独立桶）
 *   - VARIANT_IDS（按 kind 分桶的 readonly tuple，供 types.ts 反向派生联合类型 & tests 枚举）
 *   - BUILTIN_COMPONENTS（摊平所有 snippets；供组件库 UI）
 *
 * 顺序：`DISPLAY_ORDER` 决定 UI / snapshot 稳定排序，未列出的按 id 字典序追加。
 *
 * P0 阶段：本文件为空 shell，真正的 variant 文件在后续 P1/P2 中迁入；
 * 目前没有任何 variant 被新注册表消费——P3 才做生产切换。
 */

import type { AdmonitionKind, CodeBlockDef, VariantDef } from './_core'
import type { VariantKind } from '../themes/types'

// ─────────────────────────────────────────────────────────────
// 展示顺序。与文件系统顺序解耦：改顺序动这里，不动目录名。
// 未列出的 variant 追加到末尾（按 id 字典序），保证"新增即生效"。
// ─────────────────────────────────────────────────────────────

const ADMONITION_ORDER: readonly string[] = [
  'accent-bar',
  'pill-tag',
  'ticket-notch',
  'card-shadow',
  'minimal-underline',
  'terminal',
  'dashed-border',
  'double-border',
  'top-bottom-rule',
]
const QUOTE_ORDER: readonly string[] = [
  'classic',
  'magazine-dropcap',
  'column-rule',
  'frame-brackets',
]
const COMPARE_ORDER: readonly string[] = ['column-card', 'stacked-row', 'ledger']
const STEPS_ORDER: readonly string[] = ['number-circle', 'ribbon-chain', 'timeline-dot']
const DIVIDER_ORDER: readonly string[] = ['wave', 'dots', 'flower', 'rule', 'glyph']
const SECTION_TITLE_ORDER: readonly string[] = ['bordered', 'cornered']
const CODE_BLOCK_ORDER: readonly string[] = ['bare', 'header-bar']
const FREE_ORDER: readonly string[] = [
  'intro',
  'author',
  'cover',
  'highlight',
  'footer-cta',
  'recommend',
  'qrcode',
  'mpvoice',
  'mpvideo',
]

const ORDER_BY_KIND: Record<VariantKind | 'none', readonly string[]> = {
  admonition: ADMONITION_ORDER,
  quote: QUOTE_ORDER,
  compare: COMPARE_ORDER,
  steps: STEPS_ORDER,
  divider: DIVIDER_ORDER,
  sectionTitle: SECTION_TITLE_ORDER,
  codeBlock: CODE_BLOCK_ORDER,
  none: FREE_ORDER,
}

// ─────────────────────────────────────────────────────────────
// glob 收集：variant 文件在各 kind 子目录下（`./<kind>/<id>.ts`）。
// `_*.ts` 与 `index.ts` 不参与收集（共享工具 / 注释型汇总文件）。
// ─────────────────────────────────────────────────────────────

type AnyDef = VariantDef<unknown> | CodeBlockDef

const modules = import.meta.glob<Record<string, unknown>>(
  ['./*/*.ts', '!./_*.ts', '!./*/_*.ts', '!./*/index.ts'],
  { eager: true },
)

function isVariantDef(value: unknown): value is AnyDef {
  return (
    !!value &&
    typeof value === 'object' &&
    'meta' in (value as object) &&
    'snippets' in (value as object)
  )
}

function collectDefs(): AnyDef[] {
  const found: AnyDef[] = []
  for (const mod of Object.values(modules)) {
    for (const value of Object.values(mod)) {
      if (isVariantDef(value)) found.push(value)
    }
  }
  return found
}

function orderedByKind(defs: AnyDef[], kind: VariantKind | 'none'): AnyDef[] {
  const bucket = defs.filter((d) => d.meta.kind === kind)
  const byId = new Map(bucket.map((d) => [d.meta.id, d]))
  const order = ORDER_BY_KIND[kind]
  const ordered: AnyDef[] = []
  for (const id of order) {
    const def = byId.get(id)
    if (def) {
      ordered.push(def)
      byId.delete(id)
    }
  }
  // 未在 ORDER 里列出的按 id 字典序追加，不静默丢失。
  for (const id of [...byId.keys()].sort()) ordered.push(byId.get(id)!)
  return ordered
}

const ALL_DEFS = collectDefs()

// ─────────────────────────────────────────────────────────────
// 按 kind 派生运行时注册表（消费方：pipeline/containers/*.ts）。
// ─────────────────────────────────────────────────────────────

type VariantRecord<Args> = Record<string, VariantDef<Args>>

function asRecord<Args>(defs: AnyDef[], kind: VariantKind): VariantRecord<Args> {
  const out: VariantRecord<Args> = {}
  for (const d of orderedByKind(defs, kind)) {
    out[d.meta.id] = d as unknown as VariantDef<Args>
  }
  return out
}

export const ADMONITION_VARIANTS = asRecord<{ kind: AdmonitionKind }>(ALL_DEFS, 'admonition')
export const QUOTE_VARIANTS = asRecord<void>(ALL_DEFS, 'quote')
export const COMPARE_VARIANTS = asRecord<{ slot: 'wrapper' | 'pros' | 'cons'; title?: string }>(
  ALL_DEFS,
  'compare',
)
export const STEPS_VARIANTS = asRecord<void>(ALL_DEFS, 'steps')
export const DIVIDER_VARIANTS = asRecord<void>(ALL_DEFS, 'divider')
export const SECTION_TITLE_VARIANTS = asRecord<void>(ALL_DEFS, 'sectionTitle')

export const CODE_BLOCK_VARIANTS: Record<string, CodeBlockDef> = (() => {
  const out: Record<string, CodeBlockDef> = {}
  for (const d of orderedByKind(ALL_DEFS, 'codeBlock')) out[d.meta.id] = d as CodeBlockDef
  return out
})()

// ─────────────────────────────────────────────────────────────
// VARIANT_IDS（派生常量；tests/component-lib 消费）
// ─────────────────────────────────────────────────────────────

function idsOf(kind: VariantKind | 'none'): readonly string[] {
  return orderedByKind(ALL_DEFS, kind).map((d) => d.meta.id)
}

export const VARIANT_IDS = {
  admonition: idsOf('admonition') as readonly string[],
  quote: idsOf('quote') as readonly string[],
  compare: idsOf('compare') as readonly string[],
  steps: idsOf('steps') as readonly string[],
  divider: idsOf('divider') as readonly string[],
  sectionTitle: idsOf('sectionTitle') as readonly string[],
  codeBlock: idsOf('codeBlock') as readonly string[],
} as const

// ─────────────────────────────────────────────────────────────
// BUILTIN_COMPONENTS：摊平所有 snippet → ComponentEntry
// 供 components-lib/registry 消费。
// ─────────────────────────────────────────────────────────────

export interface BuiltinEntry {
  id: string
  name: string
  description: string
  kind: VariantKind | 'none'
  variantId?: string
  themeCompat?: readonly string[]
  markdownSnippet: string
  thumbnailSvg: string
}

function toEntry(def: AnyDef, s: (typeof def.snippets)[number]): BuiltinEntry {
  const thumb = def.thumbnail ? def.thumbnail(s.thumbArgs) : ''
  return {
    id: s.presetId,
    name: s.name,
    description: s.description,
    kind: def.meta.kind,
    variantId: def.meta.id,
    themeCompat: s.themeCompat ?? def.meta.themeCompat,
    markdownSnippet: s.markdown,
    thumbnailSvg: thumb,
  }
}

function buildBuiltinComponents(): BuiltinEntry[] {
  const out: BuiltinEntry[] = []
  const kinds: Array<VariantKind | 'none'> = [
    'admonition',
    'quote',
    'compare',
    'steps',
    'divider',
    'sectionTitle',
    'none',
  ]
  for (const k of kinds) {
    for (const def of orderedByKind(ALL_DEFS, k)) {
      for (const s of def.snippets) out.push(toEntry(def, s))
    }
  }
  return out
}

export const BUILTIN_COMPONENTS: BuiltinEntry[] = buildBuiltinComponents()
