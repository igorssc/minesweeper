import winnerSound from '@/assets/audios/winner.mp3'
import { markBombsAsVictory } from './markBombsAsVictory'
import type { BoardItemProps } from '@/enums/cellState'
import { Howl } from 'howler'
import type { Ref } from 'vue'
import { stop } from './stop'

type VictoryProps = {
  columns: Ref<number>
  rows: Ref<number>
  isVictory: Ref<boolean>
  baseBoard: Ref<BoardItemProps[][]>
  boardDisplayed: Ref<BoardItemProps[][]>
  isClosed: Ref<boolean>
  timerInterval: Ref<number | null>
}

export const victory = ({
  columns,
  rows,
  baseBoard,
  boardDisplayed,
  isVictory,
  isClosed,
  timerInterval
}: VictoryProps) => {
  isVictory.value = true

  stop({
    isClosed,
    timerInterval
  })

  markBombsAsVictory({
    columns,
    rows,
    baseBoard,
    boardDisplayed
  })

  const winnerSoundHowl = new Howl({
    src: [winnerSound],
    volume: 0.02
  })

  winnerSoundHowl.play()
}
