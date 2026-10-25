/**
 * codeBlock 目录聚合器。新增 codeBlock variant 两步：
 *   1. 本目录下新建 `<id>.ts`，default export 一个 CodeBlockDef
 *   2. 在此文件 import 并追加到数组
 * 排序由 registry.ts 的 CODE_BLOCK_ORDER 决定，此处只做收集。
 */
declare const _default: import("../_core").CodeBlockDef[];
export default _default;
