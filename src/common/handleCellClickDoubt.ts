import { CELL_STATE, type BoardItemProps } from '@/enums/cellState'
import type { Ref } from 'vue'
import flagSound from '@public/assets/audios/flag.mp3'

type HandleCellClickDoubtProps = {
  row: number
  column: number
  isClosed: Ref<boolean>
  hasSound: Ref<boolean>
  boardDisplayed: Ref<BoardItemProps[][]>
}

export const handleCellClickDoubt = ({
  column,
  row,
  boardDisplayed,
  hasSound,
  isClosed
}: HandleCellClickDoubtProps) => {
  if (isClosed.value) return

  const cellValue = boardDisplayed.value[row][column]

  if (cellValue === CELL_STATE.DOUBT) {
    boardDisplayed.value[row][column] = null

    return
  }

  if (typeof cellValue === 'number' && cellValue > 0) return

  const flagSoundHowl = new Howl({
    src: [flagSound],
    volume: 0.02
  })

  hasSound.value && flagSoundHowl.play()
  boardDisplayed.value[row][column] = CELL_STATE.DOUBT
}
