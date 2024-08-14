export const formatTime = (seconds: number): string => {
  if (seconds < 0) {
    throw new Error('O número de segundos deve ser maior ou igual a zero.')
  }

  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  const formatDays = (days: number): string => (days > 0 ? `${days}d` : '')
  const formatHours = (hours: number): string => (hours > 0 ? `${hours}h` : '')
  const formatMinutes = (minutes: number): string => (minutes > 0 ? `${minutes}min` : '')
  const formatSeconds = (seconds: number): string =>
    seconds > 0 || (days === 0 && hours === 0 && minutes === 0) ? `${seconds}s` : ''

  const daysString = formatDays(days)
  const hoursString = formatHours(hours)
  const minutesString = formatMinutes(minutes)
  const secondsString = formatSeconds(remainingSeconds)

  return [daysString, hoursString, minutesString, secondsString].filter(Boolean).join(' ')
}
