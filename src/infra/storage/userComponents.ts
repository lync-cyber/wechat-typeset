/**
 * 用户自创组件存储 facade —— 聚合三块子模块的统一入口。
 *
 *   - userComponents.repo.ts      纯 CRUD（list / get / create / update / delete + readList/writeList）
 *   - userComponents.transfer.ts  JSON 进出口（exportUserComponentsJSON / importUserComponentsJSON）
 *   - userComponents.defaults.ts  缺省值（defaultThumb 首字占位 SVG）
 *
 * 新代码可直接 import 子模块；本 facade 为聚合消费方提供单点入口。
 */

export {
  readList,
  writeList,
  listUserComponents,
  getUserComponent,
  createUserComponent,
  deleteUserComponent,
  updateUserComponent,
  type CreateUserComponentInput,
  type UpdateUserComponentPatch,
} from './userComponents.repo'

export {
  exportUserComponentsJSON,
  importUserComponentsJSON,
} from './userComponents.transfer'

export { defaultThumb } from './userComponents.defaults'
