/**
 * compare · ledger（账本双色列）
 *
 * 外框一整块圆角矩形，中间 1px 竖线分隔；左右两列各用 tip.soft / danger.soft 垫底，
 * 像老账本的"收入 / 支出"对账。保留 column-card 的 display:table 骨架，仅底色和边框不同。
 *
 * 定位：现状骨架级 variant，与设计稿主题轴正交。适用于财务对账 / 收入 vs 支出 /
 * 利好 vs 风险 等"二元对照 + 绿红色码"业务场景；business-finance / commerce-pulse
 * 等带"账本气质"主题可直接 attrs.variant=ledger 切换，不依赖主题 default。
 */
import type { VariantDef, CompareRenderArgs } from '../_core';
declare const ledger: VariantDef<CompareRenderArgs>;
export default ledger;
