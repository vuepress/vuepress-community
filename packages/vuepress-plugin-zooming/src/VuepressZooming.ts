import Zooming from 'zooming'

declare const ZOOMING_SELECTOR: string
declare const ZOOMING_OPTIONS: string
declare const ZOOMING_DELAY: string

const zoomingSelector = ZOOMING_SELECTOR
const zoomingOptions = JSON.parse(ZOOMING_OPTIONS)
const zoomingDelay = Number(ZOOMING_DELAY)

export class VuepressZooming {
  instance: Zooming

  constructor() {
    this.instance = new Zooming(zoomingOptions)
  }

  update(selector = zoomingSelector): void {
    if (typeof window === 'undefined') return
    this.instance.listen(selector)
  }

  updateDelay(selector = zoomingSelector, delay = zoomingDelay): void {
    setTimeout(() => this.update(selector), delay)
  }
}
