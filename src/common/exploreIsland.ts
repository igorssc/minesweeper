import { CELL_STATE, type BoardItemProps } from '@/enums/cellState'
import { directionOffsets } from './directionOffsets'
import { isWithinBoardBounds } from './isWithinBoardBounds'

type ExploreIslandProps = {
  currentColumn: number
  currentRow: number
  numberColumns: number
  numberRows: number
  baseBoard: BoardItemProps[][]
  visited: boolean[][]
  accessibleNumericalCells: boolean[][]
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
    if (visited[currentRow][currentCol]) continue
    visited[currentRow][currentCol] = true

    for (const [rowOffset, colOffset] of directionOffsets) {
      const adjacentRow = currentRow + rowOffset
      const adjacentCol = currentCol + colOffset
      const isWithinBounds = isWithinBoardBounds({
        currentColumn: adjacentRow,
        currentRow: adjacentCol,
        numberColumns,
        numberRows
      })

      if (
        isWithinBounds &&
        !visited[adjacentRow][adjacentCol] &&
        baseBoard[adjacentRow][adjacentCol] === null
      ) {
        queue.push([adjacentRow, adjacentCol])
      }
      if (
        isWithinBounds &&
        baseBoard[adjacentRow][adjacentCol] !== null &&
        baseBoard[adjacentRow][adjacentCol] !== CELL_STATE.BOMB // Not counting cells with bombs
      ) {
        accessibleNumericalCells[adjacentRow][adjacentCol] = true
      }
    }
  }
}
