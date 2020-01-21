---
sidebarDepth: 3
---

# vuepress-plugin-named-chunks <GitHubLink repo="vuepress/vuepress-community"/>

为你的 VuePress 站点生成命名 chunks 。

VuePress 使用 [dynamic import](https://webpack.js.org/guides/code-splitting/#dynamic-imports) 来加载页面组件和布局组件。每一个组件都会变成一个独立的 chunk ，但它们的名字都是自动生成的，不利于后续追踪。这个插件可以用来生成命名 chunks 。

## 安装

```sh
npm install -D vuepress-plugin-named-chunks
```

## 使用

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      'named-chunks',
      {
        pageChunkName: page => 'page' + page.key.slice(1),
        layoutChunkName: layout => 'layout-' + layout.componentName,
      },
    ],
  ],
}
```

## 配置项

### pageChunkName

- **类型:** `((page: Page) => string) | false`
- **默认值:** `({ key }) => 'page' + key.slice(1)`

用于从 `Page` 对象生成模块名称的函数。

### layoutChunkName

- **类型:** `((layout: ResolvedComponent) => string) | false`
- **默认值:** `false`

用于从 `ResolvedComponent` 对象生成模块名称的函数。

## API

这个插件将会植入在 [context API](https://vuepress.vuejs.org/zh/plugin/context-api.html) 中注入一些属性。

### 页面组件的模块名称

1. `context.pages` 是由 `Page` 对象构成的数组。
2. `page._chunkName` 是对应的页面组件的模块名称。

### 布局组件的模块名称

1. `context.themeAPI.layoutComponentMap` 是由 `ResolvedComponent` 对象构成的键值对。
2. `layout._chunkName` 是对应的布局组件的模块名称。
