import { CELL_STATE, type BoardItemProps } from '@/enums/cellState'

type HandleCellClickFlagProps = {
  row: number
  column: number
  isClosed: boolean
  boardDisplayed: BoardItemProps[][]
  bombsDisplayed: number
  clicksCount: {
    leftCursor: number
    rightCursor: number
  }
}

export const handleCellClickFlag = ({
  column,
  row,
  boardDisplayed,
  bombsDisplayed,
  clicksCount,
  isClosed
}: HandleCellClickFlagProps) => {
  if (isClosed) return

  const cellValue = boardDisplayed[row][column]

  if (bombsDisplayed <= CELL_STATE.BOMB && cellValue !== CELL_STATE.FLAG) return

  if (cellValue === CELL_STATE.FLAG) {
    boardDisplayed[row][column] = null
    bombsDisplayed++
    clicksCount.rightCursor++
    return
  }

  if (typeof cellValue === 'number') return

  boardDisplayed[row][column] = CELL_STATE.FLAG
  bombsDisplayed--
  clicksCount.rightCursor++
}
