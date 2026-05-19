/**
 * validateSpec：一次性扫描 PersonaSpec 是否符合硬约束。
 *
 * 错误分类：
 *   - hex 合法（palette / status）
 *   - status 四态齐全
 *   - motif primitives 硬约束：字号 ≥ 14、stroke-width ≥ 1、font-family 白名单
 *   - signatureContainers 在 SUPPORTED_SIGNATURE_CONTAINERS 注册
 *   - variants 指向的 variant id 存在（VARIANT_IDS 反查）
 *
 * 这是 conformance 测试和 CLI (`pnpm validate:spec`) 的共用实现。
 */
import { type PersonaSpec, type SpecValidationResult } from './types';
import { HEX_RE, MIN_FONT_SIZE, MIN_STROKE_WIDTH, ALLOWED_FONT_FAMILIES } from './hard-rules';
export { HEX_RE, MIN_FONT_SIZE, MIN_STROKE_WIDTH, ALLOWED_FONT_FAMILIES };
export declare function validateSpec(spec: PersonaSpec): SpecValidationResult;
