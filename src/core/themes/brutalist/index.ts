/**
 * brutalist · 粗野主义报刊（spec-first）
 *
 * 主题 ground truth 在 persona.data.ts；本文件只负责投影为运行时 Theme。
 */

import { specToTheme } from '../_shared/spec'
import { spec } from './persona.data'

export const brutalistTheme = specToTheme(spec)
