import * as smoothscroll from 'smoothscroll-polyfill'
import '../styles/index.styl'

export default {
  mounted(): void {
    smoothscroll.polyfill()
  },
}
