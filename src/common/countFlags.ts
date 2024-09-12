import { CELL_STATE, type BoardItemProps } from '@/enums/cellState'
import type { Ref } from 'vue'

type CountFlagsProps = {
  rows: Ref<number>
  columns: Ref<number>
  boardDisplayed: Ref<BoardItemProps[][]>
}

export const countFlags = ({ rows, columns, boardDisplayed }: CountFlagsProps) => {
  let flags = 0

  for (let row = 0; row < rows.value; row++) {
    for (let col = 0; col < columns.value; col++) {
      if (boardDisplayed.value[row][col] === CELL_STATE.FLAG) flags++
    }
  }

  return flags
}
