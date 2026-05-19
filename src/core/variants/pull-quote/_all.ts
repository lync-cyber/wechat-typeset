/**
 * pull-quote 变体目录聚合器。正文中段"放大重申已写过的句子"的四种骨架：
 *   - giant-mark    巨号 inline-SVG 引号 + 大字左对齐（人物特稿母本，default）
 *   - centered-rule 上下 1px 实线居中夹 + uppercase kicker（gallery placard）
 *   - stamp-quote   左大字粗体 + 右旋转印章 SVG（brutalist 压字）
 *   - margin-pull   左侧竖向 monospace QUOTE + 右大字（NYT Sunday 悬挂）
 *
 * 新增 pull-quote variant 两步：
 *   1. 本目录下新建 `<id>.ts`，default export 一个 VariantDef
 *   2. 在此文件 import 并追加到数组（顺序由 variants/registry.ts 的 PULL_QUOTE_ORDER 控制）
 */

import giantMark from './giant-mark'
import centeredRule from './centered-rule'
import stampQuote from './stamp-quote'
import marginPull from './margin-pull'
// content-1.html 阶段 2 落地 — 4 主题 × 2 签名骨架（拉引重申）
import weightContrast from './weight-contrast'
import dropCapital from './drop-capital'
import calligraphic from './calligraphic'
import withGloss from './with-gloss'
import bilingualStack from './bilingual-stack'
import caliperMark from './caliper-mark'
import invertedPlate from './inverted-plate'
import gridBlock from './grid-block'

export default [
  giantMark,
  centeredRule,
  stampQuote,
  marginPull,
  weightContrast,
  dropCapital,
  calligraphic,
  withGloss,
  bilingualStack,
  caliperMark,
  invertedPlate,
  gridBlock,
]
