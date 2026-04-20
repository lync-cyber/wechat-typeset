/**
 * literary-humanism · 人文札记 · PersonaSpec
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
 *   4. stepBadge 数字色 = primary 墨褐（不用朱砂）
 *   5. 所有容器 radius = 0（方版心是书，圆角是卡片）
 *
 * 迁移：Phase 2 迁移自 legacy index.ts + assets.ts；strokeWidth 0.6/0.8/0.9 → 1
 * （validator 硬下限，公众号光栅化友好），其余视觉细节 byte-identical。
 */

import type { PersonaSpec } from '../_shared/spec'

export const spec: PersonaSpec = {
  id: 'literary-humanism',
  name: '人文札记',
  description: '宋椠古籍 + 克制留白，给散文、书评、长评留足呼吸',
  audience: '人文非虚构（散文 / 书评 / 长评 / 札记）',

  // ============================================================
  // 色板（规范 §1.1 色彩表）
  // ============================================================
  palette: {
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
  },

  // 语义四色（规范 §1.1 语义色表：米底 #f4efe3 上 AA ≥ 4.5:1，色相距离 ≥ 120°）
  status: {
    tip: { accent: '#4a6b3e', soft: '#e3e8d6' }, // 批注（灰青绿，5.1:1）
    warning: { accent: '#8a6428', soft: '#efe3c9' }, // 商榷（黄褐，4.7:1）
    info: { accent: '#3d5a75', soft: '#dce3ec' }, // 案语（青，5.4:1）
    danger: { accent: '#8e3a2d', soft: '#ecd6cf' }, // 校勘（暗朱红，5.3:1）
  },

  // ============================================================
  // 字号 / 间距 / 圆角
  // ============================================================
  typography: {
    // 规范 §1.2 Scale + §3.7 红线：baseSize 16 不许动（人文气质底线）
    baseSize: 16,
    // 唯一敢给 2.0 的主题 —— 人文札记的签名
    lineHeight: 2.0,
    // 规范 §1.2：h1 26（在 h2 之上拔高 1px）
    h1Size: 26,
    // 规范 §1.2：h2 19（原 20 过于教科书，19 + 2px 字距 = 克制）
    h2Size: 19,
    // 规范 §1.2：h3 16 与正文同号，靠字距区分
    h3Size: 16,
    // 规范 §3.8 红线：字距是人文主题的声带 —— 正文 1px
    letterSpacing: 1.0,
  },
  // 规范 §2 divider：上下 margin 提到 36px（人文更大呼吸）
  spacing: { paragraph: 22, section: 36, listItem: 12, containerPadding: 18 },
  // 规范 §3.5：所有容器默认 radius 0（方版心是书，圆角是卡片）
  radius: { sm: 0, md: 0, lg: 0 },

  // ============================================================
  // Motifs（11 件：h2Prefix / 3 divider / sectionCorner / 4 icon / stepBadge / sealMark）
  // 刻意不导出 quoteMark（规范 §2.6 —— 与 default 同策略）
  // ============================================================
  motifs: {
    // h2Prefix · 版框竖条（规范 §1.3 ①）
    // viewBox 4×22，左侧 rect x=0 y=0 w=2 h=20 fill=primary，仅此而已。
    h2Prefix: {
      viewBox: [0, 0, 4, 22],
      width: 4,
      height: 20,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 10 },
      primitives: [{ type: 'rect', x: 0, y: 0, w: 2, h: 20, fill: '#5a4a3a' }],
    },

    // dividerFlower · 如意云头三连（规范 §1.3 ②）
    // 两侧 border 色长线各 100px + 中央三连云头 path + 下方 accent 朱点。
    dividerFlower: {
      viewBox: [0, 0, 240, 18],
      width: 220,
      height: 18,
      primitives: [
        { type: 'line', x1: 4, y1: 9, x2: 104, y2: 9, stroke: '#cfc3a8', strokeWidth: 1 },
        { type: 'line', x1: 136, y1: 9, x2: 236, y2: 9, stroke: '#cfc3a8', strokeWidth: 1 },
        {
          type: 'path',
          d: 'M104,9 A5.33,5.33 0 0 1 114.67,9 A5.33,5.33 0 0 1 125.33,9 A5.33,5.33 0 0 1 136,9 L136,13 L104,13 Z',
          fill: '#5a4a3a',
          opacity: 0.82,
        },
        { type: 'circle', cx: 120, cy: 16, r: 1.5, fill: '#9a3b2e', opacity: 0.85 },
      ],
    },

    // dividerDots · 版心回纹单枚（规范 §1.3 ③）
    // 中央 10×10 外框 + 内部 L 形双折线；两侧 border 色细线。
    // 注：源 strokeWidth 0.8 → 1（validator 硬下限）。
    dividerDots: {
      viewBox: [0, 0, 240, 12],
      width: 220,
      height: 12,
      primitives: [
        { type: 'line', x1: 0, y1: 6, x2: 108, y2: 6, stroke: '#cfc3a8', strokeWidth: 1 },
        { type: 'line', x1: 132, y1: 6, x2: 240, y2: 6, stroke: '#cfc3a8', strokeWidth: 1 },
        {
          type: 'rect',
          x: 115,
          y: 1,
          w: 10,
          h: 10,
          stroke: '#5a4a3a',
          strokeWidth: 1,
          opacity: 0.7,
        },
        {
          type: 'path',
          d: 'M117,3 L123,3 L123,9',
          stroke: '#5a4a3a',
          strokeWidth: 1,
          opacity: 0.7,
        },
        {
          type: 'path',
          d: 'M119,5 L121,5 L121,7',
          stroke: '#5a4a3a',
          strokeWidth: 1,
          opacity: 0.7,
        },
      ],
    },

    // dividerWave · 缠枝（规范 §2 divider：section 级别超大分隔）
    // S 曲线主干 + 两对 ellipse/circle 花点（primary ellipse + accent circle）。
    dividerWave: {
      viewBox: [0, 0, 240, 20],
      width: 220,
      height: 20,
      primitives: [
        {
          type: 'path',
          d: 'M20,10 C60,2 100,18 140,10 C170,5 200,14 220,10',
          stroke: '#5a4a3a',
          strokeWidth: 1,
          opacity: 0.6,
        },
        { type: 'ellipse', cx: 80, cy: 6, rx: 3, ry: 1.4, fill: '#5a4a3a', opacity: 0.55 },
        { type: 'circle', cx: 80, cy: 6, r: 1.1, fill: '#9a3b2e', opacity: 0.75 },
        { type: 'ellipse', cx: 160, cy: 14, rx: 3, ry: 1.4, fill: '#5a4a3a', opacity: 0.55 },
        { type: 'circle', cx: 160, cy: 14, r: 1.1, fill: '#9a3b2e', opacity: 0.75 },
      ],
    },

    // sectionCorner · 书角折页（规范 §2.4）
    // 双折边外框 + 内部 L 折线，去掉朱点（稀缺纪律）。
    sectionCorner: {
      viewBox: [0, 0, 20, 20],
      width: 16,
      height: 16,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 8 },
      primitives: [
        {
          type: 'path',
          d: 'M2,2 L14,2 L18,6 L18,18 L2,18 Z',
          stroke: '#5a4a3a',
          strokeWidth: 1,
          opacity: 0.85,
        },
        {
          type: 'path',
          d: 'M14,2 L14,6 L18,6',
          stroke: '#5a4a3a',
          strokeWidth: 1,
          opacity: 0.85,
        },
      ],
    },

    // tipIcon · 夹注双鱼尾（开口朝右）
    tipIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        {
          type: 'path',
          d: 'M4,2 L2,4 L2,10 L4,12',
          stroke: '#4a6b3e',
          strokeWidth: 1.4,
          strokeLinejoin: 'round',
          strokeLinecap: 'round',
        },
        {
          type: 'path',
          d: 'M8,2 L10,4 L10,10 L8,12',
          stroke: '#4a6b3e',
          strokeWidth: 1.4,
          strokeLinejoin: 'round',
          strokeLinecap: 'round',
        },
      ],
    },

    // infoIcon · "按"字几何化（居中单点 + 下划线，最低调）
    infoIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        { type: 'circle', cx: 7, cy: 5, r: 1, fill: '#3d5a75', opacity: 0.9 },
        {
          type: 'line',
          x1: 3,
          y1: 10,
          x2: 11,
          y2: 10,
          stroke: '#3d5a75',
          strokeWidth: 1.2,
          opacity: 0.85,
        },
      ],
    },

    // warningIcon · 双鱼尾开口朝上（倒 U）
    warningIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        {
          type: 'path',
          d: 'M2,4 L4,2 L10,2 L12,4',
          stroke: '#8a6428',
          strokeWidth: 1.4,
          strokeLinejoin: 'round',
          strokeLinecap: 'round',
        },
        {
          type: 'path',
          d: 'M2,8 L4,6 L10,6 L12,8',
          stroke: '#8a6428',
          strokeWidth: 1.4,
          strokeLinejoin: 'round',
          strokeLinecap: 'round',
        },
      ],
    },

    // dangerIcon · 双鱼尾开口朝左
    dangerIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        {
          type: 'path',
          d: 'M10,2 L12,4 L12,10 L10,12',
          stroke: '#8e3a2d',
          strokeWidth: 1.4,
          strokeLinejoin: 'round',
          strokeLinecap: 'round',
        },
        {
          type: 'path',
          d: 'M6,2 L4,4 L4,10 L6,12',
          stroke: '#8e3a2d',
          strokeWidth: 1.4,
          strokeLinejoin: 'round',
          strokeLinecap: 'round',
        },
      ],
    },

    // stepBadge · 钤印（规范 §1.3 ④）
    // 外圈 r=11 stroke 1.2 + 内圈 r=8.5 opacity 0.55 + 数字 primary 墨褐。
    // 注：源内圈 strokeWidth 0.6 → 1（validator 硬下限）。
    stepBadge: {
      viewBox: [0, 0, 24, 24],
      width: 24,
      height: 24,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 8 },
      placeholders: ['N'],
      primitives: [
        { type: 'circle', cx: 12, cy: 12, r: 11, fill: '#5a4a3a', opacity: 0.08 },
        { type: 'circle', cx: 12, cy: 12, r: 11, stroke: '#5a4a3a', strokeWidth: 1.2 },
        {
          type: 'circle',
          cx: 12,
          cy: 12,
          r: 8.5,
          stroke: '#5a4a3a',
          strokeWidth: 1,
          opacity: 0.55,
        },
        {
          type: 'text',
          x: 12,
          y: 17,
          content: '{N}',
          fontSize: 15,
          fontWeight: 700,
          fill: '#5a4a3a',
          textAnchor: 'middle',
        },
      ],
    },

    // sealMark · 大钤印（规范 §1.3 ④ · 规范 §2 footerCTA）
    // 整篇文章仅卷尾出现一次；24×24 外框 + 两字留位的几何化十字笔画。
    // 此处使用 accent（藏经朱）—— 全文朱砂稀缺出场的第二处。
    sealMark: {
      viewBox: [0, 0, 24, 24],
      width: 24,
      height: 24,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle' },
      primitives: [
        {
          type: 'rect',
          x: 1,
          y: 1,
          w: 22,
          h: 22,
          stroke: '#9a3b2e',
          strokeWidth: 1.4,
          opacity: 0.92,
        },
        {
          type: 'line',
          x1: 3,
          y1: 12,
          x2: 21,
          y2: 12,
          stroke: '#9a3b2e',
          strokeWidth: 1,
          opacity: 0.5,
        },
        {
          type: 'line',
          x1: 7,
          y1: 6.5,
          x2: 17,
          y2: 6.5,
          stroke: '#9a3b2e',
          strokeWidth: 1.1,
          opacity: 0.85,
        },
        {
          type: 'line',
          x1: 12,
          y1: 4,
          x2: 12,
          y2: 9,
          stroke: '#9a3b2e',
          strokeWidth: 1.1,
          opacity: 0.85,
        },
        {
          type: 'line',
          x1: 7,
          y1: 17.5,
          x2: 17,
          y2: 17.5,
          stroke: '#9a3b2e',
          strokeWidth: 1.1,
          opacity: 0.85,
        },
        {
          type: 'line',
          x1: 12,
          y1: 15,
          x2: 12,
          y2: 20,
          stroke: '#9a3b2e',
          strokeWidth: 1.1,
          opacity: 0.85,
        },
      ],
    },
  },

  // ============================================================
  // 骨架变体（规范 §2 每节 primary variant）
  // ============================================================
  variants: {
    // 规范 §2.10：tip 走 minimal-underline —— literary 签名气质（最轻、铅笔划）
    admonition: 'minimal-underline',
    // 规范 §2.6：quoteCard 走 magazine-dropcap —— 题辞签名
    quote: 'magazine-dropcap',
    // 规范 §2.12：compare 走 column-card（甲说/乙说）
    compare: 'column-card',
    // 规范 §2.13：steps 走 timeline-dot（卷一/卷二/卷三）
    steps: 'timeline-dot',
    // 规范 §2 divider：默认 flower（单云头）—— 人文主题 logo
    divider: 'flower',
    // 规范 §2.4：sectionTitle 走 cornered —— 左上书角折页
    sectionTitle: 'cornered',
    // 规范 §1.1 code 安静处理：bare 不用 header-bar
    codeBlock: 'bare',
  },

  // ============================================================
  // 元素级样式（规范 §1.2 typographic voice）
  // ============================================================
  elements: {
    // 规范 §1.2：h1 26 / 700 / 字距 3px —— 稀比粗更贵气（古籍大字题签）
    h1: {
      'font-size': '26px',
      'font-weight': '700',
      color: '#1f1b14',
      'margin-top': '30px',
      'margin-bottom': '18px',
      'line-height': '1.5',
      'letter-spacing': '3px',
      'text-align': 'center',
    },
    // 规范 §1.3①：h2 前缀 = 2px×20px primary 竖条（assets.h2Prefix 注入）
    //         h2 下方 1px border 横线
    h2: {
      'font-size': '19px',
      'font-weight': '600', // 规范 §1.2：600 而非 700（700 太硬）
      color: '#1f1b14',
      'margin-top': '32px',
      'margin-bottom': '14px',
      'line-height': '1.6',
      'letter-spacing': '2px',
      'padding-bottom': '8px',
      'border-bottom': '1px solid #cfc3a8',
    },
    // 规范 §1.2：h3 16 / 600 / 与正文同号 —— 靠字距识别的高级手法
    h3: {
      'font-size': '16px',
      'font-weight': '600',
      color: '#1f1b14',
      'margin-top': '22px',
      'margin-bottom': '10px',
      'line-height': '1.7',
      'letter-spacing': '1.2px',
    },
    // h4：介于 h3 与正文之间
    h4: {
      'font-size': '15px',
      'font-weight': '600',
      color: '#1f1b14',
      'margin-top': '18px',
      'margin-bottom': '8px',
      'line-height': '1.6',
      'letter-spacing': '1px',
    },
    // 规范 §1.2：正文 16 / 400 / 字距 1px / 行高 2.0（签名）
    p: {
      'font-size': '16px',
      'line-height': '2.0',
      color: '#1f1b14',
      'margin-top': '0',
      'margin-bottom': '22px',
      'letter-spacing': '1px',
    },
    // 规范 §2.5 quote（裸 blockquote）：column-rule 气质的双侧细竖线
    // __reset：不承袭 baseElements 的 border-radius 4px（人文主题 blockquote 直角纪律）
    blockquote: {
      __reset: true,
      'border-left': '1px solid #5a4a3a',
      'border-right': '1px solid #5a4a3a',
      'background-color': 'transparent',
      color: '#6b5f4a',
      'padding-top': '8px',
      'padding-right': '22px',
      'padding-bottom': '8px',
      'padding-left': '22px',
      'margin-top': '0',
      'margin-bottom': '22px',
      'letter-spacing': '1.2px',
    },
    ul: { 'padding-left': '24px', 'margin-top': '0', 'margin-bottom': '22px' },
    ol: { 'padding-left': '24px', 'margin-top': '0', 'margin-bottom': '22px' },
    li: {
      'margin-bottom': '12px',
      'line-height': '2.0',
      color: '#1f1b14',
      'letter-spacing': '1px',
    },
    a: {
      color: '#5a4a3a',
      'text-decoration': 'underline',
    },
    // 规范 §2 divider：上下 margin 36px（比默认大一档，人文更大呼吸）
    hr: {
      border: 'none',
      height: '1px',
      'background-color': '#cfc3a8',
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
    strong: { 'font-weight': '500', color: '#1f1b14' },
    em: { 'font-style': 'italic', color: '#1f1b14' },

    pre: {
      'background-color': '#ece5d1',
      color: '#1f1b14',
      'padding-top': '14px',
      'padding-right': '16px',
      'padding-bottom': '14px',
      'padding-left': '16px',
      'border-radius': '0', // 规范 §3.5：方版心，不圆角
      border: '1px solid #cfc3a8',
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
      'background-color': '#ddd3bb',
      color: '#6b5f4a',
      padding: '2px 6px',
      'border-radius': '0',
      'font-size': '14px',
    },
  },

  // ============================================================
  // Inline 强调（规范 §1.2 字重对比 + §1.3 朱砂稀缺纪律）
  // ============================================================
  inline: {
    // 规范 §1.3：朱砂全文只出现"两处"（quoteCard 首字 + footer 钤印）
    // highlight 不能走 accent；改走 bgSoft 底 + text 色（保持"纸感"）
    highlight: {
      'background-color': '#ece5d1',
      color: '#1f1b14',
      padding: '0 3px',
      'border-radius': '0',
    },
    // 规范 §1.2：波浪线用 primary 墨褐，不引入第三色
    wavy: {
      'text-decoration': 'underline wavy',
      'text-decoration-color': '#5a4a3a',
      'text-underline-offset': '3px',
    },
    // 规范 §1.2：关键词强调走 primary + 500（不是 700）
    emphasis: {
      color: '#5a4a3a',
      'font-weight': '500',
    },
  },

  // ============================================================
  // 容器视觉（规范 §2 的 19 个 container）
  // ============================================================
  containers: {
    // 规范 §2.1 intro：题解 —— 左 2px primary 竖条 + bgSoft 底 + 两侧 20px 内缩
    intro: {
      'background-color': '#ece5d1',
      'border-left': '2px solid #5a4a3a',
      'border-radius': '0',
      padding: '14px 20px 14px 22px',
      margin: '0 0 28px 0',
      color: '#6b5f4a',
      'letter-spacing': '1.5px',
    },
    // 规范 §2.2 author：书末小字落款 —— inline-block 胶囊
    author: {
      display: 'inline-block',
      'background-color': '#ece5d1',
      'border-radius': '0',
      padding: '6px 14px',
      margin: '16px 0',
      color: '#5a4a3a',
      'font-size': '14px',
      'letter-spacing': '1px',
    },
    // 规范 §2.3 cover：扉页 —— 图下紧跟 13px textMuted 居中题记，margin 36
    cover: {
      margin: '0 0 36px 0',
    },
    // admonition 四件套：variant 接管外壳；container 留空等 variant 注入
    tip: {},
    warning: {},
    info: {},
    danger: {},
    // 规范 §2.6 quoteCard：题辞，走 magazine-dropcap variant
    quoteCard: {
      'background-color': '#ece5d1',
      padding: '28px 24px',
      margin: '24px 0',
      'border-radius': '0',
      border: '1px solid #cfc3a8',
    },
    // 规范 §2 highlight：着重段 —— bgSoft + 两侧 24px 内缩 + 无边框
    highlight: {
      'background-color': '#ece5d1',
      padding: '14px 24px',
      margin: '24px 0',
      'border-radius': '0',
      'letter-spacing': '1.5px',
    },
    // 规范 §2 compare：夹注（column-card）
    compare: { margin: '24px 0' },
    // 规范 §2 steps：卷次（timeline-dot）
    steps: { margin: '24px 0' },
    // 规范 §2.4 sectionTitle：cornered variant —— 左上书角折页 + 1px border 通栏
    sectionTitle: {
      margin: '40px 0 18px',
      'padding-bottom': '8px',
      'border-bottom': '1px solid #cfc3a8',
    },
    // 规范 §2 footerCTA：卷尾 —— 顶部 dividerFlower + 中间 13px textMuted + 右下 sealMark
    footerCTA: {
      margin: '36px 0',
      padding: '28px 0 20px 0',
      'background-color': 'transparent',
      'border-radius': '0',
    },
    // 规范 §2 recommend：卷末书单
    recommend: {
      margin: '28px 0',
      padding: '16px 20px',
      'background-color': '#ece5d1',
      'border-radius': '0',
    },
    // 规范 §2 qrcode：钤印衬托 —— 容器本身无底色无边框
    qrcode: {
      margin: '28px 0',
      padding: '16px',
      'background-color': 'transparent',
      'border-radius': '0',
    },
  },

  // literary 只用通用容器 + variant（不声明任何签名容器；Phase 5 再补）
  signatureContainers: [],

  // ============================================================
  // Templates（主题特化的 markdown 片段；commonTemplates 由 specToTheme 隐式并入）
  // ============================================================
  templates: {
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

  meta: {
    createdAt: '2026-04-20',
    ownerNotes:
      'Phase 2 迁移自 legacy index.ts + assets.ts；三件 motif 的 strokeWidth 0.6/0.8/0.9 抬至 1.0（validator 硬下限，公众号光栅化友好），其余视觉细节 byte-identical。',
  },
}

export default spec
