/**
 * data-brief 家族 · 四态 callout 联表外框（callout-group）
 *
 * 设计稿 multi-callout 母本：外框承担"上/下/左/右 hairline"，
 * 子项 (tip/warning/info/danger) 在内串联，单元间 1px 黑分隔线。
 *
 * 作者写法（与设计稿 02 swiss-grid `multi-callout` 一致）：
 *   :::: callout-group
 *   ::: info INFO variant=news-row
 *   说明一。
 *   :::
 *   ::: tip TIP variant=news-row
 *   小贴士。
 *   :::
 *   ::::
 *
 * 视觉契约：本容器只画"外框 + 子项行间分隔线"。子项的色条/徽章/正文样式由
 * 各 admonition variant（推荐 news-row）自行渲染。renderer 不感知子项数量与种类。
 *
 * 公众号兼容：外框走 border + padding；行间分隔由"子项 wrapper 的 border-bottom"
 * 提供（news-row 已自带 `margin:0 0 4px 0` 紧凑罗列）。本容器仅外框，不动子项。
 */

import type { ContainerRenderer } from '../types'
import { inlineCss as inline } from '../_shared/cssInline'

export const calloutGroupContainer: ContainerRenderer = {
  open: (ctx) => {
    const c = ctx.tokens.colors
    // 默认外框：上下各 1px 黑实线；不画左右框（让子项左 3px 色条贴边）。
    // 主题 voice 通过 spec.containers.calloutGroup 深合并接管。
    const defaultCSS = [
      `border-top:1px solid ${c.text}`,
      `border-bottom:1px solid ${c.text}`,
      'padding:0',
      'margin:24px 0',
    ].join(';')
    const themeCSS = inline(ctx.containers.calloutGroup)
    const wrapperCSS = themeCSS || defaultCSS
    return `<section class="container-callout-group" style="${wrapperCSS}">\n`
  },
  close: '</section>\n',
}
