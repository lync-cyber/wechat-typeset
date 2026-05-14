/**
 * data-brief 家族容器渲染器（R4 拆分后入口）
 *
 * 10 个签名 + 3 个嵌套子项，覆盖 11-data-brief 设计稿专属版面动作；按"页面位置/功能"
 * 拆为 4 个主题文件：
 *
 *   - frame.ts     刊物结构外框  · masthead / section-tag / toc / toc-item / colophon
 *   - metrics.ts   数值与图表    · kpi-dashboard / kpi-item / bar-chart / bar
 *   - editorial.ts 编辑文案块    · qa-block / footnotes / editor-note / methodology
 *   - cta.ts       召唤行动块    · cta-bar / qr-follow
 *
 * 为什么没有 databrief/_shared.ts：
 *   后查依赖发现 sparkline 相关 helper（parseSeries / pointsFromSeries / deltaTone /
 *   trendStroke）+ KPI_DASHBOARD_STACK 全部仅服务 kpi-item 渲染，没有跨主题文件共享需求。
 *   全局通用 helper（inlineCss / escape）已在 R2 抽到外层 ../_shared/。一旦未来出现跨
 *   主题诉求再升提到 databrief/_shared.ts 不迟（YAGNI）。
 *
 * 历史：本目录前身是 src/pipeline/containers/databrief.ts（818 行单文件 god module）。
 * R4 拆分后该文件保留为过渡性 barrel，路径 `./databrief` 仍可解析（文件 > 目录），等
 * 下个版本所有 import 显式指向子文件后即可删除。
 *
 * 设计纪律（与各子文件共通）：
 *   1. **不依赖 flex 关键布局**——wxPatch 会把 display:flex → block。需要"行内贴边"
 *      的地方走 inline-block + vertical-align；需要多列等宽走 display:grid
 *      （WeChat 不剥 grid，flex gap 才剥）。
 *   2. **inline SVG 走 motif 同等纪律**——strokeWidth ≥ 1，端点 ≥ 1.4 半径，polyline
 *      用单根线段而非多 line（粘贴稳定）。
 *   3. **monospace 字体仅在 renderer inline 出现**——主题 elements/containers CSS 禁
 *      font-family（themeCSS guard 会 throw）；这里是渲染时刻的 raw HTML，规则不适用。
 *   4. **嵌套容器（kpi-item / bar / toc-item）的 styleKey:null**——它们的视觉由父容器
 *      渲染纪律决定，不参与主题 voice 微调，避免 ThemeContainers 类型膨胀。
 */

export {
  mastheadContainer,
  sectionTagContainer,
  tocContainer,
  tocItemContainer,
  colophonContainer,
} from './frame'

export {
  kpiDashboardContainer,
  kpiItemContainer,
  barChartContainer,
  barContainer,
} from './metrics'

export {
  qaBlockContainer,
  footnotesContainer,
  refsContainer,
  editorNoteContainer,
  methodologyContainer,
} from './editorial'

export { ctaBarContainer, qrFollowContainer } from './cta'
