/**
 * tech-geek · 极客夜行 · PersonaSpec
 *
 * 定位（规范 §0）：**工程师写作**，不是"程序员皮肤"。参照 Plan 9 的 manpage、
 * Phrack 的 ASCII zine 骨架、ACM Queue 的白皮字距、Fabien Sanglard 暗底复古印刷、
 * Knuth 的 TAOCP 章节号与脚注。气质关键词：**成年、克制、琥珀、脚注**。
 *
 * 落地四根红线（规范 §4）：
 *   1. primary = #d4a65a VT220 琥珀（**不再是** #4ec9b0 VSCode 青绿）—— 彻底脱离 IDE 皮肤污名
 *   2. 四态 admonition 靠**注释前缀 + 边框样式 + 图标形状**四重冗余区分，不靠色差：
 *      tip=dashed-border / warning=accent-bar / info=double-border / danger=top-bottom-rule
 *   3. 删除 dividerFlower 频谱条 & 原 sectionCorner 窗口装饰，motif 语汇从
 *      "VSCode 装饰"迁到"manpage 印刷"（§ / ¶ / ⁂ / `[n]`）
 *   4. 深底字重纪律：正文 500（非 400 —— 深底光晕效应会让 400 发虚），
 *      强调 600，严禁 700/800 在大字号主色位（会变"塑料硬边"霓虹招牌）
 *
 * 迁移：Phase 2 · PR 4 · spec-first。index.ts 仅一行投影。
 */

import type { PersonaSpec } from '../_shared/spec'

export const spec: PersonaSpec = {
  id: 'tech-geek',
  name: '极客夜行',
  description: 'VT220 琥珀 + 墨炭暖底 + manpage 印刷传统，成年工程师的工程写作',
  audience: '技术布道 / 工程随笔 / 架构评论（manpage / RFC / TAOCP 脚注风）',

  // ============================================================
  // 色板（规范 §1.1 · VT220 琥珀方向）
  // ============================================================
  palette: {
    primary: '#d4a65a', // VT220 琥珀
    secondary: '#8a7a54', // 旧铜灰 —— divider / border / 脚注号
    accent: '#e06a28', // HN 橙 —— 点睛色，只出现在脚注号
    bg: '#14110d', // 墨炭底 —— 暖黑而非蓝黑
    bgSoft: '#1e1a14', // 炉火暗
    bgMuted: '#2a241c', // 旧纸炭 —— inline code 底
    text: '#e6d9c2', // 羊皮黄（VT220 amber phosphor 底色）
    textMuted: '#8c8272', // 雾色批注
    textInverse: '#14110d', // = bg（深底反白就是深底）
    border: '#3a3228', // 暖深棕灰
    code: '#d4a65a', // = primary（签名：inline code 与正文同家族）
  },

  // 语义四色（规范 §1.1）——终端语境里**不走交通灯**：
  //   - warning 不用黄（黄色在终端是 stdout 正常输出）→ 改 HN 橙 #e06a28（accent）
  //     真正的警告是橙红闪烁，不是"黄色请注意"
  //   - tip 灰绿（NOTE 附注感，非 success 绿勾）；info 冷蓝（REF 引用感）
  //   - danger 陶土红（PITFALL 陷阱，非 error 红警）
  status: {
    tip: { accent: '#a8c08a', soft: '#1e1f16' }, // NOTE 灰绿
    warning: { accent: '#e06a28', soft: '#1e1710' }, // CAVEAT HN 橙（打破 warning=黄公式）
    info: { accent: '#7a9cb8', soft: '#161b1f' }, // SEE ALSO 冷蓝
    danger: { accent: '#c85a3a', soft: '#1f1612' }, // PITFALL 陶土红
  },

  // ============================================================
  // 字号 / 间距 / 圆角
  // ============================================================
  typography: {
    baseSize: 15,
    lineHeight: 1.85, // 工程写作的甜点
    h1Size: 25, // 稀比粗贵
    h2Size: 19,
    h3Size: 16, // 与正文同号，靠字距区分
    letterSpacing: 0.6, // 等宽美学的灵魂
  },
  spacing: { paragraph: 18, section: 28, listItem: 8, containerPadding: 16 },
  radius: { sm: 2, md: 4, lg: 6 },

  // ============================================================
  // Motifs（规范 §1.3：manpage / RFC / Plan 9 / TAOCP 印刷传统）
  //
  // 平台约束：font-size >= 14（spec validator 硬检测，MIN_FONT_SIZE）。
  // 原 assets.ts 里几处 `<text font-size="12|13">` 被统一拉升到 14，
  // 视觉差异微到难以察觉（光栅后 >= 14 是平台稳妥阈）。
  // ============================================================
  motifs: {
    // ① h2Prefix · primary 竖条 + § 字符
    h2Prefix: {
      viewBox: [0, 0, 20, 18],
      width: 18,
      height: 16,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 8 },
      primitives: [
        { type: 'rect', x: 0, y: 2, w: 1.5, h: 14, fill: '#d4a65a' },
        {
          type: 'text',
          x: 6,
          y: 14,
          content: '§',
          fontSize: 14,
          fontWeight: 600,
          fill: '#d4a65a',
        },
      ],
    },

    // ② dividerWave · manpage rule · 虚线 + 两端 §
    dividerWave: {
      viewBox: [0, 0, 240, 16],
      width: 220,
      height: 14,
      primitives: [
        {
          type: 'text',
          x: 4,
          y: 12,
          content: '§',
          fontSize: 14,
          fontWeight: 600,
          fill: '#d4a65a',
        },
        {
          type: 'line',
          x1: 18,
          y1: 8,
          x2: 222,
          y2: 8,
          stroke: '#3a3228',
          strokeWidth: 1,
          strokeDasharray: '4 3',
        },
        {
          type: 'text',
          x: 226,
          y: 12,
          content: '§',
          fontSize: 14,
          fontWeight: 600,
          fill: '#d4a65a',
        },
      ],
    },

    // ③ dividerDots · 5 点省略号（降调：9→5，中间 1 点 primary）
    dividerDots: {
      viewBox: [0, 0, 240, 10],
      width: 220,
      height: 10,
      primitives: [
        { type: 'circle', cx: 80, cy: 5, r: 1.5, fill: '#3a3228' },
        { type: 'circle', cx: 100, cy: 5, r: 1.5, fill: '#3a3228' },
        { type: 'circle', cx: 120, cy: 5, r: 1.8, fill: '#d4a65a' },
        { type: 'circle', cx: 140, cy: 5, r: 1.5, fill: '#3a3228' },
        { type: 'circle', cx: 160, cy: 5, r: 1.5, fill: '#3a3228' },
      ],
    },

    // ④ dividerFlower · ruler-double RFC 大分隔（两根平行 1px 实线）
    dividerFlower: {
      viewBox: [0, 0, 240, 8],
      width: 220,
      height: 8,
      primitives: [
        { type: 'line', x1: 12, y1: 3, x2: 228, y2: 3, stroke: '#3a3228', strokeWidth: 1 },
        { type: 'line', x1: 12, y1: 6, x2: 228, y2: 6, stroke: '#3a3228', strokeWidth: 1 },
      ],
    },

    // ⑤ quoteMark · heredoc `<` `>` 精修（primary 琥珀，stroke 2px）
    quoteMark: {
      viewBox: [0, 0, 40, 24],
      width: 36,
      height: 22,
      inlineStyle: { display: 'inline-block', verticalAlign: 'top', marginRight: 6 },
      primitives: [
        {
          type: 'path',
          d: 'M12,4 L4,12 L12,20',
          stroke: '#d4a65a',
          strokeWidth: 2,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        },
        {
          type: 'path',
          d: 'M28,4 L36,12 L28,20',
          stroke: '#d4a65a',
          strokeWidth: 2,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        },
      ],
    },

    // ⑥ sectionCorner · § 章节号（manpage heading prefix）
    sectionCorner: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        {
          type: 'text',
          x: 8,
          y: 13,
          content: '§',
          fontSize: 14,
          fontWeight: 600,
          fill: '#d4a65a',
          textAnchor: 'middle',
        },
      ],
    },

    // ⑦ tipIcon · 故意不导出 —— 规范 §2.10 "无"
    //    注释前缀语 `// NOTE` + 虚线已是四重冗余的 3 重，不再加图标。
    //    原 assets.ts 用空字符串 `''` 占位；spec 层直接省略该 key，渲染器读 undefined 等价。

    // ⑧ warningIcon · `[!]` 方括号感叹号（manpage 风，非三角警告）
    warningIcon: {
      viewBox: [0, 0, 20, 16],
      width: 18,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        {
          type: 'text',
          x: 10,
          y: 13,
          content: '[!]',
          fontSize: 14,
          fontWeight: 600,
          fill: '#d4a65a',
          textAnchor: 'middle',
        },
      ],
    },

    // ⑨ infoIcon · `¶` pilcrow（Knuth 排版段落标记）
    infoIcon: {
      viewBox: [0, 0, 14, 16],
      width: 12,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        {
          type: 'text',
          x: 7,
          y: 13,
          content: '¶',
          fontSize: 14,
          fontWeight: 600,
          fill: '#7a9cb8',
          textAnchor: 'middle',
        },
      ],
    },

    // ⑩ dangerIcon · `[X]` 方括号叉（STOP 风）
    dangerIcon: {
      viewBox: [0, 0, 20, 16],
      width: 18,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        {
          type: 'text',
          x: 10,
          y: 13,
          content: '[X]',
          fontSize: 14,
          fontWeight: 600,
          fill: '#c85a3a',
          textAnchor: 'middle',
        },
      ],
    },

    // ⑪ stepBadge · 方括号脚注 `[N]`（TAOCP footnote 号）
    stepBadge: {
      viewBox: [0, 0, 32, 22],
      width: 28,
      height: 20,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 8 },
      placeholders: ['N'],
      primitives: [
        {
          type: 'text',
          x: 16,
          y: 17,
          content: '[{N}]',
          fontSize: 16,
          fontWeight: 600,
          fill: '#d4a65a',
          textAnchor: 'middle',
        },
      ],
    },
  },

  // ============================================================
  // 骨架变体（规范 §2 —— manpage / RFC 工程写作语汇）
  // ============================================================
  variants: {
    admonition: 'manpage-log', // 全主题签名：manpage 日志输出块（顶底分隔线 + :: TAG :: 状态条）
    quote: 'frame-brackets', // manpage 四角括号
    compare: 'column-card', // RFC alternatives
    steps: 'number-circle', // 方括号脚注号
    divider: 'wave', // manpage-rule（§ ——— §）
    sectionTitle: 'cornered', // § heading prefix
    codeBlock: 'bare', // code 与正文同色系，无需 header-bar
  },

  // ============================================================
  // 元素级样式（规范 §1.2 typographic voice）
  // ============================================================
  elements: {
    // h1 25 / 600 / 2px / 1.4 —— 深底大标题不上 700
    h1: {
      'font-size': '25px',
      'font-weight': '600',
      color: '#e6d9c2',
      'margin-top': '28px',
      'margin-bottom': '16px',
      'line-height': '1.4',
      'letter-spacing': '2px',
    },
    // h2 19 / 600 / 1.5px / 1.5 + h2Prefix SVG 注入 § + 1px 虚线下划线
    h2: {
      'font-size': '19px',
      'font-weight': '600',
      color: '#e6d9c2',
      'margin-top': '30px',
      'margin-bottom': '14px',
      'line-height': '1.5',
      'letter-spacing': '1.5px',
      'padding-bottom': '6px',
      'border-bottom': '1px dashed #3a3228',
    },
    // h3 16 / 600 / 1px / 1.6 —— 与正文同号靠字距区分
    h3: {
      'font-size': '16px',
      'font-weight': '600',
      color: '#e6d9c2',
      'margin-top': '22px',
      'margin-bottom': '10px',
      'line-height': '1.6',
      'letter-spacing': '1px',
    },
    // h4：steps 条目标题
    h4: {
      'font-size': '15px',
      'font-weight': '600',
      color: '#e6d9c2',
      'margin-top': '18px',
      'margin-bottom': '8px',
      'line-height': '1.55',
      'letter-spacing': '0.8px',
    },
    // 深底纪律：正文字重 500 / 行高 1.85 / 字距 0.6px
    p: {
      'font-size': '15px',
      'font-weight': '500',
      'line-height': '1.85',
      color: '#e6d9c2',
      'margin-top': '0',
      'margin-bottom': '18px',
      'letter-spacing': '0.6px',
    },
    // 裸 blockquote = pull-quote：左 1px border 竖线 + 无底色
    blockquote: {
      'border-left': '1px solid #3a3228',
      'border-right': 'none',
      'background-color': 'transparent',
      color: '#8c8272',
      'padding-top': '6px',
      'padding-right': '0',
      'padding-bottom': '6px',
      'padding-left': '18px',
      'margin-top': '0',
      'margin-bottom': '18px',
      'border-radius': '0',
      'font-style': 'normal',
      'letter-spacing': '0.6px',
    },
    ul: { 'padding-left': '24px', 'margin-top': '0', 'margin-bottom': '18px' },
    ol: { 'padding-left': '24px', 'margin-top': '0', 'margin-bottom': '18px' },
    li: {
      'margin-bottom': '8px',
      'font-weight': '500',
      'line-height': '1.85',
      color: '#e6d9c2',
      'letter-spacing': '0.6px',
    },
    // strong 600 —— 深底大字号 + 700/800 = 塑料霓虹招牌
    strong: { 'font-weight': '600', color: '#d4a65a' },
    // em 保留 italic 作保底；走 primary 色
    em: { 'font-style': 'italic', color: '#d4a65a' },
    // 链接走 accent HN 橙 + 下划线
    a: {
      color: '#e06a28',
      'text-decoration': 'underline',
      'text-underline-offset': '3px',
    },
    hr: {
      border: 'none',
      height: '1px',
      'background-color': '#3a3228',
      'margin-top': '24px',
      'margin-bottom': '24px',
    },
    img: {
      'max-width': '100%',
      display: 'block',
      'margin-top': '12px',
      'margin-right': 'auto',
      'margin-bottom': '12px',
      'margin-left': 'auto',
      'border-radius': '4px',
    },

    // 代码块（规范 §1.3 非割裂设计 —— code 与正文同色系）
    pre: {
      'background-color': '#1e1a14',
      color: '#e6d9c2',
      'padding-top': '14px',
      'padding-right': '16px',
      'padding-bottom': '14px',
      'padding-left': '16px',
      'border-radius': '4px',
      'overflow-x': 'auto',
      'white-space': 'pre',
      'max-width': '100%',
      'box-sizing': 'border-box',
      'box-shadow': 'inset -14px 0 10px -10px rgba(0,0,0,0.35)',
      'margin-top': '0',
      'margin-bottom': '20px',
      'font-size': '13px',
      'font-weight': '500',
      'line-height': '1.7',
      'letter-spacing': '0.4px',
    },
    // inline code：与正文同号；只靠 letter-spacing +0.2px 和 primary 琥珀色区分
    code: {
      'background-color': '#2a241c',
      color: '#d4a65a',
      padding: '1px 5px',
      'border-radius': '2px',
      'font-size': '15px',
      'font-weight': '500',
      'letter-spacing': '0.8px',
    },
  },

  // ============================================================
  // 内联强调（规范 §1.2 · §3.7）
  // ============================================================
  inline: {
    // highlight 走 bgMuted 近底色 + primary 字色（"标记"不是"涂鸦"）
    highlight: {
      'background-color': '#2a241c',
      color: '#d4a65a',
      padding: '0 4px',
      'border-radius': '2px',
      'font-weight': '600',
    },
    wavy: {
      'text-decoration': 'underline wavy',
      'text-decoration-color': '#e06a28',
      'text-underline-offset': '3px',
    },
    // 关键词强调：primary + 600 —— 与 strong 同档
    emphasis: {
      color: '#d4a65a',
      'font-weight': '600',
    },
  },

  // ============================================================
  // 容器视觉（规范 §2 的 19 个 container 工程写作语汇）
  // ============================================================
  containers: {
    // intro = Abstract：上下 1px 实线 + textMuted + 透明底
    intro: {
      'background-color': 'transparent',
      'border-top': '1px solid #3a3228',
      'border-bottom': '1px solid #3a3228',
      'border-radius': '0',
      padding: '16px 0',
      margin: '0 0 24px 0',
      color: '#8c8272',
      'font-size': '14px',
      'letter-spacing': '0.5px',
    },
    // author = Colophon：无底色 + 13px textMuted
    author: {
      display: 'inline-block',
      'background-color': 'transparent',
      border: 'none',
      'border-radius': '0',
      padding: '2px 0',
      margin: '0 0 20px 0',
      color: '#8c8272',
      'font-size': '13px',
      'letter-spacing': '0.6px',
    },
    // cover = Title Block
    cover: {
      margin: '0 0 28px 0',
    },
    // admonition 四态 variant 接管
    tip: {},
    warning: {},
    info: {},
    danger: {},
    // quoteCard = Footnote Card：bgSoft 底 + 无边框
    quoteCard: {
      'background-color': '#1e1a14',
      padding: '18px 20px',
      margin: '24px 0',
      'border-radius': '4px',
      'letter-spacing': '0.8px',
    },
    // highlight = Key Number
    highlight: {
      'background-color': '#1e1a14',
      padding: '18px 20px',
      margin: '20px 0',
      'border-radius': '4px',
    },
    // compare = Trade-off（column-card variant 接管）
    compare: { margin: '24px 0' },
    // steps = Algorithm（number-circle variant 配合 stepBadge `[n]`）
    steps: { margin: '24px 0' },
    // sectionTitle：__reset 不承袭 baseContainers 的 border-bottom 实心主色线
    //   cornered variant 接管装饰
    sectionTitle: {
      __reset: true,
      margin: '36px 0 16px',
      'padding-bottom': '6px',
    },
    // footerCTA = See Also：顶部 1px 实线 + 透明底 + 无圆角
    footerCTA: {
      margin: '32px 0 0 0',
      padding: '18px 0 4px 0',
      'background-color': 'transparent',
      'border-top': '1px solid #3a3228',
      'border-radius': '0',
    },
    // recommend = References
    recommend: {
      margin: '24px 0',
      padding: '0',
      'background-color': 'transparent',
      'border-radius': '0',
    },
    // qrcode = Address Block（signature block 风，无边框）
    qrcode: {
      margin: '24px auto',
      padding: '0',
      'background-color': 'transparent',
      'border-radius': '0',
    },
  },

  // Phase 5 候选容器由后续 PR 补；此处仅通用容器
  signatureContainers: [],

  // 自定义模板覆盖（commonTemplates 由 specToTheme 隐式合并为基线）
  templates: {
    // cover = Title Block（无图版式，但支持图）
    cover: `::: cover 专题头 · Title
![封面占位](https://placehold.co/1200x630?text=tech-geek)

副标题：一行冷静的立意。工程随笔 Vol.01 · 2026
:::
`,
    // author = Colophon（前缀 ¶ pilcrow）
    authorBar: `::: author ¶ 某某 · 2026-04-20 · 阅读时长 12 分钟
:::
`,
    // tip = `// NOTE` 签名
    tip: `::: tip // NOTE
这是一条工程附注。行内 \`code\` 与正文同色同族。
:::
`,
    // footerCTA = SEE ALSO
    footerCTA: `::: footer-cta SEE ALSO
- 相关工程随笔 Vol.00（编者按）
- 本篇的数据与实验脚本
:::
`,
  },

  meta: {
    createdAt: '2026-04-20',
    ownerNotes:
      'Phase 2 · PR 4：从 VSCode 皮肤（#4ec9b0 青绿）彻底迁到 VT220 琥珀（#d4a65a） + manpage 印刷传统；四态 admonition 四重冗余（注释前缀/边框样式/图标形状/位置）；motif 字号拉齐 >= 14 以过 MIN_FONT_SIZE 校验（原 12/13 仅 1-2px 差异，光栅后几乎不可察觉）。',
  },
}

export default spec
