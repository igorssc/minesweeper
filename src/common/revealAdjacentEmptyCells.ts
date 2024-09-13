import { isNumberCell, type BoardItemProps } from '@/enums/cellState'
import { directionOffsets } from './directionOffsets'
import { isWithinBoardBounds } from './isWithinBoardBounds'
import { revealCell } from './revealCell'
import type { Ref } from 'vue'

type RevealAdjacentEmptyCellsProps = {
  currentColumn: number
  currentRow: number
  numberColumns: Ref<number>
  numberRows: Ref<number>
  baseBoard: Ref<BoardItemProps[][]>
  boardDisplayed: Ref<BoardItemProps[][]>
}

export const revealAdjacentEmptyCells = ({
  baseBoard,
  boardDisplayed,
  currentColumn,
  currentRow,
  numberColumns,
  numberRows
}: RevealAdjacentEmptyCellsProps) => {
  const queue: [number, number][] = [[currentRow, currentColumn]]
  const visited = new Set<string>()

  while (queue.length > 0) {
    const [currentRow, currentCol] = queue.shift()!
    const positionKey = `${currentRow},${currentCol}`

    if (visited.has(positionKey)) continue

    visited.add(positionKey)

    if (baseBoard.value[currentRow][currentCol] !== null) continue

    revealCell({
      column: currentCol,
      row: currentRow,
      baseBoard,
      boardDisplayed
    })

    for (const [rowOffset, colOffset] of directionOffsets) {
      const adjacentRow = currentRow + rowOffset
      const adjacentCol = currentCol + colOffset

      if (
        !isWithinBoardBounds({
          numberColumns,
          numberRows,
          currentColumn: adjacentCol,
          currentRow: adjacentRow
        })
      )
        continue

      if (
        baseBoard.value[adjacentRow][adjacentCol] === null &&
        !visited.has(`${adjacentRow},${adjacentCol}`)
      ) {
        queue.push([adjacentRow, adjacentCol])
        continue
      }

      if (!isNumberCell(baseBoard.value[adjacentRow][adjacentCol])) continue

      revealCell({
        column: adjacentCol,
        row: adjacentRow,
        baseBoard,
        boardDisplayed
      })
    }
  }
}