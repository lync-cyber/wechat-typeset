/**
 * codeBlock · inline-card（编辑随文嵌入式）
 *
 * 设计语言：随文嵌入的引用片段。tinted 软底 + 左主色窄竖条 + 紧凑 padding，
 * 没有顶栏、没有 copy 图标、字号比常规 pre 小 1px——让代码视觉重量"贴回正文"。
 *
 * 与 bare / header-bar 的语义分工：
 *   - bare         = "代码是讲解主体"（默认 pre）
 *   - header-bar   = "代码段落是文档化的"（语言徽章 + copy）
 *   - terminal-frame = "代码是被 run 起来的"（终端腔）
 *   - line-numbers = "代码会被按行号引用"（IDE gutter）
 *   - inline-card  = "代码是文中一笔"（嵌入式短片段）
 *
 * 适合主题：editorial-mook / literary-humanism / life-aesthetic / people-story
 * ——任何代码只在偶尔出现、且作者不愿让它喧宾夺主的文学/生活向稿件家族。
 *
 * 颜色策略：bg = bgSoft、border-left = primary、文字色继承主题 preText/text；
 * 不写死中性灰——这样浅色温润主题 + 暖橙主题切换时背景与左条都会跟随 voice。
 */
import type { CodeBlockDef } from '../_core';
declare const inlineCard: CodeBlockDef;
export default inlineCard;
