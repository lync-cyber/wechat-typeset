/**
 * 运行时封面生成 —— W2：让作者从当前主题 + 草稿标题 / 副标题，一键导出
 * 公众号封面 PNG。
 *
 * 与 build-time 的 src/core/themes/_shared/spec/coverPlaceholder.ts 的关系：
 *   - 那是给 CDN 静态资产（og:image 1200×630 占位），每 persona 一张
 *   - 这里是 *运行时* 按公众号实际工作流尺寸合成，支持作者自定义标题文案
 *
 * 三种 size preset：
 *   - 'wechat-horizontal'  900×383   公众号主图（横版，比例接近 2.35:1）
 *   - 'wechat-square'      900×900   公众号方版次封面（列表缩略图友好）
 *   - 'og-image'           1200×630  与 build:covers 同尺寸，对外分享用
 *
 * 输出仍是 JSON-serializable MotifShape，由 shapeToSvg 转 SVG 字符串。栅格化（→ PNG）
 * 走 src/infra/exporters/exportCover.ts 的浏览器 Canvas 路径。
 */

import type {
  MotifPrimitive,
  MotifShape,
  Palette,
} from '../../themes/_shared/spec/types'

export type CoverSizeId = 'wechat-horizontal' | 'wechat-square' | 'og-image'

export interface CoverSizeMeta {
  id: CoverSizeId
  /** 中文显示名 */
  label: string
  /** 一句话用途 */
  hint: string
  /** SVG viewBox 宽度 = 输出 PNG 宽度（@1x） */
  width: number
  /** SVG viewBox 高度 = 输出 PNG 高度（@1x） */
  height: number
}

export const COVER_SIZES: Record<CoverSizeId, CoverSizeMeta> = {
  'wechat-horizontal': {
    id: 'wechat-horizontal',
    label: '横版主图 900×383',
    hint: '公众号图文头图',
    width: 900,
    height: 383,
  },
  'wechat-square': {
    id: 'wechat-square',
    label: '方版 900×900',
    hint: '列表缩略图 / 次封面',
    width: 900,
    height: 900,
  },
  'og-image': {
    id: 'og-image',
    label: 'og:image 1200×630',
    hint: '社交分享卡片',
    width: 1200,
    height: 630,
  },
}

export interface RuntimeCoverOptions {
  palette: Palette
  /** 主标题（缺省取 persona name） */
  title: string
  /** 副标题（缺省取 persona description） */
  tagline?: string
  /** 顶部小字 kicker（缺省 persona id 大写） */
  kicker?: string
  /** 标题字体家族；serif 主题建议传 'serif' */
  titleFamily?: 'serif' | 'sans-serif' | 'monospace'
  /** 标题字重；默认 700 */
  titleWeight?: number
}

/**
 * 按目标 size preset 生成封面 MotifShape。
 *
 * 三种 size 共享同一 visual signature（左上 kicker / 主标题 / 副标题 / 印章竖条 /
 * 底部色板 / 右下 wordmark），但坐标按 viewBox 比例独立设定——避免单一布局在不同
 * aspect 下被挤扁或拉空。
 */
export function buildRuntimeCover(opts: RuntimeCoverOptions, size: CoverSizeId): MotifShape {
  switch (size) {
    case 'wechat-horizontal':
      return buildHorizontal(opts)
    case 'wechat-square':
      return buildSquare(opts)
    case 'og-image':
    default:
      return buildOgImage(opts)
  }
}

/** 横版 900×383：左对齐，主标题占近半屏，紧凑信息密度 */
function buildHorizontal(opts: RuntimeCoverOptions): MotifShape {
  const { palette } = opts
  const W = 900
  const H = 383
  const titleFamily = opts.titleFamily ?? 'sans-serif'
  const titleWeight = opts.titleWeight ?? 700
  const primitives: MotifPrimitive[] = [
    { type: 'rect', x: 0, y: 0, w: W, h: H, fill: palette.bg },
    // 顶/底装订线
    { type: 'line', x1: 60, y1: 56, x2: W - 60, y2: 56, stroke: palette.border, strokeWidth: 1 },
    { type: 'line', x1: 60, y1: H - 56, x2: W - 60, y2: H - 56, stroke: palette.border, strokeWidth: 1 },
    // 左侧 primary 竖条印章
    { type: 'rect', x: 60, y: 130, w: 4, h: 130, fill: palette.primary },
  ]
  if (opts.kicker) {
    primitives.push({
      type: 'text',
      x: 80, y: 100,
      content: opts.kicker,
      fontSize: 14,
      fontFamily: 'monospace',
      fontWeight: 500,
      fill: palette.primary,
      letterSpacing: 3,
    })
  }
  primitives.push({
    type: 'text',
    x: 80, y: 185,
    content: opts.title,
    fontSize: 52,
    fontFamily: titleFamily,
    fontWeight: titleWeight,
    fill: palette.text,
  })
  if (opts.tagline) {
    primitives.push({
      type: 'text',
      x: 80, y: 240,
      content: opts.tagline,
      fontSize: 18,
      fontFamily: titleFamily,
      fontWeight: 400,
      fill: palette.textMuted,
    })
  }
  appendSwatchesAndMark(primitives, palette, { x: 80, y: H - 40, markRight: W - 60 })
  return { viewBox: [0, 0, W, H], width: W, height: H, primitives }
}

/** 方版 900×900：上下分区，标题居中、副标题在下方，印章靠左居中 */
function buildSquare(opts: RuntimeCoverOptions): MotifShape {
  const { palette } = opts
  const W = 900
  const H = 900
  const titleFamily = opts.titleFamily ?? 'sans-serif'
  const titleWeight = opts.titleWeight ?? 700
  const primitives: MotifPrimitive[] = [
    { type: 'rect', x: 0, y: 0, w: W, h: H, fill: palette.bg },
    // 四角内缩装订框
    { type: 'line', x1: 80, y1: 80, x2: W - 80, y2: 80, stroke: palette.border, strokeWidth: 1 },
    { type: 'line', x1: 80, y1: H - 80, x2: W - 80, y2: H - 80, stroke: palette.border, strokeWidth: 1 },
    // 居中 primary 竖条
    { type: 'rect', x: 80, y: H / 2 - 100, w: 4, h: 200, fill: palette.primary },
  ]
  if (opts.kicker) {
    primitives.push({
      type: 'text',
      x: 100, y: H / 2 - 120,
      content: opts.kicker,
      fontSize: 18,
      fontFamily: 'monospace',
      fontWeight: 500,
      fill: palette.primary,
      letterSpacing: 4,
    })
  }
  primitives.push({
    type: 'text',
    x: 100, y: H / 2 - 30,
    content: opts.title,
    fontSize: 76,
    fontFamily: titleFamily,
    fontWeight: titleWeight,
    fill: palette.text,
  })
  if (opts.tagline) {
    primitives.push({
      type: 'text',
      x: 100, y: H / 2 + 30,
      content: opts.tagline,
      fontSize: 22,
      fontFamily: titleFamily,
      fontWeight: 400,
      fill: palette.textMuted,
    })
  }
  appendSwatchesAndMark(primitives, palette, { x: 100, y: H - 110, markRight: W - 80 })
  return { viewBox: [0, 0, W, H], width: W, height: H, primitives }
}

/** og:image 1200×630：与 build-time 占位完全同布局，作分享卡用 */
function buildOgImage(opts: RuntimeCoverOptions): MotifShape {
  const { palette } = opts
  const W = 1200
  const H = 630
  const titleFamily = opts.titleFamily ?? 'sans-serif'
  const titleWeight = opts.titleWeight ?? 700
  const primitives: MotifPrimitive[] = [
    { type: 'rect', x: 0, y: 0, w: W, h: H, fill: palette.bg },
    { type: 'line', x1: 80, y1: 80, x2: W - 80, y2: 80, stroke: palette.border, strokeWidth: 1 },
    { type: 'line', x1: 80, y1: H - 80, x2: W - 80, y2: H - 80, stroke: palette.border, strokeWidth: 1 },
    { type: 'rect', x: 80, y: 200, w: 4, h: 200, fill: palette.primary },
  ]
  if (opts.kicker) {
    primitives.push({
      type: 'text',
      x: 110, y: 150,
      content: opts.kicker,
      fontSize: 20,
      fontFamily: 'monospace',
      fontWeight: 500,
      fill: palette.primary,
      letterSpacing: 4,
    })
  }
  primitives.push({
    type: 'text',
    x: 110, y: 290,
    content: opts.title,
    fontSize: 84,
    fontFamily: titleFamily,
    fontWeight: titleWeight,
    fill: palette.text,
  })
  if (opts.tagline) {
    primitives.push({
      type: 'text',
      x: 110, y: 380,
      content: opts.tagline,
      fontSize: 22,
      fontFamily: titleFamily,
      fontWeight: 400,
      fill: palette.textMuted,
    })
  }
  appendSwatchesAndMark(primitives, palette, { x: 110, y: H - 50, markRight: W - 80 })
  return { viewBox: [0, 0, W, H], width: W, height: H, primitives }
}

/** 底部色板 swatch + 右下 wordmark —— 三种 layout 共享，保持 visual signature */
function appendSwatchesAndMark(
  primitives: MotifPrimitive[],
  palette: Palette,
  pos: { x: number; y: number; markRight: number },
): void {
  const swatchSize = 14
  const swatchGap = 6
  const swatchKeys: Array<keyof Palette> = [
    'primary', 'secondary', 'accent', 'bgSoft', 'border', 'textMuted',
  ]
  swatchKeys.forEach((key, i) => {
    primitives.push({
      type: 'rect',
      x: pos.x + i * (swatchSize + swatchGap),
      y: pos.y,
      w: swatchSize,
      h: swatchSize,
      fill: palette[key],
    })
  })
  primitives.push({
    type: 'text',
    x: pos.markRight,
    y: pos.y + 10,
    content: 'wechat-typeset',
    fontSize: 14,
    fontFamily: 'monospace',
    fontWeight: 400,
    fill: palette.textMuted,
    textAnchor: 'end',
    letterSpacing: 2,
  })
}
