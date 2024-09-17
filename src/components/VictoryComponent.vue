<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import { ref, watch } from 'vue'
import ConfettiExplosion from 'vue-confetti-explosion'

const gameData = useGameStore()

const showVictoryConfetti = ref(false)
const confettiLoops = ref([false, false, false, false])

const intervalIds = ref<number[]>([])

const loop = (index: number, time: number) => {
  const intervalId = setInterval(() => {
    intervalIds.value.push(intervalId)

    if (!gameData.isVictory) {
      confettiLoops.value[index] = false
      clearInterval(intervalId)
      return
    }

    confettiLoops.value[index] = false

    setTimeout(() => {
      confettiLoops.value[index] = true
    }, 100)
  }, time)
}

watch(
  () => gameData.isVictory,
  (isVictory) => {
    if (!isVictory) {
      showVictoryConfetti.value = false
      return
    }
    showVictoryConfetti.value = true
    setTimeout(() => {
      showVictoryConfetti.value = false
    }, 3000)
  },
  { immediate: true }
)

watch(
  () => gameData.isVictory,
  (isVictory) => {
    if (!isVictory) {
      confettiLoops.value = [false, false, false, false]

      intervalIds.value.forEach((intervalId) => clearInterval(intervalId))

      return
    }

    setTimeout(() => {
      loop(0, 1500)
      loop(1, 2000)
      loop(2, 2800)
      loop(3, 3500)
    }, 2000)
  },
  { immediate: true }
)
</script>

<template>
  <div class="h-full w-full">
    <div class="w-full flex justify-center flex-col items-center">
      <div class="w-full h-full flex justify-center items-center">
        <ConfettiExplosion :particleCount="20" :force="0.3" v-if="confettiLoops[0]" />
        <ConfettiExplosion :particleCount="30" :force="0.3" v-if="confettiLoops[1]" />
        <ConfettiExplosion :particleCount="40" :force="0.3" v-if="confettiLoops[2]" />
        <ConfettiExplosion :particleCount="50" :force="0.3" v-if="confettiLoops[3]" />
      </div>
      <slot />
      <div
        class="text-center dark:text-gray-400 text-md md:text-lg xl:text-2xl mt-16 md:mt-24 relative z-[9999999]"
        v-if="gameData.isVictory"
      >
        Parabéns!! Você ganhou!
      </div>
    </div>

    <div
      v-if="showVictoryConfetti"
      class="v-full h-full fixed inset-0 z-20 flex justify-center items-center"
    >
      <ConfettiExplosion :particleCount="200" :force="1" />
    </div>
  </div>
</template>
