/**
 * editorial-mook · 编辑刊 · PersonaSpec
 *
 * 视觉灵魂：POPEYE / BRUTUS 系 mook 杂志—— "余白即语言，圈号即温度"。
 *
 * 视觉 ground truth：docs/themes-specs/themes/04-japanese-mook.html。
 *   - 米白底 #faf6ef + 朱橙主色 #e85a3c + 深蓝灰文字 #2d3a4a
 *   - 直角硬边（radius 全 0）
 *   - 字号普遍偏小（base 13px / h2 14px / h3 11px），line-height 2 留呼吸
 *   - 编集附注用单字 CJK 标签（参 / 編 / 注 / 禁）——mook-tag admonition variant 承载
 *   - 大量留白：spacing.section 48px，让"余白"的视觉变成排印的一部分
 *
 * 与其它"刊物化"主题（data-brief / industry-observer）的边界：
 *   - data-brief 走"数据蓝 + monospace + 直角"——理性、报表感
 *   - industry-observer 走"米暖 + 期号印章 + Stratechery 长读"——评论 newsletter
 *   - editorial-mook 走"米白 + 单字 CJK 附注 + 极小字号"——日系编辑刊的"慢读"气质
 *
 * 三条不可妥协决策：
 *   1. radius 全 0（"圆角即温柔，mook 的温度由色与字距承担，不由圆角"）
 *   2. 单一 accent 朱橙 #e85a3c —— primary = accent，无第二装饰色
 *   3. 多态附注用单字 CJK 标签而非缩写词——编集メモ的母语形态
 *
 * 复用纪律：
 *   - 容器尽量复用 base / data-brief 包（masthead / toc / qa-block / footnotes /
 *     cta-bar / qr-follow / editor-note / colophon）
 *   - 仅新增一个 admonition variant `mook-tag`（CJK 单字标签），不新增任何 styled 容器
 *   - blockquote 用 __reset 表达"裸 1px 左竖线 + 60px 缩进 + 18px 大字"的 pull-quote
 *   - 列表（ul / ol）取消默认 marker，作者自行写 ❶❷❸ / — 等装饰字符
 *
 * 命名：刻意避开"日式 / japanese"字眼，用"编辑刊"承袭 mook 作为出版品类的中文称谓
 *       （POPEYE / BRUTUS 在中文语境是"编辑型 mook 季刊"）。
 */

import type { PersonaSpec } from '../_shared/spec'

export const spec: PersonaSpec = {
  id: 'editorial-mook',
  name: '编辑刊',
  description: '米白底 + 朱橙单点缀 + 极小字号 · POPEYE / BRUTUS 系慢读编辑刊',
  audience: '慢读 newsletter / 文化随笔季刊 / 编辑型 mook 刊物',

  // ============================================================
  // 色板（来源：docs/themes-specs/themes/04-japanese-mook.html :root tokens）
  // ============================================================
  palette: {
    primary: '#e85a3c', // POPEYE 朱橙——本主题唯一 accent，全篇稀缺
    secondary: '#2d3a4a', // 深蓝灰，与 text 同族，承担"次级强调"如标题边线
    accent: '#e85a3c', // = primary（mook 视觉里只跑一支 accent）
    bg: '#faf6ef', // 米白底
    bgSoft: '#f0ebe0', // 信息卡底（米卡纸感）
    bgMuted: '#e8e2d4', // 外层衬底（设计稿 body 背景）
    text: '#2d3a4a', // 深蓝灰文字
    textMuted: '#6b7885', // 灰蓝辅助
    textInverse: '#faf6ef', // 反白（用米白替代 #fff——SVG→PNG 时不会透明化）
    border: '#c7bfb0', // 点线分隔
    code: '#e85a3c', // inline code 字色 = accent（mook 里 code 极稀缺）
  },

  // 语义四色（multi-callout 设计稿四态色）
  //
  // 注意：四态 soft 全部使用 #f0ebe0（米卡纸）——mook 设计稿的 multi-callout
  // 视觉签名是"统一米底 + 仅左条与单字标签换色"，不走传统四色 soft 浅底族谱。
  status: {
    tip: { accent: '#6b9a5a', soft: '#f0ebe0' }, // 参（参考）—— 苔绿
    info: { accent: '#4a7fa8', soft: '#f0ebe0' }, // 編（编辑注解）—— 砚蓝
    warning: { accent: '#d4a03a', soft: '#f0ebe0' }, // 注（轻度提醒）—— 古土黄
    danger: { accent: '#e85a3c', soft: '#f0ebe0' }, // 禁（明确禁忌）—— 朱橙（= primary）
  },

  // ============================================================
  // 字号 / 间距 / 圆角
  //   - base 13/2.0 是 mook 的标志性"小字宽行距"组合
  //   - section 48 让 H2 之间有充足"余白"
  //   - radius 全 0
  // ============================================================
  typography: {
    baseSize: 13,
    lineHeight: 2.0,
    h1Size: 22, // 公众号原生标题约 22px，本主题不输出 H1
    h2Size: 14, // 节标题极小（"章序在上"的层级把视觉位让给 kicker 装饰）
    h3Size: 11, // 子标题更小，accent 色担纲（i. ii. iii. lowercase roman 由作者手写）
    letterSpacing: 0.3,
  },
  spacing: {
    paragraph: 22,
    section: 48, // h2 上方的"大块呼吸"
    listItem: 6,
    containerPadding: 20,
  },
  radius: { sm: 0, md: 0, lg: 0 }, // 直角硬边——半径 ≥ 1 即破

  // ============================================================
  // Decorations：自动给 h2 / h3 加章节编号前缀。
  //
  //   - level 2 → circled + display:'block' + suffix:'  第{cn}章'
  //     ❶❷❸ 圆圈数字 + 中文章号,作为 10px accent kicker **自成一行**,
  //     标题文字换行落于下一行。这是 mook / POPEYE 系刊物的"❶  第一章 / 章节标题"
  //     两行节标题签名（对位 docs/themes-specs/themes/04-japanese-mook.html 设计稿）。
  //   - level 3 → circled + display:'inline'（默认）,作为 11px accent 行首小字,
  //     与标题文字同行;给小节加可识别的"次级序号"信号但不抢 h2 的视觉位。
  //
  // 设计 trade-off：本主题刻意保持"作者写正文，编号由系统加"——避免作者手抄编号
  // 与正文之间漂移；圆圈数字 1–20 覆盖 99% mook 期刊章节体量,>20 退化为 (N)。
  // ============================================================
  decorations: {
    headingPrefix: [
      {
        level: 2,
        autoNumber: 'circled',
        style: {
          color: 'accent',
          display: 'block',
          marginBottom: 6,
          suffix: '  第{cn}章',
          fontWeight: 500,
          fontSize: 10,
          letterSpacing: 2,
        },
      },
      {
        level: 3,
        autoNumber: 'circled',
        style: {
          color: 'accent',
          fontWeight: 600,
          fontSize: 11,
          letterSpacing: 1,
          marginRight: 8,
        },
      },
    ],
  },

  // Motifs：极简——本主题章节序号靠 decorations.headingPrefix autoNumber，
  // pull-quote 用裸 blockquote + 左 1px 细线，故意不声明 h2Prefix / quoteMark /
  // sectionCorner（pipeline 检测到 theme.assets.h2Prefix 会自动注入 SVG）。
  motifs: {
    // dividerFlower · ❋ 单字符（divider variant=glyph 时通过 attrs.glyph 覆盖；
    //   不通过 motif 暴露字符，保留 motif 仅为缩略图兼容）
    dividerFlower: {
      viewBox: [0, 0, 240, 16],
      width: 220,
      height: 16,
      primitives: [
        { type: 'line', x1: 0, y1: 8, x2: 100, y2: 8, stroke: '#2d3a4a', strokeWidth: 1 },
        {
          type: 'text',
          x: 120,
          y: 13,
          content: '❋', // ❋ heavy eight teardrop-spoked asterisk
          fontSize: 14,
          fill: '#e85a3c',
          textAnchor: 'middle',
        },
        { type: 'line', x1: 140, y1: 8, x2: 240, y2: 8, stroke: '#2d3a4a', strokeWidth: 1 },
      ],
    },

    // dividerWave · 退化为单根细线（mook 不接受波浪）
    dividerWave: {
      viewBox: [0, 0, 240, 2],
      width: 220,
      height: 2,
      primitives: [
        { type: 'line', x1: 0, y1: 1, x2: 240, y2: 1, stroke: '#c7bfb0', strokeWidth: 1 },
      ],
    },

    // dividerDots · 三朱橙小方块（应急 fallback）
    dividerDots: {
      viewBox: [0, 0, 240, 8],
      width: 220,
      height: 8,
      primitives: [
        { type: 'rect', x: 108, y: 2, w: 4, h: 4, fill: '#e85a3c' },
        { type: 'rect', x: 118, y: 2, w: 4, h: 4, fill: '#e85a3c' },
        { type: 'rect', x: 128, y: 2, w: 4, h: 4, fill: '#e85a3c' },
      ],
    },

    // 四态图标——mook 的"参/編/注/禁"语义由 admonition mook-tag variant 的
    //   svgSlot CJK 字 inline 承担；这里的 icon 仅在主题切到非 mook-tag variant
    //   时作 fallback。直角小方块呼应 radius=0 纪律。
    tipIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [{ type: 'rect', x: 3, y: 3, w: 8, h: 8, fill: '#6b9a5a' }],
    },
    infoIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [{ type: 'rect', x: 3, y: 3, w: 8, h: 8, fill: '#4a7fa8' }],
    },
    warningIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [{ type: 'rect', x: 3, y: 3, w: 8, h: 8, fill: '#d4a03a' }],
    },
    dangerIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [{ type: 'rect', x: 3, y: 3, w: 8, h: 8, fill: '#e85a3c' }],
    },

    // stepBadge · 编号方块（与 radius=0 一致）
    stepBadge: {
      viewBox: [0, 0, 22, 22],
      width: 22,
      height: 22,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 8 },
      placeholders: ['N'],
      primitives: [
        { type: 'rect', x: 0, y: 0, w: 22, h: 22, fill: '#e85a3c' },
        {
          type: 'text',
          x: 11,
          y: 16,
          content: '{N}',
          fontSize: 14,
          fontWeight: 700,
          fill: '#faf6ef',
          textAnchor: 'middle',
        },
      ],
    },
  },

  // ============================================================
  // 骨架变体：mook-tag 是核心签名；其余取克制 / 文学倾向的 variant
  // ============================================================
  variants: {
    admonition: 'mook-tag', // 本主题签名——参/編/注/禁 単字 CJK 标签
    quote: 'classic', // 元素级 blockquote 承担"裸 1px 左竖线"pull-quote；
    //                          quote-card 仅作 fallback，走 classic 不主推
    compare: 'column-card',
    steps: 'number-circle',
    divider: 'glyph', // 默认 ❦；作者写 attrs.glyph="❋"/"章末" 切换
    sectionTitle: 'bordered',
    codeBlock: 'bare', // 元素级 pre 直接走主题 voice（米卡纸底）
    note: 'minimal-callout', // 中性补注极简骨架，与 mook 的"克制"统一
  },

  // ============================================================
  // 签名容器：复用 data-brief 包 + 跨主题通用 abstract
  // ============================================================
  signatureContainers: [
    'abstract', // 文首 tl;dr / 导语
    'masthead', // 刊头（slow reading / issue 04）
    'toc', // 目录（圈号 + 标题 + 页码）
    'qaBlock', // 读者问答
    'footnotes', // 脚注
    'ctaBar', // CTA 三栏（喜欢 / 收藏 / 分享）
    'qrFollow', // 二维码订阅
    'editorNote', // 编辑手记单色块（callout #15）
    'colophon', // 下期预告
  ],

  // ============================================================
  // 元素样式
  // ============================================================
  elements: {
    // H1：公众号原生头部已渲文章标题，本主题不主推自渲 H1，
    //   仅保留极简兜底（中等粗细 + 微大字距）
    h1: {
      'font-size': '22px',
      'font-weight': '500',
      color: '#2d3a4a',
      'margin-top': '0',
      'margin-bottom': '14px',
      'line-height': '1.5',
      'letter-spacing': '0.2px',
    },
    // H2：14px 600 + 极宽 section 上边距 + 无 border-bottom（mook 不画通栏线）
    //   编号前缀 "01 / 02 / 03" 由 decorations.headingPrefix 自动注入
    h2: {
      __reset: true,
      'font-size': '14px',
      'font-weight': '600',
      color: '#2d3a4a',
      'margin-top': '48px',
      'margin-bottom': '20px',
      'line-height': '1.6',
      'letter-spacing': '0.2px',
      'padding-bottom': '0',
      'border-bottom': 'none',
    },
    // H3：11px 600 accent + 紧字距——子标题完全交给主色担纲
    //   编号前缀 "❶/❷/❸…" 由 decorations.headingPrefix circled inline 注入,
    //   与 H2 的 block kicker 形成"块 / 行"两档视觉层级
    h3: {
      __reset: true,
      'font-size': '11px',
      'font-weight': '600',
      color: '#e85a3c',
      'margin-top': '20px',
      'margin-bottom': '8px',
      'line-height': '1.6',
      'letter-spacing': '1px',
    },
    h4: {
      'font-size': '12px',
      'font-weight': '600',
      color: '#2d3a4a',
      'margin-top': '14px',
      'margin-bottom': '6px',
      'line-height': '1.5',
    },
    // 正文：13/2.0 是 mook 的灵魂——小字 + 宽行距，让阅读慢下来
    p: {
      'font-size': '13px',
      'line-height': '2.0',
      color: '#2d3a4a',
      'margin-top': '0',
      'margin-bottom': '22px',
      'letter-spacing': '0.3px',
    },
    // Pull-quote · 设计稿原型：左 1px text 色细竖线 + 60px 缩进 + 18px 大字 +
    //                         300 字重 + attribution 第二段 10px muted
    //   作者写：> "凡我所是，皆因我读。"
    //          >
    //          > —— 博尔赫斯
    blockquote: {
      __reset: true,
      'border-left': '1px solid #2d3a4a',
      'background-color': 'transparent',
      color: '#2d3a4a',
      padding: '0 0 0 60px',
      margin: '40px 0',
      'font-size': '18px',
      'font-weight': '500',
      'line-height': '1.7',
      'letter-spacing': '0.2px',
      'border-radius': '0',
    },
    // 列表 · 设计稿用 ❶❷❸ / — 等装饰前缀；本主题取消默认 marker，
    //   作者在每条 item 前手写圈号 / 破折号，让前缀色与 inline 文本贴合
    //   （CSS::marker 在公众号粘贴层不稳，inline 字符是稳定路径）
    ul: {
      'list-style': 'none',
      'padding-left': '0',
      'margin-top': '0',
      'margin-bottom': '22px',
    },
    ol: {
      'list-style': 'none',
      'padding-left': '0',
      'margin-top': '0',
      'margin-bottom': '22px',
    },
    li: {
      'font-size': '13px',
      'line-height': '1.9',
      color: '#2d3a4a',
      'margin-bottom': '6px',
      'letter-spacing': '0.3px',
    },
    // strong/em 仍走主色（mook 鼓励 inline 强调，不用 highlight 荧光）
    strong: { 'font-weight': '700', color: '#e85a3c' },
    em: { 'font-style': 'italic', color: '#2d3a4a' },
    // 链接：accent + 下方 1px 实线 underline（设计稿原型）
    a: {
      color: '#e85a3c',
      'text-decoration': 'none',
      'border-bottom': '1px solid #e85a3c',
    },
    // hr · mook 取细 0.5px 但公众号最小渲染 1px——退化为 1px
    hr: {
      border: 'none',
      height: '1px',
      'background-color': '#2d3a4a',
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
      'border-radius': '0',
    },
    // 代码块 · 米卡纸底 + 11px monospace（设计稿原型）
    pre: {
      __reset: true,
      'background-color': '#f0ebe0',
      color: '#2d3a4a',
      padding: '14px 16px',
      margin: '22px 0',
      'border-radius': '0',
      'overflow-x': 'auto',
      'white-space': 'pre',
      'max-width': '100%',
      'box-sizing': 'border-box',
      'box-shadow': 'inset -14px 0 10px -10px rgba(45,58,74,0.18)',
      'font-size': '11px',
      'line-height': '1.9',
    },
    // 行内 code · 朱橙字 + 米卡纸底 + 11px（设计稿 inline-code 原型）
    code: {
      'background-color': '#f0ebe0',
      color: '#e85a3c',
      padding: '1px 4px',
      'border-radius': '0',
      'font-size': '11px',
    },
    table: {
      'border-collapse': 'collapse',
      width: '100%',
      'margin-top': '0',
      'margin-bottom': '22px',
      'font-size': '12px',
    },
  },

  // ============================================================
  // 内联强调
  // ============================================================
  inline: {
    // mook 不走荧光底——highlight 退化为 bgSoft 米卡纸 + 朱橙字
    highlight: {
      'background-color': '#f0ebe0',
      color: '#e85a3c',
      padding: '0 4px',
      'border-radius': '0',
    },
    wavy: {
      'text-decoration': 'underline wavy',
      'text-decoration-color': '#e85a3c',
      'text-underline-offset': '3px',
    },
    emphasis: {
      color: '#e85a3c',
      'font-weight': '600',
    },
  },

  // ============================================================
  // 容器视觉
  // ============================================================
  containers: {
    // intro · 导语段右留白（设计稿 padding-right:40px）
    intro: {
      __reset: true,
      'background-color': 'transparent',
      'border-radius': '0',
      padding: '0 40px 0 0',
      margin: '0 0 48px 0',
      'font-size': '14px',
      'line-height': '2.0',
      color: '#2d3a4a',
      'letter-spacing': '0.3px',
    },
    // author · byline · 灰蓝小字横排
    author: {
      __reset: true,
      'background-color': 'transparent',
      padding: '0',
      margin: '0 0 36px 0',
      'font-size': '10px',
      color: '#6b7885',
      'letter-spacing': '0.3px',
    },
    cover: {
      margin: '0 0 36px 0',
    },
    // 四态：仅承载 margin；wrapperCSS 由 mook-tag variant 全权接管
    tip: {},
    warning: {},
    info: {},
    danger: {},
    // note · 中性补注（不抢色）
    note: {
      __reset: true,
      'background-color': 'transparent',
      padding: '10px 0 10px 16px',
      margin: '16px 0',
      'border-left': '1px solid #c7bfb0',
      'font-size': '12px',
      'line-height': '1.8',
      color: '#6b7885',
      'border-radius': '0',
    },
    // quote-card · 给 classic variant 一个克制底（实际正文倾向走裸 blockquote）
    quoteCard: {
      'background-color': '#f0ebe0',
      padding: '22px 24px',
      margin: '32px 0',
      'border-radius': '0',
    },
    highlight: {
      'background-color': '#f0ebe0',
      padding: '14px 16px',
      margin: '22px 0',
      'border-radius': '0',
      border: 'none',
    },
    compare: { margin: '22px 0' },
    steps: { margin: '22px 0' },
    sectionTitle: {
      __reset: true,
      margin: '48px 0 20px',
      'padding-bottom': '6px',
      'border-bottom': '1px solid #2d3a4a',
    },
    // footer-cta · 不走"营销按钮"路径，给最小化背景兜底
    //   （本主题主推 colophon 当作"下期预告"承载，参见 templates.footerCTA）
    footerCTA: {
      __reset: true,
      margin: '36px 0',
      padding: '16px 0',
      'background-color': 'transparent',
      'border-top': '1px solid #2d3a4a',
      'border-bottom': '1px solid #2d3a4a',
      'border-radius': '0',
      'text-align': 'left', // 覆盖 renderer 的 center 默认
    },
    recommend: {
      margin: '24px 0',
      padding: '14px 0',
      'background-color': 'transparent',
      'border-top': '1px solid #c7bfb0',
      'border-radius': '0',
    },
    qrcode: {
      margin: '24px 0',
      padding: '14px',
      'background-color': 'transparent',
      border: '1px solid #2d3a4a',
      'border-radius': '0',
    },
    abstract: {
      __reset: true,
      'background-color': 'transparent',
      'border-left': '1px solid #2d3a4a',
      padding: '4px 0 4px 16px',
      margin: '0 0 32px 0',
      'border-radius': '0',
    },
    keyNumber: {
      margin: '22px 0',
      padding: '16px 18px',
      'background-color': '#f0ebe0',
      'border-top': '2px solid #e85a3c',
      'border-radius': '0',
    },
    seeAlso: {
      margin: '24px 0',
      padding: '14px 16px',
      'background-color': 'transparent',
      'border-left': '1px solid #c7bfb0',
      'border-radius': '0',
    },

    // ── data-brief 家族签名容器（设计稿对位） ──────────────────
    // masthead · 设计稿"slow reading" + "issue 04" 双栏
    //   note: renderer 内 nameCSS / metaCSS 是硬编码（data-brief 视觉契约），本主题
    //   只能在 wrapper 层调整 padding / border / margin / 字距，name 与 meta 的字号
    //   会维持 data-brief 13px/11px——视觉接近但不完全等同于设计稿 10px。
    masthead: {
      __reset: true,
      margin: '0 0 36px 0',
      'padding-bottom': '0',
      'border-bottom': 'none',
      'letter-spacing': '0.2px',
    },
    sectionTag: { margin: '0 0 14px 0' },
    // toc · 米白底无 bg，仅靠 kicker + 序号 + 页码三栏 grid（renderer 强制）
    toc: {
      __reset: true,
      'background-color': 'transparent',
      padding: '0',
      margin: '0 0 40px 0',
      'border-radius': '0',
    },
    kpiDashboard: {
      'background-color': '#f0ebe0',
      'border-top': '1px solid #2d3a4a',
      'border-bottom': '1px solid #2d3a4a',
      padding: '18px 16px 16px',
      margin: '0 0 28px 0',
      'border-radius': '0',
    },
    barChart: {
      'background-color': '#f0ebe0',
      border: '1px solid #c7bfb0',
      padding: '16px 14px',
      margin: '22px 0',
      'border-radius': '0',
    },
    // qa-block · 设计稿原型：无 border 横线，仅 kicker + 单行 Q / 单行 A
    //   renderer 自带 Q/A 22×22 方块徽章，与本主题"直角"语言一致
    qaBlock: {
      __reset: true,
      'background-color': 'transparent',
      'border-top': 'none',
      'border-bottom': 'none',
      padding: '0',
      margin: '40px 0',
      'border-radius': '0',
    },
    footnotes: {
      __reset: true,
      'border-top': '1px solid #2d3a4a',
      'padding-top': '10px',
      margin: '24px 0',
      'font-size': '10px',
      'line-height': '1.8',
      color: '#6b7885',
      'letter-spacing': '0.2px',
    },
    ctaBar: { margin: '30px 0' },
    // qr-follow · 1px text 色实线包裹（设计稿原型，非常克制）
    qrFollow: {
      __reset: true,
      margin: '30px 0',
      padding: '14px',
      'background-color': 'transparent',
      'border-left': 'none',
      border: '1px solid #2d3a4a',
      'border-radius': '0',
    },
    // editor-note · 设计稿"编辑手记"单色块（米卡纸底 + accent kicker + 正文）
    editorNote: {
      __reset: true,
      'background-color': '#f0ebe0',
      'border-left': 'none',
      padding: '20px',
      margin: '36px 0',
      'border-radius': '0',
    },
    methodology: {
      __reset: true,
      'background-color': '#f0ebe0',
      border: 'none',
      padding: '10px 12px',
      margin: '16px 0',
      'font-size': '10px',
      'line-height': '1.7',
      color: '#6b7885',
      'border-radius': '0',
    },
    // colophon · 下期预告（设计稿 footer #23）
    //   renderer 走"上边线 + 双栏 monospace"；本主题用 next 单独一栏，
    //   issue 可留空让右栏空 kicker 也无妨——视觉与设计稿"上下边线 + accent kicker"接近
    colophon: {
      __reset: true,
      'border-top': '1px solid #2d3a4a',
      'border-bottom': '1px solid #2d3a4a',
      'margin-top': '36px',
      'padding-top': '16px',
      'padding-bottom': '16px',
      'border-radius': '0',
    },
  },

  // ============================================================
  // 模板片段（commonTemplates 隐式合并，本处仅覆盖需要 mook voice 的项）
  // ============================================================
  templates: {
    cover: `::: masthead slow reading issue="04" date="2026.04.22"
:::

::: section-tag
特集 · 关于阅读
:::

# 在无人深夜，重新学习如何阅读一本书
`,
    authorBar: `::: author
沈听雨 · 2026.04.22
:::
`,
    // 下期预告 · 走 colophon（mook 不走"营销按钮"footer）
    footerCTA: `::: colophon next="纸本之必要：论书脊与手指的记忆" issue="第 05 期 · 2026"
:::
`,
    tip: `::: tip variant=mook-tag
配溫水一盞。茶易醒腦，咖啡斷連續。
:::
`,
  },

  meta: {
    createdAt: '2026-05-14',
    ownerNotes:
      '编辑刊 · 米白 + 朱橙 + 极小字号 · POPEYE / BRUTUS 系慢读 mook。' +
      '三条不可妥协：radius=0、primary=accent=#e85a3c 单 accent、四态附注用单字 CJK 标签（mook-tag variant）。' +
      '复用 data-brief 包容器（masthead / toc / qa-block / footnotes / cta-bar / qr-follow / editor-note / colophon）+ ' +
      '新增 admonition variant `mook-tag` 承载"参/編/注/禁"四态。' +
      '章节自动编号 "01 / 02 / 03 + I / II / III" 由 decorations.headingPrefix 注入，作者写 `## 章节名` / `### 子标题`。',
  },
}

export default spec
