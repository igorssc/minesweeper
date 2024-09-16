import type { Ref } from 'vue'

type StartTimerProps = {
  timerInterval: Ref<number | null>
  elapsedTime: Ref<number>
  timeForTip: Ref<number>
}

export const startTimer = ({ elapsedTime, timerInterval, timeForTip }: StartTimerProps) => {
  if (timerInterval.value) return

  timerInterval.value = setInterval(() => {
    elapsedTime.value++
    timeForTip.value++
  }, 1000)
}
