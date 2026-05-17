/**
 * pull-quote · giant-mark（装饰巨号 · default）
 *
 * 人格：人物特稿杂志的 pull-quote 母本。装饰巨号 SVG 引号统领，大字左对齐。
 * 视觉骨架：左侧 80×60 inline SVG 引号字符（path 描线，accent 色，stroke 2px），
 *   下方 18-20px 大字 line-height 1.8 左对齐。无边框无填充，留白与字号承担分量。
 * 与其它 variant 区别：唯一用"装饰引号字形"做主视，body 大字左对齐而非居中。
 *
 * tokens 暴露：title/body 的颜色与字号——这四个字段是用户最常想调的"金句重音"控制点。
 * SVG 引号颜色不开放：stroke 是 SVG 属性而非 CSS 属性，var() 在 attr 上不生效；
 * 想换引号色得走 patch 档（直接覆盖 svgSlot），不是 L1 tokens 能解决的范围。
 */

import type { VariantDef, TokenSchema } from '../_core'
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

// tokenSchema：UI 与 render 共享单一事实来源。
// default 值必须与 render() 里 `var(--uv-<key>, <fallback>)` 的 fallback 一致。
// 颜色类的 default 是动态的（取自主题 tokens），用 'inherit' 占位让 UI 显示"跟主题"，
// 实际渲染由 render() 里的 fallback 段（具体颜色字符串）承担。
export const tokenSchema: TokenSchema = {
  'quote-color': {
    type: 'color',
    label: '引文颜色',
    default: 'inherit',
    hint: '默认跟随主题正文色',
  },
  'quote-size': {
    type: 'size',
    label: '引文字号',
    default: '19px',
  },
  'byline-color': {
    type: 'color',
    label: '副注颜色',
    default: 'inherit',
    hint: '默认跟随主题次要文字色',
  },
  'byline-size': {
    type: 'size',
    label: '副注字号',
    default: '13px',
  },
}

const giantMark: VariantDef = {
  meta: {
    id: 'giant-mark',
    kind: 'pullQuote',
    name: '装饰巨号',
    description: '巨号 SVG 引号 + 大字左对齐（人物特稿母本）',
  },
  thumbnail: thumb,
  tokenSchema,
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
        `color:var(--uv-quote-color, ${c.text})`,
        'font-size:var(--uv-quote-size, 19px)',
        'line-height:1.8',
        'font-weight:600',
        'letter-spacing:0.3px',
        'text-align:left',
      ].join(';'),
      bodyCSS: [
        `color:var(--uv-byline-color, ${c.textMuted})`,
        'font-size:var(--uv-byline-size, 13px)',
        'line-height:1.6',
        'margin-top:10px',
        'text-align:left',
      ].join(';'),
      svgSlot: quoteSvg,
    }
  },
}

export default giantMark
