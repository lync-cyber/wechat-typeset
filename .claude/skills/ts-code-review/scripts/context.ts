// Build a ProjectContext: detect stack, enumerate files, parse diff range,
// assemble project conventions for LLM prompt injection.

import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import { run, exists, readJsonSafe, relPath, toolAvailable } from './util.js'
import type {
  DiffRange,
  ProjectContext,
  ProjectStack,
  ScanMode,
} from './types.js'

export interface ContextOpts {
  root: string
  tsconfig: string
  mode: ScanMode
  base?: string // for branch-diff / pr
  pr?: string
  files?: string[] // for single-file
}

export async function buildContext(opts: ContextOpts): Promise<ProjectContext> {
  const root = path.resolve(opts.root)
  const stack = await detectStack(root)
  const conventions = await loadConventions(root)
  let diffRange: DiffRange | undefined
  let files: string[]

  switch (opts.mode) {
    case 'full':
      files = await listProjectTsFiles(root, opts.tsconfig)
      break
    case 'branch-diff':
      diffRange = await readGitDiff(root, opts.base ?? 'origin/main')
      files = diffRange.changedFiles
      break
    case 'pr':
      if (!opts.pr) throw new Error('pr mode requires --pr <number>')
      diffRange = await readPrDiff(root, opts.pr)
      files = diffRange.changedFiles
      break
    case 'single-file':
      if (!opts.files?.length) throw new Error('single-file mode requires --files')
      files = opts.files.map((f) => relPath(root, path.resolve(root, f)))
      break
  }

  files = files.filter((f) => /\.(ts|tsx|mts|cts)$/.test(f) && !f.includes('node_modules'))

  return {
    root,
    tsconfig: opts.tsconfig,
    mode: opts.mode,
    files,
    stack,
    conventions,
    diffRange,
  }
}

async function detectStack(root: string): Promise<ProjectStack> {
  const pkg = await readJsonSafe<{
    dependencies?: Record<string, string>
    devDependencies?: Record<string, string>
    workspaces?: unknown
  }>(path.join(root, 'package.json'), {})

  const deps = { ...(pkg.dependencies ?? {}), ...(pkg.devDependencies ?? {}) }
  const has = (name: string) => name in deps

  let packageManager: ProjectStack['packageManager'] = 'npm'
  if (await exists(path.join(root, 'pnpm-lock.yaml'))) packageManager = 'pnpm'
  else if (await exists(path.join(root, 'yarn.lock'))) packageManager = 'yarn'
  else if (await exists(path.join(root, 'bun.lockb'))) packageManager = 'bun'

  const hasMonorepo =
    !!pkg.workspaces ||
    (await exists(path.join(root, 'pnpm-workspace.yaml'))) ||
    (await exists(path.join(root, 'nx.json'))) ||
    (await exists(path.join(root, 'turbo.json')))

  const testRunner: ProjectStack['testRunner'] = has('vitest')
    ? 'vitest'
    : has('jest')
      ? 'jest'
      : has('mocha')
        ? 'mocha'
        : has('@types/node') && hasNodeTestImport(root)
          ? 'node-test'
          : 'unknown'

  return {
    packageManager,
    hasReact: has('react'),
    hasVue: has('vue'),
    hasNest: has('@nestjs/core'),
    hasNext: has('next'),
    hasVite: has('vite'),
    hasMonorepo,
    hasESLint: has('eslint') || (await exists(path.join(root, 'eslint.config.js'))),
    hasKnip: has('knip') || (await toolAvailable('knip', root)),
    hasJscpd: has('jscpd'),
    hasMadge: has('madge'),
    hasTsMorph: has('ts-morph'),
    testRunner,
  }
}

function hasNodeTestImport(_root: string): boolean {
  return false // cheap default; revisit if needed
}

async function listProjectTsFiles(root: string, tsconfig: string): Promise<string[]> {
  // Ask tsc for the file list, which is the most authoritative source for
  // include/exclude + path-alias projects. Falls back to a manual walk if tsc
  // is unavailable.
  const { stdout, code } = await run(
    process.platform === 'win32' ? 'npx.cmd' : 'npx',
    ['tsc', '-p', tsconfig, '--listFiles', '--noEmit'],
    { cwd: root },
  )
  if (code === 0 || stdout.length > 0) {
    const all = stdout
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean)
      .filter((l) => !l.includes('node_modules'))
      .filter((l) => /\.(ts|tsx|mts|cts)$/.test(l) && !l.endsWith('.d.ts'))
      .map((l) => relPath(root, l))
    if (all.length) return all
  }
  return walkTsFiles(root)
}

async function walkTsFiles(root: string, dir = root, acc: string[] = []): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    if (e.name === 'node_modules' || e.name.startsWith('.') || e.name === 'dist') continue
    const full = path.join(dir, e.name)
    if (e.isDirectory()) await walkTsFiles(root, full, acc)
    else if (/\.(ts|tsx|mts|cts)$/.test(e.name) && !e.name.endsWith('.d.ts'))
      acc.push(relPath(root, full))
  }
  return acc
}

async function readGitDiff(root: string, base: string): Promise<DiffRange> {
  const names = await run('git', ['diff', '--name-only', `${base}...HEAD`], { cwd: root })
  const changedFiles = names.stdout
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .filter((f) => /\.(ts|tsx|mts|cts)$/.test(f))

  const changedLines: DiffRange['changedLines'] = {}
  for (const f of changedFiles) {
    const { stdout } = await run('git', ['diff', '--unified=0', `${base}...HEAD`, '--', f], {
      cwd: root,
    })
    changedLines[f] = parseHunkRanges(stdout)
  }
  return { base, changedFiles, changedLines }
}

async function readPrDiff(root: string, pr: string): Promise<DiffRange> {
  const meta = await run('gh', ['pr', 'view', pr, '--json', 'baseRefName,headRefName'], {
    cwd: root,
  })
  let base = 'origin/main'
  try {
    const parsed = JSON.parse(meta.stdout)
    if (parsed.baseRefName) base = `origin/${parsed.baseRefName}`
  } catch {
    /* fall back */
  }
  return readGitDiff(root, base)
}

function parseHunkRanges(diff: string): Array<[number, number]> {
  const ranges: Array<[number, number]> = []
  for (const line of diff.split(/\r?\n/)) {
    const m = line.match(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/)
    if (m) {
      const start = Number(m[1])
      const count = m[2] ? Number(m[2]) : 1
      if (count > 0) ranges.push([start, start + count - 1])
    }
  }
  return ranges
}

const CONVENTION_FILES = [
  'CLAUDE.md',
  'AGENTS.md',
  '.cursorrules',
  '.cursor/rules.md',
  'CONTRIBUTING.md',
  'CODE_STYLE.md',
]

async function loadConventions(root: string): Promise<string> {
  const sections: string[] = []
  for (const name of CONVENTION_FILES) {
    const p = path.join(root, name)
    if (!(await exists(p))) continue
    const body = await fs.readFile(p, 'utf-8')
    const distilled = extractHardConstraints(body)
    if (distilled.trim().length) sections.push(`### ${name}\n${distilled.trim()}`)
  }
  return sections.join('\n\n')
}

// Heuristic: pull headings/paragraphs that signal hard rules. We do not try
// to be smart — false-positive content in the prompt is cheap; false-negative
// (silently dropping a real rule) is what we must avoid.
function extractHardConstraints(md: string): string {
  const RULE_HINT =
    /(约定|纪律|规范|禁止|必须|不可|不要|never|must|always|do not|don't|disallow|forbidden|rule|discipline|hard constraint|不允许)/i

  const lines = md.split(/\r?\n/)
  const out: string[] = []
  let inFence = false
  let keepBlock = false
  let blockBuf: string[] = []

  const flush = () => {
    if (keepBlock && blockBuf.length) out.push(blockBuf.join('\n'))
    blockBuf = []
    keepBlock = false
  }

  for (const line of lines) {
    if (line.startsWith('```')) inFence = !inFence
    if (!inFence && /^#{1,6}\s/.test(line)) {
      flush()
      keepBlock = RULE_HINT.test(line)
      if (keepBlock) blockBuf.push(line)
      continue
    }
    if (keepBlock) blockBuf.push(line)
    else if (RULE_HINT.test(line)) out.push(line)
  }
  flush()

  return out.join('\n').slice(0, 4000) // cap to ~4k chars; conventions are budget-bounded
}
