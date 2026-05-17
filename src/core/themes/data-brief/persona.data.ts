/**
 * data-brief · 数据简报 · PersonaSpec
 *
 * 定位：晚点 LatePost / 财新数据 / 机器之心 / Morning Brew 式简报——
 * "数字是论点，图表是句子"。报告版面 + 数据蓝 + 黑底代码 + 直角硬边。
 *
 * 视觉 ground truth：docs/themes-specs/themes/11-data-brief.html。本 spec 把那份设计稿
 * 的 token / 字号 / 间距 / 容器骨架投影为 PersonaSpec，再由 specToTheme 投影为 Theme。
 *
 * 三条不可妥协决策：
 *   1. radius 全部为 0（直角硬边）—— 简报感的核心，圆角即"软"，软即"软文"
 *   2. primary = #1756d1 数据蓝（IBM Data 家族；不是 Bootstrap #007bff）
 *   3. 代码块黑底 #111418 + 浅字 #e5e7eb —— 与正文白底形成"终端 vs 报告"对照
 *
 * 签名容器 10 件：masthead / sectionTag / toc / kpiDashboard / barChart / qaBlock /
 *                  footnotes / colophon
 * 这些 renderer 在 src/pipeline/containers/databrief.ts 实现。
 */

import type { PersonaSpec } from '../_shared/spec'

export const spec: PersonaSpec = {
  id: 'data-brief',
  name: '数据简报',
  description: '数据蓝 + 黑底代码 + 直角硬边：晚点 / 财新数据 / Morning Brew 感',
  audience: '数据 newsletter / 数据简报 / 行业图表周刊',

  // ============================================================
  // 色板（来源：docs/themes-specs/themes/11-data-brief.html :root tokens）
  // ============================================================
  palette: {
    primary: '#1756d1', // 数据蓝（签名色 · kicker / 边框 / 数字下划）
    secondary: '#111418', // 近黑（masthead 下划线 / quote 左条 / section-tag bg）
    accent: '#1756d1', // = primary（data-brief 视觉里 accent 不独立）
    bg: '#ffffff', // 纯白底（外层 body 走 bgMuted）
    bgSoft: '#f5f7fa', // 卡片底面（toc / note.research-dense / data-card）
    bgMuted: '#eef0f2', // 外层衬底色（bar track / 外层 body bg）
    text: '#111418', // 近黑文字
    textMuted: '#5a6068', // 辅助文字（monospace 标注 / 副标题）
    textInverse: '#fefefe', // 反白（规避 SVG → PNG 透明化）
    border: '#e5e7eb', // 分割线
    code: '#1756d1', // inline code 蓝字（数据感）
  },

  // 语义四色（与设计稿 multi-callout INFO/TIP/WARN/STOP 同色相，accent 加深至 WCAG AA 4.5:1 达标）
  status: {
    tip: { accent: '#147a44', soft: '#dff1e6' }, // TIP 绿（4.58:1）
    info: { accent: '#1756d1', soft: '#dfe9fa' }, // INFO 蓝（= primary，5.5:1）
    warning: { accent: '#9e5c10', soft: '#faecd9' }, // WARN 橙（4.53:1）
    danger: { accent: '#b22d18', soft: '#fbdcd6' }, // STOP 红（4.97:1）
  },

  // ============================================================
  // 字号 / 间距 / 圆角（直角是简报的灵魂）
  // ============================================================
  typography: {
    baseSize: 14,
    lineHeight: 1.7,
    h1Size: 22, // 微信原生标题已渲 22 加粗黑 —— 本主题不再输出 H1
    h2Size: 16, // 章节标题（蓝色序号 + 粗黑）
    h3Size: 13, // 子标题
    letterSpacing: 0.3,
  },
  spacing: { paragraph: 12, section: 28, listItem: 4, containerPadding: 14 },
  radius: { sm: 0, md: 0, lg: 0 }, // 全 0 —— radius ≥ 1 直接打回

  // ============================================================
  // Decorations：作者只写 `## 标题` / `### 子标题`，**不写**编号。
  // 渲染层自动按出现顺序生成 "01/02/03" 和 "2.1/2.2" 蓝色 monospace 前缀。
  //   - level 2 → arabic-padded（01, 02, 03…）
  //   - level 3 → arabic-section（与父 h2 序号联动；如父是 02，第一节为 02.1）
  // 想列"附录/方法论"这类非数字段时,用专用容器（::: note variant=research-dense
  // / ::: footnotes / ::: appendix）即可，不要写到 h2——h2 全部走 autoNumber 不留豁免位。
  // ============================================================
  decorations: {
    headingPrefix: [
      {
        level: 2,
        autoNumber: 'arabic-padded',
        style: {
          color: 'primary',
          fontFamily: 'monospace',
          fontWeight: 700,
          marginRight: 8,
        },
      },
      {
        level: 3,
        autoNumber: 'arabic-section',
        style: {
          color: 'primary',
          fontFamily: 'monospace',
          fontWeight: 700,
          marginRight: 8,
        },
      },
    ],
  },

  // ============================================================
  // Motifs：极简，仅留 dividerFlower（两线 + 中央 6×6 蓝方块）+ 四态图标
  // ============================================================
  motifs: {
    // dividerFlower：设计稿 divider-ornament 原型（两线 + 中央 primary 方块）
    dividerFlower: {
      viewBox: [0, 0, 240, 8],
      width: 220,
      height: 8,
      primitives: [
        { type: 'line', x1: 0, y1: 4, x2: 110, y2: 4, stroke: '#e5e7eb', strokeWidth: 1 },
        { type: 'rect', x: 117, y: 1, w: 6, h: 6, fill: '#1756d1' },
        { type: 'line', x1: 130, y1: 4, x2: 240, y2: 4, stroke: '#e5e7eb', strokeWidth: 1 },
      ],
    },

    // dividerDots：三个 primary 小方块（备用 divider）
    dividerDots: {
      viewBox: [0, 0, 240, 8],
      width: 220,
      height: 8,
      primitives: [
        { type: 'rect', x: 108, y: 2, w: 4, h: 4, fill: '#1756d1' },
        { type: 'rect', x: 118, y: 2, w: 4, h: 4, fill: '#1756d1' },
        { type: 'rect', x: 128, y: 2, w: 4, h: 4, fill: '#1756d1' },
      ],
    },

    // 四态图标（方框直角风，与 radius=0 纪律统一）
    tipIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        { type: 'rect', x: 1, y: 1, w: 14, h: 14, stroke: '#147a44', strokeWidth: 1.5 },
        {
          type: 'path',
          d: 'M4,8 L7,11 L12,5',
          stroke: '#147a44',
          strokeWidth: 1.8,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        },
      ],
    },
    infoIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        { type: 'rect', x: 1, y: 1, w: 14, h: 14, stroke: '#1756d1', strokeWidth: 1.5 },
        { type: 'rect', x: 7, y: 3, w: 2, h: 2, fill: '#1756d1' },
        { type: 'rect', x: 7, y: 6, w: 2, h: 7, fill: '#1756d1' },
      ],
    },
    warningIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        { type: 'rect', x: 1, y: 1, w: 14, h: 14, stroke: '#9e5c10', strokeWidth: 1.5 },
        { type: 'rect', x: 7, y: 3, w: 2, h: 7, fill: '#9e5c10' },
        { type: 'rect', x: 7, y: 11, w: 2, h: 2, fill: '#9e5c10' },
      ],
    },
    dangerIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        { type: 'rect', x: 1, y: 1, w: 14, h: 14, stroke: '#b22d18', strokeWidth: 1.5 },
        {
          type: 'path',
          d: 'M4,4 L12,12 M12,4 L4,12',
          stroke: '#b22d18',
          strokeWidth: 1.8,
          strokeLinecap: 'round',
        },
      ],
    },

    // stepBadge：直角方形 + primary 底 + 反白数字
    stepBadge: {
      viewBox: [0, 0, 24, 24],
      width: 24,
      height: 24,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 8 },
      placeholders: ['N'],
      primitives: [
        { type: 'rect', x: 0, y: 0, w: 24, h: 24, fill: '#1756d1' },
        {
          type: 'text',
          x: 12,
          y: 17,
          content: '{N}',
          fontSize: 14,
          fontWeight: 700,
          fill: '#fefefe',
          textAnchor: 'middle',
        },
      ],
    },
  },

  // ============================================================
  // 骨架变体
  // ============================================================
  variants: {
    admonition: 'news-row', // 数据新闻紧凑单行（左 3px + INFO/TIP/WARN/STOP 徽章）
    quote: 'editorial-block', // 编辑部磁砖 pull-quote：左 6px 主色条 + 大号粗体 + uppercase 字距 byline，editorial 签名形态
    compare: 'data-card', // 顶 3px 色条 + 大号 monospace 数字（"纸 本 +37% / 屏 读 +210%"）
    steps: 'step-card', // 数据简报偏卡片化分步：浅底卡片 + 顶部 uppercase kicker
    divider: 'flower', // 用本主题自定义 dividerFlower 的"两线 + 蓝方块"
    sectionTitle: 'kicker-stack', // 上 uppercase kicker + 主标题，与 byline / masthead 同语汇
    codeBlock: 'bare', // pre 元素直接走主题 voice（黑底）
    note: 'smallcaps-kicker', // 顶 2px 主色条 + uppercase kicker，与签名容器同源
    footnotes: 'top-rule', // 顶部 hairline + 11px 密栏，财新简报底栏语言
    recommend: 'card-list',
    qrcode: 'follow-card', // 刊物订阅卡：左 QR + 右 kicker/title/desc 三行
    footerCTA: 'triptych-actions', // 三栏 CTA（赞同/收藏/转发）
    pullQuote: 'giant-mark',
    announcement: 'danger-bar',
    tableCard: 'rule-grid',
    gallery: 'duo',
    dialogue: 'qa-rows',
  },

  // ============================================================
  // 主题级 kicker 文案覆盖（数据简报中英混排母语）
  //
  // 简报刊母语 = 短、克制、栏目化；中英 monospace 双轨呼应 decorations 的 "01/02/03"
  // 序号语言。与 brutalist 的 `// CONTENTS` 终端注释、swiss-grid 的全英 INDEX 形成对比。
  // ============================================================
  kickers: {
    toc: '本期目录 · INDEX',
    qaBlock: '读者来函 · Q&A',
    qrFollowKicker: 'SUBSCRIBE',
    qrFollowTitle: '订阅本期简报',
    recommend: '延伸阅读 · FURTHER',
    footerCTATitle: '关注数据简报',
    colophonNextLabel: '下 期 ·',
    colophonIssueLabel: 'VOL ·',
    mastheadName: '数据简报',
  },

  // ============================================================
  // 签名容器：声明本主题独有的 7 件 data-brief 家族容器
  // 这些 renderer 在 pipeline/containers/databrief.ts 实现；conformance 测试会校验
  // 注册表里都有对应 markdown 名。
  // ============================================================
  signatureContainers: [
    'abstract', // tldr-block · 三句话读完本文
    'masthead', // 刊头
    'sectionTag', // 黑底白字小栏目标签
    'toc', // 三栏目录
    'kpiDashboard', // KPI 仪表盘
    'barChart', // 条形图
    'qaBlock', // 读者问答
    'footnotes', // 脚注 / 参考文献（variant=lined 默认；variant=inline-flow 用于长列表）
    'colophon', // 刊物收束栏（"下期 / 卷·期"双栏 monospace）
  ],

  // ============================================================
  // 元素级样式（典型设计稿）
  // ============================================================
  elements: {
    h1: {
      'font-size': '22px',
      'font-weight': '700',
      color: '#111418',
      'margin-top': '0',
      'margin-bottom': '8px',
      'line-height': '1.35',
      'letter-spacing': '-0.01em',
    },
    // 章节标题：蓝色 monospace 序号由 spec.decorations.headingPrefix 声明（见上方），
    // 管线统一执行 —— 作者只写 `## 01 章节名`，无需在文本里手写任何 HTML。
    // 字号 + 直角 + 无 border-bottom（区别于 default 主题的下划线）。
    h2: {
      'font-size': '16px',
      'font-weight': '700',
      color: '#111418',
      'margin-top': '28px',
      'margin-bottom': '10px',
      'line-height': '1.4',
      'padding-bottom': '0',
      'border-bottom': 'none',
      __reset: true,
    },
    h3: {
      'font-size': '13px',
      'font-weight': '700',
      color: '#111418',
      'margin-top': '16px',
      'margin-bottom': '8px',
      'line-height': '1.5',
    },
    h4: {
      'font-size': '13px',
      'font-weight': '600',
      color: '#111418',
      'margin-top': '14px',
      'margin-bottom': '6px',
      'line-height': '1.5',
    },
    h5: {
      'font-size': '14px',
      'font-weight': '600',
      color: '#111418',
      'margin-top': '14px',
      'margin-bottom': '6px',
      'line-height': '1.5',
      'letter-spacing': '0.3px',
    },
    h6: {
      'font-size': '12px',
      'font-weight': '600',
      color: '#5a6068',
      'margin-top': '12px',
      'margin-bottom': '4px',
      'line-height': '1.5',
      'letter-spacing': '1px',
      'text-transform': 'uppercase',
    },
    p: {
      'font-size': '14px',
      'line-height': '1.7',
      color: '#111418',
      'margin-top': '0',
      'margin-bottom': '12px',
    },
    // 设计稿 pull-quote 走裸 blockquote：左 3px 近黑 + 17px 中等粗 + 微紧字距 + attribution
    // 第二段（"—— 博尔赫斯"）由作者写在 blockquote 内的第二段
    blockquote: {
      __reset: true,
      'border-left': '3px solid #111418',
      'background-color': 'transparent',
      color: '#111418',
      padding: '4px 0 4px 14px',
      margin: '24px 0',
      'font-size': '17px',
      'font-weight': '500',
      'line-height': '1.55',
      'letter-spacing': '-0.005em',
      'border-radius': '0',
    },
    ul: { 'padding-left': '20px', 'margin-top': '0', 'margin-bottom': '14px' },
    ol: { 'padding-left': '20px', 'margin-top': '0', 'margin-bottom': '14px' },
    li: { 'margin-bottom': '4px', 'line-height': '1.7', color: '#111418' },
    strong: { 'font-weight': '700', color: '#111418' },
    em: { 'font-style': 'italic', color: '#111418' },
    a: {
      color: '#1756d1',
      'text-decoration': 'none',
      'border-bottom': '1px solid #1756d1',
    },
    hr: {
      border: 'none',
      height: '1px',
      'background-color': '#e5e7eb',
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
    // 代码块：黑底 + 浅字（终端风）；inline-style 走 code 元素
    pre: {
      __reset: true,
      'background-color': '#111418',
      color: '#e5e7eb',
      padding: '12px 14px',
      margin: '12px 0 20px',
      'border-radius': '0',
      'overflow-x': 'auto',
      'white-space': 'pre',
      'max-width': '100%',
      'box-sizing': 'border-box',
      'box-shadow': 'inset -14px 0 10px -10px rgba(0,0,0,0.4)',
      'font-size': '12px',
      'line-height': '1.8',
    },
    // inline code：蓝字 + 浅底（设计稿 inline-code 风格）
    code: {
      'background-color': '#f5f7fa',
      color: '#1756d1',
      padding: '1px 5px',
      'border-radius': '0',
      'font-size': '12px',
    },
    // 苏黎世新闻数据栏：上下 1px 黑实线（无侧边框）+ th 极小字 letter-spacing（图表表头风）
    table: {
      'border-collapse': 'collapse',
      width: '100%',
      'margin-top': '0',
      'margin-bottom': '18px',
      'font-size': '12px',
      'border-radius': '0',
    },
    th: {
      'background-color': 'transparent',
      color: '#5a6068',
      border: 'none',
      'border-top': '1px solid #111418',
      'border-bottom': '1px solid #111418',
      padding: '4px 8px',
      'font-weight': '700',
      'text-align': 'left',
      'letter-spacing': '0.8px', // 极小字宽字距：苏黎世图表表头特征
      'font-size': '10px',
    },
    td: {
      border: 'none',
      'border-bottom': '1px solid #e5e7eb',
      padding: '4px 8px',
      color: '#111418',
    },
    // 极简方块键帽：radius 0 直角 + monospace 感 + 紧凑 padding（简报直角纪律）
    kbd: {
      display: 'inline-block',
      'background-color': '#eef0f2',
      color: '#111418',
      border: '1px solid #e5e7eb',
      'border-bottom-width': '2px',
      'border-radius': '0',
      padding: '1px 5px',
      'font-size': '11px',
      'line-height': '1.4',
      'letter-spacing': '0',
      'vertical-align': 'middle',
    },
  },

  // ============================================================
  // 内联强调
  // ============================================================
  inline: {
    // highlight 走 INFO soft 浅蓝底（保持数据感单色系）
    highlight: {
      'background-color': '#dfe9fa',
      color: '#111418',
      padding: '0 4px',
      'border-radius': '0',
    },
    wavy: {
      'text-decoration': 'underline wavy',
      'text-decoration-color': '#1756d1',
      'text-underline-offset': '3px',
    },
    emphasis: {
      color: '#1756d1',
      'font-weight': '600',
    },
    del: {
      color: '#5a6068',
      'text-decoration': 'line-through',
    },
    ins: {
      color: '#1756d1',
      'text-decoration': 'underline',
    },
  },

  // ============================================================
  // 容器视觉（每个签名容器在此微调；renderer 提供 fallback，spec 覆盖优先）
  // ============================================================
  containers: {
    // 通用容器：保持克制
    intro: {
      'background-color': '#f5f7fa',
      'border-left': '3px solid #1756d1',
      'border-radius': '0',
      padding: '12px 14px 12px 17px',
      margin: '0 0 22px 0',
      color: '#111418',
    },
    // author（撰文/编辑横排）：下分割线 + 小字
    author: {
      __reset: true,
      'border-bottom': '1px solid #e5e7eb',
      'padding-bottom': '18px',
      margin: '0 0 22px 0',
      'font-size': '11px',
      color: '#5a6068',
    },
    cover: { margin: '0 0 16px 0' },
    tip: {},
    warning: {},
    info: {},
    danger: {},
    // note 在 data-brief 里映射为"灰底小字补注"：浅底 + 10px 紧凑字号 + textMuted。
    // 主题级 voice。各 variant 在此基础上覆盖：
    //   - research-dense（= 旧 methodology 容器）：标签头走粗体 textPrimary
    //   - editorial-stripe（= 旧 editor-note 容器）：主色左条 + kicker（"编 者 按"）
    note: {
      __reset: true,
      'background-color': '#f5f7fa',
      padding: '10px 12px',
      margin: '16px 0',
      'font-size': '10px',
      'line-height': '1.7',
      color: '#5a6068',
      'border-radius': '0',
    },
    quoteCard: {
      'background-color': '#f5f7fa',
      padding: '22px 24px',
      margin: '20px 0',
      'border-radius': '0',
    },
    highlight: {
      'background-color': '#f5f7fa',
      padding: '14px 16px',
      margin: '16px 0',
      'border-radius': '0',
      border: '1px solid #e5e7eb',
    },
    compare: { margin: '16px 0 20px' },
    steps: { margin: '20px 0' },
    sectionTitle: {
      __reset: true,
      margin: '28px 0 10px',
      'padding-bottom': '0',
      'border-bottom': 'none',
    },
    // footer-cta：设计稿三栏（赞同 / 收藏 / 转发）。本主题不依赖 cta=/href=
    // 而是让作者直接用 markdown 写"♡ 赞同 · ★ 收藏 · ↗ 转发"——renderer 自身的
    // 胶囊按钮在数据简报里太"营销"；保持克制即可
    footerCTA: {
      __reset: true,
      margin: '22px 0',
      padding: '0',
      'background-color': 'transparent',
      'border-radius': '0',
    },
    recommend: {
      margin: '20px 0',
      padding: '12px 14px',
      'background-color': '#f5f7fa',
      'border-radius': '0',
      'border-left': '3px solid #5a6068',
    },
    qrcode: {
      margin: '22px 0',
      padding: '14px',
      'background-color': '#f5f7fa',
      'border-left': '3px solid #1756d1',
      'border-radius': '0',
    },
    abstract: {
      __reset: true,
      'border-left': '3px solid #1756d1',
      padding: '4px 0 4px 14px',
      margin: '0 0 22px 0',
      'background-color': 'transparent',
      'border-radius': '0',
    },
    keyNumber: {
      margin: '18px 0',
      padding: '16px 18px',
      'background-color': '#f5f7fa',
      'border-top': '3px solid #1756d1',
      'border-radius': '0',
    },

    // data-brief 家族 7 件签名容器：renderer 已有 fallback，这里收紧细节
    masthead: {
      margin: '0 0 20px 0',
      'padding-bottom': '10px',
      'border-bottom': '1px solid #111418',
    },
    sectionTag: { margin: '0 0 14px 0' },
    toc: {
      'background-color': '#f5f7fa',
      padding: '12px 14px',
      margin: '0 0 24px 0',
      'border-radius': '0',
    },
    kpiDashboard: {
      'background-color': '#f5f7fa',
      'border-top': '1px solid #111418',
      'border-bottom': '1px solid #111418',
      padding: '18px 16px 16px',
      margin: '0 0 28px 0',
      'border-radius': '0',
    },
    barChart: {
      'background-color': '#f5f7fa',
      border: '1px solid #e5e7eb',
      padding: '16px 14px',
      margin: '20px 0 24px',
      'border-radius': '0',
    },
    qaBlock: {
      'border-top': '1px solid #e5e7eb',
      'border-bottom': '1px solid #e5e7eb',
      padding: '14px 0',
      margin: '22px 0',
      'border-radius': '0',
    },
    // footnotes 两骨架共用（layout 由 variants/footnotes/{lined,inline-flow} 注入）
    footnotes: {
      'border-top': '1px solid #e5e7eb',
      margin: '14px 0',
      'font-size': '10px',
      color: '#5a6068',
    },
    // colophon · 刊物收束栏："下期 / 卷·期"双栏，上分割线 1px 近黑（强分隔）
    // renderer 自带 display:table，spec 这里仅承诺分隔线 + 间距
    colophon: {
      __reset: true,
      'border-top': '1px solid #111418',
      'margin-top': '20px',
      'padding-top': '12px',
      'border-radius': '0',
    },
    // 极小字来源注脚一体感：letter-spacing 宽字距 + textMuted + 无底色（苏黎世简报图注）
    imageCaption: {
      margin: '2px 0 16px 0',
      'text-align': 'left',
      'font-size': '10px',
      color: '#5a6068',
      'letter-spacing': '0.5px',
    },
    // 事件 / 期号时间线：左 3px 数据蓝竖条 + bgSoft 底（与 note.editorial-stripe 同语汇）
    timeline: {
      margin: '20px 0',
      'border-left': '3px solid #1756d1',
      'background-color': '#f5f7fa',
      padding: '12px 14px 12px 17px',
      'border-radius': '0',
    },
  },

  // ============================================================
  // 模板片段（作者侧示例 · 不影响 CSS 生成；commonTemplates 隐式合并）
  // ============================================================
  templates: {
    cover: `::: masthead 慢读简报 issue="004" date="2026.04.22"
:::

::: section-tag
深度
:::

# 在无人深夜，重新学习如何阅读一本书
`,
    authorBar: `::: author
撰文 **罗向量**　编辑 **陈栈桥**
:::
`,
    footerCTA: `::: footer-cta
♡ 赞同　·　★ 收藏　·　↗ 转发
:::
`,
    tip: `::: tip 要点
本期核心结论。
:::
`,
  },

  meta: {
    createdAt: '2026-05-13',
    ownerNotes:
      '主题 11 数据简报 · 三条不可妥协：radius=0、primary #1756d1、代码黑底浅字。' +
      '10 件 data-brief 家族签名容器 renderer 在 pipeline/containers/databrief.ts。' +
      '蓝色 monospace 章节序号由 decorations.headingPrefix 声明、管线统一注入；' +
      '作者侧不写任何内联 HTML——内联 HTML 退出写作契约保护。',
  },
}

export default spec
