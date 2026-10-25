/**
 * Typography 硬约束（PersonaSpec.typography 级）。
 *
 * 与 validate.ts 的边界：
 *   - validate 守 motif primitive 字号（SVG 文字光栅化下限）
 *   - 本文件守 typography.baseSize（正文最小字号）+ 行高 / 字距 健康区间
 *
 * 两处共用 14px 下限（同一物理原因：微信公众号客户端 < 14px 会触发模糊光栅化），
 * 故都从 hard-rules.ts 单一真源复用 MIN_FONT_SIZE。
 */
import type { WtError } from '../../../errors';
import type { PersonaSpec } from './types';
/** 行高合理区间 —— 低于 1.4 紧到挤、高于 2.0 散到失焦。 */
export declare const LINE_HEIGHT_MIN = 1.4;
export declare const LINE_HEIGHT_MAX = 2;
/** 字距上限（px）—— 大于 1px 在中文段落会拆词感太重。 */
export declare const LETTER_SPACING_MAX = 1;
/**
 * 暂时容忍清单。键 = `themeId:field`：
 *   - `themeId:baseSize`        —— 设计原稿 13px 不愿改字号的主题
 *   - `themeId:lineHeight`      —— 故意拉到 2.0+ 的"夜读慢"主题
 *   - `themeId:letterSpacing`   —— 排版稿原值字距
 *
 * 同 LOW_VOICE_TEMPORARY_GRACE 模式：登记后 error → warning，但仍在 issues 中保持可见。
 */
export declare const TYPOGRAPHY_TEMPORARY_GRACE: ReadonlySet<string>;
export declare function validateTypography(spec: PersonaSpec): {
    errors: WtError[];
    warnings: WtError[];
};
