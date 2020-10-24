---
sidebarDepth: 3
---

# vuepress-plugin-serve <GitHubLink repo="vuepress/vuepress-community"/>

Serve generated files of your VuePress site locally.

## Installation

```sh
npm install -D vuepress-plugin-serve
```

## Usage

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      'vuepress-plugin-serve',
      {
        port: 1234,
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

## Configs

### commandName

- **type:** `string`
- **default:** `'serve'`

vuepress-plugin-serve will add a vuepress command. This option can be used to specify the command name.

### host

- **type:** `string`
- **default:** `siteConfig.host || 'localhost'`

Specify the host to use for the server.

### port

- **type:** `number`
- **default:** `siteConfig.port || 8080`

Specify the port to use for the server.

### notFoundPath

- **type:** `string`
- **default:** `'404.html'`

Path for "404 not found" page (relative to `dest` path).

### staticOptions

- **type:** `object`
- **default:** `{}`

Options for [serve-static](https://github.com/expressjs/serve-static#servestaticroot-options).

### beforeServer

- **type:** `(app, server) => void | Promise<void>`
- **default:** `undefined`

Executed before the server accepts client information. Similar to VuePress's [beforeDevServer](https://vuepress.vuejs.org/en/plugin/option-api.html#beforedevserver) option.

### afterServer

- **type:** `async (app, server) => void | Promise<void>`
- **default:** `undefined`

Executed after the server accepts client information. Similar to VuePress's [afterDevServer](https://vuepress.vuejs.org/en/plugin/option-api.html#afterdevserver) option.

## CLI

After using this plugin, VuePress will add a `serve` command. This command will created a server based on the generated files. It has the following options:

### --build

Execute `vuepress build` before creating the server.

### --open

Open the browser when the server is ready.

### --host `<host>`

See [host](#host).

### --port `<port>`

See [port](#port).

::: tip
VuePress built-in command line options (such as `--dest <dest>`, `--cache [cache]`, `--no-cache`) are also supported.
:::
