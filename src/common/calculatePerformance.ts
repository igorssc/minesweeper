import type { Ref } from 'vue'
import { calculateBombsScore } from './calculateBombsScore'
import { CELL_STATE, type BoardItemProps } from '@/enums/cellState'

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
  const area = rows.value * columns.value

  const maxTime = area * 3.5
  const maxClicks = rows.value * columns.value // Máximo teórico de cliques (um por célula)

  // Pesos para cada métrica
  const timeWeight = 0.1
  const clickWeight = 0.1
  const moveWeight = 0.1
  const bombsWeight = 0.1
  const victoryWeight = 0.1
  const gameOverPenaltyWeight = 0
  const efficiencyScoreWeight = 0.8

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

  const bombsScore = Math.min(100, calculateBombsScore({ baseBoard, boardDisplayed }))

  const victoryScore = isVictory.value ? 100 : 0

  // Métrica para penalização de game over
  const totalNonBombCells = baseBoard.value.flat().filter((cell) => cell !== CELL_STATE.BOMB).length

  const openedCells = boardDisplayed.value
    .flat()
    .filter((cell) => cell !== CELL_STATE.FLAG && cell !== CELL_STATE.BOMB && cell !== null).length

  const efficiencyScore = Math.min(100, 100 * (openedCells / totalNonBombCells))

  // Bônus para ilhas descobertas
  // const discoveredIslands = countIslands({
  //   boardDisplayed,
  //   numberColumns: columns,
  //   numberRows: rows
  // })

  // const maxIslands = countIslands({
  //   boardDisplayed,
  //   numberColumns: columns,
  //   numberRows: rows
  // })

  // const islandBonus = isVictory.value ? (discoveredIslands / maxIslands) * 100 : 0

  // Calculando contribuições ponderadas
  const weightedTimeScore = timeScore * timeWeight
  const weightedClickScore = clickScore * clickWeight
  const weightedMoveScore = moveScore * moveWeight
  const weightedBombsScore = bombsScore * bombsWeight
  const weightedVictoryScore = victoryScore * victoryWeight
  const weightedGameOverPenalty = gameOverPenaltyWeight
  const weightedEfficiency = efficiencyScore * efficiencyScoreWeight

  let totalScore =
    weightedTimeScore +
    weightedClickScore +
    weightedMoveScore +
    weightedBombsScore +
    weightedEfficiency

  if (isVictory.value) totalScore += weightedVictoryScore
  if (isGameOver.value) totalScore -= weightedGameOverPenalty

  // Garantindo que a pontuação total não ultrapasse 100
  totalScore = Math.max(0, Math.min(totalScore, 100))

  totalScore = isGameOver ? Math.max(0, Math.min(totalScore, 99)) : totalScore

  return totalScore
}
