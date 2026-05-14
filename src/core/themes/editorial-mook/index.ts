/**
 * editorial-mook · 编辑刊（spec-first 投影）
 *
 * ground truth 在 ./persona.data.ts；本文件仅投影。
 */

import { specToTheme } from '../_shared/spec'
import { spec } from './persona.data'

export const editorialMookTheme = specToTheme(spec)
