/**
 * industry-observer · 行业观察周刊
 *
 * 定位（规范 §0）：**周报 / 深度稿 / analyst essay 的公众号呈现**。
 * 参照：Stratechery · Benedict Evans Weekly · The Information · 晚点 LatePost ·
 *       《财新周刊》深度报道。气质关键词：周报、断言、矩阵、issue 感。
 *
 * 与 business-finance 的硬边界（规范 §0 表）：
 *   - 底色暖米 vs 深栗墨 —— 色相近乎对顶，两主题同展读者体温立刻不同
 *   - highlight 不做巨号数据卡 —— 数字服从洞察，不是反过来
 *   - compare 不做 ledger 账本 —— 多列矩阵 vs 两列正反
 *   - divider 禁用 wave —— K 线是 business 瑰宝
 *
 * 与 academic-frontier 的硬边界（规范 §0 表）：
 *   - `<strong>` 鼓励使用（academic 禁用）—— 观察稿靠断言锚定
 *   - 底色微暖米（academic 纯白）—— newsletter 温度 vs 论文冷
 *
 * 三条签名动作（规范 §结语）：
 *   1. primary 深墨蓝 #24364f + accent 橙金 #b86f2a，底色 Stratechery 米 #fbf8f1
 *   2. Issue stamp 跨容器印章 —— cover/author/footerCTA 都可挂，由 attrs 注入
 *   3. Pull-quote 完整断言 + attribution —— 22/500 + 左右双 primary 竖线
 */

import { buildTheme } from '../_shared/buildTheme'
import type { ThemeTokens } from '../types'
import { industryObserverAssets } from './assets'
import { commonTemplates } from '../_shared/defaultTemplates'

// ============================================================
// Tokens（规范 §1.1）
// ============================================================

const tokens: ThemeTokens = {
  colors: {
    // 规范 §1.1 commit C：冷黑主色，Benedict Evans 路径
    primary: '#24364f',
    // 规范 §1.1：雾蓝，primary 浅 18%，用于 h3 / byline / 矩阵表头
    secondary: '#3d5063',
    // 规范 §1.1：晚点橙金，稀缺信号色（issueStamp / .num / strong 信号位）
    accent: '#b86f2a',
    // 规范 §1.1：Stratechery 米 —— 3% 黄度，微暖不甜
    bg: '#fbf8f1',
    // 档案米深一级（quoteCard / recommend / footer）
    bgSoft: '#f5efe1',
    // 期号卡背（issueStamp 底 / compare 表头 / code 底）
    bgMuted: '#ece3cf',
    // 观察者墨 —— 比 primary 再深一档，压过所有装饰
    text: '#1a2332',
    // 批注灰蓝 —— 带蓝调避免与暖米底打架
    textMuted: '#5a6778',
    // 反白：胶囊字色，规避 #fff 平台透明化
    textInverse: '#fefefe',
    // 米纸边：暖灰，与米底同族
    border: '#e0d6c0',
    // 规范 §1.1：inline code 字色 = primary（observer 稿里 code 极少，冷静即可）
    code: '#24364f',
    // 规范 §1.1 四态：色相均匀分布在色轮（tip 165° / warning 35° / info 210° / danger 10°）
    // AA ≥ 4.5:1，故意不冲最高对比度 —— newsletter 胶囊语言本就轻
    status: {
      tip: { accent: '#2d6a5a', soft: '#dceae4' }, // 墨绿（要点 TL;DR）
      warning: { accent: '#8a5a1a', soft: '#ece0c5' }, // 琥珀褐（存疑 Questioned）
      info: { accent: '#3d5a75', soft: '#dce4ec' }, // 烟蓝（背景 Context）
      danger: { accent: '#8a2a1c', soft: '#ecd4cf' }, // 铁锈红（错判 Flawed）
    },
  },
  typography: {
    // 规范 §1.2：16/1.85 比 academic 的 15/1.75 更松 —— 长读感是 industry 核心
    baseSize: 16,
    lineHeight: 1.85,
    // 规范 §1.2：h1 26/700/0.4 —— 可读性优先，不压阵
    h1Size: 26,
    // 规范 §1.2：h2 20/700/0.3 —— newsletter 不做章节通栏线
    h2Size: 20,
    // 规范 §1.2：h3 17/600/0.2 —— 避免和 h2 抢
    h3Size: 17,
    // 规范 §1.2：正文字距 0.3px —— 比 academic 紧，比 people-story 更 neutral
    letterSpacing: 0.3,
  },
  spacing: {
    paragraph: 18,
    // 规范 §2：section 级分隔 32px（glyph 菱形 ornament 上下呼吸）
    section: 32,
    listItem: 10,
    containerPadding: 18,
  },
  // 规范 §3.12：radius 2/3/4 —— 比 business 的 0/2/4 略松一档，保留 newsletter 温度
  radius: { sm: 2, md: 3, lg: 4 },
}

// ============================================================
// Theme
// ============================================================

export const industryObserverTheme = buildTheme({
  id: 'industry-observer',
  name: '行业观察',
  description: 'Stratechery / Benedict Evans 家族，业内人写给业内人的周刊深度稿',
  tokens,
  assets: industryObserverAssets({
    primary: tokens.colors.primary,
    secondary: tokens.colors.secondary,
    accent: tokens.colors.accent,
    border: tokens.colors.border,
    textInverse: tokens.colors.textInverse,
    tipAccent: tokens.colors.status.tip.accent,
    warningAccent: tokens.colors.status.warning.accent,
    infoAccent: tokens.colors.status.info.accent,
    dangerAccent: tokens.colors.status.danger.accent,
  }),

  // ============================================================
  // 元素级样式（规范 §1.2）
  // ============================================================
  elementOverrides: {
    // 规范 §1.2：h1 26/700/0.4px/1.4 —— 左对齐（非居中），可读性优先
    h1: {
      'font-size': '26px',
      'font-weight': '700',
      color: tokens.colors.text,
      'margin-top': '28px',
      'margin-bottom': '16px',
      'line-height': '1.4',
      'letter-spacing': '0.4px',
    },
    // 规范 §1.2：h2 20/700/0.3px/1.45 + assets.h2Prefix 注入竖条+橙金方块
    //   下缘**无横线**（newsletter 不做章节通栏线 —— 这是与 business 硬分隔）
    h2: {
      'font-size': '20px',
      'font-weight': '700',
      color: tokens.colors.text,
      'margin-top': '32px',
      'margin-bottom': '14px',
      'line-height': '1.45',
      'letter-spacing': '0.3px',
      // 覆盖 baseElements 默认的 border-bottom 2px primary
      'border-bottom': 'none',
      'padding-bottom': '0',
    },
    // 规范 §1.2：h3 17/600/0.2px/1.55 —— 降到 600 避免和 h2 抢
    h3: {
      'font-size': '17px',
      'font-weight': '600',
      color: tokens.colors.text,
      'margin-top': '24px',
      'margin-bottom': '10px',
      'line-height': '1.55',
      'letter-spacing': '0.2px',
    },
    // h4：介于 h3 与正文之间（steps/列表小标题）
    h4: {
      'font-size': '15px',
      'font-weight': '600',
      color: tokens.colors.text,
      'margin-top': '20px',
      'margin-bottom': '8px',
      'line-height': '1.5',
      'letter-spacing': '0.2px',
    },
    // 规范 §1.2：正文 16/400/0.3px/1.85 —— 行距 1.85 是 observer 长读感的核心
    p: {
      'font-size': '16px',
      'line-height': '1.85',
      color: tokens.colors.text,
      'margin-top': '0',
      'margin-bottom': '18px',
      'letter-spacing': '0.3px',
    },
    // 规范 §2.5 quote 裸 blockquote：column-rule 气质 —— 单 1px 竖线（不双线）
    //   单线留给短征引，双线是 quoteCard 的 pull-quote 专属
    blockquote: {
      'border-left': `1px solid ${tokens.colors.border}`,
      'border-right': 'none',
      'background-color': 'transparent',
      color: tokens.colors.textMuted,
      'padding-top': '6px',
      'padding-right': '0',
      'padding-bottom': '6px',
      'padding-left': '16px',
      'margin-top': '0',
      'margin-bottom': '18px',
      'border-radius': '0',
      'font-size': '15px',
      'line-height': '1.8',
    },
    ul: { 'padding-left': '24px', 'margin-top': '0', 'margin-bottom': '18px' },
    ol: { 'padding-left': '24px', 'margin-top': '0', 'margin-bottom': '18px' },
    li: {
      'margin-bottom': '10px',
      'line-height': '1.85',
      color: tokens.colors.text,
      'letter-spacing': '0.3px',
    },
    // 规范 §1.2 `<strong>` 纪律：600 / primary 色 / 鼓励使用（与 academic 相反）
    strong: {
      'font-weight': '600',
      color: tokens.colors.primary,
    },
    em: { 'font-style': 'italic', color: tokens.colors.text },
    // 规范 §2.8 recommend：链接走 primary 深墨蓝（不走 accent —— accent 是 issueStamp 专属）
    a: {
      color: tokens.colors.primary,
      'text-decoration': 'underline',
      'text-underline-offset': '3px',
    },
    // 规范 §2 divider：默认 glyph（菱形）；裸 hr 作为 rule variant 兜底
    hr: {
      border: 'none',
      height: '1px',
      'background-color': tokens.colors.border,
      'margin-top': '32px',
      'margin-bottom': '32px',
    },
    // cover 图片：极窄圆角 3px（印刷品感，非 SaaS 卡片感）
    img: {
      'max-width': '100%',
      display: 'block',
      'margin-top': '12px',
      'margin-right': 'auto',
      'margin-bottom': '12px',
      'margin-left': 'auto',
      'border-radius': '3px',
    },
  },

  // ============================================================
  // 代码块（规范 §1.1 code = primary，observer 稿代码极少）
  // ============================================================
  pre: {
    'background-color': tokens.colors.bgMuted,
    color: tokens.colors.text,
    'padding-top': '14px',
    'padding-right': '16px',
    'padding-bottom': '14px',
    'padding-left': '16px',
    'border-radius': '3px',
    border: `1px solid ${tokens.colors.border}`,
    'overflow-x': 'auto',
    'white-space': 'pre',
    'max-width': '100%',
    'box-sizing': 'border-box',
    'box-shadow': 'inset -14px 0 10px -10px rgba(0,0,0,0.15)',
    'margin-top': '0',
    'margin-bottom': '20px',
    'font-size': '13px',
    'line-height': '1.7',
  },
  // inline code：bgMuted 底 + primary 字
  code: {
    'background-color': tokens.colors.bgMuted,
    color: tokens.colors.code, // = primary
    padding: '1px 5px',
    'border-radius': '2px',
    'font-size': '14px',
    'font-weight': '500',
  },

  // ============================================================
  // Inline 强调（规范 §1.2 `<strong>` / `.num` / pull-quote）
  // ============================================================
  inlineOverrides: {
    // 规范 §3.1：highlight 故意克制 —— 不做荧光黄，轻底色 + text 色
    highlight: {
      'background-color': tokens.colors.bgSoft,
      color: tokens.colors.text,
      padding: '0 3px',
      'border-radius': '2px',
    },
    // 规范 §1.2：波浪线走 accent（observer 稿里少用，保留）
    wavy: {
      'text-decoration': 'underline wavy',
      'text-decoration-color': tokens.colors.accent,
      'text-underline-offset': '3px',
    },
    // 规范 §1.2 emphasis（`[.xxx.]`）：primary + 600，与 strong 同档
    emphasis: {
      color: tokens.colors.primary,
      'font-weight': '600',
    },
  },

  // ============================================================
  // 容器视觉（规范 §2 的 19 个 container）
  // ============================================================
  containerOverrides: {
    // 规范 §2.1 intro：编者按 —— 左 3px accent 橙金竖条 + 无底色 + 左内缩
    intro: {
      'background-color': 'transparent',
      'border-left': `3px solid ${tokens.colors.accent}`,
      'border-radius': '0',
      padding: '14px 16px 14px 17px',
      margin: '0 0 24px 0',
      color: tokens.colors.text,
    },
    // 规范 §2.2 author：撰文条 —— 底部 1px border 横线分界；issueStamp 由 renderer 注入
    author: {
      'background-color': 'transparent',
      'border-bottom': `1px solid ${tokens.colors.border}`,
      'border-radius': '0',
      padding: '10px 0',
      margin: '0 0 24px 0',
    },
    // 规范 §2.3 cover：标题 + 导语 + issueStamp（底部由 renderer 根据 attrs 挂）
    cover: {
      margin: '0 0 32px 0',
    },
    // 四态容器外壳（variant 接管）
    tip: {},
    warning: {},
    info: {},
    danger: {},
    // 规范 §2.6 quoteCard：行业断言 pull-quote —— 左右双 2px primary 竖线 + bgSoft 底
    //   variant=column-rule 接管 wrapperCSS；containerOverride 作兜底标记
    quoteCard: {
      'background-color': tokens.colors.bgSoft,
      padding: '20px 28px',
      margin: '28px 0',
      'border-radius': '3px',
    },
    // 规范 §2.14 highlight：**故意不做巨号数据卡** —— 左 3px accent 竖条 + bgSoft 底
    //   规范结语：数字服从洞察，不是反过来
    highlight: {
      'background-color': tokens.colors.bgSoft,
      'border-left': `3px solid ${tokens.colors.accent}`,
      padding: '8px 14px 8px 16px',
      margin: '20px 0',
      'border-radius': '2px',
    },
    // 规范 §2.15 compare：**矩阵对比** —— 拒绝 ledger（business 专属）
    //   table 级样式由 column-card variant 处理；容器 margin 作外壳
    compare: { margin: '24px 0' },
    // 规范 §2.16 steps：时间轴 —— 拒绝 number-circle / ribbon-chain
    //   variant=timeline-dot 接管 wrapperCSS + svgSlot（primary 圆点）
    steps: { margin: '24px 0' },
    // 规范 §2.4 sectionTitle：cornered variant —— 左上 3×3 accent 方块 + 下 2px primary 短横
    sectionTitle: {
      margin: '36px 0 16px',
      'padding-bottom': '8px',
      // 下方短横通过 wrapperCSS 处理；这里不覆盖 variant 的产物
    },
    // 规范 §2.7 footerCTA：Newsletter 订阅钩子 —— 顶底各一根 1.5px primary 横线
    //   issueStamp 由 renderer 根据 attrs 顶部注入
    footerCTA: {
      margin: '40px 0 0 0',
      padding: '18px 20px',
      'background-color': 'transparent',
      'border-top': `1.5px solid ${tokens.colors.primary}`,
      'border-bottom': `1.5px solid ${tokens.colors.primary}`,
      'border-radius': '0',
    },
    // 规范 §2.8 recommend：延伸阅读 —— bgSoft 底 + 3px 圆角
    recommend: {
      margin: '24px 0',
      padding: '16px 18px',
      'background-color': tokens.colors.bgSoft,
      'border-radius': '3px',
    },
    // 规范 §2.9 qrcode：订阅二维码 —— 图像 1px accent 外框 + #fefefe 内衬
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
    // 规范 §2.10 tip 签名：pill-tag（胶囊悬挂 —— industry 最契合的四态前置语言）
    //   warning=card-shadow（硬边）/ info=minimal-underline / danger=ticket-notch
    //   其余三态靠 markdown `variant=` 覆盖
    admonition: 'pill-tag',
    // 规范 §2.6：quoteCard 走 column-rule —— 左右双竖线，Benedict Evans 风 pull-quote
    quote: 'column-rule',
    // 规范 §2.15：compare 走 column-card —— 多列矩阵；拒绝 ledger
    compare: 'column-card',
    // 规范 §2.16：steps 走 timeline-dot —— 拒绝 number-circle / ribbon-chain
    steps: 'timeline-dot',
    // 规范 §2 divider：默认 glyph（中央菱形 ◆）
    divider: 'glyph',
    // 规范 §2.4：sectionTitle 走 cornered —— 左上 3×3 accent 方块
    sectionTitle: 'cornered',
    // 规范 §1.1：code 安静处理；bare 不做 header-bar 语言标签带
    codeBlock: 'bare',
  },

  // ============================================================
  // Templates
  // ============================================================
  templates: {
    ...commonTemplates,
    // 规范 §2.3 cover：标题 + 导语 + Issue stamp（attrs 驱动）
    cover: `::: cover 专题头 · 本期主标题 issue=023 date=2025-04-20 kind=周刊
![封面占位](https://placehold.co/1200x630?text=industry-observer)

副标题或一句话立意 —— 模拟 newsletter 的"本期导读"，可两到三行。
:::
`,
    // 规范 §2.2 author：撰文条（attrs 携带 issue 信息）
    authorBar: `::: author 林磊 role=深响编辑 date=2025-04-20 issue=023 kind=周刊
\`\`\`
`,
    // 规范 §2.10 tip 签名：pill-tag + "要点"中文胶囊
    tip: `::: tip 要点
- 本期核心观察一
- 本期核心观察二
- 本期核心观察三
:::
`,
    // 规范 §2.7 footerCTA：Newsletter 订阅（非 business "扫码订阅研报"的投资号语境）
    footerCTA: `::: footer-cta 订阅「某某观察」 cta=扫码订阅 ▸ issue=023 date=2025-04-20 kind=周刊
每周二清晨送到，30 分钟读完。不追热点，不发快讯，只讲值得下判断的行业变化。
:::
`,
  },
})
