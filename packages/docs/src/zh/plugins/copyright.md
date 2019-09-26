---
sidebarDepth: 3
copyright:
  minLength: 40
---

# vuepress-plugin-copyright <GitHubLink repo="vuepress/vuepress-plugin-copyright"/>

处理你的 VuePress 站点中的复制操作。

## 安装

```sh
npm install vuepress-plugin-copyright
```

## 使用

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      'copyright',
      {
        noCopy: true, // 选中的文字将无法被复制
        minLength: 100, // 如果长度超过 100 个字符
      },
    ],
  ],
}
```

### 使用 frontmatter

你可以在 frontmatter 中对当前页面启用或者禁用这个插件：

```yaml
---
copyright: false # 在当前页面禁用这个插件
---

```

你也可以进行局部配置：

```yaml
---
# 这是当前页面的 frontmatter
copyright:
  minLength: 40 # 这个配置会覆盖全局配置
---

```

你可以在下面的输入框中看看复制的效果：

<textarea rows="10"></textarea>

<style lang="stylus">

textarea
  width 100%
  width -webkit-fill-available
  resize vertical

</style>

### 自定义剪贴板

你可以使用 [`clipboardComponent`](#clipboardcomponent) 自定义你的剪贴板。下面举出了一个简单的例子：

```vue
<template>
  <div>
    <p>
      著作权归 VuePress Community 所有。 链接：<a :href="location">{{
        location
      }}</a>
    </p>
    <div v-html="html" />
  </div>
</template>

<script>
export default {
  props: ['html'],

  created() {
    this.location = window.location
  },
}
</script>
```

## 配置项

标有 <Badge text="frontmatter" vertical="bottom"/>的配置将会允许在 [frontmatter](#frontmatter) 中使用。标有 <Badge text="default" vertical="bottom"/>的配置只在使用默认剪贴板组件时生效。

### disabled

- **类型:** `boolean`
- **默认值:** `false`

是否默认禁用这个插件的功能。

### noCopy <Badge text="frontmatter"/>

- **类型:** `boolean`
- **默认值:** `false`

是否禁止复制。

### noSelect <Badge text="frontmatter"/>

- **类型:** `boolean`
- **默认值:** `false`

是否禁止选中。

### minLength <Badge text="frontmatter"/>

- **类型:** `number`
- **默认值:** `0`

触发剪贴板组件或 [`noCopy`](#nocopy) 效果的最小文本长度。

### authorName <Badge text="default"/>

- **类型:** `string | Record<string, string>`
- **默认值:** `'Author'`

作者名称。可以提供一个字符串或 i18n 对象，例如：

```json
{
  "en-US": "Author",
  "zh-CN": "作者"
}
```

### clipboardComponent

- **类型:** `string`
- **默认值:** `undefined`

[自定义剪贴板](#自定义剪贴板)组件的路径。如果提供了相对路径，将基于 `sourceDir` 进行解析。
