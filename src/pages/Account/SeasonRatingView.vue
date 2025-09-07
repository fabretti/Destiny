<template>
  <div class="seasonRating">
    <div class="back" @click="handleBack">
      <IconBase name="arrow-back" />
    </div>
    <div class="seasonRating-title">
      <h1 class="text-uppercase">Сезонный рейтинг</h1>
      <div class="text-body-18 mt-4">Обнуление и выдача наград через: 
        <span class="text-underline">23 дня 14 часов</span></div>
    </div>
    <div class="seasonRating-tables">
      <div class="seasonRating-tables__item">
        <div class="title text-body-20 text-uppercase">Лидеры</div>
        <el-tabs v-model="activeTabLeaders" type="card" @tab-click="changeLeadersTab">
          <el-tab-pane 
            v-for="tab in tabsLeadersData" 
            :key="tab.id"
            :label="tab.name" 
            :name="tab.id"
          >
            <div class="CustomTable">
              <el-table :data="currentTabLeadersData" stripe :max-height="tableHeight">
                <el-table-column
                  type="index"
                  label="#"
                  width="50"
                >
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="Никнейм"
                >
                  <template #default="{ row }">
                    <div>{{ row.name }}</div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="oc"
                  label="ОС"
                >
                  <template #default="{ row }">
                    <div>{{ formatCurrency(row.oc, 'ОС') }}</div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="reward"
                  label="Награда"
                >
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
      <div class="seasonRating-tables__item">
        <div class="title text-body-20 text-uppercase">Самые быстрые</div>
        <el-tabs v-model="activeTabFasters" type="card" @tab-click="changeFastersTab">
          <el-tab-pane 
            v-for="tab in tabsFastersData" 
            :key="tab.id"
            :label="tab.name" 
            :name="tab.id"
          >
            <div class="CustomTable">
              <el-table :data="currentTabFastersData" stripe :max-height="tableHeight">
                <el-table-column
                  type="index"
                  label="#"
                  width="50"
                >
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="Никнейм"
                >
                  <template #default="{ row }">
                    <div>{{ row.name }}</div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="time"
                  label="Время"
                >
                  <template #default="{ row }">
                    <div>{{ row.time }}</div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="reward"
                  label="Награда"
                >
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
      <div class="seasonRating-tables__item">
        <div class="title text-body-20 text-uppercase">Самые быстрые</div>
        <div class="subtitle text-body-18">Учет поединков на аренах</div>
        <div class="CustomTable">
          <el-table :data="currentTabFastersData" stripe :max-height="tableHeight">
            <el-table-column
              type="index"
              label="#"
              width="50"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="Никнейм"
            >
              <template #default="{ row }">
                <div>{{ row.name }}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="time"
              label="Время"
            >
              <template #default="{ row }">
                <div>{{ row.time }}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="reward"
              label="Награда"
            >
              <template #default="{ row }">
                <div class="rewards">
                  <img v-for="item in 3" src="@/assets/img/item.png" alt="reward" class="reward-item" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <Divider />
    <div class="seasonRating-shop">
      <div class="seasonRating-shop__info">
        <h1 class="text-uppercase">Сезонный Магазин</h1>
        <div class="text-body-18">Уникальные товары, которые доступны только в этом сезоне</div>
        <div class="date">Доступен через: 23 дня 14 часов</div>
      </div>
      <div class="seasonRating-shop__items">
        <ShopItem v-for="item in 4" :key="item" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { formatCurrency } from '@/utils/formatters'
import IconBase from '@/shared/IconBase.vue'
import { useRouter } from 'vue-router'
import Divider from '@/components/Divider.vue'
import ButtonItem from '@/shared/ButtonItem.vue'
import ShopItem from '@/components/Blocks/ShopItem.vue'

const router = useRouter()

interface seasonLeadersItem {
  id: number
  name: string
  oc: number
  reward: any[]
}

interface seasonFastersItem {
  id: number
  name: string
  time: string
  reward: any[]
}

interface BaseTabData<T> {
  id: string
  name: string
  data: T[]
}

interface TabLeadersData extends BaseTabData<seasonLeadersItem> {}

interface TabFastersData extends BaseTabData<seasonFastersItem> {}

const tableHeight = ref(260)
const tabsLeadersData = ref<TabLeadersData[]>([
  {
    id: 'leaders',
    name: 'Лидеры ОС',
    data: [
    { id: 1, name: 'kekov', oc: 1500, reward: [] },
    { id: 1, name: 'kekov', oc: 1500, reward: [] },
    ]
  },
  {
    id: 'top_leagions',
    name: 'Топ Легионов',
    data: [
      { id: 1, name: 'glebmak', oc: 12000, reward: [] },
      { id: 1, name: 'kekov', oc: 1500, reward: [] },
      { id: 1, name: 'glebmak', oc: 12000, reward: [] },
      { id: 1, name: 'kekov', oc: 1500, reward: [] },
      { id: 1, name: 'glebmak', oc: 12000, reward: [] },
      { id: 1, name: 'kekov', oc: 1500, reward: [] },
      { id: 1, name: 'kekov', oc: 1500, reward: [] },
      { id: 1, name: 'glebmak', oc: 12000, reward: [] },
      { id: 1, name: 'kekov', oc: 1500, reward: [] },
      { id: 1, name: 'kekov', oc: 1500, reward: [] },
      { id: 1, name: 'glebmak', oc: 12000, reward: [] },
      { id: 1, name: 'kekov', oc: 1500, reward: [] },
    ]
  }
])

const activeTabLeaders = ref('leaders')
const currentTabLeadersData = computed(() => {
  const currentTab = tabsLeadersData.value.find(tab => tab.id === activeTabLeaders.value)
  return currentTab?.data || []
})


const handleBack = () => {
  router.push('/')
}

const changeLeadersTab = (tab: any) => {
  console.log('Переключен таб:', tab.props.name)
}

const tabsFastersData = ref<TabFastersData[]>([
  {
    id: 'bastion',
    name: 'Бастион',
    data: [
    { id: 1, name: 'kekov', time: '15 м. 10 с.', reward: [] },
    { id: 1, name: 'kekov', time: '15 м. 10 с.', reward: [] },
    { id: 1, name: 'kekov', time: '15 м. 10 с.', reward: [] },
    ]
  },
  {
    id: 'Suro',
    name: 'Сауро',
    data: [
      { id: 1, name: 'kekov', time: '15 м. 10 с.', reward: [] },
      { id: 1, name: 'kekov', time: '15 м. 10 с.', reward: [] },
      { id: 1, name: 'kekov', time: '15 м. 10 с.', reward: [] },
    ]
  },
  {
    id: 'Katalamandj',
    name: 'Каталамандж',
    data: [
      { id: 1, name: 'kekov', time: '15 м. 10 с.', reward: [] },
      { id: 1, name: 'kekov', time: '15 м. 10 с.', reward: [] },
      { id: 1, name: 'kekov', time: '15 м. 10 с.', reward: [] },
      { id: 1, name: 'kekov', time: '15 м. 10 с.', reward: [] },
    ]
  }
])

const activeTabFasters = ref('bastion')
const currentTabFastersData = computed(() => {
  const currentTab = tabsFastersData.value.find(tab => tab.id === activeTabFasters.value)
  return currentTab?.data || []
})

const changeFastersTab = (tab: any) => {
  console.log('Переключен таб:', tab.props.name)
}
</script>
<style lang="scss">
.seasonRating {
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
  }
  .seasonRating-title {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .seasonRating-tables {
    display: grid;
    align-items: flex-start;
    gap: 24px;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    .el-table .el-table__cell {
      padding: 2px 0;
    }
    .seasonRating-tables__item {
      display: flex;
      gap: 16px;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .subtitle {
        line-height: 28px;
      }
      .CustomTable {
        width: 100%;
      }
    }
    .rewards {
      display: flex;
      gap: 2px;
      img {
        width: 15px;
        height: 15px;
      }
    }
  }
  .seasonRating-shop {
    width: 100%;
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: space-between;
    .seasonRating-shop__info {
      width: 100%;
      max-width: 400px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 16px;
      .date {
        font-weight: 500;
        font-size: 16px;
        line-height: 100%;
        letter-spacing: 0.5px;

        display: flex;
        align-items: center;
        justify-content: center;
        text-transform: uppercase;
        height: 40px;
        background: #1E2F444D;
        border: 1px solid #B3DFF438;
        border-radius: 50px;
        backdrop-filter: blur(10px);
        box-shadow: 0px 0px 10px 0px #67C9F729, 0px 0px 30px 0px #67C9F721 inset;
      }
    }
    .seasonRating-shop__items {
      display: grid;
      gap: 20px;
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>