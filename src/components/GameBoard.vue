<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import BoardIcon from './BoardIcon.vue'
import { onMounted } from 'vue'
import FrameBase from './FrameBase.vue'
const gameData = useGameStore()

const handleClick = (row: number, col: number, event: MouseEvent) => {
  event.preventDefault()

  if (event.button === 0) gameData.handleCellClick({ row, column: col })
  if (event.button === 2) gameData.handleCellClickFlag({ row, column: col })
}

const handleLongPress = (row: number, col: number) => {
  gameData.handleCellClickFlag({ row, column: col })
}

onMounted(() => {
  gameData.init()
})
</script>

<template>
  <FrameBase @contextmenu="(e) => e.preventDefault()" class="gap-1">
    <div v-for="(row, rowIndex) in gameData.board" :key="rowIndex" class="flex gap-1 w-full">
      <div
        v-for="(item, itemIndex) in row"
        :key="rowIndex + '-' + itemIndex"
        @click="handleClick(rowIndex, itemIndex, $event)"
        @contextmenu="handleClick(rowIndex, itemIndex, $event)"
      >
        <BoardIcon :item="item" v-long-press="() => handleLongPress(rowIndex, itemIndex)" />
      </div>
    </div>
  </FrameBase>
</template>
