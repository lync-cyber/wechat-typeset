/**
 * note 容器：第五态补注，与 admonition 四态共用同一壳子，差异化点：
 *   - 色彩走 textMuted / border，不读 tokens.colors.status.*（中性、不情绪化）
 *   - 可选 noteIcon（主题 assets.noteIcon 提供则注入）
 *   - 主题 voice：先读 ctx.containers.note，未声明时走 variant 兜底
 */
import type { ContainerRenderer } from './types';
export declare const noteContainer: ContainerRenderer;
