<script setup lang="ts">
import FrameBase from './FrameBase.vue'
import { useGameStore } from '@/stores/game'
import { formatTime } from '@/utils/formatTime'
import ItemListText from './ItemListText.vue'
import DataList from './DataList.vue'
import RestartButton from './RestartButton.vue'
import ItemListToggle from './ItemListToggle.vue'
import ItemListSoundIcon from './ItemListSoundIcon.vue'

const gameData = useGameStore()
</script>

<template>
  <FrameBase>
    <div class="flex flex-col gap-4">
      <DataList>
        <ItemListSoundIcon />
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

      <RestartButton />
    </div>
  </FrameBase>
</template>
