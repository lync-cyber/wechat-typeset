/**
 * HTML / XML 转义原语。三套规则：
 *   - escAttr：HTML 属性值，转 4 字符（&, ", <, >）
 *   - escText：HTML 文本节点，转 3 字符（&, <, >）；引号在文本节点中无歧义
 *   - escapeXml：SVG/XML 嵌入，转 5 字符（escAttr 的 4 字符 + `'`）
 * 纯字符串实现——管线需在 Node 环境无 DOM 跑通。
 */

/** HTML 属性值转义 */
export function escAttr(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/** HTML 文本转义（不处理引号，留给属性值专用函数） */
export function escText(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/**
 * XML 超集：escAttr 的 4 字符 + `'` → `&apos;`。
 * SVG/XML 文档内嵌字符串使用（比如 userComponents 的 thumbnailSvg）。
 */
export function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
