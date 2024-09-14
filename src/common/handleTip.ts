import { CELL_STATE, type BoardItemProps } from '@/enums/cellState'
import eventBus from '@/events/eventBus'
import { shuffleArray } from '@/utils/shuffleArray'
import type { Ref } from 'vue'
import { handleCellClickFlag } from './handleCellClickFlag'

type HandleTipProps = {
  bombsDisplayed: Ref<number>
  boardDisplayed: Ref<BoardItemProps[][]>
  allBombsPositions: Ref<[number, number][]>
  isClosed: Ref<boolean>
  hasSound: Ref<boolean>
  clicksTip: Ref<number>
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
  isClosed
}: HandleTipProps) => {
  if (bombsDisplayed.value <= 0) return 0

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
        clicksCount
      })
    }, 1500)

    break
  }
}
