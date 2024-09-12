import { CELL_STATE, type BoardItemProps } from '@/enums/cellState'
import type { Ref } from 'vue'

type CalculateBombsScoreProps = {
  baseBoard: Ref<BoardItemProps[][]>
  boardDisplayed: Ref<BoardItemProps[][]>
}

export const calculateBombsScore = ({ baseBoard, boardDisplayed }: CalculateBombsScoreProps) => {
  let correctFlags = 0
  let totalFlags = 0

  // Itera sobre o tabuleiro base e o tabuleiro exibido
  for (let row = 0; row < baseBoard.value.length; row++) {
    for (let col = 0; col < baseBoard.value[row].length; col++) {
      const baseCell = baseBoard.value[row][col]
      const displayedCell = boardDisplayed.value[row][col]

      // Conta as bandeiras corretas e totais
      if (displayedCell !== CELL_STATE.FLAG) continue
      if (baseCell === CELL_STATE.BOMB) {
        correctFlags++
      }
      totalFlags++
    }
  }

  // Calcula a pontuação das bombas com base na precisão das bandeiras
  let bombsScore: number = 0

  if (totalFlags === 0) {
    // Se não houver bandeiras, a pontuação é 100%
    bombsScore = 100
  }

  if (totalFlags > 0) {
    // Calcula a porcentagem de bandeiras corretas
    bombsScore = (correctFlags / totalFlags) * 100
  }

  return bombsScore
}
