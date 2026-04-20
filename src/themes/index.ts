import type { Theme } from './types'
import { defaultTheme } from './default'
import { techGeekTheme } from './tech-geek'
import { techExplainerTheme } from './tech-explainer'
import { lifeAestheticTheme } from './life-aesthetic'
import { businessFinanceTheme } from './business-finance'
import { literaryHumanismTheme } from './literary-humanism'
import { industryObserverTheme } from './industry-observer'
import { peopleStoryTheme } from './people-story'
import { academicFrontierTheme } from './academic-frontier'

export const themeRegistry: Record<string, Theme> = {
  default: defaultTheme,
  'tech-geek': techGeekTheme,
  'tech-explainer': techExplainerTheme,
  'life-aesthetic': lifeAestheticTheme,
  'business-finance': businessFinanceTheme,
  'literary-humanism': literaryHumanismTheme,
  'industry-observer': industryObserverTheme,
  'people-story': peopleStoryTheme,
  'academic-frontier': academicFrontierTheme,
}

export const themeList: Theme[] = Object.values(themeRegistry)

export function getTheme(id: string): Theme {
  return themeRegistry[id] ?? defaultTheme
}

export {
  defaultTheme,
  techGeekTheme,
  techExplainerTheme,
  lifeAestheticTheme,
  businessFinanceTheme,
  literaryHumanismTheme,
  industryObserverTheme,
  peopleStoryTheme,
  academicFrontierTheme,
}
