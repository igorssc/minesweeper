<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import BaseModal from './BaseModal.vue'

const gameData = useGameStore()

const handleRestartGame = () => {
  gameData.init()
}
</script>

<template>
  <BaseModal
    title="Deseja mesmo reiniciar?"
    button-text="Reiniciar"
    success-text="Reiniciar"
    :handle-success="handleRestartGame"
  >
    Reiniciar a partida irá zerar todo o andamento atual. Deseja mesmo prosseguir?
  </BaseModal>
</template>
