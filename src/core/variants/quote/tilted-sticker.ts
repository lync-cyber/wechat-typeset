/**
 * quote · tilted-sticker（旋转贴纸金句）
 *
 * 视觉：punk-zine / 粗野主义印刷传统的"撕下来的贴纸"——信息卡轻微旋转 -1deg,
 * 大号 sans 粗体正文 + 左对齐 + 直角硬边。punk-zine 的 DNA 由 transform:rotate
 * 与 border-radius:0 承担,颜色取主题"软底色"token 保证 `<p>` 默认字色（tokens.text）
 * 在底色上仍有充分对比——而非"反色卡"硬翻 token，那条路径会让 baseElements 注入的
 * inline `<p style="color: text">` 与 wrapper bg=tokens.text 同色，正文不可读。
 *
 * 适用主题：粗野主义报刊（brutalist）/ 深夜电台（late-night-vinyl）/ 未来的 zine /
 * 朋克编辑系。每个主题的 bgSoft 已被作者刻意配为"比 bg 略提一档的信息卡底"，
 * 与正文 tokens.text 形成主题自有的对比节奏。
 *
 * 实现纪律：
 *   - transform:rotate 在 WeChat 粘贴期不被剥（不在 FORBIDDEN_POSITION_PROPS / 不在
 *     wxPatch 删除列表）。CSS specificity 上属 inline，能被覆盖
 *   - 不使用 font-family（被 stripFontFamily 剥掉）。粗体 + 大字号承担字体气质
 *   - text-align:left 故意区别于 classic 的居中——punk-zine 的张力来自对齐"不规整"
 *   - 不显式 bodyCSS.color：让 `<p>` 走 baseElements 默认 tokens.text，避免与
 *     wrapper bg 同 token 造成"字 = 底"的不可读
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
    designedFor: ['brutalist', 'late-night-vinyl'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'q-tilted-sticker',
      name: '旋转贴纸金句',
      description: '反色 + 微旋转，punk-zine 撕贴纸感',
      designedFor: ['brutalist', 'late-night-vinyl'],
      markdown:
        '::: quote-card BORGES, J.L. variant=tilted-sticker\n"凡我所是，皆因我读。"\n:::\n',
    },
    {
      presetId: 'q-tilted-sticker-no-byline',
      name: '旋转贴纸无署名',
      description: '反色 + 微旋转，无作者',
      designedFor: ['brutalist', 'late-night-vinyl'],
      markdown:
        '::: quote-card variant=tilted-sticker\n大字号金句正文\n:::\n',
    },
  ],
  render: (ctx) => {
    const pad = ctx.tokens.spacing.containerPadding
    // 软底信息卡 + transform:rotate(-1deg)：粗野主义 / punk-zine 的张力靠几何
    // （斜角 + 硬边）承担，颜色克制走主题信息卡底色。
    return {
      wrapperCSS:
        `background-color:${ctx.tokens.colors.bgSoft};` +
        `padding:${pad}px ${pad + 2}px;` +
        `margin:24px 0;` +
        `transform:rotate(-1deg);` +
        `border-radius:0`,
      // text-align 故意 left；body 文字主导 punk-zine 的视觉重量。
      // 不写 color：让 `<p>` 走 baseElements 默认 tokens.text，与 bgSoft 自然成对比。
      bodyCSS:
        `font-size:20px;font-weight:700;line-height:1.3;` +
        `text-align:left;letter-spacing:-0.005em`,
    }
  },
}

export default tiltedSticker
