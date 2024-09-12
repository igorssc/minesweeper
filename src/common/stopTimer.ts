import type { Ref } from 'vue'

export const stopTimer = (timerInterval: Ref<number | null>) => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value)
    timerInterval.value = null
  }
}
