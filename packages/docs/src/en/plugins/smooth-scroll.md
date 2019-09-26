---
sidebarDepth: 3
---

# vuepress-plugin-smooth-scroll <GitHubLink repo="vuepress/vuepress-community"/>

Make scrolling smooth in your VuePress site.

## Installation

```sh
npm install vuepress-plugin-smooth-scroll
```

## Usage

### Use this plugin

```js
// .vuepress/config.js
module.exports = {
  plugins: ['vuepress-plugin-smooth-scroll'],
}
```

## Details

This plugin simply does two things:

1. Use `window.scrollTo({ behavior: 'smooth' })` for [scrollBehavior](https://router.vuejs.org/api/#scrollbehavior)

- [Reference](https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo)
- [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo#Browser_Compatibility)
- [smoothscroll-ployfill](https://github.com/iamdustan/smoothscroll)

2. Add `scroll-behavior: smooth;` to the `<html>` element

- [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior)
- [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior#Browser_compatibility)

::: tip

- The first one only works with `<RouterLink to="#anchor">`
- The second one works with both `<RouterLink to="#anchor">` and `<a href="#anchor">`

You may notice that the browser compatibility of this two features are quite different, so we currently use both of them.

For better browser compatibility, we suggest to use `<RouterLink to="#anchor">` in your markdown file if possible.
:::

## Demo

- Click the links in the sidebar
- Click the header anchors

```


This



is



used



to



make



the



page



longer


```

### End of the page
