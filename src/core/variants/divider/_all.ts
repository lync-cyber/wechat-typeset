/**
 * divider 目录聚合器。新增 divider variant 两步：
 *   1. 本目录下新建 `<id>.ts`，default export 一个 VariantDef
 *   2. 在此文件 import 并追加到数组
 * 排序由 registry.ts 的 DIVIDER_ORDER 决定，此处只做收集。
 */

import wave from './wave'
import dots from './dots'
import flower from './flower'
import rule from './rule'
import glyph from './glyph'

export default [wave, dots, flower, rule, glyph]
