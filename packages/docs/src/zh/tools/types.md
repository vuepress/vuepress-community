---
sidebarDepth: 3
---

# vuepress-types <GitHubLink repo="vuepress/vuepress-community"/>

目前 VuePress 并没有支持 typescript ，并且没有提供类型定义。

[vuepress-plugin-typescript](../plugins/typescript.md) 提供了在 VuePress 中使用 typescript 的部分能力。如果你想获取到正确的类型定义，你可以配合 `vuepress-types` 一起使用。

::: warning 实验中
`vuepress-types` 作为 VuePress 的类型定义包，还处于实验阶段。如果你在使用时发现任何问题，欢迎提出 Issue 。
:::

## 安装

```sh
npm install -D vuepress-types
```

## 使用

你可以选择下列 **一种** 方式使用它：

### 手动引入

你可以手动在 `.vue` 文件中引入：

```vue {2}
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

### 添加到 tsconfig

你可以把它添加到 `tsconfig.json` 的 `compilerOptions.types` 中：

> 参考 [`tsconfig.json` 文档](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#types-typeroots-and-types)

```json {3}
{
  "compilerOptions": {
    "types": ["vuepress-types"]
  }
}
```
