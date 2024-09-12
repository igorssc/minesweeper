import { CELL_STATE, type BoardItemProps } from '@/enums/cellState'

type CheckAllBombsProps = {
  rows: number
  columns: number
  baseBoard: BoardItemProps[][]
}

export const checkAllBombs = ({ columns, rows, baseBoard }: CheckAllBombsProps) => {
  const bombsPositions: [number, number][] = []

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      if (baseBoard[row][col] === CELL_STATE.BOMB) {
        bombsPositions.push([row, col])
      }
    }
  }

  return bombsPositions
}
