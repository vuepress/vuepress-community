---
sidebarDepth: 3
---

# vuepress-plugin-migrate <GitHubLink repo="vuepress/vuepress-plugin-migrate"/>

从其他网站迁移到 VuePress。

## 安装

```sh
npm install -D vuepress-plugin-migrate
```

## 使用

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      'vuepress-plugin-migrate',
      {
        targetDir: '_posts',
        downloadDir: '.vuepress/downloads',
      },
    ],
  ],
}
```

## 配置项

### targetDir

- **类型:** `string`
- **默认值:** `'_posts'`

要输出 markdown 文件的目录。

### downloadDir

- **类型:** `string`
- **默认值:** `'.vuepress/downloads'`

用于存储下载文件的目录。

### maxConcurrentTasks

- **类型:** `number`
- **默认值:** `10`

允许的最大下载并发数。

### forceDownload

- **类型:** `boolean`
- **默认值:** `false`

当检测到 `.html` 文件已存在时是否强制下载。

### forceConvert

- **类型:** `boolean`
- **默认值:** `false`

当检测到 `.md` 文件已存在时是否强制覆盖。

### sitemap

- **类型:** `string`
- **默认值:** `undefined`

原网站的 sitemap 链接。

### getFileName

- **类型:** `(url: string) => string`
- **默认值:** `url => String(++index)`

要保存为的文件名。如果返回一个 falsy 值，则不下载对应的文件。

### parseHTML

- **类型:** `($: CheerioElement, render: ($: CheerioElement) => string) => ParsedResult`
- **默认值:** `undefined`

从爬取的 HTML 生成对应 `ParsedResult` 对象的函数。一个 `ParsedResult` 是一个含有以下属性的对象：

```ts
interface ParsedResult {
  frontmatter?: any
  filename?: string
  content?: string
}
```

## CLI

### 通用选项

这些选项将在任何一个命令中生效。

### --detail

在遇到错误时显示详细信息。

### -f, --forced

相当于将 [forceDownload](#forceDownload) 和 [forceConvert](#forceConvert) 都设置为 `true`。

### vuepress download

从源网站中爬取所需的页面，并存储到本地文件夹中。

### -s, --sitemap `<sitemap>`

详见 [sitemap](#sitemap)。

### vuepress convert

将存储在本地的 HTML 文件转化为 markdown 文件并输出。

### -t, --target `<targetDir>`

详见 [targetDir](#targetDir)。

### vuepress migrate

依次完成 download 和 convert 两个命令。支持两个命令的全部参数。
