/**
 * compare · paired-specimen（博物笔记标本卡）
 *
 * 两栏 table-cell + 列内 border-bottom 分割线：学术标本卡气质，斜体学名感。
 * titleCSS 走 textMuted 小号字 + letter-spacing + uppercase 模拟 "SPEC. A" 标签。
 */

import type { VariantDef, CompareRenderArgs } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { text, accent } = mergeThumb(args ?? {})
  return svg(
    `<line x1="6" y1="14" x2="6" y2="62" stroke="${text}" stroke-width="0.5"/>` +
      `<line x1="40" y1="14" x2="40" y2="62" stroke="${text}" stroke-width="0.5"/>` +
      `<rect x="8" y="14" width="28" height="2" fill="${accent}"/>` +
      `<rect x="42" y="14" width="28" height="2" fill="${accent}"/>` +
      `<rect x="10" y="20" width="22" height="2" fill="${text}"/>` +
      `<rect x="44" y="20" width="22" height="2" fill="${text}"/>` +
      `<rect x="10" y="30" width="18" height="2" fill="#c0c6cf"/>` +
      `<rect x="10" y="36" width="20" height="2" fill="#c0c6cf"/>` +
      `<rect x="44" y="30" width="16" height="2" fill="#c0c6cf"/>` +
      `<rect x="44" y="36" width="20" height="2" fill="#c0c6cf"/>`,
  )
}

const pairedSpecimen: VariantDef<CompareRenderArgs> = {
  meta: {
    id: 'paired-specimen',
    kind: 'compare',
    name: '标本卡对照',
    description: '博物笔记：双栏分割线 + 学术标本标签',
    experimental: true,
    experimentalSince: '2026-05-19',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'cmp-paired-specimen',
      name: '标本卡对照',
      description: '学术标本气质：SPEC. A / SPEC. B 标签 + 分割线',
      markdown:
        ':::: compare variant=paired-specimen\n' +
        '::: pros Spec. A\n*学名：Quercus robur*\n\n- 特征 1\n- 特征 2\n:::\n' +
        '::: cons Spec. B\n*学名：Quercus petraea*\n\n- 特征 1\n- 特征 2\n:::\n' +
        '::::\n',
    },
  ],
  render: (ctx, { slot }) => {
    const c = ctx.tokens.colors
    if (slot === 'wrapper') {
      return {
        wrapperCSS:
          `display:table;width:100%;table-layout:fixed;` +
          `border-spacing:14px 0;border-collapse:separate;margin:18px 0`,
      }
    }
    return {
      wrapperCSS:
        `display:table-cell;vertical-align:top;width:50%;box-sizing:border-box;padding:0`,
      titleCSS:
        `font-size:11px;font-weight:400;color:${c.textMuted};` +
        `letter-spacing:0.15em;text-transform:uppercase;` +
        `border-bottom:1px solid ${c.border};` +
        `margin-bottom:6px;padding-bottom:4px`,
    }
  },
}

export default pairedSpecimen
