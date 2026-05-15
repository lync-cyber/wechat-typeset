import type { JSONSchema7 } from '../../../src/public'

export type { JSONSchema7 } from '../../../src/public'

export interface Command<I = unknown, O = unknown> {
  name: string
  description: string
  inputSchema: JSONSchema7
  outputSchema: JSONSchema7
  run(input: I): Promise<O> | O
}

export type AnyCommand = Command<unknown, unknown>

export interface DispatchResult {
  ok: boolean
  exitCode: number
  output: unknown
}
