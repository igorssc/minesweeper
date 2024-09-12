import { CELL_STATE, type BoardItemProps } from '@/enums/cellState'
import type { Ref } from 'vue'

type CheckAllBombsProps = {
  rows: Ref<number>
  columns: Ref<number>
  baseBoard: Ref<BoardItemProps[][]>
}

export const checkAllBombs = ({ columns, rows, baseBoard }: CheckAllBombsProps) => {
  const bombsPositions: [number, number][] = []

  for (let row = 0; row < rows.value; row++) {
    for (let col = 0; col < columns.value; col++) {
      if (baseBoard.value[row][col] !== CELL_STATE.BOMB) continue

      bombsPositions.push([row, col])
    }
  }

  return bombsPositions
}
