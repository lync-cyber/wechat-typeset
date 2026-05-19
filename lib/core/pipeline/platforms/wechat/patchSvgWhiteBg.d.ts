/**
 * patchSvgWhiteBg：SVG 子树内把纯白（#fff / #ffffff / white / rgb(255,255,255)）
 * 换成一个"极近白但非正白"的 #fefefe。
 *
 * 为什么：
 *   公众号的 SVG→PNG 光栅化管线会把纯白像素转成 alpha=0，导致白色填充区域
 *   变成透明洞（在深色主题里尤其明显）。用不可察觉的偏色避开这个规则。
 *
 * 默认不开：
 *   只有确认当前主题使用深色背景 / 需要白色实心元素时才通过 opts 启用。
 *   因此 applyWxPatches 的 opts.svgWhiteBg 默认 false。
 *
 * 作用范围：
 *   只在 svg 子树内生效——正文里的白色（如段落背景）不应被改。
 */
export declare function patchSvgWhiteBg(html: string): string;
