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
import TooltipComponent from './TooltipComponent.vue'
import { computed } from 'vue'
import InformationIcon from './InformationIcon.vue'

const gameData = useGameStore()

const isEndGame = computed(() => gameData.isGameOver || gameData.isVictory)

const COUNT_TIPS = 5

const hasTip = computed(() => gameData.clicksTip >= COUNT_TIPS)
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
            <TooltipComponent :auto-hide="true">
              <template #icon>
                <InformationIcon />
              </template>
              <template #information>
                Quantidade total de bombas ({{ gameData.bombs }}), menos a quantidade de bandeiras
                adicionadas.
              </template>
            </TooltipComponent>
          </template>
        </ItemListText>
        <ItemListText>
          <template #title>Jogadas mínimas</template>
          <template #item>{{ gameData.minimumClicks }}</template>
          <template #tooltip>
            <TooltipComponent :auto-hide="true">
              <template #icon>
                <InformationIcon />
              </template>
              <template #information>
                Quantidade mínima de jogadas para vencer a partida.
              </template>
            </TooltipComponent>
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
            <TooltipComponent :auto-hide="true">
              <template #icon>
                <InformationIcon />
              </template>
              <template #information>
                Pode-se usar também o clique longo para adicionar as bandeiras.
              </template>
            </TooltipComponent>
          </template>
        </ItemListText>
        <ItemListText>
          <template #title>Aproveitamento</template>
          <template #item>{{ gameData.performanceMetric.toFixed(1) }}%</template>
        </ItemListText>
        <ItemListToggle>
          <template #title>Início Seguro</template>
          <template #tooltip>
            <TooltipComponent :auto-hide="true">
              <template #icon>
                <InformationIcon />
              </template>
              <template #information>
                Iniciar o jogo sempre por uma casa válida, afim de evitar minas na primeira jogada.
              </template>
            </TooltipComponent>
          </template>
        </ItemListToggle>
      </DataList>

      <TooltipComponent :auto-hide="true" isButton :visible="!hasTip">
        <template #icon>
          <ButtonComponent
            @click="gameData.handleTip"
            :emphasis="hasTip && !isEndGame"
            :disabled="!hasTip || isEndGame"
          >
            Dica 💡
          </ButtonComponent>
        </template>
        <template #information>
          Você pode acionar a dica a cada 5 jogadas. Faltam: {{ COUNT_TIPS - gameData.clicksTip }}
          jogadas.
        </template>
      </TooltipComponent>
      <ButtonComponent @click="gameData.init"> Reiniciar </ButtonComponent>
    </div>
  </FrameBase>
</template>
