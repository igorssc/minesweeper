import { CELL_STATE, type BoardItemProps } from '@/enums/cellState'

type revealCellProps = {
  row: number
  column: number
  base?: number
  baseBoard: BoardItemProps[][]
  boardDisplayed: BoardItemProps[][]
}

export const revealCell = ({ row, column, base, baseBoard, boardDisplayed }: revealCellProps) => {
  if (typeof boardDisplayed[row][column] === 'number') return

  const cellValue = baseBoard[row][column] ?? CELL_STATE.EMPTY
  boardDisplayed[row][column] = base ?? cellValue
}
