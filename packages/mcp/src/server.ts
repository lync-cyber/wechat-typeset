// 高层 `McpServer.registerTool` 走 Zod；我们手里是纯 JSON Schema。所以用低层
// `Server` + setRequestHandler 自己应答 `tools/list` / `tools/call`，这样能把
// COMMANDS 的 inputSchema 原样透传给客户端。
import '../../cli/src/shim'
import { createRequire } from 'node:module'
import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'
import { COMMANDS, COMMAND_BY_NAME } from '../../cli/src/commands/index'
import { EXIT_CODES, WtException } from '../../../src/public'

const require_ = createRequire(import.meta.url)
const pkg = require_('../package.json') as { version: string }

function toToolName(commandName: string): string {
  return commandName.replace(/\s+/g, '_')
}

const TOOL_TO_COMMAND = new Map<string, string>(
  COMMANDS.map((c) => [toToolName(c.name), c.name]),
)

export function buildServer(): Server {
  const server = new Server(
    { name: 'wechat-typeset', version: pkg.version },
    { capabilities: { tools: {} } },
  )

  server.setRequestHandler(ListToolsRequestSchema, () => ({
    tools: COMMANDS.map((c) => ({
      name: toToolName(c.name),
      description: c.description,
      inputSchema: c.inputSchema as Record<string, unknown>,
    })),
  }))

  server.setRequestHandler(CallToolRequestSchema, async (req) => {
    const toolName = req.params.name
    const commandName = TOOL_TO_COMMAND.get(toolName)
    const cmd = commandName ? COMMAND_BY_NAME.get(commandName) : undefined
    if (!cmd) {
      return {
        isError: true,
        content: [{ type: 'text', text: `unknown tool: ${toolName}` }],
      }
    }
    try {
      const out = await cmd.run((req.params.arguments ?? {}) as never)
      return {
        content: [
          {
            type: 'text',
            text: typeof out === 'string' ? out : JSON.stringify(out, null, 2),
          },
        ],
      }
    } catch (e) {
      if (e instanceof WtException) {
        const extra = e.errors.length > 1 ? ` (+${e.errors.length - 1} more)` : ''
        const firstMsg = e.errors[0]?.message ?? e.code
        return {
          isError: true,
          content: [{ type: 'text', text: `${e.code}: ${firstMsg}${extra}` }],
          structuredContent: {
            code: e.code,
            exitCode: EXIT_CODES[e.code],
            errors: e.errors,
            warnings: e.warnings,
          },
        }
      }
      return {
        isError: true,
        content: [{ type: 'text', text: `RENDER_FAILED: ${(e as Error).message}` }],
        structuredContent: {
          code: 'RENDER_FAILED',
          exitCode: EXIT_CODES.RENDER_FAILED,
          errors: [{ message: (e as Error).message, severity: 'error' }],
          warnings: [],
        },
      }
    }
  })

  return server
}

export async function startStdioServer(): Promise<void> {
  const server = buildServer()
  const transport = new StdioServerTransport()
  await server.connect(transport)
}
