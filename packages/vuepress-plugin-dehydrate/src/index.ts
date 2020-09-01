import { GlobbyOptions } from 'globby'
import { Plugin } from 'vuepress-types'

/* eslint-disable @typescript-eslint/no-var-requires */
const { readFileSync, writeFileSync } = require('fs')
const { resolve } = require('path')
const { globby } = require('@vuepress/shared-utils')
/* eslint-enable @typescript-eslint/no-var-requires */

export type Replacer = [RegExp | string, string?]

export interface DehydratePluginOptions {
  noSSR?: string | string[]
  noScript?: string | string[]
  globOptions?: GlobbyOptions
  noEmptyLine?: boolean
}

const contentOriginal = '<!--vue-ssr-outlet-->'
const contentBefore = '<!--before-vue-ssr-outlet-->'
const contentAfter = '<!--after-vue-ssr-outlet-->'
const contentWrapper = contentBefore + contentOriginal + contentAfter
const contentReplacer: Replacer = [
  new RegExp(`${contentBefore}[\\s\\S]*${contentAfter}`),
  '<div id="app"></div>',
]

const resourceOriginal = '{{{ renderResourceHints() }}}'
const resourceBefore = '<!--before-resource-hints-->'
const resourceAfter = '<!--after-resource-hints-->'
const resourceWrapper = resourceBefore + resourceOriginal + resourceAfter
const resourceReplacer: Replacer = [
  new RegExp(`${resourceBefore}[\\s\\S]*${resourceAfter}`),
]

const scriptsOriginal = '{{{ renderScripts() }}}'
const scriptsBefore = '<!--before-scripts-->'
const scriptsAfter = '<!--after-scripts-->'
const scriptsWrapper = scriptsBefore + scriptsOriginal + scriptsAfter
const scriptsReplacer: Replacer = [
  new RegExp(`${scriptsBefore}[\\s\\S]*${scriptsAfter}`),
]

const serverRenderedReplacer: Replacer = [' data-server-rendered="true"']
const emptyLineReplacer: Replacer = [/^ *\r?\n/gm]
const wrapperReplacer: Replacer = [
  new RegExp(
    [
      contentBefore,
      contentAfter,
      resourceBefore,
      resourceAfter,
      scriptsBefore,
      scriptsAfter,
    ].join('|'),
    'g'
  ),
]

function replaceFileContent(file: string, ...replacers: Replacer[]): void {
  writeFileSync(
    file,
    replacers.reduce((prev, [search, replace = '']) => {
      return prev.replace(search, replace)
    }, readFileSync(file, 'utf8'))
  )
}

const DehydratePlugin: Plugin<DehydratePluginOptions> = (
  { noSSR = '404.html', noScript = [], noEmptyLine = true, globOptions = {} },
  context
) => ({
  name: 'vuepress-plugin-dehydrate',

  ready(): void {
    // hack into current ssr template
    let template = readFileSync(context.ssrTemplate, 'utf8')
    if (template.indexOf(contentWrapper) < 0) {
      template = template.replace(contentOriginal, contentWrapper)
    }
    if (template.indexOf(resourceWrapper) < 0) {
      template = template.replace(resourceOriginal, resourceWrapper)
    }
    if (template.indexOf(scriptsWrapper) < 0) {
      template = template.replace(scriptsOriginal, scriptsWrapper)
    }
    writeFileSync(context.ssrTemplate, template)
  },

  generated(pages): void {
    // restore ssr template
    replaceFileContent(context.ssrTemplate, wrapperReplacer)

    const globbyOptions = {
      cwd: context.outDir,
      transform: (file): string => resolve(context.outDir, file),
      ...globOptions,
    }

    const defaultReplacers = noEmptyLine
      ? [wrapperReplacer, emptyLineReplacer]
      : [wrapperReplacer]

    pages = pages.slice()

    // fully disable ssr
    globby.sync(noSSR, globbyOptions).forEach((file) => {
      const index = pages.indexOf(file)
      if (index < 0) return
      pages.splice(index, 1)
      replaceFileContent(file, contentReplacer, ...defaultReplacers)
    })

    // fully disable script
    globby.sync(noScript, globbyOptions).forEach((file) => {
      const index = pages.indexOf(file)
      if (index < 0) return
      pages.splice(index, 1)
      replaceFileContent(
        file,
        resourceReplacer,
        scriptsReplacer,
        serverRenderedReplacer,
        ...defaultReplacers
      )
    })

    // clean up unhandled files
    pages.forEach((file) => replaceFileContent(file, ...defaultReplacers))
  },
})

module.exports = DehydratePlugin
