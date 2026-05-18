/**
 * quote · classic（默认）
 *
 * 视觉：浅底卡 + 大号装饰引号（theme.assets.quoteMark 或回退字符）+ 居中排布。
 * byline（ctx.info）由 container renderer 在 close 时拼 "— 作者"。
 */

import type { VariantDef, TokenSchema } from '../_core'
import { mergeThumb, svg } from '../_thumb'

/**
 * tokens 暴露：金句卡的浅底色 + 正文字号——这两个最常被作者要求"调一格"。
 * mark 颜色不开放（主题 assets.quoteMark 是整段 HTML，没有单独颜色变量可抽）。
 * bgSoft default 用 'inherit' 占位（实际 fallback 由 render() 内的 ctx.tokens.colors.bgSoft 承担）。
 */
export const tokenSchema: TokenSchema = {
  'quote-bg': {
    type: 'color',
    label: '卡片底色',
    default: 'inherit',
    hint: '默认跟随主题的 bgSoft',
  },
  'quote-size': {
    type: 'size',
    label: '正文字号',
    default: '17px',
  },
}

// 「：贴卡片左上角。wrapper 自身 padding:0,纵横空间由各 section 自行承担——OPEN_MARK 的
// `padding:6px 0 8px 6px` 把 「 顶到 ~6px 内的左上角"框角位",同时给下方 body 留 8px 呼吸。
// block 包一层让 inline-block span 始终 left 起,不被 wrapper 的 text-align 干扰。
const FALLBACK_OPEN_MARK =
  `<section style="text-align:left;line-height:1;padding:6px 0 8px 6px">` +
  `<span style="display:inline-block;font-size:28px;opacity:0.35">「</span>` +
  `</section>`

// 」：贴卡片右下角。与 「 对称——padding-top:8 接住 byline / body 末段,bottom+right:6 把 」
// 顶到右下角"框角位"。容器把 closeSlot 排在 byline 之后,视觉上 」 把作者一并包进引号内,
// 符合"金句 + 落款一体"的中文排版直觉。主题声明 assets.quoteMark 时不强行配对,信任主题
// 作者自带 SVG 自洽(多数主题不要闭合括号)。
const FALLBACK_CLOSE_MARK =
  `<section style="text-align:right;line-height:1;padding:8px 6px 6px 0">` +
  `<span style="display:inline-block;font-size:28px;opacity:0.35">」</span>` +
  `</section>`

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="14" width="63" height="47" rx="5" fill="${soft}"/>` +
      `<text x="14" y="35" font-size="22" fill="${accent}" opacity="0.4">&#8220;</text>` +
      `<rect x="16" y="40" width="42" height="2" fill="#c0c6cf"/>` +
      `<rect x="16" y="48" width="34" height="2" fill="#c0c6cf"/>`,
  )
}

const classic: VariantDef = {
  meta: {
    id: 'classic',
    kind: 'quote',
    name: '大引号金句',
    description: '浅底 + 装饰引号，居中大号',
  },
  thumbnail: thumb,
  tokenSchema,
  snippets: [
    {
      presetId: 'q-classic',
      name: '大引号金句',
      description: '浅底 + 装饰引号，居中大号',
      markdown: '::: quote-card 作者名\n此处填写金句正文\n:::\n',
    },
    {
      presetId: 'q-classic-no-byline',
      name: '无署名金句',
      description: '纯金句不署名',
      markdown: '::: quote-card\n此处填写金句正文\n:::\n',
    },
  ],
  render: (ctx) => {
    const themeMark = ctx.assets.quoteMark
    const mark = themeMark ?? FALLBACK_OPEN_MARK
    const pad = ctx.tokens.spacing.containerPadding
    return {
      wrapperCSS:
        `background-color:var(--uv-quote-bg, ${ctx.tokens.colors.bgSoft});` +
        // wrapper 自身 padding:0——纵向与横向空间均下放给子节点掌管:
        // OPEN_MARK / CLOSE_MARK 自带角位 padding(6/8),body 自带横向 padding(pad+4)。
        // 这样 「」 真正落在 wrapper 顶 / 底边角,而不是被 wrapper padding 推到内侧。
        `padding:0;` +
        `margin:20px 0;` +
        `border-radius:8px`,
      // 横向 padding 落在 body 自身:正文文字距 wrapper 左右各 (pad+4) 的呼吸,
      // 与 「」 的 6px 角位形成"角 < 正文边距"的层次,角标贴边、正文居中悬浮。
      bodyCSS:
        `font-size:var(--uv-quote-size, 17px);line-height:1.65;text-align:center;` +
        `padding:0 ${pad + 4}px`,
      svgSlot: mark,
      // 仅 fallback 字符路径配对闭合；主题自带 SVG 引号时不强行加。
      closeSlot: themeMark ? undefined : FALLBACK_CLOSE_MARK,
    }
  },
}

export default classic
