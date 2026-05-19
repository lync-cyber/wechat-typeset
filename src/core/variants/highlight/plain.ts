/**
 * highlight · plain（默认骨架）。
 * 占位变体: render 不发 wrapperCSS, 让 ThemeContainers.highlight 主题级 CSS 规则
 * 独占外壳样式。highlightContainer 仍附加 `container-highlight--plain` className,
 * 与其他容器骨架命名约定一致(quote-card--classic / note--minimal-callout)。
 *
 * DEFAULT_VARIANTS.highlight 兜底 — 主题不声明 variants.highlight 即此。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="10" y="22" width="55" height="30" fill="${text}" opacity="0.08"/>` +
      `<rect x="14" y="30" width="40" height="2" fill="${text}"/>` +
      `<rect x="14" y="38" width="44" height="2" fill="${text}"/>` +
      `<rect x="14" y="46" width="32" height="2" fill="${text}"/>`,
  )
}

const plain: VariantDef = {
  meta: {
    id: 'plain',
    kind: 'highlight',
    name: '默认高亮',
    description: '外壳样式由 ThemeContainers.highlight 主题级 CSS 接管,变体不发 wrapperCSS',
    // 实验性骨架: highlight 池刚启用,21 主题暂未显式声明 variants.highlight。
    // 任一主题显式声明 'plain' 或为本变体加 designedFor 后,可移除本字段。
    experimental: true,
    experimentalSince: '2026-05-19',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'highlight-plain',
      name: '高亮块',
      description: '作者自我强调的整段',
      markdown: '::: highlight\n这是被强调的整段。\n:::\n',
    },
  ],
  render: () => ({ wrapperCSS: '' }),
}

export default plain
