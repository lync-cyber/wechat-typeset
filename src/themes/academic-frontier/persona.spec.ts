/**
 * academic-frontier · 学术前沿 · PersonaSpec
 *
 * 定位（规范 §0 一句话）：**同行评审级的学术论文被搬到公众号**。
 * 参照坐标：Nature / Science / Cell 正刊 · arXiv preprint · LaTeX article 默认输出 ·
 *   ACM / IEEE transactions · Anthropic/OpenAI research 页面 · Knuth TAOCP 脚注纪律。
 * 气质关键词：**论文、证据、克制、无装饰**。
 *
 * 与 tech-geek 的硬边界（规范 §0）：
 *   - 底色白 vs 暖黑；编号 1.1 vs §；引用上标 ¹²³ vs 方括号 [1]；主色深靛 vs VT220 琥珀
 *
 * 与 business-finance 的硬边界（规范 §0）：
 *   - `<strong>` **几乎不用**（business 承载核心判断）；强调走 `<em>` italic
 *   - 禁用涨跌色隐喻；footer = 致谢 + Cite As（不是订阅钩子）
 *   - highlight = Key Finding 文字卡（不是巨号数字 callout）
 *   - compare = ablation table（不是两栏 pros/cons 或 ledger）
 *
 * 三条不可妥协决策（规范 §4 结语）：
 *   1. primary 深靛 #1e2c4a 而非暗酒红（Nature/NeurIPS 家族 + 避开中文语境"党政红书封"误读）
 *   2. 极少装饰是纪律——仅 theoremMark ■ + 1px h2 竖线 + 极细 rule；删除 wave / flower
 *   3. 四态辨识靠英文术语标签（Definition. / Methods. / Limitations. / Fallacy.）+ 形状
 *      冗余（左竖条 / 下划线 / 虚线框 / L 形缺角），accent 色只做冗余信号
 *
 * accent 稀缺纪律：深酒红 #8a2a2a 每篇最多 5 次（danger 外框 + danger 标签 +
 *   Finding 竖条 + Finding 标签 + DOI 锚色）——超 5 次即降格。
 */

import type { PersonaSpec } from '../_shared/spec'

export const spec: PersonaSpec = {
  id: 'academic-frontier',
  name: '学术前沿',
  description: 'Nature / arXiv / LaTeX article 家族，研究者写给同行评审的严谨陈述',
  audience: '学术研究者 / 同行评审向的论文化陈述',

  // ============================================================
  // 色板（规范 §1.1 色彩表）
  // ============================================================
  palette: {
    primary: '#1e2c4a',
    secondary: '#4a5670',
    accent: '#8a2a2a',
    bg: '#fefefe',
    bgSoft: '#f6f6f4',
    bgMuted: '#ececea',
    text: '#16181d',
    textMuted: '#5a5d64',
    textInverse: '#fefefe',
    border: '#d8d8d4',
    code: '#1a1a1a',
  },

  // 语义四色（规范 §1.1 语义色表）
  //
  // 学术语境**不走交通灯**——Nature/arXiv 里 "Caveat" 不用红色警示，
  // 而是用"更灰、更轻"的存疑标识：读者注意到的不是"危险"而是"学者的犹豫"。
  //   - danger 改 **墨灰** #3a3e48（不再是深酒红）——视觉比正文更轻而非更重
  //   - 其余保持：tip=primary 深靛 / info=secondary 靛灰 / warning=古土黄
  status: {
    // tip = Definition；与 primary 共色
    tip: { accent: '#1e2c4a', soft: '#f3f4f7' },
    // info = Methods；= secondary 引文靛灰
    info: { accent: '#4a5670', soft: '#f1f2f4' },
    // warning = Limitations；古文献土黄
    warning: { accent: '#5a4a18', soft: '#f5f2e8' },
    // danger = Caveat；墨灰（打破 danger=红公式 —— 学术语境要"轻"）
    danger: { accent: '#3a3e48', soft: '#eeeff2' },
  },

  // ============================================================
  // 字号 / 间距 / 圆角
  // ============================================================
  typography: {
    baseSize: 15,
    lineHeight: 1.75,
    h1Size: 24,
    h2Size: 18,
    h3Size: 16,
    letterSpacing: 0.3,
  },
  spacing: {
    paragraph: 18,
    section: 36,
    listItem: 8,
    containerPadding: 18,
  },
  // 规范 §2.6 / §3.5：所有容器 radius ≤ 2px
  radius: { sm: 2, md: 2, lg: 2 },

  // ============================================================
  // Motifs（规范 §1.3 "无装饰是纪律"）
  // ============================================================
  motifs: {
    // h2Prefix · 1px 深靛竖线（规范 §1.3 ①）
    h2Prefix: {
      viewBox: [0, 0, 2, 16],
      width: 2,
      height: 16,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 10 },
      primitives: [{ type: 'rect', x: 0, y: 1, w: 2, h: 14, fill: '#1e2c4a' }],
    },

    // sectionCorner · 极简 L 形直角（规范 §1.3 ③ figureCorner）
    sectionCorner: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        {
          type: 'path',
          d: 'M1,1 L1,8 M1,1 L8,1',
          stroke: '#d8d8d4',
          strokeWidth: 1,
        },
      ],
    },

    // stepBadge(n) · 极简文字徽章（规范 §2.16 steps）——本主题 steps 走 timeline-dot，
    //   此处保留字号 14 的文字占位作契约兜底（作者切 variant=number-circle 仍可用）
    stepBadge: {
      viewBox: [0, 0, 20, 20],
      width: 20,
      height: 20,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 8 },
      placeholders: ['N'],
      primitives: [
        {
          type: 'text',
          x: 10,
          y: 15,
          content: '{N}',
          fontSize: 14,
          fontWeight: 500,
          fill: '#1e2c4a',
          textAnchor: 'middle',
        },
      ],
    },

    // dividerDots · 三点（次选 fallback）
    dividerDots: {
      viewBox: [0, 0, 240, 8],
      width: 220,
      height: 8,
      primitives: [
        { type: 'circle', cx: 108, cy: 4, r: 1.2, fill: '#d8d8d4' },
        { type: 'circle', cx: 120, cy: 4, r: 1.2, fill: '#d8d8d4' },
        { type: 'circle', cx: 132, cy: 4, r: 1.2, fill: '#d8d8d4' },
      ],
    },

    // dividerFlower · 退化为 ⁂ 三星号 glyph（规范 §2.17 scene break，每篇 ≤ 1 次）
    dividerFlower: {
      viewBox: [0, 0, 240, 16],
      width: 220,
      height: 16,
      primitives: [
        {
          type: 'text',
          x: 120,
          y: 13,
          content: '⁂',
          fontSize: 14,
          fill: '#5a5d64',
          textAnchor: 'middle',
          letterSpacing: 4,
        },
      ],
    },

    // dividerWave · 退化到平直 rule（规范 §1.3 "必删 wave"）——给纯直线兜底
    dividerWave: {
      viewBox: [0, 0, 240, 4],
      width: 220,
      height: 4,
      primitives: [
        { type: 'line', x1: 20, y1: 2, x2: 220, y2: 2, stroke: '#d8d8d4', strokeWidth: 1 },
      ],
    },

    // tipIcon（Definition）：实心小方块——呼应 theoremMark 的边界语义
    tipIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [{ type: 'rect', x: 4, y: 4, w: 6, h: 6, fill: '#1e2c4a' }],
    },

    // infoIcon（Methods）：短下横线——呼应 minimal-underline 形状
    infoIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        { type: 'line', x1: 3, y1: 10, x2: 11, y2: 10, stroke: '#4a5670', strokeWidth: 1.4 },
      ],
    },

    // warningIcon（Limitations）：四点虚框——呼应 warning 容器 dashed border
    //   原 rect + stroke-dasharray；MotifPrimitive rect 无 dasharray 字段，转写为 path
    warningIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        {
          type: 'path',
          d: 'M3,3 L11,3 L11,11 L3,11 Z',
          stroke: '#5a4a18',
          strokeWidth: 1,
          strokeDasharray: '1.5 1.5',
        },
      ],
    },

    // dangerIcon（Fallacy）：L 形双线——呼应 danger 容器的 L 形缺角
    dangerIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
      primitives: [
        { type: 'path', d: 'M2,2 L2,7 M2,2 L7,2', stroke: '#8a2a2a', strokeWidth: 1.2 },
        { type: 'path', d: 'M12,12 L12,7 M12,12 L7,12', stroke: '#8a2a2a', strokeWidth: 1.2 },
      ],
    },
    // 规范 §1.3 "必删 quoteMark"——故意不导出，classic variant 走 FALLBACK_OPEN_MARK 字符回退
  },

  // ============================================================
  // 骨架变体（规范 §2 每节的 primary variant）
  // ============================================================
  variants: {
    // 全主题签名：LaTeX 定理框（细 1px 边框 + DEFINITION./REMARK./LEMMA./CAVEAT. 小型大写标题）
    // 取代泛用 accent-bar——academic-frontier 真正承继的是 Nature/arXiv 的 \begin{theorem} 视觉
    admonition: 'sidenote-latex',
    quote: 'frame-brackets',
    compare: 'column-card',
    steps: 'timeline-dot',
    divider: 'rule',
    sectionTitle: 'bordered',
    codeBlock: 'bare',
  },

  // ============================================================
  // 元素级样式（规范 §1.2 typographic voice）
  // ============================================================
  elements: {
    h1: {
      'font-size': '24px',
      'font-weight': '600',
      color: '#16181d',
      'margin-top': '28px',
      'margin-bottom': '14px',
      'line-height': '1.4',
      'letter-spacing': '0.2px',
    },
    h2: {
      'font-size': '18px',
      'font-weight': '600',
      color: '#16181d',
      'margin-top': '32px',
      'margin-bottom': '12px',
      'line-height': '1.45',
      'letter-spacing': '0.1px',
      'border-bottom': 'none',
      'padding-bottom': '0',
    },
    h3: {
      'font-size': '16px',
      'font-weight': '600',
      color: '#16181d',
      'margin-top': '22px',
      'margin-bottom': '10px',
      'line-height': '1.55',
      'letter-spacing': '0',
    },
    h4: {
      'font-size': '15px',
      'font-weight': '600',
      color: '#16181d',
      'margin-top': '18px',
      'margin-bottom': '8px',
      'line-height': '1.6',
      'letter-spacing': '0',
    },
    p: {
      'font-size': '15px',
      'line-height': '1.75',
      color: '#16181d',
      'margin-top': '0',
      'margin-bottom': '18px',
      'letter-spacing': '0.3px',
    },
    blockquote: {
      'border-left': '3px solid #d8d8d4',
      'background-color': 'transparent',
      color: '#5a5d64',
      'padding-top': '4px',
      'padding-right': '0',
      'padding-bottom': '4px',
      'padding-left': '16px',
      'margin-top': '0',
      'margin-bottom': '18px',
      'border-radius': '0',
      'font-size': '14px',
      'line-height': '1.7',
    },
    ul: { 'padding-left': '24px', 'margin-top': '0', 'margin-bottom': '18px' },
    ol: { 'padding-left': '24px', 'margin-top': '0', 'margin-bottom': '18px' },
    li: {
      'margin-bottom': '8px',
      'line-height': '1.75',
      color: '#16181d',
      'letter-spacing': '0.3px',
    },
    strong: {
      'font-weight': '600',
      color: '#16181d',
    },
    em: {
      'font-style': 'italic',
      'font-weight': '500',
      color: '#16181d',
    },
    a: {
      color: '#4a5670',
      'text-decoration': 'underline',
      'text-underline-offset': '3px',
    },
    hr: {
      border: 'none',
      height: '1px',
      'background-color': '#d8d8d4',
      'margin-top': '24px',
      'margin-bottom': '24px',
    },
    img: {
      'max-width': '100%',
      display: 'block',
      'margin-top': '12px',
      'margin-right': 'auto',
      'margin-bottom': '8px',
      'margin-left': 'auto',
      'border-radius': '2px',
    },
    table: {
      'border-collapse': 'collapse',
      width: '100%',
      'margin-top': '0',
      'margin-bottom': '18px',
      'font-size': '14px',
      border: '1px solid #d8d8d4',
    },

    // 代码块（规范 §1.1 code = 中性深墨 + 灰底，不染 primary）
    pre: {
      'background-color': '#ececea',
      color: '#1a1a1a',
      'padding-top': '12px',
      'padding-right': '14px',
      'padding-bottom': '12px',
      'padding-left': '14px',
      'border-radius': '2px',
      border: '1px solid #d8d8d4',
      'overflow-x': 'auto',
      'white-space': 'pre',
      'max-width': '100%',
      'box-sizing': 'border-box',
      'box-shadow': 'inset -14px 0 10px -10px rgba(0,0,0,0.12)',
      'margin-top': '0',
      'margin-bottom': '20px',
      'font-size': '13px',
      'line-height': '1.65',
    },
    code: {
      'background-color': '#f6f6f4',
      color: '#1a1a1a',
      padding: '1px 4px',
      'border-radius': '2px',
      'font-size': '14px',
      'font-weight': '500',
    },
  },

  // ============================================================
  // 内联强调（规范 §1.3）
  // ============================================================
  inline: {
    // 规范 §1.3 "拒绝荧光黄 highlight"——改走 bgSoft 超浅底
    highlight: {
      'background-color': '#f6f6f4',
      color: '#16181d',
      padding: '0 3px',
      'border-radius': '2px',
    },
    // 波浪线走 secondary 引文靛灰（accent 预算稀缺）
    wavy: {
      'text-decoration': 'underline wavy',
      'text-decoration-color': '#4a5670',
      'text-underline-offset': '3px',
    },
    // emphasis（`[.xxx.]`）走 italic + 500——与 <em> 同策略，不染色
    emphasis: {
      'font-style': 'italic',
      'font-weight': '500',
      color: '#16181d',
    },
  },

  // ============================================================
  // 容器视觉（规范 §2 的 19 个 container）
  // ============================================================
  containers: {
    // 规范 §2.1 intro = 摘要（Abstract）：上下 1px border 横线夹住
    intro: {
      'background-color': 'transparent',
      'border-top': '1px solid #d8d8d4',
      'border-bottom': '1px solid #d8d8d4',
      'border-radius': '0',
      padding: '16px 0',
      margin: '0 0 28px 0',
      color: '#5a5d64',
      'line-height': '1.75',
    },
    // 规范 §2.2 author = 通讯作者：冷、静、不居中
    author: {
      'background-color': 'transparent',
      'border-radius': '0',
      padding: '0',
      margin: '0 0 20px 0',
      'font-size': '13px',
      color: '#5a5d64',
      'line-height': '1.7',
    },
    // 规范 §2.3 cover = 标题块：无图版式
    cover: {
      margin: '0 0 24px 0',
    },
    // 四态容器外壳（variant 接管 wrapperCSS）
    tip: {},
    warning: {},
    info: {},
    danger: {},
    // 规范 §2.6 quoteCard = 定理声明框（本主题签名）
    quoteCard: {
      'background-color': '#fefefe',
      padding: '0',
      margin: '20px 0',
      'border-radius': '2px',
      border: '1px solid #d8d8d4',
    },
    // 规范 §2.14 highlight = Key Finding：左 2px accent 深酒红细竖条
    highlight: {
      'background-color': '#f6f6f4',
      'border-left': '2px solid #8a2a2a',
      padding: '12px 16px 12px 18px',
      margin: '20px 0',
      'border-radius': '2px',
    },
    // 规范 §2.15 compare = ablation table
    compare: { margin: '22px 0' },
    // 规范 §2.16 steps = 方法流程
    steps: { margin: '22px 0' },
    // 规范 §2.4 sectionTitle = § Heading：下方 1px secondary 通栏短线
    sectionTitle: {
      margin: '36px 0 16px',
      'padding-bottom': '6px',
      'border-bottom': '1px solid #4a5670',
    },
    // 规范 §2.7 footerCTA = 致谢 + Cite As（拒绝订阅钩子）
    footerCTA: {
      margin: '40px 0 24px 0',
      padding: '18px 0',
      'background-color': 'transparent',
      'border-top': '1px solid #d8d8d4',
      'border-bottom': '1px solid #d8d8d4',
      'border-radius': '0',
    },
    // 规范 §2.8 recommend = References：悬挂缩进 APA/Vancouver 格式
    recommend: {
      margin: '24px 0',
      padding: '14px 0',
      'background-color': 'transparent',
      'border-radius': '0',
      'border-top': '1px solid #d8d8d4',
    },
    // 规范 §2.9 qrcode = 通讯地址块（Correspondence）
    qrcode: {
      margin: '32px 0 0 0',
      padding: '0',
      'background-color': 'transparent',
      'border-radius': '0',
    },
  },

  // 签名容器：abstract（文首 tl;dr，学术综述自然入口）+ seeAlso（参考文献列表）
  signatureContainers: ['abstract', 'seeAlso'],

  // ============================================================
  // 模板片段（仅声明相对 commonTemplates 的覆盖键）
  // ============================================================
  templates: {
    // 规范 §2.3 cover：标题块——无图版式，只做"论文头部"风的文字排印
    cover: `::: cover 论文标题
一句话摘要或研究问题——模拟 arXiv preprint 的"标题 + 导语"双层

张三¹, 李四², 王五¹*  ·  ¹某某大学  ·  ²某某研究所  ·  * 通讯作者

关键词：XXX · YYY · ZZZ
:::
`,
    // 规范 §2.2 author：通讯作者——冷静一行文本，不居中无装饰
    authorBar: `::: author 张三¹, 李四²
¹某某大学 计算机系  ·  ²某某研究所  ·  通讯邮箱：zhang@university.edu.cn  ·  投稿日期：2026-04-20
:::
`,
    // 规范 §2.10 tip = Definition：英文术语 label 是第一识别信号
    tip: `::: tip Definition.
设 *X* 为满足 ... 的集合。若存在映射 *f*: *X* → *Y* 使得 ... 恒成立，则称 *f* 为 ...
:::
`,
    // 规范 §2.7 footerCTA = 致谢 + Cite As（拒绝订阅钩子）
    footerCTA: `::: footer-cta ACKNOWLEDGEMENTS
感谢 XX 对本文的审阅，感谢 YY 提供数据。本研究得到 NSFC 资助 (No. xxx)。

CITE AS — 张三, 李四. (2026). 论文标题. 公众号名, 第 N 期. DOI: 10.xxxx/xxxxx
:::
`,
    // 规范 §2.8 recommend = References：悬挂缩进 APA 格式
    recommend: `::: recommend REFERENCES
- [1] Smith, J., & Doe, A. (2024). Title of paper. Journal of Something, 12(3), 345–360.
- [2] Wang, X., Li, Y., & Zhang, Z. (2025). Another title. Nature, 600, 123–130.
- [3] Liu, M. (2026). Preprint title. arXiv: 2601.12345.
:::
`,
  },

  meta: {
    createdAt: '2026-04-20',
    ownerNotes:
      '学术论文感——Nature/arXiv/LaTeX 家族；无装饰纪律：仅 theoremMark ■ + 1px h2 竖线 + 极细 rule。accent 预算 ≤ 5 次/篇。',
  },
}

export default spec
