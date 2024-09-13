<script setup lang="ts">
defineProps<{
  value: number
}>()

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex gap-8 justify-center max-2xl:justify-between max-md:text-sm">
    <label
      for=""
      class="max-2xl:w-40 max-md:w-20 max-sm:w-10 text-gray-900 dark:text-zinc-400 self-center"
      ><slot name="label" />:</label
    ><input
      type="number"
      class="shadow-lg max-2xl:flex-1 max-2xl:h-10 max-md:h-8 bg-gray-100 dark:bg-zinc-800 px-4 rounded text-gray-900 dark:text-zinc-400"
      :value="value"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>
