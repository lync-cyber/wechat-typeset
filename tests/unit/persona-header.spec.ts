/**
 * persona.data.ts JSDoc 头部 lint
 *
 * 防止"新增主题忘写设计理由"：每份 persona.data.ts 必须以 `/** ... *\/` 块注释开头，
 * 头部包含主题 id 与至少一段 voice/定位/受众描述。git log 是历史的权威来源，
 * 但 header 是**前瞻性**的——它向下一位读者解释这份 spec 想表达什么。
 */

import { describe, it, expect } from 'vitest'
import { globSync, readFileSync } from 'node:fs'
import { resolve, basename, dirname } from 'node:path'

const SECTION_MARKERS = ['定位', 'Voice', '视觉', 'audience', '受众']

const FILES = globSync('src/core/themes/*/persona.data.ts', { cwd: process.cwd() })
  .map((p) => resolve(process.cwd(), p))
  .filter((p) => !basename(dirname(p)).startsWith('_'))
  .sort()

describe('persona.data.ts 头部 JSDoc lint', () => {
  for (const file of FILES) {
    const id = basename(dirname(file))
    it(`${id}：以 /** 块注释开头并含 id + voice 段落`, () => {
      const lines = readFileSync(file, 'utf8').split('\n')
      expect(lines[0]?.trimStart().startsWith('/**'), `${id} 必须以 /** JSDoc 开头`).toBe(true)
      const blockEnd = lines.findIndex((l) => l.includes('*/'))
      expect(blockEnd, `${id} 头部 JSDoc 块缺 */ 闭合`).toBeGreaterThan(0)
      const block = lines.slice(0, blockEnd + 1).join('\n')
      expect(block.includes(id), `${id} 头部应包含主题 id "${id}"`).toBe(true)
      const hasMarker = SECTION_MARKERS.some((m) => block.includes(m))
      expect(hasMarker, `${id} 头部应包含 voice 段落标记之一：${SECTION_MARKERS.join(' / ')}`).toBe(true)
      if (blockEnd + 1 < 5) console.warn(`[hint] ${id} JSDoc 仅 ${blockEnd + 1} 行，建议补充 voice / 视觉决策`)
    })
  }
})
