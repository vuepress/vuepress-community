---
sidebarDepth: 3
copyright:
  minLength: 40
---

# vuepress-plugin-copyright <GitHubLink repo="vuepress/vuepress-plugin-copyright"/>

Handles copy behaviors in your VuePress site.

## Installation

```sh
npm install -D vuepress-plugin-copyright
```

::: tip VuePress2

This plugin is for VuePress1, to use it with VuePress2, install:

```bash
npm install -D vuepress-plugin-copyright2@next
```

:::

## Usage

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      'vuepress-plugin-copyright',
      {
        noCopy: true, // the selected text will be uncopiable
        minLength: 100, // if its length is greater than 100
      },
    ],
  ],
}
```

### Use Frontmatter

You can enable or disable this plugin for the current page in frontmatter:

```yaml
---
copyright: false # disable the plugin in this page
---

```

You can also do some local configuration:

```yaml
---
# This is the frontmatter of the current page.
copyright:
  minLength: 40 # It will override global configuration.
---

```

You can see the effect of the plugin in the textarea below:

<textarea rows="10"></textarea>

<style lang="stylus">
textarea
  width 100%
  width -webkit-fill-available
  resize vertical
</style>

### Custom Clipboard

You can customize your clipboard with [`clipboardComponent`](#clipboardcomponent). Here is a simple example:

```vue
<template>
  <div>
    <p>
      Copyright © VuePress Community Link:
      <a :href="location">{{ location }}</a>
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

## Configs

Options marked with <Badge text="frontmatter" vertical="bottom"/>are also allowed in [frontmatter](#frontmatter). Options marked with <Badge text="default" vertical="bottom"/>only take effect when the default clipboard component is used.

### disabled

- **type:** `boolean`
- **default:** `false`

Whether to disable this plugin by default.

### noCopy <Badge text="frontmatter"/>

- **type:** `boolean`
- **default:** `false`

Whether to prohibit copying.

### noSelect <Badge text="frontmatter"/>

- **type:** `boolean`
- **default:** `false`

Whether to prohibit selecting.

### minLength <Badge text="frontmatter"/>

- **type:** `number`
- **default:** `0`

The minimum text length that triggers the clipboard component or the [`noCopy`](#nocopy) effect.

### authorName <Badge text="default"/>

- **type:** `string | Record<string, string>`
- **default:** `'Author'`

Author name. You can provide a string or an i18n object, for example:

```json
{
  "en-US": "Author",
  "zh-CN": "作者"
}
```

### clipboardComponent

- **type:** `string`
- **default:** `undefined`

The path to the [custom clipboard](#custom-clipboard) component. If a relative path is specified, it will be resolved based on `sourceDir`.
