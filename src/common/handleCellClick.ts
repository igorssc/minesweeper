import { CELL_STATE, type BoardItemProps } from '@/enums/cellState'
import { populateMinesweeperBoard } from './populateMinesweeperBoard'
import { relocateBomb } from './relocateBomb'
import { countFlags } from './countFlags'
import { checkVictory } from './checkVictory'
import { revealCell } from './revealCell'
import { gameOver } from './gameOver'
import { startTimer } from './startTimer'
import { revealAdjacentEmptyCells } from './revealAdjacentEmptyCells'
import { victory } from './victory'
import type { Ref } from 'vue'

type HandleCellClickProps = {
  currentColumn: number
  currentRow: number
  numberColumns: number
  numberRows: number
  isClosed: Ref<boolean>
  isVictory: Ref<boolean>
  isGameOver: Ref<boolean>
  isFirstClick: Ref<boolean>
  hasSafeStart: boolean
  baseBoard: Ref<BoardItemProps[][]>
  boardDisplayed: BoardItemProps[][]
  bombsDisplayed: Ref<number>
  timerInterval: Ref<number | null>
  elapsedTime: Ref<number>
  bombsCount: number
  allBombsPositions: [number, number][]
  timeouts: Ref<number[]>
  clicksCount: {
    leftCursor: number
    rightCursor: number
  }
}

export const handleCellClick = ({
  currentColumn,
  currentRow,
  numberColumns,
  numberRows,
  isClosed,
  isVictory,
  isGameOver,
  isFirstClick,
  hasSafeStart,
  elapsedTime,
  timerInterval,
  baseBoard,
  boardDisplayed,
  bombsDisplayed,
  clicksCount,
  allBombsPositions,
  timeouts,
  bombsCount
}: HandleCellClickProps) => {
  if (isClosed.value) return

  if (isFirstClick) {
    startTimer({ elapsedTime, timerInterval })
    isFirstClick.value = false

    if (baseBoard.value[currentRow][currentColumn] === CELL_STATE.BOMB && hasSafeStart) {
      relocateBomb({
        numberColumns,
        numberRows,
        currentColumn,
        currentRow,
        baseBoard: baseBoard.value
      })
      populateMinesweeperBoard({
        baseBoard,
        columns: numberColumns,
        rows: numberRows
      }) // Atualiza o board após realocar a bomba
    }
  }

  const cellValue = baseBoard.value[currentRow][currentColumn]

  const cellValueDisplayed = boardDisplayed[currentRow][currentColumn]

  if (cellValueDisplayed === CELL_STATE.FLAG) return

  if (cellValue === CELL_STATE.BOMB)
    return gameOver({
      column: currentColumn,
      row: currentRow,
      baseBoard: baseBoard.value,
      boardDisplayed,
      allBombsPositions,
      bombsCount,
      isGameOver,
      timeouts,
      isClosed,
      timerInterval
    })

  if (cellValue === null) {
    revealAdjacentEmptyCells({
      baseBoard: baseBoard.value,
      boardDisplayed,
      currentColumn,
      currentRow,
      numberColumns,
      numberRows
    })
  }

  if (cellValue !== null) {
    revealCell({
      row: currentRow,
      column: currentColumn,
      baseBoard: baseBoard.value,
      boardDisplayed
    })
  }

  clicksCount.leftCursor++

  const flags = countFlags({
    rows: numberRows,
    columns: numberColumns,
    boardDisplayed
  })
  bombsDisplayed.value = bombsCount - flags

  if (checkVictory({ boardDisplayed, bombsCount }))
    victory({
      baseBoard: baseBoard.value,
      boardDisplayed,
      columns: numberColumns,
      rows: numberRows,
      isVictory,
      isClosed,
      timerInterval
    })
}
