/**
 * sectionTitle · kicker-stack
 *
 * 视觉：上 letter-spaced uppercase 小字 kicker（block 级，via svgSlot）+ 下主标题。
 * 作者通过 attrs.kicker 声明 kicker 文本（如 "CHAPTER ONE" / "第 一 章"），缺省时
 * 渲染一个主色 24×2 实线短杠作为视觉锚点。学术/调研主题骨架。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'
import { escText } from '../../pipeline/containers/_shared/escape'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="10" y="16" width="20" height="2" fill="${accent}"/>` +
      `<text x="10" y="28" font-size="6" font-weight="600" letter-spacing="1" fill="${accent}">CHAPTER ONE</text>` +
      `<text x="10" y="44" font-size="13" font-weight="700" fill="${text}">缘起</text>` +
      `<rect x="10" y="54" width="55" height="2" fill="#c0c6cf"/>` +
      `<rect x="10" y="62" width="42" height="2" fill="#c0c6cf"/>`,
  )
}

const kickerStack: VariantDef = {
  meta: {
    id: 'kicker-stack',
    kind: 'sectionTitle',
    name: 'kicker 叠层章标题',
    description: '上小字 kicker + 下主标题',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'sec-kicker-stack',
      name: 'kicker 叠层章标题',
      description: '上 letter-spaced uppercase kicker + 下主标题',
      markdown:
        '::: section-title 缘起 kicker="CHAPTER ONE" variant=kicker-stack\n:::\n',
    },
    {
      presetId: 'sec-kicker-stack-cn',
      name: 'kicker · 中文章名',
      description: '中文 kicker（第 一 章）的叠层骨架',
      markdown:
        '::: section-title 在算法时代重新阅读 kicker="第 一 章" variant=kicker-stack\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const kicker = ctx.attrs.kicker
    const slot = kicker
      ? `<span style="display:block;font-size:11px;font-weight:600;letter-spacing:2px;color:${c.primary};margin-bottom:6px;text-transform:uppercase">${escText(kicker)}</span>`
      : `<span style="display:block;width:24px;height:2px;background:${c.primary};margin-bottom:8px"></span>`
    return {
      wrapperCSS: `margin:26px 0 12px;padding:0`,
      titleCSS: `font-weight:700;font-size:20px;color:${c.text};line-height:1.35`,
      svgSlot: slot,
    }
  },
}

export default kickerStack
