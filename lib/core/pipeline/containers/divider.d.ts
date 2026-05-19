/**
 * divider 容器。5 种 variant（wave / dots / flower / rule / glyph）；解析优先级：
 *   attrs.variant（如 `::: divider variant=glyph`）> ctx.variants.divider > 'rule'
 * 'line' 是 'rule' 的别名（通过工厂 resolveAlias 表达）。
 * 无标题、无 body wrapper——仅 wrapper + svgSlot。
 */
import type { ContainerRenderer } from './types';
export declare const dividerContainer: ContainerRenderer;
