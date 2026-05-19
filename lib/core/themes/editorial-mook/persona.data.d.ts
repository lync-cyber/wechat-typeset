/**
 * editorial-mook · 编辑刊 · PersonaSpec
 *
 * 视觉灵魂：POPEYE / BRUTUS 系 mook 杂志—— "余白即语言，圈号即温度"。
 *
 * 视觉 ground truth：docs/themes-specs/themes/04-japanese-mook.html。
 *   - 米白底 #faf6ef + 朱橙主色 #e85a3c + 深蓝灰文字 #2d3a4a
 *   - 直角硬边（radius 全 0）
 *   - 字号普遍偏小（base 13px / h2 14px / h3 11px），line-height 2 留呼吸
 *   - 编集附注用单字 CJK 标签（参 / 編 / 注 / 禁）——mook-tag admonition variant 承载
 *   - 大量留白：spacing.section 48px，让"余白"的视觉变成排印的一部分
 *
 * 与其它"刊物化"主题（data-brief / industry-observer）的边界：
 *   - data-brief 走"数据蓝 + monospace + 直角"——理性、报表感
 *   - industry-observer 走"米暖 + 期号印章 + Stratechery 长读"——评论 newsletter
 *   - editorial-mook 走"米白 + 单字 CJK 附注 + 极小字号"——日系编辑刊的"慢读"气质
 *
 * 三条不可妥协决策：
 *   1. radius 全 0（"圆角即温柔，mook 的温度由色与字距承担，不由圆角"）
 *   2. 单一 accent 朱橙 #e85a3c —— primary = accent，无第二装饰色
 *   3. 多态附注用单字 CJK 标签而非缩写词——编集メモ的母语形态
 *
 * 复用纪律：
 *   - 容器尽量复用 base / data-brief 包（masthead / toc / qa-block / footnotes /
 *     cta-bar / qr-follow / editor-note / colophon）
 *   - 仅新增一个 admonition variant `mook-tag`（CJK 单字标签），不新增任何 styled 容器
 *   - blockquote 用 __reset 表达"裸 1px 左竖线 + 60px 缩进 + 18px 大字"的 pull-quote
 *   - 列表（ul / ol）取消默认 marker，作者自行写 ❶❷❸ / — 等装饰字符
 *
 * 命名：刻意避开"日式 / japanese"字眼，用"编辑刊"承袭 mook 作为出版品类的中文称谓
 *       （POPEYE / BRUTUS 在中文语境是"编辑型 mook 季刊"）。
 */
import type { PersonaSpec } from '../_shared/spec';
export declare const spec: PersonaSpec;
