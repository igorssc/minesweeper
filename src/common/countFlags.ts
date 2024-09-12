import { CELL_STATE, type BoardItemProps } from '@/enums/cellState'

type CountFlagsProps = {
  rows: number
  columns: number
  boardDisplayed: BoardItemProps[][]
}

export const countFlags = ({ rows, columns, boardDisplayed }: CountFlagsProps) => {
  let flags = 0

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      if (boardDisplayed[row][col] === CELL_STATE.FLAG) flags++
    }
  }

  return flags
}
