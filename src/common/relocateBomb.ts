import { CELL_STATE, type BoardItemProps } from '@/enums/cellState'

type RelocateBombProps = {
  currentColumn: number
  currentRow: number
  numberColumns: number
  numberRows: number
  baseBoard: BoardItemProps[][]
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
    newRow = Math.floor(Math.random() * numberRows)
    newCol = Math.floor(Math.random() * numberColumns)
  } while (
    baseBoard[newRow][newCol] === CELL_STATE.BOMB ||
    (newRow === currentRow && newCol === currentColumn)
  )

  baseBoard[currentRow][currentColumn] = null
  baseBoard[newRow][newCol] = CELL_STATE.BOMB
}
