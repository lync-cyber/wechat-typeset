// Shared types for ts-code-review.
// Every detector emits Issue[]; every consumer (priority, report, llm prompts)
// reads from the same shape so the LLM does not have to relearn fields per template.

export type IssueKind =
  | 'dead-export'
  | 'dead-file'
  | 'dead-dependency'
  | 'circular-dep'
  | 'placeholder-todo'
  | 'placeholder-fixme'
  | 'placeholder-hack'
  | 'placeholder-notimpl'
  | 'empty-implementation'
  | 'complex-type'
  | 'zombie-branch'
  | 'as-any'
  | 'ts-ignore'
  | 'duplicate-block'
  | 'type-error'
  | 'eslint-warning'
  | 'eslint-error'
  | 'comment-discipline'
  | 'comment-drift'
  | 'test-skip'
  | 'test-only'
  | 'test-empty'
  | 'security-eval'
  | 'security-exec'
  | 'security-html-inject'
  | 'bundle-whole-import'
  | 'naming-smell'

export type Severity = 'info' | 'warn' | 'error'

export interface Issue {
  file: string
  line?: number
  endLine?: number
  column?: number
  kind: IssueKind
  severity: Severity
  evidence: string
  detector: string
  confidence: number // 0..1, detector self-assessed; LLM may override
  suggestion?: string
  meta?: Record<string, unknown>
}

export type ScanMode = 'full' | 'branch-diff' | 'pr' | 'single-file'

export interface DiffRange {
  base: string
  changedFiles: string[]
  changedLines: Record<string, Array<[number, number]>>
}

export interface ProjectStack {
  packageManager: 'npm' | 'pnpm' | 'yarn' | 'bun'
  hasReact: boolean
  hasVue: boolean
  hasNest: boolean
  hasNext: boolean
  hasVite: boolean
  hasMonorepo: boolean
  hasESLint: boolean
  hasKnip: boolean
  hasJscpd: boolean
  hasMadge: boolean
  hasTsMorph: boolean
  testRunner: 'vitest' | 'jest' | 'mocha' | 'node-test' | 'unknown'
}

export interface ProjectContext {
  root: string
  tsconfig: string
  mode: ScanMode
  files: string[] // .ts/.tsx files in scope (post-mode-filter)
  stack: ProjectStack
  conventions: string // assembled markdown, injected into LLM prompts
  diffRange?: DiffRange
}

export interface ScanReport {
  generatedAt: string
  mode: ScanMode
  stack: ProjectStack
  conventions: string
  issues: Issue[]
  baseline: {
    typeErrors: number
    deadExports: number
    circularDeps: number
    testCount: number
  }
  diffRange?: DiffRange
}

export interface Detector {
  name: string
  kinds: IssueKind[]
  enabledFor(ctx: ProjectContext): boolean
  detect(ctx: ProjectContext): Promise<Issue[]>
}
