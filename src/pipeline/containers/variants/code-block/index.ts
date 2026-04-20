import type { CodeBlockVariantId } from '../../../../themes/types'
import type { CodeBlockVariant } from '../registry'
import { bare } from './bare'
import { headerBar } from './header-bar'

export const CODE_BLOCK_VARIANTS: Record<CodeBlockVariantId, CodeBlockVariant> = {
  bare,
  'header-bar': headerBar,
}
