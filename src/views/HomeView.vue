<script setup lang="ts">
import GameBoard from '@/components/GameBoard.vue'
import GameData from '@/components/GameData.vue'
import LevelBar from '@/components/LevelBar.vue'
import TitleGame from '@/components/TitleGame.vue'
import { useGameStore } from '@/stores/game'
import { ref, watch } from 'vue'
import ConfettiExplosion from 'vue-confetti-explosion'

const gameData = useGameStore()

const showVictoryMessage = ref(false)

watch(
  () => gameData.isVictory,
  (isVictory) => {
    if (!isVictory) {
      showVictoryMessage.value = false
      return
    }
    showVictoryMessage.value = true
    setTimeout(() => {
      showVictoryMessage.value = false
    }, 2000)
  },
  { immediate: true }
)
</script>

<template>
  <main
    class="bg-gray-200 dark:bg-zinc-900 min-h-screen h-full min-w-screen w-full flex flex-col items-center justify-center gap-16 py-16"
  >
    <TitleGame />
    <div
      v-if="showVictoryMessage"
      class="v-full h-full fixed inset-0 z-20 flex justify-center items-center"
    >
      <ConfettiExplosion :particleCount="200" :force="1" />
    </div>
    <div class="flex flex-col gap-6">
      <LevelBar />
      <div class="flex gap-6 justify-center max-2xl:items-center max-2xl:grid">
        <GameBoard class="max-2xl:order-2" />
        <GameData />
      </div>
    </div>
  </main>
</template>
