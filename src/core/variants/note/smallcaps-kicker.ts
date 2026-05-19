/**
 * note · smallcaps-kicker
 *
 * 视觉：上 letter-spaced uppercase 小字 kicker + hairline + 正文。
 * 粗野主义 / 数据简报骨架——比 minimal-callout 更"模块化"，标题与正文之间有一道
 * 主色 hairline 分隔，但整体仍走 textMuted 中性色调。
 *
 * ctx.attrs.layout 结构性开关（不是颜色/尺寸旋钮，不走 tokenSchema）：
 *   缺省 / 'top-rule' → 顶 2px 主色线（默认行为）
 *   'hanging'         → 悬挂缩进无顶线（text-indent:-12px，学术 / 笔记风）
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<text x="10" y="22" font-size="6" font-weight="700" letter-spacing="2" fill="${accent}">NOTE</text>` +
      `<rect x="10" y="28" width="55" height="2" fill="${accent}"/>` +
      `<rect x="10" y="38" width="48" height="2" fill="${text}"/>` +
      `<rect x="10" y="46" width="55" height="2" fill="#c0c6cf"/>` +
      `<rect x="10" y="54" width="42" height="2" fill="#c0c6cf"/>`,
  )
}

const smallcapsKicker: VariantDef = {
  meta: {
    id: 'smallcaps-kicker',
    kind: 'note',
    name: '小字 kicker + hairline',
    description: 'letter-spaced kicker + 主色 hairline',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'note-smallcaps-kicker',
      name: '小字 kicker Note',
      description: 'uppercase 小字 kicker + 主色 hairline',
      markdown: '::: note variant=smallcaps-kicker NOTE\n模块化短注，适配数据简报与栏目化深度文。\n:::\n',
    },
    {
      presetId: 'note-smallcaps-kicker-hanging',
      name: '小字 kicker · 悬挂缩进',
      description: 'uppercase 小字 kicker，悬挂缩进无顶线',
      markdown: '::: note variant=smallcaps-kicker layout=hanging 注\n说明文字 …\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    if (ctx.attrs.layout === 'hanging') {
      return {
        wrapperCSS: [
          'margin:16px 0',
          'padding:8px 0 4px 12px',
          'text-indent:-12px',
        ].join(';'),
        titleCSS: [
          `color:${c.primary}`,
          'font-weight:700',
          'font-size:11px',
          'letter-spacing:1.5px',
          'text-transform:uppercase',
          'margin-bottom:6px',
          'display:inline-block',
          'margin-right:6px',
        ].join(';'),
      }
    }
    return {
      wrapperCSS: [
        'margin:16px 0',
        'padding:6px 0 0',
        `border-top:2px solid ${c.primary}`,
      ].join(';'),
      titleCSS: [
        `color:${c.primary}`,
        'font-weight:700',
        'font-size:11px',
        'letter-spacing:2px',
        'text-transform:uppercase',
        'margin:8px 0 6px',
      ].join(';'),
    }
  },
}

export default smallcapsKicker
