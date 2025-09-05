<template>
  <div class="account wrapper-block">
    <div class="account-section">

      <div class="account-block info">
        <div class="info-header">
          <div class="text-body-24 text-uppercase">LOUNDd</div>
          <ButtonItem size="icon-30" @click="openForgotPasswordModal">
            <IconBase name="settings" />
          </ButtonItem>
          <ButtonItem size="icon-30" @click="isStatisticModalVisible = true">
            <IconBase name="statistic" />
          </ButtonItem>
        </div>
        <div class="info-balance">
          <div class="text-body-16 text-uppercase">Баланс: <span class="fw-b">3 000 TOLL</span></div>
          <CustomInput v-model="balance" placeholder="Введите сумму" color="white" size="md" balance/>
          <div class="info-balance__btn">
            <div class="text-body-14">Курс 1 Toll = 1 Рубль</div>
            <ButtonItem variant="solid-shadow" size="medium">ПОПОЛНИТЬ</ButtonItem>
          </div>
        </div>
       <div class="info-cards">
        <div class="info-cards__items">
          <img v-for="card in cards" :key="card.id" :src="`${card.img}`" alt="cards" />
        </div>
       </div>
      </div>

      <div class="divider vertical"></div>

      <div class="account-block bonuses">
        <div class="bonuses-item">
          <div class="text-body-16 text-center text-uppercase">Бонусы за<br/> пополнение</div>
          <div class="text-body-12 text-center">Всего пополнено на: <span class="text-underline">0 toll</span></div>
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
                <div class="text-body-12">{{ item.amount }} toll</div>
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
    <div class="divider horizontal"></div>

    <div class="account-section">
      <div class="account-block promocode">
        <div class="text-body-16 text-center text-uppercase">Промокоды</div>
        <div class="promocode-content">
          <div class="promocode-input">
            <CustomInput v-model="promocode" placeholder="Введите промокод" color="white" size="sm"/>
            <div class="promocode-input__bottom">
              <div class="text-body-12 text-underline">Зачислено: 0 toll</div>
              <ButtonItem variant="solid" size="sm">Активировать</ButtonItem>
            </div>
          </div>
      </div>
      </div>

      <div class="divider vertical"></div>
      
      <div class="account-block mmotop">
        <div class="text-body-16 text-center text-uppercase">Бонусы за<br/> ММОТОР</div>
        <div class="mmotop-coins">
          <span class="text-body-14">Получено</span>
          <span class="block text-body-12">133 toll</span>
        </div>
        <ButtonItem variant="solid" size="sm">Забрать</ButtonItem>
        <span class="text-body-12 text-underline">Проголосовать</span>
      </div>
    </div>
    <StatisticModal v-model="isStatisticModalVisible" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import ButtonItem from '@/shared/ButtonItem.vue'
import CustomInput from '@/components/CustomInput.vue'
import IconBase from '@/shared/IconBase.vue'
import StatisticModal from '@/components/StatisticModal.vue'

const { openForgotPasswordModal } = useAuth()

const promocode = ref('')
const balance = ref('')
const isStatisticModalVisible = ref(false)

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


</script>

<style lang="scss" scoped>
.account {
  display: flex;
  gap: 12px;
  .account-section {
    display: flex;
    .account-block {
      padding: 12px;
      &.info {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        .info-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .info-balance {
          display: grid;
          gap: 18px;
          width: 100%;
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
        }
      }
      &.bonuses {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 12px;
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
      &:first-child {
        width: 100%;
        padding: 12px 60px;
      }
      &:last-child {
        min-width: 240px;
      }
    }
    &:first-child {
      height: 100%;
    }
    &:last-child {
      min-height: 165px;
    }
  }
  .divider {
    background: #FFFFFF4F;
    &.vertical {
      height: 100%;
      width: 1px;
    }
    &.horizontal {
      height: 1px;
      width: 100%;
    }
  }
}
</style>
