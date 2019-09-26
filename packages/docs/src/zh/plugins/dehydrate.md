---
sidebarDepth: 3
---

# vuepress-plugin-dehydrate <GitHubLink repo="vuepress/vuepress-plugin-dehydrate"/>

修改你的 VuePress 生成的 HTML 文件。

## 安装

```sh
npm install vuepress-plugin-dehydrate
```

## 使用

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    'vuepress-plugin-dehydrate',
    {
      // 禁用 SSR
      noSSR: '404.html',
      // 移除 scripts
      noScript: [
        // 支持 glob patterns
        'foo/*.html',
        '**/static.html',
      ],
    },
  ],
}
```

## 配置项

### noSSR

- **类型:** `string | string[]`
- **默认值:** `'404.html'`

要禁用 SSR 的页面列表，支持 [glob patterns](https://github.com/isaacs/minimatch#usage)。

### noScript

- **类型:** `string | string[]`
- **默认值:** `[]`

要移除 script 的页面列表，支持 [glob patterns](https://github.com/isaacs/minimatch#usage)。

### globOptions

- **类型:** `object`
- **默认值:** `{}`

提供给 [fast-glob](https://github.com/mrmlnc/fast-glob#options-1) 的选项。

### noEmptyLine

- **类型:** `boolean`
- **默认值:** `true`

是否删除 HTML 中多余的空行。

## 为什么需要这个插件

### SSR 错配

VuePress 会尝试从未找到的页面 `/foo` 重定向到 `/foo.html` 或 `/foo/`。有时我们也希望根据当前语言自动将 `/` 重定向 `/` 到 `/zh/` 或者 `/en/`。

VuePress 在绝大部分情况下都能正常工作，但是如果页面在在 Vue 载入之前就发生了重定向，页面预渲染的部分将会与重定向的目标页面结构不统一，导致名为 **SSR 错配** 的问题。

#### 一个 SSR 错配的例子

你向浏览器请求 `/foo` 页面，但服务器并没有找到对应的文件，因此返回了一个 `NotFound` 页面，即 `/404.html`。而注册在 [`handleRedirectForCleanUrls`](https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/core/lib/client/redirect.js#L23-L50) 中的 `beforeEach` 钩子将会把路由重定向到 `/foo.html`。注意此时 DOM 仍然没有被改变，但是 VDOM 已经被替换成了 `/foo.html` 中的样子。一般来说，`/404.html` 不会包含导航栏或者侧边栏，但是此时的 VDOM 仍然会尝试将它们注入到 DOM 中。这就使得 DOM 与 VDOM 发生了错配，导致了报错并阻止了 Vue 的进一步运行。这就是 SSR 错配的结果。

**参考:**

- [vuejs/vuepress#1382](https://github.com/vuejs/vuepress/issues/1382)

### 使用“纯粹”的 HTML

我们有时也想摆脱各种 preload, prefetch 脚本，得到一个更加简单的 HTML 页面。我们可以将 Vue 和 markdown 仅作为组织网站结构的工具，不需要任何运行时的 JS 代码，当想要 CSS 时也可以简单地通过在 `<head>` 中加一个 `<link>` 实现。

**参考:**

- [vuejs/vuepress#602](https://github.com/vuejs/vuepress/issues/602)

### 解决方案

这或许令人惊奇，但是解决这两个问题的方式是类似的。VuePress 使用 `ssrTemplate` 作为 SSR 渲染的模板。我们要做的只是删去其中的一部分。对于第一个问题，由于所有发生 SSR 错配的重定向都发生在 404 页面，我们只需要禁用该页面的 SSR 即可。由于 404 页面一般都较为简单并且不太需要针对搜索引擎进行优化，这种解决方案是可行的。第二个问题则相反，需要我们不是删除 SSR 预渲染的部分，而是保留它们，删去用于注入 Vue 的脚本即可。这个插件同时提供了这两方面的能力，可以使我们有效地控制每一个页面。

#### 示例

一个正常情况下生成的 HTML 文件会长这样：

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>VuePress</title>
    <meta name="description" content="" />
    <link rel="preload" href="/assets/css/0.styles.53e4595a.css" as="style" />
    <link rel="preload" href="/assets/js/app.3fe70f2e.js" as="script" />
    <link rel="preload" href="/assets/js/3.db027a4f.js" as="script" />
    <link rel="preload" href="/assets/js/5.222ba868.js" as="script" />
    <link rel="prefetch" href="/assets/js/2.418462f5.js" />
    <link rel="prefetch" href="/assets/js/4.f6ba1d08.js" />
    <link rel="prefetch" href="/assets/js/6.d7ad24ac.js" />
    <link rel="stylesheet" href="/assets/css/0.styles.53e4595a.css" />
  </head>
  <body>
    <div id="app" data-server-rendered="true">
      <div class="content default"><p>readme</p></div>
      <div class="global-ui"></div>
    </div>
    <script src="/assets/js/app.3fe70f2e.js" defer></script
    ><script src="/assets/js/3.db027a4f.js" defer></script
    ><script src="/assets/js/5.222ba868.js" defer></script>
  </body>
</html>
```

当我们使用 [`noSSR`](./config.md#nossr) 模式时，会生成这样的 HTML：

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>VuePress</title>
    <meta name="description" content="" />
    <link rel="preload" href="/assets/css/0.styles.53e4595a.css" as="style" />
    <link rel="preload" href="/assets/js/app.3fe70f2e.js" as="script" />
    <link rel="preload" href="/assets/js/3.db027a4f.js" as="script" />
    <link rel="preload" href="/assets/js/5.222ba868.js" as="script" />
    <link rel="prefetch" href="/assets/js/2.418462f5.js" />
    <link rel="prefetch" href="/assets/js/4.f6ba1d08.js" />
    <link rel="prefetch" href="/assets/js/6.d7ad24ac.js" />
    <link rel="stylesheet" href="/assets/css/0.styles.53e4595a.css" />
  </head>
  <body>
    <div id="app"><!-- 注意这里 --></div>
    <script src="/assets/js/app.3fe70f2e.js" defer></script
    ><script src="/assets/js/3.db027a4f.js" defer></script
    ><script src="/assets/js/5.222ba868.js" defer></script>
  </body>
</html>
```

当我们使用 [`noScript`](./config.md#noscript) 模式时，会生成这样的 HTML：

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>VuePress</title>
    <meta name="description" content="" />
    <!-- 注意这里 -->
    <link rel="stylesheet" href="/assets/css/0.styles.53e4595a.css" />
  </head>
  <body>
    <div id="app">
      <div class="content default"><p>readme</p></div>
      <div class="global-ui"></div>
    </div>
    <!-- 注意这里 -->
  </body>
</html>
```
