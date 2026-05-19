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
export type LintSeverity = 'error' | 'warning' | 'info';
export interface CssLintIssue {
    rule: string;
    severity: LintSeverity;
    /** 在原文里的匹配片段（截断 ≤ 80 字符）。 */
    match: string;
    /** 文件内字节偏移（消费方可换算到行号）。 */
    offset: number;
    hint: string;
}
export interface CssLintOptions {
    /** 文件名 / 标签，仅写进 hint，不参与 lint 决策。 */
    source?: string;
}
/**
 * 主入口。`source` 一般是 variant ts 文件全文。先 maskComments 剥注释，再扫规则。
 */
export declare function lintVariantCss(source: string, _opts?: CssLintOptions): CssLintIssue[];
/** 偏移 → 行号（1-based）。lint 消费方在格式化输出时用。 */
export declare function offsetToLine(source: string, offset: number): number;
