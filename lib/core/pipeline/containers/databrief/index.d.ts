/**
 * data-brief 家族容器渲染器入口。10 个签名 + 3 个嵌套子项，按"页面位置/功能"
 * 拆为 4 个主题文件：
 *
 *   - frame.ts     刊物结构外框  · masthead / section-tag / toc / toc-item / colophon
 *   - metrics.ts   数值与图表    · kpi-dashboard / kpi-item / bar-chart / bar
 *   - editorial.ts 编辑文案块    · qa-block / footnotes
 *
 * 设计纪律（与各子文件共通）：
 *   1. **多列布局只走 display:table + table-cell**——flex 在公众号被 wxPatch 降为
 *      block，grid 在 rules.ts FORBIDDEN_DISPLAY_VALUES 黑名单里（粘贴后被剥成空）。
 *      行内贴边走 inline-block + vertical-align。
 *   2. **inline SVG 走 motif 同等纪律**——strokeWidth ≥ 1，端点 ≥ 1.4 半径，
 *      polyline 用单根线段而非多 line（粘贴稳定）。
 *   3. **monospace 字体仅在 renderer inline 出现**——主题 elements/containers CSS
 *      禁 font-family（themeCSS guard 会 throw）；这里是渲染时 raw HTML，规则不适用。
 *   4. **嵌套容器（kpi-item / bar / toc-item）的 styleKey:null**——它们的视觉由
 *      父容器渲染纪律决定，不参与主题 voice 微调，避免 ThemeContainers 类型膨胀。
 */
export { mastheadContainer, sectionTagContainer, bylineContainer, editorialHeaderContainer, tocContainer, tocItemContainer, colophonContainer, } from './frame';
export { kpiDashboardContainer, kpiItemContainer, barChartContainer, barContainer, } from './metrics';
export { qaBlockContainer, footnotesContainer } from './editorial';
