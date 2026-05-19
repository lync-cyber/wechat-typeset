// AST-based detectors: empty-implementation, complex-type, zombie-branch, as-any
//
// Empty-body has high FP potential in framework code. We whitelist:
//   - arrow functions inside JSX attributes      (event handler placeholders)
//   - arrow functions inside Decorator arguments (NestJS / Angular hooks)
//   - useEffect / useMemo callbacks              (intentional noop)
//   - functions preceded by an /* intentional */ or `// noop` comment

import type { Detector, Issue } from '../types.js'

const ZOMBIE_RE = /v\d+|legacy|deprecated|compat|backward|old[_-]|migration|shim/i
const ZOMBIE_CONDITION_RE = /legacy|deprecated|v\d+Feature|isOld|isLegacy/i
const NOOP_COMMENT_RE = /\b(intentional|intentionally|noop|no-op)\b/i

export const astDetector: Detector = {
  name: 'ast',
  kinds: ['empty-implementation', 'complex-type', 'zombie-branch', 'as-any'],
  enabledFor: (ctx) => ctx.stack.hasTsMorph,
  async detect(ctx) {
    const { Project, Node, SyntaxKind } = await import('ts-morph')
    const project = new Project({ tsConfigFilePath: `${ctx.root}/${ctx.tsconfig}` })
    const issues: Issue[] = []
    const inScope = new Set(ctx.files)

    for (const sf of project.getSourceFiles()) {
      const fp = sf.getFilePath()
      if (fp.includes('node_modules') || fp.endsWith('.d.ts') || fp.includes('/dist/')) continue
      const rel = relativeFromRoot(ctx.root, fp)
      if (ctx.mode !== 'full' && !inScope.has(rel)) continue

      // ---- empty / stub bodies ------------------------------------------
      const checkBody = (name: string, kind: string, body: any, node: any) => {
        if (!body) return
        if (hasNoopComment(node)) return
        if (isInWhitelistedContext(node, Node)) return

        const stmts = body.getStatements?.() ?? []
        const isEmpty = stmts.length === 0
        const isNotImpl =
          stmts.length === 1 &&
          stmts[0].getKind() === SyntaxKind.ThrowStatement &&
          /not\s*implemented|not yet|todo/i.test(stmts[0].getText())

        if (isEmpty || isNotImpl) {
          issues.push({
            file: rel,
            line: node.getStartLineNumber(),
            kind: 'empty-implementation',
            severity: 'warn',
            evidence: `${kind} "${name}" has ${isNotImpl ? 'not-implemented stub' : 'empty body'}`,
            detector: 'ast',
            confidence: isNotImpl ? 0.9 : 0.6,
            suggestion: isNotImpl ? 'implement or delete if dormant' : 'add intentional comment if noop is expected',
          })
        }
      }

      for (const fn of sf.getFunctions()) {
        checkBody(fn.getName() ?? '<anonymous>', 'function', fn.getBody(), fn)
      }
      for (const cls of sf.getClasses()) {
        for (const m of cls.getMethods()) {
          checkBody(`${cls.getName()}.${m.getName()}`, 'method', m.getBody(), m)
        }
      }
      for (const arrow of sf.getDescendantsOfKind(SyntaxKind.ArrowFunction)) {
        const parent = arrow.getParent()
        const name = Node.isVariableDeclaration(parent) ? (parent.getName() ?? '<arrow>') : '<arrow>'
        const body = arrow.getBody()
        if (Node.isBlock(body)) checkBody(name, 'arrow', body, arrow)
      }

      // ---- complex types -------------------------------------------------
      for (const ta of sf.getTypeAliases()) {
        const tn = ta.getTypeNode()
        if (!tn) continue
        const score = measureTypeComplexity(tn, SyntaxKind)
        if (score >= 8) {
          issues.push({
            file: rel,
            line: ta.getStartLineNumber(),
            kind: 'complex-type',
            severity: 'info',
            evidence: `type "${ta.getName()}" complexity ${score}`,
            detector: 'ast',
            confidence: 0.85,
            meta: { complexity: score, name: ta.getName() },
          })
        }
      }

      // ---- zombie branches ----------------------------------------------
      for (const ifStmt of sf.getDescendantsOfKind(SyntaxKind.IfStatement)) {
        const ranges = ifStmt.getLeadingCommentRanges?.() ?? []
        const cText = ranges.map((r: any) => r.getText()).join(' ')
        if (ZOMBIE_RE.test(cText)) {
          issues.push({
            file: rel,
            line: ifStmt.getStartLineNumber(),
            kind: 'zombie-branch',
            severity: 'warn',
            evidence: `if-stmt with version/legacy comment: ${ifStmt
              .getExpression()
              .getText()
              .slice(0, 80)}`,
            detector: 'ast',
            confidence: 0.55,
            meta: { comment: cText.slice(0, 200) },
          })
        }
      }
      for (const tern of sf.getDescendantsOfKind(SyntaxKind.ConditionalExpression)) {
        const cond = tern.getCondition().getText()
        if (ZOMBIE_CONDITION_RE.test(cond)) {
          issues.push({
            file: rel,
            line: tern.getStartLineNumber(),
            kind: 'zombie-branch',
            severity: 'warn',
            evidence: `ternary condition matches legacy pattern: ${cond.slice(0, 80)}`,
            detector: 'ast',
            confidence: 0.5,
          })
        }
      }

      // ---- as-any concentrations ----------------------------------------
      const asAny = sf.getDescendantsOfKind(SyntaxKind.AsExpression).filter((n: any) => {
        const t = n.getTypeNode?.()
        return t && t.getText() === 'any'
      })
      for (const node of asAny) {
        issues.push({
          file: rel,
          line: node.getStartLineNumber(),
          kind: 'as-any',
          severity: 'warn',
          evidence: node.getText().slice(0, 100),
          detector: 'ast',
          confidence: 0.75,
        })
      }

      // ---- ts-ignore directives -----------------------------------------
      const text = sf.getFullText()
      for (const m of text.matchAll(/@ts-(?:ignore|expect-error)\b([^\n]*)/g)) {
        const idx = m.index ?? 0
        const line = text.slice(0, idx).split('\n').length
        issues.push({
          file: rel,
          line,
          kind: 'ts-ignore',
          severity: 'warn',
          evidence: m[0].slice(0, 100),
          detector: 'ast',
          confidence: 1,
        })
      }
    }
    return issues
  },
}

function relativeFromRoot(root: string, abs: string): string {
  const norm = abs.replace(/\\/g, '/')
  const r = root.replace(/\\/g, '/')
  return norm.startsWith(r + '/') ? norm.slice(r.length + 1) : norm
}

function measureTypeComplexity(node: any, K: any): number {
  let score = 0
  node.forEachDescendant?.((d: any) => {
    switch (d.getKind()) {
      case K.ConditionalType:
        score += 4
        break
      case K.MappedType:
        score += 3
        break
      case K.InferType:
        score += 2
        break
      case K.IntersectionType:
        score += 2
        break
      case K.UnionType:
        score += 1
        break
    }
  })
  return score
}

function hasNoopComment(node: any): boolean {
  const ranges = node.getLeadingCommentRanges?.() ?? []
  return ranges.some((r: any) => NOOP_COMMENT_RE.test(r.getText()))
}

function isInWhitelistedContext(node: any, Node: any): boolean {
  let p = node.getParent?.()
  let depth = 0
  while (p && depth < 4) {
    if (Node.isJsxAttribute(p) || Node.isDecorator?.(p)) return true
    if (Node.isCallExpression?.(p)) {
      const ex = p.getExpression?.()
      const name = ex?.getText?.() ?? ''
      if (/^(useEffect|useMemo|useCallback|useLayoutEffect)$/.test(name)) return true
    }
    p = p.getParent?.()
    depth++
  }
  return false
}
