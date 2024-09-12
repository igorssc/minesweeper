<script setup lang="ts">
import { useGameStore } from '@/stores/game'

const gameData = useGameStore()
</script>

<template>
  <button
    @click="gameData.init"
    class="bg-zinc-900 hover:bg-zinc-950 border-2 border-transparent px-4 py-2 rounded-sm text-zinc-400 font-medium hover:bg-transparent hover:border-zinc-700"
  >
    Reiniciar
  </button>
</template>
