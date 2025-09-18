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
      <VipTariffs :size="isMobile ? 'small' : 'large'" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import IconBase from '@/shared/IconBase.vue'
import VipTariffs from './VipTariffs.vue'
import VipInfoBlock from './VipInfoBlock.vue'
import { useRouter } from 'vue-router'
import { useScreenSize } from '@/composables/useScreenSize'

const { isMobile } = useScreenSize();

const router = useRouter()

const handleBack = () => {
  router.push('/')
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

  @include mq(laptop) {
    background: inherit;
    padding: 0;
    padding-top: 60px;
  }

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

    @include mq(laptop) {
      left: 0;
      top: 0;
    }
  }

  .premium-about__header {
    display: grid;
    text-align: center;
    gap: 20px;

    @include mq(laptop) {
      gap: 12px;
    }
  }

  .premium-about__content {
    display: grid;
    grid-template-columns: 415px auto;
    gap: 60px;
    align-items: start;
    width: 100%;

    @include mq(laptop) {
      display: flex;
      flex-direction: column-reverse;
      grid-template-columns: 1fr;
      gap: 40px;
    }
  }

  .vip-tariffs {
    margin-top: 42px;
    height: 100%;
    @include mq(laptop) {
      margin-top: 0;
    }
  }
}
</style>
