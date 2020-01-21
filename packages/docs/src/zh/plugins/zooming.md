---
sidebarDepth: 3
---

# vuepress-plugin-zooming <GitHubLink repo="vuepress/vuepress-community"/>

在你的 VuePress 站点中使用 [zooming](https://github.com/kingdido999/zooming)。

这个插件将会使你的图片支持点击缩放。

## 安装

```sh
npm install -D vuepress-plugin-zooming
```

## 使用

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      'vuepress-plugin-zooming',
      {
        selector: '.my-wrapper .my-img',
        delay: 1000,
        options: {
          bgColor: 'black',
          zIndex: 10000,
        },
      },
    ],
  ],
}
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

zooming 的 options。

> 前往 [zooming 的文档](https://desmonding.me/zooming/docs/#/configuration?id=options) 查看所有支持的 `options`。

## 高级用法

在组件中手动更新支持缩放的图片：

```js
// SomeComponent.vue
export default {
  methods: {
    updateImages() {
      // 通过某些操作更新当前页面的图片
      this.$nextTick(() => {
        // 立即更新 zooming
        this.$vuepress.zooming.update() // 使用默认的 selector
        this.$vuepress.zooming.update('.new-images') // 使用自定义的 selector

        // 在一定延迟后更新 zooming
        this.$vuepress.zooming.updateDelay() // 使用默认的 selector 和 delay
        this.$vuepress.zooming.updateDelay('.new-images') // 使用自定义的 selector 和默认的 delay
        this.$vuepress.zooming.updateDelay('.new-images', 1000) // 使用自定义的 selector 和 delay
      })
    },
  },
}
```

在你的组件中直接获取 `Zooming` 实例：

> 前往 [zooming 的文档](https://desmonding.me/zooming/docs/#/api-reference) 查看所有支持的方法。

```js
// SomeComponent.vue
export default {
  methods: {
    openImages() {
      // 获取 Zooming 实例
      const zooming = this.$vuepress.zooming.instance

      // 调用实例方法
      zooming.open()
    },
  },
}
```

## 演示

点击图片：

<img class="no-medium-zoom zooming" src="/logo/600x600.png" alt="演示" width="200"/>
