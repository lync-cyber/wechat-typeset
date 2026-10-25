/**
 * official-gazette · 公文公报 · PersonaSpec
 *
 * 定位（规范 §0 一句话）：**中央人民政府公报 / 上市公司公告 / 监管文件**这一档严肃文体。
 * 参照坐标：国务院公报 · 证监会公告 · 招股说明书 · 国企年度报告 · 监管声明 · 公开信。
 * 气质关键词：序号、印章、克制、密度、仪式感。
 *
 * 视觉签名三轴：
 *   1. 普鲁士蓝 #1c3a6e（HSL 219° / sat 59% / lum 27%）——比 default 更深、比 industry-observer 更饱和
 *   2. 暗金 #8a6a14——公文红头 + 烫金的视觉记忆；用在印章 / 分隔线 / accent 位
 *   3. 极度克制——无色彩装饰，靠编号 + 框线 + 印章塑造仪式感；letterSpacing 压到 0.2
 *
 * 三条不可妥协决策：
 *   1. primary #1c3a6e：色相 219°落在 215°–225° 窗口，比 default #2558b0（更亮）、
 *      industry-observer #24364f（更碳灰）更饱和、更深——"翻开一份红头文件"的那种蓝
 *   2. h2Numbering 中文章节序号（一、二、三）：公文格式规范要求，不做 roman / arabic
 *   3. 底色铜版纸微米色 #faf8f3，bg/bgSoft/bgMuted 三档差值 ≤ 5%——公文不需要分层热闹
 */
import type { PersonaSpec } from '../_shared/spec';
export declare const spec: PersonaSpec;
