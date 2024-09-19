<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import BoardIcon from './BoardIcon.vue'
import { onMounted, type Ref } from 'vue'
import FrameBase from './FrameBase.vue'
import { MOUSE_CLICK } from '@/enums/mouseClick'
import { twMerge } from 'tailwind-merge'
import { CELL_STATE } from '@/enums/cellState'
import bombGif from '@/assets/bomb_compressed.gif'
import explosionGif from '@/assets/explosion.gif'

const gameData = useGameStore()

const handleLongPress = (row: number, col: number) => {
  const cellValue = gameData.board[row][col]

  if (cellValue === CELL_STATE.FLAG) return gameData.handleCellClickDoubt({ row, column: col })

  if (cellValue === CELL_STATE.DOUBT) return gameData.handleCellClickDoubt({ row, column: col })

  gameData.handleCellClickFlag({ row, column: col })
}

let bombGifBlob: Blob | null = null

async function updateGifSrc(bombGifSrc: Ref<string>, changeGif?: boolean) {
  if (changeGif) {
    bombGifSrc.value = explosionGif
    return
  }

  if (bombGifBlob) {
    bombGifSrc.value = URL.createObjectURL(bombGifBlob)
    return
  }

  try {
    const response = await fetch(bombGif)
    if (!response.ok) return console.error('Falha ao buscar GIF')

    bombGifBlob = await response.blob()
    bombGifSrc.value = URL.createObjectURL(bombGifBlob)
  } catch (error) {
    console.error('Erro ao carregar o GIF:', error)
  }
}

const icon = {
  [MOUSE_CLICK.NUMBER]: '1️⃣',
  [MOUSE_CLICK.FLAG]: '🚩',
  [MOUSE_CLICK.DOUBT]: '❔'
}

const handleIconClick = () => {
  const mouseIcon = gameData.iconClick

  if (mouseIcon === MOUSE_CLICK.NUMBER) {
    gameData.iconClick = MOUSE_CLICK.FLAG
  }

  if (mouseIcon === MOUSE_CLICK.FLAG) {
    gameData.iconClick = MOUSE_CLICK.DOUBT
  }

  if (mouseIcon === MOUSE_CLICK.DOUBT) {
    gameData.iconClick = MOUSE_CLICK.NUMBER
  }
}

onMounted(() => {
  gameData.init()
})
</script>

<template>
  <div>
    <FrameBase class-name="rounded-b-none !pb-0">
      <div
        :class="
          twMerge(
            'h-12 w-12 md:h-16 md:w-16 border-2 border-gray-600 dark:border-zinc-700 mb-2 md:mb-3 flex items-center justify-center text-xl md:text-4xl cursor-pointer',
            gameData.iconClick === MOUSE_CLICK.DOUBT && 'brightness-50 dark:brightness-100'
          )
        "
        @click="handleIconClick"
      >
        {{ icon[gameData.iconClick] }}
      </div>
    </FrameBase>
    <FrameBase @contextmenu="(e) => e.preventDefault()" class-name="gap-1 rounded-t-none !pt-1">
      <div v-for="(row, rowIndex) in gameData.board" :key="rowIndex" class="flex gap-1 w-full">
        <div v-for="(item, columnIndex) in row" :key="rowIndex + '-' + columnIndex">
          <BoardIcon
            :item="item"
            :row="rowIndex"
            :column="columnIndex"
            :update-gif-src="updateGifSrc"
            v-long-press="() => handleLongPress(rowIndex, columnIndex)"
          />
        </div>
      </div>
    </FrameBase>
  </div>
</template>
