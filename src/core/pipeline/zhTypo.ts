/**
 * 中文排版修订 —— 把中英混排常见的"半角噪声"统一到中文书刊标准。
 *
 * 规则（code 与 diagnose.ts 对齐）：
 *   1. zh-ascii-spacing   —— CJK 与 ASCII 字母/数字之间插入半角空格
 *   2. zh-halfwidth-punct —— CJK 后紧邻 `,` `.` `!` `?` `:` `;` 改为全角 `，。！？：；`
 *   3. zh-straight-quote  —— 含 CJK 的段内 `"xxx"` 改为 `"xxx"`；单引号保留（歧义过大）
 *   4. zh-dash-ellipsis   —— CJK 周围的 `...`→`……`、`--`→`——`
 *
 * 保护区（不触碰）：
 *   - ``` ``` ``` fenced 代码块 ```
 *   - 缩进代码块（行首 ≥ 4 空格）
 *   - inline code (`` `...` ``)
 *   - URL（`https?://...` 直到空白）
 *   - markdown 链接 URL 部分：`](...)`
 *   - HTML 标签：`<...>`
 *
 * 出口：
 *   - `scanZhTypo(src)` 返回命中列表（供 diagnose / 显示）
 *   - `fixZhTypo(src)`  返回一次性修正后的字符串（供 Toolbar "一键修复"）
 *
 * 同一份 Hit 在两个出口间共享，是"检测 ↔ 修正"一致性的单一真源。
 */

export type ZhTypoCode =
  | 'zh-ascii-spacing'
  | 'zh-halfwidth-punct'
  | 'zh-straight-quote'
  | 'zh-dash-ellipsis'

export interface ZhTypoHit {
  /** 半开区间 [from, to)，覆盖"被修改的原片段"（含上下文字符） */
  from: number
  to: number
  code: ZhTypoCode
  /** 原文片段（便于诊断消息直接引用） */
  original: string
  /** 修正后的等价片段（长度可不同） */
  replacement: string
}

// ─────────────────────────────────────────────────────────────
// 保护区收集
// ─────────────────────────────────────────────────────────────

const RE_FENCE = /```[\s\S]*?```/g
const RE_INLINE_CODE = /`[^`\n]+`/g
const RE_URL = /https?:\/\/\S+/gi
const RE_LINK_URL = /\]\([^)\n]*\)/g
const RE_HTML_TAG = /<[^>\n]+>/g
/** 缩进代码块：行首 ≥ 4 空格或 tab，且该行不是列表续行（列表续行语义难辨，降低漏报） */
const RE_INDENT_CODE_LINE = /^(?: {4}|\t)[^\n]*$/gm

interface Region {
  from: number
  to: number
}

function collectProtectedRegions(source: string): Region[] {
  const regions: Region[] = []
  for (const re of [RE_FENCE, RE_INLINE_CODE, RE_URL, RE_LINK_URL, RE_HTML_TAG, RE_INDENT_CODE_LINE]) {
    re.lastIndex = 0
    let m: RegExpExecArray | null
    while ((m = re.exec(source)) !== null) {
      regions.push({ from: m.index, to: m.index + m[0].length })
      if (m[0].length === 0) re.lastIndex++ // 防 0 宽匹配死循环
    }
  }
  regions.sort((a, b) => a.from - b.from)
  // 合并重叠，降低后续判定成本
  const merged: Region[] = []
  for (const r of regions) {
    const last = merged[merged.length - 1]
    if (last && r.from <= last.to) last.to = Math.max(last.to, r.to)
    else merged.push({ from: r.from, to: r.to })
  }
  return merged
}

/**
 * 把每个保护区替换为等长的 `\0` 串，保持整个文档的字符偏移不变。
 * 规则扫描只看"可处理文本"，`\0` 不会被任何规则的字符类匹配。
 */
function maskProtected(source: string, regions: readonly Region[]): string {
  if (regions.length === 0) return source
  const chars = source.split('')
  for (const r of regions) {
    for (let i = r.from; i < r.to; i++) chars[i] = '\0'
  }
  return chars.join('')
}

// ─────────────────────────────────────────────────────────────
// 规则实现
// ─────────────────────────────────────────────────────────────

const CJK_CLASS = '\u4e00-\u9fff\u3400-\u4dbf'
const RE_CJK_CHAR = new RegExp(`[${CJK_CLASS}]`)
const RE_ASCII_SPACING = new RegExp(
  `([${CJK_CLASS}])([A-Za-z0-9])|([A-Za-z0-9])([${CJK_CLASS}])`,
  'g',
)
const RE_HALFWIDTH_PUNCT_LEFT = new RegExp(`([${CJK_CLASS}])([,.!?:;])`, 'g')
/** 右邻 CJK：punct 前一字符非数字（保护 1,234 / 3.14 这类数字分组） */
const RE_HALFWIDTH_PUNCT_RIGHT = new RegExp(`([,.!?:;])([${CJK_CLASS}])`, 'g')
const RE_STRAIGHT_DOUBLE_QUOTE = /"([^"\n]*?)"/g
const RE_ELLIPSIS = /\.{3,}/g
const RE_DOUBLE_DASH = /--/g

const HALFWIDTH_TO_FULLWIDTH: Readonly<Record<string, string>> = {
  ',': '，',
  '.': '。',
  '!': '！',
  '?': '？',
  ':': '：',
  ';': '；',
}

function rule_asciiSpacing(masked: string): ZhTypoHit[] {
  const hits: ZhTypoHit[] = []
  RE_ASCII_SPACING.lastIndex = 0
  let m: RegExpExecArray | null
  while ((m = RE_ASCII_SPACING.exec(masked)) !== null) {
    const original = m[0]
    const a = original[0]
    const b = original[1]
    hits.push({
      from: m.index,
      to: m.index + original.length,
      code: 'zh-ascii-spacing',
      original,
      replacement: `${a} ${b}`,
    })
  }
  return hits
}

function rule_halfwidthPunct(masked: string): ZhTypoHit[] {
  const hits: ZhTypoHit[] = []
  const seenPunct = new Set<number>() // punct 所在偏移，去重（左右两侧都命中的场景）

  // 左邻 CJK：`CJK+punct`
  RE_HALFWIDTH_PUNCT_LEFT.lastIndex = 0
  let m: RegExpExecArray | null
  while ((m = RE_HALFWIDTH_PUNCT_LEFT.exec(masked)) !== null) {
    const punctPos = m.index + m[1].length
    if (seenPunct.has(punctPos)) continue
    const full = HALFWIDTH_TO_FULLWIDTH[m[2]]
    if (!full) continue
    // `.` 紧邻另一个 `.` —— 属于 ellipsis 簇，交给 rule 4 一次性替换
    if (m[2] === '.' && masked[punctPos + 1] === '.') continue
    seenPunct.add(punctPos)
    hits.push({
      from: m.index,
      to: m.index + m[0].length,
      code: 'zh-halfwidth-punct',
      original: m[0],
      replacement: m[1] + full,
    })
  }

  // 右邻 CJK：`punct+CJK`；punct 前不能是数字（避开 1,234 / 3.14 的数字分组）
  RE_HALFWIDTH_PUNCT_RIGHT.lastIndex = 0
  while ((m = RE_HALFWIDTH_PUNCT_RIGHT.exec(masked)) !== null) {
    const punctPos = m.index
    if (seenPunct.has(punctPos)) continue
    const before = m.index > 0 ? masked[m.index - 1] : ''
    if (/\d/.test(before)) continue
    const full = HALFWIDTH_TO_FULLWIDTH[m[1]]
    if (!full) continue
    // 同上：`.` 簇交给 rule 4
    if (m[1] === '.' && before === '.') continue
    seenPunct.add(punctPos)
    hits.push({
      from: m.index,
      to: m.index + m[0].length,
      code: 'zh-halfwidth-punct',
      original: m[0],
      replacement: full + m[2],
    })
  }
  return hits
}

function rule_straightQuote(masked: string): ZhTypoHit[] {
  const hits: ZhTypoHit[] = []
  RE_STRAIGHT_DOUBLE_QUOTE.lastIndex = 0
  let m: RegExpExecArray | null
  while ((m = RE_STRAIGHT_DOUBLE_QUOTE.exec(masked)) !== null) {
    const inner = m[1]
    if (!RE_CJK_CHAR.test(inner)) continue // 仅修改含 CJK 的引语，保护英文正文里的直引号
    hits.push({
      from: m.index,
      to: m.index + m[0].length,
      code: 'zh-straight-quote',
      original: m[0],
      replacement: `\u201c${inner}\u201d`,
    })
  }
  return hits
}

function rule_dashEllipsis(masked: string): ZhTypoHit[] {
  const hits: ZhTypoHit[] = []
  RE_ELLIPSIS.lastIndex = 0
  let m: RegExpExecArray | null
  while ((m = RE_ELLIPSIS.exec(masked)) !== null) {
    const left = m.index > 0 ? masked[m.index - 1] : ''
    const right = masked[m.index + m[0].length] ?? ''
    if (!RE_CJK_CHAR.test(left) && !RE_CJK_CHAR.test(right)) continue
    hits.push({
      from: m.index,
      to: m.index + m[0].length,
      code: 'zh-dash-ellipsis',
      original: m[0],
      replacement: '\u2026\u2026',
    })
  }
  RE_DOUBLE_DASH.lastIndex = 0
  while ((m = RE_DOUBLE_DASH.exec(masked)) !== null) {
    const left = m.index > 0 ? masked[m.index - 1] : ''
    const right = masked[m.index + 2] ?? ''
    if (!RE_CJK_CHAR.test(left) && !RE_CJK_CHAR.test(right)) continue
    hits.push({
      from: m.index,
      to: m.index + 2,
      code: 'zh-dash-ellipsis',
      original: '--',
      replacement: '\u2014\u2014',
    })
  }
  return hits
}

// ─────────────────────────────────────────────────────────────
// 公共出口
// ─────────────────────────────────────────────────────────────

/** 扫描全文返回所有命中，按 from 升序。保护区内不命中。 */
export function scanZhTypo(source: string): ZhTypoHit[] {
  if (!source) return []
  const masked = maskProtected(source, collectProtectedRegions(source))
  const hits: ZhTypoHit[] = [
    ...rule_asciiSpacing(masked),
    ...rule_halfwidthPunct(masked),
    ...rule_straightQuote(masked),
    ...rule_dashEllipsis(masked),
  ]
  // 稳定：按 from 升序，同 from 时 code 字典序确定顺序
  hits.sort((a, b) => a.from - b.from || a.code.localeCompare(b.code))
  return hits
}

/**
 * 一次性把所有命中应用到 source，返回修正后的字符串。
 *
 * 注意：同一个偏移可能同时命中多条规则（如 `word。` 先空格再标点）——此处按 from
 * 从后向前应用，遇到与上一次修改**发生重叠**的 hit 丢弃，避免二次改写。
 * 作者可以再点一次"一键修复"完成二轮收敛。
 */
export function fixZhTypo(source: string): string {
  const hits = scanZhTypo(source)
  if (hits.length === 0) return source
  let out = source
  let guard = Infinity
  // 倒序应用：尾部先改，前缀偏移保持不变
  for (let i = hits.length - 1; i >= 0; i--) {
    const h = hits[i]
    if (h.to > guard) continue // 与之前改过的区间重叠，跳过
    out = out.slice(0, h.from) + h.replacement + out.slice(h.to)
    guard = h.from
  }
  return out
}

/**
 * F3 diff 路径：与 fixZhTypo 行为完全一致，同时返回每条改动在 **新文本** 中的
 * post-fix 半开区间，供编辑器装饰高亮（让作者看到"哪些片段被一键修复改了"）。
 *
 * 实现两阶段：
 *   1) 倒序模拟一次"重叠跳过"决策，挑出真正被采纳的 hits（与 fixZhTypo 算法一致）
 *   2) 正序应用 + 累计 delta，得到每条 hit 在新串中的位置
 *
 * 没有把这层算法塞回 fixZhTypo 是为了 fixZhTypo 保持 O(n) 单次分配 + 单一职责
 * （现有 29 个单测、其它消费方仅需 string→string）。
 */
export interface FixZhTypoRange {
  /** 新文本中的起点（含） */
  from: number
  /** 新文本中的终点（不含） */
  to: number
  code: ZhTypoCode
}

export interface FixZhTypoResult {
  fixed: string
  /** 长度 = 实际被采纳的 hits 数；按 `from` 升序 */
  ranges: FixZhTypoRange[]
}

export function fixZhTypoWithRanges(source: string): FixZhTypoResult {
  const hits = scanZhTypo(source)
  if (hits.length === 0) return { fixed: source, ranges: [] }

  // 阶段 1：倒序模拟，挑出实际被采纳的 hits（与 fixZhTypo 同款"重叠跳过"）
  const taken: ZhTypoHit[] = []
  let guard = Infinity
  for (let i = hits.length - 1; i >= 0; i--) {
    const h = hits[i]
    if (h.to > guard) continue
    taken.push(h)
    guard = h.from
  }
  taken.reverse() // 倒序 → 正序

  // 阶段 2：正序应用，累积 delta，落 post-fix 区间
  let out = source
  let delta = 0
  const ranges: FixZhTypoRange[] = []
  for (const h of taken) {
    const postFrom = h.from + delta
    out = out.slice(0, postFrom) + h.replacement + out.slice(postFrom + h.original.length)
    const postTo = postFrom + h.replacement.length
    ranges.push({ from: postFrom, to: postTo, code: h.code })
    delta += h.replacement.length - h.original.length
  }
  return { fixed: out, ranges }
}
