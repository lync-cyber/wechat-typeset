/**
 * industry-observer · 行业观察周刊 · PersonaSpec
 *
 * 定位（规范 §0）：**周报 / 深度稿 / analyst essay 的公众号呈现**。
 * 参照：Stratechery · Benedict Evans Weekly · The Information · 晚点 LatePost ·
 *       《财新周刊》深度报道。气质关键词：周报、断言、矩阵、issue 感。
 *
 * 与 business-finance 的硬边界（规范 §0 表）：
 *   - 底色暖米 vs 深栗墨 —— 色相近乎对顶，两主题同展读者体温立刻不同
 *   - highlight 不做巨号数据卡 —— 数字服从洞察，不是反过来
 *   - compare 不做 ledger 账本 —— 多列矩阵 vs 两列正反
 *   - divider 禁用 wave —— K 线是 business 瑰宝
 *
 * 与 academic-frontier 的硬边界（规范 §0 表）：
 *   - `<strong>` 鼓励使用（academic 禁用）—— 观察稿靠断言锚定
 *   - 底色微暖米（academic 纯白）—— newsletter 温度 vs 论文冷
 *
 * 三条签名动作（规范 §结语）：
 *   1. primary 深墨蓝 #24364f + accent 橙金 #b86f2a，底色 Stratechery 米 #fbf8f1
 *   2. Issue stamp 跨容器印章 —— cover/author/footerCTA 都可挂，由 attrs 注入
 *   3. Pull-quote 完整断言 + attribution —— 22/500 + 左右双 primary 竖线
 */
import type { PersonaSpec } from '../_shared/spec';
export declare const spec: PersonaSpec;
