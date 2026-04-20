/**
 * life-aesthetic · 慢生活 · PersonaSpec
 *
 * 定位：暖米底 + 圆角柔和，记录饮食/旅行/长日的非虚构生活写作。
 * 视觉语言：手绘有机 · 波浪分割 · 花瓣/叶片装饰 · 软圆图标。
 *
 * 迁移自 src/themes/life-aesthetic/{index.ts, assets.ts}（Phase 2 / PR 8）。
 * 所有 hex 在本文件 inline 字面量；assets.ts 的 SVG 已逐一反拆为 MotifShape AST。
 */

import type { PersonaSpec } from '../_shared/spec'

export const spec: PersonaSpec = {
  id: 'life-aesthetic',
  name: '慢生活',
  description: '暖米底 + 圆角柔和，写写饮食、旅行与长日',
  audience: '生活写作 / 非虚构随笔',

  // ============================================================
  // 色板
  // ============================================================
  palette: {
    primary: '#d98141',
    secondary: '#b96234',
    accent: '#efb758',
    bg: '#faf6f0',
    bgSoft: '#f2ead8',
    bgMuted: '#eadfc7',
    text: '#3a2d20',
    textMuted: '#7a6a58',
    textInverse: '#faf6f0',
    border: '#e0d1ba',
    code: '#b96234',
  },

  // 语义四色
  status: {
    tip: { accent: '#7ba05b', soft: '#eef3e4' },
    warning: { accent: '#c88e3b', soft: '#fcf1dc' },
    info: { accent: '#5b88a8', soft: '#e6edf3' },
    danger: { accent: '#c05a4e', soft: '#f8e1dc' },
  },

  // ============================================================
  // 字号 / 间距 / 圆角
  // ============================================================
  typography: {
    baseSize: 15,
    lineHeight: 1.9,
    h1Size: 24,
    h2Size: 20,
    h3Size: 17,
    letterSpacing: 0.6,
  },
  spacing: { paragraph: 20, section: 32, listItem: 10, containerPadding: 18 },
  radius: { sm: 6, md: 12, lg: 18 },

  // ============================================================
  // Motifs（来自 assets.ts 的 AST 化改写）
  // ============================================================
  motifs: {
    // H2 Prefix：一片叶子 + 细茎
    h2Prefix: {
      viewBox: [0, 0, 22, 22],
      width: 18,
      height: 18,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 8 },
      primitives: [
        {
          type: 'path',
          d: 'M2,20 C8,18 16,12 20,4 C14,6 6,10 2,20 Z',
          fill: '#d98141',
          opacity: 0.85,
        },
        {
          type: 'path',
          d: 'M4,18 C10,14 14,10 18,6',
          stroke: '#b96234',
          strokeWidth: 1,
          opacity: 0.6,
        },
      ],
    },

    // 分割线 · wave：不规则手绘波浪
    dividerWave: {
      viewBox: [0, 0, 240, 16],
      width: 220,
      height: 16,
      primitives: [
        {
          type: 'path',
          d: 'M0,9 C18,2 36,14 54,8 C72,2 90,14 108,8 C126,2 144,14 162,8 C180,2 198,14 216,8 C228,5 240,9 240,9',
          stroke: '#d98141',
          strokeWidth: 1.4,
          strokeLinecap: 'round',
          opacity: 0.7,
        },
      ],
    },

    // 分割线 · dots：散落的小花瓣（4 组 rotated group，静态展开）
    // 原 .map([70,100,130,160]) ⇒ cx × 4；rot = i*45 ⇒ 0/45/90/135
    dividerDots: {
      viewBox: [0, 0, 240, 14],
      width: 220,
      height: 14,
      primitives: [
        {
          type: 'group',
          transform: 'translate(70 7) rotate(0)',
          children: [
            { type: 'ellipse', cx: 0, cy: -3, rx: 1.5, ry: 3, fill: '#d98141', opacity: 0.75 },
            { type: 'ellipse', cx: 0, cy: 3, rx: 1.5, ry: 3, fill: '#d98141', opacity: 0.5 },
            { type: 'circle', cx: 0, cy: 0, r: 1.2, fill: '#efb758' },
          ],
        },
        {
          type: 'group',
          transform: 'translate(100 7) rotate(45)',
          children: [
            { type: 'ellipse', cx: 0, cy: -3, rx: 1.5, ry: 3, fill: '#d98141', opacity: 0.75 },
            { type: 'ellipse', cx: 0, cy: 3, rx: 1.5, ry: 3, fill: '#d98141', opacity: 0.5 },
            { type: 'circle', cx: 0, cy: 0, r: 1.2, fill: '#efb758' },
          ],
        },
        {
          type: 'group',
          transform: 'translate(130 7) rotate(90)',
          children: [
            { type: 'ellipse', cx: 0, cy: -3, rx: 1.5, ry: 3, fill: '#d98141', opacity: 0.75 },
            { type: 'ellipse', cx: 0, cy: 3, rx: 1.5, ry: 3, fill: '#d98141', opacity: 0.5 },
            { type: 'circle', cx: 0, cy: 0, r: 1.2, fill: '#efb758' },
          ],
        },
        {
          type: 'group',
          transform: 'translate(160 7) rotate(135)',
          children: [
            { type: 'ellipse', cx: 0, cy: -3, rx: 1.5, ry: 3, fill: '#d98141', opacity: 0.75 },
            { type: 'ellipse', cx: 0, cy: 3, rx: 1.5, ry: 3, fill: '#d98141', opacity: 0.5 },
            { type: 'circle', cx: 0, cy: 0, r: 1.2, fill: '#efb758' },
          ],
        },
      ],
    },

    // 分割线 · flower：叶脉花枝
    dividerFlower: {
      viewBox: [0, 0, 240, 22],
      width: 220,
      height: 22,
      primitives: [
        {
          type: 'path',
          d: 'M0,11 C40,11 80,11 95,11',
          stroke: '#e0d1ba',
          strokeWidth: 1,
        },
        {
          type: 'path',
          d: 'M145,11 C170,11 200,11 240,11',
          stroke: '#e0d1ba',
          strokeWidth: 1,
        },
        {
          type: 'path',
          d: 'M120,2 C118,6 114,8 110,10 M120,2 C122,6 126,8 130,10',
          stroke: '#d98141',
          strokeWidth: 1.2,
          opacity: 0.85,
        },
        { type: 'ellipse', cx: 120, cy: 14, rx: 4, ry: 2.5, fill: '#d98141', opacity: 0.7 },
        { type: 'ellipse', cx: 120, cy: 18, rx: 3, ry: 1.8, fill: '#efb758', opacity: 0.65 },
      ],
    },

    // 金句引号：手绘逗号形双引号
    quoteMark: {
      viewBox: [0, 0, 48, 36],
      width: 40,
      height: 30,
      inlineStyle: { display: 'inline-block', verticalAlign: 'top', marginRight: 6 },
      primitives: [
        {
          type: 'path',
          d: 'M4,24 C4,14 10,6 18,4 C14,10 12,16 13,22 C13,28 9,30 4,24 Z',
          fill: '#d98141',
          opacity: 0.42,
        },
        {
          type: 'path',
          d: 'M26,24 C26,14 32,6 40,4 C36,10 34,16 35,22 C35,28 31,30 26,24 Z',
          fill: '#d98141',
          opacity: 0.42,
        },
      ],
    },

    // Section 角花：叶片 + 短茎
    sectionCorner: {
      viewBox: [0, 0, 22, 18],
      width: 18,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        {
          type: 'path',
          d: 'M1,16 C6,14 14,9 20,2 C15,3 6,6 1,16 Z',
          fill: '#d98141',
          opacity: 0.85,
        },
        {
          type: 'line',
          x1: 1,
          y1: 16,
          x2: 8,
          y2: 10,
          stroke: '#b96234',
          strokeWidth: 1,
          opacity: 0.6,
        },
      ],
    },

    // tipIcon：iconFrame(tipAccent) + 对勾
    tipIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        { type: 'circle', cx: 8, cy: 8, r: 7, fill: '#7ba05b', opacity: 0.2 },
        { type: 'circle', cx: 8, cy: 8, r: 7, stroke: '#7ba05b', strokeWidth: 1.2 },
        {
          type: 'path',
          d: 'M5,8 L7.5,10.5 L11,6',
          stroke: '#7ba05b',
          strokeWidth: 1.8,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        },
      ],
    },

    // warningIcon：iconFrame(warningAccent) + 感叹号
    warningIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        { type: 'circle', cx: 8, cy: 8, r: 7, fill: '#c88e3b', opacity: 0.2 },
        { type: 'circle', cx: 8, cy: 8, r: 7, stroke: '#c88e3b', strokeWidth: 1.2 },
        { type: 'rect', x: 7, y: 4, w: 2, h: 5, rx: 1, fill: '#c88e3b' },
        { type: 'circle', cx: 8, cy: 11.5, r: 1, fill: '#c88e3b' },
      ],
    },

    // infoIcon：iconFrame(infoAccent) + i
    infoIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        { type: 'circle', cx: 8, cy: 8, r: 7, fill: '#5b88a8', opacity: 0.2 },
        { type: 'circle', cx: 8, cy: 8, r: 7, stroke: '#5b88a8', strokeWidth: 1.2 },
        { type: 'circle', cx: 8, cy: 4.5, r: 1, fill: '#5b88a8' },
        { type: 'rect', x: 7, y: 6.5, w: 2, h: 6, rx: 1, fill: '#5b88a8' },
      ],
    },

    // dangerIcon：iconFrame(dangerAccent) + X
    dangerIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        { type: 'circle', cx: 8, cy: 8, r: 7, fill: '#c05a4e', opacity: 0.2 },
        { type: 'circle', cx: 8, cy: 8, r: 7, stroke: '#c05a4e', strokeWidth: 1.2 },
        {
          type: 'path',
          d: 'M5,5 L11,11 M11,5 L5,11',
          stroke: '#c05a4e',
          strokeWidth: 1.8,
          strokeLinecap: 'round',
        },
      ],
    },

    // stepBadge：软圆双环 + 数字
    stepBadge: {
      viewBox: [0, 0, 24, 24],
      width: 24,
      height: 24,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 8 },
      placeholders: ['N'],
      primitives: [
        { type: 'circle', cx: 12, cy: 12, r: 11, fill: '#d98141', opacity: 0.22 },
        { type: 'circle', cx: 12, cy: 12, r: 11, stroke: '#d98141', strokeWidth: 1.2 },
        {
          type: 'text',
          x: 12,
          y: 17,
          content: '{N}',
          fontSize: 15,
          fontWeight: 700,
          fill: '#d98141',
          textAnchor: 'middle',
        },
      ],
    },
  },

  // ============================================================
  // 骨架变体（life-aesthetic 之前未显式声明 → 保持 DEFAULT_VARIANTS）
  // ============================================================
  variants: {
    admonition: 'bubble-organic', // 全主题签名：大圆角气泡 + 单侧柔软阴影，手绘信笺气质（取代工业网格矩阵的 accent-bar）
    quote: 'classic',
    compare: 'column-card',
    steps: 'number-circle',
    divider: 'rule',
    sectionTitle: 'bordered',
    codeBlock: 'bare',
  },

  // ============================================================
  // 元素级样式（从 index.ts 的 elements 原样搬运，hex 全部 inline）
  // ============================================================
  elements: {
    h2: {
      'font-size': '20px',
      'font-weight': '700',
      color: '#3a2d20',
      'margin-top': '30px',
      'margin-bottom': '14px',
      'line-height': '1.5',
      'padding-bottom': '6px',
      'border-bottom': '2px dotted #d98141',
    },
    blockquote: {
      'border-left': '4px solid #d98141',
      'background-color': '#f2ead8',
      color: '#7a6a58',
      'padding-top': '14px',
      'padding-right': '18px',
      'padding-bottom': '14px',
      'padding-left': '18px',
      'margin-top': '0',
      'margin-bottom': '20px',
      'border-radius': '12px',
      'font-style': 'italic',
    },
    pre: {
      'background-color': '#fffaef',
      color: '#3a2d20',
      'padding-top': '14px',
      'padding-right': '16px',
      'padding-bottom': '14px',
      'padding-left': '16px',
      'border-radius': '10px',
      border: '1px solid #e0d1ba',
      'overflow-x': 'auto',
      'white-space': 'pre',
      'max-width': '100%',
      'box-sizing': 'border-box',
      'box-shadow': 'inset -14px 0 10px -10px rgba(90,60,30,0.18)',
      'margin-top': '0',
      'margin-bottom': '20px',
      'font-size': '13px',
      'line-height': '1.7',
    },
    code: {
      'background-color': '#f3e4cc',
      color: '#b96234',
      padding: '2px 6px',
      'border-radius': '4px',
      'font-size': '14px',
    },
  },

  // ============================================================
  // 容器视觉（仅 quoteCard，与原 index.ts 对齐）
  // ============================================================
  containers: {
    quoteCard: {
      'background-color': '#fffaf1',
      padding: '22px 20px',
      margin: '22px 0',
      'border-radius': '14px',
      border: '1px dashed #e0d1ba',
    },
  },

  // 不声明签名容器（Phase 5 再补齐）
  signatureContainers: [],

  // ============================================================
  // 模板覆盖（原 index.ts 的 cover / authorBar）
  // ============================================================
  templates: {
    cover: `::: cover 本期主题
![封面占位](https://placehold.co/1200x630?text=life)

_一盏茶、一扇窗、一些可以慢下来的小事。_
:::
`,
    authorBar: `::: author 如初 role=生活作者
写于一个有风的下午。

记录日常、饭桌与缓慢的季节。
:::
`,
  },

  meta: {
    createdAt: '2026-04-20',
    ownerNotes:
      'Phase 2 / PR 8 迁移：assets.ts 的 11 个 SVG 全部 AST 化；dividerDots 的 4 组 rotated group 静态展开；iconFrame() helper 在 4 个图标里手动内联。',
  },
}

export default spec
