/**
 * PersonaSpec JSON Schema (draft-07)。手写理由：避免引入 zod /
 * ts-json-schema-generator 依赖；给 LLM 用的 schema 需要人类可读的 description。
 *
 * 破坏性改动（删字段 / 收窄类型）= major bump；新增字段 = minor bump。
 * schema-contract.spec.ts 对产出做快照，防止意外变更。
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

import { VARIANT_IDS } from '../../types'
import { ALLOWED_FONT_FAMILIES, HEX_RE, MIN_FONT_SIZE, MIN_STROKE_WIDTH } from './validate'
import { LETTER_SPACING_MAX, LINE_HEIGHT_MAX, LINE_HEIGHT_MIN } from './typography-rules'

const HEX_PATTERN = HEX_RE.source
const FONT_FAMILY_ENUM = [...ALLOWED_FONT_FAMILIES]

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
    preBg: { type: 'string', pattern: HEX_PATTERN },
    preText: { type: 'string', pattern: HEX_PATTERN },
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
        strokeWidth: { type: 'number', minimum: MIN_STROKE_WIDTH },
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
        strokeWidth: { type: 'number', minimum: MIN_STROKE_WIDTH },
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
        strokeWidth: { type: 'number', minimum: MIN_STROKE_WIDTH },
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
        fontSize: { type: 'number', minimum: MIN_FONT_SIZE },
        fontFamily: { enum: FONT_FAMILY_ENUM },
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
        strokeWidth: { type: 'number', minimum: MIN_STROKE_WIDTH },
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
        strokeWidth: { type: 'number', minimum: MIN_STROKE_WIDTH },
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

// variants schema 直接派生自 VARIANT_IDS（themes/types.ts 的权威 satisfies 守护），
// 新增 variant 改 variants/<kind>/_all.ts 与 VARIANT_IDS 即可，本 schema 自动跟进。
const VARIANTS_SCHEMA: JSONSchema7 = {
  type: 'object',
  required: Object.keys(VARIANT_IDS),
  properties: Object.fromEntries(
    Object.entries(VARIANT_IDS).map(([kind, ids]) => [
      kind,
      { enum: [...ids] as unknown[] } as JSONSchema7,
    ]),
  ),
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
        baseSize: { type: 'number', minimum: MIN_FONT_SIZE },
        lineHeight: { type: 'number', minimum: LINE_HEIGHT_MIN, maximum: LINE_HEIGHT_MAX },
        h1Size: { type: 'number', minimum: MIN_FONT_SIZE },
        h2Size: { type: 'number', minimum: MIN_FONT_SIZE },
        h3Size: { type: 'number', minimum: MIN_FONT_SIZE },
        letterSpacing: { type: 'number', maximum: LETTER_SPACING_MAX },
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
    svgVariant: {
      enum: ['geometric', 'soft', 'serif', 'playful'],
      description:
        '参数化 SVG 资产工厂的形状变体。仅在 applyPalette（用户自定义配色）路径作为 fallback 工厂；' +
        'spec-first 主路径不消费此字段（assets 由 motifs AST 直接渲染）。缺省回退到 "geometric"。',
    },
    decorations: {
      type: 'object',
      description:
        '声明式渲染层装饰规则。所有主题专属视觉签名（标题前缀编号 / intro 首字下沉……）的唯一承载点；' +
        '共享层一次性实现"如何按声明执行"。',
      properties: {
        introDropcap: {
          type: 'object',
          description:
            'intro 首段首字下沉。声明则启用,样式参数由本结构提供;前导标点跳过 / 数字判定的扫描逻辑由 markdown.ts 共享层实现。',
          required: ['color'],
          properties: {
            color: { enum: ['primary', 'secondary', 'accent', 'text', 'textMuted', 'textInverse'] },
            fontSize: { type: 'number' },
            fontWeight: { enum: [400, 500, 600, 700] },
            marginRight: { type: 'number' },
            paddingTop: { type: 'number' },
          },
          additionalProperties: false,
        },
        headingPrefix: {
          type: 'array',
          description: '标题前缀装饰规则数组。',
          items: {
            type: 'object',
            required: ['level', 'style'],
            properties: {
              level: { enum: [2, 3] },
              pattern: {
                type: 'string',
                description:
                  '文本前缀正则（与 autoNumber 二选一）；捕获组 1 是装饰文字，整个匹配从原文本剥掉。',
              },
              autoNumber: {
                enum: [
                  'roman',
                  'arabic',
                  'arabic-padded',
                  'arabic-section',
                  'arabic-section-padded',
                  'circled',
                ],
                description:
                  '按出现顺序自动生成编号（与 pattern 二选一）；per-render 重置。'
                  + ' roman/arabic/arabic-padded 是 level-local 单计数器；'
                  + ' arabic-section / arabic-section-padded 是复合编号 `${h2}.${h3InH2}`，'
                  + ' 主要用于 level 3 子节。'
                  + ' circled → ❶/❷/❸…⓴（>20 退化 (N)），mook / 杂志感章节签名常用。',
              },
              style: {
                type: 'object',
                required: ['color'],
                properties: {
                  color: { enum: ['primary', 'secondary', 'accent', 'text', 'textMuted', 'textInverse'] },
                  backgroundColor: {
                    enum: ['primary', 'secondary', 'accent', 'text', 'textMuted', 'textInverse'],
                    description:
                      '装饰前缀底色（token 引用）。声明则把编号渲染成色块徽章——典型例 swiss-grid 主题的 H2「01」红方块前缀。'
                      + ' 缺省 = 不设底色。需与 paddingX/paddingY 搭配以撑开方块。',
                  },
                  paddingX: {
                    type: 'number',
                    description: '装饰前缀左右内边距 px（仅 backgroundColor 声明时生效），缺省 0。',
                  },
                  paddingY: {
                    type: 'number',
                    description: '装饰前缀上下内边距 px（仅 backgroundColor 声明时生效），缺省 0。',
                  },
                  fontFamily: { enum: ['monospace'] },
                  fontWeight: { enum: [400, 500, 600, 700] },
                  fontSize: { type: 'number' },
                  letterSpacing: { type: 'number' },
                  marginRight: { type: 'number' },
                  underline: { type: 'boolean' },
                  underlinePad: { type: 'number' },
                  display: {
                    enum: ['inline', 'block'],
                    description:
                      '装饰 span 显示模式。'
                      + ' inline（默认）→ display:inline-block,编号与标题同行；'
                      + ' block → display:block,编号自成 kicker 行,标题文字换行落于下行。',
                  },
                  marginBottom: {
                    type: 'number',
                    description: "display='block' 时编号与下方标题文字的间距 px,缺省 6。",
                  },
                  suffix: {
                    type: 'string',
                    description:
                      '编号后追加的字面量。占位符:'
                      + ' {n} → autoNumber 输出值(如 "❶" / "1")；'
                      + ' {cn} → 中文数字 一/二/三…二十(>20 退化阿拉伯数字)。'
                      + ' 典型: "  第{cn}章" 与 autoNumber:"circled" 组合产出 "❶  第一章"。',
                  },
                },
                additionalProperties: false,
              },
            },
            additionalProperties: false,
          },
        },
      },
      additionalProperties: false,
    },
    signatureContainers: {
      type: 'array',
      items: { type: 'string' },
      description: '该主题声称支持的签名容器 id 清单',
    },
    capabilities: {
      type: 'object',
      description: '主题能力自描述（白名单/排除/推荐 variant）。仅供 API 查询使用，不影响渲染。',
      properties: {
        containers: {
          type: 'array',
          items: { type: 'string' },
          description: '本主题启用的容器 fence 名白名单；未声明 = 全集兜底（base + pack:* + 自家 theme:）',
        },
        variantOverrides: {
          type: 'object',
          description: '在 spec.variants 默认骨架之外的额外建议 variant（按 slot 部分指定）',
          additionalProperties: { type: 'string' },
        },
        excluded: {
          type: 'array',
          items: { type: 'string' },
          description: '显式排除的容器 fence 名清单',
        },
      },
      additionalProperties: false,
    },
    templates: {
      type: 'object',
      additionalProperties: { type: 'string' },
    },
    elements: STYLE_PATCH_MAP,
    containers: STYLE_PATCH_MAP,
    innerStyles: STYLE_PATCH_MAP,
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
