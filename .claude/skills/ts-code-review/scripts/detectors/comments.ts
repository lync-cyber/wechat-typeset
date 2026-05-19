// Comment discipline detector. Catches the comment shapes that the project's
// CLAUDE.md explicitly bans (设计过程残留 / 历史迁移上下文 / 调试遗留) plus
// generally low-value comment patterns. The patterns are tunable per project
// via conventions injection — the LLM gets both the issue and the rule text
// and decides if the match is a real violation.

import type { Detector, Issue } from '../types.js'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'

interface Rule {
  id: string
  re: RegExp
  desc: string
}

const RULES: Rule[] = [
  {
    id: 'design-residue',
    re: /(方案\s*[AB一二]|本来想|曾考虑|改了\s*\d+次|终于|权衡之后|after considering|originally|tried.*didn['’]t work)/i,
    desc: 'design-process residue (delete; PR description is the right home)',
  },
  {
    id: 'history-migration',
    re: /(迁移|phase\s*\d+|旧版用|R\d+\s*之后|已移到|已经移除|migrated to|moved to|legacy implementation|previously)/i,
    desc: 'history/migration narrative (git log is authoritative)',
  },
  {
    id: 'invalid-todo',
    re: /^[\/\*\s]*(TODO|FIXME|HACK)\b[^#A-Z\n]*$/i,
    desc: 'TODO/FIXME/HACK without ticket reference',
  },
  {
    id: 'debug-leftover',
    re: /(临时打印|调一下|这里加个\s*log|console\.log\b.*\bdebug|debug.*remove)/i,
    desc: 'debug leftover comment',
  },
  {
    id: 'restate-code',
    re: /^\s*(创建实例|赋值|返回|声明变量|create instance|return value|assign value)\s*$/i,
    desc: 'comment restates what the next line obviously says',
  },
]

export const commentDisciplineDetector: Detector = {
  name: 'comment-discipline',
  kinds: ['comment-discipline'],
  enabledFor: (ctx) => ctx.conventions.length > 0 || true, // always-on; conventions only sharpen LLM judgement
  async detect(ctx) {
    const issues: Issue[] = []
    for (const f of ctx.files) {
      const text = await safeRead(path.join(ctx.root, f))
      if (!text) continue
      const lines = text.split(/\r?\n/)
      lines.forEach((line, i) => {
        if (!/^\s*(\/\/|\*|\/\*)/.test(line)) return // comment-only lines
        for (const rule of RULES) {
          if (rule.re.test(line)) {
            issues.push({
              file: f,
              line: i + 1,
              kind: 'comment-discipline',
              severity: 'info',
              evidence: `[${rule.id}] ${line.trim().slice(0, 160)}`,
              detector: 'comment-discipline',
              confidence: 0.7,
              suggestion: rule.desc,
              meta: { rule: rule.id },
            })
            break
          }
        }
      })
    }
    return issues
  },
}

async function safeRead(p: string): Promise<string | null> {
  try {
    return await fs.readFile(p, 'utf-8')
  } catch {
    return null
  }
}
