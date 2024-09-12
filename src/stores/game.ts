import { ref, onUnmounted, reactive } from 'vue'
import { defineStore } from 'pinia'
import { type BoardItemProps } from '@/enums/cellState'
import { createEmptyBoard } from '@/common/createEmptyBoard'
import { stopAllTimeouts } from '@/common/stopAllTimeouts'
import { checkAllBombs } from '@/common/checkAllBombs'
import { populateMinesweeperBoard } from '@/common/populateMinesweeperBoard'
import { placeBombsOnBoard } from '@/common/placeBombsOnBoard'
import { calculateMinimumClicks } from '@/common/calculateMinimumClicks'
import { handleCellClickFlag } from '@/common/handleCellClickFlag'
import { handleCellClick } from '@/common/handleCellClick'
import { stopTimer } from '@/common/stopTimer'

export const useGameStore = defineStore('game', () => {
  const columns = ref(10)
  const rows = ref(10)
  const bombs = ref(1)
  const bombsDisplayed = ref(bombs.value)
  const baseBoard = ref<BoardItemProps[][]>([])
  const boardDisplayed = ref<BoardItemProps[][]>([])
  const isClosed = ref(true)
  const elapsedTime = ref(0)
  const isFirstClick = ref(true)
  const minimumClicks = ref(0)
  const isVictory = ref(false)
  const isGameOver = ref(false)
  const hasSafeStart = ref(false)
  const allBombsPositions = ref<[number, number][]>([])
  const timerInterval = ref<ReturnType<typeof setInterval> | null>(null)
  const timeouts = ref<number[]>([])

  const clicksCount = reactive({
    leftCursor: 0,
    rightCursor: 0
  })

  if (isGameOver.value) {
    stopAllTimeouts(timeouts)
  }

  const init = () => {
    baseBoard.value = createEmptyBoard({ columns: columns.value, rows: rows.value })
    boardDisplayed.value = JSON.parse(JSON.stringify(baseBoard.value))

    isClosed.value = false
    isFirstClick.value = true
    elapsedTime.value = 0
    clicksCount.leftCursor = 0
    clicksCount.rightCursor = 0
    bombsDisplayed.value = bombs.value
    isVictory.value = false
    isGameOver.value = false

    stopTimer(timerInterval)

    placeBombsOnBoard({
      columns: columns.value,
      rows: rows.value,
      bombsCount: bombs.value,
      baseBoard: baseBoard.value
    })

    populateMinesweeperBoard({
      baseBoard: baseBoard,
      columns: columns.value,
      rows: rows.value
    })

    minimumClicks.value = calculateMinimumClicks({
      columns: columns.value,
      rows: rows.value,
      baseBoard: baseBoard.value
    })

    allBombsPositions.value = checkAllBombs({
      columns: columns.value,
      rows: rows.value,
      baseBoard: baseBoard.value
    })
  }

  const handleClick = ({ row, column }: { row: number; column: number }) =>
    handleCellClick({
      currentColumn: column,
      currentRow: row,
      numberColumns: columns.value,
      numberRows: rows.value,
      isClosed: isClosed,
      isVictory: isVictory,
      isGameOver: isGameOver,
      isFirstClick: isFirstClick,
      hasSafeStart: hasSafeStart.value,
      elapsedTime: elapsedTime,
      baseBoard: baseBoard,
      boardDisplayed: boardDisplayed.value,
      bombsDisplayed: bombsDisplayed,
      allBombsPositions: allBombsPositions.value,
      bombsCount: bombs.value,
      clicksCount,
      timerInterval,
      timeouts
    })

  const handleClickFlag = ({ row, column }: { row: number; column: number }) =>
    handleCellClickFlag({
      column,
      row,
      boardDisplayed: boardDisplayed.value,
      bombsDisplayed: bombsDisplayed.value,
      isClosed: isClosed.value,
      clicksCount: clicksCount
    })

  onUnmounted(() => {
    stopTimer(timerInterval)
  })

  return {
    columns,
    rows,
    bombs,
    bombsDisplayed,
    board: boardDisplayed,
    init,
    handleCellClick: handleClick,
    handleCellClickFlag: handleClickFlag,
    stop,
    elapsedTime,
    minimumClicks,
    clicksCount,
    isVictory,
    isGameOver
  }
})
