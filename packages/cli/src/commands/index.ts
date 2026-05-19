import { createRequire } from 'node:module'
import type { AnyCommand } from '../types'
import { renderCommand } from './render'
import { validateCommand } from './validate'
import { validateSpecCommand } from './validate-spec'
import { validateMarkdownCommand } from './validate-markdown'
import { lintCommand } from './lint'
import { annotateCommand } from './annotate'
import { personasListCommand } from './personas-list'
import { personasGetCommand } from './personas-get'
import { personasCapabilitiesCommand } from './personas-capabilities'
import { personasRecommendCommand } from './personas-recommend'
import { containersListCommand } from './containers-list'
import { containersSnippetCommand } from './containers-snippet'
import { motifRenderCommand } from './motif-render'
import { platformsListCommand } from './platforms-list'
import { bindDescribe, describeCommand } from './describe'

const require_ = createRequire(import.meta.url)
const pkg = require_('../../package.json') as { version: string }

export const COMMANDS: readonly AnyCommand[] = [
  renderCommand,
  validateSpecCommand,
  validateMarkdownCommand,
  validateCommand,
  lintCommand,
  annotateCommand,
  personasListCommand,
  personasGetCommand,
  personasCapabilitiesCommand,
  personasRecommendCommand,
  containersListCommand,
  containersSnippetCommand,
  motifRenderCommand,
  platformsListCommand,
  describeCommand,
] as readonly AnyCommand[]

bindDescribe(COMMANDS, pkg.version)

export const COMMAND_BY_NAME: ReadonlyMap<string, AnyCommand> = new Map(
  COMMANDS.map((c) => [c.name, c]),
)
