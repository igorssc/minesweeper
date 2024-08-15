import { ref, onUnmounted, reactive } from 'vue'
import { defineStore } from 'pinia'

export type BoardItemProps = null | number

export const useGameStore = defineStore('game', () => {
  const columns = ref(10)
  const rows = ref(10)
  const bombs = ref(1)
  const bombsDisplayed = ref(bombs.value)
  const baseBoard = ref<BoardItemProps[][]>([])
  const boardDisplayed = ref<BoardItemProps[][]>([])
  const isClosed = ref(true)
  const elapsedTime = ref(0)
  let timerInterval: ReturnType<typeof setInterval> | null = null
  const isFirstClick = ref(true)
  const minimumClicks = ref(0)
  const isVictory = ref(false)
  const clicksCount = reactive({
    leftCursor: 0,
    rightCursor: 0
  })

  const stop = () => {
    isClosed.value = true
    stopTimer()
  }

  const init = () => {
    baseBoard.value = createEmptyBoard()
    boardDisplayed.value = createEmptyBoard()
    isClosed.value = false
    isFirstClick.value = true
    elapsedTime.value = 0
    clicksCount.leftCursor = 0
    clicksCount.rightCursor = 0
    bombsDisplayed.value = bombs.value
    isVictory.value = false

    stopTimer()
    placeBombsOnBoard()
    populateMinesweeperBoard()

    minimumClicks.value = calculateMinimumClicks()
  }

  const createEmptyBoard = (): BoardItemProps[][] =>
    Array.from({ length: rows.value }, () => Array.from({ length: columns.value }, () => null))

  const placeBombsOnBoard = () => {
    const randomIndex = (max: number): number => Math.floor(Math.random() * max)
    const bombPositions = new Set<string>()

    while (bombPositions.size < bombs.value) {
      const row = randomIndex(rows.value)
      const column = randomIndex(columns.value)
      const positionKey = `${row},${column}`

      if (bombPositions.has(positionKey)) continue

      bombPositions.add(positionKey)
      baseBoard.value[row][column] = 0
    }
  }

  const populateMinesweeperBoard = () => {
    const bombCountAround = (row: number, col: number): number => {
      let adjacentBombCount = 0

      for (const [rowOffset, colOffset] of directionOffsets) {
        const adjacentRow = row + rowOffset
        const adjacentCol = col + colOffset

        if (!isWithinBoardBounds(adjacentRow, adjacentCol)) continue

        if (baseBoard.value[adjacentRow][adjacentCol] === 0) {
          adjacentBombCount++
        }
      }

      return adjacentBombCount
    }

    const newBoard = createEmptyBoard()

    for (let row = 0; row < rows.value; row++) {
      for (let col = 0; col < columns.value; col++) {
        newBoard[row][col] = getCellContent(row, col, bombCountAround)
      }
    }

    baseBoard.value = newBoard
  }

  const getCellContent = (
    row: number,
    col: number,
    countBombs: (row: number, col: number) => number
  ): number | null => {
    if (baseBoard.value[row][col] === 0) return 0

    const adjacentBombs = countBombs(row, col)
    return adjacentBombs > 0 ? adjacentBombs : null
  }

  const handleCellClick = (row: number, col: number) => {
    if (isClosed.value) return

    if (isFirstClick.value) {
      startTimer()
      isFirstClick.value = false
    }

    const cellValue = baseBoard.value[row][col]

    const cellValueDisplayed = boardDisplayed.value[row][col]

    if (cellValueDisplayed === -2) return

    if (cellValue === 0) return gameOver()

    if (cellValue === null) {
      revealAdjacentEmptyCells(row, col)
    }

    if (cellValue !== null) {
      revealCell(row, col)
    }

    clicksCount.leftCursor++

    const flags = countFlags()
    bombsDisplayed.value = bombs.value - flags

    checkVictory()
  }

  const handleCellClickFlag = (row: number, col: number) => {
    if (isClosed.value) return

    const cellValue = boardDisplayed.value[row][col]

    if (bombsDisplayed.value <= 0 && cellValue !== -2) return

    if (cellValue === -2) {
      boardDisplayed.value[row][col] = null
      bombsDisplayed.value++
      clicksCount.rightCursor++
      return
    }

    if (typeof cellValue === 'number') return

    boardDisplayed.value[row][col] = -2
    bombsDisplayed.value--
    clicksCount.rightCursor++
  }

  const countFlags = () => {
    let flags = 0

    for (let row = 0; row < rows.value; row++) {
      for (let col = 0; col < columns.value; col++) {
        if (boardDisplayed.value[row][col] === -2) flags++
      }
    }

    return flags
  }

  const revealAllBombs = () => {
    for (let row = 0; row < rows.value; row++) {
      for (let col = 0; col < columns.value; col++) {
        if (baseBoard.value[row][col] === 0) revealCell(row, col)
      }
    }
  }

  const revealCell = (row: number, col: number) => {
    const cellValue = baseBoard.value[row][col] ?? -1
    boardDisplayed.value[row][col] = cellValue
  }

  const revealAdjacentEmptyCells = (row: number, col: number) => {
    const queue: [number, number][] = [[row, col]]
    const visited = new Set<string>()

    while (queue.length > 0) {
      const [currentRow, currentCol] = queue.shift()!
      const positionKey = `${currentRow},${currentCol}`

      if (visited.has(positionKey)) continue

      visited.add(positionKey)

      if (baseBoard.value[currentRow][currentCol] !== null) continue

      revealCell(currentRow, currentCol)

      for (const [rowOffset, colOffset] of directionOffsets) {
        const adjacentRow = currentRow + rowOffset
        const adjacentCol = currentCol + colOffset

        if (!isWithinBoardBounds(adjacentRow, adjacentCol)) continue

        if (
          baseBoard.value[adjacentRow][adjacentCol] === null &&
          !visited.has(`${adjacentRow},${adjacentCol}`)
        ) {
          queue.push([adjacentRow, adjacentCol])
          continue
        }
        if (baseBoard.value[adjacentRow][adjacentCol]! > 0) {
          revealCell(adjacentRow, adjacentCol)
        }
      }
    }
  }

  const checkVictory = () => {
    const cellsCount = boardDisplayed.value
      .flat()
      .filter((cell) => cell === null || cell === -2).length
    if (cellsCount === bombs.value) return victory()
  }

  const gameOver = () => {
    stop()
    revealAllBombs()
  }

  const victory = () => {
    stop()
    markBombsAsVictory()
    isVictory.value = true
  }

  const markBombsAsVictory = () => {
    for (let row = 0; row < rows.value; row++) {
      for (let col = 0; col < columns.value; col++) {
        if (baseBoard.value[row][col] === 0) {
          boardDisplayed.value[row][col] = -2
        }
      }
    }
  }

  const calculateMinimumClicks = (): number => {
    const visited = Array.from({ length: rows.value }, () => Array(columns.value).fill(false))
    const accessibleNumericalCells = Array.from({ length: rows.value }, () =>
      Array(columns.value).fill(false)
    )

    const isWithinBounds = (row: number, col: number): boolean =>
      row >= 0 && row < rows.value && col >= 0 && col < columns.value

    const exploreIsland = (row: number, col: number) => {
      const queue: [number, number][] = [[row, col]]

      while (queue.length > 0) {
        const [currentRow, currentCol] = queue.shift()!
        if (visited[currentRow][currentCol]) continue
        visited[currentRow][currentCol] = true

        for (const [rowOffset, colOffset] of directionOffsets) {
          const adjacentRow = currentRow + rowOffset
          const adjacentCol = currentCol + colOffset
          if (
            isWithinBounds(adjacentRow, adjacentCol) &&
            !visited[adjacentRow][adjacentCol] &&
            baseBoard.value[adjacentRow][adjacentCol] === null
          ) {
            queue.push([adjacentRow, adjacentCol])
          }
          if (
            isWithinBounds(adjacentRow, adjacentCol) &&
            baseBoard.value[adjacentRow][adjacentCol] !== null &&
            baseBoard.value[adjacentRow][adjacentCol] !== 0 // Not counting cells with bombs
          ) {
            accessibleNumericalCells[adjacentRow][adjacentCol] = true
          }
        }
      }
    }

    let islandCount = 0

    // Count the number of distinct safe islands
    for (let row = 0; row < rows.value; row++) {
      for (let col = 0; col < columns.value; col++) {
        if (!visited[row][col] && baseBoard.value[row][col] === null) {
          exploreIsland(row, col)
          islandCount += 1
        }
      }
    }

    // Count the number of non-revealed numerical cells that are not accessible through safe islands
    let isolatedNumericalCells = 0
    for (let row = 0; row < rows.value; row++) {
      for (let col = 0; col < columns.value; col++) {
        if (
          baseBoard.value[row][col] !== null &&
          baseBoard.value[row][col] !== 0 &&
          !accessibleNumericalCells[row][col]
        ) {
          isolatedNumericalCells += 1
        }
      }
    }

    // The minimum number of clicks is the number of islands plus the number of isolated numerical cells
    return islandCount + isolatedNumericalCells
  }

  const isWithinBoardBounds = (row: number, col: number): boolean =>
    row >= 0 && row < rows.value && col >= 0 && col < columns.value

  const directionOffsets = [
    [-1, -1], // Upper Left Diagonal
    [-1, 0], // Upper
    [-1, 1], // Upper Right
    [0, -1], // Left
    [0, 1], // Right
    [1, -1], // Lower Left Diagonal
    [1, 0], // Lower
    [1, 1] // Lower Right
  ]

  const startTimer = () => {
    if (timerInterval) return
    timerInterval = setInterval(() => {
      elapsedTime.value++
    }, 1000)
  }

  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval)
      timerInterval = null
    }
  }

  onUnmounted(() => {
    stopTimer()
  })

  return {
    columns,
    rows,
    bombs,
    bombsDisplayed,
    board: boardDisplayed,
    init,
    handleCellClick,
    handleCellClickFlag,
    stop,
    elapsedTime,
    minimumClicks,
    clicksCount,
    isVictory
  }
})
