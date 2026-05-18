/**
 * commerce-pulse · 电商脉动 · PersonaSpec
 *
 * 定位：B2C 电商 / 直播带货 / 双 11 大促 / 美妆服饰 KOC / 抖音电商——
 * 围绕"促销 / 价格优势 / 限时紧迫 / KOL 推荐"的高密度带货排版。
 *
 * 视觉签名三条不可妥协：
 *   1. primary = #c4310e 朱砂橙红（非纯红、非国际红 #e30613，色相差 16°、亮度差 5%）
 *   2. 白底 + 朱红 + 炭灰 #2a2a2a；accent 用金色 #c89759（稀缺点缀）
 *   3. h1 ≥ 26、h2 ≥ 22；大字号 + 紧字距，强调促销紧迫感
 *
 * 签名容器：recommend（核心商品卡）/ footerCTA（买/收藏/分享）/
 *           announcement（限时警示）/ pullQuote（爆款话术）/ tableCard（价格对比）
 */

import type { PersonaSpec } from '../_shared/spec'

export const spec: PersonaSpec = {
  id: 'commerce-pulse',
  name: '电商脉动',
  description: '朱红 + 金色 + 炭灰：促销 / 价格优势 / 限时紧迫 / KOL 推荐的高密度带货排版',
  audience: 'B2C 电商 / 直播带货 / 双 11 大促 / 美妆服饰 KOC / 抖音电商',

  // ============================================================
  // 色板（朱红家族；白底高对比；金色 accent 稀缺点缀）
  // ============================================================
  palette: {
    primary: '#c4310e',    // 朱红（签名色：标题线 / 价格高亮 / 核心 CTA）
    secondary: '#2a2a2a',  // 炭灰（副标题 / 正文粗体 / 边框压色）
    accent: '#c89759',     // 金色（稀缺：VIP 徽章 / 限量价格标 / 推荐角标）
    bg: '#ffffff',         // 纯白底
    bgSoft: '#fff8f8',     // 极浅暖粉（促销卡片底 / intro 区底色）
    bgMuted: '#f5f0f0',    // 浅暖灰（recommend 卡背景 / note 底色）
    text: '#1a1a1a',       // 近黑正文
    textMuted: '#595959',  // 中灰辅助文字（价格说明 / 规格小字）
    textInverse: '#fefefe', // 反白（CTA 按钮文字 / 限时标签反底）
    border: '#e0d0d0',     // 浅暖粉边框（卡片分割线）
    code: '#8b1a1a',       // 深朱红 inline 代码（价格代码 / SKU 标识）
    preBg: '#1e1a1a',      // 代码块暗底（不可妥协的终端黑底）
    preText: '#f0e8e8',    // 代码块浅字（暖白，与正文区分）
    highlightBg: '#fff0c0', // 高亮底（暖黄，价格划线强调）
    codeBg: '#fdf0f0',     // inline code 底色（浅朱红底）
  },

  // ============================================================
  // 语义四色（全部 WCAG AA 4.5:1 达标）
  // ============================================================
  status: {
    tip: { accent: '#1a7a3c', soft: '#e8f5ed' },    // 绿（4.81:1）：限时优惠 / 活动进行中
    info: { accent: '#1a5cb0', soft: '#e6effa' },    // 蓝（5.65:1）：品牌信息 / 正品说明
    warning: { accent: '#8a5c0a', soft: '#faf0dc' }, // 琥珀（5.13:1）：库存警告 / 活动即将结束
    danger: { accent: '#b22018', soft: '#fde8e6' },  // 深朱红（5.74:1）：限量清仓 / 秒杀倒计时
  },

  // ============================================================
  // 字号（大字号电商范式：h1 ≥ 26、h2 ≥ 22）
  // ============================================================
  typography: {
    baseSize: 15,
    lineHeight: 1.7,
    h1Size: 28,
    h2Size: 22,
    h3Size: 17,
    letterSpacing: 0.3,
    h4Size: 16,
    captionSize: 12,
  },

  spacing: {
    paragraph: 16,
    section: 28,
    listItem: 8,
    containerPadding: 16,
  },

  radius: { sm: 4, md: 8, lg: 12 },

  // ============================================================
  // Decorations：h2 前缀序号，强化"章节 = 卖点模块"感
  // ============================================================
  decorations: {
    headingPrefix: [
      {
        level: 2,
        autoNumber: 'arabic-padded',
        style: {
          color: 'primary',
          fontWeight: 700,
          marginRight: 8,
        },
      },
    ],
  },

  // ============================================================
  // Motifs：朱红主色调 SVG 装饰
  // ============================================================
  motifs: {
    // h2Prefix：朱红菱形标记（促销章节感）
    h2Prefix: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 8 },
      primitives: [
        {
          type: 'path',
          d: 'M8,1 L15,8 L8,15 L1,8 Z',
          fill: 'token:primary',
        },
      ],
    },

    // dividerDots：朱红 + 金色三圆点（品牌分隔符）
    dividerDots: {
      viewBox: [0, 0, 240, 10],
      width: 220,
      height: 10,
      primitives: [
        { type: 'line', x1: 0, y1: 5, x2: 100, y2: 5, stroke: 'token:border', strokeWidth: 1 },
        { type: 'circle', cx: 108, cy: 5, r: 3, fill: 'token:primary' },
        { type: 'circle', cx: 120, cy: 5, r: 3, fill: 'token:accent' },
        { type: 'circle', cx: 132, cy: 5, r: 3, fill: 'token:primary' },
        { type: 'line', x1: 140, y1: 5, x2: 240, y2: 5, stroke: 'token:border', strokeWidth: 1 },
      ],
    },

    // dividerWave：朱红波浪（促销节奏感）
    dividerWave: {
      viewBox: [0, 0, 240, 12],
      width: 220,
      height: 12,
      primitives: [
        {
          type: 'path',
          d: 'M0,6 Q20,1 40,6 Q60,11 80,6 Q100,1 120,6 Q140,11 160,6 Q180,1 200,6 Q220,11 240,6',
          stroke: 'token:primary',
          strokeWidth: 1.5,
          fill: 'none',
          strokeLinecap: 'round',
        },
      ],
    },

    // tipIcon：朱红圆角方框 + 勾（限时优惠确认）
    tipIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        { type: 'rect', x: 1, y: 1, w: 14, h: 14, fill: 'token:status.tip.accent', rx: 3, ry: 3 },
        {
          type: 'path',
          d: 'M4,8 L7,11 L12,5',
          stroke: 'token:textInverse',
          strokeWidth: 2,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        },
      ],
    },

    // warningIcon：琥珀色感叹号（库存告急）
    warningIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        {
          type: 'path',
          d: 'M8,1 L15,14 L1,14 Z',
          fill: 'token:status.warning.accent',
        },
        { type: 'rect', x: 7, y: 5, w: 2, h: 5, fill: 'token:textInverse' },
        { type: 'rect', x: 7, y: 11, w: 2, h: 2, fill: 'token:textInverse' },
      ],
    },

    // listBullet：朱红小菱形（商品列表要点）
    listBullet: {
      viewBox: [0, 0, 10, 10],
      width: 8,
      height: 8,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        {
          type: 'path',
          d: 'M5,1 L9,5 L5,9 L1,5 Z',
          fill: 'token:primary',
        },
      ],
    },

    // stepBadge：朱红实心圆 + 白外环 + 白数字（CTA"按键浮起"感）。
    // 外圈 1.5px 白 stroke 让徽章从背景"切出"，与 button-led footerCTA 的胶囊按键
    // 同语言；区别于 default 单层实心圆（无外环）。
    stepBadge: {
      viewBox: [0, 0, 24, 24],
      width: 24,
      height: 24,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 8 },
      placeholders: ['N'],
      primitives: [
        { type: 'circle', cx: 12, cy: 12, r: 11, fill: 'token:primary' },
        { type: 'circle', cx: 12, cy: 12, r: 9, stroke: 'token:textInverse', strokeWidth: 1, fill: 'none', opacity: 0.55 },
        {
          type: 'text',
          x: 12,
          y: 17,
          content: '{N}',
          fontSize: 14,
          fontWeight: 700,
          fill: 'token:textInverse',
          textAnchor: 'middle',
        },
      ],
    },
  },

  // ============================================================
  // 骨架变体（电商语汇优先选型）
  // ============================================================
  variants: {
    admonition: 'accent-bar',       // 强 CTA 左色条，适合"限时 / 注意"
    quote: 'frame-brackets',        // 四角括号：KOL 口碑引用感
    compare: 'data-card',           // 价格对比卡：顶 3px 色条 + 大号数字
    steps: 'number-circle',         // 圆圈编号：购买步骤 / 使用教程
    divider: 'dots',                // 朱红 + 金点分隔（消费本主题 dividerDots）
    sectionTitle: 'kicker-stack',   // 上 kicker + 主标题：促销章节双层感
    codeBlock: 'bare',              // 裸 pre（SKU / 优惠码展示）
    note: 'box-callout',            // 边框角标卡片：补注 / 规格说明
    footnotes: 'lined',             // 单行脚注：参考链接 / 使用说明
    recommend: 'card-list',         // 商品推荐卡列表（核心签名）
    qrcode: 'bare',                 // 居中 QR（小程序 / 直播间）
    footerCTA: 'triptych-actions',  // 买 / 收藏 / 分享三联（核心 CTA）
    pullQuote: 'stamp-quote',       // 旋转印章 + 粗体大字：促销盖章感（带货语境优于 giant-mark 的文学开引号）
    announcement: 'danger-bar',     // 限时警示横幅（秒杀 / 清仓告急）
    tableCard: 'key-value',         // orphan 升级：键值对档式（规格 / SKU 参数列表）
    gallery: 'triptych',            // orphan 升级：三联图（产品三视图 / 三档位展示）
    dialogue: 'qa-rows',            // Q&A 行：买家问 / 商家答
  },

  // ============================================================
  // 主题级 kicker 文案（带货语境本土化）。注意：ThemeKickers 是**容器**级 kicker
  // （toc/qaBlock/recommend/footerCTATitle/colophon），不含 admonition kind 标签——
  // admonition tip/warning 的文案是 markdown 作者侧 `::: warning <text>` 现写,
  // 不走主题级覆盖路径。
  // ============================================================
  kickers: {
    recommend: '为你推荐',
    footerCTATitle: '立即抢购',
  },

  // ============================================================
  // 签名容器声明
  // ============================================================
  signatureContainers: [
    'recommend',
    'footerCTA',
    'announcement',
    'pullQuote',
    'tableCard',
    'compare',
    'steps',
    'quoteCard',
  ],

  // ============================================================
  // 元素级样式（大字号 + 朱红标题下划线）
  // ============================================================
  elements: {
    h1: {
      'font-size': '28px',
      'font-weight': '800',
      color: '#1a1a1a',
      'margin-top': '0',
      'margin-bottom': '10px',
      'line-height': '1.3',
      'letter-spacing': '0.3px',
    },
    h2: {
      __reset: true,
      'font-size': '22px',
      'font-weight': '700',
      color: '#1a1a1a',
      'margin-top': '28px',
      'margin-bottom': '10px',
      'line-height': '1.35',
      'letter-spacing': '0.3px',
      'padding-bottom': '6px',
      'border-bottom': '2px solid #c4310e',
    },
    h3: {
      'font-size': '17px',
      'font-weight': '700',
      color: '#2a2a2a',
      'margin-top': '20px',
      'margin-bottom': '8px',
      'line-height': '1.45',
      'letter-spacing': '0.2px',
    },
    h4: {
      'font-size': '16px',
      'font-weight': '600',
      color: '#2a2a2a',
      'margin-top': '16px',
      'margin-bottom': '6px',
      'line-height': '1.5',
    },
    h5: {
      'font-size': '15px',
      'font-weight': '600',
      color: '#2a2a2a',
      'margin-top': '14px',
      'margin-bottom': '6px',
      'line-height': '1.5',
    },
    h6: {
      'font-size': '13px',
      'font-weight': '600',
      color: '#595959',
      'margin-top': '12px',
      'margin-bottom': '4px',
      'line-height': '1.5',
      'letter-spacing': '0.5px',
    },
    p: {
      'font-size': '15px',
      'line-height': '1.7',
      color: '#1a1a1a',
      'margin-top': '0',
      'margin-bottom': '16px',
    },
    // blockquote：KOL 引用框，朱红左条 + 暖粉底
    blockquote: {
      __reset: true,
      'border-left': '4px solid #c4310e',
      'background-color': '#fff8f8',
      color: '#1a1a1a',
      padding: '10px 14px 10px 18px',
      margin: '20px 0',
      'font-size': '15px',
      'font-weight': '500',
      'line-height': '1.65',
      'border-radius': '0 8px 8px 0',
    },
    ul: { 'padding-left': '20px', 'margin-top': '0', 'margin-bottom': '14px' },
    ol: { 'padding-left': '20px', 'margin-top': '0', 'margin-bottom': '14px' },
    li: { 'margin-bottom': '8px', 'line-height': '1.7', color: '#1a1a1a' },
    strong: { 'font-weight': '700', color: '#c4310e' },
    em: { 'font-style': 'italic', color: '#2a2a2a' },
    a: {
      color: '#c4310e',
      'text-decoration': 'none',
      'border-bottom': '1px solid #c4310e',
    },
    hr: {
      border: 'none',
      height: '1px',
      'background-color': '#e0d0d0',
      'margin-top': '20px',
      'margin-bottom': '20px',
    },
    img: {
      'max-width': '100%',
      display: 'block',
      'margin-top': '10px',
      'margin-right': 'auto',
      'margin-bottom': '10px',
      'margin-left': 'auto',
      'border-radius': '8px',
    },
    // pre：暗底代码块（SKU 列表 / 优惠码）
    pre: {
      __reset: true,
      'background-color': '#1e1a1a',
      color: '#f0e8e8',
      padding: '12px 16px',
      margin: '12px 0 18px',
      'border-radius': '8px',
      'overflow-x': 'auto',
      'white-space': 'pre',
      'max-width': '100%',
      'box-sizing': 'border-box',
      'font-size': '13px',
      'line-height': '1.8',
    },
    // inline code：朱红文字 + 浅暖底
    code: {
      'background-color': '#fdf0f0',
      color: '#8b1a1a',
      padding: '1px 5px',
      'border-radius': '4px',
      'font-size': '13px',
    },
    // 表格：价格对比清单风格
    table: {
      'border-collapse': 'collapse',
      width: '100%',
      'margin-top': '0',
      'margin-bottom': '18px',
      'font-size': '14px',
      'border-radius': '0',
    },
    th: {
      'background-color': '#c4310e',
      color: '#fefefe',
      border: '1px solid #c4310e',
      padding: '8px 10px',
      'font-weight': '700',
      'text-align': 'left',
      'letter-spacing': '0.3px',
      'font-size': '13px',
    },
    td: {
      border: '1px solid #e0d0d0',
      'border-bottom': '1px solid #e0d0d0',
      padding: '8px 10px',
      color: '#1a1a1a',
    },
    kbd: {
      display: 'inline-block',
      'background-color': '#f5f0f0',
      color: '#1a1a1a',
      border: '1px solid #e0d0d0',
      'border-bottom-width': '2px',
      'border-radius': '4px',
      padding: '1px 5px',
      'font-size': '12px',
      'line-height': '1.4',
      'letter-spacing': '0',
      'vertical-align': 'middle',
    },
  },

  // ============================================================
  // 内联强调（促销 / 价格 / 好评高亮）
  // ============================================================
  inline: {
    highlight: {
      'background-color': '#fff0c0',
      color: '#1a1a1a',
      padding: '0 4px',
      'border-radius': '2px',
    },
    wavy: {
      'text-decoration': 'underline wavy',
      'text-decoration-color': '#c4310e',
      'text-underline-offset': '3px',
    },
    emphasis: {
      color: '#c4310e',
      'font-weight': '700',
    },
    del: {
      color: '#595959',
      'text-decoration': 'line-through',
    },
    ins: {
      color: '#1a7a3c',
      'text-decoration': 'underline',
    },
  },

  // ============================================================
  // 容器视觉（电商卡片化语言）
  // ============================================================
  containers: {
    // intro：文章前置摘要，浅暖粉底 + 朱红左条
    intro: {
      'background-color': '#fff8f8',
      'border-left': '4px solid #c4310e',
      'border-radius': '0 8px 8px 0',
      padding: '12px 16px 12px 18px',
      margin: '0 0 22px 0',
      color: '#1a1a1a',
    },
    // author：署名栏，极简下边框
    author: {
      __reset: true,
      'border-bottom': '1px solid #e0d0d0',
      'padding-bottom': '16px',
      margin: '0 0 20px 0',
      'font-size': '13px',
      color: '#595959',
    },
    cover: { margin: '0 0 16px 0' },
    tip: {},
    warning: {},
    info: {},
    danger: {},
    // note：补注卡片，浅底 + 边框
    note: {
      'background-color': '#f5f0f0',
      padding: '10px 14px',
      margin: '16px 0',
      'font-size': '13px',
      'line-height': '1.6',
      color: '#595959',
      'border-radius': '6px',
      border: '1px solid #e0d0d0',
    },
    // quoteCard：KOL 推荐语 / 买家好评引用
    // 删 border-left:4px：commerce-pulse 默认 quote variant 是 frame-brackets
    // （左上 / 左下 L 形角标），再叠 4px 实线会和 SVG 四角语义重叠。仅留软底 +
    // 圆角作 voice override；左侧锚饰交由 variant 的四角 L 形承担。
    quoteCard: {
      'background-color': '#fff8f8',
      'border-radius': '8px',
      padding: '16px 20px',
      margin: '18px 0',
    },
    highlight: {
      'background-color': '#fff8f8',
      padding: '12px 16px',
      margin: '14px 0',
      'border-radius': '8px',
      border: '1px solid #e0d0d0',
    },
    // compare：价格对比 / 规格 vs 规格
    compare: { margin: '16px 0 20px' },
    // steps：购买流程 / 使用步骤
    steps: { margin: '18px 0' },
    sectionTitle: {
      __reset: true,
      margin: '28px 0 10px',
      'padding-bottom': '0',
      'border-bottom': 'none',
    },
    // footerCTA：买 / 收藏 / 分享三联（朱红实色格 + 描边格）
    footerCTA: {
      __reset: true,
      margin: '24px 0 0',
      padding: '0',
      'background-color': 'transparent',
      'border-radius': '0',
    },
    // recommend：商品推荐核心卡（朱红顶条 + 卡片底色）
    recommend: {
      'background-color': '#fff8f8',
      'border-top': '3px solid #c4310e',
      'border-radius': '0 0 8px 8px',
      padding: '14px 16px',
      margin: '20px 0',
    },
    // qrcode：小程序 / 直播间 QR
    qrcode: {
      margin: '20px 0',
      padding: '16px',
      'background-color': '#fff8f8',
      'border-top': '3px solid #c4310e',
      'border-radius': '0 0 8px 8px',
      'text-align': 'center',
    },
    voiceCard: { margin: '16px 0' },
    videoCard: { margin: '16px 0' },
    // announcement：限时秒杀横幅（朱红全底 + 反白文字）
    announcement: {
      'background-color': '#fff8f8',
      'border-left': '5px solid #c4310e',
      'border-radius': '0 8px 8px 0',
      padding: '12px 16px 12px 18px',
      margin: '20px 0',
      'font-weight': '700',
    },
    authorBio: {
      'background-color': '#fff8f8',
      'border-radius': '8px',
      padding: '16px',
      margin: '18px 0',
      border: '1px solid #e0d0d0',
    },
    imageCaption: {
      margin: '2px 0 16px 0',
      'text-align': 'center',
      'font-size': '12px',
      color: '#595959',
    },
    timeline: {
      margin: '18px 0',
      'border-left': '3px solid #c4310e',
      'background-color': '#fff8f8',
      padding: '12px 14px 12px 18px',
      'border-radius': '0 8px 8px 0',
    },
    abstract: {
      __reset: true,
      'border-left': '4px solid #c4310e',
      padding: '6px 14px 6px 18px',
      margin: '0 0 20px 0',
      'background-color': '#fff8f8',
      'border-radius': '0 8px 8px 0',
    },
    keyNumber: {
      margin: '18px 0',
      padding: '16px 18px',
      'background-color': '#fff8f8',
      'border-top': '3px solid #c4310e',
      'border-radius': '0 0 8px 8px',
    },
    // data-brief 家族（兼容，保持中性）
    masthead: { margin: '0 0 20px 0', 'padding-bottom': '10px', 'border-bottom': '1px solid #e0d0d0' },
    sectionTag: { margin: '0 0 14px 0' },
    byline: { margin: '0 0 16px 0', color: '#595959', 'font-size': '13px' },
    editorialHeader: { margin: '0 0 20px 0' },
    toc: { 'background-color': '#fff8f8', padding: '12px 16px', margin: '0 0 24px 0', 'border-radius': '8px' },
    kpiDashboard: { 'background-color': '#fff8f8', 'border-top': '3px solid #c4310e', padding: '16px', margin: '0 0 24px 0', 'border-radius': '0 0 8px 8px' },
    barChart: { 'background-color': '#fff8f8', border: '1px solid #e0d0d0', padding: '16px', margin: '18px 0', 'border-radius': '8px' },
    qaBlock: { 'border-top': '1px solid #e0d0d0', 'border-bottom': '1px solid #e0d0d0', padding: '14px 0', margin: '18px 0' },
    footnotes: { 'border-top': '1px solid #e0d0d0', margin: '14px 0', 'font-size': '12px', color: '#595959' },
    colophon: { __reset: true, 'border-top': '1px solid #e0d0d0', 'margin-top': '20px', 'padding-top': '12px' },
    // pullQuote：爆款话术 / KOL 金句放大
    pullQuote: {
      margin: '24px 0',
      padding: '0',
      'background-color': 'transparent',
    },
    // tableCard：价格档位 / 规格清单
    tableCard: {
      margin: '18px 0 22px',
      'border-radius': '8px',
      overflow: 'hidden',
      border: '1px solid #e0d0d0',
    },
    gallery: { margin: '16px 0' },
    dialogue: { margin: '16px 0' },
  },

  // ============================================================
  // 模板片段（带货文写作参考）
  // ============================================================
  templates: {
    cover: `::: announcement 限时特卖 · 仅剩最后 12 小时
**双 11 年度最低价**——错过等一年！
:::

# 2026 年最值得买的 10 款美妆好物

::: author
测评 **陈美仪**　编辑 **林晓颖**
:::
`,
    footerCTA: `::: footer-cta variant=triptych-actions
:::
`,
    tip: `::: tip 限时活动
本期所有推荐商品享专属折扣，点击链接直达优惠。
:::
`,
  },

  meta: {
    createdAt: '2026-05-17',
    ownerNotes:
      '电商脉动主题 · 朱红 #c4310e（非纯红非国际红）+ 金色 #c89759 + 炭灰 #2a2a2a。' +
      'h1=28px、h2=22px 大字号；recommend/footerCTA/announcement 三件签名容器定义带货版面。' +
      '全部 WCAG AA 对比度 4.5:1 已过验证。',
  },
}
