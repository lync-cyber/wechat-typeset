/**
 * 统一 Variant 注册表（运行时 render 派发层）
 *
 * 新增 variant 三步：
 *   1. 在 `src/core/variants/<kind>/` 下新建 `<id>.ts`，default export 一个 VariantDef / CodeBlockDef。
 *   2. 在 `src/core/variants/<kind>/_all.ts` import 并追加到数组（每个 kind 一份聚合器）。
 *   3. 把新 id 加入 `src/core/themes/types.ts` 的 `VARIANT_IDS[<kind>]`（`satisfies` 保证类型对齐）。
 *
 * 聚合输出（供下游消费）：
 *   - ADMONITION_VARIANTS / QUOTE_VARIANTS / COMPARE_VARIANTS / STEPS_VARIANTS /
 *     DIVIDER_VARIANTS / SECTION_TITLE_VARIANTS / NOTE_VARIANTS —— `pipeline/containers/*.ts` 按 id 分派 render
 *   - CODE_BLOCK_VARIANTS —— signature 异质，独立桶
 *   - ALL_VARIANT_DEFS —— 全部容器骨架 variant def 的扁平数组（**不含** kind='none' 的
 *     自由组件 snippet）；自由组件 snippet 的源在 domain 层 builtin-source.ts 自行合并。
 *     core 层不感知 domain 层的 free snippet 资产，避免反向依赖。
 *
 * 顺序：各 kind 的 `*_ORDER` 常量决定运行时表的稳定迭代顺序（影响快照），未列出的按 id 字典序追加。
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
  NoteVariantId,
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
  'news-row',
  'mook-tag',
]
const QUOTE_ORDER: readonly string[] = [
  'classic',
  'magazine-dropcap',
  'column-rule',
  'frame-brackets',
  'tilted-sticker',
]
const COMPARE_ORDER: readonly string[] = ['column-card', 'stacked-row', 'ledger', 'data-card']
const STEPS_ORDER: readonly string[] = ['number-circle', 'ribbon-chain', 'timeline-dot']
const DIVIDER_ORDER: readonly string[] = ['wave', 'dots', 'flower', 'rule', 'glyph']
const SECTION_TITLE_ORDER: readonly string[] = ['bordered', 'cornered']
const CODE_BLOCK_ORDER: readonly string[] = ['bare', 'header-bar']
const NOTE_ORDER: readonly string[] = ['minimal-callout', 'box-callout', 'side-bar']

const ORDER_BY_KIND: Record<VariantKind, readonly string[]> = {
  admonition: ADMONITION_ORDER,
  quote: QUOTE_ORDER,
  compare: COMPARE_ORDER,
  steps: STEPS_ORDER,
  divider: DIVIDER_ORDER,
  sectionTitle: SECTION_TITLE_ORDER,
  codeBlock: CODE_BLOCK_ORDER,
  note: NOTE_ORDER,
}

// ─────────────────────────────────────────────────────────────
// 聚合器导入（每个 kind 一个 `_all.ts`；rationale 见文件头 docstring）。
// ─────────────────────────────────────────────────────────────

/**
 * 任意 variant def 的并集类型。导出供 domain/components-lib 派生面板资产时使用。
 * core 内部消费者用更精确的 VariantDef<Args> / CodeBlockDef。
 */
export type AnyVariantDef = VariantDef<unknown> | CodeBlockDef
type AnyDef = AnyVariantDef

import admonitionAll from './admonition/_all'
import quoteAll from './quote/_all'
import compareAll from './compare/_all'
import stepsAll from './steps/_all'
import dividerAll from './divider/_all'
import sectionTitleAll from './section-title/_all'
import codeBlockAll from './codeBlock/_all'
import noteAll from './note/_all'

function collectDefs(): AnyDef[] {
  return [
    ...admonitionAll,
    ...quoteAll,
    ...compareAll,
    ...stepsAll,
    ...dividerAll,
    ...sectionTitleAll,
    ...codeBlockAll,
    ...noteAll,
  ] as unknown as AnyDef[]
}

function orderedByKind(defs: AnyDef[], kind: VariantKind): AnyDef[] {
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

/**
 * 全部容器骨架 variant def 的扁平只读视图。
 *
 * **不含** kind='none' 的自由组件 snippet——free 资产由 domain 层
 * builtin-source.ts 自己 import freeAll 后与本数组合并。
 *
 * 反向 sanity 测试用它扫描"实现进来但未在 VARIANT_IDS 声明"的漏网 variant。
 * core 内部仍走 *_VARIANTS Record 表，不直接迭代 ALL_VARIANT_DEFS。
 */
export const ALL_VARIANT_DEFS: ReadonlyArray<AnyVariantDef> = ALL_DEFS

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
export const NOTE_VARIANTS = asRecord<NoteVariantId, void>(ALL_DEFS, 'note')

// 保留 AdmonitionKind 导出（pipeline/containers/admonitions.ts 使用）
export type { AdmonitionKind }

export const CODE_BLOCK_VARIANTS: Record<string, CodeBlockDef> = (() => {
  const out: Record<string, CodeBlockDef> = {}
  for (const d of orderedByKind(ALL_DEFS, 'codeBlock')) out[d.meta.id] = d as CodeBlockDef
  return out
})()

