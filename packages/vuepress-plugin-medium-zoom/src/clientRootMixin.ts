import Vue from 'vue'
import { VuepressMediumZoom } from './VuepressMediumZoom'
import '../styles/index.styl'

declare module 'vuepress-types/types/store' {
  interface VuePressStore {
    mediumZoom: VuepressMediumZoom
  }
}

export default {
  watch: {
    '$page.path'(this: Vue): void {
      if (typeof this.$vuepress.mediumZoom === 'undefined') return
      this.$vuepress.mediumZoom.updateDelay()
    },
  },

  mounted(this: Vue): void {
    this.$vuepress.mediumZoom = new VuepressMediumZoom()
    this.$vuepress.mediumZoom.updateDelay()
  },
}
