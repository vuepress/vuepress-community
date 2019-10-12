export type LocaleConfig = Record<string, Record<string, string>>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ThemeConfig = Record<string, any>

export interface SiteConfig {
  title: string
  description: string
  base: string
  themeConfig: ThemeConfig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  locales: LocaleConfig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
