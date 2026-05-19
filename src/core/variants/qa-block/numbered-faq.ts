/**
 * qa-block · numbered-faq（编辑部 编号 FAQ）
 *
 * 设计稿 01·A：Q.NN mono 序号 + 加粗设问 + 底线分隔 + 下方多段答复。
 * 默认骨架：DEFAULT_VARIANTS.qaBlock 指向本 id，未声明 qaBlock 的主题自动采用。
 * P3.1 阶段 renderer 未派发，本文件仅占位登记并提供 thumbnail / snippet。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="8" y="14" width="14" height="2" fill="${accent}"/>` +
      `<rect x="26" y="14" width="40" height="2" fill="${text}"/>` +
      `<rect x="8" y="20" width="58" height="1" fill="${text}"/>` +
      `<rect x="8" y="26" width="50" height="2" fill="${text}" opacity="0.5"/>` +
      `<rect x="8" y="46" width="14" height="2" fill="${accent}"/>` +
      `<rect x="26" y="46" width="36" height="2" fill="${text}"/>` +
      `<rect x="8" y="52" width="58" height="1" fill="${text}"/>` +
      `<rect x="8" y="58" width="46" height="2" fill="${text}" opacity="0.5"/>`,
  )
}

const numberedFaq: VariantDef = {
  meta: {
    id: 'numbered-faq',
    kind: 'qaBlock',
    name: '编号 FAQ',
    description: 'Q.NN 序号 + 加粗设问 + 底线分隔 + 下方答复段',
    experimental: true,
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'qa-block-numbered-faq',
      name: '问答 · 编号 FAQ',
      description: 'Q.01 序号 + 设问 + 底线分隔，编辑部 FAQ 风',
      markdown:
        '::: qa-block 读者问答 · Q&A variant=numbered-faq q="订阅是否包含纸质刊？"\n' +
        '不含。本刊数字订阅与纸刊为独立产品，需分别购买。\n' +
        ':::\n',
    },
  ],
  render: () => ({
    wrapperCSS: 'margin:18px 0;padding:6px 0;background-color:transparent',
  }),
}

export default numberedFaq
