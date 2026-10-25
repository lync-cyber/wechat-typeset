/**
 * footnotes · dense-academic（论文 bibliography）
 *
 * 设计语言：学术期刊 / 论文末尾的参考文献章。
 *   - 深 hanging indent（2.4em）—— 编号 [1][2] 视觉上"挂"在文段左侧，正文整齐回缩
 *   - 11px 字号 + 1.4 line-height —— 信息密度推到接近"参考列表"的极限
 *   - 顶部细栏一道 2px primary 实线（不同于 top-rule 的 hairline；这里是"章节级"分割）
 *   - kicker 走粗体 + 中等 letter-spacing，承载"参考文献 / REFERENCES"这样的标题
 *
 * 适合主题：academic-frontier / business-finance / industry-observer
 * ——任何作者会写 [Author 2023] 或 [^citation] 序号挂载的研究 / 内参家族。
 *
 * 与 lined / top-rule 的分工：
 *   - lined          = 1.6em hanging + 13px（默认，5-10 条短引用）
 *   - top-rule       = hairline 顶栏 + 11px（报纸尾注）
 *   - dense-academic = 2.4em hanging + 11px + 顶部 2px 章节线（**本文件**）
 *
 * 视觉抓点：左 24px 编号缩进 + 顶部彩色章节杆 —— 远离另外两档"克制"路径，
 * 主动承担"这一段是被引用的"识别功能。
 */
import type { VariantDef } from '../_core';
declare const denseAcademic: VariantDef;
export default denseAcademic;
