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

const gameData = useGameStore()
</script>

<template>
  <FrameBase>
    <div class="flex flex-col gap-4 max-2xl:w-full">
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
        </ItemListText>
        <ItemListText>
          <template #title>Jogadas mínimas</template>
          <template #item>{{ gameData.minimumClicks }}</template>
        </ItemListText>
        <ItemListText>
          <template #title>Cliques (mouse esquerdo)</template>
          <template #item>{{ gameData.clicksCount.leftCursor }}</template>
        </ItemListText>
        <ItemListText>
          <template #title>Cliques (mouse direito)</template>
          <template #item>{{ gameData.clicksCount.rightCursor }}</template>
        </ItemListText>
        <ItemListText>
          <template #title>Aproveitamento</template>
          <template #item>{{ gameData.performanceMetric.toFixed(1) }}%</template>
        </ItemListText>
        <ItemListToggle>
          <template #title>Início Seguro</template>
        </ItemListToggle>
      </DataList>

      <ButtonComponent @click="gameData.init"> Reiniciar </ButtonComponent>
    </div>
  </FrameBase>
</template>
