---
sidebarDepth: 3
---

# vuepress-plugin-dehydrate <GitHubLink repo="vuepress/vuepress-community"/>

Dehydrate generated HTML files of your VuePress site.

## Installation

```sh
npm install -D vuepress-plugin-dehydrate
```

## Usage

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    'vuepress-plugin-dehydrate',
    {
      // disable SSR
      noSSR: '404.html',
      // remove scripts
      noScript: [
        // support glob patterns
        'foo/*.html',
        '**/static.html',
      ],
    },
  ],
}
```

## Configs

### noSSR

- **type:** `string | string[]`
- **default:** `'404.html'`

A list of files to disable SSR, with [glob patterns](https://github.com/isaacs/minimatch#usage) supported.

### noScript

- **type:** `string | string[]`
- **default:** `[]`

A list of files to remove scripts, with [glob patterns](https://github.com/isaacs/minimatch#usage) supported.

### globOptions

- **type:** `object`
- **default:** `{}`

Options for [fast-glob](https://github.com/mrmlnc/fast-glob#options-1).

### noEmptyLine

- **type:** `boolean`
- **default:** `true`

Whether to delete extra blank lines in HTML.

## Why we need this plugin

### SSR Mismatch

VuePress will try to redirect unknown request `/foo` to `/foo.html` and `/foo/`. Other scenarios include redirecting `/` to `/zh/` or `/en/` based on navigator language.

Although Vuepress functions properly under most circumstances, if the page redirects before rendering, the pre-rendered parts will be structured differently from the target page of redirection, leading to a problem called **SSR mismatch**.

#### An example to explain the mismatch

You request `/foo` in the browser, but the server can't find a direct match (without certain config), so a `NotFound` page `/404.html` will be returned. The `beforeEach` hook registered in [`handleRedirectForCleanUrls`](https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/core/lib/client/redirect.js#L23-L50) will redirect the router to `/foo.html`. Note that the DOM remains unchanged but the VDOM is replaced with `/foo.html`'s. Normally, `/404.html` is a plain page without navbar and sidebar, but the new VDOM is a document page with such components. The DOM fails to match the VDOM, causing rendering error and the view will not be updated. This is an SSR Mismatch and its consequence.

**Reference:**

- [vuejs/vuepress#1382](https://github.com/vuejs/vuepress/issues/1382)

### Using "Pure" HTML

Sometimes we want to output a HTML page without all the fancy preload, prefetch and hydration script/styles. We can just use Vue / markdown files as a way to organize the static website structure. We can do CSS by setting a `<link>` that points to the CSS in the `<head>`. We don't need JS at runtime.

**Reference:**

- [vuejs/vuepress#602](https://github.com/vuejs/vuepress/issues/602)

### Solution

It may be amazing, but the solutions to these two problems are similar. VuePress uses `ssrTemplate` as a template for SSR rendering. All we have to do is delete part of them. For the first problem, since all redirections where SSR mismatches occur take place on the 404 page, we only need to disable the SSR for that page. Since 404 pages are usually simple and not so necessary to be SEO friendly, this solution is reasonable. On the contrary, in the second case, we merely need to remove the the scripts for "hydration" rather than delete SSR pre-rendered HTML. This plugin provides both of these capabilities, allowing us to control every page effectively.

#### Demo

A normally generated HTML file will be like this:

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>VuePress</title>
    <meta name="description" content="" />
    <link rel="preload" href="/assets/css/0.styles.53e4595a.css" as="style" />
    <link rel="preload" href="/assets/js/app.3fe70f2e.js" as="script" />
    <link rel="preload" href="/assets/js/3.db027a4f.js" as="script" />
    <link rel="preload" href="/assets/js/5.222ba868.js" as="script" />
    <link rel="prefetch" href="/assets/js/2.418462f5.js" />
    <link rel="prefetch" href="/assets/js/4.f6ba1d08.js" />
    <link rel="prefetch" href="/assets/js/6.d7ad24ac.js" />
    <link rel="stylesheet" href="/assets/css/0.styles.53e4595a.css" />
  </head>
  <body>
    <div id="app" data-server-rendered="true">
      <div class="content default"><p>readme</p></div>
      <div class="global-ui"></div>
    </div>
    <script src="/assets/js/app.3fe70f2e.js" defer></script>
    <script src="/assets/js/3.db027a4f.js" defer></script>
    <script src="/assets/js/5.222ba868.js" defer></script>
  </body>
</html>
```

When we use the [`noSSR`](#nossr) mode, VuePress will generate such HTML:

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>VuePress</title>
    <meta name="description" content="" />
    <link rel="preload" href="/assets/css/0.styles.53e4595a.css" as="style" />
    <link rel="preload" href="/assets/js/app.3fe70f2e.js" as="script" />
    <link rel="preload" href="/assets/js/3.db027a4f.js" as="script" />
    <link rel="preload" href="/assets/js/5.222ba868.js" as="script" />
    <link rel="prefetch" href="/assets/js/2.418462f5.js" />
    <link rel="prefetch" href="/assets/js/4.f6ba1d08.js" />
    <link rel="prefetch" href="/assets/js/6.d7ad24ac.js" />
    <link rel="stylesheet" href="/assets/css/0.styles.53e4595a.css" />
  </head>
  <body>
    <div id="app"><!-- see here --></div>
    <script src="/assets/js/app.3fe70f2e.js" defer></script>
    <script src="/assets/js/3.db027a4f.js" defer></script>
    <script src="/assets/js/5.222ba868.js" defer></script>
  </body>
</html>
```

When we use the [`noScript`](#noscript) mode, VuePress will generate such HTML:

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>VuePress</title>
    <meta name="description" content="" />
    <!-- see here -->
    <link rel="stylesheet" href="/assets/css/0.styles.53e4595a.css" />
  </head>
  <body>
    <div id="app">
      <div class="content default"><p>readme</p></div>
      <div class="global-ui"></div>
    </div>
    <!-- see here -->
  </body>
</html>
```
