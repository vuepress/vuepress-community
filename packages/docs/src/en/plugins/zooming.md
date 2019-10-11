---
sidebarDepth: 3
---

# vuepress-plugin-zooming <GitHubLink repo="vuepress/vuepress-community"/>

Use [zooming](https://github.com/kingdido999/zooming) in your VuePress site.

This plugin will make your images zoomable.

## Installation

```sh
npm install vuepress-plugin-zooming
```

## Usage

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

## Configs

### selector

- **type:** `string`
- **default:** `'.theme-default-content img'`

Selector for zoomable image elements.

### delay

- **type:** `number`
- **default:** `500`

Make imgaes zoomable with delay after entering a page.

### options

- **type:** `Object`
- **default:** `{}`

Options of zooming.

> See the [docs of zooming](https://desmonding.me/zooming/docs/#/configuration?id=options) for all available `options`.

## Advanced usage

Update zoomable images manually in your components:

```js
// SomeComponent.vue
export default {
  methods: {
    updateImages() {
      // do something to update images in this page
      this.$nextTick(() => {
        // update zooming immediately
        this.$vuepress.zooming.update() // with default selector
        this.$vuepress.zooming.update('.new-images') // with custom selector

        // update zooming with delay
        this.$vuepress.zooming.updateDelay() // with default selector and delay
        this.$vuepress.zooming.updateDelay('.new-images') // with custom selector and default delay
        this.$vuepress.zooming.updateDelay('.new-images', 1000) // with custom selector and delay
      })
    },
  },
}
```

Get the `Zooming` instance directly in your components:

> See the [docs of zooming](https://desmonding.me/zooming/docs/#/api-reference) for all available methods.

```js
// SomeComponent.vue
export default {
  methods: {
    openImages() {
      // get the Zooming instance
      const zooming = this.$vuepress.zooming.instance

      // call the instance methods
      zooming.open(img)
    },
  },
}
```

## Demo

Click the image:

<img class="no-medium-zoom zooming" src="/logo/600x600.png" alt="demo" width="200"/>
