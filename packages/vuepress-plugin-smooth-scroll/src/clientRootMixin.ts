import smoothscroll from 'smoothscroll-polyfill'

export default {
  mounted(): void {
    smoothscroll.polyfill()
  },
}
