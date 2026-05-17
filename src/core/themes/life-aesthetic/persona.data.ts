/**
 * life-aesthetic · 慢生活 · PersonaSpec
 *
 * 定位：暖米底 + 圆角柔和，记录饮食/旅行/长日的非虚构生活写作。
 * 视觉语言：手绘有机 · 波浪分割 · 花瓣/叶片装饰 · 软圆图标。
 */

import type { PersonaSpec } from '../_shared/spec'

export const spec: PersonaSpec = {
  id: 'life-aesthetic',
  name: '慢生活',
  description: '暖米底 + 圆角柔和，写写饮食、旅行与长日',
  audience: '生活写作 / 非虚构随笔',
  // applyPalette fallback：用户基于本主题自定义配色时，SVG assets 走 `soft` 工厂
  // （圆角更柔和的图形语言）。spec-first 主路径不消费此字段。
  svgVariant: 'soft',

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
    preBg: '#fffaef', // 暖米卡纸的代码块底（比 bg 再亮一档）
    codeBg: '#f3e4cc', // inline code 暖米底（饱和度低于 bgMuted，配 code 主色 #b96234 形成"做旧标签纸"感）
    quoteCardBg: '#fffaf1', // quote-card 引用卡背景（最亮的一层，让 pull-quote 在卡纸底上微"抬"）
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
    quote: 'magazine-dropcap', // 散文体首字下沉引号，与生活化叙事节奏匹配
    compare: 'stacked-row', // 慢生活偏陈述：先 A 再 B，避免双列拥挤
    steps: 'step-card', // 浅底卡片化分步，手绘信笺式分章
    divider: 'flower', // 装饰叶片分隔，与 bubble-organic 同手绘语汇
    sectionTitle: 'ribbon-stamp', // 左侧手绘戳记 + 标题，慢生活刊物章名
    codeBlock: 'inline-card', // 偶引代码用 tinted 软底卡，与正文同色族
    note: 'dotted-margin', // dotted 左竖线 + 缩进，散文页边批注，比 minimal-callout 更"手记"
    footnotes: 'boxed-aside', // 软底卡片 + pill kicker，narrative aside
    recommend: 'card-list',
    qrcode: 'bare',
    footerCTA: 'button-led',
    pullQuote: 'giant-mark',
    announcement: 'danger-bar',
    tableCard: 'rule-grid',
    gallery: 'duo',
    dialogue: 'qa-rows',
  },

  // ============================================================
  // 元素级样式
  // ============================================================
  elements: {
    // 展签标题：字重 500（不 700）+ 大字距，杂志页眉的"稀疏克制"感
    h1: {
      'font-size': '24px',
      'font-weight': '500',
      color: '#3a2d20',
      'margin-top': '32px',
      'margin-bottom': '18px',
      'line-height': '1.45',
      'letter-spacing': '3px',
      'text-align': 'center',
    },
    h2: {
      'font-size': '20px',
      'font-weight': '600',
      color: '#3a2d20',
      'margin-top': '30px',
      'margin-bottom': '14px',
      'line-height': '1.5',
      'padding-bottom': '6px',
      'border-bottom': '2px dotted #d98141',
    },
    // 条目级：与正文同字号，靠字重 600 + 字距区分，不加装饰
    h3: {
      'font-size': '15px',
      'font-weight': '600',
      color: '#3a2d20',
      'margin-top': '24px',
      'margin-bottom': '10px',
      'line-height': '1.6',
      'letter-spacing': '1.2px',
    },
    // 四级标题：与正文并排、靠字重 600 轻描淡写，不抢戏
    h4: {
      'font-size': '15px',
      'font-weight': '600',
      color: '#7a6a58',
      'margin-top': '18px',
      'margin-bottom': '8px',
      'line-height': '1.6',
      'letter-spacing': '0.8px',
    },
    h5: {
      'font-size': '15px',
      'font-weight': '600',
      color: '#7a6a58',
      'margin-top': '16px',
      'margin-bottom': '6px',
      'line-height': '1.6',
      'letter-spacing': '1px',
    },
    h6: {
      'font-size': '13px',
      'font-weight': '500',
      color: '#7a6a58',
      'margin-top': '12px',
      'margin-bottom': '4px',
      'line-height': '1.55',
      'letter-spacing': '1.5px',
      'text-transform': 'uppercase',
    },
    // 正文杂志行高 1.85（书斋是 2.0，这里略收紧）+ 字距 0.8px（不拉开）
    p: {
      'font-size': '15px',
      'line-height': '1.85',
      color: '#3a2d20',
      'margin-top': '0',
      'margin-bottom': '22px',
      'letter-spacing': '0.8px',
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
      'margin-bottom': '22px',
      'border-radius': '10px',
      'font-style': 'italic',
      'letter-spacing': '0.6px',
    },
    // 列表：行距宽松（生活清单需要呼吸感）
    ul: { 'padding-left': '20px', 'margin-top': '0', 'margin-bottom': '22px' },
    ol: { 'padding-left': '20px', 'margin-top': '0', 'margin-bottom': '22px' },
    li: {
      'margin-bottom': '10px',
      'line-height': '1.85',
      color: '#3a2d20',
      'letter-spacing': '0.6px',
    },
    // 强调：字重 600（不 700）+ 同文字色，克制不广告感
    strong: { 'font-weight': '600', color: '#3a2d20' },
    em: { 'font-style': 'italic', color: '#7a6a58' },
    // 链接：走主色暖橙，下划线保持可识别
    a: { color: '#d98141', 'text-decoration': 'underline' },
    // 分割线：细发丝、暖边框色，上下留白比 default 大
    hr: {
      border: 'none',
      height: '1px',
      'background-color': '#e0d1ba',
      'margin-top': '28px',
      'margin-bottom': '28px',
    },
    // 图片：软圆角（10px，不是 0 直角也不是 6px 教程感）
    img: {
      'max-width': '100%',
      display: 'block',
      'margin-top': '12px',
      'margin-right': 'auto',
      'margin-bottom': '12px',
      'margin-left': 'auto',
      'border-radius': '10px',
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
    // 柔键：bgSoft 暖米底 + 大圆角 (radius.md=12px) + 不对称边框（底边加重代替 box-shadow），手账标签感
    kbd: {
      display: 'inline-block',
      'background-color': '#f2ead8',
      color: '#3a2d20',
      'border-top': '1px solid #e0d1ba',
      'border-right': '1px solid #e0d1ba',
      'border-bottom': '2px solid #d98141',
      'border-left': '1px solid #e0d1ba',
      'border-radius': '12px',
      padding: '1px 8px',
      'font-size': '12px',
      'line-height': '1.4',
      'vertical-align': 'middle',
    },
    // 慢生活柔表：radius.md 圆角 + textMuted serif 色系 + 弱 border（行间 hairline，无列框）
    table: {
      'border-collapse': 'collapse',
      width: '100%',
      'margin-top': '0',
      'margin-bottom': '22px',
      'font-size': '14px',
    },
    th: {
      'border-bottom': '1.5px solid #d98141',
      'border-top': 'none',
      'border-left': 'none',
      'border-right': 'none',
      padding: '8px 12px',
      'background-color': 'transparent',
      'text-align': 'left',
      'font-weight': '600',
      color: '#3a2d20',
      'letter-spacing': '0.5px',
    },
    td: {
      'border-bottom': '1px solid #e0d1ba',
      'border-top': 'none',
      'border-left': 'none',
      'border-right': 'none',
      padding: '8px 12px',
      color: '#3a2d20',
    },
  },

  // ============================================================
  // 内联强调：暖米底 + 主色调，避开 default 的 #fff4c8 黄
  // ============================================================
  inline: {
    // 暖奶油 highlight：复用 warning.soft 米黄，与 bgSoft 同体温不刺眼
    highlight: {
      'background-color': '#fcf1dc',
      color: '#3a2d20',
      padding: '0 4px',
      'border-radius': '3px',
    },
    // 波浪线走 accent 暖黄
    wavy: {
      'text-decoration': 'underline wavy',
      'text-decoration-color': '#efb758',
      'text-underline-offset': '3px',
    },
    // 着重：primary 暖橙 + 600 字重，比 strong 更亮但仍不刺眼
    emphasis: {
      color: '#d98141',
      'font-weight': '600',
    },
    del: {
      color: '#7a6a58',
      'text-decoration': 'line-through',
    },
    ins: {
      color: '#d98141',
      'text-decoration': 'underline',
    },
  },

  // ============================================================
  // 容器视觉
  // ============================================================
  containers: {
    // 短札引子：大 padding + 暖底 + 无边框，靠留白定义空间
    intro: {
      'background-color': '#f2ead8',
      'border-radius': '10px',
      padding: '20px 22px',
      margin: '0 0 28px 0',
      color: '#7a6a58',
      'letter-spacing': '0.8px',
      'line-height': '1.85',
    },
    // 署名：左侧 3px 暖橙竖条 + 无底色无圆角
    author: {
      'border-left': '3px solid #d98141',
      'background-color': 'transparent',
      'border-radius': '0',
      padding: '6px 0 6px 14px',
      margin: '18px 0',
      color: '#3a2d20',
      'font-size': '14px',
    },
    // 扉页：宽松外边距，图片软圆角由 img 元素接管
    cover: {
      margin: '0 0 32px 0',
    },
    // §章节标题（bordered variant）：variant 接管 2px primary 底线，这里给宽松外边距
    sectionTitle: {
      margin: '32px 0 16px',
      'padding-bottom': '6px',
    },
    // Do/Don't 对照（column-card variant 接管列卡形态）
    compare: { margin: '24px 0' },
    // 步骤（number-circle variant 接管圆圈数字）
    steps: { margin: '24px 0' },
    // 时间线：长日子记账感，留宽外边距让节奏舒缓
    timeline: { margin: '24px 0' },
    // 提示四件套：variant 接管外壳，此处仅声明以计入 voice 覆盖
    // 各自 soft 底色由 status token 驱动，靠 variant 形状差异区分
    tip: {
      'background-color': '#eef3e4',
      'border-radius': '8px',
      padding: '14px 18px',
      margin: '18px 0',
    },
    warning: {
      'background-color': '#fcf1dc',
      'border-radius': '8px',
      padding: '14px 18px',
      margin: '18px 0',
    },
    info: {
      'background-color': '#e6edf3',
      'border-radius': '8px',
      padding: '14px 18px',
      margin: '18px 0',
    },
    danger: {
      'background-color': '#f8e1dc',
      'border-radius': '8px',
      padding: '16px 18px',
      margin: '18px 0',
    },
    // 小记：无框无底色，仅左侧内缩，像书边的铅笔标注
    note: {
      __reset: true,
      'background-color': 'transparent',
      padding: '4px 0 4px 20px',
      margin: '16px 0',
      'border-radius': '0',
    },
    quoteCard: {
      'background-color': '#fffaf1',
      padding: '22px 20px',
      margin: '22px 0',
      'border-radius': '12px',
      border: '1px dashed #e0d1ba',
    },
    // 重音段：大内缩 + 字号升 1px + 无底色，靠留白和字距自然"抬头"
    highlight: {
      'background-color': 'transparent',
      padding: '8px 28px',
      margin: '22px 0',
      'border-radius': '0',
      'font-size': '16px',
      'font-weight': '500',
      'letter-spacing': '1px',
    },
    // 卷末：宽松上下 padding + 无底色，与正文保持同一"白纸"底
    footerCTA: {
      margin: '32px 0',
      padding: '28px 0 20px 0',
      'background-color': 'transparent',
      'border-radius': '0',
    },
    // 书单：暖底 + 内缩，与 intro 同血统但更紧凑
    recommend: {
      margin: '24px 0',
      padding: '18px 22px',
      'background-color': '#f2ead8',
      'border-radius': '10px',
    },
    // 印章位：居中底色 + 细边框内衬，让 QR code 落在暖底上
    qrcode: {
      margin: '28px 0',
      padding: '18px',
      'background-color': '#faf6f0',
      'border-radius': '10px',
    },
    // 柔图注：居中 serif 色系小字 + 字距 0 + textMuted 弱化，暖米底上的轻描淡写
    imageCaption: {
      margin: '6px 0 20px',
      'text-align': 'center',
      'font-size': '12px',
      color: '#7a6a58',
      'font-style': 'italic',
      'letter-spacing': '0',
      'line-height': '1.6',
    },
    // 慢生活作者卡：圆角软底 + 暖橙顶线，scrapbook 签名感
    authorBio: {
      __reset: true,
      'background-color': '#f2ead8',
      'border-top': '2px solid #d98141',
      'border-radius': '12px',
      padding: '18px 20px',
      margin: '28px 0',
      color: '#3a2d20',
    },
  },

  signatureContainers: [
    'imageCaption', // 柔图注（居中 italic textMuted 小字）
    'authorBio', // 慢生活作者卡（圆角软底 + 暖橙顶线）
  ],

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
      '11 件 SVG motif 全部 AST 化；dividerDots 的 4 组 rotated group 静态展开；iconFrame helper 已在 4 个图标内联。',
  },
}

export default spec
