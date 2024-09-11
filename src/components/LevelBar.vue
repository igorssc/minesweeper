<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import FrameBase from './FrameBase.vue'
import LevelButton from './LevelButton.vue'
import { defaultLevels } from '@/utils/defaultLevels'

const gameData = useGameStore()

const levels = defaultLevels

const availableLevels = Object.keys(levels) as Array<keyof typeof levels>

const handleLevel = (level: keyof typeof levels) => {
  const levelSelected = levels[level]

  gameData.rows = levelSelected.rows
  gameData.columns = levelSelected.columns
  gameData.bombs = levelSelected.bombs

  gameData.init()
}
</script>

<template>
  <FrameBase>
    <div class="flex justify-around w-full">
      <LevelButton v-for="level in availableLevels" :key="level" @click="handleLevel(level)">
        {{ levels[level].label }}
      </LevelButton>
    </div>
  </FrameBase>
</template>
