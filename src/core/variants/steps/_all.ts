/**
 * steps 目录聚合器。新增 steps variant 两步：
 *   1. 本目录下新建 `<id>.ts`，default export 一个 VariantDef
 *   2. 在此文件 import 并追加到数组
 * 排序由 registry.ts 的 STEPS_ORDER 决定，此处只做收集。
 */

import numberCircle from './number-circle'
import ribbonChain from './ribbon-chain'
import timelineDot from './timeline-dot'
import stepCard from './step-card'
import splitRow from './split-row'
import largeNumeral from './large-numeral'
import sealCjk from './seal-cjk'
import rulerRow from './ruler-row'
import geometricChain from './geometric-chain'

export default [numberCircle, ribbonChain, timelineDot, stepCard, splitRow, largeNumeral, sealCjk, rulerRow, geometricChain]
