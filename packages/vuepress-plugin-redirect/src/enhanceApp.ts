import { join } from 'path'
import { EnhanceApp } from 'vuepress-types'
import { RedirectPluginOptions, RedirectorStorage, Redirector } from '.'

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import pluginRedirectOptions from '@dynamic/plugin-redirect-options'

interface ResolvedRedirector extends Redirector {
  base: string
  storage: false | RedirectorStorage
}

const options: RedirectPluginOptions = pluginRedirectOptions

const enhanceApp: EnhanceApp = ({ router, siteData }) => {
  const { routes = [] } = router.options
  const { redirectors: rawRedirectors = [] } = options

  // if a path has corresponding route
  function hasRoute(path: string): boolean {
    return routes.some(route => route.path.toLowerCase() === path.toLowerCase())
  }

  // get the route or fallback route of a path
  function getFallbackRoute(path): string | null {
    // if has exact route
    if (hasRoute(path)) return path

    // if has route with /
    if (!/\/$/.test(path)) {
      const endingSlashUrl = path + '/'
      if (hasRoute(endingSlashUrl)) return endingSlashUrl
    }

    // if has route with .html
    if (!/\.html$/.test(path)) {
      const endingHtmlUrl = path.replace(/\/$/, '') + '.html'
      if (hasRoute(endingHtmlUrl)) return endingHtmlUrl
    }

    return null
  }

  // locales redirector
  if (options.locales && siteData.locales) {
    // resolve locales config from siteData
    const siteLocales = siteData.locales
    const localeKeys = Object.keys(siteLocales)
    const locales = localeKeys.map(key => ({
      key: key.replace(/^\/|\/$/, ''),
      lang: siteLocales[key].lang,
    }))

    // resolve locales config from plugin options
    if (typeof options.locales !== 'object') {
      options.locales = {}
    }
    const { fallback, storage = true } = options.locales
    if (fallback) {
      localeKeys.unshift(fallback)
    }

    // add locales redirector
    rawRedirectors.unshift({
      storage,
      base: '/',
      alternative() {
        if (typeof window !== 'undefined' && window.navigator) {
          const langs = window.navigator.languages || [
            window.navigator.language,
          ]
          let locale = locales.find(({ lang }) => langs.includes(lang))
          if (!locale && options.fuzzyLocales) {
            // no exact match found, ignore region-specific dialects as a fallback
            const shortLangs = langs.map(language => language.substring(0, 2))
            locale = locales.find(({ lang }) =>
              shortLangs.includes(lang.substring(0, 2))
            )
          }
          if (locale) {
            return locale.key
          }
        }
        return localeKeys
      },
    })
  }

  // all redirectors
  const redirectors: ResolvedRedirector[] = rawRedirectors.map(
    ({ base = '/', storage: rawStorage = false, alternative }) => {
      let storage: false | RedirectorStorage = false
      if (rawStorage) {
        if (typeof rawStorage !== 'object') {
          const key =
            typeof rawStorage !== 'string'
              ? `vuepress:redirect:${base}`
              : rawStorage
          storage = {
            get(): string | null {
              if (typeof localStorage === 'undefined') return null
              return localStorage.getItem(key)
            },
            set(val): void {
              if (typeof localStorage === 'undefined') return
              localStorage.setItem(key, val)
            },
          }
        } else if (rawStorage.get && rawStorage.set) {
          // warning
          storage = rawStorage
        }
      }
      return {
        base,
        storage,
        alternative,
      }
    }
  )

  router.beforeEach((to, from, next) => {
    // if router exists, skip redirection
    const fallback = getFallbackRoute(to.path)
    if (fallback) return next()

    let target

    for (const redirector of redirectors) {
      const { base = '/', storage = false } = redirector
      let { alternative } = redirector
      if (!to.path.startsWith(base)) continue

      // get rest of the path
      // ensure ending slash at root
      const rest = to.path.slice(base.length) || '/'

      if (storage) {
        const alt = storage.get(redirector)
        if (alt) {
          const path = getFallbackRoute(join(base, alt, rest))
          if (path) {
            target = path
            break
          }
        }
      }

      // resolve alternatives
      if (typeof alternative === 'function') {
        alternative = alternative(rest)
      }
      if (!alternative) continue
      if (typeof alternative === 'string') {
        alternative = [alternative]
      }

      for (const alt of alternative) {
        const path = getFallbackRoute(join(base, alt, rest))
        if (path) {
          target = path
          break
        }
      }

      if (target) break
    }

    next(target)
  })

  router.afterEach(to => {
    // if router doesn't exist, skip storage
    if (!hasRoute(to.path)) return

    for (const redirector of redirectors) {
      const { base, storage } = redirector
      if (!storage || !to.path.startsWith(base)) continue
      const alt = to.path.slice(base.length).split('/')[0]
      if (alt) {
        storage.set(alt, redirector)
      }
    }
  })
}

export default enhanceApp
