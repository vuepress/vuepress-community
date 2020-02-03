import { resolve } from 'path'
import { readFileSync } from 'fs'
import { createApp } from '@vuepress/core'

describe('vuepress-plugin-dehydrate', () => {
  process.env.NODE_ENV = 'production'

  const app = createApp({
    sourceDir: resolve(__dirname, 'docs'),
    dest: resolve(__dirname, 'dist'),
    temp: resolve(__dirname, '.temp'),
  })

  beforeAll(async () => {
    await app.process()
    await app.build()
  }, 60000)

  function testForFile(name: string, file = name) {
    test(name, () => {
      const html = readFileSync(resolve(app.outDir, file), 'utf8')
      expect(html).toMatchSnapshot()
    })
  }

  testForFile('404.html')
  testForFile('index.html')
  testForFile('noscript.html')
})
