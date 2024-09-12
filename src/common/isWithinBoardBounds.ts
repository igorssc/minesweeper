type IsWithinBoardBoundsProps = {
  currentColumn: number
  currentRow: number
  numberColumns: number
  numberRows: number
}

export const isWithinBoardBounds = ({
  currentColumn,
  currentRow,
  numberColumns,
  numberRows
}: IsWithinBoardBoundsProps): boolean =>
  currentRow >= 0 && currentRow < numberRows && currentColumn >= 0 && currentColumn < numberColumns
