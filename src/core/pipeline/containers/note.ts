/**
 * note 容器（第五态补注 · R8 独立变体类）
 *
 * R3 重构：走 makeVariantContainer 工厂，与 admonition 四态共用同一壳子，
 * 通过配置项差异化（不读 status 配色 / 走 textMuted、走 NOTE_VARIANTS 表）。
 *
 * 与 admonition 4 态的关键差异（通过工厂配置表达）：
 *   - 色彩走 textMuted / border，不读 tokens.colors.status.*（不情绪化）
 *   - 可选 noteIcon（主题 assets.noteIcon 提供则注入；否则跳过）
 *   - titleCSS 由 variant 提供；与 admonition 同 4 字段契约
 *
 * 主题 voice 接入：先读 ctx.containers.note，主题没声明（或仅声明 margin）时
 * 走 variant 的 wrapperCSS——variants 已是 token 驱动的中性兜底。
 */

import type { ContainerRenderer } from './types'
import { NOTE_VARIANTS } from '../../variants/registry'
import { makeVariantContainer } from './_shared/makeVariantContainer'

export const noteContainer: ContainerRenderer = makeVariantContainer({
  name: 'note',
  themeSlot: 'note',
  table: NOTE_VARIANTS,
  fallbackId: 'minimal-callout',
  title: {
    defaultText: '补注',
    defaultCSS: 'font-weight:600;font-size:13px',
    iconKey: 'noteIcon',
  },
  body: { mode: 'optional' },
})
