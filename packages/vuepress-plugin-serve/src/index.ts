import { Server } from 'http'
import { Plugin } from 'vuepress-types'
import Express from 'express'
import { ServeStaticOptions } from 'serve-static'

const { existsSync } = require('fs')
const { resolve } = require('path')
const express = require('express') as typeof Express
const chalk = require('chalk')
const opn = require('opn')

export interface ServePluginOptions {
  /**
   * The name of the serve command
   */
  commandName?: string

  /**
   * Path to not found page
   */
  notFoundPath?: string

  /**
   * Hostname to serve
   */
  host?: string

  /**
   * Port to serve
   */
  port?: number

  /**
   * Options for serve-static
   */
  staticOptions?: ServeStaticOptions

  /**
   * The hook to applied before server is ready
   */
  beforeServer?: (app: Express.Express, server: Server) => void | Promise<void>

  /**
   * The hook to applied after server is ready
   */
  afterServer?: (app: Express.Express, server: Server) => void | Promise<void>
}

const ServePlugin: Plugin<ServePluginOptions> = (
  {
    commandName = 'serve',
    notFoundPath = '404.html',
    host: optionHost,
    port: optionPort,
    staticOptions,
    beforeServer,
    afterServer,
  },
  context
) => ({
  name: 'vuepress-plugin-serve',

  extendCli(cli): void {
    cli
      .command(commandName, 'serve generated files')
      .option('-b, --build', 'build project before serving')
      .option('-p, --port <port>', 'use specified port (default: 8080)')
      .option('-c, --cache [cache]', 'set the directory of cache')
      .option('--dest <dest>', 'the output directory for build process')
      .option('--no-cache', 'clean the cache before build')
      .option('--host <host>', 'use specified host (default: 0.0.0.0)')
      .option('--open', 'open browser when ready')
      .allowUnknownOptions()
      .action(async cliOptions => {
        // resolve the absolute path of not found file
        notFoundPath = resolve(context.outDir, notFoundPath)

        // build project first if there is no 404.html
        let has404 = existsSync(notFoundPath)

        // build project first if specified
        if (cliOptions.build || !has404) {
          process.env.NODE_ENV = 'production'
          await context.build()
          has404 = existsSync(notFoundPath)
        }

        // ensure that a 404 file exists
        if (!has404) {
          throw new Error('No 404.html was found.')
        }

        // host and port priority: cli > options > siteConfig > default
        const {
          port = optionPort || context.siteConfig.port || 8080,
          host = optionHost || context.siteConfig.host || 'localhost',
        } = cliOptions

        // express instance
        const app = express()

        // serve static files
        app.use(context.base, express.static(context.outDir, staticOptions))

        // fallback to base url
        app.get(/.*/, (req, res) => {
          if (req.path.startsWith(context.base)) {
            res.sendFile(notFoundPath) // lgtm [js/missing-rate-limiting]
          } else {
            res.redirect(context.base)
          }
        })

        // create server
        const server = app.listen(port, host, async () => {
          // apply afterServer hook
          if (typeof afterServer === 'function') {
            await afterServer(app, server)
          }

          const url = `http://${host}:${port}${context.base}`
          console.log(
            `VuePress static files is listening at ${chalk.blue(url)}`
          )

          // open browser when ready
          if (cliOptions.open) opn(url)
        })

        // apply beforeServer hook
        if (typeof beforeServer === 'function') {
          await beforeServer(app, server)
        }
      })
  },
})

module.exports = ServePlugin
