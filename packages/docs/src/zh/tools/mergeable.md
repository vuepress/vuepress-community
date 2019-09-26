---
sidebarDepth: 3
---

# vuepress-mergeable <GitHubLink repo="vuepress/vuepress-mergeable"/>

`vuepress-mergeable` 基于 [deconstruct-merge](https://github.com/Shigma/deconstruct-merge)，可以用于定制化 VuePress 插件选项合并的方式。

## 为什么我需要这个？

在 VuePress 中，一个插件可以被多次使用但仅会保留一个 `options`。如果你的插件被多处使用（比如既在 `config.js` 中被直接引用，又被插件和主题间接地使用），它们的 `options` 将会互相覆盖，从而导致各种未知的负面影响。这个工具可以帮助你创造一个可以按照你的喜好自动合并选项的插件。

## 解构合并

合并两个选项的方式有很多种：

- `override`：后面传入选项覆盖前面的
- `assign`：使用 `Object.assign` 进行合并
- `array`：将全部传入的选项依次放入一个数组
- `flat`：将传入的选项放入一个数组并压平

### 定义对象中不同属性的合并方式

如果某个选项是一个对象，其中不同的属性要使用不同的合并方式，你可以将选项本身也写成对象式：

```js
mergeOptions = {
  foo: 'array',
  bar: 'flat',
}
```

此时，`foo` 选项将采用数组进行合并，而 `bar` 选项则采用压平的数组。

### 定义数组中不同元素的合并方式

如果某个选项是一个数组，其中不同的元素要使用不同的合并方式，你可以将选项本身也写成数组式：

```js
mergeOptions = ['override', 'assign']
```

此时，数组的第一个元素将使用覆盖的合并方式，而第二个元素则采用 `Object.assign` 进行合并。

### 使用函数定义合并方式

如果上面的 4 种合并策略都不满足你的需求，则你可以自己写一个函数来定义合并方式：

```js
mergeOptions = function(value, oldValue) {
  return value + oldValue
}
```

当然，如果有好的想法，我们也欢迎你向我们提出 PR。

### 解构你的选项

上面的语法可以被递归地应用在你的选项中，这使得你可以精细地定义每一个细节的合并逻辑。下面是一个案例：

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

::: tip 提示
`override` 是我们的默认合并策略。因此任何没有在 `mergeOptions` 中定义的对象属性或数组元素都将自动采取覆盖策略。
:::

## 使用方法

### mergeable(plugin, mergeOptions?, defaultOptions?): plugin

- **plugin:** 任何 VuePress 插件
- **mergeOptions:** 解构合并的选项
- **defaultOptions:** 插件的默认选项

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
    // 解构合并的选项
    foo: 'assign',
    bar: 'flat',
  },
  {
    // 插件的默认选项
    foo: { a: 1 },
  }
)
```

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    // 多次使用的你的插件
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

这会是得到的结果：

```js
{ foo: { a: 1, b: 3, c: 4 },
  bar: ['Hello'],
  baz: 'World' }
```
