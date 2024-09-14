import { CELL_STATE, isNumberCell, type BoardItemProps } from '@/enums/cellState'
import type { Ref } from 'vue'
import { isWithinBoardBounds } from './isWithinBoardBounds'
import { directionOffsets } from './directionOffsets'

type CheckAvailableFieldsAroundProps = {
  currentColumn: number
  currentRow: number
  numberColumns: Ref<number>
  numberRows: Ref<number>
  boardDisplayed: Ref<BoardItemProps[][]>
}

export const checkAvailableFieldsAround = ({
  currentColumn,
  currentRow,
  numberColumns,
  numberRows,
  boardDisplayed
}: CheckAvailableFieldsAroundProps) => {
  const queueCeil: [number, number][] = []
  const queueFlag: [number, number][] = []

  const currentCeil = boardDisplayed.value[currentRow][currentColumn]

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

    if (boardDisplayed.value[adjacentRow][adjacentCol] === CELL_STATE.FLAG) {
      queueFlag.push([adjacentRow, adjacentCol])
      continue
    }

    if (boardDisplayed.value[adjacentRow][adjacentCol] !== null) continue

    queueCeil.push([adjacentRow, adjacentCol])
  }

  return {
    ceil: currentCeil,
    ceilsAround: queueCeil,
    flagsAround: queueFlag
  }
}
