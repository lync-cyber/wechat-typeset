import './shim'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { EXIT_CODES, WtException } from '../../../src/public'
import { COMMAND_BY_NAME, COMMANDS } from './commands/index'
import type { AnyCommand } from './types'

const FILE_FLAGS: Record<string, string> = {
  input: 'md',
  spec: 'spec',
}

function readStdin(): Promise<string> {
  return new Promise((resolveStdin) => {
    let buf = ''
    process.stdin.setEncoding('utf8')
    process.stdin.on('data', (chunk: string) => {
      buf += chunk
    })
    process.stdin.on('end', () => resolveStdin(buf))
  })
}

function fail(code: number, msg: string): never {
  process.stderr.write(`[wechat-typeset] ${msg}\n`)
  process.exit(code)
}

function matchCommand(argv: string[]): { cmd: AnyCommand; rest: string[] } {
  const tokens: string[] = []
  let i = 0
  while (i < argv.length && !argv[i].startsWith('--')) {
    tokens.push(argv[i])
    i++
  }
  if (tokens.length === 0) {
    const names = COMMANDS.map((c) => c.name).join('\n  ')
    fail(1, `expected a command. Available:\n  ${names}\n`)
  }
  for (let n = tokens.length; n >= 1; n--) {
    const name = tokens.slice(0, n).join(' ')
    const cmd = COMMAND_BY_NAME.get(name)
    if (cmd) {
      return { cmd, rest: argv.slice(n) }
    }
  }
  const names = COMMANDS.map((c) => c.name).join(', ')
  fail(1, `unknown command "${tokens.join(' ')}". Available: ${names}`)
}

async function buildInput(
  cmd: AnyCommand,
  flags: string[],
): Promise<unknown> {
  if (flags.includes('--json')) {
    const raw = await readStdin()
    if (!raw.trim()) return {}
    try {
      return JSON.parse(raw) as unknown
    } catch (e) {
      fail(1, `--json mode: failed to parse stdin: ${(e as Error).message}`)
    }
  }
  const input: Record<string, unknown> = {}
  for (let i = 0; i < flags.length; i++) {
    const k = flags[i]
    if (!k.startsWith('--')) fail(1, `expected flag, got "${k}"`)
    const key = k.slice(2)
    if (key === 'json') continue
    const next = flags[i + 1]
    if (next === undefined || next.startsWith('--')) {
      input[key] = true
      continue
    }
    const value = next
    i++
    if (key in FILE_FLAGS) {
      const target = FILE_FLAGS[key]
      try {
        const content = readFileSync(resolve(process.cwd(), value), 'utf8')
        input[target] = target === 'spec' ? (JSON.parse(content) as unknown) : content
      } catch (e) {
        fail(1, `--${key}: ${(e as Error).message}`)
      }
      continue
    }
    input[key] = value
  }
  // 把 inputSchema 没声明的 flag 也透传——schema 强约束的命令（如 motif render）走 --json
  const schema = cmd.inputSchema
  if (schema?.type === 'object' && schema.properties) {
    const known = new Set(Object.keys(schema.properties))
    for (const k of Object.keys(input)) {
      if (!known.has(k) && k !== 'json') {
        fail(
          1,
          `unknown flag --${k} for command "${cmd.name}". Known: ${[...known].join(', ')}`,
        )
      }
    }
  }
  return input
}

function emit(payload: unknown): void {
  if (typeof payload === 'string') {
    process.stdout.write(payload.endsWith('\n') ? payload : payload + '\n')
    return
  }
  process.stdout.write(JSON.stringify(payload, null, 2) + '\n')
}

export async function dispatch(argv: string[]): Promise<number> {
  const { cmd, rest } = matchCommand(argv)
  let input: unknown
  try {
    input = await buildInput(cmd, rest)
  } catch (e) {
    if (e instanceof WtException) {
      process.stdout.write(
        JSON.stringify({ ok: false, code: e.code, errors: e.errors, warnings: e.warnings }, null, 2) +
          '\n',
      )
      return EXIT_CODES[e.code]
    }
    process.stderr.write(`[wechat-typeset] input error: ${(e as Error).message}\n`)
    return 1
  }
  try {
    const out = await cmd.run(input as never)
    emit(out)
    if (
      out !== null &&
      typeof out === 'object' &&
      'ok' in (out as Record<string, unknown>) &&
      (out as { ok?: unknown }).ok === false
    ) {
      return 2
    }
    return 0
  } catch (e) {
    if (e instanceof WtException) {
      emit({ ok: false, code: e.code, errors: e.errors, warnings: e.warnings })
      return EXIT_CODES[e.code]
    }
    process.stderr.write(`[wechat-typeset] ${cmd.name}: ${(e as Error).message}\n`)
    if ((e as Error).stack) {
      process.stderr.write((e as Error).stack + '\n')
    }
    return EXIT_CODES.RENDER_FAILED
  }
}
