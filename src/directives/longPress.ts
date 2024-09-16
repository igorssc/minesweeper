import type { App, DirectiveBinding } from 'vue'

interface LongPressOptions {
  duration?: number
}

interface HTMLElementWithLongPress extends HTMLElement {
  _timeout?: number | null
  _onmouseup?: (e: MouseEvent) => void
  _ontouchstart?: (e: TouchEvent) => void
  _onmousedown?: (e: MouseEvent) => void
  _ontouchend?: (e: TouchEvent) => void
  _onclick?: (e: MouseEvent) => void
}

export function longPress(Vue: App, options: LongPressOptions = { duration: 2000 }) {
  if (!options.duration) options.duration = 3000

  Vue.directive('long-press', {
    beforeMount(el: HTMLElementWithLongPress, binding: DirectiveBinding) {
      el._timeout = null

      // Função para limpar o timeout
      const clearLongPress = () => {
        if (el._timeout) {
          clearTimeout(el._timeout)
          el._timeout = null
        }
      }

      // Handler para mousedown e touchstart
      const startLongPress = (e: MouseEvent | TouchEvent) => {
        if (typeof binding.value === 'function') {
          el._timeout = window.setTimeout(() => {
            binding.value(e as MouseEvent)
          }, options.duration)

          // Impede a propagação do click
          el._onclick = (event: MouseEvent) => {
            event.stopImmediatePropagation()
          }
        }
      }

      // Handler para mouseup e touchend
      const endLongPress = () => {
        clearLongPress()
      }

      el._onmousedown = (e: MouseEvent) => startLongPress(e)
      el._ontouchstart = (e: TouchEvent) => startLongPress(e)
      el._onmouseup = endLongPress
      el._ontouchend = endLongPress

      el.addEventListener('mousedown', el._onmousedown)
      el.addEventListener('touchstart', el._ontouchstart)
      document.addEventListener('mouseup', el._onmouseup)
      document.addEventListener('touchend', el._ontouchend)

      // Adiciona o evento de click para garantir que ele seja cancelado quando necessário
      el.addEventListener('click', function (e: MouseEvent) {
        if (el.onclick) {
          el.onclick(e)
          el.onclick = null // Reseta o _onclick após usá-lo
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
      if (el._onmouseup) {
        document.removeEventListener('mouseup', el._onmouseup)
      }
      if (el._ontouchend) {
        document.removeEventListener('touchend', el._ontouchend)
      }
    }
  })
}
