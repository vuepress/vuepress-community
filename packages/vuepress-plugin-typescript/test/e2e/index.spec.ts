import { resolve } from 'path'
import { readFileSync } from 'fs'
import { createApp } from '@vuepress/core'

describe('vuepress-plugin-typescript', () => {
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

  test('should allow typescript in Layout.vue', () => {
    const html = readFileSync(resolve(app.outDir, 'index.html'), 'utf8')
    expect(html).toMatchSnapshot()
  })

  test('should allow typescript in markdown files', () => {
    const html = readFileSync(resolve(app.outDir, 'ts-in-md.html'), 'utf8')
    expect(html).toMatchSnapshot()
  })

  test('should allow typescript in enhanceApp & enhanceAppFiles', () => {
    const html = readFileSync(
      resolve(app.outDir, 'enhance-app-ts.html'),
      'utf8'
    )
    expect(html).toMatchSnapshot()
  })
})
