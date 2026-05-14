/**
 * 复制前提示统计 —— 单一职责：从渲染产物 HTML 里抽出"作者复制前值得知道"的计数。
 *
 * 为什么独立模块：
 *   - `wxPatch/inspect.ts` 是"结构性 patch 目标"计数，与 wxPatch 一一对应；内联图
 *     不属于 patch 目标（微信会接收 data URI 并自行转存到 mmbiz.qpic.cn），强塞
 *     进 inspect 会语义错位。
 *   - 该函数的入参是**最终复制 HTML**（已 inline + wxPatch），出参直接驱动 toast
 *     文案；不希望和 pipeline 层耦合。
 *
 * 单一函数 + 单一返回结构，本期只需 inlineImageCount；后续若加新的"自检"
 * （比如 footer-cta 数、链接数）只需在同一文件加同形式的统计函数即可，
 * 不引入 class 与状态。
 */

/**
 * 数 HTML 里 `src` 以 `data:image/` 开头的 `<img>` 数量。
 *
 * 实现选择：
 *   - 用正则而非 DOMParser：本函数在 handleCopy 的同步路径上调用，DOMParser 解析
 *     一篇全 inline 的 HTML（典型 200–500 KB）耗时 5–15 ms；正则方案 < 1 ms。
 *   - 正则覆盖 `<img ... src="data:..." ...>` 与单引号变体；允许 src 前后任意属性。
 *   - 不区分 webp / png / jpeg —— 只要协议是 data:image 就计入。
 *   - `<img src='data:image/png;base64,...'>` 单引号、`<IMG SRC=...>` 大小写、
 *     `<img\nsrc=...>` 跨行属性均能匹配（正则用 [\s\S] 跨行）。
 */
export function countInlineImages(html: string): number {
  if (!html) return 0
  const re = /<img\b[\s\S]*?\bsrc\s*=\s*["']data:image\//gi
  const matches = html.match(re)
  return matches ? matches.length : 0
}
