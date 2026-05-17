/**
 * pull-quote · giant-mark（装饰巨号 · default）
 *
 * 人格：人物特稿杂志的 pull-quote 母本。装饰巨号 SVG 引号统领，大字左对齐。
 * 视觉骨架：左侧 80×60 inline SVG 引号字符（path 描线，accent 色，stroke 2px），
 *   下方 18-20px 大字 line-height 1.8 左对齐。无边框无填充，留白与字号承担分量。
 * 与其它 variant 区别：唯一用"装饰引号字形"做主视，body 大字左对齐而非居中。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent } = mergeThumb(args ?? {})
  return svg(
    `<text x="10" y="34" font-size="32" font-weight="700" fill="${accent}">“</text>` +
      `<rect x="22" y="38" width="44" height="2.5" fill="#c0c6cf"/>` +
      `<rect x="22" y="46" width="40" height="2.5" fill="#c0c6cf"/>` +
      `<rect x="22" y="54" width="32" height="2.5" fill="#c0c6cf"/>`,
  )
}

const giantMark: VariantDef = {
  meta: {
    id: 'giant-mark',
    kind: 'pullQuote',
    name: '装饰巨号',
    description: '巨号 SVG 引号 + 大字左对齐（人物特稿母本）',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'pull-quote-giant-mark',
      name: '拉引 · 装饰巨号',
      description: '巨号 SVG 引号 + 大字左对齐',
      markdown:
        '::: pull-quote variant=giant-mark\n我们以为在阅读，其实只是在滑动。\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    // SVG 引号用 path 描线（而非系统字体字符）以避免不同设备字形差异。
    // 80×60 viewBox 容纳 stroke-width:2 的 ❝ 形态：上短下长的两节钩
    const quoteSvg =
      `<section style="line-height:0;margin-bottom:4px">` +
      `<svg width="64" height="48" viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg" ` +
      `fill="none" stroke="${c.accent}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">` +
      `<path d="M14 40 C14 22 22 14 32 12 M14 40 L14 50 L26 50 L26 36 L18 36 L18 40 Z"/>` +
      `<path d="M44 40 C44 22 52 14 62 12 M44 40 L44 50 L56 50 L56 36 L48 36 L48 40 Z"/>` +
      `</svg></section>`
    return {
      wrapperCSS: [
        'margin:28px 0',
        `padding:8px 4px 8px ${ctx.tokens.spacing.containerPadding}px`,
        'text-align:left',
      ].join(';'),
      titleCSS: [
        `color:${c.text}`,
        'font-size:19px',
        'line-height:1.8',
        'font-weight:600',
        'letter-spacing:0.3px',
        'text-align:left',
      ].join(';'),
      bodyCSS: [
        `color:${c.textMuted}`,
        'font-size:13px',
        'line-height:1.6',
        'margin-top:10px',
        'text-align:left',
      ].join(';'),
      svgSlot: quoteSvg,
    }
  },
}

export default giantMark
