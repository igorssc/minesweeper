<script setup lang="ts">
defineProps<{
  value: number
}>()

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex gap-8 justify-center">
    <label for="" class="text-zinc-400 self-center"><slot name="label" />:</label
    ><input
      type="number"
      class="bg-zinc-800 px-4 rounded-s text-zinc-400"
      :value="value"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>
