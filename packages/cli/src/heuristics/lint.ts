import {
  getContainerVocabulary,
  getPersona,
  getThemeCapabilities,
  parseFrontmatter,
} from '../../../../src/public'

export type LintIssueKind =
  | 'unknown_container'
  | 'unexpected_jsx_attrs'
  | 'html_comment_variant'
  | 'fence_not_closed'
  | 'nesting_depth'
  | 'inline_unclosed'
  | 'wrong_theme_namespace'
  | 'frontmatter_invalid'

export interface LintIssue {
  line: number
  kind: LintIssueKind
  severity: 'error' | 'warning'
  name?: string
  hint: string
  excerpt: string
}

export interface LintReport {
  ok: boolean
  issues: LintIssue[]
  count: number
  errorCount: number
  warningCount: number
  effectivePersona?: string
  personaSource: 'frontmatter' | 'flag' | 'none'
}

interface ThemeContext {
  effectivePersonaId?: string
  source: LintReport['personaSource']
  availableContainers: Set<string>
  unavailableThemeContainers: Map<string, string>
}

function buildThemeContext(
  frontmatterTheme: string | undefined,
  cliPersona: string | undefined,
): ThemeContext {
  let effectivePersonaId: string | undefined
  let source: ThemeContext['source'] = 'none'
  if (frontmatterTheme) {
    try {
      getPersona(frontmatterTheme)
      effectivePersonaId = frontmatterTheme
      source = 'frontmatter'
    } catch {
      // 未知 id：下游 frontmatter_invalid 兜底；此处静默回退
    }
  }
  if (!effectivePersonaId && cliPersona) {
    try {
      getPersona(cliPersona)
      effectivePersonaId = cliPersona
      source = 'flag'
    } catch {
      // 未知 --persona：静默回退；走纯语法 lint
    }
  }

  const available = new Set<string>()
  const unavailableTheme = new Map<string, string>()
  if (effectivePersonaId) {
    const caps = getThemeCapabilities(effectivePersonaId)
    for (const c of caps.containers) {
      if (c.available) available.add(c.id)
      else if (c.namespace === 'theme') unavailableTheme.set(c.id, c.pack)
    }
  }
  return {
    effectivePersonaId,
    source,
    availableContainers: available,
    unavailableThemeContainers: unavailableTheme,
  }
}

function checkInlineExtensions(line: string, lineNo: number, issues: LintIssue[]) {
  if (/^:{3,}/.test(line)) return
  if (/^ {4}/.test(line)) return

  const dotOpens = (line.match(/\[\./g) || []).length
  const dotCloses = (line.match(/\.\]/g) || []).length
  if (dotOpens !== dotCloses) {
    issues.push({
      line: lineNo,
      kind: 'inline_unclosed',
      severity: 'error',
      hint: `[.着重.] 标记不闭合（[. ${dotOpens} 个，.] ${dotCloses} 个）`,
      excerpt: line.slice(0, 80),
    })
  }
  const waveOpens = (line.match(/\[~/g) || []).length
  const waveCloses = (line.match(/~\]/g) || []).length
  if (waveOpens !== waveCloses) {
    issues.push({
      line: lineNo,
      kind: 'inline_unclosed',
      severity: 'error',
      hint: `[~波浪~] 标记不闭合（[~ ${waveOpens} 个，~] ${waveCloses} 个）`,
      excerpt: line.slice(0, 80),
    })
  }
  const stripped = line.replace(/\[~[^\]]*~\]/g, '')
  const eqCount = (stripped.match(/==/g) || []).length
  if (eqCount % 2 !== 0) {
    issues.push({
      line: lineNo,
      kind: 'inline_unclosed',
      severity: 'error',
      hint: `==高亮== 标记不闭合（== ${eqCount} 个，应为偶数）`,
      excerpt: line.slice(0, 80),
    })
  }
}

function lintBody(md: string, themeCtx: ThemeContext): LintIssue[] {
  const issues: LintIssue[] = []
  const vocab = getContainerVocabulary()
  const known = new Map(vocab.map((v) => [v.name, v]))
  const lines = md.split(/\r?\n/)
  const stack: Array<{ name: string; length: number; line: number }> = []

  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i]

    const openMatch = ln.match(/^(:{3,})\s*([a-zA-Z][\w-]*)\b\s*(.*)$/)
    if (openMatch) {
      const fenceLen = openMatch[1].length
      const name = openMatch[2]
      const rest = openMatch[3]
      const spec = known.get(name)
      if (!spec) {
        issues.push({
          line: i + 1,
          kind: 'unknown_container',
          severity: 'error',
          name,
          hint: `"${name}" 不在 vocabulary 白名单内。用 \`wechat-typeset containers list\` 查全集。`,
          excerpt: ln,
        })
      } else if (spec.fenceLength && spec.fenceLength !== fenceLen) {
        if (spec.fenceLength === 4 && fenceLen === 3) {
          issues.push({
            line: i + 1,
            kind: 'nesting_depth',
            severity: 'error',
            name,
            hint: `"${name}" 必须用 4 个冒号（::::）外层 fence`,
            excerpt: ln,
          })
        }
      }
      if (spec && themeCtx.effectivePersonaId && themeCtx.unavailableThemeContainers.has(name)) {
        const pack = themeCtx.unavailableThemeContainers.get(name)!
        const themeOwner = pack.slice('theme:'.length)
        issues.push({
          line: i + 1,
          kind: 'wrong_theme_namespace',
          severity: 'warning',
          name,
          hint:
            `"${name}" 属于 ${pack}（${themeOwner} 主题专属），` +
            `当前主题 "${themeCtx.effectivePersonaId}" 不启用——渲染仍出 HTML，但走 token 中性兜底，失去主题签名视觉。` +
            `切到 ${themeOwner} 或改用 base / pack:editorial 的替代容器。`,
          excerpt: ln,
        })
      }
      if (/\{[^}]*=[^}]*\}/.test(rest)) {
        issues.push({
          line: i + 1,
          kind: 'unexpected_jsx_attrs',
          severity: 'error',
          name,
          hint: 'open 行不接受 {key="value"} JSX 语法；改写成 key=value 直接在 name 之后',
          excerpt: ln,
        })
      }
      stack.push({ name, length: fenceLen, line: i + 1 })
      continue
    }

    const closeMatch = ln.match(/^(:{3,})\s*$/)
    if (closeMatch) {
      const fenceLen = closeMatch[1].length
      for (let j = stack.length - 1; j >= 0; j--) {
        if (stack[j].length === fenceLen) {
          stack.splice(j, 1)
          break
        }
      }
      continue
    }

    if (/<!--\s*variant\s*=/.test(ln)) {
      issues.push({
        line: i + 1,
        kind: 'html_comment_variant',
        severity: 'error',
        hint: 'HTML 注释中的 variant=... 不会被解析；删注释，写到 ::: open 行',
        excerpt: ln,
      })
    }
    checkInlineExtensions(ln, i + 1, issues)
  }

  for (const open of stack) {
    issues.push({
      line: open.line,
      kind: 'fence_not_closed',
      severity: 'error',
      name: open.name,
      hint: `${':'.repeat(open.length)} ${open.name} 未闭合——补一行同长度的 ${':'.repeat(open.length)}`,
      excerpt: '(missing close fence)',
    })
  }

  return issues
}

export function lintMarkdown(md: string, persona?: string): LintReport {
  const fm = parseFrontmatter(md)
  const themeCtx = buildThemeContext(fm.config.theme, persona)
  const issues = lintBody(fm.body, themeCtx)

  for (const fi of fm.issues) {
    issues.push({
      line: 1,
      kind: 'frontmatter_invalid',
      severity: fi.severity,
      hint: `frontmatter.${fi.path}: ${fi.message}`,
      excerpt: '---\\n... frontmatter ...\\n---',
    })
  }
  if (fm.config.theme && themeCtx.source !== 'frontmatter') {
    issues.push({
      line: 1,
      kind: 'frontmatter_invalid',
      severity: 'warning',
      hint: `frontmatter.theme="${fm.config.theme}" 未在已注册主题中——pipeline 会回退到 input persona / 默认主题`,
      excerpt: `theme: ${fm.config.theme}`,
    })
  }

  const errorCount = issues.filter((i) => i.severity === 'error').length
  const warningCount = issues.length - errorCount
  return {
    ok: errorCount === 0,
    issues,
    count: issues.length,
    errorCount,
    warningCount,
    effectivePersona: themeCtx.effectivePersonaId,
    personaSource: themeCtx.source,
  }
}
