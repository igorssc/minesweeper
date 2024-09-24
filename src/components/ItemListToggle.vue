<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  isChecked: boolean
  handleChange?: (event: Event) => void
}>()

const checked = ref(props.isChecked)

const handleChangeFunction = (event: Event) => {
  event.preventDefault()

  if (props.handleChange) return props.handleChange(event)

  if (checked.value !== props.isChecked) return (checked.value = !checked.value)

  return
}

watch(
  () => props.isChecked,
  () => {
    checked.value = props.isChecked
  }
)
</script>

<template>
  <label class="relative inline-flex items-center cursor-pointer">
    <input class="sr-only peer" type="checkbox" v-model="checked" @change="handleChangeFunction" />
    <div
      class="peer w-14 h-7 shadow-lg bg-gray-100 dark:bg-zinc-700 rounded-full outline-none duration-100 after:duration-500 relative after:content-['Não'] after:shadow-lg after:absolute after:outline-none after:rounded-full after:h-6 after:w-6 after:bg-gray-600 dark:after:bg-white after:top-[2px] after:left-[2px] after:flex after:justify-center after:items-center after:text-gray-100 dark:after:text-zinc-800 after:text-[10px] after:font-bold peer-checked:after:translate-x-7 peer-checked:after:content-['Sim'] peer-checked:after:border-white max-md:after:-left-[1.1rem] max-md:peer-checked:after:translate-x-10 max-md:w-10 max-md:h-5 max-md:after:text-[6px] max-md:after:h-[14px] max-md:after:w-[14px] max-md:after:translate-x-5"
    />
  </label>
</template>
