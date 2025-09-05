<template>
  <div class="account wrapper-block">
    <div class="account-section">
      <div class="account-block info"></div>
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
              <div v-for="item in 3" class="block-item">
                <div class="text-body-12">350 toll</div>
                <div class="items">
                  <img v-for="img in 3" :key="img" src="@/assets/img/item.png" alt="item" />
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
          <div class="promocode-text text-body-12">
            <div class="fw-b">Важная информация:</div> </br>  
            Промокоды начисляют бонусные токены на ваш счет. Активировать промокод можно только один раз 
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import ButtonItem from '@/shared/ButtonItem.vue'
import CustomInput from '@/components/CustomInput.vue'

const router = useRouter()
const { logout } = useAuth()

const promocode = ref('')

const handleLogout = () => {
  logout()
  router.push('/')
}
</script>

<style lang="scss" scoped>
.account {
  display: flex;
  gap: 12px;
  .account-section {
    display: flex;
    .account-block {
      padding: 12px;

      &.bonuses {
        display: flex;
        flex-direction: column;
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
                display: flex;
                gap: 8px;
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
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 32px;
          .promocode-input {
            display: grid;
            gap: 10px;
            .promocode-input__bottom {
              display: flex;
              align-items: center;
              gap: 16px;
            }
          }
          .promocode-text  {
            letter-spacing: 0.4px;
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
