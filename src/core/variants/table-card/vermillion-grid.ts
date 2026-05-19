/**
 * table-card · vermillion-grid（朱角方格）
 *
 * 人格：宋本批注。全网格 1px 边框，header 行红底（primary）白字承载朱印感。
 * svgSlot 朱印降级：table-card 容器尚未消费 svgSlot，改由 header 行 primary 背景
 * + textInverse 字色传递朱印视觉。body 行小号字 + 全网格线。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="14" width="63" height="47" fill="#fff" stroke="${text}"/>` +
      `<rect x="6" y="14" width="63" height="12" fill="${accent}"/>` +
      `<path d="M27 14V61M48 14V61M6 26H69M6 43H69" stroke="${text}"/>` +
      `<g fill="#fff">` +
      `<rect x="10" y="18" width="14" height="3"/>` +
      `<rect x="31" y="18" width="13" height="3"/>` +
      `<rect x="52" y="18" width="13" height="3"/>` +
      `</g>` +
      `<g fill="${text}">` +
      `<rect x="10" y="30" width="14" height="2"/>` +
      `<rect x="10" y="46" width="14" height="2"/>` +
      `</g>`,
  )
}

const vermillionGrid: VariantDef = {
  meta: {
    id: 'vermillion-grid',
    kind: 'tableCard',
    name: '朱角方格',
    description: '宋本批注风：header 红底白字朱印感 + 全网格线',
    experimental: true,
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'table-card-vermillion-grid',
      name: '表格 · 朱角方格',
      description: 'header 朱红底色 + 全网格，宋本批注风',
      markdown:
        ':::: table-card 典籍版本 variant=vermillion-grid\n' +
        '::: table-row header=true cells="版本 | 刊行年代 | 存世量"\n:::\n' +
        '::: table-row cells="北宋本 | 960–1127 | 稀见"\n:::\n' +
        '::: table-row cells="南宋本 | 1127–1279 | 较多"\n:::\n' +
        '::: table-row cells="明刻本 | 1368–1644 | 常见"\n:::\n' +
        '::::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    return {
      wrapperCSS: [
        `border:1px solid ${c.border}`,
        'border-radius:2px',
        'overflow:hidden',
        'margin:18px 0',
      ].join(';'),
    }
  },
}

export default vermillionGrid
