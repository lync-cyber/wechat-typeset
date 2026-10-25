/**
 * compare · data-card（数据卡）
 *
 * data-brief 家族签名：顶 3px primary/danger 色条 + bgSoft 底 + 标签 kicker +
 * 大号 monospace 数字 + 小字 caption。视觉气质：晚点 / 财新数据的"纸 本 +37% / 屏 读 +210%"
 * 横向对比卡，区别于 ledger 的"绿/红双色块整面平铺"。
 *
 * 定位：现状骨架级 variant，与设计稿主题轴正交。适用于数据简报 / KPI 横向对比 /
 * 财新数据卡 等"两组关键数字 + 标签 + 说明"场景；data-brief / industry-observer /
 * commerce-pulse 已默认采用，其余主题作者可显式 attrs.variant=data-card 切换。
 *
 * 实现纪律：
 *   - 保留 column-card 的 display:table 骨架（避开 flex/grid 在公众号粘贴期被剥）
 *   - pros = primary 蓝顶条（"正面/基线"），cons = danger 红顶条（"反面/异常"）
 *   - 内部 padding 偏紧（12px 横向 + 10–12 纵向）以贴近设计稿数据卡密度
 *   - bgSoft 底 + 无圆角 + 内部无边框分割 —— 全部交给顶部色条做语义
 *   - titleCSS 渲染 "纸 本"/"屏 读" 小字 kicker
 *   - **首选**：作者用 `value="…"` + `caption="…"` 两个 attr 让 variant 自己排"大号
 *     数字 + 小字说明"——结构稳，不被 markdown 段落 `<p>` 吞掉 `display:block`。
 *     body 内容（如果作者非要写）仍渲染，作为 secondary slot。
 *   - **fallback**：作者也可以在 body 里写 inline `<span style="...">+37%</span>`，
 *     但 markdown 会把它包进 `<p>`，破坏块级排版——保留兼容但不推荐。
 */
import type { VariantDef, CompareRenderArgs } from '../_core';
declare const dataCard: VariantDef<CompareRenderArgs>;
export default dataCard;
