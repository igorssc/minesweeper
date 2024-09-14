<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import BoardIcon from './BoardIcon.vue'
import { onMounted } from 'vue'
import FrameBase from './FrameBase.vue'
const gameData = useGameStore()

const handleLongPress = (row: number, col: number) => {
  gameData.handleCellClickFlag({ row, column: col })
}

onMounted(() => {
  gameData.init()
})
</script>

<template>
  <FrameBase @contextmenu="(e) => e.preventDefault()" class="!gap-1">
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
