/**
 * 运行时封面生成 —— W2：让作者从当前主题 + 草稿标题 / 副标题，一键导出
 * 公众号封面 PNG。
 *
 * 与 build-time 的 src/core/themes/_shared/spec/coverPlaceholder.ts 的关系：
 *   - 那是给 CDN 静态资产（og:image 1200×630 占位），每 persona 一张
 *   - 这里是 *运行时* 按公众号实际工作流尺寸合成，支持作者自定义标题文案
 *
 * 三种 size preset：
 *   - 'wechat-horizontal'  900×383   公众号主图（横版，比例接近 2.35:1）
 *   - 'wechat-square'      900×900   公众号方版次封面（列表缩略图友好）
 *   - 'og-image'           1200×630  与 build:covers 同尺寸，对外分享用
 *
 * 输出仍是 JSON-serializable MotifShape，由 shapeToSvg 转 SVG 字符串。栅格化（→ PNG）
 * 走 src/infra/exporters/exportCover.ts 的浏览器 Canvas 路径。
 */
import type { MotifShape, Palette } from '../../themes/_shared/spec/types';
export type CoverSizeId = 'wechat-horizontal' | 'wechat-square' | 'og-image';
export interface CoverSizeMeta {
    id: CoverSizeId;
    /** 中文显示名 */
    label: string;
    /** 一句话用途 */
    hint: string;
    /** SVG viewBox 宽度 = 输出 PNG 宽度（@1x） */
    width: number;
    /** SVG viewBox 高度 = 输出 PNG 高度（@1x） */
    height: number;
}
export declare const COVER_SIZES: Record<CoverSizeId, CoverSizeMeta>;
export interface RuntimeCoverOptions {
    palette: Palette;
    /** 主标题（缺省取 persona name） */
    title: string;
    /** 副标题（缺省取 persona description） */
    tagline?: string;
    /** 顶部小字 kicker（缺省 persona id 大写） */
    kicker?: string;
    /** 标题字体家族；serif 主题建议传 'serif' */
    titleFamily?: 'serif' | 'sans-serif' | 'monospace';
    /** 标题字重；默认 700 */
    titleWeight?: number;
}
/**
 * 按目标 size preset 生成封面 MotifShape。
 *
 * 三种 size 共享同一 visual signature（左上 kicker / 主标题 / 副标题 / 印章竖条 /
 * 底部色板 / 右下 wordmark），但坐标按 viewBox 比例独立设定——避免单一布局在不同
 * aspect 下被挤扁或拉空。
 */
export declare function buildRuntimeCover(opts: RuntimeCoverOptions, size: CoverSizeId): MotifShape;
