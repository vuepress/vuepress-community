import { Plugin } from 'vuepress-types'
import { ZoomOptions } from 'medium-zoom'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

export interface MediumZoomPluginOptions {
  selector: string
  options: ZoomOptions
  delay: number
}

const MediumZoomPlugin: Plugin<MediumZoomPluginOptions> = ({
  selector = '.theme-default-content img',
  options = {},
  delay = 500,
}) => ({
  name: 'vuepress-plugin-medium-zoom',

  clientRootMixin: path.resolve(__dirname, 'clientRootMixin.js'),

  define: {
    MZ_SELECTOR: selector,
    MZ_OPTIONS: JSON.stringify(options),
    MZ_DELAY: delay.toString(),
  },
})

module.exports = MediumZoomPlugin
