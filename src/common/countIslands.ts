import { CELL_STATE, type BoardItemProps } from '@/enums/cellState'
import { directionOffsets } from './directionOffsets'
import { isWithinBoardBounds } from './isWithinBoardBounds'
import type { Ref } from 'vue'

type CountIslandsProps = {
  boardDisplayed: Ref<BoardItemProps[][]>
  numberColumns: Ref<number>
  numberRows: Ref<number>
}

export const countIslands = ({
  boardDisplayed,
  numberColumns,
  numberRows
}: CountIslandsProps): number => {
  // Inicializa a matriz de visitados
  const isVisited = Array.from({ length: boardDisplayed.value.length }, () =>
    Array(boardDisplayed.value[0].length).fill(false)
  )
  let islandCount = 0

  // Função para realizar a busca em profundidade (DFS)
  const exploreIsland = (startRow: number, startCol: number) => {
    const stack: [number, number][] = [[startRow, startCol]]

    while (stack.length > 0) {
      const [currentRow, currentColumn] = stack.pop()!

      // Verifica se a célula atual está fora dos limites ou já foi visitada ou não é uma célula vazia
      const isOutOfBounds = isWithinBoardBounds({
        currentColumn,
        currentRow,
        numberColumns,
        numberRows
      })
      const isCellVisited = isVisited[currentRow][currentColumn]
      const isEmptyCell = boardDisplayed.value[currentRow][currentColumn] === CELL_STATE.EMPTY

      if (isOutOfBounds || isCellVisited || !isEmptyCell) {
        continue
      }

      // Marca a célula como visitada
      isVisited[currentRow][currentColumn] = true

      // Adiciona as células adjacentes à pilha
      for (const [offsetRow, offsetCol] of directionOffsets) {
        stack.push([currentRow + offsetRow, currentColumn + offsetCol])
      }
    }
  }

  // Itera por cada célula do tabuleiro
  for (let row = 0; row < boardDisplayed.value.length; row++) {
    for (let col = 0; col < boardDisplayed.value[0].length; col++) {
      const isCellEmpty = boardDisplayed.value[row][col] === CELL_STATE.EMPTY
      const hasNotBeenVisited = !isVisited[row][col]

      // Se a célula é vazia e ainda não foi visitada, inicia uma nova exploração
      if (isCellEmpty && hasNotBeenVisited) {
        exploreIsland(row, col)
        islandCount++
      }
    }
  }

  return islandCount
}
