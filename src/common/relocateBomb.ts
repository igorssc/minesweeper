import { CELL_STATE, type BoardItemProps } from '@/enums/cellState'
import type { Ref } from 'vue'

type RelocateBombProps = {
  currentColumn: number
  currentRow: number
  numberColumns: Ref<number>
  numberRows: Ref<number>
  baseBoard: Ref<BoardItemProps[][]>
}

export const relocateBomb = ({
  numberColumns,
  numberRows,
  currentColumn,
  currentRow,
  baseBoard
}: RelocateBombProps) => {
  let newRow, newCol

  do {
    newRow = Math.floor(Math.random() * numberRows.value)
    newCol = Math.floor(Math.random() * numberColumns.value)
  } while (
    baseBoard.value[newRow][newCol] === CELL_STATE.BOMB ||
    (newRow === currentRow && newCol === currentColumn)
  )

  baseBoard.value[currentRow][currentColumn] = null
  baseBoard.value[newRow][newCol] = CELL_STATE.BOMB
}
