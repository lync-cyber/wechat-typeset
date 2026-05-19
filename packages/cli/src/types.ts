import type { JSONSchema7 } from '../../../src/public'

export type { JSONSchema7 } from '../../../src/public'

export interface Command<I = unknown, O = unknown> {
  name: string
  description: string
  inputSchema: JSONSchema7
  outputSchema: JSONSchema7
  /**
   * Idempotency / side-effect signal. `true` = pure read; safe for MCP clients to call
   * speculatively, cache, or auto-retry. `false` = write / persist / state-mutating.
   *
   * All current CLI commands are pure reads (true). Future "persist" / "save" type
   * commands must explicitly declare `readOnly: false`.
   */
  readOnly: boolean
  run(input: I): Promise<O> | O
}

export type AnyCommand = Command<unknown, unknown>
