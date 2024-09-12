import type { BoardItemProps } from '@/enums/cellState'
import type { Ref } from 'vue'

type CreateEmptyBoardProps = {
  rows: Ref<number>
  columns: Ref<number>
}

export const createEmptyBoard = ({ columns, rows }: CreateEmptyBoardProps): BoardItemProps[][] =>
  Array.from({ length: rows.value }, () => Array.from({ length: columns.value }, () => null))
