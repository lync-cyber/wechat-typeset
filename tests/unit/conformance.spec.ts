/**
 * Conformance 测试 · spec ↔ Theme ↔ Gallery ↔ Schema 三条投影一致性
 *
 * 这是 spec-first 架构的核心守卫：任何一条投影跑偏（specToTheme 丢字段 /
 * gallery 漏渲染 / schema 漂移）都会在这里先红。
 *
 * 覆盖：
 *   A. spec ↔ Theme：9 份 spec 通过 specToTheme 后，palette/typography/spacing/
 *      radius/variants/assets 都与 spec 声明结构相等
 *   B. spec ↔ Gallery：generateGallery 产物包含每份 spec 的全部 palette + status hex
 *      + 每个声明 motif 的 SVG 特征（viewBox 片段）
 *   C. Registry：themeList 与 persona.spec.ts 文件一一对应
 *   D. Schema contract：PERSONA_SPEC_SCHEMA 的 enum 与 VARIANT_IDS 同步；
 *      schema JSON 由 toMatchFileSnapshot 锁定在 __snapshots__/persona-spec.schema.json
 */

import { describe, expect, it, beforeAll } from 'vitest'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { globSync, readFileSync } from 'node:fs'
import { basename, dirname } from 'node:path'

import {
  PERSONA_SPEC_SCHEMA,
  specToTheme,
  validateSpec,
  type PersonaSpec,
} from '../../src/themes/_shared/spec'
import { generateGallery } from '../../src/gallery/generate'
import { themeList } from '../../src/themes'
import { VARIANT_IDS, DEFAULT_VARIANTS } from '../../src/themes/types'
import {
  CONTAINER_REGISTRY,
  SIGNATURE_CONTAINER_MARKDOWN_NAME,
} from '../../src/pipeline/containers'
import { STYLED_CONTAINERS } from '../../src/containers'
import { SUPPORTED_SIGNATURE_CONTAINERS } from '../../src/themes/_shared/spec'

// ============================================================
// 加载器：9 份 persona.spec.ts → 按目录名排序
// ============================================================

interface Loaded {
  dir: string // directory name, e.g. "default"
  spec: PersonaSpec
  path: string
}

let LOADED: Loaded[] = []

beforeAll(async () => {
  const paths = globSync('src/themes/*/persona.spec.ts', { cwd: process.cwd() })
    .map((p) => resolve(process.cwd(), p))
    .sort()
  for (const p of paths) {
    const mod = await import(pathToFileURL(p).href)
    const spec = (mod.spec ?? mod.default) as PersonaSpec | undefined
    if (!spec) throw new Error(`No "spec" export in ${p}`)
    const dir = basename(dirname(p))
    LOADED.push({ dir, spec, path: p })
  }
})

function eachSpec(): Loaded[] {
  return LOADED
}

// ============================================================
// A. spec ↔ Theme
// ============================================================

describe('A. spec → Theme 投影保真', () => {
  it('每份 spec 都通过 validateSpec', () => {
    for (const { spec, dir } of eachSpec()) {
      const r = validateSpec(spec)
      if (!r.ok) {
        // 把 error 明细送进断言消息，失败时一眼看见哪行有问题
        throw new Error(
          `validateSpec failed for ${dir}:\n${r.errors.map((e) => `  ${e.path}: ${e.message}`).join('\n')}`,
        )
      }
    }
  })

  it('spec.id 与目录名一致', () => {
    for (const { spec, dir } of eachSpec()) {
      expect(spec.id, `${dir}/persona.spec.ts`).toBe(dir)
    }
  })

  it('specToTheme.tokens.colors === spec.palette + spec.status', () => {
    for (const { spec, dir } of eachSpec()) {
      const theme = specToTheme(spec)
      const cols = theme.tokens.colors
      expect(cols, dir).toMatchObject({
        primary: spec.palette.primary,
        secondary: spec.palette.secondary,
        accent: spec.palette.accent,
        bg: spec.palette.bg,
        bgSoft: spec.palette.bgSoft,
        bgMuted: spec.palette.bgMuted,
        text: spec.palette.text,
        textMuted: spec.palette.textMuted,
        textInverse: spec.palette.textInverse,
        border: spec.palette.border,
        code: spec.palette.code,
      })
      expect(cols.status, dir).toStrictEqual(spec.status)
    }
  })

  it('specToTheme.tokens.typography/spacing/radius 原样转发', () => {
    for (const { spec, dir } of eachSpec()) {
      const theme = specToTheme(spec)
      expect(theme.tokens.typography, dir).toStrictEqual(spec.typography)
      expect(theme.tokens.spacing, dir).toStrictEqual(spec.spacing)
      expect(theme.tokens.radius, dir).toStrictEqual(spec.radius)
    }
  })

  it('specToTheme.variants === { ...DEFAULT_VARIANTS, ...spec.variants }', () => {
    for (const { spec, dir } of eachSpec()) {
      const theme = specToTheme(spec)
      const expected = { ...DEFAULT_VARIANTS, ...spec.variants }
      expect(theme.variants, dir).toStrictEqual(expected)
    }
  })

  it('每个声明的 motif 在 theme.assets 里有非空产物', () => {
    for (const { spec, dir } of eachSpec()) {
      const theme = specToTheme(spec)
      for (const [key, shape] of Object.entries(spec.motifs)) {
        if (!shape) continue
        const val = (theme.assets as Record<string, string | ((n: number) => string) | undefined>)[key]
        if ('placeholders' in shape) {
          // MotifTemplate → function
          expect(typeof val, `${dir}.${key}`).toBe('function')
        } else {
          expect(val, `${dir}.${key}`).toBeTypeOf('string')
          expect((val as string).length, `${dir}.${key}`).toBeGreaterThan(0)
          expect(val as string, `${dir}.${key}`).toContain('<svg')
        }
      }
    }
  })

  it('spec.behavior 原样转发到 theme.behavior', () => {
    for (const { spec, dir } of eachSpec()) {
      const theme = specToTheme(spec)
      if (spec.behavior) {
        expect(theme.behavior, dir).toStrictEqual(spec.behavior)
      } else {
        expect(theme.behavior, dir).toBeUndefined()
      }
    }
  })
})

// ============================================================
// B. spec ↔ Gallery
// ============================================================

describe('B. spec → Gallery 投影保真', () => {
  let HTML = ''

  beforeAll(() => {
    const specs = eachSpec().map((l) => l.spec)
    HTML = generateGallery(specs)
  })

  it('gallery 含每份 spec 的 11 个 palette hex', () => {
    for (const { spec, dir } of eachSpec()) {
      for (const [key, hex] of Object.entries(spec.palette)) {
        expect(HTML, `${dir}.palette.${key}=${hex}`).toContain(hex)
      }
    }
  })

  it('gallery 含每份 spec 的 4 态 status accent + soft', () => {
    for (const { spec, dir } of eachSpec()) {
      for (const [status, pair] of Object.entries(spec.status)) {
        expect(HTML, `${dir}.status.${status}.accent`).toContain(pair.accent)
        expect(HTML, `${dir}.status.${status}.soft`).toContain(pair.soft)
      }
    }
  })

  it('gallery 含每份 spec 声明 motif 的 viewBox 签名', () => {
    for (const { spec, dir } of eachSpec()) {
      for (const [key, shape] of Object.entries(spec.motifs)) {
        if (!shape) continue
        const [x, y, w, h] = shape.viewBox
        const sig = `viewBox="${x} ${y} ${w} ${h}"`
        expect(HTML, `${dir}.motifs.${key} → ${sig}`).toContain(sig)
      }
    }
  })

  it('gallery 的 persona card 数量 === spec 数量', () => {
    const count = (HTML.match(/data-persona="/g) ?? []).length
    expect(count).toBe(eachSpec().length)
  })
})

// ============================================================
// C. Registry alignment
// ============================================================

describe('C. Registry ↔ spec 文件', () => {
  it('themeList 与 persona.spec.ts 文件数一致', () => {
    expect(themeList.length).toBe(eachSpec().length)
  })

  it('每个 themeList[i].id 都有同名的 persona.spec.ts', () => {
    const specIds = new Set(eachSpec().map((l) => l.spec.id))
    for (const theme of themeList) {
      expect(specIds.has(theme.id), `themeList has "${theme.id}" but no matching persona.spec.ts`).toBe(true)
    }
  })

  it('每份 spec 都被 themeList 装载', () => {
    const themeIds = new Set(themeList.map((t) => t.id))
    for (const { spec, dir } of eachSpec()) {
      expect(themeIds.has(spec.id), `spec "${dir}" (id=${spec.id}) not found in themeList`).toBe(true)
    }
  })
})

// ============================================================
// D. JSON Schema contract
// ============================================================

describe('D. JSON Schema contract', () => {
  it('PERSONA_SPEC_SCHEMA.required 覆盖 PersonaSpec 全部必填字段', () => {
    const required = PERSONA_SPEC_SCHEMA.required ?? []
    // 这些字段在 types.ts 里都是 non-optional
    for (const key of [
      'id', 'name', 'description', 'audience',
      'palette', 'status', 'typography', 'spacing', 'radius',
      'motifs', 'variants', 'meta',
    ]) {
      expect(required, `required missing "${key}"`).toContain(key)
    }
  })

  it('VARIANTS_SCHEMA 各 enum 与 VARIANT_IDS 完全一致', () => {
    const vschema = PERSONA_SPEC_SCHEMA.properties?.variants?.properties
    expect(vschema).toBeTruthy()
    for (const kind of Object.keys(VARIANT_IDS) as Array<keyof typeof VARIANT_IDS>) {
      const schemaEnum = vschema?.[kind]?.enum as readonly string[] | undefined
      const idList = VARIANT_IDS[kind] as readonly string[]
      expect(schemaEnum, `schema missing enum for variants.${kind}`).toBeTruthy()
      expect(new Set(schemaEnum), `variants.${kind}`).toStrictEqual(new Set(idList))
      expect(schemaEnum!.length, `variants.${kind} length`).toBe(idList.length)
    }
  })

  it('schema JSON 与快照一致（drift 防护）', async () => {
    const json = JSON.stringify(PERSONA_SPEC_SCHEMA, null, 2)
    await expect(json).toMatchFileSnapshot(
      resolve(process.cwd(), 'tests/unit/__snapshots__/persona-spec.schema.json'),
    )
  })

  it('palette schema hex pattern 覆盖全部 11 键', () => {
    const palSchema = PERSONA_SPEC_SCHEMA.properties?.palette
    const required = palSchema?.required ?? []
    for (const k of [
      'primary', 'secondary', 'accent', 'bg', 'bgSoft', 'bgMuted',
      'text', 'textMuted', 'textInverse', 'border', 'code',
    ]) {
      expect(required, `palette.${k}`).toContain(k)
      expect(palSchema?.properties?.[k]?.pattern, `palette.${k} pattern`).toMatch(/#/)
    }
  })
})

// ============================================================
// E. Signature Container 注册表闭合性
// ============================================================

describe('E. Signature Container 注册表闭合性', () => {
  it('每个 spec 的 signatureContainers 都能映射到 markdown 名', () => {
    for (const { spec, dir } of eachSpec()) {
      for (const sig of spec.signatureContainers ?? []) {
        expect(
          SIGNATURE_CONTAINER_MARKDOWN_NAME[sig],
          `${dir}: signatureContainer "${sig}" 未在 SIGNATURE_CONTAINER_MARKDOWN_NAME 登记`,
        ).toBeTruthy()
      }
    }
  })

  it('每个 signatureContainer 的 markdown 名都能在 CONTAINER_REGISTRY 找到 renderer', () => {
    for (const { spec, dir } of eachSpec()) {
      for (const sig of spec.signatureContainers ?? []) {
        const mdName = SIGNATURE_CONTAINER_MARKDOWN_NAME[sig]
        expect(
          CONTAINER_REGISTRY[mdName],
          `${dir}: signatureContainer "${sig}" → "${mdName}" 未注册`,
        ).toBeTruthy()
      }
    }
  })

  it('签名与第五态 renderer 都已注册（note / abstract / key-number / see-also）', () => {
    for (const name of ['note', 'abstract', 'key-number', 'see-also']) {
      expect(CONTAINER_REGISTRY[name], `renderer ${name}`).toBeTruthy()
    }
  })

  // R2：SUPPORTED_SIGNATURE_CONTAINERS 必须与 STYLED_CONTAINERS.map(s => s.styleKey)
  // 集合相等。手写数组保留是为了类型字面量联合；这道断言守住二者不漂移。
  it('SUPPORTED_SIGNATURE_CONTAINERS ≡ STYLED_CONTAINERS.styleKey 集合（SSoT 派生约束）', () => {
    const fromVocab = new Set<string>(STYLED_CONTAINERS.map((s) => s.styleKey))
    const fromArray = new Set<string>(SUPPORTED_SIGNATURE_CONTAINERS)
    const missingInArray = [...fromVocab].filter((k) => !fromArray.has(k))
    const orphanInArray = [...fromArray].filter((k) => !fromVocab.has(k))
    expect(missingInArray, 'STYLED_CONTAINERS 中存在但 SUPPORTED_SIGNATURE_CONTAINERS 缺失').toEqual([])
    expect(orphanInArray, 'SUPPORTED_SIGNATURE_CONTAINERS 中存在但 STYLED_CONTAINERS 缺失').toEqual([])
  })
})

// ============================================================
// F. 写作契约 lint：samples 不得出现裸 inline HTML 装饰
//
// 设计原则：sample-*.md 是"作者侧示例"，必须只走容器 / markdown 表达视觉。
// 内联 `<section style="…">` / `<span style="…">` 把主题色码硬编码进作者文本，
// 违反"换主题不需要改稿"的基本承诺——历史上 sample-data-brief.md 曾踩过这条线
// （编 者 按 / 方法论 / 下期·卷期 三处），现已抽象为 editor-note / methodology /
// colophon 三个容器，本测试钉住这条边界，防止回潮。
//
// 允许的例外：mpvideo 占位 iframe（公众号视频接口的硬约束，本身就是占位 HTML）。
// ============================================================

describe('F. samples 不得内联裸 style 装饰', () => {
  let SAMPLES: Array<{ file: string; content: string }> = []

  beforeAll(() => {
    const files = globSync('src/samples-md/sample-*.md', { cwd: process.cwd() })
    SAMPLES = files.map((f) => {
      const abs = resolve(process.cwd(), f)
      return { file: basename(abs), content: readFileSync(abs, 'utf8') }
    })
  })

  it('找到所有 sample-*.md', () => {
    expect(SAMPLES.length).toBeGreaterThan(0)
  })

  it('每份 sample 都不出现 `<section style="…">` 装饰', () => {
    for (const { file, content } of SAMPLES) {
      // 收集所有违规位置（带行号），断言时一次性展示
      const offenders: Array<{ line: number; text: string }> = []
      content.split('\n').forEach((line, i) => {
        if (/<section[^>]*\sstyle\s*=\s*["']/.test(line)) {
          offenders.push({ line: i + 1, text: line.trim().slice(0, 100) })
        }
      })
      expect(
        offenders,
        `${file} 出现 <section style=…>（内联 HTML 装饰违反写作契约）：\n` +
          offenders.map((o) => `  L${o.line}: ${o.text}`).join('\n'),
      ).toEqual([])
    }
  })

  it('每份 sample 都不出现 `<span style="…">` 装饰', () => {
    for (const { file, content } of SAMPLES) {
      const offenders: Array<{ line: number; text: string }> = []
      content.split('\n').forEach((line, i) => {
        if (/<span[^>]*\sstyle\s*=\s*["']/.test(line)) {
          offenders.push({ line: i + 1, text: line.trim().slice(0, 100) })
        }
      })
      expect(
        offenders,
        `${file} 出现 <span style=…>（内联 HTML 装饰违反写作契约）：\n` +
          offenders.map((o) => `  L${o.line}: ${o.text}`).join('\n'),
      ).toEqual([])
    }
  })

  it('mpvideo iframe 占位是允许例外（其他 iframe 仍禁止）', () => {
    // 此测试是"白名单边界"声明：mpvideo 容器渲染时确实需要 iframe 占位；
    // 它出现在 sample 里是合规的。若未来出现非 mpvideo 的 iframe，应触发审视。
    for (const { file, content } of SAMPLES) {
      const iframes = content.match(/<iframe[^>]*>/g) ?? []
      for (const tag of iframes) {
        const isMpvideo = /v\.qq\.com|mpvoice|mpvideo|class="video_iframe/.test(tag)
        expect(isMpvideo, `${file} 出现非 mpvideo iframe：${tag.slice(0, 80)}`).toBe(true)
      }
    }
  })
})
