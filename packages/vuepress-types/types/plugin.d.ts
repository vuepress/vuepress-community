import CAC from 'cac/types/CAC'
import { Application } from 'express'
import WebpackDevServer from 'webpack-dev-server'
import { PluginConfig } from './config'
import { Context } from './context'
import { Markdown } from './markdown'
import { Page, PageOptions } from './page'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Plugin<Options = any> = PluginOptionAPI | PluginFunction<Options>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PluginFunction<Options = any> = (
  pluginOptions: Options,
  context: Context
) => PluginOptionAPI

export interface PluginGeneratedFile {
  name: string
  content: string
}

export interface PluginOptionAPI {
  name?: string
  plugins?: PluginConfig[]
  // TODO: ask vuepress to upgrade webpack-chain to >=5.2.0
  // https://github.com/neutrinojs/webpack-chain/blob/master/CHANGELOG.md#v520
  chainWebpack?: (config, isServer: boolean) => void
  define?: Record<string, string> | (() => Record<string, string>)
  alias?: Record<string, string>
  beforeDevServer?: (app: Application, server: WebpackDevServer) => void
  afterDevServer?: (app: Application, server: WebpackDevServer) => void
  extendMarkdown?: (md: Markdown) => void
  // TODO: ask markdown-it-chain to add types definitions
  chainMarkdown?: (config) => void
  enhanceAppFiles?:
    | string
    | string[]
    | (() => PluginGeneratedFile | PluginGeneratedFile[])
  clientDynamicModules?: () => PluginGeneratedFile | PluginGeneratedFile[]
  extendPageData?: (page: Page) => void | Promise<void>
  clientRootMixin?: string
  additionalPages?: PageOptions[] | Promise<PageOptions[]>
  globalUIComponents?: string | string[]
  extendCli?: (cli: CAC) => void
  multiple?: boolean
  // Life Cycle
  // https://vuepress.vuejs.org/plugin/life-cycle.html
  ready?: () => void | Promise<void>
  updated?: () => void | Promise<void>
  generated?: (pagePaths: string[]) => void | Promise<void>
}
