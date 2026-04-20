/**
 * business-finance · 硬核财经
 *
 * 定位（规范 §0）：**研究所内参**（FT 中文 / 财新周刊 / Bloomberg Terminal / HBR pull-quote）。
 * 不是券商研报 PPT，不是 A 股直播间。气质关键词：报告、数据、分栏、纪律。
 *
 * 落地五根红线（规范结语）：
 *   1. primary = #2a1a14 深栗墨（**不再是红** —— 旧值 #b1252b 与 danger 同色相撞色）
 *      红色彻底让给 danger 与 K 线"涨柱" —— 稀缺即贵气
 *   2. warning = #8a6416 琥珀（脱离红系，与 primary 色相拉开 60°+）
 *   3. 四态 admonition 靠**四种形状** 而非色差区分：
 *      tip=accent-bar / info=minimal-underline / warning=pill-tag / danger=ticket-notch
 *      中文分别为"要点 / 补注 / 风险提示 / 警报"，打印黑白亦可辨
 *   4. `<strong>` 字重 600（不是 800）—— 全页 800 = 没有重点
 *   5. 所有容器 radius ≤ 2（报告直角；radius ≥ 6 直接打回）
 *
 * 拒绝坐标（规范 §3）：
 *   - 拒绝 emoji 📈📉💰（任何表情）
 *   - 拒绝 `linear-gradient` / `box-shadow` glow / radius ≥ 6
 *   - 拒绝欧美"涨绿跌红" —— A 股红涨蓝跌纪律；compare 空方栏用 tip 钢青不用绿
 *   - 拒绝荧光黄 highlight —— inline highlight 降饱和到 warning.soft 米黄
 *   - 拒绝 h2 + h1 + strong 全线 800 字重
 */

import { buildTheme } from '../_shared/buildTheme'
import type { ThemeTokens } from '../types'
import { businessFinanceAssets } from './assets'
import { commonTemplates } from '../_shared/defaultTemplates'

// ============================================================
// Tokens（规范 §1.1 · B 版：深栗墨为主，红留给涨/险）
// ============================================================

const tokens: ThemeTokens = {
  colors: {
    // 规范 §1.1 关键改动：primary 从旧红 #b1252b 改到深栗墨
    //   这一步把红色彻底让给 danger 与 K 线涨柱，四语义色不再互抢
    primary: '#2a1a14',
    // 规范 §1.1：内参蓝（略降饱和，研究部权威感）
    secondary: '#0e3654',
    // 规范 §1.1：琥珀黄（降饱和避月饼盒金）—— 数字 .num 下划、同比箭头、stepBadge 底条
    accent: '#b8821f',
    // 规范 §1.1：纯白在 SVG 光栅会被微信转透明 —— 平台级纪律用 #fefefe
    bg: '#fefefe',
    // 规范 §1.1：FT 新闻纸米方向但收敛，不走粉走"旧纸米"
    bgSoft: '#f3f1ec',
    // 档案袋灰：bgSoft 深 6%，留给代码底、compare 表头
    bgMuted: '#e6e2d8',
    // 规范 §1.1：内参墨 —— 再压深一档，比所有装饰色都深
    text: '#0f141b',
    // 批注灰（微调偏冷）
    textMuted: '#56606e',
    // 反白：规避 #fff 平台透明化
    textInverse: '#fefefe',
    // 版框线：暖灰与新米底配套
    border: '#d0cec8',
    // 规范 §1.1：**拒绝让红色承担代码色** —— code 走 secondary 内参蓝
    code: '#0e3654',
    // 规范 §1.1 四态纪律：色相距 60°+，两冷蓝家族区分明度，warning 脱离红系
    //   对比度全部 ≥ AA（4.5:1），在 #fefefe 米底上校对
    status: {
      tip: { accent: '#1f4f6b', soft: '#dfe8ee' }, // 要点 Key Takeaway（钢青，7.8:1）
      warning: { accent: '#8a6416', soft: '#f1e8d1' }, // 风险提示 Risk Note（琥珀，5.9:1）
      info: { accent: '#3d5a75', soft: '#dde4ec' }, // 补注 Memo（烟蓝，5.6:1）
      danger: { accent: '#9a1b20', soft: '#f0dadc' }, // 警报 Alert（深朱，6.8:1）
    },
  },
  typography: {
    // 规范 §1.2：正文 15 / 1.75 —— 财经信息密度优先，不比人文 2.0 需要
    baseSize: 15,
    lineHeight: 1.75,
    // 规范 §1.2：h1 26 / 800 / 0.5（原 25 → 26；字重 800 保留；字距收紧到 0.5）
    h1Size: 26,
    // 规范 §1.2：h2 21 / 700 / 0.3
    h2Size: 21,
    // 规范 §1.2：h3 17 / 700 / 0.2
    h3Size: 17,
    // 规范 §1.2：正文字距 0.3px（财经偏紧，不做人文 1px 那种疏朗）
    letterSpacing: 0.3,
  },
  spacing: { paragraph: 16, section: 28, listItem: 6, containerPadding: 14 },
  // 规范 §3.9：radius 比当前 2/4/6 再硬一级 —— 硬核财经 0/2/4，radius ≥ 6 直接打回
  radius: { sm: 0, md: 2, lg: 4 },
}

// ============================================================
// Theme
// ============================================================

export const businessFinanceTheme = buildTheme({
  id: 'business-finance',
  name: '硬核财经',
  description: '深栗墨 + 内参蓝，研究所内参版面，数字与判断优先',
  tokens,
  assets: businessFinanceAssets({
    primary: tokens.colors.primary,
    secondary: tokens.colors.secondary,
    accent: tokens.colors.accent,
    border: tokens.colors.border,
    textInverse: tokens.colors.textInverse,
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
    // 规范 §1.2：h1 26 / 800 / 0.5 / 1.35 —— 字重 800 保留，字距收紧"靠重压阵"
    h1: {
      'font-size': '26px',
      'font-weight': '800',
      color: tokens.colors.text,
      'margin-top': '28px',
      'margin-bottom': '16px',
      'line-height': '1.35',
      'letter-spacing': '0.5px',
    },
    // 规范 §1.2：h2 21 / 700 / 0.3 / 1.4 + 4px 左 primary 栗墨竖条
    //   legend 感由 assets.h2Prefix 的主块 + 辅横条承担；不再给下划通栏线
    h2: {
      'font-size': '21px',
      'font-weight': '700',
      color: tokens.colors.text,
      'margin-top': '28px',
      'margin-bottom': '12px',
      'line-height': '1.4',
      'letter-spacing': '0.3px',
      'padding-left': '8px',
      'border-left': `4px solid ${tokens.colors.primary}`,
      // 覆盖 baseElements 默认 border-bottom 2px primary
      'border-bottom': 'none',
      'padding-bottom': '0',
    },
    // 规范 §1.2：h3 17 / 700 / 0.2 / 1.5 —— 不加前缀，仅靠字号字重区分（h3 应轻）
    h3: {
      'font-size': '17px',
      'font-weight': '700',
      color: tokens.colors.text,
      'margin-top': '24px',
      'margin-bottom': '10px',
      'line-height': '1.5',
      'letter-spacing': '0.2px',
    },
    // h4：steps 条目标题 / 列表小标题
    h4: {
      'font-size': '15px',
      'font-weight': '700',
      color: tokens.colors.text,
      'margin-top': '18px',
      'margin-bottom': '8px',
      'line-height': '1.5',
    },
    // 规范 §1.2：正文 15 / 400 / 0.3 / 1.75
    p: {
      'font-size': '15px',
      'line-height': '1.75',
      color: tokens.colors.text,
      'margin-top': '0',
      'margin-bottom': '16px',
      'letter-spacing': '0.3px',
    },
    // 规范 §2.5 quote（裸 blockquote）：column-rule 气质 —— 双侧 1px secondary 竖线
    //   透明底 + textMuted + 0.5 字距；不加引号 SVG（引号留给 quoteCard）
    blockquote: {
      'border-left': `1px solid ${tokens.colors.secondary}`,
      'border-right': `1px solid ${tokens.colors.secondary}`,
      'background-color': 'transparent',
      color: tokens.colors.textMuted,
      'padding-top': '8px',
      'padding-right': '20px',
      'padding-bottom': '8px',
      'padding-left': '20px',
      'margin-top': '0',
      'margin-bottom': '16px',
      'border-radius': '0',
      'letter-spacing': '0.5px',
    },
    ul: { 'padding-left': '24px', 'margin-top': '0', 'margin-bottom': '16px' },
    ol: { 'padding-left': '24px', 'margin-top': '0', 'margin-bottom': '16px' },
    li: {
      'margin-bottom': '6px',
      'line-height': '1.75',
      color: tokens.colors.text,
      'letter-spacing': '0.3px',
    },
    // 规范 §1.2 关键改动：`<strong>` 字重从旧 800 降到 600
    //   （全页 800 等于没重点；配合 primary 栗墨即可识别）
    strong: { 'font-weight': '600', color: tokens.colors.primary },
    em: { 'font-style': 'italic', color: tokens.colors.text },
    // 链接走 secondary（不走 primary 标题位）
    a: {
      color: tokens.colors.secondary,
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
    // 规范 §2.3 cover：图片极窄圆角 2px —— 印刷品感，不做卡片圆角
    img: {
      'max-width': '100%',
      display: 'block',
      'margin-top': '10px',
      'margin-right': 'auto',
      'margin-bottom': '10px',
      'margin-left': 'auto',
      'border-radius': '2px',
    },
  },

  // ============================================================
  // 代码块（规范 §1.1 code = secondary 内参蓝，不承担警示色）
  // ============================================================
  pre: {
    'background-color': tokens.colors.bgMuted,
    color: tokens.colors.text,
    'padding-top': '14px',
    'padding-right': '16px',
    'padding-bottom': '14px',
    'padding-left': '16px',
    'border-radius': '2px',
    border: `1px solid ${tokens.colors.border}`,
    'overflow-x': 'auto',
    'white-space': 'pre',
    'max-width': '100%',
    'box-sizing': 'border-box',
    'box-shadow': 'inset -14px 0 10px -10px rgba(0,0,0,0.18)',
    'margin-top': '0',
    'margin-bottom': '18px',
    'font-size': '13px',
    'line-height': '1.6',
  },
  // 规范 §1.1：inline code = bgMuted 底 + secondary 内参蓝字（不是红）
  code: {
    'background-color': tokens.colors.bgMuted,
    color: tokens.colors.code, // = secondary
    padding: '1px 5px',
    'border-radius': '2px',
    'font-size': '14px',
  },

  // ============================================================
  // Inline 强调（规范 §3.7 highlight 纪律 + §1.2 波浪线）
  // ============================================================
  inlineOverrides: {
    // 规范 §3.7：highlight 从 accent 琥珀 **降饱和** 到 warning.soft 米黄
    //   字色保持 text 深墨 —— highlight 是"标记"不是"涂鸦"
    highlight: {
      'background-color': tokens.colors.status.warning.soft,
      color: tokens.colors.text,
      padding: '0 4px',
      'border-radius': '0',
    },
    // 波浪线走 primary 栗墨
    wavy: {
      'text-decoration': 'underline wavy',
      'text-decoration-color': tokens.colors.primary,
      'text-underline-offset': '3px',
    },
    // 关键词强调走 primary + 600
    emphasis: {
      color: tokens.colors.primary,
      'font-weight': '600',
    },
  },

  // ============================================================
  // 容器视觉（规范 §2 的 19 个 container）
  // ============================================================
  containerOverrides: {
    // 规范 §2.1 intro：Abstract 研报摘要 —— 左 3px secondary 竖条 + 左内缩 14 + bgSoft 底
    intro: {
      'background-color': tokens.colors.bgSoft,
      'border-left': `3px solid ${tokens.colors.secondary}`,
      'border-radius': '0',
      padding: '12px 16px 12px 17px',
      margin: '0 0 24px 0',
      color: tokens.colors.text,
    },
    // 规范 §2.2 author：inline-block 冷方块 + bgMuted 底 + 2px accent 栏目色标竖条
    author: {
      display: 'inline-block',
      'background-color': tokens.colors.bgMuted,
      'border-left': `2px solid ${tokens.colors.accent}`,
      'border-radius': '0',
      padding: '4px 10px',
      margin: '0 0 16px 0',
      color: tokens.colors.textMuted,
      'font-size': '13px',
      'letter-spacing': '0.3px',
    },
    // 规范 §2.3 cover：封面 —— margin 下推 28，图片 radius 2 由 elementOverrides.img 接管
    cover: {
      margin: '0 0 28px 0',
    },
    // 四态容器外壳（variant 接管 —— tip=accent-bar 签名 / 其他三态靠 markdown `variant=` 覆盖）
    tip: {},
    warning: {},
    info: {},
    danger: {},
    // 规范 §2.6 quoteCard：核心判断 —— frame-brackets + bgSoft 底 + radius 2
    //   variant=frame-brackets 自带四角 L 形 SVG 装饰；此处作容器外壳
    quoteCard: {
      'background-color': tokens.colors.bgSoft,
      padding: '26px 28px',
      margin: '24px 0',
      'border-radius': '2px',
    },
    // 规范 §2 highlight（数据卡 primitive）：#fefefe 底 + 1px border + padding 18 20
    //   巨号数字 + .num inline 样式由用户在 markdown 内手动包裹（主题无 renderer 支持）
    highlight: {
      'background-color': tokens.colors.bg,
      padding: '18px 20px',
      margin: '20px 0',
      'border-radius': '2px',
      border: `1px solid ${tokens.colors.border}`,
    },
    // 规范 §2.15 compare：ledger 账本 —— 多空两面 / 正反方；拒绝"优缺点"
    //   variant=ledger 接管两栏 + thead primary 底 + tfoot bgMuted 底
    compare: { margin: '24px 0' },
    // 规范 §2.16 steps：阶段仪表盘（Phase I/II/III 或 Q1/Q2/Q3）
    //   variant=timeline-dot 接管左侧方形 stepBadge + 竖连线
    steps: { margin: '24px 0' },
    // 规范 §2.4 sectionTitle：cornered variant —— 左上 L 形 + 下方 1.5px primary **短** 横线
    //   短横宽度由 variant wrapperCSS 承担（不做通栏）
    sectionTitle: {
      margin: '40px 0 18px',
    },
    // 规范 §2.7 footerCTA：FT 订阅条 —— 上下各 1.5px primary 通栏横线夹一段冷静文字
    //   右下"扫码订阅 ▸"胶囊靠 template 里手写（primary 底 + textInverse 字）
    footerCTA: {
      margin: '32px 0 0 0',
      padding: '20px',
      'background-color': 'transparent',
      'border-top': `1.5px solid ${tokens.colors.primary}`,
      'border-bottom': `1.5px solid ${tokens.colors.primary}`,
      'border-radius': '0',
    },
    // 规范 §2.8 recommend：延伸阅读 —— bgSoft 底 + radius 2 + padding 14 18
    recommend: {
      margin: '24px 0',
      padding: '14px 18px',
      'background-color': tokens.colors.bgSoft,
      'border-radius': '2px',
    },
    // 规范 §2.9 qrcode：居中 block，图像外围细框（由 markdown 里 img 承担）
    //   容器本身无底色无边框
    qrcode: {
      margin: '28px auto',
      padding: '0',
      'background-color': 'transparent',
      'border-radius': '0',
    },
  },

  // ============================================================
  // 骨架变体（规范 §2）
  // ============================================================
  variants: {
    // 规范 §2.10：tip 走 accent-bar（签名）—— 左 3px tip.accent 钢青竖条
    //   info=minimal-underline / warning=pill-tag / danger=ticket-notch 靠 markdown 覆盖
    admonition: 'accent-bar',
    // 规范 §2.6：quoteCard 走 frame-brackets —— 四角 L 形 + attribution 位
    quote: 'frame-brackets',
    // 规范 §2.15：compare 走 ledger —— 账本双列；拒绝 column-card（那是默认）
    compare: 'ledger',
    // 规范 §2.16：steps 走 timeline-dot —— 阶段时间轴；拒绝 ribbon-chain（课程卡片审美）
    steps: 'timeline-dot',
    // 规范 §2 divider：默认 wave（K 线瑰宝）—— 全项目单件最强资产
    divider: 'wave',
    // 规范 §2.4：sectionTitle 走 cornered —— 左上 L 形角标
    sectionTitle: 'cornered',
    // 规范 §1.1：code 安静处理；bare 不做 header-bar 语言标签带
    codeBlock: 'bare',
  },

  // ============================================================
  // Templates
  // ============================================================
  templates: {
    ...commonTemplates,
    // 规范 §2.3 cover：专题头 + 核心判断断言
    cover: `::: cover 本期议题 · 专题标题
![封面占位](https://placehold.co/1200x630?text=business-finance)

**核心判断**：一句话把观点说清楚。正文不含 emoji、不带感叹号、不用荧光色。
:::
`,
    // 规范 §2.2 author：冷署名条
    authorBar: `::: author 研究员 · 张某某
2026Q1 · 阅读时长 8 分钟
:::
`,
    // 规范 §2.10 tip 签名：accent-bar + "要点"中文
    tip: `::: tip 要点
本期核心结论。不吹票、不带节奏、不用感叹号。
:::
`,
    // 规范 §2.7 footerCTA：FT 订阅条（上下通栏线由 containerOverride 承担）
    footerCTA: `::: footer-cta 关注「硬核财经」
不吹票、不带节奏，只讲值得下判断的数据。
:::
`,
  },
})
