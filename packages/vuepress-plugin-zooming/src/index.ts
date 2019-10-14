import { Plugin } from 'vuepress-types'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

export interface ZoomingPluginOptions {
  selector: string
  options: {
    bgColor?: string
    bgOpacity?: number
    closeOnWindowResize?: boolean
    customSize?:
      | string
      | {
          width: number
          height: number
        }
    enableGrab?: boolean
    preloadImage?: boolean
    scaleBase?: number
    scaleExtra?: number
    scrollThreshold?: number
    transitionDuration?: number
    transitionTimingFunction?: string
    zIndex?: number
  }
  delay: number
}

const ZoomingPlugin: Plugin<ZoomingPluginOptions> = ({
  selector = '.theme-default-content img',
  options = {},
  delay = 500,
}) => ({
  name: 'vuepress-plugin-zooming',

  clientRootMixin: path.resolve(__dirname, 'clientRootMixin.js'),

  define: {
    ZOOMING_SELECTOR: selector,
    ZOOMING_OPTIONS: JSON.stringify(options),
    ZOOMING_DELAY: delay.toString(),
  },
})

module.exports = ZoomingPlugin
