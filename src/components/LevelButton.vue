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
        'text-zinc-400 border-2 border-transparent  px-8 py-2 rounded-md',
        !active && 'bg-zinc-900 hover:bg-transparent hover:border-zinc-700',
        active && 'bg-zinc-800'
      )
    "
  >
    <slot />
  </button>
</template>
