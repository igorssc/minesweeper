import type { Ref } from 'vue'
import { handleTipBomb } from './handleTipBomb'
import { handleTipNumber } from './handleTipNumber'
import type { BoardItemProps } from '@/enums/cellState'

type HandleTipProps = {
  bombsDisplayed: Ref<number>
  boardDisplayed: Ref<BoardItemProps[][]>
  allBombsPositions: Ref<[number, number][]>
  isClosed: Ref<boolean>
  hasSound: Ref<boolean>
  clicksTip: Ref<number>
  timeForTip: Ref<number>
  openCeil: Ref<[number, number, number][]>
  numberColumns: Ref<number>
  numberRows: Ref<number>
  baseBoard: Ref<BoardItemProps[][]>
  allFlagsPositions: Ref<[number, number][]>
  isVictory: Ref<boolean>
  isGameOver: Ref<boolean>
  isFirstClick: Ref<boolean>
  hasSafeStart: Ref<boolean>
  timerInterval: Ref<number | null>
  elapsedTime: Ref<number>
  bombsCount: Ref<number>
  performanceMetric: Ref<number>
  minimumClicks: Ref<number>
  timeouts: Ref<number[]>
  createBoard: () => void
  clicksCount: {
    leftCursor: number
    rightCursor: number
  }
}

export const handleTip = ({
  bombsDisplayed,
  allBombsPositions,
  boardDisplayed,
  clicksCount,
  hasSound,
  clicksTip,
  timeForTip,
  openCeil,
  baseBoard,
  numberColumns,
  numberRows,
  allFlagsPositions,
  isClosed,
  isVictory,
  isGameOver,
  isFirstClick,
  hasSafeStart,
  timerInterval,
  elapsedTime,
  bombsCount,
  performanceMetric,
  minimumClicks,
  timeouts,
  createBoard
}: HandleTipProps) => {
  const sortedNumber = Math.random()

  if (sortedNumber <= 0.5) {
    handleTipBomb({
      bombsDisplayed,
      allBombsPositions,
      boardDisplayed,
      clicksCount,
      hasSound,
      clicksTip,
      timeForTip,
      openCeil,
      baseBoard,
      numberColumns,
      numberRows,
      allFlagsPositions,
      isClosed
    })

    return
  }

  handleTipNumber({
    bombsDisplayed,
    allBombsPositions,
    boardDisplayed,
    clicksCount,
    hasSound,
    clicksTip,
    timeForTip,
    openCeil,
    baseBoard,
    numberColumns,
    numberRows,
    allFlagsPositions,
    isClosed,
    isVictory,
    isGameOver,
    isFirstClick,
    hasSafeStart,
    timerInterval,
    elapsedTime,
    bombsCount,
    performanceMetric,
    minimumClicks,
    timeouts,
    createBoard
  })
}
