import { Plugin, PluginOptionAPI } from 'vuepress-types'
import { ContainerOptions } from './markdown-it-container'

/* eslint-disable @typescript-eslint/no-var-requires */
const container = require('markdown-it-container')
const { logger, ensureLeadingSlash } = require('@vuepress/shared-utils')
/* eslint-enable @typescript-eslint/no-var-requires */

export type RenderPlaceFunction = (info: string) => string

export interface ContainerPluginOptions extends ContainerOptions {
  before?: string | RenderPlaceFunction
  after?: string | RenderPlaceFunction
  type: string
  defaultTitle: string | Record<string, string>
}

/**
 * helper function to transform string to RenderPlaceFunction
 *
 * @param func
 */
function wrapRenderPlaceFunction(
  func: string | RenderPlaceFunction
): RenderPlaceFunction {
  if (typeof func === 'string') {
    return (): string => func
  }
  return func
}

const ContainerPlugin: Plugin = ({
  validate,
  marker,
  render,
  type,
  before,
  after,
  defaultTitle = type.toUpperCase(),
}: ContainerPluginOptions) => {
  const options: PluginOptionAPI = {
    name: 'vuepress-plugin-container',
    multiple: true,
  }

  if (!type) {
    logger.warn(`[${options.name}]`, `'type' option is required`)
    return options
  }

  if (!render) {
    // ===============================
    // resolve render place functions
    // ===============================
    let renderBefore: RenderPlaceFunction
    let renderAfter: RenderPlaceFunction
    if (before !== undefined && after !== undefined) {
      // user defined
      renderBefore = wrapRenderPlaceFunction(before)
      renderAfter = wrapRenderPlaceFunction(after)
    } else {
      // fallback default
      renderBefore = (info: string): string =>
        `<div class="custom-block ${type}">${
          info ? `<p class="custom-block-title">${info}</p>` : ''
        }\n`
      renderAfter = (): string => '</div>\n'
    }

    render = (tokens, index, opts, env): string => {
      const token = tokens[index]

      // ===============================
      // resolve info (title)
      // ===============================
      let info = token.info
        .trim()
        .slice(type.length)
        .trim()

      if (!info && defaultTitle) {
        if (typeof defaultTitle === 'string') {
          // const
          info = defaultTitle
        } else if (typeof defaultTitle === 'object') {
          // locale
          let { relativePath = '' } = env
          relativePath = ensureLeadingSlash(relativePath)
          const locale = Object.keys(defaultTitle)
            .filter(locale => locale !== '/')
            .find(locale => relativePath.startsWith(locale))
          if (locale) {
            info = defaultTitle[locale]
          } else {
            info = defaultTitle['/'] || ''
          }
        }
      }

      // ===============================
      // render
      // ===============================
      if (token.nesting === 1) {
        return renderBefore(info)
      } else {
        return renderAfter(info)
      }
    }
  }

  options.extendMarkdown = (md): void => {
    md.use(container, type, { render, validate, marker })
  }

  return options
}

module.exports = ContainerPlugin
