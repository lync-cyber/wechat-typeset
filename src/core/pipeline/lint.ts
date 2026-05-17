/**
 * 行级 lint —— 把 themeCSS 的"throw on forbidden"重写为"返回 Diagnostic[]"。
 *
 * 与 themeCSS.ts:assertSafeProp 共享 rules.ts 黑名单：assertSafeProp 现在就是
 * 这里的 lintProp 加一层 throw wrapper。新增使用者：
 *   - 用户态变体编辑（高级用户编辑 inline CSS）的 CodeMirror linter
 *   - UserVariant 保存期硬闸（落库前最后一次扫描）
 *
 * 优先级与短路：lintProp 按 forbidden-prop > forbidden-display > forbidden-value-pattern
 * 顺序检查，**返回最先命中的那一条**（最多 1 条）。这与重构前 assertSafeProp 的
 * 三段 if/throw 完全等价——assertSafeProp 只读 [0] 抛错，文案逐字一致。
 *
 * lintInlineCSS 按 ';' 切 decl、按首个 ':' 切 prop/value，对每条 decl 调一次 lintProp，
 * **聚合所有命中**（多条 decl 各自一条 diagnostic）。这是为了让 linter UI 一次性把
 * 所有问题都画出来，避免"修一条又冒一条"的体验。
 */

import {
  FORBIDDEN_CSS_PROPS,
  FORBIDDEN_DISPLAY_VALUES,
  FORBIDDEN_VALUE_PATTERNS,
} from './rules'

export type DiagnosticCode =
  | 'forbidden-prop'
  | 'forbidden-display'
  | 'forbidden-value-pattern'

export interface Diagnostic {
  severity: 'error' | 'warning'
  code: DiagnosticCode
  prop: string
  value: string
  /** 调用方上下文。来源既可能是 themeCSS 的 'elements.p' 这种点路径，也可能是
   *  用户变体编辑场景的 'wrapperCSS' / 'titleCSS' 这种槽位名。 */
  path: string
  /** 与 ThemeAuthoringError 文案逐字一致（重构前 assertSafeProp 的 throw message）。 */
  message: string
}

/**
 * 检查单条 CSS 声明。优先级与原 assertSafeProp 一致，命中第一条即返回。
 */
export function lintProp(prop: string, value: string, path: string): Diagnostic[] {
  const lower = prop.toLowerCase()

  if (FORBIDDEN_CSS_PROPS.includes(lower)) {
    return [{
      severity: 'error',
      code: 'forbidden-prop',
      prop,
      value,
      path,
      message: `[themeCSS] 主题在 ${path} 声明了 \`${prop}\`，违反微信平台约束。请移除。`,
    }]
  }

  if (lower === 'display' && FORBIDDEN_DISPLAY_VALUES.has(value.toLowerCase().trim())) {
    return [{
      severity: 'error',
      code: 'forbidden-display',
      prop,
      value,
      path,
      message:
        `[themeCSS] 主题在 ${path} 使用了 \`display: ${value}\`，微信粘贴后会被剥离。` +
        '改用 block / inline-block / table 系列。',
    }]
  }

  for (const [re, reason] of FORBIDDEN_VALUE_PATTERNS) {
    if (re.test(value)) {
      return [{
        severity: 'error',
        code: 'forbidden-value-pattern',
        prop,
        value,
        path,
        message: `[themeCSS] 主题在 ${path} 的值里命中禁用模式（${reason}）：\`${value}\`。请移除。`,
      }]
    }
  }

  return []
}

/**
 * 切 inline CSS 字符串（variant render() 实际产出格式：`'a:b;c:d'`），逐条 lintProp。
 *
 * 解析容忍：
 *   - 末尾 / 中间的空 decl（连续分号、尾分号）静默跳过
 *   - 缺 ':' 或 prop/value 为空的 decl 静默跳过（不视为 lint 错——格式问题留给 CSS parser）
 *   - value 内的额外 ':'（如 `background: url(http://...)`）按首个 ':' 切，余下整体为 value
 *
 * 不处理：带分号的字符串字面量 / url() 内分号——variant CSS 历来没有，真碰上再升级。
 */
export function lintInlineCSS(css: string, path: string): Diagnostic[] {
  const out: Diagnostic[] = []
  for (const decl of css.split(';')) {
    const trimmed = decl.trim()
    if (!trimmed) continue
    const colonIdx = trimmed.indexOf(':')
    if (colonIdx < 0) continue
    const prop = trimmed.slice(0, colonIdx).trim()
    const value = trimmed.slice(colonIdx + 1).trim()
    if (!prop || !value) continue
    out.push(...lintProp(prop, value, path))
  }
  return out
}
