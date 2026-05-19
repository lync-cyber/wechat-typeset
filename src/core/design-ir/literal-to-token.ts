/**
 * 字面色 → ctx.tokens 路径反查（设计稿主题维度）。
 *
 * 本模块的对外契约：
 *
 *   1. `DESIGN_THEME_TO_RECOMMENDED_THEME` —— 设计稿主题 t1/t2/t3/t4 → 推荐实现主题 id
 *      （4 张画稿切片 → 18 主题里"气质最接近"的一档）。此映射是手维的、稳定快照。
 *
 *   2. `DESIGN_THEME_LABELS` —— 同上，中文展示名。
 *
 *   3. `suggestToken(literal, designTheme)` —— IR 提取时给每个字面色配 `tokenSuggestion`。
 *      实现走两段查找：
 *        (a) 推荐主题 palette 命中（来自 [build-token-index]）→ 优先
 *        (b) 跨主题命中 → 退而求其次
 *        (c) 未命中 → null（让 LLM 显式补主题 palette 语义槽）
 *
 * 历史：旧版本手抄了 4 张 t1-t4 字面色字典（共 ~30 条）。集成 18 主题后字典已升级为
 * 从 [ORDERED_SPECS] 派生的 [build-token-index]——一份 ground truth，自动跟随 spec
 * 演进，不再手抄。
 */

import type { DesignTheme } from './types'
import { lookupToken } from './build-token-index'

/** 设计稿主题 → 实现主题候选（取 [docs/design-to-impl-mapping.md] §4 表）。 */
export const DESIGN_THEME_TO_RECOMMENDED_THEME: Record<DesignTheme, string> = {
  t1: 'editorial-mook',
  t2: 'literary-humanism',
  t3: 'life-aesthetic',
  t4: 'swiss-grid',
}

/** 设计稿主题 → 中文展示名（debug / IR header / lookup-token 输出装饰）。 */
export const DESIGN_THEME_LABELS: Record<DesignTheme, string> = {
  t1: '编辑部',
  t2: '宋本批注',
  t3: '博物笔记',
  t4: '包豪斯文摘',
}

/**
 * 平台中性色——任何主题 palette 都不会登记 `'transparent'` / `'currentColor'`，
 * 但 variant 实现里大量使用。返回 null = "这就是字面常量，不需要 token 化"。
 */
const NEUTRAL_LITERALS = new Set(['transparent', 'currentcolor', 'inherit', 'initial', 'unset'])

/**
 * 画稿原型字面 → token path 字典。
 *
 * 设计稿主题 t1/t2/t3/t4 在 [content-*.html] 里写的是画稿原型字面（`#f3eada`/`#e6d5b3`
 * 等）。这些字面**未必**与推荐实现主题（literary-humanism 等）的 palette 字面值完全一致——
 * 主题演进时会做微调（如 t2.bg 画稿 `#f3eada` → literary-humanism `#f4efe3`）。
 *
 * 因此 IR 提取 `suggestToken` 的查找顺序必须是：
 *
 *   1. 18 主题 palette 命中（[build-token-index] 派生）—— 实现主题字面一致时走此路
 *   2. 画稿原型字典命中（本字典）—— 设计稿沿用原型字面、未跟随主题演进时走此路
 *   3. 中性常量 → null
 *   4. 都未命中 → null（提示主题作者补 palette 语义槽）
 *
 * 维护纪律：发现设计稿新字面色但本字典与 18 主题 palette 都不含 → **优先**补 palette
 * 语义槽（让主题层成为单一真源），仅当字面色就是"画稿原型 + 主题没用上"时才补本字典。
 */
const COMMON_NEUTRALS: Record<string, string> = {
  '#0a0a0a': 'tokens.colors.text',
  '#1a1a1a': 'tokens.colors.text',
  '#111111': 'tokens.colors.text',
  '#333333': 'tokens.colors.text',
  '#595959': 'tokens.colors.textMuted',
  '#6b6b65': 'tokens.colors.textMuted',
  '#454442': 'tokens.colors.textMuted',
  '#8c8c8c': 'tokens.colors.textMuted',
  '#bfbfbf': 'tokens.colors.border',
  '#cfcabe': 'tokens.colors.border',
}

const CANVAS_SNAPSHOT_TABLES: Record<DesignTheme, Record<string, string>> = {
  t1: {
    ...COMMON_NEUTRALS,
    '#fbfaf7': 'tokens.colors.bg',
    '#3a3a38': 'tokens.colors.textMuted',
    '#b83a2e': 'tokens.colors.primary',
  },
  t2: {
    ...COMMON_NEUTRALS,
    '#f3eada': 'tokens.colors.bg',
    '#e6d5b3': 'tokens.colors.bgMuted',
    '#2a1d10': 'tokens.colors.text',
    '#6b4a2a': 'tokens.colors.textMuted',
    '#a8763a': 'tokens.colors.accent',
    '#a03a2a': 'tokens.colors.accentClassical',
  },
  t3: {
    ...COMMON_NEUTRALS,
    '#ece4d2': 'tokens.colors.bg',
    '#1f2a2a': 'tokens.colors.text',
    '#2d3a3a': 'tokens.colors.text',
    '#5e6f6a': 'tokens.colors.textMuted',
    '#8b4a3a': 'tokens.colors.accentNaturalist',
  },
  t4: {
    ...COMMON_NEUTRALS,
    '#efece5': 'tokens.colors.bg',
    '#9a968a': 'tokens.colors.border',
    '#c8412e': 'tokens.colors.primary',
  },
}

/** #abc → #aabbcc；保持与 build-token-index.normalizeHex 一致。 */
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
 * 字面 → ctx.tokens 路径建议（四级查找）。
 *
 *   1. 18 主题 palette · 推荐主题命中  → `'tokens.colors.<key>'`（最优：主题/字面双对齐）
 *   2. 画稿原型字典命中（设计稿主题切片）→ `'tokens.colors.<key>'`（次优：保留画稿快照映射）
 *   3. 18 主题 palette · 跨主题命中     → `'tokens.colors.<key>'`（兜底：让 LLM 知道该色在其它主题叫啥）
 *   4. 中性常量 / 未命中                 → null
 *
 * 不抛错——IR 阶段只标注建议。lint / diff 工具看到 null 时按需 warn。
 */
export function suggestToken(
  literal: string,
  designTheme: DesignTheme,
): string | null {
  if (!literal) return null
  const trimmed = literal.trim().toLowerCase()
  if (NEUTRAL_LITERALS.has(trimmed)) return null

  const preferredTheme = DESIGN_THEME_TO_RECOMMENDED_THEME[designTheme]
  const result = lookupToken(literal, preferredTheme)
  // 1. 推荐主题命中
  if (result.preferred) return result.preferred.ctxPath

  // 2. 画稿原型字典（设计稿字面 → token path）
  const norm = normalizeHex(literal)
  const snapshot = CANVAS_SNAPSHOT_TABLES[designTheme]
  if (norm in snapshot) return snapshot[norm]

  // 3. 跨主题命中
  if (result.hits.length > 0) return result.hits[0].ctxPath

  return null
}
