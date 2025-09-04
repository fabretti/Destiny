<template>
  <div class="premium-section">
    <h1 class="premium-section-title">Тарифы VIP</h1>
    <VipTariffs @buy="handleBuy" />

    <div class="activation-section">
      <div class="activation-divider"></div>
      <h2>ИНСТРУКЦИЯ К АКТИВАЦИИ</h2>
      <div class="activation-content">
        <p class="activation-text">
          Чтобы узнать как активировать VIP-привилегии и какие преимущества он дает — нажмите на
          кнопку «Информация о VIP»
        </p>
        <ButtonItem
          variant="solid-shadow"
          size="medium"
          class="activation-button"
          @click="handleVipInfo"
        >
          ПОДРОБНЕЕ O VIP
        </ButtonItem>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ButtonItem from '@/shared/ButtonItem.vue'
import VipTariffs from '@/components/Premium/VipTariffs.vue'

interface VipTariff {
  id: number
  title: string
  price: string
  image: string
}

interface Emits {
  (e: 'buy', tariffId: number): void
  (e: 'vip-info'): void
}

const emit = defineEmits<Emits>()

// Обработчики событий
const handleBuy = (tariffId: number) => {
  emit('buy', tariffId)
}

const handleVipInfo = () => {
  emit('vip-info')
}
</script>

<style lang="scss">
.premium-section {
  width: 100%;
  background: var(--color-primary);
  padding: 40px;
  border-radius: 24px;
  .premium-section-title {
    margin-bottom: 40px;
  }
  .activation-section {
    margin-top: 40px;
  }

  .activation-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(103, 201, 247, 0.5), transparent);
    margin-bottom: 30px;
  }

  .activation-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
    margin-top: 28px;
    flex-wrap: wrap;

    .activation-text {
      color: var(--color-white);
      flex: 1;
      max-width: 460px;
    }

    .activation-button {
      flex-shrink: 0;
    }
  }

  // Адаптивность
  @media (max-width: 768px) {
    .activation-content {
      flex-direction: column;
      align-items: stretch;
      gap: 20px;
    }

    .activation-text {
      min-width: auto;
    }
  }
}
</style>
