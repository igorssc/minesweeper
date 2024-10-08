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
  openCeil: Ref<[number, number, number][]>
}

export const revealAdjacentEmptyCells = ({
  baseBoard,
  boardDisplayed,
  currentColumn,
  currentRow,
  numberColumns,
  openCeil,
  numberRows
}: RevealAdjacentEmptyCellsProps) => {
  const queue: [number, number][] = [[currentRow, currentColumn]]
  const visited = new Set<string>()

  while (queue.length > 0) {
    const [currentRowQueue, currentColQueue] = queue.shift()!
    const positionKey = `${currentRowQueue},${currentColQueue}`

    if (visited.has(positionKey)) continue

    visited.add(positionKey)

    if (baseBoard.value[currentRowQueue][currentColQueue] !== null) continue

    revealCell({
      column: currentColQueue,
      row: currentRowQueue,
      baseBoard,
      boardDisplayed,
      openCeil
    })

    for (const [rowOffset, colOffset] of directionOffsets) {
      const adjacentRow = currentRowQueue + rowOffset
      const adjacentCol = currentColQueue + colOffset

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
        boardDisplayed,
        openCeil
      })
    }
  }
}
