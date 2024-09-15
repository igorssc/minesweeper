<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import { ref, watch, onUnmounted } from 'vue'

const props = defineProps({
  isButton: {
    type: Boolean,
    default: false
  },
  visible: {
    type: Boolean,
    default: true
  },
  autoHide: {
    type: Boolean,
    default: false // Define se o tooltip fica visível ao mover o hover para ele
  }
})

const showTooltip = ref(false)
const isHovered = ref(false)
let hideTimeout: ReturnType<typeof setTimeout>

const showTooltipWithDelay = () => {
  if (!props.visible) return

  clearTimeout(hideTimeout)
  isHovered.value = true
  showTooltip.value = true
}

const hideTooltipWithDelay = () => {
  isHovered.value = false
  hideTimeout = setTimeout(() => {
    if (!isHovered.value) showTooltip.value = false
  }, 100) // Delay de 1 segundo antes de desaparecer
}

// Limpa o timeout ao desmontar o componente
onUnmounted(() => {
  clearTimeout(hideTimeout)
})

const keepTooltipVisible = () => {
  clearTimeout(hideTimeout)
  isHovered.value = true
}

const hideTooltipImmediately = () => {
  hideTimeout = setTimeout(() => {
    isHovered.value = false
    showTooltip.value = false
  }, 100)
}

// Verifica se o `autoHide` está habilitado
watch(isHovered, (newVal) => {
  if (!newVal && !props.autoHide) {
    showTooltip.value = false
  }
})
</script>

<template>
  <div class="relative flex justify-center items-center">
    <div
      @mouseover="showTooltipWithDelay"
      @mouseleave="hideTooltipWithDelay"
      :class="isButton && 'w-full [&_button]:w-full'"
    >
      <slot name="icon" />
    </div>

    <transition name="fade" mode="out-in">
      <div
        v-if="showTooltip"
        :class="
          twMerge(
            'absolute z-20 bottom-6 w-max max-w-56 p-2 text-xs bg-blue-900 dark:bg-cyan-900 text-white rounded shadow-lg',
            isButton && 'bottom-14'
          )
        "
        @mouseover="autoHide ? keepTooltipVisible() : null"
        @mouseleave="autoHide ? hideTooltipImmediately() : hideTooltipWithDelay"
      >
        <div
          class="absolute -bottom-2 z-10 left-1/2 rounded transform -translate-x-1/2 w-5 h-5 bg-blue-900 dark:bg-cyan-900 rotate-90"
        ></div>
        <span class="relative z-20">
          <slot name="information" />
        </span>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

div[class*='absolute'] > div:first-child {
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}
</style>
