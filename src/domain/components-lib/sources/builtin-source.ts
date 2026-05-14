/**
 * Builtin 组件源 —— 把容器 variant 的 def.snippets + 自由组件 snippet
 * 摊平为面板可消费的 ComponentEntry[]。
 *
 * P0 重构（R8 后）把这部分从 `core/variants/registry.ts` 搬过来：
 *   - core 只负责"variant 定义 + 运行时 render 派发表"
 *   - 面板/snippet 顺序、kebab presetId、ComponentEntry 形态等"展示资产"归 domain
 *
 * R7-A 重构：自由组件源（freeAll）改在本文件 import，与 ALL_VARIANT_DEFS 合并为
 * ALL_DEFS_FOR_PANEL。core/variants/registry 不再反向 import domain 资产。
 *
 * 新增 builtin snippet 源（kind:'none' 的自由组件）：到 `../builtin-snippets/_all.ts` 追加。
 * 调整 snippet 在 UI 的展示顺序：改本文件的 ORDER_BY_KIND。
 */

import type { AnyVariantDef } from '../../../core/variants/registry'
import { ALL_VARIANT_DEFS } from '../../../core/variants/registry'
import freeAll from '../builtin-snippets/_all'
import type { BuiltinEntry, ComponentKind } from '../types'

/**
 * 面板派生用的"全部 def 视图"：core 容器 variants + domain 自由组件 snippet。
 * 与 ALL_VARIANT_DEFS（仅 core）区分；后者只供反向 sanity 守卫使用。
 */
const ALL_DEFS_FOR_PANEL: ReadonlyArray<AnyVariantDef> = [
  ...ALL_VARIANT_DEFS,
  ...(freeAll as unknown as AnyVariantDef[]),
]

// ─────────────────────────────────────────────────────────────
// 展示顺序（snippet 在面板 tab 内的左→右顺序）
// 与 core/variants/registry.ts 的 *_ORDER（决定运行时 render 表）解耦——
// 同一个 variant 可以"渲染时早于其它注册、面板里靠后"，两种次序无依赖。
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
]
const QUOTE_ORDER: readonly string[] = [
  'classic',
  'magazine-dropcap',
  'column-rule',
  'frame-brackets',
]
const COMPARE_ORDER: readonly string[] = ['column-card', 'stacked-row', 'ledger', 'data-card']
const STEPS_ORDER: readonly string[] = ['number-circle', 'ribbon-chain', 'timeline-dot']
const DIVIDER_ORDER: readonly string[] = ['wave', 'dots', 'flower', 'rule', 'glyph']
const SECTION_TITLE_ORDER: readonly string[] = ['bordered', 'cornered']
const CODE_BLOCK_ORDER: readonly string[] = ['bare', 'header-bar']
const NOTE_ORDER: readonly string[] = ['minimal-callout', 'box-callout', 'side-bar']
const BUILTIN_SNIPPET_ORDER: readonly string[] = [
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

const ORDER_BY_KIND: Record<ComponentKind, readonly string[]> = {
  admonition: ADMONITION_ORDER,
  quote: QUOTE_ORDER,
  compare: COMPARE_ORDER,
  steps: STEPS_ORDER,
  divider: DIVIDER_ORDER,
  sectionTitle: SECTION_TITLE_ORDER,
  codeBlock: CODE_BLOCK_ORDER,
  note: NOTE_ORDER,
  none: BUILTIN_SNIPPET_ORDER,
}

function orderedDefsByKind(kind: ComponentKind): AnyVariantDef[] {
  const bucket = ALL_DEFS_FOR_PANEL.filter((d) => d.meta.kind === kind)
  const byId = new Map(bucket.map((d) => [d.meta.id, d]))
  const order = ORDER_BY_KIND[kind]
  const ordered: AnyVariantDef[] = []
  for (const id of order) {
    const def = byId.get(id)
    if (def) {
      ordered.push(def)
      byId.delete(id)
    }
  }
  // 未在 ORDER 里列出的按 id 字典序追加，避免新增 variant 忘改 ORDER 时静默丢失。
  for (const id of [...byId.keys()].sort()) ordered.push(byId.get(id)!)
  return ordered
}

function toEntry(def: AnyVariantDef, s: AnyVariantDef['snippets'][number]): BuiltinEntry {
  const thumb = def.thumbnail ? def.thumbnail(s.thumbArgs) : ''
  return {
    source: 'builtin',
    id: s.presetId,
    name: s.name,
    description: s.description,
    kind: def.meta.kind,
    variantId: def.meta.id,
    themeCompat: s.themeCompat ? [...s.themeCompat] : def.meta.themeCompat ? [...def.meta.themeCompat] : undefined,
    markdownSnippet: s.markdown,
    thumbnailSvg: thumb,
  }
}

function buildBuiltinComponents(): BuiltinEntry[] {
  const out: BuiltinEntry[] = []
  const kinds: ComponentKind[] = [
    'admonition',
    'quote',
    'compare',
    'steps',
    'divider',
    'sectionTitle',
    'codeBlock',
    'note',
    'none',
  ]
  for (const k of kinds) {
    for (const def of orderedDefsByKind(k)) {
      for (const s of def.snippets) out.push(toEntry(def, s))
    }
  }
  return out
}

export const BUILTIN_COMPONENTS: BuiltinEntry[] = buildBuiltinComponents()
