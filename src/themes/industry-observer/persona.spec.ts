/**
 * industry-observer · 行业观察周刊 · PersonaSpec
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

import type { PersonaSpec } from '../_shared/spec'

export const spec: PersonaSpec = {
  id: 'industry-observer',
  name: '行业观察',
  description: 'Stratechery / Benedict Evans 家族，业内人写给业内人的周刊深度稿',
  audience: '内参 newsletter / 行业周报 / analyst essay 读者',

  // ============================================================
  // 色板（规范 §1.1）
  // ============================================================
  palette: {
    primary: '#24364f', // 冷黑主色，Benedict Evans 路径
    secondary: '#3d5063', // 雾蓝，primary 浅 18%，用于 h3 / byline / 矩阵表头
    accent: '#b86f2a', // 晚点橙金，稀缺信号色（issueStamp / .num / strong 信号位）
    bg: '#fbf8f1', // Stratechery 米 —— 3% 黄度，微暖不甜
    bgSoft: '#f5efe1', // 档案米深一级（quoteCard / recommend / footer）
    bgMuted: '#ece3cf', // 期号卡背（issueStamp 底 / compare 表头 / code 底）
    text: '#1a2332', // 观察者墨 —— 比 primary 再深一档，压过所有装饰
    textMuted: '#5a6778', // 批注灰蓝 —— 带蓝调避免与暖米底打架
    textInverse: '#fefefe', // 反白：胶囊字色，规避 #fff 平台透明化
    border: '#e0d6c0', // 米纸边：暖灰，与米底同族
    code: '#24364f', // inline code 字色 = primary（observer 稿里 code 极少，冷静即可）
  },

  // 语义四色（规范 §1.1）：色相均匀分布在色轮，newsletter 胶囊语言本就轻
  status: {
    tip: { accent: '#2d6a5a', soft: '#dceae4' }, // 墨绿（要点 TL;DR）
    info: { accent: '#3d5a75', soft: '#dce4ec' }, // 烟蓝（背景 Context）
    warning: { accent: '#8a5a1a', soft: '#ece0c5' }, // 琥珀褐（存疑 Questioned）
    danger: { accent: '#8a2a1c', soft: '#ecd4cf' }, // 铁锈红（错判 Flawed）
  },

  // ============================================================
  // 字号 / 间距 / 圆角（规范 §1.2 / §2 / §3.12）
  // ============================================================
  typography: {
    baseSize: 16, // 比 academic 的 15/1.75 更松 —— 长读感是 industry 核心
    lineHeight: 1.85,
    h1Size: 26, // 可读性优先，不压阵
    h2Size: 20, // newsletter 不做章节通栏线
    h3Size: 17, // 降到 600 避免和 h2 抢
    letterSpacing: 0.3, // 比 academic 紧，比 people-story 更 neutral
  },
  spacing: {
    paragraph: 18,
    section: 32, // glyph 菱形 ornament 上下呼吸
    listItem: 10,
    containerPadding: 18,
  },
  radius: { sm: 2, md: 3, lg: 4 }, // 比 business 的 0/2/4 略松一档，保留 newsletter 温度

  // ============================================================
  // Motifs（规范 §1.3 · 五件互不撞车）
  // ============================================================
  motifs: {
    // h2Prefix · 3×13 primary 竖条 + 3×3 accent 橙金小方块
    h2Prefix: {
      viewBox: [0, 0, 11, 14],
      width: 11,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 10 },
      primitives: [
        { type: 'rect', x: 0, y: 0, w: 3, h: 13, fill: '#24364f' },
        { type: 'rect', x: 7, y: 5, w: 3, h: 3, fill: '#b86f2a' },
      ],
    },

    // sectionCorner · 3×3 accent 橙金小方块（非 L 形 —— L 形是 business 专属）
    sectionCorner: {
      viewBox: [0, 0, 6, 6],
      width: 5,
      height: 5,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 7 },
      primitives: [{ type: 'rect', x: 0, y: 0, w: 3, h: 3, fill: '#b86f2a' }],
    },

    // quoteMark · 方头双引号（28×22，primary 实心），比 business 更矮更粗
    quoteMark: {
      viewBox: [0, 0, 32, 24],
      width: 28,
      height: 22,
      inlineStyle: { display: 'inline-block', verticalAlign: 'top', marginRight: 4 },
      primitives: [
        {
          type: 'path',
          d: 'M2,4 L10,4 L10,8 L6,8 L6,14 L10,14 L10,18 L2,18 Z M16,4 L24,4 L24,8 L20,8 L20,14 L24,14 L24,18 L16,18 Z',
          fill: '#24364f',
        },
      ],
    },

    // dividerFlower · 中央菱形 ornament（规范 §1.3 ④）
    // 简单实心菱形 8×8，primary 填充；与 literary 的 ❦ 花饰刻意区分
    dividerFlower: {
      viewBox: [0, 0, 24, 12],
      width: 18,
      height: 10,
      primitives: [
        { type: 'path', d: 'M12,2 L16,6 L12,10 L8,6 Z', fill: '#24364f' },
      ],
    },

    // dividerDots · 三点横排（极淡，border 米纸边色，克制）
    dividerDots: {
      viewBox: [0, 0, 240, 8],
      width: 220,
      height: 8,
      primitives: [
        { type: 'circle', cx: 108, cy: 4, r: 1.6, fill: '#e0d6c0' },
        { type: 'circle', cx: 120, cy: 4, r: 1.6, fill: '#e0d6c0' },
        { type: 'circle', cx: 132, cy: 4, r: 1.6, fill: '#e0d6c0' },
      ],
    },

    // dividerWave · 保留但本主题默认走 glyph variant（规范 §1.3 禁用 K 线语义 wave）
    // 中性 3 段短 dash，作为资产契约兜底
    dividerWave: {
      viewBox: [0, 0, 240, 8],
      width: 220,
      height: 8,
      primitives: [
        { type: 'line', x1: 60, y1: 4, x2: 90, y2: 4, stroke: '#e0d6c0', strokeWidth: 1.2 },
        { type: 'line', x1: 105, y1: 4, x2: 135, y2: 4, stroke: '#e0d6c0', strokeWidth: 1.2 },
        { type: 'line', x1: 150, y1: 4, x2: 180, y2: 4, stroke: '#e0d6c0', strokeWidth: 1.2 },
      ],
    },

    // tipIcon（要点 TL;DR）：列表三横线 —— "要点摘要"语义
    tipIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        { type: 'line', x1: 3, y1: 4, x2: 11, y2: 4, stroke: '#2d6a5a', strokeWidth: 1.4, strokeLinecap: 'round' },
        { type: 'line', x1: 3, y1: 7, x2: 11, y2: 7, stroke: '#2d6a5a', strokeWidth: 1.4, strokeLinecap: 'round' },
        { type: 'line', x1: 3, y1: 10, x2: 8, y2: 10, stroke: '#2d6a5a', strokeWidth: 1.4, strokeLinecap: 'round' },
      ],
    },

    // infoIcon（背景 Context）：圆框 + i 柱 —— 经典"信息"
    infoIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        { type: 'circle', cx: 7, cy: 7, r: 5.5, stroke: '#3d5a75', strokeWidth: 1.2 },
        { type: 'rect', x: 6.4, y: 3.4, w: 1.2, h: 1.2, fill: '#3d5a75' },
        { type: 'rect', x: 6.4, y: 5.6, w: 1.2, h: 5, fill: '#3d5a75' },
      ],
    },

    // warningIcon（存疑 Questioned）：问号 —— 与传统"三角警告"区分（那是 business 专属）
    warningIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        { type: 'circle', cx: 7, cy: 7, r: 5.5, stroke: '#8a5a1a', strokeWidth: 1.2 },
        {
          type: 'path',
          d: 'M5.2,5.2 C5.2,4 6,3.2 7,3.2 C8,3.2 8.8,4 8.8,5 C8.8,5.8 8.2,6.2 7.5,6.8 L7,7.5 L7,8.5',
          stroke: '#8a5a1a',
          strokeWidth: 1.2,
          strokeLinecap: 'round',
        },
        { type: 'rect', x: 6.4, y: 10, w: 1.2, h: 1.2, fill: '#8a5a1a' },
      ],
    },

    // dangerIcon（错判 Flawed）：交叉（×）—— 勘误条审美，比 business 的火警色更冷
    dangerIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        { type: 'circle', cx: 7, cy: 7, r: 5.5, stroke: '#8a2a1c', strokeWidth: 1.2 },
        { type: 'line', x1: 4.5, y1: 4.5, x2: 9.5, y2: 9.5, stroke: '#8a2a1c', strokeWidth: 1.4, strokeLinecap: 'round' },
        { type: 'line', x1: 9.5, y1: 4.5, x2: 4.5, y2: 9.5, stroke: '#8a2a1c', strokeWidth: 1.4, strokeLinecap: 'round' },
      ],
    },

    // stepBadge(N) · 24×24 实心圆 + 白数字印章（timeline-dot variant 不消费，但保留作 variant 切换兜底）
    stepBadge: {
      viewBox: [0, 0, 24, 24],
      width: 24,
      height: 24,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 8 },
      placeholders: ['N'],
      primitives: [
        { type: 'circle', cx: 12, cy: 12, r: 11, fill: '#24364f' },
        {
          type: 'text',
          x: 12,
          y: 17,
          content: '{N}',
          fontSize: 15,
          fontWeight: 700,
          fill: '#fefefe',
          textAnchor: 'middle',
        },
      ],
    },

    // issueStamp(issue,date,kind) · 期号戳（industry 的 DNA）
    // 双线矩形框 + 中英混排 + 字距 1.5px 疏朗。由 cover/author/footerCTA 共享注入。
    // Phase 2 偏差：原实现按参数空串条件拼接；spec 模板固定 `ISSUE #{issue} · {date} · {kind}`；
    // 内框 stroke-width 0.5 受 validateSpec ≥1 约束提升到 1（视觉近乎不可辨）。
    issueStamp: {
      viewBox: [0, 0, 260, 24],
      width: 260,
      height: 24,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle' },
      placeholders: ['issue', 'date', 'kind'],
      primitives: [
        { type: 'rect', x: 0.5, y: 0.5, w: 259, h: 23, stroke: '#b86f2a', strokeWidth: 1 },
        { type: 'rect', x: 3, y: 3, w: 254, h: 18, stroke: '#b86f2a', strokeWidth: 1, opacity: 0.55 },
        {
          type: 'text',
          x: 10,
          y: 16,
          content: 'ISSUE #{issue} · {date} · {kind}',
          fontSize: 14,
          fontWeight: 600,
          fill: '#b86f2a',
          letterSpacing: 1.5,
        },
      ],
    },
  },

  // ============================================================
  // 骨架变体（规范 §2）
  // ============================================================
  variants: {
    admonition: 'pill-tag', // tip 签名：胶囊悬挂
    quote: 'column-rule', // quoteCard：左右双竖线，Benedict Evans 风 pull-quote
    compare: 'column-card', // 多列矩阵；拒绝 ledger
    steps: 'timeline-dot', // 拒绝 number-circle / ribbon-chain
    divider: 'glyph', // 中央菱形 ◆
    sectionTitle: 'cornered', // 左上 3×3 accent 方块
    codeBlock: 'bare', // code 安静处理；不做 header-bar 语言标签带
  },

  signatureContainers: ['cover', 'author', 'footerCTA', 'abstract', 'keyNumber', 'seeAlso'],

  // ============================================================
  // 元素级样式（规范 §1.2）
  // ============================================================
  elements: {
    h1: {
      'font-size': '26px',
      'font-weight': '700',
      color: '#1a2332',
      'margin-top': '28px',
      'margin-bottom': '16px',
      'line-height': '1.4',
      'letter-spacing': '0.4px',
    },
    h2: {
      'font-size': '20px',
      'font-weight': '700',
      color: '#1a2332',
      'margin-top': '32px',
      'margin-bottom': '14px',
      'line-height': '1.45',
      'letter-spacing': '0.3px',
      'border-bottom': 'none',
      'padding-bottom': '0',
    },
    h3: {
      'font-size': '17px',
      'font-weight': '600',
      color: '#1a2332',
      'margin-top': '24px',
      'margin-bottom': '10px',
      'line-height': '1.55',
      'letter-spacing': '0.2px',
    },
    h4: {
      'font-size': '15px',
      'font-weight': '600',
      color: '#1a2332',
      'margin-top': '20px',
      'margin-bottom': '8px',
      'line-height': '1.5',
      'letter-spacing': '0.2px',
    },
    p: {
      'font-size': '16px',
      'line-height': '1.85',
      color: '#1a2332',
      'margin-top': '0',
      'margin-bottom': '18px',
      'letter-spacing': '0.3px',
    },
    blockquote: {
      'border-left': '1px solid #e0d6c0',
      'border-right': 'none',
      'background-color': 'transparent',
      color: '#5a6778',
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
      color: '#1a2332',
      'letter-spacing': '0.3px',
    },
    strong: {
      'font-weight': '600',
      color: '#24364f',
    },
    em: { 'font-style': 'italic', color: '#1a2332' },
    a: {
      color: '#24364f',
      'text-decoration': 'underline',
      'text-underline-offset': '3px',
    },
    hr: {
      border: 'none',
      height: '1px',
      'background-color': '#e0d6c0',
      'margin-top': '32px',
      'margin-bottom': '32px',
    },
    img: {
      'max-width': '100%',
      display: 'block',
      'margin-top': '12px',
      'margin-right': 'auto',
      'margin-bottom': '12px',
      'margin-left': 'auto',
      'border-radius': '3px',
    },
    pre: {
      'background-color': '#ece3cf',
      color: '#1a2332',
      'padding-top': '14px',
      'padding-right': '16px',
      'padding-bottom': '14px',
      'padding-left': '16px',
      'border-radius': '3px',
      border: '1px solid #e0d6c0',
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
    code: {
      'background-color': '#ece3cf',
      color: '#24364f',
      padding: '1px 5px',
      'border-radius': '2px',
      'font-size': '14px',
      'font-weight': '500',
    },
  },

  // ============================================================
  // 内联强调（规范 §1.2 / §3.1）
  // ============================================================
  inline: {
    highlight: {
      'background-color': '#f5efe1',
      color: '#1a2332',
      padding: '0 3px',
      'border-radius': '2px',
    },
    wavy: {
      'text-decoration': 'underline wavy',
      'text-decoration-color': '#b86f2a',
      'text-underline-offset': '3px',
    },
    emphasis: {
      color: '#24364f',
      'font-weight': '600',
    },
  },

  // ============================================================
  // 容器视觉（规范 §2）
  // ============================================================
  containers: {
    intro: {
      'background-color': 'transparent',
      'border-left': '3px solid #b86f2a',
      'border-radius': '0',
      padding: '14px 16px 14px 17px',
      margin: '0 0 24px 0',
      color: '#1a2332',
    },
    author: {
      'background-color': 'transparent',
      'border-bottom': '1px solid #e0d6c0',
      'border-radius': '0',
      padding: '10px 0',
      margin: '0 0 24px 0',
    },
    cover: {
      margin: '0 0 32px 0',
    },
    tip: {},
    warning: {},
    info: {},
    danger: {},
    quoteCard: {
      'background-color': '#f5efe1',
      padding: '20px 28px',
      margin: '28px 0',
      'border-radius': '3px',
    },
    highlight: {
      'background-color': '#f5efe1',
      'border-left': '3px solid #b86f2a',
      padding: '8px 14px 8px 16px',
      margin: '20px 0',
      'border-radius': '2px',
    },
    compare: { margin: '24px 0' },
    steps: { margin: '24px 0' },
    sectionTitle: {
      __reset: true,
      margin: '36px 0 16px',
      'padding-bottom': '8px',
    },
    footerCTA: {
      margin: '40px 0 0 0',
      padding: '18px 20px',
      'background-color': 'transparent',
      'border-top': '1.5px solid #24364f',
      'border-bottom': '1.5px solid #24364f',
      'border-radius': '0',
    },
    recommend: {
      margin: '24px 0',
      padding: '16px 18px',
      'background-color': '#f5efe1',
      'border-radius': '3px',
    },
    qrcode: {
      margin: '24px auto',
      padding: '0',
      'background-color': 'transparent',
      'border-radius': '0',
    },
  },

  // ============================================================
  // Templates —— 仅声明对 commonTemplates 的覆盖
  // ============================================================
  templates: {
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
    // 规范 §2.7 footerCTA：Newsletter 订阅（非 business 投资号语境）
    footerCTA: `::: footer-cta 订阅「某某观察」 cta=扫码订阅 ▸ issue=023 date=2025-04-20 kind=周刊
每周二清晨送到，30 分钟读完。不追热点，不发快讯，只讲值得下判断的行业变化。
:::
`,
  },

  meta: {
    createdAt: '2026-04-20',
    ownerNotes:
      'Phase 2 migration: issueStamp 模板化后失去"空参数跳过"条件渲染（固定 ISSUE #{issue} · {date} · {kind}）；内框 stroke-width 0.5 → 1 以过 validateSpec。byte 级差异仅在 <text> 属性序（text-anchor 位置）——承袭 default pilot 渲染器。',
  },
}

export default spec
