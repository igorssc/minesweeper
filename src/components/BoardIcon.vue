<script setup lang="ts">
import type { BoardItemProps } from '@/stores/game'
import { twMerge } from 'tailwind-merge'

type ColorItem = {
  [key: number]: string
  default: string
}

const colorItem: ColorItem = {
  1: 'text-blue-500',
  2: 'text-green-500',
  3: 'text-red-500',
  4: 'text-pink-500',
  5: 'text-orange-500',
  6: 'text-purple-500',
  7: 'text-yellow-500',
  8: 'text-cyan-500',
  default: ''
}

defineProps<{
  item: BoardItemProps
}>()
</script>

<template>
  <div
    :class="
      twMerge(
        'w-8 h-8 p-4 bg-gray-700 flex justify-center items-center text-yellow-500 font-black cursor-pointer hover:bg-gray-900',
        typeof item === 'number' && 'bg-gray-600',
        colorItem[item ?? 'default']
      )
    "
  >
    <span v-if="item === -1"></span>
    <span v-else-if="item === -2">🚩</span>
    <span v-else-if="item === 0">💣</span>
    <span v-else>{{ item }}</span>
  </div>
</template>
