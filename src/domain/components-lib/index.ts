export type { ComponentEntry, UserComponent, BuiltinEntry, ComponentKind } from './types'
export {
  BUILTIN_COMPONENTS,
  COMPONENT_GROUPS,
  filterByKind,
  findPresetByVariant,
} from './registry'
export type { ComponentGroup, ComponentSub, GroupId } from './registry'
export type { LibrarySnapshot } from './aggregator'
export { buildLibrarySnapshot, flattenSnapshot } from './aggregator'
export { getThemeTemplateEntries } from './sources/theme-template-source'
export { listUserEntries } from './sources/user-source'
export type {
  ValidateIssue,
  ValidateResult,
  UnknownFenceIssue,
  UnknownVariantIssue,
} from './validate'
export { validateSnippet } from './validate'
export type {
  CreateResult,
  UpdateResult,
  UpdateComponentPatch,
  MutationFailure,
} from './mutations'
export { createComponent, updateComponent, removeComponent } from './mutations'
