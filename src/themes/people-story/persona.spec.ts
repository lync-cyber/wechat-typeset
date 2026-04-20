/**
 * people-story · 人物特稿 · PersonaSpec
 *
 * 定位（规范 §0）：**《人物》杂志 / GQ 特稿 / New Yorker Profiles** 的公众号呈现。
 * 气质关键词：**肖像感、克制、冷米、瘦细线、巨大引号、一个人物色**。
 *
 * 三条签名动作（规范 §结语）：
 *   1. primary #1b2330 深墨靛 + accent #8a3f2b 深铁锈 + bg #f2efe7 冷米（三锚点不许动）
 *   2. Drop cap：intro 首段首字 48px / 700 / accent / inline-block（behavior.introDropcap）
 *   3. quoteCard = 巨号 serif 引号 SVG + 25px 金句 + byline attribution
 *
 * accent 稀缺纪律：每篇最多三处 —— drop cap + pull-quote 引号 + 罗马数字.
 *
 * 迁移：Phase 2 / PR 10 —— index.ts 只负责 `specToTheme(spec)`。
 */

import type { PersonaSpec } from '../_shared/spec'

export const spec: PersonaSpec = {
  id: 'people-story',
  name: '人物特稿',
  description: '《人物》杂志 / New Yorker Profiles 家族，特稿的"肖像感"排版',
  audience: '人物特稿 / 人文非虚构 / 杂志 Profile',

  // ============================================================
  // 色板（规范 §1.1）
  // ============================================================
  palette: {
    primary: '#1b2330', // 深墨靛
    secondary: '#4a5260', // 靛灰
    accent: '#8a3f2b', // 深铁锈（旧照片里的红）
    bg: '#f2efe7', // 冷米
    bgSoft: '#e9e5db',
    bgMuted: '#dcd7c9',
    text: '#17171a',
    textMuted: '#5d5d63', // 版权灰
    textInverse: '#f2efe7', // = bg（规避 #fff 透明化陷阱）
    border: '#c8c2b3',
    code: '#5d5d63', // = textMuted
  },

  // 语义四色（规范 §1.1）
  status: {
    tip: { accent: '#4a6a7a', soft: '#d9dfe2' }, // 钢笔蓝灰（采访手记）
    info: { accent: '#556170', soft: '#d6d9dd' }, // 灰铅笔（背景说明）
    warning: { accent: '#7a6b3a', soft: '#e2ddc8' }, // 档案黄（FACT CHECK）
    danger: { accent: '#6b3a32', soft: '#dccdc7' }, // 暗铁锈浅（官方回应）
  },

  // ============================================================
  // 字号 / 间距 / 圆角
  // ============================================================
  typography: {
    baseSize: 16,
    lineHeight: 1.75,
    h1Size: 28,
    h2Size: 20,
    h3Size: 16,
    letterSpacing: 0.5,
  },
  spacing: {
    paragraph: 20,
    section: 36,
    listItem: 10,
    containerPadding: 20,
  },
  // 规范 §3.9：方版心是杂志，圆角是 App —— 全员 radius 0/0/2
  radius: { sm: 0, md: 0, lg: 2 },

  // ============================================================
  // Motifs（规范 §1.3：巨号 serif 引号 + 瘦细 column rule + 罗马数字 + 肖像 silhouette）
  // ============================================================
  motifs: {
    // h2Prefix：静态 3×13 primary 竖条（behavior.h2RomanNumerals 开启时不消费）
    h2Prefix: {
      viewBox: [0, 0, 3, 13],
      width: 3,
      height: 13,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 10 },
      primitives: [{ type: 'rect', x: 0, y: 0, w: 3, h: 13, fill: '#1b2330' }],
    },

    // sectionCorner：肖像 silhouette —— 头（圆）+ 肩（梯形），border 色让它退后
    sectionCorner: {
      viewBox: [0, 0, 24, 24],
      width: 18,
      height: 18,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 8 },
      primitives: [
        { type: 'circle', cx: 12, cy: 7, r: 4.5, fill: '#c8c2b3' },
        { type: 'path', d: 'M8,16 L16,16 L19,22 L5,22 Z', fill: '#c8c2b3' },
      ],
    },

    // quoteMark：巨号 serif 左双引号（48×42 accent）—— 主题第一装饰
    quoteMark: {
      viewBox: [0, 0, 60, 52],
      width: 48,
      height: 42,
      inlineStyle: { display: 'inline-block', verticalAlign: 'top', marginRight: 6 },
      primitives: [
        {
          type: 'path',
          d: 'M10,4 C4,10 4,24 10,34 C14,40 22,38 22,30 C22,24 16,22 14,22 C14,14 16,10 22,6 L22,4 Z M36,4 C30,10 30,24 36,34 C40,40 48,38 48,30 C48,24 42,22 40,22 C40,14 42,10 48,6 L48,4 Z',
          fill: '#8a3f2b',
          opacity: 0.92,
        },
      ],
    },

    // dividerFlower：菱形 + 两侧瘦细横线（章节分隔）
    dividerFlower: {
      viewBox: [0, 0, 240, 12],
      width: 220,
      height: 12,
      primitives: [
        { type: 'line', x1: 30, y1: 6, x2: 110, y2: 6, stroke: '#c8c2b3', strokeWidth: 1 },
        { type: 'line', x1: 130, y1: 6, x2: 210, y2: 6, stroke: '#c8c2b3', strokeWidth: 1 },
        {
          type: 'path',
          d: 'M120,2 L124,6 L120,10 L116,6 Z',
          fill: '#1b2330',
          opacity: 0.7,
        },
      ],
    },

    // dividerDots：—— · —— byline 分隔
    dividerDots: {
      viewBox: [0, 0, 100, 8],
      width: 100,
      height: 8,
      primitives: [
        { type: 'line', x1: 6, y1: 4, x2: 46, y2: 4, stroke: '#c8c2b3', strokeWidth: 1 },
        { type: 'circle', cx: 50, cy: 4, r: 1.8, fill: '#5d5d63' },
        { type: 'line', x1: 54, y1: 4, x2: 94, y2: 4, stroke: '#c8c2b3', strokeWidth: 1 },
      ],
    },

    // dividerWave：本主题不使用但保留契约（3 段短 dash 替代 wave）
    dividerWave: {
      viewBox: [0, 0, 240, 8],
      width: 220,
      height: 8,
      primitives: [
        { type: 'line', x1: 60, y1: 4, x2: 90, y2: 4, stroke: '#c8c2b3', strokeWidth: 1 },
        { type: 'line', x1: 105, y1: 4, x2: 135, y2: 4, stroke: '#c8c2b3', strokeWidth: 1 },
        { type: 'line', x1: 150, y1: 4, x2: 180, y2: 4, stroke: '#c8c2b3', strokeWidth: 1 },
      ],
    },

    // tipIcon（采访手记）：铅笔划小点 + 短横线
    tipIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        { type: 'circle', cx: 7, cy: 7, r: 1.2, fill: '#4a6a7a', opacity: 0.7 },
        {
          type: 'line',
          x1: 3,
          y1: 10.5,
          x2: 11,
          y2: 10.5,
          stroke: '#4a6a7a',
          strokeWidth: 1,
          opacity: 0.7,
        },
      ],
    },

    // infoIcon（背景说明）：极简 i 柱
    infoIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        { type: 'rect', x: 6.5, y: 3, w: 1, h: 1.5, fill: '#556170', opacity: 0.7 },
        { type: 'rect', x: 6.5, y: 6, w: 1, h: 5, fill: '#556170', opacity: 0.7 },
      ],
    },

    // warningIcon（FACT CHECK 事实核查）：打勾
    warningIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        {
          type: 'path',
          d: 'M3,7 L6,10 L11,4',
          stroke: '#7a6b3a',
          strokeWidth: 1,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          opacity: 0.7,
        },
      ],
    },

    // dangerIcon（官方回应）：短竖杠 —— 法律意见书封口
    dangerIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [{ type: 'rect', x: 6.4, y: 3, w: 1.2, h: 8, fill: '#6b3a32', opacity: 0.7 }],
    },

    // stepBadge：大号数字 + 下横线（24×24）
    // `{N}` 占位符在运行时由渲染器替换为罗马数字（handled outside spec —— see Phase 2 PR10 note）
    stepBadge: {
      viewBox: [0, 0, 40, 40],
      width: 24,
      height: 24,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 10 },
      placeholders: ['N'],
      primitives: [
        {
          type: 'text',
          x: 20,
          y: 26,
          content: '{N}',
          fontSize: 24,
          fontWeight: 700,
          fill: '#8a3f2b',
          textAnchor: 'middle',
        },
        { type: 'line', x1: 8, y1: 32, x2: 32, y2: 32, stroke: '#8a3f2b', strokeWidth: 1.2 },
      ],
    },
  },

  // ============================================================
  // 骨架变体（规范 §2）
  // ============================================================
  variants: {
    admonition: 'minimal-underline', // tip 签名：采访手记（最轻的一档）
    quote: 'magazine-dropcap', // quoteCard：巨号 serif 引号 + 金句 + byline
    compare: 'column-card',
    steps: 'timeline-dot', // stepBadge 走本主题罗马徽章
    divider: 'rule', // 最枯的 1px 横线
    sectionTitle: 'cornered', // 左上肖像 silhouette
    codeBlock: 'bare', // 拒绝 header-bar（那是 tech-explainer）
  },

  // ============================================================
  // Behavior（规范 §结语 4 件事中的 2/3 条）
  // ============================================================
  behavior: {
    // 规范 §1.2：intro 首段首字拆为 <span class="intro-dropcap">X</span>
    introDropcap: true,
    // 规范 §1.3 ③ / §3.7：h2 自动注入 I/II/III 罗马数字前缀
    h2RomanNumerals: true,
  },

  // ============================================================
  // 元素级样式（规范 §1.2）
  // ============================================================
  elements: {
    // h1 28/700/1.2px/1.35 —— 左对齐（杂志封面大名字顶格左对齐）
    h1: {
      'font-size': '28px',
      'font-weight': '700',
      color: '#17171a',
      'margin-top': '28px',
      'margin-bottom': '16px',
      'line-height': '1.35',
      'letter-spacing': '1.2px',
      'text-align': 'left',
    },
    // h2 20/600/1px/1.5 —— 章节前挂罗马数字 span；不做通栏横线
    h2: {
      'font-size': '20px',
      'font-weight': '600',
      color: '#17171a',
      'margin-top': '30px',
      'margin-bottom': '12px',
      'line-height': '1.5',
      'letter-spacing': '1px',
      'border-bottom': 'none',
      'padding-bottom': '0',
    },
    // h3 16/600/0.8px/1.7 —— 与正文同号，靠字重跳一档
    h3: {
      'font-size': '16px',
      'font-weight': '600',
      color: '#17171a',
      'margin-top': '22px',
      'margin-bottom': '10px',
      'line-height': '1.7',
      'letter-spacing': '0.8px',
    },
    // h4：小节引导，介于 h3 与正文之间
    h4: {
      'font-size': '15px',
      'font-weight': '600',
      color: '#17171a',
      'margin-top': '18px',
      'margin-bottom': '8px',
      'line-height': '1.6',
      'letter-spacing': '0.5px',
    },
    // p 16/400/0.5px/1.75 —— 红线行高 1.75
    p: {
      'font-size': '16px',
      'line-height': '1.75',
      color: '#17171a',
      'margin-top': '0',
      'margin-bottom': '20px',
      'letter-spacing': '0.5px',
    },
    // blockquote：双侧 1px textMuted 竖线（column-rule 气质）
    blockquote: {
      'border-left': '1px solid #5d5d63',
      'border-right': '1px solid #5d5d63',
      'background-color': 'transparent',
      color: '#5d5d63',
      'padding-top': '8px',
      'padding-right': '20px',
      'padding-bottom': '8px',
      'padding-left': '20px',
      'margin-top': '0',
      'margin-bottom': '18px',
      'border-radius': '0',
      'font-size': '16px',
      'letter-spacing': '0.8px',
    },
    ul: { 'padding-left': '24px', 'margin-top': '0', 'margin-bottom': '20px' },
    ol: { 'padding-left': '24px', 'margin-top': '0', 'margin-bottom': '20px' },
    li: {
      'margin-bottom': '10px',
      'line-height': '1.75',
      color: '#17171a',
      'letter-spacing': '0.5px',
    },
    // strong 500 —— 杂志正文加粗克制
    strong: { 'font-weight': '500', color: '#17171a' },
    em: { 'font-style': 'italic', color: '#17171a' },
    // 链接走 primary 深墨靛（accent 是稀缺色）
    a: {
      color: '#1b2330',
      'text-decoration': 'underline',
    },
    // divider rule：1px border 色横线 + 36px 上下 margin
    hr: {
      border: 'none',
      height: '1px',
      'background-color': '#c8c2b3',
      'margin-top': '36px',
      'margin-bottom': '36px',
    },
    // cover：图片 radius 0（杂志封面从不圆角）
    img: {
      'max-width': '100%',
      display: 'block',
      'margin-top': '12px',
      'margin-right': 'auto',
      'margin-bottom': '12px',
      'margin-left': 'auto',
      'border-radius': '0',
    },
    pre: {
      'background-color': '#dcd7c9',
      color: '#17171a',
      'padding-top': '14px',
      'padding-right': '16px',
      'padding-bottom': '14px',
      'padding-left': '16px',
      'border-radius': '0',
      border: '1px solid #c8c2b3',
      'overflow-x': 'auto',
      'white-space': 'pre',
      'max-width': '100%',
      'box-sizing': 'border-box',
      'box-shadow': 'inset -14px 0 10px -10px rgba(0,0,0,0.12)',
      'margin-top': '0',
      'margin-bottom': '20px',
      'font-size': '13px',
      'line-height': '1.7',
    },
    code: {
      'background-color': '#dcd7c9',
      color: '#5d5d63', // = textMuted
      padding: '1px 5px',
      'border-radius': '0',
      'font-size': '14px',
    },
  },

  // ============================================================
  // Inline 强调（规范 §1.3）
  // ============================================================
  inline: {
    // highlight 走 bgSoft 底 + text 色 —— 不做荧光黄，不染 accent
    highlight: {
      'background-color': '#e9e5db',
      color: '#17171a',
      padding: '0 3px',
      'border-radius': '0',
    },
    // 波浪线走 primary 深墨靛（accent 是稀缺色）
    wavy: {
      'text-decoration': 'underline wavy',
      'text-decoration-color': '#1b2330',
      'text-underline-offset': '3px',
    },
    // emphasis：primary + 500（字重克制）
    emphasis: {
      color: '#1b2330',
      'font-weight': '500',
    },
  },

  // ============================================================
  // 容器视觉（规范 §2）
  // ============================================================
  containers: {
    // intro：人物卡 / 导语 —— bgSoft 底 + 20×24 padding + radius 0
    intro: {
      'background-color': '#e9e5db',
      'border-radius': '0',
      padding: '20px 24px',
      margin: '0 0 32px 0',
      color: '#17171a',
    },
    // author：记者 / 摄影条 —— 单行横排，无底色无边框无圆角
    author: {
      'background-color': 'transparent',
      'border-radius': '0',
      padding: '10px 0',
      margin: '0 0 24px 0',
    },
    // cover：杂志封面一体化 —— radius 0，大 margin
    cover: {
      margin: '0 0 40px 0',
    },
    // 四态容器外壳（variant 接管）
    tip: {},
    warning: {},
    info: {},
    danger: {},
    // quoteCard：特稿心脏 —— 无底色、无边框、无圆角
    quoteCard: {
      'background-color': 'transparent',
      'border-radius': '0',
      border: 'none',
      padding: '24px 24px 20px 36px',
      margin: '32px 0',
    },
    // highlight：年表片段 / 生平要点 —— 无底色无边框
    highlight: {
      'background-color': 'transparent',
      'border-radius': '0',
      padding: '16px 0',
      margin: '20px 0',
    },
    compare: { margin: '24px 0' },
    steps: { margin: '28px 0' },
    // sectionTitle：章节封面 —— 左上肖像 silhouette + 通栏 1px 横线
    sectionTitle: {
      margin: '48px 0 20px',
      'padding-bottom': '10px',
      'border-bottom': '1px solid #c8c2b3',
    },
    // footerCTA：卷尾致谢 —— 无底色无边框，居中文字块
    footerCTA: {
      margin: '40px 0 0 0',
      padding: '32px 0 24px 0',
      'background-color': 'transparent',
      'border-radius': '0',
      'text-align': 'center',
    },
    // recommend：延伸阅读 —— bgSoft 底 + radius 0
    recommend: {
      margin: '28px 0',
      padding: '18px 22px',
      'background-color': '#e9e5db',
      'border-radius': '0',
    },
    // qrcode：订阅入口 —— 居中 block，无边框无圆角
    qrcode: {
      margin: '24px auto',
      padding: '0',
      'background-color': 'transparent',
      'border-radius': '0',
    },
  },

  // people-story 只用通用容器（Phase 5 再考虑 seal / prelude）
  signatureContainers: [],

  // ============================================================
  // Templates（只声明覆盖项；commonTemplates 隐式作为基线）
  // ============================================================
  templates: {
    cover: `::: cover 张某某
![封面肖像](https://placehold.co/1200x1400?text=portrait)

**作家、翻译家，1967 年生于上海**

他曾在一封给编辑的信里写过：关于写作这件事，最难的从来不是开头。
:::
`,
    authorBar: `::: author 文 / 某记者
摄影 / 某摄影师  ·  2026 年 4 月刊
:::
`,
    tip: `::: tip 采访手记
记者笔记本里的旁注 —— 最轻的一档，无边框，仅标题下方一道短线。
:::
`,
    footerCTA: `::: footer-cta 卷尾致谢
本文基于 2026 年 3 月至 6 月多次采访整理而成。

感谢受访者及所有提供帮助的朋友。
:::
`,
  },

  meta: {
    createdAt: '2026-04-20',
    ownerNotes:
      'Phase 2 / PR 10: accent #8a3f2b 稀缺纪律 —— drop cap + pull-quote + roman 三处封顶. stepBadge {N} 占位符在运行时替换为罗马数字（outside spec）.',
  },
}

export default spec
