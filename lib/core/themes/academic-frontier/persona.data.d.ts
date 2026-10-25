/**
 * academic-frontier · 学术前沿 · PersonaSpec
 *
 * 定位（规范 §0 一句话）：**同行评审级的学术论文被搬到公众号**。
 * 参照坐标：Nature / Science / Cell 正刊 · arXiv preprint · LaTeX article 默认输出 ·
 *   ACM / IEEE transactions · Anthropic/OpenAI research 页面 · Knuth TAOCP 脚注纪律。
 * 气质关键词：**论文、证据、克制、无装饰**。
 *
 * 与 tech-geek 的硬边界（规范 §0）：
 *   - 底色白 vs 暖黑；编号 1.1 vs §；引用上标 ¹²³ vs 方括号 [1]；主色深靛 vs VT220 琥珀
 *
 * 与 business-finance 的硬边界（规范 §0）：
 *   - `<strong>` **几乎不用**（business 承载核心判断）；强调走 `<em>` italic
 *   - 禁用涨跌色隐喻；footer = 致谢 + Cite As（不是订阅钩子）
 *   - highlight = Key Finding 文字卡（不是巨号数字 callout）
 *   - compare = ablation table（不是两栏 pros/cons 或 ledger）
 *
 * 三条不可妥协决策（规范 §4 结语）：
 *   1. primary 深靛 #1e2c4a 而非暗酒红（Nature/NeurIPS 家族 + 避开中文语境"党政红书封"误读）
 *   2. 极少装饰是纪律——仅 theoremMark ■ + 1px h2 竖线 + 极细 rule；删除 wave / flower
 *   3. 四态辨识靠英文术语标签（Definition. / Methods. / Limitations. / Fallacy.）+ 形状
 *      冗余（左竖条 / 下划线 / 虚线框 / L 形缺角），accent 色只做冗余信号
 *
 * accent 稀缺纪律：深酒红 #8a2a2a 每篇最多 5 次（danger 外框 + danger 标签 +
 *   Finding 竖条 + Finding 标签 + DOI 锚色）——超 5 次即降格。
 */
import type { PersonaSpec } from '../_shared/spec';
export declare const spec: PersonaSpec;
