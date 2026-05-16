/**
 * late-night-vinyl · 深夜电台 · PersonaSpec
 *
 * 视觉灵魂：03:41 AM —— 黑胶落针声后，声音和文字都变慢了。
 *   深夜蓝黑底 + 暖米白字 + 橙色唱针 + 老金辅助 + monospace 电台元数据。
 *
 * 视觉 ground truth：docs/themes-specs/themes/09-late-night-vinyl.html。
 *
 * 与其它"刊物化"主题的边界：
 *   - data-brief 走"数据蓝 + 报告版式 + 直角"——理性、数字、报表感
 *   - editorial-mook 走"米白 + 朱橙 + 单字 CJK 附注"——慢读、编集
 *   - late-night-vinyl 走"深夜蓝 + 暖米白 + 橙色单点缀"——电台、声音、慢
 *
 * 三条不可妥协决策：
 *   1. 暗底纪律：bg = #0e1a2b 深夜蓝黑（不是黑），text = #d9c9a8 暖米白
 *      （不是纯白；纯白在暗底刺眼）。配色族系完全脱离 default 浅底假设。
 *   2. radius 全部为 0（直角硬边）——黑胶 / 磁带 / 老式收音机的几何语言
 *   3. accent 稀缺：橙 #d97a3c 单色担当所有 highlight / 链接 / kicker /
 *      章节序号 / pull-quote 上下线。secondary 老金 #a89070 做"元数据"灰色调
 *
 * 复用纪律（与 user 指令 §3 §4 对齐）：
 *   - 21 个设计组件 100% 通过现有 container / element / variant 体系表达
 *   - 不新增任何 container；签名 admonition variant 走现有 news-row（status 四色对应
 *     电台广播母语 cue / b-side / static / off-air 标签）
 *   - 装饰类（vinyl SVG、side-b 三横线）走 markdown 标准 img / divider，不为
 *     "一次性视觉"新建组件
 *   - 章节自动编号（01 / 02 / 03）由 decorations.headingPrefix 一处声明、管线统一执行
 *
 * 微信公众号兼容性处理（与 user 指令 §2 对齐）：
 *   - 禁 font-family / position / float / @media / @keyframes / :hover —— 全部由
 *     themeCSS guard + variant-sanity 测试守住,本 spec 不触碰
 *   - 禁 display:flex / display:grid —— 仅在 renderer inline style 出现（容器骨架），
 *     主题层 elements / containers CSS 不写
 *   - SVG 白色一律使用 #fefefe（NEAR_WHITE），避免 SVG→PNG 光栅化把纯白转 alpha=0
 *   - pre 代码块走 overflow-x:auto + white-space:pre + inset box-shadow，与 default
 *     共用代码块横滑契约（公众号移动端原生支持触摸横滑）
 */

import type { PersonaSpec } from '../_shared/spec'

export const spec: PersonaSpec = {
  id: 'late-night-vinyl',
  name: '深夜电台',
  description: '深夜蓝 + 暖米白 + 橙色唱针 · 03:41 AM 黑胶播客慢读感',
  audience: '电台 newsletter / 夜读慢读 / 播客文化随笔 / 长夜散文',

  // ============================================================
  // 色板（来源：docs/themes-specs/themes/09-late-night-vinyl.html :root tokens）
  // ============================================================
  palette: {
    primary: '#d97a3c', // 橙（唱针暖光）—— 本主题唯一 accent
    secondary: '#a89070', // 老金辅助（元数据 / 二级文字）
    accent: '#d97a3c', // = primary（视觉里只跑一支 accent）
    bg: '#0e1a2b', // 深夜蓝黑（文章底）
    bgSoft: '#14263d', // 深蓝信息卡底（callout / qa-block / quote-card）
    bgMuted: '#060d18', // 外层衬底 / pre 代码块底（更深一档）
    text: '#d9c9a8', // 暖米白字
    textMuted: '#a89070', // 老金辅助（同 secondary）
    textInverse: '#0e1a2b', // 反白 = bg（橙底胶囊上的深色字）
    border: '#4a6080', // 暗夜冷蓝灰分割线（footer 收束色）
    code: '#d97a3c', // inline code 橙字
  },

  // 语义四色：对位电台广播母语 cue / b-side / static / off-air —— 与设计稿
  // multi-callout 完全一致。所有 soft 走同一深蓝卡底 bgSoft，体现"统一暗卡 + 仅
  // 标签换色"的暗夜信号系统（与 editorial-mook 的"统一米卡 + 标签换色"同源纪律）。
  status: {
    tip: { accent: '#7fb069', soft: '#14263d' }, // b-side · B 面推荐 —— 苔绿
    info: { accent: '#4a90c0', soft: '#14263d' }, // cue · 提示音 —— 冷蓝
    warning: { accent: '#d97a3c', soft: '#14263d' }, // static · 静电干扰 —— 橙（= primary）
    danger: { accent: '#c44848', soft: '#14263d' }, // off-air · 停播 —— 警示红
  },

  // ============================================================
  // 字号 / 间距 / 圆角
  //   - base 14 / line-height 2.1 是"夜读慢读"的标志组合（同设计稿 :root）
  //   - h2 14px normal（不加粗）：章节序号靠 primary kicker 而非粗体担纲
  //   - h3 13px primary 整行变橙：小节标题本身就是"次级 accent"
  //   - radius 全 0：黑胶 / 老式收音机几何语言
  // ============================================================
  typography: {
    baseSize: 14,
    lineHeight: 2.1,
    h1Size: 22, // 公众号原生标题约 22px；本主题不再输出 H1（cover 容器走 div 副刊头）
    h2Size: 14, // 节标题字号与正文同；区分靠 letter-spacing + 橙色序号前缀
    h3Size: 13, // 小节标题（橙色整行）
    letterSpacing: 0.4,
  },
  spacing: {
    paragraph: 16,
    section: 28,
    listItem: 4,
    containerPadding: 16,
  },
  radius: { sm: 0, md: 0, lg: 0 }, // 直角硬边 —— 半径 ≥ 1 即破

  // ============================================================
  // Decorations：自动给 h2 / h3 加章节编号前缀（橙色 monospace）。
  //
  //   - level 2 → arabic-padded（01, 02, 03）+ display:'inline' + marginRight:10
  //     橙色 monospace 序号前缀。设计稿 section-heading 原型。
  //   - level 3 → arabic-section（${h2}.${h3InH2}，如 2.1 / 2.2）
  //     标题整行已经是 primary 色（见 elements.h3），序号同色 monospace。
  //
  // 设计 trade-off：作者只写 `## 章节名` / `### 小节名`，编号由系统按出现顺序生成；
  // 想要"附录 / 终章"等非数字段时用专用容器（colophon / footnotes / editor-note 等）,
  // 不要写到 h2 ——h2 全部走 autoNumber 不留豁免位（与 data-brief 同纪律）。
  // ============================================================
  decorations: {
    headingPrefix: [
      {
        level: 2,
        autoNumber: 'arabic-padded',
        style: {
          color: 'primary',
          fontFamily: 'monospace',
          fontWeight: 500,
          marginRight: 10,
        },
      },
      {
        level: 3,
        autoNumber: 'arabic-section',
        style: {
          color: 'primary',
          fontFamily: 'monospace',
          fontWeight: 500,
          marginRight: 8,
        },
      },
    ],
  },

  // ============================================================
  // Motifs：极简——仅 dividerDots（设计稿 · · · 圆点分割）+ 四态图标。
  //
  // 为什么没有 h2Prefix / h3Prefix / quoteMark / sectionCorner：
  //   - 章节序号靠 decorations.headingPrefix 跑 autoNumber，无 SVG 介入
  //   - pull-quote 用裸 blockquote + 上下橙线（设计稿原型，见 elements.blockquote）
  //   - section-title 不参与（本主题用 h2 + autoNumber kicker 担纲章节信号）
  // ============================================================
  motifs: {
    // dividerDots · 设计稿 divider-ornament 原型（· · · 三个橙色圆点 · 间距大）
    // 仅声明 variants.divider='dots' 实际消费的 motif；wave / flower 走 variant 自带回退,
    // 不在 spec 里冗余声明。news-row admonition 不消费 icon（徽章靠色 + 大写字），
    // 也不导出 tip/info/warning/danger icon —— 保持 motif 集合最小。
    dividerDots: {
      viewBox: [0, 0, 240, 12],
      width: 220,
      height: 12,
      primitives: [
        { type: 'circle', cx: 100, cy: 6, r: 2, fill: '#d97a3c' },
        { type: 'circle', cx: 120, cy: 6, r: 2, fill: '#d97a3c' },
        { type: 'circle', cx: 140, cy: 6, r: 2, fill: '#d97a3c' },
      ],
    },

    // stepBadge · 直角方形 + primary 底 + 反白数字（::: steps 容器消费）
    stepBadge: {
      viewBox: [0, 0, 24, 24],
      width: 24,
      height: 24,
      inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 8 },
      placeholders: ['N'],
      primitives: [
        { type: 'rect', x: 0, y: 0, w: 24, h: 24, fill: '#d97a3c' },
        {
          type: 'text',
          x: 12,
          y: 17,
          content: '{N}',
          fontSize: 14,
          fontWeight: 700,
          fill: '#0e1a2b',
          textAnchor: 'middle',
        },
      ],
    },
  },

  // ============================================================
  // 主题级 kicker 文案覆盖（电台母语）
  //
  // 让作者侧 markdown 不必把"听 · 众 · 连 · 线" / "播 · 后 · 札记" / "tune · in"
  // 这些主题装饰文案写在 info 里——renderer 缺省读 ctx.kickers.<key>。
  // 单稿仍可用 info 个性化覆盖：`::: editor-note 这一期特别的"播后随感"`。
  // 未声明的 key 从 DEFAULT_KICKERS（types.ts）继承。
  // ============================================================
  kickers: {
    toc: '— tracklist · 节目单 —',
    qaBlock: '听 · 众 · 连 · 线',
    editorNote: '播 · 后 · 札记',
    methodology: '制作手记 · LINER NOTES',
    qrFollowKicker: 'tune · in',
    qrFollowTitle: '夜读电台',
    recommend: '深 夜 选 听',
    footerCTATitle: '长夜收听',
    colophonNextLabel: '下期',
    colophonIssueLabel: 'EP ·',
    mastheadName: '夜读电台',
  },

  // ============================================================
  // 骨架变体
  // ============================================================
  variants: {
    // news-row：data-brief 家族的"左 3px + 徽章 + 紧凑单行"骨架。
    // 与设计稿 multi-callout（cue/b-side/static/off-air）的视觉高度对齐：
    // 仅徽章字 + 色不同，正文紧凑同色族；徽章文字由作者写 `::: info cue` 直接覆盖。
    admonition: 'news-row',
    // classic：本主题不主推 ::: quote-card；pull-quote 由 markdown `>` 走
    // elements.blockquote（上下橙线 + 深蓝卡底）担纲。
    quote: 'classic',
    compare: 'column-card',
    steps: 'number-circle',
    // dots：设计稿 divider-ornament 原型（· · · 圆点分割）
    divider: 'dots',
    sectionTitle: 'bordered',
    // bare：pre 元素直接走主题 voice（黑底橙框 + monospace inline）
    codeBlock: 'bare',
    // side-bar：左 2px 实线 + 缩进 —— 与 editor-note callout 形态错开
    note: 'side-bar',
    footnotes: 'lined',
  },

  // ============================================================
  // 签名容器：声明本主题"必须可用"的容器集（conformance 测试校验注册表里都有实现）
  //
  // 设计稿 21 个组件 → 全部映射到现有 container / element / variant：
  //   01 masthead       → masthead 容器
  //   02 tracklist      → toc + toc-item（A1 / A2 / B1 / B2 走 attrs.no）
  //   03 cover-header   → cover 容器（包裹副刊头 + 副题 + 主播信息）
  //   04 byline         → cover 内 markdown（作者侧自由排印）—— author 容器仅 1 行不够用
  //   05 intro-para     → intro 容器（左橙竖线）
  //   06 section-h (h2) → markdown ## + decorations.headingPrefix arabic-padded
  //   07 body-para      → markdown p
  //   08 vinyl-image    → markdown ![](url) —— 装饰可视化由作者提供封面图，本主题不造组件
  //   09 sub-heading h3 → markdown ### + decorations.headingPrefix arabic-section
  //   10 pull-quote     → markdown blockquote（elements.blockquote 上下橙线 + 深蓝底）
  //   11 ordered-list   → markdown 1. 2. 3.（li 元素样式）
  //   12 unordered-list → markdown -（li 元素样式）
  //   13 inline-code    → markdown `code`（code 元素样式：橙字 monospace）
  //   14 code-block     → markdown ``` block（pre 元素样式：黑底橙框）
  //   15 callout 播后札记 → editor-note 容器（kicker 由 spec.kickers.editorNote 提供，作者写 `::: editor-note` 即可）
  //   16 qa-block       → qa-block 容器（kicker 由 spec.kickers.qaBlock 提供）
  //   17 multi-callout  → tip / info / warning / danger × news-row variant；徽章文字 cue/b-side/static/off-air
  //                       由作者写在 info 位（作者侧的"语义标注 + 视觉徽章合一"，仍是写作契约的一部分）
  //   18 cta-bar        → cta-bar 容器（三栏文字由 attrs.like/star/share，作者完全主控）
  //   19 qr-follow      → qr-follow 容器（kicker + title 默认由 spec.kickers 提供）
  //   20 footnotes      → footnotes 容器（虚线分隔 + 老金小字）
  //   21 divider-ornament → divider variant=dots
  //   22 side-b-end     → divider variant=rule（hr 单线 + 标注由 colophon 承担）
  //   23 footer         → colophon 容器（左右栏 kicker 走 DEFAULT_KICKERS "下 期"/"卷 · 期"）
  // ============================================================
  signatureContainers: [
    'intro',
    'cover',
    'author',
    'masthead',
    'toc',
    'qaBlock',
    'editorNote',
    'footnotes',
    'ctaBar',
    'qrFollow',
    'colophon',
    'imageCaption', // monospace 橙金时间戳图注
    'authorBio', // 电台主播卡（深蓝卡底 + 橙顶线）
    'timeline', // 节目时序线（橙竖线 + 内缩）
  ],

  // ============================================================
  // 元素级样式（设计稿主体节奏）
  // ============================================================
  elements: {
    // H1：公众号原生头部已渲 22 加粗黑；本主题不主动输出 H1（cover 容器承担副刊头）
    h1: {
      'font-size': '22px',
      'font-weight': '700',
      color: '#d9c9a8',
      'margin-top': '0',
      'margin-bottom': '10px',
      'line-height': '1.4',
      'letter-spacing': '0.04em',
    },
    // H2：14px normal weight + 0.1em 字距 + 橙色 monospace 数字前缀（由 decorations 注入）
    // __reset：把 baseElements.h2 的 padding-bottom / border-bottom 等"下划线骨架"清空,
    //   本主题 h2 视觉签名是"小字 + 橙色序号前缀"，不要 default 的橙下划线。
    h2: {
      __reset: true,
      'font-size': '14px',
      'font-weight': '400',
      color: '#d9c9a8',
      'margin-top': '28px',
      'margin-bottom': '14px',
      'line-height': '1.5',
      'letter-spacing': '0.1em',
    },
    // H3：橙色整行 + 13px + 0.05em 字距（设计稿 sub-heading 原型）
    h3: {
      __reset: true,
      'font-size': '13px',
      'font-weight': '400',
      color: '#d97a3c',
      'margin-top': '16px',
      'margin-bottom': '8px',
      'line-height': '1.6',
      'letter-spacing': '0.05em',
    },
    h4: {
      'font-size': '13px',
      'font-weight': '600',
      color: '#d9c9a8',
      'margin-top': '14px',
      'margin-bottom': '6px',
      'line-height': '1.6',
      'letter-spacing': '0.04em',
    },
    // P：line-height 2.1 + 0.04em 字距（夜读"慢"的标志组合）
    p: {
      'font-size': '14px',
      'line-height': '2.1',
      color: '#d9c9a8',
      'margin-top': '0',
      'margin-bottom': '16px',
      'letter-spacing': '0.04em',
    },
    // BLOCKQUOTE = pull-quote 主形态：上下橙色细线 + 深蓝卡底 + 18px 大字 + 宽字距
    // __reset 清除 baseElements 的 border-left / radius / muted 色 —— 本主题 pull-quote
    //   是"上下线夹住一段"的电台引语形态，不接受 default 主题的"左竖条"。
    // 微信兼容性：text-align 左对齐（设计稿 attribution 走右对齐，本主题接受小幅折损 —— 用
    //   markdown 的两段写法保证语义清晰，attribution 段视觉退到与 quote body 同样式）。
    blockquote: {
      __reset: true,
      'border-top': '1px solid #d97a3c',
      'border-bottom': '1px solid #d97a3c',
      'background-color': '#14263d',
      color: '#d9c9a8',
      'padding-top': '18px',
      'padding-right': '20px',
      'padding-bottom': '14px',
      'padding-left': '20px',
      'margin-top': '24px',
      'margin-bottom': '24px',
      'font-size': '17px',
      'line-height': '1.85',
      'letter-spacing': '0.08em',
      'border-radius': '0',
    },
    ul: {
      'padding-left': '20px',
      'margin-top': '0',
      'margin-bottom': '14px',
    },
    ol: {
      'padding-left': '20px',
      'margin-top': '0',
      'margin-bottom': '14px',
    },
    li: {
      'margin-bottom': '4px',
      'line-height': '2.1',
      color: '#d9c9a8',
      'letter-spacing': '0.04em',
    },
    // 行内 code：橙字 + 透明底（设计稿 inline-code 原型）+ 字号小一档
    code: {
      'background-color': 'transparent',
      color: '#d97a3c',
      padding: '0',
      'border-radius': '0',
      'font-size': '12px',
    },
    // 暗夜键：accent 1px 冷蓝灰边 + 深蓝底 + 暖米白字 + radius 0，老式收音机按键感
    kbd: {
      display: 'inline-block',
      'background-color': '#14263d',
      color: '#d9c9a8',
      border: '1px solid #4a6080',
      'border-bottom-width': '2px',
      'border-radius': '0',
      padding: '1px 6px',
      'font-size': '12px',
      'line-height': '1.4',
      'vertical-align': 'middle',
    },
    // PRE：黑底（bgMuted #060d18 比文章底更深一档）+ 橙色 1px 边框 + 米白字
    // __reset 清除 baseElements 的 atom-one-dark 配色 + radius:6（本主题 radius=0）
    pre: {
      __reset: true,
      'background-color': '#060d18',
      color: '#d9c9a8',
      border: '1px solid #d97a3c',
      'padding-top': '14px',
      'padding-right': '16px',
      'padding-bottom': '14px',
      'padding-left': '16px',
      margin: '16px 0',
      'border-radius': '0',
      'overflow-x': 'auto',
      'white-space': 'pre',
      'max-width': '100%',
      'box-sizing': 'border-box',
      'box-shadow': 'inset -14px 0 10px -10px rgba(0,0,0,0.4)',
      'font-size': '12px',
      'line-height': '1.9',
    },
    // 图片：直角无圆 + max-width 100%（vinyl-image / 封面图共用）
    img: {
      'max-width': '100%',
      display: 'block',
      'margin-top': '12px',
      'margin-right': 'auto',
      'margin-bottom': '12px',
      'margin-left': 'auto',
      'border-radius': '0',
    },
    // 链接：橙字 + 虚线下划（设计稿 a tag dotted underline）
    a: {
      color: '#d97a3c',
      'text-decoration': 'underline',
      'text-decoration-style': 'dotted',
      'text-underline-offset': '3px',
    },
    hr: {
      border: 'none',
      height: '1px',
      'background-color': '#4a6080',
      'margin-top': '20px',
      'margin-bottom': '20px',
    },
    // 电台数据栏：暗底 + th 走 monospace + accent 橙金 1px 下划线，无全框黑边
    table: {
      'border-collapse': 'collapse',
      width: '100%',
      'margin-top': '0',
      'margin-bottom': '16px',
      'font-size': '13px',
    },
    th: {
      'border-bottom': '1px solid #d97a3c',
      'border-top': 'none',
      'border-left': 'none',
      'border-right': 'none',
      padding: '6px 10px',
      'background-color': 'transparent',
      'text-align': 'left',
      'font-weight': '600',
      color: '#d97a3c',
      'font-size': '11px',
      'letter-spacing': '0.08em',
    },
    td: {
      'border-bottom': '1px solid #4a6080',
      'border-top': 'none',
      'border-left': 'none',
      'border-right': 'none',
      padding: '7px 10px',
      color: '#d9c9a8',
    },
    // strong：橙色强调（设计稿 b style="color:#d97a3c" 原型）
    strong: { 'font-weight': '700', color: '#d97a3c' },
    em: { 'font-style': 'italic', color: '#d9c9a8' },
  },

  // ============================================================
  // 内联强调
  // ============================================================
  inline: {
    // highlight = primary 底 + textInverse 字（深底主题里 mark 的标准对比）
    highlight: {
      'background-color': '#d97a3c',
      color: '#0e1a2b',
      padding: '0 4px',
      'border-radius': '0',
    },
    wavy: {
      'text-decoration': 'underline wavy',
      'text-decoration-color': '#d97a3c',
      'text-underline-offset': '3px',
    },
    emphasis: {
      color: '#d97a3c',
      'font-weight': '600',
    },
  },

  // ============================================================
  // 容器视觉（每个签名容器在此微调；renderer 提供 fallback，spec 覆盖优先）
  // ============================================================
  containers: {
    // intro · 导语：左 1px 橙竖线 + 0 padding-left=14px（设计稿 intro-para 原型）
    intro: {
      __reset: true,
      'border-left': '1px solid #d97a3c',
      'background-color': 'transparent',
      padding: '0 0 0 14px',
      margin: '0 0 30px 0',
      color: '#d9c9a8',
      'font-size': '15px',
      'line-height': '2.1',
      'letter-spacing': '0.05em',
      'border-radius': '0',
    },
    // cover · 副刊头容器（设计稿 cover-header）：包裹副题 + 主播信息
    // 设计稿 cover-header 是非 H1 的"装饰性副刊头"，作者在 body 里写副题 + byline
    cover: {
      margin: '0 0 28px 0',
    },
    // author · byline 元数据（备用：本主题主力路径是把 byline 写进 cover body，
    // 仍保留 author 容器一份克制兜底——选哪个看作者侧）
    author: {
      __reset: true,
      'background-color': 'transparent',
      padding: '0',
      margin: '0 0 22px 0',
      color: '#a89070',
      'font-size': '11px',
      'line-height': '1.8',
      'letter-spacing': '0.05em',
      'border-radius': '0',
    },
    // masthead · 刊头：下方 1px text 色分隔线 + monospace（设计稿 masthead 原型）
    // renderer 已强制 display:grid 1fr auto；这里只承诺装饰位。
    masthead: {
      __reset: true,
      'padding-bottom': '12px',
      'border-bottom': '1px solid #d9c9a8',
      margin: '0 0 22px 0',
    },
    // toc · 节目单：无 bgSoft（设计稿 tracklist 原型 = 透明底 + 仅 kicker + 条目 list）
    // 与 data-brief 的灰底 toc 形态错开，体现"夜读电台"的电台节目单气质
    toc: {
      __reset: true,
      'background-color': 'transparent',
      padding: '0',
      margin: '0 0 28px 0',
      'border-radius': '0',
    },
    sectionTag: {
      margin: '0 0 14px 0',
    },
    // 四态 admonition 走 news-row variant，wrapperCSS 由 variant 提供（左 3px 色条），
    // 这里仅留 margin 协调。
    tip: {},
    warning: {},
    info: {},
    danger: {},
    // note · 第五态补注：side-bar variant 已给出"左 2px + 缩进"骨架
    note: {
      margin: '16px 0',
    },
    // quote-card · 设计稿 pull-quote 走裸 blockquote（见 elements.blockquote）；
    //   本容器作为可选"署名金句卡"保留 token 驱动兜底。
    quoteCard: {
      'background-color': '#14263d',
      padding: '18px 20px',
      margin: '24px 0',
      'border-radius': '0',
    },
    highlight: {
      'background-color': '#14263d',
      padding: '14px 16px',
      margin: '16px 0',
      'border-radius': '0',
      border: '1px solid #4a6080',
    },
    compare: { margin: '16px 0 20px' },
    steps: { margin: '20px 0' },
    sectionTitle: {
      __reset: true,
      margin: '24px 0 12px',
      'padding-bottom': '0',
      'border-bottom': 'none',
    },
    // footer-cta · 设计稿用 cta-bar 三栏；本字段留 token 兜底，作者侧主用 cta-bar 容器
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
      'background-color': '#14263d',
      'border-radius': '0',
      'border-left': '3px solid #d97a3c',
    },
    qrcode: {
      margin: '20px 0',
      padding: '12px 14px',
    },
    abstract: {
      __reset: true,
      'border-left': '1px solid #d97a3c',
      padding: '0 0 0 14px',
      margin: '0 0 22px 0',
      'background-color': 'transparent',
      'border-radius': '0',
    },
    keyNumber: {
      margin: '18px 0',
      padding: '16px 18px',
      'background-color': '#14263d',
      'border-top': '3px solid #d97a3c',
      'border-radius': '0',
    },
    seeAlso: {
      margin: '20px 0',
      padding: '14px 16px',
      'background-color': '#14263d',
      'border-left': '3px solid #d97a3c',
      'border-radius': '0',
    },
    // qa-block · 听众连线：左 2px 橙竖线 + 深蓝卡底（设计稿 qa-block 原型）
    qaBlock: {
      __reset: true,
      'background-color': '#14263d',
      'border-left': '2px solid #d97a3c',
      padding: '16px 18px',
      margin: '28px 0',
      'border-radius': '0',
    },
    // footnotes · 两骨架（lined / inline-flow）共用：虚线分隔 + 老金小字。
    // 替换 baseContainers 的 1px solid border-top（本主题走 dashed）。
    // 长文献列表写 `::: footnotes variant=inline-flow` 自动获得内滚动。
    footnotes: {
      __reset: true,
      'border-top': '1px dashed #a89070',
      margin: '20px 0',
      'font-size': '10px',
      'line-height': '1.85',
      'letter-spacing': '0.03em',
      color: '#a89070',
    },
    ctaBar: {
      margin: '26px 0',
    },
    // qr-follow · tune·in 牌：1px 橙边框 + 深蓝卡底（设计稿 qr-follow 原型）
    qrFollow: {
      __reset: true,
      border: '1px solid #d97a3c',
      'background-color': '#14263d',
      padding: '14px',
      margin: '26px 0',
      'border-radius': '0',
    },
    // editor-note · 播后札记 callout：深蓝卡底（无左竖条，设计稿 callout 原型）
    // __reset 清除 baseContainers.editorNote 的 border-left 3px primary —— 本主题
    // callout 形态是"裸卡 + kicker + 正文"，与 qaBlock 的"左条 + 卡"形态错开。
    editorNote: {
      __reset: true,
      'background-color': '#14263d',
      padding: '14px 16px',
      margin: '24px 0',
      'border-radius': '0',
    },
    methodology: {
      __reset: true,
      'background-color': '#14263d',
      padding: '10px 12px',
      margin: '16px 0',
      'font-size': '10px',
      'line-height': '1.8',
      color: '#a89070',
      'border-radius': '0',
    },
    // colophon · 刊物收束栏（设计稿 footer 原型）：上方 1px text 实色分隔线 +
    // 双栏 monospace（"下期 ｜ 卷·期"）。renderer 强制 display:table。
    colophon: {
      __reset: true,
      'border-top': '1px solid #d9c9a8',
      'margin-top': '24px',
      'padding-top': '12px',
    },
    // 电台图注：monospace 橙金小字 + 时间戳风（"FIG. · 03:41"），暗底上低调精准
    // 电台图注：橙金小字 + 时间戳风字距（"FIG. · 03:41"），暗底上低调精准
    imageCaption: {
      __reset: true,
      margin: '4px 0 14px',
      'text-align': 'left',
      'font-size': '11px',
      color: '#d97a3c',
      'letter-spacing': '0.1em',
      'line-height': '1.5',
    },
    // 电台主播卡：深蓝卡底 + 顶端橙线，monospace 排版元数据气质
    authorBio: {
      __reset: true,
      'background-color': '#14263d',
      'border-top': '2px solid #d97a3c',
      'border-radius': '0',
      padding: '16px 18px',
      margin: '24px 0',
      color: '#d9c9a8',
    },
    // 时间线：暗底 + 左侧橙竖线 + 暖米内缩，节目时序感
    timeline: {
      __reset: true,
      'border-left': '1px solid #d97a3c',
      padding: '0 0 0 18px',
      margin: '20px 0',
      'background-color': 'transparent',
    },
  },

  // ============================================================
  // 容器内层 inline-style 覆盖（暗底专属）
  //
  // 兜底 baseInnerStyles 假设浅底（textMuted 灰色在浅底可见，primary 在浅底够亮）。
  // 本主题 bg=#0e1a2b / containers bg=#14263d，textMuted=#a89070 在暗底对比度不足——
  // 所有 kicker/title 改走 accent 橙金或 textInverse 白，保证暗底上可读。
  // ============================================================
  innerStyles: {
    // abstract 容器：透明底落在文章底 #0e1a2b 上。kicker 走 accent 橙金 + monospace 电台信号感
    abstractKicker: {
      __reset: true,
      color: '#d97a3c',
      'font-family': 'Menlo,Monaco,monospace',
      'font-size': '10px',
      'font-weight': '700',
      'letter-spacing': '2px',
      'text-transform': 'uppercase',
      'margin-bottom': '6px',
    },
    // keyNumber 容器：bg=#14263d 暗底，大数字走 accent 橙金 + monospace 电台数据气质
    keyNumberValue: {
      __reset: true,
      color: '#d97a3c',
      'font-family': 'Menlo,Monaco,monospace',
      'font-size': '34px',
      'font-weight': '700',
      'line-height': '1.1',
      'letter-spacing': '-0.5px',
      'margin-bottom': '4px',
    },
    // keyNumber 暗底上小 kicker（"KEY METRIC"）：textMuted 在 #14263d 几乎不可见，改 accent
    keyNumberKicker: {
      __reset: true,
      color: '#d97a3c',
      'font-family': 'Menlo,Monaco,monospace',
      'font-size': '11px',
      'font-weight': '600',
      'letter-spacing': '1.5px',
      'text-transform': 'uppercase',
      'margin-bottom': '8px',
    },
    // seeAlso 容器：bg=#14263d 暗底，title 走 textInverse（暖米白）保持最大对比
    seeAlsoTitle: {
      __reset: true,
      color: '#d9c9a8',
      'font-family': 'Menlo,Monaco,monospace',
      'font-size': '10px',
      'font-weight': '700',
      'letter-spacing': '2px',
      'text-transform': 'uppercase',
      'margin-bottom': '8px',
    },
    // editor-note 容器：bg=#14263d 暗底，kicker（"播后札记 · LATE-NIGHT NOTE"）走 accent 橙金
    editorNoteKicker: {
      __reset: true,
      color: '#d97a3c',
      'font-family': 'Menlo,Monaco,monospace',
      'font-size': '10px',
      'font-weight': '700',
      'letter-spacing': '1.5px',
      'margin-bottom': '8px',
    },
  },

  // ============================================================
  // 模板片段（作者侧示例 · 不影响 CSS 生成；commonTemplates 隐式合并）
  // ============================================================
  templates: {
    cover: `::: masthead 夜读电台 · EP.04 date="ON AIR · 03:41"
:::

::: cover 在无人深夜，重新学习如何阅读一本书
论慢读在算法时代的价值

主播　·　**罗离线**

录音　·　2026.04.22　·　03:41
:::
`,
    footerCTA: `::: cta-bar like="♡ 喜欢" star="★ 收藏" share="↗ 分享"
:::
`,
    tip: `::: tip b-side
本期播后随想。
:::
`,
  },

  meta: {
    createdAt: '2026-05-14',
    ownerNotes:
      '三条不可妥协：暗底纪律 / radius=0 / accent 稀缺（橙 #d97a3c 单色担当）。' +
      '零新容器零新 variant；章节序号走 decorations.headingPrefix。' +
      '电台母语 kicker 全部走 spec.kickers，作者侧 markdown 不写主题装饰。',
  },
}

export default spec
