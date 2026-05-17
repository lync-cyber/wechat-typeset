/**
 * footerCTA · button-led（默认）
 *
 * 视觉：居中粗体大标题 + 主色胶囊按钮（attrs.cta 文本 + 可选 href）。
 * 文末关注卡的常见形态——单 CTA 钩子，引导读者关注 / 阅读原篇 / 投喂。
 *
 * 主题级 voice（margin / 收尾印章 / issue stamp）由 ctx.containers.footerCTA +
 * footerCTA 容器渲染器接管；variant 只决定 wrapper 排版骨架。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="14" y="18" width="47" height="3" fill="${text}"/>` +
      `<rect x="20" y="26" width="35" height="2" fill="#a0a8b3"/>` +
      `<rect x="22" y="42" width="31" height="14" rx="7" fill="${accent}"/>` +
      `<text x="37" y="52" text-anchor="middle" font-size="8" font-weight="700" fill="#fff">关注我</text>`,
  )
}

const buttonLed: VariantDef = {
  meta: {
    id: 'button-led',
    kind: 'footerCTA',
    name: '单按钮 CTA',
    description: '居中标题 + 主色胶囊按钮（默认）',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'fc-button-led',
      name: '单按钮 CTA',
      description: '居中粗体标题 + 主色胶囊按钮，文末关注卡',
      markdown:
        '::: footer-cta 觉得有用？ cta=关注我 href=https://mp.weixin.qq.com/s/xxx\n如果这篇对你有启发，欢迎关注。\n:::\n',
    },
  ],
  render: () => ({ wrapperCSS: '' }),
}

export default buttonLed
