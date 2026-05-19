/**
 * Persona 注册表单一真源。所有内置主题在此显式 import 一次；
 * Theme（运行时）与 public 层都从这里派生。
 *
 * 新增主题：在 ALL_SPECS 追加 import + 加进 DISPLAY_ORDER（不进 DISPLAY_ORDER 时按 id 字典序落到末尾）。
 * 不用 `import.meta.glob`：tsx/Node 直跑 pipeline 不认 Vite 转换。
 */
import type { PersonaSpec } from './_shared/spec';
export declare const DISPLAY_ORDER: readonly string[];
export declare const ORDERED_SPECS: readonly PersonaSpec[];
export declare const SPEC_REGISTRY: Readonly<Record<string, PersonaSpec>>;
