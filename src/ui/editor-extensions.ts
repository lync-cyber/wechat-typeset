/**
 * CodeMirror 编辑器的容器感知扩展集。
 *
 * 包以下能力：
 *   1. 自动补全（autocomplete）
 *      - `:::` 之后补容器名 —— 候选 apply 为 snippet（整行替换，作者按 Tab 跳占位）
 *      - `variant=` 之后补合法 variant id（按容器 variantKind 查 VARIANT_IDS）
 *      - 容器名后续 token 补 attr key（按 spec.attrs 派生）
 *      - 任意 `<attr>=` 之后补该 attr 的 enum 值（按 spec.attrs[k].enum 派生）
 *      - 候选的 `info` 字段渲染描述 + 示例 markdown 预览
 *   2. 诊断（linter）
 *      - 每次 doc 变更后 debounce 跑 diagnose()，把结果翻译为 CM Diagnostic
 *      - diagnostic.fix 自动转为 CodeMirror lint action（quick-fix）
 *
 * Editor.vue 只负责把它们塞进 extensions 数组，这里保持纯函数、方便单测。
 */

import {
  autocompletion,
  snippet,
  type Completion,
  type CompletionContext,
  type CompletionResult,
} from '@codemirror/autocomplete'
import { linter, type Diagnostic as CMDiagnostic } from '@codemirror/lint'
import type { Extension } from '@codemirror/state'

import {
  CONTAINER_VOCABULARY,
  lookupContainerSpec,
  type ContainerSpec,
} from '../core/vocabulary/vocabulary'
import { VARIANT_IDS, type VariantKind } from '../core/themes/types'
import { diagnose, type Diagnostic as WtDiagnostic } from '../core/pipeline/diagnose'

// ─────────────────────────────────────────────────────────────
// 自动补全：候选数据
// ─────────────────────────────────────────────────────────────

/**
 * 把 spec.example 转为 CodeMirror snippet 模板：
 *   - 转义 `$`（snippet 元字符）
 *   - 首个"非 fence、非空"的内容行包装为 `${1:...}` 占位（按 Tab 选中）
 *   - 末尾 example 自带的 `\n` 保留，让光标自然落在 close fence 后下一行
 *
 * 嵌套示例（compare / timeline / kpi-dashboard）只包第一个内容行，作者多按几下 Tab 即可
 * 遍历到内部子容器的 body —— 不为这一类做"多 stop 占位"以保持模板单一来源（spec.example）。
 */
function exampleToSnippet(example: string): string {
  const escaped = example.replace(/\$/g, '\\$')
  const lines = escaped.split('\n')
  let firstContentIdx = -1
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim()
    if (trimmed.length === 0) continue
    if (/^:{3,}/.test(trimmed)) continue
    firstContentIdx = i
    break
  }
  if (firstContentIdx === -1) {
    // 容器仅 fence、无 body（如 divider）—— 把光标停在 open fence 行末
    if (lines.length >= 1) lines[0] = `${lines[0]}\${1}`
    return lines.join('\n')
  }
  lines[firstContentIdx] = `\${1:${lines[firstContentIdx]}}`
  return lines.join('\n')
}

/**
 * 候选悬浮信息：描述 + example 预览。CM6 把返回的 DOM 节点渲染到候选右侧浮层。
 *
 * 用内联 style 而非外部 CSS，是因为本扩展会被打包到库形态（src/public/*）消费方使用，
 * 不强依赖宿主页面注入额外 CSS 文件；颜色用 CSS 变量 `--editor-*` 跟随主题。
 */
function makeInfoDom(spec: ContainerSpec): HTMLElement {
  const wrap = document.createElement('div')
  wrap.style.cssText = 'max-width:360px;padding:4px 6px;'
  const desc = document.createElement('div')
  desc.style.cssText = 'font-size:12px;line-height:1.5;color:var(--editor-text,inherit);'
  desc.textContent = spec.description
  wrap.appendChild(desc)
  const pre = document.createElement('pre')
  pre.style.cssText =
    'margin:6px 0 0;padding:6px 8px;background:var(--editor-active,rgba(0,0,0,.04));' +
    'border-left:2px solid var(--accent,#888);' +
    'font:11px/1.55 ui-monospace,SFMono-Regular,Menlo,monospace;' +
    'white-space:pre-wrap;color:var(--editor-text,inherit);' +
    'overflow:hidden;text-overflow:ellipsis;'
  pre.textContent = spec.example
  wrap.appendChild(pre)
  return wrap
}

const CONTAINER_COMPLETIONS: readonly Completion[] = CONTAINER_VOCABULARY.map((spec) => ({
  label: spec.name,
  type: spec.parent ? 'interface' : 'class',
  detail: spec.category,
  info: () => makeInfoDom(spec),
  // 整行替换（from=line.from），apply 注入完整 snippet 模板（含 fence + 内容 + close）。
  // 与 containerNameSource 的 from/to 配合：from 为行首、to 为光标，snippet 替换整行。
  apply: snippet(exampleToSnippet(spec.example)),
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

// ─────────────────────────────────────────────────────────────
// 自动补全：sources
// ─────────────────────────────────────────────────────────────

/**
 * `:::` 后的容器名补全。触发条件：
 *   - 行首以 `:::`（或 `::::`）+ 空格 + 可选标识符前缀开头
 *   - 光标落在标识符前缀内或其后
 *
 * 注意：`from` 取整行起点，让 snippet apply 能整行替换 —— 否则 `:::tip` 选中候选后
 * 会变成 `::::::: tip ...`（旧 `:::` 没被消耗）。
 */
function containerNameSource(ctx: CompletionContext): CompletionResult | null {
  const line = ctx.state.doc.lineAt(ctx.pos)
  const textBefore = line.text.slice(0, ctx.pos - line.from)
  if (!/^(:{3,})\s+([A-Za-z][\w-]*)?$/.test(textBefore)) return null
  return {
    from: line.from,
    to: ctx.pos,
    options: CONTAINER_COMPLETIONS as Completion[],
    // 用户继续打字（仍在容器名前缀范围内）时保留候选不消失
    validFor: /^:{3,}\s+[A-Za-z0-9_-]*$/,
  }
}

/**
 * `variant=` 后的变体 id 补全。触发条件：
 *   - 所在行是一个 open fence；用容器名查 variantKind 决定候选集
 *   - 光标前紧邻 `variant=`（或已输入部分前缀、含引号）
 */
function variantIdSource(ctx: CompletionContext): CompletionResult | null {
  const line = ctx.state.doc.lineAt(ctx.pos)
  const textBefore = line.text.slice(0, ctx.pos - line.from)
  const fenceMatch = /^(:{3,})\s+([A-Za-z][\w-]*)\b/.exec(line.text)
  if (!fenceMatch) return null
  const completions = VARIANTS_BY_CONTAINER.get(fenceMatch[2])
  if (!completions || completions.length === 0) return null

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
 * 容器名之后的 attr key 补全。触发条件：
 *   - open fence 行，光标在容器名右侧
 *   - 紧邻光标的 token 是裸标识符（前一个非空白字符不是 `=` / `"` / `'`，即不在"值"位置）
 *
 * apply 的 insert 策略：
 *   - enum 型 attr：插入 `key=`（光标停在 = 后，由 attrEnumValueSource 接力候选）
 *   - 有 example 的 attr：插入 `key="<example>"`（双引号包裹便于含空格）
 *   - 其它：插入 `key=`
 */
function attrKeySource(ctx: CompletionContext): CompletionResult | null {
  const line = ctx.state.doc.lineAt(ctx.pos)
  const fenceMatch = /^(:{3,})\s+([A-Za-z][\w-]*)/.exec(line.text)
  if (!fenceMatch) return null

  const spec = lookupContainerSpec(fenceMatch[2])
  if (!spec?.attrs?.length) return null

  // 光标必须在容器名之后
  const cursorCol = ctx.pos - line.from
  if (cursorCol <= fenceMatch[0].length) return null

  // 紧邻光标的标识符（含空匹配——允许在空白位置主动唤起）
  const token = ctx.matchBefore(/[A-Za-z][\w-]*/)
  const tokenText = token?.text ?? ''
  const tokenStart = token?.from ?? ctx.pos
  // 探测 token 前一个字符：必须是空白或行首之后的空白（不能是 = / " / '）
  const tokenStartCol = tokenStart - line.from
  const prevChar = tokenStartCol > 0 ? line.text[tokenStartCol - 1] : ''
  if (prevChar !== '' && !/\s/.test(prevChar)) return null
  // 非显式触发时，光标紧前必须已有标识符前缀（避免每按一下空格都弹）
  if (!ctx.explicit && tokenText.length === 0) return null

  const completions: Completion[] = spec.attrs.map((a) => {
    const insertValue = a.example ? `"${a.example.replace(/"/g, '\\"')}"` : ''
    return {
      label: a.key,
      type: 'property',
      detail: a.enum ? a.enum.join(' | ') : a.example,
      info: a.description,
      apply: `${a.key}=${insertValue}`,
    }
  })
  return {
    from: tokenStart,
    to: ctx.pos,
    options: completions,
    validFor: /^[A-Za-z0-9_-]*$/,
  }
}

/**
 * `<attr>=` 之后的 enum 值补全（variant 之外的 enum 型 attr）。触发条件：
 *   - open fence 行
 *   - 光标前紧邻 `key=`（或已带引号前缀）；key 在 spec.attrs 中且声明了 enum
 *   - key === 'variant' 时跳过，让 variantIdSource 处理
 */
function attrEnumValueSource(ctx: CompletionContext): CompletionResult | null {
  const line = ctx.state.doc.lineAt(ctx.pos)
  const fenceMatch = /^(:{3,})\s+([A-Za-z][\w-]*)/.exec(line.text)
  if (!fenceMatch) return null
  const spec = lookupContainerSpec(fenceMatch[2])
  if (!spec?.attrs?.length) return null

  const textBefore = line.text.slice(0, ctx.pos - line.from)
  const m = /(\b[A-Za-z][\w-]*)=(["']?)([A-Za-z0-9_-]*)$/.exec(textBefore)
  if (!m) return null
  const [, key, , prefix] = m
  if (key === 'variant') return null
  const attr = spec.attrs.find((a) => a.key === key)
  if (!attr?.enum?.length) return null

  const completions: Completion[] = attr.enum.map((v) => ({
    label: v,
    type: 'enum',
    detail: key,
  }))
  return {
    from: ctx.pos - prefix.length,
    to: ctx.pos,
    options: completions,
    validFor: /^[A-Za-z0-9_-]*$/,
  }
}

/**
 * 整合 autocomplete 扩展，供 Editor.vue 直接塞进 state.extensions。
 *
 * source 顺序：先 value-position 候选（variant / attr enum），再 key-position（attr key），
 * 最后 container name —— 让"更具体"的上下文优先匹配。
 */
export function createContainerAutocomplete(): Extension {
  return autocompletion({
    override: [
      variantIdSource,
      attrEnumValueSource,
      attrKeySource,
      containerNameSource,
    ],
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
 * Diagnostic.fix 字段（若存在）会被翻译成一条 quick-fix action —— 作者在浮层里
 * 点一下就能机械修复（yaml 风格 → key=value / 文末追加未闭合 fence / 中文标点 等）。
 *
 * debounce 由 CM 自己做（默认 750ms，linter 选项可调）；这里保持无状态。
 */
export function createContainerLinter(): Extension {
  return linter(
    (view) => {
      const source = view.state.doc.toString()
      const diagnostics = diagnose(source)
      return diagnostics.map<CMDiagnostic>((d) => {
        const cm: CMDiagnostic = {
          from: Math.min(d.from, source.length),
          to: Math.min(Math.max(d.to, d.from), source.length),
          severity: SEVERITY_MAP[d.severity],
          message: d.message,
          source: `wechat-typeset:${d.code}`,
        }
        if (d.fix) {
          const edits = d.fix.edits
          const title = d.fix.title
          cm.actions = [
            {
              name: title,
              apply: (targetView) => {
                // 校验 edits 的 from/to 仍在文档范围内（doc 在 debounce 期间可能已变）
                const docLen = targetView.state.doc.length
                const safe = edits
                  .filter((e) => e.from >= 0 && e.to <= docLen && e.from <= e.to)
                  .map((e) => ({ from: e.from, to: e.to, insert: e.insert }))
                if (safe.length === 0) return
                targetView.dispatch({ changes: safe })
              },
            },
          ]
        }
        return cm
      })
    },
    {
      delay: 500,
    },
  )
}

