<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import { ref } from 'vue'

const gameData = useGameStore()

const isChecked = ref(gameData.hasSafeStart)

const handleCheckboxChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.checked

  isChecked.value = value

  gameData.hasSafeStart = value
  gameData.init()
}
</script>

<template>
  <li class="flex gap-2 justify-start items-center">
    <span class="font-medium text-gray-900 dark:text-gray-300"> <slot name="title" />: </span>
    <label class="relative inline-flex items-center cursor-pointer">
      <input
        class="sr-only peer"
        type="checkbox"
        v-model="isChecked"
        @change="handleCheckboxChange"
      />
      <div
        class="peer w-14 h-7 shadow-lg bg-gray-100 dark:bg-zinc-600 rounded-full outline-none duration-100 after:duration-500 relative after:content-['Não'] after:shadow-lg after:absolute after:outline-none after:rounded-full after:h-6 after:w-6 after:bg-gray-600 dark:after:bg-white after:top-[2px] after:left-[2px] after:flex after:justify-center after:items-center after:text-gray-100 dark:after:text-zinc-800 after:text-[10px] after:font-bold peer-checked:after:translate-x-7 peer-checked:after:content-['Sim'] peer-checked:after:border-white"
      />
    </label>
  </li>
</template>
