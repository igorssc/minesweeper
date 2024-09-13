<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDarkTheme = ref(false)

const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value
  document.documentElement.classList.toggle('dark', isDarkTheme.value)
  localStorage.setItem('theme', isDarkTheme.value ? 'dark' : 'light')
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')

  if (savedTheme) {
    isDarkTheme.value = savedTheme === 'dark'
  }

  if (!savedTheme) {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    isDarkTheme.value = prefersDarkScheme
  }

  document.documentElement.classList.toggle('dark', isDarkTheme.value)
})
</script>

<template>
  <div
    class="text-gray-900 hover:text-gray-600 dark:text-gray-400 hover:dark:text-gray-500 mr-auto"
  >
    <v-icon
      v-if="isDarkTheme"
      name="md-lightmode-outlined"
      scale="1.1"
      class="cursor-pointer"
      @click="toggleTheme"
    />
    <v-icon
      v-else
      name="md-darkmode-outlined"
      scale="1.1"
      class="cursor-pointer"
      @click="toggleTheme"
    />
  </div>
</template>
