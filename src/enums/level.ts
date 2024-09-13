export enum LEVEL {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  EXPERT = 'expert',
  CUSTOMIZE = 'customize'
}

export function isValidLevel(value: string): value is LEVEL {
  return Object.values(LEVEL).includes(value as LEVEL)
}
