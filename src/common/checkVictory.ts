import { CELL_STATE, type BoardItemProps } from '@/enums/cellState'
import type { Ref } from 'vue'

type CheckVictoryProps = {
  boardDisplayed: Ref<BoardItemProps[][]>
  bombsCount: Ref<number>
}

export const checkVictory = ({ boardDisplayed, bombsCount }: CheckVictoryProps) => {
  const cellsCount = boardDisplayed.value
    .flat()
    .filter((cell) => cell === null || cell === CELL_STATE.FLAG || cell === CELL_STATE.DOUBT).length

  return cellsCount === bombsCount.value
}
