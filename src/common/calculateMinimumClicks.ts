import { CELL_STATE, type BoardItemProps } from '@/enums/cellState'
import { exploreIsland } from './exploreIsland'
import { ref } from 'vue'
import type { Ref } from 'vue'

type CalculateMinimumClicksProps = {
  rows: Ref<number>
  columns: Ref<number>
  baseBoard: Ref<BoardItemProps[][]>
}

export const calculateMinimumClicks = ({
  rows,
  columns,
  baseBoard
}: CalculateMinimumClicksProps): number => {
  const visited = ref<boolean[][]>(
    Array.from({ length: rows.value }, () => Array(columns.value).fill(false))
  )

  const accessibleNumericalCells = ref<boolean[][]>(
    Array.from({ length: rows.value }, () => Array(columns.value).fill(false))
  )

  let islandCount = 0

  // Contar o número de ilhas seguras distintas
  for (let row = 0; row < rows.value; row++) {
    for (let col = 0; col < columns.value; col++) {
      if (visited.value[row][col] || baseBoard.value[row][col] !== null) continue

      exploreIsland({
        accessibleNumericalCells,
        visited,
        baseBoard,
        currentColumn: col,
        currentRow: row,
        numberColumns: columns,
        numberRows: rows
      })
      islandCount += 1
    }
  }

  // Contar o número de células numéricas não reveladas que não são acessíveis através de ilhas seguras
  let isolatedNumericalCells = 0
  for (let row = 0; row < rows.value; row++) {
    for (let col = 0; col < columns.value; col++) {
      if (
        baseBoard.value[row][col] === null ||
        baseBoard.value[row][col] === CELL_STATE.BOMB ||
        accessibleNumericalCells.value[row][col]
      )
        continue

      isolatedNumericalCells += 1
    }
  }

  // O número mínimo de cliques é o número de ilhas mais o número de células numéricas isoladas
  return islandCount + isolatedNumericalCells
}
