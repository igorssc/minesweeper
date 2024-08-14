<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import BoardIcon from './BoardIcon.vue'
import { onMounted } from 'vue'
import { formatTime } from '@/utils/formatTime'

const gameData = useGameStore()

const handleClick = (row: number, col: number, event: MouseEvent) => {
  event.preventDefault()

  if (event.button === 0) gameData.handleCellClick(row, col)
  if (event.button === 2) gameData.handleCellClickFlag(row, col)
}

onMounted(() => {
  gameData.init()
})
</script>

<template>
  <main
    class="bg-zinc-800 flex gap-2 flex-col justify-center items-center w-fit m-auto p-4 rounded-md"
  >
    <h2 class="text-zinc-400">Bombas: {{ gameData.bombs }}</h2>
    <p class="text-zinc-400">{{ formatTime(gameData.elapsedTime) }}</p>
    <button @click="gameData.init" class="bg-zinc-700 px-4 py-2 rounded-sm text-zinc-400 mb-2">
      Reiniciar
    </button>
    <div v-for="(row, rowIndex) in gameData.board" :key="rowIndex" class="flex gap-2">
      <div v-for="(item, itemIndex) in row" :key="rowIndex + '-' + itemIndex">
        <BoardIcon
          :item="item"
          @contextmenu="handleClick(rowIndex, itemIndex, $event)"
          @click="handleClick(rowIndex, itemIndex, $event)"
        />
      </div>
    </div>
  </main>
</template>
