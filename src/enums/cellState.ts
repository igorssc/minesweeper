export enum CELL_STATE {
  FLAG = -2,
  EMPTY = -1,
  BOMB = 0
}

export type NumberCell = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export type BoardItemProps = CELL_STATE | NumberCell | null

export const isCellState = (value: BoardItemProps): value is CELL_STATE => {
  return Object.values(CELL_STATE).includes(value as CELL_STATE)
}

export const isNumberCell = (value: BoardItemProps): value is NumberCell => {
  return typeof value === 'number' && value >= 1 && value <= 8
}
