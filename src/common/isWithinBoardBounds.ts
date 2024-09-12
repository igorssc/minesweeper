import type { Ref } from 'vue'

type IsWithinBoardBoundsProps = {
  currentColumn: number
  currentRow: number
  numberColumns: Ref<number>
  numberRows: Ref<number>
}

export const isWithinBoardBounds = ({
  currentColumn,
  currentRow,
  numberColumns,
  numberRows
}: IsWithinBoardBoundsProps): boolean =>
  currentRow >= 0 &&
  currentRow < numberRows.value &&
  currentColumn >= 0 &&
  currentColumn < numberColumns.value
