<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import FrameBase from './FrameBase.vue'
import LevelButton from './LevelButton.vue'
import { defaultLevels } from '@/utils/defaultLevels'
import { LEVEL } from '@/enums/level'

const gameData = useGameStore()

const levels = defaultLevels

const availableLevels = LEVEL
</script>

<template>
  <FrameBase>
    <div class="flex justify-around w-full">
      <LevelButton
        v-for="level in availableLevels"
        :key="level"
        @click="gameData.handleLevel(level)"
        :active="gameData.level === level"
      >
        {{ levels[level].label }}
      </LevelButton>
    </div>
  </FrameBase>
</template>
