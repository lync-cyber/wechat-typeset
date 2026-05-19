#!/usr/bin/env ts-node
// ts-code-review/scripts/ast-analyze.ts
// Deep AST analysis via ts-morph for issues static text tools miss.
//
// Usage: npx ts-node ast-analyze.ts --project tsconfig.json --out review-report.json
// Requires: npm install -D ts-morph ts-node

import { Project, SyntaxKind, Node, TypeNode, SourceFile } from 'ts-morph'
import * as fs from 'fs'
import * as path from 'path'

// ─── CLI args ────────────────────────────────────────────────────────────────
const args = process.argv.slice(2)
const projectArg  = args[args.indexOf('--project') + 1]  ?? 'tsconfig.json'
const outArg      = args[args.indexOf('--out') + 1]      ?? 'review-report.json'
const thresholdArg = args[args.indexOf('--type-complexity-threshold') + 1]

const TYPE_COMPLEXITY_THRESHOLD = thresholdArg ? parseInt(thresholdArg) : 8

// ─── Setup ───────────────────────────────────────────────────────────────────
const project = new Project({
  tsConfigFilePath: projectArg,
  skipAddingFilesFromTsConfig: false,
})

const results = {
  emptyImplementations:  [] as EmptyImpl[],
  complexTypes:          [] as ComplexType[],
  zombieBranches:        [] as ZombieBranch[],
  asAnyConcentrations:   [] as AsAnyFile[],
}

interface EmptyImpl {
  file: string; line: number; name: string; kind: string; signature: string
}
interface ComplexType {
  file: string; line: number; name: string; complexity: number; preview: string
}
interface ZombieBranch {
  file: string; line: number; condition: string; comment: string
}
interface AsAnyFile {
  file: string; count: number; lines: number[]
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function relPath(file: SourceFile) {
  return path.relative(process.cwd(), file.getFilePath())
}

function measureTypeComplexity(typeNode: Node): number {
  let score = 0
  typeNode.forEachDescendant((node) => {
    switch (node.getKind()) {
      case SyntaxKind.ConditionalType:  score += 4; break
      case SyntaxKind.MappedType:       score += 3; break
      case SyntaxKind.IntersectionType: score += 2; break
      case SyntaxKind.UnionType:        score += 1; break
      case SyntaxKind.InferType:        score += 2; break
    }
  })
  return score
}

const VERSION_COMMENT_RE = /v\d+|legacy|deprecated|compat|backward|old[_-]|migration|shim/i

// ─── Analysis passes ─────────────────────────────────────────────────────────
for (const file of project.getSourceFiles()) {
  // Skip node_modules / generated files
  const fp = file.getFilePath()
  if (fp.includes('node_modules') || fp.includes('.d.ts') || fp.includes('/dist/')) continue

  const rel = relPath(file)

  // ── 1. Empty / stub implementations ────────────────────────────────────────
  const checkBody = (name: string, kind: string, body: Node | undefined, node: Node) => {
    if (!body) return
    const stmts = body.getChildrenOfKind(SyntaxKind.SyntaxList).flatMap(l => l.getChildren())
      .filter(c => c.getKind() !== SyntaxKind.SemicolonToken)

    const isStub = stmts.length === 0 ||
      (stmts.length === 1 &&
        (stmts[0].getKind() === SyntaxKind.ThrowStatement &&
         /not implemented|not yet|todo/i.test(stmts[0].getText())))

    if (isStub) {
      results.emptyImplementations.push({
        file: rel,
        line: node.getStartLineNumber(),
        name,
        kind,
        signature: node.getText().split('\n')[0].trim().slice(0, 120),
      })
    }
  }

  file.getFunctions().forEach(fn => {
    checkBody(fn.getName() ?? '<anonymous>', 'function', fn.getBody(), fn)
  })
  file.getClasses().forEach(cls => {
    cls.getMethods().forEach(m => {
      checkBody(`${cls.getName()}.${m.getName()}`, 'method', m.getBody(), m)
    })
  })
  file.getDescendantsOfKind(SyntaxKind.ArrowFunction).forEach(arrow => {
    const parent = arrow.getParent()
    const name = Node.isVariableDeclaration(parent) ? (parent.getName() ?? '<arrow>') : '<arrow>'
    const body = arrow.getBody()
    if (Node.isBlock(body)) checkBody(name, 'arrow', body, arrow)
  })

  // ── 2. Overly complex types ─────────────────────────────────────────────────
  file.getTypeAliases().forEach(ta => {
    const typeNode = ta.getTypeNode()
    if (!typeNode) return
    const complexity = measureTypeComplexity(typeNode)
    if (complexity >= TYPE_COMPLEXITY_THRESHOLD) {
      results.complexTypes.push({
        file: rel,
        line: ta.getStartLineNumber(),
        name: ta.getName(),
        complexity,
        preview: ta.getText().split('\n').slice(0, 3).join(' ').slice(0, 150),
      })
    }
  })
  // Also check interface extends chains
  file.getInterfaces().forEach(iface => {
    const complexity = iface.getExtends().length > 4 ? iface.getExtends().length : 0
    if (complexity > 0) {
      results.complexTypes.push({
        file: rel,
        line: iface.getStartLineNumber(),
        name: iface.getName(),
        complexity,
        preview: `interface ${iface.getName()} extends ${iface.getExtends().map(e => e.getText()).join(', ')}`,
      })
    }
  })

  // ── 3. Zombie compatibility branches ───────────────────────────────────────
  file.getDescendantsOfKind(SyntaxKind.IfStatement).forEach(ifStmt => {
    const ranges = ifStmt.getLeadingCommentRanges()
    const hasVersionComment = ranges.some(r => VERSION_COMMENT_RE.test(r.getText()))
    if (hasVersionComment) {
      results.zombieBranches.push({
        file: rel,
        line: ifStmt.getStartLineNumber(),
        condition: ifStmt.getExpression().getText().slice(0, 100),
        comment: ranges[0]?.getText().trim().slice(0, 200) ?? '',
      })
    }
  })
  // Also check ternary conditions with legacy patterns
  file.getDescendantsOfKind(SyntaxKind.ConditionalExpression).forEach(ternary => {
    const condText = ternary.getCondition().getText()
    if (/legacy|deprecated|v\d+Feature|isOld/i.test(condText)) {
      results.zombieBranches.push({
        file: rel,
        line: ternary.getStartLineNumber(),
        condition: condText.slice(0, 100),
        comment: '(ternary — no leading comment)',
      })
    }
  })

  // ── 4. as-any concentrations ───────────────────────────────────────────────
  const asAnyNodes = file.getDescendantsOfKind(SyntaxKind.AsExpression).filter(n =>
    n.getTypeNode()?.getText() === 'any'
  )
  if (asAnyNodes.length >= 3) {
    results.asAnyConcentrations.push({
      file: rel,
      count: asAnyNodes.length,
      lines: asAnyNodes.map(n => n.getStartLineNumber()),
    })
  }
}

// ─── Sort by severity ────────────────────────────────────────────────────────
results.complexTypes.sort((a, b) => b.complexity - a.complexity)
results.asAnyConcentrations.sort((a, b) => b.count - a.count)

// ─── Merge into existing review-report.json ──────────────────────────────────
const existing = fs.existsSync(outArg)
  ? JSON.parse(fs.readFileSync(outArg, 'utf-8'))
  : {}

existing.astIssues = results

fs.writeFileSync(outArg, JSON.stringify(existing, null, 2))

// ─── Summary ─────────────────────────────────────────────────────────────────
console.log('\n✅ AST analysis complete')
console.log(`  Empty/stub implementations: ${results.emptyImplementations.length}`)
console.log(`  Overly complex types:       ${results.complexTypes.length} (threshold: ${TYPE_COMPLEXITY_THRESHOLD})`)
console.log(`  Zombie compat branches:     ${results.zombieBranches.length}`)
console.log(`  High as-any concentration:  ${results.asAnyConcentrations.length} files`)
console.log(`\n  Merged into: ${outArg}`)

if (results.complexTypes.length > 0) {
  console.log('\n  Top complex types:')
  results.complexTypes.slice(0, 3).forEach(t =>
    console.log(`    [${t.complexity}] ${t.file}:${t.line} — ${t.name}`)
  )
}
