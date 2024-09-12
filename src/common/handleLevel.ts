import type { LEVEL } from '@/enums/level'
import { defaultLevels } from '@/utils/defaultLevels'
import type { Ref } from 'vue'

type HandleLevelProps = {
  rows: Ref<number>
  columns: Ref<number>
  bombs: Ref<number>
  level: LEVEL
  currentLevel: Ref<LEVEL>
  init: () => void
}

export const handleLevel = ({
  bombs,
  columns,
  rows,
  init,
  level,
  currentLevel
}: HandleLevelProps) => {
  const levelSelected = defaultLevels[level]

  currentLevel.value = level

  rows.value = levelSelected.rows
  columns.value = levelSelected.columns
  bombs.value = levelSelected.bombs

  init()
}
