import type { Ref } from 'vue'

type SortBombsRadiallyProps = {
  bombPositions: Ref<[number, number][]>
  row: number
  column: number
}

export const sortBombsRadially = ({ bombPositions, column, row }: SortBombsRadiallyProps) => {
  // Ordena o array de posições de bombas com base na distância Euclidiana da posição atual
  return bombPositions.value.sort(([rowA, colA], [rowB, colB]) => {
    const distanceA = Math.hypot(rowA - row, colA - column)
    const distanceB = Math.hypot(rowB - row, colB - column)
    return distanceA - distanceB // Menores distâncias primeiro
  })
}
