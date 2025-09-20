<template>
  <teleport to="body">
    <DefaultModal v-model="isVisible" class="statistic-modal">
      <div class="statistic-modal__content">
        <h1 class="text-uppercase">Статистика</h1>
        <div class="statistic-hero">
          <CharacterSelector v-model:selected-character="selectedCharacter" :characters="characters" @change="loadStatistics(selectedCharacter)"  />
        </div>
        <div class="statistic-tabs">
          <!-- <el-radio-group v-model="tabPosition" class="statistic-tabs__radio">
            <el-radio-button value="all">Всего</el-radio-button>
            <el-radio-button value="1day">За 1 день</el-radio-button>
            <el-radio-button value="3days">За 3 дня</el-radio-button>
            <el-radio-button value="7days">За 7 дней</el-radio-button>
          </el-radio-group> -->
          <el-scrollbar v-if="!isLoading && !isStatisticsBlocked" height="350px" always>
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
          <el-skeleton v-else animated>
            <template #template>
              <div class="statistic-cards">
                <el-skeleton-item v-for="i in 8" :key="i" variant="p" style="width: 100%; height:160px;" />
              </div>
            </template>
          </el-skeleton>
          <!-- Остальные периоды пока пустые -->
          <!-- <el-scrollbar v-show="showOneDayBlock && !isLoading && !isStatisticsBlocked" height="350px" always>
            <div class="statistic-empty">
              <p class="text-body-12">Статистика за 1 день пока недоступна</p>
            </div>
          </el-scrollbar>
          
          <el-scrollbar v-show="showThreeDaysBlock && !isLoading && !isStatisticsBlocked" height="350px" always>
            <div class="statistic-empty">
              <p class="text-body-12">Статистика за 3 дня пока недоступна</p>
            </div>
          </el-scrollbar>
          
          <el-scrollbar v-show="showSevenDaysBlock && !isLoading && !isStatisticsBlocked" height="350px" always>
            <div class="statistic-empty">
              <p class="text-body-12">Статистика за 7 дней пока недоступна</p>
            </div>
          </el-scrollbar> -->
        </div>
        
        <div v-if="isStatisticsBlocked" class="statistic-blur-overlay">
          <div class="statistic-blocked">
            <div class="statistic-blocked__content">
              <h2 class="text-uppercase">Статистика заблокирована</h2>
              <p class="text-body-16 text-center">Доступ к статистике временно ограничен</p>
            </div>
          </div>
        </div>
      </div>
    </DefaultModal>
  </teleport>
</template>
<script setup lang="ts">
import DefaultModal from '@/components/DefaultModal.vue'
import CharacterSelector from '@/components/CharacterSelector.vue'
import { ref, computed, watch, onMounted } from 'vue'
import { useLkStore } from '@/stores/LkStore'
import { formatNumber } from '@/utils/formatters'
import type { ICharacter } from '@/stores/types/LkStoreTypes'

interface Props {
  characters: ICharacter[]
}

const props = defineProps<Props>()
const lkStore = useLkStore()

const selectedCharacter = ref('')
const tabPosition = ref('all')
const isLoading = ref(false)
const isStatisticsBlocked = ref(false)
const isVisible = defineModel<boolean>({ default: false })

const showOneDayBlock = computed(() => tabPosition.value === '1day')
const showThreeDaysBlock = computed(() => tabPosition.value === '3days')
const showSevenDaysBlock = computed(() => tabPosition.value === '7days')

// Преобразование данных статистики в формат для отображения
const statisticList = computed(() => {
  if (!lkStore.statistics) return []
  
  const stats = lkStore.statistics
  console.log(stats)
  return [
    { 
      id: 1, 
      place: stats.total_kinah_pos.toString(), 
      value: formatNumber(stats.total_kinah), 
      title: 'Кинар заработано' 
    },
    { 
      id: 2, 
      place: stats.npc_kill_pos.toString(), 
      value: formatNumber(stats.npc_kill), 
      title: 'Убито мобов' 
    },
    { 
      id: 3, 
      place: stats.play_time_pos.toString(), 
      value: formatNumber(stats.play_time), 
      type: 'часов', 
      title: 'Проведено времени в игре' 
    },
    { 
      id: 4, 
      place: stats.block_count_pos.toString(), 
      value: formatNumber(stats.block_count), 
      type: 'игроков', 
      title: 'Добавлены в ЧС' 
    },
    { 
      id: 5, 
      place: stats.total_ap_pos.toString(), 
      value: formatNumber(stats.total_ap), 
      title: 'Получено очков бездны' 
    },
    { 
      id: 6, 
      place: stats.total_gp_pos.toString(), 
      value: formatNumber(stats.total_gp), 
      title: 'Получено очков славы' 
    },
    { 
      id: 7, 
      place: stats.boss_kill_pos.toString(), 
      value: formatNumber(stats.boss_kill), 
      title: 'Убито боссов' 
    },
    { 
      id: 8, 
      place: stats.players_damage_pos.toString(), 
      value: formatNumber(stats.players_damage), 
      title: 'Урон по игрокам' 
    },
    { 
      id: 9, 
      place: stats.npc_damage_pos.toString(), 
      value: formatNumber(stats.npc_damage), 
      title: 'Урон по мобам' 
    },
    { 
      id: 10, 
      place: stats.lfg_message_pos.toString(), 
      value: formatNumber(stats.lfg_message), 
      title: 'Сообщений в ЛФГ' 
    }
  ]
})

// Загрузка статистики
const loadStatistics = async (charId: string) => {
  if (!charId) return
  
  isLoading.value = true
  isStatisticsBlocked.value = false
  
  try {
    const stats = await lkStore.getStatistics(charId)
    console.log('statistic', stats)
  } catch (error: any) {
    console.error('Ошибка загрузки статистики:', error)
    if (error.response?.status === 403) {
      isStatisticsBlocked.value = true
    }
  } finally {
    isLoading.value = false
  }
}

watch(isVisible, (newValue) => {
  if (newValue && props.characters.length > 0) {
    selectedCharacter.value = props.characters[0].char_id
    // loadStatistics будет вызван через watch(selectedCharacter)
  }
})

watch(selectedCharacter, (newValue) => {
  if (newValue) {
    loadStatistics(newValue)
  }
})

onMounted(() => {
  if (props.characters.length > 0) {
    selectedCharacter.value = props.characters[0].char_id
    // loadStatistics будет вызван через watch(selectedCharacter)
  }
})
</script>
<style lang="scss">
.el-dialog.statistic-modal {
  .statistic-modal__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 28px;
    position: relative;
  }

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
    
    .statistic-loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 200px;
      gap: 16px;
    }
    
    .statistic-error {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 200px;
      
      .color-error {
        color: #ff6b6b;
      }
    }
    
    .statistic-empty {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 200px;
      color: rgba(255, 255, 255, 0.6);
    }
    .statistic-blur-overlay {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(10px);
      background-color: rgba(30, 47, 68, 0.5019607843);
      border-radius: 18px;
    }
    .statistic-blocked {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
      
      .statistic-blocked__content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
        text-align: center;
        color: #fff;
        
        h2 {
          font-size: 24px;
          font-weight: 600;
          margin: 0;
          color: #ff6b6b;
        }
        
        p {
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
        }
      }
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
</style>