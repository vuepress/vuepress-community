import mediumZoom, { Zoom } from 'medium-zoom'

declare const MZ_SELECTOR: string
declare const MZ_OPTIONS: string
declare const MZ_DELAY: string

const mzSelector = MZ_SELECTOR
const mzOptions = JSON.parse(MZ_OPTIONS)
const mzDelay = Number(MZ_DELAY)

export class VuepressMediumZoom {
  instance: Zoom | null = null

  update(selector = mzSelector): void {
    if (typeof window === 'undefined') return
    if (this.instance === null) {
      this.instance = mediumZoom(selector, mzOptions)
    } else {
      this.instance.detach()
      this.instance.attach(selector)
    }
  }

  updateDelay(selector = mzSelector, delay = mzDelay): void {
    setTimeout(() => this.update(selector), delay)
  }
}
