<script setup lang="ts">
import { twMerge } from 'tailwind-merge'

defineProps<{
  active?: boolean
}>()
</script>

<template>
  <button
    :class="
      twMerge(
        'text-gray-900 dark:text-zinc-400 border-2 border-transparent  px-8 py-2 rounded-md',
        !active &&
          'shadow-lg bg-gray-200 dark:bg-zinc-900 hover:bg-gray-300 dark:hover:bg-transparent hover:border-gray-600 dark:hover:border-zinc-700',
        active && 'bg-transparent'
      )
    "
  >
    <slot />
  </button>
</template>
