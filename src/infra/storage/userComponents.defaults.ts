/**
 * 用户组件缺省值——目前只有缩略图占位。
 *
 * 拆出为独立文件是为了让 repo 不承载"展示"知识——首字占位 SVG 是渲染层关心的事，
 * 不是存储层。后续若加更多 default（如缺省 description、缺省 thumbArgs）也归这里。
 */

import { escapeXml } from '../../core/pipeline/containers/types'

/**
 * 75×75 首字占位缩略图：取 name 的首字符放在浅灰色方块中央。
 * 用户没提供 thumbnailSvg 时调用。
 */
export function defaultThumb(name: string): string {
  const ch = name.trim().charAt(0) || '组'
  return (
    '<svg viewBox="0 0 75 75" width="75" height="75" xmlns="http://www.w3.org/2000/svg">' +
    '<rect x="0" y="0" width="75" height="75" rx="6" fill="#eef1f6"/>' +
    `<text x="37.5" y="48" text-anchor="middle" font-size="32" font-weight="700" fill="#6a737d">${escapeXml(ch)}</text>` +
    '</svg>'
  )
}
