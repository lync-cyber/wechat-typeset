/**
 * PersonaSpec JSON Schema (draft-07).
 *
 * 手写，原因：
 *   - 项目 devDependencies 已经够长，再加 zod/ts-json-schema-generator 不值
 *   - PersonaSpec 相对稳定（重构完成后 surface 几乎不动）
 *   - 给 LLM 的 schema 需要人类可读的 description 字段——手写直接写注释
 *
 * 破坏性改动（删字段 / 收窄类型）= major bump；新增字段 = minor bump。
 * schema-contract.spec.ts（Phase 4）会对 schema 产出做快照，防止意外变更。
 */

/**
 * 轻量 JSON Schema 类型（避免引入 @types/json-schema）。
 * 只覆盖本文件实际使用的字段；消费方直接序列化为 JSON 即可。
 */
export type JSONSchema7 = {
  $schema?: string
  $id?: string
  $ref?: string
  title?: string
  description?: string
  type?: string | string[]
  enum?: unknown[]
  const?: unknown
  pattern?: string
  minimum?: number
  maximum?: number
  minItems?: number
  maxItems?: number
  items?: JSONSchema7 | JSONSchema7[]
  required?: string[]
  properties?: Record<string, JSONSchema7>
  additionalProperties?: boolean | JSONSchema7
  oneOf?: JSONSchema7[]
  anyOf?: JSONSchema7[]
}

const HEX_PATTERN = '^#[0-9a-fA-F]{3,8}$'

const PALETTE_SCHEMA: JSONSchema7 = {
  type: 'object',
  description: '主题色板 ground truth。所有值为 hex 字符串。',
  required: [
    'primary',
    'secondary',
    'accent',
    'bg',
    'bgSoft',
    'bgMuted',
    'text',
    'textMuted',
    'textInverse',
    'border',
    'code',
  ],
  properties: {
    primary: { type: 'string', pattern: HEX_PATTERN },
    secondary: { type: 'string', pattern: HEX_PATTERN },
    accent: { type: 'string', pattern: HEX_PATTERN },
    bg: { type: 'string', pattern: HEX_PATTERN },
    bgSoft: { type: 'string', pattern: HEX_PATTERN },
    bgMuted: { type: 'string', pattern: HEX_PATTERN },
    text: { type: 'string', pattern: HEX_PATTERN },
    textMuted: { type: 'string', pattern: HEX_PATTERN },
    textInverse: { type: 'string', pattern: HEX_PATTERN },
    border: { type: 'string', pattern: HEX_PATTERN },
    code: { type: 'string', pattern: HEX_PATTERN },
  },
  additionalProperties: false,
}

const STATUS_PAIR_SCHEMA: JSONSchema7 = {
  type: 'object',
  required: ['accent', 'soft'],
  properties: {
    accent: { type: 'string', pattern: HEX_PATTERN },
    soft: { type: 'string', pattern: HEX_PATTERN },
  },
  additionalProperties: false,
}

const MOTIF_PRIMITIVE_SCHEMA: JSONSchema7 = {
  oneOf: [
    {
      type: 'object',
      required: ['type', 'x', 'y', 'w', 'h'],
      properties: {
        type: { const: 'rect' },
        x: { type: 'number' },
        y: { type: 'number' },
        w: { type: 'number' },
        h: { type: 'number' },
        fill: { type: 'string' },
        stroke: { type: 'string' },
        strokeWidth: { type: 'number', minimum: 1 },
        rx: { type: 'number' },
        ry: { type: 'number' },
        opacity: { type: 'number', minimum: 0, maximum: 1 },
      },
      additionalProperties: false,
    },
    {
      type: 'object',
      required: ['type', 'cx', 'cy', 'r'],
      properties: {
        type: { const: 'circle' },
        cx: { type: 'number' },
        cy: { type: 'number' },
        r: { type: 'number' },
        fill: { type: 'string' },
        stroke: { type: 'string' },
        strokeWidth: { type: 'number', minimum: 1 },
        opacity: { type: 'number', minimum: 0, maximum: 1 },
      },
      additionalProperties: false,
    },
    {
      type: 'object',
      required: ['type', 'd'],
      properties: {
        type: { const: 'path' },
        d: { type: 'string' },
        fill: { type: 'string' },
        stroke: { type: 'string' },
        strokeWidth: { type: 'number', minimum: 1 },
        strokeLinecap: { enum: ['butt', 'round', 'square'] },
        strokeLinejoin: { enum: ['miter', 'round', 'bevel'] },
        strokeDasharray: { type: 'string' },
        opacity: { type: 'number', minimum: 0, maximum: 1 },
      },
      additionalProperties: false,
    },
    {
      type: 'object',
      required: ['type', 'x', 'y', 'content', 'fontSize'],
      properties: {
        type: { const: 'text' },
        x: { type: 'number' },
        y: { type: 'number' },
        content: { type: 'string' },
        fontSize: { type: 'number', minimum: 14 },
        fontFamily: { enum: ['serif', 'sans-serif', 'monospace'] },
        fontWeight: {},
        fill: { type: 'string' },
        textAnchor: { enum: ['start', 'middle', 'end'] },
        dominantBaseline: {
          enum: ['auto', 'middle', 'central', 'hanging', 'alphabetic'],
        },
        letterSpacing: { type: 'number' },
        opacity: { type: 'number', minimum: 0, maximum: 1 },
      },
      additionalProperties: false,
    },
    {
      type: 'object',
      required: ['type', 'x1', 'y1', 'x2', 'y2', 'stroke', 'strokeWidth'],
      properties: {
        type: { const: 'line' },
        x1: { type: 'number' },
        y1: { type: 'number' },
        x2: { type: 'number' },
        y2: { type: 'number' },
        stroke: { type: 'string' },
        strokeWidth: { type: 'number', minimum: 1 },
        strokeLinecap: { enum: ['butt', 'round', 'square'] },
        strokeDasharray: { type: 'string' },
        opacity: { type: 'number', minimum: 0, maximum: 1 },
      },
      additionalProperties: false,
    },
    {
      type: 'object',
      required: ['type', 'cx', 'cy', 'rx', 'ry'],
      properties: {
        type: { const: 'ellipse' },
        cx: { type: 'number' },
        cy: { type: 'number' },
        rx: { type: 'number' },
        ry: { type: 'number' },
        fill: { type: 'string' },
        stroke: { type: 'string' },
        strokeWidth: { type: 'number', minimum: 1 },
        opacity: { type: 'number', minimum: 0, maximum: 1 },
      },
      additionalProperties: false,
    },
    {
      type: 'object',
      required: ['type', 'transform', 'children'],
      properties: {
        type: { const: 'group' },
        transform: { type: 'string' },
        // 递归嵌套——schema 里用 $ref 需提前命名；这里图简洁直接指回顶层
        // primitive 数组，依赖 additionalProperties:false 防止误写字段。
        children: { type: 'array' },
        opacity: { type: 'number', minimum: 0, maximum: 1 },
      },
      additionalProperties: false,
    },
  ],
}

const SVG_INLINE_STYLE_SCHEMA: JSONSchema7 = {
  type: 'object',
  description: 'SVG <svg> 标签的语义 inline style 子集',
  properties: {
    display: { enum: ['inline-block', 'block', 'inline'] },
    verticalAlign: { enum: ['baseline', 'middle', 'top', 'bottom'] },
    marginRight: { type: 'number' },
    marginLeft: { type: 'number' },
  },
  additionalProperties: false,
}

const VIEWBOX_SCHEMA: JSONSchema7 = {
  type: 'array',
  items: { type: 'number' },
  minItems: 4,
  maxItems: 4,
}

const MOTIF_SHAPE_SCHEMA: JSONSchema7 = {
  type: 'object',
  required: ['viewBox', 'primitives'],
  properties: {
    viewBox: VIEWBOX_SCHEMA,
    width: { type: 'number' },
    height: { type: 'number' },
    inlineStyle: SVG_INLINE_STYLE_SCHEMA,
    primitives: { type: 'array', items: MOTIF_PRIMITIVE_SCHEMA },
  },
  additionalProperties: false,
}

const MOTIF_TEMPLATE_SCHEMA: JSONSchema7 = {
  type: 'object',
  required: ['viewBox', 'primitives', 'placeholders'],
  properties: {
    viewBox: VIEWBOX_SCHEMA,
    width: { type: 'number' },
    height: { type: 'number' },
    inlineStyle: SVG_INLINE_STYLE_SCHEMA,
    primitives: { type: 'array', items: MOTIF_PRIMITIVE_SCHEMA },
    placeholders: { type: 'array', items: { type: 'string' } },
  },
  additionalProperties: false,
}

const SHAPE_KEYS = [
  'h2Prefix',
  'h3Prefix',
  'dividerFlower',
  'dividerWave',
  'dividerDots',
  'quoteMark',
  'listBullet',
  'sectionCorner',
  'tipIcon',
  'warningIcon',
  'infoIcon',
  'dangerIcon',
  'noteIcon',
  'copyIcon',
  'externalLinkIcon',
  'terminalPrompt',
  'sealMark',
] as const

const MOTIF_SPEC_SCHEMA: JSONSchema7 = {
  type: 'object',
  properties: {
    ...Object.fromEntries(SHAPE_KEYS.map((k) => [k, MOTIF_SHAPE_SCHEMA])),
    stepBadge: MOTIF_TEMPLATE_SCHEMA,
    issueStamp: MOTIF_TEMPLATE_SCHEMA,
  },
  additionalProperties: false,
}

const VARIANTS_SCHEMA: JSONSchema7 = {
  type: 'object',
  required: [
    'admonition',
    'quote',
    'compare',
    'steps',
    'divider',
    'sectionTitle',
    'codeBlock',
  ],
  properties: {
    admonition: {
      enum: [
        'accent-bar',
        'pill-tag',
        'ticket-notch',
        'card-shadow',
        'minimal-underline',
        'terminal',
        'dashed-border',
        'double-border',
        'top-bottom-rule',
      ],
    },
    quote: { enum: ['classic', 'magazine-dropcap', 'column-rule', 'frame-brackets'] },
    compare: { enum: ['column-card', 'stacked-row', 'ledger'] },
    steps: { enum: ['number-circle', 'ribbon-chain', 'timeline-dot'] },
    divider: { enum: ['wave', 'dots', 'flower', 'rule', 'glyph'] },
    sectionTitle: { enum: ['bordered', 'cornered'] },
    codeBlock: { enum: ['bare', 'header-bar'] },
  },
  additionalProperties: false,
}

const CSS_OBJECT_PATCH_SCHEMA: JSONSchema7 = {
  type: 'object',
  description: 'CSS 属性集合；可选 __reset: true 触发整段替换',
  properties: {
    __reset: { const: true },
  },
  additionalProperties: {
    type: ['string', 'number'],
  },
}

const STYLE_PATCH_MAP: JSONSchema7 = {
  type: 'object',
  additionalProperties: CSS_OBJECT_PATCH_SCHEMA,
}

export const PERSONA_SPEC_SCHEMA: JSONSchema7 = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'https://github.com/lync-cyber/wechat-typeset/schema/persona-spec.json',
  title: 'PersonaSpec',
  description:
    '微信公众号排版主题的"人设"合同。一份 spec 投影为 Theme（运行时）、gallery HTML、LLM 输入 schema。',
  type: 'object',
  required: [
    'id',
    'name',
    'description',
    'audience',
    'palette',
    'status',
    'typography',
    'spacing',
    'radius',
    'motifs',
    'variants',
    'meta',
  ],
  properties: {
    id: {
      type: 'string',
      pattern: '^[a-z][a-z0-9-]*$',
      description: 'kebab-case 标识符，与目录名一致',
    },
    name: { type: 'string', description: '中文主题名' },
    description: { type: 'string', description: '一句自然语言定位，LLM 识别选型信号' },
    audience: {
      type: 'string',
      description: '受众标签，如 "技术布道" / "人文非虚构" / "内参 newsletter"',
    },
    palette: PALETTE_SCHEMA,
    status: {
      type: 'object',
      required: ['tip', 'info', 'warning', 'danger'],
      properties: {
        tip: STATUS_PAIR_SCHEMA,
        info: STATUS_PAIR_SCHEMA,
        warning: STATUS_PAIR_SCHEMA,
        danger: STATUS_PAIR_SCHEMA,
      },
      additionalProperties: false,
    },
    typography: {
      type: 'object',
      required: [
        'baseSize',
        'lineHeight',
        'h1Size',
        'h2Size',
        'h3Size',
        'letterSpacing',
      ],
      properties: {
        baseSize: { type: 'number' },
        lineHeight: { type: 'number' },
        h1Size: { type: 'number' },
        h2Size: { type: 'number' },
        h3Size: { type: 'number' },
        letterSpacing: { type: 'number' },
      },
      additionalProperties: false,
    },
    spacing: {
      type: 'object',
      required: ['paragraph', 'section', 'listItem', 'containerPadding'],
      properties: {
        paragraph: { type: 'number' },
        section: { type: 'number' },
        listItem: { type: 'number' },
        containerPadding: { type: 'number' },
      },
      additionalProperties: false,
    },
    radius: {
      type: 'object',
      required: ['sm', 'md', 'lg'],
      properties: {
        sm: { type: 'number' },
        md: { type: 'number' },
        lg: { type: 'number' },
      },
      additionalProperties: false,
    },
    motifs: MOTIF_SPEC_SCHEMA,
    variants: VARIANTS_SCHEMA,
    behavior: {
      type: 'object',
      properties: {
        introDropcap: { type: 'boolean' },
        h2RomanNumerals: { type: 'boolean' },
      },
      additionalProperties: false,
    },
    signatureContainers: {
      type: 'array',
      items: { type: 'string' },
      description: '该主题声称支持的签名容器 id 清单',
    },
    templates: {
      type: 'object',
      additionalProperties: { type: 'string' },
    },
    elements: STYLE_PATCH_MAP,
    containers: STYLE_PATCH_MAP,
    inline: STYLE_PATCH_MAP,
    meta: {
      type: 'object',
      required: ['createdAt'],
      properties: {
        createdAt: { type: 'string', description: 'ISO 日期字符串' },
        ownerNotes: { type: 'string' },
      },
      additionalProperties: false,
    },
  },
  additionalProperties: false,
}

export function getPersonaSpecSchema(): JSONSchema7 {
  return PERSONA_SPEC_SCHEMA
}
