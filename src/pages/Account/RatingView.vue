<template>
  <div class="rating">
    <div class="back" @click="handleBack">
      <IconBase name="arrow-back" />
    </div>
    <div class="rating-title">
      <h1 class="text-uppercase">Рейтинг башни испытаний</h1>
      <div class="text-body-18 mt-4">Обнуление и выдача наград через:
        <span class="text-underline">23 дня 14 часов</span>
      </div>
    </div>
    <div class="rating-table">
      <el-tabs v-model="activeTab" type="card" @tab-click="changeTab">
        <el-tab-pane v-for="tab in tabsData" :key="tab.id" :label="tab.name" :name="tab.id">
          <div class="CustomTable">
            <el-table :data="currentTabData" max-height="600">
              <el-table-column type="index" label="#" width="50">
              </el-table-column>
              <el-table-column prop="name" label="Никнейм">
                <template #default="{ row }">
                  <div>{{ row.name }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="floor" label="Этаж">
                <template #default="{ row }">
                  <div>{{ row.floor }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="totalFloors" label="Всего этажей">
                <template #default="{ row }">
                  <div>{{ row.totalFloors }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="time" label="Время">
                <template #default="{ row }">
                  <div>{{ row.time }} <span v-if="row.time_minus" class="color-brown">({{ row.time_minus }})</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="reward" label="Награда">
                <template #default="{ row }">
                  <div class="rewards">
                    <img v-for="item in 3" src="@/assets/img/item.png" alt="reward" class="reward-item" />
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import IconBase from '@/shared/IconBase.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

interface RatingItem {
  id: number
  name: string
  floor: string
  totalFloors: string
  time: string
  time_minus: string | null
  reward: any[]
}

interface TabData {
  id: string
  name: string
  data: RatingItem[]
}
const tabsData = ref<TabData[]>([
  {
    id: 'gladiator',
    name: 'Гладиатор',
    data: [
      { id: 1, name: 'DragonSlayer', floor: '25', totalFloors: '30', time: '08:45', time_minus: '-02:15', reward: [] },
      { id: 2, name: 'ShadowHunter', floor: '24', totalFloors: '30', time: '09:12', time_minus: '-01:48', reward: [] },
      { id: 3, name: 'FireMage', floor: '23', totalFloors: '30', time: '10:30', time_minus: '-00:30', reward: [] },
      { id: 4, name: 'IceWarrior', floor: '22', totalFloors: '30', time: '11:05', time_minus: null, reward: [] },
      { id: 5, name: 'StormRider', floor: '21', totalFloors: '30', time: '12:20', time_minus: null, reward: [] },
      { id: 6, name: 'VoidKnight', floor: '20', totalFloors: '30', time: '13:15', time_minus: null, reward: [] },
      { id: 7, name: 'LightBringer', floor: '19', totalFloors: '30', time: '14:00', time_minus: null, reward: [] },
      { id: 8, name: 'DarkSoul', floor: '18', totalFloors: '30', time: '15:30', time_minus: null, reward: [] },
      { id: 9, name: 'CrystalGuard', floor: '17', totalFloors: '30', time: '16:45', time_minus: null, reward: [] },
      { id: 10, name: 'ThunderFist', floor: '16', totalFloors: '30', time: '17:20', time_minus: null, reward: [] },
      { id: 3, name: 'FireMage', floor: '23', totalFloors: '30', time: '10:30', time_minus: '-00:30', reward: [] },
      { id: 4, name: 'IceWarrior', floor: '22', totalFloors: '30', time: '11:05', time_minus: null, reward: [] },
      { id: 5, name: 'StormRider', floor: '21', totalFloors: '30', time: '12:20', time_minus: null, reward: [] },
      { id: 6, name: 'VoidKnight', floor: '20', totalFloors: '30', time: '13:15', time_minus: null, reward: [] },
      { id: 7, name: 'LightBringer', floor: '19', totalFloors: '30', time: '14:00', time_minus: null, reward: [] },
      { id: 8, name: 'DarkSoul', floor: '18', totalFloors: '30', time: '15:30', time_minus: null, reward: [] },
      { id: 9, name: 'CrystalGuard', floor: '17', totalFloors: '30', time: '16:45', time_minus: null, reward: [] },
      { id: 10, name: 'ThunderFist', floor: '16', totalFloors: '30', time: '17:20', time_minus: null, reward: [] },
      { id: 4, name: 'IceWarrior', floor: '22', totalFloors: '30', time: '11:05', time_minus: null, reward: [] },
      { id: 5, name: 'StormRider', floor: '21', totalFloors: '30', time: '12:20', time_minus: null, reward: [] },
      { id: 6, name: 'VoidKnight', floor: '20', totalFloors: '30', time: '13:15', time_minus: null, reward: [] },
      { id: 7, name: 'LightBringer', floor: '19', totalFloors: '30', time: '14:00', time_minus: null, reward: [] },
      { id: 8, name: 'DarkSoul', floor: '18', totalFloors: '30', time: '15:30', time_minus: null, reward: [] },
      { id: 9, name: 'CrystalGuard', floor: '17', totalFloors: '30', time: '16:45', time_minus: null, reward: [] },
      { id: 10, name: 'ThunderFist', floor: '16', totalFloors: '30', time: '17:20', time_minus: null, reward: [] },
    ]
  },
  {
    id: 'guardian',
    name: 'Страж',
    data: [
      { id: 1, name: 'TowerDefender', floor: '28', totalFloors: '35', time: '07:30', time_minus: '-03:20', reward: [] },
      { id: 2, name: 'ShieldMaster', floor: '27', totalFloors: '35', time: '08:15', time_minus: '-02:35', reward: [] },
      { id: 3, name: 'GuardianAngel', floor: '26', totalFloors: '35', time: '09:45', time_minus: '-01:05', reward: [] },
    ]
  }
])

const activeTab = ref('gladiator')
const currentTabData = computed(() => {
  const currentTab = tabsData.value.find(tab => tab.id === activeTab.value)
  return currentTab?.data || []
})

const handleBack = () => {
  router.push('/')
}

const changeTab = (tab: any) => {
  console.log('Переключен таб:', tab.props.name)
}
</script>
<style lang="scss">
.rating {
  width: 100%;
  height: max-content;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  padding: 32px 46px 46px;
  border-radius: 24px;
  background: var(--color-primary);
  margin: 40px 0;

  @include mq(laptop) {
    padding: 0;
    border-radius: 0;
    background: none;
    margin-top: 60px;
  }

  .back {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    position: absolute;
    left: 46px;
    top: 20px;
    cursor: pointer;
    transition: 0.3s ease;

    &:hover {
      translate: -5px;
    }

    @include mq(laptop) {
      top: -45px;
      left: 15px;
    }

  }

  .rating-table {
    width: 100%;

    .rewards {
      display: flex;
      gap: 2px;

      img {
        width: 15px;
        height: 15px;
      }
    }
  }
}
</style>