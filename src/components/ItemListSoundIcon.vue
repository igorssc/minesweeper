<script setup lang="ts">
import { useGameStore } from '@/stores/game'

const gameData = useGameStore()

const handleSound = () => {
  gameData.hasSound = !gameData.hasSound
}
</script>

<template>
  <li class="text-gray-400 ml-auto">
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
