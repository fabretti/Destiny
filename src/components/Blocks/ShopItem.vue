<template>
  <div class="shop-item">
    <img src="@/assets/img/shopItem.png" alt="item" class="shop-item__image" />
    <div class="shop-item__name">Название</div>
    <div class="shop-item__price">{{ formatCurrency(price, 'T') }}</div>
    <ButtonItem variant="solid" size="sm" class="w-100">Подробнее</ButtonItem>
  </div>
</template>
<script setup lang="ts">
import ButtonItem from '@/shared/ButtonItem.vue'
import { formatCurrency } from '@/utils/formatters'
import { ref } from 'vue'

const price = ref(100)
</script>
<style lang="scss">
.shop-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 15px;
  border: 1px solid #b3dff438;
  background: #1e2f4480;
  border-radius: 25px;
}
</style>
