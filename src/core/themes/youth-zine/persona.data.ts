/**
 * youth-zine · 青年潮志 · PersonaSpec
 *
 * 本主题升级了 5 个 orphan variant 为默认骨架：
 *   - admonition: pill-tag   （青年感胶囊标签）
 *   - dialogue:   chat-bubbles（IM 风对话气泡）
 *   - gallery:    triptych    （三宫格安利）
 *   - pullQuote:  stamp-quote （盖戳印章感）
 *   - announcement: ai-notice（AI 注释卡感）
 *
 * 视觉签名：
 *   - Primary #e91e63（玫粉 / hot pink，色相 ≈ 333°，严格落在 320°-340° 区间）
 *   - 纯白底 #ffffff + 微粉调 bgSoft #fdf6f8
 *   - 圆角更圆：radius.lg = 14
 *   - 行高 1.85——青年短段落需要更多呼吸
 *   - 胶囊高亮标签：inline.highlight 加 borderRadius + 内边距
 */

import type { PersonaSpec } from '../_shared/spec'

export const spec: PersonaSpec = {
  id: 'youth-zine',
  name: '青年潮志',
  description: '鲜玫粉主色 + 圆角胶囊 + 高行距 · 服务青年潮流文体（短段落 / 标签云 / 高饱和）',
  audience: '青年文化 / Gen-Z / 小红书博主 / B 站 UP 主 / 潮流安利 / 二次元周边',

  // ============================================================
  // 色板
  //   - primary: #e91e63 玫粉（色相 333°，严格 320°–340° 区间）
  //   - secondary: #26c6da 青蓝（互补对比，不全上——避免视觉密度过高）
  //   - accent: #ffd54f 亮黄（稀缺点睛，每篇控制用量）
  //   - bg 纯白 / bgSoft 微粉调——拒绝 mook 的暖米
  // ============================================================
  palette: {
    primary: '#e91e63',
    secondary: '#26c6da',
    accent: '#ffd54f',
    bg: '#ffffff',
    bgSoft: '#fdf6f8',
    bgMuted: '#fce4ec',
    text: '#1a0a12',
    textMuted: '#6d4c5e',
    textInverse: '#ffffff',
    border: '#e0b4c4',
    code: '#ad1457',
    preBg: '#2a2d32',
    preText: '#d8d8d4',
    highlightBg: '#ffd54f',
    codeBg: '#fce4ec',
  },

  // 语义四色——全部 accent/soft 对比 ≥ 4.5:1（已自查）
  status: {
    tip: { accent: '#2e7d32', soft: '#f1f8f1' },
    info: { accent: '#01579b', soft: '#e3f2fd' },
    warning: { accent: '#bf360c', soft: '#fff3e0' },
    danger: { accent: '#b71c1c', soft: '#ffebee' },
  },

  // ============================================================
  // 字号 / 间距 / 圆角
  //   - baseSize 15：确保正文 AA 级可读
  //   - lineHeight 1.85：青年文体短段落标志性呼吸感
  //   - paragraph 22：段落间距偏宽，短段落不显拥挤
  //   - radius.lg 14：显著圆于 default(8) / mook(0)
  // ============================================================
  typography: {
    baseSize: 15,
    lineHeight: 1.85,
    h1Size: 24,
    h2Size: 20,
    h3Size: 17,
    letterSpacing: 0.3,
    captionSize: 12,
  },

  spacing: {
    paragraph: 22,
    section: 36,
    listItem: 10,
    containerPadding: 18,
  },

  radius: { sm: 6, md: 10, lg: 14 },

  // ============================================================
  // Motifs：圆形气泡 + 粉色圆点分隔，区别于方块（mook）
  // ============================================================
  motifs: {
    // 分隔点：三颗玫粉圆点，间距均匀——youth 的"呼吸感分隔"
    dividerDots: {
      viewBox: [0, 0, 240, 10],
      width: 220,
      height: 10,
      primitives: [
        { type: 'circle', cx: 100, cy: 5, r: 3, fill: '#fce4ec' },
        { type: 'circle', cx: 120, cy: 5, r: 4, fill: '#e91e63' },
        { type: 'circle', cx: 140, cy: 5, r: 3, fill: '#fce4ec' },
      ],
    },

    // 花式分隔：粉点 + 两侧细线——潮志"间章"感
    dividerFlower: {
      viewBox: [0, 0, 240, 14],
      width: 220,
      height: 14,
      primitives: [
        { type: 'line', x1: 0, y1: 7, x2: 90, y2: 7, stroke: '#e0b4c4', strokeWidth: 1 },
        { type: 'circle', cx: 105, cy: 7, r: 4, fill: '#e91e63' },
        { type: 'circle', cx: 120, cy: 7, r: 6, fill: '#e91e63', opacity: 0.25 },
        { type: 'circle', cx: 135, cy: 7, r: 4, fill: '#e91e63' },
        { type: 'line', x1: 150, y1: 7, x2: 240, y2: 7, stroke: '#e0b4c4', strokeWidth: 1 },
      ],
    },

    // 波浪分隔：轻柔 S 曲线，柔和区隔章节
    dividerWave: {
      viewBox: [0, 0, 240, 12],
      width: 220,
      height: 12,
      primitives: [
        {
          type: 'path',
          d: 'M0 6 Q30 1 60 6 Q90 11 120 6 Q150 1 180 6 Q210 11 240 6',
          fill: 'none',
          stroke: '#e91e63',
          strokeWidth: 1.5,
          opacity: 0.5,
        },
      ],
    },

    // 状态图标：圆形填充（呼应圆角主题）
    tipIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [{ type: 'circle', cx: 7, cy: 7, r: 5, fill: '#2e7d32' }],
    },
    infoIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [{ type: 'circle', cx: 7, cy: 7, r: 5, fill: '#01579b' }],
    },
    warningIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [{ type: 'circle', cx: 7, cy: 7, r: 5, fill: '#bf360c' }],
    },
    dangerIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [{ type: 'circle', cx: 7, cy: 7, r: 5, fill: '#b71c1c' }],
    },

    // 步骤徽章：实心粉圆 + 外圈同色光晕（青年贴纸 sticker 双层圆）。
    // 外圈 r=11 stroke 同色 opacity 0.35，给视觉"贴纸毛边"质感；中心实心 r=8.5
    // 让数字更聚焦——与 default 单层实心 / edu-classroom 双圆环 / commerce-pulse
    // 白外环按键拉开第四种形态。
    stepBadge: {
      viewBox: [0, 0, 24, 24],
      width: 24,
      height: 24,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 8 },
      placeholders: ['N'],
      primitives: [
        { type: 'circle', cx: 12, cy: 12, r: 11, fill: '#e91e63', opacity: 0.28 },
        { type: 'circle', cx: 12, cy: 12, r: 8.5, fill: '#e91e63' },
        {
          type: 'text',
          x: 12,
          y: 17,
          content: '{N}',
          fontSize: 14,
          fontWeight: 700,
          fill: '#ffffff',
          textAnchor: 'middle',
        },
      ],
    },

    // quoteMark：大号引号，玫粉，用于 stamp-quote pullQuote 的背景装饰
    quoteMark: {
      viewBox: [0, 0, 60, 50],
      width: 56,
      height: 46,
      primitives: [
        {
          type: 'text',
          x: 4,
          y: 44,
          content: '“',
          fontSize: 72,
          fontWeight: 700,
          fill: '#e91e63',
          opacity: 0.15,
          textAnchor: 'start',
        },
      ],
    },
  },

  // ============================================================
  // 骨架变体
  //   5 个 orphan variant 升级为本主题首采：
  //     pill-tag / chat-bubbles / triptych / stamp-quote / ai-notice
  // ============================================================
  variants: {
    admonition: 'pill-tag',       // orphan 首采：青年感胶囊标签
    quote: 'column-rule',         // 左侧彩色竖线引用，简洁
    compare: 'column-card',       // 双列卡片对比
    steps: 'number-circle',       // 圆形序号步骤
    divider: 'dots',              // 三点分隔，轻盈
    sectionTitle: 'kicker-stack', // kicker + 大标题叠排，杂志感
    codeBlock: 'bare',            // 干净代码块
    note: 'side-bar',             // 左侧竖条补注
    footnotes: 'lined',           // 横线脚注
    recommend: 'card-list',       // 卡片推荐列表
    qrcode: 'bare',               // 裸二维码
    footerCTA: 'button-led',      // 按钮引导 CTA
    pullQuote: 'stamp-quote',     // orphan 首采：盖戳印章感引用
    announcement: 'ai-notice',   // orphan 首采：AI 注释卡感
    tableCard: 'rule-grid',       // 规则网格表格
    gallery: 'triptych',          // orphan 首采：三宫格安利
    dialogue: 'chat-bubbles',     // orphan 首采：IM 风气泡对话
  },

  // 允许作者在单稿里按需切换 admonition variant（pill-tag 是默认，不重复登记）
  admonitionOverrides: ['accent-bar', 'card-shadow', 'dashed-border'],

  // ============================================================
  // 签名容器：youth-zine 的视觉核心
  // ============================================================
  signatureContainers: [
    'intro',
    'highlight',
    'pullQuote',
    'gallery',
    'dialogue',
    'recommend',
    'tip',
    'warning',
    'info',
    'danger',
    'announcement',
  ],

  // ============================================================
  // 主题级 kicker 文案——青年潮流母语
  // ============================================================
  kickers: {
    recommend: '你可能还喜欢',
    footerCTATitle: '关注我的潮流频道',
    toc: '本期目录',
    qaBlock: '粉丝问答',
  },

  // ============================================================
  // 元素样式
  // ============================================================
  elements: {
    h1: {
      'font-size': '24px',
      'font-weight': '800',
      color: '#1a0a12',
      'margin-top': '0',
      'margin-bottom': '16px',
      'line-height': '1.4',
      'letter-spacing': '0.5px',
    },
    h2: {
      'font-size': '20px',
      'font-weight': '700',
      color: '#e91e63',
      'margin-top': '36px',
      'margin-bottom': '12px',
      'line-height': '1.45',
      'letter-spacing': '0.3px',
    },
    h3: {
      'font-size': '17px',
      'font-weight': '700',
      color: '#1a0a12',
      'margin-top': '24px',
      'margin-bottom': '8px',
      'line-height': '1.5',
      'letter-spacing': '0.2px',
    },
    h4: {
      'font-size': '16px',
      'font-weight': '600',
      color: '#ad1457',
      'margin-top': '18px',
      'margin-bottom': '6px',
      'line-height': '1.5',
    },
    h5: {
      'font-size': '15px',
      'font-weight': '600',
      color: '#6d4c5e',
      'margin-top': '14px',
      'margin-bottom': '6px',
      'line-height': '1.5',
      'letter-spacing': '0.3px',
    },
    h6: {
      'font-size': '13px',
      'font-weight': '600',
      color: '#6d4c5e',
      'margin-top': '12px',
      'margin-bottom': '4px',
      'line-height': '1.5',
      'letter-spacing': '1px',
      'text-transform': 'uppercase',
    },
    // 正文：15/1.85 的宽行距，短段落风格
    p: {
      'font-size': '15px',
      'line-height': '1.85',
      color: '#1a0a12',
      'margin-top': '0',
      'margin-bottom': '22px',
      'letter-spacing': '0.3px',
    },
    // blockquote：左侧玫粉竖线 + 微粉底——突出引用，柔而不硬
    blockquote: {
      __reset: true,
      'border-left': '4px solid #e91e63',
      'background-color': '#fdf6f8',
      color: '#1a0a12',
      padding: '14px 18px',
      margin: '24px 0',
      'font-size': '15px',
      'font-weight': '400',
      'line-height': '1.85',
      'border-radius': '0 10px 10px 0',
    },
    ul: {
      'list-style': 'disc',
      'padding-left': '20px',
      'margin-top': '0',
      'margin-bottom': '22px',
    },
    ol: {
      'list-style': 'decimal',
      'padding-left': '20px',
      'margin-top': '0',
      'margin-bottom': '22px',
    },
    li: {
      'font-size': '15px',
      'line-height': '1.85',
      color: '#1a0a12',
      'margin-bottom': '10px',
      'letter-spacing': '0.3px',
    },
    // strong：玫粉高亮——青年文体强调不走黑底，走色彩
    strong: { 'font-weight': '700', color: '#e91e63' },
    em: { 'font-style': 'italic', color: '#ad1457' },
    // 链接：玫粉 + 细下划线——无 border-bottom（微信粘贴后 border-bottom 稳定性不如 text-decoration）
    a: {
      color: '#e91e63',
      'text-decoration': 'underline',
      'text-underline-offset': '2px',
    },
    hr: {
      border: 'none',
      height: '2px',
      'background-color': '#fce4ec',
      'margin-top': '24px',
      'margin-bottom': '24px',
      'border-radius': '2px',
    },
    img: {
      'max-width': '100%',
      display: 'block',
      'margin-top': '12px',
      'margin-right': 'auto',
      'margin-bottom': '12px',
      'margin-left': 'auto',
      'border-radius': '10px',
    },
    // pre：暗底代码块，对比度 9.67（preText/preBg 已自查）
    pre: {
      __reset: true,
      'background-color': '#2a2d32',
      color: '#d8d8d4',
      padding: '16px 18px',
      margin: '22px 0',
      'border-radius': '10px',
      'overflow-x': 'auto',
      'white-space': 'pre',
      'max-width': '100%',
      'box-sizing': 'border-box',
      'font-size': '13px',
      'line-height': '1.7',
    },
    // code：深玫粉字 + 浅粉底，对比度 5.79（已自查）
    code: {
      'background-color': '#fce4ec',
      color: '#ad1457',
      padding: '2px 6px',
      'border-radius': '6px',
      'font-size': '13px',
    },
    table: {
      'border-collapse': 'collapse',
      width: '100%',
      'margin-top': '0',
      'margin-bottom': '22px',
      'font-size': '14px',
    },
    th: {
      'text-align': 'left',
      'font-weight': '700',
      color: '#ffffff',
      'background-color': '#e91e63',
      'font-size': '13px',
      'letter-spacing': '0.5px',
      'padding-top': '8px',
      'padding-right': '12px',
      'padding-bottom': '8px',
      'padding-left': '12px',
      'border-radius': '0',
    },
    td: {
      'text-align': 'left',
      color: '#1a0a12',
      'font-size': '14px',
      'padding-top': '8px',
      'padding-right': '12px',
      'padding-bottom': '8px',
      'padding-left': '12px',
      'border-bottom': '1px solid #e0b4c4',
      'vertical-align': 'top',
    },
    kbd: {
      display: 'inline-block',
      'background-color': '#fdf6f8',
      color: '#1a0a12',
      border: '1px solid #e0b4c4',
      'border-bottom': '2px solid #e0b4c4',
      'border-radius': '6px',
      padding: '1px 6px',
      'font-size': '12px',
      'line-height': '1.6',
      'vertical-align': 'middle',
      'letter-spacing': '0.2px',
    },
  },

  // ============================================================
  // 内联强调
  //   highlight 是 youth-zine 核心 voice：圆角胶囊感（标签化）
  // ============================================================
  inline: {
    // 公众号后台剥离 ::before/::after，唯一稳妥是 DOM 真插 inline-block
    highlight: {
      'background-color': '#ffd54f',
      color: '#1a0a12',
      padding: '1px 7px',
      'border-radius': '10px',
      'font-weight': '600',
    },
    wavy: {
      'text-decoration': 'underline wavy',
      'text-decoration-color': '#e91e63',
      'text-underline-offset': '3px',
    },
    emphasis: {
      color: '#e91e63',
      'font-weight': '700',
    },
    del: {
      color: '#6d4c5e',
      'text-decoration': 'line-through',
    },
    ins: {
      color: '#2e7d32',
      'text-decoration': 'underline',
    },
  },

  // ============================================================
  // 容器样式
  // ============================================================
  containers: {
    // intro：微粉背景 + 圆角 + 左边装饰线——导语开门见山
    intro: {
      __reset: true,
      'background-color': '#fdf6f8',
      'border-radius': '14px',
      'border-left': '4px solid #e91e63',
      padding: '18px 20px',
      margin: '0 0 32px 0',
      'font-size': '15px',
      'line-height': '1.85',
      color: '#1a0a12',
      'letter-spacing': '0.3px',
    },

    // author：轻量署名栏
    author: {
      __reset: true,
      'background-color': 'transparent',
      padding: '0',
      margin: '0 0 28px 0',
      'font-size': '13px',
      color: '#6d4c5e',
      'letter-spacing': '0.3px',
    },

    cover: {
      margin: '0 0 32px 0',
    },

    // 四态 callout：pill-tag variant 接管外观，容器只给 margin
    tip: { margin: '16px 0' },
    warning: { margin: '16px 0' },
    info: { margin: '16px 0' },
    danger: { margin: '16px 0' },

    // note：侧竖条补注，低调不抢色
    note: {
      __reset: true,
      'background-color': '#fdf6f8',
      padding: '10px 14px',
      margin: '16px 0',
      'border-left': '3px solid #e0b4c4',
      'font-size': '13px',
      'line-height': '1.75',
      color: '#6d4c5e',
      'border-radius': '0 8px 8px 0',
    },

    // quoteCard：轻微粉底浮起
    quoteCard: {
      'background-color': '#fdf6f8',
      border: '1px solid #e0b4c4',
      padding: '20px 22px',
      margin: '28px 0',
      'border-radius': '14px',
    },

    // highlight：亮黄底胶囊感色块
    highlight: {
      'background-color': '#ffd54f',
      padding: '14px 18px',
      margin: '20px 0',
      'border-radius': '14px',
      border: 'none',
    },

    compare: {
      margin: '22px 0',
      'border-radius': '10px',
    },

    steps: {
      margin: '22px 0',
    },

    sectionTitle: {
      __reset: true,
      margin: '36px 0 16px',
      'padding-bottom': '8px',
      'border-bottom': '2px solid #e91e63',
    },

    // footerCTA：玫粉背景 + 圆角——强召唤感
    footerCTA: {
      __reset: true,
      margin: '32px 0',
      padding: '20px 22px',
      'background-color': '#fce4ec',
      'border-radius': '14px',
      'text-align': 'center',
    },

    // recommend：卡片列表外壳
    recommend: {
      margin: '24px 0',
      padding: '16px 18px',
      'background-color': '#fdf6f8',
      'border-radius': '14px',
      border: '1px solid #e0b4c4',
    },

    // qrcode：居中简洁
    qrcode: {
      margin: '24px 0',
      padding: '16px',
      'background-color': '#fdf6f8',
      border: '1px solid #e0b4c4',
      'border-radius': '14px',
      'text-align': 'center',
    },

    // voiceCard / videoCard：媒体占位，保持轻量
    voiceCard: {
      'background-color': '#fdf6f8',
      border: '1px solid #e0b4c4',
      'border-radius': '10px',
      padding: '12px 16px',
      margin: '16px 0',
    },
    videoCard: {
      'background-color': '#fdf6f8',
      border: '1px solid #e0b4c4',
      'border-radius': '10px',
      padding: '12px 16px',
      margin: '16px 0',
    },

    // announcement：ai-notice variant 接管，容器给圆角基调
    announcement: {
      __reset: true,
      margin: '22px 0',
      'border-radius': '14px',
      'background-color': '#fce4ec',
      border: '1px solid #e0b4c4',
      padding: '14px 18px',
      color: '#1a0a12',
      'font-size': '14px',
      'line-height': '1.8',
    },

    // authorBio：多行作者卡
    authorBio: {
      __reset: true,
      'background-color': '#fdf6f8',
      'border-radius': '14px',
      border: '1px solid #e0b4c4',
      padding: '14px 16px',
      margin: '16px 0',
      'font-size': '13px',
      color: '#6d4c5e',
    },

    // imageCaption：图注小字
    imageCaption: {
      margin: '8px 0 20px',
      'text-align': 'center',
      color: '#6d4c5e',
      'font-size': '12px',
      'letter-spacing': '0.05em',
      'line-height': '1.6',
      'border-radius': '0',
    },

    // timeline：时间轴外框
    timeline: {
      margin: '22px 0',
      'padding-left': '8px',
      'border-left': '3px solid #e91e63',
    },

    // calloutGroup：四态联表外框
    calloutGroup: {
      'border-radius': '14px',
      border: '1px solid #e0b4c4',
      overflow: 'hidden',
      margin: '22px 0',
    },

    // abstract：tl;dr 摘要
    abstract: {
      __reset: true,
      'background-color': '#fdf6f8',
      'border-left': '4px solid #e91e63',
      'border-radius': '0 14px 14px 0',
      padding: '14px 18px',
      margin: '0 0 28px 0',
    },

    // keyNumber：大数字卡
    keyNumber: {
      margin: '22px 0',
      padding: '18px 20px',
      'background-color': '#fdf6f8',
      'border-top': '3px solid #e91e63',
      'border-radius': '14px',
    },

    // data-brief 家族
    masthead: {
      __reset: true,
      margin: '0 0 32px 0',
      'padding-bottom': '10px',
      'border-bottom': '2px solid #e91e63',
    },
    sectionTag: {
      margin: '0 0 14px 0',
      'border-radius': '10px',
    },
    byline: {
      'font-size': '13px',
      color: '#6d4c5e',
      'letter-spacing': '0.3px',
    },
    editorialHeader: {
      margin: '0 0 28px 0',
      'border-radius': '14px',
    },
    toc: {
      __reset: true,
      'background-color': '#fdf6f8',
      'border-radius': '14px',
      padding: '16px 18px',
      margin: '0 0 32px 0',
    },
    kpiDashboard: {
      'background-color': '#fdf6f8',
      'border-top': '2px solid #e91e63',
      'border-radius': '0 0 14px 14px',
      padding: '18px 18px 16px',
      margin: '0 0 28px 0',
    },
    barChart: {
      'background-color': '#fdf6f8',
      border: '1px solid #e0b4c4',
      'border-radius': '10px',
      padding: '16px 14px',
      margin: '22px 0',
    },
    qaBlock: {
      __reset: true,
      'background-color': 'transparent',
      padding: '0',
      margin: '32px 0',
    },
    footnotes: {
      __reset: true,
      'border-top': '1px solid #e0b4c4',
      'padding-top': '12px',
      margin: '24px 0',
      'font-size': '12px',
      'line-height': '1.75',
      color: '#6d4c5e',
    },
    colophon: {
      __reset: true,
      'border-top': '2px solid #e91e63',
      'margin-top': '36px',
      'padding-top': '16px',
      'padding-bottom': '16px',
      'border-radius': '0',
    },

    // pullQuote：stamp-quote variant 接管，容器给圆角基调
    pullQuote: {
      margin: '28px 0',
      'border-radius': '14px',
    },

    // tableCard：网格表格外框
    tableCard: {
      margin: '22px 0',
      'border-radius': '10px',
      overflow: 'hidden',
    },

    // gallery：三宫格安利
    gallery: {
      margin: '22px 0',
      'border-radius': '10px',
    },

    // dialogue：气泡对话
    dialogue: {
      margin: '22px 0',
    },
  },

  // ============================================================
  // 内层子元素 inline style 槽位
  // ============================================================
  innerStyles: {
    // abstract kicker：玫粉标签感
    abstractKicker: {
      color: '#e91e63',
      'font-size': '11px',
      'font-weight': '700',
      'letter-spacing': '0.15em',
      'text-transform': 'uppercase',
      'padding-bottom': '4px',
      'margin-bottom': '8px',
      display: 'block',
    },
    // key-number 大数字：玫粉 + 粗体
    keyNumberValue: {
      color: '#e91e63',
      'font-size': '36px',
      'font-weight': '800',
      'line-height': '1.1',
      'letter-spacing': '-0.02em',
      'margin-bottom': '6px',
    },
    // key-number kicker：小字灰提示
    keyNumberKicker: {
      color: '#6d4c5e',
      'font-size': '11px',
      'font-weight': '500',
      'letter-spacing': '0.12em',
      'text-transform': 'uppercase',
      'margin-bottom': '4px',
    },
  },

  // ============================================================
  // 主题模板片段
  // ============================================================
  templates: {
    cover: `::: cover
# 本周潮流安利清单 ✦
:::
`,
    authorBar: `::: author
@潮流小编 · 2026.05.17
:::
`,
    tip: `::: tip
这款真的绝了！姐妹们一定要冲！
:::
`,
    footerCTA: `::: footer-cta
关注我，每周更新最新潮流安利 ✨
:::
`,
  },

  svgVariant: 'soft',

  meta: {
    createdAt: '2026-05-17',
    ownerNotes:
      '青年潮志 · 鲜玫粉 #e91e63（色相 333°）+ 纯白底 + 圆角 14px + 行高 1.85。' +
      '5 个 orphan variant 升级为首采：pill-tag / chat-bubbles / triptych / stamp-quote / ai-notice。' +
      '核心 voice：inline.highlight 做成亮黄圆角胶囊标签（#ffd54f + borderRadius:10px）。' +
      '全部对比度对已自查：status 四态 ≥ 4.5:1，text/bg=19.16，textMuted/bg=7.38，code/bg=6.97，primary/bg=4.35（大字装饰 ≥ 3:1）。',
  },
}

export default spec
