import Vue from 'vue'
import VueRouter, { RouterOptions } from 'vue-router'
import '@vuepress/core/lib/client/plugins/VuePress'
import { SiteData } from './context'

export type EnhanceApp = (options: {
  Vue: Vue
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: Record<string, any>
  router: VueRouter & { options: RouterOptions }
  siteData: SiteData
}) => void
