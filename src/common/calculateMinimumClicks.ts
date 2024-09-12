import { CELL_STATE, type BoardItemProps } from '@/enums/cellState'
import { exploreIsland } from './exploreIsland'

type CalculateMinimumClicksProps = {
  rows: number
  columns: number
  baseBoard: BoardItemProps[][]
}

export const calculateMinimumClicks = ({
  rows,
  columns,
  baseBoard
}: CalculateMinimumClicksProps): number => {
  const visited: boolean[][] = Array.from({ length: rows }, () => Array(columns).fill(false))

  const accessibleNumericalCells: boolean[][] = Array.from({ length: rows }, () =>
    Array(columns).fill(false)
  )

  let islandCount = 0

  // Count the number of distinct safe islands
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      if (!visited[row][col] && baseBoard[row][col] === null) {
        exploreIsland({
          accessibleNumericalCells,
          visited,
          baseBoard,
          currentColumn: col,
          currentRow: row,
          numberColumns: columns,
          numberRows: rows
        })
        islandCount += 1
      }
    }
  }

  // Count the number of non-revealed numerical cells that are not accessible through safe islands
  let isolatedNumericalCells = 0
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      if (
        baseBoard[row][col] !== null &&
        baseBoard[row][col] !== CELL_STATE.BOMB &&
        !accessibleNumericalCells[row][col]
      ) {
        isolatedNumericalCells += 1
      }
    }
  }

  // The minimum number of clicks is the number of islands plus the number of isolated numerical cells
  return islandCount + isolatedNumericalCells
}
