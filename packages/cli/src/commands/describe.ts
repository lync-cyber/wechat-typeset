import type { Command, JSONSchema7 } from '../types'

interface DescribeEntry {
  name: string
  description: string
  inputSchema: JSONSchema7
  outputSchema: JSONSchema7
}

interface DescribeOutput {
  version: string
  commands: DescribeEntry[]
}

let registry: readonly Command[] = []
let toolVersion = '0.0.0'

export function bindDescribe(commands: readonly Command[], version: string): void {
  registry = commands
  toolVersion = version
}

export const describeCommand: Command<Record<string, never>, DescribeOutput> = {
  name: 'describe',
  description:
    'Self-describing manifest: returns every command name / description / inputSchema / outputSchema. MCP / LLM tool registries consume this to auto-register.',
  inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  outputSchema: {
    type: 'object',
    required: ['version', 'commands'],
    properties: {
      version: { type: 'string' },
      commands: {
        type: 'array',
        items: {
          type: 'object',
          required: ['name', 'description', 'inputSchema', 'outputSchema'],
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            inputSchema: { type: 'object', additionalProperties: true },
            outputSchema: { type: 'object', additionalProperties: true },
          },
          additionalProperties: false,
        },
      },
    },
    additionalProperties: false,
  },
  run() {
    return {
      version: toolVersion,
      commands: registry.map((c) => ({
        name: c.name,
        description: c.description,
        inputSchema: c.inputSchema,
        outputSchema: c.outputSchema,
      })),
    }
  },
}
