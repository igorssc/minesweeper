import type { App, DirectiveBinding } from 'vue'

interface LongPressOptions {
  duration?: number
}

interface HTMLElementWithLongPress extends HTMLElement {
  _timeout?: number | null
  _onmouseup?: (e: MouseEvent) => void
  _ontouchstart?: (e: TouchEvent) => void
  _onmousedown?: (e: MouseEvent) => void
  _onmousemove?: (e: MouseEvent) => void
  _ontouchend?: (e: TouchEvent) => void
  _ontouchmove?: (e: TouchEvent) => void
  _onclick?: (e: MouseEvent) => void
}
export function longPress(Vue: App, options: LongPressOptions = { duration: 2000 }) {
  if (!options.duration) options.duration = 3000

  Vue.directive('long-press', {
    beforeMount(el: HTMLElementWithLongPress, binding: DirectiveBinding) {
      el._timeout = null
      let startX: number,
        startY: number,
        hasMoved = false

      const clearLongPress = () => {
        if (el._timeout) {
          clearTimeout(el._timeout)
          el._timeout = null
        }
      }

      const startLongPress = (e: MouseEvent | TouchEvent) => {
        hasMoved = false
        const { clientX, clientY } = 'touches' in e ? e.touches[0] : e

        startX = clientX
        startY = clientY

        if (typeof binding.value === 'function') {
          el._timeout = window.setTimeout(() => {
            if (!hasMoved) {
              binding.value(e as MouseEvent)
            }
          }, options.duration)

          el._onclick = (event: MouseEvent) => {
            event.stopImmediatePropagation()
          }
        }
      }

      const moveLongPress = (e: MouseEvent | TouchEvent) => {
        const { clientX, clientY } = 'touches' in e ? e.touches[0] : e
        const moveThreshold = 10

        if (
          Math.abs(clientX - startX) > moveThreshold ||
          Math.abs(clientY - startY) > moveThreshold
        ) {
          hasMoved = true
          clearLongPress()
        }
      }

      const endLongPress = () => {
        clearLongPress()
      }

      el._onmousedown = (e: MouseEvent) => startLongPress(e)
      el._ontouchstart = (e: TouchEvent) => startLongPress(e)
      el._onmousemove = (e: MouseEvent) => moveLongPress(e)
      el._ontouchmove = (e: TouchEvent) => moveLongPress(e)
      el._onmouseup = endLongPress
      el._ontouchend = endLongPress

      el.addEventListener('mousedown', el._onmousedown)
      el.addEventListener('touchstart', el._ontouchstart)
      el.addEventListener('mousemove', el._onmousemove)
      el.addEventListener('touchmove', el._ontouchmove)
      document.addEventListener('mouseup', el._onmouseup)
      document.addEventListener('touchend', el._ontouchend)

      el.addEventListener('click', function (e: MouseEvent) {
        if (el.onclick) {
          el.onclick(e)
          el.onclick = null
        }
      })
    },

    unmounted(el: HTMLElementWithLongPress) {
      if (el._timeout) {
        clearTimeout(el._timeout)
        el._timeout = null
      }
      if (el._onmousedown) {
        el.removeEventListener('mousedown', el._onmousedown)
      }
      if (el._ontouchstart) {
        el.removeEventListener('touchstart', el._ontouchstart)
      }
      if (el._onmousemove) {
        el.removeEventListener('mousemove', el._onmousemove)
      }
      if (el._ontouchmove) {
        el.removeEventListener('touchmove', el._ontouchmove)
      }
      if (el._onmouseup) {
        document.removeEventListener('mouseup', el._onmouseup)
      }
      if (el._ontouchend) {
        document.removeEventListener('touchend', el._ontouchend)
      }
    }
  })
}
