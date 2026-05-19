/**
 * compare · measurement-table（测量数据对照）
 *
 * 纵向双行 block 模拟"对照表"：pros/cons 各占全宽一行，border-top 分割，
 * 标题固定 80px inline-block 作列标签，右侧正文 inline-block 跟排。
 * 降级自设计稿 03·B 四列 table-row 网格：compare slot 只有 pros/cons 两路，
 * 无法表达四列，采用纵向双行布局模拟"测量数据并列"语意。
 */

import type { VariantDef, CompareRenderArgs } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="16" width="63" height="1" fill="${text}"/>` +
      `<rect x="6" y="16" width="18" height="16" fill="none"/>` +
      `<rect x="10" y="22" width="10" height="2" fill="${accent}"/>` +
      `<rect x="28" y="22" width="36" height="2" fill="#c0c6cf"/>` +
      `<rect x="6" y="34" width="63" height="1" fill="#c0c6cf"/>` +
      `<rect x="10" y="40" width="10" height="2" fill="${text}"/>` +
      `<rect x="28" y="40" width="36" height="2" fill="#c0c6cf"/>` +
      `<rect x="6" y="50" width="63" height="1" fill="#c0c6cf"/>`,
  )
}

const measurementTable: VariantDef<CompareRenderArgs> = {
  meta: {
    id: 'measurement-table',
    kind: 'compare',
    name: '测量数据对照',
    description: '纵向双行 block，标签固定宽 + 数据跟排，数据并列感',
    experimental: true,
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'cmp-measurement-table',
      name: '测量数据对照',
      description: '两行数据对比，适合结构参数、规格对照',
      markdown:
        ':::: compare variant=measurement-table\n' +
        '::: pros 砖木结构\n承重墙体：370mm 实心砖，层高 3.2m，抗震 6 度。\n:::\n' +
        '::: cons 钢混结构\n框架柱：600×600mm，层高 3.6m，抗震 8 度。\n:::\n' +
        '::::\n',
    },
    {
      presetId: 'cmp-measurement-table-specs',
      name: '规格参数对比',
      description: '两项规格参数横向对照',
      markdown:
        ':::: compare variant=measurement-table\n' +
        '::: pros 方案 A\n材料：橡木实木；厚度：18mm；表面处理：哑光漆。\n:::\n' +
        '::: cons 方案 B\n材料：多层复合板；厚度：12mm；表面处理：UV 涂层。\n:::\n' +
        '::::\n',
    },
  ],
  render: (ctx, { slot }) => {
    const c = ctx.tokens.colors
    if (slot === 'wrapper') {
      return {
        wrapperCSS:
          `display:block;margin:16px 0;` +
          `border-top:1px solid ${c.border}`,
      }
    }
    const isFirst = slot === 'pros'
    return {
      wrapperCSS:
        `display:block;padding:8px 0;` +
        `border-bottom:1px solid ${c.border}`,
      titleCSS:
        `display:inline-block;width:80px;vertical-align:top;` +
        `font-size:11px;font-weight:600;color:${isFirst ? c.primary : c.textMuted};` +
        `letter-spacing:0.05em;line-height:1.6`,
    }
  },
}

export default measurementTable
