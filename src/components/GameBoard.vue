<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import BoardIcon from './BoardIcon.vue'
import { onMounted } from 'vue'
import FrameBase from './FrameBase.vue'
import { MOUSE_CLICK } from '@/enums/mouseClick'
import { twMerge } from 'tailwind-merge'
import { CELL_STATE } from '@/enums/cellState'

const gameData = useGameStore()

const handleLongPress = (row: number, col: number) => {
  const cellValue = gameData.board[row][col]

  if (cellValue === CELL_STATE.FLAG) return gameData.handleCellClickDoubt({ row, column: col })

  if (cellValue === CELL_STATE.DOUBT) return gameData.handleCellClickDoubt({ row, column: col })

  gameData.handleCellClickFlag({ row, column: col })
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
  <FrameBase @contextmenu="(e) => e.preventDefault()" class="!gap-1">
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
    <div v-for="(row, rowIndex) in gameData.board" :key="rowIndex" class="flex gap-1 w-full">
      <div v-for="(item, columnIndex) in row" :key="rowIndex + '-' + columnIndex">
        <BoardIcon
          :item="item"
          :row="rowIndex"
          :column="columnIndex"
          v-long-press="() => handleLongPress(rowIndex, columnIndex)"
        />
      </div>
    </div>
  </FrameBase>
</template>
