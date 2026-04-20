/**
 * tech-explainer · 白昼课堂技术文档
 *
 * 定位（规范 §0）：这不是"程序员博客皮肤"，是"一份可以逐字跟做的技术产品文档"。
 * 参照坐标：Stripe Docs / Tailwind Docs / MDN / Linear changelog / Vercel 官方文档。
 * 气质关键词：白昼、课堂、友好、引导。
 *
 * 与 tech-geek 的硬边界（规范 §0）：
 *   - 色系 180° 反向（琥珀暖暗 vs 文档蓝清凉白）
 *   - motif 语系完全隔离（manpage `§ ¶ ⁂ [1]` vs kbd / $ / 文件路径胶囊 / copyIcon）
 *   - 读者关系完全不同（已懂工程师的冷静随笔 vs 手把手带你做的产品文档）
 *
 * 三条不可妥协决策（规范 §4）：
 *   1. primary = #0066cc Stripe 文档蓝（非紫 SaaS 味、非绿 success 冲突）
 *   2. codeBlock variant = 'header-bar'（Stripe Docs 的 signature）
 *   3. 与 tech-geek 三条硬边界不可破
 */

import { buildTheme } from '../_shared/buildTheme'
import type { ThemeTokens } from '../types'
import { commonTemplates } from '../_shared/defaultTemplates'
import { techExplainerAssets } from './assets'

// ============================================================
// Tokens（规范 §1.1 的 committed 版色板）
// ============================================================

// 规范里 note 是"第五态"，但 ThemeTokens.status 只有四态（tip/warning/info/danger）。
// 按工作协议 Q1/A1=b，note 走主题内部 textMuted 组合表达，不扩全局类型。
// noteAccent = textMuted（note 容器的左条色 + 图标 stroke 色）。
// 注：NOTE_SOFT `#f0f2f5` 在规范里是 note 容器的底色，本轮没有独立 note 容器渲染槽
// （现有 ThemeContainers 只有 info 容器），所以暂不落到主题对象里；未来若 note 独立成
// 容器类型再补。
const NOTE_ACCENT = '#5c6778'

const tokens: ThemeTokens = {
  colors: {
    primary: '#0066cc', // 文档蓝（Stripe Docs 家族）
    secondary: '#4a90e2', // 链接蓝（primary 的亮化变体）
    accent: '#f59e0b', // 琥珀警示（唯一暖色，仅 Warning / Pro Tip 图标）
    bg: '#fafbfc', // 文档清凉白（1-2% 蓝灰，OLED 长时阅读友好）
    bgSoft: '#f3f5f8', // 侧栏浅底（代码块标签带、author 底、intro 底）
    bgMuted: '#e8ecf1', // 表头灰蓝（table th、inline code 底、filePath 底）
    text: '#1a2233', // 文档墨（接近黑但偏蓝冷，Stripe Docs 正文精确色）
    textMuted: '#5c6778', // 侧注灰（caption / date / 脚注）
    textInverse: '#fefefe', // 反白（代码块标签带反白字；规避 #fff 透明化）
    border: '#d9dee5', // 边框灰蓝（融入主色家族的 1px 实线）
    code: '#0066cc', // inline code 字色 = primary（Stripe Docs 标志性）
    status: {
      tip: { accent: '#0d9f7f', soft: '#e6f5f0' }, // Mint 绿（Stripe Success 压一档饱和度）
      warning: { accent: '#b87614', soft: '#fdf4e2' }, // 琥珀文字色版（AA on 清凉白）
      info: { accent: '#0066cc', soft: '#e6f0fb' }, // = primary（技术文档里 info = "延伸知识点"）
      danger: { accent: '#c8322d', soft: '#fce9e7' }, // 陶土红（非鲜红 #ff0000 的服务器告警感）
    },
  },
  typography: {
    baseSize: 15,
    lineHeight: 1.75, // 比 tech-geek 的 1.85 略密（教程密度 > 随笔）
    h1Size: 26,
    h2Size: 21,
    h3Size: 17,
    letterSpacing: 0.3,
  },
  spacing: {
    paragraph: 18,
    section: 28,
    listItem: 8,
    containerPadding: 16,
  },
  // 规范纪律：文档感小圆角（≤ 6px），绝不走 large radius（那是卡片营销风）
  radius: { sm: 3, md: 6, lg: 10 },
}

// ============================================================
// Theme
// ============================================================

export const techExplainerTheme = buildTheme({
  id: 'tech-explainer',
  name: '文档白昼',
  description: 'Stripe Docs / MDN 家族，手把手跟做的技术产品文档',
  tokens,
  assets: techExplainerAssets({
    primary: tokens.colors.primary,
    accent: tokens.colors.accent,
    border: tokens.colors.border,
    textMuted: tokens.colors.textMuted,
    textInverse: tokens.colors.textInverse,
    tipAccent: tokens.colors.status.tip.accent,
    warningAccent: tokens.colors.status.warning.accent,
    infoAccent: tokens.colors.status.info.accent,
    dangerAccent: tokens.colors.status.danger.accent,
    noteAccent: NOTE_ACCENT,
  }),

  // ============================================================
  // 元素级样式（规范 §1.2 typographic voice）
  // ============================================================
  elementOverrides: {
    // h1：题头唯一 700 字重；字距 0（现代文档风，不拉宽）；无装饰前缀
    h1: {
      'font-size': '26px',
      'font-weight': '700',
      color: tokens.colors.text,
      'margin-top': '28px',
      'margin-bottom': '14px',
      'line-height': '1.35',
      'letter-spacing': '0',
    },
    // h2：底部 1px border 实线分隔（不是 2px 主色线——那太博客风）；
    //     前缀 3px 短竖条由 assets.h2Prefix 在 renderer 里自动注入
    h2: {
      'font-size': '21px',
      'font-weight': '600',
      color: tokens.colors.text,
      'margin-top': '32px',
      'margin-bottom': '14px',
      'line-height': '1.4',
      'padding-bottom': '8px',
      'border-bottom': `1px solid ${tokens.colors.border}`,
      'letter-spacing': '0',
    },
    // h3：无底线无前缀，纯靠字号 + 字重与正文区分
    h3: {
      'font-size': '17px',
      'font-weight': '600',
      color: tokens.colors.text,
      'margin-top': '24px',
      'margin-bottom': '10px',
      'line-height': '1.5',
      'letter-spacing': '0',
    },
    // h4（规范新增层级）：Step 小标题专属；primary 色 + 字重 600
    h4: {
      'font-size': '15px',
      'font-weight': '600',
      color: tokens.colors.primary,
      'margin-top': '20px',
      'margin-bottom': '8px',
      'line-height': '1.5',
      'letter-spacing': '0.3px',
    },
    // 正文：400 字重（白底不用补偿到 500）；行高 1.75
    p: {
      'font-size': '15px',
      'line-height': '1.75',
      color: tokens.colors.text,
      'margin-top': '0',
      'margin-bottom': '18px',
      'letter-spacing': '0.3px',
    },
    // blockquote：走 column-rule variant 处理，这里保留一个克制的 base
    //   （当用户临时用裸 > 引用时的兜底视觉）
    blockquote: {
      'border-left': `3px solid ${tokens.colors.border}`,
      'background-color': 'transparent',
      color: tokens.colors.textMuted,
      'padding-top': '4px',
      'padding-right': '0',
      'padding-bottom': '4px',
      'padding-left': '16px',
      'margin-top': '0',
      'margin-bottom': '18px',
      'border-radius': '0',
      'font-style': 'italic',
    },
    // kbd：规范 §1.2 键帽实现。浅底 + 四边 1px + 底边 2px（不对称边框 = 键帽立体）
    //     字号 12；字距 0.2 补偿等宽感
    kbd: {
      display: 'inline-block',
      'background-color': tokens.colors.bg, // = #fafbfc（规范指定）
      color: tokens.colors.text,
      border: `1px solid ${tokens.colors.border}`,
      'border-bottom-width': '2px',
      'border-radius': '3px',
      padding: '2px 6px',
      'font-size': '12px',
      'line-height': '1.4',
      'letter-spacing': '0.2px',
      'vertical-align': 'middle',
    },
    // a：primary 色 + 下划线 + 3px 偏移（保留下划线——技术文档"可点击"必须明确）
    a: {
      color: tokens.colors.primary,
      'text-decoration': 'underline',
      'text-underline-offset': '3px',
    },
    // hr：极简 1px，28px 上下呼吸
    hr: {
      border: 'none',
      height: '1px',
      'background-color': tokens.colors.border,
      'margin-top': '28px',
      'margin-bottom': '28px',
    },
    // img：截图必备三件套——1px 淡边框 + 6px 圆角 + 上下呼吸
    img: {
      'max-width': '100%',
      display: 'block',
      'margin-top': '18px',
      'margin-right': 'auto',
      'margin-bottom': '18px',
      'margin-left': 'auto',
      border: `1px solid ${tokens.colors.border}`,
      'border-radius': '6px',
    },
    strong: { 'font-weight': '600', color: tokens.colors.text },
    em: { 'font-style': 'italic', color: tokens.colors.text },
  },

  // ============================================================
  // 代码块（规范 §1.2 signature）
  // ============================================================
  // 规范 §1.1：GitHub Light / Prism Tomorrow 的冷灰深底 `#1e2533` + 冷浅灰字 `#e8ebf0`。
  // syntax highlighting 的 hljs 类由 pipeline 的 atom-one-dark 提供，与此 pre 底色通过
  // `pre code { background: transparent }` 的全局 themeCSS 规则共处——hljs 色值仍是 atom-one
  // 家族（冷色），总体观感贴近 GitHub Dark。
  pre: {
    'background-color': '#1e2533',
    color: '#e8ebf0',
    'padding-top': '14px',
    'padding-right': '16px',
    'padding-bottom': '14px',
    'padding-left': '16px',
    'border-radius': '6px',
    'overflow-x': 'auto',
    'white-space': 'pre',
    'max-width': '100%',
    'box-sizing': 'border-box',
    'box-shadow': 'inset -14px 0 10px -10px rgba(0,0,0,0.25)',
    'margin-top': '0',
    'margin-bottom': '20px',
    'font-size': '13px',
    'line-height': '1.6',
  },
  // inline code：bgMuted 底 + primary 字（规范 §1.1 Stripe Docs 标志性）
  //     字号 14（比正文 15 小 1px，"嵌入"而非"凸起"）；字重 500；字距 0 保留等宽视觉
  code: {
    'background-color': tokens.colors.bgMuted,
    color: tokens.colors.primary,
    padding: '1px 4px',
    'border-radius': '3px',
    'font-size': '14px',
    'font-weight': '500',
    'letter-spacing': '0',
  },

  // ============================================================
  // Inline 覆盖
  // ============================================================
  inlineOverrides: {
    // 规范 §3.1 拒绝 "CSDN 荧光黄 highlight"——这里即便是 `==标记==` 也只给一档克制的浅底 + 主色
    highlight: {
      'background-color': tokens.colors.status.info.soft,
      color: tokens.colors.primary,
      padding: '0 3px',
      'border-radius': '2px',
      'font-weight': '500',
    },
    // 波浪线：accent 琥珀；技术文档少用，但保留
    wavy: {
      'text-decoration': 'underline wavy',
      'text-decoration-color': tokens.colors.accent,
      'text-underline-offset': '3px',
    },
    // 着重：primary + 600（规范 §1.2 "500 强调"——但 [.xxx.] 比 strong 更重，用 600）
    emphasis: {
      color: tokens.colors.primary,
      'font-weight': '600',
    },
  },

  // ============================================================
  // 容器视觉（规范 §2 的 19 个 container 差异化）
  // ============================================================
  containerOverrides: {
    // §2.1 intro → TL;DR 本文要点
    intro: {
      'background-color': tokens.colors.bgSoft,
      'border-left': `3px solid ${tokens.colors.primary}`,
      'border-radius': '0 6px 6px 0',
      padding: '14px 18px',
      margin: '20px 0',
      color: tokens.colors.textMuted,
    },
    // §2.2 author → 作者 + 最后更新日期
    //     规范：无底色无边框——颜色克制到几乎融入页面
    author: {
      'background-color': 'transparent',
      padding: '8px 0',
      margin: '12px 0',
      color: tokens.colors.textMuted,
      'border-bottom': `1px solid ${tokens.colors.border}`,
    },
    // §2.3 cover → 标题 + 前置知识 + 预计阅读
    //     规范：背景 bg（不贴纸），底部 1px 分隔下方正文
    cover: {
      'background-color': tokens.colors.bg,
      padding: '20px 0 24px',
      margin: '16px 0',
      'border-bottom': `1px solid ${tokens.colors.border}`,
    },
    // tip/warning/info/danger 走 accent-bar variant 统一；容器外壳保持空（variant 接管）
    tip: {},
    warning: {},
    info: {},
    danger: {},
    // §2.6 quoteCard → Key Takeaway 核心要点
    //     mint 绿 border-left 3px + bgSoft 底（与 tip 同色但语义是小结，不是贴士）
    quoteCard: {
      'background-color': tokens.colors.bgSoft,
      'border-left': `3px solid ${tokens.colors.status.tip.accent}`,
      padding: '16px 18px',
      margin: '20px 0',
      'border-radius': '0 6px 6px 0',
    },
    // §2.14 highlight → Pro Tip 进阶技巧（琥珀 accent）
    highlight: {
      'background-color': tokens.colors.status.warning.soft,
      'border-left': `3px solid ${tokens.colors.accent}`,
      padding: '14px 18px',
      margin: '18px 0',
      'border-radius': '0 6px 6px 0',
    },
    compare: { margin: '20px 0' },
    // §2.16 steps → 左侧 1px 细竖线 + padding-left 形成"线上串珠"节律
    //     stepBadge 徽章由用户手工插入 h3 前（或未来 DOM pass 自动注入）
    steps: {
      margin: '20px 0',
      'border-left': `1px solid ${tokens.colors.border}`,
      'padding-left': '24px',
    },
    // §2.4 sectionTitle → bordered variant 处理；这里给 variant 未命中时的兜底
    sectionTitle: {
      margin: '32px 0 14px',
      'padding-bottom': '8px',
      'border-bottom': `1px solid ${tokens.colors.border}`,
    },
    // §2.7 footerCTA → 继续阅读 / 下一篇
    footerCTA: {
      margin: '28px 0',
      padding: '16px 18px',
      'background-color': tokens.colors.bgSoft,
      'border-radius': '6px',
    },
    // §2.8 recommend → 延伸阅读 / MDN "See Also" 翻版
    //     无底色（规范明确），仅上下分隔
    recommend: {
      margin: '24px 0',
      padding: '14px 0',
      'background-color': 'transparent',
      'border-top': `1px solid ${tokens.colors.border}`,
      'border-bottom': `1px solid ${tokens.colors.border}`,
    },
    // §2.9 qrcode → GitHub 仓库卡片风（浅底 + 6px 圆角 + primary URL）
    qrcode: {
      margin: '24px 0',
      padding: '16px',
      'background-color': tokens.colors.bgSoft,
      'border-radius': '6px',
    },
  },

  // ============================================================
  // 骨架变体（规范 §2 每节开头的 primary variant）
  // ============================================================
  variants: {
    admonition: 'accent-bar', // §2.10-2.13 tip/warning/info/danger 全部 accent-bar
    quote: 'column-rule', // §2.5 双侧细竖线夹住段落
    compare: 'column-card', // §2.15 Do/Don't 双栏
    steps: 'number-circle', // §2.16 圆圈数字（+ 容器 border-left 形成串珠）
    divider: 'rule', // §2.17 极简 1px 实线
    sectionTitle: 'bordered', // §2.4 short-bar-heading
    codeBlock: 'header-bar', // §1.2 signature：顶部语言标签带 + copy icon
  },

  // ============================================================
  // Templates（主题特化的 markdown 片段，供组件库插入）
  // ============================================================
  templates: {
    ...commonTemplates,
    // tip：英中双语胶囊标题 "Tip · 小贴士"（规范 §2.10）
    tip: `::: tip Tip · 小贴士
一句提醒读者的经验法则。
:::
`,
    // cover：规范 §2.3 要求标题 + 副标题 + 前置知识 + 阅读时长四件套。
    //     用 markdown 内嵌简短版：标题走 h1、副标题用 italic、前置知识靠行内 `code` 表达（主题的 code
    //     样式是 "bgMuted 底 + primary 字 + 3px 圆角" —— 视觉上等价于规范的"前置知识胶囊"）。
    cover: `::: cover 标题占位
副标题或一句话立意。

\`前置知识\`：\`HTML\` \`CSS\` \`JavaScript 基础\`

_15 分钟阅读 · 最后更新 2026-04-20_
:::
`,
  },
})
