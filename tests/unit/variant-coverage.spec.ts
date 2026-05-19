/**
 * Variant 实证守卫：VARIANT_IDS 主表的每个 variant 必须满足之一
 *   (A) 至少一个主题以默认骨架使用      `spec.variants[kind] === id`
 *   (B) 等效白名单非空：meta.signatureOf 或 meta.themeCompat 至少声明一个主题
 *   (C) meta.experimental === true       （作者显式承认"骨架就绪、等首个采用方"）
 *
 * 三者都不满足 → 当前主题生态中没有任何凭证支持这个 variant 存在，应：
 *   - 让某主题升级它为默认骨架，或
 *   - 加 signatureOf（单主题签名）或 themeCompat（多主题软推荐），或
 *   - 加 experimental: true 显式登记"我们故意保留"。
 *
 * 实证逻辑全部在 src/core/variants/usage.ts；本测试只断言。
 */

import { describe, expect, it, beforeAll } from 'vitest'
import { globSync } from 'node:fs'
import { resolve, basename, dirname } from 'node:path'
import { pathToFileURL } from 'node:url'

import type { PersonaSpec } from '../../src/core/themes/_shared/spec'
import { analyzeVariantUsage } from '../../src/core/variants/usage'
import { ALL_VARIANT_DEFS } from '../../src/core/variants/registry'

let SPECS: PersonaSpec[] = []

beforeAll(async () => {
  const paths = globSync('src/core/themes/*/persona.data.ts', { cwd: process.cwd() })
    .map((p) => resolve(process.cwd(), p))
    .filter((p) => !basename(dirname(p)).startsWith('_'))
    .sort()
  for (const p of paths) {
    const mod = await import(pathToFileURL(p).href)
    SPECS.push((mod.spec ?? mod.default) as PersonaSpec)
  }
})

describe('Variant 实证守卫', () => {
  it('每个 variant 要么被采用、要么显式 experimental', () => {
    const report = analyzeVariantUsage(SPECS, [...ALL_VARIANT_DEFS])
    const unflagged = report.orphans.filter((e) => !e.experimental)
    if (unflagged.length > 0) {
      const lines = unflagged.map((e) => `  · ${e.kind}/${e.id}`).join('\n')
      throw new Error(
        `${unflagged.length} 个 orphan variant 未标 meta.experimental：\n${lines}\n` +
          '修复路径任选一：让某主题采用为默认 / 加 signatureOf 或 themeCompat / 加 meta.experimental: true。',
      )
    }
  })

  it('VARIANT_IDS 内不存在未被任何 spec 引用却被 spec 引用的 id（交叉守卫）', () => {
    const report = analyzeVariantUsage(SPECS, [...ALL_VARIANT_DEFS])
    expect(report.unknownReferenced, '理应被 validateSpec 拦截').toEqual([])
  })

  it('experimental variants must declare experimentalSince', () => {
    for (const def of ALL_VARIANT_DEFS) {
      if (def.meta.experimental === true) {
        expect(def.meta.experimentalSince).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      }
    }
  })

  it('experimentalSince must not predate 2026-05-01', () => {
    // 历史下限——本次清理前的 orphan 不应携带早于此的"假装新鲜"日期
    for (const def of ALL_VARIANT_DEFS) {
      if (def.meta.experimentalSince) {
        expect(def.meta.experimentalSince >= '2026-05-01').toBe(true)
      }
    }
  })
})
