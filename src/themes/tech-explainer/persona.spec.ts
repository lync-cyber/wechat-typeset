/**
 * tech-explainer · 白昼课堂技术文档 · PersonaSpec
 *
 * 定位（规范 §0）：这不是"程序员博客皮肤"，是"一份可以逐字跟做的技术产品文档"。
 * 参照坐标：Stripe Docs / Tailwind Docs / MDN / Linear changelog / Vercel 官方文档。
 * 气质关键词：白昼、课堂、友好、引导。
 *
 * 与 tech-geek 的硬边界（规范 §0）：
 *   - 色系 180° 反向（琥珀暖暗 vs 文档蓝清凉白）
 *   - motif 语系完全隔离（manpage vs kbd / $ / 文件路径胶囊 / copyIcon）
 *   - 读者关系完全不同（已懂工程师的冷静随笔 vs 手把手带你做的产品文档）
 *
 * 三条不可妥协决策（规范 §4）：
 *   1. primary = #0066cc Stripe 文档蓝（非紫 SaaS 味、非绿 success 冲突）
 *   2. codeBlock variant = 'header-bar'（Stripe Docs 的 signature）
 *   3. 与 tech-geek 三条硬边界不可破
 *
 * 迁移：Phase 2 / PR 11。本 spec 是 ground truth；index.ts 只做一行投影。
 */

import type { PersonaSpec } from '../_shared/spec'

export const spec: PersonaSpec = {
  id: 'tech-explainer',
  name: '文档白昼',
  description: 'Stripe Docs / MDN 家族，手把手跟做的技术产品文档',
  audience: '技术布道 / 产品文档 / 教程',

  // ============================================================
  // 色板（规范 §1.1 的 committed 版）
  // ============================================================
  palette: {
    primary: '#0066cc', // 文档蓝（Stripe Docs 家族）
    secondary: '#4a90e2', // 链接蓝（primary 的亮化变体）
    accent: '#f59e0b', // 琥珀警示（唯一暖色，仅 Warning / Pro Tip 图标）
    bg: '#fafbfc', // 文档清凉白（1-2% 蓝灰，OLED 长时阅读友好）
    bgSoft: '#f3f5f8', // 侧栏浅底（代码块标签带、author 底、intro 底）
    bgMuted: '#e8ecf1', // 表头灰蓝（table th、inline code 底、filePath 底）
    text: '#1a2233', // 文档墨（接近黑但偏蓝冷，Stripe Docs 正文精确色）
    textMuted: '#5c6778', // 侧注灰（caption / date / 脚注）
    textInverse: '#fefefe', // 反白（规避 #fff 透明化）
    border: '#d9dee5', // 边框灰蓝（融入主色家族的 1px 实线）
    code: '#0066cc', // inline code 字色 = primary（Stripe Docs 标志性）
  },

  // 语义四色（规范 §1.1）——note 在 tech-explainer 里是第五态，走 motifs.noteIcon + textMuted 表达
  status: {
    tip: { accent: '#0d9f7f', soft: '#e6f5f0' }, // Mint 绿
    info: { accent: '#0066cc', soft: '#e6f0fb' }, // = primary（info = "延伸知识点"）
    warning: { accent: '#b87614', soft: '#fdf4e2' }, // 琥珀文字色版（AA on 清凉白）
    danger: { accent: '#c8322d', soft: '#fce9e7' }, // 陶土红
  },

  // ============================================================
  // 字号 / 间距 / 圆角
  // ============================================================
  typography: {
    baseSize: 15,
    lineHeight: 1.75, // 比 tech-geek 的 1.85 略密（教程密度 > 随笔）
    h1Size: 26,
    h2Size: 21,
    h3Size: 17,
    letterSpacing: 0.3,
  },
  spacing: {
    paragraph: 18,
    section: 28,
    listItem: 8,
    containerPadding: 16,
  },
  // 规范纪律：文档感小圆角（≤ 6px）
  radius: { sm: 3, md: 6, lg: 10 },

  // ============================================================
  // Motifs（规范 §1.3）
  //   - h2Prefix：3×16 primary 短竖条
  //   - 五态图标（tip/note/info/warning/danger）共用 16×16、sw=1.5、stroke 空心
  //   - stepBadge、copyIcon、externalLinkIcon、terminalPrompt、sectionCorner、dividerDots
  // ============================================================
  motifs: {
    // h2Prefix：3px × 16px primary 短竖条（唯一 heading 装饰）
    h2Prefix: {
      viewBox: [0, 0, 3, 16],
      width: 3,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 10 },
      primitives: [{ type: 'rect', x: 0, y: 0, w: 3, h: 16, fill: '#0066cc' }],
    },

    // tipIcon：灯泡轮廓（圆头 + 2 道灯座横线），mint 绿
    tipIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        {
          type: 'path',
          d: 'M8,2 C5.5,2 3.8,4 3.8,6.4 C3.8,8 4.6,9.2 5.6,10 L5.6,11.5 L10.4,11.5 L10.4,10 C11.4,9.2 12.2,8 12.2,6.4 C12.2,4 10.5,2 8,2 Z',
          stroke: '#0d9f7f',
          strokeWidth: 1.5,
          strokeLinejoin: 'round',
        },
        { type: 'line', x1: 6, y1: 12.5, x2: 10, y2: 12.5, stroke: '#0d9f7f', strokeWidth: 1.5 },
        { type: 'line', x1: 6.5, y1: 14, x2: 9.5, y2: 14, stroke: '#0d9f7f', strokeWidth: 1.5 },
      ],
    },

    // noteIcon：空心圆 + 中央 i（note 灰 = textMuted）
    noteIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        { type: 'circle', cx: 8, cy: 8, r: 6, stroke: '#5c6778', strokeWidth: 1.5 },
        { type: 'circle', cx: 8, cy: 5, r: 0.9, fill: '#5c6778' },
        { type: 'rect', x: 7.25, y: 7, w: 1.5, h: 5, rx: 0.4, fill: '#5c6778' },
      ],
    },

    // infoIcon：圆角方形 + 中央 i（primary 蓝 = info 色）
    infoIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        { type: 'rect', x: 2, y: 2, w: 12, h: 12, rx: 2, stroke: '#0066cc', strokeWidth: 1.5 },
        { type: 'circle', cx: 8, cy: 5, r: 0.9, fill: '#0066cc' },
        { type: 'rect', x: 7.25, y: 7, w: 1.5, h: 5, rx: 0.4, fill: '#0066cc' },
      ],
    },

    // warningIcon：等边三角形 + 中央 !（warning 琥珀）
    warningIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        {
          type: 'path',
          d: 'M8,2 L14.5,13.5 L1.5,13.5 Z',
          stroke: '#b87614',
          strokeWidth: 1.5,
          strokeLinejoin: 'round',
        },
        { type: 'rect', x: 7.25, y: 6, w: 1.5, h: 4, rx: 0.4, fill: '#b87614' },
        { type: 'circle', cx: 8, cy: 11.5, r: 0.9, fill: '#b87614' },
      ],
    },

    // dangerIcon：八边形 + 中央 ×（陶土红）
    dangerIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        {
          type: 'path',
          d: 'M5.2,1.5 L10.8,1.5 L14.5,5.2 L14.5,10.8 L10.8,14.5 L5.2,14.5 L1.5,10.8 L1.5,5.2 Z',
          stroke: '#c8322d',
          strokeWidth: 1.5,
          strokeLinejoin: 'round',
        },
        {
          type: 'line',
          x1: 5.5,
          y1: 5.5,
          x2: 10.5,
          y2: 10.5,
          stroke: '#c8322d',
          strokeWidth: 1.5,
          strokeLinecap: 'round',
        },
        {
          type: 'line',
          x1: 10.5,
          y1: 5.5,
          x2: 5.5,
          y2: 10.5,
          stroke: '#c8322d',
          strokeWidth: 1.5,
          strokeLinecap: 'round',
        },
      ],
    },

    // stepBadge：primary 蓝 fill 圆 + 白数字（#fefefe 防透明化）
    stepBadge: {
      viewBox: [0, 0, 24, 24],
      width: 24,
      height: 24,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 8 },
      placeholders: ['N'],
      primitives: [
        { type: 'circle', cx: 12, cy: 12, r: 11, fill: '#0066cc' },
        {
          type: 'text',
          x: 12,
          y: 17,
          content: '{N}',
          fontSize: 15,
          fontWeight: 600,
          fill: '#fefefe',
          textAnchor: 'middle',
        },
      ],
    },

    // copyIcon：两叠圆角方形（github/stripe 通用 ⧉ 语汇）
    copyIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle' },
      primitives: [
        { type: 'rect', x: 5, y: 2, w: 9, h: 9, rx: 1.5, stroke: '#5c6778', strokeWidth: 1.5 },
        { type: 'rect', x: 2, y: 5, w: 9, h: 9, rx: 1.5, stroke: '#5c6778', strokeWidth: 1.5 },
      ],
    },

    // externalLinkIcon：45° 箭头 + L 形框（MDN / Stripe Docs 通用外链标识）
    externalLinkIcon: {
      viewBox: [0, 0, 12, 12],
      width: 10,
      height: 10,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginLeft: 3 },
      primitives: [
        {
          type: 'path',
          d: 'M5.5,1.5 L10.5,1.5 L10.5,6.5',
          stroke: '#0066cc',
          strokeWidth: 1.5,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        },
        {
          type: 'line',
          x1: 10.5,
          y1: 1.5,
          x2: 5.5,
          y2: 6.5,
          stroke: '#0066cc',
          strokeWidth: 1.5,
          strokeLinecap: 'round',
        },
        {
          type: 'path',
          d: 'M8.5,10.5 L1.5,10.5 L1.5,3.5',
          stroke: '#0066cc',
          strokeWidth: 1.5,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        },
      ],
    },

    // terminalPrompt：$ 前缀（提示"这行是 shell 命令"）
    terminalPrompt: {
      viewBox: [0, 0, 18, 14],
      width: 14,
      height: 12,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 4 },
      primitives: [
        {
          type: 'text',
          x: 9,
          y: 11,
          content: '$',
          fontSize: 14,
          fontWeight: 600,
          fill: '#0066cc',
          textAnchor: 'middle',
        },
      ],
    },

    // sectionCorner：L 形（sectionTitle variant='cornered' 的兜底；默认 bordered 不用）
    sectionCorner: {
      viewBox: [0, 0, 14, 14],
      width: 12,
      height: 12,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        { type: 'path', d: 'M1,1 L13,1 L13,4 L4,4 L4,13 L1,13 Z', fill: '#0066cc' },
      ],
    },

    // dividerDots：4 颗 primary 圆点（divider variant='dots' 的兜底；默认 rule 不用）
    dividerDots: {
      viewBox: [0, 0, 120, 6],
      width: 60,
      height: 6,
      primitives: [
        { type: 'circle', cx: 30, cy: 3, r: 2, fill: '#0066cc' },
        { type: 'circle', cx: 50, cy: 3, r: 2, fill: '#0066cc' },
        { type: 'circle', cx: 70, cy: 3, r: 2.5, fill: '#0066cc' },
        { type: 'circle', cx: 90, cy: 3, r: 2, fill: '#0066cc' },
      ],
    },
  },

  // ============================================================
  // 骨架变体（规范 §2 每节开头的 primary variant）
  // ============================================================
  variants: {
    admonition: 'accent-bar', // §2.10-2.13 tip/warning/info/danger 全部 accent-bar
    quote: 'column-rule', // §2.5 双侧细竖线夹住段落
    compare: 'column-card', // §2.15 Do/Don't 双栏
    steps: 'number-circle', // §2.16 圆圈数字（+ 容器 border-left 形成串珠）
    divider: 'rule', // §2.17 极简 1px 实线
    sectionTitle: 'bordered', // §2.4 short-bar-heading
    codeBlock: 'header-bar', // §1.2 signature：顶部语言标签带 + copy icon
  },

  // ============================================================
  // 元素级样式（规范 §1.2 typographic voice）
  // ============================================================
  elements: {
    // h1：题头唯一 700 字重；字距 0；无装饰前缀
    h1: {
      'font-size': '26px',
      'font-weight': '700',
      color: '#1a2233',
      'margin-top': '28px',
      'margin-bottom': '14px',
      'line-height': '1.35',
      'letter-spacing': '0',
    },
    // h2：底部 1px border 实线分隔；前缀 3px 短竖条由 motifs.h2Prefix 注入
    h2: {
      'font-size': '21px',
      'font-weight': '600',
      color: '#1a2233',
      'margin-top': '32px',
      'margin-bottom': '14px',
      'line-height': '1.4',
      'padding-bottom': '8px',
      'border-bottom': '1px solid #d9dee5',
      'letter-spacing': '0',
    },
    // h3：无底线无前缀，纯靠字号 + 字重与正文区分
    h3: {
      'font-size': '17px',
      'font-weight': '600',
      color: '#1a2233',
      'margin-top': '24px',
      'margin-bottom': '10px',
      'line-height': '1.5',
      'letter-spacing': '0',
    },
    // h4：Step 小标题专属；primary 色 + 字重 600
    h4: {
      'font-size': '15px',
      'font-weight': '600',
      color: '#0066cc',
      'margin-top': '20px',
      'margin-bottom': '8px',
      'line-height': '1.5',
      'letter-spacing': '0.3px',
    },
    // 正文：400 字重；行高 1.75
    p: {
      'font-size': '15px',
      'line-height': '1.75',
      color: '#1a2233',
      'margin-top': '0',
      'margin-bottom': '18px',
      'letter-spacing': '0.3px',
    },
    // blockquote：走 column-rule variant；这里保留克制的 base 兜底
    blockquote: {
      'border-left': '3px solid #d9dee5',
      'background-color': 'transparent',
      color: '#5c6778',
      'padding-top': '4px',
      'padding-right': '0',
      'padding-bottom': '4px',
      'padding-left': '16px',
      'margin-top': '0',
      'margin-bottom': '18px',
      'border-radius': '0',
      'font-style': 'italic',
    },
    // kbd：规范 §1.2 键帽。浅底 + 四边 1px + 底边 2px（不对称 = 立体）
    kbd: {
      display: 'inline-block',
      'background-color': '#fafbfc',
      color: '#1a2233',
      border: '1px solid #d9dee5',
      'border-bottom-width': '2px',
      'border-radius': '3px',
      padding: '2px 6px',
      'font-size': '12px',
      'line-height': '1.4',
      'letter-spacing': '0.2px',
      'vertical-align': 'middle',
    },
    // a：primary 色 + 下划线 + 3px 偏移
    a: {
      color: '#0066cc',
      'text-decoration': 'underline',
      'text-underline-offset': '3px',
    },
    // hr：极简 1px，28px 上下呼吸
    hr: {
      border: 'none',
      height: '1px',
      'background-color': '#d9dee5',
      'margin-top': '28px',
      'margin-bottom': '28px',
    },
    // img：截图必备三件套——1px 淡边框 + 6px 圆角 + 上下呼吸
    img: {
      'max-width': '100%',
      display: 'block',
      'margin-top': '18px',
      'margin-right': 'auto',
      'margin-bottom': '18px',
      'margin-left': 'auto',
      border: '1px solid #d9dee5',
      'border-radius': '6px',
    },
    strong: { 'font-weight': '600', color: '#1a2233' },
    em: { 'font-style': 'italic', color: '#1a2233' },

    // 代码块（规范 §1.1 冷灰深底 + 冷浅灰字）
    pre: {
      'background-color': '#1e2533',
      color: '#e8ebf0',
      'padding-top': '14px',
      'padding-right': '16px',
      'padding-bottom': '14px',
      'padding-left': '16px',
      'border-radius': '6px',
      'overflow-x': 'auto',
      'white-space': 'pre',
      'max-width': '100%',
      'box-sizing': 'border-box',
      'box-shadow': 'inset -14px 0 10px -10px rgba(0,0,0,0.25)',
      'margin-top': '0',
      'margin-bottom': '20px',
      'font-size': '13px',
      'line-height': '1.6',
    },
    // inline code：bgMuted 底 + primary 字（Stripe Docs 标志性）
    code: {
      'background-color': '#e8ecf1',
      color: '#0066cc',
      padding: '1px 4px',
      'border-radius': '3px',
      'font-size': '14px',
      'font-weight': '500',
      'letter-spacing': '0',
    },
  },

  // ============================================================
  // 内联强调（规范 §1.3 / §3.1）
  // ============================================================
  inline: {
    // 规范 §3.1 拒绝 "CSDN 荧光黄"——这里只给克制的浅底 + 主色
    highlight: {
      'background-color': '#e6f0fb',
      color: '#0066cc',
      padding: '0 3px',
      'border-radius': '2px',
      'font-weight': '500',
    },
    // 波浪线：accent 琥珀；技术文档少用，但保留
    wavy: {
      'text-decoration': 'underline wavy',
      'text-decoration-color': '#f59e0b',
      'text-underline-offset': '3px',
    },
    // 着重：primary + 600（[.xxx.] 比 strong 更重）
    emphasis: {
      color: '#0066cc',
      'font-weight': '600',
    },
  },

  // ============================================================
  // 容器视觉（规范 §2 的 19 个 container 差异化）
  // ============================================================
  containers: {
    // §2.1 intro → TL;DR 本文要点
    intro: {
      'background-color': '#f3f5f8',
      'border-left': '3px solid #0066cc',
      'border-radius': '0 6px 6px 0',
      padding: '14px 18px',
      margin: '20px 0',
      color: '#5c6778',
    },
    // §2.2 author → 作者 + 最后更新日期；无底色无边框
    //     __reset：不承袭 baseContainers 的 border-radius 6px
    author: {
      __reset: true,
      'background-color': 'transparent',
      padding: '8px 0',
      margin: '12px 0',
      color: '#5c6778',
      'border-bottom': '1px solid #d9dee5',
    },
    // §2.3 cover → 背景 bg（不贴纸），底部 1px 分隔
    cover: {
      'background-color': '#fafbfc',
      padding: '20px 0 24px',
      margin: '16px 0',
      'border-bottom': '1px solid #d9dee5',
    },
    // tip/warning/info/danger 走 accent-bar variant；容器外壳保持空
    tip: {},
    warning: {},
    info: {},
    danger: {},
    // §2.6 quoteCard → Key Takeaway 核心要点；mint 绿 border-left + bgSoft 底
    quoteCard: {
      'background-color': '#f3f5f8',
      'border-left': '3px solid #0d9f7f',
      padding: '16px 18px',
      margin: '20px 0',
      'border-radius': '0 6px 6px 0',
    },
    // §2.14 highlight → Pro Tip 进阶技巧（琥珀 accent）
    highlight: {
      'background-color': '#fdf4e2',
      'border-left': '3px solid #f59e0b',
      padding: '14px 18px',
      margin: '18px 0',
      'border-radius': '0 6px 6px 0',
    },
    compare: { margin: '20px 0' },
    // §2.16 steps → 左侧 1px 细竖线 + padding-left 形成"线上串珠"节律
    steps: {
      margin: '20px 0',
      'border-left': '1px solid #d9dee5',
      'padding-left': '24px',
    },
    // §2.4 sectionTitle → bordered variant；兜底样式
    sectionTitle: {
      margin: '32px 0 14px',
      'padding-bottom': '8px',
      'border-bottom': '1px solid #d9dee5',
    },
    // §2.7 footerCTA → 继续阅读 / 下一篇
    footerCTA: {
      margin: '28px 0',
      padding: '16px 18px',
      'background-color': '#f3f5f8',
      'border-radius': '6px',
    },
    // §2.8 recommend → 延伸阅读 / MDN "See Also"；无底色，仅上下分隔
    //     __reset：不承袭 baseContainers 的 border-radius 6px（MDN 纪律：直角）
    recommend: {
      __reset: true,
      margin: '24px 0',
      padding: '14px 0',
      'background-color': 'transparent',
      'border-top': '1px solid #d9dee5',
      'border-bottom': '1px solid #d9dee5',
    },
    // §2.9 qrcode → GitHub 仓库卡片风（浅底 + 6px 圆角）
    qrcode: {
      margin: '24px 0',
      padding: '16px',
      'background-color': '#f3f5f8',
      'border-radius': '6px',
    },
  },

  // ============================================================
  // Templates：tech-explainer 特化的 tip / cover 片段
  // commonTemplates 由 specToTheme 隐式并入作为基线，这里只声明覆盖。
  // ============================================================
  templates: {
    // tip：英中双语胶囊标题（规范 §2.10）
    tip: `::: tip Tip · 小贴士
一句提醒读者的经验法则。
:::
`,
    // cover：规范 §2.3 要求标题 + 副标题 + 前置知识 + 阅读时长四件套
    cover: `::: cover 标题占位
副标题或一句话立意。

\`前置知识\`：\`HTML\` \`CSS\` \`JavaScript 基础\`

_15 分钟阅读 · 最后更新 2026-04-20_
:::
`,
  },

  // Phase 5 gap-closing: note（motifs.noteIcon 承载第五态）+ seeAlso（教程向参考链接块）
  signatureContainers: ['note', 'seeAlso'],

  meta: {
    createdAt: '2026-04-20',
    ownerNotes:
      'Phase 2 / PR 11 迁移：tech-explainer 从 assets.ts 工厂形态改为 PersonaSpec 驱动。note 为第五态（由 motifs.noteIcon + textMuted 承载）；codeBlock header-bar + copyIcon 为签名语汇。',
  },
}

export default spec
