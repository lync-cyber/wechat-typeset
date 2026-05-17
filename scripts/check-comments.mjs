#!/usr/bin/env node
/**
 * 注释纪律检查（对应 CLAUDE.md §注释纪律）
 *
 * 用法：
 *   node scripts/check-comments.mjs --staged      # pre-commit：只检查本次暂存的新增行
 *   node scripts/check-comments.mjs [files...]    # 检查指定文件的全部内容
 *
 * 紧急跳过：SKIP_COMMENT_CHECK=1 git commit ...（PR 内必须补修）
 */
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

if (process.env.SKIP_COMMENT_CHECK === '1') {
  console.log('[check-comments] SKIP_COMMENT_CHECK=1，已跳过（请在 PR 中尽快补修）')
  process.exit(0)
}

// 每条规则只匹配单行注释（// ...）中的违规内容。
// 匹配范围故意保守：宁可漏掉，也不能把合法的 why 注释误报为违规。
const RULES = [
  {
    pattern: /\/\/\s*(TODO|FIXME|HACK)\b/i,
    message: 'TODO/FIXME/HACK —— 应开 issue 追踪，不要挂在源码里',
  },
  {
    pattern: /\/\/[^\n]*(本来想|曾考虑|改了.{1,8}次终于|方案\s*[AB]\s*(vs|versus|对比|PK))/,
    message: '设计过程残留 —— 这是 PR 描述的内容，不属于源码',
  },
  {
    pattern: /\/\/[^\n]*(旧版用|已移到|曾经是|R\d+\s*[后前]|Phase\s*\d+\s*迁移)/,
    message: '历史/迁移上下文 —— 属于 git log，不属于源码',
  },
  {
    pattern: /\/\/[^\n]*(临时打印|调一下|加个\s*log\s*看|临时调试|暂时这样)/,
    message: '调试遗留 —— 应在提交前删除',
  },
]

const SOURCE_EXTS = new Set(['.ts', '.tsx', '.vue', '.js', '.mjs'])

function extOf(p) {
  const i = p.lastIndexOf('.')
  return i >= 0 ? p.slice(i) : ''
}

function checkLine(content) {
  for (const rule of RULES) {
    if (rule.pattern.test(content)) return rule
  }
  return null
}

const violations = []
const args = process.argv.slice(2)

if (args[0] === '--staged') {
  let diff
  try {
    diff = execSync('git diff --cached --unified=0', { encoding: 'utf8' })
  } catch {
    process.exit(0)
  }

  let currentFile = null
  let lineNo = 0

  for (const raw of diff.split('\n')) {
    const line = raw.replace(/\r$/, '')

    if (line.startsWith('diff --git') || line.startsWith('index ') ||
        line.startsWith('--- ') || line.startsWith('new file') ||
        line.startsWith('deleted file') || line.startsWith('Binary')) {
      continue
    }

    if (line.startsWith('+++ b/')) {
      currentFile = line.slice(6)
      lineNo = 0
    } else if (line.startsWith('@@ ')) {
      const m = line.match(/@@ -\d+(?:,\d+)? \+(\d+)/)
      if (m) lineNo = parseInt(m[1]) - 1
    } else if (line.startsWith('+') && !line.startsWith('+++')) {
      lineNo++
      if (currentFile && SOURCE_EXTS.has(extOf(currentFile))) {
        const content = line.slice(1)
        const rule = checkLine(content)
        if (rule) violations.push({ file: currentFile, line: lineNo, message: rule.message, content: content.trim() })
      }
    } else if (line.startsWith(' ')) {
      lineNo++
    }
    // '-' 和 '\' 开头的行不推进 lineNo
  }
} else {
  for (const filePath of args) {
    if (!SOURCE_EXTS.has(extOf(filePath))) continue
    let text
    try {
      text = readFileSync(filePath, 'utf8')
    } catch {
      continue
    }
    text.split('\n').forEach((line, i) => {
      const rule = checkLine(line)
      if (rule) violations.push({ file: filePath, line: i + 1, message: rule.message, content: line.trim() })
    })
  }
}

if (violations.length === 0) process.exit(0)

process.stderr.write('[check-comments] 检测到违规注释，请修改后重新 commit：\n\n')
for (const v of violations) {
  process.stderr.write(`  ${v.file}:${v.line}  [${v.message}]\n`)
  process.stderr.write(`  > ${v.content}\n\n`)
}
process.stderr.write('紧急跳过：SKIP_COMMENT_CHECK=1 git commit ...（PR 内必须补修）\n')
process.exit(1)
