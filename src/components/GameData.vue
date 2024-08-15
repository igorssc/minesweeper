<script setup lang="ts">
import FrameBase from './FrameBase.vue'
import { useGameStore } from '@/stores/game'
import { formatTime } from '@/utils/formatTime'
import ItemList from './ItemList.vue'
import DataList from './DataList.vue'
import RestartButton from './RestartButton.vue'

const gameData = useGameStore()
</script>

<template>
  <FrameBase>
    <div class="flex flex-col gap-4">
      <DataList>
        <ItemList>
          <template #title>Tempo</template>
          <template #item>{{ formatTime(gameData.elapsedTime) }}</template>
        </ItemList>
        <ItemList>
          <template #title>Bombas</template>
          <template #item>{{ gameData.bombsDisplayed }}</template>
        </ItemList>
        <ItemList>
          <template #title>Jogadas mínimas</template>
          <template #item>{{ gameData.minimumClicks }}</template>
        </ItemList>
        <ItemList>
          <template #title>Cliques (mouse esquerdo)</template>
          <template #item>{{ gameData.clicksCount.leftCursor }}</template>
        </ItemList>
        <ItemList>
          <template #title>Cliques (mouse direito)</template>
          <template #item>{{ gameData.clicksCount.rightCursor }}</template>
        </ItemList>
      </DataList>

      <RestartButton />
    </div>
  </FrameBase>
</template>
