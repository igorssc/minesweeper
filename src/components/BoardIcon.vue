<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import { twMerge } from 'tailwind-merge'
import bombGif from '@/assets/bomb_compressed.gif'
import { computed, onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue'
import { CELL_STATE, isNumberCell, type BoardItemProps } from '@/enums/cellState'
import { checkAvailableFieldsAround } from '@/common/checkAvailableFieldsAround'
import eventBus from '@/events/eventBus'

const gameData = useGameStore()

type ColorItem = {
  [key: number]: string
  default: string
}

const colorItem: ColorItem = {
  1: 'text-blue-500',
  2: 'text-green-500',
  3: 'text-purple-500',
  4: 'text-pink-500',
  5: 'text-orange-500',
  6: 'text-violet-500',
  7: 'text-yellow-500',
  8: 'text-cyan-500',
  default: ''
}

const bombGifSrc = ref('')

function updateGifSrc() {
  bombGifSrc.value = `${bombGif}?t=${Date.now()}`
}

const props = defineProps<{
  item: BoardItemProps
  row: number
  column: number
}>()

const availableFieldsAround = ref<{
  ceil: BoardItemProps
  ceilsAround: [number, number][]
  flagsAround: [number, number][]
}>({
  ceil: 0,
  ceilsAround: [],
  flagsAround: []
})

function updateAvailableFieldsAround() {
  availableFieldsAround.value = checkAvailableFieldsAround({
    boardDisplayed: { value: gameData.board } as Ref<BoardItemProps[][]>,
    numberColumns: { value: gameData.columns } as Ref<number>,
    numberRows: { value: gameData.rows } as Ref<number>,
    currentColumn: props.column,
    currentRow: props.row
  })
}

const handleClick = (row: number, col: number, event: MouseEvent) => {
  event.preventDefault()
  updateAvailableFieldsAround()

  if (gameData.isGameOver || gameData.isVictory) return

  if (event.button === 2) gameData.handleCellClickFlag({ row, column: col })
  if (event.button !== 0) return

  if (!availableFieldsAround.value.ceil) return gameData.handleCellClick({ row, column: col })

  handleOpenCellClick()
}

const handleOpenCellClick = () => {
  const currentCeil = availableFieldsAround.value.ceil
  const ceilsAround = availableFieldsAround.value.ceilsAround
  const flagsAround = availableFieldsAround.value.flagsAround

  if (ceilsAround.length <= 0) return

  if (!isNumberCell(currentCeil)) return

  console.log(flagsAround, currentCeil)

  if (flagsAround.length >= currentCeil) {
    const hasBombs = ceilsAround.find(
      ([row, column]) => gameData.baseBoard[row][column] === CELL_STATE.BOMB
    )

    if (hasBombs) {
      const [bombRow, bombColumn] = hasBombs
      gameData.handleCellClick({ row: bombRow, column: bombColumn })
      return
    }

    ceilsAround.forEach(([row, column]) => {
      gameData.handleCellClick({ row, column })
    })
    return
  }

  ceilsAround.forEach(([row, column]) => {
    eventBus.emit('vibrate', { row, column })
  })
}

function vibrateEffect() {
  const element = document.querySelector(`[data-row="${props.row}"][data-col="${props.column}"]`)

  if (!element) return

  element.classList.add('vibrate')

  setTimeout(() => {
    element.classList.remove('vibrate')
  }, 500)
}

function flagError() {
  const element = document.querySelector(`[data-row="${props.row}"][data-col="${props.column}"]`)

  if (!element) return

  element.classList.add('vibrate', 'flag-error')

  setTimeout(() => {
    element.classList.remove('vibrate')
  }, 500)
}

function tipEffect() {
  const element = document.querySelector(`[data-row="${props.row}"][data-col="${props.column}"]`)

  if (!element) return

  element.classList.add('tip')

  setTimeout(() => {
    element?.classList.remove('tip')
  }, 1500)
}

onMounted(() => {
  eventBus.on('vibrate', ({ row, column }) => {
    if (row === props.row && column === props.column) {
      vibrateEffect()
    }
  })

  eventBus.on('tip', ({ row, column }) => {
    if (row === props.row && column === props.column) {
      tipEffect()
    }
  })

  eventBus.on('flag-error', ({ row, column }) => {
    if (row === props.row && column === props.column) {
      flagError()
    }
  })
})

onBeforeUnmount(() => {
  eventBus.off('vibrate')
  eventBus.off('tip')
  eventBus.off('flag-error')
})

watch(
  () => gameData.board,
  () => {
    updateAvailableFieldsAround()
  },
  { deep: true }
)

watch(
  () => props.item,
  (newValue) => {
    if (newValue === 0) {
      updateGifSrc()
    }
  }
)

const isEndGame = computed(() => gameData.isGameOver || gameData.isVictory)

updateAvailableFieldsAround()
</script>

<template>
  <div
    @click="handleClick(row, column, $event)"
    @contextmenu="handleClick(row, column, $event)"
    :data-row="row"
    :data-col="column"
    :class="
      twMerge(
        'select-none w-8 h-8 p-4 bg-gray-600 dark:bg-zinc-700 flex justify-center items-center text-yellow-500 font-black',
        typeof item === 'number' && 'bg-zinc-200 dark:bg-zinc-900/15',
        colorItem[item ?? 'default'],
        !isEndGame && availableFieldsAround.ceilsAround.length > 0 && 'cursor-pointer',
        !(isEndGame || item) && 'cursor-pointer hover:bg-gray-400 dark:hover:bg-zinc-800'
      )
    "
  >
    <span v-if="item === CELL_STATE.EMPTY"></span>
    <span v-else-if="item === CELL_STATE.FLAG">🚩</span>
    <span v-else-if="item === CELL_STATE.BOMB"
      ><img :src="bombGifSrc" alt="Descrição do GIF" class="w-8 h-8 max-w-8"
    /></span>

    <span v-else>{{ item }}</span>
  </div>
</template>

<style lang="css" scoped>
.vibrate {
  animation: vibrate 0.8s ease-in-out;
}
.tip {
  animation: vibrate-tip 1.5s infinite linear;
  @apply !bg-purple-500 dark:!bg-purple-800 pointer-events-none;
}
.flag-error {
  @apply filter grayscale;
}

@keyframes vibrate {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(15deg);
  }
  50% {
    transform: rotate(0eg);
  }
  75% {
    transform: rotate(-15deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

@keyframes vibrate-tip {
  0% {
    transform: rotate(0deg);
    scale: 1;
  }
  25% {
    transform: rotate(15deg);
    scale: 1.1;
  }
  50% {
    transform: rotate(0deg);
    scale: 1;
  }
  75% {
    transform: rotate(-15deg);
    scale: 1.1;
  }
  100% {
    transform: rotate(0deg);
    scale: 1;
  }
}
</style>
