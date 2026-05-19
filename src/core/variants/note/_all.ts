/**
 * note 变体目录聚合器。第五态 note 独立的变体池——和 admonition 4 态视觉解耦，
 * 强调"中性补注、不抢色"。
 *
 * 新增 note variant 两步：
 *   1. 本目录下新建 `<id>.ts`，default export 一个 VariantDef
 *   2. 在此文件 import 并追加到数组（顺序由 variants/registry.ts 的 NOTE_ORDER 控制）
 */

import minimalCallout from './minimal-callout'
import boxCallout from './box-callout'
import sideBar from './side-bar'
import dottedMargin from './dotted-margin'
import smallcapsKicker from './smallcaps-kicker'
import editorialStripe from './editorial-stripe'
import researchDense from './research-dense'
// content-1.html 阶段 2 落地 — 4 主题 × 2 签名骨架（编辑按语 / 旁批）
import edSignoff from './ed-signoff'
import inlineLabel from './inline-label'
import interlinearGloss from './interlinear-gloss'
import vermilionGloss from './vermilion-gloss'
import rulerNote from './ruler-note'
import latinSubhead from './latin-subhead'
import initialDisc from './initial-disc'
import geometricMark from './geometric-mark'

export default [
  minimalCallout,
  boxCallout,
  sideBar,
  dottedMargin,
  smallcapsKicker,
  editorialStripe,
  researchDense,
  edSignoff,
  inlineLabel,
  interlinearGloss,
  vermilionGloss,
  rulerNote,
  latinSubhead,
  initialDisc,
  geometricMark,
]
