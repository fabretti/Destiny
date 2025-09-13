<template>
  <WrapperBlock title="Достижения" class="achievements">
    <div class="achievements-header">
      <div class="text-body-18">Персонаж</div>
      <el-select v-model="value" style="width: 180px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="achievements-content">
      <AchievementBlock v-for="achievement in achievements" :key="achievement.id" :item="achievement" />
    </div>
  </WrapperBlock>
</template>
<script setup lang="ts">
import WrapperBlock from '@/components/Blocks/WrapperBlock.vue'
import AchievementBlock from '@/components/Blocks/AchievementBlock.vue'
import { ref } from 'vue'

const value = ref('Ikonika23')

const options = [
  {
    value: 'Ikonika23',
    label: 'Ikonika23',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]

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
    gap: 10px;
    margin-bottom: 20px;
  }
  .achievements-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }
}
</style>
