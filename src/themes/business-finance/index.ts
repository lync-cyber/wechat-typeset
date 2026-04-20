/**
 * business-finance · 硬核财经（Phase 2 migrated — spec-first）
 *
 * 主题 ground truth 在 persona.spec.ts；本文件只负责投影为运行时 Theme。
 */

import { specToTheme } from '../_shared/spec'
import { spec } from './persona.spec'

export const businessFinanceTheme = specToTheme(spec)
