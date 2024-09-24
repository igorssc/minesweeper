<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import ItemListToggle from './ItemListToggle.vue'
import TooltipComponent from './TooltipComponent.vue'
import InformationIcon from './InformationIcon.vue'
import BaseModal from './BaseModal.vue'

const gameData = useGameStore()

const handleCheckboxChange = () => {
  gameData.hasSafeStart = !gameData.hasSafeStart
  gameData.init()
}
</script>

<template>
  <li class="flex gap-2 justify-start items-center">
    <span class="md:font-medium text-gray-900 dark:text-gray-300 max-md:text-sm">
      Início Seguro
    </span>
    <BaseModal
      :title="gameData.hasSafeStart ? 'Desativar Início seguro' : 'Ativar Início seguro'"
      :success-text="gameData.hasSafeStart ? 'Desativar' : 'Ativar'"
      :handle-success="handleCheckboxChange"
    >
      <template #children>
        <ItemListToggle :is-checked="gameData.hasSafeStart" />
      </template>
      O "Início seguro" garante que a primeira jogada seja sempre por uma casa válida.
      {{
        gameData.hasSafeStart
          ? ' Desativar o "Início seguro" fará com que o jogo reinicie e irá zerar todo o andamento atual. '
          : ' Ativar o "Início seguro" fará com que o jogo reinicie e irá zerar todo o andamento atual. '
      }}
      Deseja mesmo prosseguir?
    </BaseModal>
    <span>
      <TooltipComponent :auto-hide="true">
        <template #icon>
          <InformationIcon />
        </template>
        <template #information>
          Iniciar o jogo sempre por uma casa válida, afim de evitar minas na primeira jogada.
        </template>
      </TooltipComponent>
    </span>
  </li>
</template>
