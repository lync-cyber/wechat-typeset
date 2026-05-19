/**
 * compare · axis-diagram（包豪斯轴线图）
 *
 * svgSlot 注入水平轴线 SVG（实线 + 中点 accent 圆 + 左右端标题）+ 下方双栏正文。
 * titleCSS='' 抑制默认 title，轴线图自承担"标题区"语意。
 * 适合"现代主义 vs 后现代主义"这类对立位置的概念对比。
 */

import type { VariantDef, CompareRenderArgs } from '../_core'
import { escText } from '../../pipeline/containers/_shared/escape'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<line x1="8" y1="24" x2="67" y2="24" stroke="${text}" stroke-width="1.5"/>` +
      `<circle cx="37" cy="24" r="4" fill="${accent}"/>` +
      `<rect x="8" y="30" width="24" height="2" fill="${text}"/>` +
      `<rect x="43" y="30" width="24" height="2" fill="${text}"/>` +
      `<rect x="8" y="42" width="28" height="2" fill="#c0c6cf"/>` +
      `<rect x="8" y="48" width="22" height="2" fill="#c0c6cf"/>` +
      `<rect x="43" y="42" width="26" height="2" fill="#c0c6cf"/>` +
      `<rect x="43" y="48" width="20" height="2" fill="#c0c6cf"/>`,
  )
}

const axisDiagram: VariantDef<CompareRenderArgs> = {
  meta: {
    id: 'axis-diagram',
    kind: 'compare',
    name: '轴线对立图',
    description: '水平轴 SVG + 左右对立标签，包豪斯风格概念对比',
    experimental: true,
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'cmp-axis-diagram',
      name: '轴线对立图',
      description: '适合两端对立的概念：现代主义 vs 后现代主义',
      markdown:
        ':::: compare variant=axis-diagram\n' +
        '::: pros 现代主义\n形式服从功能；理性秩序；以少胜多。\n:::\n' +
        '::: cons 后现代主义\n形式即内容；反讽引用；以多为多。\n:::\n' +
        '::::\n',
    },
    {
      presetId: 'cmp-axis-diagram-alt',
      name: '轴线对比（哲学/观念）',
      description: '任意两端对立概念的轴线可视化',
      markdown:
        ':::: compare variant=axis-diagram\n' +
        '::: pros 个体\n私人记忆、主观经验、不可通约的感受。\n:::\n' +
        '::: cons 集体\n共同历史、公共叙事、可共享的符号系统。\n:::\n' +
        '::::\n',
    },
  ],
  render: (ctx, { slot }) => {
    const c = ctx.tokens.colors
    if (slot === 'wrapper') {
      return {
        wrapperCSS: `margin:16px 0`,
      }
    }
    const title = (ctx.info ?? '').trim()
    const isLeft = slot === 'pros'

    // 轴线 SVG 仅在 pros（左）slot 注入，cons 不重复注入
    const axisEl = isLeft
      ? `<svg viewBox="0 0 320 40" width="100%" style="display:block;margin-bottom:10px" ` +
        `xmlns="http://www.w3.org/2000/svg">` +
        `<line x1="0" y1="20" x2="320" y2="20" stroke="${c.text}" stroke-width="2"/>` +
        `<circle cx="160" cy="20" r="5" fill="${c.accent}"/>` +
        `</svg>`
      : ''

    const titleEl = title
      ? `<section style="font-size:13px;font-weight:700;color:${c.text};` +
        `margin-bottom:6px;text-align:${isLeft ? 'left' : 'right'}">${escText(title)}</section>`
      : ''

    return {
      wrapperCSS:
        `display:inline-block;width:50%;box-sizing:border-box;vertical-align:top;` +
        `padding:${isLeft ? '0 10px 0 0' : '0 0 0 10px'}`,
      titleCSS: '',
      svgSlot: axisEl + titleEl,
    }
  },
}

export default axisDiagram
