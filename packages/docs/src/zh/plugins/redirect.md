---
sidebarDepth: 3
---

# vuepress-plugin-redirect <GitHubLink repo="vuepress/vuepress-plugin-redirect"/>

VuePress 内置了[多语言系统](https://vuepress.vuejs.org/zh/guide/i18n.html)，但你必须提供一个默认语言，否则直接访问 `/` 将只能得到 404。然而，提供默认语言往往又意味着不那么友好的项目结构（因为默认语言下的文件会比其他语言低一级），我们有时也希望网站保留 `/` 用于更加智能地重定向（比如根据 `navigator.language` 判断用户所使用的语言自动定向到相关页面）。`vuepress-plugin-redirect` 就是这样一个自动重定向的插件。当然，它所能做的事情不止是自动匹配语言，你可以通过定制你的重定向器实现任何页面到子页面的重定向。

<ClientOnly>
  <p>比如，当你在浏览器地址栏中键入 <a :href="location"><code>{{ location }}</code></a> 时，页面将自动重定向到这里。</p>
</ClientOnly>

<script>
export default {
  data: () => ({
    location: '',
  }),
  mounted () {
    this.location = location
      .toString()
      .replace(this.$localePath, '/')
      .replace(/#.*/, '')
  },
}
</script>

## 安装

```sh
npm install vuepress-plugin-redirect
```

## 使用

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      'redirect',
      {
        // 提供多语言重定向功能
        // 它会自动从 `/foo/bar/` 定向到 `/:locale/foo/bar/`，如果对应的页面存在
        locales: true,
      },
    ],
  ],
}
```

或者

```js
// .vuepress/config.js
module.exports = {
  plugins: {
    redirect: {
      redirectors: [
        // 定制化重定向
        {
          base: '/plugins/', // 将 `/my-plugins/` 自动重定向到某个子页面
          storage: true, // 保存最后一次访问的结果到 `localStorage`，供下次重定向使用
          alternative: [
            // 提供一个备选列表，如果都找不到就只能 404 Not Found 喽
            'mathjax', // 相当于 `/my-plugins/mathjax/`
            'migrate',
            'redirect',
            'serve',
          ],
        },
      ],
    },
  },
}
```

## 配置项

### locales

- **类型:** `boolean`
- **默认值:** `false`

是否提供多语言重定向功能。

### redirectors

- **类型:** `Redirector[]`
- **默认值:** `[]`

自定义的重定向器列表。

### redirector.base

- **类型:** `string`
- **默认值:** `'/'`

要进行重定向的根地址。

### redirector.storage

- **类型:** `boolean | string | Storage`
- **默认值:** `false`

决定重定向的结果被以何种方式存储。如果设为 `string`，则对应 `localStorage` 的键值。如果是对象，则必须包含下面两个方法：

- `get(redirector: Redirector): string`
- `set(value: string, redirector: Redirector): void`

下面提供一个简单的 `storage` 对象以供大家参考：

```js
const storage = {
  get({ base }) {
    if (typeof localStorage === 'undefined') return null
    return localStorage.getItem('redirect:' + base)
  },
  set(value, { base }) {
    if (typeof localStorage === 'undefined') return
    localStorage.setItem('redirect:' + base, value)
  },
}
```

### redirector.alternative

- **类型:** `string | string[] | ((rel: string) => string | string[])`
- **默认值:** `undefined`

重定向的备选列表。被请求的网址将被分为 `base` 和 `rel` 两个部分，`alternative` 将插入它们之间。如果是一个函数，将传入 `rel` 作为参数。得到的所有结果将被一一尝试，取第一个存在的页面进行重定向。
