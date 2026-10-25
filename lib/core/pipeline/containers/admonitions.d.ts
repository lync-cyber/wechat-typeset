/**
 * 四色提示容器：tip / warning / info / danger。走 makeVariantContainer 工厂：
 *   1. 决定用哪个 variant（attrs.variant > theme.variants.admonition > 'accent-bar' 兜底）
 *   2. 组装 open/close HTML：wrapper + svgSlot + title? + body?
 *   3. titleCSS==='' 是约定的"跳过默认 title 行"暗号，title 由 svgSlot 承担
 */
import type { ContainerRenderer } from './types';
export declare const tipContainer: ContainerRenderer;
export declare const warningContainer: ContainerRenderer;
export declare const infoContainer: ContainerRenderer;
export declare const dangerContainer: ContainerRenderer;
