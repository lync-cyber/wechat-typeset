/**
 * Admonition per-callout variant 白名单 · C8 lint
 *
 * 作者侧 markdown 写 `::: tip 要点 variant=pill-tag` 是允许的 escape hatch——
 * 但 `pill-tag` 必须在主题的 `PersonaSpec.admonitionOverrides` 显式登记，
 * 才能避免"任意 admonition variant 都能临时拿来用 / 主题签名被随手遮蔽"的退化。
 *
 * 不声明 `admonitionOverrides` = 不允许任何 override；想用主题默认 variant
 * 直接 `::: tip 要点`（去掉 variant=）即可，故事样张的"主题第一印象"完全由
 * spec.variants.admonition 决定。
 *
 * 与 sample-variant-coverage 的边界：
 *   - sample-variant-coverage = "声明的非默认 variant 必须在 sample 里被消费"（覆盖率）
 *   - 本 spec                = "sample 里出现的 admonition variant override 必须被 spec 登记"（合法性）
 */

import { describe, expect, it } from 'vitest'

import { ORDERED_SPECS } from '../../src/core/themes/registry'
import { VARIANT_IDS } from '../../src/core/themes/types'
import { SAMPLE_BY_THEME } from '../../src/domain/samples'

/**
 * 匹配 `::: tip|info|warning|danger ... variant=<id> ...` 行（含 4+ 冒号外框）。
 * 捕获 group 1 = variant id。`variant` 之前允许任意非换行字符（容器标题 / 其它 attrs）。
 */
const ADMONITION_OVERRIDE_RE =
  /^:{3,}\s*(?:tip|info|warning|danger)\b[^\n]*?\bvariant=([a-z][a-z0-9-]*)/gim

const LEGAL_ADMONITION_VARIANTS = new Set<string>(VARIANT_IDS.admonition as readonly string[])

interface OverrideHit {
  line: number
  variant: string
  raw: string
}

function findOverrides(sample: string): OverrideHit[] {
  const hits: OverrideHit[] = []
  // 不能直接复用全局 regex 的 lastIndex 状态，每次新建实例
  const re = new RegExp(ADMONITION_OVERRIDE_RE.source, ADMONITION_OVERRIDE_RE.flags)
  let m: RegExpExecArray | null
  while ((m = re.exec(sample))) {
    const upTo = sample.slice(0, m.index)
    const line = upTo.split('\n').length
    hits.push({ line, variant: m[1], raw: m[0] })
  }
  return hits
}

describe('admonition variant override · 白名单合法性', () => {
  for (const spec of ORDERED_SPECS) {
    const sample = SAMPLE_BY_THEME[spec.id] ?? ''

    it(`${spec.id} sample 中出现的 admonition variant override 必须在 admonitionOverrides 白名单内`, () => {
      const hits = findOverrides(sample)
      if (hits.length === 0) return // 无 override = 当前现状，零容忍 lint 不报

      const whitelist = new Set<string>(spec.admonitionOverrides ?? [])
      const violations: string[] = []

      for (const hit of hits) {
        // (a) variant id 本身必须是合法 AdmonitionVariantId（防 typo）
        if (!LEGAL_ADMONITION_VARIANTS.has(hit.variant)) {
          violations.push(
            `  · 第 ${hit.line} 行 \`variant=${hit.variant}\` 不是合法 AdmonitionVariantId`,
          )
          continue
        }
        // (b) 必须在主题 admonitionOverrides 白名单中
        if (!whitelist.has(hit.variant)) {
          violations.push(
            `  · 第 ${hit.line} 行 \`variant=${hit.variant}\` 未在 ` +
              `persona.data.ts 的 admonitionOverrides 白名单登记`,
          )
        }
      }

      if (violations.length > 0) {
        throw new Error(
          `sample-${spec.id}.md 出现未登记的 admonition variant override：\n` +
            violations.join('\n') +
            `\n修复方式（二选一）：\n` +
            `  1) 删掉 sample 里的 variant= 让主题默认 variant 流动（推荐，C2 已落实）\n` +
            `  2) 在 persona.data.ts 加 admonitionOverrides: ['${hits[0].variant}', ...] 显式登记`,
        )
      }
    })

    it(`${spec.id} 已声明的 admonitionOverrides 不包含主题默认 variant（避免冗余声明）`, () => {
      const whitelist = spec.admonitionOverrides ?? []
      const themeDefault = spec.variants.admonition
      const redundant = whitelist.filter((v) => v === themeDefault)
      expect(
        redundant,
        `${spec.id} 的 admonitionOverrides 不应重复声明主题默认 \`${themeDefault}\`——` +
          `去掉 variant= 即可走默认，无需登记`,
      ).toHaveLength(0)
    })
  }
})
