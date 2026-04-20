/**
 * 容器渲染器注册表
 *
 * 使用方：pipeline/markdown.ts 在构造 MarkdownIt 时遍历此 Map，
 * 把每个 name → ContainerRenderer 绑到 markdown-it-container 上。
 *
 * 注意 fence 长度：
 *   compare 必须用 4 个冒号（`::::`），其内部 pros/cons 用 3 个（`:::`）。
 *   markdown-it-container 按 fence 长度匹配闭合，同名同长度才互相关闭。
 *   这是插件的原生行为，不是我们的规定。
 */

import type { ContainerRenderer } from './types'
import {
  tipContainer,
  warningContainer,
  infoContainer,
  dangerContainer,
} from './admonitions'
import {
  introContainer,
  coverContainer,
  authorContainer,
  sectionTitleContainer,
} from './headline'
import { quoteCardContainer, highlightContainer } from './quote'
import { compareContainer, prosContainer, consContainer } from './compare'
import { stepsContainer } from './steps'
import { dividerContainer } from './divider'
import {
  footerCTAContainer,
  recommendContainer,
  qrcodeContainer,
} from './footer'
import { mpvoiceContainer, mpvideoContainer } from './media'
import {
  noteContainer,
  abstractContainer,
  keyNumberContainer,
  seeAlsoContainer,
} from './signature'

/**
 * free · 自由容器（escape hatch）
 *
 * 主题规范里 "19 容器" 中排最末的"兜底位"：给作者写不归类内容的地方。
 * 渲染器**刻意不施加视觉**——无 border、无底色、仅一层 `<section class="container-free">`
 * 包裹，margin 与正文段落对齐。各主题在 sample 里用它装"编辑部补注 / 致谢列表"
 * 这类结构外内容。
 *
 * 不进入 ThemeContainers 是自觉选择——free 的承诺是 "不施加主题样式"，
 * 写进 Theme 类型反而诱导主题作者往里塞 CSS，违反它的定位。
 */
const freeContainer: ContainerRenderer = {
  open: () => '<section class="container-free">\n',
  close: '</section>\n',
}

export const CONTAINER_REGISTRY: Record<string, ContainerRenderer> = {
  intro: introContainer,
  cover: coverContainer,
  author: authorContainer,
  'section-title': sectionTitleContainer,
  tip: tipContainer,
  warning: warningContainer,
  info: infoContainer,
  danger: dangerContainer,
  note: noteContainer,
  'quote-card': quoteCardContainer,
  highlight: highlightContainer,
  compare: compareContainer,
  pros: prosContainer,
  cons: consContainer,
  steps: stepsContainer,
  divider: dividerContainer,
  'footer-cta': footerCTAContainer,
  recommend: recommendContainer,
  qrcode: qrcodeContainer,
  mpvoice: mpvoiceContainer,
  mpvideo: mpvideoContainer,
  free: freeContainer,
  // Phase 5 · Signature Container gap-closing
  abstract: abstractContainer,
  'key-number': keyNumberContainer,
  'see-also': seeAlsoContainer,
}

/**
 * spec.signatureContainers 用的 camelCase id 到 markdown fence 名（kebab）的映射。
 *
 * 为什么需要：ThemeContainers 的类型键沿用 JS 字段习惯（quoteCard / sectionTitle），
 * 而 markdown-it-container 按 `::: quote-card` 匹配 fence。这张表是两个世界的中介，
 * 也是 conformance 测试 "每个 signatureContainer 都有 renderer" 的底表。
 *
 * 新增 signatureContainer id：在此登记对应的 markdown 名（通常 kebab-case）；
 * 不登记 → conformance.spec.ts "每个 signatureContainer 有 renderer" 会失败。
 */
export const SIGNATURE_CONTAINER_MARKDOWN_NAME: Readonly<Record<string, string>> = {
  intro: 'intro',
  author: 'author',
  cover: 'cover',
  tip: 'tip',
  warning: 'warning',
  info: 'info',
  danger: 'danger',
  note: 'note',
  quoteCard: 'quote-card',
  highlight: 'highlight',
  compare: 'compare',
  steps: 'steps',
  sectionTitle: 'section-title',
  footerCTA: 'footer-cta',
  recommend: 'recommend',
  qrcode: 'qrcode',
  mpvoice: 'mpvoice',
  mpvideo: 'mpvideo',
  abstract: 'abstract',
  keyNumber: 'key-number',
  seeAlso: 'see-also',
  // Phase 5 候选未实现（尚无主题声明使用）：algorithm / seal / prelude
}

export type { ContainerRenderer, ContainerRenderContext } from './types'
export { parseInfo, escAttr, escText } from './types'
