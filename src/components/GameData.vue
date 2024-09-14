<script setup lang="ts">
import FrameBase from './FrameBase.vue'
import { useGameStore } from '@/stores/game'
import { formatTime } from '@/utils/formatTime'
import ItemListText from './ItemListText.vue'
import DataList from './DataList.vue'
import ItemListToggle from './ItemListToggle.vue'
import ItemListSound from './ItemListSound.vue'
import ItemListTheme from './ItemListTheme.vue'
import ButtonComponent from './ButtonComponent.vue'
import TooltipIcon from './TooltipIcon.vue'
import { computed } from 'vue'

const gameData = useGameStore()

const isEndGame = computed(() => gameData.isGameOver || gameData.isVictory)

const hasTip = computed(() => gameData.clicksTip >= 5)
</script>

<template>
  <FrameBase class="overflow-x-visible">
    <div class="flex flex-col gap-2 md:gap-4 max-2xl:w-full">
      <DataList class="max-2xl:flex-col">
        <div class="flex justify-between items-center">
          <ItemListTheme />
          <ItemListSound />
        </div>
        <ItemListText>
          <template #title>Tempo</template>
          <template #item>{{ formatTime(gameData.elapsedTime) }}</template>
        </ItemListText>
        <ItemListText>
          <template #title>Bombas</template>
          <template #item>{{ gameData.bombsDisplayed }}</template>
          <template #tooltip>
            <TooltipIcon :auto-hide="true">
              Quantidade total de bombas ({{ gameData.bombs }}), menos a quantidade de bandeiras
              adicionadas.
            </TooltipIcon>
          </template>
        </ItemListText>
        <ItemListText>
          <template #title>Jogadas mínimas</template>
          <template #item>{{ gameData.minimumClicks }}</template>
          <template #tooltip>
            <TooltipIcon :auto-hide="true">
              Quantidade mínima de jogadas para vencer a partida.
            </TooltipIcon>
          </template>
        </ItemListText>
        <ItemListText>
          <template #title>Cliques (mouse esquerdo)</template>
          <template #item>{{ gameData.clicksCount.leftCursor }}</template>
        </ItemListText>
        <ItemListText>
          <template #title>Cliques (mouse direito)</template>
          <template #item>{{ gameData.clicksCount.rightCursor }}</template>
          <template #tooltip>
            <TooltipIcon :auto-hide="true">
              Pode-se usar também o clique longo para adicionar as bandeiras.
            </TooltipIcon>
          </template>
        </ItemListText>
        <ItemListText>
          <template #title>Aproveitamento</template>
          <template #item>{{ gameData.performanceMetric.toFixed(1) }}%</template>
        </ItemListText>
        <ItemListToggle>
          <template #title>Início Seguro</template>
          <template #tooltip>
            <TooltipIcon :auto-hide="true">
              Iniciar o jogo sempre por uma casa válida, afim de evitar minas na primeira jogada.
            </TooltipIcon>
          </template>
        </ItemListToggle>
      </DataList>

      <ButtonComponent
        @click="gameData.handleTip"
        :emphasis="hasTip && !isEndGame"
        :disabled="!hasTip || isEndGame"
      >
        Dica 💡
      </ButtonComponent>
      <ButtonComponent @click="gameData.init"> Reiniciar </ButtonComponent>
    </div>
  </FrameBase>
</template>
