/**
 * 故事样张 · variant 反查覆盖
 *
 * 约束：每个主题在 PersonaSpec.variants 里声明了 9 个 slot；只要某个 slot 的
 * 选择**偏离 DEFAULT_VARIANTS**——意味着主题作者明确为这个 slot 挑了自己的签名 variant
 * ——那么 src/samples-md/sample-{themeId}.md 必须至少出现一个能消费该 variant 的容器，
 * 让读者第一眼就能在故事样张里看到这个签名形态。
 *
 * 为什么只查"非默认"覆盖：
 *   - 全 slot 强制 = 14 主题 × 9 slot 都要至少一个容器实例，迅速变成形式主义
 *   - 偏离 DEFAULT_VARIANTS 才是"主题作者花心思挑的"，漏演示就是真的浪费
 *
 * 失败信号 = 主题作者要么把 variant 改回 DEFAULT_VARIANTS（不签名），要么去样张里补一段。
 * 与 reference 文档（按 vocabulary 全集列举）无关——那一档不依赖样张演示。
 *
 * 这条 spec 与 verify-sample-full.ts（端到端 fixture）的边界：
 *   - verify-sample-full = "全功能展示稿渲染期所有 class/style 都到位"（管线层）
 *   - 本 spec           = "每个主题的故事样张演示了自家的签名变体"（作者层）
 */

import { describe, expect, it } from 'vitest'

import { ORDERED_SPECS } from '../../src/core/themes/registry'
import { DEFAULT_VARIANTS, type VariantKind } from '../../src/core/themes/types'
import { SAMPLE_BY_THEME } from '../../src/domain/samples'

/**
 * 每个 variant slot 的"消费容器探针"——sample 里至少有一个匹配，
 * 才算演示了该 slot 的当前 variant 选择。
 *
 * 探针只问"该 slot 类型的容器在样张里有没有出现"，不查具体 variant id——
 * 因为 slot 选择会被 markdown 层 `variant=foo` 覆盖；只要容器在场，
 * 该主题的 slot 默认（即 spec.variants[slot]）就会被消费一次。
 *
 * 字符串 regex 在 multi-line + case-sensitive 模式下检查 fence 头部行。
 */
const PROBES: Record<VariantKind, RegExp> = {
  // 四态 admonition：::: info|tip|warning|danger（note 是另一个 slot）
  admonition: /^:{3,}\s*(info|tip|warning|danger)\b/m,
  // quote-card 容器 或 markdown 原生 blockquote（>）都会经过 quote variant
  quote: /^:{3,}\s*quote-card\b/m,
  compare: /^:{3,}\s*compare\b/m,
  steps: /^:{3,}\s*steps\b/m,
  divider: /^:{3,}\s*divider\b/m,
  sectionTitle: /^:{3,}\s*section-title\b/m,
  // 围栏代码块 ``` 或 ~~~：headerBar / bare 都在 pre 上落 style
  codeBlock: /^(?:`{3,}|~{3,})/m,
  // note 第五态独立容器
  note: /^:{3,}\s*note\b/m,
  // footnotes 容器 或 markdown-it-footnote 的 [^id]
  footnotes: /^:{3,}\s*footnotes\b|\[\^[^\]]+\]/m,
  // recommend 容器（含 R-7 合并后承接的"参考引用"语义）
  recommend: /^:{3,}\s*recommend\b/m,
}

const SLOT_LABELS: Record<VariantKind, string> = {
  admonition: '提示四态（info/tip/warning/danger）',
  quote: '引用卡（quote-card）',
  compare: '对照表（compare）',
  steps: '步骤（steps）',
  divider: '分隔（divider）',
  sectionTitle: '章节标题（section-title）',
  codeBlock: '代码块（``` fence）',
  note: '注解（note）',
  footnotes: '脚注（footnotes / [^id]）',
  recommend: '推荐阅读（recommend）',
}

describe('故事样张 variant 覆盖', () => {
  for (const spec of ORDERED_SPECS) {
    const sample = SAMPLE_BY_THEME[spec.id] ?? ''

    it(`${spec.id} 样张至少演示该主题的全部非默认 variant`, () => {
      expect(sample, `sample-${spec.id}.md 不存在或为空`).not.toBe('')

      const missing: string[] = []
      for (const slot of Object.keys(spec.variants) as VariantKind[]) {
        const chosen = spec.variants[slot]
        // slot 与 DEFAULT_VARIANTS 等价 = 没签名，不强制演示
        if (chosen === DEFAULT_VARIANTS[slot]) continue
        if (!PROBES[slot].test(sample)) {
          missing.push(`  · ${slot} (= ${chosen}) → 缺少 ${SLOT_LABELS[slot]} 容器实例`)
        }
      }

      if (missing.length > 0) {
        throw new Error(
          `主题 \`${spec.id}\` 在 persona.data.ts 声明了下列非默认 variant，` +
            `但 sample-${spec.id}.md 没有任何容器消费它们：\n${missing.join('\n')}\n` +
            `修复方式：在故事样张里加一段对应容器（甚至一行也行），让读者第一眼能看到主题签名。`,
        )
      }
    })
  }
})
