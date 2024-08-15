<script setup lang="ts">
import GameBoard from '@/components/GameBoard.vue'
import GameData from '@/components/GameData.vue'
import LevelBar from '@/components/LevelBar.vue'
import TitleGame from '@/components/TitleGame.vue'
import { useGameStore } from '@/stores/game'
import ConfettiExplosion from 'vue-confetti-explosion'

const gameData = useGameStore()
</script>

<template>
  <main
    class="bg-blue-950/70 min-h-screen h-full min-w-screen w-full flex flex-col items-center justify-center gap-16 py-16 overflow-y-hidden"
  >
    <TitleGame />
    <div class="flex flex-col gap-6">
      <LevelBar />
      <div class="flex gap-6 max-2xl:flex-col-reverse max-2xl:justify-center max-2xl:items-center">
        <GameBoard />
        <ConfettiExplosion :particleCount="200" :force="1" v-if="gameData.isVictory" />
        <GameData />
      </div>
    </div>
  </main>
</template>
