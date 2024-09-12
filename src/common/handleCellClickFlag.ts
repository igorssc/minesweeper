import { CELL_STATE, type BoardItemProps } from '@/enums/cellState'
import type { Ref } from 'vue'

type HandleCellClickFlagProps = {
  row: number
  column: number
  isClosed: Ref<boolean>
  boardDisplayed: Ref<BoardItemProps[][]>
  bombsDisplayed: Ref<number>
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
  isClosed
}: HandleCellClickFlagProps) => {
  if (isClosed) return

  const cellValue = boardDisplayed.value[row][column]

  if (bombsDisplayed.value <= CELL_STATE.BOMB && cellValue !== CELL_STATE.FLAG) return

  if (cellValue === CELL_STATE.FLAG) {
    boardDisplayed.value[row][column] = null
    bombsDisplayed.value++
    clicksCount.rightCursor++
    return
  }

  if (typeof cellValue === 'number') return

  boardDisplayed.value[row][column] = CELL_STATE.FLAG
  bombsDisplayed.value--
  clicksCount.rightCursor++
}
