/**
 * 75×75 inline SVG 缩略图工厂共享工具
 *
 * 约定：
 *   - 外层统一 viewBox 0 0 75 75，width/height 75
 *   - 所有颜色以参数传入（通过 ThumbArgs），不硬编码主题色
 *   - 不用 <defs> / id / style 属性（嵌入 markdown 产出时仍安全）
 *   - 每个缩略图 ≤ 400 字符，避免组件库总体积失控
 *
 * 缩略图只传达"骨架身份"（accent-bar=左粗竖条 / terminal=三圆点条 / ...），
 * 不是主题预览。
 */
export interface ThumbArgs {
    accent?: string;
    soft?: string;
    text?: string;
}
export declare const THUMB_DEFAULTS: {
    readonly accent: "#2d6fdd";
    readonly soft: "#eef4ff";
    readonly text: "#6a737d";
};
export declare function mergeThumb(a: ThumbArgs): Required<ThumbArgs>;
export declare function svg(inner: string): string;
