/**
 * footerCTA · triptych-actions
 *
 * 视觉：三栏 CTA（display:table）—— 左/右描边格 + 中实色格。
 * info 非空时顶部追加黑底白字 header bar；attrs.like / star / share 控制三格文字。
 * 数据简报家族签名（赞同 / 收藏 / 转发的并列动作集）。
 *
 * 单元格间无白缝：左格 + 中格 border-right 共享 1px 黑线（border-collapse:collapse）。
 */
import type { VariantDef } from '../_core';
declare const triptychActions: VariantDef;
export default triptychActions;
