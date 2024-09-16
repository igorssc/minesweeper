<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import { ref } from 'vue'
import VueModalityV3 from 'vue-modality-v3'
import 'vue-modality-v3/dist/style.css'
import ButtonComponent from './ButtonComponent.vue'

const modalRef = ref<{ open: () => void; hide: () => void } | null>(null)

const gameData = useGameStore()

const handleOpenModal = () => {
  modalRef.value?.open()
}

const handleHideModal = () => {
  modalRef.value?.hide()
}

const handleRestartGame = () => {
  handleHideModal()

  gameData.init()
}
</script>

<template>
  <ButtonComponent @click="handleOpenModal" class=""> Reiniciar </ButtonComponent>
  <vue-modality-v3
    ref="modalRef"
    centered
    title="Deseja mesmo reiniciar?"
    :hide-footer="true"
    width="600"
  >
    <div class="py-4 md:py-8">
      Reiniciar a partida irá zerar todo o andamento atual. Deseja mesmo prosseguir?
    </div>

    <div class="flex justify-end gap-4 mt-4">
      <ButtonComponent
        @click="handleHideModal"
        class-name="bg-transparent shadow-none hover:bg-transparent dark:hover:bg-gray-200/10 dark:hover:border-gray-200/20"
      >
        Cancelar
      </ButtonComponent>
      <ButtonComponent
        @click="handleRestartGame"
        class-name="dark:bg-gray-300 dark:text-gray-900 dark:hover:bg-gray-400 dark:hover:border-gray-400"
      >
        Reiniciar
      </ButtonComponent>
    </div>
  </vue-modality-v3>
</template>

<style>
.vue-modality-dialog {
  @apply bg-gray-300 dark:bg-zinc-700 text-gray-900 dark:text-gray-300 md:p-8 rounded-md shadow-lg !h-auto;
}

.vm-overlay {
  @apply z-[999999999999];
}

.vm-header {
  @apply text-gray-900 font-normal dark:text-gray-300;
}

.vm-close-btn {
  @apply dark:after:bg-gray-300 dark:before:bg-gray-300 top-4 md:top-9 md:right-9;
}

.vm-header-border {
  @apply border-zinc-400 dark:border-gray-500;
}
</style>
