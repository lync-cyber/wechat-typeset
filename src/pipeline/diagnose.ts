/**
 * 作者编辑期诊断 —— "在作者离开编辑器之前告诉他会塌"。
 *
 * 现状：塌版反馈链过长——作者写错容器名 / 错层级 / 错 variant，必须
 *   1) 复制 → 2) 粘到公众号 → 3) 肉眼看塌 → 4) 回来找错。
 * 目标：把可静态确定的违规翻译成行号 + 消息，接入 CodeMirror lintSource，
 *       作者在编辑器里直接看到红波浪线。
 *
 * 本文件**仅做静态分析，不执行 markdown 渲染**——pipeline 的渲染期告警保留
 * （比如 variantized 容器的主题缺 variant 实现），两层互补：
 *   - diagnose.ts：语法级、容器契约级（离线可判）
 *   - pipeline + wxPatch：渲染期、DOM 级（需真 HTML 才判得出）
 *
 * Stage 1 覆盖（按 writer-contract 的作者 API 全集反向打点）：
 *   - 未知容器名（vocabulary 反查）
 *   - fence 长度错误（compare 需要 ::::；pros/cons 只能 :::）
 *   - pros/cons 写在 compare 之外
 *   - 未知 variant 值（按 container.variantKind 查 VARIANT_IDS）
 *   - 未闭合 fence
 *   - open 行写 YAML 风格 `key: v`（应为 key=v）
 *
 * Stage 2 覆盖（追加）：
 *   - 列表嵌套 ≥ 3 层（list-too-deep）——配合 wxPatch/patchListWrap 的扁平化兜底，
 *     在编辑期提前告诉作者"这一行会在公众号里被改写为段落"。
 *
 * Stage 3 覆盖（追加）：
 *   - 中文排版四类（zhTypo 模块）：中英空格 / 全半角 / 直引号 / 省略号破折号。
 *     规则实现沉到 zhTypo.ts，diagnose 只做翻译层。
 */

import { CONTAINER_VOCABULARY, lookupContainerSpec } from '../containers/vocabulary'
import { VARIANT_IDS } from '../themes/types'
import { scanZhTypo, type ZhTypoCode } from './zhTypo'

export type DiagnosticSeverity = 'error' | 'warning' | 'info'

export interface Diagnostic {
  /** 源码绝对字符偏移（含起始字符） */
  from: number
  /** 源码绝对字符偏移（不含终止字符，半开区间） */
  to: number
  severity: DiagnosticSeverity
  /** 人读消息（中文，面向作者） */
  message: string
  /** 稳定错误码，供自动化 / i18n / 未来快速修复使用 */
  code: DiagnosticCode
}

export type DiagnosticCode =
  | 'unknown-container'
  | 'fence-length-wrong'
  | 'nested-misplaced'
  | 'unknown-variant'
  | 'unclosed-fence'
  | 'yaml-style-attr'
  | 'list-too-deep'
  | 'footer-cta-outlink'
  | ZhTypoCode

/**
 * footer-cta href 白名单：公众号正文里作者实测能跳得动的几类 URL。
 *   - `https://mp.weixin.qq.com/s/*`  同账号或同域历史文章
 *   - `weixin://dl/*`                 小程序协议（需公众号后台原生插卡，但 URL 本身合规）
 *   - `tel:*` / `mailto:*`            移动端系统协议
 *   - `#*`                            页内锚点
 * 其它（含普通 https 外链）公众号会降级为灰色不可点，作者多半会被坑。
 */
const FOOTER_CTA_HREF_ALLOW: readonly RegExp[] = [
  /^https:\/\/mp\.weixin\.qq\.com\/s\//i,
  /^weixin:\/\/dl\//i,
  /^tel:/i,
  /^mailto:/i,
  /^#/,
]

const VALID_CONTAINER_NAMES: ReadonlySet<string> = new Set(
  CONTAINER_VOCABULARY.map((s) => s.name),
)

// open 行典型形态：`::: name rest` 或 `:::: name rest`
// 捕获：group 1 = 冒号串（长度决定 fenceLength），group 2 = 名字（可选），group 3 = 名字之后的 rest
const OPEN_FENCE_RE = /^(:{3,})[ \t]*([A-Za-z][\w-]*)?[ \t]*(.*?)[ \t]*$/
// 纯闭合 fence：仅 `:::`（可能跟空白）
const CLOSE_FENCE_RE = /^(:{3,})[ \t]*$/
// 列表项：可选前导空白 + 标记（-/*/+ 或 digits.）+ 至少一个空白
// 捕获：group 1 = 前导空白，group 2 = 标记
const LIST_LINE_RE = /^([ \t]*)([-*+]|\d+\.)\s/

interface OpenFrame {
  line: number
  colons: number
  name: string
  openStart: number
  openEnd: number
}

/**
 * 扫描 markdown 源码，返回按 from 升序的诊断列表。
 *
 * 不抛异常：任何解析失败走 Diagnostic 返回（severity=error）。
 * 不改源码，不做 side-effect；可在 debounce 后随意调用。
 */
export function diagnose(source: string): Diagnostic[] {
  const diagnostics: Diagnostic[] = []
  const lines = source.split('\n')
  const stack: OpenFrame[] = []

  // 预计算每行起始偏移（含该行首字符位置）
  const lineOffsets = new Array<number>(lines.length)
  let cursor = 0
  for (let i = 0; i < lines.length; i++) {
    lineOffsets[i] = cursor
    cursor += lines[i].length + 1 // +1 for '\n' joiner
  }

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx]
    const lineStart = lineOffsets[lineIdx]
    const lineEnd = lineStart + line.length

    // ── 0. 列表嵌套过深（commonmark 默认 2 空格一级，≥ 4 空格 ≈ 第三层及更深）──
    const listHit = LIST_LINE_RE.exec(line)
    if (listHit) {
      let indent = 0
      for (const ch of listHit[1]) indent += ch === '\t' ? 4 : 1
      if (indent >= 4) {
        const markerStart = lineStart + listHit[1].length
        const markerEnd = markerStart + listHit[2].length
        diagnostics.push({
          from: markerStart,
          to: markerEnd,
          severity: 'warning',
          code: 'list-too-deep',
          message:
            `列表嵌套 ≥ 3 层——公众号渲染时会被扁平化为带"${'\u00b7'}"前缀的段落，` +
            `建议改为两级以内。`,
        })
      }
    }

    // 先判纯闭合（不含名字才算 close）
    const closeMatch = CLOSE_FENCE_RE.exec(line)
    if (closeMatch) {
      // 闭合要求栈非空且 colons 匹配栈顶
      const colons = closeMatch[1].length
      if (stack.length === 0) {
        // 孤立闭合 fence 先宽容——多余的 ::: 不致塌版，作者常见误写
        continue
      }
      // 从栈顶寻找长度匹配的 frame（允许跳过"内层还没配对"的框——按常规嵌套，
      // 如果外层 :::: 没等到同长度闭合前就遇到更多 :::，交给 markdown-it 兜底，
      // 此处只关心最外层的关闭）
      const top = stack[stack.length - 1]
      if (top.colons === colons) {
        stack.pop()
      }
      continue
    }

    const openMatch = OPEN_FENCE_RE.exec(line)
    if (!openMatch) continue
    const colons = openMatch[1].length
    const name = openMatch[2] ?? ''
    const rest = openMatch[3] ?? ''
    if (!name) continue // 纯冒号无名，等同 close（上面已处理）或残行

    const colonStart = lineStart + line.indexOf(openMatch[1])
    const nameStartCol = line.indexOf(name, openMatch[1].length)
    const nameStart = lineStart + (nameStartCol >= 0 ? nameStartCol : openMatch[1].length + 1)
    const nameEnd = nameStart + name.length

    // ── 1. 未知容器名 ─────────────────────────────
    if (!VALID_CONTAINER_NAMES.has(name)) {
      const suggestion = closestContainerName(name)
      diagnostics.push({
        from: nameStart,
        to: nameEnd,
        severity: 'error',
        code: 'unknown-container',
        message: suggestion
          ? `未知容器 "${name}"——是否想写 "${suggestion}"？合法名见 docs/container-syntax.md 速查表。`
          : `未知容器 "${name}"。合法 fence 名见 docs/container-syntax.md 速查表。`,
      })
      // 把错的 frame 也压栈，让后续 close 能配对——避免一个拼错名连锁误报
      stack.push({ line: lineIdx, colons, name, openStart: colonStart, openEnd: lineEnd })
      continue
    }

    const spec = lookupContainerSpec(name)!

    // ── 2. fence 长度是否匹配 ContainerSpec 声明 ──
    if (spec.fenceLength !== colons) {
      const expected = ':'.repeat(spec.fenceLength)
      diagnostics.push({
        from: colonStart,
        to: colonStart + colons,
        severity: 'error',
        code: 'fence-length-wrong',
        message:
          `容器 "${name}" 应使用 ${spec.fenceLength} 个冒号（"${expected}"）；当前是 ${colons} 个。` +
          (name === 'compare'
            ? ' compare 外层必须 ::::，内层 pros/cons 才能用 :::。'
            : spec.parent
            ? ` 作为 ${spec.parent} 的子容器，必须用 :::。`
            : ''),
      })
    }

    // ── 3. pros/cons 是否嵌在 compare 内 ──────────
    if (spec.parent) {
      const parentFrame = stack[stack.length - 1]
      if (!parentFrame || parentFrame.name !== spec.parent) {
        diagnostics.push({
          from: nameStart,
          to: nameEnd,
          severity: 'error',
          code: 'nested-misplaced',
          message: `"${name}" 必须嵌在 ":::: ${spec.parent}" 容器内；当前在外层孤立使用。`,
        })
      }
    }

    // ── 4. 未知 variant 值 ──────────────────────
    const variantValue = pickVariantFromRest(rest)
    if (variantValue && spec.variantKind) {
      const allowed = VARIANT_IDS[spec.variantKind as keyof typeof VARIANT_IDS] as
        | readonly string[]
        | undefined
      if (allowed && !allowed.includes(variantValue.value)) {
        const variantAbsStart = lineStart + line.indexOf('variant=') + 'variant='.length
        diagnostics.push({
          from: variantAbsStart,
          to: variantAbsStart + variantValue.value.length,
          severity: 'warning',
          code: 'unknown-variant',
          message:
            `未知 variant "${variantValue.value}" —— "${name}" (${spec.variantKind}) 合法取值：` +
            allowed.join(' / '),
        })
      }
    } else if (variantValue && !spec.variantKind) {
      diagnostics.push({
        from: lineStart + line.indexOf('variant='),
        to: lineStart + line.indexOf('variant=') + 'variant='.length + variantValue.value.length,
        severity: 'info',
        code: 'unknown-variant',
        message: `容器 "${name}" 不支持 variant 覆盖（无 variantKind），该声明会被忽略。`,
      })
    }

    // ── 4.5 footer-cta href 白名单校验 ──────────
    if (name === 'footer-cta') {
      const hrefHit = pickHrefFromRest(rest)
      if (hrefHit && !FOOTER_CTA_HREF_ALLOW.some((re) => re.test(hrefHit.value))) {
        // 把相对定位转为 line 里 "href=" 首次出现处
        const hrefCol = line.indexOf('href=', line.indexOf(name) + name.length)
        const valueAbsStart = lineStart + hrefCol + 'href='.length
        diagnostics.push({
          from: valueAbsStart,
          to: valueAbsStart + (hrefHit.rawLen ?? hrefHit.value.length),
          severity: 'warning',
          code: 'footer-cta-outlink',
          message:
            `footer-cta 的 "${hrefHit.value}" 在公众号正文里不可直接点击——` +
            `建议改为 mp.weixin.qq.com/s/* 同域文章链 / weixin://dl/* 小程序协议 / tel: / mailto: / 页内锚点 #；` +
            `或把该 URL 放到公众号后台"阅读原文"位置。`,
        })
      }
    }

    // ── 5. YAML 风格 `key: v` 写在 open 行 ─────────
    // 只匹配**不在引号内**的冒号；简化起见，扫 rest 里首个 ` key: ` 式样（key 后紧跟冒号再跟空白）。
    const yamlHit = /(?:^|\s)([a-zA-Z_][\w-]*):[ \t]/.exec(rest)
    if (yamlHit && !/=/.test(rest.slice(0, yamlHit.index + yamlHit[0].length))) {
      // 排除 `key=foo: text` 这种 title 里带冒号的情形（只在冒号之前没出现 = 才报）
      const hitCol = line.indexOf(yamlHit[1] + ':', line.indexOf(name) + name.length)
      if (hitCol >= 0) {
        const absStart = lineStart + hitCol
        diagnostics.push({
          from: absStart,
          to: absStart + yamlHit[1].length + 1,
          severity: 'warning',
          code: 'yaml-style-attr',
          message:
            `open 行的 "${yamlHit[1]}:" 看起来像 YAML；容器属性只接受 "key=value" 写法。` +
            ` 若是标题文字请忽略此告警。`,
        })
      }
    }

    stack.push({ line: lineIdx, colons, name, openStart: colonStart, openEnd: lineEnd })
  }

  // ── 6. 未闭合 fence（EOF 时栈非空） ─────────────
  for (const frame of stack) {
    diagnostics.push({
      from: frame.openStart,
      to: frame.openEnd,
      severity: 'error',
      code: 'unclosed-fence',
      message: `"${frame.name}" 容器未闭合——末尾缺少 "${':'.repeat(frame.colons)}" 行。`,
    })
  }

  // ── 7. 中文排版四规则（zhTypo） ────────────────
  for (const hit of scanZhTypo(source)) {
    diagnostics.push({
      from: hit.from,
      to: hit.to,
      severity: 'info', // 中文排版一律 info：不阻断作者发文，仅提示
      code: hit.code,
      message: ZH_TYPO_MESSAGE[hit.code](hit.original, hit.replacement),
    })
  }

  return diagnostics.sort((a, b) => a.from - b.from)
}

const ZH_TYPO_MESSAGE: Record<ZhTypoCode, (orig: string, rep: string) => string> = {
  'zh-ascii-spacing': (orig) =>
    `中英混排建议加空格："${orig}"——Toolbar"一键修复中文排版"可批量处理。`,
  'zh-halfwidth-punct': (orig, rep) =>
    `中文后请用全角标点："${orig}" → "${rep}"。`,
  'zh-straight-quote': (orig, rep) =>
    `含 CJK 引语建议用弯引号："${orig}" → "${rep}"。`,
  'zh-dash-ellipsis': (orig, rep) =>
    orig.startsWith('.')
      ? `中文省略号建议用 …… 代替 ${orig.length} 个英文句点。`
      : `中文破折号建议用 —— 代替两个半角连字符（${orig} → ${rep}）。`,
}

interface VariantHit {
  value: string
}

function pickVariantFromRest(rest: string): VariantHit | null {
  // 同 parseInfo：key=value | key="v" | key='v'
  const m = /(^|\s)variant=("([^"]*)"|'([^']*)'|(\S+))/.exec(rest)
  if (!m) return null
  return { value: m[3] ?? m[4] ?? m[5] ?? '' }
}

/**
 * 提取 open 行 rest 中的 href 值 + 其在源中的字符长度（含引号，用于精确打点下划线）。
 * 与 parseInfo 的正则对齐：裸值 / 双引号 / 单引号。
 */
function pickHrefFromRest(rest: string): { value: string; rawLen: number } | null {
  const m = /(^|\s)href=("([^"]*)"|'([^']*)'|(\S+))/.exec(rest)
  if (!m) return null
  const value = m[3] ?? m[4] ?? m[5] ?? ''
  return { value, rawLen: m[2].length }
}

/**
 * Damerau-Levenshtein 轻量版，只拿距离 ≤ 2 的最近邻——为"未知容器"提示修改候选。
 * 不追求编辑距离最优；阈值 2 能覆盖大多数拼错（note/notes, compare/compair,
 * section-title/sectiontitle）。
 */
function closestContainerName(input: string): string | null {
  let best: string | null = null
  let bestDist = 3
  for (const name of VALID_CONTAINER_NAMES) {
    const d = editDistance(input, name)
    if (d < bestDist) {
      bestDist = d
      best = name
    }
  }
  return best
}

function editDistance(a: string, b: string): number {
  if (a === b) return 0
  if (Math.abs(a.length - b.length) > 2) return 3
  const m = a.length
  const n = b.length
  const dp: number[] = new Array((n + 1) * 2)
  for (let j = 0; j <= n; j++) dp[j] = j
  for (let i = 1; i <= m; i++) {
    const row = (i & 1) * (n + 1)
    const prev = ((i - 1) & 1) * (n + 1)
    dp[row] = i
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      dp[row + j] = Math.min(dp[prev + j] + 1, dp[row + j - 1] + 1, dp[prev + j - 1] + cost)
    }
  }
  return dp[(m & 1) * (n + 1) + n]
}
