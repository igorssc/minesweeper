<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import FrameBase from './FrameBase.vue'
import LevelButton from './LevelButton.vue'
import { defaultLevels } from '@/utils/defaultLevels'
import { LEVEL } from '@/enums/level'
import { computed } from 'vue'
import InputNumber from './InputNumber.vue'

const gameData = useGameStore()

const levels = defaultLevels

const availableLevels = LEVEL

const columns = computed({
  get: () => gameData.columns,
  set: (value) => (gameData.columns = value)
})

const rows = computed({
  get: () => gameData.rows,
  set: (value) => (gameData.rows = value)
})

const bombs = computed({
  get: () => gameData.bombs,
  set: (value) => (gameData.bombs = value)
})

const handleBoard = () => {
  gameData.rows = rows.value
  gameData.columns = columns.value

  const area = rows.value * columns.value
  gameData.bombs = bombs.value > area ? area : bombs.value

  gameData.init()
}
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
  <FrameBase v-if="gameData.level === LEVEL.CUSTOMIZE">
    <div class="flex justify-center items-stretch gap-16">
      <InputNumber :value="columns" @update:modelValue="($event) => (columns = $event)">
        <template #label>Colunas</template>
      </InputNumber>
      <InputNumber :value="rows" @update:modelValue="($event) => (rows = $event)">
        <template #label>Linhas</template>
      </InputNumber>
      <InputNumber :value="bombs" @update:modelValue="($event) => (bombs = $event)">
        <template #label>Bombas</template>
      </InputNumber>
      <button
        @click="handleBoard"
        class="bg-zinc-900 hover:bg-zinc-950 border-2 border-transparent px-4 py-2 rounded-sm text-zinc-400 font-medium hover:bg-transparent hover:border-zinc-700"
      >
        Alterar
      </button>
    </div>
  </FrameBase>
</template>
