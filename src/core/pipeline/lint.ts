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
  HARD_REMOVE_TAGS,
  IFRAME_SRC_ALLOW,
} from './rules'

export type DiagnosticCode =
  | 'forbidden-prop'
  | 'forbidden-display'
  | 'forbidden-value-pattern'
  | 'forbidden-tag'
  | 'forbidden-attr'
  | 'unknown-placeholder'
  | 'missing-body-placeholder'
  | 'duplicate-body-placeholder'
  | 'iframe-src-not-allowed'

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

const PLACEHOLDER_RE = /\{\{\s*([\w.]+)\s*\}\}/g
const ATTR_PLACEHOLDER_RE = /^attr\.[a-zA-Z_][\w-]*$/
const KNOWN_PLACEHOLDERS: ReadonlySet<string> = new Set([
  'title',
  'body',
  'wrapperCSS',
  'titleCSS',
  'bodyCSS',
  'svgSlot',
])

/**
 * 与 HARD_REMOVE_TAGS 语义同源（"微信沙箱必剥"集合），但目标不同：wxPatch 用前者
 * 清洗 DOM，本 lint 用后者阻止保存。两边都需独立扩展集——iframe 在此走 src 白名单。
 */
const TEMPLATE_FORBIDDEN_TAGS: ReadonlySet<string> = new Set([
  ...HARD_REMOVE_TAGS,
  'object',
  'embed',
  'form',
])

const TAG_RE = /<\s*\/?\s*([a-zA-Z][\w-]*)\b([^>]*)>/g
const EVENT_ATTR_RE = /\bon[a-z]+\s*=/gi
const JS_HREF_RE = /\b(?:href|src|formaction|action)\s*=\s*("|')?\s*javascript:/i
const IFRAME_SRC_RE = /\bsrc\s*=\s*("([^"]*)"|'([^']*)'|(\S+))/i
const STYLE_ATTR_RE = /\bstyle\s*=\s*("([^"]*)"|'([^']*)')/gi

/**
 * 校验 UserVariantCustom.template 的 HTML 与占位符。聚合所有命中（不短路），
 * 让 UI 一次性把全部问题画出来。不构造 DOM（Node 环境无 happy-dom 依赖），仅诊断
 * 不修复。
 */
export function lintTemplateHTML(template: string, path: string): Diagnostic[] {
  const out: Diagnostic[] = []

  TAG_RE.lastIndex = 0
  let m: RegExpExecArray | null
  while ((m = TAG_RE.exec(template)) !== null) {
    const tagName = m[1].toLowerCase()
    const attrs = m[2] ?? ''
    const fragment = m[0]
    // close tag 无属性可查，且 forbidden-tag 报一次足够
    if (/^<\s*\//.test(fragment)) continue

    if (TEMPLATE_FORBIDDEN_TAGS.has(tagName)) {
      out.push({
        severity: 'error',
        code: 'forbidden-tag',
        prop: tagName,
        value: fragment,
        path,
        message: `[template] ${path} 含禁用标签 <${tagName}>，微信沙箱会整棵剥离或视为攻击面，请移除。`,
      })
      continue
    }
    if (tagName === 'iframe') {
      const srcM = IFRAME_SRC_RE.exec(attrs)
      const src = srcM ? (srcM[2] ?? srcM[3] ?? srcM[4] ?? '') : ''
      const allowed = src && IFRAME_SRC_ALLOW.some((re) => re.test(src))
      if (!allowed) {
        out.push({
          severity: 'error',
          code: 'iframe-src-not-allowed',
          prop: 'iframe.src',
          value: src,
          path,
          message: `[template] ${path} 的 <iframe> src 不在白名单。当前仅允许 v.qq.com（mpvideo 容器）。`,
        })
      }
    }

    EVENT_ATTR_RE.lastIndex = 0
    let evt: RegExpExecArray | null
    while ((evt = EVENT_ATTR_RE.exec(attrs)) !== null) {
      out.push({
        severity: 'error',
        code: 'forbidden-attr',
        prop: evt[0].replace(/\s*=\s*$/, ''),
        value: fragment,
        path,
        message: `[template] ${path} 含事件属性 \`${evt[0].trim()}\`，微信会剥离且为 XSS 风险点。`,
      })
    }

    if (JS_HREF_RE.test(attrs)) {
      out.push({
        severity: 'error',
        code: 'forbidden-attr',
        prop: 'javascript-protocol',
        value: fragment,
        path,
        message: `[template] ${path} 含 \`javascript:\` 协议，禁止——XSS 风险。`,
      })
    }

    STYLE_ATTR_RE.lastIndex = 0
    let sm: RegExpExecArray | null
    while ((sm = STYLE_ATTR_RE.exec(attrs)) !== null) {
      const styleBody = sm[2] ?? sm[3] ?? ''
      if (!styleBody) continue
      // 纯占位符的 style（如 style="{{wrapperCSS}}"）由运行时填充并已分别 lint，
      // 这里 lint 会把 `{{wrapperCSS}}` 当成 CSS 字面量误报
      const stripped = styleBody.replace(PLACEHOLDER_RE, '').trim()
      if (!stripped) continue
      out.push(...lintInlineCSS(styleBody, `${path}.style@<${tagName}>`))
    }
  }

  let bodyCount = 0
  PLACEHOLDER_RE.lastIndex = 0
  let pm: RegExpExecArray | null
  while ((pm = PLACEHOLDER_RE.exec(template)) !== null) {
    const name = pm[1]
    if (name === 'body') {
      bodyCount++
      continue
    }
    if (KNOWN_PLACEHOLDERS.has(name)) continue
    if (ATTR_PLACEHOLDER_RE.test(name)) continue
    out.push({
      severity: 'warning',
      code: 'unknown-placeholder',
      prop: name,
      value: pm[0],
      path,
      message:
        `[template] ${path} 含未识别占位符 \`${pm[0]}\`，渲染时会原样输出。` +
        '白名单：{{title}}/{{body}}/{{attr.X}}/{{wrapperCSS}}/{{titleCSS}}/{{bodyCSS}}/{{svgSlot}}。',
    })
  }
  if (bodyCount === 0) {
    out.push({
      severity: 'error',
      code: 'missing-body-placeholder',
      prop: '{{body}}',
      value: '',
      path,
      message: `[template] ${path} 缺少 {{body}} 占位符——渲染器据此切分 open/close，必须恰好 1 个。`,
    })
  } else if (bodyCount > 1) {
    out.push({
      severity: 'error',
      code: 'duplicate-body-placeholder',
      prop: '{{body}}',
      value: String(bodyCount),
      path,
      message: `[template] ${path} 含 ${bodyCount} 个 {{body}} 占位符；必须恰好 1 个。`,
    })
  }

  return out
}
