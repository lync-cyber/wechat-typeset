/**
 * youth-zine · 青年潮志 · PersonaSpec
 *
 * 本主题升级了 5 个 orphan variant 为默认骨架：
 *   - admonition: pill-tag   （青年感胶囊标签）
 *   - dialogue:   chat-bubbles（IM 风对话气泡）
 *   - gallery:    triptych    （三宫格安利）
 *   - pullQuote:  stamp-quote （盖戳印章感）
 *   - announcement: ai-notice（AI 注释卡感）
 *
 * 视觉签名：
 *   - Primary #e91e63（玫粉 / hot pink，色相 ≈ 333°，严格落在 320°-340° 区间）
 *   - 纯白底 #ffffff + 微粉调 bgSoft #fdf6f8
 *   - 圆角更圆：radius.lg = 14
 *   - 行高 1.85——青年短段落需要更多呼吸
 *   - 胶囊高亮标签：inline.highlight 加 borderRadius + 内边距
 */
import type { PersonaSpec } from '../_shared/spec';
export declare const spec: PersonaSpec;
