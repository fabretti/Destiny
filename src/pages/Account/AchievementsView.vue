<template>
  <WrapperBlock title="Достижения" class="achievements">
    <template #header>
      <div class="achievements-header">
        <CharacterSelector v-model="value" />
      </div>
    </template>
    <div class="achievements-content">
      <AchievementBlock v-for="achievement in achievements" :key="achievement.id" :item="achievement" />
    </div>
  </WrapperBlock>
</template>
<script setup lang="ts">
import WrapperBlock from '@/components/Blocks/WrapperBlock.vue'
import AchievementBlock from '@/components/Blocks/AchievementBlock.vue'
import CharacterSelector from '@/components/CharacterSelector.vue'
import { ref } from 'vue'

const value = ref('Ikonika23')

const achievements = [
  { id: 1, status: 'vip', name: 'ОКО ТИАТАМАРАНТЫ', quest: 'Выбейти ключи любого типа', count: '0 / 45', info: 'Награда за 45', items: [1, 2, 3, 4, 5] },
  { id: 2, status: 'ready', name: 'ОКО Титьки', quest: 'Выбейти ключи любого типа', count: '0 / 45', info: 'Награда за 45', items: [1, 2, 3, 4, 5] },
  { id: 3, status: '', name: 'ОКО Сраки', quest: 'Выбейти ключи любого типа', count: '0 / 2', info: 'Награда за 45', items: [1, 2, 3, 4, 5] },
]
</script>
<style lang="scss">
.achievements {
  .achievements-header {
    display: flex;
    align-items: center;
    justify-content: center;
  } 
  .achievements-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 20px;
  }
}
</style>
