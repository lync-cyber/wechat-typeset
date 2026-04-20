/**
 * divider · glyph（单字符装饰）
 *
 * 居中放一个装饰字符（❦ / § / ◆），前后各一根短横线。适合文学/诗歌类栏目。
 * 默认字符 ❦（fleuron）；主题可通过 attrs.glyph 在 markdown 端临时覆盖。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent } = mergeThumb(args ?? {})
  return svg(
    `<line x1="6" y1="37" x2="28" y2="37" stroke="#c0c6cf"/>` +
      `<line x1="46" y1="37" x2="68" y2="37" stroke="#c0c6cf"/>` +
      `<text x="37" y="42" text-anchor="middle" font-size="11" fill="${accent}">&#10086;</text>`,
  )
}

const glyph: VariantDef = {
  meta: {
    id: 'glyph',
    kind: 'divider',
    name: '单字符装饰',
    description: '文学气质，换场分隔',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'dv-glyph-fleuron',
      name: 'Fleuron 花饰',
      description: '文学气质，换场分隔',
      markdown: '::: divider variant=glyph\n:::\n',
    },
    {
      presetId: 'dv-glyph-section',
      name: 'Section §',
      description: '法条/章节感',
      markdown: '::: divider variant=glyph glyph="§"\n:::\n',
    },
    {
      presetId: 'dv-glyph-diamond',
      name: '菱形 ◆',
      description: '现代分隔',
      markdown: '::: divider variant=glyph glyph="◆"\n:::\n',
    },
  ],
  render: (ctx) => {
    const char = ctx.attrs.glyph || '❦'
    const color = ctx.tokens.colors.primary
    const line = ctx.tokens.colors.border
    return {
      wrapperCSS: `text-align:center;margin:26px 0;color:${color};font-size:18px`,
      svgSlot:
        `<span style="display:inline-block;width:60px;height:1px;background-color:${line};vertical-align:middle;margin-right:12px"></span>` +
        `<span style="display:inline-block;vertical-align:middle">${char}</span>` +
        `<span style="display:inline-block;width:60px;height:1px;background-color:${line};vertical-align:middle;margin-left:12px"></span>`,
    }
  },
}

export default glyph
