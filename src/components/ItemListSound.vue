<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import { onMounted } from 'vue'

const gameData = useGameStore()

const handleSound = () => {
  gameData.hasSound = !gameData.hasSound

  localStorage.setItem('hasSound', String(gameData.hasSound))
}

onMounted(() => {
  const prevSound = localStorage.getItem('hasSound')

  if (!prevSound) return

  if (prevSound !== 'true' && prevSound !== 'false') return

  gameData.hasSound = JSON.parse(prevSound)
})
</script>

<template>
  <li class="text-gray-900 hover:text-gray-600 dark:text-gray-400 hover:dark:text-gray-500 ml-auto">
    <v-icon
      v-if="gameData.hasSound"
      name="gi-sound-on"
      scale="1.5"
      class="cursor-pointer"
      @click="handleSound"
    />
    <v-icon v-else name="gi-sound-off" scale="1.5" class="cursor-pointer" @click="handleSound" />
  </li>
</template>
