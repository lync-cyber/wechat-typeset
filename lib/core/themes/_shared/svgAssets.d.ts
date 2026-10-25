/**
 * 参数化 SVG 资产工厂
 *
 * 每个主题仅需提供一个"色彩函数集合"与一组参数，就能得到全套 assets。
 * 这样 4 套主题的 SVG 风格差异落在"图形变体"层（sharp / soft / serif / playful），
 * 色彩则随 tokens 自动流动，避免在每个主题里手写一遍相同的 SVG 字符串。
 */
import type { SvgVariant, ThemeAssets, ThemeTokens } from '../types';
/**
 * SvgVariant 类型权威定义在 ../types.ts（PersonaSpec / Theme 都要消费）。
 * 此处 re-export 让既有 `import { SvgVariant } from './_shared/svgAssets'` 不被破坏。
 */
export type { SvgVariant };
interface BuildOptions {
    tokens: ThemeTokens;
    variant: SvgVariant;
}
export declare function buildAssets({ tokens, variant }: BuildOptions): ThemeAssets;
