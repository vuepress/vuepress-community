const CSSExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  plugins: ['vuepress-plugin-typescript'],

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
