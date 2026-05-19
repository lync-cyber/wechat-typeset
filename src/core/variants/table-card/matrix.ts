/**
 * table-card · matrix（包豪斯热力矩阵）
 *
 * 人格：数据可视化 / 包豪斯风。行列标签 + 固定尺寸色块网格。
 * 热力梯度简化：所有数值 cells 统一用 primary 底色 + textInverse 字，不做数值→深浅映射。
 * 降级约定（BC-4）：不用 aspect-ratio:1 / display:grid；改用 display:table + width/height 显式像素。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="18" y="14" width="12" height="12" fill="${soft}" stroke="${text}" stroke-width="0.5"/>` +
      `<rect x="30" y="14" width="12" height="12" fill="${soft}" stroke="${text}" stroke-width="0.5"/>` +
      `<rect x="42" y="14" width="12" height="12" fill="${soft}" stroke="${text}" stroke-width="0.5"/>` +
      `<rect x="54" y="14" width="12" height="12" fill="${soft}" stroke="${text}" stroke-width="0.5"/>` +
      `<rect x="18" y="26" width="12" height="12" fill="${accent}"/>` +
      `<rect x="30" y="26" width="12" height="12" fill="${accent}"/>` +
      `<rect x="42" y="26" width="12" height="12" fill="${accent}"/>` +
      `<rect x="54" y="26" width="12" height="12" fill="${accent}"/>` +
      `<rect x="18" y="38" width="12" height="12" fill="${accent}"/>` +
      `<rect x="30" y="38" width="12" height="12" fill="${accent}"/>` +
      `<rect x="42" y="38" width="12" height="12" fill="${accent}"/>` +
      `<rect x="54" y="38" width="12" height="12" fill="${accent}"/>` +
      `<rect x="18" y="50" width="12" height="12" fill="${accent}"/>` +
      `<rect x="30" y="50" width="12" height="12" fill="${accent}"/>` +
      `<rect x="42" y="50" width="12" height="12" fill="${accent}"/>` +
      `<rect x="54" y="50" width="12" height="12" fill="${accent}"/>`,
  )
}

const matrix: VariantDef = {
  meta: {
    id: 'matrix',
    kind: 'tableCard',
    name: '矩阵热力',
    description: '行列标签 + 色块矩阵，包豪斯网格风（数值简化为统一色块）',
    experimental: true,
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'table-card-matrix',
      name: '表格 · 矩阵热力',
      description: '包豪斯热力矩阵，行列标签 + 统一色块',
      markdown:
        ':::: table-card 矩阵评分 variant=matrix\n' +
        '::: table-row header=true cells=" | A | B | C"\n:::\n' +
        '::: table-row cells="高 | 9 | 7 | 5"\n:::\n' +
        '::: table-row cells="中 | 6 | 8 | 4"\n:::\n' +
        '::: table-row cells="低 | 3 | 4 | 6"\n:::\n' +
        '::::\n',
    },
  ],
  render: () => {
    return {
      wrapperCSS: 'margin:18px 0',
    }
  },
}

export default matrix
