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
  <h1 class="m-auto font-bleeding-cowboys text-7xl text-gray-400 py-16">Campo Minado</h1>
  <main
    class="bg-gray-800 border-2 border-gray-900 border-dashed bg-opacity-90 flex gap-2 flex-col justify-center items-center w-fit m-auto p-4 rounded-md"
  >
    <div class="flex items-center justify-around w-full">
      <h2 class="text-gray-400">Bombas: {{ gameData.bombs }}</h2>
      <p class="text-gray-400">{{ gameData.minimumClicks }}</p>
      <p class="text-gray-400">{{ formatTime(gameData.elapsedTime) }}</p>
      <button @click="gameData.init" class="bg-gray-700 px-4 py-2 rounded-sm text-gray-400 mb-2">
        Reiniciar
      </button>
    </div>
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
