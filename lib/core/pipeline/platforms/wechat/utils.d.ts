/**
 * wxPatch 共用工具：HTML 片段 ↔ DOM、inline style 解析/序列化
 *
 * 为什么走 DOMParser：
 *   patch 的输入/输出是 HTML 字符串，但判断逻辑天然是结构性的
 *   （"此节点是否位于 svg 子树"、"此 ul 是否需要包一层 section"）。
 *   字符串正则做结构判断容易踩坑，DOM 遍历是更稳妥的路径。
 *
 * 为什么不用 template：
 *   <template> 允许块级子节点保真，但其 content DocumentFragment 的 innerHTML
 *   不会包含外层 wrap。我们用一个 <div> 承载，序列化时取 innerHTML，语义相同。
 */
export declare function parseFragment(html: string): {
    doc: Document;
    container: HTMLElement;
};
export declare function serializeFragment(container: HTMLElement): string;
/**
 * 解析 inline style 字符串为有序键值列表。
 *
 * 保留声明顺序：CSS 层叠依赖书写顺序，重建时必须一致。
 * !important 作为独立字段记录，不丢。
 */
export interface StyleDecl {
    prop: string;
    value: string;
    important: boolean;
}
export declare function parseStyle(style: string): StyleDecl[];
export declare function stringifyStyle(decls: StyleDecl[]): string;
/** 深度优先遍历元素子树，回调可决定是否继续深入 */
export declare function walkElements(root: Element, visitor: (el: Element) => void): void;
/** 判断节点是否位于 svg 子树（含自身） */
export declare function isInSvg(el: Element): boolean;
/**
 * SVG 子树遍历的通用骨架：parse → 对每个 <svg>（含自身）深度访问 → serialize。
 * 三个 SVG patch（ids / urlQuotes / whiteBg）共用这套流程，只差 visitor 逻辑。
 * visitor 会被 svg 根节点触发一次，再被子节点依次触发。
 */
export declare function patchSvgSubtree(html: string, visitor: (el: Element) => void): string;
