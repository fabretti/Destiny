<template>
  <div class="premium-view">
    <div class="main-container">
      <PremiumSection v-if="!isShowAbout" @buy="handleBuy" @vip-info="handleVipInfo" />
      <PremiumAbout v-else @back="handleBack" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PremiumSection from '@/components/Premium/PremiumSection.vue'
import PremiumAbout from '@/components/Premium/PremiumAbout.vue'

const isShowAbout = ref(false)

const handleBuy = (tariffId: number) => {
  console.log('Покупка тарифа:', tariffId)
  // Здесь будет логика покупки
}

const handleVipInfo = () => {
  isShowAbout.value = true
}

const handleBack = () => {
  isShowAbout.value = false
}
</script>

<style lang="scss" scoped>
.premium-view {
  width: 100%;
  padding: 60px 0;
}

// Адаптивность
@media (max-width: 768px) {
  .premium-view {
    padding: 40px 0;
  }
}
</style>
