/**
 * 内置主题 variant 签名强度门槛
 *
 * 内置主题必须有辨识度——计入门槛的 variant slot 中至多 1 个沿用 DEFAULT_VARIANTS,
 * 其余必须给出"主题作者刻意挑的"签名 variant。否则该主题与 default 的视觉
 * 差异只剩 palette/typography，没必要作为独立内置主题存在（用户走"自定义配色"
 * 即可，省一份维护成本）。
 *
 * 不计入门槛的过渡 slot：
 *   - highlight —— 骨架池刚启用,主题尚未接入(ThemeVariants.highlight 是 optional)。
 *     等多数主题显式声明 variants.highlight 后,从下方过滤器移除即可。
 *
 * 这条 spec 是 CI gate：
 *   - 红线 = 提示主题作者还有 N 个 slot 没决策；列出每个 slot 可选的 variant id
 *     供作者直接挑（不必再去翻 VARIANT_IDS）
 *   - 与 sample-variant-coverage.spec.ts 互补：那一条查"声明了的 variant 是否被
 *     样张演示"；这一条查"是否签名得够多"
 *
 * 例外名单 (ALLOWLISTED_NEUTRAL_THEMES)：
 *   - `default` —— 产品定位就是"有意识的中立"，0/9 是哲学不是 bug。任何后续主题
 *     想以"中立"为定位都必须先在此名单登记 + ownerNotes 写明取舍。
 */

import { describe, expect, it } from 'vitest'

import { ORDERED_SPECS } from '../../src/core/themes/registry'
import {
  DEFAULT_VARIANTS,
  VARIANT_IDS,
  type VariantKind,
} from '../../src/core/themes/types'

/** 计入门槛的 slot：排除 highlight 过渡态。 */
const SCORING_SLOTS = (Object.keys(DEFAULT_VARIANTS) as VariantKind[]).filter(
  (k) => k !== 'highlight',
)
/** SCORING_SLOTS 中至少 8 个必须偏离 DEFAULT_VARIANTS。 */
const MIN_SIGNED_SLOTS = 8
const TOTAL_SLOTS = SCORING_SLOTS.length

/**
 * 允许 < MIN_SIGNED_SLOTS 的"中立定位"主题白名单。
 * 新增条目前必须在该主题 persona.data.ts 的 meta.ownerNotes 里写明为什么不签名。
 */
const ALLOWLISTED_NEUTRAL_THEMES: ReadonlySet<string> = new Set(['default'])

describe('内置主题 variant 签名强度', () => {
  for (const spec of ORDERED_SPECS) {
    if (ALLOWLISTED_NEUTRAL_THEMES.has(spec.id)) {
      it(`${spec.id} 在中立名单上，跳过签名强度检查`, () => {
        // 占位：保留为可见 case，避免名单条目静默漂移
        expect(ALLOWLISTED_NEUTRAL_THEMES.has(spec.id)).toBe(true)
      })
      continue
    }

    it(`${spec.id} 至少 ${MIN_SIGNED_SLOTS}/${TOTAL_SLOTS} variant slot 偏离 DEFAULT_VARIANTS`, () => {
      const unsigned: Array<{ slot: VariantKind; current: string }> = []
      for (const slot of SCORING_SLOTS) {
        const def = DEFAULT_VARIANTS[slot]
        if (def === undefined) continue
        if (spec.variants[slot] === def) {
          unsigned.push({ slot, current: def })
        }
      }
      const signedCount = TOTAL_SLOTS - unsigned.length

      if (signedCount < MIN_SIGNED_SLOTS) {
        const lines = unsigned.map(({ slot, current }) => {
          const alternatives = (VARIANT_IDS[slot] as readonly string[])
            .filter((v) => v !== current)
            .join(' / ')
          return `  · ${slot.padEnd(13)} 当前 = 默认 \`${current}\`；可选签名：${alternatives}`
        })
        throw new Error(
          `主题 \`${spec.id}\` 仅签名 ${signedCount}/${TOTAL_SLOTS} 个 variant slot,` +
            `低于内置主题门槛 ${MIN_SIGNED_SLOTS}/${TOTAL_SLOTS}。\n` +
            `请在 src/core/themes/${spec.id}/persona.data.ts 的 variants 字段为下列 slot 挑签名 variant：\n` +
            lines.join('\n') +
            `\n（如确实是"刻意中立"的主题定位，请加进 ALLOWLISTED_NEUTRAL_THEMES 并在 meta.ownerNotes 说明）`,
        )
      }
    })
  }
})
