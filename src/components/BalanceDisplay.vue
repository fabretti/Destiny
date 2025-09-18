<template>
  <div class="balance-display">
    <div class="text-body-14 mt-auto">Баланс:</div>
    <div class="balance-display__value">
      {{ formatCurrency(value, currency) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCurrency } from '@/utils/formatters'

interface Props {
  value: number | string
  currency?: string
}

withDefaults(defineProps<Props>(), {
  currency: 'TOLL'
})
</script>

<style lang="scss" scoped>
.balance-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;

  .balance-display__value {
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 2px;
    padding: 4px 12px;
    margin: 20px 0 0 0;
    background: #1E2F444D;
    border: 1px solid #B3DFF438;
    backdrop-filter: blur(10px);
    box-shadow: 0px 0px 10px 0px #67C9F729, 0px 0px 30px 0px #67C9F721 inset;
    border-radius: 20px;

    @include mq(laptop) {
      margin: 8px 0 0 0;
    }
  }
}
</style>
