import {
  HARD_RULES,
  WT_ERROR_INFO,
  getInlineExtensions,
  getSupportedSignatureContainers,
  getVariantIds,
  listPublishPlatforms,
  type WtErrorCode,
} from '../../../../src/public'
import type { Command, JSONSchema7 } from '../types'

interface DescribeEntry {
  name: string
  description: string
  inputSchema: JSONSchema7
  outputSchema: JSONSchema7
  readOnly: boolean
}

interface DescribeErrorCode {
  code: string
  exitCode: number
  description: string
}

interface DescribePlatform {
  id: string
  name: string
  status: string
}

interface DescribeInlineExtension {
  syntax: string
  description: string
  regex: string
  inputExample: string
  outputHtmlExample: string
}

interface DescribeHardRules {
  minFontSize: number
  minStrokeWidth: number
  allowedFontFamilies: readonly string[]
  hexPattern: string
}

interface DescribeOutput {
  version: string
  commands: DescribeEntry[]
  errorCodes: DescribeErrorCode[]
  platforms: DescribePlatform[]
  variantIds: Record<string, readonly string[]>
  signatureContainers: readonly string[]
  hardRules: DescribeHardRules
  inlineExtensions: DescribeInlineExtension[]
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
    'Self-describing manifest: returns every command name / description / inputSchema / outputSchema, plus error-code catalog, registered platforms, variantIds whitelist, signatureContainers whitelist, hard-rule thresholds, and inline-extension catalog. One call gives MCP / LLM tool registries everything needed to register and reason about the tool.',
  inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  outputSchema: {
    type: 'object',
    required: [
      'version',
      'commands',
      'errorCodes',
      'platforms',
      'variantIds',
      'signatureContainers',
      'hardRules',
      'inlineExtensions',
    ],
    properties: {
      version: { type: 'string' },
      commands: {
        type: 'array',
        items: {
          type: 'object',
          required: ['name', 'description', 'inputSchema', 'outputSchema', 'readOnly'],
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            inputSchema: { type: 'object', additionalProperties: true },
            outputSchema: { type: 'object', additionalProperties: true },
            readOnly: {
              type: 'boolean',
              description:
                'true = pure read (safe to cache / retry / call speculatively); false = state-mutating write.',
            },
          },
          additionalProperties: false,
        },
      },
      errorCodes: {
        type: 'array',
        items: {
          type: 'object',
          required: ['code', 'exitCode', 'description'],
          properties: {
            code: { type: 'string' },
            exitCode: { type: 'integer' },
            description: { type: 'string' },
          },
          additionalProperties: false,
        },
      },
      platforms: {
        type: 'array',
        items: {
          type: 'object',
          required: ['id', 'name', 'status'],
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            status: { type: 'string' },
          },
          additionalProperties: false,
        },
      },
      variantIds: {
        type: 'object',
        description: 'Whitelist of variant ids per VariantKind. Validators reject anything outside.',
        additionalProperties: { type: 'array', items: { type: 'string' } },
      },
      signatureContainers: {
        type: 'array',
        items: { type: 'string' },
      },
      hardRules: {
        type: 'object',
        required: ['minFontSize', 'minStrokeWidth', 'allowedFontFamilies', 'hexPattern'],
        properties: {
          minFontSize: { type: 'integer' },
          minStrokeWidth: { type: 'number' },
          allowedFontFamilies: { type: 'array', items: { type: 'string' } },
          hexPattern: { type: 'string' },
        },
        additionalProperties: false,
      },
      inlineExtensions: {
        type: 'array',
        items: {
          type: 'object',
          required: ['syntax', 'description', 'regex', 'inputExample', 'outputHtmlExample'],
          properties: {
            syntax: { type: 'string' },
            description: { type: 'string' },
            regex: { type: 'string' },
            inputExample: { type: 'string' },
            outputHtmlExample: { type: 'string' },
          },
          additionalProperties: false,
        },
      },
    },
    additionalProperties: false,
  },
  readOnly: true,
  run() {
    const errorCodes: DescribeErrorCode[] = (
      Object.keys(WT_ERROR_INFO) as WtErrorCode[]
    ).map((code) => ({
      code,
      exitCode: WT_ERROR_INFO[code].exitCode,
      description: WT_ERROR_INFO[code].description,
    }))
    const platforms: DescribePlatform[] = listPublishPlatforms().map((p) => ({
      id: p.id,
      name: p.name,
      status: p.status,
    }))
    const variantIds: Record<string, readonly string[]> = {}
    const allVariantIds = getVariantIds() as Record<string, readonly string[]>
    for (const kind of Object.keys(allVariantIds)) {
      variantIds[kind] = allVariantIds[kind]
    }
    const inlineExtensions: DescribeInlineExtension[] = getInlineExtensions().map((ext) => ({
      syntax: ext.syntax,
      description: ext.description,
      regex: ext.regex,
      inputExample: ext.inputExample,
      outputHtmlExample: ext.outputHtmlExample,
    }))
    return {
      version: toolVersion,
      commands: registry.map((c) => ({
        name: c.name,
        description: c.description,
        inputSchema: c.inputSchema,
        outputSchema: c.outputSchema,
        readOnly: c.readOnly,
      })),
      errorCodes,
      platforms,
      variantIds,
      signatureContainers: getSupportedSignatureContainers(),
      hardRules: {
        minFontSize: HARD_RULES.minFontSize,
        minStrokeWidth: HARD_RULES.minStrokeWidth,
        allowedFontFamilies: HARD_RULES.allowedFontFamilies,
        hexPattern: HARD_RULES.hexPattern,
      },
      inlineExtensions,
    }
  },
}
