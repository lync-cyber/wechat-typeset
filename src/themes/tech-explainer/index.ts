/**
 * tech-explainer · 白昼课堂技术文档（Phase 2 migrated — spec-first）
 *
 * 主题 ground truth 在 persona.spec.ts；本文件只负责投影为运行时 Theme。
 * Palette / 字号 / motif / 元素样式等全部从 spec 读取——要改外观，改 spec。
 */

import { specToTheme } from '../_shared/spec'
import { spec } from './persona.spec'

export const techExplainerTheme = specToTheme(spec)
