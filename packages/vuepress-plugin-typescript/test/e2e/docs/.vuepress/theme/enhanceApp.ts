import { EnhanceApp } from 'vuepress-types'
import Test from './components/Test.vue'

const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.component('Test', Test)
}

export default enhanceApp
