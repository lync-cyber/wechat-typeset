/**
 * note · box-callout
 *
 * 视觉：1px 全边框 + 内边距 + 标题 textMuted。卡片感更强但仍不抢色。
 * 适合放在"参考资料 / 版本说明 / 致谢"等需要明确块界但不情绪化的位置。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="8" y="14" width="59" height="47" fill="none" stroke="${text}" stroke-width="1" opacity="0.4"/>` +
      `<rect x="14" y="22" width="22" height="2" fill="${text}"/>` +
      `<rect x="14" y="32" width="48" height="2" fill="#c0c6cf"/>` +
      `<rect x="14" y="40" width="40" height="2" fill="#c0c6cf"/>` +
      `<rect x="14" y="48" width="34" height="2" fill="#c0c6cf"/>`,
  )
}

const boxCallout: VariantDef = {
  meta: {
    id: 'box-callout',
    kind: 'note',
    name: '边框补注',
    description: '1px 全边框 + textMuted 标题，明确块界',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'note-box-callout',
      name: '边框补注',
      description: '清晰外框包裹的中性 Note',
      markdown: '::: note variant=box-callout 参考资料\n注释内容 …\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const pad = ctx.tokens.spacing.containerPadding
    return {
      wrapperCSS: [
        `border:1px solid ${c.border}`,
        `padding:${Math.max(10, pad - 4)}px ${pad}px`,
        'margin:16px 0',
        `border-radius:${ctx.tokens.radius.sm}px`,
      ].join(';'),
      titleCSS: [
        `color:${c.textMuted}`,
        'font-weight:600',
        'font-size:13px',
        'margin-bottom:6px',
        'letter-spacing:0.3px',
      ].join(';'),
    }
  },
}

export default boxCallout
