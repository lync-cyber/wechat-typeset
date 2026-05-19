/**
 * footnotes · inline-flow。
 * 视觉：所有条目同段流式排列（条目间作者用 `·` / `／` 分隔），
 * 加 max-height + overflow-y 让内部滚动而非顶版。
 * 适合 20+ 条长文献列表；公众号 inline overflow 实测保留（参 mdnice .multiquote-1）。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="12" width="62" height="51" rx="2" fill="${soft}"/>` +
      `<rect x="10" y="16" width="55" height="1" fill="${accent}"/>` +
      `<rect x="10" y="24" width="55" height="1.5" fill="#c0c6cf"/>` +
      `<rect x="10" y="30" width="55" height="1.5" fill="#c0c6cf"/>` +
      `<rect x="10" y="36" width="55" height="1.5" fill="#c0c6cf"/>` +
      `<rect x="10" y="42" width="55" height="1.5" fill="#c0c6cf"/>` +
      `<rect x="10" y="48" width="40" height="1.5" fill="#c0c6cf"/>`,
  )
}

const inlineFlow: VariantDef = {
  meta: {
    id: 'inline-flow',
    kind: 'footnotes',
    name: '流式',
    description: '同段流式排列 + 内滚动，长引用列表',
    experimental: true,
    experimentalSince: '2026-05-19',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'footnotes-inline-flow',
      name: '脚注 · 流式',
      description: '同段流式 + 内滚，长文献列表用',
      markdown:
        '::: footnotes variant=inline-flow 参考文献\n[1] 全国国民阅读调查 2015–2024 · [2] 样本 n=1,432，CI=95% · [3] 详见方法论 §3.2\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    return {
      wrapperCSS: [
        'padding-top:6px',
        'padding-right:4px',
        'line-height:1.6',
        'max-height:320px',
        'overflow-y:auto',
        '-webkit-overflow-scrolling:touch',
      ].join(';'),
      titleCSS: [
        `color:${c.primary}`,
        'font-size:10px',
        'font-weight:700',
        'letter-spacing:0.15em',
        'margin-bottom:6px',
      ].join(';'),
    }
  },
}

export default inlineFlow
