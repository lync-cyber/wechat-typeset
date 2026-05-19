/**
 * patchSvgUrlQuotes：SVG 子树内，url("x") / url('x') → url(x)。
 *
 * 为什么：
 *   公众号的 HTML 清洗在 SVG 上下文中对带引号的 url() 不友好，粘贴后会变成
 *   url(&quot;x&quot;)，导致 fill="url(#grad)" 这类引用断裂或 background-image
 *   失效。去掉引号规避。
 *
 * 作用范围：
 *   只处理 svg 子树（包括 svg 本身）。其他场景（CSS 里的背景图 url）保留引号
 *   是无害的。
 *
 * 改写两处：
 *   1. 属性值：fill="url(...)" / stroke / filter / mask / clip-path 等
 *   2. inline style 中的 url()
 */
export declare function patchSvgUrlQuotes(html: string): string;
