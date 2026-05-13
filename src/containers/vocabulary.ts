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
  | 'structure' // 骨架：intro / cover / author / section-title
  | 'admonition' // 五态提示：tip / warning / info / danger / note
  | 'content' // 内容块：quote-card / highlight / compare / pros / cons / steps
  | 'navigation' // 导航/收束：divider / footer-cta / recommend
  | 'media' // 媒体：qrcode / mpvoice / mpvideo
  | 'signature' // 签名块：abstract / key-number / see-also
  | 'free' // 兜底 escape hatch：free

/**
 * 契约扩展包（pack）。决定容器属于"基础契约"还是某个领域扩展包。
 * 同一容器只能属于一个 pack；pack 是契约文档分组手段，也是 capabilities.json
 * 与 build-writer-docs 的派生输入。
 *
 * 新增 pack 流程：
 *   1. 在本 union 追加 pack id
 *   2. 在 scripts/build-writer-docs.ts:PACK_TARGETS 追加文档目标
 *   3. 在目标文档里放置 `<!-- generated:container-quick-ref:<pack>:start/end -->` 标记对
 */
export type ContainerPack = 'base' | 'data-brief'

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
  {
    name: 'masthead',
    styleKey: 'masthead',
    category: 'structure',
    pack: 'data-brief',
    fenceLength: 3,
    attrs: [
      { key: 'issue', description: '期号（monospace 右对齐）', example: '004' },
      { key: 'date', description: '日期（monospace 右对齐）', example: '2026.04.22' },
    ],
    description:
      '刊头：刊名（info）左对齐 + 期号·日期 monospace 右对齐 + 下划线。data-brief 家族签名。',
    example: '::: masthead 慢读简报 issue="004" date="2026.04.22"\n:::\n',
  },
  {
    name: 'section-tag',
    styleKey: 'sectionTag',
    category: 'structure',
    pack: 'data-brief',
    fenceLength: 3,
    description: '小栏目标签（黑底白字胶囊小字，info 为标签文字，如 "深度"）。',
    example: '::: section-tag\n深度\n:::\n',
  },
  {
    name: 'toc',
    styleKey: 'toc',
    category: 'structure',
    pack: 'data-brief',
    fenceLength: 4,
    children: ['toc-item'],
    description:
      '目录三栏（序号·标题·页码）。外层用 4 个冒号，内部用 toc-item 列条目。info 为 kicker（如 "目录 · CONTENTS"）。',
    example:
      ':::: toc 目录 · CONTENTS\n::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心\n:::\n::::\n',
  },
  {
    name: 'toc-item',
    styleKey: null,
    category: 'structure',
    pack: 'data-brief',
    parent: 'toc',
    fenceLength: 3,
    attrs: [
      { key: 'no', description: '序号（monospace 主色）', example: '01' },
      { key: 'page', description: '页码（monospace 灰）', example: 'p.04' },
    ],
    description: 'toc 内单条；info 为条目标题。body 内容会被忽略。',
    example: '::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心\n:::\n',
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
        // R7：enum 从 VARIANT_IDS 派生——新增 admonition variant 改 _all.ts 即可，
        // 无需同步动这里。
        enum: VARIANT_IDS.admonition,
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
    variantKind: 'note',
    fenceLength: 3,
    attrs: [
      {
        key: 'variant',
        description: '覆盖主题默认的 note 骨架（中性补注池，色彩走 textMuted 不抢色）',
        // R7：从 VARIANT_IDS.note 派生
        enum: VARIANT_IDS.note,
      },
    ],
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
  {
    name: 'qa-block',
    styleKey: 'qaBlock',
    category: 'content',
    pack: 'data-brief',
    fenceLength: 3,
    attrs: [
      {
        key: 'q',
        description: '问题文本（visual: 主色 Q 方块头像 + 单行）',
        example: '数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？',
      },
    ],
    description:
      '读者问答：attrs.q 为问题，body 为回答（支持 markdown）。info 为 kicker（如 "读者问答 · Q&A"）。',
    example:
      '::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"\n有。数据衡量的是习惯而非能力，从睡前 15 分钟开始即可。\n:::\n',
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
  {
    name: 'kpi-dashboard',
    styleKey: 'kpiDashboard',
    category: 'signature',
    pack: 'data-brief',
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
    category: 'signature',
    pack: 'data-brief',
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
        description: 'sparkline 折线数据（逗号分隔 0–13 整数，左右端点对齐）',
        example: '2,4,5,6,8,9,10,11',
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
    category: 'signature',
    pack: 'data-brief',
    fenceLength: 4,
    children: ['bar'],
    attrs: [
      { key: 'subtitle', description: '副标题（单位/样本说明）', example: '单位：分钟 · n=1,024' },
    ],
    description:
      '横向条形图（纯 div 宽度，无 SVG）。外层用 4 个冒号，内部用 bar 条目。info 为图表标题。',
    example:
      ':::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟"\n::: bar label="60+" pct="84" value="42 分"\n:::\n::::\n',
  },
  {
    name: 'bar',
    styleKey: null,
    category: 'signature',
    pack: 'data-brief',
    parent: 'bar-chart',
    fenceLength: 3,
    attrs: [
      { key: 'label', description: '类目标签', example: '60+' },
      { key: 'pct', description: '柱宽百分比（0–100 整数）', example: '84' },
      { key: 'value', description: '数值显示（右对齐）', example: '42 分' },
      { key: 'tone', description: '色调；warn 转 danger 红', enum: ['normal', 'warn'] },
    ],
    description: 'bar-chart 内单条；attrs.label/pct/value 必填，tone 决定柱色（normal 走主色）。',
    example: '::: bar label="60+" pct="84" value="42 分"\n:::\n',
  },
  {
    name: 'footnotes',
    styleKey: 'footnotes',
    category: 'signature',
    pack: 'data-brief',
    fenceLength: 3,
    description:
      '脚注块：上分割线 + 小字编号引用。body 通常为 `[1] 文本 / [2] 文本` 或有序列表，渲染器只加外框。',
    example: '::: footnotes\n[1] 数据覆盖 2010–2025。\n[2] 深度理解得分取自 24h 回忆测试。\n:::\n',
  },
  {
    name: 'cta-bar',
    styleKey: 'ctaBar',
    category: 'signature',
    pack: 'data-brief',
    fenceLength: 3,
    attrs: [
      { key: 'like', description: '左格文字（默认 ♡ 赞同）', example: '♡ 赞同' },
      { key: 'star', description: '中格文字（实色，默认 ★ 收藏）', example: '★ 收藏' },
      { key: 'share', description: '右格文字（默认 ↗ 转发）', example: '↗ 转发' },
    ],
    description:
      'CTA 三栏：左/右描边格 + 中实色格。data-brief 签名（赞同 / 收藏 / 转发）。body 忽略。',
    example: '::: cta-bar\n:::\n',
  },
  {
    name: 'qr-follow',
    styleKey: 'qrFollow',
    category: 'signature',
    pack: 'data-brief',
    fenceLength: 3,
    attrs: [
      { key: 'kicker', description: '左上小字 kicker（默认 SUBSCRIBE）', example: 'SUBSCRIBE' },
      { key: 'desc', description: '副标题（小字说明）', example: '每周四，一封邮件，一组数据' },
      { key: 'qr', description: 'QR 图地址（缺省时画占位 SVG）', example: 'https://…/qr.png' },
    ],
    description:
      '二维码订阅卡：左 60×60 QR + 右 SUBSCRIBE/标题/说明三行。info 作为主标题。',
    example: '::: qr-follow 慢读简报 desc="每周四，一封邮件，一组数据"\n:::\n',
  },
  {
    name: 'editor-note',
    styleKey: 'editorNote',
    category: 'signature',
    pack: 'data-brief',
    fenceLength: 3,
    description:
      '编辑部注：主色左竖条 callout + kicker 小标题 + 正文。data-brief / industry-observer 等深度刊家族常用，区别于中性的 note。',
    example: '::: editor-note 编 者 按\n慢读并非复古姿态，而是一种对自己时间主权的重新申明。\n:::\n',
  },
  {
    name: 'methodology',
    styleKey: 'methodology',
    category: 'signature',
    pack: 'data-brief',
    fenceLength: 3,
    description:
      '方法论小字注释：浅底 + 10px textMuted + 粗体标签头。调研类主题的脚注本，与中性 note 的区别在排印密度（更紧、更小、更"说明栏"）。',
    example: '::: methodology 方法论\n本文数据为作者自行整理，n=1,024，样本覆盖 18–72 岁都市读者。\n:::\n',
  },
  {
    name: 'colophon',
    styleKey: 'colophon',
    category: 'signature',
    pack: 'data-brief',
    fenceLength: 3,
    attrs: [
      { key: 'next', description: '左栏：下期预告标题', example: '纸本之必要：论书脊与手指的记忆' },
      { key: 'issue', description: '右栏：期号 / 卷期说明', example: '第 004 期 · 2026' },
    ],
    description:
      '刊物收束栏：上分割线 + 左右双栏 monospace 元数据（下期预告 / 卷·期）。data-brief 等刊物化主题的"尾签名"。',
    example: '::: colophon next="纸本之必要" issue="第 004 期 · 2026"\n:::\n',
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
