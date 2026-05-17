/**
 * note · side-bar
 *
 * 视觉：左侧标线 + 左缩进，经典"此处有补充"批注式。
 * 与 admonition/accent-bar 区别：色彩走 border / textMuted（中性），不情绪。
 *
 * 6 主题共用此 variant 的差异化点（同骨架不同笔触）走 token：
 *   - 颜色  ← tokens.colors.noteBorder ?? tokens.colors.border
 *   - 线型  ← tokens.colors.noteBorderStyle ?? 'solid'
 *   - 线宽  ← tokens.colors.noteBorderWidth ?? 2（double 强制 ≥ 3 才能看到双线）
 *
 * 主题作者不需再去 `spec.containers.note` 写 `border-left:...` —— 该写法被
 * 变体的 inline wrapperCSS 屏蔽（inline > stylesheet），过去 4 个主题里"以为生效
 * 实则被覆盖"的设置由此次重构修正。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="10" y="16" width="2" height="42" fill="${text}"/>` +
      `<rect x="18" y="22" width="20" height="2" fill="${text}"/>` +
      `<rect x="18" y="32" width="44" height="2" fill="#c0c6cf"/>` +
      `<rect x="18" y="40" width="38" height="2" fill="#c0c6cf"/>` +
      `<rect x="18" y="48" width="32" height="2" fill="#c0c6cf"/>`,
  )
}

const sideBar: VariantDef = {
  meta: {
    id: 'side-bar',
    kind: 'note',
    name: '左侧标线',
    description: '左 2px 中性线 + 左缩进，经典批注式',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'note-side-bar',
      name: '左侧标线 Note',
      description: '中性左条 + 缩进，"此处有补充"批注感',
      markdown: '::: note variant=side-bar 旁注\n附属说明 …\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const borderColor = c.noteBorder ?? c.border
    const borderStyle = c.noteBorderStyle ?? 'solid'
    const declaredWidth = c.noteBorderWidth ?? 2
    // double 在 < 3px 时浏览器画不出双线，落到一根细实线，强制 ≥ 3
    const borderWidth = borderStyle === 'double' ? Math.max(3, declaredWidth) : declaredWidth
    // 缩进略宽于线宽，让 body 段贴右侧时不与边线粘连
    const padLeft = Math.max(12, borderWidth + 10)
    return {
      wrapperCSS: [
        `border-left:${borderWidth}px ${borderStyle} ${borderColor}`,
        `padding:4px 0 4px ${padLeft}px`,
        'margin:16px 0',
      ].join(';'),
      titleCSS: [
        `color:${c.textMuted}`,
        'font-weight:600',
        'font-size:13px',
        'margin-bottom:4px',
        'letter-spacing:0.3px',
      ].join(';'),
    }
  },
}

export default sideBar
