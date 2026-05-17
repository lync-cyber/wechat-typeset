/**
 * useUserVariantLint —— 把 lintInlineCSS（步骤 1）包成 CodeMirror 6 的 linter Extension。
 *
 * 用途：高级用户在源码编辑器里编辑 inline CSS（步骤 5 的 CSS pane）时，实时把 rules.ts
 * 黑名单（position / float / font-family / @media / :hover 等）画成红波浪线。
 *
 * 定位逻辑（locateDecl）：简易 substring 搜索——把 lintInlineCSS 返回的 prop/value 对
 * 在 doc 文本里反查 from/to offset。准确度对"作者自己写的几十行 inline CSS"足够；
 * 多处同名声明取第一处。未来如果要更精准（多处覆盖），把 lintInlineCSS 升级为带
 * offset 输出再换掉这层定位逻辑——本 composable 形态不变。
 *
 * 为什么不直接复用 CM 内置 CSS lint：内置 lint 只关心语法 / 已知 prop，不知道微信
 * 平台黑名单（这是本项目独有的约束）。
 */

import { linter, type Diagnostic as CMDiag } from '@codemirror/lint'
import type { Extension } from '@codemirror/state'
import { lintInlineCSS } from '../../core/pipeline/lint'

/**
 * 在文本里定位一条 `prop:value` 声明的 [from, to) offset。
 * 找不到返回 [0, 0]——CM linter 会把 diagnostic 放在文档首字，仍能提示，只是定位不精准。
 */
function locateDecl(text: string, prop: string, value: string): [number, number] {
  // 优先按 `prop` 名定位：从首次出现到值末尾
  const propIdx = text.indexOf(prop)
  if (propIdx < 0) return [0, 0]
  // 找到 prop 之后第一个 ':'
  const colonIdx = text.indexOf(':', propIdx + prop.length)
  if (colonIdx < 0) return [propIdx, propIdx + prop.length]
  // 值结束于下一个 ';' 或文档末尾
  const valEnd = text.indexOf(';', colonIdx + 1)
  const to = valEnd < 0 ? text.length : valEnd
  // value 不必精确匹配（CSS parser 可能与 lintInlineCSS 切分略有出入），有 prop 定位已够
  void value
  return [propIdx, to]
}

/**
 * 构造 CM6 linter Extension。
 *
 * path 参数透传给 lintInlineCSS，作为 diagnostic.path 上下文（如 'wrapperCSS' / 'titleCSS'）；
 * 在 CM 端不影响显示，但保留语义让未来扩展（多 pane 共用同一 lint）能区分来源。
 */
export function createUserVariantCSSLinter(path = 'editor'): Extension {
  return linter((view) => {
    const text = view.state.doc.toString()
    return lintInlineCSS(text, path).map<CMDiag>((d) => {
      const [from, to] = locateDecl(text, d.prop, d.value)
      return {
        from,
        to,
        severity: d.severity,
        message: d.message,
        source: 'wxts-css',
      }
    })
  })
}
