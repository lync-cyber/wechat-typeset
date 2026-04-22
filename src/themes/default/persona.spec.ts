/**
 * default · 有意识的中立 · PersonaSpec
 *
 * 定位（规范 §0）：对所有题材保持公平，不抢戏、不偷懒。
 * 参照坐标：Medium 默认阅读视图、Notion 默认块、Substack 未定制版面、MDN 未登录默认态。
 *
 * 三条不可妥协决策（规范 §1.1 / §1.4）：
 *   1. primary = #2558b0 编辑蓝（Medium/Economist/MDN 链接蓝家族；非 Bootstrap #007bff）
 *   2. accent = primary（字段保留但视觉系统里已删掉 accent 这个独立变量）
 *   3. motifs 故意只保留 4 件装饰 + 4 件语义图标 + stepBadge + sectionCorner 备用；**删除 quoteMark**
 *
 * 迁移：本文件是 Phase 2 的 pilot。index.ts 只需 `specToTheme(spec)` 一行导出。
 */

import type { PersonaSpec } from '../_shared/spec'

export const spec: PersonaSpec = {
  id: 'default',
  name: '默认主题',
  description: '有意识的中立——Medium/Notion/Substack 默认家族',
  audience: '通用（全题材公平阅读）',

  // ============================================================
  // 色板（规范 §1.1 色彩表）
  // ============================================================
  palette: {
    primary: '#2558b0',
    secondary: '#8a8f98',
    accent: '#2558b0', // = primary：default 视觉语言里删掉 accent 作为独立变量
    bg: '#fdfdfc',
    bgSoft: '#f5f5f3',
    bgMuted: '#eceae4',
    text: '#1c1f24',
    textMuted: '#636870',
    textInverse: '#fefefe', // 纯白用 #fefefe 规避 SVG→PNG 透明化
    border: '#d8d8d4',
    code: '#1c1f24', // default 拒绝让 code 承担颜色
  },

  // 语义四色（规范 §1.1 语义色表）——"最寡淡的那个版本"
  status: {
    tip: { accent: '#1f8a4c', soft: '#eef6ef' },
    info: { accent: '#2558b0', soft: '#eef2f9' }, // = primary
    warning: { accent: '#9a6b1a', soft: '#f7f0df' },
    danger: { accent: '#b42318', soft: '#fbecea' },
  },

  // ============================================================
  // 字号 / 间距 / 圆角
  // ============================================================
  typography: {
    baseSize: 15,
    lineHeight: 1.75,
    h1Size: 22, // 比 business 26 / literary 26 / life 28 都小
    h2Size: 19, // 与 literary 19 同档
    h3Size: 16, // 与正文 15 几乎同号
    letterSpacing: 0.3, // 全部 ≤ 0.3
  },
  spacing: {
    paragraph: 18,
    section: 28,
    listItem: 8,
    containerPadding: 16,
  },
  radius: { sm: 4, md: 6, lg: 8 }, // 禁用 16px+ 圆角

  // ============================================================
  // Motifs（规范 §1.4：default 仅保留 4 装饰 + 4 图标 + stepBadge + sectionCorner）
  // ============================================================
  motifs: {
    // h2Prefix：3×16 单竖条（Medium h2 左侧单根色线）
    h2Prefix: {
      viewBox: [0, 0, 3, 20],
      width: 3,
      height: 16,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 8 },
      primitives: [{ type: 'rect', x: 0, y: 0, w: 3, h: 20, fill: '#2558b0' }],
    },

    // dividerWave：stroke-width 1.2 的单根正弦
    dividerWave: {
      viewBox: [0, 0, 240, 12],
      width: 220,
      height: 12,
      primitives: [
        {
          type: 'path',
          d: 'M0,6 Q15,0 30,6 T60,6 T90,6 T120,6 T150,6 T180,6 T210,6 T240,6',
          stroke: '#d8d8d4',
          strokeWidth: 1.2,
        },
      ],
    },

    // dividerDots：3 颗圆点居中（96/120/144）——比 4 点更疏朗、更中性
    dividerDots: {
      viewBox: [0, 0, 240, 8],
      width: 220,
      height: 8,
      primitives: [
        { type: 'circle', cx: 96, cy: 4, r: 2, fill: '#d8d8d4' },
        { type: 'circle', cx: 120, cy: 4, r: 2, fill: '#d8d8d4' },
        { type: 'circle', cx: 144, cy: 4, r: 2, fill: '#d8d8d4' },
      ],
    },

    // dividerFlower：两线 + 中央单圆点（Medium/Substack 通用 ornamental break）
    dividerFlower: {
      viewBox: [0, 0, 240, 10],
      width: 220,
      height: 10,
      primitives: [
        { type: 'line', x1: 0, y1: 5, x2: 110, y2: 5, stroke: '#d8d8d4', strokeWidth: 1 },
        { type: 'line', x1: 130, y1: 5, x2: 240, y2: 5, stroke: '#d8d8d4', strokeWidth: 1 },
        { type: 'circle', cx: 120, cy: 5, r: 3, fill: '#2558b0' },
      ],
    },

    // sectionCorner：2px 细描边 L（Notion/Substack 可选列表标记）
    sectionCorner: {
      viewBox: [0, 0, 14, 14],
      width: 12,
      height: 12,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        {
          type: 'path',
          d: 'M1,1 L13,1 M1,1 L1,13',
          stroke: '#2558b0',
          strokeWidth: 2,
          strokeLinecap: 'square',
        },
      ],
    },

    // tipIcon：圆圈 + i（四态同骨架，只靠色相区分）
    tipIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        { type: 'circle', cx: 8, cy: 8, r: 6, stroke: '#1f8a4c', strokeWidth: 1.5 },
        { type: 'circle', cx: 8, cy: 5, r: 0.9, fill: '#1f8a4c' },
        { type: 'rect', x: 7.25, y: 7, w: 1.5, h: 5, rx: 0.4, fill: '#1f8a4c' },
      ],
    },

    // infoIcon：圆圈 + i（info = primary 色）
    infoIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        { type: 'circle', cx: 8, cy: 8, r: 6, stroke: '#2558b0', strokeWidth: 1.5 },
        { type: 'circle', cx: 8, cy: 5, r: 0.9, fill: '#2558b0' },
        { type: 'rect', x: 7.25, y: 7, w: 1.5, h: 5, rx: 0.4, fill: '#2558b0' },
      ],
    },

    // warningIcon：三角形 + !
    warningIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        {
          type: 'path',
          d: 'M8,2 L14.5,13.5 L1.5,13.5 Z',
          stroke: '#9a6b1a',
          strokeWidth: 1.5,
          strokeLinejoin: 'round',
        },
        { type: 'rect', x: 7.25, y: 6, w: 1.5, h: 4, rx: 0.4, fill: '#9a6b1a' },
        { type: 'circle', cx: 8, cy: 11.5, r: 0.9, fill: '#9a6b1a' },
      ],
    },

    // dangerIcon：实心圆 + 白色横线（用 #fefefe 规避 SVG→PNG #fff 透明化）
    dangerIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        { type: 'circle', cx: 8, cy: 8, r: 6, fill: '#b42318' },
        { type: 'rect', x: 3, y: 7, w: 10, h: 2, fill: '#fefefe' },
      ],
    },

    // stepBadge：实心圆 + 白数字（{N} 占位）
    stepBadge: {
      viewBox: [0, 0, 24, 24],
      width: 24,
      height: 24,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 8 },
      placeholders: ['N'],
      primitives: [
        { type: 'circle', cx: 12, cy: 12, r: 11, fill: '#2558b0' },
        {
          type: 'text',
          x: 12,
          y: 17,
          content: '{N}',
          fontSize: 14,
          fontWeight: 700,
          fill: '#fefefe',
          textAnchor: 'middle',
        },
      ],
    },
  },

  // ============================================================
  // 骨架变体（规范 §2 每节的 primary variant）
  // ============================================================
  variants: {
    admonition: 'accent-bar', // 四态统一左 3px 色条 + 浅底
    quote: 'classic', // bgSoft + 居中（不导出 quoteMark SVG，走字符回退）
    compare: 'column-card', // 等宽两栏 table-cell
    steps: 'number-circle', // 数字圆圈纵向堆叠
    divider: 'rule', // 单根 border 色细线
    sectionTitle: 'bordered', // 底部 2px primary 下划线
    codeBlock: 'bare', // 拒绝 header-bar（那是 tech-explainer 签名）
  },

  // ============================================================
  // 元素级样式（规范 §1.2 typographic voice）
  // ============================================================
  elements: {
    h1: {
      'font-size': '22px',
      'font-weight': '700',
      color: '#1c1f24',
      'margin-top': '28px',
      'margin-bottom': '14px',
      'line-height': '1.45',
      'letter-spacing': '0.3px',
    },
    h2: {
      'font-size': '19px',
      'font-weight': '700',
      color: '#1c1f24',
      'margin-top': '28px',
      'margin-bottom': '12px',
      'line-height': '1.5',
      'padding-bottom': '6px',
      'border-bottom': '2px solid #2558b0',
      'letter-spacing': '0.3px',
    },
    h3: {
      'font-size': '16px',
      'font-weight': '700',
      color: '#1c1f24',
      'margin-top': '22px',
      'margin-bottom': '10px',
      'line-height': '1.55',
      'letter-spacing': '0.2px',
    },
    h4: {
      'font-size': '14px',
      'font-weight': '600',
      color: '#1c1f24',
      'margin-top': '16px',
      'margin-bottom': '6px',
      'line-height': '1.5',
      'letter-spacing': '0.2px',
    },
    p: {
      'font-size': '15px',
      'line-height': '1.75',
      color: '#1c1f24',
      'margin-top': '0',
      'margin-bottom': '18px',
      'letter-spacing': '0.3px',
    },
    blockquote: {
      'border-left': '3px solid #2558b0',
      'background-color': '#f5f5f3',
      color: '#636870',
      'padding-top': '12px',
      'padding-right': '16px',
      'padding-bottom': '12px',
      'padding-left': '16px',
      'margin-top': '0',
      'margin-bottom': '18px',
      'border-radius': '4px',
    },
    ul: { 'padding-left': '24px', 'margin-top': '0', 'margin-bottom': '18px' },
    ol: { 'padding-left': '24px', 'margin-top': '0', 'margin-bottom': '18px' },
    li: {
      'margin-bottom': '8px',
      'line-height': '1.75',
      color: '#1c1f24',
    },
    kbd: {
      display: 'inline-block',
      'background-color': '#f5f5f3',
      color: '#1c1f24',
      border: '1px solid #d8d8d4',
      'border-bottom-width': '2px',
      'border-radius': '3px',
      padding: '1px 6px',
      'font-size': '12px',
      'line-height': '1.4',
      'vertical-align': 'middle',
    },
    a: {
      color: '#2558b0',
      'text-decoration': 'underline',
    },
    hr: {
      border: 'none',
      height: '1px',
      'background-color': '#d8d8d4',
      'margin-top': '24px',
      'margin-bottom': '24px',
    },
    img: {
      'max-width': '100%',
      display: 'block',
      'margin-top': '10px',
      'margin-right': 'auto',
      'margin-bottom': '10px',
      'margin-left': 'auto',
      'border-radius': '6px',
    },
    strong: { 'font-weight': '700', color: '#1c1f24' },
    em: { 'font-style': 'italic', color: '#1c1f24' },

    // 代码块（规范 §3.4：拒绝 Atom One Dark / VSCode Dark+ 原值）
    pre: {
      'background-color': '#2a2d32',
      color: '#d8d8d4',
      'padding-top': '14px',
      'padding-right': '16px',
      'padding-bottom': '14px',
      'padding-left': '16px',
      'border-radius': '6px',
      'overflow-x': 'auto',
      'white-space': 'pre',
      'max-width': '100%',
      'box-sizing': 'border-box',
      'box-shadow': 'inset -14px 0 10px -10px rgba(0,0,0,0.28)',
      'margin-top': '0',
      'margin-bottom': '20px',
      'font-size': '13px',
      'line-height': '1.6',
    },
    code: {
      'background-color': '#eceae4',
      color: '#1c1f24',
      padding: '2px 6px',
      'border-radius': '3px',
      'font-size': '14px',
    },
  },

  // ============================================================
  // 内联强调（规范 §1.3）
  // ============================================================
  inline: {
    highlight: {
      'background-color': '#fff4c8', // Notion <mark> 浅米黄
      color: '#1c1f24',
      padding: '0 3px',
      'border-radius': '2px',
    },
    wavy: {
      'text-decoration': 'underline wavy',
      'text-decoration-color': '#2558b0',
      'text-underline-offset': '3px',
    },
    emphasis: {
      color: '#2558b0',
      'font-weight': '600',
    },
  },

  // ============================================================
  // 容器视觉（规范 §2 的 19 个 container）
  // ============================================================
  containers: {
    intro: {
      'background-color': '#f5f5f3',
      'border-radius': '6px',
      padding: '14px 16px',
      margin: '18px 0',
      color: '#636870',
      'line-height': '1.7',
    },
    author: {
      'background-color': '#f5f5f3',
      'border-radius': '6px',
      padding: '12px 14px',
      margin: '16px 0',
      'font-size': '13px',
      color: '#636870',
    },
    cover: {
      margin: '20px 0',
    },
    tip: {},
    warning: {},
    info: {},
    danger: {},
    quoteCard: {
      'background-color': '#f5f5f3',
      padding: '18px 20px',
      margin: '22px 0',
      'border-radius': '6px',
    },
    highlight: {
      'background-color': '#fff4c8',
      padding: '12px 14px',
      margin: '16px 0',
      'border-radius': '4px',
    },
    compare: { margin: '20px 0' },
    steps: { margin: '20px 0' },
    sectionTitle: {
      margin: '24px 0 12px',
      'padding-bottom': '6px',
      'border-bottom': '2px solid #2558b0',
    },
    footerCTA: {
      margin: '28px 0',
      padding: '16px',
      'background-color': '#f5f5f3',
      'border-radius': '8px',
      border: '1px solid #d8d8d4',
    },
    recommend: {
      margin: '22px 0',
      padding: '14px 16px',
      'background-color': '#f5f5f3',
      'border-radius': '6px',
      'border-left': '3px solid #8a8f98',
    },
    qrcode: {
      margin: '22px 0',
      padding: '16px',
      border: '1px solid #d8d8d4',
      'border-radius': '6px',
    },
    // 第五态 note：刻意不走"左条 + 浅底"——顶端 1px 虚线 + 无底色的手写批注感，
    // 低调补充而非视觉抢位。主题想要"框感/左条"可在自家 spec.containers.note 覆写。
    note: {
      'background-color': 'transparent',
      'border-top': '1px dashed #c8ccd4',
      padding: '10px 2px 8px',
      margin: '16px 0',
      color: '#636870',
    },
  },

  // default 只用通用容器（不声明任何签名容器）
  signatureContainers: [],

  meta: {
    createdAt: '2026-04-20',
    ownerNotes:
      'pilot: Phase 2 的第一个 persona.spec.ts；规范 §0-§3.4 三条不可妥协决策在本文档落实。',
  },
}

export default spec
