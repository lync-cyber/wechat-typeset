// Cross-platform process + filesystem helpers used by detectors.

import { spawn, type SpawnOptions } from 'node:child_process'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'

export interface RunResult {
  stdout: string
  stderr: string
  code: number | null
}

export async function run(
  cmd: string,
  args: string[],
  opts: SpawnOptions & { input?: string } = {},
): Promise<RunResult> {
  return new Promise((resolve) => {
    const proc = spawn(cmd, args, {
      shell: process.platform === 'win32',
      stdio: ['pipe', 'pipe', 'pipe'],
      ...opts,
    })
    let stdout = ''
    let stderr = ''
    proc.stdout?.on('data', (b) => (stdout += b.toString()))
    proc.stderr?.on('data', (b) => (stderr += b.toString()))
    proc.on('close', (code) => resolve({ stdout, stderr, code }))
    proc.on('error', (err) => resolve({ stdout, stderr: stderr + String(err), code: 1 }))
    if (opts.input) {
      proc.stdin?.write(opts.input)
      proc.stdin?.end()
    }
  })
}

export const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx'

export async function exists(p: string): Promise<boolean> {
  try {
    await fs.access(p)
    return true
  } catch {
    return false
  }
}

export async function readJsonSafe<T = unknown>(p: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(p, 'utf-8')
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export async function writeJson(p: string, data: unknown): Promise<void> {
  await fs.mkdir(path.dirname(p), { recursive: true })
  await fs.writeFile(p, JSON.stringify(data, null, 2), 'utf-8')
}

export function relPath(root: string, abs: string): string {
  return path.relative(root, abs).split(path.sep).join('/')
}

// ESM-safe equivalent of require.resolve — just check that the module's
// package.json sits in node_modules. Good enough for the "is this dep
// installed?" question that detectors ask.
export async function toolAvailable(moduleName: string, root: string): Promise<boolean> {
  return exists(path.join(root, 'node_modules', moduleName, 'package.json'))
}
