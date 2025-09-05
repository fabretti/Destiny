<template>
  <div class="premium-view">
    <div class="main-container">
      <PremiumAbout />
    </div>
  </div>
</template>

<script setup lang="ts">
import PremiumAbout from '@/components/Premium/PremiumAbout.vue'
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
