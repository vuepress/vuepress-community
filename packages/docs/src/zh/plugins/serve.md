---
sidebarDepth: 3
---

# vuepress-plugin-serve <GitHubLink repo="vuepress/vuepress-plugin-serve"/>

在本地使用静态服务器，测试 VuePress 的 build 结果。

## 安装

```sh
npm install -D vuepress-plugin-serve
```

## 使用

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      'vuepress-plugin-serve',
      {
        post: 1234,
        staticOptions: {
          dotfiles: 'allow',
        },
        beforeServer(app, server) {
          app.get('/path/to/my/custom', function(req, res) {
            res.json({ custom: 'response' })
          })
        },
      },
    ],
  ],
}
```

## 配置项

### commandName

- **类型:** `string`
- **默认值:** `'serve'`

vuepress-plugin-serve 会增加一个 vuepress 命令，这个选项可用于自定义命令名称。

### host

- **类型:** `string`
- **默认值:** `siteConfig.host || 'localhost'`

指定服务器的主机名。

### port

- **类型:** `number`
- **默认值:** `siteConfig.port || 8080`

指定服务器监听的端口。

### notFoundPath

- **类型:** `string`
- **默认值:** `'404.html'`

用来存放 404 页面的地址。

### staticOptions

- **类型:** `object`
- **默认值:** `{}`

提供给 [serve-static](https://github.com/expressjs/serve-static#servestaticroot-options) 的选项。

### beforeServer

- **类型:** `(app, server) => void`
- **默认值:** `undefined`

在服务器接受客户端信息之前执行。类似于 VuePress 的 [beforeDevServer](https://vuepress.vuejs.org/zh/plugin/option-api.html#beforedevserver) 选项。

### afterServer

- **类型:** `async (app, server) => void`
- **默认值:** `undefined`

在服务器接受客户端信息之后执行。类似于 VuePress 的 [afterDevServer](https://vuepress.vuejs.org/zh/plugin/option-api.html#afterdevserver) 选项。

### chainWebpack

- **type:** `(config: Config) => void`
- **default:** `undefined`

这个钩子会在服务器构建时调用。

参见 [chainWebpack](https://vuepress.vuejs.org/plugin/option-api.html#chainwebpack)。

### define

- **type:** `Record<string, string> | (() => Record<string, string>)`
- **default:** `{}`

这个钩子会在服务器构建时调用。

参见 [define](https://vuepress.vuejs.org/plugin/option-api.html#define)。

### alias

- **type:** `Record<string, string> | (() => Record<string, string>)`
- **default:** `{}`

这个钩子会在服务器构建时调用。

参见 [alias](https://vuepress.vuejs.org/plugin/option-api.html#alias)。

## CLI

使用了这个插件以后，VuePress 会新增一个 `serve` 命令。这个命令会使用已经生成的文件来构建服务器。它拥有以下的选项：

### --build

在构建服务器前先执行一轮 `vuepress build`。

### --open

当服务端准备就绪时自动打开浏览器。

### --host `<host>`

参见 [host](#host)。

### --port `<port>`

参见 [port](#port)。

::: tip
VuePress 内置的命令行选项，如 `--dest <dest>`, `--cache [cache]`, `--no-cache`，也都是支持的。
:::
