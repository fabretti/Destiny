<template>
  <div class="premium-view">
    <div class="main-container">
      <PremiumSection @buy="handleBuy" @vip-info="handleVipInfo" />
      
    </div>
  </div>
</template>

<script setup lang="ts">
import PremiumSection from '@/components/PremiumSection.vue'

// Обработчики событий
const handleBuy = (tariffId: number) => {
  console.log('Покупка тарифа:', tariffId)
  // Здесь будет логика покупки
}

const handleVipInfo = () => {
  console.log('Информация о VIP')
  // Здесь будет логика показа информации о VIP
}
</script>

<style lang="scss" scoped>
.premium-view {
  min-height: 100vh;
  background: rgba(9, 23, 39, 1);
  padding: 60px 0;
}

// Адаптивность
@media (max-width: 768px) {
  .premium-view {
    padding: 40px 0;
  }
}
</style>
