/**
 * default · 有意识的中立
 *
 * 定位（规范 §0）：不是"没有主张"，是"对所有题材保持公平"。
 * 参照坐标：Medium 默认阅读视图、Notion 默认块、Substack 未定制版面、MDN 未登录默认态。
 * 气质关键词：中性、准确、得体、可用、不抢戏、不偷懒。
 *
 * 拒绝坐标（规范 §0）：
 *   - 拒绝 "Bootstrap 鲜蓝 + 企业官网灰底"
 *   - 拒绝 "Word 默认样式"的廉价文档感
 *   - 拒绝渐变 / 阴影霓虹 / 毛玻璃 / 圆角 > 16px
 *   - 拒绝任何 emoji（🎯 📌 ⚠️ 💡）——default 里任何 emoji 都会立刻拉到小红书审美
 *   - 拒绝 committed 主题的签名动作（见 §1.2 的 12 条"不做"）
 *
 * 三条不可妥协决策（规范 §1.1 / §1.4）：
 *   1. primary = #2558b0 编辑蓝（Medium/Economist/MDN 链接蓝家族；非 Bootstrap #007bff）
 *   2. accent = primary（字段保留但视觉系统里已删掉 accent 这个独立变量）
 *   3. SVG 故意只保留 4 件 + 4 件语义图标 + stepBadge + sectionCorner 备用；**删除 quoteMark**
 */

import { buildTheme } from '../_shared/buildTheme'
import type { ThemeTokens } from '../types'
import { commonTemplates } from '../_shared/defaultTemplates'
import { defaultAssets } from './assets'

// ============================================================
// Tokens（规范 §1.1 色彩表）
// ============================================================

const tokens: ThemeTokens = {
  colors: {
    // primary：编辑蓝（规范 §1.1）——Medium/Economist/MDN 链接蓝共同家族
    // 饱和度 55%、明度 42%，彻底脱离 SaaS 官网 Hero CTA 戳印
    primary: '#2558b0',
    // secondary：**关键改动**——不再是"第二种蓝"，退回纯灰阶（规范 §1.1）
    // 用于 caption/byline/次级 label/次级边框（recommend 左边色条等）
    secondary: '#8a8f98',
    // accent：**关键改动**——字段保留（types 必填）但取值 = primary
    // 等于在视觉语言里把 accent 作为独立变量删掉（规范 §1.1 "default 的签名动作"）
    accent: '#2558b0',
    // bg：微暖白（规范 §1.1）——比纯白让出 1% 暖度
    // 规避公众号 SVG 光栅化"白→透明"；比 literary 凉、比 people-story 暖，不偏科
    bg: '#fdfdfc',
    // bgSoft：浅灰米——与 bg 差 3%，足识别容器边界
    bgSoft: '#f5f5f3',
    // bgMuted：深浅灰米——给 code inline 底、compare 表头用
    bgMuted: '#eceae4',
    // text：中性墨（规范 §1.1）——避开 literary 暖黑 / people-story 蓝黑 / academic 冷墨
    text: '#1c1f24',
    textMuted: '#636870',
    // 平台纪律：纯白用 #fefefe 规避 SVG→PNG 透明化
    textInverse: '#fefefe',
    // border：细线灰——微暖、饱和度压一档，像"铅笔勾过的轮廓"
    border: '#d8d8d4',
    // code：**拒绝让 code 承担颜色**（规范 §1.1）——default 的 code 是"被引用的字符串"
    // 深墨字 + 浅灰米底就够；不是"醒目的彩色装饰"
    code: '#1c1f24',
    // 语义四色（规范 §1.1 语义色表）——"最寡淡的那个版本"
    // 非"学术克制"非"厨房实物"非"内参 alert"，就是最标准的那一版
    status: {
      tip: { accent: '#1f8a4c', soft: '#eef6ef' }, // 比 life 菜叶绿更饱和更标准
      info: { accent: '#2558b0', soft: '#eef2f9' }, // = primary（default 的结构性合并）
      warning: { accent: '#9a6b1a', soft: '#f7f0df' }, // 比 tech-geek 琥珀暗、比 literary 商榷黄饱和
      danger: { accent: '#b42318', soft: '#fbecea' }, // 对齐 Bootstrap alert-danger 但暗一档
    },
  },
  typography: {
    // 规范 §1.2 Scale：每个层级都压到"平台中位数"
    baseSize: 15,
    lineHeight: 1.75, // 1.8 是 literary 家族下限；1.75 是 Notion 默认；封顶不走 2.0
    h1Size: 22, // 比 business 26 / literary 26 / life 28 都小——default 的 h1 不吼
    h2Size: 19, // 与 literary 19 同档；字距完全不拉（≤ 0.3px）
    h3Size: 16, // 与正文 15 几乎同号；靠字重 + margin 区分（Medium 默认 h3 做法）
    letterSpacing: 0.3, // 全部 ≤ 0.3——不做 1px+ 大字距（那是 literary/life 签名）
  },
  spacing: {
    paragraph: 18, // 段间 18px——不允许 24px+（那是 literary/life 大留白签名）
    section: 28,
    listItem: 8,
    containerPadding: 16,
  },
  // 规范 §3.1 规避对策：所有圆角 ≤ 8px（sm 4 / md 6 / lg 8）
  // 禁用 16px+ 圆角——那是"Bootstrap 卡片温柔化"
  radius: { sm: 4, md: 6, lg: 8 },
}

// ============================================================
// Theme
// ============================================================

export const defaultTheme = buildTheme({
  id: 'default',
  name: '默认主题',
  description: '有意识的中立——Medium/Notion/Substack 默认家族',
  tokens,
  assets: defaultAssets({
    primary: tokens.colors.primary,
    border: tokens.colors.border,
    textInverse: tokens.colors.textInverse,
    tipAccent: tokens.colors.status.tip.accent,
    warningAccent: tokens.colors.status.warning.accent,
    infoAccent: tokens.colors.status.info.accent,
    dangerAccent: tokens.colors.status.danger.accent,
  }),

  // ============================================================
  // 元素级样式（规范 §1.2 typographic voice）
  // ============================================================
  elementOverrides: {
    // h1：22px / 700 / 字距 0.3px——不吼、预设"不是封面只是文章标题"
    h1: {
      'font-size': '22px',
      'font-weight': '700',
      color: tokens.colors.text,
      'margin-top': '28px',
      'margin-bottom': '14px',
      'line-height': '1.45',
      'letter-spacing': '0.3px',
    },
    // h2：19px / 700 / 字距 0.3px——单竖条前缀（assets.h2Prefix）+ 2px 主色下划线
    // 规范 §2.4 sectionTitle bordered：padding-bottom 6px + border-bottom 2px solid primary
    h2: {
      'font-size': '19px',
      'font-weight': '700',
      color: tokens.colors.text,
      'margin-top': '28px',
      'margin-bottom': '12px',
      'line-height': '1.5',
      'padding-bottom': '6px',
      'border-bottom': `2px solid ${tokens.colors.primary}`,
      'letter-spacing': '0.3px',
    },
    // h3：16px / 700 / 与正文几乎同号——不加前缀、不加下划线（Medium 默认 h3 做法）
    h3: {
      'font-size': '16px',
      'font-weight': '700',
      color: tokens.colors.text,
      'margin-top': '22px',
      'margin-bottom': '10px',
      'line-height': '1.55',
      'letter-spacing': '0.2px',
    },
    // h4：14px / 600 / textMuted——steps 内步骤小标题用
    // 规范纪律：default 的 h4 不染 primary 色（那是 tech-explainer 的教程签名）
    h4: {
      'font-size': '14px',
      'font-weight': '600',
      color: tokens.colors.text,
      'margin-top': '16px',
      'margin-bottom': '6px',
      'line-height': '1.5',
      'letter-spacing': '0.2px',
    },
    // 正文：15 / 1.75 / 字距 0.3px（规范 §1.2）
    // 比 tech-geek 等宽字距窄、比 literary 1px 书斋字距窄
    p: {
      'font-size': '15px',
      'line-height': '1.75',
      color: tokens.colors.text,
      'margin-top': '0',
      'margin-bottom': '18px',
      'letter-spacing': '0.3px',
    },
    // blockquote：规范 §2.5——3px 主色左边（从原 4px 改细、更不抢戏）+ bgSoft + textMuted
    blockquote: {
      'border-left': `3px solid ${tokens.colors.primary}`,
      'background-color': tokens.colors.bgSoft,
      color: tokens.colors.textMuted,
      'padding-top': '12px',
      'padding-right': '16px',
      'padding-bottom': '12px',
      'padding-left': '16px',
      'margin-top': '0',
      'margin-bottom': '18px',
      'border-radius': '4px',
    },
    ul: { 'padding-left': '24px', 'margin-top': '0', 'margin-bottom': '18px' },
    ol: { 'padding-left': '24px', 'margin-top': '0', 'margin-bottom': '18px' },
    li: {
      'margin-bottom': '8px',
      'line-height': '1.75',
      color: tokens.colors.text,
    },
    // kbd：规范 §1.2 键帽——浅底 + 四边 1px + 底边 2px 不对称边框
    // default 的 kbd 保持通用"被引用的字符串"气质，不走 tech-explainer 的 Docs 键帽
    kbd: {
      display: 'inline-block',
      'background-color': tokens.colors.bgSoft,
      color: tokens.colors.text,
      border: `1px solid ${tokens.colors.border}`,
      'border-bottom-width': '2px',
      'border-radius': '3px',
      padding: '1px 6px',
      'font-size': '12px',
      'line-height': '1.4',
      'vertical-align': 'middle',
    },
    // a：primary 编辑蓝 + 下划线——"可点击"直觉必须明确
    a: {
      color: tokens.colors.primary,
      'text-decoration': 'underline',
    },
    // hr：极简 1px border 色细线
    hr: {
      border: 'none',
      height: '1px',
      'background-color': tokens.colors.border,
      'margin-top': '24px',
      'margin-bottom': '24px',
    },
    // img：6px 圆角 + 居中；规范纪律：default 的 img 不加边框
    // （边框是 tech-explainer 的"截图三件套"签名）
    img: {
      'max-width': '100%',
      display: 'block',
      'margin-top': '10px',
      'margin-right': 'auto',
      'margin-bottom': '10px',
      'margin-left': 'auto',
      'border-radius': '6px',
    },
    // strong：700 bold + text 色——不退化为 em（那是 academic 签名）
    strong: { 'font-weight': '700', color: tokens.colors.text },
    // em：italic + text 色——各司其职，不替代 strong
    em: { 'font-style': 'italic', color: tokens.colors.text },
  },

  // ============================================================
  // 代码块（规范 §1.1 / §3.4）
  // ============================================================
  // 规范 §3.4：**拒绝 #282c34 Atom One Dark 原值 + 拒绝 #1e1e1e VSCode Dark+ 原值**
  // 改走中性深灰 #2a2d32，不沾任何 IDE 调色板出处
  pre: {
    'background-color': '#2a2d32',
    color: '#d8d8d4',
    'padding-top': '14px',
    'padding-right': '16px',
    'padding-bottom': '14px',
    'padding-left': '16px',
    'border-radius': '6px',
    'overflow-x': 'auto',
    'white-space': 'pre',
    'max-width': '100%',
    'box-sizing': 'border-box',
    'box-shadow': 'inset -14px 0 10px -10px rgba(0,0,0,0.28)',
    'margin-top': '0',
    'margin-bottom': '20px',
    'font-size': '13px',
    'line-height': '1.6',
  },
  // inline code：bgMuted 底 + text 色字——规范 §1.1 "拒绝让 code 承担颜色"
  // default 的 code 不是醒目装饰，是"被引用的字符串"
  code: {
    'background-color': tokens.colors.bgMuted,
    color: tokens.colors.text,
    padding: '2px 6px',
    'border-radius': '3px',
    'font-size': '14px',
  },

  // ============================================================
  // Inline 强调（规范 §1.3）
  // ============================================================
  inlineOverrides: {
    // highlight：从 #fff3b0 降一档到 #fff4c8（Notion <mark> 浅米黄）
    // 不走 life 亚麻线米灰、不走 business 琥珀黄
    highlight: {
      'background-color': '#fff4c8',
      color: tokens.colors.text,
      padding: '0 3px',
      'border-radius': '2px',
    },
    // wavy：波浪线从 accent 橙改到 primary 编辑蓝——不引入第三种颜色
    wavy: {
      'text-decoration': 'underline wavy',
      'text-decoration-color': tokens.colors.primary,
      'text-underline-offset': '3px',
    },
    // emphasis：primary + 600——关键词强调最通用做法，保留
    emphasis: {
      color: tokens.colors.primary,
      'font-weight': '600',
    },
  },

  // ============================================================
  // 容器视觉（规范 §2 的 19 个 container）
  // ============================================================
  containerOverrides: {
    // §2.1 intro：bgSoft + 6px 圆角 + textMuted；首字**不**下沉（people-story 签名）
    intro: {
      'background-color': tokens.colors.bgSoft,
      'border-radius': '6px',
      padding: '14px 16px',
      margin: '18px 0',
      color: tokens.colors.textMuted,
      'line-height': '1.7', // 比正文 1.75 略紧——"这是一段概括"
    },
    // §2.2 author：bgSoft + 6px 圆角 + 13px textMuted；不放头像圆框（industry 签名）
    author: {
      'background-color': tokens.colors.bgSoft,
      'border-radius': '6px',
      padding: '12px 14px',
      margin: '16px 0',
      'font-size': '13px',
      color: tokens.colors.textMuted,
    },
    // §2.3 cover：最普适封面——图 + 标题 + 作者信息，不加任何装饰 SVG
    cover: {
      margin: '20px 0',
    },
    // tip/warning/info/danger：四态**故意同骨架**（规范 §2.10-2.13）
    // 左 3px 色条 + 浅底 + 图标；变体 accent-bar 会注入色条，这里留空
    tip: {},
    warning: {},
    info: {},
    danger: {},
    // §2.6 quoteCard：**不放引号 SVG**（通过不导出 quoteMark 实现）
    // 规范要求"色块 + 细左边框 + 居中文字"；classic variant 提供 bgSoft + 居中 + 圆角，
    // 不提供左边框——这是 classic 与规范的唯一 gap，见报告"停下未改"说明
    quoteCard: {
      'background-color': tokens.colors.bgSoft,
      padding: '18px 20px',
      margin: '22px 0',
      'border-radius': '6px',
    },
    // §2.11 highlight：#fff4c8 浅米黄底 + 无边框（Notion <mark> / Medium highlight 路数）
    highlight: {
      'background-color': '#fff4c8',
      padding: '12px 14px',
      margin: '16px 0',
      'border-radius': '4px',
    },
    compare: { margin: '20px 0' },
    steps: { margin: '20px 0' },
    // §2.4 sectionTitle：bordered 主变体——padding-bottom 6px + 2px primary 下划线
    sectionTitle: {
      margin: '24px 0 12px',
      'padding-bottom': '6px',
      'border-bottom': `2px solid ${tokens.colors.primary}`,
    },
    // §2.15 footerCTA：bgSoft + 8px 圆角 + 1px 细边框——不承担任何号召
    footerCTA: {
      margin: '28px 0',
      padding: '16px',
      'background-color': tokens.colors.bgSoft,
      'border-radius': '8px',
      border: `1px solid ${tokens.colors.border}`,
    },
    // §2.16 recommend：bgSoft + 左 3px secondary 灰条（不用 primary——不抢色）
    recommend: {
      margin: '22px 0',
      padding: '14px 16px',
      'background-color': tokens.colors.bgSoft,
      'border-radius': '6px',
      'border-left': `3px solid ${tokens.colors.secondary}`,
    },
    // §2.17 qrcode：居中 + 1px 细边框 + 6px 圆角 + **无底色**
    qrcode: {
      margin: '22px 0',
      padding: '16px',
      border: `1px solid ${tokens.colors.border}`,
      'border-radius': '6px',
    },
  },

  // ============================================================
  // 骨架变体（规范 §2 每节的 primary variant）
  // ============================================================
  variants: {
    admonition: 'accent-bar', // §2.10-2.13：四态统一左 3px 色条 + 浅底
    quote: 'classic', // §2.5/§2.6：bgSoft + 居中（不导出 quoteMark SVG，走字符回退）
    compare: 'column-card', // §2.12：等宽两栏 table-cell（拒绝 ledger/stacked-row）
    steps: 'number-circle', // §2.13：数字圆圈纵向堆叠（拒绝 ribbon-chain/timeline-dot）
    divider: 'rule', // §2.14：单根 border 色细线（拒绝 glyph）
    sectionTitle: 'bordered', // §2.4：底部 2px primary 下划线
    codeBlock: 'bare', // §3.4：**拒绝 header-bar**——那是 tech-explainer 签名
  },

  // ============================================================
  // Templates（沿用 commonTemplates，不做主题特化）
  // ============================================================
  // 规范纪律：default 不发明"独家模板"——commonTemplates 已是通用 19 容器片段库
  templates: commonTemplates,
})
