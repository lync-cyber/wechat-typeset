/**
 * capabilities.json 契约结构合约
 *
 * 这是 dist/api/capabilities.json 的"形状门禁"：
 *   - schemaVersion 字段存在
 *   - deprecations[] 内每条都满足 id / sinceVersion / replacement 三必填
 *   - 登记 deprecated 的 id 必须仍然存在于 capabilities 顶层（防止"已登记但已删除"
 *     —— deprecation 的承诺是"还在但建议替换"，删了就该升 major）
 *
 * 这是契约演进流程的最小机器化守卫：人手写 deprecation 条目时容易漏字段或
 * 误删字段本体，这里在 CI 阶段先红。
 */

import { describe, expect, it } from 'vitest'
import { execSync } from 'node:child_process'
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

interface DeprecationNotice {
  id: string
  sinceVersion: string
  replacement: string
  removalPlannedIn?: string
}

interface Capabilities {
  schemaVersion: string
  deprecations: DeprecationNotice[]
  [k: string]: unknown
}

const OUT = resolve(process.cwd(), 'dist/api/capabilities.json')

function ensureBuilt(): Capabilities {
  if (!existsSync(OUT)) {
    execSync('npx tsx scripts/build-capabilities.ts', { stdio: 'inherit' })
  }
  return JSON.parse(readFileSync(OUT, 'utf8')) as Capabilities
}

describe('capabilities.json 契约结构', () => {
  const caps = ensureBuilt()

  it('schemaVersion 满足 semver 主.次 格式', () => {
    expect(caps.schemaVersion).toMatch(/^\d+\.\d+$/)
  })

  it('deprecations 是数组', () => {
    expect(Array.isArray(caps.deprecations)).toBe(true)
  })

  it('每条 deprecation 必填 id / sinceVersion / replacement', () => {
    for (const d of caps.deprecations) {
      expect(d.id, JSON.stringify(d)).toBeTruthy()
      expect(d.sinceVersion, JSON.stringify(d)).toMatch(/^\d+\.\d+$/)
      expect(d.replacement, JSON.stringify(d)).toBeTruthy()
    }
  })

  it('登记 deprecated 的 id 仍在 capabilities 顶层（"已弃用但未删除"的契约承诺）', () => {
    // 演进规则：deprecation 是"窗口期"承诺——字段还在，建议下游迁移。
    // 等真正移除时，必须先升 major（删 deprecation 条目 + 删字段）。
    for (const d of caps.deprecations) {
      expect(
        Object.prototype.hasOwnProperty.call(caps, d.id),
        `${d.id} 已登记 deprecation 但已从 capabilities 顶层移除——这违反窗口期承诺。` +
          `要么把字段加回（保留兼容直到 ${d.removalPlannedIn ?? '下个 major'}），` +
          `要么连同 deprecation 条目一起在 major 升级时删除。`,
      ).toBe(true)
    }
  })
})
