/**
 * divider 目录聚合器。新增 divider variant 两步：
 *   1. 本目录下新建 `<id>.ts`，default export 一个 VariantDef
 *   2. 在此文件 import 并追加到数组
 * 排序由 registry.ts 的 DIVIDER_ORDER 决定，此处只做收集。
 */
declare const _default: import("../_core").VariantDef<void>[];
export default _default;
