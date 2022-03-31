---
sidebarDepth: 3
---

# vuepress-plugin-container <GitHubLink repo="vuepress/vuepress-community"/>

Register markdown containers in your VuePress site.

## Installation

```sh
npm install -D vuepress-plugin-container
```

## Usage

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    // you can use this plugin multiple times
    [
      'vuepress-plugin-container',
      {
        type: 'right',
        defaultTitle: '',
      },
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'theorem',
        before: info => `<div class="theorem"><p class="title">${info}</p>`,
        after: '</div>',
      },
    ],

    // this is how VuePress Default Theme use this plugin
    [
      'vuepress-plugin-container',
      {
        type: 'tip',
        defaultTitle: {
          '/': 'TIP',
          '/zh/': '提示',
        },
      },
    ],
  ],
}
```

```stylus
// .vuepress/styles/index.styl
.theorem
  margin 1rem 0
  padding .1rem 1.5rem
  border-radius 0.4rem
  background-color #f0f4f8
  .title
    font-weight bold

.custom-block
  &.right
    color transparentify($textColor, 0.4)
    font-size 0.9rem
    text-align right
```

## Configs

### type

- **type:** `string`
- **required:** `true`

The type for the container. For example, if `type` is set to `foo`, only the following syntax will be parsed as a container:

```md
::: foo bar
write something here ~
:::
```

### defaultTitle

- **type:** `string | Record<string, string>`
- **default:** the upper case of `type`

The default title for the container. If no title is provided, `defaultTitle` will be shown as the title of the container.

Provide an object as locale config, and the default title will depend on current locale.

### before

- **type:** `string | ((info: string) => string)`
- **default:** `undefined`

String to be placed before the block.

If specified as a function, an argument `info` will be passed to it. (In the example above, `info` will be `bar`.)

If specified a value for `before`, `defaultTitle` will be ignored.

### after

- **type:** `string | ((info: string) => string)`
- **default:** `undefined`

String to be placed after the block.

If specified as a function, an argument `info` will be passed to it. (In the example above, `info` will be `bar`.)

### validate

- **type:** `((params: string) => boolean)`
- **default:** `undefined`

A function to validate tail after opening marker, should return `true` on success.

> See [markdown-it-container API](https://github.com/markdown-it/markdown-it-container#api)

### render

- **type:** `Function`
- **default:** `undefined`

The renderer function for opening/closing tokens. If specified, `before`, `after` and `defaultTitle` will be ignored.

> See [markdown-it-container API](https://github.com/markdown-it/markdown-it-container#api)

### marker

- **type:** `string`
- **default:** `':'`

The character to use as a delimiter.

> See [markdown-it-container API](https://github.com/markdown-it/markdown-it-container#api)

## Demo

**Input**

```md
::: theorem Newton's First Law
In an inertial frame of reference, an object either remains at rest or continues to move at a constant velocity, unless acted upon by a force.

::: right
From [Wikipedia](https://en.wikipedia.org/wiki/Newton%27s_laws_of_motion)
:::

::: tip
Tip container of `@vuepress/theme-default`
:::
```

**Output**

::: theorem Newton's First Law
In an inertial frame of reference, an object either remains at rest or continues to move at a constant velocity, unless acted upon by a force.

::: right
From [Wikipedia](https://en.wikipedia.org/wiki/Newton%27s_laws_of_motion)
:::

::: tip
Tip container of `@vuepress/theme-default`
:::
