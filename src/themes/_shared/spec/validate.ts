/**
 * validateSpec：一次性扫描 PersonaSpec 是否符合硬约束。
 *
 * 错误分类：
 *   - hex 合法（palette / status）
 *   - status 四态齐全
 *   - motif primitives 硬约束：字号 ≥ 14、stroke-width ≥ 1、font-family 白名单
 *   - signatureContainers 在 SUPPORTED_SIGNATURE_CONTAINERS 注册
 *   - variants 指向的 variant id 存在（VARIANT_IDS 反查）
 *
 * 这是 conformance 测试和 CLI (`pnpm validate:spec`) 的共用实现。
 */

import { VARIANT_IDS, type ThemeVariants, type VariantKind } from '../../types'
import {
  SUPPORTED_SIGNATURE_CONTAINERS,
  type MotifPrimitive,
  type MotifShape,
  type MotifTemplate,
  type PersonaSpec,
  type SpecValidationIssue,
  type SpecValidationResult,
  type StatusKey,
} from './types'

// 单一真源：build-capabilities.ts 会 import 这些常量生成契约文件 hardRules 段。
// 改阈值 = 改这里一处，capabilities.json 自动跟进。
export const HEX_RE = /^#[0-9a-fA-F]{3,8}$/
export const MIN_FONT_SIZE = 14
export const MIN_STROKE_WIDTH = 1
export const ALLOWED_FONT_FAMILIES: ReadonlySet<string> = new Set([
  'serif',
  'sans-serif',
  'monospace',
])

const STATUS_KEYS: readonly StatusKey[] = ['tip', 'info', 'warning', 'danger']

function isHex(v: unknown): v is string {
  return typeof v === 'string' && HEX_RE.test(v)
}

export function validateSpec(spec: PersonaSpec): SpecValidationResult {
  const errors: SpecValidationIssue[] = []
  const warnings: SpecValidationIssue[] = []
  const err = (path: string, message: string) => errors.push({ path, message, severity: 'error' })
  const warn = (path: string, message: string) => warnings.push({ path, message, severity: 'warning' })

  // id / name / description
  if (!spec.id || typeof spec.id !== 'string') err('id', 'id must be non-empty string')
  else if (!/^[a-z][a-z0-9-]*$/.test(spec.id))
    err('id', `id must be kebab-case: "${spec.id}"`)

  if (!spec.name) err('name', 'name is required')
  if (!spec.description) err('description', 'description is required')
  if (!spec.audience) err('audience', 'audience is required')

  // palette hex
  if (!spec.palette) {
    err('palette', 'palette is required')
  } else {
    for (const [k, v] of Object.entries(spec.palette)) {
      if (!isHex(v)) err(`palette.${k}`, `"${v}" is not a valid hex color`)
    }
  }

  // status 四态齐全 + hex
  if (!spec.status) {
    err('status', 'status is required')
  } else {
    for (const key of STATUS_KEYS) {
      const pair = spec.status[key]
      if (!pair) err(`status.${key}`, `status.${key} missing`)
      else {
        if (!isHex(pair.accent)) err(`status.${key}.accent`, `"${pair.accent}" is not a valid hex`)
        if (!isHex(pair.soft)) err(`status.${key}.soft`, `"${pair.soft}" is not a valid hex`)
      }
    }
  }

  // typography / spacing / radius 基本存在性
  if (!spec.typography) err('typography', 'typography is required')
  if (!spec.spacing) err('spacing', 'spacing is required')
  if (!spec.radius) err('radius', 'radius is required')

  // variants 合法性
  if (!spec.variants) {
    err('variants', 'variants is required')
  } else {
    for (const kind of Object.keys(spec.variants) as Array<keyof ThemeVariants>) {
      const id = spec.variants[kind]
      const allowed = VARIANT_IDS[kind as VariantKind] as readonly string[] | undefined
      if (!allowed) {
        err(`variants.${String(kind)}`, `unknown variant kind`)
      } else if (!allowed.includes(id as string)) {
        err(`variants.${String(kind)}`, `"${id}" not in VARIANT_IDS.${String(kind)}`)
      }
    }
  }

  // signatureContainers
  if (spec.signatureContainers) {
    const registry = new Set<string>(SUPPORTED_SIGNATURE_CONTAINERS)
    spec.signatureContainers.forEach((id, i) => {
      if (!registry.has(id))
        err(`signatureContainers[${i}]`, `"${id}" not in SUPPORTED_SIGNATURE_CONTAINERS`)
    })
  }

  // motifs 硬约束
  if (spec.motifs) {
    validateMotifs(spec.motifs, err, warn)
  }

  // meta
  if (!spec.meta || typeof spec.meta.createdAt !== 'string')
    err('meta.createdAt', 'meta.createdAt must be an ISO string')

  return { ok: errors.length === 0, errors, warnings }
}

function validateMotifs(
  motifs: PersonaSpec['motifs'],
  err: (p: string, m: string) => void,
  warn: (p: string, m: string) => void,
) {
  for (const [key, shape] of Object.entries(motifs)) {
    if (!shape) continue
    const path = `motifs.${key}`
    if (!Array.isArray(shape.viewBox) || shape.viewBox.length !== 4) {
      err(`${path}.viewBox`, 'viewBox must be [minX, minY, width, height]')
      continue
    }
    if (shape.viewBox.some((n: unknown) => typeof n !== 'number')) {
      err(`${path}.viewBox`, 'viewBox entries must be numbers')
    }
    const prims = 'primitives' in shape ? (shape as MotifShape | MotifTemplate).primitives : null
    if (!Array.isArray(prims)) {
      err(`${path}.primitives`, 'primitives must be an array')
      continue
    }
    prims.forEach((p, i) => validatePrimitive(p, `${path}.primitives[${i}]`, err, warn))

    // MotifTemplate: 校验 placeholders 与 primitives 里出现的占位符一致
    if ('placeholders' in shape && shape.placeholders) {
      const declared = new Set(shape.placeholders)
      const seen = new Set<string>()
      for (const p of prims) collectPlaceholders(p, seen)
      for (const name of seen) {
        if (!declared.has(name))
          err(`${path}`, `primitive uses placeholder "{${name}}" not declared in placeholders`)
      }
    }
  }
}

function validatePrimitive(
  p: MotifPrimitive,
  path: string,
  err: (p: string, m: string) => void,
  warn: (p: string, m: string) => void,
): void {
  if (!p || typeof p !== 'object' || !('type' in p)) {
    err(path, 'primitive must be a tagged object')
    return
  }
  if (p.type === 'text') {
    if (typeof p.fontSize !== 'number' || p.fontSize < MIN_FONT_SIZE)
      err(`${path}.fontSize`, `fontSize ${p.fontSize} < ${MIN_FONT_SIZE} (WeChat rasterization floor)`)
    if (p.fontFamily && !ALLOWED_FONT_FAMILIES.has(p.fontFamily))
      err(
        `${path}.fontFamily`,
        `"${p.fontFamily}" not in whitelist {serif|sans-serif|monospace}`,
      )
  }
  if (p.type === 'group') {
    if (!Array.isArray(p.children)) {
      err(`${path}.children`, 'group.children must be an array')
    } else {
      p.children.forEach((c, i) => validatePrimitive(c, `${path}.children[${i}]`, err, warn))
    }
    return
  }
  const strokeWidth = (p as { strokeWidth?: number }).strokeWidth
  const hasStroke = p.type === 'line' || (p as { stroke?: string }).stroke
  if (hasStroke && typeof strokeWidth === 'number' && strokeWidth < MIN_STROKE_WIDTH) {
    err(`${path}.strokeWidth`, `strokeWidth ${strokeWidth} < ${MIN_STROKE_WIDTH}`)
  }
}

function collectPlaceholders(p: MotifPrimitive, into: Set<string>): void {
  for (const [k, v] of Object.entries(p)) {
    if (k === 'children' && Array.isArray(v)) {
      for (const c of v as MotifPrimitive[]) collectPlaceholders(c, into)
      continue
    }
    if (typeof v === 'string') {
      const re = /\{(\w+)\}/g
      let m: RegExpExecArray | null
      while ((m = re.exec(v))) into.add(m[1])
    }
  }
}
