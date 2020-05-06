---
sidebarDepth: 3
---

# vuepress-plugin-table-of-contents <GitHubLink repo="vuepress/vuepress-community"/>

Add table-of-contents component for your VuePress site.

## Installation

```sh
npm install -D vuepress-plugin-table-of-contents
```

## Usage

```js
// .vuepress/config.js
module.exports = {
  plugins: ['vuepress-plugin-table-of-contents'],
}
```

This plugin will register a `<TOC />` component for you, which will render the table-of-contents of current page. You can use it in your markdown and vue files.

```md
<!-- README.md / Component.vue -->

<TOC />
```

## Configs

### componentName

- **type:** `string`
- **default:** `'TOC'`

Name of the table-of-contents component.

## Component Props

### includeLevel

- **type:** `[number, number]`
- **default:** `[2, 3]`

The level of title to be included in `<TOC />` component.

For example, `[2, 4]` means 2 <= x <= 4.

## Demo

### Input

```md
<TOC />
```

### Output

<TOC />

### Input

```md
<TOC :include-level="[2, 2]" />
```

### Output

<TOC :include-level="[2, 2]" />

## Differences from VuePress markdown toc syntax

You may notice that VuePress also provides a [markdown syntax `[[toc]]`](https://vuepress.vuejs.org/guide/markdown.html#table-of-contents) for table-of-contents.

However, `[[toc]]` can only be used in `.md` files as it's a markdown syntax. But `<TOC />` can be used in both `.md` files and `.vue` files, as it's a Vue component.

Thus, `<TOC />` is more convenient if you need table-of-contents in other part of your VuePress site (e.g. build your own theme with a table-of-contents component).
