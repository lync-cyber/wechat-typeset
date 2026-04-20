/**
 * literary-humanism · 人文札记
 *
 * 定位（规范 §0 / 结语）：**出版物**，不是"新中式"。参照坐标：三联书店毛边本、
 * 中华书局竖排集、《读库》正文页、岩波文库奶白封皮。气质关键词：克制、藏锋、留白、纸感。
 *
 * 落地三根红线（规范结语 §"落地时四件事最重要"）：
 *   1. primary = #5a4a3a 宋椠褐（不是驼棕 #7a5c3a —— 书斋而非茶馆）
 *   2. accent = #9a3b2e 藏经朱（仅在 quoteCard 首字 + footer 钤印出现，稀缺即贵气）
 *   3. 四种 admonition 必须是**四种不同 variant**（minimal-underline / accent-bar /
 *      pill-tag / ticket-notch）——此处 theme.variants.admonition 只能选一个代表，
 *      另三个靠 markdown 层 `variant=` 覆盖（见 Templates / sample-full.md）
 *   4. stepBadge 数字色 = primary 墨褐（见 assets.ts），不用朱砂
 *   5. 所有容器 radius = 0（方版心是书，圆角是卡片）
 *
 * 拒绝坐标（规范 §3）：
 *   - 拒绝"古风茶楼套餐"：大红大金 + 梅兰竹菊 + 书法水印
 *   - 拒绝纯正朱红 #dc143c / 亮金 #c8a15a
 *   - 拒绝 red-green 同强度对冲（松绿压灰 + 朱砂收窄）
 *   - 拒绝 text-indent 2em（现代竖读习惯已西化）
 *   - 拒绝 admonition 四色同形（那是默认主题偷懒）
 */

import { buildTheme } from '../_shared/buildTheme'
import type { ThemeTokens } from '../types'
import { literaryHumanismAssets } from './assets'
import { commonTemplates } from '../_shared/defaultTemplates'

// ============================================================
// Tokens（规范 §1.1 色彩表 / §1.2 Scale）
// ============================================================

const tokens: ThemeTokens = {
  colors: {
    // 规范 §1.1 核心改动：驼棕 #7a5c3a → 宋椠褐 #5a4a3a（油墨印在黄纸上的墨迹色）
    primary: '#5a4a3a',
    // 松绿 #3c4e3a → 青瓷釉 #3d4a3d（降 5% 饱和度，绿里掺灰）
    secondary: '#3d4a3d',
    // 朱砂 #a94633 → 藏经朱 #9a3b2e（收窄饱和度，稀有出场）
    accent: '#9a3b2e',
    // 宣纸米 #f5f1e8 → #f4efe3（降一点黄味，偏未漂白道林纸）
    bg: '#f4efe3',
    // 旧纸阴影 —— 与主底 8% 明度差
    bgSoft: '#ece5d1',
    // 装帧衬布 —— 仅用于 code / 边栏深底
    bgMuted: '#ddd3bb',
    // 松烟墨 #2b261c → #1f1b14（更深更冷，接近油墨印刷）
    text: '#1f1b14',
    // 墨灰 —— 规范微调保留
    textMuted: '#6b5f4a',
    // 规范纪律：平台 SVG→PNG 把 #fff 透明化，反白统一用 #fefefe
    textInverse: '#fefefe',
    // 版框线 —— 规范微调
    border: '#cfc3a8',
    // 规范 §1.1 关键改动：**拒绝朱砂承担代码色**
    // 人文语境里 code 是"注音符号"，不是"警示"；用墨灰安静处理
    code: '#6b5f4a',
    // 规范 §1.1 语义色表：米底 #f4efe3 上 AA ≥ 4.5:1
    // 色相距离 ≥ 120°，强度不对等（danger 更深 soft）
    status: {
      tip: { accent: '#4a6b3e', soft: '#e3e8d6' }, // 批注（灰青绿，5.1:1）
      warning: { accent: '#8a6428', soft: '#efe3c9' }, // 商榷（黄褐，4.7:1）
      info: { accent: '#3d5a75', soft: '#dce3ec' }, // 案语（青，5.4:1）
      danger: { accent: '#8e3a2d', soft: '#ecd6cf' }, // 校勘（暗朱红，5.3:1）
    },
  },
  typography: {
    // 规范 §1.2 Scale + §3.7 红线：baseSize 16 不许动（人文气质底线）
    baseSize: 16,
    // 唯一敢给 2.0 的主题 —— 人文札记的签名
    lineHeight: 2.0,
    // 规范 §1.2：h1 从 25 拔到 26（在 h2 之上拔高 1px）
    h1Size: 26,
    // 规范 §1.2：h2 从 20 降到 19（原 20 过于教科书，19 + 2px 字距 = 克制）
    h2Size: 19,
    // 规范 §1.2：h3 16 与正文同号，靠字距区分
    h3Size: 16,
    // 规范 §3.8 红线：字距是人文主题的声带 —— 正文 1px，标题层级 1.2→2→3 逐级放大
    letterSpacing: 1.0,
  },
  // 规范 §2 divider：上下 margin 提到 36px（比默认值大一档，人文更大呼吸）
  spacing: { paragraph: 22, section: 36, listItem: 12, containerPadding: 18 },
  // 规范 §3.5：所有容器默认 radius 0（方版心是书，圆角是卡片）
  // sm 给 intro/author 极窄圆角留位（≤ 2px）；md/lg 本主题不主动用
  radius: { sm: 0, md: 0, lg: 0 },
}

// ============================================================
// Theme
// ============================================================

export const literaryHumanismTheme = buildTheme({
  id: 'literary-humanism',
  name: '人文札记',
  description: '宋椠古籍 + 克制留白，给散文、书评、长评留足呼吸',
  tokens,
  assets: literaryHumanismAssets({
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
  // 元素级样式（规范 §1.2 typographic voice）
  // ============================================================
  elementOverrides: {
    // 规范 §1.2：h1 26 / 700 / 字距 3px —— 稀比粗更贵气（古籍大字题签）
    h1: {
      'font-size': '26px',
      'font-weight': '700',
      color: tokens.colors.text,
      'margin-top': '30px',
      'margin-bottom': '18px',
      'line-height': '1.5',
      'letter-spacing': '3px',
      'text-align': 'center',
    },
    // 规范 §1.3①：h2 前缀 = 一根 2px×20px primary 竖条（assets.h2Prefix 注入）
    //         h2 下方 1px border 横线"不通栏"—— 限到文字宽度的 60%，右侧留白
    //         平台无 max-width 于 h2 下划线的稳定方案，只能以通栏 border-bottom 代偿
    //         并压低 border 色强度 —— 参照《读库》目录的视觉效果
    h2: {
      'font-size': '19px',
      'font-weight': '600', // 规范 §1.2：600 而非 700（700 太硬）
      color: tokens.colors.text,
      'margin-top': '32px',
      'margin-bottom': '14px',
      'line-height': '1.6',
      'letter-spacing': '2px', // 规范 §1.2：2px 字距
      'padding-bottom': '8px',
      'border-bottom': `1px solid ${tokens.colors.border}`,
    },
    // 规范 §1.2：h3 16 / 600 / 与正文同号 —— 靠字距识别的高级手法
    h3: {
      'font-size': '16px',
      'font-weight': '600',
      color: tokens.colors.text,
      'margin-top': '22px',
      'margin-bottom': '10px',
      'line-height': '1.7',
      'letter-spacing': '1.2px',
    },
    // h4：介于 h3 与正文之间 —— steps 小标题走 timeline-dot variant 自带样式
    //    非 steps 场景沿用 baseElements 保底
    h4: {
      'font-size': '15px',
      'font-weight': '600',
      color: tokens.colors.text,
      'margin-top': '18px',
      'margin-bottom': '8px',
      'line-height': '1.6',
      'letter-spacing': '1px',
    },
    // 规范 §1.2：正文 16 / 400 / 字距 1px / 行高 2.0（签名）
    p: {
      'font-size': '16px',
      'line-height': '2.0',
      color: tokens.colors.text,
      'margin-top': '0',
      'margin-bottom': '22px',
      'letter-spacing': '1px',
    },
    // 规范 §2.5 quote（裸 blockquote）：column-rule 气质的双侧细竖线
    // variant `column-rule` 仅支持 quoteCard；裸 blockquote 靠 element CSS 代偿
    // 左右各 1px primary 竖线 + textMuted + 1.2px 字距 + 无引号
    blockquote: {
      'border-left': `1px solid ${tokens.colors.primary}`,
      'border-right': `1px solid ${tokens.colors.primary}`,
      'background-color': 'transparent',
      color: tokens.colors.textMuted,
      'padding-top': '8px',
      'padding-right': '22px',
      'padding-bottom': '8px',
      'padding-left': '22px',
      'margin-top': '0',
      'margin-bottom': '22px',
      'letter-spacing': '1.2px',
      // 规范 §1.2：禁用 italic（公众号回退不稳），改用 textMuted + letter-spacing 造倾斜感
    },
    ul: { 'padding-left': '24px', 'margin-top': '0', 'margin-bottom': '22px' },
    ol: { 'padding-left': '24px', 'margin-top': '0', 'margin-bottom': '22px' },
    li: {
      'margin-bottom': '12px',
      'line-height': '2.0',
      color: tokens.colors.text,
      'letter-spacing': '1px',
    },
    // kbd：人文主题不太用，但保留 baseElements 的键帽样式（不覆盖）
    // a：primary 色 + 下划线
    a: {
      color: tokens.colors.primary,
      'text-decoration': 'underline',
    },
    // 规范 §2 divider：上下 margin 36px（比默认大一档，人文更大呼吸）
    hr: {
      border: 'none',
      height: '1px',
      'background-color': tokens.colors.border,
      'margin-top': '36px',
      'margin-bottom': '36px',
    },
    // 规范 §2.3 cover：图片不圆角（出版物封面纪律）
    img: {
      'max-width': '100%',
      display: 'block',
      'margin-top': '10px',
      'margin-right': 'auto',
      'margin-bottom': '10px',
      'margin-left': 'auto',
      'border-radius': '0',
    },
    // 规范 §1.2 字重对比：强调 500 不是 700（700 太硬）
    strong: { 'font-weight': '500', color: tokens.colors.text },
    em: { 'font-style': 'italic', color: tokens.colors.text },
  },

  // ============================================================
  // 代码块（规范 §1.1 code = textMuted 墨灰，不承担警示色）
  // ============================================================
  pre: {
    'background-color': tokens.colors.bgSoft,
    color: tokens.colors.text,
    'padding-top': '14px',
    'padding-right': '16px',
    'padding-bottom': '14px',
    'padding-left': '16px',
    'border-radius': '0', // 规范 §3.5：方版心，不圆角
    border: `1px solid ${tokens.colors.border}`,
    'overflow-x': 'auto',
    'white-space': 'pre',
    'max-width': '100%',
    'box-sizing': 'border-box',
    'box-shadow': 'inset -14px 0 10px -10px rgba(0,0,0,0.15)',
    'margin-top': '0',
    'margin-bottom': '22px',
    'font-size': '13px',
    'line-height': '1.7',
  },
  // 规范 §1.1：inline code 走 bgMuted 底 + textMuted 墨灰字（不是朱）
  code: {
    'background-color': tokens.colors.bgMuted,
    color: tokens.colors.code, // = textMuted
    padding: '2px 6px',
    'border-radius': '0',
    'font-size': '14px',
  },

  // ============================================================
  // Inline 强调（规范 §1.2 字重对比 + §1.3 朱砂稀缺纪律）
  // ============================================================
  inlineOverrides: {
    // 规范 §1.3：朱砂全文只出现"两处"（quoteCard 首字 + footer 钤印）
    // highlight 不能走 accent；改走 bgSoft 底 + text 色（保持"纸感"）
    highlight: {
      'background-color': tokens.colors.bgSoft,
      color: tokens.colors.text,
      padding: '0 3px',
      'border-radius': '0',
    },
    // 规范 §1.2：波浪线用 primary 墨褐，不引入第三色
    wavy: {
      'text-decoration': 'underline wavy',
      'text-decoration-color': tokens.colors.primary,
      'text-underline-offset': '3px',
    },
    // 规范 §1.2：关键词强调走 primary + 500（不是 700）
    emphasis: {
      color: tokens.colors.primary,
      'font-weight': '500',
    },
  },

  // ============================================================
  // 容器视觉（规范 §2 的 19 个 container）
  // ============================================================
  containerOverrides: {
    // 规范 §2.1 intro：题解 —— 左 2px primary 竖条 + bgSoft 底 + 两侧 20px 内缩
    intro: {
      'background-color': tokens.colors.bgSoft,
      'border-left': `2px solid ${tokens.colors.primary}`,
      'border-radius': '0',
      padding: '14px 20px 14px 22px',
      margin: '0 0 28px 0',
      color: tokens.colors.textMuted,
      'letter-spacing': '1.5px', // 规范：造倾斜感（不能用 italic）
    },
    // 规范 §2.2 author：书末小字落款 —— inline-block 胶囊 bgSoft + primary 14px + 无圆角
    author: {
      display: 'inline-block',
      'background-color': tokens.colors.bgSoft,
      'border-radius': '0',
      padding: '6px 14px',
      margin: '16px 0',
      color: tokens.colors.primary,
      'font-size': '14px',
      'letter-spacing': '1px',
    },
    // 规范 §2.3 cover：扉页 —— 图下紧跟 13px textMuted 居中题记，margin 36
    cover: {
      margin: '0 0 36px 0',
    },
    // admonition 四件套：variant 接管外壳；container 留空等 variant 注入
    // 规范 §2.10-2.13：tip=minimal-underline / info=accent-bar / warning=pill-tag / danger=ticket-notch
    // theme.variants.admonition 只能声明一个代表（literary 选 minimal-underline 签名）
    // 其他三种靠 markdown `variant=` 覆盖
    tip: {},
    warning: {},
    info: {},
    danger: {},
    // 规范 §2.6 quoteCard：题辞，走 magazine-dropcap variant
    //   外框 1px border + radius 0 + bgSoft + padding 28×24
    //   variant 自带 border-top/bottom 3px double + bg —— 此处 containerOverride 作强化兜底
    //   variant wrapperCSS 会覆盖 containerOverride，此处留 margin / padding 作记录
    quoteCard: {
      'background-color': tokens.colors.bgSoft,
      padding: '28px 24px',
      margin: '24px 0',
      'border-radius': '0',
      border: `1px solid ${tokens.colors.border}`,
    },
    // 规范 §2 highlight：着重段 —— bgSoft + 两侧 24px 内缩 + 无边框
    // 靠底色 + 内缩 + 加粗三件事完成重音；letter-spacing 1.5px
    highlight: {
      'background-color': tokens.colors.bgSoft,
      padding: '14px 24px',
      margin: '24px 0',
      'border-radius': '0',
      'letter-spacing': '1.5px',
      // 字重 500 由 variant/renderer 不承担 —— 主题层通过 inline emphasis 类完成
    },
    // 规范 §2 compare：夹注（column-card）—— 每栏 1px border + radius 0 + padding 16×18
    compare: { margin: '24px 0' },
    // 规范 §2 steps：卷次（timeline-dot）—— 拒绝 ribbon-chain
    //   variant 自带 border-left dotted + primary 圆点
    steps: { margin: '24px 0' },
    // 规范 §2.4 sectionTitle：cornered variant —— 左上书角折页 + 1px border 通栏
    //   margin 40px 0 18px（section 级别更大上 margin）
    sectionTitle: {
      margin: '40px 0 18px',
      'padding-bottom': '8px',
      'border-bottom': `1px solid ${tokens.colors.border}`,
    },
    // 规范 §2 footerCTA：卷尾 —— 顶部 dividerFlower（作者在 markdown 层手工放）+
    //   中间 13px textMuted + 右下 sealMark（footerCTA renderer 检测 assets.sealMark
    //   自动右对齐注入，见 pipeline/containers/footer.ts）
    //   padding 28px 0 20px 0，无底色无边框
    footerCTA: {
      margin: '36px 0',
      padding: '28px 0 20px 0',
      'background-color': 'transparent',
      'border-radius': '0',
    },
    // 规范 §2 recommend：卷末书单 —— bgSoft 底 + radius 0 + 14px 行距 1.9
    recommend: {
      margin: '28px 0',
      padding: '16px 20px',
      'background-color': tokens.colors.bgSoft,
      'border-radius': '0',
    },
    // 规范 §2 qrcode：钤印衬托 —— 图像 1px border + padding 8px 内衬 #fefefe
    //   容器本身无底色无边框
    qrcode: {
      margin: '28px 0',
      padding: '16px',
      'background-color': 'transparent',
      'border-radius': '0',
    },
  },

  // ============================================================
  // 骨架变体（规范 §2 每节 primary variant）
  // ============================================================
  variants: {
    // 规范 §2.10：tip 走 minimal-underline —— literary 签名气质（最轻、铅笔划）
    //   其他三态（warning=pill-tag / info=accent-bar / danger=ticket-notch）
    //   靠 markdown `variant=` 覆盖（见 sample-full.md 追加片段）
    admonition: 'minimal-underline',
    // 规范 §2.6：quoteCard 走 magazine-dropcap —— 题辞签名
    //   裸 blockquote 的"column-rule"双竖线气质由 elementOverrides.blockquote 代偿
    quote: 'magazine-dropcap',
    // 规范 §2.12：compare 走 column-card（甲说/乙说）—— 拒绝 ledger（效率软件审美）
    compare: 'column-card',
    // 规范 §2.13：steps 走 timeline-dot（卷一/卷二/卷三）—— 拒绝 ribbon-chain（课程卡片审美）
    steps: 'timeline-dot',
    // 规范 §2 divider：默认 flower（单云头）—— 人文主题 logo
    divider: 'flower',
    // 规范 §2.4：sectionTitle 走 cornered —— 左上书角折页
    sectionTitle: 'cornered',
    // 规范 §1.1 code 安静处理：bare 不用 header-bar（那是 tech-explainer 签名）
    codeBlock: 'bare',
  },

  // ============================================================
  // Templates（主题特化的 markdown 片段）
  // ============================================================
  templates: {
    ...commonTemplates,
    // 规范 §2.3 cover：扉页 + 13px 题记
    cover: `::: cover 卷首语
![封面占位](https://placehold.co/1200x630?text=humanism)

_写于春分后第二日，时雨初歇。_
:::
`,
    // 规范 §2.2 author：书末小字落款
    authorBar: `::: author 钟山 role=主笔
长读深耕，短评不妄。
:::
`,
    // 规范 §2.10 tip：minimal-underline 签名（主题默认），中文前缀"批注"
    tip: `::: tip 批注
旁批·眉批 —— 最轻的一档提示，无边框，仅标题下方一道短线。
:::
`,
  },
})
