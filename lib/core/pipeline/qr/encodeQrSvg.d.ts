/**
 * QR Code → SVG 包装：基于 `qrcode-generator`（kazuhikoarase 同步 API）。
 *
 * 为什么走第三方库：QR 编码 + Reed-Solomon + mask 选优是契约固定但代码量可观
 * 的工艺，自己造轮子无收益。qrcode-generator 选型理由：
 *   - 全同步 API（容器渲染器是同步函数，async 引入会强迫上游全异步化）
 *   - 浏览器 + Node 同套代码，零运行时依赖
 *   - ~30 KB minified，已是社区主流（StackOverflow / examples 一致命中此包）
 *
 * 自己写包装的两个理由：
 *   - 库内置 `createSvgTag` 不支持自定义颜色（背景写死 white，模块 fill 默认黑）；
 *     我们要按主题 `ThemeTokens.colors.{text,bg}` 渲染，必须自己拼 SVG
 *   - 主入口 utf-8 多字节文本：qrcode-generator 的 byte mode 需要显式开启
 *
 * 输出契约：viewBox 为 `0 0 N N`（N = (版本 * 4 + 17 + 2*margin)），fg / bg 走
 * `opts.fg` / `opts.bg`（默认黑/白）。模块用单 path `d="M..h1v1h-1z..."` 紧凑序
 * 列化——对 v1 QR 出码约 1.5 KB SVG。
 */
export type QrEcc = 'L' | 'M' | 'Q' | 'H';
export interface EncodeQrSvgOptions {
    /** 纠错级别：默认 'M'（约 15% 容错；扫码可靠性与体积折中） */
    ecc?: QrEcc;
    /** 边距模块数（按 QR spec 应为 4）。默认 4 */
    margin?: number;
    /** 前景色（模块）。默认 '#000' */
    fg?: string;
    /** 背景色。默认 '#fff' */
    bg?: string;
    /** SVG 像素尺寸（width=height）。未传则不写 width/height，仅 viewBox—外层 CSS 控制 */
    size?: number;
}
export declare function encodeQrSvg(text: string, opts?: EncodeQrSvgOptions): string;
