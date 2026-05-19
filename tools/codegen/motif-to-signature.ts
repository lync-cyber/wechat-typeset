/**
 * motif-to-signature.ts
 *
 * Reads docs/wechat-typeset-container/*.html for data-motif attributes,
 * reads src/core/variants/*\/<id>.ts for signatureOf / themeCompat,
 * and outputs a "motif bucket vs signatureOf bucket" consistency report.
 *
 * Usage: npx tsx tools/codegen/motif-to-signature.ts
 * Output: docs/wechat-typeset-container/motif-signature-check.md (and stdout)
 */

import * as fs from 'node:fs'
import * as path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '../..')
const HTML_DIR = path.join(ROOT, 'docs/wechat-typeset-container')
const VARIANTS_DIR = path.join(ROOT, 'src/core/variants')
const OUT_FILE = path.join(HTML_DIR, 'motif-signature-check.md')

// ─────────────────────────────────────────────
// Step 1: Parse HTML files → motif → varId pairs
// ─────────────────────────────────────────────

interface HtmlEntry {
  file: string
  motif: string
  varId: string
  themeClass: string
}

function parseHtmlFiles(): HtmlEntry[] {
  const entries: HtmlEntry[] = []
  const files = fs.readdirSync(HTML_DIR).filter(f => f.endsWith('.html') && f !== 'index.html')

  for (const file of files) {
    const content = fs.readFileSync(path.join(HTML_DIR, file), 'utf-8')
    const lines = content.split('\n')

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const motifMatch = line.match(/data-motif="([^"]+)"/)
      if (!motifMatch) continue

      const motif = motifMatch[1]
      // Look ahead for v-label line with var-id
      let varId = ''
      let themeClass = ''
      for (let j = i + 1; j < Math.min(i + 4, lines.length); j++) {
        const labelMatch = lines[j].match(/class="var-id"[^>]*>([^<]+)</)
        const themeMatch = lines[j].match(/class="v-label\s+(t\d)/)
        if (labelMatch) varId = labelMatch[1].trim()
        if (themeMatch) themeClass = themeMatch[1]
        if (varId && themeClass) break
      }

      entries.push({ file, motif, varId, themeClass })
    }
  }

  return entries
}

// ─────────────────────────────────────────────
// Step 2: Read TS variant files → id → signatureOf/themeCompat
// ─────────────────────────────────────────────

interface VariantMeta {
  id: string
  kind: string
  signatureOf?: string
  themeCompat?: string[]
}

function parseVariantFiles(): Map<string, VariantMeta> {
  const map = new Map<string, VariantMeta>()
  const kinds = fs.readdirSync(VARIANTS_DIR).filter(d => {
    try {
      return fs.statSync(path.join(VARIANTS_DIR, d)).isDirectory()
    } catch {
      return false
    }
  })

  for (const kind of kinds) {
    const kindDir = path.join(VARIANTS_DIR, kind)
    const tsFiles = fs.readdirSync(kindDir).filter(f => f.endsWith('.ts') && !f.startsWith('_'))

    for (const tsFile of tsFiles) {
      const content = fs.readFileSync(path.join(kindDir, tsFile), 'utf-8')

      const idMatch = content.match(/id:\s*'([^']+)'/)
      if (!idMatch) continue
      const id = idMatch[1]

      const sigMatch = content.match(/signatureOf:\s*'([^']+)'/)
      const compatMatch = content.match(/themeCompat:\s*\[([^\]]+)\]/)

      const meta: VariantMeta = { id, kind }
      if (sigMatch) meta.signatureOf = sigMatch[1]
      if (compatMatch) {
        meta.themeCompat = compatMatch[1]
          .split(',')
          .map(s => s.trim().replace(/['"]/g, ''))
          .filter(Boolean)
      }

      map.set(`${kind}/${id}`, meta)
    }
  }

  return map
}

// ─────────────────────────────────────────────
// Step 3: Map HTML var-ids to TS variant IDs
// ─────────────────────────────────────────────

// Known mapping from content-1.html var-ids to src/core/variants variant IDs
// keyed by var-id text (uppercase) → kind/id
const VAR_ID_TO_VARIANT: Record<string, string> = {
  '01·A NUMBERED RULE': 'admonition/numbered-rule',
  '01·B HANGING NB.': 'admonition/hanging-nb',
  '02·A VERMILION SEAL': 'admonition/vermilion-seal',
  '02·B PAPER SLIP': 'admonition/paper-slip',
  '03·A FIELD TAG': 'admonition/field-tag',
  '03·B SPECIMEN BOX': 'admonition/specimen-box',
  '04·A FILLED SQUARE': 'admonition/filled-square',
  '04·B TRIANGLE TOP': 'admonition/triangle-top',
  '01·A ED. SIGN-OFF': 'note/ed-signoff',
  '01·B INLINE LABEL': 'note/inline-label',
  '02·A INTERLINEAR GLOSS': 'note/interlinear-gloss',
  '02·B VERMILION GLOSS': 'note/vermilion-gloss',
  '03·A RULER NOTE': 'note/ruler-note',
  '03·B LATIN SUBHEAD': 'note/latin-subhead',
  '04·A INITIAL DISC': 'note/initial-disc',
  '04·B GEOMETRIC MARK': 'note/geometric-mark',
  '01·A OVERSIZED MARK': 'quote/oversized-mark',
  '01·B NUMBERED LINES': 'quote/numbered-lines',
  '02·A SEAL & KAI': 'quote/seal-kai',
  '02·B DOUBLE FRAME': 'quote/double-frame',
  '03·A SPECIMEN QUOTE': 'quote/specimen-quote',
  '03·B BINOMIAL ATTRIB': 'quote/binomial-attrib',
  '04·A HUGE NUMERAL': 'quote/huge-numeral',
  '04·B RING DEVICE': 'quote/ring-device',
  '01·A DOTTED UNDERLINE': 'highlight/dotted-underline',
  '01·B TRACKED EMPHASIS': 'highlight/tracked-emphasis',
  '02·A VERMILION INLINE': 'highlight/vermilion-inline',
  '02·B SIDE DOTS': 'highlight/side-dots',
  '03·A WASH GROUND': 'highlight/wash-ground',
  '03·B BRACKETED TICK': 'highlight/bracketed-tick',
  '04·A GEOMETRIC FLAG': 'highlight/geometric-flag',
  '04·B SINGLE STROKE': 'highlight/single-stroke',
  '01·A WEIGHT CONTRAST': 'pull-quote/weight-contrast',
  '01·B DROP CAPITAL': 'pull-quote/drop-capital',
  '02·A CALLIGRAPHIC': 'pull-quote/calligraphic',
  '02·B WITH GLOSS': 'pull-quote/with-gloss',
  '03·A BILINGUAL STACK': 'pull-quote/bilingual-stack',
  '03·B CALIPER MARK': 'pull-quote/caliper-mark',
  '04·A INVERTED PLATE': 'pull-quote/inverted-plate',
  '04·B GRID BLOCK': 'pull-quote/grid-block',
}

// ─────────────────────────────────────────────
// Step 4: Build motif → [variant + signature] map
// ─────────────────────────────────────────────

interface MotifEntry {
  variantKey: string
  signatureOf?: string
  themeCompat?: string[]
  htmlVarId: string
  sourceFile: string
}

function buildMotifBuckets(
  htmlEntries: HtmlEntry[],
  variantMap: Map<string, VariantMeta>,
): Map<string, MotifEntry[]> {
  const buckets = new Map<string, MotifEntry[]>()

  for (const entry of htmlEntries) {
    if (!entry.motif) continue

    const variantKey = VAR_ID_TO_VARIANT[entry.varId] ?? null
    const meta = variantKey ? variantMap.get(variantKey) : null

    const motifEntry: MotifEntry = {
      variantKey: variantKey ?? `(html-only:${entry.varId})`,
      signatureOf: meta?.signatureOf,
      themeCompat: meta?.themeCompat,
      htmlVarId: entry.varId,
      sourceFile: entry.file,
    }

    if (!buckets.has(entry.motif)) buckets.set(entry.motif, [])
    buckets.get(entry.motif)!.push(motifEntry)
  }

  return buckets
}

// ─────────────────────────────────────────────
// Step 5: Generate report
// ─────────────────────────────────────────────

function effectiveSignature(e: MotifEntry): string | null {
  if (e.signatureOf) return e.signatureOf
  if (e.themeCompat && e.themeCompat.length > 0) return e.themeCompat[0]
  return null
}

function generateReport(buckets: Map<string, MotifEntry[]>): string {
  const lines: string[] = [
    '# motif-to-signature 一致性报告',
    '',
    `生成时间: ${new Date().toISOString()}`,
    '',
    '> 仅列出 content-1.html 中有对应 src/core/variants TS 文件的 variant。',
    '> 其余 HTML 文件的 variant 为画布原型，暂无 TS 对应（标注为 html-only）。',
    '',
    '---',
    '',
  ]

  // Only process entries that have TS variants (content-1.html based)
  const tsOnlyBuckets = new Map<string, MotifEntry[]>()
  for (const [motif, entries] of buckets) {
    const tsEntries = entries.filter(e => !e.variantKey.startsWith('(html-only:'))
    // Deduplicate by variantKey
    const seen = new Set<string>()
    const deduped = tsEntries.filter(e => {
      if (seen.has(e.variantKey)) return false
      seen.add(e.variantKey)
      return true
    })
    if (deduped.length > 0) tsOnlyBuckets.set(motif, deduped)
  }

  const consistent: string[] = []
  const inconsistent: string[] = []

  for (const [motif, entries] of [...tsOnlyBuckets.entries()].sort()) {
    const sigs = entries.map(e => effectiveSignature(e)).filter(Boolean) as string[]
    const uniqueSigs = [...new Set(sigs)]
    const isConsistent = uniqueSigs.length <= 1
    const mark = isConsistent ? '✓' : '✗'

    const block: string[] = [
      `## motif: ${motif}`,
      '',
      '  variants:',
    ]

    for (const e of entries) {
      const sig = e.signatureOf
        ? `signatureOf: ${e.signatureOf}`
        : e.themeCompat
          ? `themeCompat: [${e.themeCompat.join(', ')}]`
          : '(no signature)'
      block.push(`    ${e.variantKey} → ${sig}`)
    }

    block.push('')
    if (isConsistent) {
      const sig = uniqueSigs[0] ?? '(none)'
      block.push(`  conclusion: 同手法变体全部签名 ${sig} ${mark} (一致)`)
    } else {
      block.push(`  conclusion: 签名不一致 ${mark}`)
      block.push(`  差异列表: ${uniqueSigs.join(' vs ')}`)
    }
    block.push('')

    lines.push(...block)

    if (isConsistent) consistent.push(motif)
    else inconsistent.push(motif)
  }

  lines.push('---', '')
  lines.push('## 汇总', '')
  lines.push(`- 总 motif 桶（有 TS variant）: ${tsOnlyBuckets.size}`)
  lines.push(`- 一致 ✓: ${consistent.length} — ${consistent.join(', ')}`)
  lines.push(`- 不一致 ✗: ${inconsistent.length}${inconsistent.length > 0 ? ' — ' + inconsistent.join(', ') : ''}`)
  lines.push('')

  // HTML-only counts per motif
  lines.push('## HTML 原型 data-motif 分布（含 html-only variant）', '')
  const allCounts = new Map<string, number>()
  for (const [motif, entries] of buckets) {
    allCounts.set(motif, entries.length)
  }
  for (const [motif, count] of [...allCounts.entries()].sort()) {
    lines.push(`- ${motif}: ${count} variant`)
  }
  lines.push('')

  return lines.join('\n')
}

// ─────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────

const htmlEntries = parseHtmlFiles()
const variantMap = parseVariantFiles()
const buckets = buildMotifBuckets(htmlEntries, variantMap)
const report = generateReport(buckets)

fs.writeFileSync(OUT_FILE, report, 'utf-8')
console.log(report)
console.log(`\nReport written to: ${OUT_FILE}`)
