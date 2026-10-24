import MarkdownIt from 'markdown-it'
import markdownItContainer from 'markdown-it-container'
import {
  getContainerVocabulary,
  getRecommendedVariantsFor,
  getThemeCapabilities,
  parseFrontmatter,
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
  type: string
  tag: string
  lines: string[]
  items?: string[]
}

const VERBS = [
  '打开', '切换', '运行', '复制', '粘贴', '创建', '删除', '安装',
  '配置', '检查', '点击', '选择', '输入', '关闭', '保存', '重启',
  '设置', '导入', '导出', '提交', '推送', '拉取', '下载', '上传',
]

function startsWithInstruction(text: string): boolean {
  const instruction = text.trim().replace(/^请\s*/, '')
  return VERBS.some((verb) => {
    if (!instruction.startsWith(verb)) return false
    const object = instruction.slice(verb.length).trim()
    // Past-tense recollections are not instructions, even in a numbered list.
    return object.length > 0 && !/^[了过着]/.test(object)
  })
}

// Reuse the existing Markdown dependencies for source ranges. This scanner does
// not render or alter the authoring grammar, and avoids internal engine imports.
const scanner = new MarkdownIt({ html: true })
// The container package's bundled typings target an older markdown-it version.
scanner.use(markdownItContainer as unknown as Parameters<MarkdownIt['use']>[0], 'annotation_existing', {
  // Also protect unknown/custom fences: annotation is not a repair operation.
  validate: (params: string) => /^[\w-]+(?:\s|$)/.test(params.trim()),
})

function splitBlocks(md: string): Block[] {
  const lines = md.split(/\r?\n/)
  const { body } = parseFrontmatter(md)
  const offset = md.slice(0, md.length - body.length).split('\n').length - 1
  const tokens = scanner.parse(body, {})
  const blocks: Block[] = []

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    // A whole top-level block is the smallest safe patch unit. In particular,
    // never enter containers, blockquotes, code, HTML, or nested list paragraphs.
    if (token.level !== 0 || !token.map || token.nesting < 0 || token.type === 'inline') continue
    const start = token.map[0] + offset
    let end = token.map[1] + offset - 1
    while (end > start && !lines[end].trim()) end--
    const block: Block = {
      start, end, type: token.type, tag: token.tag,
      lines: lines.slice(start, end + 1),
    }
    if (token.type === 'ordered_list_open') {
      const children = []
      let j = i + 1
      while (j < tokens.length && tokens[j].level > token.level) children.push(tokens[j++])
      const items = children.filter((child) => child.type === 'list_item_open')
      const paragraphs = children.filter((child) => child.type === 'paragraph_open')
      // Only simple, single-paragraph items. Loose lists, nested lists, code,
      // containers and continuation paragraphs retain their original structure.
      if (
        items.length >= 3 &&
        paragraphs.length === items.length &&
        paragraphs.every((child) => child.hidden) &&
        children.every((child) =>
          ['list_item_open', 'list_item_close', 'paragraph_open', 'paragraph_close', 'inline'].includes(child.type),
        )
      ) {
        block.items = children.filter((child) => child.type === 'inline').map((child) => child.content)
      }
    }
    blocks.push(block)
  }
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

// Match authored labels at the start of a paragraph, not words occurring in
// narration, quoted speech, inline code or links. Bold labels are also common.
function hasLabel(text: string, labels: string): boolean {
  return new RegExp(`^(?:\\*\\*|__)?(?:${labels})(?:\\*\\*|__)?[：:]\\s*\\S`, 'i').test(text)
}

export function annotateMarkdown(md: string, personaId: string): AnnotateResult {
  const blocks = splitBlocks(md)
  const caps = getThemeCapabilities(personaId)
  const recommended = getRecommendedVariantsFor(personaId)
  const availableSet = new Set(caps.containers.filter((c) => c.available).map((c) => c.id))
  const patches: AnnotatePatch[] = []
  // Intro requires both an opening position and explicit summary intent. A
  // paragraph following an H2 (even the first paragraph) is section body text.
  const openingIndex = blocks[0]?.type === 'heading_open' && blocks[0].tag === 'h1' ? 1 : 0

  for (const [index, block] of blocks.entries()) {
    const text = block.lines.join(' ').trim()
    let container: string | undefined
    let reason = ''
    let kind: AnnotatePatch['kind'] = 'wrap_paragraph'

    if (block.items?.every(startsWithInstruction)) {
      container = 'steps'
      kind = 'convert_list'
      reason = `完整有序列表的 ${block.items.length} 个简单条目均以操作指令开头，可选用 steps 突出执行顺序`
    } else if (block.type === 'paragraph_open') {
      const labeledText = text.replace(/^(?:⚠️?|💡|❌)\s*/, '')
      if (hasLabel(labeledText, '危险|严重警告|danger')) {
        container = 'danger'
        reason = '段首有明确的危险标签，可选用 danger 强调风险'
      } else if (hasLabel(labeledText, '注意|警告|warning|caution')) {
        container = 'warning'
        reason = '段首有明确的注意或警告标签，可选用 warning 便于识别'
      } else if (hasLabel(labeledText, '提示|小贴士|小提示|tip')) {
        container = 'tip'
        reason = '段首有明确的提示标签，可选用 tip 区分补充建议与正文'
      } else if (index === openingIndex) {
        if (hasLabel(text, '摘要|abstract')) {
          container = 'abstract'
          reason = '开篇段落明确标为摘要，可选用 abstract 表达其概括作用'
        } else if (
          hasLabel(text, '导语|导读|内容提要') ||
          /^本文(?:将|会)?(?:介绍|探讨|解释|梳理|概述|讲解|说明|分享|讨论|总结)/.test(text)
        ) {
          container = 'intro'
          reason = '开篇段落明确介绍本文内容，可选用 intro 帮助读者建立阅读预期'
        }
        if (container) kind = 'wrap_first_paragraph'
      }
    }

    if (container && availableSet.has(container)) {
      patches.push({
        line: block.start + 1,
        endLine: block.end + 1,
        kind,
        container,
        reason,
        confidence: 'high',
        preview: text.slice(0, 60) + (text.length > 60 ? '…' : ''),
      })
    }
  }

  const vocab = getContainerVocabulary().map((v) => ({
    name: v.name,
    category: v.category,
    fenceLength: v.fenceLength,
    description: v.description,
    example: v.example,
  }))

  return {
    patches,
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
