import { Plugin } from 'vuepress-types'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

export interface SmoothScrollOptions {
  /**
   * Delay before scrolling to current haash
   *
   * @default 0
   */
  delay: number
}

const SmoothScrollPlugin: Plugin<SmoothScrollOptions> = (options) => ({
  name: 'vuepress-plugin-smooth-scroll',

  define: {
    SMOOTH_SCROLL_DELAY: options.delay || 0,
  },

  enhanceAppFiles: path.resolve(__dirname, 'enhanceApp.js'),

  clientRootMixin: path.resolve(__dirname, 'clientRootMixin.js'),
})

module.exports = SmoothScrollPlugin
