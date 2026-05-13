/**
 * 注册表一致性 —— 容器 / variant 双向闭环守卫(P0)。
 *
 * 已有 variant-sanity.spec.ts 锁住 "声明 → 实现 + 跨主题渲染不炸";
 * 已有 component-lib.spec.ts 锁住 "声明 → 至少一条 snippet";
 * 本文件补两条反向断言:
 *   1. 反向(实现 → 声明):ALL_VARIANT_DEFS 里每个 def.meta.id 都必须在 VARIANT_IDS[kind] 里。
 *      防 "新增 variant 文件但忘了登记 VARIANT_IDS" 的漏入。
 *   2. vocab ↔ CONTAINER_REGISTRY 等集:每个 vocabulary 声明都有 renderer,反之亦然。
 *      防 "加 renderer 忘改 vocab" / "改 vocab 忘加 renderer" 的双向漂移。
 *   3. theme.variants 每个 id 都在 VARIANT_IDS 内(TS 已强制,运行时再验一次,防 spec-driven 主题
 *      产生的 ThemeVariants 跑出意外 id)。
 */

import { describe, expect, it } from 'vitest'
import { ALL_VARIANT_DEFS } from '../../src/core/variants/registry'
import { VARIANT_IDS, type VariantKind } from '../../src/core/themes/types'
import { CONTAINER_REGISTRY } from '../../src/core/pipeline/containers'
import { CONTAINER_NAMES } from '../../src/core/vocabulary/vocabulary'
import { themeList } from '../../src/core/themes'

describe('反向注册:实现 → 声明', () => {
  it('每个 ALL_VARIANT_DEFS 条目的 (kind, id) 都在 VARIANT_IDS 内(kind=none 例外)', () => {
    const orphans: Array<{ kind: string; id: string }> = []
    for (const def of ALL_VARIANT_DEFS) {
      const kind = def.meta.kind
      // kind:'none' 是自由组件(非 variant),不进 VARIANT_IDS
      if (kind === 'none') continue
      const declared = VARIANT_IDS[kind as VariantKind] as readonly string[]
      if (!declared.includes(def.meta.id)) {
        orphans.push({ kind, id: def.meta.id })
      }
    }
    expect(orphans, `这些 variant 实现存在但未声明在 VARIANT_IDS: ${JSON.stringify(orphans)}`).toEqual([])
  })
})

describe('vocab ↔ CONTAINER_REGISTRY 等集', () => {
  it('每个 vocabulary 容器都有 renderer', () => {
    const vocabSet = new Set(CONTAINER_NAMES)
    const registryKeys = Object.keys(CONTAINER_REGISTRY)
    const missing = [...vocabSet].filter((n) => !registryKeys.includes(n))
    expect(missing, `这些容器在 vocabulary 声明但缺 renderer: ${JSON.stringify(missing)}`).toEqual([])
  })

  it('每个 renderer 都有 vocabulary 声明', () => {
    const vocabSet = new Set(CONTAINER_NAMES)
    const registryKeys = Object.keys(CONTAINER_REGISTRY)
    const extra = registryKeys.filter((k) => !vocabSet.has(k))
    expect(extra, `这些 renderer 没在 vocabulary 声明(野容器): ${JSON.stringify(extra)}`).toEqual([])
  })
})

describe('theme.variants → VARIANT_IDS 闭包', () => {
  it('所有主题 variants 字段的 id 都在 VARIANT_IDS 对应 kind 内', () => {
    const offenders: Array<{ theme: string; slot: string; id: string }> = []
    for (const theme of themeList) {
      for (const slot of Object.keys(theme.variants) as Array<keyof typeof theme.variants>) {
        const id = theme.variants[slot]
        const declared = VARIANT_IDS[slot as VariantKind] as readonly string[]
        if (!declared.includes(id)) {
          offenders.push({ theme: theme.id, slot: String(slot), id })
        }
      }
    }
    expect(offenders, `主题 variant 选择超出声明范围: ${JSON.stringify(offenders)}`).toEqual([])
  })
})
