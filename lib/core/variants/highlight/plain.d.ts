/**
 * highlight · plain（默认骨架）。
 * 占位变体: render 不发 wrapperCSS, 让 ThemeContainers.highlight 主题级 CSS 规则
 * 独占外壳样式。highlightContainer 仍附加 `container-highlight--plain` className,
 * 与其他容器骨架命名约定一致(quote-card--classic / note--minimal-callout)。
 *
 * DEFAULT_VARIANTS.highlight 兜底 — 主题不声明 variants.highlight 即此。
 */
import type { VariantDef } from '../_core';
declare const plain: VariantDef;
export default plain;
