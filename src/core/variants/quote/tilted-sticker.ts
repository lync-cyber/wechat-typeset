/**
 * quote · tilted-sticker（旋转贴纸金句）
 *
 * 视觉：punk-zine / 粗野主义印刷传统的"撕下来的贴纸"——反色卡片轻微旋转 -1deg,
 * 大号 sans 粗体正文 + 左对齐 + 直角硬边。背景取 tokens.text（与正文同色但作为背景),
 * 文字取 tokens.textInverse,形成与文章主色调相反的"嵌入物"视觉。
 *
 * 适用主题：粗野主义报刊（brutalist）/ 未来的 zine / 朋克编辑系。深底主题里更显
 * 反色冲击；浅底主题里得到一张"墨黑印刷贴纸"的反向感，同样成立。
 *
 * 实现纪律：
 *   - transform:rotate 在 WeChat 粘贴期不被剥（不在 FORBIDDEN_POSITION_PROPS / 不在
 *     wxPatch 删除列表）。CSS specificity 上属 inline，能被覆盖
 *   - 不使用 font-family（被 stripFontFamily 剥掉）。粗体 + 大字号承担字体气质
 *   - text-align:left 故意区别于 classic 的居中——punk-zine 的张力来自对齐"不规整"
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent } = mergeThumb(args ?? {})
  // 缩略图：白底反色矩形，轻微旋转，模拟"贴纸"语义
  return svg(
    `<g transform="rotate(-2 37 37)">` +
      `<rect x="9" y="20" width="56" height="34" fill="#f0f0f0"/>` +
      `<rect x="14" y="26" width="36" height="3" fill="#0a0a0a"/>` +
      `<rect x="14" y="32" width="44" height="3" fill="#0a0a0a"/>` +
      `<rect x="14" y="38" width="28" height="3" fill="#0a0a0a"/>` +
      `<rect x="14" y="46" width="20" height="2" fill="${accent}"/>` +
      `</g>`,
  )
}

const tiltedSticker: VariantDef = {
  meta: {
    id: 'tilted-sticker',
    kind: 'quote',
    name: '旋转贴纸金句',
    description: '反色 + 微旋转 -1deg，punk-zine 撕贴纸感',
    themeCompat: ['brutalist'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'q-tilted-sticker',
      name: '旋转贴纸金句',
      description: '反色 + 微旋转，punk-zine 撕贴纸感',
      themeCompat: ['brutalist'],
      markdown:
        '::: quote-card BORGES, J.L. variant=tilted-sticker\n"凡我所是，皆因我读。"\n:::\n',
    },
    {
      presetId: 'q-tilted-sticker-no-byline',
      name: '旋转贴纸无署名',
      description: '反色 + 微旋转，无作者',
      themeCompat: ['brutalist'],
      markdown:
        '::: quote-card variant=tilted-sticker\n大字号金句正文\n:::\n',
    },
  ],
  render: (ctx) => {
    const pad = ctx.tokens.spacing.containerPadding
    // 反色卡：底色取 tokens.text，文字取 tokens.textInverse —— 与正文形成镜像
    // transform:rotate(-1deg)：粗野主义 / punk-zine 的张力点；轻微即可，过头反而像玩具
    return {
      wrapperCSS:
        `background-color:${ctx.tokens.colors.text};` +
        `color:${ctx.tokens.colors.textInverse};` +
        `padding:${pad}px ${pad + 2}px;` +
        `margin:24px 0;` +
        `transform:rotate(-1deg);` +
        `border-radius:0`,
      // text-align 故意 left；body 文字主导 punk-zine 的视觉重量
      bodyCSS:
        `font-size:20px;font-weight:700;line-height:1.3;` +
        `color:${ctx.tokens.colors.textInverse};` +
        `text-align:left;letter-spacing:-0.005em`,
    }
  },
}

export default tiltedSticker
