/**
 * Container Vocabulary 模块汇总入口。
 *
 * 面向三类消费者：
 *   - pipeline/containers/*：单一真相来源，避免和 ThemeContainers 双契约
 *   - scripts/build-capabilities.ts：生成 capabilities.json 时从此导出枚举
 *   - src/public（LLM 外部 API）：暴露 getContainerVocabulary 等查询函数
 */

export {
  CONTAINER_VOCABULARY,
  CONTAINER_NAMES,
  CONTAINER_STYLE_KEYS,
  CONTAINER_NAME_TO_STYLE_KEY,
  STYLE_KEY_TO_CONTAINER_NAME,
  STYLED_CONTAINERS,
  lookupContainerSpec,
  type ContainerSpec,
  type ContainerCategory,
  type AttrSpec,
} from './vocabulary'

export {
  getContainerVocabulary,
  getContainerSpec,
  getVariantsForContainer,
  getThemeDefaultVariants,
  getContainerSnippet,
  type VariantDescriptor,
  type SnippetOptions,
} from './api'
