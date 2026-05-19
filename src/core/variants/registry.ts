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
import { orderDefsByKind } from './_core'
import type {
  AdmonitionVariantId,
  AnnouncementVariantId,
  CompareVariantId,
  DialogueVariantId,
  DividerVariantId,
  FooterCTAVariantId,
  FootnotesVariantId,
  GalleryVariantId,
  HighlightVariantId,
  NoteVariantId,
  PullQuoteVariantId,
  QaBlockVariantId,
  QrcodeVariantId,
  QuoteVariantId,
  RecommendVariantId,
  SectionTitleVariantId,
  StepsVariantId,
  TableCardVariantId,
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
  'card-shadow',
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
  'news-underline',
  'mook-tag',
  'slab-corner',
  'numbered-rule',
  'hanging-nb',
  'vermilion-seal',
  'paper-slip',
  'field-tag',
  'specimen-box',
  'filled-square',
  'triangle-top',
]
const QUOTE_ORDER: readonly string[] = [
  'classic',
  'magazine-dropcap',
  'column-rule',
  'frame-brackets',
  'editorial-block',
  'tilted-sticker',
  'oversized-mark',
  'numbered-lines',
  'seal-kai',
  'double-frame',
  'specimen-quote',
  'binomial-attrib',
  'huge-numeral',
  'ring-device',
]
const COMPARE_ORDER: readonly string[] = [
  'column-card',
  'stacked-row',
  'ledger',
  'data-card',
  'paired-specimen',
  'measurement-table',
  'paired-shape',
  'axis-diagram',
]
const STEPS_ORDER: readonly string[] = [
  'number-circle',
  'timeline-dot',
  'step-card',
  'split-row',
  'seal-cjk',
  'ruler-row',
]
const DIVIDER_ORDER: readonly string[] = ['wave', 'dots', 'flower', 'rule', 'glyph', 'seal-mark']
const SECTION_TITLE_ORDER: readonly string[] = [
  'bordered',
  'cornered',
  'number-prefix',
  'kicker-stack',
  'ribbon-stamp',
]
const CODE_BLOCK_ORDER: readonly string[] = [
  'bare',
  'header-bar',
  'line-numbers',
  'terminal-frame',
  'inline-card',
]
const NOTE_ORDER: readonly string[] = [
  'minimal-callout',
  'box-callout',
  'side-bar',
  'hanging-indent',
  'dotted-margin',
  'smallcaps-kicker',
  'editorial-stripe',
  'research-dense',
  'ed-signoff',
  'inline-label',
  'interlinear-gloss',
  'vermilion-gloss',
  'ruler-note',
  'latin-subhead',
  'initial-disc',
  'geometric-mark',
]
const HIGHLIGHT_ORDER: readonly string[] = [
  'plain',
  'dotted-underline',
  'tracked-emphasis',
  'vermilion-inline',
  'side-dots',
  'wash-ground',
  'bracketed-tick',
  'geometric-flag',
  'single-stroke',
]
const FOOTNOTES_ORDER: readonly string[] = [
  'lined',
  'inline-flow',
  'boxed-aside',
  'top-rule',
  'dense-academic',
]
const RECOMMEND_ORDER: readonly string[] = ['card-list', 'academic-refs']
const QRCODE_ORDER: readonly string[] = ['bare', 'follow-card', 'qr-stack']
const FOOTER_CTA_ORDER: readonly string[] = ['button-led', 'triptych-actions']
const PULL_QUOTE_ORDER: readonly string[] = [
  'giant-mark',
  'centered-rule',
  'stamp-quote',
  'margin-pull',
  'weight-contrast',
  'drop-capital',
  'calligraphic',
  'with-gloss',
  'bilingual-stack',
  'caliper-mark',
  'inverted-plate',
  'grid-block',
]
const ANNOUNCEMENT_ORDER: readonly string[] = [
  'danger-bar',
  'mono-disclaimer',
  'ai-notice',
  'stamped-banner',
]
const TABLE_CARD_ORDER: readonly string[] = [
  'rule-grid',
  'zebra-rows',
  'key-value',
  'price-tier',
  'three-line-table',
  'index-table',
  'vermillion-grid',
  'matrix',
]
const GALLERY_ORDER: readonly string[] = [
  'duo',
  'triptych',
  'nine-grid',
  'ribbon-strip',
]
const DIALOGUE_ORDER: readonly string[] = [
  'qa-rows',
  'chat-bubbles',
  'name-prefix',
  'interview-column',
  'audio-stamp',
]
const QA_BLOCK_ORDER: readonly string[] = [
  'numbered-faq',
  'hanging-qa',
  'seal-stamp',
  'query-annotation',
  'sample-query',
  'field-card',
  'circle-square',
  'typed-block',
]

const ORDER_BY_KIND: Record<VariantKind, readonly string[]> = {
  admonition: ADMONITION_ORDER,
  quote: QUOTE_ORDER,
  compare: COMPARE_ORDER,
  steps: STEPS_ORDER,
  divider: DIVIDER_ORDER,
  sectionTitle: SECTION_TITLE_ORDER,
  codeBlock: CODE_BLOCK_ORDER,
  note: NOTE_ORDER,
  highlight: HIGHLIGHT_ORDER,
  footnotes: FOOTNOTES_ORDER,
  recommend: RECOMMEND_ORDER,
  qrcode: QRCODE_ORDER,
  footerCTA: FOOTER_CTA_ORDER,
  pullQuote: PULL_QUOTE_ORDER,
  announcement: ANNOUNCEMENT_ORDER,
  tableCard: TABLE_CARD_ORDER,
  gallery: GALLERY_ORDER,
  dialogue: DIALOGUE_ORDER,
  qaBlock: QA_BLOCK_ORDER,
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
import highlightAll from './highlight/_all'
import footnotesAll from './footnotes/_all'
import recommendAll from './recommend/_all'
import qrcodeAll from './qrcode/_all'
import footerCTAAll from './footer-cta/_all'
import pullQuoteAll from './pull-quote/_all'
import announcementAll from './announcement/_all'
import tableCardAll from './table-card/_all'
import galleryAll from './gallery/_all'
import dialogueAll from './dialogue/_all'
import qaBlockAll from './qa-block/_all'

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
    ...highlightAll,
    ...footnotesAll,
    ...recommendAll,
    ...qrcodeAll,
    ...footerCTAAll,
    ...pullQuoteAll,
    ...announcementAll,
    ...tableCardAll,
    ...galleryAll,
    ...dialogueAll,
    ...qaBlockAll,
  ] as unknown as AnyDef[]
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
  for (const d of orderDefsByKind(defs, kind, ORDER_BY_KIND[kind])) {
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
export const HIGHLIGHT_VARIANTS = asRecord<HighlightVariantId, void>(ALL_DEFS, 'highlight')
export const FOOTNOTES_VARIANTS = asRecord<FootnotesVariantId, void>(ALL_DEFS, 'footnotes')
export const RECOMMEND_VARIANTS = asRecord<RecommendVariantId, void>(ALL_DEFS, 'recommend')
export const QRCODE_VARIANTS = asRecord<QrcodeVariantId, void>(ALL_DEFS, 'qrcode')
export const FOOTER_CTA_VARIANTS = asRecord<FooterCTAVariantId, void>(ALL_DEFS, 'footerCTA')
export const PULL_QUOTE_VARIANTS = asRecord<PullQuoteVariantId, void>(ALL_DEFS, 'pullQuote')
export const ANNOUNCEMENT_VARIANTS = asRecord<AnnouncementVariantId, void>(ALL_DEFS, 'announcement')
export const TABLE_CARD_VARIANTS = asRecord<TableCardVariantId, void>(ALL_DEFS, 'tableCard')
export const GALLERY_VARIANTS = asRecord<GalleryVariantId, void>(ALL_DEFS, 'gallery')
export const DIALOGUE_VARIANTS = asRecord<DialogueVariantId, void>(ALL_DEFS, 'dialogue')
export const QA_BLOCK_VARIANTS = asRecord<QaBlockVariantId, void>(ALL_DEFS, 'qaBlock')

// 保留 AdmonitionKind 导出（pipeline/containers/admonitions.ts 使用）
export type { AdmonitionKind }

export const CODE_BLOCK_VARIANTS: Record<string, CodeBlockDef> = (() => {
  const out: Record<string, CodeBlockDef> = {}
  for (const d of orderDefsByKind(ALL_DEFS, 'codeBlock', ORDER_BY_KIND.codeBlock)) out[d.meta.id] = d as CodeBlockDef
  return out
})()

