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
import type { ContainerRenderer } from './types';
export declare const voiceCardContainer: ContainerRenderer;
export declare const videoCardContainer: ContainerRenderer;
