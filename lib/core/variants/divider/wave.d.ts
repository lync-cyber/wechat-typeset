/**
 * divider · wave（波浪线）
 *
 * 优先用主题自带 assets.dividerWave；未提供时回退到单色几何波浪。
 */
import type { VariantDef, TokenSchema } from '../_core';
/**
 * tokens 暴露：仅 gap-y（纵向留白）。
 *
 * divider 的 CSS 表面就只有 margin 一项；fill/stroke 是 SVG attribute，
 * 不能通过 CSS var() 注入（attr 上 var() 不生效），那条路要走 patch 档而非 tokens。
 * 单 token 也值得加：换场节奏（24px vs 40px）是作者最常想微调的尺度。
 */
export declare const tokenSchema: TokenSchema;
declare const wave: VariantDef;
export default wave;
