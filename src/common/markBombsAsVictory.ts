import { CELL_STATE, type BoardItemProps } from '@/enums/cellState'
import type { Ref } from 'vue'

type markBombsAsVictoryProps = {
  rows: Ref<number>
  columns: Ref<number>
  baseBoard: Ref<BoardItemProps[][]>
  boardDisplayed: Ref<BoardItemProps[][]>
}

export const markBombsAsVictory = ({
  rows,
  columns,
  baseBoard,
  boardDisplayed
}: markBombsAsVictoryProps) => {
  for (let row = 0; row < rows.value; row++) {
    for (let col = 0; col < columns.value; col++) {
      if (baseBoard.value[row][col] !== CELL_STATE.BOMB) continue

      boardDisplayed.value[row][col] = CELL_STATE.FLAG
    }
  }
}
