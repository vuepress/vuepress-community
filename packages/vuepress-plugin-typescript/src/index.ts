import TsLoader from 'ts-loader'
import { Plugin } from 'vuepress-types'

const path = require('path')

export interface TypescriptPluginOptions {
  tsLoaderOptions: Partial<TsLoader.Options>
}

const TypescriptPlugin: Plugin<TypescriptPluginOptions> = (
  { tsLoaderOptions },
  context
) => ({
  name: 'vuepress-plugin-typescript',

  /**
   * Detect enhanceApp.ts
   */
  enhanceAppFiles(): string[] {
    const { sourceDir, themeAPI } = context
    const enhanceAppPath = path.resolve(sourceDir, '.vuepress/enhanceApp.ts')
    const files = [enhanceAppPath]
    if (themeAPI.existsParentTheme) {
      files.push(path.resolve(themeAPI.parentTheme.path, 'enhanceApp.ts'))
    }
    const themeEnhanceAppPath = path.resolve(
      themeAPI.theme.path,
      'enhanceApp.ts'
    )
    files.push(themeEnhanceAppPath)
    return files
  },

  /**
   * Allow following files support typescript:
   * - .ts
   * - .vue
   * - .md
   */
  chainWebpack(config, isServer): void {
    const { cacheDirectory, cacheIdentifier } = context
    const finalCacheIdentifier = cacheIdentifier + `isServer:${isServer}`

    config.resolve.extensions.add('.ts')

    config.module
      .rule('ts')
      .test(/\.ts$/)
      .use('cache-loader')
      .loader(require.resolve('cache-loader'))
      .options({
        cacheDirectory,
        cacheIdentifier: finalCacheIdentifier,
      })
      .end()
      .use('ts-loader')
      .loader(require.resolve('ts-loader'))
      .options({
        appendTsSuffixTo: [/\.vue$/, /\.md$/],
        compilerOptions: {
          declaration: false,
        },
        ...tsLoaderOptions,
      })
      .end()
  },
})

module.exports = TypescriptPlugin
