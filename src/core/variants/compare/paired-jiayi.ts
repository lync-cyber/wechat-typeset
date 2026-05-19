/**
 * compare · paired-jiayi（宋本批注甲乙）
 *
 * 实心色块（甲）vs 描边色块（乙）：两栏 table-cell，primary 作双重语义角色。
 */

import type { VariantDef, CompareRenderArgs } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="16" width="29" height="45" rx="2" fill="${accent}"/>` +
      `<rect x="40" y="16" width="29" height="45" rx="2" fill="none" stroke="${accent}" stroke-width="1.5"/>` +
      `<rect x="12" y="26" width="14" height="2" fill="#fff"/>` +
      `<rect x="12" y="33" width="18" height="2" fill="#fff"/>` +
      `<rect x="12" y="40" width="12" height="2" fill="#fff"/>` +
      `<rect x="46" y="26" width="14" height="2" fill="${accent}"/>` +
      `<rect x="46" y="33" width="18" height="2" fill="${accent}"/>` +
      `<rect x="46" y="40" width="12" height="2" fill="${accent}"/>`,
  )
}

const pairedJiayi: VariantDef<CompareRenderArgs> = {
  meta: {
    id: 'paired-jiayi',
    kind: 'compare',
    name: '甲乙朱字批注',
    description: '实心色块（甲）vs 描边（乙），宋本批注感',
    experimental: true,
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'cmp-paired-jiayi',
      name: '甲乙朱字批注',
      description: '实心甲栏 vs 描边乙栏，适合两种立场并列',
      markdown:
        ':::: compare variant=paired-jiayi\n' +
        '::: pros 甲\n- 要点 1\n- 要点 2\n:::\n' +
        '::: cons 乙\n- 要点 1\n- 要点 2\n:::\n' +
        '::::\n',
    },
    {
      presetId: 'cmp-paired-jiayi-rich',
      name: '甲乙并列说明',
      description: '适合原文 / 注疏、正论 / 驳论并列',
      markdown:
        ':::: compare variant=paired-jiayi\n' +
        '::: pros 甲方\n持论：一段陈述。\n:::\n' +
        '::: cons 乙方\n驳论：一段陈述。\n:::\n' +
        '::::\n',
    },
  ],
  render: (ctx, { slot }) => {
    const c = ctx.tokens.colors
    if (slot === 'wrapper') {
      return {
        wrapperCSS:
          `display:table;width:100%;table-layout:fixed;` +
          `border-spacing:10px 0;border-collapse:separate;margin:16px 0;` +
          `padding:14px;background-color:${c.bg}`,
      }
    }
    if (slot === 'pros') {
      return {
        wrapperCSS:
          `display:table-cell;vertical-align:top;width:50%;box-sizing:border-box;` +
          `padding:14px;background-color:${c.primary};border-radius:0`,
        titleCSS: `font-size:14px;font-weight:700;color:${c.textInverse};margin-bottom:8px`,
      }
    }
    return {
      wrapperCSS:
        `display:table-cell;vertical-align:top;width:50%;box-sizing:border-box;` +
        `padding:14px;background-color:transparent;` +
        `border:1.5px solid ${c.primary};border-radius:0`,
      titleCSS: `font-size:14px;font-weight:700;color:${c.primary};margin-bottom:8px`,
    }
  },
}

export default pairedJiayi
