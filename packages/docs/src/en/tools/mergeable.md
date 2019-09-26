---
sidebarDepth: 3
---

# vuepress-mergeable <GitHubLink repo="vuepress/vuepress-mergeable"/>

`vuepress-mergeable` is a tool for customizing how a VuePress plugin merges its options based on [deconstruct-merge](https://github.com/Shigma/deconstruct-merge).

## Why do I need this?

In VuePress, a plugin can be used multiple times but only one `options` will be kept. If your plugins are used in different places (such as being directly referenced in `config.js` and indirectly used by plugins and themes), their `options` will overwrite each other, causing undetectable side effects. This tool can help you create a plugin that automatically merges `options` to your liking.

## Deconstruct Merge

There are many ways to merge two options:

- `override`: the latter passed option overrides the previous one
- `assign`: merge options with `Object.assign`
- `array`: put all incoming options into an array
- `flat`: put all incoming options into a flattened array

### Define how properties are merged in an object

If an option is an object where different properties use different merge methods, you can also write the option itself as an object:

```js
mergeOptions = {
  foo: 'array',
  bar: 'flat',
}
```

At a result, the `foo` option will be merged with arrays, and the `bar` option will be flattened.

### Define how elements are merged in an array

If an option is an array where different elements are to be merged differently, you can also write the options themselves as an array:

```js
mergeOptions = ['override', 'assign']
```

At a result, the first element of the array will use the override strategy, while the second element will be merged with `Object.assign`.

### Use functions to customize merge strategies

If the above four merge strategies don't satisfy your needs, you can write a function to define the merge strategy:

```js
mergeOptions = function(value, oldValue) {
  return value + oldValue
}
```

Of course, if you have a good idea, a PR is always welcomed.

### Deconstruct your options

The syntax above can be applied recursively to your options, which allows you to fine-tune the merge logic for each detail. Here is a case:

```js
mergeOptions = {
  foo: [
    'override',
    {
      bar: (value, oldValue) => value + oldValue,
      baz: 'flat',
    },
    'assign',
  ],
}
```

::: tip
`override` is our default merge strategy. Therefore, any object properties or array elements that are not defined in `mergeOptions` will automatically take the override policy.
:::

## Usage

### mergeable(plugin, mergeOptions?, defaultOptions?): plugin

- **plugin:** any VuePress plugin
- **mergeOptions:** options for deconstruct merge
- **defaultOptions:** default options for the plugin

```js
// vuepress-plugin-my-plugin/index.js
const mergeable = require('vuepress-mergeable')

module.exports = mergeable(
  options => ({
    ready() {
      console.log(options)
    },
  }),
  {
    // mergeOptions
    foo: 'assign',
    bar: 'flat',
  },
  {
    // defaultOptions
    foo: { a: 1 },
  }
)
```

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    // apply the plugin multiple times
    [
      'my-plugin',
      {
        foo: { b: 2, c: 4 },
        baz: 'Hello',
      },
    ],
    [
      'my-plugin',
      {
        foo: { b: 3 },
        bar: 'Hello',
        baz: 'World',
      },
    ],
  ],
}
```

And this will be the merged options:

```js
{ foo: { a: 1, b: 3, c: 4 },
  bar: ['Hello'],
  baz: 'World' }
```
