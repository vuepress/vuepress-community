import Vue, { AsyncComponent } from 'vue'

export declare class Store {
  store: Vue
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  $get(key: string): any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  $set(key: string, value: any): void
  $emit: typeof Vue.prototype.$emit
  $on: typeof Vue.prototype.$on
}

declare class VuePress extends Store {
  isPageExists(pageKey: string): boolean

  isPageLoaded(pageKey: string): boolean

  getPageAsyncComponent(pageKey: string): () => Promise<AsyncComponent>

  loadPageAsyncComponent(pageKey: string): Promise<AsyncComponent>

  registerPageAsyncComponent(pageKey: string): void
}

declare module 'vue/types/vue' {
  export interface Vue {
    $vuepress: VuePress
  }
}
