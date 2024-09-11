<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import { twMerge } from 'tailwind-merge'
import bombGif from '@/assets/bomb.gif'
import { ref, watch } from 'vue'
import { CELL_STATE, type BoardItemProps } from '@/enums/cellState'

const gameData = useGameStore()

type ColorItem = {
  [key: number]: string
  default: string
}

const colorItem: ColorItem = {
  1: 'text-blue-500',
  2: 'text-green-500',
  3: 'text-red-500',
  4: 'text-pink-500',
  5: 'text-orange-500',
  6: 'text-purple-500',
  7: 'text-yellow-500',
  8: 'text-cyan-500',
  default: ''
}

const bombGifSrc = ref('')

function updateGifSrc() {
  bombGifSrc.value = `${bombGif}?t=${Date.now()}`
}

const props = defineProps<{
  item: BoardItemProps
}>()

watch(
  () => props.item,
  (newValue) => {
    if (newValue === 0) {
      updateGifSrc()
    }
  }
)
</script>

<template>
  <div
    :class="
      twMerge(
        'w-8 h-8 p-4 bg-zinc-900 flex justify-center items-center text-yellow-500 font-black',
        typeof item === 'number' && 'bg-zinc-900/15',
        colorItem[item ?? 'default'],
        !(gameData.isGameOver || gameData.isVictory) && 'cursor-pointer hover:bg-zinc-900'
      )
    "
  >
    <span v-if="item === CELL_STATE.EMPTY"></span>
    <span v-else-if="item === CELL_STATE.FLAG">🚩</span>
    <span v-else-if="item === CELL_STATE.BOMB"
      ><img :src="bombGifSrc" alt="Descrição do GIF" class="w-8 h-8 max-w-8"
    /></span>

    <span v-else>{{ item }}</span>
  </div>
</template>
