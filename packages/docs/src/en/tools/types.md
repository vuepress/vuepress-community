---
sidebarDepth: 3
---

# vuepress-types <GitHubLink repo="vuepress/vuepress-community"/>

Currently VuePress does not support typescript, and does not provide types definition.

[vuepress-plugin-typescript](../plugins/typescript.md) provides part of the ability to use typescript in VuePress. If you want to get the correct types definition, you can try to use `vuepress-types` together.

::: warning EXPERIMENTAL
`vuepress-types` is an experimental package for VuePress types definition. Feel free to open an issue if you find it does not work as expected.
:::

## Installation

```sh
npm install -D vuepress-types
```

## Usage

You can choose **ONE OF** the following approaches to use it:

### Import it manually

You can import it manually in your `.vue` files:

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

### Add it to tsconfig

You can add it to the `compilerOptions.types` of your `tsconfig.json`:

> See [docs of `tsconfig.json`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#types-typeroots-and-types)

```json {3}
{
  "compilerOptions": {
    "types": ["vuepress-types"]
  }
}
```
