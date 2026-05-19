/**
 * table-card · index-table（三栏索引目录）
 *
 * 人格：编辑部 / 杂志目录。三栏：序号 | 标题 | 页码。body 行间 dashed 分隔，
 * 序号与页码走 monospace + textMuted，标题走正常 text 色。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { text } = mergeThumb(args ?? {})
  return svg(
    `<path d="M6 14H69" stroke="${text}"/>` +
      `<path d="M6 26H69" stroke="${text}"/>` +
      `<path d="M6 38H69" stroke="${text}" stroke-dasharray="3 2"/>` +
      `<path d="M6 50H69" stroke="${text}" stroke-dasharray="3 2"/>` +
      `<g fill="${text}">` +
      `<rect x="10" y="18" width="5" height="2"/>` +
      `<rect x="22" y="18" width="18" height="2"/>` +
      `<rect x="56" y="18" width="9" height="2"/>` +
      `<rect x="10" y="30" width="5" height="2"/>` +
      `<rect x="22" y="30" width="22" height="2"/>` +
      `<rect x="58" y="30" width="7" height="2"/>` +
      `<rect x="10" y="42" width="5" height="2"/>` +
      `<rect x="22" y="42" width="16" height="2"/>` +
      `<rect x="57" y="42" width="8" height="2"/>` +
      `</g>`,
  )
}

const indexTable: VariantDef = {
  meta: {
    id: 'index-table',
    kind: 'tableCard',
    name: '索引目录',
    description: '三栏索引：序号 / 标题 / 页码，dashed 行分隔',
    experimental: true,
    experimentalSince: '2026-05-19',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'table-card-index-table',
      name: '表格 · 索引目录',
      description: '序号 + 标题 + 页码，dashed 虚线行分隔',
      markdown:
        ':::: table-card 目录 variant=index-table\n' +
        '::: table-row header=true cells="No. | 文章 | 页"\n:::\n' +
        '::: table-row cells="01 | 编辑前言 | 3"\n:::\n' +
        '::: table-row cells="02 | 年度特别报告 | 12"\n:::\n' +
        '::: table-row cells="03 | 专题：城市记忆 | 34"\n:::\n' +
        '::::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    return {
      wrapperCSS: [
        `border-top:1px solid ${c.text}`,
        'margin:18px 0',
      ].join(';'),
    }
  },
}

export default indexTable
