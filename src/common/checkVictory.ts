import { CELL_STATE, type BoardItemProps } from '@/enums/cellState'

type CheckVictoryProps = {
  boardDisplayed: BoardItemProps[][]
  bombsCount: number
}

export const checkVictory = ({ boardDisplayed, bombsCount }: CheckVictoryProps) => {
  const cellsCount = boardDisplayed
    .flat()
    .filter((cell) => cell === null || cell === CELL_STATE.FLAG).length

  return cellsCount === bombsCount
}
