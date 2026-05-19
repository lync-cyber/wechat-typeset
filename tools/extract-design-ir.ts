#!/usr/bin/env tsx
/**
 * 设计稿 → DesignIR JSON 提取器。
 *
 *   pnpm tsx tools/extract-design-ir.ts             # 提取并写 docs/generated/design-ir/
 *   pnpm tsx tools/extract-design-ir.ts --check     # 只校验不写，CI 用
 *   pnpm tsx tools/extract-design-ir.ts --files content-1.html,content-2.html
 *
 * 解析 docs/wechat-typeset-container/content-{1,2,3,4}.html，按 `.variant[data-motif]`
 * 卡抽出每条 DesignIR，落到：
 *   - docs/generated/design-ir/index.json         不含 rawHtml 的全集索引
 *   - docs/generated/design-ir/<kind>.<id>.json   单卡详细（含 rawHtml）
 *
 * 同时跑两项校验：
 *   - "variantId 在 src/core/variants/<kind>/<id>.ts 存在"
 *   - "kind 是已知 markdown fence"
 * 任何未通过 = warn 写 stderr，--check 模式下 exit 1。
 */

import './shim-jsdom'
import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { resolve, join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { JSDOM } from 'jsdom'
import {
  type DesignIR,
  type DesignIRIndexEntry,
  type DesignTheme,
  type IRBox,
  type IRDecoration,
  type IRSlot,
  type IRSlotRole,
  DESIGN_THEME_TO_RECOMMENDED_THEME,
  styleToBox,
} from '../src/core/design-ir'

const __dirname_ = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname_, '..')

const FENCE_TO_KIND: Record<string, string> = {
  tip: 'admonition',
  warning: 'admonition',
  info: 'admonition',
  danger: 'admonition',
  admonition: 'admonition',
  note: 'note',
  'quote-card': 'quote',
  highlight: 'highlight',
  'pull-quote': 'pull-quote',
  compare: 'compare',
  steps: 'steps',
  dialogue: 'dialogue',
  'qa-block': 'qa-block',
  'table-card': 'table-card',
  gallery: 'gallery',
  announcement: 'announcement',
  recommend: 'recommend',
  qrcode: 'qrcode',
  divider: 'divider',
  'section-title': 'section-title',
  footnotes: 'footnotes',
  'footer-cta': 'footer-cta',
}

/**
 * var-id label → kebab-case variant id。
 *
 *   "01·A NUMBERED RULE"   → "numbered-rule"
 *   "02·B PAPER SLIP"      → "paper-slip"
 *   "01·B HANGING NB."     → "hanging-nb"
 *
 * 去掉前缀编号段、末尾标点，剩下英文 + 数字 lower-kebab。
 */
export function inferVariantIdFromLabel(label: string): string {
  // 编号段头：'01·A' / '04・B' / 'P.Q.04·D' 之类。中点匹配 ASCII '.' / U+00B7 / U+30FB / U+22C5 / U+2219
  const stripped = label.replace(/^[^\s]+[.·・⋅∙][^\s]+\s+/u, '').trim()
  const cleaned = stripped.replace(/[.,;:。，；：]+$/u, '').trim()
  return cleaned
    .toLowerCase()
    .split(/\s+/)
    .map((seg) => seg.replace(/[^a-z0-9]/g, ''))
    .filter(Boolean)
    .join('-')
}

type DomEl = ReturnType<JSDOM['window']['document']['createElement']>

function detectDesignTheme(el: DomEl): DesignTheme | null {
  for (const cls of Array.from(el.classList)) {
    if (cls === 't1' || cls === 't2' || cls === 't3' || cls === 't4') return cls as DesignTheme
  }
  return null
}

function elementChildren(el: DomEl): DomEl[] {
  return Array.from(el.children) as DomEl[]
}

function parseLengthPx(v: string | undefined): number | null {
  if (!v) return null
  const m = v.match(/^(-?\d+(?:\.\d+)?)px$/i)
  return m ? Number.parseFloat(m[1]) : null
}

function inferSlotRole(
  box: IRBox,
  el: DomEl,
  indexInParent: number,
  totalSiblings: number,
): IRSlotRole {
  if (box.writingMode && box.writingMode.includes('vertical')) return 'leftCol'
  const hasP = el.querySelector('p') !== null
  const widthPx = parseLengthPx(box.width)
  const hasBorder = !!(box.border || box.borderTop || box.borderRight || box.borderBottom || box.borderLeft)
  if (widthPx !== null && widthPx <= 60 && (hasBorder || box.background)) return 'badge'
  if (hasP) return 'body'
  if (totalSiblings === 2 && indexInParent === 0 && widthPx !== null && widthPx <= 80) return 'leftCol'
  if (totalSiblings === 2 && indexInParent === 1) return 'body'
  const text = (el.textContent ?? '').trim()
  if (text && text.length <= 30 && !hasP) return 'kicker'
  return 'unknown'
}

function collectDecorations(el: DomEl, designTheme: DesignTheme, depth = 0): IRDecoration[] {
  if (depth > 2) return []
  const out: IRDecoration[] = []
  for (const child of elementChildren(el)) {
    const styleAttr = child.getAttribute('style') ?? ''
    const box = styleToBox(styleAttr, designTheme)
    const text = (child.textContent ?? '').trim()

    if (box.transform && /rotate/i.test(box.transform) && text) {
      out.push({
        kind: 'rotated-mark',
        text,
        box,
        rotate: box.transform.match(/rotate\(([^)]+)\)/)?.[1],
      })
      continue
    }
    const widthPx = parseLengthPx(box.width)
    const heightPx = parseLengthPx(box.height)
    if (widthPx !== null && heightPx !== null && box.background && !text) {
      out.push({ kind: 'mini-box', box })
      continue
    }
    const isThinLine =
      (heightPx !== null && heightPx <= 2) ||
      /^1px /.test(box.border ?? '') ||
      /^1px /.test(box.borderBottom ?? '')
    if (isThinLine && !text) {
      out.push({ kind: 'rule-line', box })
      continue
    }
    if (text && text.length <= 80 && !child.querySelector('p')) {
      out.push({ kind: 'text', text, box })
      continue
    }
    if (child.children.length > 0) {
      out.push(...collectDecorations(child, designTheme, depth + 1))
    }
  }
  return out
}

interface ExtractCtx {
  file: string
  containerName: string
}

function extractOneVariant(variantEl: DomEl, ctx: ExtractCtx): DesignIR | null {
  const labelEl = variantEl.querySelector('.v-label .var-id')
  const phone = variantEl.querySelector('.phone') as DomEl | null
  const phoneInner = variantEl.querySelector('.phone-inner') as DomEl | null
  if (!labelEl || !phone || !phoneInner) return null

  const varIdLabel = (labelEl.textContent ?? '').trim()
  const variantId = inferVariantIdFromLabel(varIdLabel)
  if (!variantId) return null

  const designTheme = detectDesignTheme(phone)
  if (!designTheme) return null

  const motif = variantEl.getAttribute('data-motif') ?? ''
  const kind = FENCE_TO_KIND[ctx.containerName] ?? ctx.containerName

  const wrapperEl = elementChildren(phoneInner)[0]
  if (!wrapperEl) return null

  const wrapper = styleToBox(wrapperEl.getAttribute('style') ?? '', designTheme)
  const slotEls = elementChildren(wrapperEl)
  const slots: IRSlot[] = []
  const topLevelDecorations: IRDecoration[] = []
  slotEls.forEach((slotEl, idx) => {
    const slotBox = styleToBox(slotEl.getAttribute('style') ?? '', designTheme)
    const slotText = (slotEl.textContent ?? '').trim()
    if (slotBox.position === 'absolute') {
      if (slotBox.transform && /rotate/i.test(slotBox.transform) && slotText) {
        topLevelDecorations.push({
          kind: 'rotated-mark',
          text: slotText,
          box: slotBox,
          rotate: slotBox.transform.match(/rotate\(([^)]+)\)/)?.[1],
        })
      } else {
        const decoration: IRDecoration = {
          kind: slotText ? 'text' : 'mini-box',
          box: slotBox,
        }
        if (slotText) decoration.text = slotText
        topLevelDecorations.push(decoration)
      }
      return
    }
    const role = inferSlotRole(slotBox, slotEl, idx, slotEls.length)
    const decorations = collectDecorations(slotEl, designTheme)
    const bodyP = slotEl.querySelector('p')
    const slot: IRSlot = { role, box: slotBox, decorations }
    if (role === 'body' && bodyP) {
      slot.bodyText = (bodyP.textContent ?? '').trim()
    }
    // 叶子 slot 的装饰短串（slot 没子 element 时 textContent 即签条/徽章文字）
    if (slotEl.children.length === 0) {
      const leaf = (slotEl.textContent ?? '').trim()
      if (leaf && leaf.length <= 20) slot.slotText = leaf
    }
    slots.push(slot)
  })

  return {
    source: { file: ctx.file, line: 0, varIdLabel },
    variantId,
    kind,
    containerName: ctx.containerName,
    designTheme,
    recommendedThemeId: DESIGN_THEME_TO_RECOMMENDED_THEME[designTheme],
    motif,
    wrapper,
    slots,
    topLevelDecorations,
    rawHtml: phoneInner.innerHTML.trim(),
  }
}

function approximateLine(haystack: string, needle: string): number {
  if (!needle) return 0
  const idx = haystack.indexOf(needle.slice(0, 80))
  if (idx < 0) return 0
  let line = 1
  for (let i = 0; i < idx; i++) if (haystack.charCodeAt(i) === 10) line++
  return line
}

function extractFromHtml(html: string, file: string): DesignIR[] {
  const dom = new JSDOM(html)
  const doc = dom.window.document
  const out: DesignIR[] = []
  const groups = Array.from(doc.querySelectorAll('.container-group'))
  for (const group of groups) {
    const codeEl = group.querySelector('.cg-head .code')
    const containerName = (codeEl?.textContent ?? '').trim()
    if (!containerName) continue
    const variantEls = Array.from(group.querySelectorAll('.variant'))
    for (const ve of variantEls) {
      const ir = extractOneVariant(ve as DomEl, { file, containerName })
      if (!ir) continue
      const labelEl = (ve as DomEl).querySelector('.v-label')
      ir.source.line = approximateLine(html, labelEl?.outerHTML ?? '')
      out.push(ir)
    }
  }
  return out
}

// ───────── 校验 ─────────

/**
 * kind → src/core/variants/<dir>/ 目录名映射。
 *
 * 缺失 = 该 kind 走"无 variant 系"的容器实现（如 bar-chart 是 databrief/metrics.ts 直接渲染），
 * validate 跳过"variant ts 存在"检查，IR 仍然产出（作为几何参照 / 文档锚点用）。
 */
const KIND_TO_DIR: Record<string, string> = {
  admonition: 'admonition',
  note: 'note',
  quote: 'quote',
  highlight: 'highlight',
  'pull-quote': 'pull-quote',
  compare: 'compare',
  steps: 'steps',
  dialogue: 'dialogue',
  'qa-block': 'qa-block',
  'table-card': 'table-card',
  gallery: 'gallery',
  announcement: 'announcement',
  recommend: 'recommend',
  qrcode: 'qrcode',
  divider: 'divider',
  'section-title': 'section-title',
  footnotes: 'footnotes',
  'footer-cta': 'footer-cta',
}

/** 已知"无 variant 系"的容器名——不参与 variantId 实现存在性校验。 */
const KNOWN_NON_VARIANT_KINDS = new Set<string>(['bar-chart'])

interface ValidationIssue {
  severity: 'error' | 'warning'
  message: string
}

function validate(irs: DesignIR[]): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  // duplicate variantId within same kind?
  const seen = new Map<string, DesignIR>()
  for (const ir of irs) {
    const key = `${ir.kind}/${ir.variantId}`
    const prev = seen.get(key)
    if (prev) {
      issues.push({
        severity: 'warning',
        message: `重复 IR: ${key}（首见 ${prev.source.file}:${prev.source.line}, 重复 ${ir.source.file}:${ir.source.line}）`,
      })
    } else {
      seen.set(key, ir)
    }
  }
  // variantId 是否在 src/core/variants/{kind}/{id}.ts 存在？
  for (const ir of irs) {
    if (KNOWN_NON_VARIANT_KINDS.has(ir.kind)) continue
    const dir = KIND_TO_DIR[ir.kind]
    if (!dir) {
      issues.push({
        severity: 'warning',
        message: `${ir.source.file}:${ir.source.line} 未知 kind '${ir.kind}'（容器名 ${ir.containerName}）`,
      })
      continue
    }
    const tsPath = resolve(repoRoot, 'src/core/variants', dir, `${ir.variantId}.ts`)
    if (!existsSync(tsPath)) {
      issues.push({
        severity: 'warning',
        message: `${ir.source.file}:${ir.source.line} variant '${ir.kind}/${ir.variantId}' 未在 ${tsPath} 实现（label="${ir.source.varIdLabel}"）`,
      })
    }
  }
  return issues
}

// ───────── CLI ─────────

interface CliArgs {
  check: boolean
  files: string[]
}

function parseCliArgs(argv: string[]): CliArgs {
  const out: CliArgs = { check: false, files: [] }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--check') out.check = true
    else if (a === '--files') {
      const next = argv[++i]
      if (next) out.files = next.split(',').map((s) => s.trim()).filter(Boolean)
    } else if (a === '--help' || a === '-h') {
      process.stdout.write(
        [
          'extract-design-ir —— 设计稿 → DesignIR JSON',
          '',
          'Options:',
          '  --check                只校验不写（CI）',
          '  --files <a,b,...>      仅处理列出的 html 文件名（默认 content-1..4）',
          '',
        ].join('\n'),
      )
      process.exit(0)
    }
  }
  return out
}

const DEFAULT_HTML_FILES = ['content-1.html', 'content-2.html', 'content-3.html', 'content-4.html']

function main(): void {
  const args = parseCliArgs(process.argv.slice(2))
  const designDir = resolve(repoRoot, 'docs/wechat-typeset-container')
  const outDir = resolve(repoRoot, 'docs/generated/design-ir')

  const files = (args.files.length ? args.files : DEFAULT_HTML_FILES).filter((f) => {
    const abs = join(designDir, f)
    if (!existsSync(abs)) {
      process.stderr.write(`[extract-design-ir] 跳过缺失文件: ${f}\n`)
      return false
    }
    return true
  })

  const all: DesignIR[] = []
  for (const f of files) {
    const html = readFileSync(join(designDir, f), 'utf8')
    const irs = extractFromHtml(html, f)
    all.push(...irs)
    process.stdout.write(`[extract-design-ir] ${f} → ${irs.length} IR\n`)
  }

  const issues = validate(all)
  for (const i of issues) {
    process.stderr.write(`[${i.severity}] ${i.message}\n`)
  }

  const hasError = issues.some((i) => i.severity === 'error')
  if (args.check) {
    if (hasError) {
      process.stderr.write(`[extract-design-ir] --check 失败：${issues.length} issues\n`)
      process.exit(1)
    }
    process.stdout.write(`[extract-design-ir] --check 通过（warnings=${issues.length}）\n`)
    return
  }

  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })
  // 写 per-variant 文件
  for (const ir of all) {
    const name = `${ir.kind}.${ir.variantId}.json`
    writeFileSync(join(outDir, name), JSON.stringify(ir, null, 2) + '\n', 'utf8')
  }
  // 孤儿 IR 文件检测：仅在"全量"模式（不带 --files）下生效。
  // 带 --files 时本轮只产部分 JSON，比对全集毫无意义，跳过。
  if (args.files.length === 0) {
    const expected = new Set([
      'index.json',
      ...all.map((ir) => `${ir.kind}.${ir.variantId}.json`),
    ])
    for (const name of readdirSync(outDir)) {
      if (!expected.has(name) && name.endsWith('.json')) {
        process.stderr.write(`[extract-design-ir] 孤儿 IR 文件（未在本轮产出）: ${name}\n`)
      }
    }
  }
  // 写索引（不含 rawHtml）
  const index: DesignIRIndexEntry[] = all.map(({ rawHtml: _rawHtml, ...rest }) => rest)
  writeFileSync(join(outDir, 'index.json'), JSON.stringify(index, null, 2) + '\n', 'utf8')
  process.stdout.write(
    `[extract-design-ir] 已写 ${all.length + 1} 个文件到 ${outDir} （含 index.json）\n`,
  )
}

main()
