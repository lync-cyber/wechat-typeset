import MarkdownIt from 'markdown-it'
import markdownItContainer from 'markdown-it-container'
import type Token from 'markdown-it/lib/token.mjs'
import type { RuleInline } from 'markdown-it/lib/parser_inline.mjs'
// @ts-expect-error markdown-it 未发布此原生规则的声明，下方以 RuleInline 限定签名。
import nativeBackticks from 'markdown-it/lib/rules_inline/backticks.mjs'
import { parseFrontmatter } from '../../core/pipeline/frontmatter'
import { parseInfo } from '../../core/pipeline/containers/types'
import { CONTAINER_NAMES } from '../../core/vocabulary/vocabulary'
import { DEFAULT_WRITING_STYLE, type WritingStyle } from './writingStyles'

export interface StyleIssue {
  id: string
  line: number
  status: 'info' | 'warn'
  message: string
}

interface PlainText { text: string; lines: number[] }
interface Sentence { text: string; line: number; lines: number[] }
interface Paragraph { text: string; line: number; from: number; to: number; sentences: Sentence[] }
interface ImageReference { path: string; line: number; captioned: boolean }

const parser = new MarkdownIt({ html: false })
const containerPlugin = markdownItContainer as unknown as (md: MarkdownIt, name: string) => void
for (const name of CONTAINER_NAMES) parser.use(containerPlugin, name)
// markdown-it 会把行内代码的换行规范化为空格；保留源换行数供定位使用。
const backticks: RuleInline = nativeBackticks
parser.inline.ruler.at('backticks', (state, silent) => {
  const start = state.pos
  const count = state.tokens.length
  const matched = backticks(state, silent)
  const token = state.tokens[state.tokens.length - 1]
  if (!silent && state.tokens.length > count && token?.type === 'code_inline') {
    token.meta = { sourceLineBreaks: (state.src.slice(start, state.pos).match(/\n/g) ?? []).length }
  }
  return matched
})

function skippedLineBreaks(token: Token): number {
  return token.type === 'code_inline' ? Number(token.meta?.sourceLineBreaks ?? 0)
    : (token.content.match(/\n/g) ?? []).length
}

function plainInline(tokens: readonly Token[], firstLine: number): PlainText {
  let line = firstLine
  let text = ''
  const lines: number[] = []
  for (const token of tokens) {
    if (token.type === 'softbreak' || token.type === 'hardbreak') {
      text += '\n'
      lines.push(line++)
    } else if (token.type === 'text') {
      text += token.content
      for (const char of token.content) {
        for (let i = 0; i < char.length; i++) lines.push(line)
        if (char === '\n') line++
      }
    } else if (token.type === 'code_inline' || token.type === 'image' || token.type === 'html_inline') {
      text += ' '
      lines.push(line)
      line += skippedLineBreaks(token)
    }
  }
  return { text, lines }
}

function sentences(plain: PlainText): Sentence[] {
  const result: Sentence[] = []
  let start = 0
  const add = (end: number) => {
    const raw = plain.text.slice(start, end)
    const leading = raw.length - raw.trimStart().length
    if (raw.trim()) result.push({
      text: raw.trim(), line: plain.lines[start + leading],
      lines: plain.lines.slice(start + leading, end - (raw.length - raw.trimEnd().length)),
    })
    start = end
  }
  for (let i = 0; i < plain.text.length; i++) {
    const char = plain.text[i]
    if ('。！？!?'.includes(char) || (char === '.' && (!plain.text[i + 1] || /\s/.test(plain.text[i + 1])))) {
      while (i + 1 < plain.text.length && '。！？!?”’」』）)'.includes(plain.text[i + 1])) i++
      add(i + 1)
    }
  }
  add(plain.text.length)
  return result
}

function literalHits(text: string, parts: string[]): number[] {
  if (!parts.length) return []
  const hits: number[] = []
  let from = 0
  while (from < text.length) {
    const start = text.indexOf(parts[0], from)
    if (start < 0) break
    let end = start + parts[0].length
    let matched = true
    for (const part of parts.slice(1)) {
      const found = text.indexOf(part, end)
      if (found < 0) { matched = false; break }
      end = found + part.length
    }
    if (!matched) break
    hits.push(start)
    from = end
  }
  return hits
}

function captionText(token: Token | undefined): boolean {
  if (!token || token.type !== 'inline') return false
  const text = plainInline(token.children ?? [], 1).text.trim()
  return /^图\s*\d*\s*[:：.、·｜|\s]/.test(text)
    || /^图片[：:\s]/.test(text)
    || (/^\s*([*_])[^*_][\s\S]*\1\s*$/.test(token.content) && !!text)
}

function inlineCaption(tokens: readonly Token[], imageIndex: number): boolean {
  const following = tokens.slice(imageIndex + 1)
  if (!['softbreak', 'hardbreak'].includes(following[0]?.type)) return false
  const lineEnd = following.findIndex((token, index) => index > 0 && ['softbreak', 'hardbreak'].includes(token.type))
  const caption = following.slice(1, lineEnd < 0 ? undefined : lineEnd)
  return caption[0]?.type === 'em_open' && caption[caption.length - 1]?.type === 'em_close'
    && !!plainInline(caption, 1).text.trim()
}

function bodyCaption(tokens: readonly Token[], index: number): boolean {
  let depth = 1
  for (let i = index + 1; i < tokens.length; i++) {
    const token = tokens[i]
    if (/^container_.+_open$/.test(token.type)) depth++
    if (/^container_.+_close$/.test(token.type) && --depth === 0) break
    if (depth === 1 && token.type === 'inline' && plainInline(token.children ?? [], 1).text.trim()) return true
  }
  return false
}

function analyze(source: string) {
  const { body } = parseFrontmatter(source)
  const lineOffset = source.slice(0, source.length - body.length).split('\n').length - 1
  const sourceLines = body.split(/\r?\n/)
  const tokens = parser.parse(body, {})
  const paragraphs: Paragraph[] = []
  const images: ImageReference[] = []
  const allSentences: Sentence[] = []
  const allText: string[] = []
  const containers: { name: string; captioned: boolean }[] = []
  let nonProseDepth = 0
  let tableRow: [number, number] | null = null
  let referenceLevel: number | null = null
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    if (token.type === 'heading_open' && token.level === 0) {
      const level = Number(token.tag.slice(1))
      if (referenceLevel !== null && level <= referenceLevel) referenceLevel = null
      const title = plainInline(tokens[i + 1]?.children ?? [], 1).text.trim()
      if (referenceLevel === null && /^(延伸阅读|参考资料|参考文献|资料来源)$/.test(title)) referenceLevel = level
    }
    if (referenceLevel !== null) continue
    if (token.type === 'tr_open') tableRow = token.map
    if (token.type === 'tr_close') tableRow = null
    if (['blockquote_open', 'bullet_list_open', 'ordered_list_open'].includes(token.type)) nonProseDepth++
    if (['blockquote_close', 'bullet_list_close', 'ordered_list_close'].includes(token.type)) nonProseDepth--
    const container = /^container_(.+)_(open|close)$/.exec(token.type)
    if (container) {
      const name = container[1]
      if (container[2] === 'close') { containers.pop(); continue }
      const { title, attrs } = parseInfo(token.info.trim().slice(name.length))
      const captioned = !!title || (name === 'image-caption' && bodyCaption(tokens, i))
      containers.push({ name, captioned })
      if (['image-caption', 'image-item', 'cover'].includes(name) && attrs.src && token.map) {
        images.push({ path: attrs.src, line: token.map[0] + lineOffset + 1, captioned })
      }
      continue
    }
    const map = token.map ?? tableRow
    if (token.type !== 'inline' || !map) continue
    const firstLine = map[0] + lineOffset + 1
    const plain = plainInline(token.children ?? [], firstLine)
    const split = sentences(plain)
    allText.push(plain.text)
    allSentences.push(...split)
    const nextParagraph = tokens[i + 2]?.type === 'paragraph_open' ? tokens[i + 3] : undefined
    const imageContainer = containers.slice().reverse().find((container) => ['image-caption', 'image-item', 'cover'].includes(container.name))
    const captioned = (imageContainer?.name === 'image-caption' && imageContainer.captioned)
      || captionText(token) || captionText(nextParagraph)
    let imageLine = firstLine
    let hasImage = false
    for (const [index, child] of (token.children ?? []).entries()) {
      if (child.type === 'softbreak' || child.type === 'hardbreak') imageLine++
      if (child.type === 'image') {
        hasImage = true
        images.push({ path: child.attrGet('src') ?? '', line: imageLine, captioned: captioned || inlineCaption(token.children ?? [], index) })
      }
      if (child.type === 'image' || child.type === 'code_inline' || child.type === 'html_inline') imageLine += skippedLineBreaks(child)
    }
    if (plain.text.trim() && !hasImage && !nonProseDepth && tokens[i - 1]?.type === 'paragraph_open'
      && !containers.some((container) => container.name === 'image-caption')) {
      paragraphs.push({ text: plain.text, line: firstLine, from: map[0], to: map[1], sentences: split })
    }
  }
  return { paragraphs, images, allSentences, sourceLines, text: allText.join('\n'), firstLine: lineOffset + 1 }
}

export function checkStyle(source: string, style: WritingStyle = DEFAULT_WRITING_STYLE): StyleIssue[] {
  const content = analyze(source)
  if (!content.text.trim() && !content.images.length) return []
  const issues: StyleIssue[] = []
  const rules = style.rules
  for (const [index, phrase] of [...new Set(rules.phrases.map((item) => item.trim()).filter(Boolean))].entries()) {
    let count = 0
    let line = 0
    for (const sentence of content.allSentences) {
      const hits = literalHits(sentence.text, [phrase])
      if (hits.length && !line) line = sentence.lines[hits[0]]
      count += hits.length
    }
    if (count) issues.push({ id: `style-phrase-${index}`, line, status: 'warn', message: `套话「${phrase}」出现 ${count} 次，可换成具体事实。` })
  }
  for (const [index, pattern] of [...new Set(rules.patterns.map((item) => item.trim()).filter(Boolean))].entries()) {
    const parts = pattern.split(/…+|\.{3,}|⋯+/).map((part) => part.trim()).filter(Boolean)
    let count = 0
    let line = 0
    for (const sentence of content.allSentences) {
      const hits = literalHits(sentence.text, parts)
      if (hits.length && !line) line = sentence.lines[hits[0]]
      count += hits.length
    }
    if (count) issues.push({
      id: `style-pattern-${index}`, line, status: count > rules.patternTolerance ? 'warn' : 'info',
      message: `句式「${pattern}」出现 ${count} 次，当前风格允许 ${rules.patternTolerance} 次。`,
    })
  }
  content.allSentences.forEach((sentence, index) => {
    const length = Array.from(sentence.text.replace(/[^\p{L}\p{N}]/gu, '')).length
    if (length > 80) issues.push({ id: `style-long-${index}`, line: sentence.line, status: 'warn', message: `这一句有 ${length} 字，超过 80 字，可检查是否需要拆分。` })
  })
  let run: Paragraph[] = []
  const flushRun = () => {
    if (run.length >= 3) issues.push({ id: `style-paragraph-${run[0].line}`, line: run[0].line, status: 'info', message: `连续 ${run.length} 段只有一句话，可检查是否适合合并。` })
    run = []
  }
  for (const paragraph of content.paragraphs) {
    if (run.length && content.sourceLines.slice(run[run.length - 1].to, paragraph.from).some((line) => line.trim())) flushRun()
    if (paragraph.sentences.length === 1) run.push(paragraph)
    else flushRun()
  }
  flushRun()
  content.images.forEach((image, index) => {
    if (!image.captioned) issues.push({ id: `style-caption-${index}`, line: image.line, status: 'warn', message: `图片缺少可见图注：${image.path.startsWith('data:') ? '内联图片' : image.path}` })
  })
  const words = (content.text.match(/[\u3400-\u9fff\uf900-\ufaff]/g) ?? []).length
    + (content.text.match(/[A-Za-z0-9][A-Za-z0-9.'%-]*/g) ?? []).length
  if (words < rules.minWords || words > rules.maxWords) issues.push({
    id: 'style-word-count', line: content.firstLine, status: 'warn',
    message: `正文约 ${words} 字，当前风格目标 ${rules.minWords}—${rules.maxWords} 字（不含代码与参考资料）。`,
  })
  if (content.images.length < rules.minImages || content.images.length > rules.maxImages) issues.push({
    id: 'style-image-count', line: content.images[0]?.line ?? content.firstLine, status: 'info',
    message: `正文有 ${content.images.length} 张图片，当前风格目标 ${rules.minImages}—${rules.maxImages} 张。`,
  })
  return issues.sort((a, b) => a.line - b.line)
}
