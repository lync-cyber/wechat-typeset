/**
 * qa-block 目录聚合器。新增 qa-block variant 两步：
 *   1. 本目录下新建 `<id>.ts`，default export 一个 VariantDef
 *   2. 在此文件 import 并追加到数组
 * 排序由 registry.ts 的 QA_BLOCK_ORDER 决定，此处只做收集。
 *
 * 当前 8 个 variant 均为 experimental：P3.1 已注册（VARIANT_IDS / 组件库可见），
 * P3.2 renderer 派发完成后 numbered-faq 升级为非 experimental 默认骨架。
 */
declare const _default: import("../_core").VariantDef<void>[];
export default _default;
