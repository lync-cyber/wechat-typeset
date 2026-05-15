/**
 * skill 脚本主题敏感性（B 方案落地后）。
 *
 * 守住 4 条契约：
 *   1. theme-capabilities.ts --json 输出含 containers / defaultVariants / recommendedVariants / kickers
 *   2. lint-contract.ts --persona 触发 wrong_theme_namespace warning，且 ok=true（warning 不阻塞）
 *   3. lint-contract.ts 解析 frontmatter theme:，覆盖 --persona
 *   4. annotate-md.ts patches.json 内嵌 capability_snapshot；建议中无"不可用容器"
 */

import { describe, expect, it } from 'vitest'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

const REPO = process.cwd()
const TSX = 'npx'
const TSX_ARGS_PREFIX = ['tsx']

function run(scriptRel: string, args: string[]): { stdout: string; stderr: string; status: number } {
  const script = resolve(REPO, scriptRel)
  const out = spawnSync(TSX, [...TSX_ARGS_PREFIX, script, ...args], {
    cwd: REPO,
    encoding: 'utf8',
    shell: process.platform === 'win32',
  })
  return { stdout: out.stdout ?? '', stderr: out.stderr ?? '', status: out.status ?? 1 }
}

function tmpFile(name: string, body: string): string {
  const dir = mkdtempSync(join(tmpdir(), 'skills-test-'))
  const path = join(dir, name)
  writeFileSync(path, body, 'utf8')
  return path
}

describe('theme-capabilities.ts', () => {
  it('--json 输出包含 containers / defaultVariants / recommendedVariants / kickers', () => {
    const r = run('skills/wechat-typeset-annotate-markdown/scripts/theme-capabilities.ts', [
      '--persona',
      'default',
      '--json',
    ])
    expect(r.status).toBe(0)
    const data = JSON.parse(r.stdout)
    expect(data.persona.id).toBe('default')
    expect(Array.isArray(data.containers)).toBe(true)
    expect(data.containers.length).toBeGreaterThan(30)
    expect(data.defaultVariants.admonition).toBe('accent-bar')
    expect(data.recommendedVariants).toHaveProperty('admonition')
    expect(data.kickers).toHaveProperty('qaBlock')
  })

  it('theme:data-brief 容器在 default 主题里 available=false', () => {
    const r = run('skills/wechat-typeset-annotate-markdown/scripts/theme-capabilities.ts', [
      '--persona',
      'default',
      '--json',
    ])
    const data = JSON.parse(r.stdout)
    const kpi = data.containers.find((c: { id: string }) => c.id === 'kpi-dashboard')
    expect(kpi).toBeDefined()
    expect(kpi.available).toBe(false)
    expect(kpi.namespace).toBe('theme')
    expect(kpi.pack).toBe('theme:data-brief')
  })

  it('未知 persona 退出码 2', () => {
    const r = run('skills/wechat-typeset-annotate-markdown/scripts/theme-capabilities.ts', [
      '--persona',
      'not-a-real-theme',
      '--json',
    ])
    expect(r.status).toBe(2)
  })
})

describe('lint-contract.ts · 主题敏感', () => {
  const themeOnlyMd = ':::: kpi-dashboard KEY METRICS\n::: kpi-item label="x" value="42"\n:::\n::::\n'

  it('--persona default + theme:* 容器 → warning + ok=true（不阻塞）', () => {
    const md = tmpFile('test.md', themeOnlyMd)
    const r = run('skills/wechat-typeset-annotate-markdown/scripts/lint-contract.ts', [
      md,
      '--persona',
      'default',
      '--json',
    ])
    expect(r.status).toBe(0)
    const data = JSON.parse(r.stdout)
    expect(data.ok).toBe(true)
    expect(data.error_count).toBe(0)
    expect(data.warning_count).toBeGreaterThanOrEqual(2)
    const wrongNs = data.issues.filter((i: { kind: string }) => i.kind === 'wrong_theme_namespace')
    expect(wrongNs.length).toBeGreaterThanOrEqual(2)
    expect(wrongNs[0].severity).toBe('warning')
  })

  it('--persona data-brief + theme:* 容器 → 无 warning', () => {
    const md = tmpFile('test.md', themeOnlyMd)
    const r = run('skills/wechat-typeset-annotate-markdown/scripts/lint-contract.ts', [
      md,
      '--persona',
      'data-brief',
      '--json',
    ])
    const data = JSON.parse(r.stdout)
    expect(data.ok).toBe(true)
    expect(data.warning_count).toBe(0)
    expect(data.effective_persona).toBe('data-brief')
    expect(data.persona_source).toBe('flag')
  })

  it('frontmatter theme: 覆盖 --persona', () => {
    const md = tmpFile('test.md', `---\ntheme: data-brief\n---\n${themeOnlyMd}`)
    const r = run('skills/wechat-typeset-annotate-markdown/scripts/lint-contract.ts', [
      md,
      '--persona',
      'default',
      '--json',
    ])
    const data = JSON.parse(r.stdout)
    expect(data.effective_persona).toBe('data-brief')
    expect(data.persona_source).toBe('frontmatter')
    expect(data.warning_count).toBe(0)
  })

  it('无 --persona 也无 frontmatter → 跳过主题敏感检查', () => {
    const md = tmpFile('test.md', themeOnlyMd)
    const r = run('skills/wechat-typeset-annotate-markdown/scripts/lint-contract.ts', [md, '--json'])
    const data = JSON.parse(r.stdout)
    expect(data.effective_persona).toBeUndefined()
    expect(data.persona_source).toBe('none')
    const wrongNs = data.issues.filter((i: { kind: string }) => i.kind === 'wrong_theme_namespace')
    expect(wrongNs.length).toBe(0)
  })

  it('frontmatter 非法 variant id → frontmatter_invalid warning', () => {
    const md = tmpFile(
      'test.md',
      '---\nvariants:\n  admonition: nope\n---\n::: tip\nok\n:::\n',
    )
    const r = run('skills/wechat-typeset-annotate-markdown/scripts/lint-contract.ts', [md, '--json'])
    const data = JSON.parse(r.stdout)
    const fmIssues = data.issues.filter((i: { kind: string }) => i.kind === 'frontmatter_invalid')
    expect(fmIssues.length).toBeGreaterThanOrEqual(1)
    expect(fmIssues[0].severity).toBe('warning')
  })

  it('error 类（fence_not_closed）仍 exit 2', () => {
    const md = tmpFile('test.md', '::: tip 没闭合\nbody\n')
    const r = run('skills/wechat-typeset-annotate-markdown/scripts/lint-contract.ts', [md, '--json'])
    expect(r.status).toBe(2)
    const data = JSON.parse(r.stdout)
    expect(data.ok).toBe(false)
    expect(data.error_count).toBeGreaterThan(0)
  })
})

describe('annotate-md.ts · capability_snapshot', () => {
  it('patches.json 内嵌 capability_snapshot 字段', () => {
    const inputMd = tmpFile(
      'in.md',
      '# 标题\n本文将探讨一个简单话题——文章导语段，长度大致 80 字符以内即可。\n\n## 第一节\n正文。\n\n## 第二节\n正文。\n\n## 第三节\n正文。\n',
    )
    const outJson = tmpFile('out.json', '')
    const r = run('skills/wechat-typeset-annotate-markdown/scripts/annotate-md.ts', [
      '--input',
      inputMd,
      '--persona',
      'default',
      '--out',
      outJson,
    ])
    expect(r.status).toBe(0)
    const data = JSON.parse(readFileSync(outJson, 'utf8'))
    expect(data.capability_snapshot).toBeDefined()
    expect(data.capability_snapshot.persona_id).toBe('default')
    expect(data.capability_snapshot.default_variants.admonition).toBe('accent-bar')
    expect(Array.isArray(data.capability_snapshot.containers)).toBe(true)
    const kpi = data.capability_snapshot.containers.find(
      (c: { id: string }) => c.id === 'kpi-dashboard',
    )
    expect(kpi.available).toBe(false)
  })

  it('default 主题下的 patches 不含 theme:data-brief 容器', () => {
    const inputMd = tmpFile(
      'in.md',
      '本文有数据：增长 87% 同比，500 万 DAU。营收 3 倍。\n',
    )
    const outJson = tmpFile('out.json', '')
    run('skills/wechat-typeset-annotate-markdown/scripts/annotate-md.ts', [
      '--input',
      inputMd,
      '--persona',
      'default',
      '--out',
      outJson,
    ])
    const data = JSON.parse(readFileSync(outJson, 'utf8'))
    const themeOnly = new Set(['kpi-dashboard', 'kpi-item', 'bar-chart', 'bar'])
    for (const p of data.patches) {
      expect(themeOnly.has(p.container)).toBe(false)
    }
  })
})

describe('show-snippet.ts · --persona', () => {
  it('--list --persona 按 pack 分组（含 theme:data-brief 未启用段）', () => {
    const r = run('skills/wechat-typeset-annotate-markdown/scripts/show-snippet.ts', [
      '--list',
      '--persona',
      'default',
    ])
    expect(r.status).toBe(0)
    expect(r.stdout).toContain('## base')
    expect(r.stdout).toContain('## pack:editorial')
    expect(r.stdout).toContain('## theme:data-brief')
    expect(r.stdout).toMatch(/theme:data-brief.*未启用/)
  })

  it('单容器跨主题 → warn 提示', () => {
    const r = run('skills/wechat-typeset-annotate-markdown/scripts/show-snippet.ts', [
      'kpi-dashboard',
      '--persona',
      'default',
    ])
    expect(r.stdout).toMatch(/\[warn\]/)
    expect(r.stdout).toContain('theme:data-brief')
  })

  it('签名容器在本主题 → info 提示', () => {
    const r = run('skills/wechat-typeset-annotate-markdown/scripts/show-snippet.ts', [
      'masthead',
      '--persona',
      'brutalist',
    ])
    expect(r.stdout).toMatch(/\[info\].*签名容器/)
  })
})
