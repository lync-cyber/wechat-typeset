/**
 * people-story · 人物特稿（Phase 2 migrated — spec-first）
 *
 * 主题 ground truth 在 persona.spec.ts；本文件只负责投影为运行时 Theme。
 * accent 稀缺纪律 / drop cap / h2 罗马数字等全部从 spec 读取——要改外观，改 spec。
 */

import { specToTheme } from '../_shared/spec'
import { spec } from './persona.spec'

export const peopleStoryTheme = specToTheme(spec)
