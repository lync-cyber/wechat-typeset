import { getContainerSpec } from '../../../../src/public'
import type { AnnotatePatch } from './annotate'

export interface AnnotateApplySkipped {
  patch: AnnotatePatch
  reason: string
}

export interface AnnotateApplyResult {
  md: string
  applied: number
  skipped: AnnotateApplySkipped[]
}

interface Range {
  line: number
  endLine: number
}

function rangesOverlap(a: Range, b: Range): boolean {
  return !(a.endLine < b.line || b.endLine < a.line)
}

function transformLines(srcLines: string[], patch: AnnotatePatch): string[] | null {
  const spec = getContainerSpec(patch.container)
  if (!spec) return null
  const fence = spec.fenceLength === 4 ? '::::' : ':::'
  const variantSuffix = patch.variant ? ` variant=${patch.variant}` : ''
  const open = `${fence} ${patch.container}${variantSuffix}`

  let body: string[]
  switch (patch.kind) {
    case 'wrap_blockquote':
      body = srcLines.map((l) => l.replace(/^>\s?/, ''))
      break
    case 'wrap_section_title':
      body = srcLines.map((l) => l.replace(/^#{1,6}\s+/, ''))
      break
    case 'wrap_paragraph':
    case 'wrap_first_paragraph':
    case 'convert_list':
      body = srcLines
      break
    case 'wrap_pros_cons':
      return null
    default:
      return null
  }
  return [open, ...body, fence]
}

export function applyPatches(md: string, patches: readonly AnnotatePatch[]): AnnotateApplyResult {
  const lines = md.split(/\r?\n/)
  const totalLines = lines.length
  const sorted = [...patches].sort((a, b) => b.line - a.line)

  const appliedRanges: Range[] = []
  const skipped: AnnotateApplySkipped[] = []
  let applied = 0

  for (const patch of sorted) {
    if (
      !Number.isInteger(patch.line) ||
      !Number.isInteger(patch.endLine) ||
      patch.line < 1 ||
      patch.endLine < patch.line ||
      patch.endLine > totalLines
    ) {
      skipped.push({
        patch,
        reason: `invalid range line=${patch.line} endLine=${patch.endLine} (file has ${totalLines} lines)`,
      })
      continue
    }
    if (patch.kind === 'wrap_pros_cons') {
      skipped.push({
        patch,
        reason:
          'wrap_pros_cons requires manual structure (two distinct lists). Use `containers snippet --name compare` and place the pros/cons by hand.',
      })
      continue
    }
    const range: Range = { line: patch.line, endLine: patch.endLine }
    if (appliedRanges.some((r) => rangesOverlap(range, r))) {
      skipped.push({
        patch,
        reason: 'range overlaps a previously applied patch',
      })
      continue
    }
    const from = patch.line - 1
    const to = patch.endLine
    const src = lines.slice(from, to)
    const transformed = transformLines(src, patch)
    if (!transformed) {
      skipped.push({
        patch,
        reason: `unknown container "${patch.container}" (use \`containers list\` for vocabulary)`,
      })
      continue
    }
    lines.splice(from, to - from, ...transformed)
    appliedRanges.push(range)
    applied++
  }

  return { md: lines.join('\n'), applied, skipped }
}
