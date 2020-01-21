---
sidebarDepth: 3
---

# vuepress-plugin-typescript <GitHubLink repo="vuepress/vuepress-community"/>

## Installation

```sh
npm install -D vuepress-plugin-typescript typescript
```

## Usage

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      'vuepress-plugin-typescript',
      {
        tsLoaderOptions: {
          // All options of ts-loader
        },
      },
    ],
  ],
}
```

## Configs

### tsLoaderOptions

- **type:** `Object`
- **default:** `{}`

Loader Options of `ts-loader`. See [docs of ts-loader](https://github.com/TypeStrong/ts-loader#loader-options)

## Supported Features

### TS in Markdown

As we know, with the power of VuePress, we can [write Vue in Markdown](https://vuepress.vuejs.org/guide/using-vue.html).

This plugin allows you to write Vue in TypeScript in Markdown.

**Input**

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

**Output**

{{ msg }}

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    msg: 'Hello, TypeScript in Markdown!',
  }),
})
</script>

### TS in Vue SFC

This plugins allows you to write `.vue` files in TypeScript, including:

- Auto registered global components: [.vuepress/components/\*.vue](https://vuepress.vuejs.org/guide/directory-structure.html)
- Theme layout components: [theme/layouts/\*.vue](https://vuepress.vuejs.org/theme/writing-a-theme.html#layout-component)
- Other components that you want to use in VuePress

> See the [source code](https://github.com/vuepress/vuepress-community/tree/master/packages/docs/src/.vuepress/components) of this docs.

### enhanceApp.ts

VuePress supports [App Level Enhancements](https://vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements) by `.vuepress/enhanceApp.js` / `theme/enhanceApp.js`.

This plugin allows you to use `enhanceApp.ts` instead of `enhanceApp.js`.

> See the [test cases](https://github.com/vuepress/vuepress-community/blob/master/packages/vuepress-plugin-typescript/test/e2e/docs/.vuepress/theme/enhanceApp.ts) of this plugin.

::: warning
Remember to create `.vuepress/shims-vue.d.ts` file if you want to import `.vue` files in your `enhanceApp.ts` or other `.ts` files:

```ts
// .vuepress/shims-vue.d.ts
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
```

:::

## Types Definitions

You might meet some problems about the types of VuePress, e.g. missing the types definition of `this.$themeConfig`.

If you want to get the right types definition, you can try to use `vuepress-types`.

```sh
npm i -D vuepress-types
```

Then, you can choose one of the following approaches to use it:

- Import it manually in your `.vue` files:

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

- Add it to the `compilerOptions.types` of your `tsconfig.json`:

> See [docs of `tsconfig.json`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#types-typeroots-and-types)

```json
{
  "compilerOptions": {
    "types": ["vuepress-types"]
  }
}
```

::: tip
`vuepress-types` is an experimental package for VuePress types definitions. Feel free to open an issue if you find it does not work as expected.
:::
