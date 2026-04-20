/**
 * academic-frontier · 学术前沿
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

import { buildTheme } from '../_shared/buildTheme'
import type { ThemeTokens } from '../types'
import { academicFrontierAssets } from './assets'
import { commonTemplates } from '../_shared/defaultTemplates'

// ============================================================
// Tokens（规范 §1.1 色彩表 / §1.2 Scale）
// ============================================================

const tokens: ThemeTokens = {
  colors: {
    // 规范 §1.1 核心决策：Nature / NeurIPS 家族深靛。拒绝酒红（本土误读风险）、拒绝黑（过死）
    primary: '#1e2c4a',
    // 规范 §1.1：primary 降饱和变体，引文靛灰——承担"次级结构色"，绝不与 primary 抢戏
    secondary: '#4a5670',
    // 规范 §1.1：深酒红 accent——Nature 正刊红收到 50% 饱和的结果。
    // 只在 danger / Finding / DOI 三处出现，全篇预算 ≤ 5 次
    accent: '#8a2a2a',
    // 规范 §1.1：论文白 —— 等价于 #fff 但规避公众号 SVG 光栅化白→透明陷阱
    // 拒绝奶白（那是 literary），拒绝灰白（那是 default）——学术要的是屏幕上的 preprint 感
    bg: '#fefefe',
    // 规范 §1.1：定理浅底——和 bg 差 2%，"几乎看不见"是学术浅底的纪律
    bgSoft: '#f6f6f4',
    // 规范 §1.1：表头灰——表格表头 / ablation 条纹行 / 代码块中性底；纯灰不带色相
    bgMuted: '#ececea',
    // 规范 §1.1：正刊墨——接近黑但偏一点冷，比 #000 柔、比 #333 正式
    // 拒绝纯黑：在 #fefefe 底上过刚，压成 #16181d 更接近正刊油墨的冷深色
    text: '#16181d',
    // 规范 §1.1：caption 灰——figure caption / figure 编号 / 脚注正文 / 日期等附属信息
    textMuted: '#5a5d64',
    // 规范 §1.1：反白——仅用于定理框顶栏（深靛底）上的白字，整篇最多 2 处
    // 平台纪律：#fefefe 规避 #fff 公众号 SVG 透明化
    textInverse: '#fefefe',
    // 规范 §1.1：版框灰——1px 实线分隔，figure / table / theorem 的边框都走它
    border: '#d8d8d4',
    // 规范 §1.1：等宽墨——**拒绝让 primary 承担代码色**。
    // 学术文档的 code 是"方法的一部分"而非"装饰色块"，用中性深墨即可
    code: '#1a1a1a',
    // 规范 §1.1 语义色表：在 #fefefe 上 AA ≥ 4.5:1；soft 底对比度仅 1-2%，识别靠 label + 形状
    status: {
      // tip = 定义（Definition）——与 primary 共用色，"定义"是学术最基础元素，和正刊主色同色形成骨架
      tip: { accent: '#1e2c4a', soft: '#f3f4f7' },
      // info = 方法（Methods）——= secondary 引文靛灰
      info: { accent: '#4a5670', soft: '#f1f2f4' },
      // warning = 局限性（Limitations）——古文献土黄 #5a4a18，更像 archival notation，
      //   拒绝琥珀黄（那是 business / tech-geek 的语义）
      warning: { accent: '#5a4a18', soft: '#f5f2e8' },
      // danger = 谬误（Fallacy）——深酒红 = accent。鲜红是警报灯、error message；
      //   学术 danger 是勘误纪律，需要克制而非报警
      danger: { accent: '#8a2a2a', soft: '#f7eeee' },
    },
  },
  typography: {
    // 规范 §1.2 Scale：正文 15 / 1.75——信息密度优先的中间值（介于 business 1.75 和 literary 2.0）
    baseSize: 15,
    lineHeight: 1.75,
    // 规范 §1.2 关键纪律：**h1 不上 26**。学术标题清瘦而非宽厚——
    //   Nature 正刊标题相对正文只放大 1.5x（不是公众号常见的 2x）
    h1Size: 24,
    // 规范 §1.2：h2 18 / 600（非 700，学术从不吼叫）+ 章节号前缀 1/2/3
    h2Size: 18,
    // 规范 §1.2：h3 16 / 600——前缀 1.1 / 1.2 两级大纲。与正文同号，靠字重 + 编号区分
    h3Size: 16,
    // 规范 §1.2：正文字距 0.3px
    letterSpacing: 0.3,
  },
  spacing: {
    // 规范 §1.2：正文呼吸感——段间 18px，section 36px（章节级需要更大上 margin）
    paragraph: 18,
    section: 36,
    listItem: 8,
    containerPadding: 18,
  },
  // 规范 §2.6 / §3.5：所有容器 radius ≤ 2px——"学术文档最多给 2px"
  // 拒绝 12px 大圆角（那是小红书手账风）
  radius: { sm: 2, md: 2, lg: 2 },
}

// ============================================================
// Theme
// ============================================================

export const academicFrontierTheme = buildTheme({
  id: 'academic-frontier',
  name: '学术前沿',
  description: 'Nature / arXiv / LaTeX article 家族，研究者写给同行评审的严谨陈述',
  tokens,
  assets: academicFrontierAssets({
    primary: tokens.colors.primary,
    secondary: tokens.colors.secondary,
    accent: tokens.colors.accent,
    border: tokens.colors.border,
    textMuted: tokens.colors.textMuted,
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
    // 规范 §1.2：h1 24/600/0.2px/1.4——**不上 26**，Nature 标题清瘦纪律
    h1: {
      'font-size': '24px',
      'font-weight': '600',
      color: tokens.colors.text,
      'margin-top': '28px',
      'margin-bottom': '14px',
      'line-height': '1.4',
      'letter-spacing': '0.2px',
    },
    // 规范 §1.2：h2 18/600/0.1px/1.45——前缀 1/2/3 阿拉伯数字 + 左 1px primary 竖线
    //   覆盖 baseElements 默认的 border-bottom 2px primary（学术 h2 不通栏横线，用章节号 + 左竖装饰）
    //   sectionTitle 容器（§2.4）才走下方通栏横线
    h2: {
      'font-size': '18px',
      'font-weight': '600',
      color: tokens.colors.text,
      'margin-top': '32px',
      'margin-bottom': '12px',
      'line-height': '1.45',
      'letter-spacing': '0.1px',
      'border-bottom': 'none',
      'padding-bottom': '0',
    },
    // 规范 §1.2：h3 16/600/0——两级大纲 1.1 / 1.2；与正文同号，靠字重 + 编号区分
    h3: {
      'font-size': '16px',
      'font-weight': '600',
      color: tokens.colors.text,
      'margin-top': '22px',
      'margin-bottom': '10px',
      'line-height': '1.55',
      'letter-spacing': '0',
    },
    // 规范 §1.2：h4 15/600/0——三级大纲 1.1.1；学术罕见但保留
    h4: {
      'font-size': '15px',
      'font-weight': '600',
      color: tokens.colors.text,
      'margin-top': '18px',
      'margin-bottom': '8px',
      'line-height': '1.6',
      'letter-spacing': '0',
    },
    // 规范 §1.2：正文 15/400/0.3px/1.75——字重 400 不上 500（学术正文"呼吸薄"非"笔画沉"）
    p: {
      'font-size': '15px',
      'line-height': '1.75',
      color: tokens.colors.text,
      'margin-top': '0',
      'margin-bottom': '18px',
      'letter-spacing': '0.3px',
    },
    // 规范 §2.5 quote 裸 blockquote：左 3px border 灰色竖条（不是 primary——引文不该强调）
    //   无底色、无边框、无圆角——学术引文不做装饰
    blockquote: {
      'border-left': `3px solid ${tokens.colors.border}`,
      'background-color': 'transparent',
      color: tokens.colors.textMuted,
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
      color: tokens.colors.text,
      'letter-spacing': '0.3px',
    },
    // 规范 §1.2 关键纪律：**`<strong>` 几乎不用**。全篇最多 2-3 次仅用于极关键反直觉结论
    //   字重 600（不上 700——学术从不吼叫）+ text 色（不染 primary——不是 business）
    strong: {
      'font-weight': '600',
      color: tokens.colors.text,
    },
    // 规范 §1.2 硬纪律：**`<em>` 替代 `<strong>` 作为强调主力**
    //   术语首次出现 / 定理名 / 引理名 / 外文词汇 / 变量——全部 italic
    //   字重 500 比正文 400 跳一档，形成"学术强调"的视觉签名
    em: {
      'font-style': 'italic',
      'font-weight': '500',
      color: tokens.colors.text,
    },
    // 规范 §2.7 footerCTA：DOI 链接走 secondary 色 + 下划线——
    //   全主题 accent 之外唯一出现的色链接
    a: {
      color: tokens.colors.secondary,
      'text-decoration': 'underline',
      'text-underline-offset': '3px',
    },
    // 规范 §2.17 divider：rule 默认——1px border 色水平线
    hr: {
      border: 'none',
      height: '1px',
      'background-color': tokens.colors.border,
      'margin-top': '24px',
      'margin-bottom': '24px',
    },
    // 规范 §2 figure：图片极窄圆角 2px（印刷品感）——学术图片不走 8px 卡片圆角
    img: {
      'max-width': '100%',
      display: 'block',
      'margin-top': '12px',
      'margin-right': 'auto',
      'margin-bottom': '8px',
      'margin-left': 'auto',
      'border-radius': '2px',
    },
    // 规范 §2.15：表格走真 <table>，不是两栏 pros/cons 卡片
    //   外框 + 所有内线 1px border 实线；border-collapse 让内线不叠加成 2px
    table: {
      'border-collapse': 'collapse',
      width: '100%',
      'margin-top': '0',
      'margin-bottom': '18px',
      'font-size': '14px',
      border: `1px solid ${tokens.colors.border}`,
    },
  },

  // ============================================================
  // 代码块（规范 §1.1 code = 中性深墨 + 灰底，不染 primary）
  // ============================================================
  // 规范 §1.1：学术文档的代码只在 Methods 章节出现，它是"方法的一部分"而非"装饰色块"
  //   用中性灰底 bgMuted + 深墨字 code 即可；拒绝暗底 IDE 配色（那是 tech-geek 签名）
  pre: {
    'background-color': tokens.colors.bgMuted,
    color: tokens.colors.code,
    'padding-top': '12px',
    'padding-right': '14px',
    'padding-bottom': '12px',
    'padding-left': '14px',
    'border-radius': '2px',
    border: `1px solid ${tokens.colors.border}`,
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
  // 规范 §1.2 .math：inline 公式走 bgSoft 超浅底 + 字重 500 + padding 1px 4px
  //   变量（x / y / θ）用 <em> italic 包裹是学术硬纪律，这里 code 兼容数学行样式
  code: {
    'background-color': tokens.colors.bgSoft,
    color: tokens.colors.code,
    padding: '1px 4px',
    'border-radius': '2px',
    'font-size': '14px',
    'font-weight': '500',
  },

  // ============================================================
  // Inline 强调（规范 §1.2）
  // ============================================================
  inlineOverrides: {
    // 规范 §1.3 "拒绝荧光黄 highlight"——小红书学术笔记审美
    //   改走 bgSoft 超浅底 + text 色——近乎看不见，仅做"作者在此划过重点"的微标记
    highlight: {
      'background-color': tokens.colors.bgSoft,
      color: tokens.colors.text,
      padding: '0 3px',
      'border-radius': '2px',
    },
    // 规范 §1.2：波浪线走 secondary 引文靛灰（不走 accent——accent 预算稀缺，留给 Finding/danger/DOI）
    wavy: {
      'text-decoration': 'underline wavy',
      'text-decoration-color': tokens.colors.secondary,
      'text-underline-offset': '3px',
    },
    // 规范 §1.2：emphasis（`[.xxx.]`）走 italic + 500——与 <em> 同策略，不染色
    //   学术强调不靠加粗 / 染色，靠 italic + 字重 500 跳一档
    emphasis: {
      'font-style': 'italic',
      'font-weight': '500',
      color: tokens.colors.text,
    },
  },

  // ============================================================
  // 容器视觉（规范 §2 的 19 个 container）
  // ============================================================
  containerOverrides: {
    // 规范 §2.1 intro = 摘要（Abstract）：上下 1px border 横线夹住，左右无边框
    //   让摘要和正文贯通——"ABSTRACT"顶标签由模板注入的拉丁大写前缀承载
    intro: {
      'background-color': 'transparent',
      'border-top': `1px solid ${tokens.colors.border}`,
      'border-bottom': `1px solid ${tokens.colors.border}`,
      'border-radius': '0',
      padding: '16px 0',
      margin: '0 0 28px 0',
      color: tokens.colors.textMuted,
      'line-height': '1.75',
    },
    // 规范 §2.2 author = 通讯作者：冷、静、不居中——无底色无边框
    //   字号 13 / 400 / textMuted——"作者信息本该几乎隐形"
    author: {
      'background-color': 'transparent',
      'border-radius': '0',
      padding: '0',
      margin: '0 0 20px 0',
      'font-size': '13px',
      color: tokens.colors.textMuted,
      'line-height': '1.7',
    },
    // 规范 §2.3 cover = 标题块：无图版式——学术 cover 不贴大图，图交给 figure 容器
    //   拒绝"公众号专题头图 + 金字塔构图"
    cover: {
      margin: '0 0 24px 0',
    },
    // 四态容器外壳（variant 接管 wrapperCSS）
    tip: {},
    warning: {},
    info: {},
    danger: {},
    // 规范 §2.6 quoteCard = 定理声明框（本主题签名 container）
    //   variant=frame-brackets 接管"框 + 顶栏 + ■ 结束符"的视觉
    //   container 层只兜底白底（不走 bgSoft——定理框要清晰不要氛围）+ 2px 极窄圆角
    quoteCard: {
      'background-color': tokens.colors.bg,
      padding: '0',
      margin: '20px 0',
      'border-radius': '2px',
      border: `1px solid ${tokens.colors.border}`,
    },
    // 规范 §2.14 highlight = 关键发现（Key Finding）：
    //   左 2px accent 深酒红细竖条（accent 第二次合法出现——danger 之外的唯一出场）
    //   bgSoft 浅底；**严禁巨号数字 callout**（那是 business 签名）
    highlight: {
      'background-color': tokens.colors.bgSoft,
      'border-left': `2px solid ${tokens.colors.accent}`,
      padding: '12px 16px 12px 18px',
      margin: '20px 0',
      'border-radius': '2px',
    },
    // 规范 §2.15 compare = ablation table：**真正的 <table>**，不是两栏卡片
    //   column-card variant 仍沿用（pros/cons markdown 兼容性）——但 container 本身给足
    //   table-ready 的外 margin；作者改 variant=stacked-row 也能用
    compare: { margin: '22px 0' },
    // 规范 §2.16 steps = 方法流程（Methods Steps）：timeline-dot 退化为 numbered-points
    //   左侧 primary 实心圆点 + 正文；无圆徽章 / 无连接竖线
    steps: { margin: '22px 0' },
    // 规范 §2.4 sectionTitle = § Heading：bordered 主变体——下方 1px secondary 通栏短线
    //   padding-bottom 6px，margin 上 36 下 16（section 级需要更大上 margin）
    //   覆盖 base 的 2px primary 为 1px secondary（学术分隔克制）
    sectionTitle: {
      margin: '36px 0 16px',
      'padding-bottom': '6px',
      'border-bottom': `1px solid ${tokens.colors.secondary}`,
    },
    // 规范 §2.7 footerCTA = 致谢 + Cite As：上下 1px border 横线夹住（和 intro 同纪律）
    //   **拒绝订阅钩子**——这是 academic 和 business 的又一分水岭
    footerCTA: {
      margin: '40px 0 24px 0',
      padding: '18px 0',
      'background-color': 'transparent',
      'border-top': `1px solid ${tokens.colors.border}`,
      'border-bottom': `1px solid ${tokens.colors.border}`,
      'border-radius': '0',
    },
    // 规范 §2.8 recommend = References：悬挂缩进 APA / Vancouver 格式
    //   底色 #fefefe，无边框——靠上方"REFERENCES"拉丁大写顶标签识别
    //   （container 层只管外 margin + padding；悬挂缩进靠 CSS padding-left + text-indent）
    recommend: {
      margin: '24px 0',
      padding: '14px 0',
      'background-color': 'transparent',
      'border-radius': '0',
      'border-top': `1px solid ${tokens.colors.border}`,
    },
    // 规范 §2.9 qrcode = 通讯地址块（Correspondence）：无容器底色
    //   左侧 80×80 二维码 + 右侧联系信息三行（实现由容器 renderer 承担）
    qrcode: {
      margin: '32px 0 0 0',
      padding: '0',
      'background-color': 'transparent',
      'border-radius': '0',
    },
  },

  // ============================================================
  // 骨架变体（规范 §2 每节的 primary variant）
  // ============================================================
  variants: {
    // 规范 §2.10 tip 签名：accent-bar（左 2px primary 深靛竖条 + bgSoft 浅底）
    //   四态默认走 accent-bar——差异化靠英文 label（Definition. / Methods. / Limitations. /
    //   Fallacy.）+ markdown `variant=` 覆盖实现（warning→dashed-border / danger→ticket-notch /
    //   info→minimal-underline）
    admonition: 'accent-bar',
    // 规范 §2.6：quoteCard 走 frame-brackets——"四角括号框"重新诠释为定理框
    //   顶栏由模板的 `Theorem 1.1` 标签承担
    quote: 'frame-brackets',
    // 规范 §2.15：compare 走 column-card（兼容 pros/cons markdown）
    //   拒绝 ledger（涨红跌蓝账本——那是 business 专属）
    compare: 'column-card',
    // 规范 §2.16：steps 走 timeline-dot——左侧实心圆点 + 正文
    //   拒绝 number-circle（default 教程感）/ ribbon-chain（广告感）
    steps: 'timeline-dot',
    // 规范 §2.17：divider 默认 rule——1px border 色水平横线
    //   拒绝 wave / flower / dots——全部不在本主题视觉语言内
    divider: 'rule',
    // 规范 §2.4：sectionTitle 走 bordered——下 1px secondary 通栏短线
    //   拒绝 cornered（那是 literary 书角 / industry 方块语汇）
    sectionTitle: 'bordered',
    // 规范 §1.1：code 安静处理——bare 裸 <pre><code>，不做 header-bar 语言标签带
    //   那是 tech-explainer 签名
    codeBlock: 'bare',
  },

  // ============================================================
  // Templates（学术容器语法片段）
  // ============================================================
  templates: {
    ...commonTemplates,
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
    // 规范 §2.7 footerCTA = 致谢 + Cite As：**拒绝订阅钩子**
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
})
