import { LEVEL } from '@/enums/level'
import { defaultLevels } from '@/utils/defaultLevels'
import type { Ref } from 'vue'
import { type RouteLocationNormalizedLoadedGeneric, type Router } from 'vue-router'

type HandleLevelProps = {
  rows: Ref<number>
  columns: Ref<number>
  bombs: Ref<number>
  level: LEVEL
  currentLevel: Ref<LEVEL>
  init: () => void
  router: Router
  route: RouteLocationNormalizedLoadedGeneric
}

export const handleLevel = ({
  bombs,
  columns,
  rows,
  init,
  level,
  currentLevel,
  router,
  route
}: HandleLevelProps) => {
  const existingQuery = { ...route.query }

  const levelSelected = defaultLevels[level]

  currentLevel.value = level

  rows.value = levelSelected.rows
  columns.value = levelSelected.columns
  bombs.value = levelSelected.bombs

  router.replace({
    query: {
      ...existingQuery,
      level,
      ...(level !== LEVEL.CUSTOMIZE && { rows: undefined, columns: undefined, bombs: undefined })
    }
  })

  init()
}
