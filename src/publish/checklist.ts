/**
 * 公众号发文前清单 —— 从 markdown 源码静态分析"是否准备好发"。
 *
 * 单一事实来源：PublishChecklist.vue 仅做展示，所有判定逻辑都在这里；
 * 方便单测 + 复用到 CLI / CI（未来如果做"发稿前体检"可直接复用）。
 *
 * 规则（面向公众号作者的硬约束）：
 *   1. cover-image          是否有封面图（第一张 `![](...)`）
 *   2. cover-ratio          封面比例提示（公众号支持 3.35:1 与 1:1 两档；静态源码
 *                            无法读图片尺寸，这里仅在存在封面时给提示条）
 *   3. abstract-length      摘要段（第一段非标题正文）字符数 ≤ 120
 *   4. word-count           正文字数 ≥ 400（过短文章不进"已读量高效发文"区间）
 *   5. author-declaration   ::: author 容器是否出现
 *   6. external-links       站外链接数（> 10 时提示降级方案；依赖 Stage 4 #17）
 *   7. inline-image-size    内联 base64 图片大小（总和 > 1 MB 时建议走 CDN）
 *
 * 返回值：一串 ChecklistItem，每条 { status, label, hint }；UI 按 status 着色。
 */

export type CheckStatus = 'pass' | 'warn' | 'fail' | 'info'

export interface ChecklistItem {
  id: string
  status: CheckStatus
  label: string
  hint?: string
}

export interface ChecklistReport {
  items: readonly ChecklistItem[]
  /** pass === true ⇒ 无 fail 项 */
  pass: boolean
}

const RE_IMAGE = /!\[[^\]]*\]\(([^)\s]+)(?:\s"[^"]*")?\)/g
const RE_HTTP_LINK = /\[[^\]]+\]\((https?:\/\/[^)\s]+)(?:\s"[^"]*")?\)/g
const RE_AUTHOR_CONTAINER = /^:::\s*author\b/m
const RE_HEADING = /^#{1,6}\s+/
const RE_CJK = /[\u4e00-\u9fff\u3400-\u4dbf]/g

const ABSTRACT_MAX = 120
const MIN_WORD_COUNT = 400
const EXTERNAL_LINK_WARN = 10
const INLINE_IMAGE_WARN_BYTES = 1024 * 1024

/**
 * 扫描 markdown 源码，返回逐条检查结果。
 * 不抛异常；空稿返回"空稿"提示条而不是全红。
 */
export function buildChecklist(source: string): ChecklistReport {
  const items: ChecklistItem[] = []

  if (!source || !source.trim()) {
    items.push({
      id: 'empty',
      status: 'fail',
      label: '正文为空',
      hint: '请至少写一段内容再发稿。',
    })
    return { items, pass: false }
  }

  // 1/2. 封面图
  const firstImage = findFirstImageUrl(source)
  if (firstImage) {
    items.push({
      id: 'cover-image',
      status: 'pass',
      label: '已有封面图',
      hint: firstImage.length > 60 ? firstImage.slice(0, 57) + '…' : firstImage,
    })
    items.push({
      id: 'cover-ratio',
      status: 'info',
      label: '封面比例',
      hint: '公众号支持 3.35:1（1200×358）与 1:1（900×900）两档；发稿前在素材库核对。',
    })
  } else {
    items.push({
      id: 'cover-image',
      status: 'warn',
      label: '未检测到封面图',
      hint: '建议在首段前放一张 `![封面](...)` ；公众号列表页会自动取第一张图。',
    })
  }

  // 3. 摘要段长度
  const abstract = extractFirstProseParagraph(source)
  const abstractLen = abstract.length
  if (abstractLen === 0) {
    items.push({
      id: 'abstract-length',
      status: 'warn',
      label: '未找到摘要段',
      hint: '建议首段写一段 ≤ 120 字的导语，作为公众号摘要抓取候选。',
    })
  } else if (abstractLen <= ABSTRACT_MAX) {
    items.push({
      id: 'abstract-length',
      status: 'pass',
      label: `摘要段 ${abstractLen} 字（≤ ${ABSTRACT_MAX}）`,
    })
  } else {
    items.push({
      id: 'abstract-length',
      status: 'warn',
      label: `摘要段偏长：${abstractLen} 字（建议 ≤ ${ABSTRACT_MAX}）`,
      hint: '公众号列表页预览至多 120 字，过长会被截断。',
    })
  }

  // 4. 正文字数
  const wordCount = countWords(source)
  items.push({
    id: 'word-count',
    status: wordCount >= MIN_WORD_COUNT ? 'pass' : 'warn',
    label: `正文 ${wordCount} 字`,
    hint:
      wordCount >= MIN_WORD_COUNT
        ? undefined
        : `短于 ${MIN_WORD_COUNT} 字，公众号"深阅读"率会明显偏低。`,
  })

  // 5. 原创声明（author 容器）
  const hasAuthor = RE_AUTHOR_CONTAINER.test(source)
  items.push({
    id: 'author-declaration',
    status: hasAuthor ? 'pass' : 'info',
    label: hasAuthor ? '已声明作者（::: author）' : '未声明作者',
    hint: hasAuthor
      ? undefined
      : '原创文章建议加 `::: author` 容器写署名；无此容器也可在公众号后台单独勾选"原创"。',
  })

  // 6. 站外链接数
  const externalCount = countExternalLinks(source)
  if (externalCount === 0) {
    items.push({ id: 'external-links', status: 'pass', label: '无站外链接' })
  } else if (externalCount <= EXTERNAL_LINK_WARN) {
    items.push({
      id: 'external-links',
      status: 'info',
      label: `站外链接 ${externalCount} 条`,
      hint: '公众号不支持站外跳转，发文时需在文末二维码长图 / 原文链接里引导。',
    })
  } else {
    items.push({
      id: 'external-links',
      status: 'warn',
      label: `站外链接过多：${externalCount} 条`,
      hint: '建议降级：保留 3-5 条核心链接，其余改为文末"相关阅读"列表。',
    })
  }

  // 7. 内联图片体积
  const inlineBytes = estimateInlineImageBytes(source)
  if (inlineBytes === 0) {
    // 作者未粘贴 base64 图片（多半是 http 图），不显示该行
  } else if (inlineBytes < INLINE_IMAGE_WARN_BYTES) {
    items.push({
      id: 'inline-image-size',
      status: 'pass',
      label: `内联 base64 图片约 ${formatBytes(inlineBytes)}`,
    })
  } else {
    items.push({
      id: 'inline-image-size',
      status: 'warn',
      label: `内联 base64 图片偏大：${formatBytes(inlineBytes)}`,
      hint: '公众号单图上限 10 MB；接近上限前建议改走 CDN provider，减少草稿体积。',
    })
  }

  return {
    items,
    pass: items.every((i) => i.status !== 'fail'),
  }
}

function findFirstImageUrl(source: string): string | null {
  RE_IMAGE.lastIndex = 0
  const m = RE_IMAGE.exec(source)
  return m ? m[1] : null
}

/**
 * 第一段"正文"——跳过所有 `# heading`、空行、`::: container` 边界行，
 * 取第一段连续非空行拼接后的字符数（按 CJK 字符 + 英文单词数粗估）。
 */
function extractFirstProseParagraph(source: string): string {
  const lines = source.split(/\r?\n/)
  let inFence = false
  let inContainer = 0
  const buf: string[] = []
  for (const rawLine of lines) {
    const line = rawLine.trimEnd()
    if (/^```/.test(line)) {
      inFence = !inFence
      if (buf.length > 0) break
      continue
    }
    if (inFence) continue
    if (/^:{3,}\s*$/.test(line)) {
      inContainer = Math.max(0, inContainer - 1)
      continue
    }
    if (/^:{3,}\s+[A-Za-z]/.test(line)) {
      inContainer++
      continue
    }
    if (inContainer > 0) continue
    if (!line.trim()) {
      if (buf.length > 0) break
      continue
    }
    if (RE_HEADING.test(line)) {
      if (buf.length > 0) break
      continue
    }
    buf.push(line)
  }
  return buf.join('').replace(/\s+/g, '')
}

/** 与 pipeline 同款字数统计：CJK 按字，ASCII 按空白切分词。 */
function countWords(s: string): number {
  const cjk = (s.match(RE_CJK) ?? []).length
  const enWords = s
    .replace(RE_CJK, ' ')
    .split(/\s+/)
    .filter(Boolean).length
  return cjk + enWords
}

function countExternalLinks(source: string): number {
  RE_HTTP_LINK.lastIndex = 0
  let count = 0
  while (RE_HTTP_LINK.exec(source) !== null) count++
  return count
}

/**
 * base64 内联图片体积估计：每个 `data:image/*;base64,XXX` 的 XXX 长度 × 3/4
 * ≈ 原字节数。精度足够给作者"有没有接近上限"的直观感。
 */
function estimateInlineImageBytes(source: string): number {
  const re = /data:image\/[a-z+]+;base64,([A-Za-z0-9+/=]+)/g
  let total = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(source)) !== null) {
    total += Math.floor((m[1].length * 3) / 4)
  }
  return total
}

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / 1024 / 1024).toFixed(2)} MB`
}
