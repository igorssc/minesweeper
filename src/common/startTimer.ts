import type { Ref } from 'vue'

type StartTimerProps = {
  timerInterval: Ref<number | null>
  elapsedTime: Ref<number>
}

export const startTimer = ({ elapsedTime, timerInterval }: StartTimerProps) => {
  if (timerInterval.value) return

  timerInterval.value = setInterval(() => {
    elapsedTime.value++
  }, 1000)
}
