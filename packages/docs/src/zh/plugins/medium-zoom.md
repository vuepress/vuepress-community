---
sidebarDepth: 3
---

# vuepress-plugin-medium-zoom <GitHubLink repo="vuepress/vuepress-plugin-medium-zoom"/>

在你的 VuePress 站点中使用 [medium-zoom](https://github.com/francoischalifour/medium-zoom)。

这个插件将会使你的图片支持点击缩放。

## 安装

```sh
npm install vuepress-plugin-medium-zoom
```

## 使用

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      'vuepress-plugin-medium-zoom',
      {
        selector: '.my-wrapper .my-img',
        delay: 1000,
        options: {
          margin: 24,
          background: '#BADA55',
          scrollOffset: 0,
        },
      },
    ],
  ],
}
```

在 `palette.styl` 中修改 `medium-zoom-overlay` 的默认 `z-index`：

> 查看 [官方文档](https://vuepress.vuejs.org/zh/config/#palette-styl)

```stylus
// 默认值： 100
$mediumZoomZIndex = 10000
```

## 配置项

### selector

- **类型:** `string`
- **默认值:** `'.theme-default-content img'`

支持点击缩放的图片元素的选择器，只有符合该选择器的图片才能被缩放。

### delay

- **类型:** `number`
- **默认值:** `500`

进入一个页面后，经过一定延迟后使页面中的图片支持缩放。

### options

- **类型:** `Object`
- **默认值:** `{}`

medium-zoom 的 options。

> 前往 [medium-zoom 的文档](https://github.com/francoischalifour/medium-zoom#options) 查看所有支持的 `options`。

## 高级用法

在组件中手动更新支持缩放的图片：

```js
// SomeComponent.vue
export default {
  methods: {
    updateImages() {
      // 通过某些操作更新当前页面的图片
      this.$nextTick(() => {
        // 立即更新 mediumZoom
        this.$vuepress.mediumZoom.update() // 使用默认的 selector
        this.$vuepress.mediumZoom.update('.new-images') // 使用自定义的 selector

        // 在一定延迟后更新 mediumZoom
        this.$vuepress.mediumZoom.updateDelay() // 使用默认的 selector 和 delay
        this.$vuepress.mediumZoom.updateDelay('.new-images') // 使用自定义的 selector 和默认的 delay
        this.$vuepress.mediumZoom.updateDelay('.new-images', 1000) // 使用自定义的 selector 和 delay
      })
    },
  },
}
```

在你的组件中直接获取 `mediumZoom` 实例：

> 前往 [medium-zoom 的文档](https://github.com/francoischalifour/medium-zoom#methods) 查看所有支持的方法。

```js
// SomeComponent.vue
export default {
  methods: {
    openImages() {
      // 获取 mediumZoom 实例
      const zoom = this.$vuepress.mediumZoom.instance

      // 调用实例方法
      zoom.open()
    },
  },
}
```
