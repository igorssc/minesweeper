<script setup lang="ts">
import { twMerge } from 'tailwind-merge'

defineProps<{
  active?: boolean
  disabled?: boolean
  emphasis?: boolean
}>()
</script>

<template>
  <button
    :class="
      twMerge(
        'text-gray-900 dark:text-zinc-400 border-2 border-transparent  px-8 py-1 md:py-2 rounded max-md:text-sm',
        !active && 'shadow-lg bg-gray-200 dark:bg-zinc-700',
        !active &&
          !disabled &&
          'hover:bg-gray-300 dark:hover:bg-transparent hover:border-gray-600 dark:hover:border-zinc-700',
        active && 'bg-transparent',
        !disabled && emphasis && 'blink !shadow-purple-600/50 dark:!shadow-purple-700/50',
        disabled && 'cursor-not-allowed'
      )
    "
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style lang="css" scoped>
@keyframes blink {
  0% {
    box-shadow: 0 0 0.2rem 0.1rem rgb(126 34 206 / 0.4);
  }
  50% {
    box-shadow: 0 0 0.2rem 0.2rem rgb(126 34 206 / 0.6);
  }
  100% {
    box-shadow: 0 0 0.2rem 0.1rem rgb(126 34 206 / 0.4);
  }
}

.blink {
  animation: blink 2s ease-in-out infinite;
}
</style>
