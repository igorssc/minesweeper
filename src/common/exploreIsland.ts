import { CELL_STATE, type BoardItemProps } from '@/enums/cellState'
import { directionOffsets } from './directionOffsets'
import { isWithinBoardBounds } from './isWithinBoardBounds'
import type { Ref } from 'vue'

type ExploreIslandProps = {
  currentColumn: number
  currentRow: number
  numberColumns: Ref<number>
  numberRows: Ref<number>
  baseBoard: Ref<BoardItemProps[][]>
  visited: Ref<boolean[][]>
  accessibleNumericalCells: Ref<boolean[][]>
}

export const exploreIsland = ({
  currentColumn,
  currentRow,
  numberColumns,
  numberRows,
  accessibleNumericalCells,
  baseBoard,
  visited
}: ExploreIslandProps) => {
  const queue: [number, number][] = [[currentRow, currentColumn]]

  while (queue.length > 0) {
    const [currentRow, currentCol] = queue.shift()!
    if (visited.value[currentRow][currentCol]) continue
    visited.value[currentRow][currentCol] = true

    for (const [rowOffset, colOffset] of directionOffsets) {
      const adjacentRow = currentRow + rowOffset
      const adjacentCol = currentCol + colOffset
      const isWithinBounds = isWithinBoardBounds({
        currentColumn: adjacentCol,
        currentRow: adjacentRow,
        numberColumns,
        numberRows
      })

      if (
        isWithinBounds &&
        !visited.value[adjacentRow][adjacentCol] &&
        baseBoard.value[adjacentRow][adjacentCol] === null
      ) {
        queue.push([adjacentRow, adjacentCol])
      }
      if (
        isWithinBounds &&
        baseBoard.value[adjacentRow][adjacentCol] !== null &&
        baseBoard.value[adjacentRow][adjacentCol] !== CELL_STATE.BOMB
      ) {
        accessibleNumericalCells.value[adjacentRow][adjacentCol] = true
      }
    }
  }
}
