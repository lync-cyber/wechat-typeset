/**
 * admonition · bubble-organic（有机气泡）
 *
 * 专为 life-aesthetic 主题设计：彻底摆脱"左 3px 竖线"的工业矩阵语法。
 * 视觉语汇取自手绘笔记、信笺边栏、杂志页边空白的"柔物"：
 *   - 大圆角（18px），手绘式的气泡轮廓
 *   - 无硬边框；改用 `box-shadow` 的**横向软阴影**作边缘提示
 *     （单侧 inset + 单层柔阴影 = 悬浮轻盈感，不像 Material Card 的卡片化）
 *   - warm soft bg + 可选 accent 色 inset shadow 打侧边
 *   - 大 padding，字号略暖
 *   - 标题前的图标保留（生活主题图标有圆点/对勾/叶子形的有机轮廓）
 */

import type { VariantDef, AdmonitionRenderArgs } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="14" width="63" height="47" rx="14" fill="${soft}"/>` +
      `<rect x="9" y="20" width="3" height="36" rx="1.5" fill="${accent}"/>` +
      `<circle cx="18" cy="24" r="2.4" fill="${accent}"/>` +
      `<rect x="24" y="22" width="22" height="3" rx="1" fill="${accent}"/>` +
      `<rect x="16" y="34" width="44" height="2" rx="1" fill="#c0c6cf"/>` +
      `<rect x="16" y="42" width="38" height="2" rx="1" fill="#c0c6cf"/>` +
      `<rect x="16" y="50" width="30" height="2" rx="1" fill="#c0c6cf"/>`,
  )
}

const bubbleOrganic: VariantDef<AdmonitionRenderArgs> = {
  meta: {
    id: 'bubble-organic',
    kind: 'admonition',
    name: '有机气泡',
    description: '大圆角 + 软阴影侧边，手绘信笺气质',
    themeCompat: ['life-aesthetic'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'ad-tip-bubble-organic',
      name: '气泡 · 心得',
      description: '圆角柔暖，生活笔记口吻',
      admonitionKind: 'tip',
      thumbArgs: { accent: '#7ba05b', soft: '#eef3e4' },
      markdown: '::: tip 今日小发现 variant=bubble-organic\n换用陶壶冲茶，水温下降更慢。\n:::\n',
    },
    {
      presetId: 'ad-info-bubble-organic',
      name: '气泡 · 拾遗',
      description: '补注 / 参考',
      admonitionKind: 'info',
      thumbArgs: { accent: '#5b88a8', soft: '#e6edf3' },
      markdown: '::: info 配乐推荐 variant=bubble-organic\n坂本龙一·Async。\n:::\n',
    },
  ],
  render: (ctx, { kind }) => {
    const pair = ctx.tokens.colors.status[kind]
    const padX = ctx.tokens.spacing.containerPadding + 2
    const padY = Math.max(14, ctx.tokens.spacing.containerPadding)
    return {
      wrapperCSS:
        `background-color:${pair.soft};` +
        `padding:${padY}px ${padX}px;` +
        `margin:20px 0;` +
        `border-radius:18px;` +
        `box-shadow:inset 4px 0 0 ${pair.accent}, 0 4px 14px rgba(0,0,0,0.05)`,
      titleCSS:
        `font-size:15px;font-weight:700;` +
        `color:${pair.accent};` +
        `margin-bottom:8px;` +
        `letter-spacing:0.4px`,
    }
  },
}

export default bubbleOrganic
