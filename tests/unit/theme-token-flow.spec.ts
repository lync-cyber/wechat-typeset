/**
 * Theme token-flow lint · C6
 *
 * 主题作者在 `containers / elements / innerStyles` 里直接写 hex 色值是常见 token 流失——
 * 一旦改 palette，这些硬编码 hex 不会跟着流动，破坏"色板 = ground truth"的契约。
 *
 * 本 spec 守两条：
 *   1) **hex 必须在主题 palette 内**：spec 任意样式槽位出现的 hex 字面量必须能在
 *      `palette.* + status.*.{accent,soft}` 集合里找到（含 #RGB / #RRGGBB / #RRGGBBAA 三档归一化）。
 *      允许少量平台中性色（#000 / #fff / transparent）走全局白名单。
 *   2) **innerStyles 不得出现 font-family**：types.ts 已规定 themeCSS 生成器层会扫
 *      font-family 并 throw，但 innerStyles 走 inline-style 路径，绕过 CSS 生成器，
 *      需要独立 lint 拦截（late-night-vinyl 历史就漏过 `'font-family':'Menlo,Monaco,monospace'`）。
 *
 * 错误信号：把 hex 改成对应 palette key（如 `var(--p-primary)` 在 CSS 层会替换，
 * 但 spec 写 `'#2558b0'` 与 `'palette.primary'` 共值即可——specToTheme 让 token 沿 CSS 变量流通）。
 */

import { describe, expect, it } from 'vitest'

import { ORDERED_SPECS } from '../../src/core/themes/registry'
import type { PersonaSpec } from '../../src/core/themes/_shared/spec'

/** 全局允许的"平台中性色 / 非语义占位"——这些不视为流失。 */
const NEUTRAL_ALLOWLIST = new Set<string>([
  '#000',
  '#000000',
  '#fff',
  '#ffffff',
  // hljs / atom-one-* 高亮 token 用的灰阶在 spec 里几乎不出现，
  // 一旦需要破例可以扩展，但默认保持严苛。
])

/**
 * 主题级"已知流失"豁免表。
 *
 * 严苛规则会抓出历史遗留的 hex 流失。本表为后续可能再次出现的"未来已知 + 跟踪中"
 * tech debt 预留位置；空表 = 当前没有需要豁免的已知流失。
 *
 * 添加流程：
 *   1) 评估能否直接 fix（多数情况下：在 palette 加语义槽 + 把同值 hex 在 palette
 *      里复制一份让 lint 识别为 token 成员）。
 *   2) 必须 allowlist 时在此登记 + TODO 注释说明为何无法立刻清理。
 *   3) 清理后从此表删除。
 *
 * 历史登记（已清理，留作变更记录）：
 *   - swiss-grid `#333333` → palette.textCaption；`#ffeb3c` → palette.highlightBg
 *   - life-aesthetic `#fffaef` → palette.preBg；`#f3e4cc` → palette.codeBg；
 *     `#fffaf1` → palette.quoteCardBg
 *   - default `#fff4c8` → palette.highlightBg；`#c8ccd4` → palette.noteBorder
 *
 * Map<themeId, Set<normalized-hex>>
 */
const KNOWN_HEX_LEAKS: Record<string, ReadonlySet<string>> = {}

const HEX_TOKEN_RE = /#[0-9a-fA-F]{3,8}/g

/** 把 #abc 归一化为 #aabbcc；#abcd → #aabbccdd；其余原样保留小写。 */
function normalizeHex(hex: string): string {
  const v = hex.toLowerCase()
  if (v.length === 4 || v.length === 5) {
    // #rgb / #rgba → 双倍展开
    let out = '#'
    for (let i = 1; i < v.length; i++) out += v[i] + v[i]
    return out
  }
  return v
}

function collectPaletteHexes(spec: PersonaSpec): Set<string> {
  const out = new Set<string>()
  for (const v of Object.values(spec.palette)) {
    if (typeof v === 'string') out.add(normalizeHex(v))
  }
  for (const pair of Object.values(spec.status)) {
    if (pair?.accent) out.add(normalizeHex(pair.accent))
    if (pair?.soft) out.add(normalizeHex(pair.soft))
  }
  for (const v of NEUTRAL_ALLOWLIST) out.add(normalizeHex(v))
  return out
}

interface HexHit {
  path: string
  value: string
  hex: string
}

function walkForHexes(
  node: unknown,
  path: string,
  hits: HexHit[],
): void {
  if (node == null) return
  if (typeof node === 'string') {
    const matches = node.match(HEX_TOKEN_RE)
    if (!matches) return
    for (const m of matches) hits.push({ path, value: node, hex: normalizeHex(m) })
    return
  }
  if (typeof node !== 'object') return
  for (const [k, v] of Object.entries(node as Record<string, unknown>)) {
    walkForHexes(v, path ? `${path}.${k}` : k, hits)
  }
}

interface FontFamilyHit {
  path: string
  value: string
}

function walkForFontFamily(
  node: unknown,
  path: string,
  hits: FontFamilyHit[],
): void {
  if (node == null || typeof node !== 'object') return
  for (const [k, v] of Object.entries(node as Record<string, unknown>)) {
    const sub = path ? `${path}.${k}` : k
    if (k === 'font-family' || k === 'fontFamily') {
      hits.push({ path: sub, value: String(v) })
    }
    if (v && typeof v === 'object') walkForFontFamily(v, sub, hits)
  }
}

describe('theme token-flow · hex 必须在 palette 内', () => {
  for (const spec of ORDERED_SPECS) {
    it(`${spec.id} containers/elements/innerStyles 的 hex 全部来自 palette`, () => {
      const allowed = collectPaletteHexes(spec)
      const hits: HexHit[] = []
      walkForHexes(spec.elements, 'elements', hits)
      walkForHexes(spec.containers, 'containers', hits)
      walkForHexes(spec.innerStyles, 'innerStyles', hits)
      walkForHexes(spec.inline, 'inline', hits)

      const knownLeaks = KNOWN_HEX_LEAKS[spec.id] ?? new Set<string>()
      const violations = hits.filter((h) => !allowed.has(h.hex) && !knownLeaks.has(h.hex))
      if (violations.length === 0) return

      const lines = violations.map(
        (h) => `  · ${h.path}: 出现 ${h.hex}（原文 "${h.value}"），不在 palette / status 集内`,
      )
      throw new Error(
        `主题 \`${spec.id}\` 存在 token 流失（hex 字面量未走 palette）：\n` +
          lines.join('\n') +
          `\n修复方式：把硬编码 hex 换成对应 palette key 的值；或如果该色确实是 palette 缺失的语义槽，` +
          `在 palette 里加一个语义命名（如 preBg / preText 已有先例）。`,
      )
    })
  }
})

describe('theme token-flow · innerStyles 严禁 font-family', () => {
  for (const spec of ORDERED_SPECS) {
    it(`${spec.id} innerStyles 不出现 font-family 键（绕过 themeCSS 生成器的硬约束）`, () => {
      const hits: FontFamilyHit[] = []
      walkForFontFamily(spec.innerStyles, 'innerStyles', hits)
      expect(
        hits,
        `${spec.id} innerStyles 出现 font-family，违反公众号粘贴稳定性硬约束：\n` +
          hits.map((h) => `  · ${h.path} = "${h.value}"`).join('\n') +
          `\n修复方式：删除 font-family 字段，用 letter-spacing / font-weight 表达 monospace 视觉。`,
      ).toHaveLength(0)
    })
  }
})
