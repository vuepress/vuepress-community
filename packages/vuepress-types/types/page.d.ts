import { Context } from './context'

/**
 * @see https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/core/lib/node/Page.js
 */

// ==================
// Page basic properties
// ==================

export interface BasePage {
  title: string
  frontmatter: PageFrontmatter
  key: string
  path: string
  regularPath: string
  relativePath: string
}

export interface PageFrontmatter {
  permalink?: string
  title?: string
  description?: string
  lang?: string
  layout?: string
  metaTitle?: string
  meta?: Record<'charset' | 'content' | 'http-equiv' | 'name', string>[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

// ==================
// Page in context
// ==================

export interface Page extends BasePage {
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
  frontmatter: PageFrontmatter
  permalinkPattern: string
}

export interface PageConstructor {
  new (options: PageOptions, context: Context): Page
}

// ==================
// Page in computed
// ==================

export type PageComputed = BasePage & {
  headers: PageComputedHeader[]

  // default theme
  lastUpdated?: string
}

export interface PageComputedHeader {
  level: number
  title: string
  slug: string
}
