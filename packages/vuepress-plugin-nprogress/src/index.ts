import { Plugin } from 'vuepress-types'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

const NprogressPlugin: Plugin = {
  name: 'vuepress-plugin-nprogress',

  clientRootMixin: path.resolve(__dirname, 'clientRootMixin.js'),
}

module.exports = NprogressPlugin
