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
import { calculatePerformance } from './calculatePerformance'
import oneNumberSound from '@/assets/audios/one-number.mp3'
import moreThanOneNumbersSound from '@/assets/audios/more-than-one-numbers.mp3'

type HandleCellClickProps = {
  currentColumn: number
  currentRow: number
  numberColumns: Ref<number>
  numberRows: Ref<number>
  isClosed: Ref<boolean>
  isVictory: Ref<boolean>
  isGameOver: Ref<boolean>
  isFirstClick: Ref<boolean>
  hasSafeStart: Ref<boolean>
  baseBoard: Ref<BoardItemProps[][]>
  boardDisplayed: Ref<BoardItemProps[][]>
  bombsDisplayed: Ref<number>
  timerInterval: Ref<number | null>
  elapsedTime: Ref<number>
  bombsCount: Ref<number>
  performanceMetric: Ref<number>
  minimumClicks: Ref<number>
  allBombsPositions: Ref<[number, number][]>
  timeouts: Ref<number[]>
  clicksTip: Ref<number>
  hasSound: Ref<boolean>
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
  performanceMetric,
  minimumClicks,
  hasSound,
  clicksTip,
  bombsCount
}: HandleCellClickProps) => {
  if (isClosed.value) return

  const handleCalculatePerformance = () => {
    performanceMetric.value = calculatePerformance({
      elapsedTime,
      bombs: bombsCount,
      clicksCount,
      columns: numberColumns,
      rows: numberRows,
      baseBoard,
      boardDisplayed,
      isVictory,
      isGameOver,
      minimumClicks
    })
  }

  if (isFirstClick.value) {
    startTimer({ elapsedTime, timerInterval })
    isFirstClick.value = false

    if (baseBoard.value[currentRow][currentColumn] === CELL_STATE.BOMB && hasSafeStart.value) {
      relocateBomb({
        numberColumns,
        numberRows,
        currentColumn,
        currentRow,
        baseBoard
      })
      populateMinesweeperBoard({
        baseBoard,
        columns: numberColumns,
        rows: numberRows
      }) // Atualiza o board após realocar a bomba
    }
  }

  const cellValue = baseBoard.value[currentRow][currentColumn]

  const cellValueDisplayed = boardDisplayed.value[currentRow][currentColumn]

  if (cellValueDisplayed === CELL_STATE.FLAG) return

  if (cellValue === CELL_STATE.BOMB) {
    gameOver({
      column: currentColumn,
      row: currentRow,
      baseBoard,
      boardDisplayed,
      allBombsPositions,
      bombsCount,
      isGameOver,
      timeouts,
      isClosed,
      hasSound,
      timerInterval
    })

    handleCalculatePerformance()

    return
  }

  if (cellValue === null) {
    revealAdjacentEmptyCells({
      baseBoard,
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
      baseBoard,
      boardDisplayed
    })
  }

  clicksTip.value++

  clicksCount.leftCursor++

  const flags = countFlags({
    rows: numberRows,
    columns: numberColumns,
    boardDisplayed
  })

  bombsDisplayed.value = bombsCount.value - flags

  const isCheckedVictory = checkVictory({ boardDisplayed, bombsCount })

  if (isCheckedVictory) {
    victory({
      baseBoard,
      boardDisplayed,
      columns: numberColumns,
      rows: numberRows,
      isVictory,
      isClosed,
      hasSound,
      timerInterval
    })
  }

  const OneNumberSoundHowl = new Howl({
    src: [oneNumberSound],
    volume: 0.08
  })

  const moreThanOneNumbersSoundHowl = new Howl({
    src: [moreThanOneNumbersSound],
    volume: 0.02
  })

  if (cellValue !== null && !isCheckedVictory) hasSound.value && OneNumberSoundHowl.play()

  if (cellValue === null && !isCheckedVictory) hasSound.value && moreThanOneNumbersSoundHowl.play()

  handleCalculatePerformance()
}
