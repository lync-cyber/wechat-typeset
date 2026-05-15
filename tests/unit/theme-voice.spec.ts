/**
 * 主题 voice 覆盖度契约。
 *
 * 守住三层：
 *   1. error：覆盖度低于硬下限 → 主题视觉无可辨识个性，spec 应充实
 *   2. warning：单个 base 容器/元素未覆写 → 该槽位走兜底（不阻断，作者可主动忽略）
 *   3. info：使用了 pack:* 扩展容器 → 写作集成方/LLM 选型时应知道
 *
 * errors 集合阻断 CI；warnings / infos 仅打印聚合报告（不阻断），保留主题作者
 * 的"我有意如此"自由——但报告留痕，便于 PR review 与未来回顾。
 *
 * 与 validate.ts 边界：validateSpec 守 hex/字号/strokeWidth 等**硬**约束；
 * voice 守"视觉表达密度"这一**软**约束。两者各跑各的，不交叉。
 */

import { describe, expect, it, beforeAll } from 'vitest'
import { globSync } from 'node:fs'
import { resolve, basename, dirname } from 'node:path'
import { pathToFileURL } from 'node:url'

import {
  analyzeThemeVoice,
  type PersonaSpec,
  type ThemeVoiceResult,
} from '../../src/core/themes/_shared/spec'

interface Loaded {
  dir: string
  spec: PersonaSpec
}

const LOADED: Loaded[] = []
const RESULTS: ThemeVoiceResult[] = []

beforeAll(async () => {
  const paths = globSync('src/core/themes/*/persona.data.ts', { cwd: process.cwd() })
    .map((p) => resolve(process.cwd(), p))
    .sort()
  for (const p of paths) {
    const mod = await import(pathToFileURL(p).href)
    const spec = (mod.spec ?? mod.default) as PersonaSpec | undefined
    if (!spec) throw new Error(`No "spec" export in ${p}`)
    LOADED.push({ dir: basename(dirname(p)), spec })
  }
  for (const { spec } of LOADED) RESULTS.push(analyzeThemeVoice(spec))
})

describe('主题 voice · 覆盖度硬下限', () => {
  it('每个主题 analyzeThemeVoice 无 error', () => {
    const offenders = RESULTS.filter((r) => r.errors.length > 0)
    if (offenders.length > 0) {
      const detail = offenders
        .map(
          (r) =>
            `  ${r.themeId}  [rate ${(r.coverage.rate * 100).toFixed(1)}%]\n` +
            r.errors.map((e) => `    × ${e.path}: ${e.message}`).join('\n'),
        )
        .join('\n')
      // 显式抛而非 expect().toEqual([])——保留多行可读 diagnostic
      throw new Error(`下列主题 voice 覆盖度低于阈值，必须充实 spec：\n${detail}`)
    }
    expect(offenders).toEqual([])
  })
})

describe('主题 voice · warnings / infos 报告（不阻断）', () => {
  it('打印每主题 warning / info 计数（vitest 控制台可见）', () => {
    const rows = RESULTS.map((r) => ({
      id: r.themeId,
      rate: `${(r.coverage.rate * 100).toFixed(0)}%`,
      'containers covered': `${r.coverage.coveredContainers}/${r.coverage.expectedContainers}`,
      'elements covered': `${r.coverage.coveredElements}/${r.coverage.expectedElements}`,
      warnings: r.warnings.length,
      infos: r.infos.length,
    }))
    // eslint-disable-next-line no-console
    console.table(rows)
    // 总有 warnings（base 兜底未覆写的容器/元素提示），这是 voice 检查的常态
    expect(RESULTS.length).toBeGreaterThan(0)
  })
})
