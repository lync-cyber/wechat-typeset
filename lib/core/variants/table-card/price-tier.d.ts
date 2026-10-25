/**
 * table-card · price-tier（价格档位对比卡）
 *
 * 人格：每列一张独立"档位卡"。cell 间 border-spacing 形成间隙，每列顶 3px
 *   primary 色条；推荐列（cells 文本以 `*` 前缀）顶条走 accent。
 * 视觉骨架：wrapper border-spacing:3px 0 + transparent 底；header bgSoft + 居中粗体；
 *   body 白底居中。所有文本居中，区别于其它 variant 左对齐。
 *
 * 推荐高亮契约：作者在 cells 任一格写 `*高级` 标记该列推荐；price-tier 渲染时把列号记下，
 *   后续每行同列顶条着 accent 色——按列 index 一致触发，不依赖行间状态。
 *
 * 定位：现状骨架级 variant，与设计稿主题轴正交。适用于 SaaS 套餐 / 会员档位 /
 * 服务方案 等"每列独立卡片 + 推荐档位高亮"业务场景；任何主题都可 attrs.variant=
 * price-tier 切换，不绑定主题 default。带 `experimental` 是因为尚无主题以默认骨架
 * 采用——保留是为了让"功能介绍 / 销售号"类作者侧场景有现成模板，非待淘汰。
 */
import type { VariantDef } from '../_core';
declare const priceTier: VariantDef;
export default priceTier;
