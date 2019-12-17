import { Plugin, PluginOptionAPI, PluginFunction } from 'vuepress-types'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Mergeable = require('deconstruct-merge')

export type MergeType = 'array' | 'assign' | 'flat' | 'override'

export interface MergeOptions {
  [key: string]: MergeType | MergeType[] | MergeOptions
}

function vuepressMergeable<T>(
  plugin: Plugin<T>,
  mergeOptions: MergeOptions,
  defaultOptions: T
): Plugin<T> {
  let pluginFunction: PluginFunction
  if (typeof plugin !== 'function') {
    pluginFunction = (): PluginOptionAPI => plugin
  } else {
    pluginFunction = plugin
  }

  const config = new Mergeable(mergeOptions).merge(defaultOptions)

  return (options, context, pluginApi): PluginOptionAPI => {
    return pluginFunction(config.merge(options).value(), context, pluginApi)
  }
}

module.exports = vuepressMergeable
