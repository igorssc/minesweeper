import mitt from 'mitt'

type Events = {
  vibrate: { row: number; column: number }
}

const eventBus = mitt<Events>()

export default eventBus
