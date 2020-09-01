import { EnhanceApp } from 'vuepress-types'
import Test from './components/Test.vue'
import TestTsFile from './components/TestTsFile'
import TestIndexTsFile from './components/TestIndexTsFile'

const enhanceApp: EnhanceApp = ({ Vue }) => {
  /* eslint-disable vue/match-component-file-name */
  Vue.component('Test', Test)
  Vue.component('TestTsFile', TestTsFile)
  Vue.component('TestIndexTsFile', TestIndexTsFile)
  /* eslint-enable vue/match-component-file-name */
}

export default enhanceApp
