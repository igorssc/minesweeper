import { CELL_STATE, type BoardItemProps } from '@/enums/cellState'
import type { Ref } from 'vue'
import { isWithinBoardBounds } from './isWithinBoardBounds'
import { checkAllBombs } from './checkAllBombs'

type RelocateBombProps = {
  currentColumn: number
  currentRow: number
  numberColumns: Ref<number>
  numberRows: Ref<number>
  baseBoard: Ref<BoardItemProps[][]>
  allBombsPositions: Ref<[number, number][]>
}

export const relocateBomb = ({
  numberColumns,
  numberRows,
  currentColumn,
  currentRow,
  allBombsPositions,
  baseBoard
}: RelocateBombProps) => {
  let newRow, newCol

  do {
    newRow = Math.floor(Math.random() * numberRows.value)
    newCol = Math.floor(Math.random() * numberColumns.value)
  } while (
    !isWithinBoardBounds({
      numberColumns,
      numberRows,
      currentColumn: newCol,
      currentRow: newRow
    }) ||
    baseBoard.value[newRow][newCol] === CELL_STATE.BOMB ||
    (newRow === currentRow && newCol === currentColumn)
  )

  baseBoard.value[currentRow][currentColumn] = null
  baseBoard.value[newRow][newCol] = CELL_STATE.BOMB

  allBombsPositions.value = checkAllBombs({
    columns: numberColumns,
    rows: numberRows,
    baseBoard
  })
}
