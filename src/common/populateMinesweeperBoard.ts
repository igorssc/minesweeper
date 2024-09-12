import type { BoardItemProps } from '@/enums/cellState'
import { createEmptyBoard } from './createEmptyBoard'
import { getCellContent } from './getCellContent'
import type { Ref } from 'vue'

type PopulateMinesweeperBoardProps = {
  columns: number
  rows: number
  baseBoard: Ref<BoardItemProps[][]>
}

export const populateMinesweeperBoard = ({
  columns,
  rows,
  baseBoard
}: PopulateMinesweeperBoardProps) => {
  const newBoard = createEmptyBoard({ columns: columns, rows: rows })

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      newBoard[row][col] = getCellContent({
        baseBoard: baseBoard.value,
        currentColumn: col,
        currentRow: row,
        numberColumns: columns,
        numberRows: rows
      })
    }
  }

  baseBoard.value = newBoard
}
