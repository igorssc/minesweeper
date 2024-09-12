import { CELL_STATE, type BoardItemProps } from '@/enums/cellState'

type markBombsAsVictoryProps = {
  rows: number
  columns: number
  baseBoard: BoardItemProps[][]
  boardDisplayed: BoardItemProps[][]
}

export const markBombsAsVictory = ({
  rows,
  columns,
  baseBoard,
  boardDisplayed
}: markBombsAsVictoryProps) => {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      if (baseBoard[row][col] !== CELL_STATE.BOMB) continue

      boardDisplayed[row][col] = CELL_STATE.FLAG
    }
  }
}
