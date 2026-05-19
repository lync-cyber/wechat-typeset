/**
 * admonition · magazine-pull（杂志拉引框）
 *
 * 专为 people-story 主题设计：取《人物》/《纽约客》/《GQ》特稿里的
 * "pull-quote 拉引框"——**上下细线、无左竖线、标题浮在上线之上**。
 *
 * 结构：
 *   - 顶+底各一根 1px 实线（accent 色）
 *   - 上线正中留一处"缺口"，缺口里嵌一条全大写小字标签
 *     （背景色 = 主题 bg，正好盖住上线视觉——手工"剪开再贴标签"的杂志版式）
 *   - 无左右边、无圆角、无填充，克制到留白是主视觉
 *   - 正文字号与行高比正文更舒展（line-height 1.9）
 *   - 底部可选右对齐署名（预留给未来 attr=byline）
 */
import type { VariantDef, AdmonitionRenderArgs } from '../_core';
declare const magazinePull: VariantDef<AdmonitionRenderArgs>;
export default magazinePull;
