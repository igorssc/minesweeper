import { CELL_STATE, type BoardItemProps } from '@/enums/cellState'
import type { Ref } from 'vue'
import flagSound from '@/assets/audios/flag.mp3'

type HandleCellClickFlagProps = {
  row: number
  column: number
  isClosed: Ref<boolean>
  hasSound: Ref<boolean>
  boardDisplayed: Ref<BoardItemProps[][]>
  bombsDisplayed: Ref<number>
  allFlagsPositions: Ref<[number, number][]>
  clicksCount: {
    leftCursor: number
    rightCursor: number
  }
}

export const handleCellClickFlag = ({
  column,
  row,
  boardDisplayed,
  bombsDisplayed,
  clicksCount,
  hasSound,
  allFlagsPositions,
  isClosed
}: HandleCellClickFlagProps) => {
  if (isClosed.value) return

  const cellValue = boardDisplayed.value[row][column]

  if (bombsDisplayed.value <= CELL_STATE.BOMB && cellValue !== CELL_STATE.FLAG) return

  if (cellValue === CELL_STATE.FLAG) {
    boardDisplayed.value[row][column] = null
    bombsDisplayed.value++
    clicksCount.rightCursor++

    allFlagsPositions.value.filter(
      ([flagPositionRow, flagPositionColumn]) =>
        flagPositionRow !== row && flagPositionColumn !== column
    )
    return
  }

  if (typeof cellValue === 'number') return

  const flagSoundHowl = new Howl({
    src: [flagSound],
    volume: 0.02
  })

  hasSound.value && flagSoundHowl.play()
  boardDisplayed.value[row][column] = CELL_STATE.FLAG
  bombsDisplayed.value--
  clicksCount.rightCursor++

  allFlagsPositions.value.push([row, column])
}
