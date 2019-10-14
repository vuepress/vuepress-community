import { App } from 'vuepress-types'
import { fs, path, parseFrontmatter } from '@vuepress/shared-utils'
import { createApp } from '@vuepress/core'

const fragmentDir = path.join(__dirname, '__fragments__')

describe('containers', () => {
  let app: App

  beforeAll(async () => {
    app = createApp({
      plugins: [
        [
          'vuepress-plugin-container',
          {
            type: 'hint',
            defaultTitle: {
              '/': '💡 HINT',
              '/jp/': 'ヒント',
            },
          },
        ],
        [
          'vuepress-plugin-container',
          {
            type: 'theorem',
            before: (info: string): string =>
              `<div class="theorem"><p class="title">${info}</p>`,
            after: '</div>',
          },
        ],
      ],
    })
    return app.process()
  })

  fs.readdirSync(fragmentDir).forEach((name: string) => {
    const filePath = path.join(fragmentDir, name)
    const rawFile = fs.readFileSync(filePath, 'utf8')
    const { data, content } = parseFrontmatter(rawFile)
    test(name, () => {
      const { html } = app.markdown.render(content, {
        ...(data.ENV || {}),
        frontmatter: data,
      })
      expect(html).toMatchSnapshot()
    })
  })
})
