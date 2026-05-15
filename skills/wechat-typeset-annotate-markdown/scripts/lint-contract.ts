#!/usr/bin/env tsx
/**
 * lint-contract —— 契约 md 静态校验（含主题敏感检查）。
 *
 * 检查项：
 *   - fence 名是否在 vocabulary 白名单内（unknown_container · error）
 *   - JSX 风格 attrs {variant="x"}（unexpected_jsx_attrs · error）
 *   - HTML 注释 variant `<!-- variant=x -->`（html_comment_variant · error）
 *   - fence 闭合（同长度配对，fence_not_closed · error）
 *   - 嵌套深度（compare/toc 等外层应 :::: 4 个冒号，nesting_depth · error）
 *   - 行内扩展闭合（[.着重.] / [~波浪~] / `~~` / `++` / `==`，inline_unclosed · error）
 *   - **主题敏感**：theme:* 容器跨主题使用（wrong_theme_namespace · warning，不阻塞）
 *   - **frontmatter**：variants 非法 id / 未知 slot（frontmatter_invalid · warning）
 *
 * 主题来源（按优先级）：
 *   1. frontmatter `theme:` 字段（首选——markdown 自描述）
 *   2. `--persona <id>` 旗标
 *   3. 都没有 → 跳过主题敏感检查（仅做语法 lint）
 *
 * 用法：
 *   tsx lint-contract.ts <md> [--persona <id>] [--json]
 *
 * 退出码：
 *   0 没有 error（warnings 不阻塞）
 *   1 IO 错
 *   2 有 error（ok=false）
 */

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  getContainerVocabulary,
  getPersona,
  getThemeCapabilities,
} from '../../../src/public'
import { parseFrontmatter } from '../../../src/core/pipeline/frontmatter'

interface Issue {
  line: number
  kind:
    | 'unknown_container'
    | 'unexpected_jsx_attrs'
    | 'html_comment_variant'
    | 'fence_not_closed'
    | 'nesting_depth'
    | 'inline_unclosed'
    | 'fence_attr_yaml'
    | 'wrong_theme_namespace'
    | 'frontmatter_invalid'
  severity: 'error' | 'warning'
  name?: string
  hint: string
  excerpt: string
}

/** 主题敏感检查上下文。effectivePersonaId 未定义 = 跳过主题级检查，仅做语法 lint。 */
interface ThemeContext {
  effectivePersonaId?: string
  source: 'frontmatter' | 'flag' | 'none'
  /** 主题下可用的容器 fence 名集合（任何 namespace 视角）；未启用的会被警告 */
  availableContainers: Set<string>
  /** theme:* 命名空间下未启用的容器 → 用于精准描述 warning */
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
      // frontmatter.theme 未知 id：下游 frontmatter_invalid issue 会兜底报告；此处不抛
    }
  }
  if (!effectivePersonaId && cliPersona) {
    try {
      getPersona(cliPersona)
      effectivePersonaId = cliPersona
      source = 'flag'
    } catch {
      // --persona 未知：让上层 parseArgs 之外的逻辑也兜得住——这里静默回退
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

function lint(md: string, themeCtx: ThemeContext): Issue[] {
  const issues: Issue[] = []
  const vocab = getContainerVocabulary()
  const known = new Map(vocab.map((v) => [v.name, v]))
  const lines = md.split(/\r?\n/)

  // fence 栈：跟踪打开但未闭合的 fence（name + length + line）
  const stack: Array<{ name: string; length: number; line: number }> = []

  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i]

    // open 行：`:::name attrs` 或 `:::: name attrs`
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
          hint:
            `"${name}" 不在 vocabulary 白名单内。合法名见 ../_shared/references/container-vocabulary.md`,
          excerpt: ln,
        })
      } else if (spec.fenceLength && spec.fenceLength !== fenceLen) {
        // compare / toc / kpi-dashboard / bar-chart 强制外层 4 个冒号
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

      // 主题敏感：theme:* 容器跨主题使用（warning，不阻塞——renderer 仍能出 HTML）
      if (
        spec &&
        themeCtx.effectivePersonaId &&
        themeCtx.unavailableThemeContainers.has(name)
      ) {
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
            `想要签名视觉请切到 ${themeOwner}，或改用 base / pack:editorial 中的替代容器。`,
          excerpt: ln,
        })
      }

      // JSX 风格 attrs
      if (/\{[^}]*=[^}]*\}/.test(rest)) {
        issues.push({
          line: i + 1,
          kind: 'unexpected_jsx_attrs',
          severity: 'error',
          name,
          hint:
            'open 行不接受 {key="value"} JSX 语法；改写成 key=value 直接在 name 之后',
          excerpt: ln,
        })
      }

      stack.push({ name, length: fenceLen, line: i + 1 })
      continue
    }

    // close 行：`:::` 或 `::::`（无 name，纯冒号）
    const closeMatch = ln.match(/^(:{3,})\s*$/)
    if (closeMatch) {
      const fenceLen = closeMatch[1].length
      // 找到最近的同长度未闭合 fence
      for (let j = stack.length - 1; j >= 0; j--) {
        if (stack[j].length === fenceLen) {
          stack.splice(j, 1)
          break
        }
      }
      continue
    }

    // HTML 注释 variant
    if (/<!--\s*variant\s*=/.test(ln)) {
      issues.push({
        line: i + 1,
        kind: 'html_comment_variant',
        severity: 'error',
        hint: 'HTML 注释中的 variant=... 不会被解析；删注释，写到 ::: open 行',
        excerpt: ln,
      })
    }

    // 行内扩展闭合
    checkInlineExtensions(ln, i + 1, issues)
  }

  // 未闭合的 fence
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

function checkInlineExtensions(line: string, lineNo: number, issues: Issue[]) {
  // 跳过 `:::` fence 行
  if (/^:{3,}/.test(line)) return
  // 跳过代码块行（粗略：以 4 个空格开头或单行内带 `` ` ``）
  if (/^ {4}/.test(line)) return

  // [.着重.]：成对出现
  const dotMarks = line.match(/\[\.([^\]]*)\]/g)
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
  // [~波浪~]
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
  // ==高亮== / ~~删除~~ / ++插入++：必须成对（偶数次出现）
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

  void dotMarks
}

interface CliArgs {
  mdPath: string
  persona?: string
  json: boolean
}

function parseArgs(argv: string[]): CliArgs {
  const args = argv.slice(2)
  let mdPath: string | undefined
  let persona: string | undefined
  let json = false
  for (let i = 0; i < args.length; i++) {
    const a = args[i]
    if (a === '--json') {
      json = true
      continue
    }
    if (a === '--persona') {
      const v = args[i + 1]
      if (!v || v.startsWith('--')) fail(1, '--persona expects a value')
      persona = v
      i++
      continue
    }
    if (a === '--input') {
      const v = args[i + 1]
      if (!v || v.startsWith('--')) fail(1, '--input expects a value')
      mdPath = v
      i++
      continue
    }
    if (a.startsWith('--')) fail(1, `unknown flag "${a}"`)
    if (!mdPath) mdPath = a
  }
  if (!mdPath) fail(1, 'usage: tsx lint-contract.ts <md|--input md> [--persona id] [--json]')
  return { mdPath, persona, json }
}

function main() {
  const args = parseArgs(process.argv)

  let raw: string
  try {
    raw = readFileSync(resolve(process.cwd(), args.mdPath), 'utf8')
  } catch (e) {
    fail(1, `failed to read: ${(e as Error).message}`)
  }

  // 解析 frontmatter：取 theme 与 variants（variants 非法 / 未知 slot 透传成 warning）
  const fm = parseFrontmatter(raw)
  const themeCtx = buildThemeContext(fm.config.theme, args.persona)

  const bodyOnly = fm.body
  const issues = lint(bodyOnly, themeCtx)

  // 把 frontmatter 自己的解析问题翻译成 lint issues（severity warning）
  for (const fi of fm.issues) {
    issues.push({
      line: 1,
      kind: 'frontmatter_invalid',
      severity: fi.severity,
      hint: `frontmatter.${fi.path}: ${fi.message}`,
      excerpt: '---\\n... frontmatter ...\\n---',
    })
  }
  // frontmatter.theme 未知 id：上游 buildThemeContext 已静默回退；这里若用户写了 theme 但仍未生效，再补一条 warning
  if (fm.config.theme && themeCtx.source !== 'frontmatter') {
    issues.push({
      line: 1,
      kind: 'frontmatter_invalid',
      severity: 'warning',
      hint: `frontmatter.theme="${fm.config.theme}" 未在已注册主题中——pipeline 会回退到 --persona / 默认主题`,
      excerpt: `theme: ${fm.config.theme}`,
    })
  }

  const errors = issues.filter((i) => i.severity === 'error')
  const warnings = issues.filter((i) => i.severity === 'warning')
  const ok = errors.length === 0

  if (args.json) {
    process.stdout.write(
      JSON.stringify(
        {
          ok,
          issues,
          count: issues.length,
          error_count: errors.length,
          warning_count: warnings.length,
          effective_persona: themeCtx.effectivePersonaId,
          persona_source: themeCtx.source,
        },
        null,
        2,
      ) + '\n',
    )
  } else {
    const themeNote = themeCtx.effectivePersonaId
      ? `[persona=${themeCtx.effectivePersonaId} · source=${themeCtx.source}] `
      : '[persona=未指定 · 跳过主题敏感检查] '
    if (issues.length === 0) {
      process.stdout.write(`[ok] ${themeNote}${args.mdPath} 无契约 issue\n`)
    } else {
      const tag = ok ? 'warn' : 'fail'
      process.stdout.write(
        `[${tag}] ${themeNote}${args.mdPath}: ${errors.length} error / ${warnings.length} warning\n\n`,
      )
      for (const it of issues) {
        process.stdout.write(`  line ${it.line} [${it.severity}:${it.kind}]\n`)
        if (it.name) process.stdout.write(`    name: ${it.name}\n`)
        process.stdout.write(`    hint: ${it.hint}\n`)
        process.stdout.write(`    >>>>  ${it.excerpt}\n\n`)
      }
    }
  }

  process.exit(ok ? 0 : 2)
}

function fail(code: number, msg: string): never {
  process.stderr.write(`[lint-contract] ${msg}\n`)
  process.exit(code)
}

main()
