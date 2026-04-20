/**
 * tech-geek · 极客夜行
 *
 * 定位（规范 §0）：**工程师写作**，不是"程序员皮肤"。参照 Plan 9 的 manpage、
 * Phrack 的 ASCII zine 骨架、ACM Queue 的白皮字距、Fabien Sanglard 暗底复古印刷、
 * Knuth 的 TAOCP 章节号与脚注。气质关键词：**成年、克制、琥珀、脚注**。
 *
 * 落地四根红线（规范 §4）：
 *   1. primary = #d4a65a VT220 琥珀（**不再是** #4ec9b0 VSCode 青绿）—— 彻底脱离 IDE 皮肤污名
 *   2. 四态 admonition 靠**注释前缀 + 边框样式 + 图标形状**四重冗余区分，不靠色差：
 *      tip=dashed-border / warning=accent-bar / info=double-border / danger=top-bottom-rule
 *   3. 删除 dividerFlower 频谱条 & 原 sectionCorner 窗口装饰，motif 语汇从
 *      "VSCode 装饰"迁到"manpage 印刷"（§ / ¶ / ⁂ / `[n]`）
 *   4. 深底字重纪律：正文 500（非 400 —— 深底光晕效应会让 400 发虚），
 *      强调 600，严禁 700/800 在大字号主色位（会变"塑料硬边"霓虹招牌）
 *
 * 拒绝坐标（规范 §3）：
 *   - 拒绝 VSCode / Dracula / One Dark / Monokai 的青绿紫粉复刻
 *   - 拒绝 Tron 霓虹蓝紫渐变、纯黑 #000 底、纯白 #fff 字
 *   - 拒绝 🚀💻⚡ 码农 emoji、小红书"程序员必备配色"荧光绿
 *   - 拒绝 CRT scanline / glitch art / neon glow —— 怀旧当气质是偷懒
 *   - 拒绝"红黄警报灯四色" admonition —— 语义压进琥珀家族
 */

import { buildTheme } from '../_shared/buildTheme'
import type { ThemeTokens } from '../types'
import { techGeekAssets } from './assets'
import { commonTemplates } from '../_shared/defaultTemplates'

// ============================================================
// Tokens（规范 §1.1 · VT220 琥珀方向）
// ============================================================

const tokens: ThemeTokens = {
  colors: {
    // 规范 §1.1 核心改动：primary 从 #4ec9b0（VSCode 青绿）改到 #d4a65a（VT220 琥珀）
    //   这一步把主题从"VSCode 夜间"搬到"终端磷屏"
    primary: '#d4a65a',
    // 规范 §1.1：旧铜灰 —— 辅色降格为"年代灰"，给 divider / border / 脚注号
    secondary: '#8a7a54',
    // 规范 §1.1：HN 橙（#ff6600 略压饱和版）—— 点睛色，只出现在脚注号
    accent: '#e06a28',
    // 规范 §1.1：墨炭底 —— 暖黑而非蓝黑（VSCode），像旧 CRT 的背光漏出
    bg: '#14110d',
    // 规范 §1.1：炉火暗 —— 与 bg 差 4-5% 明度
    bgSoft: '#1e1a14',
    // 规范 §1.1：旧纸炭 —— inline code 底、compare 表头底
    bgMuted: '#2a241c',
    // 规范 §1.1 关键改动：羊皮黄（VT220 amber phosphor 底色）—— 脱离冷灰白
    //   对比度 9.1:1 远超 AA；规避 #fff 透明化
    text: '#e6d9c2',
    // 规范 §1.1：雾色批注 —— 暖灰家族，和正文同族
    textMuted: '#8c8272',
    // 反白位 = bg（深底反白就是深底）
    textInverse: '#14110d',
    // 边栏线：暖深棕灰 —— 比 bg 深 8%
    border: '#3a3228',
    // 规范 §1.1 签名动作：code = primary = VT220 琥珀
    //   正文里的 inline code 与正文同家族，只靠字距与底色微差区分
    code: '#d4a65a',
    // 规范 §1.1 四态纪律：**全部压进琥珀家族 + 冷绿点缀 + 冷蓝点缀**
    //   严禁"纯红 + 纯黄 + 纯蓝 + 纯绿"的彩虹四色
    //   对比度基于 #14110d 墨炭底：WebAIM WCAG 公式
    //   warning = primary 是 feature：工程写作 warning 最常见，让它 = 主色形成节奏
    status: {
      tip: { accent: '#a8c08a', soft: '#1e1f16' }, // NOTE 灰绿（9.4:1）
      warning: { accent: '#d4a65a', soft: '#1e1a14' }, // CAVEAT = primary（9.0:1）
      info: { accent: '#7a9cb8', soft: '#161b1f' }, // REF 冷蓝（7.6:1）
      danger: { accent: '#c85a3a', soft: '#1f1612' }, // PITFALL 陶土红（6.3:1）
    },
  },
  typography: {
    // 规范 §1.2：正文 15 / 500 / 字距 0.6 / 行高 1.85
    baseSize: 15,
    // 规范 §1.2：行高 1.85 —— 工程写作的甜点（比财经密，比人文疏）
    lineHeight: 1.85,
    // 规范 §1.2：h1 25 / 600 / 字距 2px —— 稀比粗贵
    h1Size: 25,
    // 规范 §1.2：h2 19（从 20 降 1px，更贴正文节律）
    h2Size: 19,
    // 规范 §1.2：h3 16 与正文同号，纯靠字重 + 字距区分
    h3Size: 16,
    // 规范 §1.2 签名：字距是等宽美学的灵魂（不能写 font-family）
    //   正文 0.6px；`.code` 0.8-1.2px 自动浮现等宽感
    letterSpacing: 0.6,
  },
  spacing: { paragraph: 18, section: 28, listItem: 8, containerPadding: 16 },
  // 规范 §3：radius 保留轻圆角，不做直角硬核也不做大圆卡片
  radius: { sm: 2, md: 4, lg: 6 },
}

// ============================================================
// Theme
// ============================================================

export const techGeekTheme = buildTheme({
  id: 'tech-geek',
  name: '极客夜行',
  description: 'VT220 琥珀 + 墨炭暖底 + manpage 印刷传统，成年工程师的工程写作',
  tokens,
  assets: techGeekAssets({
    primary: tokens.colors.primary,
    accent: tokens.colors.accent,
    border: tokens.colors.border,
    textMuted: tokens.colors.textMuted,
    tipAccent: tokens.colors.status.tip.accent,
    warningAccent: tokens.colors.status.warning.accent,
    infoAccent: tokens.colors.status.info.accent,
    dangerAccent: tokens.colors.status.danger.accent,
  }),

  // ============================================================
  // 元素级样式（规范 §1.2 typographic voice）
  // ============================================================
  elementOverrides: {
    // 规范 §1.2：h1 25 / 600 / 2px / 1.4 —— 深底大标题不上 700（会硬）
    h1: {
      'font-size': '25px',
      'font-weight': '600',
      color: tokens.colors.text,
      'margin-top': '28px',
      'margin-bottom': '16px',
      'line-height': '1.4',
      'letter-spacing': '2px',
    },
    // 规范 §1.2 / §2.4：h2 19 / 600 / 1.5px / 1.5 + h2Prefix SVG 注入 § 前缀
    //   下方 1px **虚线**（非实心主色线）—— 博客风→工程写作风
    h2: {
      'font-size': '19px',
      'font-weight': '600',
      color: tokens.colors.text,
      'margin-top': '30px',
      'margin-bottom': '14px',
      'line-height': '1.5',
      'letter-spacing': '1.5px',
      'padding-bottom': '6px',
      'border-bottom': `1px dashed ${tokens.colors.border}`,
    },
    // 规范 §1.2：h3 16 / 600 / 1px / 1.6 —— 与正文同号靠字距区分
    h3: {
      'font-size': '16px',
      'font-weight': '600',
      color: tokens.colors.text,
      'margin-top': '22px',
      'margin-bottom': '10px',
      'line-height': '1.6',
      'letter-spacing': '1px',
    },
    // h4：steps 条目标题
    h4: {
      'font-size': '15px',
      'font-weight': '600',
      color: tokens.colors.text,
      'margin-top': '18px',
      'margin-bottom': '8px',
      'line-height': '1.55',
      'letter-spacing': '0.8px',
    },
    // 规范 §1.2 深底纪律：正文字重 **500**（非 400 —— 深底 400 会发虚）
    //   行高 1.85 是工程写作的甜点；字距 0.6px 撑出 manpage 骨架
    p: {
      'font-size': '15px',
      'font-weight': '500',
      'line-height': '1.85',
      color: tokens.colors.text,
      'margin-top': '0',
      'margin-bottom': '18px',
      'letter-spacing': '0.6px',
    },
    // 规范 §2.5 quote（裸 blockquote）：pull-quote 气质 —— 左 1px border 竖线 + 无底色
    blockquote: {
      'border-left': `1px solid ${tokens.colors.border}`,
      'border-right': 'none',
      'background-color': 'transparent',
      color: tokens.colors.textMuted,
      'padding-top': '6px',
      'padding-right': '0',
      'padding-bottom': '6px',
      'padding-left': '18px',
      'margin-top': '0',
      'margin-bottom': '18px',
      'border-radius': '0',
      'font-style': 'normal',
      'letter-spacing': '0.6px',
    },
    ul: { 'padding-left': '24px', 'margin-top': '0', 'margin-bottom': '18px' },
    ol: { 'padding-left': '24px', 'margin-top': '0', 'margin-bottom': '18px' },
    li: {
      'margin-bottom': '8px',
      'font-weight': '500',
      'line-height': '1.85',
      color: tokens.colors.text,
      'letter-spacing': '0.6px',
    },
    // 规范 §1.2：strong 字重 **600**（非 800 —— 深底大字号 + 700/800 = 塑料霓虹招牌）
    strong: { 'font-weight': '600', color: tokens.colors.primary },
    // 规范 §1.2：禁 italic（公众号字体栈不稳），em 走 primary 色 + 正体
    //   此处保留 italic 作保底（微信默认字体若支持就走斜体，不支持 fallback）
    em: { 'font-style': 'italic', color: tokens.colors.primary },
    // 链接走 accent HN 橙 + 下划线
    a: {
      color: tokens.colors.accent,
      'text-decoration': 'underline',
      'text-underline-offset': '3px',
    },
    hr: {
      border: 'none',
      height: '1px',
      'background-color': tokens.colors.border,
      'margin-top': '24px',
      'margin-bottom': '24px',
    },
    // 图片：轻圆角 —— tech-geek 深底上图片常是 diagram / screenshot
    img: {
      'max-width': '100%',
      display: 'block',
      'margin-top': '12px',
      'margin-right': 'auto',
      'margin-bottom': '12px',
      'margin-left': 'auto',
      'border-radius': '4px',
    },
  },

  // ============================================================
  // 代码块（规范 §1.3 非割裂设计 —— code 与正文同色系）
  // ============================================================
  pre: {
    // 规范 §1.3：底色 bgSoft（与正文底差 5%）、不加 border-left
    //   "代码感"由字距 + 注释 § / $ / >>> 前缀提供，而非色彩边框
    'background-color': tokens.colors.bgSoft,
    color: tokens.colors.text,
    'padding-top': '14px',
    'padding-right': '16px',
    'padding-bottom': '14px',
    'padding-left': '16px',
    'border-radius': '4px',
    'overflow-x': 'auto',
    'white-space': 'pre',
    'max-width': '100%',
    'box-sizing': 'border-box',
    // 右侧内阴影轻一档（深底本身明度低，过深内阴影会变黑窟窿）
    'box-shadow': 'inset -14px 0 10px -10px rgba(0,0,0,0.35)',
    'margin-top': '0',
    'margin-bottom': '20px',
    // 规范 §1.3：代码块 13px（比正文略小，暗示"更密的信息区"）、字重 500、行高 1.7
    'font-size': '13px',
    'font-weight': '500',
    'line-height': '1.7',
    'letter-spacing': '0.4px',
  },
  // 规范 §1.2 签名：inline code 字号 = 正文 15、字重 = 500、行高 = 1.85
  //   只靠 letter-spacing +0.2px 和 primary 琥珀色与正文区分
  //   padding 收到 1px 5px —— 更薄，像铅字嵌入
  code: {
    'background-color': tokens.colors.bgMuted,
    color: tokens.colors.code, // = primary VT220 琥珀
    padding: '1px 5px',
    'border-radius': '2px',
    'font-size': '15px',
    'font-weight': '500',
    'letter-spacing': '0.8px',
  },

  // ============================================================
  // Inline 强调（规范 §1.2 · §3.7 highlight 纪律）
  // ============================================================
  inlineOverrides: {
    // highlight 不走 accent 荧光（深底 + 荧光 = 警报灯）；走 warning.soft 近底色
    //   字色保持 text —— highlight 是"标记"不是"涂鸦"
    highlight: {
      'background-color': tokens.colors.bgMuted,
      color: tokens.colors.primary,
      padding: '0 4px',
      'border-radius': '2px',
      'font-weight': '600',
    },
    wavy: {
      'text-decoration': 'underline wavy',
      'text-decoration-color': tokens.colors.accent,
      'text-underline-offset': '3px',
    },
    // 关键词强调：primary + 600 —— 与 strong 同档
    emphasis: {
      color: tokens.colors.primary,
      'font-weight': '600',
    },
  },

  // ============================================================
  // 容器视觉（规范 §2 的 19 个 container 工程写作语汇）
  // ============================================================
  containerOverrides: {
    // 规范 §2.1 intro = Abstract（学术论文开头）：上下各一根 1px border 实线
    //   左右无边框 + textMuted + 透明底 —— 和正文贯通
    intro: {
      'background-color': 'transparent',
      'border-top': `1px solid ${tokens.colors.border}`,
      'border-bottom': `1px solid ${tokens.colors.border}`,
      'border-radius': '0',
      padding: '16px 0',
      margin: '0 0 24px 0',
      color: tokens.colors.textMuted,
      'font-size': '14px',
      'letter-spacing': '0.5px',
    },
    // 规范 §2.2 author = Colophon（版权页/署名）：无底色 + 13px textMuted + 居左
    author: {
      display: 'inline-block',
      'background-color': 'transparent',
      border: 'none',
      'border-radius': '0',
      padding: '2px 0',
      margin: '0 0 20px 0',
      color: tokens.colors.textMuted,
      'font-size': '13px',
      'letter-spacing': '0.6px',
    },
    // 规范 §2.3 cover = Title Block：margin + 图片圆角由 elementOverrides.img 接管
    cover: {
      margin: '0 0 28px 0',
    },
    // admonition 四态 variant 接管（tip=dashed-border 签名）
    tip: {},
    warning: {},
    info: {},
    danger: {},
    // 规范 §2.6 quoteCard = Footnote Card：bgSoft 底 + 无边框 + padding 18
    //   字距拉到 0.8px —— 脚注区比正文更"排版感"
    quoteCard: {
      'background-color': tokens.colors.bgSoft,
      padding: '18px 20px',
      margin: '24px 0',
      'border-radius': '4px',
      'letter-spacing': '0.8px',
    },
    // 规范 §2.14 highlight = Key Number：bgSoft 底 + padding 18 20 + 无边框
    //   数字 .digit 28px 600 primary 由用户 markdown 手工包裹
    highlight: {
      'background-color': tokens.colors.bgSoft,
      padding: '18px 20px',
      margin: '20px 0',
      'border-radius': '4px',
    },
    // 规范 §2.15 compare = Trade-off：两栏靠字符 `+ PRO` / `- CON` 前缀 + 1px 竖线分隔
    //   column-card variant 接管；禁 git diff 红绿配色（CSS 层不涉及颜色）
    compare: { margin: '24px 0' },
    // 规范 §2.16 steps = Algorithm：方括号 `[n]` 脚注号 + 无连续竖线
    //   number-circle variant 配合 stepBadge `[n]` 方括号（非"圆圈"）
    steps: { margin: '24px 0' },
    // 规范 §2.4 sectionTitle = § Heading：cornered variant + sectionCorner `§` SVG
    //   下方虚线由 border-bottom 承担
    sectionTitle: {
      margin: '36px 0 16px',
      'padding-bottom': '6px',
    },
    // 规范 §2.7 footerCTA = See Also：顶部 1px border 实线 + 透明底 + 无圆角
    //   标签 `SEE ALSO` 由用户 markdown 手工写入（大写 + letter-spacing 2px）
    footerCTA: {
      margin: '32px 0 0 0',
      padding: '18px 0 4px 0',
      'background-color': 'transparent',
      'border-top': `1px solid ${tokens.colors.border}`,
      'border-radius': '0',
    },
    // 规范 §2.8 recommend = References：无底色 + padding 0
    //   列表靠 `[n]` 脚注号引出
    recommend: {
      margin: '24px 0',
      padding: '0',
      'background-color': 'transparent',
      'border-radius': '0',
    },
    // 规范 §2.9 qrcode = Address Block：signature block 风 —— 无边框
    qrcode: {
      margin: '24px auto',
      padding: '0',
      'background-color': 'transparent',
      'border-radius': '0',
    },
  },

  // ============================================================
  // 骨架变体（规范 §2）
  // ============================================================
  variants: {
    // 规范 §2.10 tip = `// NOTE`：dashed-border（左 2px 虚线 + soft 底，"附注性"）
    //   warning = `// CAVEAT`: accent-bar（左 3px 实线）靠 markdown `variant=` 覆盖
    //   info = `// REF`: double-border（左 4px 双线）靠 markdown `variant=` 覆盖
    //   danger = `// PITFALL`: top-bottom-rule（上下实线）靠 markdown `variant=` 覆盖
    //   四重冗余（前缀语 / 边框样式 / 边框位置 / 图标）打印黑白亦可辨
    admonition: 'dashed-border',
    // 规范 §2.5 quote = Pull Quote：frame-brackets（manpage 四角括号）
    quote: 'frame-brackets',
    // 规范 §2.15 compare = Trade-off：column-card（RFC alternatives，拒绝 ledger）
    compare: 'column-card',
    // 规范 §2.16 steps = Algorithm：number-circle（方括号脚注，stepBadge 自带 `[n]` SVG）
    //   拒绝 timeline-dot（是时间线）、ribbon-chain（是广告）
    steps: 'number-circle',
    // 规范 §2.17 divider = manpage-rule：走 wave variant 注入主题 dividerWave SVG
    //   dividerWave 已重做为 "§ ——— §" manpage 风 —— 彻底去扫描化
    divider: 'wave',
    // 规范 §2.4 sectionTitle = § Heading：cornered + sectionCorner `§` SVG
    sectionTitle: 'cornered',
    // 规范 §1.3 code：bare 不做 header-bar —— tech-geek 代码和正文同色系，无需"割裂"
    codeBlock: 'bare',
  },

  // ============================================================
  // Templates
  // ============================================================
  templates: {
    ...commonTemplates,
    // 规范 §2.3 cover = Title Block（无图版式，但支持图）
    cover: `::: cover 专题头 · Title
![封面占位](https://placehold.co/1200x630?text=tech-geek)

副标题：一行冷静的立意。工程随笔 Vol.01 · 2026
:::
`,
    // 规范 §2.2 author = Colophon（前缀 ¶ pilcrow 由模板手工写）
    authorBar: `::: author ¶ 某某 · 2026-04-20 · 阅读时长 12 分钟
:::
`,
    // 规范 §2.10 tip = `// NOTE` 签名
    tip: `::: tip // NOTE
这是一条工程附注。行内 \`code\` 与正文同色同族。
:::
`,
    // 规范 §2.7 footerCTA = SEE ALSO
    footerCTA: `::: footer-cta SEE ALSO
- 相关工程随笔 Vol.00（编者按）
- 本篇的数据与实验脚本
:::
`,
  },
})
