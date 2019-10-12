import { Plugin } from 'vuepress-types'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

export interface TableOfContentsPluginOptions {
  componentName: string
}

const TableOfContentsPlugin: Plugin = ({
  componentName = 'TOC',
}: TableOfContentsPluginOptions) => ({
  name: 'vuepress-plugin-table-of-contents',

  enhanceAppFiles: path.resolve(__dirname, 'enhanceApp.js'),

  define: {
    TOC_COMPONENT_NAME: componentName,
  },
})

module.exports = TableOfContentsPlugin
