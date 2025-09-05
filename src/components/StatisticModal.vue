<template>
  <DefaultModal v-model="isVisible" class="statistic-modal">
    <div class="statistic-modal__content">
      <h1 class="text-uppercase">Статистика</h1>
      <div class="statistic-hero">
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
      <div class="statistic-cards">
        <div v-for="item in statisticList" :key="item.id" class="statistic-card">
          <div class="text-body-10 color-white-light">Место #{{ item.place }}</div>
          <div class="statistic-card__num text-center">
            {{ item.value }} 
            <p v-if="item.type" class="text-body-12">{{ item.type }}</p>
          </div>
          <div class="text-body-12 text-center">{{ item.title }}</div>
          <img src="@/assets/img/statisticCircle.png" alt="circle" class="circle">
        </div>
      </div>
    </div>
  </DefaultModal>

</template>
<script setup lang="ts">
import DefaultModal from '@/components/Auth/DefaultModal.vue'
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
const statisticList = ref([
  { id: 1, place: 'Место #10', value: '1 000 000', title: 'Кинар заработано' },
  { id: 2, place: 'Место #1000', value: '3 789', title: 'Убито мобов' },
  { id: 3, place: 'Место #1000', value: '120', type: 'часов', title: 'Проведено времени в игре' },
  { id: 4, place: 'Место #1000', value: '10', type: 'игроков', title: 'Добавлены в ЧС' },
  { id: 4, place: 'Место #15', value: '33 899', title: 'Получено очков бездны' },
])
const isVisible = defineModel<boolean>()
</script>
<style lang="scss">
.statistic-modal {
  .statistic-modal__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 28px;
    .statistic-hero {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .statistic-cards {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 30px;
      .statistic-card {
        position: relative;
        height: 160px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        background: var(--color-primary);
        border-radius: 18px;
        padding: 15px;
        border: 1px solid rgba(179, 223, 244, 0.2196078431);
        background: rgba(30, 47, 68, 0.5019607843);
        .statistic-card__num {
          font-weight: 600;
          font-size: 22px;
          line-height: 100%;
          letter-spacing: 0.5px;
        }
        .circle {
          position: absolute;
          top: 0;
        }
      }
    }
  }
}
</style>