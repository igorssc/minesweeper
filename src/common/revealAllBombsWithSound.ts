import bombSound from '@public/assets/audios/bomb-explosion.mp3'
import { revealCell } from './revealCell'
import { sortBombsRadially } from './sortBombsRadially'
import { CELL_STATE, type BoardItemProps } from '@/enums/cellState'
import type { Ref } from 'vue'
import eventBus from '@/events/eventBus'

type RevealAllBombsWithSoundProps = {
  row: number
  column: number
  baseBoard: Ref<BoardItemProps[][]>
  boardDisplayed: Ref<BoardItemProps[][]>
  allBombsPositions: Ref<[number, number][]>
  openCeil: Ref<[number, number, number][]>
  bombsCount: Ref<number>
  isGameOver: Ref<boolean>
  hasSound: Ref<boolean>
  timeouts: Ref<number[]>
  allFlagsPositions: Ref<[number, number][]>
}

export const revealAllBombsWithSound = ({
  column,
  row,
  baseBoard,
  boardDisplayed,
  allBombsPositions,
  allFlagsPositions,
  bombsCount,
  isGameOver,
  hasSound,
  openCeil,
  timeouts
}: RevealAllBombsWithSoundProps) => {
  const bombSoundHowl = new Howl({
    src: [bombSound],
    volume: 0.003
  })

  hasSound.value && bombSoundHowl.play()

  revealCell({
    row,
    column,
    baseBoard: baseBoard,
    boardDisplayed: boardDisplayed,
    openCeil
  })

  const sortedBombs = sortBombsRadially({
    bombPositions: allBombsPositions,
    column,
    row
  })

  sortedBombs.forEach(([rowSorted, columnSorted], index) => {
    if (row === rowSorted && column === columnSorted) return

    const area = baseBoard.value.length * baseBoard.value[0].length

    const TIME_BASE_DELAY = (area <= 400 ? 1 : 3) * 1000

    const delay =
      TIME_BASE_DELAY / sortedBombs.length + index * (TIME_BASE_DELAY / sortedBombs.length)

    // Usando setTimeout para executar de forma assíncrona e paralela
    const loop = setTimeout(async () => {
      if (!isGameOver.value) {
        clearTimeout(loop)
        return
      }

      // Definir aleatoriedade para o som da bomba, dependendo do número de bombas
      const isBombPlay = bombsCount.value <= 30 || Math.random() < 0.3
      hasSound.value && isBombPlay && bombSoundHowl.play()

      // Chamar função para revelar a célula
      revealCell({
        row: rowSorted,
        column: columnSorted,
        base: CELL_STATE.BOMB,
        baseBoard,
        boardDisplayed,
        openCeil
      })
    }, delay)

    // Armazena o ID do timeout, se necessário
    timeouts.value.push(loop)
  })

  for (const [flagPositionRow, flagPositionColumn] of allFlagsPositions.value) {
    if (baseBoard.value[flagPositionRow][flagPositionColumn] === CELL_STATE.BOMB) continue

    eventBus.emit('flag-error', { row: flagPositionRow, column: flagPositionColumn })
  }
}
