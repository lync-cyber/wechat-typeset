/**
 * admonition · slab-corner（粗野板块 / brutalist callout）
 *
 * 专为 brutalist 主题设计：punk-zine / mook 编辑 / data-brief 的"硬边块"信号。
 * 与 news-row 的差异：news-row 是横向 table-cell 单行（紧凑罗列），slab-corner
 * 是带 padding 的纵向卡片（一态一块，承担更长正文），两者各取一种"硬色块"母语。
 *
 * 视觉骨架（四态同构，仅 accent 色 + 徽章字不同）：
 *   - 顶部 6px accent 实条（粗野"色块边界"，与 brutalist radius=0 纪律统一）
 *   - 顶端右对齐 accent fill 大写徽章（INFO/TIP/WARN/STOP，square block，零圆角）
 *   - 内容区 pair.soft 软底 + 大 padding，让大字号正文呼吸
 *   - radius:0 全局硬边
 *
 * 设计纪律：
 *   - titleCSS='' 暗号：renderer 跳过默认 title 行；徽章直接走 svgSlot 渲染
 *   - 徽章块走 `text-align:right` + inline-block 实现"右上锚点"；不走 float / absolute
 *     （前者被微信剥，后者 wxPatch 删 position）
 *   - 不渲染 status icon：slab-corner 的语义信号靠**色相 + 大写徽章字**，icon 反而成噪音
 */
import type { VariantDef, AdmonitionRenderArgs } from '../_core';
declare const slabCorner: VariantDef<AdmonitionRenderArgs>;
export default slabCorner;
