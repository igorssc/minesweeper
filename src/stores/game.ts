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
import { defaultLevels } from '@/utils/defaultLevels'
import { LEVEL } from '@/enums/level'
import { handleLevel } from '@/common/handleLevel'
import type { RouteLocationNormalizedLoadedGeneric, Router } from 'vue-router'

export const useGameStore = defineStore('game', () => {
  const level = ref<LEVEL>(LEVEL.BEGINNER)
  const columns = ref(defaultLevels[LEVEL.BEGINNER].columns)
  const rows = ref(defaultLevels[LEVEL.BEGINNER].rows)
  const bombs = ref(defaultLevels[LEVEL.BEGINNER].bombs)
  const bombsDisplayed = ref(bombs.value)
  const baseBoard = ref<BoardItemProps[][]>([])
  const boardDisplayed = ref<BoardItemProps[][]>([])
  const performanceMetric = ref(100)
  const isClosed = ref(true)
  const elapsedTime = ref(0)
  const isFirstClick = ref(true)
  const minimumClicks = ref(0)
  const isVictory = ref(false)
  const isGameOver = ref(false)
  const hasSafeStart = ref(true)
  const allBombsPositions = ref<[number, number][]>([])
  const timerInterval = ref<ReturnType<typeof setInterval> | null>(null)
  const timeouts = ref<number[]>([])
  const hasSound = ref(true)

  const clicksCount = reactive({
    leftCursor: 0,
    rightCursor: 0
  })

  const init = () => {
    baseBoard.value = createEmptyBoard({ columns, rows })
    boardDisplayed.value = JSON.parse(JSON.stringify(baseBoard.value))

    performanceMetric.value = 100
    isClosed.value = false
    isFirstClick.value = true
    elapsedTime.value = 0
    clicksCount.leftCursor = 0
    clicksCount.rightCursor = 0
    bombsDisplayed.value = bombs.value
    isVictory.value = false
    isGameOver.value = false

    stopTimer(timerInterval)
    stopAllTimeouts(timeouts)

    placeBombsOnBoard({
      columns,
      rows,
      bombsCount: bombs,
      baseBoard
    })

    populateMinesweeperBoard({
      baseBoard: baseBoard,
      columns: columns,
      rows: rows
    })

    minimumClicks.value = calculateMinimumClicks({
      columns: columns,
      rows: rows,
      baseBoard: baseBoard
    })

    allBombsPositions.value = checkAllBombs({
      columns,
      rows,
      baseBoard
    })
  }

  const handleCellClickFunction = ({ row, column }: { row: number; column: number }) =>
    handleCellClick({
      currentColumn: column,
      currentRow: row,
      numberColumns: columns,
      numberRows: rows,
      isClosed,
      isVictory,
      isGameOver,
      isFirstClick,
      hasSafeStart,
      elapsedTime,
      baseBoard,
      boardDisplayed,
      bombsDisplayed,
      allBombsPositions,
      bombsCount: bombs,
      clicksCount,
      timerInterval,
      timeouts,
      performanceMetric,
      minimumClicks,
      hasSound
    })

  const handleCellClickFlagFunction = ({ row, column }: { row: number; column: number }) =>
    handleCellClickFlag({
      column,
      row,
      boardDisplayed,
      bombsDisplayed,
      isClosed,
      hasSound,
      clicksCount
    })

  const handleLevelFunction = ({
    level: newLevel,
    route,
    router
  }: {
    level: LEVEL
    router: Router
    route: RouteLocationNormalizedLoadedGeneric
  }) =>
    handleLevel({ bombs, columns, rows, init, level: newLevel, currentLevel: level, router, route })

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
    handleCellClick: handleCellClickFunction,
    handleCellClickFlag: handleCellClickFlagFunction,
    handleLevel: handleLevelFunction,
    performanceMetric,
    stop,
    elapsedTime,
    minimumClicks,
    clicksCount,
    isVictory,
    isGameOver,
    hasSound,
    hasSafeStart,
    level
  }
})
