import { CELL_STATE, isNumberCell, type BoardItemProps } from '@/enums/cellState'
import eventBus from '@/events/eventBus'
import { shuffleArray } from '@/utils/shuffleArray'
import type { Ref } from 'vue'
import { handleCellClickFlag } from './handleCellClickFlag'
import { checkBombsAround } from './checkBombsAround'

type HandleTipProps = {
  bombsDisplayed: Ref<number>
  boardDisplayed: Ref<BoardItemProps[][]>
  allBombsPositions: Ref<[number, number][]>
  isClosed: Ref<boolean>
  hasSound: Ref<boolean>
  clicksTip: Ref<number>
  openCeil: Ref<[number, number, number][]>
  numberColumns: Ref<number>
  numberRows: Ref<number>
  baseBoard: Ref<BoardItemProps[][]>
  allFlagsPositions: Ref<[number, number][]>
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
  openCeil,
  baseBoard,
  numberColumns,
  numberRows,
  allFlagsPositions,
  isClosed
}: HandleTipProps) => {
  if (bombsDisplayed.value <= 0) return 0

  const allOpenedPosition = [...JSON.parse(JSON.stringify(openCeil.value))]

  const allOpenedPositionWithNumbers = allOpenedPosition.filter(([, , value]) =>
    isNumberCell(value)
  )

  const allRandomOpenedPositionWithNumbers = shuffleArray(allOpenedPositionWithNumbers)

  for (const [row, column] of allRandomOpenedPositionWithNumbers) {
    if (clicksTip.value === 0) break

    const bombsAround = checkBombsAround({
      currentColumn: column,
      currentRow: row,
      numberColumns,
      numberRows,
      baseBoard
    })

    if (bombsAround.length === 0) continue

    for (const [bombPositionRow, bombPositionColumn] of bombsAround) {
      const isBombHasFlag =
        boardDisplayed.value[bombPositionRow][bombPositionColumn] === CELL_STATE.FLAG

      if (isBombHasFlag) continue

      eventBus.emit('tip', { row: bombPositionRow, column: bombPositionColumn })

      clicksTip.value = 0

      setTimeout(() => {
        handleCellClickFlag({
          column: bombPositionColumn,
          row: bombPositionRow,
          boardDisplayed,
          bombsDisplayed,
          isClosed,
          hasSound,
          allFlagsPositions,
          clicksCount
        })
      }, 1500)

      break
    }
  }

  if (clicksTip.value === 0) return

  const allRandomBombsPositions = shuffleArray([...allBombsPositions.value])

  for (const [bombPositionRow, bombPositionColumn] of allRandomBombsPositions) {
    if (boardDisplayed.value[bombPositionRow][bombPositionColumn] === CELL_STATE.FLAG) continue

    eventBus.emit('tip', { row: bombPositionRow, column: bombPositionColumn })

    clicksTip.value = 0

    setTimeout(() => {
      handleCellClickFlag({
        column: bombPositionColumn,
        row: bombPositionRow,
        boardDisplayed,
        bombsDisplayed,
        isClosed,
        hasSound,
        allFlagsPositions,
        clicksCount
      })
    }, 1500)

    break
  }
}
