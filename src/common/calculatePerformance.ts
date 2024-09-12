import type { Ref } from 'vue'
import { calculateBombsScore } from './calculateBombsScore'
import type { BoardItemProps } from '@/enums/cellState'

type PerformanceMetrics = {
  elapsedTime: Ref<number>
  bombs: Ref<number>
  minimumClicks: Ref<number>
  rows: Ref<number>
  columns: Ref<number>
  baseBoard: Ref<BoardItemProps[][]>
  boardDisplayed: Ref<BoardItemProps[][]>
  isVictory: Ref<boolean>
  isGameOver: Ref<boolean>
  clicksCount: {
    leftCursor: number
    rightCursor: number
  }
}

export const calculatePerformance = ({
  elapsedTime,
  minimumClicks,
  clicksCount,
  baseBoard,
  boardDisplayed,
  isVictory,
  isGameOver,
  rows,
  columns
}: PerformanceMetrics) => {
  const maxTime = 240 // Máximo de tempo em segundos para um bom desempenho (4 minutos)
  const maxClicks = rows.value * columns.value // Máximo teórico de cliques (um por célula)

  // Pesos para cada métrica
  const timeWeight = 0.2
  const clickWeight = 0.2
  const moveWeight = 0.2
  const bombsWeight = 0.2
  const victoryWeight = 0.1
  const lossWeight = 0.1

  // Normalizando as métricas
  const timeScore = Math.max(0, 100 - (elapsedTime.value / maxTime) * 100)
  const clickScore = Math.max(0, 100 - (clicksCount.leftCursor / maxClicks) * 100)
  const maxPossibleClicks = rows.value * columns.value
  const moveScore = Math.max(
    0,
    100 -
      Math.min(
        100,
        (Math.abs(minimumClicks.value - clicksCount.leftCursor) / maxPossibleClicks) * 100
      )
  )
  const bombsScore = Math.min(calculateBombsScore({ baseBoard, boardDisplayed }), 100)
  const victoryScore = isVictory.value ? 100 : 0
  const lossPenalty = isGameOver.value ? 100 : 0

  // Calculando contribuições ponderadas
  const weightedTimeScore = timeScore * timeWeight
  const weightedClickScore = clickScore * clickWeight
  const weightedMoveScore = moveScore * moveWeight
  const weightedBombsScore = bombsScore * bombsWeight
  const weightedVictoryScore = victoryScore * victoryWeight
  const weightedLossPenalty = lossPenalty * lossWeight

  let totalScore =
    weightedTimeScore + weightedClickScore + weightedMoveScore + weightedBombsScore + 20

  if (isVictory.value) totalScore += weightedVictoryScore
  if (isGameOver.value) totalScore -= weightedLossPenalty

  // Calculando a pontuação total ponderada
  totalScore = Math.max(0, Math.min(100, totalScore))

  return totalScore
}
