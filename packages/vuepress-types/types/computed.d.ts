import { LocaleConfig, ThemeConfig } from './config'
import { SiteData } from './context'
import { Page, PageComputed, PageFrontmatter } from './page'

declare module 'vue/types/vue' {
  export interface Vue {
    $description: string
    $frontmatter: PageFrontmatter
    $lang: string
    $localeConfig: LocaleConfig
    $localePath: string
    $page: PageComputed

    // context.getSiteData()
    $site: SiteData
    $siteTitle: string
    $themeConfig: ThemeConfig
    $themeLocaleConfig: LocaleConfig
    $title: string
  }
}

export interface ClientComputedMixin {
  readonly $site: SiteData
  readonly $themeConfig: ThemeConfig
  readonly $frontmatter: PageFrontmatter
  readonly $localeConfig: LocaleConfig
  readonly $siteTitle: string
  readonly $title: string
  readonly $description: string
  readonly $lang: string
  readonly $localePath: string
  readonly $themeLocaleConfig: string
  readonly $page: Page

  __page: Page

  setPage: (page: Page) => void
}
