/**
 * 多媒体容器：voice-card / video-card
 *
 * - voice-card：公众号音频组件占位。粘贴到公众号编辑器里微信会识别并补齐真实播放器，
 *   本工具预览时只能给占位卡。attrs.voice_encode_fileid 若提供则透传。
 * - video-card：支持两种场景：
 *   1. attrs.qqvid：腾讯视频，渲染为允许的 iframe（v.qq.com 白名单，wxPatch 保留）
 *   2. 其他场景：占位卡，提示用户在公众号后台手动补视频组件
 *
 * 两者都没有有意义的正文；info 作为标题。wrapper 走 ctx.containers.voiceCard/videoCard
 * 主题 voice 槽位（兜底是 bgSoft + border + radius），内部 inline 样式仍硬编码。
 *
 * data-wx-mp-* 锚点：渲染产出 data-wx-mp-kind="voice|video" 给 infra/clipboard/mpInsertHints
 * 在复制路径注入 `<!--mpvoice/mpvideo ...-->` 微信识别注释；这一层走数据属性而非 class，
 * 与作者面 fence 名解耦。
 */

import type { ContainerRenderer } from './types'
import { escAttr, escText } from './_shared/escape'
import { inlineCss as inline } from './_shared/cssInline'

export const voiceCardContainer: ContainerRenderer = {
  open: (ctx) => {
    const title = ctx.info.trim() || '音频'
    const fileid = ctx.attrs.voice_encode_fileid ?? ctx.attrs.fileid
    const hint = fileid
      ? `已携带 fileid=${escText(fileid)}，粘贴到公众号后自动展开`
      : '粘贴到公众号后请手动选择"插入音频"'
    const label = ctx.tokens.colors.primary
    const fidAttr = fileid ? ` data-wx-mp-fileid="${escAttr(fileid)}"` : ''
    const nameAttr = title ? ` data-wx-mp-name="${escAttr(title)}"` : ''
    const wrapperCSS = inline(ctx.containers.voiceCard) + ';text-align:center'
    return (
      `<section class="container-voice-card" data-wx-mp-kind="voice"${fidAttr}${nameAttr} style="${wrapperCSS}">\n` +
      `<section style="font-size:12px;letter-spacing:1px;color:${label};margin-bottom:6px">[ 音频 ]</section>\n` +
      `<section style="font-weight:700;margin-bottom:6px">${escText(title)}</section>\n` +
      `<section style="font-size:13px">${hint}</section>\n`
    )
  },
  close: '</section>\n',
}

export const videoCardContainer: ContainerRenderer = {
  open: (ctx) => {
    const title = ctx.info.trim() || '视频'
    const qqvid = ctx.attrs.qqvid ?? ctx.attrs.vid
    if (qqvid) {
      const src = `https://v.qq.com/txp/iframe/player.html?vid=${encodeURIComponent(qqvid)}`
      return (
        `<section class="container-video-card" data-wx-mp-kind="video" data-wx-mp-vid="${escAttr(qqvid)}">\n` +
        `<iframe src="${escAttr(src)}" frameborder="0" ` +
        `width="100%" height="220" allowfullscreen="true" ` +
        `title="${escAttr(title)}"></iframe>\n`
      )
    }
    const label = ctx.tokens.colors.primary
    const fileid = ctx.attrs.fileid ?? ctx.attrs.video_encode_fileid
    const fidAttr = fileid ? ` data-wx-mp-fileid="${escAttr(fileid)}"` : ''
    const nameAttr = title ? ` data-wx-mp-name="${escAttr(title)}"` : ''
    const wrapperCSS = inline(ctx.containers.videoCard) + ';text-align:center'
    return (
      `<section class="container-video-card" data-wx-mp-kind="video"${fidAttr}${nameAttr} style="${wrapperCSS}">\n` +
      `<section style="font-size:12px;letter-spacing:1px;color:${label};margin-bottom:6px">[ 视频 ]</section>\n` +
      `<section style="font-weight:700;margin-bottom:6px">${escText(title)}</section>\n` +
      `<section style="font-size:13px">粘贴到公众号后请手动选择"插入视频"</section>\n`
    )
  },
  close: '</section>\n',
}
