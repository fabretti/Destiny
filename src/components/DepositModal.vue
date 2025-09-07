<template>
  <DefaultModal v-model="isVisible" class="deposit-modal" width="650px">
    <div class="deposit-modal__content">
      <h1 class="text-uppercase mt-6">Выбери способ оплаты</h1>
      <div class="deposit-select">
        <div 
          v-for="option in depositOptions" 
          :key="option.id"
          class="deposit-select__item"
          :class="{ active: selectedOption?.id === option.id }"
          @click="selectOption(option)"
        >
          <div class="cards">
            <img 
              v-for="card in option.cards" 
              :key="card"
              :src="card" 
              :alt="option.title" 
            />
          </div>
          <div class="text-body-20">{{ option.title }}</div>
          <IconBase
            v-if="selectedOption?.id === option.id"
            class="indicator"
            name="indicator"
          />
        </div>
      </div>
       <div class="text-body-20">Сумма к пополнению: {{ formatCurrency(sumToPay) }}</div>
      <ButtonItem variant="solid-shadow" size="medium" @click="handleDeposit" class="w-100">ПОПОЛНИТЬ</ButtonItem>
    </div>
  </DefaultModal>

</template>
<script setup lang="ts">
import DefaultModal from '@/components/Auth/DefaultModal.vue'
import { ref } from 'vue'
import ButtonItem from '@/shared/ButtonItem.vue'
import IconBase from '@/shared/IconBase.vue'
import { formatCurrency } from '@/utils/formatters'
import visaImg from '@/assets/img/cards/visa.png'
import mirImg from '@/assets/img/cards/mir.png'
import mastercardImg from '@/assets/img/cards/mastercard.png'
import cryptoImg from '@/assets/img/cards/cr.png'

interface DepositOption {
  id: string
  title: string
  cards: string[]
}

interface Props {
  sumToPay?: string | number | null
}

const props = withDefaults(defineProps<Props>(), {
  sumToPay: null
})

const isVisible = defineModel<boolean>()

const depositOptions: DepositOption[] = [
  {
    id: 'ru-cards',
    title: 'Карты РФ и СБП',
    cards: [visaImg, mirImg, mastercardImg]
  },
  {
    id: 'eu-cards',
    title: 'Карты EU и СНГ',
    cards: [visaImg, mirImg, mastercardImg]
  },
  {
    id: 'crypto',
    title: 'CRYPTO',
    cards: [cryptoImg]
  }
]

const selectedOption = ref<DepositOption | null>(depositOptions[0])


const selectOption = (option: DepositOption) => {
  selectedOption.value = option
}

const handleDeposit = () => {
  if (selectedOption.value) {
    console.log('Выбранный способ оплаты:', selectedOption.value)
    console.log('Сумма к пополнению:', props.sumToPay)
    // Здесь можно добавить логику обработки депозита
  } else {
    console.log('Выберите способ оплаты')
  }
}
</script>
<style lang="scss">
.deposit-modal {
  .el-dialog__body {
    display: flex;
    justify-content: center;
  }
  .deposit-modal__content {
    width: 100%;
    max-width: 460px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 50px;
    .deposit-select {
      width: 100%;
      .deposit-select__item {
        height: 74px;
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        border-bottom: 1px solid rgba(168, 181, 197, 0.28);
        transition: background-color 0.2s;
        padding: 0 16px;
        &:first-child {
          border-top: 1px solid rgba(168, 181, 197, 0.28);
        }
        &:hover {
          background-color: rgba(168, 181, 197, 0.1);
        }
        &.active {
          background-color: rgba(34, 51, 68, 1);
        }
        .indicator {
          margin-left: auto;
        }
        .cards {
          display: flex;
          flex-direction: column;
          gap: 7px;
          img {
            height: 12px;
            object-fit: contain;
          }
        }
      }
    }
  }
}
</style>