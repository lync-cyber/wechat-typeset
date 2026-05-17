/**
 * table-card · zebra-rows（斑马底电子表格）
 *
 * 人格：电子表格——奇偶行底色斑马。无垂直边框，顶/底 hairline 分隔 header。
 * 视觉骨架：wrapper 顶 1px solid border-top / 底 1px solid border-bottom，无侧边；
 *   header 全大写 + letter-spacing + textMuted；body 奇数行 bgSoft / 偶数行 bg。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { soft, text } = mergeThumb(args ?? {})
  return svg(
    `<path d="M6 14H69M6 62H69M6 24H69" stroke="${text}"/>` +
      `<rect x="6" y="24" width="63" height="9" fill="${soft}"/>` +
      `<rect x="6" y="43" width="63" height="9" fill="${soft}"/>` +
      `<g fill="${text}">` +
      `<rect x="10" y="17" width="14" height="2"/>` +
      `<rect x="33" y="17" width="14" height="2"/>` +
      `<rect x="56" y="17" width="8" height="2"/>` +
      `<rect x="10" y="28" width="20" height="2"/>` +
      `<rect x="10" y="38" width="20" height="2"/>` +
      `<rect x="10" y="47" width="20" height="2"/>` +
      `<rect x="10" y="57" width="20" height="2"/>` +
      `</g>`,
  )
}

const zebraRows: VariantDef = {
  meta: {
    id: 'zebra-rows',
    kind: 'tableCard',
    name: '斑马表',
    description: '奇偶行底色 + 顶底 hairline，无垂直边框',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'table-card-zebra-rows',
      name: '表格 · 斑马',
      description: '奇偶行底色，电子表格风',
      markdown:
        ':::: table-card 销量统计 variant=zebra-rows\n' +
        '::: table-row header=true cells="月份 | 销量 | 同比"\n:::\n' +
        '::: table-row cells="1 月 | 1240 | +12%"\n:::\n' +
        '::: table-row cells="2 月 | 980 | -8%"\n:::\n' +
        '::: table-row cells="3 月 | 1520 | +24%"\n:::\n' +
        '::::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    return {
      wrapperCSS: [
        `border-top:1px solid ${c.text}`,
        `border-bottom:1px solid ${c.text}`,
        'margin:18px 0',
      ].join(';'),
    }
  },
}

export default zebraRows
