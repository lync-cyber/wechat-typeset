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
    $schema?: string;
    $id?: string;
    $ref?: string;
    title?: string;
    description?: string;
    type?: string | string[];
    enum?: unknown[];
    const?: unknown;
    pattern?: string;
    minimum?: number;
    maximum?: number;
    minItems?: number;
    maxItems?: number;
    items?: JSONSchema7 | JSONSchema7[];
    required?: string[];
    properties?: Record<string, JSONSchema7>;
    additionalProperties?: boolean | JSONSchema7;
    oneOf?: JSONSchema7[];
    anyOf?: JSONSchema7[];
};
export declare const PERSONA_SPEC_SCHEMA: JSONSchema7;
