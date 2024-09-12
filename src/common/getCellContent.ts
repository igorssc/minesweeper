import { CELL_STATE, isNumberCell, type BoardItemProps } from '@/enums/cellState'
import { bombsCountAround } from './bombsCountAround'

type GetCellContentProps = {
  currentColumn: number
  currentRow: number
  numberColumns: number
  numberRows: number
  baseBoard: BoardItemProps[][]
}

export const getCellContent = ({
  currentColumn,
  currentRow,
  numberColumns,
  numberRows,
  baseBoard
}: GetCellContentProps): number | null => {
  if (baseBoard[currentRow][currentColumn] === CELL_STATE.BOMB) return CELL_STATE.BOMB

  const adjacentBombs = bombsCountAround({
    currentRow,
    currentColumn,
    numberColumns,
    numberRows,
    baseBoard
  })

  return isNumberCell(adjacentBombs) ? adjacentBombs : null
}
