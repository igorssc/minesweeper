import { CELL_STATE, isNumberCell, type BoardItemProps } from '@/enums/cellState'
import { bombsCountAround } from './bombsCountAround'
import type { Ref } from 'vue'

type GetCellContentProps = {
  currentColumn: number
  currentRow: number
  numberColumns: Ref<number>
  numberRows: Ref<number>
  baseBoard: Ref<BoardItemProps[][]>
}

export const getCellContent = ({
  currentColumn,
  currentRow,
  numberColumns,
  numberRows,
  baseBoard
}: GetCellContentProps): number | null => {
  if (baseBoard.value[currentRow][currentColumn] === CELL_STATE.BOMB) return CELL_STATE.BOMB

  const adjacentBombs = bombsCountAround({
    currentRow,
    currentColumn,
    numberColumns,
    numberRows,
    baseBoard
  })

  return isNumberCell(adjacentBombs) ? adjacentBombs : null
}
