/**
 * 组件 snippet 校验 —— "野组件" 拦截层。
 *
 * 扫描一段 markdown,检查所有出现的:
 *   - `::: name` / `:::: name` 容器 fence 名是否在 CONTAINER_VOCABULARY 里
 *   - 任一 fence 上的 `variant=xxx` 是否在对应 kind 的 VARIANT_IDS 内
 *
 * 用途:
 *   - 用户保存 / 编辑组件时拦截,inline error 阻断 "保存包含未注册容器的片段" 路径
 *   - 已存 user 组件读取时跑一遍,把 diagnostics 写到 entry 上让 UI 显示 "包含未注册容器" 角标
 *   - 导入 JSON 时给单条条目做兜底标记
 *
 * 不做的事:
 *   - 不渲染 / 不解析 markdown 语义,只看 fence 和 fence 上的属性
 *   - 不检查 attrs.variant 之外的属性(如 footer-cta href 白名单)——那些走 diagnose.ts 主流程
 *   - 不检查 markdown body 内容是否符合容器期望(比如 compare 必须含 pros/cons)
 *
 * 设计原则:
 *   - 纯函数,零副作用,Node / Vite 都能跑
 *   - 行号 1-based,方便 UI 跳转 / 高亮
 *   - 嵌套 fence: 进入 ``` 代码块后,内部的 ::: 不当容器解析(代码示例里写 ::: 是合法 markdown)
 */

import { lookupContainerSpec } from '../../core/vocabulary/vocabulary'
import { CODE_BLOCK_VARIANTS } from '../../core/variants/registry'
import { parseInfo } from '../../core/pipeline/containers/types'
import { VARIANT_IDS, type VariantKind } from '../../core/themes/types'

/** 单条诊断的判别字段。 */
export interface UnknownFenceIssue {
  kind: 'unknown-fence'
  /** 未注册的容器 fence 名(如 `episode-card`) */
  name: string
  /** 出现行号(1-based) */
  line: number
}

export interface UnknownVariantIssue {
  kind: 'unknown-variant'
  /** 出现位置:容器 fence 名,或 `code`(代码块 fence) */
  container: string
  /** 该 variant 所属 kind(决定查哪个 VARIANT_IDS 桶) */
  variantKind: VariantKind
  /** 未注册的 variant id */
  variantId: string
  /** 出现行号(1-based) */
  line: number
}

export type ValidateIssue = UnknownFenceIssue | UnknownVariantIssue

export interface ValidateResult {
  /** 全无问题 → true。issues 长度为 0 等价。 */
  ok: boolean
  /** 去重后的未知容器名集合(便于 UI 头部一行总结) */
  unknownFences: string[]
  /** 去重后的未知 variant 集合(同上) */
  unknownVariants: Array<{ container: string; variantKind: VariantKind; variantId: string }>
  /** 每条 issue 都带行号,UI 用于 gutter 标记 */
  issues: ValidateIssue[]
}

/** 容器开 fence 正则:行首 3+ 冒号 + 空白 + 名字 + 其余。close fence(`:::` 单独)不命中。 */
const CONTAINER_OPEN_RE = /^(:::+)\s+(\S+)(.*)$/
/** 代码块 fence 正则:行首 3+ 反引号 + 其余(语言 + 可选 attrs) */
const CODE_FENCE_RE = /^(`{3,})(.*)$/

export function validateSnippet(md: string): ValidateResult {
  const lines = md.split('\n')
  const issues: ValidateIssue[] = []

  // 代码块状态机:在 ``` 内时不解析 ::: 容器
  let inCodeFence = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const lineNum = i + 1

    const codeMatch = line.match(CODE_FENCE_RE)
    if (codeMatch) {
      if (inCodeFence) {
        // 关 fence,可能携带 attrs 但我们不消费
        inCodeFence = false
        continue
      }
      // 开 fence: 解析 info 取语言 + 任何 variant=xxx
      inCodeFence = true
      const info = codeMatch[2].trim()
      if (info) {
        const { attrs } = parseInfo(info)
        if (attrs.variant && !(attrs.variant in CODE_BLOCK_VARIANTS)) {
          issues.push({
            kind: 'unknown-variant',
            container: 'code',
            variantKind: 'codeBlock',
            variantId: attrs.variant,
            line: lineNum,
          })
        }
      }
      continue
    }

    if (inCodeFence) continue

    const fenceMatch = line.match(CONTAINER_OPEN_RE)
    if (!fenceMatch) continue
    const name = fenceMatch[2]
    const rest = fenceMatch[3]
    const spec = lookupContainerSpec(name)
    if (!spec) {
      issues.push({ kind: 'unknown-fence', name, line: lineNum })
      continue
    }
    if (!spec.variantKind || !rest) continue
    const { attrs } = parseInfo(rest.trim())
    if (!attrs.variant) continue
    const validIds: readonly string[] = VARIANT_IDS[spec.variantKind] as readonly string[]
    if (!validIds.includes(attrs.variant)) {
      issues.push({
        kind: 'unknown-variant',
        container: name,
        variantKind: spec.variantKind,
        variantId: attrs.variant,
        line: lineNum,
      })
    }
  }

  const unknownFences = uniq(
    issues
      .filter((i): i is UnknownFenceIssue => i.kind === 'unknown-fence')
      .map((i) => i.name),
  )
  const variantIssues = issues.filter(
    (i): i is UnknownVariantIssue => i.kind === 'unknown-variant',
  )
  const seen = new Set<string>()
  const unknownVariants: Array<{ container: string; variantKind: VariantKind; variantId: string }> = []
  for (const v of variantIssues) {
    const key = `${v.container}:${v.variantKind}:${v.variantId}`
    if (seen.has(key)) continue
    seen.add(key)
    unknownVariants.push({ container: v.container, variantKind: v.variantKind, variantId: v.variantId })
  }

  return {
    ok: issues.length === 0,
    unknownFences,
    unknownVariants,
    issues,
  }
}

function uniq<T>(arr: T[]): T[] {
  return [...new Set(arr)]
}
