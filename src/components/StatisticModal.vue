<template>
  <teleport to="body">
    <DefaultModal v-model="isVisible" class="statistic-modal">
      <div class="statistic-modal__content">
        <h1 class="text-uppercase">Статистика</h1>
        <div class="statistic-hero">
          <CharacterSelector v-model="value" />
        </div>
        <div class="statistic-tabs">
          <el-radio-group v-model="tabPosition" class="statistic-tabs__radio">
            <el-radio-button value="all">Всего</el-radio-button>
            <el-radio-button value="1day">За 1 день</el-radio-button>
            <el-radio-button value="3days">За 3 дня</el-radio-button>
            <el-radio-button value="7days">За 7 дней</el-radio-button>
          </el-radio-group>
          <el-scrollbar v-show="showAllBlock" height="350px" always>
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
          </el-scrollbar>
          <el-scrollbar v-show="showOneDayBlock" height="350px" always>
            Пусто
          </el-scrollbar>
        </div>
      </div>
    </DefaultModal>
  </teleport>
</template>
<script setup lang="ts">
import DefaultModal from '@/components/DefaultModal.vue'
import CharacterSelector from '@/components/CharacterSelector.vue'
import { ref, computed } from 'vue'

const value = ref('Ikonika23')
const tabPosition = ref('all')
const statisticList = ref([
  { id: 1, place: '10', value: '1 000 000', title: 'Кинар заработано' },
  { id: 2, place: '1000', value: '3 789', title: 'Убито мобов' },
  { id: 3, place: '1000', value: '120', type: 'часов', title: 'Проведено времени в игре' },
  { id: 4, place: '1000', value: '10', type: 'игроков', title: 'Добавлены в ЧС' },
  { id: 4, place: '15', value: '33 899', title: 'Получено очков бездны' },
  { id: 3, place: '1000', value: '120', type: 'часов', title: 'Проведено времени в игре' },
  { id: 4, place: '1000', value: '10', type: 'игроков', title: 'Добавлены в ЧС' },
  { id: 4, place: '15', value: '33 899', title: 'Получено очков бездны' },
  { id: 3, place: '1000', value: '120', type: 'часов', title: 'Проведено времени в игре' },
  { id: 4, place: '1000', value: '10', type: 'игроков', title: 'Добавлены в ЧС' },
  { id: 4, place: '15', value: '33 899', title: 'Получено очков бездны' },
])
const isVisible = defineModel<boolean>()

const showAllBlock = computed(() => tabPosition.value === 'all')
const showOneDayBlock = computed(() => tabPosition.value === '1day')
const showThreeDaysBlock = computed(() => tabPosition.value === '3days')
const showSevenDaysBlock = computed(() => tabPosition.value === '7days')   
</script>
<style lang="scss">
.el-dialog.statistic-modal {
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

    .statistic-tabs {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;

      .statistic-tabs__radio {
        margin-bottom: 26px;
      }

      :deep(.el-tabs__header) {
        margin: 0;
      }

      :deep(.el-tabs__nav-wrap) {
        padding: 0;
      }

      :deep(.el-tabs__item) {
        color: rgba(255, 255, 255, 0.6);
        font-size: 14px;
        font-weight: 500;

        &.is-active {
          color: #fff;
        }
      }

      :deep(.el-tabs__active-bar) {
        background-color: #fff;
      }
    }
    .el-scrollbar {
      width: 100%;
    }
    .statistic-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 30px;

      @include mq(laptop) {
        gap: 12px;
      }

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