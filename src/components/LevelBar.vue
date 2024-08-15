<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import FrameBase from './FrameBase.vue'
import LevelButton from './LevelButton.vue'

const gameData = useGameStore()

const levels = {
  beginner: {
    label: 'Iniciante',
    rows: 10,
    columns: 10,
    bombs: 10
  },
  intermediate: {
    label: 'Intermediário',
    rows: 16,
    columns: 16,
    bombs: 40
  },
  expert: {
    label: 'Especialista',
    rows: 16,
    columns: 30,
    bombs: 100
  },
  customize: {
    label: 'Personalizar',
    rows: 30,
    columns: 30,
    bombs: 150
  }
}

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
