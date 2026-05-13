/**
 * sectionTitle · cornered
 *
 * 左上角装饰 SVG（theme.assets.sectionCorner）+ 标题文字，不画底线。
 * 适合想"轻装修"的主题：装饰只出现在标题行内。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent } = mergeThumb(args ?? {})
  return svg(
    `<path d="M8,8 L26,8 L26,14 L14,14 L14,28 L8,28 Z" fill="${accent}"/>` +
      `<rect x="30" y="16" width="35" height="5" fill="${accent}"/>` +
      `<rect x="10" y="38" width="55" height="2" fill="#c0c6cf"/>` +
      `<rect x="10" y="48" width="48" height="2" fill="#c0c6cf"/>`,
  )
}

const cornered: VariantDef = {
  meta: {
    id: 'cornered',
    kind: 'sectionTitle',
    name: '左上角装饰',
    description: '只留角饰不画线，更克制',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'sec-cornered',
      name: '左上角装饰',
      description: '只留角饰不画线，更克制',
      markdown: '::: section-title 第三章 variant=cornered\n:::\n',
    },
    {
      presetId: 'sec-cornered-long',
      name: '角饰 · 长标题',
      description: '标题长时更显角饰作用',
      markdown: '::: section-title 第四部分 · 组件库手册 variant=cornered\n:::\n',
    },
  ],
  render: (ctx) => ({
    wrapperCSS: `margin:24px 0 12px`,
    titleCSS: `font-weight:700;font-size:20px;color:${ctx.tokens.colors.text}`,
    svgSlot: ctx.assets.sectionCorner ?? '',
  }),
}

export default cornered
