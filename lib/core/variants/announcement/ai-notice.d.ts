/**
 * announcement · ai-notice（2026 AI 内容合规告知）
 *
 * 人格：pill 形态紧凑告知 + 一枚识别度极强的 inline SVG 芯片图标。
 * 视觉骨架：wrapper bgMuted + 1.5px solid accent border + 圆角 12px；
 *   顶部 display:table 双栏：左 24×24 AI 芯片 SVG（圆角方 + 4 die + 引脚），右 title 13px bold textMuted。
 *   下方 body 12px line-height 1.6 灰字（全宽，紧凑 pill 内）。
 *   info 为空时兜底 "本文部分内容由 AI 生成"；title 由 svgSlot 自渲，titleCSS=''。
 */
import type { VariantDef } from '../_core';
declare const aiNotice: VariantDef;
export default aiNotice;
