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
// 静态 import 收集。
//
// 历史说明：初版用 `import.meta.glob` 自动发现，但 `scripts/verify-sample-full.ts`
// 通过 tsx 直接在 Node 下执行 pipeline，tsx 没有 Vite 的 glob 转换，会 TypeError。
// 为了让同一份 registry 在 Vite 和 Node 两套运行时都可用，改为显式 import。
// 新增 variant = 在下方对应 kind 追加一行 import + 塞进数组，没有额外成本。
// ─────────────────────────────────────────────────────────────

type AnyDef = VariantDef<unknown> | CodeBlockDef

// admonition（9）
import admonitionAccentBar from './admonition/accent-bar'
import admonitionPillTag from './admonition/pill-tag'
import admonitionTicketNotch from './admonition/ticket-notch'
import admonitionCardShadow from './admonition/card-shadow'
import admonitionMinimalUnderline from './admonition/minimal-underline'
import admonitionTerminal from './admonition/terminal'
import admonitionDashedBorder from './admonition/dashed-border'
import admonitionDoubleBorder from './admonition/double-border'
import admonitionTopBottomRule from './admonition/top-bottom-rule'
// quote（4）
import quoteClassic from './quote/classic'
import quoteMagazineDropcap from './quote/magazine-dropcap'
import quoteColumnRule from './quote/column-rule'
import quoteFrameBrackets from './quote/frame-brackets'
// compare（3）
import compareColumnCard from './compare/column-card'
import compareStackedRow from './compare/stacked-row'
import compareLedger from './compare/ledger'
// steps（3）
import stepsNumberCircle from './steps/number-circle'
import stepsRibbonChain from './steps/ribbon-chain'
import stepsTimelineDot from './steps/timeline-dot'
// divider（5）
import dividerWave from './divider/wave'
import dividerDots from './divider/dots'
import dividerFlower from './divider/flower'
import dividerRule from './divider/rule'
import dividerGlyph from './divider/glyph'
// sectionTitle（2）
import sectionTitleBordered from './section-title/bordered'
import sectionTitleCornered from './section-title/cornered'
// codeBlock（2）
import codeBlockBare from './codeBlock/bare'
import codeBlockHeaderBar from './codeBlock/header-bar'
// free（9）— kind='none' 自由组件
import freeIntro from './free/intro'
import freeAuthor from './free/author'
import freeCover from './free/cover'
import freeHighlight from './free/highlight'
import freeFooterCta from './free/footer-cta'
import freeRecommend from './free/recommend'
import freeQrcode from './free/qrcode'
import freeMpvoice from './free/mpvoice'
import freeMpvideo from './free/mpvideo'

function collectDefs(): AnyDef[] {
  return [
    admonitionAccentBar,
    admonitionPillTag,
    admonitionTicketNotch,
    admonitionCardShadow,
    admonitionMinimalUnderline,
    admonitionTerminal,
    admonitionDashedBorder,
    admonitionDoubleBorder,
    admonitionTopBottomRule,
    quoteClassic,
    quoteMagazineDropcap,
    quoteColumnRule,
    quoteFrameBrackets,
    compareColumnCard,
    compareStackedRow,
    compareLedger,
    stepsNumberCircle,
    stepsRibbonChain,
    stepsTimelineDot,
    dividerWave,
    dividerDots,
    dividerFlower,
    dividerRule,
    dividerGlyph,
    sectionTitleBordered,
    sectionTitleCornered,
    codeBlockBare,
    codeBlockHeaderBar,
    freeIntro,
    freeAuthor,
    freeCover,
    freeHighlight,
    freeFooterCta,
    freeRecommend,
    freeQrcode,
    freeMpvoice,
    freeMpvideo,
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
