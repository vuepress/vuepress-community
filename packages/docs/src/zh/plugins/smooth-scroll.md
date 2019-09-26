---
sidebarDepth: 3
---

# vuepress-plugin-smooth-scroll <GitHubLink repo="vuepress/vuepress-contrib"/>

在你的 VuePress 站点中使用平滑滚动。

这个插件简单做了两件事：

1. 在 [scrollBehavior](https://router.vuejs.org/api/#scrollbehavior) 中使用 `window.scrollTo({ behavior: 'smooth' })`
   - [参考](https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo)
   - [浏览器兼容性](https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo#Browser_Compatibility)
   - [smoothscroll-ployfill](https://github.com/iamdustan/smoothscroll)
2. 将样式 `scroll-behavior: smooth;` 加入 `<html>` 元素
   - [参考](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior)
   - [浏览器兼容性](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior#Browser_compatibility)

::: tip

- 第一个仅对 `<RouterLink to="#anchor">` 生效
- 第二个则对 `<RouterLink to="#anchor">` 和 `<a href="#anchor">` 都生效

这两种特性的浏览器兼容性并不一样，所以目前我们同时使用了这两种特性。

为了更好的浏览器兼容性，我们建议你尽量在你的 markdown 文件中使用 `<RouterLink to="#anchor">`。
:::

## 安装

```sh
npm install vuepress-plugin-smooth-scroll
```

## 使用

```js
// .vuepress/config.js
module.exports = {
  plugins: ['vuepress-plugin-smooth-scroll'],
}
```

## 演示

- 点击侧边栏中的链接
- 点击文章标题前的锚点

```


只


是


为


了


让


页


面


更


长



```

### 页面底部
