/**
 * 几何 diff：baseline IR （从设计稿提取） vs actual IRBox （从 variant render 输出解析）。
 *
 * 输出形态：`GeometryDiff[]`，每条带 prop / baseline / actual / severity / hint。
 *
 *   - severity: 'error' = 几何根本错（width 差 ≥ 4px、display 完全不一致）
 *   - severity: 'warning' = 容差边缘 / 颜色字面对不上但 token 一致
 *   - severity: 'info' = 设计稿用了被禁的 modern CSS（flex/grid），实现侧应当走 table 降级
 *
 * 不对设计稿 baseline 做"修正"——baseline 里的 `display:flex` 会触发一条 info 提示
 * "实现侧应改 display:table"，而不是悄悄改 baseline。让 LLM / 开发者看到完整链路。
 */

import type { IRBox } from './types'

export type GeometryDiffSeverity = 'error' | 'warning' | 'info'

export interface GeometryDiff {
  /** 'wrapper' | 'slot[0]' | 'slot[1].badge' 等定位字符串。 */
  path: string
  /** 属性名（驼峰，与 IRBox 字段一致）。 */
  prop: string
  baseline: string | null
  actual: string | null
  severity: GeometryDiffSeverity
  hint?: string
}

/** length 字符串解析为像素数（支持 'NNpx' 与裸 'NN'）。其他（'%' / 'em' / 'auto'）返回 null。 */
function lenPx(v: string | undefined | null): number | null {
  if (!v) return null
  const m = String(v).trim().match(/^(-?\d+(?:\.\d+)?)(px)?$/i)
  return m ? Number.parseFloat(m[1]) : null
}

/** 字面色归一化（小写 + 去空格）—— diff 时仅严格比 literal，不比 tokenSuggestion。 */
function normColor(v: string | undefined | null): string | null {
  if (!v) return null
  return String(v).trim().toLowerCase()
}

const LENGTH_TOLERANCE_PX = 2
const LINE_HEIGHT_TOLERANCE = 0.1

/**
 * baseline vs actual 比对单个 IRBox。path 用于在嵌套结构里报错时定位（如 'slot[0]'）。
 *
 * 比对策略：
 *   - display 严格相等（modern CSS 在设计稿 / 兼容子集在 actual 触发 info）
 *   - 长度字段（width/padding/...）按像素 + 容差 ±2px
 *   - lineHeight 按数值 ±0.1
 *   - 颜色严格 literal 字面相等
 *   - 其它字符串字段严格相等
 *   - actual 缺字段而 baseline 有 → error（漏写）
 *   - baseline 缺字段而 actual 有 → info（多写，可能没必要但不致命）
 */
export function compareGeometry(
  baseline: IRBox,
  actual: IRBox,
  path: string = 'wrapper',
): GeometryDiff[] {
  const diffs: GeometryDiff[] = []
  const baseDisplay = baseline.display ?? null
  const actDisplay = actual.display ?? null
  if (baseDisplay !== actDisplay) {
    const isModernBaseline = baseDisplay === 'flex' || baseDisplay === 'grid' || baseDisplay === 'inline-flex' || baseDisplay === 'inline-grid'
    const isWxFallback = actDisplay === 'table' || actDisplay === 'table-cell' || actDisplay === 'block' || actDisplay === 'inline-block'
    if (isModernBaseline && isWxFallback) {
      diffs.push({
        path,
        prop: 'display',
        baseline: baseDisplay,
        actual: actDisplay,
        severity: 'info',
        hint: `设计稿 modern CSS '${baseDisplay}' 已按子集 '${actDisplay}' 降级；几何由 ${actDisplay === 'table' ? 'table-layout/border-spacing/cell width' : 'inline-block + width'} 锁住，请配套校对`,
      })
    } else if (baseDisplay === null && isWxFallback) {
      // 设计稿 slot 没显式声明 display（默认 div=block，由父 flex/grid 自动布局），
      // 实现侧必须显式声明 display:table-cell/inline-block 才能承接降级——属于设计预期。
      diffs.push({
        path,
        prop: 'display',
        baseline: null,
        actual: actDisplay,
        severity: 'info',
        hint: `设计稿父级 flex/grid 自动布局；actual 走子集需显式 '${actDisplay}'`,
      })
    } else if (isModernBaseline && actDisplay === null) {
      // 设计稿 wrapper 用 flex/grid 完成"居中 / 双栏"，实现侧把这个逻辑挪进 slot 内
      // （如 svgSlot 里 inline-block 居中），wrapper 走默认 block。layout 在 slot 层兑现，
      // wrapper 层不再需要 display。属于实现侧的合法重构（不是几何错）。
      diffs.push({
        path,
        prop: 'display',
        baseline: baseDisplay,
        actual: null,
        severity: 'info',
        hint: `设计稿用 '${baseDisplay}' 在 wrapper 层布局；actual 把该职责下沉到 slot/svgSlot（wrapper 走默认 block）`,
      })
    } else {
      diffs.push({
        path,
        prop: 'display',
        baseline: baseDisplay,
        actual: actDisplay,
        severity: 'error',
        hint: 'display 不一致，几何不可比',
      })
    }
  }

  // 长度字段：容差 ±2px
  const LENGTH_PROPS: Array<keyof IRBox> = [
    'width',
    'height',
    'minWidth',
    'maxWidth',
  ]
  for (const prop of LENGTH_PROPS) {
    const b = baseline[prop] as string | undefined
    const a = actual[prop] as string | undefined
    if (b === a) continue
    const bPx = lenPx(b)
    const aPx = lenPx(a)
    if (bPx !== null && aPx !== null) {
      if (Math.abs(bPx - aPx) > LENGTH_TOLERANCE_PX) {
        diffs.push({
          path,
          prop,
          baseline: b ?? null,
          actual: a ?? null,
          severity: 'error',
          hint: `${prop} 差 ${Math.abs(bPx - aPx)}px（容差 ${LENGTH_TOLERANCE_PX}px）`,
        })
      }
      continue
    }
    if (b && !a) {
      diffs.push({
        path,
        prop,
        baseline: b,
        actual: null,
        severity: 'error',
        hint: `actual 未声明 ${prop}`,
      })
    } else if (!b && a) {
      diffs.push({
        path,
        prop,
        baseline: null,
        actual: a,
        severity: 'info',
        hint: `actual 额外声明了 ${prop}（baseline 未定义）`,
      })
    } else if (b !== a) {
      diffs.push({
        path,
        prop,
        baseline: b ?? null,
        actual: a ?? null,
        severity: 'warning',
        hint: '值格式不一致（一方为像素一方为百分比等）',
      })
    }
  }

  // 字符串字段：直接相等
  const STRING_PROPS: Array<keyof IRBox> = [
    'padding',
    'margin',
    'border',
    'borderTop',
    'borderRight',
    'borderBottom',
    'borderLeft',
    'borderRadius',
    'fontSize',
    'fontWeight',
    'fontStyle',
    'letterSpacing',
    'textAlign',
    'textDecoration',
    'textTransform',
    'writingMode',
    'boxSizing',
    'tableLayout',
  ]
  for (const prop of STRING_PROPS) {
    const b = baseline[prop] as string | undefined
    const a = actual[prop] as string | undefined
    if (b === a) continue
    if (b && !a) {
      diffs.push({
        path,
        prop,
        baseline: b,
        actual: null,
        severity: 'error',
        hint: `actual 漏写 ${prop}`,
      })
    } else if (!b && a) {
      diffs.push({
        path,
        prop,
        baseline: null,
        actual: a,
        severity: 'info',
      })
    } else {
      diffs.push({
        path,
        prop,
        baseline: b ?? null,
        actual: a ?? null,
        severity: 'warning',
      })
    }
  }

  // line-height：数值容差
  if (baseline.lineHeight !== actual.lineHeight) {
    const b = baseline.lineHeight
    const a = actual.lineHeight
    const bN = b ? Number.parseFloat(String(b)) : NaN
    const aN = a ? Number.parseFloat(String(a)) : NaN
    if (Number.isFinite(bN) && Number.isFinite(aN)) {
      if (Math.abs(bN - aN) > LINE_HEIGHT_TOLERANCE) {
        diffs.push({
          path,
          prop: 'lineHeight',
          baseline: String(b ?? null),
          actual: String(a ?? null),
          severity: 'error',
          hint: `line-height 差 ${Math.abs(bN - aN).toFixed(2)}（容差 ${LINE_HEIGHT_TOLERANCE}）`,
        })
      }
    } else if (b && !a) {
      diffs.push({
        path,
        prop: 'lineHeight',
        baseline: String(b),
        actual: null,
        severity: 'error',
        hint: 'actual 未声明 line-height（在 writing-mode 竖排或大字号场景必须显式声明）',
      })
    } else if (!b && a) {
      diffs.push({ path, prop: 'lineHeight', baseline: null, actual: String(a), severity: 'info' })
    }
  }

  // 颜色（literal 比对）
  //
  // baseline.tokenSuggestion 存在 → 设计稿字面已知应映射到某 token；actual 可能取了
  // 同一主题对该 token 的字面投影，字面差是 token 化的正常结果，降级为 info。
  // baseline.tokenSuggestion 为 null → 设计稿字面未登记到 token 字典，差异是真问题，
  // 保 warning（提示主题作者补字典或检查色值）。
  const bBg = normColor(baseline.background?.literal)
  const aBg = normColor(actual.background?.literal)
  if (bBg && aBg && bBg !== aBg) {
    const tokenized = !!baseline.background?.tokenSuggestion
    diffs.push({
      path,
      prop: 'background',
      baseline: bBg,
      actual: aBg,
      severity: tokenized ? 'info' : 'warning',
      hint: tokenized
        ? `字面差由主题 token 投影产生（${baseline.background?.tokenSuggestion}）`
        : '背景色字面不一致且 baseline 未登记到 token 字典；检查色值或补字典',
    })
  }
  const bColor = normColor(baseline.color?.literal)
  const aColor = normColor(actual.color?.literal)
  if (bColor && aColor && bColor !== aColor) {
    const tokenized = !!baseline.color?.tokenSuggestion
    diffs.push({
      path,
      prop: 'color',
      baseline: bColor,
      actual: aColor,
      severity: tokenized ? 'info' : 'warning',
      hint: tokenized
        ? `字面差由主题 token 投影产生（${baseline.color?.tokenSuggestion}）`
        : '文字色字面不一致且 baseline 未登记到 token 字典；检查色值或补字典',
    })
  }

  return diffs
}
