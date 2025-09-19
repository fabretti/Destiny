<template>
  <div class="achievement-block" :class="statusClass">
    <div v-if="statusText" class="achievement-block__status text-uppercase">
      {{ statusText }}
    </div>
    <div class="achievement-block__header">
      <div class="text-body-20 text-uppercase text-center">{{ item.title }}</div>
      <div class="text-body-16 text-center" v-html="item.description"></div>
    </div>
    <div class="achievement-block__count">{{ progressText }}</div>
    <template v-for="stage in item.stages" :key="stage.progress">
      <div class="achievement-block__info">{{ stage.progress > 1 ? `Награда за ${stage.progress}` : 'Награда' }}</div>
      <div class="achievement-block__items">
        <img 
          v-for="rewardItem in stage.items" 
          :key="`${stage.progress}-${rewardItem.item_id}`"
          :src="`/icons/${rewardItem.icon_name}`" 
          :alt="`item-${rewardItem.item_id}`" 
        />
      </div>
    </template>
    <ButtonItem 
      v-if="showButton"
      v-loading="isLoadingBtn"
      variant="solid-shadow" 
      size="medium"
      :disabled="buttonDisabled || isLoadingBtn"
      @click="handleButtonClick"
    >
      {{ buttonText }}
    </ButtonItem>
    <div v-else class="achievement-block__completed">
      Награда получена
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import ButtonItem from '@/shared/ButtonItem.vue'
import type { IAchievement } from '@/stores/types/LkStoreTypes'
import { AchievementStatus, AchievementType, AchievementBadge } from '@/stores/enums/AchievementStatuses'

interface Props {
  item: IAchievement
  charId: string
  isLoadingBtn: boolean
}

interface Emits {
  (e: 'claim', data: { char_id: string, achiv_id: number }): void
  (e: 'reset', data: { char_id: string, achiv_id: number }): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const statusText = computed(() => {
  if (props.item.is_new === AchievementBadge.NEW) {
    return "NEW"
  } else if (props.item.vip_only === AchievementBadge.VIP) {
    return "VIP"
  } else if (props.item.type === AchievementType.SEASONAL) {
    return `СЕЗОННОЕ ДО ${props.item.type_desc}`
  } else if (props.item.type === AchievementType.EVENT) {
    return `ИВЕНТ ДО ${props.item.type_desc}`
  }
  return ""
})

const statusClass = computed(() => {
  if (props.item.is_new === AchievementBadge.NEW || props.item.type === (AchievementType.SEASONAL || AchievementType.EVENT)) {
    return 'status--new'
  } else if (props.item.vip_only === AchievementBadge.VIP) {
    return 'status--vip'
  } else if (props.item.status === AchievementStatus.COMPLETED) {
    return 'status--completed'
  }
  return ''
})

const progressText = computed(() => {
  return `${props.item.current_progress} / ${props.item.max_progress}`
})

const showButton = computed(() => {
  return props.item.status !== AchievementStatus.COMPLETED
})

const buttonDisabled = computed(() => {
  return props.item.status === AchievementStatus.REWARD_NOT_AVAILABLE || 
         props.item.status === AchievementStatus.RESET_NOT_AVAILABLE
})

const buttonText = computed(() => {
  switch (props.item.status) {
    case AchievementStatus.REWARD_AVAILABLE:
      return "Получить"
    case AchievementStatus.RESET_AVAILABLE:
      return "Обнулить"
    default:
      return "Недоступно"
  }
})

const handleButtonClick = () => {
  if (props.item.status === AchievementStatus.REWARD_AVAILABLE) {
    emit('claim', { char_id: props.charId, achiv_id: props.item.id })
  } else if (props.item.status === AchievementStatus.RESET_AVAILABLE) {
    emit('reset', { char_id: props.charId, achiv_id: props.item.id })
  }
}
</script>
<style lang="scss">
.achievement-block {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 25px 35px;
  border: 1px solid #b3dff438;
  background: #1e2f4480;
  border-radius: 25px;
  overflow: hidden;
  &.status {
    &--vip, &--new, &--completed {
      padding-top: 40px;
      @include text-body-12;
    } 
    &--vip {
      border: 1px solid #D79570;
      .achievement-block__status {
        background: #D79570;
      }
    }
    &--new {
      border: 1px solid #4CAF50;
      .achievement-block__status {
        background: #4CAF50;
      }
    }
    &--completed {
      border: 1px solid #6F8B60;
      .achievement-block__status {
        background: #6F8B60;
      }
    }
  }
  .achievement-block__status {
    position: absolute;
    top: 0;
    right: 50%;
    transform: translate(50%, 0);
    height: 16px;
    padding: 0 12px;
    border-radius: 0 0 4px 4px;
  }
  .achievement-block__header {
    display: grid;
    gap: 12px;
  }
  .achievement-block__count {
    font-weight: 700;
    font-size: 18px;
    letter-spacing: 1px;
    color: #D79570;
    margin-top: auto;
  }
  .achievement-block__info {
    @include text-body-14;
    display: flex;
    align-items: center;
    padding: 0 24px;
    height: 30px;
    border-radius: 50px;
    border: 1px solid #566E86B5;
  }
  .achievement-block__items {
    display: flex;
    gap: 14px;
    img {
      width: 30px;
      height: 30px;
    }
  }
  .achievement-block__completed {
    @include text-body-14;
    color: #6F8B60;
    font-weight: 600;
    text-align: center;
  }
}
</style>
