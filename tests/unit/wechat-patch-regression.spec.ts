// @vitest-environment jsdom
/**
 * 微信后处理迁移的三道回归检查：
 * 1. 短 fixture 的独立 HTML / patchLog 期望，避免新旧入口共用 pass 时一起出错。
 * 2. 保留每步 parse/serialize 的公共 wrapper 串联，校验共享 DOM 链没有改变阶段语义。
 * 3. 每主题故事样张 + all-containers 的 HTML / patchLog SHA-256（共 36 场景）。
 *
 * 大样张只存哈希，既有 theme-rendered-snapshot.spec.ts 继续提供可读的 CSS/HTML 快照。
 * hash 在旧实现上冻结；迁移期间不更新。后续有意改变主题或规则时须逐项审查差异。
 * 本文件保持串行：每场景只运行一次 Markdown/juice，额外成本仅旧 patch 链。
 */

import { createHash } from 'node:crypto'
import { readFileSync, readdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import type { Theme } from '../../src/core/themes/types'
import type { PatchLog, WxPatchOptions } from '../../src/core/pipeline/platforms/wechat'
import fixtureData from '../fixtures/wechat-patch-compat.json'

type WechatApi = typeof import('../../src/core/pipeline/platforms/wechat')
interface PatchFixture {
  id: string
  input: string
  options?: WxPatchOptions
  expectedHtml: string
  expectedPatchLog: PatchLog
}

const fixtures = fixtureData.cases as readonly PatchFixture[]
const specDir = dirname(fileURLToPath(import.meta.url))
const samplesDir = resolve(specDir, '../../src/samples-md')
const sampleIds = readdirSync(samplesDir)
  .filter((name) => /^sample-.+\.md$/.test(name))
  .map((name) => name.slice('sample-'.length, -'.md'.length))
  .sort()
const matrix = sampleIds.flatMap((themeId) => [
  { themeId, sample: 'story', path: resolve(samplesDir, `sample-${themeId}.md`) },
  { themeId, sample: 'all-containers', path: resolve(specDir, '../fixtures/all-containers.md') },
])

let wechat: WechatApi
let render: typeof import('../../src/core/pipeline')['render']
let themeRegistry: Readonly<Record<string, Theme>>
let lastInlined: string | undefined
let restoreInline = () => {}

beforeAll(async () => {
  // Vitest 配置 isolate:false；明确重建这一个文件的 pipeline 缓存，避免前一个 spec
  // 渲染过同一篇文章后直接命中 renderCache，让 juice spy 拿不到当前场景的输入。
  vi.resetModules()
  const inline = await import('../../src/core/pipeline/juiceInline')
  const originalInline = inline.inlineHtml
  const spy = vi.spyOn(inline, 'inlineHtml').mockImplementation((html) => {
    lastInlined = originalInline(html)
    return lastInlined
  })
  restoreInline = () => { spy.mockRestore() }
  wechat = await import('../../src/core/pipeline/platforms/wechat')
  ;({ render } = await import('../../src/core/pipeline'))
  ;({ themeRegistry } = await import('../../src/core/themes'))
}, 30_000)

afterAll(() => { restoreInline() })

/** 显式保留原顺序；不能改成调用 applyWxPatches，否则失去旧串行链作为参照的意义。 */
function legacyApply(html: string, options: WxPatchOptions = {}): string {
  let out = wechat.patchListWrap(html)
  out = wechat.stripForbiddenAttrs(out)
  out = wechat.stripForbiddenTags(out)
  out = wechat.stripFontFamily(out)
  out = wechat.patchSvgUrlQuotes(out)
  out = wechat.patchSvgIds(out)
  out = wechat.patchFlexToFallback(out)
  if (options.svgWhiteBg !== false) out = wechat.patchSvgWhiteBg(out)
  return out
}

function sha256(value: string): string {
  return createHash('sha256').update(value).digest('hex')
}

function requireLastInlined(): string {
  if (typeof lastInlined !== 'string') {
    throw new Error('当前场景未调用 inlineHtml，可能意外命中渲染缓存')
  }
  return lastInlined
}

describe('微信 patch 独立兼容 fixture', () => {
  it.each(fixtures)('$id', ({ input, options, expectedHtml, expectedPatchLog }) => {
    const html = wechat.applyWxPatches(input, options)
    expect(html).toBe(expectedHtml)
    expect(legacyApply(input, options)).toBe(expectedHtml)
    expect(wechat.inspectPatchTargets(input)).toEqual(expectedPatchLog)
    expect(wechat.applyWxPatches(html, options)).toBe(html)
  })
})

describe('微信完整渲染矩阵', () => {
  it('每个注册主题都恰好有一篇自己的故事样张', () => {
    expect(sampleIds).toEqual(Object.keys(themeRegistry).sort())
  })

  // 固定旧快照键名，避免 Vitest 升级改变 it.each 字符串插值的引号格式。
  matrix.forEach(({ themeId, sample, path }) => it(`'${themeId}' / '${sample}'`, () => {
    lastInlined = undefined
    const md = readFileSync(path, 'utf8').replace(/\r\n/g, '\n')
    const output = render({ md, theme: themeRegistry[themeId] })
    // 监听 juice 返回值，避免未来 adapter.patchWithLog 分支绕过 patch spy。
    // 每场景输入在这个 fresh pipeline 中只渲染一次；缓存命中不能静默复用上一场景。
    const inlined = requireLastInlined()
    expect(output.html).toBe(legacyApply(inlined))
    expect(output.patchLog).toEqual(wechat.inspectPatchTargets(inlined))
    expect({
      htmlSha256: sha256(output.html),
      patchLogSha256: sha256(JSON.stringify(output.patchLog)),
    }).toMatchSnapshot()
  }, 30_000))
})
