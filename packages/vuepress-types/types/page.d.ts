import { Context } from './context'

/**
 * @see https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/core/lib/node/Page.js
 */

export interface PageConstructor {
  new (options: PageOptions, context: Context): Page
}

export interface Page {
  title: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  frontmatter: Record<string, any>
  key: string
  path: string
  regularPath: string
  relativePath: string
  readonly dirname: string
  readonly filename: string
  readonly slug: string
  readonly strippedFilename: string
  readonly date: string

  _context: Context
  _meta: Record<string, string>[]
  _filePath: string
  _content: string
  _permalink: string
  _permalinkPattern: string
}

export interface PageOptions {
  path: string
  meta: Record<string, string>[]
  title: string
  content: string
  filePath: string
  relative: string
  permalink: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  frontmatter: Record<string, any>
  permalinkPattern: string
}
