/**
 * footnotes · boxed-aside（编辑随谈卡片）
 *
 * 设计语言：杂志栏目末尾的"编者随谈" / Notion callout 卡片。
 *   - 圆角软底卡 + 1px 边框，把脚注从"末尾附注"提升为"narrative aside"
 *   - kicker 显示为一颗实色 pill 徽章，与 quote-card 的署名行同一手势
 *   - 当脚注承担"主笔评注"而非"引文索引"时使用——读者会逐条读，不只扫一眼
 *
 * 适合主题：literary-humanism / editorial-mook / people-story / life-aesthetic
 * ——任何"末尾还有话要说"的文学叙事家族。
 *
 * 与其他三档脚注的分工：
 *   - lined         = 标准悬挂缩进（"列出引用"）
 *   - inline-flow   = 流式段落 + 内滚动（"长文献列表"）
 *   - boxed-aside   = 卡片化"narrative 旁白"（**本文件**）
 *   - top-rule      = 报纸尾注（精简事实索引）
 *   - dense-academic = 论文级 bibliography（深 hanging + 11px）
 */
import type { VariantDef } from '../_core';
declare const boxedAside: VariantDef;
export default boxedAside;
