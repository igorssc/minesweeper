import type { Ref } from 'vue'

export const stopAllTimeouts = (timeouts: Ref<number[]>) => {
  timeouts.value.forEach((timeoutId) => clearTimeout(timeoutId))
  timeouts.value.length = 0
}
