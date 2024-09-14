import { CELL_STATE, isNumberCell, type BoardItemProps } from '@/enums/cellState'
import type { Ref } from 'vue'
import { isWithinBoardBounds } from './isWithinBoardBounds'
import { directionOffsets } from './directionOffsets'

type CheckBombsAroundProps = {
  currentColumn: number
  currentRow: number
  numberColumns: Ref<number>
  numberRows: Ref<number>
  baseBoard: Ref<BoardItemProps[][]>
}

export const checkBombsAround = ({
  currentColumn,
  currentRow,
  numberColumns,
  numberRows,
  baseBoard
}: CheckBombsAroundProps) => {
  let bombsAround = 0

  const currentCeil = baseBoard.value[currentRow][currentColumn]

  for (const [rowOffset, colOffset] of directionOffsets) {
    if (!isNumberCell(currentCeil)) break

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

    if (baseBoard.value[adjacentRow][adjacentCol] !== CELL_STATE.BOMB) return

    ++bombsAround
  }

  return bombsAround
}
