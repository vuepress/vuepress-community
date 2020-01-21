---
sidebarDepth: 3
---

# vuepress-plugin-migrate <GitHubLink repo="vuepress/vuepress-plugin-migrate"/>

Migrate a website to VuePress.

## Installation

```sh
npm install -D vuepress-plugin-migrate
```

## Usage

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

## Configs

### targetDir

- **type:** `string`
- **default:** `'_posts'`

The directory for generated markdown files.

### downloadDir

- **type:** `string`
- **default:** `'.vuepress/downloads'`

The directory for downloaded HTMLs.

### maxConcurrentTasks

- **type:** `number`
- **default:** `10`

The maximum number of concurrent downloads allowed.

### forceDownload

- **type:** `boolean`
- **default:** `false`

Whether to force download a `.html` file when it already exists.

### forceConvert

- **type:** `boolean`
- **default:** `false`

Whether to force overwrite a `.md` when it already exists.

### sitemap

- **type:** `string`
- **default:** `undefined`

The sitemap URL for the source website.

### getFileName

- **type:** `(url: string) => string`
- **default:** `url => String(++index)`

The name of the file to save as. If a falsy value is returned, the corresponding file is not downloaded.

### parseHTML

- **type:** `($: CheerioElement, render: ($: CheerioElement) => string) => ParsedResult`
- **default:** `undefined`

Generates a function corresponding to the `ParsedResult` object from the crawled HTML. A `ParsedResult` is an object with the following properties:

```ts
interface ParsedResult {
  frontmatter?: any
  filename?: string
  content?: string
}
```

## CLI

### General options

These options will take effect in any of the commands.

### --detail

Show detailed informations when an error is encounted.

### -f, --forced

Equivalent to setting [forceDownload](#forceDownload) and [forceConvert](#forceConvert) to `true`.

### vuepress download

Crawl the required pages from the source site and store them in a local folder.

### -s, --sitemap `<sitemap>`

See [sitemap](#sitemap).

### vuepress convert

Convert local HTML files to a markdown files and output them.

### -t, --target `<targetDir>`

See [targetDir](#targetDir).

### vuepress migrate

Execute download and convert command in sequence. Supports parameters of both commands.
