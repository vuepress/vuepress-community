import { LocaleConfig, SiteConfig, ThemeConfig } from './config'
import { PageComputed, PageFrontmatter } from './page'

declare module 'vue/types/vue' {
  export interface Vue {
    $description: string
    $frontmatter: PageFrontmatter
    $lang: string
    $localeConfig: LocaleConfig
    $localePath: string
    $page: PageComputed
    $site: SiteConfig & {
      pages: PageComputed[]
    }
    $siteTitle: string
    $themeConfig: ThemeConfig
    $themeLocaleConfig: LocaleConfig
    $title: string
  }
}
