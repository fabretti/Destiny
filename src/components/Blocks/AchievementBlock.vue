<template>
  <div class="achievement-block" :class="item.status ? `status--${item.status}` : ''">
    <div v-if="status" class="achievement-block__status">
      {{ status }}
    </div>
    <div class="achievement-block__header">
      <div class="text-body-20 text-uppercase">{{ item.name }}</div>
      <span class="text-body-16 text-center">{{ item.info }}</span>
    </div>
    <div class="achievement-block__count">{{ item.count }}</div>
    <div class="achievement-block__info">{{ item.info }}</div>
    <div class="achievement-block__items">
      <img v-for="item in item.items" src="@/assets/img/item.png" alt="item" />
    </div>
    <ButtonItem variant="solid-shadow" size="medium">{{ item.status !== "ready" ? "Получить" : "Обнулить" }}</ButtonItem>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import ButtonItem from '@/shared/ButtonItem.vue'

const props = defineProps<{
  item: {
    status: string
    name: string
    count: string
    info: string
    items: number[]
  }
}>()  

const status = computed(() => {
  if (props.item.status === "ready") {
    return "Готово"
  } else if (props.item.status === "vip") {
    return "VIP"
  } else {
    return ""
  }
})
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
  &.status {
    &--vip, &--ready {
      padding-top: 40px;
      @include text-body-12;
    } 
    &--vip {
      border: 1px solid #D79570;
      .achievement-block__status {
        background: #D79570;
      }
    }
    &--ready {
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
  }
}
</style>
