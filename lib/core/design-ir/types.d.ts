/**
 * Design IR —— 把 docs/wechat-typeset-container/content-*.html 设计稿解析成机器
 * 可消费的"容器几何卡"。LLM 写 variant.ts 时读这份 JSON 而不是 inline-style 满天飞的
 * HTML，消除"flex/grid 现代 CSS → display:table 兼容子集"翻译歧义。
 *
 * 设计层级（与 [docs/design-to-impl-mapping.md] 对齐）：
 *   设计稿 4 主题 t1-t4  →  本类型 `DesignTheme`（4 值枚举）
 *   设计稿主题切片色      →  literal-to-token 表（color.literal + tokenSuggestion）
 *   variant 顶层盒        →  DesignIR.wrapper（box + 装饰锚点）
 *   一级直接子盒          →  DesignIR.slots（角色化的 box，wrapper / leftCol / badge / body ...）
 *
 * 不抽全树：装饰节点的几何细节交给 variant 实现者用判断力填，IR 只锁住"父级几何 +
 * 角色 + 关键文字 + 装饰位置"。否则 IR 一旦写得太死，设计稿小调整就要全量重抽。
 */
/**
 * 设计稿 4 主题切片代号。与 [docs/wechat-typeset-container/content-*.html] 里
 * `.phone.t1/t2/t3/t4` 类名严格一一对应——CSS 选择器是唯一事实来源，不另起字符串协议。
 */
export type DesignTheme = 't1' | 't2' | 't3' | 't4';
/**
 * Box（几何盒）—— 经 parseInlineStyle 处理后只保留对几何/布局有意义的字段。
 *
 * 数值统一存 string（保留 'px'/'%'/'em' 后缀，让消费方按需 toFloat），避免在 IR
 * 阶段过度归一化丢失语义。颜色按 `{ literal, tokenSuggestion }` 双轨保存：literal
 * 用于像素级几何 diff、tokenSuggestion 给 LLM 写 variant 时直接 ctx.tokens 反查。
 */
export interface IRBox {
    display?: string;
    /** 'fixed' / 'auto' —— 仅当 display 在 table 系列时有意义。 */
    tableLayout?: string;
    width?: string;
    height?: string;
    minWidth?: string;
    maxWidth?: string;
    padding?: string;
    margin?: string;
    border?: string;
    borderTop?: string;
    borderRight?: string;
    borderBottom?: string;
    borderLeft?: string;
    borderCollapse?: string;
    borderSpacing?: string;
    borderRadius?: string;
    /** flex/grid 系列（仅设计稿现代 CSS 出现；实现侧禁用） */
    flex?: string;
    flexShrink?: string;
    flexGrow?: string;
    flexBasis?: string;
    gap?: string;
    gridTemplateColumns?: string;
    gridTemplateRows?: string;
    justifyContent?: string;
    alignItems?: string;
    /** 文字几何 */
    fontSize?: string;
    fontWeight?: string;
    fontStyle?: string;
    lineHeight?: string;
    letterSpacing?: string;
    textAlign?: string;
    textDecoration?: string;
    textTransform?: string;
    writingMode?: string;
    /** 颜色（设计稿全部字面，实现侧应当 token 化） */
    background?: IRColor;
    color?: IRColor;
    /** 定位（应当全为 undefined；公众号会剥；保留是为了 diff 告警） */
    position?: string;
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
    transform?: string;
    /** 字面 box-sizing（一般 border-box） */
    boxSizing?: string;
    /** 解析失败 / 未识别的属性集（保留原文，diff 时不参与几何比对但展示给 LLM 看） */
    unrecognized?: Record<string, string>;
}
export interface IRColor {
    /** 原始字面 hex/rgb（如 '#a03a2a' / 'rgba(0,0,0,.5)'）。可能为 'transparent'。 */
    literal: string;
    /**
     * 建议的 ctx.tokens 路径（如 'tokens.colors.primary'）。
     * null = 字面色未在 [LITERAL_TO_TOKEN] 字典中找到对应；写 variant 时需主题作者另行声明。
     */
    tokenSuggestion: string | null;
}
/**
 * 装饰锚点（IR 不递归装饰树，但显式记录"必须存在"的小尺寸几何元素 + 字符锚点）。
 *
 * 例：paper-slip 的"示·告"竖签条文字 / numbered-rule 的"NOTICE · N°01" 编号字串 /
 * filled-square 的 18×18 实心方块。这些是 visual-parity contains-check 的天然 anchor。
 */
export interface IRDecoration {
    /** 装饰类型 —— 帮助消费方按角色筛选。 */
    kind: 'text' | 'mini-box' | 'svg-shape' | 'rotated-mark' | 'rule-line';
    /** 装饰文字（kind='text' / 'rotated-mark' 必填）。 */
    text?: string;
    /** 几何（kind='mini-box' / 'svg-shape' 必填，至少含 width/height/background）。 */
    box?: IRBox;
    /** 旋转角度（kind='rotated-mark' 必填，如 '-3deg'）。 */
    rotate?: string;
    /** 取材的 selector 路径（debugging 用）。 */
    domPath?: string;
}
/**
 * 角色化的子盒。设计稿的 phone-inner 顶层 `<div>` = wrapper，wrapper 的直接子 `<div>` =
 * 各 slot。slot 的 `role` 由 IR 提取时的启发式打：根据 var-id label / 几何特征命名。
 *
 * - `leftCol` / `rightCol`：双栏布局的左右栏（paper-slip / hanging-nb 风格）
 * - `badge`：徽章/印章 / "N°04" 编号方格
 * - `kicker`：朱字 / 副标题 / "NOTICE · N°01" 等装饰头
 * - `body`：正文区
 * - `decoration`：纯装饰节点（刻度线集合等）
 * - `unknown`：启发式未命中——LLM 看到此值时按几何自行判断角色
 */
export type IRSlotRole = 'leftCol' | 'rightCol' | 'badge' | 'kicker' | 'body' | 'decoration' | 'unknown';
export interface IRSlot {
    role: IRSlotRole;
    box: IRBox;
    /** 装饰锚点（如徽章上的"N°04" + "告示"）。 */
    decorations: IRDecoration[];
    /**
     * slot 本身的叶子文字（slot div 内没有子 element、仅 textNode 时）。
     * paper-slip 的 leftCol "示·告" / vermilion-seal 的右上 "告" 字这类——是 visual-parity
     * 必须存在的视觉锚点。与 bodyText 区分：bodyText 是正文 placeholder（含示例段落），
     * slotText 是 ≤ 8 字的装饰短串。
     */
    slotText?: string;
    /** 角色为 body 时的正文 placeholder 文本（让 LLM 知道该区放什么字号的文字）。 */
    bodyText?: string;
}
/**
 * 一张 variant 的完整设计稿 IR。
 *
 * - source：可追溯回 content-*.html 的指针（出错时显示文件+行号）
 * - varIdLabel：原始人写标签（"02·B PAPER SLIP" 之类）
 * - variantId：推断后的 kebab id（"paper-slip"）—— 与 src/core/variants/{kind}/{id}.ts 对齐
 * - kind：markdown 容器 kind（"admonition" / "note" / "quote" / "pullQuote" / ...）
 * - containerName：markdown fence 名（"tip" / "note" / "quote-card" / "pull-quote"）
 * - designTheme + recommendedThemeId：设计稿主题 ↔ 实现主题对应
 * - wrapper / slots：核心几何
 * - rawHtml：phone-inner 内的原始 HTML（debug 用，~3KB/卡，索引文件不含）
 */
export interface DesignIR {
    source: {
        file: string;
        line: number;
        varIdLabel: string;
    };
    variantId: string;
    kind: string;
    containerName: string;
    designTheme: DesignTheme;
    recommendedThemeId: string;
    motif: string;
    wrapper: IRBox;
    slots: IRSlot[];
    /** wrapper 内的"通顶级"装饰（不属于任何 slot 的装饰节点，如 vermilion-seal 的角章） */
    topLevelDecorations: IRDecoration[];
    /** phone-inner 内的原始 HTML 字符串（仅 per-variant 文件含，index.json 不含）。 */
    rawHtml?: string;
}
/** IR 索引（写到 docs/generated/design-ir/index.json）—— 不含 rawHtml，便于检索。 */
export type DesignIRIndexEntry = Omit<DesignIR, 'rawHtml'>;
