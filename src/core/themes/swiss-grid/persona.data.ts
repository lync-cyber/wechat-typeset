/**
 * swiss-grid · 苏黎世栅格 · PersonaSpec
 *
 * 视觉灵魂：Josef Müller-Brockmann 在 Neue Grafik 04 内页上画红色辅助线的那支铅笔。
 *   - 12 栏铁律 · 1958 苏黎世对开页 · 国际红 #e30613 + 黑 + 白 + hairline
 *   - 直角硬边（radius 全 0）· 大量短分隔线 · 网格化栏位
 *
 * 视觉 ground truth：docs/themes-specs/themes/02-swiss-grid.html
 *
 * 三条不可妥协决策：
 *   1. radius 全 0（圆角即"软"，Swiss 现代主义即"硬"——半径 ≥ 1 直接破气质）
 *   2. primary = #e30613（瑞士国旗红，Neue Grafik 04 期号底色；不是 Bootstrap 红）
 *   3. H2 章节序号用红色方块徽章（"01" / "02" / "03"）—— 通过
 *      decorations.headingPrefix.style.backgroundColor=primary + paddingX/paddingY 撑开,
 *      整套主题最强烈的版面节奏锚点。
 *
 * 与 data-brief（数据简报）的边界：
 *   - data-brief：数据蓝 #1756d1 + monospace + 数据卡 + sparkline——"数字是论点"
 *   - swiss-grid：国际红 + 大字章号 + 红章 H2 + pull-quote 栏偏移——"栅格是结构"
 *   两者共享 data-brief 家族签名容器（masthead 略弃用 / qa-block / editor-note / footnotes
 *   / cta-bar / qr-follow / colophon / methodology / bar-chart / key-number）,
 *   仅在 tokens / variants / innerStyles 上分叉视觉个性。
 *
 * 复用策略：
 *   - admonition variant 走 `news-underline`（实色徽章 + 1px 黑竖分隔 + 1px 黑底线）——
 *     设计稿 multi-callout 母本；四态独立 ::: 块连续罗列时下划线自然贴合成一栏
 *   - 期号横幅（issue-banner）走 `key-number` 容器 —— kicker / value / body 三段
 *     vertical stack 适配 375px 移动端，比强行 2 栏 layout 更稳
 *   - 编者按（editor-note）走"黑底白字 header bar" —— 通过 innerStyles.editorNoteKicker
 *     的负 margin 把 kicker 撑到 wrapper 边缘；renderer 已下沉到 innerStyles 槽位
 *   - 脚注 NOTES 走 `footnotes variant=inline-flow`（自带 kicker info 槽，长引用列表内滚动）
 *   - pull-quote 通过 `elements.blockquote` __reset 表达"左 12px 红条 + 25% 左偏移"
 *
 * 不新增容器/变体——所有视觉签名通过 spec 配置实现。
 */

import type { PersonaSpec } from '../_shared/spec'

export const spec: PersonaSpec = {
  id: 'swiss-grid',
  name: '苏黎世栅格',
  description:
    '国际红 + 12 栏铁律 + 直角硬边：1958 Neue Grafik 苏黎世对开页',
  audience: '设计评论 / 编辑刊 / 视觉栅格杂志 / Neue Grafik 系排印随笔',

  // ============================================================
  // 色板（来源：docs/themes-specs/themes/02-swiss-grid.html :root tokens）
  // ============================================================
  palette: {
    primary: '#e30613', // 国际红（期号 / H2 红章 / pull-quote 左条 / dropcap）
    secondary: '#000000', // 纯黑（hairline / 文字 / cta 描边）
    accent: '#e30613', // = primary（swiss-grid 视觉里 accent 不独立）
    bg: '#ffffff', // 纯白底
    bgSoft: '#f0f0f0', // 浅灰（图表轨道 / bar 背景 / 栏位浅底）
    bgMuted: '#e8e8e8', // 外层衬底（略深的浅灰）
    text: '#000000', // 纯黑文字
    textMuted: '#888888', // 中灰辅助文字（章节页码 / kicker meta）
    textInverse: '#ffffff', // 反白（红章上的白色数字 / cta 中格）
    border: '#000000', // hairline 黑实线（Swiss 风的核心分隔语言）
    code: '#000000', // inline code 黑字
  },

  // 语义四色（与设计稿 multi-callout INFO/TIP/WARN/STOP 一致）
  status: {
    tip: { accent: '#2e7d32', soft: '#e8f0e9' }, // TIP 绿
    info: { accent: '#000000', soft: '#f0f0f0' }, // INFO 黑（设计稿 INFO 是黑底白字）
    warning: { accent: '#f9a825', soft: '#fdf5d6' }, // WARN 橙
    danger: { accent: '#e30613', soft: '#fde0e2' }, // STOP 红（= primary）
  },

  // ============================================================
  // 字号 / 间距 / 圆角（"直角是 Swiss 的灵魂"）
  // ============================================================
  typography: {
    baseSize: 13, // 正文 13px（设计稿原值）
    lineHeight: 1.6,
    h1Size: 22, // 微信原生标题约 22px,本主题不输出 H1
    h2Size: 16, // 章节标题（与红章徽章 13px 错位排列）
    h3Size: 12, // 子节标题 "2.1 / 2.2 / 2.3"
    letterSpacing: 0,
  },
  spacing: { paragraph: 12, section: 32, listItem: 4, containerPadding: 14 },
  radius: { sm: 0, md: 0, lg: 0 }, // 全 0——半径 ≥ 1 即破

  // ============================================================
  // Decorations：H2 红章徽章 + H3 复合编号 + intro 红色 dropcap
  //
  //   - H2 → arabic-padded + backgroundColor='primary' + paddingX=8 paddingY=2:
  //     红方块「01」「02」「03」白字章号——本主题最强烈的视觉签名,
  //     对位 docs/themes-specs/themes/02-swiss-grid.html `section-heading` 组件。
  //   - H3 → arabic-section（与父 h2 联动）:「2.1 / 2.2 / 2.3」黑色粗体行首小字。
  //   - introDropcap：红色「W」首字下沉（44px / 700 / accent）。
  // ============================================================
  decorations: {
    headingPrefix: [
      {
        level: 2,
        autoNumber: 'arabic-padded',
        style: {
          color: 'textInverse',
          backgroundColor: 'primary',
          paddingX: 8,
          paddingY: 2,
          fontWeight: 700,
          fontSize: 13,
          marginRight: 10,
        },
      },
      {
        level: 3,
        autoNumber: 'arabic-section',
        style: {
          color: 'text',
          fontWeight: 700,
          fontSize: 12,
          marginRight: 8,
          suffix: '  ',
        },
      },
    ],
    introDropcap: {
      color: 'accent',
      fontSize: 44,
      fontWeight: 700,
      marginRight: 6,
      paddingTop: 3,
    },
  },

  // ============================================================
  // Motifs：极简——仅 dividerFlower（设计稿 signoff 红方块右对齐的视觉记号）+
  //           四态徽章图标（news-row variant 不消费 icon,这里留作主题资产）
  //
  // 注意 MIN_FONT_SIZE=14 / MIN_STROKE_WIDTH=1 硬约束:
  //   所有 motif text 字号必须 ≥ 14,stroke-width ≥ 1。本主题装饰偏几何,
  //   不出现文字 motif；条形 / 方块 stroke 全部 ≥ 1。
  // ============================================================
  motifs: {
    // dividerFlower：两线 + 中央红方块（与 data-brief 同骨架，仅换色）
    dividerFlower: {
      viewBox: [0, 0, 240, 8],
      width: 220,
      height: 8,
      primitives: [
        { type: 'line', x1: 0, y1: 4, x2: 110, y2: 4, stroke: '#000000', strokeWidth: 1 },
        { type: 'rect', x: 117, y: 1, w: 6, h: 6, fill: '#e30613' },
        { type: 'line', x1: 130, y1: 4, x2: 240, y2: 4, stroke: '#000000', strokeWidth: 1 },
      ],
    },

    // dividerDots：三个红方块（备用 divider · Swiss 几何）
    dividerDots: {
      viewBox: [0, 0, 240, 8],
      width: 220,
      height: 8,
      primitives: [
        { type: 'rect', x: 108, y: 2, w: 4, h: 4, fill: '#e30613' },
        { type: 'rect', x: 118, y: 2, w: 4, h: 4, fill: '#e30613' },
        { type: 'rect', x: 128, y: 2, w: 4, h: 4, fill: '#e30613' },
      ],
    },

    // sealMark：20×20 国际红方块,footerCTA 的"全文收束"签名印
    //   （对位设计稿 #21 signoff "大红方块结束符 · 右对齐"）
    sealMark: {
      viewBox: [0, 0, 20, 20],
      width: 20,
      height: 20,
      primitives: [{ type: 'rect', x: 0, y: 0, w: 20, h: 20, fill: '#e30613' }],
    },

    // editorNoteKickerIcon：8×8 国际红方块,editor-note 黑底白字 header bar 的红 ▮
    //   （对位设计稿 #19 editor-note kicker 行最左侧的红色 ▮ 字符）
    editorNoteKickerIcon: {
      viewBox: [0, 0, 8, 8],
      width: 8,
      height: 8,
      primitives: [{ type: 'rect', x: 0, y: 0, w: 8, h: 8, fill: '#e30613' }],
    },
  },

  // ============================================================
  // 骨架变体
  // ============================================================
  variants: {
    admonition: 'news-underline', // ★ 设计稿 multi-callout 母本：实色徽章 + 1px 竖分隔 + 1px 底线（四态独立 ::: 块连续罗列即成一栏，无需 :::: callout-group）
    quote: 'classic', // pull-quote 走 blockquote element 自定义样式（左 12px 红条 + 25% 偏移）
    compare: 'data-card', // 数据卡（顶 3px 色条 + 大号数字）—— 设计稿少见,保留备用
    steps: 'number-circle',
    divider: 'seal-mark', // 设计稿 signoff: 20×20 红方块右对齐（消费 sealMark motif）
    sectionTitle: 'bordered',
    codeBlock: 'bare', // pre 元素走主题 voice（黑底白字）
    note: 'side-bar', // 左 2px 中性线 + 缩进
    footnotes: 'lined',
  },

  // ============================================================
  // 主题级 kicker 文案覆盖（Neue Grafik 国际排印母语）
  //
  // Swiss grid 的栏目标签全走英文大写短语——国际版面设计的母语形态。
  // toc 的 INDEX 对位设计稿 #03；colophon 的 NEXT / VOL 对位设计稿 #24。
  // ============================================================
  kickers: {
    toc: 'INDEX',
    qaBlock: 'Q & A',
    editorNote: "EDITOR'S NOTE",
    methodology: 'METHODOLOGY',
    qrFollowKicker: 'SUBSCRIBE',
    qrFollowTitle: 'NEUE LESE GRAFIK',
    recommend: 'FURTHER READING',
    footerCTATitle: 'FOLLOW THE PUBLICATION',
    colophonNextLabel: 'NEXT ·',
    colophonIssueLabel: 'VOL ·',
    mastheadName: 'NEUE LESE GRAFIK',
  },

  // ============================================================
  // 签名容器：声明本主题需要的所有签名容器（renderer 在 pipeline/containers/databrief
  // / signature 已实现）。conformance 测试会校验注册表对齐。
  // ============================================================
  signatureContainers: [
    'abstract', // 摘要块（tl;dr）
    'sectionTag', // ESSAY · 01 小标签
    'editorialHeader', // 装饰副刊头（红章 + 大字 + subtitle + topRule）
    'byline', // 三栏 newspaper 署名（AUTHOR / EDITOR / SET）
    'toc', // 目录（layout=split 双栏）
    'keyNumber', // 期号横幅（Nº04 全幅红，attrs.meta 切到双栏 issue-banner）
    'qaBlock', // 读者 Q&A
    'editorNote', // 编辑部注（黑底白字 header bar 形态）
    'footnotes', // 脚注 / 参考文献（variant=lined 默认；variant=inline-flow 承担"NOTES"长文献列表）
    'calloutGroup', // 四态 callout 联表外框（multi-callout 母本）
    'ctaBar', // 三栏 CTA（attrs.info 切到 "IF YOU LIKED THIS" header bar 模式）
    'qrFollow', // 二维码订阅卡
    'colophon', // 刊物收束栏（NEXT · VOL 双栏）
    'methodology', // 方法论小字注释
    'barChart', // 条形图（FIG.01 按年龄）
    'imageCaption', // 图注（居左 monospace 极小字 + letter-spacing）
    'announcement', // 强警示横幅（国际红块 + 黑实线全框）
  ],

  // 内层元素 inline style 槽位（renderer 不硬编码，主题通过 spec.innerStyles 接管）。
  // - abstractKicker：红色 9px letter-spacing 0.2em（INDEX 风的栏位标签）
  // - keyNumberValue：56px 白色巨号 Nº04（issue-banner 主视觉）
  // - keyNumberKicker：9px 白色全大写 letter-spacing 0.3em（NEUE LESE GRAFIK）
  // - editorNoteKicker：全幅黑底白字 header bar——负 margin 撑到 wrapper 内边
  innerStyles: {
    abstractKicker: {
      color: '#e30613',
      'font-size': '9px',
      'font-weight': '700',
      'letter-spacing': '0.2em',
      'text-transform': 'uppercase',
      'margin-bottom': '8px',
    },
    // key-number 承担 issue-banner：满幅红底 + 巨号 Nº04 + 顶部小 kicker + 底部 meta body
    keyNumberValue: {
      color: '#ffffff',
      'font-size': '56px',
      'font-weight': '700',
      'line-height': '0.85',
      'letter-spacing': '-0.04em',
      'margin-bottom': '4px',
    },
    keyNumberKicker: {
      color: '#ffffff',
      'font-size': '9px',
      'font-weight': '400',
      'letter-spacing': '0.3em',
      'text-transform': 'uppercase',
      'margin-bottom': '4px',
      opacity: '0.85',
    },
    seeAlsoTitle: {
      color: '#888888',
      'font-size': '9px',
      'font-weight': '700',
      'letter-spacing': '0.2em',
      'text-transform': 'uppercase',
      'margin-bottom': '8px',
    },
    // editor-note kicker：全幅黑色 header bar (5px 10px 黑底白字 + 负 margin 撑到边)
    editorNoteKicker: {
      display: 'block',
      'background-color': '#000000',
      color: '#ffffff',
      padding: '5px 10px',
      // 负 margin 把 kicker 撑到 wrapper 的内边（wrapper padding:12px 时正好抵消）
      margin: '-12px -12px 10px -12px',
      'font-size': '10px',
      'font-weight': '700',
      'letter-spacing': '0.15em',
    },
  },

  // ============================================================
  // 元素级样式
  // ============================================================
  elements: {
    h1: {
      'font-size': '22px',
      'font-weight': '700',
      color: '#000000',
      'margin-top': '0',
      'margin-bottom': '8px',
      'line-height': '1.35',
      'letter-spacing': '-0.01em',
    },
    // h2：红章徽章由 decorations.headingPrefix 自动注入；本规则只管标题文字本体
    // 直角 + border-bottom 模拟设计稿"标题文字 + 独立分隔 div"两段结构
    h2: {
      __reset: true,
      'font-size': '16px',
      'font-weight': '700',
      color: '#000000',
      'margin-top': '32px',
      'margin-bottom': '12px',
      'line-height': '1.2',
      // padding-bottom:10px → 文字与分隔线之间留呼吸,复刻设计稿"标题 div"和"分隔 div"两段间的间距
      'padding-bottom': '10px',
      'border-bottom': '1px solid #000000',
      'padding-top': '0',
      'letter-spacing': '-0.01em',
    },
    h3: {
      'font-size': '12px',
      'font-weight': '700',
      color: '#000000',
      'margin-top': '14px',
      'margin-bottom': '6px',
      'line-height': '1.5',
    },
    h4: {
      'font-size': '12px',
      'font-weight': '600',
      color: '#000000',
      'margin-top': '12px',
      'margin-bottom': '6px',
      'line-height': '1.5',
    },
    p: {
      'font-size': '13px',
      'line-height': '1.6',
      color: '#000000',
      'margin-top': '0',
      'margin-bottom': '12px',
    },
    // pull-quote：设计稿"3 栏偏移 + 12px 红左条 + 18px 中粗 + 行间紧"。
    // __reset 把 default 的浅底卡彻底洗掉,只留 Swiss 极简硬边
    blockquote: {
      __reset: true,
      'border-left': '12px solid #e30613',
      'background-color': 'transparent',
      color: '#000000',
      padding: '0 0 0 14px',
      // 25% 左 margin = 12 栏制下偏移 3/12（设计稿 pull-quote `flex:3 / flex:9` 比例）
      'margin-top': '26px',
      'margin-right': '0',
      'margin-bottom': '26px',
      'margin-left': '25%',
      'font-size': '18px',
      'font-weight': '500',
      'line-height': '1.35',
      'letter-spacing': '-0.02em',
      'border-radius': '0',
    },
    // ordered-list：保留 OL marker 走系统默认（公众号兼容性最高）。
    // 设计稿"01 / 02 / 03 红色 monospace"通过 li::marker 难以稳定生效（公众号沙箱剥），
    // 退而求其次：marker 颜色不强求,正文 list-style:decimal-leading-zero 体现"01/02"零填充
    ol: {
      'padding-left': '24px',
      'margin-top': '0',
      'margin-bottom': '14px',
      'list-style': 'decimal-leading-zero',
    },
    ul: { 'padding-left': '20px', 'margin-top': '0', 'margin-bottom': '14px' },
    li: { 'margin-bottom': '4px', 'line-height': '1.6', color: '#000000' },
    strong: { 'font-weight': '700', color: '#000000' },
    em: { 'font-style': 'italic', color: '#000000' },
    // 链接：红字 + 红下划线（设计稿 `<a>` 风格）
    a: {
      color: '#e30613',
      'text-decoration': 'none',
      'border-bottom': '1px solid #e30613',
    },
    // hr：1px 黑实线（与 dividers 共构 Swiss 分隔语言）
    hr: {
      border: 'none',
      height: '1px',
      'background-color': '#000000',
      'margin-top': '24px',
      'margin-bottom': '24px',
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
    // 代码块：设计稿"黑底白字 + 顶部红色 // READING.JS 注释"
    // 顶部红注释由作者在代码块首行写 `// READING.JS` 实现（highlight.js 自动着色为 comment-red）
    pre: {
      __reset: true,
      'background-color': '#000000',
      color: '#ffffff',
      padding: '12px 14px',
      margin: '12px 0 18px',
      'border-radius': '0',
      'overflow-x': 'auto',
      'white-space': 'pre',
      'max-width': '100%',
      'box-sizing': 'border-box',
      'box-shadow': 'inset -14px 0 10px -10px rgba(0,0,0,0.4)',
      'font-size': '11px',
      'line-height': '1.7',
    },
    // 行内代码：黑边框 + 等宽（设计稿 inline-code"黑边框等宽"）
    code: {
      'background-color': '#ffffff',
      color: '#000000',
      padding: '0 4px',
      border: '1px solid #000000',
      'border-radius': '0',
      'font-size': '12px',
    },
    // 极简方键：radius 0 + 不对称黑边（底 2px/右 1px，Swiss 不对称排印语言）
    kbd: {
      display: 'inline-block',
      'background-color': '#f0f0f0',
      color: '#000000',
      'border-top': '1px solid #000000',
      'border-right': '1px solid #000000',
      'border-bottom': '2px solid #000000',
      'border-left': '1px solid #000000',
      'border-radius': '0',
      padding: '0 5px',
      'font-size': '11px',
      'line-height': '1.5',
      'vertical-align': 'middle',
    },
    // 苏黎世数据栏：radius 0 + 上下 1px 黑实线 + th 全大写 letter-spacing 拉开，无左右竖边框
    table: {
      'border-collapse': 'collapse',
      width: '100%',
      'margin-top': '0',
      'margin-bottom': '16px',
      'font-size': '13px',
    },
    th: {
      'border-top': '1px solid #000000',
      'border-bottom': '1px solid #000000',
      'border-left': 'none',
      'border-right': 'none',
      padding: '6px 10px',
      'background-color': 'transparent',
      'text-align': 'left',
      'font-weight': '700',
      'font-size': '10px',
      'letter-spacing': '0.15em',
      'text-transform': 'uppercase',
      color: '#000000',
    },
    td: {
      'border-top': 'none',
      'border-bottom': '1px solid #e8e8e8',
      'border-left': 'none',
      'border-right': 'none',
      padding: '6px 10px',
      color: '#000000',
    },
  },

  // ============================================================
  // 内联强调
  // ============================================================
  inline: {
    // highlight：荧光黄底（设计稿 `<b style="background:#ffeb3c">` 原型）
    highlight: {
      'background-color': '#ffeb3c',
      color: '#000000',
      padding: '0 2px',
      'border-radius': '0',
    },
    // wavy：红波浪下划线（默认 textEmphasis 替代——公众号 sandbox 不一定支持 text-emphasis）
    wavy: {
      'text-decoration': 'underline wavy',
      'text-decoration-color': '#e30613',
      'text-underline-offset': '3px',
    },
    // emphasis：红色 + 600 字重 + text-emphasis dot（作者用 ==text== 触发的语义着重）
    //   text-emphasis 在 wechat Chrome 86+ 与 Safari 15.4+ 上呈红点旁注; 较老客户端
    //   降级为红色 + 粗体。-webkit- 前缀被 FORBIDDEN_VALUE_PATTERNS 拦截,不写。
    emphasis: {
      color: '#e30613',
      'font-weight': '600',
      'text-emphasis': 'dot #e30613',
      'text-emphasis-position': 'under',
    },
  },

  // ============================================================
  // 容器视觉（每个签名容器在此微调；renderer 提供 fallback,spec 覆盖优先）
  // ============================================================
  containers: {
    // intro：导语大字（18px / 中粗 / 红 ■ 由作者在 markdown 里手写 `**■**` 或字符
    // 实际由后端 escText —— 改走 紧凑 padding + 大字号 + 0 边框
    intro: {
      __reset: true,
      'background-color': 'transparent',
      padding: '0',
      margin: '0 0 18px 0',
      color: '#000000',
      'font-size': '18px',
      'font-weight': '500',
      'line-height': '1.4',
      'letter-spacing': '-0.01em',
    },
    // author：三栏分隔（AUTHOR / EDITOR / SET）—— 上下 hairline 黑线 + 小字 kicker
    // renderer 默认"作者名 + role"两段；用 author markdown body 内的纯文本承载三段
    author: {
      __reset: true,
      'border-top': '1px solid #000000',
      'border-bottom': '1px solid #000000',
      padding: '8px 0',
      margin: '0 0 28px 0',
      'background-color': 'transparent',
      'border-radius': '0',
      'font-size': '11px',
    },
    // cover：作者用 keyNumber 当 issue-banner; cover 容器保留备用但样式中性
    cover: {
      __reset: true,
      margin: '0 0 12px 0',
      padding: '0',
    },
    // admonition 四态 wrapper 由 news-row variant 自渲染（左 3px 色条 + 实色徽章）
    // 这里只声明微小覆盖,不打断 variant 输出
    tip: {},
    warning: {},
    info: {},
    danger: {},
    // note：side-bar variant（左 2px 中性线 + textMuted 缩进）+ 不再加额外底色
    note: {
      __reset: true,
      'background-color': 'transparent',
      margin: '16px 0',
      'border-radius': '0',
    },
    // quote-card：弃用——pull-quote 走原生 blockquote element 样式。保留中性 fallback
    quoteCard: {
      __reset: true,
      'background-color': '#f0f0f0',
      padding: '18px 16px',
      margin: '20px 0',
      'border-radius': '0',
    },
    highlight: {
      __reset: true,
      'background-color': '#f0f0f0',
      padding: '14px 16px',
      margin: '16px 0',
      'border-radius': '0',
      border: '1px solid #000000',
    },
    compare: { margin: '16px 0 20px' },
    steps: { margin: '20px 0' },
    sectionTitle: {
      __reset: true,
      margin: '32px 0 10px',
      'padding-bottom': '0',
      'border-bottom': 'none',
    },
    // footer-cta：设计稿 cta-bar (三栏:♡LIKE / ◎SEEN / →SHARE) 走 ctaBar 容器
    // footerCTA 是文末"关注我"块,这里克制成"右下角红方块 sealMark + 居中按钮"
    footerCTA: {
      __reset: true,
      margin: '24px 0',
      padding: '0',
      'background-color': 'transparent',
      'border-radius': '0',
    },
    recommend: {
      __reset: true,
      margin: '20px 0',
      padding: '12px 14px',
      'background-color': '#f0f0f0',
      'border-radius': '0',
      'border-left': '3px solid #000000',
    },
    qrcode: {
      __reset: true,
      margin: '22px 0',
      padding: '14px',
      'background-color': '#ffffff',
      border: '1px solid #000000',
      'border-radius': '0',
    },
    // abstract：tl;dr 摘要,设计稿没有专门组件,克制成"左 3px 红条 + hairline 上下"
    abstract: {
      __reset: true,
      'border-top': '1px solid #000000',
      'border-bottom': '1px solid #000000',
      padding: '12px 0 12px 0',
      margin: '0 0 22px 0',
      'background-color': 'transparent',
      'border-radius': '0',
    },
    // key-number 承担 issue-banner：满幅红底 + 大号 Nº04 + kicker / body 上下夹住。
    // 渲染顺序：kicker(info) → value(attrs.value) → body markdown。
    // wrapper 上设 color:white，内部 p 通过 CSS color inheritance 继承反白文字色，
    // 避免 spec.elements.p 跨容器染色。
    keyNumber: {
      __reset: true,
      'background-color': '#e30613',
      color: '#ffffff',
      padding: '18px 16px 16px',
      margin: '0 0 0 0',
      'border-top': 'none',
      'border-radius': '0',
    },
    seeAlso: {
      __reset: true,
      margin: '20px 0',
      padding: '14px 16px',
      'background-color': '#f0f0f0',
      'border-left': '3px solid #000000',
      'border-radius': '0',
    },

    // ── data-brief 家族容器：spec 仅做"Swiss 化"细节调整 ──────
    masthead: {
      __reset: true,
      margin: '0 0 14px 0',
      'padding-bottom': '4px',
      'border-bottom': '1px solid #000000',
    },
    sectionTag: { margin: '0 0 12px 0' },
    // byline：三栏 AUTHOR / EDITOR / SET，上下 hairline 黑分隔
    byline: {
      __reset: true,
      'border-top': '1px solid #000000',
      'border-bottom': '1px solid #000000',
      margin: '0 0 28px 0',
      padding: '0',
    },
    // editorial-header：装饰副刊头。renderer 已承担 topRule + chip + title + subtitle
    // 全部 inline 装饰；wrapper 只留下与 byline 之间的呼吸
    editorialHeader: {
      __reset: true,
      margin: '0 0 14px 0',
      padding: '0',
    },
    // callout-group：四态 callout 联表外框。上下 1px 黑实线 + 无 padding,
    // 子项 (news-row variant) 自带 border-left:3px 与左对齐徽章——视觉就是设计稿 multi-callout
    calloutGroup: {
      __reset: true,
      'border-top': '1px solid #000000',
      'border-bottom': '1px solid #000000',
      padding: '0',
      margin: '24px 0',
    },
    // toc：设计稿"双栏压满 · INDEX 标签 + 带页码"; toc-item renderer 固定 30px/1fr/auto 三栏
    // 这里 wrapper 走 hairline 上下分隔 + 直角硬边
    toc: {
      __reset: true,
      'border-top': '1px solid #000000',
      'border-bottom': '2px solid #000000',
      padding: '12px 14px',
      margin: '0 0 24px 0',
      'background-color': '#ffffff',
      'border-radius': '0',
    },
    kpiDashboard: {
      __reset: true,
      'background-color': '#ffffff',
      'border-top': '1px solid #000000',
      'border-bottom': '1px solid #000000',
      padding: '14px 12px 12px',
      margin: '0 0 24px 0',
      'border-radius': '0',
    },
    // bar-chart：设计稿"FIG.01 黑底头 + 浅灰轨道 + 黑色填充 + 末项红色"
    // wrapper 走 1px 黑全边框 + 无内底色（FIG 头条由 renderer 内置 inline 样式承担）
    barChart: {
      __reset: true,
      border: '1px solid #000000',
      padding: '0',
      margin: '20px 0',
      'background-color': '#ffffff',
      'border-radius': '0',
    },
    // qa-block：设计稿"三线边框 (上 3px 下 3px 黑) + Q 黑底 / A 红底"
    // Q/A 徽章颜色由 renderer 硬编码 (Q=primary, A=text); 因 swiss-grid primary=red,
    // 实际渲染 Q=红 / A=黑——与设计稿 Q=黑 / A=红 反相; 视觉上 Q/A 仍可区分（两种实色徽章）,
    // 仅角色"提问者用色"反相。已在 ownerNotes 记录此 acceptable deviation。
    qaBlock: {
      __reset: true,
      'border-top': '3px solid #000000',
      'border-bottom': '3px solid #000000',
      padding: '14px 0',
      margin: '26px 0',
      'border-radius': '0',
    },
    // footnotes：两骨架共用的色 / 字号 / 边框；padding-left / text-indent / max-height
    // 由 variants/footnotes/{lined, inline-flow}.ts inline 注入。
    // "NOTES" kicker 由作者写 info: `::: footnotes variant=inline-flow NOTES`。
    footnotes: {
      __reset: true,
      'border-top': '1px solid #000000',
      margin: '20px 0',
      'font-size': '10px',
      'line-height': '1.7',
      'letter-spacing': '0.01em',
      color: '#333333',
    },
    // cta-bar：设计稿"IF YOU LIKED THIS 黑底头 + 三栏 (描边/实色/描边)"
    // renderer 固定 table 三栏: 描边 / fill / 描边; fill 走 primary=red, 与设计稿一致
    ctaBar: {
      __reset: true,
      margin: '24px 0',
      padding: '0',
      border: '2px solid #000000',
      'border-radius': '0',
    },
    // qr-follow：设计稿"左 QR + 右三行文字 (SUBSCRIBE/标题/说明)" hairline 全边框 + 直角
    qrFollow: {
      __reset: true,
      margin: '20px 0',
      padding: '0',
      'background-color': '#ffffff',
      border: '1px solid #000000',
      'border-radius': '0',
    },
    // editor-note：黑底白字 header bar 形态 (kicker 通过 innerStyles.editorNoteKicker 的
    // 负 margin 撑到 wrapper 边). 12px wrapper padding 与 kicker margin:-12px -12px 12px -12px 严格抵消。
    editorNote: {
      __reset: true,
      border: '1px solid #000000',
      padding: '12px',
      margin: '22px 0',
      'background-color': '#ffffff',
      'border-radius': '0',
    },
    methodology: {
      __reset: true,
      'background-color': '#f0f0f0',
      padding: '10px 12px',
      margin: '16px 0',
      'font-size': '10px',
      'line-height': '1.7',
      color: '#333333',
      'border-radius': '0',
    },
    // colophon：设计稿"NEXT · VOL 双栏 monospace, 上 3px 黑分隔" —— renderer 走 display:table
    colophon: {
      __reset: true,
      'border-top': '3px solid #000000',
      'margin-top': '24px',
      'padding-top': '10px',
      'border-radius': '0',
    },
    // 苏黎世图注：居左极小字 + letter-spacing 0.2em 拉开，数据图说栏感（font-family 被平台剥，靠字距代偿 monospace 气质）
    imageCaption: {
      __reset: true,
      margin: '6px 0 16px',
      'text-align': 'left',
      'font-size': '10px',
      color: '#888888',
      'letter-spacing': '0.2em',
      'line-height': '1.5',
    },
    // 直角硬边强警示横幅：国际红块 + 白字 + 全框黑线，Swiss 的"STOP"信号
    announcement: {
      __reset: true,
      'background-color': '#e30613',
      color: '#ffffff',
      padding: '12px 16px',
      margin: '18px 0',
      'border-radius': '0',
      border: '1px solid #000000',
      'font-weight': '700',
      'letter-spacing': '0.05em',
    },
  },

  // ============================================================
  // 模板片段（作者侧示例 · 不影响 CSS 生成；commonTemplates 隐式合并）
  // ============================================================
  templates: {
    cover: `::: key-number NEUE LESE GRAFIK value="Nº04"
VOL.IV · 2026—04—22 · CHF 14.—
:::

::: section-tag ESSAY · 01
:::

# 在无人深夜，重新学习如何阅读一本书
`,
    authorBar: `::: author
撰文 **顾留白**　·　编辑 **徐稍后读**　·　SET **04·2026**
:::
`,
    footerCTA: `::: cta-bar like="♡  LIKE" star="◎  SEEN" share="→  SHARE"
:::
`,
    tip: `::: tip TIP
本期核心建议。
:::
`,
  },

  meta: {
    createdAt: '2026-05-14',
    ownerNotes:
      '主题 02 苏黎世栅格 · 三条不可妥协：radius=0、primary #e30613、H2 红章徽章。\n' +
      '架构复用：admonition `news-row` variant 直接复刻设计稿 multi-callout；\n' +
      'issue-banner 复用 key-number 容器（kicker/value/body 三段 vertical stack）；\n' +
      'NOTES 脚注用 footnotes variant=inline-flow（自带 kicker），editor-note 走"黑底白字 header bar"。\n' +
      '已知 acceptable deviation：qa-block 徽章 Q=红/A=黑（renderer 硬编码; 与设计稿 Q=黑/A=红 反相,\n' +
      '但两态仍可区分）。issue-banner 取消右侧 VOL/CHF 浮动列，改 body 单段堆叠（375px 移动端更稳）。\n' +
      '新增架构：HeadingPrefixDecoration.style 增 backgroundColor/paddingX/paddingY（H2 红章核心）；\n' +
      'ThemeInnerStyles 增 editorNoteKicker（黑底 header bar 核心）。两处扩展全局可用,非主题专属。',
  },
}

export default spec
