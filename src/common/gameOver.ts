import type { BoardItemProps } from '@/enums/cellState'
import { revealAllBombsWithSound } from './revealAllBombsWithSound'
import type { Ref } from 'vue'
import { stop } from './stop'

type GameOverProps = {
  row: number
  column: number
  baseBoard: BoardItemProps[][]
  boardDisplayed: BoardItemProps[][]
  allBombsPositions: [number, number][]
  bombsCount: number
  isGameOver: Ref<boolean>
  timeouts: Ref<number[]>
  isClosed: Ref<boolean>
  timerInterval: Ref<number | null>
}

export const gameOver = ({
  column,
  row,
  baseBoard,
  boardDisplayed,
  allBombsPositions,
  bombsCount,
  isGameOver,
  timeouts,
  isClosed,
  timerInterval
}: GameOverProps) => {
  stop({
    isClosed,
    timerInterval
  })

  isGameOver.value = true
  revealAllBombsWithSound({
    row,
    column,
    allBombsPositions,
    baseBoard,
    boardDisplayed,
    bombsCount,
    isGameOver,
    timeouts
  })
}
