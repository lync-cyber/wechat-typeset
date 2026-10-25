/**
 * quote-card / highlight 容器
 *
 * 两者都走 variant registry。quote-card 池: classic / magazine-dropcap / column-rule /
 * frame-brackets / ...; highlight 池: plain(占位,wrapperCSS 留空,外壳样式由
 * ThemeContainers.highlight 主题级 CSS 接管)。
 *
 * quote-card byline（ctx.info）作为署名，close 时单独渲染一行。样式四级回退：
 *   variant.bylineCSS > 容器默认（居中 textMuted 13px）。前缀同理（默认 "— "）。
 *
 * quote-card 节点序：wrapper > [svgSlot] > body > [byline] > [closeSlot] > /wrapper。
 * closeSlot 落在 byline 之后、wrapper 之内，是给"开/闭引号成对"的 variant（典型 classic
 * 的 「」）用的——闭引号必须把 byline 也包进去，才符合"作者落款在引号内"的中文排版直觉。
 */
import type { ContainerRenderer } from './types';
export declare const quoteCardContainer: ContainerRenderer;
export declare const highlightContainer: ContainerRenderer;
