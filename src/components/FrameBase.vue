<script setup lang="ts">
import { twMerge } from 'tailwind-merge'

defineProps<{
  className?: string
}>()
</script>

<template>
  <main
    :class="
      twMerge(
        'relative bg-gray-300 dark:bg-zinc-950 shadow-xl bg-opacity-90 flex gap-2 flex-col justify-center items-center h-fit p-3 md:p-4 rounded-md max-w-[calc(100vw-2rem)] overflow-x-auto',
        className
      )
    "
  >
    <slot />
  </main>
</template>
