<template>
  <WrapperBlock title="Магазин" class="shop">
    <template #header>
      <div class="shop-search">
        <CustomInput v-model="search" placeholder="Поиск по ID или названию предмета" search />
      </div>
    </template>
    <div class="shop-content">
      <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
        <el-tab-pane v-for="item in items" :key="item.name" :label="item.label" :name="item.name">
          <div class="shop-content__items">
            <ShopItem v-for="item in 12" :key="item" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </WrapperBlock>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import WrapperBlock from '@/components/Blocks/WrapperBlock.vue'
import CustomInput from '@/components/CustomInput.vue'
import ShopItem from '@/components/Blocks/ShopItem.vue'
import type { TabsPaneContext } from 'element-plus'

const activeName = ref('useful')
const search = ref('')
const items = ref([
  { name: 'useful', label: 'Полезное' },
  { name: 'Config', label: 'Амулеты' },
  { name: 'Role', label: 'Купоны' },
  { name: 'Task', label: 'Маунты' },
  { name: 'useful1', label: 'Питомцы' },
  { name: 'Config1', label: 'Амулеты' },
  { name: 'Role1', label: 'Титулы' },
  { name: 'Task1', label: 'Конфеты' },
  { name: 'useful2', label: 'Свитки' },
  { name: 'Config3', label: 'Шлемы' },
  { name: 'Role4', label: 'Костюмы' },
  { name: 'Task5', label: 'Оружие' },
  { name: 'Task1', label: 'Эмоции' },
  { name: 'useful6', label: 'Краска' },
  { name: 'Config6', label: 'Щиты' },
  { name: 'Role6', label: 'Крылья' },
  { name: 'Task6', label: 'Сеты' },
])
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>
<style lang="scss">
.shop {
  .shop-search {
    width: 100%;
  }
  .shop-content {
    display: grid;
    gap: 30px;

    @include mq(laptop) {
      gap: 20px;
    }

    .el-tabs {
      overflow: hidden;

      .el-tabs__item {
        color: var(--color-white);
        padding: 0 6px;
      }

      .el-tabs__nav-wrap {
        &:after {
          background-color: #ffffff33;
        }

        .el-tabs__active-bar {
          background-color: var(--color-white);
        }
      }
    }

    .shop-content__items {
      display: grid;
      gap: 10px;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    }
  }
}
</style>
