/**
 * compare · paired-shape（包豪斯圆方对照）
 *
 * 圆=描边 inline-block 徽章 vs 方=实心 inline-block 色块，通过 svgSlot 注入几何标识。
 * titleCSS='' 抑制默认 title 行，由 svgSlot 内联渲染标题。
 * 降级自设计稿 04·A：aspect-ratio 改为显式 width/height，clip-path 改为 border-radius:50%。
 */

import type { VariantDef, CompareRenderArgs } from '../_core'
import { escText } from '../../pipeline/containers/_shared/escape'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="16" width="29" height="45" rx="2" fill="none" stroke="#c0c6cf"/>` +
      `<rect x="40" y="16" width="29" height="45" rx="2" fill="none" stroke="#c0c6cf"/>` +
      `<circle cx="21" cy="30" r="9" fill="none" stroke="${accent}" stroke-width="2"/>` +
      `<rect x="49" y="23" width="12" height="12" fill="${accent}"/>` +
      `<rect x="13" y="46" width="14" height="2" fill="${text}"/>` +
      `<rect x="47" y="46" width="14" height="2" fill="${text}"/>`,
  )
}

const pairedShape: VariantDef<CompareRenderArgs> = {
  meta: {
    id: 'paired-shape',
    kind: 'compare',
    name: '圆方几何对照',
    description: '包豪斯：圆环描边 vs 实心方块，几何符号作视觉代号',
    experimental: true,
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'cmp-paired-shape',
      name: '圆方几何对照',
      description: '圆=描边/方=实心，包豪斯几何对比风',
      markdown:
        ':::: compare variant=paired-shape\n' +
        '::: pros CIRCLE\n有机、循环、无起点终点的运动。\n:::\n' +
        '::: cons SQUARE\n秩序、稳定、以角定界的结构。\n:::\n' +
        '::::\n',
    },
    {
      presetId: 'cmp-paired-shape-alt',
      name: '圆方代号对比',
      description: '适合对立概念的几何隐喻',
      markdown:
        ':::: compare variant=paired-shape\n' +
        '::: pros 感性\n流动、直觉、开放边界。\n:::\n' +
        '::: cons 理性\n逻辑、归纳、封闭系统。\n:::\n' +
        '::::\n',
    },
  ],
  render: (ctx, { slot }) => {
    const c = ctx.tokens.colors
    if (slot === 'wrapper') {
      return {
        wrapperCSS:
          `display:table;width:100%;table-layout:fixed;` +
          `border-spacing:14px 0;border-collapse:separate;margin:16px 0`,
      }
    }
    const title = (ctx.info ?? '').trim()
    const isCircle = slot === 'pros'
    const badge = isCircle
      ? `<span style="display:inline-block;width:22px;height:22px;border-radius:50%;` +
        `border:2px solid ${c.accent};vertical-align:middle;margin-right:8px"></span>`
      : `<span style="display:inline-block;width:22px;height:22px;` +
        `background-color:${c.accent};vertical-align:middle;margin-right:8px"></span>`
    const titleEl = title
      ? `<section style="font-size:13px;font-weight:700;color:${c.text};` +
        `margin-bottom:8px;line-height:1.4">${badge}${escText(title)}</section>`
      : badge
    return {
      wrapperCSS:
        `display:table-cell;vertical-align:top;width:50%;box-sizing:border-box;` +
        `padding:14px;background-color:transparent`,
      titleCSS: '',
      svgSlot: titleEl,
    }
  },
}

export default pairedShape
