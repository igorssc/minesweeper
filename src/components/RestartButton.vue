<script setup lang="ts">
import { useGameStore } from '@/stores/game'

const gameData = useGameStore()
</script>

<template>
  <button
    @click="gameData.init"
    class="bg-blue-900 hover:bg-blue-950 px-4 py-2 rounded-sm text-gray-300 font-medium"
  >
    Reiniciar
  </button>
</template>
