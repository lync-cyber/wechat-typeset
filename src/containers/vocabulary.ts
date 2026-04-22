/**
 * Container Vocabulary —— 容器词汇表（权威单一真相来源）
 *
 * 这是 "Headless 组件契约 + 主题化渲染" 的契约层：
 *   - 主题无关：不含任何 CSS，不引用具体主题
 *   - 覆盖全集：枚举所有合法 `:::` markdown fence 名（覆盖 CONTAINER_REGISTRY 全部 24 个）
 *   - 派生数据：ThemeContainerStyles 类型、capabilities.json、运行时查询 API 都从这里派生
 *
 * 术语：
 *   - name        markdown fence 名（kebab-case；如 'quote-card' / 'section-title'）
 *   - styleKey    ThemeContainers 的 JS 字段名（camelCase；如 'quoteCard' / 'sectionTitle'）。
 *                 为 `null` 表示该容器**不参与 token 驱动 CSS**（如 free escape-hatch、pros/cons
 *                 嵌套子容器的样式由 compare 外层承担）。
 *   - variantKind 绑定到哪个 variant slot（无则该容器没有"骨架切换"能力，固定渲染）
 *   - category    作者心智分组：用于组件库 UI tab 与挑选建议
 *
 * 新增容器流程：
 *   1. 在本文件的 CONTAINER_VOCABULARY 末尾追加 ContainerSpec 条目
 *   2. 若 styleKey 非 null，同步在 themes/types.ts:ThemeContainers 里补字段
 *      + buildTheme.baseContainers() 里补默认值（可以是 `{}`）
 *   3. 在 pipeline/containers 里加 renderer，登记到 pipeline/containers/index.ts
 *   4. 若需要 signatureContainer 支持，只需补 SUPPORTED_SIGNATURE_CONTAINERS；
 *      fence 名映射由本文件末尾 STYLE_KEY_TO_CONTAINER_NAME 自动派生
 *
 * 本文件不 import renderer 实现，避免循环依赖 —— renderer 在独立层消费本词汇表。
 */

import type { VariantKind } from '../themes/types'

// ============================================================
// 类型定义
// ============================================================

/**
 * 作者心智分组。组件库 UI 按此分 tab；LLM 做"推荐容器"时也按此聚合。
 */
export type ContainerCategory =
  | 'structure' // 骨架：intro / cover / author / section-title
  | 'admonition' // 五态提示：tip / warning / info / danger / note
  | 'content' // 内容块：quote-card / highlight / compare / pros / cons / steps
  | 'navigation' // 导航/收束：divider / footer-cta / recommend
  | 'media' // 媒体：qrcode / mpvoice / mpvideo
  | 'signature' // 签名块：abstract / key-number / see-also
  | 'free' // 兜底 escape hatch：free

/**
 * open 行允许声明的 `key=value` attr。attrs 是**额外**语义，不是 variant 切换。
 *   - variant=xxx 是全容器共享的，不在这里声明。
 *   - 未声明的 attr 仍会被 parseInfo 收集，但没有契约保证 renderer 会消费。
 */
export interface AttrSpec {
  key: string
  description: string
  /** 示例值，用于 snippet 生成 */
  example?: string
  /** 若为枚举型，列出合法值 */
  enum?: readonly string[]
}

export interface ContainerSpec {
  /** markdown fence 名（kebab-case）—— 作者直接写 `::: {name}`. */
  name: string
  /**
   * ThemeContainers 的对应 JS 字段名（camelCase）。
   * `null` 表示该容器不参与 token-driven CSS（free / pros / cons）。
   */
  styleKey: string | null
  category: ContainerCategory
  /** 绑定的 variant slot；无 variantKind = 固定骨架，渲染器不读 theme.variants。 */
  variantKind?: VariantKind
  /** 是否可嵌套（pros/cons 嵌在 compare 内） */
  nestable?: boolean
  /** 允许的 key=value attr 声明（白名单，非强制） */
  attrs?: readonly AttrSpec[]
  /** 允许的子容器名（仅嵌套型使用；compare → pros/cons） */
  children?: readonly string[]
  /** 若本容器必须嵌在某父容器内，填父容器 name */
  parent?: string
  /** markdown-it-container fence 长度（compare 外层 4 个冒号，其他 3 个） */
  fenceLength: 3 | 4
  /** 一句话描述 —— 作者视角"这个容器是做什么的" */
  description: string
  /** 最小可用 markdown 示例（含起止 fence，自带末尾 \n） */
  example: string
}

// ============================================================
// 词汇表（权威单一真相来源）
// ============================================================

const VOCAB_ENTRIES: ContainerSpec[] = [
  // ── structure（4） ────────────────────────────────────────
  {
    name: 'intro',
    styleKey: 'intro',
    category: 'structure',
    fenceLength: 3,
    description: '文首引子／导语卡。独立 bgSoft 底，区别于正文段落。',
    example: '::: intro\n本文探讨 …\n:::\n',
  },
  {
    name: 'cover',
    styleKey: 'cover',
    category: 'structure',
    fenceLength: 3,
    attrs: [
      { key: 'issue', description: '期号（newsletter 主题会渲染期号戳）', example: '023' },
      { key: 'date', description: '日期', example: '2026-04-20' },
      { key: 'kind', description: '刊物类型', example: '周刊' },
    ],
    description: '封面卡（封面图 + 题头 + 可选期号戳）。',
    example: '::: cover\n![](cover.png)\n\n## 主标题\n:::\n',
  },
  {
    name: 'author',
    styleKey: 'author',
    category: 'structure',
    fenceLength: 3,
    attrs: [
      { key: 'issue', description: '期号（newsletter 主题可用）', example: '023' },
      { key: 'date', description: '日期', example: '2026-04-20' },
    ],
    description: '作者栏：头像 + 名字 + 日期／期号。',
    example: '::: author\n作者 · 日期\n:::\n',
  },
  {
    name: 'section-title',
    styleKey: 'sectionTitle',
    category: 'structure',
    variantKind: 'sectionTitle',
    fenceLength: 3,
    description: '章节标题块（比 ## 更强势的分节）。可切 bordered / cornered。',
    example: '::: section-title\n第一章 · 缘起\n:::\n',
  },

  // ── admonition（5） ───────────────────────────────────────
  {
    name: 'tip',
    styleKey: 'tip',
    category: 'admonition',
    variantKind: 'admonition',
    fenceLength: 3,
    attrs: [
      {
        key: 'variant',
        description: '覆盖主题默认的 admonition 骨架',
        enum: [
          'accent-bar',
          'pill-tag',
          'ticket-notch',
          'card-shadow',
          'minimal-underline',
          'terminal',
          'dashed-border',
          'double-border',
          'top-bottom-rule',
          'manpage-log',
          'sidenote-latex',
          'marginalia',
          'ledger-cell',
          'bubble-organic',
          'magazine-pull',
          'report-section',
        ],
      },
    ],
    description: 'tip：小贴士／正向提示。',
    example: '::: tip 小贴士\n内容 …\n:::\n',
  },
  {
    name: 'warning',
    styleKey: 'warning',
    category: 'admonition',
    variantKind: 'admonition',
    fenceLength: 3,
    description: 'warning：需要读者注意的提醒。',
    example: '::: warning 注意\n内容 …\n:::\n',
  },
  {
    name: 'info',
    styleKey: 'info',
    category: 'admonition',
    variantKind: 'admonition',
    fenceLength: 3,
    description: 'info：中性说明／补充信息。',
    example: '::: info 说明\n内容 …\n:::\n',
  },
  {
    name: 'danger',
    styleKey: 'danger',
    category: 'admonition',
    variantKind: 'admonition',
    fenceLength: 3,
    description: 'danger：高风险警告／错误示范。',
    example: '::: danger 警告\n内容 …\n:::\n',
  },
  {
    name: 'note',
    styleKey: 'note',
    category: 'admonition',
    fenceLength: 3,
    description: 'note：第五态补注（中性，不抢色，走 textMuted + noteIcon）。',
    example: '::: note 补注\n内容 …\n:::\n',
  },

  // ── content（6） ──────────────────────────────────────────
  {
    name: 'quote-card',
    styleKey: 'quoteCard',
    category: 'content',
    variantKind: 'quote',
    fenceLength: 3,
    description: '大段引用卡。可切 classic / magazine-dropcap / column-rule / frame-brackets。',
    example: '::: quote-card\n一段值得突出的引用 …\n:::\n',
  },
  {
    name: 'highlight',
    styleKey: 'highlight',
    category: 'content',
    fenceLength: 3,
    description: '高亮段落（bgMuted 底色块）。无 variant 切换。',
    example: '::: highlight\n需要读者停下来的一段话 …\n:::\n',
  },
  {
    name: 'compare',
    styleKey: 'compare',
    category: 'content',
    variantKind: 'compare',
    nestable: true,
    children: ['pros', 'cons'],
    fenceLength: 4,
    description: '双列对比（外层 4 个冒号，内层 pros/cons 用 3 个）。',
    example: ':::: compare\n::: pros 优点\n- A\n:::\n::: cons 缺点\n- B\n:::\n::::\n',
  },
  {
    name: 'pros',
    styleKey: null,
    category: 'content',
    parent: 'compare',
    fenceLength: 3,
    description: 'compare 的"正面"列（必须嵌在 :::: compare 内）。',
    example: '::: pros 优点\n- A\n- B\n:::\n',
  },
  {
    name: 'cons',
    styleKey: null,
    category: 'content',
    parent: 'compare',
    fenceLength: 3,
    description: 'compare 的"反面"列（必须嵌在 :::: compare 内）。',
    example: '::: cons 缺点\n- A\n- B\n:::\n',
  },
  {
    name: 'steps',
    styleKey: 'steps',
    category: 'content',
    variantKind: 'steps',
    fenceLength: 3,
    description: '编号步骤列表。可切 number-circle / ribbon-chain / timeline-dot。',
    example: '::: steps\n1. 初始化\n2. 构建\n3. 发布\n:::\n',
  },

  // ── navigation（3） ──────────────────────────────────────
  {
    name: 'divider',
    styleKey: null,
    category: 'navigation',
    variantKind: 'divider',
    fenceLength: 3,
    description: '装饰分隔线。可切 wave / dots / flower / rule / glyph。',
    example: '::: divider\n:::\n',
  },
  {
    name: 'footer-cta',
    styleKey: 'footerCTA',
    category: 'navigation',
    fenceLength: 3,
    attrs: [
      { key: 'cta', description: '按钮文字（visual only）', example: '点此关注' },
      {
        key: 'href',
        description:
          '按钮跳转 URL。为保证公众号正文可点击，建议用以下几类之一：' +
          'https://mp.weixin.qq.com/s/*（同域文章）/ weixin://dl/*（小程序协议）/ ' +
          'tel:* / mailto:* / 页内锚点 #*。非白名单 URL 会触发 diagnose warning。',
        example: 'https://mp.weixin.qq.com/s/xxx',
      },
    ],
    description: '文末 CTA 块（关注、投喂、二维码收束）。href 支持公众号内链白名单。',
    example:
      '::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx\n如果这篇对你有启发，欢迎关注。\n:::\n',
  },
  {
    name: 'recommend',
    styleKey: 'recommend',
    category: 'navigation',
    fenceLength: 3,
    description: '推荐阅读列表。',
    example: '::: recommend\n- [前作](url)\n- [续篇](url)\n:::\n',
  },

  // ── media（3） ───────────────────────────────────────────
  {
    name: 'qrcode',
    styleKey: 'qrcode',
    category: 'media',
    fenceLength: 3,
    description: '二维码块（图 + 说明文案）。',
    example: '::: qrcode\n![](qr.png)\n扫码关注\n:::\n',
  },
  {
    name: 'mpvoice',
    styleKey: 'mpvoice',
    category: 'media',
    fenceLength: 3,
    attrs: [
      { key: 'src', description: '音频 URL（公众号素材库链接）' },
      { key: 'title', description: '标题' },
    ],
    description: '公众号语音卡（占位，粘贴后在公众号编辑器补真 mpvoice 节点）。',
    example: '::: mpvoice title="片头曲" src="..."\n:::\n',
  },
  {
    name: 'mpvideo',
    styleKey: 'mpvideo',
    category: 'media',
    fenceLength: 3,
    attrs: [
      { key: 'src', description: '视频 URL（公众号素材库链接）' },
      { key: 'title', description: '标题' },
    ],
    description: '公众号视频卡（占位，粘贴后在公众号编辑器补真 mpvideo 节点）。',
    example: '::: mpvideo title="片段" src="..."\n:::\n',
  },

  // ── signature（3） ───────────────────────────────────────
  {
    name: 'abstract',
    styleKey: 'abstract',
    category: 'signature',
    fenceLength: 3,
    description: '文首 tl;dr 摘要块（business-finance / industry-observer 等深度主题）。',
    example: '::: abstract 摘要\n本文论点 …\n:::\n',
  },
  {
    name: 'key-number',
    styleKey: 'keyNumber',
    category: 'signature',
    fenceLength: 3,
    attrs: [
      { key: 'value', description: '大字号数字本体', example: '42%' },
    ],
    description: '大数字 + 说明（研究报告／内参版面）。attrs.value 为数字，info 为 kicker。',
    example: '::: key-number value="42%" 同比涨幅\n占全年营收 12pp …\n:::\n',
  },
  {
    name: 'see-also',
    styleKey: 'seeAlso',
    category: 'signature',
    fenceLength: 3,
    description: '相关阅读链接列表（academic-frontier / tech-explainer 的"扩展阅读"）。',
    example: '::: see-also 延伸阅读\n- [相关论文](url)\n:::\n',
  },

  // ── free（1） ────────────────────────────────────────────
  {
    name: 'free',
    styleKey: null,
    category: 'free',
    fenceLength: 3,
    description: '兜底容器：渲染器刻意不施加主题样式，写不归类内容。',
    example: '::: free\n编辑部补注 …\n:::\n',
  },
]

/** 单一真相来源：所有合法容器的权威词汇表（只读）。 */
export const CONTAINER_VOCABULARY: readonly ContainerSpec[] = Object.freeze(VOCAB_ENTRIES)

// ============================================================
// 派生常量 / 查找函数（本地轻量版；运行时 API 见 ./api.ts）
// ============================================================

const BY_NAME: ReadonlyMap<string, ContainerSpec> = new Map(
  CONTAINER_VOCABULARY.map((s) => [s.name, s]),
)

export function lookupContainerSpec(name: string): ContainerSpec | undefined {
  return BY_NAME.get(name)
}

/** 所有容器 markdown 名 fence 的 kebab 清单。 */
export const CONTAINER_NAMES: readonly string[] = CONTAINER_VOCABULARY.map((s) => s.name)

/** styleKey 非 null 的容器 list（用于 ThemeContainerStyles 类型派生与 themeCSS 迭代）。 */
export const STYLED_CONTAINERS: ReadonlyArray<ContainerSpec & { styleKey: string }> =
  CONTAINER_VOCABULARY.filter(
    (s): s is ContainerSpec & { styleKey: string } => s.styleKey !== null,
  )

/** 所有 styled 容器的 styleKey 清单（camelCase；ThemeContainers 的必备字段集）。 */
export const CONTAINER_STYLE_KEYS: readonly string[] = STYLED_CONTAINERS.map((s) => s.styleKey)

/** kebab → camel 映射（markdown fence → ThemeContainers 字段）。 */
export const CONTAINER_NAME_TO_STYLE_KEY: Readonly<Record<string, string>> = Object.fromEntries(
  STYLED_CONTAINERS.map((s) => [s.name, s.styleKey]),
)

/** camel → kebab 映射（兼容旧 SIGNATURE_CONTAINER_MARKDOWN_NAME）。 */
export const STYLE_KEY_TO_CONTAINER_NAME: Readonly<Record<string, string>> = Object.fromEntries(
  STYLED_CONTAINERS.map((s) => [s.styleKey, s.name]),
)
