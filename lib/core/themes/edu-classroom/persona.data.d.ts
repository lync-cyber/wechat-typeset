/**
 * edu-classroom · 教室课堂 · PersonaSpec
 *
 * 定位：服务"耐心讲解 / 步骤分解 / 友好亲切 / 不卡通化"的教育内容。
 * 受众：K-12 教育 / 亲子科普 / 童书推荐 / 兴趣启蒙 / 知识自习 / 家长读物。
 *
 * 视觉三锚点（不可移动）：
 *   1. primary = #2e7d32（森林绿，黑板/草地联想，HSL 123° 49% 31%）
 *   2. accent  = #f57c00（暖橙，教师标红/启发感，与 primary 互补）
 *   3. bg      = #fdfcf7（教科书铜版纸，微暖底，不纯白）
 *
 * 与 tech-explainer 的硬边界：
 *   - 色系 180° 反向（森林绿暖底 vs 文档蓝冷白）
 *   - 受众关系：亲切引导（K-12 / 家长）vs 手把手程序员文档
 *   - admonition 走 card-shadow（柔和卡片感），非 accent-bar
 *   - radius.lg = 14（圆润），非 6-10（方正文档感）
 */
import type { PersonaSpec } from '../_shared/spec';
export declare const spec: PersonaSpec;
