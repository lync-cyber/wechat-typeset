/**
 * official-gazette · 公文公报 · PersonaSpec
 *
 * 定位（规范 §0 一句话）：**中央人民政府公报 / 上市公司公告 / 监管文件**这一档严肃文体。
 * 参照坐标：国务院公报 · 证监会公告 · 招股说明书 · 国企年度报告 · 监管声明 · 公开信。
 * 气质关键词：序号、印章、克制、密度、仪式感。
 *
 * 视觉签名三轴：
 *   1. 普鲁士蓝 #1c3a6e（HSL 219° / sat 59% / lum 27%）——比 default 更深、比 industry-observer 更饱和
 *   2. 暗金 #8a6a14——公文红头 + 烫金的视觉记忆；用在印章 / 分隔线 / accent 位
 *   3. 极度克制——无色彩装饰，靠编号 + 框线 + 印章塑造仪式感；letterSpacing 压到 0.2
 *
 * 三条不可妥协决策：
 *   1. primary #1c3a6e：色相 219°落在 215°–225° 窗口，比 default #2558b0（更亮）、
 *      industry-observer #24364f（更碳灰）更饱和、更深——"翻开一份红头文件"的那种蓝
 *   2. h2Numbering 中文章节序号（一、二、三）：公文格式规范要求，不做 roman / arabic
 *   3. 底色铜版纸微米色 #faf8f3，bg/bgSoft/bgMuted 三档差值 ≤ 5%——公文不需要分层热闹
 */

import type { PersonaSpec } from '../_shared/spec'

export const spec: PersonaSpec = {
  id: 'official-gazette',
  name: '公文公报',
  description: '中央人民政府公报 / 上市公司公告 / 监管文件，服务政务通告、企业公告、监管声明等严肃文体',
  audience: '政务通告 / 企业公告 / 监管声明 / 招股说明书 / 严肃通报 / 公开信',

  // ============================================================
  // 色板（色相严格 215°–225°；底色铜版纸；三档差值 ≤ 5%）
  // ============================================================
  palette: {
    primary: '#1c3a6e',    // 普鲁士蓝 HSL(219°, 59%, 27%)；比 default #2558b0 更深更饱和
    secondary: '#2e507a',  // primary 浅一档，h3 / byline / 表头色
    accent: '#8a6a14',     // 暗金——公文烫金记忆；稀缺：印章 / issueStamp / 分节线
    bg: '#faf8f3',         // 铜版纸微米色（3% 暖调）
    bgSoft: '#f5f3ec',     // 档案米深一级（与 bg 差 ~3%）
    bgMuted: '#efece3',    // 卷宗底（与 bgSoft 差 ~3%，三档总差 ≤ 5%）
    text: '#1a1e28',       // 公文墨——比 primary 更深，压住所有装饰
    textMuted: '#52586a',  // 批注灰蓝——稍带蓝调避免与铜版纸底打架
    textInverse: '#fefefe',// 反白字色（印章 / 反色标签）
    border: '#d4d0c4',     // 米纸边——暖灰，公文分栏线
    code: '#1c3a6e',       // inline code 字色 = primary（公文稿里 code 极少）
  },

  // ============================================================
  // 语义四色（公文"严肃灰系"——不走交通灯；不滥用红绿）
  // ============================================================
  status: {
    tip:     { accent: '#1c3a6e', soft: '#eaecf4' }, // 正文附注——primary 同系
    info:    { accent: '#2e507a', soft: '#e8edf4' }, // 背景说明——secondary 蓝灰
    warning: { accent: '#7a5510', soft: '#f0e9d8' }, // 注意事项——暗金同族深棕
    danger:  { accent: '#8a2218', soft: '#f0e8e6' }, // 严肃警示——深暗红克制
  },

  // ============================================================
  // 字号 / 间距 / 圆角（公文密度高；letterSpacing 偏小；行高不宜过松）
  // ============================================================
  typography: { baseSize: 15, lineHeight: 1.65, h1Size: 22, h2Size: 18, h3Size: 16, letterSpacing: 0.2 },
  spacing: { paragraph: 16, section: 28, listItem: 7, containerPadding: 16 },
  radius: { sm: 0, md: 1, lg: 2 },

  // ============================================================
  // Motifs（仪式感三件套：sealMark 印章 + issueStamp 期号戳 + h2Prefix 章节标）
  // ============================================================
  motifs: {
    // h2Prefix · 普鲁士蓝实心竖条（3×14），传达"公文条款分节"感
    h2Prefix: {
      viewBox: [0, 0, 10, 16],
      width: 10,
      height: 16,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 10 },
      primitives: [
        { type: 'rect', x: 0, y: 1, w: 3, h: 14, fill: 'token:primary' },
      ],
    },

    // sealMark · 朱红印章感 SVG，用普鲁士蓝版本（公文蓝印章）
    // 双线方框 + "公" 字占位文字——呼应公文印章仪式感
    sealMark: {
      viewBox: [0, 0, 48, 48],
      width: 44,
      height: 44,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle' },
      primitives: [
        // 外框
        { type: 'rect', x: 1, y: 1, w: 46, h: 46, stroke: 'token:primary', strokeWidth: 1.5 },
        // 内框（双线印章感）
        { type: 'rect', x: 4, y: 4, w: 40, h: 40, stroke: 'token:primary', strokeWidth: 1, opacity: 0.55 },
        // "公" 印章文字
        {
          type: 'text',
          x: 24,
          y: 30,
          content: '公',
          fontSize: 20,
          fontWeight: 600,
          fill: 'token:primary',
          textAnchor: 'middle',
        },
      ],
    },

    // issueStamp · 期号 / 文号印章（公文文号戳）
    // 双线矩形 + 文号 ISSUE/文号 混排；与 industry-observer 形制相同但用普鲁士蓝。
    // viewBox 320：覆盖 `〔023〕第2025-04-20号 · 周刊` 等真实值（CJK + 数字混排约 240px），
    // 留出足够余量以兼容更长 kind（"特别公告"/"上市公司年报公告"）。
    issueStamp: {
      viewBox: [0, 0, 320, 26],
      width: 320,
      height: 26,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle' },
      placeholders: ['issue', 'date', 'kind'],
      primitives: [
        { type: 'rect', x: 0.5, y: 0.5, w: 319, h: 25, stroke: 'token:primary', strokeWidth: 1 },
        { type: 'rect', x: 3, y: 3, w: 314, h: 20, stroke: 'token:primary', strokeWidth: 1, opacity: 0.4 },
        {
          // textAnchor=middle：文号居中，公文戳的对称感更稳；与 industry-observer 同步
          type: 'text',
          x: 160,
          y: 19,
          content: '〔{issue}〕第{date}号 · {kind}',
          fontSize: 14,
          fontWeight: 600,
          fill: 'token:primary',
          textAnchor: 'middle',
          letterSpacing: 1,
        },
      ],
    },

    // dividerDots · 三点分割（印章底部间隔感）
    dividerDots: {
      viewBox: [0, 0, 240, 8],
      width: 220,
      height: 8,
      primitives: [
        { type: 'circle', cx: 108, cy: 4, r: 1.2, fill: 'token:border' },
        { type: 'circle', cx: 120, cy: 4, r: 1.2, fill: 'token:accent' },
        { type: 'circle', cx: 132, cy: 4, r: 1.2, fill: 'token:border' },
      ],
    },

    // dividerWave · 公文不用 wave，退化为细 rule（单直线）
    dividerWave: {
      viewBox: [0, 0, 240, 4],
      width: 220,
      height: 4,
      primitives: [
        { type: 'line', x1: 20, y1: 2, x2: 220, y2: 2, stroke: 'token:border', strokeWidth: 1 },
      ],
    },

    // stepBadge(N) · 方角编号徽章（公文步骤序号）
    // 普鲁士蓝小方块 + 白数字，与圆形徽章区分（公文走方正）
    stepBadge: {
      viewBox: [0, 0, 22, 22],
      width: 22,
      height: 22,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 8 },
      placeholders: ['N'],
      primitives: [
        { type: 'rect', x: 1, y: 1, w: 20, h: 20, fill: 'token:primary' },
        {
          type: 'text',
          x: 11,
          y: 17,
          content: '{N}',
          fontSize: 14,
          fontWeight: 700,
          fill: 'token:textInverse',
          textAnchor: 'middle',
        },
      ],
    },

    // tipIcon（正文附注）：竖排三横线 + 短线组合——"条款"语义
    tipIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        { type: 'rect', x: 2, y: 3, w: 10, h: 1.5, fill: 'token:primary' },
        { type: 'rect', x: 2, y: 6.5, w: 10, h: 1.5, fill: 'token:primary' },
        { type: 'rect', x: 2, y: 10, w: 6, h: 1.5, fill: 'token:primary' },
      ],
    },

    // infoIcon（背景说明）：空心方框——"参见"说明框
    infoIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        { type: 'rect', x: 2, y: 2, w: 10, h: 10, stroke: 'token:status.info.accent', strokeWidth: 1.2 },
        { type: 'line', x1: 7, y1: 5, x2: 7, y2: 10, stroke: 'token:status.info.accent', strokeWidth: 1.2, strokeLinecap: 'round' },
        { type: 'rect', x: 6.2, y: 3.5, w: 1.6, h: 1.6, fill: 'token:status.info.accent' },
      ],
    },

    // warningIcon（注意事项）：暗金三角框——"注意"符号
    warningIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        {
          type: 'path',
          d: 'M7,2 L13,12 L1,12 Z',
          stroke: 'token:status.warning.accent',
          strokeWidth: 1.2,
        },
        { type: 'line', x1: 7, y1: 6, x2: 7, y2: 9.5, stroke: 'token:status.warning.accent', strokeWidth: 1.2, strokeLinecap: 'round' },
        { type: 'rect', x: 6.2, y: 10.5, w: 1.6, h: 1.6, fill: 'token:status.warning.accent' },
      ],
    },

    // dangerIcon（严肃警示）：双线矩形带叉——"禁止 / 警告"
    dangerIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        { type: 'rect', x: 1.5, y: 1.5, w: 11, h: 11, stroke: 'token:status.danger.accent', strokeWidth: 1.2 },
        { type: 'line', x1: 4, y1: 4, x2: 10, y2: 10, stroke: 'token:status.danger.accent', strokeWidth: 1.2, strokeLinecap: 'round' },
        { type: 'line', x1: 10, y1: 4, x2: 4, y2: 10, stroke: 'token:status.danger.accent', strokeWidth: 1.2, strokeLinecap: 'round' },
      ],
    },

    // sectionCorner · 暗金小方块（章节角标，区分 h2Prefix 蓝竖条）
    sectionCorner: {
      viewBox: [0, 0, 8, 8],
      width: 6,
      height: 6,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 8 },
      primitives: [
        { type: 'rect', x: 0, y: 0, w: 6, h: 6, fill: 'token:accent' },
      ],
    },
  },

  // ============================================================
  // 骨架变体（★ 标 orphan variant 升级；公文优先选方正框线骨架）
  // ============================================================
  variants: {
    admonition: 'top-bottom-rule',  // ★ orphan：上下 1px 实线，公文框线感
    quote: 'frame-brackets',        // 四角括号框——公文引用 / 定义框
    compare: 'ledger',              // 账本双色列——政策前 / 政策后对比
    steps: 'number-circle',
    divider: 'rule',
    sectionTitle: 'bordered',
    codeBlock: 'bare',
    note: 'editorial-stripe',       // ★ orphan：左 3px 主色条 + bgSoft，公文编注
    footnotes: 'dense-academic',    // 密集脚注——条款注释 / 参考文件
    recommend: 'academic-refs',     // 学术引用风——参考文件列表
    qrcode: 'bare',
    footerCTA: 'button-led',
    pullQuote: 'centered-rule',     // ★ orphan：上下线居中夹，公文拉引正式感
    announcement: 'stamped-banner', // ★ orphan：印章式公告，公告主题完美匹配
    tableCard: 'rule-grid',
    gallery: 'duo',
    dialogue: 'qa-rows',
  },

  // ============================================================
  // 装饰（h2 中文章节序号编号 + 不做 intro dropcap）
  // ============================================================
  decorations: {
    headingPrefix: [
      {
        level: 2,
        autoNumber: 'arabic',
        style: {
          color: 'primary',
          fontWeight: 600,
          fontSize: 16,
          letterSpacing: 0,
          suffix: '{cn}、',
          marginRight: 6,
        },
      },
    ],
  },

  signatureContainers: ['announcement', 'footnotes', 'sectionTitle', 'colophon', 'byline'],

  // ============================================================
  // 元素级样式（公文 voice：克制、密度、方正）
  // ============================================================
  elements: {
    h1: {
      'font-size': '22px',
      'font-weight': '700',
      color: '#1a1e28',
      'margin-top': '24px',
      'margin-bottom': '12px',
      'line-height': '1.4',
      'letter-spacing': '0.2px',
      'text-align': 'center',   // 公文标题居中
    },
    h2: {
      'font-size': '18px',
      'font-weight': '700',
      color: '#1a1e28',
      'margin-top': '28px',
      'margin-bottom': '10px',
      'line-height': '1.4',
      'letter-spacing': '0.2px',
      'border-bottom': 'none',
      'padding-bottom': '0',
    },
    h3: {
      'font-size': '16px',
      'font-weight': '600',
      color: '#1a1e28',
      'margin-top': '20px',
      'margin-bottom': '8px',
      'line-height': '1.45',
      'letter-spacing': '0.1px',
    },
    h4: {
      'font-size': '15px',
      'font-weight': '600',
      color: '#1a1e28',
      'margin-top': '16px',
      'margin-bottom': '6px',
      'line-height': '1.5',
      'letter-spacing': '0.1px',
    },
    h5: {
      'font-size': '15px',
      'font-weight': '600',
      color: '#1a1e28',
      'margin-top': '14px',
      'margin-bottom': '5px',
      'line-height': '1.5',
      'letter-spacing': '0.2px',
    },
    h6: {
      'font-size': '14px',
      'font-weight': '500',
      color: '#52586a',
      'margin-top': '10px',
      'margin-bottom': '4px',
      'line-height': '1.5',
      'letter-spacing': '0.5px',
    },
    p: {
      'font-size': '15px',
      'line-height': '1.65',
      color: '#1a1e28',
      'margin-top': '0',
      'margin-bottom': '16px',
      'letter-spacing': '0.2px',
      'text-indent': '2em',  // 公文正文首行缩进两字
    },
    blockquote: {
      'border-left': '3px solid #d4d0c4',
      'background-color': 'transparent',
      color: '#52586a',
      'padding-top': '4px',
      'padding-right': '0',
      'padding-bottom': '4px',
      'padding-left': '14px',
      'margin-top': '0',
      'margin-bottom': '16px',
      'border-radius': '0',
      'font-size': '14px',
      'line-height': '1.65',
    },
    ul: { 'padding-left': '22px', 'margin-top': '0', 'margin-bottom': '16px' },
    ol: { 'padding-left': '22px', 'margin-top': '0', 'margin-bottom': '16px' },
    li: {
      'margin-bottom': '7px',
      'line-height': '1.65',
      color: '#1a1e28',
      'letter-spacing': '0.2px',
    },
    strong: {
      'font-weight': '700',
      color: '#1a1e28',
    },
    em: {
      'font-style': 'italic',
      'font-weight': '500',
      color: '#1a1e28',
    },
    a: {
      color: '#1c3a6e',
      'text-decoration': 'underline',
      'text-underline-offset': '3px',
    },
    hr: {
      border: 'none',
      height: '1px',
      'background-color': '#d4d0c4',
      'margin-top': '20px',
      'margin-bottom': '20px',
    },
    img: {
      'max-width': '100%',
      display: 'block',
      'margin-top': '10px',
      'margin-right': 'auto',
      'margin-bottom': '8px',
      'margin-left': 'auto',
      'border-radius': '1px',
    },
    // 公文表：booktabs 风三线 + 全边框，规范感强
    table: {
      'border-collapse': 'collapse',
      width: '100%',
      'margin-top': '0',
      'margin-bottom': '18px',
      'font-size': '14px',
      'border-top': '2px solid #1c3a6e',
      'border-bottom': '2px solid #1c3a6e',
    },
    th: {
      'background-color': '#eaecf4',
      color: '#1c3a6e',
      border: '1px solid #d4d0c4',
      'border-bottom': '1.5px solid #1c3a6e',
      padding: '5px 10px',
      'font-weight': '700',
      'text-align': 'center',
      'font-size': '13px',
      'letter-spacing': '0.2px',
    },
    td: {
      border: '1px solid #d4d0c4',
      padding: '5px 10px',
      color: '#1a1e28',
      'text-align': 'left',
      'font-size': '14px',
    },
    // 公文键帽：直角 + 普鲁士蓝边
    kbd: {
      display: 'inline-block',
      'background-color': '#f5f3ec',
      color: '#1a1e28',
      border: '1px solid #1c3a6e',
      'border-radius': '1px',
      padding: '1px 5px',
      'font-size': '12px',
      'line-height': '1.4',
      'vertical-align': 'middle',
    },
    pre: {
      'background-color': '#efece3',
      color: '#1a1e28',
      'padding-top': '12px',
      'padding-right': '14px',
      'padding-bottom': '12px',
      'padding-left': '14px',
      'border-radius': '1px',
      border: '1px solid #d4d0c4',
      'overflow-x': 'auto',
      'white-space': 'pre',
      'max-width': '100%',
      'box-sizing': 'border-box',
      'margin-top': '0',
      'margin-bottom': '18px',
      'font-size': '13px',
      'line-height': '1.6',
    },
    code: {
      'background-color': '#efece3',
      color: '#1c3a6e',
      padding: '1px 4px',
      'border-radius': '1px',
      'font-size': '13px',
      'font-weight': '500',
    },
  },

  // ============================================================
  // 内联强调（公文克制：无彩色高亮，走 bgMuted 浅底）
  // ============================================================
  inline: {
    // 公文不用荧光高亮——走 bgMuted 铜版纸底
    highlight: {
      'background-color': '#efece3',
      color: '#1a1e28',
      padding: '0 3px',
      'border-radius': '1px',
    },
    // 波浪线走 accent 暗金（稀缺用法，每篇 ≤ 3 次）
    wavy: {
      'text-decoration': 'underline wavy',
      'text-decoration-color': '#8a6a14',
      'text-underline-offset': '3px',
    },
    // 着重号走 primary 蓝 + 加粗
    emphasis: {
      color: '#1c3a6e',
      'font-weight': '700',
    },
    del: {
      color: '#52586a',
      'text-decoration': 'line-through',
    },
    ins: {
      color: '#1c3a6e',
      'text-decoration': 'underline',
    },
  },

  // ============================================================
  // 容器视觉（全 radius ≈ 0；border 框线主导；无鲜艳底色）
  // ============================================================
  containers: {
    intro: {
      'background-color': 'transparent',
      'border-top': '1px solid #1c3a6e',
      'border-bottom': '1px solid #1c3a6e',
      'border-radius': '0',
      padding: '14px 0',
      margin: '0 0 24px 0',
      color: '#52586a',
      'line-height': '1.65',
    },
    author: {
      'background-color': 'transparent',
      'border-bottom': '1px solid #d4d0c4',
      'border-radius': '0',
      padding: '8px 0',
      margin: '0 0 20px 0',
      'font-size': '13px',
      color: '#52586a',
    },
    cover: {
      margin: '0 0 28px 0',
      'text-align': 'center',
    },
    // top-bottom-rule variant 接管 wrapperCSS；空 slot 是与 variants 的契约同步
    tip: {}, warning: {}, info: {}, danger: {}, note: {},
    quoteCard: {
      'background-color': '#f5f3ec',
      padding: '16px 20px',
      margin: '20px 0',
      'border-radius': '1px',
      border: '1px solid #d4d0c4',
    },
    highlight: {
      'background-color': '#f5f3ec',
      'border-left': '2px solid #1c3a6e',
      padding: '10px 14px 10px 16px',
      margin: '18px 0',
      'border-radius': '0',
    },
    compare: { margin: '20px 0' },
    steps: { margin: '20px 0' },
    sectionTitle: {
      margin: '32px 0 14px',
      'padding-bottom': '6px',
      'border-bottom': '2px solid #1c3a6e',
    },
    footerCTA: {
      margin: '36px 0 20px 0',
      padding: '16px 0',
      'background-color': 'transparent',
      'border-top': '1.5px solid #1c3a6e',
      'border-bottom': '1.5px solid #1c3a6e',
      'border-radius': '0',
    },
    recommend: {
      margin: '22px 0',
      padding: '12px 0',
      'background-color': 'transparent',
      'border-radius': '0',
      'border-top': '1px solid #d4d0c4',
    },
    abstract: {
      'background-color': '#f5f3ec',
      border: '1px solid #d4d0c4',
      'border-left': '3px solid #1c3a6e',
      padding: '12px 16px',
      margin: '16px 0 22px',
      'border-radius': '0',
    },
    qrcode: {
      margin: '28px auto',
      padding: '0',
      'background-color': 'transparent',
      'border-radius': '0',
    },
    imageCaption: {
      margin: '4px 0 18px 0',
      'text-align': 'center',
      'font-size': '12px',
      'font-style': 'italic',
      color: '#52586a',
      'letter-spacing': '0.1px',
    },
    timeline: {
      margin: '22px 0',
      'border-left': '1px solid #1c3a6e',
      'padding-left': '16px',
      'background-color': 'transparent',
    },
    voiceCard: { 'background-color': '#f5f3ec', border: '1px solid #d4d0c4', 'border-radius': '1px', padding: '10px 14px', margin: '12px 0' },
    videoCard: { 'background-color': '#f5f3ec', border: '1px solid #d4d0c4', 'border-radius': '1px', padding: '10px 14px', margin: '12px 0' },
    // stamped-banner variant 接管细节
    announcement: {
      margin: '0 0 24px 0',
      'background-color': '#eaecf4',
      border: '1px solid #1c3a6e',
      'border-radius': '0',
    },
    authorBio: {
      __reset: true,
      'background-color': '#f5f3ec',
      'border-top': '2px solid #1c3a6e',
      'border-radius': '0',
      padding: '14px 16px',
      margin: '24px 0',
    },
    footnotes: {
      margin: '20px 0 0 0',
      padding: '12px 0 0 0',
      'border-top': '1px solid #d4d0c4',
      'background-color': 'transparent',
    },
    colophon: {
      'border-top': '1px solid #1c3a6e',
      padding: '12px 0',
      margin: '32px 0 0 0',
      'background-color': 'transparent',
    },
    byline: {
      'border-bottom': '1px solid #d4d0c4',
      padding: '8px 0',
      margin: '0 0 20px 0',
      'background-color': 'transparent',
    },
    pullQuote: { margin: '24px 0' },
    tableCard: { margin: '20px 0' },
    gallery: { margin: '20px 0' },
    dialogue: { margin: '20px 0' },
    masthead: { 'background-color': '#f5f3ec', 'border-bottom': '2px solid #1c3a6e', padding: '12px 0', margin: '0 0 24px 0' },
    sectionTag: { display: 'inline-block', 'background-color': '#1c3a6e', color: '#fefefe', padding: '2px 8px', 'border-radius': '0', 'font-size': '12px' },
    editorialHeader: { margin: '0 0 24px 0' },
    toc: { margin: '20px 0', 'background-color': '#f5f3ec', border: '1px solid #d4d0c4', padding: '14px 16px', 'border-radius': '0' },
    kpiDashboard: { margin: '20px 0' },
    barChart: { margin: '20px 0' },
    qaBlock: { margin: '20px 0', 'background-color': 'transparent' },
    keyNumber: { 'background-color': '#f5f3ec', 'border-top': '2px solid #1c3a6e', padding: '12px 14px', margin: '16px 0', 'border-radius': '0' },
  },

  kickers: { recommend: '参考文件', footerCTATitle: '联系我们', toc: '目　录' },

  // ============================================================
  // 模板片段（公文格式标准示例）
  // ============================================================
  templates: {
    // 公文封面：标题 + 文号 + 发文机关（issueStamp 驱动）
    cover: `::: cover 通知标题 issue=2026 date=01 kind=通知
关于印发《某某办法》的通知

某某〔2026〕1号

各省、自治区、直辖市及新疆生产建设兵团相关部门：

:::
`,
    // 作者栏：发文机关 + 日期
    authorBar: `::: author 某某部门
发文日期：二〇二六年一月一日
:::
`,
    // 附注（tip = 正文附注）
    tip: `::: tip 附注
本通知自发布之日起施行，原相关规定同时废止。
:::
`,
    // 落款 CTA
    footerCTA: `::: footer-cta 联系我们 cta=下载全文 ▸
如有疑问，请联系相关部门办公室。联系电话：010-XXXXXXXX。
:::
`,
    // 参考文件
    recommend: `::: recommend 参考文件
- [1] 《某某法》（2024年修订版）
- [2] 《某某实施细则》（国务院令第XXX号）
- [3] 《某某管理办法》（部令第XX号）
:::
`,
  },

  meta: {
    createdAt: '2026-05-17',
    ownerNotes:
      '公文公报主题：普鲁士蓝 #1c3a6e（HSL 219° / 59% / 27%）+ 暗金 #8a6a14；四个 orphan variant 升级（top-bottom-rule / editorial-stripe / centered-rule / stamped-banner）；h2 中文章节序号；公文首行缩进 2em；三档底色差值 ≤ 5%。',
  },
}

export default spec
