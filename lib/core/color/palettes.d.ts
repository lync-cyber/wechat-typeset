/**
 * 预设调色板（数量由本文件末尾 palettePresets 决定；增减时同步主题配色入口的网格 UI）
 *
 * 每个 palette 只定义 "主色 + 辅色 + 强调色"三元组（seed）；
 * 完整的 Theme tokens（bg / bgSoft / border / textMuted / status ...）
 * 由 generator.ts 的 derivePalette() 基于 seed 在 LCH 空间推导。
 *
 * 这样调色板的"美学决策"集中在三色搭配上，其余令牌可算法推导。
 */
export interface PaletteSeed {
    id: string;
    name: string;
    description: string;
    primary: string;
    secondary: string;
    accent: string;
    /** 是否暗色底。暗色底的 bg 由 generator 走暗化路径 */
    dark?: boolean;
}
export declare const palettePresets: PaletteSeed[];
