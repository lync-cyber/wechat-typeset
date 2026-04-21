/**
 * business-finance · 硬核财经 · PersonaSpec
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
 *   4. `<strong>` 字重 600（不是 800）—— 全页 800 = 没有重点
 *   5. 所有容器 radius ≤ 2（报告直角；radius ≥ 6 直接打回）
 *
 * 迁移说明：Phase 2 PR 6 — 本文件是 spec-first 的 ground truth，index.ts 投影而已。
 * 唯一视觉偏离：dividerWave 底部基线 stroke-width 从 0.8 提到 1.0（规范 §1.3 原计划亦如此，
 * 平台光栅化在 < 1 下会失真；validator 同样要求 ≥ 1）。
 */

import type { PersonaSpec } from '../_shared/spec'

export const spec: PersonaSpec = {
  id: 'business-finance',
  name: '硬核财经',
  description: '深栗墨 + 内参蓝，研究所内参版面，数字与判断优先',
  audience: '财经内参 / 研究所 newsletter（FT 中文、财新周刊、Bloomberg Terminal、HBR）',

  // ============================================================
  // 色板（规范 §1.1 · B 版：深栗墨为主，红留给涨/险）
  // ============================================================
  palette: {
    // 规范 §1.1 关键改动：primary 从旧红 #b1252b 改到深栗墨
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
  },

  // 语义四色（规范 §1.1 纪律：色相距 60°+，warning 脱离红系，对比度全部 ≥ AA）
  status: {
    tip: { accent: '#1f4f6b', soft: '#dfe8ee' }, // 要点 Key Takeaway（钢青，7.8:1）
    info: { accent: '#3d5a75', soft: '#dde4ec' }, // 补注 Memo（烟蓝，5.6:1）
    warning: { accent: '#8a6416', soft: '#f1e8d1' }, // 风险提示 Risk Note（琥珀，5.9:1）
    danger: { accent: '#9a1b20', soft: '#f0dadc' }, // 警报 Alert（深朱，6.8:1）
  },

  // ============================================================
  // 字号 / 间距 / 圆角（规范 §1.2 / §3.9）
  // ============================================================
  typography: {
    baseSize: 15,
    lineHeight: 1.75,
    h1Size: 26,
    h2Size: 21,
    h3Size: 17,
    letterSpacing: 0.3,
  },
  spacing: { paragraph: 16, section: 28, listItem: 6, containerPadding: 14 },
  // 规范 §3.9：硬核财经 0/2/4，radius ≥ 6 直接打回
  radius: { sm: 0, md: 2, lg: 4 },

  // ============================================================
  // Motifs（规范 §1.3 · 11 件：研报图表 & 内参装帧）
  // ============================================================
  motifs: {
    // ---------- ① h2Prefix · legend 色块 + 辅横条 ---------- //
    // 主块 3×13 primary 深栗墨 + 辅块 14×3 secondary opacity 0.75（figure legend）
    h2Prefix: {
      viewBox: [0, 0, 18, 18],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 8 },
      primitives: [
        { type: 'rect', x: 0, y: 2, w: 3, h: 13, fill: '#2a1a14' },
        { type: 'rect', x: 4, y: 7, w: 14, h: 3, fill: '#0e3654', opacity: 0.75 },
      ],
    },

    // ---------- ② dividerWave · K 线 V 型走势（瑰宝） ---------- //
    // 前 5 根下压 + 后 4 根反弹；红蓝交替；柱宽 4px，stroke-width 1.0
    // 基线 stroke-width 按规范原 0.8 提到 1.0（平台光栅化 < 1 会失真）
    dividerWave: {
      viewBox: [0, 0, 240, 20],
      width: 220,
      height: 20,
      primitives: [
        { type: 'line', x1: 0, y1: 10, x2: 240, y2: 10, stroke: '#d0cec8', strokeWidth: 1 },
        // bar 1 (x=70, cy=6, danger)
        { type: 'line', x1: 72, y1: 2, x2: 72, y2: 10, stroke: '#9a1b20', strokeWidth: 1 },
        { type: 'rect', x: 70, y: 4, w: 4, h: 4, fill: '#9a1b20' },
        // bar 2 (x=82, cy=8, secondary)
        { type: 'line', x1: 84, y1: 4, x2: 84, y2: 12, stroke: '#0e3654', strokeWidth: 1 },
        { type: 'rect', x: 82, y: 6, w: 4, h: 4, fill: '#0e3654' },
        // bar 3 (x=94, cy=10, danger)
        { type: 'line', x1: 96, y1: 6, x2: 96, y2: 14, stroke: '#9a1b20', strokeWidth: 1 },
        { type: 'rect', x: 94, y: 8, w: 4, h: 4, fill: '#9a1b20' },
        // bar 4 (x=106, cy=12, secondary)
        { type: 'line', x1: 108, y1: 8, x2: 108, y2: 16, stroke: '#0e3654', strokeWidth: 1 },
        { type: 'rect', x: 106, y: 10, w: 4, h: 4, fill: '#0e3654' },
        // bar 5 (x=118, cy=14, danger)  ← V 底
        { type: 'line', x1: 120, y1: 10, x2: 120, y2: 18, stroke: '#9a1b20', strokeWidth: 1 },
        { type: 'rect', x: 118, y: 12, w: 4, h: 4, fill: '#9a1b20' },
        // bar 6 (x=130, cy=12, secondary)
        { type: 'line', x1: 132, y1: 8, x2: 132, y2: 16, stroke: '#0e3654', strokeWidth: 1 },
        { type: 'rect', x: 130, y: 10, w: 4, h: 4, fill: '#0e3654' },
        // bar 7 (x=142, cy=10, danger)
        { type: 'line', x1: 144, y1: 6, x2: 144, y2: 14, stroke: '#9a1b20', strokeWidth: 1 },
        { type: 'rect', x: 142, y: 8, w: 4, h: 4, fill: '#9a1b20' },
        // bar 8 (x=154, cy=8, secondary)
        { type: 'line', x1: 156, y1: 4, x2: 156, y2: 12, stroke: '#0e3654', strokeWidth: 1 },
        { type: 'rect', x: 154, y: 6, w: 4, h: 4, fill: '#0e3654' },
        // bar 9 (x=166, cy=6, danger)
        { type: 'line', x1: 168, y1: 2, x2: 168, y2: 10, stroke: '#9a1b20', strokeWidth: 1 },
        { type: 'rect', x: 166, y: 4, w: 4, h: 4, fill: '#9a1b20' },
      ],
    },

    // ---------- ③ dividerDots · 紧凑 3 方块（红/蓝/红） ---------- //
    dividerDots: {
      viewBox: [0, 0, 240, 10],
      width: 220,
      height: 10,
      primitives: [
        { type: 'rect', x: 108, y: 3, w: 4, h: 4, fill: '#9a1b20' },
        { type: 'rect', x: 118, y: 3, w: 4, h: 4, fill: '#0e3654' },
        { type: 'rect', x: 128, y: 3, w: 4, h: 4, fill: '#9a1b20' },
      ],
    },

    // ---------- ④ dividerFlower · 章节编号 Sec. I ---------- //
    // 双线夹中央 text 标签；font-size 14（光栅下限），letter-spacing 1.5
    dividerFlower: {
      viewBox: [0, 0, 240, 20],
      width: 220,
      height: 16,
      primitives: [
        { type: 'line', x1: 4, y1: 10, x2: 96, y2: 10, stroke: '#d0cec8', strokeWidth: 1 },
        { type: 'line', x1: 144, y1: 10, x2: 236, y2: 10, stroke: '#d0cec8', strokeWidth: 1 },
        {
          type: 'text',
          x: 120,
          y: 14,
          content: 'Sec. I',
          fontSize: 14,
          fontWeight: 600,
          fill: '#56606e',
          textAnchor: 'middle',
          letterSpacing: 1.5,
        },
      ],
    },

    // ---------- ⑤ quoteMark · 方头锐利引号（primary 栗墨，opacity 0.5） ---------- //
    quoteMark: {
      viewBox: [0, 0, 40, 32],
      width: 34,
      height: 28,
      inlineStyle: { display: 'inline-block', verticalAlign: 'top', marginRight: 4 },
      primitives: [
        {
          type: 'path',
          d: 'M4,6 L4,14 L8,14 L8,20 L14,20 L14,6 Z M22,6 L22,14 L26,14 L26,20 L32,20 L32,6 Z',
          fill: '#2a1a14',
          opacity: 0.5,
        },
      ],
    },

    // ---------- ⑥ sectionCorner · L 形直角 + accent 3×3 方块 ---------- //
    sectionCorner: {
      viewBox: [0, 0, 18, 18],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        { type: 'path', d: 'M0,0 L6,0 L6,3 L3,3 L3,18 L0,18 Z', fill: '#2a1a14' },
        { type: 'rect', x: 9, y: 14, w: 3, h: 3, fill: '#b8821f' },
      ],
    },

    // ---------- ⑦ tipIcon · 方框 + ✓（建议采纳） ---------- //
    tipIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        { type: 'rect', x: 1, y: 1, w: 14, h: 14, stroke: '#1f4f6b', strokeWidth: 1.5 },
        {
          type: 'path',
          d: 'M4,8 L7,11 L12,5',
          stroke: '#1f4f6b',
          strokeWidth: 1.8,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        },
      ],
    },

    // ---------- ⑧ warningIcon · 方框 + !（上长下短） ---------- //
    warningIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        { type: 'rect', x: 1, y: 1, w: 14, h: 14, stroke: '#8a6416', strokeWidth: 1.5 },
        { type: 'rect', x: 7, y: 3, w: 2, h: 7, fill: '#8a6416' },
        { type: 'rect', x: 7, y: 11, w: 2, h: 2, fill: '#8a6416' },
      ],
    },

    // ---------- ⑨ infoIcon · 方框 + i（上短下长 · 与 warning 镜像） ---------- //
    infoIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        { type: 'rect', x: 1, y: 1, w: 14, h: 14, stroke: '#3d5a75', strokeWidth: 1.5 },
        { type: 'rect', x: 7, y: 3, w: 2, h: 2, fill: '#3d5a75' },
        { type: 'rect', x: 7, y: 6, w: 2, h: 7, fill: '#3d5a75' },
      ],
    },

    // ---------- ⑩ dangerIcon · 方框 + ×（勘误感） ---------- //
    dangerIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        { type: 'rect', x: 1, y: 1, w: 14, h: 14, stroke: '#9a1b20', strokeWidth: 1.5 },
        {
          type: 'path',
          d: 'M4,4 L12,12 M12,4 L4,12',
          stroke: '#9a1b20',
          strokeWidth: 1.8,
          strokeLinecap: 'round',
        },
      ],
    },

    // ---------- ⑪ stepBadge · 正方形钤印（primary 底 + accent 底条 + #fefefe 数字） ---------- //
    stepBadge: {
      viewBox: [0, 0, 24, 24],
      width: 24,
      height: 24,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 8 },
      placeholders: ['N'],
      primitives: [
        { type: 'rect', x: 1, y: 1, w: 22, h: 22, fill: '#2a1a14' },
        { type: 'rect', x: 1, y: 20, w: 22, h: 3, fill: '#b8821f' },
        {
          type: 'text',
          x: 12,
          y: 16,
          content: '{N}',
          fontSize: 15,
          fontWeight: 700,
          fill: '#fefefe',
          textAnchor: 'middle',
        },
      ],
    },
  },

  // ============================================================
  // 骨架变体（规范 §2）
  // ============================================================
  variants: {
    admonition: 'ledger-cell', // 全主题签名：Bloomberg Terminal 风表头条 + 硬边框数据单元
    quote: 'frame-brackets', // 四角 L 形 + attribution 位
    compare: 'ledger', // 账本双列
    steps: 'timeline-dot', // 阶段时间轴
    divider: 'wave', // K 线瑰宝
    sectionTitle: 'cornered', // 左上 L 形角标
    codeBlock: 'bare', // 安静处理
  },

  // ============================================================
  // 元素级样式（规范 §1.2 typographic voice）
  // ============================================================
  elements: {
    // 规范 §1.2：h1 26 / 800 / 0.5 / 1.35
    h1: {
      'font-size': '26px',
      'font-weight': '800',
      color: '#0f141b',
      'margin-top': '28px',
      'margin-bottom': '16px',
      'line-height': '1.35',
      'letter-spacing': '0.5px',
    },
    // 规范 §1.2：h2 21 / 700 / 0.3 / 1.4 + 4px 左 primary 栗墨竖条
    h2: {
      'font-size': '21px',
      'font-weight': '700',
      color: '#0f141b',
      'margin-top': '28px',
      'margin-bottom': '12px',
      'line-height': '1.4',
      'letter-spacing': '0.3px',
      'padding-left': '8px',
      'border-left': '4px solid #2a1a14',
      'border-bottom': 'none',
      'padding-bottom': '0',
    },
    h3: {
      'font-size': '17px',
      'font-weight': '700',
      color: '#0f141b',
      'margin-top': '24px',
      'margin-bottom': '10px',
      'line-height': '1.5',
      'letter-spacing': '0.2px',
    },
    h4: {
      'font-size': '15px',
      'font-weight': '700',
      color: '#0f141b',
      'margin-top': '18px',
      'margin-bottom': '8px',
      'line-height': '1.5',
    },
    p: {
      'font-size': '15px',
      'line-height': '1.75',
      color: '#0f141b',
      'margin-top': '0',
      'margin-bottom': '16px',
      'letter-spacing': '0.3px',
    },
    // 规范 §2.5 quote（裸 blockquote）：column-rule 气质 —— 双侧 1px secondary 竖线
    blockquote: {
      'border-left': '1px solid #0e3654',
      'border-right': '1px solid #0e3654',
      'background-color': 'transparent',
      color: '#56606e',
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
      color: '#0f141b',
      'letter-spacing': '0.3px',
    },
    // 规范 §1.2：`<strong>` 字重 600（不是 800）
    strong: { 'font-weight': '600', color: '#2a1a14' },
    em: { 'font-style': 'italic', color: '#0f141b' },
    // 链接走 secondary（不走 primary 标题位）
    a: {
      color: '#0e3654',
      'text-decoration': 'underline',
      'text-underline-offset': '3px',
    },
    hr: {
      border: 'none',
      height: '1px',
      'background-color': '#d0cec8',
      'margin-top': '24px',
      'margin-bottom': '24px',
    },
    // 规范 §2.3 cover：图片极窄圆角 2px
    img: {
      'max-width': '100%',
      display: 'block',
      'margin-top': '10px',
      'margin-right': 'auto',
      'margin-bottom': '10px',
      'margin-left': 'auto',
      'border-radius': '2px',
    },
    pre: {
      'background-color': '#e6e2d8',
      color: '#0f141b',
      'padding-top': '14px',
      'padding-right': '16px',
      'padding-bottom': '14px',
      'padding-left': '16px',
      'border-radius': '2px',
      border: '1px solid #d0cec8',
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
      'background-color': '#e6e2d8',
      color: '#0e3654',
      padding: '1px 5px',
      'border-radius': '2px',
      'font-size': '14px',
    },
  },

  // ============================================================
  // 内联强调（规范 §3.7 highlight 纪律 + §1.2 波浪线）
  // ============================================================
  inline: {
    // 规范 §3.7：highlight 从 accent 琥珀 **降饱和** 到 warning.soft 米黄
    highlight: {
      'background-color': '#f1e8d1',
      color: '#0f141b',
      padding: '0 4px',
      'border-radius': '0',
    },
    // 波浪线走 primary 栗墨
    wavy: {
      'text-decoration': 'underline wavy',
      'text-decoration-color': '#2a1a14',
      'text-underline-offset': '3px',
    },
    // 关键词强调走 primary + 600
    emphasis: {
      color: '#2a1a14',
      'font-weight': '600',
    },
  },

  // ============================================================
  // 容器视觉（规范 §2）
  // ============================================================
  containers: {
    // 规范 §2.1 intro：Abstract 研报摘要 —— 左 3px secondary 竖条 + 左内缩 + bgSoft 底
    intro: {
      'background-color': '#f3f1ec',
      'border-left': '3px solid #0e3654',
      'border-radius': '0',
      padding: '12px 16px 12px 17px',
      margin: '0 0 24px 0',
      color: '#0f141b',
    },
    // 规范 §2.2 author：inline-block 冷方块 + bgMuted 底 + 2px accent 栏目色标竖条
    author: {
      display: 'inline-block',
      'background-color': '#e6e2d8',
      'border-left': '2px solid #b8821f',
      'border-radius': '0',
      padding: '4px 10px',
      margin: '0 0 16px 0',
      color: '#56606e',
      'font-size': '13px',
      'letter-spacing': '0.3px',
    },
    // 规范 §2.3 cover：margin 下推 28
    cover: {
      margin: '0 0 28px 0',
    },
    // 四态容器外壳（variant 接管）
    tip: {},
    warning: {},
    info: {},
    danger: {},
    // 规范 §2.6 quoteCard：核心判断 —— frame-brackets + bgSoft 底 + radius 2
    quoteCard: {
      'background-color': '#f3f1ec',
      padding: '26px 28px',
      margin: '24px 0',
      'border-radius': '2px',
    },
    // 规范 §2 highlight（数据卡 primitive）
    highlight: {
      'background-color': '#fefefe',
      padding: '18px 20px',
      margin: '20px 0',
      'border-radius': '2px',
      border: '1px solid #d0cec8',
    },
    // 规范 §2.15 compare：ledger 账本
    compare: { margin: '24px 0' },
    // 规范 §2.16 steps：阶段时间轴
    steps: { margin: '24px 0' },
    // 规范 §2.4 sectionTitle：cornered variant；__reset 丢弃通栏 border-bottom
    sectionTitle: {
      __reset: true,
      margin: '40px 0 18px',
    },
    // 规范 §2.7 footerCTA：FT 订阅条 —— 上下各 1.5px primary 通栏横线
    footerCTA: {
      margin: '32px 0 0 0',
      padding: '20px',
      'background-color': 'transparent',
      'border-top': '1.5px solid #2a1a14',
      'border-bottom': '1.5px solid #2a1a14',
      'border-radius': '0',
    },
    // 规范 §2.8 recommend：延伸阅读 —— bgSoft 底 + radius 2
    recommend: {
      margin: '24px 0',
      padding: '14px 18px',
      'background-color': '#f3f1ec',
      'border-radius': '2px',
    },
    // 规范 §2.9 qrcode：居中 block，容器无底色无边框
    qrcode: {
      margin: '28px auto',
      padding: '0',
      'background-color': 'transparent',
      'border-radius': '0',
    },
  },

  // 签名容器：abstract（报告摘要）+ keyNumber（大数字数据栏，财报核心）
  signatureContainers: ['abstract', 'keyNumber'],

  // ============================================================
  // Templates（仅声明覆盖键；commonTemplates 被 specToTheme 隐式合并为基线）
  // ============================================================
  templates: {
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
    // 规范 §2.7 footerCTA：FT 订阅条
    footerCTA: `::: footer-cta 关注「硬核财经」
不吹票、不带节奏，只讲值得下判断的数据。
:::
`,
  },

  meta: {
    createdAt: '2026-04-20',
    ownerNotes:
      'Phase 2 PR 6 migrated. 唯一视觉偏离：dividerWave 基线 stroke-width 0.8 → 1.0（平台光栅化与 validator MIN_STROKE_WIDTH 纪律）。',
  },
}

export default spec
