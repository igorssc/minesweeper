import { CELL_STATE, isNumberCell, type BoardItemProps } from '@/enums/cellState'
import eventBus from '@/events/eventBus'
import { shuffleArray } from '@/utils/shuffleArray'
import type { Ref } from 'vue'
import { checkAvailableFieldsAround } from './checkAvailableFieldsAround'
import { handleCellClick } from './handleCellClick'

type HandleTipNumberProps = {
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

export const handleTipNumber = ({
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
}: HandleTipNumberProps) => {
  if (bombsDisplayed.value <= 0) return 0

  const allOpenedPosition = [...JSON.parse(JSON.stringify(openCeil.value))]

  const allOpenedPositionWithNumbers = allOpenedPosition.filter(([, , value]) =>
    isNumberCell(value)
  )

  const allRandomOpenedPositionWithNumbers = shuffleArray(allOpenedPositionWithNumbers)

  for (const [row, column] of allRandomOpenedPositionWithNumbers) {
    if (clicksTip.value === 0 || timeForTip.value === 0) break

    const availableFieldsAround = checkAvailableFieldsAround({
      currentColumn: column,
      currentRow: row,
      numberColumns,
      numberRows,
      boardDisplayed
    })

    const allRandomAvailablePositions = shuffleArray([...availableFieldsAround.ceilsAround])

    const allRandomAvailablePositionsNonBombs = allRandomAvailablePositions.filter(
      ([positionRow, positionColumn]) =>
        baseBoard.value[positionRow][positionColumn] !== CELL_STATE.BOMB
    )

    if (allRandomAvailablePositionsNonBombs.length === 0) continue

    for (const [cellPositionRow, cellPositionColumn] of shuffleArray([
      ...allRandomAvailablePositionsNonBombs
    ])) {
      const isCellHasFlag =
        boardDisplayed.value[cellPositionRow][cellPositionColumn] === CELL_STATE.FLAG

      if (isCellHasFlag) continue

      eventBus.emit('tip', { row: cellPositionRow, column: cellPositionColumn })

      clicksTip.value = 0
      timeForTip.value = 0

      setTimeout(() => {
        handleCellClick({
          currentColumn: cellPositionColumn,
          currentRow: cellPositionRow,
          numberColumns,
          numberRows,
          isClosed,
          isVictory,
          isGameOver,
          isFirstClick,
          hasSafeStart,
          timeForTip,
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
          createBoard,
          clicksTip,
          allFlagsPositions,
          openCeil,
          bombsCount
        })
      }, 1500)

      break
    }
  }
}
