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
import { voiceCardContainer, videoCardContainer } from './media'
import { noteContainer } from './note'
import {
  announcementContainer,
  authorBioContainer,
  imageCaptionContainer,
  timelineContainer,
  timelineItemContainer,
} from './extras'
import {
  abstractContainer,
  keyNumberContainer,
  seeAlsoContainer,
} from './signature'
import {
  mastheadContainer,
  sectionTagContainer,
  bylineContainer,
  editorialHeaderContainer,
  tocContainer,
  tocItemContainer,
  kpiDashboardContainer,
  kpiItemContainer,
  barChartContainer,
  barContainer,
  qaBlockContainer,
  footnotesContainer,
  ctaBarContainer,
  qrFollowContainer,
  colophonContainer,
  calloutGroupContainer,
} from './databrief'

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
  'voice-card': voiceCardContainer,
  'video-card': videoCardContainer,
  announcement: announcementContainer,
  'author-bio': authorBioContainer,
  'image-caption': imageCaptionContainer,
  timeline: timelineContainer,
  'timeline-item': timelineItemContainer,
  free: freeContainer,
  // 签名容器（abstract / key-number / see-also）
  abstract: abstractContainer,
  'key-number': keyNumberContainer,
  'see-also': seeAlsoContainer,
  // data-brief 家族（masthead / section-tag / byline / editorial-header / toc / kpi-dashboard / bar-chart / qa-block / footnotes）
  masthead: mastheadContainer,
  'section-tag': sectionTagContainer,
  byline: bylineContainer,
  'editorial-header': editorialHeaderContainer,
  toc: tocContainer,
  'toc-item': tocItemContainer,
  'kpi-dashboard': kpiDashboardContainer,
  'kpi-item': kpiItemContainer,
  'bar-chart': barChartContainer,
  bar: barContainer,
  'qa-block': qaBlockContainer,
  footnotes: footnotesContainer,
  'cta-bar': ctaBarContainer,
  'qr-follow': qrFollowContainer,
  colophon: colophonContainer,
  'callout-group': calloutGroupContainer,
}

export type { ContainerRenderer, ContainerRenderContext } from './types'
export { parseInfo } from './types'
