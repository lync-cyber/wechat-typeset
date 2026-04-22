/**
 * 统一 Variant 注册表（单一聚合层）
 *
 * 新增 variant 三步：
 *   1. 在 `src/variants/<kind>/` 下新建 `<id>.ts`，default export 一个 VariantDef / CodeBlockDef。
 *   2. 在 `src/variants/<kind>/_all.ts` import 并追加到数组（每个 kind 一份聚合器）。
 *   3. 可选：若该 variant 要固定排序位置，往对应 kind 的 `*_ORDER` 常量里加 id。
 *
 * 聚合输出（供下游消费）：
 *   - ADMONITION_VARIANTS / QUOTE_VARIANTS / COMPARE_VARIANTS / STEPS_VARIANTS /
 *     DIVIDER_VARIANTS / SECTION_TITLE_VARIANTS —— `pipeline/containers/*.ts` 按 id 分派 render
 *   - CODE_BLOCK_VARIANTS —— signature 异质，独立桶
 *   - BUILTIN_COMPONENTS —— 摊平所有 free 容器的 snippets，供组件库 UI
 *   - VARIANT_IDS 在 `src/themes/types.ts` 定义（satisfies 保持类型约束）；本文件不重复 export
 *
 * 顺序：各 kind 的 `*_ORDER` 常量决定 UI / snapshot 稳定排序，未列出的按 id 字典序追加。
 *
 * 为何用显式 import 而非 `import.meta.glob`：`scripts/verify-sample-full.ts` 通过 tsx
 * 在 Node 下直接跑 pipeline，tsx 没有 Vite 的 glob 转换会 TypeError。显式 import 让本文件
 * 在 Vite 和 Node 两套运行时都可用。
 */

import type {
  AdmonitionKind,
  AdmonitionRenderArgs,
  CodeBlockDef,
  CompareRenderArgs,
  VariantDef,
  VariantRender,
} from './_core'
import type {
  AdmonitionVariantId,
  CompareVariantId,
  DividerVariantId,
  QuoteVariantId,
  SectionTitleVariantId,
  StepsVariantId,
  VariantKind,
} from '../themes/types'

/**
 * 容器 variant 的 render 必选变体：pipeline/containers/*.ts 查表后直接 `.render()`，
 * 不该处理 undefined。kind='none' 的自由组件无 render，不入这些桶。
 */
type RequiredRender<Args> = VariantDef<Args> & { render: NonNullable<VariantRender<Args>> }

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
  'manpage-log',
  'sidenote-latex',
  'marginalia',
  'ledger-cell',
  'bubble-organic',
  'magazine-pull',
  'report-section',
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
// 聚合器导入（每个 kind 一个 `_all.ts`；rationale 见文件头 docstring）。
// ─────────────────────────────────────────────────────────────

type AnyDef = VariantDef<unknown> | CodeBlockDef

import admonitionAll from './admonition/_all'
import quoteAll from './quote/_all'
import compareAll from './compare/_all'
import stepsAll from './steps/_all'
import dividerAll from './divider/_all'
import sectionTitleAll from './section-title/_all'
import codeBlockAll from './codeBlock/_all'
import freeAll from './free/_all'

function collectDefs(): AnyDef[] {
  return [
    ...admonitionAll,
    ...quoteAll,
    ...compareAll,
    ...stepsAll,
    ...dividerAll,
    ...sectionTitleAll,
    ...codeBlockAll,
    ...freeAll,
  ] as unknown as AnyDef[]
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

function asRecord<Id extends string, Args>(
  defs: AnyDef[],
  kind: VariantKind,
): Record<Id, RequiredRender<Args>> {
  const out = {} as Record<Id, RequiredRender<Args>>
  for (const d of orderedByKind(defs, kind)) {
    out[d.meta.id as Id] = d as unknown as RequiredRender<Args>
  }
  return out
}

export const ADMONITION_VARIANTS = asRecord<AdmonitionVariantId, AdmonitionRenderArgs>(
  ALL_DEFS,
  'admonition',
)
export const QUOTE_VARIANTS = asRecord<QuoteVariantId, void>(ALL_DEFS, 'quote')
export const COMPARE_VARIANTS = asRecord<CompareVariantId, CompareRenderArgs>(ALL_DEFS, 'compare')
export const STEPS_VARIANTS = asRecord<StepsVariantId, void>(ALL_DEFS, 'steps')
export const DIVIDER_VARIANTS = asRecord<DividerVariantId, void>(ALL_DEFS, 'divider')
export const SECTION_TITLE_VARIANTS = asRecord<SectionTitleVariantId, void>(
  ALL_DEFS,
  'sectionTitle',
)

// 保留 AdmonitionKind 导出（pipeline/containers/admonitions.ts 使用）
export type { AdmonitionKind }

export const CODE_BLOCK_VARIANTS: Record<string, CodeBlockDef> = (() => {
  const out: Record<string, CodeBlockDef> = {}
  for (const d of orderedByKind(ALL_DEFS, 'codeBlock')) out[d.meta.id] = d as CodeBlockDef
  return out
})()

// VARIANT_IDS 权威定义在 src/themes/types.ts（带 satisfies 类型约束）。
// registry.ts 不重复导出——消费方统一从 types.ts 导入。

// ─────────────────────────────────────────────────────────────
// BUILTIN_COMPONENTS：摊平所有 snippet → ComponentEntry
// 供 components-lib/registry 消费。
// ─────────────────────────────────────────────────────────────

export interface BuiltinEntry {
  source: 'builtin'
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
    source: 'builtin',
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
