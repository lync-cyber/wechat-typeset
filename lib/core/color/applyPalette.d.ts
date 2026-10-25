/**
 * 把 palette 应用到基主题上，生成一个新的 Theme。
 *
 * 策略（避免"基主题已合并值被当 override 透传"的污染）：
 *   1. tokens.colors 全部被 palette 覆盖，其余 tokens 沿用基主题
 *   2. 用"基主题实际的 override"（= base 当前值 − baseElements(base.tokens) 的差值）做 delta
 *   3. 对 delta 做 color recolor（把基主题 tokens.colors 里的 hex 替换为新 palette 的 hex）
 *   4. 交给 buildTheme 时，baseContainers(newTokens) 重算基线，delta 仅覆盖主题真正定制过的字段
 *
 * 这样：
 *   - 未被基主题覆盖的容器/元素 → 跟着新 tokens 走
 *   - 基主题真正自定义过的字段（如 life-aesthetic 的 h2 dotted border-bottom）→ 保留结构 + 换色
 *   - 基主题里 hardcoded 的非 tokens 色（已知限制）→ 保持原样
 */
import type { SvgVariant, Theme } from '../themes/types';
import { type PaletteSeed } from './generator';
export interface ApplyPaletteOptions {
    base: Theme;
    seed: PaletteSeed;
    /** 自定义 id；默认 `${base.id}--custom` */
    id?: string;
    /** 自定义显示名 */
    name?: string;
    /**
     * SVG 形状变体覆盖。缺省时读 `base.svgVariant`（由 spec.svgVariant 下沉而来）；
     * 都缺则回退到 `'geometric'`。
     */
    variant?: SvgVariant;
}
export declare function applyPalette(opts: ApplyPaletteOptions): Theme;
