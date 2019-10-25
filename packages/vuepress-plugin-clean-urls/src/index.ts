import { Plugin } from 'vuepress-types'

export interface CleanUrlsPluginOptions {
  normalSuffix: string
  indexSuffix: string
  notFoundPath: string
}

const CleanUrlsPlugin: Plugin<CleanUrlsPluginOptions> = ({
  normalSuffix = '',
  indexSuffix = '/',
  notFoundPath = '/404.html',
}) => ({
  name: 'vuepress-plugin-clean-urls',

  extendPageData(page): void {
    const { regularPath, frontmatter = {} } = page
    if (frontmatter.permalink) return
    if (regularPath === '/404.html') {
      // path for 404 page
      page.path = notFoundPath
    } else if (regularPath.endsWith('.html')) {
      // normal path
      // e.g. foo/bar.md -> foo/bar.html
      page.path = regularPath.slice(0, -5) + normalSuffix
    } else if (regularPath.endsWith('/')) {
      // index path
      // e.g. foo/index.md -> foo/
      page.path = regularPath.slice(0, -1) + indexSuffix
    }
  },
})

module.exports = CleanUrlsPlugin
