import { listPersonas, WtException, type PersonaSummary } from '../../../../src/public'

export interface RecommendInput {
  title?: string
  summary?: string
  topic?: string
  style?: string
  vibe?: string
  audience?: string
}

export interface RecommendCandidate {
  id: string
  name: string
  description: string
  audience: string
  variantsSignature: Record<string, string>
  signatureContainers: readonly string[]
  staticScore: number
  staticReasons: string[]
}

export interface RecommendResult {
  ranked: RecommendCandidate[]
  recommendNew: boolean
  rationaleOneLine: string
}

const TOPIC_KEYWORDS: Record<string, readonly string[]> = {
  技术: [
    '技术',
    '工程',
    '架构',
    'manpage',
    'RFC',
    '内核',
    '系统',
    'API',
    '文档',
    '教程',
    'step',
    '开发',
    '算法',
  ],
  财经: ['财经', '财报', '投资', '内参', '研究所', '行业', 'analyst', '宏观', 'newsletter', 'Bloomberg', 'FT', 'HBR'],
  人文: ['人文', '散文', '书评', '札记', '随笔', '特稿', '人物', 'profile', 'New Yorker', '文学', '古典'],
  生活: ['生活', '美食', '旅行', '随笔', '慢生活', 'Kinfolk', '四时', '小品', '美学'],
  学术: ['学术', '论文', 'arXiv', 'Nature', '研究', '同行评审', '方法学', 'LaTeX'],
  数据: ['数据', '简报', '图表', 'KPI', '数据新闻', '可视化', '指标'],
  文化: [
    '文化',
    '编辑',
    'mook',
    'POPEYE',
    'BRUTUS',
    '电台',
    '播客',
    '夜读',
    '慢读',
    'punk',
    'zine',
    '实验',
    '设计',
    'Neue Grafik',
    '排印',
    '栅格',
    'design',
  ],
  其他: [],
}

const STYLE_RULES: ReadonlyArray<{
  pattern: RegExp
  matchInFields: ReadonlyArray<'audience' | 'name' | 'description'>
  targetKeywords: readonly string[]
}> = [
  { pattern: /medium|notion|substack|默认|不要太花/i, matchInFields: ['name'], targetKeywords: ['默认'] },
  {
    pattern: /dan luu|jvns|manpage|rfc|内核|kernel|系统编程|工程师/i,
    matchInFields: ['audience', 'description'],
    targetKeywords: ['manpage', 'RFC', '工程'],
  },
  {
    pattern: /stripe|mdn|教程|step.?by.?step|新手指南|文档/i,
    matchInFields: ['audience', 'description'],
    targetKeywords: ['教程', '文档', 'Stripe', 'MDN'],
  },
  {
    pattern: /食谱|旅行|慢生活|kinfolk|美食|四时|美学/i,
    matchInFields: ['audience', 'description'],
    targetKeywords: ['生活', '美食', 'Kinfolk'],
  },
  {
    pattern: /ft.?中文|财新|hbr|bloomberg|内参|投行|研究所|财报/i,
    matchInFields: ['audience', 'description'],
    targetKeywords: ['财经', '内参', 'Bloomberg', 'FT', 'HBR'],
  },
  {
    pattern: /散文|宋椠|古典|三联|札记|书评/i,
    matchInFields: ['audience', 'description'],
    targetKeywords: ['散文', '书评', '人文'],
  },
  {
    pattern: /stratechery|ben thompson|newsletter|周刊|周报|analyst/i,
    matchInFields: ['audience', 'description'],
    targetKeywords: ['newsletter', '周刊', 'analyst'],
  },
  {
    pattern: /人物|new yorker|纽约客|特稿|口述史|profile/i,
    matchInFields: ['audience', 'description'],
    targetKeywords: ['特稿', '人物', 'profile'],
  },
  {
    pattern: /arxiv|nature|论文|latex|同行评审|研究综述|方法学/i,
    matchInFields: ['audience', 'description'],
    targetKeywords: ['学术', 'arXiv', 'Nature', 'LaTeX'],
  },
  {
    pattern: /晚点|morning brew|数据简报|图表|kpi|数据新闻/i,
    matchInFields: ['audience', 'description'],
    targetKeywords: ['数据', '简报', '图表'],
  },
  {
    pattern: /popeye|brutus|mook|编辑刊|慢读/i,
    matchInFields: ['audience', 'description'],
    targetKeywords: ['mook', 'POPEYE', '编辑', '慢读'],
  },
  {
    pattern: /swiss|neue grafik|栅格|苏黎世|设计评论|对开页/i,
    matchInFields: ['audience', 'description'],
    targetKeywords: ['Neue Grafik', '栅格', '设计'],
  },
  {
    pattern: /punk|zine|brutalist|粗野|凌晨|文化批评/i,
    matchInFields: ['audience', 'description'],
    targetKeywords: ['punk', 'zine', '夜读', '文化批评'],
  },
  {
    pattern: /电台|播客|长夜|03:41|黑胶|vinyl/i,
    matchInFields: ['audience', 'description'],
    targetKeywords: ['电台', '播客', '夜读', '长夜'],
  },
]

function countKeywordHits(text: string, keywords: readonly string[]): number {
  if (keywords.length === 0) return 0
  const lower = text.toLowerCase()
  let n = 0
  for (const kw of keywords) {
    if (lower.includes(kw.toLowerCase())) n++
  }
  return n
}

function scoreCandidate(p: PersonaSummary, input: RecommendInput): RecommendCandidate {
  const reasons: string[] = []
  let score = 0.2

  if (input.topic) {
    const topicKeywords = TOPIC_KEYWORDS[input.topic] ?? []
    const topicHits = countKeywordHits(`${p.audience} ${p.description}`, topicKeywords)
    if (topicHits > 0) {
      score += Math.min(topicHits * 0.15, 0.45)
      reasons.push(`audience/description 命中题材"${input.topic}"关键词 ${topicHits} 个`)
    }
  }
  if (input.style) {
    for (const rule of STYLE_RULES) {
      if (!rule.pattern.test(input.style)) continue
      const fieldText = rule.matchInFields.map((f) => p[f]).join(' ')
      const hits = countKeywordHits(fieldText, rule.targetKeywords)
      if (hits > 0) {
        score += Math.min(hits * 0.2, 0.4)
        reasons.push(`参照锚点"${input.style}"→ ${rule.matchInFields.join('/')} 命中 ${hits} 个语义词`)
        break
      }
    }
  }
  const titleSummaryText = `${input.title ?? ''} ${input.summary ?? ''}`.trim()
  if (titleSummaryText) {
    const audienceHits = countKeywordHits(
      titleSummaryText,
      p.audience.split(/[\s/、，,]+/).filter((s) => s.length >= 2),
    )
    if (audienceHits > 0) {
      score += Math.min(audienceHits * 0.1, 0.2)
      reasons.push(`标题/摘要直接出现 audience 关键词 ${audienceHits} 个`)
    }
  }
  if (input.vibe) {
    const vibeTopicHits = Object.entries(TOPIC_KEYWORDS).flatMap(([, kws]) =>
      countKeywordHits(`${input.vibe} ${p.audience} ${p.description}`, kws) > 0 ? [kws] : [],
    )
    if (vibeTopicHits.length > 0) {
      const vibeHits = countKeywordHits(`${p.audience} ${p.description}`, vibeTopicHits.flat())
      if (vibeHits > 0) {
        score += Math.min(vibeHits * 0.15, 0.45)
        reasons.push(`vibe 命中 persona 领域关键词 ${vibeHits} 个`)
      }
    }
    for (const rule of STYLE_RULES) {
      if (!rule.pattern.test(input.vibe)) continue
      const fieldText = rule.matchInFields.map((f) => p[f]).join(' ')
      const hits = countKeywordHits(fieldText, rule.targetKeywords)
      if (hits > 0) {
        score += Math.min(hits * 0.2, 0.4)
        reasons.push(`vibe 命中 ${rule.matchInFields.join('/')} 语义词 ${hits} 个`)
        break
      }
    }
  }
  if (input.audience) {
    const personaAudienceTokens = p.audience.split(/[\s/、，,]+/).filter((s) => s.length >= 2)
    const audienceMatchHits = countKeywordHits(input.audience, personaAudienceTokens)
    if (audienceMatchHits > 0) {
      score += Math.min(audienceMatchHits * 0.15, 0.3)
      reasons.push(`audience 命中 persona 受众词 ${audienceMatchHits} 个`)
    }
  }
  if (p.id === 'default' && reasons.length === 0) {
    score = 0.35
    reasons.push('中立兜底——题材匹配不强时安全选择')
  }
  return {
    id: p.id,
    name: p.name,
    description: p.description,
    audience: p.audience,
    variantsSignature: {
      admonition: p.variants.admonition,
      quote: p.variants.quote,
      steps: p.variants.steps,
      divider: p.variants.divider,
      codeBlock: p.variants.codeBlock,
      note: p.variants.note,
    },
    signatureContainers: p.signatureContainers,
    staticScore: Math.min(score, 1),
    staticReasons: reasons,
  }
}

export function recommendPersona(input: RecommendInput): RecommendResult {
  const hasSignal = [input.title, input.summary, input.vibe, input.audience, input.topic, input.style].some(
    (v) => typeof v === 'string' && v.trim().length > 0,
  )
  if (!hasSignal) {
    throw new WtException('CONTRACT_VIOLATION', [
      {
        message: '至少提供一个评分信号：title / summary / vibe / audience / topic / style',
        severity: 'error',
        hint: 'vibe 接受自由文字氛围描述，audience 接受目标读者描述',
      },
    ])
  }
  const personas = listPersonas()
  const candidates = personas
    .map((p) => scoreCandidate(p, input))
    .sort((a, b) => b.staticScore - a.staticScore)
  const top3 = candidates.slice(0, 3)
  const topScore = top3[0]?.staticScore ?? 0
  const rationaleOneLine =
    topScore >= 0.85
      ? `强匹配 ${top3[0].id}（${top3[0].staticScore.toFixed(2)}）`
      : topScore >= 0.6
        ? `top-3 任一可用，建议 ${top3[0].id}`
        : `top-1 仅 ${topScore.toFixed(2)}——内置主题都不够匹配，建议造新`
  return { ranked: top3, recommendNew: topScore < 0.6, rationaleOneLine }
}
