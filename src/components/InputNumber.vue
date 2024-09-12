<script setup lang="ts">
defineProps<{
  value: number
}>()

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex gap-8 justify-center">
    <label for="" class="text-gray-900 dark:text-zinc-400 self-center"><slot name="label" />:</label
    ><input
      type="number"
      class="shadow-lg bg-gray-100 dark:bg-zinc-800 px-4 rounded-s text-gray-900 dark:text-zinc-400"
      :value="value"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>
