/**
 * brutalist · 粗野主义报刊 · PersonaSpec
 *
 * 定位：凌晨三点印刷厂 —— 荧光黄是唯一允许存在的颜色。
 * 设计原型：docs/themes-specs/themes/07-brutalist.html
 * 视觉语汇：暗底 + 等宽字 + 直角硬边 + 荧光黄高亮 + 反色贴纸 + 终端注释 // 前缀。
 *
 * 三条不可妥协决策：
 *   1. radius = 0 全直角 —— "圆角即软，软即软文"，与粗野主义反向
 *   2. primary = #ebff00 荧光黄 —— 唯一允许的强调色，承担"被点名"的视觉重量
 *   3. status 四态打破交通灯：NOTE 蓝 / TIP 绿 / WARN 黄 / HALT 红
 *      —— "STOP" 太工业平淡，"HALT" 更 brutalist-aggressive 的终端 / 汇编传统
 *
 * 复用关系：除签名变体 `tilted-sticker` 与 masthead 的 `kicker` ribbon 模式外，
 * 全部容器 / 变体 / 装饰均复用现有词汇：
 *   - admonition · news-row（"四态共骨架 + 色相 + 标签字"）—— data-brief 同源
 *   - masthead / toc / qa-block / footnotes / colophon —— data-brief 家族签名容器
 *   - note variant=editorial-stripe（编 者 按）/ qrcode variant=follow-card（订阅卡）
 *   - footer-cta variant=triptych-actions（LIKE / STAR / FWD 三栏）
 *   - decorations.headingPrefix · arabic-padded / arabic-section —— 章节序号
 *
 * 平台兼容：transform:rotate 不在 wxPatch 删除列表（FORBIDDEN_POSITION_PROPS 不含），
 * tilted-sticker 的 -1deg 在公众号粘贴期保留。font-family 仍统一被剥（系统字体兜底）;
 * 等宽语义靠 letter-spacing 与字号节奏承担，而非真等宽字。
 */

import type { PersonaSpec } from '../_shared/spec'

export const spec: PersonaSpec = {
  id: 'brutalist',
  name: '粗野主义报刊',
  description: '近黑底 + 荧光黄 + 直角硬边：punk-zine / 终端 / 凌晨三点印刷厂',
  audience: '夜读简报 / 文化批评 / 实验栏目',

  // ============================================================
  // 色板（来源：docs/themes-specs/themes/07-brutalist.html :root tokens）
  // ============================================================
  palette: {
    primary: '#ebff00', // 荧光黄（唯一强调色）
    secondary: '#a0a0a0', // 灰辅助（textMuted 同源）
    accent: '#ebff00', // = primary
    bg: '#0a0a0a', // 近黑底
    bgSoft: '#1a1a1a', // 略提一档（用于次级深色块）
    bgMuted: '#2a2a2a', // 再提一档（图片占位斜纹底）
    text: '#f0f0f0', // 近白字
    textMuted: '#a0a0a0', // 灰辅助
    // 反色文字：在荧光黄底 / 反色贴纸上的文字色 = 近黑（与 bg 同）
    // tilted-sticker / highlight inline / news-row 徽章统一消费这个 token
    textInverse: '#0a0a0a',
    border: '#f0f0f0', // 双粗线刊头 / 横分割线（与 text 同源，强对比）
    code: '#ebff00', // inline code 黄字
    // note side-bar 差异化：黄色虚线左条（与暗底直角语言一致，零圆角硬边气质）
    noteBorder: '#ebff00',
    noteBorderStyle: 'dashed',
    noteBorderWidth: 2,
  },

  // 语义四色（设计稿 multi-callout 四联词表 NOTE / TIP / WARN / HALT）
  status: {
    info: { accent: '#4488dd', soft: '#11151c' }, // NOTE 蓝
    tip: { accent: '#66cc66', soft: '#0f1810' }, // TIP 绿
    warning: { accent: '#ebff00', soft: '#1a1a08' }, // WARN 黄（= primary）
    danger: { accent: '#ff3355', soft: '#1c0a0d' }, // HALT 红
  },

  // ============================================================
  // 字号 / 间距 / 圆角（直角硬边）
  // ============================================================
  typography: {
    baseSize: 13, // 设计稿正文 13px
    lineHeight: 1.6,
    h1Size: 30, // 出血副刊头大字（实际 36px 由 spec.elements.h1 直接覆盖）
    h2Size: 16, // 章节标题（顶横线 + 黄色序号）
    h3Size: 13, // 子标题（黄色等宽）
    letterSpacing: 0,
  },
  spacing: { paragraph: 14, section: 28, listItem: 4, containerPadding: 14 },
  radius: { sm: 0, md: 0, lg: 0 }, // 全 0 —— 圆角即软

  // ============================================================
  // Decorations：作者只写 `## 标题` / `### 子标题`,管线统一注入"01/02/03"与"2.1/2.2"
  // 荧光黄序号。粗野主义不写英文章节大写，序号是数字直给。
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
      {
        level: 3,
        autoNumber: 'arabic-section',
        style: {
          color: 'primary',
          fontWeight: 700,
          marginRight: 8,
        },
      },
    ],
  },

  // ============================================================
  // Motifs：极简,只留 dividerFlower（两线 + 中央 primary 方块）+ stepBadge
  // 四态图标刻意不导出 —— news-row 不渲染 icon（语义信号靠色相 + 大写徽章字）。
  // 设计稿的"图片占位"用 spec.elements.img 的黄色边框承担,不通过 motif。
  // ============================================================
  motifs: {
    // dividerFlower：两根 horizontal rule + 中央 primary 黄方块（设计稿 divider-ornament
    // 的"等宽破折"原型几何化呈现 —— 真 ━━━━ 文本太靠 font-family,故同位语义改用 SVG）
    dividerFlower: {
      viewBox: [0, 0, 240, 8],
      width: 220,
      height: 8,
      primitives: [
        { type: 'line', x1: 0, y1: 4, x2: 110, y2: 4, stroke: '#f0f0f0', strokeWidth: 1 },
        { type: 'rect', x: 115, y: 1, w: 10, h: 6, fill: '#ebff00' },
        { type: 'line', x1: 130, y1: 4, x2: 240, y2: 4, stroke: '#f0f0f0', strokeWidth: 1 },
      ],
    },

    // dividerWave：等宽破折近似（一长矩形 + 中央断口）—— 备用 divider
    dividerWave: {
      viewBox: [0, 0, 240, 4],
      width: 220,
      height: 4,
      primitives: [
        { type: 'rect', x: 0, y: 1, w: 240, h: 2, fill: '#ebff00' },
      ],
    },

    // dividerDots：三个 primary 黄色小方块（备用 divider）
    dividerDots: {
      viewBox: [0, 0, 240, 8],
      width: 220,
      height: 8,
      primitives: [
        { type: 'rect', x: 108, y: 2, w: 4, h: 4, fill: '#ebff00' },
        { type: 'rect', x: 118, y: 2, w: 4, h: 4, fill: '#ebff00' },
        { type: 'rect', x: 128, y: 2, w: 4, h: 4, fill: '#ebff00' },
      ],
    },

    // stepBadge：荧光黄方块 + 反色数字（直角,与 radius=0 纪律统一）
    stepBadge: {
      viewBox: [0, 0, 24, 24],
      width: 24,
      height: 24,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 8 },
      placeholders: ['N'],
      primitives: [
        { type: 'rect', x: 0, y: 0, w: 24, h: 24, fill: '#ebff00' },
        {
          type: 'text',
          x: 12,
          y: 17,
          content: '{N}',
          fontSize: 14,
          fontWeight: 700,
          fill: '#0a0a0a',
          textAnchor: 'middle',
        },
      ],
    },
  },

  // ============================================================
  // 骨架变体
  // ============================================================
  variants: {
    // 四态多框（multi-callout）共骨架 + 大写徽章 + 色相 —— 与 data-brief 同源。
    // 作者写 `::: info NOTE` / `::: tip TIP` / `::: warning WARN` / `::: danger HALT`,
    // ctx.info 覆盖 news-row 默认 TIP/INFO/WARN/STOP。
    admonition: 'slab-corner', // brutalist 专属：顶 6px accent 硬条 + 右上方块徽章 + zero-radius
    quote: 'tilted-sticker', // 粗野主义签名：反色 + transform:rotate(-1deg) + 大字 sans 粗体
    compare: 'stacked-row', // 粗野主义偏竖叠陈述：先 A 段后 B 段，硬边对照
    steps: 'split-row', // 左 4px 主色实线 + 左编号，硬边骨架与 news-row 同源
    divider: 'flower', // 用本主题 dividerFlower 的"两线 + primary 方块"
    sectionTitle: 'ribbon-stamp', // 左侧实色印章戳 + 主标题，punk-zine 标题语汇
    codeBlock: 'inline-card', // tinted 软底 + 左主色窄竖条，与 news-row 同色块语言
    note: 'side-bar', // 左 2px 短线 + 缩进,与"批注"语义一致
    footnotes: 'top-rule', // 顶部 hairline + 11px 密栏，punk zine 底栏
    recommend: 'card-list',
    qrcode: 'follow-card', // 刊物订阅卡：左 QR + 右 kicker/title/desc 三行
    footerCTA: 'triptych-actions', // 三栏 CTA（赞同/收藏/转发）
    pullQuote: 'stamp-quote', // brutalist DNA：印章压字 + 顶底 2px 硬条，拒绝装饰巨号
    announcement: 'danger-bar',
    tableCard: 'rule-grid',
    gallery: 'duo',
    dialogue: 'qa-rows',
  },

  // ============================================================
  // 主题级 kicker 文案覆盖（UNIX 终端注释 + punk-zine 母语）
  //
  // 结构性导航标签走 `//` 注释前缀（终端/程序员美学）；
  // 编辑声音走方括号 `[TAG]`（punk-zine 的 ASCII 标签气质）；
  // 刊物元数据混用中英，与 colophon 设计稿的"下期 / ISSUE"双轨一致。
  // ============================================================
  kickers: {
    toc: '// CONTENTS',
    qaBlock: '// Q&A',
    qrFollowKicker: '// SCAN & FOLLOW',
    qrFollowTitle: '慢读 // slow.read',
    recommend: '[READ_NEXT]',
    footerCTATitle: '[FOLLOW]',
    colophonNextLabel: '下期',
    colophonIssueLabel: 'ISSUE',
    mastheadName: '慢读',
  },

  // ============================================================
  // 签名容器：复用 data-brief 家族（masthead / toc / footnotes / qa-block /
  // colophon）。粗野主义不引入新签名容器。
  // ============================================================
  signatureContainers: [
    'masthead', // 三栏 ribbon 刊头（kicker / 期名 / 日期）
    'toc', // 目录（虚线框 + // CONTENTS kicker）
    'qaBlock', // 终端 Q&A 风
    'footnotes', // fn[] 等宽脚注
    'colophon', // 下期预告 + 卷·期
    'imageCaption', // 图注（// CAPTION 注释风 + 荧光黄）
    'announcement', // 强警示横幅（荧光黄整块反色）
  ],

  // ============================================================
  // 元素级样式
  // ============================================================
  elements: {
    // h1：装饰性副刊头（出血大字）。微信原生头部上方渲染原题；本 h1 承担
    // "再次强化主题"的视觉重量（30px+ 黑体不上 letter-spacing 收紧）。
    h1: {
      __reset: true,
      'font-size': '30px',
      'font-weight': '900',
      color: '#f0f0f0',
      'margin-top': '8px',
      'margin-bottom': '14px',
      'line-height': '1.05',
      'letter-spacing': '-0.04em',
    },
    // h2：章节顶线 + 荧光黄序号（序号由 decorations.headingPrefix 注入）
    h2: {
      __reset: true,
      'font-size': '16px',
      'font-weight': '700',
      color: '#f0f0f0',
      'margin-top': '28px',
      'margin-bottom': '12px',
      'line-height': '1.4',
      'letter-spacing': '0.02em',
      'border-top': '1px solid #f0f0f0',
      'padding-top': '10px',
    },
    // h3：黄色子标题（序号 + 文字）
    h3: {
      'font-size': '13px',
      'font-weight': '700',
      color: '#ebff00',
      'margin-top': '16px',
      'margin-bottom': '6px',
      'line-height': '1.5',
    },
    h4: {
      'font-size': '13px',
      'font-weight': '600',
      color: '#f0f0f0',
      'margin-top': '14px',
      'margin-bottom': '6px',
      'line-height': '1.5',
    },
    h5: {
      'font-size': '13px',
      'font-weight': '700',
      color: '#f0f0f0',
      'margin-top': '14px',
      'margin-bottom': '6px',
      'line-height': '1.5',
      'letter-spacing': '1px',
      'text-transform': 'uppercase',
    },
    h6: {
      'font-size': '13px',
      'font-weight': '600',
      color: '#a0a0a0',
      'margin-top': '12px',
      'margin-bottom': '4px',
      'line-height': '1.5',
      'letter-spacing': '2px',
      'text-transform': 'uppercase',
    },
    p: {
      'font-size': '13px',
      'line-height': '1.6',
      color: '#f0f0f0',
      'margin-top': '0',
      'margin-bottom': '14px',
    },
    // 裸 blockquote：上下双线 + 缩进（粗野主义不走"软底色卡片"）
    blockquote: {
      __reset: true,
      'border-left': 'none',
      'border-top': '1px solid #f0f0f0',
      'border-bottom': '1px solid #f0f0f0',
      'background-color': 'transparent',
      color: '#f0f0f0',
      padding: '10px 0',
      margin: '18px 0',
      'font-size': '13px',
      'line-height': '1.6',
      'border-radius': '0',
    },
    ul: { 'padding-left': '20px', 'margin-top': '0', 'margin-bottom': '14px' },
    ol: { 'padding-left': '20px', 'margin-top': '0', 'margin-bottom': '14px' },
    li: { 'margin-bottom': '4px', 'line-height': '1.9', color: '#f0f0f0' },
    strong: { 'font-weight': '700', color: '#ebff00' }, // 粗体 = 黄高亮
    em: { 'font-style': 'italic', color: '#a0a0a0' }, // 斜体 = 灰副本
    a: { color: '#ebff00', 'text-decoration': 'underline' },
    // hr：荧光黄横条（设计稿 divider-ornament ━━━ 等宽破折的"光栅化"对应物）
    hr: {
      border: 'none',
      height: '2px',
      'background-color': '#ebff00',
      'margin-top': '28px',
      'margin-bottom': '28px',
    },
    // img：荧光黄边框（设计稿 image-placeholder 的"黄框"语汇）
    img: {
      'max-width': '100%',
      display: 'block',
      'margin-top': '24px',
      'margin-right': 'auto',
      'margin-bottom': '8px',
      'margin-left': 'auto',
      border: '2px solid #ebff00',
      'border-radius': '0',
    },
    // 代码块：白底反色 + 左侧黄色 6px 实线（设计稿 code-block 原型）
    pre: {
      __reset: true,
      'background-color': '#f0f0f0',
      color: '#0a0a0a',
      padding: '14px 16px',
      margin: '14px 0',
      'border-left': '6px solid #ebff00',
      'border-radius': '0',
      'overflow-x': 'auto',
      'white-space': 'pre',
      'max-width': '100%',
      'box-sizing': 'border-box',
      'box-shadow': 'inset -14px 0 10px -10px rgba(0,0,0,0.25)',
      'font-size': '12px',
      'line-height': '1.8',
    },
    // inline code：荧光黄底 + 反色字（设计稿 inline-code 原型）
    code: {
      'background-color': '#ebff00',
      color: '#0a0a0a',
      padding: '1px 4px',
      'border-radius': '0',
      'font-size': '13px',
      'font-weight': '700',
    },
    // 撕贴纸键：荧光黄底 + 黑实色边（全 1px 等粗）+ 字距 0，粗野徽章感
    kbd: {
      display: 'inline-block',
      'background-color': '#ebff00',
      color: '#0a0a0a',
      border: '1px solid #f0f0f0',
      'border-radius': '0',
      padding: '0 5px',
      'font-size': '12px',
      'font-weight': '700',
      'letter-spacing': '0',
      'line-height': '1.5',
      'vertical-align': 'middle',
    },
    // 粗野黄黑表：radius 0 + 荧光黄 th 反色 + 全大写 + 1px 黑实色边
    table: {
      'border-collapse': 'collapse',
      width: '100%',
      'margin-top': '0',
      'margin-bottom': '16px',
      'font-size': '13px',
    },
    th: {
      border: '1px solid #f0f0f0',
      padding: '6px 10px',
      'background-color': '#ebff00',
      color: '#0a0a0a',
      'text-align': 'left',
      'font-weight': '700',
      'text-transform': 'uppercase',
      'letter-spacing': '0.05em',
    },
    td: {
      border: '1px solid #f0f0f0',
      padding: '6px 10px',
      color: '#f0f0f0',
    },
  },

  // ============================================================
  // 内联强调
  // ============================================================
  inline: {
    // highlight：荧光黄底 + 反色字（设计稿 intro-para 关键词高亮）
    highlight: {
      'background-color': '#ebff00',
      color: '#0a0a0a',
      padding: '1px 3px',
      'border-radius': '0',
    },
    wavy: {
      'text-decoration': 'underline wavy',
      'text-decoration-color': '#ebff00',
      'text-underline-offset': '3px',
    },
    emphasis: {
      color: '#ebff00',
      'font-weight': '700',
    },
    del: {
      color: '#a0a0a0',
      'text-decoration': 'line-through',
    },
    ins: {
      color: '#ebff00',
      'text-decoration': 'underline',
    },
  },

  // ============================================================
  // 容器视觉（每个签名容器在此微调；renderer 提供 fallback，spec 覆盖优先）
  // ============================================================
  containers: {
    // intro：导语区域（默认透明,正文级 14px）
    intro: {
      __reset: true,
      'background-color': 'transparent',
      'border-left': 'none',
      'border-radius': '0',
      padding: '0',
      margin: '0 0 24px 0',
      color: '#f0f0f0',
      'font-size': '14px',
      'line-height': '1.55',
    },
    // author：作者日期灰小字（与设计稿 byline 对应）
    author: {
      __reset: true,
      'background-color': 'transparent',
      border: 'none',
      'border-radius': '0',
      padding: '0',
      margin: '0 0 28px 0',
      color: '#a0a0a0',
      'font-size': '11px',
      'line-height': '1.7',
      'letter-spacing': '0.02em',
    },
    // cover：刊物副刊头容器（margin 兜底,内部 h1 由 spec.elements.h1 接管）
    cover: { margin: '0 0 14px 0' },

    // admonition 四态由 news-row variant 接管；spec.containers 留空让 variant 自治
    tip: {},
    warning: {},
    info: {},
    danger: {},

    // note：side-bar variant 自取 noteBorder* tokens（黄色 2px dashed），此处只补 reset
    note: {
      __reset: true,
      'background-color': 'transparent',
      margin: '16px 0',
      'border-radius': '0',
    },

    // quote-card：tilted-sticker variant 已注入旋转 + 反色,这里追加 margin 不重复样式
    quoteCard: { margin: '24px 0' },

    // highlight：通用高亮块（中性,与 editor-note 的"被点名"区别）
    highlight: {
      __reset: true,
      'background-color': '#1a1a1a',
      padding: '12px 14px',
      margin: '16px 0',
      'border-radius': '0',
      'border-left': '3px solid #ebff00',
    },

    compare: { margin: '16px 0' },
    steps: { margin: '20px 0' },

    sectionTitle: {
      __reset: true,
      margin: '28px 0 12px',
      'padding-bottom': '6px',
      'border-bottom': '1px solid #f0f0f0',
    },

    // footer-cta：备用（粗野主义主要用 ctaBar 签名容器）
    footerCTA: {
      __reset: true,
      margin: '24px 0',
      padding: '0',
      'background-color': 'transparent',
      'border-radius': '0',
    },

    recommend: {
      __reset: true,
      margin: '20px 0',
      padding: '12px 14px',
      'background-color': '#1a1a1a',
      'border-left': '3px solid #ebff00',
      'border-radius': '0',
    },

    qrcode: {
      __reset: true,
      margin: '22px 0',
      padding: '12px',
      border: '1px solid #f0f0f0',
      'border-radius': '0',
    },

    // signature 容器
    abstract: {
      __reset: true,
      'border-left': '3px solid #ebff00',
      padding: '4px 0 4px 14px',
      margin: '0 0 22px 0',
      'background-color': 'transparent',
      'border-radius': '0',
    },
    keyNumber: {
      __reset: true,
      margin: '18px 0',
      padding: '16px',
      'background-color': '#1a1a1a',
      'border-top': '3px solid #ebff00',
      'border-radius': '0',
    },
    // ── data-brief 家族签名容器：粗野主义版本的视觉收紧 ──
    // masthead：上下双 2px 实线 + 三栏 ribbon（attrs.kicker 触发）
    masthead: {
      __reset: true,
      'border-top': '2px solid #f0f0f0',
      'border-bottom': '2px solid #f0f0f0',
      padding: '6px 0',
      margin: '0 0 20px 0',
      'border-radius': '0',
    },
    sectionTag: { margin: '0 0 14px 0' },
    // toc：虚线灰边框 + 黄色 // CONTENTS kicker（kicker color 走 primary）
    toc: {
      __reset: true,
      'background-color': 'transparent',
      border: '1px dashed #a0a0a0',
      padding: '10px 12px',
      margin: '0 0 24px 0',
      'border-radius': '0',
    },
    kpiDashboard: {
      __reset: true,
      'background-color': '#1a1a1a',
      'border-top': '1px solid #f0f0f0',
      'border-bottom': '1px solid #f0f0f0',
      padding: '18px 16px 16px',
      margin: '0 0 28px 0',
      'border-radius': '0',
    },
    barChart: {
      __reset: true,
      'background-color': '#1a1a1a',
      border: '1px solid #f0f0f0',
      padding: '16px 14px',
      margin: '20px 0 24px',
      'border-radius': '0',
    },
    // qa-block：黑底 + 白色边框 + 终端风（kicker "// Q&A" 走 primary）
    qaBlock: {
      __reset: true,
      'background-color': 'transparent',
      border: '1px solid #f0f0f0',
      'border-top': '1px solid #f0f0f0',
      'border-bottom': '1px solid #f0f0f0',
      padding: '12px',
      margin: '24px 0',
      'border-radius': '0',
    },
    // footnotes：上虚线 + 灰小字（两骨架共用；长列表写 variant=inline-flow 内滚动）
    footnotes: {
      __reset: true,
      'border-top': '1px dashed #f0f0f0',
      margin: '20px 0',
      'font-size': '10px',
      'line-height': '1.75',
      color: '#a0a0a0',
    },
    // cta-bar：三栏（LIKE / STAR / FWD）—— renderer 已提供 display:table 骨架
    // qr-follow：左 QR + 右 SUBSCRIBE / 标题 / 说明（黄边框 + 黑底）
    // colophon：上 2px 双粗线 + "下期 / 卷·期"（与 masthead 头尾呼应）
    colophon: {
      __reset: true,
      'border-top': '2px solid #f0f0f0',
      'margin-top': '24px',
      'padding-top': '12px',
      'border-radius': '0',
    },
    // 粗野图注：`// CAPTION` 注释风 + 荧光黄 + 等宽，终端输出感
    imageCaption: {
      __reset: true,
      margin: '4px 0 16px',
      'text-align': 'left',
      'font-size': '11px',
      color: '#ebff00',
      'font-weight': '700',
      'letter-spacing': '0.1em',
    },
    // 撕贴纸反色横幅：荧光黄整块 + 反色黑字 + 全大写，强势 punk-zine 通告
    announcement: {
      __reset: true,
      'background-color': '#ebff00',
      color: '#0a0a0a',
      padding: '12px 16px',
      margin: '18px 0',
      'border-radius': '0',
      'font-weight': '700',
      'letter-spacing': '0.05em',
    },
    // voice / video 卡：暗底主题不能走 baseContainers 的浅卡兜底；
    // 走"无底色 + 2px 实线 + 直角"的粗野铁皮箱形态，与本主题刊头双粗线 + masthead 同语汇
    voiceCard: {
      __reset: true,
      'background-color': 'transparent',
      border: '2px solid #f0f0f0',
      'border-radius': '0',
      padding: '14px 16px',
      margin: '22px 0',
    },
    videoCard: {
      __reset: true,
      'background-color': 'transparent',
      border: '2px solid #f0f0f0',
      'border-radius': '0',
      padding: '14px 16px',
      margin: '22px 0',
    },
  },

  // ============================================================
  // 容器内层 inline-style 覆盖
  // ============================================================
  innerStyles: {
    // abstract 容器透明底 = 落在近黑页底（#0a0a0a）上，kicker 走荧光黄 primary 保持可见
    abstractKicker: {
      __reset: true,
      color: '#ebff00',
      'font-size': '11px',
      'font-weight': '700',
      'letter-spacing': '0.2em',
      'text-transform': 'uppercase',
      'margin-bottom': '6px',
    },
    // keyNumber 容器底色 #1a1a1a（暗底），大数字走荧光黄 primary 承担视觉重量
    keyNumberValue: {
      __reset: true,
      color: '#ebff00',
      'font-size': '34px',
      'font-weight': '900',
      'line-height': '1.0',
      'letter-spacing': '-0.5px',
      'margin-bottom': '4px',
    },
    // keyNumber 暗底上的小 kicker 走荧光黄 primary，与 abstractKicker 语言统一
    keyNumberKicker: {
      __reset: true,
      color: '#ebff00',
      'font-size': '11px',
      'font-weight': '700',
      'letter-spacing': '0.2em',
      'text-transform': 'uppercase',
      'margin-bottom': '8px',
    },
  },

  // ============================================================
  // 模板片段（作者侧示例；commonTemplates 隐式合并）
  // ============================================================
  templates: {
    cover: `::: masthead 慢读 issue="04" date="2026.04.22" kicker="第 04 期"
:::

# 出血副刊头大字
`,
    authorBar: `::: author
撰文　何已阅
日期　2026.04.22
:::
`,
    footerCTA: `::: cta-bar like="LIKE" star="STAR ★" share="FWD →"
:::
`,
    tip: `::: tip TIP
要点正文。
:::
`,
  },

  meta: {
    createdAt: '2026-05-14',
    ownerNotes:
      '主题 07 粗野主义报刊：荧光黄 + 暗底 + 直角硬边。复用现有 admonition.news-row、' +
      'data-brief 家族签名容器（masthead 增 kicker 三栏 ribbon 模式）；唯一新增 variant 为' +
      ' quote.tilted-sticker（punk-zine 撕贴纸语义,可复用）。' +
      '编辑部按 / 调研口径走 note variant=editorial-stripe / research-dense。',
  },
}

export default spec
