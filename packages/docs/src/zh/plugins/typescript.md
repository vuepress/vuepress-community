---
sidebarDepth: 3
---

# vuepress-plugin-typescript <GitHubLink repo="vuepress/vuepress-community"/>

## 安装

```sh
npm install vuepress-plugin-typescript typescript
```

## 使用

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      'vuepress-plugin-typescript',
      {
        tsLoaderOptions: {
          // ts-loader 的所有配置项
        },
      },
    ],
  ],
}
```

## 配置项

### tsLoaderOptions

- **类型:** `Object`
- **默认值:** `{}`

`ts-loader` 的 Loader Options。参考 [ts-loader 文档](https://github.com/TypeStrong/ts-loader#loader-options)。

## 支持的特性

### 在 Markdown 中使用 TS

我们知道， VuePress 允许我们 [在 Markdown 中使用 Vue](https://vuepress.vuejs.org/zh/guide/using-vue.html)。

这个插件可以允许你在 Markdown 中通过 TypeScript 使用 Vue 。

**输入**

```md
{{ msg }}

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    msg: 'Hello, TypeScript in Markdown!',
  }),
})
</script>
```

**输出**

{{ msg }}

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    msg: 'Hello, TypeScript in Markdown!',
  }),
})
</script>

### 在 Vue SFC 中使用 TS

这个插件允许你使用 TypeScript 来写 `.vue` 文件，包括：

- 自动注册的全局组件: [.vuepress/components/\*.vue](https://vuepress.vuejs.org/zh/guide/directory-structure.html)
- 主题布局组件: [theme/layouts/\*.vue](https://vuepress.vuejs.org/theme/writing-a-theme.html#layout-component)
- 其他你想要在 VuePress 中使用的组件

> 参考当前文档的 [源代码](https://github.com/vuepress/vuepress-community/tree/master/packages/docs/src/.vuepress/components)。

### enhanceApp.ts

VuePress 支持 [应用级别的配置](https://vuepress.vuejs.org/zh/guide/basic-config.html#app-level-enhancements)，即 `.vuepress/enhanceApp.js` / `theme/enhanceApp.js`.

这个插件允许你使用 `enhanceApp.ts` 来代替 `enhanceApp.js` 。

> 参考这个插件的 [测试用例](https://github.com/vuepress/vuepress-community/blob/master/packages/vuepress-plugin-typescript/test/e2e/docs/.vuepress/theme/enhanceApp.ts)。

::: warning
如果你想在 `enhanceApp.ts` 或其他 `.ts` 文件中引入 `.vue` 文件，记得创建 `.vuepress/shims-vue.d.ts`:

```ts
// .vuepress/shims-vue.d.ts
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
```

:::

## 类型定义

你可能会遇到 VuePress 的类型检查问题，比如无法找到 `this.$themeConfig` 的类型定义。

如果你想获取到正确的类型定义，你可以尝试使用 `vuepress-types` 。

```sh
npm i -D vuepress-type
```

然后，选择任一方式使用它：

- 手动在 `.vue` 文件中引入：

```vue
<script lang="ts">
import 'vuepress-types'
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class App extends Vue {
  get vuepressThemeConfig() {
    return this.$themeConfig
  }
}
</script>
```

- 把它添加到 `tsconfig.json` 的 `compilerOptions.types` 中：

> 参考 [`tsconfig.json` 文档](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#types-typeroots-and-types)

```json
{
  "compilerOptions": {
    "types": ["vuepress-types"]
  }
}
```

::: tip
`vuepress-types` 是一个 VuePress 类型定义包，它还处于测试阶段。如果你在使用时发现任何问题，欢迎提出 Issue 。
:::
