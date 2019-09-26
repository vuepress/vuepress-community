---
sidebarDepth: 3
---

# vuepress-plugin-named-chunks <GitHubLink repo="vuepress/vuepress-plugin-named-chunks"/>

Generate named chunks for your VuePress site.

VuePress uses [dynamic import](https://webpack.js.org/guides/code-splitting/#dynamic-imports) to load page components and layout components. Each component becomes a separate chunk, but their names are automatically generated, which is not conducive to subsequent tracking. This plugin is for generating named chunks.

## Installation

```sh
npm install vuepress-plugin-named-chunks
```

## Usage

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    'named-chunks',
    {
      pageChunkName: page => 'page' + page.key.slice(1),
      layoutChunkName: layout => 'layout-' + layout.componentName,
    },
  ],
}
```

## Configs

### pageChunkName

- **type:** `((page: Page) => string) | false`
- **default:** `({ key }) => 'page' + key.slice(1)`

A function that generates chunk name from `Page` object.

### layoutChunkName

- **type:** `((layout: LayoutComponent) => string) | false`
- **default:** `false`

A function that generates chunk name from `LayoutComponent` object.

## API

This plugin will inject some properties into [context API](https://v1.vuepress.vuejs.org/plugin/context-api.html).

### chunk name of a page component

1. `context.pages` is an array of `Page` objects.
2. `page._chunkName` is the chunk name of the page component.

### chunk name of a layout component

1. `context.themeAPI.layoutComponentMap` is a map of `LayoutComponent` objects.
2. `layout.chunkName` is the chunk name of the layout component.
