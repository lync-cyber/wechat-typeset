/**
 * motif AST → SVG 字符串
 *
 * gallery 和 renderer 共用同一条渲染路径，消除"gallery 长这样、生产长那样"drift。
 * 输出的 SVG 省略 xmlns（调用方按需自行包裹）；属性用双引号，便于嵌入 HTML。
 */

import type {
  MotifPrimitive,
  MotifShape,
  MotifTemplate,
  SvgInlineStyle,
  ViewBox,
} from './types'

/**
 * 本地 escAttr / escText：为何不复用 pipeline/containers/types.ts 的同名函数？
 * —— 这里的 escAttr 接 `string | number`（motif 的 x / y / width / stroke-width 常是数值），
 * 直接 number → String 走短路。pipeline 侧只处理 HTML 字符串属性，类型窄化更严格。
 * 7 行复制换来的是跨模块零依赖与 number 短路，权衡后保持分离。
 */
function escAttr(v: string | number): string {
  if (typeof v === 'number') return String(v)
  return String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function escText(v: string): string {
  return v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

type AttrPair = readonly [string, string | number | undefined]

function renderAttrs(pairs: readonly AttrPair[]): string {
  const parts: string[] = []
  for (const [k, v] of pairs) {
    if (v === undefined || v === null || v === '') continue
    parts.push(`${k}="${escAttr(v)}"`)
  }
  return parts.length ? ' ' + parts.join(' ') : ''
}

export function renderPrimitive(p: MotifPrimitive): string {
  switch (p.type) {
    case 'rect':
      return `<rect${renderAttrs([
        ['x', p.x],
        ['y', p.y],
        ['width', p.w],
        ['height', p.h],
        ['rx', p.rx],
        ['ry', p.ry],
        ['fill', p.fill ?? 'none'],
        ['stroke', p.stroke],
        ['stroke-width', p.strokeWidth],
        ['opacity', p.opacity],
      ])}/>`
    case 'circle':
      return `<circle${renderAttrs([
        ['cx', p.cx],
        ['cy', p.cy],
        ['r', p.r],
        ['fill', p.fill ?? 'none'],
        ['stroke', p.stroke],
        ['stroke-width', p.strokeWidth],
        ['opacity', p.opacity],
      ])}/>`
    case 'path':
      return `<path${renderAttrs([
        ['d', p.d],
        ['fill', p.fill ?? 'none'],
        ['stroke', p.stroke],
        ['stroke-width', p.strokeWidth],
        ['stroke-linecap', p.strokeLinecap],
        ['stroke-linejoin', p.strokeLinejoin],
        ['stroke-dasharray', p.strokeDasharray],
        ['opacity', p.opacity],
      ])}/>`
    case 'line':
      return `<line${renderAttrs([
        ['x1', p.x1],
        ['y1', p.y1],
        ['x2', p.x2],
        ['y2', p.y2],
        ['stroke', p.stroke],
        ['stroke-width', p.strokeWidth],
        ['stroke-linecap', p.strokeLinecap],
        ['stroke-dasharray', p.strokeDasharray],
        ['opacity', p.opacity],
      ])}/>`
    case 'text': {
      const attrs = renderAttrs([
        ['x', p.x],
        ['y', p.y],
        ['font-size', p.fontSize],
        ['font-family', p.fontFamily],
        ['font-weight', p.fontWeight],
        ['fill', p.fill],
        ['text-anchor', p.textAnchor],
        ['dominant-baseline', p.dominantBaseline],
        ['letter-spacing', p.letterSpacing],
        ['opacity', p.opacity],
      ])
      return `<text${attrs}>${escText(p.content)}</text>`
    }
    case 'ellipse':
      return `<ellipse${renderAttrs([
        ['cx', p.cx],
        ['cy', p.cy],
        ['rx', p.rx],
        ['ry', p.ry],
        ['fill', p.fill ?? 'none'],
        ['stroke', p.stroke],
        ['stroke-width', p.strokeWidth],
        ['opacity', p.opacity],
      ])}/>`
    case 'group': {
      // 子 primitive 之间不加空格——原始 strip() 的 `<g>` 也是紧贴拼接
      // （见 life-aesthetic dividerDots：字符串 `+` 拼接，无空格）。
      const inner = p.children.map(renderPrimitive).join('')
      const attrs = renderAttrs([
        ['transform', p.transform],
        ['opacity', p.opacity],
      ])
      return `<g${attrs}>${inner}</g>`
    }
  }
}

function viewBoxAttr(vb: ViewBox): string {
  return `${vb[0]} ${vb[1]} ${vb[2]} ${vb[3]}`
}

/** `SvgInlineStyle` → 单行 CSS 声明字符串。 */
function inlineStyleToString(s: SvgInlineStyle | undefined): string | undefined {
  if (!s) return undefined
  const parts: string[] = []
  if (s.display) parts.push(`display:${s.display}`)
  if (s.verticalAlign) parts.push(`vertical-align:${s.verticalAlign}`)
  if (typeof s.marginRight === 'number') parts.push(`margin-right:${s.marginRight}px`)
  if (typeof s.marginLeft === 'number') parts.push(`margin-left:${s.marginLeft}px`)
  return parts.length ? parts.join(';') : undefined
}

/** `<svg>` 外层包装属性（不含 primitive 内容）。 */
export interface SvgWrapperAttrs {
  width?: number
  height?: number
  inlineStyle?: SvgInlineStyle
}

/**
 * 将 viewBox + primitives 渲染为 `<svg>...</svg>` 字符串。
 *
 * 始终输出 xmlns——WeChat 的 HTML→SVG 粘贴管道对 xmlns 有依赖，省略会被平台解析器判作
 * 非 SVG 并回退成纯文本。
 */
export function primitivesToSvg(
  viewBox: ViewBox,
  primitives: readonly MotifPrimitive[],
  wrapper: SvgWrapperAttrs = {},
): string {
  // primitive 之间的单个空格是刻意保留的：
  // 既有主题的 strip() 路径会把多行 SVG 塌缩成 `<svg> <p1/> <p2/> </svg>`
  // 这种带空格的单行。Phase 2 要求 migrated-spec 与旧字符串 byte-identical，
  // 所以这里也按同样分隔符输出。空数组 → `<svg></svg>`，不加伪造空格。
  const parts = primitives.map(renderPrimitive)
  const body = parts.length ? ' ' + parts.join(' ') + ' ' : ''
  const attrs = renderAttrs([
    ['viewBox', viewBoxAttr(viewBox)],
    ['width', wrapper.width],
    ['height', wrapper.height],
    ['xmlns', 'http://www.w3.org/2000/svg'],
    ['style', inlineStyleToString(wrapper.inlineStyle)],
  ])
  return `<svg${attrs}>${body}</svg>`
}

export function shapeToSvg(shape: MotifShape): string {
  return primitivesToSvg(shape.viewBox, shape.primitives, {
    width: shape.width,
    height: shape.height,
    inlineStyle: shape.inlineStyle,
  })
}

/**
 * 模板渲染：`{name}` 占位符替换后再产出 SVG。
 * 只替换 primitive 里的 string 字段（content / d / fill / stroke / dashes 等）——
 * 数值字段不参与替换（占位符必然是字符串量）。
 */
export function renderMotifTemplate(
  template: MotifTemplate,
  values: Record<string, string | number>,
): string {
  const substituted = template.primitives.map((p) => substituteInPrimitive(p, values))
  return primitivesToSvg(template.viewBox, substituted, {
    width: template.width,
    height: template.height,
    inlineStyle: template.inlineStyle,
  })
}

function substitutePlaceholders(s: string, values: Record<string, string | number>): string {
  return s.replace(/\{(\w+)\}/g, (_, name) => {
    const v = values[name]
    return v === undefined ? `{${name}}` : String(v)
  })
}

function substituteInPrimitive(p: MotifPrimitive, values: Record<string, string | number>): MotifPrimitive {
  // Replace every string-typed field's placeholders; recurse into group children.
  const replaced: Record<string, unknown> = { ...p }
  for (const k of Object.keys(replaced)) {
    const v = replaced[k]
    if (typeof v === 'string') replaced[k] = substitutePlaceholders(v, values)
    else if (k === 'children' && Array.isArray(v)) {
      replaced[k] = (v as MotifPrimitive[]).map((c) => substituteInPrimitive(c, values))
    }
  }
  return replaced as MotifPrimitive
}
