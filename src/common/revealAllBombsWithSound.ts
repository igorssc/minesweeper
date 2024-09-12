import bombSound from '@/assets/audios/bomb-explosion.mp3'
import { revealCell } from './revealCell'
import { sortBombsRadially } from './sortBombsRadially'
import { CELL_STATE, type BoardItemProps } from '@/enums/cellState'
import type { Ref } from 'vue'

type RevealAllBombsWithSoundProps = {
  row: number
  column: number
  baseBoard: Ref<BoardItemProps[][]>
  boardDisplayed: Ref<BoardItemProps[][]>
  allBombsPositions: Ref<[number, number][]>
  bombsCount: Ref<number>
  isGameOver: Ref<boolean>
  timeouts: Ref<number[]>
}

export const revealAllBombsWithSound = ({
  column,
  row,
  baseBoard,
  boardDisplayed,
  allBombsPositions,
  bombsCount,
  isGameOver,
  timeouts
}: RevealAllBombsWithSoundProps) => {
  const bombSoundHowl = new Howl({
    src: [bombSound],
    volume: 0.0015
  })

  bombSoundHowl.play()

  revealCell({
    row,
    column,
    baseBoard: baseBoard,
    boardDisplayed: boardDisplayed
  })

  const sortedBombs = sortBombsRadially({
    bombPositions: allBombsPositions,
    column,
    row
  })

  sortedBombs.forEach(([rowSorted, columnSorted], index) => {
    if (row === rowSorted && column === columnSorted) return

    const delay = index * 50

    const loop = setTimeout(() => {
      if (!isGameOver.value) {
        clearTimeout(loop)
        return
      }

      const isBombPlay = bombsCount.value <= 30 ? true : Math.random() < 0.5
      isBombPlay && bombSoundHowl.play()

      revealCell({
        row: rowSorted,
        column: columnSorted,
        base: CELL_STATE.BOMB,
        baseBoard,
        boardDisplayed
      })
    }, delay)

    timeouts.value.push(loop) // Armazena o ID do timeout
  })
}
