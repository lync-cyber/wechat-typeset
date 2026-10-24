#!/usr/bin/env node
/**
 * 密钥泄露检查。
 *
 * 用法：
 *   node scripts/check-secrets.mjs --staged   # pre-commit：只扫本次暂存的新增行
 *   node scripts/check-secrets.mjs --all      # 扫全部已跟踪文件的当前内容
 *
 * 误报的行尾加 `secret-scan:allow` 放行；紧急跳过：SKIP_SECRET_CHECK=1 git commit ...
 * 全 git 历史的深度扫描由 CI 的 gitleaks 承担。
 */
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

if (process.env.SKIP_SECRET_CHECK === '1') {
  console.log('[check-secrets] SKIP_SECRET_CHECK=1，已跳过（请在 PR 中尽快补修）')
  process.exit(0)
}

const RULES = [
  { name: 'private-key', pattern: /-----BEGIN (?:RSA |EC |DSA |OPENSSH |PGP |ENCRYPTED )?PRIVATE KEY-----/ },
  { name: 'aws-access-key', pattern: /\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/ },
  { name: 'github-token', pattern: /\b(?:gh[pousr]_[A-Za-z0-9]{36,}|github_pat_[A-Za-z0-9_]{60,})\b/ },
  { name: 'llm-api-key', pattern: /\bsk-(?:ant-|proj-)?[A-Za-z0-9_-]{32,}/ },
  { name: 'slack-token', pattern: /\bxox[abprs]-[A-Za-z0-9-]{10,}/ },
  { name: 'google-api-key', pattern: /\bAIza[0-9A-Za-z_-]{35}\b/ },
  { name: 'npm-token', pattern: /\bnpm_[A-Za-z0-9]{36}\b/ },
  { name: 'wechat-appsecret', pattern: /app_?secret['"]?\s*[:=]\s*['"]?[0-9a-f]{32}\b/i },
  {
    name: 'credential-assignment',
    pattern: /\b(?:api[_-]?key|secret[_-]?key|access[_-]?key|client[_-]?secret|password)['"]?\s*[:=]\s*['"][^'"\s]{16,}['"]/i,
  },
]

/** 设计 token、锁文件与生成产物里的长随机串不是凭据，扫它们只会制造噪音。 */
const SKIPPED_PATHS = [
  /(^|\/)(pnpm-lock\.yaml|package-lock\.json)$/,
  /^docs\/generated\//,
  /\.(png|jpe?g|gif|webp|ico|svg|woff2?|ttf|pdf)$/i,
]

const ALLOW_MARKER = 'secret-scan:allow'

function isSkipped(path) {
  return SKIPPED_PATHS.some((re) => re.test(path))
}

function matchRule(line) {
  if (line.includes(ALLOW_MARKER)) return null
  return RULES.find((rule) => rule.pattern.test(line)) ?? null
}

function git(args) {
  return execFileSync('git', args, { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 })
}

function scanStaged() {
  const findings = []
  let file = null
  let lineNo = 0
  for (const raw of git(['diff', '--cached', '--unified=0', '--no-color', '--diff-filter=ACM']).split('\n')) {
    const line = raw.replace(/\r$/, '')
    if (line.startsWith('+++ ')) {
      file = line.startsWith('+++ b/') ? line.slice(6) : null
      continue
    }
    const hunk = line.match(/^@@ -\d+(?:,\d+)? \+(\d+)/)
    if (hunk) {
      lineNo = Number(hunk[1])
      continue
    }
    if (!file || isSkipped(file)) continue
    if (line.startsWith('+')) {
      const rule = matchRule(line.slice(1))
      if (rule) findings.push({ file, lineNo, rule: rule.name })
      lineNo++
    }
  }
  return findings
}

function scanAll() {
  const findings = []
  for (const file of git(['ls-files', '-z']).split('\0')) {
    if (!file || isSkipped(file)) continue
    let content
    try {
      content = readFileSync(file, 'utf8')
    } catch {
      continue
    }
    if (content.includes('\0')) continue
    content.split(/\r?\n/).forEach((line, i) => {
      const rule = matchRule(line)
      if (rule) findings.push({ file, lineNo: i + 1, rule: rule.name })
    })
  }
  return findings
}

const mode = process.argv[2]
if (mode !== '--staged' && mode !== '--all') {
  console.error('用法：node scripts/check-secrets.mjs --staged | --all')
  process.exit(2)
}

const findings = mode === '--staged' ? scanStaged() : scanAll()
if (findings.length === 0) process.exit(0)

console.error(`[check-secrets] 发现 ${findings.length} 处疑似密钥（只报位置，不回显内容）：`)
for (const f of findings) console.error(`  ${f.file}:${f.lineNo}  ${f.rule}`)
console.error(`[check-secrets] 确认是误报：在该行加 ${ALLOW_MARKER}；真密钥：移出代码并立即轮换`)
process.exit(1)
