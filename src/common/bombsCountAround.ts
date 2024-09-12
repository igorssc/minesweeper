import { CELL_STATE, type BoardItemProps } from '@/enums/cellState'
import { directionOffsets } from './directionOffsets'
import { isWithinBoardBounds } from './isWithinBoardBounds'
import type { Ref } from 'vue'

type BombsCountAroundProps = {
  currentColumn: number
  currentRow: number
  numberColumns: Ref<number>
  numberRows: Ref<number>
  baseBoard: Ref<BoardItemProps[][]>
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

    const isWithinBounds = isWithinBoardBounds({
      numberColumns,
      numberRows,
      currentColumn: adjacentCol,
      currentRow: adjacentRow
    })

    if (!isWithinBounds) continue

    if (baseBoard.value[adjacentRow][adjacentCol] !== CELL_STATE.BOMB) continue

    adjacentBombCount++
  }

  return adjacentBombCount
}
