/**
 * 18 主题 palette → hex 反查表。
 *
 * 设计动机：[literal-to-token.ts] 原本手抄了 4 个设计稿主题（t1-t4）的字面色映射；
 * 随着项目集成 18 主题，手抄路线无法跟上 palette 演进。本模块从 [ORDERED_SPECS]
 * 反向派生 `hex → [{themeId, paletteKey}, ...]`，让"字面色 → ctx.tokens 路径"
 * 查询永远与主题 spec 一致。
 *
 * 派生范围（每主题贡献 ≈ 25 条）：
 *   - `palette.*` 11 必填 + 9 可选语义槽（preBg/preText/textCaption/highlightBg/
 *     codeBg/quoteCardBg/noteBorder/accentClassical/accentNaturalist）
 *   - `status.{tip|warning|info|danger}.{accent|soft}` 8 字面
 *
 * 不派生：noteBorderStyle / noteBorderWidth（非 hex）；motifs 颜色（已是 'token:*'
 * 引用，不引入新字面）；inline / containers / elements 内的 hex（按 token-flow lint
 * 契约必须等于 palette 内某项，否则 spec 自身已经测试失败）。
 *
 * 性能：模块级 lazy build + freeze。首次调用建索引（~50ms），后续 O(1)。
 */

import { ORDERED_SPECS } from '../themes/registry'
import type { PersonaSpec } from '../themes/_shared/spec'

/**
 * 单条反查命中：一个字面 hex 在某主题的某个 palette key 上出现。
 *
 *   - `themeId`：18 主题之一的 id（如 `'literary-humanism'`）
 *   - `paletteKey`：palette 字段路径。一级 = palette 直字段（`'primary'`）；
 *     二级 = status 路径（`'status.tip.accent'`）
 *   - `ctxPath`：variant render 里直接可用的字面（如 `'tokens.colors.primary'`）—— 让
 *     LLM 写 `${ctx.tokens.colors.primary}` 时只读一字段即可
 */
export interface TokenHit {
  themeId: string
  paletteKey: string
  ctxPath: string
}

export type TokenIndex = ReadonlyMap<string, readonly TokenHit[]>

/** #abc → #aabbcc；#abcd → #aabbccdd；其余转小写。保持与 [theme-token-flow.spec.ts] 同步。 */
function normalizeHex(raw: string): string {
  const v = raw.trim().toLowerCase()
  if (v.length === 4 || v.length === 5) {
    let out = '#'
    for (let i = 1; i < v.length; i++) out += v[i] + v[i]
    return out
  }
  return v
}

/**
 * 一组 palette 字段的 hex 反查清单。
 *
 * 顺序意义：枚举到的字段顺序决定"同主题内多 key 同色"时哪个 key 排在前面。一般
 * primary/text/bg 等"核心"字段在前；语义槽（textCaption / highlightBg ...）在后。
 * 同色多 key 在主题里其实罕见（说明设计冗余），但保留确定性。
 */
const PALETTE_FIELDS: ReadonlyArray<keyof PersonaSpec['palette']> = [
  'primary',
  'secondary',
  'accent',
  'bg',
  'bgSoft',
  'bgMuted',
  'text',
  'textMuted',
  'textInverse',
  'border',
  'code',
  'preBg',
  'preText',
  'textCaption',
  'highlightBg',
  'codeBg',
  'quoteCardBg',
  'noteBorder',
  'accentClassical',
  'accentNaturalist',
]

const STATUS_KEYS = ['tip', 'warning', 'info', 'danger'] as const

function collectHits(spec: PersonaSpec, out: Map<string, TokenHit[]>): void {
  const themeId = spec.id
  for (const key of PALETTE_FIELDS) {
    const v = spec.palette[key]
    if (typeof v !== 'string') continue
    const hex = normalizeHex(v)
    const hit: TokenHit = {
      themeId,
      paletteKey: String(key),
      ctxPath: `tokens.colors.${String(key)}`,
    }
    if (!out.has(hex)) out.set(hex, [])
    out.get(hex)!.push(hit)
  }
  for (const sk of STATUS_KEYS) {
    const pair = spec.status?.[sk]
    if (!pair) continue
    for (const tone of ['accent', 'soft'] as const) {
      const v = pair[tone]
      if (typeof v !== 'string') continue
      const hex = normalizeHex(v)
      const hit: TokenHit = {
        themeId,
        paletteKey: `status.${sk}.${tone}`,
        ctxPath: `tokens.colors.status.${sk}.${tone}`,
      }
      if (!out.has(hex)) out.set(hex, [])
      out.get(hex)!.push(hit)
    }
  }
}

let _cachedIndex: TokenIndex | null = null

/**
 * 从 18 主题派生完整反查表。模块级缓存：第一次调用建索引，后续返回同一实例。
 *
 * 重建路径：项目重新打包 / 测试重启即重建——主题 spec 是编译期常量，运行期不会变。
 */
export function buildTokenIndex(): TokenIndex {
  if (_cachedIndex) return _cachedIndex
  const m = new Map<string, TokenHit[]>()
  for (const spec of ORDERED_SPECS) collectHits(spec, m)
  // freeze inner arrays 防误改
  const frozen = new Map<string, readonly TokenHit[]>()
  for (const [hex, hits] of m) frozen.set(hex, Object.freeze([...hits]))
  _cachedIndex = frozen
  return frozen
}

/** 仅测试用：清缓存（让单测可在 spec mock 后重建）。 */
export function __clearTokenIndexCacheForTest(): void {
  _cachedIndex = null
}

export interface LookupTokenResult {
  /** 查询本身的归一化字面。 */
  literal: string
  /** 优先匹配（preferredThemeId 指定且命中）—— null = 该主题 palette 内没有此色。 */
  preferred: TokenHit | null
  /**
   * 全局所有命中。`preferred` 指定时排在最前；其余按主题 id 字典序。
   * 一个 hex 可能出现在多个主题（如 `#1f1b14` 在多个"墨黑"主题）—— 给 LLM 完整信息，
   * 由调用方决定如何挑（一般取 preferred；无 preferred 时取 hits[0]）。
   */
  hits: readonly TokenHit[]
}

/**
 * 字面色查询的主入口。
 *
 *   - 命中 + 指定 `preferredThemeId` → `preferred` 字段为该主题的 hit
 *   - 命中 + 未指定 preferred → `preferred` 为 null，调用方走 `hits[0]`
 *   - 未命中 → `hits` 为空数组，`preferred` 为 null
 *
 * 永不抛错：未命中是合法状态（设计稿可能用了未在任何主题登记的色，提示 LLM 补
 * palette 语义槽即可）。
 */
export function lookupToken(
  literal: string,
  preferredThemeId?: string,
): LookupTokenResult {
  const idx = buildTokenIndex()
  const norm = normalizeHex(literal)
  const all = idx.get(norm)
  if (!all || all.length === 0) {
    return { literal: norm, preferred: null, hits: [] }
  }
  if (!preferredThemeId) {
    return { literal: norm, preferred: null, hits: all }
  }
  const preferredHit = all.find((h) => h.themeId === preferredThemeId) ?? null
  const others = all.filter((h) => h.themeId !== preferredThemeId)
  const sorted = preferredHit ? [preferredHit, ...others] : [...others]
  return { literal: norm, preferred: preferredHit, hits: sorted }
}
