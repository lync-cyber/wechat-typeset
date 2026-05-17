/**
 * edu-classroom · 教室课堂 · PersonaSpec
 *
 * 定位：服务"耐心讲解 / 步骤分解 / 友好亲切 / 不卡通化"的教育内容。
 * 受众：K-12 教育 / 亲子科普 / 童书推荐 / 兴趣启蒙 / 知识自习 / 家长读物。
 *
 * 视觉三锚点（不可移动）：
 *   1. primary = #2e7d32（森林绿，黑板/草地联想，HSL 123° 49% 31%）
 *   2. accent  = #f57c00（暖橙，教师标红/启发感，与 primary 互补）
 *   3. bg      = #fdfcf7（教科书铜版纸，微暖底，不纯白）
 *
 * 与 tech-explainer 的硬边界：
 *   - 色系 180° 反向（森林绿暖底 vs 文档蓝冷白）
 *   - 受众关系：亲切引导（K-12 / 家长）vs 手把手程序员文档
 *   - admonition 走 card-shadow（柔和卡片感），非 accent-bar
 *   - radius.lg = 14（圆润），非 6-10（方正文档感）
 */

import type { PersonaSpec } from '../_shared/spec'

export const spec: PersonaSpec = {
  id: 'edu-classroom',
  name: '教室课堂',
  description: '耐心讲解 / 步骤分解 / 友好亲切的教育内容，不卡通化',
  audience: 'K-12 教育 / 亲子科普 / 童书推荐 / 兴趣启蒙 / 知识自习 / 家长读物',

  // ============================================================
  // 色板
  // ============================================================
  palette: {
    primary: '#2e7d32',    // 森林绿（HSL 123° 49% 31%），黑板/草地联想
    secondary: '#4caf50',  // 草地亮绿（primary 的提亮变体，链接/次要强调）
    accent: '#f57c00',     // 暖橙（教师标红/启发感，accent 稀缺纪律：pull-quote/drop-cap）
    bg: '#fdfcf7',         // 教科书铜版纸（微暖，不纯白）
    bgSoft: '#f5f2ea',     // 浅卡纸底（容器内底、intro、author）
    bgMuted: '#e8e4d8',    // 暖灰（表头、inline code 底、分隔）
    text: '#1c2b1e',       // 墨绿深色正文（偏绿的近黑，与 primary 家族和谐）
    textMuted: '#5c6b5e',  // 灰绿（caption / note / 脚注）
    textInverse: '#fefefe', // 反白（色块徽章/stepBadge 白字）
    border: '#c8d5c9',     // 浅绿边框（与 primary 同家族，1px 实线）
    code: '#1b5e20',       // inline code 字色（深森林绿，在 bgMuted 上 7.5:1）
    highlightBg: '#fff3c4', // 马克笔暖黄底（==xx== 用，不走 bgSoft）
    codeBg: '#e8e4d8',     // inline code 底色 = bgMuted
  },

  // 语义四色——教育主题 tip/info 最高频
  status: {
    tip:     { accent: '#2e7d32', soft: '#eef6ef' }, // 森林绿（=primary，小贴士是主色家族）
    info:    { accent: '#1565c0', soft: '#e8f0fb' }, // 深蓝（延伸知识，区别于 primary）
    warning: { accent: '#b34500', soft: '#fdf0e6' }, // 深橙棕（#b34500 on #fdf0e6 = 4.98:1 ≥ 4.5 AA）
    danger:  { accent: '#b71c1c', soft: '#fce8e8' }, // 深红（危险提示，学习陷阱）
  },

  // ============================================================
  // 字号 / 间距 / 圆角
  // ============================================================
  typography: {
    baseSize: 15,
    lineHeight: 1.8,      // 教育内容宽松易读（∈ [1.6, 1.85]）
    h1Size: 24,
    h2Size: 20,
    h3Size: 17,
    letterSpacing: 0.5,   // 比技术主题略宽，友好易读
  },
  spacing: {
    paragraph: 20,        // 比技术主题略宽，步骤之间留气口
    section: 32,
    listItem: 10,         // 列表条目间距稍宽（K-12 阅读节奏）
    containerPadding: 18,
  },
  // 教育主题：圆润友好（lg ≥ 12）
  radius: { sm: 6, md: 10, lg: 14 },

  // ============================================================
  // Motifs
  // ============================================================
  motifs: {
    // tipIcon：圆形灯泡轮廓（圆头 + 灯座横线），primary 森林绿
    tipIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        {
          type: 'circle',
          cx: 8, cy: 6.5, r: 4.5,
          stroke: '#2e7d32', strokeWidth: 1.5,
        },
        { type: 'line', x1: 5.5, y1: 11.5, x2: 10.5, y2: 11.5, stroke: '#2e7d32', strokeWidth: 1.5 },
        { type: 'line', x1: 6, y1: 13, x2: 10, y2: 13, stroke: '#2e7d32', strokeWidth: 1.5 },
      ],
    },

    // warningIcon：等边三角形 + 中央 !（warning 深橙）
    warningIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        {
          type: 'path',
          d: 'M8,2 L14.5,13.5 L1.5,13.5 Z',
          stroke: '#b34500', strokeWidth: 1.5, strokeLinejoin: 'round',
        },
        { type: 'rect', x: 7.25, y: 6, w: 1.5, h: 4, rx: 0.5, fill: '#b34500' },
        { type: 'circle', cx: 8, cy: 11.5, r: 0.9, fill: '#b34500' },
      ],
    },

    // infoIcon：圆角方形 + 中央 i（info 深蓝）
    infoIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        { type: 'rect', x: 2, y: 2, w: 12, h: 12, rx: 3, stroke: '#1565c0', strokeWidth: 1.5 },
        { type: 'circle', cx: 8, cy: 5.5, r: 0.9, fill: '#1565c0' },
        { type: 'rect', x: 7.25, y: 7.5, w: 1.5, h: 4.5, rx: 0.5, fill: '#1565c0' },
      ],
    },

    // noteIcon：空心圆 + 中央 i（note 中性灰绿）
    noteIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        { type: 'circle', cx: 8, cy: 8, r: 6, stroke: '#5c6b5e', strokeWidth: 1.5 },
        { type: 'circle', cx: 8, cy: 5, r: 0.9, fill: '#5c6b5e' },
        { type: 'rect', x: 7.25, y: 7, w: 1.5, h: 5, rx: 0.4, fill: '#5c6b5e' },
      ],
    },

    // stepBadge：双圆环（外深绿描边 + 内浅绿淡底）+ 主色数字。
    // 教育"圈圈钢笔重描"语言：教科书 / 黑板上常用的双层圈编号，与单色实心圆
    // （default / commerce-pulse / youth-zine 母语）拉开形态差异。
    stepBadge: {
      viewBox: [0, 0, 24, 24],
      width: 24,
      height: 24,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 8 },
      placeholders: ['N'],
      primitives: [
        { type: 'circle', cx: 12, cy: 12, r: 11, stroke: '#2e7d32', strokeWidth: 1.8, fill: '#e8f3e9' },
        { type: 'circle', cx: 12, cy: 12, r: 8, stroke: '#2e7d32', strokeWidth: 1, fill: 'none' },
        {
          type: 'text',
          x: 12, y: 17,
          content: '{N}',
          fontSize: 14,
          fontWeight: 700,
          fill: '#2e7d32',
          textAnchor: 'middle',
        },
      ],
    },

    // dividerWave：柔和波浪线（三段起伏，primary 绿，匹配教育温和气质）
    dividerWave: {
      viewBox: [0, 0, 240, 16],
      width: 220,
      height: 16,
      primitives: [
        {
          type: 'path',
          d: 'M0,8 C20,2 40,14 60,8 C80,2 100,14 120,8 C140,2 160,14 180,8 C200,2 220,14 240,8',
          stroke: '#2e7d32',
          strokeWidth: 1.5,
          strokeLinecap: 'round',
        },
      ],
    },

    // dividerDots：三点（primary 绿调，温和分章感）
    dividerDots: {
      viewBox: [0, 0, 240, 8],
      width: 220,
      height: 8,
      primitives: [
        { type: 'circle', cx: 106, cy: 4, r: 2.5, fill: '#c8d5c9' },
        { type: 'circle', cx: 120, cy: 4, r: 3, fill: '#2e7d32' },
        { type: 'circle', cx: 134, cy: 4, r: 2.5, fill: '#c8d5c9' },
      ],
    },
  },

  // ============================================================
  // 骨架变体
  // ============================================================
  variants: {
    // orphan 升级：card-shadow（柔和卡片感，友好教育气质，无硬边框）
    admonition: 'card-shadow',
    quote: 'classic',
    compare: 'column-card',
    steps: 'number-circle',
    // wave：柔和波浪，与 dividerWave motif 呼应
    divider: 'wave',
    // kicker-stack："今日课题"感（kicker 上行 + 大标题下行）
    sectionTitle: 'kicker-stack',
    codeBlock: 'bare',
    // hanging-indent（orphan 升级：缩进注，学术/笔记感）
    note: 'hanging-indent',
    footnotes: 'lined',
    recommend: 'card-list',
    qrcode: 'bare',
    // triptych-actions：学/练/问三联，匹配教育内容 CTA
    footerCTA: 'triptych-actions',
    pullQuote: 'giant-mark',
    // mono-disclaimer（orphan 升级）：等宽免责说明气质，适配教育"知识范围声明 / 安全提醒"
    announcement: 'mono-disclaimer',
    // zebra-rows（orphan 升级）：斑马纹易读，教学表格
    tableCard: 'zebra-rows',
    gallery: 'duo',
    // interview-column（orphan 升级）：师生访谈双栏（vs qa-rows 的紧凑问答行），让正式课堂对话感更强
    dialogue: 'interview-column',
  },

  // ============================================================
  // 声明式装饰（intro 首字下沉轻量化）
  // ============================================================
  decorations: {
    introDropcap: {
      color: 'primary',
      fontSize: 42,
      fontWeight: 700,
      marginRight: 6,
      paddingTop: 3,
    },
  },

  // ============================================================
  // 内联强调
  // ============================================================
  inline: {
    // 马克笔划线（暖黄底）——教育主题 ==xx== 的核心语汇
    highlight: {
      'background-color': '#fff3c4',
      color: '#1c2b1e',
      padding: '0 3px',
      'border-radius': '3px',
    },
    // 波浪下划线：accent 暖橙（教师"这里注意"的感觉）
    wavy: {
      'text-decoration': 'underline wavy',
      'text-decoration-color': '#f57c00',
      'text-underline-offset': '3px',
    },
    // 着重：primary 绿 + 600（关键词）
    emphasis: {
      color: '#2e7d32',
      'font-weight': '600',
    },
    del: {
      color: '#5c6b5e',
      'text-decoration': 'line-through',
    },
    ins: {
      color: '#2e7d32',
      'text-decoration': 'underline',
    },
  },

  // ============================================================
  // 元素级样式
  // ============================================================
  elements: {
    h1: {
      'font-size': '24px',
      'font-weight': '700',
      color: '#1c2b1e',
      'margin-top': '28px',
      'margin-bottom': '16px',
      'line-height': '1.35',
      'letter-spacing': '0',
    },
    h2: {
      'font-size': '20px',
      'font-weight': '600',
      color: '#1c2b1e',
      'margin-top': '36px',
      'margin-bottom': '14px',
      'line-height': '1.4',
      'padding-bottom': '8px',
      'border-bottom': '2px solid #2e7d32',
      'letter-spacing': '0',
    },
    h3: {
      'font-size': '17px',
      'font-weight': '600',
      color: '#2e7d32',
      'margin-top': '26px',
      'margin-bottom': '10px',
      'line-height': '1.5',
      'letter-spacing': '0.3px',
    },
    h4: {
      'font-size': '15px',
      'font-weight': '600',
      color: '#1c2b1e',
      'margin-top': '20px',
      'margin-bottom': '8px',
      'line-height': '1.5',
      'letter-spacing': '0.3px',
    },
    h5: {
      'font-size': '15px',
      'font-weight': '500',
      color: '#5c6b5e',
      'margin-top': '16px',
      'margin-bottom': '6px',
      'line-height': '1.5',
      'letter-spacing': '0.3px',
    },
    h6: {
      'font-size': '13px',
      'font-weight': '500',
      color: '#5c6b5e',
      'margin-top': '12px',
      'margin-bottom': '4px',
      'line-height': '1.5',
      'letter-spacing': '1px',
      'text-transform': 'uppercase',
    },
    p: {
      'font-size': '15px',
      'line-height': '1.8',
      color: '#1c2b1e',
      'margin-top': '0',
      'margin-bottom': '20px',
      'letter-spacing': '0.5px',
    },
    // 有序列表增强：教育内容步骤感
    ul: { 'padding-left': '24px', 'margin-top': '0', 'margin-bottom': '20px' },
    ol: { 'padding-left': '24px', 'margin-top': '0', 'margin-bottom': '20px' },
    li: {
      'margin-bottom': '10px',
      'line-height': '1.75',
      color: '#1c2b1e',
      'letter-spacing': '0.5px',
    },
    blockquote: {
      'border-left': '4px solid #c8d5c9',
      'background-color': '#f5f2ea',
      color: '#5c6b5e',
      'padding-top': '8px',
      'padding-right': '16px',
      'padding-bottom': '8px',
      'padding-left': '16px',
      'margin-top': '0',
      'margin-bottom': '20px',
      'border-radius': '0 10px 10px 0',
      'font-style': 'italic',
    },
    table: {
      'border-collapse': 'collapse',
      width: '100%',
      'margin-top': '0',
      'margin-bottom': '24px',
      'font-size': '14px',
      'letter-spacing': '0.3px',
    },
    th: {
      'background-color': '#e8e4d8',
      color: '#1c2b1e',
      border: '1px solid #c8d5c9',
      'border-bottom': '2px solid #2e7d32',
      padding: '8px 14px',
      'font-weight': '600',
      'text-align': 'left',
      'letter-spacing': '0.3px',
    },
    td: {
      border: '1px solid #c8d5c9',
      padding: '8px 14px',
      color: '#1c2b1e',
    },
    kbd: {
      display: 'inline-block',
      'background-color': '#fdfcf7',
      color: '#1c2b1e',
      border: '1px solid #c8d5c9',
      'border-bottom-width': '2px',
      'border-radius': '6px',
      padding: '2px 6px',
      'font-size': '12px',
      'line-height': '1.4',
      'letter-spacing': '0.2px',
      'vertical-align': 'middle',
    },
    pre: {
      'padding-top': '14px',
      'padding-right': '16px',
      'padding-bottom': '14px',
      'padding-left': '16px',
      'border-radius': '10px',
      'overflow-x': 'auto',
      'white-space': 'pre',
      'max-width': '100%',
      'box-sizing': 'border-box',
      'margin-top': '0',
      'margin-bottom': '22px',
      'font-size': '13px',
      'line-height': '1.65',
    },
    code: {
      'background-color': '#e8e4d8',
      color: '#1b5e20',
      padding: '1px 5px',
      'border-radius': '5px',
      'font-size': '14px',
      'font-weight': '500',
      'letter-spacing': '0',
    },
    a: {
      color: '#2e7d32',
      'text-decoration': 'underline',
      'text-underline-offset': '3px',
    },
    hr: {
      border: 'none',
      height: '1px',
      'background-color': '#c8d5c9',
      'margin-top': '28px',
      'margin-bottom': '28px',
    },
    img: {
      'max-width': '100%',
      display: 'block',
      'margin-top': '18px',
      'margin-right': 'auto',
      'margin-bottom': '18px',
      'margin-left': 'auto',
      border: '1px solid #c8d5c9',
      'border-radius': '10px',
    },
    strong: { 'font-weight': '700', color: '#1c2b1e' },
    em: { 'font-style': 'italic', color: '#1c2b1e' },
  },

  // ============================================================
  // 容器视觉
  // ============================================================
  containers: {
    // intro：铜版纸底 + 左 4px 森林绿条 + 大圆角（本文要点/学习目标）
    intro: {
      'background-color': '#f5f2ea',
      'border-left': '4px solid #2e7d32',
      'border-radius': '0 14px 14px 0',
      padding: '16px 20px',
      margin: '22px 0',
      color: '#5c6b5e',
    },

    // author：无底色，底部细线分隔，轻量
    author: {
      __reset: true,
      'background-color': 'transparent',
      padding: '8px 0',
      margin: '12px 0',
      color: '#5c6b5e',
      'border-bottom': '1px solid #c8d5c9',
    },

    // cover：温暖铜版纸底，底部浅绿分隔
    cover: {
      'background-color': '#f5f2ea',
      padding: '22px 0 26px',
      margin: '16px 0',
      'border-bottom': '2px solid #2e7d32',
    },

    // 四态 admonition 走 card-shadow variant，外壳样式由 variant 承担
    tip: {},
    warning: {},
    info: {},
    danger: {},

    // quoteCard："今日名言 / 知识要点"，森林绿左条 + 暖底
    quoteCard: {
      'background-color': '#f5f2ea',
      'border-left': '4px solid #2e7d32',
      padding: '16px 20px',
      margin: '22px 0',
      'border-radius': '0 14px 14px 0',
    },

    // highlight："重点提醒"，暖橙左条 + 浅橙底
    highlight: {
      'background-color': '#fdf0e6',
      'border-left': '4px solid #f57c00',
      padding: '14px 20px',
      margin: '20px 0',
      'border-radius': '0 14px 14px 0',
    },

    compare: { margin: '22px 0' },

    // steps：左侧绿色竖线 + 宽 padding（步骤流水线感）
    steps: {
      margin: '22px 0',
      'border-left': '2px solid #2e7d32',
      'padding-left': '24px',
    },

    // sectionTitle：kicker-stack variant 的外壳
    sectionTitle: {
      margin: '36px 0 16px',
      'padding-bottom': '8px',
      'border-bottom': '2px solid #2e7d32',
    },

    // footerCTA：三联 CTA（学/练/问），暖底 + 大圆角
    footerCTA: {
      margin: '28px 0',
      padding: '18px 20px',
      'background-color': '#f5f2ea',
      'border-radius': '14px',
    },

    // recommend：书单推荐，上下绿线分隔
    recommend: {
      __reset: true,
      margin: '26px 0',
      padding: '16px 0',
      'background-color': 'transparent',
      'border-top': '2px solid #2e7d32',
      'border-bottom': '1px solid #c8d5c9',
    },

    qrcode: {
      margin: '24px 0',
      padding: '18px',
      'background-color': '#f5f2ea',
      'border-radius': '14px',
    },

    voiceCard: {
      margin: '20px 0',
      padding: '14px 18px',
      'background-color': '#f5f2ea',
      'border-radius': '10px',
      'border': '1px solid #c8d5c9',
    },

    videoCard: {
      margin: '20px 0',
      'border-radius': '10px',
      overflow: 'hidden',
    },

    announcement: {
      margin: '20px 0',
      padding: '14px 18px',
      'background-color': '#fce8e8',
      'border-left': '4px solid #b71c1c',
      'border-radius': '0 10px 10px 0',
    },

    authorBio: {
      margin: '20px 0',
      padding: '18px',
      'background-color': '#f5f2ea',
      'border-radius': '14px',
      border: '1px solid #c8d5c9',
    },

    imageCaption: {
      margin: '4px 0 20px 0',
      'text-align': 'center',
      'font-size': '12px',
      color: '#5c6b5e',
      'padding-top': '6px',
      'border-top': '1px solid #c8d5c9',
      'letter-spacing': '0.3px',
    },

    timeline: {
      margin: '22px 0',
      'border-left': '2px solid #2e7d32',
      'padding-left': '20px',
    },

    // note：悬挂缩进，中性低调
    note: {
      __reset: true,
      'background-color': 'transparent',
      'border-top': '1px dashed #c8d5c9',
      padding: '10px 0 4px 0',
      margin: '20px 0',
      'border-radius': '0',
    },

    abstract: {
      'background-color': '#f5f2ea',
      'border-left': '4px solid #2e7d32',
      'border-radius': '0 14px 14px 0',
      padding: '16px 20px',
      margin: '22px 0',
    },

    keyNumber: {
      margin: '22px 0',
      padding: '18px 20px',
      'background-color': '#f5f2ea',
      'border-radius': '14px',
      'text-align': 'center',
    },

    // dialogue：问答课堂核心，轻底色区分问与答
    dialogue: {
      margin: '22px 0',
    },

    pullQuote: {
      margin: '28px 0',
      'text-align': 'center',
    },

    tableCard: {
      margin: '22px 0',
      'border-radius': '10px',
      overflow: 'hidden',
    },

    gallery: {
      margin: '22px 0',
    },

    footnotes: {
      margin: '24px 0',
      padding: '14px 0',
      'border-top': '1px solid #c8d5c9',
      'font-size': '13px',
      color: '#5c6b5e',
    },

    colophon: {
      margin: '24px 0',
      padding: '14px 0',
      'border-top': '2px solid #2e7d32',
      color: '#5c6b5e',
      'font-size': '12px',
    },

    // data-brief 家族（教育内容偶尔用到）
    masthead: {
      margin: '0 0 24px 0',
      padding: '14px 0',
      'border-bottom': '2px solid #2e7d32',
    },
    sectionTag: {
      display: 'inline-block',
      'background-color': '#2e7d32',
      color: '#fefefe',
      padding: '2px 10px',
      'border-radius': '12px',
      'font-size': '12px',
      'letter-spacing': '0.5px',
    },
    byline: {
      margin: '12px 0',
      padding: '8px 0',
      'border-bottom': '1px solid #c8d5c9',
      color: '#5c6b5e',
      'font-size': '13px',
    },
    editorialHeader: {
      margin: '20px 0',
      padding: '20px 0',
    },
    toc: {
      margin: '20px 0',
      padding: '16px 18px',
      'background-color': '#f5f2ea',
      'border-radius': '14px',
      border: '1px solid #c8d5c9',
    },
    kpiDashboard: {
      margin: '20px 0',
      padding: '16px',
      'background-color': '#f5f2ea',
      'border-radius': '14px',
    },
    barChart: {
      margin: '20px 0',
    },
    qaBlock: {
      margin: '20px 0',
      padding: '16px 18px',
      'background-color': '#f5f2ea',
      'border-radius': '14px',
    },
  },

  // ============================================================
  // 主题 kicker 覆盖（教育友好语言）。ThemeKickers 是**容器**级 kicker
  // （toc/qaBlock/recommend/footerCTATitle/colophon），不含 admonition kind 标签。
  // admonition tip/warning 文案由作者侧 `::: tip <text>` 现写决定。
  // 本主题暂无容器级 kicker 需要覆盖；保留空对象做 voice 占位。
  // ============================================================
  kickers: {},

  // ============================================================
  // 模板片段
  // ============================================================
  templates: {
    tip: `::: tip 小贴士
在这里写一句提醒读者的经验法则或记忆方法。
:::
`,
    cover: `::: cover 课题名称
本节核心问题或一句立意。

**适合年龄：** \`8岁以上\` **难度：** \`★★☆\`

_预计阅读 8 分钟 · 家长可与孩子共读_
:::
`,
    steps: `::: steps 操作步骤
### 第一步

写清楚要做什么。

### 第二步

继续下一个动作。
:::
`,
  },

  // ============================================================
  // 签名容器（教育核心）
  // ============================================================
  signatureContainers: ['steps', 'tip', 'info', 'recommend', 'dialogue', 'announcement', 'intro'],

  svgVariant: 'soft',

  meta: {
    createdAt: '2026-05-17',
    ownerNotes:
      'orphan 升级：admonition=card-shadow / tableCard=zebra-rows / note=hanging-indent。' +
      'primary #2e7d32 森林绿，accent #f57c00 暖橙，bg #fdfcf7 铜版纸。' +
      'introDropcap 轻量化（primary 42px），steps 绿色竖线，highlight 马克笔暖黄底。',
  },
}

export default spec
