<template>
  <el-tooltip
    v-if="showTooltipOnHover"
    placement="top"
    popper-class="item-tooltip-popper"
    :show-after="200"
    :hide-after="100"
  >
    <template #content>
      <div v-if="itemInfo" v-html="itemInfo"></div>
      <div v-else-if="itemDescription">{{ itemDescription }}</div>
      <div v-else-if="isLoading">Загрузка описания...</div>
      <div v-else>Загрузка описания...</div>
    </template>
    
    <div class="item" @mouseenter="handleTooltipShow" @mouseleave="handleTooltipHide">
      <img 
        :src="`http://77.223.102.24/images/items/${item.icon_name}`" 
        :alt="`item-${item.item_id}`" 
      />
      <div v-if="item.item_count > 1" class="item-count">
        {{ item.item_count }}
      </div>
    </div>
  </el-tooltip>
  
  <div v-else class="item">
    <img 
      :src="`http://77.223.102.24/images/items/${item.icon_name}`" 
      :alt="`item-${item.item_id}`" 
    />
    <div v-if="item.item_count > 1" class="item-count">
      {{ item.item_count }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import type { IBonusPackItem } from '@/stores/types/LkStoreTypes'
import { useLkStore } from '@/stores/LkStore'

interface Props {
  item: IBonusPackItem
  itemName?: string
  itemDescription?: string
  showTooltipOnHover?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showTooltipOnHover: true
})

const itemInfo = ref<string>('')
const isLoading = ref(false)
const hasLoaded = ref(false)
const loadTimeout = ref<number | null>(null)
const lkStore = useLkStore()

const getItemInfo = async (itemId: number) => {
  try {
    isLoading.value = true
    const description = await lkStore.getItemDescription(itemId)
    itemInfo.value = description
    hasLoaded.value = true
  } catch (error: any) {
    console.error('Ошибка загрузки описания предмета:', error)
    itemInfo.value = ''
  } finally {
    isLoading.value = false
  }
}

// Обработчик перед показом tooltip - загружаем описание с задержкой
const handleTooltipShow = () => {
  if (!hasLoaded.value && props.showTooltipOnHover && !loadTimeout.value) {
    // Очищаем предыдущий таймер если есть
    if (loadTimeout.value) {
      clearTimeout(loadTimeout.value)
    }
    
    // Устанавливаем задержку 1000ms (1 секунда) перед загрузкой
    loadTimeout.value = setTimeout(async () => {
      await getItemInfo(props.item.item_id)
      loadTimeout.value = null
    }, 1000)
  }
}

// Обработчик ухода курсора - отменяем загрузку если она еще не началась
const handleTooltipHide = () => {
  if (loadTimeout.value) {
    clearTimeout(loadTimeout.value)
    loadTimeout.value = null
  }
}

// Очищаем таймер при размонтировании компонента
onUnmounted(() => {
  if (loadTimeout.value) {
    clearTimeout(loadTimeout.value)
  }
})
</script>

<style lang="scss" scoped>
.item {
  position: relative;
  display: flex;
  cursor: pointer;
  
  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
  
  .item-count {
    position: absolute;
    bottom: -2px;
    right: -2px;
    background: #FFD700;
    color: #000;
    border-radius: 50%;
    min-width: 16px;
    height: 16px;
    padding: 0 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    letter-spacing: 0;
    font-weight: bold;
    border: 1px solid #000;
  }
}

// Глобальные стили для el-tooltip
:global(.item-tooltip-popper) {
  border-radius: 8px !important;
  padding: 12px !important;
  min-width: 200px !important;
  max-width: 300px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5) !important;
  color: #fff !important;
  font-size: 12px !important;
  line-height: 1.4 !important;
}
</style>
