/**
 * 封面占位 SVG 构造器
 *
 * 9 套主题的封面 visual identity 走"同骨架 + 不同 palette + 可选 accent 元素"路线：
 * 骨架由本助手统一产出（标题左上、副标题、底色、装订线），每个 persona 通过自家
 * palette 染色，并可选传入若干"自家 motif 词汇"primitives（如极客主题的装订孔
 * 竖条、人文主题的朱砂方框）覆盖在右下 / 右侧——这是 cover 的 "persona 签名"。
 *
 * 输出 viewBox 永远是 [0, 0, 1200, 630]（og:image / 公众号图文封面 1.91:1）。
 *
 * 为什么集中在助手里：9 个 persona spec 不希望各自重复 60+ 行布局代码；同时本助手
 * 仍是 build-time 产出 JSON-serializable MotifShape——spec 文件层面"零运行时函数"。
 */

import type { MotifPrimitive, MotifShape, Palette } from './types'

export interface CoverBuilderOptions {
  palette: Palette
  /** 主标题（persona name 中文） */
  title: string
  /** 副标题（persona description / audience 浓缩） */
  tagline?: string
  /** 顶部小字 kicker（如 'TYPESETTING' / '排版主题' / 'theme 编号'） */
  kicker?: string
  /**
   * persona 签名 motif：自由排版的 primitives 列表（已按 1200×630 坐标系作图）。
   * 助手把它们叠在装订线之外的右侧空区作 hero。缺省时只有 palette 染色的纯骨架。
   */
  signaturePrimitives?: readonly MotifPrimitive[]
  /**
   * 主标题 font-family；缺省 sans-serif。serif 主题（人文 / 学术）建议传 'serif'。
   */
  titleFamily?: 'serif' | 'sans-serif' | 'monospace'
  /** 主标题 font-weight；缺省 700 */
  titleWeight?: number
  /** 主标题 font-size；缺省 84（顶级布局） */
  titleSize?: number
}

export function makeCoverPlaceholder(opts: CoverBuilderOptions): MotifShape {
  const {
    palette,
    title,
    tagline,
    kicker,
    signaturePrimitives = [],
    titleFamily = 'sans-serif',
    titleWeight = 700,
    titleSize = 84,
  } = opts

  const primitives: MotifPrimitive[] = [
    // 底
    { type: 'rect', x: 0, y: 0, w: 1200, h: 630, fill: palette.bg },
    // 顶/底装订线（24px 内缩）
    {
      type: 'line',
      x1: 80,
      y1: 80,
      x2: 1120,
      y2: 80,
      stroke: palette.border,
      strokeWidth: 1,
    },
    {
      type: 'line',
      x1: 80,
      y1: 550,
      x2: 1120,
      y2: 550,
      stroke: palette.border,
      strokeWidth: 1,
    },
    // 左侧 primary 长竖条：persona "印章"
    {
      type: 'rect',
      x: 80,
      y: 200,
      w: 4,
      h: 200,
      fill: palette.primary,
    },
  ]

  if (kicker) {
    primitives.push({
      type: 'text',
      x: 110,
      y: 150,
      content: kicker,
      fontSize: 20,
      fontFamily: 'monospace',
      fontWeight: 500,
      fill: palette.primary,
      letterSpacing: 4,
    })
  }

  // 主标题
  primitives.push({
    type: 'text',
    x: 110,
    y: 290,
    content: title,
    fontSize: titleSize,
    fontFamily: titleFamily,
    fontWeight: titleWeight,
    fill: palette.text,
  })

  if (tagline) {
    primitives.push({
      type: 'text',
      x: 110,
      y: 380,
      content: tagline,
      fontSize: 22,
      fontFamily: titleFamily,
      fontWeight: 400,
      fill: palette.textMuted,
    })
  }

  // 底部色板 swatch 行：6 色 24×24，左下角排开（"主题色卡"签名）
  const swatchY = 580
  const swatchSize = 14
  const swatchGap = 6
  const swatchKeys: Array<keyof Palette> = [
    'primary',
    'secondary',
    'accent',
    'bgSoft',
    'border',
    'textMuted',
  ]
  swatchKeys.forEach((key, i) => {
    primitives.push({
      type: 'rect',
      x: 110 + i * (swatchSize + swatchGap),
      y: swatchY,
      w: swatchSize,
      h: swatchSize,
      fill: palette[key],
    })
  })

  // wechat-typeset wordmark（右下小字签名）
  primitives.push({
    type: 'text',
    x: 1120,
    y: 590,
    content: 'wechat-typeset',
    fontSize: 16,
    fontFamily: 'monospace',
    fontWeight: 400,
    fill: palette.textMuted,
    textAnchor: 'end',
    letterSpacing: 2,
  })

  // persona 签名 motif（右侧空区由 persona 自决；助手负责"放进去"不再二次定位）
  for (const p of signaturePrimitives) primitives.push(p)

  return {
    viewBox: [0, 0, 1200, 630],
    width: 1200,
    height: 630,
    primitives,
  }
}
