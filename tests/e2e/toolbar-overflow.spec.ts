/** 桌面工作台：更多操作、组件分组、空态新建与帮助入口。 */
import { expect, test } from '@playwright/test'
import { freshMobilePage, openComponents } from './_helpers'

test.beforeEach(async ({ page }) => { await freshMobilePage(page) })

test('桌面：更多操作保留帮助入口，发布准备可从流程直达', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: '更多操作', exact: true }).click()
  const menu = page.locator('.utility-menu')
  await expect(menu.getByRole('button', { name: /快捷键与帮助/ })).toBeVisible()
  await expect(menu.getByRole('button', { name: '发文清单', exact: true })).toBeVisible()
  await menu.getByRole('button', { name: '发文清单', exact: true }).click()
  await expect(menu).toBeHidden()
  await expect(page.getByRole('navigation', { name: '创作流程' }).getByRole('button', { name: '发布准备', exact: true })).toHaveAttribute('aria-current', 'page')
  await expect(page.getByRole('complementary', { name: '发布准备', exact: true })).toBeVisible()
})

test('桌面：组件库七个分组与提示子分类可切换', async ({ page }) => {
  await page.goto('/')
  await openComponents(page)
  const palette = page.locator('.palette')
  const groupTabs = palette.getByRole('tablist', { name: '组件分组' }).getByRole('tab')
  await expect(groupTabs).toHaveCount(7)
  for (const [index, label] of ['主题模板', '提示与强调', '结构', '数据与对话', '互动', '页饰', '我的'].entries()) {
    await expect(groupTabs.nth(index)).toContainText(label)
  }
  await expect(palette.getByRole('tablist', { name: '子分类' })).toHaveCount(0)
  await groupTabs.nth(1).click()
  const subTabs = palette.getByRole('tablist', { name: '子分类' }).getByRole('tab')
  await expect(subTabs).toHaveCount(6)
  for (const [index, label] of ['提示', '补注', '引用', '引文', '公告', '高亮'].entries()) {
    await expect(subTabs.nth(index)).toContainText(label)
  }
  await subTabs.nth(2).click()
  await expect(subTabs.nth(2)).toHaveAttribute('aria-selected', 'true')
})

test('桌面：我的组件空态 CTA 打开新建 Studio', async ({ page }) => {
  await page.goto('/')
  await openComponents(page)
  const palette = page.locator('.palette')
  await palette.getByRole('tablist', { name: '组件分组' }).getByRole('tab', { name: /我的/ }).click()
  await expect(palette.getByRole('tab', { name: /我的组件/ })).toBeVisible()
  await expect(palette.locator('.empty-title')).toContainText('还没有自创组件')
  await palette.getByRole('button', { name: '＋ 新建组件', exact: true }).click()
  await expect(page.getByRole('dialog', { name: '组件 Studio' })).toBeVisible()
})

test('桌面：帮助中重新打开新手引导，帮助面板随之关闭', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.onboard')).toHaveCount(0)
  await page.getByRole('button', { name: '更多操作', exact: true }).click()
  await page.locator('.utility-menu').getByRole('button', { name: /快捷键与帮助/ }).click()
  await expect(page.locator('.panel-shell-card')).toBeVisible()
  await page.getByRole('button', { name: /重新打开新手引导/ }).click()
  await expect(page.locator('.panel-shell-card')).toHaveCount(0)
  await expect(page.locator('.onboard')).toBeVisible()
})
