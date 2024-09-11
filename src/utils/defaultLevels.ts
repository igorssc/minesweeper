import { LEVEL } from '@/enums/level'

export const defaultLevels = {
  [LEVEL.BEGINNER]: {
    label: 'Iniciante',
    rows: 10,
    columns: 10,
    bombs: 10
  },
  [LEVEL.INTERMEDIATE]: {
    label: 'Intermediário',
    rows: 16,
    columns: 16,
    bombs: 40
  },
  [LEVEL.EXPERT]: {
    label: 'Especialista',
    rows: 16,
    columns: 30,
    bombs: 100
  },
  [LEVEL.CUSTOMIZE]: {
    label: 'Personalizar',
    rows: 30,
    columns: 30,
    bombs: 150
  }
}
