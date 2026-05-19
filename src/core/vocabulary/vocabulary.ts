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
import { VARIANT_IDS } from '../themes/types'

// ============================================================
// 类型定义
// ============================================================

/**
 * 作者心智分组。组件库 UI 按此分 tab；LLM 做"推荐容器"时也按此聚合。
 */
export type ContainerCategory =
  | 'structure' // 骨架：intro / cover / author / section-title / author-bio / masthead / byline / editorial-header
  | 'admonition' // 五态提示：tip / warning / info / danger / note / announcement
  | 'content' // 内容块：quote-card / highlight / compare / pros / cons / steps / image-caption / timeline
  | 'navigation' // 导航/收束：divider / footer-cta / recommend / qrcode / qr-follow / cta-bar / toc
  | 'media' // 公众号原生媒体占位：voice-card / video-card（粘贴后由微信识别为 mpvoice / mpvideo）
  | 'signature' // 签名块：abstract / key-number / colophon / footnotes
  | 'data' // 数据可视化：kpi-dashboard / kpi-item / bar-chart / bar
  | 'free' // 兜底 escape hatch：free

/**
 * 契约扩展包 namespace（三层）：
 *   - `'base'`              基础契约，所有主题渲染（核心通用组件）
 *   - `pack:<domain>`       领域扩展包，多主题可借用（如 `pack:editorial` 刊物出版）
 *   - `theme:<themeId>`     主题专属扩展，只有该主题渲染时启用（如 `theme:data-brief`）
 *
 * 同一容器只能属于一个 namespace。pack 是契约文档分组手段，也是 capabilities.json
 * 与 build-writer-docs 的派生输入；理论上`theme:` 容器在其他主题中渲染会回退到 free 兜底。
 *
 * 新增 namespace 流程：
 *   1. 直接给容器 spec 写 `pack: 'pack:<domain>'` 或 `pack: 'theme:<id>'`（无须改 union）
 *   2. 在 scripts/build-writer-docs.ts:PACK_TARGETS 追加文档目标
 *   3. 在目标文档里放置 `<!-- generated:container-quick-ref:<pack>:start/end -->` 标记对
 */
export type ContainerPack = 'base' | `pack:${string}` | `theme:${string}`

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
  /**
   * 所属契约扩展包。缺省（未声明）= 'base'。
   * 设计为可选：base 容器**不需要**显式标注 pack，减少日常新增 base 容器的样板；
   * 仅扩展包（如 'data-brief'）成员需要主动声明。
   */
  pack?: ContainerPack
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
  /**
   * 叙述强度梯度（1 ≤ x ≤ 5）。docs/wechat-typeset-container/persona-contracts.md
   * 规则 1 / 4 / 5 派生:LLM 写作时选容器按强度从弱到强递进。
   *   1 = highlight（段内关键短句）
   *   2 = note（中性补注）
   *   3 = admonition 四态 (tip/warning/info/danger) / abstract（提请注意、文首总览）
   *   4 = quote-card / announcement（独立块，整版级强调）
   *   5 = pull-quote / key-number（视觉重心，独占段位）
   * 未声明 = 该容器不在叙述强度梯度内（结构 / 索引 / 元数据类容器）。
   */
  narrativeStrength?: 1 | 2 | 3 | 4 | 5
  /** 一句话描述 —— 作者视角"这个容器是做什么的" */
  description: string
  /** 最小可用 markdown 示例（含起止 fence，自带末尾 \n） */
  example: string
}

// ============================================================
// 词汇表（权威单一真相来源）
// ============================================================

const VOCAB_ENTRIES: ContainerSpec[] = [
  // ── structure（4 + 4 data-brief 家族） ───────────────────
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
    description:
      '作者栏：单行署名块（名字 + 日期/期号）。与 author-bio 的边界见 author-bio.description。',
    example: '::: author\n作者 · 日期\n:::\n',
  },
  {
    // author-bio：与 author 的边界：
    //   - author：文首/文末"署名行"，单行紧凑（名字 · 日期 · 期号）
    //   - author-bio：多行作者简介卡（头像 attr + 多行 body 介绍 + 可选社交链接），独立块
    name: 'author-bio',
    styleKey: 'authorBio',
    category: 'structure',
    fenceLength: 3,
    attrs: [
      { key: 'avatar', description: '头像图片 URL（声明则 renderer 自动渲染圆形头像）' },
      { key: 'name', description: '作者姓名（缺省则取 info）' },
      { key: 'role', description: '作者身份（如"专栏作者 · 城市观察"）' },
    ],
    description:
      '多行作者简介卡：头像 + 名字 + 身份 + 多行简介。与 author 的边界：' +
      'author 单行署名，author-bio 是独立块（头像 + 多行 bio + 社交链接），通常用在文末"关于作者"。',
    example:
      '::: author-bio avatar="me.png" name="顾留白" role="专栏作者"\n非虚构写作 8 年，关注城市与日常。\n:::\n',
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
  {
    name: 'masthead',
    styleKey: 'masthead',
    category: 'structure',
    pack: 'pack:editorial',
    fenceLength: 3,
    attrs: [
      { key: 'issue', description: '期号（monospace 右对齐；默认两栏布局生效）', example: '004' },
      { key: 'date', description: '日期（monospace 右对齐）', example: '2026.04.22' },
      {
        key: 'kicker',
        description:
          '左侧前缀（如 "第 04 期"）。提供时切换为三栏 ribbon 布局：' +
          '左=kicker / 中=name（accent 色） / 右=date —— 报刊期次条骨架。',
        example: '第 04 期',
      },
    ],
    description:
      '刊头：默认两栏（刊名左 + 期号·日期 monospace 右）；声明 attrs.kicker 切三栏 ribbon。',
    example: '::: masthead 慢读简报 issue="004" date="2026.04.22"\n:::\n',
  },
  {
    name: 'section-tag',
    styleKey: 'sectionTag',
    category: 'structure',
    pack: 'pack:editorial',
    fenceLength: 3,
    description: '小栏目标签（黑底白字胶囊小字，info 为标签文字，如 "深度"）。body 内容会被忽略。',
    example: '::: section-tag 深度\n:::\n',
  },
  {
    name: 'byline',
    styleKey: 'byline',
    category: 'structure',
    pack: 'pack:editorial',
    fenceLength: 3,
    attrs: [
      {
        key: 'cells',
        description:
          '三栏（或更多）署名单元，竖线 `|` 分隔；每格 `kicker:value` 用半角冒号分隔。' +
          '例：`AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026`。' +
          '为零时回退到旧 author 形态（info 作 name + role/issue attrs），但 byline 建议总是声明 cells。',
        example: 'AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026',
      },
      {
        key: 'monospaceLast',
        description: '末格 value 是否走 monospace 字体（typically "SET" 期次或日期）。',
        enum: ['true', 'false'],
      },
    ],
    description:
      '署名条：N 栏分隔（kicker 小字 / value 主视），data-brief 家族签名。' +
      '与 author 容器正交：author 是"作者名 + role"两段签名块；byline 是"AUTHOR / EDITOR / SET" 多栏 newspaper 形态。',
    example:
      '::: byline cells="AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026" monospaceLast="true"\n:::\n',
  },
  {
    name: 'editorial-header',
    styleKey: 'editorialHeader',
    category: 'structure',
    pack: 'pack:editorial',
    fenceLength: 3,
    attrs: [
      {
        key: 'chip',
        description: '装饰小红章文字（如 "ESSAY · 01"）。声明则在大标题上方渲染 primary 实色徽章 + hairline。',
        example: 'ESSAY · 01',
      },
      {
        key: 'pp',
        description: '右上页码区间（monospace 小字，与 chip 同一行 hairline 居中对齐）。',
        example: 'PP.04–19',
      },
      {
        key: 'subtitle',
        description: '主标题下方副标题（13px 中粗黑字，无字距）。',
        example: '论慢读在算法时代的价值',
      },
      {
        key: 'topRule',
        description: '顶部装饰色条宽度（px 整数，0=不渲染）。Swiss 苏黎世副刊头惯用 6。',
        example: '6',
      },
      {
        key: 'titleDot',
        description: '主标题末色实心点（PaletteColorKey）。声明则在 info 末尾追加一个该色 "."。',
        enum: ['primary', 'accent', 'secondary'],
      },
      {
        key: 'br',
        description:
          '在 info 中作为换行分隔符的字符串（默认 " / "，前后各一空格）。让作者用一行 info 表达多行大标题：' +
          '`info="在无人深夜， / 重新学习 / 如何阅读一本书"`',
        example: ' / ',
      },
    ],
    description:
      '装饰性副刊头：跨栏大字标题 + 可选 chip 红章 + PP 页码 + subtitle + titleDot 红点。' +
      '与微信原生标题（H1）正交，本容器输出 <section>，不抢平台 H1 语义。data-brief 家族签名。',
    example:
      '::: editorial-header 在无人深夜， / 重新学习 / 如何阅读一本书 chip="ESSAY · 01" pp="PP.04–19" subtitle="论慢读在算法时代的价值" topRule="6" titleDot="primary"\n:::\n',
  },
  {
    name: 'toc',
    styleKey: 'toc',
    category: 'navigation',
    pack: 'pack:editorial',
    fenceLength: 4,
    children: ['toc-item'],
    attrs: [
      {
        key: 'layout',
        description:
          '布局模式：default = 单列（kicker 顶 + items 下）；split = 双栏（左 kicker+meta / 右 toc-items）。' +
          'Swiss 苏黎世双栏对开页用 split + meta 描述栏位比例。',
        enum: ['default', 'split'],
      },
      {
        key: 'meta',
        description:
          'split 布局时左列副说明（如 "目次排布采用12栏 / 1/3 : 2/3 比例"）。多行用 ` / ` 分隔。default 布局忽略。',
        example: '目次排布采用12栏 / 1/3 : 2/3 比例',
      },
    ],
    description:
      '目录：默认单列（kicker 顶 + items 下）；声明 layout=split 切到双栏（左 INDEX kicker + meta 描述 / 右 toc-items）。外层用 4 个冒号，内部用 toc-item 列条目。info 为 kicker。',
    example:
      ':::: toc 目录 · CONTENTS\n::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心\n:::\n::::\n',
  },
  {
    name: 'toc-item',
    styleKey: null,
    category: 'navigation',
    pack: 'pack:editorial',
    parent: 'toc',
    fenceLength: 3,
    attrs: [
      { key: 'no', description: '序号（monospace 主色）', example: '01' },
      { key: 'page', description: '页码（monospace 灰）', example: 'p.04' },
    ],
    description: 'toc 内单条；info 为条目标题。body 内容会被忽略。',
    example: '::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心\n:::\n',
  },

  // ── admonition（6） ───────────────────────────────────────
  {
    // announcement：通用全宽强警示横幅。与 tip/warning 的边界：
    //   - tip/warning 是段落级（多见于正文内"穿插提示"）
    //   - announcement 是文章级"置顶通告"（活动告知 / 紧急公告 / 改版说明），视觉强度更高
    // tone 与 variant 正交：tone 控色（danger/primary/accent），variant 控骨架（4 种语言）。
    name: 'announcement',
    styleKey: 'announcement',
    category: 'admonition',
    variantKind: 'announcement',
    fenceLength: 3,
    attrs: [
      {
        key: 'tone',
        description: '语义色调（默认 danger 强警示；可选 primary 中性告知 / accent 喜庆通告）',
        enum: ['danger', 'primary', 'accent'],
      },
      {
        key: 'variant',
        description:
          '覆盖主题默认的 announcement 骨架。danger-bar（默认）= 左色条 + soft 底；' +
          'mono-disclaimer = 法律声明监 monospace 边框无填充；' +
          'ai-notice = AI 生成内容合规告知（含徽章）；' +
          'stamped-banner = 右侧 SVG 印章戳。',
        enum: VARIANT_IDS.announcement,
      },
    ],
    description:
      '强警示横幅：文章顶部 / 中部"置顶通告"块，比 tip/warning 视觉强度更高。' +
      'info 为标题，body 为说明文本。4 种 variant 覆盖：常规警示 / 法律免责 / AI 合规 / 印章公告。',
    example: '::: announcement tone=danger 重要通知\n本期推送涉及账号迁移说明 …\n:::\n',
    narrativeStrength: 4,
  },
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
        enum: VARIANT_IDS.admonition,
      },
    ],
    description: 'tip：小贴士／正向提示。',
    example: '::: tip 小贴士\n内容 …\n:::\n',
    narrativeStrength: 3,
  },
  {
    name: 'warning',
    styleKey: 'warning',
    category: 'admonition',
    variantKind: 'admonition',
    fenceLength: 3,
    description: 'warning：需要读者注意的提醒。',
    example: '::: warning 注意\n内容 …\n:::\n',
    narrativeStrength: 3,
  },
  {
    name: 'info',
    styleKey: 'info',
    category: 'admonition',
    variantKind: 'admonition',
    fenceLength: 3,
    description: 'info：中性说明／补充信息。',
    example: '::: info 说明\n内容 …\n:::\n',
    narrativeStrength: 3,
  },
  {
    name: 'danger',
    styleKey: 'danger',
    category: 'admonition',
    variantKind: 'admonition',
    fenceLength: 3,
    description: 'danger：高风险警告／错误示范。',
    example: '::: danger 警告\n内容 …\n:::\n',
    narrativeStrength: 3,
  },
  {
    name: 'note',
    styleKey: 'note',
    category: 'admonition',
    variantKind: 'note',
    fenceLength: 3,
    attrs: [
      {
        key: 'variant',
        description:
          '覆盖主题默认的 note 骨架。8 个 variant 覆盖三档语气：' +
          '中性（minimal-callout / box-callout / side-bar / hanging-indent / dotted-margin / smallcaps-kicker）；' +
          '编辑部按（editorial-stripe，主色左条 + bgSoft）；' +
          '调研口径（research-dense，10px 紧凑 + bold label）。',
        enum: VARIANT_IDS.note,
      },
    ],
    description:
      'note：作者旁批 + 编辑部按 + 调研口径的统一容器。' +
      'variant 切换语气主体：默认中性（textMuted 不抢色）；editorial-stripe 切到"编辑部以机构身份按语"；' +
      'research-dense 切到"调研方法论小字栏"。',
    example: '::: note 补注\n内容 …\n:::\n',
    narrativeStrength: 2,
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
    narrativeStrength: 4,
  },
  {
    name: 'highlight',
    styleKey: 'highlight',
    category: 'content',
    variantKind: 'highlight',
    fenceLength: 3,
    description:
      '行内高亮段（bgMuted 底色块）。与 quote-card 的边界：' +
      'quote-card 是"成段引用"（外部话语、有 variant 骨架），highlight 是"作者自己想强调的一段话"。' +
      '想强调一句"我要让读者停下来"用 highlight；想引用一段他人话用 quote-card。',
    example: '::: highlight\n需要读者停下来的一段话 …\n:::\n',
    narrativeStrength: 1,
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
  {
    // image-caption：图 + 居中小字灰说明的固定排版。body 是图片 + caption，
    // renderer 把首段当 caption 行渲成 textMuted 小字（不要再用 free 凑）。
    name: 'image-caption',
    styleKey: 'imageCaption',
    category: 'content',
    fenceLength: 3,
    attrs: [
      { key: 'src', description: '图片 URL（声明则 renderer 自动渲染 <img>）' },
      { key: 'alt', description: '图片替代文本' },
    ],
    description:
      '图 + 居中小字灰说明的图注块。声明 attrs.src 时自动渲染 img；info 为图注文本。' +
      'body 内容（如长描述 / 数据来源）作为副说明跟在 caption 下方。',
    example:
      '::: image-caption src="cover.png" alt="封面" 图 1 · 城市夜景与霓虹\n摄于 2026 年春，北京三里屯。\n:::\n',
  },
  {
    // timeline：年份 + 事件的时序列表。与 steps 的边界：
    //   - steps：动作序列（"先 A 后 B 再 C"，强调可执行）
    //   - timeline：历史时序（"1979 / 2003 / 2024"，强调时间维度）
    name: 'timeline',
    styleKey: 'timeline',
    category: 'content',
    nestable: true,
    children: ['timeline-item'],
    fenceLength: 4,
    description: '时间线：左侧年份 + 右侧事件。外层 4 个冒号，内部 timeline-item 列条目。',
    example:
      ':::: timeline 项目里程碑\n::: timeline-item year="2024" 项目立项\n方案确认，团队组建。\n:::\n::: timeline-item year="2025" 公测上线\n首批用户邀请制开放。\n:::\n::::\n',
  },
  {
    name: 'timeline-item',
    styleKey: null,
    category: 'content',
    parent: 'timeline',
    fenceLength: 3,
    attrs: [
      { key: 'year', description: '左侧年份 / 日期标签（monospace）', example: '2024' },
    ],
    description: 'timeline 内单条；info 为事件标题，body 为详述。',
    example: '::: timeline-item year="2024" 项目立项\n方案确认，团队组建。\n:::\n',
  },
  {
    name: 'qa-block',
    styleKey: 'qaBlock',
    category: 'content',
    pack: 'pack:editorial',
    variantKind: 'qaBlock',
    fenceLength: 3,
    attrs: [
      {
        key: 'q',
        description: '问题文本（visual: 主色 Q 方块头像 + 单行）',
        example: '数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？',
      },
      {
        key: 'variant',
        description:
          '覆盖主题默认 qa-block 骨架。numbered-faq（默认）= Q.NN 序号 + 底线分隔；' +
          'hanging-qa = 大号斜体 Q./A. 悬挂；seal-stamp = 问/答 朱印徽章；' +
          'query-annotation = 設・問 夹线 + 註 hanging；sample-query = QUERY/FINDING 双栏；' +
          'field-card = 田野卡片外框；circle-square = 圆方代号；typed-block = 反白上下分栏。',
        enum: VARIANT_IDS.qaBlock,
      },
    ],
    description:
      '读者问答：attrs.q 为问题，body 为回答（支持 markdown）。info 为 kicker（如 "读者问答 · Q&A"）。',
    example:
      '::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"\n有。数据衡量的是习惯而非能力，从睡前 15 分钟开始即可。\n:::\n',
  },

  // ── navigation（3） ──────────────────────────────────────
  {
    // divider 是"styleKey=null + variantKind 非空"的唯一一对组合：
    // variant 模块直接产出完整 HTML（含 SVG / line），没有 wrapper CSS 槽位需要 themeCSS 注入。
    // 因此不进 ThemeContainers 字段集，仅按 variantKind 分派。
    name: 'divider',
    styleKey: null,
    category: 'navigation',
    variantKind: 'divider',
    fenceLength: 3,
    description: '装饰分隔线。可切 wave / dots / flower / rule / glyph / seal-mark。',
    example: '::: divider\n:::\n',
  },
  {
    name: 'footer-cta',
    styleKey: 'footerCTA',
    category: 'navigation',
    variantKind: 'footerCTA',
    fenceLength: 3,
    attrs: [
      {
        key: 'variant',
        description:
          '覆盖主题默认的 footerCTA 骨架。button-led（默认）= 居中标题 + 主色胶囊按钮；' +
          'triptych-actions = 三栏 CTA（赞同 / 收藏 / 转发，display:table 等宽）。',
        enum: VARIANT_IDS.footerCTA,
      },
      { key: 'cta', description: 'button-led 按钮文字（visual only）', example: '点此关注' },
      {
        key: 'href',
        description:
          'button-led 按钮跳转 URL。为保证公众号正文可点击，建议用以下几类之一：' +
          'https://mp.weixin.qq.com/s/*（同域文章）/ weixin://dl/*（小程序协议）/ ' +
          'tel:* / mailto:* / 页内锚点 #*。非白名单 URL 会触发 diagnose warning。',
        example: 'https://mp.weixin.qq.com/s/xxx',
      },
      { key: 'like', description: 'triptych-actions 左格文字（默认 ♡ 赞同）', example: '♡ 赞同' },
      { key: 'star', description: 'triptych-actions 中格文字（实色，默认 ★ 收藏）', example: '★ 收藏' },
      { key: 'share', description: 'triptych-actions 右格文字（默认 ↗ 转发）', example: '↗ 转发' },
    ],
    description:
      '文末 CTA 块。两态骨架：button-led（默认）= 单按钮 + 引导文案（关注、投喂、阅读原篇）；' +
      'triptych-actions = 三栏赞同 / 收藏 / 转发并列动作集（data-brief 家族签名）。' +
      'href 支持公众号内链白名单。',
    example:
      '::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx\n如果这篇对你有启发，欢迎关注。\n:::\n',
  },
  {
    name: 'recommend',
    styleKey: 'recommend',
    category: 'navigation',
    variantKind: 'recommend',
    fenceLength: 3,
    attrs: [
      {
        key: 'variant',
        description:
          '覆盖主题默认的 recommend 骨架。card-list（默认）= 粗体大标题 + bullet 链接列表，面向"延伸阅读"；' +
          'academic-refs = uppercase letter-spaced 小字 kicker + textMuted 列表，面向论证"参考引用"。',
        enum: VARIANT_IDS.recommend,
      },
    ],
    description:
      '推荐阅读链接列表。两态骨架：card-list 走"读者面延伸阅读"（同一作者的其他文章、关联推送）；' +
      'academic-refs 走"学术参考引用"（论文 / 原始数据 / 二次研究，更克制 uppercase 小字）。',
    example: '::: recommend\n- [前作](url)\n- [续篇](url)\n:::\n',
  },

  // ── media（3） ───────────────────────────────────────────
  {
    name: 'qrcode',
    styleKey: 'qrcode',
    category: 'navigation',
    variantKind: 'qrcode',
    fenceLength: 3,
    attrs: [
      {
        key: 'variant',
        description:
          '覆盖主题默认的 qrcode 骨架。bare（默认）= 居中 QR + 下方 caption（任意 QR 场景）；' +
          'follow-card = 左 QR + 右 kicker/title/desc 三行（刊物订阅卡）。',
        enum: VARIANT_IDS.qrcode,
      },
      {
        key: 'text',
        description:
          '内置 QR 编码器的目标文本（URL / 任意字符串）。提供时容器内联生成 SVG，' +
          '主色 fg 取主题 text，bg 取主题 bg；不提供则正文图片或说明文字作为占位。',
        example: 'https://mp.weixin.qq.com/s/xxx',
      },
      {
        key: 'ecc',
        description: '纠错等级（L/M/Q/H）。默认 M（约 15% 容错；扫码可靠性与码大小折中）',
        enum: ['L', 'M', 'Q', 'H'],
      },
      {
        key: 'size',
        description: 'SVG 像素尺寸（width=height）。未提供则按 viewBox + CSS 缩放。',
        example: '160',
      },
      {
        key: 'kicker',
        description: 'follow-card 右上角 kicker 文字（缺省走 ctx.kickers.qrFollowKicker）',
        example: 'SUBSCRIBE',
      },
      {
        key: 'desc',
        description: 'follow-card 右下角描述文字（小字 textMuted）',
        example: '每周四，一封邮件，一组数据',
      },
      {
        key: 'qr',
        description: 'follow-card 模式下，外链 QR 图 URL（与 attrs.text 互斥；都没有走占位 SVG）',
        example: 'https://…/qr.png',
      },
    ],
    description:
      '二维码块。两态骨架：bare（默认）= 居中 QR + caption，"任意场景的 QR"（赞赏码 / 活动链接 / 小程序）；' +
      'follow-card = 左 QR + 右 kicker/title/desc 三行刊物订阅卡。' +
      '带 text= 时内置 QR 编码生成 SVG，无需外链 / 外部生成。',
    example: '::: qrcode text="https://mp.weixin.qq.com/s/xxx"\n扫码关注\n:::\n',
  },
  {
    // 作者面 fence 名走语义命名（voice-card），平台粘贴契约（<!--mpvoice--> HTML 注释、
    // data-wx-mp-kind="voice" 锚点）仍走微信原生标识，由 infra/clipboard/mpInsertHints 注入。
    // 兼容期：旧 ::: mpvoice 仍可识别（见 vocabulary 末尾的 LEGACY_CONTAINER_ALIASES）。
    name: 'voice-card',
    styleKey: 'voiceCard',
    category: 'media',
    fenceLength: 3,
    attrs: [
      { key: 'src', description: '音频 URL（公众号素材库链接）' },
      { key: 'title', description: '标题' },
      { key: 'voice_encode_fileid', description: '微信音频 fileid（粘贴后自动展开）' },
    ],
    description: '公众号语音占位卡（粘贴后由微信识别为真 mpvoice 节点）。',
    example: '::: voice-card title="片头曲" src="..."\n:::\n',
  },
  {
    name: 'video-card',
    styleKey: 'videoCard',
    category: 'media',
    fenceLength: 3,
    attrs: [
      { key: 'src', description: '视频 URL（公众号素材库链接）' },
      { key: 'title', description: '标题' },
      { key: 'qqvid', description: '腾讯视频 vid（提供时渲染 v.qq.com iframe）' },
    ],
    description: '公众号视频占位卡（带 qqvid 时直出 v.qq.com iframe；其余为占位）。',
    example: '::: video-card title="片段" qqvid="..."\n:::\n',
  },

  // ── signature（3） ───────────────────────────────────────
  {
    name: 'abstract',
    styleKey: 'abstract',
    category: 'signature',
    fenceLength: 3,
    description: '文首 tl;dr 摘要块（business-finance / industry-observer 等深度主题）。',
    example: '::: abstract 摘要\n本文论点 …\n:::\n',
    narrativeStrength: 3,
  },
  {
    name: 'key-number',
    styleKey: 'keyNumber',
    category: 'signature',
    fenceLength: 3,
    attrs: [
      { key: 'value', description: '大字号数字本体', example: '42%' },
      {
        key: 'meta',
        description:
          '右侧 monospace 元信息浮动列（如 "VOL.IV / 2026—04—22 / CHF 14.—"）。' +
          '声明则切到"双栏"布局：左 kicker+value 占主视，右 meta 多行底对齐。条目用 ` / ` 分隔。',
        example: 'VOL.IV / 2026—04—22 / CHF 14.—',
      },
    ],
    description:
      '大数字 + 说明（研究报告 / 内参版面 / issue-banner）。' +
      'attrs.value 为数字，info 为 kicker；声明 attrs.meta 切到双栏布局（issue-banner 模式）。',
    example: '::: key-number value="42%" 同比涨幅\n占全年营收 12pp …\n:::\n',
    narrativeStrength: 5,
  },
  {
    name: 'kpi-dashboard',
    styleKey: 'kpiDashboard',
    category: 'data',
    pack: 'pack:data-viz',
    fenceLength: 4,
    children: ['kpi-item'],
    attrs: [
      { key: 'period', description: '统计区间/口径', example: '2024 / YoY' },
      { key: 'source', description: '数据来源（页脚 monospace 小字）', example: 'n=1,432' },
    ],
    description:
      'KPI 仪表盘：三指标 grid + sparkline。外层用 4 个冒号，内部用 kpi-item。info 为标题（如 "KEY METRICS · 三项关键指标"）。',
    example:
      ':::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"\n::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11" foot="\'15 38分 → \'24 12分"\n:::\n::::\n',
  },
  {
    name: 'kpi-item',
    styleKey: null,
    category: 'data',
    pack: 'pack:data-viz',
    parent: 'kpi-dashboard',
    fenceLength: 3,
    attrs: [
      { key: 'label', description: '指标编号/口径（monospace）', example: '01 · MIN/DAY' },
      { key: 'caption', description: '指标中文说明', example: '日均连读时长' },
      { key: 'value', description: '数字本体（大字号）', example: '12' },
      { key: 'unit', description: '单位（如 分钟 / 次 / 本）', example: '分钟' },
      { key: 'delta', description: '同比标签（前缀决定颜色，- 红 + 红 ± 灰）', example: '-68%' },
      { key: 'trend', description: 'sparkline 颜色方向', enum: ['up', 'down', 'flat'] },
      {
        key: 'series',
        description: 'sparkline 折线数据（逗号分隔任意数值，按 min/max 自动缩放）',
        example: '48,51,54,56,58,59,60,61',
      },
      { key: 'foot', description: '期端对比小字（monospace 双端）', example: "'15 38分 → '24 12分" },
    ],
    description: 'kpi-dashboard 内单指标。一切以 attrs 驱动，body 内容被忽略。',
    example:
      '::: kpi-item label="01·MIN/DAY" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11"\n:::\n',
  },
  {
    name: 'bar-chart',
    styleKey: 'barChart',
    category: 'data',
    pack: 'pack:data-viz',
    fenceLength: 4,
    children: ['bar'],
    attrs: [
      { key: 'subtitle', description: '副标题（单位/样本说明）', example: '单位：分钟 · n=1,024' },
      {
        key: 'labelWidth',
        description: '标签列宽（CSS 长度，默认 72px / 容下 5 字中文）',
        example: '96px',
      },
      {
        key: 'valueWidth',
        description: '数值列宽（CSS 长度，默认 48px / 容下 "9 分钟"）',
        example: '64px',
      },
    ],
    description:
      '横向条形图（纯 div 宽度，无 SVG）。外层用 4 个冒号，内部用 bar 条目。info 为图表标题。',
    example:
      ':::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟"\n::: bar label="60+" pct="84" value="42 分"\n:::\n::::\n',
  },
  {
    name: 'bar',
    styleKey: null,
    category: 'data',
    pack: 'pack:data-viz',
    parent: 'bar-chart',
    fenceLength: 3,
    attrs: [
      { key: 'label', description: '类目标签', example: '60+' },
      { key: 'pct', description: '柱宽百分比（0–100 整数）', example: '84' },
      { key: 'value', description: '数值显示（右对齐）', example: '42 分' },
      { key: 'tone', description: '色调；warn 转 danger 红', enum: ['normal', 'warn'] },
      {
        key: 'labelWidth',
        description: '标签列宽（per-bar 覆盖父 bar-chart；做对齐微调）',
        example: '96px',
      },
      {
        key: 'valueWidth',
        description: '数值列宽（per-bar 覆盖父 bar-chart；做对齐微调）',
        example: '64px',
      },
    ],
    description: 'bar-chart 内单条；attrs.label/pct/value 必填，tone 决定柱色（normal 走主色）。',
    example: '::: bar label="60+" pct="84" value="42 分"\n:::\n',
  },
  {
    name: 'footnotes',
    styleKey: 'footnotes',
    category: 'signature',
    pack: 'pack:editorial',
    variantKind: 'footnotes',
    fenceLength: 3,
    attrs: [
      {
        key: 'variant',
        description: '覆盖主题默认的 footnotes 骨架（lined = 一条一行；inline-flow = 同段流式）',
        enum: VARIANT_IDS.footnotes,
      },
    ],
    description:
      '脚注 / 参考文献块。两骨架可选：' +
      'lined（默认，一条一行 + hanging indent）适合 5~10 条短引用；' +
      'inline-flow（同段流式排列 + 内滚动）适合 20+ 条长文献列表，作者用 `·` / `／` 分隔条目。' +
      'info 非空时渲染主色 kicker（如 "NOTES" / "参考文献"），与 editor-note / qa-block 同源。',
    example: '::: footnotes\n[1] 数据覆盖 2010–2025。\n[2] 深度理解得分取自 24h 回忆测试。\n:::\n',
  },
  {
    name: 'colophon',
    styleKey: 'colophon',
    category: 'signature',
    pack: 'pack:editorial',
    fenceLength: 3,
    attrs: [
      { key: 'next', description: '左栏：下期预告标题', example: '纸本之必要：论书脊与手指的记忆' },
      { key: 'issue', description: '右栏：期号 / 卷期说明', example: '第 004 期 · 2026' },
    ],
    description:
      '刊物收束栏：上分割线 + 左右双栏 monospace 元数据（下期预告 / 卷·期）。data-brief 等刊物化主题的"尾签名"。',
    example: '::: colophon next="纸本之必要" issue="第 004 期 · 2026"\n:::\n',
  },

  // ── 拉引 / 横幅 / 表格 / 多图 / 对话 ───────────────────
  {
    // pull-quote 与 quote-card / highlight 的边界：
    //   - quote-card  外部话语成段引用（attrs.byline 标外部来源）
    //   - highlight   作者自我强调整段（bgMuted 无骨架）
    //   - pull-quote  作者中段把已写过的句子放大重申（与原文同源）
    name: 'pull-quote',
    styleKey: 'pullQuote',
    category: 'content',
    pack: 'pack:editorial',
    variantKind: 'pullQuote',
    fenceLength: 3,
    attrs: [
      {
        key: 'variant',
        description:
          '覆盖主题默认的 pull-quote 骨架。giant-mark（默认）= 装饰巨号引号；' +
          'centered-rule = 上下细线居中夹；stamp-quote = 右侧印章 + 大字；' +
          'margin-pull = 左悬挂 monospace kicker + 大字。',
        enum: VARIANT_IDS.pullQuote,
      },
    ],
    description:
      '拉引：正文中段把作者已写过的句子放大重申。info 为引用文字，body 可选为署名 / 上下文。' +
      '与 quote-card 正交（quote-card 是引用他人外部话语）。',
    example: '::: pull-quote\n我们以为在阅读，其实只是在滑动。\n:::\n',
    narrativeStrength: 5,
  },

  {
    name: 'table-card',
    styleKey: 'tableCard',
    category: 'content',
    variantKind: 'tableCard',
    nestable: true,
    children: ['table-row'],
    fenceLength: 4,
    attrs: [
      {
        key: 'variant',
        description:
          '骨架：rule-grid（默认 1px 全网格）/ zebra-rows（斑马底）/ ' +
          'key-value（双栏 KV）/ price-tier（价格档位卡）',
        enum: VARIANT_IDS.tableCard,
      },
    ],
    description:
      '结构化表格：弥补 markdown 原生 table 在公众号字号小 / 列宽不可控的缺陷。' +
      '外层 4 冒号，内部 table-row 列条目。与 compare 正交（compare 限 2 列 pros/cons）。',
    example:
      ':::: table-card 规格对比\n::: table-row header=true cells="型号 | 容量 | 价格"\n:::\n::: table-row cells="A · 256G · ￥6999"\n:::\n::::\n',
  },
  {
    name: 'table-row',
    styleKey: null,
    category: 'content',
    parent: 'table-card',
    fenceLength: 3,
    attrs: [
      {
        key: 'cells',
        description:
          '本行单元格内容，竖线 `|` 分隔；列数由首行决定，后续行多余列被忽略 / 缺失列留空。' +
          '示例：`cells="型号 | 容量 | 价格"`',
        example: '型号 | 容量 | 价格',
      },
      {
        key: 'header',
        description: '是否为表头行（粗体 + 顶部 hairline + monospace label）',
        enum: ['true', 'false'],
      },
    ],
    description: 'table-card 内单行。attrs.cells 必填，body 内容被忽略。',
    example: '::: table-row header=true cells="型号 | 容量 | 价格"\n:::\n',
  },

  {
    name: 'gallery',
    styleKey: 'gallery',
    category: 'content',
    variantKind: 'gallery',
    nestable: true,
    children: ['image-item'],
    fenceLength: 4,
    attrs: [
      {
        key: 'variant',
        description:
          '布局：duo（默认 2 联）/ triptych（3 联）/ nine-grid（3×3 自动换行）/ ' +
          'ribbon-strip（横滚条带 overflow-x:auto）',
        enum: VARIANT_IDS.gallery,
      },
    ],
    description:
      '多图组合：弥补 image-caption 只能单图、markdown 多图串联无版式的缺陷。' +
      '外层 4 冒号，内部 image-item 列单图。',
    example:
      ':::: gallery variant=triptych\n::: image-item src="a.jpg" alt="A" 春\n:::\n::: image-item src="b.jpg" alt="B" 夏\n:::\n::: image-item src="c.jpg" alt="C" 秋\n:::\n::::\n',
  },
  {
    name: 'image-item',
    styleKey: null,
    category: 'content',
    parent: 'gallery',
    fenceLength: 3,
    attrs: [
      { key: 'src', description: '图片 URL', example: 'cover.jpg' },
      { key: 'alt', description: '替代文本（默认取 info）' },
    ],
    description: 'gallery 内单图。info 为该图的图注（小字），body 内容被忽略。',
    example: '::: image-item src="cover.jpg" alt="封面" 城市夜景\n:::\n',
  },

  {
    name: 'dialogue',
    styleKey: 'dialogue',
    category: 'content',
    pack: 'pack:editorial',
    variantKind: 'dialogue',
    nestable: true,
    children: ['dialogue-turn'],
    fenceLength: 4,
    attrs: [
      {
        key: 'variant',
        description:
          '骨架：qa-rows（默认 Q/A 行）/ chat-bubbles（左右气泡）/ ' +
          'name-prefix（"名字：内容"行内）/ interview-column（杂志体 N Yorker 风）',
        enum: VARIANT_IDS.dialogue,
      },
    ],
    description:
      '多轮访谈 / 对谈。与 qa-block 正交：qa-block 是单 Q + 单 A 签名格式，' +
      'dialogue 承载 ≥2 轮 Q&A 或多人对谈。外层 4 冒号，内部 dialogue-turn 列单轮。',
    example:
      ':::: dialogue 主编访谈\n::: dialogue-turn name="主持人" role="Q"\n你怎么看这次行业转向？\n:::\n::: dialogue-turn name="张三" role="A"\n转向是必然的，但节奏会比想象慢。\n:::\n::::\n',
  },
  {
    name: 'dialogue-turn',
    styleKey: null,
    category: 'content',
    parent: 'dialogue',
    fenceLength: 3,
    attrs: [
      {
        key: 'name',
        description:
          '发言者姓名（与 shape 二选一必填——shape 以形状代号替代姓名时可省）',
        example: '张三',
      },
      { key: 'role', description: '角色标识（"Q" / "A" / "主持人" / "嘉宾"）', example: 'Q' },
      {
        key: 'side',
        description:
          'chat-bubbles 骨架下的气泡侧（left = textMuted 左气泡 / right = primary 右气泡）。' +
          '其他骨架忽略此 attr。',
        enum: ['left', 'right'],
      },
      {
        key: 'shape',
        description:
          '以形状代号替代姓名（用于"形状即身份"骨架，如 shape-speaker variant）。' +
          'circle = 圆形徽章 / square = 方形徽章。声明 shape 时 name 可省，不消费此 attr 的骨架忽略。',
        enum: ['circle', 'square'],
      },
      {
        key: 'timestamp',
        description:
          '时间戳（用于音频 / 视频访谈整理稿，如 "00:04:21"）。' +
          '仅 audio-stamp 等显式消费此 attr 的骨架渲染，其他骨架忽略。',
        example: '00:04:21',
      },
    ],
    description:
      'dialogue 内单轮发言。name 与 shape 二选一必填（shape 以形状代号替代姓名），body 为发言内容。',
    example: '::: dialogue-turn name="张三" role="A"\n你说的没错。\n:::\n',
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

/** camel → kebab 映射（spec.signatureContainers 用 camelCase，markdown fence 用 kebab）。 */
export const STYLE_KEY_TO_CONTAINER_NAME: Readonly<Record<string, string>> = Object.fromEntries(
  STYLED_CONTAINERS.map((s) => [s.styleKey, s.name]),
)

/**
 * 取容器所属 pack。缺省（spec.pack 未声明）= 'base'。
 * 这是 pack 字段对外消费的唯一入口——build-writer-docs / capabilities.json /
 * 文档生成器都从这里读，避免重复内嵌 'pack === undefined ? base' 三元判断。
 */
export function packOf(spec: ContainerSpec): ContainerPack {
  return spec.pack ?? 'base'
}

/** 某 pack 包含的所有容器 spec。 */
export function containersInPack(pack: ContainerPack): ContainerSpec[] {
  return CONTAINER_VOCABULARY.filter((s) => packOf(s) === pack)
}

/** Namespace 分类：base / 领域扩展（pack:*）/ 主题专属（theme:*） */
export type PackNamespace = 'base' | 'pack' | 'theme'

/** 从 pack 值取 namespace 类别。`'base'` → `'base'`；`'pack:X'` → `'pack'`；`'theme:X'` → `'theme'`。 */
export function namespaceOf(pack: ContainerPack): PackNamespace {
  if (pack === 'base') return 'base'
  if (pack.startsWith('pack:')) return 'pack'
  return 'theme'
}

/** 取 namespace 后的部分。`'pack:editorial'` → `'editorial'`；`'theme:data-brief'` → `'data-brief'`；`'base'` → `''`。 */
export function namespaceIdOf(pack: ContainerPack): string {
  if (pack === 'base') return ''
  return pack.slice(pack.indexOf(':') + 1)
}

/** 列出词汇表中出现过的所有 pack 值（去重，稳定排序：base 在前，pack:* 中间，theme:* 在后）。 */
export function listPacks(): readonly ContainerPack[] {
  const set = new Set<ContainerPack>()
  for (const s of CONTAINER_VOCABULARY) set.add(packOf(s))
  const arr = [...set]
  return arr.sort((a, b) => {
    const rank = (p: ContainerPack) =>
      p === 'base' ? 0 : p.startsWith('pack:') ? 1 : 2
    const ra = rank(a)
    const rb = rank(b)
    return ra !== rb ? ra - rb : a.localeCompare(b)
  })
}

/**
 * 判定容器在给定主题语境下"是否启用"。
 *   - base / pack:* 任何主题都启用
 *   - theme:<id> 只在 themeId === id 时启用
 *
 * Renderer 不直接读本函数（兼容期内 markdown 仍可写 theme:* 容器，会得到 token 兜底）。
 * capabilities / lint / 推荐 API 用本函数决定"该不该曝光给作者"。
 */
export function isContainerEnabledForTheme(spec: ContainerSpec, themeId: string): boolean {
  const ns = namespaceOf(packOf(spec))
  if (ns === 'base' || ns === 'pack') return true
  return namespaceIdOf(packOf(spec)) === themeId
}

/**
 * 渲染行为维度（对 category 的归纳，独立于作者心智分组）。
 *   - variantized：有 variant slot 可切骨架
 *   - admonition：四态 tip/warning/info/danger 共享 variant 清单
 *   - nested：必须嵌在父容器内
 *   - fixed：固定骨架 + 主题化 CSS 槽位
 *   - free：兜底 escape-hatch，无主题样式
 */
export type ContainerKind = 'variantized' | 'admonition' | 'nested' | 'fixed' | 'free'

const ADMONITION_NAMES: ReadonlySet<string> = new Set(['tip', 'warning', 'info', 'danger'])

export function kindOf(spec: ContainerSpec): ContainerKind {
  if (spec.variantKind) return ADMONITION_NAMES.has(spec.name) ? 'admonition' : 'variantized'
  if (spec.parent) return 'nested'
  if (spec.category === 'free') return 'free'
  return 'fixed'
}

/** capabilities.json `notes` 字段派生：给作者解释容器的特殊约束。 */
export function notesFor(spec: ContainerSpec): string | undefined {
  if (spec.parent) return `必须嵌在 ${spec.parent} 内（外层 ::::，内层 :::）`
  if (ADMONITION_NAMES.has(spec.name))
    return 'admonition 四态（tip/warning/info/danger）共享 variant 清单；可通过 variant=xxx 在 open 行覆盖主题默认。第五态 note 已独立为 variantKind=note。'
  if (spec.name === 'note')
    return '第五态补注：独立 variantKind=note，中性骨架；可通过 variant=xxx 切骨架，色彩走 textMuted 不抢色。'
  if (spec.category === 'free') return '兜底 escape hatch：无主题样式，按作者内容原样透传。'
  return undefined
}
