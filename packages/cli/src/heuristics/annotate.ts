import {
  getContainerVocabulary,
  getRecommendedVariantsFor,
  getThemeCapabilities,
} from '../../../../src/public'

export interface AnnotatePatch {
  line: number
  endLine: number
  kind:
    | 'wrap_paragraph'
    | 'wrap_blockquote'
    | 'convert_list'
    | 'wrap_first_paragraph'
    | 'wrap_section_title'
    | 'wrap_pros_cons'
  container: string
  variant?: string
  reason: string
  confidence: 'high' | 'medium' | 'low'
  preview: string
}

interface Block {
  start: number
  end: number
  type:
    | 'heading1'
    | 'heading2'
    | 'paragraph'
    | 'blockquote'
    | 'olist'
    | 'ulist'
    | 'codeblock'
    | 'fence'
    | 'blank'
  lines: string[]
}

const VERBS = [
  '打开',
  '切换',
  '运行',
  '复制',
  '粘贴',
  '创建',
  '删除',
  '安装',
  '配置',
  '检查',
  '点击',
  '选择',
  '输入',
  '关闭',
  '保存',
  '重启',
  '设置',
  '导入',
  '导出',
  '提交',
  '推送',
  '拉取',
  '下载',
  '上传',
]

function startsWithVerbCh(s: string): boolean {
  const m = s.replace(/^\d+\.\s*/, '')
  return VERBS.some((v) => m.startsWith(v))
}

function splitBlocks(md: string): Block[] {
  const lines = md.split(/\r?\n/)
  const blocks: Block[] = []
  let current: Block | null = null
  let inCode = false

  const flush = () => {
    if (current) blocks.push(current)
    current = null
  }

  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i]
    if (/^```/.test(ln)) {
      if (inCode) {
        if (current) current.lines.push(ln)
        flush()
        inCode = false
      } else {
        flush()
        current = { start: i, end: i, type: 'codeblock', lines: [ln] }
        inCode = true
      }
      continue
    }
    if (inCode) {
      if (current) {
        current.end = i
        current.lines.push(ln)
      }
      continue
    }
    if (/^:{3,}/.test(ln)) {
      flush()
      blocks.push({ start: i, end: i, type: 'fence', lines: [ln] })
      continue
    }
    if (/^\s*$/.test(ln)) {
      flush()
      blocks.push({ start: i, end: i, type: 'blank', lines: [ln] })
      continue
    }
    if (/^# /.test(ln)) {
      flush()
      blocks.push({ start: i, end: i, type: 'heading1', lines: [ln] })
      continue
    }
    if (/^## /.test(ln)) {
      flush()
      blocks.push({ start: i, end: i, type: 'heading2', lines: [ln] })
      continue
    }
    if (/^> /.test(ln)) {
      if (current?.type === 'blockquote') {
        current.end = i
        current.lines.push(ln)
      } else {
        flush()
        current = { start: i, end: i, type: 'blockquote', lines: [ln] }
      }
      continue
    }
    if (/^\d+\. /.test(ln)) {
      if (current?.type === 'olist') {
        current.end = i
        current.lines.push(ln)
      } else {
        flush()
        current = { start: i, end: i, type: 'olist', lines: [ln] }
      }
      continue
    }
    if (/^[-*] /.test(ln)) {
      if (current?.type === 'ulist') {
        current.end = i
        current.lines.push(ln)
      } else {
        flush()
        current = { start: i, end: i, type: 'ulist', lines: [ln] }
      }
      continue
    }
    if (current?.type === 'paragraph') {
      current.end = i
      current.lines.push(ln)
    } else {
      flush()
      current = { start: i, end: i, type: 'paragraph', lines: [ln] }
    }
  }
  flush()
  return blocks
}

export interface AnnotateResult {
  patches: AnnotatePatch[]
  capabilitySnapshot: {
    personaId: string
    defaultVariants: ReturnType<typeof getThemeCapabilities>['defaultVariants']
    recommendedVariants: ReturnType<typeof getRecommendedVariantsFor>
    containers: ReturnType<typeof getThemeCapabilities>['containers']
  }
  vocabularySubset: Array<{
    name: string
    category: string
    fenceLength: number
    description: string
    example: string
  }>
  blockCount: number
}

export function annotateMarkdown(md: string, personaId: string): AnnotateResult {
  const blocks = splitBlocks(md)
  const caps = getThemeCapabilities(personaId)
  const recommended = getRecommendedVariantsFor(personaId)
  const availableSet = new Set(caps.containers.filter((c) => c.available).map((c) => c.id))
  const signatureSet = new Set(caps.containers.filter((c) => c.signature).map((c) => c.id))
  const has = (id: string) => availableSet.has(id)
  const isSig = (id: string) => signatureSet.has(id)

  const patches: AnnotatePatch[] = []

  const firstHeading = blocks.findIndex((b) => b.type === 'heading1')
  const firstParaAfterH1 = blocks.findIndex(
    (b, i) => i > firstHeading && b.type === 'paragraph',
  )
  if (firstParaAfterH1 >= 0) {
    const b = blocks[firstParaAfterH1]
    const text = b.lines.join(' ')
    if (text.length >= 50 && text.length <= 300) {
      const container = isSig('abstract') ? 'abstract' : 'intro'
      patches.push({
        line: b.start + 1,
        endLine: b.end + 1,
        kind: 'wrap_first_paragraph',
        container,
        reason: `文首总览段（${text.length} 字符）——典型 ${container} 位置`,
        confidence: 'high',
        preview: text.slice(0, 60) + (text.length > 60 ? '…' : ''),
      })
    }
  }

  for (const b of blocks) {
    const text = b.lines.join(' ')
    if (b.type === 'olist' && b.lines.length >= 3) {
      const allVerb = b.lines.filter((l) => /^\d+\. /.test(l)).every(startsWithVerbCh)
      if (allVerb) {
        patches.push({
          line: b.start + 1,
          endLine: b.end + 1,
          kind: 'convert_list',
          container: 'steps',
          reason: `有序列表 ${b.lines.length} 条，每条动词开头——操作流程`,
          confidence: 'high',
          preview: b.lines[0].slice(0, 50),
        })
      }
    }
    if (b.type === 'blockquote') {
      const cleanText = b.lines.map((l) => l.replace(/^>\s?/, '')).join('').trim()
      if (cleanText.length >= 15 && cleanText.length <= 200 && /[。.！？!?]$/.test(cleanText)) {
        patches.push({
          line: b.start + 1,
          endLine: b.end + 1,
          kind: 'wrap_blockquote',
          container: 'quote-card',
          reason: `blockquote 单段短句（${cleanText.length} 字符，句末完整）——典型金句`,
          confidence: 'medium',
          preview: cleanText.slice(0, 60),
        })
      }
    }
    if (b.type === 'paragraph') {
      if (/切忌|千万不要|❌|危险|⚠️\s*严重/.test(text)) {
        patches.push({
          line: b.start + 1,
          endLine: b.end + 1,
          kind: 'wrap_paragraph',
          container: 'danger',
          reason: '段落含"切忌/千万不要/❌"——典型 danger',
          confidence: 'high',
          preview: text.slice(0, 60),
        })
      } else if (/⚠️|注意|留意|需注意/.test(text) && text.length >= 30 && text.length <= 200) {
        patches.push({
          line: b.start + 1,
          endLine: b.end + 1,
          kind: 'wrap_paragraph',
          container: 'warning',
          reason: '段落含"注意/留意/⚠️"——典型 warning',
          confidence: 'medium',
          preview: text.slice(0, 60),
        })
      } else if (/💡|小贴士|顺便|tip:/i.test(text)) {
        patches.push({
          line: b.start + 1,
          endLine: b.end + 1,
          kind: 'wrap_paragraph',
          container: 'tip',
          reason: '段落含"💡/小贴士/顺便"——典型 tip',
          confidence: 'medium',
          preview: text.slice(0, 60),
        })
      } else if (
        /\d+(\.\d+)?\s?[%倍亿万千]/.test(text) &&
        text.length <= 150 &&
        isSig('key-number')
      ) {
        patches.push({
          line: b.start + 1,
          endLine: b.end + 1,
          kind: 'wrap_paragraph',
          container: 'key-number',
          reason: '段落含显著数字（%/倍/亿/万）+ 主题登记了 key-number 签名',
          confidence: 'low',
          preview: text.slice(0, 60),
        })
      }
    }
    if (b.type === 'heading2') {
      const h2Count = blocks.filter((bb) => bb.type === 'heading2').length
      if (h2Count >= 3) {
        const title = b.lines[0].replace(/^## /, '')
        patches.push({
          line: b.start + 1,
          endLine: b.end + 1,
          kind: 'wrap_section_title',
          container: 'section-title',
          reason: `文章有 ${h2Count} 个 H2——建议至少前几个升级 section-title 分节`,
          confidence: 'low',
          preview: title.slice(0, 60),
        })
      }
    }
  }

  const filtered = patches.filter((p) => has(p.container))
  const vocab = getContainerVocabulary().map((v) => ({
    name: v.name,
    category: v.category,
    fenceLength: v.fenceLength,
    description: v.description,
    example: v.example,
  }))

  return {
    patches: filtered,
    capabilitySnapshot: {
      personaId,
      defaultVariants: caps.defaultVariants,
      recommendedVariants: recommended,
      containers: caps.containers,
    },
    vocabularySubset: vocab,
    blockCount: blocks.length,
  }
}
