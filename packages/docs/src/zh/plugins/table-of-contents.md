---
sidebarDepth: 3
---

# vuepress-plugin-table-of-contents <GitHubLink repo="vuepress/vuepress-community"/>

为你的 VuePress 站点增加目录组件。

## 安装

```sh
npm install -D vuepress-plugin-table-of-contents
```

## 使用

```js
// .vuepress/config.js
module.exports = {
  plugins: ['vuepress-plugin-table-of-contents'],
}
```

该组件会为你注册一个 `<TOC />` 组件，该组件展示你当前页面文章的目录，你可以在 Markdown 文件和 Vue 文件中使用它。

```md
<!-- README.md / Component.vue -->

<TOC />
```

## 配置项

### componentName

- **类型:** `string`
- **默认值:** `'TOC'`

组件的名称。

## 组件 Props

### includeLevel

- **类型:** `[number, number]`
- **默认值:** `[2, 3]`

`<TOC />` 组件包含的标题范围。

例如，`[2, 4]` 代表 2 <= x <= 4 。

## 演示

**输入**

```md
<TOC />
```

**输出**

<TOC />

**输入**

```md
<TOC :include-level="[2, 2]" />
```

**输出**

<TOC :include-level="[2, 2]" />

## 与 VuePress markdown 目录语法的区别

你可能注意到 VuePress 也提供了一种 [markdown 语法 `[[toc]]`](https://vuepress.vuejs.org/zh/guide/markdown.html#table-of-contents) 来生成目录。

但是， `[[toc]]` 只是 markdown 语法，所以只能用于 `.md` 文件。而 `<TOC />` 是 Vue 组件，所以可以用于 `.md` 文件和 `.vue` 文件。

因此，当你需要在页面的其他部分使用目录时， `<TOC />` 可以满足你的需要（例如：在你自己的主题中使用目录组件）
