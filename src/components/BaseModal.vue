<script setup lang="ts">
import { ref } from 'vue'
import VueModalityV3 from 'vue-modality-v3'
import 'vue-modality-v3/dist/style.css'
import ButtonComponent from './ButtonComponent.vue'

const props = defineProps<{
  title: string
  buttonText?: string
  successText: string
  activeButton?: boolean
  disabledButton?: boolean
  handleSuccess: () => void
}>()

const modalRef = ref<{ open: () => void; hide: () => void } | null>(null)

const handleOpenModal = () => {
  modalRef.value?.open()
}

const handleHideModal = () => {
  modalRef.value?.hide()
}

const handleSuccessButton = () => {
  handleHideModal()

  props.handleSuccess()
}
</script>

<template>
  <ButtonComponent
    @click="handleOpenModal"
    :active="activeButton"
    :className="disabledButton ? 'pointer-events-none' : ''"
    v-if="!!buttonText"
  >
    {{ buttonText }}
  </ButtonComponent>

  <span v-if="!buttonText" @click="handleOpenModal">
    <slot name="children" />
  </span>

  <vue-modality-v3 ref="modalRef" centered :title="title" :hide-footer="true" width="600">
    <div class="py-4 md:py-8 max-w-[600px]">
      <slot />
    </div>

    <div class="flex justify-end gap-4 mt-4">
      <ButtonComponent
        @click="handleHideModal"
        class-name="
            bg-transparent shadow-none hover:bg-transparent dark:hover:bg-gray-200/10 dark:hover:border-gray-200/20
            
        "
      >
        Cancelar
      </ButtonComponent>
      <ButtonComponent
        @click="handleSuccessButton"
        class-name="dark:bg-gray-300 dark:text-gray-900 dark:hover:bg-gray-400 dark:hover:border-gray-400
         
        "
      >
        {{ successText }}
      </ButtonComponent>
    </div>
  </vue-modality-v3>
</template>

<style>
.vue-modality-dialog {
  @apply bg-gray-300 bg-gradient-to-tr from-gray-300 via-blue-500/10 to-gray-300 dark:from-gray-900 dark:via-cyan-950 dark:to-gray-900 text-gray-900 dark:text-gray-300 md:p-8 rounded-md shadow-lg !h-auto;
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
