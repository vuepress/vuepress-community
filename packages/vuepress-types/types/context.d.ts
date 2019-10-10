import { Page, PageOptions } from './page'

/**
 * @see https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/core/lib/node/App.js
 * @see https://vuepress.vuejs.org/plugin/context-api.html
 */

export interface ContextConstructor {
  new (options: ContextOptions): Context
}

export interface Context {
  /**
   * Docs
   */
  isProd: boolean
  pages: Page[]
  sourceDir: string
  tempPath: string
  outDir: string
  base: string
  writeTemp: (file: string, content: string) => void

  /**
   * Other
   */
  options: ContextOptions
  vuepressDir: string
  libDir: string
  cwd: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  siteConfig: Record<string, any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  themeConfig: Record<string, any>
  // TODO
  /* eslint-disable @typescript-eslint/no-explicit-any */
  pluginAPI: any
  themeAPI: any
  ClientComputedMixinConstructor: any
  /* eslint-enable @typescript-eslint/no-explicit-any */

  // private
  resolveConfigAndInitialize: () => void
  process: () => Promise<void>
  applyInternalPlugins: () => void
  applyUserPlugins: () => void
  normalizeHeadTagUrls: () => void
  resolveCacheLoaderOptions: () => void
  resolveTemplates: () => void
  resolveGlobalLayout: () => void
  resolveCommonAgreementFilePath: () => void | string
  resolvePages: () => Promise<void>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getThemeConfigValue: (key: string) => any
  resolveThemeAgreementFile: (filepath: string) => string | void
  resolveSiteAgreementFile: (filepath: string) => string | void

  // public
  addPage: (options: PageOptions) => Promise<void>
  getSiteData: () => SiteData
  getLibFilePath: (relative: string) => string
  dev: () => Promise<Context>
  build: () => Promise<Context>
}

export interface ContextOptions {
  sourceDir?: string
  temp?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  siteConfig?: Record<string, any>
}

export interface SiteData {
  title: string
  description: string
  base: string
  pages: string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  themeConfig: Record<string, any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  locales: Record<string, any>
}
