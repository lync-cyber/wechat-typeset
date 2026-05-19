// Naming-smell detector: surfaces candidates only — every name carries
// project-specific context, so the final call is always the LLM's (or a
// human's). We emit info-level findings, never errors.

import type { Detector, Issue } from '../types.js'

const VAGUE_SUFFIX = /^(Manager|Helper|Util|Utils|Handler|Processor|Wrapper|Service)$/
const ALLOWED_SHORT = /^(i|j|k|x|y|z|n|m|t|e|s|fn|id|ok|db|ui|os|a|b)$/

export const namingDetector: Detector = {
  name: 'naming',
  kinds: ['naming-smell'],
  enabledFor: (ctx) => ctx.stack.hasTsMorph,
  async detect(ctx) {
    const { Project, SyntaxKind } = await import('ts-morph')
    const project = new Project({ tsConfigFilePath: `${ctx.root}/${ctx.tsconfig}` })
    const issues: Issue[] = []
    const inScope = new Set(ctx.files)

    for (const sf of project.getSourceFiles()) {
      const fp = sf.getFilePath().replace(/\\/g, '/')
      if (fp.includes('node_modules') || fp.endsWith('.d.ts') || fp.includes('/dist/')) continue
      const rel = relFromRoot(ctx.root, fp)
      if (ctx.mode !== 'full' && !inScope.has(rel)) continue

      // Vague class names
      for (const cls of sf.getClasses()) {
        const name = cls.getName() ?? ''
        if (VAGUE_SUFFIX.test(name)) {
          issues.push({
            file: rel,
            line: cls.getStartLineNumber(),
            kind: 'naming-smell',
            severity: 'info',
            evidence: `class name "${name}" is vague (Manager/Helper/Util families)`,
            detector: 'naming',
            confidence: 0.6,
            suggestion: 'name should describe what it does, not its shape',
          })
        }
      }

      // Single-letter locals outside conventional contexts
      for (const v of sf.getVariableDeclarations()) {
        const name = v.getName()
        if (name.length === 1 && !ALLOWED_SHORT.test(name)) {
          // Only flag at function-body scope, not destructuring or array elements
          const parent = v.getParent()?.getParent?.()
          if (parent && parent.getKind() === SyntaxKind.VariableStatement) {
            issues.push({
              file: rel,
              line: v.getStartLineNumber(),
              kind: 'naming-smell',
              severity: 'info',
              evidence: `single-letter local "${name}"`,
              detector: 'naming',
              confidence: 0.4,
            })
          }
        }
      }
    }
    return issues
  },
}

function relFromRoot(root: string, abs: string): string {
  const r = root.replace(/\\/g, '/')
  return abs.startsWith(r + '/') ? abs.slice(r.length + 1) : abs
}
