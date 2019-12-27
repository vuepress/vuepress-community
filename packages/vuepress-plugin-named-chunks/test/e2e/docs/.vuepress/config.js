const { hash } = require('@vuepress/shared-utils')
const CSSExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  plugins: [
    [
      'vuepress-plugin-named-chunks',
      {
        pageChunkName({ key, frontmatter }) {
          const name = frontmatter.layout || key.slice(2)
          return `page-${name}`
        },
        layoutChunkName({ componentName: name }) {
          return `layout-${name}`
        },
      },
    ],
  ],

  extendPageData(page) {
    // generate page keys depending on relative path
    page.key = 'v-' + hash(page.path)
  },

  evergreen: false,

  chainWebpack(config) {
    // do not use chunk hash in js
    config.output.filename('assets/js/[name].js')

    // do not use chunk hash in css
    config.plugin('extract-css').use(CSSExtractPlugin, [
      {
        filename: 'assets/css/styles.css',
      },
    ])
  },
}
