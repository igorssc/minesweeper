import { CELL_STATE, type BoardItemProps } from '@/enums/cellState'

type PlaceBombsOnBoardProps = {
  rows: number
  columns: number
  bombsCount: number
  baseBoard: BoardItemProps[][]
}
export const placeBombsOnBoard = ({
  columns,
  rows,
  bombsCount,
  baseBoard
}: PlaceBombsOnBoardProps) => {
  const randomIndex = (max: number): number => Math.floor(Math.random() * max)
  const bombPositions = new Set<string>()

  while (bombPositions.size < bombsCount) {
    const row = randomIndex(rows)
    const column = randomIndex(columns)
    const positionKey = `${row},${column}`

    if (bombPositions.has(positionKey)) continue

    bombPositions.add(positionKey)
    baseBoard[row][column] = CELL_STATE.BOMB
  }
}
