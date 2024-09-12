import type { BoardItemProps } from '@/enums/cellState'
import { createEmptyBoard } from './createEmptyBoard'
import { getCellContent } from './getCellContent'
import type { Ref } from 'vue'

type PopulateMinesweeperBoardProps = {
  columns: Ref<number>
  rows: Ref<number>
  baseBoard: Ref<BoardItemProps[][]>
}

export const populateMinesweeperBoard = ({
  columns,
  rows,
  baseBoard
}: PopulateMinesweeperBoardProps) => {
  const newBoard = createEmptyBoard({ columns, rows })

  for (let row = 0; row < rows.value; row++) {
    for (let col = 0; col < columns.value; col++) {
      newBoard[row][col] = getCellContent({
        baseBoard,
        currentColumn: col,
        currentRow: row,
        numberColumns: columns,
        numberRows: rows
      })
    }
  }

  baseBoard.value = newBoard
}
