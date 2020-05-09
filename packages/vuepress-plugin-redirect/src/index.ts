import { Plugin, PluginGeneratedFile } from 'vuepress-types'

/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const stringify = require('@shigma/stringify-object')
/* eslint-enable @typescript-eslint/no-var-requires */

export interface RedirectorStorage {
  get(redirector: Redirector): string | null
  set(value: string, redirector: Redirector): void
}

export interface Redirector {
  base?: string
  storage?: boolean | string | RedirectorStorage
  alternative?: string | string[] | ((rel: string) => string | string[])
}

export interface LocalesRedirector {
  fallback?: string
  storage?: boolean | string | RedirectorStorage
}

export interface RedirectPluginOptions {
  locales?: true | LocalesRedirector
  redirectors?: Redirector[]
}

const RedirectPlugin: Plugin<RedirectPluginOptions> = (options) => ({
  name: 'vuepress-plugin-redirect',

  // workaround SSR mismatch in 404.html
  plugins: ['dehydrate'],

  enhanceAppFiles: path.resolve(__dirname, 'enhanceApp.js'),

  clientDynamicModules(): PluginGeneratedFile {
    return {
      name: 'plugin-redirect-options.js',
      content: `export default ${stringify(options)}`,
    }
  },
})

module.exports = RedirectPlugin
