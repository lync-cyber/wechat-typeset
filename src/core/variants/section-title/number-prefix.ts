/**
 * sectionTitle · number-prefix
 *
 * 视觉：标题 monospace + tabular-nums，大号粗体；下方 1px 短主色线（仅左侧 32px）。
 * 适合"01 / 02 / 03"序章排印——作者把编号写进 info，variant 用 monospace 把数字突出。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<text x="10" y="34" font-family="ui-monospace,Menlo,monospace" font-size="18" font-weight="700" fill="${accent}">01</text>` +
      `<text x="34" y="34" font-family="ui-monospace,Menlo,monospace" font-size="13" font-weight="600" fill="${text}">缘起</text>` +
      `<rect x="10" y="42" width="22" height="2" fill="${accent}"/>` +
      `<rect x="10" y="52" width="55" height="2" fill="#c0c6cf"/>` +
      `<rect x="10" y="60" width="42" height="2" fill="#c0c6cf"/>`,
  )
}

const numberPrefix: VariantDef = {
  meta: {
    id: 'number-prefix',
    kind: 'sectionTitle',
    name: '编号前缀章标题',
    description: 'monospace 编号 + 标题，序章排印',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'sec-number-prefix',
      name: '编号前缀章标题',
      description: 'monospace 大编号 + 标题，作者把编号写进 info',
      markdown: '::: section-title 01 · 缘起 variant=number-prefix\n:::\n',
    },
    {
      presetId: 'sec-number-prefix-long',
      name: '编号前缀 · 长标题',
      description: '编号 + 描述性长标题',
      markdown: '::: section-title 02 · 阅读为何成为奢侈 variant=number-prefix\n:::\n',
    },
  ],
  render: (ctx) => ({
    wrapperCSS:
      `margin:28px 0 14px;padding:0 0 6px;` +
      `border-bottom:1px solid ${ctx.tokens.colors.border}`,
    titleCSS:
      `font-family:ui-monospace,Menlo,Consolas,monospace;` +
      `font-weight:700;font-size:21px;color:${ctx.tokens.colors.text};` +
      `letter-spacing:-0.2px`,
  }),
}

export default numberPrefix
