<template>
  <header class="header">
    <nav class="header-container">
      <div class="header-timer">
        <div class="header-timer__date">
          <div class="number">14</div>
          <span>дней</span>
        </div>
        <div class="header-timer__func">
          <div class="text">До конца сезона</div>
          <ButtonItem size="sm">ПОДРОБНЕЕ</ButtonItem>
        </div>
      </div>
      <ul class="header-nav">
        <li v-for="item in navItems" :key="item.id" class="nav-item">
          <router-link class="text-body-20" :to="item.href">
            <IconBase :name="item.icon" />
            <span>{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
      <div class="header-info">
        <div class="header-info__online">
          <span>В сети:</span>
          <span class="online-count">2 200</span>
        </div>
        <div class="header-info__race">
          <div class="online">
            <IconBase name="elies" />
            2 200
          </div>
          <div class="online">
            <IconBase name="asm" />
            2 200
          </div>
        </div>
      </div>
      <div class="header-lang">
        <LanguageSelector />
      </div>
      <div class="header-btns">
        <ButtonItem variant="solid" @click="$router.push('/download')">Установить</ButtonItem>
        <ButtonItem v-if="!isLoggedIn" variant="empty" @click="openAuthModal">
          Личный кабинет
        </ButtonItem>
        <router-link v-else to="/account">
          <ButtonItem variant="empty">Личный кабинет</ButtonItem>
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import IconBase from '@/shared/IconBase.vue'
import ButtonItem from '@/shared/ButtonItem.vue'
import LanguageSelector from './LanguageSelector.vue'
import { useAuth } from '@/composables/useAuth'

const { isLoggedIn, openAuthModal } = useAuth()

const navItems = [
  { id: 1, icon: 'Home', href: '/', name: 'Главная' },
  { id: 2, icon: 'Forum', href: '/forum', name: 'Форум' },
  { id: 3, icon: 'Premium', href: '/premium', name: 'Премиум' },
]
</script>

<style lang="scss">
.header {
  z-index: 3;
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.2);
  .header-container {
    position: relative;
    width: 100%;
    height: 100px;
    max-width: 1380px;
    padding: 0 30px;
    margin: 0 auto;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .header-timer {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-right: 12px;
    .header-timer__date {
      text-align: center;
      .number {
        font-family: Orelega One;
        font-weight: 400;
        font-size: 38px;
        line-height: 100%;
        letter-spacing: 1px;
      }
      span {
        font-family: Cochin;
        font-weight: 700;
        font-size: 12px;
        line-height: 100%;
        letter-spacing: 1px;
        text-transform: uppercase;
      }
    }
    .header-timer__func {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 10px;
      .text {
        font-weight: 400;
        font-size: 10px;
        line-height: 100%;
        letter-spacing: 1px;
      }
    }
  }
  .header-nav {
    position: relative;
    height: 100%;
    display: flex;
    gap: 8px;
    list-style: none;
    margin: 0;
    padding: 0 24px 0 12px;
    &:before,
    &:after {
      content: '';
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 50px;
      background: rgba(255, 255, 255, 0.2);
    }
    &:before {
      left: 0;
    }
    &:after {
      right: 0;
    }
    .nav-item {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      transition: opacity 0.2s;
      a {
        display: flex;
        align-items: center;
      }
    }
  }
  .header-info {
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 16px;
    .header-info__online {
      display: flex;
      flex-direction: column;
      gap: 12px;
      .online-count {
        min-width: 70px;
        height: 24px;
        border-radius: 20px;

        border: 1px solid #b3dff438;
        backdrop-filter: blur(10px);
        box-shadow: 0px 0px 30px 0px #67c9f721 inset;

        font-family: Georgia Pro;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        letter-spacing: 2px;
        text-align: center;
      }
    }
    .header-info__race {
      display: flex;
      flex-direction: column;
      gap: 10px;
      .online {
        display: flex;
        align-items: center;
        gap: 10px;
      }
    }
    &:after {
      content: '';
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 50px;
      background: rgba(255, 255, 255, 0.2);
    }
  }
  .header-lang {
    position: relative;
    margin-left: 12px;
  }
  .header-btns {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-left: 12px;
  }
}
</style>
