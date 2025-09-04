<template>
  <div class="premium-about">
    <div class="back" @click="handleBack">
      <IconBase name="arrow-back" />
    </div>
    <div class="premium-about__header">
      <h1 class="fw-sb text-uppercase">VIP-привилегии</h1>
      <div class="subtitle text-body-18">Пакет VIP действует на весь аккаунт</div>
    </div>
    <div class="premium-about__content">
      <VipInfoBlock />
      <VipTariffs size="large" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import IconBase from '@/shared/IconBase.vue'
import VipTariffs from './VipTariffs.vue'
import VipInfoBlock from './VipInfoBlock.vue'

const emit = defineEmits<{
  (e: 'back'): void
}>()

const handleBack = () => {
  emit('back')
}
</script>
<style lang="scss">
.premium-about {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  padding: 32px 46px 46px;
  border-radius: 24px;
  background: var(--color-primary);
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
  .premium-about__header {
    display: grid;
    text-align: center;
    gap: 20px;
  }

  .premium-about__content {
    display: grid;
    grid-template-columns: 415px auto;
    gap: 60px;
    align-items: start;
    width: 100%;
  }

  .vip-tariffs {
    margin-top: 42px;
    height: 100%;
  }
}

// Адаптивность
@media (max-width: 1024px) {
  .premium-about {
    .premium-about__content {
      grid-template-columns: 1fr;
      gap: 40px;
    }
  }
}

@media (max-width: 768px) {
  .premium-about {
    padding: 20px;
    gap: 30px;

    .premium-about__content {
      gap: 30px;
    }
  }
}
</style>
