import type { App, DirectiveBinding } from 'vue'

interface LongPressOptions {
  duration?: number
}

interface HTMLElementWithLongPress extends HTMLElement {
  _timeout?: number | null
  _onmouseup?: (e: MouseEvent) => void
  _onmousedown?: (e: MouseEvent) => void
  _onclick?: (e: MouseEvent) => void
}

export function longPress(Vue: App, options: LongPressOptions = { duration: 2000 }) {
  if (!options.duration) options.duration = 2000

  Vue.directive('long-press', {
    beforeMount(el: HTMLElementWithLongPress, binding: DirectiveBinding) {
      el._timeout = null

      el._onmouseup = function () {
        if (el._timeout) {
          clearTimeout(el._timeout)
          el._timeout = null
        }
      }

      el._onmousedown = function (e: MouseEvent) {
        // Checa se a função `binding.value` é realmente uma função
        if (typeof binding.value === 'function') {
          el._timeout = window.setTimeout(() => {
            // Executa a função com o evento
            binding.value(e)
          }, options.duration)

          // Impede a propagação do click
          el._onclick = function (event: MouseEvent) {
            event.stopImmediatePropagation()
          }
        }
      }

      el.addEventListener('mousedown', el._onmousedown)
      document.addEventListener('mouseup', el._onmouseup)

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
      if (el._onmouseup) {
        document.removeEventListener('mouseup', el._onmouseup)
      }
    }
  })
}
