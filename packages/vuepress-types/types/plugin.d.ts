import CAC from 'cac/types/CAC'
import { Application } from 'express'
import MarkdownIt from 'markdown-it'
import WebpackDevServer from 'webpack-dev-server'
import { Context } from './context'
import { Page, PageOptions } from './page'

export type Plugin =
  | PluginOptionAPI
  | ((
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pluginOptions: any,
      context: Context
    ) => PluginOptionAPI)

export interface PluginGeneratedFile {
  name: string
  content: string
}

export interface PluginOptionAPI {
  name?: string
  plugins?: string[]
  // TODO: ask vuepress to upgrade webpack-chain to >=5.2.0
  // https://github.com/neutrinojs/webpack-chain/blob/master/CHANGELOG.md#v520
  chainWebpack?: (config, isServer: boolean) => void
  define?: Record<string, string> | (() => Record<string, string>)
  alias?: Record<string, string>
  beforeDevServer?: (app: Application, server: WebpackDevServer) => void
  afterDevServer?: (app: Application, server: WebpackDevServer) => void
  extendMarkdown?: (md: MarkdownIt) => void
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
}
