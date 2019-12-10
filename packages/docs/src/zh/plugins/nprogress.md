---
sidebarDepth: 3
---

# vuepress-plugin-nprogress <GitHubLink repo="vuepress/vuepress-community"/>

在你的 VuePress 站点中使用 [nprogress](https://github.com/rstacruz/nprogress)。

这个插件将会在你切换页面的时候，在顶部显示进度条。

## 安装

```sh
npm install vuepress-plugin-nprogress
```

## 使用

```js
// .vuepress/config.js
module.exports = {
  plugins: ['vuepress-plugin-nprogress'],
}
```

## 自定义颜色

在 `palette.styl` 文件中设置 `$nprogressColor`，就可以改变进度条的颜色。如果不设置的话，默认使用 VuePress 的 `$accentColor` 作为进度条颜色。

> 查看 [官方文档](https://vuepress.vuejs.org/zh/config/#palette-styl)

```stylus
$nprogressColor = red

// by default:
// $nprogressColor ?= $accentColor
```
