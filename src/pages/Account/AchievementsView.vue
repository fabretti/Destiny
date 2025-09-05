<template>
  <WrapperBlock title="Достижения" class="achievements">
    <div class="achievements-content">
      <AchievementBlock v-for="achievement in achievements" :key="achievement.id" :item="achievement" />
    </div>
  </WrapperBlock>
</template>
<script setup lang="ts">
import WrapperBlock from '@/components/WrapperBlock.vue'
import AchievementBlock from '@/components/AchievementBlock.vue'

const achievements = [
  { id: 1, status: 'vip', name: 'ОКО ТИАТАМАРАНТЫ', quest: 'Выбейти ключи любого типа', count: '0 / 45', info: 'Награда за 45', items: [1, 2, 3, 4, 5] },
  { id: 2, status: 'ready', name: 'ОКО Титьки', quest: 'Выбейти ключи любого типа', count: '0 / 45', info: 'Награда за 45', items: [1, 2, 3, 4, 5] },
  { id: 3, status: '', name: 'ОКО Сраки', quest: 'Выбейти ключи любого типа', count: '0 / 2', info: 'Награда за 45', items: [1, 2, 3, 4, 5] },
]
</script>
<style lang="scss">
.achievements {
  .achievements-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }
}
</style>
