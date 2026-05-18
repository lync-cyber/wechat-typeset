/**
 * Variant 实证采用率分析（纯函数）。
 *
 * 边界：本文件**不读文件系统**——它接受 spec 数组 + variant def 数组，产出"谁被
 * 谁采用 / 谁孤儿"的分析结果。CLI（scripts/variant-usage.ts）与守卫测试
 * （tests/unit/variant-coverage.spec.ts）都导入本模块；分析逻辑不双写。
 *
 * 三类身份：
 *   - default       —— 至少有一个 spec.variants[kind] === id
 *   - themeCompat   —— meta.themeCompat 至少含一个主题
 *   - orphan        —— 既无 default 又无 themeCompat
 *
 * orphan = 实验性候选；本模块只识别身份，不做迁移决策（VariantMeta.experimental 标记
 * 是设计者的显式确认，本分析不修改源码）。
 */

import { VARIANT_IDS } from '../themes/types'
import type { PersonaSpec } from '../themes/_shared/spec'
import { getEffectiveCompat, type VariantDef, type CodeBlockDef } from './_core'

/** 仅含 VARIANT_IDS 覆盖的 12 个 kind（codeBlock / none 不在 spec.variants 命名空间内）。 */
type AnalyzableKind = keyof typeof VARIANT_IDS

export interface VariantUsageEntry {
  kind: AnalyzableKind
  id: string
  /** 把本 variant 作为默认骨架的主题 id 列表。 */
  defaultBy: readonly string[]
  /** meta.themeCompat 声明的推荐主题 id 列表（空 = variant 自身未声明）。 */
  themeCompat: readonly string[]
  /** meta.experimental 标记（作者显式确认"在等首个采用方"）。 */
  experimental: boolean
  /** 综合身份。orphan = 既无 default 又无 themeCompat。 */
  status: 'default' | 'themeCompat' | 'orphan'
}

export interface VariantUsageReport {
  entries: readonly VariantUsageEntry[]
  orphans: readonly VariantUsageEntry[]
  /** 既不在 VARIANT_IDS 又被某 spec 引用（应被 validateSpec 拦截，留作交叉守卫）。 */
  unknownReferenced: ReadonlyArray<{ kind: string; id: string; themeId: string }>
}

type AnyVariantDef = VariantDef<unknown> | CodeBlockDef

function isAnalyzableKind(k: string): k is AnalyzableKind {
  return k in VARIANT_IDS
}

export function analyzeVariantUsage(
  specs: readonly PersonaSpec[],
  defs: readonly AnyVariantDef[],
): VariantUsageReport {
  // 1) 收集 default 选用
  const defaultUsage: Record<string, Set<string>> = {}
  const unknownReferenced: Array<{ kind: string; id: string; themeId: string }> = []
  for (const spec of specs) {
    for (const [kind, id] of Object.entries(spec.variants ?? {})) {
      if (typeof id !== 'string') continue
      if (!isAnalyzableKind(kind)) {
        unknownReferenced.push({ kind, id, themeId: spec.id })
        continue
      }
      const allowed = VARIANT_IDS[kind] as readonly string[]
      if (!allowed.includes(id)) {
        unknownReferenced.push({ kind, id, themeId: spec.id })
        continue
      }
      ;(defaultUsage[kind] = defaultUsage[kind] ?? new Set()).add(id)
    }
  }
  // 反向：id → defaultBy[]
  const defaultByMap: Record<string, Record<string, string[]>> = {}
  for (const spec of specs) {
    for (const [kind, id] of Object.entries(spec.variants ?? {})) {
      if (typeof id !== 'string' || !isAnalyzableKind(kind)) continue
      defaultByMap[kind] ??= {}
      defaultByMap[kind][id] ??= []
      defaultByMap[kind][id].push(spec.id)
    }
  }

  // 2) def 表索引（kind/id → meta）
  const defByKindId: Record<string, Record<string, AnyVariantDef>> = {}
  for (const def of defs) {
    const k = def.meta.kind
    if (k === 'none') continue
    defByKindId[k] ??= {}
    defByKindId[k][def.meta.id] = def
  }

  // 3) 按 VARIANT_IDS 主表枚举（这是单一真源）
  const entries: VariantUsageEntry[] = []
  for (const kind of Object.keys(VARIANT_IDS) as AnalyzableKind[]) {
    const ids = VARIANT_IDS[kind] as readonly string[]
    for (const id of ids) {
      const def = defByKindId[kind]?.[id]
      // 等效白名单：signatureOf 与 themeCompat 一律走 getEffectiveCompat
      const themeCompat = getEffectiveCompat(def?.meta)
      const defaultBy = defaultByMap[kind]?.[id] ?? []
      const experimental = def?.meta.experimental === true
      const status: VariantUsageEntry['status'] =
        defaultBy.length > 0 ? 'default' : themeCompat.length > 0 ? 'themeCompat' : 'orphan'
      entries.push({ kind, id, defaultBy, themeCompat, experimental, status })
    }
  }

  return {
    entries,
    orphans: entries.filter((e) => e.status === 'orphan'),
    unknownReferenced,
  }
}
