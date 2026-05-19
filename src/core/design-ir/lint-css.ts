/**
 * variant render() 返回字符串的 CSS 子集 lint。
 *
 * 与 [src/core/pipeline/rules.ts] 的 FORBIDDEN_CSS_PATTERNS 分工：
 *   - rules.ts        扫**最终 HTML**（兜底回归），抓位置/伪类/@media 这类粘贴期被剥的字面
 *   - 本模块          扫**variant 源码字符串字面**（编译期前置），抓"降级翻译漏写"类陷阱
 *
 * 5 条规则（按出现频率排）：
 *
 *   R1 table-needs-fixed-layout
 *      wrapperCSS 含 'display:table' 但未含 'table-layout:fixed' → 实测：默认 auto 算法
 *      会按 cell 内容 max-content 撑宽，子 cell 上的 width 像素值不被忠实采用。
 *
 *   R2 vertical-needs-explicit-lh
 *      任意 css 片段含 'writing-mode:vertical-rl' 但未显式声明 line-height → 继承自父级
 *      的 line-height（中文常 ≥1.75）在竖排里把行盒物理宽度顶到 > content area，
 *      glyph 居中失败。必须显式 line-height（1.0-1.3 区间）。
 *
 *   R3 table-cell-needs-border-box-when-width
 *      含 'display:table-cell' AND 'width:' 但未含 'box-sizing:border-box' → padding 会
 *      在 width 之外额外撑出，签条/徽章列宽度不可控。
 *
 *   R4 no-literal-color
 *      render() 字符串里出现 `#[0-9a-f]{6}` 字面（除 transparent/currentColor 语义常量）→
 *      违反 token 化纪律，应走 ctx.tokens.colors.xxx。
 *
 *   R5 banned-modern-css
 *      含 'display:flex' / 'display:grid' / 'display:inline-flex' / 'display:inline-grid' /
 *      'gap:' / 'aspect-ratio:' → 公众号会剥成 block 致 layout 塌陷。
 *
 * 各规则给"指出 + 提示"，编译期不让 LLM 写就发布；漏过的兜底由 wxpaste 测试和最终
 * HTML 扫描接住。本模块**只**接受 variant 源码字符串作为输入——不读 fs，不解析 AST。
 */

export type LintSeverity = 'error' | 'warning' | 'info'

export interface CssLintIssue {
  rule: string
  severity: LintSeverity
  /** 在原文里的匹配片段（截断 ≤ 80 字符）。 */
  match: string
  /** 文件内字节偏移（消费方可换算到行号）。 */
  offset: number
  hint: string
}

export interface CssLintOptions {
  /** 文件名 / 标签，仅写进 hint，不参与 lint 决策。 */
  source?: string
}

const RULE_DEFS: ReadonlyArray<{
  rule: string
  severity: LintSeverity
  /** matcher 返回 [start, end, match] 数组（每次扫描一次源码）。 */
  scan: (src: string) => Array<{ start: number; match: string }>
  hint: string
}> = [
  {
    rule: 'banned-modern-css',
    severity: 'error',
    hint: '微信公众号会剥 flex/grid/gap → 子元素竖排塌陷。改 display:table + table-cell 双层；纵向间距用 margin-top。详见 [docs/design-to-impl-mapping.md] §2.1。',
    scan: (src) => {
      const re = /\b(display\s*:\s*(?:inline-)?(?:flex|grid)\b|gap\s*:\s*\d|aspect-ratio\s*:)/gi
      const out: Array<{ start: number; match: string }> = []
      let m: RegExpExecArray | null
      while ((m = re.exec(src))) out.push({ start: m.index, match: m[0] })
      return out
    },
  },
  {
    rule: 'table-needs-fixed-layout',
    severity: 'warning',
    hint: '声明了 width 的 table-cell 必须配套 table-layout:fixed，否则浏览器按内容 max-content 撑宽（实测顶到 40+px）。',
    scan: (src) => {
      const out: Array<{ start: number; match: string }> = []
      // wrapperCSS 常写成多行数组 join(';')，table 与 table-layout 可跨数行。radius 300。
      const re = /display\s*:\s*table(?!-cell|-row)/gi
      let m: RegExpExecArray | null
      while ((m = re.exec(src))) {
        const ctx = sliceContext(src, m.index, 300)
        if (!/table-layout\s*:\s*fixed/i.test(ctx)) {
          out.push({ start: m.index, match: m[0] })
        }
      }
      return out
    },
  },
  {
    rule: 'vertical-needs-explicit-lh',
    severity: 'warning',
    hint: '写 writing-mode:vertical-rl 时必须显式 line-height（1.0-1.3）。继承自父级（中文常 1.75）会让行盒物理宽 > content area，glyph 居中失败。',
    scan: (src) => {
      const out: Array<{ start: number; match: string }> = []
      const re = /writing-mode\s*:\s*vertical-(rl|lr)/gi
      let m: RegExpExecArray | null
      // svgSlot 内联 style 通常在一个 template literal 内（< 200 字符）。radius 收紧到
      // 150 避免跨过相邻 bodyCSS 的 line-height 误判为"已声明"。
      while ((m = re.exec(src))) {
        const ctx = sliceContext(src, m.index, 150)
        if (!/line-height\s*:/i.test(ctx)) {
          out.push({ start: m.index, match: m[0] })
        }
      }
      return out
    },
  },
  {
    rule: 'table-cell-needs-border-box-when-width',
    severity: 'warning',
    hint: 'display:table-cell + 显式 width 必须配 box-sizing:border-box，否则 padding 在 width 之外额外撑出。',
    scan: (src) => {
      const out: Array<{ start: number; match: string }> = []
      const re = /display\s*:\s*table-cell/gi
      let m: RegExpExecArray | null
      // table-cell + width + box-sizing 通常在同一 inline-style 字符串内，radius 200 够。
      while ((m = re.exec(src))) {
        const ctx = sliceContext(src, m.index, 200)
        if (/\bwidth\s*:\s*\d/i.test(ctx) && !/box-sizing\s*:\s*border-box/i.test(ctx)) {
          out.push({ start: m.index, match: m[0] })
        }
      }
      return out
    },
  },
  {
    rule: 'no-literal-color',
    severity: 'warning',
    hint: "variant render() 不能写字面 hex/rgb。走 ${ctx.tokens.colors.xxx}（[docs/design-to-impl-mapping.md] §3 token 翻译表）。",
    scan: (src) => {
      // 仅扫"看起来像 inline-style 里的颜色字面"——前置 `:` 或属性名 background/color 后接 hex。
      const re = /(background|color)\s*:\s*(#[0-9a-fA-F]{3,8})\b/g
      const out: Array<{ start: number; match: string }> = []
      let m: RegExpExecArray | null
      while ((m = re.exec(src))) out.push({ start: m.index, match: m[0] })
      return out
    },
  },
] as const

/** slice 上下文（用于"同一 CSS 串内"判断）。半径 N 字符向前后取，便于配对规则。 */
function sliceContext(src: string, idx: number, radius: number): string {
  const start = Math.max(0, idx - radius)
  const end = Math.min(src.length, idx + radius)
  return src.slice(start, end)
}

/**
 * 用空格替换注释和字符串字面以外的"非可执行"区段——保持文件长度不变，offset 仍可
 * 用于 offsetToLine 反查行号；同时让 lint 不再误抓注释里的 "display:flex" 字样。
 *
 * 处理：
 *   - 行注释 //...EOL   → 用空格填充（保留换行）
 *   - 块注释 ／*...*／  → 用空格填充
 *   - JSDoc 块注释      → 同块注释处理
 *
 * **不**剥字符串字面——variant 的 CSS 写在 template-literal / 字符串里，这是 lint 真正
 * 要扫的目标。
 */
function maskComments(src: string): string {
  let i = 0
  const len = src.length
  const buf = src.split('')
  while (i < len) {
    const ch = src[i]
    const next = src[i + 1]
    // string literal: skip to matching quote (handle backslash escape inside)
    if (ch === '"' || ch === "'" || ch === '`') {
      const quote = ch
      i++
      while (i < len) {
        const c = src[i]
        if (c === '\\') { i += 2; continue }
        if (c === quote) { i++; break }
        // backtick: 不处理 ${...} —— ${} 内部如有引号会被吃掉，但 lint 不抓它，可接受
        i++
      }
      continue
    }
    if (ch === '/' && next === '/') {
      // 行注释 → 用空格填到行尾
      while (i < len && src[i] !== '\n') {
        buf[i] = ' '
        i++
      }
      continue
    }
    if (ch === '/' && next === '*') {
      // 块注释 → 用空格填到 closing
      buf[i] = ' '
      buf[i + 1] = ' '
      i += 2
      while (i < len - 1) {
        if (src[i] === '*' && src[i + 1] === '/') {
          buf[i] = ' '
          buf[i + 1] = ' '
          i += 2
          break
        }
        if (src[i] !== '\n') buf[i] = ' '
        i++
      }
      continue
    }
    i++
  }
  return buf.join('')
}

/**
 * 主入口。`source` 一般是 variant ts 文件全文。先 maskComments 剥注释，再扫规则。
 */
export function lintVariantCss(source: string, _opts: CssLintOptions = {}): CssLintIssue[] {
  const masked = maskComments(source)
  const out: CssLintIssue[] = []
  for (const def of RULE_DEFS) {
    const hits = def.scan(masked)
    for (const h of hits) {
      out.push({
        rule: def.rule,
        severity: def.severity,
        match: h.match.length > 80 ? `${h.match.slice(0, 80)}…` : h.match,
        offset: h.start,
        hint: def.hint,
      })
    }
  }
  return out
}

/** 偏移 → 行号（1-based）。lint 消费方在格式化输出时用。 */
export function offsetToLine(source: string, offset: number): number {
  let line = 1
  for (let i = 0; i < Math.min(offset, source.length); i++) {
    if (source.charCodeAt(i) === 10) line++
  }
  return line
}
