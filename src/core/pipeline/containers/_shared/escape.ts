/**
 * HTML / XML 转义原语 —— 容器层与 variant 层的共享底座。
 *
 * 历史：R2 前三个函数定义在 pipeline/containers/types.ts，含义上属于"渲染原语"而非"类型契约"。
 * R2 把它们物理迁到 _shared/，但 types.ts 仍 re-export 同名以保持 ~20 个消费者（variants/* 与
 * storage/userComponents.ts）的 import 不动——新代码请直接 import from './_shared/escape'。
 *
 * 分两套：
 *   - escAttr：属性值，转 4 字符（&, ", <, >）
 *   - escText：HTML 文本节点，转 3 字符（&, <, >）；引号在文本节点中无歧义，留着保持原样可读
 *   - escapeXml：SVG/XML 字符串嵌入，转 5 字符（escAttr 的 4 字符 + `'`）
 *
 * 不做的事：
 *   - 不处理 control char / non-printable（HTML5 默认即可）
 *   - 不依赖 DOM/Node textContent（我们要在纯字符串管线里跑，且需可在 Node 环境构建产物）
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
