/**
 * WCAG 对比度计算（纯数学）。
 *
 * 边界：本文件不知道 PersonaSpec、不知道 palette 字段名；只接受 hex 字符串。
 * 业务侧"哪两对该比对、哪个阈值适用"放在 a11y.ts；本文件只负责"给定两色得比值"。
 *
 * 公式参考 WCAG 2.1 §1.4.3 Relative luminance：
 *   L = 0.2126 R + 0.7152 G + 0.0722 B
 *   contrast = (L_light + 0.05) / (L_dark + 0.05)
 */
/** WCAG AA 正文（< 18px 或 < 14px 加粗）阈值。 */
export declare const WCAG_AA_NORMAL = 4.5;
/** WCAG AA 大字（≥ 18px 或 ≥ 14px 加粗）/ 非文字图形阈值。 */
export declare const WCAG_AA_LARGE = 3;
/** WCAG AAA 正文阈值（仅作为 warning 提示，不作 error）。 */
export declare const WCAG_AAA_NORMAL = 7;
/**
 * 计算两色 WCAG 对比比值（>= 1）。任一参数非法 hex 时返回 NaN，调用方自行处置。
 */
export declare function wcagRatio(fg: string, bg: string): number;
