/**
 * CodeMirror 编辑器的容器感知扩展集。
 *
 * 包两件事：
 *   1. 自动补全（autocomplete）
 *      - `::: ` 之后补容器名（数据源：CONTAINER_VOCABULARY）
 *      - `variant=` 之后补合法 variant id（按容器 variantKind 查 VARIANT_IDS）
 *   2. 诊断（linter）
 *      - 每次 doc 变更后 debounce 跑 diagnose()，把结果翻译为 CM Diagnostic
 *
 * Editor.vue 只负责把它们塞进 extensions 数组，这里保持纯函数、方便单测。
 */

import {
  autocompletion,
  type Completion,
  type CompletionContext,
  type CompletionResult,
} from '@codemirror/autocomplete'
import { linter, type Diagnostic as CMDiagnostic } from '@codemirror/lint'
import type { Extension } from '@codemirror/state'

import { CONTAINER_VOCABULARY } from '../containers/vocabulary'
import { VARIANT_IDS, type VariantKind } from '../themes/types'
import { diagnose, type Diagnostic as WtDiagnostic } from '../pipeline/diagnose'

// ─────────────────────────────────────────────────────────────
// 自动补全
// ─────────────────────────────────────────────────────────────

const CONTAINER_COMPLETIONS: readonly Completion[] = CONTAINER_VOCABULARY.map((spec) => ({
  label: spec.name,
  type: spec.parent ? 'interface' : 'class',
  detail: spec.category,
  info: spec.description,
  // 只替换光标处的容器名前缀，用户已输入的 `::: ` 保持原样；
  // 例子挂在 info 里由 CM 悬浮展示，不直接插入。
}))

const VARIANTS_BY_CONTAINER: ReadonlyMap<string, readonly Completion[]> = new Map(
  CONTAINER_VOCABULARY.filter((s) => s.variantKind !== undefined).map((s) => {
    const allowed =
      VARIANT_IDS[s.variantKind as Exclude<VariantKind, 'none'>] ??
      ([] as readonly string[])
    const completions: Completion[] = (allowed as readonly string[]).map((id) => ({
      label: id,
      type: 'enum',
      detail: s.variantKind,
    }))
    return [s.name, completions]
  }),
)

/**
 * `:::` 后的容器名补全。触发条件：
 *   - 行首以 `:::`（或 `::::`）+ 空格 + 可选标识符前缀开头
 *   - 光标落在标识符前缀内或其后
 */
function containerNameSource(ctx: CompletionContext): CompletionResult | null {
  // 只在行首附近触发：拿当前光标行从开头到光标的切片
  const line = ctx.state.doc.lineAt(ctx.pos)
  const textBefore = line.text.slice(0, ctx.pos - line.from)
  const m = /^(:{3,})\s+([A-Za-z][\w-]*)?$/.exec(textBefore)
  if (!m) return null
  const prefix = m[2] ?? ''
  const from = line.from + (m[0].length - prefix.length)
  return {
    from,
    to: ctx.pos,
    options: CONTAINER_COMPLETIONS as Completion[],
    validFor: /^[A-Za-z0-9_-]*$/,
  }
}

/**
 * `variant=` 后的变体 id 补全。触发条件：
 *   - 光标前紧邻 `variant=`（或已输入部分前缀、含引号）
 *   - 所在行是一个 open fence；用容器名查 variantKind 决定候选集
 */
function variantIdSource(ctx: CompletionContext): CompletionResult | null {
  const line = ctx.state.doc.lineAt(ctx.pos)
  const textBefore = line.text.slice(0, ctx.pos - line.from)
  // 行首必须是 open fence
  const fenceMatch = /^(:{3,})\s+([A-Za-z][\w-]*)\b/.exec(line.text)
  if (!fenceMatch) return null
  const containerName = fenceMatch[2]
  const completions = VARIANTS_BY_CONTAINER.get(containerName)
  if (!completions || completions.length === 0) return null

  // 匹配 `variant=`、`variant="`、`variant='` 之后的前缀
  const m = /variant=(["']?)([A-Za-z0-9_-]*)$/.exec(textBefore)
  if (!m) return null
  const prefix = m[2]
  return {
    from: ctx.pos - prefix.length,
    to: ctx.pos,
    options: completions as Completion[],
    validFor: /^[A-Za-z0-9_-]*$/,
  }
}

/**
 * 整合 autocomplete 扩展，供 Editor.vue 直接塞进 state.extensions。
 */
export function createContainerAutocomplete(): Extension {
  return autocompletion({
    override: [variantIdSource, containerNameSource],
    activateOnTyping: true,
    icons: false,
  })
}

// ─────────────────────────────────────────────────────────────
// 诊断（linter）
// ─────────────────────────────────────────────────────────────

const SEVERITY_MAP: Record<WtDiagnostic['severity'], CMDiagnostic['severity']> = {
  error: 'error',
  warning: 'warning',
  info: 'info',
}

/**
 * 把 pipeline/diagnose.ts 的输出翻译成 CodeMirror lint Diagnostic。
 *
 * debounce 由 CM 自己做（默认 750ms，linter 选项可调）；这里保持无状态。
 */
export function createContainerLinter(): Extension {
  return linter(
    (view) => {
      const source = view.state.doc.toString()
      const diagnostics = diagnose(source)
      return diagnostics.map<CMDiagnostic>((d) => ({
        from: Math.min(d.from, source.length),
        to: Math.min(Math.max(d.to, d.from), source.length),
        severity: SEVERITY_MAP[d.severity],
        message: d.message,
        source: `wechat-typeset:${d.code}`,
      }))
    },
    {
      // 写完一行后略等再扫，避免边写 `::: ` 边频繁闪诊断
      delay: 500,
    },
  )
}

export { CONTAINER_COMPLETIONS, VARIANTS_BY_CONTAINER }
