import mitt from 'mitt'

type Events = {
  vibrate: { row: number; column: number }
  tip: { row: number; column: number }
  'flag-error': { row: number; column: number }
  connection: boolean
}

let eventBus = mitt<Events>()

function reconnectEventBus() {
  console.warn('Reconectando o event bus...')
  eventBus = mitt<Events>()
}

function monitorEventBus() {
  let lastEventTime = Date.now()

  setInterval(() => {
    const currentTime = Date.now()

    // Verifica se houve eventos nos últimos 20 segundos
    if (currentTime - lastEventTime > 20000) {
      reconnectEventBus()
      lastEventTime = currentTime
      return
    }

    eventBus.emit('connection', true)
  }, 10000) // Verifica a cada 10 segundos

  // Sempre que o event bus emitir algum evento, atualize o último tempo
  eventBus.on('*', () => {
    lastEventTime = Date.now()
  })
}

export default eventBus
export { reconnectEventBus, monitorEventBus }
