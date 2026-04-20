/**
 * people-story · 人物特稿
 *
 * 定位（规范 §0）：**《人物》杂志 / GQ 特稿 / New Yorker Profiles** 的公众号呈现。
 * 参照：《人物》杂志封面与内页 · 《三联生活周刊》人物专访 · *The New Yorker* "Profiles"
 * 栏目 · *Granta* 与 *The Paris Review* 访谈版面。
 * 气质关键词：**肖像感、克制、冷米、瘦细线、巨大引号、一个人物色**。
 *
 * 与 literary-humanism 的钉子级差异（规范 §0 表）：
 *   - literary 是书（给文字让位），people-story 是杂志（给人物让位）
 *   - 底色冷米 #f2efe7（literary 的 #f4efe3 偏暖） —— 微弱但决定性的 2° 色温差
 *   - accent 深铁锈（literary 是宋椠墨褐）
 *   - 装饰语汇 drop cap + 罗马数字（literary 是云纹 + 钤印）
 *   - 行高 1.75（literary 是 2.0）—— 杂志比书紧
 *
 * 三条签名动作（规范 §结语）：
 *   1. primary #1b2330 深墨靛 + accent #8a3f2b 深铁锈 + bg #f2efe7 冷米（三锚点不许动）
 *   2. Drop cap：intro 首段首字由渲染器拆成 `<span class="intro-dropcap">X</span>`,
 *      48px / 700 / accent / inline-block（behavior.introDropcap = true 驱动）
 *   3. quoteCard = 巨号 serif 引号 SVG + 25px 金句 + byline attribution 三件事
 *
 * accent 稀缺纪律：人物色每篇最多出现三处 —— drop cap + pull-quote 引号 + 罗马数字.
 * 超三次即降格，整套"人物感"垮掉.
 */

import { buildTheme } from '../_shared/buildTheme'
import type { ThemeTokens } from '../types'
import { peopleStoryAssets } from './assets'
import { commonTemplates } from '../_shared/defaultTemplates'

// ============================================================
// Tokens（规范 §1.1）
// ============================================================

const tokens: ThemeTokens = {
  colors: {
    // 规范 §1.1：深墨靛 —— 杂志封面大刊头的色，带一点点蓝但不是蓝.
    // 与 literary 的 #5a4a3a 墨褐对比：literary 偏暖黑；people-story 偏冷黑.
    primary: '#1b2330',
    // 规范 §1.1：靛灰，primary 降 2 档明度；h3 / 标题下划线 / 次级装饰色
    secondary: '#4a5260',
    // 规范 §1.1 关键决策：深铁锈 —— "旧照片里的红"，掺灰偏暗，不漂亮.
    // 稀缺用法：drop cap / pull-quote 引号 / 罗马数字 三处，超出即降格.
    accent: '#8a3f2b',
    // 规范 §1.1：冷米，比 literary 的 #f4efe3 凉 2° 色温 —— 肉眼几乎察觉不到，
    //   但同屏并排就是"书 vs 杂志"的差别. 偏近 Cereal 内页底色.
    bg: '#f2efe7',
    // 规范 §1.1：杂志衬底，与主底 6% 明度差（intro / recommend / quoteCard）
    bgSoft: '#e9e5db',
    // 规范 §1.1：深米，仅用于 code / byline 块的更深底，绝不铺整页
    bgMuted: '#dcd7c9',
    // 规范 §1.1：深墨，比 literary 的 #1f1b14 更冷更黑 —— 偏蓝黑杂志油墨
    text: '#17171a',
    // 规范 §1.1：版权灰，byline / 采访时间 / 摄影署名
    textMuted: '#5d5d63',
    // 规范 §1.1：反白 = bg 本身（避免 #fff 公众号透明化陷阱）
    textInverse: '#f2efe7',
    // 规范 §1.1：版面细线，所有 1px 瘦细线都取这个色 —— 杂志内页 column rule 调
    border: '#c8c2b3',
    // 规范 §1.1：code = textMuted 版权灰 —— 拒绝让 code 承担暖色或人物色
    code: '#5d5d63',
    // 规范 §1.1 语义色：冷米 #f2efe7 上 AA ≥ 4.5:1，全部掺灰，饱和度 ≤ 40%.
    // danger 与 accent 同族但刻意错开（accent #8a3f2b 亮一点；danger #6b3a32 暗一点）
    status: {
      tip: { accent: '#4a6a7a', soft: '#d9dfe2' }, // 钢笔蓝灰（采访手记）
      warning: { accent: '#7a6b3a', soft: '#e2ddc8' }, // 档案黄（FACT CHECK 事实核查）
      info: { accent: '#556170', soft: '#d6d9dd' }, // 灰铅笔（背景说明）
      danger: { accent: '#6b3a32', soft: '#dccdc7' }, // 暗铁锈浅（官方回应）
    },
  },
  typography: {
    // 规范 §1.2：baseSize 16 + line-height 1.75（红线，不许动）
    baseSize: 16,
    lineHeight: 1.75,
    // 规范 §1.2：h1 28 —— 比 literary 的 26 高 2px，特稿标题要"砸"进版面；字距紧排
    h1Size: 28,
    // 规范 §1.2：h2 20，前面挂罗马数字前缀（behavior.h2RomanNumerals 驱动）
    h2Size: 20,
    // 规范 §1.2：h3 16 —— 与正文同号，靠字重 600 跳一档
    h3Size: 16,
    // 规范 §1.2：正文字距 0.5px —— 比 industry 的 0.3px 松一档
    letterSpacing: 0.5,
  },
  spacing: {
    paragraph: 20,
    // 规范：section 级分隔 40px；sectionTitle margin-top 48 制造"章节换幕"感
    section: 36,
    listItem: 10,
    containerPadding: 20,
  },
  // 规范 §3.9：所有容器默认 radius 0（方版心是杂志，圆角是 App）
  radius: { sm: 0, md: 0, lg: 2 },
}

// ============================================================
// Theme
// ============================================================

export const peopleStoryTheme = buildTheme({
  id: 'people-story',
  name: '人物特稿',
  description: '《人物》杂志 / New Yorker Profiles 家族，特稿的"肖像感"排版',
  tokens,
  assets: peopleStoryAssets({
    primary: tokens.colors.primary,
    accent: tokens.colors.accent,
    secondary: tokens.colors.secondary,
    border: tokens.colors.border,
    textMuted: tokens.colors.textMuted,
    tipAccent: tokens.colors.status.tip.accent,
    warningAccent: tokens.colors.status.warning.accent,
    infoAccent: tokens.colors.status.info.accent,
    dangerAccent: tokens.colors.status.danger.accent,
  }),

  // ============================================================
  // Behavior（规范 §结语 4 件事中的 2/3 条）
  // ============================================================
  behavior: {
    // 规范 §1.2 Drop cap 落地策略：渲染器把 intro 首段首字拆成 span
    introDropcap: true,
    // 规范 §1.3 ③ / §3.7：章节编号必走罗马数字 —— 渲染器自动注入 I/II/III 前缀
    h2RomanNumerals: true,
  },

  // ============================================================
  // 元素级样式（规范 §1.2）
  // ============================================================
  elementOverrides: {
    // 规范 §1.2：h1 28/700/1.2px/1.35 —— **左对齐**（杂志封面大名字都顶格左对齐）
    //   拒绝居中、拒绝主色染字（text 色）、拒绝感叹号、全大写仅出现在 Latin byline
    h1: {
      'font-size': '28px',
      'font-weight': '700',
      color: tokens.colors.text,
      'margin-top': '28px',
      'margin-bottom': '16px',
      'line-height': '1.35',
      'letter-spacing': '1.2px',
      'text-align': 'left',
    },
    // 规范 §1.2：h2 20/600/1px/1.5 —— 章节前挂罗马数字 span（behavior 驱动注入）
    //   下方**不做**通栏横线（通栏线让 h2 像教科书，people-story 用 sectionTitle 做通栏）
    h2: {
      'font-size': '20px',
      'font-weight': '600',
      color: tokens.colors.text,
      'margin-top': '30px',
      'margin-bottom': '12px',
      'line-height': '1.5',
      'letter-spacing': '1px',
      'border-bottom': 'none',
      'padding-bottom': '0',
    },
    // 规范 §1.2：h3 16/600/0.8px/1.7 —— 与正文同号，靠字重跳一档
    h3: {
      'font-size': '16px',
      'font-weight': '600',
      color: tokens.colors.text,
      'margin-top': '22px',
      'margin-bottom': '10px',
      'line-height': '1.7',
      'letter-spacing': '0.8px',
    },
    // h4：小节引导，介于 h3 与正文之间
    h4: {
      'font-size': '15px',
      'font-weight': '600',
      color: tokens.colors.text,
      'margin-top': '18px',
      'margin-bottom': '8px',
      'line-height': '1.6',
      'letter-spacing': '0.5px',
    },
    // 规范 §1.2：正文 16/400/0.5px/1.75 —— 红线行高 1.75，不许塌
    p: {
      'font-size': '16px',
      'line-height': '1.75',
      color: tokens.colors.text,
      'margin-top': '0',
      'margin-bottom': '20px',
      'letter-spacing': '0.5px',
    },
    // 规范 §2.5 quote 裸 blockquote：column-rule 气质 —— 双侧 1px textMuted 竖线
    //   与 literary 的 primary 竖线区分：people-story 用 textMuted（版权灰）更冷静
    blockquote: {
      'border-left': `1px solid ${tokens.colors.textMuted}`,
      'border-right': `1px solid ${tokens.colors.textMuted}`,
      'background-color': 'transparent',
      color: tokens.colors.textMuted,
      'padding-top': '8px',
      'padding-right': '20px',
      'padding-bottom': '8px',
      'padding-left': '20px',
      'margin-top': '0',
      'margin-bottom': '18px',
      'border-radius': '0',
      'font-size': '16px',
      'letter-spacing': '0.8px',
    },
    ul: { 'padding-left': '24px', 'margin-top': '0', 'margin-bottom': '20px' },
    ol: { 'padding-left': '24px', 'margin-top': '0', 'margin-bottom': '20px' },
    li: {
      'margin-bottom': '10px',
      'line-height': '1.75',
      color: tokens.colors.text,
      'letter-spacing': '0.5px',
    },
    // 规范 §1.2：pull-quote 500 / strong 500 —— 杂志正文加粗克制
    strong: {
      'font-weight': '500',
      color: tokens.colors.text,
    },
    em: { 'font-style': 'italic', color: tokens.colors.text },
    // 规范 §1.1：链接走 primary 深墨靛，不走 accent（accent 是稀缺色）
    a: {
      color: tokens.colors.primary,
      'text-decoration': 'underline',
    },
    // 规范 §2：divider rule 用 1px border 色横线 + 36px 上下 margin
    hr: {
      border: 'none',
      height: '1px',
      'background-color': tokens.colors.border,
      'margin-top': '36px',
      'margin-bottom': '36px',
    },
    // 规范 §2.3 cover：图片 radius 0（杂志封面从不圆角）
    img: {
      'max-width': '100%',
      display: 'block',
      'margin-top': '12px',
      'margin-right': 'auto',
      'margin-bottom': '12px',
      'margin-left': 'auto',
      'border-radius': '0',
    },
  },

  // ============================================================
  // 代码块（规范 §1.1 code = textMuted 版权灰）
  // ============================================================
  pre: {
    'background-color': tokens.colors.bgMuted,
    color: tokens.colors.text,
    'padding-top': '14px',
    'padding-right': '16px',
    'padding-bottom': '14px',
    'padding-left': '16px',
    'border-radius': '0',
    border: `1px solid ${tokens.colors.border}`,
    'overflow-x': 'auto',
    'white-space': 'pre',
    'max-width': '100%',
    'box-sizing': 'border-box',
    'box-shadow': 'inset -14px 0 10px -10px rgba(0,0,0,0.12)',
    'margin-top': '0',
    'margin-bottom': '20px',
    'font-size': '13px',
    'line-height': '1.7',
  },
  code: {
    'background-color': tokens.colors.bgMuted,
    color: tokens.colors.code, // = textMuted
    padding: '1px 5px',
    'border-radius': '0',
    'font-size': '14px',
  },

  // ============================================================
  // Inline 强调
  // ============================================================
  inlineOverrides: {
    // 规范：highlight 走 bgSoft 底 + text 色 —— 不做荧光黄，不染 accent
    highlight: {
      'background-color': tokens.colors.bgSoft,
      color: tokens.colors.text,
      padding: '0 3px',
      'border-radius': '0',
    },
    // 波浪线走 primary 深墨靛（accent 是稀缺色，不给波浪线占用）
    wavy: {
      'text-decoration': 'underline wavy',
      'text-decoration-color': tokens.colors.primary,
      'text-underline-offset': '3px',
    },
    // 规范 §1.2：emphasis 走 primary + 500（字重克制，不抢 strong 的 500 位）
    emphasis: {
      color: tokens.colors.primary,
      'font-weight': '500',
    },
  },

  // ============================================================
  // 容器视觉（规范 §2）
  // ============================================================
  containerOverrides: {
    // 规范 §2.1 intro：人物卡 / 导语 —— bgSoft 底 + 20×24 padding + 无边框 radius 0
    //   behavior.introDropcap=true 让 markdown-core 拆首字到 .intro-dropcap span
    //   .intro-dropcap 样式通过 generate-CSS 层兜底（见 themeCSS）; 此处只管外框
    intro: {
      'background-color': tokens.colors.bgSoft,
      'border-radius': '0',
      padding: '20px 24px',
      margin: '0 0 32px 0',
      color: tokens.colors.text,
    },
    // 规范 §2.2 author：记者 / 摄影条 —— 单行横排，无底色无边框无圆角
    author: {
      'background-color': 'transparent',
      'border-radius': '0',
      padding: '10px 0',
      margin: '0 0 24px 0',
    },
    // 规范 §2.3 cover：杂志封面一体化 —— radius 0，大 margin
    cover: {
      margin: '0 0 40px 0',
    },
    // 四态容器外壳（variant 接管）
    tip: {},
    warning: {},
    info: {},
    danger: {},
    // 规范 §2.7 quoteCard：特稿心脏 —— **无底色、无边框、无圆角**
    //   variant=magazine-dropcap 的 wrapperCSS 已含基本定位，此处仅覆盖 margin/padding
    quoteCard: {
      'background-color': 'transparent',
      'border-radius': '0',
      border: 'none',
      padding: '24px 24px 20px 36px',
      margin: '32px 0',
    },
    // 规范 §2.8 highlight：年表片段 / 生平要点 —— 无底色无边框扁平列表
    highlight: {
      'background-color': 'transparent',
      'border-radius': '0',
      padding: '16px 0',
      margin: '20px 0',
    },
    // 规范 §2.9 compare：两人 / 两时期并置 —— 容器 margin 外壳；栏内样式 variant 负责
    compare: { margin: '24px 0' },
    // 规范 §2.10 steps：人生阶段 —— timeline-dot（badge 改用罗马数字版本）
    steps: { margin: '28px 0' },
    // 规范 §2.4 sectionTitle：章节封面 —— 左上肖像 silhouette + 罗马 span + 通栏 1px border 横线
    //   margin 48 比 h2 更大，制造章节换幕感.
    sectionTitle: {
      margin: '48px 0 20px',
      'padding-bottom': '10px',
      'border-bottom': `1px solid ${tokens.colors.border}`,
    },
    // 规范 §2.11 footerCTA：卷尾致谢 —— 无底色无边框，居中文字块
    //   不叫 CTA 也不装 CTA —— 是致谢 + 署名 + 日期
    footerCTA: {
      margin: '40px 0 0 0',
      padding: '32px 0 24px 0',
      'background-color': 'transparent',
      'border-radius': '0',
      'text-align': 'center',
    },
    // 规范 §2.12 recommend：延伸阅读 —— bgSoft 底 + radius 0 + 无边框
    recommend: {
      margin: '28px 0',
      padding: '18px 22px',
      'background-color': tokens.colors.bgSoft,
      'border-radius': '0',
    },
    // 规范 §2.13 qrcode：订阅入口 —— 居中 block，无边框无圆角无投影
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
    // 规范 §2.10 tip 签名：minimal-underline（采访手记 —— 最轻的一档）
    //   warning=pill-tag（FACT CHECK）/ info=accent-bar（背景说明）/ danger=ticket-notch（官方回应）
    //   其余三态靠 markdown `variant=` 覆盖
    admonition: 'minimal-underline',
    // 规范 §2.7：quoteCard 走 magazine-dropcap —— 巨号 serif 引号 + 金句 + byline
    quote: 'magazine-dropcap',
    // 规范 §2.9：compare 走 column-card（拒绝 ledger 医疗软件审美 / 拒绝 stacked-row 简历感）
    compare: 'column-card',
    // 规范 §2.10：steps 走 timeline-dot（stepBadge 由本主题资产注入罗马徽章）
    steps: 'timeline-dot',
    // 规范 §2 divider：默认 rule —— 最枯的一根 1px 横线
    divider: 'rule',
    // 规范 §2.4：sectionTitle 走 cornered（左上 sectionCorner 肖像 silhouette）
    sectionTitle: 'cornered',
    // 规范 §1.1：code 安静处理；bare 不做 header-bar（那是 tech-explainer）
    codeBlock: 'bare',
  },

  // ============================================================
  // Templates
  // ============================================================
  templates: {
    ...commonTemplates,
    // 规范 §2.3 cover：杂志封面一体化（标题 + 身份 + deck 导语 + byline）
    cover: `::: cover 张某某
![封面肖像](https://placehold.co/1200x1400?text=portrait)

**作家、翻译家，1967 年生于上海**

他曾在一封给编辑的信里写过：关于写作这件事，最难的从来不是开头。
:::
`,
    // 规范 §2.2 author：记者 + 摄影 + 日期 byline（简单版）
    authorBar: `::: author 文 / 某记者
摄影 / 某摄影师  ·  2026 年 4 月刊
:::
`,
    // 规范 §2.14 tip 签名：采访手记 minimal-underline
    tip: `::: tip 采访手记
记者笔记本里的旁注 —— 最轻的一档，无边框，仅标题下方一道短线。
:::
`,
    // 规范 §2.11 footerCTA：卷尾致谢（不叫 CTA）
    footerCTA: `::: footer-cta 卷尾致谢
本文基于 2026 年 3 月至 6 月多次采访整理而成。

感谢受访者及所有提供帮助的朋友。
:::
`,
  },
})
