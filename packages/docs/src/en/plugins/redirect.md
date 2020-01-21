---
sidebarDepth: 3
---

# vuepress-plugin-redirect <GitHubLink repo="vuepress/vuepress-community"/>

VuePress has a built-in [i18n system](https://vuepress.vuejs.org/en/guide/i18n.html), but you must provide a default language, otherwise you will only get a 404 if you try to access `/` directly. However, providing a default language often means a less friendly project structure (because the files in the default language are one level lower than others), and we sometimes want our website to keep `/` for a more intelligent redirection (e.g. determines that the language used by the user based on `navigator.language` and automatically redirects to the corresponding page). `vuepress-plugin-redirect` is such a plugin that handles automatic redirections. Of course, its capacity is not limited to automatic redirecting of the language, because you can redirect any page to its subpages via a custom redirector.

<ClientOnly>
  <p>For example, when you type <a :href="location"><code>{{ location }}</code></a> in address bar, the page will be redirected automatically here.</p>
</ClientOnly>

<script>
export default {
  data: () => ({
    location: '',
  }),
  mounted () {
    this.location = location
      .toString()
      .replace(this.$localePath, '/')
      .replace(/#.*/, '')
  },
}
</script>

## Installation

```sh
npm install -D vuepress-plugin-redirect
```

## Usage

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      'vuepress-plugin-redirect',
      {
        // provide i18n redirection
        // it will automatically redirect `/foo/bar/` to `/:locale/foo/bar/` if exists
        locales: true,
      },
    ],
  ],
}
```

or

```js
// .vuepress/config.js
module.exports = {
  plugins: {
    redirect: {
      redirectors: [
        // customize your redirectors
        {
          base: '/my-plugins/', // automatically redirect `/my-plugins/` to a subpage
          storage: true, // save the result of the last visit to `localStorage` for the next redirect
          alternative: [
            // provide an alternate list
            // if no page was matched, you will get a "404 not found"
            'mathjax', // equivalent to `/my-plugins/mathjax/`
            'migrate',
            'pangu',
            'redirect',
            'serve',
          ],
        },
      ],
    },
  },
}
```

## Configs

### locales

- **type:** `boolean`
- **default:** `false`

Whether to provide i18n redirection.

### redirectors

- **type:** `Redirector[]`
- **default:** `[]`

A list of custom redirectors.

### redirector.base

- **type:** `string`
- **default:** `'/'`

Base URL to be redirected.

### redirector.storage

- **type:** `boolean | string | Storage`
- **default:** `false`

Decide how the results of the redirect are stored. If set to `string`, it corresponds to the key of `localStorage`. If it is an object, you must include the following two methods:

- `get(redirector: Redirector): string`
- `set(value: string, redirector: Redirector): void`

A simple `storage` object is provided below for your reference:

```js
const storage = {
  get({ base }) {
    if (typeof localStorage === 'undefined') return null
    return localStorage.getItem('redirect:' + base)
  },
  set(value, { base }) {
    if (typeof localStorage === 'undefined') return
    localStorage.setItem('redirect:' + base, value)
  },
}
```

### redirector.alternative

- **type:** `string | string[] | ((rel: string) => string | string[])`
- **default:** `undefined`

An alternate list of redirects. A requested URL will be devided into two parts, `base` and `rel`, and `alternative` will be inserted between them. If it is a function, `rel` will be passed as a parameter. All the results obtained will be tried in sequence, and the first existing page will be taken for redirection.
