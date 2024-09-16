<script setup lang="ts">
import GameBoard from '@/components/GameBoard.vue'
import GameData from '@/components/GameData.vue'
import LevelBar from '@/components/LevelBar.vue'
import TitleGame from '@/components/TitleGame.vue'
import VictoryComponent from '@/components/VictoryComponent.vue'
</script>

<template>
  <main
    class="bg-gray-200 dark:bg-zinc-900 min-h-screen h-full min-w-screen w-full flex flex-col items-center justify-center pb-16"
  >
    <div class="overflow-hidden w-full py-16 max-md:pb-8 flex justify-center">
      <VictoryComponent>
        <TitleGame />
      </VictoryComponent>
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
