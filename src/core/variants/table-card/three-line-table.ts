/**
 * table-card · three-line-table（传统报刊三线表）
 *
 * 人格：编辑部 / 传统报刊。booktabs 三线骨架：顶 2px + header 后 1px + 底 2px 实线，
 * 无任何垂直线、无 body 行内分隔。header 行全大写 + letter-spacing + textMuted。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { text } = mergeThumb(args ?? {})
  return svg(
    `<path d="M6 14H69" stroke="${text}" stroke-width="2"/>` +
      `<path d="M6 62H69" stroke="${text}" stroke-width="2"/>` +
      `<path d="M6 26H69" stroke="${text}"/>` +
      `<g fill="${text}">` +
      `<rect x="10" y="18" width="12" height="2"/>` +
      `<rect x="32" y="18" width="14" height="2"/>` +
      `<rect x="54" y="18" width="11" height="2"/>` +
      `<rect x="10" y="32" width="18" height="2"/>` +
      `<rect x="10" y="42" width="15" height="2"/>` +
      `<rect x="10" y="52" width="20" height="2"/>` +
      `</g>`,
  )
}

const threeLineTable: VariantDef = {
  meta: {
    id: 'three-line-table',
    kind: 'tableCard',
    name: '三线表',
    description: '报刊 booktabs 三线：顶底 2px + header 后 1px，无垂直线',
    experimental: true,
    experimentalSince: '2026-05-19',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'table-card-three-line-table',
      name: '表格 · 三线表',
      description: '传统报刊三线，顶底粗线 + header 细分隔',
      markdown:
        ':::: table-card 研究结果 variant=three-line-table\n' +
        '::: table-row header=true cells="变量 | 均值 | 标准差"\n:::\n' +
        '::: table-row cells="A 组 | 3.42 | 0.81"\n:::\n' +
        '::: table-row cells="B 组 | 4.17 | 0.63"\n:::\n' +
        '::: table-row cells="C 组 | 2.98 | 1.05"\n:::\n' +
        '::::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    return {
      wrapperCSS: [
        `border-top:2px solid ${c.text}`,
        `border-bottom:2px solid ${c.text}`,
        'margin:18px 0',
      ].join(';'),
    }
  },
}

export default threeLineTable
