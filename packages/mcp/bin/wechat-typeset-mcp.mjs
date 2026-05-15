#!/usr/bin/env tsx
// stdio MCP server 入口。
import { startStdioServer } from '../src/server.ts'

startStdioServer().catch((e) => {
  process.stderr.write(`[wechat-typeset-mcp] fatal: ${e instanceof Error ? e.message : String(e)}\n`)
  process.exit(1)
})
