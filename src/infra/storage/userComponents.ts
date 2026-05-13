/**
 * 用户自创组件存储 facade —— P1 拆分后只做 re-export。
 *
 * 三块按职责拆出：
 *   - userComponents.repo.ts      纯 CRUD（list / get / create / update / delete + readList/writeList）
 *   - userComponents.transfer.ts  JSON 进出口（exportUserComponentsJSON / importUserComponentsJSON）
 *   - userComponents.defaults.ts  缺省值（defaultThumb 首字占位 SVG）
 *
 * 历史消费方（useUserComponents / 测试 / domain sources）继续 import 自本文件,迁移到具体子模块
 * 视新增需求按需进行。新代码（如 mutations.ts）直接 import 子模块,避免 facade 重定向。
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
} from './userComponents.repo'

export {
  exportUserComponentsJSON,
  importUserComponentsJSON,
} from './userComponents.transfer'

export { defaultThumb } from './userComponents.defaults'
