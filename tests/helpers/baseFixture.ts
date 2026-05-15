/**
 * 标准骨架 fixture 测试侧入口。
 *
 * 实现已迁至 src/domain/gallery/baseFixture.ts（域级资产，给测试 + showcase 生成器双端消费）。
 * 本文件保留为 reexport，使既有测试 import 路径不变。
 */

export {
  BASE_FIXTURE_MD,
  BASE_ELEMENT_FIXTURE_MD,
  BASE_CONTAINER_FIXTURE_MD,
  buildSignatureFixtureMd,
} from '../../src/domain/gallery/baseFixture'
