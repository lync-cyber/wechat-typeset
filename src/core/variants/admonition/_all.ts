/**
 * admonition 目录聚合器。
 *
 * 新增 admonition variant 两步：
 *   1. 本目录下新建 `<id>.ts`
 *   2. 在此文件 import 并追加到数组
 *
 * 排序无关：registry.ts 的 ADMONITION_ORDER 决定最终展示顺序，此处只是收集。
 */

import accentBar from './accent-bar'
import pillTag from './pill-tag'
import ticketNotch from './ticket-notch'
import cardShadow from './card-shadow'
import minimalUnderline from './minimal-underline'
import terminal from './terminal'
import dashedBorder from './dashed-border'
import doubleBorder from './double-border'
import topBottomRule from './top-bottom-rule'
import manpageLog from './manpage-log'
import sidenoteLatex from './sidenote-latex'
import marginalia from './marginalia'
import ledgerCell from './ledger-cell'
import bubbleOrganic from './bubble-organic'
import magazinePull from './magazine-pull'
import reportSection from './report-section'
import newsRow from './news-row'
import newsUnderline from './news-underline'
import mookTag from './mook-tag'
import slabCorner from './slab-corner'
// content-1.html 阶段 2 落地 — 4 主题 × 2 签名骨架（t1 / t2 / t3 / t4）
import numberedRule from './numbered-rule'
import hangingNb from './hanging-nb'
import vermilionSeal from './vermilion-seal'
import paperSlip from './paper-slip'
import fieldTag from './field-tag'
import specimenBox from './specimen-box'
import filledSquare from './filled-square'
import triangleTop from './triangle-top'

export default [
  accentBar,
  pillTag,
  ticketNotch,
  cardShadow,
  minimalUnderline,
  terminal,
  dashedBorder,
  doubleBorder,
  topBottomRule,
  manpageLog,
  sidenoteLatex,
  marginalia,
  ledgerCell,
  bubbleOrganic,
  magazinePull,
  reportSection,
  newsRow,
  newsUnderline,
  mookTag,
  slabCorner,
  numberedRule,
  hangingNb,
  vermilionSeal,
  paperSlip,
  fieldTag,
  specimenBox,
  filledSquare,
  triangleTop,
]
