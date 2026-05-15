// 第三方消费者视角的烟雾测试：只走 dist/lib/index.js（npm publish 的产物），
// 不允许通过 src/ 直连。任何 dep 漏标记 / 入口缺函数 / 类型与运行时不一致都会在这里炸。

import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { JSDOM } from 'jsdom'

// wxPatch 走浏览器 DOMParser；Node 消费者需自行注入（典型 jsdom）。本烟雾测试
// 同时验证"消费者按 README 那样 shim 后能正常 render"。
const dom = new JSDOM('', { url: 'http://localhost/' })
globalThis.DOMParser = dom.window.DOMParser
globalThis.XMLSerializer = dom.window.XMLSerializer
globalThis.document = dom.window.document
globalThis.Node = dom.window.Node

const ROOT = process.cwd()
const LIB = resolve(ROOT, 'dist/lib/index.js')
const DTS = resolve(ROOT, 'dist/lib/public/index.d.ts')
const CAPS = resolve(ROOT, 'dist/api/capabilities.json')
const SCHEMA = resolve(ROOT, 'dist/schema/persona-spec.schema.json')

function assert(cond, msg) {
  if (!cond) {
    process.stderr.write(`[smoke:lib] FAIL ${msg}\n`)
    process.exit(1)
  }
}

for (const p of [LIB, DTS, CAPS, SCHEMA]) {
  assert(existsSync(p), `missing artifact: ${p}`)
}

const mod = await import(pathToFileURL(LIB).href)

const EXPECTED = [
  'render',
  'listPersonas',
  'getPersona',
  'getPersonaSummary',
  'getSchema',
  'getSupportedSignatureContainers',
  'getVariantIds',
  'getContainerVocabulary',
  'getContainerSpec',
  'getVariantsForContainer',
  'getThemeDefaultVariants',
  'getContainerSnippet',
  'getThemeCapabilities',
  'getRecommendedVariantsFor',
  'getDefaultKickers',
  'getInlineExtensions',
  'validatePersona',
  'createPersona',
  'listPublishPlatforms',
  'getMotifSpec',
  'renderMotif',
  'renderMotifWithValues',
  'parseFrontmatter',
  'HARD_RULES',
  'WtException',
  'EXIT_CODES',
]
for (const name of EXPECTED) {
  assert(name in mod, `export missing: ${name}`)
}

for (const code of ['INPUT_AMBIGUOUS', 'RESOURCE_NOT_FOUND', 'SPEC_INVALID', 'CONTRACT_VIOLATION', 'RENDER_FAILED', 'PLATFORM_UNSUPPORTED']) {
  assert(typeof mod.EXIT_CODES[code] === 'number', `EXIT_CODES missing ${code}`)
}

const personas = mod.listPersonas()
assert(Array.isArray(personas) && personas.length >= 14, `listPersonas length: ${personas.length}`)
assert(personas[0].id === 'default', `expected default first, got ${personas[0].id}`)

const out = mod.render({ md: '# 标题\n\n::: tip\n小贴士\n:::\n', persona: 'swiss-grid' })
assert(out.html.includes('<h1'), 'render: missing <h1>')
assert(out.html.includes('小贴士'), 'render: tip body missing')
assert(typeof out.wordCount === 'number' && out.wordCount > 0, `wordCount: ${out.wordCount}`)

const validation = mod.validatePersona(mod.getPersona('default'))
assert(validation.ok === true, `default spec must validate: ${JSON.stringify(validation.errors)}`)

let caught
try { mod.getPersona('no-such-persona') } catch (e) { caught = e }
assert(caught instanceof mod.WtException, 'getPersona unknown should throw WtException')
assert(caught.code === 'RESOURCE_NOT_FOUND', `expected code RESOURCE_NOT_FOUND, got ${caught.code}`)

const caps = JSON.parse(readFileSync(CAPS, 'utf8'))
assert(caps.schemaVersion, 'capabilities.json missing schemaVersion')
assert(Array.isArray(caps.personas) && caps.personas.length === personas.length,
  `capabilities personas count mismatch`)

process.stdout.write(`[smoke:lib] ok — ${EXPECTED.length} exports, ${personas.length} personas, render ${out.html.length}ch\n`)
