import { Plugin } from 'vuepress-types'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

const MediumZoomPlugin: Plugin = ({
  selector = '.theme-default-content img',
  options = {},
  delay = 500,
}) => ({
  name: 'vuepress-plugin-medium-zoom',

  clientRootMixin: path.resolve(__dirname, 'clientRootMixin.js'),

  define: {
    MZ_SELECTOR: selector,
    MZ_OPTIONS: JSON.stringify(options),
    MZ_DELAY: delay,
  },
})

module.exports = MediumZoomPlugin
