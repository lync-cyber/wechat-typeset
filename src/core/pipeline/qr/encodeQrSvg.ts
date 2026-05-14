/**
 * QR Code → SVG 包装：基于 `qrcode-generator`（kazuhikoarase 同步 API）。
 *
 * 为什么走第三方库：QR 编码 + Reed-Solomon + mask 选优是契约固定但代码量可观
 * 的工艺，自己造轮子无收益。qrcode-generator 选型理由：
 *   - 全同步 API（容器渲染器是同步函数，async 引入会强迫上游全异步化）
 *   - 浏览器 + Node 同套代码，零运行时依赖
 *   - ~30 KB minified，已是社区主流（StackOverflow / examples 一致命中此包）
 *
 * 自己写包装的两个理由：
 *   - 库内置 `createSvgTag` 不支持自定义颜色（背景写死 white，模块 fill 默认黑）；
 *     我们要按主题 `ThemeTokens.colors.{text,bg}` 渲染，必须自己拼 SVG
 *   - 主入口 utf-8 多字节文本：qrcode-generator 的 byte mode 需要显式开启
 *
 * 输出契约：viewBox 为 `0 0 N N`（N = (版本 * 4 + 17 + 2*margin)），fg / bg 走
 * `opts.fg` / `opts.bg`（默认黑/白）。模块用单 path `d="M..h1v1h-1z..."` 紧凑序
 * 列化——对 v1 QR 出码约 1.5 KB SVG。
 */

import qrcode from 'qrcode-generator'

export type QrEcc = 'L' | 'M' | 'Q' | 'H'

export interface EncodeQrSvgOptions {
  /** 纠错级别：默认 'M'（约 15% 容错；扫码可靠性与体积折中） */
  ecc?: QrEcc
  /** 边距模块数（按 QR spec 应为 4）。默认 4 */
  margin?: number
  /** 前景色（模块）。默认 '#000' */
  fg?: string
  /** 背景色。默认 '#fff' */
  bg?: string
  /** SVG 像素尺寸（width=height）。未传则不写 width/height，仅 viewBox—外层 CSS 控制 */
  size?: number
}

/**
 * `@types/qrcode-generator` 缺 `getModuleCount` / `isDark`（实测库本身有）；
 * 本地补一份接口让 TS 通过——只声明本文件用到的方法。
 */
interface QrModule {
  addData(data: string, mode?: 'Byte' | 'Alphanumeric' | 'Numeric' | 'Kanji'): void
  make(): void
  getModuleCount(): number
  isDark(row: number, col: number): boolean
}

export function encodeQrSvg(text: string, opts: EncodeQrSvgOptions = {}): string {
  const ecc: QrEcc = opts.ecc ?? 'M'
  const margin = opts.margin ?? 4
  const fg = opts.fg ?? '#000'
  const bg = opts.bg ?? '#fff'

  // typeNumber=0 让库自动挑最小够用版本
  const q = qrcode(0, ecc) as unknown as QrModule
  // 显式 Byte 模式：默认会尝试 Alphanumeric / Numeric，遇中文与多字节 URL 会出错
  q.addData(text, 'Byte')
  q.make()

  const n = q.getModuleCount()
  const total = n + margin * 2

  const parts: string[] = []
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (q.isDark(y, x)) parts.push(`M${x + margin} ${y + margin}h1v1h-1z`)
    }
  }

  const sizeAttrs = opts.size ? ` width="${opts.size}" height="${opts.size}"` : ''
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}"${sizeAttrs} shape-rendering="crispEdges">` +
    `<rect width="${total}" height="${total}" fill="${bg}"/>` +
    `<path d="${parts.join('')}" fill="${fg}"/>` +
    `</svg>`
  )
}
