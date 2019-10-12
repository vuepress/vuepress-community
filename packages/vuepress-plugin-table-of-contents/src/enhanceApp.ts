import { EnhanceApp } from 'vuepress-types'
import TableOfContents from './components/TableOfContents'

declare const TOC_COMPONENT_NAME: string

const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.component(TOC_COMPONENT_NAME, TableOfContents)
}

export default enhanceApp
