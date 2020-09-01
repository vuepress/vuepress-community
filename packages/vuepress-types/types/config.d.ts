import { Configuration } from 'webpack'
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server'
import { Markdown } from './markdown'
import { PluginOptionAPI } from './plugin'

export interface LocaleConfig extends Omit<ThemeConfig, 'locales'> {
  path?: string
}

/**
 * @see https://vuepress.vuejs.org/config/#markdown
 */
export interface MarkdownConfig {
  lineNumbers?: boolean
  slugify?: (...args: any[]) => any
  anchor?: {
    permalink?: boolean
    permalinkBefore?: boolean
    permalinkSymbol?: string
  }
  externalLinks?: Record<string, string>
  // TODO
  toc?: Record<string, any>
  plugins?: Exclude<PluginConfig, PluginOptionAPI>
  extendMarkdown?: (md: Markdown) => void
  extractHeaders?: string[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PluginConfig<T = any> =
  | string
  | [string]
  | [string, T]
  | Record<string, T>
  | PluginOptionAPI

export interface ThemeConfig {
  locales?: LocaleConfig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

/**
 * @see https://vuepress.vuejs.org/config
 */
export interface SiteConfig {
  // Basic Config
  base?: string
  title?: string
  description?: string
  head?: Array<[string, Record<string, string>]>

  host?: string
  port?: number

  temp?: string
  dest?: string

  locales?: LocaleConfig
  shouldPrefetch?: (file: string, type: string) => boolean
  cache?: boolean | string
  extraWatchFiles?: string[]
  patterns?: string[]

  // Theme
  theme?: string
  themeConfig?: ThemeConfig

  // Plugin
  plugins?: PluginConfig[]

  // Markdown
  markdown?: MarkdownConfig

  // Build Pipeline
  // https://github.com/postcss/postcss-loader#options
  postcss?: {
    exec?: boolean
    parser?: string | Record<string, any> | ((...args: any[]) => any)
    syntax?: string | Record<string, any>
    stringifier?: string | Record<string, any>
    config?: {
      path?: string
      context?: Record<string, any>
      ctx?: Record<string, any>
    }
    ident?: string
    plugins?: any[] | ((...args: any[]) => any)
    sourceMap?: 'inline' | boolean
  }
  // https://github.com/shama/stylus-loader#readme
  stylus?: {
    use?: any[]
    import?: string[]
    preferPathResolver?: 'webpack' | string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
  }
  scss?: any
  sass?: any
  less?: any
  configureWebpack?:
    | Configuration
    | ((config: Configuration, isServer: boolean) => Configuration)
  // TODO: ask vuepress to upgrade webpack-chain to >=5.2.0
  // https://github.com/neutrinojs/webpack-chain/blob/master/CHANGELOG.md#v520
  chainWebpack?: (config: any, isServer: boolean) => void

  // Browser Compatibility
  evergreen?: boolean

  // Undocumented
  name?: string
  devServer?: WebpackDevServerConfiguration
  devTemplate?: string
  permalink?: string

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
