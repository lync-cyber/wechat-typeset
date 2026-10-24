export interface WritingStyleRules {
  phrases: string[]
  patterns: string[]
  patternTolerance: number
  minWords: number
  maxWords: number
  minImages: number
  maxImages: number
}

export interface WritingStyle {
  id: string
  name: string
  description: string
  positioning: string
  expression: string
  structure: string
  evidence: string
  visuals: string
  review: string
  rules: WritingStyleRules
}

export interface WritingStylesDocument {
  version: 1
  defaultId: string
  styles: WritingStyle[]
}

export type WritingStylesConfig = WritingStylesDocument

export const DEFAULT_CLICHES = [
  '在这个快速变化的时代', '值得我们深思', '重新定义', '颠覆性变革', '不难发现',
  '毋庸置疑', '赋能千行百业', '从0到1的闭环', '让我们拭目以待', '引发了广泛关注',
  '随着科技的不断发展', '时代的浪潮', '站在新的起点', '开启新的篇章', '未来已来',
  '机遇与挑战并存', '助力高质量发展', '携手共创未来', '不可或缺的一部分', '具有重要意义',
  '不言而喻', '众所周知', '显而易见', '可见一斑', '大有可为',
  '值得期待', '让我们共同期待', '总而言之', '综上所述', '从某种意义上说',
] as const

export const DEFAULT_WRITING_STYLE: WritingStyle = {
  id: 'deep-research',
  name: '深度研究',
  description: '商业研究、科技产业观察、行为心理学与非虚构写作的 2000—3000 字深度文章。',
  positioning: `内容定位：以商业研究、科技产业观察、行为心理学和非虚构写作为核心，面向具有专业阅读习惯的中文读者，创作观点鲜明、证据充分、现实感强的深度文章，解释事实背后的机制与人的处境。

目标读者：具有一定教育背景和思辨习惯的成年中文读者。默认读者理解基本商业与科技概念，但不预设其了解具体行业术语和海外制度背景。

最终标准：让读者不仅认为文章有道理，更能获得一个此前没有、值得带给别人的认识。写完后用一句话说出这个新认识；说不出来，或说出来是常识，文章就还没有完成。`,
  expression: `语言风格：冷静、专业、具体而锋利。使用完整连贯的中文自然段，用具体的人、动作、数字和场景代替概念。证据充分时允许尖锐判断；少用营销语言、空泛抒情和无内容排比，不刻意制造对立。

表达禁忌：减少概念堆砌、机械排比、说教和空泛金句；控制“不是……而是……”“当然……但是……”等反复出现的 AI 式表达，同一种句式全文尽量只用一次。不把每句话独立成段；不使用鸡汤式收尾、浮夸副标题或机械的同构小节；不写虚假的采访和未经证据支持的数字。`,
  structure: `每篇必备：
- 独立的现实冲突：一个此刻正在发生、有具体当事人和代价的矛盾，而不是抽象议题。
- 具有争论价值的核心判断：有人会反对、能够被证据检验的明确立场，而不是两边都对的总结。
- 能够支撑判断的真实证据：可核实的事实、数据、原始研究或商业现场，足以撑住判断最强的那一部分。

系列递进：一个系列必须实现思想递进：每篇在上一篇的结论上提出新问题、推翻一个前提或进入更深一层机制，而不是换一个案例重复同一观点。动笔前写明本篇相对系列已发表文章新增的认识。

文章结构：开篇迅速进入问题：前两段内出现具体冲突、反常事实或职业处境，不铺垫时代背景。中段提供超越常识的发现：每个章节推进事实、机制或反例，理论与现实案例交替，至少有一处读者事先不知道或想错了的地方；允许叙事而非整齐三段论。正文标题优先 2—4 级，避免为了排版增加章节。结尾不重复梳理全文，留下一个能够引发真实行业讨论的问题，或一个仍然真实存在的难题。

标题切入：现实矛盾（同一事实里两种相互冲突的结果）；认知反差（读者默认的判断与证据指向相反）；职业身份冲突（某种身份的优势恰恰成为其困境）。

标题、摘要与卷首语：标题允许尖锐，但必须由正文兑现，读完后读者不应觉得被标题欺骗；避免标题党和无信息的悬念。默认提出 5—7 个切入角度真正不同的标题候选（机制、冲突、现实后果、人物切口等）。分享摘要为 60—120 字，不复述标题；卷首语承担阅读引入角色，通常为 80—180 字，正文不重复包含它。`,
  evidence: `证据标准：核心事实和关键数字必须给出可核实来源，优先官方披露、原始报道、论文、书籍和可信数据库。正文明确区分三类内容：可核实的事实、行业典型情境（基于普遍做法的合理描述，须标明是典型情境而非具体个案）、分析推断（作者的判断）。无法完全核实但有分析价值的数字明确标注口径，影响结论的重要方法局限集中解释一次。不捏造采访、引文、业务数据、传播成绩、参考文献、时间、案例或图像来源。

案例取材：优先使用中国读者熟悉的企业案例、真实社会现场、商业交易情境和原始研究；海外案例只在中国案例无法说明问题时使用，并补齐必要的商业和制度语境。同一案例不在同一系列中反复充当主证据。`,
  visuals: `配图原则：正文图片应有明确作用，从四类中选择：历史纪实（还原现场与时间）、数据可视化（支撑关键数字，必须说明来源与口径）、商业判断框架（把文章的机制画成结构图）、观点卡片（提炼可被转发的核心判断）。每张图提交用途、建议画面、可核实来源或 AI 生成标注、图注。公众号封面一般提供 3 个构图和气质不同的候选方案。

视觉一致性：研究与叙事主题的配色、字体与编号体系保持一致。避免封面构图同质化（同一系列不连续使用同类构图），避免刻板 AI 摄影（发光大脑、握手、机器人、蓝色科技光效、无意义的人物剪影）。AI 生成图片必须标注。`,
  review: `发布前自查：
- 标题兑现程度：读完正文，标题的承诺是否被完整兑现？尖锐的部分是否都有证据撑住？
- 观点独特性：核心判断是否超出读者已有常识？能否用一句话说出本文新增的认识？
- 证据可信度：关键事实是否都有可核实来源？事实、典型情境与推断是否区分清楚？
- 阅读留存：开篇两段内是否进入冲突？中段是否有让人继续读下去的新发现？
- 情绪穿透力：是否写出了具体的人与处境，而不是抽象的趋势和概念？
- 主动分享理由：读者转发它，是为了向谁说明什么？这个理由是否成立？

交付说明：正文末尾保留“延伸阅读”参考资料链接。候选标题、系列递进说明、卷首语和封面候选作为交付说明提供；逐条回答上述评审问题，并列出仍未核实的事实。正式稿按下方文件约定交付。

补充约定：保留作者清晰的个人立场，允许提出难以回避的反问；对事实责任和人的处境同样认真。`,
  rules: {
    phrases: [...DEFAULT_CLICHES],
    patterns: ['不是……而是……', '当然……但是……', '与其说……不如说……', '这不仅……更是……', '本质上', '真正的', '换句话说', '归根结底'],
    patternTolerance: 1,
    minWords: 2000,
    maxWords: 3000,
    minImages: 2,
    maxImages: 3,
  },
}

export function defaultWritingStyles(): WritingStylesDocument {
  return { version: 1, defaultId: DEFAULT_WRITING_STYLE.id, styles: [structuredClone(DEFAULT_WRITING_STYLE)] }
}

type ParseResult = { ok: true; value: WritingStylesDocument } | { ok: false; error: string }

function record(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${label} 应为对象`)
  return value as Record<string, unknown>
}

function text(value: unknown, label: string, max: number, required = false): string {
  if (value === undefined && !required) return ''
  if (typeof value !== 'string' || value.length > max || (required && !value.trim())) {
    throw new Error(`${label} 应为${required ? '非空' : ''}文字，最多 ${max} 字`)
  }
  return value
}

function list(value: unknown, label: string): string[] {
  if (!Array.isArray(value) || value.length > 60) throw new Error(`${label} 应为最多 60 条的文字列表`)
  return [...new Set(value.map((item) => text(item, label, 300, true).trim()))]
}

function integer(value: unknown, label: string, max: number): number {
  if (typeof value !== 'number' || !Number.isInteger(value) || value < 0 || value > max) {
    throw new Error(`${label} 应为 0—${max} 的整数`)
  }
  return value
}

function validateStyle(value: unknown): WritingStyle {
  const raw = record(value, '写作风格')
  const rules = record(raw.rules, '检查规则')
  const parsed: WritingStyle = {
    id: text(raw.id, '风格 ID', 80, true),
    name: text(raw.name, '风格名称', 60, true),
    description: text(raw.description, '适用场景', 500),
    positioning: text(raw.positioning, '定位与读者', 10000),
    expression: text(raw.expression, '语言与表达', 10000),
    structure: text(raw.structure, '结构与标题', 10000),
    evidence: text(raw.evidence, '证据与案例', 10000),
    visuals: text(raw.visuals, '配图与视觉', 10000),
    review: text(raw.review, '评审与补充', 10000),
    rules: {
      phrases: list(rules.phrases, '套话词表'),
      patterns: list(rules.patterns, '句式词表'),
      patternTolerance: integer(rules.patternTolerance, '句式容许次数', 20),
      minWords: integer(rules.minWords, '字数下限', 20000),
      maxWords: integer(rules.maxWords, '字数上限', 20000),
      minImages: integer(rules.minImages, '图片下限', 30),
      maxImages: integer(rules.maxImages, '图片上限', 30),
    },
  }
  for (const key of Object.keys(raw)) if (!Object.hasOwn(parsed, key)) throw new Error(`不支持写作风格字段 ${key}`)
  for (const key of Object.keys(rules)) if (!Object.hasOwn(parsed.rules, key)) throw new Error(`不支持检查字段 ${key}`)
  if (parsed.rules.minWords > parsed.rules.maxWords || parsed.rules.minImages > parsed.rules.maxImages) {
    throw new Error('检查范围的下限不能大于上限')
  }
  return parsed
}

export function parseWritingStylesJSON(source: string): ParseResult {
  try {
    const raw = record(JSON.parse(source), '写作风格文件')
    if (raw.version !== 1) throw new Error('不支持的写作风格文件版本')
    if (!Array.isArray(raw.styles) || raw.styles.length === 0 || raw.styles.length > 50) throw new Error('请保留 1—50 套写作风格')
    const styles = raw.styles.map(validateStyle)
    const ids = new Set(styles.map((style) => style.id))
    if (ids.size !== styles.length) throw new Error('写作风格 ID 不能重复')
    const defaultId = text(raw.defaultId, '默认风格 ID', 80, true)
    if (!ids.has(defaultId)) throw new Error('默认写作风格不存在')
    for (const key of Object.keys(raw)) if (!['version', 'defaultId', 'styles'].includes(key)) throw new Error(`不支持文件字段 ${key}`)
    return { ok: true, value: { version: 1, defaultId, styles } }
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export function buildWritingPrompt(style: WritingStyle): string {
  const sections: [string, string][] = [
    ['适用场景', style.description], ['定位与读者', style.positioning], ['语言与表达', style.expression],
    ['结构与标题', style.structure], ['证据与案例', style.evidence], ['配图与视觉', style.visuals], ['评审与补充', style.review],
  ]
  const guide = sections.filter(([, content]) => content.trim()).map(([heading, content]) => `## ${heading}\n\n${content}`).join('\n\n')
  const rules = style.rules
  return `# 写作风格：${style.name}\n\n${guide}

## 检查要求

- 正文目标 ${rules.minWords}—${rules.maxWords} 字，正文图片 ${rules.minImages}—${rules.maxImages} 张。
- 控制使用的句式（每种允许 ${rules.patternTolerance} 次）：${rules.patterns.join('；') || '未设置'}。
- 避免套话：${rules.phrases.join('；') || '未设置'}。
- 检查超过 80 字的长句、连续 3 个以上的单句段；正文图片配可见图注，alt 说明不代替图注。

## 文件约定

直接在文章库中新建 <日期-slug>/article.md，图片放在同篇 images/。article.md 使用 YAML frontmatter 和正文，发布字段为 title、digest（最多 120 字）、author、cover、source、date，可保留 theme、variants；本篇 writingStyle 使用 ${JSON.stringify(style.id)}。
cover 使用 images/ 下的相对路径。正文以 ![](images/文件名.webp) 或本仓库已有图片容器引用图片，禁止 base64 写入稿件。只使用本仓库现有 ::: 容器语法，排版选择遵守 docs/contract/，不发明新容器。\n`
}
