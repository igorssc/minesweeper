import type { BoardItemProps } from '@/enums/cellState'

type CreateEmptyBoardProps = {
  rows: number
  columns: number
}

export const createEmptyBoard = ({ columns, rows }: CreateEmptyBoardProps): BoardItemProps[][] =>
  Array.from({ length: rows }, () => Array.from({ length: columns }, () => null))
