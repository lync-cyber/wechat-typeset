/**
 * recommend 变体目录聚合器。R-7 合并：原 ::: see-also 容器收编为 academic-refs variant，
 * recommend 升格为"延伸阅读 + 学术参考"统一入口。
 *
 * 新增 recommend variant 两步：
 *   1. 本目录下新建 `<id>.ts`，default export 一个 VariantDef
 *   2. 在此文件 import 并追加到数组（顺序由 variants/registry.ts 的 RECOMMEND_ORDER 控制）
 */

import cardList from './card-list'
import academicRefs from './academic-refs'

export default [cardList, academicRefs]
