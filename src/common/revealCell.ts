import { CELL_STATE, type BoardItemProps } from '@/enums/cellState'
import { markRaw, type Ref } from 'vue'

type revealCellProps = {
  row: number
  column: number
  base?: number
  baseBoard: Ref<BoardItemProps[][]>
  boardDisplayed: Ref<BoardItemProps[][]>
  openCeil: Ref<[number, number, number][]>
}

export const revealCell = async ({
  row,
  column,
  base,
  baseBoard,
  boardDisplayed,
  openCeil
}: revealCellProps) => {
  if (typeof boardDisplayed.value[row][column] === 'number') return

  const cellValue = baseBoard.value[row][column] ?? CELL_STATE.EMPTY

  const rawBoardDisplayed = markRaw(boardDisplayed.value)

  rawBoardDisplayed[row][column] = base ?? cellValue

  openCeil.value.push([row, column, cellValue])

  boardDisplayed.value = rawBoardDisplayed
}
