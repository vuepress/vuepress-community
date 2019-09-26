---
sidebarDepth: 3
---

# vuepress-plugin-git-log <GitHubLink repo="vuepress/vuepress-plugin-git-log"/>

在你的 VuePress 页面信息中集成 git 日志。

## 安装

```sh
npm install vuepress-plugin-git-log
```

## 使用

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      'vuepress-plugin-git-log',
      {
        additionalArgs: '--no-merge',
        onlyFirstAndLastCommit: true,
      },
    ],
  ],
}
```

## 配置项

### formatTime

- **类型:** `(timestamp: number, lang: string) => string`
- **默认值:** `(timestamp, lang) => new Date(timestamp).toLocaleString(lang)`

用于格式化 Unix 时间的函数。

### additionalProps

- **类型:** `{ [prop: string]: string }`
- **默认值:** `{}`

一个表示额外属性的对象。键是属性名，值为对应的 [占位符](https://git-scm.com/docs/git-log#_pretty_formats)。

### additionalArgs

- **类型:** `string | string[]`
- **默认值:** `[]`

要传入的额外参数列表。

### extendGitLog

- **type:** `(git: object) => void`
- **default:** `undefined`

一个函数，用于拓展或者修改 [`$page.git`](#api) 对象。

### onlyFirstAndLastCommit

- **类型:** `boolean`
- **默认值:** `false`

是否只搜索第一个和最后一个 commit。对于大规模项目开启这个选项可能会提高初次启动速度，但是作为代价，你将将不能使用 `$page.git.commits` 和 `$page.git.contributors`。

## API

这个插件会在每个 `$page` 对象中添加 `git` 属性，它将拥有下面的属性：

### git.author

文章的作者，即第一个提交的作者。

### git.created

文章的创建日期，即第一个提交的创建时间。

### git.updated

文章的更新日期，即最后一个提交的提交时间。

### git.commits

所有提交按时间顺序构成的列表。

### git.contributors

文章的贡献者列表，即所有修改过文章的用户列表。
