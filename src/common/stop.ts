import type { Ref } from 'vue'
import { stopTimer } from './stopTimer'

type StopProps = {
  isClosed: Ref<boolean>
  timerInterval: Ref<number | null>
}

export const stop = ({ isClosed, timerInterval }: StopProps) => {
  isClosed.value = true
  stopTimer(timerInterval)
}
