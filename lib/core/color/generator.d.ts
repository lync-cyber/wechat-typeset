/**
 * 配色生成器 · chroma-js 驱动
 *
 * 输入：三色 seed（primary / secondary / accent）+ 是否暗底
 * 输出：完整的 colors token（bg / bgSoft / bgMuted / text / textMuted / border / status ×4）
 *
 * 关键决策：
 *   - 用 LCH 空间做"等明度/饱和度"推导，比 HSL 更接近人眼感知
 *   - status.tip/info/warning/danger 不跟着 primary 跑；保持语义稳定的固定色相，
 *     只在明度上同步 theme.dark → 暗底用更饱和的 accent、更低亮度的 soft
 *   - bg 为纯白 / 纯黑时，bgSoft 取 mix(bg, primary, 0.06)，避免全灰
 */
import type { ThemeTokens } from '../themes/types';
export interface PaletteSeed {
    primary: string;
    secondary: string;
    accent: string;
    dark?: boolean;
}
/**
 * 由 seed 推导完整的 colors token。
 * 保持与现有 Theme.tokens.colors 字段一一对应，方便合并到已有主题。
 */
export declare function derivePalette(seed: PaletteSeed): ThemeTokens['colors'];
/**
 * 由单一主色推导 seed（auto-complete）。
 * secondary = 同色相加深；accent = LCH 色相 +150° 旋转。
 */
export declare function seedFromPrimary(primary: string, dark?: boolean): PaletteSeed;
/**
 * 校验三色对比度：primary vs bg 是否达标（WCAG AA for large text = 3.0）。
 * 低于阈值返回建议；达标返回 null。
 */
export declare function checkContrast(primary: string, bg: string): {
    pass: boolean;
    ratio: number;
};
