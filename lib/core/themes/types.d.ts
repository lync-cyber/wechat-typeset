/**
 * Theme 设计系统类型定义
 *
 * 每个主题 = 设计令牌 + 元素样式 + 容器样式 + SVG 装饰资产 + 模板 + 骨架变体。
 * 主题严禁在任何层级声明 font-family——微信客户端会用系统字体覆盖，
 * themeCSS 生成器遇到 font-family 会直接 throw ThemeAuthoringError。
 *
 * ThemeVariants：每类容器可选多个"视觉骨架"，主题在 variants 里声明 id；
 * 渲染器按 id 查表分派到 variants/{kind}/{id}.ts。variant 模块只允许返回
 * { wrapperCSS, titleCSS, bodyCSS, svgSlot } 四段产物，杜绝"CSS 片段超市"。
 * 主题不声明 variants 时，buildTheme 填入 DEFAULT_VARIANTS。
 */
export type CSSObject = Record<string, string | number>;
export type SVGString = string;
/**
 * 参数化 SVG 资产工厂的形状变体。控制 SVG 图形语言（sharp / soft / serif / playful），
 * 不控制颜色——颜色随 tokens 自动流动。
 * PersonaSpec 与 Theme 双端消费；_shared/svgAssets.ts re-export 此类型。
 */
export type SvgVariant = 'geometric' | 'soft' | 'serif' | 'playful';
/** 语义化状态色：提示容器与后续可能的徽章使用 */
export interface StatusPair {
    accent: string;
    soft: string;
}
export interface ThemeTokens {
    colors: {
        primary: string;
        secondary: string;
        accent: string;
        bg: string;
        bgSoft: string;
        bgMuted: string;
        text: string;
        textMuted: string;
        textInverse: string;
        border: string;
        code: string;
        /** 语义色：tip / warning / info / danger，容器外框与标题色从此取 */
        status: {
            tip: StatusPair;
            warning: StatusPair;
            info: StatusPair;
            danger: StatusPair;
        };
        /**
         * `<pre>` 代码块底色（buildTheme.baseElements.pre 兜底消费）。
         * 不声明则用 Atom One Dark 家族常量（'#2a2d32'），即"浅底主题里默认给一个深色代码块"。
         * 暗底主题（brutalist / late-night-vinyl）想自定义代码块底色，可在 palette 里声明本字段
         * 而不必整段 __reset elements.pre。
         */
        preBg?: string;
        /** `<pre>` 代码块文字色（同 preBg）。不声明则用 '#d8d8d4'。 */
        preText?: string;
        /**
         * 图注 / 脚注 / 紧凑小字栏的正文色（介于 text 与 textMuted 之间）。
         * 例：swiss-grid '#333333'。
         */
        textCaption?: string;
        /** 高亮（`==xx==` / highlight 容器）底色。例：default '#fff4c8'。 */
        highlightBg?: string;
        /** inline `<code>` 的底色（区别于 `code` 文字色）。例：life-aesthetic '#f3e4cc'。 */
        codeBg?: string;
        /** quote-card 容器底色（pull-quote 与正文分层）。例：life-aesthetic '#fffaf1'。 */
        quoteCardBg?: string;
        /** note 容器的边线 / 分隔线色（常用 dashed）。例：default '#c8ccd4'。 */
        noteBorder?: string;
        /**
         * note · side-bar variant 左侧标线线型。不声明 = 'solid'。
         * 6 主题共用 side-bar 时靠此字段做"同骨架不同笔触"差异化。
         */
        noteBorderStyle?: 'solid' | 'dashed' | 'double' | 'dotted';
        /** note · side-bar variant 左侧标线宽度（px）。不声明 = 2；double 风格建议 ≥ 3。 */
        noteBorderWidth?: number;
        /**
         * 古典朱印色。东方传统出版物语境下的稀缺红章 / 朱字夹注 / 方印边框色。
         * 例：'#a03a2a'。不声明 = 该主题不参与朱印语义,variant 应回退到 accent
         * 或不绘制朱印元素。
         */
        accentClassical?: string;
        /**
         * 博物笔记暖辅色。学名 / 编号 / 测量边线等的赭褐色,介于 text 与
         * accentClassical 之间。例：'#8b4a3a'。不声明 = 该主题不参与博物语义,
         * variant 应回退到 textMuted 或 secondary。
         */
        accentNaturalist?: string;
    };
    typography: {
        baseSize: number;
        lineHeight: number;
        h1Size: number;
        h2Size: number;
        h3Size: number;
        letterSpacing: number;
        /** 四级标题字号。默认 `baseSize + 1`。 */
        h4Size?: number;
        /** 五级标题字号。默认 `baseSize`。 */
        h5Size?: number;
        /** 六级标题字号。默认 `baseSize`。 */
        h6Size?: number;
        /** 等宽字（inline `<code>` / `<table>`）字号。默认 14。 */
        monoSize?: number;
        /** 图注 / `<kbd>` / 小注字号。默认 12。 */
        captionSize?: number;
    };
    spacing: {
        paragraph: number;
        section: number;
        listItem: number;
        containerPadding: number;
    };
    radius: {
        sm: number;
        md: number;
        lg: number;
    };
}
export interface ThemeElements {
    h1: CSSObject;
    h2: CSSObject;
    h3: CSSObject;
    /**
     * 四级小标题。教程主题常用于 "Step 1. 初始化项目" 这类可操作步骤题头，
     * 介于 h3 章节小节与 p 正文之间，和 steps 容器搭配使用。
     */
    h4: CSSObject;
    /**
     * 五 / 六级标题。markdown-it 解析 `##### / ######` 为 `<h5>/<h6>`；
     * 主题不显式覆写时由 baseElements 给一个比 h4 更弱的兜底。
     */
    h5: CSSObject;
    h6: CSSObject;
    p: CSSObject;
    blockquote: CSSObject;
    ul: CSSObject;
    ol: CSSObject;
    li: CSSObject;
    code: CSSObject;
    /**
     * 键盘按键帽样式。微信约束下不能用 box-shadow 模拟立体，
     * 通过 `border 1px + border-bottom 2px` 的不对称边框表达键帽感。
     */
    kbd: CSSObject;
    pre: CSSObject;
    img: CSSObject;
    a: CSSObject;
    hr: CSSObject;
    table: CSSObject;
    /** 表头单元格。 */
    th: CSSObject;
    /** 数据单元格。 */
    td: CSSObject;
    strong: CSSObject;
    em: CSSObject;
}
/**
 * 主题容器样式集。每个字段对应 src/containers/vocabulary.ts 里 `styleKey` 非 null 的容器。
 *
 * 约束：字段集必须与 STYLED_CONTAINERS 的 styleKey 集合一致；新增容器时两边同步。
 * 有运行时对齐检查（buildTheme + containers/api）；漏加字段会在 baseContainers()
 * 层抛 TS 编译错。
 *
 * **字段顺序仅为人工分组，不承载渲染语义**——renderer 按 styleKey 字符串查表分派
 * （vocabulary.ts `STYLE_KEY_TO_CONTAINER_NAME`），跟此处声明顺序无关。下面空行 + 注释
 * 把字段分块（base / signature / data-brief / editorial）只为方便人眼检索。
 *
 * 不含 `free` / `pros` / `cons` —— 它们在 vocabulary 里 styleKey=null：
 *   - free：刻意不施加主题样式（escape hatch）
 *   - pros / cons：样式由外层 compare 的 CSS 派生（compare 两栏专属收敛规则）
 */
export interface ThemeContainers {
    intro: CSSObject;
    author: CSSObject;
    cover: CSSObject;
    tip: CSSObject;
    warning: CSSObject;
    info: CSSObject;
    danger: CSSObject;
    /** 第五态补注（note）。中性色、低对比；未设置也不影响 renderer，走 token 兜底。 */
    note: CSSObject;
    quoteCard: CSSObject;
    highlight: CSSObject;
    compare: CSSObject;
    steps: CSSObject;
    sectionTitle: CSSObject;
    footerCTA: CSSObject;
    recommend: CSSObject;
    qrcode: CSSObject;
    /** 公众号语音占位卡（粘贴后由微信识别为 mpvoice）。fence 名 voice-card。 */
    voiceCard: CSSObject;
    /** 公众号视频占位卡（粘贴后由微信识别为 mpvideo）。fence 名 video-card。 */
    videoCard: CSSObject;
    /** 强警示横幅：文章级"置顶通告"，比 tip/warning 视觉强度更高。 */
    announcement: CSSObject;
    /** 多行作者简介卡：头像 + 名字 + 身份 + bio。与 author 单行署名块正交。 */
    authorBio: CSSObject;
    /** 图注块：图 + 居中小字灰说明。 */
    imageCaption: CSSObject;
    /** 时间线：左侧年份 + 右侧事件的时序列表。 */
    timeline: CSSObject;
    /** 文首 tl;dr 摘要块（signature 容器） */
    abstract: CSSObject;
    /** 大数字 + 说明（signature 容器） */
    keyNumber: CSSObject;
    /** 刊头（刊名 + 期号·日期，下划线分隔） */
    masthead: CSSObject;
    /** 小栏目标签（黑底白字胶囊） */
    sectionTag: CSSObject;
    /**
     * 署名条 byline。N 栏分隔（AUTHOR / EDITOR / SET 多栏 newspaper 形态），data-brief 家族签名。
     * 与 author（单作者名 + role 签名块）正交。
     */
    byline: CSSObject;
    /**
     * 装饰性副刊头（editorial-header）。跨栏大字标题 + chip 红章 + PP 页码 + subtitle + titleDot 红点。
     * data-brief 家族签名；与 cover（图卡封面）正交——cover 管"封面图 + 期号戳"，
     * editorial-header 管"红章 + 大字标题 + 副标题"。
     */
    editorialHeader: CSSObject;
    /** 目录三栏 grid（序号 · 标题 · 页码） */
    toc: CSSObject;
    /** KPI 仪表盘外壳（三指标 + sparkline + 源标注） */
    kpiDashboard: CSSObject;
    /** 条形图外壳（横向 div 柱） */
    barChart: CSSObject;
    /** 读者问答（Q/A 头像方块） */
    qaBlock: CSSObject;
    /**
     * 参考文献 / 脚注块。承载两种骨架：
     *   - `variants.footnotes='lined'`（默认）   一条一行 + hanging indent
     *   - `variants.footnotes='inline-flow'`    同段流式排列 + max-height/overflow 滚动
     * 主题 voice 在此槽位写"两种骨架共用的"色 / 字号 / 边框；layout 属性
     * （padding-left / text-indent / max-height）由 variant inline 注入。
     */
    footnotes: CSSObject;
    /** 刊物收束栏：上分割线 + 双栏 monospace 元数据（"下期 / 卷·期"） */
    colophon: CSSObject;
    /**
     * 拉引（pull-quote）容器外壳。与 quote-card 正交：
     * quote-card = 外部话语成段引用；pull-quote = 作者中段放大重申已写过的句子。
     * variants/pullQuote/<id>.ts 按骨架注入 wrapperCSS（4 种语言互不重叠）。
     */
    pullQuote: CSSObject;
    /** 结构化表格外框（table-card）。内部 table-row 子项渲染单元格。 */
    tableCard: CSSObject;
    /** 多图组合外框（gallery）。内部 image-item 子项渲染单图 + caption。 */
    gallery: CSSObject;
    /** 多轮对话外框（dialogue）。内部 dialogue-turn 子项渲染单轮对话。 */
    dialogue: CSSObject;
}
/**
 * 容器内层元素样式槽位（inner-element inline styles）。
 *
 * 区别于 `ThemeContainers`（每个容器一个 wrapper-level CSSObject,生成 `.markdown-body
 * .container-xxx` CSS 规则）：本接口承载的是容器**内部子元素**的 inline style 槽位,
 * renderer 在拼装 `<section style="...">` 字符串时直接 inline 注入,不进 themeCSS 生成器。
 *
 * 为什么不进 ThemeContainers / vocabulary：
 *   vocabulary 是"markdown fence 容器"的权威词汇表; 内层子元素既不是 markdown 容器,
 *   也不需要全局 CSS 选择器规则（公众号粘贴后 .container-key-number__value 这类长
 *   class 选择器很容易被剥）。inline style 是更稳的承载方式。
 *
 * 设计纪律（不要无限制扩展）：
 *   仅当某容器内层子元素的样式真正需要被主题作者覆盖（如 key-number 的数字字号、
 *   abstract 的 kicker 字距）才在此扩字段。"主题 voice 没有差异化诉求"的内层样式
 *   继续硬编码在 renderer 即可——避免本接口膨胀成所有 inline style 的转运站。
 *
 * 现存条目：
 *   - abstractKicker     文首 tl;dr 块的小标题色 / 字距 / 大写转换
 *   - keyNumberValue     大数字本体（数字字号 / 颜色 / 字距）
 *   - keyNumberKicker    大数字上方 kicker（小标题）
 *
 * @maxFields 10 —— 软上限。本接口的设计纪律是"主题 voice 差异化的内层 inline style 才进
 * 此表"；超过 10 个字段意味着抽象已失焦，应回看是否把"通用 inline style"误塞进来了。
 * 真要扩到 11+，先提 issue 重审接口边界，不是默默加字段。
 */
export interface ThemeInnerStyles {
    abstractKicker: CSSObject;
    keyNumberValue: CSSObject;
    keyNumberKicker: CSSObject;
}
export interface ThemeAssets {
    h2Prefix?: SVGString;
    h3Prefix?: SVGString;
    dividerFlower?: SVGString;
    dividerWave?: SVGString;
    dividerDots?: SVGString;
    quoteMark?: SVGString;
    listBullet?: SVGString;
    sectionCorner?: SVGString;
    stepBadge?: (n: number) => SVGString;
    tipIcon?: SVGString;
    warningIcon?: SVGString;
    infoIcon?: SVGString;
    dangerIcon?: SVGString;
    /**
     * Note（中性补充说明）图标。五态模型的第五档，区别于 info（"此处有延伸知识"）。
     * 教程主题里最常见，其他主题可选。
     */
    noteIcon?: SVGString;
    /**
     * 代码块右上角"可复制"装饰图标。公众号不能真复制，但该图标是"这段代码是给你抄的"的文化信号。
     * 由 codeBlock variant = 'header-bar' 消费；variant 为 'bare' 时忽略。
     */
    copyIcon?: SVGString;
    /**
     * 外链箭头，用于 <a> 元素末尾装饰（MDN / Stripe Docs 的 universal 外链标识）。
     *
     * @experimental 当前未被任何渲染器自动注入，仅作为 spec / Theme 类型上的可选资产。
     * 接入流程：在 inline `<a>` 渲染层读 theme.assets.externalLinkIcon，命中后拼到链接尾。
     * 若 Phase 2.x 仍无消费方，迁到 ThemeAssets.experimental? 子对象避免持续误导作者。
     */
    externalLinkIcon?: SVGString;
    /**
     * bash 代码块前缀 `$` 字符 SVG，提示"这行是 shell 命令"。
     *
     * @experimental 当前未被 highlight hook 自动注入。接入流程：codeBlock variant
     * 'terminal-frame' 在每行首识别 `$` 前缀后插入本 SVG。同 externalLinkIcon 的退役流程。
     */
    terminalPrompt?: SVGString;
    /**
     * 卷尾钤印。当主题提供时，footerCTA renderer 会在容器底部右下角自动注入一枚 24×24
     * 装饰印章，作为"全文收束"视觉签名。规范上只在"稀缺色"语义强的主题里使用
     * （如 literary-humanism 的藏经朱）——其他主题留空即可，renderer 不做默认兜底。
     */
    sealMark?: SVGString;
    /**
     * 期号印章（newsletter 期刊戳）。当主题提供 + markdown 容器上声明了 issue/date/kind
     * 任一 attr 时，cover / author / footerCTA renderer 会在各自配置的位置注入该 SVG。
     * 设计意图：industry-observer 家族（周刊 / newsletter）的"ISSUE #023 · 2025-04-20 · 周刊"
     * 戳记，跨三个容器保持视觉一致；非 newsletter 主题不提供即可。
     *
     * 参数：issue（期号，如 "023"）、date（日期字符串）、kind（刊物类型，如 "周刊"）。
     * 任一参数可为空串，由主题自行决定占位。
     */
    issueStamp?: (issue: string, date: string, kind: string) => SVGString;
}
export interface ThemeTemplates {
    cover?: string;
    authorBar?: string;
    footerCTA?: string;
    recommend?: string;
    compare?: string;
    steps?: string;
    tip?: string;
}
export interface ThemeInline {
    highlight: CSSObject;
    wavy: CSSObject;
    emphasis: CSSObject;
    /** GFM 删除线（`~~text~~` → `<s>`）。给主题作者一个调色 / 调位置的入口。 */
    del: CSSObject;
    /** 插入（markdown-it-ins `++text++` → `<ins>`）。 */
    ins: CSSObject;
}
export type AdmonitionVariantId = 'accent-bar' | 'pill-tag' | 'card-shadow' | 'terminal' | 'dashed-border' | 'top-bottom-rule' | 'manpage-log' | 'sidenote-latex' | 'marginalia' | 'ledger-cell' | 'bubble-organic' | 'magazine-pull' | 'report-section' | 'news-row' | 'news-underline' | 'mook-tag' | 'slab-corner' | 'numbered-rule' | 'hanging-nb' | 'vermilion-seal' | 'paper-slip' | 'field-tag' | 'specimen-box' | 'filled-square' | 'triangle-top';
export type QuoteVariantId = 'classic' | 'magazine-dropcap' | 'column-rule' | 'frame-brackets' | 'editorial-block' | 'tilted-sticker' | 'oversized-mark' | 'numbered-lines' | 'seal-kai' | 'double-frame' | 'specimen-quote' | 'binomial-attrib' | 'huge-numeral' | 'ring-device';
export type CompareVariantId = 'column-card' | 'stacked-row' | 'ledger' | 'data-card' | 'paired-specimen' | 'measurement-table' | 'paired-shape' | 'axis-diagram';
export type StepsVariantId = 'number-circle' | 'timeline-dot' | 'step-card' | 'split-row' | 'seal-cjk' | 'ruler-row';
export type DividerVariantId = 'wave' | 'dots' | 'flower' | 'rule' | 'glyph' | 'seal-mark';
export type SectionTitleVariantId = 'bordered' | 'cornered' | 'number-prefix' | 'kicker-stack' | 'ribbon-stamp';
/**
 * Note 第五态独立 variant 类。命名空间与 admonition 故意分离：
 *   - admonition 4 态共享一个池，骨架强调"四色差异"
 *   - note 单独一个池，骨架强调"中性补注、低调、不抢色"（textMuted + 可选 noteIcon）
 * 让 note 池可独立演进（增 LaTeX-旁注、CJK 书签式批注等"非情绪"骨架）。
 */
export type NoteVariantId = 'minimal-callout' | 'box-callout' | 'side-bar' | 'dotted-margin' | 'smallcaps-kicker' | 'editorial-stripe' | 'research-dense' | 'ed-signoff' | 'inline-label' | 'interlinear-gloss' | 'vermilion-gloss' | 'ruler-note' | 'latin-subhead' | 'initial-disc' | 'geometric-mark';
/**
 * highlight 骨架池。当前仅 'plain' 一档,作为 ThemeContainers.highlight 类规则下的
 * 透明占位(render 不发 wrapperCSS,仅承载 `container-highlight--plain` className,
 * 让 highlight 与其他容器一致进入骨架切换机制)。
 */
export type HighlightVariantId = 'plain' | 'dotted-underline' | 'tracked-emphasis' | 'vermilion-inline' | 'side-dots' | 'wash-ground' | 'bracketed-tick' | 'geometric-flag' | 'single-stroke';
export type CodeBlockVariantId = 'bare' | 'header-bar' | 'line-numbers' | 'terminal-frame' | 'inline-card';
export type RecommendVariantId = 'card-list' | 'academic-refs';
export type QrcodeVariantId = 'bare' | 'follow-card' | 'qr-stack';
export type FooterCTAVariantId = 'button-led' | 'triptych-actions';
export type FootnotesVariantId = 'lined' | 'inline-flow' | 'boxed-aside' | 'top-rule' | 'dense-academic';
export type PullQuoteVariantId = 'giant-mark' | 'centered-rule' | 'stamp-quote' | 'margin-pull' | 'weight-contrast' | 'drop-capital' | 'calligraphic' | 'with-gloss' | 'bilingual-stack' | 'caliper-mark' | 'inverted-plate' | 'grid-block';
export type AnnouncementVariantId = 'danger-bar' | 'mono-disclaimer' | 'ai-notice' | 'stamped-banner';
export type TableCardVariantId = 'rule-grid' | 'zebra-rows' | 'key-value' | 'price-tier' | 'three-line-table' | 'index-table' | 'matrix';
export type GalleryVariantId = 'duo' | 'triptych' | 'nine-grid' | 'ribbon-strip';
export type QaBlockVariantId = 'numbered-faq' | 'hanging-qa' | 'seal-stamp' | 'query-annotation' | 'sample-query' | 'field-card' | 'circle-square' | 'typed-block';
export type DialogueVariantId = 'qa-rows' | 'chat-bubbles' | 'name-prefix' | 'interview-column' | 'audio-stamp';
/** 主题骨架选择。每个字段选一个 id，渲染器据此分派到 variants/{kind}/{id}.ts。 */
export interface ThemeVariants {
    admonition: AdmonitionVariantId;
    quote: QuoteVariantId;
    compare: CompareVariantId;
    steps: StepsVariantId;
    divider: DividerVariantId;
    sectionTitle: SectionTitleVariantId;
    codeBlock: CodeBlockVariantId;
    /** note 第五态独立变体类，与 admonition 4 态解耦。 */
    note: NoteVariantId;
    /**
     * highlight 骨架池。字段可选: 21 主题尚未启用骨架切换,buildTheme 用
     * DEFAULT_VARIANTS.highlight 兜底; 主题想换骨架时显式声明本字段。
     * 其他 kind 均必填,本字段单独 optional 反映"骨架池刚启用、主题尚未接入"过渡态。
     */
    highlight?: HighlightVariantId;
    /** 脚注 / 参考文献骨架（lined / inline-flow）。 */
    footnotes: FootnotesVariantId;
    /** 推荐阅读骨架（card-list 默认 / academic-refs = 原 see-also）。 */
    recommend: RecommendVariantId;
    /** 二维码骨架（bare 默认 / follow-card = 原 qr-follow）。 */
    qrcode: QrcodeVariantId;
    /** 文末 CTA 骨架（button-led 默认 / triptych-actions = 原 cta-bar）。 */
    footerCTA: FooterCTAVariantId;
    /** 拉引骨架：pull-quote 容器专属（与 quote-card 正交：作者自我重申）。 */
    pullQuote: PullQuoteVariantId;
    /** 强警示横幅骨架：announcement 容器（与 tone= 正交）。 */
    announcement: AnnouncementVariantId;
    /** 结构化表格骨架：table-card 容器（外层 4 冒号，内嵌 table-row）。 */
    tableCard: TableCardVariantId;
    /** 多图组合骨架：gallery 容器（外层 4 冒号，内嵌 image-item）。 */
    gallery: GalleryVariantId;
    /** 多轮对话骨架：dialogue 容器（外层 4 冒号，内嵌 dialogue-turn）。 */
    dialogue: DialogueVariantId;
    /**
     * 读者问答骨架：qa-block 容器（单 Q + 单 A，签名容器）。
     * 与 dialogue 正交：dialogue 是多轮访谈，qa-block 是单轮 FAQ 范式。
     * P3.1 已登记字段，主题未声明时由 DEFAULT_VARIANTS 兜底；renderer 在 P3.2 完成 variant 派发后正式消费。
     */
    qaBlock: QaBlockVariantId;
}
/**
 * 主题不声明时的回退。保证现有主题零改动兼容。
 * buildTheme 会在 opts.variants 未提供时注入此常量。
 */
export declare const DEFAULT_VARIANTS: ThemeVariants;
export interface ThemeKickers {
    /** ::: toc 容器无 info 时的 kicker 兜底（renderer 默认 "目录 · CONTENTS"） */
    toc: string;
    /** ::: qa-block 容器无 info 时的 kicker 兜底（renderer 默认 "读者问答 · Q&A"） */
    qaBlock: string;
    /** qrcode variant=follow-card 的 attrs.kicker 兜底（renderer 默认 "SUBSCRIBE"） */
    qrFollowKicker: string;
    /** qrcode variant=follow-card 容器无 info 时的 title 兜底（renderer 默认 "订阅本刊"） */
    qrFollowTitle: string;
    /** ::: recommend 容器无 info 时的 title 兜底（renderer 默认 "推荐阅读"） */
    recommend: string;
    /** ::: footer-cta 容器无 info 时的 title 兜底（renderer 默认 "关注我"） */
    footerCTATitle: string;
    /** ::: colophon 左栏 kicker（renderer 默认 "下 期"） */
    colophonNextLabel: string;
    /** ::: colophon 右栏 kicker（renderer 默认 "卷 · 期"） */
    colophonIssueLabel: string;
    /** ::: masthead 容器无 info 时的 name 兜底（renderer 默认 "简报"） */
    mastheadName: string;
}
/**
 * 主题不声明 kickers 时的兜底文案。
 * buildTheme 会在 opts.kickers 未提供时注入此常量；Partial 覆盖深合并。
 */
export declare const DEFAULT_KICKERS: ThemeKickers;
/**
 * 所有可选 VariantId 的常量清单（供 variant-sanity 测试枚举使用，
 * 任何新增 id 必须同步补齐，否则测试会漏掉新 variant）。
 */
export declare const VARIANT_IDS: {
    admonition: readonly ["accent-bar", "pill-tag", "card-shadow", "terminal", "dashed-border", "top-bottom-rule", "manpage-log", "sidenote-latex", "marginalia", "ledger-cell", "bubble-organic", "magazine-pull", "report-section", "news-row", "news-underline", "mook-tag", "slab-corner", "numbered-rule", "hanging-nb", "vermilion-seal", "paper-slip", "field-tag", "specimen-box", "filled-square", "triangle-top"];
    quote: readonly ["classic", "magazine-dropcap", "column-rule", "frame-brackets", "editorial-block", "tilted-sticker", "oversized-mark", "numbered-lines", "seal-kai", "double-frame", "specimen-quote", "binomial-attrib", "huge-numeral", "ring-device"];
    compare: readonly ["column-card", "stacked-row", "ledger", "data-card", "paired-specimen", "measurement-table", "paired-shape", "axis-diagram"];
    steps: readonly ["number-circle", "timeline-dot", "step-card", "split-row", "seal-cjk", "ruler-row"];
    divider: readonly ["wave", "dots", "flower", "rule", "glyph", "seal-mark"];
    sectionTitle: readonly ["bordered", "cornered", "number-prefix", "kicker-stack", "ribbon-stamp"];
    codeBlock: readonly ["bare", "header-bar", "line-numbers", "terminal-frame", "inline-card"];
    note: readonly ["minimal-callout", "box-callout", "side-bar", "dotted-margin", "smallcaps-kicker", "editorial-stripe", "research-dense", "ed-signoff", "inline-label", "interlinear-gloss", "vermilion-gloss", "ruler-note", "latin-subhead", "initial-disc", "geometric-mark"];
    highlight: readonly ["plain", "dotted-underline", "tracked-emphasis", "vermilion-inline", "side-dots", "wash-ground", "bracketed-tick", "geometric-flag", "single-stroke"];
    footnotes: readonly ["lined", "inline-flow", "boxed-aside", "top-rule", "dense-academic"];
    recommend: readonly ["card-list", "academic-refs"];
    qrcode: readonly ["bare", "follow-card", "qr-stack"];
    footerCTA: readonly ["button-led", "triptych-actions"];
    pullQuote: readonly ["giant-mark", "centered-rule", "stamp-quote", "margin-pull", "weight-contrast", "drop-capital", "calligraphic", "with-gloss", "bilingual-stack", "caliper-mark", "inverted-plate", "grid-block"];
    announcement: readonly ["danger-bar", "mono-disclaimer", "ai-notice", "stamped-banner"];
    tableCard: readonly ["rule-grid", "zebra-rows", "key-value", "price-tier", "three-line-table", "index-table", "matrix"];
    gallery: readonly ["duo", "triptych", "nine-grid", "ribbon-strip"];
    dialogue: readonly ["qa-rows", "chat-bubbles", "name-prefix", "interview-column", "audio-stamp"];
    qaBlock: readonly ["numbered-faq", "hanging-qa", "seal-stamp", "query-annotation", "sample-query", "field-card", "circle-square", "typed-block"];
};
export type VariantKind = keyof ThemeVariants;
/** 装饰里允许引用的色 token 键（必须是 ThemeTokens.colors 的合法 key） */
export type PaletteColorKey = 'primary' | 'secondary' | 'accent' | 'text' | 'textMuted'
/**
 * 反白文字色（典型: 红底/黑底色块徽章上的白字）。
 * 加入动机: swiss-grid H2 红章徽章需要 color='textInverse' + backgroundColor='primary',
 * 否则只能 hardcode '#ffffff' 失去 token 流动。其它"色块徽章"主题也会受益。
 */
 | 'textInverse';
export interface HeadingPrefixDecoration {
    /** 适用的标题级别。h1 由作者写文章标题，不接入装饰；通常用 h2/h3。 */
    level: 2 | 3;
    /**
     * 文本前缀正则（与 autoNumber 二选一）。捕获组 1 是要被装饰的前缀文本；
     * 整个匹配（含尾随空白）从原 inline 文本里被剥掉。
     * 例：`'^(\\d{1,2}|[附终前补])(\\s+|$)'` 匹配 "01 标题" / "附 标题"。
     */
    pattern?: string;
    /**
     * 自动按出现顺序生成编号（与 pattern 二选一）。计数器 per-render 重置、按 level
     * 分桶。
     *   - `roman`                → I/II/III…
     *   - `arabic`               → 1/2/3…
     *   - `arabic-padded`        → 01/02/03…
     *   - `arabic-section`       → `${h2}.${h3InH2}`（只对 level 3 有意义；每遇到
     *                              新的 h2 时 h3InH2 重置回 1）
     *   - `arabic-section-padded` → `01.1` / `01.2` …（h2 段号零填充两位）
     *   - `circled`              → ❶/❷/❸…⓴（Unicode 圆圈数字 1–20；>20 退化为
     *                              `(N)` 字符回退）。mook / 杂志感的章节签名常用此种。
     * 复合编号在 level 2 上等价于 arabic（h3InH2 退化为 0），不建议在 level 2 使用。
     */
    autoNumber?: 'roman' | 'arabic' | 'arabic-padded' | 'arabic-section' | 'arabic-section-padded' | 'circled';
    /** 装饰样式（声明式 token 引用）。 */
    style: {
        color: PaletteColorKey;
        /**
         * 装饰前缀的底色（token 引用）；声明则把编号渲染成"色块徽章"——
         * 典型例：swiss-grid 主题的 H2 「01」红方块前缀。
         * 缺省 = 不设底色（保持纯文字编号）。需与 paddingX / paddingY 搭配使用以撑开方块。
         */
        backgroundColor?: PaletteColorKey;
        /**
         * 装饰前缀的左右内边距 px（仅 backgroundColor 声明时生效）；缺省 0。
         * 与 paddingY 一起拼成 `padding:${paddingY}px ${paddingX}px`，让色块徽章撑开数字。
         */
        paddingX?: number;
        /**
         * 装饰前缀的上下内边距 px（仅 backgroundColor 声明时生效）；缺省 0。
         * 与 paddingX 配合形成方块徽章；典型值 paddingX=8, paddingY=2 复刻 Swiss-Grid「01」红章。
         */
        paddingY?: number;
        /** 只允许 monospace（正文字体由系统决定）；缺省时继承标题字体 */
        fontFamily?: 'monospace';
        fontWeight?: 400 | 500 | 600 | 700;
        /** 字号 px；缺省时继承标题字号 */
        fontSize?: number;
        /** 字距 px；缺省 0 */
        letterSpacing?: number;
        /** 与后续标题文字的间距 px；缺省 8（仅 display='inline' 生效） */
        marginRight?: number;
        /** 是否在装饰前缀下方画一道短下划线（颜色取自 color 字段） */
        underline?: boolean;
        /** underline=true 时下划线相对基线的下沉距离 px；缺省 2 */
        underlinePad?: number;
        /**
         * 装饰 span 的显示模式：
         *   - `'inline'`（默认）→ `display:inline-block`，编号与标题文字同一行
         *   - `'block'`         → `display:block`，编号自成一行变成"kicker"，标题文字换行落到
         *                          下一行（mook / POPEYE / BRUTUS 系刊物风：`❶ 第一章` 上行
         *                          + 章节标题在下行）
         * 默认 'inline'，保持现有主题（data-brief / people-story）渲染一致。
         */
        display?: 'inline' | 'block';
        /**
         * `display='block'` 时编号 span 与下方标题文字的间距 px；缺省 6。
         * `display='inline'` 时忽略本字段（横向间距走 marginRight）。
         */
        marginBottom?: number;
        /**
         * 装饰文字后缀（仅 autoNumber 生效；pattern 模式忽略）。
         * 支持两种占位符替换：
         *   - `{n}`  → autoNumber 输出值原样（如 'circled' 时是 "❶"、'arabic' 时是 "1"）
         *   - `{cn}` → 中文小写数字 一/二/三…二十（>20 退化为阿拉伯数字字符串）
         * 典型用法：`'  第{cn}章'` 与 `autoNumber:'circled'` 搭配,产出"❶  第一章"kicker。
         * 缺省 = 不追加后缀。
         */
        suffix?: string;
    };
}
/**
 * 首段首字下沉装饰：渲染器扫 `::: intro` 块的首段首字符,拆成
 * `<span class="intro-dropcap">X</span>` + 余文。
 *
 * 为什么"扫前导标点 / 跳数字 / 拆首字符"逻辑无法纯声明：
 *   - 前导标点跳过规则（中英标点 / 开引号 / 各式括号）是 unicode 类目级别的判定
 *   - 阿拉伯数字不下沉是排版约定（数字下沉视觉很丑）
 *   - 首字符拆出后需要"前缀部分 + dropcap span + 余文"三段重组,触及 markdown-it
 *     的 Token 类内部细节
 * 这些逻辑被收口在 `markdown.ts:applyIntroDropcap` 的统一实现里, 主题作者只声明
 * "我要 dropcap, 用什么色 / 什么字号"。
 */
export interface IntroDropcapDecoration {
    /** dropcap 颜色（token 引用） */
    color: PaletteColorKey;
    /** dropcap 字号 px；缺省 48 */
    fontSize?: number;
    /** dropcap 字重；缺省 700 */
    fontWeight?: 400 | 500 | 600 | 700;
    /** dropcap 与余文之间的右间距 px；缺省 8 */
    marginRight?: number;
    /** dropcap 上内边距 px（与基线对齐微调）；缺省 4 */
    paddingTop?: number;
}
export interface Decorations {
    /**
     * 标题前缀装饰。同一 level 可有多条，按声明顺序依次应用——通常一个主题给定
     * level 只声明一条；多条的语义是"同时叠加"（autoNumber + pattern 可同时存在，
     * 但通常没必要）。
     */
    headingPrefix?: readonly HeadingPrefixDecoration[];
    /** intro 首段首字下沉。声明则启用,样式参数由本结构提供。 */
    introDropcap?: IntroDropcapDecoration;
}
/**
 * 运行时主题对象。**字段顺序仅作分组阅读用，不承载任何渲染语义**——
 * pipeline 按命名查表（renderer 读 theme.tokens / theme.elements.h2 / theme.containers.intro
 * 等），不依赖此处声明顺序。下方空行只为把"基础信息 / token / 样式 / 资产 / 模板 / 变体 /
 * kicker / 元数据"分组方便人眼阅读，不要把它误读成"渲染层级"。
 */
export interface Theme {
    id: string;
    name: string;
    description: string;
    author: string;
    preview: string;
    tokens: ThemeTokens;
    elements: ThemeElements;
    containers: ThemeContainers;
    /**
     * 容器内层元素样式槽位。renderer 通过 ContainerRenderContext.innerStyles 消费,
     * 不进 themeCSS 生成器（inline-style only, 公众号粘贴稳定）。详见 `ThemeInnerStyles` 注释。
     */
    innerStyles: ThemeInnerStyles;
    assets: ThemeAssets;
    templates: ThemeTemplates;
    inline: ThemeInline;
    /**
     * 骨架选择。主题不声明时由 buildTheme 填入 DEFAULT_VARIANTS。
     * 渲染器在 ContainerRenderContext.variants 里读取。
     */
    variants: ThemeVariants;
    /**
     * 主题级 kicker 文案覆盖。主题不声明时由 buildTheme 填入 DEFAULT_KICKERS。
     * 渲染器在 ContainerRenderContext.kickers 里读取——优先级低于作者侧 info。
     */
    kickers: ThemeKickers;
    /**
     * 参数化 SVG 资产工厂的形状变体。仅在 applyPalette（用户自定义配色）路径消费——
     * 此时 motifs AST 已固化在原主题上，重新生成 assets 时按此字段挑工厂。spec-first
     * 主路径（specToTheme）不消费该字段，因为 assets 直接由 motifs 渲染。
     *
     * 缺省时 applyPalette 回退到 `'geometric'`。
     */
    svgVariant?: SvgVariant;
    /**
     * 基线主题选择（`'light'` 默认 / `'dark'` opt-in）。
     *
     * buildTheme 的"软底卡片"兜底是 light 基线；声明 `'dark'` 切到"hairline 边 + 透明底"
     * 基线，让 brutalist / late-night-vinyl 等暗底主题作者免去把每个软底容器手写一遍
     * `__reset: true, background-color: transparent`。详见 `BuildThemeOptions.baseTheme`。
     *
     * 切基线 != 切色板：主题色仍由 palette 控制；基线只控制"卡片底色"这条结构轴。
     */
    baseTheme?: 'light' | 'dark';
    /**
     * 声明式装饰规则。所有"主题专属视觉签名"（标题前缀编号 / kicker / 章节标记 /
     * intro 首字下沉……）一律走这里, 共享层只实现一次"按声明执行"。
     */
    decorations?: Decorations;
    /**
     * 主题能力自描述。结构与 PersonaSpec.capabilities 同源，由 specToTheme 透传。
     * 仅供 API 查询与 LLM 推荐使用，pipeline 渲染不读此字段。
     */
    capabilities?: {
        containers?: readonly string[];
        variantOverrides?: Partial<ThemeVariants>;
        excluded?: readonly string[];
    };
}
export declare class ThemeAuthoringError extends Error {
    constructor(message: string);
}
