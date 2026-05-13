/**
 * steps · ribbon-chain
 *
 * 视觉：wrapper 左侧用 4px 主色实线贯穿，标题行用 inline-block 胶囊（主色底白字），
 * 形成"飘带一路串起"的感觉。内容区无额外背景，保留 markdown 原生层级。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

const BODY3 =
  '### 01 第一步\n正文说明\n\n### 02 第二步\n正文说明\n\n### 03 第三步\n正文说明\n'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent } = mergeThumb(args ?? {})
  return svg(
    `<rect x="10" y="14" width="3" height="47" fill="${accent}"/>` +
      `<rect x="7" y="20" width="22" height="10" rx="5" fill="${accent}"/>` +
      `<rect x="7" y="36" width="22" height="10" rx="5" fill="${accent}"/>` +
      `<rect x="34" y="24" width="28" height="2" fill="#c0c6cf"/>` +
      `<rect x="34" y="40" width="28" height="2" fill="#c0c6cf"/>`,
  )
}

const ribbonChain: VariantDef = {
  meta: {
    id: 'ribbon-chain',
    kind: 'steps',
    name: '飘带链式',
    description: '左侧色条贯穿，胶囊标题',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'st-ribbon',
      name: '飘带链式',
      description: '左侧色条贯穿，胶囊标题',
      markdown: '::: steps 步骤 variant=ribbon-chain\n' + BODY3 + ':::\n',
    },
    {
      presetId: 'st-ribbon-with-intro',
      name: '飘带 + 导语',
      description: '步骤列表前加一段引子',
      markdown:
        '::: steps 上线流程 variant=ribbon-chain\n先阅读[操作文档](#)，然后：\n\n' +
        BODY3 +
        ':::\n',
    },
  ],
  render: (ctx) => ({
    wrapperCSS:
      `margin:18px 0;padding:8px 0 8px 18px;` +
      `border-left:4px solid ${ctx.tokens.colors.primary}`,
    titleCSS:
      `display:inline-block;padding:4px 12px;` +
      `background-color:${ctx.tokens.colors.primary};` +
      `color:${ctx.tokens.colors.textInverse};` +
      `border-radius:12px;font-weight:700;font-size:13px;` +
      `margin:0 0 12px -30px;letter-spacing:0.4px`,
  }),
}

export default ribbonChain
