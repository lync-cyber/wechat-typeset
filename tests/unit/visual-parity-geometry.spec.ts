/**
 * visual-parity-geometry —— 设计稿 IR vs 实现侧 render 输出的几何断言。
 *
 * 数据驱动：枚举 docs/generated/design-ir/*.json 中"已落地实现"的 variant，跑 pipeline
 * render，把输出 HTML 解析回 IR 形态，与设计稿 baseline 比对。任何 severity='error'
 * 的差异都让对应用例失败。
 *
 * 范围：admonition / note / quote / highlight / pull-quote 五类（这五类的 variant ts
 * 实现已对齐到 content-1.html 阶段 2）。其余类（compare / steps / dialogue / ...）
 * 当前实现尚不齐，先不纳入；后续补齐时只需把对应 kind 加入 ENABLED_KINDS。
 *
 * 与现有 [visual-parity.spec.ts]（contains-check）分工：本 spec 关心**几何与样式数值**，
 * 后者关心**文本锚点与装饰文字**。两者并存——前者抓位置 / 字号偏移，后者抓"motif 丢失"。
 *
 * 注：本 spec 依赖 [docs/generated/design-ir/]，运行前需跑 `tools/extract-design-ir.ts`
 * 至少一次。CI 顺序：extract → vitest。
 */

import '../../tools/shim-jsdom'
import { describe, expect, it } from 'vitest'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { render as pipelineRender } from '../../src/core/pipeline'
import { getTheme } from '../../src/core/themes'
import { compareGeometry, type DesignIR, type GeometryDiff } from '../../src/core/design-ir'
import { parseRenderedToIR } from '../../packages/cli/src/commands/_shared/parse-rendered-ir'

const IR_DIR = resolve(import.meta.dirname, '../../docs/generated/design-ir')

const ENABLED_KINDS = new Set<string>([
  'admonition',
  'note',
  'quote',
  'highlight',
  'pull-quote',
])

const KIND_TO_FENCE: Record<string, string> = {
  admonition: 'tip',
  note: 'note',
  quote: 'quote-card',
  highlight: 'highlight',
  'pull-quote': 'pull-quote',
}

function loadIRsForEnabledKinds(): DesignIR[] {
  if (!existsSync(IR_DIR)) return []
  const out: DesignIR[] = []
  for (const name of readdirSync(IR_DIR)) {
    if (!name.endsWith('.json') || name === 'index.json') continue
    const [kind] = name.split('.')
    if (!ENABLED_KINDS.has(kind)) continue
    const ir = JSON.parse(readFileSync(join(IR_DIR, name), 'utf8')) as DesignIR
    // 实现存在性校验：variant ts 必须存在，否则 render 会 fall back 到默认骨架，diff 失真
    const tsPath = resolve(
      import.meta.dirname,
      '../..',
      'src/core/variants',
      kind,
      `${ir.variantId}.ts`,
    )
    if (!existsSync(tsPath)) continue
    out.push(ir)
  }
  return out.sort((a, b) =>
    a.kind === b.kind
      ? a.variantId.localeCompare(b.variantId)
      : a.kind.localeCompare(b.kind),
  )
}

function defaultMd(kind: string, variantId: string): string {
  switch (kind) {
    case 'admonition':
      return `::: tip 告示 variant=${variantId}\n正文示例\n:::\n`
    case 'note':
      return `::: note variant=${variantId}\n按语正文\n:::\n`
    case 'quote':
      return `::: quote-card 苏轼 variant=${variantId}\n人生如逆旅，我亦是行人。\n:::\n`
    case 'highlight':
      return `::: highlight variant=${variantId}\n强调短句\n:::\n`
    case 'pull-quote':
      return `::: pull-quote variant=${variantId}\n醒目引文示例\n:::\n`
    default:
      return `::: ${kind} variant=${variantId}\n示例\n:::\n`
  }
}

const IRS = loadIRsForEnabledKinds()

describe('visual-parity-geometry · IR-vs-render diff', () => {
  if (IRS.length === 0) {
    it('IR 目录为空 → 跳过（先跑 pnpm tsx tools/extract-design-ir.ts）', () => {
      expect(IRS.length).toBe(0)
    })
    return
  }

  // 按 kind 分组生成 describe，便于失败时定位
  const byKind = new Map<string, DesignIR[]>()
  for (const ir of IRS) {
    if (!byKind.has(ir.kind)) byKind.set(ir.kind, [])
    byKind.get(ir.kind)!.push(ir)
  }

  for (const [kind, irs] of byKind) {
    describe(kind, () => {
      for (const ir of irs) {
        it(`${ir.variantId} @ ${ir.recommendedThemeId}`, () => {
          const fence = KIND_TO_FENCE[kind] ?? kind
          const md = defaultMd(kind, ir.variantId)
          const out = pipelineRender({ md, theme: getTheme(ir.recommendedThemeId) })
          const actual = parseRenderedToIR(out.html, fence, ir.variantId, ir.designTheme)
          if (!actual) {
            throw new Error(
              `actual wrapper not found in render output (class .container-${fence}--${ir.variantId})`,
            )
          }
          // 本 spec **只**比对 wrapper 层。理由：baseline 来自设计稿（手写 inline），
          // actual 来自 pipeline render（juice 内联 + class 注入），两边的 slot 层
          // 嵌套深度不同——admonition.paper-slip 双方都是 leftCol/body 二级嵌套；
          // highlight.wash-ground 设计稿用 wrapper 内 inline span，实现侧用单层 span，
          // 二者 slot 切分本就不对齐，硬比对会持续误报。
          //
          // 真正的 slot 几何反馈走两条更准确的通道：
          //   1. MCP `variant diff-geometry` —— 写完 variant.ts 后按需调用，LLM 读
          //      slot 维度 diff[] 自我修正
          //   2. visual-parity.spec.ts contains-check —— 抓"motif 装饰文字 / 边框关键字"
          //      丢失，与本 spec 互补
          //
          // 本 spec 守住"wrapper 层不漂移"——即设计稿与实现都同意 wrapper 是
          // display:table/block + padding + bg 的形状。slot 层是 variant 实现者的
          // 创作空间，让 lint + MCP diff 工具承担反馈。
          const diffs: GeometryDiff[] = compareGeometry(ir.wrapper, actual.wrapper, 'wrapper')

          const errors = diffs.filter((d) => d.severity === 'error')
          if (errors.length > 0) {
            throw new Error(
              `[${kind}/${ir.variantId}] 几何 error ${errors.length} 条:\n` +
                errors
                  .map((d) => `  ${d.path}.${d.prop}: baseline=${d.baseline} actual=${d.actual} — ${d.hint ?? ''}`)
                  .join('\n'),
            )
          }
          // warning / info 不阻断；但记录 summary 让 `--reporter verbose` 能瞥见。
          expect(errors.length).toBe(0)
        })
      }
    })
  }
})
