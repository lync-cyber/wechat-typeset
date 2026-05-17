#!/usr/bin/env tsx
/**
 * check-token-coverage —— variant tokenize 完整性 advisory 检查（步骤 4.2）。
 *
 * 风险：tokenize 一支 variant 时，作者声明了 tokenSchema、把 `var(--uv-<key>, default)` 注入
 * 部分 render 输出，但**漏掉一些颜色 / 尺寸字面量**——保存 token 后那些位置不会变，用户体感
 * "我改了颜色但只换了一半"。本脚本扫描已声明 tokenSchema 的 variant 文件，列出 render() 范围
 * 内**未被 var(...) 包裹也不是 ${...} 模板表达式**的颜色 / 尺寸字面量，让维护者人工决策：
 *
 *   - 该字面量是"装饰阴影里的 rgba(0,0,0,0.04) / 边框 1px / 圆角 8px"等不开放的稳定数 → 忽略
 *   - 是"应该 tokenize 但漏改的硬编码" → 补 tokenSchema 字段 + render 改 var()
 *
 * 不阻塞 build：默认 exit 0；`--strict` 才在有未覆盖字面量时 exit 1（CI 里如要硬 gate 自取）。
 *
 * 用法:
 *   pnpm tsx scripts/check-token-coverage.ts            # 报告模式
 *   pnpm tsx scripts/check-token-coverage.ts --strict   # 有未覆盖即 exit 1
 *   pnpm tsx scripts/check-token-coverage.ts --json     # 机读输出（CI 集成用）
 */

import { globSync, readFileSync } from 'node:fs'
import { relative, resolve } from 'node:path'

const ROOT = resolve(process.cwd())

// ─────────────────────────────────────────────────────────────
// 正则
// ─────────────────────────────────────────────────────────────

/** 颜色字面量：#abc / #aabbcc / #aabbccdd / rgb(...) / rgba(...) / hsl(...) / hsla(...) */
const COLOR_RE = /#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)/g

/** 尺寸字面量：18px / 1.2em / 14rem / 100% / 100vh / 50vw */
const SIZE_RE = /\b\d+(?:\.\d+)?(?:px|em|rem|%|vh|vw)\b/g

/** 已 tokenize 的标记：`var(--uv-key, fallback)` —— fallback 段里出现的字面量算 OK */
const VAR_RE = /var\(\s*--[\w-]+\s*(?:,[^)]*)?\)/g

/** 模板表达式：${...} —— 内部的 ctx.tokens.*、pair.* 都不是硬编码 */
const TEMPLATE_EXPR_RE = /\$\{[^}]*\}/g

/** 多行注释 + 单行注释 */
const BLOCK_COMMENT_RE = /\/\*[\s\S]*?\*\//g
const LINE_COMMENT_RE = /\/\/[^\n]*/g

/** tokenSchema 声明本身——里面的 'default' 字面量不算硬编码（schema 是声明） */
const SCHEMA_DECL_RE = /export\s+const\s+tokenSchema[\s\S]*?^\}/m

/** thumb()  函数体——SVG 缩略图常带 #c0c6cf 之类的"静态线条灰"，不进 render 输出，跳过 */
const THUMB_FUNC_RE = /function\s+thumb\s*\([\s\S]*?^\}/gm

/**
 * snippets: [...]  数组——其中的 thumbArgs / FALLBACK_OPEN_MARK 等含字面量，
 * 但属于"组件库预设元数据"，非 render() 输出，跳过。
 * 一层括号嵌套足以覆盖现有所有 variant snippet 形态。
 */
const SNIPPETS_DECL_RE = /snippets\s*:\s*\[(?:[^[\]]|\[(?:[^[\]]|\[[^[\]]*\])*\])*\]/g

/**
 * FALLBACK_* 顶层常量声明——回退资产常含 stroke="#c0c6cf" 等"静态线条灰"。
 */
const FALLBACK_CONST_RE = /^const\s+FALLBACK[\w_]*\s*=[\s\S]*?(?=\nfunction\s|\nconst\s|\nexport\s)/gm

// ─────────────────────────────────────────────────────────────
// 扫描单个 variant 文件
// ─────────────────────────────────────────────────────────────

interface FileReport {
  file: string
  declaredTokens: string[]
  unrasterizedColors: string[]
  unrasterizedSizes: string[]
}

function maskExclusions(src: string): string {
  let s = src
  s = s.replace(BLOCK_COMMENT_RE, ' /*c*/ ')
  s = s.replace(LINE_COMMENT_RE, ' //c ')
  s = s.replace(SCHEMA_DECL_RE, ' /*schema*/ ')
  s = s.replace(THUMB_FUNC_RE, ' /*thumb*/ ')
  s = s.replace(FALLBACK_CONST_RE, ' /*fallback*/ ')
  s = s.replace(SNIPPETS_DECL_RE, ' /*snippets*/ ')
  s = s.replace(VAR_RE, ' /*var*/ ')
  s = s.replace(TEMPLATE_EXPR_RE, ' /*expr*/ ')
  return s
}

function extractDeclaredTokens(src: string): string[] {
  const m = src.match(SCHEMA_DECL_RE)
  if (!m) return []
  const block = m[0]
  // 抓 `'<key>': {` 这类条目；不严格判属性顺序
  const keys: string[] = []
  const re = /['"]([\w-]+)['"]\s*:\s*\{/g
  let item: RegExpExecArray | null
  while ((item = re.exec(block)) !== null) {
    keys.push(item[1])
  }
  return keys
}

function scanFile(absPath: string): FileReport | null {
  const src = readFileSync(absPath, 'utf8')
  if (!/export\s+const\s+tokenSchema/.test(src)) return null
  const masked = maskExclusions(src)
  const colors = Array.from(masked.matchAll(COLOR_RE)).map((m) => m[0])
  const sizes = Array.from(masked.matchAll(SIZE_RE)).map((m) => m[0])
  return {
    file: relative(ROOT, absPath).replace(/\\/g, '/'),
    declaredTokens: extractDeclaredTokens(src),
    unrasterizedColors: colors,
    unrasterizedSizes: sizes,
  }
}

function loadAllVariantFiles(): string[] {
  // 排除 _shared / _core / _thumb 等基础设施
  const paths = globSync('src/core/variants/**/*.ts', { cwd: ROOT })
    .filter((p) => !p.split(/[\\/]/).some((seg) => seg.startsWith('_')))
    .map((p) => resolve(ROOT, p))
    .sort()
  return paths
}

// ─────────────────────────────────────────────────────────────
// 输出
// ─────────────────────────────────────────────────────────────

function formatHuman(reports: FileReport[]): { hasFindings: boolean; lines: string[] } {
  const lines: string[] = []
  let hasFindings = false
  for (const r of reports) {
    lines.push(`\n${r.file}`)
    lines.push(`  tokens 声明：${r.declaredTokens.join(', ') || '(空)'}`)
    if (r.unrasterizedColors.length === 0 && r.unrasterizedSizes.length === 0) {
      lines.push('  ✓ 未发现硬编码颜色 / 尺寸（render 范围内）')
    } else {
      hasFindings = true
      if (r.unrasterizedColors.length > 0) {
        lines.push(`  ⚠ 未 token 化颜色 (${r.unrasterizedColors.length}): ${r.unrasterizedColors.join(', ')}`)
      }
      if (r.unrasterizedSizes.length > 0) {
        lines.push(`  ⚠ 未 token 化尺寸 (${r.unrasterizedSizes.length}): ${r.unrasterizedSizes.join(', ')}`)
      }
    }
  }
  return { hasFindings, lines }
}

// ─────────────────────────────────────────────────────────────
// CLI
// ─────────────────────────────────────────────────────────────

function main(): void {
  const args = new Set(process.argv.slice(2))
  const strict = args.has('--strict')
  const json = args.has('--json')

  const files = loadAllVariantFiles()
  const reports: FileReport[] = []
  for (const f of files) {
    const r = scanFile(f)
    if (r) reports.push(r)
  }

  if (json) {
    process.stdout.write(JSON.stringify({ reports }, null, 2) + '\n')
    return
  }

  if (reports.length === 0) {
    console.warn('[token-coverage] 未发现任何已声明 tokenSchema 的 variant')
    return
  }

  const { hasFindings, lines } = formatHuman(reports)
  console.log(`[token-coverage] 扫描 ${reports.length} 支 tokenize 变体：`)
  for (const l of lines) console.log(l)
  console.log('')
  if (hasFindings) {
    console.log('提示：⚠ 标记仅是"render 范围内未走 var() / ${} 的字面量"，')
    console.log('      其中很多是装饰阴影 / 边框宽度 / 圆角等不应 token 化的稳定数。')
    console.log('      由维护者判定是否需要补 tokenSchema 字段。')
    if (strict) {
      console.error('\n[token-coverage] --strict：存在未覆盖字面量，exit 1')
      process.exit(1)
    }
  } else {
    console.log('全部 variant 的 render() 已 100% tokenize ✓')
  }
}

main()
