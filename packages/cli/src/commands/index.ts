import { createRequire } from 'node:module'
import type { AnyCommand } from '../types'
import { renderCommand } from './render'
import { validateCommand } from './validate'
import { validateSpecCommand } from './validate-spec'
import { validateMarkdownCommand } from './validate-markdown'
import { lintCommand } from './lint'
import { annotateCommand } from './annotate'
import { annotateApplyCommand } from './annotate-apply'
import { markdownRenderBatchCommand } from './markdown-render-batch'
import { personasListCommand } from './personas-list'
import { personasGetCommand } from './personas-get'
import { personasCapabilitiesCommand } from './personas-capabilities'
import { personasRecommendCommand } from './personas-recommend'
import { personasDeriveCommand } from './personas-derive'
import { personaMotifsCommand } from './persona-motifs'
import { containersListCommand } from './containers-list'
import { containersGetCommand } from './containers-get'
import { containersSnippetCommand } from './containers-snippet'
import { containersVariantsCommand } from './containers-variants'
import { inlineExtensionsListCommand } from './inline-extensions-list'
import { inlineExtensionsSnippetCommand } from './inline-extensions-snippet'
import { frontmatterParseCommand } from './frontmatter-parse'
import { capabilitiesCommand } from './capabilities'
import { errorCodesListCommand } from './error-codes-list'
import { schemaGetCommand } from './schema-get'
import { motifRenderCommand } from './motif-render'
import { platformsListCommand } from './platforms-list'
import { variantDiffGeometryCommand } from './variant-diff-geometry'
import { paletteLookupTokenCommand } from './palette-lookup-token'
import { bindDescribe, describeCommand } from './describe'

const require_ = createRequire(import.meta.url)
const pkg = require_('../../package.json') as { version: string }

const CANONICAL_COMMANDS: readonly AnyCommand[] = [
  renderCommand,
  validateSpecCommand,
  validateMarkdownCommand,
  validateCommand,
  lintCommand,
  annotateCommand,
  annotateApplyCommand,
  markdownRenderBatchCommand,
  personasListCommand,
  personasGetCommand,
  personasCapabilitiesCommand,
  personasRecommendCommand,
  personasDeriveCommand,
  personaMotifsCommand,
  containersListCommand,
  containersGetCommand,
  containersSnippetCommand,
  containersVariantsCommand,
  inlineExtensionsListCommand,
  inlineExtensionsSnippetCommand,
  frontmatterParseCommand,
  capabilitiesCommand,
  errorCodesListCommand,
  schemaGetCommand,
  motifRenderCommand,
  platformsListCommand,
  variantDiffGeometryCommand,
  paletteLookupTokenCommand,
  describeCommand,
] as readonly AnyCommand[]

/**
 * Deprecation 窗口：bare-verb 旧名（render / lint / annotate / annotate apply）保留为
 * canonical `markdown <verb>` 的薄 alias。alias 与 canonical 共享同一个 run() —— 不复制
 * 业务逻辑。每个 alias 的 description 前缀 `DEPRECATED alias of ...` 让 LLM 自我迁移。
 *
 * 计划：minor 周期登记进 capabilities.deprecations[]；下一个 major 移除。
 */
const DEPRECATED_ALIASES: ReadonlyArray<{ oldName: string; canonical: AnyCommand }> = [
  { oldName: 'render', canonical: renderCommand },
  { oldName: 'lint', canonical: lintCommand },
  { oldName: 'annotate', canonical: annotateCommand },
  { oldName: 'annotate apply', canonical: annotateApplyCommand },
] as const

const ALIAS_COMMANDS: readonly AnyCommand[] = DEPRECATED_ALIASES.map(
  ({ oldName, canonical }) => ({
    ...canonical,
    name: oldName,
    description: `DEPRECATED alias of \`${canonical.name}\`. ${canonical.description}`,
  }),
)

export const COMMANDS: readonly AnyCommand[] = [
  ...CANONICAL_COMMANDS,
  ...ALIAS_COMMANDS,
] as readonly AnyCommand[]

bindDescribe(COMMANDS, pkg.version)

export const COMMAND_BY_NAME: ReadonlyMap<string, AnyCommand> = new Map(
  COMMANDS.map((c) => [c.name, c]),
)

export const DEPRECATED_ALIAS_NAMES: ReadonlyArray<string> = DEPRECATED_ALIASES.map(
  (a) => a.oldName,
)
