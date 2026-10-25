/**
 * admonition 目录聚合器。
 *
 * 新增 admonition variant 两步：
 *   1. 本目录下新建 `<id>.ts`
 *   2. 在此文件 import 并追加到数组
 *
 * 排序无关：registry.ts 的 ADMONITION_ORDER 决定最终展示顺序，此处只是收集。
 */
declare const _default: import("../_core").VariantDef<import("../_core").AdmonitionRenderArgs>[];
export default _default;
