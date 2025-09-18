<template>
  <div v-loading="isLoading" class="account wrapper-block">
    <div class="account-section">

      <div class="account-block info">
        <div class="info-header">
          <div class="text-body-24 text-uppercase">{{ LkStore.accountInfo.login }}</div>
          <ButtonItem size="icon-30" @click="AuthStore.openForgotPasswordModal">
            <IconBase name="settings" />
          </ButtonItem>
          <ButtonItem size="icon-30" @click="isStatisticModalVisible = true">
            <IconBase name="statistic" />
          </ButtonItem>
        </div>
        <div class="info-balance">
          <div class="text-body-16 text-uppercase">Баланс: <span class="fw-b">{{
            formatCurrency(LkStore.accountInfo.balance) }}</span></div>
          <CustomInput v-model="sumToPay" placeholder="Введите сумму" color="white" size="md" balance />
          <div class="info-balance__btn">
            <div class="text-body-14">Курс 1 Toll = 1 Рубль</div>
            <ButtonItem variant="solid-shadow" size="medium" @click="openDepositModal">ПОПОЛНИТЬ</ButtonItem>
          </div>
        </div>
        <div class="info-cards">
          <div class="info-cards__items">
            <img v-for="card in cards" :key="card.id" :src="`${card.img}`" alt="cards" />
          </div>
        </div>
      </div>

      <Divider variant="vertical" />

      <div class="account-block bonuses">
        <div class="bonuses-item">
          <div class="text-body-16 text-center text-uppercase">Бонусы за<br /> пополнение</div>
          <div class="text-body-12 text-center">Всего пополнено на: <span class="text-underline">{{
            formatCurrency(LkStore.accountInfo.bonus_balance) }}</span></div>
          <div class="bonuses-item__block">
            <div class="text-body-12">Доступно<br /> к получению</div>
            <div class="items">
              <img v-for="item in 3" :key="item" src="@/assets/img/item.png" alt="item" />
            </div>
          </div>
          <ButtonItem variant="solid" size="sm">Забрать</ButtonItem>
        </div>
        <div class="bonuses-item">
          <div class="text-body-16 text-center text-uppercase">Весь список бонусов </div>
          <el-scrollbar height="160px" always>
            <div class="bonuses-item__list">
              <div v-for="item in bonusesList" :key="item.id" class="block-item">
                <div class="text-body-12">{{ formatCurrency(item.amount) }}</div>
                <div class="items">
                  <img v-for="img in item.items" :key="img" src="@/assets/img/item.png" alt="item" />
                  <IconBase :name="item.status === 1 ? 'accept-active' : 'accept'" size="24" class="accept" />
                </div>
              </div>
            </div>
          </el-scrollbar>
          <ButtonItem variant="solid" size="sm">Обнулить</ButtonItem>
        </div>
      </div>
    </div>
    <Divider />

    <div class="account-section">
      <div class="account-block promocode">
        <div class="text-body-16 text-center text-uppercase">Промокоды</div>
        <div class="promocode-content">
          <div class="promocode-input">
            <CustomInput v-model="promocode" placeholder="Введите промокод" color="white" size="sm" />
            <div class="promocode-input__bottom">
              <div class="text-body-12">Зачислено: {{ formatCurrency(0) }}</div>
              <ButtonItem variant="solid" size="sm">Активировать</ButtonItem>
            </div>
          </div>
        </div>
      </div>

      <Divider variant="vertical" />

      <div class="account-block mmotop">
        <div class="text-body-16 text-center text-uppercase">Бонусы за<br /> ММОТОР</div>
        <div class="mmotop-coins">
          <span class="text-body-14">Получено</span>
          <span class="block text-body-12">{{ formatCurrency(133) }}</span>
        </div>
        <ButtonItem variant="solid" size="sm">Забрать</ButtonItem>
        <span class="text-body-12 text-underline">Проголосовать</span>
      </div>
    </div>

    <Divider class="divider-mobile" />

    <div class="account-section socials">
      <div class="account-block social">
        <div class="text-body-16 text-center text-uppercase">Социальные сети</div>
        <div class="social-content">

          <ButtonItem v-for="item in socials" :key="item.id" size="icon-36">
            <IconBase :name="item.name" size="24" />
          </ButtonItem>
          <LanguageSelector />
        </div>
      </div>
    </div>
    <StatisticModal v-model="isStatisticModalVisible" />
    <DepositModal v-model="isDepositModalVisible" :sum-to-pay="sumToPay" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { formatCurrency } from '@/utils/formatters'
import { useAuthStore } from '@/stores/AuthStore'
import { useLkStore } from '@/stores/LkStore'
import ButtonItem from '@/shared/ButtonItem.vue'
import CustomInput from '@/components/CustomInput.vue'
import IconBase from '@/shared/IconBase.vue'
import Divider from '@/components/Divider.vue'
import StatisticModal from '@/components/StatisticModal.vue'
import DepositModal from '@/components/DepositModal.vue'
import LanguageSelector from '@/components/LanguageSelector.vue'

const LkStore = useLkStore()
const AuthStore = useAuthStore()

const promocode = ref('')
const sumToPay = ref(null)
const isStatisticModalVisible = ref(false)
const isDepositModalVisible = ref(false)

const socials = [
  { id: 1, name: 'discord', href: 'https://discord.com/aiondestiny' },
  { id: 2, name: 'tg', href: 'https://t.me/aiondestiny' },
  { id: 3, name: 'forumSm', href: 'https://t.me/aiondestiny' },
]
const cards = ref([
  {
    id: 1,
    img: '/src/assets/img/cards/mastercard.png',
  },
  {
    id: 2,
    img: '/src/assets/img/cards/visa.png',
  },
  {
    id: 3,
    img: '/src/assets/img/cards/mir.png',
  },
  {
    id: 4,
    img: '/src/assets/img/cards/crypto.png',
  }

])
const bonusesList = ref([
  {
    id: 1,
    amount: 350,
    items: [1, 2, 3],
    status: 1,
  },
  {
    id: 2,
    amount: 120,
    items: [1, 2, 3],
    status: 0,
  },
])

const openDepositModal = () => {
  if (!sumToPay.value || sumToPay.value === '') {
    console.log('Введите сумму для пополнения')
    return
  }
  isDepositModalVisible.value = true
}

const isLoading = ref(false)
const getAccountInfo = async () => {
  isLoading.value = true
  try {
    LkStore.accountInfo = await LkStore.getAccountInfo()
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await getAccountInfo()
})
</script>

<style lang="scss" scoped>
.account {
  display: flex;
  gap: 12px;

  @include mq(laptop) {
    gap: 20px;
  }

  .account-section {
    display: flex;

    @include mq(laptop) {
      width: 100%;
    }

    .divider.vertical {
      @include mq(laptop) {
        display: none;
      }
    }

    .account-block {
      padding: 12px;

      &.info {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        @include mq(laptop) {
          justify-content: flex-start;
        }

        .info-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .info-balance {
          display: grid;
          gap: 18px;
          width: 100%;

          @include mq(laptop) {
            margin-top: 36px;
          }

          .info-balance__btn {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
        }

        .info-cards {
          .info-cards__items {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          @include mq(laptop) {
            display: none;
          }
        }
      }

      &.bonuses {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 12px;

        @include mq(laptop) {
          display: none;
        }

        .bonuses-item {
          display: flex;
          flex-direction: column;
          gap: 8px;

          .bonuses-item__block {
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            gap: 12px;
            height: 100px;
            background: #1A29374D;
            border: 1px solid #1D3040;
            border-radius: 10px;
            padding: 10px 16px;

            .items {
              display: flex;
              gap: 8px;
            }
          }

          .bonuses-item__list {
            display: flex;
            flex-direction: column;
            gap: 12px;

            .block-item {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 8px;

              .items {
                position: relative;
                display: flex;
                gap: 8px;

                .accept {
                  position: absolute;
                  right: -30px;
                  top: 50%;
                  transform: translateY(-50%);
                }
              }
            }
          }
        }
      }

      &.promocode {
        display: flex;
        flex-direction: column;
        gap: 26px;

        .promocode-content {
          .promocode-input {
            display: grid;
            gap: 10px;

            .promocode-input__bottom {
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 16px;
            }
          }
        }
      }

      &.mmotop {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 16px;

        @include mq(laptop) {
          display: none;
        }

        .mmotop-coins {
          display: flex;
          align-items: center;
          gap: 4px;

          .block {
            padding: 2px 6px;
            background: #1A29374D;
            border: 1px solid #1D3040;
            border-radius: 50px;
          }
        }
      }

      &.social {
        display: none;

        @include mq(laptop) {
          display: flex;
          flex-direction: column;
          gap: 26px;

          .social-content {
            display: flex;
            justify-content: center;
            gap: 20px;
          }
        }
      }

      &:first-child {
        width: 100%;
        padding: 12px 60px;

        @include mq(laptop) {
          padding: 0;
        }
      }

      &:last-child {
        min-width: 240px;
      }
    }

    &:first-child {
      height: 100%;

      @include mq(laptop) {
        height: max-content;
      }
    }

    &:last-child {
      min-height: 165px;
    }
  }
}
</style>
