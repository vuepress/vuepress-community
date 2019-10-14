import { PluginOptionAPI } from './plugin'

export type LocaleConfig = Record<string, Record<string, string>>

export type PluginConfig =
  | string
  | [string]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | [string, any]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | Record<string, any>
  | PluginOptionAPI

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ThemeConfig = Record<string, any>

export interface SiteConfig {
  title?: string
  description?: string
  base?: string
  themeConfig?: ThemeConfig
  locales?: LocaleConfig
  plugins?: PluginConfig[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
