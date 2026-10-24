/**
 * 轻量 frontmatter 解析（P0 · L2 页面局部配置）。
 *
 * 渲染配置只消费 variants / theme；发布信息独立返回，其它键报告为未知字段。
 * 严格 YAML 子集——支持 `key: value` 与一层缩进的 `key:` 嵌套对象，
 * 足够 variants slot 表达；故意不引入 yaml/gray-matter 依赖（bundle 体积 + 平台粘贴
 * 安全考虑：复杂 YAML 让作者写出 anchors / tags / multiline 反而是漂移源）。
 *
 * 失败语义：解析任何一条非法值都不抛错，记入 issues 让上层（pipeline / render API）
 * 决定 warning 还是静默——遵循"frontmatter 缺省即可"的承诺，L2 是可选层。
 */

import type { ThemeVariants, VariantKind } from '../themes/types'
import { VARIANT_IDS } from '../themes/types'

/** L2 页面级配置承载。所有字段可缺省。 */
export interface PageConfig {
  /** 页面级 variant 覆盖（按 slot 部分指定），介于 attrs.variant 与 theme.variants 之间。 */
  variants?: Partial<ThemeVariants>
  /** 页面级主题切换。覆盖 render(input.persona/theme/spec)；id 须命中已注册主题。 */
  theme?: string
}

export const PUBLICATION_FIELDS = ['title', 'digest', 'author', 'cover', 'source', 'date', 'writingStyle'] as const
export type PublicationField = typeof PUBLICATION_FIELDS[number]
export type PublicationInfo = Partial<Record<PublicationField, string>>

export interface FrontmatterParseIssue {
  path: string
  message: string
  severity: 'error' | 'warning'
}

export interface FrontmatterParseResult {
  /** 解析得到的页面配置（白名单字段） */
  config: PageConfig
  /** 发布信息不进入渲染上下文。 */
  publication: PublicationInfo
  /** 剥去 frontmatter 后的 markdown 正文 */
  body: string
  /** 解析期间发现的问题（非法 variant id / 未知主题 / 未知键 等） */
  issues: FrontmatterParseIssue[]
}

function splitFrontmatter(source: string) {
  const opening = /^\uFEFF?---[ \t]*\r?\n/.exec(source)?.[0]
  if (!opening) return null
  const rest = source.slice(opening.length)
  const closing = /^---[ \t]*(?:\r?\n|$)/m.exec(rest)
  if (!closing) return null
  return {
    opening,
    yaml: rest.slice(0, closing.index),
    closing: closing[0],
    body: rest.slice(closing.index + closing[0].length),
  }
}

/**
 * 解析 markdown 开头 `---\nyaml\n---` frontmatter。
 *
 *   - 没有 frontmatter：返回空配置、空发布信息与原文
 *   - 有 frontmatter：剥离 + 校验后返回；非法字段写 issues 不抛错
 */
export function parseFrontmatter(source: string): FrontmatterParseResult {
  const block = splitFrontmatter(source)
  if (!block) return { config: {}, publication: {}, body: source, issues: [] }

  const { body } = block
  const { tree, issues } = parseShallowYaml(block.yaml)

  const config: PageConfig = {}
  const publication: PublicationInfo = {}

  // variants: 嵌套对象
  const variantsNode = tree.variants
  if (variantsNode !== undefined) {
    if (typeof variantsNode === 'string') {
      issues.push({
        path: 'variants',
        message: 'variants 应为对象（嵌套 key: id 形式），不是标量值',
        severity: 'error',
      })
    } else {
      const validatedVariants: Partial<ThemeVariants> = {}
      for (const [key, raw] of Object.entries(variantsNode)) {
        if (typeof raw !== 'string') {
          issues.push({
            path: `variants.${key}`,
            message: '值应为 variant id 字符串',
            severity: 'error',
          })
          continue
        }
        if (!(key in VARIANT_IDS)) {
          issues.push({
            path: `variants.${key}`,
            message: `未知 variant slot "${key}"——合法值：${Object.keys(VARIANT_IDS).join(' / ')}`,
            severity: 'warning',
          })
          continue
        }
        const allowed = VARIANT_IDS[key as VariantKind] as readonly string[]
        if (!allowed.includes(raw)) {
          issues.push({
            path: `variants.${key}`,
            message: `非法 variant id "${raw}"——${key} 合法值：${allowed.join(' / ')}`,
            severity: 'warning',
          })
          continue
        }
        ;(validatedVariants as Record<string, string>)[key] = raw
      }
      if (Object.keys(validatedVariants).length > 0) config.variants = validatedVariants
    }
  }

  // theme: 标量
  const themeNode = tree.theme
  if (themeNode !== undefined) {
    if (typeof themeNode !== 'string') {
      issues.push({
        path: 'theme',
        message: 'theme 应为字符串（主题 id）',
        severity: 'error',
      })
    } else {
      config.theme = themeNode
    }
  }

  for (const key of PUBLICATION_FIELDS) {
    const value = tree[key]
    if (typeof value === 'string') publication[key] = value
    else if (value !== undefined) {
      issues.push({ path: key, message: `${key} 应为字符串（发布信息）`, severity: 'error' })
    }
  }

  for (const key of Object.keys(tree)) {
    if (key !== 'variants' && key !== 'theme' && !PUBLICATION_FIELDS.includes(key as PublicationField)) {
      issues.push({
        path: key,
        message: `未识别 frontmatter 字段 "${key}"——支持 variants / theme 及发布信息`,
        severity: 'warning',
      })
    }
  }

  return { config, publication, body, issues }
}

/** 只替换指定发布字段，保留渲染配置、未知字段和正文原文。 */
export function updatePublication(source: string, patch: Partial<PublicationInfo>): string {
  const values: Record<string, string> = {}
  for (const key of PUBLICATION_FIELDS) {
    if (typeof patch[key] === 'string') values[key] = patch[key]
  }
  return updateFrontmatterFields(source, values)
}

export function updateArticleTheme(source: string, theme: string): string {
  return updateFrontmatterFields(source, { theme })
}

function updateFrontmatterFields(source: string, patch: Readonly<Record<string, string>>): string {
  const keys = Object.keys(patch)
  if (keys.length === 0) return source
  const newline = source.includes('\r\n') ? '\r\n' : '\n'
  const block = splitFrontmatter(source)
  const fieldLine = (key: string) => `${key}: ${JSON.stringify(patch[key])}${newline}`
  if (!block) {
    const bom = source.startsWith('\uFEFF') ? '\uFEFF' : ''
    return `${bom}---${newline}${keys.map(fieldLine).join('')}---${newline}${source.slice(bom.length)}`
  }

  const remaining = new Set(keys)
  const lines = block.yaml.match(/[^\r\n]*(?:\r?\n|$)/g)?.filter(Boolean) ?? []
  const result: string[] = []
  let replacing = false
  for (const line of lines) {
    const key = KV_RE.exec(line.replace(/\r?\n$/, ''))?.[1]
    if (key && keys.includes(key)) {
      if (remaining.delete(key)) result.push(fieldLine(key))
      replacing = true
    } else if (replacing && /^[ \t]+\S/.test(line) && !line.trimStart().startsWith('#')) {
      continue
    } else {
      if (/^\S/.test(line)) replacing = false
      result.push(line)
    }
  }
  for (const key of remaining) result.push(fieldLine(key))
  return block.opening + result.join('') + block.closing + block.body
}

type ShallowYamlNode = string | Record<string, string>

interface ShallowYamlResult {
  tree: Record<string, ShallowYamlNode>
  issues: FrontmatterParseIssue[]
}

const KV_RE = /^([A-Za-z_][\w-]*)\s*:\s*(.*)$/

function unquote(s: string): string {
  const t = s.trim()
  if (t.length >= 2) {
    if (t.startsWith('"') && t.endsWith('"')) {
      try { return JSON.parse(t) as string } catch { return t.slice(1, -1) }
    }
    if (t.startsWith("'") && t.endsWith("'")) return t.slice(1, -1).replace(/''/g, "'")
  }
  return t
}

function parseShallowYaml(text: string): ShallowYamlResult {
  const tree: Record<string, ShallowYamlNode> = {}
  const issues: FrontmatterParseIssue[] = []
  const lines = text.split(/\r?\n/)

  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (!line.trim() || line.trim().startsWith('#')) {
      i++
      continue
    }
    const indent = line.match(/^(\s*)/)?.[1].length ?? 0
    if (indent > 0) {
      issues.push({
        path: `line:${i + 1}`,
        message: 'frontmatter 顶层不应缩进；嵌套对象用 `key:` 头 + 下一行缩进 2 空格',
        severity: 'warning',
      })
      i++
      continue
    }
    const m = KV_RE.exec(line)
    if (!m) {
      issues.push({
        path: `line:${i + 1}`,
        message: `无法解析（期望 \`key: value\` 形式）：${line}`,
        severity: 'warning',
      })
      i++
      continue
    }
    const key = m[1]
    const value = m[2]
    if (value.trim() === '') {
      const nested: Record<string, string> = {}
      i++
      while (i < lines.length) {
        const ln = lines[i]
        if (!ln.trim()) {
          i++
          continue
        }
        const childIndent = ln.match(/^(\s*)/)?.[1].length ?? 0
        if (childIndent === 0) break
        const cm = KV_RE.exec(ln.trim())
        if (!cm) {
          issues.push({
            path: `${key}.line:${i + 1}`,
            message: `无法解析嵌套行：${ln}`,
            severity: 'warning',
          })
          i++
          continue
        }
        nested[cm[1]] = unquote(cm[2])
        i++
      }
      tree[key] = Object.keys(nested).length === 0 && PUBLICATION_FIELDS.includes(key as PublicationField)
        ? ''
        : nested
    } else {
      tree[key] = unquote(value)
      i++
    }
  }

  return { tree, issues }
}
