<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import FrameBase from './FrameBase.vue'
import ButtonComponent from './ButtonComponent.vue'
import { defaultLevels } from '@/utils/defaultLevels'
import { isValidLevel, LEVEL } from '@/enums/level'
import { computed, onMounted } from 'vue'
import InputNumber from './InputNumber.vue'
import { useRoute, useRouter } from 'vue-router'
import BaseModal from './BaseModal.vue'

const gameData = useGameStore()
const route = useRoute()
const router = useRouter()

const existingQuery = { ...route.query }

const levels = defaultLevels

const availableLevels = LEVEL

const columns = computed({
  get: () => gameData.columns,
  set: (value) => (gameData.columns = value)
})

const rows = computed({
  get: () => gameData.rows,
  set: (value) => (gameData.rows = value)
})

const bombs = computed({
  get: () => gameData.bombs,
  set: (value) => (gameData.bombs = value)
})

const handleBoard = () => {
  gameData.rows = rows.value
  gameData.columns = columns.value

  const area = rows.value * columns.value
  const bombsSaved = bombs.value > area ? area : bombs.value

  gameData.bombs = bombsSaved

  router.replace({
    query: {
      ...existingQuery,
      level: LEVEL.CUSTOMIZE,
      rows: rows.value,
      columns: columns.value,
      bombs: bombsSaved
    }
  })

  gameData.init()
}

onMounted(() => {
  const prevLevel = String(route.query.level)

  if (!isValidLevel(prevLevel)) return

  gameData.handleLevel({
    level: prevLevel,
    route,
    router
  })
  gameData.init()

  if (prevLevel !== LEVEL.CUSTOMIZE) return

  const rowsQuery = route.query.rows
  const columnsQuery = route.query.columns
  const bombsQuery = route.query.bombs

  if (rowsQuery) gameData.rows = +rowsQuery
  if (columnsQuery) gameData.columns = +columnsQuery
  if (bombsQuery) gameData.bombs = +bombsQuery

  gameData.init()
})
</script>

<template>
  <FrameBase>
    <div class="flex justify-around w-full max-2xl:flex-col max-2xl:gap-4 max-md:gap-2">
      <BaseModal
        v-for="level in availableLevels"
        :key="level"
        title="Deseja mesmo reiniciar?"
        success-text="Continuar"
        :button-text="levels[level].label"
        :active-button="gameData.level === level"
        :disabled-button="gameData.level === level"
        :handle-success="() => gameData.handleLevel({ level, route, router })"
      >
        Mudar para o nível <b>{{ levels[level].label }}</b
        >, irá zerar todo o andamento atual. Deseja mesmo prosseguir?
      </BaseModal>
    </div>
  </FrameBase>
  <FrameBase v-if="gameData.level === LEVEL.CUSTOMIZE">
    <div
      class="flex justify-center items-stretch w-full max-2xl:flex-col gap-2 md:gap-4 2xl:gap-16"
    >
      <InputNumber :value="columns" @update:modelValue="($event) => (columns = +$event)">
        <template #label>Colunas</template>
      </InputNumber>
      <InputNumber :value="rows" @update:modelValue="($event) => (rows = +$event)">
        <template #label>Linhas</template>
      </InputNumber>
      <InputNumber :value="bombs" @update:modelValue="($event) => (bombs = +$event)">
        <template #label>Bombas</template>
      </InputNumber>
      <ButtonComponent @click="handleBoard"> Alterar </ButtonComponent>
    </div>
  </FrameBase>
</template>
