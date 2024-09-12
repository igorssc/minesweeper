import { CELL_STATE, type BoardItemProps } from '@/enums/cellState'
import { directionOffsets } from './directionOffsets'
import { isWithinBoardBounds } from './isWithinBoardBounds'

type BombsCountAroundProps = {
  currentColumn: number
  currentRow: number
  numberColumns: number
  numberRows: number
  baseBoard: BoardItemProps[][]
}

export const bombsCountAround = ({
  currentRow,
  currentColumn,
  numberColumns,
  numberRows,
  baseBoard
}: BombsCountAroundProps): number => {
  let adjacentBombCount = 0

  for (const [rowOffset, colOffset] of directionOffsets) {
    const adjacentRow = currentRow + rowOffset
    const adjacentCol = currentColumn + colOffset

    if (
      !isWithinBoardBounds({
        numberColumns,
        numberRows,
        currentColumn: adjacentCol,
        currentRow: adjacentRow
      })
    )
      continue

    if (baseBoard[adjacentRow][adjacentCol] !== CELL_STATE.BOMB) continue

    adjacentBombCount++
  }

  return adjacentBombCount
}
