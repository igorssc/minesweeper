import { CELL_STATE, type BoardItemProps } from '@/enums/cellState'
import type { Ref } from 'vue'

type PlaceBombsOnBoardProps = {
  rows: Ref<number>
  columns: Ref<number>
  bombsCount: Ref<number>
  baseBoard: Ref<BoardItemProps[][]>
}
export const placeBombsOnBoard = ({
  columns,
  rows,
  bombsCount,
  baseBoard
}: PlaceBombsOnBoardProps) => {
  const randomIndex = (max: number): number => Math.floor(Math.random() * max)
  const bombPositions = new Set<string>()

  while (bombPositions.size < bombsCount.value) {
    const row = randomIndex(rows.value)
    const column = randomIndex(columns.value)
    const positionKey = `${row},${column}`

    if (bombPositions.has(positionKey)) continue

    bombPositions.add(positionKey)
    baseBoard.value[row][column] = CELL_STATE.BOMB
  }
}
