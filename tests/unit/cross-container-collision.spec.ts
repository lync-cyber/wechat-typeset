/**
 * 跨容器 variant 命名碰撞守卫（§3.6）。
 *
 * Variant id 在不同 kind（admonition / quote / compare / steps / divider / ...）下
 * 各自独立命名，理论上 `compare.column-card` 与 `gallery.column-card` 不会冲突——但
 * 同 id 跨 kind 容易让作者侧 attrs.variant=column-card 在不同容器下出现"同名异形"
 * 的视觉惯性误判（"我以为它跟我刚才写的是同一种骨架"）。本守卫扫描所有
 * ALL_VARIANT_DEFS，发现同 id 在 ≥2 kind 出现时强制走 `INTENTIONAL_REUSE` 白名单。
 *
 * 白名单语义：作者故意复用同名表达"两个容器的语义最小态"（例如 `bare` = "无装饰
 * 默认骨架"），跨 kind 复用不会引入混淆。任何新增的同 id 跨 kind 必须先评审：
 *   - 真重名 / 视觉相近 → 改名避免误用
 *   - 真"语义最小态" → 在 INTENTIONAL_REUSE 里登记 + 注释理由
 *
 * 不在本守卫范围：
 *   - thumbnail 视觉相似度（§3.6 提及"同形 thumbnail"）：相似度阈值难界定，
 *     人工 code review 更可靠；自动化分阶段引入。
 *   - 同 kind 内的 id 唯一性：由 VARIANT_IDS 类型层 + registry asRecord 保证。
 */

import { describe, expect, it } from 'vitest'
import { ALL_VARIANT_DEFS } from '../../src/core/variants/registry'

/**
 * 允许的跨 kind 同名 variant。每条标 kinds + 理由。新增条目需在 PR 描述里写
 * "为什么这个 id 在多个 kind 下复用、作者侧不会混淆"。
 */
const INTENTIONAL_REUSE: ReadonlyArray<{
  id: string
  kinds: readonly string[]
  reason: string
}> = [
  {
    id: 'bare',
    kinds: ['codeBlock', 'qrcode'],
    reason: '"无装饰默认骨架"语义最小态——codeBlock.bare = 裸 <pre><code>，qrcode.bare = 居中 QR + caption。两者都表达"无额外装饰"，作者侧不会混淆。',
  },
]

describe('跨容器 variant 命名碰撞守卫', () => {
  it('同 id 跨 kind 复用必须在 INTENTIONAL_REUSE 白名单内', () => {
    // 收集 id → Set<kind>
    const idKinds = new Map<string, Set<string>>()
    for (const def of ALL_VARIANT_DEFS) {
      const kind = def.meta.kind
      if (!idKinds.has(def.meta.id)) idKinds.set(def.meta.id, new Set())
      idKinds.get(def.meta.id)!.add(kind)
    }

    // 找跨 kind 的 id
    const collisions: Array<{ id: string; kinds: string[] }> = []
    for (const [id, kindSet] of idKinds) {
      if (kindSet.size > 1) {
        collisions.push({ id, kinds: [...kindSet].sort() })
      }
    }

    // 与白名单比对
    const allowedMap = new Map(INTENTIONAL_REUSE.map((e) => [e.id, [...e.kinds].sort()]))
    const unauthorized: Array<{ id: string; kinds: string[] }> = []
    for (const c of collisions) {
      const allowed = allowedMap.get(c.id)
      if (!allowed) {
        unauthorized.push(c)
        continue
      }
      // kind 集合必须完全匹配（防"白名单只批了 2 个 kind，但实际复用到第 3 个"）
      if (allowed.length !== c.kinds.length || !allowed.every((k, i) => k === c.kinds[i])) {
        unauthorized.push(c)
      }
    }

    expect(
      unauthorized,
      `检测到未授权的跨容器 variant id 复用——${JSON.stringify(unauthorized)}。\n` +
        `修复路径：(A) 改名让 id 在每个 kind 下唯一；或 (B) 在 ` +
        `tests/unit/cross-container-collision.spec.ts 的 INTENTIONAL_REUSE 登记，` +
        `附上"作者侧为何不会混淆"的理由。`,
    ).toEqual([])
  })

  it('INTENTIONAL_REUSE 白名单中每条都仍然存活（无墓志铭）', () => {
    // 白名单条目对应的 id 必须真的还有 ≥2 个 kind 在用——避免"已经改名但白名单忘记清"
    const idKinds = new Map<string, Set<string>>()
    for (const def of ALL_VARIANT_DEFS) {
      if (!idKinds.has(def.meta.id)) idKinds.set(def.meta.id, new Set())
      idKinds.get(def.meta.id)!.add(def.meta.kind)
    }
    const stale: string[] = []
    for (const entry of INTENTIONAL_REUSE) {
      const actualKinds = idKinds.get(entry.id)
      if (!actualKinds || actualKinds.size < 2) {
        stale.push(entry.id)
      }
    }
    expect(
      stale,
      `白名单中这些 id 已不再跨 kind 复用，请从 INTENTIONAL_REUSE 移除: ${JSON.stringify(stale)}`,
    ).toEqual([])
  })
})
